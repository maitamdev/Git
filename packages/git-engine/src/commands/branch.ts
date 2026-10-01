import { GitCommand, CommandContext, CommandExecutionResult } from './command.interface';

export class BranchCommand implements GitCommand {
  public name = 'branch';
  public description = 'List, create, rename, track, or delete branches';

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

    if (flags['unset-upstream']) {
      const branchName = args[0] || currentBranch;
      ctx.stateManager.unsetConfig(`branch.${branchName}.remote`);
      ctx.stateManager.unsetConfig(`branch.${branchName}.merge`);
      return { stdout: `Unset upstream for branch '${branchName}'.`, stderr: '', exitCode: 0 };
    }

    const upstreamRef = flags['u'] || flags['set-upstream-to'];
    if (upstreamRef) {
      const ref = args[0] || (typeof upstreamRef === 'string' ? upstreamRef : '');
      const branchName = args[1] || currentBranch;
      const slashIndex = ref.indexOf('/');
      if (slashIndex <= 0 || slashIndex === ref.length - 1) {
        return { stdout: '', stderr: 'fatal: upstream must be in the form <remote>/<branch>', exitCode: 128 };
      }
      const remoteName = ref.slice(0, slashIndex);
      const remoteBranchName = ref.slice(slashIndex + 1);
      if (!ctx.stateManager.getRemote(remoteName)) {
        return { stdout: '', stderr: `fatal: remote '${remoteName}' does not exist`, exitCode: 128 };
      }
      ctx.stateManager.setConfig(`branch.${branchName}.remote`, remoteName);
      ctx.stateManager.setConfig(`branch.${branchName}.merge`, `refs/heads/${remoteBranchName}`);
      return { stdout: `branch '${branchName}' set up to track '${ref}'.`, stderr: '', exitCode: 0 };
    }

    // Rename branch: git branch -m <new-name> | <old-name> <new-name>
    const renameFlag = flags['m'] || flags['move'];
    if (renameFlag) {
      const oldName = args.length > 0 ? String(renameFlag) : currentBranch;
      const newName = args.length > 0 ? args[0] : String(renameFlag);
      const branch = state.branches.find((item) => item.name === oldName);
      if (!branch) {
        return { stdout: '', stderr: `error: branch '${oldName}' not found.`, exitCode: 1 };
      }
      if (state.branches.some((item) => item.name === newName)) {
        return { stdout: '', stderr: `fatal: a branch named '${newName}' already exists.`, exitCode: 128 };
      }
      if (!newName || newName.startsWith('-')) {
        return { stdout: '', stderr: 'fatal: a branch name is required.', exitCode: 128 };
      }

      branch.name = newName;
      if (state.head.type === 'branch' && state.head.ref === oldName) {
        state.head.ref = newName;
        state.currentBranch = newName;
      }
      return { stdout: `Renamed branch ${oldName} to ${newName}.`, stderr: '', exitCode: 0 };
    }

    // Safe deletion: git branch -d <name> only deletes merged work.
    const deleteTarget = flags['d'] || flags['delete'];
    if (deleteTarget) {
      const targetName = args[0] || (typeof deleteTarget === 'string' ? deleteTarget : '');
      if (!targetName) {
        return { stdout: '', stderr: 'fatal: branch name required', exitCode: 128 };
      }
      if (targetName === currentBranch) {
        return {
          stdout: '',
          stderr: `error: Cannot delete branch '${targetName}' checked out at '/project'`,
          exitCode: 1,
        };
      }
      const index = state.branches.findIndex((b) => b.name === targetName);
      if (index === -1) {
        return {
          stdout: '',
          stderr: `error: branch '${targetName}' not found.`,
          exitCode: 1,
        };
      }
      const branchToDelete = state.branches[index];
      const currentHead = ctx.stateManager.getHeadCommit();
      if (
        branchToDelete.commitHash &&
        (!currentHead || !ctx.stateManager.isAncestor(branchToDelete.commitHash, currentHead.hash))
      ) {
        return {
          stdout: '',
          stderr: `error: the branch '${targetName}' is not fully merged.\nIf you are sure you want to delete it, run 'git branch -D ${targetName}'.`,
          exitCode: 1,
        };
      }
      const deleted = state.branches.splice(index, 1)[0];
      ctx.events.emit('branch:deleted', { name: targetName });
      return {
        stdout: `Deleted branch ${targetName} (was ${deleted.commitHash ? deleted.commitHash.slice(0, 7) : 'empty'}).`,
        stderr: '',
        exitCode: 0,
      };
    }

