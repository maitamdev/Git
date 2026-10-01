import type { CourseLesson } from '@git-academy/shared';
import { inspectTermCards, parseLessonSections } from './lesson-flow';

export function countLessonWords(value: string): number {
  return value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]+`/g, ' ')
    .replace(/[#*_>:[\]()|]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export function calculateLessonContentMetrics(lesson: CourseLesson | null) {
  if (!lesson) return null;
  const sections = parseLessonSections(lesson.content || '');
  const sectionText = (pattern: RegExp) => sections.find((section) => pattern.test(section.heading))?.body || '';
  const placeholders = ['TODO', 'TBD', 'Coming soon', 'Lorem ipsum'];
  const foundPlaceholders = placeholders.filter((placeholder) => (lesson.content || '').includes(placeholder));
  const isCore = ['commit', 'branch', 'merge', 'conflict', 'remote', 'fetch', 'pull', 'push', 'pull-request', 'pr']
    .some((topic) => lesson.id.includes(topic));
  const minQ = isCore ? 6 : 4;
  const termCards = inspectTermCards(lesson.content || '');
  const qCount = lesson.quiz?.questions?.length || 0;

  const result = {
    defWords: countLessonWords(sectionText(/định nghĩa/i)),
    whyWords: countLessonWords(sectionText(/tại sao cần/i)),
    mmWords: countLessonWords(sectionText(/mental model|mô hình tư duy/i)),
    exWords: countLessonWords(sectionText(/ví dụ thực tế/i)),
    termCards,
    foundPlaceholders,
    qCount,
    minQ,
    isCore,
    passes: termCards.complete && foundPlaceholders.length === 0 && qCount >= minQ,
  };
  return result;
}
