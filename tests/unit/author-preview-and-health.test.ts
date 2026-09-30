import { describe, it, expect } from 'vitest';
import {
  COURSE_MANIFEST,
  BUILTIN_LESSONS,
  COURSE_SEARCH_INDEX,
  CourseLesson,
} from '@git-academy/exercise-engine';

// Quality metrics calculation matching AuthorPreviewPage.tsx
export function calculateAuthorQualityMetrics(lesson: CourseLesson | null) {
  if (!lesson) return null;
  const text = lesson.content || '';

  const countWords = (str: string) => {
    if (!str) return 0;
    return str.trim().split(/\s+/).filter(Boolean).length;
  };

  const getSection = (titleRegex: RegExp) => {
    const match = text.match(titleRegex);
    return match && match[1] ? match[1].trim() : '';
  };

  const def = getSection(/##\s*📖\s*Định nghĩa[\s\S]*?>\s*(.*?)(?:\n\n|\n---|\n##)/i);
  const why = getSection(/##\s*🤔\s*Tại sao cần\?([\s\S]*?)(?:\n\n---|\n##)/i);
  const mm = getSection(/##\s*🧠\s*Mental Model[^\n]*\n([\s\S]*?)(?:\n\n---|\n##)/i);
  const ex = getSection(/##\s*🌎\s*Ví dụ thực tế\n([\s\S]*?)(?:\n\n---|\n##)/i);

  const placeholders = ['TODO', 'TBD', 'Coming soon', 'Lorem ipsum', '...'];
  const foundPlaceholders = placeholders.filter((p) => text.includes(p));

  const defWords = countWords(def);
  const whyWords = countWords(why);
  const mmWords = countWords(mm);
  const exWords = countWords(ex);
  const qCount = lesson.quiz?.questions?.length || 0;

  const isCore = [
    'commit',
    'branch',
    'merge',
    'conflict',
    'remote',
    'fetch',
    'pull',
    'push',
    'pull-request',
    'pr',
  ].some((t) => lesson.id.includes(t));
  const minQ = isCore ? 6 : 4;

  const passes =
    defWords >= 80 &&
    whyWords >= 80 &&
    mmWords >= 80 &&
    exWords >= 100 &&
    foundPlaceholders.length === 0 &&
    qCount >= minQ;

  return {
    defWords,
    whyWords,
    mmWords,
    exWords,
    foundPlaceholders,
    qCount,
    minQ,
    isCore,
    passes,
  };
}

describe('Author Preview & Course Health Comprehensive Suite', () => {
  const activeModules = COURSE_MANIFEST.curriculum.filter((m) => m.status !== 'coming_soon');
  const comingSoonModules = COURSE_MANIFEST.curriculum.filter((m) => m.status === 'coming_soon');
  const allActiveLessons = activeModules.flatMap((m) => m.lessons);

  // =========================================================================
  // 1. Course Health KPI Calculations & Architecture
  // =========================================================================
  describe('Course Health KPI Calculations', () => {
    it('contains exactly 8 curriculum modules in total', () => {
      expect(COURSE_MANIFEST.curriculum).toHaveLength(8);
    });

    it('has all 8 active modules in the curriculum', () => {
      expect(activeModules).toHaveLength(8);
      expect(comingSoonModules).toHaveLength(0);
    });

    it('matches exact lesson count requirements for every active level', () => {
      const countsByModule = Object.fromEntries(
        activeModules.map((m) => [m.id, m.lessons.length])
      );

      expect(countsByModule['01-foundations']).toBe(9);
      expect(countsByModule['02-git-basics']).toBe(12);
      expect(countsByModule['03-branching']).toBe(14);
      expect(countsByModule['04-github-collaboration']).toBe(16);
      expect(countsByModule['05-advanced-git']).toBe(22);
      expect(countsByModule['06-team-workflows']).toBe(15);
      expect(countsByModule['07-github-actions']).toBe(20);
      expect(countsByModule['08-git-internals']).toBe(20);
    });

    it('aggregates exactly 128 authored lessons across all active modules', () => {
      const totalAuthored = activeModules.reduce((acc, m) => acc + m.lessons.length, 0);
      expect(totalAuthored).toBe(128);
      expect(allActiveLessons).toHaveLength(128);
    });

    it('calculates total curriculum duration and ensures average lesson duration is healthy', () => {
      const totalDuration = allActiveLessons.reduce((acc, l) => acc + l.duration, 0);
      expect(totalDuration).toBeGreaterThan(1800); // More than 30 hours
      const avgDuration = totalDuration / allActiveLessons.length;
      expect(avgDuration).toBeGreaterThanOrEqual(15);
      expect(avgDuration).toBeLessThanOrEqual(45);
    });

    it('calculates total XP rewards for gamification', () => {
      const totalXP = allActiveLessons.reduce((acc, l) => acc + l.xp, 0);
      expect(totalXP).toBeGreaterThan(7000);
      for (const lesson of allActiveLessons) {
        expect(lesson.xp).toBeGreaterThanOrEqual(50);
        expect(lesson.xp).toBeLessThanOrEqual(500);
      }
    });

    it('ensures all lesson IDs across all modules are strictly unique', () => {
      const lessonIds = allActiveLessons.map((l) => l.id);
      const uniqueIds = new Set(lessonIds);
      expect(uniqueIds.size).toBe(lessonIds.length);
    });

    it('verifies search index coverage has >= 88 searchable entries', () => {
      expect(COURSE_SEARCH_INDEX.length).toBeGreaterThanOrEqual(88);
      for (const entry of COURSE_SEARCH_INDEX) {
        expect(entry.id).toBeDefined();
        expect(entry.title).toBeDefined();
        expect(entry.moduleId).toBeDefined();
        expect(entry.keywords.length).toBeGreaterThan(0);
      }
    });

    it('indexes key Git command terminology across the search index', () => {
      const allCommands = COURSE_SEARCH_INDEX.flatMap((e) => (e.commands || []).map((c) => c.toLowerCase()));
      expect(allCommands.length).toBeGreaterThan(50);
      const keyCommands = ['git --version', 'git init', 'git status'];
      for (const cmd of keyCommands) {
        expect(allCommands).toContain(cmd);
      }
    });
  });

  // =========================================================================
  // 2. Author Preview Quality Gate Metrics
  // =========================================================================
  describe('Author Preview Quality Gate Evaluation', () => {
    it('correctly calculates word count for arbitrary Vietnamese strings', () => {
      const metrics = calculateAuthorQualityMetrics({
        id: 'mock-test',
        title: 'Mock Lesson',
        content: `
## 📖 Định nghĩa
> Git là hệ thống quản lý phiên bản phân tán được thiết kế để xử lý mọi dự án với tốc độ và hiệu quả cao nhất trong thế giới lập trình chuyên nghiệp.

---

## 🤔 Tại sao cần?
Quản lý mã nguồn theo thời gian giúp các lập trình viên phối hợp làm việc nhịp nhàng và an toàn, tránh việc mất mát dữ liệu không đáng có.

---

## 🧠 Mental Model: Đồ thị commit
Mỗi commit là một snapshot trỏ về cha của nó tạo thành đồ thị có hướng không chu trình giúp khôi phục dữ liệu ở bất kỳ thời điểm nào.

---

## 🌎 Ví dụ thực tế
Trong dự án thực tế khi làm việc với 5 kỹ sư trên cùng một codebase lớn, việc phân tách nhánh độc lập giúp tính năng không bị xung đột.

---
        `,
        quiz: { questions: [] },
      } as any);

      expect(metrics).not.toBeNull();
      expect(metrics?.defWords).toBeGreaterThan(15);
      expect(metrics?.whyWords).toBeGreaterThan(15);
      expect(metrics?.mmWords).toBeGreaterThan(15);
      expect(metrics?.exWords).toBeGreaterThan(15);
    });

    it('detects prohibited placeholder tokens (TODO, TBD, Coming soon, Lorem ipsum, ...)', () => {
      const cleanMetrics = calculateAuthorQualityMetrics({
        id: 'clean-lesson',
        title: 'Clean',
        content: 'Hoàn toàn không có từ cấm trong bài học này.',
      } as any);
      expect(cleanMetrics?.foundPlaceholders).toEqual([]);

      const dirtyMetrics = calculateAuthorQualityMetrics({
        id: 'dirty-lesson',
        title: 'Dirty',
        content: 'Nội dung này có chứa TODO và TBD cùng với Lorem ipsum.',
      } as any);
      expect(dirtyMetrics?.foundPlaceholders).toContain('TODO');
      expect(dirtyMetrics?.foundPlaceholders).toContain('TBD');
      expect(dirtyMetrics?.foundPlaceholders).toContain('Lorem ipsum');
    });

    it('differentiates core vs non-core lessons for minimum quiz question thresholds', () => {
      const coreIds = ['06-git-commit', '01-branch-concept', '07-fast-forward-merge', '10-merge-conflict', '02-git-remote'];
      for (const cid of coreIds) {
        const m = calculateAuthorQualityMetrics({ id: cid, content: '' } as any);
        expect(m?.isCore).toBe(true);
        expect(m?.minQ).toBe(6);
      }

      const nonCoreIds = ['01-version-control', '02-vcs-types', '03-git-la-gi'];
      for (const ncid of nonCoreIds) {
        const m = calculateAuthorQualityMetrics({ id: ncid, content: '' } as any);
        expect(m?.isCore).toBe(false);
        expect(m?.minQ).toBe(4);
      }
    });

    it('evaluates all 128 authored lessons against the 4 section word count thresholds', () => {
      const failures: { id: string; metric: string; actual: number; required: number }[] = [];

      for (const lessonSummary of allActiveLessons) {
        const lesson = BUILTIN_LESSONS[lessonSummary.id];
        expect(lesson, `Lesson ${lessonSummary.id} not found in BUILTIN_LESSONS`).toBeDefined();

        const m = calculateAuthorQualityMetrics(lesson);
        if (!m) continue;

        if (m.defWords < 80) failures.push({ id: lessonSummary.id, metric: 'defWords', actual: m.defWords, required: 80 });
        if (m.whyWords < 80) failures.push({ id: lessonSummary.id, metric: 'whyWords', actual: m.whyWords, required: 80 });
        if (m.mmWords < 80) failures.push({ id: lessonSummary.id, metric: 'mmWords', actual: m.mmWords, required: 80 });
        if (m.exWords < 100) failures.push({ id: lessonSummary.id, metric: 'exWords', actual: m.exWords, required: 100 });
      }

      expect(failures).toEqual([]);
    });

    it('confirms 100% of authored lessons contain 0 prohibited placeholders', () => {
      const lessonsWithPlaceholders: { id: string; placeholders: string[] }[] = [];

      for (const lessonSummary of allActiveLessons) {
        const lesson = BUILTIN_LESSONS[lessonSummary.id];
        const m = calculateAuthorQualityMetrics(lesson);
        if (m && m.foundPlaceholders.length > 0) {
          lessonsWithPlaceholders.push({ id: lessonSummary.id, placeholders: m.foundPlaceholders });
        }
      }

      expect(lessonsWithPlaceholders).toEqual([]);
    });

    it('confirms 100% of authored lessons meet their required quiz question minimums', () => {
      const quizFailures: { id: string; actual: number; required: number }[] = [];

      for (const lessonSummary of allActiveLessons) {
        const lesson = BUILTIN_LESSONS[lessonSummary.id];
        const m = calculateAuthorQualityMetrics(lesson);
        if (m && m.qCount < m.minQ) {
          quizFailures.push({ id: lessonSummary.id, actual: m.qCount, required: m.minQ });
        }
      }

      expect(quizFailures).toEqual([]);
    });

    it('verifies every single authored lesson achieves 100% Quality Gate PASS', () => {
      let passCount = 0;
      for (const lessonSummary of allActiveLessons) {
        const lesson = BUILTIN_LESSONS[lessonSummary.id];
        const m = calculateAuthorQualityMetrics(lesson);
        if (m?.passes) passCount++;
      }

      expect(passCount).toBe(128);
    });
  });

  // =========================================================================
  // 3. Quiz & Interactive Lab Quality Checks
  // =========================================================================
  describe('Quiz and Lab Interactive Integrity', () => {
    it('ensures every quiz question has explanation and valid options', () => {
      for (const lessonSummary of allActiveLessons) {
        const lesson = BUILTIN_LESSONS[lessonSummary.id];
        if (!lesson || !lesson.quiz || !lesson.quiz.questions) continue;

        for (const [qIdx, q] of lesson.quiz.questions.entries()) {
          expect(q.question, `Question missing in ${lessonSummary.id} Q#${qIdx}`).toBeTruthy();
          expect(q.options.length, `Options count invalid in ${lessonSummary.id} Q#${qIdx}`).toBeGreaterThanOrEqual(3);
          const correctOpts = q.options.filter((opt) => opt.correct);
          expect(correctOpts.length, `Correct option missing in ${lessonSummary.id} Q#${qIdx}`).toBeGreaterThanOrEqual(1);
          expect(q.explanation, `Explanation missing in ${lessonSummary.id} Q#${qIdx}`).toBeTruthy();
        }
      }
    });

    it('ensures lab assignments are distributed across active curriculum lessons', () => {
      const lessonsWithLabs = allActiveLessons.filter((l) => l.labIds && l.labIds.length > 0);
      expect(lessonsWithLabs.length).toBe(76);
    });
  });

  // =========================================================================
  // 4. Curriculum Prerequisite DAG Integrity
  // =========================================================================
  describe('Curriculum Prerequisite Graph Integrity', () => {
    it('verifies that the prerequisite graph is a valid Directed Acyclic Graph (zero cycles)', () => {
      const graph: Record<string, string[]> = {};
      for (const lesson of allActiveLessons) {
        graph[lesson.id] = lesson.prerequisites || [];
      }

      const visited = new Set<string>();
      const visiting = new Set<string>();

      const checkCycle = (node: string): boolean => {
        if (visiting.has(node)) return true; // Cycle detected
        if (visited.has(node)) return false;

        visiting.add(node);
        const neighbors = graph[node] || [];
        for (const neighbor of neighbors) {
          if (checkCycle(neighbor)) return true;
        }
        visiting.delete(node);
        visited.add(node);
        return false;
      };

      for (const lessonId of Object.keys(graph)) {
        expect(checkCycle(lessonId), `Cycle detected involving ${lessonId}`).toBe(false);
      }
    });

    it('ensures all listed prerequisites point to existing valid lessons', () => {
      const validIds = new Set(allActiveLessons.map((l) => l.id));

      for (const lesson of allActiveLessons) {
        for (const prereqId of lesson.prerequisites || []) {
          expect(validIds.has(prereqId), `Invalid prereq ${prereqId} in ${lesson.id}`).toBe(true);
        }
      }
    });

    it('ensures Level 1 introductory lesson has no prerequisites', () => {
      const firstSummary = allActiveLessons.find((l) => l.id === '01-version-control');
      expect(firstSummary).toBeDefined();
      expect(firstSummary?.prerequisites).toEqual([]);
    });

    it('verifies every active lesson has a valid completion requirement configuration', () => {
      for (const lesson of allActiveLessons) {
        expect(lesson.completion, `Completion config missing in ${lesson.id}`).toBeDefined();
        expect(lesson.completion.theoryViewed).toBe(true);
        expect(lesson.completion.quiz?.minimumScore).toBeGreaterThanOrEqual(70);
        expect(lesson.completion.quiz?.minimumScore).toBeLessThanOrEqual(100);
      }
    });

    it('verifies that each active module duration is between 180 and 800 minutes', () => {
      for (const m of activeModules) {
        const mDuration = m.lessons.reduce((acc, l) => acc + l.duration, 0);
        expect(mDuration).toBeGreaterThanOrEqual(180);
        expect(mDuration).toBeLessThanOrEqual(800);
      }
    });
  });

  // =========================================================================
  // 5. Search Filtering & Author Studio Helper Logic
  // =========================================================================
  describe('Search Filtering & Author Studio Helper Logic', () => {
    it('filters search index entries by user query string', () => {
      const filterSearch = (query: string) => {
        const q = query.toLowerCase().trim();
        if (!q) return [];
        return COURSE_SEARCH_INDEX.filter((entry) => {
          return (
            entry.title.toLowerCase().includes(q) ||
            entry.id.toLowerCase().includes(q) ||
            entry.keywords.some((k) => k.toLowerCase().includes(q)) ||
            entry.commands?.some((c) => c.toLowerCase().includes(q))
          );
        });
      };

      const rebaseResults = filterSearch('rebase');
      expect(rebaseResults.length).toBeGreaterThanOrEqual(5);

      const bisectResults = filterSearch('bisect');
      expect(bisectResults.length).toBeGreaterThanOrEqual(1);

      const nonexistent = filterSearch('nonexistent_gibberish_12345');
      expect(nonexistent).toHaveLength(0);
    });

    it('handles calculateAuthorQualityMetrics on null and empty lesson input', () => {
      expect(calculateAuthorQualityMetrics(null)).toBeNull();

      const emptyMetrics = calculateAuthorQualityMetrics({
        id: 'empty',
        title: 'Empty',
        content: '',
      } as any);

      expect(emptyMetrics).not.toBeNull();
      expect(emptyMetrics?.defWords).toBe(0);
      expect(emptyMetrics?.whyWords).toBe(0);
      expect(emptyMetrics?.mmWords).toBe(0);
      expect(emptyMetrics?.exWords).toBe(0);
      expect(emptyMetrics?.passes).toBe(false);
    });

    it('fails passes flag if any individual section is below word count threshold', () => {
      // Missing Definition
      const lowDef = calculateAuthorQualityMetrics({
        id: 'low-def',
        title: 'Test',
        content: `
## 📖 Định nghĩa
> Quá ngắn.

---
## 🤔 Tại sao cần?
${'Từ '.repeat(100)}

---
## 🧠 Mental Model: Test
${'Từ '.repeat(100)}

---
## 🌎 Ví dụ thực tế
${'Từ '.repeat(120)}

---
        `,
        quiz: { questions: [{}, {}, {}, {}, {}, {}] },
      } as any);

      expect(lowDef?.passes).toBe(false);
      expect(lowDef?.defWords).toBeLessThan(80);
    });

    it('fails passes flag if quiz questions count is below threshold for core lesson', () => {
      const lowQuiz = calculateAuthorQualityMetrics({
        id: '06-git-commit',
        title: 'Core Commit',
        content: `
## 📖 Định nghĩa
> ${'Từ '.repeat(90)}

---
## 🤔 Tại sao cần?
${'Từ '.repeat(90)}

---
## 🧠 Mental Model: Test
${'Từ '.repeat(90)}

---
## 🌎 Ví dụ thực tế
${'Từ '.repeat(120)}

---
        `,
        // Only 3 questions (needs 6 for core lesson)
        quiz: { questions: [{}, {}, {}] },
      } as any);

      expect(lowQuiz?.isCore).toBe(true);
      expect(lowQuiz?.minQ).toBe(6);
      expect(lowQuiz?.qCount).toBe(3);
      expect(lowQuiz?.passes).toBe(false);
    });
  });
});

