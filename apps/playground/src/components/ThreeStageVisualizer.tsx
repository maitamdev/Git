import React from 'react';
import { GitState, FileState } from '@git-academy/shared';

interface ThreeStageVisualizerProps {
  state: GitState;
  activeAnimation?: 'add' | 'commit' | null;
}

export const ThreeStageVisualizer: React.FC<ThreeStageVisualizerProps> = ({
  state,
  activeAnimation,
}) => {
  const headCommit = state.commits.find(
    (c) => c.hash === (state.head.type === 'branch' ? state.branches.find((b) => b.name === state.head.ref)?.commitHash : state.head.ref)
  );
  const repoFiles = headCommit ? Object.keys(headCommit.tree) : [];

  return (
    <div
      className="three-stage-visualizer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: '#0a0f1d',
        color: '#e2e8f0',
        fontFamily: 'var(--font-sans)',
        fontSize: '0.85rem',
        borderLeft: '1px solid var(--border-subtle, #1e293b)',
        overflow: 'hidden',
      }}
      aria-label="3-Stage Git Architecture Visualizer"
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 12px',
          background: '#0f172a',
          borderBottom: '1px solid #1e293b',
          fontWeight: 600,
          fontSize: '0.8rem',
          letterSpacing: '0.05em',
        }}
      >
        <span>GIT 3-STAGE ARCHITECTURE</span>
        {activeAnimation && (
          <span
            style={{
              color: activeAnimation === 'add' ? '#38bdf8' : '#10b981',
              fontSize: '0.75rem',
              animation: 'pulse 1s infinite',
            }}
          >
            {activeAnimation === 'add' ? '⚡ Staging changes...' : '📦 Committing snapshot...'}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Stage 1: Working Tree */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid #1e293b',
            background: 'rgba(15, 23, 42, 0.4)',
          }}
        >
          <div
            style={{
              padding: '6px 10px',
              background: '#1e293b',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#94a3b8',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>📁 Working Tree</span>
            <span>{state.workingTree.length}</span>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
            {state.workingTree.length === 0 ? (
              <div style={{ color: '#475569', textAlign: 'center', marginTop: '20px' }}>
                Thư mục trống
              </div>
            ) : (
              state.workingTree.map((f) => {
                const statusBadge =
                  f.status === 'modified' ? 'M' : f.status === 'untracked' ? 'U' : f.status === 'added' ? 'A' : ' ';
                const badgeColor =
                  f.status === 'modified' ? '#f59e0b' : f.status === 'untracked' ? '#ef4444' : '#10b981';

                return (
                  <div
                    key={f.path}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '4px 8px',
                      marginBottom: '4px',
                      borderRadius: '4px',
                      background: '#131e36',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                    }}
                  >
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {f.path}
                    </span>
                    <span
                      style={{
                        padding: '1px 5px',
                        borderRadius: '3px',
                        background: `${badgeColor}22`,
                        color: badgeColor,
                        fontWeight: 'bold',
                        fontSize: '0.7rem',
                      }}
                      title={f.status}
                    >
                      {statusBadge}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Transition arrow 1 */}
        <div
          style={{
            width: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b',
            background: '#080d1a',
            fontSize: '0.9rem',
          }}
          title="git add"
        >
          ➔
        </div>

        {/* Stage 2: Staging Area (Index) */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid #1e293b',
            background: 'rgba(56, 189, 248, 0.03)',
          }}
        >
          <div
            style={{
              padding: '6px 10px',
              background: '#0c2340',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#38bdf8',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>📥 Staging Area</span>
            <span>{state.stagingArea.length}</span>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
            {state.stagingArea.length === 0 ? (
              <div style={{ color: '#475569', textAlign: 'center', marginTop: '20px' }}>
                Chưa có file staged
              </div>
            ) : (
              state.stagingArea.map((f) => (
                <div
                  key={f.path}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '4px 8px',
                    marginBottom: '4px',
                    borderRadius: '4px',
                    background: '#0d2d52',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                  }}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {f.path}
                  </span>
                  <span
                    style={{
                      padding: '1px 5px',
                      borderRadius: '3px',
                      background: 'rgba(56, 189, 248, 0.2)',
                      color: '#38bdf8',
                      fontWeight: 'bold',
                      fontSize: '0.7rem',
                    }}
                  >
                    Staged
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Transition arrow 2 */}
        <div
          style={{
            width: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b',
            background: '#080d1a',
            fontSize: '0.9rem',
          }}
          title="git commit"
        >
          ➔
        </div>

        {/* Stage 3: Repository (HEAD Snapshot) */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            background: 'rgba(16, 185, 129, 0.03)',
          }}
        >
          <div
            style={{
              padding: '6px 10px',
              background: '#06291d',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#34d399',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>📦 Repository (HEAD)</span>
            <span>{repoFiles.length}</span>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
            {repoFiles.length === 0 ? (
              <div style={{ color: '#475569', textAlign: 'center', marginTop: '20px' }}>
                Chưa có commit
              </div>
            ) : (
              repoFiles.map((p) => (
                <div
                  key={p}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '4px 8px',
                    marginBottom: '4px',
                    borderRadius: '4px',
                    background: '#0b3526',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                  }}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p}
                  </span>
                  <span
                    style={{
                      padding: '1px 5px',
                      borderRadius: '3px',
                      background: 'rgba(16, 185, 129, 0.2)',
                      color: '#34d399',
                      fontWeight: 'bold',
                      fontSize: '0.7rem',
                    }}
                  >
                    Committed
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
