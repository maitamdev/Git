import fs from 'fs';
import path from 'path';
import { parse as parseYaml } from 'yaml';
import { CourseManifest, QuizQuestion } from '@git-academy/shared';
import { BUILTIN_SCENARIOS } from '@git-academy/git-scenarios';
import { buildLessonSlides, requiredLabsFor } from '../apps/playground/src/learning/lesson-flow';

const rootDir = process.cwd();
const manifest: CourseManifest = JSON.parse(fs.readFileSync(path.resolve(rootDir, 'courses/courses-manifest.json'), 'utf-8'));

interface LessonAuditDetail {
  levelNumber: number;
  moduleId: string;
  moduleTitle: string;
  lessonNumber: number;
  lessonId: string;
  title: string;
  objectivesCount: number;
  prerequisites: string[];
  slidesCount: number;
  labId?: string;
  labTitle?: string;
  labRequired: boolean;
  quizCount: number;
  quizQuestionsValid: boolean;
  status: 'Đã sửa' | 'Chưa kiểm chứng';
  notes: string;
}

const auditList: LessonAuditDetail[] = [];

for (let mIdx = 0; mIdx < manifest.curriculum.length; mIdx++) {
  const mod = manifest.curriculum[mIdx];
  for (let lIdx = 0; lIdx < mod.lessons.length; lIdx++) {
    const entry = mod.lessons[lIdx];
    const lessonDir = path.resolve(rootDir, 'courses', mod.id, entry.id);
    const lessonMd = fs.readFileSync(path.join(lessonDir, 'lesson.md'), 'utf-8');
    const quizData = parseYaml(fs.readFileSync(path.join(lessonDir, 'quiz.yml'), 'utf-8'));
    const questions: QuizQuestion[] = quizData?.questions || (Array.isArray(quizData) ? quizData : []);

    const mockLesson: any = {
      id: entry.id,
      moduleId: mod.id,
      title: entry.title,
      description: entry.description,
      duration: entry.duration,
      objectives: entry.objectives || [],
      prerequisites: entry.prerequisites || [],
      metadata: {
        id: entry.id,
        title: entry.title,
        description: entry.description,
        difficulty: entry.difficulty,
        duration: entry.duration,
        xp: entry.xp || 50,
        completion: { theory: true, quiz: { minimumScore: 75 }, lab: Boolean(entry.labIds?.length) },
      },
      content: lessonMd,
      quiz: {
        id: quizData?.id || `quiz-${entry.id}`,
        title: quizData?.title || entry.title,
        passingScore: quizData?.passingScore || 75,
        questions,
      },
    };

    const slides = buildLessonSlides(mockLesson);
    const requiredLabs = requiredLabsFor(manifest, mIdx, mockLesson);
    const labId = entry.labIds?.[0];
    const scenario = labId ? (BUILTIN_SCENARIOS as any)[labId] : undefined;

    let notes = `Kiểm tra cấu trúc tự động: ${slides.length} màn, ${questions.length} câu quiz. Độ chính xác nội dung, chất lượng sư phạm và đáp án chưa được người rà soát xác nhận.`;
    let status: 'Đã sửa' | 'Chưa kiểm chứng' = 'Chưa kiểm chứng';

    if (entry.id === '01-version-control') {
      notes = 'Đã chuẩn hóa tiêu đề màn hình hook: "Vì sao cần lưu phiên bản?", chia 6 màn trực quan, quiz gắn liền với tình huống.';
      status = 'Đã sửa';
    } else if (labId === 'git-config-lab') {
      notes = 'Đã bổ sung ràng buộc thực thi lệnh git config user.name/email trong validator để tránh auto-pass từ trạng thái mặc định.';
      status = 'Đã sửa';
    } else if (mod.id === '08-git-internals' && (labId || entry.id === '20-build-commit-manually-capstone')) {
      notes = 'Tích hợp GuidedPlumbingSession hỗ trợ các plumbing command (hash-object, update-index, write-tree, commit-tree, update-ref).';
      status = 'Đã sửa';
    } else if (labId) {
      notes = `Đã liên kết tới scenario ${scenario?.title || labId}; cần chạy toàn bộ thao tác của người học để xác nhận lab hoàn thành được.`;
    }

    if (!questions.every((q) => q.explanation && q.explanation.length > 5)) {
      status = 'Chưa kiểm chứng';
      notes += ' Một số câu quiz thiếu phần giải thích đủ dài.';
    }

    auditList.push({
      levelNumber: mIdx + 1,
      moduleId: mod.id,
      moduleTitle: mod.title,
      lessonNumber: lIdx + 1,
      lessonId: entry.id,
      title: entry.title,
      objectivesCount: entry.objectives?.length || 0,
      prerequisites: entry.prerequisites || [],
      slidesCount: slides.length,
      labId,
      labTitle: scenario?.title,
      labRequired: requiredLabs.includes(labId || ''),
      quizCount: questions.length,
      quizQuestionsValid: questions.every((q) => q.explanation && q.explanation.length > 5),
      status,
      notes,
    });
  }
}

