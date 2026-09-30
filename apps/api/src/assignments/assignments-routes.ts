import type { ServerResponse } from 'node:http';
import crypto from 'node:crypto';
import { z } from 'zod';
import type { Assignment, AssignmentSubmission } from '@git-academy/shared';
import { DeadlineManager } from '@git-academy/gradebook';
import type { AuthenticatedRequest } from '../middleware/auth-middleware.js';
import { requireAuth, requireRole } from '../middleware/auth-middleware.js';
import { matchRoute, parseBody, sendJson } from '../utils/http.js';
import { sanitizeString, sanitizeUrl } from '../middleware/sanitizer.js';
import { db } from '../db/store.js';

const createAssignmentSchema = z.object({
  classId: z.string(),
  title: z.string().min(3, 'Tiêu đề bài tập phải từ 3 ký tự trở lên'),
  description: z.string().min(5, 'Mô tả bài tập phải từ 5 ký tự trở lên'),
  dueAt: z.string().refine((val) => !isNaN(Date.parse(val)), 'Ngày hết hạn không hợp lệ (ISO format)'),
  points: z.number().min(1).default(100),
  requiredLessons: z.array(z.string()).default([]),
  requiredLabs: z.array(z.string()).default([]),
});

const submitAssignmentSchema = z.object({
  content: z.string().optional(),
  url: z.string().url('URL không hợp lệ').optional(),
});

const gradeSubmissionSchema = z.object({
  score: z.number().min(0).max(100, 'Điểm số từ 0 đến 100'),
  feedback: z.string().optional(),
});

