export declare class GitError extends Error {
    code: string;
    constructor(message: string, code?: string);
}
export declare class RepositoryNotInitializedError extends GitError {
    constructor();
}
export declare class BranchNotFoundError extends GitError {
    constructor(branchName: string);
}
export declare class FileNotFoundError extends GitError {
    constructor(path: string);
}
export declare class InvalidCommandError extends GitError {
    constructor(command: string);
}
//# sourceMappingURL=index.d.ts.map