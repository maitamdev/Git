import { LessonAuthorData } from './types';
import { LEVEL_5A_LESSONS } from './level5a-data';
import { LEVEL_5B_LESSONS } from './level5b-data';

export const LEVEL_5_LESSONS: LessonAuthorData[] = [
  ...LEVEL_5A_LESSONS,
  ...LEVEL_5B_LESSONS,
];
