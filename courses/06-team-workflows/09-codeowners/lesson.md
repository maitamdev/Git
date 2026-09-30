# CODEOWNERS

---

## 🎯 Mục tiêu
- Hiểu rõ khái niệm và lợi ích của tệp tin đặc biệt CODEOWNERS trong việc xác định quyền sở hữu từng module mã nguồn.
- Nắm vững cú pháp khai báo đường dẫn tệp tin và chỉ định người phụ trách cá nhân (@username) hoặc nhóm (@org/team-name).
- Kích hoạt tính năng bắt buộc chủ sở hữu mã nguồn phê duyệt (Require review from Code Owners) trong Branch Protection.
- Tổ chức cấu trúc tệp CODEOWNERS theo thứ tự ưu tiên từ trên xuống dưới một cách chuẩn xác.

---

## 📖 Định nghĩa
> CODEOWNERS là một tệp tin cấu hình đặc biệt được lưu trữ trong thư mục `.github/`, thư mục gốc của kho lưu trữ hoặc thư mục `docs/`. Tệp tin này sử dụng một cú pháp đơn giản tương tự như `.gitignore` để định nghĩa cá nhân hoặc đội ngũ kỹ thuật nào chịu trách nhiệm sở hữu và bảo trì các tệp tin hoặc thư mục cụ thể trong kho mã nguồn. Khi một lập trình viên mở một Pull Request có chỉnh sửa vào các tệp tin đó, nền tảng GitHub sẽ tự động yêu cầu đánh giá (Auto-assign Reviewers) từ các chủ sở hữu tương ứng, bảo đảm mọi thay đổi quan trọng đều được người có chuyên môn sâu nhất thẩm định.

---

## 🤔 Tại sao cần?
Trong các kho lưu trữ lớn với hàng trăm nghìn dòng code và hàng chục đội ngũ cùng phát triển (Monorepo hoặc Microservices repository), không một ai có thể hiểu sâu toàn bộ codebase. Nếu không có CODEOWNERS, người mở Pull Request thường không biết phải gán ai review, hoặc chỉ tiện tay nhờ một người bạn thân duyệt qua loa. Điều này dẫn đến nguy cơ các đoạn mã nhạy cảm như logic bảo mật, thuật toán tính tiền hoặc cấu hình hạ tầng bị thay đổi mà các chuyên gia phụ trách module đó không hề hay biết.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung một bệnh viện đa khoa quy mô lớn. Không một bác sĩ nào có thể phẫu thuật cho tất cả các loại bệnh. Khi một bệnh nhân nhập viện cần mổ tim, bệnh viện tự động chuyển bệnh án đến khoa Phẫu thuật Tim mạch; khi có ca gãy xương, bệnh án được chuyển ngay tới khoa Chấn thương Chỉnh hình. Tệp tin CODEOWNERS đóng vai trò như bảng phân loại chuyên khoa của bệnh viện: tệp nào thuộc module thanh toán thì tự động chuyển đến đội ngũ Kỹ sư Thanh toán, tệp nào thuộc cấu hình bảo mật thì tự động chuyển đến đội ngũ An ninh Mạng.

---

## 🖼 Sơ đồ
```text
Quy trình tự động hóa phân quyền với tệp CODEOWNERS:
Cấu trúc file .github/CODEOWNERS:
*                   @tech-leads
/src/auth/          @security-team
/src/billing/       @fintech-team
/docs/              @tech-writers

Kịch bản Pull Request:
Dev sửa file: /src/billing/stripe.ts
               │
               ▼ (GitHub tự động đối soát)
      Tự động gán Reviewer: @fintech-team!
      Khóa nút Merge cho đến khi đại diện @fintech-team Approve!
```

---

## 🌎 Ví dụ thực tế
Trong kho lưu trữ của một ứng dụng du lịch trực tuyến, tệp `.github/CODEOWNERS` được cấu hình chi tiết: toàn bộ dự án do `@lead-architect` bao quát, nhưng các tệp trong thư mục `/src/payment/` thuộc quyền sở hữu riêng của nhóm `@finance-devs`, còn thư mục `/deploy/` thuộc về nhóm `@devops-engineers`. Khi lập trình viên Thảo mở một Pull Request để tích hợp ví MoMo vào thư mục thanh toán, hệ thống GitHub lập tức tự động gắn thẻ yêu cầu đánh giá gửi tới hai chuyên gia thuộc nhóm `@finance-devs`. Mặc dù đồng nghiệp ngồi cạnh Thảo đã xem và bấm Approve, nhưng nút Merge vẫn hiển thị thông báo cần chữ ký phê duyệt từ đại diện chính thức của nhóm CODEOWNERS sở hữu module thanh toán trước khi có thể tích hợp an toàn.

---

## 💻 Command
```bash
cat .github/CODEOWNERS
git add .github/CODEOWNERS
git commit -m "chore: setup CODEOWNERS file for security and billing"
```

---

## 🔍 Giải thích command
- `cat .github/CODEOWNERS`: Đọc và kiểm tra nội dung phân quyền chủ sở hữu mã nguồn.
- `git add .github/CODEOWNERS`: Thêm tệp cấu hình phân quyền vào danh sách chuẩn bị lưu trữ.
- `git commit -m`: Ghi lại thay đổi thiết lập quyền sở hữu mã nguồn với thông điệp rõ ràng theo chuẩn.

---

## ⚠️ Sai lầm phổ biến
1. **Đặt tệp CODEOWNERS sai vị trí**:  Phải đặt trong `.github/`, thư mục gốc hoặc thư mục `docs/`.
2. **Nhầm lẫn thứ tự ưu tiên**:  Git áp dụng quy tắc từ trên xuống dưới, dòng bên dưới sẽ ghi đè dòng bên trên.
3. **Gán tên tài khoản người dùng chưa được cấp quyền truy cập vào kho lưu trữ (Missing repository access).**: Gán tên tài khoản người dùng chưa được cấp quyền truy cập vào kho lưu trữ (Missing repository access).

---

## 🧪 Lab
1. Tạo tệp `.github/CODEOWNERS` trong kho lưu trữ của bạn với quy tắc mặc định `* @your-username`.
2. Thêm một quy tắc cụ thể cho thư mục `docs/` và quan sát hành vi tự động gán reviewer khi mở PR.

---

## 💡 Hint
> Dòng khai báo bên dưới luôn có độ ưu tiên cao hơn dòng khai báo bên trên trong tệp CODEOWNERS.

---

## ✅ Validation
- Khi mở một PR thay đổi tệp tin, GitHub tự động gắn đúng reviewer được định nghĩa trong CODEOWNERS.

---

## ❓ Quiz
Hãy làm bài trắc nghiệm dưới đây về cơ chế phân quyền mã nguồn với tệp CODEOWNERS.

---

## 🔥 Challenge
Thiết kế cấu trúc tệp CODEOWNERS cho một hệ thống Monorepo gồm 3 dịch vụ: frontend (React), backend (Go) và infrastructure (Terraform).

---

## 📚 Tổng kết
- CODEOWNERS tự động hóa việc gán người có trách nhiệm cao nhất vào đánh giá mã nguồn.
- Ngăn chặn nguy cơ các thay đổi nhạy cảm bị duyệt qua loa bởi những người không có chuyên môn sâu.
- Tích hợp hoàn hảo với Branch Protection Rules để tạo nên hàng rào bảo mật kỹ thuật vững chắc.
