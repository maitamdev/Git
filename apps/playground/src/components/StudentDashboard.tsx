import React, { useState } from 'react';
import type { User, Classroom, Assignment } from '@git-academy/shared';

interface StudentDashboardProps {
  user: User;
  onNavigateToLesson?: (lessonId: string) => void;
  onSwitchView?: (view: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user,
  onNavigateToLesson,
  onSwitchView,
}) => {
  const [classCodeInput, setClassCodeInput] = useState('');
  const [joinSuccess, setJoinSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'assignments' | 'achievements'>('overview');
  const [submissionModalAsg, setSubmissionModalAsg] = useState<Assignment | null>(null);
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [submissionContent, setSubmissionContent] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Student metrics matching Spec #9
  const completedLessons = 100;
  const totalLessons = 128;
  const progressPercent = Math.round((completedLessons / totalLessons) * 100); // 78%
  const completedLabs = 65;
  const totalLabs = 76;
  const quizAvg = 86;
  const totalXp = 12450;
  const levelTitle = 'Advanced';
  const resumeLessonId = '04-rebase-01-interactive-rebase';
  const resumeLessonTitle = 'Interactive Rebase';

  // Enrolled class
  const enrolledClass: Classroom = {
    id: 'class-git-k48',
    name: 'Git & GitHub — CNTT K48',
    code: 'GIT-K48-A',
    teacherId: 'teacher-lan-48',
    courseId: 'git-foundations',
    createdAt: '2026-09-01T00:00:00Z',
  };

  // Sample assignments
  const assignments = [
    {
      id: 'asg-branching-flow',
      classId: 'class-git-k48',
      title: 'Bài tập 1: Quy trình Feature Branch & Pull Request',
      description: 'Tạo repo nhóm, tạo branch, rebase vào main và resolve 1 conflict.',
      dueAt: '2026-10-15T23:59:59Z',
      points: 100,
      status: 'graded',
      statusLabel: 'Đã chấm điểm',
      score: 95,
      feedback: 'Bài làm rất tốt, log commit rõ ràng theo chuẩn Conventional Commits!',
    },
    {
      id: 'asg-rebase-interactive',
      classId: 'class-git-k48',
      title: 'Bài tập 2: Tối ưu lịch sử Commit bằng Interactive Rebase',
      description: 'Sử dụng git rebase -i để squash 4 commits vụn và sửa commit message.',
      dueAt: '2026-10-25T23:59:59Z',
      points: 100,
      status: 'pending',
      statusLabel: 'Còn 5 ngày',
      score: undefined,
      feedback: undefined,
    },
  ];

  const handleJoinClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!classCodeInput.trim()) return;
    setJoinSuccess(`Bạn đã tham gia lớp: ${enrolledClass.name} (Mã: ${classCodeInput.toUpperCase()})`);
    setClassCodeInput('');
    setTimeout(() => setJoinSuccess(null), 4000);
  };

  const handleOpenSubmit = (asg: any) => {
    setSubmissionModalAsg(asg);
    setSubmissionUrl(asg.score !== undefined ? 'https://github.com/khang-student/git-feature-workflow-demo' : '');
    setSubmissionContent(asg.score !== undefined ? 'Em đã hoàn thành bài tập nhánh feature/auth.' : '');
    setSubmitSuccess(false);
  };

  const handleSubmitAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmissionModalAsg(null);
      setSubmitSuccess(false);
    }, 1500);
  };

  return (
    <div style={{ padding: '24px 32px', maxWidth: '1200px', margin: '0 auto', color: '#f1f5f9' }}>
      {/* Header Greeting Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '28px 32px',
        marginBottom: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span style={{ fontSize: '1.8rem' }}>👋</span>
            <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700, color: '#f8fafc' }}>
              Xin chào, {user.displayName}
            </h1>
            <span style={{
              background: 'rgba(56, 189, 248, 0.15)',
              color: '#38bdf8',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              padding: '3px 10px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}>
              Sinh viên
            </span>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.95rem' }}>
            Lớp học: <strong style={{ color: '#e2e8f0' }}>{enrolledClass.name}</strong> • Mã lớp: <code style={{ color: '#38bdf8' }}>{enrolledClass.code}</code>
          </p>
        </div>

        <button
          onClick={() => {
            if (onNavigateToLesson) onNavigateToLesson(resumeLessonId);
            if (onSwitchView) onSwitchView('workspace');
          }}
          style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            color: '#fff',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '10px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <span>▶</span>
          <span>Tiếp tục học: <strong>{resumeLessonTitle}</strong></span>
        </button>
      </div>

      {/* Metric Cards Grid matching Spec #9 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: '16px',
        marginBottom: '28px',
      }}>
        {/* Progress Card */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '20px',
        }}>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px' }}>Course progress</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8', marginBottom: '8px' }}>
            {progressPercent}%
          </div>
          <div style={{
            height: '8px',
            width: '100%',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '4px',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${progressPercent}%`,
              background: 'linear-gradient(90deg, #38bdf8, #3b82f6)',
              borderRadius: '4px',
            }} />
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '6px', fontFamily: 'monospace' }}>
            ████████░░ 78%
          </div>
        </div>

        {/* Lessons Completed */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '20px',
        }}>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px' }}>Lessons hoàn thành</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981' }}>
            {completedLessons} <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 400 }}>/ {totalLessons}</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '8px' }}>
            8 Levels Core Git đã hoàn thành
          </div>
        </div>

        {/* Labs Completed */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '20px',
        }}>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px' }}>Labs thực hành</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f59e0b' }}>
            {completedLabs} <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 400 }}>/ {totalLabs}</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '8px' }}>
            77 kịch bản mô phỏng sandbox
          </div>
        </div>

        {/* Quiz Average */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '20px',
        }}>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px' }}>Quiz average</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#a855f7' }}>
            {quizAvg}%
          </div>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '8px' }}>
            Điểm quiz trung bình bài học
          </div>
        </div>

        {/* XP & Level */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '20px',
        }}>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px' }}>Tổng XP & Hạng</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ec4899' }}>
            {totalXp.toLocaleString()} <span style={{ fontSize: '0.9rem', color: '#64748b' }}>XP</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Level:</span>
            <span style={{
              background: 'rgba(236, 72, 153, 0.15)',
              color: '#f472b6',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 700,
            }}>
              {levelTitle}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '24px' }}>
        {[
          { key: 'overview', label: 'Tổng quan & Lớp học' },
          { key: 'assignments', label: `Bài tập & Deadline (${assignments.length})` },
          { key: 'achievements', label: 'Huy hiệu & Thành tích' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab.key ? '2px solid #38bdf8' : '2px solid transparent',
              color: activeTab === tab.key ? '#38bdf8' : '#94a3b8',
              padding: '10px 16px',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview & Classroom Join */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          {/* Main Column: Active Class & Activity */}
          <div>
            <div style={{
              background: 'rgba(30, 41, 59, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '20px',
            }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', color: '#f8fafc' }}>
                🏫 Lớp học của bạn
              </h3>
              <div style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#f1f5f9' }}>
                    {enrolledClass.name}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>
                    Giảng viên: Cô Nguyễn Thị Lan • 45 sinh viên
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>MÃ LỚP</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#38bdf8', fontFamily: 'monospace' }}>
                    {enrolledClass.code}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity Log */}
            <div style={{
              background: 'rgba(30, 41, 59, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '20px',
            }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', color: '#f8fafc' }}>
                ⏱️ Hoạt động học tập gần đây
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { title: 'Hoàn thành bài tập: Quy trình Feature Branch', time: 'Hôm qua, 16:20', xp: '+100 XP' },
                  { title: 'Giải quyết xung đột: Merge Conflict Lab', time: '2 ngày trước', xp: '+80 XP' },
                  { title: 'Đạt điểm tuyệt đối Quiz: Git Three Stage Architecture', time: '3 ngày trước', xp: '+50 XP' },
                  { title: 'Mở khóa huy hiệu: Conflict Solver', time: '3 ngày trước', xp: '+100 XP' },
                ].map((act, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 14px',
                    background: 'rgba(15, 23, 42, 0.4)',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                  }}>
                    <div>
                      <div style={{ color: '#e2e8f0' }}>{act.title}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{act.time}</div>
                    </div>
                    <span style={{ color: '#10b981', fontWeight: 600, fontSize: '0.85rem' }}>{act.xp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side Column: Join Class Form & Sync Info */}
          <div>
            <div style={{
              background: 'rgba(30, 41, 59, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '20px',
            }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '1rem', color: '#f8fafc' }}>
                🔑 Tham gia lớp học khác
              </h3>
              <p style={{ margin: '0 0 16px 0', fontSize: '0.85rem', color: '#94a3b8' }}>
                Nhập mã lớp do giảng viên cung cấp để đồng bộ tiến độ vào danh sách lớp:
              </p>
              <form onSubmit={handleJoinClass}>
                <input
                  type="text"
                  placeholder="Ví dụ: GIT-K48-B"
                  value={classCodeInput}
                  onChange={(e) => setClassCodeInput(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    background: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    fontSize: '0.95rem',
                    marginBottom: '12px',
                    boxSizing: 'border-box',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: '#2563eb',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Tham gia lớp
                </button>
              </form>
              {joinSuccess && (
                <div style={{ marginTop: '10px', padding: '8px 12px', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', borderRadius: '6px', fontSize: '0.85rem' }}>
                  ✓ {joinSuccess}
                </div>
              )}
            </div>

            <div style={{
              background: 'rgba(30, 41, 59, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '20px',
            }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '1rem', color: '#f8fafc' }}>
                ☁️ Trạng thái đồng bộ máy chủ
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '0.9rem', marginBottom: '8px' }}>
                <span style={{ height: '8px', width: '8px', borderRadius: '50%', background: '#10b981' }} />
                <span>Đã đồng bộ lên Server (Conflict-free)</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                Dữ liệu bài tập, lab và quiz của bạn luôn được bảo vệ ngay cả khi offline.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Assignments & Deadlines */}
      {activeTab === 'assignments' && (
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {assignments.map((asg) => (
              <div
                key={asg.id}
                style={{
                  background: 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '20px 24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px',
                }}
              >
                <div style={{ maxWidth: '650px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#f8fafc' }}>{asg.title}</h3>
                    <span style={{
                      background: asg.status === 'graded' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                      color: asg.status === 'graded' ? '#34d399' : '#fbbf24',
                      padding: '2px 10px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                    }}>
                      {asg.statusLabel}
                    </span>
                  </div>
                  <p style={{ margin: '0 0 8px 0', color: '#94a3b8', fontSize: '0.9rem' }}>{asg.description}</p>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    Hạn chót: {new Date(asg.dueAt).toLocaleDateString('vi-VN')} • Điểm tối đa: {asg.points} điểm
                  </div>
                  {asg.feedback && (
                    <div style={{ marginTop: '10px', padding: '10px 14px', background: 'rgba(15, 23, 42, 0.6)', borderLeft: '3px solid #10b981', borderRadius: '4px', fontSize: '0.85rem' }}>
                      <strong style={{ color: '#10b981' }}>Nhận xét của Giảng viên:</strong> {asg.feedback}
                    </div>
                  )}
                </div>

                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                  {asg.score !== undefined ? (
                    <div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981' }}>
                        {asg.score} <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 400 }}>/ {asg.points}</span>
                      </div>
                      <button
                        onClick={() => handleOpenSubmit(asg)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          color: '#e2e8f0',
                          border: 'none',
                          padding: '6px 14px',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                        }}
                      >
                        Xem bài nộp
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleOpenSubmit(asg)}
                      style={{
                        background: '#2563eb',
                        color: '#fff',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Nộp bài tập
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Achievements */}
      {activeTab === 'achievements' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {[
            { id: 'first_commit', name: 'First Commit', icon: '🌱', desc: 'Thực hiện commit đầu tiên vào Git repository', unlocked: true },
            { id: 'branch_master', name: 'Branching Master', icon: '🌿', desc: 'Tạo và merge thành công 5 nhánh song song', unlocked: true },
            { id: 'conflict_solver', name: 'Conflict Solver', icon: '⚔️', desc: 'Giải quyết xung đột 3-way merge hoàn hảo', unlocked: true },
            { id: 'actions_hero', name: 'CI/CD Hero', icon: '🚀', desc: 'Cấu hình GitHub Actions pipeline tự động test', unlocked: false },
            { id: 'internals_guru', name: 'Git Internals Guru', icon: '🧠', desc: 'Phân tích cấu trúc blob, tree, commit object SHA-1', unlocked: false },
          ].map((ach) => (
            <div
              key={ach.id}
              style={{
                background: ach.unlocked ? 'rgba(30, 41, 59, 0.7)' : 'rgba(15, 23, 42, 0.4)',
                border: ach.unlocked ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                padding: '20px',
                opacity: ach.unlocked ? 1 : 0.6,
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{ach.icon}</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: ach.unlocked ? '#f8fafc' : '#64748b' }}>{ach.name}</div>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '6px 0 12px 0' }}>{ach.desc}</p>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: ach.unlocked ? '#34d399' : '#64748b',
              }}>
                {ach.unlocked ? '✓ Đã mở khóa (+50 XP)' : '🔒 Chưa đạt được'}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Submission Modal */}
      {submissionModalAsg && (
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
            maxWidth: '540px',
            padding: '28px',
            color: '#f8fafc',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
          }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem' }}>
              Nộp bài: {submissionModalAsg.title}
            </h3>
            <p style={{ margin: '0 0 20px 0', fontSize: '0.85rem', color: '#94a3b8' }}>
              Điền link GitHub repository và mô tả bài làm của bạn để giảng viên chấm điểm.
            </p>

            <form onSubmit={handleSubmitAssignment}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '6px' }}>
                  GitHub Repository / PR Link:
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://github.com/username/project"
                  value={submissionUrl}
                  onChange={(e) => setSubmissionUrl(e.target.value)}
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

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '6px' }}>
                  Ghi chú cho giảng viên:
                </label>
                <textarea
                  rows={3}
                  placeholder="Mô tả các nhánh, cách giải quyết conflict..."
                  value={submissionContent}
                  onChange={(e) => setSubmissionContent(e.target.value)}
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

              {submitSuccess ? (
                <div style={{ padding: '10px', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', borderRadius: '8px', textAlign: 'center', fontWeight: 600 }}>
                  ✓ Đã nộp bài tập thành công!
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setSubmissionModalAsg(null)}
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
                    Xác nhận nộp
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
