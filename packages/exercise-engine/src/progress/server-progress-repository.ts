import {
  CourseProgress,
  LessonProgress,
  ProgressRepository,
} from '@git-academy/shared';
import { ProgressConflictResolver } from './conflict-resolver';
import { LocalStorageProgressRepository } from './progress-repository';

export interface ServerProgressRepositoryOptions {
  apiBaseUrl?: string;
  fallbackLocalRepo?: ProgressRepository;
  userId?: string;
  fetchFn?: typeof fetch;
}

export class ServerProgressRepository implements ProgressRepository {
  private apiBaseUrl: string;
  private localRepo: ProgressRepository;
  private userId: string;
  private fetchFn: typeof fetch;
  private pendingQueue: LessonProgress[] = [];
  private isOnline = true;

  constructor(options: ServerProgressRepositoryOptions = {}) {
    this.apiBaseUrl = options.apiBaseUrl || '/api/progress';
    this.localRepo = options.fallbackLocalRepo || new LocalStorageProgressRepository();
    this.userId = options.userId || 'learner-default';
    this.fetchFn = options.fetchFn || (typeof fetch !== 'undefined' ? fetch.bind(globalThis) : (async () => ({ ok: false })) as any);
  }

  public setUserId(userId: string): void {
    this.userId = userId;
  }

  public getPendingQueue(): LessonProgress[] {
    return [...this.pendingQueue];
  }

  public async getCourseProgress(): Promise<CourseProgress> {
    const localProgress = await this.localRepo.getCourseProgress();

    try {
      const res = await this.fetchFn(`${this.apiBaseUrl}?userId=${encodeURIComponent(this.userId)}`);
      if (res.ok) {
        this.isOnline = true;
        const data = await res.json();
        const serverProgress: CourseProgress = data.progress;

        // Perform conflict resolution merge
        const merged = ProgressConflictResolver.merge(localProgress, serverProgress);

        // Update local cache with merged result
        for (const l of Object.values(merged.lessons)) {
          await this.localRepo.saveLessonProgress(l);
        }

        // Flush any pending queue
        if (this.pendingQueue.length > 0) {
          await this.flushPendingQueue();
        }

        return merged;
      }
    } catch {
      // Network failure: offline mode
      this.isOnline = false;
    }

    return localProgress;
  }

  public async getLessonProgress(lessonId: string): Promise<LessonProgress | null> {
    const course = await this.getCourseProgress();
    return course.lessons[lessonId] || null;
  }

  public async saveLessonProgress(progress: LessonProgress): Promise<void> {
    // 1. Always save to local storage immediately
    await this.localRepo.saveLessonProgress(progress);

    // 2. Try to sync to server
    try {
      const res = await this.fetchFn(`${this.apiBaseUrl}/lesson`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: this.userId, progress }),
      });

      if (res.ok) {
        this.isOnline = true;
        return;
      }
    } catch {
      this.isOnline = false;
    }

    // If offline or network error, add to pending queue
    const existingIdx = this.pendingQueue.findIndex((p) => p.lessonId === progress.lessonId);
    if (existingIdx !== -1) {
      this.pendingQueue[existingIdx] = { ...progress };
    } else {
      this.pendingQueue.push({ ...progress });
    }
  }

  public async resetLesson(lessonId: string): Promise<void> {
    await this.localRepo.resetLesson(lessonId);
    try {
      await this.fetchFn(`${this.apiBaseUrl}/lesson/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: this.userId, lessonId }),
      });
    } catch {
      // Ignore offline error
    }
  }

  public async flushPendingQueue(): Promise<boolean> {
    if (this.pendingQueue.length === 0) return true;

    try {
      const res = await this.fetchFn(`${this.apiBaseUrl}/sync-batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: this.userId, lessons: this.pendingQueue }),
      });

      if (res.ok) {
        this.pendingQueue = [];
        this.isOnline = true;
        return true;
      }
    } catch {
      this.isOnline = false;
    }

    return false;
  }

  public async syncWithServer(): Promise<CourseProgress> {
    await this.flushPendingQueue();
    return this.getCourseProgress();
  }
}
