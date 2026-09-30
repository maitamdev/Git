import { GitCommand, CommandContext, CommandExecutionResult } from './command.interface';
import { DEFAULT_BRANCH } from '@git-academy/shared';

export class InitCommand implements GitCommand {
  public name = 'init';
  public description = 'Create an empty Git repository or reinitialize an existing one';

  public execute(
    args: string[],
    flags: Record<string, string | boolean>,
    ctx: CommandContext
  ): CommandExecutionResult {
    const isReinit = ctx.stateManager.isInitialized();
    const branchName = (flags['b'] as string) || (flags['initial-branch'] as string) || DEFAULT_BRANCH;

    const state = ctx.stateManager.getState();
    state.repositoryInitialized = true;
    state.currentBranch = branchName;
    state.head = {
      type: 'branch',
      ref: branchName,
    };

    if (!state.branches.some((b) => b.name === branchName)) {
      state.branches.push({
        name: branchName,
        commitHash: null,
      });
    }

    ctx.events.emit('repository:init', { branch: branchName, reinitialized: isReinit });

    if (isReinit) {
      return {
        stdout: `Reinitialized existing Git repository in /project/.git/`,
        stderr: '',
        exitCode: 0,
      };
    }

    return {
      stdout: `Initialized empty Git repository in /project/.git/`,
      stderr: '',
      exitCode: 0,
    };
  }
}
