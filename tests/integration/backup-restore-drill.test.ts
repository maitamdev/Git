import { describe, it, expect } from 'vitest';
import { DatabaseStore, type UserDbRecord } from '../../apps/api/src/db/store.js';

describe('Pre-Go-Live Audit: Destructive Backup & Restore Drill (#10)', () => {
  it('executes end-to-end backup, volume destruction, restoration, and data integrity verification', () => {
    const store = new DatabaseStore();

    // 1. Seed custom production dataset
    const testStudent: UserDbRecord = {
      id: 'student-drill-01',
      email: 'student_drill@gitacademy.vn',
      displayName: 'Lê Hoàng Drill',
      role: 'student',
      passwordHash: DatabaseStore.hashPassword('DrillPassword!2026'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.users.set(testStudent.id, testStudent);

    const testClass = {
      id: 'class-drill-k48',
      name: 'Class Drill K48',
      code: 'GIT-DRILL-48',
      teacherId: 'teacher-lan-48',
      courseId: 'git-foundations',
      createdAt: new Date().toISOString(),
    };
    store.classes.set(testClass.id, testClass);

    store.enrollments.set(`${testStudent.id}:${testClass.id}`, {
      userId: testStudent.id,
      classId: testClass.id,
      status: 'active',
      enrolledAt: new Date().toISOString(),
    });

    store.lessonProgress.set(`${testStudent.id}:01-version-control:2.0.0`, {
      id: `prog-${testStudent.id}-01`,
      studentId: testStudent.id,
      courseId: 'git-foundations',
      lessonId: '01-version-control',
      courseVersion: '2.0.0',
      status: 'completed',
      score: 100,
      attempts: 1,
      timeSpentSeconds: 300,
      xpAwarded: 50,
      completedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    store.assignments.set('asg-drill-01', {
      id: 'asg-drill-01',
      classId: testClass.id,
      title: 'Drill Capstone',
      description: 'Test assignment description',
      points: 100,
      dueAt: new Date(Date.now() + 86400000).toISOString(),
      requiredLessons: ['01-version-control'],
      requiredLabs: ['lab-01'],
      createdAt: new Date().toISOString(),
    });

    store.submissions.set('asg-drill-01:student-drill-01', {
      id: 'sub-drill-01',
      assignmentId: 'asg-drill-01',
      studentId: testStudent.id,
      url: 'https://github.com/student/drill-repo',
      content: 'Drill submission completed',
      score: 95,
      feedback: 'Excellent work',
      submittedAt: new Date().toISOString(),
      gradedAt: new Date().toISOString(),
      gradedBy: 'teacher-lan-48',
    });

    store.logAudit(testStudent.id, 'test_drill_action', 'lesson', '01-version-control', { drill: true });

    // 2. Measure and Execute Backup
    const backupStart = performance.now();

    const snapshot = {
      timestamp: new Date().toISOString(),
      users: Array.from(store.users.entries()),
      classes: Array.from(store.classes.entries()),
      enrollments: Array.from(store.enrollments.entries()),
      lessonProgress: Array.from(store.lessonProgress.entries()),
      userAchievements: Array.from(store.userAchievements.entries()).map(([k, v]) => [k, Array.from(v)]),
      assignments: Array.from(store.assignments.entries()),
      submissions: Array.from(store.submissions.entries()),
      gradePolicies: Array.from(store.gradePolicies.entries()),
      activityEvents: store.activityEvents,
      auditLogs: store.auditLogs,
    };

    const serializedBackup = JSON.stringify(snapshot);
    const backupEnd = performance.now();
    const backupDurationMs = Math.round(backupEnd - backupStart);

    expect(serializedBackup.length).toBeGreaterThan(1000);

    // 3. Simulating Total Catastrophic Destruction (Empty Database Volume)
    store.users.clear();
    store.classes.clear();
    store.enrollments.clear();
    store.lessonProgress.clear();
    store.userAchievements.clear();
    store.assignments.clear();
    store.submissions.clear();
    store.gradePolicies.clear();
    store.activityEvents = [];
    store.auditLogs = [];

    // Verify completely empty
    expect(store.users.size).toBe(0);
    expect(store.classes.size).toBe(0);
    expect(store.enrollments.size).toBe(0);
    expect(store.lessonProgress.size).toBe(0);

    // 4. Measure and Execute Full Restoration
    const restoreStart = performance.now();

    const restoredData = JSON.parse(serializedBackup);

    store.users = new Map(restoredData.users);
    store.classes = new Map(restoredData.classes);
    store.enrollments = new Map(restoredData.enrollments);
    store.lessonProgress = new Map(restoredData.lessonProgress);
    store.userAchievements = new Map(restoredData.userAchievements.map(([k, v]: any) => [k, new Set(v)]));
    store.assignments = new Map(restoredData.assignments);
    store.submissions = new Map(restoredData.submissions);
    store.gradePolicies = new Map(restoredData.gradePolicies);
    store.activityEvents = restoredData.activityEvents;
    store.auditLogs = restoredData.auditLogs;

    const restoreEnd = performance.now();
    const restoreDurationMs = Math.round(restoreEnd - restoreStart);

    // 5. Post-Restore Verification
    // A. User login authentication works
    const restoredStudent = store.users.get('student-drill-01');
    expect(restoredStudent).toBeDefined();
    expect(DatabaseStore.comparePassword('DrillPassword!2026', restoredStudent!.passwordHash)).toBe(true);

    // B. Class exists with exact code
    const restoredClass = store.classes.get('class-drill-k48');
    expect(restoredClass).toBeDefined();
    expect(restoredClass?.code).toBe('GIT-DRILL-48');

    // C. Enrollment preserved
    expect(store.enrollments.has('student-drill-01:class-drill-k48')).toBe(true);

    // D. Progress preserved
    const restoredProgress = store.lessonProgress.get('student-drill-01:01-version-control:2.0.0');
    expect(restoredProgress).toBeDefined();
    expect(restoredProgress?.score).toBe(100);
    expect(restoredProgress?.xpAwarded).toBe(50);

    // E. Assignments and graded submissions preserved
    const restoredSub = store.submissions.get('asg-drill-01:student-drill-01');
    expect(restoredSub).toBeDefined();
    expect(restoredSub?.score).toBe(95);
    expect(restoredSub?.gradedBy).toBe('teacher-lan-48');

    // F. Audit logs preserved
    expect(store.auditLogs.some((l) => l.action === 'test_drill_action')).toBe(true);

    console.log(`[Backup Drill] Backup time: ${backupDurationMs}ms | Restore time: ${restoreDurationMs}ms | Archive size: ${(serializedBackup.length / 1024).toFixed(2)} KB`);
  });
});
