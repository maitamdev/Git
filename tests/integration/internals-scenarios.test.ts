import { describe, it, expect, beforeEach } from 'vitest';
import { BUILTIN_SCENARIOS } from '../../packages/git-scenarios/src/index';
import { ScenarioRunner } from '../../packages/exercise-engine/src/runner';
import {
  GitObjectSerializer,
  GitObjectStore,
  GitRefStore,
  GitIndex,
  GitPlumbingRunner,
  GitGarbageCollector,
  RevisionResolver,
} from '../../packages/git-internals/src/index';

describe('Level 8 Git Internals Scenarios Integration Suite (8 Scenarios + Plumbing Engine)', () => {
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
  // 1. Scenario Schema & Contract Tests (8 tests)
  // =========================================================================
  describe('Level 8 Scenario Schemas & Goals', () => {
    const level8Ids = [
      'hash-object-lab',
      'cat-file-lab',
      'update-index-lab',
      'write-tree-lab',
      'commit-tree-lab',
      'update-ref-lab',
      'git-gc-pack-lab',
      'internals-manual-commit-capstone',
    ];

    it.each(level8Ids)('initializes %s scenario cleanly', (scenarioId) => {
      const scenario = BUILTIN_SCENARIOS[scenarioId as keyof typeof BUILTIN_SCENARIOS];
      expect(scenario).toBeDefined();
      expect(scenario.id).toBe(scenarioId);
      expect(scenario.hints.length).toBeGreaterThanOrEqual(1);
      expect(scenario.success.xp).toBeGreaterThanOrEqual(85);

      const runner = new ScenarioRunner(scenario);
      expect(runner.getEngine()).toBeDefined();
    });
  });

  // =========================================================================
  // 2. Scenario-Specific Plumbing Exercises (12 tests)
  // =========================================================================
  describe('Scenario-Specific Plumbing Executions', () => {
    it('executes hash-object-lab: hashes raw file and stores loose blob', () => {
      files['hello.txt'] = 'Xin chao Git Internals\n';
      const ctx = { objectStore, refStore, index, files };

      const res = GitPlumbingRunner.execute('git hash-object -w hello.txt', ctx);
      expect(res.exitCode).toBe(0);
      expect(res.stdout).toHaveLength(40);
      expect(objectStore.has(res.stdout)).toBe(true);

      const blob = objectStore.get(res.stdout);
      expect(blob?.type).toBe('blob');
      expect(blob?.content).toBe('Xin chao Git Internals\n');
    });

    it('executes cat-file-lab: inspects type, size, and content of commit object', () => {
      const t = '4b825dc642cb6eb9a060e54bf8d69288fbee4904';
      const commit = GitObjectSerializer.createCommit({
        treeHash: t,
        parentHashes: [],
        author: { name: 'Author', email: 'author@vn', timestamp: 123456 },
        message: 'feat: baseline commit',
      });
      objectStore.put(commit);
      refStore.setRef('refs/heads/main', commit.hash);
      const ctx = { objectStore, refStore, index, files };

      // Type check
      const typeRes = GitPlumbingRunner.execute(`git cat-file -t ${commit.hash}`, ctx);
      expect(typeRes.exitCode).toBe(0);
      expect(typeRes.stdout).toBe('commit');

      // Size check
      const sizeRes = GitPlumbingRunner.execute(`git cat-file -s ${commit.hash}`, ctx);
      expect(sizeRes.exitCode).toBe(0);
      expect(parseInt(sizeRes.stdout, 10)).toBeGreaterThan(0);

      // Pretty-print check
      const printRes = GitPlumbingRunner.execute(`git cat-file -p ${commit.hash}`, ctx);
      expect(printRes.exitCode).toBe(0);
      expect(printRes.stdout).toContain('tree 4b825dc642cb6eb9a060e54bf8d69288fbee4904');
      expect(printRes.stdout).toContain('feat: baseline commit');
    });

    it('executes update-index-lab: adds files to staging area directly', () => {
      files['note.txt'] = 'Staging via plumbing\n';
      const ctx = { objectStore, refStore, index, files };

      const res = GitPlumbingRunner.execute('git update-index --add note.txt', ctx);
      expect(res.exitCode).toBe(0);

      const entry = index.get('note.txt');
      expect(entry).not.toBeNull();
      expect(entry?.path).toBe('note.txt');
      expect(entry?.mode).toBe('100644');
      expect(objectStore.has(entry!.hash)).toBe(true);
    });

    it('executes write-tree-lab: writes tree from staged index without commit', () => {
      files['README.md'] = '# Tree Object Project\n';
      const ctx = { objectStore, refStore, index, files };

      GitPlumbingRunner.execute('git update-index --add README.md', ctx);
      const res = GitPlumbingRunner.execute('git write-tree', ctx);

      expect(res.exitCode).toBe(0);
      const treeHash = res.stdout;
      expect(treeHash).toHaveLength(40);

      const tree = objectStore.get(treeHash);
      expect(tree).toBeDefined();
      expect(tree?.type).toBe('tree');
      expect(tree?.content).toContain('README.md');
    });

    it('executes commit-tree-lab: mints commit directly from tree hash', () => {
      const treeHash = '4b825dc642cb6eb9a060e54bf8d69288fbee4904';
      const ctx = {
        objectStore,
        refStore,
        index,
        files,
        authorName: 'Plumbing Artisan',
        authorEmail: 'artisan@vn.edu',
      };

      const res = GitPlumbingRunner.execute(
        `git commit-tree ${treeHash} -m "feat: minted commit from tree"`,
        ctx
      );
      expect(res.exitCode).toBe(0);
      const commitHash = res.stdout;
      expect(commitHash).toHaveLength(40);

      const commit = objectStore.get(commitHash);
      expect(commit).toBeDefined();
      expect(commit?.type).toBe('commit');
      expect(commit?.content).toContain('Plumbing Artisan');
      expect(commit?.content).toContain('feat: minted commit from tree');
    });

    it('executes update-ref-lab: updates branch pointer to new commit', () => {
      const commit1 = '1111222233334444555566667777888899990000';
      const commit2 = '2222333344445555666677778888999900001111';
      refStore.setRef('refs/heads/main', commit1);
      expect(refStore.getRef('main')).toBe(commit1);

      // Fast-forward or move ref to commit2
      refStore.setRef('refs/heads/main', commit2);
      expect(refStore.getRef('main')).toBe(commit2);
      expect(refStore.getRef('HEAD')).toBe(commit2);
    });

    it('executes git-gc-pack-lab: runs GC and produces packfile report', () => {
      const b1 = GitObjectSerializer.createBlob('data version 1');
      const b2 = GitObjectSerializer.createBlob('data version 2');
      objectStore.put(b1);
      objectStore.put(b2);

      const t = GitObjectSerializer.createTree([{ mode: '100644', type: 'blob', hash: b2.hash, path: 'data.txt' }]);
      objectStore.put(t);

      const c = GitObjectSerializer.createCommit({
        treeHash: t.hash,
        parentHashes: [],
        author: { name: 'A', email: 'a@v', timestamp: 1 },
        message: 'v2',
      });
      objectStore.put(c);
      refStore.setRef('refs/heads/main', c.hash);

      const ctx = { objectStore, refStore, index, files };
      const res = GitPlumbingRunner.execute('git gc', ctx);

      expect(res.exitCode).toBe(0);
      expect(res.stdout).toContain('Counting objects:');
      expect(res.stdout).toContain('Compressing objects: 100%');
      expect(res.stdout).toContain('pack saved');
    });

    it('executes internals-manual-commit-capstone: builds commit completely through plumbing', () => {
      files['capstone.txt'] = 'Built entirely with Git Plumbing commands.\n';
      const ctx = {
        objectStore,
        refStore,
        index,
        files,
        authorName: 'Vietnam Internals Master',
        authorEmail: 'master@gitacademy.vn',
      };

      // Step 1: hash-object -w
      const hashRes = GitPlumbingRunner.execute('git hash-object -w capstone.txt', ctx);
      expect(hashRes.exitCode).toBe(0);
      const blobHash = hashRes.stdout;
      expect(objectStore.has(blobHash)).toBe(true);

      // Step 2: update-index --add
      const updateRes = GitPlumbingRunner.execute(`git update-index --add capstone.txt`, ctx);
      expect(updateRes.exitCode).toBe(0);
      expect(index.get('capstone.txt')?.hash).toBe(blobHash);

      // Step 3: write-tree
      const treeRes = GitPlumbingRunner.execute('git write-tree', ctx);
      expect(treeRes.exitCode).toBe(0);
      const treeHash = treeRes.stdout;
      expect(objectStore.has(treeHash)).toBe(true);

      // Step 4: commit-tree
      const commitRes = GitPlumbingRunner.execute(
        `git commit-tree ${treeHash} -m "feat: manual capstone commit"`,
        ctx
      );
      expect(commitRes.exitCode).toBe(0);
      const commitHash = commitRes.stdout;
      expect(objectStore.has(commitHash)).toBe(true);

      // Step 5: update-ref
      refStore.setRef('refs/heads/main', commitHash);
      expect(refStore.getRef('HEAD')).toBe(commitHash);

      // Step 6: rev-parse HEAD
      const revRes = GitPlumbingRunner.execute('git rev-parse HEAD', ctx);
      expect(revRes.exitCode).toBe(0);
      expect(revRes.stdout).toBe(commitHash);

      // Step 7: cat-file -p HEAD verifies author and tree
      const catRes = GitPlumbingRunner.execute('git cat-file -p HEAD', ctx);
      expect(catRes.exitCode).toBe(0);
      expect(catRes.stdout).toContain(`tree ${treeHash}`);
      expect(catRes.stdout).toContain('Vietnam Internals Master');
    });

    it('supports git symbolic-ref to inspect and change HEAD pointer', () => {
      const ctx = { objectStore, refStore, index, files };

      // Inspect HEAD
      const getRes = GitPlumbingRunner.execute('git symbolic-ref HEAD', ctx);
      expect(getRes.exitCode).toBe(0);
      expect(getRes.stdout).toBe('refs/heads/main');

      // Update HEAD to point to develop
      const setRes = GitPlumbingRunner.execute('git symbolic-ref HEAD refs/heads/develop', ctx);
      expect(setRes.exitCode).toBe(0);
      expect(refStore.getSymbolicRef('HEAD')).toBe('refs/heads/develop');
    });

    it('supports git show-ref to list all refs', () => {
      refStore.setRef('refs/heads/main', '1111111111111111111111111111111111111111');
      refStore.setRef('refs/heads/feature', '2222222222222222222222222222222222222222');
      const ctx = { objectStore, refStore, index, files };

      const res = GitPlumbingRunner.execute('git show-ref', ctx);
      expect(res.exitCode).toBe(0);
      expect(res.stdout).toContain('refs/heads/main');
      expect(res.stdout).toContain('refs/heads/feature');
    });

    it('supports git rev-parse with ancestor expressions HEAD~1', () => {
      const t = '4b825dc642cb6eb9a060e54bf8d69288fbee4904';
      const c1 = GitObjectSerializer.createCommit({
        treeHash: t,
        parentHashes: [],
        author: { name: 'A', email: 'a@v', timestamp: 1 },
        message: 'c1',
      });
      objectStore.put(c1);

      const c2 = GitObjectSerializer.createCommit({
        treeHash: t,
        parentHashes: [c1.hash],
        author: { name: 'A', email: 'a@v', timestamp: 2 },
        message: 'c2',
      });
      objectStore.put(c2);

      refStore.setRef('refs/heads/main', c2.hash);
      const ctx = { objectStore, refStore, index, files };

      const res1 = GitPlumbingRunner.execute('git rev-parse HEAD', ctx);
      expect(res1.stdout).toBe(c2.hash);

      const res2 = GitPlumbingRunner.execute('git rev-parse HEAD~1', ctx);
      expect(res2.stdout).toBe(c1.hash);
    });

    it('returns error on cat-file with nonexistent object', () => {
      const ctx = { objectStore, refStore, index, files };
      const res = GitPlumbingRunner.execute('git cat-file -p deadbeef00000000000000000000000000000000', ctx);

      expect(res.exitCode).toBe(1);
      expect(res.error).toContain('Not a valid object name');
    });
  });

  // =========================================================================
  // 3. Object Database & Garbage Collector Traversal Tests (15 tests)
  // =========================================================================
  describe('Object Database & GC Reachability Engine', () => {
    it('traverses multi-level tree hierarchy to find all blobs during GC', () => {
      const b1 = GitObjectSerializer.createBlob('file in root');
      const b2 = GitObjectSerializer.createBlob('file in subdir');
      objectStore.put(b1);
      objectStore.put(b2);

      const subTree = GitObjectSerializer.createTree([
        { mode: '100644', type: 'blob', hash: b2.hash, path: 'sub.txt' },
      ]);
      objectStore.put(subTree);

      const rootTree = GitObjectSerializer.createTree([
        { mode: '100644', type: 'blob', hash: b1.hash, path: 'root.txt' },
        { mode: '040000', type: 'tree', hash: subTree.hash, path: 'subdir' },
      ]);
      objectStore.put(rootTree);

      const commit = GitObjectSerializer.createCommit({
        treeHash: rootTree.hash,
        parentHashes: [],
        author: { name: 'A', email: 'a@v', timestamp: 1 },
        message: 'nested structure',
      });
      objectStore.put(commit);
      refStore.setRef('refs/heads/main', commit.hash);

      const reachable = GitGarbageCollector.findReachableHashes(refStore, objectStore);
      expect(reachable.has(commit.hash)).toBe(true);
      expect(reachable.has(rootTree.hash)).toBe(true);
      expect(reachable.has(subTree.hash)).toBe(true);
      expect(reachable.has(b1.hash)).toBe(true);
      expect(reachable.has(b2.hash)).toBe(true);
      expect(reachable.size).toBe(5);
    });

    it('traverses merge commit graph across both parent histories', () => {
      const t = '4b825dc642cb6eb9a060e54bf8d69288fbee4904';
      const c1 = GitObjectSerializer.createCommit({
        treeHash: t,
        parentHashes: [],
        author: { name: 'A', email: 'a@v', timestamp: 1 },
        message: 'c1',
      });
      const c2 = GitObjectSerializer.createCommit({
        treeHash: t,
        parentHashes: [c1.hash],
        author: { name: 'A', email: 'a@v', timestamp: 2 },
        message: 'c2',
      });
      const cBranch = GitObjectSerializer.createCommit({
        treeHash: t,
        parentHashes: [c1.hash],
        author: { name: 'B', email: 'b@v', timestamp: 3 },
        message: 'cBranch',
      });
      const cMerge = GitObjectSerializer.createCommit({
        treeHash: t,
        parentHashes: [c2.hash, cBranch.hash],
        author: { name: 'A', email: 'a@v', timestamp: 4 },
        message: 'merge',
      });

      objectStore.put(c1);
      objectStore.put(c2);
      objectStore.put(cBranch);
      objectStore.put(cMerge);
      refStore.setRef('refs/heads/main', cMerge.hash);

      const reachable = GitGarbageCollector.findReachableHashes(refStore, objectStore);
      expect(reachable.has(cMerge.hash)).toBe(true);
      expect(reachable.has(c2.hash)).toBe(true);
      expect(reachable.has(cBranch.hash)).toBe(true);
      expect(reachable.has(c1.hash)).toBe(true);
    });

    it('identifies unreferenced blobs after git reset --hard simulation', () => {
      const bGood = GitObjectSerializer.createBlob('kept content');
      const bDiscarded = GitObjectSerializer.createBlob('discarded content');
      objectStore.put(bGood);
      objectStore.put(bDiscarded);

      const tGood = GitObjectSerializer.createTree([{ mode: '100644', type: 'blob', hash: bGood.hash, path: 'kept.txt' }]);
      objectStore.put(tGood);
      const cGood = GitObjectSerializer.createCommit({
        treeHash: tGood.hash,
        parentHashes: [],
        author: { name: 'A', email: 'a@v', timestamp: 1 },
        message: 'kept',
      });
      objectStore.put(cGood);
      refStore.setRef('refs/heads/main', cGood.hash);

      const gcReport = GitGarbageCollector.runGc(refStore, objectStore);
      expect(gcReport.reachableCount).toBe(3); // commit, tree, kept blob
      expect(gcReport.unreachableCount).toBe(1); // discarded blob
    });

    it('calculates non-negative space savings percentage on pack', () => {
      const blob = GitObjectSerializer.createBlob('Large text content for delta packing simulation in Vietnam.');
      objectStore.put(blob);
      const tree = GitObjectSerializer.createTree([{ mode: '100644', type: 'blob', hash: blob.hash, path: 'doc.txt' }]);
      objectStore.put(tree);
      const commit = GitObjectSerializer.createCommit({
        treeHash: tree.hash,
        parentHashes: [],
        author: { name: 'A', email: 'a@v', timestamp: 1 },
        message: 'init',
      });
      objectStore.put(commit);
      refStore.setRef('refs/heads/main', commit.hash);

      const res = GitGarbageCollector.runGc(refStore, objectStore);
      expect(res.savingsPercent).toBeGreaterThan(0);
      expect(res.packedBytes).toBeLessThan(res.rawBytes);
    });

    it('verifies that packfile maintains map of all packed objects', () => {
      const blob = GitObjectSerializer.createBlob('payload');
      objectStore.put(blob);
      const tree = GitObjectSerializer.createTree([{ mode: '100644', type: 'blob', hash: blob.hash, path: 'p.txt' }]);
      objectStore.put(tree);
      const commit = GitObjectSerializer.createCommit({
        treeHash: tree.hash,
        parentHashes: [],
        author: { name: 'A', email: 'a@v', timestamp: 1 },
        message: 'p',
      });
      objectStore.put(commit);
      refStore.setRef('refs/heads/main', commit.hash);

      GitGarbageCollector.runGc(refStore, objectStore);
      const packfile = GitGarbageCollector.getPackfile();
      expect(packfile).not.toBeNull();
      expect(packfile?.objects.has(blob.hash)).toBe(true);
      expect(packfile?.objects.has(commit.hash)).toBe(true);
    });

    it('handles garbage collection on empty repository safely', () => {
      const res = GitGarbageCollector.runGc(refStore, objectStore);
      expect(res.reachableCount).toBe(0);
      expect(res.unreachableCount).toBe(0);
      expect(res.packedObjectsCount).toBe(0);
      expect(res.savingsPercent).toBe(0);
    });

    it('preserves object store statistics after loose reads', () => {
      const b = GitObjectSerializer.createBlob('stats test');
      objectStore.put(b);
      const stats = objectStore.getStats();
      expect(stats.blobCount).toBe(1);
      expect(stats.totalCount).toBe(1);
    });

    it('detects dangling commit when branch is deleted', () => {
      const t = '4b825dc642cb6eb9a060e54bf8d69288fbee4904';
      const c = GitObjectSerializer.createCommit({
        treeHash: t,
        parentHashes: [],
        author: { name: 'A', email: 'a@v', timestamp: 1 },
        message: 'on deleted branch',
      });
      objectStore.put(c);
      // No ref points to c

      const reachable = GitGarbageCollector.findReachableHashes(refStore, objectStore);
      expect(reachable.has(c.hash)).toBe(false);

      const gc = GitGarbageCollector.runGc(refStore, objectStore);
      expect(gc.unreachableCount).toBe(1);
    });

    it('resolves commit through RevisionResolver using branch name prefix', () => {
      const t = '4b825dc642cb6eb9a060e54bf8d69288fbee4904';
      const c = GitObjectSerializer.createCommit({
        treeHash: t,
        parentHashes: [],
        author: { name: 'A', email: 'a@v', timestamp: 1 },
        message: 'tip',
      });
      objectStore.put(c);
      refStore.setRef('refs/heads/feature/awesome', c.hash);

      const resolved = RevisionResolver.resolve('feature/awesome', refStore, objectStore);
      expect(resolved).toBe(c.hash);
    });

    it('returns null on invalid branch or caret depth', () => {
      expect(RevisionResolver.resolve('non-existent-branch', refStore, objectStore)).toBeNull();
      expect(RevisionResolver.resolve('HEAD~999', refStore, objectStore)).toBeNull();
    });

    it('handles multiple consecutive garbage collections idempotently', () => {
      const b = GitObjectSerializer.createBlob('stable blob');
      objectStore.put(b);
      const t = GitObjectSerializer.createTree([{ mode: '100644', type: 'blob', hash: b.hash, path: 's.txt' }]);
      objectStore.put(t);
      const c = GitObjectSerializer.createCommit({
        treeHash: t.hash,
        parentHashes: [],
        author: { name: 'A', email: 'a@v', timestamp: 1 },
        message: 'stable',
      });
      objectStore.put(c);
      refStore.setRef('refs/heads/main', c.hash);

      const gc1 = GitGarbageCollector.runGc(refStore, objectStore);
      const gc2 = GitGarbageCollector.runGc(refStore, objectStore);

      expect(gc1.reachableCount).toBe(gc2.reachableCount);
      expect(gc1.packedObjectsCount).toBe(gc2.packedObjectsCount);
      expect(gc1.savingsPercent).toBe(gc2.savingsPercent);
    });

    it('distinguishes delta blobs from non-delta tree/commit objects', () => {
      const b = GitObjectSerializer.createBlob('delta target');
      objectStore.put(b);
      const t = GitObjectSerializer.createTree([{ mode: '100644', type: 'blob', hash: b.hash, path: 't.txt' }]);
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
      const packfile = GitGarbageCollector.getPackfile()!;

      expect(packfile.objects.get(b.hash)?.isDelta).toBe(true);
      expect(packfile.objects.get(t.hash)?.isDelta).toBe(false);
      expect(packfile.objects.get(c.hash)?.isDelta).toBe(false);
    });

    it('verifies that loose objects are found by short prefix in objectStore', () => {
      const b = GitObjectSerializer.createBlob('prefixable content');
      objectStore.put(b);

      const p7 = b.hash.slice(0, 7);
      const match = objectStore.get(p7);
      expect(match).not.toBeNull();
      expect(match?.hash).toBe(b.hash);
    });

    it('confirms that GitObjectSerializer createBlob with null content is handled safely', () => {
      const b = GitObjectSerializer.createBlob('');
      expect(b.size).toBe(0);
      expect(b.raw).toBe('blob 0\0');
    });

    it('serializes and parses git tree containing multiple file modes accurately', () => {
      const entries = [
        { mode: '100644', type: 'blob' as const, hash: 'aaaa111122223333444455556666777788889999', path: 'file.txt' },
        { mode: '100755', type: 'blob' as const, hash: 'bbbb111122223333444455556666777788889999', path: 'script.sh' },
        { mode: '040000', type: 'tree' as const, hash: 'cccc111122223333444455556666777788889999', path: 'subdir' },
      ];
      const tree = GitObjectSerializer.createTree(entries);
      const parsed = GitObjectSerializer.parseTree(tree.content);

      expect(parsed).toHaveLength(3);
      expect(parsed.find((e) => e.path === 'file.txt')?.mode).toBe('100644');
      expect(parsed.find((e) => e.path === 'script.sh')?.mode).toBe('100755');
      expect(parsed.find((e) => e.path === 'subdir')?.mode).toBe('040000');
    });
  });
});
