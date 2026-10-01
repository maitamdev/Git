# Đồng bộ Tiến độ & Xử lý Xung đột (Progress Sync & Conflict Resolution) — Git Academy Vietnam (Sprint 6)

> **Ghi chú trạng thái:** Tài liệu này mô tả thiết kế LMS có tài khoản/API của Sprint 6. Luồng tự học hiện tại không yêu cầu đăng nhập và chỉ lưu tiến độ trong browser đang dùng; chưa triển khai đồng bộ tiến độ cho luồng này. Xem [cấu trúc khóa học hiện tại](guided-course-structure.md) và [hướng dẫn public frontend](deploy-vercel.md).

## 1. Kiến trúc Đồng bộ Ngoại tuyến Ưu tiên (Offline-First Sync)

Git Academy Vietnam được thiết kế theo triết lý **Offline-First**, giúp sinh viên có thể học tập liên tục trong các phòng thực hành có kết nối mạng chập chờn mà không bị mất dữ liệu.

```
┌─────────────────────────────────┐
│     Client (Trình duyệt)        │
│  - LocalStorage Repository      │
│  - Offline Mutation Queue       │
└────────────────┬────────────────┘
                 │
                 │ 1. Kiểm tra kết nối mạng (navigator.onLine)
                 │ 2. Gửi gói tin tiến độ cục bộ kèm nhãn thời gian
                 ▼
┌─────────────────────────────────┐
│       API Server (REST)         │
│  - Auth Verification            │
│  - ConflictResolver Engine      │
└────────────────┬────────────────┘
                 │
                 │ 3. Hợp nhất dữ liệu theo luật bảo toàn
                 ▼
┌─────────────────────────────────┐
│     PostgreSQL Database         │
│  - Bảng progress                │
│  - Bảng audit_logs              │
└─────────────────────────────────┘
```

---

## 2. Quy tắc Xử lý Xung đột Dữ liệu (Conflict Resolution Rules)

Khi đồng bộ giữa dữ liệu lưu tại máy trạm của sinh viên và dữ liệu trên máy chủ, thuật toán `ConflictResolver` (`packages/exercise-engine/src/progress/conflict-resolver.ts`) áp dụng các quy tắc bảo toàn nghiêm ngặt:

### 1. Trạng thái Hoàn thành Bài học (`completedLessons`)
- **Luật Hợp nhất (Set Union)**: $L_{\text{merged}} = L_{\text{local}} \cup L_{\text{server}}$.
- **Ý nghĩa**: Bất kỳ bài học nào đã được sinh viên hoàn thành (dù ở nhà hay trên lớp) sẽ **không bao giờ bị mất đi hoặc bị ghi đè thành chưa hoàn thành**.

### 2. Điểm Kiểm tra Trắc nghiệm (`quizScores`)
- **Luật Cực đại Đơn điệu (Monotonic Maximum)**:
  $$\text{Score}_{\text{final}} = \max(\text{Score}_{\text{local}}, \text{Score}_{\text{server}})$$
- **Ý nghĩa**: Sinh viên luôn được bảo lưu điểm số cao nhất đã đạt được qua các lần làm bài.

### 3. Huy hiệu & Thành tựu (`achievements`)
- **Luật Hợp nhất Khử trùng lặp**: Thành tựu đã mở khóa được gộp lại theo danh sách định danh duy nhất (Unique IDs). Không thể bị tước bỏ huy hiệu đã nhận.

### 4. Điểm Kinh nghiệm (`totalXp`)
- **Luật Bảo toàn Điểm thực tế**:
  $$\text{XP}_{\text{final}} = \max(\text{XP}_{\text{local}}, \text{XP}_{\text{server}})$$
- Ngăn chặn hoàn toàn lỗi cộng dồn trùng lặp (Double-spending XP) khi thực hiện đồng bộ nhiều lần liên tiếp.

### 5. Chuỗi Ngày Học Liên tục (`streakDays`)
- Cập nhật theo giá trị lớn nhất hợp lệ dựa trên lịch sử hoạt động thực tế.

---

## 3. Thời điểm Kích hoạt Đồng bộ Tự động (Auto-Sync Triggers)

1. **Khởi động ứng dụng**: Khi sinh viên mở trang web, client tải tiến độ mới nhất từ máy chủ về và hợp nhất với LocalStorage.
2. **Ngay sau khi hoàn thành**: Mỗi khi vượt qua bài thực hành (Lab Passed) hoặc nộp bài Quiz, client tự động đẩy mutation lên API server.
3. **Khi có mạng trở lại**: Lắng nghe sự kiện `window.addEventListener('online')` để giải phóng hàng đợi ngoại tuyến (Offline Queue) tích lũy trong phiên offline.
