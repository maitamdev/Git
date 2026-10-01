# Version Control là gì?

---

## 🎯 Mục tiêu
- Giải thích bằng ví dụ vấn đề mà quản lý phiên bản giúp giải quyết.
- Nêu được vì sao đặt nhiều bản sao tên `final` dễ gây nhầm.
- Phân biệt phần đang sửa với một mốc đã lưu trong lịch sử Git.

---

## 🧩 Từ khóa hôm nay

### Version Control — quản lý phiên bản
- **Nói dễ hiểu:** Cách ghi lại những phiên bản bạn chọn để sau này xem lại, so sánh hoặc lấy lại nội dung cũ.
- **Ví dụ:** Trước khi sửa bài thuyết trình, bạn lưu một mốc “bản đã được giảng viên duyệt”. Nếu lần sửa sau làm lệch bố cục, bạn có thể so sánh với mốc đó.
- **Đừng nhầm:** Git không tự lưu mọi lần bạn gõ phím. Bạn phải chủ động chọn lúc lưu một mốc.

### VCS (Version Control System) — hệ thống quản lý phiên bản
- **Nói dễ hiểu:** Phần mềm giúp ghi lại và xem lịch sử thay đổi của tệp. Git là một VCS.
- **Ví dụ:** Git thường được dùng cho mã nguồn, nhưng cũng có thể theo dõi tài liệu hoặc hình ảnh.
- **Đừng nhầm:** VCS không tự sửa lỗi chương trình và không thay thế bản sao lưu ở nơi khác.

### Commit — mốc đã lưu trong Git
- **Nói dễ hiểu:** Một bản ghi về trạng thái dự án mà bạn chủ động đưa vào lịch sử Git.
- **Ví dụ:** Sau khi hoàn thành phần đầu trang, bạn lưu một commit với lời nhắn “Tạo phần đầu trang”.
- **Đừng nhầm:** Commit không lưu từng lần gõ phím và cũng không tự gửi dữ liệu sang máy khác.

### History — lịch sử thay đổi
- **Nói dễ hiểu:** Danh sách các commit đã lưu, được xếp theo quan hệ trước sau.
- **Ví dụ:** Bạn có thể đọc các lời nhắn “Tạo phần đầu trang” rồi “Sửa nút gửi” để biết dự án đã thay đổi ra sao.
- **Đừng nhầm:** Phần bạn mới sửa nhưng chưa lưu thành commit chưa xuất hiện trong lịch sử Git.

---

## 🤔 Tại sao cần?
Bạn sửa bài tập web và vô tình làm hỏng trang từng chạy tốt. Nếu chỉ còn tệp hiện tại, bạn khó biết phần nào vừa đổi và không có mốc rõ ràng để so sánh. Tạo nhiều bản `final`, `final-2`, `final-moi-nhat` có thể giữ lại vài bản, nhưng tên tệp không cho biết chính xác chúng khác nhau ở đâu hoặc bản nào đã được kiểm tra.

Version Control ghi lại những mốc bạn chọn. Nhờ vậy, bạn có thể xem khác biệt giữa các mốc và lấy lại nội dung từ một mốc cũ. Công cụ không tự biết bản nào tốt nhất; bạn cần chọn mốc có ý nghĩa và ghi lời nhắn dễ hiểu.

---

## 📖 Định nghĩa
Version Control là cách ghi lại các phiên bản đã chọn của một hay nhiều tệp theo thời gian. Phần mềm dùng để quản lý lịch sử đó được gọi là Version Control System (VCS). Trong Git, một trạng thái được lưu vào lịch sử gọi là commit.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung lịch sử Git như một cuốn sổ có các mốc bạn tự chọn. Mỗi commit ghi nhận trạng thái dự án tại một thời điểm; những lần sửa sau vẫn nằm ngoài lịch sử cho đến khi bạn chủ động lưu thành mốc mới.

---

## 🖼 Sơ đồ
```text
Trong lịch sử:  [Commit 1: trang chạy tốt] ───> [Commit 2: thêm trang giới thiệu]
                                                     |
Bạn đang sửa:                                        └──> sửa nút gửi, chưa lưu thành commit
```
Chỉ hai ô `Commit` là mốc đã lưu. Phần sửa nút gửi chưa nằm trong lịch sử.

---

## 🌎 Ví dụ thực tế
Nhóm sinh viên hoàn thành phần đầu trang câu lạc bộ và lưu commit “Tạo phần đầu trang”. Hôm sau một lần sửa làm lệch giao diện. Nhóm có thể so sánh phần đang sửa với commit trước đó để tìm thay đổi liên quan, rồi lấy lại nội dung cần thiết. Git cho nhóm lịch sử để tra cứu; các bạn vẫn phải tự kiểm tra và quyết định cách sửa.

---

## 💻 Command
Bài này chưa cần chạy lệnh Git; trước tiên hãy hiểu vấn đề mà lịch sử phiên bản giải quyết.

---

## 🔍 Giải thích command
Đây là bài nhập môn về ý tưởng quản lý phiên bản, chưa hướng dẫn thao tác bằng lệnh. Bạn sẽ bắt đầu dùng lệnh Git ở các bài tiếp theo.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ Git tự lưu mọi lần gõ:** Chỉ những trạng thái bạn chủ động lưu thành commit mới được ghi vào lịch sử.
2. **Dùng nhiều bản `final` thay cho lịch sử:** Các bản sao không tự cho biết chính xác từng thay đổi và lý do thay đổi.
3. **Coi Git trên một máy là bản sao lưu đầy đủ:** Nếu thiết bị hỏng, dữ liệu Git chỉ nằm trên thiết bị đó vẫn có thể mất.

---

## 🧪 Lab
Một nhóm có ba tệp `bai-final.docx`, `bai-final-2.docx` và `bai-final-moi-nhat.docx`. Một tệp có phần sửa mới nhất, nhưng nhóm không nhớ tệp nào đã được giảng viên duyệt.

1. Viết một câu nêu thông tin mà tên ba tệp chưa cho bạn biết.
2. Chọn một trạng thái đáng lưu thành commit trước khi sửa tiếp và giải thích vì sao.
3. Giả sử lần sửa tiếp theo làm hỏng nội dung: nói cách lịch sử phiên bản giúp nhóm tìm phần cần xem lại.

---

## 💡 Hint
Hãy tự hỏi: “Tôi muốn giữ lại trạng thái nào?”, “Tôi cần biết hai trạng thái khác nhau ở đâu?” và “Phần sửa chưa lưu có nằm trong lịch sử chưa?”

---

## ✅ Validation
- Nêu được VCS ghi lại các phiên bản đã chọn để xem lại hoặc so sánh.
- Giải thích được commit là một mốc chủ động lưu vào lịch sử Git.
- Phân biệt được phần đang sửa với phần đã lưu thành commit.

---

## ❓ Quiz
Trả lời các câu hỏi sau. Nếu chọn sai, đọc phần giải thích rồi thử lại.

---

## 🔥 Challenge
Giải thích cho một bạn chưa dùng Git vì sao lịch sử các mốc có lời nhắn giúp nhóm tìm lại thay đổi dễ hơn những bản sao tên `bai-final-2`.

---

## 📚 Tổng kết
- Version Control giúp lưu các phiên bản đã chọn để xem lại, so sánh hoặc lấy lại nội dung cũ.
- Trong Git, commit là một mốc trạng thái được chủ động ghi vào lịch sử.
- Thay đổi chưa lưu thành commit chưa có trong lịch sử; Git cũng không tự tạo bản sao lưu ở nơi khác.
