# git tag

---

## 🎯 Mục tiêu
- Hiểu rõ khái niệm và vai trò của Tag trong Git như các mốc đánh dấu phiên bản bất biến.
- Phân biệt rõ ràng giữa con trỏ nhánh (Branch - di chuyển liên tục) và con trỏ thẻ (Tag - đứng yên vĩnh viễn).
- Tạo và quản lý các thẻ Lightweight Tag (Thẻ nhẹ) nhanh chóng.
- Đẩy thẻ lên máy chủ từ xa và xóa thẻ khi không còn sử dụng.

---

## 📖 Định nghĩa
> `git tag` là câu lệnh quản lý thẻ phiên bản trong Git, được sử dụng để đánh dấu và ghim cố định một mốc thời gian quan trọng cụ thể trong lịch sử của kho lưu trữ (thường là các phiên bản phát hành sản phẩm như `v1.0.0`, `v2.1.0-beta`). Trong khi con trỏ nhánh liên tục tiến về phía trước mỗi khi có commit mới, con trỏ Tag là một mốc tham chiếu tĩnh bất biến vĩnh cửu gắn chặt vào một commit duy nhất.

---

## 🤔 Tại sao cần?
Trong quản lý dự án phần mềm chuyên nghiệp, khách hàng và bộ phận vận hành chỉ quan tâm đến các phiên bản phát hành cụ thể chứ không thể nhớ các chuỗi mã băm commit hash phức tạp. `git tag` cung cấp các mốc định danh rõ ràng, dễ nhớ, giúp đội ngũ có thể dễ dàng kiểm tra lại chính xác trạng thái mã nguồn của phiên bản đã bán cho khách hàng cách đây 6 tháng để tái hiện lỗi hoặc phát hành bản vá bảo mật khẩn cấp.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung cuốn album ảnh kỷ niệm của gia đình. Các trang ảnh cứ nối tiếp nhau tăng dần theo thời gian (chuỗi commit trên nhánh). `git tag` giống như một chiếc kẹp sách bằng đồng đẹp mắt bạn kẹp vào đúng trang ảnh "Ngày cưới của bố mẹ" hoặc "Lễ tốt nghiệp đại học". Dù cuốn album có thêm hàng trăm bức ảnh mới trong tương lai, mỗi khi cần tìm lại khoảnh khắc trọng đại đó, bạn chỉ cần mở đúng chiếc kẹp sách là thấy ngay.

---

## 🖼 Sơ đồ
```text
Sự khác biệt giữa Branch và Tag:
Nhánh main: Di chuyển liên tục khi có commit mới!
C1 ──► C2 ──► C3 ──► C4 (HEAD -> main)
        ▲
        └── [Tag: v1.0.0] (Đứng yên mãi mãi tại C2!)
```

---

## 🌎 Ví dụ thực tế
Sau 3 tháng miệt mài lập trình, đội ngũ kỹ thuật quyết định đóng gói phát hành phiên bản đầu tiên của ứng dụng di động. Trưởng nhóm kiểm tra toàn bộ các bài test trên nhánh main đều chuyển màu xanh lá. Trưởng nhóm mở terminal và gõ câu lệnh: `git tag v1.0.0`. Một thẻ đánh dấu phiên bản được gắn ngay tại commit hiện tại. Trưởng nhóm đẩy thẻ lên máy chủ GitHub bằng lệnh `git push origin v1.0.0`. Trên giao diện GitHub, một mục Release mới xuất hiện với mã nguồn của phiên bản v1.0.0 sẵn sàng cho người dùng tải về.

---

## 💻 Command
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
1. **Nghĩ rằng git push thông thường sẽ tự động đẩy tag**:  Git cố tình không đẩy tag khi gõ `git push`, bạn phải đẩy tường minh bằng tên tag hoặc cờ `--tags`.
2. **Nhầm lẫn giữa tag và branch**:  Cố gắng chuyển sang tag và commit tiếp (sẽ rơi vào trạng thái Detached HEAD).
3. **Đặt tên tag lộn xộn không tuân theo quy chuẩn Semantic Versioning (ví dụ đặt tag**:  `ban-moi`, `chuan-roi`).

---

## 🧪 Lab
1. Liệt kê các tag hiện có bằng `git tag`.
2. Tạo một thẻ phiên bản `v0.1.0` tại commit hiện tại bằng `git tag v0.1.0`.
3. Kiểm tra lại danh sách tag để thấy `v0.1.0` xuất hiện.
4. Thử xóa thẻ bằng lệnh `git tag -d v0.1.0` và kiểm tra lại.

---

## 💡 Hint
> Nhớ rằng lệnh `git push` thông thường sẽ KHÔNG tự động đẩy tag lên server, bạn phải dùng `git push origin <tên-tag>`.

---

## ✅ Validation
- Tạo, kiểm tra và quản lý thành công các thẻ phiên bản bằng git tag.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh đánh dấu mốc git tag.

---

## 🔥 Challenge
Tại sao việc gõ `git checkout v1.0.0` lại đưa con trỏ của bạn vào trạng thái "Detached HEAD"?

---

## 📚 Tổng kết
- `git tag` đánh dấu các cột mốc phiên bản quan trọng trong lịch sử dự án.
- Tag là con trỏ tĩnh bất biến gắn chặt vào commit, không di chuyển như branch.
- Cần dùng `git push origin <tag-name>` hoặc `git push origin --tags` để xuất bản thẻ lên remote.
