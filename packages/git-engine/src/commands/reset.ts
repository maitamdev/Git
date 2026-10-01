import { GitCommand, CommandContext, CommandExecutionResult } from './command.interface';

export class ResetCommand implements GitCommand {
  public name = 'reset';
  public description = 'Reset current HEAD to the specified state';

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

    const mode = flags['hard'] ? 'hard' : flags['soft'] ? 'soft' : 'mixed';

    // Target commit or current HEAD
    const targetRef = args.find((a) => !a.startsWith('-')) || 'HEAD';
    const state = ctx.stateManager.getState();
    const currentHead = ctx.stateManager.getHeadCommit();

    if (!currentHead && targetRef === 'HEAD') {
      return {
        stdout: '',
        stderr: 'fatal: ambiguous argument \'HEAD\': unknown revision or path not in the working tree.',
        exitCode: 128,
      };
    }

    let targetCommit = currentHead!;
    if (targetRef !== 'HEAD') {
      const found = ctx.stateManager.getCommit(targetRef);
      if (!found) {
        // Maybe a branch name or remote tracking branch?
        const branch = ctx.stateManager.getBranch(targetRef);
        const remoteTracking = ctx.stateManager.getRemoteTrackingBranches();
        const trackingHash = remoteTracking[targetRef];
        const candidate = (branch && branch.commitHash ? ctx.stateManager.getCommit(branch.commitHash) : null)
          || (trackingHash ? ctx.stateManager.getCommit(trackingHash) : null)
          || currentHead;

        if (!candidate) {
          return {
            stdout: '',
            stderr: `fatal: ambiguous argument '${targetRef}': unknown revision or path not in the working tree.`,
            exitCode: 128,
          };
        }
        targetCommit = candidate;
      } else {
        targetCommit = found;
      }
    }

    // 1. Move branch/HEAD pointer to target commit
    ctx.stateManager.updateHeadPointer(targetCommit.hash);

    if (currentHead) {
      ctx.stateManager.addReflog(
        'reset',
        currentHead.hash,
        targetCommit.hash,
        `reset: moving to ${targetRef}`
      );
    }

    // 2. Apply Mode
    if (mode === 'hard') {
      // Discard staged and unstaged changes to tracked paths, while keeping
      // unrelated untracked files just like real `git reset --hard` does.
      const pathsToRestore = new Set([
        ...Object.keys(currentHead?.tree || {}),
        ...Object.keys(targetCommit.tree),
        ...state.stagingArea.map((entry) => entry.path),
      ]);
      ctx.stateManager.clearStagingArea();
      for (const path of pathsToRestore) {
        ctx.fs.deleteFile(path);
      }
      for (const [path, content] of Object.entries(targetCommit.tree)) {
        ctx.fs.writeFile(path, content);
      }
    } else if (mode === 'mixed') {
      // Clear staging area (changes remain in working tree)
      ctx.stateManager.clearStagingArea();
    } else if (mode === 'soft') {
      // Stage difference between target commit and previous HEAD
      const diffTree = currentHead ? currentHead.tree : {};
      const targetTree = targetCommit.tree;

      for (const [path, content] of Object.entries(diffTree)) {
        if (targetTree[path] !== content) {
          state.stagingArea.push({
            path,
            content,
            status: targetTree[path] === undefined ? 'added' : 'modified',
            staged: true,
          });
        }
      }
    }

    ctx.events.emit('reset:completed', {
      mode,
      targetCommit,
    });

    return {
      stdout: `HEAD is now at ${targetCommit.shortHash} ${targetCommit.message}`,
      stderr: '',
      exitCode: 0,
    };
  }
}
