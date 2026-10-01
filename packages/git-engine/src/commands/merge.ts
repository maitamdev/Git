import { GitCommand, CommandContext, CommandExecutionResult } from './command.interface';
import {
  Commit,
  ConflictEntry,
  DEFAULT_AUTHOR,
  generateCommitHash,
  toShortHash,
} from '@git-academy/shared';

export class MergeCommand implements GitCommand {
  public name = 'merge';
  public description = 'Join two or more development histories together';

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

    // 1. Handle --abort
    if (flags['abort']) {
      const activeMerge = ctx.stateManager.getMergeState();
      if (!activeMerge || !activeMerge.inProgress) {
        return {
          stdout: '',
          stderr: 'fatal: There is no merge to abort (MERGE_HEAD missing).',
          exitCode: 128,
        };
      }

      // Restore working tree to pre-merge HEAD commit
      const preMergeCommit = ctx.stateManager.getCommit(activeMerge.targetCommitHash);
      if (preMergeCommit) {
        ctx.fs.clear();
        for (const [path, content] of Object.entries(preMergeCommit.tree)) {
          ctx.fs.writeFile(path, content);
        }
      }

      ctx.stateManager.clearStagingArea();
      ctx.stateManager.setMergeState(null);
      ctx.events.emit('merge:aborted', { branch: currentBranch });

      return {
        stdout: '',
        stderr: '',
        exitCode: 0,
      };
    }

    if (args.length === 0) {
      return {
        stdout: '',
        stderr: 'fatal: No commit specified and merge.default not set.',
        exitCode: 128,
      };
    }

    const targetBranchName = args[0];
    let targetCommitHash: string | null = null;
    const targetBranch = ctx.stateManager.getBranch(targetBranchName);
    if (targetBranch && targetBranch.commitHash) {
      targetCommitHash = targetBranch.commitHash;
    } else {
      const tracking = ctx.stateManager.getRemoteTrackingBranches();
      if (tracking[targetBranchName]) {
        targetCommitHash = tracking[targetBranchName];
      } else {
        const directCommit = ctx.stateManager.getCommit(targetBranchName);
        if (directCommit) {
          targetCommitHash = directCommit.hash;
        }
      }
    }

    if (!targetCommitHash) {
      return {
        stdout: '',
        stderr: `merge: ${targetBranchName} - not something we can merge`,
        exitCode: 1,
      };
    }

    const targetCommit = ctx.stateManager.getCommit(targetCommitHash);
    if (!targetCommit) {
      return {
        stdout: '',
        stderr: `fatal: commit ${targetCommitHash} not found`,
        exitCode: 1,
      };
    }

    const currentHead = ctx.stateManager.getHeadCommit();
    if (!currentHead) {
      // Fast-forward unborn branch to target commit
      ctx.stateManager.updateHeadPointer(targetCommit.hash);
      ctx.fs.clear();
      for (const [path, content] of Object.entries(targetCommit.tree)) {
        ctx.fs.writeFile(path, content);
      }
      ctx.stateManager.clearStagingArea();
      ctx.events.emit('merge:completed', {
        type: 'fast-forward',
        targetBranch: targetBranchName,
        commit: targetCommit,
      });
      return {
        stdout: `Updating\nFast-forward\n`,
        stderr: '',
        exitCode: 0,
      };
    }

    // Merging same branch / commit
    if (currentHead.hash === targetCommit.hash) {
      return {
        stdout: 'Already up to date.',
        stderr: '',
        exitCode: 0,
      };
    }

    const canFastForward = ctx.stateManager.isAncestor(currentHead.hash, targetCommit.hash);
    const targetIsAlreadyIncluded = ctx.stateManager.isAncestor(targetCommit.hash, currentHead.hash);
    if (targetIsAlreadyIncluded) {
      return { stdout: 'Already up to date.', stderr: '', exitCode: 0 };
    }

    if (flags['ff-only'] && !canFastForward) {
      return {
        stdout: '',
        stderr: 'fatal: Not possible to fast-forward, aborting.',
        exitCode: 1,
      };
    }

    ctx.events.emit('merge:started', {
      source: targetBranchName,
      target: currentBranch,
    });

    // 2. Check Fast-Forward: is currentHead an ancestor of targetCommit?
    if (canFastForward && !flags['no-ff']) {
      ctx.stateManager.updateHeadPointer(targetCommit.hash);

      // Update working directory to match targetCommit
      ctx.fs.clear();
      for (const [path, content] of Object.entries(targetCommit.tree)) {
        ctx.fs.writeFile(path, content);
      }

      ctx.events.emit('merge:completed', {
        type: 'fast-forward',
        branch: currentBranch,
        commit: targetCommit,
      });

      return {
        stdout: `Updating ${currentHead.shortHash}..${targetCommit.shortHash}\nFast-forward\n ${Object.keys(targetCommit.tree).length} files changed`,
        stderr: '',
        exitCode: 0,
      };
    }

