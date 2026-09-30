import { authorLessonsForModule } from './authoring-helper';
import { LEVEL8_PART1 } from './data/level8-lessons-part1';
import { LEVEL8_PART2 } from './data/level8-lessons-part2';
import { LEVEL8_PART3 } from './data/level8-lessons-part3';

const allLevel8Plans = [...LEVEL8_PART1, ...LEVEL8_PART2, ...LEVEL8_PART3];
console.log(`Writing ${allLevel8Plans.length} authored lessons for Level 8: Git Internals...`);
authorLessonsForModule('08-git-internals', allLevel8Plans);
console.log('✅ Level 8 authoring complete!');
