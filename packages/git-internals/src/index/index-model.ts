import { GitObjectStore } from '../objects/object-store';
import { GitObjectSerializer } from '../objects/serializer';
import { TreeEntry } from '../objects/object-types';

export interface IndexEntry {
  path: string;
  mode: string; // e.g. "100644"
  hash: string; // blob SHA-1
  stage: 0 | 1 | 2 | 3;
  size: number;
}

export class GitIndex {
  private entriesMap: Map<string, IndexEntry> = new Map();

  public add(entry: IndexEntry): void {
    this.entriesMap.set(entry.path, { ...entry });
  }

  public remove(path: string): boolean {
    return this.entriesMap.delete(path);
  }

  public get(path: string): IndexEntry | null {
    return this.entriesMap.get(path) || null;
  }

  public entries(): IndexEntry[] {
    return Array.from(this.entriesMap.values()).sort((a, b) => a.path.localeCompare(b.path));
  }

  public clear(): void {
    this.entriesMap.clear();
  }

  /**
   * Builds tree objects recursively from flat staged index entries and stores them in ObjectStore.
   * Emulates `git write-tree`.
   */
  public writeTree(objectStore: GitObjectStore): string {
    const entries = this.entries();
    if (entries.length === 0) {
      // Empty tree object
      const emptyTree = GitObjectSerializer.createTree([]);
      objectStore.put(emptyTree);
      return emptyTree.hash;
    }

    // Build directory hierarchy tree
    interface DirNode {
      subdirs: Map<string, DirNode>;
      files: Map<string, IndexEntry>;
    }

    const root: DirNode = { subdirs: new Map(), files: new Map() };

    for (const entry of entries) {
      const parts = entry.path.split('/');
      let curr = root;
      for (let i = 0; i < parts.length - 1; i++) {
        const seg = parts[i];
        if (!curr.subdirs.has(seg)) {
          curr.subdirs.set(seg, { subdirs: new Map(), files: new Map() });
        }
        curr = curr.subdirs.get(seg)!;
      }
      curr.files.set(parts[parts.length - 1], entry);
    }

    function buildNodeTree(node: DirNode): string {
      const treeEntries: TreeEntry[] = [];

      // Process direct files in this directory
      for (const [filename, fileEntry] of node.files.entries()) {
        treeEntries.push({
          mode: fileEntry.mode || '100644',
          type: 'blob',
          hash: fileEntry.hash,
          path: filename,
        });
      }

      // Process subdirectories recursively
      for (const [dirName, subNode] of node.subdirs.entries()) {
        const subTreeHash = buildNodeTree(subNode);
        treeEntries.push({
          mode: '040000',
          type: 'tree',
          hash: subTreeHash,
          path: dirName,
        });
      }

      const treeObj = GitObjectSerializer.createTree(treeEntries);
      objectStore.put(treeObj);
      return treeObj.hash;
    }

    return buildNodeTree(root);
  }
}
