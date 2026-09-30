import { WorkflowContexts } from '../expressions/contexts';

export interface ActionInput {
  with?: Record<string, any>;
  env?: Record<string, string>;
}

export interface ActionExecutionContext {
  workingDirectory: string;
  contexts: WorkflowContexts;
  files: Record<string, string>;
}

export interface ActionResult {
  success: boolean;
  outputs: Record<string, string>;
  logs: string[];
  error?: string;
}

export interface SimulatedAction {
  name: string;
  matches(uses: string): boolean;
  execute(input: ActionInput, context: ActionExecutionContext): Promise<ActionResult>;
}

import { CheckoutAction } from './checkout';
import { SetupRuntimeAction } from './setup-runtime';
import { UploadArtifactAction } from './upload-artifact';
import { DownloadArtifactAction } from './download-artifact';
import { CacheAction } from './cache';

export class ActionRegistry {
  private static instance: ActionRegistry;
  private actions: SimulatedAction[] = [];

  constructor() {
    this.register(new CheckoutAction());
    this.register(new SetupRuntimeAction());
    this.register(new UploadArtifactAction());
    this.register(new DownloadArtifactAction());
    this.register(new CacheAction());
  }

  public static getInstance(): ActionRegistry {
    if (!ActionRegistry.instance) {
      ActionRegistry.instance = new ActionRegistry();
    }
    return ActionRegistry.instance;
  }

  public register(action: SimulatedAction): void {
    this.actions.push(action);
  }

  public findAction(uses: string): SimulatedAction | null {
    const cleanUses = (uses || '').trim();
    for (const action of this.actions) {
      if (action.matches(cleanUses)) {
        return action;
      }
    }
    return null;
  }
}
