import React, { useState } from 'react';
import { COURSE_MANIFEST, COURSE_SEARCH_INDEX, COURSE_TERM_CARD_STATUS } from '@git-academy/exercise-engine';

export const CourseHealthDashboard: React.FC = () => {
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

  const activeModules = COURSE_MANIFEST.curriculum.filter((m) => m.status !== 'coming_soon');
  const comingSoonModules = COURSE_MANIFEST.curriculum.filter((m) => m.status === 'coming_soon');

  const totalLessons = activeModules.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalDuration = activeModules.reduce((acc, m) => acc + m.lessons.reduce((lacc, l) => lacc + l.duration, 0), 0);
  const totalXP = activeModules.reduce((acc, m) => acc + m.lessons.reduce((lacc, l) => lacc + l.xp, 0), 0);
  const hasTermCards = (lessonId: string) => COURSE_TERM_CARD_STATUS[lessonId]?.complete ?? false;
  const termReadyLessons = activeModules.flatMap((module) => module.lessons).filter((lesson) => hasTermCards(lesson.id)).length;
  const termReadyInModule = (moduleId: string) => activeModules.find((module) => module.id === moduleId)?.lessons.filter((lesson) => hasTermCards(lesson.id)).length || 0;

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1d', color: '#f3f4f6', fontFamily: 'Inter, system-ui, sans-serif', padding: '32px 48px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <a href="/" style={{ color: '#60a5fa', textDecoration: 'none', fontSize: '14px' }}>
              ← Học viện
            </a>
            <span style={{ color: '#4b5563' }}>•</span>
            <a href="/author" style={{ color: '#a78bfa', textDecoration: 'none', fontSize: '14px' }}>
              🛠️ Author Studio
            </a>
          </div>
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 800, color: '#f9fafb' }}>
            📊 Course Health & Curriculum Architecture Dashboard
          </h1>
          <p style={{ margin: '6px 0 0 0', color: '#9ca3af', fontSize: '14px' }}>
            Kiểm kê {activeModules.length} level và {totalLessons} bài. Thẻ thuật ngữ cho người mới được theo dõi riêng; đây chưa phải đánh giá độ đúng của toàn bộ nội dung.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ background: '#3b2a16', border: '1px solid #b7791f', padding: '10px 18px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#fbd38d', fontWeight: 600, textTransform: 'uppercase' }}>Bài có thẻ từ khóa</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#fbd38d' }}>{termReadyLessons}/{totalLessons}</div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '36px' }}>
        <div style={{ background: '#0d1527', border: '1px solid #1f293d', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#9ca3af', fontSize: '13px', fontWeight: 500 }}>Active Authored Lessons</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#60a5fa', margin: '8px 0' }}>{totalLessons}</div>
          <div style={{ color: '#f6ad55', fontSize: '12px', fontWeight: 600 }}>{termReadyLessons}/{totalLessons} bài có bộ thẻ thuật ngữ hoàn chỉnh</div>
        </div>

        <div style={{ background: '#0d1527', border: '1px solid #1f293d', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#9ca3af', fontSize: '13px', fontWeight: 500 }}>Tổng thời lượng học tập</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#f59e0b', margin: '8px 0' }}>
            {Math.floor(totalDuration / 60)}h {totalDuration % 60}m
          </div>
          <div style={{ color: '#9ca3af', fontSize: '12px' }}>Trung bình {Math.round(totalDuration / Math.max(totalLessons, 1))} phút / bài</div>
        </div>

        <div style={{ background: '#0d1527', border: '1px solid #1f293d', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#9ca3af', fontSize: '13px', fontWeight: 500 }}>Tổng điểm kinh nghiệm (XP)</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#ec4899', margin: '8px 0' }}>{totalXP.toLocaleString()} XP</div>
          <div style={{ color: '#9ca3af', fontSize: '12px' }}>Hệ thống cấp độ Gamification</div>
        </div>

        <div style={{ background: '#0d1527', border: '1px solid #1f293d', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#9ca3af', fontSize: '13px', fontWeight: 500 }}>Search Index Keywords</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#8b5cf6', margin: '8px 0' }}>{COURSE_SEARCH_INDEX.length}</div>
          <div style={{ color: '#10b981', fontSize: '12px', fontWeight: 600 }}>✓ Tìm kiếm tức thì theo lệnh</div>
        </div>
      </div>

      {/* Modules Table */}
      <div style={{ background: '#0d1527', border: '1px solid #1f293d', borderRadius: '12px', overflow: 'hidden', marginBottom: '32px' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid #1f293d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#f3f4f6' }}>
            📚 Bảng kiểm kê Module & Độ bao phủ (Curriculum Inventory)
          </h2>
          <span style={{ fontSize: '13px', color: '#9ca3af' }}>{activeModules.length} Level active • {comingSoonModules.length} roadmap</span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#111b2e', color: '#9ca3af', borderBottom: '1px solid #1f293d' }}>
              <th style={{ padding: '14px 24px' }}>Module</th>
              <th style={{ padding: '14px 16px' }}>Trạng thái</th>
              <th style={{ padding: '14px 16px' }}>Số bài học</th>
              <th style={{ padding: '14px 16px' }}>Thời lượng</th>
              <th style={{ padding: '14px 16px' }}>Tổng XP</th>
              <th style={{ padding: '14px 16px' }}>Bài có thẻ từ khóa</th>
              <th style={{ padding: '14px 24px' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {activeModules.map((m) => {
              const mDuration = m.lessons.reduce((acc, l) => acc + l.duration, 0);
              const mXP = m.lessons.reduce((acc, l) => acc + l.xp, 0);
              return (
                <tr key={m.id} style={{ borderBottom: '1px solid #17223b' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ fontWeight: 600, color: '#f9fafb' }}>{m.title}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>{m.description}</div>
                  </td>
                  <td style={{ padding: '16px 16px' }}>
                    <span style={{ background: '#064e3b', color: '#34d399', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>
                      ACTIVE
                    </span>
                  </td>
                  <td style={{ padding: '16px 16px', fontWeight: 600 }}>{m.lessons.length} bài</td>
                  <td style={{ padding: '16px 16px', color: '#d1d5db' }}>{mDuration}m</td>
                  <td style={{ padding: '16px 16px', color: '#f472b6', fontWeight: 600 }}>{mXP} XP</td>
                  <td style={{ padding: '16px 16px' }}>
                    <span style={{ color: termReadyInModule(m.id) === m.lessons.length ? '#10b981' : '#f6ad55', fontWeight: 600 }}>{termReadyInModule(m.id)}/{m.lessons.length} bài</span>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <button
                      onClick={() => setSelectedModuleId(selectedModuleId === m.id ? null : m.id)}
                      style={{
                        background: '#1e293b',
                        border: '1px solid #334155',
                        color: '#93c5fd',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        cursor: 'pointer',
                      }}
                    >
                      {selectedModuleId === m.id ? 'Ẩn danh sách' : 'Xem chi tiết'}
                    </button>
                  </td>
                </tr>
              );
            })}

            {comingSoonModules.map((m) => (
              <tr key={m.id} style={{ borderBottom: '1px solid #17223b', opacity: 0.6 }}>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ fontWeight: 600, color: '#9ca3af' }}>{m.title}</div>
                  <div style={{ fontSize: '12px', color: '#4b5563', marginTop: '2px' }}>{m.description}</div>
                </td>
                <td style={{ padding: '16px 16px' }}>
                  <span style={{ background: '#374151', color: '#9ca3af', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>
                    COMING SOON
                  </span>
                </td>
                <td style={{ padding: '16px 16px' }}>Roadmap</td>
                <td style={{ padding: '16px 16px' }}>--</td>
                <td style={{ padding: '16px 16px' }}>--</td>
                <td style={{ padding: '16px 16px', color: '#6b7280' }}>Giai đoạn kế tiếp</td>
                <td style={{ padding: '16px 24px' }}>--</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Drill-down lesson detail list */}
        {selectedModuleId && (
          <div style={{ background: '#090e1a', padding: '24px', borderTop: '1px solid #1f293d' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#93c5fd' }}>
              Danh sách bài học chi tiết: {activeModules.find((m) => m.id === selectedModuleId)?.title}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {activeModules
                .find((m) => m.id === selectedModuleId)
                ?.lessons.map((l, index) => (
                  <div
                    key={l.id}
                    style={{
                      background: '#0d1527',
                      border: '1px solid #1f293d',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, color: '#f3f4f6', fontSize: '14px' }}>
                        #{index + 1}. {l.title}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
                        ID: {l.id} • {l.duration}m • {l.xp} XP
                      </div>
                    </div>
                    <span style={{ background: hasTermCards(l.id) ? '#064e3b' : '#3b2a16', color: hasTermCards(l.id) ? '#34d399' : '#f6ad55', fontSize: '11px', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                      {hasTermCards(l.id) ? 'CÓ THẺ TỪ' : 'CẦN BIÊN TẬP'}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
