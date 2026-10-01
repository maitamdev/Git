import { describe, expect, it } from 'vitest';
import { BuiltinCourseRepository, ScenarioRunner, ProgressConflictResolver } from '../../packages/exercise-engine/src';
import { BUILTIN_SCENARIOS } from '../../packages/git-scenarios/src';
import { buildLessonSlides, requiredLabsFor } from '../../apps/playground/src/learning/lesson-flow';
import { validateGuidedLab } from '../../apps/playground/src/learning/lab-validation';
import { GuidedPlumbingSession } from '../../apps/playground/src/learning/plumbing-session';

describe('guided course', () => {
  it('teaches key terms as separate cards and turns a text lab into a try-and-check activity', async () => {
    const repository = new BuiltinCourseRepository();
    const lessonCards = [
      ['01-version-control', 4],
      ['02-vcs-types', 4],
      ['03-git-la-gi', 3],
    ] as const;
    for (const [lessonId, expectedTermCount] of lessonCards) {
      const lesson = await repository.getLesson('01-foundations', lessonId);
      expect(lesson, lessonId).not.toBeNull();
      const slides = buildLessonSlides(lesson!);
      const terms = slides.filter((slide) => slide.kind === 'term');
      const practice = slides.find((slide) => slide.kind === 'practice');

      expect(terms, lessonId).toHaveLength(expectedTermCount);
      expect(terms.every((slide) => slide.body && slide.termExample && slide.termContrast), lessonId).toBe(true);
      expect(practice?.practiceCheck, `${lessonId} should expose its lab criteria`).toBeTruthy();
      expect(slides.findIndex((slide) => slide.kind === 'story')).toBeLessThan(slides.findIndex((slide) => slide.kind === 'term'));
      expect(slides.findIndex((slide) => slide.kind === 'term')).toBeLessThan(slides.findIndex((slide) => slide.kind === 'concept'));
    }

    const firstLesson = await repository.getLesson('01-foundations', '01-version-control');
    expect(buildLessonSlides(firstLesson!).filter((slide) => slide.kind === 'term').map((slide) => slide.title)).toEqual([
      'Version Control — quản lý phiên bản',
      'VCS (Version Control System) — hệ thống quản lý phiên bản',
      'Commit — mốc đã lưu trong Git',
      'History — lịch sử thay đổi',
    ]);
  });

  it('teaches vocabulary as separate complete cards in every Level 1 lesson', async () => {
    const repository = new BuiltinCourseRepository();
    const lessonCards = [
      ['01-version-control', 4],
      ['02-vcs-types', 4],
      ['03-git-la-gi', 3],
      ['04-git-architecture', 3],
      ['05-git-vs-github', 5],
      ['06-git-installation', 4],
      ['07-git-config', 5],
      ['08-repository', 4],
      ['09-git-init', 4],
    ] as const;

    for (const [lessonId, expectedCount] of lessonCards) {
      const lesson = await repository.getLesson('01-foundations', lessonId);
      expect(lesson, lessonId).not.toBeNull();
      const slides = buildLessonSlides(lesson!);
      const terms = slides.filter((slide) => slide.kind === 'term');
      const hasPracticeOrLab = slides.some((slide) => slide.kind === 'practice') || Boolean(lesson!.labScenarios?.length);

      expect(terms, lessonId).toHaveLength(expectedCount);
      expect(terms.every((slide) => slide.body && slide.termExample && slide.termContrast), lessonId).toBe(true);
      expect(hasPracticeOrLab, `${lessonId} should provide a learner action`).toBe(true);
    }
  });

  it('teaches vocabulary, practice, and a usable quiz in every Level 2 lesson', async () => {
    const repository = new BuiltinCourseRepository();
    const lessonCards = [
      ['01-working-directory', 4],
      ['02-staging-area', 3],
      ['03-head-snapshot', 3],
      ['04-git-status', 4],
      ['05-git-add', 4],
      ['06-git-commit', 3],
      ['07-commit-message', 5],
      ['08-git-log', 5],
      ['09-git-diff', 4],
      ['10-gitignore', 4],
      ['11-file-lifecycle', 4],
      ['12-undo-working-tree', 3],
    ] as const;

    for (const [lessonId, expectedCount] of lessonCards) {
      const lesson = await repository.getLesson('02-git-basics', lessonId);
      expect(lesson, lessonId).not.toBeNull();
      const slides = buildLessonSlides(lesson!);
      const terms = slides.filter((slide) => slide.kind === 'term');
      const hasPracticeOrLab = slides.some((slide) => slide.kind === 'practice') || Boolean(lesson!.labScenarios?.length);
      const questions = lesson!.quiz?.questions || [];

      expect(terms, lessonId).toHaveLength(expectedCount);
      expect(terms.every((slide: any) => slide.body && slide.termExample && slide.termContrast), lessonId).toBe(true);
      expect(hasPracticeOrLab, `${lessonId} should provide a learner action`).toBe(true);
      expect(questions.length, `${lessonId} should have at least five quiz questions`).toBeGreaterThanOrEqual(5);
      expect(questions.every((question: any) => question.explanation?.trim()), `${lessonId} should explain answers`).toBe(true);
      expect(questions.every((question: any) => question.options?.filter((option: any) => option.correct).length === 1), `${lessonId} should have one correct answer per question`).toBe(true);
    }
  });

  it('teaches vocabulary, practice, and a usable quiz in every Level 3 lesson', async () => {
    const repository = new BuiltinCourseRepository();
    const lessonCards = [
      ['01-branch-concept', 3],
      ['02-head-pointer', 3],
      ['03-git-branch', 3],
      ['04-git-switch', 3],
      ['05-git-checkout', 3],
      ['06-branch-isolation', 3],
      ['07-fast-forward-merge', 3],
      ['08-three-way-merge', 3],
      ['09-merge-commit', 3],
      ['10-merge-conflict', 3],
      ['11-resolve-conflict', 3],
      ['12-merge-abort', 3],
      ['13-delete-rename-branch', 3],
      ['14-branching-challenge', 3],
    ] as const;

    for (const [lessonId, expectedCount] of lessonCards) {
      const lesson = await repository.getLesson('03-branching', lessonId);
      expect(lesson, lessonId).not.toBeNull();
      const slides = buildLessonSlides(lesson!);
      const terms = slides.filter((slide) => slide.kind === 'term');
      const hasPracticeOrLab = slides.some((slide) => slide.kind === 'practice') || Boolean(lesson!.labScenarios?.length);
      const questions = lesson!.quiz?.questions || [];

      expect(terms, lessonId).toHaveLength(expectedCount);
      expect(terms.every((slide: any) => slide.body && slide.termExample && slide.termContrast), lessonId).toBe(true);
      expect(hasPracticeOrLab, `${lessonId} should provide a learner action`).toBe(true);
      expect(questions.length, `${lessonId} should have at least five quiz questions`).toBeGreaterThanOrEqual(5);
      expect(questions.every((question: any) => question.explanation?.trim()), `${lessonId} should explain answers`).toBe(true);
      expect(questions.every((question: any) => question.options?.filter((option: any) => option.correct).length === 1), `${lessonId} should have one correct answer per question`).toBe(true);
    }
  });

  it('teaches vocabulary, practice, and a usable quiz in every Level 4 lesson', async () => {
    const repository = new BuiltinCourseRepository();
    const lessonCards = [
      ['01-local-vs-remote', 3],
      ['02-git-remote', 3],
      ['03-origin-concept', 3],
      ['04-git-clone', 3],
      ['05-git-fetch', 3],
      ['06-git-pull', 3],
      ['07-git-push', 3],
      ['08-tracking-branch', 3],
      ['09-fork', 3],
      ['10-upstream', 3],
      ['11-pull-request', 3],
      ['12-code-review', 3],
      ['13-merge-pull-request', 3],
      ['14-github-issues', 3],
      ['15-collaboration-workflow', 3],
      ['16-team-project-challenge', 3],
    ] as const;

    for (const [lessonId, expectedCount] of lessonCards) {
      const lesson = await repository.getLesson('04-github-collaboration', lessonId);
      expect(lesson, lessonId).not.toBeNull();
      const slides = buildLessonSlides(lesson!);
      const terms = slides.filter((slide) => slide.kind === 'term');
      const hasPracticeOrLab = slides.some((slide) => slide.kind === 'practice') || Boolean(lesson!.labScenarios?.length);
      const questions = lesson!.quiz?.questions || [];

      expect(terms, lessonId).toHaveLength(expectedCount);
      expect(terms.every((slide: any) => slide.body && slide.termExample && slide.termContrast), lessonId).toBe(true);
      expect(hasPracticeOrLab, `${lessonId} should provide a learner action`).toBe(true);
      expect(questions.length, `${lessonId} should have at least five quiz questions`).toBeGreaterThanOrEqual(5);
      expect(questions.every((question: any) => question.explanation?.trim()), `${lessonId} should explain answers`).toBe(true);
      expect(questions.every((question: any) => question.options?.filter((option: any) => option.correct).length === 1), `${lessonId} should have one correct answer per question`).toBe(true);
    }
  });

  it('teaches vocabulary, practice, and a usable quiz in every Level 5 lesson', async () => {
    const repository = new BuiltinCourseRepository();
    const lessonCards = [
      ['01-undo-restore-reset-revert', 3],
      ['02-git-reset-soft', 3],
      ['03-git-reset-mixed', 3],
      ['04-git-reset-hard', 3],
      ['05-git-revert', 3],
      ['06-git-reflog', 3],
      ['07-reflog-recovery', 3],
      ['08-commit-amend', 3],
      ['09-git-stash-advanced', 3],
      ['10-git-cherry-pick', 3],
      ['11-rebase-concept', 3],
      ['12-git-rebase', 3],
      ['13-interactive-rebase', 3],
      ['14-squash-commit', 3],
      ['15-fixup-autosquash', 3],
      ['16-reword-edit-drop', 3],
      ['17-rebase-conflict', 3],
      ['18-git-tag', 3],
      ['19-annotated-tag', 3],
      ['20-git-bisect', 3],
      ['21-git-worktree', 3],
      ['22-advanced-git-challenge', 3],
    ] as const;

    for (const [lessonId, expectedCount] of lessonCards) {
      const lesson = await repository.getLesson('05-advanced-git', lessonId);
      expect(lesson, lessonId).not.toBeNull();
      const slides = buildLessonSlides(lesson!);
      const terms = slides.filter((slide) => slide.kind === 'term');
      const hasPracticeOrLab = slides.some((slide) => slide.kind === 'practice') || Boolean(lesson!.labScenarios?.length);
      const questions = lesson!.quiz?.questions || [];

      expect(terms, lessonId).toHaveLength(expectedCount);
      expect(terms.every((slide: any) => slide.body && slide.termExample && slide.termContrast), lessonId).toBe(true);
      expect(hasPracticeOrLab, `${lessonId} should provide a learner action`).toBe(true);
      expect(questions.length, `${lessonId} should have at least five quiz questions`).toBeGreaterThanOrEqual(5);
      expect(questions.every((question: any) => question.explanation?.trim()), `${lessonId} should explain answers`).toBe(true);
      expect(questions.every((question: any) => question.options?.filter((option: any) => option.correct).length === 1), `${lessonId} should have one correct answer per question`).toBe(true);
    }
  });

  it('teaches vocabulary, practice, and a usable quiz in every Level 6 lesson', async () => {
    const repository = new BuiltinCourseRepository();
    const lessonCards = [
      ['01-why-team-workflow', 3],
      ['02-feature-branch-workflow', 3],
      ['03-github-flow', 3],
      ['04-git-flow', 3],
      ['05-trunk-based-development', 3],
      ['06-workflow-comparison', 3],
      ['07-protected-branch', 3],
      ['08-branch-protection-rules', 3],
      ['09-codeowners', 3],
      ['10-conventional-commits', 3],
      ['11-semantic-versioning', 4],
      ['12-release-branch', 3],
      ['13-hotfix-workflow', 3],
      ['14-team-conflict-scenario', 3],
      ['15-professional-team-project', 3],
    ] as const;

    for (const [lessonId, expectedCount] of lessonCards) {
      const lesson = await repository.getLesson('06-team-workflows', lessonId);
      expect(lesson, lessonId).not.toBeNull();
      const slides = buildLessonSlides(lesson!);
      const terms = slides.filter((slide) => slide.kind === 'term');
      const hasPracticeOrLab = slides.some((slide) => slide.kind === 'practice') || Boolean(lesson!.labScenarios?.length);
      const questions = lesson!.quiz?.questions || [];

      expect(terms, lessonId).toHaveLength(expectedCount);
      expect(terms.every((slide: any) => slide.body && slide.termExample && slide.termContrast), lessonId).toBe(true);
      expect(hasPracticeOrLab, `${lessonId} should provide a learner action`).toBe(true);
      expect(questions.length, `${lessonId} should have at least five quiz questions`).toBeGreaterThanOrEqual(5);
      expect(questions.every((question: any) => question.explanation?.trim()), `${lessonId} should explain answers`).toBe(true);
      expect(questions.every((question: any) => question.options?.filter((option: any) => option.correct).length === 1), `${lessonId} should have one correct answer per question`).toBe(true);
    }
  });

  it('teaches vocabulary, practice, and a usable quiz in every Level 7 lesson', async () => {
    const repository = new BuiltinCourseRepository();
    const lessonCards = [
      ['01-ci-cd-concept', 3],
      ['02-github-actions-intro', 3],
      ['03-workflow-architecture', 3],
      ['04-workflow-yaml-syntax', 3],
      ['05-events-and-triggers', 3],
      ['06-jobs-configuration', 3],
      ['07-steps-execution', 3],
      ['08-runners-environment', 3],
      ['09-run-vs-uses', 3],
      ['10-env-variables', 3],
      ['11-contexts-and-expressions', 3],
      ['12-job-dependencies-needs', 3],
      ['13-conditional-execution-if', 3],
      ['14-matrix-strategy', 3],
      ['15-artifacts-sharing', 3],
      ['16-secrets-and-variables', 3],
      ['17-pull-request-ci', 3],
      ['18-environments-and-deployment', 3],
      ['19-reusable-workflows', 3],
      ['20-ci-cd-capstone', 3],
    ] as const;

    for (const [lessonId, expectedCount] of lessonCards) {
      const lesson = await repository.getLesson('07-github-actions', lessonId);
      expect(lesson, lessonId).not.toBeNull();
      const slides = buildLessonSlides(lesson!);
      const terms = slides.filter((slide) => slide.kind === 'term');
      const hasPracticeOrLab = slides.some((slide) => slide.kind === 'practice') || Boolean(lesson!.labScenarios?.length);
      const questions = lesson!.quiz?.questions || [];

      expect(terms, lessonId).toHaveLength(expectedCount);
      expect(terms.every((slide: any) => slide.body && slide.termExample && slide.termContrast), lessonId).toBe(true);
      expect(hasPracticeOrLab, `${lessonId} should provide a learner action`).toBe(true);
      expect(questions.length, `${lessonId} should have at least five quiz questions`).toBeGreaterThanOrEqual(5);
      expect(questions.every((question: any) => question.explanation?.trim()), `${lessonId} should explain answers`).toBe(true);
      expect(questions.every((question: any) => question.options?.filter((option: any) => option.correct).length === 1), `${lessonId} should have one correct answer per question`).toBe(true);
    }
  });

  it('teaches vocabulary, practice, and a usable quiz in every Level 8 lesson', async () => {
    const repository = new BuiltinCourseRepository();
    const lessonCards = [
      ['01-git-internals-intro', 3],
      ['02-porcelain-vs-plumbing', 3],
      ['03-dot-git-directory', 3],
      ['04-object-database', 3],
      ['05-content-addressable-storage', 3],
      ['06-blob-object', 3],
      ['07-tree-object', 3],
      ['08-commit-object', 3],
      ['09-tag-object', 3],
      ['10-git-hash-object', 3],
      ['11-git-cat-file', 3],
      ['12-references-and-heads', 3],
      ['13-symbolic-refs-head', 3],
      ['14-git-index-internals', 3],
      ['15-revision-syntax', 3],
      ['16-object-graph-traversal', 3],
      ['17-packfiles-and-deltas', 3],
      ['18-refspec-and-remotes', 3],
      ['19-reflog-internals', 3],
      ['20-build-commit-manually-capstone', 3],
    ] as const;

    for (const [lessonId, expectedCount] of lessonCards) {
      const lesson = await repository.getLesson('08-git-internals', lessonId);
      expect(lesson, lessonId).not.toBeNull();
      const slides = buildLessonSlides(lesson!);
      const terms = slides.filter((slide) => slide.kind === 'term');
      const hasPracticeOrLab = slides.some((slide) => slide.kind === 'practice') || Boolean(lesson!.labScenarios?.length);
      const questions = lesson!.quiz?.questions || [];

      expect(terms, lessonId).toHaveLength(expectedCount);
      expect(terms.every((slide: any) => slide.body && slide.termExample && slide.termContrast), lessonId).toBe(true);
      expect(hasPracticeOrLab, `${lessonId} should provide a learner action`).toBe(true);
      expect(questions.length, `${lessonId} should have at least five quiz questions`).toBeGreaterThanOrEqual(5);
      expect(questions.every((question: any) => question.explanation?.trim()), `${lessonId} should explain answers`).toBe(true);
      expect(questions.every((question: any) => question.options?.filter((option: any) => option.correct).length === 1), `${lessonId} should have one correct answer per question`).toBe(true);
    }
  });

  it('can turn every lesson into readable screens, questions, and its required labs', async () => {
    const lessons = await new BuiltinCourseRepository().getAllLessons();
    expect(lessons).toHaveLength(128);
    const manifest = await new BuiltinCourseRepository().getManifest();
    for (const lesson of lessons) {
      const slides = buildLessonSlides(lesson);
      expect(slides.length, lesson.id).toBeGreaterThan(0);
      expect(slides.every((slide) => Boolean(slide.body || slide.code)), lesson.id).toBe(true);
      expect(lesson.quiz?.questions.length, lesson.id).toBeGreaterThan(0);
      for (const labId of lesson.metadata.completion?.labs || []) {
        expect(lesson.labScenarios?.some((scenario) => scenario.id === labId), `${lesson.id}: ${labId}`).toBe(true);
      }
    }
    for (const [moduleIndex, module] of manifest.curriculum.entries()) {
      const finalLesson = lessons.find((lesson) => lesson.id === module.lessons.at(-1)?.id)!;
      expect(requiredLabsFor(manifest, moduleIndex, finalLesson)).toEqual(expect.arrayContaining(module.lessons.at(-1)?.labIds || []));
    }
  }, 15_000);

  it('does not complete a legacy lab that starts in a passing state without practice', () => {
    const runner = new ScenarioRunner(BUILTIN_SCENARIOS['git-config-lab']);
    expect(runner.validate().passed).toBe(true);
    expect(validateGuidedLab(runner, []).passed).toBe(false);
    expect(validateGuidedLab(runner, ['git status']).passed).toBe(false);
    expect(validateGuidedLab(runner, ['git config user.name Learner']).passed).toBe(false);
    expect(validateGuidedLab(runner, ['git config user.name Learner', 'git config user.email learner@example.com']).passed).toBe(true);
  });

  it('keeps normal state-based validation for a lab that needs a changed repository', () => {
    const runner = new ScenarioRunner(BUILTIN_SCENARIOS['first-repository']);
    expect(runner.validate().passed).toBe(false);
    expect(validateGuidedLab(runner, []).passed).toBe(false);
    runner.execute('git init');
    expect(validateGuidedLab(runner, ['git init']).passed).toBe(true);
  });

  it('lets a learner complete the Git internals capstone using plumbing commands', () => {
    const runner = new ScenarioRunner(BUILTIN_SCENARIOS['internals-manual-commit-capstone']);
    const session = new GuidedPlumbingSession(runner);
    const commands = [
      'BLOB=$(git hash-object -w capstone.txt)',
      'git update-index --add capstone.txt',
      'TREE=$(git write-tree)',
      'COMMIT=$(git commit-tree $TREE -m "feat: manual capstone commit")',
      'git update-ref refs/heads/main $COMMIT',
    ];
    const practiced: string[] = [];
    for (const command of commands) {
      const result = session.execute(command);
      expect(result.success, `${command}: ${result.stderr}`).toBe(true);
      practiced.push(result.practicedCommand);
    }
    expect(validateGuidedLab(runner, practiced).passed).toBe(true);
  });

  it('runs the plumbing commands used by the other Git internals labs', () => {
    const cases: Array<[string, string[]]> = [
      ['hash-object-lab', ['git hash-object -w hello.txt']],
      ['cat-file-lab', ['git cat-file -p HEAD']],
      ['update-index-lab', ['git hash-object -w note.txt', 'git update-index --add note.txt']],
      ['write-tree-lab', ['git write-tree']],
      ['commit-tree-lab', ['git write-tree', 'git commit-tree {{tree}} -m "Manual commit"']],
      ['update-ref-lab', ['git update-ref refs/heads/main HEAD']],
      ['git-gc-pack-lab', ['git gc']],
    ];

    for (const [scenarioId, commands] of cases) {
      const runner = new ScenarioRunner(BUILTIN_SCENARIOS[scenarioId as keyof typeof BUILTIN_SCENARIOS]);
      const session = new GuidedPlumbingSession(runner);
      const practiced: string[] = [];
      let lastOutput = '';
      for (let command of commands) {
        if (command.includes('{{tree}}')) command = command.replace('{{tree}}', lastOutput.replace(/^TREE=/, ''));
        const result = session.execute(command);
        expect(result.success, `${scenarioId} / ${command}: ${result.stderr}`).toBe(true);
        practiced.push(result.practicedCommand);
        lastOutput = result.stdout;
      }
      expect(validateGuidedLab(runner, practiced).passed, scenarioId).toBe(true);
    }
  });

  it('correctly resolves and merges offline progress with remote server progress', () => {
    const local = {
      userId: 'student-a',
      totalXp: 150,
      level: 1,
      streakDays: 2,
      lastActiveDate: '2026-09-30',
      lessons: {
        '01-version-control': {
          lessonId: '01-version-control',
          completed: true,
          theoryViewed: true,
          quizScore: 100,
          quizAttempts: 1,
          labsCompleted: [],
          xp: 50,
        },
      },
      achievements: ['first_step'],
    };

    const server = {
      userId: 'student-a',
      totalXp: 200,
      level: 2,
      streakDays: 3,
      lastActiveDate: '2026-10-01',
      lessons: {
        '02-vcs-types': {
          lessonId: '02-vcs-types',
          completed: true,
          theoryViewed: true,
          quizScore: 85,
          quizAttempts: 1,
          labsCompleted: [],
          xp: 50,
        },
      },
      achievements: ['fast_learner'],
    };

    const merged = ProgressConflictResolver.merge(local, server);
    expect(merged.lessons['01-version-control']?.completed).toBe(true);
    expect(merged.lessons['02-vcs-types']?.completed).toBe(true);
    expect(merged.totalXp).toBe(200);
    expect(merged.achievements).toContain('first_step');
    expect(merged.achievements).toContain('fast_learner');
  });

  it('enforces RBAC destination contracts for student, teacher and admin', () => {
    const routeForUser = (user: { role: 'student' | 'teacher' | 'admin' }): string => {
      if (user.role === 'student') return 'learn';
      if (user.role === 'teacher') return 'teacher';
      return 'dashboard';
    };

    expect(routeForUser({ role: 'student' })).toBe('learn');
    expect(routeForUser({ role: 'teacher' })).toBe('teacher');
    expect(routeForUser({ role: 'admin' })).toBe('dashboard');
  });
});
