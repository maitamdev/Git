# Git là gì? Kiến trúc phân tán

---

## 🎯 Mục tiêu
- Nắm bắt nguồn gốc ra đời của Git do Linus Torvalds khởi xướng vào năm 2005.
- Hiểu rõ các triết lý thiết kế cơ bản: tốc độ, an toàn dữ liệu, hỗ trợ phân nhánh phi tuyến tính.
- Xác định được vai trò trung tâm của Git trong quy trình CI/CD và văn hóa DevOps hiện đại.

---

## 📖 Định nghĩa
> Git là một hệ thống quản lý phiên bản phân tán mã nguồn mở, được Linus Torvalds tạo ra vào năm 2005 nhằm phục vụ quá trình phát triển nhân hệ điều hành Linux. Git được thiết kế với mục tiêu tối thượng là tốc độ xử lý vượt bậc, cấu trúc dữ liệu đơn giản nhưng toàn vẹn, khả năng xử lý các dự án có quy mô khổng lồ và hỗ trợ mạnh mẽ quy trình làm việc phi tuyến tính với hàng ngàn nhánh làm việc song song. Mọi dữ liệu trong Git đều được đảm bảo tính toàn vẹn bằng thuật toán băm mật mã học.

---

## 🤔 Tại sao cần?
Hơn 95% các kỹ sư phần mềm trên toàn cầu hiện nay sử dụng Git làm công cụ quản lý mã nguồn mặc định trong công việc hàng ngày. Nắm vững Git không chỉ là một kỹ năng phụ trợ mà là yêu cầu bắt buộc tối thiểu đối với bất kỳ ai theo đuổi sự nghiệp kỹ nghệ phần mềm. Thiếu kỹ năng Git, bạn sẽ không thể tham gia vào bất kỳ dự án thực tế nào tại doanh nghiệp, không thể đóng góp vào cộng đồng mã nguồn mở và gặp vô vàn rào cản khi ứng tuyển công việc.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy tưởng tượng Git giống như một cuốn hộ chiếu điện tử được tích hợp chip sinh trắc học bảo mật tối cao. Mỗi trang visa được đóng dấu thị thực trong cuốn hộ chiếu đó tương ứng với một mốc commit trong lịch sử. Dấu mộc không chỉ ghi ngày giờ và địa điểm mà còn được mã hóa bằng một chuỗi chữ số mật mã học duy nhất. Bất kỳ sự tẩy xóa hay thay đổi dù chỉ một nét mực nhỏ nhất trên trang giấy cũng sẽ lập tức làm sai lệch chữ ký số và bị hệ thống từ chối.

---

## 🖼 Sơ đồ
```text
Dòng thời gian Git (Directed Acyclic Graph):
Commit A (Hash: 4a2f8b)
    │
    ▼
Commit B (Hash: 9e1c3d) ──► Nhánh tính năng [feature]
    │
    ▼
Commit C (Hash: f7d02a) ──► Nhánh chính [main] (HEAD)
```

---

## 🌎 Ví dụ thực tế
Khi hàng chục ngàn kỹ sư phần mềm tại các tập đoàn công nghệ hàng đầu như Google, Microsoft, Meta hay các dự án mã nguồn mở như nhân Linux, thư viện React và Vue cùng làm việc trên hàng triệu dòng code mỗi ngày, Git chính là sợi dây liên kết bảo đảm rằng code của mọi người được tích hợp trơn tru, không xảy ra thất thoát và có thể kiểm toán minh bạch từng dòng thay đổi. Nhờ có kiến trúc phân tán phi tập trung, mỗi kỹ sư có thể tự do thử nghiệm các tính năng mới trên các nhánh riêng mà không sợ làm gián đoạn nhánh chính, sau đó dễ dàng gộp lại khi đã kiểm thử kỹ lưỡng.

---

## 💻 Command
```bash
git --help
git --version
```

---

## 🔍 Giải thích command
- `git --help`: Mở trang tra cứu hướng dẫn nhanh danh sách các lệnh Git phổ biến nhất cùng mô tả chức năng chi tiết cho từng nhóm tác vụ hàng ngày.
- `git --version`: In ra phiên bản hiện tại của phần mềm Git trên máy tính giúp xác định các tính năng mới đã được hỗ trợ hay chưa.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ Git chỉ dành cho lập trình viên kỳ cựu**:  Git là kỹ năng nền tảng cơ bản mà sinh viên CNTT cần học ngay từ năm nhất.
2. **Sử dụng Git mà không hiểu bản chất con trỏ**:  Cố gắng học vẹt các câu lệnh mà không hiểu đồ thị liên kết commit ngầm bên dưới.
3. **Gõ lệnh một cách mù quáng**:  Gõ các lệnh copy từ mạng mà không đọc kỹ hướng dẫn cảnh báo an toàn dữ liệu.

---

## 🧪 Lab
1. Mở terminal và gõ `git --help` để xem bảng tổng hợp các nhóm lệnh chính.
2. Tìm kiếm các nhóm lệnh: start a working area, work on the current change, examine the history.
3. Nhận biết giao diện trợ giúp chuyên nghiệp được tích hợp sẵn trong Git.

---

## 💡 Hint
> Gõ `git <command> --help` bất cứ khi nào bạn muốn xem cẩm nang hướng dẫn của một lệnh cụ thể.

---

## ✅ Validation
- Thực thi thành công lệnh trợ giúp và giải thích được triết lý thiết kế của Git.

---

## ❓ Quiz
Trả lời các câu hỏi sau để củng cố sự hiểu biết về bản chất phần mềm Git.

---

## 🔥 Challenge
Nêu 3 lý do vì sao Git lại chiếm lĩnh hoàn toàn thị phần của SVN trong vòng một thập kỷ qua.

---

## 📚 Tổng kết
- Git được Linus Torvalds sáng tạo năm 2005 để quản lý mã nguồn nhân Linux.
- Git chú trọng tối đa vào tốc độ, sự an toàn dữ liệu và mô hình phân nhánh linh hoạt.
- Hơn 95% ngành công nghiệp phần mềm toàn cầu hiện nay sử dụng Git làm tiêu chuẩn bắt buộc.
