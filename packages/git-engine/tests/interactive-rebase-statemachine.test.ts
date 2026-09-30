import { describe, it, expect, beforeEach } from 'vitest';
import { GitEngine } from '../src/engine';

describe('Interactive Rebase State Machine & Replay Engine', () => {
  let engine: GitEngine;

  beforeEach(() => {
    engine = new GitEngine();
    engine.execute('git init');
    engine.execute('git config user.name "Rebase Tester"');
    engine.execute('git config user.email "tester@gitacademy.vn"');
  });

  describe('Preconditions and Guard Rails', () => {
    it('returns error 128 if repo is uninitialized', () => {
      const freshEngine = new GitEngine();
      const res = freshEngine.execute('git rebase main');
      expect(res.exitCode).toBe(128);
      expect(res.stderr).toContain('not a git repository');
    });

    it('returns error 1 if no upstream branch specified', () => {
      engine.execute('echo "a" > a.txt');
      engine.execute('git add a.txt');
      engine.execute('git commit -m "feat: init"');

      const res = engine.execute('git rebase');
      expect(res.exitCode).toBe(1);
      expect(res.stderr).toContain('No upstream branch specified');
    });

    it('returns error 128 if upstream branch does not exist', () => {
      engine.execute('echo "a" > a.txt');
      engine.execute('git add a.txt');
      engine.execute('git commit -m "feat: init"');

      const res = engine.execute('git rebase non-existent-branch');
      expect(res.exitCode).toBe(128);
      expect(res.stderr).toContain('invalid upstream');
    });

    it('returns error 1 if --abort is called with no active rebase', () => {
      const res = engine.execute('git rebase --abort');
      expect(res.exitCode).toBe(1);
      expect(res.stderr).toContain('No rebase in progress?');
    });

    it('returns error 1 if --continue is called with no active rebase', () => {
      const res = engine.execute('git rebase --continue');
      expect(res.exitCode).toBe(1);
      expect(res.stderr).toContain('No rebase in progress?');
    });

    it('returns error 1 if --skip is called with no active rebase', () => {
      const res = engine.execute('git rebase --skip');
      expect(res.exitCode).toBe(1);
      expect(res.stderr).toContain('No rebase in progress?');
    });

    it('reports up to date when current branch is already at upstream commit', () => {
      engine.execute('echo "a" > a.txt');
      engine.execute('git add a.txt');
      engine.execute('git commit -m "feat: init"');

      const res = engine.execute('git rebase main');
      expect(res.exitCode).toBe(0);
      expect(res.stdout).toContain('is up to date');
    });
  });

  describe('Interactive Rebase (-i) Setup and Paused State', () => {
    it('initializes interactive rebase with paused status and todo list', () => {
      // 1. Initial base commit on main
      engine.execute('echo "v1" > base.txt');
      engine.execute('git add base.txt');
      engine.execute('git commit -m "feat: base commit"');

      // 2. Feature branch with 2 commits
      engine.execute('git switch -c feature/auth');
      engine.execute('echo "login" > auth.js');
      engine.execute('git add auth.js');
      engine.execute('git commit -m "feat: login function"');

      engine.execute('echo "logout" >> auth.js');
      engine.execute('git add auth.js');
      engine.execute('git commit -m "feat: logout function"');

      // Start interactive rebase onto main
      const res = engine.execute('git rebase -i main');
      expect(res.exitCode).toBe(0);
      expect(res.stdout).toContain('Interactive rebase in progress');
      expect(res.stdout).toContain('pick');
      expect(res.stdout).toContain("Run 'git rebase --continue' when ready");

      const rebaseState = engine.getContext().stateManager.getRebaseState();
      expect(rebaseState).not.toBeNull();
      expect(rebaseState?.inProgress).toBe(true);
      expect(rebaseState?.status).toBe('paused');
      expect(rebaseState?.upstreamBranch).toBe('main');
      expect(rebaseState?.interactivePlan).toHaveLength(2);
      expect(rebaseState?.interactivePlan?.[0].action).toBe('pick');
    });

    it('blocks starting a new rebase while one is already in progress', () => {
      engine.execute('echo "v1" > f.txt');
      engine.execute('git add f.txt');
      engine.execute('git commit -m "c1"');

      engine.execute('git switch -c feat');
      engine.execute('echo "v2" > f2.txt');
      engine.execute('git add f2.txt');
      engine.execute('git commit -m "c2"');

      engine.execute('git rebase -i main');
      const secondRebase = engine.execute('git rebase main');
      expect(secondRebase.exitCode).toBe(1);
      expect(secondRebase.stderr).toContain('already in progress');
    });
  });

  describe('Interactive Rebase Abort Flow', () => {
    it('restores original branch and original HEAD upon --abort', () => {
      engine.execute('echo "base" > base.txt');
      engine.execute('git add base.txt');
      engine.execute('git commit -m "base commit"');

      engine.execute('git switch -c feature/test');
      engine.execute('echo "test code" > test.txt');
      engine.execute('git add test.txt');
      engine.execute('git commit -m "feat: add test code"');

      const originalHead = engine.getContext().stateManager.getHeadCommit()?.hash;

      engine.execute('git rebase -i main');
      expect(engine.getContext().stateManager.getRebaseState()?.inProgress).toBe(true);

      const abortRes = engine.execute('git rebase --abort');
      expect(abortRes.exitCode).toBe(0);

      // Rebase state should be cleared
      expect(engine.getContext().stateManager.getRebaseState()).toBeNull();

      // Branch and commit should be back to feature/test at original HEAD
      expect(engine.getState().currentBranch).toBe('feature/test');
      expect(engine.getContext().stateManager.getHeadCommit()?.hash).toBe(originalHead);
      expect(engine.getFileSystem().readFile('test.txt')).toBe('test code');
    });
  });

  describe('Interactive Rebase Continue and Replay', () => {
    it('replays clean commits sequentially when --continue is called', () => {
      // Main branch: C1 -> C2
      engine.execute('echo "base" > base.txt');
      engine.execute('git add base.txt');
      engine.execute('git commit -m "C1: init"');

      engine.execute('git switch -c feat/work');
      engine.execute('echo "step1" > step1.txt');
      engine.execute('git add step1.txt');
      engine.execute('git commit -m "C3: step 1"');

      engine.execute('echo "step2" > step2.txt');
      engine.execute('git add step2.txt');
      engine.execute('git commit -m "C4: step 2"');

      // Update main in the meantime
      engine.execute('git switch main');
      engine.execute('echo "main update" > update.txt');
      engine.execute('git add update.txt');
      engine.execute('git commit -m "C2: main advance"');

      // Switch back and rebase interactively
      engine.execute('git switch feat/work');
      engine.execute('git rebase -i main');

      // Continue to apply plan
      const contRes = engine.execute('git rebase --continue');
      expect(contRes.exitCode).toBe(0);
      expect(contRes.stdout).toContain('Successfully rebased and updated');

      // Working tree should contain files from both main and feat/work
      expect(engine.getFileSystem().readFile('base.txt')).toBe('base');
      expect(engine.getFileSystem().readFile('update.txt')).toBe('main update');
      expect(engine.getFileSystem().readFile('step1.txt')).toBe('step1');
      expect(engine.getFileSystem().readFile('step2.txt')).toBe('step2');

      // Rebase state cleared
      expect(engine.getContext().stateManager.getRebaseState()).toBeNull();
    });
  });

  describe('Rebase Conflict State Machine', () => {
    it('detects merge conflict, pauses rebase, and injects conflict markers', () => {
      engine.execute('echo "line 1" > shared.txt');
      engine.execute('git add shared.txt');
      engine.execute('git commit -m "base commit"');

      engine.execute('git switch -c feat/conflict');
      engine.execute('echo "feature version" > shared.txt');
      engine.execute('git add shared.txt');
      engine.execute('git commit -m "feature change"');

      engine.execute('git switch main');
      engine.execute('echo "main divergent version" > shared.txt');
      engine.execute('git add shared.txt');
      engine.execute('git commit -m "main change"');

      engine.execute('git switch feat/conflict');
      const rebaseRes = engine.execute('git rebase main');

      expect(rebaseRes.exitCode).toBe(1);
      expect(rebaseRes.stderr).toContain('CONFLICT');
      expect(rebaseRes.stderr).toContain('could not apply');

      // Check conflict markers in working tree
      const content = engine.getFileSystem().readFile('shared.txt');
      expect(content).toContain('<<<<<<<');
      expect(content).toContain('=======');
      expect(content).toContain('>>>>>>>');

      // State is paused with conflict
      const rebaseState = engine.getContext().stateManager.getRebaseState();
      expect(rebaseState?.inProgress).toBe(true);
      expect(rebaseState?.status).toBe('paused');
      expect(rebaseState?.conflicts).toHaveLength(1);
    });

    it('rejects --continue if conflicts are still unresolved in files', () => {
      engine.execute('echo "init" > doc.md');
      engine.execute('git add doc.md');
      engine.execute('git commit -m "c1"');

      engine.execute('git switch -c branch-a');
      engine.execute('echo "alpha" > doc.md');
      engine.execute('git add doc.md');
      engine.execute('git commit -m "alpha"');

      engine.execute('git switch main');
      engine.execute('echo "beta" > doc.md');
      engine.execute('git add doc.md');
      engine.execute('git commit -m "beta"');

      engine.execute('git switch branch-a');
      engine.execute('git rebase main');

      // Attempt continue while <<<<<<< is still present
      const failCont = engine.execute('git rebase --continue');
      expect(failCont.exitCode).toBe(1);
      expect(failCont.stderr).toContain('unresolved conflicts');
    });

    it('completes rebase when user resolves conflict and runs --continue', () => {
      engine.execute('echo "init" > doc.md');
      engine.execute('git add doc.md');
      engine.execute('git commit -m "c1"');

      engine.execute('git switch -c branch-b');
      engine.execute('echo "branch modification" > doc.md');
      engine.execute('git add doc.md');
      engine.execute('git commit -m "branch commit"');

      engine.execute('git switch main');
      engine.execute('echo "main modification" > doc.md');
      engine.execute('git add doc.md');
      engine.execute('git commit -m "main commit"');

      engine.execute('git switch branch-b');
      engine.execute('git rebase main');

      // Resolve conflict by manually writing clean content
      engine.getFileSystem().writeFile('doc.md', 'resolved: main + branch integrated');
      engine.execute('git add doc.md');

      const successCont = engine.execute('git rebase --continue');
      expect(successCont.exitCode).toBe(0);
      expect(successCont.stdout).toContain('Successfully rebased');
      expect(engine.getContext().stateManager.getRebaseState()).toBeNull();
      expect(engine.getFileSystem().readFile('doc.md')).toBe('resolved: main + branch integrated');
    });

    it('skips conflicting commit with --skip', () => {
      engine.execute('echo "v1" > x.txt');
      engine.execute('git add x.txt');
      engine.execute('git commit -m "base"');

      engine.execute('git switch -c feature/skippable');
      engine.execute('echo "conflicting change" > x.txt');
      engine.execute('git add x.txt');
      engine.execute('git commit -m "skippable commit"');

      engine.execute('git switch main');
      engine.execute('echo "upstream divergent" > x.txt');
      engine.execute('git add x.txt');
      engine.execute('git commit -m "upstream advance"');

      engine.execute('git switch feature/skippable');
      engine.execute('git rebase main');

      // Skip the commit
      const skipRes = engine.execute('git rebase --skip');
      expect(skipRes.exitCode).toBe(0);
      expect(engine.getContext().stateManager.getRebaseState()).toBeNull();
      expect(engine.getFileSystem().readFile('x.txt')).toBe('upstream divergent');
    });
  });
});
