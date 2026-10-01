# Khái niệm nhánh (branch) trong Git

---

## 🎯 Mục tiêu
- Giải thích branch là một tên trỏ tới commit, không phải bản sao dự án.
- Nhận biết `main` chỉ là một tên nhánh phổ biến, không bảo đảm code đang chạy production.
- Dùng `git branch` để xem nhánh hiện có và nhánh đang chọn.

---

## 🧩 Từ khóa hôm nay

### Branch — nhánh
- **Nói dễ hiểu:** Một tên trỏ tới commit mới nhất của một dòng công việc.
- **Ví dụ:** Tạo `feature-cart` để làm tính năng giỏ hàng.
- **Đừng nhầm:** Nhánh không phải bản sao toàn bộ thư mục.

### Commit — mốc trong lịch sử
- **Nói dễ hiểu:** Một trạng thái dự án được lưu để xem lại.
- **Ví dụ:** Commit lưu phiên bản giỏ hàng vừa hoàn thành.
- **Đừng nhầm:** Nhánh trỏ tới commit; commit không phải nhánh.

### `main` — tên nhánh thường dùng
- **Nói dễ hiểu:** Nhiều dự án dùng `main` làm nhánh mặc định hoặc nhánh tích hợp.
- **Ví dụ:** Người mới clone dự án có thể bắt đầu ở `main`.
- **Đừng nhầm:** Tên `main` không tự bảo đảm nội dung đã sẵn sàng phát hành.

---

## 📖 Định nghĩa
Branch (nhánh) là một tên nhẹ trỏ tới một commit trong lịch sử. Khi bạn tạo commit mới trên nhánh đang chọn, Git thường cập nhật tên nhánh đó để trỏ tới commit mới. Các thao tác viết lại lịch sử cũng có thể đổi vị trí con trỏ. Tạo nhánh mới không sao chép toàn bộ tệp dự án.

---

## 🤔 Tại sao cần?
Nhánh cho phép bạn làm tính năng hoặc thử ý tưởng mà không trộn ngay vào công việc chung. Đồng đội có thể tiếp tục làm trên nhánh khác. Khi phần việc đã sẵn sàng, nhóm sẽ xem xét cách nhập thay đổi vào nhánh tích hợp.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy coi commit là các mốc trên bản đồ, còn branch là một tấm nhãn đặt lên một mốc. Tạo branch mới nghĩa là đặt thêm một nhãn tại commit hiện tại. Nhãn mới và nhãn cũ có thể trỏ cùng một mốc lúc đầu; sau này, commit trên một nhánh có thể làm nhãn đó trỏ sang mốc mới.

---

## 🖼 Sơ đồ
```text
Lịch sử commit:  C1 ◄── C2 ◄── C3
                       ▲      ▲
                       │      └── main
                       └───────── feature-cart

Khi vừa tạo feature-cart, hai nhánh có thể cùng trỏ vào C2.
```

---

## 🌎 Ví dụ thực tế
Nhóm làm website trường dùng `main` làm nhánh tích hợp. An tạo `feature-chat` để viết màn hình chat, còn Bình tiếp tục sửa trang thông tin trên nhánh khác. Nhánh giúp nhóm tách các mốc công việc; tên `main` là quy ước của nhóm chứ Git không kiểm tra xem nội dung đó có đang chạy trên website hay không.

---

## 💻 Command
```bash
git branch
git branch feature-cart
git branch
```

---

## 🔍 Giải thích command
- `git branch`: Liệt kê nhánh cục bộ; dấu `*` đứng trước nhánh đang chọn.
- `git branch feature-cart`: Tạo một nhánh mới tại commit hiện tại nhưng vẫn ở nhánh cũ.
- Chạy lại `git branch` để xác nhận nhánh mới xuất hiện và dấu `*` chưa chuyển.

---

## ⚠️ Sai lầm phổ biến
1. **Tưởng tạo nhánh là nhân đôi thư mục:** Git tạo thêm một tên trỏ tới commit.
2. **Tưởng `main` luôn là bản production:** Nhóm tự quy định vai trò của từng nhánh.
3. **Tưởng `git branch tên` tự chuyển sang nhánh mới:** Lệnh này chỉ tạo tên nhánh; chuyển nhánh học ở bài sau.

---

## 🧪 Lab
1. Chạy `git branch` và ghi lại nhánh có dấu `*`.
2. Tạo nhánh `feature-cart` bằng `git branch feature-cart`.
3. Chạy `git branch` lần nữa.
4. Xác nhận `feature-cart` xuất hiện nhưng dấu `*` vẫn ở nhánh ban đầu.

---

## 💡 Hint
> Nếu bạn chỉ muốn tạo nhánh mà chưa đổi chỗ làm việc, dùng `git branch <tên-nhánh>`.

---

## ✅ Validation
- Danh sách có nhánh `feature-cart`.
- Dấu `*` vẫn đứng trước nhánh đang làm việc ban đầu.

---

## ❓ Quiz
Trả lời các câu hỏi để kiểm tra bạn đã hiểu nhánh là gì và lệnh tạo nhánh làm gì.

---

## 🔥 Challenge
Tạo thêm nhánh `experiment`. Dùng `git branch` để xác nhận bạn đang ở nhánh nào, rồi giải thích vì sao tạo nhánh không tự chuyển bạn sang đó.

---

## 📚 Tổng kết
- Branch là một tên trỏ tới commit, không phải bản sao thư mục.
- `git branch <tên>` tạo nhánh tại commit hiện tại nhưng không chuyển nhánh.
- `main` là tên phổ biến; vai trò của nó do nhóm quyết định.
