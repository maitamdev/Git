import { GitCommand, CommandContext, CommandExecutionResult } from './command.interface';

export class MvCommand implements GitCommand {
  public name = 'mv';
  public description = 'Move or rename a file, a directory, or a symlink';

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

    if (args.length < 2) {
      return {
        stdout: '',
        stderr: 'fatal: destination checkpoint expected',
        exitCode: 128,
      };
    }

    const source = ctx.fs.normalizePath(args[0]);
    const destination = ctx.fs.normalizePath(args[1]);

    if (!ctx.fs.exists(source)) {
      return {
        stdout: '',
        stderr: `fatal: bad source, source=${source}, destination=${destination}`,
        exitCode: 128,
      };
    }

    const content = ctx.fs.readFile(source) || '';
    ctx.fs.renameFile(source, destination);

    const state = ctx.stateManager.getState();
    const headTree = ctx.stateManager.getHeadTree();

    // Stage removal of old and addition of new
    state.stagingArea = state.stagingArea.filter((f) => f.path !== source);
    if (source in headTree) {
      state.stagingArea.push({
        path: source,
        content: '',
        status: 'deleted',
        staged: true,
      });
    }

    const destIdx = state.stagingArea.findIndex((f) => f.path === destination);
    if (destIdx >= 0) {
      state.stagingArea[destIdx] = { path: destination, content, status: 'added', staged: true };
    } else {
      state.stagingArea.push({ path: destination, content, status: 'added', staged: true });
    }

    ctx.events.emit('file:modified', { from: source, to: destination });

    return {
      stdout: '',
      stderr: '',
      exitCode: 0,
    };
  }
}
