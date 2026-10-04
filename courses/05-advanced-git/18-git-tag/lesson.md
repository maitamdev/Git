# git tag

---

## 🎯 Mục tiêu
- Hiểu tag là tên tham chiếu tới một đối tượng Git, thường dùng để đánh dấu phiên bản.
- Phân biệt branch thường di chuyển khi có commit mới trên đó, còn tag không tự di chuyển.
- Tạo và quản lý các thẻ Lightweight Tag (Thẻ nhẹ) nhanh chóng.
- Biết cách đẩy/xóa tag từ xa trong Git thật và phân biệt với thao tác tag cục bộ.

---

## 🧩 Từ khóa hôm nay

### Git Tag
- **Nói dễ hiểu**: Tên tham chiếu tới một đối tượng Git, thường dùng để đánh dấu commit phiên bản.
- **Ví dụ**: Dùng `git tag v1.0.0` để đánh dấu commit phát hành phiên bản 1.0.0 cho khách hàng.
- **Đừng nhầm**: Tag không tự tiến lên khi có commit mới, nhưng vẫn có thể bị xóa hoặc di chuyển thủ công.

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
`git tag` tạo hoặc liệt kê tên tag trỏ tới commit hay đối tượng Git khác. Tag không tự tiến theo nhánh, nhưng vẫn có thể bị xóa hoặc force-update; vì vậy đừng xem nó là bất biến về mặt kỹ thuật.

---

## 🤔 Tại sao cần?
Khách hàng và người dùng không thể nhớ các chuỗi commit hash phức tạp. `git tag` tạo ra những tên phiên bản rõ ràng, giúp đội ngũ dễ dàng kiểm tra lại chính xác trạng thái code của bản phát hành để tái hiện lỗi hoặc triển khai cập nhật.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung cuốn album ảnh gia đình. Các trang ảnh cứ dài thêm theo thời gian. `git tag` như chiếc kẹp sách bằng đồng bạn kẹp vào đúng trang ảnh "Lễ tốt nghiệp". Dù sau này có thêm hàng trăm bức ảnh mới, bạn chỉ cần mở đúng kẹp sách là tìm thấy ngay.

---

## 🖼 Sơ đồ
```text
Sự khác biệt giữa Branch và Tag:
Nhánh main: Di chuyển liên tục mỗi khi có commit mới!
C1 ──► C2 ──► C3 ──► C4 (HEAD -> main)
        ▲
        └── [Tag: v1.0.0] (không tự di chuyển; có thể được cập nhật thủ công)
```

---

## 🌎 Ví dụ thực tế
Sau khi hoàn thành đợt kiểm thử cuối cùng, trưởng nhóm gõ `git tag v1.0.0` để gắn nhãn commit hiện tại. Trong Git thật, nhóm có thể đẩy tag bằng `git push origin v1.0.0`. Tạo GitHub Release là bước riêng, có thể làm thủ công hoặc qua automation của dự án.

---

## 💻 Command
```bash
git tag
git tag <tên-thẻ>
git tag <tên-thẻ> <commit-hash>
git tag -d <tên-thẻ>
```

Trong Git thật, có thể đẩy tag cụ thể bằng `git push origin <tên-thẻ>` hoặc các tag bằng `git push origin --tags`. Simulator của khóa học chưa mô phỏng push tag.

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
1. **Cho rằng `git push` luôn gửi mọi tag**: Hành vi phụ thuộc cấu hình và tùy chọn; khi cần, hãy đẩy rõ tên tag hoặc dùng `--tags` theo chính sách repo.
2. **Nhầm lẫn giữa tag và branch**: Cố gắng chuyển sang tag và commit tiếp sẽ rơi vào trạng thái Detached HEAD.
3. **Đặt tên tag tùy tiện**: Đặt tên tag lộn xộn không tuân theo chuẩn Semantic Versioning (như `ban-moi`, `chuan-roi`) gây khó khăn cho CI/CD.

---

## 🧪 Lab
Hãy cùng tôi mở terminal và thực hiện các bước thực hành trực quan sau:
1. Liệt kê các tag hiện có trong kho chứa bài tập bằng `git tag`.
2. Tạo thẻ thử nghiệm `demo-v0.1` tại commit hiện tại bằng `git tag demo-v0.1`.
3. Kiểm tra lại danh sách tag để thấy `demo-v0.1` xuất hiện.
4. Xóa thẻ thử nghiệm bằng `git tag -d demo-v0.1` và kiểm tra lại danh sách.

---

## 💡 Hint
> Push tag tường minh bằng `git push origin <tên-tag>`; tạo GitHub Release là thao tác riêng.

---

## ✅ Validation
- Tạo, kiểm tra và quản lý thành công các thẻ phiên bản bằng `git tag`.
- Hiểu branch tiến theo commit mới; tag vẫn trỏ tới mục tiêu ban đầu cho đến khi ai đó thay đổi tag.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh đánh dấu mốc git tag.

---

## 🔥 Challenge
Tại sao việc gõ `git checkout v1.0.0` lại đưa con trỏ của bạn vào trạng thái "Detached HEAD"?

---

## 📚 Tổng kết
- `git tag` tạo mốc tham chiếu không tự di chuyển theo commit mới trên branch.
- Thẻ nhẹ (Lightweight tag) là con trỏ trực tiếp đến commit.
- Phải dùng lệnh push tường minh hoặc `--tags` để đưa thẻ lên GitHub.
