# Hoàn tác thay đổi Working Tree

---

## 🎯 Mục tiêu
- Sử dụng lệnh hiện đại `git restore <file>` để hủy bỏ các sửa đổi dở dang trong Working Tree.
- Sử dụng `git restore --staged <file>` để unstage tệp tin an toàn.
- Hiểu rõ sự nguy hiểm và tính không thể khôi phục khi hủy bỏ thay đổi chưa commit.

---

## 🧩 Từ khóa hôm nay

### `git restore <file>` — bỏ sửa đổi trong tệp
- **Nói dễ hiểu:** Khôi phục nội dung Working Tree về bản staged gần nhất.
- **Ví dụ:** Chạy `git restore README.md` để bỏ sửa đổi chưa staged.
- **Đừng nhầm:** Lệnh có thể làm mất sửa đổi chưa được lưu ở nơi khác.

### `git restore --staged` — bỏ chọn cho commit
- **Nói dễ hiểu:** Đưa phiên bản trong Staging Area về theo commit hiện tại.
- **Ví dụ:** `git restore --staged README.md` bỏ README khỏi vùng chuẩn bị.
- **Đừng nhầm:** Bản sửa trong Working Tree vẫn còn sau lệnh này.

### Discard — bỏ thay đổi
- **Nói dễ hiểu:** Xóa một phần sửa đổi thay vì giữ nó trong tệp hiện tại.
- **Ví dụ:** `git restore <file>` discard phần sửa chưa staged của tệp đó.
- **Đừng nhầm:** Đừng dùng nếu bạn còn cần phần sửa ấy.

---

## 📖 Định nghĩa
`git restore <file>` khôi phục tệp đang sửa về nội dung trong Staging Area. Nếu chưa stage thay đổi nào, đó thường là nội dung ở commit hiện tại. `git restore --staged <file>` bỏ phiên bản staged khỏi vùng chuẩn bị nhưng giữ nguyên tệp đang sửa.

---

## 🤔 Tại sao cần?
Bạn có thể bỏ phần sửa chưa staged của một tệp mà không đụng tới các tệp khác. Vì Git không giữ bản sửa chưa staged, hãy chắc chắn bạn không còn cần phần đó trước khi chạy lệnh.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung `git restore <file>` như thay nội dung một tệp bằng bản đã chọn trước đó. Nếu chưa staged, bản đã chọn thường giống commit hiện tại; nếu đã stage, lệnh giữ lại bản staged.

---

## 🖼 Sơ đồ
```text
git restore <file>:        Staging Area ──► Working Tree
git restore --staged:     HEAD ──────────► Staging Area
                           (Working Tree được giữ nguyên)
```

---

## 🌎 Ví dụ thực tế
Bạn sửa `payment.js` nhưng chưa chạy `git add`. Sau khi xem `git diff` và quyết định bỏ phần sửa đó, chạy `git restore payment.js`. Git chép lại nội dung đang staged vào tệp; nếu chưa stage lần nào, nội dung đó đến từ commit hiện tại.

---

## 💻 Command
```bash
git restore <file>
git restore .
git restore --staged <file>
```

---

## 🔍 Giải thích command
- `git restore <file>`: Khôi phục tệp tracked trong Working Tree về nội dung ở Staging Area.
- `git restore .`: Khôi phục các tệp tracked chưa staged trong thư mục hiện tại và thư mục con; không xóa tệp untracked.
- `git restore --staged <file>`: Đưa tệp trong Staging Area về theo HEAD, đồng thời giữ nguyên nội dung Working Tree.

---

## ⚠️ Sai lầm phổ biến
1. **Chạy restore khi còn cần phần sửa chưa staged**: Git sẽ thay nội dung hiện tại bằng bản staged; lưu phần cần giữ ở nơi khác trước.
2. **Nhầm lẫn giữa `git restore <file>` và `git restore --staged <file>`**:  Một đằng hủy bỏ nội dung trên ổ đĩa, một đằng chỉ rút khỏi khu vực chuẩn bị.
3. **Dùng `git restore .` mà chưa kiểm tra các tệp**: Lệnh có thể bỏ thay đổi của nhiều tệp tracked trong thư mục hiện tại.

---

## 🧪 Lab
1. Mở tệp `app.js` và thêm vào một dòng code lỗi cố ý.
2. Kiểm tra `git status` để thấy tệp ở trạng thái Modified.
3. Chạy lệnh `git restore app.js` để hủy bỏ thay đổi.
4. Kiểm tra lại nội dung tệp và chạy `git status` để xác nhận thay đổi đã được bỏ.

---

## 💡 Hint
> Trước khi chạy restore, dùng `git diff` để xem phần sửa sẽ bị bỏ.

---

## ✅ Validation
- Tệp trở về nội dung đang staged; nếu chưa staged thì là nội dung ở HEAD.

---

## ❓ Quiz
Hãy làm bài trắc nghiệm dưới đây về các thao tác hoàn tác với git restore.

---

## 🔥 Challenge
Sửa tệp, chạy `git add <tệp>`, rồi sửa tiếp tệp đó. Dùng `git diff` và `git diff --staged` để giải thích phần nào chưa staged và phần nào đã staged.

---

## 📚 Tổng kết
- `git restore <file>` thay nội dung Working Tree bằng phiên bản trong Staging Area.
- `git restore --staged <file>` đưa Staging Area về theo HEAD và giữ nguyên Working Tree.
- `git restore .` áp dụng với tệp tracked trong thư mục hiện tại; không xóa tệp untracked.
- Xem `git diff` trước khi bỏ thay đổi chưa staged.
