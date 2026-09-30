# Đối tượng Tag: Đánh dấu phiên bản có chú thích (Annotated Tag)

---

## 🎯 Mục tiêu bài học
- Phân biệt rõ ràng giữa Lightweight Tag (thẻ rút gọn) và Annotated Tag (thẻ có chú thích lưu thành đối tượng riêng).
- Khám phá cấu trúc của đối tượng Tag trong cơ sở dữ liệu: object trỏ tới, type, tag name, tagger và message.
- Sử dụng các lệnh plumbing để kiểm tra tính toàn vẹn và chữ ký số GPG gắn trên đối tượng Tag.

---

## 📖 Định nghĩa
> Trong Git, có hai loại Tag: Lightweight Tag (chỉ là một con trỏ tham chiếu đơn giản ghi thẳng mã băm của commit vào một tệp văn bản trong `.git/refs/tags/`) và Annotated Tag (được lưu trữ như một Đối tượng Tag chính thức trong Object Database). Đối tượng Tag chứa một con trỏ trỏ tới đối tượng mục tiêu (thường là commit, nhưng có thể là tree hoặc blob), tên thẻ phiên bản, thông tin người gắn thẻ (Tagger), dấu thời gian và thông điệp chú thích phát hành.

---

## 🤔 Tại sao cần?
Khi đánh dấu một cột mốc phát hành phiên bản phần mềm quan trọng (như v1.0.0 hay v2.4.0), bạn cần lưu giữ vĩnh viễn ai là người phê duyệt phát hành phiên bản đó, vào thời gian nào, cùng với ghi chú phát hành (Release Notes) chi tiết và chữ ký số mã hóa chống giả mạo. Annotated Tag cung cấp đầy đủ các thuộc tính này như một đối tượng bất biến độc lập trong cơ sở dữ liệu, đảm bảo bằng chứng xác thực không thể bị chối bỏ.

---

## 🧠 Mental Model & Mô hình tư duy
Hãy so sánh việc dán một mẩu giấy nhớ tạm thời màu vàng lên bìa cuốn sách (Lightweight Tag: chỉ ghi tên người đọc rồi dán tạm thời lên bìa) với việc đóng một con dấu sáp niêm phong hoàng gia chính thức có khắc chữ ký, gia huy và ngày tháng của đức vua lên văn kiện quốc gia (Annotated Tag: một thực thể trang trọng vĩnh viễn không thể làm giả, được lưu trữ thành một đối tượng độc lập có giá trị pháp lý trong lịch sử).

---

## 🖼️ Sơ đồ minh họa
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

## 🌎 Ví dụ thực tế
Nhóm phát hành chuẩn bị tung ra phiên bản thương mại `v2.0.0`. Kỹ sư trưởng chạy lệnh: `git tag -a v2.0.0 -m "Official Production Release 2.0.0"`. Khi kiểm tra trong thư mục `.git/refs/tags/v2.0.0`, tệp tin này không trỏ thẳng vào commit, mà trỏ tới một mã băm đối tượng mới `9d8c7b6a`. Kỹ sư chạy `git cat-file -p 9d8c7b6a` và thấy một bảng dữ liệu trang trọng: dòng 1 trỏ tới commit phát hành; dòng 2 ghi type commit; dòng 3 ghi tag v2.0.0; dòng 4 ghi thông tin tagger kèm thời gian; và cuối cùng là thông điệp phát hành chính thức. Đây là bằng chứng không thể chối cãi về cột mốc lịch sử của sản phẩm.

---

## 💻 Command & Lệnh thao tác
```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git cat-file -p refs/tags/v1.0.0
git cat-file -t v1.0.0
```

---

## 🔍 Giải thích chi tiết lệnh
Lệnh git tag -a tạo một đối tượng Annotated Tag hoàn chỉnh kèm theo thông điệp ghi chú phát hành. Lệnh git cat-file -t in ra định danh loại đối tượng là tag, và git cat-file -p giải mã chi tiết toàn bộ nội dung của đối tượng Tag bao gồm commit mục tiêu, tagger và ngày giờ tạo lập.

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Sử dụng nhầm Lightweight Tag (`git tag v1.0.0`) khi muốn tạo bản phát hành chính thức (phải dùng cờ `-a` để tạo Annotated Tag).**: 
2. **Nghĩ rằng Tag chỉ có thể trỏ tới Commit**:  Trong tầng sâu Git, một Tag Object có thể trỏ tới bất kỳ đối tượng nào, kể cả Blob hoặc Tree.
3. **Xóa thẻ tag cục bộ nhưng quên đẩy lệnh xóa lên remote server khiến tag bị đồng bộ ngược trở lại.**: 

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Tạo một Lightweight Tag bằng lệnh `git tag v0.1-beta`.
2. Tạo một Annotated Tag bằng lệnh `git tag -a v1.0.0 -m "Release 1.0"`.
3. Sử dụng `git cat-file -t` trên cả hai thẻ để quan sát: một bên là `commit`, một bên là `tag`.

---

## 💡 Gợi ý thực hiện (Hint)
> Luôn luôn sử dụng cờ `-a` kèm theo thông điệp `-m` khi gắn thẻ phiên bản phát hành phần mềm.

---

## ✅ Kiểm tra kết quả (Validation)
Phân biệt chính xác giữa một tham chiếu trỏ thẳng commit và một tham chiếu trỏ qua đối tượng Tag.

---

## ❓ Câu hỏi ôn tập (Quiz)
Cùng làm bài kiểm tra về bản chất của đối tượng Tag trong Git.

---

## 🔥 Thử thách nâng cao (Challenge)
Làm thế nào để gắn chữ ký số mật mã học GPG vào một Annotated Tag bằng lệnh git tag -s để chứng minh tính xác thực nguồn gốc?

---

## 📚 Tổng kết kiến thức
- Lightweight Tag chỉ là một con trỏ văn bản đơn giản trỏ trực tiếp tới một commit.
- Annotated Tag tạo ra một đối tượng Tag độc lập trong Object Database với đầy đủ metadata và thông điệp.
- Annotated Tag là tiêu chuẩn bắt buộc cho các cột mốc phát hành phiên bản phần mềm chuyên nghiệp.
