# git tag

---

## 🎯 Mục tiêu
- Hiểu rõ khái niệm và vai trò của Tag trong Git như các mốc đánh dấu phiên bản bất biến.
- Phân biệt rõ ràng giữa con trỏ nhánh (Branch - di chuyển liên tục) và con trỏ thẻ (Tag - đứng yên vĩnh viễn).
- Tạo và quản lý các thẻ Lightweight Tag (Thẻ nhẹ) nhanh chóng.
- Đẩy thẻ lên máy chủ từ xa và xóa thẻ khi không còn sử dụng.

---

## 🧩 Từ khóa hôm nay

### Git Tag
- **Nói dễ hiểu**: Con trỏ tĩnh bất biến dùng để đánh dấu và ghim một mốc phiên bản cụ thể trong lịch sử Git.
- **Ví dụ**: Dùng `git tag v1.0.0` để đánh dấu commit phát hành phiên bản 1.0.0 cho khách hàng.
- **Đừng nhầm**: Tag đứng yên mãi mãi tại commit được gắn, trong khi con trỏ nhánh (branch) tự động tiến lên mỗi khi có commit mới.

### Lightweight Tag
- **Nói dễ hiểu**: Loại thẻ đơn giản nhất trong Git, chỉ là một con trỏ trỏ trực tiếp đến mã hash của commit mà không chứa metadata riêng.
- **Ví dụ**: Gõ `git tag v0.1.0-alpha` để tạo nhanh một thẻ nhẹ đánh dấu bản thử nghiệm nội bộ.
- **Đừng nhầm**: Thẻ nhẹ không lưu tên tác giả, email, ngày tạo hay chữ ký số; nếu cần thông tin phát hành chính thức nên dùng Annotated Tag.

### Push Tags (git push --tags)
- **Nói dễ hiểu**: Lệnh đồng bộ các thẻ tag từ máy cá nhân lên kho lưu trữ từ xa trên máy chủ như GitHub hay GitLab.
- **Ví dụ**: Chạy `git push origin v1.0.0` để đẩy riêng một thẻ, hoặc `git push origin --tags` để đẩy toàn bộ tag lên remote.
- **Đừng nhầm**: Lệnh `git push` thông thường chỉ đẩy nhánh mà không tự động đẩy tag; bạn phải chỉ định rõ tên tag hoặc cờ `--tags`.

---

## 📖 Định nghĩa
`git tag` là công cụ quản lý thẻ phiên bản trong Git, dùng để ghim cố định một mốc thời gian quan trọng trong lịch sử dự án, thường gắn liền với các bản phát hành như `v1.0.0` hay `v2.0.0`.

---

## 💡 Tại sao cần
Khách hàng và người dùng không thể nhớ các chuỗi commit hash phức tạp. `git tag` tạo ra những tên phiên bản rõ ràng, giúp đội ngũ dễ dàng kiểm tra lại chính xác trạng thái code của bản phát hành để tái hiện lỗi hoặc triển khai cập nhật.

---

## 🧠 Mental Model
Hãy hình dung cuốn album ảnh gia đình. Các trang ảnh cứ dài thêm theo thời gian. `git tag` như chiếc kẹp sách bằng đồng bạn kẹp vào đúng trang ảnh "Lễ tốt nghiệp". Dù sau này có thêm hàng trăm bức ảnh mới, bạn chỉ cần mở đúng kẹp sách là tìm thấy ngay.

---

## 📊 Sơ đồ minh họa
```text
Sự khác biệt giữa Branch và Tag:
Nhánh main: Di chuyển liên tục mỗi khi có commit mới!
C1 ──► C2 ──► C3 ──► C4 (HEAD -> main)
        ▲
        └── [Tag: v1.0.0] (Đứng yên vĩnh viễn tại C2!)
```

---

## 🏢 Ví dụ thực tế
Sau khi hoàn thành đợt kiểm thử cuối cùng, trưởng nhóm gõ lệnh `git tag v1.0.0` để gắn nhãn bản phát hành đầu tiên tại commit hiện tại. Sau đó nhóm chạy `git push origin v1.0.0` lên GitHub. Hệ thống tự động tạo mục Release cho phép khách hàng tải mã nguồn chuẩn xác.

---

## 💻 Command & Cú pháp
```bash
git tag
git tag <tên-thẻ>
git tag <tên-thẻ> <commit-hash>
git push origin <tên-thẻ>
git push origin --tags
git tag -d <tên-thẻ>
```

---

## 🔍 Giải thích command
- `git tag`: Liệt kê danh sách toàn bộ các tag đang có trong kho lưu trữ theo thứ tự bảng chữ cái.
- `git tag <tên>`: Tạo một thẻ nhẹ (Lightweight tag) tại commit HEAD hiện tại.
- `git tag <tên> <hash>`: Đánh dấu thẻ cho một commit cụ thể trong quá khứ.
- `git push origin <tên>`: Đẩy thẻ chỉ định lên máy chủ từ xa GitHub (mặc định git push không đẩy tag).
- `git push origin --tags`: Đẩy đồng loạt toàn bộ các tag cục bộ lên máy chủ.
- `git tag -d <tên>`: Xóa một thẻ trên máy tính cá nhân.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ rằng git push thông thường sẽ tự động đẩy tag**: Git cố tình không đẩy tag khi gõ `git push`, bạn phải đẩy tường minh bằng tên tag hoặc cờ `--tags`.
2. **Nhầm lẫn giữa tag và branch**: Cố gắng chuyển sang tag và commit tiếp sẽ rơi vào trạng thái Detached HEAD.
3. **Đặt tên tag tùy tiện**: Đặt tên tag lộn xộn không tuân theo chuẩn Semantic Versioning (như `ban-moi`, `chuan-roi`) gây khó khăn cho CI/CD.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.
1. Liệt kê các tag hiện có trong kho chứa bài tập bằng `git tag`.
2. Tạo một thẻ phiên bản `v0.1.0` tại commit hiện tại bằng `git tag v0.1.0`.
3. Kiểm tra lại danh sách tag để thấy `v0.1.0` xuất hiện.
4. Thử xóa thẻ vừa tạo bằng lệnh `git tag -d v0.1.0` và kiểm tra lại danh sách.

---

## 💡 Hint & mẹo
> Nhớ rằng lệnh `git push` thông thường sẽ KHÔNG tự động đẩy tag lên server, bạn phải dùng `git push origin <tên-tag>` hoặc `git push origin --tags`.

---

## ✅ Validation & Kết quả mong đợi
- Tạo, kiểm tra và quản lý thành công các thẻ phiên bản bằng `git tag`.
- Hiểu rõ sự khác biệt giữa con trỏ nhánh di động và con trỏ tag tĩnh.

---

## ❓ Quiz nhanh
Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh đánh dấu mốc git tag.

---

## 🚀 Thử thách nâng cao
Tại sao việc gõ `git checkout v1.0.0` lại đưa con trỏ của bạn vào trạng thái "Detached HEAD"?

---

## 📝 Tổng kết
- `git tag` tạo mốc tham chiếu tĩnh không bao giờ tự di chuyển.
- Thẻ nhẹ (Lightweight tag) là con trỏ trực tiếp đến commit.
- Phải dùng lệnh push tường minh hoặc `--tags` để đưa thẻ lên GitHub.
