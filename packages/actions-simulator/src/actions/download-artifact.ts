import { SimulatedAction, ActionInput, ActionExecutionContext, ActionResult } from './registry';
import { ArtifactStore } from '../artifacts/artifact-store';

export class DownloadArtifactAction implements SimulatedAction {
  public name = 'actions/download-artifact';

  public matches(uses: string): boolean {
    return /^actions\/download-artifact(@.*)?$/.test(uses.trim());
  }

  public async execute(input: ActionInput, context: ActionExecutionContext): Promise<ActionResult> {
    const artifactName = input.with?.name || 'artifact';
    const destinationPath = input.with?.path || '.';
    const logs: string[] = [`Searching artifact store for "${artifactName}"...`];

    const artifact = ArtifactStore.getInstance().download(artifactName);
    if (!artifact) {
      logs.push(`Error: Artifact "${artifactName}" was not found in this workflow run.`);
      return {
        success: false,
        outputs: {},
        logs,
        error: `Artifact "${artifactName}" not found.`,
      };
    }

    logs.push(`Found artifact id: ${artifact.id} (${artifact.sizeBytes} bytes).`);
    logs.push(`Extracting files to destination: ${destinationPath}`);

    for (const [fileRel, content] of Object.entries(artifact.files)) {
      const fullPath = destinationPath === '.' ? fileRel : `${destinationPath}/${fileRel}`;
      context.files[fullPath] = content;
      logs.push(`  Extracted: ${fullPath}`);
    }

    return {
      success: true,
      outputs: {
        'download-path': destinationPath,
      },
      logs,
    };
  }
}
