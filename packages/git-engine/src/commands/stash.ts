import { GitCommand, CommandContext, CommandExecutionResult } from './command.interface';
import { FileState, StashEntry } from '@git-academy/shared';

export class StashCommand implements GitCommand {
  public name = 'stash';
  public description = 'Stash tracked changes and optionally untracked files';

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

    const subcommand = args[0] || 'push';
    const state = ctx.stateManager.getState();
    const currentBranch = ctx.stateManager.getCurrentBranch();

    if (subcommand === 'list') {
      const lines = state.stash.map((stash, index) => `stash@{${index}}: ${stash.message}`);
      return { stdout: lines.join('\n'), stderr: '', exitCode: 0 };
    }

    if (subcommand === 'pop' || subcommand === 'apply' || subcommand === 'drop') {
      const selector = args[1];
      const index = this.resolveStashIndex(selector, state.stash.length);
      if (index === null) {
        return {
          stdout: '',
          stderr: state.stash.length === 0 ? 'error: No stash entries found.' : `error: '${selector}' is not a valid stash reference.`,
          exitCode: 1,
        };
      }

      if (subcommand === 'drop') {
        const [dropped] = state.stash.splice(index, 1);
        ctx.events.emit('stash:dropped', { entry: dropped });
        return { stdout: `Dropped stash@{${index}} (${dropped.id})`, stderr: '', exitCode: 0 };
      }

      const entry = state.stash[index];
      const applyResult = this.applyEntry(entry, flags, ctx);
      if (applyResult.exitCode !== 0) return applyResult;

      if (subcommand === 'pop') {
        state.stash.splice(index, 1);
      }
      ctx.events.emit('stash:applied', { entry, popped: subcommand === 'pop' });
      return {
        stdout: subcommand === 'pop'
          ? `On branch ${currentBranch}\nDropped stash@{${index}} (${entry.id})`
          : `On branch ${currentBranch}\nChanges restored from stash@{${index}}`,
        stderr: '',
        exitCode: 0,
      };
    }

    if (subcommand !== 'push' && subcommand !== 'save') {
      return { stdout: '', stderr: `error: unknown stash subcommand '${subcommand}'`, exitCode: 1 };
    }

    const includeUntracked = Boolean(flags.u || flags['include-untracked'] || flags.a || flags.all);
    const includeIgnored = Boolean(flags.a || flags.all);
    const fileStates = ctx.fs.computeFileStates(state.stagingArea, ctx.stateManager.getHeadTree());
    const headTree = ctx.stateManager.getHeadTree();
    const ignoredFiles = ctx.fs.listFiles().filter((path) => ctx.fs.getIgnoreRule(path) !== null);
    const eligibleUntracked = fileStates.untrackedFiles.filter((path) =>
      includeIgnored || ctx.fs.getIgnoreRule(path) === null
    );
    const trackedPaths = new Set([
      ...state.stagingArea.map((file) => file.path),
      ...fileStates.modifiedUnstaged,
    ]);
    const untrackedPaths = new Set(includeUntracked ? eligibleUntracked : []);
    const ignoredPaths = new Set(includeIgnored ? ignoredFiles : []);
    const stashPaths = new Set([...trackedPaths, ...untrackedPaths, ...ignoredPaths]);

    if (stashPaths.size === 0) {
      return { stdout: 'No local changes to save', stderr: '', exitCode: 0 };
    }

    const customMessage =
      (typeof flags.m === 'string' && flags.m) ||
      (typeof flags.message === 'string' && flags.message) ||
      args.slice(1).join(' ') ||
      '';
    const headCommit = ctx.stateManager.getHeadCommit();
    const headLabel = headCommit ? `${headCommit.shortHash} ${headCommit.message}` : 'initial';
    const message = customMessage
      ? `On ${currentBranch}: ${customMessage}`
      : `WIP on ${currentBranch}: ${headLabel}`;

    const snapshots: FileState[] = fileStates.workingTreeStates
      .filter((file) => stashPaths.has(file.path))
      .map((file) => ({ ...file }));
    const snapshotByPath = new Map(snapshots.map((file) => [file.path, file]));
    // Ignored paths are not represented separately by computeFileStates; keep their contents explicitly.
    for (const path of ignoredPaths) {
      if (!snapshotByPath.has(path)) {
        const content = ctx.fs.readFile(path);
        if (content !== null) snapshots.push({ path, content, status: 'untracked' });
      }
    }

    const entry: StashEntry = {
      id: `stash-${Date.now()}-${state.stash.length}`,
      message,
      timestamp: Date.now(),
      workingTree: snapshots,
      stagingArea: state.stagingArea.map((file) => ({ ...file })),
      branch: currentBranch,
    };
    state.stash.unshift(entry);

    // Return changed tracked paths to HEAD. Keep ordinary untracked files in place unless -u/-a was used.
    for (const path of stashPaths) {
      if (path in headTree) {
        ctx.fs.writeFile(path, headTree[path]);
      } else {
        ctx.fs.deleteFile(path);
      }
    }
    state.stagingArea = [];
    ctx.events.emit('stash:created', entry);

    return { stdout: `Saved working directory and index state ${message}`, stderr: '', exitCode: 0 };
  }

  private resolveStashIndex(selector: string | undefined, stashCount: number): number | null {
    if (stashCount === 0) return null;
    if (!selector) return 0;
    const match = /^stash@\{(\d+)\}$/.exec(selector);
    if (!match) return null;
    const index = Number(match[1]);
    return index >= 0 && index < stashCount ? index : null;
  }

  private applyEntry(
    entry: StashEntry,
    flags: Record<string, string | boolean>,
    ctx: CommandContext
  ): CommandExecutionResult {
    const headTree = ctx.stateManager.getHeadTree();
    for (const file of entry.workingTree) {
      const current = ctx.fs.readFile(file.path);
      const isUntracked = !(file.path in headTree);
      if (isUntracked && current !== null && current !== file.content) {
        return { stdout: '', stderr: `error: would overwrite untracked file '${file.path}'`, exitCode: 1 };
      }
      if (!isUntracked && current !== null && current !== headTree[file.path] && current !== file.content) {
        return { stdout: '', stderr: `error: local changes would be overwritten in '${file.path}'`, exitCode: 1 };
      }
    }

    for (const file of entry.workingTree) {
      if (file.status === 'deleted') {
        ctx.fs.deleteFile(file.path);
      } else {
        ctx.fs.writeFile(file.path, file.content);
      }
    }
    ctx.stateManager.getState().stagingArea = flags.index
      ? entry.stagingArea.map((file) => ({ ...file }))
      : [];
    return { stdout: '', stderr: '', exitCode: 0 };
  }
}
