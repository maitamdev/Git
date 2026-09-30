export interface StepDefinition {
  id?: string;
  name?: string;
  if?: string;
  run?: string;
  uses?: string;
  with?: Record<string, any>;
  env?: Record<string, string>;
  continueOnError?: boolean;
  timeoutMinutes?: number;
  workingDirectory?: string;
  shell?: string;
}

export type StepStatus = 'queued' | 'running' | 'success' | 'failure' | 'skipped';

export interface StepExecutionResult {
  stepId: string;
  name: string;
  status: StepStatus;
  startedAt: string;
  completedAt?: string;
  durationMs: number;
  logs: string[];
  outputs: Record<string, string>;
  error?: string;
}
