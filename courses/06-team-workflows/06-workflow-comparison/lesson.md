# So sánh GitHub Flow / Git Flow / Trunk-Based

---

## 🎯 Mục tiêu
- Lập bảng ma trận so sánh chi tiết ưu nhược điểm, độ phức tạp và trường hợp sử dụng của 3 mô hình workflow hàng đầu.
- Hiểu rõ sự đánh đổi (Trade-offs) giữa tính linh hoạt tốc độ cao và mức độ kiểm soát an toàn nghiêm ngặt.
- Phân tích các tiêu chí lựa chọn workflow: rủi ro, nhịp phát hành, CI/CD và công sức phối hợp; không chọn chỉ dựa vào loại sản phẩm.
- Tự tin tư vấn và thiết lập quy trình phân nhánh tối ưu cho một dự án thực tế.

---

## 🧩 Từ khóa hôm nay

### Workflow Trade-offs (Đánh đổi quy trình)
- **Nói dễ hiểu**: Việc cân nhắc giữa tốc độ phát hành nhanh chóng và mức độ an toàn kiểm soát chặt chẽ khi chọn quy trình.
- **Ví dụ**: Một nhóm có thể chọn GitHub Flow để dùng PR ngắn; họ vẫn có thể bật cùng mức review và CI mà dùng với mô hình khác.
- **Đừng nhầm**: Không có mô hình nào là hoàn hảo tuyệt đối cho mọi dự án; mô hình tốt nhất là mô hình giải quyết đúng nút thắt của nhóm.

### CI/CD Maturity (Độ chín của CI/CD)
- **Nói dễ hiểu**: Mức độ tự động hóa và độ tin cậy của hệ thống kiểm thử tự động, build và triển khai mã nguồn trong dự án.
- **Ví dụ**: CI chạy kiểm thử quan trọng nhanh và báo kết quả rõ giúp nhóm phát hiện vấn đề sớm khi tích hợp thường xuyên.
- **Đừng nhầm**: Không có một số lượng test hay thời gian chạy cụ thể chứng minh dự án đã sẵn sàng; độ tin cậy và cách xử lý lỗi cũng quan trọng.

### Release Cadence (Chu kỳ phát hành)
- **Nói dễ hiểu**: Nhịp độ và tần suất đưa phiên bản phần mềm mới đến tay người dùng (nhiều lần mỗi ngày, hàng tuần, hay định kỳ mỗi tháng).
- **Ví dụ**: Một app mobile có thể phát hành theo lịch cửa hàng ứng dụng, còn backend có thể triển khai thường xuyên hơn; nhóm vẫn chọn cách phân nhánh theo nhu cầu của mình.
- **Đừng nhầm**: Loại sản phẩm không tự quyết định workflow. Hãy xét cách kiểm thử, phê duyệt, triển khai và khả năng rollback.

---

## 📖 Định nghĩa
Ba workflow khác nhau chủ yếu ở cách tổ chức nhánh và nhịp tích hợp. Git Flow có nhánh dài hạn `develop` cùng nhánh release/hotfix; GitHub Flow thường dùng nhánh ngắn hạn và PR; Trunk-Based Development tích hợp thay đổi nhỏ thường xuyên vào nhánh chính. Không workflow nào tự quyết định mức an toàn, tốc độ release hay loại sản phẩm.

---

## 💡 Tại sao cần
Chọn workflow quá nặng có thể thêm bước nhóm không cần; chọn workflow nhẹ nhưng thiếu review, kiểm thử hoặc kế hoạch phục hồi có thể bỏ sót rủi ro. So sánh chi phí thực tế thay vì gán một mô hình cho một loại công ty.

---

## 🧠 Mental Model
Hãy hình dung ba cách tổ chức lịch làm việc: Git Flow tách giai đoạn phát triển và ổn định phiên bản; GitHub Flow đưa thay đổi qua PR; Trunk-Based Development ghép thay đổi nhỏ thường xuyên. Review, CI và release controls có thể được thêm vào từng mô hình.

---

