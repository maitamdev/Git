# Kiến Trúc Hệ Thống Git Academy Vietnam

## 1. Giới thiệu tổng quan
Git Academy Vietnam được thiết kế theo mô hình **Monorepo** phân tách rõ rệt giữa:
- **Git Domain Core (Engine)**: Quản lý trạng thái, cây thư mục ảo, cây đối tượng commit và lệnh Git.
- **Scenario & Exercise Engine**: Quản lý kịch bản học, đánh giá trạng thái đích (Goal Validator), tính điểm và XP.
- **Visualizer Engine**: Chuyển đổi trạng thái Git DAG sang đồ thị trực quan (SVG/Canvas).
- **Presentation Layer (Playground)**: Giao diện học tập tích hợp Terminal, File Explorer, Trắc nghiệm, Sơ đồ và Lý thuyết.
- **LMS Adapter (Moodle / SCORM / LiaScript)**: Cung cấp cầu nối tích hợp với hệ thống giáo dục đại học mà không sửa core Moodle.

```text
                        Moodle LMS
                            │
               User / Class / Grade / Progress
                            │
                      SCORM / Embed
                            │
                        LiaScript
                            │
             ┌──────────────┼──────────────┐
             │              │              │
             ▼              ▼              ▼
        Lý thuyết      Git Simulator   Git Graph
             │              │              │
             └──────────────┼──────────────┘
                            │
                    Exercise Engine
                            │
                      Scenario YAML
```

## 2. Các Package cốt lõi trong Monorepo

| Package | Đường dẫn | Chức năng chính |
|---|---|---|
| `@git-academy/shared` | `packages/shared` | Types, Interfaces, Event Definitions, Error Classes, Utilities |
| `@git-academy/git-engine` | `packages/git-engine` | Virtual Filesystem, GitStateManager, Command Handlers, Terminal Parser, Event Bus |
| `@git-academy/git-scenarios` | `packages/git-scenarios` | JSON/YAML Schemas, Built-in Lab Scenarios |
| `@git-academy/exercise-engine` | `packages/exercise-engine` | ScenarioLoader, GoalValidator, ScenarioRunner, Scoring |
| `@git-academy/git-visualizer` | `apps/git-visualizer` | Layout engine, Lane manager, SVG & Canvas renderers |
| `playground` | `apps/playground` | Web app tương tác hoàn chỉnh (Vite + React + CSS Design System) |

## 3. Luồng dữ liệu (Data Flow)

1. Khi sinh viên nhập lệnh:
   ```bash
   user@git-academy:~/project (main) $ git commit -m "feat: login"
   ```
2. `CommandParser` phân tách chuỗi thành tokens, subcommand (`commit`), flags (`m: "feat: login"`).
3. `CommandExecutor` điều hướng tới `CommitCommand`.
4. `CommitCommand` tương tác với `GitStateManager` và `VirtualFileSystem`:
   - Lấy snapshot cây Staging Area.
   - Tính toán hash SHA-1 tất định (`generateCommitHash`).
   - Tạo `Commit` object trỏ về parent commit trước đó.
   - Cập nhật con trỏ nhánh `main` và `HEAD`.
   - Xóa sạch Staging Area.
5. `GitEventEmitter` phát sự kiện `'commit:created'`.
6. `GitGraphVisualizer` nhận trạng thái mới, tự động phân bố lại các lane và vẽ thêm node tròn kèm nhãn nhánh và hiệu ứng phát sáng.
7. `GoalValidator` kiểm tra toàn diện:
   - Số lượng commit.
   - Message commit.
   - Trạng thái Staging Area & Working Tree.
8. Khi tất cả tiêu chí đạt, hệ thống trao điểm kinh nghiệm (XP), mở khóa huy hiệu (Achievement) và đánh dấu bài học hoàn thành!
