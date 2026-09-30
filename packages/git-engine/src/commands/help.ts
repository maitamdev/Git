import { GitCommand, CommandContext, CommandExecutionResult } from './command.interface';

export class HelpCommand implements GitCommand {
  public name = 'help';
  public syntax = 'git help [<command>]';
  public description = 'Display help information about Git commands';
  public category: 'Setup' = 'Setup';

  private getCommandsFn: () => GitCommand[];

  constructor(getCommandsFn: () => GitCommand[]) {
    this.getCommandsFn = getCommandsFn;
  }

  public execute(
    args: string[],
    flags: Record<string, string | boolean>,
    ctx: CommandContext
  ): CommandExecutionResult {
    const commands = this.getCommandsFn();

    if (args.length === 0) {
      const lines = [
        'usage: git [--version] [--help] <command> [<args>]',
        '',
        'These are common Git commands used in various situations:',
        '',
      ];

      const categories: Record<string, GitCommand[]> = {};
      for (const cmd of commands) {
        const cat = cmd.category || 'Common';
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(cmd);
      }

      for (const [cat, cmds] of Object.entries(categories)) {
        lines.push(`${cat}:`);
        for (const cmd of cmds) {
          lines.push(`   ${cmd.name.padEnd(12)} ${cmd.description}`);
        }
        lines.push('');
      }

      lines.push("See 'git help <command>' to read about a specific subcommand.");

      return {
        stdout: lines.join('\n'),
        stderr: '',
        exitCode: 0,
      };
    }

    const targetName = args[0];
    const cmd = commands.find(
      (c) => c.name === targetName || (c.aliases && c.aliases.includes(targetName))
    );

    if (!cmd) {
      return {
        stdout: '',
        stderr: `No manual entry for git-${targetName}`,
        exitCode: 1,
      };
    }

    const lines = [
      `NAME`,
      `   git-${cmd.name} - ${cmd.description}`,
      ``,
      `SYNOPSIS`,
      `   ${cmd.syntax || `git ${cmd.name} [options] [<args>]`}`,
      ``,
      `DESCRIPTION`,
      `   ${cmd.description}`,
    ];

    if (cmd.options && cmd.options.length > 0) {
      lines.push(``, `OPTIONS`);
      for (const opt of cmd.options) {
        lines.push(`   ${opt.flag.padEnd(16)} ${opt.description}`);
      }
    }

    return {
      stdout: lines.join('\n'),
      stderr: '',
      exitCode: 0,
    };
  }
}
