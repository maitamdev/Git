# Đối tượng Blob: Lưu trữ nội dung nhị phân và tệp tin

---

## 🎯 Mục tiêu
- Hiểu rõ bản chất của đối tượng Blob (Binary Large Object) trong Git.
- Nắm vững quy tắc quan trọng: Blob CHỈ lưu trữ nội dung dữ liệu thô, HOÀN TOÀN KHÔNG lưu tên tệp, ngày giờ hay quyền hạn.
- Sử dụng các lệnh plumbing (`git hash-object`, `git cat-file`) để băm, ghi và giải mã một đối tượng Blob.
- Hiểu cách Git tách biệt nội dung khỏi siêu dữ liệu để tối ưu hóa việc đổi tên và di chuyển tệp.

---

## 🧩 Từ khóa hôm nay

### Binary Large Object (Blob)
- **Nói dễ hiểu**: Loại đối tượng Git chuyên dùng để lưu trữ toàn bộ nội dung dữ liệu thô của một tệp tin bất kỳ.
- **Ví dụ**: Nội dung file mã nguồn `server.js` hoặc file ảnh `avatar.png` đều được nén zlib thành một đối tượng Blob.
- **Đừng nhầm**: Không chứa tên file, đường dẫn hay ngày giờ sửa đổi; chỉ lưu duy nhất dữ liệu thuần túy (content payload).

### Raw Content Payload
- **Nói dễ hiểu**: Khối dữ liệu nhị phân nguyên thủy của tệp tin được đặt ngay sau phần tiêu đề `blob <size>\0`.
- **Ví dụ**: Chuỗi byte của bức ảnh hoặc chuỗi ký tự của file mã nguồn.
- **Đừng nhầm**: Không phụ thuộc vào bảng mã hay định dạng tệp; Git coi mọi tệp tin đều là một chuỗi byte thô.

### git cat-file Command
- **Nói dễ hiểu**: Lệnh plumbing đa năng dùng để thẩm vấn và hiển thị thông tin về bất kỳ đối tượng nào trong Git database.
- **Ví dụ**: Dùng `git cat-file -p <hash>` để đọc nội dung và `git cat-file -t <hash>` để xem kiểu đối tượng.
- **Đừng nhầm**: Không tương đương với lệnh `cat` của Linux vì đối tượng Git đã bị nén bằng zlib, lệnh này giải nén trước khi in ra.

---

## 📖 Định nghĩa
Blob (viết tắt của Binary Large Object - Đối tượng nhị phân lớn) là loại đối tượng đơn giản nhất và chiếm số lượng nhiều nhất trong cơ sở dữ liệu của Git. Nhiệm vụ duy nhất của Blob là lưu trữ toàn bộ nội dung dữ liệu thô của một tệp tin. Điều tối quan trọng cần ghi nhớ: một đối tượng Blob hoàn toàn không chứa tên tệp tin, không chứa quyền hạn thực thi (permissions), và không chứa ngày giờ tạo lập.

---

## 💡 Tại sao cần
Việc tách rời nội dung tệp tin (Blob) ra khỏi siêu dữ liệu và vị trí thư mục (Tree) là một phát minh thiết kế thiên tài và tinh tế của Git. Nhờ sự phân tách độc lập này, khi bạn đổi tên một tệp tin lớn từ `movie_old.mp4` thành `movie_new.mp4` hoặc di chuyển nó vào một thư mục khác, Git không cần phải nhân đôi hay nén lại đối tượng lưu trữ 1 GB đó, mà chỉ cần cập nhật một dòng chữ nhỏ trong đối tượng Tree trỏ tới cùng một Blob ID cũ. Điều này giúp tiết kiệm tối đa dung lượng đĩa và đẩy nhanh tốc độ thực thi.

---

## 🧠 Mental Model
Hãy tưởng tượng nội dung cuốn tiểu thuyết của bạn là một bức thư tay dài (Blob). Bức thư này được nhét vào trong một chiếc phong bì thư. Trên mặt ngoài phong bì có ghi: "Tên người nhận: app.js", "Ngày gửi: 2026", "Quyền hạn: 100644" (Tree). Bạn có thể đổi chữ ghi ngoài phong bì thành bất kỳ tên gì bạn thích, nhưng bức thư tay nằm bên trong phong bì thì vẫn giữ nguyên từng con chữ không hề thay đổi.

---

## 📊 Sơ đồ minh họa
```text
Cấu trúc của đối tượng Blob:
┌────────────────────────────────────────────────────────┐
│                     BLOB OBJECT                        │
├────────────────────────────────────────────────────────┤
│ Header:  "blob <content_length>\0"                     │
│ Payload: Toàn bộ nội dung dữ liệu thô của tệp tin      │
│                                                        │
│ - KHÔNG CÓ: Tên tệp tin (filename)                     │
│ - KHÔNG CÓ: Đường dẫn thư mục (path)                   │
│ - KHÔNG CÓ: Quyền hạn tệp (mode/chmod)                 │
│ - KHÔNG CÓ: Ngày giờ commit (timestamp)                │
└────────────────────────────────────────────────────────┘
```

