import { FileState, FileStatus } from '@git-academy/shared';

export interface VFile {
  path: string; // normalized relative path, e.g. "index.html" or "src/app.js"
  content: string;
  updatedAt: number;
}

export interface GitIgnoreMatch {
  line: number;
  pattern: string;
}

export class VirtualFileSystem {
  private files: Map<string, VFile> = new Map();
  private directories: Set<string> = new Set();
  private onChangeCallbacks: ((path: string, type: 'create' | 'modify' | 'delete') => void)[] = [];

  constructor(initialFiles?: { path: string; content: string }[]) {
    if (initialFiles) {
      for (const f of initialFiles) {
        this.writeFile(f.path, f.content);
      }
    }
  }

  public onFileChange(cb: (path: string, type: 'create' | 'modify' | 'delete') => void): () => void {
    this.onChangeCallbacks.push(cb);
    return () => {
      this.onChangeCallbacks = this.onChangeCallbacks.filter((fn) => fn !== cb);
    };
  }

  private notify(path: string, type: 'create' | 'modify' | 'delete'): void {
    for (const cb of this.onChangeCallbacks) {
      try {
        cb(path, type);
      } catch (err) {
        console.error('Error in VFS onChange callback:', err);
      }
    }
  }

  public normalizePath(rawPath: string): string {
    let p = rawPath.replace(/\\/g, '/').trim();
    if (p.startsWith('./')) {
      p = p.slice(2);
    }
    if (p.startsWith('/')) {
      p = p.slice(1);
    }
    const parts = p.split('/');
    const resolved: string[] = [];
    for (const part of parts) {
      if (!part || part === '.') continue;
      if (part === '..') {
        resolved.pop();
      } else {
        resolved.push(part);
      }
    }
    return resolved.join('/');
  }

  public createDirectory(rawPath: string): void {
    const dir = this.normalizePath(rawPath);
    if (dir) {
      this.directories.add(dir);
      const parts = dir.split('/');
      let curr = '';
      for (const part of parts) {
        curr = curr ? `${curr}/${part}` : part;
        this.directories.add(curr);
      }
    }
  }

  public isDirectory(rawPath: string): boolean {
    const path = this.normalizePath(rawPath);
    if (this.directories.has(path)) return true;
    for (const f of this.files.keys()) {
      if (f.startsWith(`${path}/`)) return true;
    }
    return false;
  }

  public listDirectories(): string[] {
    return Array.from(this.directories).sort();
  }

  public writeFile(rawPath: string, content: string): VFile {
    const path = this.normalizePath(rawPath);
    const isNew = !this.files.has(path);

    // Auto-create parent directories
    const lastSlash = path.lastIndexOf('/');
    if (lastSlash > 0) {
      this.createDirectory(path.substring(0, lastSlash));
    }

    const file: VFile = {
      path,
      content,
      updatedAt: Date.now(),
    };
    this.files.set(path, file);
    this.notify(path, isNew ? 'create' : 'modify');
    return file;
  }

  public appendFile(rawPath: string, content: string): VFile {
    const path = this.normalizePath(rawPath);
    const existing = this.readFile(path);
    const separator = existing !== null && existing.length > 0 && !existing.endsWith('\n') ? '\n' : '';
    const newContent = existing !== null ? existing + separator + content : content;
    return this.writeFile(path, newContent);
  }

  public readFile(rawPath: string): string | null {
    const path = this.normalizePath(rawPath);
    const file = this.files.get(path);
    return file ? file.content : null;
  }

