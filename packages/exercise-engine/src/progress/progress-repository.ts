import {
  CourseProgress,
  LessonProgress,
  PersistedCourseData,
  ProgressRepository,
} from '@git-academy/shared';

export const STORAGE_KEY = 'git_academy_course_progress_v2';
export const LEGACY_STORAGE_KEY = 'git_academy_course_progress_v1';
export const CURRENT_SCHEMA_VERSION = 3;
export const CURRENT_COURSE_VERSION = '2.0.0';

export function createDefaultCourseProgress(userId = 'learner-default'): CourseProgress {
  return {
    userId,
    totalXp: 0,
    level: 1,
    streakDays: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    lessons: {},
    achievements: [],
  };
}

export function migrateV1toV2(raw: any): PersistedCourseData {
  // v1 was raw unversioned CourseProgress
  const progress: CourseProgress = {
    userId: raw?.userId || 'learner-default',
    totalXp: Number(raw?.totalXp) || 0,
    level: Number(raw?.level) || 1,
    streakDays: Number(raw?.streakDays) || 1,
    lastActiveDate: raw?.lastActiveDate || new Date().toISOString().split('T')[0],
    lessons: raw?.lessons && typeof raw.lessons === 'object' ? raw.lessons : {},
    achievements: Array.isArray(raw?.achievements) ? raw.achievements : [],
  };

  return {
    schemaVersion: 2,
    courseVersion: '1.0.0',
    progress,
  };
}

export function migrateV2toV3(data: PersistedCourseData): PersistedCourseData {
  const p = data.progress;
  // Ensure lesson progress has all fields and no undefined arrays
  const normalizedLessons: Record<string, LessonProgress> = {};
  if (p && p.lessons) {
    for (const [key, l] of Object.entries(p.lessons)) {
      normalizedLessons[key] = {
        lessonId: l.lessonId || key,
        completed: Boolean(l.completed),
        theoryViewed: Boolean(l.theoryViewed),
        quizScore: Number(l.quizScore) || 0,
        quizAttempts: Number(l.quizAttempts) || 0,
        labsCompleted: Array.isArray(l.labsCompleted) ? l.labsCompleted : [],
        xp: Number(l.xp) || 0,
        lastAttemptAt: l.lastAttemptAt || Date.now(),
      };
    }
  }

  return {
    schemaVersion: 3,
    courseVersion: CURRENT_COURSE_VERSION,
    progress: {
      userId: p?.userId || 'learner-default',
      totalXp: Number(p?.totalXp) || 0,
      level: Number(p?.level) || 1,
      streakDays: Number(p?.streakDays) || 1,
      lastActiveDate: p?.lastActiveDate || new Date().toISOString().split('T')[0],
      lessons: normalizedLessons,
      achievements: Array.isArray(p?.achievements) ? p.achievements : [],
    },
  };
}

export function migrateToLatest(raw: any): PersistedCourseData {
  if (!raw) {
    return {
      schemaVersion: CURRENT_SCHEMA_VERSION,
      courseVersion: CURRENT_COURSE_VERSION,
      progress: createDefaultCourseProgress(),
    };
  }

  let current = raw;
  // Check if unversioned v1
  if (typeof current.schemaVersion !== 'number') {
    current = migrateV1toV2(current);
  }

  if (current.schemaVersion === 2) {
    current = migrateV2toV3(current);
  }

  return current;
}

export class LocalStorageProgressRepository implements ProgressRepository {
  private memoryCache: CourseProgress;

  constructor(initialProgress?: CourseProgress) {
    this.memoryCache = initialProgress || this.loadFromStorage() || createDefaultCourseProgress();
  }

  private isStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  private loadFromStorage(): CourseProgress | null {
    if (!this.isStorageAvailable()) return null;
    try {
      // Check current storage key first
      const rawCurrent = window.localStorage.getItem(STORAGE_KEY);
      if (rawCurrent) {
        const parsed = JSON.parse(rawCurrent);
        const migrated = migrateToLatest(parsed);
        return migrated.progress;
      }

      // Check legacy storage key
      const rawLegacy = window.localStorage.getItem(LEGACY_STORAGE_KEY);
      if (rawLegacy) {
        const parsedLegacy = JSON.parse(rawLegacy);
        const migrated = migrateToLatest(parsedLegacy);
        // Persist under new schema
        this.memoryCache = migrated.progress;
        this.persist();
        return migrated.progress;
      }
    } catch (err) {
      console.warn('Failed to read from localStorage, using memoryCache:', err);
    }
    return null;
  }

  private persist(): void {
    if (!this.isStorageAvailable()) return;
    try {
      const persistedData: PersistedCourseData = {
        schemaVersion: CURRENT_SCHEMA_VERSION,
        courseVersion: CURRENT_COURSE_VERSION,
        progress: this.memoryCache,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persistedData));
    } catch (err) {
      console.warn('Failed to write to localStorage:', err);
    }
  }

  public async getCourseProgress(): Promise<CourseProgress> {
    return JSON.parse(JSON.stringify(this.memoryCache));
  }

  public async getLessonProgress(lessonId: string): Promise<LessonProgress | null> {
    const lesson = this.memoryCache.lessons[lessonId];
    return lesson ? JSON.parse(JSON.stringify(lesson)) : null;
  }

  public async saveLessonProgress(progress: LessonProgress): Promise<void> {
    this.memoryCache.lessons[progress.lessonId] = {
      ...progress,
      lastAttemptAt: Date.now(),
    };
    this.persist();
  }

  public async resetLesson(lessonId: string): Promise<void> {
    if (this.memoryCache.lessons[lessonId]) {
      this.memoryCache.lessons[lessonId] = {
        lessonId,
        completed: false,
        theoryViewed: false,
        quizScore: 0,
        quizAttempts: 0,
        labsCompleted: [],
        xp: 0,
        lastAttemptAt: Date.now(),
      };
      this.persist();
    }
  }

  public async addXp(amount: number): Promise<CourseProgress> {
    this.memoryCache.totalXp += amount;
    this.memoryCache.level = Math.floor(Math.sqrt(this.memoryCache.totalXp / 50)) + 1;
    this.persist();
    return this.getCourseProgress();
  }

  public async addAchievement(achievementId: string, xp = 0): Promise<CourseProgress> {
    if (!this.memoryCache.achievements.includes(achievementId)) {
      this.memoryCache.achievements.push(achievementId);
      if (xp > 0) {
        this.memoryCache.totalXp += xp;
        this.memoryCache.level = Math.floor(Math.sqrt(this.memoryCache.totalXp / 50)) + 1;
      }
      this.persist();
    }
    return this.getCourseProgress();
  }

  public async unlockAchievement(achievementId: string): Promise<boolean> {
    if (!this.memoryCache.achievements.includes(achievementId)) {
      this.memoryCache.achievements.push(achievementId);
      this.persist();
      return true;
    }
    return false;
  }

  public clear(): void {
    this.memoryCache = createDefaultCourseProgress();
    if (this.isStorageAvailable()) {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }
}
