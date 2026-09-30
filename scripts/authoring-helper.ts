import fs from 'fs';
import path from 'path';
import { stringify as stringifyYaml } from 'yaml';

interface LessonPlan {
  id: string;
  title: string;
  duration: number;
  xp: number;
  prerequisites: string[];
  labIds?: string[];
  keywords: string[];
  objectives: string[];
  commands: string[];
  definition: string;
  why: string;
  mentalModel: string;
  diagram: string;
  example: string;
  commandSnippet: string;
  commandExplanation: string;
  mistakes: string[];
  labSteps: string[];
  hint: string;
  validation: string;
  quizIntro: string;
  challenge: string;
  summary: string[];
  quizQuestions: {
    id: string;
    question: string;
    options: { text: string; correct: boolean }[];
    explanation: string;
  }[];
}

export function authorLessonsForModule(moduleId: string, plans: LessonPlan[]): void {
  const rootDir = process.cwd();
  const moduleDir = path.resolve(rootDir, 'courses', moduleId);
  if (!fs.existsSync(moduleDir)) {
    fs.mkdirSync(moduleDir, { recursive: true });
  }

  for (const plan of plans) {
    const lessonDir = path.resolve(moduleDir, plan.id);
    if (!fs.existsSync(lessonDir)) {
      fs.mkdirSync(lessonDir, { recursive: true });
    }

    // 1. metadata.yml
    const meta = {
      id: plan.id,
      title: plan.title,
      duration: plan.duration,
      xp: plan.xp,
      keywords: plan.keywords,
      prerequisites: plan.prerequisites,
      objectives: plan.objectives,
      commands: plan.commands,
    };
    fs.writeFileSync(path.join(lessonDir, 'metadata.yml'), stringifyYaml(meta), 'utf-8');

    // 2. quiz.yml
    const quiz = {
      id: `quiz-${moduleId}-${plan.id}`,
      title: `Trắc nghiệm: ${plan.title}`,
      questions: plan.quizQuestions.map((q) => ({
        id: q.id,
        question: q.question,
        type: 'single',
        options: q.options,
        explanation: q.explanation,
      })),
    };
    fs.writeFileSync(path.join(lessonDir, 'quiz.yml'), stringifyYaml(quiz), 'utf-8');

    // 3. lesson.md
    const mistakesFormatted = plan.mistakes.map((m, idx) => `${idx + 1}. **${m.split(':')[0]}**: ${m.split(':').slice(1).join(':')}`).join('\n');
    const summaryFormatted = plan.summary.map((s) => `- ${s}`).join('\n');
    const labFormatted = plan.labSteps.map((s, idx) => `${idx + 1}. ${s}`).join('\n');

    const content = `# ${plan.title}

---

## 🎯 Mục tiêu bài học
${plan.objectives.map((o) => `- ${o}`).join('\n')}

---

## 📖 Định nghĩa
> ${plan.definition}

---

## 🤔 Tại sao cần?
${plan.why}

---

## 🧠 Mental Model & Mô hình tư duy
${plan.mentalModel}

---

## 🖼️ Sơ đồ minh họa
\`\`\`text
${plan.diagram}
\`\`\`

---

## 🌎 Ví dụ thực tế
${plan.example}

---

## 💻 Command & Lệnh thao tác
\`\`\`bash
${plan.commandSnippet}
\`\`\`

---

## 🔍 Giải thích chi tiết lệnh
${plan.commandExplanation}

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
${mistakesFormatted}

---

## 🧪 Bài thực hành Lab (Hands-on)
${labFormatted}

---

## 💡 Gợi ý thực hiện (Hint)
> ${plan.hint}

---

## ✅ Kiểm tra kết quả (Validation)
${plan.validation}

---

## ❓ Câu hỏi ôn tập (Quiz)
${plan.quizIntro}

---

## 🔥 Thử thách nâng cao (Challenge)
${plan.challenge}

---

## 📚 Tổng kết kiến thức
${summaryFormatted}
`;

    fs.writeFileSync(path.join(lessonDir, 'lesson.md'), content, 'utf-8');
    console.log(`✅ [Authored] ${moduleId}/${plan.id} - ${plan.title}`);
  }
}
