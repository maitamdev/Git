import React, { useState, useMemo, useEffect } from 'react';
import { COURSE_MANIFEST, loadLessonContent } from '@git-academy/exercise-engine';
import { CourseLesson } from '@git-academy/shared';
import { calculateLessonContentMetrics } from '../learning/content-quality';

export const AuthorPreviewPage: React.FC = () => {
  const activeModules = useMemo(
    () => COURSE_MANIFEST.curriculum.filter((m) => m.status !== 'coming_soon'),
    []
  );

  const [selectedModuleId, setSelectedModuleId] = useState<string>(activeModules[0]?.id || '01-foundations');
  const currentModule = useMemo(
    () => activeModules.find((m) => m.id === selectedModuleId),
    [activeModules, selectedModuleId]
  );

  const [selectedLessonId, setSelectedLessonId] = useState<string>(
    currentModule?.lessons[0]?.id || '01-version-control'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'theory' | 'quiz' | 'raw'>('theory');

  const [lesson, setLesson] = useState<CourseLesson | null>(null);

  useEffect(() => {
    let active = true;
    loadLessonContent(selectedModuleId, selectedLessonId).then((l) => {
      if (active) setLesson(l);
    });
    return () => {
      active = false;
    };
  }, [selectedModuleId, selectedLessonId]);

  const metrics = useMemo(() => calculateLessonContentMetrics(lesson), [lesson]);

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1d', color: '#f3f4f6', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Top Navigation */}
      <header style={{ borderBottom: '1px solid #1f293d', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0d1527' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a href="/" style={{ color: '#60a5fa', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            ← Quay về Học viện
          </a>
          <span style={{ color: '#4b5563' }}>|</span>
          <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#f9fafb' }}>
            🛠️ Author Studio & Curriculum Previewer
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <a
            href="/dev/course-health"
            style={{
              background: '#1f293d',
              color: '#93c5fd',
              padding: '6px 12px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 500,
              border: '1px solid #374151',
            }}
          >
            📊 Course Health Dashboard →
          </a>
        </div>
      </header>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr 340px', height: 'calc(100vh - 65px)', overflow: 'hidden' }}>
        {/* Left Sidebar: Lesson Directory */}
        <aside style={{ borderRight: '1px solid #1f293d', padding: '16px', overflowY: 'auto', background: '#0d1527' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', color: '#9ca3af', fontWeight: 600, marginBottom: '6px' }}>
              Module
            </label>
            <select
              value={selectedModuleId}
              onChange={(e) => {
                const modId = e.target.value;
                setSelectedModuleId(modId);
                const mod = activeModules.find((m) => m.id === modId);
                if (mod && mod.lessons[0]) setSelectedLessonId(mod.lessons[0].id);
              }}
              style={{ width: '100%', padding: '8px 12px', background: '#17223b', color: '#fff', border: '1px solid #2d3c59', borderRadius: '6px', fontSize: '13px' }}
            >
              {activeModules.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title} ({m.lessons.length} bài)
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <input
              type="text"
              placeholder="🔍 Lọc bài học..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', background: '#111b2e', color: '#fff', border: '1px solid #23314d', borderRadius: '6px', fontSize: '13px' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {currentModule?.lessons
              .filter((l) => l.title.toLowerCase().includes(searchQuery.toLowerCase()) || l.id.includes(searchQuery.toLowerCase()))
              .map((l, index) => {
                const isSelected = l.id === selectedLessonId;
                return (
                  <button
                    key={l.id}
                    onClick={() => setSelectedLessonId(l.id)}
                    style={{
                      textAlign: 'left',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      background: isSelected ? '#1e293b' : 'transparent',
                      border: isSelected ? '1px solid #3b82f6' : '1px solid transparent',
                      color: isSelected ? '#60a5fa' : '#d1d5db',
                      cursor: 'pointer',
                      fontSize: '13px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span style={{ color: '#6b7280', fontSize: '11px', width: '20px' }}>#{index + 1}</span>
                    <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.title}</span>
                    <span style={{ fontSize: '10px', color: '#10b981' }}>✓</span>
                  </button>
                );
              })}
          </div>
        </aside>

        {/* Center Panel: Content Inspector */}
        <main style={{ padding: '24px 32px', overflowY: 'auto', background: '#0a0f1d' }}>
          {lesson ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', borderBottom: '1px solid #1f293d', paddingBottom: '16px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#93c5fd', fontWeight: 600, marginBottom: '4px' }}>{currentModule?.title}</div>
                  <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: '#f9fafb' }}>{lesson.metadata.title}</h2>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>ID: {lesson.id} • Thời lượng: {lesson.metadata.duration}m • XP: {lesson.metadata.xp}</div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setActiveTab('theory')}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '6px',
                      border: 'none',
                      background: activeTab === 'theory' ? '#2563eb' : '#1e293b',
                      color: '#fff',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    📖 Lý thuyết
                  </button>
                  <button
                    onClick={() => setActiveTab('quiz')}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '6px',
                      border: 'none',
                      background: activeTab === 'quiz' ? '#2563eb' : '#1e293b',
                      color: '#fff',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    ❓ Quiz ({lesson.quiz?.questions?.length || 0})
                  </button>
                  <button
                    onClick={() => setActiveTab('raw')}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '6px',
                      border: 'none',
                      background: activeTab === 'raw' ? '#2563eb' : '#1e293b',
                      color: '#fff',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    📄 Raw Markdown
                  </button>
                </div>
              </div>

              {activeTab === 'theory' && (
                <div style={{ lineHeight: 1.7, fontSize: '15px', color: '#e5e7eb' }}>
                  <pre
                    style={{
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      fontFamily: 'Inter, system-ui, sans-serif',
                      background: '#0d1527',
                      padding: '24px',
                      borderRadius: '8px',
                      border: '1px solid #1f293d',
                      fontSize: '14px',
                    }}
                  >
                    {lesson.content}
                  </pre>
                </div>
              )}

              {activeTab === 'quiz' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {lesson.quiz?.questions?.map((q: any, i: number) => (
                    <div key={q.id || i} style={{ background: '#0d1527', border: '1px solid #1f293d', borderRadius: '8px', padding: '18px' }}>
                      <div style={{ fontWeight: 600, fontSize: '15px', color: '#f3f4f6', marginBottom: '12px' }}>
                        Câu {i + 1}: {q.question}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                        {q.options?.map((opt: any, optIdx: number) => (
                          <div
                            key={optIdx}
                            style={{
                              padding: '10px 14px',
                              borderRadius: '6px',
                              background: opt.correct ? '#064e3b' : '#17223b',
                              border: opt.correct ? '1px solid #10b981' : '1px solid #23314d',
                              color: opt.correct ? '#6ee7b7' : '#d1d5db',
                              fontSize: '13px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                            }}
                          >
                            <span style={{ fontWeight: 700 }}>{opt.correct ? '✓ ĐÚNG' : '○'}</span>
                            <span>{opt.text}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ fontSize: '13px', color: '#93c5fd', background: '#111b2e', padding: '10px 12px', borderRadius: '6px', borderLeft: '3px solid #3b82f6' }}>
                        💡 <strong>Giải thích:</strong> {q.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'raw' && (
                <textarea
                  readOnly
                  value={lesson.content}
                  style={{
                    width: '100%',
                    height: '600px',
                    background: '#090e1a',
                    color: '#a7f3d0',
                    fontFamily: 'Consolas, monospace',
                    fontSize: '13px',
                    border: '1px solid #1f293d',
                    borderRadius: '8px',
                    padding: '16px',
                  }}
                />
              )}
            </div>
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>Chọn một bài học từ danh sách bên trái.</div>
          )}
        </main>

        {/* Right Sidebar: Quality Gate Metrics Inspector */}
        <aside style={{ borderLeft: '1px solid #1f293d', padding: '20px', background: '#0d1527', overflowY: 'auto' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#f3f4f6', fontWeight: 700 }}>
            🧩 Kiểm tra cấu trúc dạy học
          </h3>

          {metrics && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  background: metrics.passes ? '#064e3b' : '#7f1d1d',
                  border: metrics.passes ? '1px solid #059669' : '1px solid #dc2626',
                  color: '#fff',
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: '14px',
                }}
              >
                {metrics.passes ? '✅ ĐỦ CẤU TRÚC CƠ BẢN' : '📝 CẦN BIÊN TẬP THÊM'}
              </div>

              <div style={{ background: '#111b2e', padding: '12px', borderRadius: '6px', border: '1px solid #1f293d' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span style={{ color: '#9ca3af' }}>Thẻ thuật ngữ:</span>
                  <span style={{ fontWeight: 600, color: metrics.termCards.complete ? '#34d399' : '#f87171' }}>
                    {metrics.termCards.completeCount}/{metrics.termCards.count} đủ nội dung {metrics.termCards.complete ? '✓' : '✗'}
                  </span>
                </div>
                {metrics.termCards.names.length > 0 && <div style={{ color: '#93c5fd', fontSize: '12px', lineHeight: 1.5, marginBottom: '9px' }}>{metrics.termCards.names.join(' · ')}</div>}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span style={{ color: '#9ca3af' }}>Độ dài phần định nghĩa:</span><span>{metrics.defWords} từ</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span style={{ color: '#9ca3af' }}>Tình huống cần học:</span><span>{metrics.whyWords} từ</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}><span style={{ color: '#9ca3af' }}>Mô hình tư duy:</span><span>{metrics.mmWords} từ</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}><span style={{ color: '#9ca3af' }}>Ví dụ:</span><span>{metrics.exWords} từ</span></div>
              </div>

              <p style={{ margin: 0, color: '#9ca3af', fontSize: '12px', lineHeight: 1.45 }}>
                Đây là kiểm tra cấu trúc và độ bao phủ thuật ngữ; nó chưa xác nhận mọi câu giải thích đúng hoặc dễ hiểu.
              </p>

              <div style={{ background: '#111b2e', padding: '12px', borderRadius: '6px', border: '1px solid #1f293d' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span style={{ color: '#9ca3af' }}>Quiz Questions:</span>
                  <span style={{ fontWeight: 600, color: metrics.qCount >= metrics.minQ ? '#34d399' : '#f87171' }}>
                    {metrics.qCount}/{metrics.minQ} câu {metrics.qCount >= metrics.minQ ? '✓' : '✗'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: '#9ca3af' }}>Placeholders bị cấm:</span>
                  <span style={{ fontWeight: 600, color: metrics.foundPlaceholders.length === 0 ? '#34d399' : '#f87171' }}>
                    {metrics.foundPlaceholders.length === 0 ? '0 lỗi ✓' : `${metrics.foundPlaceholders.length} lỗi ✗`}
                  </span>
                </div>
              </div>

              <div style={{ background: '#111b2e', padding: '12px', borderRadius: '6px', border: '1px solid #1f293d' }}>
                <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '6px', fontWeight: 600 }}>TỪ KHÓA TÌM KIẾM (KEYWORDS):</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {lesson?.metadata.keywords?.map((k: string) => (
                    <span key={k} style={{ background: '#1e293b', color: '#93c5fd', fontSize: '11px', padding: '2px 6px', borderRadius: '4px' }}>
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
