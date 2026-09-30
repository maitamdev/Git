import { describe, it, expect, beforeEach } from 'vitest';
import { GitEngine } from '../src/engine';
import { RemoteNetworkRegistry } from '../src/remote/remote-registry';
import { GitObjectHasher } from '../src/objects/hasher';
import { RefManager } from '../src/refs/ref-manager';
import { levenshteinDistance, findClosestMatch } from '../src/terminal/levenshtein';

describe('GitObjectHasher & RefManager', () => {
  it('generates deterministic hashes', () => {
    const hash1 = GitObjectHasher.hash('test content');
    const hash2 = GitObjectHasher.hash('test content');
    const hash3 = GitObjectHasher.hash('different content');

    expect(hash1).toBe(hash2);
    expect(hash1).not.toBe(hash3);
    expect(hash1.length).toBe(40);
  });

  it('manages normalized references', () => {
    const refs = new RefManager();
    refs.setRef('main', '1111111');
    refs.setRef('origin/main', '2222222', 'remote');
    refs.setRef('v1.0.0', '3333333', 'tag');

    expect(refs.getRef('main')?.target).toBe('1111111');
    expect(refs.getRef('refs/heads/main')?.target).toBe('1111111');
    expect(refs.getRef('origin/main')?.target).toBe('2222222');
    expect(refs.getRef('refs/remotes/origin/main')?.target).toBe('2222222');
    expect(refs.resolveRef('HEAD')).toBe('1111111');

    expect(refs.listHeads().length).toBe(1);
    expect(refs.listRemotes().length).toBe(1);
  });
});

describe('Levenshtein Distance & Error Education', () => {
  it('computes edit distance and finds typo matches', () => {
    expect(levenshteinDistance('commti', 'commit')).toBe(2);
    expect(levenshteinDistance('statuss', 'status')).toBe(1);
    expect(levenshteinDistance('brnch', 'branch')).toBe(1);

    const commands = ['commit', 'status', 'branch', 'checkout', 'push', 'pull'];
    expect(findClosestMatch('commti', commands)).toBe('commit');
    expect(findClosestMatch('stauts', commands)).toBe('status');
  });

  it('suggests correct command on typo in terminal executor', () => {
    const engine = new GitEngine();
    const res = engine.execute('git commti');
    expect(res.success).toBe(false);
    expect(res.stderr).toContain('Không tìm thấy "commti"');
    expect(res.stderr).toContain('git commit');
  });
});

describe('Git Config & Aliases', () => {
  let engine: GitEngine;

  beforeEach(() => {
    engine = new GitEngine();
    engine.execute('git init');
  });

  it('sets and gets user.name and user.email', () => {
    const resName = engine.execute('git config user.name "Nguyen Van A"');
    expect(resName.success).toBe(true);

    const resEmail = engine.execute('git config user.email "a@example.com"');
    expect(resEmail.success).toBe(true);

    const checkName = engine.execute('git config user.name');
    expect(checkName.stdout.trim()).toBe('Nguyen Van A');

    const checkList = engine.execute('git config --list');
    expect(checkList.stdout).toContain('user.name=Nguyen Van A');
    expect(checkList.stdout).toContain('user.email=a@example.com');
  });

  it('uses configured author in commits', () => {
    engine.execute('git config user.name "Developer Test"');
    engine.execute('git config user.email "dev@gitacademy.vn"');

    engine.getFileSystem().writeFile('app.js', 'console.log("hello");');
    engine.execute('git add app.js');
    engine.execute('git commit -m "feat: initial commit"');

    const state = engine.getState();
    expect(state.commits.length).toBe(1);
    expect(state.commits[0].author.name).toBe('Developer Test');
    expect(state.commits[0].author.email).toBe('dev@gitacademy.vn');
  });

  it('supports command aliases like alias.st status and alias.br branch', () => {
    engine.execute('git config alias.st status');
    engine.execute('git config alias.br branch');

    const resStatus = engine.execute('git st');
    expect(resStatus.success).toBe(true);
    expect(resStatus.stdout).toContain('On branch main');

    const resBranch = engine.execute('git br');
    expect(resBranch.success).toBe(true);
    expect(resBranch.stdout).toContain('main');
  });
});

