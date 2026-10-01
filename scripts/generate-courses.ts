import fs from 'fs';
import path from 'path';
import { parse as parseYaml } from 'yaml';
import { CourseLesson, CourseManifest } from '@git-academy/shared';

export interface SearchIndexEntry {
  id: string;
  moduleId: string;
  moduleTitle: string;
  title: string;
  level: string;
  duration: number;
  xp: number;
  keywords: string[];
  commands: string[];
  definition: string;
}

export interface TermCardStatus {
  count: number;
  completeCount: number;
  complete: boolean;
}

function inspectTermCardStatus(markdown: string): TermCardStatus {
  const normalize = (value: string) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
  const sections = markdown.split(/^##\s+/m).slice(1);
  const termSection = sections.find((part) => {
    const lineEnd = part.indexOf('\n');
    const heading = lineEnd < 0 ? part : part.slice(0, lineEnd);
    return /tu khoa|thuat ngu/.test(normalize(heading));
  });
  const cards = termSection?.split(/^###\s+/m).slice(1) || [];
  const completeCount = cards.filter((part) => {
    const lineEnd = part.indexOf('\n');
    const name = (lineEnd < 0 ? part : part.slice(0, lineEnd)).trim();
    const hasRequiredFields = ['Nói dễ hiểu', 'Ví dụ', 'Đừng nhầm'].every((label) =>
      new RegExp(`^\\s*[-*]?\\s*\\*{0,2}${label}\\*{0,2}:\\s*\\S`, 'im').test(part),
    );
    return Boolean(name && hasRequiredFields);
  }).length;

  return {
    count: cards.length,
    completeCount,
    complete: cards.length >= 2 && cards.length <= 5 && completeCount === cards.length,
  };
}

export interface NavigationNode {
  id: string;
  moduleId: string;
  title: string;
  prevLessonId: string | null;
  nextLessonId: string | null;
  prerequisites: string[];
}

export interface DependencyGraphData {
  nodes: { id: string; title: string; moduleId: string; level: string }[];
  edges: { from: string; to: string }[];
}

/**
 * Generates runtime metadata, search index, navigation map, and dependency graph
 * strictly from authored source-controlled content under courses/**.
 * 
 * NEVER writes or mutates lesson.md, quiz.yml, labs, or challenge files!
 */
export function generateCourses() {
  console.log('⚡ [Git Academy] Reading authored courses and generating course-data.ts...');

  const rootDir = process.cwd();
  const manifestPath = path.resolve(rootDir, 'courses/courses-manifest.json');
  const targetDir = path.resolve(rootDir, 'packages/exercise-engine/src/courses/generated');
  const targetFilePath = path.join(targetDir, 'course-data.ts');

  if (!fs.existsSync(manifestPath)) {
    console.error('❌ courses-manifest.json not found!');
    process.exit(1);
  }

  const manifest: CourseManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  const lessonsRecord: Record<string, CourseLesson> = {};
  const searchIndex: SearchIndexEntry[] = [];
  const termCardStatus: Record<string, TermCardStatus> = {};
  const navigationMap: Record<string, NavigationNode> = {};
  const depGraph: DependencyGraphData = { nodes: [], edges: [] };

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Linearize all active lessons across modules to calculate next/prev
  const flatLessons: { moduleId: string; lessonId: string; title: string; prereqs: string[]; level: string }[] = [];

  for (const module of manifest.curriculum) {
    if (module.status === 'coming_soon') continue;
    for (const item of module.lessons || []) {
      const level = module.id.includes('foundations') || module.id.includes('basics')
        ? 'beginner'
        : module.id.includes('branching') || module.id.includes('collaboration')
        ? 'intermediate'
        : 'advanced';

      flatLessons.push({
        moduleId: module.id,
        lessonId: item.id,
        title: item.title,
        prereqs: item.prerequisites || [],
        level,
      });

      depGraph.nodes.push({
        id: item.id,
        title: item.title,
        moduleId: module.id,
        level,
      });

      for (const p of item.prerequisites || []) {
        depGraph.edges.push({ from: p, to: item.id });
      }
    }
  }

  for (let i = 0; i < flatLessons.length; i++) {
    const curr = flatLessons[i];
    const prev = i > 0 ? flatLessons[i - 1].lessonId : null;
    const next = i < flatLessons.length - 1 ? flatLessons[i + 1].lessonId : null;

    navigationMap[curr.lessonId] = {
      id: curr.lessonId,
      moduleId: curr.moduleId,
      title: curr.title,
      prevLessonId: prev,
      nextLessonId: next,
      prerequisites: curr.prereqs,
    };
  }

  let totalAuthoredCount = 0;

  for (const module of manifest.curriculum) {
    if (module.status === 'coming_soon') continue;

    for (const item of module.lessons || []) {
      const physicalDir = path.resolve(rootDir, 'courses', module.id, item.id);
      let content = '';
      let metadata: any = {
        id: item.id,
        title: item.title,
        level: module.id.includes('foundations') || module.id.includes('basics')
          ? 'beginner'
          : module.id.includes('branching') || module.id.includes('collaboration')
          ? 'intermediate'
          : 'advanced',
        duration: item.duration,
        xp: item.xp,
        prerequisites: item.prerequisites || [],
        objectives: [`Nắm vững kiến thức ${item.title}`],
        completion: item.completion,
      };
      let quiz: any = null;
      let labScenarios: any[] = [];

      // Read physical source-controlled authored files from courses/**
      if (fs.existsSync(physicalDir)) {
        const metaPath = path.join(physicalDir, 'metadata.yml');
        const lessonPath = path.join(physicalDir, 'lesson.md');
        const quizPath = path.join(physicalDir, 'quiz.yml');
        const labsDir = path.join(physicalDir, 'labs');

        if (fs.existsSync(metaPath)) {
          try {
            metadata = { ...metadata, ...parseYaml(fs.readFileSync(metaPath, 'utf-8')) };
          } catch (e) {
            console.warn(`[WARN] Invalid metadata in ${metaPath}`);
          }
        }
        if (fs.existsSync(lessonPath)) {
          content = fs.readFileSync(lessonPath, 'utf-8');
          totalAuthoredCount++;
        }
        if (fs.existsSync(quizPath)) {
          try {
            quiz = parseYaml(fs.readFileSync(quizPath, 'utf-8'));
          } catch (e) {
            console.warn(`[WARN] Invalid quiz in ${quizPath}`);
          }
        }
        if (fs.existsSync(labsDir)) {
          const labFiles = fs.readdirSync(labsDir).filter((f) => f.endsWith('.yml') || f.endsWith('.yaml'));
          for (const lf of labFiles) {
            try {
              labScenarios.push(parseYaml(fs.readFileSync(path.join(labsDir, lf), 'utf-8')));
            } catch (e) {
              console.warn(`[WARN] Invalid lab file ${lf}`);
            }
          }
        }
      }

      // If content is empty because author hasn't created the file yet, leave as empty string
      // Do NOT generate fake content!
      const lessonObj: CourseLesson = {
        id: item.id,
        moduleId: module.id,
        metadata,
        content,
        quiz: quiz || undefined,
        labScenarios: labScenarios.length > 0 ? labScenarios : undefined,
      };

      // Write individual per-lesson chunk file
      const lessonModuleDir = path.join(targetDir, 'lessons', module.id);
      if (!fs.existsSync(lessonModuleDir)) {
        fs.mkdirSync(lessonModuleDir, { recursive: true });
      }
      const lessonModuleFile = path.join(lessonModuleDir, `${item.id}.ts`);
      const lessonFileContent = `import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = ${JSON.stringify(lessonObj, null, 2)};
export default lesson;
`;
      fs.writeFileSync(lessonModuleFile, lessonFileContent, 'utf-8');

      lessonsRecord[item.id] = lessonObj;
      lessonsRecord[`${module.id}/${item.id}`] = lessonObj;
      termCardStatus[item.id] = inspectTermCardStatus(content);

      // Extract search index keywords and definition
      const extractedCommands = extractCommandsFromContent(content);
      const allCommands = Array.from(new Set([...(metadata.commands || []), ...extractedCommands]));
      const extractedDef = extractDefinitionFromContent(content) || item.title;

      searchIndex.push({
        id: item.id,
        moduleId: module.id,
        moduleTitle: module.title,
        title: item.title,
        level: metadata.level,
        duration: item.duration,
        xp: item.xp,
        keywords: [
          item.title.toLowerCase(),
          module.title.toLowerCase(),
          ...allCommands,
          item.id,
          ...(metadata.keywords || []),
        ],
        commands: allCommands,
        definition: extractedDef,
      });
    }
  }

  // 1. Generate lesson-loaders.ts
  const loaderEntries: string[] = [];
  for (const module of manifest.curriculum) {
    if (module.status === 'coming_soon') continue;
    for (const item of module.lessons || []) {
      loaderEntries.push(`  "${module.id}/${item.id}": () => import('./lessons/${module.id}/${item.id}'),`);
      loaderEntries.push(`  "${item.id}": () => import('./lessons/${module.id}/${item.id}'),`);
    }
  }

  const lessonLoadersCode = `/**
 * AUTO-GENERATED PER-LESSON DYNAMIC LOADERS - DO NOT EDIT MANUALLY
 * Generated by scripts/generate-courses.ts
 */

import { CourseLesson } from '@git-academy/shared';

export const LESSON_LOADERS: Record<string, () => Promise<{ default?: CourseLesson; lesson?: CourseLesson }>> = {
${loaderEntries.join('\n')}
};

export async function loadLessonContent(moduleId: string, lessonId: string): Promise<CourseLesson | null> {
  const key = \`\${moduleId}/\${lessonId}\`;
  const loader = LESSON_LOADERS[key] || LESSON_LOADERS[lessonId];
  if (!loader) return null;
  try {
    const mod = await loader();
    return mod.lesson || mod.default || (mod as any);
  } catch (err) {
    console.error(\`Failed to dynamically load lesson \${key}:\`, err);
    return null;
  }
}
`;
  fs.writeFileSync(path.join(targetDir, 'lesson-loaders.ts'), lessonLoadersCode, 'utf-8');

  // 2. Generate full course data (isolated for node tests and audit tools)
  const fullCourseDataCode = `/**
 * AUTO-GENERATED FULL LESSON DATA (FOR TESTS AND CLI TOOLS ONLY)
 * Do NOT import this file in web application client bundles!
 */
import { CourseLesson } from '@git-academy/shared';

export const BUILTIN_LESSONS: Record<string, CourseLesson> = ${JSON.stringify(lessonsRecord, null, 2)};
`;
  fs.writeFileSync(path.join(targetDir, 'course-data-full.ts'), fullCourseDataCode, 'utf-8');

  // 3. Generate compact course-data.ts (small metadata index for web bundle)
  const generatedCode = `/**
 * AUTO-GENERATED COMPACT METADATA FILE - DO NOT EDIT MANUALLY
 * Generated by scripts/generate-courses.ts from courses/**
 * Timestamp: ${new Date().toISOString()}
 */

import { CourseManifest } from '@git-academy/shared';
export * from './lesson-loaders';

export const COURSE_MANIFEST: CourseManifest = ${JSON.stringify(manifest, null, 2)};

export interface CourseSearchIndexEntry {
  id: string;
  moduleId: string;
  moduleTitle: string;
  title: string;
  level: string;
  duration: number;
  xp: number;
  keywords: string[];
  commands: string[];
  definition: string;
}

export const COURSE_SEARCH_INDEX: CourseSearchIndexEntry[] = ${JSON.stringify(searchIndex, null, 2)};

export interface CourseTermCardStatus {
  count: number;
  completeCount: number;
  complete: boolean;
}

export const COURSE_TERM_CARD_STATUS: Record<string, CourseTermCardStatus> = ${JSON.stringify(termCardStatus, null, 2)};

export interface CourseNavigationNode {
  id: string;
  moduleId: string;
  title: string;
  prevLessonId: string | null;
  nextLessonId: string | null;
  prerequisites: string[];
}

export const COURSE_NAVIGATION_MAP: Record<string, CourseNavigationNode> = ${JSON.stringify(navigationMap, null, 2)};

export interface CourseDependencyGraph {
  nodes: { id: string; title: string; moduleId: string; level: string }[];
  edges: { from: string; to: string }[];
}

export const COURSE_DEPENDENCY_GRAPH: CourseDependencyGraph = ${JSON.stringify(depGraph, null, 2)};
`;

  fs.writeFileSync(targetFilePath, generatedCode, 'utf-8');
  console.log(`✅ Processed ${Object.keys(navigationMap).length} curriculum lessons.`);
  console.log(`   Authored lesson files found on disk: ${totalAuthoredCount}`);
  console.log(`   Output written cleanly to: ${targetFilePath} and per-lesson dynamic chunks.`);
}

function extractCommandsFromContent(content: string): string[] {
  if (!content) return [];
  const cmds = new Set<string>();

  // Extract specifically from "## 💻 Command" section first
  const cmdSectionMatch = content.match(/##\s*💻\s*Command[\s\S]*?```(?:bash|sh|shell)?\s*\r?\n([\s\S]*?)```/i);
  if (cmdSectionMatch && cmdSectionMatch[1]) {
    const lines = cmdSectionMatch[1].split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('git ') || trimmed.startsWith('$ git ')) {
        const cleanCmd = trimmed.replace(/^\$\s*/, '');
        cmds.add(cleanCmd);
      }
    }
  }

  // Also check all markdown code blocks properly
  const codeBlockRegex = /```([a-zA-Z0-9_-]*)\s*\r?\n([\s\S]*?)```/g;
  let match;
  while ((match = codeBlockRegex.exec(content)) !== null) {
    const lang = (match[1] || '').toLowerCase();
    if (lang === 'bash' || lang === 'sh' || lang === 'shell' || lang === '') {
      const lines = match[2].split(/\r?\n/);
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('git ') || trimmed.startsWith('$ git ')) {
          const cleanCmd = trimmed.replace(/^\$\s*/, '');
          cmds.add(cleanCmd);
        }
      }
    }
  }

  return Array.from(cmds);
}

function extractDefinitionFromContent(content: string): string {
  if (!content) return '';
  const defMatch = content.match(/##\s*📖\s*Định nghĩa[\s\S]*?>\s*(.*?)(?:\n\n|\n---|\n##)/i);
  if (defMatch && defMatch[1]) {
    return defMatch[1].replace(/\*\*/g, '').trim();
  }
  return '';
}

if (process.argv[1] && process.argv[1].endsWith('generate-courses.ts')) {
  generateCourses();
}
