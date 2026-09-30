import { GitEvent, GitEventName } from '@git-academy/shared';

export type GitEventListener<T = any> = (event: GitEvent<T>) => void;

export class GitEventEmitter {
  private listeners: Map<string, Set<GitEventListener>> = new Map();
  private history: GitEvent[] = [];

  public on<T = any>(event: GitEventName | '*', listener: GitEventListener<T>): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener);

    // Return unbind function
    return () => {
      this.listeners.get(event)?.delete(listener);
    };
  }

  public emit<T = any>(type: GitEventName, payload: T): GitEvent<T> {
    const event: GitEvent<T> = {
      type,
      payload,
      timestamp: Date.now(),
    };

    this.history.push(event);

    const specificListeners = this.listeners.get(type);
    if (specificListeners) {
      for (const listener of specificListeners) {
        try {
          listener(event);
        } catch (err) {
          console.error(`Error in GitEventListener for ${type}:`, err);
        }
      }
    }

    const wildcardListeners = this.listeners.get('*');
    if (wildcardListeners) {
      for (const listener of wildcardListeners) {
        try {
          listener(event);
        } catch (err) {
          console.error(`Error in wildcard GitEventListener:`, err);
        }
      }
    }

    return event;
  }

  public getHistory(): GitEvent[] {
    return [...this.history];
  }

  public clear(): void {
    this.listeners.clear();
    this.history = [];
  }
}
