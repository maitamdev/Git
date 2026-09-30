import { SimulatedAction, ActionInput, ActionExecutionContext, ActionResult } from './registry';

export class SetupRuntimeAction implements SimulatedAction {
  public name = 'actions/setup-runtime';

  public matches(uses: string): boolean {
    const trimmed = uses.trim();
    return (
      /^actions\/setup-(node|python|java|go)(@.*)?$/.test(trimmed)
    );
  }

  public async execute(input: ActionInput, context: ActionExecutionContext): Promise<ActionResult> {
    const rawUses = context.contexts.runner ? 'runtime' : 'runtime';
    const logs: string[] = [];
    const outputs: Record<string, string> = {};

    // Determine runtime type
    if (input.with?.['node-version'] || input.with?.['node-version-file']) {
      const version = String(input.with['node-version'] || '20.x');
      logs.push(`Resolved Node.js version requirement: ${version}`);
      logs.push(`Found in cache: node ${version} (${context.contexts.runner.arch})`);
      logs.push(`Environment variable PATH updated with Node.js binaries.`);
      outputs['node-version'] = version;
    } else if (input.with?.['python-version']) {
      const version = String(input.with['python-version'] || '3.11');
      logs.push(`Resolved Python version: ${version}`);
      logs.push(`Found in cache: Python ${version} (${context.contexts.runner.arch})`);
      logs.push(`Environment variable PATH updated with Python binaries.`);
      outputs['python-version'] = version;
    } else {
      logs.push(`Setup language runtime successfully configured.`);
    }

    return {
      success: true,
      outputs,
      logs,
    };
  }
}
