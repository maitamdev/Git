import { Scenario } from '@git-academy/shared';

export const firstCommitScenario: Scenario = {
  id: 'first-commit',
  title: 'Tạo Commit Đầu Tiên',
  description: 'Khởi tạo Git repository, đưa file login.js vào Staging Area và tạo snapshot commit đầu tiên.',
  initialState: {
    repositoryInitialized: false,
    branch: 'main',
    files: [
      {
        path: 'login.js',
        content: `// Authentication Module
function handleLogin(username, password) {
  if (username && password) {
    console.log('User logged in successfully');
    return true;
  }
  return false;
}

export default handleLogin;`,
        status: 'untracked',
      },
      {
        path: 'README.md',
        content: '# Git Academy Demo Project\nThis is a sample project for learning Git.',
        status: 'untracked',
      },
    ],
  },
  goal: {
    commits: {
      minCount: 1,
    },
    latestCommit: {
      messagePattern: '.*', // any valid commit message or "feat: add login"
    },
    stagingArea: {
      clean: true,
    },
  },
  allowedCommands: ['git init', 'git status', 'git add', 'git commit', 'git log'],
  hints: [
    'Bước 1: Chạy `git init` để khởi tạo kho lưu trữ Git.',
    'Bước 2: Dùng `git status` để xem các file chưa được theo dõi (Untracked files).',
    'Bước 3: Dùng `git add login.js` (hoặc `git add .`) để đưa file vào Staging Area.',
    'Bước 4: Dùng `git commit -m "feat: add login module"` để lưu snapshot đầu tiên.',
  ],
  success: {
    message: '🎉 Xuất sắc! Bạn đã tạo thành công commit đầu tiên và hiểu được luồng làm việc Working Directory -> Staging Area -> Repository!',
    xp: 100,
  },
};