---

## 🏢 Ví dụ thực tế
Một kỹ sư phần mềm thực hiện thử nghiệm tạo một tệp tin mới có tên `sample.txt` với nội dung văn bản thuần túy "Xin chào Git Academy". Kỹ sư mở cửa sổ dòng lệnh và chạy lệnh plumbing cơ bản: `git hash-object -w sample.txt` và lập tức nhận được chuỗi mã băm SHA-1: `3b18e512db79e4c8300de074a1e281301f6181f0`. Sau đó, kỹ sư xóa hẳn tệp tin `sample.txt` khỏi thư mục làm việc và dọn sạch thùng rác. Bằng cách sử dụng lệnh `git cat-file -p 3b18e512db79e4c8300de074a1e281301f6181f0`, màn hình lập tức in ra dòng chữ "Xin chào Git Academy". Dù tệp tin trên ổ đĩa đã bị xóa hoàn toàn và tên gọi của tệp không còn lưu trong bảng tệp của hệ điều hành, nhưng nội dung dữ liệu của nó đã được bảo tồn an toàn trong đối tượng Blob của Git.

---

## 💻 Command & Cú pháp
```bash
# Tạo và lưu trữ đối tượng Blob vào database từ tệp tin
git hash-object -w file.txt

# Kiểm tra kiểu của đối tượng (trả về "blob")
git cat-file -t 3b18e512db79e4c8300de074a1e281301f6181f0

# Xem kích thước byte chính xác của đối tượng
git cat-file -s 3b18e512db79e4c8300de074a1e281301f6181f0

# Giải nén và in nội dung dữ liệu của Blob
git cat-file -p 3b18e512db79e4c8300de074a1e281301f6181f0
```

---

## 🔍 Giải thích command
- `git hash-object -w file.txt`: Băm nội dung của `file.txt` và ghi đối tượng nén zlib vào `.git/objects/`.
- `git cat-file -t <hash>`: In ra định danh loại đối tượng (chữ `blob`).
- `git cat-file -s <hash>`: Trả về số byte thực tế của nội dung tệp.
- `git cat-file -p <hash>`: Lệnh "pretty-print" giải nén dữ liệu và in trực tiếp ra màn hình terminal.

---

## ⚠️ Sai lầm phổ biến
1. **Tìm kiếm tên tệp bên trong Blob**: Blob hoàn toàn không lưu tên tệp, việc cố đọc tên tệp từ blob là bất khả thi. Tên tệp chỉ được lưu trong đối tượng Tree.
2. **Nhầm lẫn giữa Blob và Commit**: Blob không có thông điệp commit, không có tên tác giả, không có con trỏ cha.
3. **Nghĩ rằng Blob chỉ dành cho tệp nhị phân**: Mọi file mã nguồn TypeScript, Python, HTML hay JSON đều được Git lưu trữ dưới dạng đối tượng Blob.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.

1. **Bước 1**: Tạo một tệp `demo.txt` chứa một đoạn văn bản ngắn.
2. **Bước 2**: Sử dụng `git hash-object -w demo.txt` để tạo và ghi Blob vào cơ sở dữ liệu đối tượng.
3. **Bước 3**: Dùng lệnh `git cat-file -t <mã_sha>` để xác nhận loại đối tượng là `blob`.
4. **Bước 4**: Dùng lệnh `git cat-file -p <mã_sha>` để giải nén và xem nội dung đối tượng mà không cần mở file gốc.

---

## 💡 Hint & mẹo
> Sử dụng lệnh `git cat-file -s <hash>` nếu bạn muốn biết kích thước chính xác theo đơn vị byte của đối tượng Blob đó mà không cần in toàn bộ dữ liệu ra màn hình.

---

## ✅ Validation & Kết quả mong đợi
- Lệnh `git cat-file -t` hiển thị chính xác kết quả `blob`.
- Lệnh `git cat-file -p` in ra toàn bộ nội dung văn bản gốc đã ghi vào tệp `demo.txt`.

---

## ❓ Quiz nhanh
Hãy kiểm tra kiến thức về đối tượng Blob trong cơ sở dữ liệu Git qua các câu hỏi trong phần trắc nghiệm bên dưới.

---

## 🚀 Thử thách nâng cao
Nếu bạn đổi tên một tệp tin 100 MB trong dự án và thực hiện commit, dung lượng của kho chứa `.git/` sẽ tăng thêm bao nhiêu byte? Hãy giải thích dựa trên cơ chế chia tách giữa Blob và Tree.

---

## 📝 Tổng kết
- Blob là đối tượng cơ bản nhất trong Git dùng để lưu trữ nội dung dữ liệu thô của tệp tin.
- Blob hoàn toàn không chứa tên tệp, quyền hạn tệp hay dấu thời gian.
- Sử dụng `git cat-file -p <hash>` để xem nội dung và `git cat-file -t <hash>` để kiểm tra loại đối tượng.
- Việc tách biệt Blob và Tree giúp Git khử trùng lặp và tiết kiệm bộ nhớ khi đổi tên hay di chuyển tệp.
