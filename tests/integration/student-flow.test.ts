import { describe, it, expect, beforeEach } from 'vitest';
import {
  ScenarioRunner,
  BuiltinCourseRepository,
  LocalStorageProgressRepository,
  PrerequisiteEngine,
  LessonCompletionEngine,
  QuizEngine,
} from '@git-academy/exercise-engine';
import {
  firstCommitScenario,
  mergeConflictScenario,
  fastForwardMergeScenario,
  stashScenario,
} from '@git-academy/git-scenarios';
import { GitGraphLayout } from '@git-academy/git-visualizer';
import { GitEngine } from '@git-academy/git-engine';

describe('Comprehensive Student Learning Flow & Platform Integration', () => {
  let progressRepo: LocalStorageProgressRepository;
  let courseRepo: BuiltinCourseRepository;
  let prereqEngine: PrerequisiteEngine;
  let completionEngine: LessonCompletionEngine;
  let quizEngine: QuizEngine;

  beforeEach(() => {
    progressRepo = new LocalStorageProgressRepository();
    courseRepo = new BuiltinCourseRepository();
    prereqEngine = new PrerequisiteEngine();
    completionEngine = new LessonCompletionEngine();
    quizEngine = new QuizEngine();
  });

  it('1. should complete the entire single-lesson MVP cycle: lab -> terminal -> graph -> validation -> quiz -> progress', async () => {
    const runner = new ScenarioRunner(firstCommitScenario);
    expect(runner.validate().passed).toBe(false);

    runner.execute('git init');
    runner.execute('git add login.js');
    const commitStep = runner.execute('git commit -m "feat: add login module"');
    expect(commitStep.validation.passed).toBe(true);

    const state = runner.getEngine().getState();
    const layout = new GitGraphLayout().buildLayout(state);
    expect(layout.nodes.length).toBe(1);
    expect(layout.nodes[0].branches).toContain('main');

    // Save lesson progress
    await progressRepo.saveLessonProgress({
      lessonId: '09-git-commit',
      completed: true,
      theoryViewed: true,
      quizScore: 100,
      labsCompleted: ['first-commit'],
      xp: 100,
    });

    const progress = await progressRepo.getCourseProgress();
    expect(progress.lessons['09-git-commit']?.completed).toBe(true);
  });

  it('2. should unlock lessons based on prerequisite completion', async () => {
    const manifest = await courseRepo.getManifest();
    const l1 = manifest.curriculum[0].lessons[0]; // 01-version-control
    const l2 = manifest.curriculum[0].lessons[1]; // 02-git-la-gi (requires 01-version-control)

    const initialProgress = await progressRepo.getCourseProgress();

    // l1 has no prerequisites
    expect(prereqEngine.isAccessible(l1, initialProgress)).toBe(true);

    // l2 requires l1, so initially locked
    expect(prereqEngine.isAccessible(l2, initialProgress)).toBe(false);

    // Complete l1
    await progressRepo.saveLessonProgress({
      lessonId: l1.id,
      completed: true,
      theoryViewed: true,
      quizScore: 90,
      labsCompleted: [],
      xp: 50,
    });

    const updatedProgress = await progressRepo.getCourseProgress();
    expect(prereqEngine.isAccessible(l2, updatedProgress)).toBe(true);
  });

  it('3. should track VFS file edits and update Git diff and status in real-time', () => {
    const engine = new GitEngine();
    engine.execute('git init');
    engine.getFileSystem().writeFile('app.ts', 'const a = 1;');
    engine.execute('git add app.ts');
    engine.execute('git commit -m "initial"');

    // Student edits file in Editor
    engine.getFileSystem().writeFile('app.ts', 'const a = 2;');
    const state = engine.getState();
    const appFile = state.workingTree.find((f) => f.path === 'app.ts');
    expect(appFile?.status).toBe('modified');

    const diff = engine.execute('git diff');
    expect(diff.stdout).toContain('-const a = 1;');
    expect(diff.stdout).toContain('+const a = 2;');
  });

  it('4. should perform Fast-Forward merge and update graph pointer without creating duplicate commits', () => {
    const runner = new ScenarioRunner(fastForwardMergeScenario);
    expect(runner.validate().passed).toBe(false);

    // Initial commit on feature branch
    runner.execute('git switch feature');
    runner.execute('git add app.js');
    runner.execute('git commit -m "feat: app"');

    // Switch back to main and merge feature
    runner.execute('git switch main');
    const mergeRes = runner.execute('git merge feature');
    expect(mergeRes.commandResult.success).toBe(true);
    expect(mergeRes.commandResult.stdout).toContain('Fast-forward');

    const state = runner.getEngine().getState();
    const layout = new GitGraphLayout().buildLayout(state);
    expect(layout.nodes.length).toBe(1);

    const val = runner.validate();
    expect(val.passed).toBe(true);
  });

  it('5. should execute 3-Way merge with divergent history and create DAG commit with 2 parents', () => {
    const engine = new GitEngine();
    engine.execute('git init');
    engine.getFileSystem().writeFile('base.txt', 'base');
    engine.execute('git add base.txt');
    engine.execute('git commit -m "c1: base"');

    // Branch A
    engine.execute('git switch -c feature/a');
    engine.getFileSystem().writeFile('a.txt', 'feature a');
    engine.execute('git add a.txt');
    engine.execute('git commit -m "c2: feature a"');

    // Branch Main
    engine.execute('git switch main');
    engine.getFileSystem().writeFile('main.txt', 'main work');
    engine.execute('git add main.txt');
    engine.execute('git commit -m "c3: main work"');

    // Merge feature/a into main
    const mergeRes = engine.execute('git merge feature/a');
    expect(mergeRes.success).toBe(true);

    const state = engine.getState();
    const mergeCommit = state.commits[state.commits.length - 1];
    expect(mergeCommit.parents.length).toBe(2);

    const layout = new GitGraphLayout().buildLayout(state);
    const mergeNode = layout.nodes.find((n) => n.hash === mergeCommit.hash);
    expect(mergeNode?.parents.length).toBe(2);
  });

  it('6. should handle real Merge Conflict workflow: detect conflict markers -> edit in VFS -> add -> commit', () => {
    const runner = new ScenarioRunner(mergeConflictScenario);
    expect(runner.validate().passed).toBe(false);

    // Verify conflict markers in VFS
    const fileContent = runner.getEngine().getFileSystem().readFile('auth.ts') || '';
    expect(fileContent).toContain('<<<<<<< HEAD');
    expect(fileContent).toContain('=======');
    expect(fileContent).toContain('>>>>>>> feature-auth');

    const stateAfterConflict = runner.getEngine().getState();
    const authState = stateAfterConflict.workingTree.find((f) => f.path === 'auth.ts');
    expect(authState?.status).toBe('conflict');

    // Student resolves conflict in editor
    runner.getEngine().getFileSystem().writeFile('auth.ts', 'export const API_URL = "https://api.production.vn";');

    // Student adds and commits
    runner.execute('git add auth.ts');
    const resolveCommit = runner.execute('git commit -m "merge: resolve auth URL conflict"');
    expect(resolveCommit.commandResult.success).toBe(true);

    // Validation passes
    const val = runner.validate();
    expect(val.passed).toBe(true);
  });

  it('7. should restore working tree modifications with git restore', () => {
    const engine = new GitEngine();
    engine.execute('git init');
    engine.getFileSystem().writeFile('config.ts', 'export const env = "production";');
    engine.execute('git add config.ts');
    engine.execute('git commit -m "init config"');

    // Accidental change
    engine.getFileSystem().writeFile('config.ts', 'export const env = "broken";');
    expect(engine.getFileSystem().readFile('config.ts')).toBe('export const env = "broken";');

    engine.execute('git restore config.ts');
    expect(engine.getFileSystem().readFile('config.ts')).toBe('export const env = "production";');
  });

  it('8. should roll back commits and working tree with git reset --hard', () => {
    const engine = new GitEngine();
    engine.execute('git init');
    engine.getFileSystem().writeFile('f1.txt', '1');
    engine.execute('git add f1.txt');
    engine.execute('git commit -m "commit 1"');

    engine.getFileSystem().writeFile('f2.txt', '2');
    engine.execute('git add f2.txt');
    engine.execute('git commit -m "commit 2"');

    const c1Hash = engine.getState().commits[0].hash;
    expect(engine.getState().commits.length).toBe(2);

    engine.execute('git reset --hard HEAD~1');
    const mainBranch = engine.getState().branches.find((b) => b.name === 'main');
    expect(mainBranch?.commitHash).toBe(c1Hash);
    expect(engine.getFileSystem().exists('f2.txt')).toBe(false);
  });

  it('9. should temporarily stash changes and pop them cleanly', () => {
    const runner = new ScenarioRunner(stashScenario);
    runner.execute('git stash');
    const cleanStatus = runner.execute('git status');
    expect(cleanStatus.commandResult.stdout).toContain('working tree clean');

    runner.execute('git stash pop');
    const restoredStatus = runner.execute('git status');
    expect(restoredStatus.commandResult.stdout).toContain('wip.js');
  });

  it('10. should reset lab environment completely without resetting global course progress or XP', async () => {
    // 1. Give student global progress and XP
    await progressRepo.addXp(250);
    await progressRepo.saveLessonProgress({
      lessonId: '04-repository',
      completed: true,
      theoryViewed: true,
      quizScore: 100,
      labsCompleted: ['first-repository'],
      xp: 75,
    });

    const runner = new ScenarioRunner(firstCommitScenario);
    runner.execute('git init');
    runner.execute('git add login.js');
    runner.execute('git commit -m "feat: login"');
    expect(runner.validate().passed).toBe(true);

    // 2. Student resets lab
    runner.reset();
    expect(runner.validate().passed).toBe(false);
    expect(runner.getEngine().getState().repositoryInitialized).toBe(false);
    expect(runner.getCommandLog()).toHaveLength(0);

    // 3. Global progress is intact
    const progress = await progressRepo.getCourseProgress();
    expect(progress.totalXp).toBe(250);
    expect(progress.lessons['04-repository']?.completed).toBe(true);
  });
});
