import fs from 'fs';
import path from 'path';
import { stringify as stringifyYaml } from 'yaml';
import { LessonAuthorData } from './types';

import { countWords, PLACEHOLDERS, CORE_TOPICS } from '../validate-content';

function assertQuality(lesson: LessonAuthorData): void {
  const errors: string[] = [];

  // Check placeholders in all textual fields
  const allText = [
    lesson.title,
    lesson.definition,
    lesson.why,
    lesson.mentalModel,
    lesson.example,
    lesson.explanation,
    lesson.hint,
    lesson.validation,
    lesson.challenge,
    ...lesson.mistakes,
    ...lesson.summary,
    ...lesson.labSteps,
  ].join(' ');

  for (const p of PLACEHOLDERS) {
    if (allText.includes(p)) {
      errors.push(`Phát hiện placeholder bị cấm: "${p}"`);
    }
  }

  const defWords = countWords(lesson.definition);
  if (defWords < 80) errors.push(`Định nghĩa quá ngắn (${defWords} < 80 từ)`);

  const whyWords = countWords(lesson.why);
  if (whyWords < 80) errors.push(`Tại sao cần quá ngắn (${whyWords} < 80 từ)`);

  const mmWords = countWords(lesson.mentalModel);
  if (mmWords < 80) errors.push(`Mental Model quá ngắn (${mmWords} < 80 từ)`);

  const exWords = countWords(lesson.example);
  if (exWords < 100) errors.push(`Ví dụ thực tế quá ngắn (${exWords} < 100 từ)`);

  const hasGit = lesson.commands.some((c) => c.includes('git '));
  if (hasGit) {
    const expWords = countWords(lesson.explanation);
    if (expWords < 40) errors.push(`Giải thích command quá ngắn (${expWords} < 40 từ)`);
  }

  if (lesson.mistakes.length < 3) errors.push(`Cần tối thiểu 3 sai lầm phổ biến`);
  if (lesson.summary.length < 3) errors.push(`Cần tối thiểu 3 ý tổng kết`);

  const isCore = CORE_TOPICS.some((t) => lesson.id.includes(t));
  const minQuestions = isCore ? 6 : 4;
  if (!lesson.quiz || lesson.quiz.questions.length < minQuestions) {
    errors.push(
      `Quiz cần tối thiểu ${minQuestions} câu hỏi (hiện có ${lesson.quiz?.questions.length || 0})`
    );
  }

  if (errors.length > 0) {
    throw new Error(
      `❌ [QUALITY GATE FAILED] ${lesson.moduleId}/${lesson.id}:\n  - ${errors.join('\n  - ')}`
    );
  }
}

export function writeLessonFiles(lesson: LessonAuthorData, overwriteExisting = false): void {
  assertQuality(lesson);

  const rootDir = process.cwd();
  const lessonDir = path.resolve(rootDir, 'courses', lesson.moduleId, lesson.id);

  if (!fs.existsSync(lessonDir)) {
    fs.mkdirSync(lessonDir, { recursive: true });
  }

  const metaPath = path.join(lessonDir, 'metadata.yml');
  const lessonPath = path.join(lessonDir, 'lesson.md');
  const quizPath = path.join(lessonDir, 'quiz.yml');

  // Check if authored file exists and shouldn't be overwritten
  if (fs.existsSync(lessonPath) && !overwriteExisting) {
    console.log(`⏩ [SKIP] Lesson already authored: ${lesson.id}`);
    return;
  }

  // 1. Write metadata.yml
  const metadataContent = stringifyYaml({
    id: lesson.id,
    title: lesson.title,
    duration: lesson.duration,
    xp: lesson.xp,
    keywords: lesson.keywords,
    prerequisites: lesson.prerequisites,
    objectives: lesson.objectives,
    commands: lesson.commands,
  });
  fs.writeFileSync(metaPath, metadataContent, 'utf-8');

  // 2. Write lesson.md
  const markdownContent = `# ${lesson.title}

---

## 🎯 Mục tiêu
${lesson.objectives.map((o) => `- ${o}`).join('\n')}

---

## 📖 Định nghĩa
> ${lesson.definition}

---

## 🤔 Tại sao cần?
${lesson.why}

---

## 🧠 Mental Model (Mô hình tư duy)
${lesson.mentalModel}

---

## 🖼 Sơ đồ
\`\`\`text
${lesson.diagram}
\`\`\`

---

## 🌎 Ví dụ thực tế
${lesson.example}

---

## 💻 Command
\`\`\`bash
${lesson.commands.join('\n')}
\`\`\`

---

## 🔍 Giải thích command
${lesson.explanation}

---

## ⚠️ Sai lầm phổ biến
${lesson.mistakes.map((m, i) => `${i + 1}. **${m.split(':')[0]}**: ${m.split(':')[1] || m}`).join('\n')}

---

## 🧪 Lab
${lesson.labSteps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

---

## 💡 Hint
> ${lesson.hint}

---

## ✅ Validation
- ${lesson.validation}

---

## ❓ Quiz
${lesson.quizPrompt}

---

## 🔥 Challenge
${lesson.challenge}

---

## 📚 Tổng kết
${lesson.summary.map((s) => `- ${s}`).join('\n')}
`;

  fs.writeFileSync(lessonPath, markdownContent, 'utf-8');

  // 3. Write quiz.yml
  const quizYamlContent = stringifyYaml({
    id: lesson.quiz.id,
    title: lesson.quiz.title,
    questions: lesson.quiz.questions,
  });
  fs.writeFileSync(quizPath, quizYamlContent, 'utf-8');

  console.log(`✍️ [AUTHORED] ${lesson.moduleId}/${lesson.id} - ${lesson.title}`);
}
