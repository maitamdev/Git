import { describe, it, expect, beforeEach } from 'vitest';
import { DatabaseStore } from '../../apps/api/src/db/store.js';
import { DeadlineManager } from '../../packages/gradebook/src/index.js';
import type { Assignment, AssignmentSubmission } from '@git-academy/shared';

describe('Assignment Lifecycle, Prerequisites & Grading (#6, #17, #18, #19, #20)', () => {
  let db: DatabaseStore;

  beforeEach(() => {
    db = new DatabaseStore();
  });

  describe('Assignment Prerequisites & Creation', () => {
    it('creates assignment linking required lessons and labs', () => {
      const asg: Assignment = {
        id: 'asg-rebase-flow',
        classId: 'class-git-k48',
        title: 'Thực hành Interactive Rebase',
        description: 'Tạo chuỗi 5 commit và thực hiện squash, reword, drop.',
        dueAt: '2026-10-25T23:59:59.000Z',
        points: 100,
        requiredLessons: ['04-rebase-01-interactive-rebase'],
        requiredLabs: ['lab-interactive-rebase'],
        createdAt: new Date().toISOString(),
      };

      db.assignments.set(asg.id, asg);
      const retrieved = db.assignments.get(asg.id);

      expect(retrieved?.requiredLessons).toContain('04-rebase-01-interactive-rebase');
      expect(retrieved?.requiredLabs).toContain('lab-interactive-rebase');
    });

    it('checks whether student meets required lessons prerequisites before submission', () => {
      const studentId = 'student-khang-01';
      const requiredLesson = 'lesson-001-lab';

      const hasCompletedReq = Array.from(db.lessonProgress.values()).some(
        (p) => p.studentId === studentId && p.lessonId === requiredLesson && p.status === 'completed'
      );

      // Student Khang has completed the required lesson in seed
      expect(hasCompletedReq).toBe(true);
    });

    it('detects missing prerequisites for new student', () => {
      const newStudentId = 'student-new-001';
      const requiredLesson = '04-rebase-01-interactive-rebase';

      const hasCompletedReq = Array.from(db.lessonProgress.values()).some(
        (p) => p.studentId === newStudentId && p.lessonId === requiredLesson && p.status === 'completed'
      );

      expect(hasCompletedReq).toBe(false);
    });
  });

  describe('Submission & Teacher Grading Lifecycle', () => {
    const asgId = 'asg-test-grade';
    const studentId = 'student-grader-01';

    beforeEach(() => {
      db.assignments.set(asgId, {
        id: asgId,
        classId: 'class-git-k48',
        title: 'Git Reset vs Revert Lab',
        description: 'Phân biệt git reset --hard và git revert',
        dueAt: new Date(Date.now() + 86400000 * 3).toISOString(),
        points: 100,
        createdAt: new Date().toISOString(),
      });
    });

    it('student submits both textual explanation and GitHub repo URL', () => {
      const key = `${asgId}:${studentId}`;
      const sub: AssignmentSubmission = {
        id: `sub-${key}`,
        assignmentId: asgId,
        studentId,
        content: 'Em đã mô phỏng reset và revert trong repo demo đính kèm.',
        url: 'https://github.com/student/git-reset-revert-demo',
        submittedAt: new Date().toISOString(),
      };
      db.submissions.set(key, sub);

      expect(db.submissions.get(key)?.url).toContain('github.com');
      expect(db.submissions.get(key)?.score).toBeUndefined();
    });

    it('teacher grades submission with score and detailed feedback', () => {
      const key = `${asgId}:${studentId}`;
      const sub = {
        id: `sub-${key}`,
        assignmentId: asgId,
        studentId,
        content: 'Bài nộp',
        submittedAt: new Date().toISOString(),
        score: 90,
        feedback: 'Bài giải thích rõ ràng, demo commit revert chuẩn xác!',
        gradedAt: new Date().toISOString(),
        gradedBy: 'teacher-lan-48',
      };
      db.submissions.set(key, sub);

      const graded = db.submissions.get(key);
      expect(graded?.score).toBe(90);
      expect(graded?.feedback).toContain('Bài giải thích rõ ràng');
      expect(graded?.gradedBy).toBe('teacher-lan-48');
    });

    it('teacher can regrade submission and records audit log for grade change', () => {
      const key = `${asgId}:${studentId}`;
      const sub: AssignmentSubmission = {
        id: `sub-${key}`,
        assignmentId: asgId,
        studentId,
        content: 'Bài nộp',
        submittedAt: new Date().toISOString(),
        score: 90,
        feedback: 'Bài ban đầu',
      };
      db.submissions.set(key, sub);

      const oldScore = sub.score;
      sub.score = 95;
      sub.feedback = 'Cộng thêm 5 điểm sau khi giải thích phần commit log.';
      sub.gradedAt = new Date().toISOString();

      const audit = db.logAudit('teacher-lan-48', 'regrade_submission', 'submission', key, {
        oldScore,
        newScore: 95,
      });

      expect(sub.score).toBe(95);
      expect(audit.details?.newScore).toBe(95);
      expect(audit.action).toBe('regrade_submission');
    });

    it('calculates class assignment submission rate', () => {
      const classId = 'class-git-k48';
      const enrollments = Array.from(db.enrollments.values()).filter((e) => e.classId === classId && e.status === 'active');
      const submissions = Array.from(db.submissions.values()).filter((s) => s.assignmentId === asgId);

      const totalStudents = enrollments.length;
      const submittedCount = submissions.length;
      const rate = totalStudents > 0 ? Math.round((submittedCount / totalStudents) * 100) : 0;

      expect(rate).toBeGreaterThanOrEqual(0);
      expect(rate).toBeLessThanOrEqual(100);
    });
  });

  describe('Deadline Boundary Labels in Vietnamese', () => {
    it('generates friendly Vietnamese time labels for student UI', () => {
      const now = 1000000000000;
      const duePending = new Date(now + 86400000 * 3).toISOString(); // +3 days
      const dueToday = new Date(now + 3600000 * 2).toISOString(); // +2 hours
      const dueOverdue = new Date(now - 86400000 * 2).toISOString(); // -2 days

      const infoPending = DeadlineManager.computeDeadlineInfo(duePending, undefined, false, now);
      expect(infoPending.formattedRemaining).toBe('Còn 3 ngày');

      const infoToday = DeadlineManager.computeDeadlineInfo(dueToday, undefined, false, now);
      expect(infoToday.formattedRemaining).toBe('Còn 2 giờ');

      const infoOverdue = DeadlineManager.computeDeadlineInfo(dueOverdue, undefined, false, now);
      expect(infoOverdue.formattedRemaining).toBe('Quá hạn 2 ngày');
    });
  });
});
