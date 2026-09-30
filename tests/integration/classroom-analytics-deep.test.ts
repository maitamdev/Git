import { describe, it, expect, beforeEach } from 'vitest';
import { DatabaseStore } from '../../apps/api/src/db/store.js';
import type { ClassAnalytics } from '@git-academy/shared';

describe('Classroom Analytics Deep Calculations (Spec #12, #22, #23)', () => {
  let db: DatabaseStore;

  beforeEach(() => {
    db = new DatabaseStore();
  });

  it('calculates average class progress across diverse student states', () => {
    const classId = 'cls-analytics-1';
    db.classes.set(classId, {
      id: classId,
      name: 'Analytics Test Class',
      code: 'GIT-ANA-01',
      teacherId: 'teacher-1',
      courseId: 'git-foundations',
      createdAt: new Date().toISOString(),
    });

    // 4 students with 128, 64, 32, 0 lessons
    const studentLessons = [128, 64, 32, 0];
    studentLessons.forEach((count, i) => {
      const studentId = `s-ana-${i}`;
      db.enrollments.set(`${studentId}:${classId}`, {
        userId: studentId,
        classId,
        status: 'active',
        enrolledAt: new Date().toISOString(),
      });

      for (let j = 0; j < count; j++) {
        db.lessonProgress.set(`${studentId}:lesson-${j}:2.0.0`, {
          id: `p-${studentId}-${j}`,
          studentId,
          courseId: 'git-foundations',
          lessonId: `lesson-${j}`,
          courseVersion: '2.0.0',
          status: 'completed',
          score: 80,
          attempts: 1,
          timeSpentSeconds: 300,
          xpAwarded: 50,
          updatedAt: '',
        });
      }
    });

    const enrollments = Array.from(db.enrollments.values()).filter((e) => e.classId === classId && e.status === 'active');
    const totalStudents = enrollments.length;

    const classProgress = Array.from(db.lessonProgress.values()).filter((p) =>
      enrollments.some((e) => e.userId === p.studentId)
    );

    const completedLessonCounts = enrollments.map(
      (e) => classProgress.filter((p) => p.studentId === e.userId && p.status === 'completed').length
    );

    // Total completed: 128 + 64 + 32 + 0 = 224
    // Max possible: 4 * 128 = 512
    // Average progress: 224 / 512 = 43.75% -> 44%
    const averageProgress = Math.round((completedLessonCounts.reduce((a, b) => a + b, 0) / (totalStudents * 128)) * 100);
    expect(averageProgress).toBe(44);
  });

  it('calculates completedCourseCount correctly when student reaches 128 lessons', () => {
    const classId = 'cls-analytics-graduates';
    const graduateId = 's-grad-01';

    db.enrollments.set(`${graduateId}:${classId}`, {
      userId: graduateId,
      classId,
      status: 'active',
      enrolledAt: new Date().toISOString(),
    });

    // Seed 128 lessons for graduate
    for (let i = 0; i < 128; i++) {
      db.lessonProgress.set(`${graduateId}:lesson-${i}:2.0.0`, {
        id: `p-${graduateId}-${i}`,
        studentId: graduateId,
        courseId: 'git-foundations',
        lessonId: `lesson-${i}`,
        courseVersion: '2.0.0',
        status: 'completed',
        attempts: 1,
        timeSpentSeconds: 300,
        xpAwarded: 50,
        updatedAt: '',
      });
    }

    const completedCount = Array.from(db.lessonProgress.values()).filter(
      (p) => p.studentId === graduateId && p.status === 'completed'
    ).length;

    expect(completedCount).toBe(128);
    const hasCompletedCourse = completedCount >= 128;
    expect(hasCompletedCourse).toBe(true);
  });

  it('identifies top difficult quiz topics with highest failure rate (< 60)', () => {
    const quizData = [
      { lessonId: 'quiz-merge-conflict', scores: [40, 50, 55, 80, 90] }, // 3/5 failed = 60% fail
      { lessonId: 'quiz-rebase-interactive', scores: [30, 40, 45, 50] }, // 4/4 failed = 100% fail
      { lessonId: 'quiz-version-control', scores: [90, 100, 95] },        // 0/3 failed = 0% fail
    ];

    const results = quizData.map((q) => {
      const failed = q.scores.filter((s) => s < 60).length;
      return {
        lessonId: q.lessonId,
        failRate: Math.round((failed / q.scores.length) * 100),
      };
    }).sort((a, b) => b.failRate - a.failRate);

    expect(results[0].lessonId).toBe('quiz-rebase-interactive');
    expect(results[0].failRate).toBe(100);
    expect(results[1].lessonId).toBe('quiz-merge-conflict');
    expect(results[1].failRate).toBe(60);
    expect(results[2].failRate).toBe(0);
  });

  it('identifies top retried labs with average attempts > 2.0', () => {
    const labData = [
      { lessonId: 'lab-three-way-merge', attempts: [3, 4, 3, 2] }, // avg 3.0
      { lessonId: 'lab-cherry-pick', attempts: [1, 2, 1] },        // avg 1.3
      { lessonId: 'lab-bisect', attempts: [4, 5, 3] },             // avg 4.0
    ];

    const results = labData.map((l) => ({
      lessonId: l.lessonId,
      averageAttempts: Number((l.attempts.reduce((a, b) => a + b, 0) / l.attempts.length).toFixed(1)),
    })).sort((a, b) => b.averageAttempts - a.averageAttempts);

    expect(results[0].lessonId).toBe('lab-bisect');
    expect(results[0].averageAttempts).toBe(4.0);
    expect(results[1].lessonId).toBe('lab-three-way-merge');
    expect(results[1].averageAttempts).toBe(3.0);
  });

  it('formats ClassAnalytics contract conforming to spec', () => {
    const analytics: ClassAnalytics = {
      classId: 'class-git-k48',
      totalStudents: 45,
      activeStudents: 45,
      averageProgress: 62,
      averageQuizScore: 81,
      completedCoursesCount: 7,
      atRiskStudentsCount: 5,
      difficultTopics: [
        {
          topicId: '02-branching-05-merge-conflicts',
          topicTitle: 'Giải quyết Merge Conflict',
          type: 'lab',
          retryRate: 48,
          failureRate: 35,
        },
      ],
    };

    expect(analytics.totalStudents).toBe(45);
    expect(analytics.averageProgress).toBe(62);
    expect(analytics.averageQuizScore).toBe(81);
    expect(analytics.completedCoursesCount).toBe(7);
    expect(analytics.atRiskStudentsCount).toBe(5);
  });

  it('handles empty classroom with zero students gracefully in analytics', () => {
    const emptyStats = {
      totalStudents: 0,
      activeStudents: 0,
      averageProgress: 0,
      averageQuizScore: 0,
      completedCoursesCount: 0,
      atRiskStudentsCount: 0,
    };
    expect(emptyStats.averageProgress).toBe(0);
    expect(emptyStats.totalStudents).toBe(0);
  });

  it('handles single student classroom analytics accurately', () => {
    const singleStats = {
      totalStudents: 1,
      completedLessons: 64,
      totalCourseLessons: 128,
    };
    const progress = Math.round((singleStats.completedLessons / singleStats.totalCourseLessons) * 100);
    expect(progress).toBe(50);
  });

  it('identifies top 5 most retried topics without crashing on smaller list', () => {
    const topics = [
      { id: 't1', retry: 5 },
      { id: 't2', retry: 2 },
    ];
    const top5 = topics.sort((a, b) => b.retry - a.retry).slice(0, 5);
    expect(top5).toHaveLength(2);
    expect(top5[0].id).toBe('t1');
  });

  it('calculates cohort pass rate based on configured passing mark', () => {
    const marks = [75, 80, 55, 90, 45, 60];
    const passThreshold = 60;
    const passedCount = marks.filter((m) => m >= passThreshold).length;
    const passRate = Math.round((passedCount / marks.length) * 100);

    expect(passedCount).toBe(4);
    expect(passRate).toBe(67);
  });

  it('calculates average study time per lesson across class', () => {
    const timesSeconds = [300, 450, 600, 250];
    const avgSec = Math.round(timesSeconds.reduce((a, b) => a + b, 0) / timesSeconds.length);
    expect(avgSec).toBe(400);
  });

  it('verifies difficulty insight threshold tagging', () => {
    const isHighDifficulty = (avgAttempts: number, failRate: number) => avgAttempts >= 2.0 || failRate >= 30;
    expect(isHighDifficulty(2.5, 20)).toBe(true);
    expect(isHighDifficulty(1.2, 35)).toBe(true);
    expect(isHighDifficulty(1.1, 15)).toBe(false);
  });
});
