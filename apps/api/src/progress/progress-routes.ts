import type { ServerResponse } from 'node:http';
import { z } from 'zod';
import type { CourseProgress, LessonProgress } from '@git-academy/shared';
import { ProgressConflictResolver } from '@git-academy/shared';
import type { AuthenticatedRequest } from '../middleware/auth-middleware.js';
import { requireAuth, requireRole } from '../middleware/auth-middleware.js';
import { matchRoute, parseBody, sendJson } from '../utils/http.js';
import { db, type LessonProgressRecord } from '../db/store.js';

const syncSchema = z.union([
  z.object({
    localProgress: z.object({
      userId: z.string().optional(),
      totalXp: z.number().default(0),
      level: z.number().default(1),
      streakDays: z.number().default(1),
      lastActiveDate: z.string().default(() => new Date().toISOString().split('T')[0]),
      lessons: z.record(z.string(), z.any()).default({}),
      achievements: z.array(z.string()).default([]),
    }),
  }),
  z.object({
    progress: z.object({
      userId: z.string().optional(),
      totalXp: z.number().default(0),
      level: z.number().default(1),
      streakDays: z.number().default(1),
      lastActiveDate: z.string().default(() => new Date().toISOString().split('T')[0]),
      lessons: z.record(z.string(), z.any()).default({}),
      achievements: z.array(z.string()).default([]),
    }),
  }),
]);

const lessonCompleteSchema = z.object({
  lessonId: z.string(),
  courseVersion: z.string().default('2.0.0'),
  score: z.number().min(0).max(100).optional(),
  timeSpentSeconds: z.number().min(0).default(0),
  xpAwarded: z.number().min(0).default(50),
});

