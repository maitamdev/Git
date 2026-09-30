import { GitCommand, CommandContext, CommandExecutionResult } from './command.interface';

export class SwitchCommand implements GitCommand {
  public name = 'switch';
  public description = 'Switch branches';

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

    // Create and switch: git switch -c <name>
    const createFlag = (flags['c'] as string) || (flags['create'] as string);
    if (createFlag) {
      const branchName = typeof createFlag === 'string' ? createFlag : args[0];
      if (!branchName) {
        return { stdout: '', stderr: 'fatal: missing branch name', exitCode: 128 };
      }
      if (state.branches.some((b) => b.name === branchName)) {
        return {
          stdout: '',
          stderr: `fatal: a branch named '${branchName}' already exists`,
          exitCode: 128,
        };
      }

      ctx.stateManager.createBranch(branchName);
      ctx.stateManager.switchBranch(branchName);
      ctx.events.emit('branch:switched', { from: currentBranch, to: branchName });

      return {
        stdout: `Switched to a new branch '${branchName}'`,
        stderr: '',
        exitCode: 0,
      };
    }

    if (args.length === 0) {
      return {
        stdout: '',
        stderr: 'fatal: missing branch or commit argument',
        exitCode: 128,
      };
    }

    const targetBranchName = args[0];
    const targetBranch = ctx.stateManager.getBranch(targetBranchName);

    if (!targetBranch) {
      return {
        stdout: '',
        stderr: `fatal: invalid reference: ${targetBranchName}`,
        exitCode: 128,
      };
    }

    if (targetBranchName === currentBranch) {
      return {
        stdout: `Already on '${targetBranchName}'`,
        stderr: '',
        exitCode: 0,
      };
    }

    ctx.stateManager.switchBranch(targetBranchName);

    // Update working directory to match target branch commit tree
    const targetCommit = targetBranch.commitHash
      ? ctx.stateManager.getCommit(targetBranch.commitHash)
      : null;

    if (targetCommit) {
      // Synchronize virtual filesystem with the commit tree
      ctx.fs.clear();
      for (const [path, content] of Object.entries(targetCommit.tree)) {
        ctx.fs.writeFile(path, content);
      }
    }

    ctx.events.emit('branch:switched', { from: currentBranch, to: targetBranchName });

    return {
      stdout: `Switched to branch '${targetBranchName}'`,
      stderr: '',
      exitCode: 0,
    };
  }
}
