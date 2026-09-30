# Sự kiện kích hoạt (Events & Triggers: push, pull_request, workflow_dispatch)

---

## 🎯 Mục tiêu bài học
- Làm chủ thuộc tính on trong workflow để cấu hình các sự kiện kích hoạt tự động.
- Sử dụng bộ lọc nhánh (branches) và bộ lọc đường dẫn tệp tin (paths) để tối ưu thời điểm kích hoạt.
- Thành thạo sự kiện kích hoạt thủ công workflow_dispatch và lập lịch tự động schedule cron.

---

## 📖 Định nghĩa
> Sự kiện (Event) là một hoạt động cụ thể xảy ra trong kho lưu trữ của bạn kích hoạt GitHub Actions chạy một luồng công việc. Thuộc tính on trong tệp YAML định nghĩa danh sách các sự kiện này. Các sự kiện phổ biến nhất bao gồm: push (đẩy mã nguồn), pull_request (tạo, cập nhật hoặc đóng PR), workflow_dispatch (kích hoạt thủ công từ giao diện hoặc API), và schedule (kích hoạt định kỳ theo thời gian biểu cron) phục vụ các tác vụ bảo trì tự động.

---

## 🤔 Tại sao cần?
Nếu không cấu hình sự kiện chính xác, workflow sẽ chạy một cách vô tội vạ, gây lãng phí tài nguyên và làm nghẽn hàng đợi CI. Ví dụ: bạn không muốn một workflow triển khai lên máy chủ sản xuất lại bị kích hoạt khi ai đó chỉ đẩy commit lên một nhánh tính năng cá nhân, hoặc không muốn chạy lại bài test nặng nề khi người ta chỉ chỉnh sửa một tệp tài liệu README.md không ảnh hưởng gì tới mã nguồn thực thi.

---

## 🧠 Mental Model & Mô hình tư duy
Hãy hình dung một chiếc chuông cửa điện tử thông minh trong ngôi nhà hiện đại. Bạn có thể cài đặt chuông reo khi có khách nhấn nút trực tiếp (sự kiện workflow_dispatch), hoặc khi cảm biến chuyển động phát hiện có người đứng trước cửa (sự kiện push vào nhánh main). Bạn cũng có thể dễ dàng cài đặt bộ lọc thông minh: nếu đó chỉ là một chú mèo hàng xóm đi ngang qua (sửa đổi tệp trong thư mục docs/), chiếc chuông sẽ tự động bỏ qua và không reo để tránh làm phiền gia chủ.

---

## 🖼️ Sơ đồ minh họa
```text
Event: push ────────────────► [Lọc Branch: main?] ──► Có ──► Kích hoạt Workflow
                                    │
                                    └── Không (feature) ──► Bỏ qua (Ignored)

Event: pull_request ──────────► [Lọc Path: src/**?] ──► Có ──► Chạy Test
                                    │
                                    └── Không (docs/**) ──► Tiết kiệm tài nguyên
```

---

## 🌎 Ví dụ thực tế
Trong dự án xây dựng cổng thông tin ngân hàng, kỹ sư cấu hình tệp workflow ci.yml với sự kiện push nhưng chỉ lắng nghe trên nhánh main và nhánh staging. Đồng thời, kỹ sư bổ sung thuộc tính paths-ignore để bỏ qua mọi commit chỉ thay đổi các tệp markdown trong thư mục docs. Khi một cộng tác viên đẩy bản sửa lỗi chính tả trong tài liệu, hệ thống không chạy CI, tiết kiệm hàng trăm phút tính toán máy ảo cho công ty. Khi trưởng nhóm gộp mã nguồn vào nhánh main, hệ thống lập tức kích hoạt toàn bộ bài test bảo mật nghiêm ngặt.

---

## 💻 Command & Lệnh thao tác
```bash
gh workflow run ci.yml
git push origin main
git push origin feature/login
```

---

## 🔍 Giải thích chi tiết lệnh
Câu lệnh gh workflow run cho phép kích hoạt một workflow có hỗ trợ sự kiện workflow_dispatch trực tiếp từ terminal, trong khi git push đẩy commit lên các nhánh tương ứng để kiểm tra bộ lọc branches xem đường ống có phản hồi chính xác hay không.

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Quên lọc nhánh khiến các commit trên nhánh tạm thời của lập trình viên kích hoạt luôn kịch bản deploy.**: 
2. **Sử dụng sai cú pháp biểu thức cron giờ UTC trong sự kiện schedule dẫn đến việc kịch bản chạy sai thời điểm mong muốn.**: 
3. **Không khai báo workflow_dispatch khiến việc kiểm thử thủ công workflow gặp nhiều khó khăn.**: 

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Khai báo sự kiện on với hai trigger: push trên nhánh main và pull_request.
2. Thêm cấu hình workflow_dispatch để có thể bấm chạy thử nghiệm từ giao diện.
3. Thêm bộ lọc paths-ignore đối với các tệp tin tài liệu đuôi `.md`.

---

## 💡 Gợi ý thực hiện (Hint)
> Múi giờ của lịch schedule cron trong GitHub Actions luôn tính theo giờ quốc tế UTC, hãy nhớ quy đổi giờ Việt Nam (UTC+7).

---

## ✅ Kiểm tra kết quả (Validation)
Workflow chỉ chạy khi đẩy code vào nhánh chỉ định hoặc kích hoạt thủ công, không chạy khi sửa file markdown.

---

## ❓ Câu hỏi ôn tập (Quiz)
Cùng làm bài trắc nghiệm về các sự kiện và bộ lọc kích hoạt trong GitHub Actions.

---

## 🔥 Thử thách nâng cao (Challenge)
Làm thế nào để cấu hình một workflow chỉ chạy vào lúc 2 giờ sáng hàng ngày từ thứ Hai đến thứ Sáu bằng cú pháp cron?

---

## 📚 Tổng kết kiến thức
- Thuộc tính `on` định nghĩa các sự kiện kích hoạt workflow như `push`, `pull_request`, `workflow_dispatch`.
- Có thể dùng `branches`, `branches-ignore`, `paths`, `paths-ignore` để lọc phạm vi kích hoạt.
- `workflow_dispatch` cho phép kích hoạt workflow thủ công và truyền tham số đầu vào khi cần.
