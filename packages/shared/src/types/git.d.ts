export type FileStatus = 'unmodified' | 'modified' | 'added' | 'deleted' | 'untracked' | 'conflict';
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
    parents: string[];
    tree: Record<string, string>;
}
export interface Branch {
    name: string;
    commitHash: string | null;
}
export interface Tag {
    name: string;
    commitHash: string;
    message?: string;
}
export interface Remote {
    name: string;
    url: string;
    branches: Record<string, string>;
}
export interface ReflogEntry {
    id: string;
    action: string;
    fromHash: string | null;
    toHash: string;
    message: string;
    timestamp: number;
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
    ref: string;
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
    tags: Tag[];
    reflog: ReflogEntry[];
    stash: StashEntry[];
}
export interface CommandResult {
    success: boolean;
    stdout: string;
    stderr: string;
    exitCode: number;
    state: GitState;
    events: import('./events').GitEvent[];
}
//# sourceMappingURL=git.d.ts.map