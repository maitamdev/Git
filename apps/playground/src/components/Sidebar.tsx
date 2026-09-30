import React, { useState } from 'react';
import { CourseManifest, CourseModule, ManifestLessonItem, CourseProgress } from '@git-academy/shared';

interface SidebarProps {
  manifest: CourseManifest;
  activeModuleId: string;
  activeLessonId: string;
  courseProgress: CourseProgress;
  canAccessLesson: (lesson: ManifestLessonItem) => boolean;
  getPrerequisiteBreakdown: (lesson: ManifestLessonItem) => { id: string; title: string; completed: boolean }[];
  onSelectLesson: (moduleId: string, lessonId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  manifest,
  activeModuleId,
  activeLessonId,
  courseProgress,
  canAccessLesson,
  getPrerequisiteBreakdown,
  onSelectLesson,
}) => {
  // Track expanded modules
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    manifest.curriculum.forEach((mod) => {
      init[mod.id] = true; // Expand all by default
    });
    return init;
  });

  const [hoveredLockedLesson, setHoveredLockedLesson] = useState<string | null>(null);

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  return (
    <aside
      className="course-sidebar"
      style={{
        width: '280px',
        background: '#090d16',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        userSelect: 'none',
      }}
    >
      {/* Brand / Logo */}
      <div
        style={{
          padding: '1rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
        }}
      >
        <span style={{ fontSize: '1.4rem' }}>⚡</span>
        <div>
          <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
            Git Academy
          </h2>
          <span style={{ fontSize: '0.72rem', color: '#38bdf8' }}>Curriculum Platform</span>
        </div>
      </div>

      {/* Curriculum Module List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.6rem' }}>
        {manifest.curriculum.map((module: CourseModule) => {
          const isExpanded = expandedModules[module.id] ?? true;
          const completedCount = module.lessons.filter((l) => courseProgress.lessons[l.id]?.completed).length;

          return (
            <div key={module.id} style={{ marginBottom: '0.8rem' }}>
              {/* Module Header */}
              <div
                onClick={() => toggleModule(module.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.5rem 0.6rem',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#94a3b8',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.7rem', color: '#64748b' }}>{isExpanded ? '▼' : '▶'}</span>
                  <span style={{ color: '#e2e8f0' }}>{module.title}</span>
                </div>
                <span
                  style={{
                    fontSize: '0.7rem',
                    color: completedCount === module.lessons.length ? '#10b981' : '#64748b',
                  }}
                >
                  {completedCount}/{module.lessons.length}
                </span>
              </div>

              {/* Module Lessons */}
              {isExpanded && (
                <div style={{ marginTop: '0.3rem', marginLeft: '0.5rem', borderLeft: '1px solid #1e293b' }}>
                  {module.lessons.map((lesson: ManifestLessonItem) => {
                    const isCompleted = courseProgress.lessons[lesson.id]?.completed ?? false;
                    const isActive = module.id === activeModuleId && lesson.id === activeLessonId;
                    const isUnlocked = canAccessLesson(lesson);
                    const breakdown = getPrerequisiteBreakdown(lesson);

                    let statusIcon = '○';
                    let statusColor = '#64748b';

                    if (isCompleted) {
                      statusIcon = '✓';
                      statusColor = '#10b981';
                    } else if (isActive) {
                      statusIcon = '●';
                      statusColor = '#38bdf8';
                    } else if (!isUnlocked) {
                      statusIcon = '🔒';
                      statusColor = '#64748b';
                    }

                    return (
                      <div
                        key={lesson.id}
                        style={{ position: 'relative' }}
                        onMouseEnter={() => !isUnlocked && setHoveredLockedLesson(lesson.id)}
                        onMouseLeave={() => setHoveredLockedLesson(null)}
                      >
                        <div
                          onClick={() => {
                            if (isUnlocked) {
                              onSelectLesson(module.id, lesson.id);
                            }
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.45rem 0.6rem 0.45rem 0.8rem',
                            borderRadius: '4px',
                            cursor: isUnlocked ? 'pointer' : 'not-allowed',
                            opacity: isUnlocked ? 1 : 0.5,
                            background: isActive
                              ? 'linear-gradient(90deg, rgba(56, 189, 248, 0.15) 0%, rgba(56, 189, 248, 0.05) 100%)'
                              : 'transparent',
                            color: isActive ? '#38bdf8' : isCompleted ? '#cbd5e1' : '#94a3b8',
                            fontSize: '0.8rem',
                            fontWeight: isActive ? 600 : 400,
                            borderLeft: isActive ? '2px solid #38bdf8' : '2px solid transparent',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}>
                            <span style={{ color: statusColor, fontWeight: 700, width: '14px', textAlign: 'center' }}>
                              {statusIcon}
                            </span>
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {lesson.title}
                            </span>
                          </div>
                          <span style={{ fontSize: '0.7rem', color: '#64748b' }}>{lesson.xp} XP</span>
                        </div>

                        {/* Prerequisite popup card on hover when locked */}
                        {hoveredLockedLesson === lesson.id && !isUnlocked && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '100%',
                              left: '1rem',
                              zIndex: 100,
                              background: '#0d131f',
                              border: '1px solid #334155',
                              boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                              borderRadius: '6px',
                              padding: '0.6rem 0.8rem',
                              width: '220px',
                              fontSize: '0.75rem',
                              color: '#cbd5e1',
                            }}
                          >
                            <div style={{ color: '#f87171', fontWeight: 600, marginBottom: '0.3rem' }}>
                              🔒 Bài học đang bị khóa
                            </div>
                            <div style={{ color: '#94a3b8', marginBottom: '0.4rem' }}>
                              Bạn cần hoàn thành trước:
                            </div>
                            {breakdown.map((req) => (
                              <div
                                key={req.id}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.4rem',
                                  padding: '0.15rem 0',
                                  color: req.completed ? '#10b981' : '#94a3b8',
                                }}
                              >
                                <span>{req.completed ? '✓' : '○'}</span>
                                <span>{req.title}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer stats */}
      <div
        style={{
          padding: '0.8rem 1rem',
          borderTop: '1px solid var(--border-subtle)',
          background: '#070b13',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.75rem',
          color: '#64748b',
        }}
      >
        <span>Hoàn thành</span>
        <span style={{ color: '#10b981', fontWeight: 600 }}>
          {Object.values(courseProgress.lessons).filter((l) => l.completed).length} bài học
        </span>
      </div>
    </aside>
  );
};
