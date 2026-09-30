import { GitObject, GitObjectType } from '../objects/object-types';
import { GitObjectStore } from '../objects/object-store';
import { GitRefStore } from '../refs/ref-store';
import { GitObjectSerializer } from '../objects/serializer';

export interface PackedObject {
  hash: string;
  type: GitObjectType;
  baseHash?: string;
  isDelta: boolean;
  rawSize: number;
  packedSize: number;
}

export interface Packfile {
  id: string; // e.g. "pack-a1b2c3d4e5f6..."
  objects: Map<string, PackedObject>;
  totalObjects: number;
  totalSize: number;
}

export class GitGarbageCollector {
  private static activePackfile: Packfile | null = null;

  public static getPackfile(): Packfile | null {
    return this.activePackfile;
  }

  /**
   * Identifies all objects reachable from refs (branches, tags, HEAD).
   */
  public static findReachableHashes(
    refStore: GitRefStore,
    objectStore: GitObjectStore
  ): Set<string> {
    const reachable = new Set<string>();
    const toVisit: string[] = [];

    // Seed with all ref tips
    for (const ref of refStore.listRefs()) {
      toVisit.push(ref.hash);
    }
    const headHash = refStore.getRef('HEAD');
    if (headHash) toVisit.push(headHash);

    while (toVisit.length > 0) {
      const hash = toVisit.pop()!;
      if (!hash || reachable.has(hash)) continue;
      reachable.add(hash);

      const obj = objectStore.get(hash);
      if (!obj) continue;

      if (obj.type === 'commit') {
        const lines = obj.content.split('\n');
        for (const line of lines) {
          if (line.startsWith('tree ')) {
            toVisit.push(line.slice(5).trim());
          } else if (line.startsWith('parent ')) {
            toVisit.push(line.slice(7).trim());
          } else if (line === '') {
            break;
          }
        }
      } else if (obj.type === 'tree') {
        const entries = GitObjectSerializer.parseTree(obj.content);
        for (const entry of entries) {
          toVisit.push(entry.hash);
        }
      } else if (obj.type === 'tag') {
        const lines = obj.content.split('\n');
        for (const line of lines) {
          if (line.startsWith('object ')) {
            toVisit.push(line.slice(7).trim());
          }
        }
      }
    }

    return reachable;
  }

  /**
   * Simulates `git gc`:
   * 1. Traverses reachable graph.
   * 2. Packs reachable objects into educational delta packfile.
   * 3. Calculates compression statistics.
   */
  public static runGc(
    refStore: GitRefStore,
    objectStore: GitObjectStore
  ): {
    reachableCount: number;
    unreachableCount: number;
    packedObjectsCount: number;
    rawBytes: number;
    packedBytes: number;
    savingsPercent: number;
  } {
    const reachable = this.findReachableHashes(refStore, objectStore);
    const allObjects = objectStore.list();
    const unreachableCount = allObjects.filter((o) => !reachable.has(o.hash)).length;

    let rawBytes = 0;
    let packedBytes = 0;
    const packedObjects = new Map<string, PackedObject>();

    for (const obj of allObjects) {
      if (reachable.has(obj.hash)) {
        rawBytes += obj.size;
        // Educational delta simulation: 40% compression for blobs, 60% for trees/commits
        const compressionRate = obj.type === 'blob' ? 0.6 : 0.4;
        const packedSize = Math.max(8, Math.floor(obj.size * compressionRate));
        packedBytes += packedSize;

        packedObjects.set(obj.hash, {
          hash: obj.hash,
          type: obj.type,
          isDelta: obj.type === 'blob',
          rawSize: obj.size,
          packedSize,
        });
      }
    }

    const packfileId = `pack-${Date.now().toString(16)}`;
    this.activePackfile = {
      id: packfileId,
      objects: packedObjects,
      totalObjects: packedObjects.size,
      totalSize: packedBytes,
    };

    const savingsPercent = rawBytes > 0 ? Math.round(((rawBytes - packedBytes) / rawBytes) * 100) : 0;

    return {
      reachableCount: reachable.size,
      unreachableCount,
      packedObjectsCount: packedObjects.size,
      rawBytes,
      packedBytes,
      savingsPercent,
    };
  }
}
