import { AchievementDefinition } from '@git-academy/shared';

export const DEFAULT_ACHIEVEMENTS: AchievementDefinition[] = [
  {
    id: 'first-repo',
    title: 'First Repository',
    description: 'Khởi tạo repository đầu tiên với git init',
    xp: 50,
    icon: '🌱',
    condition: {
      type: 'repository_initialized',
      operator: '==',
      value: true,
    },
  },
  {
    id: 'first-commit',
    title: 'First Commit',
    description: 'Lưu snapshot đầu tiên vào lịch sử Git',
    xp: 100,
    icon: '📦',
    condition: {
      type: 'commit_count',
      operator: '>=',
      value: 1,
    },
  },
  {
    id: 'branch-explorer',
    title: 'Branch Explorer',
    description: 'Tạo và quản lý các nhánh trong Git',
    xp: 150,
    icon: '🌿',
    condition: {
      type: 'branch_count',
      operator: '>=',
      value: 2,
    },
  },
  {
    id: 'merge-master',
    title: 'Merge Master',
    description: 'Hợp nhất thành công hai nhánh code',
    xp: 200,
    icon: '🔀',
    condition: {
      type: 'merge_count',
      operator: '>=',
      value: 1,
    },
  },
  {
    id: 'conflict-resolver',
    title: 'Conflict Resolver',
    description: 'Giải quyết xung đột merge thành công',
    xp: 250,
    icon: '⚡',
    condition: {
      type: 'conflict_resolved',
      operator: '>=',
      value: 1,
    },
  },
  {
    id: 'quiz-master',
    title: 'Quiz Master',
    description: 'Đạt điểm tuyệt đối trong một bài trắc nghiệm',
    xp: 100,
    icon: '🎓',
    condition: {
      type: 'quiz_score',
      operator: '>=',
      value: 100,
    },
  },
  {
    id: 'knowledge-seeker',
    title: 'Knowledge Seeker',
    description: 'Hoàn thành bài học đầu tiên với đầy đủ tiêu chí',
    xp: 120,
    icon: '📚',
    condition: {
      type: 'lesson_completed',
      operator: '>=',
      value: 1,
    },
  },
];
