import { LessonProgress, CourseProgress, ACHIEVEMENTS } from '@git-academy/shared';

export function calculateLevel(totalXp: number): number {
  return Math.floor(Math.sqrt(totalXp / 50)) + 1;
}

export function updateCourseProgress(
  current: CourseProgress,
  lessonId: string,
  earnedXp: number,
  quizScore: number,
  labId: string
): CourseProgress {
  const existingLesson = current.lessons[lessonId] || {
    lessonId,
    completed: false,
    quizScore: 0,
    labsCompleted: [],
    xp: 0,
  };

  const newLabs = existingLesson.labsCompleted.includes(labId)
    ? existingLesson.labsCompleted
    : [...existingLesson.labsCompleted, labId];

  const newLessonXp = existingLesson.xp + earnedXp;
  const newQuizScore = Math.max(existingLesson.quizScore, quizScore);
  const isCompleted = newLabs.length > 0 && newQuizScore >= 80;

  const newLessonProgress: LessonProgress = {
    ...existingLesson,
    completed: isCompleted,
    quizScore: newQuizScore,
    labsCompleted: newLabs,
    xp: newLessonXp,
    lastAttemptAt: Date.now(),
  };

  const newTotalXp = current.totalXp + earnedXp;
  const newLevel = calculateLevel(newTotalXp);

  // Check achievements
  const newAchievements = [...current.achievements];
  if (newLabs.length > 0 && !newAchievements.includes('first-commit')) {
    newAchievements.push('first-commit');
  }

  return {
    ...current,
    totalXp: newTotalXp,
    level: newLevel,
    lessons: {
      ...current.lessons,
      [lessonId]: newLessonProgress,
    },
    achievements: newAchievements,
  };
}
