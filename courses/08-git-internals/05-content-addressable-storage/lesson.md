# Bộ nhớ định danh theo nội dung (Content-Addressable Storage)

---

## 🎯 Mục tiêu
- Hiểu sâu nguyên lý của Bộ nhớ định danh theo nội dung (Content-Addressable Storage - CAS).
- Nắm bắt cơ chế tự động khử trùng lặp (Deduplication) tuyệt hảo: hai tệp có nội dung giống nhau chỉ tạo đúng một đối tượng.
- Làm chủ công thức tiêu đề chuẩn mực của một đối tượng Git: `<type> <size>\0<content>`.
- Hiểu tại sao mã băm mật mã học bảo vệ toàn vẹn lịch sử Git trước mọi hành vi can thiệp trái phép.

---

## 🧩 Từ khóa hôm nay

### Content-Addressable Storage (CAS)
- **Nói dễ hiểu**: Phương thức lưu trữ mà địa chỉ dữ liệu chính là mã băm tính toán trực tiếp từ nội dung của đối tượng.
- **Ví dụ**: Bạn đưa nội dung vào hàm băm để nhận về địa chỉ khóa SHA-1, không dựa vào tên hay đường dẫn tệp.
- **Đừng nhầm**: Không giống hệ thống tệp thông thường (tìm file theo tên thư mục); Git tìm dữ liệu theo vân tay nội dung.

### Automatic Deduplication
- **Nói dễ hiểu**: Khả năng tự động loại bỏ dữ liệu trùng lặp; nhiều tệp giống hệt nhau về nội dung chỉ lưu duy nhất một bản trên đĩa.
- **Ví dụ**: Sao chép một file ảnh 10MB vào 5 thư mục khác nhau thì Git vẫn chỉ tốn đúng 10MB bộ nhớ cho một đối tượng Blob.
- **Đừng nhầm**: Các tệp vẫn có tên và đường dẫn riêng biệt trong đối tượng Tree, nhưng cùng trỏ tới một mã băm Blob duy nhất.

### Cryptographic Hash (SHA-1 / SHA-256)
- **Nói dễ hiểu**: Thuật toán băm một chiều biến đổi một khối dữ liệu có kích thước bất kỳ thành chuỗi ký tự độ dài cố định (40 ký tự hexa với SHA-1).
- **Ví dụ**: Chuỗi băm `e69de29bb2d1d6434b8b29ae775ad8c2e48c5391` là mã băm chuẩn của một tệp rỗng (0 byte) trong Git.
- **Đừng nhầm**: Không phải thuật toán mã hóa (encryption) có thể giải mã ngược lại; đây là hàm băm một chiều dùng để kiểm tra tính toàn vẹn.

---

## 📖 Định nghĩa
Content-Addressable Storage (CAS) là cơ chế lưu trữ dữ liệu trong đó thông tin được truy xuất và định danh dựa trên chính nội dung của nó, chứ không phải dựa trên vị trí đường dẫn hay tên gọi. Trong Git, mỗi khi bạn đưa dữ liệu vào hệ thống, Git sẽ băm toàn bộ nội dung cùng với một phần tiêu đề chuẩn mực thông qua thuật toán hàm băm SHA-1 để tạo ra mã định danh duy nhất (Content Hash). Nếu nội dung thay đổi dù chỉ một dấu cách, mã băm sẽ hoàn toàn khác; nếu nội dung giống hệt nhau, mã băm sẽ luôn luôn trùng khớp.

---

## 💡 Tại sao cần
Nguyên lý CAS mang lại hai siêu năng lực cốt lõi cho Git: Thứ nhất là Khử trùng lặp tự động (Automatic Deduplication) — nếu bạn có 100 tệp tin ở 100 thư mục khác nhau nhưng cùng chung nội dung, Git chỉ lưu đúng 1 đối tượng duy nhất trên đĩa, tiết kiệm dung lượng khổng lồ. Thứ hai là Tính toàn vẹn mật mã học (Cryptographic Integrity) — không ai có thể âm thầm sửa đổi mã nguồn trong quá khứ mà không làm thay đổi toàn bộ cây mã băm.

---

## 🧠 Mental Model
Hãy so sánh việc tìm một người bằng số Căn cước công dân (Định danh theo nội dung) với việc tìm theo số phòng khách sạn (Định danh theo vị trí). Nếu tìm theo số phòng, người thuê phòng có thể thay đổi liên tục nhưng số phòng vẫn là 301. Nhưng nếu tìm theo số Căn cước công dân gắn liền với vân tay và võng mạc (nội dung sinh trắc học), dù người đó có di chuyển sang bất kỳ tỉnh thành nào trên thế giới thì danh tính của họ vẫn duy nhất và không bao giờ bị trùng lặp.

---

