import { CourseProgress, LessonMetadata } from '@git-academy/shared';

export interface PrerequisiteCheckResult {
  canAccess: boolean;
  missingPrerequisites: string[];
}

export class PrerequisiteEngine {
  public canAccessLesson(
    lesson: { prerequisites?: string[] },
    progress: CourseProgress
  ): PrerequisiteCheckResult {
    // If no prerequisites, always accessible
    if (!lesson.prerequisites || lesson.prerequisites.length === 0) {
      return { canAccess: true, missingPrerequisites: [] };
    }

    const missing: string[] = [];

    for (const prereqId of lesson.prerequisites) {
      const prereqLesson = progress.lessons[prereqId];
      if (!prereqLesson || !prereqLesson.completed) {
        missing.push(prereqId);
      }
    }

    return {
      canAccess: missing.length === 0,
      missingPrerequisites: missing,
    };
  }

  public isAccessible(
    lesson: { prerequisites?: string[] },
    progress: CourseProgress
  ): boolean {
    return this.canAccessLesson(lesson, progress).canAccess;
  }
}
