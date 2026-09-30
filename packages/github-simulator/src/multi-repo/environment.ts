import { GitEngine } from '@git-academy/git-engine';
import { RemoteNetworkRegistry } from '@git-academy/git-engine';
import { GitState, RemoteRepository } from '@git-academy/shared';

export interface RepositoryConfig {
  type: 'local' | 'remote';
  url?: string;
  initialFiles?: { path: string; content: string }[];
  initialBranch?: string;
}

export class MultiRepoEnvironment {
  private localRepos: Map<string, GitEngine> = new Map();
  private remoteRepos: Map<string, RemoteRepository> = new Map();
  private net: RemoteNetworkRegistry = RemoteNetworkRegistry.getInstance();

  constructor(configs: Record<string, RepositoryConfig> = {}) {
    for (const [name, cfg] of Object.entries(configs)) {
      if (cfg.type === 'remote') {
        const repo = this.net.createRepository({
          id: name,
          name,
          url: cfg.url || `https://gitacademy.local/${name}.git`,
          defaultBranch: cfg.initialBranch || 'main',
        });
        this.remoteRepos.set(name, repo);
      } else {
        const engine = new GitEngine({
          initialFiles: cfg.initialFiles,
        });
        engine.execute('git init');
        this.localRepos.set(name, engine);
      }
    }
  }

  public getLocalRepo(name: string): GitEngine | undefined {
    return this.localRepos.get(name);
  }

  public getRemoteRepo(name: string): RemoteRepository | undefined {
    return this.remoteRepos.get(name);
  }

  public createLocalRepo(name: string, options?: { initialFiles?: { path: string; content: string }[] }): GitEngine {
    const engine = new GitEngine(options);
    engine.execute('git init');
    this.localRepos.set(name, engine);
    return engine;
  }

  public createRemoteRepo(name: string, url?: string): RemoteRepository {
    const repo = this.net.createRepository({
      id: name,
      name,
      url: url || `https://gitacademy.local/${name}.git`,
      defaultBranch: 'main',
    });
    this.remoteRepos.set(name, repo);
    return repo;
  }

  /**
   * Helper for scenarios to simulate a teammate committing and pushing to remote origin.
   */
  public teammatePush(params: {
    teammateRepoName: string;
    remoteName: string;
    branch: string;
    files: { path: string; content: string }[];
    commitMessage: string;
  }): { success: boolean; commitHash?: string } {
    let teammate = this.getLocalRepo(params.teammateRepoName);
    if (!teammate) {
      teammate = this.createLocalRepo(params.teammateRepoName);
    }

    const remoteRepo = this.getRemoteRepo(params.remoteName);
    if (!remoteRepo) {
      throw new Error(`Remote ${params.remoteName} not found.`);
    }

    teammate.execute(`git remote add origin ${remoteRepo.url}`);
    teammate.execute(`git fetch origin`);

    const remoteBranchHash = remoteRepo.branches[params.branch];
    const currentBranch = teammate.getState().currentBranch;
    const branches = teammate.getState().branches;

    if (params.branch === currentBranch) {
      if (remoteBranchHash) {
        teammate.execute(`git reset --hard origin/${params.branch}`);
      }
    } else if (branches.some((b) => b.name === params.branch)) {
      teammate.execute(`git switch ${params.branch}`);
      if (remoteBranchHash) {
        teammate.execute(`git reset --hard origin/${params.branch}`);
      }
    } else {
      teammate.execute(`git switch -c ${params.branch}`);
      if (remoteBranchHash) {
        teammate.execute(`git reset --hard origin/${params.branch}`);
      }
    }

    for (const f of params.files) {
      teammate.getFileSystem().writeFile(f.path, f.content);
      teammate.execute(`git add ${f.path}`);
    }

    const commitRes = teammate.execute(`git commit -m "${params.commitMessage}"`);
    if (!commitRes.success) return { success: false };

    const pushRes = teammate.execute(`git push origin ${params.branch}`);
    const hash = teammate.getState().commits[0]?.hash;

    return { success: pushRes.success, commitHash: hash };
  }
}
