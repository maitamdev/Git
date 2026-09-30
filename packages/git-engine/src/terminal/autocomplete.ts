import { CommandExecutor } from './executor';
import { CommandContext } from '../commands/command.interface';

export interface AutocompleteSuggestion {
  text: string;
  description?: string;
  type: 'command' | 'branch' | 'file' | 'flag';
}

export class GitAutocomplete {
  private executor: CommandExecutor;

  constructor(executor: CommandExecutor) {
    this.executor = executor;
  }

  public getSuggestions(input: string, ctx: CommandContext): AutocompleteSuggestion[] {
    const trimmed = input.trimStart();
    if (!trimmed.startsWith('git ')) {
      if ('git'.startsWith(trimmed)) {
        return [{ text: 'git', description: 'The Git version control command', type: 'command' }];
      }
      return [];
    }

    const rest = trimmed.slice(4); // after 'git '
    const parts = rest.split(/\s+/);

    // If typing git <subcommand>
    if (parts.length <= 1) {
      const currentPrefix = parts[0] || '';
      const allCommands = this.executor.getAllCommands();
      return allCommands
        .filter((cmd) => cmd.name.startsWith(currentPrefix))
        .map((cmd) => ({
          text: `git ${cmd.name}`,
          description: cmd.description,
          type: 'command',
        }));
    }

    const subcommand = parts[0];
    const lastPart = parts[parts.length - 1];

    // Branch suggestions for branch, switch, checkout
    if (['switch', 'checkout', 'branch'].includes(subcommand)) {
      const branches = ctx.stateManager.getBranches().map((b) => b.name);
      return branches
        .filter((name) => name.startsWith(lastPart))
        .map((name) => ({
          text: name,
          description: `Branch: ${name}`,
          type: 'branch',
        }));
    }

    // File suggestions for add, restore, diff
    if (['add', 'restore', 'diff'].includes(subcommand)) {
      const files = ctx.fs.listFiles();
      return files
        .filter((path) => path.startsWith(lastPart))
        .map((path) => ({
          text: path,
          description: `File: ${path}`,
          type: 'file',
        }));
    }

    return [];
  }
}
