export interface DeploymentEnvironment {
  name: string;
  requiredApproval?: boolean;
  variables: Record<string, string>;
  secrets?: Record<string, string>;
}

export interface EnvironmentApproval {
  environmentName: string;
  approved: boolean;
  approvedBy: string;
  approvedAt: string;
}

export class EnvironmentManager {
  private static instance: EnvironmentManager;
  private environments: Map<string, DeploymentEnvironment> = new Map();
  private pendingApprovals: Map<string, { runId: string; jobId: string; environmentName: string }> = new Map();
  private approvalHistory: EnvironmentApproval[] = [];

  public static getInstance(): EnvironmentManager {
    if (!EnvironmentManager.instance) {
      EnvironmentManager.instance = new EnvironmentManager();
    }
    return EnvironmentManager.instance;
  }

  constructor() {
    // Default educational environments
    this.register({
      name: 'production',
      requiredApproval: true,
      variables: { ENV_NAME: 'production', DEPLOY_URL: 'https://vietnam-app.prod' },
      secrets: { PROD_API_KEY: 'simulated-prod-secret-999' },
    });
    this.register({
      name: 'staging',
      requiredApproval: false,
      variables: { ENV_NAME: 'staging', DEPLOY_URL: 'https://vietnam-app.staging' },
      secrets: { STAGING_API_KEY: 'simulated-staging-secret-111' },
    });
  }

  public reset(): void {
    this.pendingApprovals.clear();
    this.approvalHistory = [];
  }

  public register(env: DeploymentEnvironment): void {
    this.environments.set(env.name.toLowerCase(), env);
  }

  public get(name: string): DeploymentEnvironment | null {
    return this.environments.get(name.toLowerCase()) || null;
  }

  public requestApproval(runId: string, jobId: string, envName: string): boolean {
    const env = this.get(envName);
    if (!env || !env.requiredApproval) {
      return true; // No approval needed, can run immediately
    }
    const key = `${runId}:${jobId}`;
    this.pendingApprovals.set(key, { runId, jobId, environmentName: env.name });
    return false; // Paused waiting for approval
  }

  public isPending(runId: string, jobId: string): boolean {
    return this.pendingApprovals.has(`${runId}:${jobId}`);
  }

  public approve(runId: string, jobId: string, approvedBy: string = 'team-lead'): boolean {
    const key = `${runId}:${jobId}`;
    const pending = this.pendingApprovals.get(key);
    if (!pending) return false;

    this.pendingApprovals.delete(key);
    this.approvalHistory.push({
      environmentName: pending.environmentName,
      approved: true,
      approvedBy,
      approvedAt: new Date().toISOString(),
    });
    return true;
  }

  public getPendingApprovals(): { runId: string; jobId: string; environmentName: string }[] {
    return Array.from(this.pendingApprovals.values());
  }

  public getApprovalHistory(): EnvironmentApproval[] {
    return [...this.approvalHistory];
  }
}
