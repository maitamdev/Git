# git stash nâng cao

---

## 🎯 Mục tiêu
- Dùng stash để cất thay đổi tracked; biết cách thêm file untracked bằng `-u`.
- Phân biệt rõ ràng sự khác nhau giữa `git stash pop` (áp dụng và xóa) và `git stash apply` (áp dụng giữ lại).
- Đặt ghi chú bằng `-m`, áp dụng stash nhiều lần bằng `apply`, hoặc lấy ra bằng `pop`.
- Biết `-a` còn đưa file ignored vào stash; `stash branch` là lệnh Git thật, chưa được mô phỏng trong khóa học.

---

## 🧩 Từ khóa hôm nay

### git stash push -u
- **Nói dễ hiểu**: Lệnh cất toàn bộ code dở dang vào ngăn kéo bao gồm cả các file mới tạo chưa từng add vào Git.
- **Ví dụ**: `git stash push -u -m "WIP: auth module"` để cất sạch sẽ mọi thay đổi kèm file mới.
- **Đừng nhầm**: Mặc định `git stash` không cất file untracked. Thêm `-u` nếu muốn đưa cả các file mới chưa được theo dõi vào stash.

### stash pop vs apply
- **Nói dễ hiểu**: `pop` lấy code ra khỏi ngăn kéo và xóa luôn mục đó; `apply` lấy code ra nhưng vẫn giữ bản sao trong ngăn kéo.
- **Ví dụ**: Dùng `git stash apply` khi muốn thử nghiệm cùng một mẩu code trên nhiều nhánh khác nhau.
- **Đừng nhầm**: Nếu dùng `pop` mà bị conflict, Git sẽ giữ lại mẩu stash để bạn không bị mất dữ liệu.

### git stash branch
- **Nói dễ hiểu**: Lệnh tạo một nhánh mới tinh xuất phát từ đúng mốc commit lúc bạn tạo stash và bung code vào đó.
- **Ví dụ**: `git stash branch test-feature stash@{0}` để thử nghiệm an toàn tránh xung đột với nhánh hiện tại.
- **Đừng nhầm**: Không tạo nhánh từ HEAD hiện tại; lệnh quay về commit gốc nơi bạn bắt đầu cất stash.

---

## 📖 Định nghĩa
`git stash` cất thay đổi staged và unstaged trên file tracked để làm sạch phần công việc đó. Mặc định, file untracked không được cất; thêm `-u` để gồm file untracked, hoặc `-a` để gồm cả file ignored. Dùng `-m` để đặt lời nhắc. Nếu áp dụng stash gây conflict, Git thật thường giữ entry lại để bạn xử lý.

---

## 🤔 Tại sao cần?
Khi đang sửa một tính năng thì cần chuyển sang nhánh khác, bạn có thể commit tạm, dùng worktree, hoặc cất thay đổi bằng `git stash`. Stash tiện khi chưa muốn tạo commit; lưu ý file untracked cần `-u`, và khi áp dụng lại có thể phát sinh conflict.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung mặt bàn làm việc của bạn đang bày bừa cọ vẽ và bức tranh đang vẽ dở (Working Tree). Khách quý bất ngờ bước vào phòng cần ký hợp đồng gấp. Bạn nhẹ nhàng bê toàn bộ tranh và cọ cất vào chiếc ngăn kéo có khóa dưới bàn (`git stash push -u -m "hoàng hôn"`). Bàn sạch bóng, bạn tiếp khách xong xuôi rồi mở ngăn kéo mang tranh ra vẽ tiếp (`git stash pop`).

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
Kỹ sư Trang đang thêm 3 file mới và sửa 2 file tính năng QR code thì nhận cuộc gọi sửa gấp lỗi đăng nhập. Trang chạy: `git stash push -u -m "WIP: QR payment integration"`. Cờ `-u` giúp cất gọn cả 3 file mới tạo. Trang chuyển nhánh hotfix sửa xong, quay lại nhánh cũ gõ `git stash pop`. Toàn bộ không gian làm việc sống động trở lại nguyên vẹn không thiếu một dòng code.

