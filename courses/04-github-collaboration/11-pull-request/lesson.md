# Khái niệm và quy trình tạo Pull Request (PR)

---

## 🎯 Mục tiêu
- Nắm vững khái niệm cốt lõi và vai trò trung tâm của Pull Request (PR) trong quy trình phát triển phần mềm hiện đại.
- Giải mã ý nghĩa tên gọi "Pull Request": lời đề nghị chính thức yêu cầu người quản trị kéo mã nguồn về gộp.
- Thực hiện thuần thục các bước thiết lập một Pull Request hoàn chỉnh trên giao diện GitHub.
- Viết mô tả PR (PR Description) mạch lạc, súc tích kết hợp danh sách kiểm tra (checklist) đạt chuẩn doanh nghiệp.

---

## 🧩 Từ khóa hôm nay

### pull request (PR) — đề xuất hợp nhất
- **Nói dễ hiểu:** Một bản đề xuất trang trọng trên GitHub yêu cầu đội ngũ dự án thẩm định và gộp code từ nhánh của bạn vào nhánh chính.
- **Ví dụ:** Bạn mở một PR đề nghị gộp nhánh `feat/cart-drawer` vào nhánh `main` sau khi đã hoàn thiện chức năng giỏ hàng.
- **Đừng nhầm:** PR không phải là lệnh của Git trong terminal; đây là tính năng cộng tác đặc trưng của nền tảng web như GitHub, GitLab.

### reviewers — người thẩm định mã nguồn
- **Nói dễ hiểu:** Những kỹ sư đồng nghiệp được chỉ định vào PR để trực tiếp đọc code, kiểm tra chất lượng và quyết định bấm duyệt.
- **Ví dụ:** Bạn gán thẻ Tech Lead và bạn cặp đôi (pair-programming) vào mục Reviewers để họ nhận thông báo vào đánh giá.
- **Đừng nhầm:** Reviewers không chỉ tìm lỗi mà còn đảm bảo mã nguồn tuân thủ đúng chuẩn kiến trúc và phong cách chung của tổ chức.

### base and compare branch — cặp nhánh đích và nhánh nguồn
- **Nói dễ hiểu:** Hai nhánh xác định hướng chảy của mã nguồn: `base` là nhánh đích nhận code, `compare` là nhánh tính năng của bạn.
- **Ví dụ:** Cấu hình `base: main` ◄── `compare: feat/login` biểu thị mã nguồn sẽ được chuyển từ feat/login vào main.
- **Đừng nhầm:** `base` không nhất thiết luôn là `main`; trong các dự án lớn, `base` có thể là nhánh `develop`, `staging` hoặc nhánh release.

---

## 📖 Định nghĩa
Pull Request (viết tắt là PR) là một cơ chế cộng tác trung tâm trên các nền tảng máy chủ như GitHub, cho phép lập trình viên thông báo và gửi lời đề nghị chính thức tới nhóm dự án nhằm xem xét, thảo luận và gộp các thay đổi từ nhánh tính năng (compare branch) vào nhánh đích chính thức (base branch).

---

## 🤔 Tại sao cần?
Nếu ai cũng tự do đẩy code thẳng vào nhánh chính `main`, dự án sẽ nhanh chóng rơi vào hỗn loạn và đổ vỡ vì mã nguồn chứa lỗi chưa được kiểm soát. Pull Request thiết lập một trạm kiểm soát chất lượng không thể thiếu: tạo không gian thảo luận trực quan, kích hoạt kiểm thử tự động CI và đảm bảo mọi dòng mã đều được đồng nghiệp thẩm định kỹ lưỡng trước khi đưa vào sản phẩm.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung bạn là kiến trúc sư nội thất được giao thiết kế phòng khách cho một ngôi nhà. Bạn không thể tự ý đập phá tường khi chưa có ai cho phép. Bạn vẽ bản vẽ 3D chi tiết, lập bảng dự toán chi phí rồi gửi tới gia chủ kèm lời nhắn lịch thiệp: "Tôi đã hoàn thành phương án thiết kế phòng khách, kính mời anh chị xem xét phê duyệt" (Pull Request).

