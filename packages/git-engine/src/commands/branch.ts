import { GitCommand, CommandContext, CommandExecutionResult } from './command.interface';

export class BranchCommand implements GitCommand {
  public name = 'branch';
  public description = 'List, create, or delete branches';

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

    const state = ctx.stateManager.getState();
    const currentBranch = ctx.stateManager.getCurrentBranch();

    // Delete branch
    const deleteTarget = (flags['d'] as string) || (flags['delete'] as string);
    if (deleteTarget) {
      const targetName = typeof deleteTarget === 'string' ? deleteTarget : args[0];
      if (!targetName) {
        return { stdout: '', stderr: 'fatal: branch name required', exitCode: 128 };
      }
      if (targetName === currentBranch) {
        return {
          stdout: '',
          stderr: `error: Cannot delete branch '${targetName}' checked out at '/project'`,
          exitCode: 1,
        };
      }
      const index = state.branches.findIndex((b) => b.name === targetName);
      if (index === -1) {
        return {
          stdout: '',
          stderr: `error: branch '${targetName}' not found.`,
          exitCode: 1,
        };
      }
      const deleted = state.branches.splice(index, 1)[0];
      ctx.events.emit('branch:deleted', { name: targetName });
      return {
        stdout: `Deleted branch ${targetName} (was ${deleted.commitHash ? deleted.commitHash.slice(0, 7) : 'empty'}).`,
        stderr: '',
        exitCode: 0,
      };
    }

    // Create branch: git branch <name>
    if (args.length > 0) {
      const newBranchName = args[0];
      if (state.branches.some((b) => b.name === newBranchName)) {
        return {
          stdout: '',
          stderr: `fatal: A branch named '${newBranchName}' already exists.`,
          exitCode: 128,
        };
      }

      const branch = ctx.stateManager.createBranch(newBranchName);
      ctx.events.emit('branch:created', branch);
      return {
        stdout: '',
        stderr: '',
        exitCode: 0,
      };
    }

    // List branches: git branch
    const lines = state.branches.map((b) => {
      if (b.name === currentBranch) {
        return `* \x1b[32m${b.name}\x1b[0m`;
      }
      return `  ${b.name}`;
    });

    return {
      stdout: lines.join('\n'),
      stderr: '',
      exitCode: 0,
    };
  }
}
