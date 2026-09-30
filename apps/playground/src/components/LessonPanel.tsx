import React, { useEffect } from 'react';
import { CourseLesson, GoalCheckItem, Scenario } from '@git-academy/shared';
import { DEFAULT_ACHIEVEMENTS } from '@git-academy/exercise-engine';
import { CustomBlockRenderer } from './CustomBlockRenderer';
import { MultiLabView } from './MultiLabView';
import { QuizView } from './QuizView';

interface LessonPanelProps {
  lesson: CourseLesson;
  activeTab: 'theory' | 'lab' | 'quiz' | 'achievements';
  setActiveTab: (tab: 'theory' | 'lab' | 'quiz' | 'achievements') => void;
  // Multi lab props
  scenarios: Scenario[];
  activeLabIndex: number;
  completedLabIds: string[];
  checklist: GoalCheckItem[];
  allPassed: boolean;
  onSelectLab: (index: number) => void;
  onResetLab: () => void;
  onHint: () => void;
  onRunTerminalCommand: (cmd: string) => void;
  // Quiz
  onQuizPass: (score: number, xp: number) => void;
  // Theory tracking
  onTheoryViewed: () => void;
  // Achievements
  unlockedAchievements: string[];
}

export const LessonPanel: React.FC<LessonPanelProps> = ({
  lesson,
  activeTab,
  setActiveTab,
  scenarios,
  activeLabIndex,
  completedLabIds,
  checklist,
  allPassed,
  onSelectLab,
  onResetLab,
  onHint,
  onRunTerminalCommand,
  onQuizPass,
  onTheoryViewed,
  unlockedAchievements,
}) => {
  // Mark theory as viewed when user enters the theory tab
  useEffect(() => {
    if (activeTab === 'theory') {
      onTheoryViewed();
    }
  }, [activeTab, onTheoryViewed]);

  return (
    <div
      className="lesson-panel"
      style={{
        width: '380px',
        display: 'flex',
        flexDirection: 'column',
        background: '#090d16',
        borderRight: '1px solid var(--border-subtle)',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Tab Navigation */}
      <div
        className="tabs-header"
        style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-subtle)',
          background: '#0b101b',
        }}
      >
        <button
          className={`tab-button ${activeTab === 'theory' ? 'active' : ''}`}
          onClick={() => setActiveTab('theory')}
          style={{
            flex: 1,
            padding: '0.65rem 0.2rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'theory' ? '2px solid #38bdf8' : '2px solid transparent',
            color: activeTab === 'theory' ? '#38bdf8' : '#94a3b8',
            fontSize: '0.78rem',
            fontWeight: activeTab === 'theory' ? 600 : 400,
            cursor: 'pointer',
          }}
        >
          📖 Lý thuyết
        </button>

        <button
          className={`tab-button ${activeTab === 'lab' ? 'active' : ''}`}
          onClick={() => setActiveTab('lab')}
          style={{
            flex: 1,
            padding: '0.65rem 0.2rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'lab' ? '2px solid #10b981' : '2px solid transparent',
            color: activeTab === 'lab' ? '#10b981' : '#94a3b8',
            fontSize: '0.78rem',
            fontWeight: activeTab === 'lab' ? 600 : 400,
            cursor: 'pointer',
          }}
        >
          🧪 Thực hành
        </button>

        <button
          className={`tab-button ${activeTab === 'quiz' ? 'active' : ''}`}
          onClick={() => setActiveTab('quiz')}
          style={{
            flex: 1,
            padding: '0.65rem 0.2rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'quiz' ? '2px solid #facc15' : '2px solid transparent',
            color: activeTab === 'quiz' ? '#facc15' : '#94a3b8',
            fontSize: '0.78rem',
            fontWeight: activeTab === 'quiz' ? 600 : 400,
            cursor: 'pointer',
          }}
        >
          📝 Trắc nghiệm
        </button>

        <button
          className={`tab-button ${activeTab === 'achievements' ? 'active' : ''}`}
          onClick={() => setActiveTab('achievements')}
          style={{
            flex: 1,
            padding: '0.65rem 0.2rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'achievements' ? '2px solid #a855f7' : '2px solid transparent',
            color: activeTab === 'achievements' ? '#a855f7' : '#94a3b8',
            fontSize: '0.78rem',
            fontWeight: activeTab === 'achievements' ? 600 : 400,
            cursor: 'pointer',
          }}
        >
          🏆 Huy hiệu
        </button>
      </div>

      {/* Tab Contents */}
      <div className="tab-body" style={{ flex: 1, overflowY: 'auto' }}>
        {activeTab === 'theory' && (
          <div style={{ padding: '1rem' }}>
            <CustomBlockRenderer
              content={lesson.content}
              onRunCommand={onRunTerminalCommand}
              onSwitchTab={setActiveTab}
            />
          </div>
        )}

        {activeTab === 'lab' && (
          <MultiLabView
            scenarios={scenarios}
            activeLabIndex={activeLabIndex}
            completedLabIds={completedLabIds}
            checklist={checklist}
            allPassed={allPassed}
            onSelectLab={onSelectLab}
            onResetLab={onResetLab}
            onHint={onHint}
          />
        )}

        {activeTab === 'quiz' && (
          <div style={{ padding: '0.8rem' }}>
            {lesson.quiz ? (
              <QuizView
                quiz={lesson.quiz}
                onPass={onQuizPass}
                earnedXp={lesson.metadata.xp}
              />
            ) : (
              <div style={{ padding: '1.5rem', color: '#64748b', textAlign: 'center', fontSize: '0.85rem' }}>
                Bài học này không có bài trắc nghiệm.
              </div>
            )}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div style={{ padding: '1rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '0.95rem', margin: '0 0 0.2rem 0', color: '#f8fafc' }}>
                Hệ thống Danh hiệu & Thành tựu
              </h3>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8' }}>
                Hoàn thành các mốc kỹ năng Git để mở khóa huy hiệu vinh danh.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {DEFAULT_ACHIEVEMENTS.map((ach) => {
                const isUnlocked = unlockedAchievements.includes(ach.id);

                return (
                  <div
                    key={ach.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      background: isUnlocked
                        ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(15, 23, 42, 0.6) 100%)'
                        : 'rgba(255, 255, 255, 0.02)',
                      border: `1px solid ${isUnlocked ? '#a855f7' : '#1e293b'}`,
                      opacity: isUnlocked ? 1 : 0.6,
                    }}
                  >
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: isUnlocked ? 'rgba(168, 85, 247, 0.25)' : '#1e293b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                      }}
                    >
                      {ach.icon === 'rocket'
                        ? '🚀'
                        : ach.icon === 'camera'
                        ? '📸'
                        : ach.icon === 'git-branch'
                        ? '🌿'
                        : ach.icon === 'git-merge'
                        ? '🔀'
                        : ach.icon === 'shield'
                        ? '🛡️'
                        : ach.icon === 'award'
                        ? '🏆'
                        : ach.icon === 'zap'
                        ? '⚡'
                        : '🎖️'}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.82rem', color: isUnlocked ? '#f8fafc' : '#cbd5e1' }}>
                          {ach.title}
                        </span>
                        {isUnlocked && (
                          <span style={{ fontSize: '0.68rem', color: '#a855f7', fontWeight: 700 }}>
                            ✓ ĐÃ MỞ KHÓA
                          </span>
                        )}
                      </div>
                      <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.72rem', color: '#94a3b8' }}>
                        {ach.description}
                      </p>
                    </div>

                    <span style={{ fontSize: '0.72rem', color: '#facc15', fontWeight: 600 }}>
                      +{ach.xp} XP
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
