import { describe, it, expect } from 'vitest';
import { GitObjectHasher } from '../src/objects/hasher';
import { RefManager } from '../src/refs/ref-manager';

describe('Deterministic GitObjectHasher & Normalized RefModel (Parts P & Q)', () => {
  describe('GitObjectHasher (Part P)', () => {
    it('generates a 40-character hexadecimal hash', () => {
      const hash = GitObjectHasher.hash('hello world');
      expect(hash).toHaveLength(40);
      expect(/^[0-9a-f]{40}$/.test(hash)).toBe(true);
    });

    it('is completely deterministic for identical inputs', () => {
      const hash1 = GitObjectHasher.hash('test data string');
      const hash2 = GitObjectHasher.hash('test data string');
      expect(hash1).toBe(hash2);
    });

    it('produces distinct hashes for different inputs (avoids collisions)', () => {
      const hashA = GitObjectHasher.hash('commit message A');
      const hashB = GitObjectHasher.hash('commit message B');
      expect(hashA).not.toBe(hashB);
    });

    it('computes blob hash with git standard header structure', () => {
      const content = 'console.log("hello");';
      const blobHash = GitObjectHasher.hashBlob(content);
      expect(blobHash).toHaveLength(40);
      // Deterministic check
      expect(GitObjectHasher.hashBlob(content)).toBe(blobHash);
    });

    it('computes tree hash deterministically regardless of entry insertion order', () => {
      const tree1 = { 'b.txt': 'hashB', 'a.txt': 'hashA' };
      const tree2 = { 'a.txt': 'hashA', 'b.txt': 'hashB' };

      const hash1 = GitObjectHasher.hashTree(tree1);
      const hash2 = GitObjectHasher.hashTree(tree2);
      expect(hash1).toBe(hash2);
    });

    it('computes commit hash with all metadata fields', () => {
      const commitParams = {
        treeHash: 'tree_hash_123',
        parents: ['parent_hash_001'],
        author: { name: 'Nguyen Van A', email: 'a@gitacademy.vn' },
        message: 'feat: initialize project',
        timestamp: 1700000000,
      };

      const hash = GitObjectHasher.hashCommit(commitParams);
      expect(hash).toHaveLength(40);

      // Same params produce same hash
      expect(GitObjectHasher.hashCommit(commitParams)).toBe(hash);

      // Changing timestamp changes hash
      const differentTime = GitObjectHasher.hashCommit({ ...commitParams, timestamp: 1700000001 });
      expect(differentTime).not.toBe(hash);

      // Changing message changes hash
      const differentMsg = GitObjectHasher.hashCommit({ ...commitParams, message: 'different message' });
      expect(differentMsg).not.toBe(hash);

      // Changing author changes hash
      const differentAuthor = GitObjectHasher.hashCommit({
        ...commitParams,
        author: { name: 'Nguyen Van B', email: 'b@gitacademy.vn' },
      });
      expect(differentAuthor).not.toBe(hash);
    });

    it('produces short hash with 7 characters', () => {
      const full = GitObjectHasher.hash('sample commit');
      const short = GitObjectHasher.toShortHash(full);
      expect(short).toHaveLength(7);
      expect(full.startsWith(short)).toBe(true);
    });
  });

  describe('RefManager & Normalized Ref Model (Part Q)', () => {
    it('normalizes local branch names to refs/heads/<name>', () => {
      const rm = new RefManager();
      expect(rm.normalizeRefName('main')).toBe('refs/heads/main');
      expect(rm.normalizeRefName('feature/login')).toBe('refs/heads/feature/login');
      expect(rm.normalizeRefName('refs/heads/main')).toBe('refs/heads/main');
    });

    it('normalizes remote tracking branches to refs/remotes/<name>', () => {
      const rm = new RefManager();
      expect(rm.normalizeRefName('origin/main')).toBe('refs/remotes/origin/main');
      expect(rm.normalizeRefName('origin/feature/auth')).toBe('refs/remotes/origin/feature/auth');
      expect(rm.normalizeRefName('upstream/main', 'remote')).toBe('refs/remotes/upstream/main');
    });

    it('normalizes tags to refs/tags/<name>', () => {
      const rm = new RefManager();
      expect(rm.normalizeRefName('v1.0.0')).toBe('refs/tags/v1.0.0');
      expect(rm.normalizeRefName('tag-release')).toBe('refs/tags/tag-release');
    });

    it('keeps HEAD unchanged', () => {
      const rm = new RefManager();
      expect(rm.normalizeRefName('HEAD')).toBe('HEAD');
    });

    it('sets and retrieves local branch references', () => {
      const rm = new RefManager();
      rm.setRef('main', 'c111111', 'branch');

      const ref = rm.getRef('main');
      expect(ref).toBeDefined();
      expect(ref?.name).toBe('refs/heads/main');
      expect(ref?.target).toBe('c111111');
      expect(ref?.type).toBe('branch');
    });

    it('sets and retrieves remote tracking branch references', () => {
      const rm = new RefManager();
      rm.setRef('origin/main', 'c222222', 'remote');

      const ref = rm.getRef('origin/main');
      expect(ref).toBeDefined();
      expect(ref?.name).toBe('refs/remotes/origin/main');
      expect(ref?.target).toBe('c222222');
      expect(ref?.type).toBe('remote');
    });

    it('resolves symbolic reference HEAD to underlying branch commit', () => {
      const rm = new RefManager();
      rm.setRef('main', 'commit_hash_final', 'branch');
      rm.setSymbolicRef('HEAD', 'main');

      const resolved = rm.resolveRef('HEAD');
      expect(resolved).toBe('commit_hash_final');
    });

    it('handles detached HEAD state pointing directly to commit hash', () => {
      const rm = new RefManager();
      rm.setRef('HEAD', 'detached_commit_hash', 'symref');

      const resolved = rm.resolveRef('HEAD');
      expect(resolved).toBe('detached_commit_hash');
    });

    it('lists all branch references cleanly', () => {
      const rm = new RefManager();
      rm.setRef('main', 'c1');
      rm.setRef('feature/login', 'c2');
      rm.setRef('origin/main', 'c1', 'remote');

      const branches = rm.listHeads();
      const names = branches.map((b) => b.name);
      expect(names).toContain('refs/heads/main');
      expect(names).toContain('refs/heads/feature/login');
      expect(names).not.toContain('refs/remotes/origin/main');
    });

    it('lists all remote tracking references cleanly', () => {
      const rm = new RefManager();
      rm.setRef('main', 'c1');
      rm.setRef('origin/main', 'c1', 'remote');
      rm.setRef('origin/dev', 'c2', 'remote');

      const remotes = rm.listRemotes();
      const names = remotes.map((r) => r.name);
      expect(names).toContain('refs/remotes/origin/main');
      expect(names).toContain('refs/remotes/origin/dev');
      expect(names).not.toContain('refs/heads/main');
    });

    it('deletes branch references safely', () => {
      const rm = new RefManager();
      rm.setRef('feature/temp', 'c3');
      expect(rm.getRef('feature/temp')).toBeDefined();

      const deleted = rm.deleteRef('feature/temp');
      expect(deleted).toBe(true);
      expect(rm.getRef('feature/temp')).toBeUndefined();
    });

    it('prevents infinite recursion on circular symbolic references', () => {
      const rm = new RefManager();
      rm.setSymbolicRef('refA', 'refB');
      rm.setSymbolicRef('refB', 'refA');

      const resolved = rm.resolveRef('refA');
      expect(resolved).toBeNull();
    });
  });
});
