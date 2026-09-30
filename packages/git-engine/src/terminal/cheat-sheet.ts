import { CommandExecutor } from './executor';
import { GitCommand } from '../commands/command.interface';

export interface CheatSheetEntry {
  name: string;
  syntax: string;
  description: string;
  category: string;
  options: { flag: string; description: string }[];
}

export function generateCheatSheet(executor = new CommandExecutor()): Record<string, CheatSheetEntry[]> {
  const commands = executor.getAllCommands();
  const categories: Record<string, CheatSheetEntry[]> = {
    Setup: [],
    Changes: [],
    History: [],
    Branches: [],
    Merge: [],
    Undo: [],
    Remote: [],
    Advanced: [],
  };

  const categoryMap: Record<string, string> = {
    init: 'Setup',
    config: 'Setup',
    status: 'Changes',
    add: 'Changes',
    diff: 'Changes',
    commit: 'Changes',
    log: 'History',
    branch: 'Branches',
    switch: 'Branches',
    checkout: 'Branches',
    merge: 'Merge',
    restore: 'Undo',
    reset: 'Undo',
    revert: 'Undo',
    stash: 'Undo',
    remote: 'Remote',
    clone: 'Remote',
    fetch: 'Remote',
    push: 'Remote',
    pull: 'Remote',
    mv: 'Advanced',
    rm: 'Advanced',
    help: 'Setup',
  };

  for (const cmd of commands) {
    const cat = cmd.category || categoryMap[cmd.name] || 'Advanced';
    if (!categories[cat]) {
      categories[cat] = [];
    }

    categories[cat].push({
      name: `git ${cmd.name}`,
      syntax: cmd.syntax || `git ${cmd.name} [<options>]`,
      description: cmd.description,
      category: cat,
      options: cmd.options || [],
    });
  }

  return categories;
}
