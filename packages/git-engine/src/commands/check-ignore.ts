import { GitCommand, CommandContext, CommandExecutionResult } from './command.interface';

export class CheckIgnoreCommand implements GitCommand {
  public name = 'check-ignore';
  public description = 'Debug .gitignore rules';

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
      return { stdout: '', stderr: 'fatal: no path specified', exitCode: 128 };
    }

    const matches = args.flatMap((rawPath) => {
      const path = ctx.fs.normalizePath(rawPath);
      const state = ctx.stateManager.getState();
      const isTracked =
        path in ctx.stateManager.getHeadTree() ||
        state.stagingArea.some((item) => item.path === path);
      if (isTracked) return [];

      const rule = ctx.fs.getIgnoreRule(path);
      if (!rule) return [];
      return [flags['v'] || flags['verbose'] ? `.gitignore:${rule.line}:${rule.pattern}\t${path}` : path];
    });

    return {
      stdout: matches.join('\n'),
      stderr: '',
      exitCode: matches.length > 0 ? 0 : 1,
    };
  }
}
