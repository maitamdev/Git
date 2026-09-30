import { CommandContext, CommandExecutionResult, GitCommand } from './command.interface';
import {
  Commit,
  ConflictEntry,
  InteractiveRebaseAction,
  InteractiveRebaseItem,
  RebaseState,
  generateCommitHash,
  toShortHash,
} from '@git-academy/shared';

export class RebaseCommand implements GitCommand {
  public name = 'rebase';
  public description = 'Tái cấu trúc và phát lại các commit lên nhánh gốc mới';
  public usage = 'git rebase [-i] <upstream> | --continue | --abort | --skip';

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

    const currentBranch = ctx.stateManager.getCurrentBranch();
    const headCommit = ctx.stateManager.getHeadCommit();
    const currentRebase = ctx.stateManager.getRebaseState();

    // 1. Handle --abort
    if (flags['abort']) {
      if (!currentRebase || !currentRebase.inProgress) {
        return {
          stdout: '',
          stderr: 'fatal: No rebase in progress?',
          exitCode: 1,
        };
      }

      // Restore original HEAD commit and branch
      ctx.stateManager.updateHeadPointer(currentRebase.originalHeadCommit);
      const originalCommit = ctx.stateManager.getCommit(currentRebase.originalHeadCommit);
      if (originalCommit) {
        ctx.fs.clear();
        for (const [p, c] of Object.entries(originalCommit.tree)) {
          ctx.fs.writeFile(p, c);
        }
      }
      ctx.stateManager.clearStagingArea();
      ctx.stateManager.setRebaseState(null);
      ctx.stateManager.addReflog(
        'rebase',
        headCommit?.hash || null,
        currentRebase.originalHeadCommit,
        `rebase (abort): returning to ${currentRebase.originalBranch}`
      );

      return {
        stdout: '',
        stderr: '',
        exitCode: 0,
      };
    }

    // 2. Handle --skip
    if (flags['skip']) {
      if (!currentRebase || !currentRebase.inProgress) {
        return {
          stdout: '',
          stderr: 'fatal: No rebase in progress?',
          exitCode: 1,
        };
      }

      // Skip current commit, continue with remaining
      return this.continueRebase(ctx, currentRebase, true);
    }

    // 3. Handle --continue
    if (flags['continue']) {
      if (!currentRebase || !currentRebase.inProgress) {
        return {
          stdout: '',
          stderr: 'fatal: No rebase in progress?',
          exitCode: 1,
        };
      }

      // Check for unresolved conflicts
      const files = ctx.fs.listFiles();
      for (const f of files) {
        const content = ctx.fs.readFile(f) || '';
        if (content.includes('<<<<<<<') || content.includes('=======') || content.includes('>>>>>>>')) {
          return {
            stdout: '',
            stderr: `error: You still have unresolved conflicts in '${f}'.\nhint: Resolve them and use 'git add' to mark them resolved,\nhint: then run 'git rebase --continue'.`,
            exitCode: 1,
          };
        }
      }

      return this.continueRebase(ctx, currentRebase, false);
    }

    // 4. Starting a new rebase
    if (currentRebase && currentRebase.inProgress) {
      return {
        stdout: '',
        stderr: 'fatal: A rebase is already in progress. Try --continue or --abort.',
        exitCode: 1,
      };
    }

    if (args.length === 0) {
      return {
        stdout: '',
        stderr: 'fatal: No upstream branch specified.',
        exitCode: 1,
      };
    }

    const upstreamRef = args[0];
    const upstreamCommitHash = ctx.stateManager.resolveRef(upstreamRef);
    if (!upstreamCommitHash) {
      return {
        stdout: '',
        stderr: `fatal: invalid upstream '${upstreamRef}'`,
        exitCode: 128,
      };
    }

    if (!headCommit) {
      return {
        stdout: '',
        stderr: 'fatal: Current branch has no commits.',
        exitCode: 128,
      };
    }

    // Check if already up-to-date
    if (headCommit.hash === upstreamCommitHash) {
      return {
        stdout: `Current branch ${currentBranch} is up to date.`,
        stderr: '',
        exitCode: 0,
      };
    }

