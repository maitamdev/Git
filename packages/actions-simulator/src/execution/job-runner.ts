import { JobDefinition, JobExecutionResult, JobStatus } from '../models/job';
import { StepExecutionResult } from '../models/step';
import { WorkflowContexts, createDefaultContexts } from '../expressions/contexts';
import { ExpressionEvaluator } from '../expressions/evaluator';
import { StepRunner } from './step-runner';
import { ScheduledJobNode } from './dag-scheduler';
import { createSimulatedRunner } from '../models/runner';
import { SecretRedactor } from '../security/secret-redactor';
import { EnvironmentManager } from '../environments/environment-manager';
import { WorkflowDefinition } from '../models/workflow';

export interface JobRunnerOptions {
  runId: string;
  workflowContexts: WorkflowContexts;
  files: Record<string, string>;
  redactor: SecretRedactor;
  subWorkflows?: Record<string, WorkflowDefinition>;
  failingCommands?: string[];
}

export class JobRunner {
  public static async runJob(
    node: ScheduledJobNode,
    completedJobs: Record<string, JobExecutionResult>,
    options: JobRunnerOptions
  ): Promise<JobExecutionResult> {
    const startedAt = new Date().toISOString();
    const startTime = Date.now();
    const runsOnStr = Array.isArray(node.definition.runsOn)
      ? node.definition.runsOn[0]
      : node.definition.runsOn || 'ubuntu-latest';

    const runsOnInterpolated = ExpressionEvaluator.interpolate(runsOnStr, {
      ...options.workflowContexts,
      matrix: node.matrixValues || {},
    });

    const runnerContext = createSimulatedRunner(runsOnInterpolated);

    // Setup job-scoped contexts
    const jobContexts: WorkflowContexts = {
      ...options.workflowContexts,
      matrix: node.matrixValues || {},
      runner: runnerContext,
      needs: {},
      steps: {},
      env: {
        ...options.workflowContexts.env,
        ...(node.definition.env
          ? ExpressionEvaluator.interpolateDeep(node.definition.env, {
              ...options.workflowContexts,
              matrix: node.matrixValues || {},
            })
          : {}),
      },
    };

    // Populate needs context
    let anyDependencyFailed = false;
    for (const depId of node.needs) {
      const depResult = completedJobs[depId];
      if (depResult) {
        jobContexts.needs[depResult.jobId] = {
          result: depResult.status === 'success' ? 'success' : depResult.status === 'skipped' ? 'skipped' : 'failure',
          outputs: depResult.outputs,
        };
        if (depResult.status === 'failure' || depResult.status === 'cancelled') {
          anyDependencyFailed = true;
        }
      }
    }

    // 1. Evaluate job.if condition
    if (node.definition.if) {
      const shouldRun = ExpressionEvaluator.evaluateCondition(node.definition.if, jobContexts, {
        previousFailed: anyDependencyFailed,
      });
      if (!shouldRun) {
        return {
          jobId: node.id,
          displayName: node.displayName,
          status: 'skipped',
          runsOn: runsOnInterpolated,
          matrixValues: node.matrixValues,
          startedAt,
          completedAt: new Date().toISOString(),
          durationMs: 0,
          needs: node.needs,
          steps: [],
          outputs: {},
        };
      }
    } else if (anyDependencyFailed) {
      // Default: skip if any needed job failed
      return {
        jobId: node.id,
        displayName: node.displayName,
        status: 'skipped',
        runsOn: runsOnInterpolated,
        matrixValues: node.matrixValues,
        startedAt,
        completedAt: new Date().toISOString(),
        durationMs: 0,
        needs: node.needs,
        steps: [],
        outputs: {},
      };
    }

    // 2. Check Environment & Approval Gates
    let envName: string | undefined;
    if (node.definition.environment) {
      envName =
        typeof node.definition.environment === 'string'
          ? node.definition.environment
          : node.definition.environment.name;
      envName = ExpressionEvaluator.interpolate(envName, jobContexts);

      const approvedOrReady = EnvironmentManager.getInstance().requestApproval(
        options.runId,
        node.id,
        envName
      );
      if (!approvedOrReady) {
        return {
          jobId: node.id,
          displayName: node.displayName,
          status: 'waiting_approval',
          runsOn: runsOnInterpolated,
          matrixValues: node.matrixValues,
          environment: envName,
          startedAt,
          durationMs: 0,
          needs: node.needs,
          steps: [],
          outputs: {},
        };
      }
    }

    // 3. Handle Reusable Workflow (job.uses)
    if (node.definition.uses) {
      const subWorkflowDef = options.subWorkflows ? options.subWorkflows[node.definition.uses] : null;
      if (!subWorkflowDef) {
        return {
          jobId: node.id,
          displayName: node.displayName,
          status: 'failure',
          runsOn: runsOnInterpolated,
          startedAt,
          completedAt: new Date().toISOString(),
          durationMs: Date.now() - startTime,
          needs: node.needs,
          steps: [],
          outputs: {},
          error: `Reusable workflow "${node.definition.uses}" not found in repository.`,
        };
      }

      // Execute reusable workflow sub-steps
      const stepResults: StepExecutionResult[] = [
        {
          stepId: 'reusable_init',
          name: `Call reusable workflow: ${node.definition.uses}`,
          status: 'success',
          startedAt,
          completedAt: new Date().toISOString(),
          durationMs: 10,
          logs: [`Invoked reusable workflow with ${Object.keys(node.definition.with || {}).length} inputs.`],
          outputs: {},
        },
      ];

      return {
        jobId: node.id,
        displayName: node.displayName,
        status: 'success',
        runsOn: runsOnInterpolated,
        matrixValues: node.matrixValues,
        startedAt,
        completedAt: new Date().toISOString(),
        durationMs: Date.now() - startTime,
        needs: node.needs,
        steps: stepResults,
        outputs: {},
      };
    }

    // 4. Execute Steps sequentially
    const stepResults: StepExecutionResult[] = [];
    let jobStatus: JobStatus = 'success';
    let previousStepFailed = false;

    const steps = node.definition.steps || [];
    for (let i = 0; i < steps.length; i++) {
      const stepDef = steps[i];
      const stepRes = await StepRunner.runStep(stepDef, i, {
        workingDirectory: runnerContext.workspace,
        contexts: jobContexts,
        files: options.files,
        redactor: options.redactor,
        previousFailed: previousStepFailed,
        failingCommands: options.failingCommands,
      });

      stepResults.push(stepRes);

      // Record step in contexts
      jobContexts.steps[stepRes.stepId] = {
        outcome: stepRes.status,
        conclusion: stepRes.status,
        outputs: stepRes.outputs,
      };

      if (stepRes.status === 'failure') {
        if (!stepDef.continueOnError) {
          previousStepFailed = true;
          jobStatus = 'failure';
        }
      }
    }

    // 5. Compute job outputs
    const jobOutputs: Record<string, string> = {};
    if (node.definition.outputs) {
      for (const [outKey, expr] of Object.entries(node.definition.outputs)) {
        jobOutputs[outKey] = ExpressionEvaluator.interpolate(expr, jobContexts);
      }
    }

    return {
      jobId: node.id,
      displayName: node.displayName,
      status: jobStatus,
      runsOn: runsOnInterpolated,
      matrixValues: node.matrixValues,
      environment: envName,
      startedAt,
      completedAt: new Date().toISOString(),
      durationMs: Date.now() - startTime,
      needs: node.needs,
      steps: stepResults,
      outputs: jobOutputs,
    };
  }
}
