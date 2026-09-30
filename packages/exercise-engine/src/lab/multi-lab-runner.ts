import { Scenario, ValidationResult, CommandResult } from '@git-academy/shared';
import { ScenarioRunner } from '../runner';

export interface LabItem {
  id: string;
  title: string;
  scenario: Scenario;
  isCompleted: boolean;
  isLocked: boolean;
}

export class MultiLabRunner {
  private labs: Map<string, Scenario> = new Map();
  private labOrder: string[] = [];
  private activeLabId: string;
  private currentRunner: ScenarioRunner;
  private completedLabIds: Set<string> = new Set();

  constructor(scenarios: Scenario[], initiallyCompletedLabs: string[] = []) {
    if (scenarios.length === 0) {
      throw new Error('MultiLabRunner requires at least one scenario');
    }

    for (const sc of scenarios) {
      this.labs.set(sc.id, sc);
      this.labOrder.push(sc.id);
    }

    for (const id of initiallyCompletedLabs) {
      this.completedLabIds.add(id);
    }

    // Default to first incomplete lab or first lab
    const firstIncomplete = this.labOrder.find((id) => !this.completedLabIds.has(id));
    this.activeLabId = firstIncomplete || this.labOrder[0];
    this.currentRunner = new ScenarioRunner(this.labs.get(this.activeLabId)!);
  }

  public getLabs(): LabItem[] {
    return this.labOrder.map((id, index) => {
      const scenario = this.labs.get(id)!;
      const isCompleted = this.completedLabIds.has(id);
      // Lab 0 is always unlocked; subsequent labs unlocked if previous is completed
      const isLocked = index > 0 && !this.completedLabIds.has(this.labOrder[index - 1]);

      return {
        id,
        title: scenario.title,
        scenario,
        isCompleted,
        isLocked,
      };
    });
  }

  public getActiveLabId(): string {
    return this.activeLabId;
  }

  public getActiveRunner(): ScenarioRunner {
    return this.currentRunner;
  }

  public switchLab(labId: string): boolean {
    const labs = this.getLabs();
    const target = labs.find((l) => l.id === labId);
    if (!target || target.isLocked) {
      return false;
    }

    this.activeLabId = labId;
    this.currentRunner = new ScenarioRunner(target.scenario);
    return true;
  }

  public execute(commandLine: string): {
    commandResult: CommandResult;
    validation: ValidationResult;
    justCompletedLab: boolean;
  } {
    const res = this.currentRunner.execute(commandLine);
    let justCompleted = false;

    if (res.validation.passed && !this.completedLabIds.has(this.activeLabId)) {
      this.completedLabIds.add(this.activeLabId);
      justCompleted = true;
    }

    return {
      commandResult: res.commandResult,
      validation: res.validation,
      justCompletedLab: justCompleted,
    };
  }

  public validateCurrent(): ValidationResult {
    return this.currentRunner.validate();
  }

  public resetCurrentLab(): void {
    const scenario = this.labs.get(this.activeLabId);
    if (scenario) {
      this.currentRunner = new ScenarioRunner(scenario);
    }
  }

  public getCompletedLabIds(): string[] {
    return Array.from(this.completedLabIds);
  }

  public isAllLabsCompleted(): boolean {
    return this.labOrder.every((id) => this.completedLabIds.has(id));
  }
}
