export type CourseLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export interface LessonMetadata {
    id: string;
    title: string;
    level: CourseLevel;
    duration: number;
    xp: number;
    prerequisites: string[];
    objectives: string[];
}
export interface LessonProgress {
    lessonId: string;
    completed: boolean;
    quizScore: number;
    labsCompleted: string[];
    xp: number;
    lastAttemptAt?: number;
}
export interface CourseProgress {
    userId: string;
    totalXp: number;
    level: number;
    streakDays: number;
    lessons: Record<string, LessonProgress>;
    achievements: string[];
}
//# sourceMappingURL=lesson.d.ts.map