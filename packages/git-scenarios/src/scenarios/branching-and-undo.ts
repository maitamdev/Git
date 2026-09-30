import { Scenario } from '@git-academy/shared';

export const createBranchScenario: Scenario = {
  id: 'create-branch',
  title: 'Tạo nhánh mới với git branch',
  description: 'Tạo một nhánh tính năng mới tên là feature/auth.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    files: [{ path: 'main.js', content: 'console.log("main");', status: 'unmodified' }],
  },
  goal: {
    branches: { exists: ['main', 'feature/auth'] },
  },
  allowedCommands: ['git branch', 'git status'],
  hints: ['Gõ `git branch feature/auth` để tạo nhánh mới.'],
  success: {
    message: '🎉 Tạo nhánh feature/auth thành công!',
    xp: 70,
  },
};

export const switchBranchScenario: Scenario = {
  id: 'switch-branch',
  title: 'Chuyển nhánh với git switch',
  description: 'Chuyển không gian làm việc sang nhánh feature/login.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    branches: ['main', 'feature/login'],
    files: [{ path: 'main.js', content: 'console.log("main");', status: 'unmodified' }],
  },
  goal: {
    branches: { current: 'feature/login' },
  },
  allowedCommands: ['git branch', 'git switch', 'git checkout', 'git status'],
  hints: ['Gõ `git switch feature/login` để chuyển nhánh.'],
  success: {
    message: '🎉 Đã chuyển sang nhánh feature/login an toàn!',
    xp: 70,
  },
};

export const fastForwardMergeScenario: Scenario = {
  id: 'fast-forward',
  title: 'Hợp nhất nhánh Fast-Forward',
  description: 'Hợp nhất nhánh feature vào main khi không có sự phân kỳ lịch sử.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    branches: ['main', 'feature'],
    files: [{ path: 'app.js', content: 'console.log("app");', status: 'unmodified' }],
  },
  goal: {
    branches: { current: 'main' },
    commits: { minCount: 1 },
  },
  allowedCommands: ['git merge', 'git status', 'git log'],
  hints: ['Đứng ở nhánh main, chạy `git merge feature`.'],
  success: {
    message: '🎉 Fast-Forward merge thành công!',
    xp: 100,
  },
};

export const mergeConflictScenario: Scenario = {
  id: 'merge-conflict',
  title: 'Giải quyết xung đột Merge Conflict',
  description: 'Xử lý khi 2 nhánh sửa cùng 1 file, mở editor xóa conflict markers và commit hoàn tất.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    branches: ['main', 'feature-auth'],
    files: [
      {
        path: 'auth.ts',
        content: `<<<<<<< HEAD
const API_URL = "https://api.main.vn";
=======
const API_URL = "https://api.auth-feature.vn";
>>>>>>> feature-auth`,
        status: 'conflict',
      },
    ],
  },
  goal: {
    commits: { minCount: 1 },
    stagingArea: { clean: true },
    workingTree: {
      requiredFiles: [
        {
          path: 'auth.ts',
          contentIncludes: 'API_URL',
        },
      ],
    },
  },
  allowedCommands: ['git status', 'git add', 'git commit', 'git diff', 'echo'],
  hints: [
    'Xem file `auth.ts` có chứa `<<<<<<< HEAD` và `>>>>>>> feature-auth`.',
    'Chỉnh sửa nội dung file để giải quyết xung đột (ví dụ: dùng lệnh echo hoặc editor).',
    'Chạy `git add auth.ts` để đánh dấu đã giải quyết xung đột.',
    'Chạy `git commit -m "merge: resolve auth URL conflict"` để hoàn tất.',
  ],
  success: {
    message: '⚡ Đỉnh cao! Bạn đã thuần thục kỹ năng giải quyết Merge Conflict - kỹ năng sống còn của mọi kỹ sư phần mềm!',
    xp: 150,
  },
};

export const restoreScenario: Scenario = {
  id: 'restore',
  title: 'Hoàn tác thay đổi với git restore',
  description: 'Hủy bỏ các sửa đổi nhầm lẫn trong Working Directory chưa được commit.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    files: [
      { path: 'critical.ts', content: '// Malformed corrupted code', status: 'modified' },
    ],
  },
  goal: {
    workingTree: { clean: true },
  },
  allowedCommands: ['git status', 'git restore', 'git diff'],
  hints: ['Gõ `git restore critical.ts` để khôi phục lại nội dung từ commit gần nhất.'],
  success: {
    message: '🎉 Đã hoàn tác thay đổi lỗi an toàn!',
    xp: 90,
  },
};

export const resetHardScenario: Scenario = {
  id: 'reset-hard',
  title: 'Khôi phục triệt để với git reset --hard',
  description: 'Đưa repository và thư mục làm việc quay lại commit ổn định trước đó.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    files: [{ path: 'temp.txt', content: 'temporary', status: 'untracked' }],
  },
  goal: {
    stagingArea: { clean: true },
  },
  allowedCommands: ['git reset', 'git status', 'git log'],
  hints: ['Dùng `git reset --hard HEAD` để xóa sạch thay đổi chưa commit.'],
  success: {
    message: '🎉 Đã reset trạng thái hoàn toàn!',
    xp: 100,
  },
};

export const stashScenario: Scenario = {
  id: 'stash',
  title: 'Cất tạm thay đổi với git stash',
  description: 'Lưu tạm thời công việc đang dang dở để dọn dẹp thư mục làm việc sạch sẽ.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    files: [{ path: 'wip.js', content: 'const workInProgress = true;', status: 'modified' }],
  },
  goal: {
    workingTree: { clean: true },
  },
  allowedCommands: ['git stash', 'git status'],
  hints: ['Gõ `git stash` để cất các thay đổi dang dở.'],
  success: {
    message: '🎉 Đã cất tạm thay đổi vào stash stack thành công!',
    xp: 90,
  },
};
