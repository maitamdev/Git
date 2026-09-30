import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { createServer } from '../../apps/api/src/server.js';
import { db, DatabaseStore, type UserDbRecord } from '../../apps/api/src/db/store.js';
import { signJwt } from '../../apps/api/src/utils/jwt.js';

describe('Pre-Go-Live Audit: RBAC Attack Suite (#6)', () => {
  let server: Server;
  let baseUrl: string;

  // Actors
  let studentAToken: string;
  let studentBToken: string;
  let teacherAToken: string;
  let teacherBToken: string;
  let adminToken: string;

  let classAId: string;
  let classBId: string;

  beforeAll(async () => {
    server = createServer();
    await new Promise<void>((resolve) => {
      server.listen(0, '127.0.0.1', () => {
        const addr = server.address() as AddressInfo;
        baseUrl = `http://127.0.0.1:${addr.port}`;
        resolve();
      });
    });

    // Seed test users
    const studentA: UserDbRecord = {
      id: 'student-attacker-a',
      email: 'student_a@gitacademy.vn',
      displayName: 'Student Attacker A',
      role: 'student',
      passwordHash: DatabaseStore.hashPassword('Pass@123'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.users.set(studentA.id, studentA);
    studentAToken = signJwt({ sub: studentA.id, role: 'student', email: studentA.email }, 3600);

    const studentB: UserDbRecord = {
      id: 'student-victim-b',
      email: 'student_b@gitacademy.vn',
      displayName: 'Student Victim B',
      role: 'student',
      passwordHash: DatabaseStore.hashPassword('Pass@123'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.users.set(studentB.id, studentB);
    studentBToken = signJwt({ sub: studentB.id, role: 'student', email: studentB.email }, 3600);

    const teacherA: UserDbRecord = {
      id: 'teacher-owner-a',
      email: 'teacher_a@gitacademy.vn',
      displayName: 'Teacher Owner A',
      role: 'teacher',
      passwordHash: DatabaseStore.hashPassword('Pass@123'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.users.set(teacherA.id, teacherA);
    teacherAToken = signJwt({ sub: teacherA.id, role: 'teacher', email: teacherA.email }, 3600);

    const teacherB: UserDbRecord = {
      id: 'teacher-intruder-b',
      email: 'teacher_b@gitacademy.vn',
      displayName: 'Teacher Intruder B',
      role: 'teacher',
      passwordHash: DatabaseStore.hashPassword('Pass@123'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.users.set(teacherB.id, teacherB);
    teacherBToken = signJwt({ sub: teacherB.id, role: 'teacher', email: teacherB.email }, 3600);

    const adminUser: UserDbRecord = {
      id: 'admin-superuser-root',
      email: 'admin_root@gitacademy.vn',
      displayName: 'Super Admin',
      role: 'admin',
      passwordHash: DatabaseStore.hashPassword('Pass@123'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.users.set(adminUser.id, adminUser);
    adminToken = signJwt({ sub: adminUser.id, role: 'admin', email: adminUser.email }, 3600);

    // Setup classes
    classAId = 'class-alpha-owner-a';
    db.classes.set(classAId, {
      id: classAId,
      name: 'Class Alpha (Teacher A)',
      code: 'GIT-ALPHA-A',
      teacherId: teacherA.id,
      courseId: 'git-foundations',
      createdAt: new Date().toISOString(),
    });

    classBId = 'class-beta-owner-b';
    db.classes.set(classBId, {
      id: classBId,
      name: 'Class Beta (Teacher B)',
      code: 'GIT-BETA-B',
      teacherId: teacherB.id,
      courseId: 'git-foundations',
      createdAt: new Date().toISOString(),
    });

    // Enroll student A in class A
    db.enrollments.set(`${studentA.id}:${classAId}`, {
      userId: studentA.id,
      classId: classAId,
      status: 'active',
      enrolledAt: new Date().toISOString(),
    });

    // Enroll student B in class B
    db.enrollments.set(`${studentB.id}:${classBId}`, {
      userId: studentB.id,
      classId: classBId,
      status: 'active',
      enrolledAt: new Date().toISOString(),
    });
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => {
      server.close(() => resolve());
    });
  });

  describe('Student Privilege Escalation Attacks', () => {
    it('ATTACK 1: Student tries GET /api/teacher/* -> 403 Forbidden', async () => {
      const res = await fetch(`${baseUrl}/api/teacher/classes`, {
        headers: { Authorization: `Bearer ${studentAToken}` },
      });
      expect(res.status).toBe(403);
    });

    it('ATTACK 2: Student tries POST /api/classes -> 403 Forbidden', async () => {
      const res = await fetch(`${baseUrl}/api/classes`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${studentAToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'Hacked Class', code: 'GIT-HACK' }),
      });
      expect(res.status).toBe(403);
    });

    it('ATTACK 3: Student tries POST /api/grades/override -> 403 Forbidden', async () => {
      const res = await fetch(`${baseUrl}/api/grades/override`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${studentAToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          classId: classAId,
          studentId: studentAToken,
          score: 100,
          reason: 'Self awarded 100',
        }),
      });
      expect(res.status).toBe(403);
    });

    it('ATTACK 4: Student tries GET /api/audit -> 403 Forbidden', async () => {
      const res = await fetch(`${baseUrl}/api/audit`, {
        headers: { Authorization: `Bearer ${studentAToken}` },
      });
      expect(res.status).toBe(403);
    });
  });

  describe('Cross-Teacher Data Access Attacks', () => {
    it('ATTACK 5: Teacher B tries to access Class A roster -> 403 Forbidden', async () => {
      const res = await fetch(`${baseUrl}/api/classes/${classAId}/roster`, {
        headers: { Authorization: `Bearer ${teacherBToken}` },
      });
      expect(res.status).toBe(403);
      const json = await res.json();
      expect(json.message).toContain('không có quyền truy cập');
    });

    it('ATTACK 6: Teacher B tries to modify Class A grade policy -> 403 Forbidden', async () => {
      const res = await fetch(`${baseUrl}/api/grades/classes/${classAId}/policy`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${teacherBToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quizWeight: 0.25,
          labsWeight: 0.3,
          challengesWeight: 0.2,
          assignmentsWeight: 0.25,
          passThreshold: 60,
        }),
      });
      expect(res.status).toBe(403);
    });

    it('ATTACK 7: Teacher B tries to override student grades in Class A -> 403 Forbidden', async () => {
      const res = await fetch(`${baseUrl}/api/grades/override`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${teacherBToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          classId: classAId,
          studentId: 'student-attacker-a',
          score: 10,
          reason: 'Malicious grade drop',
        }),
      });
      expect(res.status).toBe(403);
    });
  });

  describe('Student-to-Student Isolation Attacks', () => {
    it('ATTACK 8: Student A tries to view Student B details via /api/progress/students/:id -> 403 Forbidden', async () => {
      const res = await fetch(`${baseUrl}/api/progress/students/student-victim-b`, {
        headers: { Authorization: `Bearer ${studentAToken}` },
      });
      expect(res.status).toBe(403);
    });
  });

  describe('Admin Full Governance Verification', () => {
    it('Admin can view audit logs -> 200 OK', async () => {
      const res = await fetch(`${baseUrl}/api/audit`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(Array.isArray(json.auditLogs)).toBe(true);
    });

    it('Admin can view any class roster -> 200 OK', async () => {
      const res = await fetch(`${baseUrl}/api/classes/${classAId}/roster`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(Array.isArray(json.students)).toBe(true);
    });
  });
});
