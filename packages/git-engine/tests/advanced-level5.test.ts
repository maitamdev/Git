import { describe, it, expect, beforeEach } from 'vitest';
import { GitEngine } from '../src/engine';

describe('Level 5 Advanced Git Engine Commands (Parts 6 - 11)', () => {
  let engine: GitEngine;

  beforeEach(() => {
    engine = new GitEngine();
    engine.execute('git init');
    engine.execute('git config user.name "Student"');
    engine.execute('git config user.email "student@git.academy"');
  });

  describe('Part 7: Reflog Engine & HEAD@{n} Resolution', () => {
    it('records commits and checkouts in reflog with correct indices', () => {
      engine.execute('echo "v1" > app.js');
      engine.execute('git add app.js');
      engine.execute('git commit -m "feat: commit 1"');

      engine.execute('echo "v2" > app.js');
      engine.execute('git add app.js');
      engine.execute('git commit -m "feat: commit 2"');

      const reflogRes = engine.execute('git reflog');
      expect(reflogRes.exitCode).toBe(0);
      expect(reflogRes.stdout).toContain('HEAD@{0}: commit: feat: commit 2');
      expect(reflogRes.stdout).toContain('HEAD@{1}: commit: feat: commit 1');
    });

    it('resolves HEAD@{1} in git reset --hard to recover prior commit', () => {
      engine.execute('echo "first" > file.txt');
      engine.execute('git add file.txt');
      const c1 = engine.execute('git commit -m "first commit"');
      const c1State = engine.getState();
      const c1Hash = c1State.head.ref;

      engine.execute('echo "second" > file.txt');
      engine.execute('git add file.txt');
      engine.execute('git commit -m "second commit"');

      engine.execute('echo "third" > file.txt');
      engine.execute('git add file.txt');
      engine.execute('git commit -m "third commit"');

      // Now reset hard to HEAD@{2} which corresponds to c1
      const resetRes = engine.execute('git reset --hard HEAD@{2}');
      expect(resetRes.exitCode).toBe(0);

      const state = engine.getState();
      const currentHead = engine.getContext().stateManager.getHeadCommit();
      expect(currentHead?.message).toBe('first commit');
      expect(engine.getFileSystem().readFile('file.txt')).toBe('first');
    });
  });

  describe('Part 6: Commit --amend', () => {
    it('amends the previous commit message without changing parents', () => {
      engine.execute('echo "hello" > main.txt');
      engine.execute('git add main.txt');
      engine.execute('git commit -m "typo messge"');

      const origCommit = engine.getContext().stateManager.getHeadCommit()!;
      const amendRes = engine.execute('git commit --amend -m "feat: correct message"');
      expect(amendRes.exitCode).toBe(0);
      expect(amendRes.stdout).toContain('(amend)');

      const amendedCommit = engine.getContext().stateManager.getHeadCommit()!;
      expect(amendedCommit.message).toBe('feat: correct message');
      expect(amendedCommit.hash).not.toBe(origCommit.hash);
      expect(amendedCommit.parents).toEqual(origCommit.parents);

      // Verify reflog recorded amend
      const reflog = engine.execute('git reflog');
      expect(reflog.stdout).toContain('commit (amend): feat: correct message');
    });

    it('fails to amend when there is no commit yet', () => {
      const freshEngine = new GitEngine();
      freshEngine.execute('git init');
      const res = freshEngine.execute('git commit --amend -m "fail"');
      expect(res.exitCode).toBe(128);
      expect(res.stderr).toContain('fatal: You have nothing to amend.');
    });
  });

  describe('Part 8: Cherry-Pick Engine', () => {
    it('cherry-picks a commit onto current HEAD creating a new commit with a new hash', () => {
      engine.execute('echo "init" > README.md');
      engine.execute('git add README.md');
      engine.execute('git commit -m "Initial commit"');

      // Create feature branch
      engine.execute('git branch feature');
      engine.execute('git switch feature');
      engine.execute('echo "feature content" > feature.txt');
      engine.execute('git add feature.txt');
      engine.execute('git commit -m "feat: add feature file"');
      const featureCommit = engine.getContext().stateManager.getHeadCommit()!;

      // Switch back to main and commit something else
      engine.execute('git switch main');
      engine.execute('echo "main update" > main.txt');
      engine.execute('git add main.txt');
      engine.execute('git commit -m "main update"');
      const mainCommitBefore = engine.getContext().stateManager.getHeadCommit()!;

      // Cherry-pick feature commit onto main
      const cpRes = engine.execute(`git cherry-pick ${featureCommit.shortHash}`);
      expect(cpRes.exitCode).toBe(0);
      expect(cpRes.stdout).toContain('feat: add feature file');

      const cherryPickedCommit = engine.getContext().stateManager.getHeadCommit()!;
      // Must NOT be the same commit object or hash!
      expect(cherryPickedCommit.hash).not.toBe(featureCommit.hash);
      expect(cherryPickedCommit.message).toBe(featureCommit.message);
      expect(cherryPickedCommit.parents).toEqual([mainCommitBefore.hash]);

      // Working tree should have feature.txt
      expect(engine.getFileSystem().readFile('feature.txt')).toBe('feature content');
    });

    it('detects cherry-pick conflict when target changes conflict with HEAD', () => {
      engine.execute('echo "line 1" > config.json');
      engine.execute('git add config.json');
      engine.execute('git commit -m "base config"');

      engine.execute('git branch feat');
      engine.execute('git switch feat');
      engine.execute('echo "line 1 modified by feat" > config.json');
      engine.execute('git add config.json');
      engine.execute('git commit -m "feat config"');
      const featCommit = engine.getContext().stateManager.getHeadCommit()!;

      engine.execute('git switch main');
      engine.execute('echo "line 1 modified by main" > config.json');
      engine.execute('git add config.json');
      engine.execute('git commit -m "main config"');

      const res = engine.execute(`git cherry-pick ${featCommit.shortHash}`);
      expect(res.exitCode).toBe(1);
      expect(res.stderr).toContain('could not apply');

      const content = engine.getFileSystem().readFile('config.json');
      expect(content).toContain('<<<<<<< HEAD');
      expect(content).toContain('=======');
      expect(content).toContain('>>>>>>>');
    });
  });

  describe('Part 9: Rebase Engine & Conflict Handling', () => {
    it('rebases a feature branch linearly onto upstream branch with new hashes', () => {
      engine.execute('echo "base" > base.txt');
      engine.execute('git add base.txt');
      engine.execute('git commit -m "Initial base commit"');

      // Feature branch with 2 commits
      engine.execute('git switch -c feature');
      engine.execute('echo "feat 1" > feat1.txt');
      engine.execute('git add feat1.txt');
      engine.execute('git commit -m "feat commit 1"');
      const f1 = engine.getContext().stateManager.getHeadCommit()!;

      engine.execute('echo "feat 2" > feat2.txt');
      engine.execute('git add feat2.txt');
      engine.execute('git commit -m "feat commit 2"');
      const f2 = engine.getContext().stateManager.getHeadCommit()!;

      // Main branch advances with 1 commit
      engine.execute('git switch main');
      engine.execute('echo "main new" > main_new.txt');
      engine.execute('git add main_new.txt');
      engine.execute('git commit -m "main advanced commit"');
      const mainCommit = engine.getContext().stateManager.getHeadCommit()!;

      // Rebase feature onto main
      engine.execute('git switch feature');
      const rebaseRes = engine.execute('git rebase main');
      expect(rebaseRes.exitCode).toBe(0);
      expect(rebaseRes.stdout).toContain('Successfully rebased');

      // Check new commit chain
      const currentHead = engine.getContext().stateManager.getHeadCommit()!;
      expect(currentHead.message).toBe('feat commit 2');
      expect(currentHead.hash).not.toBe(f2.hash);

      const parentOfHead = engine.getContext().stateManager.getCommit(currentHead.parents[0])!;
      expect(parentOfHead.message).toBe('feat commit 1');
      expect(parentOfHead.hash).not.toBe(f1.hash);

      expect(parentOfHead.parents[0]).toBe(mainCommit.hash);
    });

    it('pauses rebase on conflict and resumes with git rebase --continue', () => {
      engine.execute('echo "original" > shared.txt');
      engine.execute('git add shared.txt');
      engine.execute('git commit -m "initial shared"');

      engine.execute('git switch -c feature');
      engine.execute('echo "feature update" > shared.txt');
      engine.execute('git add shared.txt');
      engine.execute('git commit -m "feature update"');

      engine.execute('git switch main');
      engine.execute('echo "main update" > shared.txt');
      engine.execute('git add shared.txt');
      engine.execute('git commit -m "main update"');

      engine.execute('git switch feature');
      const rebaseRes = engine.execute('git rebase main');
      expect(rebaseRes.exitCode).toBe(1);
      expect(rebaseRes.stderr).toContain('CONFLICT');

      // Rebase state should be paused
      const rebaseState = engine.getContext().stateManager.getRebaseState();
      expect(rebaseState).not.toBeNull();
      expect(rebaseState?.status).toBe('paused');

      // Student resolves conflict manually
      engine.getFileSystem().writeFile('shared.txt', 'resolved content\n');
      engine.execute('git add shared.txt');

      const continueRes = engine.execute('git rebase --continue');
      expect(continueRes.exitCode).toBe(0);
      expect(continueRes.stdout).toContain('Successfully rebased');

      expect(engine.getContext().stateManager.getRebaseState()).toBeNull();
      expect(engine.getFileSystem().readFile('shared.txt')).toBe('resolved content\n');
    });

    it('aborts rebase on --abort returning to original HEAD', () => {
      engine.execute('echo "original" > file.txt');
      engine.execute('git add file.txt');
      engine.execute('git commit -m "c0"');

      engine.execute('git switch -c feat');
      engine.execute('echo "feat" > file.txt');
      engine.execute('git add file.txt');
      engine.execute('git commit -m "feat c"');
      const featHead = engine.getContext().stateManager.getHeadCommit()!;

      engine.execute('git switch main');
      engine.execute('echo "main" > file.txt');
      engine.execute('git add file.txt');
      engine.execute('git commit -m "main c"');

      engine.execute('git switch feat');
      engine.execute('git rebase main');

      const abortRes = engine.execute('git rebase --abort');
      expect(abortRes.exitCode).toBe(0);

      const currentHead = engine.getContext().stateManager.getHeadCommit()!;
      expect(currentHead.hash).toBe(featHead.hash);
      expect(engine.getContext().stateManager.getRebaseState()).toBeNull();
    });

    it('performs interactive rebase with squash to combine commits', () => {
      engine.execute('echo "v1" > app.js');
      engine.execute('git add app.js');
      engine.execute('git commit -m "feat: init app"');

      engine.execute('git switch -c feature');
      engine.execute('echo "v2 part 1" > part1.js');
      engine.execute('git add part1.js');
      engine.execute('git commit -m "part 1"');
      const p1 = engine.getContext().stateManager.getHeadCommit()!;

      engine.execute('echo "v2 part 2" > part2.js');
      engine.execute('git add part2.js');
      engine.execute('git commit -m "part 2"');
      const p2 = engine.getContext().stateManager.getHeadCommit()!;

      // Start interactive rebase
      engine.execute('git rebase -i main');
      const rebaseState = engine.getContext().stateManager.getRebaseState()!;
      expect(rebaseState).not.toBeNull();
      expect(rebaseState.interactivePlan).toBeDefined();

      // Configure plan: pick part 1, squash part 2
      rebaseState.interactivePlan = [
        { action: 'pick', commitHash: p1.hash, shortHash: p1.shortHash, message: p1.message },
        { action: 'squash', commitHash: p2.hash, shortHash: p2.shortHash, message: p2.message },
      ];
      rebaseState.remainingCommits = [p1.hash, p2.hash];
      engine.getContext().stateManager.setRebaseState(rebaseState);

      const res = engine.execute('git rebase --continue');
      expect(res.exitCode).toBe(0);

      // Now HEAD should be a single squashed commit containing both files!
      const head = engine.getContext().stateManager.getHeadCommit()!;
      expect(head.message).toContain('part 1');
      expect(head.message).toContain('part 2');
      expect(head.tree['part1.js']).toBe('v2 part 1');
      expect(head.tree['part2.js']).toBe('v2 part 2');
    });
  });

  describe('Part 6: Tag Command', () => {
    it('creates and lists lightweight and annotated tags', () => {
      engine.execute('echo "v1" > app.js');
      engine.execute('git add app.js');
      engine.execute('git commit -m "Release 1.0.0"');

      // Lightweight tag
      const t1 = engine.execute('git tag v1.0.0');
      expect(t1.exitCode).toBe(0);

      // Annotated tag
      const t2 = engine.execute('git tag -a v1.1.0 -m "Release version 1.1.0 with bugfixes"');
      expect(t2.exitCode).toBe(0);

      const listRes = engine.execute('git tag');
      expect(listRes.stdout).toContain('v1.0.0');
      expect(listRes.stdout).toContain('v1.1.0');

      const tagObj = engine.getContext().stateManager.getTag('v1.1.0');
      expect(tagObj?.annotated).toBe(true);
      expect(tagObj?.message).toBe('Release version 1.1.0 with bugfixes');

      const annotatedShow = engine.execute('git show v1.1.0');
      const lightweightShow = engine.execute('git show v1.0.0');
      expect(annotatedShow.stdout).toContain('Tagger:');
      expect(annotatedShow.stdout).toContain('Release version 1.1.0 with bugfixes');
      expect(lightweightShow.stdout).not.toContain('Tagger:');
    });

    it('deletes an existing tag with git tag -d', () => {
      engine.execute('echo "v" > a.txt');
      engine.execute('git add a.txt');
      engine.execute('git commit -m "a"');
      engine.execute('git tag to-delete');

      const delRes = engine.execute('git tag -d to-delete');
      expect(delRes.exitCode).toBe(0);
      expect(delRes.stdout).toContain("Deleted tag 'to-delete'");

      const listRes = engine.execute('git tag');
      expect(listRes.stdout).not.toContain('to-delete');
    });
  });

  describe('Part 11: Git Bisect Engine', () => {
    it('locates the first bad commit across multiple commits', () => {
      // Create a sequence of 5 commits: A, B, C, D (bug introduced), E (bad)
      engine.execute('echo "v1" > f.txt');
      engine.execute('git add f.txt');
      engine.execute('git commit -m "commit 1 - good"');
      const commit1 = engine.getContext().stateManager.getHeadCommit()!;

      engine.execute('echo "v2" > f.txt');
      engine.execute('git add f.txt');
      engine.execute('git commit -m "commit 2 - good"');

      engine.execute('echo "v3" > f.txt');
      engine.execute('git add f.txt');
      engine.execute('git commit -m "commit 3 - good"');

      engine.execute('echo "v4 bug" > f.txt');
      engine.execute('git add f.txt');
      engine.execute('git commit -m "commit 4 - bug introduced"');
      const bugCommit = engine.getContext().stateManager.getHeadCommit()!;

      engine.execute('echo "v5 still broken" > f.txt');
      engine.execute('git add f.txt');
      engine.execute('git commit -m "commit 5 - broken"');

      // Start bisect
      const startRes = engine.execute('git bisect start');
      expect(startRes.exitCode).toBe(0);

      // Mark HEAD as bad
      engine.execute('git bisect bad');

      // Mark commit 1 as good
      const goodRes = engine.execute(`git bisect good ${commit1.shortHash}`);
      expect(goodRes.exitCode).toBe(0);
      expect(goodRes.stdout).toContain('Bisecting:');

      // Midpoint is commit 4 (has bug), student discovers bug and marks it bad
      const badRes = engine.execute('git bisect bad');
      expect(badRes.stdout).toContain('Bisecting:');

      // Now midpoint is commit 3 (good, bug not present), student marks it good
      const finalRes = engine.execute('git bisect good');
      expect(finalRes.stdout).toContain(`${bugCommit.hash} is the first bad commit`);

      // Reset bisect
      const resetRes = engine.execute('git bisect reset');
      expect(resetRes.exitCode).toBe(0);
      expect(resetRes.stdout).toContain("Switched to branch 'main'");
    });
  });

  describe('Part 6: Git Worktree Command', () => {
    it('adds, lists, and removes linked worktrees', () => {
      engine.execute('echo "root" > file.txt');
      engine.execute('git add file.txt');
      engine.execute('git commit -m "root commit"');

      const addRes = engine.execute('git worktree add /workspace/hotfix hotfix-branch');
      expect(addRes.exitCode).toBe(0);
      expect(addRes.stdout).toContain("checking out 'hotfix-branch'");

      const listRes = engine.execute('git worktree list');
      expect(listRes.stdout).toContain('/workspace/hotfix');
      expect(listRes.stdout).toContain('[hotfix-branch]');

      const rmRes = engine.execute('git worktree remove /workspace/hotfix');
      expect(rmRes.exitCode).toBe(0);

      const listAfter = engine.execute('git worktree list');
      expect(listAfter.stdout).not.toContain('/workspace/hotfix');
    });
  });
});
