import { describe, it, expect } from 'vitest';
import { VirtualFileSystem } from '../src/filesystem/virtual-filesystem';
import type { FileState } from '@git-academy/shared';

describe('VirtualFileSystem Comprehensive Tests', () => {
  it('1. should write, read, and check file existence', () => {
    const fs = new VirtualFileSystem();
    fs.writeFile('hello.txt', 'Hello World');
    expect(fs.exists('hello.txt')).toBe(true);
    expect(fs.readFile('hello.txt')).toBe('Hello World');
  });

  it('2. should return null for non-existent file', () => {
    const fs = new VirtualFileSystem();
    expect(fs.readFile('missing.txt')).toBeNull();
    expect(fs.exists('missing.txt')).toBe(false);
  });

  it('3. should update content and updatedAt timestamp on write', () => {
    const fs = new VirtualFileSystem();
    const f1 = fs.writeFile('config.json', '{"version": 1}');
    const f2 = fs.writeFile('config.json', '{"version": 2}');
    expect(f2.content).toBe('{"version": 2}');
    expect(f2.updatedAt).toBeGreaterThanOrEqual(f1.updatedAt);
  });

  it('4. should append to non-existent file cleanly', () => {
    const fs = new VirtualFileSystem();
    fs.appendFile('log.txt', 'first line');
    expect(fs.readFile('log.txt')).toBe('first line');
  });

  it('5. should append to existing file with newline separation', () => {
    const fs = new VirtualFileSystem();
    fs.writeFile('log.txt', 'line 1');
    fs.appendFile('log.txt', 'line 2');
    expect(fs.readFile('log.txt')).toBe('line 1\nline 2');
  });

  it('6. should append to file that already ends with newline without double newlines', () => {
    const fs = new VirtualFileSystem();
    fs.writeFile('log.txt', 'line 1\n');
    fs.appendFile('log.txt', 'line 2');
    expect(fs.readFile('log.txt')).toBe('line 1\nline 2');
  });

  it('7. should delete existing file and return true', () => {
    const fs = new VirtualFileSystem();
    fs.writeFile('temp.tmp', 'data');
    expect(fs.deleteFile('temp.tmp')).toBe(true);
    expect(fs.exists('temp.tmp')).toBe(false);
  });

  it('8. should return false when deleting non-existent file', () => {
    const fs = new VirtualFileSystem();
    expect(fs.deleteFile('ghost.txt')).toBe(false);
  });

  it('9. should rename file within same directory', () => {
    const fs = new VirtualFileSystem();
    fs.writeFile('old-name.ts', 'const x = 1;');
    expect(fs.renameFile('old-name.ts', 'new-name.ts')).toBe(true);
    expect(fs.exists('old-name.ts')).toBe(false);
    expect(fs.readFile('new-name.ts')).toBe('const x = 1;');
  });

  it('10. should rename/move file into different directory', () => {
    const fs = new VirtualFileSystem();
    fs.writeFile('app.ts', 'export const a = 1;');
    expect(fs.renameFile('app.ts', 'src/core/app.ts')).toBe(true);
    expect(fs.exists('app.ts')).toBe(false);
    expect(fs.readFile('src/core/app.ts')).toBe('export const a = 1;');
    expect(fs.isDirectory('src/core')).toBe(true);
  });

  it('11. should return false when renaming non-existent file', () => {
    const fs = new VirtualFileSystem();
    expect(fs.renameFile('nope.txt', 'dest.txt')).toBe(false);
  });

  it('12. should normalize paths with redundant slashes and dots', () => {
    const fs = new VirtualFileSystem();
    fs.writeFile('./src//utils/../utils/./math.ts', 'export const pi = 3.14;');
    expect(fs.exists('src/utils/math.ts')).toBe(true);
    expect(fs.readFile('/src/utils/math.ts')).toBe('export const pi = 3.14;');
  });

  it('13. should auto-create parent directories on writeFile', () => {
    const fs = new VirtualFileSystem();
    fs.writeFile('packages/core/src/index.ts', 'export default {};');
    expect(fs.isDirectory('packages')).toBe(true);
    expect(fs.isDirectory('packages/core')).toBe(true);
    expect(fs.isDirectory('packages/core/src')).toBe(true);
  });

  it('14. should explicitly create directory and list directories', () => {
    const fs = new VirtualFileSystem();
    fs.createDirectory('docs/architecture');
    expect(fs.isDirectory('docs')).toBe(true);
    expect(fs.isDirectory('docs/architecture')).toBe(true);
    const dirs = fs.listDirectories();
    expect(dirs).toContain('docs');
    expect(dirs).toContain('docs/architecture');
  });

  it('15. should list files in specific directory', () => {
    const fs = new VirtualFileSystem();
    fs.writeFile('src/a.ts', 'a');
    fs.writeFile('src/b.ts', 'b');
    fs.writeFile('docs/readme.md', 'docs');
    const srcFiles = fs.listFiles('src');
    expect(srcFiles).toEqual(['src/a.ts', 'src/b.ts']);
  });

  it('16. should emit create, modify, and delete events via onFileChange', () => {
    const fs = new VirtualFileSystem();
    const events: string[] = [];
    fs.onFileChange((path, type) => {
      events.push(`${type}:${path}`);
    });

    fs.writeFile('file1.txt', 'v1'); // create
    fs.writeFile('file1.txt', 'v2'); // modify
    fs.deleteFile('file1.txt'); // delete

    expect(events).toEqual([
      'create:file1.txt',
      'modify:file1.txt',
      'delete:file1.txt',
    ]);
  });

  it('17. should detect conflict markers in computeFileStates', () => {
    const fs = new VirtualFileSystem();
    const conflictContent = `<<<<<<< HEAD
const greeting = "Xin chào";
=======
const greeting = "Hello";
>>>>>>> feature/login`;

    fs.writeFile('login.ts', conflictContent);

    const states = fs.computeFileStates([], {});
    expect(states.conflictedFiles).toContain('login.ts');
    const loginState = states.workingTreeStates.find((f) => f.path === 'login.ts');
    expect(loginState?.status).toBe('conflict');
  });

  it('18. should clear all files and directories on clear()', () => {
    const fs = new VirtualFileSystem();
    fs.writeFile('a.txt', '1');
    fs.writeFile('b/c.txt', '2');
    fs.clear();
    expect(fs.getAllFiles()).toHaveLength(0);
    expect(fs.listDirectories()).toHaveLength(0);
  });

  it('19. should compute correct status: untracked vs modified vs unmodified', () => {
    const fs = new VirtualFileSystem();
    fs.writeFile('tracked.txt', 'original');
    fs.writeFile('untracked.txt', 'new');

    const staging: FileState[] = [{ path: 'tracked.txt', content: 'original', status: 'added', staged: true }];
    const head = { 'tracked.txt': 'original' };

    const computed = fs.computeFileStates(staging, head);
    expect(computed.untrackedFiles).toContain('untracked.txt');

    // Modify tracked file
    fs.writeFile('tracked.txt', 'edited');
    const computed2 = fs.computeFileStates(staging, head);
    expect(computed2.modifiedUnstaged).toContain('tracked.txt');
  });

  it('20. should support initialFiles constructor option', () => {
    const fs = new VirtualFileSystem([
      { path: 'readme.md', content: '# Welcome' },
      { path: 'package.json', content: '{}' },
    ]);
    expect(fs.getAllFiles()).toHaveLength(2);
    expect(fs.readFile('readme.md')).toBe('# Welcome');
    expect(fs.readFile('package.json')).toBe('{}');
  });
});
