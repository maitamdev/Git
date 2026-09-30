# Vì sao team cần workflow?

---

## 🎯 Mục tiêu
- Hiểu rõ sự khác biệt bản chất giữa lập trình cá nhân và phát triển phần mềm theo đội ngũ chuyên nghiệp.
- Nhận diện các rủi ro thảm họa khi đội ngũ không có quy trình phân nhánh và tích hợp mã nguồn rõ ràng.
- Nắm bắt các lợi ích cốt lõi của một Git Workflow chuẩn: giảm xung đột, bảo đảm chất lượng, tự động hóa phát hành.
- Sẵn sàng tiếp cận các mô hình workflow chuẩn mực trong ngành công nghiệp phần mềm hiện đại.

---

## 📖 Định nghĩa
> Team Workflow (Quy trình làm việc nhóm trong Git) là một tập hợp các quy tắc, thỏa thuận và quy ước có cấu trúc rõ ràng về cách các thành viên trong một dự án tương tác với kho lưu trữ mã nguồn chung. Nó định nghĩa cụ thể chiến lược phân nhánh (Branching Strategy), quy chuẩn đặt tên commit, quy trình kiểm duyệt mã nguồn (Code Review), tiêu chí hợp nhất (Merge Criteria) và cách thức phát hành sản phẩm. Thiếu đi workflow, Git chỉ là một công cụ lưu trữ dữ liệu hỗn loạn; có workflow chuẩn mực, Git trở thành xương sống vận hành nhịp nhàng của cả tổ chức công nghệ.

---

## 🤔 Tại sao cần?
Khi bạn làm việc một mình, bạn có toàn quyền commit thẳng vào nhánh main, sửa lỗi bất cứ lúc nào và tự quyết định khi nào sản phẩm sẵn sàng. Nhưng khi quy mô dự án tăng lên từ 5, 10 đến hàng trăm kỹ sư cùng đồng thời phát triển trên một codebase, sự tự do không kiểm soát sẽ nhanh chóng biến thành cơn ác mộng: mã nguồn bị ghi đè lẫn nhau, các tính năng chưa hoàn thiện bị đưa nhầm lên production, xung đột code xuất hiện liên tục và không ai chịu trách nhiệm khi hệ thống gặp sự cố.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung hệ thống giao thông trong một thành phố hiện đại. Nếu trên đường chỉ có duy nhất một chiếc xe của bạn chạy giữa đêm khuya, bạn có thể rẽ trái, rẽ phải hoặc dừng lại tùy ý mà không gây tai nạn. Nhưng khi có hàng ngàn chiếc xe cùng lưu thông vào giờ cao điểm, xã hội bắt buộc phải có đèn tín hiệu giao thông, làn đường riêng, biển báo giới hạn tốc độ và quy tắc nhường đường. Git Workflow chính là luật giao thông giúp dòng chảy mã nguồn của hàng chục kỹ sư lưu thông trơn tru mà không xảy ra va chạm hay tắc nghẽn thảm khốc.

---

## 🖼 Sơ đồ
```text
Sự khác biệt giữa phát triển tự do và có Git Workflow chuẩn mực:
TỰ DO (CHAOS):
Dev A ──push direct──► [main branch] ◄──push direct── Dev B (Ghi đè, xung đột, vỡ app)
                               ▲
Dev C ──────push code lỗi──────┘

CÓ WORKFLOW (ORDER):
Dev A ──► [feat/login] ──► PR Review ──┐
Dev B ──► [feat/cart]  ──► PR Review ──┼──► [Automated CI Test] ──► [main branch (Protected)]
Dev C ──► [fix/typo]   ──► PR Review ──┘
```

---

## 🌎 Ví dụ thực tế
Tại một công ty khởi nghiệp công nghệ, ban đầu ba kỹ sư cùng commit trực tiếp vào nhánh `main` mà không theo bất kỳ quy chuẩn nào. Vào một buổi chiều trước đợt khuyến mãi lớn, kỹ sư Hoàng đẩy một đoạn code đang dở dang lên nhánh chính khiến tính năng đăng nhập bị tê liệt toàn bộ. Đồng thời, kỹ sư Mai vô tình force push làm mất sạch phần mã nguồn thanh toán vừa viết xong của kỹ sư Tuấn. Cả nhóm mất trọn một đêm trắng trong hoảng loạn để tìm lại code và giải quyết xung đột. Sau sự cố nhớ đời đó, nhóm đã ngồi lại cùng nhau thiết lập một quy trình làm việc chuẩn mực: cấm push trực tiếp vào main, mọi tính năng đều phải tạo nhánh riêng và bắt buộc phải qua bước kiểm duyệt mã nguồn cẩn thận.

---

## 💻 Command
```bash
git status
git branch -a
git log --oneline --graph
```

---

## 🔍 Giải thích command
- `git status`: Kiểm tra tình trạng nhánh làm việc và các tệp tin trước khi bắt đầu quy trình.
- `git branch -a`: Liệt kê toàn bộ các nhánh cục bộ và nhánh trên máy chủ từ xa để nắm bắt bức tranh tổng quan.
- `git log --oneline --graph`: Hiển thị sơ đồ trực quan các nhánh và commit giúp theo dõi tiến độ tích hợp.

---

## ⚠️ Sai lầm phổ biến
1. **Cho phép thành viên commit và push trực tiếp vào nhánh sản phẩm chính main hoặc production.**: Cho phép thành viên commit và push trực tiếp vào nhánh sản phẩm chính main hoặc production.
2. **Thiết lập quy trình quá rườm rà, cứng nhắc không phù hợp với quy mô thực tế và tốc độ của dự án.**: Thiết lập quy trình quá rườm rà, cứng nhắc không phù hợp với quy mô thực tế và tốc độ của dự án.
3. **Không tổ chức hướng dẫn, phổ biến và giám sát việc tuân thủ quy ước nhóm một cách đồng bộ.**: Không tổ chức hướng dẫn, phổ biến và giám sát việc tuân thủ quy ước nhóm một cách đồng bộ.

---

## 🧪 Lab
1. Thảo luận và liệt kê 3 rủi ro lớn nhất nếu một nhóm 10 lập trình viên cùng push thẳng vào main.
2. Sử dụng lệnh `git branch -a` và `git log --graph` để quan sát cấu trúc nhánh trong một kho lưu trữ mẫu.

---

## 💡 Hint
> Một workflow tốt là workflow cân bằng giữa tính an toàn bảo vệ mã nguồn và tốc độ phát triển của nhóm.

---

## ✅ Validation
- Hiểu rõ tại sao các tổ chức công nghệ chuyên nghiệp luôn cấm commit trực tiếp lên main.

---

## ❓ Quiz
Hãy làm bài trắc nghiệm dưới đây để kiểm tra hiểu biết của bạn về tầm quan trọng của Git Workflow.

---

## 🔥 Challenge
Phân tích các tổn thất về chi phí tài chính và uy tín khi một đoạn mã lỗi bị đưa nhầm lên production do thiếu quy trình review.

---

## 📚 Tổng kết
- Team Workflow là nền tảng sống còn bảo đảm sự phối hợp nhịp nhàng giữa nhiều kỹ sư trên một codebase.
- Quy trình chuẩn giúp loại bỏ rủi ro ghi đè code, phát hiện lỗi sớm qua kiểm duyệt và bảo vệ nhánh chính.
- Mọi dự án chuyên nghiệp đều phân tách rõ ràng giữa nhánh phát triển tính năng và nhánh phát hành ổn định.
