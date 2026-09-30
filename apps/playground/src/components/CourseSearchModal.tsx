import React, { useState, useMemo } from 'react';
import { COURSE_SEARCH_INDEX, CourseSearchIndexEntry } from '@git-academy/exercise-engine';

interface CourseSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToLesson: (moduleId: string, lessonId: string) => void;
}

export const CourseSearchModal: React.FC<CourseSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigateToLesson,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();

    return COURSE_SEARCH_INDEX.filter((entry: CourseSearchIndexEntry) => {
      return (
        entry.title.toLowerCase().includes(term) ||
        entry.id.toLowerCase().includes(term) ||
        entry.moduleTitle.toLowerCase().includes(term) ||
        entry.definition.toLowerCase().includes(term) ||
        entry.keywords.some((k: string) => k.toLowerCase().includes(term)) ||
        entry.commands.some((c: string) => c.toLowerCase().includes(term))
      );
    });
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div
      className="course-search-backdrop"
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
        className="course-search-content"
        style={{
          width: '90%',
          maxWidth: '650px',
          maxHeight: '80vh',
          background: '#090e1a',
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
        {/* Search Header */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #1e293b', background: '#0f172a' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontWeight: 600, fontSize: '0.95rem', color: '#38bdf8' }}>
              🔍 TÌM KIẾM BÀI HỌC & LỆNH GIT
            </span>
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                fontSize: '1.1rem',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>

          <input
            type="text"
            placeholder="Tìm theo chủ đề, câu lệnh (vd: commit, rebase, merge, clone, .gitignore)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '6px',
              border: '1px solid #38bdf8',
              background: '#020617',
              color: '#f8fafc',
              fontSize: '0.95rem',
              outline: 'none',
            }}
            autoFocus
          />
        </div>

        {/* Results List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
          {!searchTerm.trim() ? (
            <div style={{ textAlign: 'center', color: '#64748b', padding: '30px' }}>
              Nhập từ khóa tìm kiếm để tra cứu bài học trong toàn bộ lộ trình Git Academy.
            </div>
          ) : searchResults.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#64748b', padding: '30px' }}>
              Không tìm thấy bài học nào phù hợp với từ khóa "{searchTerm}".
            </div>
          ) : (
            searchResults.map((item: CourseSearchIndexEntry) => (
              <div
                key={`${item.moduleId}-${item.id}`}
                onClick={() => {
                  onNavigateToLesson(item.moduleId, item.id);
                  onClose();
                }}
                style={{
                  padding: '12px 14px',
                  borderRadius: '6px',
                  background: '#0f172a',
                  border: '1px solid #1e293b',
                  marginBottom: '8px',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#1e293b')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#0f172a')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600, color: '#f8fafc', fontSize: '0.9rem' }}>
                    {item.title}
                  </span>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: '#020617',
                      color: '#38bdf8',
                    }}
                  >
                    {item.moduleTitle}
                  </span>
                </div>

                <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '6px' }}>
                  {item.definition}
                </div>

                {item.commands.length > 0 && (
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {item.commands.map((cmd: string) => (
                      <code
                        key={cmd}
                        style={{
                          fontSize: '0.75rem',
                          padding: '1px 5px',
                          borderRadius: '3px',
                          background: '#020617',
                          color: '#34d399',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {cmd}
                      </code>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