describe('Git Help & --help', () => {
  let engine: GitEngine;

  beforeEach(() => {
    engine = new GitEngine();
    engine.execute('git init');
  });

  it('displays git help overview', () => {
    const res = engine.execute('git help');
    expect(res.success).toBe(true);
    expect(res.stdout).toContain('usage: git');
    expect(res.stdout).toContain('commit');
    expect(res.stdout).toContain('branch');
  });

  it('displays specific command help with git help <command> and git <command> --help', () => {
    const resHelpCmd = engine.execute('git help commit');
    expect(resHelpCmd.success).toBe(true);
    expect(resHelpCmd.stdout).toContain('git-commit - Record changes to the repository');

    const resFlagHelp = engine.execute('git commit --help');
    expect(resFlagHelp.success).toBe(true);
    expect(resFlagHelp.stdout).toContain('git-commit - Record changes to the repository');
  });
});

describe('Remote Git Engine: remote, clone, fetch, pull, push', () => {
  let engine: GitEngine;
  const net = RemoteNetworkRegistry.getInstance();

  beforeEach(() => {
    net.clear();
    engine = new GitEngine();
    engine.execute('git init');
  });

  it('handles git remote add, -v, remove, rename', () => {
    const addRes = engine.execute('git remote add origin https://gitacademy.local/repo.git');
    expect(addRes.success).toBe(true);

    const listRes = engine.execute('git remote');
    expect(listRes.stdout.trim()).toBe('origin');

    const verboseRes = engine.execute('git remote -v');
    expect(verboseRes.stdout).toContain('origin\thttps://gitacademy.local/repo.git (fetch)');

    const renameRes = engine.execute('git remote rename origin upstream');
    expect(renameRes.success).toBe(true);
    expect(engine.execute('git remote').stdout.trim()).toBe('upstream');

    const removeRes = engine.execute('git remote remove upstream');
    expect(removeRes.success).toBe(true);
    expect(engine.execute('git remote').stdout.trim()).toBe('');
  });

  it('handles git clone from simulated remote', () => {
    // Setup a remote repository in network registry
    const remoteRepo = net.createRepository({
      id: 'course-repo',
      name: 'course-repo',
      url: 'https://gitacademy.local/course-repo.git',
      defaultBranch: 'main',
    });

    // Seed a commit into remote repo
    const hasher = GitObjectHasher;
    const commitHash = hasher.hash('commit1');
    remoteRepo.commits[commitHash] = {
      hash: commitHash,
      shortHash: commitHash.slice(0, 7),
      message: 'Initial remote commit',
      author: { name: 'Teacher', email: 'teacher@gitacademy.vn' },
      timestamp: Date.now(),
      parents: [],
      tree: { 'index.html': '<h1>Git Academy</h1>' },
    };
    remoteRepo.branches['main'] = commitHash;

    // Student clones
    const studentEngine = new GitEngine();
    const cloneRes = studentEngine.execute('git clone https://gitacademy.local/course-repo.git');

    expect(cloneRes.success).toBe(true);
    const state = studentEngine.getState();
    expect(state.repositoryInitialized).toBe(true);
    expect(state.currentBranch).toBe('main');
    expect(state.commits.length).toBe(1);
    expect(studentEngine.getFileSystem().readFile('index.html')).toBe('<h1>Git Academy</h1>');
    expect(state.remoteTrackingBranches?.['origin/main']).toBe(commitHash);
  });

  it('handles git fetch without merging into local working branch', () => {
    engine.execute('git remote add origin https://gitacademy.local/project.git');
    engine.getFileSystem().writeFile('local.txt', 'Local');
    engine.execute('git add local.txt');
    engine.execute('git commit -m "Local commit"');

    const localHash = engine.getState().commits[0].hash;

    // Simulate new commit on remote
    const remote = net.get('https://gitacademy.local/project.git')!;
    const remoteCommitHash = GitObjectHasher.hash('remote-update');
    remote.commits[remoteCommitHash] = {
      hash: remoteCommitHash,
      shortHash: remoteCommitHash.slice(0, 7),
      message: 'Teammate update',
      author: { name: 'Alice', email: 'alice@team.vn' },
      timestamp: Date.now(),
      parents: [localHash],
      tree: { 'local.txt': 'Local', 'teammate.txt': 'Teammate feature' },
    };
    remote.branches['main'] = remoteCommitHash;

    // Student fetches
    const fetchRes = engine.execute('git fetch origin');
    expect(fetchRes.success).toBe(true);

    const stateAfterFetch = engine.getState();
    // Local main should still point to local commit
    expect(stateAfterFetch.branches.find((b) => b.name === 'main')?.commitHash).toBe(localHash);
    // Remote tracking origin/main should point to remoteCommitHash
    expect(stateAfterFetch.remoteTrackingBranches?.['origin/main']).toBe(remoteCommitHash);
    // Working tree must NOT have teammate.txt yet
    expect(engine.getFileSystem().exists('teammate.txt')).toBe(false);
  });

  it('handles git push to remote with fast-forward and updates tracking branch', () => {
    engine.execute('git remote add origin https://gitacademy.local/shop.git');
    engine.getFileSystem().writeFile('cart.js', 'cart');
    engine.execute('git add cart.js');
    engine.execute('git commit -m "feat: cart"');

    const pushRes = engine.execute('git push -u origin main');
    expect(pushRes.success).toBe(true);
    expect(pushRes.stdout).toContain('main -> main');

    const remote = net.get('https://gitacademy.local/shop.git')!;
    expect(remote.branches['main']).toBe(engine.getState().commits[0].hash);
    expect(engine.getState().remoteTrackingBranches?.['origin/main']).toBe(engine.getState().commits[0].hash);
  });

  it('rejects git push when remote has non-fast-forward divergent commits', () => {
    engine.execute('git remote add origin https://gitacademy.local/shop.git');
    engine.getFileSystem().writeFile('fileA.txt', 'A');
    engine.execute('git add fileA.txt');
    engine.execute('git commit -m "Commit A"');
    engine.execute('git push origin main');

    // Simulate remote receiving another commit from Bob
    const remote = net.get('https://gitacademy.local/shop.git')!;
    const bobHash = GitObjectHasher.hash('bob-commit');
    remote.commits[bobHash] = {
      hash: bobHash,
      shortHash: bobHash.slice(0, 7),
      message: 'Bob commit',
      author: { name: 'Bob', email: 'bob@team.vn' },
      timestamp: Date.now(),
      parents: [remote.branches['main']!],
      tree: { 'fileA.txt': 'A', 'bob.txt': 'Bob work' },
    };
    remote.branches['main'] = bobHash;

    // Student makes a divergent commit locally without pulling
    engine.getFileSystem().writeFile('student.txt', 'Student work');
    engine.execute('git add student.txt');
    engine.execute('git commit -m "Student divergent commit"');

    // Student tries pushing
    const pushFail = engine.execute('git push origin main');
    expect(pushFail.success).toBe(false);
    expect(pushFail.stdout).toContain('! [rejected]');
    expect(pushFail.stdout).toContain('(non-fast-forward)');
  });

  it('handles git pull to fetch and merge tracking branch', () => {
    engine.execute('git remote add origin https://gitacademy.local/blog.git');
    engine.getFileSystem().writeFile('post.md', 'Hello World');
    engine.execute('git add post.md');
    engine.execute('git commit -m "Initial post"');
    engine.execute('git push -u origin main');

    const initialHash = engine.getState().commits[0].hash;

    // Teammate adds comments on remote
    const remote = net.get('https://gitacademy.local/blog.git')!;
    const remoteHash = GitObjectHasher.hash('comments-feature');
    remote.commits[remoteHash] = {
      hash: remoteHash,
      shortHash: remoteHash.slice(0, 7),
      message: 'Add comments section',
      author: { name: 'Editor', email: 'editor@blog.vn' },
      timestamp: Date.now(),
      parents: [initialHash],
      tree: { 'post.md': 'Hello World', 'comments.md': 'Comments here' },
    };
    remote.branches['main'] = remoteHash;

    // Student pulls
    const pullRes = engine.execute('git pull origin main');
    expect(pullRes.success).toBe(true);

    // Working tree is updated
    expect(engine.getFileSystem().exists('comments.md')).toBe(true);
    expect(engine.getState().branches.find((b) => b.name === 'main')?.commitHash).toBe(remoteHash);
  });
});
