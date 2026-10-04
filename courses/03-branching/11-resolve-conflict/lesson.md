# Kỹ thuật Resolve Conflict từng bước

---

## 🎯 Mục tiêu
- Nắm vững quy trình chuẩn 4 bước để giải quyết xung đột (Resolve Conflict) chuyên nghiệp.
- Phân biệt bản chất giữa thay đổi hiện tại (Current Change) và thay đổi được gộp vào (Incoming Change).
- Hiểu rõ vai trò bắt buộc của lệnh `git add` trong việc đánh dấu tệp đã được xử lý xung đột thành công.

---

## 🧩 Từ khóa hôm nay

### Resolve Conflict — giải quyết xung đột
- **Nói dễ hiểu:** Hành động can thiệp thủ công để chọn lọc đoạn code chuẩn xác nhất, tẩy sạch các vạch đánh dấu và đưa tệp về trạng thái sạch sẽ.
- **Ví dụ:** Mở tệp `auth.js`, giữ lại cả logic đăng nhập Google lẫn logic đăng nhập Facebook rồi xóa các dòng `<<<<<<<` và `=======`.
- **Đừng nhầm:** Git không thể tự đoán thay bạn; việc gỡ xung đột luôn đòi hỏi tư duy logic và sự thấu hiểu nghiệp vụ của lập trình viên.

### Current vs Incoming Change — thay đổi hiện tại và gộp vào
- **Nói dễ hiểu:** Current là đoạn code thuộc nhánh bạn đang đứng (HEAD); Incoming là đoạn code đến từ nhánh đang được merge vào.
- **Ví dụ:** Khi đang đứng ở `main` để merge `feature`, code trên `main` là Current còn code trên `feature` là Incoming.
- **Đừng nhầm:** "Incoming" không mặc định là code mới hơn hay xịn hơn; đó chỉ là thuật ngữ quy ước kỹ thuật chỉ hướng di chuyển của dữ liệu.

### Mark as Resolved — đánh dấu đã xử lý xong
- **Nói dễ hiểu:** Thao tác chạy lệnh `git add <tên-tệp>` để báo cho Git biết tệp tin này đã được giải quyết xung đột hoàn toàn êm đẹp.
- **Ví dụ:** Sau khi sửa xong tệp `app.js`, bạn gõ `git add app.js` để chuyển tệp từ danh sách Unmerged paths sang Staging Area.
- **Đừng nhầm:** Chỉ bấm lưu file bằng tổ hợp phím lưu trong trình soạn thảo là chưa đủ; Git chỉ công nhận tệp đã hết conflict khi bạn chạy lệnh `git add`.

---

## 📖 Định nghĩa
Resolve Conflict (giải quyết xung đột) là quy trình kỹ thuật 4 bước chuẩn chỉ: Chẩn đoán vị trí mâu thuẫn qua `git status`, mở file chọn lọc đoạn code đúng và xóa sạch toàn bộ các vạch đánh dấu (`<<<<<<<`, `=======`, `>>>>>>>`), chạy `git add` để đánh dấu tệp đã xử lý xong và cuối cùng niêm phong `git commit` để hoàn tất việc gộp nhánh.

---

## 🤔 Tại sao cần?
Biết cách gỡ xung đột bình tĩnh và chuẩn xác là dấu hiệu trưởng thành rõ ràng nhất của một kỹ sư phần mềm. Khi làm việc nhóm, xung đột xảy ra hàng ngày ở mọi dự án. Nắm vững kỹ thuật này giúp bạn bảo vệ toàn vẹn logic nghiệp vụ của cả hai bên, không vô tình xóa mất code của đồng đội và đảm bảo ứng dụng không bao giờ bị sập do để sót các ký tự lạ trong mã nguồn.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung bạn là một vị quan tòa phân xử tranh chấp quyền tác giả. Hai tác giả cùng nộp hai đoạn văn khác nhau cho phần kết truyện. Bạn đọc cả hai bản thảo, thảo luận với tác giả để chắt lọc những ý tứ tinh hoa nhất ghép thành một cái kết trọn vẹn. Sau khi tẩy sạch các vết gạch xóa tranh luận trên bản thảo, bạn đóng dấu phê duyệt cho in sách (`git add` và `git commit`).

---