    // Create branch: git branch <name>
    if (args.length > 0) {
      const newBranchName = args[0];
      if (state.branches.some((b) => b.name === newBranchName)) {
        return {
          stdout: '',
          stderr: `fatal: A branch named '${newBranchName}' already exists.`,
          exitCode: 128,
        };
      }

      const branch = ctx.stateManager.createBranch(newBranchName);
      ctx.events.emit('branch:created', branch);
      return {
        stdout: '',
        stderr: '',
        exitCode: 0,
      };
    }

    // List branches, including remote-tracking refs and upstream details when requested.
    const remoteBranches = ctx.stateManager.getRemoteTrackingBranches();
    const includeAll = Boolean(flags['a'] || flags['all']);
    const remoteOnly = Boolean(flags['r'] || flags['remotes']);
    const verbose = Boolean(flags['v'] || flags['verbose']);
    const localLines = remoteOnly ? [] : state.branches.map((branch) => {
      const marker = branch.name === currentBranch && state.head.type === 'branch' ? '*' : ' ';
      const shortHash = branch.commitHash
        ? ctx.stateManager.getCommit(branch.commitHash)?.shortHash || branch.commitHash.slice(0, 7)
        : '(no commit)';
      const upstream = this.getUpstream(branch.name, ctx);
      const upstreamLabel = upstream
        ? ` [${upstream.ref}${verbose ? this.getAheadBehind(branch.commitHash, upstream.hash, ctx) : ''}]`
        : '';
      return verbose
        ? `${marker} ${branch.name.padEnd(24)} ${shortHash}${upstreamLabel}`
        : `${marker} ${branch.name}`;
    });
    const remoteLines = includeAll || remoteOnly
      ? Object.entries(remoteBranches)
          .filter(([, hash]) => Boolean(hash))
          .map(([ref, hash]) => {
            const shortHash = hash ? ctx.stateManager.getCommit(hash)?.shortHash || hash.slice(0, 7) : '';
            return verbose ? `  remotes/${ref.padEnd(20)} ${shortHash}` : `  remotes/${ref}`;
          })
      : [];
    const lines = [...localLines, ...remoteLines];

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
    if (!remoteName || !mergeRef) return null;
    const match = mergeRef.match(/^refs\/heads\/(.+)$/);
    if (!match) return null;
    const ref = `${remoteName}/${match[1]}`;
    return { ref, hash: ctx.stateManager.getRemoteTrackingBranches()[ref] || null };
  }

  private getAheadBehind(
    localHash: string | null,
    upstreamHash: string | null,
    ctx: CommandContext
  ): string {
    if (!localHash || !upstreamHash) return '';
    const localAncestors = ctx.stateManager.getAncestors(localHash);
    const upstreamAncestors = ctx.stateManager.getAncestors(upstreamHash);
    let ahead = 0;
    let behind = 0;
    for (const hash of localAncestors) if (!upstreamAncestors.has(hash)) ahead++;
    for (const hash of upstreamAncestors) if (!localAncestors.has(hash)) behind++;
    if (ahead && behind) return `: ahead ${ahead}, behind ${behind}`;
    if (ahead) return `: ahead ${ahead}`;
    if (behind) return `: behind ${behind}`;
    return '';
  }
}
