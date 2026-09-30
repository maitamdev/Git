import { CommandContext, CommandExecutionResult, GitCommand } from './command.interface';
import {
  Commit,
  generateCommitHash,
  toShortHash,
} from '@git-academy/shared';

export class CherryPickCommand implements GitCommand {
  public name = 'cherry-pick';
  public description = 'Áp dụng thay đổi từ một commit có sẵn lên nhánh hiện tại';
  public usage = 'git cherry-pick <commit>';

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
        stderr: 'fatal: no commit specified to cherry-pick',
        exitCode: 1,
      };
    }

    const commitRef = args[0];
    const targetCommit = ctx.stateManager.getCommit(commitRef);
    if (!targetCommit) {
      return {
        stdout: '',
        stderr: `fatal: bad revision '${commitRef}'`,
        exitCode: 128,
      };
    }

    const headCommit = ctx.stateManager.getHeadCommit();
    if (!headCommit) {
      return {
        stdout: '',
        stderr: 'fatal: cannot cherry-pick on an unborn branch',
        exitCode: 128,
      };
    }

    // Step 2: Get diff between target commit's parent and target commit
    const parentTree: Record<string, string> =
      targetCommit.parents.length > 0
        ? ctx.stateManager.getCommit(targetCommit.parents[0])?.tree || {}
        : {};

    const targetTree = targetCommit.tree;
    const currentHeadTree = ctx.stateManager.getHeadTree();
    const newTree: Record<string, string> = { ...currentHeadTree };

    let hasConflict = false;
    const conflictingFiles: string[] = [];

    // Check all files touched in target commit
    const allTouchedKeys = new Set([...Object.keys(parentTree), ...Object.keys(targetTree)]);

    for (const file of allTouchedKeys) {
      const before = parentTree[file];
      const after = targetTree[file];

      if (before !== after) {
        // File was modified, added, or deleted in target commit
        const currentContent = currentHeadTree[file];

        if (after === undefined) {
          // File was deleted in target commit
          if (currentContent !== undefined && currentContent !== before) {
            // Conflict
            hasConflict = true;
            conflictingFiles.push(file);
          } else {
            delete newTree[file];
            ctx.fs.deleteFile(file);
          }
        } else if (before === undefined) {
          // File was newly added in target commit
          if (currentContent !== undefined && currentContent !== after) {
            // Conflict
            hasConflict = true;
            conflictingFiles.push(file);
            const conflictContent = `<<<<<<< HEAD\n${currentContent}\n=======\n${after}\n>>>>>>> ${targetCommit.shortHash} ${targetCommit.message}`;
            ctx.fs.writeFile(file, conflictContent);
          } else {
            newTree[file] = after;
            ctx.fs.writeFile(file, after);
          }
        } else {
          // File was modified in target commit
          if (currentContent !== undefined && currentContent !== before && currentContent !== after) {
            // Conflict
            hasConflict = true;
            conflictingFiles.push(file);
            const conflictContent = `<<<<<<< HEAD\n${currentContent}\n=======\n${after}\n>>>>>>> ${targetCommit.shortHash} ${targetCommit.message}`;
            ctx.fs.writeFile(file, conflictContent);
          } else {
            newTree[file] = after;
            ctx.fs.writeFile(file, after);
          }
        }
      }
    }

    if (hasConflict) {
      return {
        stdout: '',
        stderr: `error: could not apply ${targetCommit.shortHash}... ${targetCommit.message}\nhint: after resolving the conflicts, mark the corrected paths\nhint: with 'git add <paths>' or 'git rm <paths>'\nhint: and commit the result.`,
        exitCode: 1,
      };
    }

    // Step 5: Create NEW commit with different hash!
    const author = ctx.stateManager.getAuthor();
    const timestamp = Date.now();
    const parentHashes = [headCommit.hash];

    const treeRepresentation = Object.keys(newTree)
      .sort()
      .map((k) => `${k}:${newTree[k]}`)
      .join(';');

    const newHash = generateCommitHash(
      `${treeRepresentation}_${targetCommit.message}_${parentHashes.join(',')}_${timestamp}_cherry_pick`
    );
    const shortHash = toShortHash(newHash);

    const newCommit: Commit = {
      hash: newHash,
      shortHash,
      message: targetCommit.message,
      author,
      timestamp,
      parents: parentHashes,
      tree: newTree,
    };

    ctx.stateManager.addCommit(newCommit);
    ctx.stateManager.addReflog(
      'cherry-pick',
      headCommit.hash,
      newCommit.hash,
      `cherry-pick: ${newCommit.message}`
    );

    const currentBranch = ctx.stateManager.getCurrentBranch();
    return {
      stdout: `[${currentBranch} ${shortHash}] ${newCommit.message}`,
      stderr: '',
      exitCode: 0,
    };
  }
}
