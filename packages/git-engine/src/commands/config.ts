import { GitCommand, CommandContext, CommandExecutionResult } from './command.interface';

export class ConfigCommand implements GitCommand {
  public name = 'config';
  public description = 'Get and set repository or global options';
  public aliases = [];

  public execute(
    args: string[],
    flags: Record<string, string | boolean>,
    ctx: CommandContext
  ): CommandExecutionResult {
    // Check --list or -l
    if (flags['list'] || flags['l']) {
      const all = ctx.stateManager.getAllConfig();
      const lines = Object.entries(all)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => `${k}=${v}`);
      return {
        stdout: lines.join('\n'),
        stderr: '',
        exitCode: 0,
      };
    }

    if (args.length === 0) {
      return {
        stdout: '',
        stderr: 'error: no action specified for git config\nusage: git config [options] <name> [<value>]',
        exitCode: 1,
      };
    }

    const key = args[0];

    // Get value
    if (args.length === 1) {
      const val = ctx.stateManager.getConfig(key);
      if (val === undefined) {
        return {
          stdout: '',
          stderr: '',
          exitCode: 1,
        };
      }
      return {
        stdout: val,
        stderr: '',
        exitCode: 0,
      };
    }

    // Set value: args[1] may be quoted or contain spaces
    const val = args.slice(1).join(' ').replace(/^["']|["']$/g, '');
    ctx.stateManager.setConfig(key, val);

    return {
      stdout: '',
      stderr: '',
      exitCode: 0,
    };
  }
}
