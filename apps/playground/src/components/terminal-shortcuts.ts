/**
 * Terminal Line Editing Shortcuts (Readline emulation: Ctrl+U, Ctrl+K, Ctrl+W)
 */

export function applyTerminalLineEdit(
  input: string,
  pos: number,
  action: 'kill-line-start' | 'kill-line-end' | 'delete-word-back'
): { nextInput: string; nextPos: number } {
  if (action === 'kill-line-start') {
    // Ctrl+U: Delete from cursor position to line start
    return { nextInput: input.slice(pos), nextPos: 0 };
  }
  if (action === 'kill-line-end') {
    // Ctrl+K: Delete from cursor position to line end
    return { nextInput: input.slice(0, pos), nextPos: pos };
  }
  if (action === 'delete-word-back') {
    // Ctrl+W: Delete previous word before cursor (readline unix-word-rubout)
    const prefix = input.slice(0, pos);
    const suffix = input.slice(pos);
    const newPrefix = prefix.replace(/\S+\s*$/, '');
    return { nextInput: newPrefix + suffix, nextPos: newPrefix.length };
  }
  return { nextInput: input, nextPos: pos };
}
