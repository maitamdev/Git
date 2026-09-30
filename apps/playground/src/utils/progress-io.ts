import type { CourseProgress } from '@git-academy/shared';
import { isValidCourseProgress } from './storage-recovery';

export interface ProgressExportPayload {
  format: 'git-academy-progress';
  version: number;
  exportedAt: string;
  checksum: string;
  data: CourseProgress;
}

/**
 * Calculates a simple fast djb2 hash checksum of a string.
 */
function computeChecksum(str: string): string {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

/**
 * Serializes user progress into a validated, checksummed JSON string.
 */
export function exportProgressToJson(progress: CourseProgress): string {
  if (!isValidCourseProgress(progress)) {
    throw new Error('Không thể xuất dữ liệu tiến độ: Dữ liệu không hợp lệ.');
  }

  const dataStr = JSON.stringify(progress);
  const checksum = computeChecksum(dataStr);

  const payload: ProgressExportPayload = {
    format: 'git-academy-progress',
    version: 1,
    exportedAt: new Date().toISOString(),
    checksum,
    data: progress,
  };

  return JSON.stringify(payload, null, 2);
}

/**
 * Triggers a browser download of the exported progress JSON file.
 */
export function downloadProgressFile(progress: CourseProgress, filename?: string): void {
  const jsonStr = exportProgressToJson(progress);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const dateStr = new Date().toISOString().split('T')[0];
  const finalName = filename || `git-academy-progress-${dateStr}.json`;

  const link = document.createElement('a');
  link.href = url;
  link.download = finalName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export interface ProgressImportResult {
  success: boolean;
  progress?: CourseProgress;
  error?: string;
  warnings?: string[];
}

/**
 * Parses and validates an imported progress JSON string.
 */
export function importProgressFromJson(rawJson: string): ProgressImportResult {
  if (!rawJson || typeof rawJson !== 'string') {
    return { success: false, error: 'Tệp tải lên trống hoặc không đúng định dạng chuỗi.' };
  }

  try {
    const parsed = JSON.parse(rawJson);

    // Support both direct CourseProgress and exported wrapper
    let candidate: unknown;

    if (parsed && typeof parsed === 'object' && parsed.format === 'git-academy-progress') {
      const payload = parsed as ProgressExportPayload;
      if (!payload.data) {
        return { success: false, error: 'Tệp thiếu khối dữ liệu tiến độ học tập (data).' };
      }
      // Check checksum if present
      const expectedChecksum = computeChecksum(JSON.stringify(payload.data));
      if (payload.checksum && payload.checksum !== expectedChecksum) {
        return {
          success: false,
          error: 'Mã kiểm tra tính toàn vẹn (checksum) không khớp. Tệp có thể đã bị chỉnh sửa thủ công.',
        };
      }
      candidate = payload.data;
    } else {
      candidate = parsed;
    }

    if (!isValidCourseProgress(candidate)) {
      return {
        success: false,
        error: 'Cấu trúc dữ liệu trong tệp không khớp với chuẩn CourseProgress của Git Academy.',
      };
    }

    // Sanitize values
    const sanitized: CourseProgress = {
      userId: candidate.userId || 'imported_user',
      totalXp: Math.max(0, Math.floor(candidate.totalXp)),
      level: Math.max(1, Math.floor(candidate.level)),
      streakDays: Math.max(0, Math.floor(candidate.streakDays)),
      lastActiveDate: candidate.lastActiveDate || new Date().toISOString().split('T')[0],
      lessons: candidate.lessons || {},
      achievements: Array.from(new Set(candidate.achievements || [])),
    };

    return {
      success: true,
      progress: sanitized,
    };
  } catch (err: any) {
    return {
      success: false,
      error: `Lỗi phân tích cú pháp JSON: ${err?.message || 'Tệp không phải JSON hợp lệ'}`,
    };
  }
}
