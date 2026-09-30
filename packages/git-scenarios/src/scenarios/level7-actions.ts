import { Scenario } from '@git-academy/shared';

export const firstWorkflowScenario: Scenario = {
  id: 'first-workflow',
  title: 'Khởi tạo Workflow GitHub Actions đầu tiên',
  description: 'Tạo tệp .github/workflows/ci.yml với cấu hình workflow tối thiểu hợp lệ.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    files: [
      { path: 'package.json', content: '{"name":"app","scripts":{"test":"echo test passed"}}', status: 'unmodified' },
    ],
  },
  goal: {
    workingTree: {
      requiredFiles: [
        { path: '.github/workflows/ci.yml', contentIncludes: 'name:' },
      ],
    },
  },
  allowedCommands: ['git status', 'git add', 'git commit'],
  hints: ['Tạo tệp `.github/workflows/ci.yml` chứa các khối `name:`, `on: push`, và `jobs:`.', 'Stage tệp và commit.'],
  success: {
    message: '🎉 Chúc mừng! Bạn đã khởi tạo thành công Workflow GitHub Actions đầu tiên!',
    xp: 85,
  },
};

export const pushTriggerScenario: Scenario = {
  id: 'push-trigger',
  title: 'Cấu hình Trigger Push trên nhánh main',
  description: 'Thiết lập bộ lọc branches để workflow chỉ kích hoạt khi push vào nhánh main.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    files: [
      {
        path: '.github/workflows/ci.yml',
        content: 'name: CI\non: push\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - run: npm test\n',
        status: 'unmodified',
      },
    ],
  },
  goal: {
    workingTree: {
      requiredFiles: [
        { path: '.github/workflows/ci.yml', contentIncludes: 'branches:' },
      ],
    },
  },
  allowedCommands: ['git status', 'git add', 'git commit'],
  hints: ['Bổ sung `branches: [main]` dưới mục `on: push:`.'],
  success: {
    message: '🎉 Cấu hình bộ lọc trigger push trên nhánh main thành công!',
    xp: 90,
  },
};

export const prCiScenario: Scenario = {
  id: 'pr-ci',
  title: 'Thiết lập CI Pipeline trên Pull Request',
  description: 'Cấu hình sự kiện pull_request để tự động kiểm thử mỗi khi mở PR vào nhánh main.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    files: [
      { path: 'README.md', content: '# Web App', status: 'unmodified' },
    ],
  },
  goal: {
    workingTree: {
      requiredFiles: [
        { path: '.github/workflows/pr.yml', contentIncludes: 'pull_request:' },
      ],
    },
  },
  allowedCommands: ['git status', 'git add', 'git commit'],
  hints: ['Tạo tệp `.github/workflows/pr.yml` với `on: pull_request: branches: [main]`.'],
  success: {
    message: '🎉 Đường ống CI cho Pull Request đã sẵn sàng bảo vệ nhánh chính!',
    xp: 95,
  },
};

export const multiJobScenario: Scenario = {
  id: 'multi-job',
  title: 'Cấu hình nhiều Job chạy song song',
  description: 'Định nghĩa hai Jobs độc lập `lint` và `test` trong cùng một workflow.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    files: [
      {
        path: '.github/workflows/ci.yml',
        content: 'name: CI\non: push\njobs:\n  lint:\n    runs-on: ubuntu-latest\n    steps:\n      - run: echo "linting"\n',
        status: 'unmodified',
      },
    ],
  },
  goal: {
    workingTree: {
      requiredFiles: [
        { path: '.github/workflows/ci.yml', contentIncludes: 'test:' },
      ],
    },
  },
  allowedCommands: ['git status', 'git add', 'git commit'],
  hints: ['Thêm job `test:` ngang hàng với `lint:` và chỉ định `runs-on: ubuntu-latest`.'],
  success: {
    message: '🎉 Thiết lập đa Job chạy song song thành công!',
    xp: 95,
  },
};

export const jobNeedsScenario: Scenario = {
  id: 'job-needs',
  title: 'Thiết lập phụ thuộc Job với thuộc tính needs',
  description: 'Cấu hình để Job deploy chỉ chạy sau khi Job test hoàn thành thành công.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    files: [
      {
        path: '.github/workflows/ci.yml',
        content: 'name: CI\non: push\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - run: npm test\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - run: echo "deploying"\n',
        status: 'unmodified',
      },
    ],
  },
  goal: {
    workingTree: {
      requiredFiles: [
        { path: '.github/workflows/ci.yml', contentIncludes: 'needs: test' },
      ],
    },
  },
  allowedCommands: ['git status', 'git add', 'git commit'],
  hints: ['Thêm dòng `needs: test` bên dưới `deploy:` trong tệp workflow.'],
  success: {
    message: '🎉 Thiết lập quan hệ phụ thuộc DAG với needs thành công!',
    xp: 95,
  },
};

