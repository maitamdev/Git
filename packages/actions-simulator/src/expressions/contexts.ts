import { SimulatedRunnerContext, createSimulatedRunner } from '../models/runner';

export interface WorkflowContexts {
  github: {
    event_name: string;
    sha: string;
    ref: string;
    ref_name: string;
    repository: string;
    actor: string;
    workflow: string;
    run_id: number;
    run_number: number;
    head_ref?: string;
    base_ref?: string;
    event?: Record<string, any>;
    [key: string]: any;
  };
  env: Record<string, string>;
  vars: Record<string, string>;
  secrets: Record<string, string>;
  matrix: Record<string, any>;
  needs: Record<
    string,
    {
      result: 'success' | 'failure' | 'cancelled' | 'skipped';
      outputs: Record<string, string>;
    }
  >;
  steps: Record<
    string,
    {
      outcome: string;
      conclusion: string;
      outputs: Record<string, string>;
    }
  >;
  inputs: Record<string, any>;
  runner: SimulatedRunnerContext;
}

export function createDefaultContexts(overrides?: Partial<WorkflowContexts>): WorkflowContexts {
  return {
    github: {
      event_name: 'push',
      sha: 'a1b2c3d4e5f60718293a4b5c6d7e8f9012345678',
      ref: 'refs/heads/main',
      ref_name: 'main',
      repository: 'vietnam-student/my-awesome-app',
      actor: 'student-coder',
      workflow: 'CI/CD Pipeline',
      run_id: 1001,
      run_number: 1,
      event: {},
      ...(overrides?.github || {}),
    },
    env: { ...(overrides?.env || {}) },
    vars: { ...(overrides?.vars || {}) },
    secrets: { ...(overrides?.secrets || {}) },
    matrix: { ...(overrides?.matrix || {}) },
    needs: { ...(overrides?.needs || {}) },
    steps: { ...(overrides?.steps || {}) },
    inputs: { ...(overrides?.inputs || {}) },
    runner: overrides?.runner || createSimulatedRunner('ubuntu-latest'),
  };
}
