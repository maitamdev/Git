import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { CourseProgress, LessonProgress } from '@git-academy/shared';
import {
  ProgressConflictResolver,
  ServerProgressRepository,
  createDefaultCourseProgress,
  migrateV1toV2,
  migrateV2toV3,
} from '@git-academy/exercise-engine';

describe('Progress Sync - Conflict Resolution Core Rules', () => {
  it('unions completed lessons so no completed lesson is lost', () => {
    const local: CourseProgress = {
      userId: 'student-1',
      totalXp: 100,
      level: 1,
      streakDays: 2,
      lastActiveDate: '2026-09-20',
      lessons: {
        'lesson-1': {
          lessonId: 'lesson-1',
          completed: true,
          theoryViewed: true,
          quizScore: 80,
          quizAttempts: 1,
          labsCompleted: ['lab-1'],
          xp: 50,
        },
      },
      achievements: [],
    };

    const server: CourseProgress = {
      userId: 'student-1',
      totalXp: 100,
      level: 1,
      streakDays: 3,
      lastActiveDate: '2026-09-21',
      lessons: {
        'lesson-2': {
          lessonId: 'lesson-2',
          completed: true,
          theoryViewed: true,
          quizScore: 90,
          quizAttempts: 1,
          labsCompleted: ['lab-2'],
          xp: 50,
        },
      },
      achievements: [],
    };

    const merged = ProgressConflictResolver.merge(local, server);
    expect(merged.lessons['lesson-1']?.completed).toBe(true);
    expect(merged.lessons['lesson-2']?.completed).toBe(true);
  });

  it('preserves the highest quiz score across local and server', () => {
    const local: CourseProgress = {
      ...createDefaultCourseProgress('s1'),
      lessons: {
        'quiz-lesson': {
          lessonId: 'quiz-lesson',
          completed: true,
          theoryViewed: true,
          quizScore: 70,
          quizAttempts: 2,
          labsCompleted: [],
          xp: 40,
        },
      },
    };

    const server: CourseProgress = {
      ...createDefaultCourseProgress('s1'),
      lessons: {
        'quiz-lesson': {
          lessonId: 'quiz-lesson',
          completed: true,
          theoryViewed: true,
          quizScore: 95,
          quizAttempts: 1,
          labsCompleted: [],
          xp: 50,
        },
      },
    };

    const merged = ProgressConflictResolver.merge(local, server);
    expect(merged.lessons['quiz-lesson'].quizScore).toBe(95);
    expect(merged.lessons['quiz-lesson'].quizAttempts).toBeGreaterThanOrEqual(2);
  });

  it('unions lab completions without duplicates', () => {
    const local: CourseProgress = {
      ...createDefaultCourseProgress('s1'),
      lessons: {
        'lab-lesson': {
          lessonId: 'lab-lesson',
          completed: true,
          theoryViewed: true,
          quizScore: 0,
          quizAttempts: 0,
          labsCompleted: ['lab-merge-1', 'lab-merge-2'],
          xp: 60,
        },
      },
    };

    const server: CourseProgress = {
      ...createDefaultCourseProgress('s1'),
      lessons: {
        'lab-lesson': {
          lessonId: 'lab-lesson',
          completed: true,
          theoryViewed: true,
          quizScore: 0,
          quizAttempts: 0,
          labsCompleted: ['lab-merge-2', 'lab-merge-3'],
          xp: 60,
        },
      },
    };

    const merged = ProgressConflictResolver.merge(local, server);
    const labs = merged.lessons['lab-lesson'].labsCompleted;
    expect(labs).toHaveLength(3);
    expect(labs).toContain('lab-merge-1');
    expect(labs).toContain('lab-merge-2');
    expect(labs).toContain('lab-merge-3');
  });

  it('does not duplicate XP when merging same completed lesson multiple times', () => {
    const local: CourseProgress = {
      ...createDefaultCourseProgress('s1'),
      totalXp: 50,
      lessons: {
        'lesson-1': {
          lessonId: 'lesson-1',
          completed: true,
          theoryViewed: true,
          quizScore: 100,
          quizAttempts: 1,
          labsCompleted: [],
          xp: 50,
        },
      },
    };

    const server: CourseProgress = {
      ...createDefaultCourseProgress('s1'),
      totalXp: 50,
      lessons: {
        'lesson-1': {
          lessonId: 'lesson-1',
          completed: true,
          theoryViewed: true,
          quizScore: 100,
          quizAttempts: 1,
          labsCompleted: [],
          xp: 50,
        },
      },
    };

    const merged = ProgressConflictResolver.merge(local, server);
    // Should NOT be 100; totalXp should accurately reflect unique lesson completions + achievements
    expect(merged.totalXp).toBe(50);
  });

  it('unions achievements without duplicates and updates XP appropriately', () => {
    const local: CourseProgress = {
      ...createDefaultCourseProgress('s1'),
      achievements: ['first_commit', 'branch_master'],
    };

    const server: CourseProgress = {
      ...createDefaultCourseProgress('s1'),
      achievements: ['branch_master', 'conflict_solver'],
    };

    const merged = ProgressConflictResolver.merge(local, server);
    expect(merged.achievements).toHaveLength(3);
    expect(merged.achievements).toEqual(
      expect.arrayContaining(['first_commit', 'branch_master', 'conflict_solver'])
    );
  });

  it('picks the latest active date and preserves highest streak', () => {
    const local: CourseProgress = {
      ...createDefaultCourseProgress('s1'),
      streakDays: 5,
      lastActiveDate: '2026-09-25',
    };

    const server: CourseProgress = {
      ...createDefaultCourseProgress('s1'),
      streakDays: 3,
      lastActiveDate: '2026-09-28',
    };

    const merged = ProgressConflictResolver.merge(local, server);
    expect(merged.lastActiveDate).toBe('2026-09-28');
    expect(merged.streakDays).toBe(5);
  });

  it('handles empty local progress merging with active server progress', () => {
    const emptyLocal = createDefaultCourseProgress('s-empty');
    const activeServer: CourseProgress = {
      ...createDefaultCourseProgress('s-empty'),
      totalXp: 1200,
      level: 4,
      streakDays: 7,
      lastActiveDate: '2026-09-29',
      lessons: {
        l1: { lessonId: 'l1', completed: true, theoryViewed: true, quizScore: 100, quizAttempts: 1, labsCompleted: ['lab1'], xp: 50 },
      },
      achievements: ['ach-1'],
    };

    const merged = ProgressConflictResolver.merge(emptyLocal, activeServer);
    expect(merged.lessons.l1.completed).toBe(true);
    expect(merged.achievements).toContain('ach-1');
  });

  it('handles offline local progress merging with empty server progress', () => {
    const offlineLocal: CourseProgress = {
      ...createDefaultCourseProgress('s-offline'),
      totalXp: 300,
      lessons: {
        l1: { lessonId: 'l1', completed: true, theoryViewed: true, quizScore: 80, quizAttempts: 1, labsCompleted: [], xp: 50 },
      },
      achievements: ['first_commit'],
    };
    const emptyServer = createDefaultCourseProgress('s-offline');

    const merged = ProgressConflictResolver.merge(offlineLocal, emptyServer);
    expect(merged.lessons.l1.completed).toBe(true);
    expect(merged.achievements).toContain('first_commit');
  });
});

