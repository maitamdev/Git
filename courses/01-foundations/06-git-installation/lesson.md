# Cài đặt & Môi trường Git

---

## 🎯 Mục tiêu
- Biết cần cài Git một lần trước khi dùng lệnh Git trên máy.
- Mở được terminal và kiểm tra Git bằng `git --version`.
- Biết Git Bash là một lựa chọn trên Windows, không phải GitHub.

---

## 🧩 Từ khóa hôm nay

### Terminal — cửa sổ nhập lệnh
- **Nói dễ hiểu:** Ứng dụng cho phép bạn gõ lệnh để yêu cầu máy tính làm việc.
- **Ví dụ:** PowerShell trên Windows hoặc Terminal trên macOS.
- **Đừng nhầm:** Terminal là nơi gõ lệnh; Git là một công cụ có thể chạy bên trong đó.

### Git CLI — bộ lệnh Git
- **Nói dễ hiểu:** Cách dùng Git bằng cách gõ lệnh thay vì chỉ bấm nút trong giao diện.
- **Ví dụ:** `git --version` hỏi Git đang cài phiên bản nào.
- **Đừng nhầm:** CLI là cách điều khiển công cụ; GitHub là dịch vụ trực tuyến riêng.

### Git Bash — terminal đi kèm Git for Windows
- **Nói dễ hiểu:** Một lựa chọn trên Windows cung cấp terminal và các lệnh Git quen thuộc.
- **Ví dụ:** Bạn mở Git Bash rồi chạy `git status`.
- **Đừng nhầm:** Bạn không bắt buộc phải dùng Git Bash; PowerShell cũng có thể chạy Git nếu Git đã cài đúng.

### PATH — danh sách nơi hệ điều hành tìm chương trình
- **Nói dễ hiểu:** Thiết lập giúp Windows tìm được lệnh `git` khi bạn gõ lệnh.
- **Ví dụ:** Nếu terminal báo không nhận ra `git`, Git có thể chưa cài xong hoặc chưa được thêm vào PATH.
- **Đừng nhầm:** PATH không phải thư mục dự án và không chứa lịch sử Git.

---

## 📖 Định nghĩa
Cài đặt Git là đưa công cụ Git vào máy để terminal có thể chạy lệnh `git`. Trên Windows, Git for Windows thường cung cấp Git Bash; bạn cũng có thể dùng PowerShell nếu lệnh Git đã có trong PATH. Sau khi cài, hãy chạy `git --version` để kiểm tra.

---

## 🤔 Tại sao cần?
Trước khi học lệnh Git, hãy kiểm tra máy đã chạy được Git chưa. Nếu `git --version` báo lỗi, bạn sẽ biết cần cài Git hoặc sửa cách terminal tìm chương trình.

---

## 🧠 Mental Model (Mô hình tư duy)
Git là một chương trình. Terminal là cửa sổ để bạn gõ lệnh gọi chương trình đó. `git --version` là câu hỏi kiểm tra xem lời gọi có thành công không.

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
Bạn vừa cài Git for Windows. Mở PowerShell và chạy `git --version`. Nếu màn hình in ra số phiên bản, bạn có thể tiếp tục học bằng PowerShell; nếu lệnh không được nhận diện, hãy kiểm tra cài đặt hoặc mở terminal mới.

---

## 💻 Command
```bash
git --version
```

---

## 🔍 Giải thích command
- `git --version`: Hiển thị phiên bản để xác nhận terminal chạy được Git.

---

## ⚠️ Sai lầm phổ biến
1. **Cài Git xong nhưng chưa mở terminal mới**: Mở terminal mới rồi thử lại lệnh.
2. **Tưởng bắt buộc phải dùng Git Bash**: PowerShell cũng chạy được Git for Windows.
3. **Nhầm terminal với Git**: Terminal nhận lệnh; Git là chương trình được gọi.

---

## 🧪 Lab
1. Mở PowerShell, Git Bash hoặc Terminal trên máy.
2. Chạy `git --version`.
3. Ghi lại kết quả. Nếu có lỗi, chép nguyên dòng lỗi để nhờ giảng viên hỗ trợ.

---

## 💡 Hint
> Nếu vừa cài Git mà terminal báo lỗi, hãy mở cửa sổ terminal mới rồi thử lại.

---

## ✅ Validation
- Terminal hiển thị phiên bản Git mà không báo lỗi.

---

## ❓ Quiz
Hãy làm bài trắc nghiệm dưới đây để kiểm tra hiểu biết về cài đặt môi trường Git.

---

## 🔥 Challenge
Mở cả PowerShell và Git Bash rồi kiểm tra Git trong mỗi terminal. Ghi lại kết quả.

---

## 📚 Tổng kết
- Cài Git trước khi dùng lệnh Git trong terminal.
- Dùng `git --version` để kiểm tra Git có chạy không.
- PowerShell và Git Bash đều có thể dùng với Git for Windows.