---

## 💻 Command
```bash
git stash push -u -m "<ghi-chú-mô-tả>"
git stash list
git stash apply stash@{n}
git stash pop
git stash drop stash@{n}
```

`git stash branch <nhánh-mới> stash@{n}` cũng có trong Git thật để tạo nhánh từ điểm gốc của stash rồi áp dụng stash; simulator hiện chưa hỗ trợ lệnh này. `git stash -a` và `--index` có thể dùng trong Git thật; simulator hỗ trợ `-a`, còn `--index` chỉ khôi phục staging ở trường hợp đơn giản.

---

## 🔍 Giải thích command
- `git stash push -u -m "<msg>"`: Lưu tạm kèm thông điệp mô tả và bao gồm cả các tệp untracked.
- `git stash list`: Liệt kê toàn bộ các mẩu stash đang được lưu trữ trong ngăn xếp.
- `git stash pop`: Áp dụng mẩu stash gần nhất vào thư mục làm việc và tự động xóa nó khỏi ngăn kéo.
- `git stash apply stash@{n}`: Áp dụng mẩu stash chỉ định nhưng vẫn bảo lưu nó trong ngăn kéo.
- `git stash branch <tên>`: Tạo một nhánh mới tinh xuất phát từ mốc commit ban đầu và áp dụng stash vào đó.

---

## ⚠️ Sai lầm phổ biến
1. **Quên cờ -u khi có file mới tạo**: Khiến các tệp untracked bị bỏ sót lại trên Working Tree và gây lỗi khi chuyển nhánh.
2. **Cho rằng `pop` xóa stash dù có conflict**: Nếu Git thật không áp dụng được stash hoàn toàn, entry có thể vẫn còn; kiểm tra bằng `git stash list`.
3. **Dùng `drop` trước khi kiểm tra**: `drop` xóa entry khỏi danh sách; hãy chắc chắn không cần nội dung đó nữa.

---

## 🧪 Lab
1. Tạo commit nền có `tracked.txt` với nội dung `base`: chạy `echo "base" > tracked.txt`, `git add tracked.txt`, `git commit -m "base"`.
2. Đổi `tracked.txt` thành `work`, tạo `new-feature.txt`, rồi chạy `git stash push -u -m "demo stash untracked"`.
3. Chạy `git status`: thay đổi tracked đã được cất, file mới cũng được dọn khỏi Working Tree.
4. Chạy `git stash list` để xem lời nhắc.
5. Chạy `git stash apply stash@{0}` rồi `git stash list`: thay đổi trở lại nhưng stash vẫn còn.
6. Sau khi xác nhận file đúng, chạy `git stash pop stash@{0}`. Kiểm tra nội dung hai file và xác nhận entry đã bị gỡ khỏi danh sách.

---

## 💡 Hint
> Luôn thêm cờ `-u` khi stash để không bỏ sót các tệp tin mới tạo chưa được Git theo dõi.

---

## ✅ Validation
- Danh sách `git stash list` hiển thị rõ thông điệp mô tả nội dung công việc.
- `-u` đã cất cả file mới; `apply` khôi phục mà vẫn giữ entry, còn `pop` khôi phục rồi gỡ entry khi áp dụng thành công.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về công cụ git stash nâng cao.

---

## 🔥 Challenge
Sử dụng `git stash branch test-branch` để bung một mẩu stash cũ vào một nhánh độc lập mà không lo xung đột với các commit mới trên nhánh hiện tại.

---

## 📚 Tổng kết
- `git stash push -u -m` giúp lưu trữ cả tệp untracked kèm thông điệp mô tả rõ ràng.
- Phân biệt `pop` (áp dụng và xóa) với `apply` (áp dụng và giữ lại dự phòng).
- `git stash branch` giải quyết xung đột bằng cách tạo nhánh mới an toàn từ mốc stash ban đầu.
