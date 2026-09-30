import { SimulatedAction, ActionInput, ActionExecutionContext, ActionResult } from './registry';
import { ArtifactStore } from '../artifacts/artifact-store';

export class UploadArtifactAction implements SimulatedAction {
  public name = 'actions/upload-artifact';

  public matches(uses: string): boolean {
    return /^actions\/upload-artifact(@.*)?$/.test(uses.trim());
  }

  public async execute(input: ActionInput, context: ActionExecutionContext): Promise<ActionResult> {
    const artifactName = input.with?.name || 'artifact';
    const targetPath = input.with?.path || 'dist/';
    const logs: string[] = [
      `Starting artifact upload: ${artifactName}`,
      `Scanning path: ${targetPath}`,
    ];

    // Collect files matching targetPath
    const filesToStore: Record<string, string> = {};
    for (const [p, content] of Object.entries(context.files)) {
      if (p.startsWith(targetPath) || targetPath === '.' || targetPath === '*') {
        filesToStore[p] = content;
      }
    }

    if (Object.keys(filesToStore).length === 0) {
      // Create simulated default build artifact
      filesToStore[`${targetPath.replace(/\/$/, '')}/app.bundle.js`] = '/* simulated production bundle */';
    }

    const artifact = ArtifactStore.getInstance().upload(artifactName, filesToStore);
    logs.push(`Uploaded ${Object.keys(filesToStore).length} files (${artifact.sizeBytes} bytes) as artifact "${artifactName}".`);
    logs.push(`Artifact URL: https://github.local/artifacts/${artifact.id}`);

    return {
      success: true,
      outputs: {
        'artifact-id': artifact.id,
        'artifact-url': `https://github.local/artifacts/${artifact.id}`,
      },
      logs,
    };
  }
}
