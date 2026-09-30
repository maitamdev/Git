# Quản lý công việc và lỗi với GitHub Issues

---

## 🎯 Mục tiêu
- Hiểu rõ vai trò của GitHub Issues trong việc theo dõi lỗi (Bug Tracking) và lập kế hoạch phát triển (Feature Planning).
- Biết cách viết một báo cáo lỗi chuẩn mực (Bug Report) với các bước tái hiện chi tiết.
- Sử dụng các nhãn (Labels), mốc thời gian (Milestones) và người phụ trách (Assignees) để quản trị công việc.
- Nắm vững các từ khóa liên kết tự động đóng Issue khi merge PR: `Fixes #12`, `Closes #45`.

---

## 📖 Định nghĩa
> GitHub Issues là hệ thống quản lý công việc và theo dõi lỗi (Issue Tracking System) tích hợp sẵn ngay bên trong mỗi kho lưu trữ GitHub. Issues hoạt động như một danh sách việc cần làm (To-Do List) mạnh mẽ, nơi người dùng và các kỹ sư có thể báo cáo sự cố (Bug Reports), đề xuất tính năng mới (Feature Requests), thảo luận về các vấn đề kỹ thuật và phân công trách nhiệm cho từng thành viên trong nhóm.

---

## 🤔 Tại sao cần?
Một dự án phần mềm không thể thành công nếu chỉ có mã nguồn mà không có sự quản lý công việc bài bản. Nếu không có hệ thống theo dõi lỗi, các yêu cầu của khách hàng sẽ bị trôi mất trong tin nhắn chat, các lỗi nghiêm trọng sẽ bị bỏ quên và đội ngũ sẽ rơi vào tình trạng hỗn loạn không biết ai đang làm gì. Sử dụng thành thạo GitHub Issues giúp dự án vận hành khoa học, minh bạch và chuyên nghiệp.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung GitHub Issues giống như một chiếc bảng Kanban điện tử thông minh được đặt trang trọng ngay giữa phòng làm việc của nhóm kỹ thuật, nơi dán các tấm thẻ ghi chú nhiệm vụ với nhiều màu sắc phân loại khác nhau. Mỗi tấm thẻ (Issue) ghi rõ nội dung sự cố: "Nút Đăng nhập trên điện thoại bị lệch giao diện" (Lỗi), do ai chịu trách nhiệm sửa (Assignee), độ ưu tiên cao hay thấp (Label: bug, priority:high), và cần phải hoàn thành trước ngày nào (Milestone: Sprint 4). Nhờ chiếc bảng này, toàn đội luôn nắm bắt tiến độ công việc minh bạch.

---

## 🖼 Sơ đồ
```text
Quy trình liên kết tự động Issue và Pull Request:
[Issue #42: Bug giỏ hàng] ◄────────────────────────────────┐
                                                           │ (Khi PR được merge)
[Pull Request: "Fixes #42 - Fix cart calculation"] ────────┴──► [Tự động ĐÓNG Issue #42!]
```

---

## 🌎 Ví dụ thực tế
Một khách hàng liên hệ báo cáo lỗi không thể thanh toán đơn hàng bằng thẻ tín dụng quốc tế. Kỹ sư Linh nhanh chóng tạo một Issue trên GitHub với tiêu đề chuẩn mực: "[Bug] Payment gateway timeout on checkout". Linh dán mã lỗi chi tiết từ hệ thống ghi log, đính kèm ảnh chụp màn hình và gắn nhãn `bug`, `critical`. Kỹ sư Huy nhận phân công phụ trách xử lý issue này. Sau khi sửa xong trên nhánh tính năng, Huy mở Pull Request với phần mô tả ghi rõ: "Fixes #104 - increase payment gateway timeout to 30s". Khi PR được duyệt và merge vào main, GitHub tự động chuyển trạng thái của Issue #104 sang Closed một cách hoàn toàn tự động.

---

## 💻 Command
```bash
gh issue list
gh issue create
gh issue view <issue-number>
```

---

## 🔍 Giải thích command
- `gh issue list`: Liệt kê danh sách các issue đang mở của dự án trực tiếp trong terminal bằng GitHub CLI.
- `gh issue create`: Tạo một issue mới nhanh chóng ngay từ dòng lệnh.
- `gh issue view <number>`: Xem chi tiết nội dung và các bình luận của một issue chỉ định.

---

## ⚠️ Sai lầm phổ biến
1. **Báo cáo lỗi quá mơ hồ như "Trang web bị lỗi không chạy"**:  Không có bước tái hiện, không có ảnh chụp màn hình khiến người khác không thể sửa được.
2. **Quên sử dụng từ khóa đóng issue trong PR**:  Khiến PR đã merge nhưng issue vẫn mở, làm sai lệch báo cáo tiến độ dự án.
3. **Sử dụng Issue để trò chuyện tán gẫu không liên quan đến kỹ thuật.**: Sử dụng Issue để trò chuyện tán gẫu không liên quan đến kỹ thuật.

---

## 🧪 Lab
1. Truy cập tab `Issues` trên kho lưu trữ GitHub và bấm nút `New issue`.
2. Điền tiêu đề rõ ràng và nội dung mô tả lỗi theo mẫu hướng dẫn.
3. Gán nhãn `bug` và chỉ định bản thân vào mục `Assignees`.
4. Tạo một commit có thông điệp `Fixes #1` để trải nghiệm tính năng tự động liên kết đóng issue.

---

## 💡 Hint
> Sử dụng các từ khóa `Fixes #ID`, `Closes #ID`, hoặc `Resolves #ID` trong PR để tự động đóng Issue.

---

## ✅ Validation
- Tạo thành công Issue trên GitHub và liên kết tự động đóng thông qua Pull Request.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về quản lý công việc với GitHub Issues.

---

## 🔥 Challenge
Nêu danh sách toàn bộ các từ khóa liên kết tự động đóng issue (Closing keywords) được GitHub hỗ trợ.

---

## 📚 Tổng kết
- GitHub Issues là công cụ theo dõi lỗi và quản lý đầu việc tích hợp sẵn trong repo.
- Sử dụng Labels, Milestones và Assignees để tổ chức công việc khoa học.
- Từ khóa `Fixes #ID` trong PR giúp tự động đóng Issue khi code được merge vào main.
