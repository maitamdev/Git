export interface ConventionalCommitResult {
  valid: boolean;
  type?: string;
  scope?: string;
  isBreaking?: boolean;
  description?: string;
  body?: string;
  breakingDescription?: string;
  error?: string;
}

export const VALID_COMMIT_TYPES = [
  'feat',
  'fix',
  'docs',
  'style',
  'refactor',
  'perf',
  'test',
  'build',
  'ci',
  'chore',
  'revert',
];

/**
 * Validates a commit message according to the Conventional Commits 1.0.0 specification.
 * Structure: <type>[optional scope][!]: <description>
 *
 * [optional body]
 *
 * [optional footer(s)]
 */
export function validateConventionalCommit(message: string): ConventionalCommitResult {
  if (!message || message.trim() === '') {
    return { valid: false, error: 'Thông điệp commit không được để trống' };
  }

  const lines = message.trim().split('\n');
  const header = lines[0].trim();

  // Pattern: ^(?<type>\w+)(?:\((?<scope>[^)]+)\))?(?<breaking>!)?:\s*(?<description>.+)$
  const headerRegex = /^([a-zA-Z]+)(?:\(([^)]+)\))?(!)?:\s+(.+)$/;
  const match = header.match(headerRegex);

  if (!match) {
    return {
      valid: false,
      error:
        'Tiêu đề commit không đúng định dạng chuẩn Conventional Commits: <type>[optional scope][!]: <mô tả>',
    };
  }

  const [, rawType, scope, breakingMark, description] = match;
  const type = rawType.toLowerCase();

  if (!VALID_COMMIT_TYPES.includes(type)) {
    return {
      valid: false,
      error: `Loại commit "${type}" không hợp lệ. Phải là một trong: ${VALID_COMMIT_TYPES.join(', ')}`,
    };
  }

  if (!description || description.trim().length === 0) {
    return { valid: false, error: 'Mô tả commit sau dấu hai chấm không được để trống' };
  }

  let isBreaking = Boolean(breakingMark);
  let breakingDescription: string | undefined = undefined;

  const bodyLines = lines.slice(1);
  const fullText = bodyLines.join('\n');

  const breakingFooterMatch = fullText.match(/BREAKING(?: |-)CHANGE:\s*(.+)/i);
  if (breakingFooterMatch) {
    isBreaking = true;
    breakingDescription = breakingFooterMatch[1].trim();
  }

  return {
    valid: true,
    type,
    scope: scope || undefined,
    isBreaking,
    description: description.trim(),
    body: fullText.trim() || undefined,
    breakingDescription,
  };
}
