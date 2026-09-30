export type GitObjectType = 'blob' | 'tree' | 'commit' | 'tag';

export interface GitSignature {
  name: string;
  email: string;
  timestamp: number;
}

export interface TreeEntry {
  mode: string; // e.g. '100644' (normal file), '100755' (executable), '040000' (directory/tree)
  type: 'blob' | 'tree';
  hash: string;
  path: string;
}

export interface GitObject {
  hash: string;
  type: GitObjectType;
  size: number;
  content: string; // decoded text representation
  raw: string;     // format: `${type} ${size}\0${content}`
}
