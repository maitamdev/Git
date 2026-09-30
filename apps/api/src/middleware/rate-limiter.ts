import type { IncomingMessage, ServerResponse } from 'node:http';

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

export class MemoryRateLimiter {
  private limits: Map<string, RateLimitEntry> = new Map();

  constructor(
    private maxRequests: number = 60,
    private windowMs: number = 60000
  ) {}

  public check(key: string): { allowed: boolean; remaining: number; resetInMs: number } {
    const now = Date.now();
    let entry = this.limits.get(key);

    if (!entry || now > entry.resetAt) {
      entry = { count: 1, resetAt: now + this.windowMs };
      this.limits.set(key, entry);
      return { allowed: true, remaining: this.maxRequests - 1, resetInMs: this.windowMs };
    }

    if (entry.count >= this.maxRequests) {
      return { allowed: false, remaining: 0, resetInMs: entry.resetAt - now };
    }

    entry.count += 1;
    return { allowed: true, remaining: this.maxRequests - entry.count, resetInMs: entry.resetAt - now };
  }
}

// Global default limiters
export const authRateLimiter = new MemoryRateLimiter(15, 60000); // 15 requests/min for login/register
export const apiRateLimiter = new MemoryRateLimiter(120, 60000); // 120 requests/min for general API

export function applyRateLimit(
  req: IncomingMessage,
  res: ServerResponse,
  limiter: MemoryRateLimiter = apiRateLimiter
): boolean {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : undefined) ||
    req.socket.remoteAddress ||
    '127.0.0.1';
  const result = limiter.check(ip);

  res.setHeader('X-RateLimit-Remaining', result.remaining.toString());
  res.setHeader('X-RateLimit-Reset', Math.ceil(result.resetInMs / 1000).toString());

  if (!result.allowed) {
    res.writeHead(429, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Too Many Requests',
      message: 'Quá nhiều yêu cầu. Vui lòng thử lại sau giây lát.',
      retryAfter: Math.ceil(result.resetInMs / 1000),
    }));
    return false;
  }
  return true;
}
