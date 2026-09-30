import React, { useState, useMemo } from 'react';
import { generateCheatSheet, CheatSheetEntry } from '@git-academy/git-engine';

interface CheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCommand?: (cmd: string) => void;
}

export const CheatSheetModal: React.FC<CheatSheetModalProps> = ({
  isOpen,
  onClose,
  onSelectCommand,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const cheatSheetData = useMemo(() => generateCheatSheet(), []);
  const categories = useMemo(() => ['All', ...Object.keys(cheatSheetData)], [cheatSheetData]);

  const filteredCommands = useMemo(() => {
    const list: CheatSheetEntry[] = [];
    for (const [cat, cmds] of Object.entries(cheatSheetData)) {
      if (activeCategory !== 'All' && activeCategory !== cat) continue;
      for (const cmd of cmds) {
        if (
          !searchTerm ||
          cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cmd.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cmd.syntax.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          list.push(cmd);
        }
      }
    }
    return list;
  }, [cheatSheetData, activeCategory, searchTerm]);

  if (!isOpen) return null;

  return (
    <div
      className="cheat-sheet-modal-backdrop"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
    >
      <div
        className="cheat-sheet-modal-content"
        style={{
          width: '90%',
          maxWidth: '750px',
          maxHeight: '85vh',
          background: '#0a0f1d',
          border: '1px solid #334155',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
          fontFamily: 'var(--font-sans)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #1e293b',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#0f172a',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.2rem' }}>📖</span>
            <span style={{ fontWeight: 'bold', fontSize: '1rem', color: '#38bdf8' }}>
              GIT COMMAND CHEAT SHEET
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              fontSize: '1.2rem',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>

        {/* Search & Categories Bar */}
        <div style={{ padding: '12px 20px', borderBottom: '1px solid #1e293b', background: '#090e1c' }}>
          <input
            type="text"
            placeholder="Tìm kiếm lệnh (vd: commit, status, branch, remote)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #334155',
              background: '#0f172a',
              color: '#f8fafc',
              fontSize: '0.9rem',
              marginBottom: '10px',
              outline: 'none',
            }}
            autoFocus
          />

          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  border: 'none',
                  background: activeCategory === cat ? '#38bdf8' : '#1e293b',
                  color: activeCategory === cat ? '#040d1a' : '#cbd5e1',
                  cursor: 'pointer',
                  fontWeight: activeCategory === cat ? 600 : 'normal',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Command list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
          {filteredCommands.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#64748b', padding: '30px' }}>
              Không tìm thấy lệnh nào phù hợp với từ khóa "{searchTerm}".
            </div>
          ) : (
            filteredCommands.map((cmd) => (
              <div
                key={cmd.name}
                style={{
                  padding: '12px 14px',
                  borderRadius: '6px',
                  background: '#0f172a',
                  border: '1px solid #1e293b',
                  marginBottom: '10px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <code
                    style={{
                      color: '#34d399',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {cmd.syntax}
                  </code>
                  <span
                    style={{
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: '#1e293b',
                      color: '#94a3b8',
                      fontSize: '0.7rem',
                    }}
                  >
                    {cmd.category}
                  </span>
                </div>

                <div style={{ color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '8px' }}>
                  {cmd.description}
                </div>

                {cmd.options.length > 0 && (
                  <div style={{ marginTop: '6px', borderTop: '1px dashed #1e293b', paddingTop: '6px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '4px' }}>Cờ tùy chọn:</div>
                    {cmd.options.map((opt) => (
                      <div key={opt.flag} style={{ fontSize: '0.75rem', color: '#94a3b8', marginLeft: '8px' }}>
                        <code style={{ color: '#38bdf8' }}>{opt.flag}</code>: {opt.description}
                      </div>
                    ))}
                  </div>
                )}

                {onSelectCommand && (
                  <button
                    onClick={() => {
                      onSelectCommand(cmd.name);
                      onClose();
                    }}
                    style={{
                      marginTop: '8px',
                      padding: '3px 8px',
                      fontSize: '0.7rem',
                      borderRadius: '4px',
                      border: '1px solid #38bdf8',
                      background: 'rgba(56, 189, 248, 0.1)',
                      color: '#38bdf8',
                      cursor: 'pointer',
                    }}
                  >
                    Chạy trong terminal ➔
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
