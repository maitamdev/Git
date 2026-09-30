import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { createServer } from '../../apps/api/src/server.js';
import { db } from '../../apps/api/src/db/store.js';

describe('LMS API & RBAC Integration Test Suites', () => {
  let server: Server;
  let baseUrl: string;

  beforeAll(async () => {
    server = createServer();
    await new Promise<void>((resolve) => {
      server.listen(0, '127.0.0.1', () => {
        const addr = server.address() as AddressInfo;
        baseUrl = `http://127.0.0.1:${addr.port}`;
        resolve();
      });
    });
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => {
      server.close(() => resolve());
    });
  });

  describe('System Health Probes', () => {
    it('returns 200 OK for /health', async () => {
      const res = await fetch(`${baseUrl}/health`);
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.status).toBe('ok');
      expect(json.service).toBe('git-academy-api');
    });

    it('returns 200 OK and connected database status for /ready', async () => {
      const res = await fetch(`${baseUrl}/ready`);
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.ready).toBe(true);
      expect(json.database).toBe('connected');
    });
  });

  describe('Full End-to-End Acceptance Flow (#51 & #61)', () => {
    let teacherToken: string;
    let studentToken: string;
    let createdClassId: string;
    let createdClassCode: string;
    let createdAssignmentId: string;

    it('Step 1: Teacher logs in and obtains bearer session token', async () => {
      const res = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'lan@gitacademy.vn',
          password: 'Teacher@123',
        }),
      });

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.token).toBeDefined();
      expect(data.user.role).toBe('teacher');
      teacherToken = data.token;
    });

    it('Step 2: Teacher creates a new class and generates a class code', async () => {
      const res = await fetch(`${baseUrl}/api/classes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${teacherToken}`,
        },
        body: JSON.stringify({
          name: 'Git Thực Chiến — Khoa CNTT K48 Nhóm 2',
          courseId: 'git-foundations',
        }),
      });

      expect(res.status).toBe(201);
      const data = await res.json();
      expect(data.classroom.id).toBeDefined();
      expect(data.classroom.code).toMatch(/^GIT-/);
      createdClassId = data.classroom.id;
      createdClassCode = data.classroom.code;
    });

    it('Step 3: Student registers and logs in', async () => {
      const studentEmail = `student_${Date.now()}@gitacademy.vn`;
      const registerRes = await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: studentEmail,
          password: 'Password@123',
          displayName: 'Đặng Tuấn Anh',
          role: 'student',
        }),
      });

      expect(registerRes.status).toBe(201);
      const data = await registerRes.json();
      expect(data.token).toBeDefined();
      expect(data.user.role).toBe('student');
      studentToken = data.token;
    });

    it('Step 4: Student joins the class using the teacher generated code', async () => {
      const res = await fetch(`${baseUrl}/api/enrollments/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${studentToken}`,
        },
        body: JSON.stringify({ code: createdClassCode }),
      });

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.enrollment.classId).toBe(createdClassId);
      expect(data.enrollment.status).toBe('active');
    });

    it('Step 5: Student completes Git lesson and progress is saved', async () => {
      const res = await fetch(`${baseUrl}/api/progress/complete-lesson`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${studentToken}`,
        },
        body: JSON.stringify({
          lessonId: '01-foundations-01-version-control',
          courseVersion: '2.0.0',
          score: 100,
          timeSpentSeconds: 300,
          xpAwarded: 50,
        }),
      });

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.progress.status).toBe('completed');
      expect(data.xpAwarded).toBe(50);
    });

    it('Step 6: Teacher views class roster and sees enrolled student with progress', async () => {
      const res = await fetch(`${baseUrl}/api/classes/${createdClassId}/roster`, {
        headers: { Authorization: `Bearer ${teacherToken}` },
      });

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.totalStudents).toBe(1);
      expect(data.students[0].displayName).toBe('Đặng Tuấn Anh');
      expect(data.students[0].completedLessons).toBe(1);
    });

    it('Step 7: Teacher creates an assignment with deadline', async () => {
      const res = await fetch(`${baseUrl}/api/assignments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${teacherToken}`,
        },
        body: JSON.stringify({
          classId: createdClassId,
          title: 'Bài tập Git 01: Branching & Merge Conflict',
          description: 'Thực hành tạo 2 nhánh xung đột và tự giải quyết conflict.',
          dueAt: new Date(Date.now() + 86400000 * 5).toISOString(),
          points: 100,
        }),
      });

      expect(res.status).toBe(201);
      const data = await res.json();
      expect(data.assignment.title).toContain('Bài tập Git 01: Branching');
      createdAssignmentId = data.assignment.id;
    });

    it('Step 8: Student submits assignment with GitHub repository URL', async () => {
      const res = await fetch(`${baseUrl}/api/assignments/${createdAssignmentId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${studentToken}`,
        },
        body: JSON.stringify({
          content: 'Em đã nộp bài tập conflict giải quyết tại commit 4a9f12b.',
          url: 'https://github.com/tuananh/git-conflict-assignment',
        }),
      });

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.submission.assignmentId).toBe(createdAssignmentId);
    });

    it('Step 9: Teacher grades assignment and provides feedback', async () => {
      // Get student id from student me
      const meRes = await fetch(`${baseUrl}/api/auth/me`, {
        headers: { Authorization: `Bearer ${studentToken}` },
      });
      const meData = await meRes.json();
      const studentId = meData.user.id;

      const res = await fetch(
        `${baseUrl}/api/assignments/${createdAssignmentId}/submissions/${studentId}/grade`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${teacherToken}`,
          },
          body: JSON.stringify({
            score: 95,
            feedback: 'Rất tốt! Nhớ bổ sung thêm file README mô tả các bước merge.',
          }),
        }
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.submission.score).toBe(95);
      expect(data.submission.feedback).toContain('Rất tốt');
    });

    it('Step 10: Student retrieves assignments and sees score and feedback', async () => {
      const res = await fetch(`${baseUrl}/api/assignments?classId=${createdClassId}`, {
        headers: { Authorization: `Bearer ${studentToken}` },
      });

      expect(res.status).toBe(200);
      const data = await res.json();
      const asg = data.assignments.find((a: any) => a.id === createdAssignmentId);
      expect(asg).toBeDefined();
      expect(asg.mySubmission.score).toBe(95);
      expect(asg.mySubmission.feedback).toContain('Rất tốt');
      expect(asg.deadlineInfo.state).toBe('graded');
    });
  });

  describe('Security & Authorization Boundary Tests (#52)', () => {
    let studentToken: string;
    let teacherLanToken: string;
    let otherTeacherToken: string;
    let adminToken: string;

    beforeAll(async () => {
      // Login Khang (student)
      const resStudent = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'khang@gitacademy.vn', password: 'Student@123' }),
      });
      studentToken = (await resStudent.json()).token;

      // Login Teacher Lan
      const resLan = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'lan@gitacademy.vn', password: 'Teacher@123' }),
      });
      teacherLanToken = (await resLan.json()).token;

      // Register & Login Other Teacher
      const resOther = await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'teacher.hoang@gitacademy.vn',
          password: 'Teacher@123',
          displayName: 'Thầy Hoàng',
          role: 'teacher',
        }),
      });
      otherTeacherToken = (await resOther.json()).token;

      // Login Admin
      const resAdmin = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@gitacademy.vn', password: 'Admin@123' }),
      });
      adminToken = (await resAdmin.json()).token;
    });

    it('rejects student attempting to create classroom with 403 Forbidden', async () => {
      const res = await fetch(`${baseUrl}/api/classes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${studentToken}`,
        },
        body: JSON.stringify({ name: 'Hacked Class by Student' }),
      });

      expect(res.status).toBe(403);
    });

    it('rejects student attempting to view class roster with 403 Forbidden', async () => {
      const res = await fetch(`${baseUrl}/api/classes/class-git-k48/roster`, {
        headers: { Authorization: `Bearer ${studentToken}` },
      });

      expect(res.status).toBe(403);
    });

    it('rejects teacher attempting to access roster of another teacher class with 403 Forbidden', async () => {
      // Class class-git-k48 belongs to Teacher Lan. Teacher Hoang should be forbidden!
      const res = await fetch(`${baseUrl}/api/classes/class-git-k48/roster`, {
        headers: { Authorization: `Bearer ${otherTeacherToken}` },
      });

      expect(res.status).toBe(403);
      const json = await res.json();
      expect(json.message).toContain('không có quyền truy cập');
    });

    it('rejects student attempting to access admin user management with 403 Forbidden', async () => {
      const res = await fetch(`${baseUrl}/api/users`, {
        headers: { Authorization: `Bearer ${studentToken}` },
      });

      expect(res.status).toBe(403);
    });

    it('allows admin to view users and change role', async () => {
      const res = await fetch(`${baseUrl}/api/users`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(Array.isArray(json.users)).toBe(true);
      expect(json.users.length).toBeGreaterThan(0);
    });

    it('rejects unauthenticated requests to protected endpoints with 401 Unauthorized', async () => {
      const res = await fetch(`${baseUrl}/api/auth/me`);
      expect(res.status).toBe(401);
    });
  });

  describe('API Schema Validation with Zod (#30)', () => {
    it('rejects invalid email format during login with 400 Bad Request', async () => {
      const res = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'not-an-email', password: '123' }),
      });

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBe('Validation Error');
    });

    it('rejects registration with short password (< 6 chars) with 400 Bad Request', async () => {
      const res = await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'valid@edu.vn',
          password: '123',
          displayName: 'Test',
        }),
      });

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBe('Validation Error');
    });
  });
});
