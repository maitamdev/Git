import { parse as parseYaml } from 'yaml';
import { WorkflowDefinition } from '../models/workflow';
import { JobDefinition } from '../models/job';
import { StepDefinition } from '../models/step';
import { YamlWorkflowValidator } from './yaml-validator';

export class WorkflowParser {
  public static parse(yamlContent: string): WorkflowDefinition {
    const validation = YamlWorkflowValidator.validate(yamlContent);
    if (!validation.valid) {
      const msgs = validation.errors.map((e) => e.message).join(' | ');
      throw new Error(`Workflow Validation Failed: ${msgs}`);
    }

    const raw = parseYaml(yamlContent) as any;
    const normalizedJobs: Record<string, JobDefinition> = {};

    for (const [jobId, rawJob] of Object.entries<any>(raw.jobs || {})) {
      const rawSteps: any[] = rawJob.steps || [];
      const normalizedSteps: StepDefinition[] = rawSteps.map((s: any) => ({
        id: s.id,
        name: s.name,
        if: s.if,
        run: s.run,
        uses: s.uses,
        with: s.with,
        env: s.env,
        continueOnError: s['continue-on-error'] ?? s.continueOnError,
        timeoutMinutes: s['timeout-minutes'] ?? s.timeoutMinutes,
        workingDirectory: s['working-directory'] ?? s.workingDirectory,
        shell: s.shell,
      }));

      let normalizedNeeds: string[] = [];
      if (rawJob.needs) {
        normalizedNeeds = Array.isArray(rawJob.needs) ? rawJob.needs : [rawJob.needs];
      }

      let normalizedStrategy = rawJob.strategy;
      if (rawJob.strategy) {
        normalizedStrategy = {
          matrix: rawJob.strategy.matrix || {},
          failFast: rawJob.strategy['fail-fast'] ?? rawJob.strategy.failFast ?? true,
          maxParallel: rawJob.strategy['max-parallel'] ?? rawJob.strategy.maxParallel,
          include: rawJob.strategy.include,
          exclude: rawJob.strategy.exclude,
        };
      }

      normalizedJobs[jobId] = {
        name: rawJob.name || jobId,
        runsOn: rawJob['runs-on'] ?? rawJob.runsOn ?? 'ubuntu-latest',
        needs: normalizedNeeds,
        if: rawJob.if,
        env: rawJob.env || {},
        strategy: normalizedStrategy,
        environment: rawJob.environment,
        concurrency: rawJob.concurrency,
        steps: normalizedSteps,
        uses: rawJob.uses,
        with: rawJob.with,
        secrets: rawJob.secrets,
        outputs: rawJob.outputs,
        timeoutMinutes: rawJob['timeout-minutes'] ?? rawJob.timeoutMinutes,
        continueOnError: rawJob['continue-on-error'] ?? rawJob.continueOnError,
      };
    }

    return {
      name: raw.name || 'Workflow',
      runName: raw['run-name'] ?? raw.runName,
      on: raw.on,
      env: raw.env || {},
      concurrency: raw.concurrency,
      jobs: normalizedJobs,
      permissions: raw.permissions,
    };
  }
}
