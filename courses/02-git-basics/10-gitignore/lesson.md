# Bỏ qua tệp chưa cần đưa vào Git bằng `.gitignore`

---

## 🎯 Mục tiêu
- Hiểu rõ vai trò sống còn của tệp `.gitignore` trong việc bảo vệ và tinh giản kho mã nguồn.
- Nắm vững cú pháp mẫu (Pattern) để bỏ qua tệp rác build, nhật ký log và thư mục dependencies.
- Sử dụng thành thạo `git check-ignore -v` để gỡ lỗi và truy vết các quy tắc loại trừ.

---

## 🧩 Từ khóa hôm nay

### `.gitignore` — danh sách mẫu cần bỏ qua
- **Nói dễ hiểu:** Tệp văn bản khai báo danh sách đen các tệp và thư mục mà Git tuyệt đối không được đưa vào diện theo dõi.
- **Ví dụ:** Khai báo `*.log` hoặc `node_modules/` ngay trong file `.gitignore` ở thư mục gốc repo.
- **Đừng nhầm:** `.gitignore` chỉ hướng dẫn Git lờ file đi, hoàn toàn không xóa hay can thiệp vào file vật lý trên đĩa cứng.

### Pattern — mẫu tên cần khớp
- **Nói dễ hiểu:** Cú pháp quy tắc ký tự đại diện (globbing) giúp Git nhận diện hàng loạt tệp tin cần loại trừ.
- **Ví dụ:** `*.env` khớp tất cả file đuôi env; `dist/` khớp toàn bộ thư mục đầu ra của quá trình build.
- **Đừng nhầm:** Mẫu quy tắc chỉ có hiệu lực với những đường dẫn khớp chính xác cú pháp khai báo; gõ sai một dấu gạch chéo có thể làm mất tác dụng.

### Tracked — tệp Git đã theo dõi
- **Nói dễ hiểu:** Những tệp tin đã từng được commit vào lịch sử hoặc đang nằm sẵn trong Staging Area từ trước.
- **Ví dụ:** Nếu bạn lỡ commit file `config.env` từ tuần trước, việc thêm nó vào `.gitignore` hôm nay sẽ KHÔNG làm Git ngừng theo dõi nó.
- **Đừng nhầm:** `.gitignore` chỉ áp dụng cho tệp Untracked; muốn lờ tệp đã Tracked, bạn phải dùng lệnh xóa khỏi index bằng `git rm --cached`.

### `git check-ignore` — tìm quy tắc khớp
- **Nói dễ hiểu:** Lệnh kiểm toán quyền lực giúp bạn tra cứu chính xác dòng quy tắc nào trong `.gitignore` đang chặn tệp của bạn.
- **Ví dụ:** `git check-ignore -v dist/bundle.js` sẽ in ra số dòng và pattern cụ thể đang tác động lên file.
- **Đừng nhầm:** Lệnh chỉ làm nhiệm vụ thanh tra và giải trình nguyên nhân, không làm thay đổi nội dung file `.gitignore`.

---

## 📖 Định nghĩa
`.gitignore` là tệp cấu hình đặc biệt đặt ở thư mục dự án, quy định danh sách các mẫu đường dẫn mà Git phải cố tình phớt lờ. Khi một tệp khớp với quy tắc trong `.gitignore`, Git sẽ không hiển thị nó ở mục Untracked và ngăn không cho bạn vô tình đưa vào Staging Area qua các lệnh thêm hàng loạt.

---

## 🤔 Tại sao cần?
Dự án thực tế luôn sinh ra hàng nghìn tệp phụ trợ: thư viện phụ thuộc (`node_modules`), sản phẩm biên dịch (`dist`, `build`), tệp nhật ký ghi đè liên tục (`*.log`) và tệp biến môi trường chứa thông tin bảo mật (`.env`). Nếu không có `.gitignore`, kho mã nguồn sẽ phình to khủng khiếp, xung đột triền miên và đối mặt với thảm họa an ninh mạng khi lộ mật khẩu cơ sở dữ liệu lên Internet.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy xem `.gitignore` như một nhân viên bảo vệ đứng gác tại cửa vào kho lưu trữ với một danh sách đen (blacklist). Bất kỳ tệp nào mang họ tên hoặc đặc điểm nằm trong danh sách (như tệp có đuôi `.log` hay thư mục `node_modules/`) đều bị chặn ngoài cửa, không được phép bước vào khu vực theo dõi của Git.

---

