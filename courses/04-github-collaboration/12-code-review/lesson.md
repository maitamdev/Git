# Văn hóa và kỹ năng Code Review trên GitHub

---

## 🎯 Mục tiêu
- Thấu hiểu mục đích tối thượng và giá trị vô giá của hoạt động Code Review đối với sự trưởng thành của đội ngũ.
- Sử dụng thành thạo các công cụ review trên GitHub: bình luận từng dòng (line comments), tạo đề xuất sửa mã (Suggested Changes) và gửi phản hồi.
- Xây dựng tư duy phản biện mang tính xây dựng, đồng cảm và tôn trọng (Empathy in Code Review).
- Nắm vững ý nghĩa và hoàn cảnh áp dụng chuẩn xác của 3 trạng thái phản hồi: Comment, Approve và Request Changes.

---

## 🧩 Từ khóa hôm nay

### code review — phản biện mã nguồn
- **Nói dễ hiểu:** Hoạt động đồng nghiệp đọc và kiểm tra chéo mã nguồn của nhau trước khi cho phép gộp vào nhánh chính của dự án.
- **Ví dụ:** Mở tab "Files changed" trên GitHub để rà soát logic tính tiền, kiểm tra lỗ hổng bảo mật và tính tối ưu thuật toán.
- **Đừng nhầm:** Đây tuyệt đối không phải công cụ để soi mói hay chỉ trích cá nhân; đây là diễn đàn học hỏi và cùng nâng cao chuẩn mực chung.

### suggested changes — gợi ý sửa đổi trực tiếp
- **Nói dễ hiểu:** Tính năng ưu việt cho phép người review viết sẵn đoạn code đề xuất ngay trong bình luận để tác giả bấm nút áp dụng tức thì.
- **Ví dụ:** Bạn chèn khối code gợi ý thay thế vòng lặp for thủ công bằng phương thức `.map()` ngắn gọn và an toàn hơn.
- **Đừng nhầm:** Đoạn gợi ý không tự động đè lên code của tác giả; chính tác giả PR mới là người bấm nút phê duyệt để tạo commit mới.

### request changes — yêu cầu chỉnh sửa
- **Nói dễ hiểu:** Trạng thái đánh giá chính thức thể hiện người review phát hiện lỗi nghiêm trọng và yêu cầu tác giả phải sửa trước khi gộp.
- **Ví dụ:** Bạn bấm "Request changes" khi phát hiện đoạn code có lỗ hổng SQL Injection hoặc làm lộ thông tin mật khẩu nhạy cảm.
- **Đừng nhầm:** Trạng thái này có thể trực tiếp khóa nút Merge nếu kho lưu trữ đã được cấu hình luật bảo vệ nhánh nghiêm ngặt.

---

## 📖 Định nghĩa
Code Review (phản biện mã nguồn) là quy trình kỹ thuật bắt buộc trong phát triển phần mềm chuyên nghiệp, nơi các thành viên trong đội ngũ trực tiếp đọc hiểu, kiểm tra chéo, phân tích rủi ro và đóng góp ý kiến cải tiến trên từng dòng mã nguồn của đồng nghiệp trước khi những thay đổi đó được chính thức phê duyệt và tích hợp vào nhánh chính.

---

## 🤔 Tại sao cần?
Không một lập trình viên nào dù tài năng đến đâu có thể viết mã hoàn hảo 100% mọi lúc. Hoạt động Code Review chuyển hóa trách nhiệm bảo đảm chất lượng từ gánh nặng đơn độc của một cá nhân thành sức mạnh trí tuệ của cả tập thể. Quan trọng hơn, đây là kênh đào tạo nội bộ hiệu quả nhất: kỹ sư ít kinh nghiệm học được tư duy thiết kế hệ thống từ đàn anh, còn kỹ sư kỳ cựu liên tục củng cố sự chuẩn mực.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung Code Review như quy trình biên tập viên kỳ cựu đọc duyệt bản thảo của nhà văn trước khi đưa vào nhà in xuất bản sách. Người biên tập không nhằm mục đích phán xét hay chỉ trích tác giả, mà cùng ngồi lại với tác giả để rà soát từng lỗi diễn đạt, chi tiết vô lý và gợi ý câu từ đắt giá hơn nhằm đem lại một tác phẩm hoàn hảo nhất tới tay độc giả.

