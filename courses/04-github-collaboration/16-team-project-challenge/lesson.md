# Thử thách dự án nhóm Team Project Challenge

---

## 🎯 Mục tiêu
- Áp dụng tổng hợp toàn bộ kỹ năng Level 4 vào một kịch bản dự án cộng tác nhóm hoàn chỉnh.
- Đóng vai trò một kỹ sư thực chiến giải quyết Issue, phát triển nhánh tính năng, push và mở PR.
- Tham gia đóng vai trò Reviewer để đánh giá mã nguồn, đưa ra phản biện và phê duyệt PR của đồng nghiệp.
- Xử lý tình huống xung đột khi merge PR và hoàn tất quy trình phát hành tính năng lên sản phẩm.

---

## 🧩 Từ khóa hôm nay

### team simulation
- **Nói dễ hiểu**: Kịch bản mô phỏng toàn diện môi trường làm việc nhóm thực tế với đầy đủ các vai trò kỹ sư và reviewer.
- **Ví dụ**: Nhận Issue được giao, tách nhánh tính năng, đẩy code và mở PR chờ đồng nghiệp duyệt.
- **Đừng nhầm**: Không chỉ là gõ lệnh một mình; đây là bài tập rèn luyện kỹ năng phối hợp và tuân thủ quy trình nhóm.

### reviewer checklist
- **Nói dễ hiểu**: Danh sách các tiêu chí kiểm tra mà người đánh giá dùng để soi xét chất lượng PR trước khi duyệt.
- **Ví dụ**: Kiểm tra xem code có chạy qua bài test không, có bị lộ mật khẩu không và có viết tài liệu đầy đủ không.
- **Đừng nhầm**: Không nhằm mục đích gây khó dễ; checklist bảo vệ cả nhóm khỏi các lỗi nghiêm trọng lọt vào production.

### release integration
- **Nói dễ hiểu**: Thao tác hòa nhập tính năng đã được kiểm duyệt và gộp vào nhánh chính để sẵn sàng phát hành.
- **Ví dụ**: Squash-merge nhánh `feat/coupon` vào nhánh `main` và kích hoạt luồng đóng gói phiên bản mới.
- **Đừng nhầm**: Không dừng lại ở việc gộp code; bạn còn cần xóa nhánh cũ và kéo cập nhật mới về máy cá nhân.

---

## 📖 Định nghĩa
Thử thách dự án nhóm Team Project Challenge là bài sát hạch toàn diện của Level 4: GitHub Collaboration, đặt bạn vào môi trường mô phỏng dự án nhóm thực tế với đầy đủ các vai trò: Quản trị viên, Lập trình viên và Người đánh giá để giải quyết một bài toán nghiệp vụ trọn vẹn từ khâu nhận việc đến xuất bản.

---

## 💡 Tại sao cần
Lập trình trong môi trường hiện đại là môn thể thao đồng đội. Dù bạn có kỹ năng viết code tốt nhưng nếu thiếu khả năng phối hợp trên GitHub, bạn không thể làm việc trong các công ty chuyên nghiệp. Hoàn thành thử thách này khẳng định bạn đã sẵn sàng tham gia vào các đội ngũ kỹ thuật thực tế.

---

## 🧠 Mental Model
Hãy hình dung thử thách này như một trận thi đấu bóng đá nội bộ trước thềm giải vô địch. Bạn không còn tập sút một mình vào lưới trống. Bạn phải phối hợp chuyền bóng ăn ý với đồng đội (pull code), nhận bóng thuận lợi (tách nhánh), vượt qua hậu vệ (giải quyết xung đột) và ghi bàn thắng quyết định (Merge PR).

---

## 📊 Sơ đồ minh họa
```text
Kịch bản mô phỏng thử thách Team Project:
[Issue: Thêm tính năng Coupon giảm giá]
                  │
                  ▼
[Kỹ sư tạo nhánh feat/coupon ──► Push ──► Tạo PR]
                  │
                  ▼
[Reviewer đánh giá: Yêu cầu sửa lỗi tính tiền]
                  │
                  ▼
[Kỹ sư cập nhật commit mới ──► Reviewer Approve ──► Squash & Merge!]
```

