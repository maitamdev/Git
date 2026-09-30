# Thử thách dự án nhóm Team Project Challenge

---

## 🎯 Mục tiêu
- Áp dụng tổng hợp toàn bộ kỹ năng Level 4 vào một kịch bản dự án cộng tác nhóm hoàn chỉnh.
- Đóng vai trò một kỹ sư thực chiến giải quyết Issue, phát triển nhánh tính năng, push và mở PR.
- Tham gia đóng vai trò Reviewer để đánh giá mã nguồn, đưa ra phản biện và phê duyệt PR của đồng nghiệp.
- Xử lý tình huống xung đột khi merge PR và hoàn tất quy trình phát hành tính năng lên sản phẩm.

---

## 📖 Định nghĩa
> Thử thách dự án nhóm Team Project Challenge là bài thi sát hạch toàn diện của Level 4: GitHub Collaboration. Bạn sẽ được hòa mình vào một môi trường mô phỏng dự án nhóm thực tế với đầy đủ các vai trò: Quản trị viên (Maintainer), Lập trình viên (Developer) và Người đánh giá (Reviewer). Bạn sẽ phải giải quyết một bài toán nghiệp vụ trọn vẹn từ khâu tiếp nhận Issue trên bảng điều khiển, thực thi chuỗi lệnh Git chuẩn mực và hoàn tất đóng gói sản phẩm.

---

## 🤔 Tại sao cần?
Lập trình trong thế giới hiện đại là môn thể thao đồng đội. Dù bạn có kỹ năng viết thuật toán siêu hạng nhưng nếu bạn không biết cách phối hợp nhịp nhàng trên GitHub, bạn sẽ không thể hòa nhập vào bất kỳ công ty công nghệ chuyên nghiệp nào. Vượt qua thử thách này là minh chứng đanh thép khẳng định bạn đã hoàn toàn sẵn sàng làm việc trong các đội ngũ kỹ thuật đẳng cấp quốc tế.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung thử thách này giống như một trận thi đấu bóng đá tập dượt nội bộ trước thềm giải vô địch quốc gia. Bạn không còn tập sút bóng một mình vào khung thành trống nữa. Bạn phải phối hợp chuyền bóng ăn ý với tiền vệ (pull code), nhận đường chuyền thuận lợi (nhánh tính năng), vượt qua hàng phòng ngự đối phương (giải quyết xung đột), phối hợp với thủ môn (code review) và sút tung lưới đối phương ghi bàn thắng quyết định (Merge PR).

---

## 🖼 Sơ đồ
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

## 🌎 Ví dụ thực tế
Trong kịch bản thử thách thực chiến, học viên tiếp nhận Issue #201 yêu cầu xây dựng tính năng mã giảm giá cho ứng dụng mua sắm trực tuyến. Học viên chủ động kéo mã nguồn mới nhất từ main, tạo nhánh làm việc độc lập mang tên `feat/coupon-system`, hoàn thành chức năng và tạo commit theo đúng quy ước Conventional Commits. Học viên mở PR, nhận được phản hồi yêu cầu kiểm tra trường hợp mã giảm giá hết hạn từ hệ thống giả lập Reviewer. Học viên khéo léo bổ sung commit xử lý ngoại lệ, vượt qua toàn bộ các bài kiểm tra tự động, được Approve và hòa nhập thành công vào nhánh main trong sự hoan nghênh của toàn đội.

---

## 💻 Command
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
1. **Tự ý merge PR khi chưa được Reviewer phê duyệt (bỏ qua quy trình kiểm duyệt chất lượng).**: Tự ý merge PR khi chưa được Reviewer phê duyệt (bỏ qua quy trình kiểm duyệt chất lượng).
2. **Không đọc kỹ các yêu cầu nghiệp vụ trong Issue dẫn đến việc viết sai tính năng cần giao nộp.**: Không đọc kỹ các yêu cầu nghiệp vụ trong Issue dẫn đến việc viết sai tính năng cần giao nộp.
3. **Quên cập nhật lại nhánh main cục bộ sau khi PR đã merge thành công trên hệ thống.**: Quên cập nhật lại nhánh main cục bộ sau khi PR đã merge thành công trên hệ thống.

---

## 🧪 Lab
1. Khởi động kịch bản mô phỏng `team-project-simulation` trong giao diện bài tập.
2. Xem xét yêu cầu trong Issue được giao và tạo nhánh tính năng tương ứng.
3. Viết code giải quyết bài toán và tạo commit chuẩn quy ước.
4. Mở Pull Request, đọc nhận xét của Reviewer và thực hiện chỉnh sửa bổ sung.
5. Hoàn tất merge PR và xác nhận Issue được đóng tự động.

---

## 💡 Hint
> Bình tĩnh đọc kỹ phản hồi của Reviewer để hoàn thiện mã nguồn theo đúng tiêu chuẩn dự án.

---

## ✅ Validation
- Hoàn thành 100% các tiêu chí kiểm thử của kịch bản mô phỏng dự án nhóm.

---

## ❓ Quiz
Làm bài trắc nghiệm tổng kết để hoàn tất toàn bộ Level 4: GitHub Collaboration.

---

## 🔥 Challenge
Mô phỏng lại toàn bộ quy trình này với một người bạn học cùng bằng cách tạo repository thật trên GitHub.

---

## 📚 Tổng kết
- Làm chủ toàn diện kỹ năng cộng tác: Clone, Fetch, Pull, Push, Fork, PR và Code Review.
- Feature Branch Workflow là kim chỉ nam cho mọi hoạt động phát triển phần mềm nhóm.
- Giao tiếp văn minh, viết mô tả rõ ràng và tôn trọng quy trình là chìa khóa của sự thành công.
