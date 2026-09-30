import { describe, it, expect } from 'vitest';
import {
  parseConflictBlocks,
  resolveConflictBlock,
} from '../../apps/playground/src/components/MergeConflictEditor';

describe('MergeConflictEditor Parser & Resolver (Part 4.3)', () => {
  // =========================================================================
  // 1. Conflict Parser
  // =========================================================================
  describe('parseConflictBlocks', () => {
    it('detects standard Git conflict markers', () => {
      const raw = `import React from 'react';
<<<<<<< HEAD
const API_URL = "https://api.main.vn";
=======
const API_URL = "https://api.feature.vn";
>>>>>>> feature/auth
export default API_URL;`;

      const { hasConflict, blocks } = parseConflictBlocks(raw);
      expect(hasConflict).toBe(true);
      expect(blocks).toHaveLength(1);
      expect(blocks[0].branchName).toBe('feature/auth');
      expect(blocks[0].currentContent).toContain('api.main.vn');
      expect(blocks[0].incomingContent).toContain('api.feature.vn');
    });

    it('detects multiple conflict blocks in the same file', () => {
      const raw = `<<<<<<< HEAD
line 1 main
=======
line 1 branch
>>>>>>> feature-1
middle content
<<<<<<< HEAD
line 10 main
=======
line 10 branch
>>>>>>> feature-1`;

      const { hasConflict, blocks } = parseConflictBlocks(raw);
      expect(hasConflict).toBe(true);
      expect(blocks).toHaveLength(2);
      expect(blocks[0].currentContent).toContain('line 1 main');
      expect(blocks[1].currentContent).toContain('line 10 main');
    });

    it('returns hasConflict = false when no conflict markers are present', () => {
      const raw = `console.log("clean file");`;
      const { hasConflict, blocks } = parseConflictBlocks(raw);
      expect(hasConflict).toBe(false);
      expect(blocks).toEqual([]);
    });

    it('handles empty string content gracefully', () => {
      const { hasConflict, blocks } = parseConflictBlocks('');
      expect(hasConflict).toBe(false);
      expect(blocks).toEqual([]);
    });

    it('extracts complex branch names containing slashes, hyphens, and version numbers', () => {
      const raw = `<<<<<<< HEAD
v1.0.0
=======
v1.1.0-hotfix/urgent-patch
>>>>>>> release/v1.1.0-hotfix/urgent-patch`;

      const { hasConflict, blocks } = parseConflictBlocks(raw);
      expect(hasConflict).toBe(true);
      expect(blocks[0].branchName).toBe('release/v1.1.0-hotfix/urgent-patch');
    });

    it('handles Windows CRLF line endings in conflict markers', () => {
      const raw = 'header\r\n<<<<<<< HEAD\r\ncurrent line\r\n=======\r\nincoming line\r\n>>>>>>> feature\r\nfooter';
      const { hasConflict, blocks } = parseConflictBlocks(raw);
      expect(hasConflict).toBe(true);
      expect(blocks).toHaveLength(1);
      expect(blocks[0].currentContent).toContain('current line');
      expect(blocks[0].incomingContent).toContain('incoming line');
    });

    it('parses conflict when incoming or current section is empty', () => {
      const raw = `<<<<<<< HEAD
=======
new incoming code
>>>>>>> feature/add-code`;

      const { hasConflict, blocks } = parseConflictBlocks(raw);
      expect(hasConflict).toBe(true);
      expect(blocks[0].currentContent).toBe('');
      expect(blocks[0].incomingContent).toContain('new incoming code');
    });
  });

  // =========================================================================
  // 2. Conflict Resolution Helper
  // =========================================================================
  describe('resolveConflictBlock', () => {
    const raw = `import config from './config';
<<<<<<< HEAD
export const port = 3000;
=======
export const port = 8080;
>>>>>>> feature/port-change
export const host = 'localhost';`;

    it('resolves conflict by accepting current changes (HEAD)', () => {
      const { blocks } = parseConflictBlocks(raw);
      expect(blocks).toHaveLength(1);

      const resolved = resolveConflictBlock(raw, blocks[0], 'current');
      expect(resolved).toContain('export const port = 3000;');
      expect(resolved).not.toContain('export const port = 8080;');
      expect(resolved).not.toContain('<<<<<<<');
      expect(resolved).not.toContain('=======');
      expect(resolved).not.toContain('>>>>>>>');
      expect(resolved).toContain("import config from './config';");
      expect(resolved).toContain("export const host = 'localhost';");

      const after = parseConflictBlocks(resolved);
      expect(after.hasConflict).toBe(false);
    });

    it('resolves conflict by accepting incoming changes (branch)', () => {
      const { blocks } = parseConflictBlocks(raw);
      const resolved = resolveConflictBlock(raw, blocks[0], 'incoming');
      expect(resolved).toContain('export const port = 8080;');
      expect(resolved).not.toContain('export const port = 3000;');
      expect(resolved).not.toContain('<<<<<<<');

      const after = parseConflictBlocks(resolved);
      expect(after.hasConflict).toBe(false);
    });

    it('resolves conflict by accepting both changes (concatenation)', () => {
      const { blocks } = parseConflictBlocks(raw);
      const resolved = resolveConflictBlock(raw, blocks[0], 'both');
      expect(resolved).toContain('export const port = 3000;');
      expect(resolved).toContain('export const port = 8080;');
      expect(resolved).not.toContain('<<<<<<<');
      expect(resolved).not.toContain('=======');
      expect(resolved).not.toContain('>>>>>>>');

      const after = parseConflictBlocks(resolved);
      expect(after.hasConflict).toBe(false);
    });

    it('resolves multiple conflict blocks sequentially until file is completely clean', () => {
      let content = `start
<<<<<<< HEAD
A1
=======
B1
>>>>>>> feat1
middle
<<<<<<< HEAD
A2
=======
B2
>>>>>>> feat2
end`;

      // Resolve first conflict: accept current (A1)
      let parsed = parseConflictBlocks(content);
      expect(parsed.blocks).toHaveLength(2);
      content = resolveConflictBlock(content, parsed.blocks[0], 'current');

      // Second conflict should still be detected
      parsed = parseConflictBlocks(content);
      expect(parsed.blocks).toHaveLength(1);
      expect(parsed.blocks[0].incomingContent).toContain('B2');

      // Resolve second conflict: accept incoming (B2)
      content = resolveConflictBlock(content, parsed.blocks[0], 'incoming');

      // Final check: completely clean
      parsed = parseConflictBlocks(content);
      expect(parsed.hasConflict).toBe(false);
      expect(content).toContain('A1');
      expect(content).toContain('B2');
      expect(content).toContain('start');
      expect(content).toContain('middle');
      expect(content).toContain('end');
    });

    it('preserves multiline formatting and indentation inside resolved content', () => {
      const code = `function calculate() {
<<<<<<< HEAD
  const x = 10;
  const y = 20;
  return x + y;
=======
  const a = 100;
  const b = 200;
  return a * b;
>>>>>>> feat/multiply
}`;

      const { blocks } = parseConflictBlocks(code);
      const resolved = resolveConflictBlock(code, blocks[0], 'current');
      expect(resolved.replace(/\s+/g, ' ').trim()).toBe(
        `function calculate() { const x = 10; const y = 20; return x + y; }`.trim()
      );
    });

    it('handles consecutive conflict blocks without intervening text', () => {
      const code = `<<<<<<< HEAD
first current
=======
first incoming
>>>>>>> feat-a
<<<<<<< HEAD
second current
=======
second incoming
>>>>>>> feat-b`;

      const { hasConflict, blocks } = parseConflictBlocks(code);
      expect(hasConflict).toBe(true);
      expect(blocks).toHaveLength(2);
      expect(blocks[0].currentContent).toContain('first current');
      expect(blocks[1].incomingContent).toContain('second incoming');
    });

    it('ignores false positive lines like C++ shift operators << or HTML tags without 7 markers', () => {
      const cleanCode = `std::cout << "value" << std::endl;
const isGreater = x >> 2;
const tag = <<<<<< invalid;`;

      const { hasConflict, blocks } = parseConflictBlocks(cleanCode);
      expect(hasConflict).toBe(false);
      expect(blocks).toHaveLength(0);
    });

    it('handles commit hashes as incoming branch identifiers', () => {
      const code = `<<<<<<< HEAD
my code
=======
upstream code
>>>>>>> 7b3d90f23a1c`;

      const { hasConflict, blocks } = parseConflictBlocks(code);
      expect(hasConflict).toBe(true);
      expect(blocks[0].branchName).toBe('7b3d90f23a1c');
    });

    it('re-parses resolved text and confirms block count decreases by exactly 1 per resolution', () => {
      let code = `<<<<<<< HEAD
c1
=======
i1
>>>>>>> b1
middle
<<<<<<< HEAD
c2
=======
i2
>>>>>>> b2`;

      let parsed = parseConflictBlocks(code);
      expect(parsed.blocks).toHaveLength(2);

      code = resolveConflictBlock(code, parsed.blocks[0], 'incoming');
      parsed = parseConflictBlocks(code);
      expect(parsed.blocks).toHaveLength(1);

      code = resolveConflictBlock(code, parsed.blocks[0], 'current');
      parsed = parseConflictBlocks(code);
      expect(parsed.blocks).toHaveLength(0);
      expect(parsed.hasConflict).toBe(false);
    });
  });
});
