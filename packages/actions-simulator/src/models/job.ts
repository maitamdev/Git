import { StepDefinition } from './step';

export interface MatrixStrategy {
  matrix: Record<string, any[]>;
  failFast?: boolean;
  maxParallel?: number;
  include?: Record<string, any>[];
  exclude?: Record<string, any>[];
}

export interface EnvironmentConfig {
  name: string;
  url?: string;
}

export interface ConcurrencyConfig {
  group: string;
  cancelInProgress?: boolean;
}

export interface JobDefinition {
  name?: string;
  runsOn?: string | string[];
  needs?: string[] | string;
  if?: string;
  env?: Record<string, string>;
  strategy?: MatrixStrategy;
  environment?: string | EnvironmentConfig;
  concurrency?: string | ConcurrencyConfig;
  steps?: StepDefinition[];
  uses?: string; // reusable workflow
  with?: Record<string, any>;
  secrets?: Record<string, string> | 'inherit';
  outputs?: Record<string, string>;
  timeoutMinutes?: number;
  continueOnError?: boolean;
}

export type JobStatus =
  | 'queued'
  | 'running'
  | 'success'
  | 'failure'
  | 'cancelled'
  | 'skipped'
  | 'waiting_approval';

export interface JobExecutionResult {
  jobId: string;
  displayName: string;
  status: JobStatus;
  runsOn: string;
  matrixValues?: Record<string, any>;
  startedAt: string;
  completedAt?: string;
  durationMs: number;
  environment?: string;
  needs: string[];
  steps: import('./step').StepExecutionResult[];
  outputs: Record<string, string>;
  error?: string;
}
