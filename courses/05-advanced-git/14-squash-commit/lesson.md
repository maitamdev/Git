# Squash Commit

---

## 🎯 Mục tiêu
- Nắm vững khái niệm và kỹ thuật gộp commit (Squash Commit) trong Git.
- Sử dụng chỉ thị `squash` (hoặc `s`) trong Interactive Rebase để gộp nhiều commit vụn vặt thành một khối.
- Biên tập lại thông điệp commit kết hợp (Combined Commit Message) sao cho súc tích và mạch lạc.
- Phân biệt sự khác biệt giữa chỉ thị `squash` (giữ lại message để chỉnh sửa) và `fixup` (bỏ qua message).

---

## 🧩 Từ khóa hôm nay

### Squash Commit (squash / s)
- **Nói dễ hiểu**: Gộp một commit vào commit liền kề trước nó và mở màn hình biên tập để gộp các thông điệp commit lại với nhau.
- **Ví dụ**: Đổi `pick` thành `squash` ở dòng thứ hai trong Todo List để gộp commit 2 vào commit 1.
- **Đừng nhầm**: Khác với `fixup`, lệnh `squash` giữ lại toàn bộ nội dung commit message cũ để bạn tinh chỉnh và tổng hợp lại.

### Combined Commit Message
- **Nói dễ hiểu**: Bản nháp thông điệp gộp chung do Git tự động tổng hợp từ tất cả các commit tham gia tiến trình squash.
- **Ví dụ**: Xóa các dòng ghi chú vụn vặt như "fix typo" trong message gộp và viết lại thành "feat: implement user registration".
- **Đừng nhầm**: Bạn cần chủ động xóa bớt các dòng nháp không cần thiết, nếu không Git sẽ lưu toàn bộ các dòng rác vào commit mới.

### Squash and Merge
- **Nói dễ hiểu**: Tính năng gộp toàn bộ các commit trên Pull Request thành một commit duy nhất khi merge vào nhánh chính trên GitHub.
- **Ví dụ**: Bấm nút "Squash and merge" trên GitHub PR để nhánh main chỉ nhận một commit đại diện cho cả tính năng.
- **Đừng nhầm**: Tự squash ở local bằng `git rebase -i` cho phép bạn kiểm soát chi tiết từng nhóm commit nhỏ trước khi đẩy lên remote.

---

## 📖 Định nghĩa
Squash Commit (Gộp commit) là kỹ thuật nén và hợp nhất hai hoặc nhiều commit liên tiếp thành một commit duy nhất trong lịch sử Git, mở màn hình tổng hợp để lập trình viên tự do viết lại một thông điệp cô đọng nhất.

---

## 💡 Tại sao cần
Khi lập trình, chúng ta thường sinh ra nhiều commit vụn vặt như sửa lỗi chính tả hay căn chỉnh giao diện. Kỹ thuật Squash Commit giúp bạn nén chuỗi commit vụn đó thành một khối thay đổi hoàn chỉnh, giữ cho lịch sử nhánh chính luôn sáng sủa và dễ tra cứu.

---

## 🧠 Mental Model
Hãy hình dung bạn nhào bột nặn bánh mì. Bạn thêm một chút bột, rắc chút men nở, rồi thêm nhúm muối. Khi nướng bánh, bạn không để từng nhúm nguyên liệu riêng rẽ mà nhào nặn tất cả thành một khối bột dẻo dai duy nhất. Chiếc bánh ra lò là một sản phẩm hoàn chỉnh và thơm ngon.

---

## 📊 Sơ đồ minh họa
```text
Cơ chế gộp commit bằng squash:
Trước khi squash (3 commit vụn):
C1 ──► C2 ("wip cart") ──► C3 ("fix cart css") ──► C4 ("cart ready")

Trong Todo List (git rebase -i HEAD~3):
pick C2 wip cart
squash C3 fix cart css
squash C4 cart ready

Sau khi hoàn tất:
C1 ──► C_new ("feat: complete shopping cart module") (Một commit duy nhất!)
```

---

## 🏢 Ví dụ thực tế
Kỹ sư Nam tạo 3 commit: tạo form đăng ký, kiểm tra email hợp lệ, và sửa màu nút submit. Trước khi mở PR, Nam dùng `git rebase -i HEAD~3`, đổi 2 commit sau thành `squash`. Nam biên tập lại thành một thông điệp chuẩn mực duy nhất: "feat: add user registration form with validation and styling".

---

## 💻 Command & Cú pháp
```bash
git rebase -i HEAD~<n>
s <commit-hash> <message>
squash <commit-hash> <message>
git log --oneline -n 5
```

---

## 🔍 Giải thích command
- `squash <hash>`: Gộp commit này vào commit liền trước nó và giữ lại thông điệp trong trình soạn thảo tổng hợp.
- `s <hash>`: Ký tự viết tắt tiện lợi của lệnh `squash` trong danh sách Todo List.
- `git rebase -i`: Lệnh khởi động môi trường tương tác để thiết lập các chỉ thị squash.
- `git log --oneline`: Kiểm tra lại kết quả gộp commit trên cây lịch sử.

---

## ⚠️ Sai lầm phổ biến
1. **Đặt chỉ thị `squash` ngay ở dòng đầu tiên của Todo List**: Sẽ gây lỗi vì dòng đầu tiên không có commit nào nằm phía trước để gộp vào.
2. **Quên xóa các dòng thông điệp commit rác trong cửa sổ tổng hợp**: Khiến thông điệp cuối cùng chứa đầy những câu vụn vặt như "fix typo", "temp".
3. **Squash nhầm các tính năng độc lập**: Gộp các commit không liên quan vào làm một khối khổng lồ sẽ gây khó khăn cho việc review và rollback khi phát sinh sự cố.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.
1. Tạo liên tiếp 3 commit nhỏ bổ sung từng dòng chữ vào tệp `notes.txt`.
2. Chạy lệnh `git rebase -i HEAD~3` trên terminal.
3. Giữ dòng 1 là `pick`, đổi dòng 2 và 3 thành `s` hoặc `squash`.
4. Lưu và đóng file. Trong màn hình tiếp theo, chỉnh sửa lại thông điệp commit thành một câu hoàn chỉnh.
5. Dùng `git log --oneline` để xác nhận 3 commit cũ đã gộp thành 1 commit duy nhất.

---

## 💡 Hint & mẹo
> Nhớ nguyên tắc: Dòng đầu tiên trong Todo List luôn luôn phải là `pick` (hoặc reword/edit), tuyệt đối không thể là `squash` hay `fixup`.

---

## ✅ Validation & Kết quả mong đợi
- Gộp thành công nhiều commit thành một commit duy nhất và biên tập lại thông điệp chuẩn xác.
- Nắm vững cách phân biệt giữa `squash` (giữ lại message để sửa) và `fixup` (bỏ message gộp).

---

## ❓ Quiz nhanh
Hãy làm bài kiểm tra trắc nghiệm dưới đây về kỹ thuật Squash Commit.

---

## 🚀 Thử thách nâng cao
Nêu sự khác biệt giữa việc tự tay squash bằng `git rebase -i` ở local và việc bấm nút "Squash and merge" trên giao diện GitHub.

---

## 📝 Tổng kết
- `squash` (hoặc `s`) cho phép gộp commit hiện tại vào commit ngay phía trước.
- Trình soạn thảo tổng hợp giúp bạn viết lại thông điệp commit chung một cách chuyên nghiệp.
- Không bao giờ đặt `squash` ở dòng đầu tiên của file Todo List.
