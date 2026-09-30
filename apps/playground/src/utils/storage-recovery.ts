import type { CourseProgress, PersistedCourseData } from '@git-academy/shared';

export const PROGRESS_STORAGE_KEY = 'git_academy_progress';
export const PROGRESS_BACKUP_KEY = 'git_academy_progress_backup';

export interface StorageRecoveryResult<T> {
  data: T;
  recovered: boolean;
  error?: string;
  source: 'primary' | 'backup' | 'fresh_fallback';
}

/**
 * Validates whether an object adheres to the expected CourseProgress structure.
 */
export function isValidCourseProgress(obj: unknown): obj is CourseProgress {
  if (!obj || typeof obj !== 'object') return false;
  const p = obj as Record<string, unknown>;

  if (typeof p.userId !== 'string') return false;
  if (typeof p.totalXp !== 'number' || p.totalXp < 0 || !Number.isFinite(p.totalXp)) return false;
  if (typeof p.level !== 'number' || p.level < 1 || !Number.isFinite(p.level)) return false;
  if (typeof p.streakDays !== 'number' || p.streakDays < 0 || !Number.isFinite(p.streakDays)) return false;
  if (!p.lessons || typeof p.lessons !== 'object') return false;
  if (!Array.isArray(p.achievements)) return false;

  return true;
}

/**
 * Returns a pristine initial CourseProgress object.
 */
export function createDefaultProgress(userId = 'default_student'): CourseProgress {
  return {
    userId,
    totalXp: 0,
    level: 1,
    streakDays: 0,
    lastActiveDate: new Date().toISOString().split('T')[0],
    lessons: {},
    achievements: [],
  };
}

/**
 * Safely writes progress data to localStorage with automated backup and quota failure protection.
 */
export function safeSaveProgress(progress: CourseProgress, key = PROGRESS_STORAGE_KEY): boolean {
  if (!isValidCourseProgress(progress)) {
    console.error('[StorageRecovery] Attempted to save invalid progress data. Aborting save.');
    return false;
  }

  try {
    const raw = JSON.stringify(progress);
    // Write primary
    localStorage.setItem(key, raw);
    // Write rolling backup
    localStorage.setItem(PROGRESS_BACKUP_KEY, raw);
    return true;
  } catch (err) {
    console.error('[StorageRecovery] Failed to save progress to localStorage (possible quota exceeded):', err);
    return false;
  }
}

/**
 * Loads course progress with multi-tier recovery fallback:
 * 1. Read primary storage slot
 * 2. If corrupted, attempt backup slot
 * 3. If backup also corrupted or missing, initialize fresh progress and preserve corrupted data in quarantine slot
 */
export function safeLoadProgress(key = PROGRESS_STORAGE_KEY): StorageRecoveryResult<CourseProgress> {
  const defaultProgress = createDefaultProgress();

  if (typeof window === 'undefined' || !window.localStorage) {
    return {
      data: defaultProgress,
      recovered: false,
      source: 'fresh_fallback',
    };
  }

  // 1. Try reading primary storage slot
  try {
    const rawPrimary = localStorage.getItem(key);
    if (rawPrimary) {
      const parsed = JSON.parse(rawPrimary);
      // Check if wrapper PersistedCourseData
      const candidate: CourseProgress = (parsed as PersistedCourseData).progress || parsed;
      if (isValidCourseProgress(candidate)) {
        return {
          data: candidate,
          recovered: false,
          source: 'primary',
        };
      }
    }
  } catch (primaryErr) {
    console.warn('[StorageRecovery] Primary storage corrupted:', primaryErr);
  }

  // 2. Primary failed or corrupted - try recovery from backup slot
  try {
    const rawBackup = localStorage.getItem(PROGRESS_BACKUP_KEY);
    if (rawBackup) {
      const parsedBackup = JSON.parse(rawBackup);
      const candidateBackup: CourseProgress = (parsedBackup as PersistedCourseData).progress || parsedBackup;
      if (isValidCourseProgress(candidateBackup)) {
        console.info('[StorageRecovery] Successfully recovered progress from backup slot.');
        // Re-write to primary slot
        safeSaveProgress(candidateBackup, key);
        return {
          data: candidateBackup,
          recovered: true,
          error: 'Primary slot corrupted; restored from backup slot.',
          source: 'backup',
        };
      }
    }
  } catch (backupErr) {
    console.warn('[StorageRecovery] Backup storage corrupted:', backupErr);
  }

  // 3. Both failed - quarantine corrupted item for forensic analysis and reset to default
  try {
    const corruptedRaw = localStorage.getItem(key);
    if (corruptedRaw) {
      localStorage.setItem(`${key}_corrupted_${Date.now()}`, corruptedRaw);
    }
    safeSaveProgress(defaultProgress, key);
  } catch {
    // Ignore storage errors on quarantine
  }

  return {
    data: defaultProgress,
    recovered: true,
    error: 'All storage slots corrupted or empty; initialized clean state.',
    source: 'fresh_fallback',
  };
}

/**
 * Resets course progress to clean initial state.
 */
export function resetCourseProgress(key = PROGRESS_STORAGE_KEY): CourseProgress {
  const clean = createDefaultProgress();
  safeSaveProgress(clean, key);
  return clean;
}
