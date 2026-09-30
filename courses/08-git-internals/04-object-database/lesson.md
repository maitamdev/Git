# Cơ sở dữ liệu đối tượng Git (Object Database)

---

## 🎯 Mục tiêu bài học
- Nắm vững bản chất của Git Object Database như một kho lưu trữ Key-Value Store đơn giản và thanh lịch.
- Hiểu rõ 4 loại đối tượng cơ bản trong Git: blob (nội dung), tree (thư mục), commit (lịch sử) và tag (chú thích).
- Khám phá cơ chế lưu trữ Loose Objects: cấu trúc phân chia thư mục 2 ký tự đầu và 38 ký tự sau (.git/objects/xx/yyyy).

---

## 📖 Định nghĩa
> Cơ sở dữ liệu đối tượng Git (Git Object Database) là một kho lưu trữ cặp Khóa - Giá trị (Key-Value Data Store) nằm tại thư mục .git/objects/. Trong hệ thống này, Giá trị (Value) là nội dung của một đối tượng bất kỳ được nén bằng thuật toán zlib, và Khóa (Key) là mã băm băm mật mã học SHA-1 (chuỗi 40 ký tự hexa) được tính toán từ chính nội dung của đối tượng đó kèm theo tiêu đề chuẩn.

---

## 🤔 Tại sao cần?
Hiểu được cách Git tổ chức cơ sở dữ liệu đối tượng giúp bạn giải mã được sự thần kỳ về tốc độ và tính toàn vẹn của Git. Mọi thứ trong Git — từ một dòng mã bạn viết, một thư mục con, một commit cho đến một nhãn phát hành — đều được quy về một trong bốn loại đối tượng cơ bản bất biến. Nếu dữ liệu bị hỏng dù chỉ 1 bit, mã băm SHA-1 sẽ thay đổi ngay lập tức và Git sẽ phát hiện sự can thiệp bất hợp pháp.

---

## 🧠 Mental Model & Mô hình tư duy
Hãy hình dung một thư viện khổng lồ chứa hàng triệu cuốn sách. Thủ thư không xếp sách theo tên tác giả hay ngày xuất bản, mà sử dụng một chiếc máy quét quang học quét toàn bộ chữ trong cuốn sách để tạo ra một mã số định danh duy nhất (SHA-1 hash). Sau đó, thủ thư lấy 2 chữ số đầu của mã số làm số thứ tự của Dãy kệ sách (ví dụ: kệ số `4b`), và 38 chữ số còn lại làm số hiệu cuốn sách đặt trên kệ đó (`.git/objects/4b/825dc6e8`).

---

## 🖼️ Sơ đồ minh họa
```text
Mô hình lưu trữ Loose Objects trong .git/objects/:
SHA-1 Hash: e69de29bb2d1d6434b8b29ae775ad8c2e48c5391
            ││ └─────────────────────────────────────┘
            ▼▼                  ▼
    Tên thư mục con:     Tên tệp tin nén zlib:
    .git/objects/e6/     9de29bb2d1d6434b8b29ae775ad8c2e48c5391

Nội dung bên trong tệp nén:
[Header: "<type> <size>\0"] + [Payload Content]
```

---

## 🌎 Ví dụ thực tế
Một kỹ sư muốn kiểm tra xem Git lưu trữ một chuỗi văn bản như thế nào. Kỹ sư tạo một tệp tin `hello.txt` chứa chữ "hello\n" và chạy lệnh `git hash-object -w hello.txt`. Git trả về mã băm: `ce013625030ba8dba906f756967f9e9cf3944e52`. Kỹ sư mở thư mục `.git/objects/ce/` và thấy một tệp tin mới xuất hiện có tên `013625030ba8dba906f756967f9e9cf3944e52`. Khi kiểm tra tệp này bằng lệnh cat thông thường, màn hình chỉ hiển thị các ký tự nhị phân vô nghĩa vì dữ liệu đã được nén bằng zlib. Khi sử dụng lệnh chuyên dụng `git cat-file -p ce0136`, Git lập tức giải nén và in ra chữ "hello" nguyên bản.

---

## 💻 Command & Lệnh thao tác
```bash
find .git/objects -type f
git count-objects -v
```

---

## 🔍 Giải thích chi tiết lệnh
Lệnh find quét và hiển thị tất cả các tệp đối tượng rời rạc (loose objects) đang có trên đĩa, và git count-objects -v thống kê tổng số lượng đối tượng và dung lượng lưu trữ thực tế mà chúng chiếm dụng.

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Nhầm tưởng rằng tên tệp tin (ví dụ**:  `app.ts` hay `index.html`) được lưu bên trong đối tượng Blob: Blob chỉ lưu duy nhất nội dung, tên tệp được lưu trong đối tượng Tree.
2. **Sửa đổi nội dung của một tệp đối tượng trong `.git/objects/` bằng tay khiến Git báo lỗi "Corrupt loose object".**: 
3. **Lo lắng khi thấy hàng trăm thư mục 2 ký tự sinh ra trong `.git/objects/`**:  Đây là thiết kế có chủ đích để tránh việc một thư mục chứa quá nhiều tệp làm giảm hiệu năng hệ điều hành.

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Chạy lệnh `git count-objects -v` để xem thống kê số lượng đối tượng trong repository hiện tại.
2. Tạo một commit mới và chạy lại lệnh trên để quan sát số lượng đối tượng tăng lên.
3. Sử dụng lệnh `find .git/objects -type f` để xem cấu trúc đường dẫn phân tách 2 ký tự đầu.

---

## 💡 Gợi ý thực hiện (Hint)
> Tại sao Git lại tách 2 ký tự đầu làm thư mục con? Vì nhiều hệ thống tệp tin cổ điển (như FAT32 hoặc ext3) sẽ bị chậm nghiêm trọng nếu một thư mục đơn lẻ chứa quá 10.000 tệp tin.

---

## ✅ Kiểm tra kết quả (Validation)
Giải thích được quy tắc băm và phân rã đường dẫn thư mục `xx/yyyy` của các đối tượng Git.

---

## ❓ Câu hỏi ôn tập (Quiz)
Hãy kiểm tra mức độ thấu hiểu của bạn về cơ sở dữ liệu đối tượng Git qua các câu hỏi sau.

---

## 🔥 Thử thách nâng cao (Challenge)
Tại sao các đối tượng trong Git Object Database lại được gọi là Bất biến (Immutable)? Nếu bạn sửa một dấu phẩy trong tệp tin, chuyện gì sẽ xảy ra với đối tượng cũ?

---

## 📚 Tổng kết kiến thức
- Git Object Database là một kho lưu trữ Key-Value dạng Content-Addressable nén bằng zlib.
- Bốn loại đối tượng cốt lõi gồm: `blob`, `tree`, `commit`, và `tag`.
- Đường dẫn đối tượng được phân rã thành thư mục 2 ký tự đầu và tệp 38 ký tự còn lại để tối ưu hóa hệ thống tệp.
