import React, { useState } from 'react';

export interface ConflictBlock {
  id: string;
  startIndex: number;
  endIndex: number;
  currentContent: string;
  incomingContent: string;
  branchName: string;
}

export interface MergeConflictEditorProps {
  filename: string;
  content: string;
  onSaveContent: (newContent: string) => void;
  onClose: () => void;
}

/**
 * Parses Git conflict markers:
 * <<<<<<< HEAD
 * [current]
 * =======
 * [incoming]
 * >>>>>>> [branch]
 */
export function parseConflictBlocks(rawContent: string): {
  hasConflict: boolean;
  blocks: ConflictBlock[];
} {
  const conflictRegex = /<<<<<<< HEAD\r?\n([\s\S]*?)=======\r?\n([\s\S]*?)>>>>>>> ([^\r\n]+)/g;
  const blocks: ConflictBlock[] = [];
  let match;
  let idCounter = 1;

  while ((match = conflictRegex.exec(rawContent)) !== null) {
    blocks.push({
      id: `conflict-${idCounter++}`,
      startIndex: match.index,
      endIndex: match.index + match[0].length,
      currentContent: match[1],
      incomingContent: match[2],
      branchName: match[3],
    });
  }

  return {
    hasConflict: blocks.length > 0,
    blocks,
  };
}

export function resolveConflictBlock(
  fullText: string,
  block: ConflictBlock,
  choice: 'current' | 'incoming' | 'both'
): string {
  let resolvedText = '';
  if (choice === 'current') {
    resolvedText = block.currentContent;
  } else if (choice === 'incoming') {
    resolvedText = block.incomingContent;
  } else {
    resolvedText = `${block.currentContent}${block.incomingContent}`;
  }

  const before = fullText.substring(0, block.startIndex);
  const after = fullText.substring(block.endIndex);
  return before + resolvedText + after;
}

