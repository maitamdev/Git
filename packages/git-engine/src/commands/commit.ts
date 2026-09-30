import { GitCommand, CommandContext, CommandExecutionResult } from './command.interface';
import {
  Commit,
  DEFAULT_AUTHOR,
  generateCommitHash,
  toShortHash,
} from '@git-academy/shared';

export class CommitCommand implements GitCommand {
  public name = 'commit';
  public description = 'Record changes to the repository';

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
    const activeMerge = ctx.stateManager.getMergeState();

    // Check if there is an in-progress merge with unmerged conflicts
    if (activeMerge && activeMerge.inProgress) {
      for (const conflict of activeMerge.conflicts) {
        const fileContent = ctx.fs.readFile(conflict.path) || '';
        if (
          fileContent.includes('<<<<<<<') ||
          fileContent.includes('=======') ||
          fileContent.includes('>>>>>>>')
        ) {
          return {
            stdout: '',
            stderr: `error: Committing is not possible because you have unmerged files.\nhint: Fix them up in the work tree, and then use 'git add/rm <file>'\nhint: as appropriate to mark resolution and make a commit.\nfatal: Exiting because of an unresolved conflict.`,
            exitCode: 1,
          };
        }
      }
    }

    // Auto-stage modified files if -a or -am is passed
    if (flags['a'] || flags['all']) {
      const fileStates = ctx.fs.computeFileStates(state.stagingArea, headTree);
      for (const path of fileStates.modifiedUnstaged) {
        const content = ctx.fs.readFile(path) || '';
        const existingIndex = state.stagingArea.findIndex((f) => f.path === path);
        if (existingIndex >= 0) {
          state.stagingArea[existingIndex] = { path, content, status: 'modified', staged: true };
        } else {
          state.stagingArea.push({ path, content, status: 'modified', staged: true });
        }
      }
    }

    if (typeof flags['m'] === 'boolean' || typeof flags['message'] === 'boolean') {
      return {
        stdout: '',
        stderr: 'error: switch `m\' requires a value\nAborting commit due to empty commit message.',
        exitCode: 1,
      };
    }

    const isAmend = Boolean(flags['amend']);
    if (isAmend && !headCommit) {
      return {
        stdout: '',
        stderr: 'fatal: You have nothing to amend.',
        exitCode: 128,
      };
    }

    let message =
      (typeof flags['m'] === 'string' ? flags['m'] : undefined) ||
      (typeof flags['message'] === 'string' ? flags['message'] : undefined);

    if (isAmend && !message && headCommit) {
      message = headCommit.message;
    }

    // If active merge and no message supplied, use default merge message
    if (!message && activeMerge && activeMerge.inProgress) {
      message = `Merge branch '${activeMerge.sourceBranch}' into ${currentBranch}`;
    }

    if (!message || message.trim() === '') {
      return {
        stdout: '',
        stderr: 'error: switch `m\' requires a value\nAborting commit due to empty commit message.',
        exitCode: 1,
      };
    }

    // Check staging area
    if (state.stagingArea.length === 0 && !isAmend) {
      const fileStates = ctx.fs.computeFileStates(state.stagingArea, headTree);
      if (fileStates.modifiedUnstaged.length > 0 || fileStates.untrackedFiles.length > 0) {
        return {
          stdout: 'no changes added to commit (use "git add")',
          stderr: '',
          exitCode: 1,
        };
      }
      return {
        stdout: 'nothing to commit, working tree clean',
        stderr: '',
        exitCode: 1,
      };
    }

    // Build new tree: merge headTree with staging area
    const newTree: Record<string, string> = { ...headTree };
    const changedFiles = state.stagingArea.length;
    for (const staged of state.stagingArea) {
      if (staged.status === 'deleted') {
        delete newTree[staged.path];
      } else {
        newTree[staged.path] = staged.content;
      }
    }

    const isRootCommit = !headCommit && !isAmend;
    let parentHashes: string[] = [];

    if (isAmend && headCommit) {
      parentHashes = [...headCommit.parents];
    } else if (activeMerge && activeMerge.inProgress) {
      // Merge commit has TWO parents
      parentHashes = [headCommit?.hash || '', activeMerge.sourceCommitHash].filter(Boolean);
      ctx.stateManager.setMergeState(null);
    } else if (headCommit) {
      parentHashes = [headCommit.hash];
    }

    const timestamp = Date.now();

    const author = ctx.stateManager.getAuthor();
    const treeRepresentation = Object.keys(newTree)
      .sort()
      .map((k) => `${k}:${newTree[k]}`)
      .join(';');

    const hash = generateCommitHash(
      `${treeRepresentation}_${message}_${parentHashes.join(',')}_${timestamp}_${author.name}_${author.email}`
    );
    const shortHash = toShortHash(hash);

    const commit: Commit = {
      hash,
      shortHash,
      message,
      author,
      timestamp,
      parents: parentHashes,
      tree: newTree,
    };

    if (isAmend && headCommit) {
      ctx.stateManager.addCommit(commit, false);
      ctx.stateManager.updateHeadPointer(commit.hash);
      ctx.stateManager.addReflog('amend', headCommit.hash, commit.hash, `commit (amend): ${commit.message}`);
    } else {
      ctx.stateManager.addCommit(commit);
    }

    ctx.stateManager.clearStagingArea();

    ctx.events.emit('commit:created', commit);

    if (parentHashes.length > 1) {
      ctx.events.emit('merge:completed', {
        type: 'three-way-conflict-resolved',
        branch: currentBranch,
        commit,
      });
    }

    const rootTag = isRootCommit ? ' (root-commit)' : isAmend ? ' (amend)' : '';
    const fileLabel = changedFiles === 1 ? '1 file changed' : `${changedFiles} files changed`;
    const stdout = `[${currentBranch}${rootTag} ${shortHash}] ${message}\n ${fileLabel}`;

    return {
      stdout,
      stderr: '',
      exitCode: 0,
    };
  }
}
