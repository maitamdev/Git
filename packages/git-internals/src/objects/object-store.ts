import { GitObject } from './object-types';

export class GitObjectStore {
  private objects: Map<string, GitObject> = new Map();

  public put(obj: GitObject): void {
    this.objects.set(obj.hash, obj);
  }

  public get(hash: string): GitObject | null {
    if (this.objects.has(hash)) {
      return this.objects.get(hash)!;
    }
    // Try prefix matching (7+ chars)
    if (hash.length >= 4) {
      const matches = Array.from(this.objects.values()).filter((o) => o.hash.startsWith(hash));
      if (matches.length === 1) {
        return matches[0];
      }
    }
    return null;
  }

  public has(hash: string): boolean {
    return this.get(hash) !== null;
  }

  public list(): GitObject[] {
    return Array.from(this.objects.values());
  }

  public getLoosePath(hash: string): string {
    const dir = hash.slice(0, 2);
    const file = hash.slice(2);
    return `.git/objects/${dir}/${file}`;
  }

  public getStats(): { totalCount: number; blobCount: number; treeCount: number; commitCount: number; tagCount: number } {
    let blobCount = 0;
    let treeCount = 0;
    let commitCount = 0;
    let tagCount = 0;

    for (const obj of this.objects.values()) {
      if (obj.type === 'blob') blobCount++;
      else if (obj.type === 'tree') treeCount++;
      else if (obj.type === 'commit') commitCount++;
      else if (obj.type === 'tag') tagCount++;
    }

    return {
      totalCount: this.objects.size,
      blobCount,
      treeCount,
      commitCount,
      tagCount,
    };
  }

  public clear(): void {
    this.objects.clear();
  }
}
