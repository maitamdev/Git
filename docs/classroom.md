# Quản lý Lớp học & Ghi danh (Classroom & Enrollment) — Git Academy Vietnam (Sprint 6)

## 1. Vòng đời Lớp học (Classroom Lifecycle)

Hệ thống LMS của Git Academy Vietnam cho phép giảng viên quản lý toàn diện các lớp học Git & GitHub tương tác:

```
[ Khởi tạo Lớp ] ──► [ Sinh Mã Ghi danh ] ──► [ Sinh viên Tham gia ] ──► [ Theo dõi Tiến độ ] ──► [ Tổng kết & Đóng Lớp ]
```

1. **Khởi tạo Lớp (Creation)**: Giảng viên chỉ định tên lớp, ngày bắt đầu, ngày kết thúc và chính sách chấm điểm.
2. **Cấp phát Mã (Code Generation)**: Hệ thống sinh mã lớp độc nhất, ví dụ: `GIT-K48-A` hoặc `GIT-K49-B`.
3. **Ghi danh (Enrollment)**: Sinh viên chỉ cần nhập mã lớp trên Student Dashboard để tham gia ngay lập tức.
4. **Giám sát (Monitoring)**: Giảng viên xem danh sách sinh viên (Roster), theo dõi tiến độ thời gian thực và phân loại sinh viên có nguy cơ tụt hậu (At-Risk).
5. **Tổng kết (Final Grading)**: Xuất bảng điểm composite và đồng bộ kết quả về hệ thống LMS trường học.

---

## 2. Quy chuẩn Định dạng Mã Lớp (Class Code Format)

Mã lớp tuân thủ biểu thức chính quy (Regex):
```regex
^GIT-[A-Z0-9]{3,6}-[A-Z0-9]{1,4}$
```
- Tiền tố: Luôn là `GIT-` để đồng bộ thương hiệu.
- Phần giữa: Mã khóa / khoa (ví dụ: `K48`, `CNTT`, `DEV`).
- Phần cuối: Mã nhóm / phân lớp (ví dụ: `A`, `B`, `01`, `02`).

---

## 3. Thuật toán Cảnh báo Nguy cơ Tụt hậu (At-Risk Detection Engine)

Nhằm hỗ trợ giảng viên can thiệp kịp thời trước khi sinh viên trượt môn, `packages/gradebook` tích hợp thuật toán phân tích đa chiều để phát hiện sinh viên rơi vào trạng thái **Nguy cơ cao (At-Risk)**:

Một sinh viên bị đánh dấu là `isAtRisk = true` khi thỏa mãn **bất kỳ một** trong các điều kiện sau:
1. **Tiến độ bài học quá chậm**: Số bài hoàn thành dưới 50% tổng số bài giảng yêu cầu.
2. **Điểm Quiz dưới mức chuẩn**: Điểm trung bình kiểm tra trắc nghiệm dưới 60 điểm (hoặc dưới ngưỡng `passThreshold`).
3. **Nợ bài tập**: Có từ 2 bài tập lớn trở lên chưa nộp sau thời hạn chót (Deadline).
4. **Ngừng tương tác lâu ngày**: Không có bất kỳ sự kiện hoạt động nào trong vòng 7 ngày liên tiếp.

---

## 4. Giao diện Giảng viên (Teacher Dashboard & Roster View)

Trong màn hình quản trị lớp (`ClassDashboard.tsx`):
- **Bộ lọc Trạng thái**: Cho phép lọc nhanh:
  - *Tất cả sinh viên*
  - *Đang học tốt (Completed / On track)*
  - *Chậm tiến độ (In progress)*
  - *Nợ bài tập (Missing assignments)*
  - *Cảnh báo nguy cơ (At-risk)*
- **Tìm kiếm Thông minh**: Tìm theo họ tên, email hoặc mã số sinh viên.
- **Hành động Chấm điểm**: Cho phép ghi đè điểm (Grade Override) kèm lý do kiểm toán lưu vào `audit_logs`.
- **Xuất Báo cáo CSV**: Tải danh sách điểm danh và bảng điểm tổng kết chỉ với 1 cú click chuột.
