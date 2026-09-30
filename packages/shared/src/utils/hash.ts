/**
 * Generates a SHA-1-like 40-character hexadecimal hash deterministically
 * based on input content, author, and timestamp.
 */
export function generateCommitHash(content: string, salt: string = ''): string {
  let hash1 = 0xdeadbeef;
  let hash2 = 0x41c6ce57;
  const str = content + salt;

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

export function toShortHash(hash: string): string {
  return hash.slice(0, 7);
}
