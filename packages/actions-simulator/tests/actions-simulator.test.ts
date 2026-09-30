import { describe, it, expect, beforeEach } from 'vitest';
import {
  WorkflowParser,
  YamlWorkflowValidator,
  WorkflowRunner,
  DagScheduler,
  SafeCommandRuntime,
  SecretRedactor,
  ExpressionEvaluator,
  createDefaultContexts,
  ArtifactStore,
  CacheStore,
  EnvironmentManager,
  ActionRegistry,
  CheckoutAction,
  shouldTriggerPush,
  shouldTriggerPullRequest,
} from '../src';
import { GitHubSimulator } from '@git-academy/github-simulator';

describe('GitHub Actions Simulator Suite', () => {
  beforeEach(() => {
    ArtifactStore.getInstance().reset();
    CacheStore.getInstance().reset();
    EnvironmentManager.getInstance().reset();
    WorkflowRunner.resetHistory();
  });

  // =========================================================================
  // 1. Parser & Validation Tests
  // =========================================================================
  describe('Workflow Parser & YAML Validation', () => {
    it('validates a complete, standard GitHub Actions workflow YAML', () => {
      const yaml = `
name: CI Pipeline
on:
  push:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Run test suite
        run: npm test
`;
      const validation = YamlWorkflowValidator.validate(yaml);
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);

      const parsed = WorkflowParser.parse(yaml);
      expect(parsed.name).toBe('CI Pipeline');
      expect(parsed.jobs.test).toBeDefined();
      expect(parsed.jobs.test.runsOn).toBe('ubuntu-latest');
      expect(parsed.jobs.test.steps).toHaveLength(2);
    });

    it('rejects invalid YAML syntax', () => {
      const invalidYaml = `
name: Broken
on: [push
jobs:
  broken:
`;
      const validation = YamlWorkflowValidator.validate(invalidYaml);
      expect(validation.valid).toBe(false);
      expect(validation.errors[0].message).toContain('YAML Syntax Error');
    });

    it('flags missing required "on" and "jobs" root keys', () => {
      const missingOn = `
name: Missing On
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: echo "hello"
`;
      const val1 = YamlWorkflowValidator.validate(missingOn);
      expect(val1.valid).toBe(false);
      expect(val1.errors.some((e) => e.field === 'on')).toBe(true);

      const missingJobs = `
name: Missing Jobs
on: push
`;
      const val2 = YamlWorkflowValidator.validate(missingJobs);
      expect(val2.valid).toBe(false);
      expect(val2.errors.some((e) => e.field === 'jobs')).toBe(true);
    });

    it('detects step without run or uses', () => {
      const yaml = `
name: Invalid Step
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Empty step
`;
      const validation = YamlWorkflowValidator.validate(yaml);
      expect(validation.valid).toBe(false);
      expect(validation.errors[0].message).toContain('must define either "run" or "uses"');
    });
  });

  // =========================================================================
  // 2. Trigger Engine & Filter Tests
  // =========================================================================
  describe('Trigger Engine & Branch/Path Filtering', () => {
    it('triggers push on matching branch pattern and ignores non-matching branches', () => {
      const workflow = WorkflowParser.parse(`
name: Build
on:
  push:
    branches:
      - main
      - 'release/*'
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: echo "building"
`);

      // Push to main triggers
      expect(shouldTriggerPush(workflow, { ref: 'refs/heads/main' })).toBe(true);
      // Push to release/v1.0 triggers
      expect(shouldTriggerPush(workflow, { ref: 'refs/heads/release/v1.0' })).toBe(true);
      // Push to feature branch does not trigger
      expect(shouldTriggerPush(workflow, { ref: 'refs/heads/feat/login' })).toBe(false);
    });

    it('honors branches-ignore filters', () => {
      const workflow = WorkflowParser.parse(`
name: CI
on:
  push:
    branches-ignore:
      - 'temp/*'
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - run: npm test
`);

      expect(shouldTriggerPush(workflow, { ref: 'refs/heads/main' })).toBe(true);
      expect(shouldTriggerPush(workflow, { ref: 'refs/heads/temp/test' })).toBe(false);
    });

    it('evaluates pull_request target branch filters', () => {
      const workflow = WorkflowParser.parse(`
name: PR Check
on:
  pull_request:
    branches: [main]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - run: npm test
`);

      // PR targeting main
      expect(
        shouldTriggerPullRequest(workflow, {
          action: 'opened',
          number: 1,
          pull_request: {
            head: { ref: 'feature/auth', sha: '123' },
            base: { ref: 'main', sha: '456' },
            title: 'Add Auth',
          },
        })
      ).toBe(true);

      // PR targeting dev branch
      expect(
        shouldTriggerPullRequest(workflow, {
          action: 'opened',
          number: 2,
          pull_request: {
            head: { ref: 'feature/auth', sha: '123' },
            base: { ref: 'develop', sha: '789' },
            title: 'Add Auth to dev',
          },
        })
      ).toBe(false);
    });
  });

  // =========================================================================
  // 3. DAG Scheduler, Dependency Order & Cycle Detection
  // =========================================================================
  describe('DAG Scheduler & Matrix Expansion', () => {
    it('orders jobs topologically according to "needs" dependencies', () => {
      const jobs = {
        deploy: { runsOn: 'ubuntu-latest', needs: ['build'], steps: [{ run: 'echo deploy' }] },
        build: { runsOn: 'ubuntu-latest', needs: ['lint', 'test'], steps: [{ run: 'echo build' }] },
        lint: { runsOn: 'ubuntu-latest', steps: [{ run: 'echo lint' }] },
        test: { runsOn: 'ubuntu-latest', steps: [{ run: 'echo test' }] },
      };

      const stages = DagScheduler.schedule(jobs);
      expect(stages).toHaveLength(3);

      // Stage 1: lint and test (independent)
      const stage1Ids = stages[0].map((n) => n.id);
      expect(stage1Ids).toContain('lint');
      expect(stage1Ids).toContain('test');

      // Stage 2: build (needs lint & test)
      expect(stages[1].map((n) => n.id)).toEqual(['build']);

      // Stage 3: deploy (needs build)
      expect(stages[2].map((n) => n.id)).toEqual(['deploy']);
    });

    it('throws error when a dependency cycle is detected', () => {
      const circularJobs = {
        jobA: { runsOn: 'ubuntu-latest', needs: ['jobB'], steps: [{ run: 'echo A' }] },
        jobB: { runsOn: 'ubuntu-latest', needs: ['jobA'], steps: [{ run: 'echo B' }] },
      };

      expect(() => DagScheduler.schedule(circularJobs)).toThrow(/Circular dependency detected/);
    });

    it('expands matrix strategy into Cartesian product job instances', () => {
      const matrixJob = {
        runsOn: '${{ matrix.os }}',
        strategy: {
          matrix: {
            node: [18, 20],
            os: ['ubuntu-latest', 'windows-latest'],
          },
        },
        steps: [{ run: 'node -v' }],
      };

      const stages = DagScheduler.schedule({ test: matrixJob });
      expect(stages[0]).toHaveLength(4);

      const displayNames = stages[0].map((n) => n.displayName);
      expect(displayNames).toContain('test (node=18, os=ubuntu-latest)');
      expect(displayNames).toContain('test (node=18, os=windows-latest)');
      expect(displayNames).toContain('test (node=20, os=ubuntu-latest)');
      expect(displayNames).toContain('test (node=20, os=windows-latest)');
    });
  });

  // =========================================================================
  // 4. Safe Runner & Host Security Isolation (Zero Host Shell Exec)
  // =========================================================================
  describe('Safe Command Runtime & Host Security', () => {
    it('executes educational commands in sandboxed memory without host shell', () => {
      const res = SafeCommandRuntime.execute('npm test', {
        workingDirectory: '/home/runner/work',
        env: {},
      });

      expect(res.exitCode).toBe(0);
      expect(res.stdout.some((l) => l.includes('PASS'))).toBe(true);
      expect(res.stderr).toHaveLength(0);
    });

    it('simulates build commands deterministically', () => {
      const res = SafeCommandRuntime.execute('npm run build', {
        workingDirectory: '/home/runner/work',
        env: {},
      });

      expect(res.exitCode).toBe(0);
      expect(res.stdout.some((l) => l.includes('dist/assets/app.js'))).toBe(true);
    });

    it('safely intercepts dangerous host commands (rm -rf /, curl, sudo)', () => {
      const res = SafeCommandRuntime.execute('rm -rf / && curl http://malicious.site', {
        workingDirectory: '/home/runner/work',
        env: {},
      });

      expect(res.exitCode).toBe(0);
      expect(res.stdout.some((l) => l.includes('[SafeRuntime Guard] Host security policy intercepted command'))).toBe(true);
    });

    it('simulates test failure when FAIL_TESTS=true or failing command configured', () => {
      const res = SafeCommandRuntime.execute('npm test', {
        workingDirectory: '/home/runner/work',
        env: { FAIL_TESTS: 'true' },
      });

      expect(res.exitCode).toBe(1);
      expect(res.stderr.some((l) => l.includes('FAIL'))).toBe(true);
    });
  });

  // =========================================================================
  // 5. Expression Evaluator & Contexts
  // =========================================================================
  describe('Contexts & Expression Evaluator', () => {
    const contexts = createDefaultContexts({
      github: {
        event_name: 'push',
        ref: 'refs/heads/main',
        ref_name: 'main',
        sha: 'abc123456789',
        actor: 'vietnam-student',
        repository: 'demo/repo',
        workflow: 'CI',
        run_id: 1,
        run_number: 1,
      },
      secrets: {
        SUPER_SECRET_KEY: 'secret-xyz-token-value',
      },
      matrix: {
        node: 20,
        os: 'ubuntu-latest',
      },
    });

    it('resolves dotted property paths', () => {
      expect(ExpressionEvaluator.resolvePath('github.ref', contexts)).toBe('refs/heads/main');
      expect(ExpressionEvaluator.resolvePath('matrix.node', contexts)).toBe(20);
      expect(ExpressionEvaluator.resolvePath('github.actor', contexts)).toBe('vietnam-student');
    });

    it('evaluates conditions with == and !=', () => {
      expect(ExpressionEvaluator.evaluateCondition("github.ref == 'refs/heads/main'", contexts)).toBe(true);
      expect(ExpressionEvaluator.evaluateCondition("github.ref == 'refs/heads/feature'", contexts)).toBe(false);
      expect(ExpressionEvaluator.evaluateCondition("matrix.node != 18", contexts)).toBe(true);
    });

    it('evaluates helper functions: contains(), startsWith(), endsWith()', () => {
      expect(ExpressionEvaluator.evaluateCondition("contains(github.ref, 'main')", contexts)).toBe(true);
      expect(ExpressionEvaluator.evaluateCondition("startsWith(github.ref, 'refs/heads/')", contexts)).toBe(true);
      expect(ExpressionEvaluator.evaluateCondition("endsWith(github.ref, 'main')", contexts)).toBe(true);
      expect(ExpressionEvaluator.evaluateCondition("contains(github.ref, 'release')", contexts)).toBe(false);
    });

    it('evaluates success(), failure(), and always()', () => {
      expect(ExpressionEvaluator.evaluateCondition('success()', contexts, { previousFailed: false })).toBe(true);
      expect(ExpressionEvaluator.evaluateCondition('success()', contexts, { previousFailed: true })).toBe(false);
      expect(ExpressionEvaluator.evaluateCondition('failure()', contexts, { previousFailed: true })).toBe(true);
      expect(ExpressionEvaluator.evaluateCondition('always()', contexts, { previousFailed: true })).toBe(true);
    });

    it('interpolates ${{ ... }} in templates', () => {
      const template = 'Running Node ${{ matrix.node }} on ${{ matrix.os }} for ${{ github.actor }}';
      const output = ExpressionEvaluator.interpolate(template, contexts);
      expect(output).toBe('Running Node 20 on ubuntu-latest for vietnam-student');
    });
  });

  // =========================================================================
  // 6. Secrets Redactor Tests
  // =========================================================================
  describe('Secret Redactor', () => {
    it('masks secret values in command output and logs with ***', () => {
      const redactor = new SecretRedactor({
        DB_PASSWORD: 'super-classified-db-pass',
        API_TOKEN: 'ghp_secretTokenForGitHubActions123',
      });

      const log = 'Connecting with token ghp_secretTokenForGitHubActions123 to database with super-classified-db-pass now.';
      const masked = redactor.redact(log);

      expect(masked).toBe('Connecting with token *** to database with *** now.');
      expect(masked).not.toContain('super-classified-db-pass');
      expect(masked).not.toContain('ghp_secretTokenForGitHubActions123');
    });
  });

  // =========================================================================
  // 7. Full Workflow Execution (Checkout, Test, Artifact, Environment)
  // =========================================================================
  describe('End-to-End Workflow Execution', () => {
    it('executes a complete multi-job CI workflow with artifact upload & download', async () => {
      const yaml = `
name: Full CI/CD
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install and Build
        run: |
          npm install
          npm run build
      - name: Upload Build Artifact
        uses: actions/upload-artifact@v4
        with:
          name: app-dist
          path: dist/

  test:
    runs-on: ubuntu-latest
    needs: [build]
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Download Artifact
        uses: actions/download-artifact@v4
        with:
          name: app-dist
          path: build/
      - name: Run Tests
        run: npm test
`;

      const result = await WorkflowRunner.execute(yaml, {
        ref: 'refs/heads/main',
        event: 'push',
      });

      expect(result.status).toBe('success');
      expect(result.jobs.build.status).toBe('success');
      expect(result.jobs.test.status).toBe('success');

      // Verify artifact was created in store
      expect(ArtifactStore.getInstance().has('app-dist')).toBe(true);
    });

    it('pauses job in waiting_approval when targeting environment requiring approval', async () => {
      const yaml = `
name: Deployment
on: push
jobs:
  deploy-prod:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - run: echo "Deploying to production server..."
`;

      const run = await WorkflowRunner.execute(yaml, { forceRun: true });
      expect(run.status).toBe('waiting_approval');
      expect(run.jobs['deploy-prod'].status).toBe('waiting_approval');

      // Approve deployment
      const resumed = await WorkflowRunner.approveAndResume(run.runId, 'deploy-prod', 'tech-lead');
      expect(resumed?.status).toBe('success');
      expect(resumed?.jobs['deploy-prod'].status).toBe('success');
    });

    it('skips downstream jobs when an upstream dependency fails', async () => {
      const yaml = `
name: Failing Pipeline
on: push
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - run: npm test
  deploy:
    runs-on: ubuntu-latest
    needs: [test]
    steps:
      - run: echo "deploy"
`;

      const run = await WorkflowRunner.execute(yaml, {
        forceRun: true,
        failingCommands: ['npm test'],
      });

      expect(run.status).toBe('failure');
      expect(run.jobs.test.status).toBe('failure');
      expect(run.jobs.deploy.status).toBe('skipped');
    });
  });

  // =========================================================================
  // 8. Integration with GitHub Simulator: Required Status Checks (PART R)
  // =========================================================================
  describe('Level 6 <-> Level 7 Status Checks Integration', () => {
    it('blocks PR merge when a required status check has not succeeded, and permits merge once check passes', async () => {
      const sim = new GitHubSimulator();
      const repo = sim.createRepository({
        id: 'vietnam-org/student-project',
        owner: 'vietnam-org',
        name: 'student-project',
        defaultBranch: 'main',
      });

      // Protect main branch with required status check "ci/build"
      sim.addBranchProtectionRule(repo.id, {
        branchPattern: 'main',
        requirePullRequest: true,
        requiredApprovals: 0,
        requireStatusChecks: true,
        requiredStatusChecks: ['ci/build'],
        blockForcePush: true,
        blockDeletion: true,
      });

      const net = (await import('@git-academy/git-engine')).RemoteNetworkRegistry.getInstance();
      const remote = net.get(repo.remoteRepositoryId)!;
      remote.branches['main'] = 'c_main';
      remote.branches['feat/test'] = 'c_feat';
      remote.commits['c_main'] = {
        hash: 'c_main',
        shortHash: 'c_main0',
        message: 'base',
        author: { name: 'A', email: 'a@local' },
        timestamp: Date.now(),
        parents: [],
        tree: {},
      };
      remote.commits['c_feat'] = {
        hash: 'c_feat',
        shortHash: 'c_feat0',
        message: 'feat: test',
        author: { name: 'A', email: 'a@local' },
        timestamp: Date.now(),
        parents: ['c_main'],
        tree: {},
      };

      const pr = sim.createPullRequest({
        title: 'New feature',
        description: 'Testing CI status checks',
        author: 'student',
        sourceRepository: repo.id,
        sourceBranch: 'feat/test',
        targetRepository: repo.id,
        targetBranch: 'main',
        commits: ['c_feat'],
      });

      // 1. Initial check: missing check blocks merge
      const check1 = sim.canMergePullRequest(repo.id, pr.id);
      expect(check1.canMerge).toBe(false);
      expect(check1.reasons.some((r) => r.includes('Required status check "ci/build" is missing'))).toBe(true);

      // Attempting merge throws
      expect(() => sim.mergePullRequest({ targetRepository: repo.id, prId: pr.id })).toThrow(
        /required status check "ci\/build"/i
      );

      // 2. Set status check to pending or failure
      sim.setStatusCheck({
        targetRepository: repo.id,
        prId: pr.id,
        context: 'ci/build',
        state: 'failure',
        description: 'Build failed in CI',
      });

      const check2 = sim.canMergePullRequest(repo.id, pr.id);
      expect(check2.canMerge).toBe(false);
      expect(check2.reasons.some((r) => r.includes('Required status check "ci/build" is failure'))).toBe(true);

      // 3. Workflow passes: status check becomes success
      sim.setStatusCheck({
        targetRepository: repo.id,
        prId: pr.id,
        context: 'ci/build',
        state: 'success',
        description: 'Build succeeded',
      });

      const check3 = sim.canMergePullRequest(repo.id, pr.id);
      expect(check3.canMerge).toBe(true);
      expect(check3.reasons).toHaveLength(0);
    });
  });
});
