# Lưu snapshot với git commit

---

## 🎯 Mục tiêu
- Tạo một commit từ những thay đổi đã staged.
- Viết lời nhắn ngắn mô tả thay đổi bằng `git commit -m`.
- Phân biệt commit trên máy với việc gửi commit lên GitHub.

---

## 🧩 Từ khóa hôm nay

### Commit — mốc lưu trong lịch sử
- **Nói dễ hiểu:** Bản ghi lưu trạng thái đã chọn trong Staging Area.
- **Ví dụ:** Tạo commit sau khi chọn các tệp sẽ đưa vào mốc.
- **Đừng nhầm:** Commit thông thường chỉ lấy phần đã staged.

### Commit message — lời nhắn của mốc
- **Nói dễ hiểu:** Câu ngắn mô tả lý do hoặc nội dung chính của commit.
- **Ví dụ:** `git commit -m "docs: add setup guide"`.
- **Đừng nhầm:** Message giúp người đọc; nó không mô tả hết mọi dòng code.

### `-a` — rút gọn cho tệp đã theo dõi
- **Nói dễ hiểu:** Với `git commit -a`, Git tự chọn các tệp tracked đã sửa hoặc xóa.
- **Ví dụ:** Dùng cho thay đổi của tệp cũ đã được theo dõi.
- **Đừng nhầm:** Cờ này không tự đưa tệp mới untracked vào commit.

---

## 📖 Định nghĩa
`git commit` ghi các thay đổi đã chọn trong Staging Area thành một mốc trong lịch sử Git. Bạn có thể thêm lời nhắn bằng `-m`. Commit được lưu trong repository trên máy; nó chưa tự gửi lên GitHub.

---

## 🤔 Tại sao cần?
Commit giúp bạn chia công việc thành các mốc có thể xem lại. Một mốc nhỏ, tập trung thường dễ hiểu và dễ kiểm tra hơn một commit gom nhiều việc không liên quan.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy nghĩ commit như một mốc trong nhật ký dự án. `git add` chọn nội dung trước; `git commit` ghi lựa chọn đó thành mốc.

---

## 🖼 Sơ đồ
```text
Tệp đang sửa ──git add──► Staging Area ──git commit──► Commit mới trên máy
                                                    └──git push──► GitHub (bài sau)
```

---

## 🌎 Ví dụ thực tế
Bạn sửa `main.js`, xem `git status`, rồi chạy `git add main.js` để chọn tệp. Sau `git commit -m "feat: add main page"`, kiểm tra mốc mới bằng `git log --oneline`. Commit này vẫn đang ở máy bạn cho tới khi push.

---

## 💻 Command
```bash
git commit -m "feat: your commit message"
git commit -am "fix: quick fix"
```

---

## 🔍 Giải thích command
- `git commit -m "<thông-điệp>"`: Tạo một commit mới từ các tệp tin đã nằm trong Staging Area kèm thông điệp mô tả tóm tắt ngắn gọn.
- `git commit -am "<thông-điệp>"`: Phím tắt tự động stage tất cả các tệp Modified và tạo commit mà không cần chạy git add trước (không áp dụng cho tệp Untracked).

---

## ⚠️ Sai lầm phổ biến
1. **Thông điệp commit vô nghĩa**:  Viết những câu như "fix", "update", "asdfgh" khiến đồng nghiệp và chính bạn sau này không thể hiểu commit đó làm gì.
2. **Commit quá lớn**: Gom nhiều việc không liên quan làm mốc khó hiểu và khó xem lại.
3. **Nghĩ commit đã lên mạng**: Commit được lưu trên máy; muốn chia sẻ cần push sau này.

---

## 🧪 Lab
1. Tạo hoặc chỉnh sửa tệp `main.js` với nội dung mới.
2. Đưa tệp vào Staging Area bằng lệnh `git add main.js`.
3. Tạo commit đầu tiên bằng câu lệnh `git commit -m "feat: initialize main app"`.
4. Kiểm tra lại bằng `git log --oneline` để thấy commit mới sinh ra.

---

## 💡 Hint
> Một commit tốt nên tập trung vào một nhiệm vụ duy nhất và có thông điệp rõ ràng.

---

## ✅ Validation
- Kiểm tra `git log` có xuất hiện commit với đúng thông điệp đã nhập.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để kiểm tra hiểu biết sâu sắc về câu lệnh git commit.

---

## 🔥 Challenge
Tạo một commit cho một thay đổi nhỏ rồi giải thích vì sao nó chưa xuất hiện trên GitHub.

---

## 📚 Tổng kết
- `git commit` lưu thay đổi đã staged thành một mốc trong lịch sử.
- `-m` thêm lời nhắn cho commit.
- Commit trên máy chưa tự được push lên GitHub.
