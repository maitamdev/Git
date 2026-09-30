import { describe, it, expect } from 'vitest';
import bcrypt from 'bcryptjs';
import { DatabaseStore } from '../../apps/api/src/db/store.js';

describe('Pre-Go-Live Audit: Password Security & Bcrypt Hashing (#4)', () => {
  it('strictly produces standard bcrypt hash starting with $2a$ or $2b$', () => {
    const rawPassword = 'StudentStrongPassword!2026';
    const hash = DatabaseStore.hashPassword(rawPassword);

    expect(hash.startsWith('$2a$') || hash.startsWith('$2b$')).toBe(true);
    expect(hash).toHaveLength(60);
  });

  it('guarantees password is never stored as plaintext, MD5, SHA-1, or raw SHA-256', () => {
    const passwords = ['Student@123', 'Teacher@123', 'Admin@123', 'MySecretP@ssword'];

    for (const pw of passwords) {
      const hash = DatabaseStore.hashPassword(pw);

      // Not plaintext
      expect(hash).not.toBe(pw);
      expect(hash.includes(pw)).toBe(false);

      // Not MD5 (32 hex characters)
      expect(hash).not.toMatch(/^[a-f0-9]{32}$/i);

      // Not SHA-1 (40 hex characters)
      expect(hash).not.toMatch(/^[a-f0-9]{40}$/i);

      // Not raw SHA-256 (64 hex characters)
      expect(hash).not.toMatch(/^[a-f0-9]{64}$/i);

      // Must match standard bcrypt pattern
      expect(hash).toMatch(/^\$2[ab]\$[0-9]{2}\$[./A-Za-z0-9]{53}$/);
    }
  });

  it('enforces cost factor >= 10 for resistance against brute-force attacks', () => {
    const hash = DatabaseStore.hashPassword('BenchmarkPassword2026');
    const costFactor = parseInt(hash.split('$')[2], 10);
    expect(costFactor).toBeGreaterThanOrEqual(10);
  });

  it('generates distinct salt for every hash operation to mitigate rainbow tables', () => {
    const password = 'IdenticalPassword123!';
    const hash1 = DatabaseStore.hashPassword(password);
    const hash2 = DatabaseStore.hashPassword(password);

    expect(hash1).not.toBe(hash2);
    expect(DatabaseStore.comparePassword(password, hash1)).toBe(true);
    expect(DatabaseStore.comparePassword(password, hash2)).toBe(true);
  });

  it('verifies correct passwords and rejects incorrect passwords safely', () => {
    const correctPassword = 'CorrectHorseBatteryStaple!2026';
    const hash = DatabaseStore.hashPassword(correctPassword);

    expect(DatabaseStore.comparePassword(correctPassword, hash)).toBe(true);
    expect(DatabaseStore.comparePassword('WrongPassword', hash)).toBe(false);
    expect(DatabaseStore.comparePassword('', hash)).toBe(false);
    expect(DatabaseStore.comparePassword(correctPassword, '')).toBe(false);
  });
});
