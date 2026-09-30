import { DeadlineInfo, DeadlineState } from './types.js';

export class DeadlineManager {
  public static computeDeadlineInfo(
    dueAtUtc: string,
    submittedAtUtc?: string,
    isGraded = false,
    nowMs: number = Date.now()
  ): DeadlineInfo {
    const dueMs = new Date(dueAtUtc).getTime();
    const timeRemainingMs = dueMs - nowMs;
    const isOverdue = timeRemainingMs < 0;

    let state: DeadlineState = 'pending';
    if (isGraded) {
      state = 'graded';
    } else if (submittedAtUtc) {
      state = 'submitted';
    } else if (isOverdue) {
      state = 'overdue';
    }

    let formattedRemaining = '';
    if (state === 'graded') {
      formattedRemaining = 'Đã chấm điểm';
    } else if (state === 'submitted') {
      formattedRemaining = 'Đã nộp bài';
    } else if (isOverdue) {
      const overdueDays = Math.floor(Math.abs(timeRemainingMs) / (1000 * 60 * 60 * 24));
      const overdueHours = Math.floor(
        (Math.abs(timeRemainingMs) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      if (overdueDays > 0) {
        formattedRemaining = `Quá hạn ${overdueDays} ngày`;
      } else {
        formattedRemaining = `Quá hạn ${Math.max(1, overdueHours)} giờ`;
      }
    } else {
      const days = Math.floor(timeRemainingMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemainingMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      if (days > 0) {
        formattedRemaining = `Còn ${days} ngày`;
      } else if (hours > 0) {
        formattedRemaining = `Còn ${hours} giờ`;
      } else {
        formattedRemaining = 'Hạn chót hôm nay';
      }
    }

    return {
      state,
      dueAt: dueAtUtc,
      isOverdue,
      timeRemainingMs,
      formattedRemaining,
    };
  }
}
