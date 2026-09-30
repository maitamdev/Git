import crypto from 'node:crypto';
import type { Role } from '@git-academy/shared';

export interface JwtPayload {
  sub: string;
  role: Role;
  email: string;
  iat: number;
  exp: number;
}

const DEFAULT_JWT_SECRET = 'gitacademy-secure-production-jwt-hmac-sha256-secret-key-32chars';

export function getJwtSecret(): string {
  return process.env.AUTH_SECRET || process.env.JWT_SECRET || DEFAULT_JWT_SECRET;
}

function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return Buffer.from(base64, 'base64').toString('utf8');
}

/**
 * Cryptographically signs a JWT token using HMAC-SHA256 (HS256).
 */
export function signJwt(
  payload: { sub: string; role: Role; email: string },
  expiresInSeconds: number = 7 * 86400,
  secret: string = getJwtSecret()
): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + expiresInSeconds;

  const fullPayload: JwtPayload = {
    sub: payload.sub,
    role: payload.role,
    email: payload.email,
    iat,
    exp,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload));
  const message = `${encodedHeader}.${encodedPayload}`;

  const signature = crypto
    .createHmac('sha256', secret)
    .update(message)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  return `${message}.${signature}`;
}

/**
 * Validates and decodes a JWT token.
 * Verifies format, algorithm, cryptographic signature, and expiration.
 */
export function verifyJwt(
  token: string,
  secret: string = getJwtSecret()
): { valid: boolean; payload?: JwtPayload; error?: string } {
  if (!token || typeof token !== 'string') {
    return { valid: false, error: 'Token missing' };
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    return { valid: false, error: 'Invalid token format' };
  }

  const [encodedHeader, encodedPayload, signature] = parts;

  // 1. Verify Header
  try {
    const header = JSON.parse(base64UrlDecode(encodedHeader));
    if (header.alg !== 'HS256') {
      return { valid: false, error: 'Unsupported algorithm (only HS256 allowed)' };
    }
  } catch {
    return { valid: false, error: 'Malformed token header' };
  }

  // 2. Verify Signature
  const message = `${encodedHeader}.${encodedPayload}`;
  const expectedSig = crypto
    .createHmac('sha256', secret)
    .update(message)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const expectedBuffer = Buffer.from(expectedSig);
  const actualBuffer = Buffer.from(signature);

  if (
    expectedBuffer.length !== actualBuffer.length ||
    !crypto.timingSafeEqual(expectedBuffer, actualBuffer)
  ) {
    return { valid: false, error: 'Invalid token signature / tampered payload' };
  }

  // 3. Verify Payload & Expiration
  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as JwtPayload;
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && now > payload.exp) {
      return { valid: false, error: 'Token has expired', payload };
    }
    return { valid: true, payload };
  } catch {
    return { valid: false, error: 'Malformed token payload' };
  }
}
