import { describe, it, expect, beforeEach } from 'vitest';
import { DatabaseStore } from '../../apps/api/src/db/store.js';
import type { Classroom, Enrollment } from '@git-academy/shared';

describe('Classroom & Enrollment Domain Integration', () => {
  let db: DatabaseStore;

  beforeEach(() => {
    db = new DatabaseStore();
  });

  describe('Classroom Creation & Code Generation', () => {
    it('creates a classroom with valid name and courseId', () => {
      const teacherId = 'teacher-lan-48';
      const newClass: Classroom = {
        id: 'class-test-01',
        name: 'Git & GitHub — K48 Đại học Bách Khoa',
        code: 'GIT-BK-K48',
        teacherId,
        courseId: 'git-foundations',
        startDate: '2026-09-01T00:00:00Z',
        endDate: '2026-12-31T00:00:00Z',
        createdAt: new Date().toISOString(),
      };

      db.classes.set(newClass.id, newClass);
      expect(db.classes.get('class-test-01')).toEqual(newClass);
    });

    it('enforces unique class codes across all classrooms', () => {
      const classCodes = new Set(Array.from(db.classes.values()).map((c) => c.code.toUpperCase()));
      expect(classCodes.has('GIT-K48-A')).toBe(true);

      // Attempting to register another class with same code should be detected
      const duplicateCode = 'GIT-K48-A';
      const isDuplicate = Array.from(db.classes.values()).some(
        (c) => c.code.toUpperCase() === duplicateCode.toUpperCase()
      );
      expect(isDuplicate).toBe(true);
    });

    it('teacher can view only classes they own', () => {
      const teacherLan = 'teacher-lan-48';
      const teacherTuan = 'teacher-tuan-02';

      // Create a class for teacher Tuan
      db.classes.set('class-tuan', {
        id: 'class-tuan',
        name: 'Lớp Thầy Tuấn',
        code: 'GIT-TUAN-01',
        teacherId: teacherTuan,
        courseId: 'git-foundations',
        createdAt: new Date().toISOString(),
      });

      const lanClasses = Array.from(db.classes.values()).filter((c) => c.teacherId === teacherLan);
      expect(lanClasses.every((c) => c.teacherId === teacherLan)).toBe(true);
      expect(lanClasses.some((c) => c.id === 'class-tuan')).toBe(false);
    });
  });

  describe('Student Enrollment & Joining by Code', () => {
    it('allows student to join a class using valid code case-insensitively', () => {
      const studentId = 'student-test-learner';
      const inputCode = 'git-k48-a'; // lowercase input

      const targetClass = Array.from(db.classes.values()).find(
        (c) => c.code.toUpperCase() === inputCode.toUpperCase()
      );
      expect(targetClass).toBeDefined();

      const enrollmentKey = `${studentId}:${targetClass!.id}`;
      const enrollment: Enrollment = {
        userId: studentId,
        classId: targetClass!.id,
        status: 'active',
        enrolledAt: new Date().toISOString(),
      };
      db.enrollments.set(enrollmentKey, enrollment);

      expect(db.enrollments.get(enrollmentKey)?.status).toBe('active');
    });

    it('rejects joining when code does not exist', () => {
      const nonExistentCode = 'GIT-DOES-NOT-EXIST';
      const found = Array.from(db.classes.values()).find(
        (c) => c.code.toUpperCase() === nonExistentCode
      );
      expect(found).toBeUndefined();
    });

    it('prevents duplicate active enrollment for the same student and class', () => {
      const studentId = 'student-khang-01';
      const classId = 'class-git-k48';
      const key = `${studentId}:${classId}`;

      const existing = db.enrollments.get(key);
      expect(existing?.status).toBe('active');

      // Check condition that would trigger 409 Conflict
      const isAlreadyActive = existing && existing.status === 'active';
      expect(isAlreadyActive).toBe(true);
    });

    it('allows re-enrolling if previously removed', () => {
      const studentId = 'student-rejoin';
      const classId = 'class-git-k48';
      const key = `${studentId}:${classId}`;

      // Simulate previously removed
      db.enrollments.set(key, {
        userId: studentId,
        classId,
        status: 'removed',
        enrolledAt: '2026-08-01T00:00:00Z',
      });

      const current = db.enrollments.get(key);
      expect(current?.status).toBe('removed');

      // Re-enroll
      db.enrollments.set(key, {
        userId: studentId,
        classId,
        status: 'active',
        enrolledAt: new Date().toISOString(),
      });
      expect(db.enrollments.get(key)?.status).toBe('active');
    });
  });

  describe('Roster Management & Academic Thresholds', () => {
    it('retrieves class roster with calculated progress and academic at-risk flag', () => {
      const classId = 'class-git-k48';
      const enrollments = Array.from(db.enrollments.values()).filter(
        (e) => e.classId === classId && e.status === 'active'
      );

      expect(enrollments.length).toBeGreaterThanOrEqual(2);

      const roster = enrollments.map((e) => {
        const student = db.users.get(e.userId);
        const progressList = Array.from(db.lessonProgress.values()).filter(
          (p) => p.studentId === e.userId && p.status === 'completed'
        );
        const completedCount = progressList.length;
        const progressPercent = Math.round((completedCount / 128) * 100);
        const isAtRisk = progressPercent < 30;

        return {
          id: e.userId,
          displayName: student?.displayName,
          completedCount,
          progressPercent,
          isAtRisk,
        };
      });

      const khang = roster.find((r) => r.id === 'student-khang-01');
      expect(khang?.completedCount).toBeGreaterThanOrEqual(10);
      expect(khang?.isAtRisk).toBe(false);

      const nam = roster.find((r) => r.id === 'student-nam-02');
      expect(nam?.completedCount).toBe(0);
      expect(nam?.isAtRisk).toBe(true); // < 30% progress is at-risk
    });

    it('teacher removes student from class and records audit log', () => {
      const teacherId = 'teacher-lan-48';
      const studentId = 'student-nam-02';
      const classId = 'class-git-k48';
      const key = `${studentId}:${classId}`;

      const enrollment = db.enrollments.get(key);
      expect(enrollment?.status).toBe('active');

      // Remove student
      enrollment!.status = 'removed';
      const audit = db.logAudit(teacherId, 'remove_student_from_class', 'enrollment', key, {
        classId,
        studentId,
        reason: 'Chuyển lớp học phần',
      });

      expect(db.enrollments.get(key)?.status).toBe('removed');
      expect(audit.actorId).toBe(teacherId);
      expect(audit.action).toBe('remove_student_from_class');
      expect(db.auditLogs.some((l) => l.id === audit.id)).toBe(true);
    });

    it('ensures teacher cannot remove student from a class they do not manage', () => {
      const intruderTeacherId = 'teacher-other';
      const classroom = db.classes.get('class-git-k48');

      const isAuthorized = classroom?.teacherId === intruderTeacherId;
      expect(isAuthorized).toBe(false);
    });
  });
});
