# Lưu một mốc bằng `git commit`

---

## 🎯 Mục tiêu
- Hiểu rõ bản chất của commit là một ảnh chụp snapshot toàn vẹn của dự án tại một thời điểm.
- Nắm vững cú pháp tạo commit với thông điệp ngắn gọn qua cờ `-m`.
- Phân biệt rành mạch giữa commit cục bộ (Local Repository) và việc đồng bộ lên dịch vụ từ xa (Remote Push).

---

## 🧩 Từ khóa hôm nay

### Commit — mốc lưu trong lịch sử
- **Nói dễ hiểu:** Bản ghi snapshot bất biến lưu lại toàn bộ trạng thái mã nguồn đã được tuyển chọn trong Staging Area.
- **Ví dụ:** Sau khi hoàn thành một chức năng hoặc sửa một lỗi, bạn tạo commit để đánh dấu cột mốc hoàn thành.
- **Đừng nhầm:** Commit chỉ chụp những gì đang nằm trong Staging Area, hoàn toàn bỏ qua các thay đổi chưa được add.

### Staged — đã chọn cho commit
- **Nói dễ hiểu:** Tập hợp các tệp và dòng code đã được nạp sẵn vào khay chờ thông qua lệnh `git add`.
- **Ví dụ:** `git status` báo `main.js` nằm trong danh sách "Changes to be committed" với màu xanh lá cây.
- **Đừng nhầm:** Staged chỉ mới là hàng chờ trước quầy; chỉ khi gọi `git commit` thì giao dịch snapshot mới thực sự hoàn tất.

### Commit message — lời nhắn của mốc
- **Nói dễ hiểu:** Đoạn văn bản súc tích giải thích rõ ràng "Tại sao bạn lại thực hiện thay đổi này?" cho người đọc lịch sử.
- **Ví dụ:** `git commit -m "fix(auth): resolve session timeout issue on mobile"` giải thích rõ lỗi gì được sửa ở đâu.
- **Đừng nhầm:** Commit message không cần liệt kê từng dòng code chi tiết, mà cần nêu bật ý nghĩa và mục đích của mốc thay đổi.

---

## 📖 Định nghĩa
`git commit` là hành động niêm phong toàn bộ nội dung đang có trong Staging Area thành một mốc lịch sử vĩnh viễn (snapshot). Mỗi commit đại diện cho một trạng thái hoàn chỉnh của dự án tại một thời điểm, được gắn mã định danh băm SHA-1/SHA-256 duy nhất cùng metadata tác giả, ngày giờ và thông điệp giải thích lý do thay đổi.

---

## 🤔 Tại sao cần?
Nếu không có commit, mã nguồn chỉ là một dòng chảy vô định không điểm tựa. Commit biến quá trình lập trình thành chuỗi các bước đi vững chắc: bạn có thể quay lại bất kỳ thời điểm nào trong quá khứ nếu phát sinh lỗi, so sánh sự thay đổi giữa các phiên bản, và cho phép nhiều kỹ sư cùng làm việc mà không sợ giẫm chân lên nhau. Mỗi commit là một hợp đồng bảo hiểm cho sản phẩm của bạn.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung Staging Area là thùng hàng bạn vừa nhặt đồ vào, thì `git commit` chính là hành động dán băng dính niêm phong, in mã vạch theo dõi và dán nhãn ghi chú nội dung thùng hàng gửi vào kho lưu trữ vĩnh viễn. Thao tác này hoàn toàn diễn ra trên máy cá nhân của bạn, biệt lập với máy chủ từ xa cho đến khi bạn quyết định đẩy (push) lên mạng.

---

## 🖼 Sơ đồ
```text
Thư mục làm việc (Working Tree)
       │
       ▼  git add <tệp>
Vùng chuẩn bị (Staging Area / Index)
       │
       ▼  git commit -m "feat: thông điệp"
Kho lưu trữ cục bộ (.git repository) ──► Tạo Commit Snapshot [Hash: a1b2c3d]
       │
       ▼  git push (học ở Level 4)
Máy chủ từ xa (GitHub / GitLab)
```

