import { describe, it, expect, beforeEach } from 'vitest';
import {
  LocalStorageProgressRepository,
  LessonCompletionEngine,
  PrerequisiteEngine,
  QuizEngine,
  MultiLabRunner,
  AchievementEngine,
} from '../src';
import {
  LessonMetadata,
  LessonProgress,
  Quiz,
  Scenario,
} from '@git-academy/shared';
import { createInitialGitState } from '@git-academy/git-engine';

describe('Exercise Engine Platform Modules', () => {
  describe('LocalStorageProgressRepository', () => {
    let repo: LocalStorageProgressRepository;

    beforeEach(() => {
      repo = new LocalStorageProgressRepository();
      repo.clear();
    });

    it('should initialize with default progress and level 1', async () => {
      const progress = await repo.getCourseProgress();
      expect(progress.level).toBe(1);
      expect(progress.totalXp).toBe(0);
      expect(progress.achievements).toEqual([]);
    });

    it('should save and retrieve lesson progress', async () => {
      const lessonProg: LessonProgress = {
        lessonId: '01-version-control',
        completed: true,
        theoryViewed: true,
        quizScore: 90,
        labsCompleted: ['lab-01'],
        xp: 50,
      };

      await repo.saveLessonProgress(lessonProg);
      const retrieved = await repo.getLessonProgress('01-version-control');
      expect(retrieved).not.toBeNull();
      expect(retrieved?.completed).toBe(true);
      expect(retrieved?.quizScore).toBe(90);
    });

    it('should add XP and calculate level progression', async () => {
      await repo.addXp(150);
      const p1 = await repo.getCourseProgress();
      expect(p1.totalXp).toBe(150);
      expect(p1.level).toBe(2);

      await repo.addXp(300);
      const p2 = await repo.getCourseProgress();
      expect(p2.totalXp).toBe(450);
      expect(p2.level).toBe(4);
    });

    it('should reset lesson without clearing total XP', async () => {
      await repo.addXp(100);
      await repo.saveLessonProgress({
        lessonId: 'test-lesson',
        completed: true,
        theoryViewed: true,
        quizScore: 100,
        labsCompleted: ['l1'],
        xp: 100,
      });

      await repo.resetLesson('test-lesson');
      const prog = await repo.getLessonProgress('test-lesson');
      expect(prog?.completed).toBe(false);
      expect(prog?.labsCompleted).toEqual([]);

      const courseProg = await repo.getCourseProgress();
      expect(courseProg.totalXp).toBe(100); // XP preserved
    });
  });

  describe('LessonCompletionEngine', () => {
    const engine = new LessonCompletionEngine();

    it('should require theory, lab, and quiz score >= 70% according to rules', () => {
      const rule = {
        theoryViewed: true,
        labs: ['lab-01'],
        quiz: { minimumScore: 80 },
      };

      // Incomplete progress
      const p1: LessonProgress = {
        lessonId: 'l1',
        completed: false,
        theoryViewed: false,
        quizScore: 60,
        labsCompleted: [],
        xp: 0,
      };
      expect(engine.isLessonCompleted(rule, p1)).toBe(false);

      // Viewed theory and completed lab, but quiz only 75%
      const p2: LessonProgress = {
        ...p1,
        theoryViewed: true,
        labsCompleted: ['lab-01'],
        quizScore: 75,
      };
      expect(engine.isLessonCompleted(rule, p2)).toBe(false);

      // Quiz reaches 85% -> Completed!
      const p3: LessonProgress = {
        ...p2,
        quizScore: 85,
      };
      expect(engine.isLessonCompleted(rule, p3)).toBe(true);
    });
  });

  describe('PrerequisiteEngine', () => {
    const engine = new PrerequisiteEngine();

    it('should unlock lesson only when all prerequisites are completed', () => {
      const lesson: LessonMetadata = {
        id: '03-git-vs-github',
        title: 'Git vs GitHub',
        level: 'beginner',
        duration: 20,
        xp: 50,
        prerequisites: ['01-version-control', '02-git-la-gi'],
        objectives: [],
      };

      const progress = {
        userId: 'u1',
        totalXp: 0,
        level: 1,
        streakDays: 1,
        lessons: {
          '01-version-control': {
            lessonId: '01-version-control',
            completed: true,
            theoryViewed: true,
            quizScore: 100,
            labsCompleted: [],
            xp: 50,
          },
        },
        achievements: [],
      };

      const check1 = engine.canAccessLesson(lesson, progress);
      expect(check1.canAccess).toBe(false);
      expect(check1.missingPrerequisites).toEqual(['02-git-la-gi']);

      // Complete 02-git-la-gi
      progress.lessons['02-git-la-gi'] = {
        lessonId: '02-git-la-gi',
        completed: true,
        theoryViewed: true,
        quizScore: 90,
        labsCompleted: [],
        xp: 50,
      };

      const check2 = engine.canAccessLesson(lesson, progress);
      expect(check2.canAccess).toBe(true);
      expect(check2.missingPrerequisites.length).toBe(0);
    });
  });

  describe('QuizEngine (All 6 Question Types)', () => {
    const engine = new QuizEngine();

    const sampleQuiz: Quiz = {
      id: 'comprehensive-quiz',
      title: 'Kiểm tra toàn diện',
      minimumScore: 75,
      questions: [
        {
          id: 'q1',
          question: 'Lệnh nào dùng để khởi tạo repo?',
          type: 'single_choice',
          options: [
            { text: 'git init', correct: true },
            { text: 'git start', correct: false },
          ],
          explanation: 'git init khởi tạo kho chứa.',
        },
        {
          id: 'q2',
          question: 'Những vùng nào thuộc kiến trúc Git?',
          type: 'multiple_choice',
          options: [
            { text: 'Working Tree', correct: true },
            { text: 'Staging Area', correct: true },
            { text: 'Cloud Server', correct: false },
          ],
          explanation: 'Working tree và Staging area là 2 trong 3 vùng cơ bản.',
        },
        {
          id: 'q3',
          question: 'Git lưu trữ delta thay vì snapshot?',
          type: 'true_false',
          options: [
            { text: 'Đúng', correct: false },
            { text: 'Sai', correct: true },
          ],
          explanation: 'Git lưu trữ Snapshot.',
        },
        {
          id: 'q4',
          question: 'Sắp xếp thứ tự lưu code chuẩn vào Git',
          type: 'command_order',
          options: [],
          commandOrder: ['git status', 'git add .', 'git commit -m "feat"'],
          explanation: 'Kiểm tra status -> add -> commit.',
        },
        {
          id: 'q5',
          question: 'Gõ lệnh xem commit thu nhỏ trên 1 dòng',
          type: 'fill_command',
          options: [],
          expectedCommand: 'git log --oneline',
          explanation: 'Cú pháp là git log --oneline.',
        },
      ],
    };

    it('should correctly evaluate single_choice, multiple_choice, true_false, command_order, and fill_command', () => {
      const answers = {
        q1: 0, // correct
        q2: [0, 1], // correct
        q3: 1, // correct
        q4: ['git status', 'git add .', 'git commit -m "feat"'], // correct
        q5: 'git log --oneline', // correct
      };

      const result = engine.gradeQuiz(sampleQuiz, answers);
      expect(result.score).toBe(100);
      expect(result.passed).toBe(true);
      expect(result.correctCount).toBe(5);
    });

    it('should fail quiz if score is below minimum', () => {
      const answers = {
        q1: 1, // wrong
        q2: [0], // incomplete
        q3: 1, // correct
        q4: ['git commit', 'git add'], // wrong
        q5: 'git log', // wrong
      };

      const result = engine.gradeQuiz(sampleQuiz, answers);
      expect(result.score).toBe(20);
      expect(result.passed).toBe(false);
    });
  });

  describe('MultiLabRunner', () => {
    const sc1: Scenario = {
      id: 'lab-01',
      title: 'Lab 1',
      initialState: { repositoryInitialized: false },
      goal: { commits: { minCount: 1 } },
      hints: [],
      success: { message: 'Lab 1 Done', xp: 50 },
    };

    const sc2: Scenario = {
      id: 'challenge',
      title: 'Challenge',
      initialState: { repositoryInitialized: true },
      goal: { branches: { exists: ['feature'] } },
      hints: [],
      success: { message: 'Challenge Done', xp: 100 },
    };

    it('should lock subsequent labs until previous lab is passed', () => {
      const runner = new MultiLabRunner([sc1, sc2]);
      const labs = runner.getLabs();

      expect(labs[0].isLocked).toBe(false);
      expect(labs[1].isLocked).toBe(true); // Challenge is locked

      // Switch to challenge should be blocked
      expect(runner.switchLab('challenge')).toBe(false);

      // Solve lab 1
      runner.execute('git init');
      runner.getActiveRunner().getEngine().getFileSystem().writeFile('a.txt', '1');
      runner.execute('git add a.txt');
      const step = runner.execute('git commit -m "init"');
      expect(step.justCompletedLab).toBe(true);

      // Now challenge should be unlocked!
      const updatedLabs = runner.getLabs();
      expect(updatedLabs[1].isLocked).toBe(false);
      expect(runner.switchLab('challenge')).toBe(true);
    });
  });

  describe('AchievementEngine', () => {
    const engine = new AchievementEngine();

    it('should detect unlocked achievements based on state conditions', () => {
      const state = createInitialGitState(true);
      state.commits = [
        {
          hash: 'c1',
          shortHash: 'c1',
          message: 'init',
          author: { name: 'A', email: 'a@a.com' },
          timestamp: 1,
          parents: [],
          tree: {},
        },
      ];

      const progress = {
        userId: 'u1',
        totalXp: 100,
        level: 2,
        streakDays: 1,
        lessons: {},
        achievements: [],
      };

      const unlocked = engine.checkAchievements(state, progress);
      const ids = unlocked.map((u) => u.id);
      expect(ids).toContain('first-commit');
      expect(ids).toContain('first-repo');
    });
  });
});
