import { Scenario } from '@git-academy/shared';

export const hashObjectLabScenario: Scenario = {
  id: 'hash-object-lab',
  title: 'Tạo đối tượng Blob thủ công với git hash-object',
  description: 'Sử dụng lệnh plumbing git hash-object -w để ghi trực tiếp dữ liệu thô vào Object Database.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    files: [
      { path: 'hello.txt', content: 'Xin chao Git Internals\n', status: 'untracked' },
    ],
  },
  goal: {
    branches: { current: 'main' },
  },
  allowedCommands: ['git hash-object', 'git status'],
  hints: ['Chạy lệnh `git hash-object -w hello.txt` để băm và lưu trữ blob.'],
  success: {
    message: '🎉 Tạo và băm đối tượng Blob thủ công thành công!',
    xp: 85,
  },
};

export const catFileLabScenario: Scenario = {
  id: 'cat-file-lab',
  title: 'Giải mã đối tượng bằng git cat-file',
  description: 'Sử dụng git cat-file -p và -t để kiểm tra loại và nội dung của một đối tượng Git.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    commits: [
      { message: 'feat: baseline commit', files: { 'app.js': 'console.log("cat-file test");' } },
    ],
    files: [
      { path: 'app.js', content: 'console.log("cat-file test");', status: 'unmodified' },
    ],
  },
  goal: {
    branches: { current: 'main' },
    commits: { minCount: 1 },
  },
  allowedCommands: ['git cat-file', 'git rev-parse', 'git status'],
  hints: ['Chạy `git cat-file -p HEAD` để xem nội dung chi tiết của commit hiện tại.'],
  success: {
    message: '🎉 Khám phá và giải mã đối tượng bằng git cat-file hoàn tất!',
    xp: 90,
  },
};

export const updateIndexLabScenario: Scenario = {
  id: 'update-index-lab',
  title: 'Lập chỉ mục Staging Area bằng git update-index',
  description: 'Đưa tệp tin vào Staging Area (tệp .git/index) mà hoàn toàn không dùng lệnh git add.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    files: [
      { path: 'note.txt', content: 'Staging via plumbing\n', status: 'untracked' },
    ],
  },
  goal: {
    branches: { current: 'main' },
  },
  allowedCommands: ['git hash-object', 'git update-index', 'git ls-files', 'git status'],
  hints: ['Băm tệp với `git hash-object -w note.txt`, sau đó chạy `git update-index --add --cacheinfo 100644 <hash> note.txt`.'],
  success: {
    message: '🎉 Cập nhật Staging Area chuẩn nhị phân bằng git update-index thành công!',
    xp: 95,
  },
};

export const writeTreeLabScenario: Scenario = {
  id: 'write-tree-lab',
  title: 'Đóng gói cây thư mục với git write-tree',
  description: 'Chuyển đổi trạng thái hiện tại của Staging Area thành một đối tượng Tree trong Object Store.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    files: [
      { path: 'README.md', content: '# Tree Object Project\n', status: 'added' },
    ],
  },
  goal: {
    branches: { current: 'main' },
  },
  allowedCommands: ['git write-tree', 'git cat-file', 'git status'],
  hints: ['Chạy lệnh plumbing `git write-tree` và quan sát mã băm SHA-1 của cây thư mục trả về.'],
  success: {
    message: '🎉 Đóng gói cấu trúc thư mục thành đối tượng Tree thành công!',
    xp: 95,
  },
};

export const commitTreeLabScenario: Scenario = {
  id: 'commit-tree-lab',
  title: 'Đúc đối tượng Commit với git commit-tree',
  description: 'Tạo đối tượng Commit từ mã băm của đối tượng Tree mà không dùng lệnh git commit.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    files: [
      { path: 'main.py', content: 'print("hello plumbing")', status: 'added' },
    ],
  },
  goal: {
    branches: { current: 'main' },
  },
  allowedCommands: ['git write-tree', 'git commit-tree', 'git status'],
  hints: ['Chạy `TREE=$(git write-tree)`, sau đó `git commit-tree $TREE -m "Manual commit"`.'],
  success: {
    message: '🎉 Đúc đối tượng Commit từ Tree thành công rực rỡ!',
    xp: 100,
  },
};

