import React, { useEffect, useMemo, useState } from 'react';
import type { CourseLesson, CourseManifest, CourseProgress, GoalCheckItem, QuizQuestion, Scenario, User } from '@git-academy/shared';
import { BuiltinCourseRepository, LessonCompletionEngine, PrerequisiteEngine, QuizEngine, ScenarioRunner } from '@git-academy/exercise-engine';
import { buildLessonSlides, requiredLabsFor, type LearningSlide } from '../learning/lesson-flow';
import { validateGuidedLab } from '../learning/lab-validation';
import { GuidedPlumbingSession } from '../learning/plumbing-session';
import { findLastContentStageIndex } from '../utils/guided-course-progress';
import './guided-course.css';

const repository = new BuiltinCourseRepository();
const prerequisiteEngine = new PrerequisiteEngine();
const completionEngine = new LessonCompletionEngine();
const quizEngine = new QuizEngine();

const levelNames = ['Nền tảng', 'Lưu thay đổi', 'Nhánh', 'GitHub', 'Sửa sai', 'Làm nhóm', 'CI/CD', 'Bên trong Git'];
const levelIcons = ['▣', '▤', '⑂', '◉', '↶', '♣', '⚙', '◈'];
const levelOutcomes = [
  'Hiểu Git dùng để làm gì và tự tạo kho lưu đầu tiên.',
  'Biết tệp nào thay đổi, chọn đúng tệp và tạo commit.',
  'Làm tính năng trên nhánh riêng rồi hợp nhất an toàn.',
  'Đưa công việc lên GitHub và cộng tác qua Pull Request.',
  'Chọn đúng cách hoàn tác và khôi phục công việc.',
  'Làm việc cùng nhóm theo quy trình có review.',
  'Tạo pipeline kiểm tra tự động cho dự án.',
  'Giải thích Git lưu dữ liệu và tham chiếu ra sao.',
];

type Screen = 'map' | 'level' | 'lesson';
type Stage = { type: 'content'; slide: LearningSlide } | { type: 'lab'; scenario: Scenario; required: boolean } | { type: 'quiz'; question: QuizQuestion; questionIndex: number } | { type: 'complete' };
type TerminalLine = { command: string; output: string; error: boolean };

const LEGACY_PROGRESS_KEY = 'git_academy_permanent_progress';
const LEGACY_BACKUP_KEY = 'git_academy_permanent_progress_backup';

function initChromePersistence() {
  if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.persist) {
    navigator.storage.persist().catch(() => {});
  }
}

function progressKey(userId: string): string { return `git_academy_guided_progress_v1:${userId}`; }
function stepKey(userId: string, lessonId: string): string { return `git_academy_guided_step_v1:${userId}:${lessonId}`; }

function freshProgress(userId: string): CourseProgress {
  return { userId, totalXp: 0, level: 1, streakDays: 0, lessons: {}, achievements: [] };
}

function loadLocalProgress(userId = 'local_learner'): CourseProgress {
  try {
    // Read the older local-only keys first so existing learners keep their progress.
    const primary = localStorage.getItem(LEGACY_PROGRESS_KEY);
    if (primary) {
      const parsed = JSON.parse(primary);
      const candidate = (parsed.progress || parsed) as CourseProgress;
      if (candidate && candidate.lessons && typeof candidate.lessons === 'object') {
        return candidate;
      }
    }

    const backup = localStorage.getItem(LEGACY_BACKUP_KEY);
    if (backup) {
      const parsed = JSON.parse(backup);
      const candidate = (parsed.progress || parsed) as CourseProgress;
      if (candidate && candidate.lessons && typeof candidate.lessons === 'object') {
        return candidate;
      }
    }

    // 3. Check user-specific key
    const userSpecific = localStorage.getItem(progressKey(userId));
    if (userSpecific) {
      const parsed = JSON.parse(userSpecific) as CourseProgress;
      if (parsed && parsed.lessons && typeof parsed.lessons === 'object') {
        return parsed;
      }
    }

    // 4. Scan existing keys in localStorage to migrate any prior progress
    let bestCandidate: CourseProgress | null = null;
    let maxDone = -1;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      if (key.includes('progress') || key.includes('git_academy')) {
        try {
          const val = localStorage.getItem(key);
          if (!val) continue;
          const parsed = JSON.parse(val);
          const candidate = (parsed.progress || parsed) as CourseProgress;
          if (candidate && candidate.lessons && typeof candidate.lessons === 'object') {
            const doneCount = Object.values(candidate.lessons).filter((l: any) => l?.completed).length;
            if (doneCount > maxDone) {
              maxDone = doneCount;
              bestCandidate = candidate;
            }
          }
        } catch {}
      }
    }

    if (bestCandidate) {
      localStorage.setItem(LEGACY_PROGRESS_KEY, JSON.stringify(bestCandidate));
      localStorage.setItem(LEGACY_BACKUP_KEY, JSON.stringify(bestCandidate));
      return bestCandidate;
    }
  } catch (err) {
    console.warn('[Storage] Load failed, starting clean:', err);
  }

  return freshProgress(userId);
}

