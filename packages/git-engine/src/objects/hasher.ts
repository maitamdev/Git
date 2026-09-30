/**
 * Deterministic Git Object Hasher for Git Academy Simulator.
 * Provides consistent, reproducible SHA-1 hashes for blobs, trees, commits, and tags.
 */
export class GitObjectHasher {
  /**
   * Generates a 40-character SHA-1-like deterministic hexadecimal hash.
   */
  public static hash(data: string, salt: string = ''): string {
    let hash1 = 0xdeadbeef;
    let hash2 = 0x41c6ce57;
    const str = data + salt;

    for (let i = 0; i < str.length; i++) {
      const ch = str.charCodeAt(i);
      hash1 = Math.imul(hash1 ^ ch, 2654435761);
      hash2 = Math.imul(hash2 ^ ch, 1597334677);
    }

    hash1 = Math.imul(hash1 ^ (hash1 >>> 16), 2246822507);
    hash1 ^= Math.imul(hash2 ^ (hash2 >>> 13), 3266489909);
    hash2 = Math.imul(hash2 ^ (hash2 >>> 16), 2246822507);
    hash2 ^= Math.imul(hash1 ^ (hash1 >>> 13), 3266489909);

    const part1 = (hash1 >>> 0).toString(16).padStart(8, '0');
    const part2 = (hash2 >>> 0).toString(16).padStart(8, '0');
    const part3 = ((hash1 ^ hash2) >>> 0).toString(16).padStart(8, '0');
    const part4 = ((hash1 + hash2) >>> 0).toString(16).padStart(8, '0');
    const part5 = ((hash1 * 31 + hash2) >>> 0).toString(16).padStart(8, '0');

    return (part1 + part2 + part3 + part4 + part5).slice(0, 40);
  }

  public static hashBlob(content: string): string {
    return this.hash(`blob ${content.length}\0${content}`);
  }

  public static hashTree(entries: Record<string, string>): string {
    const sorted = Object.keys(entries)
      .sort()
      .map((k) => `${k}:${entries[k]}`)
      .join('\n');
    return this.hash(`tree ${sorted.length}\0${sorted}`);
  }

  public static hashCommit(params: {
    treeHash: string;
    parents: string[];
    author: { name: string; email: string };
    message: string;
    timestamp: number;
  }): string {
    const parentLines = params.parents.map((p) => `parent ${p}`).join('\n');
    const header = [
      `tree ${params.treeHash}`,
      parentLines,
      `author ${params.author.name} <${params.author.email}> ${params.timestamp}`,
      `committer ${params.author.name} <${params.author.email}> ${params.timestamp}`,
      '',
      params.message,
    ]
      .filter((line) => line !== undefined && line !== null)
      .join('\n');

    return this.hash(`commit ${header.length}\0${header}`);
  }

  public static toShortHash(hash: string, length = 7): string {
    return hash.slice(0, length);
  }
}
