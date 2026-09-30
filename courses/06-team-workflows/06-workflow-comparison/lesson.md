# So sánh GitHub Flow / Git Flow / Trunk-Based

---

## 🎯 Mục tiêu
- Lập bảng ma trận so sánh chi tiết ưu nhược điểm, độ phức tạp và trường hợp sử dụng của 3 mô hình workflow hàng đầu.
- Hiểu rõ sự đánh đổi (Trade-offs) giữa tính linh hoạt tốc độ cao và mức độ kiểm soát an toàn nghiêm ngặt.
- Phân tích được các tiêu chí cốt lõi để lựa chọn workflow phù hợp: loại sản phẩm, quy mô đội ngũ, chu kỳ phát hành, độ chín CI/CD.
- Tự tin tư vấn và thiết lập quy trình phân nhánh tối ưu cho một dự án thực tế.

---

## 📖 Định nghĩa
> Việc lựa chọn chiến lược phân nhánh mã nguồn không có câu trả lời "đúng tuyệt đối cho mọi dự án", mà là một bài toán cân nhắc sự đánh đổi (Trade-off Analysis) kỹ lưỡng. Ba mô hình phổ biến nhất hiện nay đại diện cho ba triết lý khác nhau: **Git Flow** ưu tiên sự kiểm soát tối đa và an toàn tuyệt đối cho các chu kỳ phát hành dài hạn; **GitHub Flow** ưu tiên sự đơn giản và tinh gọn cho các ứng dụng web triển khai liên tục; và **Trunk-Based Development** tối ưu hóa tốc độ tích hợp cao nhất cho các tổ chức sở hữu hạ tầng CI/CD tự động hóa vượt trội.

---

## 🤔 Tại sao cần?
Áp dụng sai workflow là nguyên nhân hàng đầu gây lãng phí năng suất kỹ thuật: bắt một startup web 3 người dùng mô hình Git Flow cồng kềnh với 5 loại nhánh sẽ khiến tiến độ bị đình trệ vì thủ tục hành chính; ngược lại, ép một nhóm phát triển firmware thiết bị y tế dùng Trunk-Based khi chưa có kiểm thử tự động sẽ tiềm ẩn nguy cơ thảm họa an toàn nghiêm trọng. Hiểu sâu bản chất giúp bạn chọn đúng công cụ cho đúng bài toán.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy so sánh ba mô hình với các phương tiện giao thông. **Git Flow** giống như một đoàn tàu hỏa chở hàng siêu trường: chạy theo lịch trình biểu giờ cố định nghiêm ngặt, có nhiều toa kiểm soát an toàn, cực kỳ khó trật bánh nhưng không thể đổi hướng tức thì. **GitHub Flow** giống như một chiếc xe ô tô cá nhân: linh hoạt, gọn gàng, có thể xuất phát bất cứ lúc nào bạn muốn, chỉ cần tuân thủ làn đường chính. Còn **Trunk-Based Development** giống như một đoàn xe đua F1 tốc độ cao: cực nhanh, yêu cầu kỹ năng lái điêu luyện và đội ngũ kỹ thuật pit-stop (hệ thống CI) hỗ trợ tức thì từng giây.

---

