# Squash Commit

---

## 🎯 Mục tiêu
- Nắm vững khái niệm và kỹ thuật gộp commit (Squash Commit) trong Git.
- Sử dụng chỉ thị `squash` (hoặc `s`) trong Interactive Rebase để gộp nhiều commit vụn vặt thành một khối.
- Biên tập lại thông điệp commit kết hợp (Combined Commit Message) sao cho súc tích và mạch lạc.
- Phân biệt sự khác biệt giữa chỉ thị `squash` (giữ lại message để chỉnh sửa) và `fixup` (bỏ qua message).

---

## 📖 Định nghĩa
> Squash Commit (Gộp commit) là kỹ thuật nén và hợp nhất hai hoặc nhiều commit liên tiếp thành một commit duy nhất trong lịch sử Git. Khi sử dụng chỉ thị `squash` (hoặc viết tắt là `s`) trong Interactive Rebase, Git sẽ lấy toàn bộ các thay đổi mã nguồn của commit được đánh dấu squash gộp vào commit nằm ngay phía trước nó, sau đó mở cửa sổ soạn thảo tổng hợp chứa toàn bộ thông điệp của các commit thành phần để lập trình viên tự do viết lại một thông điệp cô đọng nhất.

---

## 🤔 Tại sao cần?
Trong lúc lập trình, tư duy của bạn thường diễn ra theo từng bước nhỏ: thử nghiệm giải pháp, sửa lỗi cú pháp, bổ sung trường dữ liệu, tinh chỉnh giao diện. Điều này sinh ra một chuỗi 5-10 commit vụn vặt không có giá trị độc lập. Nếu đưa toàn bộ đống vụn này vào nhánh chính, lịch sử dự án sẽ bị rác và rất khó tra cứu sau này. Kỹ thuật Squash Commit giúp bạn nén toàn bộ chuỗi vụn vặt đó thành một commit duy nhất hoàn chỉnh mang thông điệp chuẩn mực trước khi hợp nhất vào dòng chảy chính.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung bạn đang nhào bột nặn bánh mì. Bạn cho một nắm bột nhỏ vào âu, thêm một chút nước, rắc một chút men nở, rồi thêm một nhúm muối (từng commit vụn vặt). Khi chuẩn bị đem vào lò nướng, bạn không nướng riêng từng hạt muối hay giọt nước rời rạc. Bạn dùng tay nhào nặn tất cả các thành phần đó lại với nhau thành một khối bột bánh mì dẻo dai, tròn trịa duy nhất (`squash commit`). Chiếc bánh mì nướng ra lò là một sản phẩm hoàn chỉnh và thơm ngon.

---

## 🖼 Sơ đồ
```text
Cơ chế gộp commit bằng squash:
Trước khi squash (3 commit vụn):
C1 ──► C2 ("wip cart") ──► C3 ("fix cart css") ──► C4 ("cart ready")

Trong Todo List:
pick C2 wip cart
squash C3 fix cart css
squash C4 cart ready

Sau khi hoàn tất:
C1 ──► C_new ("feat: complete shopping cart module") (Một commit duy nhất!)
```

---

## 🌎 Ví dụ thực tế
Kỹ sư Nam tạo 3 commit trên nhánh cá nhân: commit 1 có nội dung tạo form đăng ký, commit 2 thêm kiểm tra email hợp lệ, commit 3 sửa màu sắc nút submit. Chuẩn bị gửi Pull Request, Nam chạy lệnh: `git rebase -i HEAD~3`. Trong tệp todo list, Nam giữ dòng đầu tiên là `pick`, đổi hai dòng sau thành `squash` (hoặc `s`). Khi lưu lại, Git hiển thị màn hình tổng hợp chứa cả 3 thông điệp cũ. Nam xóa sạch các dòng rác và viết lại tiêu đề duy nhất: "feat: add user registration form with validation and styling". Commit mới ra đời tinh gọn tuyệt đối.

---

## 💻 Command
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
1. **Đặt chỉ thị `squash` ngay ở dòng đầu tiên của Todo List**:  Sẽ gây lỗi vì dòng đầu tiên không có commit nào nằm phía trước để gộp vào.
2. **Quên xóa các dòng thông điệp commit rác trong cửa sổ tổng hợp**:  Khiến thông điệp cuối cùng chứa đầy những câu vụn vặt như "fix typo", "temp".
3. **Squash nhầm các commit thuộc hai tính năng hoàn toàn khác nhau vào làm một commit khổng lồ.**: Squash nhầm các commit thuộc hai tính năng hoàn toàn khác nhau vào làm một commit khổng lồ.

---

## 🧪 Lab
1. Tạo liên tiếp 3 commit nhỏ bổ sung từng dòng chữ vào tệp `notes.txt`.
2. Chạy lệnh `git rebase -i HEAD~3`.
3. Giữ dòng 1 là `pick`, đổi dòng 2 và 3 thành `s` hoặc `squash`.
4. Lưu và đóng file. Trong màn hình tiếp theo, chỉnh sửa lại thông điệp commit thành một câu hoàn chỉnh.
5. Dùng `git log --oneline` để xác nhận 3 commit cũ đã gộp thành 1 commit duy nhất.

---

## 💡 Hint
> Nhớ nguyên tắc: Dòng đầu tiên trong Todo List luôn luôn phải là `pick` (hoặc reword/edit), không thể là `squash`.

---

## ✅ Validation
- Gộp thành công nhiều commit thành một commit duy nhất và biên tập lại thông điệp chuẩn xác.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về kỹ thuật Squash Commit.

---

## 🔥 Challenge
Nêu sự khác biệt giữa việc tự tay squash bằng `git rebase -i` ở local và việc bấm nút "Squash and merge" trên giao diện GitHub.

---

## 📚 Tổng kết
- Squash Commit kết hợp nhiều commit nhỏ thành một khối commit duy nhất hoàn chỉnh.
- Chỉ thị `squash` (hoặc `s`) gộp mã nguồn vào commit phía trước và cho phép biên tập thông điệp tổng hợp.
- Giúp lịch sử dự án cô đọng, dễ kiểm soát và không bị rác bởi các commit dở dang.
