import { describe, it, expect } from 'vitest';
import { BUILTIN_SCENARIOS } from '../src/index';
import { ScenarioRunner } from '../../exercise-engine/src/runner';

describe('Comprehensive Built-In Scenarios & Goal Validation (Part C, D, Definition of Done)', () => {
  describe('All Built-in Scenarios Manifest & Integrity', () => {
    it('has at least 14 built-in scenarios loaded', () => {
      expect(Object.keys(BUILTIN_SCENARIOS).length).toBeGreaterThanOrEqual(14);
    });

    it('each built-in scenario has valid id, title, description, and goals', () => {
      for (const [key, sc] of Object.entries(BUILTIN_SCENARIOS)) {
        expect(sc.id).toBe(key);
        expect(sc.title).toBeTruthy();
        expect(sc.description).toBeTruthy();
        expect(sc.goal).toBeDefined();
      }
    });
  });

  describe('Level 1 Scenario: first-repository', () => {
    it('starts with uninitialized repo and passes after git init', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['first-repository']);
      const initialVal = runner.validate();
      expect(initialVal.passed).toBe(false);

      const res = runner.execute('git init');
      expect(res.commandResult.success).toBe(true);
      expect(res.validation.passed).toBe(true);
    });
  });

  describe('Level 1 / 2 Scenario: first-commit', () => {
    it('tracks command log and passes when commit is made', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['first-commit']);
      expect(runner.validate().passed).toBe(false);

      runner.execute('git init');
      runner.execute('git add login.js');
      const step1 = runner.validate();
      expect(step1.passed).toBe(false);

      const step2 = runner.execute('git commit -m "feat: add login module"');
      expect(step2.commandResult.success).toBe(true);
      expect(step2.validation.passed).toBe(true);
      expect(runner.getCommandLog()).toEqual([
        'git init',
        'git add login.js',
        'git commit -m "feat: add login module"',
      ]);
    });
  });

  describe('Level 2 Scenario: track-file', () => {
    it('validates file_staged goal after git add index.html', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['track-file']);
      expect(runner.validate().passed).toBe(false);

      const res = runner.execute('git add index.html');
      expect(res.commandResult.success).toBe(true);
      expect(res.validation.passed).toBe(true);
    });
  });

  describe('Level 2 Scenario: multiple-files', () => {
    it('validates staging multiple files with git add .', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['multiple-files']);
      expect(runner.validate().passed).toBe(false);

      const res = runner.execute('git add .');
      expect(res.commandResult.success).toBe(true);
      expect(res.validation.passed).toBe(true);
    });
  });

  describe('Level 2 Scenario: inspect-history', () => {
    it('stages, commits, and passes the scenario', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['inspect-history']);
      runner.execute('git add feature.js');
      const res = runner.execute('git commit -m "feat: add feature module"');
      expect(res.commandResult.success).toBe(true);
      expect(res.validation.passed).toBe(true);

      const logRes = runner.execute('git log --oneline');
      expect(logRes.commandResult.success).toBe(true);
      expect(logRes.commandResult.stdout).toContain('feat: add feature module');
    });
  });

  describe('Level 2 Scenario: inspect-diff', () => {
    it('stages, commits, and completes scenario goals', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['inspect-diff']);
      runner.execute('git add server.js');
      const res = runner.execute('git commit -m "fix: update server config"');
      expect(res.commandResult.success).toBe(true);
      expect(res.validation.passed).toBe(true);
    });
  });

  describe('Level 3 Scenario: create-branch', () => {
    it('validates branch_created goal after git branch feature/auth', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['create-branch']);
      expect(runner.validate().passed).toBe(false);

      // Create initial commit first so branch pointer is valid
      runner.execute('git add main.js');
      runner.execute('git commit -m "init"');

      const res = runner.execute('git branch feature/auth');
      expect(res.commandResult.success).toBe(true);
      expect(res.validation.passed).toBe(true);
    });
  });

  describe('Level 3 Scenario: switch-branch', () => {
    it('validates branch_checked_out goal after switching to feature/login', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['switch-branch']);
      expect(runner.validate().passed).toBe(false);

      const res = runner.execute('git switch feature/login');
      expect(res.commandResult.success).toBe(true);
      expect(res.validation.passed).toBe(true);
    });
  });

  describe('Level 3 Scenario: merge-conflict resolution', () => {
    it('fails initial validation during active conflict state', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['merge-conflict']);
      const val = runner.validate();
      expect(val.passed).toBe(false);
    });

    it('resolves conflict when file is edited and commit is made', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['merge-conflict']);
      // Resolve conflict by writing clean content
      runner.getEngine().getFileSystem().writeFile('auth.ts', 'export const API_URL = "https://api.main.vn";\n');
      runner.execute('git add auth.ts');
      const res = runner.execute('git commit -m "merge: resolve auth URL conflict"');

      expect(res.commandResult.success).toBe(true);
      expect(res.validation.passed).toBe(true);
    });
  });

  describe('Scenario Runner Reset Behavior', () => {
    it('resets repository state and command log to initial conditions', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['first-commit']);
      runner.execute('git init');
      runner.execute('git add login.js');
      runner.execute('git commit -m "feat: login"');
      expect(runner.validate().passed).toBe(true);
      expect(runner.getCommandLog()).toHaveLength(3);

      runner.reset();
      expect(runner.getCommandLog()).toHaveLength(0);
      expect(runner.validate().passed).toBe(false);
      expect(runner.getEngine().getState().commits).toHaveLength(0);
    });
  });

  describe('Level 3 / 2 Undo Scenarios: restore & reset-hard', () => {
    it('executes restore command in restore scenario', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['restore']);
      // Initial commit first
      runner.execute('git add critical.ts');
      runner.execute('git commit -m "save baseline"');
      runner.getEngine().getFileSystem().writeFile('critical.ts', 'modified broken');

      const res = runner.execute('git restore critical.ts');
      expect(res.commandResult.success).toBe(true);
    });

    it('executes reset --hard in reset-hard scenario', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['reset-hard']);
      runner.execute('git add temp.txt');
      runner.execute('git commit -m "initial commit"');

      const res = runner.execute('git reset --hard HEAD');
      expect(res.commandResult.success).toBe(true);
      expect(runner.validate().passed).toBe(true);
    });
  });

  describe('Stash Scenario', () => {
    it('executes git stash to save working dirty state', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['stash']);
      runner.execute('git add wip.js');
      runner.execute('git commit -m "baseline commit"');
      runner.getEngine().getFileSystem().writeFile('wip.js', 'more changes');

      const res = runner.execute('git stash');
      expect(res.commandResult.success).toBe(true);
      expect(runner.validate().passed).toBe(true);
    });
  });
});
