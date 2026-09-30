import { describe, it, expect, beforeEach } from 'vitest';
import { GitHubSimulator } from '../src/simulator';
import { MultiRepoEnvironment } from '../src/multi-repo/environment';
import { RemoteNetworkRegistry } from '@git-academy/git-engine';

describe('GitHubSimulator: Repositories & Forking', () => {
  let sim: GitHubSimulator;

  beforeEach(() => {
    RemoteNetworkRegistry.getInstance().clear();
    sim = new GitHubSimulator();
  });

  it('creates GitHub repository with underlying remote repo', () => {
    const repo = sim.createRepository({
      owner: 'teacher',
      name: 'git-lab-demo',
      defaultBranch: 'main',
    });

    expect(repo.id).toBe('teacher/git-lab-demo');
    expect(repo.defaultBranch).toBe('main');
    expect(sim.getRepository('teacher/git-lab-demo')).toBeDefined();
    expect(RemoteNetworkRegistry.getInstance().has('https://gitacademy.local/teacher/git-lab-demo.git')).toBe(true);
  });

  it('forks a repository and configures upstream relationship', () => {
    const upstream = sim.createRepository({
      owner: 'teacher',
      name: 'project-template',
    });

    const forked = sim.fork('teacher/project-template', 'student-alice');
    expect(forked.id).toBe('student-alice/project-template');
    expect(forked.upstreamRepositoryId).toBe('teacher/project-template');
    expect(upstream.forksCount).toBe(1);
    expect(RemoteNetworkRegistry.getInstance().has('https://gitacademy.local/student-alice/project-template.git')).toBe(true);
  });
});

describe('GitHubSimulator: Issues & Reviews', () => {
  let sim: GitHubSimulator;

  beforeEach(() => {
    RemoteNetworkRegistry.getInstance().clear();
    sim = new GitHubSimulator();
    sim.createRepository({ owner: 'academy', name: 'web-app' });
  });

  it('creates and closes issues', () => {
    const issue = sim.createIssue({
      repositoryId: 'academy/web-app',
      title: 'Fix responsive navigation on mobile',
      description: 'The menu is cut off on screens < 400px',
      author: 'student-bob',
      labels: ['bug', 'ui'],
    });

    expect(issue.id).toBe(1);
    expect(issue.status).toBe('open');

    const closed = sim.closeIssue('academy/web-app', issue.id);
    expect(closed.status).toBe('closed');
    expect(closed.closedAt).toBeDefined();
  });

  it('adds reviews with comment, approve, and request_changes', () => {
    // Setup target repo & source fork with a commit
    sim.createRepository({ owner: 'academy', name: 'web-app' });
    const studentRepo = sim.fork('academy/web-app', 'student-carol');

    const net = RemoteNetworkRegistry.getInstance();
    const studentRemote = net.get(studentRepo.remoteRepositoryId)!;
    studentRemote.branches['feature/auth'] = 'auth_commit_1';
    studentRemote.commits['auth_commit_1'] = {
      hash: 'auth_commit_1',
      shortHash: 'auth1',
      message: 'feat: add jwt auth',
      author: { name: 'Carol', email: 'carol@git.vn' },
      timestamp: Date.now(),
      parents: [],
      tree: { 'auth.js': 'function auth() { return true; }' },
    };

    const pr = sim.createPullRequest({
      title: 'Implement JWT Auth',
      description: 'Adds login validation via token',
      author: 'student-carol',
      sourceRepository: 'student-carol/web-app',
      sourceBranch: 'feature/auth',
      targetRepository: 'academy/web-app',
      targetBranch: 'main',
    });

    expect(pr.id).toBe(1);
    expect(pr.commits).toContain('auth_commit_1');

    // Teacher reviews PR
    const review1 = sim.addReview({
      targetRepository: 'academy/web-app',
      prId: pr.id,
      author: 'teacher-dan',
      type: 'request_changes',
      body: 'Please add test cases for expired tokens.',
    });
    expect(review1.type).toBe('request_changes');

    const review2 = sim.addReview({
      targetRepository: 'academy/web-app',
      prId: pr.id,
      author: 'teacher-dan',
      type: 'approve',
      body: 'Looks great now! Approved.',
    });
    expect(review2.type).toBe('approve');
    expect(pr.reviews.length).toBe(2);
  });
});

