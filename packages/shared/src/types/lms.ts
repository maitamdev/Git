export type UserRole = 'student' | 'teacher' | 'admin';
export type Role = UserRole;

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Classroom {
  id: string;
  name: string;
  code: string;
  teacherId: string;
  courseId: string;
  startDate?: string;
  endDate?: string;
  createdAt: string;
}

export type EnrollmentStatus = 'active' | 'completed' | 'removed';

export interface Enrollment {
  userId: string;
  classId: string;
  status: EnrollmentStatus;
  enrolledAt: string;
}

export interface Assignment {
  id: string;
  classId: string;
  title: string;
  description: string;
  dueAt: string; // UTC ISO string
  points: number;
  requiredLessons?: string[];
  requiredLabs?: string[];
  createdAt: string;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  content?: string;
  url?: string;
  submittedAt: string; // UTC ISO string
  score?: number;
  feedback?: string;
  gradedAt?: string;
  gradedBy?: string;
}

export type ActivityEventType =
  | 'lesson_started'
  | 'lesson_completed'
  | 'quiz_started'
  | 'quiz_submitted'
  | 'quiz_passed'
  | 'lab_started'
  | 'lab_completed'
  | 'challenge_completed'
  | 'assignment_submitted'
  | 'achievement_unlocked';

export interface ActivityEvent {
  id: string;
  userId: string;
  classId?: string;
  type: ActivityEventType;
  lessonId?: string;
  data?: Record<string, any>;
  metadata?: Record<string, any>;
  timestamp: string; // UTC ISO string
}

export interface AuditLog {
  id: string;
  actorId: string;
  action: string;
  targetType: string;
  targetId: string;
  details?: Record<string, any>;
  ipAddress?: string;
  timestamp: string; // UTC ISO string
}

export interface GradeItem {
  id: string;
  name: string;
  title?: string;
  type: 'quiz' | 'lab' | 'assignment' | 'challenge' | 'manual';
  maxScore: number;
  weight: number;
  score?: number;
}

export interface GradePolicy {
  quizWeight: number; // e.g. 0.25
  labsWeight: number; // e.g. 0.30
  challengesWeight: number; // e.g. 0.20
  assignmentsWeight: number; // e.g. 0.25
  passThreshold?: number; // e.g. 60
}

export interface StudentGradeSummary {
  studentId: string;
  overallScore: number; // 0 - 100
  letterGrade: string; // A, B, C, D, F
  breakdown: {
    quizScore: number;
    labsScore: number;
    challengesScore: number;
    assignmentsScore: number;
  };
}

export interface ClassAnalytics {
  classId: string;
  totalStudents: number;
  activeStudents?: number;
  averageProgress: number; // 0 - 100
  averageQuizScore: number; // 0 - 100
  completedCourseCount?: number;
  completedCoursesCount?: number;
  atRiskCount?: number;
  atRiskStudentsCount?: number;
  difficultTopics?: {
    topicId: string;
    topicTitle: string;
    type: 'lesson' | 'quiz' | 'lab';
    retryRate: number;
    failureRate: number;
  }[];
  difficultyInsights?: {
    mostRetriedLabs: Array<{ lessonId: string; averageAttempts: number; failRate: number }>;
    mostFailedQuizzes: Array<{ lessonId: string; failRate: number; totalSubmissions: number }>;
  };
}

