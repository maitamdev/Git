import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import type {
  User,
  Classroom,
  Enrollment,
  Assignment,
  AssignmentSubmission,
  ActivityEvent,
  AuditLog,
  GradePolicy,
  StudentGradeSummary,
} from '@git-academy/shared';

export interface LessonProgressRecord {
  id: string;
  studentId: string;
  courseId: string;
  lessonId: string;
  courseVersion: string;
  status: 'not_started' | 'in_progress' | 'completed';
  score?: number;
  attempts: number;
  timeSpentSeconds: number;
  xpAwarded: number;
  completedAt?: string;
  updatedAt: string;
}

export interface UserDbRecord extends User {
  passwordHash: string;
}

export class DatabaseStore {
  public users: Map<string, UserDbRecord> = new Map();
  public classes: Map<string, Classroom> = new Map();
  public enrollments: Map<string, Enrollment> = new Map(); // key: userId:classId
  public lessonProgress: Map<string, LessonProgressRecord> = new Map(); // key: studentId:lessonId:courseVersion
  public userAchievements: Map<string, Set<string>> = new Map(); // userId -> Set of achievementIds
  public assignments: Map<string, Assignment> = new Map();
  public submissions: Map<string, AssignmentSubmission> = new Map(); // key: assignmentId:studentId
  public gradePolicies: Map<string, GradePolicy> = new Map(); // classId -> GradePolicy
  public activityEvents: ActivityEvent[] = [];
  public auditLogs: AuditLog[] = [];
  public sessions: Map<string, { userId: string; expiresAt: number }> = new Map();
  public revokedTokens: Set<string> = new Set();

  constructor(options?: { seedData?: boolean }) {
    const isProd = process.env.NODE_ENV === 'production';
    const allowSeed = process.env.ENABLE_DEV_SEEDS === 'true';
    const shouldSeed = options?.seedData ?? (!isProd || allowSeed);

    if (shouldSeed) {
      this.seedDevelopmentData();
    } else {
      // In production mode without seeds, bootstrap initial admin if configured via environment
      this.bootstrapAdminFromEnv();
    }
  }

  // Hash password using industry-standard bcrypt (cost factor 10)
  public static hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  // Securely verify password with bcrypt
  public static comparePassword(password: string, hash: string): boolean {
    if (!password || !hash) return false;
    try {
      if (hash.startsWith('$2a$') || hash.startsWith('$2b$')) {
        return bcrypt.compareSync(password, hash);
      }
    } catch {
      // Fallback
    }
    // Backward compatibility for legacy test hashes if any
    return crypto.createHash('sha256').update(`gitacademy_prod_salt:${password}`).digest('hex') === hash;
  }

