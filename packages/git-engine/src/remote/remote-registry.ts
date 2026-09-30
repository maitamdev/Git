import { Commit, RemoteRepository } from '@git-academy/shared';

/**
 * Simulated Remote Server for Git Academy.
 * Keeps an in-memory network of remote repositories.
 * No host network or shell execution.
 */
export class RemoteNetworkRegistry {
  private static instance: RemoteNetworkRegistry;
  private repositories: Map<string, RemoteRepository> = new Map();

  public static getInstance(): RemoteNetworkRegistry {
    if (!RemoteNetworkRegistry.instance) {
      RemoteNetworkRegistry.instance = new RemoteNetworkRegistry();
    }
    return RemoteNetworkRegistry.instance;
  }

  public register(repo: RemoteRepository): void {
    this.repositories.set(repo.url, repo);
    this.repositories.set(repo.id, repo);
    this.repositories.set(repo.name, repo);
  }

  public get(urlOrId: string): RemoteRepository | undefined {
    return this.repositories.get(urlOrId);
  }

  public has(urlOrId: string): boolean {
    return this.repositories.has(urlOrId);
  }

  public remove(urlOrId: string): boolean {
    const repo = this.get(urlOrId);
    if (!repo) return false;
    this.repositories.delete(repo.url);
    this.repositories.delete(repo.id);
    this.repositories.delete(repo.name);
    return true;
  }

  public clear(): void {
    this.repositories.clear();
  }

  public createRepository(options: {
    id: string;
    name: string;
    url?: string;
    defaultBranch?: string;
    branches?: Record<string, string | null>;
    commits?: Record<string, Commit>;
  }): RemoteRepository {
    const defaultBranch = options.defaultBranch || 'main';
    const url = options.url || `https://gitacademy.local/${options.name}.git`;
    const repo: RemoteRepository = {
      id: options.id,
      name: options.name,
      url,
      defaultBranch,
      branches: options.branches || { [defaultBranch]: null },
      commits: options.commits || {},
    };
    this.register(repo);
    return repo;
  }
}
