import { GitCommand, CommandContext, CommandExecutionResult } from './command.interface';
import { StashEntry } from '@git-academy/shared';

export class StashCommand implements GitCommand {
  public name = 'stash';
  public description = 'Stash the changes in a dirty working directory away';

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

    const subcommand = args[0] || 'save';
    const state = ctx.stateManager.getState();
    const currentBranch = ctx.stateManager.getCurrentBranch();
    const headCommit = ctx.stateManager.getHeadCommit();

    // 1. git stash list
    if (subcommand === 'list') {
      if (state.stash.length === 0) {
        return { stdout: '', stderr: '', exitCode: 0 };
      }
      const lines = state.stash.map((s, idx) => `stash@{${idx}}: ${s.message}`);
      return { stdout: lines.join('\n'), stderr: '', exitCode: 0 };
    }

    // 2. git stash pop
    if (subcommand === 'pop') {
      if (state.stash.length === 0) {
        return {
          stdout: '',
          stderr: 'error: No stash entries found.',
          exitCode: 1,
        };
      }

      const popped = state.stash.shift()!;

      // Restore working tree files
      for (const f of popped.workingTree) {
        ctx.fs.writeFile(f.path, f.content);
      }
      state.stagingArea = popped.stagingArea;

      ctx.events.emit('stash:applied', { entry: popped, popped: true });

      return {
        stdout: `On branch ${currentBranch}\nChanges not staged for commit:\nDropped stash@{0} (${popped.id})`,
        stderr: '',
        exitCode: 0,
      };
    }

    // 3. git stash apply
    if (subcommand === 'apply') {
      if (state.stash.length === 0) {
        return {
          stdout: '',
          stderr: 'error: No stash entries found.',
          exitCode: 1,
        };
      }

      const entry = state.stash[0];
      for (const f of entry.workingTree) {
        ctx.fs.writeFile(f.path, f.content);
      }
      state.stagingArea = entry.stagingArea;

      ctx.events.emit('stash:applied', { entry, popped: false });

      return {
        stdout: `On branch ${currentBranch}\nChanges restored from stash@{0}`,
        stderr: '',
        exitCode: 0,
      };
    }

    // 4. git stash drop
    if (subcommand === 'drop') {
      if (state.stash.length === 0) {
        return {
          stdout: '',
          stderr: 'error: No stash entries found.',
          exitCode: 1,
        };
      }

      const dropped = state.stash.shift()!;
      ctx.events.emit('stash:dropped', { entry: dropped });

      return {
        stdout: `Dropped stash@{0} (${dropped.id})`,
        stderr: '',
        exitCode: 0,
      };
    }

    // 5. Default: git stash / git stash save [message]
    const customMessage = args.slice(1).join(' ') || '';
    const fileStates = ctx.fs.computeFileStates(
      state.stagingArea,
      ctx.stateManager.getHeadTree()
    );

    if (
      fileStates.modifiedUnstaged.length === 0 &&
      fileStates.stagingStates.length === 0 &&
      fileStates.untrackedFiles.length === 0
    ) {
      return {
        stdout: 'No local changes to save',
        stderr: '',
        exitCode: 0,
      };
    }

    const currentHeadStr = headCommit ? `${headCommit.shortHash} ${headCommit.message}` : 'initial';
    const stashMsg = customMessage
      ? `On ${currentBranch}: ${customMessage}`
      : `WIP on ${currentBranch}: ${currentHeadStr}`;

    const newEntry: StashEntry = {
      id: `stash-${Date.now()}`,
      message: stashMsg,
      timestamp: Date.now(),
      workingTree: fileStates.workingTreeStates.map((f) => ({
        path: f.path,
        content: f.content,
        status: f.status,
      })),
      stagingArea: [...state.stagingArea],
      branch: currentBranch,
    };

    state.stash.unshift(newEntry);

    // Revert working tree to match HEAD
    if (headCommit) {
      ctx.fs.clear();
      for (const [path, content] of Object.entries(headCommit.tree)) {
        ctx.fs.writeFile(path, content);
      }
    } else {
      ctx.fs.clear();
    }
    state.stagingArea = [];

    ctx.events.emit('stash:created', newEntry);

    return {
      stdout: `Saved working directory and index state ${stashMsg}`,
      stderr: '',
      exitCode: 0,
    };
  }
}
