import { GitCommand, CommandContext, CommandExecutionResult } from './command.interface';
import { Commit } from '@git-academy/shared';

export class LogCommand implements GitCommand {
  public name = 'log';
  public description = 'Show commit logs';

  public execute(
    args: string[],
    flags: Record<string, string | boolean>,
    ctx: CommandContext
  ): CommandExecutionResult {
    if (!ctx.stateManager.isInitialized()) {
      return {
        stdout: '',
        stderr: 'fatal: not a git repository (or any of the parent directories): .git',
        exitCode: 128,
      };
    }

    const currentBranch = ctx.stateManager.getCurrentBranch();
    const headCommit = ctx.stateManager.getHeadCommit();

    if (!headCommit) {
      return {
        stdout: '',
        stderr: `fatal: your current branch '${currentBranch}' does not have any commits yet`,
        exitCode: 128,
      };
    }

    const state = ctx.stateManager.getState();
    const isOneLine = Boolean(flags['oneline']);
    const limitFlag = flags['n'] || flags['max-count'];
    const limit = limitFlag ? parseInt(String(limitFlag), 10) : undefined;

    // Traverse parent links
    const commitList: Commit[] = [];
    const visited = new Set<string>();
    const queue = [headCommit.hash];

    while (queue.length > 0) {
      const currentHash = queue.shift()!;
      if (visited.has(currentHash)) continue;
      visited.add(currentHash);

      const commit = ctx.stateManager.getCommit(currentHash);
      if (commit) {
        commitList.push(commit);
        for (const p of commit.parents) {
          if (!visited.has(p)) {
            queue.push(p);
          }
        }
      }
    }

    // Sort by timestamp descending
    commitList.sort((a, b) => b.timestamp - a.timestamp);

    const sliced = limit ? commitList.slice(0, limit) : commitList;

    if (isOneLine) {
      const lines = sliced.map((c) => {
        const deco = this.getDecorators(c, state);
        const decoStr = deco ? ` \x1b[33m(${deco})\x1b[0m` : '';
        return `\x1b[33m${c.shortHash}\x1b[0m${decoStr} ${c.message}`;
      });
      return { stdout: lines.join('\n'), stderr: '', exitCode: 0 };
    }

    const blocks = sliced.map((c) => {
      const deco = this.getDecorators(c, state);
      const decoStr = deco ? ` \x1b[33m(${deco})\x1b[0m` : '';
      const dateStr = new Date(c.timestamp).toUTCString();
      return (
        `\x1b[33mcommit ${c.hash}\x1b[0m${decoStr}\n` +
        `Author: ${c.author.name} <${c.author.email}>\n` +
        `Date:   ${dateStr}\n\n` +
        `    ${c.message}\n`
      );
    });

    return {
      stdout: blocks.join('\n').trimEnd(),
      stderr: '',
      exitCode: 0,
    };
  }

  private getDecorators(commit: Commit, state: import('@git-academy/shared').GitState): string {
    const decos: string[] = [];
    const isHead =
      (state.head.type === 'branch' &&
        state.branches.find((b) => b.name === state.head.ref)?.commitHash === commit.hash) ||
      (state.head.type === 'detached' && state.head.ref === commit.hash);

    if (isHead) {
      if (state.head.type === 'branch') {
        decos.push(`HEAD -> \x1b[32m${state.head.ref}\x1b[33m`);
      } else {
        decos.push('HEAD');
      }
    }

    for (const b of state.branches) {
      if (b.commitHash === commit.hash && b.name !== state.currentBranch) {
        decos.push(`\x1b[32m${b.name}\x1b[33m`);
      }
    }

    return decos.join(', ');
  }
}
