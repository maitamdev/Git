import { SimulatedAction, ActionInput, ActionExecutionContext, ActionResult } from './registry';

export class CheckoutAction implements SimulatedAction {
  public name = 'actions/checkout';

  public matches(uses: string): boolean {
    return /^actions\/checkout(@.*)?$/.test(uses.trim());
  }

  public async execute(input: ActionInput, context: ActionExecutionContext): Promise<ActionResult> {
    const ref = input.with?.ref || context.contexts.github.ref || 'main';
    const logs: string[] = [
      `Syncing repository: ${context.contexts.github.repository}`,
      `Getting Git data from server...`,
      `Checking out ${ref} with sha ${context.contexts.github.sha.substring(0, 7)}`,
      `Repository checked out to ${context.workingDirectory}`,
    ];

    // Ensure baseline repo files exist in simulated working directory
    if (!context.files['package.json']) {
      context.files['package.json'] = JSON.stringify(
        {
          name: 'vietnam-student-app',
          version: '1.0.0',
          scripts: { test: 'vitest run', build: 'vite build', lint: 'eslint .' },
        },
        null,
        2
      );
    }
    if (!context.files['README.md']) {
      context.files['README.md'] = `# Vietnam Student Web Application\nCI/CD Pipeline with GitHub Actions.`;
    }

    return {
      success: true,
      outputs: {
        ref,
        commit: context.contexts.github.sha,
      },
      logs,
    };
  }
}
