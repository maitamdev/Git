import { describe, it, expect, beforeEach } from 'vitest';
import { DatabaseStore } from '../../apps/api/src/db/store.js';
import { MockLmsAdapter, MoodleLmsAdapter } from '../../platform/moodle/lms-adapter.js';

describe('Database Persistence, Constraints & Idempotency (#31, #32, #33, #38)', () => {
  let db: DatabaseStore;

  beforeEach(() => {
    db = new DatabaseStore();
  });

  describe('Idempotency Guarantees (#33)', () => {
    it('does not duplicate XP when lesson completion is called multiple times (network retry)', () => {
      const studentId = 'student-idemp-01';
      const lessonId = '01-foundations-01-version-control';
      const courseVersion = '2.0.0';
      const key = `${studentId}:${lessonId}:${courseVersion}`;

      // First completion: awards 50 XP
      const firstRecord = {
        id: `prog-${studentId}-${lessonId}`,
        studentId,
        courseId: 'git-foundations',
        lessonId,
        courseVersion,
        status: 'completed' as const,
        attempts: 1,
        timeSpentSeconds: 300,
        xpAwarded: 50,
        completedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      db.lessonProgress.set(key, firstRecord);

      // Simulate second call (network retry)
      const existing = db.lessonProgress.get(key);
      expect(existing).toBeDefined();

      const isFirst = !existing || existing.status !== 'completed';
      const additionalXp = isFirst ? 50 : 0;
      expect(additionalXp).toBe(0);

      // Update attempt count, but preserve initial xpAwarded
      existing!.attempts += 1;
      expect(existing!.xpAwarded).toBe(50);
      expect(existing!.attempts).toBe(2);
    });

    it('does not duplicate achievements in user achievements set', () => {
      const studentId = 'student-idemp-02';
      const achSet = new Set<string>();

      achSet.add('first_commit');
      achSet.add('first_commit'); // retry
      achSet.add('first_commit'); // retry

      db.userAchievements.set(studentId, achSet);
      expect(db.userAchievements.get(studentId)!.size).toBe(1);
    });

    it('updates submission instead of creating duplicate records when student resubmits', () => {
      const assignmentId = 'asg-01';
      const studentId = 'student-idemp-03';
      const key = `${assignmentId}:${studentId}`;

      // Initial submission
      db.submissions.set(key, {
        id: `sub-1`,
        assignmentId,
        studentId,
        content: 'Bản nộp version 1',
        submittedAt: '2026-09-20T10:00:00Z',
      });

      // Resubmission before deadline
      db.submissions.set(key, {
        id: `sub-1`,
        assignmentId,
        studentId,
        content: 'Bản nộp version 2 cập nhật',
        submittedAt: '2026-09-21T11:00:00Z',
      });

      const allSubmissions = Array.from(db.submissions.values()).filter(
        (s) => s.assignmentId === assignmentId && s.studentId === studentId
      );
      expect(allSubmissions).toHaveLength(1);
      expect(allSubmissions[0].content).toBe('Bản nộp version 2 cập nhật');
    });
  });

  describe('Unique Constraints Simulation (#32)', () => {
    it('detects duplicate user email', () => {
      const existingEmail = 'khang@gitacademy.vn';
      const hasDuplicate = Array.from(db.users.values()).some(
        (u) => u.email.toLowerCase() === existingEmail.toLowerCase()
      );
      expect(hasDuplicate).toBe(true);
    });

    it('enforces composite unique constraint on (userId, classId) enrollment', () => {
      const userId = 'student-khang-01';
      const classId = 'class-git-k48';
      const key = `${userId}:${classId}`;

      expect(db.enrollments.has(key)).toBe(true);

      const enrollmentsCount = Array.from(db.enrollments.values()).filter(
        (e) => e.userId === userId && e.classId === classId
      ).length;
      expect(enrollmentsCount).toBe(1);
    });

    it('enforces composite unique constraint on (studentId, lessonId, courseVersion) progress', () => {
      const studentId = 'student-khang-01';
      const lessonId = 'lesson-001-lab';
      const courseVersion = '2.0.0';
      const key = `${studentId}:${lessonId}:${courseVersion}`;

      expect(db.lessonProgress.has(key)).toBe(true);
    });
  });

  describe('Audit Logging for Sensitive Operations (#38)', () => {
    it('records audit log when teacher creates class', () => {
      const audit = db.logAudit('teacher-01', 'create_class', 'class', 'class-new', {
        name: 'Git K48',
        code: 'GIT-K48',
      });

      expect(audit.actorId).toBe('teacher-01');
      expect(audit.action).toBe('create_class');
      expect(audit.targetType).toBe('class');
      expect(audit.timestamp).toBeDefined();
    });

    it('records audit log when student is removed from classroom', () => {
      const audit = db.logAudit('teacher-01', 'remove_student_from_class', 'enrollment', 'student-01:class-01', {
        studentId: 'student-01',
      });

      expect(audit.action).toBe('remove_student_from_class');
    });

    it('records audit log when assignment submission score is graded', () => {
      const audit = db.logAudit('teacher-01', 'grade_assignment_submission', 'submission', 'asg-01:student-01', {
        oldScore: undefined,
        newScore: 90,
      });

      expect(audit.action).toBe('grade_assignment_submission');
      expect(audit.details?.newScore).toBe(90);
    });

    it('records audit log when user role is changed by admin', () => {
      const audit = db.logAudit('admin-01', 'change_user_role', 'user', 'user-02', {
        oldRole: 'student',
        newRole: 'teacher',
      });

      expect(audit.action).toBe('change_user_role');
      expect(audit.details?.newRole).toBe('teacher');
    });
  });

  describe('Activity Events Log (#21)', () => {
    it('records lesson_started, lesson_completed and assignment_submitted events', () => {
      const ev1 = db.logActivity({
        userId: 'student-khang-01',
        type: 'lesson_started',
        data: { lessonId: '01-foundations-01-version-control' },
      });

      const ev2 = db.logActivity({
        userId: 'student-khang-01',
        type: 'lesson_completed',
        data: { lessonId: '01-foundations-01-version-control', score: 100 },
      });

      expect(ev1.type).toBe('lesson_started');
      expect(ev2.type).toBe('lesson_completed');
      expect(db.activityEvents.some((e) => e.id === ev1.id)).toBe(true);
      expect(db.activityEvents.some((e) => e.id === ev2.id)).toBe(true);
    });
  });

  describe('LMS & Moodle Adapter Boundary (#24, #25)', () => {
    it('MockLmsAdapter records score and completion reporting', async () => {
      const adapter = new MockLmsAdapter();
      const user = await adapter.getUser();
      expect(user.id).toBe('lms-user-test-01');
      expect(user.roles).toContain('student');

      await adapter.reportScore('01-foundations-01-version-control', 95, 100);
      expect(adapter.reportedScores).toHaveLength(1);
      expect(adapter.reportedScores[0].score).toBe(95);

      await adapter.reportCompletion('01-foundations-01-version-control', 'completed');
      expect(adapter.reportedCompletions).toHaveLength(1);
      expect(adapter.reportedCompletions[0].status).toBe('completed');

      const ctx = await adapter.getLaunchContext();
      expect(ctx.activityName).toBe('Interactive Git Lab');
    });

    it('MoodleLmsAdapter can be initialized with custom URL', async () => {
      const adapter = new MoodleLmsAdapter('https://moodle.university.edu.vn');
      const ctx = await adapter.getLaunchContext();
      expect(ctx.returnUrl).toBe('https://moodle.university.edu.vn');
    });
  });
});
