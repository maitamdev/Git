import {
  GitHubRepository,
  PullRequest,
  Issue,
  Review,
  ReviewDecision,
  PRFileDiff,
} from './types';
import { SimulatorEventEmitter } from './events/simulator-events';
import { RemoteNetworkRegistry } from '@git-academy/git-engine';
import { Commit, DEFAULT_AUTHOR } from '@git-academy/shared';
import { findReviewersForFiles } from './workflow/codeowners';

export function matchesBranchPattern(pattern: string, branch: string): boolean {
  if (pattern === '*' || pattern === branch) return true;
  if (pattern.endsWith('/*')) {
    const prefix = pattern.slice(0, -2);
    return branch === prefix || branch.startsWith(prefix + '/');
  }
  if (pattern.endsWith('*')) {
    const prefix = pattern.slice(0, -1);
    return branch.startsWith(prefix);
  }
  return false;
}

export class GitHubSimulator {
  private repositories: Map<string, GitHubRepository> = new Map();
  private events: SimulatorEventEmitter = new SimulatorEventEmitter();
  private nextIssueId = 1;
  private nextPrId = 1;
  private nextReviewId = 1;

  public getEvents(): SimulatorEventEmitter {
    return this.events;
  }

  // --- Repository Management ---
  public createRepository(params: {
    owner: string;
    name: string;
    defaultBranch?: string;
    description?: string;
  }): GitHubRepository {
    const id = `${params.owner}/${params.name}`;
    const defaultBranch = params.defaultBranch || 'main';

    // Register underlying remote repository in Git network registry
    const net = RemoteNetworkRegistry.getInstance();
    const url = `https://gitacademy.local/${id}.git`;
    if (!net.has(url)) {
      net.createRepository({
        id,
        name: params.name,
        url,
        defaultBranch,
      });
    }

    const repo: GitHubRepository = {
      id,
      owner: params.owner,
      name: params.name,
      defaultBranch,
      remoteRepositoryId: id,
      issues: [],
      pullRequests: [],
      forksCount: 0,
      starsCount: 0,
    };

    this.repositories.set(id, repo);
    this.events.emit('repo:created', { repo });
    return repo;
  }

  public getRepository(id: string): GitHubRepository | undefined {
    return this.repositories.get(id);
  }

  public getAllRepositories(): GitHubRepository[] {
    return Array.from(this.repositories.values());
  }

  // --- Fork (G2) ---
  public fork(sourceRepoId: string, newOwner: string): GitHubRepository {
    const sourceRepo = this.getRepository(sourceRepoId);
    if (!sourceRepo) {
      throw new Error(`Repository ${sourceRepoId} not found.`);
    }

    const forkedId = `${newOwner}/${sourceRepo.name}`;
    if (this.repositories.has(forkedId)) {
      return this.repositories.get(forkedId)!;
    }

    const net = RemoteNetworkRegistry.getInstance();
    const sourceRemote = net.get(sourceRepo.remoteRepositoryId);

    // Clone remote repository in network
    const forkedUrl = `https://gitacademy.local/${forkedId}.git`;
    const forkedRemote = net.createRepository({
      id: forkedId,
      name: sourceRepo.name,
      url: forkedUrl,
      defaultBranch: sourceRepo.defaultBranch,
      branches: sourceRemote ? { ...sourceRemote.branches } : {},
      commits: sourceRemote ? { ...sourceRemote.commits } : {},
    });

    const forkedRepo: GitHubRepository = {
      id: forkedId,
      owner: newOwner,
      name: sourceRepo.name,
      defaultBranch: sourceRepo.defaultBranch,
      remoteRepositoryId: forkedId,
      upstreamRepositoryId: sourceRepoId,
      issues: [],
      pullRequests: [],
      forksCount: 0,
      starsCount: 0,
    };

    sourceRepo.forksCount++;
    this.repositories.set(forkedId, forkedRepo);
    this.events.emit('repo:forked', { sourceRepoId, forkedRepo });
    return forkedRepo;
  }

