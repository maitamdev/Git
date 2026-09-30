export type RefType = 'branch' | 'remote' | 'tag' | 'symref';

export interface GitReference {
  name: string; // e.g. "refs/heads/main", "refs/remotes/origin/main", "refs/tags/v1.0", "HEAD"
  target: string; // commit hash or symbolic target (e.g. "ref: refs/heads/main")
  type: RefType;
}

export class RefManager {
  private refs: Map<string, GitReference> = new Map();

  constructor() {
    // Default symref HEAD -> refs/heads/main
    this.setSymbolicRef('HEAD', 'refs/heads/main');
  }

  public normalizeRefName(name: string, type?: RefType): string {
    if (name === 'HEAD') return 'HEAD';
    if (name.startsWith('refs/')) return name;
    if (type === 'remote' || name.startsWith('origin/')) {
      return `refs/remotes/${name}`;
    }
    if (type === 'tag' || name.startsWith('v') || name.startsWith('tag-')) {
      return `refs/tags/${name}`;
    }
    return `refs/heads/${name}`;
  }

  public getRef(name: string): GitReference | undefined {
    const norm = this.normalizeRefName(name);
    return this.refs.get(norm) || this.refs.get(name);
  }

  public setRef(name: string, target: string, type: RefType = 'branch'): GitReference {
    const norm = this.normalizeRefName(name, type);
    const ref: GitReference = { name: norm, target, type };
    this.refs.set(norm, ref);
    return ref;
  }

  public setSymbolicRef(name: string, targetRef: string): GitReference {
    const normTarget = this.normalizeRefName(targetRef);
    const ref: GitReference = {
      name,
      target: `ref: ${normTarget}`,
      type: 'symref',
    };
    this.refs.set(name, ref);
    return ref;
  }

  public resolveRef(name: string, depth = 0): string | null {
    if (depth > 10) return null; // Avoid circular symrefs
    const ref = this.getRef(name);
    if (!ref) return null;

    if (ref.target.startsWith('ref: ')) {
      const symTarget = ref.target.substring(5).trim();
      return this.resolveRef(symTarget, depth + 1);
    }

    return ref.target;
  }

  public deleteRef(name: string): boolean {
    const norm = this.normalizeRefName(name);
    return this.refs.delete(norm) || this.refs.delete(name);
  }

  public listHeads(): GitReference[] {
    return Array.from(this.refs.values()).filter((r) => r.name.startsWith('refs/heads/'));
  }

  public listRemotes(): GitReference[] {
    return Array.from(this.refs.values()).filter((r) => r.name.startsWith('refs/remotes/'));
  }

  public listTags(): GitReference[] {
    return Array.from(this.refs.values()).filter((r) => r.name.startsWith('refs/tags/'));
  }

  public getAllRefs(): Record<string, string> {
    const res: Record<string, string> = {};
    for (const [k, v] of this.refs.entries()) {
      res[k] = v.target;
    }
    return res;
  }
}
