import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { createServer } from '../../apps/api/src/server.js';
import { sanitizeString, sanitizeUrl } from '../../apps/api/src/middleware/sanitizer.js';

describe('API Input Validation, Sanitization & Defense-in-Depth (#30, #34, #36, #37)', () => {
  let server: Server;
  let baseUrl: string;
  let teacherToken: string;

  beforeAll(async () => {
    server = createServer();
    await new Promise<void>((resolve) => {
      server.listen(0, '127.0.0.1', () => {
        const addr = server.address() as AddressInfo;
        baseUrl = `http://127.0.0.1:${addr.port}`;
        resolve();
      });
    });

    // Obtain teacher token
    const res = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'lan@gitacademy.vn', password: 'Teacher@123' }),
    });
    teacherToken = (await res.json()).token;
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => {
      server.close(() => resolve());
    });
  });

  describe('Sanitization Layer (#37)', () => {
    it('escapes HTML tags from untrusted user strings', () => {
      const xss = '<script>alert("hacked")</script>';
      expect(sanitizeString(xss)).toBe('&lt;script&gt;alert(&quot;hacked&quot;)&lt;/script&gt;');
    });

    it('sanitizes malicious URLs preventing javascript: pseudoprotocol', () => {
      expect(sanitizeUrl('javascript:alert(1)')).toBe('');
      expect(sanitizeUrl('data:text/html,<script>window.location="bad.com"</script>')).toBe('');
      expect(sanitizeUrl('https://github.com/student/git-demo')).toBe('https://github.com/student/git-demo');
      expect(sanitizeUrl('http://git.university.edu.vn/repo')).toBe('http://git.university.edu.vn/repo');
    });

    it('handles non-string types cleanly in sanitizer', () => {
      expect(sanitizeString(null)).toBe('');
      expect(sanitizeString(undefined)).toBe('');
      expect(sanitizeString(12345 as any)).toBe('');
      expect(sanitizeUrl(null)).toBe('');
    });
  });

  describe('Schema Validation Rejections (#30)', () => {
    it('rejects registering with empty display name', async () => {
      const res = await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'valid_email@edu.vn',
          password: 'Password123',
          displayName: ' ', // Whitespace only
        }),
      });

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBe('Validation Error');
    });

    it('rejects creating classroom with name shorter than 3 characters', async () => {
      const res = await fetch(`${baseUrl}/api/classes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${teacherToken}`,
        },
        body: JSON.stringify({ name: 'ab' }),
      });

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBe('Validation Error');
    });

    it('rejects creating assignment with invalid ISO date string', async () => {
      const res = await fetch(`${baseUrl}/api/assignments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${teacherToken}`,
        },
        body: JSON.stringify({
          classId: 'class-git-k48',
          title: 'Bài tập 2',
          description: 'Mô tả bài tập hợp lệ',
          dueAt: 'not-a-valid-date-timestamp',
        }),
      });

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBe('Validation Error');
    });

    it('rejects grade policy update when weights do not sum to 1.0', async () => {
      const res = await fetch(`${baseUrl}/api/grades/classes/class-git-k48/policy`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${teacherToken}`,
        },
        body: JSON.stringify({
          quizWeight: 0.30,
          labsWeight: 0.30,
          challengesWeight: 0.20,
          assignmentsWeight: 0.10, // Sum = 0.90 != 1.0
        }),
      });

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBe('Validation Error');
      expect(json.message).toContain('Tổng trọng số');
    });

    it('rejects joining a class with code shorter than 3 chars', async () => {
      const res = await fetch(`${baseUrl}/api/enrollments/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${teacherToken}`,
        },
        body: JSON.stringify({ code: 'x' }),
      });

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBe('Validation Error');
    });

    it('rejects completing lesson with score > 100', async () => {
      const res = await fetch(`${baseUrl}/api/progress/complete-lesson`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${teacherToken}`,
        },
        body: JSON.stringify({
          lessonId: '01-foundations-01-version-control',
          score: 150, // Invalid score
        }),
      });

      expect(res.status).toBe(400);
    });

    it('rejects grading with score < 0 or > 100', async () => {
      const res = await fetch(
        `${baseUrl}/api/assignments/asg-branching-flow/submissions/student-khang-01/grade`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${teacherToken}`,
          },
          body: JSON.stringify({ score: 105 }),
        }
      );

      expect(res.status).toBe(400);
    });
  });

  describe('Security Headers & CORS Compliance', () => {
    it('sets nosniff and DENY framing security headers on all responses', async () => {
      const res = await fetch(`${baseUrl}/health`);
      expect(res.headers.get('x-content-type-options')).toBe('nosniff');
      expect(res.headers.get('x-frame-options')).toBe('DENY');
    });

    it('responds to OPTIONS preflight with 204 and CORS headers', async () => {
      const res = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'OPTIONS',
      });
      expect(res.status).toBe(204);
      expect(res.headers.get('access-control-allow-methods')).toContain('POST');
    });
  });
});