## 📊 Sơ đồ minh họa
```text
Bảng ma trận so sánh 3 mô hình Workflow hàng đầu:
┌─────────────────┬──────────────────────┬──────────────────────┬──────────────────────┐
│ Tiêu chí        │ Git Flow             │ GitHub Flow          │ Trunk-Based Dev      │
├─────────────────┼──────────────────────┼──────────────────────┼──────────────────────┤
│ Nhánh dài hạn   │ main + develop       │ thường là main       │ thường là main/trunk │
│ Nhánh tạm       │ feature/release/hotfix│ feature ngắn hạn    │ trực tiếp hoặc ngắn  │
│ Tích hợp        │ theo giai đoạn       │ qua PR                │ thường xuyên         │
│ Release         │ nhóm lên lịch riêng  │ nhóm lên lịch riêng  │ nhóm lên lịch riêng  │
│ CI / review     │ cấu hình theo nhóm   │ cấu hình theo nhóm   │ nhanh là hữu ích     │
│ Phù hợp khi     │ cần nhánh release    │ cần PR làm trung tâm │ cần tích hợp nhỏ     │
└─────────────────┴──────────────────────┴──────────────────────┴──────────────────────┘

Đây là xu hướng phổ biến, không phải yêu cầu bắt buộc; một dự án có thể kết hợp hoặc điều chỉnh các ý tưởng.
```

---

## 🏢 Ví dụ thực tế
Ví dụ: cùng một công ty có thể giữ nhánh release cho app cần kiểm tra trước lịch phát hành và dùng PR nhỏ, tích hợp thường xuyên cho một dịch vụ backend. Đây là quyết định theo nhu cầu vận hành, không do loại sản phẩm bắt buộc.

---

## 💻 Command & Cú pháp
```bash
git log --oneline --graph --all
git branch --list
```

---

## 🔍 Giải thích command
- `git log --graph --all`: Xem các commit và nhánh còn thể hiện trong lịch sử; chỉ riêng đồ thị không chứng minh được workflow của nhóm.
- `git branch --list`: Liệt kê nhánh local hiện có. Để hiểu quy trình, hỏi thêm về PR, bảo vệ nhánh, CI và release.

---

## ⚠️ Sai lầm phổ biến
1. **Áp dụng máy móc**: Bắt nhóm nhỏ dùng nhiều nhánh dài hạn có thể tăng công sức mà không giải quyết vấn đề thực tế.
2. **Tích hợp thường xuyên mà thiếu phản hồi**: Không có test/CI đáng tin cậy có thể làm nhóm phát hiện lỗi muộn; chọn cách kiểm tra phù hợp trước khi tăng nhịp tích hợp.
3. **Thay đổi quy trình liên tục**: Đổi workflow quá thường xuyên làm đảo lộn thói quen và gây bối rối cho toàn bộ kỹ sư trong nhóm.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.
1. Dùng `git log --oneline --graph --all` trong repo thử nghiệm để quan sát các nhánh còn thấy được.
2. So sánh ba workflow theo nhánh dài hạn, cách review, nhịp tích hợp, kiểm thử và lịch phát hành.
3. Chọn một workflow cho tình huống giả định, nêu một lợi ích, một chi phí và điều kiện khiến bạn đổi lựa chọn.

---

## 💡 Hint & mẹo
> Hãy chọn theo cách nhóm tích hợp, kiểm thử và phát hành; đừng suy ra workflow chỉ từ tên sản phẩm.

---

## ✅ Validation & Kết quả mong đợi
- Phân tích rạch ròi ưu nhược điểm của cả 3 mô hình Git Flow, GitHub Flow và Trunk-Based Development.
- Giải thích lựa chọn dựa trên ràng buộc thực tế và nêu được ít nhất một đánh đổi.

---

## ❓ Quiz nhanh
Hãy làm bài trắc nghiệm dưới đây để đối chiếu và so sánh các mô hình workflow.

---

## 🚀 Thử thách nâng cao
Đề xuất phương án chuyển dịch từng bước từ mô hình Git Flow sang Trunk-Based Development cho một dự án đang phát triển.

---

## 📝 Tổng kết
- Workflow mô tả cách tổ chức nhánh và tích hợp; không tự ấn định tốc độ release.
- CI, review, bảo vệ nhánh và lịch triển khai có thể cấu hình riêng cho từng workflow.
- Chọn mô hình dựa trên yêu cầu phát hành, khả năng kiểm thử và chi phí phối hợp của nhóm.
