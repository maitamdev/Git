# Bỏ qua tệp chưa cần đưa vào Git bằng `.gitignore`

---

## 🎯 Mục tiêu
- Tạo quy tắc đơn giản để Git bỏ qua tệp chưa được theo dõi.
- Dùng `git check-ignore -v` để tìm quy tắc khớp với một tệp.
- Nhận biết `.gitignore` không ảnh hưởng tệp đã tracked hay xóa bí mật khỏi lịch sử cũ.

---

## 🧩 Từ khóa hôm nay

### `.gitignore` — danh sách mẫu cần bỏ qua
- **Nói dễ hiểu:** Tệp cấu hình để Git bỏ qua một số đường dẫn chưa được theo dõi.
- **Ví dụ:** Ghi `*.log` để bỏ qua các tệp log mới.
- **Đừng nhầm:** `.gitignore` không xóa tệp trên máy.

### Pattern — mẫu tên cần khớp
- **Nói dễ hiểu:** Quy tắc tên giúp Git nhận ra tệp nào cần bỏ qua.
- **Ví dụ:** `*.log` khớp tệp kết thúc bằng `.log`; `node_modules/` khớp thư mục cùng tên.
- **Đừng nhầm:** Mẫu chỉ khớp đúng nội dung và vị trí đã viết.

### Tracked — tệp Git đã theo dõi
- **Nói dễ hiểu:** Tệp đã được đưa vào lịch sử hoặc vùng chuẩn bị.
- **Ví dụ:** Thêm `local.env` vào `.gitignore` không làm Git ngừng báo các sửa đổi của tệp đó.
- **Đừng nhầm:** Bỏ qua tệp chưa tracked không xóa bí mật từng lưu trong commit cũ.

### `git check-ignore` — tìm quy tắc khớp
- **Nói dễ hiểu:** Lệnh cho biết quy tắc nào trong `.gitignore` khiến Git bỏ qua một đường dẫn.
- **Ví dụ:** `git check-ignore -v dist/cache.log` chỉ ra tệp quy tắc, số dòng và pattern đã khớp.
- **Đừng nhầm:** Lệnh này giúp kiểm tra nguyên nhân; nó không sửa hoặc xóa tệp.

---

## 📖 Định nghĩa
`.gitignore` là tệp văn bản chứa các mẫu để Git bỏ qua những đường dẫn chưa được theo dõi khi xem hoặc thêm thay đổi thông thường. Ví dụ, `*.log` bỏ qua tệp log; `node_modules/` bỏ qua thư mục phụ thuộc được cài tự động. Git vẫn giữ tệp trên máy. Quy tắc trong `.gitignore` cũng cần được commit thì đồng đội mới nhận được.

---

## 🤔 Tại sao cần?
Dự án thường sinh ra tệp log, file build hoặc thư viện tải về mà không cần đưa vào lịch sử. Bỏ qua chúng giúp danh sách thay đổi gọn hơn. Với tệp chứa mật khẩu, `.gitignore` chỉ giúp tránh thêm nhầm tệp mới; nếu bí mật đã commit, hãy báo người phụ trách và thay bí mật đó.

---

## 🧠 Mental Model (Mô hình tư duy)
Coi `.gitignore` là tấm ghi chú cho Git: “Nếu gặp tệp mới khớp mẫu này, đừng đưa nó vào danh sách thay đổi.” Nó không khóa tệp, không xóa tệp và không che các tệp Git đã theo dõi từ trước.

---

## 🖼 Sơ đồ
```text
Tệp mới khớp mẫu .gitignore ──► bị ẩn khỏi danh sách Untracked
Tệp mới không khớp mẫu       ──► hiện trong git status
Tệp đã tracked               ──► vẫn được Git theo dõi
```

---

## 🌎 Ví dụ thực tế
Sau khi chạy ứng dụng, thư mục dự án có thể xuất hiện các tệp `debug.log` hoặc `error.log`. Thêm mẫu `*.log` vào `.gitignore` để các log mới không làm danh sách thay đổi bị rối. Trước khi commit, vẫn đọc `git status` để chắc rằng những tệp cần lưu không bị bỏ qua nhầm.

---

## 💻 Command
Tạo hoặc mở `.gitignore` bằng trình sửa tệp của bài học và ghi vào đó:
```text
*.log
node_modules/
```
Sau đó kiểm tra quy tắc với một tệp cụ thể:
```bash
git status
git check-ignore -v debug.log
```

---

## 🔍 Giải thích command
- `git status`: Xem thay đổi Git đang theo dõi và tệp mới chưa bị bỏ qua.
- `git check-ignore -v debug.log`: Cho biết `debug.log` có bị bỏ qua không; tùy chọn `-v` hiển thị tệp quy tắc, số dòng và mẫu khớp.
- Trong simulator của bài học, `git check-ignore -v` hỗ trợ các mẫu cơ bản `*.đuôi` và `thư_mục/` trong `.gitignore` ở thư mục gốc.

---

## ⚠️ Sai lầm phổ biến
1. **Tưởng `.gitignore` xóa tệp**: Tệp vẫn còn trên máy; Git chỉ không liệt kê tệp mới khớp quy tắc.
2. **Tưởng thêm tệp đã tracked vào danh sách là đủ**: Git vẫn theo dõi thay đổi của tệp đó; cần xử lý việc theo dõi riêng.
3. **Tưởng mật khẩu đã commit được bảo vệ**: `.gitignore` không xóa commit cũ; hãy thay bí mật đã lộ và nhờ người có kinh nghiệm xử lý lịch sử.

---

## 🧪 Lab
1. Tạo tệp `debug.log` có nội dung bất kỳ.
2. Chạy `git status`; xác nhận `debug.log` đang Untracked.
3. Tạo tệp `.gitignore` bằng trình sửa tệp, ghi một dòng `*.log`, rồi lưu.
4. Chạy lại `git status`; xác nhận `debug.log` không còn hiện trong danh sách Untracked.
5. Chạy `git check-ignore -v debug.log` và đọc mẫu đã khớp.

---

## 💡 Hint
> Gõ mẫu vào chính tệp `.gitignore`, mỗi quy tắc trên một dòng; đừng chạy mẫu như một lệnh terminal.

---

## ✅ Validation
- `debug.log` vẫn còn trong danh sách tệp của dự án nhưng không hiện như tệp Untracked.
- `git check-ignore -v debug.log` chỉ ra mẫu `*.log` trong `.gitignore`.

---

## ❓ Quiz
Trả lời các câu hỏi để kiểm tra bạn có thể chọn mẫu phù hợp và hiểu giới hạn của `.gitignore`.

---

## 🔥 Challenge
Tạo thêm `notes.txt` và `server.log`. Chỉ bỏ qua tệp log; dùng `git status` giải thích vì sao `notes.txt` vẫn hiện còn `server.log` thì không.

---

## 📚 Tổng kết
- `.gitignore` bỏ qua các đường dẫn chưa được theo dõi khớp với mẫu.
- `git check-ignore -v <tệp>` giúp tìm quy tắc đang khớp.
- Tệp đã tracked và bí mật trong commit cũ cần xử lý riêng.
