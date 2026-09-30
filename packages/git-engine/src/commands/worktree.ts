import { CommandContext, CommandExecutionResult, GitCommand } from './command.interface';

export class WorktreeCommand implements GitCommand {
  public name = 'worktree';
  public description = 'Quản lý nhiều thư mục làm việc (working trees) gắn với cùng repository';
  public usage = 'git worktree (add <path> <branch> | list | remove <path>)';

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

    if (args.length === 0 || args[0] === 'list') {
      const mainBranch = ctx.stateManager.getCurrentBranch();
      const headCommit = ctx.stateManager.getHeadCommit();
      const shortHash = headCommit ? headCommit.shortHash : '0000000';
      const lines = [`/workspace/project    ${shortHash} [${mainBranch}]`];

      const worktrees = ctx.stateManager.getWorktrees();
      for (const wt of worktrees) {
        const wtCommit = ctx.stateManager.getCommit(wt.commitHash);
        const wtShort = wtCommit ? wtCommit.shortHash : wt.commitHash.substring(0, 7);
        lines.push(`${wt.path.padEnd(20)} ${wtShort} [${wt.branch}]`);
      }

      return {
        stdout: lines.join('\n'),
        stderr: '',
        exitCode: 0,
      };
    }

    const sub = args[0];

    // 1. git worktree add <path> <branch>
    if (sub === 'add') {
      const wtPath = args[1];
      const branchName = args[2] || (typeof flags['b'] === 'string' ? flags['b'] : undefined);

      if (!wtPath) {
        return {
          stdout: '',
          stderr: 'fatal: missing worktree path',
          exitCode: 1,
        };
      }

      if (!branchName) {
        return {
          stdout: '',
          stderr: 'fatal: missing branch name for worktree',
          exitCode: 1,
        };
      }

      if (branchName === ctx.stateManager.getCurrentBranch()) {
        return {
          stdout: '',
          stderr: `fatal: '${branchName}' is already checked out at '/workspace/project'`,
          exitCode: 1,
        };
      }

      const existingWt = ctx.stateManager.getWorktrees().find((w) => w.branch === branchName);
      if (existingWt) {
        return {
          stdout: '',
          stderr: `fatal: '${branchName}' is already checked out at '${existingWt.path}'`,
          exitCode: 1,
        };
      }

      let branch = ctx.stateManager.getBranch(branchName);
      if (!branch) {
        // Create branch from current HEAD
        const head = ctx.stateManager.getHeadCommit();
        branch = ctx.stateManager.createBranch(branchName, head?.hash || null);
      }

      try {
        ctx.stateManager.addWorktree(wtPath, branchName, branch.commitHash || '0000000');
        return {
          stdout: `Preparing worktree (checking out '${branchName}')\nHEAD is now at ${branch.commitHash ? branch.commitHash.substring(0, 7) : 'root'}`,
          stderr: '',
          exitCode: 0,
        };
      } catch (e: any) {
        return {
          stdout: '',
          stderr: e.message,
          exitCode: 128,
        };
      }
    }

    // 2. git worktree remove <path>
    if (sub === 'remove') {
      const wtPath = args[1];
      if (!wtPath) {
        return {
          stdout: '',
          stderr: 'fatal: missing path to remove',
          exitCode: 1,
        };
      }

      const removed = ctx.stateManager.removeWorktree(wtPath);
      if (!removed) {
        return {
          stdout: '',
          stderr: `fatal: '${wtPath}' is not a valid worktree`,
          exitCode: 128,
        };
      }

      return {
        stdout: '',
        stderr: '',
        exitCode: 0,
      };
    }

    return {
      stdout: '',
      stderr: `error: unknown worktree command '${sub}'`,
      exitCode: 1,
    };
  }
}
