# Kỹ thuật Resolve Conflict từng bước

---

## 🎯 Mục tiêu
- Nắm vững quy trình chuẩn 4 bước giải quyết xung đột Merge Conflict trong môi trường chuyên nghiệp.
- Sử dụng thành thạo các tùy chọn giải quyết: Accept Current Change, Accept Incoming Change, hoặc Accept Both.
- Hiểu rõ tầm quan trọng sống còn của thao tác `git add <file>` sau khi sửa xong conflict.
- Biết cách trao đổi với đồng nghiệp trước khi đưa ra quyết định giữ lại dòng code nào.

---

## 📖 Định nghĩa
> Resolve Conflict (Giải quyết xung đột) là quy trình thủ công mang tính quyết định của con người nhằm loại bỏ các điểm mâu thuẫn trong mã nguồn khi merge. Quy trình này bao gồm: mở tệp tin bị xung đột, đọc hiểu cả hai khối thay đổi, lựa chọn giữ lại code của nhánh hiện tại (Current / Ours), giữ lại code của nhánh được gộp (Incoming / Theirs), hoặc kết hợp cả hai, xóa sạch các vạch đánh dấu `<<<<<<<`, `=======`, `>>>>>>>`, lưu tệp lại, chạy lệnh `git add` để thông báo cho Git biết tệp đã được giải quyết, và cuối cùng hoàn tất bằng `git commit`.

---

## 🤔 Tại sao cần?
Kỹ năng giải quyết xung đột một cách chuẩn mực và tự tin là ranh giới phân biệt giữa một lập trình viên nghiệp dư và một kỹ sư phần mềm thực thụ. Giải quyết conflict ẩu tả hoặc xóa nhầm code của đồng nghiệp là nguyên nhân hàng đầu làm phát sinh các lỗi ngầm nghiêm trọng trên môi trường production. Làm chủ kỹ thuật 4 bước này giúp bạn biến một tình huống căng thẳng thành một cơ hội phối hợp nhóm ăn ý và nâng cao chất lượng mã nguồn.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung việc giải quyết conflict giống như việc hai luật sư cùng ngồi lại để thống nhất một điều khoản hợp đồng kinh tế bị mâu thuẫn. Luật sư bên mua đưa ra đề xuất thanh toán trong 30 ngày (Current), luật sư bên bán đề xuất thanh toán ngay trong 7 ngày (Incoming). Hai người ngồi lại đàm phán và thống nhất phương án hòa giải: thanh toán 50% trong 7 ngày và 50% còn lại trong 30 ngày (Accept Both & Edit). Sau khi xóa bỏ các ghi chú tranh cãi trên bản thảo, cả hai bên cùng ký tên đóng dấu (git add và git commit).

---

## 🖼 Sơ đồ
```text
Quy trình 4 bước chuẩn Resolve Conflict:
[Bước 1: Chẩn đoán]  ──► git status (Xác định danh sách tệp Unmerged)
                               │
                               ▼
[Bước 2: Sửa thủ công] ──► Mở file, chọn code giữ lại, xóa sạch <<<< ==== >>>>
                               │
                               ▼
[Bước 3: Đánh dấu xong] ──► git add <file> (Báo cho Git tệp đã Resolved)
                               │
                               ▼
[Bước 4: Hoàn tất]    ──► git commit (Đóng gói tạo Merge Commit hoàn chỉnh)
```

---

## 🌎 Ví dụ thực tế
Trong tệp thanh toán payment.js của sàn thương mại điện tử, nhánh main có hàm tính thuế VAT 8% cho đơn hàng, trong khi nhánh feature-discount lại có hàm áp dụng mã giảm giá 20% cho thành viên mới. Khi lập trình viên thực hiện merge hai nhánh, Git báo conflict tại khối hàm tính tiền thanh toán. Lập trình viên mở trình soạn thảo, xem xét cả hai đoạn mã và nhận thấy cả hai logic đều vô cùng cần thiết: khách hàng vừa được hưởng giảm giá 20% vừa phải nộp thuế VAT 8% theo luật định. Lập trình viên kết hợp cả hai khối logic vào một hàm tính toán hoàn chỉnh, xóa sạch các dòng đánh dấu xung đột, lưu tệp lại rồi chạy: `git add payment.js` và `git commit -m "merge: integrate discount and tax calculation"`. Toàn bộ hệ thống thanh toán sau đó vượt qua các bài kiểm thử tự động một cách hoàn hảo.

---

## 💻 Command
```bash
git status
git add <tên-tệp-đã-sửa>
git commit
git commit -m "merge: resolved conflict in <tên-tệp>"
```

---

## 🔍 Giải thích command
- `git status`: Kiểm tra tình trạng giải quyết; các tệp đã sửa và `git add` sẽ chuyển sang màu xanh lá trong Staging Area.
- `git add <file>`: Cực kỳ quan trọng! Lệnh này đánh dấu cho Git biết tệp tin đã được giải quyết xung đột thành công (Mark as resolved).
- `git commit`: Hoàn tất quá trình tạo Merge Commit sau khi tất cả các tệp unmerged đã được git add.
- `git commit -m "<thông-điệp>"`: Tạo merge commit với thông điệp tùy chỉnh mô tả rõ cách thức bạn đã giải quyết mâu thuẫn.

---

## ⚠️ Sai lầm phổ biến
1. **Quên chạy git add sau khi đã sửa xong tệp**:  Git sẽ không biết bạn đã sửa xong và lệnh git commit sẽ báo lỗi từ chối.
2. **Tự ý giải quyết code logic của người khác mà không hỏi**:  Dẫn đến việc xóa nhầm các đoạn xử lý ngoại lệ quan trọng của đồng nghiệp.
3. **Sử dụng git add . mù quáng**:  Có thể stage nhầm các tệp nháp sinh ra trong quá trình gỡ lỗi xung đột.

---

## 🧪 Lab
1. Mở tệp `app.js` đang bị xung đột từ bài học trước trong trình soạn thảo.
2. Xóa các vạch `<<<<<<< HEAD`, `=======`, `>>>>>>> feature` và giữ lại dòng code chuẩn xác nhất.
3. Lưu tệp tin và chạy lệnh `git add app.js` để đánh dấu đã giải quyết.
4. Chạy lệnh `git commit` để hoàn tất việc tạo Merge Commit.

---

## 💡 Hint
> Nhớ quy tắc vàng: Sửa file -> Xóa vạch markers -> Lưu -> `git add` -> `git commit`.

---

## ✅ Validation
- Kiểm tra `git status` báo `working tree clean` và đồ thị commit đã được hợp nhất.

---

## ❓ Quiz
Hãy làm bài trắc nghiệm dưới đây về các bước giải quyết xung đột chuyên nghiệp.

---

## 🔥 Challenge
Mô tả vai trò của công cụ đồ họa 3-way merge tool như VS Code Merge Editor trong việc trực quan hóa conflict.

---

## 📚 Tổng kết
- Quy trình chuẩn: Mở file -> Chọn code đúng -> Xóa markers -> Lưu file -> git add -> git commit.
- `git add <file>` là bước bắt buộc để báo cho Git biết xung đột đã được giải quyết xong.
- Luôn trao đổi với đồng nghiệp nếu không chắc chắn về logic nghiệp vụ của đoạn code bị mâu thuẫn.
