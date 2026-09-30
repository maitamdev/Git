import { CommandContext, CommandExecutionResult, GitCommand } from './command.interface';

export class TagCommand implements GitCommand {
  public name = 'tag';
  public description = 'Tạo, liệt kê, xóa hoặc xác thực thẻ phiên bản (tag)';
  public usage = 'git tag [-a <name> -m <message> | -d <name> | <name>]';

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

    const headCommit = ctx.stateManager.getHeadCommit();

    // 1. Delete tag: git tag -d <name>
    if (flags['d'] || flags['delete']) {
      const tagName = typeof flags['d'] === 'string' ? flags['d'] : args[0];
      if (!tagName) {
        return {
          stdout: '',
          stderr: 'fatal: tag name required',
          exitCode: 1,
        };
      }

      const deleted = ctx.stateManager.deleteTag(tagName);
      if (!deleted) {
        return {
          stdout: '',
          stderr: `error: tag '${tagName}' not found.`,
          exitCode: 1,
        };
      }

      return {
        stdout: `Deleted tag '${tagName}'`,
        stderr: '',
        exitCode: 0,
      };
    }

    // 2. List tags: git tag (no args, no creation flags)
    if (args.length === 0 && !flags['a']) {
      const tags = ctx.stateManager.getTags();
      const output = tags.map((t) => t.name).join('\n');
      return {
        stdout: output,
        stderr: '',
        exitCode: 0,
      };
    }

    if (!headCommit) {
      return {
        stdout: '',
        stderr: 'fatal: Failed to resolve \'HEAD\' as a valid ref.',
        exitCode: 128,
      };
    }

    // 3. Create annotated tag: git tag -a <name> -m <message>
    if (flags['a'] || flags['annotate']) {
      const tagName = typeof flags['a'] === 'string' ? flags['a'] : args[0];
      if (!tagName) {
        return {
          stdout: '',
          stderr: 'fatal: tag name required for -a',
          exitCode: 1,
        };
      }

      const message = typeof flags['m'] === 'string' ? flags['m'] : 'Tagged release';
      const targetHash = args[1] ? ctx.stateManager.resolveRef(args[1]) : headCommit.hash;
      if (!targetHash) {
        return {
          stdout: '',
          stderr: `fatal: Failed to resolve '${args[1]}' as a valid ref.`,
          exitCode: 128,
        };
      }

      try {
        ctx.stateManager.createTag(tagName, targetHash, message, true);
        return {
          stdout: '',
          stderr: '',
          exitCode: 0,
        };
      } catch (err: any) {
        return {
          stdout: '',
          stderr: err.message,
          exitCode: 128,
        };
      }
    }

    // 4. Create lightweight tag: git tag <name> [commit]
    const tagName = args[0];
    const targetHash = args[1] ? ctx.stateManager.resolveRef(args[1]) : headCommit.hash;
    if (!targetHash) {
      return {
        stdout: '',
        stderr: `fatal: Failed to resolve '${args[1]}' as a valid ref.`,
        exitCode: 128,
      };
    }

    try {
      ctx.stateManager.createTag(tagName, targetHash, undefined, false);
      return {
        stdout: '',
        stderr: '',
        exitCode: 0,
      };
    } catch (err: any) {
      return {
        stdout: '',
        stderr: err.message,
        exitCode: 128,
      };
    }
  }
}
