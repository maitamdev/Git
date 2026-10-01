# Quản lý công việc và lỗi với GitHub Issues

---

## 🎯 Mục tiêu
- Hiểu rõ vai trò của GitHub Issues trong việc theo dõi lỗi (Bug Tracking) và lập kế hoạch phát triển (Feature Planning).
- Biết cách viết một báo cáo lỗi chuẩn mực (Bug Report) với các bước tái hiện chi tiết.
- Sử dụng các nhãn (Labels), mốc thời gian (Milestones) và người phụ trách (Assignees) để quản trị công việc.
- Nắm vững các từ khóa liên kết tự động đóng Issue khi merge PR: `Fixes #12`, `Closes #45`.

---

## 🧩 Từ khóa hôm nay

### issue
- **Nói dễ hiểu**: Một tấm thẻ theo dõi một lỗi cần sửa, một tính năng cần làm hoặc một câu hỏi kỹ thuật trong dự án.
- **Ví dụ**: Tạo Issue `#15: Lỗi không nhấn được nút thanh toán trên mobile`.
- **Đừng nhầm**: Không chỉ để báo lỗi hỏng; issue còn dùng để lập kế hoạch công việc và thảo luận tính năng mới.

### labels & assignees
- **Nói dễ hiểu**: Nhãn phân loại màu sắc và người chịu trách nhiệm chính được giao giải quyết issue.
- **Ví dụ**: Gắn nhãn `bug`, `high-priority` và chỉ định bạn Nam vào mục `Assignees`.
- **Đừng nhầm**: Nhãn không tự động sửa lỗi; đây là công cụ hỗ trợ lọc, tìm kiếm và phân công công việc khoa học.

### closing keywords
- **Nói dễ hiểu**: Các từ khóa đặc biệt viết trong commit hoặc PR giúp GitHub tự động chuyển Issue sang trạng thái Closed khi merge.
- **Ví dụ**: Ghi `Fixes #15` trong mô tả PR để tự động đóng Issue #15 khi được merge vào main.
- **Đừng nhầm**: Chỉ đóng tự động khi PR được merge vào nhánh mặc định; nếu PR bị đóng (close) mà không merge thì Issue vẫn mở.

---

## 📖 Định nghĩa
GitHub Issues là hệ thống theo dõi lỗi và quản lý công việc tích hợp sẵn bên trong mỗi kho lưu trữ GitHub, nơi người dùng và lập trình viên có thể báo cáo sự cố (Bug Reports), đề xuất tính năng mới (Feature Requests), thảo luận kỹ thuật và phân công nhiệm vụ cụ thể cho từng thành viên.

---

## 💡 Tại sao cần
Một dự án phần mềm không thể thành công nếu chỉ có mã nguồn mà thiếu quản trị công việc bài bản. Nếu không có hệ thống theo dõi lỗi, yêu cầu của khách hàng sẽ bị trôi mất trong tin nhắn chat, lỗi nghiêm trọng bị bỏ quên và nhóm sẽ rơi vào tình trạng hỗn loạn không rõ ai đang làm phần việc nào.

---

## 🧠 Mental Model
Hãy hình dung GitHub Issues như một chiếc bảng Kanban thông minh đặt giữa phòng làm việc của đội ngũ. Mỗi tấm thẻ ghi chú (Issue) có màu sắc riêng (Labels), ghi rõ ai phụ trách (Assignees), làm trước ngày nào (Milestones) và mô tả chi tiết lỗi cần sửa để cả nhóm cùng theo dõi minh bạch.

---

## 📊 Sơ đồ minh họa
```text
Quy trình liên kết tự động Issue và Pull Request:
[Issue #42: Bug giỏ hàng] ◄────────────────────────────────┐
                                                           │ (Khi PR được merge)
[Pull Request: "Fixes #42 - Fix cart calculation"] ────────┴──► [Tự động ĐÓNG Issue #42!]
```

---

## 🏢 Ví dụ thực tế
Khách hàng báo lỗi không thể thanh toán bằng thẻ tín dụng. Kỹ sư Linh tạo Issue trên GitHub: "[Bug] Payment gateway timeout on checkout", đính kèm log chi tiết và gắn nhãn `bug`, `critical`. Kỹ sư Huy nhận xử lý issue này. Khi hoàn thành, Huy mở PR ghi rõ: "Fixes #104". Khi PR được duyệt và merge vào main, GitHub tự động đóng Issue #104 ngay lập tức.

---

## 💻 Command & Cú pháp
```bash
gh issue list
gh issue create
gh issue view <issue-number>
```

---

## 🔍 Giải thích command
- `gh issue list`: Liệt kê danh sách các issue đang mở của dự án trực tiếp trong terminal bằng GitHub CLI.
- `gh issue create`: Tạo một issue mới nhanh chóng ngay từ dòng lệnh mà không cần mở trình duyệt web.
- `gh issue view <number>`: Xem chi tiết nội dung và các bình luận trao đổi của một issue chỉ định.

---

## ⚠️ Sai lầm phổ biến
1. **Báo cáo lỗi quá mơ hồ không có bước tái hiện**: Viết mỗi câu "Web bị lỗi" khiến đồng nghiệp không thể tái hiện và sửa chữa.
2. **Quên dùng từ khóa đóng issue trong PR**: Khiến PR đã merge xong nhưng Issue vẫn bị treo ở trạng thái mở làm sai lệch báo cáo tiến độ.
3. **Dùng Issues để tán gẫu việc riêng ngoài lề**: Làm loãng không gian thảo luận kỹ thuật và gây khó khăn cho việc tra cứu tài liệu sau này.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác tạo một Issue thử nghiệm và liên kết từ khóa đóng tự động.
1. Truy cập tab `Issues` trên kho lưu trữ GitHub và bấm nút `New issue`.
2. Điền tiêu đề rõ ràng và nội dung mô tả lỗi theo mẫu các bước tái hiện.
3. Gán nhãn `bug` và chỉ định bản thân vào mục `Assignees`.
4. Tạo một commit có thông điệp `Fixes #1` để kiểm tra tính năng tự động liên kết đóng issue.

---

## 💡 Hint & mẹo
> Sử dụng các từ khóa `Fixes #ID`, `Closes #ID`, hoặc `Resolves #ID` trong PR để tự động đóng Issue khi code được tích hợp.

---

## ✅ Validation & Kết quả mong đợi
- Issue mới hiển thị đầy đủ nhãn phân loại và người phụ trách trong danh sách tab Issues.
- Issue tự động chuyển sang màu tím `Closed` sau khi PR liên kết được merge vào main.

---

## ❓ Quiz nhanh
Hãy hoàn thành các câu hỏi trắc nghiệm dưới đây để củng cố kiến thức về quản lý công việc với GitHub Issues.

---

## 🚀 Thử thách nâng cao
Thiết lập mẫu Issue (Issue Templates) trong thư mục `.github/ISSUE_TEMPLATE/` để người báo cáo lỗi tự động điền theo biểu mẫu chuẩn chuyên nghiệp.

---

## 📝 Tổng kết
- GitHub Issues là công cụ theo dõi lỗi và quản lý đầu việc tích hợp sẵn trong repo.
- Sử dụng Labels, Milestones và Assignees để tổ chức công việc khoa học.
- Từ khóa `Fixes #ID` trong PR giúp tự động đóng Issue khi code được merge vào main.
