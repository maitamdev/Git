import type { ServerResponse } from 'node:http';

export function handleError(res: ServerResponse, error: unknown): void {
  const isProd = process.env.NODE_ENV === 'production';
  const message = error instanceof Error ? error.message : 'Lỗi máy chủ không xác định';

  // Do not expose stack traces or internal paths to client in production
  const responsePayload = {
    error: 'Internal Server Error',
    message: isProd ? 'Đã có lỗi xảy ra trên hệ thống. Vui lòng liên hệ quản trị viên.' : message,
    timestamp: new Date().toISOString(),
  };

  res.writeHead(500, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(responsePayload));
}
