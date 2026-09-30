import { describe, it, expect, beforeEach } from 'vitest';
import { GitEngine } from '../src/engine';

describe('GitEngine Edge Cases & Error Handling Tests', () => {
  let engine: GitEngine;

  beforeEach(() => {
    engine = new GitEngine();
  });

  it('1. should fail when running git add on nonexistent file', () => {
    engine.execute('git init');
    const res = engine.execute('git add nonexistent.txt');
    expect(res.success).toBe(false);
    expect(res.stderr).toContain("fatal: pathspec 'nonexistent.txt' did not match any files");
  });

  it('2. should fail when running git commit with nothing in staging area', () => {
    engine.execute('git init');
    const res = engine.execute('git commit -m "empty commit"');
    expect(res.success).toBe(false);
    expect(res.stdout).toContain('nothing to commit, working tree clean');
  });

  it('3. should fail when running git commit without -m flag', () => {
    engine.execute('git init');
    engine.getFileSystem().writeFile('app.js', 'code');
    engine.execute('git add app.js');
    const res = engine.execute('git commit');
    expect(res.success).toBe(false);
    expect(res.stderr).toContain('empty commit message');
  });

  it('4. should fail when running git commit -m "" with empty message', () => {
    engine.execute('git init');
    engine.getFileSystem().writeFile('app.js', 'code');
    engine.execute('git add app.js');
    const res = engine.execute('git commit -m ""');
    expect(res.success).toBe(false);
    expect(res.stderr).toContain('empty commit message');
  });

  it('5. should fail when switching to an unknown branch', () => {
    engine.execute('git init');
    const res = engine.execute('git switch unknown-branch');
    expect(res.success).toBe(false);
    expect(res.stderr).toContain("fatal: invalid reference: unknown-branch");
  });

  it('6. should fail when creating a branch that already exists', () => {
    engine.execute('git init');
    engine.getFileSystem().writeFile('a.txt', 'a');
    engine.execute('git add a.txt');
    engine.execute('git commit -m "init"');

    const res = engine.execute('git branch main');
    expect(res.success).toBe(false);
    expect(res.stderr).toContain("fatal: A branch named 'main' already exists");
  });

  it('7. should fail when trying to delete the currently checked out branch', () => {
    engine.execute('git init');
    engine.getFileSystem().writeFile('a.txt', 'a');
    engine.execute('git add a.txt');
    engine.execute('git commit -m "init"');

    const res = engine.execute('git branch -d main');
    expect(res.success).toBe(false);
    expect(res.stderr).toContain("Cannot delete branch 'main'");
  });

  it('8. should gracefully reinitialize on repeated git init', () => {
    engine.execute('git init');
    const res2 = engine.execute('git init');
    expect(res2.success).toBe(true);
    expect(res2.stdout).toContain('Reinitialized existing Git repository');
  });

  it('9. should handle git reset --hard safely when repo has no commits', () => {
    engine.execute('git init');
    const res = engine.execute('git reset --hard');
    expect(res.success).toBe(false);
    expect(res.stderr).toContain("ambiguous argument 'HEAD'");
  });

  it('10. should report already up to date when merging same branch into itself', () => {
    engine.execute('git init');
    engine.getFileSystem().writeFile('a.txt', 'a');
    engine.execute('git add a.txt');
    engine.execute('git commit -m "commit 1"');

    const res = engine.execute('git merge main');
    expect(res.success).toBe(true);
    expect(res.stdout).toContain('Already up to date');
  });

  it('11. should fail when merging a non-existent branch', () => {
    engine.execute('git init');
    engine.getFileSystem().writeFile('a.txt', 'a');
    engine.execute('git add a.txt');
    engine.execute('git commit -m "commit 1"');

    const res = engine.execute('git merge non-existent');
    expect(res.success).toBe(false);
    expect(res.stderr).toContain("not something we can merge");
  });

  it('12. should fail when running git merge --abort when no merge is in progress', () => {
    engine.execute('git init');
    const res = engine.execute('git merge --abort');
    expect(res.success).toBe(false);
    expect(res.stderr).toContain('fatal: There is no merge to abort');
  });

  it('13. should fail when running git restore on non-existent file', () => {
    engine.execute('git init');
    const res = engine.execute('git restore ghost.ts');
    expect(res.success).toBe(false);
    expect(res.stderr).toContain("error: pathspec 'ghost.ts' did not match any file");
  });

  it('14. should fail when running git rm on non-existent file', () => {
    engine.execute('git init');
    const res = engine.execute('git rm nonexistent.txt');
    expect(res.success).toBe(false);
    expect(res.stderr).toContain("fatal: pathspec 'nonexistent.txt' did not match any files");
  });

  it('15. should fail when checking out non-existent ref', () => {
    engine.execute('git init');
    const res = engine.execute('git checkout bogus');
    expect(res.success).toBe(false);
    expect(res.stderr).toContain("fatal: invalid reference: bogus");
  });

  it('16. should report empty stash list when no stash entries exist', () => {
    engine.execute('git init');
    const res = engine.execute('git stash list');
    expect(res.success).toBe(true);
    expect(res.stdout).toBe('');
  });

  it('17. should fail when popping from an empty stash', () => {
    engine.execute('git init');
    const res = engine.execute('git stash pop');
    expect(res.success).toBe(false);
    expect(res.stderr).toContain('error: No stash entries found');
  });

  it('18. should fail when applying from an empty stash', () => {
    engine.execute('git init');
    const res = engine.execute('git stash apply');
    expect(res.success).toBe(false);
    expect(res.stderr).toContain('error: No stash entries found');
  });

  it('19. should fail when reverting a non-existent commit hash', () => {
    engine.execute('git init');
    engine.getFileSystem().writeFile('a.txt', 'a');
    engine.execute('git add a.txt');
    engine.execute('git commit -m "c1"');

    const res = engine.execute('git revert deadbeef');
    expect(res.success).toBe(false);
    expect(res.stderr).toContain("fatal: bad revision 'deadbeef'");
  });

  it('20. should fail when running git log on an empty repository without commits', () => {
    engine.execute('git init');
    const res = engine.execute('git log');
    expect(res.success).toBe(false);
    expect(res.stderr).toContain("fatal: your current branch 'main' does not have any commits yet");
  });
});
