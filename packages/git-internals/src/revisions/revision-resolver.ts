import { GitRefStore } from '../refs/ref-store';
import { GitObjectStore } from '../objects/object-store';
import { GitObject } from '../objects/object-types';

export class RevisionResolver {
  public static resolve(
    rev: string,
    refStore: GitRefStore,
    objectStore: GitObjectStore
  ): string | null {
    const raw = (rev || '').trim();
    if (!raw) return null;

    // 1. Handle ~N (ancestor by first-parent generation)
    if (raw.includes('~')) {
      const [baseRef, countStr] = raw.split('~');
      const count = countStr ? parseInt(countStr, 10) : 1;
      let currHash = this.resolve(baseRef || 'HEAD', refStore, objectStore);
      if (!currHash) return null;

      for (let i = 0; i < count; i++) {
        const obj = objectStore.get(currHash);
        if (!obj || obj.type !== 'commit') return null;
        const parents = this.getParents(obj);
        if (parents.length === 0) return null;
        currHash = parents[0];
      }
      return currHash;
    }

    // 2. Handle ^N (Nth parent)
    if (raw.includes('^')) {
      const [baseRef, parentIndexStr] = raw.split('^');
      const parentIdx = parentIndexStr ? parseInt(parentIndexStr, 10) - 1 : 0;
      const baseHash = this.resolve(baseRef || 'HEAD', refStore, objectStore);
      if (!baseHash) return null;

      const obj = objectStore.get(baseHash);
      if (!obj || obj.type !== 'commit') return null;
      const parents = this.getParents(obj);
      if (parentIdx < 0 || parentIdx >= parents.length) return null;
      return parents[parentIdx];
    }

    // 3. Direct ref lookup
    const refHash = refStore.getRef(raw);
    if (refHash) return refHash;

    // 4. Direct object hash or prefix lookup
    const directObj = objectStore.get(raw);
    if (directObj) return directObj.hash;

    return null;
  }

  private static getParents(commitObj: GitObject): string[] {
    const lines = commitObj.content.split('\n');
    const parents: string[] = [];
    for (const line of lines) {
      if (line.startsWith('parent ')) {
        parents.push(line.slice(7).trim());
      } else if (line === '') {
        break; // Commit body starts
      }
    }
    return parents;
  }
}
