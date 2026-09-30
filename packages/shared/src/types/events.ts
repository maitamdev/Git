export type GitEventName =
  | 'repository:init'
  | 'working-tree:changed'
  | 'file:created'
  | 'file:modified'
  | 'file:deleted'
  | 'file:staged'
  | 'file:unstaged'
  | 'staging:cleared'
  | 'commit:created'
  | 'commit:reverted'
  | 'branch:created'
  | 'branch:switched'
  | 'branch:deleted'
  | 'merge:started'
  | 'merge:conflict'
  | 'merge:completed'
  | 'merge:aborted'
  | 'rebase:started'
  | 'rebase:completed'
  | 'remote:added'
  | 'push:completed'
  | 'pull:completed'
  | 'reset:completed'
  | 'stash:created'
  | 'stash:applied'
  | 'stash:dropped'
  | 'lab:started'
  | 'lab:completed'
  | 'quiz:answered'
  | 'quiz:passed'
  | 'lesson:completed'
  | 'achievement:unlocked'
  | 'xp:earned';

export interface GitEvent<T = any> {
  type: GitEventName;
  payload: T;
  timestamp: number;
}
