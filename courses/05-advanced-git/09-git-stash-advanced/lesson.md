# git stash nâng cao

---

## 🎯 Mục tiêu
- Làm chủ toàn diện hệ thống ngăn kéo tạm thời với các câu lệnh nâng cao của `git stash`.
- Phân biệt rõ ràng sự khác nhau giữa `git stash pop` (áp dụng và xóa) và `git stash apply` (áp dụng giữ lại).
- Sử dụng các cờ quan trọng: `-u` (`--include-untracked`) và `-a` (`--all`) để lưu cả tệp mới và tệp bị bỏ qua.
- Đặt tên mô tả tường minh cho từng mẩu stash và tạo nhánh mới trực tiếp từ một mẩu stash.

---

## 📖 Định nghĩa
> `git stash` nâng cao là bộ công cụ quản lý ngăn kéo lưu trữ tạm thời chuyên sâu trong Git, cho phép lập trình viên dọn dẹp Working Directory sạch sẽ ngay lập tức bằng cách cất giữ toàn bộ trạng thái dở dang (cả tệp đã staged, tệp chưa staged và tệp chưa được theo dõi untracked) vào một ngăn xếp (Stash Stack) có tổ chức, để bạn có thể tự do chuyển nhánh làm việc khẩn cấp mà không cần phải tạo commit rác.

---

## 🤔 Tại sao cần?
Tình huống kinh điển của nghề lập trình: bạn đang viết dở một tính năng phức tạp với hàng tá dòng code dở dang chưa thể chạy được, thì sếp gọi điện thông báo có một lỗi nghiêm trọng trên production cần bạn sửa gấp trong 15 phút. Bạn không thể commit code dở vì sẽ làm hỏng lịch sử, cũng không thể chuyển nhánh vì Git sẽ chặn do xung đột tệp. `git stash` nâng cao là giải pháp cứu tinh: cất toàn bộ code dở vào ngăn kéo trong 1 giây, sang sửa bug, rồi quay lại lấy ra tiếp tục lập trình như chưa hề có cuộc chia ly.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung bàn làm việc của bạn đang bày bừa đủ loại cọ vẽ, bảng màu và bức tranh đang vẽ dở (Working Tree bừa bộn). Bỗng nhiên có vị khách quý bước vào phòng cần bạn ký gấp một bản hợp đồng. Bạn không vứt bức tranh vào sọt rác, mà nhẹ nhàng bê toàn bộ tranh, cọ và bảng màu cất vào một chiếc ngăn kéo có khóa dưới bàn (`git stash push -u -m "bức tranh hoàng hôn"`). Mặt bàn sạch bong, bạn ký hợp đồng xong xuôi, tiễn khách rồi mở ngăn kéo bê lại mọi thứ ra bàn tiếp tục vẽ (`git stash pop`).

---

## 🖼 Sơ đồ
```text
Cơ cấu hoạt động của ngăn xếp Stash (LIFO - Last In, First Out):
stash@{0}: "WIP: refactor auth module" (Mới nhất)
stash@{1}: "WIP: improve cart css"
stash@{2}: "WIP: experiment with graphql" (Cũ nhất)

Thao tác pop:   Lấy stash@{0} ra áp dụng vào Working Tree và XÓA khỏi danh sách.
Thao tác apply: Lấy stash@{0} ra áp dụng nhưng VẪN GIỮ lại trong danh sách.
```

---

## 🌎 Ví dụ thực tế
Kỹ sư Trang đang thêm 3 tệp mới và sửa đổi 2 tệp cho tính năng thanh toán QR code của ứng dụng bán hàng. Bất ngờ có yêu cầu khẩn cấp chuyển sang kiểm tra nhánh `hotfix-login`. Thay vì gõ lệnh stash thông thường có thể bỏ quên tệp mới, Trang gõ câu lệnh nâng cao: `git stash push -u -m "WIP: QR payment integration"`. Cờ `-u` đảm bảo cả 3 tệp mới chưa tracked cũng được cất gọn gàng vào ngăn kéo. Trang chuyển sang nhánh hotfix xử lý xong xuôi, quay về nhánh cũ và gõ `git stash list` để thấy rõ mẩu stash có tên mô tả rõ ràng. Trang gõ `git stash pop` và toàn bộ không gian làm việc sống động trở lại nguyên vẹn không thiếu một dòng code.

---

## 💻 Command
```bash
git stash push -u -m "<ghi-chú-mô-tả>"
git stash list
git stash apply stash@{n}
git stash pop
git stash drop stash@{n}
git stash branch <nhánh-mới> stash@{n}
```

---

## 🔍 Giải thích command
- `git stash push -u -m "<msg>"`: Lưu tạm kèm thông điệp mô tả và bao gồm cả các tệp untracked.
- `git stash list`: Liệt kê toàn bộ các mẩu stash đang được lưu trữ trong ngăn xếp.
- `git stash pop`: Áp dụng mẩu stash gần nhất vào thư mục làm việc và tự động xóa nó khỏi ngăn kéo.
- `git stash apply stash@{n}`: Áp dụng mẩu stash chỉ định nhưng vẫn bảo lưu nó trong ngăn kéo.
- `git stash branch <tên>`: Tạo một nhánh mới tinh xuất phát từ mốc commit ban đầu và áp dụng stash vào đó.

---

## ⚠️ Sai lầm phổ biến
1. **Quên cờ -u (`--include-untracked`)**:  Khiến các tệp mới tạo chưa từng commit bị bỏ sót lại trên Working Tree và gây lỗi khi chuyển nhánh.
2. **Lạm dụng stash mà không đặt tên mô tả**:  Dẫn đến danh sách stash chứa hàng chục mục vô danh không biết mục nào chứa code gì.
3. **Quên dọn dẹp các stash cũ không còn sử dụng bằng lệnh `git stash drop` hoặc `git stash clear`.**: Quên dọn dẹp các stash cũ không còn sử dụng bằng lệnh `git stash drop` hoặc `git stash clear`.

---

## 🧪 Lab
1. Tạo một tệp mới `new-feature.txt` và chỉnh sửa một tệp có sẵn.
2. Chạy lệnh `git stash push -u -m "demo stash untracked"` để cất toàn bộ.
3. Gõ `git status` xác nhận Working Tree sạch sẽ.
4. Chạy `git stash list` để xem thông điệp mô tả trong danh sách.
5. Chạy `git stash pop` để hồi phục lại đầy đủ cả tệp mới và tệp sửa đổi.

---

## 💡 Hint
> Luôn thêm cờ `-u` khi stash để không bỏ sót các tệp tin mới tạo chưa được Git theo dõi.

---

## ✅ Validation
- Sử dụng thành thạo các kỹ thuật stash nâng cao có thông điệp mô tả và xử lý tệp untracked.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về công cụ git stash nâng cao.

---

## 🔥 Challenge
Khi nào bạn nên sử dụng `git stash branch <tên-nhánh>` thay vì `git stash pop` thông thường?

---

## 📚 Tổng kết
- `git stash push -u -m` giúp lưu trữ cả tệp untracked kèm thông điệp mô tả rõ ràng.
- Phân biệt `pop` (áp dụng và xóa) với `apply` (áp dụng và giữ lại dự phòng).
- `git stash branch` giải quyết xung đột bằng cách tạo nhánh mới an toàn từ mốc stash ban đầu.
