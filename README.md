# GIT ACADEMY VIETNAM 🇻🇳

Nền tảng học **Git & GitHub tương tác từ cơ bản đến nâng cao** dành cho sinh viên và lập trình viên Việt Nam.

Website hoạt động **100% Client-side (Static Web)**: người học không cần đăng nhập hay tạo tài khoản, tiến độ học tập và điểm XP được lưu trữ trực tiếp và tự động trên trình duyệt (`localStorage`) của mỗi người.

---

## 🌟 Tính Năng Nổi Bật

- **Không cần tài khoản**: Bất kỳ ai truy cập cũng có thể bắt đầu học ngay lập tức.
- **Tiến độ lưu trên máy**: Lưu an toàn qua `localStorage`, hỗ trợ xuất/nhập tệp sao lưu (`.json`) khi cần chuyển thiết bị.
- **Interactive Git Terminal Simulator**: Mô phỏng thiết bị đầu cuối Unix thực tế với gợi ý lệnh (autocomplete), lịch sử phím mũi tên lên/xuống, màu sắc cú pháp ANSI chuẩn.
- **Real-Time Git Graph Visualizer**: Đồ thị commit DAG phản ứng ngay lập tức khi chạy lệnh, hiển thị phân nhánh đa làn (lanes), con trỏ HEAD và nhãn branch.
- **Deep State Goal Validator**: Đánh giá dựa trên **trạng thái kho chứa cuối cùng**, không áp đặt cứng nhắc từng lệnh gõ của sinh viên.
- **Git Studio Sandbox**: Môi trường thực hành tự do với terminal, graph visualizer, GitHub pull request simulator và GitHub Actions workflow runner.
- **Curriculum 8 Cấp độ (128 bài học)**: Từ sơ khai (Foundations), Git Basics, Branching, Remote & GitHub, Undo & Recovery, Team Workflows, CI/CD đến Git Internals.

---

## 🏗 Cấu Trúc Monorepo

```text
git-academy/
├── packages/
│   ├── shared/            # Types, Interfaces, Events, Errors, Constants
│   ├── git-engine/        # Virtual Filesystem, GitStateManager, Commands, Parser
│   ├── git-scenarios/     # Scenario Schemas, Built-in Labs
│   ├── git-internals/     # Object Database, Plumbing Commands, Tree/Commit Inspector
│   ├── github-simulator/  # Pull Request, Branch Protection, Multi-repo Simulator
│   ├── actions-simulator/ # GitHub Actions runner, YAML parser, Workflow engine
│   └── exercise-engine/   # ScenarioLoader, GoalValidator, ScenarioRunner, Scoring, Quiz
├── apps/
│   ├── git-visualizer/    # Layout engine, Lane manager, SVG graph renderer
│   └── playground/        # Ứng dụng web tương tác (Vite + React + CSS Design System)
├── courses/               # 128 bài học quản lý bằng Markdown & YAML
├── scripts/               # Scripts kiểm tra và biên dịch nội dung khóa học
└── tests/                 # Bộ kiểm thử tích hợp và đơn vị (Unit & Integration tests)
```

---

## 🚀 Khởi Chạy Nhanh (Quick Start)

### 1. Cài đặt dependencies
```bash
pnpm install
```

### 2. Chạy ứng dụng học tập (Local Dev)
```bash
pnpm dev
```
Mở trình duyệt tại: **`http://localhost:3000`**

### 3. Chạy Tests
```bash
pnpm test
```

### 4. Build dự án (Deploy tĩnh trên Vercel / Cloudflare Pages / GitHub Pages)
```bash
pnpm build:vercel
```
Kết quả xuất ra tại `apps/playground/dist`.

---

## 📜 Bản Quyền
Dự án được xây dựng và phát triển vì cộng đồng sinh viên công nghệ thông tin Việt Nam.  
Giấy phép: MIT License.
