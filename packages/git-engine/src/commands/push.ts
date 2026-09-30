import { GitCommand, CommandContext, CommandExecutionResult } from './command.interface';
import { RemoteNetworkRegistry } from '../remote/remote-registry';

export class PushCommand implements GitCommand {
  public name = 'push';
  public syntax = 'git push [-u | --set-upstream] [<remote>] [<branch>]';
  public description = 'Update remote refs along with associated objects';
  public category: 'Remote' = 'Remote';
  public options = [
    { flag: '-u, --set-upstream', description: 'Set upstream tracking branch' },
  ];

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
    const remoteName = args[0] || ctx.stateManager.getConfig(`branch.${currentBranch}.remote`) || 'origin';
    const targetBranch = args[1] || currentBranch;

    const remoteRef = ctx.stateManager.getRemote(remoteName);
    if (!remoteRef) {
      return {
        stdout: '',
        stderr: `fatal: '${remoteName}' does not appear to be a git repository\nfatal: Could not read from remote repository.`,
        exitCode: 128,
      };
    }

    const localBranch = ctx.stateManager.getBranch(targetBranch);
    if (!localBranch || !localBranch.commitHash) {
      return {
        stdout: '',
        stderr: `error: src refspec ${targetBranch} does not match any\nerror: failed to push some refs to '${remoteRef.url}'`,
        exitCode: 1,
      };
    }

    const net = RemoteNetworkRegistry.getInstance();
    let remoteRepo = net.get(remoteRef.url) || net.get(remoteRef.name) || net.get(remoteName);

    if (!remoteRepo) {
      remoteRepo = net.createRepository({
        id: remoteName,
        name: remoteName,
        url: remoteRef.url,
        defaultBranch: targetBranch,
      });
    }

    const localCommitHash = localBranch.commitHash;
    const remoteCommitHash = remoteRepo.branches[targetBranch];

    // Branch Protection Rules Check (Part 14)
    const protectionRules = remoteRepo.branchProtectionRules || [];
    const matchedRule = protectionRules.find(
      (r) => r.branchPattern === targetBranch || r.branchPattern === '*'
    );

    if (matchedRule) {
      if (matchedRule.requirePullRequest) {
        return {
          stdout: [
            `To ${remoteRef.url}`,
            ` ! [remote rejected] ${targetBranch} -> ${targetBranch} (protected branch hook declined)`,
            `error: failed to push some refs to '${remoteRef.url}'`,
            `remote: error: GH006: Protected branch update failed for refs/heads/${targetBranch}.`,
            `remote: error: direct pushes to protected branch '${targetBranch}' are not allowed.`,
          ].join('\n'),
          stderr: `remote rejected: direct pushes to protected branch '${targetBranch}' are not allowed`,
          exitCode: 1,
        };
      }

      if ((flags['f'] || flags['force']) && matchedRule.blockForcePush) {
        return {
          stdout: `To ${remoteRef.url}\n ! [remote rejected] ${targetBranch} -> ${targetBranch} (force push declined)`,
          stderr: `remote rejected: force pushing to protected branch '${targetBranch}' is disabled`,
          exitCode: 1,
        };
      }
    }

    // Non-fast-forward check: if remote has a commit that is not an ancestor of localCommitHash
    if (remoteCommitHash && remoteCommitHash !== localCommitHash) {
      const isFastForward = ctx.stateManager.isAncestor(remoteCommitHash, localCommitHash);
      if (!isFastForward) {
        return {
          stdout: [
            `To ${remoteRef.url}`,
            ` ! [rejected]        ${targetBranch} -> ${targetBranch} (non-fast-forward)`,
            `error: failed to push some refs to '${remoteRef.url}'`,
            `hint: Updates were rejected because the remote contains work that you do`,
            `hint: not have locally. This is usually caused by another repository pushing`,
            `hint: to the same ref. You may want to first integrate the remote changes`,
            `hint: (e.g., 'git pull ...') before pushing again.`,
          ].join('\n'),
          stderr: '',
          exitCode: 1,
        };
      }
    }

    // Copy all commits reachable from local branch to remote repository
    const localCommits = ctx.stateManager.getAllCommits();
    for (const c of localCommits) {
      remoteRepo.commits[c.hash] = c;
    }

    // Update remote branch pointer
    remoteRepo.branches[targetBranch] = localCommitHash;

    // Update local remote tracking branch
    const trackingRef = `${remoteName}/${targetBranch}`;
    ctx.stateManager.setRemoteTrackingBranch(trackingRef, localCommitHash);

    // Set upstream tracking if requested
    if (flags['u'] || flags['set-upstream']) {
      ctx.stateManager.setConfig(`branch.${targetBranch}.remote`, remoteName);
      ctx.stateManager.setConfig(`branch.${targetBranch}.merge`, `refs/heads/${targetBranch}`);
    }

    ctx.events.emit('remote:pushed' as any, {
      remote: remoteName,
      branch: targetBranch,
      commitHash: localCommitHash,
    });

    const isNew = !remoteCommitHash;
    const range = isNew ? `[new branch]` : `${remoteCommitHash.slice(0, 7)}..${localCommitHash.slice(0, 7)}`;
    const upstreamNote = flags['u'] || flags['set-upstream']
      ? `\nbranch '${targetBranch}' set up to track '${remoteName}/${targetBranch}'.`
      : '';

    const stdout = [
      `To ${remoteRef.url}`,
      ` * ${range.padEnd(16)} ${targetBranch} -> ${targetBranch}${upstreamNote}`,
    ].join('\n');

    return {
      stdout,
      stderr: '',
      exitCode: 0,
    };
  }
}
