import React, { useState } from 'react';
import type { Classroom, GradePolicy } from '@git-academy/shared';

interface ClassDashboardProps {
  classroom: Classroom;
  onBack: () => void;
}

export const ClassDashboard: React.FC<ClassDashboardProps> = ({
  classroom,
  onBack,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'in_progress' | 'completed' | 'missing' | 'at_risk'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);

  // Grade Policy State (Spec #16)
  const [policy, setPolicy] = useState<GradePolicy>({
    quizWeight: 0.25,
    labsWeight: 0.30,
    challengesWeight: 0.20,
    assignmentsWeight: 0.25,
    passThreshold: 60,
  });

  // Sample Students matching Spec #12 & #13
  const [students, setStudents] = useState([
    {
      id: 'student-khang-01',
      displayName: 'Vũ Quốc Khang',
      email: 'khang@gitacademy.vn',
      progressPercent: 78,
      completedLessons: 100,
      completedLabs: 65,
      quizAvg: 86,
      xp: 12450,
      letterGrade: 'A',
      overallScore: 88,
      lastActivity: 'Hôm qua, 16:20',
      missingAssignments: 0,
      isAtRisk: false,
    },
    {
      id: 'student-nam-02',
      displayName: 'Trần Hoài Nam',
      email: 'nam@gitacademy.vn',
      progressPercent: 18,
      completedLessons: 23,
      completedLabs: 12,
      quizAvg: 48,
      xp: 1850,
      letterGrade: 'F',
      overallScore: 35,
      lastActivity: '7 ngày trước',
      missingAssignments: 1,
      isAtRisk: true, // At risk: progress < 30% or quiz < 50
    },
    {
      id: 'student-anh-03',
      displayName: 'Nguyễn Phương Anh',
      email: 'anh.np@gitacademy.vn',
      progressPercent: 100,
      completedLessons: 128,
      completedLabs: 76,
      quizAvg: 94,
      xp: 16800,
      letterGrade: 'A',
      overallScore: 96,
      lastActivity: 'Hôm nay, 09:15',
      missingAssignments: 0,
      isAtRisk: false,
    },
    {
      id: 'student-tuan-04',
      displayName: 'Lê Hoàng Tuấn',
      email: 'tuan.lh@gitacademy.vn',
      progressPercent: 62,
      completedLessons: 80,
      completedLabs: 50,
      quizAvg: 82,
      xp: 8900,
      letterGrade: 'B',
      overallScore: 81,
      lastActivity: '2 ngày trước',
      missingAssignments: 0,
      isAtRisk: false,
    },
    {
      id: 'student-huyen-05',
      displayName: 'Đỗ Thị Thu Huyền',
      email: 'huyen.dtt@gitacademy.vn',
      progressPercent: 24,
      completedLessons: 30,
      completedLabs: 15,
      quizAvg: 55,
      xp: 2600,
      letterGrade: 'D',
      overallScore: 52,
      lastActivity: '5 ngày trước',
      missingAssignments: 1,
      isAtRisk: true,
    },
  ]);

  // Grading form state in student detail
  const [gradingScore, setGradingScore] = useState<number>(95);
  const [gradingFeedback, setGradingFeedback] = useState<string>('Bài làm rất tốt, log commit rõ ràng.');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Filter logic
  const filteredStudents = students.filter((s) => {
    const matchesSearch = s.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeFilter === 'at_risk') return s.isAtRisk;
    if (activeFilter === 'completed') return s.progressPercent === 100;
    if (activeFilter === 'missing') return s.missingAssignments > 0;
    if (activeFilter === 'in_progress') return s.progressPercent > 0 && s.progressPercent < 100;
    return true;
  });

  const handleSaveGrading = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleRemoveStudent = (studentId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sinh viên này khỏi lớp học?')) {
      setStudents(students.filter((s) => s.id !== studentId));
      setSelectedStudent(null);
    }
  };

  return (
    <div style={{ padding: '24px 32px', maxWidth: '1240px', margin: '0 auto', color: '#f1f5f9' }}>
      {/* Back button & Class Title Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
        <button
          onClick={onBack}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#f8fafc',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span>←</span>
          <span>Quay lại</span>
        </button>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 700, color: '#f8fafc' }}>
            {classroom.name}
          </h1>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '2px' }}>
            Mã lớp: <strong style={{ color: '#38bdf8', fontFamily: 'monospace' }}>{classroom.code}</strong> • Khóa học: Git Academy Vietnam Core
          </div>
        </div>
      </div>

      {/* Class Metric Highlights matching Spec #12 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '14px',
        marginBottom: '24px',
      }}>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '16px 20px' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Students</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc', margin: '4px 0' }}>45</div>
          <div style={{ fontSize: '0.75rem', color: '#10b981' }}>Đang hoạt động</div>
        </div>

        <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '16px 20px' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Average progress</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#38bdf8', margin: '4px 0' }}>62%</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Toàn bộ 128 lessons</div>
        </div>

        <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '16px 20px' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Average quiz score</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#a855f7', margin: '4px 0' }}>81%</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Trung bình trắc nghiệm</div>
        </div>

        <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '16px 20px' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Completed course</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#10b981', margin: '4px 0' }}>7</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Đã hoàn thành 100%</div>
        </div>

        <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '16px 20px' }}>
          <div style={{ color: '#f87171', fontSize: '0.8rem' }}>At risk</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ef4444', margin: '4px 0' }}>5</div>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Tiến độ &lt; 30% hoặc quiz &lt; 50</div>
        </div>
      </div>

      {/* Learning Difficulty Insights (Spec #23) */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.7)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        padding: '18px 24px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div>
          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>
            📊 Phân tích độ khó học tập (Learning Difficulty Report)
          </div>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontSize: '0.85rem' }}>
            <div>
              <span style={{ color: '#94a3b8' }}>Merge Conflict:</span>{' '}
              <strong style={{ color: '#f59e0b' }}>48% required &gt;2 attempts</strong>
            </div>
            <div>
              <span style={{ color: '#94a3b8' }}>Interactive Rebase:</span>{' '}
              <strong style={{ color: '#ef4444' }}>35% quiz fail rate</strong>
            </div>
            <div>
              <span style={{ color: '#94a3b8' }}>Git Internals Tree Objects:</span>{' '}
              <strong style={{ color: '#38bdf8' }}>92% pass rate</strong>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setShowPolicyModal(true)}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#f8fafc',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            ⚙️ Cấu hình tính điểm
          </button>
          <button
            onClick={() => setShowAssignmentModal(true)}
            style={{
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            ➕ Tạo bài tập
          </button>
        </div>
      </div>

      {/* Filter and Search Bar (Spec #13) */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '16px',
      }}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { key: 'all', label: `Tất cả (${students.length})` },
            { key: 'in_progress', label: 'Đang học' },
            { key: 'completed', label: 'Hoàn thành' },
            { key: 'missing', label: 'Thiếu bài tập' },
            { key: 'at_risk', label: 'At risk' },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key as any)}
              style={{
                background: activeFilter === f.key ? '#2563eb' : 'rgba(30, 41, 59, 0.6)',
                color: activeFilter === f.key ? '#fff' : '#94a3b8',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontWeight: activeFilter === f.key ? 600 : 400,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Tìm sinh viên theo tên hoặc email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '8px 14px',
            background: '#0f172a',
            border: '1px solid #334155',
            borderRadius: '8px',
            color: '#f8fafc',
            fontSize: '0.85rem',
            width: '280px',
          }}
        />
      </div>

      {/* Student Table (Spec #13) */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        overflowX: 'auto',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: 'rgba(15, 23, 42, 0.8)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', color: '#94a3b8' }}>
              <th style={{ padding: '14px 16px', fontWeight: 600 }}>Họ và tên</th>
              <th style={{ padding: '14px 16px', fontWeight: 600 }}>Tiến độ</th>
              <th style={{ padding: '14px 16px', fontWeight: 600 }}>Labs</th>
              <th style={{ padding: '14px 16px', fontWeight: 600 }}>Quiz TB</th>
              <th style={{ padding: '14px 16px', fontWeight: 600 }}>XP</th>
              <th style={{ padding: '14px 16px', fontWeight: 600 }}>Điểm chữ</th>
              <th style={{ padding: '14px 16px', fontWeight: 600 }}>Hoạt động cuối</th>
              <th style={{ padding: '14px 16px', fontWeight: 600 }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((std) => (
              <tr
                key={std.id}
                style={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  background: std.isAtRisk ? 'rgba(239, 68, 68, 0.03)' : 'transparent',
                }}
              >
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ fontWeight: 600, color: '#f8fafc' }}>{std.displayName}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{std.email}</div>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '80px', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${std.progressPercent}%`, height: '100%', background: '#38bdf8' }} />
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{std.progressPercent}%</span>
                  </div>
                </td>
                <td style={{ padding: '14px 16px' }}>{std.completedLabs} / 76</td>
                <td style={{ padding: '14px 16px', color: std.quizAvg < 60 ? '#ef4444' : '#f8fafc', fontWeight: 600 }}>
                  {std.quizAvg}%
                </td>
                <td style={{ padding: '14px 16px', color: '#ec4899', fontWeight: 600 }}>
                  {std.xp.toLocaleString()}
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    background: std.letterGrade === 'A' ? 'rgba(16, 185, 129, 0.2)' : (std.letterGrade === 'F' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(56, 189, 248, 0.2)'),
                    color: std.letterGrade === 'A' ? '#34d399' : (std.letterGrade === 'F' ? '#f87171' : '#38bdf8'),
                  }}>
                    {std.letterGrade} ({std.overallScore})
                  </span>
                </td>
                <td style={{ padding: '14px 16px', color: '#94a3b8', fontSize: '0.8rem' }}>{std.lastActivity}</td>
                <td style={{ padding: '14px 16px' }}>
                  <button
                    onClick={() => setSelectedStudent(std)}
                    style={{
                      background: 'rgba(56, 189, 248, 0.15)',
                      color: '#38bdf8',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      padding: '5px 12px',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Student Detail Modal (Spec #14) */}
      {selectedStudent && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
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
            maxWidth: '680px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '28px',
            color: '#f8fafc',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.4rem' }}>{selectedStudent.displayName}</h2>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{selectedStudent.email} • Mã SV: {selectedStudent.id}</div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {/* Quick Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px' }}>
              <div style={{ background: '#0f172a', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Tiến độ</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#38bdf8' }}>{selectedStudent.progressPercent}%</div>
              </div>
              <div style={{ background: '#0f172a', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Labs</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#10b981' }}>{selectedStudent.completedLabs}/76</div>
              </div>
              <div style={{ background: '#0f172a', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Quiz TB</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#a855f7' }}>{selectedStudent.quizAvg}%</div>
              </div>
              <div style={{ background: '#0f172a', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Tổng XP</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ec4899' }}>{selectedStudent.xp.toLocaleString()}</div>
              </div>
            </div>

            {/* Grading & Assignment Section */}
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '16px', marginBottom: '20px' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '1rem', color: '#f8fafc' }}>
                📝 Chấm điểm bài nộp gần nhất: Feature Branch & PR
              </h3>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '10px' }}>
                Repo: <a href="https://github.com/khang-student/git-feature-workflow-demo" target="_blank" rel="noreferrer" style={{ color: '#38bdf8' }}>github.com/khang-student/git-feature-workflow-demo</a>
              </div>

              <form onSubmit={handleSaveGrading}>
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '4px' }}>Điểm số (0-100):</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={gradingScore}
                      onChange={(e) => setGradingScore(Number(e.target.value))}
                      style={{ width: '100%', padding: '8px', background: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: '#fff' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '4px' }}>Nhận xét phản hồi:</label>
                    <input
                      type="text"
                      value={gradingFeedback}
                      onChange={(e) => setGradingFeedback(e.target.value)}
                      style={{ width: '100%', padding: '8px', background: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: '#fff' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    type="submit"
                    style={{
                      background: '#10b981',
                      color: '#fff',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Lưu điểm & Nhận xét
                  </button>
                  {saveSuccess && <span style={{ color: '#34d399', fontSize: '0.85rem' }}>✓ Đã lưu thành công</span>}
                </div>
              </form>
            </div>

            {/* Remove student button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Thao tác quản trị lớp học:</span>
              <button
                onClick={() => handleRemoveStudent(selectedStudent.id)}
                style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  color: '#f87171',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Xóa khỏi lớp học
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grade Policy Configuration Modal (Spec #16) */}
      {showPolicyModal && (
        <div style={{
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
          padding: '20px',
        }}>
          <div style={{ background: '#1e293b', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '16px', width: '100%', maxWidth: '480px', padding: '24px', color: '#f8fafc' }}>
            <h3 style={{ margin: '0 0 14px 0' }}>Cấu hình Trọng số Tính Điểm (Grade Policy)</h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0 0 16px 0' }}>
              Tổng trọng số các cột điểm phải bằng đúng 100% (1.0).
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1' }}>Trọng số Quiz (Trắc nghiệm): {(policy.quizWeight * 100).toFixed(0)}%</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={policy.quizWeight}
                  onChange={(e) => setPolicy({ ...policy, quizWeight: Number(e.target.value) })}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1' }}>Trọng số Labs (Thực hành): {(policy.labsWeight * 100).toFixed(0)}%</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={policy.labsWeight}
                  onChange={(e) => setPolicy({ ...policy, labsWeight: Number(e.target.value) })}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1' }}>Trọng số Challenges (Thử thách): {(policy.challengesWeight * 100).toFixed(0)}%</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={policy.challengesWeight}
                  onChange={(e) => setPolicy({ ...policy, challengesWeight: Number(e.target.value) })}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1' }}>Trọng số Assignments (Bài tập lớn): {(policy.assignmentsWeight * 100).toFixed(0)}%</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={policy.assignmentsWeight}
                  onChange={(e) => setPolicy({ ...policy, assignmentsWeight: Number(e.target.value) })}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setShowPolicyModal(false)}
                style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
              >
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
