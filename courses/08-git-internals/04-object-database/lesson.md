# Cơ sở dữ liệu đối tượng Git (Object Database)

---

## 🎯 Mục tiêu
- Nắm vững bản chất của Git Object Database như một kho lưu trữ Key-Value Store đơn giản và thanh lịch.
- Hiểu rõ 4 loại đối tượng cơ bản trong Git: blob (nội dung), tree (thư mục), commit (lịch sử) và tag (chú thích).
- Khám phá cơ chế lưu trữ Loose Objects: cấu trúc phân chia thư mục 2 ký tự đầu và 38 ký tự sau (`.git/objects/xx/yyyy`).
- Hiểu cấu trúc tiêu đề chuẩn của đối tượng Git: `<type> <size>\0<content>`.

---

## 🧩 Từ khóa hôm nay

### Loose Objects
- **Nói dễ hiểu**: Các đối tượng riêng lẻ được nén zlib độc lập và lưu trữ trực tiếp dưới dạng các tệp tin trong `.git/objects/`.
- **Ví dụ**: Tệp tin `.git/objects/ce/013625030ba8dba906f756967f9e9cf3944e52` chứa nội dung nén của một blob.
- **Đừng nhầm**: Không phải đối tượng trong Packfile; khi số lượng loose objects nhiều lên, Git sẽ gom chúng vào tệp `.pack` để tiết kiệm đĩa.

### Object Header Format
- **Nói dễ hiểu**: Phần đầu nhị phân chuẩn hóa mà Git gắn vào trước nội dung dữ liệu trước khi thực hiện băm SHA-1.
- **Ví dụ**: Chuỗi tiêu đề `blob 14\0` được ghép vào trước nội dung `hello world\n`.
- **Đừng nhầm**: Người dùng không nhìn thấy tiêu đề này khi dùng lệnh Porcelain; nó được Git tự động tính toán ngầm bên trong.

### Key-Value Store in Git
- **Nói dễ hiểu**: Mô hình cơ sở dữ liệu tra cứu đơn giản: đưa vào khóa là mã SHA-1 40 ký tự sẽ nhận về giá trị là nội dung giải nén của đối tượng.
- **Ví dụ**: Tra cứu khóa `ce0136` bằng lệnh `git cat-file -p ce0136` trả về chuỗi văn bản gốc.
- **Đừng nhầm**: Không có bảng, khóa ngoại hay chỉ mục SQL; mọi quan hệ được tạo ra nhờ các đối tượng trỏ mã băm của nhau.

---

## 📖 Định nghĩa
Cơ sở dữ liệu đối tượng Git (Git Object Database) là một kho lưu trữ cặp Khóa - Giá trị (Key-Value Data Store) nằm tại thư mục `.git/objects/`. Trong hệ thống này, Giá trị (Value) là nội dung của một đối tượng bất kỳ được nén bằng thuật toán zlib, và Khóa (Key) là mã băm băm mật mã học SHA-1 (chuỗi 40 ký tự hexa) được tính toán từ chính nội dung của đối tượng đó kèm theo tiêu đề chuẩn.

---

## 💡 Tại sao cần
Hiểu được cách Git tổ chức cơ sở dữ liệu đối tượng giúp bạn giải mã được sự thần kỳ về tốc độ và tính toàn vẹn của Git. Mọi thứ trong Git — từ một dòng mã bạn viết, một thư mục con, một commit cho đến một nhãn phát hành — đều được quy về một trong bốn loại đối tượng cơ bản bất biến. Nếu dữ liệu bị hỏng dù chỉ 1 bit, mã băm SHA-1 sẽ thay đổi ngay lập tức và Git sẽ phát hiện sự can thiệp bất hợp pháp.

---

## 🧠 Mental Model
Hãy hình dung một thư viện khổng lồ chứa hàng triệu cuốn sách. Thủ thư không xếp sách theo tên tác giả hay ngày xuất bản, mà sử dụng một chiếc máy quét quang học quét toàn bộ chữ trong cuốn sách để tạo ra một mã số định danh duy nhất (SHA-1 hash). Sau đó, thủ thư lấy 2 chữ số đầu của mã số làm số thứ tự của Dãy kệ sách (ví dụ: kệ số `4b`), và 38 chữ số còn lại làm số hiệu cuốn sách đặt trên kệ đó (`.git/objects/4b/825dc6e8`).

---

## 📊 Sơ đồ minh họa
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

