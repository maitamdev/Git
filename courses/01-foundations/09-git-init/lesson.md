# Khởi tạo kho chứa với git init

---

## 🎯 Mục tiêu
- Dùng `git init` để bắt đầu quản lý một thư mục bằng Git.
- Kiểm tra Git đã tạo repository nhưng chưa lưu commit đầu tiên.
- Nhận ra tên nhánh ban đầu có thể phụ thuộc cấu hình.

---

## 🧩 Từ khóa hôm nay

### `git init` — bắt đầu repository
- **Nói dễ hiểu:** Lệnh tạo dữ liệu nội bộ để Git bắt đầu quản lý thư mục hiện tại.
- **Ví dụ:** Chạy `git init` trong thư mục bài tập trước khi lưu các mốc thay đổi.
- **Đừng nhầm:** Lệnh này chưa thêm tệp và chưa tạo commit.

### Initial branch — nhánh ban đầu
- **Nói dễ hiểu:** Tên Git chuẩn bị dùng làm điểm bắt đầu cho dòng lịch sử mới.
- **Ví dụ:** Tên thường gặp là `main`, nhưng có thể đặt tên khác theo cấu hình.
- **Đừng nhầm:** `git init` không phải lúc nào cũng đặt tên `main`; tên mặc định phụ thuộc cấu hình.

### Untracked — chưa được Git theo dõi
- **Nói dễ hiểu:** Tệp nằm trong thư mục dự án nhưng Git chưa được yêu cầu theo dõi nó.
- **Ví dụ:** README mới tạo có thể hiện là untracked khi chạy `git status`.
- **Đừng nhầm:** Untracked không có nghĩa tệp bị xóa; tệp vẫn nằm trong thư mục và có thể được chọn sau.

### First commit — mốc đầu tiên
- **Nói dễ hiểu:** Commit đầu tiên bạn chủ động tạo sau khi khởi tạo repository.
- **Ví dụ:** Sau khi chọn những tệp cần lưu, bạn có thể tạo mốc “Tạo README”.
- **Đừng nhầm:** `git init` chỉ chuẩn bị repository; chọn tệp và tạo commit sẽ học ở các bài sau.

---

## 📖 Định nghĩa
`git init` bắt đầu quản lý thư mục hiện tại bằng Git và tạo dữ liệu nội bộ trong `.git`. Các tệp có sẵn vẫn ở đó, nhưng chưa tự được lưu vào lịch sử. Git chuẩn bị một nhánh ban đầu; tên của nhánh phụ thuộc cấu hình. Bạn cần chọn tệp và tạo commit riêng để lưu mốc đầu tiên.

---

## 🤔 Tại sao cần?
Thư mục mới chưa có lịch sử Git. `git init` chuẩn bị thư mục để Git có thể theo dõi thay đổi; sau đó bạn sẽ chọn tệp và tạo commit ở bài tiếp theo.

---

## 🧠 Mental Model (Mô hình tư duy)
`git init` giống như mở một cuốn sổ lịch sử mới cho thư mục. Lệnh tạo phần dữ liệu Git; nó chưa tự ghi các tệp vào commit.

---

## 🖼 Sơ đồ
```text
Trước khi chạy git init:                Sau khi chạy git init:
my-project/                              my-project/
├── app.js                               ├── .git/  <── (Vừa được tạo ra!)
└── style.css                            ├── app.js
(Thư mục thường)                         (Git sẵn sàng theo dõi)
                                         Chưa có commit nào
```

---

## 🌎 Ví dụ thực tế
Bạn có thư mục `bai-tap`. Mở terminal tại đó và chạy `git init`, rồi chạy `git status`. Git đã khởi tạo repository, nhưng chưa có commit; tệp mới có thể được báo là untracked.

---

## 💻 Command
```bash
git init
git init -b main
git status
```

---

## 🔍 Giải thích command
- `git init`: Khởi tạo repository trong thư mục hiện tại; lệnh không tự thêm tệp vào commit.
- `git init -b main`: Trên phiên bản Git hỗ trợ tùy chọn này, đặt tên nhánh ban đầu là `main` cho repository mới.
- `git status`: Kiểm tra Git đã nhận repository và xem trạng thái tệp.

---

## ⚠️ Sai lầm phổ biến
1. **Chạy lệnh ở sai thư mục**: Kiểm tra terminal đang mở tại thư mục dự án trước khi khởi tạo.
2. **Tưởng init đã lưu tệp vào lịch sử**: Bạn còn phải thêm tệp và tạo commit ở bài sau.
3. **Tạo repository lồng nhau không chủ ý**: Tránh chạy `git init` sâu bên trong repository khác.

---

## 🧪 Lab
1. Trong terminal mô phỏng, chạy `git init` tại thư mục dự án đang dùng. Nếu hiện thông báo repository đã được khởi tạo trước đó, đó là kết quả bình thường.
2. Chạy `git status`; xác nhận Git nhận repository và xem tệp nào còn untracked.
3. Khi tạo repository mới trên máy thật và muốn chọn `main` ngay từ đầu, dùng `git init -b main` thay cho `git init` nếu phiên bản Git hỗ trợ.

---

## 💡 Hint
> Trước khi chạy init, kiểm tra terminal đang ở đúng thư mục dự án.

---

## ✅ Validation
- `git status` chạy được trong thư mục vừa khởi tạo và báo chưa có commit.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để kiểm tra hiểu biết về lệnh git init.

---

## 🔥 Challenge
Khởi tạo repository trong một thư mục thực hành và giải thích vì sao `git status` chưa thể hiện commit nào.

---

## 📚 Tổng kết
- `git init` tạo dữ liệu Git để bắt đầu quản lý thư mục; chạy lại trong repository thường không xóa tệp.
- Tệp có sẵn không tự được thêm vào lịch sử.
- Dùng `git status` để kiểm tra repository sau khi khởi tạo.
