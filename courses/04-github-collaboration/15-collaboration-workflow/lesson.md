# Quy trình cộng tác nhóm tiêu chuẩn (Feature Branch Workflow)

---

## 🎯 Mục tiêu
- Nắm vững toàn bộ bức tranh quy trình cộng tác nhóm chuẩn mực quốc tế: Feature Branch Workflow.
- Tuân thủ nghiêm ngặt quy tắc vàng: Tuyệt đối không bao giờ commit hay push trực tiếp vào nhánh `main`.
- Vận hành trơn tru chuỗi 7 bước từ nhận nhiệm vụ, tạo nhánh, lập trình, tạo PR, review cho đến khi xuất bản tính năng.
- Tự tin tham gia vào các dự án phần mềm chuyên nghiệp quy mô vừa và lớn.

---

## 🧩 Từ khóa hôm nay

### feature branch workflow
- **Nói dễ hiểu**: Quy trình làm việc nhóm quy định mọi tính năng hoặc bản sửa lỗi đều phải làm trên nhánh riêng, không đụng vào nhánh chính.
- **Ví dụ**: Tạo nhánh `feat/biometric-login` để code rồi mở PR xin gộp vào `main`.
- **Đừng nhầm**: Không phải quy trình chỉ dùng cho dự án lớn; dự án 2 người cũng nên áp dụng để tránh ghi đè code của nhau.

### production-ready main
- **Nói dễ hiểu**: Nguyên tắc giữ nhánh `main` luôn ở trạng thái sạch sẽ, hoàn thiện và sẵn sàng phát hành cho khách hàng bất cứ lúc nào.
- **Ví dụ**: Không bao giờ commit code thử nghiệm hay code đang bị lỗi dở dang vào nhánh main.
- **Đừng nhầm**: Không có nghĩa là main không bao giờ thay đổi; main chỉ nhận code hoàn chỉnh qua Pull Request đã duyệt.

### merge hell
- **Nói dễ hiểu**: Cơn ác mộng xung đột khi giữ một nhánh tính năng quá lâu hàng tháng trời mà không đồng bộ với nhánh chính.
- **Ví dụ**: Nhánh của bạn bị tụt lại 200 commit so với main, khi gộp sẽ phát sinh hàng chục file xung đột phức tạp.
- **Đừng nhầm**: Có thể tránh hoàn toàn bằng cách chia nhỏ tính năng, mở PR sớm và định kỳ rebase/pull từ main về nhánh.

---

## 📖 Định nghĩa
Feature Branch Workflow là quy trình cộng tác phát triển chuẩn mực trong ngành phần mềm. Quy tắc cốt lõi: Nhánh chính (`main`) được bảo vệ nghiêm ngặt và luôn ở trạng thái sẵn sàng phát hành; mọi tính năng mới hay bản vá lỗi đều phải thực hiện trên một nhánh tính năng riêng biệt và chỉ được gộp qua Pull Request đã qua kiểm duyệt.

---

## 💡 Tại sao cần
Khi làm việc trong nhóm nhiều kỹ sư, việc thiếu quy trình chuẩn hóa sẽ dẫn đến thảm họa: code bị ghi đè lẫn nhau, hệ thống liên tục sập và xung đột triền miên. Feature Branch Workflow mang lại sự an toàn, phân định trách nhiệm rõ ràng và giúp nhóm bàn giao tính năng liên tục với chất lượng cao.

---

## 🧠 Mental Model
Hãy hình dung một dàn nhạc giao hưởng đang biểu diễn trên sân khấu (nhánh main). Không nhạc công nào được tự ý đem một đoạn nhạc vừa nghĩ ra chơi thử ngay trước mặt khán giả. Từng nghệ sĩ phải vào phòng tập cách âm riêng (Feature Branch), luyện tập nhuần nhuyễn rồi trình diễn cho nhạc trưởng duyệt (Review PR) trước khi hòa vào bản nhạc chính.

---

## 📊 Sơ đồ minh họa
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

## 🏢 Ví dụ thực tế
Đội ngũ phát triển ứng dụng ngân hàng vận hành theo Feature Branch Workflow. Mỗi sáng, lập trình viên nhận một Issue, cập nhật `git pull origin main`, tạo nhánh `feat/biometric-login`, viết code và kiểm thử tự động. Khi hoàn thành, bạn đẩy nhánh lên GitHub, mở PR kèm checklist an ninh. Hai senior kiểm tra và phê duyệt trước khi squash-merge vào main an toàn.

---

## 💻 Command & Cú pháp
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
1. **Tiện tay commit thẳng lên nhánh main**: Vi phạm nguyên tắc bảo vệ nhánh chính và dễ làm gián đoạn bản phát hành chung.
2. **Tách nhánh từ một nhánh tính năng dở dang khác**: Làm dây chuyền các lỗi chưa kiểm chứng sang nhánh mới thay vì xuất phát từ main chuẩn.
3. **Giữ nhánh tính năng quá lâu nhiều tuần không merge**: Gây ra tình trạng Merge Hell với hàng loạt xung đột mã nguồn nan giải.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thực hành chu trình 7 bước từ tạo nhánh đến merge PR.
1. Chuyển về nhánh `main` và kéo code mới nhất bằng `git pull origin main`.
2. Tạo nhánh tính năng chuẩn quy ước `feat/user-profile` bằng `git switch -c feat/user-profile`.
3. Thực hiện một số commit có thông điệp chuẩn mực trên nhánh này.
4. Đẩy lên GitHub, tạo PR, giả lập quá trình review và merge thành công.

---

## 💡 Hint & mẹo
> Nhớ câu khẩu quyết: Nhánh main luôn luôn sạch sẽ, ổn định và có thể release bất cứ lúc nào.

---

## ✅ Validation & Kết quả mong đợi
- Vận hành thành thạo toàn bộ chu kỳ 7 bước của Feature Branch Workflow.
- Nhánh main trên cả máy và GitHub không có bất kỳ commit nháp trực tiếp nào.

---

## ❓ Quiz nhanh
Hãy hoàn thành các câu hỏi trắc nghiệm dưới đây để kiểm tra hiểu biết về Feature Branch Workflow.

---

## 🚀 Thử thách nâng cao
Tìm hiểu sự khác biệt giữa Feature Branch Workflow tinh gọn và mô hình Git Flow truyền thống có các nhánh dài hạn như `develop` và `release`.

---

## 📝 Tổng kết
- Feature Branch Workflow là tiêu chuẩn vàng của cộng tác nhóm hiện đại.
- Nhánh main luôn bất biến và ổn định; mọi tính năng đều nằm trên nhánh riêng.
- Quy trình 7 bước: Nhận việc -> Tách nhánh -> Code -> Push -> PR -> Review -> Merge.
