import fs from 'fs';
import path from 'path';
import { parse as parseYaml } from 'yaml';
import { CourseManifest } from '@git-academy/shared';

export interface ContentValidationResult {
  lessonId: string;
  moduleId: string;
  title: string;
  passed: boolean;
  errors: string[];
  warnings: string[];
  metrics: {
    definitionWords: number;
    whyWords: number;
    mentalModelWords: number;
    exampleWords: number;
    mistakesCount: number;
    summaryCount: number;
    quizQuestionsCount: number;
  };
}

export const CORE_TOPICS = [
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
];

export const PLACEHOLDERS = [
  'TODO',
  'TBD',
  'Coming soon',
  'Lorem ipsum',
  'Nội dung đang cập nhật',
  'Ví dụ ở đây',
  'Điền nội dung',
  '...',
];

export function countWords(text: string): number {
  if (!text) return 0;
  // Strip markdown formatting, code blocks, and punctuation
  const clean = text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]+`/g, ' ')
    .replace(/[#*_\->[\]()|:]/g, ' ')
    .trim();
  const words = clean.split(/\s+/).filter((w) => w.length > 0);
  return words.length;
}

export function extractSection(content: string, sectionTitleRegex: RegExp): string {
  const sections = content.split(/\n(?=##\s+)/);
  for (const sec of sections) {
    const headerLine = sec.split('\n')[0] || '';
    if (sectionTitleRegex.test(headerLine)) {
      return sec.replace(/^##\s+[^\n]+\n/, '').trim();
    }
  }
  return '';
}

export function validateSingleLesson(
  lessonDir: string,
  lessonId: string,
  moduleId: string,
  title: string
): ContentValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const lessonMdPath = path.join(lessonDir, 'lesson.md');
  const quizPath = path.join(lessonDir, 'quiz.yml');
  const metaPath = path.join(lessonDir, 'metadata.yml');

  const metrics = {
    definitionWords: 0,
    whyWords: 0,
    mentalModelWords: 0,
    exampleWords: 0,
    mistakesCount: 0,
    summaryCount: 0,
    quizQuestionsCount: 0,
  };

  if (!fs.existsSync(lessonMdPath)) {
    errors.push(`Thiếu file lesson.md tại ${lessonDir}`);
    return { lessonId, moduleId, title, passed: false, errors, warnings, metrics };
  }

  const content = fs.readFileSync(lessonMdPath, 'utf-8');

  // 1. Placeholder Detector (P1.3)
  for (const placeholder of PLACEHOLDERS) {
    // Avoid false positives in code blocks or literal strings if any, but active text shouldn't have them
    if (content.includes(placeholder)) {
      errors.push(`Phát hiện placeholder bị cấm: "${placeholder}"`);
    }
  }

  // 2. 15 Required Sections
  const requiredSections = [
    { name: 'Mục tiêu', regex: /mục tiêu/i },
    { name: 'Định nghĩa', regex: /định nghĩa/i },
    { name: 'Tại sao cần', regex: /tại sao cần/i },
    { name: 'Mental Model', regex: /mental model|mô hình tư duy/i },
    { name: 'Sơ đồ', regex: /sơ đồ/i },
    { name: 'Ví dụ thực tế', regex: /ví dụ/i },
    { name: 'Command', regex: /command|lệnh/i },
    { name: 'Giải thích command', regex: /giải thích/i },
    { name: 'Sai lầm phổ biến', regex: /sai lầm/i },
    { name: 'Lab', regex: /lab|thực hành/i },
    { name: 'Hint', regex: /hint|gợi ý/i },
    { name: 'Validation', regex: /validation|kiểm tra/i },
    { name: 'Quiz', regex: /quiz|trắc nghiệm/i },
    { name: 'Challenge', regex: /challenge|thử thách/i },
    { name: 'Tổng kết', regex: /tổng kết/i },
  ];

  for (const sec of requiredSections) {
    if (!content.match(new RegExp(`##\\s+.*${sec.regex.source}`, 'i'))) {
      errors.push(`Thiếu mục tiêu đề bắt buộc: "## ${sec.name}"`);
    }
  }

  // 3. Word Count Thresholds (P1.2)
  const defText = extractSection(content, /định nghĩa/i);
  metrics.definitionWords = countWords(defText);
  if (metrics.definitionWords < 80) {
    errors.push(
      `Mục "Định nghĩa" quá ngắn (${metrics.definitionWords} từ < tiêu chuẩn tối thiểu 80 từ)`
    );
  }

  const whyText = extractSection(content, /tại sao cần/i);
  metrics.whyWords = countWords(whyText);
  if (metrics.whyWords < 80) {
    errors.push(
      `Mục "Tại sao cần" quá ngắn (${metrics.whyWords} từ < tiêu chuẩn tối thiểu 80 từ)`
    );
  }

  const mmText = extractSection(content, /mental model|mô hình tư duy/i);
  metrics.mentalModelWords = countWords(mmText);
  if (metrics.mentalModelWords < 80) {
    errors.push(
      `Mục "Mental Model" quá ngắn (${metrics.mentalModelWords} từ < tiêu chuẩn tối thiểu 80 từ)`
    );
  }

  const exText = extractSection(content, /ví dụ/i);
  metrics.exampleWords = countWords(exText);
  if (metrics.exampleWords < 100) {
    errors.push(
      `Mục "Ví dụ thực tế" quá ngắn (${metrics.exampleWords} từ < tiêu chuẩn tối thiểu 100 từ)`
    );
  }

  // Common mistakes >= 3 items
  const mistakesText = extractSection(content, /sai lầm/i);
  const mistakeItems = mistakesText
    .split('\n')
    .filter((line) => line.trim().match(/^(?:\d+\.|[-*])\s+/));
  metrics.mistakesCount = mistakeItems.length;
  if (metrics.mistakesCount < 3) {
    errors.push(
      `Mục "Sai lầm phổ biến" cần tối thiểu 3 mục (hiện có ${metrics.mistakesCount})`
    );
  }

  // Summary >= 3 key points
  const summaryText = extractSection(content, /tổng kết/i);
  const summaryItems = summaryText
    .split('\n')
    .filter((line) => line.trim().match(/^(?:\d+\.|[-*])\s+/));
  metrics.summaryCount = summaryItems.length;
  if (metrics.summaryCount < 3) {
    errors.push(
      `Mục "Tổng kết" cần tối thiểu 3 ý then chốt (hiện có ${metrics.summaryCount})`
    );
  }

  // 4. Command-oriented check: syntax, example, explanation, error example
  const commandSection = extractSection(content, /command|lệnh/i);
  const hasGitCommands = commandSection.includes('git ');
  if (hasGitCommands) {
    const explanationSection = extractSection(content, /giải thích/i);
    if (!explanationSection || countWords(explanationSection) < 40) {
      errors.push(`Bài học có Git command nhưng mục "Giải thích command" quá sơ sài hoặc thiếu`);
    }
  }

  // 5. Quiz validation (Part 2)
  if (!fs.existsSync(quizPath)) {
    errors.push(`Thiếu file trắc nghiệm quiz.yml`);
  } else {
    try {
      const quiz = parseYaml(fs.readFileSync(quizPath, 'utf-8'));
      const questions = quiz.questions || [];
      metrics.quizQuestionsCount = questions.length;

      const isCore = CORE_TOPICS.some((topic) => lessonId.includes(topic));
      const minRequired = isCore ? 6 : 4;

      if (metrics.quizQuestionsCount < minRequired) {
        errors.push(
          `Số lượng câu hỏi quiz không đủ: ${metrics.quizQuestionsCount}/${minRequired} câu ${
            isCore ? '(Chủ đề trọng tâm yêu cầu >= 6 câu)' : '(Yêu cầu tối thiểu >= 4 câu)'
          }`
        );
      }

      // Check explanations in each question (P2.2)
      questions.forEach((q: any, idx: number) => {
        if (!q.explanation || countWords(q.explanation) < 8) {
          errors.push(`Câu hỏi #${idx + 1} (${q.id || ''}) thiếu lời giải thích chi tiết vì sao đúng/sai`);
        }
        if (!q.options || q.options.length < 2) {
          errors.push(`Câu hỏi #${idx + 1} không đủ số lượng lựa chọn`);
        }
      });
    } catch (e: any) {
      errors.push(`Lỗi cú pháp quiz.yml: ${e.message}`);
    }
  }

  return {
    lessonId,
    moduleId,
    title,
    passed: errors.length === 0,
    errors,
    warnings,
    metrics,
  };
}

