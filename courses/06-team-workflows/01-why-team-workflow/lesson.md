# Vì sao team cần workflow?

---

## 🎯 Mục tiêu
- Hiểu rõ sự khác biệt bản chất giữa lập trình cá nhân và phát triển phần mềm theo đội ngũ chuyên nghiệp.
- Nhận diện các rủi ro thảm họa khi đội ngũ không có quy trình phân nhánh và tích hợp mã nguồn rõ ràng.
- Nêu cách workflow có thể hỗ trợ phối hợp và những rủi ro nó không loại bỏ được.
- Sẵn sàng tiếp cận các mô hình workflow chuẩn mực trong ngành công nghiệp phần mềm hiện đại.

---

## 🧩 Từ khóa hôm nay

### Git Workflow
- **Nói dễ hiểu**: Bộ quy tắc và quy ước thống nhất trong nhóm về cách tạo nhánh, đặt tên commit, review code và phát hành sản phẩm.
- **Ví dụ**: Quy định mọi tính năng mới phải làm trên nhánh riêng dạng `feat/<tên-tính-năng>` và mở Pull Request để review.
- **Đừng nhầm**: Workflow không phải là một lệnh Git cụ thể; đó là thỏa thuận làm việc giữa các thành viên trong dự án.

### Branching Strategy (Chiến lược phân nhánh)
- **Nói dễ hiểu**: Cách thức tổ chức và phân chia vòng đời của các nhánh (main, feature, release, hotfix) trong kho lưu trữ.
- **Ví dụ**: Chọn GitHub Flow với nhánh main và các nhánh feature ngắn hạn cho dự án phát hành liên tục.
- **Đừng nhầm**: Không có một chiến lược nào phù hợp cho mọi dự án; cần chọn chiến lược tùy thuộc vào quy mô và chu kỳ phát hành.

### Production-ready Branch
- **Nói dễ hiểu**: Nhánh chính mà nhóm cố giữ ở trạng thái có thể phát hành; kiểm thử và review giúp giảm rủi ro nhưng không bảo đảm không có lỗi.
- **Ví dụ**: Nhóm có thể yêu cầu CI xanh và một phê duyệt trước khi PR được gộp vào `main`.
- **Đừng nhầm**: Đây là chính sách của nhóm, không phải điều Git tự áp dụng. Quy tắc bảo vệ cũng có thể có ngoại lệ.

---

## 📖 Định nghĩa
Team Workflow là tập hợp các quy tắc và thỏa thuận có cấu trúc rõ ràng về cách các thành viên trong đội ngũ tương tác với kho lưu trữ Git: cách phân nhánh, viết commit, kiểm duyệt mã nguồn và phát hành sản phẩm an toàn.

---

## 🤔 Tại sao cần?
Khi nhiều người cùng sửa một codebase, quy ước rõ ràng giúp biết thay đổi đang ở đâu, ai cần review và cách đưa chúng vào nhánh phát hành. Thiếu phối hợp làm tăng nguy cơ conflict, ghi đè thay đổi hoặc phát hành lỗi; workflow phù hợp giúp kiểm soát các rủi ro đó.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung một nhóm cùng sửa tài liệu: họ thống nhất nơi ghi đề xuất, cách kiểm tra và cách chấp nhận thay đổi. Git workflow là thỏa thuận tương tự cho code. Nó giúp mọi người phối hợp nhưng không thể ngăn mọi lỗi hoặc xung đột.

---

## 🖼 Sơ đồ
```text
Ví dụ về một workflow nhóm có thể chọn:
Dev A ──► [feat/login] ──► PR ──► [review/checks nếu đã cấu hình] ──► [main]
Dev B ──► [feat/cart]  ──► PR ──► [review/checks nếu đã cấu hình] ──► [main]
```

---

## 🌎 Ví dụ thực tế
Tình huống giả định: một nhóm nhận ra push thẳng vào `main` không giúp họ biết ai đã review thay đổi. Họ thống nhất dùng nhánh ngắn hạn và PR cho những thay đổi rủi ro cao; nhóm khác có thể chọn quy trình đơn giản hơn.

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
1. **Không thống nhất cách cập nhật main**: Push trực tiếp không tự gây lỗi, nhưng có thể bỏ qua review hoặc kiểm tra nếu nhóm cần các bước đó.
2. **Quy trình quá cứng nhắc**: Thiết lập quy trình quá rườm rà không phù hợp với quy mô thực tế sẽ làm chậm tiến độ bàn giao sản phẩm.
3. **Thiếu tài liệu hướng dẫn**: Không phổ biến và ghi chép rõ ràng khiến các thành viên mới làm sai lệch quy chuẩn chung của nhóm.

---

## 🧪 Lab
Hãy cùng tôi mở terminal và thực hiện các bước thực hành trực quan sau:
1. Nêu 3 rủi ro có thể tăng khi nhiều người cập nhật cùng nhánh mà thiếu quy ước chung; phân biệt khả năng xảy ra với điều chắc chắn.
2. Dùng `git branch -a` và `git log --oneline --graph --all` để xem các nhánh/lịch sử trong repo.
3. Nếu có repo GitHub và quyền xem Settings, kiểm tra rule của nhánh chính; nếu không, ghi rõ đây là thông tin cần quản trị viên xác nhận.

---

## 💡 Hint
> Chọn số bước review, kiểm thử và phát hành theo mức rủi ro, quy mô nhóm và cách sản phẩm được triển khai.

---

## ✅ Validation
- Giải thích được workflow giúp nhóm phối hợp, review và phát hành như thế nào.
- Nêu được một lợi ích và một chi phí của quy trình PR trong bối cảnh cụ thể.

---

## ❓ Quiz
Hãy làm bài trắc nghiệm dưới đây để kiểm tra hiểu biết của bạn về tầm quan trọng của Git Workflow.

---

## 🔥 Challenge
Phân tích các tổn thất về chi phí tài chính và uy tín khi một đoạn mã lỗi bị đưa nhầm lên production do thiếu quy trình review.

---

## 📚 Tổng kết
- Team workflow là thỏa thuận về cách nhóm đề xuất, kiểm tra và tích hợp thay đổi.
- Nhánh, review và CI có thể giảm một số rủi ro; chúng không bảo đảm code không lỗi.
- Mở đường cho các mô hình phân nhánh chuẩn mực tiếp theo: Feature Branch, GitHub Flow, Git Flow.
