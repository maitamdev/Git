# So sánh GitHub Flow / Git Flow / Trunk-Based

---

## 🎯 Mục tiêu
- Lập bảng ma trận so sánh chi tiết ưu nhược điểm, độ phức tạp và trường hợp sử dụng của 3 mô hình workflow hàng đầu.
- Hiểu rõ sự đánh đổi (Trade-offs) giữa tính linh hoạt tốc độ cao và mức độ kiểm soát an toàn nghiêm ngặt.
- Phân tích được các tiêu chí cốt lõi để lựa chọn workflow phù hợp: loại sản phẩm, quy mô đội ngũ, chu kỳ phát hành, độ chín CI/CD.
- Tự tin tư vấn và thiết lập quy trình phân nhánh tối ưu cho một dự án thực tế.

---

## 🧩 Từ khóa hôm nay

### Workflow Trade-offs (Đánh đổi quy trình)
- **Nói dễ hiểu**: Việc cân nhắc giữa tốc độ phát hành nhanh chóng và mức độ an toàn kiểm soát chặt chẽ khi chọn quy trình.
- **Ví dụ**: Startup chọn GitHub Flow để release nhanh mỗi ngày, chấp nhận bớt các tầng kiểm duyệt trung gian như Git Flow.
- **Đừng nhầm**: Không có mô hình nào là hoàn hảo tuyệt đối cho mọi dự án; mô hình tốt nhất là mô hình giải quyết đúng nút thắt của nhóm.

### CI/CD Maturity (Độ chín của CI/CD)
- **Nói dễ hiểu**: Mức độ tự động hóa và độ tin cậy của hệ thống kiểm thử tự động, build và triển khai mã nguồn trong dự án.
- **Ví dụ**: Dự án có 1.000 test case tự động chạy dưới 5 phút đạt độ chín CI/CD cao, đủ điều kiện áp dụng Trunk-Based Development.
- **Đừng nhầm**: Nếu chưa có bài test tự động nào mà áp dụng Trunk-Based sẽ khiến nhánh chính liên tục bị hỏng.

### Release Cadence (Chu kỳ phát hành)
- **Nói dễ hiểu**: Nhịp độ và tần suất đưa phiên bản phần mềm mới đến tay người dùng (nhiều lần mỗi ngày, hàng tuần, hay định kỳ mỗi tháng).
- **Ví dụ**: Web app SaaS có chu kỳ phát hành liên tục theo ngày, trong khi app mobile thường phát hành theo kỳ sprint 2-4 tuần.
- **Đừng nhầm**: Chu kỳ phát hành do đặc thù phân phối sản phẩm quyết định, từ đó định hình chiến lược phân nhánh Git phù hợp.

---

## 📖 Định nghĩa
Lựa chọn chiến lược phân nhánh là bài toán cân nhắc sự đánh đổi (Trade-off): Git Flow ưu tiên kiểm soát an toàn cho các chu kỳ phát hành định kỳ; GitHub Flow ưu tiên tinh gọn cho ứng dụng web; còn Trunk-Based Development tối đa hóa tốc độ tích hợp cho đội ngũ có hạ tầng CI/CD tự động hóa cao.

---

## 💡 Tại sao cần
Áp dụng sai workflow gây lãng phí năng suất nghiêm trọng: ép startup 3 người dùng Git Flow cồng kềnh sẽ làm chậm tiến độ vì thủ tục rườm rà; ngược lại, ép phần mềm thiết bị y tế dùng Trunk-Based khi chưa có test tự động sẽ tiềm ẩn rủi ro lỗi nguy hiểm.

---

## 🧠 Mental Model
Hãy so sánh 3 mô hình với phương tiện giao thông. Git Flow như đoàn tàu hỏa chở hàng: chạy theo lịch trình cố định, nhiều toa kiểm định, cực kỳ an toàn nhưng khó đổi hướng. GitHub Flow như chiếc ô tô cá nhân: linh hoạt, gọn gàng, xuất phát bất cứ lúc nào. Còn Trunk-Based Development như xe đua F1: cực nhanh, đòi hỏi tay lái điêu luyện và đội kỹ thuật CI hỗ trợ tức thì.

---

## 📊 Sơ đồ minh họa
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

## 🏢 Ví dụ thực tế
Công ty công nghệ áp dụng đồng thời hai mô hình: ứng dụng mobile chịu kiểm duyệt khắt khe từ App Store dùng Git Flow để đóng băng phiên bản cho QA kiểm thử an ninh. Trong khi đó, dịch vụ backend microservices có hơn 1.000 test tự động áp dụng Trunk-Based để 50 kỹ sư deploy liên tục mỗi ngày.

---

## 💻 Command & Cú pháp
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
1. **Áp dụng máy móc**: Bắt startup nhỏ dùng Git Flow 5 nhánh cồng kềnh gây lãng phí thời gian và làm chậm tốc độ ra mắt sản phẩm.
2. **Áp dụng Trunk-Based khi thiếu CI**: Hợp nhất liên tục vào main khi chưa có hệ thống test tự động sẽ khiến nhánh chính thường xuyên bị gãy.
3. **Thay đổi quy trình liên tục**: Đổi workflow quá thường xuyên làm đảo lộn thói quen và gây bối rối cho toàn bộ kỹ sư trong nhóm.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.
1. Dùng lệnh `git log --oneline --graph --all` để khảo sát cây lịch sử phân nhánh của một dự án mã nguồn mở.
2. Phân tích dự án dựa trên 4 tiêu chí: loại sản phẩm, tốc độ release, độ chín của CI và quy mô nhóm.
3. Lựa chọn mô hình workflow tối ưu nhất và viết bản giải trình ngắn gọn lý do lựa chọn.

---

## 💡 Hint & mẹo
> Không có quy trình nào là hoàn hảo tuyệt đối; quy trình tốt nhất là quy trình giải quyết đúng nút thắt và phù hợp với năng lực hạ tầng của đội ngũ.

---

## ✅ Validation & Kết quả mong đợi
- Phân tích rạch ròi ưu nhược điểm của cả 3 mô hình Git Flow, GitHub Flow và Trunk-Based Development.
- Đưa ra quyết định lựa chọn workflow chính xác dựa trên các ràng buộc kỹ thuật thực tế.

---

## ❓ Quiz nhanh
Hãy làm bài trắc nghiệm dưới đây để đối chiếu và so sánh các mô hình workflow.

---

## 🚀 Thử thách nâng cao
Đề xuất phương án chuyển dịch từng bước từ mô hình Git Flow sang Trunk-Based Development cho một dự án đang phát triển.

---

## 📝 Tổng kết
- Git Flow phù hợp với các sản phẩm có lịch phát hành cố định và yêu cầu kiểm soát nhiều tầng.
- GitHub Flow tối ưu cho các sản phẩm web triển khai liên tục và quy mô nhóm vừa phải.
- Trunk-Based Development mang lại tốc độ cao nhất nhưng đòi hỏi hệ thống kiểm thử tự động cực kỳ hoàn hảo.
