# Cấu hình danh tính Git Config

---

## 🎯 Mục tiêu
- Sử dụng thành thạo lệnh `git config` để thiết lập danh tính lập trình viên: user.name và user.email.
- Phân biệt rõ 3 cấp độ cấu hình: --system, --global, và --local.
- Hiểu tầm quan trọng của việc dùng đúng email đồng bộ với tài khoản GitHub để hiển thị đóng góp (contribution).

---

## 📖 Định nghĩa
> `git config` là câu lệnh thiết lập và truy vấn các biến cấu hình điều khiển giao diện và hành vi hoạt động của Git. Hai tham số quan trọng nhất bắt buộc phải cấu hình đầu tiên trên mọi máy tính mới là `user.name` (họ tên lập trình viên) và `user.email` (địa chỉ thư điện tử). Các thông tin này sẽ được gắn cố định vào mọi commit mà bạn tạo ra để xác định danh tính tác giả (author). Git hỗ trợ ba cấp độ cấu hình có độ ưu tiên tăng dần: system (toàn máy), global (toàn tài khoản người dùng), và local (riêng cho từng kho chứa cụ thể).

---

## 🤔 Tại sao cần?
Nếu không cấu hình `user.name` và `user.email`, Git sẽ từ chối không cho phép bạn tạo commit, hoặc sẽ tự động lấy tên tài khoản đăng nhập máy tính kèm địa chỉ hostname cục bộ kỳ quặc. Nghiêm trọng hơn, nếu bạn dùng email không khớp với tài khoản GitHub, toàn bộ commit bạn dày công đóng góp cho dự án sẽ không được ghi nhận biểu đồ đóng góp (xanh ô contribution graph) trên trang cá nhân GitHub của bạn.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung việc thiết lập `git config` giống như việc bạn khắc một con dấu mộc chữ ký cá nhân bằng đồng. Mỗi khi bạn ký kết một hợp đồng kinh tế (tạo một commit), bạn sẽ đóng con dấu mộc có tên và email của mình lên góc dưới văn bản. Mọi đối tác và thành viên trong dự án khi nhìn vào văn bản đó đều biết chính xác ai là người chịu trách nhiệm cho các điều khoản và thay đổi vừa thực hiện.

---

## 🖼 Sơ đồ
```text
Các cấp độ cấu hình Git (Ưu tiên từ dưới lên trên):
┌───────────────────────────────────────────────┐
│ --system: Cấu hình cho mọi người dùng trên PC │
└───────────────────────────────────────────────┘
                       ▲
┌───────────────────────────────────────────────┐
│ --global: Cấu hình cho tài khoản người dùng   │
└───────────────────────────────────────────────┘
                       ▲
┌───────────────────────────────────────────────┐
│ --local: Cấu hình riêng cho 1 repository này  │ (Độ ưu tiên cao nhất)
└───────────────────────────────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Kỹ sư Nguyễn Văn A sử dụng máy tính xách tay cá nhân để vừa làm việc cho công ty vừa tham gia dự án mã nguồn mở ngoài giờ. Ở cấp độ toàn cục (`--global`), kỹ sư thiết lập email cá nhân `anguyen@gmail.com`. Nhưng khi làm việc trong thư mục dự án của công ty, kỹ sư mở terminal tại kho chứa đó và cấu hình cục bộ (`--local`): `git config user.email "a.nguyen@company.vn"`. Khi đó, các commit trong dự án công ty sẽ mang danh tính email doanh nghiệp được xác thực, còn các dự án cá nhân khác trên cùng máy tính vẫn dùng email riêng tư mà không hề bị xung đột hay rò rỉ thông tin.

---

## 💻 Command
```bash
git config --global user.name "Nguyen Van A"
git config --global user.email "vana@example.com"
git config --list
```

---

## 🔍 Giải thích command
- `git config --global user.name "Tên Tác Giả"`: Thiết lập họ tên hiển thị của bạn cho toàn bộ các repository trên máy tính cá nhân.
- `git config --global user.email "email@domain.com"`: Thiết lập địa chỉ thư điện tử gắn chặt vào siêu dữ liệu của từng commit.
- `git config --list`: Liệt kê toàn bộ danh sách các thông số cấu hình Git đang có hiệu lực trên hệ thống.

---

## ⚠️ Sai lầm phổ biến
1. **Gõ sai địa chỉ email**:  Dùng email phụ hoặc sai chính tả khiến GitHub không nhận diện được tác giả và không tích điểm xanh trên trang cá nhân.
2. **Nghĩ git config là mật khẩu đăng nhập**:  `user.name` và `user.email` chỉ là chữ ký nhãn thông tin, không phải thông tin bảo mật hay mật khẩu tài khoản.
3. **Quên kiểm tra lại sau khi cấu hình**:  Không chạy `git config --list` để xác nhận lại thông tin đã lưu chính xác hay chưa.

---

## 🧪 Lab
1. Chạy lệnh `git config user.name "Student Name"` để cấu hình danh tính của bạn.
2. Chạy lệnh `git config user.email "student@git.academy"` để thiết lập địa chỉ thư điện tử.
3. Sử dụng `git config --list` để kiểm tra danh sách cấu hình và xác nhận kết quả.

---

## 💡 Hint
> Sử dụng cờ `--global` khi muốn áp dụng cấu hình cho mọi dự án trên máy.

---

## ✅ Validation
- Kiểm tra `git config user.name` và `user.email` trả về đúng chuỗi đã thiết lập.

---

## ❓ Quiz
Hãy thực hiện bài trắc nghiệm sau về cách sử dụng lệnh git config.

---

## 🔥 Challenge
Nêu thứ tự ưu tiên ghi đè giữa 3 cấp độ: --system, --global và --local.

---

## 📚 Tổng kết
- `git config` là câu lệnh thiết lập danh tính tác giả và hành vi của Git.
- `user.name` và `user.email` được nhúng vĩnh viễn vào siêu dữ liệu của mỗi commit.
- Thứ tự ưu tiên cấu hình tăng dần: System -> Global -> Local (Local ghi đè Global).