describe('GitHubSimulator: Pull Request Merge with real Git DAG integration', () => {
  let sim: GitHubSimulator;

  beforeEach(() => {
    RemoteNetworkRegistry.getInstance().clear();
    sim = new GitHubSimulator();
  });

  it('merges PR by executing real merge and updating target repository branch', () => {
    const targetRepo = sim.createRepository({ owner: 'school', name: 'shop', defaultBranch: 'main' });
    const net = RemoteNetworkRegistry.getInstance();
    const targetRemote = net.get(targetRepo.remoteRepositoryId)!;

    // Base commit on main
    const baseHash = 'base_commit_hash';
    targetRemote.commits[baseHash] = {
      hash: baseHash,
      shortHash: 'base1',
      message: 'Initial project setup',
      author: { name: 'School', email: 'school@edu.vn' },
      timestamp: Date.now(),
      parents: [],
      tree: { 'README.md': '# Shop Project' },
    };
    targetRemote.branches['main'] = baseHash;

    // Student fork
    const studentRepo = sim.fork('school/shop', 'student');
    const studentRemote = net.get(studentRepo.remoteRepositoryId)!;

    const featureHash = 'feature_commit_hash';
    studentRemote.commits[featureHash] = {
      hash: featureHash,
      shortHash: 'feat1',
      message: 'feat: add cart functionality',
      author: { name: 'Student', email: 'student@edu.vn' },
      timestamp: Date.now(),
      parents: [baseHash],
      tree: { 'README.md': '# Shop Project', 'cart.js': 'export const cart = [];' },
    };
    studentRemote.branches['feature/cart'] = featureHash;

    // Create PR
    const pr = sim.createPullRequest({
      title: 'feat: Cart module',
      description: 'Adds cart logic',
      author: 'student',
      sourceRepository: 'student/shop',
      sourceBranch: 'feature/cart',
      targetRepository: 'school/shop',
      targetBranch: 'main',
    });

    // Check PR diffs
    const diffs = sim.getPullRequestDiffs('school/shop', pr.id);
    expect(diffs.length).toBe(1);
    expect(diffs[0].path).toBe('cart.js');
    expect(diffs[0].status).toBe('added');

    // Merge PR
    const mergedPR = sim.mergePullRequest({
      targetRepository: 'school/shop',
      prId: pr.id,
    });

    expect(mergedPR.status).toBe('merged');
    expect(mergedPR.mergeCommitHash).toBeDefined();

    // Verify target remote repository has the merged branch with both files
    const finalHash = targetRemote.branches['main']!;
    const finalCommit = targetRemote.commits[finalHash];
    expect(finalCommit).toBeDefined();
    expect(finalCommit.tree['README.md']).toBe('# Shop Project');
    expect(finalCommit.tree['cart.js']).toBe('export const cart = [];');
  });
});

describe('MultiRepoEnvironment: Team Project Simulation', () => {
  it('simulates student and teammate pushing to origin remote', () => {
    const env = new MultiRepoEnvironment({
      origin: { type: 'remote', url: 'https://gitacademy.local/team-project.git' },
      student: { type: 'local' },
    });

    const studentEngine = env.getLocalRepo('student')!;
    studentEngine.execute('git remote add origin https://gitacademy.local/team-project.git');
    studentEngine.getFileSystem().writeFile('student.txt', 'Student feature');
    studentEngine.execute('git add student.txt');
    studentEngine.execute('git commit -m "feat: student part"');
    const pushStudent = studentEngine.execute('git push origin main');
    expect(pushStudent.success).toBe(true);

    // Teammate Alice pushes to a feature branch
    const teammateRes = env.teammatePush({
      teammateRepoName: 'alice',
      remoteName: 'origin',
      branch: 'feature/alice',
      files: [{ path: 'alice.txt', content: 'Alice feature' }],
      commitMessage: 'feat: alice part',
    });

    expect(teammateRes.success).toBe(true);

    // Verify remote origin has both branches
    const remoteOrigin = env.getRemoteRepo('origin')!;
    expect(remoteOrigin.branches['main']).toBeDefined();
    expect(remoteOrigin.branches['feature/alice']).toBeDefined();
  });
});
