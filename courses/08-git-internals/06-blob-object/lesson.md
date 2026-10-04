# Đối tượng Blob: Lưu trữ nội dung nhị phân và tệp tin

---

## 🎯 Mục tiêu
- Hiểu rõ bản chất của đối tượng Blob (Binary Large Object) trong Git.
- Nắm vững quy tắc quan trọng: Blob CHỈ lưu trữ nội dung dữ liệu thô, HOÀN TOÀN KHÔNG lưu tên tệp, ngày giờ hay quyền hạn.
- Sử dụng các lệnh plumbing (`git hash-object`, `git cat-file`) để băm, ghi và giải mã một đối tượng Blob.
- Hiểu cách Git tách biệt nội dung khỏi siêu dữ liệu để tối ưu hóa việc đổi tên và di chuyển tệp.

---

## 🧩 Từ khóa hôm nay

### Blob Object
- **Nói dễ hiểu**: Loại đối tượng Git dùng để lưu trữ nội dung dữ liệu của một tệp tin.
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
Blob là loại object lưu byte nội dung đã được Git đưa vào object database. Blob không chứa tên đường dẫn, mode thực thi hoặc thời gian file; tree ghi tên và mode, còn commit ghi metadata lịch sử.

---

## 🤔 Tại sao cần?
Việc tách rời nội dung tệp tin (Blob) ra khỏi siêu dữ liệu và vị trí thư mục (Tree) là một phát minh thiết kế thiên tài và tinh tế của Git. Nhờ sự phân tách độc lập này, khi bạn đổi tên một tệp tin lớn từ `movie_old.mp4` thành `movie_new.mp4` hoặc di chuyển nó vào một thư mục khác, Git không cần phải nhân đôi hay nén lại đối tượng lưu trữ 1 GB đó, mà chỉ cần cập nhật một dòng chữ nhỏ trong đối tượng Tree trỏ tới cùng một Blob ID cũ. Điều này giúp tiết kiệm tối đa dung lượng đĩa và đẩy nhanh tốc độ thực thi.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy tưởng tượng nội dung cuốn tiểu thuyết của bạn là một bức thư tay dài (Blob). Bức thư này được nhét vào trong một chiếc phong bì thư. Trên mặt ngoài phong bì có ghi: "Tên người nhận: app.js", "Ngày gửi: 2026", "Quyền hạn: 100644" (Tree). Bạn có thể đổi chữ ghi ngoài phong bì thành bất kỳ tên gì bạn thích, nhưng bức thư tay nằm bên trong phong bì thì vẫn giữ nguyên từng con chữ không hề thay đổi.

---

## 🖼 Sơ đồ
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

## 🌎 Ví dụ thực tế
Tạo `sample.txt` với một đoạn văn bản, sau đó chạy `git hash-object -w sample.txt`. Dùng object ID được in ra với `git cat-file -p <object-id>` để đọc lại dữ liệu. Nếu xóa file trong working tree, object vẫn có thể đọc được khi còn trong database; nếu object không được refs sử dụng, Git có thể thu gom về sau nên đây không phải cách sao lưu.

---

## 💻 Command
```bash
# Tạo và lưu trữ đối tượng Blob vào database từ tệp tin
git hash-object -w file.txt

# Kiểm tra kiểu của đối tượng (trả về "blob")
git cat-file -t <object-id>

# Xem kích thước byte chính xác của đối tượng
git cat-file -s <object-id>

# Giải nén và in nội dung dữ liệu của Blob
git cat-file -p <object-id>
```

---

## 🔍 Giải thích command
- `git hash-object -w file.txt`: Tính object ID và ghi object vào object database; khi mới ghi, object thường là loose object.
- `git cat-file -t <hash>`: In ra định danh loại đối tượng (chữ `blob`).
- `git cat-file -s <hash>`: Trả về số byte thực tế của nội dung tệp.
- `git cat-file -p <hash>`: Lệnh "pretty-print" giải nén dữ liệu và in trực tiếp ra màn hình terminal.

---

## ⚠️ Sai lầm phổ biến
1. **Tìm kiếm tên tệp bên trong Blob**: Blob hoàn toàn không lưu tên tệp, việc cố đọc tên tệp từ blob là bất khả thi. Tên tệp chỉ được lưu trong đối tượng Tree.
2. **Nhầm lẫn giữa Blob và Commit**: Blob không có thông điệp commit, không có tên tác giả, không có con trỏ cha.
3. **Nghĩ rằng Blob chỉ dành cho tệp nhị phân**: Mọi file mã nguồn TypeScript, Python, HTML hay JSON đều được Git lưu trữ dưới dạng đối tượng Blob.

---

## 🧪 Lab
Hãy mở terminal và cùng tôi thực hành từng bước dưới đây để làm chủ kỹ năng:

1. Tạo `demo.txt` với một đoạn văn bản không nhạy cảm.
2. Chạy `git hash-object -w demo.txt`; lưu object ID vừa in ra.
3. Dùng `git cat-file -t <object-id>` để xác nhận loại là `blob` và `git cat-file -s <object-id>` để xem số byte.
4. Chạy `git cat-file -p <object-id>` để đọc nội dung; nếu xóa file thử, object vẫn có thể đọc ngay nhưng không được đảm bảo giữ sau này nếu không còn ref.

---

## 💡 Hint
> Sử dụng lệnh `git cat-file -s <hash>` nếu bạn muốn biết kích thước chính xác theo đơn vị byte của đối tượng Blob đó mà không cần in toàn bộ dữ liệu ra màn hình.

---

## ✅ Validation
- Lệnh `git cat-file -t` hiển thị chính xác kết quả `blob`.
- Lệnh `git cat-file -p` in ra toàn bộ nội dung văn bản gốc đã ghi vào tệp `demo.txt`.

---

## ❓ Quiz
Hãy kiểm tra kiến thức về đối tượng Blob trong cơ sở dữ liệu Git qua các câu hỏi trong phần trắc nghiệm bên dưới.

---

## 🔥 Challenge
Nếu bạn đổi tên một tệp tin 100 MB trong dự án và thực hiện commit, dung lượng của kho chứa `.git/` sẽ tăng thêm bao nhiêu byte? Hãy giải thích dựa trên cơ chế chia tách giữa Blob và Tree.

---

## 📚 Tổng kết
- Blob là đối tượng cơ bản nhất trong Git dùng để lưu trữ nội dung dữ liệu thô của tệp tin.
- Blob hoàn toàn không chứa tên tệp, quyền hạn tệp hay dấu thời gian.
- Sử dụng `git cat-file -p <hash>` để xem nội dung và `git cat-file -t <hash>` để kiểm tra loại đối tượng.
- Tách Blob khỏi Tree giúp giữ nguyên object nội dung khi chỉ đổi tên hoặc di chuyển file; object không được tham chiếu không được bảo đảm giữ mãi.
