import { SemanticVersion } from '../types';
import { validateConventionalCommit } from './conventional-commits';

export function parseSemanticVersion(versionStr: string): SemanticVersion {
  const clean = versionStr.replace(/^v/i, '').trim();
  const parts = clean.split('.');
  const major = parseInt(parts[0] || '0', 10);
  const minor = parseInt(parts[1] || '0', 10);
  const patch = parseInt(parts[2] || '0', 10);

  return {
    major: isNaN(major) ? 0 : major,
    minor: isNaN(minor) ? 0 : minor,
    patch: isNaN(patch) ? 0 : patch,
  };
}

export function formatSemanticVersion(v: SemanticVersion, prefix = 'v'): string {
  return `${prefix}${v.major}.${v.minor}.${v.patch}`;
}

/**
 * Calculates the next semantic version given an array of commit messages
 * following Conventional Commits:
 * - BREAKING CHANGE or `!` -> MAJOR bump (X+1.0.0)
 * - `feat` -> MINOR bump (X.Y+1.0)
 * - `fix`, `perf`, `refactor`, etc. -> PATCH bump (X.Y.Z+1)
 */
export function computeNextVersion(
  current: SemanticVersion,
  commitMessages: string[]
): SemanticVersion {
  let bumpType: 'none' | 'patch' | 'minor' | 'major' = 'none';

  for (const msg of commitMessages) {
    const parsed = validateConventionalCommit(msg);
    if (!parsed.valid) continue;

    if (parsed.isBreaking) {
      bumpType = 'major';
      break;
    } else if (parsed.type === 'feat') {
      bumpType = 'minor';
    } else if (['fix', 'perf', 'refactor'].includes(parsed.type || '')) {
      if (bumpType === 'none') {
        bumpType = 'patch';
      }
    }
  }

  if (bumpType === 'major') {
    return {
      major: current.major + 1,
      minor: 0,
      patch: 0,
    };
  }

  if (bumpType === 'minor') {
    return {
      major: current.major,
      minor: current.minor + 1,
      patch: 0,
    };
  }

  if (bumpType === 'patch') {
    return {
      major: current.major,
      minor: current.minor,
      patch: current.patch + 1,
    };
  }

  return { ...current };
}
