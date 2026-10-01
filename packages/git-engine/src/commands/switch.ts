import { GitCommand, CommandContext, CommandExecutionResult } from './command.interface';

export class SwitchCommand implements GitCommand {
  public name = 'switch';
  public description = 'Switch branches';

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

    // Create and switch: git switch -c <name>
    const createFlag = (flags['c'] as string) || (flags['create'] as string);
    if (createFlag) {
      const branchName = typeof createFlag === 'string' ? createFlag : args[0];
      if (!branchName) {
        return { stdout: '', stderr: 'fatal: missing branch name', exitCode: 128 };
      }
      if (state.branches.some((b) => b.name === branchName)) {
        return {
          stdout: '',
          stderr: `fatal: a branch named '${branchName}' already exists`,
          exitCode: 128,
        };
      }

      ctx.stateManager.createBranch(branchName);
      ctx.stateManager.switchBranch(branchName);
      ctx.events.emit('branch:switched', { from: currentBranch, to: branchName });

      return {
        stdout: `Switched to a new branch '${branchName}'`,
        stderr: '',
        exitCode: 0,
      };
    }

    if (args.length === 0) {
      return {
        stdout: '',
        stderr: 'fatal: missing branch or commit argument',
        exitCode: 128,
      };
    }

    const targetBranchName = args[0];
    const wantsDetached = Boolean(flags['detach'] || flags['d']);
    if (wantsDetached) {
      const sourceTree = ctx.stateManager.getHeadTree();
      const commitHash = ctx.stateManager.resolveRef(targetBranchName);
      const commit = commitHash ? ctx.stateManager.getCommit(commitHash) : null;
      if (!commit) {
        return { stdout: '', stderr: `fatal: invalid reference: ${targetBranchName}`, exitCode: 128 };
      }

      const conflict = this.findCheckoutConflict(commit.tree, ctx);
      if (conflict) return conflict;

      state.head = { type: 'detached', ref: commit.hash };
      this.updateWorkingTree(sourceTree, commit.tree, ctx);
      ctx.stateManager.addReflog('checkout', null, commit.hash, `moving to ${commit.shortHash}`);
      return {
        stdout: `HEAD is now at ${commit.shortHash} ${commit.message}`,
        stderr: '',
        exitCode: 0,
      };
    }

    const targetBranch = ctx.stateManager.getBranch(targetBranchName);

    if (!targetBranch) {
      return {
        stdout: '',
        stderr: `fatal: invalid reference: ${targetBranchName}`,
        exitCode: 128,
      };
    }

    if (targetBranchName === currentBranch && state.head.type === 'branch') {
      return {
        stdout: `Already on '${targetBranchName}'`,
        stderr: '',
        exitCode: 0,
      };
    }

    const targetCommit = targetBranch.commitHash
      ? ctx.stateManager.getCommit(targetBranch.commitHash)
      : null;
    const targetTree = targetCommit?.tree || {};
    const conflict = this.findCheckoutConflict(targetTree, ctx);
    if (conflict) return conflict;

    const sourceTree = ctx.stateManager.getHeadTree();
    this.updateWorkingTree(sourceTree, targetTree, ctx);
    ctx.stateManager.switchBranch(targetBranchName);

    ctx.events.emit('branch:switched', { from: currentBranch, to: targetBranchName });

    return {
      stdout: `Switched to branch '${targetBranchName}'`,
      stderr: '',
      exitCode: 0,
    };
  }

  private findCheckoutConflict(
    targetTree: Record<string, string>,
    ctx: CommandContext
  ): CommandExecutionResult | null {
    const state = ctx.stateManager.getState();
    const currentTree = ctx.stateManager.getHeadTree();
    const fileStates = ctx.fs.computeFileStates(state.stagingArea, currentTree);
    const changedPaths = new Set([
      ...fileStates.stagingStates.map((item) => item.path),
      ...fileStates.modifiedUnstaged,
    ]);

    const conflicts = Array.from(changedPaths).filter((path) => {
      if (targetTree[path] === currentTree[path]) return false;
      const currentContent = ctx.fs.readFile(path);
      const targetContent = targetTree[path];
      return currentContent === null ? targetContent !== undefined : targetContent !== currentContent;
    });

    for (const path of fileStates.untrackedFiles) {
      if (path in targetTree) conflicts.push(path);
    }

    if (conflicts.length === 0) return null;
    return {
      stdout: '',
      stderr: `error: local changes would be overwritten by switching branches:\n${conflicts.map((path) => `\t${path}`).join('\n')}\nPlease commit or stash your changes before switching branches.`,
      exitCode: 1,
    };
  }

  private updateWorkingTree(
    sourceTree: Record<string, string>,
    targetTree: Record<string, string>,
    ctx: CommandContext
  ): void {
    const state = ctx.stateManager.getState();
    const fileStates = ctx.fs.computeFileStates(state.stagingArea, sourceTree);
    const preservePaths = new Set([
      ...fileStates.stagingStates.map((item) => item.path),
      ...fileStates.modifiedUnstaged,
      ...fileStates.untrackedFiles,
    ]);
    const paths = new Set([...Object.keys(sourceTree), ...Object.keys(targetTree)]);
    for (const path of paths) {
      if (preservePaths.has(path) && targetTree[path] === sourceTree[path]) continue;
      const targetContent = targetTree[path];
      if (targetContent === undefined) {
        ctx.fs.deleteFile(path);
      } else {
        ctx.fs.writeFile(path, targetContent);
      }
    }
  }
}
