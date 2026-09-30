import { describe, it, expect } from 'vitest';
import { levenshteinDistance, findClosestMatch } from '../src/terminal/levenshtein';
import { explainCommand } from '../../../apps/playground/src/components/CommandExplainer';
import { computeDiffLines } from '../../../apps/playground/src/components/DiffView';

describe('Diff Engine, Command Explainer, & Typo Correction (Parts L, M, T, U, V)', () => {
  describe('Part T: Diff Engine (computeDiffLines)', () => {
    it('returns empty array when both old and new content are empty or null', () => {
      const diff1 = computeDiffLines(null, null);
      expect(diff1).toEqual([]);

      const diff2 = computeDiffLines('', '');
      expect(diff2).toHaveLength(1);
      expect(diff2[0].type).toBe('normal');
      expect(diff2[0].content).toBe('');
    });

    it('identifies file creation as additions only', () => {
      const newCode = 'line 1\nline 2\nline 3';
      const diff = computeDiffLines(null, newCode);

      expect(diff).toHaveLength(3);
      expect(diff.every((d) => d.type === 'addition')).toBe(true);
      expect(diff[0].newLineNumber).toBe(1);
      expect(diff[1].newLineNumber).toBe(2);
      expect(diff[2].newLineNumber).toBe(3);
      expect(diff[0].content).toBe('line 1');
    });

    it('identifies file deletion as deletions only', () => {
      const oldCode = 'line A\nline B';
      const diff = computeDiffLines(oldCode, null);

      expect(diff).toHaveLength(2);
      expect(diff.every((d) => d.type === 'deletion')).toBe(true);
      expect(diff[0].oldLineNumber).toBe(1);
      expect(diff[1].oldLineNumber).toBe(2);
      expect(diff[0].content).toBe('line A');
    });

    it('identifies identical lines as normal', () => {
      const content = 'unchanged 1\nunchanged 2';
      const diff = computeDiffLines(content, content);

      expect(diff).toHaveLength(2);
      expect(diff.every((d) => d.type === 'normal')).toBe(true);
      expect(diff[0].oldLineNumber).toBe(1);
      expect(diff[0].newLineNumber).toBe(1);
    });

    it('detects modified lines with proper replacement pairs', () => {
      const oldCode = 'const a = 1;';
      const newCode = 'const a = 2;';
      const diff = computeDiffLines(oldCode, newCode);

      expect(diff).toHaveLength(2);
      expect(diff[0].type).toBe('deletion');
      expect(diff[0].content).toBe('const a = 1;');
      expect(diff[1].type).toBe('addition');
      expect(diff[1].content).toBe('const a = 2;');
    });

    it('handles mixed changes: unchanged, deleted, added', () => {
      const oldCode = 'header\nold logic\nfooter';
      const newCode = 'header\nnew logic\nfooter';
      const diff = computeDiffLines(oldCode, newCode);

      expect(diff[0].type).toBe('normal');
      expect(diff[0].content).toBe('header');
      expect(diff[1].type).toBe('deletion');
      expect(diff[1].content).toBe('old logic');
      expect(diff[2].type).toBe('addition');
      expect(diff[2].content).toBe('new logic');
      expect(diff[3].type).toBe('normal');
      expect(diff[3].content).toBe('footer');
    });
  });

  describe('Part U: Levenshtein Distance & Typo Detection', () => {
    it('returns 0 for identical strings', () => {
      expect(levenshteinDistance('commit', 'commit')).toBe(0);
      expect(levenshteinDistance('', '')).toBe(0);
    });

    it('calculates single-character additions, deletions, and substitutions as 1', () => {
      expect(levenshteinDistance('git', 'gitt')).toBe(1); // addition
      expect(levenshteinDistance('branch', 'brach')).toBe(1); // deletion
      expect(levenshteinDistance('push', 'pish')).toBe(1); // substitution
    });

    it('calculates distance for arbitrary typos accurately', () => {
      expect(levenshteinDistance('commti', 'commit')).toBe(2);
      expect(levenshteinDistance('stauts', 'status')).toBe(2);
      expect(levenshteinDistance('checkout', 'chekc-out')).toBe(2);
    });

    it('finds closest matching git command among candidates', () => {
      const candidates = ['init', 'status', 'add', 'commit', 'branch', 'checkout', 'merge', 'push', 'pull', 'remote'];

      expect(findClosestMatch('commti', candidates)).toBe('commit');
      expect(findClosestMatch('stauts', candidates)).toBe('status');
      expect(findClosestMatch('brnach', candidates)).toBe('branch');
      expect(findClosestMatch('psuh', candidates)).toBe('push');
      expect(findClosestMatch('pul', candidates)).toBe('pull');
      expect(findClosestMatch('chekcout', candidates)).toBe('checkout');
      expect(findClosestMatch('remot', candidates)).toBe('remote');
    });

    it('returns null if typo distance exceeds maxDistance threshold', () => {
      const candidates = ['init', 'status', 'commit'];
      expect(findClosestMatch('completely_different_command', candidates, 3)).toBeNull();
    });

    it('is case-insensitive when matching commands', () => {
      const candidates = ['commit', 'status'];
      expect(findClosestMatch('COMMTI', candidates)).toBe('commit');
      expect(findClosestMatch('StAuTs', candidates)).toBe('status');
    });
  });

  describe('Part V: Command Explanation Mode (explainCommand)', () => {
    it('explains "git" prefix correctly', () => {
      const explained = explainCommand('git');
      expect(explained).toHaveLength(1);
      expect(explained[0].token).toBe('git');
      expect(explained[0].explanation).toContain('chương trình quản lý');
    });

    it('explains "git add ."', () => {
      const explained = explainCommand('git add .');
      expect(explained).toHaveLength(3);
      expect(explained[0].token).toBe('git');
      expect(explained[1].token).toBe('add');
      expect(explained[1].explanation).toContain('Staging Area');
      expect(explained[2].token).toBe('.');
      expect(explained[2].explanation).toContain('toàn bộ các file');
    });

    it('explains "git commit -m <msg>"', () => {
      const explained = explainCommand('git commit -m "feat: login"');
      expect(explained).toHaveLength(4);
      expect(explained[1].token).toBe('commit');
      expect(explained[1].explanation).toContain('snapshot');
      expect(explained[2].token).toBe('-m');
      expect(explained[2].explanation).toContain('thông điệp');
      expect(explained[3].token).toContain('feat: login');
      expect(explained[3].explanation).toContain('chuỗi');
    });

    it('explains branch creation and switching "git switch -c feature/login"', () => {
      const explained = explainCommand('git switch -c feature/login');
      expect(explained).toHaveLength(4);
      expect(explained[1].token).toBe('switch');
      expect(explained[2].token).toBe('-c');
      expect(explained[2].explanation).toContain('Tạo mới một nhánh');
      expect(explained[3].token).toBe('feature/login');
    });

    it('explains remote and tracking "git push -u origin main"', () => {
      const explained = explainCommand('git push -u origin main');
      expect(explained).toHaveLength(5);
      expect(explained[1].token).toBe('push');
      expect(explained[2].token).toBe('-u');
      expect(explained[2].explanation).toContain('upstream');
      expect(explained[3].token).toBe('origin');
      expect(explained[4].token).toBe('main');
    });

    it('explains collaboration commands: clone, fetch, pull, merge', () => {
      expect(explainCommand('git clone')[1].explanation).toContain('Sao chép toàn bộ kho');
      expect(explainCommand('git fetch')[1].explanation).toContain('Tải về lịch sử');
      expect(explainCommand('git pull')[1].explanation).toContain('Tải về và tự động gộp');
      expect(explainCommand('git merge')[1].explanation).toContain('Hợp nhất lịch sử');
    });

    it('falls back gracefully on arbitrary command arguments', () => {
      const explained = explainCommand('git log --oneline --graph');
      expect(explained).toHaveLength(4);
      expect(explained[2].token).toBe('--oneline');
      expect(explained[2].explanation).toContain('Tham số / đối số');
    });
  });
});
