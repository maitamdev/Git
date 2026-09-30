import React, { useState } from 'react';

export interface DiffLine {
  type: 'addition' | 'deletion' | 'normal';
  oldLineNumber?: number;
  newLineNumber?: number;
  content: string;
}

export interface DiffViewProps {
  filename: string;
  oldContent: string | null;
  newContent: string | null;
  mode?: 'unified' | 'split';
  onModeChange?: (mode: 'unified' | 'split') => void;
}

export function computeDiffLines(oldContent: string | null, newContent: string | null): DiffLine[] {
  const oldLines = oldContent !== null ? oldContent.split('\n') : [];
  const newLines = newContent !== null ? newContent.split('\n') : [];
  const result: DiffLine[] = [];

  let oldIdx = 0;
  let newIdx = 0;

  // Simple line-by-line diff comparison
  while (oldIdx < oldLines.length || newIdx < newLines.length) {
    if (oldIdx >= oldLines.length) {
      result.push({
        type: 'addition',
        newLineNumber: newIdx + 1,
        content: newLines[newIdx],
      });
      newIdx++;
    } else if (newIdx >= newLines.length) {
      result.push({
        type: 'deletion',
        oldLineNumber: oldIdx + 1,
        content: oldLines[oldIdx],
      });
      oldIdx++;
    } else if (oldLines[oldIdx] === newLines[newIdx]) {
      result.push({
        type: 'normal',
        oldLineNumber: oldIdx + 1,
        newLineNumber: newIdx + 1,
        content: oldLines[oldIdx],
      });
      oldIdx++;
      newIdx++;
    } else {
      // Check if old line was deleted
      result.push({
        type: 'deletion',
        oldLineNumber: oldIdx + 1,
        content: oldLines[oldIdx],
      });
      oldIdx++;
      result.push({
        type: 'addition',
        newLineNumber: newIdx + 1,
        content: newLines[newIdx],
      });
      newIdx++;
    }
  }

  return result;
}

export const DiffView: React.FC<DiffViewProps> = ({
  filename,
  oldContent,
  newContent,
  mode: initialMode = 'unified',
  onModeChange,
}) => {
  const [diffMode, setDiffMode] = useState<'unified' | 'split'>(initialMode);

  const handleToggleMode = (mode: 'unified' | 'split') => {
    setDiffMode(mode);
    onModeChange?.(mode);
  };

  const diffLines = computeDiffLines(oldContent, newContent);
  const oldLines = oldContent !== null ? oldContent.split('\n') : [];
  const newLines = newContent !== null ? newContent.split('\n') : [];

  return (
    <div
      className="diff-viewer-component"
      style={{
        border: '1px solid var(--border-subtle, #334155)',
        borderRadius: '6px',
        overflow: 'hidden',
        background: '#0b132b',
        fontFamily: 'var(--font-mono, monospace)',
        fontSize: '0.85rem',
      }}
    >
      <div
        className="diff-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 12px',
          background: '#0f172a',
          borderBottom: '1px solid #334155',
          color: '#cbd5e1',
        }}
      >
        <span style={{ fontWeight: 600 }}>📄 {filename}</span>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => handleToggleMode('unified')}
            style={{
              padding: '2px 8px',
              fontSize: '0.75rem',
              borderRadius: '4px',
              border: 'none',
              background: diffMode === 'unified' ? '#3b82f6' : '#1e293b',
              color: '#ffffff',
              cursor: 'pointer',
            }}
          >
            Unified
          </button>
          <button
            onClick={() => handleToggleMode('split')}
            style={{
              padding: '2px 8px',
              fontSize: '0.75rem',
              borderRadius: '4px',
              border: 'none',
              background: diffMode === 'split' ? '#3b82f6' : '#1e293b',
              color: '#ffffff',
              cursor: 'pointer',
            }}
          >
            Split
          </button>
        </div>
      </div>

      {diffMode === 'unified' ? (
        <div style={{ overflowX: 'auto', maxHeight: '350px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <tbody>
              {diffLines.map((line, idx) => {
                const bg =
                  line.type === 'addition'
                    ? 'rgba(16, 185, 129, 0.15)'
                    : line.type === 'deletion'
                    ? 'rgba(239, 68, 68, 0.15)'
                    : 'transparent';
                const color =
                  line.type === 'addition'
                    ? '#34d399'
                    : line.type === 'deletion'
                    ? '#f87171'
                    : '#94a3b8';
                const symbol = line.type === 'addition' ? '+' : line.type === 'deletion' ? '-' : ' ';

                return (
                  <tr key={idx} style={{ background: bg }}>
                    <td
                      style={{
                        width: '40px',
                        padding: '2px 8px',
                        color: '#475569',
                        userSelect: 'none',
                        textAlign: 'right',
                        borderRight: '1px solid #1e293b',
                      }}
                    >
                      {line.oldLineNumber || ''}
                    </td>
                    <td
                      style={{
                        width: '40px',
                        padding: '2px 8px',
                        color: '#475569',
                        userSelect: 'none',
                        textAlign: 'right',
                        borderRight: '1px solid #1e293b',
                      }}
                    >
                      {line.newLineNumber || ''}
                    </td>
                    <td style={{ width: '20px', padding: '2px 4px', color, userSelect: 'none' }}>
                      {symbol}
                    </td>
                    <td style={{ padding: '2px 8px', color, whiteSpace: 'pre-wrap' }}>
                      {line.content}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ display: 'flex', overflowX: 'auto', maxHeight: '350px' }}>
          {/* Old side */}
          <div style={{ flex: 1, borderRight: '1px solid #334155' }}>
            <div style={{ padding: '4px 8px', background: '#1e293b', color: '#94a3b8', fontSize: '0.75rem' }}>
              Before
            </div>
            {oldLines.map((line, idx) => (
              <div key={idx} style={{ padding: '2px 8px', color: '#f87171', background: 'rgba(239, 68, 68, 0.1)' }}>
                <span style={{ color: '#475569', marginRight: '8px' }}>{idx + 1}</span>
                {line}
              </div>
            ))}
          </div>

          {/* New side */}
          <div style={{ flex: 1 }}>
            <div style={{ padding: '4px 8px', background: '#1e293b', color: '#94a3b8', fontSize: '0.75rem' }}>
              After
            </div>
            {newLines.map((line, idx) => (
              <div key={idx} style={{ padding: '2px 8px', color: '#34d399', background: 'rgba(16, 185, 129, 0.1)' }}>
                <span style={{ color: '#475569', marginRight: '8px' }}>{idx + 1}</span>
                {line}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
