# git stash nâng cao

---

## 🎯 Mục tiêu
- Làm chủ toàn diện hệ thống ngăn kéo tạm thời với các câu lệnh nâng cao của `git stash`.
- Phân biệt rõ ràng sự khác nhau giữa `git stash pop` (áp dụng và xóa) và `git stash apply` (áp dụng giữ lại).
- Sử dụng các cờ quan trọng: `-u` (`--include-untracked`) và `-a` (`--all`) để lưu cả tệp mới và tệp bị bỏ qua.
- Đặt tên mô tả tường minh cho từng mẩu stash và tạo nhánh mới trực tiếp từ một mẩu stash.

---

## 🧩 Từ khóa hôm nay

### git stash push -u
- **Nói dễ hiểu**: Lệnh cất toàn bộ code dở dang vào ngăn kéo bao gồm cả các file mới tạo chưa từng add vào Git.
- **Ví dụ**: `git stash push -u -m "WIP: auth module"` để cất sạch sẽ mọi thay đổi kèm file mới.
- **Đừng nhầm**: Mặc định `git stash` bỏ quên file mới tạo; bắt buộc phải có cờ `-u` để không sót file.

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
`git stash` nâng cao là bộ công cụ quản lý ngăn kéo tạm thời chuyên sâu trong Git, cho phép bạn dọn sạch Working Directory ngay lập tức bằng cách cất giữ toàn bộ trạng thái dở dang (cả tệp đã staged, chưa staged và tệp mới untracked) vào ngăn xếp có tổ chức để tự do chuyển nhánh làm việc mà không cần tạo commit nháp.

---

## 💡 Tại sao cần
Khi đang viết tính năng phức tạp với code dở dang chưa thể chạy được, bạn bất ngờ nhận yêu cầu sửa lỗi khẩn cấp trên nhánh khác trong 15 phút. Bạn không thể commit code dở vì sẽ làm bẩn lịch sử, cũng không thể chuyển nhánh vì Git sẽ chặn. `git stash` nâng cao giúp bạn cất toàn bộ code vào ngăn kéo trong một giây để chuyển nhánh an toàn.

---

## 🧠 Mental Model
Hãy hình dung mặt bàn làm việc của bạn đang bày bừa cọ vẽ và bức tranh đang vẽ dở (Working Tree). Khách quý bất ngờ bước vào phòng cần ký hợp đồng gấp. Bạn nhẹ nhàng bê toàn bộ tranh và cọ cất vào chiếc ngăn kéo có khóa dưới bàn (`git stash push -u -m "hoàng hôn"`). Bàn sạch bóng, bạn tiếp khách xong xuôi rồi mở ngăn kéo mang tranh ra vẽ tiếp (`git stash pop`).

---

## 📊 Sơ đồ minh họa
```text
Cơ cấu hoạt động của ngăn xếp Stash (LIFO - Last In, First Out):
stash@{0}: "WIP: refactor auth module" (Mới nhất)
stash@{1}: "WIP: improve cart css"
stash@{2}: "WIP: experiment with graphql" (Cũ nhất)

Thao tác pop:   Lấy stash@{0} ra áp dụng vào Working Tree và XÓA khỏi danh sách.
Thao tác apply: Lấy stash@{0} ra áp dụng nhưng VẪN GIỮ lại trong danh sách.
```

---

## 🏢 Ví dụ thực tế
Kỹ sư Trang đang thêm 3 file mới và sửa 2 file tính năng QR code thì nhận cuộc gọi sửa gấp lỗi đăng nhập. Trang chạy: `git stash push -u -m "WIP: QR payment integration"`. Cờ `-u` giúp cất gọn cả 3 file mới tạo. Trang chuyển nhánh hotfix sửa xong, quay lại nhánh cũ gõ `git stash pop`. Toàn bộ không gian làm việc sống động trở lại nguyên vẹn không thiếu một dòng code.

---

## 💻 Command & Cú pháp
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
1. **Quên cờ -u khi có file mới tạo**: Khiến các tệp untracked bị bỏ sót lại trên Working Tree và gây lỗi khi chuyển nhánh.
2. **Không đặt tên mô tả cho stash**: Khiến danh sách stash chứa hàng chục mục vô danh khó phân biệt sau vài ngày.
3. **Quên dọn dẹp các mẩu stash cũ**: Để tồn đọng quá nhiều stash rác rưởi không còn dùng làm rối danh sách kiểm tra.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác cất giữ và khôi phục stash nâng cao trên terminal.
1. Tạo một tệp mới `new-feature.txt` và chỉnh sửa một tệp có sẵn.
2. Chạy lệnh `git stash push -u -m "demo stash untracked"` để cất toàn bộ.
3. Gõ `git status` xác nhận Working Tree sạch sẽ.
4. Chạy `git stash list` để xem thông điệp mô tả trong danh sách.
5. Chạy `git stash pop` để hồi phục lại đầy đủ cả tệp mới và tệp sửa đổi.

---

## 💡 Hint & mẹo
> Luôn thêm cờ `-u` khi stash để không bỏ sót các tệp tin mới tạo chưa được Git theo dõi.

---

## ✅ Validation & Kết quả mong đợi
- Danh sách `git stash list` hiển thị rõ thông điệp mô tả nội dung công việc.
- Toàn bộ file sửa đổi và file mới được phục hồi đầy đủ vào Working Directory sau khi pop.

---

## ❓ Quiz nhanh
Hãy làm bài kiểm tra trắc nghiệm dưới đây về công cụ git stash nâng cao.

---

## 🚀 Thử thách nâng cao
Sử dụng `git stash branch test-branch` để bung một mẩu stash cũ vào một nhánh độc lập mà không lo xung đột với các commit mới trên nhánh hiện tại.

---

## 📝 Tổng kết
- `git stash push -u -m` giúp lưu trữ cả tệp untracked kèm thông điệp mô tả rõ ràng.
- Phân biệt `pop` (áp dụng và xóa) với `apply` (áp dụng và giữ lại dự phòng).
- `git stash branch` giải quyết xung đột bằng cách tạo nhánh mới an toàn từ mốc stash ban đầu.
