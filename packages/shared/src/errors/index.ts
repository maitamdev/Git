export class GitError extends Error {
  public code: string;

  constructor(message: string, code = 'GIT_ERROR') {
    super(message);
    this.name = 'GitError';
    this.code = code;
  }
}

export class RepositoryNotInitializedError extends GitError {
  constructor() {
    super('fatal: not a git repository (or any of the parent directories): .git', 'NOT_A_GIT_REPO');
  }
}

export class BranchNotFoundError extends GitError {
  constructor(branchName: string) {
    super(`error: pathspec '${branchName}' did not match any file(s) known to git`, 'BRANCH_NOT_FOUND');
  }
}

export class FileNotFoundError extends GitError {
  constructor(path: string) {
    super(`fatal: pathspec '${path}' did not match any files`, 'PATH_NOT_FOUND');
  }
}

export class InvalidCommandError extends GitError {
  constructor(command: string) {
    super(`git: '${command}' is not a git command. See 'git --help'.`, 'INVALID_COMMAND');
  }
}
