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

describe('Git Internals & Plumbing Suite', () => {
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
  // 1. Git Object Serialization & Raw Structure
  // =========================================================================
  describe('Object Serialization & Format', () => {
    it('creates and parses a valid blob object with <type> <size>\\0<content>', () => {
      const content = 'Hello, Git Academy Vietnam!\n';
      const blob = GitObjectSerializer.createBlob(content);

      expect(blob.type).toBe('blob');
      expect(blob.size).toBe(content.length);
      expect(blob.hash).toHaveLength(40);
      expect(blob.raw).toBe(`blob ${content.length}\0${content}`);

      const parsed = GitObjectSerializer.parseObject(blob.raw);
      expect(parsed.hash).toBe(blob.hash);
      expect(parsed.type).toBe('blob');
      expect(parsed.content).toBe(content);
    });

    it('creates tree objects with sorted entries and permissions mode', () => {
      const entries = [
        { mode: '100644', type: 'blob' as const, hash: 'a1b2c3d4e5f6', path: 'README.md' },
        { mode: '100755', type: 'blob' as const, hash: 'b2c3d4e5f6a1', path: 'deploy.sh' },
        { mode: '040000', type: 'tree' as const, hash: 'c3d4e5f6a1b2', path: 'src' },
      ];

      const tree = GitObjectSerializer.createTree(entries);
      expect(tree.type).toBe('tree');
      expect(tree.content).toContain('100644 blob a1b2c3d4e5f6\tREADME.md');
      expect(tree.content).toContain('040000 tree c3d4e5f6a1b2\tsrc');

      const parsedEntries = GitObjectSerializer.parseTree(tree.content);
      expect(parsedEntries).toHaveLength(3);
      expect(parsedEntries[0].path).toBe('README.md');
    });

    it('creates commit object referencing tree, parents, author and committer', () => {
      const commit = GitObjectSerializer.createCommit({
        treeHash: '4b825dc642cb6eb9a060e54bf8d69288fbee4904',
        parentHashes: ['c0ffee112233445566778899aabbccddeeff0011'],
        author: { name: 'Nguyen Van A', email: 'a@gitacademy.vn', timestamp: 1700000000 },
        message: 'feat: implement git internals object store',
      });

      expect(commit.type).toBe('commit');
      expect(commit.content).toContain('tree 4b825dc642cb6eb9a060e54bf8d69288fbee4904');
      expect(commit.content).toContain('parent c0ffee112233445566778899aabbccddeeff0011');
      expect(commit.content).toContain('author Nguyen Van A <a@gitacademy.vn> 1700000000');
      expect(commit.content).toContain('feat: implement git internals object store');
    });
  });

  // =========================================================================
  // 2. Object Store & Loose Object Path Mapping
  // =========================================================================
  describe('Git Object Store', () => {
    it('stores and retrieves objects by 40-char hash or prefix (7+ chars)', () => {
      const blob = GitObjectSerializer.createBlob('console.log("hello");');
      objectStore.put(blob);

      expect(objectStore.has(blob.hash)).toBe(true);
      expect(objectStore.get(blob.hash)?.content).toBe('console.log("hello");');

      const shortPrefix = blob.hash.slice(0, 7);
      expect(objectStore.get(shortPrefix)?.hash).toBe(blob.hash);
    });

    it('computes loose object filesystem path (.git/objects/xx/yyyy...) correctly', () => {
      const blob = GitObjectSerializer.createBlob('test loose file');
      const loosePath = objectStore.getLoosePath(blob.hash);

      const expectedDir = blob.hash.slice(0, 2);
      const expectedFile = blob.hash.slice(2);
      expect(loosePath).toBe(`.git/objects/${expectedDir}/${expectedFile}`);
    });
  });

  // =========================================================================
  // 3. Index Model & Recursive writeTree
  // =========================================================================
  describe('Index & writeTree Simulation', () => {
    it('builds recursive tree objects hierarchy from flat staged entries', () => {
      const blob1 = GitObjectSerializer.createBlob('const x = 1;');
      const blob2 = GitObjectSerializer.createBlob('# Documentation');
      objectStore.put(blob1);
      objectStore.put(blob2);

      index.add({ path: 'src/main.ts', mode: '100644', hash: blob1.hash, stage: 0, size: blob1.size });
      index.add({ path: 'README.md', mode: '100644', hash: blob2.hash, stage: 0, size: blob2.size });

      const rootTreeHash = index.writeTree(objectStore);
      expect(rootTreeHash).toHaveLength(40);

      const rootTree = objectStore.get(rootTreeHash);
      expect(rootTree).toBeDefined();
      expect(rootTree?.type).toBe('tree');

      const rootEntries = GitObjectSerializer.parseTree(rootTree!.content);
      expect(rootEntries.some((e) => e.path === 'README.md' && e.type === 'blob')).toBe(true);
      expect(rootEntries.some((e) => e.path === 'src' && e.type === 'tree')).toBe(true);

      // Verify sub-tree for 'src' was also stored
      const srcEntry = rootEntries.find((e) => e.path === 'src')!;
      const srcTree = objectStore.get(srcEntry.hash);
      expect(srcTree).toBeDefined();
      expect(srcTree?.type).toBe('tree');
      expect(srcTree?.content).toContain('main.ts');
    });
  });

  // =========================================================================
  // 4. Revision Resolver
  // =========================================================================
  describe('Revision Resolver (HEAD, HEAD~, HEAD^, HEAD^2, branches)', () => {
    it('resolves commit ancestors and multi-parent merge commits accurately', () => {
      // Create Commit 1 (root)
      const c1 = GitObjectSerializer.createCommit({
        treeHash: 'tree1',
        parentHashes: [],
        author: { name: 'A', email: 'a@vn', timestamp: 100 },
        message: 'commit 1',
      });
      objectStore.put(c1);

      // Create Commit 2 (parent: c1)
      const c2 = GitObjectSerializer.createCommit({
        treeHash: 'tree2',
        parentHashes: [c1.hash],
        author: { name: 'A', email: 'a@vn', timestamp: 200 },
        message: 'commit 2',
      });
      objectStore.put(c2);

      // Create Branch B Commit (parent: c1)
      const cBranch = GitObjectSerializer.createCommit({
        treeHash: 'treeB',
        parentHashes: [c1.hash],
        author: { name: 'B', email: 'b@vn', timestamp: 250 },
        message: 'commit on feature branch',
      });
      objectStore.put(cBranch);

      // Create Commit 3 Merge Commit (parents: c2, cBranch)
      const c3 = GitObjectSerializer.createCommit({
        treeHash: 'tree3',
        parentHashes: [c2.hash, cBranch.hash],
        author: { name: 'A', email: 'a@vn', timestamp: 300 },
        message: 'Merge branch feature',
      });
      objectStore.put(c3);

      refStore.setRef('refs/heads/main', c3.hash);
      refStore.setSymbolicRef('HEAD', 'refs/heads/main');

      // Tests:
      // HEAD -> c3
      expect(RevisionResolver.resolve('HEAD', refStore, objectStore)).toBe(c3.hash);
      // HEAD~1 (first parent) -> c2
      expect(RevisionResolver.resolve('HEAD~1', refStore, objectStore)).toBe(c2.hash);
      // HEAD~2 (first parent of c2) -> c1
      expect(RevisionResolver.resolve('HEAD~2', refStore, objectStore)).toBe(c1.hash);
      // HEAD^1 (first parent of merge) -> c2
      expect(RevisionResolver.resolve('HEAD^1', refStore, objectStore)).toBe(c2.hash);
      // HEAD^2 (second parent of merge) -> cBranch
      expect(RevisionResolver.resolve('HEAD^2', refStore, objectStore)).toBe(cBranch.hash);
    });
  });

  // =========================================================================
  // 5. Plumbing Commands & The Manual Commit Lab (Acceptance Flow 4)
  // =========================================================================
  describe('Plumbing Commands Execution (Acceptance Flow 4)', () => {
    it('builds a complete commit manually strictly using plumbing commands without porcelain git add or git commit', () => {
      files['hello.txt'] = 'Hello, plumbing world!\n';

      const ctx = {
        objectStore,
        refStore,
        index,
        files,
        authorName: 'Plumbing Master',
        authorEmail: 'plumbing@gitacademy.vn',
      };

      // Step 1: git hash-object -w hello.txt
      const hashRes = GitPlumbingRunner.execute('git hash-object -w hello.txt', ctx);
      expect(hashRes.exitCode).toBe(0);
      const blobHash = hashRes.stdout;
      expect(blobHash).toHaveLength(40);
      expect(objectStore.has(blobHash)).toBe(true);

      // Step 2: git cat-file -p <blobHash>
      const catRes = GitPlumbingRunner.execute(`git cat-file -p ${blobHash}`, ctx);
      expect(catRes.exitCode).toBe(0);
      expect(catRes.stdout).toBe('Hello, plumbing world!\n');

      // Step 3: git update-index --add hello.txt
      const updateRes = GitPlumbingRunner.execute('git update-index --add hello.txt', ctx);
      expect(updateRes.exitCode).toBe(0);
      expect(index.get('hello.txt')?.hash).toBe(blobHash);

      // Step 4: git write-tree
      const writeTreeRes = GitPlumbingRunner.execute('git write-tree', ctx);
      expect(writeTreeRes.exitCode).toBe(0);
      const treeHash = writeTreeRes.stdout;
      expect(objectStore.has(treeHash)).toBe(true);

      // Step 5: git commit-tree <treeHash> -m "feat: manual plumbing commit"
      const commitTreeRes = GitPlumbingRunner.execute(
        `git commit-tree ${treeHash} -m "feat: manual plumbing commit"`,
        ctx
      );
      expect(commitTreeRes.exitCode).toBe(0);
      const commitHash = commitTreeRes.stdout;
      expect(objectStore.has(commitHash)).toBe(true);

      // Step 6: update ref and verify with rev-parse
      refStore.setRef('refs/heads/main', commitHash);
      const revParseRes = GitPlumbingRunner.execute('git rev-parse HEAD', ctx);
      expect(revParseRes.exitCode).toBe(0);
      expect(revParseRes.stdout).toBe(commitHash);

      // Step 7: git symbolic-ref HEAD
      const symRes = GitPlumbingRunner.execute('git symbolic-ref HEAD', ctx);
      expect(symRes.exitCode).toBe(0);
      expect(symRes.stdout).toBe('refs/heads/main');
    });
  });

  // =========================================================================
  // 6. Packfile & GC Educational Model
  // =========================================================================
  describe('Packfile & Garbage Collection Model', () => {
    it('packs reachable objects and calculates space compression savings', () => {
      // 1. Create reachable commit
      const b1 = GitObjectSerializer.createBlob('file 1 content');
      objectStore.put(b1);
      const t1 = GitObjectSerializer.createTree([
        { mode: '100644', type: 'blob', hash: b1.hash, path: 'file1.txt' },
      ]);
      objectStore.put(t1);
      const c1 = GitObjectSerializer.createCommit({
        treeHash: t1.hash,
        parentHashes: [],
        author: { name: 'A', email: 'a@vn', timestamp: 100 },
        message: 'initial',
      });
      objectStore.put(c1);
      refStore.setRef('refs/heads/main', c1.hash);

      // 2. Create orphaned/dangling object (not referenced by any ref)
      const orphanBlob = GitObjectSerializer.createBlob('orphaned temporary data');
      objectStore.put(orphanBlob);

      // 3. Run GC
      const gcRes = GitGarbageCollector.runGc(refStore, objectStore);
      expect(gcRes.reachableCount).toBe(3); // commit, tree, blob
      expect(gcRes.unreachableCount).toBe(1); // orphanBlob
      expect(gcRes.packedObjectsCount).toBe(3);
      expect(gcRes.savingsPercent).toBeGreaterThan(0);
    });
  });
});