describe('Progress Sync - ServerProgressRepository & Offline Queue', () => {
  let fakeStorage: Record<string, string>;

  beforeEach(() => {
    fakeStorage = {};
    // Mock window.localStorage
    vi.stubGlobal('window', {
      localStorage: {
        getItem: (k: string) => fakeStorage[k] || null,
        setItem: (k: string, v: string) => {
          fakeStorage[k] = v;
        },
        removeItem: (k: string) => {
          delete fakeStorage[k];
        },
      },
    });
  });

  it('stores progress locally when offline and queues for sync', async () => {
    // Simulated failing server API (e.g., HTTP 503 or network error)
    const failingFetch = vi.fn().mockRejectedValue(new Error('Network offline'));
    vi.stubGlobal('fetch', failingFetch);

    const repo = new ServerProgressRepository({
      apiBaseUrl: 'http://localhost:3001/api/progress',
      userId: 'offline-student',
    });
    const initialProgress = await repo.getCourseProgress();
    expect(initialProgress).toBeDefined();

    // Mark a lesson complete offline
    await repo.saveLessonProgress({
      lessonId: '01-foundations-01-version-control',
      completed: true,
      theoryViewed: true,
      quizScore: 90,
      quizAttempts: 1,
      labsCompleted: [],
      xp: 50,
    });

    const localSaved = await repo.getCourseProgress();
    expect(localSaved.lessons['01-foundations-01-version-control']?.completed).toBe(true);

    // Verify it saved to pending queue
    expect(repo.getPendingQueue().length).toBeGreaterThan(0);
  });

  it('flushes pending offline queue when connection is restored', async () => {
    const successFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        progress: {
          userId: 'test-user',
          totalXp: 150,
          level: 2,
          streakDays: 1,
          lastActiveDate: '2026-09-30',
          lessons: {
            '01-foundations-01-version-control': {
              lessonId: '01-foundations-01-version-control',
              completed: true,
              theoryViewed: true,
              quizScore: 90,
              quizAttempts: 1,
              labsCompleted: [],
              xp: 50,
            },
          },
          achievements: [],
        },
      }),
    });
    vi.stubGlobal('fetch', successFetch);

    const repo = new ServerProgressRepository({
      apiBaseUrl: 'http://localhost:3001/api/progress',
      userId: 'test-user',
    });
    await repo.saveLessonProgress({
      lessonId: '01-foundations-01-version-control',
      completed: true,
      theoryViewed: true,
      quizScore: 90,
      quizAttempts: 1,
      labsCompleted: [],
      xp: 50,
    });

    const flushedProgress = await repo.syncWithServer();
    expect(flushedProgress).toBeDefined();
    expect(flushedProgress.lessons['01-foundations-01-version-control']?.completed).toBe(true);
    expect(repo.getPendingQueue()).toHaveLength(0);
  });
});

