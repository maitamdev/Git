# Đưa tệp vào staging với git add

---

## 🎯 Mục tiêu
- Chọn một tệp bằng `git add <file>` và xác nhận lựa chọn bằng `git status`.
- Giải thích được `git add .` chọn thay đổi dưới thư mục hiện tại.
- Biết `git add -p` dùng để chọn từng nhóm thay đổi.

---

## 🧩 Từ khóa hôm nay

### `git add` — chọn thay đổi cho commit
- **Nói dễ hiểu:** Đưa trạng thái hiện tại của tệp vào vùng chuẩn bị.
- **Ví dụ:** `git add README.md` chọn riêng tệp README.
- **Đừng nhầm:** `git add` chưa tạo commit.

### Path — đường dẫn tệp
- **Nói dễ hiểu:** Tên cho Git biết bạn muốn chọn tệp hoặc thư mục nào.
- **Ví dụ:** `README.md` là đường dẫn tới một tệp trong dự án.
- **Đừng nhầm:** Chọn một tệp khác với chọn toàn bộ dự án.

### `git add .` — chọn thay đổi ở thư mục hiện tại
- **Nói dễ hiểu:** Thêm các thay đổi phù hợp bên dưới thư mục đang đứng.
- **Ví dụ:** Chạy lệnh ở thư mục dự án để chọn nhiều tệp.
- **Đừng nhầm:** Xem `git status` để chắc bạn không chọn nhầm tệp.

### Patch mode — chọn từng phần thay đổi
- **Nói dễ hiểu:** `git add -p` cho phép chọn từng nhóm dòng thay vì cả tệp.
- **Ví dụ:** Chỉ đưa phần sửa lỗi vào commit, để phần làm dở lại.
- **Đừng nhầm:** Đây là chế độ tương tác; đọc từng câu hỏi trước khi chọn.

---

## 📖 Định nghĩa
`git add` chụp trạng thái hiện tại của thay đổi vào Staging Area để chuẩn bị cho commit kế tiếp. Tệp vẫn nằm nguyên trong thư mục dự án. Ví dụ: `git add file.txt` chọn một tệp; `git add .` chọn thay đổi bên dưới thư mục hiện tại.

---

## 🤔 Tại sao cần?
`git add` cho phép chọn phần thay đổi muốn đưa vào commit. Kiểm tra `git status` trước và sau lệnh để tránh chọn nhầm.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy nghĩ `git add` như chụp một bản của thay đổi vào khay chuẩn bị. Bản gốc vẫn ở trong thư mục; lần sửa tiếp theo chưa tự động cập nhật bản đã staged.

---

## 🖼 Sơ đồ
```text
`git add` chụp trạng thái tệp vào Staging Area, không di chuyển tệp:
[Working Directory: file.txt] -- git add file.txt --> [Staging Area: bản đã chọn]
          tệp vẫn còn ở đây                     bản gốc vẫn còn ở đây
```

---

## 🌎 Ví dụ thực tế
Sửa `app.js`, chạy `git add app.js`, rồi sửa thêm lần nữa. Chạy `git status`: phiên bản đầu đang staged, phần sửa sau vẫn chưa staged.

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
- `git add <file>`: Chọn một tệp cụ thể; kiểm tra tên tệp trước khi chạy.
- `git add .`: Chọn các thay đổi bên dưới thư mục hiện tại.
- `git add -A`: Chọn các thay đổi trong toàn bộ kho lưu trữ.
- `git add -p`: Chế độ tương tác từng khối thay đổi (patch) cho phép bạn duyệt từng dòng code.

---

## ⚠️ Sai lầm phổ biến
1. **Chạy `git add .` mà không kiểm tra trạng thái**:  Có thể chọn cả tệp hoặc phần sửa bạn chưa định đưa vào commit.
2. **Nghĩ `git add` đã tạo commit**:  Thay đổi mới chỉ nằm trong Staging Area; cần chạy `git commit` để tạo mốc lịch sử.
3. **Không đọc kỹ thông báo khi git add gặp file quá lớn**:  Cố gắng add các file video hoặc zip nặng khiến Git chạy chậm chạp.

---

## 🧪 Lab
1. Tạo tệp `app.js` với nội dung `console.log("Git Add Lab");`.
2. Chạy `git status` để thấy tệp trong danh sách Untracked.
3. Chạy lệnh `git add app.js` để đưa tệp vào Staging Area.
4. Chạy lại `git status` để xác nhận tệp nằm trong mục Changes to be committed.

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
- `git add` chụp thay đổi vào Staging Area; tệp gốc vẫn ở nguyên chỗ.
- Tệp mới được chọn bằng `git add` sẽ được theo dõi và staged.
- Xem `git status` để biết chính xác nội dung nào đã chọn.
