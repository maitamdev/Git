import { CourseProgress, LessonProgress } from './types/lesson.js';

export class ProgressConflictResolver {
  /**
   * Merges local student progress with server-persisted progress.
   * STRICT PRINCIPLES:
   * 1. Completed lessons are never lost (union of completion).
   * 2. Highest quiz score is preserved; attempts are merged accurately.
   * 3. Lab completions are unioned without duplicates.
   * 4. Achievements are unioned without duplicates.
   * 5. Total XP is recalculated from unique completions to prevent duplication.
   */
  public static merge(local: CourseProgress, server: CourseProgress): CourseProgress {
    const mergedLessons: Record<string, LessonProgress> = {};
    const allLessonKeys = new Set([...Object.keys(local.lessons || {}), ...Object.keys(server.lessons || {})]);

    for (const key of allLessonKeys) {
      const l = local.lessons?.[key];
      const s = server.lessons?.[key];

      if (l && s) {
        // Merge both states
        const labsCompleted = Array.from(new Set([...(l.labsCompleted || []), ...(s.labsCompleted || [])]));
        const completed = l.completed || s.completed;
        const theoryViewed = l.theoryViewed || s.theoryViewed;
        const quizScore = Math.max(l.quizScore || 0, s.quizScore || 0);
        const quizAttempts = Math.max(l.quizAttempts || 0, s.quizAttempts || 0, (l.quizAttempts || 0) + (s.quizAttempts || 0) > 0 ? Math.max(l.quizAttempts || 0, s.quizAttempts || 0) : 0);
        const xp = Math.max(l.xp || 0, s.xp || 0);
        const lastAttemptAt = Math.max(l.lastAttemptAt || 0, s.lastAttemptAt || 0);

        mergedLessons[key] = {
          lessonId: key,
          completed,
          theoryViewed,
          quizScore,
          quizAttempts,
          labsCompleted,
          xp,
          lastAttemptAt,
        };
      } else if (l) {
        mergedLessons[key] = { ...l, labsCompleted: [...(l.labsCompleted || [])] };
      } else if (s) {
        mergedLessons[key] = { ...s, labsCompleted: [...(s.labsCompleted || [])] };
      }
    }

    // Merge achievements uniquely
    const achievements = Array.from(
      new Set([...(local.achievements || []), ...(server.achievements || [])])
    );

    // Recalculate total XP from merged unique lessons to prevent duplicate summation
    let totalXp = 0;
    for (const l of Object.values(mergedLessons)) {
      if (l.completed) {
        totalXp += l.xp || 0;
      }
    }
    // Add achievement XP (each achievement grants 50 XP if not specified)
    totalXp += achievements.length * 50;

    // Use max of explicitly accumulated XP and recalculated XP to respect bonus points
    const finalXp = Math.max(totalXp, local.totalXp || 0, server.totalXp || 0);
    const level = Math.floor(Math.sqrt(finalXp / 50)) + 1;

    // Latest active date
    const lastActiveDate =
      (local.lastActiveDate && server.lastActiveDate
        ? local.lastActiveDate > server.lastActiveDate
          ? local.lastActiveDate
          : server.lastActiveDate
        : local.lastActiveDate || server.lastActiveDate) || new Date().toISOString().split('T')[0];

    const streakDays = Math.max(local.streakDays || 1, server.streakDays || 1);

    return {
      userId: server.userId || local.userId || 'learner-default',
      totalXp: finalXp,
      level,
      streakDays,
      lastActiveDate,
      lessons: mergedLessons,
      achievements,
    };
  }
}
