# Kỹ thuật Resolve Conflict từng bước

---

## 🎯 Mục tiêu
- Nắm vững quy trình chuẩn 4 bước để giải quyết xung đột (Resolve Conflict) trong dự án.
- Phân biệt giữa thay đổi hiện tại (Current) và thay đổi được gộp vào (Incoming).
- Hiểu được vai trò bắt buộc của lệnh `git add` để đánh dấu tệp đã giải quyết xong.

---

## 🧩 Từ khóa hôm nay

### Resolve Conflict — giải quyết xung đột
- **Nói dễ hiểu:** Thao tác chỉnh sửa lại đoạn code mâu thuẫn, xóa bỏ các vạch đánh dấu và lưu lại nội dung đúng nhất.
- **Ví dụ:** Mở tệp `payment.js`, giữ lại cả hàm giảm giá và hàm tính thuế, rồi xóa sạch các dòng `<<<<<<<` và `=======`.
- **Đừng nhầm:** Git không thể tự suy đoán thay bạn; việc giải quyết xung đột luôn cần sự xem xét và quyết định của con người.

### Current vs Incoming Change — thay đổi hiện tại và gộp vào
- **Nói dễ hiểu:** Current là code của nhánh bạn đang đứng (HEAD); Incoming là code của nhánh đang được gộp vào.
- **Ví dụ:** Trên nhánh `main` (Current) dùng cổng 8080, còn nhánh `feature` (Incoming) dùng cổng 9000.
- **Đừng nhầm:** "Incoming" không có nghĩa là code mới hơn hay xịn hơn; đó chỉ là tên gọi quy ước chỉ hướng gộp nhánh.

### Mark as Resolved — đánh dấu đã xử lý xong
- **Nói dễ hiểu:** Dùng lệnh `git add <tên-tệp>` để thông báo cho Git biết tệp đó đã được gỡ xung đột hoàn toàn.
- **Ví dụ:** Sau khi sửa xong tệp `app.js`, chạy `git add app.js` để đưa tệp từ trạng thái Unmerged vào Staging Area.
- **Đừng nhầm:** Chỉ bấm lưu tệp trong trình soạn thảo là chưa đủ; bạn bắt buộc phải chạy `git add` thì Git mới ghi nhận.

---

## 📖 Định nghĩa
Resolve Conflict (giải quyết xung đột) là quá trình bạn mở tệp tin bị mâu thuẫn, lựa chọn giữ lại đoạn code đúng, xóa sạch các vạch đánh dấu xung đột (`<<<<<<<`, `=======`, `>>>>>>>`), lưu tệp lại, chạy lệnh `git add` để đánh dấu đã xử lý xong, và cuối cùng chạy `git commit` để hoàn tất việc gộp nhánh.

---

## 🤔 Tại sao cần?
Xung đột xảy ra thường xuyên khi nhiều người cùng làm chung một tệp. Nắm vững kỹ thuật 4 bước giúp bạn không bị bối rối, tránh việc xóa nhầm công sức của đồng đội và đảm bảo chương trình không bị lỗi cú pháp do để sót vạch đánh dấu.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung việc gỡ xung đột giống như hai luật sư cùng đàm phán một điều khoản hợp đồng. Bên A đề xuất thanh toán trong 30 ngày (Current), bên B đề xuất thanh toán trong 7 ngày (Incoming). Hai bên ngồi lại thống nhất trả 50% trong 7 ngày và 50% trong 30 ngày. Sau khi gạch bỏ các ghi chú tranh luận trên giấy nháp, hai người cùng ký tên đóng dấu (`git add` và `git commit`).

---

