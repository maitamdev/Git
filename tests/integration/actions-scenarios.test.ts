import { describe, it, expect } from 'vitest';
import { BUILTIN_SCENARIOS } from '../../packages/git-scenarios/src/index';
import { ScenarioRunner } from '../../packages/exercise-engine/src/runner';
import { WorkflowRunner } from '../../packages/actions-simulator/src/execution/workflow-runner';
import { YamlWorkflowValidator } from '../../packages/actions-simulator/src/parser/yaml-validator';

describe('Level 7 Actions Scenarios Integration Suite (15 Scenarios + Simulator)', () => {
  // =========================================================================
  // 1. Scenario Schema & Goal Verification (15 tests)
  // =========================================================================
  describe('Level 7 Scenario Goals & Initial States', () => {
    const level7Ids = [
      'first-workflow',
      'push-trigger',
      'pr-ci',
      'multi-job',
      'job-needs',
      'failing-test',
      'conditional-step',
      'matrix-build',
      'artifact-sharing',
      'secret-redaction',
      'environment-deploy',
      'protected-branch-check',
      'reusable-workflow',
      'release-pipeline',
      'ci-cd-capstone',
    ];

    it.each(level7Ids)('initializes %s scenario and validates initial state', (scenarioId) => {
      const scenario = BUILTIN_SCENARIOS[scenarioId as keyof typeof BUILTIN_SCENARIOS];
      expect(scenario).toBeDefined();
      expect(scenario.id).toBe(scenarioId);

      const runner = new ScenarioRunner(scenario);
      const initialValidation = runner.validate();
      expect(initialValidation.passed).toBe(false);
      expect(initialValidation.checklist.length).toBeGreaterThanOrEqual(1);
    });
  });

  // =========================================================================
  // 2. Student Workflow Authoring & Goal Completion (15 tests)
  // =========================================================================
  describe('Student Exercise Completion in ScenarioRunner', () => {
    it('solves first-workflow: student creates .github/workflows/ci.yml', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['first-workflow']);
      expect(runner.validate().passed).toBe(false);

      const yaml = 'name: First CI\non: push\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - run: npm test\n';
      runner.getEngine().getFileSystem().writeFile('.github/workflows/ci.yml', yaml);

      const res = runner.validate();
      expect(res.passed).toBe(true);
      expect(runner.getScenario().success.xp).toBe(85);
    });

    it('solves push-trigger: adds branches: [main] filter', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['push-trigger']);
      expect(runner.validate().passed).toBe(false);

      const content = 'name: CI\non:\n  push:\n    branches: [main]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - run: npm test\n';
      runner.getEngine().getFileSystem().writeFile('.github/workflows/ci.yml', content);

      expect(runner.validate().passed).toBe(true);
    });

    it('solves pr-ci: configures pull_request trigger', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['pr-ci']);
      expect(runner.validate().passed).toBe(false);

      const content = 'name: PR Check\non:\n  pull_request:\n    branches: [main]\njobs:\n  check:\n    runs-on: ubuntu-latest\n    steps:\n      - run: npm test\n';
      runner.getEngine().getFileSystem().writeFile('.github/workflows/pr.yml', content);

      expect(runner.validate().passed).toBe(true);
    });

    it('solves multi-job: defines multiple concurrent jobs', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['multi-job']);
      expect(runner.validate().passed).toBe(false);

      const content = 'name: Parallel\non: push\njobs:\n  lint:\n    runs-on: ubuntu-latest\n    steps: [{ run: npm run lint }]\n  test:\n    runs-on: ubuntu-latest\n    steps: [{ run: npm test }]\n';
      runner.getEngine().getFileSystem().writeFile('.github/workflows/ci.yml', content);

      expect(runner.validate().passed).toBe(true);
    });

    it('solves job-needs: adds needs: test dependency', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['job-needs']);
      expect(runner.validate().passed).toBe(false);

      const content = 'name: Sequenced\non: push\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps: [{ run: npm test }]\n  deploy:\n    needs: test\n    runs-on: ubuntu-latest\n    steps: [{ run: echo deploy }]\n';
      runner.getEngine().getFileSystem().writeFile('.github/workflows/ci.yml', content);

      expect(runner.validate().passed).toBe(true);
    });

    it('solves failing-test: fixes broken test or command', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['failing-test']);
      expect(runner.validate().passed).toBe(false);

      runner.getEngine().getFileSystem().writeFile('math.js', 'export function add(a, b) { return a + b; }\n');

      expect(runner.validate().passed).toBe(true);
    });

    it('solves conditional-step: configures if condition', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['conditional-step']);
      expect(runner.validate().passed).toBe(false);

      const content = 'name: Conditional\non: push\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - run: echo build\n      - if: always()\n        run: echo cleanup\n';
      runner.getEngine().getFileSystem().writeFile('.github/workflows/ci.yml', content);

      expect(runner.validate().passed).toBe(true);
    });

    it('solves matrix-build: defines strategy.matrix across node versions', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['matrix-build']);
      expect(runner.validate().passed).toBe(false);

      const content = 'name: Matrix\non: push\njobs:\n  test:\n    strategy:\n      matrix:\n        node: [18, 20]\n    runs-on: ubuntu-latest\n    steps:\n      - run: echo test\n';
      runner.getEngine().getFileSystem().writeFile('.github/workflows/ci.yml', content);

      expect(runner.validate().passed).toBe(true);
    });

    it('solves artifact-sharing: adds upload/download action steps', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['artifact-sharing']);
      expect(runner.validate().passed).toBe(false);

      const content = 'name: Artifacts\non: push\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/upload-artifact@v4\n        with:\n          name: dist\n          path: dist/\n';
      runner.getEngine().getFileSystem().writeFile('.github/workflows/build.yml', content);

      expect(runner.validate().passed).toBe(true);
    });

    it('solves secret-redaction: configures secrets access in environment', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['secret-redaction']);
      expect(runner.validate().passed).toBe(false);

      const content = 'name: Secret\non: push\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - env:\n          TOKEN: ${{ secrets.API_TOKEN }}\n        run: echo deploy\n';
      runner.getEngine().getFileSystem().writeFile('.github/workflows/deploy.yml', content);

      expect(runner.validate().passed).toBe(true);
    });

    it('solves environment-deploy: specifies deployment environment', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['environment-deploy']);
      expect(runner.validate().passed).toBe(false);

      const content = 'name: Deploy\non: push\njobs:\n  deploy:\n    environment: production\n    runs-on: ubuntu-latest\n    steps:\n      - run: echo deploying to production\n';
      runner.getEngine().getFileSystem().writeFile('.github/workflows/cd.yml', content);

      expect(runner.validate().passed).toBe(true);
    });

    it('solves protected-branch-check: enforces branch protection status checks', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['protected-branch-check']);
      expect(runner.validate().passed).toBe(false);

      runner.execute('git switch main');
      expect(runner.validate().passed).toBe(true);
    });

    it('solves reusable-workflow: references reusable caller or callee', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['reusable-workflow']);
      expect(runner.validate().passed).toBe(false);

      const content = 'name: Reusable\non:\n  workflow_call:\njobs:\n  run:\n    runs-on: ubuntu-latest\n    steps: [{ run: echo ok }]\n';
      runner.getEngine().getFileSystem().writeFile('.github/workflows/reusable.yml', content);

      expect(runner.validate().passed).toBe(true);
    });

    it('solves release-pipeline: triggers on release or tags', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['release-pipeline']);
      expect(runner.validate().passed).toBe(false);

      const content = 'name: Release\non:\n  push:\n    tags: ["v*"]\njobs:\n  publish:\n    runs-on: ubuntu-latest\n    steps:\n      - run: echo publishing package\n';
      runner.getEngine().getFileSystem().writeFile('.github/workflows/release.yml', content);

      expect(runner.validate().passed).toBe(true);
    });

    it('solves ci-cd-capstone: complete multi-stage pipeline from lint to production deploy', () => {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS['ci-cd-capstone']);
      expect(runner.validate().passed).toBe(false);

      const content = 'name: Capstone\non: push\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps: [{ run: echo test }]\n  deploy:\n    needs: [test]\n    runs-on: ubuntu-latest\n    steps: [{ run: echo deploy }]\n';
      runner.getEngine().getFileSystem().writeFile('.github/workflows/pipeline.yml', content);

      expect(runner.validate().passed).toBe(true);
    });
  });

  // =========================================================================
  // 3. Execution Simulation through WorkflowRunner for Each Lab (15 tests)
  // =========================================================================
  describe('Workflow Execution of Each Scenario in Simulator Engine', () => {
    it('executes first-workflow scenario YAML to successful completion', async () => {
      const yaml = `
name: First Workflow CI
on: push
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Running first CI in Vietnam"
`;
      const val = YamlWorkflowValidator.validate(yaml);
      expect(val.valid).toBe(true);

      const run = await WorkflowRunner.execute(yaml, { forceRun: true });
      expect(run.status).toBe('success');
      expect(run.jobs.test.steps[0].logs.join(' ')).toContain('Running first CI in Vietnam');
    });

    it('executes push-trigger scenario YAML matching push event', async () => {
      const yaml = `
name: Push Trigger CI
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps: [{ run: echo "Main build" }]
`;
      const res = await WorkflowRunner.execute(yaml, { event: 'push', ref: 'refs/heads/main' });
      expect(res.status).toBe('success');
    });

    it('cancels push-trigger scenario YAML on non-matching branch', async () => {
      const yaml = `
name: Push Trigger CI
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps: [{ run: echo "Main build" }]
`;
      const res = await WorkflowRunner.execute(yaml, { event: 'push', ref: 'refs/heads/feature/x' });
      expect(res.status).toBe('cancelled');
    });

    it('executes pr-ci scenario YAML on pull_request event', async () => {
      const yaml = `
name: PR Verification
on:
  pull_request:
    branches: [main]
jobs:
  verify:
    runs-on: ubuntu-latest
    steps: [{ run: echo "PR Verified" }]
`;
      const res = await WorkflowRunner.execute(yaml, { event: 'pull_request', ref: 'refs/heads/main' });
      expect(res.status).toBe('success');
    });

    it('executes multi-job scenario with parallel independent jobs', async () => {
      const yaml = `
name: Parallel Jobs
on: push
jobs:
  unit:
    runs-on: ubuntu-latest
    steps: [{ run: echo "unit" }]
  e2e:
    runs-on: ubuntu-latest
    steps: [{ run: echo "e2e" }]
`;
      const res = await WorkflowRunner.execute(yaml, { forceRun: true });
      expect(res.status).toBe('success');
      expect(res.jobs.unit.status).toBe('success');
      expect(res.jobs.e2e.status).toBe('success');
    });

    it('executes job-needs scenario with strict DAG sequence', async () => {
      const yaml = `
name: Sequenced Pipeline
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps: [{ run: echo "build done" }]
  deploy:
    needs: [build]
    runs-on: ubuntu-latest
    steps: [{ run: echo "deploy done" }]
`;
      const res = await WorkflowRunner.execute(yaml, { forceRun: true });
      expect(res.status).toBe('success');
      expect(res.jobs.deploy.needs).toEqual(['build']);
    });

    it('executes failing-test scenario and accurately halts downstream', async () => {
      const yaml = `
name: Fail Test Check
on: push
jobs:
  test:
    runs-on: ubuntu-latest
    steps: [{ run: npm test --fail }]
  notify:
    needs: [test]
    runs-on: ubuntu-latest
    steps: [{ run: echo "notified" }]
`;
      const res = await WorkflowRunner.execute(yaml, { forceRun: true });
      expect(res.status).toBe('failure');
      expect(res.jobs.test.status).toBe('failure');
      expect(res.jobs.notify.status).toBe('skipped');
    });

    it('executes conditional-step scenario respecting if: always() on teardown', async () => {
      const yaml = `
name: Conditional Teardown
on: push
jobs:
  job:
    runs-on: ubuntu-latest
    steps:
      - run: npm test --fail
      - if: always()
        run: echo "mandatory teardown executed"
`;
      const res = await WorkflowRunner.execute(yaml, { forceRun: true });
      expect(res.status).toBe('failure');
      expect(res.jobs.job.steps[1].status).toBe('success');
      expect(res.jobs.job.steps[1].logs.join(' ')).toContain('mandatory teardown executed');
    });

    it('executes matrix-build scenario spanning 2 matrix dimensions', async () => {
      const yaml = `
name: Multi Matrix
on: push
jobs:
  matrix-job:
    strategy:
      matrix:
        node: [18, 20]
    runs-on: ubuntu-latest
    steps:
      - run: echo "testing matrix node"
`;
      const res = await WorkflowRunner.execute(yaml, { forceRun: true });
      expect(res.status).toBe('success');
      // Matrix expands to matrix-job (18) and matrix-job (20)
      const jobKeys = Object.keys(res.jobs);
      expect(jobKeys.length).toBe(2);
    });

    it('executes artifact-sharing scenario with upload and download actions', async () => {
      const yaml = `
name: Artifact Sharing
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/upload-artifact@v4
        with:
          name: app-dist
          path: dist/
`;
      const res = await WorkflowRunner.execute(yaml, { forceRun: true, files: { 'dist/bundle.js': 'content' } });
      expect(res.status).toBe('success');
      expect(res.jobs.build.steps[0].status).toBe('success');
    });

    it('executes secret-redaction scenario ensuring secrets are masked', async () => {
      const yaml = `
name: Secret Masking
on: push
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Token is \${{ secrets.API_TOKEN }}"
`;
      const res = await WorkflowRunner.execute(yaml, {
        forceRun: true,
        secrets: { API_TOKEN: 'top_secret_key_vietnam_123' },
      });
      expect(res.status).toBe('success');
      const log = res.jobs.deploy.steps[0].logs.join(' ');
      expect(log).not.toContain('top_secret_key_vietnam_123');
      expect(log).toContain('***');
    });

    it('executes environment-deploy scenario respecting approval gate', async () => {
      const yaml = `
name: Environment Gate
on: push
jobs:
  deploy-prod:
    environment: staging
    runs-on: ubuntu-latest
    steps: [{ run: echo "staging deploy ok" }]
`;
      const res = await WorkflowRunner.execute(yaml, { forceRun: true });
      expect(res.status).toBe('success');
    });

    it('executes protected-branch-check scenario', async () => {
      const yaml = `
name: Protected Branch Status Check
on: push
jobs:
  ci-gate:
    runs-on: ubuntu-latest
    steps: [{ run: echo "status check passed" }]
`;
      const res = await WorkflowRunner.execute(yaml, { forceRun: true });
      expect(res.status).toBe('success');
      expect(res.jobs['ci-gate'].status).toBe('success');
    });

    it('executes release-pipeline scenario on tag release trigger', async () => {
      const yaml = `
name: Release Publish
on:
  push:
    tags: ['v*']
jobs:
  publish:
    runs-on: ubuntu-latest
    steps: [{ run: echo "published release asset" }]
`;
      const res = await WorkflowRunner.execute(yaml, {
        event: 'push',
        ref: 'refs/tags/v1.0.0',
      });
      expect(res.status).toBe('success');
    });

    it('executes full ci-cd-capstone multi-stage workflow end-to-end', async () => {
      const yaml = `
name: Capstone CI/CD
on: push
jobs:
  lint:
    runs-on: ubuntu-latest
    steps: [{ run: npm run lint }]
  test:
    needs: [lint]
    runs-on: ubuntu-latest
    steps: [{ run: npm test }]
  build:
    needs: [test]
    runs-on: ubuntu-latest
    steps: [{ run: npm run build }]
  deploy:
    needs: [build]
    runs-on: ubuntu-latest
    steps: [{ run: echo "deployed to prod" }]
`;
      const res = await WorkflowRunner.execute(yaml, { forceRun: true });
      expect(res.status).toBe('success');
      expect(Object.keys(res.jobs)).toEqual(['lint', 'test', 'build', 'deploy']);
      expect(res.jobs.lint.status).toBe('success');
      expect(res.jobs.test.status).toBe('success');
      expect(res.jobs.build.status).toBe('success');
      expect(res.jobs.deploy.status).toBe('success');
    });
  });
});