  // --- Issues (G7) ---
  public createIssue(params: {
    repositoryId: string;
    title: string;
    description: string;
    author: string;
    labels?: string[];
  }): Issue {
    const repo = this.getRepository(params.repositoryId);
    if (!repo) throw new Error(`Repository ${params.repositoryId} not found.`);

    const issue: Issue = {
      id: this.nextIssueId++,
      title: params.title,
      description: params.description,
      author: params.author,
      status: 'open',
      labels: params.labels || ['bug'],
      createdAt: Date.now(),
    };

    repo.issues.push(issue);
    this.events.emit('issue:created', { repositoryId: params.repositoryId, issue });
    return issue;
  }

  public closeIssue(repositoryId: string, issueId: number): Issue {
    const repo = this.getRepository(repositoryId);
    if (!repo) throw new Error(`Repository ${repositoryId} not found.`);

    const issue = repo.issues.find((i) => i.id === issueId);
    if (!issue) throw new Error(`Issue #${issueId} not found.`);

    issue.status = 'closed';
    issue.closedAt = Date.now();
    this.events.emit('issue:closed', { repositoryId, issue });
    return issue;
  }

  // --- Pull Requests (G3, G4, G5, G6) ---
  public createPullRequest(params: {
    title: string;
    description: string;
    author: string;
    sourceRepository: string;
    sourceBranch: string;
    targetRepository: string;
    targetBranch: string;
  }): PullRequest {
    const targetRepo = this.getRepository(params.targetRepository);
    if (!targetRepo) throw new Error(`Target repository ${params.targetRepository} not found.`);

    const sourceRepo = this.getRepository(params.sourceRepository);
    if (!sourceRepo) throw new Error(`Source repository ${params.sourceRepository} not found.`);

    const net = RemoteNetworkRegistry.getInstance();
    const sourceRemote = net.get(sourceRepo.remoteRepositoryId);
    const targetRemote = net.get(targetRepo.remoteRepositoryId);

    const sourceHash = sourceRemote?.branches[params.sourceBranch];
    const targetHash = targetRemote?.branches[params.targetBranch];

    if (!sourceHash) {
      throw new Error(`Source branch ${params.sourceBranch} does not exist or has no commits.`);
    }

    // Collect commits that are in source branch
    const commits: string[] = [];
    if (sourceRemote) {
      let curr: string | undefined = sourceHash;
      while (curr && curr !== targetHash) {
        commits.push(curr);
        const c: Commit | undefined = sourceRemote.commits[curr];
        if (!c || c.parents.length === 0) break;
        curr = c.parents[0];
      }
    }

    const pr: PullRequest = {
      id: this.nextPrId++,
      title: params.title,
      description: params.description,
      author: params.author,
      sourceRepository: params.sourceRepository,
      sourceBranch: params.sourceBranch,
      targetRepository: params.targetRepository,
      targetBranch: params.targetBranch,
      commits,
      status: 'open',
      reviews: [],
      createdAt: Date.now(),
    };

    targetRepo.pullRequests.push(pr);
    this.events.emit('pr:created', { pr });
    return pr;
  }

  public getPullRequest(targetRepoId: string, prId: number): PullRequest | undefined {
    const repo = this.getRepository(targetRepoId);
    return repo?.pullRequests.find((p) => p.id === prId);
  }

  // --- Review (G5) ---
  public addReview(params: {
    targetRepository: string;
    prId: number;
    author: string;
    type: ReviewDecision;
    body: string;
  }): Review {
    const pr = this.getPullRequest(params.targetRepository, params.prId);
    if (!pr) throw new Error(`PR #${params.prId} not found in ${params.targetRepository}`);

    const review: Review = {
      id: this.nextReviewId++,
      author: params.author,
      type: params.type,
      body: params.body,
      timestamp: Date.now(),
    };

    pr.reviews.push(review);
    this.events.emit('pr:reviewed', { pr, review });
    return review;
  }

