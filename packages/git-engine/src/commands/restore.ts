import { GitCommand, CommandContext, CommandExecutionResult } from './command.interface';

export class RestoreCommand implements GitCommand {
  public name = 'restore';
  public description = 'Restore working tree files';

  public execute(
    args: string[],
    flags: Record<string, string | boolean>,
    ctx: CommandContext
  ): CommandExecutionResult {
    if (!ctx.stateManager.isInitialized()) {
      return {
        stdout: '',
        stderr: 'fatal: not a git repository (or any of the parent directories): .git',
        exitCode: 128,
      };
    }

    if (args.length === 0) {
      return {
        stdout: '',
        stderr: 'fatal: you must specify path(s) to restore',
        exitCode: 128,
      };
    }

    const isStaged = Boolean(flags['staged'] || flags['S']);
    const state = ctx.stateManager.getState();
    const headTree = ctx.stateManager.getHeadTree();

    for (const target of args) {
      const normPath = ctx.fs.normalizePath(target);

      if (isStaged) {
        // Restore staging area: unstage changes to match HEAD
        const stagedIdx = state.stagingArea.findIndex((f) => f.path === normPath);
        if (stagedIdx >= 0) {
          state.stagingArea.splice(stagedIdx, 1);
          ctx.events.emit('file:unstaged', { path: normPath });
        }
      } else {
        // Restore working tree: match Staging area if present, else HEAD
        const stagedItem = state.stagingArea.find((f) => f.path === normPath);
        const targetContent = stagedItem ? stagedItem.content : headTree[normPath];

        if (targetContent === undefined && !ctx.fs.exists(normPath)) {
          return {
            stdout: '',
            stderr: `error: pathspec '${target}' did not match any file(s) known to git`,
            exitCode: 1,
          };
        }

        if (targetContent !== undefined) {
          ctx.fs.writeFile(normPath, targetContent);
        } else {
          // File wasn't in HEAD or staging, delete untracked modifications
          ctx.fs.deleteFile(normPath);
        }
      }
    }

    return {
      stdout: '',
      stderr: '',
      exitCode: 0,
    };
  }
}
