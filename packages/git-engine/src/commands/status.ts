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
    const mergeState = ctx.stateManager.getMergeState();
    const unresolvedPaths = mergeState?.conflicts
      .filter((conflict) => conflict.status === 'unresolved')
      .map((conflict) => conflict.path) || [];

    const fileStates = ctx.fs.computeFileStates(state.stagingArea, headTree, unresolvedPaths);
    const untrackedFiles = fileStates.untrackedFiles.filter((path) => !ctx.fs.getIgnoreRule(path));

    // Update state working tree and staging area with latest computed states
    state.workingTree = fileStates.workingTreeStates;

    if (flags['s'] || flags['short']) {
      const shortLines: string[] = [];
      for (const item of fileStates.stagingStates) {
        const code = item.status === 'added' ? 'A ' : 'M ';
        shortLines.push(`${code} ${item.path}`);
      }
      for (const path of unresolvedPaths) shortLines.push(`UU ${path}`);
      for (const path of fileStates.modifiedUnstaged) {
        shortLines.push(` M ${path}`);
      }
      for (const path of untrackedFiles) {
        shortLines.push(`?? ${path}`);
      }
      return {
        stdout: shortLines.join('\n'),
        stderr: '',
        exitCode: 0,
      };
    }

    const lines: string[] = [];
    if (state.head.type === 'detached') {
      const detachedAt = headCommit?.shortHash || state.head.ref.slice(0, 7);
      lines.push(`HEAD detached at ${detachedAt}`);
    } else {
      lines.push(`On branch ${currentBranch}`);
      const upstream = this.getUpstream(currentBranch, ctx);
      if (upstream?.hash && headCommit) {
        const [ahead, behind] = this.getAheadBehind(headCommit.hash, upstream.hash, ctx);
        if (ahead === 0 && behind === 0) {
          lines.push(`Your branch is up to date with '${upstream.ref}'.`);
        } else if (ahead > 0 && behind > 0) {
          lines.push(`Your branch and '${upstream.ref}' have diverged, and have ${ahead} and ${behind} different commits each, respectively.`);
        } else if (ahead > 0) {
          lines.push(`Your branch is ahead of '${upstream.ref}' by ${ahead} commit${ahead === 1 ? '' : 's'}.`);
        } else {
          lines.push(`Your branch is behind '${upstream.ref}' by ${behind} commit${behind === 1 ? '' : 's'}, and can be fast-forwarded.`);
        }
        lines.push('(use "git fetch" to update the remote-tracking branch)');
      }
    }

    if (unresolvedPaths.length > 0) {
      lines.push('');
      lines.push('You have unmerged paths.');
      lines.push('  (fix conflicts and run "git add <file>")');
      for (const path of unresolvedPaths) lines.push(`\t\x1b[31mboth modified:   ${path}\x1b[0m`);
    } else if (mergeState?.inProgress) {
      lines.push('');
      lines.push('All conflicts fixed but you are still merging.');
      lines.push('  (use "git commit" to conclude merge)');
    }

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
    if (untrackedFiles.length > 0) {
      lines.push('');
      lines.push('Untracked files:');
      lines.push('  (use "git add <file>..." to include in what will be committed)');
      for (const path of untrackedFiles) {
        lines.push(`\t\x1b[31m${path}\x1b[0m`);
      }
    }

    if (
      fileStates.stagingStates.length === 0 &&
      fileStates.modifiedUnstaged.length === 0 &&
      untrackedFiles.length === 0 &&
      !mergeState?.inProgress
    ) {
      lines.push('');
      lines.push('nothing to commit, working tree clean');
    } else if (fileStates.stagingStates.length === 0) {
      lines.push('');
      if (untrackedFiles.length > 0 && fileStates.modifiedUnstaged.length === 0) {
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

  private getUpstream(
    branchName: string,
    ctx: CommandContext
  ): { ref: string; hash: string | null } | null {
    const remoteName = ctx.stateManager.getConfig(`branch.${branchName}.remote`);
    const mergeRef = ctx.stateManager.getConfig(`branch.${branchName}.merge`);
    const match = mergeRef?.match(/^refs\/heads\/(.+)$/);
    if (!remoteName || !match) return null;
    const ref = `${remoteName}/${match[1]}`;
    return { ref, hash: ctx.stateManager.getRemoteTrackingBranches()[ref] || null };
  }

  private getAheadBehind(
    localHash: string,
    upstreamHash: string,
    ctx: CommandContext
  ): [number, number] {
    const localAncestors = ctx.stateManager.getAncestors(localHash);
    const upstreamAncestors = ctx.stateManager.getAncestors(upstreamHash);
    let ahead = 0;
    let behind = 0;
    for (const hash of localAncestors) if (!upstreamAncestors.has(hash)) ahead++;
    for (const hash of upstreamAncestors) if (!localAncestors.has(hash)) behind++;
    return [ahead, behind];
  }
}
