import type { ServerResponse } from 'node:http';
import { z } from 'zod';
import type { GradePolicy, GradeItem } from '@git-academy/shared';
import { GradebookCalculator } from '@git-academy/gradebook';
import type { AuthenticatedRequest } from '../middleware/auth-middleware.js';
import { requireAuth, requireRole } from '../middleware/auth-middleware.js';
import { matchRoute, parseBody, sendJson } from '../utils/http.js';
import { db } from '../db/store.js';

const policySchema = z.object({
  quizWeight: z.number().min(0).max(1),
  labsWeight: z.number().min(0).max(1),
  challengesWeight: z.number().min(0).max(1),
  assignmentsWeight: z.number().min(0).max(1),
  passThreshold: z.number().min(0).max(100).default(60),
});

export async function handleGradeRoutes(req: AuthenticatedRequest, res: ServerResponse, pathname: string): Promise<boolean> {
  // GET /api/grades/classes/:id - Teacher/Admin gets class gradebook
  const classGradesMatch = matchRoute('/api/grades/classes/:id', pathname);
  if (req.method === 'GET' && classGradesMatch.matched) {
    const user = requireRole(req, res, ['teacher', 'admin']);
    if (!user) return true;

    const classId = classGradesMatch.params.id;
    const classroom = db.classes.get(classId);
    if (!classroom) {
      sendJson(res, 404, { error: 'Not Found', message: 'Không tìm thấy lớp học' });
      return true;
    }

    if (user.role === 'teacher' && classroom.teacherId !== user.id) {
      sendJson(res, 403, { error: 'Forbidden', message: 'Bạn không quản lý lớp học này' });
      return true;
    }

    const policy: GradePolicy = db.gradePolicies.get(classId) || {
      quizWeight: 0.25,
      labsWeight: 0.30,
      challengesWeight: 0.20,
      assignmentsWeight: 0.25,
      passThreshold: 60,
    };

    const enrollments = Array.from(db.enrollments.values()).filter(
      (e) => e.classId === classId && e.status === 'active'
    );

    const summaries = enrollments.map((e) => {
      const studentProgress = Array.from(db.lessonProgress.values()).filter(
        (p) => p.studentId === e.userId
      );
      const submissions = Array.from(db.submissions.values()).filter(
        (s) => s.studentId === e.userId
      );

      const quizScores = studentProgress
        .map((p) => p.score)
        .filter((s): s is number => typeof s === 'number');

      const labsCompleted = studentProgress.filter(
        (p) => p.status === 'completed' && p.lessonId.includes('lab')
      ).length;

      const challengesCompleted = studentProgress.filter(
        (p) => p.status === 'completed' && (p.lessonId.includes('challenge') || p.score !== undefined)
      ).length;

      const assignmentScores = submissions
        .filter((s) => s.score !== undefined)
        .map((s) => ({ score: s.score!, maxScore: 100 }));

      return GradebookCalculator.calculateStudentGrade(
        e.userId,
        {
          quizScores,
          labsCompletedRatio: Math.min(1, labsCompleted / 76),
          challengesCompletedRatio: Math.min(1, challengesCompleted / 128),
          assignmentScores,
        },
        policy
      );
    });

    const stats = GradebookCalculator.calculateClassStats(summaries);

    sendJson(res, 200, {
      classroom,
      policy,
      summaries,
      stats,
    });
    return true;
  }

  // PUT /api/grades/classes/:id/policy - Teacher/Admin updates policy
  const policyMatch = matchRoute('/api/grades/classes/:id/policy', pathname);
  if (req.method === 'PUT' && policyMatch.matched) {
    const user = requireRole(req, res, ['teacher', 'admin']);
    if (!user) return true;

    const classId = policyMatch.params.id;
    const classroom = db.classes.get(classId);
    if (!classroom) {
      sendJson(res, 404, { error: 'Not Found', message: 'Không tìm thấy lớp học' });
      return true;
    }

    if (user.role === 'teacher' && classroom.teacherId !== user.id) {
      sendJson(res, 403, { error: 'Forbidden', message: 'Bạn không quản lý lớp học này' });
      return true;
    }

    try {
      const raw = await parseBody(req);
      const parsed = policySchema.safeParse(raw);
      if (!parsed.success) {
        sendJson(res, 400, { error: 'Validation Error', details: parsed.error.issues });
        return true;
      }

      const totalWeight = parsed.data.quizWeight + parsed.data.labsWeight + parsed.data.challengesWeight + parsed.data.assignmentsWeight;
      if (Math.abs(totalWeight - 1.0) > 0.001) {
        sendJson(res, 400, { error: 'Validation Error', message: `Tổng trọng số các cột điểm phải bằng 1.0 (hiện tại: ${totalWeight.toFixed(2)})` });
        return true;
      }

      const oldPolicy = db.gradePolicies.get(classId);
      db.gradePolicies.set(classId, parsed.data);

      db.logAudit(user.id, 'update_grade_policy', 'grade_policy', classId, {
        oldPolicy,
        newPolicy: parsed.data,
      });

      sendJson(res, 200, { policy: parsed.data, message: 'Cập nhật cấu hình tính điểm thành công' });
      return true;
    } catch (err: any) {
      sendJson(res, 400, { error: 'Bad Request', message: err.message });
      return true;
    }
  }

  // POST /api/grades/override - Teacher or Admin only
  if (req.method === 'POST' && pathname === '/api/grades/override') {
    const user = requireRole(req, res, ['teacher', 'admin']);
    if (!user) return true;

    try {
      const raw = await parseBody(req);
      const overrideSchema = z.object({
        classId: z.string(),
        studentId: z.string(),
        score: z.number().min(0).max(100),
        reason: z.string().min(3, 'Lý do điều chỉnh điểm phải từ 3 ký tự trở lên'),
      });

      const parsed = overrideSchema.safeParse(raw);
      if (!parsed.success) {
        sendJson(res, 400, { error: 'Validation Error', details: parsed.error.issues });
        return true;
      }

      const { classId, studentId, score, reason } = parsed.data;
      const classroom = db.classes.get(classId);
      if (!classroom) {
        sendJson(res, 404, { error: 'Not Found', message: 'Không tìm thấy lớp học' });
        return true;
      }

      // Check ownership if teacher
      if (user.role === 'teacher' && classroom.teacherId !== user.id) {
        sendJson(res, 403, { error: 'Forbidden', message: 'Bạn không có quyền điều chỉnh điểm của lớp này' });
        return true;
      }

      // Check student enrollment
      const enrollmentKey = `${studentId}:${classId}`;
      const enrollment = Array.from(db.enrollments.values()).find(
        (e) => e.userId === studentId && e.classId === classId && e.status === 'active'
      );
      if (!enrollment) {
        sendJson(res, 404, { error: 'Not Found', message: 'Sinh viên không thuộc lớp học này' });
        return true;
      }

      // Record audit log
      db.logAudit(user.id, 'grade_override', 'grade', `${classId}:${studentId}`, {
        classId,
        studentId,
        score,
        reason,
        overriddenBy: user.id,
      });

      sendJson(res, 200, {
        message: 'Ghi đè điểm số thành công',
        override: { classId, studentId, score, reason, overriddenBy: user.id },
      });
      return true;
    } catch (err: any) {
      sendJson(res, 400, { error: 'Bad Request', message: err.message });
      return true;
    }
  }

  return false;
}
