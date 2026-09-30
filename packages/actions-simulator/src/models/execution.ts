import { JobExecutionResult } from './job';

export type WorkflowRunStatus =
  | 'queued'
  | 'running'
  | 'success'
  | 'failure'
  | 'cancelled'
  | 'waiting_approval';

export interface WorkflowExecutionResult {
  runId: string;
  workflowName: string;
  event: string;
  ref: string;
  sha: string;
  status: WorkflowRunStatus;
  startedAt: string;
  completedAt?: string;
  durationMs: number;
  jobs: Record<string, JobExecutionResult>;
  concurrencyGroup?: string;
  error?: string;
}