## 🖼 Sơ đồ
```text
Quy trình 4 bước chuẩn giải quyết xung đột:
[1. Chẩn đoán]     ───> git status (Xem tệp nào đang bị Unmerged)
                             │
                             ▼
[2. Sửa thủ công]  ───> Mở tệp, chọn code cần giữ, xóa sạch <<<< ==== >>>>
                             │
                             ▼
[3. Đánh dấu xong] ───> git add <tên-tệp> (Đưa tệp vào Staging Area)
                             │
                             ▼
[4. Hoàn tất]      ───> git commit (Đóng gói tạo Merge Commit hoàn chỉnh)
```

---

## 🌎 Ví dụ thực tế
Trong tệp `payment.js`, nhánh `main` có hàm tính thuế 8%, còn nhánh `feature-sale` có hàm giảm giá 20%. Khi merge, Git báo xung đột tại hàm tính tiền. Bạn mở tệp, thấy cả hai tính năng đều cần thiết: khách vừa được giảm giá vừa phải chịu thuế. Bạn viết lại hàm kết hợp cả hai logic, xóa các vạch đánh dấu, lưu tệp, rồi chạy `git add payment.js` và `git commit`. Hệ thống hoạt động chính xác cho cả hai trường hợp.

---

## 💻 Command
```bash
git status
git add <tên-tệp-đã-sửa>
git commit
```

---

## 🔍 Giải thích command
- `git status`: Kiểm tra danh sách tệp xung đột; sau khi `git add`, tệp sẽ chuyển sang màu xanh lá báo hiệu đã xử lý xong.
- `git add <tên-tệp>`: Bắt buộc phải chạy lệnh này để xác nhận với Git rằng tệp đã được gỡ xung đột thành công.
- `git commit`: Hoàn tất tạo Merge Commit sau khi tất cả các tệp xung đột đã được đánh dấu bằng `git add`.

---

## ⚠️ Sai lầm phổ biến
1. **Quên chạy `git add` sau khi sửa tệp:** Git vẫn coi tệp đó đang bị xung đột và lệnh `git commit` sẽ từ chối thực thi.
2. **Tự ý xóa code của bạn cùng nhóm mà không hỏi:** Dễ làm mất logic quan trọng mà bạn mình đã dày công xây dựng.
3. **Để sót lại các ký tự `=======` trong code:** Làm chương trình bị lỗi cú pháp nghiêm trọng ngay khi chạy.

---

## 🧪 Lab
Bài tập này được thực hành trên môi trường Git mô phỏng của hệ thống:
1. Mở tệp `app.js` đang có vạch xung đột từ bài học trước.
2. Chọn đoạn code phù hợp, xóa sạch các dòng `<<<<<<< HEAD`, `=======`, `>>>>>>>`.
3. Lưu tệp và chạy lệnh `git add app.js` để đánh dấu đã xử lý xong.
4. Chạy lệnh `git commit` để đóng gói và hoàn tất quá trình hợp nhất nhánh.

---

## 💡 Hint
Nhớ khẩu quyết 4 bước: Mở tệp ──> Sửa code & Xóa vạch đánh dấu ──> `git add` ──> `git commit`.

---

## ✅ Validation
- Lệnh `git status` báo `nothing to commit, working tree clean`.
- Tệp `app.js` không còn chứa bất kỳ ký tự `<<<<<<<` hoặc `>>>>>>>` nào.

---

## ❓ Quiz
Trả lời các câu hỏi sau để kiểm tra mức độ nắm vững quy trình giải quyết xung đột trong Git.

---

## 🔥 Challenge
Hãy thử dùng tính năng Merge Editor của VS Code hoặc các trình soạn thảo hiện đại để trải nghiệm giao diện trực quan 3 khung khi giải quyết xung đột.

---

## 📚 Tổng kết
- Quy trình 4 bước: Chẩn đoán bằng `git status` ──> Sửa tệp ──> `git add` ──> `git commit`.
- Lệnh `git add <tên-tệp>` là bước bắt buộc để báo cho Git biết bạn đã xử lý xong xung đột.
- Luôn trao đổi với đồng đội nếu bạn không chắc chắn nên giữ hay bỏ đoạn code nào.