    // Find commits to replay: commits from common ancestor to HEAD
    const commonAncestor = ctx.stateManager.findCommonAncestor(headCommit.hash, upstreamCommitHash);
    const commitsToReplay: string[] = [];

    let curr: Commit | null = headCommit;
    while (curr && curr.hash !== (commonAncestor ? commonAncestor.hash : '')) {
      commitsToReplay.unshift(curr.hash);
      curr = curr.parents.length > 0 ? ctx.stateManager.getCommit(curr.parents[0]) : null;
    }

    if (commitsToReplay.length === 0) {
      // Fast-forward rebase
      ctx.stateManager.updateHeadPointer(upstreamCommitHash);
      const targetCommit = ctx.stateManager.getCommit(upstreamCommitHash);
      if (targetCommit) {
        ctx.fs.clear();
        for (const [p, c] of Object.entries(targetCommit.tree)) {
          ctx.fs.writeFile(p, c);
        }
      }
      return {
        stdout: `Successfully rebased and updated refs/heads/${currentBranch}.`,
        stderr: '',
        exitCode: 0,
      };
    }

    const isInteractive = Boolean(flags['i'] || flags['interactive']);
    let interactivePlan: InteractiveRebaseItem[] | undefined = undefined;

    if (isInteractive) {
      interactivePlan = commitsToReplay.map((cHash) => {
        const c = ctx.stateManager.getCommit(cHash)!;
        return {
          action: 'pick',
          commitHash: c.hash,
          shortHash: c.shortHash,
          message: c.message,
        };
      });
    }

    // Initialize rebase state
    const rebaseState: RebaseState = {
      inProgress: true,
      status: 'applying',
      upstreamBranch: upstreamRef,
      upstreamCommit: upstreamCommitHash,
      originalBranch: currentBranch,
      originalHeadCommit: headCommit.hash,
      remainingCommits: [...commitsToReplay],
      currentCommitHash: null,
      interactivePlan,
    };

    // Point HEAD temporarily to upstream commit
    ctx.stateManager.updateHeadPointer(upstreamCommitHash);
    const upstreamCommit = ctx.stateManager.getCommit(upstreamCommitHash)!;
    ctx.fs.clear();
    for (const [p, c] of Object.entries(upstreamCommit.tree)) {
      ctx.fs.writeFile(p, c);
    }

    if (isInteractive) {
      rebaseState.status = 'paused';
      ctx.stateManager.setRebaseState(rebaseState);
      const todoList = (interactivePlan || [])
        .map((p) => `${p.action} ${p.shortHash} ${p.message}`)
        .join('\n');
      return {
        stdout: `Interactive rebase in progress.\nCommands:\n  p, pick = use commit\n  r, reword = use commit, but edit the commit message\n  e, edit = use commit, but stop for amending\n  s, squash = use commit, but meld into previous commit\n  f, fixup = like "squash", but discard this commit's log message\n  d, drop = remove commit\n\nTodo list:\n${todoList}\n\nRun 'git rebase --continue' when ready.`,
        stderr: '',
        exitCode: 0,
      };
    }

