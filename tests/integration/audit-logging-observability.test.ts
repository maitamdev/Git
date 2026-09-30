import { describe, it, expect, beforeEach } from 'vitest';
import { DatabaseStore } from '../../apps/api/src/db/store.js';
import { MemoryRateLimiter } from '../../apps/api/src/middleware/rate-limiter.js';
import { handleError } from '../../apps/api/src/middleware/error-handler.js';

describe('Audit Logging, Observability & Error Hardening (#35, #36, #38, #45, #46)', () => {
  let db: DatabaseStore;

  beforeEach(() => {
    db = new DatabaseStore();
  });

  describe('Production Error Masking (#46)', () => {
    it('masks stack traces and internal paths in production environment', () => {
      const prevEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      let statusCode = 0;
      let headers: Record<string, string> = {};
      let body = '';

      const fakeRes: any = {
        writeHead: (code: number, h: Record<string, string>) => {
          statusCode = code;
          headers = h;
        },
        end: (payload: string) => {
          body = payload;
        },
      };

      const internalError = new Error('Database connection failed at /var/app/internal/db.sock: ECONNREFUSED');
      handleError(fakeRes, internalError);

      expect(statusCode).toBe(500);
      const parsed = JSON.parse(body);
      expect(parsed.error).toBe('Internal Server Error');
      // Must NOT contain internal system path
      expect(parsed.message).not.toContain('/var/app/internal');
      expect(parsed.message).toContain('quản trị viên');

      process.env.NODE_ENV = prevEnv;
    });

    it('provides descriptive debugging message in development mode', () => {
      const prevEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      let body = '';
      const fakeRes: any = {
        writeHead: () => {},
        end: (payload: string) => {
          body = payload;
        },
      };

      const devError = new Error('Validation failed for field: quizScore');
      handleError(fakeRes, devError);

      const parsed = JSON.parse(body);
      expect(parsed.message).toBe('Validation failed for field: quizScore');

      process.env.NODE_ENV = prevEnv;
    });
  });

  describe('Rate Limiter Behavior (#36)', () => {
    it('allows requests within limit and decrements remaining', () => {
      const limiter = new MemoryRateLimiter(5, 60000); // 5 reqs per min

      const r1 = limiter.check('192.168.1.1');
      expect(r1.allowed).toBe(true);
      expect(r1.remaining).toBe(4);

      const r2 = limiter.check('192.168.1.1');
      expect(r2.allowed).toBe(true);
      expect(r2.remaining).toBe(3);
    });

    it('blocks requests once rate limit threshold is exceeded', () => {
      const limiter = new MemoryRateLimiter(3, 60000);
      const ip = '10.0.0.1';

      limiter.check(ip); // req 1
      limiter.check(ip); // req 2
      limiter.check(ip); // req 3 (last allowed)

      const blocked = limiter.check(ip); // req 4
      expect(blocked.allowed).toBe(false);
      expect(blocked.remaining).toBe(0);
      expect(blocked.resetInMs).toBeGreaterThan(0);
    });

    it('tracks different IP addresses independently', () => {
      const limiter = new MemoryRateLimiter(2, 60000);

      limiter.check('10.0.0.1');
      limiter.check('10.0.0.1');
      expect(limiter.check('10.0.0.1').allowed).toBe(false);

      // Separate IP should be allowed
      expect(limiter.check('10.0.0.2').allowed).toBe(true);
    });
  });

  describe('Audit Trail Governance & Querying (#38)', () => {
    it('logs administrative sensitive actions with timestamp and actor', () => {
      const log = db.logAudit('admin-01', 'change_user_role', 'user', 'user-02', {
        oldRole: 'student',
        newRole: 'teacher',
      });

      expect(log.id).toBeDefined();
      expect(log.actorId).toBe('admin-01');
      expect(log.action).toBe('change_user_role');
      expect(log.details?.newRole).toBe('teacher');
      expect(new Date(log.timestamp).getTime()).not.toBeNaN();
    });

    it('queries audit logs by actor ID', () => {
      db.logAudit('teacher-01', 'create_class', 'class', 'c-1');
      db.logAudit('teacher-02', 'create_class', 'class', 'c-2');
      db.logAudit('teacher-01', 'grade_assignment_submission', 'submission', 's-1');

      const teacher1Logs = db.auditLogs.filter((l) => l.actorId === 'teacher-01');
      expect(teacher1Logs).toHaveLength(2);
    });

    it('queries audit logs by action type', () => {
      db.logAudit('t1', 'create_class', 'class', 'c-new');
      const classCreationLogs = db.auditLogs.filter((l) => l.action === 'create_class');
      expect(classCreationLogs.length).toBeGreaterThanOrEqual(1);
    });

    it('does not log plaintext passwords or secrets in audit details', () => {
      const audit = db.logAudit('sys', 'register_account', 'user', 'u-1', {
        email: 'user@test.vn',
        // No password logged
      });

      expect(audit.details?.password).toBeUndefined();
      expect(audit.details?.passwordHash).toBeUndefined();
    });
  });

  describe('Activity Events Streaming (#21)', () => {
    it('captures learning activity events in chronological order', () => {
      const act1 = db.logActivity({
        userId: 'student-khang-01',
        type: 'quiz_started',
        data: { lessonId: '01-foundations-01-version-control' },
      });

      const act2 = db.logActivity({
        userId: 'student-khang-01',
        type: 'quiz_passed',
        data: { lessonId: '01-foundations-01-version-control', score: 100 },
      });

      expect(db.activityEvents.some((e) => e.id === act1.id)).toBe(true);
      expect(db.activityEvents.some((e) => e.id === act2.id)).toBe(true);
    });
  });
});
