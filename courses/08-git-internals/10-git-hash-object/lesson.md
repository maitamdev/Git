# Tạo và băm đối tượng thủ công với git hash-object

---

## 🎯 Mục tiêu
- Làm chủ lệnh plumbing quan trọng hàng đầu: `git hash-object`.
- Sử dụng các cờ cốt lõi: `-w` (write to database), `--stdin` (đọc từ luồng tiêu chuẩn), `-t` (chỉ định loại đối tượng).
- Tự tay tạo ra một đối tượng Blob hợp lệ trong thư mục `.git/objects/` mà không cần dùng `git add` hay `git commit`.
- Hiểu sự khác biệt giữa việc chỉ tính mã băm trên bộ nhớ và việc ghi dữ liệu nén zlib xuống ổ đĩa.

---

## 🧩 Từ khóa hôm nay

### git hash-object Command
- **Nói dễ hiểu**: Lệnh plumbing nhận dữ liệu, tính object ID theo hash format của repository và in kết quả.
- **Ví dụ**: Chạy `git hash-object README.md` để xem object ID của nội dung file trong repository hiện tại.
- **Đừng nhầm**: Không làm thay đổi staging area; lệnh này hoạt động độc lập và không đụng tới tệp `.git/index`.

### -w (Write Flag)
- **Nói dễ hiểu**: Tùy chọn yêu cầu Git ghi object vào object database; object ID vẫn phụ thuộc nội dung và hash format của repository.
- **Ví dụ**: Chạy `git hash-object -w README.md` thực sự tạo ra tệp nhị phân trên đĩa.
- **Đừng nhầm**: Nếu quên cờ `-w`, Git chỉ in mã băm ra terminal mà không lưu bất kỳ dữ liệu nào vào kho đối tượng.

### --stdin Flag
- **Nói dễ hiểu**: Cờ thông báo cho Git đọc nội dung trực tiếp từ luồng ký tự đầu vào của terminal thay vì đọc từ một file vật lý trên đĩa.
- **Ví dụ**: Kết hợp qua đường ống: `echo "Hello Git" | git hash-object --stdin`.
- **Đừng nhầm**: Không yêu cầu người dùng gõ mật khẩu; đây là cơ chế truyền dữ liệu tiêu chuẩn (standard input) của Unix.

---

## 📖 Định nghĩa
`git hash-object` nhận một tệp hoặc luồng dữ liệu, ghép header `<type> <size>\0`, rồi tính object ID bằng hash format của repository (SHA-1 hoặc SHA-256). Khi thêm `-w`, Git ghi object vào object database; lệnh không cập nhật index hay branch ref. Object không được tham chiếu có thể bị garbage collection thu gom về sau.

---

## 💡 Tại sao cần
Lệnh `git hash-object` là viên gạch đầu tiên giúp bạn phá vỡ ảo tưởng rằng Git là một công cụ ma thuật thần bí khó hiểu. Bằng cách tự tay đưa một chuỗi văn bản vào cơ sở dữ liệu đối tượng mà không cần thông qua Staging Area hay tạo commit, bạn trực tiếp chứng kiến cách Git mã hóa và nén dữ liệu ở tầng vật lý, xây dựng nền tảng tư duy vững chắc để tự tay lắp ráp cây thư mục Merkle Tree và tạo commit thủ công hoàn toàn độc lập.

---

## 🧠 Mental Model
Hãy tưởng tượng máy nhận byte dữ liệu, gắn nhãn cho biết loại và kích thước, rồi tính ID từ cả nhãn lẫn nội dung. Khi dùng `-w`, Git ghi object; nếu repo SHA-1, ID thường có 40 ký tự, còn repo SHA-256 có 64.

---

## 📊 Sơ đồ minh họa
```text
Quy trình vận hành của lệnh git hash-object -w:
 Payload bytes ──► [Header: "blob <byte-count>\0" + payload]
                              │
                              ▼ [Hash theo định dạng của repository]
                         Object ID
                              │
                              ▼ [Ghi object]
       Loose path (nếu loose) hoặc packfile (nếu được đóng gói)
```

