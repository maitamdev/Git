# Vòng đời tệp tin trong Git

---

## 🎯 Mục tiêu
- Nhận ra bốn trạng thái cơ bản: Untracked, Unmodified, Modified và Staged.
- Dự đoán trạng thái sau `git add` và `git commit`.
- Hiểu vì sao sửa tệp sau khi add có thể tạo trạng thái `MM`.

---

## 🧩 Từ khóa hôm nay

### Untracked — chưa được theo dõi
- **Nói dễ hiểu:** Tệp mới mà Git chưa được yêu cầu quản lý.
- **Ví dụ:** Tạo `draft.txt` rồi xem `git status`.
- **Đừng nhầm:** Untracked không có nghĩa tệp bị xóa.

### Unmodified — chưa có thay đổi mới
- **Nói dễ hiểu:** Tệp tracked đang giống phiên bản đã lưu gần nhất.
- **Ví dụ:** Sau commit, một tệp không sửa thường ở trạng thái này.
- **Đừng nhầm:** Điều đó không có nghĩa tệp chưa từng bị sửa trong quá khứ.

### Modified — đã sửa nhưng chưa staged
- **Nói dễ hiểu:** Tệp tracked khác bản đã lưu, nhưng sửa đổi mới chưa được chọn.
- **Ví dụ:** Sửa một dòng trong README sau commit.
- **Đừng nhầm:** Lưu trong trình soạn thảo chưa tạo commit.

### Staged — đã chuẩn bị cho commit
- **Nói dễ hiểu:** Phiên bản tệp hiện tại đã được chọn cho commit kế tiếp.
- **Ví dụ:** Chạy `git add README.md`.
- **Đừng nhầm:** Sửa tệp thêm lần nữa sẽ tạo phần unstaged mới.

---

## 📖 Định nghĩa
Tệp mới chưa được Git theo dõi là Untracked. Tệp đã tracked có thể đang khớp mốc lưu (Unmodified), đã sửa trong thư mục làm việc (Modified) hoặc đã chọn cho commit (Staged). Nếu sửa thêm sau khi `git add`, tệp có thể vừa có phần Staged vừa có phần Modified.

---

## 🤔 Tại sao cần?
Hiểu các trạng thái giúp bạn biết `git add` đã chọn phiên bản nào và vì sao một tệp có thể hiện cả thay đổi staged lẫn unstaged trong `git status`.

---

## 🧠 Mental Model (Mô hình tư duy)
Theo dõi hai bản: tệp đang sửa và phiên bản đã chọn bằng `git add`. Nếu sửa tệp sau khi add, Git giữ phần đã staged và báo thêm phần sửa mới chưa staged.

---

## 🖼 Sơ đồ
```text
Untracked ──git add──► Staged ──git commit──► Unmodified
                           ▲                       │
                           │ git add               │ sửa tệp
                           │                       ▼
                           └────────────────── Modified

Sửa tệp thêm sau git add: vẫn còn phần Staged + có thêm phần Modified.
```

---

## 🌎 Ví dụ thực tế
Tạo `user.js`: tệp là Untracked. Chạy `git add user.js`: tệp là Staged. Commit xong, nếu không sửa thêm, tệp trở thành Unmodified. Sửa tiếp thì trạng thái là Modified.

---

## 💻 Command
```bash
git status -s
git add <file>
git commit -m "test: add status example"
```

---

## 🔍 Giải thích command
- `git status -s`: Hiển thị mã trạng thái hai cột phản ánh chính xác vị trí của tệp trong cỗ máy trạng thái.
- `git add <file>`: Kích hoạt sự chuyển dịch trạng thái từ Untracked hoặc Modified sang Staged.
- `git commit -m "<message>"`: Ghi phần staged vào commit mới; nếu không sửa thêm, tệp trở thành Unmodified.

---

## ⚠️ Sai lầm phổ biến
1. **Tưởng tệp chỉ có một trạng thái**: Sửa thêm sau khi add sẽ để lại phần Staged và tạo phần Modified mới.
2. **Tưởng tệp Untracked sẽ được commit tự động**:  Git không bao giờ tự ý commit tệp chưa được add vào hệ thống theo dõi.
3. **Nhầm lẫn giữa tệp bị xóa (Deleted) và tệp Untracked**:  Tệp đã từng commit khi bị xóa sẽ ở trạng thái Tracked/Deleted chứ không phải Untracked.

---

## 🧪 Lab
1. Tạo tệp mới `status-test.txt` và kiểm tra trạng thái Untracked bằng `git status -s`.
2. Chạy `git add status-test.txt` và quan sát ký tự `A ` ở cột staged.
3. Commit tệp bằng `git commit -m "test: add status example"`; chạy `git status -s` để thấy không còn thay đổi chờ lưu.
4. Mở tệp sửa một dòng để quan sát ký tự ` M` (Modified) xuất hiện ở cột thứ hai.

---

## 💡 Hint
> Theo dõi sự thay đổi vị trí ký tự cột trái (Index) và cột phải (Working Tree).

---

## ✅ Validation
- Giải thích được sự biến đổi trạng thái qua các bước tạo, add, commit và sửa tệp.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để kiểm tra mức độ nắm bắt cỗ máy trạng thái Git.

---

## 🔥 Challenge
Mô tả tình huống làm xuất hiện ký tự `MM` trong kết quả của lệnh git status -s.

---

## 📚 Tổng kết
- Tệp tin trong Git gồm hai nhóm lớn: Tracked (được theo dõi) và Untracked (chưa theo dõi).
- Tệp Tracked thường đi từ Unmodified sang Modified, rồi Staged và về Unmodified sau commit.
- Nếu sửa lại sau khi stage, sẽ có cả thay đổi Staged và Modified.
