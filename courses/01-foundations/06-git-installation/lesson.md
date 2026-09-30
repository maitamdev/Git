# Cài đặt & Môi trường Git

---

## 🎯 Mục tiêu
- Nắm bắt các phương thức cài đặt Git trên các hệ điều hành phổ biến: Windows, macOS, Linux.
- Hiểu vai trò của Git Bash trên môi trường Windows.
- Làm quen với các tùy chọn cấu hình dòng kết thúc tệp tin (crlf vs lf) khi cài đặt.

---

## 📖 Định nghĩa
> Cài đặt Git là quy trình thiết lập bộ công cụ dòng lệnh Git (Git CLI) lên hệ điều hành máy tính cá nhân. Trên hệ điều hành Windows, gói cài đặt Git for Windows cung cấp công cụ Git Bash - một môi trường giả lập shell Unix cho phép lập trình viên thực thi các lệnh bash quen thuộc. Quá trình cài đặt bao gồm việc thiết lập biến môi trường PATH để câu lệnh `git` có thể được gọi từ bất kỳ cửa sổ dòng lệnh nào trên hệ thống.

---

## 🤔 Tại sao cần?
Một môi trường Git được cài đặt chuẩn xác là nền móng bảo đảm các công cụ soạn thảo như Visual Studio Code, JetBrains IDE hay terminal có thể nhận diện và thao tác trơn tru với kho lưu trữ. Nếu cài đặt sai tùy chọn kết thúc dòng (Line Ending) giữa Windows (CRLF) và Linux/macOS (LF), dự án của bạn sẽ liên tục gặp cảnh báo giả mạo rằng toàn bộ file bị sửa đổi dù bạn chưa hề gõ một chữ nào.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung việc cài đặt Git giống như việc lắp đặt một bộ đồ nghề cơ khí đa năng vào cốp xe của bạn. Bộ đồ nghề này bao gồm đủ các loại cờ-lê, mỏ-lết và tuốc-nơ-vít tiêu chuẩn quốc tế. Dù chiếc xe của bạn mang thương hiệu gì (Windows, macOS hay Linux), chỉ cần có bộ đồ nghề này bên mình, bạn đều có thể xử lý và bảo trì chiếc xe theo cùng một tiêu chuẩn kỹ thuật thống nhất.

---

## 🖼 Sơ đồ
```text
Hệ điều hành:
┌───────────────────────────────────────────────┐
│ Windows / macOS / Linux                       │
│   ┌─────────────────────────────────────────┐ │
│   │ Biến môi trường PATH                    │ │
│   │   └─► /usr/bin/git  hoặc  git.exe        │ │
│   └─────────────────────────────────────────┘ │
│                     ▲                         │
│                     │ (gọi lệnh)              │
│       [Terminal / VS Code / Git Bash]         │
└───────────────────────────────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Một lập trình viên sử dụng máy tính Windows tham gia vào dự án phát triển backend chạy trên máy chủ Ubuntu Linux. Khi cài đặt Git, lập trình viên chọn tùy chọn `core.autocrlf = true`. Khi tải code từ Linux về Windows, Git tự động chuyển đổi ký tự xuống dòng sang CRLF để hiển thị đúng trong Notepad, và khi commit đẩy lên server, Git tự động chuyển đổi ngược lại thành LF. Nhờ đó, các kỹ sư dùng máy tính khác nhau không bao giờ bị xung đột định dạng dòng vô cớ, giúp quy trình tích hợp liên tục CI/CD diễn ra hoàn toàn êm đẹp mà không bị gián đoạn kiểm thử.

---

## 💻 Command
```bash
git --version
git config --system --list
```

---

## 🔍 Giải thích command
- `git --version`: Xác nhận công cụ Git đã được cài đặt thành công và đường dẫn thực thi đã được tích hợp chuẩn xác vào biến môi trường PATH của hệ điều hành.
- `git config --system --list`: Hiển thị toàn bộ các thiết lập cấu hình ở cấp độ toàn hệ thống máy tính, áp dụng chung cho mọi tài khoản người dùng đăng nhập.

---

## ⚠️ Sai lầm phổ biến
1. **Không tích hợp Git vào biến môi trường PATH**:  Khiến cho terminal thông báo lỗi `command not found
2. **Chọn sai cấu hình xuống dòng**:  Dẫn đến việc Git báo toàn bộ dòng code bị thay đổi định dạng ký tự trắng ẩn.
3. **Sợ hãi giao diện dòng lệnh (CLI)**:  Cố gắng tìm phần mềm đồ họa ngay từ đầu thay vì rèn luyện bản chất câu lệnh.

---

## 🧪 Lab
1. Mở terminal và gõ lệnh `git --version` để kiểm tra môi trường.
2. Xác nhận thông điệp trả về có dạng `git version 2.x.x`.
3. Thử nghiệm gọi lệnh `git` không có đối số để xem gợi ý sử dụng cơ bản.

---

## 💡 Hint
> Giao diện dòng lệnh (CLI) là cách nhanh nhất và chính xác nhất để điều khiển Git.

---

## ✅ Validation
- Lệnh `git --version` thực thi thành công trả về mã thoát 0.

---

## ❓ Quiz
Hãy làm bài trắc nghiệm dưới đây để kiểm tra hiểu biết về cài đặt môi trường Git.

---

## 🔥 Challenge
Giải thích sự khác nhau giữa ký tự xuống dòng CRLF trên Windows và LF trên Unix/Linux.

---

## 📚 Tổng kết
- Cài đặt Git CLI là bước đầu tiên để sử dụng Git trên bất kỳ hệ điều hành nào.
- Git for Windows cung cấp môi trường Git Bash mô phỏng chuẩn dòng lệnh Unix.
- Cần chú ý thiết lập chuẩn xuống dòng để tránh xung đột định dạng khi làm việc nhóm đa nền tảng.