## 🖼 Sơ đồ
```text
Bảng ma trận so sánh 3 mô hình Workflow hàng đầu:
┌─────────────────┬──────────────┬──────────────┬────────────────────────┐
│ Tiêu chí        │ Git Flow     │ GitHub Flow  │ Trunk-Based Dev        │
├─────────────────┼──────────────┼──────────────┼────────────────────────┤
│ Độ phức tạp     │ Cao (5 nhánh)│ Thấp (1 chính)│ Rất thấp (1 Trunk)     │
│ Chu kỳ Release  │ Tuần / Tháng │ Vài lần/ngày │ Liên tục từng giờ      │
│ Tuổi thọ nhánh  │ Dài hạn      │ Vài ngày     │ Rất ngắn (< 1-2 ngày)  │
│ Hạ tầng CI/CD   │ Cơ bản       │ Khá          │ Rất cao (Bắt buộc)     │
│ Dự án phù hợp   │ Mobile/Enter │ Web/SaaS     │ Microservices/BigTech  │
└─────────────────┴──────────────┴──────────────┴────────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Một công ty phần mềm đa quốc gia quản lý hai dòng sản phẩm khác nhau. Với sản phẩm ứng dụng ngân hàng di động trên iOS/Android chịu sự kiểm duyệt khắt khe của kho ứng dụng và quy định tài chính, công ty áp dụng mô hình **Git Flow** để có giai đoạn release freeze kiểm thử an ninh toàn diện. Trong khi đó, với dịch vụ backend microservices chạy trên nền tảng đám mây AWS với hơn 1.000 ca kiểm thử tự động, đội ngũ kỹ sư áp dụng triệt để **Trunk-Based Development**, cho phép 50 lập trình viên đẩy hàng chục bản cập nhật lên production mỗi ngày mà không gặp bất kỳ sự cố nào.

---

## 💻 Command
```bash
git log --oneline --graph --all
git branch --list
```

---

## 🔍 Giải thích command
- `git log --graph --all`: Trực quan hóa toàn bộ biểu đồ lịch sử các nhánh để xác định chính xác nhóm bạn đang vận hành theo mô hình phân nhánh nào.
- `git branch --list`: Liệt kê toàn bộ các nhánh đang tồn tại trong dự án để đánh giá độ phức tạp, số lượng và tuổi thọ thực tế của các nhánh.

---

## ⚠️ Sai lầm phổ biến
1. **Áp dụng Git Flow máy móc cho các dự án web quy mô nhỏ cần phát triển nhanh chóng.**: Áp dụng Git Flow máy móc cho các dự án web quy mô nhỏ cần phát triển nhanh chóng.
2. **Áp dụng Trunk-Based Development khi nhóm chưa hề có hạ tầng kiểm thử tự động (Unit Test / CI).**: Áp dụng Trunk-Based Development khi nhóm chưa hề có hạ tầng kiểm thử tự động (Unit Test / CI).
3. **Thay đổi workflow liên tục khiến các thành viên trong nhóm bị hoang mang và mất phương hướng.**: Thay đổi workflow liên tục khiến các thành viên trong nhóm bị hoang mang và mất phương hướng.

---

## 🧪 Lab
1. Phân tích dự án hiện tại của bạn dựa trên 4 tiêu chí: loại sản phẩm, tốc độ release, độ chín của CI và quy mô nhóm.
2. Lựa chọn mô hình workflow tối ưu nhất và viết bản giải trình ngắn gọn lý do lựa chọn.

---

## 💡 Hint
> Không có quy trình nào là hoàn hảo tuyệt đối; quy trình tốt nhất là quy trình giải quyết đúng nút thắt của đội ngũ.

---

## ✅ Validation
- Giải thích được các rủi ro cụ thể nếu chọn sai workflow cho một kịch bản dự án phần mềm.

---

## ❓ Quiz
Hãy làm bài trắc nghiệm dưới đây để đối chiếu và so sánh các mô hình workflow.

---

## 🔥 Challenge
Đề xuất phương án chuyển dịch từng bước từ mô hình Git Flow sang Trunk-Based Development cho một dự án đang phát triển.

---

## 📚 Tổng kết
- Git Flow phù hợp với các sản phẩm có lịch phát hành cố định và yêu cầu kiểm soát nhiều tầng.
- GitHub Flow tối ưu cho các sản phẩm web triển khai liên tục và quy mô nhóm vừa phải.
- Trunk-Based Development mang lại tốc độ cao nhất nhưng đòi hỏi hệ thống kiểm thử tự động cực kỳ hoàn hảo.
