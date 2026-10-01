# Quy trình cộng tác nhóm tiêu chuẩn (Feature Branch Workflow)

---

## 🎯 Mục tiêu
- Hiểu một quy trình cộng tác phổ biến: Feature Branch Workflow.
- Thực hiện các bước từ nhận nhiệm vụ, tạo nhánh, commit, mở PR đến review và tích hợp.
- Biết nhóm có thể quy định nhánh đích, review và cách tích hợp khác nhau.
- Tự tin tham gia vào các dự án phần mềm chuyên nghiệp quy mô vừa và lớn.

---

## 🧩 Từ khóa hôm nay

### feature branch workflow
- **Nói dễ hiểu**: Cách làm trong đó mỗi nhiệm vụ được phát triển trên nhánh riêng rồi đưa ra review trước khi tích hợp.
- **Ví dụ**: Tạo nhánh `feat/biometric-login` rồi mở PR vào nhánh đích do nhóm chọn.
- **Đừng nhầm**: Đây là một quy trình phổ biến, không phải yêu cầu bắt buộc của Git hay phù hợp với mọi nhóm.

### protected default branch — nhánh mặc định được bảo vệ
- **Nói dễ hiểu**: Nhánh đích có thể được cấu hình để yêu cầu review, kiểm tra hoặc giới hạn push.
- **Ví dụ**: Nhóm cấu hình `main` phải có một lượt review trước khi merge PR.
- **Đừng nhầm**: Git không tự bảo vệ `main`; repository phải được cấu hình. Một số nhóm dùng trunk-based development và tích hợp thay đổi nhỏ thường xuyên.

### merge hell
- **Nói dễ hiểu**: Cơn ác mộng xung đột khi giữ một nhánh tính năng quá lâu hàng tháng trời mà không đồng bộ với nhánh chính.
- **Ví dụ**: Nhánh của bạn bị tụt lại 200 commit so với main, khi gộp sẽ phát sinh hàng chục file xung đột phức tạp.
- **Đừng nhầm**: Có thể tránh hoàn toàn bằng cách chia nhỏ tính năng, mở PR sớm và định kỳ rebase/pull từ main về nhánh.

---

## 📖 Định nghĩa
Feature Branch Workflow là một cách cộng tác: mỗi nhiệm vụ có nhánh riêng, sau đó mở PR để review và tích hợp. Đây là quy trình phổ biến, không phải quy định bắt buộc của Git; nhóm có thể dùng trunk-based development hoặc cách khác. Nhánh mặc định chỉ được bảo vệ nếu repository cấu hình như vậy.

---

## 💡 Tại sao cần
Nhánh riêng giúp tách biệt thay đổi và tạo điểm review trước khi tích hợp. Một số nhóm dùng quy trình khác, chẳng hạn trunk-based development; hãy đọc hướng dẫn của repository trước khi chọn cách làm.

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
1. Đọc hướng dẫn repository để xác định nhánh đích và cách cập nhật; đừng mặc định tên nhánh là `main`.
2. Trong kho thử nghiệm có remote, chuyển sang nhánh đích và cập nhật theo hướng dẫn dự án.
3. Tạo nhánh `feat/user-profile`, sửa một file nhỏ, rồi add và commit.
4. Push nhánh lên remote bạn có quyền ghi. Mở PR thử nghiệm, kiểm tra base/compare, xem diff và viết mô tả.
5. Nếu có reviewer, xử lý góp ý; chỉ merge PR thử nghiệm khi có quyền. Trong simulator, push chỉ cập nhật remote giả lập; có thể hoàn thành bằng cách viết mô tả PR và tự review diff.

---

## 💡 Hint & mẹo
> Đọc quy định của repository để biết nhánh mặc định có được bảo vệ và cần review trước khi tích hợp hay không.

---

## ✅ Validation & Kết quả mong đợi
- Tạo được nhánh nhiệm vụ, commit có nội dung rõ và kiểm tra được diff.
- Mô tả được quy trình PR theo cấu hình của repository mình đang dùng.

---

## ❓ Quiz nhanh
Hãy hoàn thành các câu hỏi trắc nghiệm dưới đây để kiểm tra hiểu biết về Feature Branch Workflow.

---

## 🚀 Thử thách nâng cao
Tìm hiểu sự khác biệt giữa Feature Branch Workflow tinh gọn và mô hình Git Flow truyền thống có các nhánh dài hạn như `develop` và `release`.

---

## 📝 Tổng kết
- Feature Branch Workflow là một trong nhiều quy trình cộng tác.
- Nhánh đích, review và quyền push do nhóm/repository quy định.
- Luồng phổ biến: nhận việc -> thay đổi -> commit -> chia sẻ -> review -> tích hợp.
