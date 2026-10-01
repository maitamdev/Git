# Cấu hình danh tính Git Config

---

## 🎯 Mục tiêu
- Đặt `user.name` và `user.email` để Git ghi thông tin vào commit mới.
- Phân biệt cấu hình cho tài khoản của mình với cấu hình riêng của một repository.
- Xem lại cấu hình Git đang áp dụng trên máy.

---

## 🧩 Từ khóa hôm nay

### `git config` — lệnh xem và đặt cấu hình
- **Nói dễ hiểu:** Lệnh quản lý các lựa chọn mà Git dùng khi hoạt động.
- **Ví dụ:** `git config --global user.name "An Nguyen"` đặt tên dùng chung cho các repository của bạn.
- **Đừng nhầm:** Cấu hình Git không phải mật khẩu đăng nhập GitHub.

### `user.name` — tên ghi trong commit
- **Nói dễ hiểu:** Tên Git gắn vào commit do bạn tạo.
- **Ví dụ:** Commit có thể hiện tên “An Nguyen”.
- **Đừng nhầm:** Đây là thông tin do người dùng cấu hình, không phải bằng chứng xác thực danh tính.

### `user.email` — email ghi trong commit
- **Nói dễ hiểu:** Địa chỉ email Git gắn vào commit do bạn tạo.
- **Ví dụ:** Commit chứa tên và email cấu hình tại thời điểm tạo.
- **Đừng nhầm:** Email này không tự đăng nhập hoặc cấp quyền trên GitHub.

### `--global` — cấu hình cho tài khoản máy tính
- **Nói dễ hiểu:** Áp dụng giá trị cho các repository bạn dùng dưới tài khoản máy tính này.
- **Ví dụ:** Đặt tên một lần để dùng trong nhiều dự án cá nhân.
- **Đừng nhầm:** Global không có nghĩa là chia sẻ cấu hình lên Internet.

### `--local` và `--system` — phạm vi hẹp hơn hoặc rộng hơn
- **Nói dễ hiểu:** `--local` chỉ áp dụng cho repository hiện tại; `--system` áp dụng cho mọi người dùng trên máy.
- **Ví dụ:** Dùng `--local` nếu một dự án cần tên tác giả riêng.
- **Đừng nhầm:** Giá trị ở repository thường ghi đè giá trị global; system là mức toàn máy.

---

## 📖 Định nghĩa
`git config` xem hoặc thay đổi các giá trị Git sử dụng. Hai giá trị thường cần đặt trước khi tạo commit là `user.name` và `user.email`; Git ghi chúng vào thông tin tác giả của commit. Cấu hình có các phạm vi: system cho máy, global cho tài khoản máy tính và local cho repository hiện tại. Giá trị local thường ưu tiên hơn global.

---

## 🤔 Tại sao cần?
Khi tạo commit, Git ghi thông tin tác giả vào mốc đó. Cấu hình giúp bạn đặt trước tên và email sẽ dùng. Đây là nhãn trong lịch sử dự án, không phải tài khoản hay mật khẩu đăng nhập.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy nghĩ mỗi commit như một dòng trong nhật ký dự án. `user.name` và `user.email` là thông tin tác giả được ghi kèm dòng đó.

---

## 🖼 Sơ đồ
```text
Máy tính           → --system (mọi người dùng trên máy)
Tài khoản máy bạn  → --global (mặc định cho bạn)
Repository này     → --local (chỉ dự án hiện tại)

Nếu cùng một mục được đặt nhiều lần, giá trị local thường được ưu tiên.
```

---

## 🌎 Ví dụ thực tế
Bạn dùng email cá nhân làm mặc định cho bài tập. Một dự án riêng có thể đặt email khác bằng `--local`; giá trị đó chỉ áp dụng trong repository ấy.

---

## 💻 Command
```bash
git config --global user.name "Nguyen Van A"
git config --global user.email "vana@example.com"
git config --list
```

---

## 🔍 Giải thích command
- `git config --global user.name "Student Name"`: Đặt tên mặc định cho commit trong các repository của tài khoản máy tính này.
- `git config --global user.email "student@example.com"`: Đặt email mặc định sẽ được ghi vào commit.
- `git config --list`: Xem các giá trị cấu hình Git đang có.

---

## ⚠️ Sai lầm phổ biến
1. **Nhầm email tác giả với mật khẩu**: `user.email` không cấp quyền đăng nhập GitHub.
2. **Dùng cấu hình local khi chưa ở trong repository**: Dùng `--global` để đặt mặc định cho mình.
3. **Không xem lại giá trị đã đặt**: Chạy `git config --list` để kiểm tra.

---

## 🧪 Lab
1. Chạy lệnh đầu với tên của bạn thay cho `Nguyen Van A`.
2. Chạy lệnh thứ hai với email bạn muốn ghi vào commit.
3. Chạy `git config --list` và kiểm tra hai giá trị.

---

## 💡 Hint
> Dùng `--global` để đặt giá trị mặc định cho các repository của tài khoản máy tính này.

---

## ✅ Validation
- `git config --list` hiển thị đúng `user.name` và `user.email` bạn vừa đặt.

---

## ❓ Quiz
Hãy thực hiện bài trắc nghiệm sau về cách sử dụng lệnh git config.

---

## 🔥 Challenge
Nêu thứ tự ưu tiên ghi đè giữa 3 cấp độ: --system, --global và --local.

---

## 📚 Tổng kết
- `user.name` và `user.email` là thông tin tác giả được ghi trong commit mới.
- `--global` đặt giá trị mặc định cho tài khoản máy tính của bạn.
- `git config --list` giúp kiểm tra các giá trị đang có.
