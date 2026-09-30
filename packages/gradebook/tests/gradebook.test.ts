import { describe, it, expect } from 'vitest';
import {
  GradebookCalculator,
  DEFAULT_GRADE_POLICY,
  DeadlineManager,
  type RawStudentScores,
} from '../src/index.js';
import type { GradePolicy, StudentGradeSummary } from '@git-academy/shared';

describe('Gradebook Package - GradebookCalculator', () => {
  it('maps scores to letter grades correctly according to Vietnamese academic standards', () => {
    expect(GradebookCalculator.mapScoreToLetter(100)).toBe('A');
    expect(GradebookCalculator.mapScoreToLetter(95)).toBe('A');
    expect(GradebookCalculator.mapScoreToLetter(90)).toBe('A');
    expect(GradebookCalculator.mapScoreToLetter(89)).toBe('B');
    expect(GradebookCalculator.mapScoreToLetter(80)).toBe('B');
    expect(GradebookCalculator.mapScoreToLetter(79)).toBe('C');
    expect(GradebookCalculator.mapScoreToLetter(70)).toBe('C');
    expect(GradebookCalculator.mapScoreToLetter(69)).toBe('D');
    expect(GradebookCalculator.mapScoreToLetter(60)).toBe('D');
    expect(GradebookCalculator.mapScoreToLetter(59)).toBe('F');
    expect(GradebookCalculator.mapScoreToLetter(0)).toBe('F');
  });

  it('calculates perfect student score as 100 and grade A', () => {
    const rawScores: RawStudentScores = {
      quizScores: [100, 100, 100],
      labsCompletedRatio: 1.0,
      challengesCompletedRatio: 1.0,
      assignmentScores: [
        { score: 100, maxScore: 100 },
        { score: 50, maxScore: 50 },
      ],
    };

    const summary = GradebookCalculator.calculateStudentGrade('s-01', rawScores, DEFAULT_GRADE_POLICY);
    expect(summary.studentId).toBe('s-01');
    expect(summary.overallScore).toBe(100);
    expect(summary.letterGrade).toBe('A');
    expect(summary.breakdown.quizScore).toBe(100);
    expect(summary.breakdown.labsScore).toBe(100);
    expect(summary.breakdown.challengesScore).toBe(100);
    expect(summary.breakdown.assignmentsScore).toBe(100);
  });

  it('handles empty scores gracefully without division by zero', () => {
    const rawScores: RawStudentScores = {
      quizScores: [],
      labsCompletedRatio: 0,
      challengesCompletedRatio: 0,
      assignmentScores: [],
    };

    const summary = GradebookCalculator.calculateStudentGrade('s-empty', rawScores);
    expect(summary.overallScore).toBe(0);
    expect(summary.letterGrade).toBe('F');
    expect(summary.breakdown.quizScore).toBe(0);
    expect(summary.breakdown.labsScore).toBe(0);
  });

  it('calculates weighted composite score with standard policy (Quiz 25%, Labs 30%, Challenges 20%, Assignments 25%)', () => {
    // Quiz avg: 80 (contribution: 80 * 0.25 = 20)
    // Labs: 100% (contribution: 100 * 0.30 = 30)
    // Challenges: 50% (contribution: 50 * 0.20 = 10)
    // Assignments: 80% (contribution: 80 * 0.25 = 20)
    // Total = 20 + 30 + 10 + 20 = 80 -> B
    const rawScores: RawStudentScores = {
      quizScores: [80, 80, 80],
      labsCompletedRatio: 1.0,
      challengesCompletedRatio: 0.5,
      assignmentScores: [{ score: 80, maxScore: 100 }],
    };

    const summary = GradebookCalculator.calculateStudentGrade('s-composite', rawScores, DEFAULT_GRADE_POLICY);
    expect(summary.overallScore).toBe(80);
    expect(summary.letterGrade).toBe('B');
  });

  it('supports custom policy weights and normalizes correctly', () => {
    // Custom policy: Heavy on Labs (50%) and Assignments (50%)
    const customPolicy: GradePolicy = {
      quizWeight: 0.0,
      labsWeight: 0.5,
      challengesWeight: 0.0,
      assignmentsWeight: 0.5,
    };

    const rawScores: RawStudentScores = {
      quizScores: [0],
      labsCompletedRatio: 1.0, // 100 * 0.5 = 50
      challengesCompletedRatio: 0,
      assignmentScores: [{ score: 90, maxScore: 100 }], // 90 * 0.5 = 45
    };

    const summary = GradebookCalculator.calculateStudentGrade('s-custom', rawScores, customPolicy);
    expect(summary.overallScore).toBe(95);
    expect(summary.letterGrade).toBe('A');
  });

  it('calculates aggregate class statistics correctly', () => {
    const summaries: StudentGradeSummary[] = [
      { studentId: 's1', overallScore: 92, letterGrade: 'A', breakdown: { quizScore: 90, labsScore: 100, challengesScore: 90, assignmentsScore: 90 } },
      { studentId: 's2', overallScore: 84, letterGrade: 'B', breakdown: { quizScore: 80, labsScore: 90, challengesScore: 80, assignmentsScore: 85 } },
      { studentId: 's3', overallScore: 75, letterGrade: 'C', breakdown: { quizScore: 70, labsScore: 80, challengesScore: 70, assignmentsScore: 80 } },
      { studentId: 's4', overallScore: 62, letterGrade: 'D', breakdown: { quizScore: 60, labsScore: 65, challengesScore: 60, assignmentsScore: 65 } },
      { studentId: 's5', overallScore: 45, letterGrade: 'F', breakdown: { quizScore: 40, labsScore: 50, challengesScore: 40, assignmentsScore: 50 } },
    ];

    const stats = GradebookCalculator.calculateClassStats(summaries);
    expect(stats.averageScore).toBe(72);
    expect(stats.highestScore).toBe(92);
    expect(stats.lowestScore).toBe(45);
    expect(stats.atRiskStudentsCount).toBe(1); // s5 has 45 < 60
    expect(stats.distribution.A).toBe(1);
    expect(stats.distribution.B).toBe(1);
    expect(stats.distribution.C).toBe(1);
    expect(stats.distribution.D).toBe(1);
    expect(stats.distribution.F).toBe(1);
  });

  it('handles empty class statistics without error', () => {
    const stats = GradebookCalculator.calculateClassStats([]);
    expect(stats.averageScore).toBe(0);
    expect(stats.lowestScore).toBe(0);
    expect(stats.highestScore).toBe(0);
    expect(stats.atRiskStudentsCount).toBe(0);
    expect(stats.distribution.A).toBe(0);
  });
});

