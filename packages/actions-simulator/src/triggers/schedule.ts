import { WorkflowDefinition, ScheduleTriggerItem } from '../models/workflow';

export function getWorkflowSchedules(workflow: WorkflowDefinition): ScheduleTriggerItem[] {
  const on = workflow.on;
  if (!on || typeof on !== 'object') return [];
  if ('schedule' in on && Array.isArray(on.schedule)) {
    return on.schedule;
  }
  return [];
}

export function shouldTriggerSchedule(workflow: WorkflowDefinition): boolean {
  return getWorkflowSchedules(workflow).length > 0;
}
