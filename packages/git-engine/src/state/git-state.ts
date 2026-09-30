import {
  GitState,
  Branch,
  Commit,
  MergeState,
  DEFAULT_BRANCH,
  DEFAULT_AUTHOR,
} from '@git-academy/shared';

export function createInitialGitState(initialized = false, defaultBranch = DEFAULT_BRANCH): GitState {
  return {
    repositoryInitialized: initialized,
    currentBranch: defaultBranch,
    head: {
      type: 'branch',
      ref: defaultBranch,
    },
    workingTree: [],
    stagingArea: [],
    branches: initialized
      ? [
          {
            name: defaultBranch,
            commitHash: null,
          },
        ]
      : [],
    commits: [],
    remotes: [],
    remoteTrackingBranches: {},
    tags: [],
    reflog: [],
    stash: [],
    merge: null,
    config: {
      'user.name': DEFAULT_AUTHOR.name,
      'user.email': DEFAULT_AUTHOR.email,
    },
  };
}

export class GitStateManager {
  private state: GitState;

  constructor(initialState?: GitState) {
    this.state = initialState ? JSON.parse(JSON.stringify(initialState)) : createInitialGitState();
  }

  public getState(): GitState {
    return this.state;
  }

  public setState(newState: GitState): void {
    this.state = JSON.parse(JSON.stringify(newState));
  }

  public isInitialized(): boolean {
    return this.state.repositoryInitialized;
  }

  public getCurrentBranch(): string {
    return this.state.currentBranch;
  }

  public getBranches(): Branch[] {
    return this.state.branches;
  }

  public getBranch(name: string): Branch | undefined {
    return this.state.branches.find((b) => b.name === name);
  }

  public getHeadCommit(): Commit | null {
    let commitHash: string | null = null;
    if (this.state.head.type === 'branch') {
      const branch = this.getBranch(this.state.head.ref);
      commitHash = branch ? branch.commitHash : null;
    } else {
      commitHash = this.state.head.ref;
    }

    if (!commitHash) return null;
    return this.getCommit(commitHash);
  }

  public getHeadTree(): Record<string, string> {
    const headCommit = this.getHeadCommit();
    return headCommit ? { ...headCommit.tree } : {};
  }

  public resolveRef(ref: string): string | null {
    if (!ref) return null;
    if (ref === 'HEAD') {
      const head = this.getHeadCommit();
      return head ? head.hash : null;
    }
    const tildeMatch = ref.match(/^HEAD~(\d+)$/);
    if (tildeMatch) {
      const steps = parseInt(tildeMatch[1], 10);
      let curr = this.getHeadCommit();
      for (let i = 0; i < steps; i++) {
        if (!curr || curr.parents.length === 0) return null;
        curr = this.getCommit(curr.parents[0]);
      }
      return curr ? curr.hash : null;
    }
    const reflogMatch = ref.match(/^(?:HEAD)?@\{(\d+)\}$/);
    if (reflogMatch) {
      const idx = parseInt(reflogMatch[1], 10);
      const entry = this.state.reflog.find((r) => r.index === idx) || this.state.reflog[idx];
      if (entry && (entry.newHash || entry.toHash)) {
        return entry.newHash || entry.toHash || null;
      }
      return null;
    }
    // Check branch
    const branch = this.getBranch(ref);
    if (branch && branch.commitHash) {
      return branch.commitHash;
    }
    // Check tag
    const tag = this.getTag(ref);
    if (tag && tag.commitHash) {
      return tag.commitHash;
    }
    // Check commit hash directly
    const commit = this.state.commits.find(
      (c) => c.hash === ref || c.shortHash === ref || c.hash.startsWith(ref)
    );
    return commit ? commit.hash : null;
  }

  public getCommit(hash: string): Commit | null {
    if (!hash) return null;
    const resolved = this.resolveRef(hash);
    if (resolved) {
      return this.state.commits.find((c) => c.hash === resolved) || null;
    }
    const direct = this.state.commits.find(
      (c) => c.hash === hash || c.shortHash === hash || c.hash.startsWith(hash)
    );
    return direct || null;
  }

  public getAllCommits(): Commit[] {
    return [...this.state.commits];
  }

  public addCommit(commit: Commit, advanceBranch = true): void {
    this.state.commits.push(commit);

    if (advanceBranch) {
      // Update branch pointer
      if (this.state.head.type === 'branch') {
        const branch = this.getBranch(this.state.head.ref);
        if (branch) {
          branch.commitHash = commit.hash;
        } else {
          this.state.branches.push({
            name: this.state.head.ref,
            commitHash: commit.hash,
          });
        }
      } else {
        // Detached head
        this.state.head.ref = commit.hash;
      }

      // Record reflog
      this.addReflog(
        'commit',
        commit.parents.length > 0 ? commit.parents[0] : null,
        commit.hash,
        `commit: ${commit.message}`
      );
    }
  }

