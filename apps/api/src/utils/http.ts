import type { IncomingMessage, ServerResponse } from 'node:http';

export async function parseBody<T = any>(req: IncomingMessage, maxBytes: number = 1048576): Promise<T> {
  if ((req as any).body !== undefined && (req as any).body !== null) {
    if (typeof (req as any).body === 'object') {
      return (req as any).body as T;
    }
    if (typeof (req as any).body === 'string' && (req as any).body.length > 0) {
      try {
        return JSON.parse((req as any).body) as T;
      } catch {
        return (req as any).body as T;
      }
    }
  }

  return new Promise((resolve, reject) => {
    let raw = '';
    let bytes = 0;

    req.on('data', (chunk) => {
      bytes += chunk.length;
      if (bytes > maxBytes) {
        reject(new Error('Kích thước payload vượt quá giới hạn 1MB'));
        return;
      }
      raw += chunk;
    });

    req.on('end', () => {
      if (!raw) {
        resolve({} as T);
        return;
      }
      try {
        const parsed = JSON.parse(raw);
        resolve(parsed as T);
      } catch (err) {
        reject(new Error('Định dạng JSON không hợp lệ'));
      }
    });

    req.on('error', (err) => reject(err));
  });
}

export function sendJson(res: ServerResponse, statusCode: number, data: unknown): void {
  const payload = JSON.stringify(data);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload),
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
  });
  res.end(payload);
}

export interface RouteMatch {
  matched: boolean;
  params: Record<string, string>;
  searchParams: URLSearchParams;
}

export function matchRoute(pattern: string, urlStr: string): RouteMatch {
  const parsedUrl = new URL(urlStr, 'http://localhost');
  const actualPath = parsedUrl.pathname;

  const patternParts = pattern.split('/').filter(Boolean);
  const actualParts = actualPath.split('/').filter(Boolean);

  if (patternParts.length !== actualParts.length) {
    return { matched: false, params: {}, searchParams: parsedUrl.searchParams };
  }

  const params: Record<string, string> = {};
  for (let i = 0; i < patternParts.length; i++) {
    const p = patternParts[i];
    const a = actualParts[i];
    if (p.startsWith(':')) {
      params[p.substring(1)] = decodeURIComponent(a);
    } else if (p !== a) {
      return { matched: false, params: {}, searchParams: parsedUrl.searchParams };
    }
  }

  return { matched: true, params, searchParams: parsedUrl.searchParams };
}
