import { WorkflowDefinition } from '../models/workflow';
import { WorkflowExecutionResult, WorkflowRunStatus } from '../models/execution';
import { JobExecutionResult } from '../models/job';
import { DagScheduler } from './dag-scheduler';
import { JobRunner } from './job-runner';
import { createDefaultContexts, WorkflowContexts } from '../expressions/contexts';
import { SecretRedactor } from '../security/secret-redactor';
import { WorkflowParser } from '../parser/workflow-parser';
import { shouldTriggerPush } from '../triggers/push';
import { shouldTriggerPullRequest } from '../triggers/pull-request';
import { EnvironmentManager } from '../environments/environment-manager';

export interface WorkflowRunOptions {
  event?: 'push' | 'pull_request' | 'workflow_dispatch' | 'schedule';
  ref?: string;
  sha?: string;
  actor?: string;
  repository?: string;
  secrets?: Record<string, string>;
  vars?: Record<string, string>;
  env?: Record<string, string>;
  inputs?: Record<string, any>;
  files?: Record<string, string>;
  subWorkflows?: Record<string, WorkflowDefinition>;
  failingCommands?: string[];
  forceRun?: boolean; // bypass trigger filters (e.g. manual dispatch or test)
}

export class WorkflowRunner {
  private static runHistory: Map<string, WorkflowExecutionResult> = new Map();
  private static activeConcurrencyGroups: Map<string, string> = new Map(); // group -> runId

  public static resetHistory(): void {
    this.runHistory.clear();
    this.activeConcurrencyGroups.clear();
  }

  public static getRun(runId: string): WorkflowExecutionResult | null {
    return this.runHistory.get(runId) || null;
  }

  public static async execute(
    workflowInput: string | WorkflowDefinition,
    options: WorkflowRunOptions = {}
  ): Promise<WorkflowExecutionResult> {
    const workflow: WorkflowDefinition =
      typeof workflowInput === 'string' ? WorkflowParser.parse(workflowInput) : workflowInput;

    const event = options.event || 'push';
    const ref = options.ref || 'refs/heads/main';
    const sha = options.sha || 'c0ffee1234567890abcdef1234567890abcdef12';
    const runId = `run-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const startedAt = new Date().toISOString();
    const startTime = Date.now();

    // 1. Evaluate triggers unless forceRun is true
    if (!options.forceRun) {
      if (event === 'push') {
        const triggers = shouldTriggerPush(workflow, { ref, changedFiles: Object.keys(options.files || {}) });
        if (!triggers) {
          return {
            runId,
            workflowName: workflow.name || 'Workflow',
            event,
            ref,
            sha,
            status: 'cancelled',
            startedAt,
            completedAt: new Date().toISOString(),
            durationMs: 0,
            jobs: {},
            error: `Push to branch ${ref} did not match workflow trigger filters.`,
          };
        }
      } else if (event === 'pull_request') {
        const triggers = shouldTriggerPullRequest(workflow, {
          action: 'opened',
          number: 1,
          pull_request: {
            head: { ref: 'feat/update', sha },
            base: { ref: ref.replace('refs/heads/', ''), sha },
            title: 'Simulated PR',
            changedFiles: Object.keys(options.files || {}),
          },
        });
        if (!triggers) {
          return {
            runId,
            workflowName: workflow.name || 'Workflow',
            event,
            ref,
            sha,
            status: 'cancelled',
            startedAt,
            completedAt: new Date().toISOString(),
            durationMs: 0,
            jobs: {},
            error: `PR targeting ${ref} did not match workflow trigger filters.`,
          };
        }
      }
    }

    // 2. Concurrency group management
    let concurrencyGroup: string | undefined;
    if (workflow.concurrency) {
      concurrencyGroup =
        typeof workflow.concurrency === 'string' ? workflow.concurrency : workflow.concurrency.group;
      const priorRunId = this.activeConcurrencyGroups.get(concurrencyGroup);
      if (priorRunId && this.runHistory.has(priorRunId)) {
        const priorRun = this.runHistory.get(priorRunId)!;
        if (priorRun.status === 'running' || priorRun.status === 'queued') {
          priorRun.status = 'cancelled';
        }
      }
      this.activeConcurrencyGroups.set(concurrencyGroup, runId);
    }

    // 3. Setup SecretRedactor
    const redactor = new SecretRedactor(options.secrets);

    // 4. Setup Root Contexts
    const contexts: WorkflowContexts = createDefaultContexts({
      github: {
        event_name: event,
        ref,
        ref_name: ref.replace(/^refs\/heads\//, ''),
        sha,
        repository: options.repository || 'vietnam-student/my-awesome-app',
        actor: options.actor || 'student-coder',
        workflow: workflow.name || 'Workflow',
        run_id: Date.now(),
        run_number: 1,
      },
      secrets: options.secrets || {},
      vars: options.vars || {},
      env: { ...(workflow.env || {}), ...(options.env || {}) },
      inputs: options.inputs || {},
    });

    // 5. Schedule DAG
    const stages = DagScheduler.schedule(workflow.jobs);
    const completedJobs: Record<string, JobExecutionResult> = {};
    const files = { ...(options.files || {}) };
    let overallStatus: WorkflowRunStatus = 'success';

    for (const stage of stages) {
      // Execute nodes in the same stage concurrently
      const stagePromises = stage.map((node) =>
        JobRunner.runJob(node, completedJobs, {
          runId,
          workflowContexts: contexts,
          files,
          redactor,
          subWorkflows: options.subWorkflows,
          failingCommands: options.failingCommands,
        })
      );

      const stageResults = await Promise.all(stagePromises);
      for (const res of stageResults) {
        completedJobs[res.jobId] = res;
        if (res.status === 'failure') {
          overallStatus = 'failure';
        } else if (res.status === 'waiting_approval') {
          overallStatus = 'waiting_approval';
        }
      }

      // If a job failed and no conditional always() or failure() is configured in downstream, abort early
      if (overallStatus === 'waiting_approval') {
        break; // Pause execution until approval
      }
    }

    const durationMs = Date.now() - startTime;
    const completedAt = overallStatus === 'waiting_approval' ? undefined : new Date().toISOString();

    const result: WorkflowExecutionResult = {
      runId,
      workflowName: workflow.name || 'Workflow',
      event,
      ref,
      sha,
      status: overallStatus,
      startedAt,
      completedAt,
      durationMs,
      jobs: completedJobs,
      concurrencyGroup,
    };

    this.runHistory.set(runId, result);
    return result;
  }

  /**
   * Resumes a workflow that was paused in waiting_approval state.
   */
  public static async approveAndResume(
    runId: string,
    jobId: string,
    approvedBy: string = 'team-lead'
  ): Promise<WorkflowExecutionResult | null> {
    const run = this.runHistory.get(runId);
    if (!run || run.status !== 'waiting_approval') return null;

    const job = run.jobs[jobId];
    if (!job || job.status !== 'waiting_approval') return null;

    const approved = EnvironmentManager.getInstance().approve(runId, jobId, approvedBy);
    if (!approved) return null;

    job.status = 'success';
    job.completedAt = new Date().toISOString();

    // Check if all jobs are now success
    const allSuccess = Object.values(run.jobs).every(
      (j) => j.status === 'success' || j.status === 'skipped'
    );
    if (allSuccess) {
      run.status = 'success';
      run.completedAt = new Date().toISOString();
    }

    return run;
  }
}
