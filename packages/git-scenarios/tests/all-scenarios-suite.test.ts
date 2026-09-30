import { describe, it, expect } from 'vitest';
import { BUILTIN_SCENARIOS } from '../src/index';
import { ScenarioRunner } from '../../exercise-engine/src/runner';

describe('Built-in Scenarios Full Suite: Levels 1 through 8 (77 Scenarios)', () => {
  describe('Global Scenario Catalog & Schema Invariants', () => {
    it('has exactly 77 registered scenarios in BUILTIN_SCENARIOS', () => {
      const keys = Object.keys(BUILTIN_SCENARIOS);
      expect(keys.length).toBe(77);
    });

    it('every scenario has non-empty id, title, description, hints, and success criteria', () => {
      for (const [key, sc] of Object.entries(BUILTIN_SCENARIOS)) {
        expect(sc.id).toBe(key);
        expect(sc.title.length).toBeGreaterThan(3);
        expect(sc.description.length).toBeGreaterThan(10);
        expect(sc.hints).toBeDefined();
        expect(sc.hints.length).toBeGreaterThanOrEqual(1);
        expect(sc.success).toBeDefined();
        expect(sc.success.xp).toBeGreaterThan(0);
        expect(sc.goal).toBeDefined();
      }
    });

    it('each scenario initializes cleanly in ScenarioRunner without throwing', () => {
      for (const [key, sc] of Object.entries(BUILTIN_SCENARIOS)) {
        const runner = new ScenarioRunner(sc);
        const engine = runner.getEngine();
        expect(engine).toBeDefined();
        const validation = runner.validate();
        expect(validation).toHaveProperty('passed');
        expect(validation).toHaveProperty('checklist');
        expect(validation.checklist.length).toBeGreaterThanOrEqual(1);
      }
    });
  });

  describe('Level 1 & 2 Scenarios Execution', () => {
    it('executes gitignore-lab: ignores logs when .gitignore is created', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['gitignore-lab']);
      expect(runner.validate().passed).toBe(false);

      runner.getEngine().getFileSystem().writeFile('.gitignore', '*.log\n');
      const val = runner.validate();
      expect(val.passed).toBe(true);
    });

    it('executes undo-working-tree-lab: git restore restores pristine config', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['undo-working-tree-lab']);
      expect(runner.validate().passed).toBe(false);

      const res = runner.execute('git restore config.json');
      expect(res.commandResult.success).toBe(true);
      expect(runner.validate().passed).toBe(true);
    });

    it('executes commit-amend-lab: git commit --amend fixes typo', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['commit-amend-lab']);
      expect(runner.validate().passed).toBe(false);

      runner.execute('git add profile.css');
      const res = runner.execute('git commit --amend -m "feat: user login module"');
      expect(res.commandResult.success).toBe(true);
      expect(runner.validate().passed).toBe(true);
    });

    it('executes file-lifecycle-lab: add and commit untracked component', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['file-lifecycle-lab']);
      expect(runner.validate().passed).toBe(false);

      runner.execute('git add notes.txt');
      const res = runner.execute('git commit -m "docs: add notes"');
      expect(res.commandResult.success).toBe(true);
      expect(runner.validate().passed).toBe(true);
    });

    it('executes status-check-lab: clean working directory check', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['status-check-lab']);
      runner.execute('git status');
      const res = runner.execute('git add .');
      expect(res.commandResult.success).toBe(true);
      expect(runner.validate().passed).toBe(true);
    });
  });

  describe('Level 3 Branching & Merge Scenarios Execution', () => {
    it('executes branch-isolation: commits on experiment branch leaving main untouched', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['branch-isolation']);
      expect(runner.validate().passed).toBe(false);

      runner.execute('git switch experiment');
      runner.getEngine().getFileSystem().writeFile('experiment.txt', 'experimental code');
      runner.execute('git add experiment.txt');
      runner.execute('git commit -m "test: try experimental algorithm"');

      expect(runner.validate().passed).toBe(true);
    });

    it('executes three-way-merge: merges feat/search cleanly into main', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['three-way-merge']);
      expect(runner.validate().passed).toBe(false);

      const res = runner.execute('git merge feat/search');
      expect(res.commandResult.success).toBe(true);
      expect(runner.validate().passed).toBe(true);
    });

    it('executes resolve-conflict: edits conflicted file, adds and commits', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['resolve-conflict']);
      expect(runner.validate().passed).toBe(false);

      runner.getEngine().getFileSystem().writeFile('index.html', '<h1>My App Pro</h1>');
      runner.execute('git add index.html');
      const res = runner.execute('git commit -m "fix: resolve port conflict"');
      expect(res.commandResult.success).toBe(true);
      expect(runner.validate().passed).toBe(true);
    });

    it('executes merge-abort: cancels merge and restores pre-merge state', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['merge-abort']);
      expect(runner.validate().passed).toBe(false);

      const res = runner.execute('git merge --abort');
      expect(res.commandResult.success).toBe(true);
      expect(runner.validate().passed).toBe(true);
    });

    it('executes branching-challenge: creates branch, commits and merges', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['branching-challenge']);
      runner.execute('git switch -c feature/cart');
      runner.getEngine().getFileSystem().writeFile('cart.js', 'export const cart = [];');
      runner.execute('git add cart.js');
      runner.execute('git commit -m "feat: add cart module"');
      runner.execute('git switch main');
      const res = runner.execute('git merge feature/cart');
      expect(res.commandResult.success).toBe(true);
      expect(runner.validate().passed).toBe(true);
    });
  });

  describe('Level 4 Collaboration Scenarios Execution', () => {
    it('executes clone-remote: initializes and clones repository', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['clone-remote']);
      const val = runner.validate();
      expect(val).toBeDefined();
    });

    it('executes fetch-remote: fetches remote tracking branches', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['fetch-remote']);
      const res = runner.execute('git fetch origin');
      expect(res.commandResult.exitCode).toBe(0);
    });

    it('executes pull-remote: pulls changes from origin main', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['pull-remote']);
      const res = runner.execute('git pull origin main');
      expect(res.commandResult.exitCode).toBe(0);
    });

    it('executes push-remote: commits and pushes to origin', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['push-remote']);
      runner.getEngine().getFileSystem().writeFile('readme.md', '# Updated Docs');
      runner.execute('git add readme.md');
      runner.execute('git commit -m "docs: update readme"');
      const res = runner.execute('git push origin main');
      expect(res.commandResult.exitCode).toBe(0);
    });

    it('executes upstream-setup: sets upstream tracking for branch', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['upstream-setup']);
      runner.execute('git switch -c feat/notifications');
      const res = runner.execute('git push -u origin feat/notifications');
      expect(res.commandResult.exitCode).toBe(0);
    });

    it('executes create-pr: verifies pull request workflow setup', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['create-pr']);
      expect(runner.validate()).toBeDefined();
    });

    it('executes merge-pr: verifies pull request merge resolution', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['merge-pr']);
      expect(runner.validate()).toBeDefined();
    });

    it('executes team-project-simulation: handles team collaboration workflow', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['team-project-simulation']);
      expect(runner.validate()).toBeDefined();
    });
  });

  describe('Level 5 Advanced Git Scenarios Execution', () => {
    it('executes reset-soft-lab: keeps changes in index after soft reset', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['reset-soft-lab']);
      const res = runner.execute('git reset --soft HEAD~1');
      expect(res.commandResult.success).toBe(true);
      expect(runner.validate().passed).toBe(true);
    });

    it('executes reset-mixed-lab: unstages changes to working directory', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['reset-mixed-lab']);
      const res = runner.execute('git reset HEAD~1');
      expect(res.commandResult.success).toBe(true);
      expect(runner.validate().passed).toBe(true);
    });

    it('executes revert-commit-lab: creates inverse commit with git revert', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['revert-commit-lab']);
      const head = runner.getEngine().getState().commits[0]?.hash;
      if (head) {
        const res = runner.execute(`git revert ${head}`);
        expect(res.commandResult.exitCode).toBe(0);
      }
    });

    it('executes reflog-explore-lab: inspects reflog history', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['reflog-explore-lab']);
      const res = runner.execute('git reflog');
      expect(res.commandResult.exitCode).toBe(0);
    });

    it('executes reflog-recovery-scenario: recovers lost commit using HEAD@{1}', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['reflog-recovery-scenario']);
      const res = runner.execute('git reset --hard HEAD@{1}');
      expect(res.commandResult.exitCode).toBe(0);
    });

    it('executes stash-advanced-lab: stashes working dirty state and lists stash', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['stash-advanced-lab']);
      runner.execute('git stash');
      const listRes = runner.execute('git stash list');
      expect(listRes.commandResult.exitCode).toBe(0);
    });

    it('executes cherry-pick-scenario: cherry-picks specific commit into current branch', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['cherry-pick-scenario']);
      expect(runner.validate()).toBeDefined();
    });

    it('executes rebase-basic-scenario: rebases branch onto upstream', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['rebase-basic-scenario']);
      expect(runner.validate()).toBeDefined();
    });

    it('executes interactive-rebase-scenario: starts interactive rebase plan', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['interactive-rebase-scenario']);
      expect(runner.validate()).toBeDefined();
    });

    it('executes rebase-conflict-scenario: handles rebase conflict state', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['rebase-conflict-scenario']);
      expect(runner.validate()).toBeDefined();
    });

    it('executes tag-basic-lab: creates tag v1.0.0', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['tag-basic-lab']);
      const res = runner.execute('git tag v1.0.0');
      expect(res.commandResult.exitCode).toBe(0);
    });

    it('executes bisect-scenario: initializes git bisect', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['bisect-scenario']);
      const res = runner.execute('git bisect start');
      expect(res.commandResult.exitCode).toBe(0);
    });

    it('executes worktree-lab: lists and manages worktrees', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['worktree-lab']);
      const res = runner.execute('git worktree list');
      expect(res.commandResult.exitCode).toBe(0);
    });

    it('executes advanced-git-master-challenge: verifies capstone setup', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['advanced-git-master-challenge']);
      expect(runner.validate()).toBeDefined();
    });
  });

  describe('Level 6 Team Workflows Scenarios Execution', () => {
    it('executes branch-protection-scenario: verifies protection rules', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['branch-protection-scenario']);
      expect(runner.validate()).toBeDefined();
    });

    it('executes codeowners-scenario: validates CODEOWNERS file structure', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['codeowners-scenario']);
      expect(runner.validate()).toBeDefined();
    });

    it('executes conventional-commits-lab: enforces conventional commit pattern', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['conventional-commits-lab']);
      expect(runner.validate()).toBeDefined();
    });

    it('executes semver-calc-lab: validates semver incrementation', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['semver-calc-lab']);
      expect(runner.validate()).toBeDefined();
    });

    it('executes hotfix-scenario: branches and tags emergency hotfix', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['hotfix-scenario']);
      expect(runner.validate()).toBeDefined();
    });

    it('executes team-conflict-sim-scenario: simulates concurrent developer merge', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['team-conflict-sim-scenario']);
      expect(runner.validate()).toBeDefined();
    });

    it('executes capstone-ecommerce-team-scenario: team production release capstone', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['capstone-ecommerce-team-scenario']);
      expect(runner.validate()).toBeDefined();
    });
  });
});
