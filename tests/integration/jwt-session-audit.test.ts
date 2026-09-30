import { describe, it, expect } from 'vitest';
import { signJwt, verifyJwt, getJwtSecret } from '../../apps/api/src/utils/jwt.js';
import { DatabaseStore, db } from '../../apps/api/src/db/store.js';
import { authenticate } from '../../apps/api/src/middleware/auth-middleware.js';

describe('Pre-Go-Live Audit: JWT & Session Security (#5)', () => {
  const secret = getJwtSecret();

  it('signs and verifies valid JWT with HS256 algorithm', () => {
    const token = signJwt({ sub: 'user-123', role: 'student', email: 'khang@gitacademy.vn' }, 3600);
    expect(typeof token).toBe('string');
    expect(token.split('.')).toHaveLength(3);

    const verified = verifyJwt(token);
    expect(verified.valid).toBe(true);
    expect(verified.payload?.sub).toBe('user-123');
    expect(verified.payload?.role).toBe('student');
    expect(verified.payload?.email).toBe('khang@gitacademy.vn');
  });

  it('detects and rejects expired tokens', () => {
    // Generate token with negative duration (already expired)
    const expiredToken = signJwt(
      { sub: 'user-expired', role: 'student', email: 'old@gitacademy.vn' },
      -10
    );

    const verified = verifyJwt(expiredToken);
    expect(verified.valid).toBe(false);
    expect(verified.error).toContain('expired');
  });

  it('detects and blocks role tampering attacks', () => {
    // Legitimate student token
    const token = signJwt({ sub: 'student-01', role: 'student', email: 'khang@gitacademy.vn' }, 3600);
    const [header, payload, signature] = token.split('.');

    // Attacker decodes payload, changes role to 'admin', and re-encodes
    const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));
    decodedPayload.role = 'admin';
    const tamperedPayload = Buffer.from(JSON.stringify(decodedPayload))
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    const tamperedToken = `${header}.${tamperedPayload}.${signature}`;

    // Verifying tampered token MUST fail because HMAC signature is broken
    const verified = verifyJwt(tamperedToken);
    expect(verified.valid).toBe(false);
    expect(verified.error).toContain('tampered');
  });

  it('rejects tokens with forged or wrong signatures', () => {
    const token = signJwt(
      { sub: 'student-01', role: 'student', email: 'khang@gitacademy.vn' },
      3600,
      'different-secret-key-123'
    );

    const verified = verifyJwt(token); // verifies with default secret
    expect(verified.valid).toBe(false);
    expect(verified.error).toContain('tampered');
  });

  it('rejects malformed tokens or alg: none attacks', () => {
    expect(verifyJwt('').valid).toBe(false);
    expect(verifyJwt('not-a-jwt').valid).toBe(false);
    expect(verifyJwt('part1.part2').valid).toBe(false);

    // Header with alg: none
    const headerNone = Buffer.from(JSON.stringify({ alg: 'none', typ: 'JWT' }))
      .toString('base64')
      .replace(/=/g, '');
    const payload = Buffer.from(JSON.stringify({ sub: 'user-1', role: 'admin' }))
      .toString('base64')
      .replace(/=/g, '');
    const fakeToken = `${headerNone}.${payload}.`;

    const verified = verifyJwt(fakeToken);
    expect(verified.valid).toBe(false);
    expect(verified.error).toContain('Unsupported algorithm');
  });

  it('enforces server-side token revocation on logout', () => {
    const store = new DatabaseStore();
    const token = signJwt({ sub: 'student-khang-01', role: 'student', email: 'khang@gitacademy.vn' }, 3600);

    // Mock incoming request with bearer token
    const req: any = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    // Before logout: authenticate succeeds
    const userBefore = authenticate(req);
    expect(userBefore).not.toBeNull();
    expect(userBefore?.id).toBe('student-khang-01');

    // Simulate logout: revoke token
    db.revokedTokens.add(token);

    // After logout: authenticate MUST reject
    const userAfter = authenticate(req);
    expect(userAfter).toBeNull();
  });
});
