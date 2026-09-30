import {
  GradeItem,
  GradePolicy,
  StudentGradeSummary,
  Assignment,
  AssignmentSubmission,
} from '@git-academy/shared';

export {
  GradeItem,
  GradePolicy,
  StudentGradeSummary,
  Assignment,
  AssignmentSubmission,
};

export type DeadlineState = 'pending' | 'submitted' | 'overdue' | 'graded';

export interface DeadlineInfo {
  state: DeadlineState;
  dueAt: string;
  isOverdue: boolean;
  timeRemainingMs: number;
  formattedRemaining: string;
}
