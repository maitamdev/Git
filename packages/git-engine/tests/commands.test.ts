import { describe, it, expect, beforeEach } from 'vitest';
import { GitEngine } from '../src/engine';

describe('GitEngine Core Commands Comprehensive Tests', () => {
  let engine: GitEngine;

  beforeEach(() => {
    engine = new GitEngine();
  });

  it('1. should initialize repository with git init', () => {
    const res = engine.execute('git init');
    expect(res.success).toBe(true);
    expect(res.stdout).toContain('Initialized empty Git repository');
    expect(engine.getState().repositoryInitialized).toBe(true);
    expect(engine.getState().currentBranch).toBe('main');
  });

  it('2. should show error when running commands before git init', () => {
    const res = engine.execute('git status');
    expect(res.success).toBe(false);
    expect(res.stderr).toContain('fatal: not a git repository');
  });

  it('3. should track files and display in git status', () => {
    engine.execute('git init');
    engine.getFileSystem().writeFile('index.html', '<h1>Hello</h1>');

    const status1 = engine.execute('git status');
    expect(status1.stdout).toContain('Untracked files:');
    expect(status1.stdout).toContain('index.html');

    // Stage file
    const addRes = engine.execute('git add index.html');
    expect(addRes.success).toBe(true);

    const status2 = engine.execute('git status');
    expect(status2.stdout).toContain('Changes to be committed:');
    expect(status2.stdout).toContain('new file:   index.html');
  });

  it('4. should show short status with git status -s', () => {
    engine.execute('git init');
    engine.getFileSystem().writeFile('staged.js', 'const a = 1;');
    engine.getFileSystem().writeFile('untracked.js', 'const b = 2;');
    engine.execute('git add staged.js');

    const res = engine.execute('git status -s');
    expect(res.success).toBe(true);
    expect(res.stdout).toContain('A  staged.js');
    expect(res.stdout).toContain('?? untracked.js');
  });

  it('5. should add all files with git add .', () => {
    engine.execute('git init');
    engine.getFileSystem().writeFile('file1.txt', '1');
    engine.getFileSystem().writeFile('file2.txt', '2');
    engine.execute('git add .');

    const state = engine.getState();
    expect(state.stagingArea.length).toBe(2);
  });

  it('6. should create root commit and update branch pointer', () => {
    engine.execute('git init');
    engine.getFileSystem().writeFile('app.js', 'console.log("hello");');
    engine.execute('git add app.js');

    const commitRes = engine.execute('git commit -m "feat: initial commit"');
    expect(commitRes.success).toBe(true);
    expect(commitRes.stdout).toContain('feat: initial commit');
    expect(commitRes.stdout).toContain('(root-commit)');

    const state = engine.getState();
    expect(state.commits.length).toBe(1);
    expect(state.commits[0].message).toBe('feat: initial commit');
    expect(state.stagingArea.length).toBe(0);

    const mainBranch = state.branches.find((b) => b.name === 'main');
    expect(mainBranch?.commitHash).toBe(state.commits[0].hash);
  });

  it('7. should display history with git log and git log --oneline', () => {
    engine.execute('git init');
    engine.getFileSystem().writeFile('file1.txt', '1');
    engine.execute('git add file1.txt');
    engine.execute('git commit -m "commit 1"');

    engine.getFileSystem().writeFile('file2.txt', '2');
    engine.execute('git add file2.txt');
    engine.execute('git commit -m "commit 2"');

    const logRes = engine.execute('git log');
    expect(logRes.success).toBe(true);
    expect(logRes.stdout).toContain('commit 1');
    expect(logRes.stdout).toContain('commit 2');

    const onelineRes = engine.execute('git log --oneline');
    expect(onelineRes.success).toBe(true);
    const lines = onelineRes.stdout.split('\n');
    expect(lines.length).toBe(2);
    expect(lines[0]).toContain('commit 2');
    expect(lines[1]).toContain('commit 1');
  });

  it('8. should branch and switch branches correctly', () => {
    engine.execute('git init');
    engine.getFileSystem().writeFile('main.txt', 'main file');
    engine.execute('git add main.txt');
    engine.execute('git commit -m "feat: main code"');

    // Create branch
    const branchRes = engine.execute('git branch feature-login');
    expect(branchRes.success).toBe(true);
    expect(engine.getState().branches.length).toBe(2);

    // Switch branch
    const switchRes = engine.execute('git switch feature-login');
    expect(switchRes.success).toBe(true);
    expect(engine.getState().currentBranch).toBe('feature-login');

    // Add commit on feature branch
    engine.getFileSystem().writeFile('login.js', 'console.log("login");');
    engine.execute('git add login.js');
    engine.execute('git commit -m "feat: login page"');

    expect(engine.getState().commits.length).toBe(2);
    const featureBranch = engine.getState().branches.find((b) => b.name === 'feature-login');
    const mainBranch = engine.getState().branches.find((b) => b.name === 'main');
    expect(featureBranch?.commitHash).not.toBe(mainBranch?.commitHash);
  });

  it('9. should create and switch branch with git switch -c', () => {
    engine.execute('git init');
    engine.getFileSystem().writeFile('init.txt', 'init');
    engine.execute('git add init.txt');
    engine.execute('git commit -m "init"');

    const res = engine.execute('git switch -c feature/cart');
    expect(res.success).toBe(true);
    expect(res.stdout).toContain("Switched to a new branch 'feature/cart'");
    expect(engine.getState().currentBranch).toBe('feature/cart');
  });

  it('10. should create and switch branch with git checkout -b', () => {
    engine.execute('git init');
    engine.getFileSystem().writeFile('init.txt', 'init');
    engine.execute('git add init.txt');
    engine.execute('git commit -m "init"');

    const res = engine.execute('git checkout -b feature/search');
    expect(res.success).toBe(true);
    expect(res.stdout).toContain("Switched to a new branch 'feature/search'");
    expect(engine.getState().currentBranch).toBe('feature/search');
  });

  it('11. should list all branches with git branch and mark active branch with *', () => {
    engine.execute('git init');
    engine.getFileSystem().writeFile('a.txt', 'a');
    engine.execute('git add a.txt');
    engine.execute('git commit -m "initial"');

    engine.execute('git branch dev');
    const listRes = engine.execute('git branch');
    expect(listRes.stdout).toContain('main');
    expect(listRes.stdout).toContain('*');
    expect(listRes.stdout).toContain('dev');
  });

  it('12. should delete a branch with git branch -d', () => {
    engine.execute('git init');
    engine.getFileSystem().writeFile('a.txt', 'a');
    engine.execute('git add a.txt');
    engine.execute('git commit -m "init"');

    engine.execute('git branch temp');
    expect(engine.getState().branches.some((b) => b.name === 'temp')).toBe(true);

    const delRes = engine.execute('git branch -d temp');
    expect(delRes.success).toBe(true);
    expect(delRes.stdout).toContain("Deleted branch temp");
    expect(engine.getState().branches.some((b) => b.name === 'temp')).toBe(false);
  });

  it('13. should compare diff in working tree with git diff', () => {
    engine.execute('git init');
    engine.getFileSystem().writeFile('app.js', 'line 1\nline 2');
    engine.execute('git add app.js');
    engine.execute('git commit -m "add app.js"');

    engine.getFileSystem().writeFile('app.js', 'line 1\nline 2 modified');
    const diffRes = engine.execute('git diff');
    expect(diffRes.success).toBe(true);
    expect(diffRes.stdout).toContain('-line 2');
    expect(diffRes.stdout).toContain('+line 2 modified');
  });

  it('14. should compare staged changes with git diff --staged', () => {
    engine.execute('git init');
    engine.getFileSystem().writeFile('calc.js', 'function add(a, b) { return a + b; }');
    engine.execute('git add calc.js');
    engine.execute('git commit -m "add calc"');

    engine.getFileSystem().writeFile('calc.js', 'function add(a, b) { return a + b + 0; }');
    engine.execute('git add calc.js');

    const stagedDiff = engine.execute('git diff --staged');
    expect(stagedDiff.success).toBe(true);
    expect(stagedDiff.stdout).toContain('+function add(a, b) { return a + b + 0; }');
  });

  it('15. should restore modified file from staging with git restore', () => {
    engine.execute('git init');
    engine.getFileSystem().writeFile('login.ts', 'const user = "admin";');
    engine.execute('git add login.ts');
    engine.execute('git commit -m "init login"');

    // Make unwanted change
    engine.getFileSystem().writeFile('login.ts', 'const user = "hacker";');
    expect(engine.getFileSystem().readFile('login.ts')).toBe('const user = "hacker";');

    const restoreRes = engine.execute('git restore login.ts');
    expect(restoreRes.success).toBe(true);
    expect(engine.getFileSystem().readFile('login.ts')).toBe('const user = "admin";');
  });

  it('16. should unstage file with git restore --staged', () => {
    engine.execute('git init');
    engine.getFileSystem().writeFile('notes.txt', 'secret notes');
    engine.execute('git add notes.txt');
    expect(engine.getState().stagingArea.some((f) => f.path === 'notes.txt')).toBe(true);

    const res = engine.execute('git restore --staged notes.txt');
    expect(res.success).toBe(true);
    expect(engine.getState().stagingArea.some((f) => f.path === 'notes.txt')).toBe(false);
  });

  it('17. should remove file from repo and disk with git rm', () => {
    engine.execute('git init');
    engine.getFileSystem().writeFile('trash.txt', 'delete me');
    engine.execute('git add trash.txt');
    engine.execute('git commit -m "add trash"');

    const rmRes = engine.execute('git rm trash.txt');
    expect(rmRes.success).toBe(true);
    expect(engine.getFileSystem().exists('trash.txt')).toBe(false);
    expect(engine.getState().stagingArea.some((f) => f.path === 'trash.txt' && f.status === 'deleted')).toBe(true);
  });

  it('18. should rename file with git mv', () => {
    engine.execute('git init');
    engine.getFileSystem().writeFile('old.js', 'console.log(1);');
    engine.execute('git add old.js');
    engine.execute('git commit -m "add old"');

    const mvRes = engine.execute('git mv old.js new.js');
    expect(mvRes.success).toBe(true);
    expect(engine.getFileSystem().exists('old.js')).toBe(false);
    expect(engine.getFileSystem().exists('new.js')).toBe(true);
    expect(engine.getFileSystem().readFile('new.js')).toBe('console.log(1);');
  });

  it('19. should execute shell touch command', () => {
    engine.execute('git init');
    const res = engine.execute('touch style.css script.js');
    expect(res.success).toBe(true);
    expect(engine.getFileSystem().exists('style.css')).toBe(true);
    expect(engine.getFileSystem().exists('script.js')).toBe(true);
  });

  it('20. should execute shell echo with overwrite redirection >', () => {
    engine.execute('git init');
    const res = engine.execute('echo "Hello World" > greeting.txt');
    expect(res.success).toBe(true);
    expect(engine.getFileSystem().readFile('greeting.txt')).toBe('Hello World');
  });

  it('21. should execute shell echo with append redirection >>', () => {
    engine.execute('git init');
    engine.execute('echo "Line 1" > file.txt');
    engine.execute('echo "Line 2" >> file.txt');
    expect(engine.getFileSystem().readFile('file.txt')?.trim()).toBe('Line 1\nLine 2');
  });

  it('22. should execute shell cat command', () => {
    engine.execute('git init');
    engine.getFileSystem().writeFile('readme.md', '# Hello Cat');
    const res = engine.execute('cat readme.md');
    expect(res.success).toBe(true);
    expect(res.stdout).toBe('# Hello Cat');
  });

  it('23. should execute shell mkdir command', () => {
    engine.execute('git init');
    const res = engine.execute('mkdir src/components');
    expect(res.success).toBe(true);
    expect(engine.getFileSystem().isDirectory('src/components')).toBe(true);
  });

  it('24. should execute shell rm command', () => {
    engine.execute('git init');
    engine.getFileSystem().writeFile('temp.log', 'logs');
    const res = engine.execute('rm temp.log');
    expect(res.success).toBe(true);
    expect(engine.getFileSystem().exists('temp.log')).toBe(false);
  });

  it('25. should provide autocomplete suggestions for git commands', () => {
    engine.execute('git init');
    const suggestions = engine.getSuggestions('git st');
    expect(suggestions.some((s) => s.text === 'git status')).toBe(true);
    expect(suggestions.some((s) => s.text === 'git stash')).toBe(true);
  });
});
