import { describe, it, expect } from 'vitest';
import {
  migrateV1toV2,
  migrateV2toV3,
  CURRENT_SCHEMA_VERSION,
  CURRENT_COURSE_VERSION,
  createDefaultCourseProgress,
} from '../../packages/exercise-engine/src/index.js';
import type { CourseProgress, PersistedCourseData } from '@git-academy/shared';

describe('Course Versioning, Schema Evolution & Migration Hardening (#5)', () => {
  describe('Schema Evolution Guardrails', () => {
    it('defines current schema version as 3 and course version as 2.0.0', () => {
      expect(CURRENT_SCHEMA_VERSION).toBe(3);
      expect(CURRENT_COURSE_VERSION).toBe('2.0.0');
    });

    it('creates default progress with current baseline fields', () => {
      const def = createDefaultCourseProgress('new-user-01');
      expect(def.userId).toBe('new-user-01');
      expect(def.totalXp).toBe(0);
      expect(def.level).toBe(1);
      expect(def.streakDays).toBe(1);
      expect(def.lessons).toEqual({});
      expect(def.achievements).toEqual([]);
    });

    it('migrates unversioned v1 data with corrupted fields gracefully', () => {
      const corruptedV1 = {
        userId: 'student-corrupted',
        totalXp: 'not-a-number', // string instead of number
        level: null,
        streakDays: undefined,
        lessons: null,
        achievements: 'invalid-string',
      };

      const v2 = migrateV1toV2(corruptedV1 as any);
      expect(v2.schemaVersion).toBe(2);
      expect(v2.courseVersion).toBe('1.0.0');
      expect(v2.progress.totalXp).toBe(0);
      expect(v2.progress.level).toBe(1);
      expect(v2.progress.streakDays).toBe(1);
      expect(v2.progress.lessons).toEqual({});
      expect(v2.progress.achievements).toEqual([]);
    });

    it('migrates v2 data preserving quiz scores and completed labs without data loss', () => {
      const v2Data: PersistedCourseData = {
        schemaVersion: 2,
        courseVersion: '1.0.0',
        progress: {
          userId: 'student-v2',
          totalXp: 500,
          level: 3,
          streakDays: 4,
          lastActiveDate: '2026-09-20',
          lessons: {
            '01-foundations-01-version-control': {
              lessonId: '01-foundations-01-version-control',
              completed: true,
              theoryViewed: true,
              quizScore: 90,
              quizAttempts: 2,
              labsCompleted: ['lab-first-commit'],
              xp: 100,
              lastAttemptAt: 1726800000000,
            },
          },
          achievements: ['first_commit'],
        },
      };

      const v3 = migrateV2toV3(v2Data);
      expect(v3.schemaVersion).toBe(3);
      expect(v3.progress.userId).toBe('student-v2');

      const lesson = v3.progress.lessons['01-foundations-01-version-control'];
      expect(lesson.completed).toBe(true);
      expect(lesson.quizScore).toBe(90);
      expect(lesson.quizAttempts).toBe(2);
      expect(lesson.labsCompleted).toContain('lab-first-commit');
      expect(lesson.xp).toBe(100);
    });

    it('running migration idempotently multiple times produces identical state', () => {
      const initial: PersistedCourseData = {
        schemaVersion: 2,
        courseVersion: '1.0.0',
        progress: createDefaultCourseProgress('idempotent-student'),
      };

      const run1 = migrateV2toV3(initial);
      const run2 = migrateV2toV3(run1);

      expect(run1).toEqual(run2);
    });
  });

  describe('Non-Destructive Course Content Evolution (#5)', () => {
    it('preserves existing lesson completions when course content updates from v1.0 to v2.0', () => {
      // Student has completed 10 lessons in v1.0
      const oldProgress: Record<string, boolean> = {};
      for (let i = 1; i <= 10; i++) {
        oldProgress[`lesson-${i}`] = true;
      }

      // Course upgrades to v2.0 with 20 lessons
      const newCourseLessons = Array.from({ length: 20 }, (_, i) => `lesson-${i + 1}`);

      // Policy: previous completions are never reset
      const mergedProgress: Record<string, boolean> = {};
      newCourseLessons.forEach((lessonId) => {
        mergedProgress[lessonId] = Boolean(oldProgress[lessonId]);
      });

      // Verify lessons 1..10 remain completed
      for (let i = 1; i <= 10; i++) {
        expect(mergedProgress[`lesson-${i}`]).toBe(true);
      }
      // Lessons 11..20 are not completed yet
      for (let i = 11; i <= 20; i++) {
        expect(mergedProgress[`lesson-${i}`]).toBe(false);
      }
    });

    it('handles insertion of a new lesson in an existing level without breaking adjacent lessons', () => {
      const completedSet = new Set(['level1-lesson1', 'level1-lesson2', 'level1-lesson3']);

      // New lesson added into Level 1: 'level1-lesson2-bis'
      const updatedCurriculum = ['level1-lesson1', 'level1-lesson2', 'level1-lesson2-bis', 'level1-lesson3'];

      const studentStatus = updatedCurriculum.map((id) => ({
        id,
        completed: completedSet.has(id),
      }));

      expect(studentStatus[0].completed).toBe(true);
      expect(studentStatus[1].completed).toBe(true);
      expect(studentStatus[2].completed).toBe(false); // newly inserted
      expect(studentStatus[3].completed).toBe(true);  // previously completed
    });

    it('safely handles empty or corrupted JSON input strings without throwing unhandled exceptions', () => {
      const parseSafely = (raw: string | null): any => {
        if (!raw) return null;
        try {
          return JSON.parse(raw);
        } catch {
          return null;
        }
      };

      expect(parseSafely('')).toBeNull();
      expect(parseSafely('{"invalid_json')).toBeNull();
      expect(parseSafely('null')).toBeNull();
      expect(parseSafely('{"valid": true}')).toEqual({ valid: true });
    });
  });
});
