import React, { useState, useRef, useEffect } from 'react';
import { AutocompleteSuggestion } from '@git-academy/git-engine';
import { CommandExplainer } from './CommandExplainer';

export interface TerminalEntry {
  id: string;
  command: string;
  stdout: string;
  stderr: string;
  exitCode: number;
}

interface TerminalViewProps {
  entries: TerminalEntry[];
  currentBranch: string;
  onExecute: (command: string) => void;
  onClear: () => void;
  onHint: () => void;
  getSuggestions: (input: string) => AutocompleteSuggestion[];
  navigateHistoryUp: (current: string) => string;
  navigateHistoryDown: () => string;
}

import { applyTerminalLineEdit } from './terminal-shortcuts';

export const TerminalView: React.FC<TerminalViewProps> = ({
  entries,
  currentBranch,
  onExecute,
  onClear,
  onHint,
  getSuggestions,
  navigateHistoryUp,
  navigateHistoryDown,
}) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<AutocompleteSuggestion[]>([]);
  const [explainMode, setExplainMode] = useState<boolean>(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [entries]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Ctrl+C: Cancel current prompt line (^C)
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') {
      const selection = window.getSelection()?.toString();
      if (!selection) {
        e.preventDefault();
        if (input) {
          onExecute(`${input} ^C`);
        }
        setInput('');
        setSuggestions([]);
        return;
      }
    }

    // Ctrl+L: Clear terminal output
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      onClear();
      return;
    }

    // Ctrl+A / Home: Move cursor to beginning of line
    if (((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') || e.key === 'Home') {
      e.preventDefault();
      inputRef.current?.setSelectionRange(0, 0);
      return;
    }

    // Ctrl+E / End: Move cursor to end of line
    if (((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'e') || e.key === 'End') {
      e.preventDefault();
      inputRef.current?.setSelectionRange(input.length, input.length);
      return;
    }

    // Ctrl+U: Delete from cursor to line start
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'u') {
      e.preventDefault();
      const pos = inputRef.current?.selectionStart ?? input.length;
      const { nextInput, nextPos } = applyTerminalLineEdit(input, pos, 'kill-line-start');
      setInput(nextInput);
      setSuggestions([]);
      requestAnimationFrame(() => {
        inputRef.current?.setSelectionRange(nextPos, nextPos);
      });
      return;
    }

    // Ctrl+K: Delete from cursor to line end
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const pos = inputRef.current?.selectionStart ?? input.length;
      const { nextInput, nextPos } = applyTerminalLineEdit(input, pos, 'kill-line-end');
      setInput(nextInput);
      setSuggestions([]);
      requestAnimationFrame(() => {
        inputRef.current?.setSelectionRange(nextPos, nextPos);
      });
      return;
    }

    // Ctrl+W: Delete previous word
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'w') {
      e.preventDefault();
      const pos = inputRef.current?.selectionStart ?? input.length;
      const { nextInput, nextPos } = applyTerminalLineEdit(input, pos, 'delete-word-back');
      setInput(nextInput);
      setSuggestions([]);
      requestAnimationFrame(() => {
        inputRef.current?.setSelectionRange(nextPos, nextPos);
      });
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = input.trim();
      if (cmd) {
        onExecute(cmd);
        setInput('');
        setSuggestions([]);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = navigateHistoryUp(input);
      setInput(prev);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = navigateHistoryDown();
      setInput(next);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setInput(suggestions[0].text);
        setSuggestions([]);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    if (val.length > 2) {
      setSuggestions(getSuggestions(val));
    } else {
      setSuggestions([]);
    }
  };

  const handleChipClick = (cmd: string) => {
    setInput(cmd);
    inputRef.current?.focus();
  };

  // Convert ANSI escape color sequences into HTML/React spans
  const formatAnsi = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(\x1b\[\d+m)/g);
    let currentColor = '';

    return parts.map((part, i) => {
      if (part === '\x1b[32m') {
        currentColor = '#10b981'; // Green
        return null;
      } else if (part === '\x1b[31m') {
        currentColor = '#ef4444'; // Red
        return null;
      } else if (part === '\x1b[33m') {
        currentColor = '#f59e0b'; // Amber / Yellow
        return null;
      } else if (part === '\x1b[0m') {
        currentColor = '';
        return null;
      }
      return (
        <span key={i} style={{ color: currentColor || undefined }}>
          {part}
        </span>
      );
    });
  };

  return (
    <div className="terminal-view">
      <div className="terminal-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
          </div>
          <span className="terminal-title">GIT TERMINAL SIMULATOR</span>
        </div>

        <div className="terminal-controls">
          <button
            className="btn-terminal-action"
            onClick={() => setExplainMode((prev) => !prev)}
            title="Bật/Tắt giải thích chi tiết từng thành phần lệnh Git"
            style={{
              background: explainMode ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
              color: explainMode ? '#38bdf8' : '#94a3b8',
            }}
          >
            🔍 {explainMode ? 'Giải thích: BẬT' : 'Giải thích: TẮT'}
          </button>
          <button className="btn-terminal-action" onClick={onHint} title="Xem gợi ý bước tiếp theo">
            💡 Gợi ý
          </button>
          <button className="btn-terminal-action" onClick={onClear} title="Xóa màn hình terminal">
            🧹 Xóa (Clear)
          </button>
        </div>
      </div>

      <div className="terminal-body" onClick={() => inputRef.current?.focus()}>
        {entries.length === 0 ? (
          <div style={{ color: '#64748b' }}>
            Chào mừng đến với Git Academy Terminal Simulator! Gõ <code style={{ color: '#38bdf8' }}>git --help</code> hoặc dùng các gợi ý bên dưới để bắt đầu.
          </div>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="terminal-entry">
              <div className="terminal-line">
                <span className="terminal-prompt">user@git-academy:~/project ({currentBranch}) $ </span>
                <span className="terminal-command">{entry.command}</span>
              </div>
              {entry.stdout && (
                <div className="terminal-line terminal-output">{formatAnsi(entry.stdout)}</div>
              )}
              {entry.stderr && (
                <div className="terminal-line terminal-output-error">{formatAnsi(entry.stderr)}</div>
              )}
              {explainMode && entry.command.trim().startsWith('git') && entry.exitCode === 0 && (
                <CommandExplainer commandLine={entry.command} />
              )}
            </div>
          ))
        )}

        <div className="terminal-input-row">
          <span className="terminal-prompt">user@git-academy:~/project ({currentBranch}) $ </span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
            placeholder="Nhập lệnh git (ví dụ: git status, git add login.js, git commit -m ...)"
          />
        </div>

        {suggestions.length > 0 && (
          <div
            style={{
              padding: '0.4rem 0.6rem',
              background: '#090e1b',
              border: '1px solid var(--border-accent)',
              borderRadius: '4px',
              fontSize: '0.78rem',
              display: 'flex',
              gap: '0.8rem',
              alignItems: 'center',
            }}
          >
            <span style={{ color: '#94a3b8' }}>Tab autocomplete:</span>
            {suggestions.slice(0, 3).map((s) => (
              <span
                key={s.text}
                onClick={() => {
                  setInput(s.text);
                  setSuggestions([]);
                }}
                style={{ color: '#38bdf8', cursor: 'pointer', textDecoration: 'underline' }}
              >
                {s.text}
              </span>
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Quick Command Suggestions */}
      <div className="suggested-chips">
        <span style={{ fontSize: '0.72rem', color: '#64748b', alignSelf: 'center' }}>Gợi ý nhanh:</span>
        <button className="chip-btn" onClick={() => handleChipClick('git init')}>
          git init
        </button>
        <button className="chip-btn" onClick={() => handleChipClick('git status')}>
          git status
        </button>
        <button className="chip-btn" onClick={() => handleChipClick('git add login.js')}>
          git add login.js
        </button>
        <button className="chip-btn" onClick={() => handleChipClick('git add .')}>
          git add .
        </button>
        <button
          className="chip-btn"
          onClick={() => handleChipClick('git commit -m "feat: add login module"')}
        >
          git commit -m "feat: add login module"
        </button>
        <button className="chip-btn" onClick={() => handleChipClick('git log --oneline')}>
          git log --oneline
        </button>
        <button className="chip-btn" onClick={() => handleChipClick('git branch')}>
          git branch
        </button>
      </div>
    </div>
  );
};
