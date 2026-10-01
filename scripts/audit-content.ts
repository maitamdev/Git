import fs from 'fs';
import path from 'path';
import { parse as parseYaml } from 'yaml';
import { CourseManifest } from '@git-academy/shared';

export interface AuditReport {
  duplicateWarnings: string[];
  highSimilarityPairs: { lessonA: string; lessonB: string; similarity: number }[];
  repeatedParagraphs: { paragraph: string; lessons: string[] }[];
  labCoverage: {
    lessonId: string;
    hasLab: boolean;
    hasQuiz: boolean;
    hasChallenge: boolean;
  }[];
}

/**
 * Creates 3-word shingles from normalized text
 */
export function getShingles(text: string, k = 3): Set<string> {
  const words = text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);

  const shingles = new Set<string>();
  for (let i = 0; i <= words.length - k; i++) {
    shingles.add(words.slice(i, i + k).join(' '));
  }
  return shingles;
}

/**
 * Computes Jaccard similarity between two sets of shingles
 */
export function jaccardSimilarity(setA: Set<string>, setB: Set<string>): number {
  if (setA.size === 0 && setB.size === 0) return 1.0;
  if (setA.size === 0 || setB.size === 0) return 0.0;

  let intersectionCount = 0;
  for (const item of setA) {
    if (setB.has(item)) intersectionCount++;
  }

  const unionCount = setA.size + setB.size - intersectionCount;
  return unionCount === 0 ? 0 : intersectionCount / unionCount;
}

