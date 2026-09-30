import { GitObject, GitObjectType, TreeEntry, GitSignature } from './object-types';
import { GitObjectHasher } from '@git-academy/git-engine';

export class GitObjectSerializer {
  public static createBlob(content: string): GitObject {
    const type: GitObjectType = 'blob';
    const size = content.length;
    const raw = `${type} ${size}\0${content}`;
    const hash = GitObjectHasher.hash(raw);
    return { hash, type, size, content, raw };
  }

  public static createTree(entries: TreeEntry[]): GitObject {
    const type: GitObjectType = 'tree';
    const sorted = [...entries].sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
    const lines = sorted.map((e) => `${e.mode} ${e.type} ${e.hash}\t${e.path}`);
    const content = lines.join('\n');
    const size = content.length;
    const raw = `${type} ${size}\0${content}`;
    const hash = GitObjectHasher.hash(raw);
    return { hash, type, size, content, raw };
  }

  public static createCommit(params: {
    treeHash: string;
    parentHashes: string[];
    author: GitSignature;
    committer?: GitSignature;
    message: string;
  }): GitObject {
    const type: GitObjectType = 'commit';
    const committer = params.committer || params.author;
    const lines: string[] = [
      `tree ${params.treeHash}`,
      ...params.parentHashes.map((p) => `parent ${p}`),
      `author ${params.author.name} <${params.author.email}> ${params.author.timestamp}`,
      `committer ${committer.name} <${committer.email}> ${committer.timestamp}`,
      '',
      params.message.trim(),
    ];
    const content = lines.join('\n');
    const size = content.length;
    const raw = `${type} ${size}\0${content}`;
    const hash = GitObjectHasher.hash(raw);
    return { hash, type, size, content, raw };
  }

  public static createTag(params: {
    targetHash: string;
    targetType: string;
    tagName: string;
    tagger: GitSignature;
    message: string;
  }): GitObject {
    const type: GitObjectType = 'tag';
    const lines: string[] = [
      `object ${params.targetHash}`,
      `type ${params.targetType}`,
      `tag ${params.tagName}`,
      `tagger ${params.tagger.name} <${params.tagger.email}> ${params.tagger.timestamp}`,
      '',
      params.message.trim(),
    ];
    const content = lines.join('\n');
    const size = content.length;
    const raw = `${type} ${size}\0${content}`;
    const hash = GitObjectHasher.hash(raw);
    return { hash, type, size, content, raw };
  }

  public static parseObject(raw: string): GitObject {
    const nullIdx = raw.indexOf('\0');
    if (nullIdx === -1) {
      throw new Error('Corrupted Git object format: missing null terminator');
    }
    const header = raw.slice(0, nullIdx);
    const content = raw.slice(nullIdx + 1);
    const [typeStr, sizeStr] = header.split(' ');
    const type = typeStr as GitObjectType;
    const size = parseInt(sizeStr, 10);
    const hash = GitObjectHasher.hash(raw);
    return { hash, type, size, content, raw };
  }

  public static parseTree(content: string): TreeEntry[] {
    if (!content.trim()) return [];
    const entries: TreeEntry[] = [];
    const lines = content.split('\n');
    for (const line of lines) {
      if (!line.trim()) continue;
      const tabIdx = line.indexOf('\t');
      if (tabIdx === -1) continue;
      const meta = line.slice(0, tabIdx);
      const path = line.slice(tabIdx + 1);
      const [mode, type, hash] = meta.split(' ');
      entries.push({
        mode,
        type: type as 'blob' | 'tree',
        hash,
        path,
      });
    }
    return entries;
  }

  public static parseCommit(content: string): {
    treeHash: string;
    parentHashes: string[];
    author: { name: string; email: string; timestamp: number };
    committer: { name: string; email: string; timestamp: number };
    message: string;
  } {
    const lines = content.split('\n');
    let treeHash = '';
    const parentHashes: string[] = [];
    let author = { name: '', email: '', timestamp: 0 };
    let committer = { name: '', email: '', timestamp: 0 };
    let msgIndex = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line === '') {
        msgIndex = i + 1;
        break;
      }
      if (line.startsWith('tree ')) {
        treeHash = line.slice(5).trim();
      } else if (line.startsWith('parent ')) {
        parentHashes.push(line.slice(7).trim());
      } else if (line.startsWith('author ')) {
        const match = line.slice(7).match(/^(.*?)\s+<([^>]+)>\s+(\d+)/);
        if (match) {
          author = { name: match[1], email: match[2], timestamp: parseInt(match[3], 10) };
        }
      } else if (line.startsWith('committer ')) {
        const match = line.slice(10).match(/^(.*?)\s+<([^>]+)>\s+(\d+)/);
        if (match) {
          committer = { name: match[1], email: match[2], timestamp: parseInt(match[3], 10) };
        }
      }
    }

    const message = lines.slice(msgIndex).join('\n');
    return { treeHash, parentHashes, author, committer, message };
  }
}