  public submitReview(params: {
    targetRepository: string;
    prId: number;
    author: string;
    type: ReviewDecision;
    body: string;
  }): Review {
    return this.addReview(params);
  }

  // --- Merge PR (G6: Executes real Git DAG merge) ---
  public mergePullRequest(params: {
    targetRepository: string;
    prId: number;
    mergeMethod?: 'merge' | 'squash' | 'rebase';
  }): PullRequest {
    const pr = this.getPullRequest(params.targetRepository, params.prId);
    if (!pr) throw new Error(`PR #${params.prId} not found in ${params.targetRepository}`);

    if (pr.status !== 'open') {
      throw new Error(`Cannot merge PR #${pr.id} because it is already ${pr.status}`);
    }

    const net = RemoteNetworkRegistry.getInstance();
    const sourceRepo = this.getRepository(pr.sourceRepository);
    const targetRepo = this.getRepository(pr.targetRepository);

    if (!targetRepo) {
      throw new Error(`Target repository ${pr.targetRepository} not found.`);
    }

    // Branch Protection Rules Check
    const rules = targetRepo.branchProtectionRules || [];
    const matchedRule = rules.find((r) =>
      matchesBranchPattern(r.branchPattern, pr.targetBranch)
    );

    if (matchedRule) {
      if (matchedRule.requiredApprovals > 0) {
        const approvals = pr.reviews.filter((r) => r.type === 'approve').length;
        if (approvals < matchedRule.requiredApprovals) {
          throw new Error(
            `Protected branch '${pr.targetBranch}' requires at least ${matchedRule.requiredApprovals} approval(s), but found ${approvals}.`
          );
        }
      }

      const hasChangeRequests = pr.reviews.some((r) => r.type === 'request_changes');
      if (hasChangeRequests) {
        throw new Error(`Cannot merge PR #${pr.id} because changes have been requested.`);
      }

      if (matchedRule.requireStatusChecks && matchedRule.requiredStatusChecks) {
        for (const checkCtx of matchedRule.requiredStatusChecks) {
          const check = pr.statusChecks?.[checkCtx];
          if (!check || check.state !== 'success') {
            throw new Error(
              `Cannot merge PR #${pr.id} because required status check "${checkCtx}" has not succeeded.`
            );
          }
        }
      }
    }

    const sourceRemote = net.get(sourceRepo?.remoteRepositoryId || '');
    const targetRemote = net.get(targetRepo?.remoteRepositoryId || '');

    if (!sourceRemote || !targetRemote) {
      throw new Error('Remote repositories unavailable for Git merge.');
    }

    const sourceCommitHash = sourceRemote.branches[pr.sourceBranch];
    const targetCommitHash = targetRemote.branches[pr.targetBranch];

    if (!sourceCommitHash) {
      throw new Error(`Source branch ${pr.sourceBranch} has no commit.`);
    }

    // Copy all source commits to target remote
    for (const c of Object.values(sourceRemote.commits)) {
      targetRemote.commits[c.hash] = c;
    }

    let finalCommitHash = sourceCommitHash;

    const isAncestor = (ancestorHash: string, tipHash: string): boolean => {
      const visited = new Set<string>();
      const queue = [tipHash];
      while (queue.length > 0) {
        const curr = queue.shift()!;
        if (curr === ancestorHash) return true;
        if (!visited.has(curr)) {
          visited.add(curr);
          const c = targetRemote.commits[curr] || sourceRemote.commits[curr];
          if (c?.parents) {
            queue.push(...c.parents);
          }
        }
      }
      return false;
    };

    if (!targetCommitHash) {
      // Unborn target branch -> fast forward
      finalCommitHash = sourceCommitHash;
    } else if (targetCommitHash === sourceCommitHash) {
      finalCommitHash = targetCommitHash;
    } else if (
      isAncestor(targetCommitHash, sourceCommitHash) &&
      (matchedRule?.requireLinearHistory || params.mergeMethod === 'rebase')
    ) {
      // Direct descendant -> fast forward merge
      finalCommitHash = sourceCommitHash;
    } else {
      if (matchedRule?.requireLinearHistory) {
        throw new Error(
          `Protected branch '${pr.targetBranch}' requires linear history. Fast-forward merge is required, merge commits are disabled.`
        );
      }

      // Create a 3-way merge commit in the target repository
      const sourceCommit = targetRemote.commits[sourceCommitHash];
      const targetCommit = targetRemote.commits[targetCommitHash];

      // Merge trees: union with source taking priority
      const mergedTree: Record<string, string> = {
        ...(targetCommit?.tree || {}),
        ...(sourceCommit?.tree || {}),
      };

      const timestamp = Date.now();
      const parentHashes = [targetCommitHash, sourceCommitHash];
      const mergeMessage = `Merge pull request #${pr.id} from ${pr.sourceRepository}/${pr.sourceBranch}`;

      const rawContent = `${Object.keys(mergedTree).sort().join(',')}_${mergeMessage}_${parentHashes.join(',')}_${timestamp}`;
      let hashNum = 0x5a5a5a5a;
      for (let i = 0; i < rawContent.length; i++) {
        hashNum = Math.imul(hashNum ^ rawContent.charCodeAt(i), 1597334677);
      }
      const hash = `pr_merge_${Math.abs(hashNum).toString(16).padStart(8, '0')}${Date.now().toString(16)}`;

      const mergeCommit: Commit = {
        hash,
        shortHash: hash.slice(0, 7),
        message: mergeMessage,
        author: { name: 'GitHub Simulator', email: 'noreply@github.local' },
        timestamp,
        parents: parentHashes,
        tree: mergedTree,
      };

      targetRemote.commits[hash] = mergeCommit;
      finalCommitHash = hash;
    }

    // Update target branch pointer in remote repository
    targetRemote.branches[pr.targetBranch] = finalCommitHash;

    pr.status = 'merged';
    pr.mergeCommitHash = finalCommitHash;
    pr.mergedAt = Date.now();

    this.events.emit('pr:merged', { pr, finalCommitHash });
    return pr;
  }