  /** Return the last matching root .gitignore rule for a path. */
  public getIgnoreRule(rawPath: string): GitIgnoreMatch | null {
    const path = this.normalizePath(rawPath);
    const ignoreFile = this.readFile('.gitignore');
    if (!path || ignoreFile === null) return null;

    const segments = path.split('/');
    let match: GitIgnoreMatch | null = null;
    const lines = ignoreFile.split(/\r?\n/);

    for (let index = 0; index < lines.length; index++) {
      const rawPattern = lines[index].trim();
      if (!rawPattern || rawPattern.startsWith('#') || rawPattern.startsWith('!')) continue;

      const directoryOnly = rawPattern.endsWith('/');
      const anchored = rawPattern.startsWith('/');
      const pattern = rawPattern.replace(/^\//, '').replace(/\/$/, '');
      if (!pattern) continue;

      const patternRegex = this.globToRegExp(pattern);
      let matched = false;

      if (anchored || pattern.includes('/')) {
        matched = patternRegex.test(path);
        if (!matched && directoryOnly) matched = patternRegex.test(`${path}/`);
        if (!matched && directoryOnly) {
          for (let i = 1; i < segments.length; i++) {
            if (patternRegex.test(segments.slice(0, i).join('/'))) {
              matched = true;
              break;
            }
          }
        }
      } else {
        const limit = directoryOnly ? segments.length - 1 : segments.length;
        for (let i = 0; i < Math.max(limit, 1); i++) {
          const segmentMatches = patternRegex.test(segments[i]);
          if (segmentMatches && (!directoryOnly || i < segments.length - 1 || this.isDirectory(path))) {
            matched = true;
            break;
          }
        }
      }

      if (matched) match = { line: index + 1, pattern: rawPattern };
    }

    return match;
  }

  private globToRegExp(pattern: string): RegExp {
    const escaped = pattern.replace(/[|\\{}()[\]^$+?.]/g, '\\$&').replace(/\*/g, '[^/]*');
    return new RegExp(`^${escaped}$`);
  }

  public deleteFile(rawPath: string): boolean {
    const path = this.normalizePath(rawPath);
    const existed = this.files.delete(path);
    if (existed) {
      this.notify(path, 'delete');
    }
    return existed;
  }

  public renameFile(fromPath: string, toPath: string): boolean {
    const from = this.normalizePath(fromPath);
    const to = this.normalizePath(toPath);
    const content = this.readFile(from);
    if (content === null) return false;

    this.deleteFile(from);
    this.writeFile(to, content);
    return true;
  }

  public exists(rawPath: string): boolean {
    const path = this.normalizePath(rawPath);
    return this.files.has(path) || this.isDirectory(path);
  }

  public listFiles(prefix = ''): string[] {
    const normPrefix = prefix ? this.normalizePath(prefix) : '';
    const all = Array.from(this.files.keys());
    if (!normPrefix) {
      return all.sort();
    }
    return all
      .filter((p) => p.startsWith(normPrefix))
      .sort();
  }

  public getAllFiles(): { path: string; content: string }[] {
    return Array.from(this.files.values()).map((f) => ({
      path: f.path,
      content: f.content,
    }));
  }

  public clear(): void {
    this.files.clear();
    this.directories.clear();
  }

  public clone(): VirtualFileSystem {
    const newFs = new VirtualFileSystem();
    for (const [path, file] of this.files.entries()) {
      newFs.writeFile(path, file.content);
    }
    for (const d of this.directories) {
      newFs.createDirectory(d);
    }
    return newFs;
  }

  /**
   * Computes file statuses by comparing Working Directory, Staging Area, and HEAD Tree.
   * If a file has conflict markers (<<<<<<< HEAD) or active merge conflicts, it is tagged 'conflict'.
   */
  public computeFileStates(
    stagingArea: FileState[],
    headTree: Record<string, string>,
    unresolvedConflictPaths: string[] = []
  ): {
    workingTreeStates: FileState[];
    stagingStates: FileState[];
    untrackedFiles: string[];
    modifiedUnstaged: string[];
    stagedFiles: string[];
    conflictedFiles: string[];
  } {
    const stagingMap = new Map<string, string>();
    for (const item of stagingArea) {
      stagingMap.set(item.path, item.content);
    }

    const workingFiles = this.getAllFiles();
    const workingMap = new Map<string, string>();
    for (const wf of workingFiles) {
      workingMap.set(wf.path, wf.content);
    }

    const allPaths = new Set<string>([
      ...Array.from(workingMap.keys()),
      ...Array.from(stagingMap.keys()),
      ...Object.keys(headTree),
    ]);

    const workingTreeStates: FileState[] = [];
    const stagingStates: FileState[] = [];
    const untrackedFiles: string[] = [];
    const modifiedUnstaged: string[] = [];
    const stagedFiles: string[] = [];
    const conflictedFiles: string[] = [];

    const conflictSet = new Set(unresolvedConflictPaths);

    for (const path of Array.from(allPaths).sort()) {
      const inWorking = workingMap.has(path);
      const inStaging = stagingMap.has(path);
      const inHead = path in headTree;

      const workingContent = workingMap.get(path);
      const stagingContent = stagingMap.get(path);
      const headContent = headTree[path];

      // Check if file content contains git conflict markers
      const hasConflictMarkers =
        workingContent !== undefined &&
        workingContent.includes('<<<<<<<') &&
        workingContent.includes('=======') &&
        workingContent.includes('>>>>>>>');

      const isConflict = conflictSet.has(path) || hasConflictMarkers;

      if (isConflict) {
        conflictedFiles.push(path);
      }

      // Staging status (compared to HEAD)
      if (inStaging) {
        if (!inHead) {
          stagingStates.push({ path, content: stagingContent!, status: 'added', staged: true });
          stagedFiles.push(path);
        } else if (stagingContent !== headContent) {
          stagingStates.push({ path, content: stagingContent!, status: 'modified', staged: true });
          stagedFiles.push(path);
        }
      }

      // Working tree status (compared to staging if staged, else HEAD)
      if (inWorking) {
        if (isConflict) {
          workingTreeStates.push({ path, content: workingContent!, status: 'conflict' });
        } else if (!inStaging && !inHead) {
          // Untracked
          untrackedFiles.push(path);
          workingTreeStates.push({ path, content: workingContent!, status: 'untracked' });
        } else if (inStaging) {
          if (workingContent !== stagingContent) {
            modifiedUnstaged.push(path);
            workingTreeStates.push({ path, content: workingContent!, status: 'modified' });
          } else {
            workingTreeStates.push({ path, content: workingContent!, status: 'unmodified' });
          }
        } else if (inHead) {
          if (workingContent !== headContent) {
            modifiedUnstaged.push(path);
            workingTreeStates.push({ path, content: workingContent!, status: 'modified' });
          } else {
            workingTreeStates.push({ path, content: workingContent!, status: 'unmodified' });
          }
        }
      } else {
        // File exists in head or staging, but deleted in working directory
        if (inHead || inStaging) {
          modifiedUnstaged.push(path);
          workingTreeStates.push({ path, content: '', status: 'deleted' });
        }
      }
    }

    return {
      workingTreeStates,
      stagingStates,
      untrackedFiles,
      modifiedUnstaged,
      stagedFiles,
      conflictedFiles,
    };
  }
}
