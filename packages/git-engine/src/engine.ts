import { CommandResult, GitEvent, GitEventName, GitState } from '@git-academy/shared';
import { GitStateManager, createInitialGitState } from './state/git-state';
import { VirtualFileSystem } from './filesystem/virtual-filesystem';
import { GitEventEmitter, GitEventListener } from './events/event-emitter';
import { CommandExecutor } from './terminal/executor';
import { GitAutocomplete, AutocompleteSuggestion } from './terminal/autocomplete';
import { CommandHistory } from './terminal/command-history';
import { CommandContext } from './commands/command.interface';

export class GitEngine {
  private stateManager: GitStateManager;
  private fs: VirtualFileSystem;
  private events: GitEventEmitter;
  private executor: CommandExecutor;
  private autocomplete: GitAutocomplete;
  private history: CommandHistory;

  constructor(options?: {
    initialState?: GitState;
    initialFiles?: { path: string; content: string }[];
  }) {
    this.stateManager = new GitStateManager(options?.initialState);
    this.fs = new VirtualFileSystem(options?.initialFiles);
    this.events = new GitEventEmitter();
    this.executor = new CommandExecutor();
    this.autocomplete = new GitAutocomplete(this.executor);
    this.history = new CommandHistory();
  }

  public getContext(): CommandContext {
    return {
      stateManager: this.stateManager,
      fs: this.fs,
      events: this.events,
    };
  }

  public execute(commandLine: string): CommandResult {
    this.history.push(commandLine);
    return this.executor.execute(commandLine, this.getContext());
  }

  public getState(): GitState {
    const rawState = this.stateManager.getState();
    const headTree = this.stateManager.getHeadTree();
    const computed = this.fs.computeFileStates(rawState.stagingArea, headTree);

    return {
      ...rawState,
      workingTree: computed.workingTreeStates,
    };
  }

  public getFileSystem(): VirtualFileSystem {
    return this.fs;
  }

  public on<T = any>(event: GitEventName | '*', listener: GitEventListener<T>): () => void {
    return this.events.on(event, listener);
  }

  public getSuggestions(input: string): AutocompleteSuggestion[] {
    return this.autocomplete.getSuggestions(input, this.getContext());
  }

  public getHistory(): CommandHistory {
    return this.history;
  }

  public reset(options?: {
    initialState?: GitState;
    initialFiles?: { path: string; content: string }[];
  }): void {
    this.stateManager.setState(options?.initialState || createInitialGitState());
    this.fs.clear();
    if (options?.initialFiles) {
      for (const f of options.initialFiles) {
        this.fs.writeFile(f.path, f.content);
      }
    }
  }
}
