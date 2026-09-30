import { Scenario } from '@git-academy/shared';

export const tagBasicLabScenario: Scenario = {
  id: 'tag-basic-lab',
  title: 'Đánh dấu cột mốc phiên bản với git tag',
  description: 'Tạo thẻ phiên bản v1.0.0 đánh dấu commit phát hành sản phẩm chính thức.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    commits: [
      { message: 'feat: ready for release v1.0.0', files: { 'app.js': 'console.log("release v1");' } },
    ],
    files: [
      { path: 'app.js', content: 'console.log("release v1");', status: 'unmodified' },
    ],
  },
  goal: {
    branches: { current: 'main' },
    commits: { minCount: 1 },
  },
  allowedCommands: ['git tag', 'git status', 'git show'],
  hints: ['Chạy lệnh `git tag -a v1.0.0 -m "Release version 1.0.0"`.'],
  success: {
    message: '🎉 Tạo thẻ phiên bản thành công đánh dấu mốc son của dự án!',
    xp: 80,
  },
};

export const bisectScenario: Scenario = {
  id: 'bisect-scenario',
  title: 'Truy tìm commit gây lỗi với git bisect',
  description: 'Sử dụng thuật toán tìm kiếm nhị phân để định vị chính xác commit phát sinh lỗi ngầm.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    commits: [
      { message: 'feat: good commit C1', files: { 'code.js': 'val = 1;' } },
      { message: 'feat: good commit C2', files: { 'code.js': 'val = 2;' } },
      { message: 'feat: regression commit C3', files: { 'code.js': 'val = null; // BUG' } },
      { message: 'feat: later commit C4', files: { 'code.js': 'val = null; other = 4;' } },
    ],
    files: [
      { path: 'code.js', content: 'val = null; other = 4;', status: 'unmodified' },
    ],
  },
  goal: {
    branches: { current: 'main' },
  },
  allowedCommands: ['git bisect', 'git log', 'git status'],
  hints: ['Bắt đầu bằng `git bisect start`, đánh dấu `git bisect bad` và `git bisect good <hash>`.'],
  success: {
    message: '🎉 Bạn đã truy vết thành công commit đưa lỗi ngầm vào hệ thống!',
    xp: 120,
  },
};

export const worktreeLabScenario: Scenario = {
  id: 'worktree-lab',
  title: 'Đa nhiệm không gian làm việc với git worktree',
  description: 'Tạo thư mục làm việc song song để sửa lỗi khẩn cấp mà không cần stash hay đổi nhánh.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    commits: [
      { message: 'feat: main base', files: { 'server.js': 'const port = 3000;' } },
    ],
    files: [
      { path: 'server.js', content: 'const port = 3000;', status: 'unmodified' },
    ],
  },
  goal: {
    branches: { current: 'main' },
  },
  allowedCommands: ['git worktree', 'git status'],
  hints: ['Gõ lệnh `git worktree list` để xem các thư mục làm việc song song đang hoạt động.'],
  success: {
    message: '🎉 Làm chủ công cụ đa nhiệm tối thượng git worktree!',
    xp: 95,
  },
};

export const advancedGitMasterChallengeScenario: Scenario = {
  id: 'advanced-git-master-challenge',
  title: 'Thử thách tổng hợp Chuyên gia Git Nâng cao',
  description: 'Giải cứu mã nguồn bị mất, dọn dẹp lịch sử commit và đóng gói phiên bản an toàn.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    commits: [
      { message: 'feat: master baseline', files: { 'index.js': '// baseline' } },
      { message: 'feat: intermediate step', files: { 'index.js': '// baseline\n// work' } },
    ],
    files: [
      { path: 'index.js', content: '// baseline\n// work', status: 'unmodified' },
    ],
  },
  goal: {
    branches: { current: 'main' },
    commits: { minCount: 2 },
  },
  allowedCommands: ['git reflog', 'git reset', 'git rebase', 'git commit', 'git tag', 'git status'],
  hints: ['Khám phá lịch sử với `git reflog`, chỉnh sửa commit và gắn thẻ hoàn thiện.'],
  success: {
    message: '🏆 ĐỈNH CAO! Bạn đã vượt qua thử thách chuyên gia Git Master danh giá!',
    xp: 200,
  },
};
