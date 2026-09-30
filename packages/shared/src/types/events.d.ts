export type GitEventName = 'repository:init' | 'file:created' | 'file:modified' | 'file:deleted' | 'file:staged' | 'file:unstaged' | 'commit:created' | 'branch:created' | 'branch:switched' | 'branch:deleted' | 'merge:completed' | 'merge:conflict' | 'rebase:started' | 'rebase:completed' | 'remote:added' | 'push:completed' | 'pull:completed' | 'reset:executed' | 'stash:saved' | 'stash:applied';
export interface GitEvent<T = any> {
    type: GitEventName;
    payload: T;
    timestamp: number;
}
//# sourceMappingURL=events.d.ts.map