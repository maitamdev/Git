import type { ServerResponse } from 'node:http';
import crypto from 'node:crypto';
import { z } from 'zod';
import type { Classroom, Enrollment } from '@git-academy/shared';
import type { AuthenticatedRequest } from '../middleware/auth-middleware.js';
import { requireAuth, requireRole } from '../middleware/auth-middleware.js';
import { matchRoute, parseBody, sendJson } from '../utils/http.js';
import { sanitizeString } from '../middleware/sanitizer.js';
import { db } from '../db/store.js';

const createClassSchema = z.object({
  name: z.string().min(3, 'Tên lớp học phải từ 3 ký tự trở lên'),
  courseId: z.string().default('git-foundations'),
  code: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export async function handleClassRoutes(req: AuthenticatedRequest, res: ServerResponse, pathname: string): Promise<boolean> {
  // POST /api/classes - Teacher or Admin only
  if (req.method === 'POST' && pathname === '/api/classes') {
    const user = requireRole(req, res, ['teacher', 'admin']);
    if (!user) return true;

    try {
      const raw = await parseBody(req);
      const parsed = createClassSchema.safeParse(raw);
      if (!parsed.success) {
        sendJson(res, 400, { error: 'Validation Error', details: parsed.error.issues });
        return true;
      }

      const { name, courseId, startDate, endDate } = parsed.data;
      let code = parsed.data.code?.trim().toUpperCase();

      if (!code) {
        // Auto-generate clean 8-character code, e.g. GIT-K48-A or GIT-8F2B
        code = `GIT-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
      }

      // Check unique class code
      const existing = Array.from(db.classes.values()).find((c) => c.code === code);
      if (existing) {
        sendJson(res, 409, { error: 'Conflict', message: 'Mã lớp học này đã tồn tại. Vui lòng chọn mã khác.' });
        return true;
      }

      const newClass: Classroom = {
        id: `class-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
        name: sanitizeString(name),
        code,
        teacherId: user.id,
        courseId,
        startDate,
        endDate,
        createdAt: new Date().toISOString(),
      };

      db.classes.set(newClass.id, newClass);
      db.logAudit(user.id, 'create_class', 'class', newClass.id, { name: newClass.name, code: newClass.code });

      sendJson(res, 201, { classroom: newClass, message: 'Tạo lớp học thành công' });
      return true;
    } catch (err: any) {
      sendJson(res, 400, { error: 'Bad Request', message: err.message });
      return true;
    }
  }

  // GET /api/classes - List classes based on role
  if (req.method === 'GET' && pathname === '/api/classes') {
    const user = requireAuth(req, res);
    if (!user) return true;

    if (user.role === 'admin') {
      const classes = Array.from(db.classes.values());
      sendJson(res, 200, { classes });
      return true;
    }

    if (user.role === 'teacher') {
      const classes = Array.from(db.classes.values()).filter((c) => c.teacherId === user.id);
      sendJson(res, 200, { classes });
      return true;
    }

    // Student: get classes they are enrolled in
    const studentEnrollments = Array.from(db.enrollments.values()).filter(
      (e) => e.userId === user.id && e.status === 'active'
    );
    const classIds = new Set(studentEnrollments.map((e) => e.classId));
    const enrolledClasses = Array.from(db.classes.values()).filter((c) => classIds.has(c.id));
    sendJson(res, 200, { classes: enrolledClasses });
    return true;
  }

  // GET /api/classes/:id/roster - Teacher or Admin only
  const rosterMatch = matchRoute('/api/classes/:id/roster', pathname);
  if (req.method === 'GET' && rosterMatch.matched) {
    const user = requireRole(req, res, ['teacher', 'admin']);
    if (!user) return true;

    const classId = rosterMatch.params.id;
    const classroom = db.classes.get(classId);
    if (!classroom) {
      sendJson(res, 404, { error: 'Not Found', message: 'Không tìm thấy lớp học' });
      return true;
    }

    // Check teacher ownership
    if (user.role === 'teacher' && classroom.teacherId !== user.id) {
      sendJson(res, 403, { error: 'Forbidden', message: 'Bạn không có quyền truy cập danh sách lớp này' });
      return true;
    }

    const enrollments = Array.from(db.enrollments.values()).filter(
      (e) => e.classId === classId && e.status === 'active'
    );

    const students = enrollments.map((e) => {
      const student = db.users.get(e.userId);
      const studentProgress = Array.from(db.lessonProgress.values()).filter(
        (p) => p.studentId === e.userId && p.status === 'completed'
      );

      const totalLessons = 128;
      const completedLessons = studentProgress.length;
      const progressPercent = Math.min(100, Math.round((completedLessons / totalLessons) * 100));

      const scores = studentProgress.map((p) => p.score).filter((s): s is number => typeof s === 'number');
      const quizAvg = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
      const totalXp = studentProgress.reduce((sum, p) => sum + (p.xpAwarded || 0), 0);

      // Academic threshold for at-risk: progress below 30% or quiz average below 50
      const isAtRisk = progressPercent < 30 || (scores.length > 0 && quizAvg < 50);

      return {
        id: student?.id || e.userId,
        displayName: student?.displayName || 'Sinh viên',
        email: student?.email || '',
        enrolledAt: e.enrolledAt,
        completedLessons,
        totalLessons,
        progressPercent,
        quizAverage: quizAvg,
        totalXp,
        isAtRisk,
      };
    });

    sendJson(res, 200, {
      classroom,
      students,
      totalStudents: students.length,
      averageProgress: students.length > 0 ? Math.round(students.reduce((a, s) => a + s.progressPercent, 0) / students.length) : 0,
      atRiskCount: students.filter((s) => s.isAtRisk).length,
    });
    return true;
  }

  // DELETE /api/classes/:id/students/:studentId - Teacher or Admin only
  const removeMatch = matchRoute('/api/classes/:id/students/:studentId', pathname);
  if (req.method === 'DELETE' && removeMatch.matched) {
    const user = requireRole(req, res, ['teacher', 'admin']);
    if (!user) return true;

    const { id: classId, studentId } = removeMatch.params;
    const classroom = db.classes.get(classId);
    if (!classroom) {
      sendJson(res, 404, { error: 'Not Found', message: 'Không tìm thấy lớp học' });
      return true;
    }

    if (user.role === 'teacher' && classroom.teacherId !== user.id) {
      sendJson(res, 403, { error: 'Forbidden', message: 'Bạn không quản lý lớp học này' });
      return true;
    }

    const enrollmentKey = `${studentId}:${classId}`;
    const enrollment = db.enrollments.get(enrollmentKey);
    if (!enrollment) {
      sendJson(res, 404, { error: 'Not Found', message: 'Sinh viên không thuộc lớp học này' });
      return true;
    }

    enrollment.status = 'removed';
    db.logAudit(user.id, 'remove_student_from_class', 'enrollment', enrollmentKey, {
      classId,
      studentId,
    });

    sendJson(res, 200, { message: 'Đã xóa sinh viên khỏi lớp học' });
    return true;
  }

  // GET /api/classes/:id - Get single class
  const classDetailMatch = matchRoute('/api/classes/:id', pathname);
  if (req.method === 'GET' && classDetailMatch.matched) {
    const user = requireAuth(req, res);
    if (!user) return true;

    const classId = classDetailMatch.params.id;
    const classroom = db.classes.get(classId);
    if (!classroom) {
      sendJson(res, 404, { error: 'Not Found', message: 'Không tìm thấy lớp học' });
      return true;
    }

    // Authorization check
    if (user.role === 'teacher' && classroom.teacherId !== user.id) {
      sendJson(res, 403, { error: 'Forbidden', message: 'Bạn không quản lý lớp học này' });
      return true;
    }

    if (user.role === 'student') {
      const enrollment = db.enrollments.get(`${user.id}:${classId}`);
      if (!enrollment || enrollment.status !== 'active') {
        sendJson(res, 403, { error: 'Forbidden', message: 'Bạn chưa tham gia lớp học này' });
        return true;
      }
    }

    sendJson(res, 200, { classroom });
    return true;
  }

  return false;
}
