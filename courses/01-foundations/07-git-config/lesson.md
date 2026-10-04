# Cấu hình danh tính Git bằng git config: Định danh tác giả chuyên nghiệp

---

## 🎯 Mục tiêu
- Thiết lập danh tính tác giả chuẩn mực (`user.name` và `user.email`) trước khi thực hiện commit đầu tiên.
- Thấu hiểu và làm chủ ba tầng phạm vi cấu hình của Git: `--system`, `--global` và `--local`.
- Nắm vững nguyên tắc ưu tiên ghi đè để linh hoạt chuyển đổi giữa dự án cá nhân và công việc công ty.

---

## 🧩 Từ khóa hôm nay

### `git config` — Lệnh quản trị cấu hình
- **Nói dễ hiểu:** Công cụ thiết lập và tùy biến mọi hành vi hoạt động của Git trên máy tính của bạn.
- **Ví dụ:** Bạn gõ `git config --global user.name "Nguyen Van A"` để khai báo tên mình cho toàn bộ dự án.
- **Đừng nhầm:** Cấu hình Git chỉ lưu cài đặt phần mềm; nó không phải là thao tác đăng nhập tài khoản đám mây.

### `user.name` — Chữ ký tên tác giả
- **Nói dễ hiểu:** Họ và tên mà Git sẽ tự động đóng dấu lên mọi mốc commit do bạn tạo ra.
- **Ví dụ:** Tên hiển thị trên lịch sử commit là "Hoàng Minh Tuấn".
- **Đừng nhầm:** Đây là nhãn định danh tác giả do bạn tự đặt; nó không thay thế cho tên đăng nhập tài khoản GitHub.

### `user.email` — Địa chỉ thư điện tử tác giả
- **Nói dễ hiểu:** Email liên hệ được gắn vĩnh viễn vào thông tin của từng commit trong lịch sử dự án.
- **Ví dụ:** Địa chỉ email gắn kèm commit để GitHub liên kết chính xác với hồ sơ cá nhân của bạn.
- **Đừng nhầm:** Email tác giả chỉ là dòng chữ ký thông tin; nó không chứa mật khẩu và không tự cấp quyền truy cập kho code.

### `--global` — Phạm vi người dùng máy tính
- **Nói dễ hiểu:** Cấp độ cấu hình áp dụng tự động cho toàn bộ các repository thuộc tài khoản người dùng hiện tại trên máy tính.
- **Ví dụ:** Đặt một lần cho laptop cá nhân để từ nay mọi bài tập tạo ra đều tự nhận tên của bạn.
- **Đừng nhầm:** Global chỉ có giá trị trên chiếc máy tính bạn đang ngồi, không hề đồng bộ cài đặt này lên đám mây.

### `--local` — Phạm vi riêng biệt từng dự án
- **Nói dễ hiểu:** Cấp độ cấu hình đặc quyền chỉ có hiệu lực bên trong duy nhất một repository cụ thể.
- **Ví dụ:** Dự án của công ty yêu cầu bạn phải dùng email doanh nghiệp thay vì email cá nhân.
- **Đừng nhầm:** Cấu hình local có mức độ ưu tiên cao nhất và sẽ ghi đè lên cấu hình global.

---

## 🤔 Tại sao cần?
Trong môi trường doanh nghiệp, lịch sử commit là bằng chứng rõ ràng nhất về trách nhiệm của từng kỹ sư. Nếu bạn không cấu hình danh tính, Git sẽ từ chối commit hoặc tự ý lấy tên tài khoản máy tính như `Admin` rất thiếu chuyên nghiệp. Đặc biệt khi bạn vừa làm việc công ty vừa tham gia dự án nguồn mở, việc làm chủ các phạm vi cấu hình giúp bạn không bao giờ bị lẫn lộn giữa email doanh nghiệp và email cá nhân.

---

## 📖 Định nghĩa
`git config` là lệnh quản trị các thiết lập vận hành của Git. Hai tham số quan trọng nhất là `user.name` và `user.email`, cấu thành chữ ký định danh gắn vào từng commit. Cấu hình được chia thành ba cấp độ: system cho toàn hệ thống, global cho tài khoản người dùng và local cho từng repository cụ thể.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy coi mỗi commit như một lá thư tay bạn gửi cho tương lai. `user.name` là tên người gửi và `user.email` là địa chỉ liên lạc ghi trên phong bì. Cấu hình `--global` giống như con dấu khắc sẵn tên bạn để đóng lên mọi phong bì; còn `--local` là chiếc tem đặc biệt riêng cho một đối tác quan trọng.