  // --- Compute PR File Diffs (G4) ---
  public getPullRequestDiffs(targetRepoId: string, prId: number): PRFileDiff[] {
    const pr = this.getPullRequest(targetRepoId, prId);
    if (!pr) return [];

    const net = RemoteNetworkRegistry.getInstance();
    const sourceRepo = this.getRepository(pr.sourceRepository);
    const targetRepo = this.getRepository(pr.targetRepository);

    const sourceRemote = net.get(sourceRepo?.remoteRepositoryId || '');
    const targetRemote = net.get(targetRepo?.remoteRepositoryId || '');

    const sourceHash = sourceRemote?.branches[pr.sourceBranch];
    const targetHash = targetRemote?.branches[pr.targetBranch];

    const sourceTree = sourceHash ? sourceRemote?.commits[sourceHash]?.tree || {} : {};
    const targetTree = targetHash ? targetRemote?.commits[targetHash]?.tree || {} : {};

    const diffs: PRFileDiff[] = [];
    const allPaths = new Set([...Object.keys(sourceTree), ...Object.keys(targetTree)]);

    for (const path of allPaths) {
      const oldVal = targetTree[path] ?? null;
      const newVal = sourceTree[path] ?? null;

      if (oldVal === null && newVal !== null) {
        diffs.push({ path, status: 'added', oldContent: null, newContent: newVal });
      } else if (oldVal !== null && newVal === null) {
        diffs.push({ path, status: 'deleted', oldContent: oldVal, newContent: null });
      } else if (oldVal !== newVal) {
        diffs.push({ path, status: 'modified', oldContent: oldVal, newContent: newVal });
      }
    }

    return diffs;
  }

