import { Scenario } from '@git-academy/shared';

export const cloneRemoteScenario: Scenario = {
  id: 'clone-remote',
  title: 'Tải dự án về máy với git clone',
  description: 'Mô phỏng thao tác khởi tạo bản sao của kho lưu trữ từ xa trên máy cục bộ.',
  initialState: {
    repositoryInitialized: false,
    branch: 'main',
    files: [
      { path: 'README.md', content: '# Remote Cloned Repo', status: 'untracked' },
    ],
  },
  goal: {
    branches: { exists: ['main'], current: 'main' },
  },
  allowedCommands: ['git clone', 'git init', 'git status'],
  hints: ['Khởi tạo môi trường bằng lệnh `git init` hoặc `git clone`.'],
  success: {
    message: '🎉 Bạn đã kết nối và sao chép kho lưu trữ thành công về máy cục bộ!',
    xp: 75,
  },
};

export const fetchRemoteScenario: Scenario = {
  id: 'fetch-remote',
  title: 'Cập nhật dữ liệu từ xa với git fetch',
  description: 'Lấy siêu dữ liệu và các commit mới từ remote origin mà không tự động gộp code.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    commits: [
      { message: 'feat: local baseline', files: { 'app.js': 'console.log("local");' } },
    ],
    files: [
      { path: 'app.js', content: 'console.log("local");', status: 'unmodified' },
    ],
  },
  goal: {
    branches: { current: 'main' },
  },
  allowedCommands: ['git fetch', 'git status', 'git branch'],
  hints: ['Chạy lệnh `git fetch origin` để kiểm tra các thay đổi mới trên máy chủ.'],
  success: {
    message: '🎉 Cập nhật thông tin từ remote server an toàn với git fetch!',
    xp: 80,
  },
};

export const pullRemoteScenario: Scenario = {
  id: 'pull-remote',
  title: 'Đồng bộ và gộp code với git pull',
  description: 'Tải về và tự động tích hợp các thay đổi mới nhất từ nhánh remote tracking.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    commits: [
      { message: 'feat: initial state', files: { 'app.js': 'console.log("v1");' } },
    ],
    files: [
      { path: 'app.js', content: 'console.log("v1");', status: 'unmodified' },
    ],
  },
  goal: {
    branches: { current: 'main' },
    commits: { minCount: 1 },
  },
  allowedCommands: ['git pull', 'git status', 'git log'],
  hints: ['Sử dụng lệnh `git pull origin main` để đồng bộ hóa mã nguồn.'],
  success: {
    message: '🎉 Đồng bộ mã nguồn từ máy chủ từ xa về máy cá nhân thành công!',
    xp: 85,
  },
};

export const pushRemoteScenario: Scenario = {
  id: 'push-remote',
  title: 'Đẩy commit lên server với git push',
  description: 'Xuất bản các commit đã tạo ở máy cục bộ lên nhánh tracking trên máy chủ GitHub.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    commits: [
      { message: 'feat: ready to publish', files: { 'feature.js': 'export const feat = true;' } },
    ],
    files: [
      { path: 'feature.js', content: 'export const feat = true;', status: 'unmodified' },
    ],
  },
  goal: {
    branches: { current: 'main' },
    commits: { minCount: 1 },
  },
  allowedCommands: ['git push', 'git status'],
  hints: ['Đẩy code lên bằng câu lệnh `git push -u origin main`.'],
  success: {
    message: '🎉 Đẩy commit lên remote repository thành công rực rỡ!',
    xp: 85,
  },
};

export const upstreamSetupScenario: Scenario = {
  id: 'upstream-setup',
  title: 'Cấu hình Upstream cho dự án mã nguồn mở',
  description: 'Thiết lập remote upstream để đồng bộ với kho mã nguồn gốc của cộng đồng.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    commits: [
      { message: 'feat: forked baseline', files: { 'README.md': 'Forked repo' } },
    ],
    files: [
      { path: 'README.md', content: 'Forked repo', status: 'unmodified' },
    ],
  },
  goal: {
    branches: { current: 'main' },
  },
  allowedCommands: ['git remote', 'git status'],
  hints: ['Gõ `git remote -v` để kiểm tra các máy chủ từ xa đã liên kết.'],
  success: {
    message: '🎉 Kiểm tra và cấu hình remote upstream thành công!',
    xp: 80,
  },
};

export const createPrScenario: Scenario = {
  id: 'create-pr',
  title: 'Quy trình tạo Pull Request (PR)',
  description: 'Tạo nhánh tính năng riêng, commit thay đổi và chuẩn bị mở Pull Request.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    commits: [
      { message: 'feat: main base', files: { 'index.html': '<h1>Base</h1>' } },
    ],
    files: [
      { path: 'index.html', content: '<h1>Base</h1>', status: 'unmodified' },
    ],
  },
  goal: {
    branches: { exists: ['main', 'feat/login'] },
    commits: { minCount: 2 },
  },
  allowedCommands: ['git switch', 'git branch', 'git add', 'git commit', 'git push', 'git status'],
  hints: ['Tạo nhánh với `git switch -c feat/login`, sửa tệp và commit.'],
  success: {
    message: '🎉 Bạn đã đóng gói tính năng sạch đẹp sẵn sàng mở Pull Request!',
    xp: 90,
  },
};

export const mergePrScenario: Scenario = {
  id: 'merge-pr',
  title: 'Quy trình Merge Pull Request',
  description: 'Sau khi Pull Request được duyệt, hợp nhất nhánh tính năng vào nhánh chính.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    branches: ['main', 'feat/reviewed'],
    commits: [
      { message: 'feat: main baseline', files: { 'app.js': 'console.log("main");' }, branch: 'main' },
      { message: 'feat: approved feature', files: { 'addon.js': 'console.log("addon");' }, branch: 'feat/reviewed' },
    ],
    files: [
      { path: 'app.js', content: 'console.log("main");', status: 'unmodified' },
    ],
  },
  goal: {
    branches: { current: 'main' },
    commits: { minCount: 2 },
  },
  allowedCommands: ['git merge', 'git switch', 'git status'],
  hints: ['Chuyển về nhánh main và chạy `git merge feat/reviewed`.'],
  success: {
    message: '🎉 Hợp nhất Pull Request vào nhánh chính thành công!',
    xp: 95,
  },
};

export const teamProjectSimulationScenario: Scenario = {
  id: 'team-project-simulation',
  title: 'Thử thách dự án nhóm Team Project Simulation',
  description: 'Mô phỏng toàn bộ quy trình: tạo nhánh -> commit tính năng -> hợp nhất vào main.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    commits: [
      { message: 'feat: project init', files: { 'package.json': '{"name":"team-app"}' } },
    ],
    files: [
      { path: 'package.json', content: '{"name":"team-app"}', status: 'unmodified' },
    ],
  },
  goal: {
    branches: { current: 'main' },
    commits: { minCount: 2 },
  },
  allowedCommands: ['git switch', 'git branch', 'git add', 'git commit', 'git merge', 'git status'],
  hints: ['Tạo nhánh `feat/cart`, thêm tệp mới và merge trở lại vào nhánh `main`.'],
  success: {
    message: '🎉 Tuyệt vời! Bạn đã hoàn thành xuất sắc thử thách dự án nhóm thực tế!',
    xp: 150,
  },
};
