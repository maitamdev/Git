# Kiến Trúc Git Simulator & Virtual Filesystem

## 1. Virtual Filesystem (VFS)
Hệ thống chạy hoàn toàn in-memory, không can thiệp vào ổ đĩa thực của máy chủ:
- `VFile`: Biểu diễn file gồm `path`, `content`, `updatedAt`.
- `computeFileStates`: Hàm cốt lõi tính toán sự khác biệt giữa 3 vùng:
  - Working Directory (Tệp tin hiện hữu trong bộ nhớ).
  - Staging Area (Mảng các tệp đã được thêm qua `git add`).
  - HEAD Commit Tree (Bản ghi snapshot của commit gần nhất).

Ký hiệu trạng thái:
- `U` (Untracked): File mới chưa từng được Git theo dõi.
- `A` (Added / Staged): File đã nằm trong Staging Area sẵn sàng commit.
- `M` (Modified): File đã thay đổi nội dung so với HEAD hoặc Staging.
- `D` (Deleted): File đã bị xóa.

## 2. Command Architecture
Mỗi lệnh Git được đóng gói độc lập theo `GitCommand` interface:

```typescript
export interface GitCommand {
  name: string;
  aliases?: string[];
  description: string;
  execute(
    args: string[],
    flags: Record<string, string | boolean>,
    ctx: CommandContext
  ): CommandExecutionResult;
}
```

Nhờ thiết kế này:
- Không bao giờ tồn tại một file `if/else` khổng lồ.
- Dễ dàng mở rộng thêm các lệnh nâng cao như `rebase`, `cherry-pick`, `reflog`, `stash` mà không ảnh hưởng mã nguồn hiện có.
- Viết unit test độc lập cho từng command một cách tường minh.