  public closePullRequest(targetRepoIdOrPrId: string | number, prId?: number): PullRequest {
    let pr: PullRequest | undefined;
    if (typeof targetRepoIdOrPrId === 'number') {
      for (const repo of this.repositories.values()) {
        pr = repo.pullRequests.find((p) => p.id === targetRepoIdOrPrId);
        if (pr) break;
      }
    } else {
      pr = this.getPullRequest(targetRepoIdOrPrId, prId!);
    }
    if (!pr) throw new Error(`PR not found`);
    pr.status = 'closed';
    pr.closedAt = Date.now();
    this.events.emit('pr:closed', { pr });
    return pr;
  }

  public reopenPullRequest(targetRepoIdOrPrId: string | number, prId?: number): PullRequest {
    let pr: PullRequest | undefined;
    if (typeof targetRepoIdOrPrId === 'number') {
      for (const repo of this.repositories.values()) {
        pr = repo.pullRequests.find((p) => p.id === targetRepoIdOrPrId);
        if (pr) break;
      }
    } else {
      pr = this.getPullRequest(targetRepoIdOrPrId, prId!);
    }
    if (!pr) throw new Error(`PR not found`);
    if (pr.status === 'merged') throw new Error(`Cannot reopen merged PR #${pr.id}`);
    pr.status = 'open';
    pr.closedAt = undefined;
    this.events.emit('pr:reopened', { pr });
    return pr;
  }

  // --- Branch Protection Rules (Part 14) ---
  public addBranchProtectionRule(
    repoId: string,
    rule: import('./types').BranchProtectionRule
  ): void {
    const repo = this.getRepository(repoId);
    if (!repo) throw new Error(`Repository ${repoId} not found.`);
    if (!repo.branchProtectionRules) repo.branchProtectionRules = [];
    repo.branchProtectionRules.push(rule);

    // Sync rule to remote repository in network
    const net = RemoteNetworkRegistry.getInstance();
    const remoteRepo = net.get(repo.remoteRepositoryId);
    if (remoteRepo) {
      if (!remoteRepo.branchProtectionRules) remoteRepo.branchProtectionRules = [];
      remoteRepo.branchProtectionRules.push(rule);
    }
  }

  public getBranchProtectionRules(repoId: string): import('./types').BranchProtectionRule[] {
    const repo = this.getRepository(repoId);
    return repo?.branchProtectionRules || [];
  }

  public canMergePullRequest(
    targetRepoId: string,
    prId: number
  ): { canMerge: boolean; reasons: string[] } {
    const reasons: string[] = [];
    const pr = this.getPullRequest(targetRepoId, prId);
    if (!pr) return { canMerge: false, reasons: ['Pull request not found.'] };

    if (pr.status !== 'open') {
      reasons.push(`PR is already ${pr.status}.`);
    }

    const repo = this.getRepository(targetRepoId);
    if (!repo) return { canMerge: false, reasons: ['Repository not found.'] };

    const rules = repo.branchProtectionRules || [];
    const matchedRule = rules.find((r) =>
      matchesBranchPattern(r.branchPattern, pr.targetBranch)
    );

    if (matchedRule) {
      if (matchedRule.requiredApprovals > 0) {
        const approvals = pr.reviews.filter((r) => r.type === 'approve').length;
        if (approvals < matchedRule.requiredApprovals) {
          reasons.push(
            `Requires at least ${matchedRule.requiredApprovals} approval(s), but found ${approvals}.`
          );
        }
      }

      const hasChangeRequests = pr.reviews.some((r) => r.type === 'request_changes');
      if (hasChangeRequests) {
        reasons.push('Changes have been requested by reviewers.');
      }

      if (matchedRule.requireStatusChecks && matchedRule.requiredStatusChecks) {
        for (const checkCtx of matchedRule.requiredStatusChecks) {
          const check = pr.statusChecks?.[checkCtx];
          if (!check || check.state !== 'success') {
            reasons.push(`Required status check "${checkCtx}" is ${check ? check.state : 'missing'}.`);
          }
        }
      }
    }

    return {
      canMerge: reasons.length === 0,
      reasons,
    };
  }

