import { Scenario } from '@git-academy/shared';

export const resetSoftLabScenario: Scenario = {
  id: 'reset-soft-lab',
  title: 'git reset --soft: Rút lại commit giữ nguyên Staging',
  description: 'Hủy bỏ commit gần nhất nhưng vẫn giữ nguyên tất cả thay đổi trong Staging Area.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    commits: [
      { message: 'feat: init repo', files: { 'app.js': 'console.log("init");' } },
      { message: 'feat: premature commit', files: { 'app.js': 'console.log("init");\nconsole.log("premature");' } },
    ],
    files: [
      { path: 'app.js', content: 'console.log("init");\nconsole.log("premature");', status: 'unmodified' },
    ],
  },
  goal: {
    commits: { count: 1 },
    stagingArea: {
      stagedFiles: ['app.js'],
    },
  },
  allowedCommands: ['git reset', 'git status'],
  hints: ['Chạy lệnh `git reset --soft HEAD~1` để lùi lại 1 commit và giữ file trong Staging.'],
  success: {
    message: '🎉 Rút lại commit thành công, thay đổi vẫn nằm an toàn trong Staging Area!',
    xp: 85,
  },
};

export const resetMixedLabScenario: Scenario = {
  id: 'reset-mixed-lab',
  title: 'git reset --mixed: Rút lại commit và unstage',
  description: 'Hủy commit và đưa các thay đổi về trạng thái chưa staged trong Working Tree.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    commits: [
      { message: 'feat: base commit', files: { 'index.js': '// base' } },
      { message: 'feat: bad commit', files: { 'index.js': '// base\n// bad' } },
    ],
    files: [
      { path: 'index.js', content: '// base\n// bad', status: 'unmodified' },
    ],
  },
  goal: {
    commits: { count: 1 },
    stagingArea: { clean: true },
  },
  allowedCommands: ['git reset', 'git status'],
  hints: ['Chạy lệnh `git reset --mixed HEAD~1` (hoặc `git reset HEAD~1`).'],
  success: {
    message: '🎉 git reset --mixed thành công, code được giữ lại trong thư mục làm việc!',
    xp: 85,
  },
};

export const revertCommitLabScenario: Scenario = {
  id: 'revert-commit-lab',
  title: 'Hoàn tác an toàn trên nhánh chung với git revert',
  description: 'Tạo một commit mới đảo ngược nội dung của một commit lỗi mà không viết lại lịch sử.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    commits: [
      { message: 'feat: working system', files: { 'server.js': 'const port = 3000;' } },
      { message: 'fix: broken hotfix', files: { 'server.js': 'const port = 999999;' } },
    ],
    files: [
      { path: 'server.js', content: 'const port = 999999;', status: 'unmodified' },
    ],
  },
  goal: {
    commits: { minCount: 3 },
  },
  allowedCommands: ['git revert', 'git status', 'git log'],
  hints: ['Chạy `git revert HEAD --no-edit` để tự động tạo commit đảo ngược an toàn.'],
  success: {
    message: '🎉 Hoàn tác an toàn thành công với git revert trên nhánh chung!',
    xp: 90,
  },
};

export const reflogExploreLabScenario: Scenario = {
  id: 'reflog-explore-lab',
  title: 'Khám phá nhật ký tham chiếu git reflog',
  description: 'Tra cứu lịch sử mọi dịch chuyển của con trỏ HEAD để tìm các commit bị che khuất.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    commits: [
      { message: 'feat: c1', files: { '1.txt': '1' } },
      { message: 'feat: c2', files: { '2.txt': '2' } },
    ],
    files: [
      { path: '1.txt', content: '1', status: 'unmodified' },
      { path: '2.txt', content: '2', status: 'unmodified' },
    ],
  },
  goal: {
    branches: { current: 'main' },
  },
  allowedCommands: ['git reflog', 'git log', 'git status'],
  hints: ['Gõ lệnh `git reflog` để xem toàn bộ lịch sử thao tác của HEAD.'],
  success: {
    message: '🎉 Bạn đã làm chủ chiếc hộp đen thần kỳ git reflog!',
    xp: 85,
  },
};

export const reflogRecoveryScenario: Scenario = {
  id: 'reflog-recovery-scenario',
  title: 'Khôi phục commit bị mất bằng reflog',
  description: 'Hồi sinh một commit bị mất sau khi chạy nhầm reset --hard bằng cách tạo nhánh mới từ hash.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    commits: [
      { message: 'feat: step 1', files: { 'step1.txt': '1' } },
      { message: 'feat: valuable work', files: { 'valuable.txt': 'precious code' } },
    ],
    files: [
      { path: 'step1.txt', content: '1', status: 'unmodified' },
    ],
  },
  goal: {
    commits: { minCount: 2 },
  },
  allowedCommands: ['git reflog', 'git branch', 'git switch', 'git reset', 'git status'],
  hints: ['Dùng `git reflog` tìm mã hash commit bị mất, sau đó khôi phục lại.'],
  success: {
    message: '🎉 Cứu hộ thành công commit bị mất, dữ liệu đã được bảo toàn nguyên vẹn!',
    xp: 120,
  },
};