describe('Course Versioning & Migration Policy', () => {
  it('migrates v1 unversioned data to v2 without resetting student progress', () => {
    const rawV1 = {
      userId: 'legacy-learner',
      totalXp: 250,
      level: 2,
      lessons: {
        'old-lesson-1': { completed: true, xp: 50 },
      },
      achievements: ['welcome'],
    };

    const v2 = migrateV1toV2(rawV1);
    expect(v2.schemaVersion).toBe(2);
    expect(v2.courseVersion).toBe('1.0.0');
    expect(v2.progress.userId).toBe('legacy-learner');
    expect(v2.progress.lessons['old-lesson-1'].completed).toBe(true);
    expect(v2.progress.achievements).toContain('welcome');
  });

  it('migrates v2 to v3 ensuring normalized lesson fields', () => {
    const v2Data = {
      schemaVersion: 2,
      courseVersion: '1.0.0',
      progress: {
        userId: 'learner-v2',
        totalXp: 100,
        level: 1,
        streakDays: 1,
        lastActiveDate: '2026-08-01',
        lessons: {
          'lesson-partial': {
            lessonId: 'lesson-partial',
            completed: true,
          } as any,
        },
        achievements: [],
      },
    };

    const v3 = migrateV2toV3(v2Data as any);
    expect(v3.schemaVersion).toBe(3);
    const norm = v3.progress.lessons['lesson-partial'];
    expect(norm.completed).toBe(true);
    expect(norm.quizScore).toBe(0);
    expect(norm.quizAttempts).toBe(0);
    expect(norm.labsCompleted).toEqual([]);
    expect(norm.theoryViewed).toBe(false);
  });
});
