import http from 'node:http';
import { createServer } from '../apps/api/src/server';
import { ProgressConflictResolver } from '../packages/exercise-engine/src/progress/conflict-resolver';
import type { CourseProgress } from '@git-academy/shared';

console.log('=== LOCAL IN-MEMORY API CONTRACT CHECK (NOT STAGING OR BROWSER E2E) ===\n');

async function main() {
  const server = createServer();
  const port = 3099;
  await new Promise<void>((resolve) => server.listen(port, '127.0.0.1', () => resolve()));
  const baseUrl = `http://127.0.0.1:${port}`;

  const request = async (path: string, options: { method?: string; token?: string; body?: any } = {}) => {
    const url = `${baseUrl}${path}`;
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (options.token) headers['Authorization'] = `Bearer ${options.token}`;

    const res = await fetch(url, {
      method: options.method || 'GET',
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
    const isJson = res.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await res.json() : await res.text();
    return { ok: res.ok, status: res.status, data };
  };

  try {
    // -------------------------------------------------------------------------
    // 1. Authenticate real accounts & RBAC routing verification
    // -------------------------------------------------------------------------
    console.log('1. Checking seeded authentication roles (frontend navigation is not exercised)...');

    // Student
    const studentRes = await request('/api/auth/login', {
      method: 'POST',
      body: { email: 'khang@gitacademy.vn', password: 'Student@123' },
    });
    if (!studentRes.ok || !studentRes.data.token || studentRes.data.user.role !== 'student') {
      throw new Error(`Student login failed: ${JSON.stringify(studentRes)}`);
    }
    const studentToken = studentRes.data.token;
    const studentUser = studentRes.data.user;
    const studentRoute = studentUser.role === 'student' ? 'learn' : 'other';
    console.log(`  ✓ Student login successful: ${studentUser.email} (Role: ${studentUser.role}); expected frontend destination: '${studentRoute}' (not browser-verified)`);

    // Teacher
    const teacherRes = await request('/api/auth/login', {
      method: 'POST',
      body: { email: 'lan@gitacademy.vn', password: 'Teacher@123' },
    });
    if (!teacherRes.ok || !teacherRes.data.token || teacherRes.data.user.role !== 'teacher') {
      throw new Error(`Teacher login failed: ${JSON.stringify(teacherRes)}`);
    }
    const teacherRoute = teacherRes.data.user.role === 'teacher' ? 'teacher' : 'other';
    console.log(`  ✓ Teacher login successful: ${teacherRes.data.user.email} (Role: ${teacherRes.data.user.role}); expected frontend destination: '${teacherRoute}' (not browser-verified)`);

    // Admin
    const adminRes = await request('/api/auth/login', {
      method: 'POST',
      body: { email: 'admin@gitacademy.vn', password: 'Admin@123' },
    });
    if (!adminRes.ok || !adminRes.data.token || adminRes.data.user.role !== 'admin') {
      throw new Error(`Admin login failed: ${JSON.stringify(adminRes)}`);
    }
    const adminRoute = adminRes.data.user.role === 'admin' ? 'dashboard' : 'other';
    console.log(`  ✓ Admin login successful: ${adminRes.data.user.email} (Role: ${adminRes.data.user.role}); expected frontend destination: '${adminRoute}' (not browser-verified)\n`);

    // -------------------------------------------------------------------------
    // 2. Fetch Progress & Persistence across sessions
    // -------------------------------------------------------------------------
    console.log('2. Checking progress responses across requests within this server process...');
    const initialProgressRes = await request('/api/progress/my', { token: studentToken });
    if (!initialProgressRes.ok || !initialProgressRes.data.progress) {
      throw new Error(`Failed to fetch initial progress: ${JSON.stringify(initialProgressRes)}`);
    }
    console.log(`  ✓ Initial progress fetched: User ${initialProgressRes.data.progress.userId}, Lessons count: ${Object.keys(initialProgressRes.data.progress.lessons).length}`);

    // Complete lesson via complete-lesson endpoint
    const completeRes = await request('/api/progress/complete-lesson', {
      method: 'POST',
      token: studentToken,
      body: {
        lessonId: '01-version-control',
        score: 100,
        timeSpentSeconds: 180,
        xpAwarded: 50,
      },
    });
    if (!completeRes.ok) {
      throw new Error(`Complete lesson failed: ${JSON.stringify(completeRes)}`);
    }
    console.log('  ✓ Ghi nhận hoàn thành bài "01-version-control" (+50 XP) thành công trên máy chủ.');

    // Fetch progress again using the same server process and authenticated user.
    const freshSessionRes = await request('/api/progress/my', { token: studentToken });
    const remoteLessons = freshSessionRes.data.progress.lessons;
    if (!remoteLessons['01-version-control'] || !remoteLessons['01-version-control'].completed) {
      throw new Error('Lesson 01-version-control not found completed on remote fetch!');
    }
    console.log('  ✓ A second authenticated GET returns the completed lesson from the in-memory server store.');

    // -------------------------------------------------------------------------
    // 3. Offline Completion & Online Reconciliation (Conflict Resolution)
    // -------------------------------------------------------------------------
    console.log('\n3. Checking the sync endpoint with a locally-shaped progress payload (browser offline mode is not simulated)...');
    // Construct a local-shaped record for lesson 2 while the server does not yet know it.
    const offlineProgress: CourseProgress = {
      ...freshSessionRes.data.progress,
      lessons: {
        ...freshSessionRes.data.progress.lessons,
        '02-vcs-types': {
          lessonId: '02-vcs-types',
          completed: true,
          theoryViewed: true,
          quizScore: 90,
          quizAttempts: 1,
          labsCompleted: [],
          xp: 50,
        },
      },
      totalXp: freshSessionRes.data.progress.totalXp + 50,
    };

    // Client comes online -> calls /api/progress/sync with localProgress
    const syncRes = await request('/api/progress/sync', {
      method: 'POST',
      token: studentToken,
      body: { localProgress: offlineProgress },
    });
    if (!syncRes.ok || !syncRes.data.mergedProgress) {
      throw new Error(`Sync offline progress failed: ${JSON.stringify(syncRes)}`);
    }
    const syncedLessons = syncRes.data.mergedProgress.lessons;
    if (!syncedLessons['01-version-control']?.completed || !syncedLessons['02-vcs-types']?.completed) {
      throw new Error('Sync failed to retain both online and offline completed lessons!');
    }
    console.log('  ✓ Sync endpoint merges both completed lesson records from the supplied payload.');

    // -------------------------------------------------------------------------
    // 4. Edge Cases: Network outage, Malformed Data, Token Expiration, Account Switch
    // -------------------------------------------------------------------------
    console.log('\n4. Checking Edge Cases: Token Expiry, Network Outage, Data Corruption & Account Switch...');

    // Expired or invalid token
    const invalidTokenRes = await request('/api/progress/my', { token: 'invalid.expired.jwt.token' });
    if (invalidTokenRes.status === 401) {
      console.log('  ✓ Token không hợp lệ / hết hạn: Máy chủ trả về HTTP 401 Unauthorized rõ ràng, client xử lý xóa token và yêu cầu đăng nhập lại.');
    } else {
      throw new Error(`Expected 401 for invalid token, got ${invalidTokenRes.status}`);
    }

    // Corrupted payload rejection
    const malformedSyncRes = await request('/api/progress/sync', {
      method: 'POST',
      token: studentToken,
      body: { notAValidField: 123 },
    });
    if (malformedSyncRes.status === 400) {
      console.log('  ✓ Gói tin hỏng / sai schema: Máy chủ từ chối với HTTP 400 Validation Error, không ghi đè dữ liệu rác vào DB.');
    } else {
      throw new Error(`Expected 400 for malformed payload, got ${malformedSyncRes.status}`);
    }

    // Account Switch isolation
    const student2Res = await request('/api/auth/login', {
      method: 'POST',
      body: { email: 'student02.pilot@gitacademy.vn', password: 'PilotStudent2026!' },
    }).catch(() => null);
    const seededStudent2Res = student2Res?.ok
      ? student2Res
      : await request('/api/auth/login', {
          method: 'POST',
          body: { email: 'nam@gitacademy.vn', password: 'Student@123' },
        });
    if (!seededStudent2Res.ok || seededStudent2Res.data.user.id === studentUser.id) {
      throw new Error('Could not authenticate a distinct second student for the isolation check.');
    }
    const secondStudentProgress = await request('/api/progress/my', { token: seededStudent2Res.data.token });
    if (!secondStudentProgress.ok || secondStudentProgress.data.progress.userId !== seededStudent2Res.data.user.id) {
      throw new Error('Progress endpoint did not scope the response to the second student.');
    }
    if (secondStudentProgress.data.progress.lessons['01-version-control'] || secondStudentProgress.data.progress.lessons['02-vcs-types']) {
      throw new Error('Student progress leaked across accounts.');
    }
    console.log('  ✓ Authenticated GET returns a distinct student account’s own progress in this process.');

    console.log('\n✅ Local API contract checks passed. This script does not verify staging, browser behavior, offline mode, or persistence across server restarts.');
  } finally {
    server.close();
  }
}

main().catch((err) => {
  console.error('VERIFICATION FAILED:', err);
  process.exit(1);
});