function saveLocalProgress(progress: CourseProgress, userId = 'local_learner') {
  try {
    const raw = JSON.stringify(progress);
    localStorage.setItem(LEGACY_PROGRESS_KEY, raw);
    localStorage.setItem(LEGACY_BACKUP_KEY, raw);
    localStorage.setItem('git_academy_progress', raw);
    localStorage.setItem(progressKey(userId), raw);
  } catch (err) {
    console.error('[Storage] Save failed:', err);
  }
}

function getNextLesson(manifest: CourseManifest, progress: CourseProgress) {
  for (let moduleIndex = 0; moduleIndex < manifest.curriculum.length; moduleIndex++) {
    const lesson = manifest.curriculum[moduleIndex].lessons.find((item) => !progress.lessons[item.id]?.completed);
    if (lesson) return { moduleIndex, lesson };
  }
  return null;
}

function displayLessonTitle(id: string, title: string): string {
  return id === '01-version-control' ? 'Vì sao cần lưu phiên bản?' : title;
}

function fileStatusLabel(status: string): string {
  const labels: Record<string, string> = { untracked: 'Tệp mới', modified: 'Đã sửa', added: 'Đã chọn', unmodified: 'Đã lưu', conflict: 'Xung đột', deleted: 'Đã xóa' };
  return labels[status] || status;
}

interface GuidedCourseProps { user?: User }

