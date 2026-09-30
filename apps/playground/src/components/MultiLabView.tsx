import React, { useState } from 'react';
import { Scenario, GoalCheckItem } from '@git-academy/shared';

interface MultiLabViewProps {
  scenarios: Scenario[];
  activeLabIndex: number;
  completedLabIds: string[];
  checklist: GoalCheckItem[];
  allPassed: boolean;
  onSelectLab: (index: number) => void;
  onResetLab: () => void;
  onHint: () => void;
}

export const MultiLabView: React.FC<MultiLabViewProps> = ({
  scenarios,
  activeLabIndex,
  completedLabIds,
  checklist,
  allPassed,
  onSelectLab,
  onResetLab,
  onHint,
}) => {
  const [showHints, setShowHints] = useState<boolean>(false);
  const currentScenario = scenarios[activeLabIndex] || scenarios[0];

  if (!currentScenario) {
    return (
      <div style={{ padding: '1rem', color: '#64748b', textAlign: 'center' }}>
        Bài học này là lý thuyết & trắc nghiệm, không có bài Lab thực hành.
      </div>
    );
  }

  return (
    <div className="multi-lab-view" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Top multi-lab tabs switcher if more than 1 lab */}
      {scenarios.length > 1 && (
        <div
          style={{
            display: 'flex',
            gap: '0.4rem',
            padding: '0.4rem 0.6rem',
            background: '#090d16',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          {scenarios.map((sc, idx) => {
            const isCompleted = completedLabIds.includes(sc.id);
            const isActive = idx === activeLabIndex;
            // Lab is locked if previous lab is not completed
            const isUnlocked = idx === 0 || completedLabIds.includes(scenarios[idx - 1].id);

            let badgeIcon = '○';
            let badgeColor = '#64748b';
            if (isCompleted) {
              badgeIcon = '✓';
              badgeColor = '#10b981';
            } else if (isActive) {
              badgeIcon = '●';
              badgeColor = '#38bdf8';
            } else if (!isUnlocked) {
              badgeIcon = '🔒';
              badgeColor = '#64748b';
            }

            const label = idx === scenarios.length - 1 && scenarios.length > 2 ? 'Challenge' : `Lab ${idx + 1}`;

            return (
              <button
                key={sc.id}
                disabled={!isUnlocked}
                onClick={() => onSelectLab(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '5px',
                  background: isActive ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255,255,255,0.03)',
                  border: isActive ? '1px solid #38bdf8' : '1px solid #1e293b',
                  color: isActive ? '#38bdf8' : isUnlocked ? '#cbd5e1' : '#64748b',
                  cursor: isUnlocked ? 'pointer' : 'not-allowed',
                  fontSize: '0.78rem',
                  fontWeight: isActive ? 600 : 400,
                  transition: 'all 0.15s ease',
                }}
              >
                <span style={{ color: badgeColor, fontWeight: 700 }}>{badgeIcon}</span>
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Lab Header */}
      <div style={{ padding: '0.8rem 1rem', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 style={{ fontSize: '1rem', margin: '0 0 0.2rem 0', color: '#f8fafc' }}>
              {currentScenario.title}
            </h3>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#94a3b8' }}>
              {currentScenario.description || 'Hoàn thành các mục tiêu bên dưới để vượt qua bài thực hành.'}
            </p>
          </div>

          <button
            onClick={onResetLab}
            style={{
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#f87171',
              padding: '0.3rem 0.6rem',
              borderRadius: '4px',
              fontSize: '0.72rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
            title="Thiết lập lại toàn bộ repository và VFS về trạng thái ban đầu của Lab"
          >
            🔄 Reset Lab
          </button>
        </div>
      </div>

      {/* Checklist Goals */}
      <div style={{ flex: 1, padding: '0.8rem 1rem', overflowY: 'auto' }}>
        <div style={{ marginBottom: '0.6rem', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>
          Mục tiêu cần hoàn thành
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {checklist.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.5rem 0.75rem',
                borderRadius: '6px',
                background: item.passed ? 'rgba(16, 185, 129, 0.1)' : 'rgba(15, 23, 42, 0.6)',
                border: `1px solid ${item.passed ? 'rgba(16, 185, 129, 0.4)' : '#1e293b'}`,
                fontSize: '0.82rem',
                color: item.passed ? '#34d399' : '#cbd5e1',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{item.passed ? '✓' : '○'}</span>
              <span style={{ flex: 1 }}>{item.description}</span>
            </div>
          ))}
        </div>

        {/* Completion Banner */}
        {allPassed && (
          <div
            style={{
              marginTop: '1rem',
              padding: '0.8rem 1rem',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(15, 23, 42, 0.6) 100%)',
              border: '1px solid #10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ color: '#34d399', fontWeight: 700, fontSize: '0.9rem' }}>
                🎉 Chúc mừng! Bạn đã hoàn thành bài Lab này!
              </div>
              <div style={{ color: '#a7f3d0', fontSize: '0.78rem' }}>
                +{currentScenario.success?.xp || 50} XP đã được cộng vào tài khoản của bạn.
              </div>
            </div>
          </div>
        )}

        {/* Hints */}
        {currentScenario.hints && currentScenario.hints.length > 0 && (
          <div style={{ marginTop: '1.2rem' }}>
            <div
              onClick={() => setShowHints(!showHints)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                fontSize: '0.78rem',
                color: '#eab308',
                padding: '0.4rem 0',
              }}
            >
              <span>💡 {showHints ? 'Ẩn gợi ý' : 'Bạn cần gợi ý hướng dẫn?'}</span>
              <span>{showHints ? '▲' : '▼'}</span>
            </div>

            {showHints && (
              <div
                style={{
                  background: 'rgba(234, 179, 8, 0.08)',
                  border: '1px solid rgba(234, 179, 8, 0.3)',
                  borderRadius: '6px',
                  padding: '0.6rem 0.8rem',
                  fontSize: '0.78rem',
                  color: '#fef08a',
                  lineHeight: '1.5',
                }}
              >
                {currentScenario.hints.map((h, i) => (
                  <div key={i} style={{ marginBottom: i < currentScenario.hints!.length - 1 ? '0.4rem' : '0' }}>
                    {i + 1}. {h}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
