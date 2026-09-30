import { GitCommand, CommandContext, CommandExecutionResult } from './command.interface';
import {
  Commit,
  DEFAULT_AUTHOR,
  generateCommitHash,
  toShortHash,
} from '@git-academy/shared';

export class RevertCommand implements GitCommand {
  public name = 'revert';
  public description = 'Revert some existing commits';

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

    if (args.length === 0) {
      return {
        stdout: '',
        stderr: 'fatal: commit-ish argument required',
        exitCode: 128,
      };
    }

    const targetRef = args[0];
    const targetCommit = ctx.stateManager.getCommit(targetRef);

    if (!targetCommit) {
      return {
        stdout: '',
        stderr: `fatal: bad revision '${targetRef}'`,
        exitCode: 128,
      };
    }

    const currentHead = ctx.stateManager.getHeadCommit();
    if (!currentHead) {
      return {
        stdout: '',
        stderr: 'fatal: no commits to revert against',
        exitCode: 128,
      };
    }

    // Get parent tree of targetCommit
    const parentCommit =
      targetCommit.parents.length > 0 ? ctx.stateManager.getCommit(targetCommit.parents[0]) : null;
    const parentTree = parentCommit ? parentCommit.tree : {};

    // Revert tree: start with currentHead tree, invert changes introduced in targetCommit
    const newTree = { ...currentHead.tree };
    for (const path of Object.keys(targetCommit.tree)) {
      if (path in parentTree) {
        newTree[path] = parentTree[path];
      } else {
        delete newTree[path];
      }
    }

    const revertMessage = `Revert "${targetCommit.message}"`;
    const timestamp = Date.now();
    const treeRep = Object.keys(newTree)
      .sort()
      .map((k) => `${k}:${newTree[k]}`)
      .join(';');

    const hash = generateCommitHash(`${treeRep}_${revertMessage}_${currentHead.hash}_${timestamp}`);
    const shortHash = toShortHash(hash);

    const revertCommit: Commit = {
      hash,
      shortHash,
      message: revertMessage,
      author: DEFAULT_AUTHOR,
      timestamp,
      parents: [currentHead.hash],
      tree: newTree,
    };

    ctx.stateManager.addCommit(revertCommit);

    // Update working directory
    ctx.fs.clear();
    for (const [path, content] of Object.entries(newTree)) {
      ctx.fs.writeFile(path, content);
    }

    ctx.events.emit('commit:reverted', {
      originalCommit: targetCommit,
      revertCommit,
    });

    const currentBranch = ctx.stateManager.getCurrentBranch();
    return {
      stdout: `[${currentBranch} ${shortHash}] ${revertMessage}\n 1 commit reverted`,
      stderr: '',
      exitCode: 0,
    };
  }
}