---

## 🏢 Ví dụ thực tế
Học viên tiếp nhận Issue #201 yêu cầu xây dựng tính năng mã giảm giá cho ứng dụng mua sắm. Học viên kéo code mới nhất từ main, tạo nhánh `feat/coupon-system`, hoàn thành tính năng và commit theo chuẩn. Khi mở PR, bạn nhận góp ý từ Reviewer yêu cầu xử lý trường hợp mã hết hạn. Học viên bổ sung commit, vượt qua kiểm thử tự động, được Approve và merge thành công vào main.

---

## 💻 Command & Cú pháp
```bash
git switch main
git pull origin main
git switch -c feat/coupon-system
git push -u origin feat/coupon-system
git branch -d feat/coupon-system
```

---

## 🔍 Giải thích command
- `git switch main && git pull origin main`: Khởi đầu từ nền tảng code mới nhất của dự án nhóm.
- `git switch -c <nhánh>`: Tách nhánh cô lập phát triển tính năng thử thách.
- `git push -u origin <nhánh>`: Đẩy nhánh lên máy chủ GitHub mô phỏng.
- `git branch -d <nhánh>`: Dọn dẹp vệ sinh kho chứa sau khi kết thúc thử thách xuất sắc.

---

## ⚠️ Sai lầm phổ biến
1. **Tự ý merge PR khi chưa được phê duyệt**: Bỏ qua quy trình kiểm soát chất lượng và làm tăng nguy cơ lỗi cho toàn đội.
2. **Không đọc kỹ yêu cầu trong Issue**: Dẫn đến việc lập trình sai nghiệp vụ và phải viết lại tính năng từ đầu.
3. **Quên kéo cập nhật main về máy sau khi merge**: Khiến các nhánh tính năng tiếp theo bị xuất phát từ mốc lịch sử cũ lỗi thời.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn vận hành chu trình phối hợp nhóm hoàn chỉnh từ tiếp nhận Issue đến đóng PR.
1. Khởi động kịch bản mô phỏng dự án nhóm trong môi trường làm việc.
2. Đọc kỹ yêu cầu trong Issue được giao và tạo nhánh tính năng tương ứng.
3. Viết code giải quyết bài toán và tạo commit chuẩn quy ước Conventional Commits.
4. Mở Pull Request, đọc nhận xét của Reviewer và thực hiện chỉnh sửa bổ sung.
5. Hoàn tất merge PR và xác nhận Issue được đóng tự động.

---

## 💡 Hint & mẹo
> Luôn giữ thái độ cầu thị, đọc kỹ phản hồi của Reviewer để hoàn thiện mã nguồn theo đúng tiêu chuẩn dự án.

---

## ✅ Validation & Kết quả mong đợi
- Toàn bộ chu trình từ Issue đến PR Merged được hoàn thành trơn tru.
- Nhánh tính năng được dọn dẹp sạch sẽ và nhánh main cục bộ đồng bộ hoàn toàn với remote.

---

## ❓ Quiz nhanh
Làm bài trắc nghiệm tổng kết để hoàn tất toàn bộ Level 4: GitHub Collaboration.

---

## 🚀 Thử thách nâng cao
Mô phỏng lại toàn bộ quy trình này với một người bạn học cùng bằng cách tạo repository thật trên GitHub và phân vai review chéo cho nhau.

---

## 📝 Tổng kết
- Làm chủ toàn diện kỹ năng cộng tác: Clone, Fetch, Pull, Push, Fork, PR và Code Review.
- Feature Branch Workflow là kim chỉ nam cho mọi hoạt động phát triển phần mềm nhóm.
- Giao tiếp văn minh, viết mô tả rõ ràng và tôn trọng quy trình là chìa khóa của sự thành công.
