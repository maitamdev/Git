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
- **Nói dễ hiểu**: Lệnh plumbing cơ bản nhận dữ liệu, tính toán mã băm SHA-1 theo chuẩn tiêu đề Git (`<type> <size>\0<content>`) và in ra màn hình.
- **Ví dụ**: Chạy `git hash-object README.md` để xem mã băm SHA-1 mà file này sẽ nhận được khi lưu vào Git.
- **Đừng nhầm**: Không làm thay đổi staging area; lệnh này hoạt động độc lập và không đụng tới tệp `.git/index`.

### -w (Write Flag)
- **Nói dễ hiểu**: Tùy chọn yêu cầu Git nén dữ liệu bằng zlib và ghi tệp đối tượng vào đúng thư mục con tương ứng trong `.git/objects/`.
- **Ví dụ**: Chạy `git hash-object -w README.md` thực sự tạo ra tệp nhị phân trên đĩa.
- **Đừng nhầm**: Nếu quên cờ `-w`, Git chỉ in mã băm ra terminal mà không lưu bất kỳ dữ liệu nào vào kho đối tượng.

### --stdin Flag
- **Nói dễ hiểu**: Cờ thông báo cho Git đọc nội dung trực tiếp từ luồng ký tự đầu vào của terminal thay vì đọc từ một file vật lý trên đĩa.
- **Ví dụ**: Kết hợp qua đường ống: `echo "Hello Git" | git hash-object --stdin`.
- **Đừng nhầm**: Không yêu cầu người dùng gõ mật khẩu; đây là cơ chế truyền dữ liệu tiêu chuẩn (standard input) của Unix.

---

## 📖 Định nghĩa
`git hash-object` là một lệnh Plumbing cơ bản nhận một tệp tin hoặc luồng dữ liệu đầu vào, tính toán mã băm mật mã học (SHA-1 hoặc SHA-256) của đối tượng đó theo đúng công thức tiêu đề của Git (`<type> <size>\0<content>`), và in mã băm 40 ký tự ra màn hình. Khi kèm theo tùy chọn `-w` (write), lệnh này sẽ trực tiếp nén dữ liệu bằng zlib và ghi tệp đối tượng vào đúng vị trí trong thư mục `.git/objects/`.

---

## 💡 Tại sao cần
Lệnh `git hash-object` là viên gạch đầu tiên giúp bạn phá vỡ ảo tưởng rằng Git là một công cụ ma thuật thần bí khó hiểu. Bằng cách tự tay đưa một chuỗi văn bản vào cơ sở dữ liệu đối tượng mà không cần thông qua Staging Area hay tạo commit, bạn trực tiếp chứng kiến cách Git mã hóa và nén dữ liệu ở tầng vật lý, xây dựng nền tảng tư duy vững chắc để tự tay lắp ráp cây thư mục Merkle Tree và tạo commit thủ công hoàn toàn độc lập.

---

## 🧠 Mental Model
Hãy tưởng tượng bạn đang cầm trên tay một chiếc máy dập mã vạch và đóng gói chân không công nghiệp trong một dây chuyền tự động. Bạn đưa một bức thư vào máy. Chiếc máy tự động đếm số lượng ký tự, dán một nhãn tiêu chuẩn lên đầu bức thư, hút chân không túi nhựa bảo quản (tương đương nén zlib), in ra một mã số băm SHA-1 40 ký tự độc nhất và cất chiếc túi vào đúng ngăn kệ lưu trữ trong kho hàng theo 2 ký tự đầu của mã số.

---

## 📊 Sơ đồ minh họa
```text
Quy trình vận hành của lệnh git hash-object -w:
Chuỗi văn bản ──► [Gắn Header: "blob 15\0"] ──► [Hàm băm SHA-1] ──► Mã băm 40 ký tự
                                                          │
                                                          ▼ [Nén zlib]
                                                Ghi tệp đối tượng vào:
                                                .git/objects/xx/yyyyzz
```

---

