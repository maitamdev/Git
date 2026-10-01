# Đối tượng Tag: Đánh dấu phiên bản có chú thích (Annotated Tag)

---

## 🎯 Mục tiêu
- Phân biệt rõ ràng giữa Lightweight Tag (thẻ rút gọn) và Annotated Tag (thẻ có chú thích lưu thành đối tượng riêng).
- Khám phá cấu trúc của đối tượng Tag trong cơ sở dữ liệu: object trỏ tới, type, tag name, tagger và message.
- Sử dụng các lệnh plumbing để kiểm tra tính toàn vẹn và chữ ký số GPG gắn trên đối tượng Tag.
- Hiểu vị trí lưu trữ vật lý của tag trong `.git/refs/tags/`.

---

## 🧩 Từ khóa hôm nay

### Annotated Tag Object
- **Nói dễ hiểu**: Loại đối tượng Git độc lập lưu trong `.git/objects/` chứa thông tin đầy đủ về người ký duyệt, ngày giờ, thông điệp và con trỏ trỏ tới đối tượng đích.
- **Ví dụ**: Tạo bằng lệnh `git tag -a v1.0.0 -m "Release v1.0.0"` sinh ra mã băm đối tượng riêng trong database.
- **Đừng nhầm**: Không chỉ là một con trỏ commit đơn thuần; đây là đối tượng đầy đủ có metadata kiểm toán không thể chối cãi.

### Lightweight Tag Reference
- **Nói dễ hiểu**: Thẻ rút gọn chỉ gồm duy nhất một file văn bản nhỏ trong `.git/refs/tags/` ghi mã SHA-1 của commit mục tiêu, không tạo đối tượng mới.
- **Ví dụ**: Tạo bằng lệnh `git tag v1.0.0-draft` chỉ đóng vai trò như một nhãn bookmark tạm thời.
- **Đừng nhầm**: Khi chạy `git cat-file -t` trên lightweight tag, kết quả trả về là `commit` chứ không phải `tag`.

### Tagger Metadata
- **Nói dễ hiểu**: Trường dữ liệu ghi lại danh tính người tạo thẻ và dấu thời gian thực hiện gắn thẻ phiên bản.
- **Ví dụ**: Dòng `tagger Le Hoang Nam <nam@company.com> 1769817600 +0700` bên trong đối tượng Tag.
- **Đừng nhầm**: Có thể khác với author của commit; một commit cũ nhiều tháng trước có thể được một release manager gắn tag phát hành vào ngày hôm nay.

---

## 📖 Định nghĩa
Trong Git, có hai loại Tag: Lightweight Tag (chỉ là một con trỏ tham chiếu đơn giản ghi thẳng mã băm của commit vào một tệp văn bản trong `.git/refs/tags/`) và Annotated Tag (được lưu trữ như một Đối tượng Tag chính thức trong Object Database). Đối tượng Tag chứa một con trỏ trỏ tới đối tượng mục tiêu (thường là commit, nhưng có thể là tree hoặc blob), tên thẻ phiên bản, thông tin người gắn thẻ (Tagger), dấu thời gian và thông điệp chú thích phát hành.

---

## 💡 Tại sao cần
Khi đánh dấu một cột mốc phát hành phiên bản phần mềm quan trọng (như v1.0.0 hay v2.4.0), bạn cần lưu giữ vĩnh viễn ai là người phê duyệt phát hành phiên bản đó, vào thời gian nào, cùng với ghi chú phát hành (Release Notes) chi tiết và chữ ký số mã hóa chống giả mạo. Annotated Tag cung cấp đầy đủ các thuộc tính này như một đối tượng bất biến độc lập trong cơ sở dữ liệu, đảm bảo bằng chứng xác thực không thể bị chối bỏ.

---

## 🧠 Mental Model
Hãy so sánh việc dán một mẩu giấy nhớ tạm thời màu vàng lên bìa cuốn sách (Lightweight Tag: chỉ ghi tên người đọc rồi dán tạm thời lên bìa) với việc đóng một con dấu sáp niêm phong hoàng gia chính thức có khắc chữ ký, gia huy và ngày tháng của đức vua lên văn kiện quốc gia (Annotated Tag: một thực thể trang trọng vĩnh viễn không thể làm giả, được lưu trữ thành một đối tượng độc lập có giá trị pháp lý trong lịch sử).

---

## 📊 Sơ đồ minh họa
```text
So sánh Lightweight Tag vs Annotated Tag:
1. Lightweight Tag: (Không tạo đối tượng trong objects/)
   .git/refs/tags/v1.0-light ──► [Commit Object: 7a8b9c4d]

2. Annotated Tag: (Tạo hẳn một Tag Object độc lập)
   .git/refs/tags/v1.0.0 ──► [Tag Object: e1f2a3b4]
                              │
                              ├── object: 7a8b9c4d (Trỏ tới Commit)
                              ├── type: commit
                              ├── tag: v1.0.0
                              ├── tagger: Tran Van B <b@dev.com>
                              └── message: Release version 1.0.0
```

