import React, { useState } from 'react';
import type { Classroom, User } from '@git-academy/shared';

interface TeacherDashboardProps {
  user: User;
  onSelectClass: (classroom: Classroom) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  user,
  onSelectClass,
}) => {
  const [classes, setClasses] = useState<Classroom[]>([
    {
      id: 'class-git-k48',
      name: 'Git & GitHub — CNTT K48',
      code: 'GIT-K48-A',
      teacherId: user.id,
      courseId: 'git-foundations',
      startDate: '2026-09-05T00:00:00Z',
      endDate: '2026-12-30T00:00:00Z',
      createdAt: '2026-09-01T08:00:00Z',
    },
    {
      id: 'class-git-k49',
      name: 'Git & DevOps — CNTT K49',
      code: 'GIT-K49-B',
      teacherId: user.id,
      courseId: 'git-foundations',
      startDate: '2026-09-10T00:00:00Z',
      createdAt: '2026-09-05T08:00:00Z',
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newClassCode, setNewClassCode] = useState('');
  const [newStartDate, setNewStartDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;

    const generatedCode = newClassCode.trim() || `GIT-K50-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const newClass: Classroom = {
      id: `class-${Date.now()}`,
      name: newClassName.trim(),
      code: generatedCode.toUpperCase(),
      teacherId: user.id,
      courseId: 'git-foundations',
      startDate: newStartDate ? new Date(newStartDate).toISOString() : undefined,
      endDate: newEndDate ? new Date(newEndDate).toISOString() : undefined,
      createdAt: new Date().toISOString(),
    };

    setClasses([...classes, newClass]);
    setShowCreateModal(false);
    setNewClassName('');
    setNewClassCode('');
  };

  return (
    <div style={{ padding: '24px 32px', maxWidth: '1200px', margin: '0 auto', color: '#f1f5f9' }}>
      {/* Top Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '28px 32px',
        marginBottom: '28px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span style={{ fontSize: '1.8rem' }}>👩‍🏫</span>
            <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700, color: '#f8fafc' }}>
              Bảng điều khiển Giảng viên
            </h1>
            <span style={{
              background: 'rgba(168, 85, 247, 0.15)',
              color: '#c084fc',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              padding: '3px 10px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}>
              Giảng viên: {user.displayName}
            </span>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.95rem' }}>
            Quản lý các lớp học phần Git & GitHub, theo dõi tiến độ sinh viên và chấm điểm bài tập.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            color: '#fff',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '10px',
            fontSize: '0.95rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
          }}
        >
          <span>➕</span>
          <span>Tạo lớp học mới</span>
        </button>
      </div>

      {/* Class List Grid (Spec #11) */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#f8fafc', marginBottom: '16px' }}>
        Danh sách Lớp học phụ trách ({classes.length})
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {classes.map((cls, idx) => {
          const studentCount = idx === 0 ? 45 : 42;
          const avgProgress = idx === 0 ? 62 : 48;
          const avgQuiz = idx === 0 ? 81 : 78;
          const atRiskCount = idx === 0 ? 5 : 4;

          return (
            <div
              key={cls.id}
              onClick={() => onSelectClass(cls)}
              style={{
                background: 'rgba(30, 41, 59, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '14px',
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div>
                  <h3 style={{ margin: '0 0 6px 0', fontSize: '1.2rem', color: '#f8fafc' }}>
                    {cls.name}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                    Khóa học: Git Academy Core (Level 1–8)
                  </div>
                </div>
                <span style={{
                  background: 'rgba(56, 189, 248, 0.15)',
                  color: '#38bdf8',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  fontFamily: 'monospace',
                }}>
                  {cls.code}
                </span>
              </div>

              {/* Class Summary Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', margin: '16px 0' }}>
                <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '10px 8px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Sinh viên</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>{studentCount}</div>
                </div>
                <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '10px 8px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Tiến độ TB</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#38bdf8' }}>{avgProgress}%</div>
                </div>
                <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '10px 8px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Quiz TB</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#a855f7' }}>{avgQuiz}%</div>
                </div>
                <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '10px 8px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>At risk</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ef4444' }}>{atRiskCount}</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Click để xem sổ điểm & danh sách lớp
                </span>
                <span style={{ color: '#38bdf8', fontSize: '0.9rem', fontWeight: 600 }}>
                  Mở lớp →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Class Modal */}
      {showCreateModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px',
        }}>
          <div style={{
            background: '#1e293b',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '500px',
            padding: '28px',
            color: '#f8fafc',
          }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.3rem' }}>Tạo Lớp học phần mới</h3>
            <form onSubmit={handleCreateClass}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '6px' }}>
                  Tên lớp học:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Git & GitHub — CNTT K50"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    background: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '6px' }}>
                  Mã lớp (tùy chọn, để trống sẽ tự sinh):
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: GIT-K50-A"
                  value={newClassCode}
                  onChange={(e) => setNewClassCode(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    background: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '6px' }}>
                    Ngày bắt đầu:
                  </label>
                  <input
                    type="date"
                    value={newStartDate}
                    onChange={(e) => setNewStartDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: '#0f172a',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#f8fafc',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '6px' }}>
                    Ngày kết thúc:
                  </label>
                  <input
                    type="date"
                    value={newEndDate}
                    onChange={(e) => setNewEndDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: '#0f172a',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#f8fafc',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#cbd5e1',
                    border: 'none',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  style={{
                    background: '#2563eb',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 22px',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Tạo lớp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
