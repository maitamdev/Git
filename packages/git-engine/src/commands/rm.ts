import { GitCommand, CommandContext, CommandExecutionResult } from './command.interface';

export class RmCommand implements GitCommand {
  public name = 'rm';
  public description = 'Remove files from the working tree and from the index';

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
        stderr: 'fatal: No pathspec was given. Which files should I remove?',
        exitCode: 128,
      };
    }

    const cachedOnly = Boolean(flags['cached']);
    const state = ctx.stateManager.getState();
    const headTree = ctx.stateManager.getHeadTree();

    for (const target of args) {
      const normPath = ctx.fs.normalizePath(target);
      const inWorking = ctx.fs.exists(normPath);
      const inHead = normPath in headTree;
      const inStaging = state.stagingArea.some((f) => f.path === normPath);

      if (!inWorking && !inHead && !inStaging) {
        return {
          stdout: '',
          stderr: `fatal: pathspec '${target}' did not match any files`,
          exitCode: 128,
        };
      }

      if (!cachedOnly) {
        ctx.fs.deleteFile(normPath);
      }

      // Record staged deletion
      const stagedIdx = state.stagingArea.findIndex((f) => f.path === normPath);
      if (stagedIdx >= 0) {
        state.stagingArea.splice(stagedIdx, 1);
      }

      if (inHead) {
        state.stagingArea.push({
          path: normPath,
          content: '',
          status: 'deleted',
          staged: true,
        });
      }

      ctx.events.emit('file:deleted', { path: normPath });
    }

    return {
      stdout: '',
      stderr: '',
      exitCode: 0,
    };
  }
}
