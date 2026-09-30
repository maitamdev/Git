import { describe, it, expect, beforeEach } from 'vitest';
import {
  GitObjectSerializer,
  GitObjectStore,
  GitRefStore,
  GitIndex,
  RevisionResolver,
  GitPlumbingRunner,
  GitGarbageCollector,
} from '../src';

describe('Git Internals - Extended Comprehensive Suite', () => {
  let objectStore: GitObjectStore;
  let refStore: GitRefStore;
  let index: GitIndex;
  let files: Record<string, string>;

  beforeEach(() => {
    objectStore = new GitObjectStore();
    refStore = new GitRefStore();
    index = new GitIndex();
    files = {};
  });

  // =========================================================================
  // 1. Git Object Serialization & Raw Hashing Deep Dive (12 tests)
  // =========================================================================
  describe('Git Object Serialization & Hashing Deep Dive', () => {
    it('hashes empty string with standard git SHA-1 prefix', () => {
      const blob = GitObjectSerializer.createBlob('');
      expect(blob.type).toBe('blob');
      expect(blob.size).toBe(0);
      expect(blob.hash).toHaveLength(40);
      expect(blob.raw).toBe('blob 0\0');
      expect(blob.hash).toBe(blob.hash.toLowerCase());
    });

    it('hashes deterministic Vietnamese Unicode content consistently', () => {
      const content = 'Chào mừng bạn đến với Git Academy Vietnam!\n';
      const b1 = GitObjectSerializer.createBlob(content);
      const b2 = GitObjectSerializer.createBlob(content);

      expect(b1.hash).toBe(b2.hash);
      expect(b1.content).toBe(content);
    });

    it('creates and parses multi-line code blob preserving whitespace', () => {
      const code = 'function main() {\n  const x = 42;\n  return x * 2;\n}\n';
      const blob = GitObjectSerializer.createBlob(code);
      const parsed = GitObjectSerializer.parseObject(blob.raw);

      expect(parsed.type).toBe('blob');
      expect(parsed.content).toBe(code);
      expect(parsed.size).toBe(code.length);
    });

    it('formats tree entries with standard permissions: 100644 normal, 100755 exec, 040000 dir', () => {
      const entries = [
        { mode: '100644', type: 'blob' as const, hash: '1111111111111111111111111111111111111111', path: 'index.html' },
        { mode: '100755', type: 'blob' as const, hash: '2222222222222222222222222222222222222222', path: 'run.sh' },
        { mode: '040000', type: 'tree' as const, hash: '3333333333333333333333333333333333333333', path: 'lib' },
      ];
      const tree = GitObjectSerializer.createTree(entries);
      expect(tree.type).toBe('tree');
      expect(tree.content).toContain('100644 blob 1111111111111111111111111111111111111111\tindex.html');
      expect(tree.content).toContain('100755 blob 2222222222222222222222222222222222222222\trun.sh');
      expect(tree.content).toContain('040000 tree 3333333333333333333333333333333333333333\tlib');
    });

    it('sorts tree entries alphabetically by name', () => {
      const entries = [
        { mode: '100644', type: 'blob' as const, hash: 'aaa', path: 'zebra.txt' },
        { mode: '100644', type: 'blob' as const, hash: 'bbb', path: 'apple.txt' },
        { mode: '100644', type: 'blob' as const, hash: 'ccc', path: 'banana.txt' },
      ];
      const tree = GitObjectSerializer.createTree(entries);
      const parsed = GitObjectSerializer.parseTree(tree.content);

      expect(parsed[0].path).toBe('apple.txt');
      expect(parsed[1].path).toBe('banana.txt');
      expect(parsed[2].path).toBe('zebra.txt');
    });

    it('creates root commit with zero parents', () => {
      const commit = GitObjectSerializer.createCommit({
        treeHash: '4b825dc642cb6eb9a060e54bf8d69288fbee4904',
        parentHashes: [],
        author: { name: 'Founder', email: 'founder@gitacademy.vn', timestamp: 1700000000 },
        message: 'Initial commit\n\nProject setup for Vietnam students.',
      });

      expect(commit.type).toBe('commit');
      expect(commit.content).not.toContain('parent');
      expect(commit.content).toContain('tree 4b825dc642cb6eb9a060e54bf8d69288fbee4904');
      expect(commit.content).toContain('author Founder <founder@gitacademy.vn> 1700000000');
    });

    it('creates merge commit with multiple parent references', () => {
      const parent1 = 'aaaa111122223333444455556666777788889999';
      const parent2 = 'bbbb111122223333444455556666777788889999';
      const commit = GitObjectSerializer.createCommit({
        treeHash: '4b825dc642cb6eb9a060e54bf8d69288fbee4904',
        parentHashes: [parent1, parent2],
        author: { name: 'Lead Dev', email: 'lead@vn.edu', timestamp: 1700000100 },
        message: 'Merge branch "feature/matrix-ci" into main',
      });

      expect(commit.content).toContain(`parent ${parent1}`);
      expect(commit.content).toContain(`parent ${parent2}`);
    });

    it('serializes and parses annotated tags correctly', () => {
      const targetCommit = 'cccc111122223333444455556666777788889999';
      const tag = GitObjectSerializer.createTag({
        targetHash: targetCommit,
        targetType: 'commit',
        tagName: 'v1.0.0',
        tagger: { name: 'Release Bot', email: 'bot@vn.edu', timestamp: 1700000200 },
        message: 'Production release 1.0.0',
      });

      expect(tag.type).toBe('tag');
      expect(tag.content).toContain(`object ${targetCommit}`);
      expect(tag.content).toContain('type commit');
      expect(tag.content).toContain('tag v1.0.0');
      expect(tag.content).toContain('tagger Release Bot <bot@vn.edu> 1700000200');
      expect(tag.content).toContain('Production release 1.0.0');
    });

    it('differentiates two commits with same tree but different timestamps', () => {
      const t = '4b825dc642cb6eb9a060e54bf8d69288fbee4904';
      const c1 = GitObjectSerializer.createCommit({
        treeHash: t,
        parentHashes: [],
        author: { name: 'Dev', email: 'dev@vn', timestamp: 1000 },
        message: 'same message',
      });
      const c2 = GitObjectSerializer.createCommit({
        treeHash: t,
        parentHashes: [],
        author: { name: 'Dev', email: 'dev@vn', timestamp: 2000 },
        message: 'same message',
      });

      expect(c1.hash).not.toBe(c2.hash);
    });

    it('differentiates two commits with same tree and time but different messages', () => {
      const t = '4b825dc642cb6eb9a060e54bf8d69288fbee4904';
      const c1 = GitObjectSerializer.createCommit({
        treeHash: t,
        parentHashes: [],
        author: { name: 'Dev', email: 'dev@vn', timestamp: 1000 },
        message: 'feature: version A',
      });
      const c2 = GitObjectSerializer.createCommit({
        treeHash: t,
        parentHashes: [],
        author: { name: 'Dev', email: 'dev@vn', timestamp: 1000 },
        message: 'feature: version B',
      });

      expect(c1.hash).not.toBe(c2.hash);
    });

    it('parses raw commit back into its structural components', () => {
      const rawCommit = [
        'tree 4b825dc642cb6eb9a060e54bf8d69288fbee4904',
        'parent 1111222233334444555566667777888899990000',
        'author Alice Smith <alice@example.com> 1600000000',
        'committer Alice Smith <alice@example.com> 1600000000',
        '',
        'refactor: optimize parser performance',
      ].join('\n');

      const parsed = GitObjectSerializer.parseCommit(rawCommit);
      expect(parsed.treeHash).toBe('4b825dc642cb6eb9a060e54bf8d69288fbee4904');
      expect(parsed.parentHashes).toEqual(['1111222233334444555566667777888899990000']);
      expect(parsed.author.name).toBe('Alice Smith');
      expect(parsed.author.email).toBe('alice@example.com');
      expect(parsed.message).toBe('refactor: optimize parser performance');
    });

    it('throws error when parsing corrupted raw object missing null delimiter', () => {
      expect(() => {
        GitObjectSerializer.parseObject('blob 12CorruptedContentWithoutNullByte');
      }).toThrow();
    });
  });

  // =========================================================================
  // 2. Git Object Store & Sharding Paths (10 tests)
  // =========================================================================
  describe('Git Object Store Operations & Statistics', () => {
    it('stores and retrieves blob by full 40-char SHA-1', () => {
      const blob = GitObjectSerializer.createBlob('hello world');
      objectStore.put(blob);
      expect(objectStore.has(blob.hash)).toBe(true);
      expect(objectStore.get(blob.hash)?.content).toBe('hello world');
    });

    it('resolves unique object with short prefix (7 characters)', () => {
      const blob = GitObjectSerializer.createBlob('short prefix test');
      objectStore.put(blob);
      const prefix = blob.hash.slice(0, 7);
      const found = objectStore.get(prefix);
      expect(found).not.toBeNull();
      expect(found?.hash).toBe(blob.hash);
    });

    it('returns null when prefix length is less than 4 characters', () => {
      const blob = GitObjectSerializer.createBlob('prefix length limit');
      objectStore.put(blob);
      expect(objectStore.get(blob.hash.slice(0, 3))).toBeNull();
    });

    it('computes correct loose object filesystem path: .git/objects/xx/yyyy...', () => {
      const blob = GitObjectSerializer.createBlob('path test');
      const loosePath = objectStore.getLoosePath(blob.hash);
      const dir = blob.hash.substring(0, 2);
      const filename = blob.hash.substring(2);
      expect(loosePath).toBe(`.git/objects/${dir}/${filename}`);
    });

    it('lists all stored objects as array', () => {
      const b1 = GitObjectSerializer.createBlob('1');
      const b2 = GitObjectSerializer.createBlob('2');
      objectStore.put(b1);
      objectStore.put(b2);

      const list = objectStore.list();
      expect(list).toHaveLength(2);
      expect(list.some((o) => o.hash === b1.hash)).toBe(true);
      expect(list.some((o) => o.hash === b2.hash)).toBe(true);
    });

    it('aggregates accurate object type statistics via getStats()', () => {
      const b1 = GitObjectSerializer.createBlob('file');
      const t1 = GitObjectSerializer.createTree([{ mode: '100644', type: 'blob', hash: b1.hash, path: 'a.txt' }]);
      const c1 = GitObjectSerializer.createCommit({
        treeHash: t1.hash,
        parentHashes: [],
        author: { name: 'A', email: 'a@v', timestamp: 1 },
        message: 'm',
      });
      const tag1 = GitObjectSerializer.createTag({
        targetHash: c1.hash,
        targetType: 'commit',
        tagName: 'v0.1',
        tagger: { name: 'A', email: 'a@v', timestamp: 1 },
        message: 'release',
      });

      objectStore.put(b1);
      objectStore.put(t1);
      objectStore.put(c1);
      objectStore.put(tag1);

      const stats = objectStore.getStats();
      expect(stats.totalCount).toBe(4);
      expect(stats.blobCount).toBe(1);
      expect(stats.treeCount).toBe(1);
      expect(stats.commitCount).toBe(1);
      expect(stats.tagCount).toBe(1);
    });

    it('returns false for has() when object is absent', () => {
      expect(objectStore.has('ffff000011112222333344445555666677778888')).toBe(false);
    });

    it('clears all objects upon calling clear()', () => {
      objectStore.put(GitObjectSerializer.createBlob('temp'));
      expect(objectStore.list()).toHaveLength(1);
      objectStore.clear();
      expect(objectStore.list()).toHaveLength(0);
      expect(objectStore.getStats().totalCount).toBe(0);
    });

    it('handles idempotent puts of identical objects without duplicate keys', () => {
      const blob = GitObjectSerializer.createBlob('idempotent');
      objectStore.put(blob);
      objectStore.put(blob);
      expect(objectStore.list()).toHaveLength(1);
    });

    it('returns null when multiple objects share an ambiguous short prefix', () => {
      // Create artificial objects with shared prefix if possible or test ambiguous fallback
      const obj1 = { hash: 'abcd111122223333444455556666777788889999', type: 'blob' as const, size: 5, content: 'a', raw: 'a' };
      const obj2 = { hash: 'abcd222233334444555566667777888899990000', type: 'blob' as const, size: 5, content: 'b', raw: 'b' };
      objectStore.put(obj1);
      objectStore.put(obj2);

      // Ambiguous prefix "abcd" matches both obj1 and obj2
      expect(objectStore.get('abcd')).toBeNull();
      // Unambiguous prefix resolves correctly
      expect(objectStore.get('abcd1')?.hash).toBe(obj1.hash);
      expect(objectStore.get('abcd2')?.hash).toBe(obj2.hash);
    });
  });

  // =========================================================================
  // 3. Git Ref Store & Symbolic Head Resolution (10 tests)
  // =========================================================================
  describe('Git Ref Store & Symbolic References', () => {
    it('initializes HEAD pointing symbolically to refs/heads/main', () => {
      expect(refStore.getSymbolicRef('HEAD')).toBe('refs/heads/main');
    });

    it('canonicalizes branch name "dev" to "refs/heads/dev"', () => {
      expect(refStore.canonicalizeRefName('dev')).toBe('refs/heads/dev');
      expect(refStore.canonicalizeRefName('refs/heads/dev')).toBe('refs/heads/dev');
      expect(refStore.canonicalizeRefName('refs/tags/v1.0')).toBe('refs/tags/v1.0');
      expect(refStore.canonicalizeRefName('HEAD')).toBe('HEAD');
    });

    it('sets and retrieves direct branch refs', () => {
      const hash = '1234567890abcdef1234567890abcdef12345678';
      refStore.setRef('main', hash);

      expect(refStore.getRef('refs/heads/main')).toBe(hash);
      expect(refStore.getRef('main')).toBe(hash);
    });

    it('resolves HEAD transitively to target branch commit hash', () => {
      const commitHash = 'feedbeef00112233445566778899aabbccddeeff';
      refStore.setRef('refs/heads/main', commitHash);

      expect(refStore.getRef('HEAD')).toBe(commitHash);
    });

    it('switches branch by updating symbolic ref HEAD', () => {
      const mainHash = '1111111111111111111111111111111111111111';
      const featHash = '2222222222222222222222222222222222222222';
      refStore.setRef('refs/heads/main', mainHash);
      refStore.setRef('refs/heads/feature', featHash);

      refStore.setSymbolicRef('HEAD', 'feature');
      expect(refStore.getSymbolicRef('HEAD')).toBe('refs/heads/feature');
      expect(refStore.getRef('HEAD')).toBe(featHash);
    });

    it('lists all registered refs with their canonical names', () => {
      refStore.setRef('refs/heads/main', 'h1');
      refStore.setRef('refs/heads/feat', 'h2');
      refStore.setRef('refs/tags/v1.0', 'h3');

      const refs = refStore.listRefs();
      expect(refs).toHaveLength(3);
      expect(refs.some((r) => r.name === 'refs/tags/v1.0' && r.hash === 'h3')).toBe(true);
    });

    it('deletes an existing branch ref', () => {
      refStore.setRef('refs/heads/temp-branch', 'temp-hash');
      expect(refStore.getRef('temp-branch')).toBe('temp-hash');

      const deleted = refStore.deleteRef('temp-branch');
      expect(deleted).toBe(true);
      expect(refStore.getRef('temp-branch')).toBeNull();
    });

    it('returns false when deleting a non-existent ref', () => {
      expect(refStore.deleteRef('refs/heads/does-not-exist')).toBe(false);
    });

    it('resets to clean state on clear() with HEAD restored to main', () => {
      refStore.setRef('feature', 'abc');
      refStore.setSymbolicRef('HEAD', 'feature');
      refStore.clear();

      expect(refStore.listRefs()).toHaveLength(0);
      expect(refStore.getSymbolicRef('HEAD')).toBe('refs/heads/main');
    });

    it('handles remote tracking refs under refs/remotes/origin/*', () => {
      const originHash = '9999888877776666555544443333222211110000';
      refStore.setRef('refs/remotes/origin/main', originHash);

      expect(refStore.getRef('refs/remotes/origin/main')).toBe(originHash);
      expect(refStore.listRefs().some((r) => r.name === 'refs/remotes/origin/main')).toBe(true);
    });
  });

  // =========================================================================
  // 4. Git Index & Hierarchical writeTree Simulation (10 tests)
  // =========================================================================
  describe('Git Index & Hierarchical writeTree', () => {
    it('adds and retrieves entries from staged index', () => {
      index.add({
        path: 'src/app.ts',
        mode: '100644',
        hash: 'hash-app',
        stage: 0,
        size: 150,
      });

      expect(index.get('src/app.ts')).toBeDefined();
      expect(index.get('src/app.ts')?.hash).toBe('hash-app');
    });

    it('overwrites previous staged entry when adding same path', () => {
      index.add({ path: 'file.txt', mode: '100644', hash: 'hash1', stage: 0, size: 10 });
      index.add({ path: 'file.txt', mode: '100644', hash: 'hash2', stage: 0, size: 20 });

      expect(index.entries()).toHaveLength(1);
      expect(index.get('file.txt')?.hash).toBe('hash2');
      expect(index.get('file.txt')?.size).toBe(20);
    });

    it('removes staged entries from index', () => {
      index.add({ path: 'to-remove.txt', mode: '100644', hash: 'h', stage: 0, size: 5 });
      expect(index.get('to-remove.txt')).not.toBeNull();

      const removed = index.remove('to-remove.txt');
      expect(removed).toBe(true);
      expect(index.get('to-remove.txt')).toBeNull();
    });

    it('returns empty tree hash when index is empty', () => {
      const rootHash = index.writeTree(objectStore);
      expect(rootHash).toHaveLength(40);
      expect(objectStore.has(rootHash)).toBe(true);
      expect(objectStore.get(rootHash)?.type).toBe('tree');
    });

    it('builds flat tree when all files are in root directory', () => {
      const b1 = GitObjectSerializer.createBlob('A');
      const b2 = GitObjectSerializer.createBlob('B');
      objectStore.put(b1);
      objectStore.put(b2);

      index.add({ path: 'a.txt', mode: '100644', hash: b1.hash, stage: 0, size: b1.size });
      index.add({ path: 'b.txt', mode: '100644', hash: b2.hash, stage: 0, size: b2.size });

      const rootHash = index.writeTree(objectStore);
      const rootObj = objectStore.get(rootHash);
      expect(rootObj).toBeDefined();

      const parsed = GitObjectSerializer.parseTree(rootObj!.content);
      expect(parsed).toHaveLength(2);
      expect(parsed[0].path).toBe('a.txt');
      expect(parsed[1].path).toBe('b.txt');
    });

    it('constructs multi-level nested subtrees recursively', () => {
      const b = GitObjectSerializer.createBlob('export const Button = () => null;');
      objectStore.put(b);

      index.add({
        path: 'src/components/ui/Button.tsx',
        mode: '100644',
        hash: b.hash,
        stage: 0,
        size: b.size,
      });

      const rootHash = index.writeTree(objectStore);
      const rootTree = objectStore.get(rootHash)!;
      const rootEntries = GitObjectSerializer.parseTree(rootTree.content);

      // Root has 'src' tree
      const srcEntry = rootEntries.find((e) => e.path === 'src');
      expect(srcEntry).toBeDefined();
      expect(srcEntry?.type).toBe('tree');

      // 'src' has 'components' tree
      const srcTree = objectStore.get(srcEntry!.hash)!;
      const srcEntries = GitObjectSerializer.parseTree(srcTree.content);
      const compEntry = srcEntries.find((e) => e.path === 'components');
      expect(compEntry).toBeDefined();

      // 'components' has 'ui' tree
      const compTree = objectStore.get(compEntry!.hash)!;
      const compEntries = GitObjectSerializer.parseTree(compTree.content);
      const uiEntry = compEntries.find((e) => e.path === 'ui');
      expect(uiEntry).toBeDefined();

      // 'ui' has 'Button.tsx' blob
      const uiTree = objectStore.get(uiEntry!.hash)!;
      const uiEntries = GitObjectSerializer.parseTree(uiTree.content);
      const btnEntry = uiEntries.find((e) => e.path === 'Button.tsx');
      expect(btnEntry).toBeDefined();
      expect(btnEntry?.type).toBe('blob');
      expect(btnEntry?.hash).toBe(b.hash);
    });

    it('is deterministic: repeated writeTree yields identical root hash', () => {
      const b = GitObjectSerializer.createBlob('stable content');
      objectStore.put(b);
      index.add({ path: 'src/index.ts', mode: '100644', hash: b.hash, stage: 0, size: b.size });

      const h1 = index.writeTree(objectStore);
      const h2 = index.writeTree(objectStore);
      expect(h1).toBe(h2);
    });

    it('sorts index entries alphabetically by path', () => {
      index.add({ path: 'zebra.js', mode: '100644', hash: '1', stage: 0, size: 1 });
      index.add({ path: 'alpha.js', mode: '100644', hash: '2', stage: 0, size: 1 });
      index.add({ path: 'beta.js', mode: '100644', hash: '3', stage: 0, size: 1 });

      const sorted = index.entries();
      expect(sorted[0].path).toBe('alpha.js');
      expect(sorted[1].path).toBe('beta.js');
      expect(sorted[2].path).toBe('zebra.js');
    });

    it('clears all entries with clear()', () => {
      index.add({ path: 'a.js', mode: '100644', hash: 'h', stage: 0, size: 1 });
      expect(index.entries()).toHaveLength(1);
      index.clear();
      expect(index.entries()).toHaveLength(0);
    });

    it('preserves file staging stages (0: normal, 1: ancestor, 2: ours, 3: theirs)', () => {
      index.add({ path: 'conflict.txt', mode: '100644', hash: 'base-hash', stage: 1, size: 50 });
      expect(index.get('conflict.txt')?.stage).toBe(1);

      index.add({ path: 'conflict.txt', mode: '100644', hash: 'ours-hash', stage: 2, size: 60 });
      expect(index.get('conflict.txt')?.stage).toBe(2);

      index.add({ path: 'conflict.txt', mode: '100644', hash: 'theirs-hash', stage: 3, size: 70 });
      expect(index.get('conflict.txt')?.stage).toBe(3);
    });
  });

  // =========================================================================
  // 5. Revision Resolver Advanced Traversal (10 tests)
  // =========================================================================
  describe('Revision Resolver Advanced Traversal', () => {
    let c0Hash: string;
    let c1Hash: string;
    let c2Hash: string;
    let c3Hash: string;
    let cBranchHash: string;
    let mergeCommitHash: string;

    beforeEach(() => {
      // Build commit ancestry tree:
      // c0 -> c1 -> c2 -> c3
      //        \-> cBranch -/ (merge commit into c3)
      const t = '4b825dc642cb6eb9a060e54bf8d69288fbee4904';

      const c0 = GitObjectSerializer.createCommit({
        treeHash: t,
        parentHashes: [],
        author: { name: 'A', email: 'a@v', timestamp: 1 },
        message: 'c0 initial',
      });
      objectStore.put(c0);
      c0Hash = c0.hash;

      const c1 = GitObjectSerializer.createCommit({
        treeHash: t,
        parentHashes: [c0Hash],
        author: { name: 'A', email: 'a@v', timestamp: 2 },
        message: 'c1 first',
      });
      objectStore.put(c1);
      c1Hash = c1.hash;

      const c2 = GitObjectSerializer.createCommit({
        treeHash: t,
        parentHashes: [c1Hash],
        author: { name: 'A', email: 'a@v', timestamp: 3 },
        message: 'c2 second',
      });
      objectStore.put(c2);
      c2Hash = c2.hash;

      const cBranch = GitObjectSerializer.createCommit({
        treeHash: t,
        parentHashes: [c1Hash],
        author: { name: 'B', email: 'b@v', timestamp: 4 },
        message: 'cBranch feature',
      });
      objectStore.put(cBranch);
      cBranchHash = cBranch.hash;

      const merge = GitObjectSerializer.createCommit({
        treeHash: t,
        parentHashes: [c2Hash, cBranchHash],
        author: { name: 'A', email: 'a@v', timestamp: 5 },
        message: 'merge feature into main',
      });
      objectStore.put(merge);
      mergeCommitHash = merge.hash;

      refStore.setRef('refs/heads/main', mergeCommitHash);
      refStore.setRef('refs/heads/feature', cBranchHash);
      refStore.setSymbolicRef('HEAD', 'refs/heads/main');
    });

    it('resolves HEAD to the current tip commit hash', () => {
      expect(RevisionResolver.resolve('HEAD', refStore, objectStore)).toBe(mergeCommitHash);
    });

    it('resolves direct branch names to their commit hash', () => {
      expect(RevisionResolver.resolve('main', refStore, objectStore)).toBe(mergeCommitHash);
      expect(RevisionResolver.resolve('feature', refStore, objectStore)).toBe(cBranchHash);
    });

    it('resolves first parent with HEAD~1 or HEAD^', () => {
      expect(RevisionResolver.resolve('HEAD~1', refStore, objectStore)).toBe(c2Hash);
      expect(RevisionResolver.resolve('HEAD^', refStore, objectStore)).toBe(c2Hash);
      expect(RevisionResolver.resolve('HEAD^1', refStore, objectStore)).toBe(c2Hash);
    });

    it('resolves second parent of merge commit with HEAD^2', () => {
      expect(RevisionResolver.resolve('HEAD^2', refStore, objectStore)).toBe(cBranchHash);
    });

    it('resolves multi-generation ancestor HEAD~2 (c2 -> c1)', () => {
      expect(RevisionResolver.resolve('HEAD~2', refStore, objectStore)).toBe(c1Hash);
    });

    it('resolves multi-generation ancestor HEAD~3 (c1 -> c0)', () => {
      expect(RevisionResolver.resolve('HEAD~3', refStore, objectStore)).toBe(c0Hash);
    });

    it('resolves relative revisions on branch names: main~1', () => {
      expect(RevisionResolver.resolve('main~1', refStore, objectStore)).toBe(c2Hash);
      expect(RevisionResolver.resolve('feature~1', refStore, objectStore)).toBe(c1Hash);
    });

    it('resolves raw full 40-character SHA-1 directly', () => {
      expect(RevisionResolver.resolve(c1Hash, refStore, objectStore)).toBe(c1Hash);
    });

    it('returns null when traversing beyond root commit (HEAD~4)', () => {
      expect(RevisionResolver.resolve('HEAD~4', refStore, objectStore)).toBeNull();
    });

    it('returns null for unknown branches or symbols', () => {
      expect(RevisionResolver.resolve('unknown-branch', refStore, objectStore)).toBeNull();
      expect(RevisionResolver.resolve('HEAD^5', refStore, objectStore)).toBeNull();
    });
  });

  // =========================================================================
  // 6. Plumbing Commands Engine Deep Dive (10 tests)
  // =========================================================================
  describe('Plumbing Commands Execution Engine', () => {
    it('runs hash-object without write flag and outputs SHA-1 without storing', () => {
      files['sample.txt'] = 'Content only';
      const ctx = { objectStore, refStore, index, files };

      const res = GitPlumbingRunner.execute('git hash-object sample.txt', ctx);
      expect(res.exitCode).toBe(0);
      expect(res.stdout).toHaveLength(40);
      expect(objectStore.has(res.stdout)).toBe(false);
    });

    it('runs hash-object with -w flag and stores blob into object database', () => {
      files['stored.txt'] = 'Store me in DB';
      const ctx = { objectStore, refStore, index, files };

      const res = GitPlumbingRunner.execute('git hash-object -w stored.txt', ctx);
      expect(res.exitCode).toBe(0);
      expect(objectStore.has(res.stdout)).toBe(true);
      expect(objectStore.get(res.stdout)?.content).toBe('Store me in DB');
    });

    it('runs cat-file with -t (type), -s (size), and -p (pretty-print)', () => {
      const blob = GitObjectSerializer.createBlob('Vietnam Tech');
      objectStore.put(blob);
      const ctx = { objectStore, refStore, index, files };

      const resT = GitPlumbingRunner.execute(`git cat-file -t ${blob.hash}`, ctx);
      expect(resT.exitCode).toBe(0);
      expect(resT.stdout).toBe('blob');

      const resS = GitPlumbingRunner.execute(`git cat-file -s ${blob.hash}`, ctx);
      expect(resS.exitCode).toBe(0);
      expect(resS.stdout).toBe(String('Vietnam Tech'.length));

      const resP = GitPlumbingRunner.execute(`git cat-file -p ${blob.hash}`, ctx);
      expect(resP.exitCode).toBe(0);
      expect(resP.stdout).toBe('Vietnam Tech');
    });

    it('returns exitCode 1 when cat-file targets an invalid/non-existent object hash', () => {
      const ctx = { objectStore, refStore, index, files };
      const res = GitPlumbingRunner.execute('git cat-file -p 0000000000000000000000000000000000000000', ctx);

      expect(res.exitCode).toBe(1);
      expect(res.error).toContain('Not a valid object name');
    });

    it('runs update-index --add and stages file into index with mode 100644', () => {
      files['code.ts'] = 'const pi = 3.14159;';
      const ctx = { objectStore, refStore, index, files };

      const res = GitPlumbingRunner.execute('git update-index --add code.ts', ctx);
      expect(res.exitCode).toBe(0);

      const entry = index.get('code.ts');
      expect(entry).not.toBeNull();
      expect(entry?.mode).toBe('100644');
      expect(objectStore.has(entry!.hash)).toBe(true);
    });

    it('runs update-index --cacheinfo to inject arbitrary object without working copy', () => {
      const blob = GitObjectSerializer.createBlob('virtual object');
      objectStore.put(blob);
      const ctx = { objectStore, refStore, index, files };

      const res = GitPlumbingRunner.execute(
        `git update-index --cacheinfo 100755 ${blob.hash} scripts/run.sh`,
        ctx
      );
      expect(res.exitCode).toBe(0);

      const staged = index.get('scripts/run.sh');
      expect(staged).toBeDefined();
      expect(staged?.mode).toBe('100755');
      expect(staged?.hash).toBe(blob.hash);
    });

    it('runs write-tree to serialize index into tree object and returns hash', () => {
      files['index.html'] = '<h1>Hello</h1>';
      const ctx = { objectStore, refStore, index, files };

      GitPlumbingRunner.execute('git update-index --add index.html', ctx);
      const writeRes = GitPlumbingRunner.execute('git write-tree', ctx);

      expect(writeRes.exitCode).toBe(0);
      expect(writeRes.stdout).toHaveLength(40);
      expect(objectStore.get(writeRes.stdout)?.type).toBe('tree');
    });

    it('runs commit-tree with parents and author info to create commit', () => {
      const t = '4b825dc642cb6eb9a060e54bf8d69288fbee4904';
      const ctx = {
        objectStore,
        refStore,
        index,
        files,
        authorName: 'Plumbing Engineer',
        authorEmail: 'eng@gitacademy.vn',
      };

      const res = GitPlumbingRunner.execute(
        `git commit-tree ${t} -m "chore: created with plumbing engine"`,
        ctx
      );
      expect(res.exitCode).toBe(0);
      expect(res.stdout).toHaveLength(40);

      const commit = objectStore.get(res.stdout);
      expect(commit).toBeDefined();
      expect(commit?.type).toBe('commit');
      expect(commit?.content).toContain('Plumbing Engineer');
      expect(commit?.content).toContain('chore: created with plumbing engine');
    });

    it('runs show-ref and lists all refs and their hashes', () => {
      refStore.setRef('refs/heads/main', '1111222233334444555566667777888899990000');
      refStore.setRef('refs/tags/v1', 'aaaabbbbccccddddeeeeffff0000111122223333');
      const ctx = { objectStore, refStore, index, files };

      const res = GitPlumbingRunner.execute('git show-ref', ctx);
      expect(res.exitCode).toBe(0);
      expect(res.stdout).toContain('1111222233334444555566667777888899990000 refs/heads/main');
      expect(res.stdout).toContain('aaaabbbbccccddddeeeeffff0000111122223333 refs/tags/v1');
    });

    it('rejects unsupported or non-git commands gracefully with exit code 1', () => {
      const ctx = { objectStore, refStore, index, files };
      const nonGit = GitPlumbingRunner.execute('rm -rf /', ctx);
      expect(nonGit.exitCode).toBe(1);
      expect(nonGit.error).toBe('Not a git command');

      const unsupported = GitPlumbingRunner.execute('git unsupported-subcommand', ctx);
      expect(unsupported.exitCode).toBe(1);
      expect(unsupported.error).toContain('Unsupported plumbing command');
    });
  });

  // =========================================================================
  // 7. Git Garbage Collection & Packfile Verification (8 tests)
  // =========================================================================
  describe('Git Garbage Collection & Packfile Engine', () => {
    it('finds all hashes reachable from active branch tips', () => {
      const b1 = GitObjectSerializer.createBlob('page 1');
      objectStore.put(b1);
      const t1 = GitObjectSerializer.createTree([{ mode: '100644', type: 'blob', hash: b1.hash, path: 'p1.txt' }]);
      objectStore.put(t1);
      const c1 = GitObjectSerializer.createCommit({
        treeHash: t1.hash,
        parentHashes: [],
        author: { name: 'A', email: 'a@v', timestamp: 1 },
        message: 'first',
      });
      objectStore.put(c1);
      refStore.setRef('refs/heads/main', c1.hash);

      const reachable = GitGarbageCollector.findReachableHashes(refStore, objectStore);
      expect(reachable.has(c1.hash)).toBe(true);
      expect(reachable.has(t1.hash)).toBe(true);
      expect(reachable.has(b1.hash)).toBe(true);
      expect(reachable.size).toBe(3);
    });

    it('finds objects reachable through annotated tags', () => {
      const b = GitObjectSerializer.createBlob('tagged data');
      objectStore.put(b);
      const t = GitObjectSerializer.createTree([{ mode: '100644', type: 'blob', hash: b.hash, path: 'f.txt' }]);
      objectStore.put(t);
      const c = GitObjectSerializer.createCommit({
        treeHash: t.hash,
        parentHashes: [],
        author: { name: 'A', email: 'a@v', timestamp: 1 },
        message: 'tagged commit',
      });
      objectStore.put(c);
      const tag = GitObjectSerializer.createTag({
        targetHash: c.hash,
        targetType: 'commit',
        tagName: 'v1.0.0',
        tagger: { name: 'A', email: 'a@v', timestamp: 1 },
        message: 'v1 tag',
      });
      objectStore.put(tag);
      refStore.setRef('refs/tags/v1.0.0', tag.hash);

      const reachable = GitGarbageCollector.findReachableHashes(refStore, objectStore);
      expect(reachable.has(tag.hash)).toBe(true);
      expect(reachable.has(c.hash)).toBe(true);
      expect(reachable.has(t.hash)).toBe(true);
      expect(reachable.has(b.hash)).toBe(true);
    });

    it('detects orphaned/dangling objects correctly during GC run', () => {
      // 1 reachable blob in main
      const bReachable = GitObjectSerializer.createBlob('reachable');
      objectStore.put(bReachable);
      const t = GitObjectSerializer.createTree([{ mode: '100644', type: 'blob', hash: bReachable.hash, path: 'r.txt' }]);
      objectStore.put(t);
      const c = GitObjectSerializer.createCommit({
        treeHash: t.hash,
        parentHashes: [],
        author: { name: 'A', email: 'a@v', timestamp: 1 },
        message: 'commit',
      });
      objectStore.put(c);
      refStore.setRef('refs/heads/main', c.hash);

      // 2 orphaned dangling blobs (staged then discarded or deleted branch)
      const orphan1 = GitObjectSerializer.createBlob('dangling blob 1');
      const orphan2 = GitObjectSerializer.createBlob('dangling blob 2');
      objectStore.put(orphan1);
      objectStore.put(orphan2);

      const res = GitGarbageCollector.runGc(refStore, objectStore);
      expect(res.reachableCount).toBe(3);
      expect(res.unreachableCount).toBe(2);
      expect(res.packedObjectsCount).toBe(3);
      expect(res.savingsPercent).toBeGreaterThanOrEqual(0);
    });

    it('packs delta-compressed blobs and stores active packfile metadata', () => {
      const b = GitObjectSerializer.createBlob('Compressible delta content for Vietnam platform.');
      objectStore.put(b);
      const t = GitObjectSerializer.createTree([{ mode: '100644', type: 'blob', hash: b.hash, path: 'd.txt' }]);
      objectStore.put(t);
      const c = GitObjectSerializer.createCommit({
        treeHash: t.hash,
        parentHashes: [],
        author: { name: 'A', email: 'a@v', timestamp: 1 },
        message: 'c',
      });
      objectStore.put(c);
      refStore.setRef('refs/heads/main', c.hash);

      GitGarbageCollector.runGc(refStore, objectStore);
      const packfile = GitGarbageCollector.getPackfile();

      expect(packfile).not.toBeNull();
      expect(packfile?.totalObjects).toBe(3);
      expect(packfile?.objects.get(b.hash)?.isDelta).toBe(true);
      expect(packfile?.objects.get(b.hash)?.packedSize).toBeLessThan(b.size);
    });

    it('executes git gc plumbing command and returns standard statistics report', () => {
      const b = GitObjectSerializer.createBlob('content for gc');
      objectStore.put(b);
      const t = GitObjectSerializer.createTree([{ mode: '100644', type: 'blob', hash: b.hash, path: 'f.txt' }]);
      objectStore.put(t);
      const c = GitObjectSerializer.createCommit({
        treeHash: t.hash,
        parentHashes: [],
        author: { name: 'A', email: 'a@v', timestamp: 1 },
        message: 'gc test',
      });
      objectStore.put(c);
      refStore.setRef('refs/heads/main', c.hash);

      const ctx = { objectStore, refStore, index, files };
      const res = GitPlumbingRunner.execute('git gc', ctx);

      expect(res.exitCode).toBe(0);
      expect(res.stdout).toContain('Counting objects:');
      expect(res.stdout).toContain('Compressing objects: 100%');
      expect(res.stdout).toContain('Writing objects: 100%');
      expect(res.stdout).toContain('pack saved');
    });
  });
});
