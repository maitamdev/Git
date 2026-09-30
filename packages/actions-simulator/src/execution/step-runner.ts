import { StepDefinition, StepExecutionResult, StepStatus } from '../models/step';
import { WorkflowContexts } from '../expressions/contexts';
import { ExpressionEvaluator } from '../expressions/evaluator';
import { ActionRegistry } from '../actions/registry';
import { SafeCommandRuntime } from '../security/safe-runner';
import { SecretRedactor } from '../security/secret-redactor';

export interface StepRunnerOptions {
  workingDirectory: string;
  contexts: WorkflowContexts;
  files: Record<string, string>;
  redactor: SecretRedactor;
  previousFailed: boolean;
  failingCommands?: string[];
}

export class StepRunner {
  public static async runStep(
    step: StepDefinition,
    stepIndex: number,
    options: StepRunnerOptions
  ): Promise<StepExecutionResult> {
    const stepId = step.id || `step_${stepIndex}`;
    const name = step.name || (step.run ? step.run.split('\n')[0] : step.uses || `Step ${stepIndex + 1}`);
    const startedAt = new Date().toISOString();
    const startTime = Date.now();

    // 1. Evaluate conditional if present
    if (step.if) {
      const shouldRun = ExpressionEvaluator.evaluateCondition(step.if, options.contexts, {
        previousFailed: options.previousFailed,
      });
      if (!shouldRun) {
        return {
          stepId,
          name,
          status: 'skipped',
          startedAt,
          completedAt: new Date().toISOString(),
          durationMs: 0,
          logs: [`Condition "${step.if}" evaluated to false. Step skipped.`],
          outputs: {},
        };
      }
    } else if (options.previousFailed) {
      // Default behavior in GitHub Actions: steps skip if previous failed unless condition specifies failure() or always()
      return {
        stepId,
        name,
        status: 'skipped',
        startedAt,
        completedAt: new Date().toISOString(),
        durationMs: 0,
        logs: [`Previous step failed. Step skipped.`],
        outputs: {},
      };
    }

    const logs: string[] = [];
    const outputs: Record<string, string> = {};
    let status: StepStatus = 'success';
    let error: string | undefined;

    // 2. Action execution (uses:)
    if (step.uses) {
      const usesInterpolated = ExpressionEvaluator.interpolate(step.uses, options.contexts);
      const action = ActionRegistry.getInstance().findAction(usesInterpolated);

      if (!action) {
        status = 'failure';
        error = `Action "${usesInterpolated}" is not supported in the educational sandbox.`;
        logs.push(`Error: ${error}`);
      } else {
        const interpolatedWith = step.with
          ? ExpressionEvaluator.interpolateDeep(step.with, options.contexts)
          : {};
        const interpolatedEnv = step.env
          ? ExpressionEvaluator.interpolateDeep(step.env, options.contexts)
          : {};

        logs.push(`Running action: ${usesInterpolated}`);
        try {
          const actionRes = await action.execute(
            { with: interpolatedWith, env: interpolatedEnv },
            {
              workingDirectory: options.workingDirectory,
              contexts: options.contexts,
              files: options.files,
            }
          );
          for (const l of actionRes.logs) {
            logs.push(options.redactor.redact(l));
          }
          Object.assign(outputs, actionRes.outputs);
          if (!actionRes.success) {
            status = 'failure';
            error = actionRes.error || 'Action failed.';
          }
        } catch (err: any) {
          status = 'failure';
          error = err.message || 'Action threw an unhandled exception.';
          logs.push(`Action execution error: ${error}`);
        }
      }
    } else if (step.run) {
      // 3. Shell command execution (run:)
      const runInterpolated = ExpressionEvaluator.interpolate(step.run, options.contexts);
      const combinedEnv: Record<string, string> = {
        ...options.contexts.env,
        ...(step.env ? ExpressionEvaluator.interpolateDeep(step.env, options.contexts) : {}),
      };

      logs.push(`$ ${options.redactor.redact(runInterpolated)}`);
      const cmdRes = SafeCommandRuntime.execute(runInterpolated, {
        workingDirectory: options.workingDirectory,
        env: combinedEnv,
        files: options.files,
        failingCommands: options.failingCommands,
      });

      for (const line of cmdRes.stdout) {
        logs.push(options.redactor.redact(line));
      }
      for (const line of cmdRes.stderr) {
        logs.push(options.redactor.redact(`[stderr] ${line}`));
      }

      if (cmdRes.exitCode !== 0) {
        status = 'failure';
        error = `Process completed with exit code ${cmdRes.exitCode}.`;
        logs.push(`Error: ${error}`);
      }
    }

    const durationMs = Date.now() - startTime;
    const completedAt = new Date().toISOString();

    if (status === 'failure' && step.continueOnError) {
      logs.push(`[Note] continue-on-error was true for this step. Job will proceed.`);
      // Keeps status as failure in result object, but job runner will not mark job as failed
    }

    return {
      stepId,
      name,
      status,
      startedAt,
      completedAt,
      durationMs,
      logs,
      outputs,
      error,
    };
  }
}
