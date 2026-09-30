import { LessonAuthorData } from './types';
import { LEVEL_4A_LESSONS } from './level4a-data';
import { LEVEL_4B_LESSONS } from './level4b-data';

export const LEVEL_4_LESSONS: LessonAuthorData[] = [
  ...LEVEL_4A_LESSONS,
  ...LEVEL_4B_LESSONS,
];
