import { describe, it, expect, beforeEach } from 'vitest';
import { GitEngine } from '../src/engine';

describe('Advanced Git Commands & VFS Operations', () => {
  let engine: GitEngine;

  beforeEach(() => {
    engine = new GitEngine();
    engine.execute('git init');
  });

  describe('git diff', () => {
    it('should show unstaged changes against HEAD', () => {
      engine.getFileSystem().writeFile('app.js', 'const title = "Old";');
      engine.execute('git add app.js');
      engine.execute('git commit -m "init"');

      // Modify without adding
      engine.getFileSystem().writeFile('app.js', 'const title = "New";');

      const diffRes = engine.execute('git diff');
      expect(diffRes.success).toBe(true);
      expect(diffRes.stdout).toContain('--- a/app.js');
      expect(diffRes.stdout).toContain('+++ b/app.js');
      expect(diffRes.stdout).toContain('-const title = "Old";');
      expect(diffRes.stdout).toContain('+const title = "New";');
    });

    it('should show staged changes with git diff --staged', () => {
      engine.getFileSystem().writeFile('login.ts', 'const x = 1;');
      engine.execute('git add login.ts');
      engine.execute('git commit -m "add login"');

      engine.getFileSystem().writeFile('login.ts', 'const x = 2;');
      engine.execute('git add login.ts');

      const diffStaged = engine.execute('git diff --staged');
      expect(diffStaged.success).toBe(true);
      expect(diffStaged.stdout).toContain('-const x = 1;');
      expect(diffStaged.stdout).toContain('+const x = 2;');
    });
  });

  describe('branch switching and detached HEAD', () => {
    it('checks out an older commit without moving the branch and switches back safely', () => {
      engine.getFileSystem().writeFile('app.js', 'version one');
      engine.execute('git add app.js');
      engine.execute('git commit -m "first version"');
      const firstCommit = engine.getState().commits[0];

      engine.getFileSystem().writeFile('app.js', 'version two');
      engine.execute('git add app.js');
      engine.execute('git commit -m "second version"');

      const detached = engine.execute(`git checkout ${firstCommit.shortHash}`);
      expect(detached.success).toBe(true);
      expect(engine.getState().head.type).toBe('detached');
      expect(engine.getFileSystem().readFile('app.js')).toBe('version one');
      expect(engine.execute('git status').stdout).toContain('HEAD detached at');

      const backToMain = engine.execute('git switch main');
      expect(backToMain.success).toBe(true);
      expect(engine.getState().head).toEqual({ type: 'branch', ref: 'main' });
      expect(engine.getFileSystem().readFile('app.js')).toBe('version two');
    });

    it('refuses a branch switch that would overwrite local changes', () => {
      engine.getFileSystem().writeFile('app.js', 'base');
      engine.execute('git add app.js');
      engine.execute('git commit -m "base"');
      engine.execute('git switch -c feature');
      engine.getFileSystem().writeFile('app.js', 'feature version');
      engine.execute('git add app.js');
      engine.execute('git commit -m "feature change"');
      engine.execute('git switch main');
      engine.getFileSystem().writeFile('app.js', 'uncommitted local edit');

      const switched = engine.execute('git switch feature');
      expect(switched.success).toBe(false);
      expect(switched.stderr).toContain('would be overwritten');
      expect(engine.getState().currentBranch).toBe('main');
      expect(engine.getFileSystem().readFile('app.js')).toBe('uncommitted local edit');
    });

    it('maps legacy checkout -- file syntax to git restore', () => {
      engine.getFileSystem().writeFile('app.js', 'committed');
      engine.execute('git add app.js');
      engine.execute('git commit -m "save file"');
      engine.getFileSystem().writeFile('app.js', 'local edit');

      const restored = engine.execute('git checkout -- app.js');
      expect(restored.success).toBe(true);
      expect(engine.getFileSystem().readFile('app.js')).toBe('committed');
    });
  });

  describe('git restore', () => {
    it('should discard unstaged changes in working tree', () => {
      engine.getFileSystem().writeFile('file.txt', 'clean content');
      engine.execute('git add file.txt');
      engine.execute('git commit -m "clean commit"');

      // Mess up file
      engine.getFileSystem().writeFile('file.txt', 'dirty content');
      expect(engine.getFileSystem().readFile('file.txt')).toBe('dirty content');

      const restoreRes = engine.execute('git restore file.txt');
      expect(restoreRes.success).toBe(true);
      expect(engine.getFileSystem().readFile('file.txt')).toBe('clean content');
    });

    it('should unstage staged changes with git restore --staged', () => {
      engine.getFileSystem().writeFile('data.json', '{"v":1}');
      engine.execute('git add data.json');
      engine.execute('git commit -m "base"');

      engine.getFileSystem().writeFile('data.json', '{"v":2}');
      engine.execute('git add data.json');
      expect(engine.getState().stagingArea.length).toBe(1);

      const restoreStaged = engine.execute('git restore --staged data.json');
      expect(restoreStaged.success).toBe(true);
      expect(engine.getState().stagingArea.length).toBe(0);
      expect(engine.getFileSystem().readFile('data.json')).toBe('{"v":2}');
    });
  });

  describe('git rm & git mv', () => {
    it('should remove file and stage deletion', () => {
      engine.getFileSystem().writeFile('temp.txt', 'delete me');
      engine.execute('git add temp.txt');
      engine.execute('git commit -m "add temp"');

      const rmRes = engine.execute('git rm temp.txt');
      expect(rmRes.success).toBe(true);
      expect(engine.getFileSystem().exists('temp.txt')).toBe(false);
      expect(engine.getState().stagingArea.find((f) => f.path === 'temp.txt')?.status).toBe('deleted');
    });

    it('should rename file and stage rename with git mv', () => {
      engine.getFileSystem().writeFile('oldName.js', 'code');
      engine.execute('git add oldName.js');
      engine.execute('git commit -m "old file"');

      const mvRes = engine.execute('git mv oldName.js newName.js');
      expect(mvRes.success).toBe(true);
      expect(engine.getFileSystem().exists('oldName.js')).toBe(false);
      expect(engine.getFileSystem().exists('newName.js')).toBe(true);
      expect(engine.getFileSystem().readFile('newName.js')).toBe('code');
    });
  });

  describe('git merge', () => {
    it('creates a merge commit when --no-ff is requested for a fast-forwardable branch', () => {
      engine.getFileSystem().writeFile('base.txt', 'base');
      engine.execute('git add base.txt');
      engine.execute('git commit -m "base"');
      engine.execute('git switch -c feature');
      engine.getFileSystem().writeFile('feature.txt', 'feature');
      engine.execute('git add feature.txt');
      engine.execute('git commit -m "feature"');
      engine.execute('git switch main');

      const merged = engine.execute('git merge --no-ff feature');
      expect(merged.success).toBe(true);
      expect(merged.stdout).toContain('Merge made by');
      expect(engine.getState().commits).toHaveLength(3);
      expect(engine.getState().commits.at(-1)?.parents).toHaveLength(2);
    });

    it('rejects --ff-only when both branches have unique commits', () => {
      engine.getFileSystem().writeFile('base.txt', 'base');
      engine.execute('git add base.txt');
      engine.execute('git commit -m "base"');
      engine.execute('git switch -c feature');
      engine.getFileSystem().writeFile('feature.txt', 'feature');
      engine.execute('git add feature.txt');
      engine.execute('git commit -m "feature"');
      engine.execute('git switch main');
      engine.getFileSystem().writeFile('main.txt', 'main');
      engine.execute('git add main.txt');
      engine.execute('git commit -m "main update"');

      const merged = engine.execute('git merge --ff-only feature');
      expect(merged.success).toBe(false);
      expect(merged.stderr).toContain('Not possible to fast-forward');
      expect(engine.getState().commits).toHaveLength(3);
    });

    it('should perform fast-forward merge when branch is direct descendant', () => {
      engine.getFileSystem().writeFile('base.txt', 'base');
      engine.execute('git add base.txt');
      engine.execute('git commit -m "base commit"');

      engine.execute('git switch -c feature');
      engine.getFileSystem().writeFile('feat.txt', 'feature work');
      engine.execute('git add feat.txt');
      engine.execute('git commit -m "feature commit"');

      engine.execute('git switch main');
      const mergeRes = engine.execute('git merge feature');
      expect(mergeRes.success).toBe(true);
      expect(mergeRes.stdout).toContain('Fast-forward');
      expect(engine.getFileSystem().exists('feat.txt')).toBe(true);
      expect(engine.getState().commits.length).toBe(2);
    });

    it('should perform 3-way merge with two parents when histories diverge without conflict', () => {
      engine.getFileSystem().writeFile('shared.txt', 'shared');
      engine.execute('git add shared.txt');
      engine.execute('git commit -m "common base"');

      // Diverge feature branch
      engine.execute('git switch -c feature-1');
      engine.getFileSystem().writeFile('f1.txt', 'feat 1');
      engine.execute('git add f1.txt');
      engine.execute('git commit -m "commit on f1"');

      // Diverge main branch
      engine.execute('git switch main');
      engine.getFileSystem().writeFile('main.txt', 'main work');
      engine.execute('git add main.txt');
      engine.execute('git commit -m "commit on main"');

      // Merge feature-1 into main
      const mergeRes = engine.execute('git merge feature-1');
      expect(mergeRes.success).toBe(true);
      expect(mergeRes.stdout).toContain("Merge made by the 'ort' strategy.");

      const latestCommit = engine.getState().commits[engine.getState().commits.length - 1];
      expect(latestCommit.parents.length).toBe(2);
      expect(engine.getFileSystem().exists('f1.txt')).toBe(true);
      expect(engine.getFileSystem().exists('main.txt')).toBe(true);
    });

    it('should detect merge conflict, insert markers, and allow resolution', () => {
      engine.getFileSystem().writeFile('config.js', 'const env = "base";');
      engine.execute('git add config.js');
      engine.execute('git commit -m "base config"');

      // Branch A modifies config.js
      engine.execute('git switch -c branch-a');
      engine.getFileSystem().writeFile('config.js', 'const env = "branchA";');
      engine.execute('git add config.js');
      engine.execute('git commit -m "branchA config"');

      // Main modifies config.js differently
      engine.execute('git switch main');
      engine.getFileSystem().writeFile('config.js', 'const env = "main";');
      engine.execute('git add config.js');
      engine.execute('git commit -m "main config"');

      // Attempt merge -> Conflict!
      const conflictRes = engine.execute('git merge branch-a');
      expect(conflictRes.success).toBe(false);
      expect(conflictRes.stdout).toContain('CONFLICT (content): Merge conflict in config.js');

      // Check conflict markers in working directory
      const conflictedContent = engine.getFileSystem().readFile('config.js')!;
      expect(conflictedContent).toContain('<<<<<<< HEAD');
      expect(conflictedContent).toContain('const env = "main";');
      expect(conflictedContent).toContain('=======');
      expect(conflictedContent).toContain('const env = "branchA";');
      expect(conflictedContent).toContain('>>>>>>> branch-a');

      // Cannot commit before resolving
      const failCommit = engine.execute('git commit -m "try commit conflict"');
      expect(failCommit.success).toBe(false);

      // Student resolves conflict manually
      engine.getFileSystem().writeFile('config.js', 'const env = "merged_production";');
      engine.execute('git add config.js');
      const resolveCommit = engine.execute('git commit -m "merge: resolve config conflict"');
      expect(resolveCommit.success).toBe(true);

      const mergeCommit = engine.getState().commits[engine.getState().commits.length - 1];
      expect(mergeCommit.parents.length).toBe(2);
    });

    it('should support git merge --abort', () => {
      engine.getFileSystem().writeFile('conflict.txt', 'base');
      engine.execute('git add conflict.txt');
      engine.execute('git commit -m "base"');

      engine.execute('git switch -c other');
      engine.getFileSystem().writeFile('conflict.txt', 'other');
      engine.execute('git add conflict.txt');
      engine.execute('git commit -m "other commit"');

      engine.execute('git switch main');
      engine.getFileSystem().writeFile('conflict.txt', 'main');
      engine.execute('git add conflict.txt');
      engine.execute('git commit -m "main commit"');

      engine.execute('git merge other');
      expect(engine.getState().merge?.inProgress).toBe(true);

      const abortRes = engine.execute('git merge --abort');
      expect(abortRes.success).toBe(true);
      expect(engine.getState().merge).toBeNull();
      expect(engine.getFileSystem().readFile('conflict.txt')).toBe('main');
    });

    it('shows unmerged paths until they are resolved and staged', () => {
      engine.getFileSystem().writeFile('conflict.txt', 'base');
      engine.execute('git add conflict.txt');
      engine.execute('git commit -m "base"');
      engine.execute('git switch -c feature');
      engine.getFileSystem().writeFile('conflict.txt', 'feature version');
      engine.execute('git add conflict.txt');
      engine.execute('git commit -m "feature version"');
      engine.execute('git switch main');
      engine.getFileSystem().writeFile('conflict.txt', 'main version');
      engine.execute('git add conflict.txt');
      engine.execute('git commit -m "main version"');
      engine.execute('git merge feature');

      const unresolved = engine.execute('git status');
      expect(unresolved.stdout).toContain('You have unmerged paths.');
      expect(unresolved.stdout).toContain('both modified:   conflict.txt');

      engine.getFileSystem().writeFile('conflict.txt', 'combined version');
      engine.execute('git add conflict.txt');
      const stagedResolution = engine.execute('git status');
      expect(stagedResolution.stdout).toContain('All conflicts fixed but you are still merging.');
      expect(stagedResolution.stdout).toContain('modified:   conflict.txt');

      engine.execute('git commit -m "resolve conflict"');
      expect(engine.execute('git status').stdout).toContain('nothing to commit, working tree clean');
    });

    it('filters merge commits in git log and shows their parent commits', () => {
      engine.getFileSystem().writeFile('base.txt', 'base');
      engine.execute('git add base.txt');
      engine.execute('git commit -m "base"');
      engine.execute('git switch -c feature');
      engine.getFileSystem().writeFile('feature.txt', 'feature work');
      engine.execute('git add feature.txt');
      engine.execute('git commit -m "feature work"');
      engine.execute('git switch main');
      engine.getFileSystem().writeFile('main.txt', 'main work');
      engine.execute('git add main.txt');
      engine.execute('git commit -m "main work"');
      engine.execute('git merge feature');

      const merges = engine.execute('git log --merges --oneline');
      const nonMerges = engine.execute('git log --no-merges --oneline');
      const show = engine.execute('git show HEAD');
      const mergeLine = show.stdout.split('\n').find((line) => line.startsWith('Merge:'));

      expect(merges.stdout).toContain('Merge branch');
      expect(nonMerges.stdout).not.toContain('Merge branch');
      expect(mergeLine).toBeDefined();
      expect(mergeLine?.trim().split(/\s+/)).toHaveLength(3);
    });
  });

  describe('git reset', () => {
    it('should handle --mixed, --soft and --hard modes', () => {
      engine.getFileSystem().writeFile('f1.txt', '1');
      engine.execute('git add f1.txt');
      engine.execute('git commit -m "c1"');
      const c1Hash = engine.getState().commits[0].hash;

      engine.getFileSystem().writeFile('f2.txt', '2');
      engine.execute('git add f2.txt');
      engine.execute('git commit -m "c2"');

      // Soft reset to c1: commits rewind, c2 changes become staged!
      engine.execute(`git reset --soft ${c1Hash}`);
      expect(engine.getState().currentBranch).toBe('main');
      expect(engine.getState().stagingArea.length).toBe(1);

      // Hard reset to c1: working directory matches c1 exactly!
      engine.execute(`git reset --hard ${c1Hash}`);
      expect(engine.getState().stagingArea.length).toBe(0);
      expect(engine.getFileSystem().exists('f2.txt')).toBe(false);
      expect(engine.getFileSystem().exists('f1.txt')).toBe(true);
    });

    it('keeps unrelated untracked files when using --hard', () => {
      engine.getFileSystem().writeFile('tracked.txt', 'committed version');
      engine.execute('git add tracked.txt');
      engine.execute('git commit -m "base"');

      engine.getFileSystem().writeFile('tracked.txt', 'unsaved tracked edit');
      engine.getFileSystem().writeFile('staged-new.txt', 'staged addition');
      engine.execute('git add staged-new.txt');
      engine.getFileSystem().writeFile('scratch.txt', 'untracked note');

      const reset = engine.execute('git reset --hard HEAD');

      expect(reset.success).toBe(true);
      expect(engine.getFileSystem().readFile('tracked.txt')).toBe('committed version');
      expect(engine.getFileSystem().exists('staged-new.txt')).toBe(false);
      expect(engine.getFileSystem().readFile('scratch.txt')).toBe('untracked note');
      expect(engine.execute('git status').stdout).toContain('scratch.txt');
    });
  });

  describe('git revert', () => {
    it('should invert the specified commit and create a new commit', () => {
      engine.getFileSystem().writeFile('feature.txt', 'important feature');
      engine.execute('git add feature.txt');
      engine.execute('git commit -m "add feature"');
      const featHash = engine.getState().commits[0].hash;

      const revertRes = engine.execute(`git revert ${featHash}`);
      expect(revertRes.success).toBe(true);
      expect(engine.getState().commits.length).toBe(2);
      expect(engine.getFileSystem().exists('feature.txt')).toBe(false);
      expect(engine.getState().commits[1].message).toContain('Revert "add feature"');
    });
  });

  describe('git stash', () => {
    it('should save working changes and restore them with pop', () => {
      engine.getFileSystem().writeFile('file.txt', 'committed');
      engine.execute('git add file.txt');
      engine.execute('git commit -m "init"');

      engine.getFileSystem().writeFile('file.txt', 'dirty work');

      const stashRes = engine.execute('git stash');
      expect(stashRes.success).toBe(true);
      expect(engine.getFileSystem().readFile('file.txt')).toBe('committed');
      expect(engine.getState().stash.length).toBe(1);

      const popRes = engine.execute('git stash pop');
      expect(popRes.success).toBe(true);
      expect(engine.getFileSystem().readFile('file.txt')).toBe('dirty work');
      expect(engine.getState().stash.length).toBe(0);
    });

    it('leaves untracked files in place unless -u is requested', () => {
      engine.getFileSystem().writeFile('tracked.txt', 'base');
      engine.execute('git add tracked.txt');
      engine.execute('git commit -m "base"');
      engine.getFileSystem().writeFile('tracked.txt', 'edited');
      engine.getFileSystem().writeFile('scratch.txt', 'keep me');

      const stash = engine.execute('git stash push -m "tracked edit"');
      expect(stash.success).toBe(true);
      expect(engine.getFileSystem().readFile('tracked.txt')).toBe('base');
      expect(engine.getFileSystem().readFile('scratch.txt')).toBe('keep me');
      expect(engine.getState().stash).toHaveLength(1);

      const pop = engine.execute('git stash pop');
      expect(pop.success).toBe(true);
      expect(engine.getFileSystem().readFile('tracked.txt')).toBe('edited');
      expect(engine.getFileSystem().readFile('scratch.txt')).toBe('keep me');
    });

    it('stores and restores untracked files with git stash push -u -m', () => {
      engine.getFileSystem().writeFile('tracked.txt', 'base');
      engine.execute('git add tracked.txt');
      engine.execute('git commit -m "base"');
      engine.getFileSystem().writeFile('tracked.txt', 'edited');
      engine.getFileSystem().writeFile('new.txt', 'new work');

      const stash = engine.execute('git stash push -u -m "include new file"');
      expect(stash.success).toBe(true);
      expect(engine.getFileSystem().readFile('tracked.txt')).toBe('base');
      expect(engine.getFileSystem().exists('new.txt')).toBe(false);
      expect(engine.execute('git stash list').stdout).toContain('include new file');

      const pop = engine.execute('git stash pop');
      expect(pop.success).toBe(true);
      expect(engine.getFileSystem().readFile('tracked.txt')).toBe('edited');
      expect(engine.getFileSystem().readFile('new.txt')).toBe('new work');
      expect(engine.getState().stash).toHaveLength(0);
    });
  });

  describe('Shell Built-in Commands', () => {
    it('should support touch, mkdir, echo redirection, rm', () => {
      engine.execute('mkdir src');
      expect(engine.getFileSystem().isDirectory('src')).toBe(true);

      engine.execute('touch src/app.js');
      expect(engine.getFileSystem().exists('src/app.js')).toBe(true);

      engine.execute('echo "console.log(1);" > src/app.js');
      expect(engine.getFileSystem().readFile('src/app.js')).toBe('console.log(1);');

      engine.execute('echo "console.log(2);" >> src/app.js');
      expect(engine.getFileSystem().readFile('src/app.js')).toBe('console.log(1);\nconsole.log(2);\n');

      engine.execute('rm src/app.js');
      expect(engine.getFileSystem().exists('src/app.js')).toBe(false);
    });
  });
});
