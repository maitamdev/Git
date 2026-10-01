# Nguyên lý cách ly không gian Branch Isolation

---

## 🎯 Mục tiêu
- Hiểu rõ nguyên lý cách ly độc lập giữa các nhánh trong Git.
- Nhận biết phạm vi tác động của một commit chỉ nằm trên nhánh đang làm việc.
- Tự tin thử nghiệm ý tưởng mới trên nhánh riêng mà không sợ hỏng mã nguồn chính.

---

## 🧩 Từ khóa hôm nay

### Branch Isolation — nguyên lý cách ly nhánh
- **Nói dễ hiểu:** Mọi commit tạo ra trên một nhánh chỉ tồn tại và ảnh hưởng trong nội bộ nhánh đó.
- **Ví dụ:** Bạn tạo tệp `chat.js` trên nhánh `feature-chat`, khi về `main` tệp này hoàn toàn không xuất hiện.
- **Đừng nhầm:** Tính cách ly chỉ áp dụng cho commit đã lưu; các tệp sửa dở chưa commit có thể đi theo khi đổi nhánh.

### Divergent History — lịch sử phân kỳ
- **Nói dễ hiểu:** Tình trạng hai nhánh cùng tách ra từ một commit cũ, sau đó mỗi nhánh tiếp tục có các commit mới riêng biệt.
- **Ví dụ:** Nhánh `main` có commit cập nhật tài liệu, nhánh `feature` có commit thêm nút bấm, tạo thành ngã rẽ chữ Y.
- **Đừng nhầm:** Lịch sử phân kỳ không phải là lỗi; đây là quy trình làm việc song song bình thường của nhóm.

### Merge — hành động hợp nhất nhánh
- **Nói dễ hiểu:** Thao tác chủ động gom toàn bộ thay đổi từ nhánh tính năng đưa vào nhánh chính.
- **Ví dụ:** Sau khi tính năng thanh toán được kiểm tra kỹ, bạn gộp `feature-pay` vào nhánh `main`.
- **Đừng nhầm:** Git không bao giờ tự động gộp các nhánh; bạn luôn phải chủ động thực hiện lệnh hợp nhất.

---

## 📖 Định nghĩa
Nguyên lý cách ly nhánh (Branch Isolation) đảm bảo rằng những commit trên một nhánh chỉ thuộc về luồng lịch sử của nhánh đó. Nhánh chính (`main`) và các nhánh khác không bị ảnh hưởng cho tới khi bạn chủ động gộp chúng lại với nhau.

---

## 🤔 Tại sao cần?
Nhờ tính cách ly, bạn có thể tự do thử nghiệm các giải pháp phức tạp hoặc viết lại code mà không sợ làm gián đoạn sản phẩm đang chạy. Nếu thử nghiệm thành công, bạn gộp vào nhánh chính; nếu thất bại, bạn chỉ cần xóa nhánh con đi là dự án lại nguyên vẹn như cũ.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung mỗi nhánh như một phòng thí nghiệm riêng biệt trong cùng một tòa nhà. Bạn làm việc, thử nghiệm và thậm chí làm hỏng thiết bị trong phòng của mình thì các phòng khác và sảnh chính của tòa nhà vẫn hoàn toàn an toàn và hoạt động bình thường.

---

## 🖼 Sơ đồ
```text
Commit chung C2:
Nhánh main:            C1 ───> C2 ───> C3 ───> C5 (main)
                               │
Nhánh feature-login:          └───> C4 ───> C6 (feature-login)
(Commit C4 và C6 hoàn toàn không xuất hiện trên nhánh main)
```

---

## 🌎 Ví dụ thực tế
Bạn An tạo nhánh `test-darkmode` để thử đổi toàn bộ giao diện sang màu tối. Sau khi sửa 10 tệp CSS và commit 3 lần, An thấy màu sắc chưa hài hòa và quyết định dừng lại. Nhờ tính cách ly của nhánh, mã nguồn trên `main` của cả nhóm vẫn hiển thị giao diện sáng chuẩn mực. An chỉ việc chuyển về `main` và xóa nhánh thử nghiệm mà không để lại bất kỳ rác thừa nào.

---

## 💻 Command
```bash
git switch -c <nhánh-thử-nghiệm>
git log --oneline --graph --all
git diff main..<nhánh-thử-nghiệm>
```

---

## 🔍 Giải thích command
- `git switch -c <nhánh-thử-nghiệm>`: Tạo ra một không gian làm việc độc lập mới để bắt đầu thử nghiệm.
- `git log --oneline --graph --all`: Xem sơ đồ cây phân nhánh trực quan của tất cả các nhánh trong dự án.
- `git diff main..<nhánh>`: So sánh tổng thể những khác biệt giữa nhánh thử nghiệm và nhánh chính.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ commit nhánh con sẽ tự sang nhánh main:** Bạn bắt buộc phải chủ động chạy lệnh hợp nhất thì code mới vào `main`.
2. **Lo lắng khi tệp của nhánh con biến mất khi chuyển về main:** Đây là hành vi đúng của Git nhằm phản ánh chính xác trạng thái của nhánh hiện tại.
3. **Để tệp sửa dở khi chuyển nhánh:** Nên commit hoặc cất tệp tạm trước khi chuyển nhánh để tránh mang nhầm code chưa hoàn thiện sang nhánh khác.

---

## 🧪 Lab
Bài tập này được thực hành trên môi trường Git mô phỏng của hệ thống:
1. Tạo nhánh cách ly bằng lệnh `git switch -c test-isolation`.
2. Tạo tệp mới `secret-test.txt` và commit vào nhánh này.
3. Chuyển quay trở lại nhánh chính bằng lệnh `git switch main`.
4. Quan sát danh sách tệp và nhận thấy `secret-test.txt` hoàn toàn không có mặt trên nhánh `main`.

---

## 💡 Hint
Khi chuyển về nhánh `main`, Git tự động dọn dẹp các tệp chỉ thuộc về nhánh con để giữ thư mục làm việc luôn đúng chuẩn.

---

## ✅ Validation
- Tệp `secret-test.txt` chỉ xuất hiện khi bạn đứng ở nhánh `test-isolation`.
- Thư mục làm việc trên nhánh `main` hoàn toàn sạch sẽ, không có tệp đó.

---

## ❓ Quiz
Trả lời các câu hỏi sau để kiểm tra sự hiểu biết về nguyên lý cách ly không gian nhánh trong Git.

---

## 🔥 Challenge
Chạy lệnh `git log --graph --oneline --all` sau khi đã commit trên cả hai nhánh để tự mình nhìn thấy ngã rẽ đồ thị chữ Y trên màn hình dòng lệnh.

---

## 📚 Tổng kết
- Branch Isolation đảm bảo các thay đổi đã commit trên nhánh này không làm ảnh hưởng nhánh khác.
- Bạn có thể thoải mái thử nghiệm ý tưởng mới trên nhánh riêng với rủi ro bằng không.
- Mã nguồn chỉ được chia sẻ giữa các nhánh khi có lệnh hợp nhất rõ ràng.
