import { GitCommand, CommandContext, CommandExecutionResult } from './command.interface';

export class StatusCommand implements GitCommand {
  public name = 'status';
  public description = 'Show the working tree status';

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
    const currentBranch = ctx.stateManager.getCurrentBranch();
    const headCommit = ctx.stateManager.getHeadCommit();
    const headTree = ctx.stateManager.getHeadTree();

    const fileStates = ctx.fs.computeFileStates(state.stagingArea, headTree);

    // Update state working tree and staging area with latest computed states
    state.workingTree = fileStates.workingTreeStates;

    if (flags['s'] || flags['short']) {
      const shortLines: string[] = [];
      for (const item of fileStates.stagingStates) {
        const code = item.status === 'added' ? 'A ' : 'M ';
        shortLines.push(`${code} ${item.path}`);
      }
      for (const path of fileStates.modifiedUnstaged) {
        shortLines.push(` M ${path}`);
      }
      for (const path of fileStates.untrackedFiles) {
        shortLines.push(`?? ${path}`);
      }
      return {
        stdout: shortLines.join('\n'),
        stderr: '',
        exitCode: 0,
      };
    }

    const lines: string[] = [];
    lines.push(`On branch ${currentBranch}`);

    if (!headCommit) {
      lines.push('');
      lines.push('No commits yet');
    }

    // Staged changes
    if (fileStates.stagingStates.length > 0) {
      lines.push('');
      lines.push('Changes to be committed:');
      lines.push('  (use "git restore --staged <file>..." to unstage)');
      for (const item of fileStates.stagingStates) {
        const prefix = item.status === 'added' ? 'new file:   ' : 'modified:   ';
        lines.push(`\t\x1b[32m${prefix}${item.path}\x1b[0m`);
      }
    }

    // Unstaged changes (modified files)
    if (fileStates.modifiedUnstaged.length > 0) {
      lines.push('');
      lines.push('Changes not staged for commit:');
      lines.push('  (use "git add <file>..." to update what will be committed)');
      lines.push('  (use "git restore <file>..." to discard changes in working directory)');
      for (const path of fileStates.modifiedUnstaged) {
        lines.push(`\t\x1b[31mmodified:   ${path}\x1b[0m`);
      }
    }

    // Untracked files
    if (fileStates.untrackedFiles.length > 0) {
      lines.push('');
      lines.push('Untracked files:');
      lines.push('  (use "git add <file>..." to include in what will be committed)');
      for (const path of fileStates.untrackedFiles) {
        lines.push(`\t\x1b[31m${path}\x1b[0m`);
      }
    }

    if (
      fileStates.stagingStates.length === 0 &&
      fileStates.modifiedUnstaged.length === 0 &&
      fileStates.untrackedFiles.length === 0
    ) {
      lines.push('');
      lines.push('nothing to commit, working tree clean');
    } else if (fileStates.stagingStates.length === 0) {
      lines.push('');
      if (fileStates.untrackedFiles.length > 0 && fileStates.modifiedUnstaged.length === 0) {
        lines.push('nothing added to commit but untracked files present (use "git add" to track)');
      } else {
        lines.push('no changes added to commit (use "git add")');
      }
    }

    return {
      stdout: lines.join('\n'),
      stderr: '',
      exitCode: 0,
    };
  }
}
