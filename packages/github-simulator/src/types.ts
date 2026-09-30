import { Commit } from '@git-academy/shared';

export type ReviewDecision = 'comment' | 'approve' | 'request_changes';

export interface Review {
  id: number;
  author: string;
  type: ReviewDecision;
  body: string;
  timestamp: number;
}

export interface Issue {
  id: number;
  title: string;
  description: string;
  author: string;
  status: 'open' | 'closed';
  labels: string[];
  createdAt: number;
  closedAt?: number;
}

export interface PullRequest {
  id: number;
  title: string;
  description: string;
  author: string;
  sourceRepository: string; // e.g. "student/demo-project"
  sourceBranch: string;     // e.g. "feature/login"
  targetRepository: string; // e.g. "teacher/demo-project"
  targetBranch: string;     // e.g. "main"
  commits: string[];        // commit hashes
  status: 'open' | 'merged' | 'closed';
  reviews: Review[];
  statusChecks?: Record<string, StatusCheck>;
  mergeCommitHash?: string;
  createdAt: number;
  mergedAt?: number;
  closedAt?: number;
}

export interface StatusCheck {
  context: string;
  state: 'pending' | 'success' | 'failure';
  description?: string;
  timestamp?: number;
}

export interface BranchProtectionRule {
  branchPattern: string;
  requirePullRequest: boolean;
  requiredApprovals: number;
  requireStatusChecks: boolean;
  requiredStatusChecks?: string[];
  blockForcePush: boolean;
  blockDeletion: boolean;
  requireLinearHistory?: boolean;
}

export interface CodeOwnerRule {
  pattern: string;
  owners: string[];
}

export interface SemanticVersion {
  major: number;
  minor: number;
  patch: number;
}

export interface Release {
  tag: string;
  title: string;
  notes: string;
  commitHash: string;
  prerelease: boolean;
  createdAt?: number;
}

export interface GitHubRepository {
  id: string;
  owner: string;
  name: string;
  defaultBranch: string;
  remoteRepositoryId: string;
  upstreamRepositoryId?: string; // If this is a fork
  issues: Issue[];
  pullRequests: PullRequest[];
  forksCount: number;
  starsCount: number;
  branchProtectionRules?: BranchProtectionRule[];
  codeOwners?: CodeOwnerRule[];
  releases?: Release[];
}

export interface ForkInfo {
  sourceRepoId: string;
  forkRepoId: string;
  owner: string;
}

export interface PRFileDiff {
  path: string;
  status: 'added' | 'modified' | 'deleted';
  oldContent: string | null;
  newContent: string | null;
}