---

## 🖼 Sơ đồ
```text
CHU TRÌNH VẬN HÀNH CỦA MỘT PULL REQUEST (PR):

[Tạo nhánh feature] ──► [Commit & Push] ──► [Mở Pull Request trên GitHub]
                                                    │
                                                    ▼
[Chấp thuận & Merge vào main] ◄── [Thảo luận & Code Review & Chạy CI]
```

---

## 🌎 Ví dụ thực tế
Sau khi hoàn thiện chức năng thanh toán qua ví điện tử trên nhánh `feat/momo-payment`, bạn đẩy nhánh lên GitHub và bấm nút mở PR. Bạn đặt tiêu đề chuẩn `feat: integrate MoMo payment gateway`, mô tả rõ các trường hợp kiểm thử, đính kèm video chạy thử và gắn thẻ Tech Lead vào mục Reviewers. Toàn đội nhận được thông báo để cùng vào đóng góp ý kiến.

---

## 💻 Command
```bash
git switch -c feat/my-feature
git push -u origin feat/my-feature
```

---

## 🔍 Giải thích command
- `git switch -c feat/my-feature`: Tạo và chuyển ngay sang một nhánh tính năng biệt lập trước khi viết dòng code đầu tiên.
- `git push -u origin feat/my-feature`: Xuất bản nhánh tính năng lên GitHub kèm thiết lập upstream để giao diện web hiển thị nút tạo PR.

---

## ⚠️ Sai lầm phổ biến
1. **Mở Pull Request trực tiếp từ nhánh `main` cá nhân**: Gây khó khăn khi muốn sửa nhiều tính năng song song; luôn phải tạo nhánh feature riêng.
2. **Mô tả PR sơ sài cẩu thả**: Chỉ ghi vài từ cụt lủn khiến người review mất thời gian mò mẫm không hiểu mục đích thay đổi.
3. **Mở một PR quá đồ sộ gom góp nhiều tính năng**: PR vượt quá 500 dòng code khiến đồng nghiệp ngán ngẩm, review hời hợt và dễ lọt lỗi nghiêm trọng.

---

## 🧪 Lab
1. Tạo một nhánh tính năng mới trên máy của bạn: `git switch -c feat-demo-pr`.
2. Tạo một commit sửa đổi tài liệu: `git commit --allow-empty -m "docs: add api contract"`.
3. Đẩy nhánh lên máy chủ GitHub: `git push -u origin feat-demo-pr`.
4. Mở trang dự án trên GitHub, nhấp vào nút "Compare & pull request", điền tiêu đề và kiểm tra kỹ hai nhánh base và compare.

---

## 💡 Hint
> Một PR chuyên nghiệp luôn gồm 3 yếu tố cốt lõi trong phần mô tả: 1. Vấn đề cần giải quyết là gì? (Why), 2. Giải pháp kỹ thuật đã chọn là gì? (What), 3. Cách thức kiểm thử như thế nào? (How to test kèm ảnh chụp hoặc video minh họa).

---

## ✅ Validation
- Hiểu rõ bản chất hướng đi của code giữa nhánh base và compare.
- Nắm vững các tiêu chuẩn viết một bản mô tả PR chuyên nghiệp đạt chuẩn doanh nghiệp.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để kiểm tra mức độ am hiểu của bạn về quy trình tạo và quản trị Pull Request trên GitHub.

---

## 🔥 Challenge
Tìm hiểu cách thiết lập tệp mẫu `.github/pull_request_template.md`. Tại sao tất cả các công ty công nghệ lớn đều bắt buộc áp dụng PR Template cho mọi dự án phát triển phần mềm?

---

## 📚 Tổng kết
- Pull Request là đề xuất chính thức để gộp mã nguồn từ nhánh tính năng vào nhánh đích.
- Tạo không gian minh bạch cho thảo luận, chạy kiểm thử tự động và rà soát lỗi.
- Đảm bảo chất lượng và độ an toàn tuyệt đối cho nhánh chính của sản phẩm.
