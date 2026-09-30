# Đối tượng Blob: Lưu trữ nội dung nhị phân và tệp tin

---

## 🎯 Mục tiêu bài học
- Hiểu rõ bản chất của đối tượng Blob (Binary Large Object) trong Git.
- Nắm vững quy tắc quan trọng: Blob CHỈ lưu trữ nội dung dữ liệu thô, HOÀN TOÀN KHÔNG lưu tên tệp, ngày giờ hay quyền hạn.
- Sử dụng các lệnh plumbing để băm, ghi và giải mã một đối tượng Blob.

---

## 📖 Định nghĩa
> Blob (viết tắt của Binary Large Object - Đối tượng nhị phân lớn) là loại đối tượng đơn giản nhất và chiếm số lượng nhiều nhất trong cơ sở dữ liệu của Git. Nhiệm vụ duy nhất của Blob là lưu trữ toàn bộ nội dung dữ liệu thô của một tệp tin. Điều tối quan trọng cần ghi nhớ: một đối tượng Blob hoàn toàn không chứa tên tệp tin, không chứa quyền hạn thực thi (permissions), và không chứa ngày giờ tạo lập.

---

## 🤔 Tại sao cần?
Việc tách rời nội dung tệp tin (Blob) ra khỏi siêu dữ liệu và vị trí thư mục (Tree) là một phát minh thiết kế thiên tài và tinh tế của Git. Nhờ sự phân tách độc lập này, khi bạn đổi tên một tệp tin lớn từ `movie_old.mp4` thành `movie_new.mp4` hoặc di chuyển nó vào một thư mục khác, Git không cần phải nhân đôi hay nén lại đối tượng lưu trữ 1 GB đó, mà chỉ cần cập nhật một dòng chữ nhỏ trong đối tượng Tree trỏ tới cùng một Blob ID cũ. Điều này giúp tiết kiệm tối đa dung lượng đĩa và đẩy nhanh tốc độ thực thi.

---

## 🧠 Mental Model & Mô hình tư duy
Hãy tưởng tượng nội dung cuốn tiểu thuyết của bạn là một bức thư tay dài (Blob). Bức thư này được nhét vào trong một chiếc phong bì thư. Trên mặt ngoài phong bì có ghi: "Tên người nhận: app.js", "Ngày gửi: 2026", "Quyền hạn: 100644" (Tree). Bạn có thể đổi chữ ghi ngoài phong bì thành bất kỳ tên gì bạn thích, nhưng bức thư tay nằm bên trong phong bì thì vẫn giữ nguyên từng con chữ không hề thay đổi.

---

## 🖼️ Sơ đồ minh họa
```text
Cấu trúc của đối tượng Blob:
┌────────────────────────────────────────────────────────┐
│                     BLOB OBJECT                        │
├────────────────────────────────────────────────────────┤
│ Header:  "blob <content_length>\0"                     │
│ Payload: Toàn bộ nội dung dữ liệu thô của tệp tin      │
│                                                        │
│ ❌ KHÔNG CÓ: Tên tệp tin (filename)                    │
│ ❌ KHÔNG CÓ: Đường dẫn thư mục (path)                  │
│ ❌ KHÔNG CÓ: Quyền hạn tệp (mode/chmod)                │
│ ❌ KHÔNG CÓ: Ngày giờ commit (timestamp)               │
└────────────────────────────────────────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Một kỹ sư phần mềm thực hiện thử nghiệm tạo một tệp tin mới có tên `sample.txt` với nội dung văn bản thuần túy "Xin chào Git Academy". Kỹ sư mở cửa sổ dòng lệnh và chạy lệnh plumbing cơ bản: `git hash-object -w sample.txt` và lập tức nhận được chuỗi mã băm SHA-1: `3b18e512db79e4c8300de074a1e281301f6181f0`. Sau đó, kỹ sư xóa hẳn tệp tin `sample.txt` khỏi thư mục làm việc và dọn sạch thùng rác. Bằng cách sử dụng lệnh `git cat-file -p 3b18e512db79e4c8300de074a1e281301f6181f0`, màn hình lập tức in ra dòng chữ "Xin chào Git Academy". Dù tệp tin trên ổ đĩa đã bị xóa hoàn toàn và tên gọi của tệp không còn lưu trong bảng tệp của hệ điều hành, nhưng nội dung dữ liệu của nó đã được bảo tồn an toàn trong đối tượng Blob của Git.

---

## 💻 Command & Lệnh thao tác
```bash
git hash-object -w file.txt
git cat-file -t <hash>
git cat-file -p <hash>
```

---

## 🔍 Giải thích chi tiết lệnh
Lệnh git hash-object -w ghi tệp vào object store, git cat-file -t in ra loại đối tượng (sẽ trả về chữ "blob"), và git cat-file -p in ra nội dung đã giải nén của đối tượng đó.

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Tìm kiếm tên tệp tin bên trong nội dung đối tượng Blob và nghĩ rằng Git bị lỗi khi không thấy tên tệp.**: 
2. **Nhầm lẫn giữa đối tượng Blob và đối tượng Commit**:  Blob không có thông điệp commit, không có tên tác giả.
3. **Nghĩ rằng Blob chỉ dùng cho tệp nhị phân như ảnh hay video**:  Mọi tệp mã nguồn văn bản như `.ts`, `.java`, `.py` đều được lưu dưới dạng Blob.

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Tạo một tệp `demo.txt` chứa một đoạn văn bản ngắn.
2. Sử dụng `git hash-object -w demo.txt` để tạo và ghi Blob vào cơ sở dữ liệu.
3. Dùng lệnh `git cat-file -t <mã-băm>` để xác nhận loại đối tượng là `blob`.

---

## 💡 Gợi ý thực hiện (Hint)
> Sử dụng lệnh `git cat-file -s <hash>` nếu bạn muốn biết kích thước chính xác theo đơn vị byte của đối tượng Blob đó.

---

## ✅ Kiểm tra kết quả (Validation)
Giải nén và xem được nội dung văn bản của Blob từ mã băm mà không cần mở tệp gốc.

---

## ❓ Câu hỏi ôn tập (Quiz)
Hãy kiểm tra kiến thức về đối tượng Blob trong cơ sở dữ liệu Git qua các câu hỏi sau.

---

## 🔥 Thử thách nâng cao (Challenge)
Nếu bạn đổi tên một tệp tin 100 MB trong dự án và thực hiện commit, dung lượng của kho chứa `.git/` sẽ tăng thêm bao nhiêu byte?

---

## 📚 Tổng kết kiến thức
- Blob là đối tượng cơ bản nhất trong Git dùng để lưu trữ nội dung dữ liệu thô của tệp tin.
- Blob hoàn toàn không chứa tên tệp, quyền hạn tệp hay dấu thời gian.
- Sử dụng `git cat-file -p <hash>` để xem nội dung và `git cat-file -t <hash>` để kiểm tra loại đối tượng.
