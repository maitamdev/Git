# Annotated Tag

---

## 🎯 Mục tiêu
- Phân biệt rõ ràng giữa Lightweight Tag (thẻ nhẹ) và Annotated Tag (thẻ chú giải đầy đủ).
- Tạo thẻ Annotated Tag chứa đầy đủ tên tác giả, email, ngày giờ và thông điệp phát hành bằng cờ `-a`.
- Kiểm tra thông tin chi tiết của một thẻ chú giải bằng câu lệnh `git show`.
- Biết annotated tag lưu tagger và thông điệp; nhiều dự án dùng loại này cho release, nhưng quy định tùy nhóm.

---

## 🧩 Từ khóa hôm nay

### Annotated Tag (git tag -a)
- **Nói dễ hiểu**: Đối tượng thẻ riêng trong Git, lưu người tạo thẻ, email, ngày tạo và thông điệp. Chữ ký số chỉ có nếu dùng tùy chọn ký.
- **Ví dụ**: Dùng `git tag -a v2.0.0 -m "Release version 2.0.0"` để gắn thẻ phiên bản phát hành chính thức cho sản phẩm.
- **Đừng nhầm**: Khác với thẻ nhẹ chỉ là con trỏ mã hash, thẻ chú giải tạo ra một Git object độc lập với mã băm SHA-1 riêng.

### Tagger Metadata
- **Nói dễ hiểu**: Thông tin ghi ai tạo thẻ, địa chỉ email và thời điểm tạo. Đây là thông tin nhận dạng, không tự nó chứng minh người đó đã được xác thực.
- **Ví dụ**: Chạy `git show v2.0.0` để xem dòng `Tagger: John Doe <john@company.com>` cùng ngày tạo.
- **Đừng nhầm**: Tagger (người gắn thẻ phiên bản) có thể khác với Author (tác giả viết commit ban đầu).

### GPG Signed Tag (git tag -s)
- **Nói dễ hiểu**: Thẻ chú giải có chữ ký số tạo bằng khóa đã cấu hình. Người nhận có thể kiểm tra chữ ký và khóa công khai tương ứng.
- **Ví dụ**: Trong repo Git thật đã cấu hình khóa ký, chạy `git tag -s v2.1.0 -m "Signed release"`, rồi xác minh chữ ký theo quy trình của nhóm.
- **Đừng nhầm**: Cần cài đặt và thiết lập khóa bí mật GPG trên máy trước khi sử dụng cờ `-s`.

---

## 📖 Định nghĩa
Annotated Tag (thẻ có chú giải) là object riêng chứa tagger, ngày giờ và thông điệp; chữ ký số chỉ có khi tạo tag có ký như `git tag -s` và đã cấu hình khóa phù hợp.

---

## 🤔 Tại sao cần?
Khi phát hành, nhóm có thể dùng annotated tag để lưu người tạo thẻ, thời điểm và ghi chú phiên bản. Tag hỗ trợ truy xuất nguồn gốc; muốn xác minh danh tính bằng mật mã thì cần tag có chữ ký và kiểm tra chữ ký theo chính sách của nhóm.

---

## 🧠 Mental Model (Mô hình tư duy)
Lightweight tag giống một dấu trang trỏ tới commit. Annotated tag giống một thẻ ghi chú riêng: nó trỏ tới đối tượng Git và kèm người tạo, ngày cùng thông điệp. Chỉ tag được ký mới có chữ ký số để xác minh.

---