export const updateRefLabScenario: Scenario = {
  id: 'update-ref-lab',
  title: 'Điều khiển con trỏ nhánh với git update-ref',
  description: 'Di chuyển con trỏ nhánh refs/heads/main tới một commit cụ thể bằng lệnh plumbing.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    commits: [
      { message: 'feat: first commit', files: { 'a.txt': 'A' } },
      { message: 'feat: second commit', files: { 'b.txt': 'B' } },
    ],
    files: [
      { path: 'b.txt', content: 'B', status: 'unmodified' },
    ],
  },
  goal: {
    branches: { current: 'main' },
    commits: { minCount: 2 },
  },
  allowedCommands: ['git update-ref', 'git rev-parse', 'git status'],
  hints: ['Chạy `git update-ref refs/heads/main HEAD` để thực hành thao tác cập nhật con trỏ.'],
  success: {
    message: '🎉 Làm chủ cơ chế điều khiển con trỏ tham chiếu với git update-ref!',
    xp: 95,
  },
};

export const gitGcPackLabScenario: Scenario = {
  id: 'git-gc-pack-lab',
  title: 'Thu gom rác và tối ưu hóa Packfile với git gc',
  description: 'Thực thi quy trình dọn dẹp và đóng gói các loose objects thành packfiles.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    commits: [
      { message: 'feat: data v1', files: { 'data.txt': 'version 1' } },
      { message: 'feat: data v2', files: { 'data.txt': 'version 2' } },
    ],
    files: [
      { path: 'data.txt', content: 'version 2', status: 'unmodified' },
    ],
  },
  goal: {
    branches: { current: 'main' },
  },
  allowedCommands: ['git gc', 'git count-objects', 'git status'],
  hints: ['Chạy lệnh `git gc` để dọn dẹp các đối tượng rời rạc vào tệp pack.'],
  success: {
    message: '🎉 Tối ưu hóa bộ nhớ và đóng gói Packfile thành công!',
    xp: 95,
  },
};

export const internalsManualCommitCapstoneScenario: Scenario = {
  id: 'internals-manual-commit-capstone',
  title: 'Thử thách đỉnh cao Git Internals: Tự tay tạo Commit thủ công',
  description: 'Tạo một commit hoàn chỉnh CHỈ bằng các lệnh Plumbing: KHÔNG dùng git add, KHÔNG dùng git commit.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    files: [
      { path: 'capstone.txt', content: 'Built entirely with Git Plumbing commands.\n', status: 'untracked' },
    ],
  },
  goal: {
    branches: { current: 'main' },
    commits: { minCount: 1 },
  },
  allowedCommands: [
    'git hash-object',
    'git update-index',
    'git write-tree',
    'git commit-tree',
    'git update-ref',
    'git log',
    'git status',
  ],
  hints: [
    'Bước 1: Băm tệp lấy mã Blob: `BLOB=$(git hash-object -w capstone.txt)`',
    'Bước 2: Lập chỉ mục Index: `git update-index --add --cacheinfo 100644 $BLOB capstone.txt`',
    'Bước 3: Ghi Tree: `TREE=$(git write-tree)`',
    'Bước 4: Tạo Commit: `COMMIT=$(git commit-tree $TREE -m "feat: manual capstone commit")`',
    'Bước 5: Cập nhật nhánh: `git update-ref refs/heads/main $COMMIT`',
  ],
  success: {
    message: '🏆 ĐỈNH CAO DANH DỰ! Bạn đã tự tay chế tác commit bằng lệnh Plumbing nguyên tử và tốt nghiệp Git Internals Master!',
    xp: 250,
  },
};
