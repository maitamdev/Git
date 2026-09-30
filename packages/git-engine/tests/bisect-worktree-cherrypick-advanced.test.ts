import { describe, it, expect, beforeEach } from 'vitest';
import { GitEngine } from '../src/engine';

describe('Advanced Bisect, Worktree, and Cherry-Pick Engine Suites', () => {
  let engine: GitEngine;

  beforeEach(() => {
    engine = new GitEngine();
    engine.execute('git init');
    engine.execute('git config user.name "Advanced Tester"');
    engine.execute('git config user.email "advanced@gitacademy.vn"');
  });

  describe('Git Bisect Deep State Machine', () => {
    it('returns error 128 if repo is uninitialized', () => {
      const fresh = new GitEngine();
      const res = fresh.execute('git bisect start');
      expect(res.exitCode).toBe(128);
    });

    it('starts bisect session and records active status', () => {
      engine.execute('echo "1" > f.txt');
      engine.execute('git add f.txt');
      engine.execute('git commit -m "init"');

      const res = engine.execute('git bisect start');
      expect(res.exitCode).toBe(0);
      expect(res.stdout).toContain('status: waiting for both good and bad commits');
    });

    it('handles binary search across 7 commits to pinpoint culprit commit', () => {
      // Create sequence of 7 commits: c1..c7, bug introduced in c4
      const commitHashes: string[] = [];
      for (let i = 1; i <= 7; i++) {
        const content = i >= 4 ? `bug content step ${i}` : `clean content step ${i}`;
        engine.execute(`echo "${content}" > test.txt`);
        engine.execute('git add test.txt');
        engine.execute(`git commit -m "commit ${i}"`);
        commitHashes.push(engine.getContext().stateManager.getHeadCommit()!.hash);
      }

      const c1Hash = commitHashes[0];
      const culpritHash = commitHashes[3]; // commit 4

      // 1. Start bisect
      engine.execute('git bisect start');

      // 2. Mark HEAD as bad
      const badRes = engine.execute('git bisect bad');
      expect(badRes.exitCode).toBe(0);

      // 3. Mark c1 as good
      const goodRes = engine.execute(`git bisect good ${c1Hash.slice(0, 7)}`);
      expect(goodRes.exitCode).toBe(0);
      expect(goodRes.stdout).toContain('Bisecting:');

      // Midpoint between c1 and c7 is commit 5
      let headMsg = engine.getContext().stateManager.getHeadCommit()?.message;
      expect(headMsg).toBe('commit 5');

      // Student checks file: has bug! Mark bad
      const step2 = engine.execute('git bisect bad');
      expect(step2.exitCode).toBe(0);

      // Midpoint between c1 and c5 is commit 4
      headMsg = engine.getContext().stateManager.getHeadCommit()?.message;
      expect(headMsg).toBe('commit 4');

      // Student checks file: has bug! Mark bad
      const step3 = engine.execute('git bisect bad');
      expect(step3.exitCode).toBe(0);

      // Midpoint between c1 and c4 is commit 3
      headMsg = engine.getContext().stateManager.getHeadCommit()?.message;
      expect(headMsg).toBe('commit 3');

      // Student tests file: clean! Mark good
      const finalRes = engine.execute('git bisect good');

      // Final diagnosis must identify culprit commit 4
      expect(finalRes.stdout).toContain(`${culpritHash} is the first bad commit`);

      // Reset bisect returns to main
      const resetRes = engine.execute('git bisect reset');
      expect(resetRes.exitCode).toBe(0);
      expect(engine.getState().currentBranch).toBe('main');
    });

    it('prints bisect log history with git bisect log', () => {
      engine.execute('echo "a" > a.txt');
      engine.execute('git add a.txt');
      engine.execute('git commit -m "c1"');
      const c1 = engine.getContext().stateManager.getHeadCommit()!.shortHash;

      engine.execute('echo "b" > a.txt');
      engine.execute('git add a.txt');
      engine.execute('git commit -m "c2"');

      engine.execute('git bisect start');
      engine.execute('git bisect bad');
      engine.execute(`git bisect good ${c1}`);

      const logRes = engine.execute('git bisect log');
      expect(logRes.exitCode).toBe(0);
      expect(logRes.stdout).toContain('git bisect start');
      expect(logRes.stdout).toContain('git bisect bad');
    });
  });

  describe('Git Worktree Deep Management', () => {
    it('returns error if missing path or branch arguments', () => {
      engine.execute('echo "init" > f.txt');
      engine.execute('git add f.txt');
      engine.execute('git commit -m "init"');

      const res1 = engine.execute('git worktree add');
      expect(res1.exitCode).toBe(1);
      expect(res1.stderr).toContain('fatal: missing worktree path');

      const res2 = engine.execute('git worktree add /path');
      expect(res2.exitCode).toBe(1);
      expect(res2.stderr).toContain('fatal: missing branch name');
    });

    it('rejects adding a worktree with an already checked out branch', () => {
      engine.execute('echo "init" > f.txt');
      engine.execute('git add f.txt');
      engine.execute('git commit -m "init"');

      const res = engine.execute('git worktree add /workspace/other main');
      expect(res.exitCode).toBe(1);
      expect(res.stderr).toContain("already checked out");
    });

    it('creates multiple linked worktrees and lists them', () => {
      engine.execute('echo "main code" > main.js');
      engine.execute('git add main.js');
      engine.execute('git commit -m "feat: main initial"');

      const add1 = engine.execute('git worktree add /workspace/hotfix hotfix/fix-auth');
      expect(add1.exitCode).toBe(0);

      const add2 = engine.execute('git worktree add /workspace/release release/v1.0');
      expect(add2.exitCode).toBe(0);

      const listRes = engine.execute('git worktree list');
      expect(listRes.stdout).toContain('/workspace/hotfix');
      expect(listRes.stdout).toContain('hotfix/fix-auth');
      expect(listRes.stdout).toContain('/workspace/release');
      expect(listRes.stdout).toContain('release/v1.0');
    });

    it('removes worktree with git worktree remove', () => {
      engine.execute('echo "main code" > main.js');
      engine.execute('git add main.js');
      engine.execute('git commit -m "feat: main initial"');

      engine.execute('git worktree add /workspace/temp temp-branch');
      expect(engine.execute('git worktree list').stdout).toContain('/workspace/temp');

      const rmRes = engine.execute('git worktree remove /workspace/temp');
      expect(rmRes.exitCode).toBe(0);

      const listAfter = engine.execute('git worktree list');
      expect(listAfter.stdout).not.toContain('/workspace/temp');
    });

    it('returns error when removing non-existent worktree path', () => {
      engine.execute('echo "a" > a.txt');
      engine.execute('git add a.txt');
      engine.execute('git commit -m "init"');

      const res = engine.execute('git worktree remove /non/existent/path');
      expect(res.exitCode).toBe(128);
      expect(res.stderr).toContain('not a valid worktree');
    });
  });

  describe('Git Cherry-Pick Deep Engine', () => {
    it('returns error 128 if repo is uninitialized', () => {
      const fresh = new GitEngine();
      const res = fresh.execute('git cherry-pick a1b2c3d');
      expect(res.exitCode).toBe(128);
    });

    it('returns error 1 if no commit argument is passed', () => {
      engine.execute('echo "a" > a.txt');
      engine.execute('git add a.txt');
      engine.execute('git commit -m "init"');

      const res = engine.execute('git cherry-pick');
      expect(res.exitCode).toBe(1);
      expect(res.stderr).toContain('fatal: no commit specified to cherry-pick');
    });

    it('returns error 128 if commit cannot be resolved', () => {
      engine.execute('echo "a" > a.txt');
      engine.execute('git add a.txt');
      engine.execute('git commit -m "init"');

      const res = engine.execute('git cherry-pick nonexistent123');
      expect(res.exitCode).toBe(128);
      expect(res.stderr).toContain('bad revision');
    });

    it('cherry-picks a commit cleanly onto a different branch', () => {
      // Baseline on main
      engine.execute('echo "base" > base.txt');
      engine.execute('git add base.txt');
      engine.execute('git commit -m "C1: baseline"');

      // Feature branch with targeted bugfix commit
      engine.execute('git switch -c feature/payments');
      engine.execute('echo "security fix" > security.patch');
      engine.execute('git add security.patch');
      engine.execute('git commit -m "fix(sec): patch jwt vulnerability"');
      const patchHash = engine.getContext().stateManager.getHeadCommit()!.shortHash;

      // Other feature commit
      engine.execute('echo "ui update" > ui.txt');
      engine.execute('git add ui.txt');
      engine.execute('git commit -m "feat(ui): update payment button"');

      // Switch to main first before creating hotfix branch
      engine.execute('git switch main');
      engine.execute('git switch -c hotfix/urgent-patch');
      expect(engine.getFileSystem().readFile('security.patch')).toBeNull();

      // Cherry-pick only the security patch
      const cpRes = engine.execute(`git cherry-pick ${patchHash}`);
      expect(cpRes.exitCode).toBe(0);
      expect(cpRes.stdout).toContain('patch jwt vulnerability');

      // Verify file is in hotfix branch
      expect(engine.getFileSystem().readFile('security.patch')).toBe('security fix');
      expect(engine.getFileSystem().readFile('ui.txt')).toBeNull(); // other commit was not picked

      // Latest commit on hotfix has the cherry-picked message
      const latestHead = engine.getContext().stateManager.getHeadCommit();
      expect(latestHead?.message).toBe('fix(sec): patch jwt vulnerability');
    });

    it('detects conflict during cherry-pick and injects conflict markers', () => {
      engine.execute('echo "version 1" > config.ini');
      engine.execute('git add config.ini');
      engine.execute('git commit -m "base"');

      engine.execute('git switch -c feat/custom');
      engine.execute('echo "custom setting = 99" > config.ini');
      engine.execute('git add config.ini');
      engine.execute('git commit -m "custom config"');
      const featHash = engine.getContext().stateManager.getHeadCommit()!.shortHash;

      engine.execute('git switch main');
      engine.execute('echo "main setting = 42" > config.ini');
      engine.execute('git add config.ini');
      engine.execute('git commit -m "main config update"');

      // Cherry-pick conflicting commit
      const cpRes = engine.execute(`git cherry-pick ${featHash}`);
      expect(cpRes.exitCode).toBe(1);
      expect(cpRes.stderr).toContain('error: could not apply');

      const content = engine.getFileSystem().readFile('config.ini');
      expect(content).toContain('<<<<<<<');
      expect(content).toContain('=======');
      expect(content).toContain('>>>>>>>');
    });
  });

  describe('Reflog Inspection & Time Travel Recovery', () => {
    it('records commits, branch switches, resets, and tags in reflog', () => {
      engine.execute('echo "v1" > f.txt');
      engine.execute('git add f.txt');
      engine.execute('git commit -m "first"');

      engine.execute('echo "v2" > f.txt');
      engine.execute('git add f.txt');
      engine.execute('git commit -m "second"');

      engine.execute('git switch -c feat/new');
      engine.execute('git switch main');

      const reflogRes = engine.execute('git reflog');
      expect(reflogRes.exitCode).toBe(0);
      expect(reflogRes.stdout).toContain('HEAD@{0}');
      expect(reflogRes.stdout).toContain('HEAD@{1}');
    });

    it('recovers an orphaned commit after accidental hard reset using HEAD@{1}', () => {
      engine.execute('echo "good code" > important.ts');
      engine.execute('git add important.ts');
      engine.execute('git commit -m "feat: important work"');
      const goodHash = engine.getContext().stateManager.getHeadCommit()!.hash;

      engine.execute('echo "more code" > other.ts');
      engine.execute('git add other.ts');
      engine.execute('git commit -m "feat: second work"');

      // Disaster: accidentally reset --hard to HEAD~1
      engine.execute('git reset --hard HEAD~1');
      expect(engine.getContext().stateManager.getHeadCommit()?.hash).toBe(goodHash);

      // Now recover the undone commit via HEAD@{1}
      const recoverRes = engine.execute('git reset --hard HEAD@{1}');
      expect(recoverRes.exitCode).toBe(0);
      expect(engine.getFileSystem().readFile('other.ts')).toBe('more code');
    });
  });
});
