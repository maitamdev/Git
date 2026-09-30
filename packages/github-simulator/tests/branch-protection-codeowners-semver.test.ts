import { describe, it, expect, beforeEach } from 'vitest';
import { GitHubSimulator } from '../src/simulator';
import { RemoteNetworkRegistry, GitEngine } from '@git-academy/git-engine';
import {
  parseCodeOwners,
  matchPattern,
  findReviewersForFiles,
} from '../src/workflow/codeowners';
import {
  parseSemanticVersion,
  formatSemanticVersion,
  computeNextVersion,
} from '../src/workflow/semantic-versioning';
import { validateConventionalCommit } from '../src/workflow/conventional-commits';
import { BranchProtectionRule } from '../src/types';

describe('Branch Protection, CODEOWNERS & Semantic Versioning Suite', () => {
  let sim: GitHubSimulator;

  beforeEach(() => {
    // Reset RemoteNetworkRegistry singleton between tests
    (RemoteNetworkRegistry as any).instance = new (RemoteNetworkRegistry as any)();
    sim = new GitHubSimulator();
  });

  // =========================================================================
  // 1. Branch Protection Rules Suite
  // =========================================================================
  describe('Branch Protection Rules Enforcement', () => {
    it('registers branch protection rule and syncs with RemoteNetworkRegistry', () => {
      const repo = sim.createRepository({ owner: 'vietnam-org', name: 'core-api' });
      const rule: BranchProtectionRule = {
        branchPattern: 'main',
        requirePullRequest: true,
        requiredApprovals: 2,
        requireStatusChecks: true,
        blockForcePush: true,
        blockDeletion: true,
      };

      sim.addBranchProtectionRule(repo.id, rule);

      const rules = sim.getBranchProtectionRules(repo.id);
      expect(rules).toHaveLength(1);
      expect(rules[0].branchPattern).toBe('main');
      expect(rules[0].requiredApprovals).toBe(2);

      const net = RemoteNetworkRegistry.getInstance();
      const remote = net.get(repo.remoteRepositoryId);
      expect(remote?.branchProtectionRules).toBeDefined();
      expect(remote?.branchProtectionRules?.[0].blockForcePush).toBe(true);
    });

    it('blocks direct push when requirePullRequest is true', () => {
      const repo = sim.createRepository({ owner: 'vietnam-org', name: 'protected-repo' });
      sim.addBranchProtectionRule(repo.id, {
        branchPattern: 'main',
        requirePullRequest: true,
        requiredApprovals: 1,
        requireStatusChecks: false,
        blockForcePush: true,
        blockDeletion: true,
      });

      const engine = new GitEngine();
      engine.execute('git init');
      engine.execute(`git remote add origin https://gitacademy.local/${repo.id}.git`);
      engine.execute('echo "init" > app.js');
      engine.execute('git add app.js');
      engine.execute('git commit -m "feat: initial commit"');

      const pushRes = engine.execute('git push origin main');
      expect(pushRes.exitCode).toBe(1);
      expect(pushRes.stdout).toContain('protected branch hook declined');
      expect(pushRes.stderr).toContain('direct pushes to protected branch');
    });

    it('blocks force push when blockForcePush is true', () => {
      const repo = sim.createRepository({ owner: 'vietnam-org', name: 'no-force-repo' });
      sim.addBranchProtectionRule(repo.id, {
        branchPattern: 'main',
        requirePullRequest: false,
        requiredApprovals: 0,
        requireStatusChecks: false,
        blockForcePush: true,
        blockDeletion: true,
      });

      const engine = new GitEngine();
      engine.execute('git init');
      engine.execute(`git remote add origin https://gitacademy.local/${repo.id}.git`);
      engine.execute('echo "v1" > app.js');
      engine.execute('git add app.js');
      engine.execute('git commit -m "v1"');
      engine.execute('git push origin main');

      // Attempt force push
      const forceRes = engine.execute('git push origin main --force');
      expect(forceRes.exitCode).toBe(1);
      expect(forceRes.stdout).toContain('force push declined');
      expect(forceRes.stderr).toContain('force pushing to protected branch');
    });

    it('evaluates canMergePullRequest correctly with required approvals and change requests', () => {
      const repo = sim.createRepository({ owner: 'vietnam-org', name: 'service-app' });
      sim.addBranchProtectionRule(repo.id, {
        branchPattern: 'main',
        requirePullRequest: true,
        requiredApprovals: 2,
        requireStatusChecks: false,
        blockForcePush: true,
        blockDeletion: true,
      });

      const net = RemoteNetworkRegistry.getInstance();
      const remote = net.get(repo.remoteRepositoryId)!;
      remote.branches['main'] = 'c_main';
      remote.branches['feat/metrics'] = 'c_metrics';
      remote.commits['c_main'] = {
        hash: 'c_main',
        shortHash: 'c_main0',
        message: 'base',
        author: { name: 'A', email: 'a@local' },
        timestamp: Date.now(),
        parents: [],
        tree: {},
      };
      remote.commits['c_metrics'] = {
        hash: 'c_metrics',
        shortHash: 'c_metr0',
        message: 'feat: metrics',
        author: { name: 'A', email: 'a@local' },
        timestamp: Date.now(),
        parents: ['c_main'],
        tree: {},
      };

      const pr = sim.createPullRequest({
        title: 'feat: add metrics',
        description: 'prometheus metrics endpoint',
        author: 'dev-nguyen',
        sourceRepository: repo.id,
        sourceBranch: 'feat/metrics',
        targetRepository: repo.id,
        targetBranch: 'main',
        commits: ['c_metrics'],
      });

      // 0 approvals: cannot merge
      let status = sim.canMergePullRequest(repo.id, pr.id);
      expect(status.canMerge).toBe(false);
      expect(status.reasons[0]).toContain('Requires at least 2 approval(s)');

      // 1 approval: still cannot merge
      sim.submitReview({
        targetRepository: repo.id,
        prId: pr.id,
        author: 'reviewer-1',
        type: 'approve',
        body: 'Looks good',
      });
      status = sim.canMergePullRequest(repo.id, pr.id);
      expect(status.canMerge).toBe(false);

      // Request changes: cannot merge even if second approval arrives
      sim.submitReview({
        targetRepository: repo.id,
        prId: pr.id,
        author: 'security-lead',
        type: 'request_changes',
        body: 'Exposes sensitive token metric',
      });
      sim.submitReview({
        targetRepository: repo.id,
        prId: pr.id,
        author: 'reviewer-2',
        type: 'approve',
        body: 'LGTM',
      });

      status = sim.canMergePullRequest(repo.id, pr.id);
      expect(status.canMerge).toBe(false);
      expect(status.reasons).toContain('Changes have been requested by reviewers.');
    });

    it('rejects mergePullRequest if required approvals are not satisfied', () => {
      const repo = sim.createRepository({ owner: 'vietnam-org', name: 'approval-repo' });
      sim.addBranchProtectionRule(repo.id, {
        branchPattern: 'main',
        requirePullRequest: true,
        requiredApprovals: 1,
        requireStatusChecks: false,
        blockForcePush: true,
        blockDeletion: true,
      });

      const net = RemoteNetworkRegistry.getInstance();
      const remote = net.get(repo.remoteRepositoryId)!;
      remote.branches['main'] = 'hash_base';
      remote.branches['feat/fix'] = 'hash_feat';
      remote.commits['hash_base'] = {
        hash: 'hash_base',
        shortHash: 'base000',
        message: 'base',
        author: { name: 'A', email: 'a@local' },
        timestamp: Date.now(),
        parents: [],
        tree: { 'a.txt': 'base' },
      };
      remote.commits['hash_feat'] = {
        hash: 'hash_feat',
        shortHash: 'feat000',
        message: 'feat',
        author: { name: 'A', email: 'a@local' },
        timestamp: Date.now(),
        parents: ['hash_base'],
        tree: { 'a.txt': 'feat' },
      };

      const pr = sim.createPullRequest({
        title: 'feat: urgent fix',
        description: 'fix',
        author: 'dev1',
        sourceRepository: repo.id,
        sourceBranch: 'feat/fix',
        targetRepository: repo.id,
        targetBranch: 'main',
        commits: ['hash_feat'],
      });

      expect(() => sim.mergePullRequest({ targetRepository: repo.id, prId: pr.id })).toThrow(
        /requires at least 1 approval/
      );

      // Add approval then merge succeeds
      sim.submitReview({
        targetRepository: repo.id,
        prId: pr.id,
        author: 'tech-lead',
        type: 'approve',
        body: 'Approved for production',
      });

      const mergedPR = sim.mergePullRequest({ targetRepository: repo.id, prId: pr.id });
      expect(mergedPR.status).toBe('merged');
    });

    it('enforces linear history rule and rejects merge commits when diverged', () => {
      const repo = sim.createRepository({ owner: 'vietnam-org', name: 'linear-repo' });
      sim.addBranchProtectionRule(repo.id, {
        branchPattern: 'main',
        requirePullRequest: false,
        requiredApprovals: 0,
        requireStatusChecks: false,
        blockForcePush: false,
        blockDeletion: false,
        requireLinearHistory: true,
      });

      const net = RemoteNetworkRegistry.getInstance();
      const remote = net.get(repo.remoteRepositoryId)!;
      remote.branches['main'] = 'c_main_tip';
      remote.branches['feature'] = 'c_feat_tip';

      // Two diverged commits without ancestor relationship
      remote.commits['c_main_tip'] = {
        hash: 'c_main_tip',
        shortHash: 'main000',
        message: 'main commit',
        author: { name: 'Dev', email: 'dev@test' },
        timestamp: Date.now(),
        parents: [],
        tree: { 'file.txt': 'main content' },
      };
      remote.commits['c_feat_tip'] = {
        hash: 'c_feat_tip',
        shortHash: 'feat000',
        message: 'feat commit',
        author: { name: 'Dev', email: 'dev@test' },
        timestamp: Date.now(),
        parents: [],
        tree: { 'other.txt': 'feat content' },
      };

      const pr = sim.createPullRequest({
        title: 'feat: diverged feature',
        description: 'diverged',
        author: 'dev',
        sourceRepository: repo.id,
        sourceBranch: 'feature',
        targetRepository: repo.id,
        targetBranch: 'main',
        commits: ['c_feat_tip'],
      });

      expect(() => sim.mergePullRequest({ targetRepository: repo.id, prId: pr.id })).toThrow(
        /requires linear history/
      );
    });

    it('allows mergePullRequest with requireLinearHistory when source is directly descendant of target', () => {
      const repo = sim.createRepository({ owner: 'vietnam-org', name: 'linear-success-repo' });
      sim.addBranchProtectionRule(repo.id, {
        branchPattern: 'main',
        requirePullRequest: false,
        requiredApprovals: 0,
        requireStatusChecks: false,
        blockForcePush: false,
        blockDeletion: false,
        requireLinearHistory: true,
      });

      const net = RemoteNetworkRegistry.getInstance();
      const remote = net.get(repo.remoteRepositoryId)!;
      remote.branches['main'] = 'c_base';
      remote.branches['feature'] = 'c_linear_feat';

      remote.commits['c_base'] = {
        hash: 'c_base',
        shortHash: 'base000',
        message: 'base commit',
        author: { name: 'Dev', email: 'dev@test' },
        timestamp: Date.now(),
        parents: [],
        tree: { 'file.txt': 'base' },
      };
      // Linear descendant: parent is c_base
      remote.commits['c_linear_feat'] = {
        hash: 'c_linear_feat',
        shortHash: 'feat000',
        message: 'linear feature',
        author: { name: 'Dev', email: 'dev@test' },
        timestamp: Date.now(),
        parents: ['c_base'],
        tree: { 'file.txt': 'base', 'feat.txt': 'feat' },
      };

      const pr = sim.createPullRequest({
        title: 'feat: linear feature',
        description: 'linear',
        author: 'dev',
        sourceRepository: repo.id,
        sourceBranch: 'feature',
        targetRepository: repo.id,
        targetBranch: 'main',
        commits: ['c_linear_feat'],
      });

      const merged = sim.mergePullRequest({ targetRepository: repo.id, prId: pr.id });
      expect(merged.status).toBe('merged');
    });

    it('returns canMerge true when all protection criteria are fulfilled', () => {
      const repo = sim.createRepository({ owner: 'vietnam-org', name: 'fulfilled-repo' });
      sim.addBranchProtectionRule(repo.id, {
        branchPattern: 'main',
        requirePullRequest: true,
        requiredApprovals: 1,
        requireStatusChecks: false,
        blockForcePush: true,
        blockDeletion: true,
      });

      const net = RemoteNetworkRegistry.getInstance();
      const remote = net.get(repo.remoteRepositoryId)!;
      remote.branches['main'] = 'c_main';
      remote.branches['feat/clean'] = 'c_clean';
      remote.commits['c_main'] = {
        hash: 'c_main',
        shortHash: 'main000',
        message: 'base',
        author: { name: 'A', email: 'a@local' },
        timestamp: Date.now(),
        parents: [],
        tree: {},
      };
      remote.commits['c_clean'] = {
        hash: 'c_clean',
        shortHash: 'clean00',
        message: 'clean',
        author: { name: 'A', email: 'a@local' },
        timestamp: Date.now(),
        parents: ['c_main'],
        tree: {},
      };

      const pr = sim.createPullRequest({
        title: 'feat: clean change',
        description: 'desc',
        author: 'author1',
        sourceRepository: repo.id,
        sourceBranch: 'feat/clean',
        targetRepository: repo.id,
        targetBranch: 'main',
        commits: ['c_clean'],
      });

      sim.submitReview({
        targetRepository: repo.id,
        prId: pr.id,
        author: 'reviewer',
        type: 'approve',
        body: 'Approved',
      });

      const status = sim.canMergePullRequest(repo.id, pr.id);
      expect(status.canMerge).toBe(true);
      expect(status.reasons).toHaveLength(0);
    });

    it('prevents deletion of default branch and protected branches', () => {
      const repo = sim.createRepository({ owner: 'vietnam-org', name: 'del-protect-repo' });
      sim.addBranchProtectionRule(repo.id, {
        branchPattern: 'release/*',
        requirePullRequest: false,
        requiredApprovals: 0,
        requireStatusChecks: false,
        blockForcePush: false,
        blockDeletion: true,
      });

      const net = RemoteNetworkRegistry.getInstance();
      const remote = net.get(repo.remoteRepositoryId)!;
      remote.branches['release/v1.0'] = 'c_release';
      remote.branches['temp-feature'] = 'c_temp';

      // 1. Cannot delete default branch 'main'
      expect(() => sim.deleteBranch(repo.id, 'main')).toThrow(/Cannot delete default branch/);

      // 2. Cannot delete protected branch 'release/v1.0'
      expect(() => sim.deleteBranch(repo.id, 'release/v1.0')).toThrow(/Cannot delete protected branch/);

      // 3. Can delete unprotected branch 'temp-feature'
      const deleted = sim.deleteBranch(repo.id, 'temp-feature');
      expect(deleted).toBe(true);
      expect(remote.branches['temp-feature']).toBeUndefined();
    });

    it('matches wildcard patterns like * and release/*', () => {
      const repo = sim.createRepository({ owner: 'vietnam-org', name: 'wildcard-repo' });
      sim.addBranchProtectionRule(repo.id, {
        branchPattern: '*',
        requirePullRequest: true,
        requiredApprovals: 1,
        requireStatusChecks: false,
        blockForcePush: true,
        blockDeletion: true,
      });

      const engine = new GitEngine();
      engine.execute('git init');
      engine.execute(`git remote add origin https://gitacademy.local/${repo.id}.git`);
      engine.execute('echo "code" > a.txt');
      engine.execute('git add a.txt');
      engine.execute('git commit -m "init"');
      engine.execute('git branch custom-feature');

      const pushRes = engine.execute('git push origin custom-feature');
      expect(pushRes.exitCode).toBe(1);
      expect(pushRes.stderr).toContain('direct pushes to protected branch');
    });
  });

  // =========================================================================
  // 2. CODEOWNERS Suite
  // =========================================================================
  describe('CODEOWNERS Workflow & Reviewer Assignment', () => {
    it('parses basic patterns with single and multiple owners', () => {
      const content = `
        /src/auth/* @alice
        /src/billing/* @bob @carol
        docs/* @vietnam-docs
      `;

      const rules = parseCodeOwners(content);
      expect(rules).toHaveLength(3);
      expect(rules[0]).toEqual({ pattern: '/src/auth/*', owners: ['@alice'] });
      expect(rules[1]).toEqual({ pattern: '/src/billing/*', owners: ['@bob', '@carol'] });
      expect(rules[2]).toEqual({ pattern: 'docs/*', owners: ['@vietnam-docs'] });
    });

    it('ignores comments and empty lines and normalizes handle prefixes', () => {
      const content = `
        # Global codeowners
        # Another comment
        * @admin

        # Database team without @
        /prisma/* dbteam @dba

        
      `;

      const rules = parseCodeOwners(content);
      expect(rules).toHaveLength(2);
      expect(rules[0]).toEqual({ pattern: '*', owners: ['@admin'] });
      expect(rules[1]).toEqual({ pattern: '/prisma/*', owners: ['@dbteam', '@dba'] });
    });

    it('handles empty string or whitespace-only CODEOWNERS content', () => {
      expect(parseCodeOwners('')).toEqual([]);
      expect(parseCodeOwners('   \n  # only comments\n  ')).toEqual([]);
    });

    it('matches wildcard extension patterns (*.md, *.ts)', () => {
      expect(matchPattern('*.md', 'README.md')).toBe(true);
      expect(matchPattern('*.md', '/docs/architecture.md')).toBe(true);
      expect(matchPattern('*.md', 'index.ts')).toBe(false);
      expect(matchPattern('*.ts', 'src/server.ts')).toBe(true);
    });

    it('matches directory wildcard patterns (/src/auth/*, docs/*)', () => {
      expect(matchPattern('/src/auth/*', '/src/auth/jwt.ts')).toBe(true);
      expect(matchPattern('/src/auth/*', 'src/auth/session.ts')).toBe(true);
      expect(matchPattern('/src/auth/*', '/src/api/routes.ts')).toBe(false);
    });

    it('matches recursive directory patterns (/src/payment/**)', () => {
      expect(matchPattern('/src/payment/**', '/src/payment/v1/gateway/stripe.ts')).toBe(true);
      expect(matchPattern('src/payment/**', 'src/payment/index.ts')).toBe(true);
      expect(matchPattern('/src/payment/**', '/src/auth/login.ts')).toBe(false);
    });

    it('finds reviewers for single and multiple changed files', () => {
      const rules = [
        { pattern: '/src/auth/*', owners: ['@security-lead'] },
        { pattern: '/src/billing/*', owners: ['@finance-team'] },
        { pattern: '*.md', owners: ['@tech-writer'] },
      ];

      const r1 = findReviewersForFiles(rules, ['src/auth/login.ts']);
      expect(r1).toEqual(['@security-lead']);

      const r2 = findReviewersForFiles(rules, ['src/auth/token.ts', 'src/billing/stripe.ts', 'README.md']);
      expect(r2).toContain('@security-lead');
      expect(r2).toContain('@finance-team');
      expect(r2).toContain('@tech-writer');
      expect(r2).toHaveLength(3);
    });

    it('applies precedence so later rules in CODEOWNERS override earlier ones for the same file', () => {
      const rules = [
        { pattern: '*', owners: ['@general-team'] },
        { pattern: '/docs/*', owners: ['@docs-team'] },
        { pattern: '/docs/confidential.md', owners: ['@legal-team'] },
      ];

      const r1 = findReviewersForFiles(rules, ['src/index.ts']);
      expect(r1).toEqual(['@general-team']);

      const r2 = findReviewersForFiles(rules, ['docs/overview.md']);
      expect(r2).toEqual(['@docs-team']);

      const r3 = findReviewersForFiles(rules, ['docs/confidential.md']);
      expect(r3).toEqual(['@legal-team']);
    });

    it('returns empty array when no CODEOWNERS match or files list is empty', () => {
      const rules = [{ pattern: '/src/auth/*', owners: ['@alice'] }];
      expect(findReviewersForFiles(rules, [])).toEqual([]);
      expect(findReviewersForFiles(rules, ['random/file.txt'])).toEqual([]);
    });

    it('integrates getRequiredReviewersForPR with GitHubSimulator diffs', () => {
      const repo = sim.createRepository({ owner: 'vietnam-org', name: 'app-codeowners' });
      sim.setCodeOwners(repo.id, [
        { pattern: '/src/core/*', owners: ['@core-team'] },
        { pattern: '/src/ui/*', owners: ['@frontend-lead'] },
      ]);

      const net = RemoteNetworkRegistry.getInstance();
      const remote = net.get(repo.remoteRepositoryId)!;
      remote.branches['main'] = 'hash_main';
      remote.branches['feat/ui-core'] = 'hash_feat';

      remote.commits['hash_main'] = {
        hash: 'hash_main',
        shortHash: 'main000',
        message: 'base',
        author: { name: 'A', email: 'a@local' },
        timestamp: Date.now(),
        parents: [],
        tree: {},
      };
      remote.commits['hash_feat'] = {
        hash: 'hash_feat',
        shortHash: 'feat000',
        message: 'feat',
        author: { name: 'A', email: 'a@local' },
        timestamp: Date.now(),
        parents: ['hash_main'],
        tree: {
          'src/core/engine.ts': 'export const engine = 1;',
          'src/ui/Button.tsx': 'export const Button = () => null;',
        },
      };

      const pr = sim.createPullRequest({
        title: 'feat: add UI and core components',
        description: 'new components',
        author: 'dev-viet',
        sourceRepository: repo.id,
        sourceBranch: 'feat/ui-core',
        targetRepository: repo.id,
        targetBranch: 'main',
        commits: ['hash_feat'],
      });

      const requiredReviewers = sim.getRequiredReviewersForPR(repo.id, pr.id);
      expect(requiredReviewers).toContain('@core-team');
      expect(requiredReviewers).toContain('@frontend-lead');
      expect(requiredReviewers).toHaveLength(2);
    });
  });

  // =========================================================================
  // 3. Semantic Versioning & Conventional Commits Suite
  // =========================================================================
  describe('Semantic Versioning & Conventional Commits Suite', () => {
    it('parses standard semantic version strings with or without v prefix', () => {
      expect(parseSemanticVersion('1.2.3')).toEqual({ major: 1, minor: 2, patch: 3 });
      expect(parseSemanticVersion('v2.5.11')).toEqual({ major: 2, minor: 5, patch: 11 });
      expect(parseSemanticVersion('V0.0.1')).toEqual({ major: 0, minor: 0, patch: 1 });
      expect(parseSemanticVersion('')).toEqual({ major: 0, minor: 0, patch: 0 });
      expect(parseSemanticVersion('1.0')).toEqual({ major: 1, minor: 0, patch: 0 });
    });

    it('formats semantic version objects with custom or default prefixes', () => {
      const v = { major: 2, minor: 1, patch: 0 };
      expect(formatSemanticVersion(v)).toBe('v2.1.0');
      expect(formatSemanticVersion(v, '')).toBe('2.1.0');
      expect(formatSemanticVersion(v, 'release-')).toBe('release-2.1.0');
    });

    it('validates conventional commits format and extracts type, scope, and breaking status', () => {
      const featRes = validateConventionalCommit('feat(auth): add google sso login');
      expect(featRes.valid).toBe(true);
      expect(featRes.type).toBe('feat');
      expect(featRes.scope).toBe('auth');
      expect(featRes.isBreaking).toBe(false);

      const breakRes = validateConventionalCommit('feat(api)!: migrate to graphql');
      expect(breakRes.valid).toBe(true);
      expect(breakRes.isBreaking).toBe(true);

      const invalidRes = validateConventionalCommit('update readme and styles');
      expect(invalidRes.valid).toBe(false);
      expect(invalidRes.error).toBeDefined();
    });

    it('detects BREAKING CHANGE in commit footer', () => {
      const msg = `refactor(db): drop postgres 11 support

BREAKING CHANGE: Minimum supported PostgreSQL version is now 14.`;
      const res = validateConventionalCommit(msg);
      expect(res.valid).toBe(true);
      expect(res.isBreaking).toBe(true);
      expect(res.breakingDescription).toContain('Minimum supported PostgreSQL version');
    });

    it('computes next version: no bump for chore, docs, test', () => {
      const current = { major: 1, minor: 2, patch: 3 };
      const commits = [
        'chore: bump dev dependencies',
        'docs: fix typo in installation guide',
        'test: add edge cases for parser',
      ];
      const next = computeNextVersion(current, commits);
      expect(next).toEqual({ major: 1, minor: 2, patch: 3 });
    });

    it('computes next version: patch bump for fix, perf, refactor', () => {
      const current = { major: 1, minor: 0, patch: 0 };
      expect(computeNextVersion(current, ['fix: prevent null pointer on empty input'])).toEqual({
        major: 1,
        minor: 0,
        patch: 1,
      });
      expect(computeNextVersion(current, ['perf: cache regex compilation'])).toEqual({
        major: 1,
        minor: 0,
        patch: 1,
      });
      expect(computeNextVersion(current, ['refactor: split monolith module'])).toEqual({
        major: 1,
        minor: 0,
        patch: 1,
      });
    });

    it('computes next version: minor bump for feat commits', () => {
      const current = { major: 1, minor: 4, patch: 2 };
      const commits = [
        'fix: bug in validation',
        'feat: add dark mode switch',
        'docs: update screenshot',
      ];
      const next = computeNextVersion(current, commits);
      expect(next).toEqual({ major: 1, minor: 5, patch: 0 });
    });

    it('computes next version: major bump for breaking changes', () => {
      const current = { major: 2, minor: 3, patch: 9 };
      const commits = [
        'feat: add new payment provider',
        'feat!: drop legacy authentication endpoint',
        'fix: minor rounding issue',
      ];
      const next = computeNextVersion(current, commits);
      expect(next).toEqual({ major: 3, minor: 0, patch: 0 });
    });

    it('computes next version: major takes precedence over minor and patch', () => {
      const current = { major: 0, minor: 9, patch: 5 };
      const commits = [
        'fix(core): memory leak',
        'feat(api): batch endpoints',
        'refactor(db)!: change primary keys to uuid',
      ];
      const next = computeNextVersion(current, commits);
      expect(next).toEqual({ major: 1, minor: 0, patch: 0 });
    });

    it('creates GitHub releases with tags and retrieves them', () => {
      const repo = sim.createRepository({ owner: 'vietnam-org', name: 'release-repo' });
      const release = sim.createRelease(repo.id, {
        tag: 'v1.0.0',
        title: 'Production v1.0.0 Release',
        notes: 'Initial stable release with full Git engine support.',
        commitHash: 'c_release_commit',
        prerelease: false,
      });

      expect(release.tag).toBe('v1.0.0');
      expect(release.title).toContain('Production v1.0.0');

      const allReleases = sim.getReleases(repo.id);
      expect(allReleases).toHaveLength(1);
      expect(sim.getReleaseByTag(repo.id, 'v1.0.0')).toBeDefined();

      // Duplicate tag creation throws
      expect(() =>
        sim.createRelease(repo.id, {
          tag: 'v1.0.0',
          title: 'Duplicate',
          notes: '',
          commitHash: 'c_other',
        })
      ).toThrow(/already exists/);
    });

    it('handles cumulative release cycle from v0.1.0 to v2.0.0', () => {
      let ver = parseSemanticVersion('v0.1.0');

      // Sprint 1: Fix bug -> v0.1.1
      ver = computeNextVersion(ver, ['fix: resolve memory leak on unmount']);
      expect(formatSemanticVersion(ver)).toBe('v0.1.1');

      // Sprint 2: New feature -> v0.2.0
      ver = computeNextVersion(ver, ['feat: interactive rebase visualization']);
      expect(formatSemanticVersion(ver)).toBe('v0.2.0');

      // Sprint 3: Breaking overhaul -> v1.0.0
      ver = computeNextVersion(ver, ['feat!: complete redesigned architecture']);
      expect(formatSemanticVersion(ver)).toBe('v1.0.0');

      // Sprint 4: Another breaking change -> v2.0.0
      ver = computeNextVersion(ver, ['refactor!: rename public sdk interfaces']);
      expect(formatSemanticVersion(ver)).toBe('v2.0.0');
    });

    it('parses team handles with org prefixes in CODEOWNERS', () => {
      const content = '/infra/* @vietnam-org/platform-engineers @cloud-leads';
      const rules = parseCodeOwners(content);
      expect(rules[0].owners).toEqual(['@vietnam-org/platform-engineers', '@cloud-leads']);
    });

    it('matches paths regardless of leading slash in file path or pattern', () => {
      expect(matchPattern('src/utils/*', 'src/utils/math.ts')).toBe(true);
      expect(matchPattern('/src/utils/*', 'src/utils/math.ts')).toBe(true);
      expect(matchPattern('src/utils/*', '/src/utils/math.ts')).toBe(true);
      expect(matchPattern('/src/utils/*', '/src/utils/math.ts')).toBe(true);
    });

    it('validates conventional commits with complex scopes containing hyphens and numbers', () => {
      const res = validateConventionalCommit('feat(api-v2.1): introduce pagination');
      expect(res.valid).toBe(true);
      expect(res.scope).toBe('api-v2.1');
      expect(res.description).toBe('introduce pagination');
    });

    it('handles descriptions containing colons without splitting errors', () => {
      const res = validateConventionalCommit('fix: port: 8080 is already in use error');
      expect(res.valid).toBe(true);
      expect(res.type).toBe('fix');
      expect(res.description).toBe('port: 8080 is already in use error');
    });

    it('emits simulator events when reviews and releases are created', () => {
      const repo = sim.createRepository({ owner: 'vietnam-org', name: 'event-repo' });
      let reviewEmitted = false;
      let releaseEmitted = false;

      sim.getEvents().on('pr:reviewed', () => {
        reviewEmitted = true;
      });
      sim.getEvents().on('release:created' as any, () => {
        releaseEmitted = true;
      });

      const net = RemoteNetworkRegistry.getInstance();
      const remote = net.get(repo.remoteRepositoryId)!;
      remote.branches['main'] = 'hash_main';
      remote.branches['feat/ev'] = 'hash_feat';
      remote.commits['hash_main'] = {
        hash: 'hash_main',
        shortHash: 'main000',
        message: 'base',
        author: { name: 'A', email: 'a@local' },
        timestamp: Date.now(),
        parents: [],
        tree: {},
      };
      remote.commits['hash_feat'] = {
        hash: 'hash_feat',
        shortHash: 'feat000',
        message: 'feat',
        author: { name: 'A', email: 'a@local' },
        timestamp: Date.now(),
        parents: ['hash_main'],
        tree: {},
      };

      const pr = sim.createPullRequest({
        title: 'feat: event test',
        description: 'test',
        author: 'dev',
        sourceRepository: repo.id,
        sourceBranch: 'feat/ev',
        targetRepository: repo.id,
        targetBranch: 'main',
        commits: ['hash_feat'],
      });

      sim.addReview({
        targetRepository: repo.id,
        prId: pr.id,
        author: 'reviewer',
        type: 'approve',
        body: 'ok',
      });
      expect(reviewEmitted).toBe(true);

      sim.createRelease(repo.id, {
        tag: 'v1.0.0',
        title: 'v1',
        notes: 'notes',
        commitHash: 'hash_main',
      });
      expect(releaseEmitted).toBe(true);
    });
  });
});
