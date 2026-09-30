import { CommandContext, CommandExecutionResult, GitCommand } from './command.interface';

export class ReflogCommand implements GitCommand {
  public name = 'reflog';
  public description = 'Quản lý và hiển thị nhật ký tham chiếu (reference log)';
  public usage = 'git reflog [show] [<ref>]';

  public execute(args: string[], flags: Record<string, any>, ctx: CommandContext): CommandExecutionResult {
    if (!ctx.stateManager.isInitialized()) {
      return {
        stdout: '',
        stderr: 'fatal: not a git repository (or any of the parent directories): .git',
        exitCode: 128,
      };
    }

    const state = ctx.stateManager.getState();
    const reflog = state.reflog || [];

    if (reflog.length === 0) {
      return {
        stdout: '',
        stderr: '',
        exitCode: 0,
      };
    }

    const lines: string[] = [];
    for (let i = 0; i < reflog.length; i++) {
      const entry = reflog[i];
      const targetHash = entry.newHash || entry.toHash || '0000000';
      const shortHash = targetHash.substring(0, 7);
      const refIdx = `HEAD@{${entry.index !== undefined ? entry.index : i}}`;
      lines.push(`${shortHash} ${refIdx}: ${entry.message}`);
    }

    return {
      stdout: lines.join('\n'),
      stderr: '',
      exitCode: 0,
    };
  }
}
