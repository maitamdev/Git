import { describe, it, expect, beforeEach } from 'vitest';
import {
  createDefaultCourseProgress,
  migrateV1toV2,
  migrateV2toV3,
  migrateToLatest,
  LocalStorageProgressRepository,
  CURRENT_SCHEMA_VERSION,
  CURRENT_COURSE_VERSION,
} from '../src/progress/progress-repository';

// Mock localStorage for node environment
class MockLocalStorage {
  private store: Record<string, string> = {};

  getItem(key: string): string | null {
    return this.store[key] ?? null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = String(value);
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  clear(): void {
    this.store = {};
  }
}

describe('Progress Schema Versioning & Migration (A5)', () => {
  beforeEach(() => {
    (global as any).localStorage = new MockLocalStorage();
  });

  describe('createDefaultCourseProgress', () => {
    it('creates default progress with correct initial values', () => {
      const progress = createDefaultCourseProgress('user-123');
      expect(progress.userId).toBe('user-123');
      expect(progress.totalXp).toBe(0);
      expect(progress.level).toBe(1);
      expect(progress.streakDays).toBe(1);
      expect(progress.lessons).toEqual({});
      expect(progress.achievements).toEqual([]);
      expect(typeof progress.lastActiveDate).toBe('string');
    });

    it('falls back to learner-default when userId not provided', () => {
      const progress = createDefaultCourseProgress();
      expect(progress.userId).toBe('learner-default');
    });
  });

  describe('migrateV1toV2', () => {
    it('migrates unversioned v1 progress to v2 envelope', () => {
      const v1Data = {
        userId: 'student-42',
        totalXp: 150,
        level: 2,
        streakDays: 3,
        lastActiveDate: '2026-09-28',
        lessons: {
          'git-commit': {
            lessonId: 'git-commit',
            completed: true,
            quizScore: 100,
          },
        },
        achievements: ['first-repo'],
      };

      const v2 = migrateV1toV2(v1Data);
      expect(v2.schemaVersion).toBe(2);
      expect(v2.courseVersion).toBe('1.0.0');
      expect(v2.progress.userId).toBe('student-42');
      expect(v2.progress.totalXp).toBe(150);
      expect(v2.progress.level).toBe(2);
      expect(v2.progress.achievements).toContain('first-repo');
      expect(v2.progress.lessons['git-commit'].completed).toBe(true);
    });

    it('handles empty or malformed v1 data gracefully', () => {
      const v2 = migrateV1toV2(null);
      expect(v2.schemaVersion).toBe(2);
      expect(v2.progress.userId).toBe('learner-default');
      expect(v2.progress.totalXp).toBe(0);
      expect(v2.progress.lessons).toEqual({});
      expect(v2.progress.achievements).toEqual([]);
    });

    it('coerces string numbers to actual numbers', () => {
      const v1Data = {
        totalXp: '250',
        level: '3',
        streakDays: '5',
      };
      const v2 = migrateV1toV2(v1Data);
      expect(v2.progress.totalXp).toBe(250);
      expect(v2.progress.level).toBe(3);
      expect(v2.progress.streakDays).toBe(5);
    });
  });

  describe('migrateV2toV3', () => {
    it('normalizes missing lesson fields in v2 to standard v3 lesson progress', () => {
      const v2Data = {
        schemaVersion: 2,
        courseVersion: '1.0.0',
        progress: {
          userId: 'student-99',
          totalXp: 50,
          level: 1,
          streakDays: 1,
          lastActiveDate: '2026-09-28',
          lessons: {
            'level-1-foundations-01-vcs': {
              lessonId: 'level-1-foundations-01-vcs',
              completed: true,
              quizScore: 80,
              // missing labsCompleted, quizAttempts, theoryViewed, xp
            } as any,
          },
          achievements: ['first-repo'],
        },
      };

      const v3 = migrateV2toV3(v2Data);
      expect(v3.schemaVersion).toBe(3);
      expect(v3.courseVersion).toBe(CURRENT_COURSE_VERSION);
      const lesson = v3.progress.lessons['level-1-foundations-01-vcs'];
      expect(lesson).toBeDefined();
      expect(lesson.completed).toBe(true);
      expect(lesson.theoryViewed).toBe(false);
      expect(lesson.quizAttempts).toBe(0);
      expect(lesson.labsCompleted).toEqual([]);
      expect(lesson.xp).toBe(0);
      expect(typeof lesson.lastAttemptAt).toBe('number');
    });

    it('handles missing progress or empty lessons in v2', () => {
      const v2Data = {
        schemaVersion: 2,
        courseVersion: '1.0.0',
        progress: null as any,
      };

      const v3 = migrateV2toV3(v2Data);
      expect(v3.schemaVersion).toBe(3);
      expect(v3.progress.userId).toBe('learner-default');
      expect(v3.progress.lessons).toEqual({});
      expect(v3.progress.achievements).toEqual([]);
    });
  });

  describe('migrateToLatest', () => {
    it('returns brand new default v3 data if raw is null or undefined', () => {
      const latest = migrateToLatest(null);
      expect(latest.schemaVersion).toBe(CURRENT_SCHEMA_VERSION);
      expect(latest.courseVersion).toBe(CURRENT_COURSE_VERSION);
      expect(latest.progress.userId).toBe('learner-default');
      expect(latest.progress.totalXp).toBe(0);
    });

    it('migrates raw v1 data directly through to latest (v3)', () => {
      const legacyRaw = {
        userId: 'legacy-user',
        totalXp: 300,
        level: 4,
        streakDays: 7,
        lessons: {
          'git-commit': {
            lessonId: 'git-commit',
            completed: true,
            quizScore: 100,
          },
        },
        achievements: ['first-repo', 'first-commit'],
      };

      const latest = migrateToLatest(legacyRaw);
      expect(latest.schemaVersion).toBe(CURRENT_SCHEMA_VERSION);
      expect(latest.courseVersion).toBe(CURRENT_COURSE_VERSION);
      expect(latest.progress.userId).toBe('legacy-user');
      expect(latest.progress.totalXp).toBe(300);
      expect(latest.progress.achievements).toEqual(['first-repo', 'first-commit']);
      expect(latest.progress.lessons['git-commit'].completed).toBe(true);
      expect(latest.progress.lessons['git-commit'].labsCompleted).toEqual([]);
    });

    it('leaves already v3 data untouched without losing information', () => {
      const v3Data = {
        schemaVersion: 3,
        courseVersion: CURRENT_COURSE_VERSION,
        progress: {
          userId: 'modern-user',
          totalXp: 500,
          level: 5,
          streakDays: 10,
          lastActiveDate: '2026-09-29',
          lessons: {
            'level-2-git-basics-01': {
              lessonId: 'level-2-git-basics-01',
              completed: true,
              theoryViewed: true,
              quizScore: 100,
              quizAttempts: 1,
              labsCompleted: ['lab-01'],
              xp: 50,
              lastAttemptAt: 12345678,
            },
          },
          achievements: ['first-repo'],
        },
      };

      const result = migrateToLatest(v3Data);
      expect(result.schemaVersion).toBe(3);
      expect(result.progress.userId).toBe('modern-user');
      expect(result.progress.lessons['level-2-git-basics-01'].labsCompleted).toEqual(['lab-01']);
    });
  });

  describe('LocalStorageProgressRepository', () => {
    beforeEach(() => {
      const mockStorage = new MockLocalStorage();
      (global as any).window = { localStorage: mockStorage };
      (global as any).localStorage = mockStorage;
    });

    it('loads default progress if storage is empty', async () => {
      const repo = new LocalStorageProgressRepository();
      const progress = await repo.getCourseProgress();
      expect(progress.userId).toBe('learner-default');
      expect(progress.totalXp).toBe(0);
    });

    it('persists progress and retrieves it accurately', async () => {
      const repo = new LocalStorageProgressRepository();
      await repo.addXp(120);

      const reloaded = await repo.getCourseProgress();
      expect(reloaded.totalXp).toBe(120);
    });

    it('saves and retrieves lesson progress correctly', async () => {
      const repo = new LocalStorageProgressRepository();
      await repo.saveLessonProgress({
        lessonId: 'lesson-quiz-1',
        completed: true,
        theoryViewed: true,
        quizScore: 100,
        quizAttempts: 1,
        labsCompleted: ['lab-01'],
        xp: 50,
        lastAttemptAt: Date.now(),
      });

      const l = await repo.getLessonProgress('lesson-quiz-1');
      expect(l).toBeDefined();
      expect(l?.quizScore).toBe(100);
      expect(l?.quizAttempts).toBe(1);
      expect(l?.completed).toBe(true);
      expect(l?.labsCompleted).toEqual(['lab-01']);
    });

    it('resets lesson progress when requested', async () => {
      const repo = new LocalStorageProgressRepository();
      await repo.saveLessonProgress({
        lessonId: 'lesson-reset-1',
        completed: true,
        theoryViewed: true,
        quizScore: 90,
        quizAttempts: 2,
        labsCompleted: ['lab-a'],
        xp: 40,
        lastAttemptAt: Date.now(),
      });

      await repo.resetLesson('lesson-reset-1');
      const reset = await repo.getLessonProgress('lesson-reset-1');
      expect(reset).toBeDefined();
      expect(reset?.completed).toBe(false);
      expect(reset?.quizScore).toBe(0);
      expect(reset?.labsCompleted).toEqual([]);
    });

    it('awards XP and updates player level', async () => {
      const repo = new LocalStorageProgressRepository();
      const p = await repo.addXp(250);

      expect(p.totalXp).toBe(250);
      expect(p.level).toBeGreaterThan(1);
    });

    it('unlocks achievement once and avoids duplicates', async () => {
      const repo = new LocalStorageProgressRepository();
      const first = await repo.unlockAchievement('first-repo');
      expect(first).toBe(true);

      const duplicate = await repo.unlockAchievement('first-repo');
      expect(duplicate).toBe(false);

      const p = await repo.getCourseProgress();
      expect(p.achievements).toEqual(['first-repo']);
    });

    it('migrates legacy v1 storage key on startup without crashing', async () => {
      // Simulate v1 legacy storage item
      const legacyV1 = {
        userId: 'legacy-key-user',
        totalXp: 80,
        level: 1,
        streakDays: 2,
        lessons: {},
        achievements: [],
      };
      (global as any).window.localStorage.setItem('git_academy_course_progress_v1', JSON.stringify(legacyV1));

      const repo = new LocalStorageProgressRepository();
      const p = await repo.getCourseProgress();
      expect(p.userId).toBe('legacy-key-user');
      expect(p.totalXp).toBe(80);
    });

    it('clears storage and resets memory cache', async () => {
      const repo = new LocalStorageProgressRepository();
      await repo.addXp(300);
      repo.clear();

      const p = await repo.getCourseProgress();
      expect(p.totalXp).toBe(0);
    });
  });
});
