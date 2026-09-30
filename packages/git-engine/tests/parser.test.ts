import { describe, it, expect } from 'vitest';
import { GitCommandParser } from '../src/terminal/parser';

describe('GitCommandParser Comprehensive Tests', () => {
  const parser = new GitCommandParser();

  it('1. should parse simple git status', () => {
    const cmd = parser.parse('git status');
    expect(cmd.action).toBe('status');
    expect(cmd.args).toEqual([]);
    expect(cmd.flags).toEqual({});
  });

  it('2. should parse git init with custom branch flag', () => {
    const cmd = parser.parse('git init -b main');
    expect(cmd.action).toBe('init');
    expect(cmd.flags['b']).toBe('main');
  });

  it('3. should parse commit message in double quotes', () => {
    const cmd = parser.parse('git commit -m "feat: user authentication system"');
    expect(cmd.action).toBe('commit');
    expect(cmd.flags['m']).toBe('feat: user authentication system');
  });

  it('4. should parse commit message in single quotes', () => {
    const cmd = parser.parse("git commit -m 'fix: resolve navbar overlap issue'");
    expect(cmd.action).toBe('commit');
    expect(cmd.flags['m']).toBe('fix: resolve navbar overlap issue');
  });

  it('5. should parse commit with long flag --message', () => {
    const cmd = parser.parse('git commit --message "docs: update readme"');
    expect(cmd.action).toBe('commit');
    expect(cmd.flags['message']).toBe('docs: update readme');
  });

  it('6. should parse boolean flag --staged without consuming next argument as value', () => {
    const cmd = parser.parse('git diff --staged src/index.ts');
    expect(cmd.action).toBe('diff');
    expect(cmd.flags['staged']).toBe(true);
    expect(cmd.args).toEqual(['src/index.ts']);
  });

  it('7. should parse boolean flag --cached without consuming file path', () => {
    const cmd = parser.parse('git diff --cached login.js');
    expect(cmd.action).toBe('diff');
    expect(cmd.flags['cached']).toBe(true);
    expect(cmd.args).toEqual(['login.js']);
  });

  it('8. should parse git reset --hard HEAD~1', () => {
    const cmd = parser.parse('git reset --hard HEAD~1');
    expect(cmd.action).toBe('reset');
    expect(cmd.flags['hard']).toBe(true);
    expect(cmd.args).toEqual(['HEAD~1']);
  });

  it('9. should parse git reset --soft', () => {
    const cmd = parser.parse('git reset --soft HEAD~1');
    expect(cmd.action).toBe('reset');
    expect(cmd.flags['soft']).toBe(true);
    expect(cmd.args).toEqual(['HEAD~1']);
  });

  it('10. should parse git reset --mixed', () => {
    const cmd = parser.parse('git reset --mixed HEAD');
    expect(cmd.action).toBe('reset');
    expect(cmd.flags['mixed']).toBe(true);
    expect(cmd.args).toEqual(['HEAD']);
  });

  it('11. should parse git merge --abort', () => {
    const cmd = parser.parse('git merge --abort');
    expect(cmd.action).toBe('merge');
    expect(cmd.flags['abort']).toBe(true);
    expect(cmd.args).toEqual([]);
  });

  it('12. should parse git switch with -c flag', () => {
    const cmd = parser.parse('git switch -c feature/payments');
    expect(cmd.action).toBe('switch');
    expect(cmd.flags['c']).toBe('feature/payments');
  });

  it('13. should parse git checkout with -b flag', () => {
    const cmd = parser.parse('git checkout -b feature/auth');
    expect(cmd.action).toBe('checkout');
    expect(cmd.flags['b']).toBe('feature/auth');
  });

  it('14. should parse git add with multiple file paths', () => {
    const cmd = parser.parse('git add file1.txt file2.txt file3.txt');
    expect(cmd.action).toBe('add');
    expect(cmd.args).toEqual(['file1.txt', 'file2.txt', 'file3.txt']);
  });

  it('15. should parse git add . dot path', () => {
    const cmd = parser.parse('git add .');
    expect(cmd.action).toBe('add');
    expect(cmd.args).toEqual(['.']);
  });

  it('16. should parse git log with --oneline', () => {
    const cmd = parser.parse('git log --oneline');
    expect(cmd.action).toBe('log');
    expect(cmd.flags['oneline']).toBe(true);
  });

  it('17. should parse git status with -s and --short', () => {
    const cmd1 = parser.parse('git status -s');
    expect(cmd1.flags['s']).toBe(true);
    const cmd2 = parser.parse('git status --short');
    expect(cmd2.flags['short']).toBe(true);
  });

  it('18. should parse shell command touch with multiple files', () => {
    const cmd = parser.parse('touch a.js b.js c.js');
    expect(cmd.action).toBe('touch');
    expect(cmd.args).toEqual(['a.js', 'b.js', 'c.js']);
  });

  it('19. should parse shell command echo with overwrite redirection >', () => {
    const cmd = parser.parse('echo "hello world" > greeting.txt');
    expect(cmd.action).toBe('echo');
    expect(cmd.args).toEqual(['hello world', '>', 'greeting.txt']);
  });

  it('20. should parse shell command echo with append redirection >>', () => {
    const cmd = parser.parse('echo "line 2" >> greeting.txt');
    expect(cmd.action).toBe('echo');
    expect(cmd.args).toEqual(['line 2', '>>', 'greeting.txt']);
  });

  it('21. should handle multiple consecutive spaces gracefully', () => {
    const cmd = parser.parse('   git    commit    -m    "clean spacing"   ');
    expect(cmd.action).toBe('commit');
    expect(cmd.flags['m']).toBe('clean spacing');
  });

  it('22. should parse git stash subcommands: pop, apply, drop, list', () => {
    expect(parser.parse('git stash pop').args).toEqual(['pop']);
    expect(parser.parse('git stash apply').args).toEqual(['apply']);
    expect(parser.parse('git stash drop').args).toEqual(['drop']);
    expect(parser.parse('git stash list').args).toEqual(['list']);
  });
});
