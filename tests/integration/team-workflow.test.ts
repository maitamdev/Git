import { describe, it, expect, beforeEach } from 'vitest';
import {
  GitHubSimulator,
  MultiRepoEnvironment,
} from '@git-academy/github-simulator';
import { RemoteNetworkRegistry } from '@git-academy/git-engine';

describe('Team Workflow & GitHub Collaboration Simulator (Parts F, G, H, I)', () => {
  let sim: GitHubSimulator;

  beforeEach(() => {
    RemoteNetworkRegistry.getInstance().clear();
    sim = new GitHubSimulator();
  });

  describe('MultiRepoEnvironment: Lab Setup & Teammates (Part F)', () => {
    it('sets up multi-repo environment with origin and local student', () => {
      const env = new MultiRepoEnvironment({
        origin: { type: 'remote', url: 'https://gitacademy.local/org/project.git' },
        student: { type: 'local' },
      });

      const student = env.getLocalRepo('student');
      expect(student).toBeDefined();

      const origin = env.getRemoteRepo('origin');
      expect(origin).toBeDefined();
      expect(origin?.branches['main']).toBeNull();
    });

    it('student pushes initial commit to origin remote', () => {
      const env = new MultiRepoEnvironment({
        origin: { type: 'remote', url: 'https://gitacademy.local/org/project.git' },
        student: { type: 'local' },
      });

      const student = env.getLocalRepo('student')!;
      student.execute('git remote add origin https://gitacademy.local/org/project.git');
      student.getFileSystem().writeFile('README.md', '# Team Project\n');
      student.execute('git add README.md');
      student.execute('git commit -m "feat: initial project setup"');

      const push = student.execute('git push origin main');
      expect(push.success).toBe(true);

      const origin = env.getRemoteRepo('origin')!;
      expect(origin.branches['main']).toBeDefined();
    });

    it('teammate (Alice) pushes a new branch feature/auth to origin', () => {
      const env = new MultiRepoEnvironment({
        origin: { type: 'remote', url: 'https://gitacademy.local/org/project.git' },
        student: { type: 'local' },
      });

      const student = env.getLocalRepo('student')!;
      student.execute('git remote add origin https://gitacademy.local/org/project.git');
      student.getFileSystem().writeFile('README.md', '# Initial\n');
      student.execute('git add README.md');
      student.execute('git commit -m "feat: init"');
      student.execute('git push origin main');

      const teammateRes = env.teammatePush({
        teammateRepoName: 'alice',
        remoteName: 'origin',
        branch: 'feature/auth',
        files: [{ path: 'src/auth.ts', content: 'export const login = () => true;' }],
        commitMessage: 'feat(auth): add login logic',
      });

      expect(teammateRes.success).toBe(true);

      const origin = env.getRemoteRepo('origin')!;
      expect(origin.branches['feature/auth']).toBeDefined();
    });

    it('teammate (Bob) pushes another branch feature/payments to origin', () => {
      const env = new MultiRepoEnvironment({
        origin: { type: 'remote', url: 'https://gitacademy.local/org/project.git' },
        student: { type: 'local' },
      });

      const student = env.getLocalRepo('student')!;
      student.execute('git remote add origin https://gitacademy.local/org/project.git');
      student.getFileSystem().writeFile('README.md', '# Initial\n');
      student.execute('git add README.md');
      student.execute('git commit -m "feat: init"');
      student.execute('git push origin main');

      const teammateRes = env.teammatePush({
        teammateRepoName: 'bob',
        remoteName: 'origin',
        branch: 'feature/payments',
        files: [{ path: 'src/payment.ts', content: 'export const checkout = () => true;' }],
        commitMessage: 'feat(payments): implement checkout',
      });

      expect(teammateRes.success).toBe(true);

      const origin = env.getRemoteRepo('origin')!;
      expect(origin.branches['feature/payments']).toBeDefined();
    });

    it('student fetches and sees origin remote tracking branches', () => {
      const env = new MultiRepoEnvironment({
        origin: { type: 'remote', url: 'https://gitacademy.local/org/project.git' },
        student: { type: 'local' },
      });

      const student = env.getLocalRepo('student')!;
      student.execute('git remote add origin https://gitacademy.local/org/project.git');
      student.getFileSystem().writeFile('index.ts', 'console.log("main");');
      student.execute('git add index.ts');
      student.execute('git commit -m "main commit"');
      student.execute('git push origin main');

      // Teammate pushes feature/header
      env.teammatePush({
        teammateRepoName: 'alice',
        remoteName: 'origin',
        branch: 'feature/header',
        files: [{ path: 'header.ts', content: 'header' }],
        commitMessage: 'feat: add header',
      });

      // Student fetches
      const fetchRes = student.execute('git fetch origin');
      expect(fetchRes.success).toBe(true);

      const state = student.getState();
      expect(state.remoteTrackingBranches['origin/feature/header']).toBeDefined();
    });
  });

  describe('GitHub Simulator: Forking & Remotes (Part G2)', () => {
    it('creates teacher upstream repository and student fork', () => {
      const upstream = sim.createRepository({
        owner: 'google-deepmind',
        name: 'antigravity-academy',
        defaultBranch: 'main',
      });

      const fork = sim.fork('google-deepmind/antigravity-academy', 'vietnam-student');
      expect(fork.owner).toBe('vietnam-student');
      expect(fork.name).toBe('antigravity-academy');
      expect(fork.upstreamRepositoryId).toBe('google-deepmind/antigravity-academy');

      const reg = RemoteNetworkRegistry.getInstance();
      expect(reg.has('https://gitacademy.local/google-deepmind/antigravity-academy.git')).toBe(true);
      expect(reg.has('https://gitacademy.local/vietnam-student/antigravity-academy.git')).toBe(true);
    });
  });

  describe('GitHub Simulator: Issue Tracking (Part G7)', () => {
    it('creates issues with labels and authors', () => {
      sim.createRepository({ owner: 'academy', name: 'git-course' });

      const issue = sim.createIssue({
        repositoryId: 'academy/git-course',
        title: 'Lỗi typo bài 04 git checkout',
        description: 'Giải thích switch vs checkout có chữ sai chính tả.',
        author: 'sinh-vien-1',
        labels: ['documentation', 'typo'],
      });

      expect(issue.id).toBe(1);
      expect(issue.status).toBe('open');
      expect(issue.title).toContain('Lỗi typo');
      expect(issue.labels).toContain('documentation');
    });

    it('closes an issue with timestamp', () => {
      sim.createRepository({ owner: 'academy', name: 'git-course' });
      const issue = sim.createIssue({
        repositoryId: 'academy/git-course',
        title: 'Cần bổ sung bài về git stash',
        description: 'Chưa có lab stash.',
        author: 'sinh-vien-2',
      });

      const closed = sim.closeIssue('academy/git-course', issue.id);
      expect(closed.status).toBe('closed');
      expect(closed.closedAt).toBeDefined();
    });
  });

  describe('Complete Pull Request Workflow & Reviews (Part G3, G4, G5, G6)', () => {
    it('executes full PR lifecycle with reviews, changes requested, and merge', () => {
      // 1. Upstream repo
      const repo = sim.createRepository({ owner: 'team', name: 'shop-backend', defaultBranch: 'main' });
      const net = RemoteNetworkRegistry.getInstance();
      const originRemote = net.get(repo.remoteRepositoryId)!;

      // Base commit
      const baseHash = 'base_hash_001';
      originRemote.commits[baseHash] = {
        hash: baseHash,
        shortHash: 'base001',
        message: 'Initial backend structure',
        author: { name: 'Teacher', email: 'teacher@edu.vn' },
        timestamp: Date.now(),
        parents: [],
        tree: { 'package.json': '{"name":"shop-backend"}' },
      };
      originRemote.branches['main'] = baseHash;

      // 2. Student commits on feature branch
      const featureHash1 = 'feat_hash_001';
      originRemote.commits[featureHash1] = {
        hash: featureHash1,
        shortHash: 'feat001',
        message: 'feat(cart): add cart endpoint',
        author: { name: 'Student', email: 'student@edu.vn' },
        timestamp: Date.now(),
        parents: [baseHash],
        tree: {
          'package.json': '{"name":"shop-backend"}',
          'src/cart.ts': 'export const getCart = () => [];',
        },
      };
      originRemote.branches['feature/cart'] = featureHash1;

      // 3. Open Pull Request
      const pr = sim.createPullRequest({
        title: 'Feature: Cart endpoints',
        description: 'Provides cart listing endpoint.',
        author: 'student',
        sourceRepository: 'team/shop-backend',
        sourceBranch: 'feature/cart',
        targetRepository: 'team/shop-backend',
        targetBranch: 'main',
      });

      expect(pr.id).toBe(1);
      expect(pr.status).toBe('open');
      expect(pr.commits).toContain(featureHash1);

      // Check diff
      const diffs = sim.getPullRequestDiffs('team/shop-backend', pr.id);
      expect(diffs).toHaveLength(1);
      expect(diffs[0].path).toBe('src/cart.ts');
      expect(diffs[0].status).toBe('added');

      // 4. Code Review: Comment
      sim.addReview({
        targetRepository: 'team/shop-backend',
        prId: pr.id,
        author: 'mentor-nam',
        type: 'comment',
        body: 'Vui lòng thêm hàm addItem vào cart.',
      });

      // 5. Code Review: Request Changes
      sim.addReview({
        targetRepository: 'team/shop-backend',
        prId: pr.id,
        author: 'lead-dev',
        type: 'request_changes',
        body: 'Thiếu kiểm tra authentication khi lấy cart.',
      });

      const updatedPR = sim.getPullRequest('team/shop-backend', pr.id)!;
      expect(updatedPR.reviews).toHaveLength(2);
      expect(updatedPR.reviews[1].type).toBe('request_changes');

      // 6. Student pushes fix commit
      const featureHash2 = 'feat_hash_002';
      originRemote.commits[featureHash2] = {
        hash: featureHash2,
        shortHash: 'feat002',
        message: 'fix: add auth check and addItem method',
        author: { name: 'Student', email: 'student@edu.vn' },
        timestamp: Date.now(),
        parents: [featureHash1],
        tree: {
          'package.json': '{"name":"shop-backend"}',
          'src/cart.ts': 'export const getCart = (userId: string) => [];\nexport const addItem = () => {};',
        },
      };
      originRemote.branches['feature/cart'] = featureHash2;

      // 7. Lead dev approves
      sim.addReview({
        targetRepository: 'team/shop-backend',
        prId: pr.id,
        author: 'lead-dev',
        type: 'approve',
        body: 'Đã bổ sung đầy đủ, LGTM!',
      });

      // 8. Merge Pull Request
      const merged = sim.mergePullRequest({
        targetRepository: 'team/shop-backend',
        prId: pr.id,
      });

      expect(merged.status).toBe('merged');
      expect(merged.mergeCommitHash).toBeDefined();

      // Verify origin main now contains the files
      const mainHash = originRemote.branches['main']!;
      const mainCommit = originRemote.commits[mainHash];
      expect(mainCommit.tree['src/cart.ts']).toContain('addItem');
    });
  });

  describe('Non-Fast-Forward Push Rejection Handling (Part E6)', () => {
    it('detects and rejects non-fast-forward push when divergent commits exist', () => {
      const env = new MultiRepoEnvironment({
        origin: { type: 'remote', url: 'https://gitacademy.local/company/portal.git' },
        student: { type: 'local' },
      });

      const student = env.getLocalRepo('student')!;
      student.execute('git remote add origin https://gitacademy.local/company/portal.git');
      student.getFileSystem().writeFile('portal.ts', 'v1');
      student.execute('git add portal.ts');
      student.execute('git commit -m "portal v1"');
      student.execute('git push origin main');

      // Teammate pushes to main directly
      env.teammatePush({
        teammateRepoName: 'teammate',
        remoteName: 'origin',
        branch: 'main',
        files: [{ path: 'portal.ts', content: 'teammate conflicting v2' }],
        commitMessage: 'teammate direct update',
      });

      // Student independently modifies portal.ts and commits locally
      student.getFileSystem().writeFile('portal.ts', 'student divergent v2');
      student.execute('git add portal.ts');
      student.execute('git commit -m "student local update"');

      // Student tries to push to main -> should be rejected as non-fast-forward
      const push = student.execute('git push origin main');
      expect(push.success).toBe(false);
      expect(push.stdout + push.stderr).toContain('non-fast-forward');
    });
  });

  describe('Advanced PR Workflows & Merge Mechanisms (Part G6)', () => {
    it('creates 3-way merge commit when base branch has advanced', () => {
      const repo = sim.createRepository({ owner: 'enterprise', name: 'app', defaultBranch: 'main' });
      const net = RemoteNetworkRegistry.getInstance();
      const remote = net.get(repo.remoteRepositoryId)!;

      const baseHash = 'base_c';
      remote.commits[baseHash] = {
        hash: baseHash,
        shortHash: 'base',
        message: 'Initial base',
        author: { name: 'Admin', email: 'admin@app.com' },
        timestamp: 1000,
        parents: [],
        tree: { 'app.ts': 'export const app = 1;' },
      };
      remote.branches['main'] = baseHash;

      // Feature commit branched off base
      const featHash = 'feat_c';
      remote.commits[featHash] = {
        hash: featHash,
        shortHash: 'feat',
        message: 'Feature branch commit',
        author: { name: 'Dev', email: 'dev@app.com' },
        timestamp: 2000,
        parents: [baseHash],
        tree: { 'app.ts': 'export const app = 1;', 'feat.ts': 'export const feat = true;' },
      };
      remote.branches['feature/awesome'] = featHash;

      // Another commit landed on main while feature was in development
      const main2Hash = 'main2_c';
      remote.commits[main2Hash] = {
        hash: main2Hash,
        shortHash: 'main2',
        message: 'Independent main update',
        author: { name: 'Lead', email: 'lead@app.com' },
        timestamp: 3000,
        parents: [baseHash],
        tree: { 'app.ts': 'export const app = 1;', 'main-extra.ts': 'export const extra = true;' },
      };
      remote.branches['main'] = main2Hash;

      // Create PR
      const pr = sim.createPullRequest({
        title: 'Add awesome feature',
        description: 'Awesome feature implementation',
        author: 'dev',
        sourceRepository: 'enterprise/app',
        sourceBranch: 'feature/awesome',
        targetRepository: 'enterprise/app',
        targetBranch: 'main',
      });

      // Merge PR -> creates merge commit with both parents
      const merged = sim.mergePullRequest({
        targetRepository: 'enterprise/app',
        prId: pr.id,
      });

      expect(merged.status).toBe('merged');
      const finalHash = remote.branches['main']!;
      const finalCommit = remote.commits[finalHash];
      expect(finalCommit).toBeDefined();
      expect(finalCommit.parents.length).toBe(2);
      expect(finalCommit.parents).toContain(main2Hash);
      expect(finalCommit.parents).toContain(featHash);
      expect(finalCommit.tree['feat.ts']).toBe('export const feat = true;');
      expect(finalCommit.tree['main-extra.ts']).toBe('export const extra = true;');
    });

    it('merges cross-repo PR from fork to upstream repository', () => {
      const upstream = sim.createRepository({ owner: 'upstream-org', name: 'core-lib', defaultBranch: 'main' });
      const net = RemoteNetworkRegistry.getInstance();
      const upstreamRemote = net.get(upstream.remoteRepositoryId)!;

      const baseHash = 'core_base';
      upstreamRemote.commits[baseHash] = {
        hash: baseHash,
        shortHash: 'core1',
        message: 'Core v1',
        author: { name: 'Maintainer', email: 'maintainer@org.com' },
        timestamp: 1000,
        parents: [],
        tree: { 'core.ts': 'export function core() {}' },
      };
      upstreamRemote.branches['main'] = baseHash;

      // Student forks
      const fork = sim.fork('upstream-org/core-lib', 'student-dev');
      const forkRemote = net.get(fork.remoteRepositoryId)!;

      // Commit in fork
      const forkCommit = 'fork_feature_commit';
      forkRemote.commits[forkCommit] = {
        hash: forkCommit,
        shortHash: 'fork1',
        message: 'fix: optimize core performance',
        author: { name: 'Student Dev', email: 'student@dev.com' },
        timestamp: 2000,
        parents: [baseHash],
        tree: { 'core.ts': 'export function core() { /* fast */ }' },
      };
      forkRemote.branches['patch-1'] = forkCommit;

      // PR across repositories
      const pr = sim.createPullRequest({
        title: 'Optimize core performance',
        description: 'Improves execution speed.',
        author: 'student-dev',
        sourceRepository: 'student-dev/core-lib',
        sourceBranch: 'patch-1',
        targetRepository: 'upstream-org/core-lib',
        targetBranch: 'main',
      });

      expect(pr.sourceRepository).toBe('student-dev/core-lib');
      expect(pr.targetRepository).toBe('upstream-org/core-lib');

      // Maintainer approves and merges
      sim.addReview({
        targetRepository: 'upstream-org/core-lib',
        prId: pr.id,
        author: 'Maintainer',
        type: 'approve',
        body: 'Thank you for this patch!',
      });

      const merged = sim.mergePullRequest({
        targetRepository: 'upstream-org/core-lib',
        prId: pr.id,
      });

      expect(merged.status).toBe('merged');
      const upstreamHead = upstreamRemote.branches['main']!;
      expect(upstreamRemote.commits[upstreamHead].tree['core.ts']).toContain('/* fast */');
    });

    it('handles closing and reopening PRs without merge', () => {
      const repo = sim.createRepository({ owner: 'team', name: 'draft-app' });
      const net = RemoteNetworkRegistry.getInstance();
      const remote = net.get(repo.remoteRepositoryId)!;
      remote.commits['draft_c'] = {
        hash: 'draft_c',
        shortHash: 'draft',
        message: 'draft commit',
        author: { name: 'tester', email: 't@t.com' },
        timestamp: 100,
        parents: [],
        tree: { 'draft.txt': 'draft' },
      };
      remote.branches['main'] = 'draft_c';

      const pr = sim.createPullRequest({
        title: 'Draft experiment',
        description: 'Will test idea',
        author: 'tester',
        sourceRepository: 'team/draft-app',
        sourceBranch: 'main',
        targetRepository: 'team/draft-app',
        targetBranch: 'main',
      });

      expect(pr.status).toBe('open');

      const closed = sim.closePullRequest(pr.id);
      expect(closed.status).toBe('closed');
      expect(closed.closedAt).toBeDefined();

      const reopened = sim.reopenPullRequest(pr.id);
      expect(reopened.status).toBe('open');
      expect(reopened.closedAt).toBeUndefined();
    });

    it('calculates file diffs accurately for multiple modified files in PR', () => {
      const repo = sim.createRepository({ owner: 'school', name: 'multi-file-pr' });
      const net = RemoteNetworkRegistry.getInstance();
      const remote = net.get(repo.remoteRepositoryId)!;

      const base = 'base_multi';
      remote.commits[base] = {
        hash: base,
        shortHash: 'base',
        message: 'base',
        author: { name: 'A', email: 'a@a.com' },
        timestamp: 100,
        parents: [],
        tree: { 'file1.txt': 'original 1', 'file2.txt': 'original 2', 'file3.txt': 'to be deleted' },
      };
      remote.branches['main'] = base;

      const feat = 'feat_multi';
      remote.commits[feat] = {
        hash: feat,
        shortHash: 'feat',
        message: 'feat',
        author: { name: 'B', email: 'b@b.com' },
        timestamp: 200,
        parents: [base],
        tree: { 'file1.txt': 'modified 1', 'file2.txt': 'original 2', 'file4.txt': 'newly added' },
      };
      remote.branches['feature/multi'] = feat;

      const pr = sim.createPullRequest({
        title: 'Multi file changes',
        description: 'Modified file1, deleted file3, added file4',
        sourceRepository: 'school/multi-file-pr',
        sourceBranch: 'feature/multi',
        targetRepository: 'school/multi-file-pr',
        targetBranch: 'main',
      });

      const diffs = sim.getPullRequestDiffs('school/multi-file-pr', pr.id);
      const paths = diffs.map((d) => d.path);
      expect(paths).toContain('file1.txt');
      expect(paths).toContain('file3.txt');
      expect(paths).toContain('file4.txt');
      expect(paths).not.toContain('file2.txt'); // unchanged
    });

    it('rejects merging already closed or merged PR', () => {
      const repo = sim.createRepository({ owner: 'school', name: 'already-closed' });
      const net = RemoteNetworkRegistry.getInstance();
      const remote = net.get(repo.remoteRepositoryId)!;
      remote.commits['c1'] = {
        hash: 'c1',
        shortHash: 'c1',
        message: 'c1',
        author: { name: 't', email: 't@t.com' },
        timestamp: 100,
        parents: [],
        tree: {},
      };
      remote.branches['main'] = 'c1';

      const pr = sim.createPullRequest({
        title: 'Closed PR',
        description: 'desc',
        sourceRepository: 'school/already-closed',
        sourceBranch: 'main',
        targetRepository: 'school/already-closed',
        targetBranch: 'main',
      });

      sim.closePullRequest(pr.id);

      expect(() => {
        sim.mergePullRequest({ targetRepository: 'school/already-closed', prId: pr.id });
      }).toThrow('already closed');
    });
  });
});
