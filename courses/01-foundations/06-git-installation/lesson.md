# Cài đặt Git và chọn terminal

---

## 🎯 Mục tiêu
- Tìm hướng dẫn cài Git phù hợp với hệ điều hành của mình.
- Mở terminal trên máy thật và kiểm tra Git bằng `git --version`.
- Phân biệt terminal mô phỏng trong khóa học với Git cài trên máy cá nhân.

---

## 🧩 Từ khóa hôm nay

### Terminal — cửa sổ nhập lệnh
- **Nói dễ hiểu:** Ứng dụng cho phép bạn gõ lệnh để yêu cầu máy tính làm việc.
- **Ví dụ:** PowerShell trên Windows hoặc Terminal trên macOS/Linux.
- **Đừng nhầm:** Terminal nhận lệnh; Git là chương trình được gọi từ terminal.

### CLI (Command-Line Interface) — giao diện dòng lệnh
- **Nói dễ hiểu:** Cách điều khiển chương trình bằng cách nhập câu lệnh thay vì chỉ bấm nút.
- **Ví dụ:** Gõ `git --version` trong terminal để yêu cầu Git in phiên bản.
- **Đừng nhầm:** CLI là cách tương tác; nó không phải một terminal riêng hay một tài khoản.

### Git Bash — terminal đi kèm Git for Windows
- **Nói dễ hiểu:** Ứng dụng trên Windows cung cấp giao diện dòng lệnh quen thuộc cho Git.
- **Ví dụ:** Mở Git Bash rồi gõ một lệnh Git.
- **Đừng nhầm:** Bạn không bắt buộc dùng Git Bash; PowerShell cũng chạy Git khi cài đặt đã cấu hình đúng.

### PATH — nơi hệ điều hành tìm chương trình
- **Nói dễ hiểu:** Thiết lập giúp terminal tìm được chương trình khi bạn gõ tên lệnh.
- **Ví dụ:** Nếu terminal không nhận `git`, Git có thể chưa cài hoặc chưa được tìm thấy qua PATH.
- **Đừng nhầm:** PATH không phải thư mục dự án và không chứa lịch sử Git.

---

## 🤔 Tại sao cần?
Trước khi dùng Git trên máy của mình, bạn cần cài chương trình và mở được nó từ terminal. Nếu `git --version` in ra phiên bản, terminal đã gọi được Git. Nếu lệnh báo không nhận diện, bạn biết cần kiểm tra cài đặt hoặc PATH trước khi học các lệnh khác.

---

## 📖 Định nghĩa
Cài Git nghĩa là đưa chương trình Git vào máy để terminal có thể chạy lệnh `git`. Hướng dẫn chính thức nằm tại [git-scm.com/install](https://git-scm.com/install); chọn Windows, macOS hoặc Linux rồi làm theo bước dành cho hệ điều hành của bạn. Sau khi cài, mở một terminal mới và chạy `git --version` để kiểm tra.

---

## 🧠 Mental Model (Mô hình tư duy)
Git là chương trình; terminal là nơi bạn yêu cầu chương trình chạy. PATH giống danh sách địa chỉ giúp hệ điều hành tìm chương trình Git khi bạn gõ lệnh.

---

## 🖼 Sơ đồ
```text
Bạn nhập lệnh trong terminal
          │
          ▼
Hệ điều hành tìm chương trình Git qua PATH
          │
          ▼
Git chạy và in kết quả về terminal
```

---

## 🌎 Ví dụ thực tế
Trên Windows, cài Git for Windows rồi mở PowerShell mới. Trên macOS hoặc Linux, làm theo lựa chọn cài đặt của hệ điều hành trên trang chính thức. Chạy `git --version`: nếu có dòng phiên bản, Git đã chạy được trong terminal bạn vừa dùng.

---

## 💻 Command
```bash
git --version
```

---

## 🔍 Giải thích command
`git --version` in phiên bản của Git đang chạy. Trong terminal máy thật, kết quả kiểm tra Git đã cài trên máy đó; trong terminal mô phỏng của Git Academy, kết quả chỉ nói về môi trường mô phỏng và không cài Git vào máy cá nhân.

---

## ⚠️ Sai lầm phổ biến
1. **Cài Git nhưng tiếp tục dùng terminal cũ:** Mở terminal mới rồi chạy lại lệnh kiểm tra.
2. **Tưởng bắt buộc phải dùng Git Bash:** PowerShell cũng dùng được nếu Git for Windows đã được thêm vào PATH.
3. **Nghĩ terminal mô phỏng đã cài Git lên máy thật:** Mô phỏng chỉ giúp luyện lệnh; cài đặt thật cần làm trên hệ điều hành của bạn.

---

## 🧪 Lab
1. Xác định máy bạn đang dùng Windows, macOS hay Linux.
2. Mở [hướng dẫn cài Git chính thức](https://git-scm.com/install), chọn hệ điều hành và làm theo các bước cài đặt.
3. Mở terminal mới trên máy thật, chạy `git --version` và ghi lại kết quả.
4. Nếu báo không nhận diện lệnh, kiểm tra Git đã cài xong chưa, rồi mở terminal mới trước khi đổi PATH.

---

## 💡 Hint
Nếu lệnh không chạy sau khi cài, hãy mở terminal mới trước. Trong terminal mô phỏng, kết quả chỉ xác nhận môi trường học đang mô phỏng Git.

---

## ✅ Validation
- Trên máy thật, terminal bạn chọn in ra phiên bản Git mà không báo lỗi.
- Nói đúng rằng Git Bash là một lựa chọn trên Windows, không phải lựa chọn duy nhất.

---

## ❓ Quiz
Trả lời các câu hỏi sau. Khi sai, đọc lời giải thích rồi thử lại.

---

## 🔥 Challenge
Nếu dùng Windows, mở PowerShell và Git Bash rồi chạy `git --version` ở cả hai. Nêu terminal nào bạn muốn dùng cho các bài sau.

---

## 📚 Tổng kết
- Cài Git trên máy thật rồi mở terminal mới.
- `git --version` kiểm tra chương trình Git mà terminal đang gọi.
- Git Bash là một lựa chọn; PowerShell cũng chạy được Git khi PATH đã đúng.
