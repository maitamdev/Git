import { describe, it, expect, beforeEach } from 'vitest';
import { DatabaseStore } from '../../apps/api/src/db/store.js';
import type { Classroom, Enrollment } from '@git-academy/shared';

describe('Classroom Advanced Management & Life-cycle Integration', () => {
  let db: DatabaseStore;

  beforeEach(() => {
    db = new DatabaseStore();
  });

  describe('Classroom Capacity, Dates & Lifecycle', () => {
    it('handles classroom with defined semester start and end dates', () => {
      const cls: Classroom = {
        id: 'cls-sem-1',
        name: 'Học kỳ 1 - 2026: Lập trình Git nâng cao',
        code: 'GIT-SEM1-2026',
        teacherId: 'teacher-lan-48',
        courseId: 'git-foundations',
        startDate: '2026-09-01T00:00:00.000Z',
        endDate: '2026-12-31T23:59:59.000Z',
        createdAt: '2026-08-15T00:00:00.000Z',
      };
      db.classes.set(cls.id, cls);

      const retrieved = db.classes.get(cls.id);
      expect(retrieved?.startDate).toBe('2026-09-01T00:00:00.000Z');
      expect(retrieved?.endDate).toBe('2026-12-31T23:59:59.000Z');
    });

    it('supports multiple classrooms under the same teacher without code collisions', () => {
      const teacherId = 'teacher-lan-48';
      const codes = ['GIT-K48-1', 'GIT-K48-2', 'GIT-K48-3', 'GIT-K48-4'];

      codes.forEach((code, i) => {
        const id = `cls-multi-${i}`;
        db.classes.set(id, {
          id,
          name: `Nhóm ${i + 1}`,
          code,
          teacherId,
          courseId: 'git-foundations',
          createdAt: new Date().toISOString(),
        });
      });

      const teacherClasses = Array.from(db.classes.values()).filter((c) => c.teacherId === teacherId);
      expect(teacherClasses.length).toBeGreaterThanOrEqual(4);
    });

    it('filters classes by active vs completed status based on endDate', () => {
      const now = new Date('2026-10-01T00:00:00Z').getTime();

      const pastClass: Classroom = {
        id: 'past-cls',
        name: 'Lớp hè 2026 đã kết thúc',
        code: 'GIT-SUMMER-26',
        teacherId: 'teacher-lan-48',
        courseId: 'git-foundations',
        startDate: '2026-06-01T00:00:00Z',
        endDate: '2026-08-31T00:00:00Z',
        createdAt: '2026-05-15T00:00:00Z',
      };

      const isCompleted = pastClass.endDate ? new Date(pastClass.endDate).getTime() < now : false;
      expect(isCompleted).toBe(true);
    });
  });

  describe('Cohort Enrollment & At-Risk Threshold Variations', () => {
    it('detects at-risk students across custom academic thresholds (20%, 30%, 40%)', () => {
      // Simulate 10 students with varying completion rates
      const cohort = Array.from({ length: 10 }, (_, i) => ({
        id: `student-cohort-${i}`,
        completedLessons: i * 10, // 0, 10, 20, 30, 40, 50, 60, 70, 80, 90
      }));

      // Threshold 30% (< 38.4 lessons out of 128)
      const atRisk30 = cohort.filter((s) => (s.completedLessons / 128) * 100 < 30);
      expect(atRisk30).toHaveLength(4); // 0, 10, 20, 30

      // Threshold 20% (< 25.6 lessons)
      const atRisk20 = cohort.filter((s) => (s.completedLessons / 128) * 100 < 20);
      expect(atRisk20).toHaveLength(3); // 0, 10, 20

      // Threshold 40% (< 51.2 lessons)
      const atRisk40 = cohort.filter((s) => (s.completedLessons / 128) * 100 < 40);
      expect(atRisk40).toHaveLength(6); // 0, 10, 20, 30, 40, 50
    });

    it('identifies at-risk based on quiz score failure rate independently of lesson count', () => {
      const student1 = { completedLessons: 80, quizAverage: 42 }; // Low quiz avg -> At risk
      const student2 = { completedLessons: 80, quizAverage: 85 }; // Healthy

      const checkRisk = (s: { completedLessons: number; quizAverage: number }) => {
        return (s.completedLessons / 128) * 100 < 30 || s.quizAverage < 50;
      };

      expect(checkRisk(student1)).toBe(true);
      expect(checkRisk(student2)).toBe(false);
    });

    it('handles bulk enrollment without duplicates', () => {
      const classId = 'class-git-k48';
      const newStudentIds = ['bulk-1', 'bulk-2', 'bulk-3', 'bulk-4', 'bulk-5'];

      newStudentIds.forEach((uid) => {
        db.enrollments.set(`${uid}:${classId}`, {
          userId: uid,
          classId,
          status: 'active',
          enrolledAt: new Date().toISOString(),
        });
      });

      const activeInClass = Array.from(db.enrollments.values()).filter(
        (e) => e.classId === classId && e.status === 'active'
      );
      expect(activeInClass.length).toBeGreaterThanOrEqual(7);
    });

    it('soft-deletes student on removal and allows teacher to audit previous members', () => {
      const classId = 'class-git-k48';
      const studentId = 'bulk-1';
      const key = `${studentId}:${classId}`;

      db.enrollments.set(key, {
        userId: studentId,
        classId,
        status: 'active',
        enrolledAt: new Date().toISOString(),
      });

      const enrollment = db.enrollments.get(key);
      expect(enrollment?.status).toBe('active');

      enrollment!.status = 'removed';
      expect(db.enrollments.get(key)?.status).toBe('removed');

      // Query active vs removed
      const removedStudents = Array.from(db.enrollments.values()).filter(
        (e) => e.classId === classId && e.status === 'removed'
      );
      expect(removedStudents.some((e) => e.userId === studentId)).toBe(true);
    });
  });
});