export async function handleAssignmentRoutes(req: AuthenticatedRequest, res: ServerResponse, pathname: string): Promise<boolean> {
  // POST /api/assignments - Teacher/Admin creates assignment
  if (req.method === 'POST' && pathname === '/api/assignments') {
    const user = requireRole(req, res, ['teacher', 'admin']);
    if (!user) return true;

    try {
      const raw = await parseBody(req);
      const parsed = createAssignmentSchema.safeParse(raw);
      if (!parsed.success) {
        sendJson(res, 400, { error: 'Validation Error', details: parsed.error.issues });
        return true;
      }

      const { classId, title, description, dueAt, points, requiredLessons, requiredLabs } = parsed.data;
      const classroom = db.classes.get(classId);
      if (!classroom) {
        sendJson(res, 404, { error: 'Not Found', message: 'Không tìm thấy lớp học' });
        return true;
      }

      if (user.role === 'teacher' && classroom.teacherId !== user.id) {
        sendJson(res, 403, { error: 'Forbidden', message: 'Bạn không quản lý lớp học này' });
        return true;
      }

      const assignment: Assignment = {
        id: `asg-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
        classId,
        title: sanitizeString(title),
        description: sanitizeString(description),
        dueAt: new Date(dueAt).toISOString(), // UTC standard
        points,
        requiredLessons,
        requiredLabs,
        createdAt: new Date().toISOString(),
      };

      db.assignments.set(assignment.id, assignment);
      db.logAudit(user.id, 'create_assignment', 'assignment', assignment.id, {
        classId,
        title: assignment.title,
      });

      sendJson(res, 201, { assignment, message: 'Tạo bài tập thành công' });
      return true;
    } catch (err: any) {
      sendJson(res, 400, { error: 'Bad Request', message: err.message });
      return true;
    }
  }

  // GET /api/assignments - List assignments for a class (authenticated)
  if (req.method === 'GET' && pathname === '/api/assignments') {
    const user = requireAuth(req, res);
    if (!user) return true;

    const url = new URL(req.url || '', 'http://localhost');
    const classId = url.searchParams.get('classId');

    let assignmentsList = Array.from(db.assignments.values());
    if (classId) {
      assignmentsList = assignmentsList.filter((a) => a.classId === classId);
    }

    // Attach submission status for student or deadline info
    const enriched = assignmentsList.map((asg) => {
      const submissionKey = `${asg.id}:${user.id}`;
      const submission = db.submissions.get(submissionKey);
      const deadlineInfo = DeadlineManager.computeDeadlineInfo(asg.dueAt, submission?.submittedAt, submission?.score !== undefined);

      return {
        ...asg,
        deadlineInfo,
        mySubmission: submission || null,
      };
    });

    sendJson(res, 200, { assignments: enriched });
    return true;
  }

  // POST /api/assignments/:id/submit - Student submits assignment
  const submitMatch = matchRoute('/api/assignments/:id/submit', pathname);
  if (req.method === 'POST' && submitMatch.matched) {
    const user = requireRole(req, res, ['student', 'admin']);
    if (!user) return true;

    const assignmentId = submitMatch.params.id;
    const assignment = db.assignments.get(assignmentId);
    if (!assignment) {
      sendJson(res, 404, { error: 'Not Found', message: 'Không tìm thấy bài tập' });
      return true;
    }

    try {
      const raw = await parseBody(req);
      const parsed = submitAssignmentSchema.safeParse(raw);
      if (!parsed.success) {
        sendJson(res, 400, { error: 'Validation Error', details: parsed.error.issues });
        return true;
      }

      const content = parsed.data.content ? sanitizeString(parsed.data.content) : undefined;
      const url = parsed.data.url ? sanitizeUrl(parsed.data.url) : undefined;

      if (!content && !url) {
        sendJson(res, 400, { error: 'Bad Request', message: 'Vui lòng cung cấp nội dung hoặc liên kết GitHub bài nộp' });
        return true;
      }

      const key = `${assignmentId}:${user.id}`;
      const submission: AssignmentSubmission = {
        id: `sub-${assignmentId}-${user.id}`,
        assignmentId,
        studentId: user.id,
        content,
        url,
        submittedAt: new Date().toISOString(),
      };

      db.submissions.set(key, submission);

      db.logActivity({
        userId: user.id,
        classId: assignment.classId,
        type: 'assignment_submitted',
        metadata: { assignmentId, title: assignment.title },
      });

      sendJson(res, 200, { submission, message: 'Nộp bài tập thành công' });
      return true;
    } catch (err: any) {
      sendJson(res, 400, { error: 'Bad Request', message: err.message });
      return true;
    }
  }

  // POST /api/assignments/:id/submissions/:studentId/grade - Teacher grades submission
  const gradeMatch = matchRoute('/api/assignments/:id/submissions/:studentId/grade', pathname);
  if (req.method === 'POST' && gradeMatch.matched) {
    const user = requireRole(req, res, ['teacher', 'admin']);
    if (!user) return true;

    const { id: assignmentId, studentId } = gradeMatch.params;
    const assignment = db.assignments.get(assignmentId);
    if (!assignment) {
      sendJson(res, 404, { error: 'Not Found', message: 'Không tìm thấy bài tập' });
      return true;
    }

    const classroom = db.classes.get(assignment.classId);
    if (user.role === 'teacher' && classroom?.teacherId !== user.id) {
      sendJson(res, 403, { error: 'Forbidden', message: 'Bạn không quản lý bài tập của lớp này' });
      return true;
    }

    const key = `${assignmentId}:${studentId}`;
    const submission = db.submissions.get(key);
    if (!submission) {
      sendJson(res, 404, { error: 'Not Found', message: 'Sinh viên chưa nộp bài tập này' });
      return true;
    }

    try {
      const raw = await parseBody(req);
      const parsed = gradeSubmissionSchema.safeParse(raw);
      if (!parsed.success) {
        sendJson(res, 400, { error: 'Validation Error', details: parsed.error.issues });
        return true;
      }

      const oldScore = submission.score;
      submission.score = parsed.data.score;
      submission.feedback = parsed.data.feedback ? sanitizeString(parsed.data.feedback) : undefined;
      (submission as any).gradedAt = new Date().toISOString();
      (submission as any).gradedBy = user.id;

      db.logAudit(user.id, 'grade_assignment_submission', 'submission', key, {
        assignmentId,
        studentId,
        oldScore,
        newScore: submission.score,
      });

      sendJson(res, 200, { submission, message: 'Chấm điểm bài nộp thành công' });
      return true;
    } catch (err: any) {
      sendJson(res, 400, { error: 'Bad Request', message: err.message });
      return true;
    }
  }

  return false;
}
