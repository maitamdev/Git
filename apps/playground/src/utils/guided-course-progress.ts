export interface LessonStageLike {
  type: string;
}

export function findLastContentStageIndex(stages: readonly LessonStageLike[]): number {
  for (let index = stages.length - 1; index >= 0; index -= 1) {
    if (stages[index].type === 'content') return index;
  }
  return -1;
}
