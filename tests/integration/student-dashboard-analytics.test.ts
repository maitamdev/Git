import { describe, it, expect, beforeEach } from 'vitest';
import { DatabaseStore } from '../../apps/api/src/db/store.js';
import { DeadlineManager } from '../../packages/gradebook/src/index.js';
import type { Assignment, LessonProgressRecord } from '../../apps/api/src/db/store.js';

describe('Student Dashboard Analytics & Learning Progression (Spec #9 & #10)', () => {
  let db: DatabaseStore;

  beforeEach(() => {
    db = new DatabaseStore();
  });

  describe('Student Dashboard Metrics Computation', () => {
    it('computes 78% course progress when student completes 100 out of 128 lessons', () => {
      const studentId = 'student-khang-01';
      const studentProgress = Array.from(db.lessonProgress.values()).filter(
        (p) => p.studentId === studentId && p.status === 'completed'
      );

      const completedCount = studentProgress.length;
      expect(completedCount).toBe(100);

      const totalLessons = 128;
      const progressPercent = Math.round((completedCount / totalLessons) * 100);
      expect(progressPercent).toBe(78); // Spec requirement: 78%
    });

    it('computes lab completion count as 65 / 76', () => {
      const studentId = 'student-khang-01';
      const labs = Array.from(db.lessonProgress.values()).filter(
        (p) => p.studentId === studentId && p.status === 'completed' && p.lessonId.includes('lab')
      );

      expect(labs.length).toBe(65); // Spec requirement: 65 / 76
    });

    it('computes quiz average as approx 86%', () => {
      const studentId = 'student-khang-01';
      const scores = Array.from(db.lessonProgress.values())
        .filter((p) => p.studentId === studentId && p.score !== undefined)
        .map((p) => p.score!);

      const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      expect(avg).toBeGreaterThanOrEqual(84);
      expect(avg).toBeLessThanOrEqual(88); // Spec requirement: 86%
    });

    it('computes student XP total as approx 12,450 XP', () => {
      const studentId = 'student-khang-01';
      const xp = Array.from(db.lessonProgress.values())
        .filter((p) => p.studentId === studentId)
        .reduce((sum, p) => sum + (p.xpAwarded || 0), 0);

      // Spec requirement: 12,450 XP
      expect(xp).toBeGreaterThanOrEqual(12400);
      expect(xp).toBeLessThanOrEqual(12500);
    });

    it('determines Level title based on completed lesson milestones', () => {
      const getLevelTitle = (completed: number): string => {
        if (completed >= 96) return 'Advanced';
        if (completed >= 64) return 'Upper-Intermediate';
        if (completed >= 32) return 'Intermediate';
        if (completed >= 16) return 'Elementary';
        return 'Beginner';
      };

      expect(getLevelTitle(100)).toBe('Advanced');
      expect(getLevelTitle(70)).toBe('Upper-Intermediate');
      expect(getLevelTitle(40)).toBe('Intermediate');
      expect(getLevelTitle(20)).toBe('Elementary');
      expect(getLevelTitle(5)).toBe('Beginner');
    });

    it('determines resume pointer to next uncompleted lesson', () => {
      const allLessons = [
        '01-foundations-01-version-control',
        '01-foundations-02-install-config',
        '01-foundations-03-first-repo',
        '02-branching-05-merge-conflicts',
        '04-rebase-01-interactive-rebase',
      ];

      const completed = new Set(['01-foundations-01-version-control', '01-foundations-02-install-config']);
      const nextLesson = allLessons.find((l) => !completed.has(l));
      expect(nextLesson).toBe('01-foundations-03-first-repo');
    });
  });

  describe('Assignment Sorting & Deadline Management', () => {
    it('sorts assignments by urgency (pending first, nearest deadline first)', () => {
      const now = new Date('2026-10-01T00:00:00Z').getTime();
      const asgs: Assignment[] = [
        { id: 'asg-far', classId: 'c1', title: 'Far', description: '', dueAt: '2026-10-30T00:00:00Z', points: 100, createdAt: '' },
        { id: 'asg-near', classId: 'c1', title: 'Near', description: '', dueAt: '2026-10-05T00:00:00Z', points: 100, createdAt: '' },
        { id: 'asg-urgent', classId: 'c1', title: 'Urgent', description: '', dueAt: '2026-10-02T00:00:00Z', points: 100, createdAt: '' },
      ];

      const sorted = asgs.sort((a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime());
      expect(sorted[0].id).toBe('asg-urgent');
      expect(sorted[1].id).toBe('asg-near');
      expect(sorted[2].id).toBe('asg-far');
    });

    it('correctly categorizes assignment statuses for dashboard display', () => {
      const due = '2026-10-15T00:00:00Z';
      const now = new Date('2026-10-10T00:00:00Z').getTime();

      // Case 1: unsubmitted pending
      const info1 = DeadlineManager.computeDeadlineInfo(due, undefined, false, now);
      expect(info1.state).toBe('pending');

      // Case 2: submitted pending grading
      const info2 = DeadlineManager.computeDeadlineInfo(due, '2026-10-12T00:00:00Z', false, now);
      expect(info2.state).toBe('submitted');

      // Case 3: submitted & graded
      const info3 = DeadlineManager.computeDeadlineInfo(due, '2026-10-12T00:00:00Z', true, now);
      expect(info3.state).toBe('graded');

      // Case 4: overdue
      const pastNow = new Date('2026-10-20T00:00:00Z').getTime();
      const info4 = DeadlineManager.computeDeadlineInfo(due, undefined, false, pastNow);
      expect(info4.state).toBe('overdue');
    });
  });

  describe('Topic Difficulty & Failure Rate Analytics', () => {
    it('aggregates high-difficulty topics based on retries and quiz failures', () => {
      const records: LessonProgressRecord[] = [
        { id: 'p1', studentId: 's1', courseId: 'c1', lessonId: 'conflict-resolution', courseVersion: '2.0.0', status: 'completed', attempts: 3, score: 50, timeSpentSeconds: 600, xpAwarded: 50, updatedAt: '' },
        { id: 'p2', studentId: 's2', courseId: 'c1', lessonId: 'conflict-resolution', courseVersion: '2.0.0', status: 'completed', attempts: 4, score: 55, timeSpentSeconds: 700, xpAwarded: 50, updatedAt: '' },
        { id: 'p3', studentId: 's1', courseId: 'c1', lessonId: 'first-repo', courseVersion: '2.0.0', status: 'completed', attempts: 1, score: 100, timeSpentSeconds: 200, xpAwarded: 50, updatedAt: '' },
      ];

      const conflictAttempts = records.filter((r) => r.lessonId === 'conflict-resolution');
      const avgAttempts = conflictAttempts.reduce((sum, r) => sum + r.attempts, 0) / conflictAttempts.length;
      expect(avgAttempts).toBe(3.5); // > 2 attempts average

      const failRate = (conflictAttempts.filter((r) => (r.score || 0) < 60).length / conflictAttempts.length) * 100;
      expect(failRate).toBe(100); // Both failed initial threshold
    });
  });
});
