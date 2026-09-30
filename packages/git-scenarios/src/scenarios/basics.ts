import { Scenario } from '@git-academy/shared';

export const firstRepositoryScenario: Scenario = {
  id: 'first-repository',
  title: 'Khởi tạo Repository đầu tiên',
  description: 'Biến một thư mục bình thường thành một kho lưu trữ Git cục bộ với git init.',
  initialState: {
    repositoryInitialized: false,
    branch: 'main',
    files: [
      { path: 'README.md', content: '# My Project\nFirst project', status: 'untracked' },
    ],
  },
  goal: {
    branches: { exists: ['main'], current: 'main' },
  },
  allowedCommands: ['git init', 'git status'],
  hints: ['Gõ lệnh `git init` để khởi tạo kho lưu trữ.'],
  success: {
    message: '🎉 Tuyệt vời! Bạn đã khởi tạo thành công repository đầu tiên!',
    xp: 50,
  },
};

export const trackFileScenario: Scenario = {
  id: 'track-file',
  title: 'Theo dõi tệp tin với git add',
  description: 'Chuyển tệp tin từ trạng thái Untracked sang Staging Area.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    files: [
      { path: 'index.html', content: '<h1>Hello Git</h1>', status: 'untracked' },
    ],
  },
  goal: {
    stagingArea: { stagedFiles: ['index.html'] },
  },
  allowedCommands: ['git status', 'git add'],
  hints: ['Dùng `git add index.html` để đưa file vào Staging Area.'],
  success: {
    message: '🎉 File index.html đã được đưa vào Staging Area thành công!',
    xp: 60,
  },
};

export const multipleFilesScenario: Scenario = {
  id: 'multiple-files',
  title: 'Stage nhiều tệp tin cùng lúc',
  description: 'Sử dụng git add . để đưa toàn bộ thay đổi vào Staging Area.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    files: [
      { path: 'app.js', content: 'console.log("App");', status: 'untracked' },
      { path: 'style.css', content: 'body { margin: 0; }', status: 'untracked' },
      { path: 'index.html', content: '<h1>App</h1>', status: 'untracked' },
    ],
  },
  goal: {
    stagingArea: { stagedFiles: ['app.js', 'style.css', 'index.html'] },
  },
  allowedCommands: ['git status', 'git add'],
  hints: ['Gõ `git add .` để thêm toàn bộ thư mục hiện tại.'],
  success: {
    message: '🎉 Cả 3 file đã được stage gọn gàng!',
    xp: 75,
  },
};

export const inspectHistoryScenario: Scenario = {
  id: 'inspect-history',
  title: 'Xem lịch sử commit với git log',
  description: 'Thực hành tạo commit và kiểm tra lịch sử với git log --oneline.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    files: [
      { path: 'feature.js', content: 'export const x = 10;', status: 'untracked' },
    ],
  },
  goal: {
    commits: { minCount: 1 },
    stagingArea: { clean: true },
  },
  allowedCommands: ['git status', 'git add', 'git commit', 'git log'],
  hints: [
    'Stage file: `git add feature.js`',
    'Tạo commit: `git commit -m "feat: add feature module"`',
    'Xem log: `git log --oneline`',
  ],
  success: {
    message: '🎉 Bạn đã nắm vững cách lưu và tra cứu lịch sử Git!',
    xp: 80,
  },
};

export const inspectDiffScenario: Scenario = {
  id: 'inspect-diff',
  title: 'Kiểm tra khác biệt với git diff',
  description: 'So sánh sự khác biệt giữa code đang sửa đổi và commit trước đó.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    files: [
      { path: 'server.js', content: 'const port = 3000;\nconsole.log(port);', status: 'modified' },
    ],
  },
  goal: {
    commits: { minCount: 1 },
    stagingArea: { clean: true },
  },
  allowedCommands: ['git diff', 'git status', 'git add', 'git commit'],
  hints: [
    'Dùng `git diff` để xem các dòng code bị sửa đổi.',
    'Dùng `git add server.js` và `git commit -m "fix: update server config"` để lưu lại.',
  ],
  success: {
    message: '🎉 Hoàn thành kiểm tra diff và commit thay đổi!',
    xp: 80,
  },
};

export const gitConfigLabScenario: Scenario = {
  id: 'git-config-lab',
  title: 'Cấu hình danh tính lập trình viên',
  description: 'Thiết lập user.name và user.email với git config.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    files: [
      { path: 'README.md', content: '# Config Lab\n', status: 'unmodified' },
    ],
  },
  goal: {
    branches: { current: 'main' },
  },
  allowedCommands: ['git config', 'git status'],
  hints: [
    'Chạy `git config user.name "Student"`',
    'Chạy `git config user.email "student@example.com"`',
  ],
  success: {
    message: '🎉 Cấu hình danh tính Git thành công!',
    xp: 50,
  },
};

