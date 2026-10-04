# Thử thách dự án nhóm Team Project Challenge

---

## 🎯 Mục tiêu
- Vận dụng tổng hợp toàn bộ tri thức của Level 4 vào một kịch bản dự án cộng tác nhóm hoàn chỉnh chuẩn thực tế.
- Hóa thân thành kỹ sư phần mềm thực chiến: nhận việc từ Issue, phát triển nhánh tính năng, push và mở Pull Request.
- Đảm nhận vai trò Reviewer: soi chiếu từng dòng mã nguồn, đưa ra phản biện mang tính xây dựng và phê duyệt PR.
- Làm chủ kỹ năng tự rà soát (Self-review) và nghiệm thu tính năng dựa trên bộ tiêu chí chuẩn xác.

---

## 🧩 Từ khóa hôm nay

### team simulation — mô phỏng nhóm thực chiến
- **Nói dễ hiểu:** Kịch bản mô phỏng môi trường làm việc nhóm thực tế, nơi bạn đóng vai cả người lập trình lẫn người phản biện mã nguồn.
- **Ví dụ:** Bạn tiếp nhận yêu cầu từ một Issue, phân tích nghiệp vụ, lập trình trên nhánh riêng rồi mở PR mời đồng đội thẩm định.
- **Đừng nhầm:** Dù là môi trường thực hành, mọi quy chuẩn về thông điệp commit, tiêu chuẩn code và văn hóa PR đều phải nghiêm ngặt như dự án thật.

### acceptance criteria — tiêu chí nghiệm thu
- **Nói dễ hiểu:** Danh sách các yêu cầu cụ thể và có thể đo lường được dùng để kết luận một tính năng đã hoàn thành đạt chuẩn hay chưa.
- **Ví dụ:** "Hệ thống phải tự động từ chối mã giảm giá đã hết hạn và thông báo lỗi rõ ràng bằng tiếng Việt cho người dùng".
- **Đừng nhầm:** Việc "đã gõ xong code và push" chưa chứng minh tính năng hoàn tất; tính năng chỉ xong khi thỏa mãn 100% tiêu chí nghiệm thu.

### self-review — tự rà soát mã nguồn
- **Nói dễ hiểu:** Thói quen tự đọc lại từng dòng thay đổi trên giao diện diff trước khi gửi lời mời đồng nghiệp vào review.
- **Ví dụ:** Mở tab Files changed trên PR của chính mình để kiểm tra xem có vô tình để quên mã khóa bí mật (API key) hay tệp rác không.
- **Đừng nhầm:** Tự rà soát là bước sàng lọc sơ bộ của tác giả; nó không thể thay thế cho vòng kiểm duyệt độc lập từ đồng nghiệp khác.

---

## 📖 Định nghĩa
Thử thách dự án nhóm Team Project Challenge là bài sát hạch thực chiến toàn diện khép lại Level 4: GitHub Collaboration, đặt bạn vào vai trò một kỹ sư phần mềm thực thụ trong môi trường doanh nghiệp để hoàn thành trọn vẹn chu trình cộng tác: từ tiếp nhận Issue, phát triển nhánh tính năng, tự phản biện mã nguồn đến mở PR và giải quyết xung đột hợp nhất.

---

## 🤔 Tại sao cần?
Lập trình phần mềm hiện đại là một bộ môn thể thao đồng đội đỉnh cao. Dù bạn có thể gõ ra những thuật toán xuất sắc trên máy tính cá nhân, bạn vẫn không thể làm việc tại các tập đoàn công nghệ nếu thiếu kỹ năng phối hợp mượt mà trên GitHub. Bài thử thách này biến toàn bộ lý thuyết thành phản xạ nghề nghiệp tự nhiên, chuẩn bị hành trang vững chắc cho bạn bước vào các dự án thực tế.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung thử thách này như một trận thi đấu bóng đá tập dượt nội bộ trước thềm giải vô địch. Bạn không còn tập sút bóng một mình vào khung thành trống. Bạn phải phối hợp chuyền bóng ăn ý với đồng đội (pull code), nhận bóng ở tư thế thuận lợi (tách nhánh riêng), lừa bóng qua hậu vệ (xử lý xung đột) và tung cú sút quyết định ghi bàn ấn định thắng lợi (Merge PR).

---

## 🖼 Sơ đồ
```text
CHU TRÌNH THỰC CHIẾN THỬ THÁCH TEAM PROJECT:

[Issue: Tính năng giảm giá coupon] ──► [Kéo code main mới nhất]
                                               │
                                               ▼
[Tự rà soát diff & Mở PR] ◄── [Commit tính năng] ◄── [Tách nhánh feat/coupon]
          │
          ▼
[Vòng phản biện Code Review] ──► [Bổ sung bản vá] ──► [Squash & Merge vào main]
```

