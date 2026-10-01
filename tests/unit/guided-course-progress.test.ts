import { describe, expect, it } from 'vitest';
import { findLastContentStageIndex } from '../../apps/playground/src/utils/guided-course-progress';

describe('guided course content progress', () => {
  it('finds the last visible content stage when other slide kinds were filtered out', () => {
    const stages = [
      { type: 'content' },
      { type: 'content' },
      { type: 'lab' },
      { type: 'quiz' },
      { type: 'complete' },
    ];

    expect(findLastContentStageIndex(stages)).toBe(1);
  });

  it('returns -1 when a lesson has no content stages', () => {
    expect(findLastContentStageIndex([{ type: 'lab' }, { type: 'quiz' }])).toBe(-1);
  });
});
