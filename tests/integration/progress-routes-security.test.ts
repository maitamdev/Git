import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { createServer } from '../../apps/api/src/server.js';

describe('Progress route authentication and account isolation', () => {
  let server: Server;
  let baseUrl: string;
  let studentToken: string;
  let studentId: string;
  let otherStudentId: string;

  beforeAll(async () => {
    server = createServer();
    await new Promise<void>((resolve) => {
      server.listen(0, '127.0.0.1', () => {
        const address = server.address() as AddressInfo;
        baseUrl = `http://127.0.0.1:${address.port}`;
        resolve();
      });
    });

    const loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'khang@gitacademy.vn', password: 'Student@123' }),
    });
    const login = await loginResponse.json();
    studentToken = login.token;
    studentId = login.user.id;
    otherStudentId = 'student-nam-02';
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });

  it('requires authentication for the legacy progress GET alias even with a userId query', async () => {
    const response = await fetch(`${baseUrl}/api/progress?userId=${otherStudentId}`);
    expect(response.status).toBe(401);
  });

  it('requires authentication before writing a lesson or flushing a batch', async () => {
    const lessonResponse = await fetch(`${baseUrl}/api/progress/lesson`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: otherStudentId,
        progress: { lessonId: 'unauthorized-lesson', completed: true, xp: 5000 },
      }),
    });
    const batchResponse = await fetch(`${baseUrl}/api/progress/sync-batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: otherStudentId,
        lessons: [{ lessonId: 'unauthorized-batch-lesson', completed: true, xp: 5000 }],
      }),
    });

    expect(lessonResponse.status).toBe(401);
    expect(batchResponse.status).toBe(401);
  });

  it('does not let an authenticated learner read another account through the query string', async () => {
    const response = await fetch(`${baseUrl}/api/progress?userId=${otherStudentId}`, {
      headers: { Authorization: `Bearer ${studentToken}` },
    });
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.progress.userId).toBe(studentId);
  });

  it('rejects attempts to write lesson or batch progress for another account', async () => {
    const lessonResponse = await fetch(`${baseUrl}/api/progress/lesson`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${studentToken}` },
      body: JSON.stringify({
        userId: otherStudentId,
        progress: { lessonId: 'forged-lesson', completed: true, xp: 5000 },
      }),
    });
    const batchResponse = await fetch(`${baseUrl}/api/progress/sync-batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${studentToken}` },
      body: JSON.stringify({
        userId: otherStudentId,
        lessons: [{ lessonId: 'forged-batch-lesson', completed: true, xp: 5000 }],
      }),
    });

    expect(lessonResponse.status).toBe(403);
    expect(batchResponse.status).toBe(403);
  });

  it('scopes accepted lesson saves to the authenticated account', async () => {
    const response = await fetch(`${baseUrl}/api/progress/lesson`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${studentToken}` },
      body: JSON.stringify({
        progress: { lessonId: 'authenticated-progress-route-test', completed: true, xp: 50 },
      }),
    });
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.record.studentId).toBe(studentId);
  });
});
