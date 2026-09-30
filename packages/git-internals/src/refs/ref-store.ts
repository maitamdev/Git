export interface GitRef {
  name: string; // e.g. "refs/heads/main", "refs/tags/v1.0.0"
  hash: string; // 40-char SHA-1
}

export class GitRefStore {
  private refs: Map<string, string> = new Map();
  private symbolicRefs: Map<string, string> = new Map();

  constructor() {
    // Default repository HEAD points to refs/heads/main
    this.symbolicRefs.set('HEAD', 'refs/heads/main');
  }

  public setRef(name: string, hash: string): void {
    const canonicalName = this.canonicalizeRefName(name);
    this.refs.set(canonicalName, hash);
  }

  public getRef(name: string): string | null {
    const canonicalName = this.canonicalizeRefName(name);
    if (this.refs.has(canonicalName)) {
      return this.refs.get(canonicalName)!;
    }
    // Check if it's a symbolic ref
    if (this.symbolicRefs.has(name)) {
      const target = this.symbolicRefs.get(name)!;
      return this.getRef(target);
    }
    return null;
  }

  public setSymbolicRef(name: string, target: string): void {
    const canonicalTarget = this.canonicalizeRefName(target);
    this.symbolicRefs.set(name, canonicalTarget);
  }

  public getSymbolicRef(name: string): string | null {
    return this.symbolicRefs.get(name) || null;
  }

  public deleteRef(name: string): boolean {
    const canonicalName = this.canonicalizeRefName(name);
    return this.refs.delete(canonicalName);
  }

  public listRefs(): GitRef[] {
    return Array.from(this.refs.entries()).map(([name, hash]) => ({ name, hash }));
  }

  public canonicalizeRefName(name: string): string {
    if (name.startsWith('refs/')) return name;
    if (name === 'HEAD') return 'HEAD';
    // Assume branch under refs/heads/
    return `refs/heads/${name}`;
  }

  public clear(): void {
    this.refs.clear();
    this.symbolicRefs.clear();
    this.symbolicRefs.set('HEAD', 'refs/heads/main');
  }
}
