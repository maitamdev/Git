# Undo trong Git: restore/reset/revert khác nhau

---

## 🎯 Mục tiêu
- Phân biệt rõ ràng mục đích, phạm vi tác động và ngữ cảnh sử dụng của 3 cơ chế hoàn tác: restore, reset và revert.
- Hiểu rõ sự khác biệt giữa hoàn tác tệp tin trong Working Tree/Staging và hoàn tác commit trong lịch sử.
- Nhận thức tính an toàn của git revert khi làm việc trên các nhánh cộng tác dùng chung so với git reset.
- Lựa chọn chính xác câu lệnh hoàn tác phù hợp nhất cho từng tình huống phát sinh lỗi thực tế.

---

## 📖 Định nghĩa
> Trong hệ thống quản lý phiên bản Git, nhu cầu hoàn tác (Undo) có thể xảy ra ở nhiều tầng kiến trúc khác nhau, từ việc hủy bỏ những chỉnh sửa chưa lưu trong thư mục làm việc cho đến việc thu hồi toàn bộ một commit đã xuất bản lên máy chủ. Để đáp ứng các kịch bản đó một cách chính xác, Git cung cấp bộ 3 công cụ hoàn tác chuyên biệt: `git restore` chuyên trách xử lý tệp tin ở Working Tree và Staging Area, `git reset` dịch chuyển con trỏ nhánh để viết lại lịch sử cục bộ, và `git revert` tạo commit đảo ngược an toàn cho các nhánh dùng chung.

---

## 🤔 Tại sao cần?
Sai lầm phổ biến nhất của các lập trình viên mới học Git là dùng sai công cụ hoàn tác, dẫn đến việc vô tình xóa sạch công sức lập trình cả ngày mà không thể lấy lại. Nắm vững ranh giới giữa restore, reset và revert giúp bạn làm chủ hoàn toàn các cỗ máy thời gian của Git: bạn biết chính xác khi nào chỉ cần hủy chỉnh sửa cục bộ, khi nào nên xóa bỏ commit thử nghiệm trên máy riêng, và khi nào bắt buộc phải dùng revert để bảo vệ an toàn cho đồng nghiệp đang cùng làm việc trên nhánh chung.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung việc soạn thảo một bức thư tay quan trọng gửi khách hàng. `git restore` giống như việc bạn dùng cục tẩy để xóa một từ vừa viết sai trên giấy nháp trước khi cho vào phong bì. `git reset` giống như việc bạn xé bỏ bức thư vừa viết xong ném vào sọt rác và lùi lại thời điểm trước khi đặt bút viết. Còn `git revert` giống như việc bạn đã trót gửi bức thư đi qua bưu điện, bạn không thể đến nhà khách hàng để lấy lại thư, nên bạn viết tiếp một bức thư đính chính thứ hai gửi đến để hủy bỏ hiệu lực của bức thư thứ nhất.

---

## 🖼 Sơ đồ
```text
Bản đồ 3 cơ chế Undo trong Git:
Working Tree / Staging:  git restore <file> (Hủy sửa đổi tệp tin)
Local Branch History:    git reset (Dịch chuyển HEAD & nhánh lùi về quá khứ)
Public / Shared Branch:  git revert (Tạo commit mới phủ định commit cũ)
```

---

## 🌎 Ví dụ thực tế
Kỹ sư Nam trong một buổi chiều làm việc đã gặp phải 3 tình huống cần hoàn tác khác nhau. Đầu tiên, Nam vô tình sửa hỏng tệp cấu hình database.js nhưng chưa lưu vào staging, Nam chạy `git restore database.js` để trả lại trạng thái nguyên bản. Tiếp đó, Nam tạo thử 2 commit thử nghiệm tính năng trên nhánh cá nhân và không ưng ý, Nam chạy `git reset --hard HEAD~2` để xóa bỏ hoàn toàn 2 commit đó. Cuối cùng, Nam phát hiện một commit đã push lên nhánh main gây lỗi thanh toán, Nam lập tức chạy `git revert HEAD` để sinh ra một commit mới đảo ngược logic hỏng mà không làm xáo trộn lịch sử của cả đội ngũ.

---

## 💻 Command
```bash
git restore <tên-tệp>
git restore --staged <tên-tệp>
git reset --mixed HEAD~1
git revert <commit-hash>
```

---

## 🔍 Giải thích command
- `git restore <tệp>`: Khôi phục nội dung tệp tin trong Working Directory về trạng thái của commit gần nhất.
- `git restore --staged <tệp>`: Đưa tệp tin ra khỏi Staging Area mà vẫn giữ nguyên nội dung chỉnh sửa.
- `git reset`: Dịch chuyển con trỏ nhánh về commit chỉ định và điều chỉnh lại Staging hoặc Working Tree.
- `git revert <hash>`: Tạo ra một commit hoàn toàn mới mang nội dung đảo ngược lại commit được chỉ định.

---

## ⚠️ Sai lầm phổ biến
1. **Sử dụng git reset --hard trên nhánh dùng chung đã push lên GitHub**:  Làm sai lệch lịch sử của tất cả các đồng nghiệp khác.
2. **Nhầm lẫn giữa git restore và git reset**:  Dùng reset khi chỉ muốn hủy thay đổi của một tệp đơn lẻ.
3. **Sợ hãi không dám dùng revert vì nghĩ revert sẽ xóa mất commit cũ**:  Revert chỉ tạo thêm commit mới chứ không xóa lịch sử.

---

## 🧪 Lab
1. Tạo một chỉnh sửa nhỏ trong tệp `test.txt` và hủy bỏ bằng lệnh `git restore test.txt`.
2. Thêm tệp vào staging bằng `git add` rồi rút ra bằng `git restore --staged test.txt`.
3. Tạo một commit thử nghiệm và thực hiện `git revert HEAD` để quan sát commit đảo ngược.
4. Kiểm tra lại lịch sử bằng `git log --oneline` để xác nhận commit mới được tạo ra an toàn.

---

## 💡 Hint
> Nhớ nguyên tắc vàng: Nhánh cá nhân dùng reset, nhánh cộng tác dùng chung luôn luôn dùng revert.

---

## ✅ Validation
- Phân biệt chính xác và thực hành thành thạo 3 cơ chế hoàn tác restore, reset và revert.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về các cơ chế hoàn tác trong Git.

---

## 🔥 Challenge
Tại sao lệnh `git checkout` trước phiên bản Git 2.23 bị coi là quá tải (overloaded) và cần tách thành switch và restore?

---

## 📚 Tổng kết
- `git restore` chuyên dùng để khôi phục trạng thái tệp tin trong Working Directory hoặc Staging Area.
- `git reset` dịch chuyển con trỏ nhánh lùi về quá khứ, phù hợp cho việc viết lại lịch sử cục bộ.
- `git revert` tạo commit mới đảo ngược commit cũ, là phương pháp an toàn duy nhất trên nhánh dùng chung.
