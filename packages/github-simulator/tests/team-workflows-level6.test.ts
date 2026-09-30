import { describe, it, expect, beforeEach } from 'vitest';
import { GitHubSimulator } from '../src/simulator';
import {
  validateConventionalCommit,
  parseSemanticVersion,
  formatSemanticVersion,
  computeNextVersion,
  parseCodeOwners,
  findReviewersForFiles,
} from '../src';
import { GitEngine, RemoteNetworkRegistry } from '@git-academy/git-engine';

describe('Level 6 Team Workflows & Collaboration Simulator (Parts 12 - 19)', () => {
  let sim: GitHubSimulator;

  beforeEach(() => {
    RemoteNetworkRegistry.getInstance().clear();
    sim = new GitHubSimulator();
  });

  describe('Part 14: Branch Protection Rules & Push Enforcement', () => {
    it('rejects direct push to protected branch and allows pushing to feature branch', () => {
      // Create teacher remote repository
      sim.createRepository({
        owner: 'company',
        name: 'ecommerce-app',
        defaultBranch: 'main',
      });

      // Add branch protection rule to 'main'
      sim.addBranchProtectionRule('company/ecommerce-app', {
        branchPattern: 'main',
        requirePullRequest: true,
        requiredApprovals: 1,
        requireStatusChecks: true,
        blockForcePush: true,
        blockDeletion: true,
      });

      // Student initializes local repository and links remote
      const engine = new GitEngine();
      engine.execute('git init');
      engine.execute('git config user.name "Alice"');
      engine.execute('git config user.email "alice@company.com"');
      engine.execute('git remote add origin https://gitacademy.local/company/ecommerce-app.git');

      // Attempt direct push to protected 'main'
      engine.execute('echo "secret direct push" > secret.txt');
      engine.execute('git add secret.txt');
      engine.execute('git commit -m "feat: secret direct change"');

      const pushDirectRes = engine.execute('git push origin main');
      expect(pushDirectRes.exitCode).toBe(1);
      expect(pushDirectRes.stderr).toContain("direct pushes to protected branch 'main' are not allowed");

      // Now create a feature branch and push
      engine.execute('git switch -c feature/coupon');
      engine.execute('echo "coupon feature" > coupon.js');
      engine.execute('git add coupon.js');
      engine.execute('git commit -m "feat(coupon): add discount code validator"');

      const pushFeatureRes = engine.execute('git push -u origin feature/coupon');
      expect(pushFeatureRes.exitCode).toBe(0);
      expect(pushFeatureRes.stdout).toContain('feature/coupon -> feature/coupon');
    });
  });

  describe('Part 15: Educational CODEOWNERS', () => {
    it('parses CODEOWNERS rules and identifies required reviewers based on changed paths', () => {
      const codeOwnersContent = `
# CODEOWNERS
/src/auth/* @alice
/src/payment/* @bob
*.md @docs-team
      `;

      const rules = parseCodeOwners(codeOwnersContent);
      expect(rules).toHaveLength(3);
      expect(rules[0].pattern).toBe('/src/auth/*');
      expect(rules[0].owners).toEqual(['@alice']);

      // Check reviewer mapping
      const authFiles = ['/src/auth/login.ts', '/src/auth/session.ts'];
      expect(findReviewersForFiles(rules, authFiles)).toEqual(['@alice']);

      const mixedFiles = ['/src/payment/checkout.ts', 'README.md'];
      const mixedReviewers = findReviewersForFiles(rules, mixedFiles);
      expect(mixedReviewers).toContain('@bob');
      expect(mixedReviewers).toContain('@docs-team');
    });

    it('assigns required reviewers for PR using GitHubSimulator', () => {
      const mainRepo = sim.createRepository({
        owner: 'org',
        name: 'core',
        defaultBranch: 'main',
      });

      sim.setCodeOwners('org/core', [
        { pattern: '/src/auth/*', owners: ['@alice'] },
        { pattern: '/src/billing/*', owners: ['@bob'] },
      ]);

      const net = RemoteNetworkRegistry.getInstance();
      const remote = net.get('org/core')!;
      remote.branches['main'] = 'c0';
      remote.commits['c0'] = {
        hash: 'c0',
        shortHash: 'c0',
        message: 'init',
        author: { name: 'Admin', email: 'admin@org.com' },
        timestamp: 100,
        parents: [],
        tree: { '/src/auth/auth.ts': 'old' },
      };

      remote.branches['feature/auth-update'] = 'c1';
      remote.commits['c1'] = {
        hash: 'c1',
        shortHash: 'c1',
        message: 'update',
        author: { name: 'Student', email: 'student@org.com' },
        timestamp: 200,
        parents: ['c0'],
        tree: { '/src/auth/auth.ts': 'new modified' },
      };

      const pr = sim.createPullRequest({
        sourceRepository: 'org/core',
        sourceBranch: 'feature/auth-update',
        targetRepository: 'org/core',
        targetBranch: 'main',
        title: 'feat: update auth logic',
        description: 'updates auth token expiry',
        author: 'student',
      });

      const requiredReviewers = sim.getRequiredReviewersForPR('org/core', pr.id);
      expect(requiredReviewers).toEqual(['@alice']);
    });
  });

  describe('Part 16: Conventional Commits Validation', () => {
    it('validates standard conventional commits with scope', () => {
      const valid1 = validateConventionalCommit('feat(auth): add google oauth login');
      expect(valid1.valid).toBe(true);
      expect(valid1.type).toBe('feat');
      expect(valid1.scope).toBe('auth');
      expect(valid1.isBreaking).toBe(false);

      const valid2 = validateConventionalCommit('fix: correct calculation of vat discount');
      expect(valid2.valid).toBe(true);
      expect(valid2.type).toBe('fix');
      expect(valid2.scope).toBeUndefined();
    });

    it('identifies breaking change with ! notation and BREAKING CHANGE footer', () => {
      const breaking1 = validateConventionalCommit('feat(api)!: remove v1 endpoints');
      expect(breaking1.valid).toBe(true);
      expect(breaking1.isBreaking).toBe(true);

      const breaking2 = validateConventionalCommit(
        'refactor: redesign config schema\n\nBREAKING CHANGE: port is now an integer'
      );
      expect(breaking2.valid).toBe(true);
      expect(breaking2.isBreaking).toBe(true);
      expect(breaking2.breakingDescription).toBe('port is now an integer');
    });

    it('rejects invalid or non-conventional messages', () => {
      const invalid1 = validateConventionalCommit('fixed stuff');
      expect(invalid1.valid).toBe(false);

      const invalid2 = validateConventionalCommit('random(scope): message');
      expect(invalid2.valid).toBe(false);
      expect(invalid2.error).toContain('không hợp lệ');
    });
  });

  describe('Part 17: Semantic Versioning Calculations', () => {
    it('parses and formats semver strings correctly', () => {
      const v = parseSemanticVersion('v1.2.3');
      expect(v).toEqual({ major: 1, minor: 2, patch: 3 });
      expect(formatSemanticVersion(v)).toBe('v1.2.3');
    });

    it('computes next version based on commit types', () => {
      const current = { major: 1, minor: 0, patch: 0 };

      // Only fixes -> patch
      const vPatch = computeNextVersion(current, [
        'fix: resolve race condition in cache',
        'docs: update installation instructions',
      ]);
      expect(vPatch).toEqual({ major: 1, minor: 0, patch: 1 });

      // Features + fixes -> minor
      const vMinor = computeNextVersion(current, [
        'fix: bug fix',
        'feat: add coupon engine',
      ]);
      expect(vMinor).toEqual({ major: 1, minor: 1, patch: 0 });

      // Breaking change -> major
      const vMajor = computeNextVersion(current, [
        'fix: bug fix',
        'feat: add feature',
        'feat!: change public api contract',
      ]);
      expect(vMajor).toEqual({ major: 2, minor: 0, patch: 0 });
    });
  });

  describe('Part 18: Release Simulator', () => {
    it('creates, lists, and queries releases for a repository', () => {
      sim.createRepository({
        owner: 'acme',
        name: 'web-service',
        defaultBranch: 'main',
      });

      const release1 = sim.createRelease('acme/web-service', {
        tag: 'v1.0.0',
        title: 'Release 1.0.0 Initial Launch',
        notes: '- Feat: initial user onboarding\n- Fix: login redirection',
        commitHash: 'hash123',
        prerelease: false,
      });

      expect(release1.tag).toBe('v1.0.0');

      const all = sim.getReleases('acme/web-service');
      expect(all).toHaveLength(1);

      const fetched = sim.getReleaseByTag('acme/web-service', 'v1.0.0');
      expect(fetched?.title).toBe('Release 1.0.0 Initial Launch');
    });
  });
});
