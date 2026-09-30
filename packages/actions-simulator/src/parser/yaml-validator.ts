import { parse as parseYaml } from 'yaml';
import { WorkflowDefinition } from '../models/workflow';

export interface WorkflowValidationError {
  line?: number;
  field?: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface WorkflowValidationResult {
  valid: boolean;
  errors: WorkflowValidationError[];
  workflow?: WorkflowDefinition;
}

export class YamlWorkflowValidator {
  public static validate(yamlContent: string): WorkflowValidationResult {
    const errors: WorkflowValidationError[] = [];
    if (!yamlContent || !yamlContent.trim()) {
      return {
        valid: false,
        errors: [{ message: 'Workflow file is empty.', severity: 'error' }],
      };
    }

    let parsed: any;
    try {
      parsed = parseYaml(yamlContent);
    } catch (err: any) {
      return {
        valid: false,
        errors: [
          {
            message: `YAML Syntax Error: ${err.message}`,
            severity: 'error',
          },
        ],
      };
    }

    if (!parsed || typeof parsed !== 'object') {
      return {
        valid: false,
        errors: [{ message: 'Workflow YAML must resolve to a valid object.', severity: 'error' }],
      };
    }

    // Check 'on'
    if (!parsed.on) {
      errors.push({
        field: 'on',
        message: 'Missing required root key: "on" (e.g. on: push or on: [push, pull_request])',
        severity: 'error',
      });
    }

    // Check 'jobs'
    if (!parsed.jobs || typeof parsed.jobs !== 'object' || Object.keys(parsed.jobs).length === 0) {
      errors.push({
        field: 'jobs',
        message: 'Missing required root key: "jobs" (must define at least one job)',
        severity: 'error',
      });
      return { valid: false, errors };
    }

    // Validate each job
    const jobIds = Object.keys(parsed.jobs);
    for (const [jobId, jobDef] of Object.entries<any>(parsed.jobs)) {
      if (!jobDef || typeof jobDef !== 'object') {
        errors.push({
          field: `jobs.${jobId}`,
          message: `Job "${jobId}" definition must be an object.`,
          severity: 'error',
        });
        continue;
      }

      // Reusable workflow (uses) vs normal job (runs-on + steps)
      if (jobDef.uses) {
        if (!jobDef.uses.includes('/') && !jobDef.uses.startsWith('.')) {
          errors.push({
            field: `jobs.${jobId}.uses`,
            message: `Reusable workflow "uses" path must be relative (./.github/workflows/...) or repository format.`,
            severity: 'warning',
          });
        }
        continue;
      }

      if (!jobDef['runs-on']) {
        errors.push({
          field: `jobs.${jobId}.runs-on`,
          message: `Job "${jobId}" missing required key: "runs-on" (e.g. runs-on: ubuntu-latest)`,
          severity: 'error',
        });
      }

      if (!jobDef.steps || !Array.isArray(jobDef.steps) || jobDef.steps.length === 0) {
        errors.push({
          field: `jobs.${jobId}.steps`,
          message: `Job "${jobId}" must contain a non-empty array of "steps".`,
          severity: 'error',
        });
      } else {
        jobDef.steps.forEach((step: any, idx: number) => {
          if (!step || typeof step !== 'object') {
            errors.push({
              field: `jobs.${jobId}.steps[${idx}]`,
              message: `Step #${idx + 1} in job "${jobId}" is not a valid object.`,
              severity: 'error',
            });
            return;
          }

          if (!step.run && !step.uses) {
            errors.push({
              field: `jobs.${jobId}.steps[${idx}]`,
              message: `Step #${idx + 1} (${step.name || 'unnamed'}) must define either "run" or "uses".`,
              severity: 'error',
            });
          }
        });
      }

      // Check needs reference validity
      if (jobDef.needs) {
        const needsList = Array.isArray(jobDef.needs) ? jobDef.needs : [jobDef.needs];
        for (const n of needsList) {
          if (!jobIds.includes(n)) {
            errors.push({
              field: `jobs.${jobId}.needs`,
              message: `Job "${jobId}" references non-existent job in needs: "${n}".`,
              severity: 'error',
            });
          }
        }
      }
    }

    return {
      valid: errors.filter((e) => e.severity === 'error').length === 0,
      errors,
      workflow: parsed as WorkflowDefinition,
    };
  }
}