  public storeCommit(commit: Commit): void {
    this.addCommit(commit, false);
  }

  public addReflog(
    action: string,
    fromHash: string | null,
    toHash: string | null,
    message: string,
    ref = 'HEAD'
  ): void {
    const entry: any = {
      index: 0,
      id: `reflog-${this.state.reflog.length + 1}`,
      oldHash: fromHash,
      newHash: toHash,
      ref,
      action,
      message,
      timestamp: Date.now(),
      fromHash,
      toHash: toHash || '',
    };
    this.state.reflog.unshift(entry);
    this.state.reflog.forEach((e, idx) => {
      e.index = idx;
    });
  }

  public createBranch(name: string, startCommitHash?: string | null): Branch {
    const currentHead = this.getHeadCommit();
    const commitHash =
      startCommitHash !== undefined ? startCommitHash : currentHead ? currentHead.hash : null;

    const newBranch: Branch = {
      name,
      commitHash,
    };
    this.state.branches.push(newBranch);
    return newBranch;
  }

  public switchBranch(name: string): void {
    this.state.currentBranch = name;
    this.state.head = {
      type: 'branch',
      ref: name,
    };
    const targetBranch = this.getBranch(name);
    const targetHash = targetBranch?.commitHash || '0000000';
    this.addReflog('checkout', null, targetHash, `moving from ${this.state.currentBranch} to ${name}`);
  }

  public setStagingArea(files: { path: string; content: string }[]): void {
    this.state.stagingArea = files.map((f) => ({
      path: f.path,
      content: f.content,
      status: 'added',
      staged: true,
    }));
  }

  public clearStagingArea(): void {
    this.state.stagingArea = [];
  }

  public setMergeState(merge: MergeState | null): void {
    this.state.merge = merge;
  }

  public getMergeState(): MergeState | null {
    return this.state.merge || null;
  }

  /**
   * Returns all ancestor commit hashes of a given commit in topological order.
   */
  public getAncestors(commitHash: string): Set<string> {
    const ancestors = new Set<string>();
    const queue = [commitHash];

    while (queue.length > 0) {
      const curr = queue.shift()!;
      if (!ancestors.has(curr)) {
        ancestors.add(curr);
        const commit = this.getCommit(curr);
        if (commit) {
          for (const p of commit.parents) {
            queue.push(p);
          }
        }
      }
    }

    return ancestors;
  }

  /**
   * Checks if candidateAncestor is an ancestor of targetCommit.
   */
  public isAncestor(candidateAncestor: string, targetCommit: string): boolean {
    const ancestors = this.getAncestors(targetCommit);
    return ancestors.has(candidateAncestor);
  }

  /**
   * Finds lowest common ancestor of two commits in the DAG.
   */
  public findCommonAncestor(hashA: string, hashB: string): Commit | null {
    if (hashA === hashB) return this.getCommit(hashA);

    const ancestorsA = this.getAncestors(hashA);
    const queueB = [hashB];
    const visitedB = new Set<string>();

    while (queueB.length > 0) {
      const curr = queueB.shift()!;
      if (visitedB.has(curr)) continue;
      visitedB.add(curr);

      if (ancestorsA.has(curr)) {
        return this.getCommit(curr);
      }

      const commit = this.getCommit(curr);
      if (commit) {
        for (const p of commit.parents) {
          queueB.push(p);
        }
      }
    }

    return null;
  }

  /**
   * Updates branch pointer or detached head to target commit.
   */
  public updateHeadPointer(targetCommitHash: string): void {
    if (this.state.head.type === 'branch') {
      const branch = this.getBranch(this.state.head.ref);
      if (branch) {
        branch.commitHash = targetCommitHash;
      }
    } else {
      this.state.head.ref = targetCommitHash;
    }
  }

  // --- Configuration Management ---
  public getConfig(key: string): string | undefined {
    return this.state.config ? this.state.config[key] : undefined;
  }

  public setConfig(key: string, value: string): void {
    if (!this.state.config) {
      this.state.config = {};
    }
    this.state.config[key] = value;
  }

  public getAllConfig(): Record<string, string> {
    return { ...(this.state.config || {}) };
  }

  public getAuthor(): { name: string; email: string } {
    return {
      name: this.getConfig('user.name') || DEFAULT_AUTHOR.name,
      email: this.getConfig('user.email') || DEFAULT_AUTHOR.email,
    };
  }

  public getAliases(): Record<string, string> {
    const aliases: Record<string, string> = {};
    const prefix = 'alias.';
    const all = this.getAllConfig();
    for (const [k, v] of Object.entries(all)) {
      if (k.startsWith(prefix)) {
        aliases[k.slice(prefix.length)] = v;
      }
    }
    return aliases;
  }

