# Quản lý nhánh với git branch

---

## 🎯 Mục tiêu
- Sử dụng thành thạo câu lệnh `git branch` cùng các cờ tùy chọn nâng cao: `-a`, `-r`, `-vv`, `--merged`.
- Xóa nhánh an toàn với cờ `-d` và xóa nhánh cưỡng chế với cờ `-D`.
- Đổi tên nhánh cục bộ nhanh chóng bằng cờ `-m`.
- Kiểm soát và dọn dẹp các nhánh đã hợp nhất để giữ kho lưu trữ luôn tinh gọn.

---

## 📖 Định nghĩa
> `git branch` là câu lệnh quản trị đa năng phục vụ việc tạo mới, liệt kê danh sách, đổi tên, kiểm tra trạng thái và xóa bỏ các nhánh trong kho lưu trữ Git cục bộ. Khi chạy không kèm đối số, lệnh hiển thị toàn bộ các nhánh cục bộ hiện hữu trên máy tính của bạn. Khi kết hợp với các cờ tùy chọn chuyên dụng, `git branch` trở thành công cụ đắc lực giúp bạn duy trì một cấu trúc kho chứa sạch sẽ và chuyên nghiệp.

---

## 🤔 Tại sao cần?
Trong các dự án quy mô lớn, mỗi tuần có thể có hàng chục nhánh tính năng và nhánh sửa lỗi được tạo ra. Nếu không biết cách quản lý và dọn dẹp thường xuyên, danh sách nhánh của bạn sẽ phình to thành hàng trăm mục rác, gây khó khăn cho việc định vị nhánh cần làm và tăng nguy cơ thao tác nhầm lẫn. Nắm vững lệnh `git branch` giúp bạn làm chủ quy trình kiểm soát phiên bản và tự tin phối hợp nhóm trơn tru.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung `git branch` giống như cuốn sổ danh bạ quản lý các đường dây điện thoại nội bộ trong một tòa nhà văn phòng hiện đại. Người quản trị mạng điện thoại có thể mở danh bạ ra xem phòng ban nào đang có máy nhánh (liệt kê), đăng ký thêm một số máy nội bộ mới cho nhân viên mới vào (tạo nhánh), đổi tên phòng ban khi tái cơ cấu (đổi tên nhánh), và cắt bỏ đường dây của các dự án đã kết thúc (xóa nhánh).

---

## 🖼 Sơ đồ
```text
Quản lý vòng đời nhánh với git branch:
Tạo nhánh:       git branch feature-auth
Xem danh sách:   git branch -vv
Đổi tên nhánh:   git branch -m old-name new-name
Xóa an toàn:     git branch -d feature-auth (chỉ xóa khi đã merge)
Xóa cưỡng chế:   git branch -D feature-auth (xóa bất kể chưa merge)
```

---

## 🌎 Ví dụ thực tế
Sau khi tính năng giỏ hàng đã được gộp thành công vào nhánh main và đưa lên máy chủ kiểm thử, kỹ sư Nam muốn dọn dẹp máy tính cá nhân để chuẩn bị không gian làm việc cho sprint tiếp theo. Nam chạy lệnh `git branch --merged` để kiểm tra danh sách toàn bộ các nhánh đã được tích hợp trọn vẹn vào main. Thấy nhánh feature-cart xuất hiện trong danh sách an toàn, Nam tự tin gõ lệnh: `git branch -d feature-cart`. Git lập tức thông báo xóa thành công con trỏ nhánh, giúp danh sách nhánh cục bộ của Nam luôn gọn gàng, tinh tươm và không để lại bất kỳ dữ liệu rác thừa nào gây nhầm lẫn khi làm việc.

---

## 💻 Command
```bash
git branch
git branch -a
git branch -vv
git branch -m <tên-cũ> <tên-mới>
git branch -d <tên-nhánh>
git branch -D <tên-nhánh>
```

---

## 🔍 Giải thích command
- `git branch`: Liệt kê tất cả các nhánh cục bộ hiện có trong kho lưu trữ.
- `git branch -a`: Liệt kê tất cả các nhánh bao gồm cả nhánh cục bộ và nhánh theo dõi từ xa (remote-tracking branches).
- `git branch -vv`: Hiển thị chi tiết commit đỉnh, thông điệp commit và mối quan hệ đồng bộ với nhánh remote upstream.
- `git branch -m <tên-cũ> <tên-mới>`: Đổi tên nhánh chỉ định sang tên mới chuẩn mực.
- `git branch -d <nhánh>`: Xóa nhánh có kiểm tra an toàn (từ chối xóa nếu nhánh chứa commit chưa được merge).
- `git branch -D <nhánh>`: Xóa nhánh cưỡng chế (tương đương `--delete --force`), bỏ qua kiểm tra an toàn.

---

## ⚠️ Sai lầm phổ biến
1. **Cố gắng xóa nhánh mà mình đang đứng trực tiếp**:  Git sẽ báo lỗi từ chối; bạn phải switch sang nhánh khác (như main) trước khi xóa.
2. **Dùng cờ -D bừa bãi**:  Vô tình xóa mất nhánh chứa các dòng code chưa kịp merge mà không hay biết.
3. **Quên dọn dẹp nhánh sau khi đã merge**:  Khiến danh sách nhánh tích tụ hàng trăm mục cũ gây rối mắt.

---

## 🧪 Lab
1. Tạo một nhánh thử nghiệm bằng lệnh `git branch temp-test`.
2. Đổi tên nhánh vừa tạo thành `experiment` bằng lệnh `git branch -m temp-test experiment`.
3. Chạy `git branch` để xác nhận tên mới xuất hiện trong danh sách.
4. Xóa nhánh đó an toàn bằng câu lệnh `git branch -d experiment`.

---

## 💡 Hint
> Hãy đứng ở nhánh `main` khi bạn muốn xóa các nhánh tính năng phụ.

---

## ✅ Validation
- Xác nhận nhánh thử nghiệm đã được dọn dẹp sạch sẽ khỏi kết quả `git branch`.

---

## ❓ Quiz
Hãy hoàn thành bài trắc nghiệm dưới đây về các thao tác quản lý nhánh với git branch.

---

## 🔥 Challenge
Tìm hiểu cách sử dụng lệnh `git branch --merged` và `git branch --no-merged` để tự động hóa dọn dẹp kho chứa.

---

## 📚 Tổng kết
- `git branch` là lệnh cốt lõi để tạo, xem, đổi tên và xóa các nhánh cục bộ.
- Dùng `-d` để xóa an toàn sau khi đã merge, dùng `-D` để xóa cưỡng chế khi muốn vứt bỏ code nháp.
- Không thể xóa nhánh mà bạn hiện đang đứng làm việc trực tiếp.
