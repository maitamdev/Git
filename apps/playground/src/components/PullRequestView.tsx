import React, { useState } from 'react';
import { DiffView } from './DiffView';

export interface PRReviewItem {
  id: number;
  author: string;
  type: 'comment' | 'approve' | 'request_changes';
  body: string;
  timestamp: number;
}

export interface PRFileDiffItem {
  path: string;
  status: 'added' | 'modified' | 'deleted';
  oldContent: string | null;
  newContent: string | null;
}

export interface PullRequestViewProps {
  pr: {
    id: number;
    title: string;
    description: string;
    author: string;
    sourceBranch: string;
    targetBranch: string;
    commits: string[];
    status: 'open' | 'merged' | 'closed';
    reviews: PRReviewItem[];
  };
  fileDiffs: PRFileDiffItem[];
  onMerge: () => void;
  onAddReview: (type: 'comment' | 'approve' | 'request_changes', body: string) => void;
  onClose?: () => void;
}

export const PullRequestView: React.FC<PullRequestViewProps> = ({
  pr,
  fileDiffs,
  onMerge,
  onAddReview,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'commits' | 'files' | 'review'>('overview');
  const [reviewType, setReviewType] = useState<'comment' | 'approve' | 'request_changes'>('approve');
  const [reviewBody, setReviewBody] = useState('');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewBody.trim()) return;
    onAddReview(reviewType, reviewBody);
    setReviewBody('');
  };

  return (
    <div
      className="pull-request-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: '#0a0f1d',
        color: '#e2e8f0',
        fontFamily: 'var(--font-sans)',
        fontSize: '0.85rem',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '12px 16px',
          borderBottom: '1px solid #1e293b',
          background: '#0f172a',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  background:
                    pr.status === 'open' ? '#10b981' : pr.status === 'merged' ? '#8b5cf6' : '#ef4444',
                  color: '#ffffff',
                }}
              >
                {pr.status === 'open' ? '● Open' : pr.status === 'merged' ? '✓ Merged' : '✕ Closed'}
              </span>
              <span style={{ fontSize: '1.05rem', fontWeight: 600 }}>{pr.title}</span>
              <span style={{ color: '#64748b' }}>#{pr.id}</span>
            </div>

            <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '4px' }}>
              <code style={{ color: '#38bdf8' }}>{pr.sourceBranch}</code> muốn hợp nhất vào{' '}
              <code style={{ color: '#34d399' }}>{pr.targetBranch}</code> • Tác giả:{' '}
              <strong>{pr.author}</strong>
            </div>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                fontSize: '1.2rem',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* PR Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              background: activeTab === 'overview' ? '#1e293b' : 'transparent',
              color: activeTab === 'overview' ? '#38bdf8' : '#94a3b8',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('commits')}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              background: activeTab === 'commits' ? '#1e293b' : 'transparent',
              color: activeTab === 'commits' ? '#38bdf8' : '#94a3b8',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Commits ({pr.commits.length})
          </button>
          <button
            onClick={() => setActiveTab('files')}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              background: activeTab === 'files' ? '#1e293b' : 'transparent',
              color: activeTab === 'files' ? '#38bdf8' : '#94a3b8',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Files Changed ({fileDiffs.length})
          </button>
          <button
            onClick={() => setActiveTab('review')}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              background: activeTab === 'review' ? '#1e293b' : 'transparent',
              color: activeTab === 'review' ? '#38bdf8' : '#94a3b8',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Review ({pr.reviews.length})
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {activeTab === 'overview' && (
          <div>
            <div
              style={{
                padding: '14px',
                borderRadius: '6px',
                background: '#0f172a',
                border: '1px solid #1e293b',
                marginBottom: '16px',
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: '6px' }}>Mô tả:</div>
              <div style={{ color: '#cbd5e1', whiteSpace: 'pre-wrap' }}>{pr.description}</div>
            </div>

            {/* Merge Action Box */}
            <div
              style={{
                padding: '16px',
                borderRadius: '6px',
                background: pr.status === 'open' ? 'rgba(16, 185, 129, 0.05)' : '#0f172a',
                border: `1px solid ${pr.status === 'open' ? '#10b981' : '#334155'}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontWeight: 600, color: pr.status === 'open' ? '#34d399' : '#94a3b8' }}>
                  {pr.status === 'open' ? 'Sẵn sàng hợp nhất (Merge Pull Request)' : 'Pull Request đã kết thúc'}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                  Hệ thống sẽ gọi Git Engine để tạo merge commit hoặc fast-forward vào nhánh {pr.targetBranch}.
                </div>
              </div>

              {pr.status === 'open' && (
                <button
                  onClick={onMerge}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    background: '#10b981',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                  }}
                >
                  ✓ Merge Pull Request
                </button>
              )}
            </div>
          </div>
        )}

        {activeTab === 'commits' && (
          <div>
            {pr.commits.map((cHash) => (
              <div
                key={cHash}
                style={{
                  padding: '10px 14px',
                  borderRadius: '6px',
                  background: '#0f172a',
                  border: '1px solid #1e293b',
                  marginBottom: '8px',
                  fontFamily: 'var(--font-mono)',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>Commit {cHash.slice(0, 7)}</span>
                <span style={{ color: '#38bdf8' }}>{cHash}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'files' && (
          <div>
            {fileDiffs.map((diff) => (
              <div key={diff.path} style={{ marginBottom: '16px' }}>
                <DiffView
                  filename={diff.path}
                  oldContent={diff.oldContent}
                  newContent={diff.newContent}
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'review' && (
          <div>
            {/* Reviews history */}
            <div style={{ marginBottom: '20px' }}>
              {pr.reviews.length === 0 ? (
                <div style={{ color: '#64748b', textAlign: 'center', padding: '20px' }}>
                  Chưa có review nào được gửi cho Pull Request này.
                </div>
              ) : (
                pr.reviews.map((r) => (
                  <div
                    key={r.id}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '6px',
                      background: '#0f172a',
                      border: '1px solid #1e293b',
                      marginBottom: '10px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 600, color: '#f8fafc' }}>{r.author}</span>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          color:
                            r.type === 'approve'
                              ? '#10b981'
                              : r.type === 'request_changes'
                              ? '#ef4444'
                              : '#38bdf8',
                        }}
                      >
                        {r.type === 'approve' ? '✓ Approved' : r.type === 'request_changes' ? '✕ Changes Requested' : '💬 Comment'}
                      </span>
                    </div>
                    <div style={{ color: '#cbd5e1' }}>{r.body}</div>
                  </div>
                ))
              )}
            </div>

            {/* Submit new review form */}
            {pr.status === 'open' && (
              <form
                onSubmit={handleSubmitReview}
                style={{
                  padding: '16px',
                  borderRadius: '6px',
                  background: '#090e1a',
                  border: '1px solid #334155',
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: '10px' }}>Gửi đánh giá mã nguồn (Review):</div>

                <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="reviewType"
                      value="approve"
                      checked={reviewType === 'approve'}
                      onChange={() => setReviewType('approve')}
                    />
                    <span style={{ color: '#10b981', fontWeight: 600 }}>Approve</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="reviewType"
                      value="request_changes"
                      checked={reviewType === 'request_changes'}
                      onChange={() => setReviewType('request_changes')}
                    />
                    <span style={{ color: '#ef4444', fontWeight: 600 }}>Request Changes</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="reviewType"
                      value="comment"
                      checked={reviewType === 'comment'}
                      onChange={() => setReviewType('comment')}
                    />
                    <span style={{ color: '#38bdf8', fontWeight: 600 }}>Comment</span>
                  </label>
                </div>

                <textarea
                  rows={3}
                  placeholder="Nhận xét chi tiết về thay đổi mã nguồn..."
                  value={reviewBody}
                  onChange={(e) => setReviewBody(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #334155',
                    background: '#0f172a',
                    color: '#f8fafc',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem',
                    marginBottom: '10px',
                    outline: 'none',
                  }}
                  required
                />

                <button
                  type="submit"
                  style={{
                    padding: '6px 14px',
                    borderRadius: '6px',
                    border: 'none',
                    background: '#38bdf8',
                    color: '#020617',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Gửi Review
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