---

## 🖼 Sơ đồ
```text
BA TRẠNG THÁI PHẢN HỒI KHI KẾT THÚC REVIEW TRÊN GITHUB:

┌────────────────────────────────────────────────────────┐
│  [Comment]         ──► Chỉ để lại thắc mắc hoặc góp ý  │
│  [Approve]         ──► Đồng thuận hoàn toàn, cho phép  │
│  [Request Changes] ──► Bắt buộc phải sửa mới được gộp  │
└────────────────────────────────────────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Khi xem xét PR của một đồng nghiệp mới, Tech Lead phát hiện một câu lệnh truy vấn cơ sở dữ liệu có nguy cơ gây lỗi N+1 làm tê liệt hệ thống khi lượng người dùng tăng cao. Thay vì bình luận chung chung, Tech Lead để lại bình luận chi tiết ngay tại dòng code đó, giải thích rõ nguyên nhân và dùng tính năng Suggested Changes để viết sẵn đoạn mã dùng eager loading. Lập trình viên chỉ cần bấm nút chấp thuận để áp dụng ngay.

---

## 💻 Command
```bash
gh pr checkout 42
git log -p -2
```

---

## 🔍 Giải thích command
- `gh pr checkout 42`: Lệnh của GitHub CLI giúp tự động kéo toàn bộ nhánh của PR số 42 về máy tính cá nhân để chạy thử nghiệm thực tế.
- `git log -p -2`: Soi chiếu chi tiết từng dòng thay đổi (diff) của 2 commit gần nhất ngay tại giao diện dòng lệnh.

---

## ⚠️ Sai lầm phổ biến
1. **Phán xét gay gắt về con người thay vì đoạn code**: Dùng ngôn từ tiêu cực làm tổn thương đồng nghiệp và phá vỡ tinh thần đoàn kết của nhóm.
2. **Bấm Approve hời hợt mà không thèm đọc code**: Dễ dãi ký duyệt khiến các lỗi bảo mật hoặc rò rỉ bộ nhớ nghiêm trọng lọt vào bản phát hành chính.
3. **Tranh cãi bất tận về phong cách định dạng cá nhân**: Tranh cãi dấu cách hay dấu phẩy thay vì để các công cụ tự động hóa như Linter hay Prettier giải quyết.

---

## 🧪 Lab
1. Mở một PR đang mở trên GitHub của nhóm bạn hoặc kho dự án mã nguồn mở.
2. Điều hướng sang tab "Files changed" để quan sát các vùng sai khác màu xanh và đỏ.
3. Nhấp vào một dòng code cụ thể, nhấp biểu tượng dấu cộng để mở khung bình luận.
4. Thử nghiệm tính năng "Add a suggestion" để tạo một khối mã thay thế mẫu.
5. Xem lại bảng tổng kết đánh giá "Review changes" với 3 lựa chọn Comment, Approve và Request changes.

---

## 💡 Hint
> Kim chỉ nam của người review xuất sắc: "Luôn giải thích lý do (Tại sao nên làm thế này?) kèm theo giải pháp cụ thể (Làm thế nào?), và không bao giờ quên khen ngợi những đoạn code xử lý thông minh của đồng nghiệp!"

---

## ✅ Validation
- Nhận thức thấu đáo tinh thần và văn hóa cốt lõi của hoạt động Code Review.
- Sử dụng thành thạo tính năng gợi ý mã nguồn Suggested Changes trên giao diện GitHub.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để củng cố nhận thức và kỹ năng thực hành văn hóa Code Review chuyên nghiệp.

---

## 🔥 Challenge
Tìm hiểu cách kết hợp cấu hình `CODEOWNERS` với Branch Protection Rules trên GitHub. Làm thế nào để GitHub tự động gắn thẻ trưởng nhóm kiến trúc vào mục Reviewers mỗi khi có ai đó sửa đổi các tệp nằm trong thư mục cốt lõi `/src/core/`?

---

## 📚 Tổng kết
- Code Review là tấm lá chắn bảo vệ chất lượng phần mềm và văn hóa chia sẻ tri thức.
- Tận dụng Suggested Changes để đưa ra đề xuất trực quan và tiết kiệm thời gian cho đồng đội.
- Luôn giữ thái độ khách quan, tôn trọng và tập trung vào lợi ích lâu dài của dự án.
