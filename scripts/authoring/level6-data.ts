import { LessonAuthorData } from './types';
import { LEVEL_6A_LESSONS } from './level6a-data';
import { LEVEL_6B_LESSONS } from './level6b-data';

export const LEVEL_6_LESSONS: LessonAuthorData[] = [
  ...LEVEL_6A_LESSONS,
  ...LEVEL_6B_LESSONS,
];
