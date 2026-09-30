import { WorkflowDefinition, BranchFilterConfig } from '../models/workflow';
import { evaluateBranchFilters, evaluatePathFilters } from './matcher';

export interface PushEventPayload {
  ref: string; // e.g. "refs/heads/main"
  before?: string;
  after?: string;
  commits?: Array<{ id: string; message: string; modified?: string[]; added?: string[]; removed?: string[] }>;
  changedFiles?: string[];
}

export function shouldTriggerPush(workflow: WorkflowDefinition, payload: PushEventPayload): boolean {
  const on = workflow.on;
  if (!on) return false;

  const branchName = payload.ref.replace(/^refs\/heads\//, '');
  const changedFiles =
    payload.changedFiles ||
    (payload.commits
      ? payload.commits.flatMap((c) => [...(c.modified || []), ...(c.added || []), ...(c.removed || [])])
      : ['src/app.ts']);

  // Case 1: Simple string or array of events
  if (typeof on === 'string') {
    return on === 'push';
  }
  if (Array.isArray(on)) {
    return on.includes('push');
  }

  // Case 2: Object with push configuration
  if (typeof on === 'object' && 'push' in on) {
    const config = on.push as BranchFilterConfig | null;
    if (config === null || config === undefined) {
      // on: push: with no branch filters -> triggers on any branch push
      return true;
    }

    const branchMatch = evaluateBranchFilters(branchName, config.branches, config['branches-ignore']);
    if (!branchMatch) return false;

    const pathMatch = evaluatePathFilters(changedFiles, config.paths, config['paths-ignore']);
    if (!pathMatch) return false;

    return true;
  }

  return false;
}