export const GuidedCourse: React.FC<GuidedCourseProps> = ({ user }) => {
  const currentUserId = user?.id || 'local_learner';
  const [manifest, setManifest] = useState<CourseManifest | null>(null);
  const [progress, setProgress] = useState<CourseProgress>(() => loadLocalProgress(currentUserId));
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');
  const [screen, setScreen] = useState<Screen>('map');
  const [levelIndex, setLevelIndex] = useState(0);
  const [showAllLessons, setShowAllLessons] = useState(false);
  const [lesson, setLesson] = useState<CourseLesson | null>(null);
  const [lessonError, setLessonError] = useState('');
  const [stageIndex, setStageIndex] = useState(0);
  const [introChoice, setIntroChoice] = useState<string | null>(null);
  const [practiceResponse, setPracticeResponse] = useState('');
  const [practiceCheckRevealed, setPracticeCheckRevealed] = useState(false);
  const [practiceHintShown, setPracticeHintShown] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [answer, setAnswer] = useState<number | number[] | string | string[] | null>(null);
  const [checked, setChecked] = useState<ReturnType<QuizEngine['evaluateQuestion']> | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, unknown>>({});
  const [quizResult, setQuizResult] = useState<ReturnType<QuizEngine['evaluateQuiz']> | null>(null);
  const [runner, setRunner] = useState<ScenarioRunner | null>(null);
  const [plumbingSession, setPlumbingSession] = useState<GuidedPlumbingSession | null>(null);
  const [validation, setValidation] = useState<{ passed: boolean; checklist: GoalCheckItem[] } | null>(null);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([]);
  const [successfulLabCommands, setSuccessfulLabCommands] = useState<string[]>([]);
  const [hintIndex, setHintIndex] = useState(0);
  const [filePath, setFilePath] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [newFilePath, setNewFilePath] = useState('');
  const [labMessage, setLabMessage] = useState('');

  useEffect(() => {
    initChromePersistence();
    repository.getManifest().then(setManifest);
  }, []);

  useEffect(() => {
    saveLocalProgress(progress, currentUserId);
  }, [progress, currentUserId]);

  useEffect(() => { window.scrollTo({ top: 0 }); }, [screen, stageIndex]);

  const slides = useMemo(() => lesson ? buildLessonSlides(lesson) : [], [lesson]);
  const requiredLabIds = lesson && manifest ? requiredLabsFor(manifest, levelIndex, lesson) : [];
  const stages = useMemo<Stage[]>(() => {
    if (!lesson) return [];
    const activeSlides = (levelIndex === 0 || lesson.moduleId === '01-foundations')
      ? slides.filter((slide) => slide.kind !== 'practice')
      : slides;
    return [
      ...activeSlides.map((slide): Stage => ({ type: 'content', slide })),
      ...(lesson.labScenarios || []).filter((scenario: Scenario) => lesson.id !== '01-version-control' || requiredLabIds.includes(scenario.id)).map((scenario: Scenario): Stage => ({ type: 'lab', scenario, required: requiredLabIds.includes(scenario.id) })),
      ...(lesson.quiz?.questions || []).map((question: QuizQuestion, questionIndex: number): Stage => ({ type: 'quiz', question, questionIndex })),
      { type: 'complete' },
    ];
  }, [lesson, slides, requiredLabIds.join('|'), levelIndex]);
  const stage = stages[stageIndex];
  const module = manifest?.curriculum[levelIndex];
  const next = manifest ? getNextLesson(manifest, progress) : null;
  const totalLessons = manifest?.curriculum.reduce((count, item) => count + item.lessons.length, 0) || 0;
  const completedLessons = Object.values(progress.lessons).filter((item) => item.completed).length;
  const firstQuizIndex = stages.findIndex((item) => item.type === 'quiz');
  const lastContentStageIndex = findLastContentStageIndex(stages);
  const currentLessonProgress = lesson ? progress.lessons[lesson.id] : undefined;
  const missingTheory = Boolean(lesson?.metadata.completion?.theoryViewed && !currentLessonProgress?.theoryViewed);
  const missingRequiredLabIndex = stages.findIndex((item) => item.type === 'lab' && item.required && !currentLessonProgress?.labsCompleted.includes(item.scenario.id));
  const completionRecovery = missingTheory
    ? { message: 'Hãy xem hết phần nội dung bắt buộc của bài.', stageIndex: Math.max(lastContentStageIndex, 0) }
    : missingRequiredLabIndex >= 0
      ? { message: 'Hãy hoàn thành bài thực hành bắt buộc.', stageIndex: missingRequiredLabIndex }
      : { message: 'Hãy hoàn thành các câu hỏi của bài.', stageIndex: firstQuizIndex };

  useEffect(() => {
    if (stage?.type !== 'lab') return;
    const nextRunner = new ScenarioRunner(stage.scenario);
    setRunner(nextRunner);
    setPlumbingSession(lesson?.moduleId === '08-git-internals' ? new GuidedPlumbingSession(nextRunner) : null);
    setValidation(validateGuidedLab(nextRunner, []));
    setTerminalLines([]);
    setSuccessfulLabCommands([]);
    setHintIndex(0);
    setFilePath('');
    setFileContent('');
    setNewFilePath('');
    setLabMessage('');
  }, [stageIndex, lesson?.id]);

  const saveLessonProgress = (lessonId: string, update: (current: CourseProgress['lessons'][string]) => CourseProgress['lessons'][string]) => {
    setProgress((previous) => {
      const current = previous.lessons[lessonId] || { lessonId, completed: false, theoryViewed: false, quizScore: 0, labsCompleted: [], xp: 0 };
      const updated = update(current);
      const xpGain = Math.max(0, updated.xp - current.xp);
      const totalXp = previous.totalXp + xpGain;
      const nextProgress: CourseProgress = {
        ...previous,
        totalXp,
        level: Math.floor(Math.sqrt(totalXp / 50)) + 1,
        lessons: { ...previous.lessons, [lessonId]: { ...updated, lastAttemptAt: Date.now() } },
      };
      saveLocalProgress(nextProgress, currentUserId);
      return nextProgress;
    });
    setSaveStatus('saving');
    setTimeout(() => setSaveStatus('saved'), 500);
  };


  const openLesson = async (moduleIndex: number, lessonId: string) => {
    if (!manifest) return;
    const target = manifest.curriculum[moduleIndex]?.lessons.find((item) => item.id === lessonId);
    if (!target || !prerequisiteEngine.isAccessible(target, progress)) return;
    setScreen('lesson');
    setLesson(null);
    setLessonError('');
    let loaded: CourseLesson | null;
    try {
      loaded = await repository.getLesson(manifest.curriculum[moduleIndex].id, lessonId);
    } catch {
      setLessonError('Chưa tải được bài học. Hãy thử lại.');
      return;
    }
    if (!loaded) {
      setLessonError('Chưa tải được bài học. Hãy thử lại.');
      return;
    }
    setLesson(loaded);
    setLevelIndex(moduleIndex);
    setScreen('lesson');
    const visibleLabCount = loaded.id === '01-version-control' ? 0 : (loaded.labScenarios?.length || 0);
    const activeLoadedSlides = (moduleIndex === 0 || loaded.moduleId === '01-foundations')
      ? buildLessonSlides(loaded).filter((slide) => slide.kind !== 'practice')
      : buildLessonSlides(loaded);
    const stageCount = activeLoadedSlides.length + visibleLabCount + (loaded.quiz?.questions?.length || 0) + 1;
    const savedStage = Math.max(0, Math.min(Number(localStorage.getItem(stepKey(currentUserId, lessonId))) || 0, stageCount - 2));
    const slideCount = activeLoadedSlides.length;
    const firstQuestion = slideCount + visibleLabCount;
    const loadedRequiredLabIds = requiredLabsFor(manifest, moduleIndex, loaded);
    const pendingRequiredLab = (loaded.labScenarios || []).findIndex((scenario) => loadedRequiredLabIds.includes(scenario.id) && !progress.lessons[lessonId]?.labsCompleted.includes(scenario.id));
    const safeStage = !progress.lessons[lessonId]?.theoryViewed && savedStage >= firstQuestion
      ? 0
      : pendingRequiredLab >= 0 && savedStage > slideCount + pendingRequiredLab
      ? slideCount + pendingRequiredLab
      : savedStage >= firstQuestion ? firstQuestion : savedStage;
    setStageIndex(safeStage);
    setIntroChoice(null);
    setPracticeResponse('');
    setPracticeCheckRevealed(false);
    setPracticeHintShown(false);
    setShowDetail(false);
    setQuizAnswers({});
    setQuizResult(null);
    setChecked(null);
    setAnswer(null);
    window.location.hash = `#/learn/${manifest.curriculum[moduleIndex].id}/${lessonId}`;
  };

  const goToStage = (index: number) => {
    if (!lesson || index < 0 || index >= stages.length) return;
    setStageIndex(index);
    setChecked(null);
    setShowDetail(false);
    setPracticeResponse('');
    setPracticeCheckRevealed(false);
    setPracticeHintShown(false);
    const nextStage = stages[index];
    setAnswer(nextStage.type === 'quiz' && nextStage.question.type === 'command_order'
      ? nextStage.question.options.map((option) => option.text)
      : null);
    localStorage.setItem(stepKey(currentUserId, lesson.id), String(index));
  };

  const advanceContent = () => {
    if (!lesson || stage?.type !== 'content') return;
    if (stage.slide.kind === 'practice' && !practiceCheckRevealed) return;
    if (stageIndex === lastContentStageIndex) {
      saveLessonProgress(lesson.id, (current) => ({ ...current, theoryViewed: true }));
    }
    goToStage(stageIndex + 1);
  };

  const updateLabValidation = (nextRunner: ScenarioRunner, message = '', commands = successfulLabCommands) => {
    const result = validateGuidedLab(nextRunner, commands);
    setValidation(result);
    setLabMessage(message || (result.passed ? 'Đúng rồi. Trạng thái dự án đã đạt mục tiêu của lab.' : 'Chưa đạt đủ mục tiêu. Xem các mục bên dưới rồi thử tiếp.'));
    if (result.passed && lesson && stage?.type === 'lab') {
      saveLessonProgress(lesson.id, (current) => ({
        ...current,
        labsCompleted: Array.from(new Set([...current.labsCompleted, stage.scenario.id])),
      }));
    }
  };

  const runCommand = () => {
    if (!runner || !terminalInput.trim()) return;
    const command = terminalInput.trim();
    const commandResult = plumbingSession ? plumbingSession.execute(command) : runner.execute(command).commandResult;
    const practicedCommand = 'practicedCommand' in commandResult ? commandResult.practicedCommand : command;
    setTerminalLines((previous) => [...previous, { command, output: commandResult.stdout || commandResult.stderr || '(Không có đầu ra)', error: !commandResult.success }]);
    setTerminalInput('');
    const commands = commandResult.success ? [...successfulLabCommands, practicedCommand] : successfulLabCommands;
    if (commandResult.success) setSuccessfulLabCommands(commands);
    updateLabValidation(runner, commandResult.success ? '' : commandResult.stderr, commands);
  };

  const openFile = (path: string) => {
    const selected = runner?.getEngine().getState().workingTree.find((item) => item.path === path);
    if (!selected) return;
    setFilePath(path);
    setFileContent(selected.content);
  };

  const saveFile = (path: string, content: string) => {
    if (!runner || !path.trim()) return;
    runner.getEngine().getFileSystem().writeFile(path.trim(), content);
    plumbingSession?.writeFile(path.trim(), content);
    setFilePath(path.trim());
    setFileContent(content);
    setNewFilePath('');
    updateLabValidation(runner);
  };

  const checkQuestion = () => {
    if (stage?.type !== 'quiz' || answer === null) return;
    const result = quizEngine.evaluateQuestion(stage.question, answer);
    setChecked(result);
    setQuizAnswers((previous) => ({ ...previous, [stage.question.id]: answer }));
  };

  const finishQuestion = () => {
    if (!lesson?.quiz || stage?.type !== 'quiz' || !checked) return;
    const updatedAnswers = { ...quizAnswers, [stage.question.id]: answer };
    if (stage.questionIndex < lesson.quiz.questions.length - 1) {
      goToStage(stageIndex + 1);
      return;
    }
    const result = quizEngine.evaluateQuiz(lesson.quiz, updatedAnswers);
    setQuizResult(result);
    if (result.passed) {
      saveLessonProgress(lesson.id, (current) => {
        const nextProgress = {
          ...current,
          quizScore: Math.max(current.quizScore, result.score),
          quizAttempts: (current.quizAttempts || 0) + 1,
        };
        const allRequiredLabsDone = requiredLabIds.every((id) => nextProgress.labsCompleted.includes(id));
        const completed = completionEngine.isLessonCompleted(lesson.metadata.completion, nextProgress) && allRequiredLabsDone;
        if (completed) {
          // Anonymous learners keep progress in this browser; no account or server sync is required.
        }
        return { ...nextProgress, completed, xp: completed ? lesson.metadata.xp : current.xp };
      });
    } else {
      saveLessonProgress(lesson.id, (current) => ({ ...current, quizScore: Math.max(current.quizScore, result.score), quizAttempts: (current.quizAttempts || 0) + 1 }));
    }
    goToStage(stageIndex + 1);
  };

  const restartQuiz = () => {
    setQuizAnswers({});
    setQuizResult(null);
    goToStage(firstQuizIndex);
  };

  if (!manifest) return <div className="guided-loading">Đang mở hành trình học Git…</div>;

  return <div className="guided-app">
    <header className="guided-header">
      <button className="guided-brand" onClick={() => { setScreen('map'); window.location.hash = '#/course'; }} aria-label="Về bản đồ khóa học"><span className="guided-brand-mark">⑂</span><span>Git <b>Academy</b></span></button>
      <span className="guided-header-center">{screen === 'map' ? 'Hành trình học Git' : screen === 'level' ? `Level ${levelIndex + 1} · ${levelNames[levelIndex]}` : lesson ? displayLessonTitle(lesson.id, lesson.metadata.title) : ''}</span>
      <div className="guided-header-right">
        <span
          className="guided-sync-badge saved"
          title="Tiến độ được lưu tự động trong trình duyệt này. Xóa dữ liệu trình duyệt hoặc đổi thiết bị sẽ không mang theo tiến độ."
        >
          {saveStatus === 'saving' ? '↻ Đang lưu...' : '💾 Đã lưu trên máy'}
        </span>
        {screen === 'lesson' ? <span className="guided-progress-label">{stageIndex + 1} / {stages.length}</span> : <span className="guided-progress-label">{completedLessons} / {totalLessons} bài</span>}
        <span className="guided-header-progress"><i style={{ width: `${screen === 'lesson' ? ((stageIndex + 1) / stages.length) * 100 : totalLessons ? completedLessons / totalLessons * 100 : 0}%` }} /></span>
      </div>
    </header>

    {screen === 'map' && <main className="guided-map">
      <section className="guided-map-hero">
        <div><p className="guided-eyebrow">TỪ BƯỚC ĐẦU TIÊN ĐẾN DỰ ÁN THẬT</p><h1>Học Git <em>bằng cách làm</em></h1><p>Mỗi bài: xem ví dụ → tự làm → nhận phản hồi.</p></div>
        <div className="guided-hero-art" aria-hidden="true"><span>README.md</span><span className="guided-hero-arrow">→</span><span>●──●──●</span></div>
      </section>
      <section className="guided-feature-row">
        <div className="guided-next-card"><span className="guided-kicker">LEVEL {next ? next.moduleIndex + 1 : 8} · {next ? levelNames[next.moduleIndex] : 'HOÀN THÀNH'}</span><h2>{next ? `Bài tiếp theo: ${displayLessonTitle(next.lesson.id, next.lesson.title)}` : 'Bạn đã hoàn thành khóa học'}</h2><p>{next ? `${next.lesson.duration} phút · học theo từng màn` : 'Bạn có thể xem lại bất kỳ bài nào.'}</p>{next && <button className="guided-primary" onClick={() => openLesson(next.moduleIndex, next.lesson.id)}>▶ &nbsp;{completedLessons ? 'Tiếp tục học' : 'Bắt đầu học'}</button>}</div>
        <div className="guided-outcome-card"><p className="guided-kicker">HÔM NAY BẠN SẼ LÀM ĐƯỢC</p><h3>{next?.lesson.id === '01-version-control' ? 'Nhận ra khi nào cần một mốc lưu rõ ràng.' : next ? levelOutcomes[next.moduleIndex] : 'Áp dụng Git vào dự án của riêng bạn.'}</h3><p className="guided-outcome-note">Đi từng bài nhỏ. Khi cần, bạn luôn có thể xem lại và thử lại.</p></div>
      </section>
      <div className="guided-section-heading"><h2>8 level, một đường đi rõ ràng</h2><p>Chọn level để xem bài học và kết quả cần đạt.</p></div>
      <section className="guided-level-grid">{manifest.curriculum.map((item, index) => {
        const done = item.lessons.filter((entry) => progress.lessons[entry.id]?.completed).length;
        const available = index === 0 || manifest.curriculum[index - 1].lessons.every((entry) => progress.lessons[entry.id]?.completed);
        return <button key={item.id} className={`guided-level-card ${available ? 'available' : 'locked'} ${done === item.lessons.length ? 'finished' : ''}`} onClick={() => { setLevelIndex(index); setShowAllLessons(false); setScreen('level'); }}><span className="guided-level-number">{index + 1}</span><span className="guided-level-icon">{levelIcons[index]}</span><strong>{levelNames[index]}</strong><small>{done} / {item.lessons.length} bài {available ? '' : '· Xem trước'}</small></button>;
      })}</section>
    </main>}

    {screen === 'level' && module && <main className="guided-level-page">
      <button className="guided-back" onClick={() => setScreen('map')}>← Bản đồ khóa học</button>
      <section className="guided-level-intro"><div><p className="guided-eyebrow">LEVEL {levelIndex + 1} / 8</p><h1>{levelNames[levelIndex]}</h1><h2>{levelOutcomes[levelIndex]}</h2><div className="guided-level-meter"><span><i style={{ width: `${module.lessons.filter((item) => progress.lessons[item.id]?.completed).length / module.lessons.length * 100}%` }} /></span><b>{module.lessons.filter((item) => progress.lessons[item.id]?.completed).length} / {module.lessons.length} bài</b></div></div><aside><span>⚑</span><p>Sau level này, bạn sẽ tự mình thực hiện được một nhiệm vụ Git rõ ràng.</p></aside></section>
      <div className="guided-section-heading"><h2>Các bài học</h2><p>Bắt đầu từ bài sáng màu. Bài sau mở khi bạn hoàn thành bài trước.</p></div>
      <div className="guided-lesson-list">{module.lessons.slice(0, showAllLessons ? undefined : 3).map((item, index) => {
        const accessible = prerequisiteEngine.isAccessible(item, progress);
        const done = progress.lessons[item.id]?.completed;
        return <article className={`guided-lesson-card ${accessible ? 'accessible' : 'locked'}`} key={item.id}><div className="guided-lesson-index">{done ? '✓' : index + 1}</div><div className="guided-lesson-icon">{index === 0 ? '◷' : index % 2 ? '▣' : '⑂'}</div><div className="guided-lesson-copy"><span>BÀI {index + 1} · {item.duration} PHÚT</span><h3>{displayLessonTitle(item.id, item.title)}</h3><p>{done ? 'Đã hoàn thành · có thể học lại' : accessible ? 'Xem từng màn, làm bài tập và nhận phản hồi.' : 'Hoàn thành bài trước để mở khóa.'}</p></div><button disabled={!accessible} className={accessible ? 'guided-primary' : 'guided-locked-button'} onClick={() => openLesson(levelIndex, item.id)}>{done ? 'Xem lại' : accessible ? 'Bắt đầu bài này →' : 'Khóa'}</button></article>;
      })}</div>
      {module.lessons.length > 3 && <button className="guided-show-all" onClick={() => setShowAllLessons(!showAllLessons)}>{showAllLessons ? 'Thu gọn' : `Xem toàn bộ ${module.lessons.length} bài`} <span>{showAllLessons ? '↑' : '↓'}</span></button>}
    </main>}

    {screen === 'lesson' && !lesson && <main className="guided-level-page"><button className="guided-back" onClick={() => setScreen('level')}>← Danh sách bài</button><p>{lessonError || 'Đang mở bài học…'}</p></main>}

    {screen === 'lesson' && lesson && stage && <main className="guided-lesson-page">
      <nav className="guided-lesson-nav"><button className="guided-back" onClick={() => setScreen('level')}>← Danh sách bài</button><span>LEVEL {levelIndex + 1} · BÀI {module?.lessons.findIndex((item) => item.id === lesson.id)! + 1}</span><div className="guided-slide-dots" aria-label={`Màn ${stageIndex + 1} trên ${stages.length}`}>{stages.map((item, index) => <i key={index} className={index <= stageIndex ? 'active' : ''} />)}</div></nav>
      <section className={`guided-slide guided-slide-${stage.type} ${stage.type === 'content' ? `guided-slide-${stage.slide.kind}` : ''}`}>
        {stage.type === 'content' && <>
          <div className="guided-slide-copy">
            <span className="guided-kicker">{stage.slide.kind === 'intro' ? 'BẮT ĐẦU BÀI HỌC' : stage.slide.kind === 'story' ? 'TÌNH HUỐNG' : stage.slide.kind === 'term' ? 'THUẬT NGỮ · HỌC TỪNG TỪ' : stage.slide.kind === 'command' ? 'XEM MẪU' : stage.slide.kind === 'summary' ? 'GHI NHỚ' : 'MỖI MÀN MỘT Ý'}</span>
            <h1>{stage.slide.kind === 'intro' && lesson.id === '01-version-control' ? 'Vì sao cần lưu phiên bản?' : stage.slide.title}</h1>
            <p>{stage.slide.kind === 'intro' && lesson.id === '01-version-control' ? 'Tên file “final” chưa cho bạn biết bản nào còn chạy tốt. Hãy thử chọn trước khi học cách Git giải quyết chuyện này.' : stage.slide.body}</p>
            {stage.slide.kind === 'term' && (stage.slide.termExample || stage.slide.termContrast) && <div className="guided-term-notes">
              {stage.slide.termExample && <section><strong>Ví dụ dễ hình dung</strong><p>{stage.slide.termExample}</p></section>}
              {stage.slide.termContrast && <section><strong>Đừng nhầm với</strong><p>{stage.slide.termContrast}</p></section>}
            </div>}
            {stage.slide.kind === 'practice' && <div className="guided-practice">
              {!!stage.slide.practiceSteps?.length && <ol>{stage.slide.practiceSteps.map((step, index) => <li key={index}>{step}</li>)}</ol>}
              <label htmlFor="guided-practice-response">Viết ngắn gọn cách bạn sẽ làm hoặc điều bạn hiểu:</label>
              <textarea id="guided-practice-response" value={practiceResponse} onChange={(event) => setPracticeResponse(event.target.value)} placeholder="Gõ câu trả lời của bạn trước khi xem tiêu chí…" />
              {stage.slide.practiceHint && <button className="guided-practice-hint" onClick={() => setPracticeHintShown(!practiceHintShown)}>{practiceHintShown ? 'Ẩn gợi ý' : 'Xem gợi ý'}</button>}
              {practiceHintShown && stage.slide.practiceHint && <p className="guided-practice-hint-text">{stage.slide.practiceHint}</p>}
              <button className="guided-practice-check-button" onClick={() => setPracticeCheckRevealed(true)} disabled={!practiceResponse.trim()}>Tôi đã thử — cho xem tiêu chí</button>
              {practiceCheckRevealed && <section className="guided-practice-check"><strong>Tiêu chí tự kiểm tra</strong><p>{stage.slide.practiceCheck || 'Bạn có thể giải thích được kết quả bằng lời của mình.'}</p></section>}
              <small>Bài này không chấm tự động. Hãy đối chiếu câu trả lời với tiêu chí trước khi tiếp tục.</small>
            </div>}
            {stage.slide.code && <pre className="guided-code-sample">{stage.slide.code}</pre>}
            {stage.slide.detail && <div className="guided-detail"><button onClick={() => setShowDetail(!showDetail)}>{showDetail ? 'Thu gọn' : 'Xem giải thích đầy đủ'} {showDetail ? '↑' : '↓'}</button>{showDetail && <p>{stage.slide.detail}</p>}</div>}
          </div>
          {stage.slide.kind === 'intro' && lesson.id === '01-version-control' ? <div className="guided-hook"><div className="guided-file-pair"><div>▤<strong>project-final</strong></div><span>⇢</span><div>▤<strong>project-final-v2</strong></div></div><h2>Nếu sửa hỏng hôm nay, bạn quay lại bản nào?</h2><div className="guided-choice-list">{['Bản cũ', 'Bản mới', 'Không chắc'].map((choice) => <button key={choice} onClick={() => setIntroChoice(choice)} className={introChoice === choice ? 'selected' : ''}>{choice}</button>)}</div>{introChoice && <p className="guided-soft-feedback">Tên file không cho biết bản nào còn chạy tốt. Hãy xem cách Git ghi lại những mốc rõ ràng.</p>}</div> : <div className="guided-concept-art" aria-hidden="true"><div className="guided-art-file">▤<small>Bản đầu</small></div><span className="guided-art-line" /><div className="guided-art-file featured">▤<small>Thay đổi</small></div><span className="guided-art-line" /><div className="guided-art-file">▤<small>Mốc mới</small></div></div>}
          <div className="guided-slide-footer"><button className="guided-secondary" onClick={() => goToStage(stageIndex - 1)} disabled={stageIndex === 0}>← Xem lại</button><span>{stageIndex + 1} / {stages.length}</span><button className="guided-primary" onClick={advanceContent} disabled={stage.slide.kind === 'intro' && lesson.id === '01-version-control' && !introChoice}>Tiếp tục →</button></div>
        </>}

        {stage.type === 'lab' && <><div className="guided-lab-instruction"><span className="guided-kicker">{stage.required ? 'THỰC HÀNH BẮT BUỘC' : 'THỬ THÊM TRONG DỰ ÁN'}</span><h1>Đến lượt bạn</h1><h2>{stage.scenario.title}</h2><p>{stage.scenario.description}</p><div className="guided-lab-checklist">{validation?.checklist.map((item) => <div key={item.id} className={item.passed ? 'passed' : ''}><span>{item.passed ? '✓' : '○'}</span>{item.description}</div>)}</div>{labMessage && <div className={`guided-lab-message ${validation?.passed ? 'passed' : ''}`}>{labMessage}</div>}<button className="guided-hint" onClick={() => setHintIndex(Math.min(hintIndex + 1, stage.scenario.hints.length))}>♧ Cần gợi ý?</button>{hintIndex > 0 && <p className="guided-hint-text">{stage.scenario.hints[hintIndex - 1]}</p>}</div><div className="guided-lab-workspace"><div className="guided-mini-files"><b>Dự án của bạn</b>{runner?.getEngine().getState().workingTree.map((file) => <button key={file.path} onClick={() => openFile(file.path)} className={filePath === file.path ? 'active' : ''}>▤ <span>{file.path}</span><small>{fileStatusLabel(file.status)}</small></button>)}<div className="guided-new-file"><input value={newFilePath} onChange={(event) => setNewFilePath(event.target.value)} placeholder="Tên tệp mới" aria-label="Tên tệp mới"/><button onClick={() => saveFile(newFilePath, '')} disabled={!newFilePath.trim()}>Tạo</button></div></div>{filePath && <div className="guided-mini-editor"><div><b>{filePath}</b><button onClick={() => saveFile(filePath, fileContent)}>Lưu tệp</button></div><textarea value={fileContent} onChange={(event) => setFileContent(event.target.value)} aria-label={`Nội dung tệp ${filePath}`} /></div>}<div className="guided-mini-terminal"><div className="guided-terminal-head"><span>● ● ●</span> TERMINAL MÔ PHỎNG</div><div className="guided-terminal-output">{terminalLines.map((line, index) => <div key={index}><b>$ {line.command}</b><pre className={line.error ? 'error' : ''}>{line.output}</pre></div>)}</div><form onSubmit={(event) => { event.preventDefault(); runCommand(); }}><span>$</span><input value={terminalInput} onChange={(event) => setTerminalInput(event.target.value)} placeholder="Nhập lệnh Git rồi nhấn Enter" aria-label="Nhập lệnh Git"/><button type="submit">Chạy ↵</button></form></div></div><div className="guided-slide-footer"><button className="guided-secondary" onClick={() => goToStage(stageIndex - 1)}>← Xem lại</button><span>{stageIndex + 1} / {stages.length}</span><button className="guided-primary" onClick={() => goToStage(stageIndex + 1)} disabled={stage.required && !currentLessonProgress?.labsCompleted.includes(stage.scenario.id) && !validation?.passed}>{stage.required ? 'Hoàn thành bước này →' : validation?.passed ? 'Tiếp tục →' : 'Để sau →'}</button></div></>}

        {stage.type === 'quiz' && <><div className="guided-quiz"><span className="guided-kicker">TỰ LÀM · CÂU {stage.questionIndex + 1} / {lesson.quiz.questions.length}</span><h1>{stage.question.question}</h1>{stage.question.type === 'fill_command' ? <input className="guided-answer-input" value={typeof answer === 'string' ? answer : ''} onChange={(event) => setAnswer(event.target.value)} placeholder="Tự viết lệnh ở đây" disabled={!!checked} /> : stage.question.type === 'command_order' ? <div className="guided-order-list">{(Array.isArray(answer) && typeof answer[0] === 'string' ? answer as string[] : stage.question.options.map((option) => option.text)).map((line, index, order) => <div key={`${line}-${index}`}><code>{line}</code><button disabled={!!checked || index === 0} onClick={() => { const copy = [...order]; [copy[index - 1], copy[index]] = [copy[index], copy[index - 1]]; setAnswer(copy); }}>↑</button><button disabled={!!checked || index === order.length - 1} onClick={() => { const copy = [...order]; [copy[index + 1], copy[index]] = [copy[index], copy[index + 1]]; setAnswer(copy); }}>↓</button></div>)}</div> : <div className="guided-choice-list">{stage.question.options.map((option, index) => <button key={index} disabled={!!checked} className={answer === index || Array.isArray(answer) && answer.some((entry) => entry === index) ? 'selected' : ''} onClick={() => setAnswer(stage.question.type === 'multiple' || stage.question.type === 'multiple_choice' ? Array.isArray(answer) && typeof answer[0] === 'number' ? (answer as number[]).includes(index) ? (answer as number[]).filter((number) => number !== index) : [...answer as number[], index] : [index] : index)}><span>{String.fromCharCode(65 + index)}</span>{option.text}</button>)}</div>}{checked && <div className={`guided-answer-feedback ${checked.isCorrect ? 'correct' : 'incorrect'}`}><strong>{checked.isCorrect ? 'Chính xác' : 'Chưa chính xác'}</strong><p>{checked.explanation}</p></div>}<div className="guided-quiz-actions">{!checked ? <button className="guided-primary" disabled={answer === null || Array.isArray(answer) && answer.length === 0 || answer === ''} onClick={checkQuestion}>Kiểm tra đáp án →</button> : <button className="guided-primary" onClick={finishQuestion}>{stage.questionIndex + 1 === lesson.quiz.questions.length ? 'Xem kết quả →' : 'Câu tiếp theo →'}</button>}</div></div><div className="guided-quiz-side"><div className="guided-quiz-ring">{stage.questionIndex + 1}<small>/{lesson.quiz.questions.length}</small></div><p>Hãy tự chọn trước khi xem giải thích. Sai cũng có thể thử lại.</p></div></>}

        {stage.type === 'complete' && <div className="guided-completion"><span className="guided-kicker">KẾT QUẢ BÀI HỌC</span>{quizResult && !quizResult.passed ? <><h1>Cần thử lại một lần nữa</h1><p>Bạn đạt {quizResult.score}%. Mục tiêu của bài là {lesson.metadata.completion?.quiz?.minimumScore || 75}%. Xem phần giải thích rồi tự làm lại.</p><button className="guided-primary" onClick={restartQuiz}>Làm lại câu hỏi →</button></> : currentLessonProgress?.completed ? <><div className="guided-completion-symbol">✓</div><h1>Bạn đã làm được.</h1><p>{lesson.metadata.title}</p><div className="guided-evidence"><span>✓ Đã học từng ý</span>{requiredLabIds.length > 0 && <span>✓ Đã hoàn thành thực hành</span>}<span>✓ Đã đạt bài kiểm tra</span></div><div className="guided-completion-actions">{next && next.lesson.id !== lesson.id ? <button className="guided-primary" onClick={() => openLesson(next.moduleIndex, next.lesson.id)}>Sang bài tiếp theo →</button> : <button className="guided-primary" onClick={() => setScreen('map')}>Về hành trình học →</button>}<button className="guided-secondary" onClick={() => goToStage(0)}>Xem lại bài</button></div></> : <><h1>Còn một bước để hoàn thành</h1><p>{completionRecovery.message}</p><button className="guided-primary" onClick={() => goToStage(completionRecovery.stageIndex)}>Quay lại bước cần làm →</button></>}</div>}
      </section>
    </main>}
  </div>;
};
