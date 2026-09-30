export type SimulatorEventName =
  | 'repo:created'
  | 'repo:forked'
  | 'issue:created'
  | 'issue:closed'
  | 'pr:created'
  | 'pr:reviewed'
  | 'pr:merged'
  | 'pr:closed'
  | 'pr:reopened';

export type SimulatorEventListener<T = any> = (payload: T) => void;

export class SimulatorEventEmitter {
  private listeners: Map<string, Set<SimulatorEventListener>> = new Map();

  public on<T = any>(event: SimulatorEventName | '*', listener: SimulatorEventListener<T>): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener);

    return () => {
      this.listeners.get(event)?.delete(listener);
    };
  }

  public emit<T = any>(event: SimulatorEventName, payload: T): void {
    const direct = this.listeners.get(event);
    if (direct) {
      for (const fn of direct) fn(payload);
    }
    const wildcard = this.listeners.get('*');
    if (wildcard) {
      for (const fn of wildcard) fn({ event, ...payload });
    }
  }
}
