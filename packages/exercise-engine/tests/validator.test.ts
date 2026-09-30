import { describe, it, expect } from 'vitest';
import { Scenario, GitState } from '@git-academy/shared';
import { GoalValidator } from '../src/validator';
import { ScenarioRunner } from '../src/runner';

describe('GoalValidator Comprehensive Tests', () => {
  const validator = new GoalValidator();

  const createBaseState = (): GitState => ({
    repositoryInitialized: true,
    currentBranch: 'main',
    head: { type: 'branch', target: 'main' },
    branches: [{ name: 'main', commitHash: 'c1' }],
    tags: [],
    commits: [
      {
        hash: 'c1',
        message: 'feat: init',
        parents: [],
        tree: { 'readme.md': '# Welcome' },
        author: { name: 'Student', email: 'student@example.com' },
        timestamp: Date.now(),
      },
    ],
    stagingArea: [],
    workingTree: [{ path: 'readme.md', content: '# Welcome', status: 'unmodified' }],
  });

  it('1. should validate repository initialized requirement', () => {
    const scenario: Scenario = {
      id: 's1',
      title: 'Init check',
      initialState: {},
      goal: {},
    };
    const uninitState: GitState = {
      ...createBaseState(),
      repositoryInitialized: false,
    };
    const res = validator.validate(scenario, uninitState);
    expect(res.passed).toBe(false);
    expect(res.checklist.find((c) => c.id === 'repo-init')?.passed).toBe(false);
  });

  it('2. should pass repository initialized when true', () => {
    const scenario: Scenario = { id: 's2', title: 'Init check', initialState: {}, goal: {} };
    const res = validator.validate(scenario, createBaseState());
    expect(res.passed).toBe(true);
    expect(res.checklist.find((c) => c.id === 'repo-init')?.passed).toBe(true);
  });

  it('3. should validate exact commit count goal', () => {
    const scenario: Scenario = {
      id: 's3',
      title: 'Commit count check',
      initialState: {},
      goal: { commits: { count: 2 } },
    };
    const state = createBaseState(); // has 1 commit
    expect(validator.validate(scenario, state).passed).toBe(false);

    // Add 2nd commit
    state.commits.push({
      hash: 'c2',
      message: 'feat: add page',
      parents: ['c1'],
      tree: {},
      author: { name: 'A', email: 'a@a.com' },
      timestamp: Date.now(),
    });
    expect(validator.validate(scenario, state).passed).toBe(true);
  });

  it('4. should validate minCount commit goal', () => {
    const scenario: Scenario = {
      id: 's4',
      title: 'Commit minCount',
      initialState: {},
      goal: { commits: { minCount: 1 } },
    };
    const state = createBaseState();
    expect(validator.validate(scenario, state).passed).toBe(true);
  });

  it('5. should validate latest commit message exact match', () => {
    const scenario: Scenario = {
      id: 's5',
      title: 'Message match',
      initialState: {},
      goal: { latestCommit: { message: 'feat: init' } },
    };
    const state = createBaseState();
    expect(validator.validate(scenario, state).passed).toBe(true);

    const wrongScenario: Scenario = {
      id: 's5b',
      title: 'Wrong message',
      initialState: {},
      goal: { latestCommit: { message: 'feat: something else' } },
    };
    expect(validator.validate(wrongScenario, state).passed).toBe(false);
  });

  it('6. should validate latest commit message pattern regex', () => {
    const scenario: Scenario = {
      id: 's6',
      title: 'Pattern match',
      initialState: {},
      goal: { latestCommit: { messagePattern: '^(feat|fix):\\s.+' } },
    };
    const state = createBaseState();
    expect(validator.validate(scenario, state).passed).toBe(true);

    state.commits[0].message = 'random update';
    expect(validator.validate(scenario, state).passed).toBe(false);
  });

  it('7. should validate clean staging area', () => {
    const scenario: Scenario = {
      id: 's7',
      title: 'Clean staging',
      initialState: {},
      goal: { stagingArea: { clean: true } },
    };
    const state = createBaseState();
    expect(validator.validate(scenario, state).passed).toBe(true);

    state.stagingArea.push({ path: 'dirty.js', content: '', status: 'added', staged: true });
    expect(validator.validate(scenario, state).passed).toBe(false);
  });

  it('8. should validate required staged files', () => {
    const scenario: Scenario = {
      id: 's8',
      title: 'Staged files',
      initialState: {},
      goal: { stagingArea: { stagedFiles: ['app.ts', 'style.css'] } },
    };
    const state = createBaseState();
    expect(validator.validate(scenario, state).passed).toBe(false);

    state.stagingArea.push({ path: 'app.ts', content: '', status: 'added', staged: true });
    expect(validator.validate(scenario, state).passed).toBe(false);

    state.stagingArea.push({ path: 'style.css', content: '', status: 'added', staged: true });
    expect(validator.validate(scenario, state).passed).toBe(true);
  });

  it('9. should validate clean working tree', () => {
    const scenario: Scenario = {
      id: 's9',
      title: 'Clean working tree',
      initialState: {},
      goal: { workingTree: { clean: true } },
    };
    const state = createBaseState();
    state.workingTree = [{ path: 'readme.md', content: '# Welcome', status: 'unmodified' }];
    expect(validator.validate(scenario, state).passed).toBe(true);

    state.workingTree.push({ path: 'new.txt', content: 'new', status: 'untracked' });
    expect(validator.validate(scenario, state).passed).toBe(false);
  });

  it('10. should validate required files in working tree with contentIncludes', () => {
    const scenario: Scenario = {
      id: 's10',
      title: 'Required file content',
      initialState: {},
      goal: {
        workingTree: {
          requiredFiles: [{ path: 'index.html', contentIncludes: '<h1>Hello</h1>' }],
        },
      },
    };
    const state = createBaseState();
    expect(validator.validate(scenario, state).passed).toBe(false);

    state.workingTree.push({ path: 'index.html', content: '<h1>Hello</h1><p>text</p>', status: 'unmodified' });
    expect(validator.validate(scenario, state).passed).toBe(true);
  });

  it('11. should validate required branches existence', () => {
    const scenario: Scenario = {
      id: 's11',
      title: 'Branches requirement',
      initialState: {},
      goal: { branches: { required: ['main', 'feature/login'] } },
    };
    const state = createBaseState();
    expect(validator.validate(scenario, state).passed).toBe(false);

    state.branches.push({ name: 'feature/login', commitHash: 'c1' });
    expect(validator.validate(scenario, state).passed).toBe(true);
  });

  it('12. should validate current active branch', () => {
    const scenario: Scenario = {
      id: 's12',
      title: 'Active branch check',
      initialState: {},
      goal: { branches: { current: 'dev' } },
    };
    const state = createBaseState();
    expect(validator.validate(scenario, state).passed).toBe(false);

    state.currentBranch = 'dev';
    expect(validator.validate(scenario, state).passed).toBe(true);
  });

  it('13. should validate HEAD pointsTo requirement', () => {
    const scenario: Scenario = {
      id: 's13',
      title: 'HEAD target',
      initialState: {},
      goal: { head: { pointsTo: 'feature/auth' } },
    };
    const state = createBaseState();
    expect(validator.validate(scenario, state).passed).toBe(false);

    state.head = { type: 'branch', target: 'feature/auth' };
    expect(validator.validate(scenario, state).passed).toBe(true);
  });

  it('14. should validate multi-goal scenario passing only when all goals pass', () => {
    const scenario: Scenario = {
      id: 's14',
      title: 'Combined goals',
      initialState: {},
      goal: {
        commits: { minCount: 1 },
        stagingArea: { clean: true },
        branches: { current: 'main' },
      },
    };
    const state = createBaseState();
    expect(validator.validate(scenario, state).passed).toBe(true);

    // Break one condition
    state.currentBranch = 'feature';
    expect(validator.validate(scenario, state).passed).toBe(false);
  });

  it('15. should calculate earned XP on scenario success', () => {
    const scenario: Scenario = {
      id: 's15',
      title: 'XP calculation',
      initialState: {},
      goal: { commits: { minCount: 1 } },
      success: { xp: 150 },
    };
    const state = createBaseState();
    const res = validator.validate(scenario, state);
    expect(res.passed).toBe(true);
    expect(res.earnedXp).toBe(150);
  });

  it('16. should report 0 earned XP when validation fails', () => {
    const scenario: Scenario = {
      id: 's16',
      title: 'Fail XP',
      initialState: {},
      goal: { commits: { minCount: 5 } },
      success: { xp: 200 },
    };
    const state = createBaseState();
    const res = validator.validate(scenario, state);
    expect(res.passed).toBe(false);
    expect(res.earnedXp).toBe(0);
  });

  it('17. should provide actionable feedback for missing commits', () => {
    const scenario: Scenario = {
      id: 's17',
      title: 'Feedback check',
      initialState: {},
      goal: { commits: { count: 3 } },
    };
    const state = createBaseState();
    const res = validator.validate(scenario, state);
    expect(res.feedback.length).toBeGreaterThan(0);
    expect(res.feedback[0]).toContain('Cần có chính xác 3 commit');
  });

  it('18. should execute ScenarioRunner and track validation lifecycle', () => {
    const scenario: Scenario = {
      id: 's18',
      title: 'Runner lifecycle',
      initialState: {
        repositoryInitialized: true,
        files: [{ path: 'test.txt', content: 'hello' }],
      },
      goal: {
        commits: { minCount: 1 },
        stagingArea: { clean: true },
      },
      success: { xp: 75 },
    };
    const runner = new ScenarioRunner(scenario);
    expect(runner.validate().passed).toBe(false);

    runner.execute('git add test.txt');
    expect(runner.validate().passed).toBe(false);

    const commitStep = runner.execute('git commit -m "feat: first"');
    expect(commitStep.validation.passed).toBe(true);
    expect(commitStep.validation.earnedXp).toBe(75);
  });

  it('19. should reset ScenarioRunner and restore initial files', () => {
    const scenario: Scenario = {
      id: 's19',
      title: 'Reset lifecycle',
      initialState: {
        repositoryInitialized: true,
        files: [{ path: 'base.txt', content: 'initial content' }],
      },
      goal: { commits: { minCount: 1 } },
    };
    const runner = new ScenarioRunner(scenario);
    runner.execute('git add base.txt');
    runner.execute('git commit -m "commit"');
    expect(runner.validate().passed).toBe(true);

    runner.reset();
    expect(runner.validate().passed).toBe(false);
    expect(runner.getEngine().getFileSystem().readFile('base.txt')).toBe('initial content');
    expect(runner.getCommandLog()).toHaveLength(0);
  });

  it('20. should record command log history in ScenarioRunner', () => {
    const scenario: Scenario = {
      id: 's20',
      title: 'Log history',
      initialState: { repositoryInitialized: true },
      goal: {},
    };
    const runner = new ScenarioRunner(scenario);
    runner.execute('git status');
    runner.execute('touch file.txt');
    expect(runner.getCommandLog()).toEqual(['git status', 'touch file.txt']);
  });
});