export function validateAllContent(): boolean {
  console.log('🛡️ [Git Academy] Bắt đầu Content Quality Gate (pnpm validate:content)...\n');

  const rootDir = process.cwd();
  const manifestPath = path.resolve(rootDir, 'courses/courses-manifest.json');
  if (!fs.existsSync(manifestPath)) {
    console.error('❌ Không tìm thấy courses/courses-manifest.json!');
    process.exit(1);
  }

  const manifest: CourseManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  let totalChecked = 0;
  let passedCount = 0;
  let totalErrors = 0;
  const failureDetails: ContentValidationResult[] = [];

  for (const module of manifest.curriculum) {
    if (module.status === 'coming_soon') {
      console.log(`⏩ Bỏ qua module ${module.id} (${module.title}) [coming_soon]`);
      continue;
    }

    console.log(`\n📂 Đang kiểm tra Module: ${module.title} (${module.id})`);
    for (const item of module.lessons || []) {
      totalChecked++;
      const lessonDir = path.resolve(rootDir, 'courses', module.id, item.id);
      const res = validateSingleLesson(lessonDir, item.id, module.id, item.title);

      if (res.passed) {
        passedCount++;
        console.log(`  ✅ [PASS] ${item.id} - ${item.title}`);
      } else {
        totalErrors += res.errors.length;
        failureDetails.push(res);
        console.error(`  ❌ [FAIL] ${item.id} - ${item.title}`);
        res.errors.forEach((err) => console.error(`     ↳ ${err}`));
      }
    }
  }

  console.log('\n========================================');
  console.log('KẾT QUẢ CONTENT QUALITY GATE:');
  console.log(`- Tổng số bài học active: ${totalChecked}`);
  console.log(`- Bài đạt chuẩn chất lượng: ${passedCount}/${totalChecked}`);
  console.log(`- Tổng số lỗi phát hiện: ${totalErrors}`);

  if (failureDetails.length > 0) {
    console.error(`\n❌ Phát hiện ${failureDetails.length} bài học chưa đạt chuẩn chất lượng giáo trình!`);
    return false;
  }

  console.log('\n🌟 TOÀN BỘ BÀI HỌC ĐÃ VƯỢT QUA CONTENT QUALITY GATE XUẤT SẮC!');
  return true;
}

if (process.argv[1] && process.argv[1].endsWith('validate-content.ts')) {
  const success = validateAllContent();
  if (!success) {
    process.exit(1);
  }
}
