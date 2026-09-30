import type { IncomingMessage, ServerResponse } from 'node:http';
import type { User, Role } from '@git-academy/shared';
import { db } from '../db/store.js';
import { verifyJwt } from '../utils/jwt.js';

export interface AuthenticatedRequest extends IncomingMessage {
  user?: User;
  body?: any;
}

export function extractToken(req: IncomingMessage): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim();
  }

  // Check cookie session if present
  const cookieHeader = req.headers.cookie;
  if (cookieHeader) {
    const match = cookieHeader.match(/session_token=([^;]+)/);
    if (match) return match[1];
  }

  return null;
}

export function authenticate(req: AuthenticatedRequest): User | null {
  const token = extractToken(req);
  if (!token) return null;

  // 1. Check if token was explicitly revoked via logout
  if (db.revokedTokens.has(token)) {
    return null;
  }

  let userId: string | null = null;

  // 2. Cryptographic JWT Verification
  if (token.includes('.')) {
    const verification = verifyJwt(token);
    if (!verification.valid || !verification.payload) {
      return null;
    }
    userId = verification.payload.sub;
  } else {
    // 3. Fallback: In-memory session store
    const session = db.sessions.get(token);
    if (!session) return null;

    if (Date.now() > session.expiresAt) {
      db.sessions.delete(token);
      return null;
    }
    userId = session.userId;
  }

  if (!userId) return null;

  const userRecord = db.users.get(userId);
  if (!userRecord) return null;

  const { passwordHash, ...safeUser } = userRecord;
  req.user = safeUser;
  return safeUser;
}

export function requireAuth(req: AuthenticatedRequest, res: ServerResponse): User | null {
  const user = authenticate(req);
  if (!user) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Unauthorized', message: 'Yêu cầu đăng nhập để truy cập tài nguyên này' }));
    return null;
  }
  return user;
}

export function requireRole(req: AuthenticatedRequest, res: ServerResponse, allowedRoles: Role[]): User | null {
  const user = requireAuth(req, res);
  if (!user) return null;

  if (!allowedRoles.includes(user.role)) {
    res.writeHead(403, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Forbidden', message: `Quyền truy cập bị từ chối: yêu cầu vai trò ${allowedRoles.join('/')}` }));
    return null;
  }
  return user;
}
