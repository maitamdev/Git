import type { ServerResponse } from 'node:http';
import crypto from 'node:crypto';
import { z } from 'zod';
import type { AuthenticatedRequest } from '../middleware/auth-middleware.js';
import { authenticate, extractToken, requireAuth } from '../middleware/auth-middleware.js';
import { applyRateLimit, authRateLimiter } from '../middleware/rate-limiter.js';
import { parseBody, sendJson } from '../utils/http.js';
import { sanitizeString } from '../middleware/sanitizer.js';
import { db, DatabaseStore, type UserDbRecord } from '../db/store.js';
import { signJwt } from '../utils/jwt.js';

const loginSchema = z.object({
  email: z.string().email('Email không đúng định dạng'),
  password: z.string().min(6, 'Mật khẩu phải từ 6 ký tự trở lên'),
});

const registerSchema = z.object({
  email: z.string().email('Email không đúng định dạng'),
  password: z.string().min(6, 'Mật khẩu phải từ 6 ký tự trở lên'),
  displayName: z.string().min(2, 'Tên hiển thị phải từ 2 ký tự trở lên'),
  role: z.enum(['student', 'teacher']).default('student'),
});

export async function handleAuthRoutes(req: AuthenticatedRequest, res: ServerResponse, pathname: string): Promise<boolean> {
  // POST /api/auth/login
  if (req.method === 'POST' && pathname === '/api/auth/login') {
    if (!applyRateLimit(req, res, authRateLimiter)) return true;

    try {
      const raw = await parseBody(req);
      const parsed = loginSchema.safeParse(raw);
      if (!parsed.success) {
        sendJson(res, 400, { error: 'Validation Error', details: parsed.error.issues });
        return true;
      }

      const { email, password } = parsed.data;
      const user = Array.from(db.users.values()).find((u) => u.email.toLowerCase() === email.toLowerCase());

      if (!user) {
        sendJson(res, 401, { error: 'Unauthorized', message: 'Email hoặc mật khẩu không chính xác' });
        return true;
      }

      if (!DatabaseStore.comparePassword(password, user.passwordHash)) {
        sendJson(res, 401, { error: 'Unauthorized', message: 'Email hoặc mật khẩu không chính xác' });
        return true;
      }

      // Generate signed JWT bearer token
      const token = signJwt({ sub: user.id, role: user.role, email: user.email }, 7 * 86400);
      const expiresAt = Date.now() + 7 * 24 * 3600 * 1000; // 7 days
      db.sessions.set(token, { userId: user.id, expiresAt });

      const isProd = process.env.NODE_ENV === 'production';
      res.setHeader('Set-Cookie', `session_token=${token}; Path=/; HttpOnly; SameSite=Lax${isProd ? '; Secure' : ''}; Max-Age=${7 * 86400}`);

      const { passwordHash, ...safeUser } = user;
      db.logActivity({
        userId: user.id,
        type: 'lesson_started', // login tracking
        metadata: { action: 'user_login' },
      });

      sendJson(res, 200, {
        token,
        user: safeUser,
        message: 'Đăng nhập thành công',
      });
      return true;
    } catch (err: any) {
      sendJson(res, 400, { error: 'Bad Request', message: err.message });
      return true;
    }
  }

  // POST /api/auth/register
  if (req.method === 'POST' && pathname === '/api/auth/register') {
    if (!applyRateLimit(req, res, authRateLimiter)) return true;

    try {
      const raw = await parseBody(req);
      const parsed = registerSchema.safeParse(raw);
      if (!parsed.success) {
        sendJson(res, 400, { error: 'Validation Error', details: parsed.error.issues });
        return true;
      }

      const { email, password, displayName, role } = parsed.data;
      const normalizedEmail = email.toLowerCase().trim();

      const existing = Array.from(db.users.values()).find((u) => u.email.toLowerCase() === normalizedEmail);
      if (existing) {
        sendJson(res, 409, { error: 'Conflict', message: 'Email này đã được sử dụng trên hệ thống' });
        return true;
      }

      const newUser: UserDbRecord = {
        id: `user-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`,
        email: normalizedEmail,
        displayName: sanitizeString(displayName),
        role,
        passwordHash: DatabaseStore.hashPassword(password),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      db.users.set(newUser.id, newUser);

      // Generate signed JWT bearer token
      const token = signJwt({ sub: newUser.id, role: newUser.role, email: newUser.email }, 7 * 86400);
      const expiresAt = Date.now() + 7 * 24 * 3600 * 1000;
      db.sessions.set(token, { userId: newUser.id, expiresAt });

      const isProd = process.env.NODE_ENV === 'production';
      res.setHeader('Set-Cookie', `session_token=${token}; Path=/; HttpOnly; SameSite=Lax${isProd ? '; Secure' : ''}; Max-Age=${7 * 86400}`);

      db.logAudit(newUser.id, 'register_account', 'user', newUser.id, { role: newUser.role, email: newUser.email });

      const { passwordHash, ...safeUser } = newUser;
      sendJson(res, 201, {
        token,
        user: safeUser,
        message: 'Đăng ký tài khoản thành công',
      });
      return true;
    } catch (err: any) {
      sendJson(res, 400, { error: 'Bad Request', message: err.message });
      return true;
    }
  }

  // GET /api/auth/me
  if (req.method === 'GET' && pathname === '/api/auth/me') {
    const user = requireAuth(req, res);
    if (!user) return true;

    sendJson(res, 200, { user });
    return true;
  }

  // POST /api/auth/logout
  if (req.method === 'POST' && pathname === '/api/auth/logout') {
    const token = extractToken(req);
    if (token) {
      db.sessions.delete(token);
      db.revokedTokens.add(token);
    }
    res.setHeader('Set-Cookie', 'session_token=; Path=/; HttpOnly; Max-Age=0');
    sendJson(res, 200, { message: 'Đăng xuất thành công' });
    return true;
  }

  return false;
}

