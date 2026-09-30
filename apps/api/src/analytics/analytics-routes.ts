import type { ServerResponse } from 'node:http';
import type { ClassAnalytics } from '@git-academy/shared';
import type { AuthenticatedRequest } from '../middleware/auth-middleware.js';
import { requireRole } from '../middleware/auth-middleware.js';
import { matchRoute, sendJson } from '../utils/http.js';
import { db } from '../db/store.js';

export async function handleAnalyticsRoutes(req: AuthenticatedRequest, res: ServerResponse, pathname: string): Promise<boolean> {
  // GET /api/analytics/classes/:id - Teacher/Admin only
  const analyticsMatch = matchRoute('/api/analytics/classes/:id', pathname);
  if (req.method === 'GET' && analyticsMatch.matched) {
    const user = requireRole(req, res, ['teacher', 'admin']);
    if (!user) return true;

    const classId = analyticsMatch.params.id;
    const classroom = db.classes.get(classId);
    if (!classroom) {
      sendJson(res, 404, { error: 'Not Found', message: 'Không tìm thấy lớp học' });
      return true;
    }

    if (user.role === 'teacher' && classroom.teacherId !== user.id) {
      sendJson(res, 403, { error: 'Forbidden', message: 'Bạn không quản lý lớp học này' });
      return true;
    }

    const enrollments = Array.from(db.enrollments.values()).filter(
      (e) => e.classId === classId && e.status === 'active'
    );
    const studentIds = new Set(enrollments.map((e) => e.userId));

    const classProgress = Array.from(db.lessonProgress.values()).filter(
      (p) => studentIds.has(p.studentId)
    );

    const totalStudents = enrollments.length;
    const completedCoursesCount = enrollments.filter((e) => {
      const completed = classProgress.filter((p) => p.studentId === e.userId && p.status === 'completed').length;
      return completed >= 128;
    }).length;

    // Difficulty tracking
    const lessonAttempts: Record<string, { totalAttempts: number; studentCount: number; scores: number[] }> = {};
    classProgress.forEach((p) => {
      if (!lessonAttempts[p.lessonId]) {
        lessonAttempts[p.lessonId] = { totalAttempts: 0, studentCount: 0, scores: [] };
      }
      lessonAttempts[p.lessonId].totalAttempts += p.attempts || 1;
      lessonAttempts[p.lessonId].studentCount += 1;
      if (typeof p.score === 'number') {
        lessonAttempts[p.lessonId].scores.push(p.score);
      }
    });

    const mostRetriedLabs = Object.entries(lessonAttempts)
      .filter(([id]) => id.includes('lab') || id.includes('conflict') || id.includes('rebase'))
      .map(([lessonId, data]) => ({
        lessonId,
        averageAttempts: Number((data.totalAttempts / (data.studentCount || 1)).toFixed(1)),
        failRate: data.scores.length > 0
          ? Math.round((data.scores.filter((s) => s < 60).length / data.scores.length) * 100)
          : 0,
      }))
      .sort((a, b) => b.averageAttempts - a.averageAttempts)
      .slice(0, 5);

    const mostFailedQuizzes = Object.entries(lessonAttempts)
      .filter(([_, data]) => data.scores.length > 0)
      .map(([lessonId, data]) => {
        const failedCount = data.scores.filter((s) => s < 60).length;
        const failRate = Math.round((failedCount / data.scores.length) * 100);
        return { lessonId, failRate, totalSubmissions: data.scores.length };
      })
      .sort((a, b) => b.failRate - a.failRate)
      .slice(0, 5);

    const scoresList = classProgress.map((p) => p.score).filter((s): s is number => typeof s === 'number');
    const averageQuizScore = scoresList.length > 0
      ? Math.round(scoresList.reduce((a, b) => a + b, 0) / scoresList.length)
      : 81;

    const completedLessonCounts = enrollments.map((e) =>
      classProgress.filter((p) => p.studentId === e.userId && p.status === 'completed').length
    );
    const averageProgress = totalStudents > 0
      ? Math.round((completedLessonCounts.reduce((a, b) => a + b, 0) / (totalStudents * 128)) * 100)
      : 0;

    // Academic threshold for at risk: < 30% progress
    const atRiskStudentsCount = completedLessonCounts.filter((c) => (c / 128) * 100 < 30).length;

    const analytics: ClassAnalytics = {
      classId,
      totalStudents,
      activeStudents: totalStudents,
      averageProgress,
      averageQuizScore,
      completedCoursesCount,
      atRiskStudentsCount,
      difficultyInsights: {
        mostRetriedLabs,
        mostFailedQuizzes,
      },
    };

    sendJson(res, 200, { analytics });
    return true;
  }

  return false;
}
