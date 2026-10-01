import http, { type IncomingMessage, type ServerResponse } from 'node:http';
import { handleHealthRoutes } from './health/health-routes.js';
import { handleAuthRoutes } from './auth/auth-routes.js';
import { handleUserRoutes } from './users/users-routes.js';
import { handleClassRoutes } from './classes/classes-routes.js';
import { handleEnrollmentRoutes } from './enrollments/enrollments-routes.js';
import { handleProgressRoutes } from './progress/progress-routes.js';
import { handleGradeRoutes } from './grades/grades-routes.js';
import { handleAssignmentRoutes } from './assignments/assignments-routes.js';
import { handleAnalyticsRoutes } from './analytics/analytics-routes.js';
import { handleError } from './middleware/error-handler.js';
import { sendJson } from './utils/http.js';
import type { AuthenticatedRequest } from './middleware/auth-middleware.js';

export async function handleApiRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const authReq = req as AuthenticatedRequest;

  // CORS & Security headers
  const reqOrigin = req.headers.origin;
  const allowedOriginsEnv = process.env.CORS_ORIGIN || process.env.APP_URL;
  const allowedOrigins = allowedOriginsEnv
    ? allowedOriginsEnv.split(',').map((o) => o.trim()).filter(Boolean)
    : ['http://localhost:3000', 'http://127.0.0.1:3000'];

  if (reqOrigin && (allowedOrigins.includes(reqOrigin) || allowedOrigins.includes('*') || process.env.NODE_ENV !== 'production')) {
    res.setHeader('Access-Control-Allow-Origin', reqOrigin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  } else if (!reqOrigin) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = req.url || '/';
  const parsed = new URL(url, 'http://localhost');
  const pathname = parsed.pathname;

  try {
    // Health check probes
    if (handleHealthRoutes(req, res, url)) return;

    // Domain routes
    if (await handleAuthRoutes(authReq, res, pathname)) return;
    if (await handleUserRoutes(authReq, res, pathname)) return;
    if (await handleClassRoutes(authReq, res, pathname)) return;
    if (await handleEnrollmentRoutes(authReq, res, pathname)) return;
    if (await handleProgressRoutes(authReq, res, pathname)) return;
    if (await handleGradeRoutes(authReq, res, pathname)) return;
    if (await handleAssignmentRoutes(authReq, res, pathname)) return;
    if (await handleAnalyticsRoutes(authReq, res, pathname)) return;

    // 404 Route Not Found
    sendJson(res, 404, {
      error: 'Not Found',
      message: `Endpoint ${req.method} ${pathname} không tồn tại trên hệ thống API`,
    });
  } catch (err) {
    handleError(res, err);
  }
}

export function createServer(): http.Server {
  return http.createServer((req: IncomingMessage, res: ServerResponse) => {
    handleApiRequest(req, res);
  });
}

// Standalone execution support: node apps/api/dist/server.js
if (process.argv[1]?.endsWith('server.js') || process.argv[1]?.endsWith('server.ts')) {
  const PORT = parseInt(process.env.PORT || '3001', 10);
  const HOST = process.env.HOST || '0.0.0.0';
  const server = createServer();
  server.listen(PORT, HOST, () => {
    console.log(`[Git Academy API] Máy chủ LMS đang lắng nghe tại http://${HOST}:${PORT}`);
    console.log(`[Git Academy API] Môi trường: ${process.env.NODE_ENV || 'development'}`);
  });
}

