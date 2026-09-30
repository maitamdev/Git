import { Quiz, QuizQuestion } from '@git-academy/shared';

export interface QuestionGradingResult {
  questionId: string;
  isCorrect: boolean;
  score: number; // 0 or 1
  feedback: string;
  explanation: string;
}

export interface QuizGradingResult {
  totalQuestions: number;
  correctCount: number;
  score: number; // 0 to 100 percentage
  passed: boolean;
  minimumScore: number;
  questionResults: Record<string, QuestionGradingResult>;
}

export class QuizEngine {
  public evaluateQuestion(question: QuizQuestion, userAnswer: any): QuestionGradingResult {
    const qType = question.type;

    // 1. Single Choice / Single / True-False / Git Graph Question
    if (
      qType === 'single_choice' ||
      qType === 'single' ||
      qType === 'true_false' ||
      qType === 'git_graph_question'
    ) {
      const selectedIndex = typeof userAnswer === 'number' ? userAnswer : -1;
      const isCorrect =
        selectedIndex >= 0 &&
        selectedIndex < question.options.length &&
        question.options[selectedIndex].correct;

      return {
        questionId: question.id,
        isCorrect,
        score: isCorrect ? 1 : 0,
        feedback: isCorrect
          ? 'Chính xác!'
          : 'Chưa chính xác. Hãy xem kỹ giải thích bên dưới.',
        explanation: question.explanation,
      };
    }

    // 2. Multiple Choice
    if (qType === 'multiple_choice' || qType === 'multiple') {
      const selectedIndices = Array.isArray(userAnswer) ? (userAnswer as number[]) : [];
      const correctIndices = question.options
        .map((opt, idx) => (opt.correct ? idx : -1))
        .filter((idx) => idx !== -1);

      const allCorrectSelected =
        correctIndices.length === selectedIndices.length &&
        correctIndices.every((idx) => selectedIndices.includes(idx));

      return {
        questionId: question.id,
        isCorrect: allCorrectSelected,
        score: allCorrectSelected ? 1 : 0,
        feedback: allCorrectSelected
          ? 'Chính xác! Bạn đã chọn đủ tất cả các đáp án đúng.'
          : 'Chưa chính xác. Câu hỏi có nhiều đáp án đúng, hãy kiểm tra lại.',
        explanation: question.explanation,
      };
    }

    // 3. Command Order
    if (qType === 'command_order') {
      const userOrder = Array.isArray(userAnswer) ? (userAnswer as string[]) : [];
      const expectedOrder =
        question.commandOrder || question.options.map((o) => o.text);

      const isCorrect =
        userOrder.length === expectedOrder.length &&
        userOrder.every((cmd, idx) => cmd.trim() === expectedOrder[idx].trim());

      return {
        questionId: question.id,
        isCorrect,
        score: isCorrect ? 1 : 0,
        feedback: isCorrect
          ? 'Tuyệt vời! Thứ tự các câu lệnh hoàn toàn chính xác.'
          : 'Thứ tự các câu lệnh chưa đúng với quy trình làm việc chuẩn.',
        explanation: question.explanation,
      };
    }

    // 4. Fill Command
    if (qType === 'fill_command') {
      const userStr = typeof userAnswer === 'string' ? userAnswer.trim().toLowerCase() : '';
      const expected = (question.expectedCommand || '').trim().toLowerCase();

      // Normalize spaces
      const normUser = userStr.replace(/\s+/g, ' ');
      const normExpected = expected.replace(/\s+/g, ' ');
      const isCorrect = normUser === normExpected;

      return {
        questionId: question.id,
        isCorrect,
        score: isCorrect ? 1 : 0,
        feedback: isCorrect
          ? 'Chính xác! Cú pháp lệnh hoàn toàn chuẩn.'
          : `Chưa đúng cú pháp. Gợi ý: "${question.expectedCommand}"`,
        explanation: question.explanation,
      };
    }

    // Default fallback
    return {
      questionId: question.id,
      isCorrect: false,
      score: 0,
      feedback: 'Loại câu hỏi chưa được hỗ trợ.',
      explanation: question.explanation,
    };
  }

  public evaluateQuiz(quiz: Quiz, userAnswers: Record<string, any>): QuizGradingResult {
    return this.gradeQuiz(quiz, userAnswers);
  }

  public gradeQuiz(quiz: Quiz, userAnswers: Record<string, any>): QuizGradingResult {
    const totalQuestions = quiz.questions.length;
    let correctCount = 0;
    const questionResults: Record<string, QuestionGradingResult> = {};

    for (const q of quiz.questions) {
      const ans = userAnswers[q.id];
      const res = this.evaluateQuestion(q, ans);
      questionResults[q.id] = res;
      if (res.isCorrect) {
        correctCount++;
      }
    }

    const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const minimumScore = quiz.minimumScore ?? 70;
    const passed = score >= minimumScore;

    return {
      totalQuestions,
      correctCount,
      score,
      passed,
      minimumScore,
      questionResults,
    };
  }

  public shuffleQuestions(quiz: Quiz): Quiz {
    const clone = JSON.parse(JSON.stringify(quiz)) as Quiz;
    // Shuffle options
    for (const q of clone.questions) {
      if (clone.shuffleOptions && q.options && q.options.length > 1) {
        for (let i = q.options.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [q.options[i], q.options[j]] = [q.options[j], q.options[i]];
        }
      }
    }
    return clone;
  }
}
