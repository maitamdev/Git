import { describe, it, expect } from 'vitest';
import { AchievementEngine } from '../src/achievements/achievement-engine';
import { DEFAULT_ACHIEVEMENTS } from '../src/achievements/default-achievements';
import { AchievementDefinition, GitState, CourseProgress } from '@git-academy/shared';

function createDummyGitState(overrides: Partial<GitState> = {}): GitState {
  return {
    repositoryInitialized: false,
    head: 'refs/heads/main',
    branches: ['main'],
    tags: [],
    commits: [],
    index: {},
    workingTree: {},
    remotes: {},
    remoteTrackingBranches: {},
    reflog: [],
    ...overrides,
  };
}

function createDummyProgress(overrides: Partial<CourseProgress> = {}): CourseProgress {
  return {
    userId: 'learner',
    totalXp: 0,
    level: 1,
    streakDays: 1,
    lessons: {},
    achievements: [],
    ...overrides,
  };
}

describe('Achievement Engine & Condition Types Expansion (A1)', () => {
  const engine = new AchievementEngine();

  describe('Part A1: first-repo vs first-commit semantic check', () => {
    it('unlocks first-repo when repositoryInitialized is true even if commit_count is 0', () => {
      const state = createDummyGitState({
        repositoryInitialized: true,
        commits: [],
      });
      const progress = createDummyProgress();

      const unlocked = engine.checkAchievements(state, progress, DEFAULT_ACHIEVEMENTS);
      const ids = unlocked.map((a) => a.id);
      expect(ids).toContain('first-repo');
      expect(ids).not.toContain('first-commit');
    });

    it('does not unlock first-repo when repositoryInitialized is false', () => {
      const state = createDummyGitState({
        repositoryInitialized: false,
        commits: [],
      });
      const progress = createDummyProgress();

      const unlocked = engine.checkAchievements(state, progress, DEFAULT_ACHIEVEMENTS);
      const ids = unlocked.map((a) => a.id);
      expect(ids).not.toContain('first-repo');
      expect(ids).not.toContain('first-commit');
    });

    it('unlocks first-commit only when commits >= 1', () => {
      const state = createDummyGitState({
        repositoryInitialized: true,
        commits: [
          {
            hash: 'c111111',
            message: 'Initial commit',
            author: 'Khang',
            timestamp: Date.now(),
            parents: [],
            tree: {},
          },
        ],
      });
      const progress = createDummyProgress();

      const unlocked = engine.checkAchievements(state, progress, DEFAULT_ACHIEVEMENTS);
      const ids = unlocked.map((a) => a.id);
      expect(ids).toContain('first-repo');
      expect(ids).toContain('first-commit');
    });
  });

  describe('Condition type: repository_initialized', () => {
    it('evaluates == operator correctly', () => {
      const customDef: AchievementDefinition = {
        id: 'init-badge',
        title: 'Init Badge',
        description: 'Repo is initialized',
        icon: '🎯',
        category: 'milestone',
        xpReward: 10,
        condition: {
          type: 'repository_initialized',
          operator: '==',
          value: true,
        },
      };

      const stateNotInit = createDummyGitState({ repositoryInitialized: false });
      expect(engine.checkAchievements(stateNotInit, createDummyProgress(), [customDef])).toHaveLength(0);

      const stateInit = createDummyGitState({ repositoryInitialized: true });
      expect(engine.checkAchievements(stateInit, createDummyProgress(), [customDef])).toHaveLength(1);
    });
  });

  describe('Condition type: commit_count', () => {
    const customDef: AchievementDefinition = {
      id: 'five-commits',
      title: '5 Commits',
      description: 'Made 5 commits',
      icon: '📦',
      category: 'milestone',
      xpReward: 20,
      condition: {
        type: 'commit_count',
        operator: '>=',
        value: 5,
      },
    };

    it('fails when commit count is below target', () => {
      const state = createDummyGitState({
        commits: Array.from({ length: 4 }, (_, i) => ({
          hash: `hash-${i}`,
          message: `commit ${i}`,
          author: 'Me',
          timestamp: Date.now(),
          parents: [],
          tree: {},
        })),
      });
      expect(engine.checkAchievements(state, createDummyProgress(), [customDef])).toHaveLength(0);
    });

    it('unlocks when commit count reaches target', () => {
      const state = createDummyGitState({
        commits: Array.from({ length: 5 }, (_, i) => ({
          hash: `hash-${i}`,
          message: `commit ${i}`,
          author: 'Me',
          timestamp: Date.now(),
          parents: [],
          tree: {},
        })),
      });
      expect(engine.checkAchievements(state, createDummyProgress(), [customDef])).toHaveLength(1);
    });
  });

  describe('Condition type: branch_count', () => {
    const customDef: AchievementDefinition = {
      id: 'three-branches',
      title: 'Branch Master',
      description: 'Have at least 3 branches',
      icon: '🌿',
      category: 'milestone',
      xpReward: 30,
      condition: {
        type: 'branch_count',
        operator: '>=',
        value: 3,
      },
    };

    it('unlocks when branch count >= 3', () => {
      const state = createDummyGitState({
        branches: ['main', 'feature/login', 'bugfix/typo'],
      });
      expect(engine.checkAchievements(state, createDummyProgress(), [customDef])).toHaveLength(1);
    });

    it('does not unlock when branch count is 2', () => {
      const state = createDummyGitState({
        branches: ['main', 'feature/login'],
      });
      expect(engine.checkAchievements(state, createDummyProgress(), [customDef])).toHaveLength(0);
    });
  });

  describe('Condition type: merge_count', () => {
    const customDef: AchievementDefinition = {
      id: 'first-merge',
      title: 'First Merge',
      description: 'Perform a merge commit',
      icon: '🔀',
      category: 'milestone',
      xpReward: 50,
      condition: {
        type: 'merge_count',
        operator: '>=',
        value: 1,
      },
    };

    it('recognizes commits with multiple parents as merge commits', () => {
      const state = createDummyGitState({
        commits: [
          {
            hash: 'c1',
            message: 'first',
            author: 'Me',
            timestamp: Date.now(),
            parents: [],
            tree: {},
          },
          {
            hash: 'm1',
            message: 'Merge branch feature into main',
            author: 'Me',
            timestamp: Date.now(),
            parents: ['c1', 'c2'],
            tree: {},
          },
        ],
      });
      expect(engine.checkAchievements(state, createDummyProgress(), [customDef])).toHaveLength(1);
    });

    it('does not trigger on ordinary single-parent commits', () => {
      const state = createDummyGitState({
        commits: [
          {
            hash: 'c1',
            message: 'first',
            author: 'Me',
            timestamp: Date.now(),
            parents: [],
            tree: {},
          },
          {
            hash: 'c2',
            message: 'second',
            author: 'Me',
            timestamp: Date.now(),
            parents: ['c1'],
            tree: {},
          },
        ],
      });
      expect(engine.checkAchievements(state, createDummyProgress(), [customDef])).toHaveLength(0);
    });
  });

  describe('Condition type: conflict_resolved', () => {
    const customDef: AchievementDefinition = {
      id: 'conflict-slayer',
      title: 'Conflict Slayer',
      description: 'Resolved a merge conflict',
      icon: '⚔️',
      category: 'challenge',
      xpReward: 100,
      condition: {
        type: 'conflict_resolved',
        operator: '==',
        value: true,
      },
    };

    it('detects resolved merge commit containing conflict keyword', () => {
      const state = createDummyGitState({
        commits: [
          {
            hash: 'm-conflict',
            message: 'Merge branch feature into main - resolve conflict in index.ts',
            author: 'Me',
            timestamp: Date.now(),
            parents: ['p1', 'p2'],
            tree: {},
          },
        ],
      });
      expect(engine.checkAchievements(state, createDummyProgress(), [customDef])).toHaveLength(1);
    });

    it('rejects ordinary commits without multiple parents even if message mentions conflict', () => {
      const state = createDummyGitState({
        commits: [
          {
            hash: 'normal',
            message: 'fixed conflict typo in docs',
            author: 'Me',
            timestamp: Date.now(),
            parents: ['p1'],
            tree: {},
          },
        ],
      });
      expect(engine.checkAchievements(state, createDummyProgress(), [customDef])).toHaveLength(0);
    });
  });

  describe('Condition type: quiz_score', () => {
    const customDef: AchievementDefinition = {
      id: 'perfect-quiz',
      title: 'Perfect Score',
      description: 'Scored 100 on any quiz',
      icon: '💯',
      category: 'milestone',
      xpReward: 50,
      condition: {
        type: 'quiz_score',
        operator: '>=',
        value: 100,
      },
    };

    it('unlocks when any lesson has quizScore >= 100', () => {
      const progress = createDummyProgress({
        lessons: {
          'lesson-1': {
            lessonId: 'lesson-1',
            completed: true,
            theoryViewed: true,
            quizScore: 80,
            quizAttempts: 1,
            labsCompleted: [],
            xp: 20,
            lastAttemptAt: Date.now(),
          },
          'lesson-2': {
            lessonId: 'lesson-2',
            completed: true,
            theoryViewed: true,
            quizScore: 100,
            quizAttempts: 1,
            labsCompleted: [],
            xp: 50,
            lastAttemptAt: Date.now(),
          },
        },
      });

      expect(engine.checkAchievements(createDummyGitState(), progress, [customDef])).toHaveLength(1);
    });

    it('does not unlock when all scores are below target', () => {
      const progress = createDummyProgress({
        lessons: {
          'lesson-1': {
            lessonId: 'lesson-1',
            completed: true,
            theoryViewed: true,
            quizScore: 85,
            quizAttempts: 1,
            labsCompleted: [],
            xp: 20,
            lastAttemptAt: Date.now(),
          },
        },
      });

      expect(engine.checkAchievements(createDummyGitState(), progress, [customDef])).toHaveLength(0);
    });
  });

  describe('Condition type: lesson_completed', () => {
    const customDef: AchievementDefinition = {
      id: 'scholar',
      title: 'Scholar',
      description: 'Completed 3 lessons',
      icon: '📖',
      category: 'milestone',
      xpReward: 50,
      condition: {
        type: 'lesson_completed',
        operator: '>=',
        value: 3,
      },
    };

    it('unlocks when completed lessons count >= 3', () => {
      const progress = createDummyProgress({
        lessons: {
          'l1': { lessonId: 'l1', completed: true, theoryViewed: true, quizScore: 100, quizAttempts: 1, labsCompleted: [], xp: 20, lastAttemptAt: 1 },
          'l2': { lessonId: 'l2', completed: true, theoryViewed: true, quizScore: 100, quizAttempts: 1, labsCompleted: [], xp: 20, lastAttemptAt: 1 },
          'l3': { lessonId: 'l3', completed: true, theoryViewed: true, quizScore: 100, quizAttempts: 1, labsCompleted: [], xp: 20, lastAttemptAt: 1 },
          'l4': { lessonId: 'l4', completed: false, theoryViewed: true, quizScore: 0, quizAttempts: 0, labsCompleted: [], xp: 0, lastAttemptAt: 1 },
        },
      });

      expect(engine.checkAchievements(createDummyGitState(), progress, [customDef])).toHaveLength(1);
    });
  });

  describe('Condition type: lab_completed', () => {
    const customSpecificLab: AchievementDefinition = {
      id: 'special-lab',
      title: 'Special Lab Done',
      description: 'Completed lab-login-flow',
      icon: '🧪',
      category: 'challenge',
      xpReward: 40,
      condition: {
        type: 'lab_completed',
        operator: '==',
        value: 'lab-login-flow',
      },
    };

    it('matches specific lab ID by string name', () => {
      const progress = createDummyProgress({
        lessons: {
          'lesson-a': {
            lessonId: 'lesson-a',
            completed: true,
            theoryViewed: true,
            quizScore: 90,
            quizAttempts: 1,
            labsCompleted: ['lab-login-flow', 'lab-other'],
            xp: 50,
            lastAttemptAt: 1,
          },
        },
      });

      expect(engine.checkAchievements(createDummyGitState(), progress, [customSpecificLab])).toHaveLength(1);
    });

    it('fails when specific lab ID is not present', () => {
      const progress = createDummyProgress({
        lessons: {
          'lesson-a': {
            lessonId: 'lesson-a',
            completed: true,
            theoryViewed: true,
            quizScore: 90,
            quizAttempts: 1,
            labsCompleted: ['lab-other'],
            xp: 50,
            lastAttemptAt: 1,
          },
        },
      });

      expect(engine.checkAchievements(createDummyGitState(), progress, [customSpecificLab])).toHaveLength(0);
    });
  });

  describe('Condition type: command_used', () => {
    const customDef: AchievementDefinition = {
      id: 'cherry-picker',
      title: 'Cherry Picker',
      description: 'Used cherry-pick command',
      icon: '🍒',
      category: 'milestone',
      xpReward: 60,
      condition: {
        type: 'command_used',
        operator: '==',
        value: 'cherry-pick',
      },
    };

    it('detects command from reflog', () => {
      const state = createDummyGitState({
        reflog: [
          {
            action: 'cherry-pick: commit abc',
            message: 'Applied commit cleanly',
            fromHash: '0000000',
            toHash: '1111111',
            timestamp: Date.now(),
          },
        ],
      });

      expect(engine.checkAchievements(state, createDummyProgress(), [customDef])).toHaveLength(1);
    });

    it('does not unlock when command is not in reflog', () => {
      const state = createDummyGitState({
        reflog: [
          {
            action: 'commit: Initial commit',
            message: 'commit',
            fromHash: '0000000',
            toHash: '1111111',
            timestamp: Date.now(),
          },
        ],
      });

      expect(engine.checkAchievements(state, createDummyProgress(), [customDef])).toHaveLength(0);
    });
  });

  describe('Condition type: xp_total', () => {
    const customDef: AchievementDefinition = {
      id: 'high-roller',
      title: 'High Roller',
      description: 'Reached 1000 XP',
      icon: '⭐',
      category: 'milestone',
      xpReward: 100,
      condition: {
        type: 'xp_total',
        operator: '>=',
        value: 1000,
      },
    };

    it('unlocks when progress totalXp reaches threshold', () => {
      const progress = createDummyProgress({ totalXp: 1200 });
      expect(engine.checkAchievements(createDummyGitState(), progress, [customDef])).toHaveLength(1);
    });

    it('does not unlock when below threshold', () => {
      const progress = createDummyProgress({ totalXp: 999 });
      expect(engine.checkAchievements(createDummyGitState(), progress, [customDef])).toHaveLength(0);
    });
  });

  describe('Filtering already unlocked achievements', () => {
    it('does not re-return achievements already in progress.achievements', () => {
      const state = createDummyGitState({ repositoryInitialized: true });
      const progress = createDummyProgress({ achievements: ['first-repo'] });

      const unlocked = engine.checkAchievements(state, progress, DEFAULT_ACHIEVEMENTS);
      const ids = unlocked.map((a) => a.id);
      expect(ids).not.toContain('first-repo');
    });
  });
});