---

## 🏢 Ví dụ thực tế
Trong repository SHA-1, chạy `echo "Hello World" | git hash-object -w --stdin` trong Bash để hash nội dung `Hello World` kèm newline sẽ in `557db03de997c86a4a028e1ebd3a1ceb225be238`. Khi loose, object có thể nằm dưới `objects/55/`; dùng `git cat-file -p <object-id>` để kiểm tra. Lệnh không stage nội dung và object không được tham chiếu có thể bị thu gom về sau.

---

## 💻 Command & Cú pháp
```bash
# Băm và ghi trực tiếp từ chuỗi ký tự terminal
echo "Hello Internals" | git hash-object -w --stdin

# Băm và ghi từ tệp tin có sẵn trên đĩa
git hash-object -w myfile.txt

# Chỉ tính mã băm kiểm tra mà không ghi xuống đĩa (chế độ preview)
git hash-object myfile.txt
```

---

## 🔍 Giải thích command
- `echo "Hello Internals" | git hash-object -w --stdin`: Trong Bash, `echo` thêm newline nên phần blob có 16 byte; Git tính object ID theo repo và ghi object vào database.
- `git hash-object -w myfile.txt`: Đọc trực tiếp từ tệp tin vật lý, tính kích thước và lưu đối tượng blob vào database.
- Không có cờ `-w`: Git chỉ in object ID ra stdout mà không ghi object mới vào database.

---

## ⚠️ Sai lầm phổ biến
1. **Quên cờ `-w`**: Git chỉ in mã băm ra màn hình mà hoàn toàn không lưu đối tượng vào thư mục `.git/objects/`, khiến các lệnh sau không tìm thấy mã băm.
2. **Ký tự xuống dòng khác biệt giữa các hệ điều hành**: Lệnh `echo` trên PowerShell có thể gửi kèm `\r\n` (CRLF) thay vì `\n` (LF) như Linux, khiến mã SHA-1 sinh ra khác nhau.
3. **Nghĩ rằng hash-object đưa file vào Staging**: Lệnh này chỉ ghi vào cơ sở dữ liệu đối tượng thô, tệp `.git/index` hoàn toàn không biết tới sự tồn tại của file này.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.

1. Trong repository thực hành, tạo `blob-demo.txt` với nội dung không nhạy cảm.
2. Chạy `git hash-object -w blob-demo.txt` và lưu object ID được in ra (độ dài tùy hash format).
3. Dùng `git rev-parse --git-path objects` để xem đường dẫn object store mà Git đang dùng.
4. Chạy `git cat-file -t <object-id>` và `git cat-file -p <object-id>` để xác nhận loại và nội dung. Xóa file thử không xóa object ngay; object chưa được tham chiếu không phải bản sao lưu.

---

## 💡 Hint & mẹo
> `-w` viết tắt của “write”. Không có `-w`, lệnh chỉ tính object ID và không ghi object mới.

---

## ✅ Validation & Kết quả mong đợi
- `git cat-file -t <object-id>` trả về `blob` và `git cat-file -p <object-id>` in nội dung đã hash.
- `git hash-object` không cập nhật Staging Area; cần `git add` riêng nếu muốn đưa file vào index.

---

## ❓ Quiz nhanh
Hãy kiểm tra kỹ năng sử dụng lệnh plumbing git hash-object qua các câu hỏi trong phần trắc nghiệm bên dưới.

---

## 🚀 Thử thách nâng cao
Vì sao `git hash-object -t tree file.txt` không tự biến file văn bản thành Tree hợp lệ? Nêu lệnh phù hợp để tạo tree từ index và commit từ tree.

---

## 📝 Tổng kết
- `git hash-object` tính object ID theo chuẩn header và hash format của repository.
- Thêm cờ `-w` để ghi đối tượng nén zlib vào thư mục `.git/objects/`.
- Cờ `--stdin` cho phép đọc dữ liệu trực tiếp từ đường ống pipe của terminal.
- Là viên gạch nền tảng để tạo Blob thủ công mà không cần qua lệnh Porcelain `git add`.