export async function handleProgressRoutes(req: AuthenticatedRequest, res: ServerResponse, pathname: string): Promise<boolean> {
  // GET /api/progress/my or /api/progress - Get student's overall progress
  if (req.method === 'GET' && (pathname === '/api/progress/my' || pathname === '/api/progress')) {
    const user = requireAuth(req, res);
    if (!user) return true;

    const progressRecords = Array.from(db.lessonProgress.values()).filter(
      (p) => p.studentId === user.id
    );

    const lessonsMap: Record<string, LessonProgress> = {};
    progressRecords.forEach((p) => {
      lessonsMap[p.lessonId] = {
        lessonId: p.lessonId,
        completed: p.status === 'completed',
        theoryViewed: true,
        quizScore: p.score || 0,
        quizAttempts: p.attempts || 1,
        labsCompleted: p.lessonId.includes('lab') ? [p.lessonId] : [],
        xp: p.xpAwarded || 50,
        lastAttemptAt: p.completedAt ? new Date(p.completedAt).getTime() : Date.now(),
      };
    });

    const userAchievements = Array.from(db.userAchievements.get(user.id) || []);
    const totalXp = progressRecords.reduce((sum, p) => sum + (p.xpAwarded || 0), 0);

    const progressResponse: CourseProgress = {
      userId: user.id,
      totalXp,
      level: Math.min(8, Math.max(1, Math.floor(Math.sqrt(totalXp / 50)) + 1)),
      streakDays: 3,
      lastActiveDate: new Date().toISOString().split('T')[0],
      lessons: lessonsMap,
      achievements: userAchievements,
    };

    sendJson(res, 200, { progress: progressResponse });
    return true;
  }

  // POST /api/progress/sync - Conflict resolution & sync
  if (req.method === 'POST' && pathname === '/api/progress/sync') {
    const user = requireAuth(req, res);
    if (!user) return true;

    try {
      const raw = await parseBody(req);
      const parsed = syncSchema.safeParse(raw);
      if (!parsed.success) {
        sendJson(res, 400, { error: 'Validation Error', details: parsed.error.issues });
        return true;
      }

      const localData = 'localProgress' in parsed.data ? parsed.data.localProgress : parsed.data.progress;
      const local: CourseProgress = {
        userId: user.id,
        totalXp: localData.totalXp,
        level: localData.level,
        streakDays: localData.streakDays,
        lastActiveDate: localData.lastActiveDate,
        lessons: (localData.lessons || {}) as Record<string, LessonProgress>,
        achievements: localData.achievements || [],
      };

      // Construct current server state
      const serverRecords = Array.from(db.lessonProgress.values()).filter((p) => p.studentId === user.id);
      const serverLessons: Record<string, LessonProgress> = {};
      serverRecords.forEach((p) => {
        serverLessons[p.lessonId] = {
          lessonId: p.lessonId,
          completed: p.status === 'completed',
          theoryViewed: true,
          quizScore: p.score || 0,
          quizAttempts: p.attempts || 1,
          labsCompleted: p.lessonId.includes('lab') ? [p.lessonId] : [],
          xp: p.xpAwarded || 50,
          lastAttemptAt: p.completedAt ? new Date(p.completedAt).getTime() : Date.now(),
        };
      });

      const serverState: CourseProgress = {
        userId: user.id,
        totalXp: serverRecords.reduce((acc, p) => acc + (p.xpAwarded || 0), 0),
        level: 1,
        streakDays: 1,
        lastActiveDate: new Date().toISOString().split('T')[0],
        lessons: serverLessons,
        achievements: Array.from(db.userAchievements.get(user.id) || []),
      };

      // Perform strict, non-destructive conflict resolution
      const merged = ProgressConflictResolver.merge(local, serverState);

      // Persist merged records back to DB
      for (const [lessonId, p] of Object.entries(merged.lessons)) {
        const key = `${user.id}:${lessonId}:2.0.0`;
        const existing = db.lessonProgress.get(key);

        const record: LessonProgressRecord = {
          id: existing?.id || `prog-${user.id}-${lessonId}`,
          studentId: user.id,
          courseId: 'git-foundations',
          lessonId,
          courseVersion: '2.0.0',
          status: p.completed ? 'completed' : 'in_progress',
          score: p.quizScore > 0 ? p.quizScore : existing?.score,
          attempts: Math.max(p.quizAttempts || 1, existing?.attempts || 1),
          timeSpentSeconds: existing?.timeSpentSeconds || 300,
          xpAwarded: existing ? existing.xpAwarded : (p.xp || 50),
          completedAt: p.completed ? (existing?.completedAt || new Date().toISOString()) : undefined,
          updatedAt: new Date().toISOString(),
        };

        db.lessonProgress.set(key, record);
      }

      // Update achievements
      const achSet = db.userAchievements.get(user.id) || new Set<string>();
      (merged.achievements || []).forEach((ach: string) => achSet.add(ach));
      db.userAchievements.set(user.id, achSet);

      sendJson(res, 200, {
        mergedProgress: merged,
        message: 'Đồng bộ tiến độ thành công',
      });
      return true;
    } catch (err: any) {
      sendJson(res, 400, { error: 'Bad Request', message: err.message });
      return true;
    }
  }

  // POST /api/progress/lesson - Support for ServerProgressRepository direct save
  if (req.method === 'POST' && pathname === '/api/progress/lesson') {
    const user = requireAuth(req, res);
    if (!user) return true;

    try {
      const raw = await parseBody(req);
      if (raw?.userId && raw.userId !== user.id) {
        sendJson(res, 403, { error: 'Forbidden', message: 'Không thể ghi tiến độ cho tài khoản khác' });
        return true;
      }
      const p = raw?.progress;
      if (p && p.lessonId) {
        const key = `${user.id}:${p.lessonId}:2.0.0`;
        const existing = db.lessonProgress.get(key);
        const record: LessonProgressRecord = {
          id: existing?.id || `prog-${user.id}-${p.lessonId}`,
          studentId: user.id,
          courseId: 'git-foundations',
          lessonId: p.lessonId,
          courseVersion: '2.0.0',
          status: p.completed ? 'completed' : 'in_progress',
          score: p.quizScore > 0 ? p.quizScore : existing?.score,
          attempts: Math.max(p.quizAttempts || 1, existing?.attempts || 1),
          timeSpentSeconds: existing?.timeSpentSeconds || 300,
          xpAwarded: existing ? existing.xpAwarded : (p.xp || 50),
          completedAt: p.completed ? (existing?.completedAt || new Date().toISOString()) : undefined,
          updatedAt: new Date().toISOString(),
        };
        db.lessonProgress.set(key, record);
        sendJson(res, 200, { success: true, record });
        return true;
      }
      sendJson(res, 400, { error: 'Bad Request', message: 'Missing lesson progress payload' });
      return true;
    } catch (err: any) {
      sendJson(res, 400, { error: 'Bad Request', message: err.message });
      return true;
    }
  }

  // POST /api/progress/sync-batch - Support for ServerProgressRepository queue flush
  if (req.method === 'POST' && pathname === '/api/progress/sync-batch') {
    const user = requireAuth(req, res);
    if (!user) return true;

    try {
      const raw = await parseBody(req);
      if (raw?.userId && raw.userId !== user.id) {
        sendJson(res, 403, { error: 'Forbidden', message: 'Không thể ghi tiến độ cho tài khoản khác' });
        return true;
      }
      const lessons = Array.isArray(raw?.lessons) ? raw.lessons : [];
      for (const p of lessons) {
        if (p && p.lessonId) {
          const key = `${user.id}:${p.lessonId}:2.0.0`;
          const existing = db.lessonProgress.get(key);
          const record: LessonProgressRecord = {
            id: existing?.id || `prog-${user.id}-${p.lessonId}`,
            studentId: user.id,
            courseId: 'git-foundations',
            lessonId: p.lessonId,
            courseVersion: '2.0.0',
            status: p.completed ? 'completed' : 'in_progress',
            score: p.quizScore > 0 ? p.quizScore : existing?.score,
            attempts: Math.max(p.quizAttempts || 1, existing?.attempts || 1),
            timeSpentSeconds: existing?.timeSpentSeconds || 300,
            xpAwarded: existing ? existing.xpAwarded : (p.xp || 50),
            completedAt: p.completed ? (existing?.completedAt || new Date().toISOString()) : undefined,
            updatedAt: new Date().toISOString(),
          };
          db.lessonProgress.set(key, record);
        }
      }
      sendJson(res, 200, { success: true, count: lessons.length });
      return true;
    } catch (err: any) {
      sendJson(res, 400, { error: 'Bad Request', message: err.message });
      return true;
    }
  }

  // POST /api/progress/complete-lesson
  if (req.method === 'POST' && pathname === '/api/progress/complete-lesson') {
    const user = requireAuth(req, res);
    if (!user) return true;

    try {
      const raw = await parseBody(req);
      const parsed = lessonCompleteSchema.safeParse(raw);
      if (!parsed.success) {
        sendJson(res, 400, { error: 'Validation Error', details: parsed.error.issues });
        return true;
      }

      const { lessonId, courseVersion, score, timeSpentSeconds, xpAwarded } = parsed.data;
      const key = `${user.id}:${lessonId}:${courseVersion}`;
      const existing = db.lessonProgress.get(key);

      // Idempotent completion: only award XP once
      const isFirstCompletion = !existing || existing.status !== 'completed';
      const actualXp = isFirstCompletion ? xpAwarded : 0;

      const record: LessonProgressRecord = {
        id: existing?.id || `prog-${user.id}-${lessonId}`,
        studentId: user.id,
        courseId: 'git-foundations',
        lessonId,
        courseVersion,
        status: 'completed',
        score: score ?? existing?.score,
        attempts: (existing?.attempts || 0) + 1,
        timeSpentSeconds: (existing?.timeSpentSeconds || 0) + timeSpentSeconds,
        xpAwarded: (existing?.xpAwarded || 0) + actualXp,
        completedAt: existing?.completedAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      db.lessonProgress.set(key, record);

      db.logActivity({
        userId: user.id,
        type: 'lesson_completed',
        data: { lessonId, xpAwarded: actualXp, score },
      });

      sendJson(res, 200, {
        progress: record,
        xpAwarded: actualXp,
        message: 'Ghi nhận hoàn thành bài học thành công',
      });
      return true;
    } catch (err: any) {
      sendJson(res, 400, { error: 'Bad Request', message: err.message });
      return true;
    }
  }

  // GET /api/progress/students/:id - Teacher/Admin views student details
  const studentDetailMatch = matchRoute('/api/progress/students/:id', pathname);
  if (req.method === 'GET' && studentDetailMatch.matched) {
    const user = requireRole(req, res, ['teacher', 'admin']);
    if (!user) return true;

    const targetStudentId = studentDetailMatch.params.id;
    const targetStudent = db.users.get(targetStudentId);
    if (!targetStudent) {
      sendJson(res, 404, { error: 'Not Found', message: 'Không tìm thấy sinh viên' });
      return true;
    }

    // Teacher check: must teach a class this student belongs to
    if (user.role === 'teacher') {
      const teacherClassIds = Array.from(db.classes.values())
        .filter((c) => c.teacherId === user.id)
        .map((c) => c.id);

      const sharesClass = Array.from(db.enrollments.values()).some(
        (e) => e.userId === targetStudentId && teacherClassIds.includes(e.classId) && e.status === 'active'
      );

      if (!sharesClass) {
        sendJson(res, 403, { error: 'Forbidden', message: 'Bạn không quản lý sinh viên này trong bất kỳ lớp nào' });
        return true;
      }
    }

    const studentRecords = Array.from(db.lessonProgress.values()).filter(
      (p) => p.studentId === targetStudentId
    );

    const submissions = Array.from(db.submissions.values()).filter(
      (s) => s.studentId === targetStudentId
    );

    const activities = db.activityEvents.filter((a) => a.userId === targetStudentId);
    const achievements = Array.from(db.userAchievements.get(targetStudentId) || []);

    const { passwordHash, ...safeStudent } = targetStudent;
    sendJson(res, 200, {
      student: safeStudent,
      lessonProgress: studentRecords,
      submissions,
      activities,
      achievements,
    });
    return true;
  }

  return false;
}