## 🏢 Ví dụ thực tế
Một kỹ sư muốn tạo đối tượng lưu trữ chuỗi văn bản "Hello World" trực tiếp từ dòng lệnh mà không cần tạo tệp trên đĩa cứng. Kỹ sư chạy câu lệnh terminal: `echo "Hello World" | git hash-object -w --stdin`. Git xử lý tức thì và trả về chuỗi mã băm: `557db03de997c86a4a028e1ebd3a1ceb225be238`. Ngay sau đó, kỹ sư kiểm tra thư mục nội tạng `.git/objects/55/` và phát hiện một tệp tin nhị phân mới tinh có tên `7db03de997c86a4a028e1ebd3a1ceb225be238` đã được ghi xuống đĩa thành công. Bằng một lệnh duy nhất, dữ liệu văn bản đã được đóng gói và bảo toàn vĩnh cửu trong cơ sở dữ liệu của Git mà không cần dùng đến lệnh `git add`.

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
- `echo "Hello Internals" | git hash-object -w --stdin`: Đọc chuỗi qua đường ống pipe, gắn tiêu đề `blob 16\0`, băm SHA-1 và ghi vào `.git/objects/`.
- `git hash-object -w myfile.txt`: Đọc trực tiếp từ tệp tin vật lý, tính kích thước và lưu đối tượng blob vào database.
- Không có cờ `-w`: Git chỉ in mã băm 40 ký tự ra stdout mà không đụng chạm đến ổ đĩa.

---

## ⚠️ Sai lầm phổ biến
1. **Quên cờ `-w`**: Git chỉ in mã băm ra màn hình mà hoàn toàn không lưu đối tượng vào thư mục `.git/objects/`, khiến các lệnh sau không tìm thấy mã băm.
2. **Ký tự xuống dòng khác biệt giữa các hệ điều hành**: Lệnh `echo` trên PowerShell có thể gửi kèm `\r\n` (CRLF) thay vì `\n` (LF) như Linux, khiến mã SHA-1 sinh ra khác nhau.
3. **Nghĩ rằng hash-object đưa file vào Staging**: Lệnh này chỉ ghi vào cơ sở dữ liệu đối tượng thô, tệp `.git/index` hoàn toàn không biết tới sự tồn tại của file này.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.

1. **Bước 1**: Tạo một tệp tin mới `secret.txt` chứa nội dung "Top secret data".
2. **Bước 2**: Chạy lệnh `git hash-object -w secret.txt` và sao chép lại mã băm 40 ký tự hiển thị trên màn hình.
3. **Bước 3**: Mở thư mục `.git/objects/` và xác nhận sự tồn tại của thư mục con 2 ký tự đầu tương ứng.
4. **Bước 4**: Chạy `git cat-file -p <mã_băm>` để kiểm tra nội dung được khôi phục từ object store.

---

## 💡 Hint & mẹo
> Ghi nhớ: cờ `-w` viết tắt của "write". Nếu không có cờ `-w`, lệnh hoạt động ở chế độ chỉ đọc mô phỏng.

---

## ✅ Validation & Kết quả mong đợi
- Tệp đối tượng nhị phân xuất hiện chính xác trong thư mục `.git/objects/xx/` sau khi thực thi lệnh có cờ `-w`.
- Lệnh `git cat-file -p` đọc thành công chuỗi "Top secret data" từ mã SHA-1 đó.

---

## ❓ Quiz nhanh
Hãy kiểm tra kỹ năng sử dụng lệnh plumbing git hash-object qua các câu hỏi trong phần trắc nghiệm bên dưới.

---

## 🚀 Thử thách nâng cao
Làm thế nào để sử dụng tùy chọn `-t` của `git hash-object` để băm một tệp tin dưới dạng đối tượng Tree hoặc Commit thay vì mặc định là Blob?

---

## 📝 Tổng kết
- `git hash-object` tính toán mã băm SHA-1 theo chuẩn định dạng đối tượng của Git.
- Thêm cờ `-w` để ghi đối tượng nén zlib vào thư mục `.git/objects/`.
- Cờ `--stdin` cho phép đọc dữ liệu trực tiếp từ đường ống pipe của terminal.
- Là viên gạch nền tảng để tạo Blob thủ công mà không cần qua lệnh Porcelain `git add`.
