/**
 * Computes Levenshtein edit distance between two strings.
 */
export function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1, // deletion
          dp[i][j - 1] + 1, // insertion
          dp[i - 1][j - 1] + 1 // substitution
        );
      }
    }
  }

  return dp[m][n];
}

/**
 * Finds the closest matching string from a candidates list within a max distance threshold.
 */
export function findClosestMatch(target: string, candidates: string[], maxDistance = 3): string | null {
  let bestMatch: string | null = null;
  let minDistance = Infinity;

  for (const c of candidates) {
    const dist = levenshteinDistance(target.toLowerCase(), c.toLowerCase());
    if (dist < minDistance && dist <= maxDistance) {
      minDistance = dist;
      bestMatch = c;
    }
  }

  return bestMatch;
}
