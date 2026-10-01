# So sánh khác biệt với git diff

---

## 🎯 Mục tiêu
- Đọc dấu `-` và `+` để nhận ra dòng cũ bị bỏ và dòng mới được thêm.
- Phân biệt `git diff` với `git diff --staged`.
- Xem lại thay đổi trước khi đưa vào commit.

---

## 🧩 Từ khóa hôm nay

### Diff — phần thay đổi giữa hai phiên bản
- **Nói dễ hiểu:** Bản so sánh cho biết dòng nào được thêm, bỏ hoặc sửa.
- **Ví dụ:** Diff cho thấy tiêu đề `Home` được đổi thành `Trang chủ`.
- **Đừng nhầm:** Diff trình bày thay đổi; nó không tạo commit.

### `git diff` — so sánh bản đang sửa
- **Nói dễ hiểu:** Mặc định, lệnh cho thấy thay đổi chưa staged.
- **Ví dụ:** Chạy `git diff` sau khi sửa một tệp tracked.
- **Đừng nhầm:** Lệnh thường không hiện thay đổi mới đã staged.

### `--staged` — xem phần đã chuẩn bị
- **Nói dễ hiểu:** Chọn xem khác biệt giữa vùng chuẩn bị và commit hiện tại.
- **Ví dụ:** Chạy `git diff --staged` trước khi commit.
- **Đừng nhầm:** Tùy chọn này không đưa thay đổi vào Staging Area.

### Hunk — một nhóm dòng thay đổi
- **Nói dễ hiểu:** Một đoạn trong diff gom các dòng gần nhau có thay đổi.
- **Ví dụ:** Một diff có thể có nhiều hunk nếu sửa hai vị trí xa nhau.
- **Đừng nhầm:** Hunk không phải một tệp hay một commit riêng.

---

## 📖 Định nghĩa
`git diff` hiển thị những dòng khác nhau giữa hai trạng thái của tệp. Dòng bắt đầu bằng `-` thuộc phiên bản cũ; dòng bắt đầu bằng `+` thuộc phiên bản mới. Màu sắc có thể khác nhau tùy terminal.

---

## 🤔 Tại sao cần?
Đọc diff trước khi commit giúp phát hiện sửa nhầm, dòng thử nghiệm còn sót hoặc phần thay đổi chưa định gửi.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy xem diff như bản đối chiếu hai phiên bản: dấu `-` chỉ dòng ở bản cũ, dấu `+` chỉ dòng ở bản mới.

---

## 🖼 Sơ đồ
```diff
-Hello
+Hello, world!
```
Trong kết quả thật, dòng `@@ -1,1 +1,1 @@` đánh dấu vị trí của một nhóm thay đổi (hunk); nó không phải nội dung tệp.

---

## 🌎 Ví dụ thực tế
Bạn đổi `Hello` thành `Hello, world!` trong `app.js`. Chạy `git diff`: dòng cũ có dấu `-`, dòng mới có dấu `+`. Đọc cả hai để xác nhận mình sửa đúng.

---

## 💻 Command
```bash
git diff
git diff --staged
```

---

## 🔍 Giải thích command
- `git diff`: So sánh sự khác biệt giữa Working Directory và Staging Area (những thay đổi chưa được add).
- `git diff --staged` (hoặc `--cached`): So sánh sự khác biệt giữa Staging Area và commit gần nhất tại HEAD (những thay đổi chuẩn bị commit).

---

## ⚠️ Sai lầm phổ biến
1. **Chạy git diff sau khi đã git add và tưởng code bị mất**:  Khi đã add vào Staging Area, bạn phải dùng `git diff --staged` mới xem được khác biệt.
2. **Nhầm dòng `@@ -1,1 +1,1 @@` với nội dung tệp**:  Đây là dấu vị trí của một nhóm thay đổi (hunk).
3. **Không đọc diff trước khi commit**:  Thói quen xấu dẫn đến việc commit cả mật khẩu hoặc các câu lệnh console.log thử nghiệm.

---

## 🧪 Lab
1. Chỉnh sửa một dòng code trong tệp `app.js` và lưu lại.
2. Chạy lệnh `git diff`; dòng cũ có dấu `-`, dòng mới có dấu `+`.
3. Chạy `git add app.js`, sau đó chạy lại `git diff` (phần vừa staged không còn hiện ở đây).
4. Chạy `git diff --staged` để thấy lại các dòng thay đổi đang nằm trong vùng chuẩn bị.

---

## 💡 Hint
> Nhớ quy tắc: `git diff` xem tệp chưa add; `git diff --staged` xem tệp đã add.

---

## ✅ Validation
- Đọc hiểu chính xác các dòng cộng trừ trong kết quả hiển thị của git diff.

---

## ❓ Quiz
Hãy làm bài trắc nghiệm sau về cách sử dụng câu lệnh so sánh git diff.

---

## 🔥 Challenge
Sau khi chạy `git add app.js`, giải thích vì sao `git diff` và `git diff --staged` cho kết quả khác nhau.

---

## 📚 Tổng kết
- `git diff` so sánh Working Directory với Staging Area (code chưa staged).
- `git diff --staged` so sánh Staging Area với HEAD (code chuẩn bị commit).
- Dấu `-` chỉ dòng ở bản cũ; dấu `+` chỉ dòng ở bản mới. Màu sắc chỉ là cách hiển thị.
