import { writeLessonFiles } from './authoring/writer';
import { LEVEL_1_LESSONS } from './authoring/level1-data';
import { LEVEL_2_LESSONS } from './authoring/level2-data';
import { LEVEL_3_LESSONS } from './authoring/level3-data';
import { LEVEL_4_LESSONS } from './authoring/level4-data';
import { LEVEL_5_LESSONS } from './authoring/level5-data';
import { LEVEL_6_LESSONS } from './authoring/level6-data';

console.log(`Writing ${LEVEL_1_LESSONS.length} Level 1 lessons...`);
for (const lesson of LEVEL_1_LESSONS) {
  writeLessonFiles(lesson, true);
}

console.log(`Writing ${LEVEL_2_LESSONS.length} Level 2 lessons...`);
for (const lesson of LEVEL_2_LESSONS) {
  writeLessonFiles(lesson, true);
}

console.log(`Writing ${LEVEL_3_LESSONS.length} Level 3 lessons...`);
for (const lesson of LEVEL_3_LESSONS) {
  writeLessonFiles(lesson, true);
}

console.log(`Writing ${LEVEL_4_LESSONS.length} Level 4 lessons...`);
for (const lesson of LEVEL_4_LESSONS) {
  writeLessonFiles(lesson, true);
}

console.log(`Writing ${LEVEL_5_LESSONS.length} Level 5 lessons...`);
for (const lesson of LEVEL_5_LESSONS) {
  writeLessonFiles(lesson, true);
}

console.log(`Writing ${LEVEL_6_LESSONS.length} Level 6 lessons...`);
for (const lesson of LEVEL_6_LESSONS) {
  writeLessonFiles(lesson, true);
}
console.log('Done writing Level 1, 2, 3, 4, 5, 6 lessons (all 88 lessons)!');



