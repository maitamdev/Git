import { GitCommand, CommandContext, CommandExecutionResult } from './command.interface';
import { Commit } from '@git-academy/shared';
import { RemoteNetworkRegistry } from '../remote/remote-registry';

export class FetchCommand implements GitCommand {
  public name = 'fetch';
  public syntax = 'git fetch [<remote>] [<branch>]';
  public description = 'Download objects and refs from another repository';
  public category: 'Remote' = 'Remote';

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

    const remoteName = args[0] || 'origin';
    const remoteRef = ctx.stateManager.getRemote(remoteName);

    if (!remoteRef) {
      return {
        stdout: '',
        stderr: `fatal: '${remoteName}' does not appear to be a git repository\nfatal: Could not read from remote repository.`,
        exitCode: 128,
      };
    }

    const net = RemoteNetworkRegistry.getInstance();
    const remoteRepo = net.get(remoteRef.url) || net.get(remoteRef.name) || net.get(remoteName);

    if (!remoteRepo) {
      return {
        stdout: '',
        stderr: `fatal: unable to access '${remoteRef.url}': Could not resolve host.`,
        exitCode: 128,
      };
    }

    // Copy missing commits into local commit storage without advancing local branch
    const commitsList = Object.values(remoteRepo.commits) as Commit[];
    for (const commit of commitsList) {
      if (!ctx.stateManager.getCommit(commit.hash)) {
        ctx.stateManager.storeCommit(commit);
      }
    }

    // Update remote tracking branches (e.g. origin/main)
    const updatedTracking: string[] = [];
    for (const [branchName, commitHash] of Object.entries(remoteRepo.branches)) {
      if (commitHash) {
        const trackingRef = `${remoteName}/${branchName}`;
        ctx.stateManager.setRemoteTrackingBranch(trackingRef, String(commitHash));
        updatedTracking.push(` * [new branch]      ${branchName} -> ${trackingRef}`);
      }
    }

    ctx.events.emit('remote:fetched' as any, {
      remote: remoteName,
      branches: remoteRepo.branches,
    });

    const lines = [
      `From ${remoteRef.url}`,
      ...updatedTracking,
    ];

    return {
      stdout: lines.join('\n'),
      stderr: '',
      exitCode: 0,
    };
  }
}