// Write markdown report
let md = `# Kiểm Kê Cấu Trúc Giáo Trình — Git Academy

Tài liệu này là bảng kiểm kê tự động 128 bài học, 588 câu hỏi quiz, 76 bài có lab và 77 scenario. Bảng xác nhận dữ liệu có thể nạp và một số thuộc tính cấu trúc; nó **không xác nhận** độ chính xác kỹ thuật của toàn bộ nội dung, chất lượng sư phạm, tính đúng của đáp án hoặc khả năng hoàn thành mọi lab.

## 1. Tổng quan & Phương pháp Audit

- **Đã kiểm tra bằng máy**: số lượng bài, tải lesson/quiz YAML, số slide do parser tạo, và liên kết scenario có khai báo trong manifest.
- **Chưa được xác nhận ở bảng này**: tính đúng của nội dung Git, câu trả lời quiz, chất lượng giảng dạy từng slide, mọi đường thao tác của 77 scenario, và luồng chạy trên API thật.
- Mọi bài có trạng thái **Chưa kiểm chứng** cần được người rà soát kiểm tra nội dung và lab, ghi bằng chứng cụ thể rồi mới đổi trạng thái.

---

## 2. Thống kê theo Level

| Level | Tên Level | Số bài | Số bài có Lab | Tổng số Quiz | Trạng thái |
| :---: | :--- | :---: | :---: | :---: | :---: |
`;

for (let i = 0; i < manifest.curriculum.length; i++) {
  const mod = manifest.curriculum[i];
  const lessonsInMod = auditList.filter((a) => a.moduleId === mod.id);
  const labCount = lessonsInMod.filter((a) => a.labId).length;
  const quizCount = lessonsInMod.reduce((sum, a) => sum + a.quizCount, 0);
  const changedCount = lessonsInMod.filter((a) => a.status === 'Đã sửa').length;
  const unverifiedCount = lessonsInMod.length - changedCount;
  md += `| ${i + 1} | ${mod.title} (\`${mod.id}\`) | ${mod.lessons.length} | ${labCount} | ${quizCount} | ${changedCount} có thay đổi ghi nhận; ${unverifiedCount} chưa kiểm chứng nội dung |\n`;
}

const totalLabs = auditList.filter((a) => a.labId).length;
const totalQuizzes = auditList.reduce((sum, a) => sum + a.quizCount, 0);
const changedTotal = auditList.filter((a) => a.status === 'Đã sửa').length;
md += `| **Tổng** | **Toàn bộ 8 Level** | **${auditList.length}** | **${totalLabs}** | **${totalQuizzes}** | **${changedTotal} có thay đổi ghi nhận; ${auditList.length - changedTotal} chưa kiểm chứng nội dung** |\n\n---\n\n`;

md += `## 3. Bảng Kiểm Kê Từng Bài (128/128 Bài)\n\n`;
md += `| Level | STT | Mã bài (Lesson ID) | Tên bài học | Slides | Lab thực hành | Quiz | Trạng thái | Đánh giá & Ghi chú kỹ thuật |\n`;
md += `| :---: | :---: | :--- | :--- | :---: | :--- | :---: | :---: | :--- |\n`;

for (const a of auditList) {
  const labText = a.labId ? `\`${a.labId}\`${a.labRequired ? ' *(Bắt buộc)*' : ''}` : '—';
  md += `| L${a.levelNumber} | ${a.lessonNumber} | \`${a.lessonId}\` | ${a.title} | ${a.slidesCount} | ${labText} | ${a.quizCount} câu | **${a.status}** | ${a.notes} |\n`;
}

md += `\n---\n
## 4. Trạng thái nghiệm thu

Đây chưa phải biên bản nghiệm thu phát hành. Những thay đổi như Guided Course và plumbing session cần được kiểm thử riêng; các dòng có trạng thái **Chưa kiểm chứng** vẫn cần rà nội dung và thực hành. Không dùng tài liệu này làm bằng chứng rằng ứng dụng đã chạy với database bền vững hoặc staging thật.
`;

fs.writeFileSync(path.resolve(rootDir, 'docs/curriculum-audit.md'), md, 'utf-8');
console.log(`Generated structural inventory for ${auditList.length} lessons. Content correctness is not certified by this script.`);
