import { JobDefinition, ConcurrencyConfig } from './job';

export interface BranchFilterConfig {
  branches?: string[];
  'branches-ignore'?: string[];
  tags?: string[];
  'tags-ignore'?: string[];
  paths?: string[];
  'paths-ignore'?: string[];
  types?: string[];
}

export interface WorkflowDispatchConfig {
  inputs?: Record<
    string,
    {
      description?: string;
      required?: boolean;
      default?: any;
      type?: 'string' | 'boolean' | 'choice' | 'number';
      options?: string[];
    }
  >;
}

export interface ScheduleTriggerItem {
  cron: string;
}

export interface WorkflowCallConfig {
  inputs?: Record<string, { description?: string; required?: boolean; default?: any; type?: string }>;
  secrets?: Record<string, { description?: string; required?: boolean }>;
  outputs?: Record<string, { description?: string; value: string }>;
}

export type WorkflowTriggerEvent =
  | 'push'
  | 'pull_request'
  | 'workflow_dispatch'
  | 'schedule'
  | 'workflow_call'
  | 'release';

export type WorkflowTriggers =
  | WorkflowTriggerEvent
  | WorkflowTriggerEvent[]
  | {
      push?: BranchFilterConfig | null;
      pull_request?: BranchFilterConfig | null;
      workflow_dispatch?: WorkflowDispatchConfig | null;
      schedule?: ScheduleTriggerItem[];
      workflow_call?: WorkflowCallConfig | null;
      release?: { types?: string[] } | null;
      [event: string]: any;
    };

export interface WorkflowDefinition {
  name?: string;
  runName?: string;
  on: WorkflowTriggers;
  env?: Record<string, string>;
  concurrency?: string | ConcurrencyConfig;
  jobs: Record<string, JobDefinition>;
  permissions?: Record<string, string>;
}
