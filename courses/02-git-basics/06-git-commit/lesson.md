# Lưu một mốc bằng `git commit`

---

## 🎯 Mục tiêu
- Tạo commit từ thay đổi đã staged.
- Viết lời nhắn ngắn bằng `git commit -m`.
- Phân biệt commit trên máy với việc gửi commit lên dịch vụ trực tuyến.

---

## 🧩 Từ khóa hôm nay

### Commit — mốc lưu trong lịch sử
- **Nói dễ hiểu:** Bản ghi lưu trạng thái đã chọn trong Staging Area.
- **Ví dụ:** Sau khi chọn tệp, tạo commit để lưu một mốc.
- **Đừng nhầm:** Commit thông thường lấy nội dung đã staged.

### Staged — đã chọn cho commit
- **Nói dễ hiểu:** Nội dung đã được đưa vào Staging Area.
- **Ví dụ:** `git status` liệt kê `main.js` trong “Changes to be committed”.
- **Đừng nhầm:** Staged chưa phải commit.

### Commit message — lời nhắn của mốc
- **Nói dễ hiểu:** Câu ngắn mô tả thay đổi chính của commit.
- **Ví dụ:** `git commit -m "docs: add setup guide"`.
- **Đừng nhầm:** Message giúp người đọc; nó không mô tả hết mọi dòng code.

---

## 📖 Định nghĩa
`git commit` ghi các thay đổi đã chọn trong Staging Area thành một mốc trong lịch sử Git. Cờ `-m` cho phép thêm lời nhắn. Commit được lưu trong repository trên máy; lệnh này chưa tự gửi commit lên GitHub.

---

## 🤔 Tại sao cần?
Commit chia công việc thành các mốc có thể xem lại. Một mốc nhỏ, tập trung thường dễ hiểu và dễ kiểm tra hơn một commit gom nhiều việc không liên quan.

---

## 🧠 Mental Model (Mô hình tư duy)
`git add` chọn nội dung trước; `git commit` ghi lựa chọn đó thành một mốc trong lịch sử.

---

## 🖼 Sơ đồ
```text
Tệp đang sửa ──git add──► Staging Area ──git commit──► Commit lưu trên máy
                                                         │
                                                  git push (bài sau)
                                                         ▼
                                                       GitHub
```

---

## 🌎 Ví dụ thực tế
Bạn sửa `main.js`, chạy `git add main.js`, rồi tạo mốc bằng `git commit -m "feat: add main page"`. Commit đã lưu trên máy; muốn chia sẻ lên dịch vụ từ xa thì cần bước push học sau.

---

## 💻 Command
```bash
git status
git add main.js
git commit -m "feat: initialize main app"
git log --oneline
```

---

## 🔍 Giải thích command
- `git status`: Kiểm tra thay đổi trước khi commit.
- `git add main.js`: Đưa trạng thái hiện tại của tệp vào Staging Area.
- `git commit -m "<thông-điệp>"`: Tạo commit từ thay đổi đã staged, kèm lời nhắn.
- `git log --oneline`: Xem các commit đã tạo dưới dạng gọn.

---

## ⚠️ Sai lầm phổ biến
1. **Thông điệp quá chung chung**: “update” không nói rõ thay đổi gì.
2. **Quên stage tệp**: Commit chỉ lấy nội dung đã staged; kiểm tra bằng `git status` trước khi commit.
3. **Nghĩ commit đã lên mạng**: Commit nằm trong repository trên máy cho tới khi push.

---

## 🧪 Lab
1. Tạo hoặc chỉnh sửa tệp `main.js` để có thay đổi cần lưu.
2. Chạy `git status` để xem thay đổi.
3. Chạy `git add main.js`.
4. Chạy lại `git status`; xác nhận `main.js` nằm trong “Changes to be committed”.
5. Chạy `git commit -m "feat: initialize main app"`.
6. Chạy `git log --oneline` để thấy commit vừa tạo. Trong repository mới, đây là commit đầu tiên; nếu đã có lịch sử, đây là commit mới tiếp theo.

---

## 💡 Hint
> Nếu Git báo “nothing to commit”, hãy kiểm tra xem tệp có thay đổi và đã staged chưa.

---

## ✅ Validation
- `git status` xác nhận thay đổi đã staged trước khi commit.
- `git log --oneline` hiển thị commit với đúng lời nhắn.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để kiểm tra cách tạo commit từ thay đổi đã staged.

---

## 🔥 Challenge
Tạo commit cho một thay đổi nhỏ rồi giải thích vì sao commit vẫn xem được ở máy dù chưa push lên máy chủ.

---

## 📚 Tổng kết
- `git commit` lưu thay đổi đã staged thành một mốc trong lịch sử.
- `-m` thêm lời nhắn cho commit.
- Commit trên máy chưa tự được push lên GitHub.