---

## 🌎 Ví dụ thực tế
Kỹ sư nhận Issue `#201: Thêm tính năng áp dụng mã giảm giá cho giỏ hàng`. Kỹ sư kéo mã mới nhất từ `main`, tạo nhánh `feat/coupon-system`, lập trình các hàm tính chiết khấu và tự rà soát diff. Khi mở PR, đồng nghiệp review phát hiện thiếu trường hợp xử lý mã giảm giá hết hạn. Kỹ sư tiếp thu, bổ sung commit sửa lỗi, nhận được Approve và tiến hành squash-merge vào nhánh chính an toàn.

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
- `git switch main && git pull origin main`: Bắt đầu từ nền tảng mã nguồn mới nhất và ổn định nhất của dự án chung.
- `git switch -c feat/coupon-system`: Tách nhánh biệt lập phát triển trọn vẹn nghiệp vụ mã giảm giá của bài thử thách.
- `git push -u origin feat/coupon-system`: Xuất bản nhánh lên GitHub và thiết lập tracking để chuẩn bị khởi tạo PR.
- `git branch -d feat/coupon-system`: Xóa nhánh tính năng sau khi đã hoàn tất tích hợp thành công vào nhánh chính.

---

## ⚠️ Sai lầm phổ biến
1. **Tự ý bấm merge PR khi chưa có bất kỳ lượt Approve nào**: Vi phạm nghiêm trọng kỷ luật làm việc nhóm và văn hóa kỹ thuật.
2. **Không đọc kỹ bộ tiêu chí nghiệm thu (Acceptance Criteria)**: Dẫn đến việc viết tính năng sai lệch nghiệp vụ và phải đập đi xây lại.
3. **Quên kéo cập nhật `main` về máy sau khi kết thúc PR**: Khiến các nhánh tính năng tiếp theo bị xuất phát từ mốc lịch sử cũ đã lạc hậu.

---

## 🧪 Lab
1. Mở một Issue mô phỏng với yêu cầu: "Cập nhật tài liệu hướng dẫn áp dụng mã giảm giá vào tệp README.md".
2. Tách nhánh mới từ main: `git switch -c feat/coupon-docs`.
3. Mở tệp `README.md`, bổ sung mục "Hướng dẫn sử dụng mã giảm giá" kèm ví dụ cụ thể.
4. Chạy `git diff` để tự rà soát (self-review) kiểm tra từng dòng thay đổi.
5. Commit với thông điệp chuẩn: `git commit -am "docs: add coupon usage guide (#201)"`.
6. Mở PR trên GitHub với từ khóa `Closes #201`, đóng vai Reviewer để kiểm tra và tiến hành merge.

---

## 💡 Hint
> Bí quyết vàng để trở thành một kỹ sư được mọi đồng nghiệp yêu mến: Hãy luôn tự review kỹ lưỡng mã nguồn của mình trước khi gửi đi. Loại bỏ hết các dòng trống thừa, tệp rác và mã thử nghiệm trước khi mở PR sẽ giúp đồng nghiệp tiết kiệm rất nhiều công sức!

---

## ✅ Validation
- Hoàn thành trọn vẹn chu trình Feature Branch Workflow từ khâu tiếp nhận Issue đến khâu hợp nhất mã nguồn.
- Thể hiện sự tự tin và phản xạ nghề nghiệp xuất sắc khi thao tác trên môi trường GitHub.

---

## ❓ Quiz
Làm bài trắc nghiệm tổng kết toàn diện để chính thức tốt nghiệp Level 4: GitHub Collaboration!

---

## 🔥 Challenge
Hãy thử rủ một người bạn học cùng tạo một kho lưu trữ chung trên GitHub, cấu hình Branch Protection Rule yêu cầu tối thiểu 1 Reviewer Approve và cùng thực hiện quy trình mở PR, review chéo cho nhau để trải nghiệm cảm giác làm việc thực thụ tại các công ty công nghệ lớn!

---

## 📚 Tổng kết
- Bạn đã làm chủ toàn bộ các công cụ cộng tác nhóm hiện đại: Remote, Clone, Fetch, Pull, Push, Tracking.
- Bạn thấu hiểu bản chất cơ chế Fork, mô hình Upstream và quy trình Pull Request.
- Bạn đã sẵn sàng tự tin hòa nhập vào bất kỳ đội ngũ kỹ thuật phần mềm chuyên nghiệp nào!
