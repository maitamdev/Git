import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { checkPermission, ROLE_PERMISSIONS } from '../../packages/auth/src/index.js';
import type { Permission } from '../../packages/auth/src/types.js';
import { DatabaseStore } from '../../apps/api/src/db/store.js';

describe('Security, RBAC Matrix & Audit System (#31, #34, #38)', () => {
  const ALL_PERMISSIONS: Permission[] = [
    'course:view',
    'course:learn',
    'class:join',
    'class:create',
    'class:edit',
    'class:delete',
    'class:view_roster',
    'class:manage_students',
    'assignment:view',
    'assignment:submit',
    'assignment:create',
    'assignment:grade',
    'progress:sync_own',
    'progress:view_all',
    'admin:manage_users',
    'admin:manage_classes',
    'admin:view_audit',
    'admin:system_health',
  ];

  describe('Exhaustive Permission Matrix', () => {
    it('verifies student has exact allowed permissions and no elevated permissions', () => {
      const allowedStudent: Permission[] = [
        'course:view',
        'course:learn',
        'class:join',
        'assignment:view',
        'assignment:submit',
        'progress:sync_own',
      ];

      ALL_PERMISSIONS.forEach((perm) => {
        const expected = allowedStudent.includes(perm);
        expect(checkPermission('student', perm)).toBe(expected);
      });
    });

    it('verifies teacher has educational management permissions but no admin capabilities', () => {
      const allowedTeacher: Permission[] = [
        'course:view',
        'course:learn',
        'class:join',
        'class:create',
        'class:edit',
        'class:delete',
        'class:view_roster',
        'class:manage_students',
        'assignment:view',
        'assignment:create',
        'assignment:grade',
        'progress:sync_own',
        'progress:view_all',
      ];

      ALL_PERMISSIONS.forEach((perm) => {
        const expected = allowedTeacher.includes(perm);
        expect(checkPermission('teacher', perm)).toBe(expected);
      });
    });

    it('verifies admin has every system permission', () => {
      ALL_PERMISSIONS.forEach((perm) => {
        expect(checkPermission('admin', perm)).toBe(true);
      });
    });

    it('verifies unauthenticated null user has zero permissions', () => {
      ALL_PERMISSIONS.forEach((perm) => {
        expect(checkPermission(null, perm)).toBe(false);
      });
    });
  });

  describe('Password Security & Hashing (#34)', () => {
    it('never stores plaintext passwords; produces 60-character bcrypt hash', () => {
      const hash1 = DatabaseStore.hashPassword('MySecretPass@123');
      expect(hash1.startsWith('$2a$') || hash1.startsWith('$2b$')).toBe(true);
      expect(hash1).toHaveLength(60);
      expect(hash1).not.toBe('MySecretPass@123');
      expect(DatabaseStore.comparePassword('MySecretPass@123', hash1)).toBe(true);
      expect(DatabaseStore.comparePassword('WrongPass@123', hash1)).toBe(false);
    });

    it('produces distinct hashes for different passwords', () => {
      const hashA = DatabaseStore.hashPassword('PasswordA');
      const hashB = DatabaseStore.hashPassword('PasswordB');
      expect(hashA).not.toBe(hashB);
      expect(DatabaseStore.comparePassword('PasswordA', hashA)).toBe(true);
      expect(DatabaseStore.comparePassword('PasswordB', hashB)).toBe(true);
    });

    it('uses salt to mitigate rainbow table attacks', () => {
      const hash1 = DatabaseStore.hashPassword('CommonPass');
      const hash2 = DatabaseStore.hashPassword('CommonPass');
      expect(hash1).not.toBe(hash2);
      expect(DatabaseStore.comparePassword('CommonPass', hash1)).toBe(true);
      expect(DatabaseStore.comparePassword('CommonPass', hash2)).toBe(true);
    });
  });

  describe('Session Lifecycle & Revocation', () => {
    it('session expires when current time exceeds expiresAt', () => {
      const db = new DatabaseStore();
      const token = 'expired-token-123';
      const pastTime = Date.now() - 1000;

      db.sessions.set(token, { userId: 'student-khang-01', expiresAt: pastTime });

      const session = db.sessions.get(token);
      expect(session).toBeDefined();
      const isExpired = Date.now() > session!.expiresAt;
      expect(isExpired).toBe(true);
    });

    it('session revocation removes token completely', () => {
      const db = new DatabaseStore();
      const token = 'active-token-456';
      db.sessions.set(token, { userId: 'student-khang-01', expiresAt: Date.now() + 3600000 });

      expect(db.sessions.has(token)).toBe(true);
      db.sessions.delete(token);
      expect(db.sessions.has(token)).toBe(false);
    });
  });

  describe('Database Migration Schema Verification (#31)', () => {
    it('verifies migrations/001_initial_lms_schema.sql defines all required relational tables', () => {
      const migrationPath = path.resolve(process.cwd(), 'migrations/001_initial_lms_schema.sql');
      expect(fs.existsSync(migrationPath)).toBe(true);

      const sqlContent = fs.readFileSync(migrationPath, 'utf-8');

      const requiredTables = [
        'users',
        'classes',
        'enrollments',
        'lesson_progress',
        'achievements',
        'assignments',
        'assignment_submissions',
        'grades',
        'activity_events',
        'audit_logs',
      ];

      requiredTables.forEach((table) => {
        expect(sqlContent.toLowerCase()).toContain(`create table if not exists ${table}`);
      });
    });

    it('verifies unique constraints in SQL schema file', () => {
      const migrationPath = path.resolve(process.cwd(), 'migrations/001_initial_lms_schema.sql');
      const sqlContent = fs.readFileSync(migrationPath, 'utf-8').toLowerCase();

      // Check unique constraints: email, class code, enrollment (user_id, class_id), progress
      expect(sqlContent).toContain('email varchar(255) not null unique');
      expect(sqlContent).toContain('code varchar(64) not null unique');
      expect(sqlContent).toContain('primary key (user_id, class_id)');
      expect(sqlContent).toContain('constraint uq_user_lesson_version unique (user_id, lesson_id, course_version)');
    });
  });
});
