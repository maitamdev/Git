import type { ServerResponse } from 'node:http';
import { z } from 'zod';
import type { AuthenticatedRequest } from '../middleware/auth-middleware.js';
import { requireAuth, requireRole } from '../middleware/auth-middleware.js';
import { matchRoute, parseBody, sendJson } from '../utils/http.js';
import { db } from '../db/store.js';

const roleUpdateSchema = z.object({
  role: z.enum(['student', 'teacher', 'admin']),
});

export async function handleUserRoutes(req: AuthenticatedRequest, res: ServerResponse, pathname: string): Promise<boolean> {
  // GET /api/users - Admin only
  if (req.method === 'GET' && pathname === '/api/users') {
    const user = requireRole(req, res, ['admin']);
    if (!user) return true;

    const allUsers = Array.from(db.users.values()).map(({ passwordHash, ...safeUser }) => safeUser);
    sendJson(res, 200, { users: allUsers });
    return true;
  }

  // PATCH /api/users/:id/role - Admin only
  const roleMatch = matchRoute('/api/users/:id/role', pathname);
  if (req.method === 'PATCH' && roleMatch.matched) {
    const adminUser = requireRole(req, res, ['admin']);
    if (!adminUser) return true;

    const targetUserId = roleMatch.params.id;
    const targetUser = db.users.get(targetUserId);
    if (!targetUser) {
      sendJson(res, 404, { error: 'Not Found', message: 'Không tìm thấy người dùng' });
      return true;
    }

    try {
      const raw = await parseBody(req);
      const parsed = roleUpdateSchema.safeParse(raw);
      if (!parsed.success) {
        sendJson(res, 400, { error: 'Validation Error', details: parsed.error.issues });
        return true;
      }

      const oldRole = targetUser.role;
      targetUser.role = parsed.data.role;
      targetUser.updatedAt = new Date().toISOString();

      db.logAudit(adminUser.id, 'change_user_role', 'user', targetUserId, {
        oldRole,
        newRole: targetUser.role,
      });

      const { passwordHash, ...safeUser } = targetUser;
      sendJson(res, 200, { user: safeUser, message: 'Cập nhật vai trò thành công' });
      return true;
    } catch (err: any) {
      sendJson(res, 400, { error: 'Bad Request', message: err.message });
      return true;
    }
  }

  // GET /api/audit - Admin only
  if (req.method === 'GET' && (pathname === '/api/audit' || pathname === '/api/audit/logs')) {
    const adminUser = requireRole(req, res, ['admin']);
    if (!adminUser) return true;

    sendJson(res, 200, { auditLogs: db.auditLogs });
    return true;
  }

  // /api/teacher/* - Teacher or Admin only
  if (pathname.startsWith('/api/teacher')) {
    const user = requireRole(req, res, ['teacher', 'admin']);
    if (!user) return true;

    sendJson(res, 200, { message: 'Teacher endpoint access granted' });
    return true;
  }

  return false;
}