export const stashAdvancedLabScenario: Scenario = {
  id: 'stash-advanced-lab',
  title: 'git stash nâng cao: Tạm cất có thông điệp và khôi phục',
  description: 'Lưu tạm các thay đổi dở dang với thông điệp rõ ràng và áp dụng lại sau đó.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    commits: [
      { message: 'feat: stable main', files: { 'feature.js': '// base' } },
    ],
    files: [
      { path: 'feature.js', content: '// base\n// WIP feature work', status: 'modified' },
    ],
  },
  goal: {
    workingTree: { clean: true },
    stagingArea: { clean: true },
  },
  allowedCommands: ['git stash', 'git status'],
  hints: ['Gõ `git stash push -m "wip feature"` để cất tạm công việc dở dang.'],
  success: {
    message: '🎉 Tạm cất thay đổi dở dang vào ngăn kéo bí mật stash thành công!',
    xp: 90,
  },
};

export const cherryPickScenario: Scenario = {
  id: 'cherry-pick-scenario',
  title: 'Nhặt chọn commit với git cherry-pick',
  description: 'Mang một commit sửa lỗi cụ thể từ nhánh thử nghiệm sang nhánh chính.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    branches: ['main', 'feat/test-branch'],
    commits: [
      { message: 'feat: main baseline', files: { 'app.js': 'console.log("main");' }, branch: 'main' },
      { message: 'fix: security patch', files: { 'security.js': 'export const safe = true;' }, branch: 'feat/test-branch' },
    ],
    files: [
      { path: 'app.js', content: 'console.log("main");', status: 'unmodified' },
    ],
  },
  goal: {
    branches: { current: 'main' },
    commits: { minCount: 2 },
  },
  allowedCommands: ['git cherry-pick', 'git log', 'git switch', 'git status'],
  hints: ['Đứng ở nhánh main, dùng `git cherry-pick` để nhặt commit từ nhánh phụ sang.'],
  success: {
    message: '🎉 Bạn đã nhặt chọn và áp dụng thành công commit sang nhánh chính!',
    xp: 100,
  },
};

export const rebaseBasicScenario: Scenario = {
  id: 'rebase-basic-scenario',
  title: 'Tái cơ sở nhánh với git rebase',
  description: 'Đưa các commit của nhánh tính năng đặt lên trên đỉnh commit mới nhất của main.',
  initialState: {
    repositoryInitialized: true,
    branch: 'feat/update',
    branches: ['main', 'feat/update'],
    commits: [
      { message: 'feat: main base', files: { 'main.txt': 'base' }, branch: 'main' },
      { message: 'feat: main update', files: { 'main.txt': 'base updated' }, branch: 'main' },
      { message: 'feat: branch work', files: { 'feature.txt': 'feature work' }, branch: 'feat/update' },
    ],
    files: [
      { path: 'main.txt', content: 'base', status: 'unmodified' },
      { path: 'feature.txt', content: 'feature work', status: 'unmodified' },
    ],
  },
  goal: {
    branches: { current: 'feat/update' },
    commits: { minCount: 3 },
  },
  allowedCommands: ['git rebase', 'git log', 'git status'],
  hints: ['Đang ở nhánh feat/update, chạy lệnh `git rebase main`.'],
  success: {
    message: '🎉 Tái cơ sở Rebase thành công, lịch sử nhánh đã được làm thẳng tắp!',
    xp: 110,
  },
};

export const interactiveRebaseScenario: Scenario = {
  id: 'interactive-rebase-scenario',
  title: 'Dọn dẹp lịch sử với Interactive Rebase',
  description: 'Nén nhiều commit vụn vặt thành một commit chuẩn mực duy nhất với squash.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    commits: [
      { message: 'feat: part 1', files: { '1.txt': '1' } },
      { message: 'fix: typo', files: { '1.txt': '1 fixed' } },
      { message: 'fix: typo again', files: { '1.txt': '1 clean' } },
    ],
    files: [
      { path: '1.txt', content: '1 clean', status: 'unmodified' },
    ],
  },
  goal: {
    commits: { count: 1 },
  },
  allowedCommands: ['git rebase', 'git reset', 'git commit', 'git status'],
  hints: ['Sử dụng `git reset --soft HEAD~2` rồi `git commit --amend` để gộp 3 commit thành 1.'],
  success: {
    message: '🎉 Lịch sử commit đã được dọn dẹp gọn gàng, chuyên nghiệp!',
    xp: 120,
  },
};

export const rebaseConflictScenario: Scenario = {
  id: 'rebase-conflict-scenario',
  title: 'Xử lý xung đột trong quá trình Rebase',
  description: 'Tạm dừng tiến trình rebase, giải quyết mâu thuẫn tệp và tiếp tục với rebase --continue.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    commits: [
      { message: 'feat: base config', files: { 'config.env': 'ENV=prod' } },
    ],
    files: [
      {
        path: 'config.env',
        content: '<<<<<<< HEAD\nENV=staging\n=======\nENV=prod\n>>>>>>> feat/rebase-branch',
        status: 'modified',
      },
    ],
  },
  goal: {
    workingTree: { clean: true },
    stagingArea: { clean: true },
  },
  allowedCommands: ['git add', 'git rebase', 'git status'],
  hints: ['Sửa tệp `config.env`, gõ `git add config.env` rồi `git rebase --continue` (hoặc hoàn tất staging).'],
  success: {
    message: '🎉 Xuất sắc! Bạn đã vượt qua thử thách xử lý xung đột Rebase an toàn!',
    xp: 125,
  },
};
