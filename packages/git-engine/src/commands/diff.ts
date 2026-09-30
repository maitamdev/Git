import { GitCommand, CommandContext, CommandExecutionResult } from './command.interface';

export class DiffCommand implements GitCommand {
  public name = 'diff';
  public description = 'Show changes between commits, commit and working tree, etc';

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

    const isStaged = Boolean(flags['staged'] || flags['cached']);
    const headTree = ctx.stateManager.getHeadTree();
    const stagingMap = new Map<string, string>();
    for (const item of ctx.stateManager.getState().stagingArea) {
      stagingMap.set(item.path, item.content);
    }

    const workingFiles = ctx.fs.getAllFiles();
    const workingMap = new Map<string, string>();
    for (const wf of workingFiles) {
      workingMap.set(wf.path, wf.content);
    }

    const diffOutputs: string[] = [];

    if (isStaged) {
      // Compare Staging Area against HEAD Tree
      for (const [path, stagedContent] of stagingMap.entries()) {
        const headContent = headTree[path];
        if (headContent === undefined) {
          // New file
          diffOutputs.push(this.formatDiff(path, '', stagedContent, true, false));
        } else if (headContent !== stagedContent) {
          // Modified
          diffOutputs.push(this.formatDiff(path, headContent, stagedContent, false, false));
        }
      }
    } else {
      // Compare Working Tree against Staging Area (or HEAD if not staged)
      for (const [path, workingContent] of workingMap.entries()) {
        const stagedContent = stagingMap.get(path);
        const baseContent = stagedContent !== undefined ? stagedContent : headTree[path];

        if (baseContent !== undefined && baseContent !== workingContent) {
          diffOutputs.push(this.formatDiff(path, baseContent, workingContent, false, false));
        }
      }
    }

    return {
      stdout: diffOutputs.join('\n\n'),
      stderr: '',
      exitCode: 0,
    };
  }

  private formatDiff(
    path: string,
    oldContent: string,
    newContent: string,
    isNewFile: boolean,
    isDeleted: boolean
  ): string {
    const lines: string[] = [];
    lines.push(`diff --git a/${path} b/${path}`);
    if (isNewFile) {
      lines.push('new file mode 100644');
      lines.push('--- /dev/null');
      lines.push(`+++ b/${path}`);
    } else if (isDeleted) {
      lines.push('deleted file mode 100644');
      lines.push(`--- a/${path}`);
      lines.push('+++ /dev/null');
    } else {
      lines.push(`--- a/${path}`);
      lines.push(`+++ b/${path}`);
    }

    const oldLines = oldContent ? oldContent.split('\n') : [];
    const newLines = newContent ? newContent.split('\n') : [];

    lines.push(`@@ -1,${Math.max(1, oldLines.length)} +1,${Math.max(1, newLines.length)} @@`);

    for (const oldLine of oldLines) {
      if (!newLines.includes(oldLine)) {
        lines.push(`\x1b[31m-${oldLine}\x1b[0m`);
      }
    }

    for (const newLine of newLines) {
      if (!oldLines.includes(newLine)) {
        lines.push(`\x1b[32m+${newLine}\x1b[0m`);
      }
    }

    return lines.join('\n');
  }
}
