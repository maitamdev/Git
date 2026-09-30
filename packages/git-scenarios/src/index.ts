export * from './scenarios/first-commit';
export * from './scenarios/branch-basics';
export * from './scenarios/basics';
export * from './scenarios/branching-and-undo';
export * from './scenarios/level1-2-extras';
export * from './scenarios/level3-branching';
export * from './scenarios/level4-collaboration';
export * from './scenarios/level5-advanced';
export * from './scenarios/level5-mastery';
export * from './scenarios/level6-team';
export * from './scenarios/level7-actions';
export * from './scenarios/level8-internals';

import { firstCommitScenario } from './scenarios/first-commit';
import { branchBasicsScenario } from './scenarios/branch-basics';
import {
  firstRepositoryScenario,
  trackFileScenario,
  multipleFilesScenario,
  inspectHistoryScenario,
  inspectDiffScenario,
  gitConfigLabScenario,
} from './scenarios/basics';
import {
  createBranchScenario,
  switchBranchScenario,
  fastForwardMergeScenario,
  mergeConflictScenario,
  restoreScenario,
  resetHardScenario,
  stashScenario,
} from './scenarios/branching-and-undo';
import {
  gitignoreLabScenario,
  undoWorkingTreeLabScenario,
  commitAmendLabScenario,
  fileLifecycleLabScenario,
  statusCheckLabScenario,
} from './scenarios/level1-2-extras';
import {
  branchIsolationScenario,
  threeWayMergeScenario,
  resolveConflictScenario,
  mergeAbortScenario,
  branchingChallengeScenario,
} from './scenarios/level3-branching';
import {
  cloneRemoteScenario,
  fetchRemoteScenario,
  pullRemoteScenario,
  pushRemoteScenario,
  upstreamSetupScenario,
  createPrScenario,
  mergePrScenario,
  teamProjectSimulationScenario,
} from './scenarios/level4-collaboration';
import {
  resetSoftLabScenario,
  resetMixedLabScenario,
  revertCommitLabScenario,
  reflogExploreLabScenario,
  reflogRecoveryScenario,
  stashAdvancedLabScenario,
  cherryPickScenario,
  rebaseBasicScenario,
  interactiveRebaseScenario,
  rebaseConflictScenario,
} from './scenarios/level5-advanced';
import {
  tagBasicLabScenario,
  bisectScenario,
  worktreeLabScenario,
  advancedGitMasterChallengeScenario,
} from './scenarios/level5-mastery';
import {
  branchProtectionScenario,
  codeownersScenario,
  conventionalCommitsLabScenario,
  semverCalcLabScenario,
  hotfixScenario,
  teamConflictSimScenario,
  capstoneEcommerceTeamScenario,
} from './scenarios/level6-team';
import {
  firstWorkflowScenario,
  pushTriggerScenario,
  prCiScenario,
  multiJobScenario,
  jobNeedsScenario,
  failingTestScenario,
  conditionalStepScenario,
  matrixBuildScenario,
  artifactSharingScenario,
  secretRedactionScenario,
  environmentDeployScenario,
  protectedBranchCheckScenario,
  reusableWorkflowScenario,
  releasePipelineScenario,
  ciCdCapstoneScenario,
} from './scenarios/level7-actions';
import {
  hashObjectLabScenario,
  catFileLabScenario,
  updateIndexLabScenario,
  writeTreeLabScenario,
  commitTreeLabScenario,
  updateRefLabScenario,
  gitGcPackLabScenario,
  internalsManualCommitCapstoneScenario,
} from './scenarios/level8-internals';