    return this.continueRebase(ctx, rebaseState, false);
  }

  private continueRebase(
    ctx: CommandContext,
    rebaseState: RebaseState,
    skipped: boolean
  ): CommandExecutionResult {
    const currentBranch = rebaseState.originalBranch;
    let headCommit = ctx.stateManager.getHeadCommit();

    // If returning from a paused conflict and skipped, reset working tree to current HEAD
    if (skipped && headCommit) {
      ctx.fs.clear();
      for (const [p, c] of Object.entries(headCommit.tree)) {
        ctx.fs.writeFile(p, c);
      }
      ctx.stateManager.clearStagingArea();
    }

    // If returning from a paused conflict and not skipped, commit the resolved changes
    if (rebaseState.currentCommitHash && !skipped && rebaseState.status === 'paused') {
      const origCommit = ctx.stateManager.getCommit(rebaseState.currentCommitHash)!;
      const newTree: Record<string, string> = {};
      const files = ctx.fs.listFiles();
      for (const f of files) {
        const content = ctx.fs.readFile(f);
        if (content !== null) {
          newTree[f] = content;
        }
      }

      const author = ctx.stateManager.getAuthor();
      const timestamp = Date.now();
      const parentHashes = headCommit ? [headCommit.hash] : [];
      const treeRepresentation = Object.keys(newTree)
        .sort()
        .map((k) => `${k}:${newTree[k]}`)
        .join(';');

      const newHash = generateCommitHash(
        `${treeRepresentation}_${origCommit.message}_${parentHashes.join(',')}_${timestamp}_rebase`
      );
      const shortHash = toShortHash(newHash);

      const rebasedCommit: Commit = {
        hash: newHash,
        shortHash,
        message: origCommit.message,
        author,
        timestamp,
        parents: parentHashes,
        tree: newTree,
      };

      ctx.stateManager.addCommit(rebasedCommit, false);
      ctx.stateManager.updateHeadPointer(rebasedCommit.hash);
      headCommit = rebasedCommit;
    }

    // Now process remaining commits
    while (rebaseState.remainingCommits.length > 0) {
      const nextHash = rebaseState.remainingCommits.shift()!;
      rebaseState.currentCommitHash = nextHash;
      const targetCommit = ctx.stateManager.getCommit(nextHash)!;

      // Check plan action if interactive
      let action: InteractiveRebaseAction = 'pick';
      if (rebaseState.interactivePlan) {
        const planItem = rebaseState.interactivePlan.find((item) => item.commitHash === nextHash);
        if (planItem) {
          action = planItem.action;
        }
      }

      if (action === 'drop') {
        // Skip this commit entirely
        continue;
      }

      const parentTree: Record<string, string> =
        targetCommit.parents.length > 0
          ? ctx.stateManager.getCommit(targetCommit.parents[0])?.tree || {}
          : {};

      const currentTree = ctx.stateManager.getHeadTree();
      const newTree: Record<string, string> = { ...currentTree };

      let hasConflict = false;
      const conflicts: ConflictEntry[] = [];
      const allTouched = new Set([...Object.keys(parentTree), ...Object.keys(targetCommit.tree)]);

      for (const file of allTouched) {
        const before = parentTree[file];
        const after = targetCommit.tree[file];

        if (before !== after) {
          const currentContent = currentTree[file];
          if (after === undefined) {
            // Delete
            if (currentContent !== undefined && currentContent !== before) {
              hasConflict = true;
            } else {
              delete newTree[file];
              ctx.fs.deleteFile(file);
            }
          } else if (before === undefined) {
            // Add
            if (currentContent !== undefined && currentContent !== after) {
              hasConflict = true;
              const conflictText = `<<<<<<< HEAD\n${currentContent}\n=======\n${after}\n>>>>>>> ${targetCommit.shortHash} ${targetCommit.message}`;
              ctx.fs.writeFile(file, conflictText);
              conflicts.push({
                path: file,
                baseContent: null,
                oursContent: currentContent,
                theirsContent: after,
                status: 'unresolved',
              });
            } else {
              newTree[file] = after;
              ctx.fs.writeFile(file, after);
            }
          } else {
            // Modify
            if (currentContent !== undefined && currentContent !== before && currentContent !== after) {
              hasConflict = true;
              const conflictText = `<<<<<<< HEAD\n${currentContent}\n=======\n${after}\n>>>>>>> ${targetCommit.shortHash} ${targetCommit.message}`;
              ctx.fs.writeFile(file, conflictText);
              conflicts.push({
                path: file,
                baseContent: before,
                oursContent: currentContent,
                theirsContent: after,
                status: 'unresolved',
              });
            } else {
              newTree[file] = after;
              ctx.fs.writeFile(file, after);
            }
          }
        }
      }

      if (hasConflict) {
        rebaseState.status = 'paused';
        rebaseState.conflicts = conflicts;
        ctx.stateManager.setRebaseState(rebaseState);

        return {
          stdout: '',
          stderr: `Auto-merging files\nCONFLICT (content): Merge conflict\nerror: could not apply ${targetCommit.shortHash}... ${targetCommit.message}\nhint: Resolve all conflicts manually, mark them as resolved with\nhint: "git add/rm <conflicted_files>", then run "git rebase --continue".\nhint: You can instead skip this commit: run "git rebase --skip".\nhint: To abort and get back to the state before "git rebase", run "git rebase --abort".`,
          exitCode: 1,
        };
      }

      // No conflict: create new rebased commit
      const author = targetCommit.author;
      const timestamp = Date.now();
      const parentHashes = headCommit ? [headCommit.hash] : [];
      const treeRepresentation = Object.keys(newTree)
        .sort()
        .map((k) => `${k}:${newTree[k]}`)
        .join(';');

      if (action === 'squash' || action === 'fixup') {
        // Combine into previous commit (headCommit)
        if (headCommit) {
          const combinedTree: Record<string, string> = { ...headCommit.tree, ...newTree };
          const combinedMsg =
            action === 'squash'
              ? `${headCommit.message}\n\n${targetCommit.message}`
              : headCommit.message;

          const treeRep = Object.keys(combinedTree)
            .sort()
            .map((k) => `${k}:${combinedTree[k]}`)
            .join(';');

          const combinedHash = generateCommitHash(
            `${treeRep}_${combinedMsg}_${headCommit.parents.join(',')}_${timestamp}_rebase_squash`
          );
          const combinedShort = toShortHash(combinedHash);

          const squashedCommit: Commit = {
            hash: combinedHash,
            shortHash: combinedShort,
            message: combinedMsg,
            author,
            timestamp,
            parents: headCommit.parents,
            tree: combinedTree,
          };

          ctx.stateManager.addCommit(squashedCommit, false);
          ctx.stateManager.updateHeadPointer(squashedCommit.hash);
          headCommit = squashedCommit;
          continue;
        }
      }

      if (action === 'edit') {
        // Apply commit and pause for user editing
        const parentHashes = headCommit ? [headCommit.hash] : [];
        const treeRep = Object.keys(newTree)
          .sort()
          .map((k) => `${k}:${newTree[k]}`)
          .join(';');
        const newHash = generateCommitHash(
          `${treeRep}_${targetCommit.message}_${parentHashes.join(',')}_${timestamp}_rebase_edit`
        );
        const editCommit: Commit = {
          hash: newHash,
          shortHash: toShortHash(newHash),
          message: targetCommit.message,
          author,
          timestamp,
          parents: parentHashes,
          tree: newTree,
        };
        ctx.stateManager.addCommit(editCommit, false);
        ctx.stateManager.updateHeadPointer(editCommit.hash);

        rebaseState.status = 'paused';
        rebaseState.currentAction = 'edit';
        ctx.stateManager.setRebaseState(rebaseState);

        return {
          stdout: `Stopped at ${editCommit.shortHash}... ${editCommit.message}\nYou can amend the commit now, with\n\n  git commit --amend\n\nOnce you are satisfied with your changes, run\n\n  git rebase --continue`,
          stderr: '',
          exitCode: 0,
        };
      }

      let commitMsg = targetCommit.message;
      if (action === 'reword') {
        commitMsg = `[reworded] ${commitMsg}`;
      }

      const newHash = generateCommitHash(
        `${treeRepresentation}_${commitMsg}_${parentHashes.join(',')}_${timestamp}_rebase`
      );
      const shortHash = toShortHash(newHash);

      const newCommit: Commit = {
        hash: newHash,
        shortHash,
        message: commitMsg,
        author,
        timestamp,
        parents: parentHashes,
        tree: newTree,
      };

      ctx.stateManager.addCommit(newCommit, false);
      ctx.stateManager.updateHeadPointer(newCommit.hash);
      headCommit = newCommit;
    }

    // Rebase completed!
    const finalHead = ctx.stateManager.getHeadCommit()!;
    ctx.stateManager.setRebaseState(null);
    ctx.stateManager.addReflog(
      'rebase',
      rebaseState.originalHeadCommit,
      finalHead.hash,
      `rebase: fast-forward to ${rebaseState.upstreamBranch}`
    );

    return {
      stdout: `Successfully rebased and updated refs/heads/${currentBranch}.`,
      stderr: '',
      exitCode: 0,
    };
  }
}
