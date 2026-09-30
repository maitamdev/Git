# GIT ACADEMY VIETNAM 🇻🇳

Nền tảng học **Git & GitHub từ cơ bản đến nâng cao** dành cho sinh viên và lập trình viên Việt Nam.

Hệ thống kết hợp **Lý thuyết sư phạm chuẩn mực**, **Terminal Simulator**, **Git Graph Visualizer tự động**, **Hệ thống đánh giá bài tập theo trạng thái thực tế (Goal Validator)** và **Gamification (XP, Level, Huy hiệu)**.

---

## 🌟 Tính Năng Nổi Bật

- **Interactive Git Terminal Simulator**: Mô phỏng thiết bị đầu cuối Unix thực tế với gợi ý lệnh (autocomplete), lịch sử phím mũi tên lên/xuống, màu sắc cú pháp ANSI chuẩn.
- **Real-Time Git Graph Visualizer**: Đồ thị commit DAG phản ứng ngay lập tức khi chạy lệnh, hiển thị phân nhánh đa làn (lanes), con trỏ HEAD và nhãn branch.
- **Deep State Goal Validator**: Đánh giá dựa trên **trạng thái kho chứa cuối cùng**, không áp đặt cứng nhắc từng lệnh gõ của sinh viên (sinh viên dùng `git add login.js` hay `git add .` đều pass nếu trạng thái đúng).
- **Curriculum Chuẩn 15 Mục**: Mỗi bài học có đủ 15 mục bắt buộc: Mục tiêu, Định nghĩa, Mental Model, Sơ đồ, Ví dụ thực tế, Command, Giải thích, Sai lầm, Lab, Hint, Validation, Quiz, Challenge, Tổng kết.
- **Zero Moodle Core Modifications**: Tích hợp LMS Moodle an toàn qua SCORM 1.2 Package hoặc Nginx Reverse Proxy.
- **Monorepo Kiến Trúc Module**: Tách bạch Engine, Scenario, Visualizer và Playground.

---

## 🏗 Cấu Trúc Monorepo

```text
git-academy/
├── packages/
│   ├── shared/            # Types, Interfaces, Events, Errors, Constants
│   ├── git-engine/        # Virtual Filesystem, GitStateManager, Commands, Parser
│   ├── git-scenarios/     # Scenario Schemas, Built-in Labs
│   └── exercise-engine/   # ScenarioLoader, GoalValidator, ScenarioRunner, Scoring
├── apps/
│   ├── git-visualizer/    # Layout engine, Lane manager, SVG renderer
│   └── playground/        # Ứng dụng web tương tác (Vite + React + CSS Design System)
├── courses/               # Giáo trình khóa học quản lý bằng Markdown & YAML
│   ├── 02-git-basics/
│   │   └── 05-git-commit/ # Bài học trọng tâm Git Commit hoàn chỉnh
│   └── courses-manifest.json
├── infra/                 # Docker Compose, Nginx Reverse Proxy
├── platform/moodle/       # Plugin & Theme Moodle chuẩn không sửa core
├── scripts/               # Scripts kiểm tra bài học, kịch bản và xuất SCORM
└── docs/                  # Tài liệu kiến trúc, hướng dẫn soạn thảo, phát triển
```

---

## 🚀 Khởi Chạy Nhanh (Quick Start)

### 1. Cài đặt dependencies
```bash
pnpm install
```

### 2. Chạy ứng dụng học tập (Playground)
```bash
pnpm dev
```
Mở trình duyệt tại: **`http://localhost:3000`**

### 3. Chạy Unit Tests
```bash
pnpm test
```

### 4. Build toàn bộ dự án
```bash
pnpm build
```

### 5. Kiểm tra định dạng bài học & Scenarios
```bash
pnpm validate:courses
pnpm validate:scenarios
```

### 6. Xuất gói SCORM cho Moodle LMS
```bash
pnpm export:scorm
```

---

## 🧪 Luồng Thao Tác Mẫu Bài Học "Git Commit"

1. Mở Playground tại `http://localhost:3000`.
2. Quan sát file `login.js` có nhãn đỏ `U` (Untracked).
3. Chạy lệnh khởi tạo:
   ```bash
   git init
   ```
4. Kiểm tra trạng thái:
   ```bash
   git status
   ```
5. Đưa file vào Staging Area:
   ```bash
   git add login.js
   ```
   (File đổi sang nhãn xanh `A` - Staged).
6. Tạo commit đầu tiên:
   ```bash
   git commit -m "feat: add login module"
   ```
7. Quan sát kết quả:
   - Terminal hiển thị `[main (root-commit) ...] feat: add login module`.
   - Git Graph tự động vẽ node commit đầu tiên kèm nhãn `main` và con trỏ `HEAD`.
   - Bảng kiểm tra tiêu chí chuyển sang xanh toàn bộ kèm thông báo chúc mừng và cộng **+100 XP**!
   - Sang tab **Trắc nghiệm** để hoàn thành bài test và nhận thêm huy hiệu **First Commit**!

---

## 📜 Bản Quyền
Dự án được xây dựng và phát triển vì cộng đồng sinh viên công nghệ thông tin Việt Nam.
Giấy phép: MIT License.
