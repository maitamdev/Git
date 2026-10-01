import fs from 'fs';
import path from 'path';
import { parse as parseYaml } from 'yaml';

interface ValidationSummary {
  totalCourses: number;
  totalLessons: number;
  validLessons: number;
  errors: string[];
}

export function detectPrerequisiteCycles(graph: Map<string, string[]>): string[] | null {
  const visited = new Set<string>();
  const recStack = new Set<string>();
  const cyclePath: string[] = [];

  function dfs(node: string, pathAcc: string[]): boolean {
    visited.add(node);
    recStack.add(node);
    pathAcc.push(node);

    const neighbors = graph.get(node) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor, pathAcc)) return true;
      } else if (recStack.has(neighbor)) {
        const cycleStartIndex = pathAcc.indexOf(neighbor);
        cyclePath.push(...pathAcc.slice(cycleStartIndex), neighbor);
        return true;
      }
    }

    recStack.delete(node);
    pathAcc.pop();
    return false;
  }

  for (const node of graph.keys()) {
    if (!visited.has(node)) {
      if (dfs(node, [])) {
        return cyclePath;
      }
    }
  }

  return null;
}

const REQUIRED_LESSON_SECTIONS: Array<{ label: string; pattern: RegExp }> = [
  { label: 'Mục tiêu', pattern: /^##[ \t]+[^\r\n]*Mục tiêu[^\r\n]*$/im },
  { label: 'Từ khóa hôm nay', pattern: /^##[ \t]+[^\r\n]*Từ khóa hôm nay[^\r\n]*$/im },
  { label: 'Định nghĩa', pattern: /^##[ \t]+[^\r\n]*Định nghĩa[^\r\n]*$/im },
  { label: 'Tại sao cần', pattern: /^##[ \t]+[^\r\n]*Tại sao cần[^\r\n]*$/im },
  { label: 'Mental Model', pattern: /^##[ \t]+[^\r\n]*Mental[^\r\n]*$/im },
  { label: 'Sơ đồ', pattern: /^##[ \t]+[^\r\n]*Sơ đồ[^\r\n]*$/im },
  { label: 'Ví dụ', pattern: /^##[ \t]+[^\r\n]*Ví dụ[^\r\n]*$/im },
  { label: 'Command', pattern: /^##[ \t]+[^\r\n]*Command[^\r\n]*$/im },
  { label: 'Giải thích', pattern: /^##[ \t]+[^\r\n]*Giải thích[^\r\n]*$/im },
  { label: 'Sai lầm', pattern: /^##[ \t]+[^\r\n]*Sai lầm[^\r\n]*$/im },
  { label: 'Lab', pattern: /^##[ \t]+[^\r\n]*Lab[^\r\n]*$/im },
  { label: 'Hint', pattern: /^##[ \t]+[^\r\n]*Hint[^\r\n]*$/im },
  { label: 'Validation', pattern: /^##[ \t]+[^\r\n]*Validation[^\r\n]*$/im },
  { label: 'Quiz', pattern: /^##[ \t]+[^\r\n]*Quiz[^\r\n]*$/im },
  { label: 'Thử thách / Challenge', pattern: /^##[ \t]+[^\r\n]*(?:Thử thách|Challenge)[^\r\n]*$/im },
  { label: 'Tổng kết', pattern: /^##[ \t]+[^\r\n]*Tổng kết[^\r\n]*$/im },
];

export function findMissingLessonSections(content: string): string[] {
  return REQUIRED_LESSON_SECTIONS
    .filter(({ pattern }) => !pattern.test(content))
    .map(({ label }) => label);
}

export function validateCourses(): void {
  console.log('🔍 [Git Academy] Bắt đầu kiểm tra tính hợp lệ của toàn bộ khoá học...\n');

  const summary: ValidationSummary = {
    totalCourses: 0,
    totalLessons: 0,
    validLessons: 0,
    errors: [],
  };

  const coursesDir = path.resolve(process.cwd(), 'courses');
  if (!fs.existsSync(coursesDir)) {
    console.error('❌ Thư mục courses không tồn tại!');
    process.exit(1);
  }

  const manifestPath = path.join(coursesDir, 'courses-manifest.json');
  if (!fs.existsSync(manifestPath)) {
    console.error('❌ File courses-manifest.json không tồn tại!');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  summary.totalCourses = manifest.curriculum.length;
  console.log(`📚 Đã phát hiện ${summary.totalCourses} modules trong Curriculum manifest.`);

  // 1. Check Module IDs & Duplicates
  const moduleIds = new Set<string>();
  const allLessonIds = new Set<string>();
  const prereqGraph = new Map<string, string[]>();

  for (const module of manifest.curriculum) {
    if (moduleIds.has(module.id)) {
      summary.errors.push(`Duplicate module ID phát hiện: ${module.id}`);
    }
    moduleIds.add(module.id);

    for (const lesson of module.lessons || []) {
      if (allLessonIds.has(lesson.id)) {
        summary.errors.push(`Duplicate lesson ID phát hiện: ${lesson.id}`);
      }
      allLessonIds.add(lesson.id);
      prereqGraph.set(lesson.id, lesson.prerequisites || []);
    }
  }

  // 2. Check broken prerequisites (prerequisite does not exist in any module)
  for (const [lessonId, prereqs] of prereqGraph.entries()) {
    for (const p of prereqs) {
      if (!allLessonIds.has(p)) {
        summary.errors.push(`Lesson "${lessonId}" có prerequisite không tồn tại: "${p}"`);
      }
    }
  }

  // 3. Detect Cycles in Curriculum DAG (J4)
  const cycle = detectPrerequisiteCycles(prereqGraph);
  if (cycle) {
    summary.errors.push(`Phát hiện vòng lặp (cycle) trong prerequisites: ${cycle.join(' -> ')}`);
  }

  // 4. Validate all physical lesson directories under courses/
  for (const module of manifest.curriculum) {
    const modDir = path.join(coursesDir, module.id);
    if (!fs.existsSync(modDir)) continue;

    const entries = fs.readdirSync(modDir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const lessonDir = path.join(modDir, entry.name);
      summary.totalLessons++;

      const requiredFiles = ['lesson.md', 'metadata.yml'];
      let lessonValid = true;

      for (const req of requiredFiles) {
        const fullPath = path.join(lessonDir, req);
        if (!fs.existsSync(fullPath)) {
          summary.errors.push(`Thiếu file bắt buộc: ${req} trong ${lessonDir}`);
          lessonValid = false;
        }
      }

      // Check metadata.yml
      const metaPath = path.join(lessonDir, 'metadata.yml');
      if (fs.existsSync(metaPath)) {
        try {
          const meta = parseYaml(fs.readFileSync(metaPath, 'utf-8'));
          if (!meta.id || !meta.title || !meta.objectives) {
            summary.errors.push(`metadata.yml trong ${lessonDir} thiếu id, title, hoặc objectives`);
            lessonValid = false;
          }
        } catch (err: any) {
          summary.errors.push(`Lỗi cú pháp metadata.yml trong ${lessonDir}: ${err.message}`);
          lessonValid = false;
        }
      }

      // Check the required instructional sections, accepting the Vietnamese headings used by the course.
      const lessonMdPath = path.join(lessonDir, 'lesson.md');
      if (fs.existsSync(lessonMdPath)) {
        const content = fs.readFileSync(lessonMdPath, 'utf-8');
        for (const section of findMissingLessonSections(content)) {
          summary.errors.push(`lesson.md trong ${lessonDir} thiếu mục bắt buộc: "${section}"`);
          lessonValid = false;
        }
      }

      if (lessonValid) {
        summary.validLessons++;
      }
    }
  }

  // 5. Verify generated data exists and is in sync
  const generatedDataPath = path.resolve(
    process.cwd(),
    'packages/exercise-engine/src/courses/generated/course-data.ts'
  );
  if (!fs.existsSync(generatedDataPath)) {
    summary.errors.push(
      'File generated/course-data.ts chưa tồn tại! Hãy chạy `pnpm generate:courses` để đồng bộ.'
    );
  }

  console.log('\n========================================');
  console.log(`KẾT QUẢ KIỂM TRA BÀI HỌC:`);
  console.log(`- Modules: ${summary.totalCourses}`);
  console.log(`- Physical lessons đã xác thực: ${summary.validLessons}/${summary.totalLessons}`);
  if (summary.errors.length > 0) {
    console.error(`- Lỗi phát hiện: ${summary.errors.length}`);
    summary.errors.forEach((e) => console.error(`  ❌ ${e}`));
    process.exit(1);
  } else {
    console.log(`✅ Toàn bộ cấu trúc khóa học, sơ đồ DAG và bài học đều hợp lệ 100%!`);
  }
}

if (process.argv[1] && process.argv[1].endsWith('validate-courses.ts')) {
  validateCourses();
}
