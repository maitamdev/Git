# Bộ nhớ định danh theo nội dung (Content-Addressable Storage)

---

## 🎯 Mục tiêu
- Hiểu sâu nguyên lý của Bộ nhớ định danh theo nội dung (Content-Addressable Storage - CAS).
- Nắm bắt cơ chế tự động khử trùng lặp (Deduplication) tuyệt hảo: hai tệp có nội dung giống nhau chỉ tạo đúng một đối tượng.
- Làm chủ công thức tiêu đề chuẩn mực của một đối tượng Git: `<type> <size>\0<content>`.
- Hiểu mã băm giúp nhận diện thay đổi nội dung và các giới hạn của SHA-1.

---

## 🧩 Từ khóa hôm nay

### Content-Addressable Storage (CAS)
- **Nói dễ hiểu**: Phương thức lưu trữ mà địa chỉ dữ liệu chính là mã băm tính toán trực tiếp từ nội dung của đối tượng.
- **Ví dụ**: Git tính object ID từ header và nội dung; tên/đường dẫn file được lưu trong tree, không nằm trong blob.
- **Đừng nhầm**: Không giống hệ thống tệp thông thường (tìm file theo tên thư mục); Git tìm dữ liệu theo vân tay nội dung.

### Automatic Deduplication
- **Nói dễ hiểu**: Khả năng tự động loại bỏ dữ liệu trùng lặp; nhiều tệp giống hệt nhau về nội dung chỉ lưu duy nhất một bản trên đĩa.
- **Ví dụ**: Hai file có nội dung blob giống hệt nhau có thể cùng trỏ tới một object; tổng dung lượng thực tế còn phụ thuộc nén và cách lưu.
- **Đừng nhầm**: Các tệp vẫn có tên và đường dẫn riêng biệt trong đối tượng Tree, nhưng cùng trỏ tới một mã băm Blob duy nhất.

### Cryptographic Hash (SHA-1 / SHA-256)
- **Nói dễ hiểu**: Thuật toán băm một chiều biến đổi một khối dữ liệu có kích thước bất kỳ thành chuỗi ký tự độ dài cố định (40 ký tự hexa với SHA-1).
- **Ví dụ**: Chuỗi băm `e69de29bb2d1d6434b8b29ae775ad8c2e48c5391` là mã băm chuẩn của một tệp rỗng (0 byte) trong Git.
- **Đừng nhầm**: Hash không phải mã hóa, không thể giải mã ngược; SHA-1 có điểm yếu va chạm đã biết và không nên xem là bảo đảm an ninh tuyệt đối.

---

## 📖 Định nghĩa
Content-Addressable Storage (CAS) định danh dữ liệu theo nội dung. Trong Git, object ID được tính từ header `<type> <size>\0` cộng byte nội dung. Repo SHA-1 dùng SHA-1; repo SHA-256 dùng SHA-256. Cùng type và cùng byte nội dung cho cùng ID trong cùng định dạng hash (bỏ qua trường hợp va chạm). Đường dẫn không nằm trong blob, nhưng Git attributes/clean filters có thể biến đổi dữ liệu trước khi lưu.

---

## 🤔 Tại sao cần?
CAS cho phép Git tái sử dụng cùng một blob khi byte dữ liệu đã lưu giống nhau, nhờ vậy tránh lưu nhiều bản giống hệt ở dạng loose objects. Git còn kiểm tra object ID để phát hiện thay đổi ngoài ý muốn. SHA-1 có va chạm thực tế đã biết; Git có bảo vệ bổ sung, nhưng hash không thay thế chữ ký, kiểm soát truy cập hay sao lưu.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy tưởng tượng hai bản sao của cùng một ghi chú. Nếu Git lưu nội dung theo tên đường dẫn, hai tên khác nhau sẽ tạo hai bản dữ liệu riêng. Với content-addressable storage, Git tính ID từ loại object và byte nội dung; hai blob giống nhau trong cùng định dạng hash thường có thể dùng chung object, còn tree vẫn giữ tên và đường dẫn riêng.

---

## 🖼 Sơ đồ
```text
Cơ chế tạo mã băm trong Content-Addressable Storage:
Nội dung văn bản: "hello\n" (chiều dài: 6 bytes)
Loại đối tượng:  blob

Chuỗi dữ liệu chuẩn hóa đưa vào hàm băm:
"blob 6\0hello\n"
        │
        ▼ [Hàm băm mật mã học SHA-1]
  ce013625030ba8dba906f756967f9e9ca394464a

(Bất kỳ ai trên thế giới băm chuỗi này đều ra đúng mã hash trên)
```

