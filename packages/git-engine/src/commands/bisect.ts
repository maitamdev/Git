import { CommandContext, CommandExecutionResult, GitCommand } from './command.interface';
import { BisectState, Commit } from '@git-academy/shared';

export class BisectCommand implements GitCommand {
  public name = 'bisect';
  public description = 'Sử dụng tìm kiếm nhị phân để truy tìm commit sinh lỗi';
  public usage = 'git bisect (start | bad [<commit>] | good [<commit>] | reset)';

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

    if (args.length === 0) {
      return {
        stdout: '',
        stderr: 'usage: git bisect [start|bad|good|reset]',
        exitCode: 1,
      };
    }

    const sub = args[0];
    const currentBranch = ctx.stateManager.getCurrentBranch();
    const headCommit = ctx.stateManager.getHeadCommit();
    const bisectState = ctx.stateManager.getBisectState();

    // 1. git bisect start
    if (sub === 'start') {
      if (!headCommit) {
        return {
          stdout: '',
          stderr: 'fatal: cannot bisect on empty repository',
          exitCode: 128,
        };
      }

      ctx.stateManager.setBisectState({
        inProgress: true,
        badCommit: null,
        goodCommits: [],
        candidates: [],
        currentCommit: null,
        originalBranch: currentBranch,
        originalHeadCommit: headCommit.hash,
      });

      return {
        stdout: 'status: waiting for both good and bad commits',
        stderr: '',
        exitCode: 0,
      };
    }

    // 2. git bisect reset
    if (sub === 'reset') {
      if (!bisectState || !bisectState.inProgress) {
        return {
          stdout: 'We are not bisecting.',
          stderr: '',
          exitCode: 0,
        };
      }

      // Restore original HEAD
      ctx.stateManager.updateHeadPointer(bisectState.originalHeadCommit);
      const orig = ctx.stateManager.getCommit(bisectState.originalHeadCommit);
      if (orig) {
        ctx.fs.clear();
        for (const [p, c] of Object.entries(orig.tree)) {
          ctx.fs.writeFile(p, c);
        }
      }
      ctx.stateManager.setBisectState(null);

      return {
        stdout: `Previous HEAD position was ${bisectState.originalHeadCommit.substring(0, 7)}\nSwitched to branch '${bisectState.originalBranch}'`,
        stderr: '',
        exitCode: 0,
      };
    }

    // 2.5 git bisect log
    if (sub === 'log') {
      if (!bisectState || !bisectState.inProgress) {
        return {
          stdout: '',
          stderr: 'fatal: We are not bisecting.',
          exitCode: 1,
        };
      }
      const lines = ['git bisect start'];
      if (bisectState.badCommit) {
        lines.push(`git bisect bad ${bisectState.badCommit.substring(0, 7)}`);
      }
      for (const g of bisectState.goodCommits) {
        lines.push(`git bisect good ${g.substring(0, 7)}`);
      }
      return {
        stdout: lines.join('\n'),
        stderr: '',
        exitCode: 0,
      };
    }

    if (!bisectState || !bisectState.inProgress) {
      return {
        stdout: '',
        stderr: 'fatal: You need to start by "git bisect start"',
        exitCode: 1,
      };
    }

    // 3. git bisect bad [<commit>]
    if (sub === 'bad') {
      const targetHash = args[1] ? ctx.stateManager.resolveRef(args[1]) : headCommit?.hash;
      if (!targetHash) {
        return {
          stdout: '',
          stderr: 'fatal: invalid commit for bad',
          exitCode: 1,
        };
      }

      bisectState.badCommit = targetHash;
      return this.stepBisect(ctx, bisectState);
    }

    // 4. git bisect good [<commit>]
    if (sub === 'good') {
      const targetHash = args[1] ? ctx.stateManager.resolveRef(args[1]) : headCommit?.hash;
      if (!targetHash) {
        return {
          stdout: '',
          stderr: 'fatal: invalid commit for good',
          exitCode: 1,
        };
      }

      if (!bisectState.goodCommits.includes(targetHash)) {
        bisectState.goodCommits.push(targetHash);
      }
      return this.stepBisect(ctx, bisectState);
    }

    return {
      stdout: '',
      stderr: `error: unknown bisect command '${sub}'`,
      exitCode: 1,
    };
  }

  private stepBisect(ctx: CommandContext, state: BisectState): CommandExecutionResult {
    if (!state.badCommit || state.goodCommits.length === 0) {
      ctx.stateManager.setBisectState(state);
      return {
        stdout: 'status: waiting for good commit(s), bad commit known',
        stderr: '',
        exitCode: 0,
      };
    }

    // Get DAG path from good to bad
    const badCommitObj = ctx.stateManager.getCommit(state.badCommit);
    if (!badCommitObj) {
      return { stdout: '', stderr: 'fatal: bad commit not found', exitCode: 1 };
    }

    const goodCommitsSet = new Set(state.goodCommits);
    const candidateList: Commit[] = [];
    let curr: Commit | null = badCommitObj;

    while (curr && !goodCommitsSet.has(curr.hash)) {
      candidateList.unshift(curr);
      curr = curr.parents.length > 0 ? ctx.stateManager.getCommit(curr.parents[0]) : null;
    }

    if (candidateList.length <= 1) {
      const firstBad = candidateList[0] || badCommitObj;
      state.currentCommit = firstBad.hash;
      state.candidates = [firstBad.hash];
      ctx.stateManager.setBisectState(state);
      return {
        stdout: `${firstBad.hash} is the first bad commit\ncommit ${firstBad.hash}\nAuthor: ${firstBad.author.name} <${firstBad.author.email}>\nDate:   ${new Date(firstBad.timestamp).toISOString()}\n\n    ${firstBad.message}`,
        stderr: '',
        exitCode: 0,
      };
    }

    // Checkout midpoint commit
    const midIdx = Math.floor(candidateList.length / 2);
    const midCommit = candidateList[midIdx];

    state.currentCommit = midCommit.hash;
    state.candidates = candidateList.map((c) => c.hash);
    ctx.stateManager.setBisectState(state);

    ctx.stateManager.updateHeadPointer(midCommit.hash);
    ctx.fs.clear();
    for (const [p, c] of Object.entries(midCommit.tree)) {
      ctx.fs.writeFile(p, c);
    }

    const steps = Math.ceil(Math.log2(candidateList.length));
    const stdout = `Bisecting: ${candidateList.length - 1} revisions left to test after this (roughly ${steps} steps)\n[${midCommit.shortHash}] ${midCommit.message}`;

    return {
      stdout,
      stderr: '',
      exitCode: 0,
    };
  }
}
