# Git hoạt động như thế nào? Snapshot và Diff

---

## 🎯 Mục tiêu
- Giải thích commit ghi nhận trạng thái dự án tại một thời điểm.
- Phân biệt Snapshot (trạng thái đã lưu) với Diff (phần khác nhau).
- So sánh hai phiên bản mẫu để chỉ ra thay đổi cụ thể.

---

## 🧩 Từ khóa hôm nay

### Snapshot — ảnh chụp trạng thái
- **Nói dễ hiểu:** Cách hình dung trạng thái các tệp trong dự án tại lúc bạn lưu một commit.
- **Ví dụ:** Sau khi trang giới thiệu chạy đúng, commit ghi nhận dự án ở trạng thái đó.
- **Đừng nhầm:** Đây là mô hình để hiểu kết quả; Git không tạo một thư mục sao chép riêng cho mỗi commit.

### Diff — phần khác nhau
- **Nói dễ hiểu:** Bản so sánh chỉ ra nội dung thay đổi giữa hai phiên bản.
- **Ví dụ:** Nếu dòng cũ là “Xin chào” và dòng mới là “Xin chào Git”, phần thêm là từ “Git”.
- **Đừng nhầm:** Diff giúp nhìn thấy thay đổi; nó không tự lưu một commit mới.

### Commit — mốc đã lưu
- **Nói dễ hiểu:** Bản ghi trong lịch sử Git đại diện cho trạng thái dự án bạn chọn lưu.
- **Ví dụ:** Commit “Thêm lời chào” ghi nhận phiên bản có dòng “Xin chào Git”.
- **Đừng nhầm:** Sửa tệp sau khi commit không tự cập nhật mốc đã lưu.

---

## 🤔 Tại sao cần?
Chỉ biết dự án hiện tại có những tệp nào chưa đủ để hiểu điều gì vừa đổi. Snapshot giúp bạn gọi tên trạng thái đã lưu ở mỗi commit. Diff giúp bạn so sánh hai trạng thái để tìm phần được thêm, xóa hoặc sửa.

---

## 📖 Định nghĩa
Ở mức khái niệm, một commit cho biết trạng thái các tệp trong dự án tại thời điểm bạn lưu nó; đó là Snapshot. Diff là phần khác nhau khi so sánh hai phiên bản. Git có thể dùng lại dữ liệu không đổi để tiết kiệm chỗ, nên Snapshot không có nghĩa là tạo một bản sao thư mục mới cho mỗi commit.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy tưởng tượng bạn chụp hai bức ảnh bàn học: một ảnh trước khi sắp xếp và một ảnh sau đó. Mỗi ảnh là một Snapshot. Đặt hai ảnh cạnh nhau để chỉ ra đồ vật được chuyển đi chính là Diff.

---

## 🖼 Sơ đồ
```text
Snapshot A: README có dòng “Xin chào”
Snapshot B: README có dòng “Xin chào Git”

Diff: thêm từ “Git” vào cuối dòng
```

---

## 🌎 Ví dụ thực tế
Trước khi sửa README, bạn đã lưu commit có dòng “Xin chào”. Sau đó bạn sửa thành “Xin chào Git”. Nếu lưu commit mới, lịch sử sẽ có hai trạng thái. So sánh hai trạng thái cho thấy chính xác từ nào được thêm. Cách xem khác biệt bằng lệnh sẽ được học sau khi các bước lưu tệp đã được giới thiệu.

---

## 💻 Command
Bài này dùng hai phiên bản văn bản mẫu để luyện phân biệt Snapshot và Diff; chưa cần chạy lệnh.

---

## 🔍 Giải thích command
Git có lệnh để so sánh phiên bản, nhưng bài này chưa yêu cầu dùng lệnh đó. Trước tiên hãy chắc rằng bạn phân biệt được trạng thái đã lưu với phần nội dung thay đổi.

---

## ⚠️ Sai lầm phổ biến
1. **Gọi phần khác nhau là Snapshot:** Snapshot mô tả trạng thái; Diff mô tả phần thay đổi giữa hai trạng thái.
2. **Nghĩ lưu tệp đồng nghĩa với tạo commit:** Commit là mốc lịch sử riêng; sửa hoặc lưu tệp không tự tạo mốc.
3. **Nghĩ Git chép cả thư mục thành nhiều bản:** Snapshot mô tả trạng thái dự án; Git có thể dùng lại dữ liệu không đổi.

---

## 🧪 Lab
So sánh hai phiên bản README sau:

**Phiên bản A**
```text
Tên câu lạc bộ: Sao Mai
Lịch sinh hoạt: Thứ Sáu
```

**Phiên bản B**
```text
Tên câu lạc bộ: Sao Mai
Lịch sinh hoạt: Thứ Bảy
```

1. Nêu dòng không thay đổi.
2. Viết phần Diff bằng lời: điều gì đã được sửa?
3. Nếu bạn sửa tiếp nhưng chưa tạo commit, phiên bản B đã lưu có tự đổi không?

---

## 💡 Hint
Đọc từng dòng: dòng nào giống nhau, dòng nào đổi? Diff chỉ mô tả phần khác; Snapshot là toàn bộ trạng thái tại một mốc.

---

## ✅ Validation
- Chỉ ra được dòng không đổi và dòng thay đổi giữa hai phiên bản.
- Giải thích được Snapshot là trạng thái đã lưu, còn Diff là phần khác nhau.
- Nói đúng rằng sửa tệp chưa tự cập nhật commit cũ.

---

## ❓ Quiz
Trả lời các câu hỏi sau. Khi sai, dùng ví dụ trong Lab để tự kiểm tra lại.

---

## 🔥 Challenge
Tự viết hai phiên bản ngắn của một thông báo. Gạch chân phần Diff và mô tả mỗi phiên bản là một Snapshot riêng.

---

## 📚 Tổng kết
- Snapshot mô tả trạng thái dự án tại một mốc đã lưu.
- Diff chỉ ra phần khác nhau giữa hai phiên bản.
- Sửa tệp sau khi tạo commit không tự thay đổi Snapshot đã lưu.
