export interface StoredArtifact {
  id: string;
  name: string;
  files: Record<string, string>;
  sizeBytes: number;
  createdAt: string;
}

export class ArtifactStore {
  private static instance: ArtifactStore;
  private artifacts: Map<string, StoredArtifact> = new Map();

  public static getInstance(): ArtifactStore {
    if (!ArtifactStore.instance) {
      ArtifactStore.instance = new ArtifactStore();
    }
    return ArtifactStore.instance;
  }

  public reset(): void {
    this.artifacts.clear();
  }

  public upload(name: string, files: Record<string, string>): StoredArtifact {
    let totalBytes = 0;
    for (const [path, content] of Object.entries(files)) {
      totalBytes += (path.length + (content ? content.length : 0));
    }
    const artifact: StoredArtifact = {
      id: `art-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name,
      files: { ...files },
      sizeBytes: totalBytes,
      createdAt: new Date().toISOString(),
    };
    this.artifacts.set(name, artifact);
    return artifact;
  }

  public download(name: string): StoredArtifact | null {
    return this.artifacts.get(name) || null;
  }

  public list(): StoredArtifact[] {
    return Array.from(this.artifacts.values());
  }

  public has(name: string): boolean {
    return this.artifacts.has(name);
  }
}