  // --- Remote Management ---
  public getRemote(name: string) {
    return this.state.remotes.find((r) => r.name === name);
  }

  public addRemote(name: string, url: string): void {
    if (this.getRemote(name)) {
      throw new Error(`fatal: remote ${name} already exists.`);
    }
    this.state.remotes.push({
      name,
      url,
      branches: {},
    });
  }

  public removeRemote(name: string): boolean {
    const idx = this.state.remotes.findIndex((r) => r.name === name);
    if (idx >= 0) {
      this.state.remotes.splice(idx, 1);
      // Clean up remote tracking branches
      if (this.state.remoteTrackingBranches) {
        for (const k of Object.keys(this.state.remoteTrackingBranches)) {
          if (k.startsWith(`${name}/`)) {
            delete this.state.remoteTrackingBranches[k];
          }
        }
      }
      return true;
    }
    return false;
  }

  public renameRemote(oldName: string, newName: string): boolean {
    const remote = this.getRemote(oldName);
    if (!remote) return false;
    if (this.getRemote(newName)) {
      throw new Error(`fatal: remote ${newName} already exists.`);
    }
    remote.name = newName;
    if (this.state.remoteTrackingBranches) {
      const nextTracking: Record<string, string | null> = {};
      for (const [k, v] of Object.entries(this.state.remoteTrackingBranches)) {
        if (k.startsWith(`${oldName}/`)) {
          const newKey = `${newName}/${k.slice(oldName.length + 1)}`;
          nextTracking[newKey] = v;
        } else {
          nextTracking[k] = v;
        }
      }
      this.state.remoteTrackingBranches = nextTracking;
    }
    return true;
  }

  public getRemoteTrackingBranches(): Record<string, string | null> {
    return { ...(this.state.remoteTrackingBranches || {}) };
  }

  public setRemoteTrackingBranch(branchRef: string, commitHash: string | null): void {
    if (!this.state.remoteTrackingBranches) {
      this.state.remoteTrackingBranches = {};
    }
    this.state.remoteTrackingBranches[branchRef] = commitHash;
  }

  // --- Tag Management ---
  public getTags(): import('@git-academy/shared').Tag[] {
    return [...(this.state.tags || [])];
  }

  public getTag(name: string): import('@git-academy/shared').Tag | undefined {
    return (this.state.tags || []).find((t) => t.name === name);
  }

  public createTag(
    name: string,
    commitHash: string,
    message?: string,
    annotated = false
  ): import('@git-academy/shared').Tag {
    if (!this.state.tags) {
      this.state.tags = [];
    }
    if (this.getTag(name)) {
      throw new Error(`fatal: tag '${name}' already exists`);
    }
    const author = this.getAuthor();
    const tag: import('@git-academy/shared').Tag = {
      name,
      commitHash,
      message: message || undefined,
      annotated,
      tagger: annotated ? author : undefined,
      timestamp: Date.now(),
    };
    this.state.tags.push(tag);
    return tag;
  }

  public deleteTag(name: string): boolean {
    if (!this.state.tags) return false;
    const idx = this.state.tags.findIndex((t) => t.name === name);
    if (idx >= 0) {
      this.state.tags.splice(idx, 1);
      return true;
    }
    return false;
  }

  // --- Rebase State Management ---
  public getRebaseState(): import('@git-academy/shared').RebaseState | null {
    return this.state.rebase || null;
  }

  public setRebaseState(rebase: import('@git-academy/shared').RebaseState | null): void {
    this.state.rebase = rebase;
  }

  // --- Bisect State Management ---
  public getBisectState(): import('@git-academy/shared').BisectState | null {
    return this.state.bisect || null;
  }

  public setBisectState(bisect: import('@git-academy/shared').BisectState | null): void {
    this.state.bisect = bisect;
  }

  // --- Worktree Management ---
  public getWorktrees(): import('@git-academy/shared').WorktreeEntry[] {
    return [...(this.state.worktrees || [])];
  }

  public addWorktree(
    worktreePath: string,
    branch: string,
    commitHash: string
  ): import('@git-academy/shared').WorktreeEntry {
    if (!this.state.worktrees) {
      this.state.worktrees = [];
    }
    if (this.state.worktrees.some((w) => w.path === worktreePath)) {
      throw new Error(`fatal: '${worktreePath}' already exists`);
    }
    const entry: import('@git-academy/shared').WorktreeEntry = {
      path: worktreePath,
      branch,
      commitHash,
    };
    this.state.worktrees.push(entry);
    return entry;
  }

  public removeWorktree(worktreePath: string): boolean {
    if (!this.state.worktrees) return false;
    const idx = this.state.worktrees.findIndex((w) => w.path === worktreePath);
    if (idx >= 0) {
      this.state.worktrees.splice(idx, 1);
      return true;
    }
    return false;
  }
}
