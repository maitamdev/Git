import React, { useMemo, useState } from 'react';
import { GitState, Commit } from '@git-academy/shared';
import { GitGraphLayout, GraphNode } from '@git-academy/git-visualizer';

interface GitGraphViewProps {
  state: GitState;
}

export const GitGraphView: React.FC<GitGraphViewProps> = ({ state }) => {
  const layoutEngine = useMemo(() => new GitGraphLayout(), []);
  const layout = useMemo(() => layoutEngine.buildLayout(state), [layoutEngine, state]);

  // Zoom / Pan / Fit state
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedCommit, setSelectedCommit] = useState<Commit | null>(null);
  const [viewMode, setViewMode] = useState<'graph' | 'text'>('graph');

  const handleZoomIn = () => setZoomLevel((z) => Math.min(2, +(z + 0.15).toFixed(2)));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(0.6, +(z - 0.15).toFixed(2)));
  const handleResetZoom = () => setZoomLevel(1);

  const handleSelectNode = (node: GraphNode) => {
    const commit = state.commits.find((c) => c.hash === node.hash);
    if (commit) {
      setSelectedCommit(commit);
    }
  };

  return (
    <div className="git-graph-view" style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
      <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>GIT GRAPH VISUALIZER</span>
          <button
            onClick={() => setViewMode((m) => (m === 'graph' ? 'text' : 'graph'))}
            aria-label={viewMode === 'graph' ? 'Chuyển sang chế độ xem văn bản trợ năng' : 'Chuyển sang chế độ xem đồ thị trực quan'}
            style={{
              background: viewMode === 'text' ? '#3b82f6' : '#1e293b',
              color: '#f8fafc',
              border: '1px solid #334155',
              borderRadius: '4px',
              padding: '2px 8px',
              fontSize: '0.7rem',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            {viewMode === 'graph' ? '📜 Văn bản (A11y)' : '🌿 Đồ thị'}
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#10b981', fontSize: '0.75rem' }}>{state.commits.length} commits</span>
          {/* Zoom Controls */}
          {viewMode === 'graph' && (
            <div style={{ display: 'flex', gap: '2px', background: '#1e293b', borderRadius: '4px', padding: '1px' }}>
              <button
                onClick={handleZoomOut}
                title="Zoom out"
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '2px 6px' }}
              >
                -
              </button>
              <span style={{ fontSize: '0.7rem', padding: '2px 4px', color: '#cbd5e1' }}>
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                title="Zoom in"
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '2px 6px' }}
              >
                +
              </button>
              <button
                onClick={handleResetZoom}
                title="Fit to view"
                style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', fontSize: '0.7rem', padding: '2px 6px' }}
              >
                Fit
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="graph-canvas-container" style={{ flex: 1, position: 'relative', overflow: 'auto' }}>
        {viewMode === 'text' ? (
          <div
            role="region"
            aria-label="Lịch sử Commit dạng văn bản hỗ trợ tiếp cận"
            style={{ padding: '16px', overflow: 'auto', height: '100%', boxSizing: 'border-box' }}
          >
            {state.commits.length === 0 ? (
              <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>Chưa có commit nào trong lịch sử.</p>
            ) : (
              <table
                style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', color: '#cbd5e1' }}
                aria-label="Danh sách các commit"
              >
                <thead>
                  <tr style={{ borderBottom: '1px solid #334155', textAlign: 'left', color: '#94a3b8' }}>
                    <th style={{ padding: '6px' }}>Mã SHA-1</th>
                    <th style={{ padding: '6px' }}>Nhánh / Thẻ</th>
                    <th style={{ padding: '6px' }}>Thông điệp</th>
                    <th style={{ padding: '6px' }}>Tác giả</th>
                    <th style={{ padding: '6px' }}>Thời gian</th>
                  </tr>
                </thead>
                <tbody>
                  {[...state.commits].reverse().map((c) => {
                    const isHead =
                      state.head?.type === 'detached'
                        ? state.head?.ref === c.hash
                        : state.branches.find((b) => b.name === state.head?.ref)?.commitHash === c.hash;
                    const branchesOnCommit = state.branches
                      .filter((b) => b.commitHash === c.hash)
                      .map((b) => b.name);
                    const tagsOnCommit = state.tags
                      .filter((t) => t.commitHash === c.hash)
                      .map((t) => t.name);

                    return (
                      <tr
                        key={c.hash}
                        onClick={() => setSelectedCommit(c)}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') setSelectedCommit(c);
                        }}
                        style={{
                          borderBottom: '1px solid #1e293b',
                          cursor: 'pointer',
                          background: selectedCommit?.hash === c.hash ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                        }}
                      >
                        <td style={{ padding: '6px', fontFamily: 'monospace', color: '#38bdf8' }}>
                          {c.shortHash}
                        </td>
                        <td style={{ padding: '6px' }}>
                          {isHead && (
                            <span
                              style={{
                                background: '#0284c7',
                                color: '#fff',
                                padding: '1px 4px',
                                borderRadius: '3px',
                                marginRight: '4px',
                                fontSize: '0.7rem',
                              }}
                            >
                              HEAD
                            </span>
                          )}
                          {branchesOnCommit.map((b) => (
                            <span
                              key={b}
                              style={{
                                background: '#059669',
                                color: '#fff',
                                padding: '1px 4px',
                                borderRadius: '3px',
                                marginRight: '4px',
                                fontSize: '0.7rem',
                              }}
                            >
                              {b}
                            </span>
                          ))}
                          {tagsOnCommit.map((t) => (
                            <span
                              key={t}
                              style={{
                                background: '#d97706',
                                color: '#fff',
                                padding: '1px 4px',
                                borderRadius: '3px',
                                marginRight: '4px',
                                fontSize: '0.7rem',
                              }}
                            >
                              tag: {t}
                            </span>
                          ))}
                        </td>
                        <td style={{ padding: '6px', color: '#f1f5f9', fontWeight: 500 }}>
                          {c.message}
                        </td>
                        <td style={{ padding: '6px', color: '#94a3b8' }}>{c.author.name}</td>
                        <td style={{ padding: '6px', color: '#64748b' }}>
                          {new Date(c.timestamp).toLocaleString('vi-VN')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        ) : layout.nodes.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🌿</div>
            <div>Chưa có commit nào trong lịch sử.</div>
            <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
              Hãy chạy <code style={{ color: '#38bdf8' }}>git commit</code> để tạo node đầu tiên!
            </div>
          </div>
        ) : (
          <div style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left', transition: 'transform 0.15s ease' }}>
            <svg
              viewBox={`0 0 ${layout.width} ${layout.height}`}
              style={{ width: `${layout.width}px`, height: `${layout.height}px`, overflow: 'visible' }}
            >
              <defs>
                <filter id="glow-node" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Connecting Edges */}
              <g className="edges">
                {layout.edges.map((edge) => {
                  const dx = edge.toX - edge.fromX;
                  const dy = edge.toY - edge.fromY;
                  let pathD = '';
                  if (dy === 0) {
                    pathD = `M ${edge.fromX} ${edge.fromY} L ${edge.toX} ${edge.toY}`;
                  } else {
                    const controlX1 = edge.fromX + dx * 0.5;
                    const controlY1 = edge.fromY;
                    const controlX2 = edge.fromX + dx * 0.5;
                    const controlY2 = edge.toY;
                    pathD = `M ${edge.fromX} ${edge.fromY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${edge.toX} ${edge.toY}`;
                  }

                  return (
                    <path
                      key={edge.id}
                      d={pathD}
                      stroke={edge.color}
                      strokeWidth={3}
                      fill="none"
                      strokeDasharray={edge.isMerge ? '4,4' : undefined}
                      opacity={0.8}
                    />
                  );
                })}
              </g>

              {/* Commit Nodes */}
              <g className="nodes">
                {layout.nodes.map((node) => {
                  const isSelected = selectedCommit?.hash === node.hash;

                  return (
                    <g
                      key={node.hash}
                      className="commit-group"
                      onClick={() => handleSelectNode(node)}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Selected / Head Glow Effect */}
                      {(node.isHead || isSelected) && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={isSelected ? 26 : 22}
                          fill={isSelected ? '#38bdf8' : node.color}
                          opacity={0.3}
                          filter="url(#glow-node)"
                        />
                      )}

                      {/* Outer Circle */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={14}
                        fill="#0f172a"
                        stroke={isSelected ? '#38bdf8' : node.color}
                        strokeWidth={isSelected ? 4 : 3.5}
                      />

                      {/* Center Dot */}
                      <circle cx={node.x} cy={node.y} r={5} fill={isSelected ? '#38bdf8' : node.color} />

                      {/* Hash label */}
                      <text
                        x={node.x}
                        y={node.y + (node.isHead ? 54 : 36)}
                        textAnchor="middle"
                        fill={isSelected ? '#38bdf8' : '#94a3b8'}
                        fontFamily="var(--font-mono)"
                        fontSize="11"
                        fontWeight={isSelected ? 'bold' : 'normal'}
                      >
                        {node.shortHash}
                      </text>

                      {/* Message label */}
                      <text
                        x={node.x}
                        y={node.y + (node.isHead ? 70 : 52)}
                        textAnchor="middle"
                        fill="#e2e8f0"
                        fontFamily="var(--font-sans)"
                        fontSize="11"
                        fontWeight="500"
                      >
                        {node.message.length > 20 ? `${node.message.slice(0, 18)}...` : node.message}
                      </text>

                      {/* Branch Badges */}
                      {node.branches.map((bName, bIdx) => {
                        const isRemote = bName.startsWith('origin/') || bName.includes('/');
                        const badgeColor = isRemote ? '#06b6d4' : node.color;

                        return (
                          <g key={bName} transform={`translate(${node.x}, ${node.y - 28 - bIdx * 22})`}>
                            <rect
                              x="-35"
                              y="-10"
                              width="70"
                              height="20"
                              rx="4"
                              fill="#0f172a"
                              stroke={badgeColor}
                              strokeWidth="1.5"
                            />
                            <text
                              x="0"
                              y="4"
                              textAnchor="middle"
                              fill={badgeColor}
                              fontFamily="var(--font-mono)"
                              fontSize="11"
                              fontWeight="600"
                            >
                              {bName}
                            </text>
                          </g>
                        );
                      })}

                      {/* HEAD Indicator */}
                      {node.isHead && (
                        <g transform={`translate(${node.x}, ${node.y + 34})`}>
                          <rect x="-24" y="-8" width="48" height="16" rx="4" fill="#3b82f6" />
                          <text
                            x="0"
                            y="4"
                            textAnchor="middle"
                            fill="#ffffff"
                            fontFamily="var(--font-mono)"
                            fontSize="9"
                            fontWeight="bold"
                          >
                            HEAD
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>
        )}
      </div>

      {/* Commit Inspection Modal / Bottom Panel (Part S) */}
      {selectedCommit && (
        <div
          className="commit-inspector"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: '#090d1a',
            borderTop: '1px solid #334155',
            padding: '12px 16px',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-sans)',
            color: '#e2e8f0',
            boxShadow: '0 -4px 12px rgba(0,0,0,0.5)',
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#38bdf8' }}>
                  {selectedCommit.message}
                </span>
                <span
                  style={{
                    padding: '1px 6px',
                    borderRadius: '4px',
                    background: '#1e293b',
                    fontFamily: 'var(--font-mono)',
                    color: '#94a3b8',
                  }}
                >
                  {selectedCommit.shortHash}
                </span>
              </div>
              <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '2px' }}>
                Tác giả: <strong style={{ color: '#cbd5e1' }}>{selectedCommit.author.name}</strong> &lt;{selectedCommit.author.email}&gt; |{' '}
                {new Date(selectedCommit.timestamp).toLocaleString('vi-VN')}
              </div>
            </div>

            <button
              onClick={() => setSelectedCommit(null)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                fontSize: '1rem',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>

          <div style={{ display: 'flex', gap: '16px', color: '#94a3b8', fontSize: '0.75rem' }}>
            <div>
              Parents:{' '}
              {selectedCommit.parents.length === 0 ? (
                <span style={{ color: '#64748b' }}>None (root)</span>
              ) : (
                selectedCommit.parents.map((p) => (
                  <span
                    key={p}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      background: '#1e293b',
                      padding: '1px 5px',
                      borderRadius: '3px',
                      marginRight: '4px',
                      color: '#38bdf8',
                    }}
                  >
                    {p.slice(0, 7)}
                  </span>
                ))
              )}
            </div>

            <div>
              Files Snapshot: <strong style={{ color: '#10b981' }}>{Object.keys(selectedCommit.tree).length} tệp</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