## 🖼 Sơ đồ
```text
Cấu trúc đối tượng của Annotated Tag trong Git:
┌────────────────────────────────────────────────────────┐
│ Tag Object (Mã băm SHA-1 độc lập)                      │
│ Tagger: Nguyen Van A <a@company.com>                   │
│ Date:   (thời điểm tạo tag)                            │
│ Message: Release version 2.0.0 with AI chatbot engine  │
│ GPG Signature: (chỉ có nếu tag được ký)                │
│ Object trỏ tới: Commit C10 (hash 8f9e0a)              │
└────────────────────────────────────────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Trước khi phát hành cổng thanh toán, kỹ sư trưởng An tạo tag chú giải bằng `git tag -a v2.0.0 -m "Release v2.0.0: Full payment integration"`. Khi nhóm kiểm tra bằng `git show v2.0.0`, người tạo tag, ngày và thông điệp hiển thị cùng thông tin commit được gắn. Metadata mô tả người tạo nhưng không tự xác minh danh tính.

---

## 💻 Command
```bash
git tag -a <tên-thẻ> -m "<thông-điệp-phát-hành>"
git show <tên-thẻ>
```

`git tag -s` tạo tag có chữ ký trong Git thật nếu máy đã cấu hình backend và khóa ký; simulator của khóa học hiện không hỗ trợ ký tag.

---

## 🔍 Giải thích command
- `git tag -a <tên> -m "<msg>"`: Tạo thẻ chú giải với thông điệp phát hành trực tiếp trên dòng lệnh.
- `git tag -s <tên> -m "<msg>"`: Tạo thẻ chú giải có ký số bảo mật bằng khóa GPG bí mật của lập trình viên.
- `git show <tên-thẻ>`: Hiển thị toàn bộ siêu dữ liệu của thẻ cùng với diff của commit mà thẻ đang trỏ tới.

---

## ⚠️ Sai lầm phổ biến
1. **Cho rằng mọi dự án đều bắt buộc dùng annotated tag**: Nhiều dự án ưu tiên loại này cho release, nhưng hãy theo quy ước của repo.
2. **Cho rằng `-a` tự ký số tag**: `-a` tạo annotated tag không ký; `-s` yêu cầu khóa ký đã cấu hình.
3. **Hiểu nhầm về kích thước**: Annotated tag chỉ là một object nhỏ vài trăm bytes trong thư mục `.git`, hoàn toàn không ảnh hưởng tới hiệu năng dự án.

---

## 🧪 Lab
Hãy cùng tôi mở terminal và thực hiện các bước thực hành trực quan sau:
1. Trong kho thử nghiệm đã có ít nhất một commit, tạo tag `demo-v0.1` bằng `git tag -a demo-v0.1 -m "Ban thu nghiem"`.
2. Chạy `git show demo-v0.1`; xác định dòng tagger, ngày và thông điệp.
3. Tạo tag nhẹ `demo-light` bằng `git tag demo-light`, rồi so sánh `git show demo-light` với annotated tag.
4. Xóa từng tag thử nghiệm bằng `git tag -d demo-v0.1`, rồi `git tag -d demo-light`. Việc push lên GitHub cần remote và quyền ghi; simulator chưa hỗ trợ.

---

## 💡 Hint
> Kiểm tra quy ước phát hành của repo. Nhiều dự án dùng annotated tag cho release; nếu cần xác minh danh tính bằng mật mã, hãy tìm hiểu quy trình tag ký số của nhóm.

---

## ✅ Validation
- Tạo thành công Annotated tag có đầy đủ metadata và kiểm tra chi tiết bằng `git show`.
- Phân biệt tag nhẹ trỏ thẳng tới đối tượng với annotated tag có object chứa metadata.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về thẻ chú giải Annotated Tag.

---

## 🔥 Challenge
Nêu sự khác biệt sâu bên trong thư mục `.git/refs/tags/` và `.git/objects/` giữa một Lightweight tag và một Annotated tag.

---

## 📚 Tổng kết
- Annotated Tag là một đối tượng Git thực thụ chứa đầy đủ metadata và thông điệp.
- Giúp truy vết kiểm toán rõ ràng ai là người tạo thẻ và vào thời điểm nào.
- Dùng `git show <tag>` để xem toàn bộ thông tin chi tiết của thẻ chú giải.
