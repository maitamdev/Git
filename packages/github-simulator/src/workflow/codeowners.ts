import { CodeOwnerRule } from '../types';

/**
 * Parses CODEOWNERS file content:
 * e.g.
 * /src/auth/* @alice
 * /src/payment/* @bob
 * *.md @docs-team
 */
export function parseCodeOwners(content: string): CodeOwnerRule[] {
  const rules: CodeOwnerRule[] = [];
  if (!content) return rules;

  const lines = content.split('\n');
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const parts = line.split(/\s+/);
    if (parts.length >= 2) {
      const pattern = parts[0];
      const owners = parts.slice(1).map((o) => (o.startsWith('@') ? o : `@${o}`));
      rules.push({ pattern, owners });
    }
  }

  return rules;
}

/**
 * Matches a file path against a glob-like pattern:
 * e.g.
 * /src/auth/* matches /src/auth/login.ts
 * *.md matches README.md
 * src/payment/** matches src/payment/checkout/pay.ts
 */
export function matchPattern(pattern: string, filePath: string): boolean {
  const normPath = filePath.startsWith('/') ? filePath : `/${filePath}`;
  const normPattern = pattern.startsWith('/') ? pattern : `/${pattern}`;

  // Wildcard extension: *.md
  if (normPattern.startsWith('/*.')) {
    const ext = normPattern.slice(3);
    return normPath.endsWith(`.${ext}`);
  }

  // Directory wildcard: /src/auth/*
  if (normPattern.endsWith('/*')) {
    const prefix = normPattern.slice(0, -2);
    return normPath.startsWith(prefix);
  }

  // Recursive wildcard: /src/payment/**
  if (normPattern.endsWith('/**')) {
    const prefix = normPattern.slice(0, -3);
    return normPath.startsWith(prefix);
  }

  return normPath.startsWith(normPattern) || normPath === normPattern;
}

/**
 * Finds all required reviewers for an array of changed files based on CODEOWNERS rules.
 * Following GitHub CODEOWNERS rules, later rules take precedence for the same pattern/file,
 * but for multiple files we collect union of reviewers.
 */
export function findReviewersForFiles(rules: CodeOwnerRule[], filePaths: string[]): string[] {
  const reviewers = new Set<string>();

  for (const file of filePaths) {
    // Find the LAST matching rule in CODEOWNERS file for this path
    let matchedRule: CodeOwnerRule | null = null;
    for (let i = rules.length - 1; i >= 0; i--) {
      if (matchPattern(rules[i].pattern, file)) {
        matchedRule = rules[i];
        break;
      }
    }

    if (matchedRule) {
      for (const owner of matchedRule.owners) {
        reviewers.add(owner);
      }
    }
  }

  return Array.from(reviewers);
}
