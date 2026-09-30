import { describe, it, expect } from 'vitest';
import { GradebookCalculator, DeadlineManager, type RawStudentScores } from '../../packages/gradebook/src/index.js';
import type { GradePolicy, StudentGradeSummary } from '@git-academy/shared';

describe('Gradebook Advanced Calculations & Cohort Analytics', () => {
  describe('Policy Weight Configurations', () => {
    it('calculates score under Quiz-Heavy policy (Quiz 50%, Labs 20%, Challenges 10%, Assignments 20%)', () => {
      const quizHeavyPolicy: GradePolicy = {
        quizWeight: 0.50,
        labsWeight: 0.20,
        challengesWeight: 0.10,
        assignmentsWeight: 0.20,
      };

      const scores: RawStudentScores = {
        quizScores: [90, 90, 90], // 90 * 0.5 = 45
        labsCompletedRatio: 1.0, // 100 * 0.2 = 20
        challengesCompletedRatio: 1.0, // 100 * 0.1 = 10
        assignmentScores: [{ score: 80, maxScore: 100 }], // 80 * 0.2 = 16
      };

      const result = GradebookCalculator.calculateStudentGrade('s-qh', scores, quizHeavyPolicy);
      expect(result.overallScore).toBe(91); // 45 + 20 + 10 + 16 = 91
      expect(result.letterGrade).toBe('A');
    });

    it('calculates score under Lab-Heavy policy (Quiz 10%, Labs 60%, Challenges 10%, Assignments 20%)', () => {
      const labHeavyPolicy: GradePolicy = {
        quizWeight: 0.10,
        labsWeight: 0.60,
        challengesWeight: 0.10,
        assignmentsWeight: 0.20,
      };

      const scores: RawStudentScores = {
        quizScores: [50], // 50 * 0.10 = 5
        labsCompletedRatio: 1.0, // 100 * 0.60 = 60
        challengesCompletedRatio: 0.5, // 50 * 0.10 = 5
        assignmentScores: [{ score: 100, maxScore: 100 }], // 100 * 0.20 = 20
      };

      const result = GradebookCalculator.calculateStudentGrade('s-lh', scores, labHeavyPolicy);
      expect(result.overallScore).toBe(90); // 5 + 60 + 5 + 20 = 90
      expect(result.letterGrade).toBe('A');
    });

    it('calculates score under Assignment-Heavy policy (Quiz 10%, Labs 10%, Challenges 10%, Assignments 70%)', () => {
      const asgHeavyPolicy: GradePolicy = {
        quizWeight: 0.10,
        labsWeight: 0.10,
        challengesWeight: 0.10,
        assignmentsWeight: 0.70,
      };

      const scores: RawStudentScores = {
        quizScores: [100], // 10
        labsCompletedRatio: 1.0, // 10
        challengesCompletedRatio: 1.0, // 10
        assignmentScores: [{ score: 70, maxScore: 100 }], // 70 * 0.70 = 49
      };

      const result = GradebookCalculator.calculateStudentGrade('s-ah', scores, asgHeavyPolicy);
      expect(result.overallScore).toBe(79); // 10 + 10 + 10 + 49 = 79
      expect(result.letterGrade).toBe('C');
    });
  });

  describe('Cohort Distribution & Statistical Boundaries', () => {
    it('calculates statistics accurately for a 50-student cohort', () => {
      const summaries: StudentGradeSummary[] = Array.from({ length: 50 }, (_, i) => {
        const score = 50 + i; // 50 to 99
        return {
          studentId: `std-${i}`,
          overallScore: score,
          letterGrade: GradebookCalculator.mapScoreToLetter(score),
          breakdown: { quizScore: score, labsScore: score, challengesScore: score, assignmentsScore: score },
        };
      });

      const stats = GradebookCalculator.calculateClassStats(summaries);
      expect(stats.lowestScore).toBe(50);
      expect(stats.highestScore).toBe(99);
      expect(stats.averageScore).toBe(75); // (50 + 99) / 2 = 74.5 -> 75
      expect(stats.atRiskStudentsCount).toBe(10); // scores 50..59 are < 60
      expect(stats.distribution.A).toBe(10); // 90..99
      expect(stats.distribution.B).toBe(10); // 80..89
      expect(stats.distribution.C).toBe(10); // 70..79
      expect(stats.distribution.D).toBe(10); // 60..69
      expect(stats.distribution.F).toBe(10); // 50..59
    });

    it('identifies custom academic threshold for high-standard honours classes (pass >= 75)', () => {
      const summaries: StudentGradeSummary[] = [
        { studentId: 'h1', overallScore: 85, letterGrade: 'B', breakdown: { quizScore: 85, labsScore: 85, challengesScore: 85, assignmentsScore: 85 } },
        { studentId: 'h2', overallScore: 72, letterGrade: 'C', breakdown: { quizScore: 72, labsScore: 72, challengesScore: 72, assignmentsScore: 72 } },
        { studentId: 'h3', overallScore: 68, letterGrade: 'D', breakdown: { quizScore: 68, labsScore: 68, challengesScore: 68, assignmentsScore: 68 } },
      ];

      const honoursStats = GradebookCalculator.calculateClassStats(summaries, 75);
      expect(honoursStats.atRiskStudentsCount).toBe(2); // h2 (72) and h3 (68) < 75
    });
  });

  describe('Deadline Timezone & Time-Remaining Nuances', () => {
    it('correctly handles UTC deadlines across midnight boundaries', () => {
      const now = new Date('2026-10-15T16:00:00.000Z').getTime(); // 23:00 VN time
      const due = '2026-10-15T17:00:00.000Z'; // 1 hour remaining

      const info = DeadlineManager.computeDeadlineInfo(due, undefined, false, now);
      expect(info.isOverdue).toBe(false);
      expect(info.formattedRemaining).toBe('Còn 1 giờ');
    });

    it('formats overdue by hours when deadline passed less than 24 hours ago', () => {
      const now = new Date('2026-10-16T04:00:00.000Z').getTime();
      const due = '2026-10-15T23:00:00.000Z'; // 5 hours ago

      const info = DeadlineManager.computeDeadlineInfo(due, undefined, false, now);
      expect(info.isOverdue).toBe(true);
      expect(info.formattedRemaining).toBe('Quá hạn 5 giờ');
    });

    it('formats overdue by days when deadline passed more than 24 hours ago', () => {
      const now = new Date('2026-10-18T00:00:00.000Z').getTime();
      const due = '2026-10-15T00:00:00.000Z'; // 3 days ago

      const info = DeadlineManager.computeDeadlineInfo(due, undefined, false, now);
      expect(info.isOverdue).toBe(true);
      expect(info.formattedRemaining).toBe('Quá hạn 3 ngày');
    });
  });
});