export const BUILTIN_SCENARIOS = {
  // Level 1 & 2 Basics
  'first-commit': firstCommitScenario,
  'branch-basics': branchBasicsScenario,
  'first-repository': firstRepositoryScenario,
  'track-file': trackFileScenario,
  'multiple-files': multipleFilesScenario,
  'inspect-history': inspectHistoryScenario,
  'inspect-diff': inspectDiffScenario,
  'git-config-lab': gitConfigLabScenario,
  'gitignore-lab': gitignoreLabScenario,
  'undo-working-tree-lab': undoWorkingTreeLabScenario,
  'commit-amend-lab': commitAmendLabScenario,
  'file-lifecycle-lab': fileLifecycleLabScenario,
  'status-check-lab': statusCheckLabScenario,

  // Level 3 Branching & Undo
  'create-branch': createBranchScenario,
  'switch-branch': switchBranchScenario,
  'fast-forward': fastForwardMergeScenario,
  'merge-conflict': mergeConflictScenario,
  'restore': restoreScenario,
  'reset-hard': resetHardScenario,
  'stash': stashScenario,
  'branch-isolation': branchIsolationScenario,
  'three-way-merge': threeWayMergeScenario,
  'resolve-conflict': resolveConflictScenario,
  'merge-abort': mergeAbortScenario,
  'branching-challenge': branchingChallengeScenario,

  // Level 4 Collaboration
  'clone-remote': cloneRemoteScenario,
  'fetch-remote': fetchRemoteScenario,
  'pull-remote': pullRemoteScenario,
  'push-remote': pushRemoteScenario,
  'upstream-setup': upstreamSetupScenario,
  'create-pr': createPrScenario,
  'merge-pr': mergePrScenario,
  'team-project-simulation': teamProjectSimulationScenario,

  // Level 5 Advanced Git
  'reset-soft-lab': resetSoftLabScenario,
  'reset-mixed-lab': resetMixedLabScenario,
  'revert-commit-lab': revertCommitLabScenario,
  'reflog-explore-lab': reflogExploreLabScenario,
  'reflog-recovery-scenario': reflogRecoveryScenario,
  'stash-advanced-lab': stashAdvancedLabScenario,
  'cherry-pick-scenario': cherryPickScenario,
  'rebase-basic-scenario': rebaseBasicScenario,
  'interactive-rebase-scenario': interactiveRebaseScenario,
  'rebase-conflict-scenario': rebaseConflictScenario,
  'tag-basic-lab': tagBasicLabScenario,
  'bisect-scenario': bisectScenario,
  'worktree-lab': worktreeLabScenario,
  'advanced-git-master-challenge': advancedGitMasterChallengeScenario,

  // Level 6 Team Workflows
  'branch-protection-scenario': branchProtectionScenario,
  'codeowners-scenario': codeownersScenario,
  'conventional-commits-lab': conventionalCommitsLabScenario,
  'semver-calc-lab': semverCalcLabScenario,
  'hotfix-scenario': hotfixScenario,
  'team-conflict-sim-scenario': teamConflictSimScenario,
  'capstone-ecommerce-team-scenario': capstoneEcommerceTeamScenario,

  // Level 7 GitHub Actions & CI/CD
  'first-workflow': firstWorkflowScenario,
  'push-trigger': pushTriggerScenario,
  'pr-ci': prCiScenario,
  'multi-job': multiJobScenario,
  'job-needs': jobNeedsScenario,
  'failing-test': failingTestScenario,
  'conditional-step': conditionalStepScenario,
  'matrix-build': matrixBuildScenario,
  'artifact-sharing': artifactSharingScenario,
  'secret-redaction': secretRedactionScenario,
  'environment-deploy': environmentDeployScenario,
  'protected-branch-check': protectedBranchCheckScenario,
  'reusable-workflow': reusableWorkflowScenario,
  'release-pipeline': releasePipelineScenario,
  'ci-cd-capstone': ciCdCapstoneScenario,

  // Level 8 Git Internals
  'hash-object-lab': hashObjectLabScenario,
  'cat-file-lab': catFileLabScenario,
  'update-index-lab': updateIndexLabScenario,
  'write-tree-lab': writeTreeLabScenario,
  'commit-tree-lab': commitTreeLabScenario,
  'update-ref-lab': updateRefLabScenario,
  'git-gc-pack-lab': gitGcPackLabScenario,
  'internals-manual-commit-capstone': internalsManualCommitCapstoneScenario,
};

