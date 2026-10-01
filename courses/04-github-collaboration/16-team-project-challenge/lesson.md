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
- **Nói dễ hiểu**: Bài tập nhập vai để tự làm các bước của người viết và tự kiểm tra như reviewer.
- **Ví dụ**: Đọc yêu cầu, tạo nhánh, sửa file, commit và dùng checklist xem lại diff.
- **Đừng nhầm**: Một mình không thể thực sự nhận review/approval từ người khác; có thể mời bạn học làm reviewer ở phần mở rộng.

### acceptance criteria — tiêu chí hoàn thành
- **Nói dễ hiểu**: Danh sách kết quả cụ thể dùng để quyết định nhiệm vụ đã làm xong chưa.
- **Ví dụ**: README có hướng dẫn, thay đổi được commit, diff không chứa thông tin bí mật.
- **Đừng nhầm**: “Đã push” không tự chứng minh tính năng đúng; cần đối chiếu yêu cầu và kiểm tra thay đổi.

### self-review — tự rà thay đổi
- **Nói dễ hiểu**: Tự đọc diff trước khi chia sẻ để phát hiện lỗi hoặc thay đổi ngoài ý muốn.
- **Ví dụ**: Kiểm tra README đã có ví dụ và không chứa token/mật khẩu.
- **Đừng nhầm**: Tự review không thay thế review độc lập nếu dự án yêu cầu người khác duyệt.

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
**Nhiệm vụ:** cập nhật README cho tính năng mã giảm giá trong kho thử nghiệm. Làm trong Git Academy simulator hoặc bản sao local riêng; không push lên dự án thật nếu chưa được phép.
1. Viết ba tiêu chí hoàn thành: README có mục “Mã giảm giá”, có một ví dụ sử dụng, và không chứa thông tin bí mật.
2. Tạo nhánh `feat/coupon-readme` bằng `git switch -c feat/coupon-readme`.
3. Sửa README bằng editor, thêm mục và ví dụ; lưu file.
4. Chạy `git status` và `git diff` để xem đúng nội dung vừa sửa.
5. Chạy `git add README.md`, rồi `git commit -m "docs: explain coupon feature"`.
6. Tự review bằng checklist: đủ ba tiêu chí chưa, diff có thay đổi ngoài ý muốn hoặc secret không? Nếu cần, sửa và tạo commit bổ sung.
7. Trong simulator, push chỉ cập nhật remote giả lập. Với GitHub thật, push lên kho thử nghiệm bạn có quyền, tạo PR và mời bạn học review; chỉ merge khi có quyền.

---

## 💡 Hint & mẹo
> Luôn giữ thái độ cầu thị, đọc kỹ phản hồi của Reviewer để hoàn thiện mã nguồn theo đúng tiêu chuẩn dự án.

---

## ✅ Validation & Kết quả mong đợi
- Có nhánh riêng, thay đổi README, diff đã kiểm tra và commit rõ nội dung.
- Nếu mở PR thử nghiệm, mô tả nêu mục tiêu và cách kiểm tra; review/merge chỉ thực hiện nếu có quyền.

---

## ❓ Quiz nhanh
Làm bài trắc nghiệm tổng kết để hoàn tất toàn bộ Level 4: GitHub Collaboration.

---

## 🚀 Thử thách nâng cao
Làm theo cặp trên một repository thử nghiệm: một người tạo PR, người kia kiểm tra diff bằng checklist và để lại một góp ý cụ thể; tác giả cập nhật commit rồi cả hai xác nhận tiêu chí đã đạt. Cần tài khoản GitHub và quyền truy cập vào repository.

---

## 📝 Tổng kết
- Có thể đọc một nhiệm vụ, làm thay đổi trên nhánh riêng, kiểm tra diff và tạo commit.
- PR, fork, review và merge diễn ra trên nền tảng cộng tác; quyền và cách làm tùy dự án.
- Giao tiếp rõ ràng và làm theo quy trình của nhóm giúp người khác kiểm tra thay đổi.
