import { Scenario } from '@git-academy/shared';

export const branchProtectionScenario: Scenario = {
  id: 'branch-protection-scenario',
  title: 'Thiết lập quy tắc bảo vệ nhánh Branch Protection Rules',
  description: 'Mô phỏng quy trình bảo vệ nhánh chính: cấm push trực tiếp, bắt buộc mở PR và kiểm duyệt.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    branches: ['main', 'feat/protected-flow'],
    commits: [
      { message: 'feat: protected main baseline', files: { 'README.md': '# Protected Project' }, branch: 'main' },
      { message: 'feat: ready for review', files: { 'service.ts': 'export const service = true;' }, branch: 'feat/protected-flow' },
    ],
    files: [
      { path: 'README.md', content: '# Protected Project', status: 'unmodified' },
    ],
  },
  goal: {
    branches: { current: 'main' },
    commits: { minCount: 2 },
  },
  allowedCommands: ['git merge', 'git switch', 'git status', 'git log'],
  hints: ['Chuyển về nhánh main và hợp nhất nhánh tính năng đã được phê duyệt.'],
  success: {
    message: '🎉 Vận hành quy tắc bảo vệ nhánh và tích hợp mã nguồn an toàn!',
    xp: 95,
  },
};

export const codeownersScenario: Scenario = {
  id: 'codeowners-scenario',
  title: 'Phân quyền sở hữu mã nguồn với tệp CODEOWNERS',
  description: 'Tạo tệp .github/CODEOWNERS để tự động gán đội ngũ phụ trách kiểm duyệt mã nguồn.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    commits: [
      { message: 'feat: initial repo', files: { 'app.js': 'console.log("ok");' } },
    ],
    files: [
      { path: 'app.js', content: 'console.log("ok");', status: 'unmodified' },
    ],
  },
  goal: {
    workingTree: {
      requiredFiles: [
        { path: '.github/CODEOWNERS', contentIncludes: '@' },
      ],
    },
  },
  allowedCommands: ['git add', 'git commit', 'git status'],
  hints: ['Tạo tệp `.github/CODEOWNERS` và khai báo quy tắc sở hữu như `* @tech-lead`.'],
  success: {
    message: '🎉 Cấu hình phân quyền CODEOWNERS hoàn hảo cho kho lưu trữ!',
    xp: 90,
  },
};

export const conventionalCommitsLabScenario: Scenario = {
  id: 'conventional-commits-lab',
  title: 'Viết thông điệp chuẩn Conventional Commits',
  description: 'Thực hiện commit với tiền tố có cấu trúc chuẩn như feat(auth): hoặc fix(cart):',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    files: [
      { path: 'login.js', content: 'function login(){ return true; }', status: 'untracked' },
    ],
  },
  goal: {
    commits: { minCount: 1 },
    latestCommit: {
      messagePattern: '^(feat|fix|docs|style|refactor|perf|test|build|ci|chore)(\\(.+\\))?!?: .+$',
    },
  },
  allowedCommands: ['git add', 'git commit', 'git status'],
  hints: ['Gõ `git add login.js` rồi `git commit -m "feat(auth): implement user authentication"`.'],
  success: {
    message: '🎉 Thông điệp commit tuân thủ hoàn hảo chuẩn quốc tế Conventional Commits!',
    xp: 85,
  },
};

export const semverCalcLabScenario: Scenario = {
  id: 'semver-calc-lab',
  title: 'Tính toán và gắn thẻ Semantic Versioning',
  description: 'Đánh giá mức độ thay đổi và gắn thẻ phiên bản mới theo chuẩn MAJOR.MINOR.PATCH.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    commits: [
      { message: 'feat: baseline app v1.0.0', files: { 'app.js': 'v1' } },
      { message: 'fix(core): resolve null pointer bug', files: { 'app.js': 'v1 patched' } },
    ],
    files: [
      { path: 'app.js', content: 'v1 patched', status: 'unmodified' },
    ],
  },
  goal: {
    branches: { current: 'main' },
    commits: { minCount: 2 },
  },
  allowedCommands: ['git tag', 'git status', 'git log'],
  hints: ['Với một bản vá lỗi fix, hãy gắn thẻ tag tăng PATCH `git tag -a v1.0.1 -m "Patch release v1.0.1"`.'],
  success: {
    message: '🎉 Quản lý phiên bản SemVer chuyên nghiệp và nhất quán!',
    xp: 85,
  },
};