describe('Gradebook Package - DeadlineManager', () => {
  it('formats graded assignment state', () => {
    const dueAt = new Date(Date.now() + 86400000 * 3).toISOString();
    const info = DeadlineManager.computeDeadlineInfo(dueAt, '2026-09-20T10:00:00Z', true);
    expect(info.state).toBe('graded');
    expect(info.formattedRemaining).toBe('Đã chấm điểm');
    expect(info.isOverdue).toBe(false);
  });

  it('formats submitted assignment state before deadline', () => {
    const dueAt = new Date(Date.now() + 86400000 * 2).toISOString();
    const info = DeadlineManager.computeDeadlineInfo(dueAt, '2026-09-25T14:00:00Z', false);
    expect(info.state).toBe('submitted');
    expect(info.formattedRemaining).toBe('Đã nộp bài');
    expect(info.isOverdue).toBe(false);
  });

  it('formats overdue unsubmitted assignment', () => {
    const pastDue = new Date(Date.now() - 86400000 * 2).toISOString();
    const info = DeadlineManager.computeDeadlineInfo(pastDue, undefined, false);
    expect(info.state).toBe('overdue');
    expect(info.isOverdue).toBe(true);
    expect(info.formattedRemaining).toContain('Quá hạn');
  });

  it('formats upcoming deadline in days remaining', () => {
    const futureDue = new Date(Date.now() + 86400000 * 4 + 3600000).toISOString();
    const info = DeadlineManager.computeDeadlineInfo(futureDue, undefined, false);
    expect(info.state).toBe('pending');
    expect(info.isOverdue).toBe(false);
    expect(info.formattedRemaining).toContain('Còn');
  });

  it('formats today deadline when due within 24 hours', () => {
    const todayDue = new Date(Date.now() + 3600000 * 4).toISOString();
    const info = DeadlineManager.computeDeadlineInfo(todayDue, undefined, false);
    expect(info.state).toBe('pending');
    expect(info.isOverdue).toBe(false);
    expect(info.formattedRemaining).toContain('Còn');
  });
});
