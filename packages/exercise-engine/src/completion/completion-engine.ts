import { LessonCompletionRule, LessonProgress } from '@git-academy/shared';

export interface CompletionEvaluationResult {
  completed: boolean;
  criteria: {
    id: string;
    description: string;
    passed: boolean;
  }[];
}

export class LessonCompletionEngine {
  public evaluate(
    rule: LessonCompletionRule | undefined,
    progress: LessonProgress
  ): CompletionEvaluationResult {
    // If no rule specified, fallback to default standard rule: lab completed & quiz >= 70%
    const effectiveRule: LessonCompletionRule = rule || {
      theoryViewed: false,
      labs: ['lab-01'],
      quiz: { minimumScore: 70 },
    };

    const criteria: { id: string; description: string; passed: boolean }[] = [];

    // 1. Check theory viewed
    if (effectiveRule.theoryViewed) {
      criteria.push({
        id: 'theory-viewed',
        description: 'Đã đọc phần lý thuyết bài học',
        passed: Boolean(progress.theoryViewed),
      });
    }

    // 2. Check required labs completed
    if (effectiveRule.labs && effectiveRule.labs.length > 0) {
      for (const labId of effectiveRule.labs) {
        const passed = progress.labsCompleted.includes(labId);
        criteria.push({
          id: `lab-${labId}`,
          description: `Đã hoàn thành bài thực hành: ${labId}`,
          passed,
        });
      }
    }

    // 3. Check quiz minimum score
    if (effectiveRule.quiz) {
      const minScore = effectiveRule.quiz.minimumScore;
      const passed = progress.quizScore >= minScore;
      criteria.push({
        id: 'quiz-passed',
        description: `Đạt điểm trắc nghiệm tối thiểu ${minScore}% (hiện tại: ${progress.quizScore}%)`,
        passed,
      });
    }

    const completed = criteria.length === 0 || criteria.every((c) => c.passed);

    return {
      completed,
      criteria,
    };
  }

  public isLessonCompleted(rule: LessonCompletionRule | undefined, progress: LessonProgress): boolean {
    return this.evaluate(rule, progress).completed;
  }
}
