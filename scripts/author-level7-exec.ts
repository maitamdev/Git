import { authorLessonsForModule } from './authoring-helper';
import { LEVEL7_PART1 } from './data/level7-lessons-part1';
import { LEVEL7_PART2 } from './data/level7-lessons-part2';

const allLevel7Plans = [...LEVEL7_PART1, ...LEVEL7_PART2];
console.log(`Writing ${allLevel7Plans.length} authored lessons for Level 7: GitHub Actions & CI/CD...`);
authorLessonsForModule('07-github-actions', allLevel7Plans);
console.log('✅ Level 7 authoring complete!');
