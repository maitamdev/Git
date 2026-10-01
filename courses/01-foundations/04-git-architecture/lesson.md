# Git hoạt động như thế nào?

---

## 🎯 Mục tiêu
- Giải thích được Git lưu các mốc dự án theo cách nào ở mức khái niệm.
- Phân biệt “một mốc đã lưu” với “danh sách khác biệt giữa hai mốc”.
- Nhận ra tên như Blob, Tree và Commit sẽ được học sâu hơn sau này.

---

## 🧩 Từ khóa hôm nay

### Snapshot — ảnh chụp trạng thái
- **Nói dễ hiểu:** Cách hình dung một mốc lưu như trạng thái của dự án tại thời điểm bạn tạo commit.
- **Ví dụ:** Sau khi trang giới thiệu chạy đúng, bạn lưu một mốc để có thể xem lại phiên bản đó.
- **Đừng nhầm:** Đây là cách hiểu khái niệm; Git không tạo một bản sao nguyên vẹn riêng cho mọi tệp không đổi.

### Diff — phần khác nhau
- **Nói dễ hiểu:** Bản so sánh cho biết những dòng hoặc tệp đã đổi giữa hai trạng thái.
- **Ví dụ:** Diff có thể chỉ ra nút “Gửi” được đổi thành “Đăng ký”.
- **Đừng nhầm:** Diff là thứ Git trình bày để bạn xem thay đổi; nó không phải cách duy nhất để hiểu Git lưu lịch sử.

### Commit — mốc đã lưu
- **Nói dễ hiểu:** Bản ghi trong lịch sử Git đại diện cho trạng thái dự án mà bạn chọn lưu.
- **Ví dụ:** “Thêm trang giới thiệu” là lời nhắn của một commit.
- **Đừng nhầm:** Sửa tệp chưa tự tạo commit; bạn cần thực hiện thao tác lưu mốc.

---

## 📖 Định nghĩa
Ở mức dễ hình dung, mỗi commit cho biết dự án ở trạng thái nào tại một mốc. Khi cần, Git cũng cho xem phần khác nhau giữa hai mốc. Các chi tiết về cách những mốc này nối với nhau và Git lưu dữ liệu bên trong sẽ được học ở Level 8.

---

## 🤔 Tại sao cần?
Khi sửa một tệp, bạn thường muốn biết chính xác điều gì đã đổi. Git giúp lưu các mốc dự án và so sánh chúng. Hôm nay chỉ cần nắm hai ý: Snapshot là trạng thái đã lưu; Diff cho thấy phần khác nhau.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy tưởng tượng bạn chụp lại bàn học ở hai thời điểm: trước và sau khi sắp xếp. Mỗi ảnh là một Snapshot. Đặt hai ảnh cạnh nhau để tìm điểm khác nhau chính là Diff.

---

## 🖼 Sơ đồ
```text
Tệp trước khi sửa:   "Xin chào"
Tệp sau khi sửa:    "Xin chào Git"
Diff:               thêm chữ "Git"
Snapshot:           trạng thái dự án được ghi thành một mốc
```

---

## 🌎 Ví dụ thực tế
Bạn sửa một dòng trong `README.md`. Khi tạo commit, Git ghi lại trạng thái dự án ở mốc đó. Nếu muốn biết dòng nào vừa sửa, bạn xem Diff giữa bản đang làm và mốc đã lưu. Git tối ưu cách giữ dữ liệu bên trong; người mới chưa cần học chi tiết đó.

---

## 💻 Command
```bash
git status
git log --oneline
```

---

## 🔍 Giải thích command
- `git status`: Cho biết tệp nào mới hoặc đã sửa trong thư mục dự án.
- `git log --oneline`: Liệt kê các mốc commit đã lưu, mỗi mốc gói gọn trên một dòng.

---

## ⚠️ Sai lầm phổ biến
1. **Nhầm Snapshot với Diff**: Snapshot là trạng thái đã lưu; Diff là phần dùng để so sánh.
2. **Tưởng sửa tệp là đã tạo commit**: Bạn cần chủ động tạo commit ở bước học sau.
3. **Cố học cấu trúc bên trong ngay bây giờ**: Blob, Tree và cách Git nối lịch sử sẽ được học ở Level 8.

---

## 🧪 Lab
1. Chạy `git status` và ghi lại tên tệp đang được báo là đã sửa.
2. Chạy `git log --oneline` để xem các mốc đã lưu.
3. Nói thành một câu sự khác nhau giữa Snapshot và Diff.

---

## 💡 Hint
> Snapshot là trạng thái đã lưu; Diff là phần khác nhau giữa hai trạng thái.

---

## ✅ Validation
- Giải thích được Snapshot và Diff bằng ví dụ về một tệp đã sửa.

---

## ❓ Quiz
Hoàn thành các câu hỏi dưới đây để kiểm tra kiến thức về kiến trúc Snapshot của Git.

---

## 🔥 Challenge
Sửa một câu trong README, sau đó mô tả đâu là nội dung mới và mốc nào vẫn chưa được lưu.

---

## 📚 Tổng kết
- Commit ghi lại trạng thái dự án ở một mốc.
- Diff giúp xem phần khác nhau giữa hai trạng thái.
- Cấu trúc bên trong của Git sẽ học ở Level 8.
