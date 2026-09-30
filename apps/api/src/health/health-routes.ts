import type { IncomingMessage, ServerResponse } from 'node:http';
import { sendJson } from '../utils/http.js';
import { db } from '../db/store.js';

export function handleHealthRoutes(req: IncomingMessage, res: ServerResponse, url: string): boolean {
  const parsed = new URL(url, 'http://localhost');

  if (req.method === 'GET' && parsed.pathname === '/health') {
    sendJson(res, 200, {
      status: 'ok',
      service: 'git-academy-api',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
    });
    return true;
  }

  if (req.method === 'GET' && parsed.pathname === '/ready') {
    const dbHealthy = db.users.size > 0;
    sendJson(res, 200, {
      ready: dbHealthy,
      database: dbHealthy ? 'connected' : 'initializing',
      checks: {
        usersStore: db.users.size > 0 ? 'up' : 'down',
        classesStore: db.classes.size > 0 ? 'up' : 'down',
      },
    });
    return true;
  }

  return false;
}
