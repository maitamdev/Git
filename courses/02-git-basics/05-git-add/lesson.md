# Đưa tệp vào staging với git add

---

## 🎯 Mục tiêu
- Sử dụng thành thạo câu lệnh `git add` với các cú pháp: tệp chỉ định, thư mục, và `git add .`.
- Hiểu rõ sự khác biệt và rủi ro tiềm ẩn giữa `git add <file>` có chọn lọc và `git add .`.
- Làm quen với kỹ thuật stage từng khối dòng code bằng cờ `-p` (patch mode).

---

## 📖 Định nghĩa
> `git add` là câu lệnh thiết yếu dùng để chuyển các thay đổi trên tệp tin từ Working Directory vào Staging Area (vùng chuẩn bị). Lệnh này thông báo cho Git biết rằng bạn muốn đưa trạng thái hiện tại của tệp tin được chỉ định vào ảnh chụp snapshot sắp tới. Bạn có thể thêm từng tệp đơn lẻ (`git add file.txt`), thêm toàn bộ một thư mục (`git add src/`), hoặc thêm tất cả các thay đổi có trong thư mục hiện tại (`git add .`). Đối với tệp tin mới tạo, `git add` bắt đầu đưa tệp vào diện theo dõi (Tracked).

---

## 🤔 Tại sao cần?
Làm chủ lệnh `git add` chính là kỹ năng làm chủ nghệ thuật đóng gói commit sạch sẽ trong quy trình phát triển phần mềm chuyên nghiệp. Rất nhiều lập trình viên mới có thói quen lười biếng luôn gõ `git add .` trong mọi tình huống, dẫn đến việc vô tình đưa cả tệp cấu hình chứa mật khẩu database, file binary nặng hàng trăm megabyte hoặc code thử nghiệm dở dang lên kho chứa chung. Sử dụng `git add` có chọn lọc là thước đo tính kỷ luật của một kỹ sư phần mềm.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung việc chạy lệnh `git add` giống như hành động bạn cầm một món hàng từ trên kệ siêu thị (Working Directory) và đặt nó vào giỏ hàng của bạn (Staging Area). Khi bạn đi dạo quanh siêu thị, bạn có thể xem xét và chạm vào hàng chục món đồ khác nhau. Nhưng chỉ những món đồ nào bạn quyết định đặt vào giỏ hàng thì lát nữa khi ra quầy thu ngân thanh toán (git commit), nhân viên mới tính tiền và in hóa đơn ghi nhận quyền sở hữu cho bạn.

---

## 🖼 Sơ đồ
```text
Thao tác đưa tệp vào giỏ hàng:
[Working Directory]                                      [Staging Area]
  ├── index.html ──(git add index.html)────────────────► index.html (đã staged)
  ├── styles.css ──(git add styles.css)────────────────► styles.css (đã staged)
  └── temp.log   ──(không add)─────────────────────────► (vẫn ở Working Tree)
```

---

## 🌎 Ví dụ thực tế
Kỹ sư đang phát triển tính năng xác thực hai yếu tố cho hệ thống ngân hàng trực tuyến. Kỹ sư sửa đổi mã nguồn trong src/auth.js, viết tệp kiểm thử tests/auth.test.js, và ghi chép một số ghi chú nháp vào notes.txt. Khi chuẩn bị commit, kỹ sư chạy lệnh git add src/auth.js tests/auth.test.js. Tệp notes.txt không được thêm và vẫn nằm an toàn trên máy cá nhân mà không bị commit nhầm vào lịch sử chung của cả nhóm dự án, bảo đảm tính bảo mật tối đa cho toàn bộ mã nguồn của ngân hàng. Sau đó, kỹ sư cẩn thận kiểm tra lại trạng thái bằng git status để đảm bảo chỉ đúng hai tệp trên đã chuyển sang màu xanh trong vùng Staging Area, hoàn toàn an tâm trước khi thực hiện bước đóng gói snapshot tiếp theo.

---

## 💻 Command
```bash
git add <file>
git add .
git add -A
git add -p
```

---

## 🔍 Giải thích command
- `git add <file>`: Đưa một tệp tin cụ thể vào Staging Area có chọn lọc an toàn tuyệt đối.
- `git add .`: Đưa toàn bộ các thay đổi trong thư mục hiện tại trở xuống vào Staging Area.
- `git add -A`: Đưa tất cả thay đổi trên toàn bộ kho lưu trữ vào Staging Area bất kể thư mục hiện tại.
- `git add -p`: Chế độ tương tác từng khối thay đổi (patch) cho phép bạn duyệt từng dòng code.

---

## ⚠️ Sai lầm phổ biến
1. **Luôn luôn gõ git add . mà không kiểm tra git status trước**:  Dẫn đến việc commit nhầm các file bí mật như `.env`, khóa API hoặc file rác hệ thống.
2. **Nghĩ git add là đã lưu vào lịch sử vĩnh viễn**:  `git add` mới chỉ đưa vào phòng chuẩn bị, nếu máy tính bị sập nguồn hoặc xóa thư mục trước khi `git commit`, dữ liệu vẫn có thể bị thất lạc.
3. **Không đọc kỹ thông báo khi git add gặp file quá lớn**:  Cố gắng add các file video hoặc zip nặng khiến Git chạy chậm chạp.

---

## 🧪 Lab
1. Tạo tệp `app.js` với nội dung `console.log("Git Add Lab");`.
2. Chạy `git status` để thấy tệp đang ở danh sách Untracked màu đỏ.
3. Chạy lệnh `git add app.js` để đưa tệp vào Staging Area.
4. Chạy lại `git status` để xác nhận tệp đã chuyển sang màu xanh lá cây.

---

## 💡 Hint
> Gõ `git add <tên-tệp>` để thêm chính xác tệp tin bạn mong muốn.

---

## ✅ Validation
- Kiểm tra `git status` hiển thị tệp `app.js` trong mục Changes to be committed.

---

## ❓ Quiz
Hãy trả lời các câu hỏi dưới đây để củng cố kỹ năng sử dụng lệnh git add.

---

## 🔥 Challenge
Tìm hiểu cờ `git add -p` (patch) và giải thích lợi ích của việc stage từng khối dòng code (hunk).

---

## 📚 Tổng kết
- `git add` đưa các thay đổi từ Working Directory vào Staging Area sẵn sàng để commit.
- Bắt đầu theo dõi các tệp tin mới (chuyển trạng thái từ Untracked thành Tracked/Staged).
- Nên ưu tiên add có chọn lọc từng tệp thay vì lạm dụng `git add .` để tránh commit nhầm tệp rác.
