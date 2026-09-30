# Sổ điểm & Chính sách Đánh giá (Gradebook Engine) — Git Academy Vietnam (Sprint 6)

## 1. Công thức Tính Điểm Tổng hợp (Weighted Composite Score)

Gói thư viện `@git-academy/gradebook` chịu trách nhiệm tính toán điểm tổng kết môn học một cách minh bạch và chuẩn xác theo công thức trọng số:

$$\text{Final Score} = (S_{\text{quiz}} \times W_{\text{quiz}}) + (S_{\text{labs}} \times W_{\text{labs}}) + (S_{\text{challenges}} \times W_{\text{challenges}}) + (S_{\text{assignments}} \times W_{\text{assignments}})$$

Trong đó:
- $S_{\text{quiz}}$: Điểm trung bình các bài kiểm tra trắc nghiệm kiến thức (0–100).
- $S_{\text{labs}}$: Tỷ lệ hoàn thành các bài thực hành kịch bản Git trong phòng lab (0–100).
- $S_{\text{challenges}}$: Điểm hoàn thành các bài toán thử thách nâng cao (0–100).
- $S_{\text{assignments}}$: Điểm trung bình các bài tập lớn do giảng viên chấm (0–100).

### Trọng số Mặc định (Default Policy):
- **Trắc nghiệm (Quiz)**: $25\%$
- **Thực hành Lab (Labs)**: $30\%$
- **Thử thách (Challenges)**: $20\%$
- **Bài tập Giảng viên (Assignments)**: $25\%$
- **Tổng cộng**: $100\%$

Mỗi lớp học có thể cấu hình lại các trọng số này thông qua giao diện thiết lập chính sách chấm điểm (`GradePolicy`).

---

## 2. Thang điểm Chữ (Letter Grade Scale)

Điểm số tổng hợp trên thang 100 được quy đổi sang điểm chữ theo chuẩn học chế tín chỉ:

| Điểm số (0–100) | Điểm Chữ | Đánh giá Học lực | Trạng thái |
| :---: | :---: | :---: | :---: |
| $\ge 85$ | **A** | Xuất sắc / Giỏi | Đạt (Pass) |
| $70 - 84$ | **B** | Khá | Đạt (Pass) |
| $55 - 69$ | **C** | Trung bình khá | Đạt (Pass) |
| $40 - 54$ | **D** | Trung bình | Đạt (Pass) |
| $< 40$ | **F** | Không đạt / Trượt | Không đạt (Fail) |

---

## 3. Quản lý Thời hạn & Hạn nộp (Deadline Manager)

Module `DeadlineManager` chuẩn hóa toàn bộ thời gian theo chuỗi chuẩn quốc tế **UTC ISO-8601** (`YYYY-MM-DDTHH:mm:ssZ`) để đảm bảo tính nhất quán trên mọi múi giờ của sinh viên và máy chủ.

### Nhãn Hiển thị Bản ngữ hóa (Vietnamese UI Badges):
- Khi còn thời gian nộp bài: `"Còn 3 ngày"`, `"Còn 12 giờ"`.
- Khi quá hạn nhưng chưa nộp: `"Quá hạn"`.
- Khi sinh viên đã nộp bài chờ chấm: `"Đã nộp bài"`.
- Khi giảng viên đã hoàn thành chấm điểm: `"Đã chấm điểm"`.

---

## 4. Chính sách Nộp bài Muộn (Late Submission Penalty)

Giảng viên có thể thiết lập tỷ lệ trừ điểm nộp muộn tự động:
- **Tỷ lệ trừ**: Mặc định $5\%$ mỗi ngày nộp muộn.
- **Trừ tối đa**: Không vượt quá $50\%$ tổng số điểm bài tập.
- **Sau 7 ngày muộn**: Khóa quyền nộp bài trừ khi được giảng viên mở quyền đặc cách.
