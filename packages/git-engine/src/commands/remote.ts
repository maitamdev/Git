import { GitCommand, CommandContext, CommandExecutionResult } from './command.interface';
import { RemoteNetworkRegistry } from '../remote/remote-registry';

export class RemoteCommand implements GitCommand {
  public name = 'remote';
  public syntax = 'git remote [-v] | add <name> <url> | remove <name> | rename <old> <new>';
  public description = 'Manage set of tracked repositories';
  public category: 'Remote' = 'Remote';
  public options = [
    { flag: '-v, --verbose', description: 'Be a little more verbose and show remote url' },
  ];

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
    const remotes = state.remotes || [];

    // git remote or git remote -v
    if (args.length === 0) {
      if (flags['v'] || flags['verbose']) {
        const lines: string[] = [];
        for (const r of remotes) {
          lines.push(`${r.name}\t${r.url} (fetch)`);
          lines.push(`${r.name}\t${r.url} (push)`);
        }
        return {
          stdout: lines.join('\n'),
          stderr: '',
          exitCode: 0,
        };
      }

      const names = remotes.map((r) => r.name);
      return {
        stdout: names.join('\n'),
        stderr: '',
        exitCode: 0,
      };
    }

    const sub = args[0];

    // git remote add <name> <url>
    if (sub === 'add') {
      if (args.length < 3) {
        return {
          stdout: '',
          stderr: 'usage: git remote add <name> <url>',
          exitCode: 129,
        };
      }
      const name = args[1];
      const url = args[2];

      if (ctx.stateManager.getRemote(name)) {
        return {
          stdout: '',
          stderr: `fatal: remote ${name} already exists.`,
          exitCode: 3,
        };
      }

      ctx.stateManager.addRemote(name, url);

      // Auto-register remote URL in simulated network registry if not present
      const net = RemoteNetworkRegistry.getInstance();
      if (!net.has(url)) {
        net.createRepository({
          id: name,
          name,
          url,
          defaultBranch: 'main',
        });
      }

      return {
        stdout: '',
        stderr: '',
        exitCode: 0,
      };
    }

    // git remote remove <name> or rm <name>
    if (sub === 'remove' || sub === 'rm') {
      if (args.length < 2) {
        return {
          stdout: '',
          stderr: 'usage: git remote remove <name>',
          exitCode: 129,
        };
      }
      const name = args[1];
      const ok = ctx.stateManager.removeRemote(name);
      if (!ok) {
        return {
          stdout: '',
          stderr: `fatal: No such remote: '${name}'`,
          exitCode: 2,
        };
      }
      return {
        stdout: '',
        stderr: '',
        exitCode: 0,
      };
    }

    // git remote rename <old> <new>
    if (sub === 'rename') {
      if (args.length < 3) {
        return {
          stdout: '',
          stderr: 'usage: git remote rename <old> <new>',
          exitCode: 129,
        };
      }
      const oldName = args[1];
      const newName = args[2];

      if (!ctx.stateManager.getRemote(oldName)) {
        return {
          stdout: '',
          stderr: `fatal: No such remote: '${oldName}'`,
          exitCode: 2,
        };
      }

      if (ctx.stateManager.getRemote(newName)) {
        return {
          stdout: '',
          stderr: `fatal: remote ${newName} already exists.`,
          exitCode: 3,
        };
      }

      ctx.stateManager.renameRemote(oldName, newName);
      return {
        stdout: '',
        stderr: '',
        exitCode: 0,
      };
    }

    // git remote set-url <name> <url>
    if (sub === 'set-url') {
      if (args.length < 3) {
        return { stdout: '', stderr: 'usage: git remote set-url <name> <url>', exitCode: 129 };
      }
      const name = args[1];
      const url = args[2];
      const remote = ctx.stateManager.getRemote(name);
      if (!remote) {
        return { stdout: '', stderr: `fatal: No such remote '${name}'`, exitCode: 2 };
      }
      remote.url = url;
      return { stdout: '', stderr: '', exitCode: 0 };
    }

    return {
      stdout: '',
      stderr: `error: Unknown subcommand: ${sub}`,
      exitCode: 1,
    };
  }
}
