import { GitCommand, CommandContext, CommandExecutionResult } from './command.interface';

export class ShowCommand implements GitCommand {
  public name = 'show';
  public description = 'Show details about a commit';

  public execute(
    args: string[],
    _flags: Record<string, string | boolean>,
    ctx: CommandContext
  ): CommandExecutionResult {
    if (!ctx.stateManager.isInitialized()) {
      return {
        stdout: '',
        stderr: 'fatal: not a git repository (or any of the parent directories): .git',
        exitCode: 128,
      };
    }

    const ref = args[0] || 'HEAD';
    const commitHash = ctx.stateManager.resolveRef(ref);
    const commit = commitHash ? ctx.stateManager.getCommit(commitHash) : null;
    if (!commit) {
      return { stdout: '', stderr: `fatal: ambiguous argument '${ref}': unknown revision`, exitCode: 128 };
    }

    const tag = ctx.stateManager.getTag(ref);
    const lines: string[] = [];
    if (tag?.annotated) {
      const tagger = tag.tagger || commit.author;
      lines.push(`tag ${tag.name}`);
      lines.push(`Tagger: ${tagger.name} <${tagger.email}>`);
      lines.push(`Date:   ${new Date(tag.timestamp || commit.timestamp).toUTCString()}`);
      lines.push('');
      lines.push(`    ${tag.message || ''}`);
      lines.push('');
    }
    lines.push(`commit ${commit.hash}`);
    if (commit.parents.length > 1) {
      const parentShortHashes = commit.parents
        .map((parentHash) => ctx.stateManager.getCommit(parentHash)?.shortHash || parentHash.slice(0, 7));
      lines.push(`Merge: ${parentShortHashes.join(' ')}`);
    }
    lines.push(`Author: ${commit.author.name} <${commit.author.email}>`);
    lines.push(`Date:   ${new Date(commit.timestamp).toUTCString()}`);
    lines.push('');
    lines.push(`    ${commit.message}`);

    return { stdout: lines.join('\n'), stderr: '', exitCode: 0 };
  }
}
