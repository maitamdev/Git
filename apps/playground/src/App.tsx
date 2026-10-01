import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { LessonPanel } from './components/LessonPanel';
import { FileExplorer } from './components/FileExplorer';
import { GitGraphView } from './components/GitGraphView';
import { TerminalView, TerminalEntry } from './components/TerminalView';
import type { PRFileDiffItem, PRReviewItem } from './components/PullRequestView';
import { GitHubSimulator } from '@git-academy/github-simulator';

const ThreeStageVisualizer = React.lazy(() =>
  import('./components/ThreeStageVisualizer').then((m) => ({ default: m.ThreeStageVisualizer }))
);
const CheatSheetModal = React.lazy(() =>
  import('./components/CheatSheetModal').then((m) => ({ default: m.CheatSheetModal }))
);
const CourseSearchModal = React.lazy(() =>
  import('./components/CourseSearchModal').then((m) => ({ default: m.CourseSearchModal }))
);
const PullRequestView = React.lazy(() =>
  import('./components/PullRequestView').then((m) => ({ default: m.PullRequestView }))
);
const MergeConflictEditor = React.lazy(() =>
  import('./components/MergeConflictEditor').then((m) => ({ default: m.MergeConflictEditor }))
);
const AuthorPreviewPage = React.lazy(() =>
  import('./components/AuthorPreviewPage').then((m) => ({ default: m.AuthorPreviewPage }))
);
const CourseHealthDashboard = React.lazy(() =>
  import('./components/CourseHealthDashboard').then((m) => ({ default: m.CourseHealthDashboard }))
);
const GitInternalsInspector = React.lazy(() =>
  import('./components/GitInternalsInspector').then((m) => ({ default: m.GitInternalsInspector }))
);
const WorkflowEditor = React.lazy(() =>
  import('./components/WorkflowEditor').then((m) => ({ default: m.WorkflowEditor }))
);
const WorkflowRunView = React.lazy(() =>
  import('./components/WorkflowRunView').then((m) => ({ default: m.WorkflowRunView }))
);
const StudentDashboard = React.lazy(() =>
  import('./components/StudentDashboard').then((m) => ({ default: m.StudentDashboard }))
);
const TeacherDashboard = React.lazy(() =>
  import('./components/TeacherDashboard').then((m) => ({ default: m.TeacherDashboard }))
);
const ClassDashboard = React.lazy(() =>
  import('./components/ClassDashboard').then((m) => ({ default: m.ClassDashboard }))
);

import { CourseErrorBoundary } from './components/CourseErrorBoundary';
import { SimulatorErrorBoundary } from './components/SimulatorErrorBoundary';
import { WorkflowErrorBoundary } from './components/WorkflowErrorBoundary';
import { safeLoadProgress, safeSaveProgress } from './utils/storage-recovery';
import { downloadProgressFile, importProgressFromJson } from './utils/progress-io';
import type { StudioViewMode, AppRoute } from './components/Header';
import type { WorkflowDefinition, WorkflowExecutionResult } from '@git-academy/actions-simulator';
import { WorkflowRunner } from '@git-academy/actions-simulator';

import {
  BuiltinCourseRepository,
  LocalStorageProgressRepository,
  PrerequisiteEngine,
  LessonCompletionEngine,
  AchievementEngine,
  ScenarioRunner,
} from '@git-academy/exercise-engine';
import {
  CourseLesson,
  CourseManifest,
  CourseProgress,
  GitState,
  GoalCheckItem,
  ManifestLessonItem,
  Scenario,
  User,
  Classroom,
} from '@git-academy/shared';
import { firstCommitScenario, firstRepositoryScenario } from '@git-academy/git-scenarios';

const courseRepo = new BuiltinCourseRepository();
const progressRepo = new LocalStorageProgressRepository();
const prerequisiteEngine = new PrerequisiteEngine();
const completionEngine = new LessonCompletionEngine();
const achievementEngine = new AchievementEngine();

export const MOCK_USERS: Record<'student' | 'teacher' | 'admin', User> = {
  student: {
    id: 'student-khang-01',
    email: 'khang@gitacademy.vn',
    displayName: 'Vũ Quốc Khang',
    role: 'student',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Khang',
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z',
  },
  teacher: {
    id: 'teacher-lan-48',
    email: 'lan.teacher@gitacademy.vn',
    displayName: 'Cô Nguyễn Thị Lan',
    role: 'teacher',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lan',
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z',
  },
  admin: {
    id: 'admin-01',
    email: 'admin@gitacademy.vn',
    displayName: 'Quản Trị Viên',
    role: 'admin',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z',
  },
};

