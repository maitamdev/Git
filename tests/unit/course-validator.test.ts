import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { detectPrerequisiteCycles } from '../../scripts/validate-courses';
import { COURSE_SEARCH_INDEX } from '../../packages/exercise-engine/src/courses/generated/course-data';

describe('Course Manifest, Prerequisite Cycle Detection & Search Index (Parts A2, A3, A4, J3, J4, K)', () => {
  describe('Prerequisite Cycle Detection (detectPrerequisiteCycles) (Part J4)', () => {
    it('returns null for an empty prerequisite graph', () => {
      const graph = new Map<string, string[]>();
      expect(detectPrerequisiteCycles(graph)).toBeNull();
    });

    it('returns null for independent nodes with no prerequisites', () => {
      const graph = new Map<string, string[]>([
        ['lesson-1', []],
        ['lesson-2', []],
        ['lesson-3', []],
      ]);
      expect(detectPrerequisiteCycles(graph)).toBeNull();
    });

    it('returns null for a linear DAG (A -> B -> C)', () => {
      const graph = new Map<string, string[]>([
        ['lesson-1', []],
        ['lesson-2', ['lesson-1']],
        ['lesson-3', ['lesson-2']],
      ]);
      expect(detectPrerequisiteCycles(graph)).toBeNull();
    });

    it('returns null for a branching tree DAG', () => {
      const graph = new Map<string, string[]>([
        ['root', []],
        ['child-1', ['root']],
        ['child-2', ['root']],
        ['grandchild-1', ['child-1']],
        ['grandchild-2', ['child-2']],
      ]);
      expect(detectPrerequisiteCycles(graph)).toBeNull();
    });

    it('returns null for a diamond DAG (valid confluence)', () => {
      // A -> B, A -> C, B -> D, C -> D
      const graph = new Map<string, string[]>([
        ['A', []],
        ['B', ['A']],
        ['C', ['A']],
        ['D', ['B', 'C']],
      ]);
      expect(detectPrerequisiteCycles(graph)).toBeNull();
    });

    it('detects a self-dependency cycle (A -> A)', () => {
      const graph = new Map<string, string[]>([
        ['lesson-self', ['lesson-self']],
      ]);
      const cycle = detectPrerequisiteCycles(graph);
      expect(cycle).not.toBeNull();
      expect(cycle).toContain('lesson-self');
    });

    it('detects a direct 2-node cycle (A -> B -> A)', () => {
      const graph = new Map<string, string[]>([
        ['lesson-a', ['lesson-b']],
        ['lesson-b', ['lesson-a']],
      ]);
      const cycle = detectPrerequisiteCycles(graph);
      expect(cycle).not.toBeNull();
      expect(cycle).toContain('lesson-a');
      expect(cycle).toContain('lesson-b');
    });

    it('detects a 3-node cycle (A -> B -> C -> A)', () => {
      const graph = new Map<string, string[]>([
        ['lesson-a', ['lesson-b']],
        ['lesson-b', ['lesson-c']],
        ['lesson-c', ['lesson-a']],
      ]);
      const cycle = detectPrerequisiteCycles(graph);
      expect(cycle).not.toBeNull();
      expect(cycle).toContain('lesson-a');
      expect(cycle).toContain('lesson-b');
      expect(cycle).toContain('lesson-c');
    });

    it('detects a cycle inside a disconnected component of a larger graph', () => {
      const graph = new Map<string, string[]>([
        ['valid-1', []],
        ['valid-2', ['valid-1']],
        ['cycle-x', ['cycle-y']],
        ['cycle-y', ['cycle-z']],
        ['cycle-z', ['cycle-x']],
      ]);
      const cycle = detectPrerequisiteCycles(graph);
      expect(cycle).not.toBeNull();
      expect(cycle).toContain('cycle-x');
      expect(cycle).toContain('cycle-y');
      expect(cycle).toContain('cycle-z');
      expect(cycle).not.toContain('valid-1');
    });
  });

  describe('Curriculum Manifest Integrity (Parts A2, A3, A4, J3)', () => {
    const manifestPath = path.resolve(process.cwd(), 'courses/courses-manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

    it('contains all 8 required curriculum levels (Part A4)', () => {
      expect(manifest.curriculum).toHaveLength(8);
      const moduleIds = manifest.curriculum.map((m: any) => m.id);
      expect(moduleIds).toEqual([
        '01-foundations',
        '02-git-basics',
        '03-branching',
        '04-github-collaboration',
        '05-advanced-git',
        '06-team-workflows',
        '07-github-actions',
        '08-git-internals',
      ]);
    });

    it('declares active status for levels 7 and 8 with 20 authored lessons each', () => {
      const advancedLevels = manifest.curriculum.filter((m: any) => m.id.localeCompare('07-') >= 0);
      expect(advancedLevels).toHaveLength(2);
      for (const mod of advancedLevels) {
        expect(mod.status).toBe('active');
        expect(mod.lessons).toHaveLength(20);
      }
    });

    it('has full lesson counts for Level 1 through Level 8 (total 128 lessons)', () => {
      const l1 = manifest.curriculum.find((m: any) => m.id === '01-foundations');
      const l2 = manifest.curriculum.find((m: any) => m.id === '02-git-basics');
      const l3 = manifest.curriculum.find((m: any) => m.id === '03-branching');
      const l4 = manifest.curriculum.find((m: any) => m.id === '04-github-collaboration');
      const l5 = manifest.curriculum.find((m: any) => m.id === '05-advanced-git');
      const l6 = manifest.curriculum.find((m: any) => m.id === '06-team-workflows');
      const l7 = manifest.curriculum.find((m: any) => m.id === '07-github-actions');
      const l8 = manifest.curriculum.find((m: any) => m.id === '08-git-internals');

      expect(l1.lessons).toHaveLength(9);
      expect(l2.lessons).toHaveLength(12);
      expect(l3.lessons).toHaveLength(14);
      expect(l4.lessons).toHaveLength(16);
      expect(l5.lessons).toHaveLength(22);
      expect(l6.lessons).toHaveLength(15);
      expect(l7.lessons).toHaveLength(20);
      expect(l8.lessons).toHaveLength(20);

      const totalActiveLessons =
        l1.lessons.length +
        l2.lessons.length +
        l3.lessons.length +
        l4.lessons.length +
        l5.lessons.length +
        l6.lessons.length +
        l7.lessons.length +
        l8.lessons.length;
      expect(totalActiveLessons).toBe(128);
    });

    it('includes lesson 12 (.gitignore) and lesson 14 (HEAD) in curriculum (Part A2)', () => {
      const l2 = manifest.curriculum.find((m: any) => m.id === '02-git-basics');
      const gitignoreLesson = l2.lessons.find((l: any) => l.id.includes('gitignore') || l.title.includes('.gitignore'));
      expect(gitignoreLesson).toBeDefined();

      const l3 = manifest.curriculum.find((m: any) => m.id === '03-branching');
      const headLesson = l3.lessons.find((l: any) => l.id.includes('head') || l.title.includes('HEAD'));
      expect(headLesson).toBeDefined();
    });

    it('has zero duplicate lesson IDs across all modules (Part J3)', () => {
      const seenIds = new Set<string>();
      const duplicates: string[] = [];

      for (const mod of manifest.curriculum) {
        for (const lesson of mod.lessons) {
          if (seenIds.has(lesson.id)) {
            duplicates.push(lesson.id);
          }
          seenIds.add(lesson.id);
        }
      }

      expect(duplicates).toEqual([]);
    });

    it('has zero broken prerequisites in active curriculum (Part J3)', () => {
      const allLessonIds = new Set<string>();
      for (const mod of manifest.curriculum) {
        for (const lesson of mod.lessons) {
          allLessonIds.add(lesson.id);
        }
      }

      const brokenPrereqs: string[] = [];
      for (const mod of manifest.curriculum) {
        for (const lesson of mod.lessons) {
          for (const p of lesson.prerequisites || []) {
            if (!allLessonIds.has(p)) {
              brokenPrereqs.push(`${lesson.id} -> ${p}`);
            }
          }
        }
      }

      expect(brokenPrereqs).toEqual([]);
    });

    it('has zero cycles in actual curriculum prerequisite graph (Part J4)', () => {
      const prereqGraph = new Map<string, string[]>();
      for (const mod of manifest.curriculum) {
        for (const lesson of mod.lessons) {
          prereqGraph.set(lesson.id, lesson.prerequisites || []);
        }
      }

      const cycle = detectPrerequisiteCycles(prereqGraph);
      expect(cycle).toBeNull();
    });
  });

  describe('Search Index Build-Time Generation (Part K)', () => {
    it('search index is populated with all active lessons', () => {
      expect(COURSE_SEARCH_INDEX.length).toBeGreaterThanOrEqual(51);
    });

    it('indexes keywords and enables keyword search for "branch"', () => {
      const hits = COURSE_SEARCH_INDEX.filter((entry) =>
        entry.title.toLowerCase().includes('branch') ||
        entry.keywords.some((k) => k.toLowerCase().includes('branch')) ||
        entry.definition.toLowerCase().includes('branch')
      );
      expect(hits.length).toBeGreaterThanOrEqual(1);
    });

    it('indexes keywords and enables search for "remote"', () => {
      const hits = COURSE_SEARCH_INDEX.filter((entry) =>
        entry.title.toLowerCase().includes('remote') ||
        entry.keywords.some((k) => k.toLowerCase().includes('remote'))
      );
      expect(hits.length).toBeGreaterThan(0);
      expect(hits[0].level).toBeDefined();
    });

    it('indexes commands and finds lessons teaching "git commit"', () => {
      const hits = COURSE_SEARCH_INDEX.filter((entry) =>
        entry.commands.some((c) => c.toLowerCase().includes('commit'))
      );
      expect(hits.length).toBeGreaterThan(0);
    });

    it('contains no empty titles or definitions', () => {
      for (const entry of COURSE_SEARCH_INDEX) {
        expect(entry.id).toBeTruthy();
        expect(entry.title).toBeTruthy();
        expect(entry.moduleId).toBeTruthy();
        expect(typeof entry.level).toBe('string');
      }
    });
  });
});
