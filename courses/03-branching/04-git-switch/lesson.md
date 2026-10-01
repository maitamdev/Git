# Chuyển nhánh bằng `git switch`

---

## 🎯 Mục tiêu
- Chuyển sang một nhánh có sẵn bằng `git switch <tên-nhánh>`.
- Tạo và chuyển sang nhánh mới bằng `git switch -c <tên-nhánh>`.
- Biết Git dừng nếu chuyển nhánh có thể ghi đè thay đổi chưa commit.

---

## 🧩 Từ khóa hôm nay

### `git switch` — chuyển nhánh
- **Nói dễ hiểu:** Chuyển vị trí làm việc sang một nhánh có sẵn.
- **Ví dụ:** `git switch main` quay về nhánh `main`.
- **Đừng nhầm:** Lệnh không tạo commit cho thay đổi của bạn.

### `-c` — tạo rồi chuyển
- **Nói dễ hiểu:** Tạo tên nhánh mới tại commit hiện tại rồi chuyển sang đó.
- **Ví dụ:** `git switch -c feature-user`.
- **Đừng nhầm:** Dùng `git branch feature-user` chỉ tạo tên, không chuyển.

### Thư mục làm việc
- **Nói dễ hiểu:** Các tệp bạn đang xem và sửa trong dự án.
- **Ví dụ:** Khi đổi nhánh, tệp tracked có thể cập nhật theo commit của nhánh mới.
- **Đừng nhầm:** Tệp untracked không liên quan thường vẫn ở lại; Git dừng nếu tệp sắp bị ghi đè.

---

## 📖 Định nghĩa
`git switch <tên-nhánh>` gắn HEAD vào nhánh có sẵn và cập nhật những tệp cần thiết để khớp với nhánh đó. Dùng `git switch -c <tên-mới>` để tạo nhánh tại commit hiện tại rồi chuyển sang đó. Nếu việc chuyển đi có thể ghi đè sửa đổi chưa commit, Git dừng để bảo vệ nội dung.

---

## 🤔 Tại sao cần?
Sau khi tạo nhánh, bạn cần chuyển sang đó để làm phần việc riêng. Chuyển về nhánh khác giúp kiểm tra trạng thái của nhánh đó. Git bảo vệ thay đổi cục bộ khi việc chuyển có thể ghi đè chúng; trước khi chuyển, hãy kiểm tra `git status` và quyết định commit hoặc giữ thay đổi lại.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy coi mỗi nhánh là một góc nhìn vào lịch sử dự án. `git switch` đổi góc nhìn hiện tại và cập nhật các tệp tracked cần thiết. Các sửa đổi không xung đột có thể được giữ lại; thay đổi có nguy cơ mất sẽ khiến Git từ chối chuyển.

---

## 🖼 Sơ đồ
```text
Trước: HEAD ──► main ──► Commit C3
                    feature-user ──► Commit C3

Lệnh: git switch feature-user

Sau:  HEAD ──► feature-user
      main vẫn trỏ tới Commit C3
```

---

## 🌎 Ví dụ thực tế
Trang tạo nhánh `feature-cart` để làm giao diện giỏ hàng. Trang dùng `git switch main` để xem nhánh tích hợp rồi `git switch feature-cart` để tiếp tục việc riêng. Nếu còn sửa đổi có thể bị nhánh đích ghi đè, Git sẽ báo dừng; Trang kiểm tra `git status` trước khi quyết định lưu hoặc giữ phần sửa.

---

## 💻 Command
```bash
git status
git switch <tên-nhánh>
git switch -c <tên-nhánh-mới>
```

---

## 🔍 Giải thích command
- `git status`: Kiểm tra nhánh hiện tại và thay đổi chưa commit.
- `git switch <tên-nhánh>`: Chuyển sang nhánh đã tồn tại.
- `git switch -c <tên-nhánh-mới>`: Tạo nhánh mới và chuyển sang đó ngay.

---

## ⚠️ Sai lầm phổ biến
1. **Quên `-c` khi tạo nhánh mới:** `git switch tên-mới` chỉ chuyển sang nhánh đã có.
2. **Cứ thấy Git từ chối chuyển là thử ép:** Kiểm tra thay đổi trước; đừng dùng tùy chọn bỏ thay đổi khi chưa hiểu hậu quả.
3. **Tưởng mọi sửa đổi luôn biến mất khi đổi nhánh:** Git có thể giữ sửa đổi không xung đột; nếu có nguy cơ ghi đè, Git dừng.

---

## 🧪 Lab
1. Chạy `git switch -c feature-user` để tạo và chuyển sang nhánh mới.
2. Chạy `git status`; xác nhận dòng đầu báo `On branch feature-user`.
3. Chạy `git switch main`, rồi kiểm tra bằng `git status`.
4. Chạy `git switch feature-user` để quay lại nhánh tính năng.

---

## 💡 Hint
> Dùng `git branch` để xem tên nhánh; dùng `git switch` để chuyển sang một tên trong danh sách.

---

## ✅ Validation
- `feature-user` xuất hiện trong `git branch`.
- `git status` lần lượt báo `feature-user`, `main`, rồi `feature-user`.

---

## ❓ Quiz
Trả lời các câu hỏi để kiểm tra thao tác tạo và chuyển nhánh.

---

## 🔥 Challenge
Trên `feature-user`, tạo tệp `feature-note.txt`, stage rồi commit. Chuyển về `main` và quan sát tệp không có trong snapshot của `main`; quay lại `feature-user` để thấy tệp ở đó.

---

## 📚 Tổng kết
- `git switch <tên>` chuyển sang nhánh đã có.
- `git switch -c <tên>` vừa tạo nhánh vừa chuyển sang đó.
- Kiểm tra thay đổi chưa commit trước khi chuyển để tránh bị ghi đè.
