import { GitStateManager } from '../state/git-state';
import { VirtualFileSystem } from '../filesystem/virtual-filesystem';
import { GitEventEmitter } from '../events/event-emitter';

export interface CommandContext {
  stateManager: GitStateManager;
  fs: VirtualFileSystem;
  events: GitEventEmitter;
}

export interface CommandExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number;
}

export interface CommandOption {
  flag: string;
  description: string;
}

export interface GitCommand {
  name: string;
  aliases?: string[];
  syntax?: string;
  description: string;
  category?: 'Setup' | 'Changes' | 'History' | 'Branches' | 'Merge' | 'Undo' | 'Remote' | 'Advanced';
  options?: CommandOption[];
  execute(
    args: string[],
    flags: Record<string, string | boolean>,
    ctx: CommandContext
  ): CommandExecutionResult;
}
