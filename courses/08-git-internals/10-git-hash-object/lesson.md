# Tạo và băm đối tượng thủ công với git hash-object

---

## 🎯 Mục tiêu bài học
- Làm chủ lệnh plumbing quan trọng hàng đầu: git hash-object.
- Sử dụng các cờ cốt lõi: -w (write to database), --stdin (đọc từ luồng tiêu chuẩn), -t (chỉ định loại đối tượng).
- Tự tay tạo ra một đối tượng Blob hợp lệ trong thư mục .git/objects/ mà không cần dùng git add hay git commit.

---

## 📖 Định nghĩa
> git hash-object là một lệnh Plumbing cơ bản nhận một tệp tin hoặc luồng dữ liệu đầu vào, tính toán mã băm mật mã học (SHA-1 hoặc SHA-256) của đối tượng đó theo đúng công thức tiêu đề của Git (`<type> <size>\0<content>`), và in mã băm 40 ký tự ra màn hình. Khi kèm theo tùy chọn -w (write), lệnh này sẽ trực tiếp nén dữ liệu bằng zlib và ghi tệp đối tượng vào đúng vị trí trong thư mục .git/objects/.

---

## 🤔 Tại sao cần?
Lệnh git hash-object là viên gạch đầu tiên giúp bạn phá vỡ ảo tưởng rằng Git là một công cụ ma thuật thần bí khó hiểu. Bằng cách tự tay đưa một chuỗi văn bản vào cơ sở dữ liệu đối tượng mà không cần thông qua Staging Area hay tạo commit, bạn trực tiếp chứng kiến cách Git mã hóa và nén dữ liệu ở tầng vật lý, xây dựng nền tảng tư duy vững chắc để tự tay lắp ráp cây thư mục Merkle Tree và tạo commit thủ công hoàn toàn độc lập.

---

## 🧠 Mental Model & Mô hình tư duy
Hãy tưởng tượng bạn đang cầm trên tay một chiếc máy dập mã vạch và đóng gói chân không công nghiệp trong một dây chuyền tự động. Bạn đưa một bức thư vào máy. Chiếc máy tự động đếm số lượng ký tự, dán một nhãn tiêu chuẩn lên đầu bức thư, hút chân không túi nhựa bảo quản (tương đương nén zlib), in ra một mã số băm SHA-1 40 ký tự độc nhất và cất chiếc túi vào đúng ngăn kệ lưu trữ trong kho hàng theo 2 ký tự đầu của mã số.

---

## 🖼️ Sơ đồ minh họa
```text
Quy trình vận hành của lệnh git hash-object -w:
Chuỗi văn bản ──► [Gắn Header: "blob 15\0"] ──► [Hàm băm SHA-1] ──► Mã băm 40 ký tự
                                                          │
                                                          ▼ [Nén zlib]
                                                Ghi tệp đối tượng vào:
                                                .git/objects/xx/yyyyzz
```

---

## 🌎 Ví dụ thực tế
Một kỹ sư muốn tạo đối tượng lưu trữ chuỗi văn bản "Hello World" trực tiếp từ dòng lệnh mà không cần tạo tệp trên đĩa cứng. Kỹ sư chạy câu lệnh terminal: `echo "Hello World" | git hash-object -w --stdin`. Git xử lý tức thì và trả về chuỗi mã băm: `557db03de997c86a4a028e1ebd3a1ceb225be238`. Ngay sau đó, kỹ sư kiểm tra thư mục nội tạng `.git/objects/55/` và phát hiện một tệp tin nhị phân mới tinh có tên `7db03de997c86a4a028e1ebd3a1ceb225be238` đã được ghi xuống đĩa thành công. Bằng một lệnh duy nhất, dữ liệu văn bản đã được đóng gói và bảo toàn vĩnh cửu trong cơ sở dữ liệu của Git mà không cần dùng đến lệnh git add.

---

## 💻 Command & Lệnh thao tác
```bash
echo "Hello Internals" | git hash-object -w --stdin
git hash-object -w myfile.txt
```

---

## 🔍 Giải thích chi tiết lệnh
Câu lệnh thứ nhất đọc trực tiếp từ luồng ký tự đầu vào với cờ --stdin và ghi xuống đĩa với cờ -w, trong khi câu lệnh thứ hai đọc nội dung từ một tệp tin vật lý có sẵn trên đĩa và tính toán mã băm SHA-1 tương ứng của tệp tin đó một cách chính xác.

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Quên truyền cờ `-w`**:  Git chỉ in mã băm ra màn hình mà hoàn toàn KHÔNG lưu đối tượng vào thư mục `.git/objects/`.
2. **Dùng lệnh echo trên Windows PowerShell vô tình gửi kèm ký tự xuống dòng `\r\n` làm sai lệch mã băm so với môi trường Linux `\n`.**: 
3. **Nghĩ rằng `git hash-object` sẽ tự động cập nhật tệp tin vào Staging Area (lệnh này chỉ ghi vào Object Store, không đụng chạm đến Index).**: 

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Tạo một tệp tin mới `secret.txt` chứa nội dung "Top secret data".
2. Chạy lệnh `git hash-object -w secret.txt` và sao chép lại mã băm 40 ký tự hiển thị trên màn hình.
3. Mở thư mục `.git/objects/` và xác nhận sự tồn tại của thư mục con 2 ký tự đầu tương ứng.

---

## 💡 Gợi ý thực hiện (Hint)
> Ghi nhớ: cờ `-w` viết tắt của "write". Nếu không có cờ `-w`, lệnh hoạt động ở chế độ chỉ đọc mô phỏng.

---

## ✅ Kiểm tra kết quả (Validation)
Tệp đối tượng nhị phân xuất hiện chính xác trong thư mục `.git/objects/xx/` sau khi thực thi lệnh.

---

## ❓ Câu hỏi ôn tập (Quiz)
Hãy kiểm tra kỹ năng sử dụng lệnh plumbing git hash-object qua các câu hỏi sau.

---

## 🔥 Thử thách nâng cao (Challenge)
Làm thế nào để sử dụng tùy chọn `-t` của git hash-object để băm một tệp tin dưới dạng đối tượng Tree hoặc Commit thay vì mặc định là Blob?

---

## 📚 Tổng kết kiến thức
- `git hash-object` tính toán mã băm SHA-1 theo chuẩn định dạng đối tượng của Git.
- Thêm cờ `-w` để ghi đối tượng nén zlib vào thư mục `.git/objects/`.
- Là viên gạch nền tảng để tạo Blob thủ công mà không cần qua lệnh Porcelain `git add`.