export const MergeConflictEditor: React.FC<MergeConflictEditorProps> = ({
  filename,
  content,
  onSaveContent,
  onClose,
}) => {
  const [editorText, setEditorText] = useState(content);
  const [isManualMode, setIsManualMode] = useState(false);
  const [manualDraft, setManualDraft] = useState(content);

  const { hasConflict, blocks } = parseConflictBlocks(editorText);

  const handleResolveConflict = (
    block: ConflictBlock,
    choice: 'current' | 'incoming' | 'both'
  ) => {
    const nextContent = resolveConflictBlock(editorText, block, choice);
    setEditorText(nextContent);
    setManualDraft(nextContent);
    onSaveContent(nextContent);
  };

  const handleManualSave = () => {
    setEditorText(manualDraft);
    setIsManualMode(false);
    onSaveContent(manualDraft);
  };

  return (
    <div
      className="merge-conflict-editor-backdrop"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(2, 6, 23, 0.85)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        className="merge-conflict-editor-modal"
        style={{
          width: '100%',
          maxWidth: '850px',
          maxHeight: '90vh',
          backgroundColor: '#0f172a',
          border: '1px solid #334155',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #1e293b',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#1e293b',
          }}
        >
          <div>
            <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#ef4444' }}>⚔️</span> Trình giải quyết xung đột (Merge Conflict Editor):
              <code style={{ color: '#38bdf8', background: '#020617', padding: '2px 8px', borderRadius: '4px' }}>
                {filename}
              </code>
            </h3>
            <p style={{ margin: '4px 0 0 0', color: '#94a3b8', fontSize: '0.8rem' }}>
              Xung đột giữa <strong>HEAD (nhánh hiện tại)</strong> và <strong>nhánh đang hợp nhất</strong>.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              fontSize: '1.4rem',
              cursor: 'pointer',
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {/* Notice banner */}
        <div
          style={{
            padding: '10px 20px',
            backgroundColor: '#451a03',
            borderBottom: '1px solid #78350f',
            color: '#fef3c7',
            fontSize: '0.82rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>💡</span>
          <span>
            <strong>Lưu ý quan trọng:</strong> Sau khi chấp nhận thay đổi, file sẽ lưu vào Working Tree ở trạng thái <em>Modified</em>. Bạn vẫn cần chạy <code>git add {filename}</code> và <code>git commit</code> để hoàn tất merge!
          </span>
        </div>

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {isManualMode ? (
            <div>
              <div style={{ marginBottom: '10px', color: '#94a3b8', fontSize: '0.85rem' }}>
                Chỉnh sửa trực tiếp nội dung file bên dưới:
              </div>
              <textarea
                value={manualDraft}
                onChange={(e) => setManualDraft(e.target.value)}
                style={{
                  width: '100%',
                  height: '350px',
                  backgroundColor: '#020617',
                  border: '1px solid #334155',
                  color: '#e2e8f0',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.85rem',
                  padding: '12px',
                  borderRadius: '6px',
                  resize: 'vertical',
                }}
              />
              <div style={{ marginTop: '12px', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setIsManualMode(false)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    background: '#334155',
                    color: '#f8fafc',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Hủy chỉnh sửa thủ công
                </button>
                <button
                  onClick={handleManualSave}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    background: '#2563eb',
                    color: '#ffffff',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  Lưu thay đổi thủ công
                </button>
              </div>
            </div>
          ) : hasConflict ? (
            <div>
              {blocks.map((b, idx) => (
                <div
                  key={b.id}
                  style={{
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    marginBottom: '16px',
                    backgroundColor: '#020617',
                  }}
                >
                  {/* Actions Header */}
                  <div
                    style={{
                      padding: '8px 12px',
                      backgroundColor: '#1e293b',
                      borderBottom: '1px solid #334155',
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', marginRight: '6px' }}>
                      Điểm xung đột #{idx + 1}:
                    </span>
                    <button
                      onClick={() => handleResolveConflict(b, 'current')}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '4px',
                        background: '#047857',
                        color: '#ecfdf5',
                        border: 'none',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        fontWeight: 600,
                      }}
                    >
                      Accept Current (HEAD)
                    </button>
                    <button
                      onClick={() => handleResolveConflict(b, 'incoming')}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '4px',
                        background: '#1d4ed8',
                        color: '#eff6ff',
                        border: 'none',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        fontWeight: 600,
                      }}
                    >
                      Accept Incoming ({b.branchName})
                    </button>
                    <button
                      onClick={() => handleResolveConflict(b, 'both')}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '4px',
                        background: '#475569',
                        color: '#f8fafc',
                        border: 'none',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                      }}
                    >
                      Accept Both
                    </button>
                    <button
                      onClick={() => setIsManualMode(true)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '4px',
                        background: 'transparent',
                        color: '#cbd5e1',
                        border: '1px solid #475569',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                      }}
                    >
                      Edit Manually
                    </button>
                  </div>

                  {/* Visual conflict preview */}
                  <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.85rem' }}>
                    {/* Current HEAD */}
                    <div style={{ padding: '8px 12px', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderBottom: '1px dashed #065f46' }}>
                      <div style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>
                        &lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD (Current Change)
                      </div>
                      <pre style={{ margin: 0, color: '#a7f3d0', whiteSpace: 'pre-wrap' }}>{b.currentContent}</pre>
                    </div>

                    {/* Incoming Branch */}
                    <div style={{ padding: '8px 12px', backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
                      <pre style={{ margin: 0, color: '#bfdbfe', whiteSpace: 'pre-wrap' }}>{b.incomingContent}</pre>
                      <div style={{ color: '#60a5fa', fontSize: '0.75rem', fontWeight: 600, marginTop: '4px' }}>
                        &gt;&gt;&gt;&gt;&gt;&gt;&gt; {b.branchName} (Incoming Change)
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#10b981' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>✅</div>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', color: '#f8fafc' }}>
                Đã giải quyết sạch sẽ xung đột!
              </h4>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', maxWidth: '480px', margin: '0 auto 20px auto' }}>
                Không còn conflict markers trong tệp tin <code>{filename}</code>. Nội dung đã được lưu vào Working Tree.
              </p>
              <pre
                style={{
                  textAlign: 'left',
                  background: '#020617',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid #1e293b',
                  fontSize: '0.85rem',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  color: '#e2e8f0',
                  marginBottom: '20px',
                }}
              >
                {editorText}
              </pre>
              <button
                onClick={onClose}
                style={{
                  padding: '8px 24px',
                  background: '#10b981',
                  color: '#022c22',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Đóng và tiếp tục làm việc trong Terminal
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