export const failingTestScenario: Scenario = {
  id: 'failing-test',
  title: 'Chẩn đoán và khắc phục bài kiểm thử thất bại',
  description: 'Sửa lỗi logic trong mã nguồn để bài kiểm thử CI chuyển từ đỏ sang xanh.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    files: [
      { path: 'math.js', content: 'export function add(a, b) { return a - b; } // BUG', status: 'unmodified' },
    ],
  },
  goal: {
    workingTree: {
      requiredFiles: [
        { path: 'math.js', contentIncludes: 'return a + b;' },
      ],
    },
  },
  allowedCommands: ['git status', 'git add', 'git commit'],
  hints: ['Sửa phép toán `a - b` thành `a + b` trong tệp `math.js`.'],
  success: {
    message: '🎉 Bạn đã sửa lỗi thành công, bài test CI đã báo xanh rực rỡ!',
    xp: 90,
  },
};

export const conditionalStepScenario: Scenario = {
  id: 'conditional-step',
  title: 'Thực thi có điều kiện với if: always()',
  description: 'Thêm một bước gửi thông báo cứu hộ luôn luôn chạy bất kể bài test fail bằng `if: always()`.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    files: [
      {
        path: '.github/workflows/ci.yml',
        content: 'name: CI\non: push\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - run: npm test\n',
        status: 'unmodified',
      },
    ],
  },
  goal: {
    workingTree: {
      requiredFiles: [
        { path: '.github/workflows/ci.yml', contentIncludes: 'always()' },
      ],
    },
  },
  allowedCommands: ['git status', 'git add', 'git commit'],
  hints: ['Thêm một Step mới có thuộc tính `if: always()` để dọn dẹp hoặc thông báo.'],
  success: {
    message: '🎉 Làm chủ điều kiện thực thi với hàm trạng thái always()!',
    xp: 90,
  },
};

export const matrixBuildScenario: Scenario = {
  id: 'matrix-build',
  title: 'Thiết lập ma trận kiểm thử đa phiên bản Node.js',
  description: 'Sử dụng strategy: matrix để kiểm thử đồng thời trên Node 18 và Node 20.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    files: [
      {
        path: '.github/workflows/ci.yml',
        content: 'name: Matrix CI\non: push\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - run: npm test\n',
        status: 'unmodified',
      },
    ],
  },
  goal: {
    workingTree: {
      requiredFiles: [
        { path: '.github/workflows/ci.yml', contentIncludes: 'matrix:' },
      ],
    },
  },
  allowedCommands: ['git status', 'git add', 'git commit'],
  hints: ['Khai báo `strategy: matrix: node: [18, 20]` trong job test.'],
  success: {
    message: '🎉 Cấu hình ma trận kiểm thử Matrix Strategy hoàn thành!',
    xp: 100,
  },
};

export const artifactSharingScenario: Scenario = {
  id: 'artifact-sharing',
  title: 'Lưu trữ và chia sẻ sản phẩm build với Artifacts',
  description: 'Sử dụng upload-artifact để xuất bản thư mục dist/ sau khi biên dịch.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    files: [
      {
        path: '.github/workflows/build.yml',
        content: 'name: Build\non: push\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - run: npm run build\n',
        status: 'unmodified',
      },
    ],
  },
  goal: {
    workingTree: {
      requiredFiles: [
        { path: '.github/workflows/build.yml', contentIncludes: 'upload-artifact' },
      ],
    },
  },
  allowedCommands: ['git status', 'git add', 'git commit'],
  hints: ['Thêm step `uses: actions/upload-artifact@v4` với `path: dist`.'],
  success: {
    message: '🎉 Tạo phẩm Artifact đã được đóng gói và sẵn sàng chia sẻ!',
    xp: 95,
  },
};

export const secretRedactionScenario: Scenario = {
  id: 'secret-redaction',
  title: 'Truyền và che giấu bí mật với GitHub Secrets',
  description: 'Truyền bí mật vào biến môi trường bằng cú pháp ${{ secrets.API_TOKEN }}.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    files: [
      {
        path: '.github/workflows/deploy.yml',
        content: 'name: Deploy\non: push\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - run: echo "deploying"\n',
        status: 'unmodified',
      },
    ],
  },
  goal: {
    workingTree: {
      requiredFiles: [
        { path: '.github/workflows/deploy.yml', contentIncludes: 'secrets.' },
      ],
    },
  },
  allowedCommands: ['git status', 'git add', 'git commit'],
  hints: ['Khai báo `env: TOKEN: ${{ secrets.API_TOKEN }}` trong step deploy.'],
  success: {
    message: '🎉 Cấu hình biến bí mật an toàn với cơ chế tự động che giấu Masking!',
    xp: 95,
  },
};

