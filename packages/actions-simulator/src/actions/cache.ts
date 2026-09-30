import { SimulatedAction, ActionInput, ActionExecutionContext, ActionResult } from './registry';
import { CacheStore } from '../cache/cache-store';

export class CacheAction implements SimulatedAction {
  public name = 'actions/cache';

  public matches(uses: string): boolean {
    return /^actions\/cache(\/.*)?(@.*)?$/.test(uses.trim());
  }

  public async execute(input: ActionInput, context: ActionExecutionContext): Promise<ActionResult> {
    const key = input.with?.key || 'cache-key';
    const paths = Array.isArray(input.with?.path)
      ? input.with.path
      : typeof input.with?.path === 'string'
      ? input.with.path.split(/\r?\n/).map((p: string) => p.trim()).filter(Boolean)
      : ['~/.npm'];
    const restoreKeys = Array.isArray(input.with?.['restore-keys'])
      ? input.with['restore-keys']
      : typeof input.with?.['restore-keys'] === 'string'
      ? input.with['restore-keys'].split(/\r?\n/).map((k: string) => k.trim()).filter(Boolean)
      : undefined;

    const logs: string[] = [];
    const cacheStore = CacheStore.getInstance();
    const hit = cacheStore.restore(key, restoreKeys);

    if (hit) {
      logs.push(`Cache hit for key: ${hit.key}`);
      logs.push(`Restored paths: ${paths.join(', ')}`);
      for (const [p, val] of Object.entries(hit.data)) {
        context.files[p] = val;
      }
      return {
        success: true,
        outputs: {
          'cache-hit': 'true',
        },
        logs,
      };
    }

    logs.push(`Cache not found for key: ${key}. Will save cache at end of job.`);
    // Simulate caching current path state
    cacheStore.save(key, paths, { 'simulated-cache.lock': 'locked' });

    return {
      success: true,
      outputs: {
        'cache-hit': 'false',
      },
      logs,
    };
  }
}
