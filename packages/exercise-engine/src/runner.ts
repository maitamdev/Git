import { Scenario, ValidationResult, CommandResult } from '@git-academy/shared';
import { GitEngine, createInitialGitState, RemoteNetworkRegistry } from '@git-academy/git-engine';
import { GoalValidator } from './validator';

export class ScenarioRunner {
  private scenario: Scenario;
  private engine: GitEngine;
  private validator: GoalValidator;
  private commandLog: string[] = [];

  constructor(scenario: Scenario) {
    this.scenario = scenario;
    this.validator = new GoalValidator();
    this.engine = new GitEngine();
    this.setupInitialState();
  }

  private setupInitialState(): void {
    const init = this.scenario.initialState;
    const isRepoInit = init.repositoryInitialized ?? false;
    const branch = init.branch || 'main';

    const state = createInitialGitState(isRepoInit, branch);
    if (init.branches) {
      for (const b of init.branches) {
        if (!state.branches.some((item) => item.name === b)) {
          state.branches.push({ name: b, commitHash: null });
        }
      }
    }

    const files = (init.files || []).map((f) => ({
      path: f.path,
      content: f.content,
    }));

    this.engine.reset({
      initialState: state,
      initialFiles: files,
    });

    if (isRepoInit && init.commits && init.commits.length > 0) {
      for (const c of init.commits) {
        if (c.branch && c.branch !== this.engine.getState().currentBranch) {
          const currentBranches = this.engine.getState().branches;
          if (!currentBranches.some((b) => b.name === c.branch)) {
            this.engine.execute(`git branch ${c.branch}`);
          }
          this.engine.execute(`git switch ${c.branch}`);
        }
        if (c.files) {
          for (const [p, content] of Object.entries(c.files)) {
            this.engine.getFileSystem().writeFile(p, content);
            this.engine.execute(`git add ${p}`);
          }
        }
        this.engine.execute(`git commit -m "${c.message}"`);
      }

      // Switch back to desired initial branch
      if (branch && branch !== this.engine.getState().currentBranch) {
        this.engine.execute(`git switch ${branch}`);
      }

      // Ensure any sibling branches that had null commitHash point to baseline commit
      const currentHead = this.engine.getContext().stateManager.getHeadCommit();
      if (currentHead) {
        for (const b of this.engine.getState().branches) {
          if (!b.commitHash) {
            b.commitHash = currentHead.hash;
          }
        }
      }

      // Re-apply initial files to working directory
      for (const f of init.files || []) {
        this.engine.getFileSystem().writeFile(f.path, f.content);
        if ((f as any).status === 'staged') {
          this.engine.execute(`git add ${f.path}`);
        }
      }
    }

    // Initialize conflict merge state if scenario has conflicted files
    const conflictFile = (init.files || []).find(
      (f) => (f as any).status === 'conflict' || (f.content && f.content.includes('<<<<<<<'))
    );
    if (conflictFile) {
      const head = this.engine.getContext().stateManager.getHeadCommit();
      this.engine.getContext().stateManager.setMergeState({
        inProgress: true,
        sourceBranch: 'feat/risky',
        targetBranch: 'main',
        sourceCommitHash: head?.hash || '',
        targetCommitHash: head?.hash || '',
        conflicts: [{
          path: conflictFile.path,
          baseContent: '',
          oursContent: '',
          theirsContent: '',
          status: 'unresolved',
        }],
      });
    }

    // Initialize simulated remotes for Level 4 Collaboration scenarios
    const remoteNeeds = ['fetch-remote', 'pull-remote', 'push-remote', 'upstream-setup'];
    if (remoteNeeds.includes(this.scenario.id)) {
      const net = RemoteNetworkRegistry.getInstance();
      const originUrl = `https://gitacademy.local/${this.scenario.id}-origin.git`;
      const head = this.engine.getContext().stateManager.getHeadCommit();
      net.createRepository({
        id: `${this.scenario.id}-origin-repo`,
        name: `${this.scenario.id}-repo`,
        url: originUrl,
        defaultBranch: 'main',
        branches: { main: head ? head.hash : null },
        commits: head ? { [head.hash]: head } : {},
      });
      this.engine.execute(`git remote add origin ${originUrl}`);
      if (this.scenario.id === 'upstream-setup') {
        const upstreamUrl = `https://gitacademy.local/${this.scenario.id}-upstream.git`;
        net.createRepository({
          id: `${this.scenario.id}-upstream-repo`,
          name: `${this.scenario.id}-upstream`,
          url: upstreamUrl,
          defaultBranch: 'main',
          branches: { main: head ? head.hash : null },
          commits: head ? { [head.hash]: head } : {},
        });
        this.engine.execute(`git remote add upstream ${upstreamUrl}`);
      }
    }
  }

  public getScenario(): Scenario {
    return this.scenario;
  }

  public getEngine(): GitEngine {
    return this.engine;
  }

  public execute(commandLine: string): {
    commandResult: CommandResult;
    validation: ValidationResult;
  } {
    this.commandLog.push(commandLine);
    const commandResult = this.engine.execute(commandLine);
    const validation = this.validate();

    return {
      commandResult,
      validation,
    };
  }

  public validate(): ValidationResult {
    return this.validator.validate(this.scenario, this.engine.getState());
  }

  public reset(): void {
    this.commandLog = [];
    this.setupInitialState();
  }

  public getCommandLog(): string[] {
    return [...this.commandLog];
  }
}
