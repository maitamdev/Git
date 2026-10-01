# Vì sao cần lưu phiên bản?

---

## 🎯 Mục tiêu
- Nói được bằng lời của mình hệ thống quản lý phiên bản giúp giải quyết việc gì.
- Nhận ra vì sao các bản `final`, `final-2`, `final-moi-nhat` dễ gây nhầm.
- Phân biệt mốc đã lưu trong Git với tệp đang sửa dở.

---

## 🧩 Từ khóa hôm nay

### Version Control — quản lý phiên bản
- **Nói dễ hiểu:** Cách lưu lại các mốc thay đổi để sau này xem lại, so sánh hoặc quay về một mốc đã lưu.
- **Ví dụ:** Trước khi sửa bài thuyết trình, bạn lưu một mốc “bản đã được giảng viên duyệt”. Nếu lần sửa sau làm hỏng bố cục, bạn có thể đối chiếu với mốc đó.
- **Đừng nhầm:** Git không tự chụp mọi lần bạn gõ phím. Bạn phải chủ động yêu cầu Git lưu một mốc.

### VCS (Version Control System) — hệ thống quản lý phiên bản
- **Nói dễ hiểu:** Tên gọi chung cho phần mềm giúp lưu và xem lịch sử thay đổi của tệp. Git là một VCS.
- **Ví dụ:** Git có thể theo dõi mã nguồn; một VCS khác cũng có thể theo dõi tài liệu hoặc hình ảnh.
- **Đừng nhầm:** VCS không tự sửa lỗi chương trình và không thay thế bản sao lưu cho mọi tình huống.

### History — lịch sử thay đổi
- **Nói dễ hiểu:** Danh sách các mốc mà bạn đã yêu cầu Git lưu, thường kèm người lưu, thời điểm và lời nhắn.
- **Ví dụ:** “Tạo trang giới thiệu” → “Sửa lỗi nút gửi” là hai mốc có thể đọc lại.
- **Đừng nhầm:** Tệp bạn mới sửa nhưng chưa lưu thành mốc chưa xuất hiện như một commit trong lịch sử.

---

## 🤔 Tại sao cần?
Bạn và một bạn cùng làm bài tập web. Hôm qua trang chạy tốt. Hôm nay bạn sửa phần đăng nhập rồi trang lỗi. Nếu chỉ có một thư mục, bạn khó biết chính xác phần nào đã đổi và bản chạy tốt nằm ở đâu. Đặt thêm tên `final-v2` cũng không nói rõ bản nào là bản tốt.

Git giúp bạn lưu các mốc có lời nhắn, xem khác biệt giữa hai mốc và chọn lại nội dung cũ khi cần. Bạn vẫn phải chủ động lưu mốc; Git không tự quyết định thay bạn.

---

## 📖 Định nghĩa
Version Control là cách ghi lại các phiên bản đã chọn của tệp theo thời gian. Phần mềm thực hiện việc đó được gọi là Version Control System (VCS). Git là một VCS thường dùng trong phát triển phần mềm.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy nghĩ về các mốc như những bản lưu riêng trong một cuốn sổ tiến độ. Mỗi khi hoàn thành một phần có ý nghĩa, bạn ghi lại một mốc và đặt tên cho nó. Nếu lần sau có lỗi, bạn có thể mở mốc cũ để so sánh hoặc khôi phục phần cần thiết.

Điểm cần nhớ: cuốn sổ chỉ có những mốc bạn đã chủ động ghi; nó không tự lưu từng thao tác gõ phím.

---

## 🖼 Sơ đồ
```text
Bạn chủ động lưu:   [Bản chạy được] ──> [Thêm trang giới thiệu] ──> [Sửa nút gửi]
                       mốc 1                 mốc 2                  mốc 3
```
Mỗi mốc ghi lại một trạng thái bạn muốn giữ. Git không tự tạo mốc khi bạn chỉ sửa tệp.

---

## 🌎 Ví dụ thực tế
Một nhóm sinh viên làm chung trang giới thiệu câu lạc bộ. Sau khi phần đầu trang chạy đúng, nhóm lưu mốc “Tạo phần đầu trang”. Hôm sau một thay đổi làm lệch giao diện, nhóm so sánh với mốc trước để tìm đoạn vừa đổi. Các bạn vẫn cần lưu mốc và viết lời nhắn rõ ràng; Git không tự biết thay đổi nào là tốt.

---

## 💻 Command
```bash
git --version
```

---

## 🔍 Giải thích command
`git --version` chỉ kiểm tra Git đã được cài và in số phiên bản. Lệnh này chưa tạo kho lưu trữ và chưa lưu thay đổi nào.

---

## ⚠️ Sai lầm phổ biến
1. **Tin rằng Git tự lưu mọi lần gõ:** Git chỉ đưa thay đổi vào lịch sử sau khi bạn thực hiện các bước lưu mốc.
2. **Đặt tên thư mục `final`, `final2`, `final-mới`:** Tên không giải thích nội dung nào đã đổi hoặc bản nào còn đúng.
3. **Coi Git như bản sao lưu duy nhất:** Nếu máy hỏng trước khi bạn đẩy dữ liệu lên nơi khác, bản trên máy vẫn có thể mất.

---

## 🧪 Lab
Chọn một tình huống làm bạn dễ mất công nhất: không biết bản nào chạy được, không biết ai sửa phần nào, hay lỡ tay ghi đè bài của bạn cùng nhóm. Sau đó giải thích bằng một câu mốc lưu nào của Version Control sẽ giúp bạn xử lý tình huống đó.

---

## 💡 Hint
Hãy kể theo thứ tự: “Trước khi lỗi xảy ra, tôi muốn lưu lại ___; khi lỗi xảy ra, tôi sẽ so sánh với ___.”

---

## ✅ Validation
- Giải thích được VCS giúp lưu và xem lại các mốc thay đổi.
- Nhắc được rằng Git không tự lưu mọi lần gõ phím.

---

## ❓ Quiz
Trả lời các câu hỏi sau. Khi sai, đọc phần giải thích rồi thử lại.

---

## 🔥 Challenge
Nói cho một bạn chưa dùng Git hiểu vì sao đặt tên thư mục `bai-final-2` không đáng tin bằng việc lưu một mốc có lời nhắn.

---

## 📚 Tổng kết
- **Version Control** là cách lưu và xem lại các phiên bản đã chọn.
- **VCS** là phần mềm giúp quản lý lịch sử thay đổi; Git là một VCS.
- Mốc chỉ xuất hiện khi bạn chủ động lưu; Git không tự lưu từng lần gõ.