## 🖼 Sơ đồ
```text
QUY TRÌNH 4 BƯỚC CHUẨN XỬ LÝ XUNG ĐỘT (RESOLVE CONFLICT):

[Bước 1: Chẩn đoán]     ──► git status (Nhận diện tệp trong mục Unmerged paths)
                                 │
                                 ▼
[Bước 2: Sửa thủ công]  ──► Mở tệp, dung hòa logic code, XÓA HẾT vạch <<<< ==== >>>>
                                 │
                                 ▼
[Bước 3: Đánh dấu xong] ──► git add <tệp> (Thông báo cho Git: Tệp này đã xử lý xong!)
                                 │
                                 ▼
[Bước 4: Hoàn tất mốc]  ──► git commit (Tạo Merge Commit chính thức kết thúc xung đột)
```

---

## 🌎 Ví dụ thực tế
Trong tệp `payment.js`, nhánh `main` (Current) áp dụng thuế VAT 8%, còn nhánh `feature-discount` (Incoming) áp dụng mã giảm giá 10%. Bạn không chọn riêng bên nào, mà kết hợp cả hai: tính giảm giá trước rồi mới tính thuế sau. Sau đó bạn xóa sạch các vạch `<<<<<<<` và `>>>>>>>`, lưu file, gõ `git add payment.js` và commit thành công.

---

## 💻 Command
```bash
git status
git add <tên-tệp-đã-sửa>
git commit -m "merge: resolve payment conflict"
```

---

## 🔍 Giải thích command
- `git status`: Kiểm tra tiến độ gỡ conflict; tệp nào đã `git add` sẽ chuyển sang màu xanh lá cây sẵn sàng commit.
- `git add <tên-tệp>`: Lệnh cốt tử để báo cáo với Git rằng bạn đã xử lý xong xung đột ở tệp này.
- `git commit`: Không cần truyền cờ `-m` nếu muốn Git tự động sử dụng thông điệp merge mặc định, hoặc thêm `-m` để ghi chú rõ ràng cách xử lý.

---

## ⚠️ Sai lầm phổ biến
1. **Sửa code xong nhưng quên gõ `git add`**: Git vẫn xem tệp đó là đang xung đột dở và lệnh `git commit` sẽ từ chối thực thi.
2. **Xóa thẳng tay code của đồng đội mà không trao đổi**: Gây mất mát tính năng và sứt mẻ tình cảm đồng nghiệp trong nhóm.
3. **Để sót vạch ngăn cách `=======`**: Khiến code bị lỗi cú pháp không thể biên dịch hay chạy được.

---

## 🧪 Lab
1. Mở tệp `conflict.txt` đang có dấu mốc xung đột từ bài học trước.
2. Sửa nội dung tệp thành một câu thống nhất hoàn chỉnh: `Màu nền: xanh pha đỏ`, đồng thời xóa sạch toàn bộ các dòng `<<<<<<< HEAD`, `=======`, `>>>>>>>`.
3. Lưu tệp lại và chạy `git status` để thấy tệp vẫn ở mục modified.
4. Chạy lệnh: `git add conflict.txt` để đánh dấu đã giải quyết xong.
5. Chạy `git commit -m "merge: resolve background color conflict"` để hoàn tất việc hợp nhất.

---

## 💡 Hint
> Ghi nhớ 4 bước thần chú: Mở file ──> Sửa code & Xóa vạch ──> `git add` ──> `git commit`!

---

## ✅ Validation
- Tệp `conflict.txt` không còn chứa bất kỳ ký tự nào của marker xung đột.
- Lệnh `git status` báo `nothing to commit, working tree clean`.
- Merge commit xuất hiện đàng hoàng trong lịch sử `git log --oneline`.

---

## ❓ Quiz
Trả lời bài trắc nghiệm dưới đây để kiểm tra mức độ thuần thục 4 bước quy trình giải quyết xung đột trong Git.

---

## 🔥 Challenge
Hãy tìm hiểu và sử dụng công cụ Merge Editor trực quan tích hợp sẵn trong VS Code (hoặc IDE yêu thích của bạn). So sánh trải nghiệm giữa việc sửa marker bằng tay với việc bấm nút giải quyết trực quan trên giao diện 3 khung!

---

## 📚 Tổng kết
- Quy trình 4 bước chuẩn mực: `git status` ──> Sửa code & Xóa marker ──> `git add` ──> `git commit`.
- Lệnh `git add` là lời khẳng định chính thức với Git rằng xung đột đã được hóa giải.
- Luôn giữ thái độ cẩn trọng, tôn trọng mã nguồn của đồng đội và kiểm tra kỹ trước khi tạo commit.
