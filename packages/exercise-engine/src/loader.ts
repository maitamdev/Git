import { Scenario } from '@git-academy/shared';
import { parse as parseYaml } from 'yaml';

export class ScenarioLoader {
  public parseScenario(rawContent: string): Scenario {
    try {
      const parsed = parseYaml(rawContent);
      return this.sanitizeScenario(parsed);
    } catch (err: any) {
      throw new Error(`Failed to parse scenario content: ${err.message}`);
    }
  }

  public sanitizeScenario(raw: any): Scenario {
    if (!raw.id || !raw.title) {
      throw new Error('Scenario must have id and title');
    }

    return {
      id: String(raw.id),
      title: String(raw.title),
      description: raw.description ? String(raw.description) : '',
      initialState: {
        repositoryInitialized: raw.initialState?.repositoryInitialized ?? false,
        branch: raw.initialState?.branch ?? 'main',
        branches: raw.initialState?.branches ?? ['main'],
        commits: raw.initialState?.commits ?? [],
        files: (raw.initialState?.files ?? []).map((f: any) => ({
          path: String(f.path),
          content: String(f.content ?? ''),
          status: f.status ?? 'untracked',
        })),
      },
      goal: raw.goal || {},
      allowedCommands: raw.allowedCommands,
      hints: Array.isArray(raw.hints) ? raw.hints.map(String) : [],
      success: {
        message: raw.success?.message ?? 'Hoàn thành bài tập xuất sắc!',
        xp: Number(raw.success?.xp ?? 100),
      },
    };
  }
}
