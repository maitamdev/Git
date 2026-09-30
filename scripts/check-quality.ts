import { LEVEL_1_LESSONS } from './authoring/level1-data';
import { LEVEL_2_LESSONS } from './authoring/level2-data';
import { LEVEL_3_LESSONS } from './authoring/level3-data';
import { LEVEL_4_LESSONS } from './authoring/level4-data';
import { LEVEL_5_LESSONS } from './authoring/level5-data';
import { LEVEL_6_LESSONS } from './authoring/level6-data';
import { countWords, CORE_TOPICS, PLACEHOLDERS } from './validate-content';

function checkLessons(name: string, lessons: any[]) {
  console.log(`=== Checking ${name} (${lessons.length} lessons) ===`);
  for (const lesson of lessons) {
    const issues: string[] = [];
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
        issues.push(`placeholder: "${p}"`);
      }
    }

    const def = countWords(lesson.definition);
    if (def < 80) issues.push(`def(${def} < 80)`);

    const why = countWords(lesson.why);
    if (why < 80) issues.push(`why(${why} < 80)`);

    const mm = countWords(lesson.mentalModel);
    if (mm < 80) issues.push(`mm(${mm} < 80)`);

    const ex = countWords(lesson.example);
    if (ex < 100) issues.push(`ex(${ex} < 100)`);

    const hasGit = lesson.commands?.some((c: string) => c.includes('git '));
    if (hasGit) {
      const exp = countWords(lesson.explanation);
      if (exp < 40) issues.push(`exp(${exp} < 40)`);
    }

    if (!lesson.mistakes || lesson.mistakes.length < 3) {
      issues.push(`mistakes(${lesson.mistakes?.length || 0} < 3)`);
    }

    if (!lesson.summary || lesson.summary.length < 3) {
      issues.push(`summary(${lesson.summary?.length || 0} < 3)`);
    }

    const isCore = CORE_TOPICS.some((t) => lesson.id.includes(t));
    const minQ = isCore ? 6 : 4;
    const qCount = lesson.quiz?.questions?.length || 0;
    if (qCount < minQ) {
      issues.push(`quiz(${qCount} < ${minQ})`);
    }

    if (issues.length > 0) {
      console.log(`❌ ${lesson.id}: ${issues.join(', ')}`);
    } else {
      console.log(`✅ ${lesson.id}: PASS`);
    }
  }
}

checkLessons('Level 1', LEVEL_1_LESSONS);
checkLessons('Level 2', LEVEL_2_LESSONS);
checkLessons('Level 3', LEVEL_3_LESSONS);
checkLessons('Level 4', LEVEL_4_LESSONS);
checkLessons('Level 5', LEVEL_5_LESSONS);
checkLessons('Level 6', LEVEL_6_LESSONS);