    // 3. Three-way merge
    const baseCommit = ctx.stateManager.findCommonAncestor(currentHead.hash, targetCommit.hash);
    const baseTree = baseCommit ? baseCommit.tree : {};
    const oursTree = currentHead.tree;
    const theirsTree = targetCommit.tree;

    const allKeys = new Set<string>([
      ...Object.keys(baseTree),
      ...Object.keys(oursTree),
      ...Object.keys(theirsTree),
    ]);

    const mergedTree: Record<string, string> = {};
    const conflicts: ConflictEntry[] = [];

    for (const path of Array.from(allKeys).sort()) {
      const baseVal = baseTree[path];
      const oursVal = oursTree[path];
      const theirsVal = theirsTree[path];

      if (oursVal === theirsVal) {
        // Both kept identical or made same changes
        if (oursVal !== undefined) {
          mergedTree[path] = oursVal;
        }
      } else if (oursVal === baseVal) {
        // Only theirs changed it
        if (theirsVal !== undefined) {
          mergedTree[path] = theirsVal;
        }
      } else if (theirsVal === baseVal) {
        // Only ours changed it
        if (oursVal !== undefined) {
          mergedTree[path] = oursVal;
        }
      } else {
        // Conflict! Both changed differently from base
        conflicts.push({
          path,
          baseContent: baseVal || null,
          oursContent: oursVal || null,
          theirsContent: theirsVal || null,
          status: 'unresolved',
        });

        // Generate standard conflict markers
        const conflictMarker = [
          '<<<<<<< HEAD',
          oursVal !== undefined ? oursVal : '',
          '=======',
          theirsVal !== undefined ? theirsVal : '',
          `>>>>>>> ${targetBranchName}`,
        ].join('\n');

        mergedTree[path] = conflictMarker;
        ctx.fs.writeFile(path, conflictMarker);
      }
    }

    // 4. If Conflicts Exist
    if (conflicts.length > 0) {
      ctx.stateManager.setMergeState({
        inProgress: true,
        sourceBranch: targetBranchName,
        targetBranch: currentBranch,
        sourceCommitHash: targetCommit.hash,
        targetCommitHash: currentHead.hash,
        conflicts,
      });

      // Update non-conflicting files in working directory as well
      for (const [path, content] of Object.entries(mergedTree)) {
        if (!conflicts.some((c) => c.path === path)) {
          ctx.fs.writeFile(path, content);
        }
      }

      ctx.events.emit('merge:conflict', {
        conflicts,
        sourceBranch: targetBranchName,
      });

      const conflictLines = conflicts
        .map(
          (c) =>
            `Auto-merging ${c.path}\nCONFLICT (content): Merge conflict in ${c.path}`
        )
        .join('\n');

      return {
        stdout: `${conflictLines}\nAutomatic merge failed; fix conflicts and then commit the result.`,
        stderr: '',
        exitCode: 1,
      };
    }

    // 5. Successful Clean Three-way Merge
    // Update filesystem
    ctx.fs.clear();
    for (const [path, content] of Object.entries(mergedTree)) {
      ctx.fs.writeFile(path, content);
    }

    // Create merge commit with TWO parents (DAG)
    const mergeMessage =
      (flags['m'] as string) || `Merge branch '${targetBranchName}' into ${currentBranch}`;
    const timestamp = Date.now();
    const treeRep = Object.keys(mergedTree)
      .sort()
      .map((k) => `${k}:${mergedTree[k]}`)
      .join(';');

    const hash = generateCommitHash(
      `${treeRep}_${mergeMessage}_${currentHead.hash},${targetCommit.hash}_${timestamp}`
    );
    const shortHash = toShortHash(hash);

    const mergeCommit: Commit = {
      hash,
      shortHash,
      message: mergeMessage,
      author: DEFAULT_AUTHOR,
      timestamp,
      parents: [currentHead.hash, targetCommit.hash], // Two parents!
      tree: mergedTree,
    };

    ctx.stateManager.addCommit(mergeCommit);
    ctx.stateManager.clearStagingArea();
    ctx.stateManager.setMergeState(null);

    ctx.events.emit('merge:completed', {
      type: 'three-way',
      branch: currentBranch,
      commit: mergeCommit,
    });

    return {
      stdout: `Merge made by the 'ort' strategy.\n [${currentBranch} ${shortHash}] ${mergeMessage}`,
      stderr: '',
      exitCode: 0,
    };
  }
}
