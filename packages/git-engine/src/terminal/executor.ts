import { CommandContext, GitCommand } from '../commands/command.interface';
import { parseCommandLine } from './parser';
import { CommandResult, GitEvent } from '@git-academy/shared';
import { InitCommand } from '../commands/init';
import { StatusCommand } from '../commands/status';
import { AddCommand } from '../commands/add';
import { CommitCommand } from '../commands/commit';
import { LogCommand } from '../commands/log';
import { ShowCommand } from '../commands/show';
import { BranchCommand } from '../commands/branch';
import { SwitchCommand } from '../commands/switch';
import { CheckoutCommand } from '../commands/checkout';
import { DiffCommand } from '../commands/diff';
import { RestoreCommand } from '../commands/restore';
import { RmCommand } from '../commands/rm';
import { CheckIgnoreCommand } from '../commands/check-ignore';
import { MvCommand } from '../commands/mv';
import { MergeCommand } from '../commands/merge';
import { ResetCommand } from '../commands/reset';
import { RevertCommand } from '../commands/revert';
import { StashCommand } from '../commands/stash';
import { ConfigCommand } from '../commands/config';
import { RemoteCommand } from '../commands/remote';
import { CloneCommand } from '../commands/clone';
import { FetchCommand } from '../commands/fetch';
import { PushCommand } from '../commands/push';
import { PullCommand } from '../commands/pull';
import { ReflogCommand } from '../commands/reflog';
import { CherryPickCommand } from '../commands/cherry-pick';
import { RebaseCommand } from '../commands/rebase';
import { TagCommand } from '../commands/tag';
import { BisectCommand } from '../commands/bisect';
import { WorktreeCommand } from '../commands/worktree';
import { HelpCommand } from '../commands/help';
import { findClosestMatch } from './levenshtein';

export class CommandExecutor {
  private commands: Map<string, GitCommand> = new Map();

  constructor() {
    this.registerCommand(new InitCommand());
    this.registerCommand(new StatusCommand());
    this.registerCommand(new AddCommand());
    this.registerCommand(new CommitCommand());
    this.registerCommand(new LogCommand());
    this.registerCommand(new ShowCommand());
    this.registerCommand(new BranchCommand());
    this.registerCommand(new SwitchCommand());
    this.registerCommand(new CheckoutCommand());
    this.registerCommand(new DiffCommand());
    this.registerCommand(new RestoreCommand());
    this.registerCommand(new RmCommand());
    this.registerCommand(new CheckIgnoreCommand());
    this.registerCommand(new MvCommand());
    this.registerCommand(new MergeCommand());
    this.registerCommand(new ResetCommand());
    this.registerCommand(new RevertCommand());
    this.registerCommand(new StashCommand());
    this.registerCommand(new ConfigCommand());
    this.registerCommand(new RemoteCommand());
    this.registerCommand(new CloneCommand());
    this.registerCommand(new FetchCommand());
    this.registerCommand(new PushCommand());
    this.registerCommand(new PullCommand());
    this.registerCommand(new ReflogCommand());
    this.registerCommand(new CherryPickCommand());
    this.registerCommand(new RebaseCommand());
    this.registerCommand(new TagCommand());
    this.registerCommand(new BisectCommand());
    this.registerCommand(new WorktreeCommand());
    this.registerCommand(new HelpCommand(() => this.getAllCommands()));
  }

  public registerCommand(cmd: GitCommand): void {
    this.commands.set(cmd.name, cmd);
    if (cmd.aliases) {
      for (const alias of cmd.aliases) {
        this.commands.set(alias, cmd);
      }
    }
  }

  public getCommand(name: string): GitCommand | undefined {
    return this.commands.get(name);
  }

  public getAllCommands(): GitCommand[] {
    const unique = new Set(this.commands.values());
    return Array.from(unique);
  }

