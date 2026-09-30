# CI/CD là gì? Tự động hóa tích hợp & chuyển giao liên tục

---

## 🎯 Mục tiêu bài học
- Nắm vững bản chất cốt lõi của Continuous Integration (CI) và Continuous Delivery/Deployment (CD).
- Hiểu rõ sự khác biệt giữa quy trình kiểm thử thủ công rủi ro và đường ống tự động hóa.
- Nhận thức các lợi ích then chốt: giảm thiểu lỗi hồi quy, phát hành phiên bản nhanh và phản hồi sớm.

---

## 📖 Định nghĩa
> CI/CD viết tắt của Continuous Integration (Tích hợp liên tục) và Continuous Delivery/Deployment (Chuyển giao hoặc Triển khai liên tục). Đây là phương pháp luận kỹ thuật phần mềm hiện đại và văn hóa DevOps cốt lõi nhằm tự động hóa hoàn toàn các giai đoạn từ khi lập trình viên hoàn thành một đoạn mã nguồn mới, đẩy lên kho lưu trữ Git trung tâm, cho đến khi mã nguồn đó được kiểm tra phân tích cú pháp, biên dịch thành công, vượt qua toàn bộ các bài kiểm thử tự động đa tầng và sẵn sàng chuyển giao lên các môi trường thử nghiệm hoặc máy chủ sản xuất thực tế phục vụ người dùng cuối.

---

## 🤔 Tại sao cần?
Trong mô hình phát triển phần mềm truyền thống, các nhóm kỹ sư thường làm việc trên các nhánh riêng biệt trong nhiều tuần và chỉ tích hợp mã nguồn vào giai đoạn cuối kỳ phát hành. Hậu quả trực tiếp là hiện tượng ác mộng tích hợp (Integration Hell) bùng nổ với hàng trăm xung đột mã nguồn và lỗi logic tiềm ẩn không thể kiểm soát. CI/CD giải quyết triệt để vấn đề này bằng cách ép buộc mọi thay đổi nhỏ phải được tích hợp liên tục vào nhánh chung, sau đó kích hoạt ngay lập tức chu trình kiểm thử tự động, giúp kỹ sư phát hiện và khắc phục sự cố chỉ trong vài phút sau khi viết mã.

---

## 🧠 Mental Model & Mô hình tư duy
Hãy hình dung dây chuyền sản xuất lắp ráp ô tô tự động hóa hiện đại bậc nhất. Thay vì để một chiếc xe hoàn thiện toàn bộ khung vỏ động cơ rồi mới bắt đầu kiểm tra phanh và hệ thống lái, mỗi chi tiết linh kiện khi vừa được cánh tay robot lắp ráp vào khung gầm đều lập tức đi qua các cảm biến quang học quét kiểm tra chất lượng tự động ngay tại chỗ. Nếu phát hiện một con ốc chưa đủ độ siết hoặc có vết nứt nhỏ, dây chuyền lập tức dừng lại và phát đèn đỏ cảnh báo, đảm bảo không có bất kỳ sản phẩm lỗi nào được đi tiếp tới công đoạn bàn giao khách hàng.

---

## 🖼️ Sơ đồ minh họa
```text
Developer push code ──► [Continuous Integration] ──► [Continuous Delivery] ──► [Production Deploy]
                             │                               │
                             ├─ Chạy Linter                   ├─ Đóng gói Docker Image
                             ├─ Biên dịch TypeScript         ├─ Đẩy lên Staging Server
                             └─ Chạy Unit/E2E Tests          └─ Chờ phê duyệt tự động
```

---

## 🌎 Ví dụ thực tế
Một công ty thương mại điện tử phục vụ hàng triệu người mua sắm trực tuyến áp dụng đường ống CI/CD chuẩn mực. Mỗi khi một kỹ sư tạo Pull Request bổ sung chức năng mã giảm giá mới, hệ thống tự động khởi tạo máy ảo, kéo toàn bộ mã nguồn về, cài đặt các thư viện phụ thuộc và chạy hơn một nghìn bài kiểm thử đơn vị. Nếu có một hàm tính toán tiền tệ bị sai lệch một chữ số thập phân, bài test lập tức báo đỏ và khóa chức năng merge. Nhờ vậy, nhóm phát triển có thể tự tin phát hành hơn hai mươi bản cập nhật phần mềm mỗi ngày mà hệ thống máy chủ thanh toán vẫn hoạt động ổn định tuyệt đối và không phát sinh sự cố ngừng trệ.

---

## 💻 Command & Lệnh thao tác
```bash
npm test
npm run build
git push origin main
```

---

## 🔍 Giải thích chi tiết lệnh
Các câu lệnh trên mô phỏng ba bước nền tảng của quy trình tích hợp: chạy kiểm thử cục bộ với npm test để phát hiện lỗi logic, biên dịch mã nguồn với npm run build để kiểm tra lỗi kiểu dữ liệu và cú pháp, cuối cùng là đẩy mã nguồn lên GitHub để kích hoạt đường ống CI trên đám mây hoạt động hoàn toàn tự động.

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Coi CI/CD chỉ là việc cài đặt công cụ**:  Công cụ chỉ phát huy hiệu quả khi văn hóa kiểm thử tự động trong nhóm đã được xây dựng vững vàng.
2. **Viết bài kiểm thử quá chậm kéo dài hàng giờ**:  Khiến vòng phản hồi bị đình trệ và lập trình viên có xu hướng né tránh chạy kiểm thử.
3. **Bỏ qua cảnh báo kiểm thử không ổn định (flaky test)**:  Dẫn đến việc các thành viên mất niềm tin vào kết quả báo cáo của đường ống CI.

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Xem xét dự án mẫu chứa các bài kiểm thử Jest và cấu hình script trong tệp package.json.
2. Chạy thử nghiệm lệnh npm test cục bộ và quan sát kết quả kiểm thử đạt chuẩn.
3. Thử cố tình sửa sai một giá trị kỳ vọng trong bài test để quan sát mã lỗi trả về.

---

## 💡 Gợi ý thực hiện (Hint)
> Bản chất của CI là phản hồi cực nhanh, hãy giữ cho các bài kiểm thử cơ bản chạy dưới 5 phút.

---

## ✅ Kiểm tra kết quả (Validation)
Toàn bộ các bài kiểm thử tự động báo trạng thái Passed và mã nguồn biên dịch không lỗi.

---

## ❓ Câu hỏi ôn tập (Quiz)
Hãy kiểm tra mức độ thấu hiểu của bạn về khái niệm và triết lý CI/CD qua các câu hỏi sau.

---

## 🔥 Thử thách nâng cao (Challenge)
Phân tích sự khác biệt cốt lõi giữa Continuous Delivery (chuyển giao liên tục) và Continuous Deployment (triển khai liên tục) đối với cổng phê duyệt thủ công của con người.

---

## 📚 Tổng kết kiến thức
- CI là thực hành tự động tích hợp, biên dịch và kiểm thử mã nguồn liên tục mỗi khi có thay đổi mới.
- CD mở rộng CI bằng cách tự động hóa quá trình đóng gói và triển khai sản phẩm lên các môi trường thử nghiệm hoặc sản xuất.
- Đường ống CI/CD mang lại vòng phản hồi ngắn, giảm rủi ro phát hành và nâng cao chất lượng phần mềm.
