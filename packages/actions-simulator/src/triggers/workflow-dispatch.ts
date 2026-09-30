import { WorkflowDefinition, WorkflowDispatchConfig } from '../models/workflow';

export interface WorkflowDispatchEventPayload {
  ref: string;
  inputs?: Record<string, any>;
}

export function shouldTriggerWorkflowDispatch(
  workflow: WorkflowDefinition,
  payload: WorkflowDispatchEventPayload
): boolean {
  const on = workflow.on;
  if (!on) return false;

  if (typeof on === 'string') return on === 'workflow_dispatch';
  if (Array.isArray(on)) return on.includes('workflow_dispatch');
  if (typeof on === 'object' && 'workflow_dispatch' in on) return true;

  return false;
}

export function validateDispatchInputs(
  config: WorkflowDispatchConfig | null | undefined,
  providedInputs: Record<string, any>
): { valid: boolean; resolvedInputs: Record<string, any>; errors: string[] } {
  const errors: string[] = [];
  const resolved: Record<string, any> = {};

  if (!config || !config.inputs) {
    return { valid: true, resolvedInputs: providedInputs || {}, errors: [] };
  }

  for (const [name, def] of Object.entries(config.inputs)) {
    const val = providedInputs[name] !== undefined ? providedInputs[name] : def.default;
    if (def.required && (val === undefined || val === null || val === '')) {
      errors.push(`Required workflow_dispatch input missing: "${name}"`);
    } else {
      resolved[name] = val;
    }
  }

  return { valid: errors.length === 0, resolvedInputs: resolved, errors };
}
