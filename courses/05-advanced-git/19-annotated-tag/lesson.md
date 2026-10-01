# Annotated Tag

---

## 🎯 Mục tiêu
- Phân biệt rõ ràng giữa Lightweight Tag (thẻ nhẹ) và Annotated Tag (thẻ chú giải đầy đủ).
- Tạo thẻ Annotated Tag chứa đầy đủ tên tác giả, email, ngày giờ và thông điệp phát hành bằng cờ `-a`.
- Kiểm tra thông tin chi tiết của một thẻ chú giải bằng câu lệnh `git show`.
- Hiểu rõ vì sao các bản phát hành sản phẩm chính thức (Production Releases) luôn bắt buộc dùng Annotated Tag.

---

## 🧩 Từ khóa hôm nay

### Annotated Tag (git tag -a)
- **Nói dễ hiểu**: Đối tượng thẻ đầy đủ trong Git, lưu trữ riêng tên tác giả, email, ngày tạo, thông điệp phát hành và chữ ký số.
- **Ví dụ**: Dùng `git tag -a v2.0.0 -m "Release version 2.0.0"` để gắn thẻ phiên bản phát hành chính thức cho sản phẩm.
- **Đừng nhầm**: Khác với thẻ nhẹ chỉ là con trỏ mã hash, thẻ chú giải tạo ra một Git object độc lập với mã băm SHA-1 riêng.

### Tagger Metadata
- **Nói dễ hiểu**: Phần siêu dữ liệu chứng thực ghi rõ ai là người tạo thẻ, địa chỉ email và thời điểm chính xác tính đến từng giây.
- **Ví dụ**: Chạy `git show v2.0.0` để xem dòng `Tagger: John Doe <john@company.com>` và ngày giờ ký duyệt.
- **Đừng nhầm**: Tagger (người gắn thẻ phiên bản) có thể khác với Author (tác giả viết commit ban đầu).

### GPG Signed Tag (git tag -s)
- **Nói dễ hiểu**: Thẻ chú giải được mã hóa và ký bằng chữ ký số GPG cá nhân để chống giả mạo danh tính tác giả.
- **Ví dụ**: Gõ `git tag -s v2.1.0 -m "Verified release"` để bảo đảm phiên bản tải về thực sự được ký bởi trưởng nhóm.
- **Đừng nhầm**: Cần cài đặt và thiết lập khóa bí mật GPG trên máy trước khi sử dụng cờ `-s`.

---

## 📖 Định nghĩa
Annotated Tag (Thẻ chú giải) là một đối tượng độc lập trong cơ sở dữ liệu của Git, được lưu trữ cùng siêu dữ liệu đầy đủ gồm tên người tạo, email, ngày giờ, thông điệp phát hành và chữ ký số chống giả mạo.

---

## 💡 Tại sao cần
Khi phát hành phần mềm thương mại, tính minh bạch và truy xuất nguồn gốc là yêu cầu sống còn. Annotated Tag cung cấp bằng chứng xác thực rõ ràng về người phê duyệt, thời điểm phát hành và danh sách tính năng cho hệ thống CI/CD và khách hàng.

---

## 🧠 Mental Model
Nếu Lightweight Tag giống mẩu giấy ghi chú Post-it dán tạm lên tài liệu, thì Annotated Tag như tấm bằng khen có dấu mộc công chứng. Trên đó ghi rõ người phê duyệt, con dấu số pháp lý, thời điểm cấp bằng và nội dung tuyên cáo không thể chối cãi.

---

## 📊 Sơ đồ minh họa
```text
Cấu trúc đối tượng của Annotated Tag trong Git:
┌────────────────────────────────────────────────────────┐
│ Tag Object (Mã băm SHA-1 độc lập)                      │
│ Tagger: Nguyen Van A <a@company.com>                   │
│ Date:   Wed Sep 30 14:00:00 2026                       │
│ Message: Release version 2.0.0 with AI chatbot engine  │
│ GPG Signature: (Chữ ký số chống giả mạo nếu có)        │
│ Object trỏ tới: Commit C10 (hash 8f9e0a)              │
└────────────────────────────────────────────────────────┘
```

---

## 🏢 Ví dụ thực tế
Trước khi đưa cổng thanh toán lên production, kỹ sư trưởng An tạo thẻ chú giải bằng lệnh `git tag -a v2.0.0 -m "Release v2.0.0: Full payment integration"`. Khi nhóm bảo mật kiểm tra bằng `git show v2.0.0`, toàn bộ thông tin người duyệt, thời gian và mô tả hiển thị chi tiết, tạo niềm tin tuyệt đối cho dự án.

---

## 💻 Command & Cú pháp
```bash
git tag -a <tên-thẻ> -m "<thông-điệp-phát-hành>"
git tag -s <tên-thẻ> -m "<thông-điệp>"
git show <tên-thẻ>
```

---

## 🔍 Giải thích command
- `git tag -a <tên> -m "<msg>"`: Tạo thẻ chú giải với thông điệp phát hành trực tiếp trên dòng lệnh.
- `git tag -s <tên> -m "<msg>"`: Tạo thẻ chú giải có ký số bảo mật bằng khóa GPG bí mật của lập trình viên.
- `git show <tên-thẻ>`: Hiển thị toàn bộ siêu dữ liệu của thẻ cùng với diff của commit mà thẻ đang trỏ tới.

---

## ⚠️ Sai lầm phổ biến
1. **Dùng thẻ nhẹ cho bản phát hành chính thức**: Làm thiếu mất thông tin kiểm toán quan trọng về người phát hành và ghi chú phát hành.
2. **Quên cờ `-m` khi dùng `-a`**: Khiến Git mở trình soạn thảo văn bản mặc định (Vim/Nano) làm gián đoạn dòng lệnh nếu bạn chưa quen thoát editor.
3. **Hiểu nhầm về kích thước**: Annotated tag chỉ là một object nhỏ vài trăm bytes trong thư mục `.git`, hoàn toàn không ảnh hưởng tới hiệu năng dự án.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.
1. Tạo một Annotated tag với thông điệp đầy đủ bằng `git tag -a v1.0.0 -m "Bản phát hành chính thức v1.0.0"`.
2. Chạy lệnh `git show v1.0.0` và quan sát thông tin Tagger, Date và Message.
3. So sánh kết quả hiển thị của `git show` giữa thẻ nhẹ và thẻ chú giải.
4. Đẩy thẻ lên GitHub bằng `git push origin v1.0.0`.

---

## 💡 Hint & mẹo
> Luôn luôn sử dụng cờ `-a` (Annotated) cho các mốc phát hành chính thức trong môi trường doanh nghiệp và CI/CD.

---

## ✅ Validation & Kết quả mong đợi
- Tạo thành công Annotated tag có đầy đủ metadata và kiểm tra chi tiết bằng `git show`.
- Phân biệt rõ ràng sự khác biệt giữa cấu trúc đối tượng của Lightweight tag và Annotated tag.

---

## ❓ Quiz nhanh
Hãy làm bài kiểm tra trắc nghiệm dưới đây về thẻ chú giải Annotated Tag.

---

## 🚀 Thử thách nâng cao
Nêu sự khác biệt sâu bên trong thư mục `.git/refs/tags/` và `.git/objects/` giữa một Lightweight tag và một Annotated tag.

---

## 📝 Tổng kết
- Annotated Tag là một đối tượng Git thực thụ chứa đầy đủ metadata và thông điệp.
- Giúp truy vết kiểm toán rõ ràng ai là người tạo thẻ và vào thời điểm nào.
- Dùng `git show <tag>` để xem toàn bộ thông tin chi tiết của thẻ chú giải.
