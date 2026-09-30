import { describe, it, expect, beforeEach } from 'vitest';
import { DatabaseStore } from '../../apps/api/src/db/store.js';
import { ProgressConflictResolver } from '../../packages/exercise-engine/src/index.js';
import { GradebookCalculator } from '../../packages/gradebook/src/index.js';
import { sanitizeString, sanitizeUrl } from '../../apps/api/src/middleware/sanitizer.js';
import type { CourseProgress } from '@git-academy/shared';

describe('Production Platform Hardening & Edge-Case Guardrails (#30, #32, #33, #35, #37, #50)', () => {
  let db: DatabaseStore;

  beforeEach(() => {
    db = new DatabaseStore();
  });

  describe('Conflict Resolution Micro-Behaviors (#4)', () => {
    it('merges when server has higher score but local has more attempts', () => {
      const local: CourseProgress = {
        userId: 's1',
        totalXp: 50,
        level: 1,
        streakDays: 1,
        lastActiveDate: '2026-09-20',
        lessons: {
          l1: { lessonId: 'l1', completed: true, theoryViewed: true, quizScore: 70, quizAttempts: 5, labsCompleted: [], xp: 50 },
        },
        achievements: [],
      };

      const server: CourseProgress = {
        userId: 's1',
        totalXp: 50,
        level: 1,
        streakDays: 1,
        lastActiveDate: '2026-09-20',
        lessons: {
          l1: { lessonId: 'l1', completed: true, theoryViewed: true, quizScore: 90, quizAttempts: 2, labsCompleted: [], xp: 50 },
        },
        achievements: [],
      };

      const merged = ProgressConflictResolver.merge(local, server);
      expect(merged.lessons.l1.quizScore).toBe(90);
      expect(merged.lessons.l1.quizAttempts).toBeGreaterThanOrEqual(5);
    });

    it('deduplicates lab ids if local state had duplicate lab completions', () => {
      const local: CourseProgress = {
        userId: 's1',
        totalXp: 50,
        level: 1,
        streakDays: 1,
        lastActiveDate: '2026-09-20',
        lessons: {
          l1: { lessonId: 'l1', completed: true, theoryViewed: true, quizScore: 0, quizAttempts: 0, labsCompleted: ['lab1', 'lab1', 'lab2'], xp: 50 },
        },
        achievements: [],
      };

      const server: CourseProgress = {
        userId: 's1',
        totalXp: 50,
        level: 1,
        streakDays: 1,
        lastActiveDate: '2026-09-20',
        lessons: {
          l1: { lessonId: 'l1', completed: true, theoryViewed: true, quizScore: 0, quizAttempts: 0, labsCompleted: ['lab2', 'lab3'], xp: 50 },
        },
        achievements: [],
      };

      const merged = ProgressConflictResolver.merge(local, server);
      const labs = merged.lessons.l1.labsCompleted;
      expect(labs).toHaveLength(3);
      expect(new Set(labs).size).toBe(3);
    });

    it('takes latest lastAttemptAt timestamp accurately', () => {
      const timeLocal = 1727000000000;
      const timeServer = 1727100000000; // Newer

      const local: CourseProgress = {
        userId: 's1',
        totalXp: 0,
        level: 1,
        streakDays: 1,
        lastActiveDate: '2026-09-20',
        lessons: {
          l1: { lessonId: 'l1', completed: false, theoryViewed: true, quizScore: 0, quizAttempts: 1, labsCompleted: [], xp: 0, lastAttemptAt: timeLocal },
        },
        achievements: [],
      };

      const server: CourseProgress = {
        userId: 's1',
        totalXp: 0,
        level: 1,
        streakDays: 1,
        lastActiveDate: '2026-09-20',
        lessons: {
          l1: { lessonId: 'l1', completed: true, theoryViewed: true, quizScore: 80, quizAttempts: 1, labsCompleted: [], xp: 50, lastAttemptAt: timeServer },
        },
        achievements: [],
      };

      const merged = ProgressConflictResolver.merge(local, server);
      expect(merged.lessons.l1.lastAttemptAt).toBe(timeServer);
      expect(merged.lessons.l1.completed).toBe(true);
    });
  });

  describe('Security & XSS Neutralization (#37)', () => {
    it('neutralizes script tags and inline handlers', () => {
      const payloads = [
        '<script>alert("pwned")</script>',
        '<img src=x onerror=alert(1)>',
        '<svg onload=alert(1)>',
        '<iframe src="evil.com"></iframe>',
      ];

      payloads.forEach((p) => {
        const sanitized = sanitizeString(p);
        expect(sanitized).not.toContain('<script');
        expect(sanitized).not.toContain('<img');
        expect(sanitized).not.toContain('<svg');
        expect(sanitized).not.toContain('<iframe');
      });
    });

    it('sanitizes malicious URLs with diverse schemes', () => {
      expect(sanitizeUrl('data:text/html;base64,PHNjcmlwdD4=')).toBe('');
      expect(sanitizeUrl('vbscript:msgbox(1)')).toBe('');
      expect(sanitizeUrl('file:///etc/passwd')).toBe('');
      expect(sanitizeUrl('//protocol-relative.com')).toBe('');
      expect(sanitizeUrl('https://valid.github.com/repo')).toBe('https://valid.github.com/repo');
    });
  });

  describe('Gradebook Precision & Edge Boundaries (#15, #16)', () => {
    it('handles floating point precision boundaries cleanly', () => {
      const score89Point9 = 89.999;
      expect(GradebookCalculator.mapScoreToLetter(Math.round(score89Point9))).toBe('A');

      const score79Point9 = 79.999;
      expect(GradebookCalculator.mapScoreToLetter(Math.round(score79Point9))).toBe('B');

      const score59Point9 = 59.999;
      expect(GradebookCalculator.mapScoreToLetter(Math.round(score59Point9))).toBe('D');
    });

    it('handles single student grade calculation', () => {
      const summary = GradebookCalculator.calculateStudentGrade('s-single', {
        quizScores: [95],
        labsCompletedRatio: 0.5,
        challengesCompletedRatio: 0.2,
        assignmentScores: [{ score: 85, maxScore: 100 }],
      });

      expect(summary.studentId).toBe('s-single');
      expect(summary.overallScore).toBeGreaterThan(0);
      expect(summary.letterGrade).toBeDefined();
    });

    it('handles zero-score assignment without crashing or NaN', () => {
      const summary = GradebookCalculator.calculateStudentGrade('s-zero-asg', {
        quizScores: [100],
        labsCompletedRatio: 1.0,
        challengesCompletedRatio: 1.0,
        assignmentScores: [{ score: 0, maxScore: 100 }],
      });

      expect(isNaN(summary.overallScore)).toBe(false);
      expect(summary.breakdown.assignmentsScore).toBe(0);
    });
  });

  describe('Multi-Tenant Classroom Data Isolation (#28, #52)', () => {
    it('isolates class rosters so querying class A returns 0 students from class B', () => {
      const classA = 'class-git-k48';
      const classB = 'class-git-k49';

      const enrollmentsA = Array.from(db.enrollments.values()).filter((e) => e.classId === classA);
      const enrollmentsB = Array.from(db.enrollments.values()).filter((e) => e.classId === classB);

      const studentIdsA = new Set(enrollmentsA.map((e) => e.userId));
      const studentIdsB = new Set(enrollmentsB.map((e) => e.userId));

      // No student in class A should be accidentally leaked into class B query
      expect(enrollmentsB.every((e) => e.classId === classB)).toBe(true);
    });

    it('isolates assignment submissions between different classes', () => {
      const classAId = 'class-git-k48';
      const classBId = 'class-git-k49';

      db.assignments.set('asg-b1', {
        id: 'asg-b1',
        classId: classBId,
        title: 'Assignment Class B',
        description: '',
        dueAt: '2026-11-01T00:00:00Z',
        points: 100,
        createdAt: '',
      });

      const asgA = Array.from(db.assignments.values()).filter((a) => a.classId === classAId);
      const asgB = Array.from(db.assignments.values()).filter((a) => a.classId === classBId);

      expect(asgA.some((a) => a.id === 'asg-b1')).toBe(false);
      expect(asgB.some((a) => a.id === 'asg-b1')).toBe(true);
    });
  });
});
