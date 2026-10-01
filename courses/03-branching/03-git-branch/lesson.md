# Xem và tạo nhánh bằng `git branch`

---

## 🎯 Mục tiêu
- Dùng `git branch` để xem nhánh cục bộ.
- Dùng `git branch <tên>` để tạo nhánh mới.
- Đọc dấu `*` để nhận biết nhánh đang chọn.

---

## 🧩 Từ khóa hôm nay

### Danh sách nhánh
- **Nói dễ hiểu:** Các tên nhánh đang có trong repository trên máy bạn.
- **Ví dụ:** `git branch` có thể hiện `main` và `feature-cart`.
- **Đừng nhầm:** Đây là nhánh cục bộ, không tự liệt kê mọi nhánh remote.

### Dấu `*` — nhánh hiện tại
- **Nói dễ hiểu:** Dấu sao đứng trước tên nhánh đang được chọn.
- **Ví dụ:** `* main` nghĩa là hiện bạn đang ở `main`.
- **Đừng nhầm:** Tạo nhánh mới không tự chuyển dấu sao sang nhánh đó.

### `git branch <tên>` — tạo nhánh
- **Nói dễ hiểu:** Thêm một tên nhánh trỏ tới commit hiện tại.
- **Ví dụ:** `git branch feature-cart` tạo nhánh cho phần giỏ hàng.
- **Đừng nhầm:** Lệnh này không chuyển thư mục làm việc sang nhánh mới.

---

## 📖 Định nghĩa
Chạy `git branch` không kèm tên để xem các nhánh cục bộ. Thêm tên phía sau để tạo nhánh tại commit hiện tại. Lệnh tạo nhánh không thay đổi nhánh bạn đang làm việc; dấu `*` cho biết vị trí hiện tại. Bài này chỉ học xem và tạo; đổi tên hoặc xóa nhánh sẽ học ở bài riêng.

---

## 🤔 Tại sao cần?
Trước khi bắt đầu việc mới, bạn cần biết nhánh nào đã tồn tại và nhánh nào đang chọn. Tạo nhánh riêng giúp tách công việc mới. Xác nhận dấu `*` sau khi tạo để tránh tiếp tục sửa trên nhánh khác với dự định.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy nghĩ `git branch` như xem danh sách nhãn đặt trên các commit. Lệnh tạo nhánh chỉ thêm một nhãn mới tại commit đang chọn; nó chưa chuyển chỗ làm việc của bạn.

---

## 🖼 Sơ đồ
```text
Trước:  * main ──► Commit C2

Lệnh:   git branch feature-cart

Sau:      main ─────────┐
         * feature-cart ─┴──► Commit C2

Cả hai tên có thể trỏ cùng một commit; dấu * vẫn ở main.
```

---

## 🌎 Ví dụ thực tế
Bạn đang ở `main` và được giao làm giao diện giỏ hàng. Chạy `git branch feature-cart` để tạo nhánh cho phần việc. Sau lệnh này, chạy `git branch`: thấy cả hai tên nhưng dấu `*` vẫn ở `main`. Chuyển sang `feature-cart` là thao tác riêng ở bài tiếp theo.

---

## 💻 Command
```bash
git branch
git branch feature-cart
git branch
```

---

## 🔍 Giải thích command
- Lệnh đầu liệt kê nhánh hiện có.
- Lệnh thứ hai tạo nhánh `feature-cart` tại commit hiện tại.
- Lệnh cuối xác nhận tên nhánh mới và vị trí dấu `*`.

---

## ⚠️ Sai lầm phổ biến
1. **Tưởng `git branch tên` tự chuyển nhánh:** Kiểm tra dấu `*`; nó vẫn ở nhánh cũ.
2. **Tưởng mỗi branch là một bản sao tệp:** Lệnh chỉ tạo một tên tham chiếu tới commit.
3. **Tưởng `git branch` hiện tất cả nhánh trên GitHub:** Bài này chỉ xem danh sách nhánh cục bộ.

---

## 🧪 Lab
1. Chạy `git branch`; ghi lại nhánh có dấu `*`.
2. Chạy `git branch experiment`.
3. Chạy lại `git branch`.
4. Xác nhận `experiment` xuất hiện và dấu `*` vẫn ở nhánh ban đầu.

---

## 💡 Hint
> Chỉ tạo nhánh ở bài này; chưa cần chuyển, đổi tên hay xóa nhánh.

---

## ✅ Validation
- Danh sách có nhánh `experiment`.
- Dấu `*` đứng trước nhánh đang làm việc ban đầu.

---

## ❓ Quiz
Trả lời các câu hỏi để kiểm tra cách xem và tạo nhánh cục bộ.

---

## 🔥 Challenge
Tạo nhánh `feature-profile`. Chạy `git branch` và giải thích vì sao dấu `*` chưa chuyển tới nhánh mới.

---

## 📚 Tổng kết
- `git branch` liệt kê nhánh cục bộ.
- `git branch <tên>` tạo nhánh tại commit hiện tại.
- Dấu `*` đánh dấu nhánh đang chọn; tạo nhánh không đồng nghĩa chuyển nhánh.
