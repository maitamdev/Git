import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { createServer } from '../../apps/api/src/server.js';
import { db, DatabaseStore, type UserDbRecord } from '../../apps/api/src/db/store.js';
import { signJwt } from '../../apps/api/src/utils/jwt.js';

describe('Pre-Go-Live Audit: XSS, SQLi, Rate Limiting & Integrity (#13, #14, #15, #16, #17)', () => {
  let server: Server;
  let baseUrl: string;

  let teacherToken: string;
  let studentToken: string;
  let testClassId: string;

  beforeAll(async () => {
    server = createServer();
    await new Promise<void>((resolve) => {
      server.listen(0, '127.0.0.1', () => {
        const addr = server.address() as AddressInfo;
        baseUrl = `http://127.0.0.1:${addr.port}`;
        resolve();
      });
    });

    const teacher: UserDbRecord = {
      id: 'teacher-xss-audit',
      email: 'teacher_audit@gitacademy.vn',
      displayName: 'Teacher Audit',
      role: 'teacher',
      passwordHash: DatabaseStore.hashPassword('Pass@123'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.users.set(teacher.id, teacher);
    teacherToken = signJwt({ sub: teacher.id, role: 'teacher', email: teacher.email }, 3600);

    const student: UserDbRecord = {
      id: 'student-xss-audit',
      email: 'student_audit@gitacademy.vn',
      displayName: 'Student Audit',
      role: 'student',
      passwordHash: DatabaseStore.hashPassword('Pass@123'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.users.set(student.id, student);
    studentToken = signJwt({ sub: student.id, role: 'student', email: student.email }, 3600);

    testClassId = 'class-audit-test';
    db.classes.set(testClassId, {
      id: testClassId,
      name: 'Audit Security Class',
      code: 'GIT-AUDIT-01',
      teacherId: teacher.id,
      courseId: 'git-foundations',
      createdAt: new Date().toISOString(),
    });

    db.enrollments.set(`${student.id}:${testClassId}`, {
      userId: student.id,
      classId: testClassId,
      status: 'active',
      enrolledAt: new Date().toISOString(),
    });
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => {
      server.close(() => resolve());
    });
  });

  describe('XSS Neutralization (#13)', () => {
    it('sanitizes <script>alert(1)</script> in class creation', async () => {
      const maliciousName = 'CNTT K48 <script>alert("XSS")</script>';
      const res = await fetch(`${baseUrl}/api/classes`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${teacherToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: maliciousName,
          code: 'GIT-SEC-XSS',
        }),
      });

      expect(res.status).toBe(201);
      const json = await res.json();
      expect(json.classroom.name).not.toContain('<script>');
      expect(json.classroom.name).not.toContain('alert("XSS")');
    });

    it('sanitizes onerror and onload javascript injection payloads in registration', async () => {
      const maliciousName = 'Hacker <img src=x onerror=alert(1)>';
      const email = `hacker_${Date.now()}@gitacademy.vn`;

      const res = await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password: 'Password123!',
          displayName: maliciousName,
        }),
      });

      expect(res.status).toBe(201);
      const json = await res.json();
      expect(json.user.displayName).not.toContain('<img');
      expect(json.user.displayName).toContain('&lt;img');
      expect(json.user.displayName).toContain('&gt;');
    });
  });

  describe('SQL Injection Resistance (#14)', () => {
    it('safely handles SQL injection payloads in login without bypass or error', async () => {
      const payloads = [
        "' OR '1'='1",
        "admin@gitacademy.vn'--",
        "'; DROP TABLE users; --",
        "admin' UNION SELECT 1, 'admin', 'hash' --",
      ];

      for (const payload of payloads) {
        const res = await fetch(`${baseUrl}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: payload,
            password: 'AnyPassword',
          }),
        });

        // Must reject cleanly (400 validation error on email format or 401 unauthorized), never 500
        expect([400, 401]).toContain(res.status);
      }
    });

    it('safely handles SQL injection payloads in class code join', async () => {
      const res = await fetch(`${baseUrl}/api/enrollments/join`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${studentToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: "' OR 1=1; --",
        }),
      });

      expect(res.status).toBe(404);
    });
  });

  describe('Rate Limiting & Brute Force Defense (#15)', () => {
    it('returns 429 Too Many Requests when endpoint is flooded', async () => {
      const responses: Response[] = [];

      // Auth limiter threshold is 15 requests per minute
      for (let i = 0; i < 20; i++) {
        const res = await fetch(`${baseUrl}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Forwarded-For': '198.51.100.42', // isolated client IP
          },
          body: JSON.stringify({
            email: 'wrong@gitacademy.vn',
            password: 'BadPassword',
          }),
        });
        responses.push(res);
      }

      const statusCodes = responses.map((r) => r.status);
      expect(statusCodes).toContain(429);

      const rateLimitedRes = responses.find((r) => r.status === 429);
      expect(rateLimitedRes).toBeDefined();
      const json = await rateLimitedRes!.json();
      expect(json.error).toContain('Too Many Requests');
    });
  });

  describe('Progress & XP Integrity (#16)', () => {
    it('does not duplicate XP or achievements when identical completion events are replayed', async () => {
      const lessonId = '01-version-control-integrity';

      // First completion: awards 50 XP
      const res1 = await fetch(`${baseUrl}/api/progress/complete-lesson`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${studentToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lessonId,
          xpAwarded: 50,
          score: 100,
        }),
      });

      expect(res1.status).toBe(200);
      const json1 = await res1.json();
      expect(json1.xpAwarded).toBe(50);

      // Replayed completion (network retry): MUST award 0 XP
      const res2 = await fetch(`${baseUrl}/api/progress/complete-lesson`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${studentToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lessonId,
          xpAwarded: 50,
          score: 100,
        }),
      });

      expect(res2.status).toBe(200);
      const json2 = await res2.json();
      expect(json2.xpAwarded).toBe(0); // Zero duplicate XP!
    });
  });

  describe('Grade Integrity & Audit Logging (#17)', () => {
    it('creates immutable audit log when teacher overrides student grade', async () => {
      const auditCountBefore = db.auditLogs.length;

      const res = await fetch(`${baseUrl}/api/grades/override`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${teacherToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          classId: testClassId,
          studentId: 'student-xss-audit',
          score: 95,
          reason: 'Hoàn thành bài tập xuất sắc',
        }),
      });

      expect(res.status).toBe(200);
      expect(db.auditLogs.length).toBe(auditCountBefore + 1);

      const latestAudit = db.auditLogs[0];
      expect(latestAudit.action).toBe('grade_override');
      expect(latestAudit.details.score).toBe(95);
      expect(latestAudit.details.reason).toContain('Hoàn thành bài tập xuất sắc');
    });
  });
});
