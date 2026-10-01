# Staging Area (Vùng chuẩn bị)

---

## 🎯 Mục tiêu
- Giải thích Staging Area là nơi chọn thay đổi cho commit kế tiếp.
- Dùng `git add` để chọn một tệp.
- Dùng `git status` để xác nhận lựa chọn.

---

## 🧩 Từ khóa hôm nay

### Staging Area — vùng chuẩn bị
- **Nói dễ hiểu:** Chỗ bạn chọn phiên bản thay đổi sẽ đi vào commit kế tiếp.
- **Ví dụ:** Thêm `README.md` vào vùng này trước khi lưu mốc.
- **Đừng nhầm:** Thay đổi đang ở đây chưa phải commit.

### Index — tên Git dùng cho vùng chuẩn bị
- **Nói dễ hiểu:** Git gọi dữ liệu chuẩn bị cho commit là index.
- **Ví dụ:** `git status` liệt kê tệp ở “Changes to be committed”.
- **Đừng nhầm:** Trong bài cơ bản, index và Staging Area chỉ cùng một khái niệm.

### Staged — đã được chọn cho commit
- **Nói dễ hiểu:** Phiên bản hiện tại của tệp đã được đưa vào vùng chuẩn bị.
- **Ví dụ:** Chạy `git add README.md`, rồi xem lại bằng `git status`.
- **Đừng nhầm:** Nếu sửa tệp lần nữa, sửa đổi mới chưa tự được staged.

---

## 📖 Định nghĩa
Staging Area là vùng bạn chọn các thay đổi sẽ đi vào commit kế tiếp. Git lưu thông tin vùng này trong tệp nội bộ `.git/index`, vì vậy tài liệu kỹ thuật cũng gọi nó là index. Dùng `git status` để xem thay đổi nào đã được chọn.

---

## 🤔 Tại sao cần?
Nếu sửa nhiều tệp, Staging Area cho phép chọn tệp đã sẵn sàng và để phần việc còn dở cho lần sau.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy nghĩ Staging Area như danh sách thay đổi bạn đã chọn cho commit tiếp theo.

---

## 🖼 Sơ đồ
```text
Quy trình đóng gói có chọn lọc:
[Working Directory]                [Staging Area]                 [Commit History]
├── auth.js (đã sửa) ──git add──►  auth.js (staged)  ──git commit──► Commit #1: feat: auth
├── api.js  (đã sửa) ───────────►  (chưa add)
└── temp.txt (nháp)  ───────────►  (chưa add)
```

---

## 🌎 Ví dụ thực tế
Bạn sửa `auth.js` và `style.css`, nhưng chỉ hoàn tất `auth.js`. Chạy `git add auth.js`; tệp kia chưa được chọn cho commit.

---

## 💻 Command
```bash
git status
git add <file>
git restore --staged <file>
```

---

## 🔍 Giải thích command
- `git status`: Kiểm tra tệp đã staged và thay đổi chưa staged.
- `git add <file>`: Đưa nội dung hiện tại của tệp tin từ Working Directory vào Staging Area.
- `git restore --staged <file>`: Rút tệp tin ra khỏi Staging Area trở lại Working Directory mà không làm mất nội dung code.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ `git add` đã tạo commit**:  Lệnh này chỉ chọn thay đổi; cần `git commit` để lưu mốc.
2. **Sửa tệp sau khi đã add mà không kiểm tra lại**:  Phần sửa mới chưa được staged cho tới khi bạn add lại.
3. **Không xem lại những gì đã chọn**:  Chạy `git status` trước khi commit.

---

## 🧪 Lab
1. Tạo tệp `app.js` và thêm vào nội dung `console.log("Staging lab");`.
2. Chạy lệnh `git add app.js` để đưa tệp vào Staging Area.
3. Chạy `git status` và quan sát tệp `app.js` nằm dưới tiêu đề Changes to be committed.

---

## 💡 Hint
> Chỉ những thay đổi nằm trong Staging Area mới được ghi vào commit tiếp theo.

---

## ✅ Validation
- Kiểm tra `git status` hiển thị tệp tin trong Changes to be committed.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để đánh giá sự am hiểu về Staging Area.

---

## 🔥 Challenge
Giải thích điều gì xảy ra nếu bạn sửa tiếp tệp app.js sau khi đã chạy lệnh git add app.js.

---

## 📚 Tổng kết
- Staging Area là nơi chọn thay đổi cho commit kế tiếp.
- `git add <file>` chọn tệp; sửa tiếp thì cần add lại.
- `git status` cho biết những gì đang chờ commit.
