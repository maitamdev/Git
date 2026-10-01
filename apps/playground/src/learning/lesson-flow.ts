import type { CourseLesson, CourseManifest } from '@git-academy/shared';

export type LearningSlideKind = 'intro' | 'story' | 'term' | 'concept' | 'model' | 'example' | 'command' | 'practice' | 'mistake' | 'summary';

export interface LearningSlide {
  id: string;
  kind: LearningSlideKind;
  title: string;
  body: string;
  detail?: string;
  code?: string;
  termExample?: string;
  termContrast?: string;
  practiceSteps?: string[];
  practiceCheck?: string;
  practiceHint?: string;
  index: number;
}

export function requiredLabsFor(manifest: CourseManifest, moduleIndex: number, lesson: CourseLesson): string[] {
  const declared = lesson.metadata.completion?.labs || [];
  const module = manifest.curriculum[moduleIndex];
  const isLevelFinal = module?.lessons.at(-1)?.id === lesson.id;
  const capstoneLabs = isLevelFinal ? module.lessons.at(-1)?.labIds || [] : [];
  return Array.from(new Set([...declared, ...capstoneLabs]));
}

interface Section { heading: string; body: string }

const normalized = (value: string) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');

export function parseLessonSections(markdown: string): Section[] {
  const parts = markdown.split(/^##\s+/m).slice(1);
  return parts.map((part) => {
    const lineEnd = part.indexOf('\n');
    return {
      heading: part.slice(0, lineEnd).trim(),
      body: part.slice(lineEnd + 1).replace(/^---\s*$/gm, '').trim(),
    };
  });
}

function cleanText(value: string): string {
  return value
    .replace(/^>\s?/gm, '')
    .replace(/^[-*]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/\*\*/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function splitReading(value: string, maxLength = 275): string[] {
  const plain = cleanText(value);
  if (!plain) return [];
  const sentences = plain.split(/(?<=[.!?])\s+(?=[A-ZÀ-Ỹ])/u);
  const chunks: string[] = [];
  let current = '';
  for (const sentence of sentences) {
    if (current && current.length + sentence.length + 1 > maxLength) {
      chunks.push(current);
      current = '';
    }
    current = current ? `${current} ${sentence}` : sentence;
  }
  if (current) chunks.push(current);
  return chunks;
}

function firstSection(sections: Section[], pattern: RegExp): Section | undefined {
  return sections.find((section) => pattern.test(normalized(section.heading)));
}

function readTermCards(body: string): Array<{ name: string; meaning: string; example: string; contrast: string }> {
  return body.split(/^###\s+/m).slice(1).flatMap((part) => {
    const lineEnd = part.indexOf('\n');
    if (lineEnd < 0) return [];
    const name = cleanText(part.slice(0, lineEnd));
    const text = part.slice(lineEnd + 1);
    const field = (label: string) => {
      const match = text.match(new RegExp(`^\\s*[-*]?\\s*\\*{0,2}${label}\\*{0,2}:\\s*(.+)$`, 'im'));
      return match?.[1] ? cleanText(match[1]) : '';
    };
    const meaning = field('Nói dễ hiểu');
    const example = field('Ví dụ');
    const contrast = field('Đừng nhầm');
    return name && meaning ? [{ name, meaning, example, contrast }] : [];
  });
}

export function inspectTermCards(markdown: string): { count: number; completeCount: number; complete: boolean; names: string[] } {
  const section = firstSection(parseLessonSections(markdown), /tu khoa|thuat ngu/);
  const parts = section?.body.split(/^###\s+/m).slice(1) || [];
  const cards = parts.map((part) => {
    const lineEnd = part.indexOf('\n');
    const name = cleanText(lineEnd < 0 ? part : part.slice(0, lineEnd));
    const labelsPresent = ['Nói dễ hiểu', 'Ví dụ', 'Đừng nhầm'].every((label) =>
      new RegExp(`^\\s*[-*]?\\s*\\*{0,2}${label}\\*{0,2}:\\s*\\S`, 'im').test(part),
    );
    return { name, labelsPresent };
  });
  const completeCount = cards.filter((card) => card.name && card.labelsPresent).length;
  return {
    count: cards.length,
    completeCount,
    complete: cards.length >= 2 && cards.length <= 5 && completeCount === cards.length,
    names: cards.map((card) => card.name).filter(Boolean),
  };
}

function readListItems(body: string): string[] {
  return body.split('\n')
    .filter((line) => /^\s*(?:[-*]|\d+[.)])\s+/.test(line))
    .map(cleanText)
    .filter(Boolean);
}

export function buildLessonSlides(lesson: CourseLesson): LearningSlide[] {
  const sections = parseLessonSections(lesson.content);
  const slides: LearningSlide[] = [];
  const add = (kind: LearningSlideKind, title: string, body: string, code?: string, detail?: string) => {
    if (!body && !code) return;
    slides.push({ id: `${kind}-${slides.length}`, kind, title, body, code, detail, index: slides.length });
  };

  const objectives = firstSection(sections, /muc tieu/);
  const objectiveLines = objectives?.body.split('\n').map(cleanText).filter(Boolean).slice(0, 3) || [];
  add('intro', lesson.metadata.title, objectiveLines[0] || lesson.metadata.objectives[0] || 'Cùng giải quyết một tình huống Git thực tế.', undefined, objectiveLines.join('\n'));

  const terms = firstSection(sections, /tu khoa|thuat ngu/);
  const addTermSlides = () => {
    for (const term of readTermCards(terms?.body || '')) {
      slides.push({
        id: `term-${slides.length}`,
        kind: 'term',
        title: term.name,
        body: term.meaning,
        termExample: term.example,
        termContrast: term.contrast,
        index: slides.length,
      });
    }
  };
  let termSlidesAdded = false;

  const readingSections: Array<[LearningSlideKind, RegExp, string]> = [
    ['story', /tai sao can/, 'Vấn đề bạn sẽ giải quyết'],
    ['concept', /dinh nghia/, 'Một ý cần nhớ'],
    ['model', /mental model|mo hinh tu duy/, 'Hình dung theo cách này'],
    ['example', /vi du thuc te/, 'Thử nhìn vào tình huống thật'],
  ];
  for (const [kind, pattern, title] of readingSections) {
    const section = firstSection(sections, pattern);
    if (!section) continue;
    const chunks = splitReading(section.body, 210);
    add(kind, title, chunks[0] || '', undefined, chunks.slice(1).join(' '));
    if (kind === 'story') {
      addTermSlides();
      termSlidesAdded = true;
    }
  }
  if (!termSlidesAdded) addTermSlides();

  const diagram = firstSection(sections, /so do/);
  const diagramCode = diagram?.body.match(/```(?:text|bash)?\s*\n([\s\S]*?)```/)?.[1]?.trim();
  if (diagramCode) add('model', 'Nhìn sự thay đổi', '', diagramCode);

  const command = firstSection(sections, /command|lenh thao tac/);
  const commandCode = command?.body.match(/```(?:bash|text)?\s*\n([\s\S]*?)```/)?.[1]?.trim();
  if (commandCode && lesson.id !== '01-version-control') {
    const explanation = firstSection(sections, /giai thich.*command|giai thich.*lenh/);
    add('command', 'Xem mẫu lệnh', 'Quan sát lệnh và dự đoán điều gì sẽ thay đổi trước khi thử.', commandCode, explanation ? cleanText(explanation.body) : undefined);
  }

  const practice = firstSection(sections, /lab|bai thuc hanh/);
  const hasVisibleScenario = Boolean(lesson.labScenarios?.length) && lesson.id !== '01-version-control';
  if (practice && !hasVisibleScenario) {
    const practiceCheck = firstSection(sections, /validation|kiem tra ket qua/);
    const practiceHint = firstSection(sections, /hint|goi y/);
    const prompt = practice.body.split('\n').filter((line) => !/^\s*(?:[-*]|\d+[.)])\s+/.test(line)).map(cleanText).filter(Boolean).join(' ');
    add('practice', 'Đến lượt bạn thử', prompt || 'Hoàn thành từng bước nhỏ dưới đây bằng lời giải thích hoặc thao tác của bạn.', undefined, undefined);
    const slide = slides.at(-1)!;
    slide.practiceSteps = readListItems(practice.body);
    slide.practiceHint = practiceHint ? cleanText(practiceHint.body) : undefined;
    slide.practiceCheck = practiceCheck ? cleanText(practiceCheck.body) : undefined;
  }

  const mistakes = firstSection(sections, /sai lam pho bien/);
  if (mistakes) {
    const lines = mistakes.body.split('\n').map(cleanText).filter(Boolean);
    add('mistake', 'Tránh lỗi này', lines[0] || '', undefined, lines.slice(1).join('\n'));
  }

  const summary = firstSection(sections, /tong ket/);
  const summaryLines = summary?.body.split('\n').map(cleanText).filter(Boolean).slice(0, 3) || [];
  add('summary', 'Bạn vừa học được gì?', summaryLines[0] || lesson.metadata.objectives[0] || '', undefined, summaryLines.slice(1).join('\n'));
  return slides;
}
