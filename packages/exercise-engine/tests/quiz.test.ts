import { describe, it, expect } from 'vitest';
import { Quiz, QuizQuestion } from '@git-academy/shared';
import { QuizEngine } from '../src/quiz/quiz-engine';

describe('QuizEngine Comprehensive Tests', () => {
  const engine = new QuizEngine();

  it('1. should grade single_choice question correctly', () => {
    const q: QuizQuestion = {
      id: 'q1',
      type: 'single_choice',
      question: 'Lệnh nào dùng để khởi tạo Git repository?',
      options: [
        { text: 'git start', correct: false },
        { text: 'git init', correct: true },
        { text: 'git create', correct: false },
      ],
      explanation: 'Dùng git init.',
    };

    const resCorrect = engine.evaluateQuestion(q, 1);
    expect(resCorrect.isCorrect).toBe(true);
    expect(resCorrect.score).toBe(1);

    const resWrong = engine.evaluateQuestion(q, 0);
    expect(resWrong.isCorrect).toBe(false);
    expect(resWrong.score).toBe(0);
  });

  it('2. should grade true_false question correctly', () => {
    const q: QuizQuestion = {
      id: 'q2',
      type: 'true_false',
      question: 'Git bắt buộc phải có kết nối Internet để commit.',
      options: [
        { text: 'Đúng', correct: false },
        { text: 'Sai', correct: true },
      ],
      explanation: 'Git là DVCS nên commit cục bộ không cần mạng.',
    };

    expect(engine.evaluateQuestion(q, 1).isCorrect).toBe(true);
    expect(engine.evaluateQuestion(q, 0).isCorrect).toBe(false);
  });

  it('3. should pass multiple_choice only when all correct options are selected', () => {
    const q: QuizQuestion = {
      id: 'q3',
      type: 'multiple_choice',
      question: 'Những vùng nào thuộc 3 vùng cơ bản của Git?',
      options: [
        { text: 'Working Directory', correct: true },
        { text: 'Staging Area', correct: true },
        { text: 'Cloud Server', correct: false },
        { text: 'Repository', correct: true },
      ],
      explanation: '3 vùng: Working Directory, Staging Area, Repository.',
    };

    // Correct: 0, 1, 3
    const allCorrect = engine.evaluateQuestion(q, [0, 1, 3]);
    expect(allCorrect.isCorrect).toBe(true);
    expect(allCorrect.score).toBe(1);

    // Partial: only 0, 1
    const partial = engine.evaluateQuestion(q, [0, 1]);
    expect(partial.isCorrect).toBe(false);

    // Excess: 0, 1, 2, 3 (includes wrong option 2)
    const excess = engine.evaluateQuestion(q, [0, 1, 2, 3]);
    expect(excess.isCorrect).toBe(false);
  });

  it('4. should grade command_order question with exact sequence', () => {
    const q: QuizQuestion = {
      id: 'q4',
      type: 'command_order',
      question: 'Sắp xếp thứ tự các bước để commit tính năng:',
      options: [
        { text: 'Sửa file', correct: true },
        { text: 'git status', correct: true },
        { text: 'git add', correct: true },
        { text: 'git commit', correct: true },
      ],
      commandOrder: ['Sửa file', 'git status', 'git add', 'git commit'],
      explanation: 'Quy trình chuẩn: Sửa file -> git status -> git add -> git commit.',
    };

    const correctOrder = ['Sửa file', 'git status', 'git add', 'git commit'];
    expect(engine.evaluateQuestion(q, correctOrder).isCorrect).toBe(true);

    const reversedOrder = ['git commit', 'git add', 'git status', 'Sửa file'];
    expect(engine.evaluateQuestion(q, reversedOrder).isCorrect).toBe(false);
  });

  it('5. should grade fill_command with case-insensitivity and trimmed whitespace', () => {
    const q: QuizQuestion = {
      id: 'q5',
      type: 'fill_command',
      question: 'Điền cờ rút gọn lịch sử commit: git log _____',
      options: [],
      expectedCommand: '--oneline',
      explanation: 'Dùng cờ --oneline.',
    };

    expect(engine.evaluateQuestion(q, '--oneline').isCorrect).toBe(true);
    expect(engine.evaluateQuestion(q, '  --ONELINE  ').isCorrect).toBe(true);
    expect(engine.evaluateQuestion(q, '--short').isCorrect).toBe(false);
  });

  it('6. should grade git_graph_question correctly', () => {
    const q: QuizQuestion = {
      id: 'q6',
      type: 'git_graph_question',
      question: 'Sau khi merge 3-way, commit mới có mấy commit cha?',
      options: [
        { text: '1', correct: false },
        { text: '2', correct: true },
      ],
      explanation: '3-way merge commit có 2 cha.',
    };

    expect(engine.evaluateQuestion(q, 1).isCorrect).toBe(true);
    expect(engine.evaluateQuestion(q, 0).isCorrect).toBe(false);
  });

  it('7. should grade full quiz and calculate percentage score (100%)', () => {
    const quiz: Quiz = {
      id: 'quiz-full',
      title: 'Full Test',
      minimumScore: 75,
      questions: [
        {
          id: 'q1',
          type: 'single_choice',
          question: 'Q1',
          options: [{ text: 'A', correct: true }, { text: 'B', correct: false }],
          explanation: '',
        },
        {
          id: 'q2',
          type: 'true_false',
          question: 'Q2',
          options: [{ text: 'Đúng', correct: true }, { text: 'Sai', correct: false }],
          explanation: '',
        },
      ],
    };

    const res = engine.evaluateQuiz(quiz, { q1: 0, q2: 0 });
    expect(res.totalQuestions).toBe(2);
    expect(res.correctCount).toBe(2);
    expect(res.score).toBe(100);
    expect(res.passed).toBe(true);
  });

  it('8. should calculate partial score and determine failed status when below minimumScore', () => {
    const quiz: Quiz = {
      id: 'quiz-partial',
      title: 'Partial Test',
      minimumScore: 75,
      questions: [
        {
          id: 'q1',
          type: 'single_choice',
          question: 'Q1',
          options: [{ text: 'A', correct: true }, { text: 'B', correct: false }],
          explanation: '',
        },
        {
          id: 'q2',
          type: 'single_choice',
          question: 'Q2',
          options: [{ text: 'A', correct: true }, { text: 'B', correct: false }],
          explanation: '',
        },
      ],
    };

    // 1 correct out of 2 = 50% (< 75%)
    const res = engine.evaluateQuiz(quiz, { q1: 0, q2: 1 });
    expect(res.correctCount).toBe(1);
    expect(res.score).toBe(50);
    expect(res.passed).toBe(false);
  });

  it('9. should handle empty quiz questions safely', () => {
    const emptyQuiz: Quiz = {
      id: 'empty',
      title: 'Empty',
      questions: [],
    };
    const res = engine.evaluateQuiz(emptyQuiz, {});
    expect(res.totalQuestions).toBe(0);
    expect(res.score).toBe(0);
  });

  it('10. should shuffle options when shuffleOptions is enabled', () => {
    const quiz: Quiz = {
      id: 'shuffle-test',
      title: 'Shuffle',
      shuffleOptions: true,
      questions: [
        {
          id: 'q1',
          type: 'single_choice',
          question: 'Q',
          options: [
            { text: 'Opt 1', correct: false },
            { text: 'Opt 2', correct: false },
            { text: 'Opt 3', correct: true },
            { text: 'Opt 4', correct: false },
            { text: 'Opt 5', correct: false },
          ],
          explanation: '',
        },
      ],
    };

    const shuffled = engine.shuffleQuestions(quiz);
    expect(shuffled.questions[0].options).toHaveLength(5);
    expect(shuffled.questions[0].options.some((o) => o.correct)).toBe(true);
  });

  it('11. should provide detailed explanations for each question in results', () => {
    const quiz: Quiz = {
      id: 'explain-test',
      title: 'Explanations',
      questions: [
        {
          id: 'q1',
          type: 'single_choice',
          question: 'Q1',
          options: [{ text: 'Right', correct: true }, { text: 'Wrong', correct: false }],
          explanation: 'Detailed explanation about Git objects.',
        },
      ],
    };

    const res = engine.evaluateQuiz(quiz, { q1: 0 });
    expect(res.questionResults['q1'].explanation).toBe('Detailed explanation about Git objects.');
  });

  it('12. should handle missing answer gracefully as incorrect', () => {
    const q: QuizQuestion = {
      id: 'q-missing',
      type: 'single_choice',
      question: 'Question',
      options: [{ text: 'A', correct: true }],
      explanation: 'exp',
    };
    const res = engine.evaluateQuestion(q, undefined);
    expect(res.isCorrect).toBe(false);
    expect(res.score).toBe(0);
  });

  it('13. should handle invalid option index as incorrect', () => {
    const q: QuizQuestion = {
      id: 'q-invalid',
      type: 'single_choice',
      question: 'Question',
      options: [{ text: 'A', correct: true }],
      explanation: 'exp',
    };
    expect(engine.evaluateQuestion(q, 999).isCorrect).toBe(false);
    expect(engine.evaluateQuestion(q, -1).isCorrect).toBe(false);
  });

  it('14. should handle fill_command with empty string input', () => {
    const q: QuizQuestion = {
      id: 'q-empty-fill',
      type: 'fill_command',
      question: 'Fill',
      options: [],
      expectedCommand: '-m',
      explanation: '',
    };
    expect(engine.evaluateQuestion(q, '').isCorrect).toBe(false);
    expect(engine.evaluateQuestion(q, null).isCorrect).toBe(false);
  });

  it('15. should support custom minimum passing score', () => {
    const quiz: Quiz = {
      id: 'custom-score',
      title: 'Strict Test',
      minimumScore: 90,
      questions: [
        { id: 'q1', type: 'true_false', question: '1', options: [{ text: 'T', correct: true }], explanation: '' },
        { id: 'q2', type: 'true_false', question: '2', options: [{ text: 'T', correct: true }], explanation: '' },
        { id: 'q3', type: 'true_false', question: '3', options: [{ text: 'T', correct: true }], explanation: '' },
        { id: 'q4', type: 'true_false', question: '4', options: [{ text: 'T', correct: true }], explanation: '' },
        { id: 'q5', type: 'true_false', question: '5', options: [{ text: 'T', correct: true }], explanation: '' },
      ],
    };
    // 4 out of 5 = 80%, below 90%
    const res = engine.evaluateQuiz(quiz, { q1: 0, q2: 0, q3: 0, q4: 0, q5: 1 });
    expect(res.score).toBe(80);
    expect(res.passed).toBe(false);
  });
});
