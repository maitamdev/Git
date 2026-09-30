import { describe, it, expect } from 'vitest';
import { DatabaseStore } from '../../apps/api/src/db/store.js';

describe('Pre-Go-Live Audit: Seed Isolation & Admin Bootstrap (#21, #22)', () => {
  it('isolates development seeds: production environment starts with empty store', () => {
    const originalEnv = process.env.NODE_ENV;
    const originalSeeds = process.env.ENABLE_DEV_SEEDS;
    process.env.NODE_ENV = 'production';
    delete process.env.ENABLE_DEV_SEEDS;
    delete process.env.BOOTSTRAP_ADMIN_EMAIL;
    delete process.env.BOOTSTRAP_ADMIN_PASSWORD;

    try {
      const prodStore = new DatabaseStore();

      // In production mode, NO demo users or demo classes exist by default
      expect(prodStore.users.size).toBe(0);
      expect(prodStore.classes.size).toBe(0);
      expect(prodStore.enrollments.size).toBe(0);
      expect(prodStore.lessonProgress.size).toBe(0);
      expect(prodStore.assignments.size).toBe(0);
      expect(prodStore.submissions.size).toBe(0);
    } finally {
      process.env.NODE_ENV = originalEnv;
      if (originalSeeds) process.env.ENABLE_DEV_SEEDS = originalSeeds;
    }
  });

  it('safely bootstraps root admin from environment variables with bcrypt hash', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    process.env.BOOTSTRAP_ADMIN_EMAIL = 'sysadmin@gitacademy.vn';
    process.env.BOOTSTRAP_ADMIN_PASSWORD = 'ProductionRootPassword2026!';
    process.env.BOOTSTRAP_ADMIN_NAME = 'Giám Đốc Hệ Thống';

    try {
      const prodStore = new DatabaseStore();

      expect(prodStore.users.size).toBe(1);
      const admin = Array.from(prodStore.users.values())[0];

      expect(admin.email).toBe('sysadmin@gitacademy.vn');
      expect(admin.displayName).toBe('Giám Đốc Hệ Thống');
      expect(admin.role).toBe('admin');

      // Verify bcrypt password hash
      expect(admin.passwordHash.startsWith('$2a$') || admin.passwordHash.startsWith('$2b$')).toBe(true);
      expect(DatabaseStore.comparePassword('ProductionRootPassword2026!', admin.passwordHash)).toBe(true);
      expect(DatabaseStore.comparePassword('WrongPassword', admin.passwordHash)).toBe(false);

      // Verify bootstrap audit log
      expect(prodStore.auditLogs.length).toBe(1);
      expect(prodStore.auditLogs[0].action).toBe('bootstrap_admin');
    } finally {
      process.env.NODE_ENV = originalEnv;
      delete process.env.BOOTSTRAP_ADMIN_EMAIL;
      delete process.env.BOOTSTRAP_ADMIN_PASSWORD;
      delete process.env.BOOTSTRAP_ADMIN_NAME;
    }
  });
});