## 🖼 Sơ đồ
```text
CƠ CHẾ LỌC CỦA .GITIGNORE:
  Tệp mới tạo trong dự án
        │
        ├── Khớp quy tắc trong .gitignore?
        │      ├── CÓ: ──► Bị bỏ qua, ẩn khỏi git status (Untracked)
        │      └── KHÔNG: ──► Hiện trong git status (Untracked) ──► Có thể git add
        │
  Tệp đã được Git theo dõi từ trước (Tracked):
        └── Bất chấp .gitignore! Vẫn tiếp tục bị Git theo dõi mọi thay đổi!
```

---

## 🌎 Ví dụ thực tế
Trong dự án NodeJS, thư mục `node_modules` có thể nặng tới 500MB với hàng chục nghìn tệp nhỏ. Chỉ cần ghi một dòng `node_modules/` vào `.gitignore`, `git status` sẽ lập tức sạch sẽ tinh tươm. Đồng đội tải dự án về chỉ cần chạy lệnh cài đặt package thay vì phải tốn hàng giờ đồng hồ để tải cả kho thư viện rác qua Git.

---

## 💻 Command
Tạo tệp `.gitignore` và ghi các quy tắc mẫu:
```text
*.log
node_modules/
.env
dist/
```
Sau đó kiểm tra và xác thực quy tắc bằng terminal:
```bash
git status
git check-ignore -v debug.log
```

---

## 🔍 Giải thích command
- `*.log`: Mẫu ký tự đại diện khớp với mọi tệp có phần mở rộng kết thúc bằng `.log` ở bất kỳ thư mục nào.
- `node_modules/`: Dấu gạch chéo ở cuối chỉ thị bỏ qua toàn bộ nội dung của thư mục mang tên này.
- `git check-ignore -v <đường-dẫn>`: Trả về tên file `.gitignore`, số dòng và nội dung pattern đã khớp, giúp bạn hiểu tại sao file bị bỏ qua.

---

## ⚠️ Sai lầm phổ biến
1. **Lầm tưởng `.gitignore` tự động bỏ qua file đã commit**: Thêm file vào `.gitignore` sau khi đã commit sẽ hoàn toàn vô tác dụng; bạn phải gỡ nó khỏi index bằng `git rm --cached`.
2. **Commit tệp `.env` chứa mật khẩu lên GitHub rồi mới thêm vào `.gitignore`**: Toàn bộ lịch sử commit cũ vẫn chứa mật khẩu công khai; bạn phải đổi mật khẩu ngay lập tức!
3. **Quên commit chính tệp `.gitignore`**: Tệp cấu hình này cần được commit để các thành viên khác trong nhóm cùng nhận được quy tắc loại trừ.

---

## 🧪 Lab
1. Tạo tệp `debug.log` với nội dung bất kỳ trong dự án.
2. Chạy `git status` và thấy `debug.log` xuất hiện trong mục Untracked files màu đỏ.
3. Tạo tệp `.gitignore` và ghi một dòng quy tắc duy nhất: `*.log`, sau đó lưu lại.
4. Chạy lại `git status`; quan sát thấy `debug.log` đã biến mất hoàn toàn khỏi danh sách Untracked files.
5. Chạy lệnh `git check-ignore -v debug.log` để kiểm tra dòng quy tắc khớp.

---

## 💡 Hint
> Hãy thêm `.gitignore` ngay từ commit đầu tiên của dự án trước khi cài đặt bất kỳ thư viện hay chạy build nào!

---

## ✅ Validation
- Tệp `debug.log` vẫn tồn tại an toàn trên ổ đĩa nhưng không xuất hiện trong `git status`.
- Lệnh `git check-ignore -v debug.log` trả về kết quả khớp với dòng `*.log`.

---

## ❓ Quiz
Trả lời bài trắc nghiệm dưới đây để nắm vững quy tắc viết pattern và cơ chế hoạt động của `.gitignore`.

---

## 🔥 Challenge
Giả sử bạn đã lỡ commit file `database.env` lên Git từ tuần trước. Hôm nay bạn thêm dòng `database.env` vào file `.gitignore`. Chạy `git status` sau khi sửa nội dung file đó, bạn thấy Git vẫn báo file bị `modified`. Hãy giải thích tại sao và nêu phương án xử lý triệt để?

---

## 📚 Tổng kết
- `.gitignore` ngăn chặn việc đưa các tệp rác, file build và bí mật bảo mật vào Git.
- Quy tắc trong `.gitignore` chỉ áp dụng cho các tệp Untracked, không có tác dụng với tệp đã Tracked.
- Sử dụng `git check-ignore -v` là cách chuẩn chỉ để gỡ lỗi và kiểm tra tính hiệu lực của các mẫu pattern.
