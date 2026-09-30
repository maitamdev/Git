import type { ServerResponse } from 'node:http';
import { z } from 'zod';
import type { Enrollment } from '@git-academy/shared';
import type { AuthenticatedRequest } from '../middleware/auth-middleware.js';
import { requireAuth } from '../middleware/auth-middleware.js';
import { applyRateLimit, authRateLimiter } from '../middleware/rate-limiter.js';
import { parseBody, sendJson } from '../utils/http.js';
import { db } from '../db/store.js';

const joinClassSchema = z.object({
  code: z.string().min(3, 'Mã lớp không hợp lệ'),
});

export async function handleEnrollmentRoutes(req: AuthenticatedRequest, res: ServerResponse, pathname: string): Promise<boolean> {
  // POST /api/enrollments/join - Student joins class with code
  if (req.method === 'POST' && pathname === '/api/enrollments/join') {
    if (!applyRateLimit(req, res, authRateLimiter)) return true;

    const user = requireAuth(req, res);
    if (!user) return true;

    try {
      const raw = await parseBody(req);
      const parsed = joinClassSchema.safeParse(raw);
      if (!parsed.success) {
        sendJson(res, 400, { error: 'Validation Error', details: parsed.error.issues });
        return true;
      }

      const inputCode = parsed.data.code.trim().toUpperCase();
      const classroom = Array.from(db.classes.values()).find((c) => c.code.toUpperCase() === inputCode);

      if (!classroom) {
        sendJson(res, 404, { error: 'Not Found', message: 'Mã lớp không tồn tại hoặc đã hết hạn' });
        return true;
      }

      const enrollmentKey = `${user.id}:${classroom.id}`;
      const existing = db.enrollments.get(enrollmentKey);

      if (existing && existing.status === 'active') {
        sendJson(res, 409, { error: 'Conflict', message: 'Bạn đã tham gia lớp học này rồi' });
        return true;
      }

      const enrollment: Enrollment = {
        userId: user.id,
        classId: classroom.id,
        status: 'active',
        enrolledAt: new Date().toISOString(),
      };

      db.enrollments.set(enrollmentKey, enrollment);
      db.logAudit(user.id, 'join_class', 'enrollment', enrollmentKey, {
        classId: classroom.id,
        className: classroom.name,
      });

      sendJson(res, 200, {
        enrollment,
        classroom,
        message: `Tham gia thành công lớp: ${classroom.name}`,
      });
      return true;
    } catch (err: any) {
      sendJson(res, 400, { error: 'Bad Request', message: err.message });
      return true;
    }
  }

  // GET /api/enrollments/my - Student views their enrolled classes
  if (req.method === 'GET' && pathname === '/api/enrollments/my') {
    const user = requireAuth(req, res);
    if (!user) return true;

    const myEnrollments = Array.from(db.enrollments.values()).filter(
      (e) => e.userId === user.id && e.status === 'active'
    );

    const result = myEnrollments.map((e) => {
      const classroom = db.classes.get(e.classId);
      const teacher = classroom ? db.users.get(classroom.teacherId) : null;
      return {
        ...e,
        classroom: classroom ? {
          ...classroom,
          teacherName: teacher?.displayName || 'Giảng viên',
        } : null,
      };
    });

    sendJson(res, 200, { enrollments: result });
    return true;
  }

  return false;
}