---

## 🏢 Ví dụ thực tế
Nhóm phát hành chuẩn bị tung ra phiên bản thương mại `v2.0.0`. Kỹ sư trưởng chạy lệnh: `git tag -a v2.0.0 -m "Official Production Release 2.0.0"`. Khi kiểm tra trong thư mục `.git/refs/tags/v2.0.0`, tệp tin này không trỏ thẳng vào commit, mà trỏ tới một mã băm đối tượng mới `9d8c7b6a`. Kỹ sư chạy `git cat-file -p 9d8c7b6a` và thấy một bảng dữ liệu trang trọng: dòng 1 trỏ tới commit phát hành; dòng 2 ghi type commit; dòng 3 ghi tag v2.0.0; dòng 4 ghi thông tin tagger kèm thời gian; và cuối cùng là thông điệp phát hành chính thức. Đây là bằng chứng không thể chối cãi về cột mốc lịch sử của sản phẩm.

---

## 💻 Command & Cú pháp
```bash
# Tạo Annotated Tag chính thức
git tag -a v1.0.0 -m "Release version 1.0.0"

# Tạo Lightweight Tag tạm thời
git tag v1.0.0-temp

# Kiểm tra loại đối tượng của cả hai thẻ
git cat-file -t v1.0.0       # Trả về: tag
git cat-file -t v1.0.0-temp  # Trả về: commit

# Xem nội dung chi tiết của đối tượng Annotated Tag
git cat-file -p v1.0.0
```

---

## 🔍 Giải thích command
- `git tag -a <name> -m <msg>`: Tạo đối tượng Tag độc lập trong `.git/objects/` và tạo con trỏ trong `.git/refs/tags/`.
- `git cat-file -t v1.0.0`: Trả về chữ `tag` vì đây là đối tượng độc lập.
- `git cat-file -t v1.0.0-temp`: Trả về chữ `commit` vì lightweight tag trỏ thẳng vào commit mà không qua đối tượng trung gian.
- `git cat-file -p v1.0.0`: Hiển thị trường `object`, `type`, `tag`, `tagger` và thông điệp phát hành.

---

## ⚠️ Sai lầm phổ biến
1. **Dùng Lightweight Tag cho bản phát hành chính thức**: Làm mất thông tin người phát hành và thông điệp ghi chú release.
2. **Nghĩ rằng Tag chỉ có thể trỏ vào Commit**: Về mặt cấu trúc Git internals, một đối tượng Tag có thể trỏ tới bất kỳ đối tượng nào (kể cả Blob hay Tree).
3. **Xóa tag cục bộ nhưng quên đẩy lên remote**: Người khác khi pull sẽ đồng bộ lại tag cũ nếu không chạy lệnh `git push origin --delete <tagname>`.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.

1. **Bước 1**: Tạo một Lightweight Tag bằng lệnh `git tag v0.1-beta`.
2. **Bước 2**: Tạo một Annotated Tag bằng lệnh `git tag -a v1.0.0 -m "Production Release 1.0"`.
3. **Bước 3**: Chạy lệnh `git cat-file -t v0.1-beta` và ghi nhận kết quả là `commit`.
4. **Bước 4**: Chạy lệnh `git cat-file -t v1.0.0` và chứng kiến kết quả trả về là `tag`, sau đó chạy `git cat-file -p v1.0.0` để đọc toàn bộ metadata.

---

## 💡 Hint & mẹo
> Luôn luôn sử dụng cờ `-a` kèm theo thông điệp `-m` khi gắn thẻ phiên bản phát hành phần mềm chuyên nghiệp. Nếu muốn bảo mật tối đa, hãy dùng thêm cờ `-s` để ký số GPG.

---

## ✅ Validation & Kết quả mong đợi
- Lệnh `git cat-file -t v1.0.0` hiển thị chính xác chữ `tag`.
- Lệnh `git cat-file -p v1.0.0` hiển thị đầy đủ thông tin: đối tượng commit được trỏ tới, tag name, thông tin tagger và release message.

---

## ❓ Quiz nhanh
Cùng làm bài kiểm tra về bản chất của đối tượng Tag trong Git trong phần trắc nghiệm bên dưới.

---

## 🚀 Thử thách nâng cao
Làm thế nào để gắn chữ ký số mật mã học GPG vào một Annotated Tag bằng lệnh `git tag -s` và xác minh chữ ký đó bằng lệnh `git tag -v`?

---

## 📝 Tổng kết
- Lightweight Tag chỉ là một con trỏ văn bản đơn giản trỏ trực tiếp tới một commit.
- Annotated Tag tạo ra một đối tượng Tag độc lập trong Object Database với đầy đủ metadata và thông điệp.
- Annotated Tag là tiêu chuẩn bắt buộc cho các cột mốc phát hành phiên bản phần mềm chuyên nghiệp.
- Mọi con trỏ tag đều được lưu trữ trong thư mục `.git/refs/tags/`.