  public setStatusCheck(params: {
    targetRepository: string;
    prId: number;
    context: string;
    state: 'pending' | 'success' | 'failure';
    description?: string;
  }): import('./types').StatusCheck {
    const pr = this.getPullRequest(params.targetRepository, params.prId);
    if (!pr) throw new Error(`PR #${params.prId} not found in ${params.targetRepository}`);

    if (!pr.statusChecks) pr.statusChecks = {};
    const check: import('./types').StatusCheck = {
      context: params.context,
      state: params.state,
      description: params.description,
      timestamp: Date.now(),
    };
    pr.statusChecks[params.context] = check;
    this.events.emit('pr:status_checked' as any, { pr, check });
    return check;
  }

  public deleteBranch(repoId: string, branchName: string): boolean {
    const repo = this.getRepository(repoId);
    if (!repo) throw new Error(`Repository ${repoId} not found.`);
    if (branchName === repo.defaultBranch) {
      throw new Error(`Cannot delete default branch '${branchName}'.`);
    }

    const rules = repo.branchProtectionRules || [];
    const matchedRule = rules.find((r) =>
      matchesBranchPattern(r.branchPattern, branchName)
    );
    if (matchedRule && matchedRule.blockDeletion) {
      throw new Error(`Cannot delete protected branch '${branchName}'.`);
    }

    const net = RemoteNetworkRegistry.getInstance();
    const remote = net.get(repo.remoteRepositoryId);
    if (remote && remote.branches[branchName]) {
      delete remote.branches[branchName];
      return true;
    }
    return false;
  }

  // --- CODEOWNERS (Part 15) ---
  public setCodeOwners(repoId: string, rules: import('./types').CodeOwnerRule[]): void {
    const repo = this.getRepository(repoId);
    if (!repo) throw new Error(`Repository ${repoId} not found.`);
    repo.codeOwners = rules;
  }

  public getCodeOwners(repoId: string): import('./types').CodeOwnerRule[] {
    const repo = this.getRepository(repoId);
    return repo?.codeOwners || [];
  }

  public getRequiredReviewersForPR(targetRepoId: string, prId: number): string[] {
    const repo = this.getRepository(targetRepoId);
    if (!repo || !repo.codeOwners || repo.codeOwners.length === 0) return [];
    const diffs = this.getPullRequestDiffs(targetRepoId, prId);
    const paths = diffs.map((d) => d.path);
    return findReviewersForFiles(repo.codeOwners, paths);
  }

  // --- Releases (Part 18) ---
  public createRelease(
    repoId: string,
    release: {
      tag: string;
      title: string;
      notes: string;
      commitHash: string;
      prerelease?: boolean;
    }
  ): import('./types').Release {
    const repo = this.getRepository(repoId);
    if (!repo) throw new Error(`Repository ${repoId} not found.`);
    if (!repo.releases) repo.releases = [];
    if (repo.releases.some((r) => r.tag === release.tag)) {
      throw new Error(`Release with tag '${release.tag}' already exists.`);
    }

    const newRelease: import('./types').Release = {
      tag: release.tag,
      title: release.title,
      notes: release.notes,
      commitHash: release.commitHash,
      prerelease: Boolean(release.prerelease),
      createdAt: Date.now(),
    };

    repo.releases.push(newRelease);
    this.events.emit('release:created' as any, { repoId, release: newRelease });
    return newRelease;
  }

  public getReleases(repoId: string): import('./types').Release[] {
    const repo = this.getRepository(repoId);
    return repo?.releases || [];
  }

  public getReleaseByTag(repoId: string, tag: string): import('./types').Release | undefined {
    const releases = this.getReleases(repoId);
    return releases.find((r) => r.tag === tag);
  }
}
