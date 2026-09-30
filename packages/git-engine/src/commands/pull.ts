import { GitCommand, CommandContext, CommandExecutionResult } from './command.interface';
import { FetchCommand } from './fetch';
import { MergeCommand } from './merge';

export class PullCommand implements GitCommand {
  public name = 'pull';
  public syntax = 'git pull [<remote>] [<branch>]';
  public description = 'Fetch from and integrate with another repository or a local branch';
  public category: 'Remote' = 'Remote';

  private fetchCmd = new FetchCommand();
  private mergeCmd = new MergeCommand();

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

    const currentBranch = ctx.stateManager.getCurrentBranch();
    const remoteName = args[0] || ctx.stateManager.getConfig(`branch.${currentBranch}.remote`) || 'origin';
    const targetBranch = args[1] || currentBranch;

    // 1. Fetch
    const fetchResult = this.fetchCmd.execute([remoteName], flags, ctx);
    if (fetchResult.exitCode !== 0) {
      return fetchResult;
    }

    // 2. Merge tracking branch into current branch
    const trackingRef = `${remoteName}/${targetBranch}`;
    const mergeResult = this.mergeCmd.execute([trackingRef], flags, ctx);

    const stdoutParts = [fetchResult.stdout, mergeResult.stdout].filter(Boolean);
    const stderrParts = [fetchResult.stderr, mergeResult.stderr].filter(Boolean);

    return {
      stdout: stdoutParts.join('\n'),
      stderr: stderrParts.join('\n'),
      exitCode: mergeResult.exitCode,
    };
  }
}
