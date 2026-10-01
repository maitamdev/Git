import type { GoalCheckItem, Scenario, ValidationResult } from '@git-academy/shared';
import { ScenarioRunner } from '@git-academy/exercise-engine';

const initialLabCompletion = new WeakMap<Scenario, boolean>();
const specificPractice: Record<string, string[]> = {
  'git-config-lab': ['git config user.name', 'git config user.email'],
  'reset-hard': ['git reset --hard'],
  'upstream-setup': ['git remote -v'],
  'reflog-recovery-scenario': ['git reflog', 'git branch'],
  'bisect-scenario': ['git bisect start', 'git bisect good', 'git bisect bad'],
  'worktree-lab': ['git worktree add'],
  'advanced-git-master-challenge': ['git reflog', 'git reset', 'git tag'],
  'hash-object-lab': ['git hash-object -w'],
  'cat-file-lab': ['git cat-file -p'],
  'update-index-lab': ['git hash-object -w', 'git update-index'],
  'write-tree-lab': ['git write-tree'],
  'commit-tree-lab': ['git write-tree', 'git commit-tree'],
  'update-ref-lab': ['git update-ref'],
  'git-gc-pack-lab': ['git gc'],
};

export interface ScenarioRunnerLike {
  validate(): ValidationResult;
  getScenario(): Scenario;
}

export function validateGuidedLab(runner: ScenarioRunnerLike, successfulCommands: string[]): ValidationResult {
  const result = runner.validate();
  const scenario = runner.getScenario();
  // Some legacy goals already match their starting state. Learners still need
  // to run the relevant command successfully before receiving completion.
  if (!initialLabCompletion.has(scenario)) initialLabCompletion.set(scenario, result.passed);
  if (!initialLabCompletion.get(scenario)) return result;
  const requiredCommands = specificPractice[scenario.id] || scenario.allowedCommands?.filter((command) => command !== 'git status').slice(0, 1) || [];
  if (!requiredCommands.length) return result;
  const practiceChecks: GoalCheckItem[] = requiredCommands.map((requiredCommand, index) => {
    const practiced = successfulCommands.some((command) => command === requiredCommand || command.startsWith(`${requiredCommand} `));
    return {
      id: `guided-practice-${index}`,
      description: `Tự chạy lệnh ${requiredCommand} trong terminal`,
      passed: practiced,
      feedback: practiced ? undefined : `Hãy thử lệnh ${requiredCommand} trong terminal.`,
    };
  });
  const practiced = practiceChecks.every((item) => item.passed);
  return {
    ...result,
    passed: result.passed && practiced,
    checklist: [...result.checklist, ...practiceChecks],
    feedback: [...result.feedback, ...practiceChecks.flatMap((item) => item.feedback ? [item.feedback] : [])],
    earnedXp: result.passed && practiced ? result.earnedXp : 0,
  };
}