## 🏢 Ví dụ thực tế
Một kỹ sư muốn kiểm tra xem Git lưu trữ một chuỗi văn bản như thế nào. Kỹ sư tạo một tệp tin `hello.txt` chứa chữ "hello\n" và chạy lệnh `git hash-object -w hello.txt`. Git trả về mã băm: `ce013625030ba8dba906f756967f9e9cf3944e52`. Kỹ sư mở thư mục `.git/objects/ce/` và thấy một tệp tin mới xuất hiện có tên `013625030ba8dba906f756967f9e9cf3944e52`. Khi kiểm tra tệp này bằng lệnh cat thông thường, màn hình chỉ hiển thị các ký tự nhị phân vô nghĩa vì dữ liệu đã được nén bằng zlib. Khi sử dụng lệnh chuyên dụng `git cat-file -p ce0136`, Git lập tức giải nén và in ra chữ "hello" nguyên bản.

---

## 💻 Command & Cú pháp
```bash
# Quét toàn bộ tệp đối tượng rời rạc trên đĩa
find .git/objects -type f

# Thống kê số lượng đối tượng và dung lượng chiếm dụng
git count-objects -v

# Kiểm tra kiểu của đối tượng qua mã băm
git cat-file -t ce0136

# Xem nội dung giải nén đẹp của đối tượng
git cat-file -p ce0136
```

---

## 🔍 Giải thích command
- `find .git/objects -type f`: Liệt kê các tệp đối tượng rời rạc (loose objects) đang lưu trữ trên đĩa.
- `git count-objects -v`: Thống kê số lượng loose objects, packfiles và dung lượng đĩa tương ứng.
- `git cat-file -t <hash>`: Đọc header và trả về loại đối tượng (`blob`, `tree`, `commit`, hoặc `tag`).
- `git cat-file -p <hash>`: Giải nén zlib và in ra nội dung nguyên bản (pretty-print).

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ rằng tên tệp tin được lưu trong đối tượng Blob**: Blob chỉ lưu duy nhất nội dung nhị phân thô; tên tệp và quyền hạn được lưu trong đối tượng Tree.
2. **Sửa đổi thủ công tệp đối tượng trong `.git/objects/`**: Dẫn tới lỗi "Corrupt loose object" do mã băm không còn khớp với nội dung sau khi sửa.
3. **Hoang mang khi thấy nhiều thư mục 2 ký tự**: Đây là thiết kế tối ưu hóa hệ thống tệp giúp tránh tình trạng một thư mục chứa quá nhiều tệp tin làm chậm hệ điều hành.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.

1. **Bước 1**: Chạy lệnh `git count-objects -v` để ghi nhận số lượng đối tượng ban đầu trong kho.
2. **Bước 2**: Chạy lệnh `echo "Git Internals Demo" | git hash-object -w --stdin` để trực tiếp tạo một blob vào database.
3. **Bước 3**: Sao chép mã SHA-1 vừa in ra, kiểm tra kiểu đối tượng bằng lệnh `git cat-file -t <mã_sha>`.
4. **Bước 4**: Chạy `git count-objects -v` lần nữa để thấy chỉ số `count` tăng thêm đúng 1 đối tượng.

---

## 💡 Hint & mẹo
> Tại sao Git lại tách 2 ký tự đầu làm thư mục con? Vì nhiều hệ thống tệp tin cổ điển (như FAT32 hoặc ext3) sẽ bị chậm nghiêm trọng nếu một thư mục đơn lẻ chứa quá 10.000 tệp tin. Với 256 thư mục con (từ 00 đến ff), tải trọng được phân bổ đều đặn.

---

## ✅ Validation & Kết quả mong đợi
- Lệnh `git cat-file -t` trả về chuỗi `blob`.
- Lệnh `git cat-file -p` in ra chính xác dòng chữ "Git Internals Demo".

---

## ❓ Quiz nhanh
Hãy kiểm tra mức độ thấu hiểu của bạn về cơ sở dữ liệu đối tượng Git qua các câu hỏi trong phần trắc nghiệm bên dưới.

---

## 🚀 Thử thách nâng cao
Tại sao các đối tượng trong Git Object Database lại được gọi là Bất biến (Immutable)? Nếu bạn sửa một dấu phẩy trong tệp tin, chuyện gì sẽ xảy ra với đối tượng cũ?

---

## 📝 Tổng kết
- Git Object Database là một kho lưu trữ Key-Value dạng Content-Addressable nén bằng zlib.
- Bốn loại đối tượng cốt lõi gồm: `blob`, `tree`, `commit`, và `tag`.
- Đường dẫn đối tượng được phân rã thành thư mục 2 ký tự đầu và tệp 38 ký tự còn lại để tối ưu hóa hệ thống tệp.
- Tính bất biến của đối tượng giúp Git bảo vệ tính toàn vẹn của lịch sử dự án trước mọi nguy cơ sửa đổi.