  public execute(commandLine: string, ctx: CommandContext): CommandResult {
    const trimmed = commandLine.trim();
    if (!trimmed) {
      return {
        success: true,
        stdout: '',
        stderr: '',
        exitCode: 0,
        state: ctx.stateManager.getState(),
        events: [],
      };
    }

    const parsed = parseCommandLine(trimmed);
    const recordedEvents: GitEvent[] = [];
    const unsubscribe = ctx.events.on('*', (evt) => {
      recordedEvents.push(evt);
    });

    try {
      // Global Git option: it works without an initialized repository.
      if (parsed.program === 'git' && parsed.subcommand === '--version') {
        return {
          success: true,
          stdout: 'git version 2.56.0 (Git Academy simulator)',
          stderr: '',
          exitCode: 0,
          state: ctx.stateManager.getState(),
          events: [],
        };
      }

      // Built-in shell utilities
      if (parsed.program === 'clear') {
        return {
          success: true,
          stdout: '\x1bc', // ANSI clear code
          stderr: '',
          exitCode: 0,
          state: ctx.stateManager.getState(),
          events: [],
        };
      }

      if (parsed.program === 'ls') {
        const files = ctx.fs.listFiles(parsed.args[0] || '');
        if (
          parsed.flags['a'] &&
          !parsed.args[0] &&
          ctx.stateManager.getState().repositoryInitialized
        ) {
          files.unshift('.git/');
        }
        return {
          success: true,
          stdout: files.join('  '),
          stderr: '',
          exitCode: 0,
          state: ctx.stateManager.getState(),
          events: [],
        };
      }

      if (parsed.program === 'cat') {
        if (parsed.args.length === 0) {
          return {
            success: false,
            stdout: '',
            stderr: 'cat: missing file operand',
            exitCode: 1,
            state: ctx.stateManager.getState(),
            events: [],
          };
        }
        const content = ctx.fs.readFile(parsed.args[0]);
        if (content === null) {
          return {
            success: false,
            stdout: '',
            stderr: `cat: ${parsed.args[0]}: No such file or directory`,
            exitCode: 1,
            state: ctx.stateManager.getState(),
            events: [],
          };
        }
        return {
          success: true,
          stdout: content,
          stderr: '',
          exitCode: 0,
          state: ctx.stateManager.getState(),
          events: [],
        };
      }

      if (parsed.program === 'touch') {
        if (parsed.args.length === 0) {
          return {
            success: false,
            stdout: '',
            stderr: 'touch: missing file operand',
            exitCode: 1,
            state: ctx.stateManager.getState(),
            events: [],
          };
        }
        for (const filePath of parsed.args) {
          const norm = ctx.fs.normalizePath(filePath);
          if (!ctx.fs.exists(norm)) {
            ctx.fs.writeFile(norm, '');
            ctx.events.emit('file:created', { path: norm });
          }
        }
        return {
          success: true,
          stdout: '',
          stderr: '',
          exitCode: 0,
          state: ctx.stateManager.getState(),
          events: [],
        };
      }

      if (parsed.program === 'mkdir') {
        if (parsed.args.length === 0) {
          return {
            success: false,
            stdout: '',
            stderr: 'mkdir: missing operand',
            exitCode: 1,
            state: ctx.stateManager.getState(),
            events: [],
          };
        }
        for (const dirPath of parsed.args) {
          ctx.fs.createDirectory(dirPath);
        }
        return {
          success: true,
          stdout: '',
          stderr: '',
          exitCode: 0,
          state: ctx.stateManager.getState(),
          events: [],
        };
      }

      if (parsed.program === 'rm') {
        if (parsed.args.length === 0) {
          return {
            success: false,
            stdout: '',
            stderr: 'rm: missing operand',
            exitCode: 1,
            state: ctx.stateManager.getState(),
            events: [],
          };
        }
        for (const filePath of parsed.args) {
          const norm = ctx.fs.normalizePath(filePath);
          if (ctx.fs.exists(norm)) {
            ctx.fs.deleteFile(norm);
            ctx.events.emit('file:deleted', { path: norm });
          } else {
            return {
              success: false,
              stdout: '',
              stderr: `rm: cannot remove '${filePath}': No such file or directory`,
              exitCode: 1,
              state: ctx.stateManager.getState(),
              events: [],
            };
          }
        }
        return {
          success: true,
          stdout: '',
          stderr: '',
          exitCode: 0,
          state: ctx.stateManager.getState(),
          events: [],
        };
      }

      if (parsed.program === 'echo') {
        // Check for redirection: echo "content" > file or echo "content" >> file
        const raw = trimmed;
        const appendIdx = raw.indexOf('>>');
        const redirectIdx = raw.indexOf('>');

        if (appendIdx !== -1) {
          const contentPart = raw.substring(4, appendIdx).trim();
          const targetFile = raw.substring(appendIdx + 2).trim();
          const cleanContent = contentPart.replace(/^["']|["']$/g, '');
          ctx.fs.appendFile(targetFile, cleanContent + '\n');
          ctx.events.emit('file:modified', { path: targetFile });
          return {
            success: true,
            stdout: '',
            stderr: '',
            exitCode: 0,
            state: ctx.stateManager.getState(),
            events: [],
          };
        } else if (redirectIdx !== -1) {
          const contentPart = raw.substring(4, redirectIdx).trim();
          const targetFile = raw.substring(redirectIdx + 1).trim();
          const cleanContent = contentPart.replace(/^["']|["']$/g, '');
          ctx.fs.writeFile(targetFile, cleanContent);
          ctx.events.emit('file:modified', { path: targetFile });
          return {
            success: true,
            stdout: '',
            stderr: '',
            exitCode: 0,
            state: ctx.stateManager.getState(),
            events: [],
          };
        }

        return {
          success: true,
          stdout: parsed.args.join(' ').replace(/^["']|["']$/g, ''),
          stderr: '',
          exitCode: 0,
          state: ctx.stateManager.getState(),
          events: [],
        };
      }

      if (parsed.program === 'pwd') {
        return {
          success: true,
          stdout: '/workspace/project',
          stderr: '',
          exitCode: 0,
          state: ctx.stateManager.getState(),
          events: [],
        };
      }

      // Check if command is git
      if (parsed.program !== 'git') {
        return {
          success: false,
          stdout: '',
          stderr: `bash: ${parsed.program}: command not found. Did you mean to type 'git ${parsed.program}'?`,
          exitCode: 127,
          state: ctx.stateManager.getState(),
          events: [],
        };
      }

      // Check alias expansion
      let subcommand = parsed.subcommand;
      const aliases = ctx.stateManager.getAliases();
      if (subcommand && aliases[subcommand]) {
        const expanded = aliases[subcommand].trim().split(/\s+/);
        subcommand = expanded[0];
        parsed.args = [...expanded.slice(1), ...parsed.args];
      }

      if (!subcommand || subcommand === '--help') {
        const helpCmd = this.commands.get('help');
        if (helpCmd) {
          const res = helpCmd.execute([], {}, ctx);
          return {
            success: true,
            stdout: res.stdout,
            stderr: '',
            exitCode: 0,
            state: ctx.stateManager.getState(),
            events: [],
          };
        }
      }

      // Check if command has --help flag
      if (parsed.flags['help'] || parsed.flags['--help']) {
        const helpCmd = this.commands.get('help');
        if (helpCmd) {
          const res = helpCmd.execute([subcommand], {}, ctx);
          return {
            success: res.exitCode === 0,
            stdout: res.stdout,
            stderr: res.stderr,
            exitCode: res.exitCode,
            state: ctx.stateManager.getState(),
            events: [],
          };
        }
      }

      const handler = this.commands.get(subcommand);
      if (!handler) {
        const candidates = Array.from(new Set(this.commands.keys()));
        const suggestion = findClosestMatch(subcommand, candidates, 2);

        const errorMessage = suggestion
          ? `Không tìm thấy "${subcommand}".\n\nBạn có muốn dùng:\n  git ${suggestion}`
          : `git: '${subcommand}' is not a git command. See 'git --help'.`;

        return {
          success: false,
          stdout: '',
          stderr: errorMessage,
          exitCode: 1,
          state: ctx.stateManager.getState(),
          events: [],
        };
      }

      const res = handler.execute(parsed.args, parsed.flags, ctx);

      return {
        success: res.exitCode === 0,
        stdout: res.stdout,
        stderr: res.stderr,
        exitCode: res.exitCode,
        state: ctx.stateManager.getState(),
        events: recordedEvents,
      };
    } finally {
      unsubscribe();
    }
  }
}
