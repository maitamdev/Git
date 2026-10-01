# Đưa một tệp vào vùng chuẩn bị bằng `git add`

---

## 🎯 Mục tiêu
- Dùng `git add <tên-tệp>` để chọn một tệp.
- Xác nhận lựa chọn bằng `git status`.
- Giải thích được rằng add chưa tạo commit.

---

## 🧩 Từ khóa hôm nay

### `git add` — chọn nội dung cho commit
- **Nói dễ hiểu:** Đưa trạng thái hiện tại của tệp vào vùng chuẩn bị.
- **Ví dụ:** `git add README.md` chọn riêng tệp README.
- **Đừng nhầm:** `git add` chưa tạo commit.

### Path — đường dẫn tệp
- **Nói dễ hiểu:** Tên cho Git biết bạn muốn chọn tệp hoặc thư mục nào.
- **Ví dụ:** `README.md` là đường dẫn tới một tệp trong dự án.
- **Đừng nhầm:** Chọn một tệp khác với chọn toàn bộ dự án.

### Untracked — tệp Git chưa theo dõi
- **Nói dễ hiểu:** Tệp mới mà Git chưa được yêu cầu đưa vào lịch sử.
- **Ví dụ:** `note.txt` mới thường hiện là Untracked trong `git status`.
- **Đừng nhầm:** Sau khi chạy `git add note.txt`, tệp được theo dõi và staged; chưa có commit nào được tạo.

### Staged — nội dung đã được chọn
- **Nói dễ hiểu:** Phiên bản nội dung được đưa vào vùng chuẩn bị cho commit kế tiếp.
- **Ví dụ:** Chạy `git add app.js`, rồi sửa `app.js` thêm lần nữa; phiên bản đã staged và phần sửa mới là hai trạng thái khác nhau.
- **Đừng nhầm:** Sửa tệp sau khi add không tự cập nhật bản staged; cần chạy `git add app.js` lại.

---

## 📖 Định nghĩa
`git add <tên-tệp>` ghi nhận trạng thái hiện tại của tệp vào Staging Area để chuẩn bị cho commit kế tiếp. Tệp vẫn nằm nguyên trong thư mục dự án. Hôm nay ta chọn một tệp cụ thể để kiểm soát rõ nội dung sắp đưa vào commit.

---

## 🤔 Tại sao cần?
Sau khi sửa hoặc tạo tệp, bạn chọn thay đổi muốn lưu trước. Xem `git status` trước và sau lệnh để biết Git đang thấy gì và xác nhận tệp đã vào vùng chuẩn bị.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy nghĩ `git add` như chụp trạng thái hiện tại của một tệp vào khay chuẩn bị. Bản gốc vẫn nằm ở thư mục dự án; nếu bạn sửa tiếp, phần sửa mới cần được chọn lại.

---

## 🖼 Sơ đồ
```text
Working Directory                    Staging Area
app.js (bản đang sửa) --git add-->   app.js (trạng thái được chọn)
       vẫn nằm tại đây
```

---

## 🌎 Ví dụ thực tế
Tạo `app.js`, chạy `git add app.js`, rồi xem `git status`. Git vẫn để nguyên `app.js` trong thư mục dự án, đồng thời báo tệp đã staged.

---

## 💻 Command
```bash
git status
git add app.js
git status
```

---

## 🔍 Giải thích command
- `git status`: Xem tệp đang untracked, đã staged hay còn thay đổi chưa staged.
- `git add app.js`: Chọn trạng thái hiện tại của `app.js` cho commit kế tiếp.
- Chạy `git status` lần nữa để xác nhận kết quả.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ `git add` đã tạo commit**: Thay đổi mới chỉ nằm trong vùng chuẩn bị; cần `git commit` để tạo mốc.
2. **Sửa tệp sau khi đã add nhưng quên add lại**: Phần sửa mới chưa được chọn.
3. **Gõ nhầm đường dẫn**: Kiểm tra tên tệp trong `git status` nếu Git báo không tìm thấy.

---

## 🧪 Lab
1. Tạo tệp `app.js` với nội dung `console.log("Git Add Lab");`.
2. Chạy `git status` và nhận ra `app.js` đang Untracked.
3. Chạy `git add app.js`.
4. Chạy lại `git status`; xác nhận `app.js` nằm trong “Changes to be committed”.

---

## 💡 Hint
> Gõ `git add <tên-tệp>` để chọn đúng một tệp; xem lại bằng `git status`.

---

## ✅ Validation
- `git status` hiển thị `app.js` trong “Changes to be committed”.
- Tệp `app.js` vẫn còn trong danh sách tệp của dự án.

---

## ❓ Quiz
Hãy trả lời các câu hỏi dưới đây để củng cố kỹ năng dùng `git add` cho một tệp.

---

## 🔥 Challenge
Tạo `note-a.txt` và `note-b.txt`. Chỉ chạy `git add note-a.txt`; dùng `git status` để giải thích tệp nào đã staged và tệp nào vẫn untracked.

---

## 📚 Tổng kết
- `git add <tên-tệp>` chọn trạng thái hiện tại của một tệp.
- Tệp vẫn nằm trong thư mục dự án.
- `git status` xác nhận thay đổi đã staged; commit là bước khác.
