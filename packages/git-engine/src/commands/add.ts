import { GitCommand, CommandContext, CommandExecutionResult } from './command.interface';
import { FileState } from '@git-academy/shared';

export class AddCommand implements GitCommand {
  public name = 'add';
  public description = 'Add file contents to the staging area';

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

    if (args.length === 0 && !flags['A'] && !flags['all']) {
      return {
        stdout: 'Nothing specified, nothing added.\nhint: Maybe you wanted to say \'git add .\'?\nhint: Turn this message off by running\nhint:   "git config advice.addEmptyPathspec false"',
        stderr: '',
        exitCode: 0,
      };
    }

    const state = ctx.stateManager.getState();
    const headTree = ctx.stateManager.getHeadTree();
    const stageAll = args.includes('.') || flags['A'] || flags['all'] || flags['u'];

    if (stageAll) {
      const allFiles = ctx.fs.getAllFiles();
      if (allFiles.length === 0) {
        return { stdout: '', stderr: '', exitCode: 0 };
      }

      for (const f of allFiles) {
        if (ctx.fs.getIgnoreRule(f.path) && !(f.path in headTree)) continue;
        this.stageFile(state.stagingArea, f.path, f.content);
        this.markConflictResolved(f.path, f.content, ctx);
        ctx.events.emit('file:staged', { path: f.path, content: f.content });
      }

      return { stdout: '', stderr: '', exitCode: 0 };
    }

    for (const target of args) {
      const normPath = ctx.fs.normalizePath(target);
      if (!ctx.fs.exists(normPath)) {
        return {
          stdout: '',
          stderr: `fatal: pathspec '${target}' did not match any files`,
          exitCode: 128,
        };
      }

      if (
        ctx.fs.getIgnoreRule(normPath) &&
        !(normPath in headTree) &&
        !state.stagingArea.some((item) => item.path === normPath)
      ) {
        return {
          stdout: '',
          stderr: `The following path is ignored by .gitignore:\n  ${normPath}\nhint: Use -f if you really want to add it.`,
          exitCode: 1,
        };
      }

      const content = ctx.fs.readFile(normPath) || '';
      this.stageFile(state.stagingArea, normPath, content);
      this.markConflictResolved(normPath, content, ctx);
      ctx.events.emit('file:staged', { path: normPath, content });
    }

    return { stdout: '', stderr: '', exitCode: 0 };
  }

  private stageFile(stagingArea: FileState[], path: string, content: string): void {
    const existingIndex = stagingArea.findIndex((f) => f.path === path);
    if (existingIndex >= 0) {
      stagingArea[existingIndex] = {
        path,
        content,
        status: 'added',
        staged: true,
      };
    } else {
      stagingArea.push({
        path,
        content,
        status: 'added',
        staged: true,
      });
    }
  }

  private markConflictResolved(path: string, content: string, ctx: CommandContext): void {
    if (content.includes('<<<<<<<') || content.includes('=======') || content.includes('>>>>>>>')) {
      return;
    }
    const merge = ctx.stateManager.getMergeState();
    const conflict = merge?.conflicts.find((entry) => entry.path === path);
    if (conflict) conflict.status = 'resolved';
  }
}
