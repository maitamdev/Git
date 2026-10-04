import { FileStatus, GitState } from './git';

export interface ScenarioInitialFile {
  path: string;
  content: string;
  status?: FileStatus;
}

export interface ScenarioInitialCommit {
  message: string;
  files: Record<string, string>;
  branch?: string;
}

export interface ScenarioInitialState {
  repositoryInitialized?: boolean;
  branch?: string;
  branches?: string[];
  commits?: ScenarioInitialCommit[];
  files?: ScenarioInitialFile[];
}

export interface ScenarioGoalCommit {
  count?: number;
  minCount?: number;
  message?: string;
  messagePattern?: string;
  branch?: string;
}

export interface ScenarioGoalFilesystem {
  clean?: boolean;
  requiredFiles?: {
    path: string;
    status?: FileStatus;
    contentIncludes?: string;
  }[];
}

export interface ScenarioGoalStaging {
  clean?: boolean;
  stagedFiles?: string[];
}

export interface ScenarioGoalBranch {
  current?: string;
  exists?: string[];
}

export interface ScenarioGoalHead {
  pointsTo?: string;
}

export interface ScenarioGoal {
  commits?: ScenarioGoalCommit;
  latestCommit?: {
    message?: string;
    messagePattern?: string;
  };
  workingTree?: ScenarioGoalFilesystem;
  stagingArea?: ScenarioGoalStaging;
  branches?: ScenarioGoalBranch;
  head?: ScenarioGoalHead;
}

export interface ScenarioSuccess {
  message: string;
  xp: number;
}

export interface Scenario {
  id: string;
  title: string;
  description?: string;
  initialState: ScenarioInitialState;
  goal: ScenarioGoal;
  allowedCommands?: string[];
  hints: string[];
  success: ScenarioSuccess;
}

export interface GoalCheckItem {
  id: string;
  description: string;
  passed: boolean;
  feedback?: string;
}

export interface ValidationResult {
  passed: boolean;
  checklist: GoalCheckItem[];
  feedback: string[];
  earnedXp: number;
}
