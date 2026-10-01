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

### closing keywords — từ khóa đóng Issue
- **Nói dễ hiểu**: Cụm như `Fixes #15` liên kết một Issue với thay đổi.
- **Ví dụ**: Ghi `Fixes #15` trong mô tả PR để tự động đóng Issue #15 khi được merge vào main.
- **Đừng nhầm**: Nếu PR nhắm tới nhánh khác nhánh mặc định, hoặc PR chỉ được đóng mà không merge, Issue không tự đóng theo cách này. Commit chỉ đóng Issue khi commit tới nhánh mặc định.

---

## 📖 Định nghĩa
GitHub Issues là công cụ của GitHub để theo dõi lỗi, yêu cầu tính năng và thảo luận công việc. Repository có thể tắt Issues hoặc giới hạn quyền tạo/sửa Issue; quyền dùng phụ thuộc cài đặt dự án.

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
1. Dùng repository thử nghiệm mà bạn có quyền tạo Issue; nếu tab Issues không hiện, repository có thể tắt tính năng hoặc bạn thiếu quyền.
2. Tạo một Issue với tiêu đề, bước tái hiện, kết quả thực tế và kết quả mong đợi. Ghi lại số Issue GitHub vừa cấp; không giả định số luôn là `#1`.
3. Nếu có quyền và nhãn sẵn, gắn nhãn phù hợp. Chỉ tự giao việc cho mình nếu bạn thực sự nhận nhiệm vụ.
4. Trên PR thử nghiệm nhắm vào nhánh mặc định, thêm `Fixes #<số-issue>` vào mô tả. Chỉ merge PR nếu bạn có quyền và đây là repository thử nghiệm.
5. Xác nhận Issue được liên kết; sau khi PR được merge vào nhánh mặc định, kiểm tra Issue chuyển sang Closed. Nếu không merge, Issue vẫn mở.

---

## 💡 Hint & mẹo
> Dùng số Issue thật trong mô tả PR và kiểm tra nhánh đích. Từ khóa đóng chỉ tự động đóng Issue khi thay đổi được tích hợp vào nhánh mặc định.

---

## ✅ Validation & Kết quả mong đợi
- Issue mới hiển thị đầy đủ nhãn phân loại và người phụ trách trong danh sách tab Issues.
- Issue đóng tự động khi PR chứa từ khóa phù hợp được merge vào nhánh mặc định; nhánh mặc định không nhất thiết tên `main`.

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
- Từ khóa `Fixes #ID` trong PR có thể tự đóng Issue khi PR được merge vào nhánh mặc định.