---

## 🌎 Ví dụ thực tế
Nếu nhiều đường dẫn được stage với cùng byte nội dung và cùng bộ lọc, chúng có thể dùng chung một blob. Git vẫn cần tree entry riêng cho từng tên/đường dẫn; dung lượng thật thay đổi theo nén, packfile, và dữ liệu đã có trong repository.

---

## 💻 Command
```bash
# Tính mã băm của chuỗi mà không ghi xuống đĩa
echo "hello world" | git hash-object --stdin

# Tính mã băm và đồng thời ghi đối tượng vào .git/objects/
echo "hello world" | git hash-object -w --stdin

# Tự tính toán thủ công bằng lệnh sha1sum của Linux để kiểm chứng
printf "blob 12\0hello world\n" | sha1sum
```

---

## 🔍 Giải thích command
- `git hash-object --stdin`: Nhận dữ liệu từ stdin, thêm header `blob <length>\0` và tính object ID theo định dạng hash của repo.
- Cờ `-w` (write): Yêu cầu Git ghi đối tượng nén zlib vào đúng thư mục con tương ứng trong `.git/objects/`.
- `printf "blob 12\0hello world\n" | sha1sum`: Thao tác băm thủ công chứng minh công thức tiêu đề nội tại của Git hoàn toàn minh bạch.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ rằng mã băm chỉ tính từ nội dung file**: Nếu bạn dùng lệnh `sha1sum file.txt` thông thường, kết quả sẽ khác với `git hash-object file.txt` vì Git bắt buộc phải ghép thêm header `blob <size>\0`.
2. **Lo lắng khi đổi tên file làm tăng dung lượng kho**: Đổi tên file chỉ tạo ra đối tượng Tree mới chứa tên mới, còn nội dung Blob cũ được tái sử dụng 100%.
3. **Cho rằng va chạm SHA-1 là bất khả thi**: Đã có va chạm được chứng minh cho SHA-1; Git có biện pháp bảo vệ, nhưng không nên khẳng định xác suất bằng 0.

---

## 🧪 Lab
Hãy mở terminal và cùng tôi thực hành từng bước dưới đây để làm chủ kỹ năng:

1. Chạy `printf 'hello git\n' > doc1.txt`, rồi `mkdir -p sub` và `cp doc1.txt sub/doc2.txt` để hai đường dẫn có cùng byte nội dung.
2. Chạy `git hash-object doc1.txt` và `git hash-object sub/doc2.txt`; hai ID phải khớp nếu file không qua clean filter khác nhau.
3. Chạy `git hash-object --stdin`, nhập cùng nội dung `hello git` và xuống dòng bằng `Ctrl+D` (Git Bash), rồi so sánh ID.
4. Thử hash một nội dung khác để thấy ID thay đổi. Lệnh chưa có `-w` nên không ghi các blob thử vào database.

---

## 💡 Hint
> So sánh hash của object đã lưu, không phải lúc nào cũng so raw file trước filter. Trong bài lab này, dùng file text đơn giản không có clean filter để thấy rõ quy tắc.

---

## ✅ Validation
- Hai đầu vào cùng byte cho cùng object ID; độ dài ID tùy SHA-1/SHA-256.
- `git hash-object` không kèm `-w` chỉ tính ID, không ghi object thử vào database.

---

## ❓ Quiz
Cùng kiểm tra mức độ thấu hiểu nguyên lý Content-Addressable Storage qua các câu hỏi trong phần trắc nghiệm bên dưới.

---

## 🔥 Challenge
Nếu bạn có một dự án mã nguồn gồm 10.000 tệp tin nhưng tất cả các tệp đều hoàn toàn trống rỗng (0 bytes), cơ sở dữ liệu đối tượng của Git sẽ tạo ra bao nhiêu đối tượng Blob? Mã băm của tệp rỗng trong Git là gì?

---

## 📚 Tổng kết
- Content-Addressable Storage định danh object từ header và byte nội dung của nó.
- Công thức tính băm chuẩn của Git luôn bao gồm tiêu đề: `<type> <size>\0<content>`.
- Giúp tái sử dụng object giống nhau và phát hiện nhiều thay đổi; hash không phải bảo đảm an ninh tuyệt đối.
- Đổi tên tệp hoặc di chuyển thư mục không làm tốn thêm dung lượng lưu trữ nội dung tệp tin.