const DEFAULT_PR_FILE_DIFFS: PRFileDiffItem[] = [
  {
    path: 'profile.ts',
    status: 'added',
    oldContent: null,
    newContent: 'export interface UserProfile {\n  name: string;\n  role: string;\n  xp: number;\n}',
  },
  {
    path: 'auth.ts',
    status: 'modified',
    oldContent: 'export function authenticate() { return false; }',
    newContent: 'export function authenticate() {\n  // Token validation\n  return true;\n}',
  },
];

export const App: React.FC = () => {
  // Top-level dev, author & LMS routes
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() => {
    const path = typeof window !== 'undefined' ? window.location.pathname : '/';
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    if (path === '/author' || hash === '#/author' || hash === '#author') return 'author';
    if (
      path === '/dev/course-health' ||
      path === '/course-health' ||
      hash === '#/dev/course-health' ||
      hash === '#dev/course-health'
    )
      return 'course-health';
    if (path === '/dashboard' || hash === '#/dashboard' || hash === '#dashboard') return 'dashboard';
    if (path === '/teacher' || hash === '#/teacher' || hash === '#teacher') return 'teacher';
    return 'learn';
  });

  // Current LMS User Profile
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS.student);

  // Selected Classroom for Teacher deep-dive
  const [selectedClass, setSelectedClass] = useState<Classroom | null>({
    id: 'class-git-k48',
    name: 'Git & GitHub — CNTT K48',
    code: 'GIT-K48-A',
    teacherId: 'teacher-lan-48',
    courseId: 'git-foundations',
    startDate: '2026-09-05T00:00:00Z',
    endDate: '2026-12-30T00:00:00Z',
    createdAt: '2026-09-01T08:00:00Z',
  });

  const handleSwitchUserRole = (role: 'student' | 'teacher' | 'admin') => {
    setCurrentUser(MOCK_USERS[role]);
    if (role === 'teacher' && currentRoute === 'dashboard') {
      setCurrentRoute('teacher');
    } else if (role === 'student' && (currentRoute === 'teacher' || currentRoute === 'class-dashboard')) {
      setCurrentRoute('dashboard');
    }
  };

  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/author' || hash === '#/author' || hash === '#author') {
        setCurrentRoute('author');
      } else if (
        path === '/dev/course-health' ||
        path === '/course-health' ||
        hash === '#/dev/course-health' ||
        hash === '#dev/course-health'
      ) {
        setCurrentRoute('course-health');
      } else if (path === '/dashboard' || hash === '#/dashboard' || hash === '#dashboard') {
        setCurrentRoute('dashboard');
      } else if (path === '/teacher' || hash === '#/teacher' || hash === '#teacher') {
        setCurrentRoute('teacher');
      } else {
        setCurrentRoute('learn');
      }
    };

    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);
    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  // Course curriculum state
  const [manifest, setManifest] = useState<CourseManifest | null>(null);
  const [currentModuleId, setCurrentModuleId] = useState<string>('01-foundations');
  const [currentLessonId, setCurrentLessonId] = useState<string>('01-version-control');
  const [currentLesson, setCurrentLesson] = useState<CourseLesson | null>(null);

  // Persistence progress
  const [courseProgress, setCourseProgress] = useState<CourseProgress>(() => {
    // Synchronous memory default while loading async
    return {
      userId: 'student-demo',
      totalXp: 0,
      level: 1,
      streakDays: 1,
      lessons: {},
      achievements: [],
    };
  });

  // Active Multi-lab scenarios
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);
  const activeScenarios = useMemo<Scenario[]>(() => {
    if (currentLesson?.labScenarios && currentLesson.labScenarios.length > 0) {
      return currentLesson.labScenarios;
    }
    // Default fallback scenario
    return [firstRepositoryScenario];
  }, [currentLesson]);

  const currentScenario = activeScenarios[activeLabIndex] || activeScenarios[0] || firstCommitScenario;

  // Scenario Runner instance
  const [runner, setRunner] = useState<ScenarioRunner>(() => new ScenarioRunner(currentScenario));
  const [gitState, setGitState] = useState<GitState>(() => runner.getEngine().getState());
  const [checklist, setChecklist] = useState<GoalCheckItem[]>(() => runner.validate().checklist);
  const [allPassed, setAllPassed] = useState<boolean>(() => runner.validate().passed);
  const [terminalEntries, setTerminalEntries] = useState<TerminalEntry[]>([]);

  // UI tabs, Studio views & Modals
  const [activeTab, setActiveTab] = useState<'theory' | 'lab' | 'quiz' | 'achievements'>('theory');
  const [studioView, setStudioView] = useState<StudioViewMode>('graph');
  const [workflowRun, setWorkflowRun] = useState<WorkflowExecutionResult | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);
  const [isPROpen, setIsPROpen] = useState(false);
  const [showThreeStage, setShowThreeStage] = useState(false);
  const [activeAnimation, setActiveAnimation] = useState<'add' | 'commit' | null>(null);

  const handleRunWorkflow = useCallback(async (workflowDef: WorkflowDefinition, _yaml: string) => {
    const result = await WorkflowRunner.execute(workflowDef, {
      event: 'push',
      ref: `refs/heads/${gitState.currentBranch || 'main'}`,
      sha: gitState.head?.ref || 'c0ffee1234567890abcdef1234567890abcdef12',
      actor: 'student',
      forceRun: true,
    });
    setWorkflowRun(result);
  }, [gitState]);

  const handleExportProgress = useCallback(() => {
    downloadProgressFile(courseProgress);
  }, [courseProgress]);

  const handleImportProgress = useCallback((jsonContent: string) => {
    const result = importProgressFromJson(jsonContent);
    if (result.success && result.progress) {
      setCourseProgress(result.progress);
      safeSaveProgress(result.progress);
    }
  }, []);

  // GitHub Simulator State for PR preview & real merge
  const [githubSim] = useState(() => new GitHubSimulator());
  const [simPR, setSimPR] = useState<any>({
    id: 1,
    title: 'feat: User Profile & Collaboration',
    description: 'Triển khai tính năng xác thực và module cập nhật hồ sơ sinh viên.',
    author: 'student-demo',
    sourceBranch: 'feature/profile',
    targetBranch: 'main',
    commits: ['a1b2c3d', 'f4e5d6c'],
    status: 'open',
    reviews: [
      {
        id: 1,
        author: 'Mentor-Nguyen',
        type: 'approve',
        body: 'Thực hiện rất tốt, code đáp ứng đầy đủ tiêu chuẩn.',
        timestamp: Date.now() - 1800000,
      },
    ],
  });

  // Load manifest & saved progress on mount
  useEffect(() => {
    courseRepo.getManifest().then((m) => {
      setManifest(m);
    });

    const recovery = safeLoadProgress();
    setCourseProgress(recovery.data);
  }, []);

  // Adapt studio view to module context
  useEffect(() => {
    if (currentModuleId === '07-github-actions') {
      setStudioView('actions');
    } else if (currentModuleId === '08-git-internals') {
      setStudioView('internals');
    }
  }, [currentModuleId]);

  // Sync route with URL hash: #/learn/:moduleId/:lessonId
  useEffect(() => {
    const handleHashChange = async () => {
      const hash = window.location.hash;
      const match = hash.match(/^#\/learn\/([^/]+)\/([^/]+)$/);
      let modId = '01-foundations';
      let lesId = '01-version-control';

      if (match) {
        modId = match[1];
        lesId = match[2];
      }

      setCurrentModuleId(modId);
      setCurrentLessonId(lesId);

      const lesson = await courseRepo.getLesson(modId, lesId);
      if (lesson) {
        setCurrentLesson(lesson);
        setActiveLabIndex(0);
        const labs = lesson.labScenarios && lesson.labScenarios.length > 0 ? lesson.labScenarios : [firstRepositoryScenario];
        const newRunner = new ScenarioRunner(labs[0]);
        setRunner(newRunner);
        setGitState(newRunner.getEngine().getState());
        const val = newRunner.validate();
        setChecklist(val.checklist);
        setAllPassed(val.passed);
        setTerminalEntries([
          {
            id: `term-init-${Date.now()}`,
            command: `# Bắt đầu bài học: ${lesson.metadata.title}`,
            stdout: '',
            stderr: '',
            exitCode: 0,
          },
        ]);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Check if a lesson can be accessed based on prerequisites
  const canAccessLesson = useCallback(
    (lessonItem: ManifestLessonItem): boolean => {
      return prerequisiteEngine.isAccessible(lessonItem, courseProgress);
    },
    [courseProgress]
  );

  // Get detailed breakdown of prerequisites for tooltips
  const getPrerequisiteBreakdown = useCallback(
    (lessonItem: ManifestLessonItem) => {
      return (lessonItem.prerequisites || []).map((reqId) => {
        const isDone = courseProgress.lessons[reqId]?.completed ?? false;
        return {
          id: reqId,
          title: reqId,
          completed: isDone,
        };
      });
    },
    [courseProgress]
  );

  // Navigate to another lesson
  const handleSelectLesson = useCallback((modId: string, lesId: string) => {
    window.location.hash = `#/learn/${modId}/${lesId}`;
  }, []);

  // Update & evaluate lesson completion
  const checkAndSaveCompletion = useCallback(
    async (updatedFields: { theoryViewed?: boolean; labCompleted?: string; quizScore?: number; earnedXp?: number }) => {
      if (!currentLesson) return;

      const currentLp = courseProgress.lessons[currentLesson.id] || {
        lessonId: currentLesson.id,
        completed: false,
        theoryViewed: false,
        quizScore: 0,
        labsCompleted: [],
        xp: 0,
      };

      const labsCompleted = updatedFields.labCompleted
        ? Array.from(new Set([...currentLp.labsCompleted, updatedFields.labCompleted]))
        : currentLp.labsCompleted;

      const nextLp = {
        ...currentLp,
        theoryViewed: updatedFields.theoryViewed ?? currentLp.theoryViewed,
        labsCompleted,
        quizScore: updatedFields.quizScore !== undefined ? updatedFields.quizScore : currentLp.quizScore,
        xp: currentLp.xp + (updatedFields.earnedXp || 0),
        lastAttemptAt: Date.now(),
      };

      // Check if newly completed
      const rule = currentLesson.metadata.completion;
      const isComplete = completionEngine.isLessonCompleted(rule, nextLp);
      nextLp.completed = isComplete;

      // Save lesson progress
      await progressRepo.saveLessonProgress(nextLp);

      // Refresh course progress
      const refreshed = await progressRepo.getCourseProgress();
      setCourseProgress(refreshed);
    },
    [currentLesson, courseProgress]
  );

  // When user views theory
  const handleTheoryViewed = useCallback(() => {
    checkAndSaveCompletion({ theoryViewed: true });
  }, [checkAndSaveCompletion]);

  // When user passes quiz
  const handleQuizPass = useCallback(
    (score: number, earnedXp: number) => {
      checkAndSaveCompletion({ quizScore: score, earnedXp });
    },
    [checkAndSaveCompletion]
  );

  // Switch active lab within current lesson
  const handleSelectLab = useCallback(
    (labIndex: number) => {
      if (labIndex < 0 || labIndex >= activeScenarios.length) return;
      setActiveLabIndex(labIndex);
      const nextScenario = activeScenarios[labIndex];
      const newRunner = new ScenarioRunner(nextScenario);
      setRunner(newRunner);
      setGitState(newRunner.getEngine().getState());
      const val = newRunner.validate();
      setChecklist(val.checklist);
      setAllPassed(val.passed);
      setTerminalEntries((prev) => [
        ...prev,
        {
          id: `term-lab-${Date.now()}`,
          command: `# Chuyển sang: ${nextScenario.title}`,
          stdout: '',
          stderr: '',
          exitCode: 0,
        },
      ]);
    },
    [activeScenarios]
  );

  // Execute terminal command
  const handleExecuteCommand = useCallback(
    (commandLine: string) => {
      const { commandResult, validation } = runner.execute(commandLine);

      const newEntry: TerminalEntry = {
        id: `term-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        command: commandLine,
        stdout: commandResult.stdout,
        stderr: commandResult.stderr,
        exitCode: commandResult.exitCode,
      };

      setTerminalEntries((prev) => [...prev, newEntry]);
      const nextState = runner.getEngine().getState();
      setGitState(nextState);
      setChecklist(validation.checklist);

      // Trigger 3-Stage Visualizer Animation on git add / git commit
      if (commandResult.success) {
        if (commandLine.trim().startsWith('git add')) {
          setActiveAnimation('add');
          setTimeout(() => setActiveAnimation(null), 1500);
        } else if (commandLine.trim().startsWith('git commit')) {
          setActiveAnimation('commit');
          setTimeout(() => setActiveAnimation(null), 1500);
        }
      }

      // Check achievements
      const newlyUnlocked = achievementEngine.checkAll(nextState, courseProgress.achievements);
      for (const ach of newlyUnlocked) {
        progressRepo.addAchievement(ach.id, ach.xp).then((p) => setCourseProgress(p));
      }

      // If passed lab
      if (validation.passed && !allPassed) {
        setAllPassed(true);
        checkAndSaveCompletion({
          labCompleted: currentScenario.id,
          earnedXp: validation.earnedXp,
        });
      }
    },
    [runner, allPassed, currentScenario, courseProgress, checkAndSaveCompletion]
  );

  // PR handlers (G4, G5, G6)
  const handleMergePR = useCallback(() => {
    const mergeRes = runner.execute('git merge feature/profile');
    const nextState = runner.getEngine().getState();
    setGitState(nextState);
    setSimPR((prev: any) => ({
      ...prev,
      status: 'merged',
      mergedAt: Date.now(),
    }));
    setTerminalEntries((prev) => [
      ...prev,
      {
        id: `term-pr-merge-${Date.now()}`,
        command: '# GitHub Pull Request #1 đã được hợp nhất thành công!',
        stdout: mergeRes.commandResult.stdout || 'Merge made by the 3-way strategy.',
        stderr: '',
        exitCode: 0,
      },
    ]);
  }, [runner]);

  const handleAddPRReview = useCallback((type: 'comment' | 'approve' | 'request_changes', body: string) => {
    const newRev: PRReviewItem = {
      id: Date.now(),
      author: 'Student-Reviewer',
      type,
      body,
      timestamp: Date.now(),
    };
    setSimPR((prev: any) => ({
      ...prev,
      reviews: [...prev.reviews, newRev],
    }));
  }, []);

  // Reset lab completely: VFS, commits, branches, HEAD, index, reflog, terminal, validation
  const handleResetLab = useCallback(() => {
    runner.reset();
    setGitState(runner.getEngine().getState());
    const val = runner.validate();
    setChecklist(val.checklist);
    setAllPassed(false);
    setTerminalEntries([
      {
        id: `term-reset-${Date.now()}`,
        command: '# Lab đã được thiết lập lại hoàn toàn về trạng thái ban đầu.',
        stdout: '',
        stderr: '',
        exitCode: 0,
      },
    ]);
  }, [runner]);

  // VFS file edit in editor
  const handleSaveFile = useCallback(
    (path: string, content: string) => {
      runner.getEngine().getFileSystem().writeFile(path, content);
      const nextState = runner.getEngine().getState();
      setGitState(nextState);

      const val = runner.validate();
      setChecklist(val.checklist);

      if (val.passed && !allPassed) {
        setAllPassed(true);
        checkAndSaveCompletion({
          labCompleted: currentScenario.id,
          earnedXp: val.earnedXp,
        });
      }
    },
    [runner, allPassed, currentScenario, checkAndSaveCompletion]
  );

  // VFS new file create
  const handleCreateFile = useCallback(
    (path: string) => {
      runner.getEngine().getFileSystem().writeFile(path, '');
      const nextState = runner.getEngine().getState();
      setGitState(nextState);
    },
    [runner]
  );

  const handleClearTerminal = useCallback(() => {
    setTerminalEntries([]);
  }, []);

  const handleHint = useCallback(() => {
    const hints = currentScenario.hints || [];
    const hintText = hints.join('\n');
    setTerminalEntries((prev) => [
      ...prev,
      {
        id: `term-hint-${Date.now()}`,
        command: 'hint',
        stdout: `\x1b[33m💡 GỢI Ý BƯỚC TIẾP THEO:\n${hintText || 'Hãy kiểm tra mục tiêu bài học ở khung bên trái!'}\x1b[0m`,
        stderr: '',
        exitCode: 0,
      },
    ]);
  }, [currentScenario]);

  const getSuggestions = useCallback(
    (input: string) => {
      return runner.getEngine().getSuggestions(input);
    },
    [runner]
  );

  const navigateHistoryUp = useCallback(
    (current: string) => {
      return runner.getEngine().getHistory().navigateUp(current);
    },
    [runner]
  );

  const navigateHistoryDown = useCallback(() => {
    return runner.getEngine().getHistory().navigateDown();
  }, [runner]);

  if (currentRoute === 'author') {
    return (
      <React.Suspense
        fallback={
          <div
            style={{
              display: 'flex',
              height: '100vh',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#0a0f1d',
              color: '#60a5fa',
              fontSize: '1.2rem',
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          >
            Đang tải Author Studio...
          </div>
        }
      >
        <AuthorPreviewPage />
      </React.Suspense>
    );
  }

  if (currentRoute === 'course-health') {
    return (
      <React.Suspense
        fallback={
          <div
            style={{
              display: 'flex',
              height: '100vh',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#0a0f1d',
              color: '#34d399',
              fontSize: '1.2rem',
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          >
            Đang tải Course Health Dashboard...
          </div>
        }
      >
        <CourseHealthDashboard />
      </React.Suspense>
    );
  }

  if (!manifest || !currentLesson) {
    return (
      <div
        style={{
          display: 'flex',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#030712',
          color: '#38bdf8',
          fontSize: '1.1rem',
          fontFamily: 'var(--font-sans)',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚡</div>
          <div>Đang khởi tạo Git Academy...</div>
        </div>
      </div>
    );
  }

  const completedLabIds = courseProgress.lessons[currentLesson.id]?.labsCompleted || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <Header
        xp={courseProgress.totalXp}
        level={courseProgress.level}
        streak={courseProgress.streakDays}
        activeLessonTitle={currentLesson.metadata.title}
        onResetLab={handleResetLab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCheatSheet={() => setIsCheatSheetOpen(true)}
        onOpenPullRequest={() => setIsPROpen(true)}
        studioView={studioView}
        onSelectStudioView={setStudioView}
        onExportProgress={handleExportProgress}
        onImportProgress={handleImportProgress}
        currentRoute={currentRoute}
        onNavigateRoute={(route) => setCurrentRoute(route)}
        currentUser={currentUser}
        onSwitchUserRole={handleSwitchUserRole}
      />

      {currentRoute === 'dashboard' ? (
        <React.Suspense
          fallback={
            <div style={{ padding: '32px', color: '#94a3b8', textAlign: 'center' }}>
              Đang tải Student Dashboard...
            </div>
          }
        >
          <StudentDashboard
            user={currentUser}
            onNavigateToLesson={(lessonId) => {
              setCurrentLessonId(lessonId);
              setCurrentRoute('learn');
            }}
            onSwitchView={(view) => setCurrentRoute(view as AppRoute)}
          />
        </React.Suspense>
      ) : currentRoute === 'teacher' ? (
        <React.Suspense
          fallback={
            <div style={{ padding: '32px', color: '#94a3b8', textAlign: 'center' }}>
              Đang tải Teacher Dashboard...
            </div>
          }
        >
          <TeacherDashboard
            user={currentUser}
            onSelectClass={(classroom) => {
              setSelectedClass(classroom);
              setCurrentRoute('class-dashboard');
            }}
          />
        </React.Suspense>
      ) : currentRoute === 'class-dashboard' && selectedClass ? (
        <React.Suspense
          fallback={
            <div style={{ padding: '32px', color: '#94a3b8', textAlign: 'center' }}>
              Đang tải Class Dashboard...
            </div>
          }
        >
          <ClassDashboard
            classroom={selectedClass}
            onBack={() => setCurrentRoute('teacher')}
          />
        </React.Suspense>
      ) : (
        <div className="main-layout" style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Curriculum Navigation Sidebar */}
          <Sidebar
            manifest={manifest}
            activeModuleId={currentModuleId}
            activeLessonId={currentLessonId}
            courseProgress={courseProgress}
            canAccessLesson={canAccessLesson}
            getPrerequisiteBreakdown={getPrerequisiteBreakdown}
            onSelectLesson={handleSelectLesson}
          />

          {/* Lesson Theory, Multi-Lab, Quiz, Achievements Panel */}
          <CourseErrorBoundary onReset={() => setActiveTab('theory')}>
            <LessonPanel
              lesson={currentLesson}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              scenarios={activeScenarios}
              activeLabIndex={activeLabIndex}
              completedLabIds={completedLabIds}
              checklist={checklist}
              allPassed={allPassed}
              onSelectLab={handleSelectLab}
              onResetLab={handleResetLab}
              onHint={handleHint}
              onRunTerminalCommand={handleExecuteCommand}
              onQuizPass={handleQuizPass}
              onTheoryViewed={handleTheoryViewed}
              unlockedAchievements={courseProgress.achievements}
            />
          </CourseErrorBoundary>

          {/* Interactive Studio: Project Explorer + Editor + Git Graph / 3-Stage / Internals / Actions + Terminal */}
          <div
            className="interactive-studio"
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              background: 'var(--bg-primary)',
              overflow: 'hidden',
            }}
          >
            <div
              className="top-studio-row"
              style={{
                display: 'flex',
                flex: 1,
                minHeight: '260px',
                borderBottom: '1px solid var(--border-subtle)',
                overflow: 'hidden',
              }}
            >
              {studioView !== 'actions' && (
                <FileExplorer
                  files={gitState.workingTree}
                  currentBranch={gitState.currentBranch}
                  onSaveFile={handleSaveFile}
                  onCreateFile={handleCreateFile}
                />
              )}

              <div style={{ flex: 1, minWidth: '320px', height: '100%', overflow: 'hidden' }}>
                <SimulatorErrorBoundary onResetEngine={handleResetLab}>
                  {studioView === 'three-stage' ? (
                    <React.Suspense fallback={<div style={{ padding: '16px', color: '#64748b' }}>Đang tải 3-Stage Visualizer...</div>}>
                      <ThreeStageVisualizer state={gitState} activeAnimation={activeAnimation} />
                    </React.Suspense>
                  ) : studioView === 'internals' ? (
                    <React.Suspense fallback={<div style={{ padding: '16px', color: '#64748b' }}>Đang tải Git Internals Inspector...</div>}>
                      <GitInternalsInspector />
                    </React.Suspense>
                  ) : studioView === 'actions' ? (
                    <WorkflowErrorBoundary onResetWorkflow={() => setWorkflowRun(null)}>
                      <React.Suspense fallback={<div style={{ padding: '16px', color: '#64748b' }}>Đang tải GitHub Actions Simulator...</div>}>
                        <div style={{ display: 'flex', height: '100%', width: '100%', overflow: 'hidden' }}>
                          <div style={{ width: '45%', borderRight: '1px solid var(--border-subtle)', height: '100%', overflow: 'hidden' }}>
                            <WorkflowEditor onRunWorkflow={handleRunWorkflow} />
                          </div>
                          <div style={{ flex: 1, height: '100%', overflow: 'hidden' }}>
                            {workflowRun ? (
                              <WorkflowRunView run={workflowRun} onRunUpdated={(updated) => setWorkflowRun(updated)} />
                            ) : (
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#64748b', padding: '16px', textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>⚡</div>
                                <p style={{ margin: 0, fontSize: '0.9rem' }}>
                                  Nhấn nút <strong>Run Workflow</strong> trong trình soạn thảo YAML để bắt đầu mô phỏng CI/CD.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </React.Suspense>
                    </WorkflowErrorBoundary>
                  ) : (
                    <GitGraphView state={gitState} />
                  )}
                </SimulatorErrorBoundary>
              </div>
            </div>

            <TerminalView
              entries={terminalEntries}
              currentBranch={gitState.currentBranch}
              onExecute={handleExecuteCommand}
              onClear={handleClearTerminal}
              onHint={handleHint}
              getSuggestions={getSuggestions}
              navigateHistoryUp={navigateHistoryUp}
              navigateHistoryDown={navigateHistoryDown}
            />
          </div>
        </div>
      )}

      {/* Global Modals */}
      <CourseSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigateToLesson={handleSelectLesson}
      />

      <CheatSheetModal
        isOpen={isCheatSheetOpen}
        onClose={() => setIsCheatSheetOpen(false)}
        onSelectCommand={handleExecuteCommand}
      />

      {isPROpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '24px',
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setIsPROpen(false)}
        >
          <div
            style={{
              width: '90%',
              maxWidth: '900px',
              height: '85vh',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <PullRequestView
              pr={simPR}
              fileDiffs={DEFAULT_PR_FILE_DIFFS}
              onMerge={handleMergePR}
              onAddReview={handleAddPRReview}
              onClose={() => setIsPROpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