export function auditContent(): AuditReport {
  console.log('🔍 [Git Academy] Bắt đầu kiểm tra trùng lặp & độ bao phủ (pnpm audit:content)...\n');

  const rootDir = process.cwd();
  const manifestPath = path.resolve(rootDir, 'courses/courses-manifest.json');
  const manifest: CourseManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

  const lessons: {
    id: string;
    title: string;
    moduleId: string;
    content: string;
    shingles: Set<string>;
    paragraphs: string[];
    quizQuestions: string[];
    challenge: string;
    hasLab: boolean;
    hasQuiz: boolean;
    hasChallenge: boolean;
  }[] = [];

  for (const module of manifest.curriculum) {
    if (module.status === 'coming_soon') continue;

    for (const item of module.lessons || []) {
      const lessonDir = path.resolve(rootDir, 'courses', module.id, item.id);
      const lessonMdPath = path.join(lessonDir, 'lesson.md');
      const quizPath = path.join(lessonDir, 'quiz.yml');
      const labsDir = path.join(lessonDir, 'labs');

      let content = '';
      if (fs.existsSync(lessonMdPath)) {
        content = fs.readFileSync(lessonMdPath, 'utf-8');
      }

      let quizQuestions: string[] = [];
      let hasQuiz = false;
      if (fs.existsSync(quizPath)) {
        try {
          const q = parseYaml(fs.readFileSync(quizPath, 'utf-8'));
          quizQuestions = (q.questions || []).map((x: any) => x.question);
          hasQuiz = quizQuestions.length > 0;
        } catch {}
      }

      const hasLab =
        (fs.existsSync(labsDir) && fs.readdirSync(labsDir).length > 0) ||
        Boolean(item.labIds && item.labIds.length > 0);

      const challengeMatch = content.match(/^##[ \t]+[^\r\n]*(?:Challenge|Thử thách)[^\r\n]*\r?\n[\s\S]*?(?=\r?\n##[ \t]+|$)/im);
      const challengeText = challengeMatch ? challengeMatch[0].trim() : '';
      const hasChallenge = challengeText.length > 40;

      // Split into paragraphs for repeated paragraph detector
      const paragraphs = content
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter((p) => p.length > 60 && !p.startsWith('#') && !p.startsWith('```'));

      lessons.push({
        id: item.id,
        title: item.title,
        moduleId: module.id,
        content,
        shingles: getShingles(content),
        paragraphs,
        quizQuestions,
        challenge: challengeText,
        hasLab,
        hasQuiz,
        hasChallenge,
      });
    }
  }

  const highSimilarityPairs: { lessonA: string; lessonB: string; similarity: number }[] = [];
  const duplicateWarnings: string[] = [];

  // 1. Shingle Jaccard Similarity across all pairs
  for (let i = 0; i < lessons.length; i++) {
    for (let j = i + 1; j < lessons.length; j++) {
      const a = lessons[i];
      const b = lessons[j];
      const sim = jaccardSimilarity(a.shingles, b.shingles);

      // Flag pairs with > 65% shingle similarity as duplicate warning
      if (sim > 0.65) {
        highSimilarityPairs.push({
          lessonA: a.id,
          lessonB: b.id,
          similarity: Math.round(sim * 100),
        });
        duplicateWarnings.push(
          `Cảnh báo trùng lặp cao (${Math.round(sim * 100)}%) giữa "${a.id}" và "${b.id}"`
        );
      }

      // Check duplicate quiz questions
      for (const qA of a.quizQuestions) {
        for (const qB of b.quizQuestions) {
          if (qA && qB && qA.trim().toLowerCase() === qB.trim().toLowerCase()) {
            duplicateWarnings.push(
              `Trùng câu hỏi trắc nghiệm giữa "${a.id}" và "${b.id}": "${qA}"`
            );
          }
        }
      }
    }
  }

  // 2. Repeated paragraph detector
  const paraMap = new Map<string, string[]>();
  for (const l of lessons) {
    for (const p of l.paragraphs) {
      const normalizedPara = p.replace(/\s+/g, ' ').toLowerCase();
      const existing = paraMap.get(normalizedPara) || [];
      existing.push(l.id);
      paraMap.set(normalizedPara, existing);
    }
  }

  const repeatedParagraphs: { paragraph: string; lessons: string[] }[] = [];
  for (const [para, lessonIds] of paraMap.entries()) {
    if (lessonIds.length > 1) {
      repeatedParagraphs.push({
        paragraph: para.substring(0, 100) + '...',
        lessons: lessonIds,
      });
      duplicateWarnings.push(
        `Đoạn văn bị sao chép nguyên văn qua ${lessonIds.length} bài (${lessonIds.join(', ')})`
      );
    }
  }

  // 3. Print LAB_COVERAGE_REPORT (Part 3)
  console.log('========================================================================');
  console.log('📊 LAB_COVERAGE_REPORT (Độ bao phủ Thực hành & Đánh giá)');
  console.log('========================================================================');
  console.log(
    `${'Lesson'.padEnd(35)} | ${'Lab'.padEnd(8)} | ${'Quiz'.padEnd(8)} | ${'Challenge'.padEnd(8)}`
  );
  console.log('------------------------------------------------------------------------');

  const labCoverage = lessons.map((l) => {
    const labIcon = l.hasLab ? '✓' : '○';
    const quizIcon = l.hasQuiz ? '✓' : '○';
    const chalIcon = l.hasChallenge ? '✓' : '○';
    console.log(
      `${l.id.padEnd(35)} | ${labIcon.padEnd(8)} | ${quizIcon.padEnd(8)} | ${chalIcon.padEnd(8)}`
    );
    return {
      lessonId: l.id,
      hasLab: l.hasLab,
      hasQuiz: l.hasQuiz,
      hasChallenge: l.hasChallenge,
    };
  });

  console.log('------------------------------------------------------------------------');
  const labCount = labCoverage.filter((c) => c.hasLab).length;
  const quizCount = labCoverage.filter((c) => c.hasQuiz).length;
  const chalCount = labCoverage.filter((c) => c.hasChallenge).length;
  console.log(
    `Tổng cộng: ${lessons.length} bài | Labs: ${labCount}/${lessons.length} | Quizzes: ${quizCount}/${lessons.length} | Challenges: ${chalCount}/${lessons.length}\n`
  );

  if (duplicateWarnings.length > 0) {
    console.warn(`⚠️ Phát hiện ${duplicateWarnings.length} cảnh báo trùng lặp nội dung:`);
    duplicateWarnings.slice(0, 10).forEach((w) => console.warn(`   • ${w}`));
    if (duplicateWarnings.length > 10) {
      console.warn(`   ...và ${duplicateWarnings.length - 10} cảnh báo khác.`);
    }
  } else {
    console.log('✅ Không phát hiện nội dung sao chép trùng lặp nào! Giáo trình hoàn toàn độc lập.');
  }

  return {
    duplicateWarnings,
    highSimilarityPairs,
    repeatedParagraphs,
    labCoverage,
  };
}

if (process.argv[1] && process.argv[1].endsWith('audit-content.ts')) {
  auditContent();
}
