import { Scenario } from '@git-academy/shared';

export const gitignoreLabScenario: Scenario = {
  id: 'gitignore-lab',
  title: 'Bỏ qua tệp tin với .gitignore',
  description: 'Tạo tệp .gitignore để ngăn Git theo dõi tệp nhật ký và khóa bí mật.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    files: [
      { path: 'server.js', content: 'console.log("running");', status: 'untracked' },
      { path: 'debug.log', content: 'debug logs here', status: 'untracked' },
    ],
  },
  goal: {
    workingTree: {
      requiredFiles: [
        { path: '.gitignore', contentIncludes: '*.log' },
      ],
    },
  },
  allowedCommands: ['git status', 'git add', 'git commit'],
  hints: ['Tạo tệp `.gitignore` và ghi dòng `*.log` vào trong tệp.'],
  success: {
    message: '🎉 Bạn đã cấu hình .gitignore thành công, tệp log đã bị loại trừ khỏi Git!',
    xp: 65,
  },
};

export const undoWorkingTreeLabScenario: Scenario = {
  id: 'undo-working-tree-lab',
  title: 'Hoàn tác tệp tin trong Working Tree',
  description: 'Sử dụng lệnh git restore để hủy bỏ chỉnh sửa chưa lưu trong thư mục làm việc.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    commits: [
      { message: 'feat: baseline config', files: { 'config.json': '{"port": 3000}' } },
    ],
    files: [
      { path: 'config.json', content: '{"port": 99999}', status: 'modified' },
    ],
  },
  goal: {
    workingTree: {
      clean: true,
      requiredFiles: [
        { path: 'config.json', contentIncludes: '3000' },
      ],
    },
  },
  allowedCommands: ['git restore', 'git checkout', 'git status'],
  hints: ['Gõ lệnh `git restore config.json` để hoàn tác lại giá trị ban đầu.'],
  success: {
    message: '🎉 Hoàn tác tệp config.json về trạng thái an toàn thành công!',
    xp: 75,
  },
};

export const commitAmendLabScenario: Scenario = {
  id: 'commit-amend-lab',
  title: 'Chỉnh sửa commit gần nhất với git commit --amend',
  description: 'Bổ sung thêm tệp quên lưu vào commit gần nhất mà không sinh commit thừa.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    commits: [
      { message: 'feat: add user profile page', files: { 'profile.html': '<h1>Profile</h1>' } },
    ],
    files: [
      { path: 'profile.css', content: 'h1 { color: blue; }', status: 'untracked' },
    ],
  },
  goal: {
    stagingArea: { clean: true },
    workingTree: { clean: true },
    commits: { count: 1 },
  },
  allowedCommands: ['git add', 'git commit', 'git status'],
  hints: ['Đưa `profile.css` vào staging với `git add`, sau đó chạy `git commit --amend --no-edit`.'],
  success: {
    message: '🎉 Bạn đã gộp tệp bị quên vào commit cũ thành công với --amend!',
    xp: 80,
  },
};

export const fileLifecycleLabScenario: Scenario = {
  id: 'file-lifecycle-lab',
  title: 'Vòng đời tệp tin trong Git',
  description: 'Trải nghiệm vòng đời tệp: Untracked -> Staged -> Committed.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    files: [
      { path: 'notes.txt', content: 'Git study notes', status: 'untracked' },
    ],
  },
  goal: {
    stagingArea: { clean: true },
    workingTree: { clean: true },
    commits: { minCount: 1 },
  },
  allowedCommands: ['git add', 'git commit', 'git status'],
  hints: ['Chạy `git add notes.txt` rồi `git commit -m "docs: add notes"`.'],
  success: {
    message: '🎉 Tệp notes.txt đã hoàn thành trọn vẹn chu trình vòng đời trong Git!',
    xp: 60,
  },
};

export const statusCheckLabScenario: Scenario = {
  id: 'status-check-lab',
  title: 'Chẩn đoán trạng thái kho lưu trữ',
  description: 'Kiểm tra trạng thái dự án và đưa tất cả tệp vào Staging Area.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    files: [
      { path: 'a.txt', content: 'A', status: 'untracked' },
      { path: 'b.txt', content: 'B', status: 'untracked' },
    ],
  },
  goal: {
    stagingArea: {
      stagedFiles: ['a.txt', 'b.txt'],
    },
  },
  allowedCommands: ['git status', 'git add'],
  hints: ['Gõ `git status` để kiểm tra tệp, sau đó gõ `git add .` để đưa toàn bộ vào Staging.'],
  success: {
    message: '🎉 Chẩn đoán trạng thái và stage toàn bộ tệp thành công!',
    xp: 55,
  },
};
