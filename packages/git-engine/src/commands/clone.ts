import { GitCommand, CommandContext, CommandExecutionResult } from './command.interface';
import { Commit } from '@git-academy/shared';
import { RemoteNetworkRegistry } from '../remote/remote-registry';
import { createInitialGitState } from '../state/git-state';

export class CloneCommand implements GitCommand {
  public name = 'clone';
  public syntax = 'git clone <repository> [<directory>]';
  public description = 'Clone a repository into a new directory';
  public category: 'Remote' = 'Remote';

  public execute(
    args: string[],
    flags: Record<string, string | boolean>,
    ctx: CommandContext
  ): CommandExecutionResult {
    if (args.length === 0) {
      return {
        stdout: '',
        stderr: 'fatal: You must specify a repository to clone.',
        exitCode: 129,
      };
    }

    const url = args[0];
    const net = RemoteNetworkRegistry.getInstance();
    let remoteRepo = net.get(url);

    // If not found, attempt extracting repo name or fallback
    if (!remoteRepo) {
      const match = url.match(/\/([^/]+?)(?:\.git)?$/);
      const name = match ? match[1] : 'remote-repo';
      remoteRepo = net.createRepository({
        id: name,
        name,
        url,
        defaultBranch: 'main',
      });
    }

    const defaultBranch = remoteRepo.defaultBranch || 'main';
    const remoteHeadHash = remoteRepo.branches[defaultBranch] || null;

    // 1. Initialize local repository
    const newState = createInitialGitState(true, defaultBranch);
    ctx.stateManager.setState(newState);

    // 2. Set origin remote
    ctx.stateManager.addRemote('origin', remoteRepo.url);

    // 3. Copy commits from remote
    const commitsList = Object.values(remoteRepo.commits) as Commit[];
    for (const commit of commitsList) {
      ctx.stateManager.addCommit(commit);
    }

    // 4. Create tracking branch origin/defaultBranch and local branch
    if (remoteHeadHash) {
      ctx.stateManager.setRemoteTrackingBranch(`origin/${defaultBranch}`, remoteHeadHash);

      const localBranch = ctx.stateManager.getBranch(defaultBranch);
      if (localBranch) {
        localBranch.commitHash = remoteHeadHash;
      } else {
        ctx.stateManager.createBranch(defaultBranch, remoteHeadHash);
      }

      ctx.stateManager.updateHeadPointer(remoteHeadHash);

      // 5. Populate working tree from HEAD commit
      const headCommit = ctx.stateManager.getCommit(remoteHeadHash);
      if (headCommit) {
        ctx.fs.clear();
        for (const [filePath, content] of Object.entries(headCommit.tree)) {
          ctx.fs.writeFile(filePath, content);
        }
      }
    }

    const repoName = remoteRepo.name || 'repository';
    const stdout = [
      `Cloning into '${repoName}'...`,
      'remote: Enumerating objects: done.',
      'remote: Counting objects: 100%, done.',
      'remote: Total objects: done.',
      'Receiving objects: 100%, done.',
    ].join('\n');

    ctx.events.emit('remote:cloned' as any, {
      url,
      repositoryId: remoteRepo.id,
      branch: defaultBranch,
    });

    return {
      stdout,
      stderr: '',
      exitCode: 0,
    };
  }
}