---

## 🌎 Ví dụ thực tế
Sau khi hoàn thiện chức năng tính tổng giỏ hàng trong `cart.js` và thêm kiểm thử trong `cart.test.js`, bạn đã add cả hai file vào vùng đệm. Bạn chạy lệnh `git commit -m "feat(cart): calculate total price with tax"` để lưu lại mốc son này. Giờ đây bạn hoàn toàn an tâm thử nghiệm các tính năng tiếp theo mà không sợ mất đi phần code đã chạy chuẩn.

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
- `git status`: Bước tiên quyết để đảm bảo những gì sắp commit nằm chính xác trong mục "Changes to be committed".
- `git commit -m "<thông-điệp>"`: Niêm phong snapshot từ Staging Area, gán lời nhắn mô tả trực tiếp mà không cần mở trình soạn thảo văn bản mặc định (Vim/Nano).
- `git log --oneline`: Xem nhanh lịch sử các mốc commit trên một dòng gọn gàng, kiểm chứng commit mới vừa được sinh ra.

---

## ⚠️ Sai lầm phổ biến
1. **Viết commit message vô nghĩa**: Đặt những lời nhắn cẩu thả như "fix", "update", "asdf", "done" khiến đồng nghiệp và chính bạn sau này không thể hiểu mốc đó làm gì khi cần gỡ lỗi.
2. **Commit khi chưa add gì vào Staging Area**: Chạy `git commit` và gặp thông báo "nothing added to commit but untracked files present" do quên chạy `git add`.
3. **Lầm tưởng commit là đã đẩy lên GitHub**: Commit chỉ lưu tại máy cá nhân; nếu hỏng máy tính hoặc xóa thư mục trước khi push, toàn bộ commit cục bộ sẽ mất.

---

## 🧪 Lab
1. Tạo hoặc chỉnh sửa tệp `main.js` với một đoạn mã logic đơn giản.
2. Chạy `git status` để quan sát thay đổi của tệp.
3. Chạy `git add main.js` để đưa tệp vào Staging Area.
4. Chạy lại `git status` và xác nhận `main.js` đã xuất hiện trong "Changes to be committed" màu xanh lá cây.
5. Chạy lệnh: `git commit -m "feat: initialize main app"`.
6. Chạy `git log --oneline` để chiêm ngưỡng mốc snapshot đầu tiên trong lịch sử kho mã nguồn.

---

## 💡 Hint
> Một commit lý tưởng nên là "Atomic Commit" (nguyên tử): giải quyết trọn vẹn một vấn đề duy nhất, kèm kiểm thử và thông điệp rõ ràng!

---

## ✅ Validation
- Kiểm tra `git status` sau khi commit thấy thông báo "nothing to commit, working tree clean".
- Lệnh `git log --oneline` hiển thị commit mới với mã hash và đúng thông điệp đã nhập.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để nắm vững quy trình tạo commit và nguyên tắc phân biệt giữa lưu cục bộ và đẩy lên máy chủ.

---

## 🔥 Challenge
Hãy giải thích tại sao trong mô hình phân tán của Git, bạn có thể ngồi trên máy bay không có kết nối Internet suốt 10 tiếng đồng hồ mà vẫn có thể tạo hàng chục commit liên tiếp mà không gặp bất kỳ trở ngại nào?

---

## 📚 Tổng kết
- `git commit` tạo ảnh chụp snapshot bất biến từ những nội dung đã được tuyển chọn trong Staging Area.
- Thông điệp commit (`-m`) là công cụ giao tiếp quan trọng giữa các kỹ sư phần mềm trong dự án.
- Commit cục bộ lưu hoàn toàn trong `.git` của máy bạn, độc lập với việc kết nối hay push lên GitHub.
