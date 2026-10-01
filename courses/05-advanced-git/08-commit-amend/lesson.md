# git commit --amend

---

## 🎯 Mục tiêu
- Hiểu rõ cơ chế hoạt động của cờ `--amend` trong câu lệnh `git commit`.
- Sử dụng `--amend` để sửa đổi thông điệp của commit gần nhất một cách nhanh chóng.
- Bổ sung các tệp tin hoặc dòng code bị bỏ quên vào commit gần nhất mà không sinh ra commit mới.
- Nhận thức rõ bản chất: `--amend` tạo ra một commit hash mới thay thế commit cũ (viết lại lịch sử).

---

## 🧩 Từ khóa hôm nay

### git commit --amend
- **Nói dễ hiểu**: Lệnh sửa lại commit gần nhất bằng cách gộp thêm các file trong Staging hoặc đổi thông điệp commit.
- **Ví dụ**: `git commit --amend -m "feat: login system"` để sửa lại lỗi chính tả của commit vừa tạo.
- **Đừng nhầm**: Không chỉnh sửa trực tiếp trên commit cũ; Git tạo ra một commit mới tinh có mã hash mới thay thế commit cũ.

### --no-edit
- **Nói dễ hiểu**: Tùy chọn đi kèm amend để bổ sung file mới vào commit gần nhất mà giữ nguyên thông điệp cũ.
- **Ví dụ**: `git add icon.png && git commit --amend --no-edit` để kẹp thêm file ảnh vào commit vừa tạo.
- **Đừng nhầm**: Vẫn tạo ra commit hash mới dù nội dung thông điệp không hề thay đổi.

### rewriting recent commit
- **Nói dễ hiểu**: Thao tác viết lại lịch sử commit gần nhất của bạn trên máy tính cá nhân.
- **Ví dụ**: Đổi tên tác giả, ngày giờ, thông điệp hoặc nội dung file của commit đỉnh nhánh.
- **Đừng nhầm**: Chỉ thực hiện trên commit cục bộ chưa push; nếu đã push lên server sẽ bị từ chối khi push tiếp theo.

---

## 📖 Định nghĩa
`git commit --amend` là câu lệnh tiện ích chuyên dụng trong Git cho phép bạn chỉnh sửa và cập nhật trực tiếp vào commit gần đây nhất trên nhánh hiện tại. Khi chạy, Git kết hợp toàn bộ các thay đổi trong Staging Area với nội dung của commit trước đó, cho phép cập nhật thông điệp và tạo một commit mới thay thế commit cũ.

---

## 💡 Tại sao cần
Khi vừa commit xong, bạn thường sực nhớ ra quên lưu một file cấu hình hoặc thấy commit message bị sai chính tả. Nếu tạo thêm một commit chỉ để sửa lỗi chính tả hay thêm một dòng code, cây lịch sử sẽ bị vụn vặt và thiếu chuyên nghiệp. `git commit --amend` giúp lịch sử dự án luôn sạch sẽ và chỉn chu.

---

## 🧠 Mental Model
Hãy hình dung bạn vừa in một tấm ảnh kỷ yếu tập thể (commit). Khi nhìn kỹ, bạn phát hiện một người bị lệch vạt áo. Thay vì chụp thêm bức ảnh nhỏ xíu riêng vạt áo dán đè lên album, bạn mời người đó chỉnh lại áo rồi chụp một tấm ảnh hoàn hảo mới thay thế tấm cũ vào đúng trang album đó (`--amend`). Người xem chỉ thấy một bức ảnh hoàn mỹ.

---

## 📊 Sơ đồ minh họa
```text
Bản chất của git commit --amend:
Trước khi amend:
C1 ──► C2 (Commit có thông điệp sai hoặc thiếu tệp) [HEAD]

Sau khi sửa tệp, git add và git commit --amend:
C1 ──► C3 (Commit mới hoàn hảo, thay thế hoàn toàn C2) [HEAD]
(C2 bị tách rời và sẽ được dọn rác)
```

---

## 🏢 Ví dụ thực tế
Lập trình viên Trung vừa commit tính năng đăng nhập với thông điệp sai chính tả: "feat: logn system" và quên chưa thêm file `favicon.ico`. Trung không tạo commit vá vụn vặt mà đưa icon vào staging bằng `git add favicon.ico`, rồi gõ `git commit --amend -m "feat: login system"`. Git gom file icon vào chung và cập nhật tiêu đề chuẩn xác, giữ cho cây lịch sử nhánh luôn tinh gọn.

---

## 💻 Command & Cú pháp
```bash
git commit --amend
git commit --amend -m "<thông-điệp-mới>"
git commit --amend --no-edit
```

---

## 🔍 Giải thích command
- `git commit --amend`: Mở trình soạn thảo văn bản để bạn cập nhật thông điệp hoặc gộp các tệp đã staged vào commit gần nhất.
- `git commit --amend -m "<msg>"`: Sửa trực tiếp thông điệp commit ngay trên dòng lệnh mà không cần mở editor.
- `git commit --amend --no-edit`: Thêm các tệp đã staged vào commit gần nhất mà giữ nguyên thông điệp cũ không thay đổi.

---

## ⚠️ Sai lầm phổ biến
1. **Amend commit mà người khác đã dựa vào**: `amend` tạo commit mới; remote có thể từ chối lần push thường vì lịch sử đã khác. Hãy phối hợp với nhóm trước khi cập nhật nhánh từ xa.
2. **Nghĩ rằng amend sửa trực tiếp trên commit cũ**: Thực chất Git tạo ra một commit snapshot mới với mã SHA hoàn toàn mới.
3. **Quên git add file cần bổ sung trước khi amend**: Khiến commit mới tạo ra vẫn thiếu file mà bạn mong muốn kẹp thêm vào.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thực hành sửa commit gần nhất bằng --amend trên terminal.
1. Tạo một commit với thông điệp sai chính tả `initail commit`.
2. Chạy lệnh `git commit --amend -m "initial commit"` để sửa lỗi chính tả.
3. Tạo một tệp mới `extra.txt`, chạy `git add extra.txt`.
4. Chạy `git commit --amend --no-edit` để gộp tệp vào commit đó mà không đổi thông điệp.
5. Dùng `git log -n 1 --stat` để kiểm tra kết quả hoàn hảo.

---

## 💡 Hint & mẹo
> Dùng cờ `--no-edit` khi bạn chỉ muốn bổ sung tệp vào commit gần nhất mà không muốn đổi thông điệp.

---

## ✅ Validation & Kết quả mong đợi
- Mã SHA hash của commit gần nhất được làm mới.
- Thông điệp commit được cập nhật chuẩn xác và tệp bổ sung nằm trọn vẹn trong commit đó.

---

## ❓ Quiz nhanh
Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh tiện ích git commit --amend.

---

## 🚀 Thử thách nâng cao
Tìm hiểu cách sử dụng cờ `--reset-author` trong lệnh amend khi bạn muốn cập nhật thông tin tác giả và thời gian commit sang mốc hiện tại.

---

## 📝 Tổng kết
- `git commit --amend` cập nhật commit gần nhất bằng cách gộp các tệp đã staged hoặc sửa message.
- Cờ `--no-edit` giúp bổ sung tệp mà không làm thay đổi thông điệp commit sẵn có.
- Chỉ nên sử dụng amend cho các commit cục bộ cá nhân chưa từng push lên nhánh dùng chung.