export const hotfixScenario: Scenario = {
  id: 'hotfix-scenario',
  title: 'Quy trình giải cứu sản xuất Hotfix Workflow',
  description: 'Rẽ nhánh hotfix từ main để sửa lỗi thanh toán khẩn cấp và hợp nhất kép.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    branches: ['main', 'develop'],
    commits: [
      { message: 'feat: v1.0.0 production', files: { 'pay.js': 'const fee = 0.5;' }, branch: 'main' },
    ],
    files: [
      { path: 'pay.js', content: 'const fee = 0.5;', status: 'unmodified' },
    ],
  },
  goal: {
    branches: { current: 'main' },
    commits: { minCount: 2 },
  },
  allowedCommands: ['git switch', 'git branch', 'git add', 'git commit', 'git merge', 'git status'],
  hints: ['Tạo nhánh `hotfix/v1.0.1` từ main, sửa tệp, commit và merge trở lại vào main.'],
  success: {
    message: '🎉 Giải cứu môi trường sản xuất thành công với quy trình Hotfix chuẩn mực!',
    xp: 110,
  },
};

export const teamConflictSimScenario: Scenario = {
  id: 'team-conflict-sim-scenario',
  title: 'Mô phỏng giải quyết xung đột nhóm đa nhà phát triển',
  description: 'Giải quyết xung đột giữa hai lập trình viên cùng chỉnh sửa trên nhánh tính năng.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    commits: [
      { message: 'feat: initial config', files: { 'app.config.ts': 'export const API_PORT = 3000;' } },
    ],
    files: [
      {
        path: 'app.config.ts',
        content: '<<<<<<< HEAD\nexport const API_PORT = 8080;\n=======\nexport const API_PORT = 9000;\n>>>>>>> feat/api-update',
        status: 'modified',
      },
    ],
  },
  goal: {
    workingTree: { clean: true },
    stagingArea: { clean: true },
    commits: { minCount: 2 },
  },
  allowedCommands: ['git add', 'git commit', 'git status'],
  hints: ['Mở tệp `app.config.ts`, chọn cổng phù hợp và xóa sạch các điểm mốc conflict markers.'],
  success: {
    message: '🎉 Phối hợp giải quyết xung đột nhóm thành công xuất sắc!',
    xp: 120,
  },
};

export const capstoneEcommerceTeamScenario: Scenario = {
  id: 'capstone-ecommerce-team-scenario',
  title: 'Dự án thực chiến Capstone E-Commerce Team Simulation',
  description: 'Thực hành toàn diện: thiết lập cấu hình bảo vệ, commit chuẩn và đóng gói phát hành.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    commits: [
      { message: 'feat(core): initialize ecommerce monorepo', files: { 'package.json': '{"name":"shop-monorepo"}' } },
    ],
    files: [
      { path: 'package.json', content: '{"name":"shop-monorepo"}', status: 'unmodified' },
    ],
  },
  goal: {
    branches: { current: 'main' },
    commits: { minCount: 2 },
  },
  allowedCommands: ['git switch', 'git branch', 'git add', 'git commit', 'git merge', 'git tag', 'git status'],
  hints: ['Tạo nhánh `feat/checkout`, commit với conventional message và merge vào main.'],
  success: {
    message: '🏆 XUẤT SẮC TỐT NGHIỆP! Bạn đã hoàn thành toàn diện đồ án thực chiến Capstone!',
    xp: 250,
  },
};
