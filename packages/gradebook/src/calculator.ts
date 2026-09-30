import { GradePolicy, StudentGradeSummary } from '@git-academy/shared';

export const DEFAULT_GRADE_POLICY: GradePolicy = {
  quizWeight: 0.25,
  labsWeight: 0.30,
  challengesWeight: 0.20,
  assignmentsWeight: 0.25,
};

export interface RawStudentScores {
  quizScores: number[]; // e.g. [80, 100, 90]
  labsCompletedRatio: number; // 0 to 1 (e.g. 65/76 = 0.855)
  challengesCompletedRatio: number; // 0 to 1
  assignmentScores: { score: number; maxScore: number }[];
}

export class GradebookCalculator {
  public static mapScoreToLetter(score: number): string {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  }

  public static calculateStudentGrade(
    studentId: string,
    scores: RawStudentScores,
    policy: GradePolicy = DEFAULT_GRADE_POLICY
  ): StudentGradeSummary {
    // 1. Quizzes average (0 - 100)
    const quizAvg =
      scores.quizScores.length > 0
        ? scores.quizScores.reduce((sum, s) => sum + s, 0) / scores.quizScores.length
        : 0;

    // 2. Labs percentage (0 - 100)
    const labsScore = Math.min(100, Math.max(0, scores.labsCompletedRatio * 100));

    // 3. Challenges percentage (0 - 100)
    const challengesScore = Math.min(100, Math.max(0, scores.challengesCompletedRatio * 100));

    // 4. Assignments percentage (0 - 100)
    let assignmentsScore = 0;
    if (scores.assignmentScores.length > 0) {
      let earned = 0;
      let totalMax = 0;
      for (const a of scores.assignmentScores) {
        earned += Math.max(0, a.score);
        totalMax += Math.max(1, a.maxScore);
      }
      assignmentsScore = totalMax > 0 ? (earned / totalMax) * 100 : 0;
    }

    // Ensure weights sum to 1 or normalize
    const totalWeight =
      policy.quizWeight + policy.labsWeight + policy.challengesWeight + policy.assignmentsWeight;
    const normalizedQuizWeight = totalWeight > 0 ? policy.quizWeight / totalWeight : 0.25;
    const normalizedLabsWeight = totalWeight > 0 ? policy.labsWeight / totalWeight : 0.30;
    const normalizedChallengesWeight =
      totalWeight > 0 ? policy.challengesWeight / totalWeight : 0.20;
    const normalizedAssignmentsWeight =
      totalWeight > 0 ? policy.assignmentsWeight / totalWeight : 0.25;

    const overallScore = Math.round(
      quizAvg * normalizedQuizWeight +
        labsScore * normalizedLabsWeight +
        challengesScore * normalizedChallengesWeight +
        assignmentsScore * normalizedAssignmentsWeight
    );

    return {
      studentId,
      overallScore: Math.min(100, Math.max(0, overallScore)),
      letterGrade: this.mapScoreToLetter(overallScore),
      breakdown: {
        quizScore: Math.round(quizAvg),
        labsScore: Math.round(labsScore),
        challengesScore: Math.round(challengesScore),
        assignmentsScore: Math.round(assignmentsScore),
      },
    };
  }

  public static calculateClassStats(
    grades: StudentGradeSummary[],
    academicThreshold = 60
  ): {
    averageScore: number;
    highestScore: number;
    lowestScore: number;
    atRiskStudentsCount: number;
    distribution: Record<string, number>;
  } {
    if (grades.length === 0) {
      return {
        averageScore: 0,
        highestScore: 0,
        lowestScore: 0,
        atRiskStudentsCount: 0,
        distribution: { A: 0, B: 0, C: 0, D: 0, F: 0 },
      };
    }

    let sum = 0;
    let highest = -Infinity;
    let lowest = Infinity;
    let atRisk = 0;
    const distribution: Record<string, number> = { A: 0, B: 0, C: 0, D: 0, F: 0 };

    for (const g of grades) {
      sum += g.overallScore;
      if (g.overallScore > highest) highest = g.overallScore;
      if (g.overallScore < lowest) lowest = g.overallScore;
      if (g.overallScore < academicThreshold) atRisk++;
      distribution[g.letterGrade] = (distribution[g.letterGrade] || 0) + 1;
    }

    return {
      averageScore: Math.round(sum / grades.length),
      highestScore: highest === -Infinity ? 0 : highest,
      lowestScore: lowest === Infinity ? 0 : lowest,
      atRiskStudentsCount: atRisk,
      distribution,
    };
  }
}
