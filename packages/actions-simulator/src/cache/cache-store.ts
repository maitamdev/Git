export interface StoredCacheEntry {
  key: string;
  paths: string[];
  data: Record<string, string>;
  createdAt: string;
}

export class CacheStore {
  private static instance: CacheStore;
  private entries: Map<string, StoredCacheEntry> = new Map();

  public static getInstance(): CacheStore {
    if (!CacheStore.instance) {
      CacheStore.instance = new CacheStore();
    }
    return CacheStore.instance;
  }

  public reset(): void {
    this.entries.clear();
  }

  public save(key: string, paths: string[], data: Record<string, string>): void {
    this.entries.set(key, {
      key,
      paths: [...paths],
      data: { ...data },
      createdAt: new Date().toISOString(),
    });
  }

  public restore(key: string, restoreKeys?: string[]): StoredCacheEntry | null {
    if (this.entries.has(key)) {
      return this.entries.get(key)!;
    }
    if (restoreKeys) {
      for (const prefix of restoreKeys) {
        for (const [k, entry] of this.entries.entries()) {
          if (k.startsWith(prefix)) {
            return entry;
          }
        }
      }
    }
    return null;
  }
}
