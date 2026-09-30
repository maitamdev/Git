export type FileStatus =
  | 'unmodified'
  | 'modified'
  | 'added'
  | 'deleted'
  | 'untracked'
  | 'conflict';

export interface FileState {
  path: string;
  content: string;
  status: FileStatus;
  staged?: boolean;
}

export interface CommitAuthor {
  name: string;
  email: string;
}

export interface Commit {
  hash: string;
  shortHash: string;
  message: string;
  author: CommitAuthor;
  timestamp: number;
  parents: string[]; // Supports multiple parents for merge commits (DAG)
  tree: Record<string, string>; // path -> content
}

export interface Branch {
  name: string;
  commitHash: string | null;
}

export interface Tag {
  name: string;
  commitHash: string;
  message?: string;
  annotated?: boolean;
  tagger?: CommitAuthor;
  timestamp?: number;
}

export interface Remote {
  name: string;
  url: string;
  branches: Record<string, string>; // branchName -> commitHash
}

export interface RemoteReference {
  name: string;
  url: string;
  repositoryId: string;
}

export interface BranchProtectionRule {
  branchPattern: string;
  requirePullRequest: boolean;
  requiredApprovals: number;
  requireStatusChecks: boolean;
  blockForcePush: boolean;
  blockDeletion: boolean;
}

export interface RemoteRepository {
  id: string;
  name: string;
  url: string;
  branches: Record<string, string | null>;
  commits: Record<string, Commit>;
  defaultBranch: string;
  branchProtectionRules?: BranchProtectionRule[];
}

export type ReflogAction =
  | 'commit'
  | 'checkout'
  | 'reset'
  | 'merge'
  | 'rebase'
  | 'amend'
  | 'cherry-pick'
  | string;

export interface ReflogEntry {
  index: number;
  id?: string;
  oldHash: string | null;
  newHash: string | null;
  ref: string;
  action: ReflogAction;
  message: string;
  timestamp: number;
  fromHash?: string | null;
  toHash?: string;
}

export interface StashEntry {
  id: string;
  message: string;
  timestamp: number;
  workingTree: FileState[];
  stagingArea: FileState[];
  branch: string;
}

export interface HeadState {
  type: 'branch' | 'detached';
  ref: string; // branch name or commit hash
}

export interface ConflictEntry {
  path: string;
  baseContent: string | null;
  oursContent: string | null;
  theirsContent: string | null;
  status: 'unresolved' | 'resolved';
}

export interface MergeState {
  inProgress: boolean;
  sourceBranch: string;
  targetBranch: string;
  sourceCommitHash: string;
  targetCommitHash: string;
  conflicts: ConflictEntry[];
}

export type InteractiveRebaseAction = 'pick' | 'reword' | 'edit' | 'squash' | 'fixup' | 'drop';

export interface InteractiveRebaseItem {
  action: InteractiveRebaseAction;
  commitHash: string;
  shortHash: string;
  message: string;
}

export interface RebaseState {
  inProgress: boolean;
  status: 'applying' | 'paused' | 'done';
  upstreamBranch: string;
  upstreamCommit: string;
  originalBranch: string;
  originalHeadCommit: string;
  remainingCommits: string[];
  currentCommitHash: string | null;
  currentAction?: InteractiveRebaseAction;
  interactivePlan?: InteractiveRebaseItem[];
  conflicts?: ConflictEntry[];
}

export interface BisectState {
  inProgress: boolean;
  badCommit: string | null;
  goodCommits: string[];
  candidates: string[];
  currentCommit: string | null;
  originalBranch: string;
  originalHeadCommit: string;
}

export interface WorktreeEntry {
  path: string;
  branch: string;
  commitHash: string;
  locked?: boolean;
}

export interface GitState {
  repositoryInitialized: boolean;
  currentBranch: string;
  head: HeadState;
  workingTree: FileState[];
  stagingArea: FileState[];
  branches: Branch[];
  commits: Commit[];
  remotes: Remote[];
  remoteTrackingBranches?: Record<string, string | null>;
  tags: Tag[];
  reflog: ReflogEntry[];
  stash: StashEntry[];
  merge?: MergeState | null;
  rebase?: RebaseState | null;
  bisect?: BisectState | null;
  worktrees?: WorktreeEntry[];
  config?: Record<string, string>;
}

export interface CommandResult {
  success: boolean;
  stdout: string;
  stderr: string;
  exitCode: number;
  state: GitState;
  events: import('./events').GitEvent[];
}
