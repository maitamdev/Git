# Cơ sở dữ liệu đối tượng Git (Object Database)

---

## 🎯 Mục tiêu
- Nắm vững bản chất của Git Object Database như một kho lưu trữ Key-Value Store đơn giản và thanh lịch.
- Hiểu rõ 4 loại đối tượng cơ bản trong Git: blob (nội dung), tree (thư mục), commit (lịch sử) và tag (chú thích).
- Khám phá cơ chế lưu Loose Objects; ví dụ repo SHA-1 dùng 2 ký tự đầu làm thư mục và phần còn lại làm tên file.
- Hiểu cấu trúc tiêu đề chuẩn của đối tượng Git: `<type> <size>\0<content>`.

---

## 🧩 Từ khóa hôm nay

### Loose Objects
- **Nói dễ hiểu**: Các đối tượng riêng lẻ được nén zlib độc lập và lưu trữ trực tiếp dưới dạng các tệp tin trong `.git/objects/`.
- **Ví dụ**: Trong repo SHA-1, object ID của blob chứa đúng byte `hello\n` là `ce013625030ba8dba906f756967f9e9ca394464a`; nếu còn là loose, đường dẫn là `.git/objects/ce/013625030ba8dba906f756967f9e9ca394464a`.
- **Đừng nhầm**: Không phải đối tượng trong Packfile; khi số lượng loose objects nhiều lên, Git sẽ gom chúng vào tệp `.pack` để tiết kiệm đĩa.

### Object Header Format
- **Nói dễ hiểu**: Header chuẩn hóa mà Git ghép trước nội dung khi tạo object ID theo hash format của repo.
- **Ví dụ**: Chuỗi tiêu đề `blob 6\0` được ghép trước nội dung 6 byte `hello\n`.
- **Đừng nhầm**: Người dùng không nhìn thấy tiêu đề này khi dùng lệnh Porcelain; nó được Git tự động tính toán ngầm bên trong.

### Key-Value Store in Git
- **Nói dễ hiểu**: Mô hình tra cứu object bằng object ID; ID dài 40 ký tự trong repo SHA-1 và 64 ký tự trong repo SHA-256.
- **Ví dụ**: Dùng object ID đầy đủ vừa lấy từ `git hash-object` với `git cat-file -p <object-id>` để xem nội dung.
- **Đừng nhầm**: Không có bảng, khóa ngoại hay chỉ mục SQL; mọi quan hệ được tạo ra nhờ các đối tượng trỏ mã băm của nhau.

---

## 📖 Định nghĩa
Object database là kho các object được Git tra cứu bằng object ID. Repo SHA-1 dùng SHA-1; repo SHA-256 dùng SHA-256. Object loose được nén riêng bằng zlib; khi đóng gói, nhiều object được lưu trong packfile có thể dùng delta compression. Git directory mặc định chứa `objects/`, nhưng có thể cấu hình vị trí khác.

---

## 🤔 Tại sao cần?
Hiểu object database giúp bạn đọc lịch sử và chẩn đoán dữ liệu. Object ID cho phép Git phát hiện thay đổi ngoài ý muốn; SHA-1 có điểm yếu va chạm đã biết và Git có cơ chế bảo vệ bổ sung. Không nên mô tả hash là bảo đảm mật mã tuyệt đối hoặc cho rằng object bất khả xóa.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung một thư viện sắp object theo ID thay vì tên tệp. Trong repository SHA-1, ID có 40 ký tự hexa; nếu object còn loose, Git dùng hai ký tự đầu làm thư mục và phần còn lại làm tên tệp. Ví dụ, blob rỗng có ID `e69de29bb2d1d6434b8b29ae775ad8c2e48c5391` nằm loose tại `.git/objects/e6/9de29bb2d1d6434b8b29ae775ad8c2e48c5391`. Repo SHA-256 và object đã pack có cách nhìn khác.

---

