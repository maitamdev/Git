import { describe, it, expect } from 'vitest';
import { applyTerminalLineEdit } from '../../apps/playground/src/components/terminal-shortcuts';

describe('TerminalView Keyboard Shortcuts & Line Editing', () => {
  describe('Ctrl+U (kill-line-start: delete from cursor to line start)', () => {
    it('deletes all characters when cursor is at the end of the line', () => {
      const input = 'git commit -m "feat: user profile"';
      const pos = input.length;
      const result = applyTerminalLineEdit(input, pos, 'kill-line-start');
      expect(result.nextInput).toBe('');
      expect(result.nextPos).toBe(0);
    });

    it('does nothing when cursor is already at position 0', () => {
      const input = 'git status';
      const result = applyTerminalLineEdit(input, 0, 'kill-line-start');
      expect(result.nextInput).toBe('git status');
      expect(result.nextPos).toBe(0);
    });

    it('deletes only preceding characters when cursor is in the middle', () => {
      const input = 'git add package.json';
      // Cursor right before "package.json" (index 8)
      const pos = 8;
      const result = applyTerminalLineEdit(input, pos, 'kill-line-start');
      expect(result.nextInput).toBe('package.json');
      expect(result.nextPos).toBe(0);
    });

    it('handles empty input cleanly', () => {
      const result = applyTerminalLineEdit('', 0, 'kill-line-start');
      expect(result.nextInput).toBe('');
      expect(result.nextPos).toBe(0);
    });
  });

  describe('Ctrl+K (kill-line-end: delete from cursor to line end)', () => {
    it('deletes all characters when cursor is at position 0', () => {
      const input = 'git log --oneline -n 5';
      const result = applyTerminalLineEdit(input, 0, 'kill-line-end');
      expect(result.nextInput).toBe('');
      expect(result.nextPos).toBe(0);
    });

    it('does nothing when cursor is already at the end', () => {
      const input = 'git branch -M main';
      const pos = input.length;
      const result = applyTerminalLineEdit(input, pos, 'kill-line-end');
      expect(result.nextInput).toBe('git branch -M main');
      expect(result.nextPos).toBe(pos);
    });

    it('deletes trailing characters when cursor is in the middle', () => {
      const input = 'git checkout -b feature/auth-module';
      // Cursor right after "-b " (index 16)
      const pos = 16;
      const result = applyTerminalLineEdit(input, pos, 'kill-line-end');
      expect(result.nextInput).toBe('git checkout -b ');
      expect(result.nextPos).toBe(16);
    });

    it('handles empty input cleanly', () => {
      const result = applyTerminalLineEdit('', 0, 'kill-line-end');
      expect(result.nextInput).toBe('');
      expect(result.nextPos).toBe(0);
    });
  });

  describe('Ctrl+W (delete-word-back: delete previous word before cursor)', () => {
    it('deletes a single word when cursor is at end', () => {
      const input = 'commit';
      const result = applyTerminalLineEdit(input, input.length, 'delete-word-back');
      expect(result.nextInput).toBe('');
      expect(result.nextPos).toBe(0);
    });

    it('deletes the last word in a multi-word command', () => {
      const input = 'git commit';
      const result = applyTerminalLineEdit(input, input.length, 'delete-word-back');
      expect(result.nextInput).toBe('git ');
      expect(result.nextPos).toBe(4);
    });

    it('deletes word with flag or punctuation', () => {
      const input = 'git push -u origin main';
      const result = applyTerminalLineEdit(input, input.length, 'delete-word-back');
      expect(result.nextInput).toBe('git push -u origin ');
      expect(result.nextPos).toBe(19);
    });

    it('deletes word when cursor has trailing whitespace', () => {
      const input = 'git add index.html   ';
      const result = applyTerminalLineEdit(input, input.length, 'delete-word-back');
      expect(result.nextInput).toBe('git add ');
      expect(result.nextPos).toBe(8);
    });

    it('deletes word before middle cursor preserving suffix', () => {
      const input = 'git switch -c feature/payments';
      // Cursor right after "-c" (index 13)
      const pos = 13;
      const result = applyTerminalLineEdit(input, pos, 'delete-word-back');
      expect(result.nextInput).toBe('git switch  feature/payments');
      expect(result.nextPos).toBe(11);
    });

    it('does nothing when cursor is at position 0', () => {
      const input = 'git diff HEAD~1';
      const result = applyTerminalLineEdit(input, 0, 'delete-word-back');
      expect(result.nextInput).toBe('git diff HEAD~1');
      expect(result.nextPos).toBe(0);
    });

    it('handles repeated Ctrl+W back to empty string', () => {
      let input = 'git rebase -i HEAD~3';
      let pos = input.length;

      let res = applyTerminalLineEdit(input, pos, 'delete-word-back');
      expect(res.nextInput).toBe('git rebase -i ');

      res = applyTerminalLineEdit(res.nextInput, res.nextPos, 'delete-word-back');
      expect(res.nextInput).toBe('git rebase ');

      res = applyTerminalLineEdit(res.nextInput, res.nextPos, 'delete-word-back');
      expect(res.nextInput).toBe('git ');

      res = applyTerminalLineEdit(res.nextInput, res.nextPos, 'delete-word-back');
      expect(res.nextInput).toBe('');
      expect(res.nextPos).toBe(0);
    });
  });
});
