# Môi trường triển khai (Environments) & Cổng phê duyệt Protection Rules

---

## 🎯 Mục tiêu bài học
- Nắm vững khái niệm Deployment Environments trong GitHub (Production, Staging, Development).
- Cấu hình cổng phê duyệt của con người (Required Reviewers) trước khi Job triển khai được phép chạy.
- Sử dụng các biến và bí mật riêng biệt theo từng môi trường cụ thể.

---

## 📖 Định nghĩa
> Deployment Environments (Môi trường triển khai) là tính năng của GitHub cho phép bạn mô hình hóa các mục tiêu triển khai thực tế như Production, Staging hay Development. Mỗi môi trường có thể được thiết lập các quy tắc bảo vệ riêng biệt (Environment Protection Rules) bao gồm: bắt buộc có sự phê duyệt thủ công từ những người chỉ định (Required Reviewers), thời gian chờ (Wait Timer), giới hạn nhánh được phép triển khai, và sở hữu kho lưu trữ Secrets/Variables riêng biệt.

---

## 🤔 Tại sao cần?
Tự động hóa hoàn toàn là tuyệt vời, nhưng triển khai lên máy chủ sản xuất phục vụ người dùng thực tế tiềm ẩn rủi ro tài chính to lớn. Bạn không bao giờ muốn một commit vô tình được đẩy vào lúc nửa đêm tự động ghi đè lên cơ sở dữ liệu khách hàng. Cổng phê duyệt môi trường tạo ra điểm dừng kiểm soát an toàn tối thượng: pipeline tạm dừng, gửi email thông báo cho trưởng nhóm kỹ thuật, và chỉ khi họ bấm nút "Approve and deploy" thì Job mới tiếp tục chạy.

---

## 🧠 Mental Model & Mô hình tư duy
Hãy hình dung chiếc chìa khóa đôi để phóng tên lửa vũ trụ trong các trung tâm chỉ huy quân sự cấp cao. Kỹ sư tự động hóa đã chuẩn bị xong toàn bộ bệ phóng, kiểm tra máy tính và nạp đầy đủ nhiên liệu cần thiết (tương đương với các bài kiểm thử unit test đã vượt qua). Nhưng để tên lửa thực sự rời bệ phóng lao lên không gian (triển khai lên production thực tế), bắt buộc phải có hai vị chỉ huy trưởng (Required Reviewers) cùng tra chiếc chìa khóa định danh, xem xét kỹ lưỡng và vặn nút phê duyệt đồng ý trên bảng điều khiển trung tâm.

---

## 🖼️ Sơ đồ minh họa
```text
Quy trình dừng chờ phê duyệt môi trường (Environment Gate):
[Job: Build & Test] ──► [Thành công ✓]
                           │
                           ▼
[Job: Deploy Production] (environment: production)
                           │
                           ▼
        ┌──────────────────────────────────────┐
        │ TRẠNG THÁI: WAITING APPROVAL ⏸️       │
        │ Gửi thông báo tới: Lead Engineer      │
        └──────────────────┬───────────────────┘
                           │
               ┌───────────┴───────────┐
               ▼                       ▼
        [Bấm APPROVE ✓]         [Bấm REJECT ✗]
               │                       │
               ▼                       ▼
     [Thực thi Deploy]         [Hủy bỏ phiên chạy]
```

---

## 🌎 Ví dụ thực tế
Một công ty fintech quản lý môi trường triển khai có tên `production`. Trong phần thiết lập môi trường, họ chỉ định 2 kỹ sư trưởng làm Required Reviewers và chỉ cho phép triển khai từ nhánh `main`. Khi một bản vá lỗi được gộp vào nhánh chính, Job biên dịch chạy hoàn tất trong 3 phút, sau đó Job triển khai chuyển sang trạng thái màu vàng: "Waiting for review". Trưởng nhóm nhận được thông báo trên điện thoại, xem xét danh sách các thay đổi và bấm nút "Approve and deploy". Ngay lập tức, máy ảo Runner được cấp phát và mã nguồn được đẩy lên hệ thống máy chủ ngân hàng an toàn.

---

## 💻 Command & Lệnh thao tác
```bash
gh deployment list
echo "Deploying to production server"
```

---

## 🔍 Giải thích chi tiết lệnh
Lệnh gh deployment list hiển thị lịch sử các lần triển khai lên các môi trường, giúp theo dõi phiên bản nào đang hoạt động trên máy chủ nào.

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Không cấu hình Environment Protection Rules khiến bất kỳ ai có quyền commit lên nhánh cũng có thể kích hoạt triển khai lên production.**: 
2. **Sử dụng chung một mã khóa API cho cả môi trường kiểm thử (staging) và sản xuất (production).**: 
3. **Bỏ qua việc giới hạn nhánh khiến các nhánh thử nghiệm cá nhân cũng có thể kích hoạt môi trường production.**: 

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Khai báo thuộc tính `environment: production` bên trong định nghĩa của Job `deploy`.
2. Cấu hình biến môi trường riêng biệt theo môi trường để kiểm tra tính năng cách ly.
3. Quan sát trạng thái Job tạm dừng và yêu cầu xác nhận phê duyệt trước khi hoàn thành.

---

## 💡 Gợi ý thực hiện (Hint)
> Tính năng Environment Protection Rules yêu cầu kho lưu trữ Public hoặc tài khoản GitHub Enterprise/Team.

---

## ✅ Kiểm tra kết quả (Validation)
Job triển khai dừng lại ở trạng thái chờ phê duyệt và chỉ hoàn thành khi có sự chấp thuận.

---

## ❓ Câu hỏi ôn tập (Quiz)
Hãy kiểm tra mức độ hiểu biết của bạn về Môi trường và Cổng phê duyệt trong CD qua các câu hỏi sau.

---

## 🔥 Thử thách nâng cao (Challenge)
Làm thế nào để kết hợp tính năng Wait Timer (thời gian chờ trì hoãn) với Required Reviewers để ngăn ngừa việc triển khai nóng vội?

---

## 📚 Tổng kết kiến thức
- `environment` mô hình hóa các môi trường triển khai thực tế như `production`, `staging`.
- Cung cấp cổng bảo vệ kiểm duyệt với cơ chế phê duyệt thủ công (Required Reviewers).
- Cho phép định nghĩa các Secrets và Variables độc quyền chỉ có hiệu lực trong môi trường đó.
