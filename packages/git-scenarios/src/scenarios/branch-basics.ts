import { Scenario } from '@git-academy/shared';

export const branchBasicsScenario: Scenario = {
  id: 'branch-basics',
  title: 'Tạo và Chuyển Branch',
  description: 'Học cách tạo nhánh mới với git branch và chuyển đổi nhánh bằng git switch.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    files: [
      {
        path: 'index.html',
        content: '<h1>Trang Chủ Git Academy</h1>',
        status: 'unmodified',
      },
    ],
  },
  goal: {
    branches: {
      exists: ['main', 'feature-auth'],
      current: 'feature-auth',
    },
  },
  allowedCommands: ['git status', 'git branch', 'git switch', 'git checkout', 'git log'],
  hints: [
    'Dùng `git branch feature-auth` để tạo nhánh mới.',
    'Dùng `git switch feature-auth` để chuyển sang nhánh vừa tạo.',
    'Hoặc dùng phím tắt `git switch -c feature-auth` để vừa tạo vừa chuyển nhánh.',
  ],
  success: {
    message: '🎉 Tuyệt vời! Bạn đã nắm vững cơ chế phân nhánh (Branching) an toàn trong Git!',
    xp: 150,
  },
};