export const environmentDeployScenario: Scenario = {
  id: 'environment-deploy',
  title: 'Triển khai có kiểm duyệt với Deployment Environment',
  description: 'Chỉ định thuộc tính environment: production cho Job triển khai máy chủ.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    files: [
      {
        path: '.github/workflows/cd.yml',
        content: 'name: CD\non: push\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - run: echo "deploying to production"\n',
        status: 'unmodified',
      },
    ],
  },
  goal: {
    workingTree: {
      requiredFiles: [
        { path: '.github/workflows/cd.yml', contentIncludes: 'environment: production' },
      ],
    },
  },
  allowedCommands: ['git status', 'git add', 'git commit'],
  hints: ['Thêm dòng `environment: production` vào cấu hình Job deploy.'],
  success: {
    message: '🎉 Cổng phê duyệt môi trường sản xuất đã được thiết lập kiên cố!',
    xp: 100,
  },
};

export const protectedBranchCheckScenario: Scenario = {
  id: 'protected-branch-check',
  title: 'Tích hợp CI Status Check với Branch Protection',
  description: 'Thiết lập quy tắc bảo vệ nhánh yêu cầu bài kiểm tra ci/test phải đạt màu xanh.',
  initialState: {
    repositoryInitialized: true,
    branch: 'feature/ci-protection',
    branches: ['main', 'feature/ci-protection'],
    files: [
      { path: 'package.json', content: '{"name":"protected-app"}', status: 'unmodified' },
    ],
  },
  goal: {
    branches: { current: 'main' },
  },
  allowedCommands: ['git status', 'git branch', 'git switch', 'git checkout'],
  hints: ['Đảm bảo quy tắc bảo vệ nhánh đã kích hoạt kiểm tra requiredStatusChecks.'],
  success: {
    message: '🎉 Nhánh chính đã được bảo vệ tuyệt đối bởi cổng CI Status Check!',
    xp: 95,
  },
};

export const reusableWorkflowScenario: Scenario = {
  id: 'reusable-workflow',
  title: 'Mô-đun hóa đường ống với Reusable Workflow',
  description: 'Tạo tệp .github/workflows/reusable.yml với sự kiện kích hoạt workflow_call.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    files: [
      { path: 'README.md', content: '# Modular Workflows', status: 'unmodified' },
    ],
  },
  goal: {
    workingTree: {
      requiredFiles: [
        { path: '.github/workflows/reusable.yml', contentIncludes: 'workflow_call:' },
      ],
    },
  },
  allowedCommands: ['git status', 'git add', 'git commit'],
  hints: ['Khai báo `on: workflow_call:` trong tệp `.github/workflows/reusable.yml`.'],
  success: {
    message: '🎉 Chuẩn hóa quy trình thành công với Reusable Workflows!',
    xp: 105,
  },
};

export const releasePipelineScenario: Scenario = {
  id: 'release-pipeline',
  title: 'Đường ống tự động hóa phát hành phiên bản (Release Pipeline)',
  description: 'Cấu hình workflow phát hành kích hoạt khi có thẻ tag phiên bản mới đẩy lên.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    files: [
      { path: 'README.md', content: '# Release Project', status: 'unmodified' },
    ],
  },
  goal: {
    workingTree: {
      requiredFiles: [
        { path: '.github/workflows/release.yml', contentIncludes: 'tags:' },
      ],
    },
  },
  allowedCommands: ['git status', 'git add', 'git commit'],
  hints: ['Cấu hình `on: push: tags: [\'v*\']` trong tệp `.github/workflows/release.yml`.'],
  success: {
    message: '🎉 Đường ống phát hành sản phẩm tự động đã sẵn sàng hoạt động!',
    xp: 100,
  },
};

export const ciCdCapstoneScenario: Scenario = {
  id: 'ci-cd-capstone',
  title: 'Thử thách tổng hợp Kỹ sư CI/CD Capstone',
  description: 'Thiết kế trọn vẹn đường ống CI/CD: lint, matrix test, artifact build và deploy có phê duyệt.',
  initialState: {
    repositoryInitialized: true,
    branch: 'main',
    files: [
      { path: 'app.js', content: 'console.log("Capstone Web App");', status: 'unmodified' },
    ],
  },
  goal: {
    workingTree: {
      requiredFiles: [
        { path: '.github/workflows/pipeline.yml', contentIncludes: 'needs:' },
      ],
    },
  },
  allowedCommands: ['git status', 'git add', 'git commit'],
  hints: ['Tạo tệp `.github/workflows/pipeline.yml` kết hợp đầy đủ các chặng lint, test và deploy.'],
  success: {
    message: '🏆 XUẤT SẮC! Bạn đã chính thức tốt nghiệp Level 7: GitHub Actions & CI/CD Master!',
    xp: 250,
  },
};