## 📊 Sơ đồ minh họa
```text
Cơ chế tạo mã băm trong Content-Addressable Storage:
Nội dung văn bản: "hello\n" (chiều dài: 6 bytes)
Loại đối tượng:  blob

Chuỗi dữ liệu chuẩn hóa đưa vào hàm băm:
"blob 6\0hello\n"
        │
        ▼ [Hàm băm mật mã học SHA-1]
  ce013625030ba8dba906f756967f9e9cf3944e52

(Bất kỳ ai trên thế giới băm chuỗi này đều ra đúng mã hash trên)
```

---

## 🏢 Ví dụ thực tế
Một lập trình viên sao chép một tệp thư viện JavaScript có dung lượng 5 MB có tên `lodash.js` vào 10 thư mục module khác nhau trong dự án. Khi thực hiện `git add .`, lập trình viên lo lắng rằng thư mục `.git/` sẽ bị phình to thêm 50 MB (5 MB x 10). Tuy nhiên, khi kiểm tra dung lượng, thư mục `.git/objects/` chỉ tăng thêm đúng 5 MB. Lý do là vì cả 10 tệp tin đều có chung nội dung, Git áp dụng nguyên lý Content-Addressable Storage và tính toán ra cùng một mã băm SHA-1 duy nhất. Cả 10 đường dẫn khác nhau đều trỏ chung về một đối tượng Blob duy nhất trên đĩa.

---

## 💻 Command & Cú pháp
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
- `git hash-object --stdin`: Nhận dữ liệu từ terminal stdin, thêm tiêu đề chuẩn `blob <length>\0` và tính toán mã SHA-1.
- Cờ `-w` (write): Yêu cầu Git ghi đối tượng nén zlib vào đúng thư mục con tương ứng trong `.git/objects/`.
- `printf "blob 12\0hello world\n" | sha1sum`: Thao tác băm thủ công chứng minh công thức tiêu đề nội tại của Git hoàn toàn minh bạch.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ rằng mã băm chỉ tính từ nội dung file**: Nếu bạn dùng lệnh `sha1sum file.txt` thông thường, kết quả sẽ khác với `git hash-object file.txt` vì Git bắt buộc phải ghép thêm header `blob <size>\0`.
2. **Lo lắng khi đổi tên file làm tăng dung lượng kho**: Đổi tên file chỉ tạo ra đối tượng Tree mới chứa tên mới, còn nội dung Blob cũ được tái sử dụng 100%.
3. **Hiểu lầm về va chạm mã băm**: Không gian địa chỉ 160-bit của SHA-1 có tới 2^160 khả năng, xác suất va chạm tự nhiên là 0 trong thực tế phát triển phần mềm.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.

1. **Bước 1**: Chạy lệnh `echo "hello git" | git hash-object --stdin` và ghi lại mã băm đầu ra.
2. **Bước 2**: Tạo tệp `doc1.txt` chứa dòng chữ "hello git" và chạy `git hash-object doc1.txt`.
3. **Bước 3**: Tạo tệp `sub/doc2.txt` ở thư mục con khác nhưng có cùng nội dung "hello git" và chạy `git hash-object sub/doc2.txt`.
4. **Bước 4**: Đối chiếu 3 mã băm để xác nhận cả 3 kết quả đều cho ra cùng một chuỗi SHA-1 giống nhau hoàn toàn.

---

## 💡 Hint & mẹo
> Hai tệp tin ở hai vị trí khác nhau, mang hai tên gọi khác nhau, nhưng hễ có nội dung giống nhau thì sẽ có mã băm SHA-1 giống hệt nhau. Đó chính là bản chất của cơ chế khử trùng lặp trong Git.

---

## ✅ Validation & Kết quả mong đợi
- Cả 3 lệnh tính toán đều in ra cùng một chuỗi 40 ký tự hexa duy nhất.
- Kiểm tra `.git/objects/` chỉ thấy xuất hiện 1 đối tượng duy nhất đại diện cho nội dung "hello git".

---

## ❓ Quiz nhanh
Cùng kiểm tra mức độ thấu hiểu nguyên lý Content-Addressable Storage qua các câu hỏi trong phần trắc nghiệm bên dưới.

---

## 🚀 Thử thách nâng cao
Nếu bạn có một dự án mã nguồn gồm 10.000 tệp tin nhưng tất cả các tệp đều hoàn toàn trống rỗng (0 bytes), cơ sở dữ liệu đối tượng của Git sẽ tạo ra bao nhiêu đối tượng Blob? Mã băm của tệp rỗng trong Git là gì?

---

## 📝 Tổng kết
- Content-Addressable Storage lưu trữ và truy xuất dữ liệu dựa trên mã băm nội dung của chính nó.
- Công thức tính băm chuẩn của Git luôn bao gồm tiêu đề: `<type> <size>\0<content>`.
- Mang lại khả năng tự động khử trùng lặp dữ liệu tuyệt đối và bảo đảm tính toàn vẹn bất biến.
- Đổi tên tệp hoặc di chuyển thư mục không làm tốn thêm dung lượng lưu trữ nội dung tệp tin.
