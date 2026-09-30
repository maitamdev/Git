import React, { useState, useEffect } from 'react';
import { FileState } from '@git-academy/shared';

interface FileExplorerProps {
  files: FileState[];
  currentBranch: string;
  onSaveFile?: (path: string, content: string) => void;
  onCreateFile?: (path: string) => void;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  currentBranch,
  onSaveFile,
  onCreateFile,
}) => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [editorContent, setEditorContent] = useState<string>('');
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [newFileName, setNewFileName] = useState<string>('');
  const [showNewFileInput, setShowNewFileInput] = useState<boolean>(false);

  // Sync editor content when selected file changes
  useEffect(() => {
    if (selectedPath) {
      const file = files.find((f) => f.path === selectedPath);
      if (file) {
        setEditorContent(file.content);
        setIsDirty(false);
      }
    } else if (files.length > 0 && !selectedPath) {
      // Auto select first file
      setSelectedPath(files[0].path);
      setEditorContent(files[0].content);
      setIsDirty(false);
    }
  }, [files, selectedPath]);

  const activeFile = files.find((f) => f.path === selectedPath);

  const getStatusBadge = (status: FileState['status'], staged?: boolean) => {
    if (status === 'conflict') {
      return (
        <span
          className="file-status-badge"
          style={{
            background: 'rgba(239, 68, 68, 0.25)',
            color: '#f87171',
            border: '1px solid #ef4444',
            fontWeight: 700,
          }}
        >
          C (Conflict)
        </span>
      );
    }
    if (staged) {
      return <span className="file-status-badge badge-added">A (Staged)</span>;
    }
    switch (status) {
      case 'untracked':
        return <span className="file-status-badge badge-untracked">U (Untracked)</span>;
      case 'modified':
        return <span className="file-status-badge badge-modified">M (Modified)</span>;
      case 'added':
        return <span className="file-status-badge badge-added">A (Added)</span>;
      case 'deleted':
        return <span className="file-status-badge badge-untracked">D (Deleted)</span>;
      default:
        return <span className="file-status-badge badge-unmodified">Tracked</span>;
    }
  };

  const handleSelectFile = (file: FileState) => {
    if (isDirty && activeFile) {
      if (window.confirm(`Bạn có thay đổi chưa lưu trong ${activeFile.path}. Bạn có muốn chuyển file không?`)) {
        setSelectedPath(file.path);
        setEditorContent(file.content);
        setIsDirty(false);
      }
    } else {
      setSelectedPath(file.path);
      setEditorContent(file.content);
      setIsDirty(false);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditorContent(e.target.value);
    setIsDirty(true);
  };

  const handleSave = () => {
    if (selectedPath && onSaveFile) {
      onSaveFile(selectedPath, editorContent);
      setIsDirty(false);
    }
  };

  const handleCreateNewFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFileName.trim() && onCreateFile) {
      onCreateFile(newFileName.trim());
      setSelectedPath(newFileName.trim());
      setNewFileName('');
      setShowNewFileInput(false);
    }
  };

  const hasConflict =
    activeFile?.status === 'conflict' ||
    (editorContent.includes('<<<<<<<') && editorContent.includes('=======') && editorContent.includes('>>>>>>>'));

  return (
    <div
      className="file-explorer-container"
      style={{
        display: 'flex',
        flex: 1,
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '8px',
        overflow: 'hidden',
        minHeight: '260px',
      }}
    >
      {/* LEFT: Project Explorer File List */}
      <div
        className="project-files-sidebar"
        style={{
          width: '220px',
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          background: '#090d16',
        }}
      >
        <div
          style={{
            padding: '0.6rem 0.8rem',
            background: '#0d131f',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            color: '#94a3b8',
          }}
        >
          <span>PROJECT</span>
          <span style={{ color: '#38bdf8' }}>🌿 {currentBranch}</span>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '0.3rem' }}>
          {files.length === 0 ? (
            <div style={{ padding: '1rem', color: '#64748b', fontSize: '0.78rem', textAlign: 'center' }}>
              Chưa có file nào trong thư mục làm việc
            </div>
          ) : (
            files.map((file) => {
              const isSelected = file.path === selectedPath;
              return (
                <div
                  key={file.path}
                  onClick={() => handleSelectFile(file)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.4rem 0.6rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    marginBottom: '2px',
                    background: isSelected ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                    border: isSelected ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent',
                    color: isSelected ? '#f8fafc' : '#cbd5e1',
                  }}
                  title="Nhấn để mở và chỉnh sửa file"
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <span>{file.status === 'conflict' ? '⚠️' : '📄'}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>{file.path}</span>
                  </div>
                  {getStatusBadge(file.status, file.staged)}
                </div>
              );
            })
          )}
        </div>

        {/* Quick create file button */}
        <div style={{ padding: '0.4rem', borderTop: '1px solid var(--border-subtle)', background: '#0b101b' }}>
          {showNewFileInput ? (
            <form onSubmit={handleCreateNewFile} style={{ display: 'flex', gap: '4px' }}>
              <input
                type="text"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                placeholder="vd: login.js"
                autoFocus
                style={{
                  flex: 1,
                  background: '#030712',
                  border: '1px solid #38bdf8',
                  color: '#f8fafc',
                  fontSize: '0.75rem',
                  padding: '0.25rem 0.4rem',
                  borderRadius: '3px',
                  fontFamily: 'var(--font-mono)',
                }}
              />
              <button
                type="submit"
                style={{
                  background: '#38bdf8',
                  color: '#090d16',
                  border: 'none',
                  borderRadius: '3px',
                  padding: '0 0.5rem',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                }}
              >
                +
              </button>
              <button
                type="button"
                onClick={() => setShowNewFileInput(false)}
                style={{
                  background: 'transparent',
                  color: '#94a3b8',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                }}
              >
                ✕
              </button>
            </form>
          ) : (
            <button
              onClick={() => setShowNewFileInput(true)}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px dashed #334155',
                color: '#94a3b8',
                borderRadius: '4px',
                padding: '0.35rem',
                fontSize: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              + Tạo tệp mới
            </button>
          )}
        </div>
      </div>

      {/* RIGHT: In-browser Code Editor */}
      <div
        className="editor-main"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: '#070b13',
        }}
      >
        {activeFile ? (
          <>
            <div
              style={{
                padding: '0.5rem 0.8rem',
                background: '#0d131f',
                borderBottom: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: '#38bdf8', fontWeight: 600 }}>
                  {activeFile.path}
                </span>
                {isDirty && (
                  <span
                    style={{
                      background: 'rgba(234, 179, 8, 0.2)',
                      color: '#facc15',
                      padding: '0.1rem 0.4rem',
                      borderRadius: '3px',
                      fontSize: '0.7rem',
                    }}
                  >
                    ● Đã sửa (chưa lưu)
                  </span>
                )}
                {getStatusBadge(activeFile.status, activeFile.staged)}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={handleSave}
                  style={{
                    background: isDirty ? '#10b981' : 'rgba(255,255,255,0.08)',
                    color: isDirty ? '#022c22' : '#94a3b8',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.25rem 0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  title="Lưu các chỉnh sửa vào Virtual File System"
                >
                  💾 Lưu file
                </button>
              </div>
            </div>

            {/* Conflict resolution banner */}
            {hasConflict && (
              <div
                style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  borderBottom: '1px solid rgba(239, 68, 68, 0.4)',
                  padding: '0.4rem 0.8rem',
                  fontSize: '0.76rem',
                  color: '#fca5a5',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <span>⚠️</span>
                <span>
                  <strong>Phát hiện xung đột Merge!</strong> Hãy sửa nội dung, xóa các dòng <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>,{' '}
                  <code>=======</code>, <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>, sau đó nhấn <strong>Lưu file</strong> và chạy{' '}
                  <code>git add {activeFile.path}</code> rồi <code>git commit</code>.
                </span>
              </div>
            )}

            <div style={{ flex: 1, position: 'relative' }}>
              <textarea
                value={editorContent}
                onChange={handleContentChange}
                placeholder="Nhập nội dung mã nguồn..."
                spellCheck={false}
                style={{
                  width: '100%',
                  height: '100%',
                  background: '#070b13',
                  color: '#e2e8f0',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  lineHeight: '1.5',
                  padding: '0.8rem',
                  border: 'none',
                  outline: 'none',
                  resize: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </>
        ) : (
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b',
              fontSize: '0.85rem',
              gap: '0.5rem',
            }}
          >
            <span style={{ fontSize: '2rem' }}>📂</span>
            <span>Chọn một tệp từ cột bên trái để xem và chỉnh sửa mã nguồn</span>
          </div>
        )}
      </div>
    </div>
  );
};
