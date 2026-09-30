# Bộ nhớ định danh theo nội dung (Content-Addressable Storage)

---

## 🎯 Mục tiêu bài học
- Hiểu sâu nguyên lý của Bộ nhớ định danh theo nội dung (Content-Addressable Storage - CAS).
- Nắm bắt cơ chế tự động khử trùng lặp (Deduplication) tuyệt hảo: hai tệp có nội dung giống nhau chỉ tạo đúng một đối tượng.
- Làm chủ công thức tiêu đề chuẩn mực của một đối tượng Git: <type> <size>\0<content>.

---

## 📖 Định nghĩa
> Content-Addressable Storage (CAS) là cơ chế lưu trữ dữ liệu trong đó thông tin được truy xuất và định danh dựa trên chính nội dung của nó, chứ không phải dựa trên vị trí đường dẫn hay tên gọi. Trong Git, mỗi khi bạn đưa dữ liệu vào hệ thống, Git sẽ băm toàn bộ nội dung cùng với một phần tiêu đề chuẩn mực thông qua thuật toán hàm băm SHA-1 để tạo ra mã định danh duy nhất (Content Hash). Nếu nội dung thay đổi dù chỉ một dấu cách, mã băm sẽ hoàn toàn khác; nếu nội dung giống hệt nhau, mã băm sẽ luôn luôn trùng khớp.

---

## 🤔 Tại sao cần?
Nguyên lý CAS mang lại hai siêu năng lực cốt lõi cho Git: Thứ nhất là Khử trùng lặp tự động (Automatic Deduplication) — nếu bạn có 100 tệp tin ở 100 thư mục khác nhau nhưng cùng chung nội dung, Git chỉ lưu đúng 1 đối tượng duy nhất trên đĩa, tiết kiệm dung lượng khổng lồ. Thứ hai là Tính toàn vẹn mật mã học (Cryptographic Integrity) — không ai có thể âm thầm sửa đổi mã nguồn trong quá khứ mà không làm thay đổi toàn bộ cây mã băm.

---

## 🧠 Mental Model & Mô hình tư duy
Hãy so sánh việc tìm một người bằng số Căn cước công dân (Định danh theo nội dung) với việc tìm theo số phòng khách sạn (Định danh theo vị trí). Nếu tìm theo số phòng, người thuê phòng có thể thay đổi liên tục nhưng số phòng vẫn là 301. Nhưng nếu tìm theo số Căn cước công dân gắn liền với vân tay và võng mạc (nội dung sinh trắc học), dù người đó có di chuyển sang bất kỳ tỉnh thành nào trên thế giới thì danh tính của họ vẫn duy nhất và không bao giờ bị trùng lặp.

---

## 🖼️ Sơ đồ minh họa
```text
Cơ chế tạo mã băm trong Content-Addressable Storage:
Nội dung văn bản: "hello\n" (chiều dài: 6 bytes)
Loại đối tượng:  blob

Chuỗi dữ liệu chuẩn hóa đưa vào hàm băm:
"blob 6\0hello\n"
        │
        ▼ [Hàm băm mật mã học SHA-1]
  ce013625030ba8dba906f756967f9e9cf3944e52

(Bất kỳ ai trên thế giới băm chuỗi này đều ra đúng mã hash trên!)
```

---

## 🌎 Ví dụ thực tế
Một lập trình viên sao chép một tệp thư viện JavaScript có dung lượng 5 MB có tên `lodash.js` vào 10 thư mục module khác nhau trong dự án. Khi thực hiện `git add .`, lập trình viên lo lắng rằng thư mục `.git/` sẽ bị phình to thêm 50 MB (5 MB x 10). Tuy nhiên, khi kiểm tra dung lượng, thư mục `.git/objects/` chỉ tăng thêm đúng 5 MB. Lý do là vì cả 10 tệp tin đều có chung nội dung, Git áp dụng nguyên lý Content-Addressable Storage và tính toán ra cùng một mã băm SHA-1 duy nhất. Cả 10 đường dẫn khác nhau đều trỏ chung về một đối tượng Blob duy nhất trên đĩa.

---

## 💻 Command & Lệnh thao tác
```bash
echo -e "test content\n" | git hash-object --stdin
sha1sum
```

---

## 🔍 Giải thích chi tiết lệnh
Lệnh git hash-object --stdin nhận dữ liệu từ luồng đầu vào, tự động gắn tiêu đề chuẩn của đối tượng và tính toán mã băm SHA-1 tương ứng mà không cần phải tạo tệp tin vật lý trên đĩa.

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Cho rằng mã băm của tệp tin chỉ tính từ nội dung của tệp**:  Git bắt buộc phải ghép thêm phần tiêu đề `"<type> <size>\0"` trước khi băm.
2. **Sợ rằng việc đổi tên tệp tin (rename file) sẽ làm tăng gấp đôi dung lượng repository**:  Vì nội dung không đổi, Blob cũ được tái sử dụng 100%.
3. **Nghĩ rằng mã băm SHA-1 có thể bị trùng lặp ngẫu nhiên trong một dự án thực tế**:  Xác suất va chạm SHA-1 là vô cùng nhỏ, tương đương xác suất bị sét đánh trúng trúng xổ số nhiều lần liên tiếp.

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Chạy lệnh `echo "hello world" | git hash-object --stdin` và ghi lại mã băm đầu ra.
2. Tạo một tệp `a.txt` chứa dòng chữ "hello world" và chạy `git hash-object a.txt`.
3. Tạo một tệp `b.txt` nằm trong thư mục con cũng chứa dòng chữ "hello world" và so sánh mã băm.

---

## 💡 Gợi ý thực hiện (Hint)
> Hai tệp tin ở hai vị trí khác nhau, mang hai tên gọi khác nhau, nhưng hễ có nội dung giống nhau thì sẽ có mã băm SHA-1 giống hệt nhau.

---

## ✅ Kiểm tra kết quả (Validation)
Xác nhận mã băm của hai tệp tin có cùng nội dung là hoàn toàn trùng khớp 100%.

---

## ❓ Câu hỏi ôn tập (Quiz)
Cùng kiểm tra mức độ thấu hiểu nguyên lý Content-Addressable Storage qua các câu hỏi sau.

---

## 🔥 Thử thách nâng cao (Challenge)
Nếu bạn có một dự án mã nguồn gồm 10.000 tệp tin nhưng tất cả các tệp đều hoàn toàn trống rỗng (0 bytes), cơ sở dữ liệu đối tượng của Git sẽ tạo ra bao nhiêu đối tượng Blob?

---

## 📚 Tổng kết kiến thức
- Content-Addressable Storage lưu trữ và truy xuất dữ liệu dựa trên mã băm nội dung của chính nó.
- Công thức tính băm chuẩn của Git luôn bao gồm tiêu đề: `"<type> <size>\0<content>"`.
- Mang lại khả năng tự động khử trùng lặp dữ liệu tuyệt đối và bảo đảm tính toàn vẹn bất biến.
