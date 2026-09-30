import React, { useRef, useState } from 'react';
import type { User } from '@git-academy/shared';

export type StudioViewMode = 'graph' | 'three-stage' | 'internals' | 'actions';
export type AppRoute = 'learn' | 'author' | 'course-health' | 'dashboard' | 'teacher' | 'class-dashboard';

interface HeaderProps {
  xp: number;
  level: number;
  streak: number;
  activeLessonTitle: string;
  onResetLab: () => void;
  onOpenSearch?: () => void;
  onOpenCheatSheet?: () => void;
  onOpenPullRequest?: () => void;
  studioView?: StudioViewMode;
  onSelectStudioView?: (view: StudioViewMode) => void;
  onExportProgress?: () => void;
  onImportProgress?: (jsonContent: string) => void;
  onToggleThreeStage?: () => void;
  isThreeStageActive?: boolean;
  currentRoute?: AppRoute;
  onNavigateRoute?: (route: AppRoute) => void;
  currentUser?: User;
  onSwitchUserRole?: (role: 'student' | 'teacher' | 'admin') => void;
}

export const Header: React.FC<HeaderProps> = ({
  xp,
  level,
  streak,
  activeLessonTitle,
  onResetLab,
  onOpenSearch,
  onOpenCheatSheet,
  onOpenPullRequest,
  studioView = 'graph',
  onSelectStudioView,
  onExportProgress,
  onImportProgress,
  currentRoute = 'learn',
  onNavigateRoute,
  currentUser,
  onSwitchUserRole,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const isProduction =
    (typeof process !== 'undefined' && process.env?.NODE_ENV === 'production') ||
    (typeof import.meta !== 'undefined' && (import.meta as any).env?.PROD === true);
  const isDev = !isProduction;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImportProgress) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          onImportProgress(content);
        }
      };
      reader.readAsText(file);
    }
    // Reset file input so user can re-import same file if needed
    if (e.target) {
      e.target.value = '';
    }
  };

  return (
    <header className="app-header">
      <div className="brand-section">
        <div
          className="brand-logo"
          onClick={() => onNavigateRoute?.('learn')}
          style={{ cursor: 'pointer' }}
          title="Trang chủ Git Academy"
        >
          G
        </div>
        <div>
          <div
            className="brand-title"
            onClick={() => onNavigateRoute?.('learn')}
            style={{ cursor: 'pointer' }}
          >
            GIT ACADEMY VIETNAM
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
            Nền tảng học Git & GitHub tương tác
          </div>
        </div>
        <span className="brand-badge">PRO v2.0</span>
      </div>

      {/* Top LMS Mode Navigation */}
      {onNavigateRoute && (
        <div
          style={{
            display: 'flex',
            background: '#090d16',
            borderRadius: '8px',
            border: '1px solid #1e293b',
            padding: '3px',
            gap: '3px',
          }}
        >
          <button
            onClick={() => onNavigateRoute('learn')}
            style={{
              background: currentRoute === 'learn' ? '#0284c7' : 'transparent',
              color: currentRoute === 'learn' ? '#fff' : '#94a3b8',
              border: 'none',
              borderRadius: '6px',
              padding: '5px 12px',
              fontSize: '0.8rem',
              fontWeight: currentRoute === 'learn' ? 600 : 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'all 0.15s ease',
            }}
            title="Khu vực thực hành tương tác Git & GitHub"
          >
            <span>🎓</span>
            <span>Học tập</span>
          </button>

          <button
            onClick={() => onNavigateRoute('dashboard')}
            style={{
              background: currentRoute === 'dashboard' ? '#0284c7' : 'transparent',
              color: currentRoute === 'dashboard' ? '#fff' : '#94a3b8',
              border: 'none',
              borderRadius: '6px',
              padding: '5px 12px',
              fontSize: '0.8rem',
              fontWeight: currentRoute === 'dashboard' ? 600 : 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'all 0.15s ease',
            }}
            title="Bảng điều khiển cá nhân của sinh viên"
          >
            <span>📊</span>
            <span>Dashboard SV</span>
          </button>

          <button
            onClick={() => onNavigateRoute('teacher')}
            style={{
              background:
                currentRoute === 'teacher' || currentRoute === 'class-dashboard'
                  ? '#0d9488'
                  : 'transparent',
              color:
                currentRoute === 'teacher' || currentRoute === 'class-dashboard'
                  ? '#fff'
                  : '#94a3b8',
              border: 'none',
              borderRadius: '6px',
              padding: '5px 12px',
              fontSize: '0.8rem',
              fontWeight:
                currentRoute === 'teacher' || currentRoute === 'class-dashboard' ? 600 : 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'all 0.15s ease',
            }}
            title="Cổng LMS quản lý lớp học dành cho giảng viên"
          >
            <span>👩‍🏫</span>
            <span>LMS Giảng viên</span>
          </button>
        </div>
      )}

      {/* Center Tools: Navigation & Studio Views (visible in Learn mode) */}
      {currentRoute === 'learn' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <button
            className="btn-header"
            onClick={onOpenSearch}
            title="Tìm kiếm bài học và lệnh Git"
            style={{ background: '#1e293b' }}
          >
            <span>🔍</span>
            <span>Tìm kiếm</span>
          </button>

          <button
            className="btn-header"
            onClick={onOpenCheatSheet}
            title="Mở bảng tra cứu lệnh Git Cheat Sheet"
            style={{ background: '#1e293b' }}
          >
            <span>📖</span>
            <span>Cheat Sheet</span>
          </button>

          <button
            className="btn-header"
            onClick={onOpenPullRequest}
            title="Mở trình mô phỏng GitHub Pull Request"
            style={{ background: '#1e293b' }}
          >
            <span>🔀</span>
            <span>Pull Request</span>
          </button>

          {/* Studio View Selector */}
          {onSelectStudioView && (
            <div
              style={{
                display: 'flex',
                background: '#0f172a',
                borderRadius: '6px',
                border: '1px solid #334155',
                padding: '2px',
                gap: '2px',
              }}
            >
              <button
                onClick={() => onSelectStudioView('graph')}
                style={{
                  background: studioView === 'graph' ? '#0284c7' : 'transparent',
                  color: studioView === 'graph' ? '#fff' : '#94a3b8',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '3px 8px',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  fontWeight: studioView === 'graph' ? 600 : 400,
                }}
                title="Xem đồ thị Git Graph"
              >
                🌿 Graph
              </button>
              <button
                onClick={() => onSelectStudioView('three-stage')}
                style={{
                  background: studioView === 'three-stage' ? '#0284c7' : 'transparent',
                  color: studioView === 'three-stage' ? '#fff' : '#94a3b8',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '3px 8px',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  fontWeight: studioView === 'three-stage' ? 600 : 400,
                }}
                title="Xem mô hình 3-Stage (Working Tree -> Staging -> Repo)"
              >
                📐 3-Stage
              </button>
              <button
                onClick={() => onSelectStudioView('internals')}
                style={{
                  background: studioView === 'internals' ? '#7c3aed' : 'transparent',
                  color: studioView === 'internals' ? '#fff' : '#94a3b8',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '3px 8px',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  fontWeight: studioView === 'internals' ? 600 : 400,
                }}
                title="Khám phá Git Internals Inspector"
              >
                🔬 Internals
              </button>
              <button
                onClick={() => onSelectStudioView('actions')}
                style={{
                  background: studioView === 'actions' ? '#059669' : 'transparent',
                  color: studioView === 'actions' ? '#fff' : '#94a3b8',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '3px 8px',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  fontWeight: studioView === 'actions' ? 600 : 400,
                }}
                title="Trình mô phỏng GitHub Actions CI/CD"
              >
                ⚡ CI/CD
              </button>
            </div>
          )}

          {/* Progress IO: Export & Import */}
          {onExportProgress && (
            <button
              className="btn-header"
              onClick={onExportProgress}
              title="Xuất tiến độ học tập ra tệp JSON"
              style={{ background: '#1e293b' }}
            >
              <span>💾</span>
              <span>Xuất</span>
            </button>
          )}

          {onImportProgress && (
            <>
              <button
                className="btn-header"
                onClick={() => fileInputRef.current?.click()}
                title="Nhập tiến độ học tập từ tệp JSON"
                style={{ background: '#1e293b' }}
              >
                <span>📥</span>
                <span>Nhập</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </>
          )}

          <a
            href="/author"
            className="btn-header"
            title="Mở Author Studio"
            style={{
              background: '#1e1b4b',
              color: '#c7d2fe',
              border: '1px solid #4338ca',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.82rem',
              padding: '4px 10px',
              borderRadius: '6px',
            }}
          >
            <span>🛠️</span>
            <span>Author</span>
          </a>

          <a
            href="/dev/course-health"
            className="btn-header"
            title="Mở Course Health Dashboard"
            style={{
              background: '#064e3b',
              color: '#a7f3d0',
              border: '1px solid #10b981',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.82rem',
              padding: '4px 10px',
              borderRadius: '6px',
            }}
          >
            <span>📊</span>
            <span>Health</span>
          </a>
        </div>
      )}

      {currentRoute === 'learn' && (
        <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#38bdf8' }}>
          {activeLessonTitle}
        </div>
      )}

      <div className="header-stats">
        <div className="stat-pill" title="Cấp độ hiện tại">
          <span style={{ color: '#a855f7' }}>⚡</span>
          <span>Level {level}</span>
        </div>

        <div className="stat-pill" title="Tổng điểm kinh nghiệm XP">
          <span style={{ color: '#f59e0b' }}>💎</span>
          <span>{xp} XP</span>
        </div>

        <div className="stat-pill" title="Chuỗi ngày học liên tục">
          <span style={{ color: '#ef4444' }}>🔥</span>
          <span>{streak} ngày</span>
        </div>

        {currentRoute === 'learn' && (
          <button
            className="btn-header"
            onClick={onResetLab}
            title="Đặt lại trạng thái lab ban đầu"
          >
            <span>🔄</span>
            <span>Reset Lab</span>
          </button>
        )}

        {/* In production: Clean read-only user indicator without role switcher */}
        {currentUser && !isDev && (
          <div
            className="user-profile-badge"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              padding: '4px 10px',
              color: '#f8fafc',
              fontSize: '0.82rem',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background:
                  currentUser.role === 'teacher'
                    ? '#10b981'
                    : currentUser.role === 'admin'
                    ? '#ef4444'
                    : '#38bdf8',
              }}
            />
            <span style={{ fontWeight: 600 }}>{currentUser.displayName}</span>
            <span
              style={{
                fontSize: '0.72rem',
                padding: '2px 6px',
                borderRadius: '4px',
                background:
                  currentUser.role === 'teacher'
                    ? 'rgba(16, 185, 129, 0.2)'
                    : currentUser.role === 'admin'
                    ? 'rgba(239, 68, 68, 0.2)'
                    : 'rgba(56, 189, 248, 0.2)',
                color:
                  currentUser.role === 'teacher'
                    ? '#34d399'
                    : currentUser.role === 'admin'
                    ? '#f87171'
                    : '#38bdf8',
              }}
            >
              {currentUser.role === 'teacher'
                ? 'Giảng viên'
                : currentUser.role === 'admin'
                ? 'Admin'
                : 'Sinh viên'}
            </span>
          </div>
        )}

        {/* User Role Switcher Dropdown (DEV ONLY - STRICTLY STRIPPED / HIDDEN IN PRODUCTION) */}
        {isDev && currentUser && onSwitchUserRole && (
          <div className="dev-role-switcher" style={{ position: 'relative' }}>
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
                padding: '4px 10px',
                color: '#f8fafc',
                cursor: 'pointer',
                fontSize: '0.82rem',
              }}
              title="Đổi vai trò người dùng (Chỉ hiển thị trong môi trường DEV)"
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background:
                    currentUser.role === 'teacher'
                      ? '#10b981'
                      : currentUser.role === 'admin'
                      ? '#ef4444'
                      : '#38bdf8',
                }}
              />
              <span style={{ fontWeight: 600 }}>{currentUser.displayName}</span>
              <span
                style={{
                  fontSize: '0.72rem',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  background:
                    currentUser.role === 'teacher'
                      ? 'rgba(16, 185, 129, 0.2)'
                      : currentUser.role === 'admin'
                      ? 'rgba(239, 68, 68, 0.2)'
                      : 'rgba(56, 189, 248, 0.2)',
                  color:
                    currentUser.role === 'teacher'
                      ? '#34d399'
                      : currentUser.role === 'admin'
                      ? '#f87171'
                      : '#38bdf8',
                }}
              >
                {currentUser.role === 'teacher'
                  ? 'Giảng viên'
                  : currentUser.role === 'admin'
                  ? 'Admin'
                  : 'Sinh viên'}
              </span>
              <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>▼</span>
            </button>

            {showRoleDropdown && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '6px',
                  background: '#0f172a',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.6)',
                  width: '240px',
                  zIndex: 9999,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    padding: '8px 12px',
                    fontSize: '0.72rem',
                    color: '#64748b',
                    borderBottom: '1px solid #1e293b',
                    fontWeight: 600,
                  }}
                >
                  CHỌN VAI TRÒ MÔ PHỎNG (LMS DEMO)
                </div>
                <button
                  onClick={() => {
                    onSwitchUserRole('student');
                    setShowRoleDropdown(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background:
                      currentUser.role === 'student' ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                    border: 'none',
                    borderBottom: '1px solid #1e293b',
                    color: '#f8fafc',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>🎓</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Vũ Quốc Khang</div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                      Sinh viên • Lớp GIT-K48-A
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    onSwitchUserRole('teacher');
                    setShowRoleDropdown(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background:
                      currentUser.role === 'teacher' ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                    border: 'none',
                    borderBottom: '1px solid #1e293b',
                    color: '#f8fafc',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>👩‍🏫</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Cô Nguyễn Thị Lan</div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                      Giảng viên Bộ môn CNTT
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    onSwitchUserRole('admin');
                    setShowRoleDropdown(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background:
                      currentUser.role === 'admin' ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                    border: 'none',
                    color: '#f8fafc',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>🛡️</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Quản Trị Viên</div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                      Hệ thống Git Academy
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Production Read-Only User Profile Badge (Switcher is strictly stripped) */}
        {!isDev && currentUser && (
          <div
            className="user-profile-badge"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              padding: '4px 10px',
              color: '#f8fafc',
              fontSize: '0.82rem',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background:
                  currentUser.role === 'teacher'
                    ? '#10b981'
                    : currentUser.role === 'admin'
                    ? '#ef4444'
                    : '#38bdf8',
              }}
            />
            <span style={{ fontWeight: 600 }}>{currentUser.displayName}</span>
            <span
              style={{
                fontSize: '0.72rem',
                padding: '2px 6px',
                borderRadius: '4px',
                background:
                  currentUser.role === 'teacher'
                    ? 'rgba(16, 185, 129, 0.2)'
                    : currentUser.role === 'admin'
                    ? 'rgba(239, 68, 68, 0.2)'
                    : 'rgba(56, 189, 248, 0.2)',
                color:
                  currentUser.role === 'teacher'
                    ? '#34d399'
                    : currentUser.role === 'admin'
                    ? '#f87171'
                    : '#38bdf8',
              }}
            >
              {currentUser.role === 'teacher'
                ? 'Giảng viên'
                : currentUser.role === 'admin'
                ? 'Admin'
                : 'Sinh viên'}
            </span>
          </div>
        )}
      </div>
    </header>
  );
};
