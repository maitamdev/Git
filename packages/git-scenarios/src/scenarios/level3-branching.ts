import { Scenario } from '@git-academy/shared';

export const branchIsolationScenario: Scenario = {
  id: 'branch-isolation',
  title: 'Nguyên lý cách ly không gian Branch Isolation',
  description: 'Thực hiện commit trên nhánh thử nghiệm độc lập mà không ảnh hưởng tới nhánh chính.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    branches: ['main', 'experiment'],
    commits: [
      { message: 'feat: stable baseline', files: { 'app.js': 'console.log("stable");' } },
    ],
    files: [
      { path: 'app.js', content: 'console.log("stable");', status: 'unmodified' },
    ],
  },
  goal: {
    branches: { current: 'experiment' },
    commits: { minCount: 2 },
  },
  allowedCommands: ['git switch', 'git checkout', 'git commit', 'git add', 'git status'],
  hints: ['Chuyển sang nhánh experiment bằng `git switch experiment` rồi thực hiện commit mới.'],
  success: {
    message: '🎉 Bạn đã tạo thay đổi độc lập trên nhánh experiment bảo toàn an toàn cho main!',
    xp: 80,
  },
};

export const threeWayMergeScenario: Scenario = {
  id: 'three-way-merge',
  title: 'Hợp nhất rẽ nhánh 3-way merge',
  description: 'Hợp nhất hai nhánh đã phân kỳ lịch sử tạo thành một Merge Commit hoàn chỉnh.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    branches: ['main', 'feat/search'],
    commits: [
      { message: 'feat: base app', files: { 'index.html': '<h1>Home</h1>' }, branch: 'main' },
      { message: 'feat: update navbar', files: { 'nav.html': '<nav>Menu</nav>' }, branch: 'main' },
      { message: 'feat: add search', files: { 'search.js': 'function search(){}' }, branch: 'feat/search' },
    ],
    files: [
      { path: 'index.html', content: '<h1>Home</h1>', status: 'unmodified' },
      { path: 'nav.html', content: '<nav>Menu</nav>', status: 'unmodified' },
    ],
  },
  goal: {
    branches: { current: 'main' },
    commits: { minCount: 4 },
  },
  allowedCommands: ['git merge', 'git switch', 'git log', 'git status'],
  hints: ['Đứng ở nhánh main và chạy câu lệnh `git merge feat/search`.'],
  success: {
    message: '🎉 Hợp nhất 3-way merge thành công tạo ra một merge commit mới!',
    xp: 90,
  },
};

export const resolveConflictScenario: Scenario = {
  id: 'resolve-conflict',
  title: 'Kỹ thuật Resolve Conflict từng bước',
  description: 'Xóa bỏ các điểm mốc đánh dấu xung đột conflict markers và commit bản giải quyết.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    branches: ['main', 'feat/heading'],
    commits: [
      { message: 'feat: initial', files: { 'index.html': '<h1>Title</h1>' } },
    ],
    files: [
      {
        path: 'index.html',
        content: '<<<<<<< HEAD\n<h1>My App Pro</h1>\n=======\n<h1>My Super App</h1>\n>>>>>>> feat/heading',
        status: 'modified',
      },
    ],
  },
  goal: {
    stagingArea: { clean: true },
    workingTree: { clean: true },
    commits: { minCount: 2 },
  },
  allowedCommands: ['git add', 'git commit', 'git status'],
  hints: ['Chỉnh sửa tệp `index.html` xóa bỏ các ký hiệu <<<<<<<, =======, >>>>>>> rồi chạy `git add` và `git commit`.'],
  success: {
    message: '🎉 Bạn đã giải quyết xung đột thủ công hoàn hảo và hoàn tất commit!',
    xp: 110,
  },
};

export const mergeAbortScenario: Scenario = {
  id: 'merge-abort',
  title: 'Hủy bỏ quá trình merge với git merge --abort',
  description: 'Thoát khỏi trạng thái xung đột nguy hiểm và quay về trạng thái an toàn trước khi merge.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    branches: ['main', 'feat/risky'],
    commits: [
      { message: 'feat: safe baseline', files: { 'core.js': 'const a = 1;' } },
    ],
    files: [
      {
        path: 'core.js',
        content: '<<<<<<< HEAD\nconst a = 1;\n=======\nconst a = 999;\n>>>>>>> feat/risky',
        status: 'modified',
      },
    ],
  },
  goal: {
    workingTree: { clean: true },
    stagingArea: { clean: true },
  },
  allowedCommands: ['git merge', 'git status'],
  hints: ['Gõ lệnh `git merge --abort` để hủy bỏ quá trình merge đang bị xung đột.'],
  success: {
    message: '🎉 Hủy bỏ quá trình merge thành công, kho lưu trữ đã trở về an toàn!',
    xp: 85,
  },
};

export const branchingChallengeScenario: Scenario = {
  id: 'branching-challenge',
  title: 'Thử thách tổng hợp Branching Master',
  description: 'Tạo nhánh tính năng mới, commit mã nguồn và hợp nhất an toàn vào nhánh chính.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    commits: [
      { message: 'feat: init app', files: { 'app.js': 'console.log("init");' } },
    ],
    files: [
      { path: 'app.js', content: 'console.log("init");', status: 'unmodified' },
    ],
  },
  goal: {
    branches: { current: 'main' },
    commits: { minCount: 2 },
  },
  allowedCommands: ['git switch', 'git branch', 'git add', 'git commit', 'git merge', 'git status'],
  hints: ['Tạo nhánh mới với `git switch -c feat/v2`, commit tệp mới, rồi quay về main merge lại.'],
  success: {
    message: '🎉 Xuất sắc! Bạn đã làm chủ toàn bộ chu trình tạo nhánh và hợp nhất mã nguồn!',
    xp: 130,
  },
};