  public bootstrapAdminFromEnv(): void {
    const adminEmail = process.env.BOOTSTRAP_ADMIN_EMAIL;
    const adminPassword = process.env.BOOTSTRAP_ADMIN_PASSWORD;
    if (adminEmail && adminPassword) {
      const admin: UserDbRecord = {
        id: 'admin-bootstrap-01',
        email: adminEmail.toLowerCase().trim(),
        displayName: process.env.BOOTSTRAP_ADMIN_NAME || 'Quản trị viên Hệ thống',
        role: 'admin',
        passwordHash: DatabaseStore.hashPassword(adminPassword),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.users.set(admin.id, admin);
      this.logAudit(admin.id, 'bootstrap_admin', 'user', admin.id, { email: admin.email });
    }
  }

  public seedDevelopmentData(): void {
    // Teacher demo
    const teacher: UserDbRecord = {
      id: 'teacher-lan-48',
      email: 'lan@gitacademy.vn',
      displayName: 'Cô Nguyễn Thị Lan',
      role: 'teacher',
      passwordHash: DatabaseStore.hashPassword('Teacher@123'),
      createdAt: '2026-09-01T00:00:00.000Z',
      updatedAt: '2026-09-01T00:00:00.000Z',
    };
    this.users.set(teacher.id, teacher);

    // Student demo
    const student1: UserDbRecord = {
      id: 'student-khang-01',
      email: 'khang@gitacademy.vn',
      displayName: 'Vũ Quốc Khang',
      role: 'student',
      passwordHash: DatabaseStore.hashPassword('Student@123'),
      createdAt: '2026-09-02T00:00:00.000Z',
      updatedAt: '2026-09-02T00:00:00.000Z',
    };
    this.users.set(student1.id, student1);

    // Student 2 demo (at-risk demo)
    const student2: UserDbRecord = {
      id: 'student-nam-02',
      email: 'nam@gitacademy.vn',
      displayName: 'Trần Hoài Nam',
      role: 'student',
      passwordHash: DatabaseStore.hashPassword('Student@123'),
      createdAt: '2026-09-02T00:00:00.000Z',
      updatedAt: '2026-09-02T00:00:00.000Z',
    };
    this.users.set(student2.id, student2);

    // Admin demo
    const admin: UserDbRecord = {
      id: 'admin-sys-01',
      email: 'admin@gitacademy.vn',
      displayName: 'Quản trị viên Hệ thống',
      role: 'admin',
      passwordHash: DatabaseStore.hashPassword('Admin@123'),
      createdAt: '2026-08-01T00:00:00.000Z',
      updatedAt: '2026-08-01T00:00:00.000Z',
    };
    this.users.set(admin.id, admin);

    // Sample Class 1: Git & GitHub — CNTT K48
    const class1: Classroom = {
      id: 'class-git-k48',
      name: 'Git & GitHub — CNTT K48',
      code: 'GIT-K48-A',
      teacherId: teacher.id,
      courseId: 'git-foundations',
      startDate: '2026-09-05T00:00:00.000Z',
      endDate: '2026-12-30T00:00:00.000Z',
      createdAt: '2026-09-01T08:00:00.000Z',
    };
    this.classes.set(class1.id, class1);

    // Sample Class 2: Git & DevOps — CNTT K49
    const class2: Classroom = {
      id: 'class-git-k49',
      name: 'Git & DevOps — CNTT K49',
      code: 'GIT-K49-B',
      teacherId: teacher.id,
      courseId: 'git-foundations',
      startDate: '2026-09-10T00:00:00.000Z',
      createdAt: '2026-09-05T08:00:00.000Z',
    };
    this.classes.set(class2.id, class2);

    // Enrollments
    this.enrollments.set(`${student1.id}:${class1.id}`, {
      userId: student1.id,
      classId: class1.id,
      status: 'active',
      enrolledAt: '2026-09-05T09:00:00.000Z',
    });

    this.enrollments.set(`${student2.id}:${class1.id}`, {
      userId: student2.id,
      classId: class1.id,
      status: 'active',
      enrolledAt: '2026-09-06T10:00:00.000Z',
    });

    // Sample Progress for Khang (100 lessons completed, 65 labs completed, 12450 XP, 86% quiz avg)
    for (let i = 1; i <= 100; i++) {
      const isLab = i <= 65;
      const lessonId = `lesson-${i.toString().padStart(3, '0')}${isLab ? '-lab' : ''}`;
      this.lessonProgress.set(`${student1.id}:${lessonId}:2.0.0`, {
        id: `prog-${student1.id}-${lessonId}`,
        studentId: student1.id,
        courseId: 'git-foundations',
        lessonId,
        courseVersion: '2.0.0',
        status: 'completed',
        score: i % 5 === 0 ? 90 : (i % 3 === 0 ? 80 : 88), // average around 86%
        attempts: 1,
        timeSpentSeconds: 420,
        xpAwarded: 124, // 100 * 124 + bonus approx 12,450 XP
        completedAt: '2026-09-10T14:30:00.000Z',
        updatedAt: '2026-09-10T14:30:00.000Z',
      });
    }

    // Sample Achievements for Khang
    this.userAchievements.set(student1.id, new Set(['first_commit', 'branch_master', 'conflict_solver']));

    // Sample Assignment
    const assignment1: Assignment = {
      id: 'asg-branching-flow',
      classId: class1.id,
      title: 'Bài tập 1: Quy trình Feature Branch & Pull Request',
      description: 'Tạo repository Git mô phỏng nhóm 3 người, thực hiện branch, rebase và resolve 1 conflict.',
      dueAt: '2026-10-15T23:59:59.000Z',
      points: 100,
      requiredLessons: ['02-branching-05-merge-conflicts'],
      requiredLabs: ['lab-merge-conflict'],
      createdAt: '2026-09-15T08:00:00.000Z',
    };
    this.assignments.set(assignment1.id, assignment1);

    // Sample Submission by Khang
    this.submissions.set(`${assignment1.id}:${student1.id}`, {
      id: `sub-${assignment1.id}-${student1.id}`,
      assignmentId: assignment1.id,
      studentId: student1.id,
      content: 'Em đã hoàn thành các bước tạo nhánh feature/auth, rebase vào main và giải quyết conflict.',
      url: 'https://github.com/khang-student/git-feature-workflow-demo',
      submittedAt: '2026-09-18T16:20:00.000Z',
      score: 95,
      feedback: 'Bài làm rất tốt, log commit rõ ràng theo chuẩn Conventional Commits!',
    });

    // Default Grade Policy for class1
    this.gradePolicies.set(class1.id, {
      quizWeight: 0.25,
      labsWeight: 0.30,
      challengesWeight: 0.20,
      assignmentsWeight: 0.25,
      passThreshold: 60,
    });
  }

  // Audit Logging
  public logAudit(actorId: string, action: string, targetType: string, targetId: string, details?: Record<string, unknown>, ipAddress?: string): AuditLog {
    const audit: AuditLog = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      actorId,
      action,
      targetType,
      targetId,
      details,
      ipAddress,
      timestamp: new Date().toISOString(),
    };
    this.auditLogs.unshift(audit);
    return audit;
  }

  // Activity Event Logging
  public logActivity(event: Omit<ActivityEvent, 'id' | 'timestamp'>): ActivityEvent {
    const act: ActivityEvent = {
      ...event,
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
    };
    this.activityEvents.unshift(act);
    return act;
  }
}

// Global Singleton for the API process
export const db = new DatabaseStore();
