import React, { useRef } from 'react';

export type StudioViewMode = 'graph' | 'three-stage' | 'internals' | 'actions';
/** 'course' = guided learning path, 'learn' = free-form Git Studio. */
export type AppRoute = 'course' | 'learn' | 'author' | 'course-health';

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
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

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
          onClick={() => onNavigateRoute?.('course')}
          style={{ cursor: 'pointer' }}
          title="Trang chủ Git Academy"
        >
          G
        </div>
        <div>
          <div
            className="brand-title"
            onClick={() => onNavigateRoute?.('course')}
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

      {/* Top navigation: guided path <-> free-form studio */}
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
          {([
            { route: 'course', icon: '🧭', label: 'Lộ trình học', title: 'Quay lại lộ trình học Git từng bước' },
            { route: 'learn', icon: '🧪', label: 'Studio', title: 'Khu vực thực hành tương tác Git & GitHub' },
          ] as const).map((item) => (
            <button
              key={item.route}
              id={`nav-${item.route}`}
              onClick={() => onNavigateRoute(item.route)}
              style={{
                background: currentRoute === item.route ? '#0284c7' : 'transparent',
                color: currentRoute === item.route ? '#fff' : '#94a3b8',
                border: 'none',
                borderRadius: '6px',
                padding: '5px 12px',
                fontSize: '0.8rem',
                fontWeight: currentRoute === item.route ? 600 : 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.15s ease',
              }}
              title={item.title}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
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
      </div>
    </header>
  );
};
