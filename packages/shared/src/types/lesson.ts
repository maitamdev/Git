export type CourseLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface LessonCompletionRule {
  theoryViewed?: boolean;
  labs?: string[];
  quiz?: {
    minimumScore: number;
  };
}

export interface LessonMetadata {
  id: string;
  title: string;
  level: CourseLevel;
  duration: number; // in minutes
  xp: number;
  prerequisites: string[];
  objectives: string[];
  completion?: LessonCompletionRule;
  keywords?: string[];
  commands?: string[];
  tags?: string[];
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  theoryViewed: boolean;
  quizScore: number;
  quizAttempts?: number;
  labsCompleted: string[];
  xp: number;
  lastAttemptAt?: number;
}

export interface CourseProgress {
  userId: string;
  totalXp: number;
  level: number;
  streakDays: number;
  lastActiveDate?: string;
  lessons: Record<string, LessonProgress>;
  achievements: string[];
}

export interface PersistedCourseData {
  schemaVersion: number;
  courseVersion: string;
  progress: CourseProgress;
}

export interface AchievementCondition {
  type:
    | 'repository_initialized'
    | 'commit_count'
    | 'branch_count'
    | 'merge_count'
    | 'conflict_resolved'
    | 'quiz_score'
    | 'lesson_completed'
    | 'lab_completed'
    | 'command_used'
    | 'xp_total';
  operator: '>=' | '==' | '>';
  value: number | string | boolean;
}

export interface AchievementDefinition {
  id: string;
  title: string;
  description: string;
  icon: string;
  xp: number;
  condition: AchievementCondition;
}

export interface ProgressRepository {
  getCourseProgress(): Promise<CourseProgress>;
  getLessonProgress(id: string): Promise<LessonProgress | null>;
  saveLessonProgress(progress: LessonProgress): Promise<void>;
  resetLesson(id: string): Promise<void>;
}

export interface ManifestLessonItem {
  id: string;
  title: string;
  duration: number;
  xp: number;
  prerequisites: string[];
  labIds?: string[];
  completion?: LessonCompletionRule;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  status?: 'active' | 'coming_soon';
  lessons: ManifestLessonItem[];
}

export interface CourseManifest {
  curriculum: CourseModule[];
}

export interface CourseLesson {
  id: string;
  moduleId: string;
  metadata: LessonMetadata;
  content: string;
  quiz?: any;
  labScenarios?: any[];
}

export interface CourseRepository {
  getManifest(): Promise<CourseManifest>;
  getLesson(moduleId: string, lessonId: string): Promise<CourseLesson | null>;
  getAllLessons(): Promise<CourseLesson[]>;
}

