import { WorkflowDefinition, BranchFilterConfig } from '../models/workflow';
import { evaluateBranchFilters, evaluatePathFilters } from './matcher';

export interface PullRequestEventPayload {
  action: 'opened' | 'synchronize' | 'reopened' | 'closed';
  number: number;
  pull_request: {
    head: { ref: string; sha: string };
    base: { ref: string; sha: string };
    title: string;
    changedFiles?: string[];
  };
}

export function shouldTriggerPullRequest(
  workflow: WorkflowDefinition,
  payload: PullRequestEventPayload
): boolean {
  const on = workflow.on;
  if (!on) return false;

  const targetBranch = payload.pull_request.base.ref;
  const changedFiles = payload.pull_request.changedFiles || ['src/index.ts'];

  if (typeof on === 'string') {
    return on === 'pull_request';
  }
  if (Array.isArray(on)) {
    return on.includes('pull_request');
  }

  if (typeof on === 'object' && 'pull_request' in on) {
    const config = on.pull_request as BranchFilterConfig | null;
    if (config === null || config === undefined) {
      return true;
    }

    // PR triggers filter on target/base branch
    const branchMatch = evaluateBranchFilters(targetBranch, config.branches, config['branches-ignore']);
    if (!branchMatch) return false;

    const pathMatch = evaluatePathFilters(changedFiles, config.paths, config['paths-ignore']);
    if (!pathMatch) return false;

    if (config.types && config.types.length > 0) {
      if (!config.types.includes(payload.action)) return false;
    }

    return true;
  }

  return false;
}