## 🖼 Sơ đồ
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
Một kỹ sư tạo `hello.txt` chứa đúng 6 byte `hello` và ký tự xuống dòng rồi chạy `git hash-object -w hello.txt`. Trong repo SHA-1, Git in `ce013625030ba8dba906f756967f9e9ca394464a`; nếu object còn ở dạng loose, nó nằm tại `.git/objects/ce/013625030ba8dba906f756967f9e9ca394464a`. Dùng `git cat-file -p <object-id>` để xem nội dung đã giải nén. Nếu object đã được pack, bạn sẽ không thấy file loose tương ứng.

---

## 💻 Command
```bash
# Thống kê số lượng loose objects và packfiles
git count-objects -v

# Tính object ID cho nội dung mà không ghi object
echo "Git Internals Demo" | git hash-object --stdin

# Kiểm tra kiểu và nội dung bằng object ID vừa in ra
git cat-file -t <object-id>
git cat-file -p <object-id>
```

---

## 🔍 Giải thích command
- `git count-objects -v`: Thống kê loose objects và thông tin packfiles; không nhất thiết có một file riêng cho mỗi object.
- `git hash-object --stdin`: Tính object ID, mặc định không ghi object vào database.
- `git cat-file -t <object-id>`: In loại object (`blob`, `tree`, `commit` hoặc `tag`).
- `git cat-file -p <object-id>`: Hiển thị nội dung object theo dạng dễ đọc; blob nhị phân có thể không hiển thị thành văn bản dễ hiểu.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ rằng tên tệp tin được lưu trong đối tượng Blob**: Blob chỉ lưu duy nhất nội dung nhị phân thô; tên tệp và quyền hạn được lưu trong đối tượng Tree.
2. **Sửa đổi thủ công tệp đối tượng trong `.git/objects/`**: Dẫn tới lỗi "Corrupt loose object" do mã băm không còn khớp với nội dung sau khi sửa.
3. **Cho rằng mọi repo đều có đường dẫn object dạng 2+38 ký tự**: Đó là ví dụ loose object của định dạng SHA-1; repo SHA-256 có ID dài hơn và packed object nằm trong packfile.

---

## 🧪 Lab
Hãy mở terminal và cùng tôi thực hành từng bước dưới đây để làm chủ kỹ năng:

1. Chạy `git hash-object --stdin` rồi nhập một dòng nội dung duy nhất; lưu object ID được in ra.
2. Chạy `git cat-file -t <object-id>` để xác nhận loại là `blob` và `git cat-file -p <object-id>` để đọc nội dung.
3. Lặp lại `git hash-object --stdin` với cùng nội dung. ID phải giống nhau.
4. Thêm cờ `-w` để ghi object; sau đó dùng `git count-objects -v` xem thống kê. Số loose objects có thể không tăng nếu blob đã tồn tại hoặc Git pack dữ liệu.

---

## 💡 Hint
> Cấu trúc 2 ký tự đầu là cách Git tổ chức loose objects; không cần suy ra một ngưỡng hiệu năng cụ thể của hệ điều hành. Packfile có bố cục khác.

---

## ✅ Validation
- Lệnh `git cat-file -t` trả về chuỗi `blob`.
- Lệnh `git cat-file -p` in ra chính xác dòng chữ "Git Internals Demo".

---

## ❓ Quiz
Hãy kiểm tra mức độ thấu hiểu của bạn về cơ sở dữ liệu đối tượng Git qua các câu hỏi trong phần trắc nghiệm bên dưới.

---

## 🔥 Challenge
Tại sao các đối tượng trong Git Object Database lại được gọi là Bất biến (Immutable)? Nếu bạn sửa một dấu phẩy trong tệp tin, chuyện gì sẽ xảy ra với đối tượng cũ?

---

## 📚 Tổng kết
- Git Object Database là một kho lưu trữ Key-Value dạng Content-Addressable nén bằng zlib.
- Bốn loại đối tượng cốt lõi gồm: `blob`, `tree`, `commit`, và `tag`.
- Trong repo SHA-1, đường dẫn loose object dùng 2 ký tự đầu làm thư mục và phần còn lại làm tên file; packfile không theo cấu trúc đó.
- Object ID giúp phát hiện thay đổi nội dung; không nên xem hash hoặc object là bất khả xóa hay bảo đảm an ninh tuyệt đối.
