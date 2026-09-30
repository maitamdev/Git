export function matchPattern(pattern: string, target: string): boolean {
  if (pattern === target) return true;
  if (pattern === '*') return true;
  if (pattern === '**') return true;

  // Convert glob pattern to regular expression
  let regexStr = pattern
    .replace(/[.+^${}()|[\]\\]/g, '\\$&') // escape special regex chars except * and ?
    .replace(/\*\*/g, '§GLOBSTAR§')
    .replace(/\*/g, '[^/]*')
    .replace(/§GLOBSTAR§/g, '.*')
    .replace(/\?/g, '.');

  const regex = new RegExp(`^${regexStr}$`);
  return regex.test(target);
}

export function matchesAnyPattern(patterns: string[], target: string): boolean {
  return patterns.some((p) => matchPattern(p, target));
}

export function evaluateBranchFilters(
  targetBranch: string,
  branches?: string[],
  branchesIgnore?: string[]
): boolean {
  if (branchesIgnore && branchesIgnore.length > 0) {
    if (matchesAnyPattern(branchesIgnore, targetBranch)) {
      return false;
    }
  }
  if (branches && branches.length > 0) {
    return matchesAnyPattern(branches, targetBranch);
  }
  return true;
}

export function evaluatePathFilters(
  changedPaths: string[],
  paths?: string[],
  pathsIgnore?: string[]
): boolean {
  if (!changedPaths || changedPaths.length === 0) return true;

  if (pathsIgnore && pathsIgnore.length > 0) {
    const allIgnored = changedPaths.every((p) => matchesAnyPattern(pathsIgnore, p));
    if (allIgnored) return false;
  }

  if (paths && paths.length > 0) {
    return changedPaths.some((p) => matchesAnyPattern(paths, p));
  }

  return true;
}
