# Quy trình cộng tác nhóm tiêu chuẩn (Feature Branch Workflow)

---

## 🎯 Mục tiêu
- Nắm vững toàn bộ bức tranh quy trình cộng tác nhóm chuẩn mực quốc tế: Feature Branch Workflow.
- Tuân thủ nghiêm ngặt quy tắc vàng: Tuyệt đối không bao giờ commit hay push trực tiếp vào nhánh `main`.
- Vận hành trơn tru chuỗi 7 bước từ nhận nhiệm vụ, tạo nhánh, lập trình, tạo PR, review cho đến khi xuất bản tính năng.
- Tự tin tham gia vào các dự án phần mềm chuyên nghiệp quy mô vừa và lớn.

---

## 📖 Định nghĩa
> Feature Branch Workflow là quy trình cộng tác phát triển phần mềm chuẩn mực và phổ biến bậc nhất trong ngành công nghệ thông tin toàn cầu. Quy tắc cốt lõi của quy trình này là: Nhánh chính (`main` hoặc `master`) được coi là thánh đường ổn định (Production-ready) và luôn trong trạng thái có thể triển khai; mọi tính năng mới, bản sửa lỗi hay thử nghiệm đều BẮT BUỘC phải được phát triển trên một nhánh riêng biệt (Feature Branch), trải qua quá trình Pull Request và Code Review kỹ lưỡng trước khi được phép hòa nhập vào nhánh chính.

---

## 🤔 Tại sao cần?
Khi làm việc một mình, bạn có thể commit tùy hứng. Nhưng khi bước vào môi trường doanh nghiệp với hàng chục kỹ sư cùng làm việc trên một sản phẩm, việc thiếu một quy trình chuẩn hóa sẽ dẫn đến thảm họa: code bị ghi đè, hệ thống liên tục sập, và xung đột triền miên không hồi kết. Feature Branch Workflow mang lại sự an toàn tuyệt đối, phân định trách nhiệm minh bạch và giúp nhóm phát hành tính năng liên tục với chất lượng cao nhất.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung một dàn nhạc giao hưởng lớn đang biểu diễn trước hàng ngàn khán giả (nhánh main trên sân khấu). Không một nhạc công nào được phép tự ý mang một giai điệu mới toanh vừa nghĩ ra trong đầu lên sân khấu chơi thử ngay trước mặt khán giả. Từng nghệ sĩ phải vào phòng tập riêng cách âm (Feature Branch), luyện tập thành thục giai điệu đó, trình diễn cho nhạc trưởng duyệt (Code Review & PR). Khi nhạc trưởng gật đầu hài lòng, giai điệu mới được hòa vào bản giao hưởng chính.

---

## 🖼 Sơ đồ
```text
Chuỗi 7 bước chuẩn mực của Feature Branch Workflow:
[1. Nhận Issue] ──► [2. git pull main] ──► [3. git switch -c feat/xyz]
                                                         │
                                                         ▼
[6. Review & Merge PR] ◄── [5. Push & Mở PR] ◄── [4. Code & Commit]
         │
         ▼
[7. Xóa nhánh & Cập nhật local main]
```

---

## 🌎 Ví dụ thực tế
Đội ngũ kỹ thuật gồm 10 thành viên của một ứng dụng ngân hàng vận hành nghiêm ngặt theo đúng Feature Branch Workflow tiêu chuẩn. Mỗi buổi sáng, từng lập trình viên chọn một Issue từ bảng Kanban, cập nhật mã nguồn mới nhất bằng `git pull origin main`, tạo nhánh riêng biệt mang tên `feat/biometric-login`, viết code và thực hiện kiểm thử tự động cục bộ. Khi hoàn thành, lập trình viên đẩy nhánh lên GitHub, mở PR kèm bản danh sách checklist kiểm tra an ninh bảo mật. Hai kỹ sư senior vào xem xét, phản biện và phê duyệt. PR được squash-merge vào nhánh main và hệ thống tự động triển khai mã nguồn mới lên môi trường kiểm thử mà không phát sinh bất kỳ sự cố gián đoạn nào.

---

## 💻 Command
```bash
git switch main
git pull origin main
git switch -c feat/<tên-tính-năng>
git push -u origin feat/<tên-tính-năng>
git branch -d feat/<tên-tính-năng>
```

---

## 🔍 Giải thích command
- `git switch main && git pull origin main`: Luôn xuất phát từ mốc mới nhất và ổn định nhất của nhánh main.
- `git switch -c feat/<tên>`: Tách nhánh làm việc hoàn toàn cách ly cho tính năng mới.
- `git push -u origin feat/<tên>`: Đưa nhánh lên GitHub để kích hoạt môi trường làm việc nhóm và PR.
- `git branch -d feat/<tên>`: Dọn dẹp vệ sinh kho chứa sau khi tính năng đã được tích hợp thành công.

---

## ⚠️ Sai lầm phổ biến
1. **Tiện tay commit thẳng lên nhánh main**:  Vi phạm quy tắc an toàn cơ bản nhất của phát triển phần mềm.
2. **Tạo nhánh từ một nhánh tính năng dở dang khác thay vì tách từ main**:  Làm dây chuyền các lỗi chưa kiểm chứng sang tính năng mới.
3. **Giữ nhánh tính năng quá lâu suốt nhiều tháng không merge**:  Dẫn đến "Merge Hell" với hàng trăm xung đột không thể giải quyết.

---

## 🧪 Lab
1. Chuyển về nhánh `main` và kéo code mới nhất bằng `git pull origin main`.
2. Tạo nhánh tính năng chuẩn quy ước `feat/user-profile` bằng `git switch -c feat/user-profile`.
3. Thực hiện một số commit có thông điệp chuẩn mực trên nhánh này.
4. Đẩy lên GitHub, tạo PR, giả lập quá trình review và merge thành công.

---

## 💡 Hint
> Nhớ câu thần chú: Nhánh main luôn luôn sạch sẽ, ổn định và có thể release bất cứ lúc nào.

---

## ✅ Validation
- Vận hành thành thạo toàn bộ chu kỳ 7 bước của Feature Branch Workflow.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về quy trình Feature Branch Workflow.

---

## 🔥 Challenge
Nêu sự khác biệt giữa Feature Branch Workflow và quy trình Git Flow phức tạp có thêm nhánh develop và release.

---

## 📚 Tổng kết
- Feature Branch Workflow là tiêu chuẩn vàng của cộng tác nhóm hiện đại.
- Nhánh main luôn bất biến và ổn định; mọi tính năng đều nằm trên nhánh riêng.
- Quy trình 7 bước: Nhận việc -> Tách nhánh -> Code -> Push -> PR -> Review -> Merge.