---

## 🖼 Sơ đồ
```text
Thứ tự ưu tiên ghi đè (Càng hẹp càng ưu tiên):
[--local: Thư mục dự án hiện tại] (Ưu tiên số 1 - Đè lên tất cả)
               ▲
[--global: Tài khoản máy của bạn] (Ưu tiên số 2 - Mặc định hàng ngày)
               ▲
[--system: Toàn bộ hệ điều hành] (Ưu tiên số 3 - Thiết lập chung)
```

---

## 🌎 Ví dụ thực tế
Kỹ sư Nam làm việc tại ngân hàng và dùng laptop cá nhân. Với các bài tập cá nhân, Nam cấu hình `--global` với email riêng. Nhưng khi làm việc trong dự án ngân hàng, Nam vào thư mục đó và gõ lệnh với cờ `--local` để dùng email doanh nghiệp. Mọi commit ở dự án ngân hàng đều mang danh tính công ty chuẩn mực mà không ảnh hưởng tới dự án khác.

---

## 💻 Command
```bash
git config --global user.name "Nguyen Van A"
git config --global user.email "vana@example.com"
git config --list
```

---

## 🔍 Giải thích command
- `git config --global user.name`: Thiết lập họ tên hiển thị của bạn trên mọi commit tạo ra trên chiếc máy tính này.
- `git config --global user.email`: Thiết lập địa chỉ email gắn vào siêu dữ liệu tác giả của commit.
- `git config --list`: In ra toàn bộ bảng danh sách các tham số cấu hình hiện hành để bạn kiểm tra và rà soát tính chính xác.

---

## ⚠️ Sai lầm phổ biến
1. **Lầm tưởng `user.email` là mật khẩu đăng nhập GitHub:** Đây chỉ là chữ ký định danh tác giả; việc xác thực đẩy code lên GitHub sử dụng cơ chế bảo mật hoàn toàn riêng biệt.
2. **Gõ nhầm lệnh cấu hình `--local` khi đang đứng ngoài kho chứa:** Cờ `--local` bắt buộc bạn phải đang đứng bên trong một thư mục đã khởi tạo Git, nếu không Git sẽ báo lỗi.
3. **Đặt tên hoặc email giả mạo, thiếu nghiêm túc:** Đi làm thực tế, commit mang tên biệt danh ngớ ngẩn sẽ bị từ chối ngay trong khâu duyệt mã nguồn của dự án.

---

## 🧪 Lab
1. Mở cửa sổ dòng lệnh và cấu hình tên hiển thị đầy đủ của bạn bằng lệnh `git config --global user.name`.
2. Cấu hình email chính thức của bạn bằng lệnh `git config --global user.email`.
3. Chạy `git config --list` và xác nhận rằng hai thông số trên đã xuất hiện chuẩn xác trong danh sách cấu hình.

---

## 💡 Hint
Hãy dùng địa chỉ email trùng với email bạn đăng ký tài khoản GitHub để sau này khi đẩy code lên mạng, GitHub sẽ tự động nhận diện và tính điểm hoạt động vào biểu đồ đóng góp của bạn.

---

## ✅ Validation
- Lệnh `git config --list` phản hồi chính xác tên và email mà bạn vừa cấu hình.
- Trình bày được thứ tự ưu tiên ghi đè giữa `--local`, `--global` và `--system`.
- Phân biệt rõ sự khác nhau giữa chữ ký commit và thông tin xác thực mật khẩu.

---

## ❓ Quiz
Thực hiện bài kiểm tra trắc nghiệm dưới đây để nắm vững quy tắc cấu hình danh tính trong Git. Đọc kỹ phân tích từ giảng viên.

---

## 🔥 Challenge
Hãy nêu kịch bản thực tế khi nào bạn bắt buộc phải dùng cờ `--local` thay vì `--global` và kiểm tra xem file cấu hình local được Git cất giấu ở đâu trong thư mục dự án.

---

## 📚 Tổng kết
- Cấu hình danh tính `user.name` và `user.email` là bước chuẩn bị bắt buộc trước khi tạo ra bất kỳ commit nào.
- Thứ tự ưu tiên cấu hình luôn tuân theo nguyên tắc: `--local` (dự án) đè lên `--global` (người dùng), `--global` đè lên `--system` (hệ thống).
- Sử dụng `git config --list` là biện pháp hữu hiệu nhất để kiểm tra môi trường trước khi bắt tay vào dự án mới.

