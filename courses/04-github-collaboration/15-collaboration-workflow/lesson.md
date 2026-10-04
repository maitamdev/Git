# Quy trình cộng tác nhóm tiêu chuẩn (Feature Branch Workflow)

---

## 🎯 Mục tiêu
- Thấu suốt chu trình vận hành chuẩn mực của Feature Branch Workflow trong các doanh nghiệp công nghệ hàng đầu.
- Nắm vững 7 bước từ nhận Issue, tách nhánh, lập trình, commit, mở PR đến review và merge vào nhánh chính.
- Hiểu rõ vai trò của luật bảo vệ nhánh (Protected Branch Rules) trong việc ngăn chặn đẩy code trực tiếp lên `main`.
- Rèn luyện kỹ năng tự bảo vệ bản thân và đội ngũ khỏi cạm bẫy ác mộng xung đột mã nguồn (Merge Hell).

---

## 🧩 Từ khóa hôm nay

### feature branch workflow — luồng nhánh tính năng
- **Nói dễ hiểu:** Quy trình làm việc bắt buộc mọi tính năng hay bản sửa lỗi đều phải được viết trên một nhánh riêng rẽ.
- **Ví dụ:** Tạo nhánh `feat/biometric-login` để làm tính năng vân tay, không bao giờ sửa thẳng trên nhánh `main`.
- **Đừng nhầm:** Đây là quy trình tiêu chuẩn của ngành; nhánh `main` luôn được giữ ổn định và sẵn sàng triển khai lên Production bất cứ lúc nào.

### protected branch — nhánh được bảo vệ
- **Nói dễ hiểu:** Nhánh chính (thường là `main`) được thiết lập luật bảo vệ trên GitHub để cấm tuyệt đối hành vi push trực tiếp.
- **Ví dụ:** Lập trình viên cố tình gõ `git push origin main` sẽ bị GitHub từ chối và yêu cầu phải tạo Pull Request.
- **Đừng nhầm:** Luật bảo vệ nhánh không có sẵn mặc định trong Git trên máy tính; bạn phải kích hoạt trong phần cài đặt của GitHub.

### merge hell — ác mộng xung đột
- **Nói dễ hiểu:** Tình cảnh tồi tệ khi một nhánh tính năng bị giữ quá lâu (vài tuần đến vài tháng) mà không đồng bộ với nhánh chính.
- **Ví dụ:** Nhánh của bạn bị tụt lại 300 commit so với `main`, khi gộp lại sẽ phát sinh hàng trăm xung đột mã nguồn nan giải.
- **Đừng nhầm:** Bạn có thể phòng tránh hoàn toàn bằng cách chia nhỏ tính năng, mở PR sớm và định kỳ kéo code mới nhất từ `main` về nhánh mình.

---

## 📖 Định nghĩa
Feature Branch Workflow là quy trình cộng tác tiêu chuẩn hàng đầu trong ngành công nghiệp phần mềm, nơi mọi tính năng mới, bản sửa lỗi hay thử nghiệm kỹ thuật đều bắt buộc phải được phát triển độc lập trên một nhánh tính năng riêng biệt (feature branch) và chỉ được hợp nhất vào nhánh chính thông qua một Pull Request đã được kiểm duyệt nghiêm ngặt.

---

## 🤔 Tại sao cần?
Khi hàng chục kỹ sư cùng làm việc trên một sản phẩm, việc tách biệt các luồng thay đổi là điều kiện tiên quyết để tồn tại. Feature Branch Workflow cô lập hoàn toàn môi trường làm việc của từng thành viên: bạn thoải mái thử nghiệm mà không sợ làm hỏng nhánh chính, đồng thời tạo ra một điểm chặn tự nhiên cho kiểm thử tự động và phản biện mã nguồn trước khi tích hợp.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung một dàn nhạc giao hưởng lớn đang biểu diễn trực tiếp trên sân khấu nhà hát (nhánh main). Không một nhạc công nào được phép đem một giai điệu vừa ngẫu hứng nghĩ ra để chơi thử trước mặt khán giả. Từng nghệ sĩ phải vào phòng tập cách âm riêng (Feature Branch), luyện tập nhuần nhuyễn rồi biểu diễn cho nhạc trưởng duyệt (Review PR) trước khi hòa vào bản hòa tấu chính.

---

## 🖼 Sơ đồ
```text
BẢY BƯỚC KHÉP KÍN CỦA FEATURE BRANCH WORKFLOW:

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
Tại một công ty công nghệ tài chính, mỗi sáng kỹ sư nhận một đầu việc trên Jira hoặc GitHub Issues, cập nhật nhánh chính bằng `git pull origin main`, tạo nhánh mới `feat/biometric-auth`, viết mã và kiểm thử cẩn thận. Khi hoàn thành, kỹ sư đẩy nhánh lên mở PR. Sau khi hai chuyên gia bảo mật phê duyệt và pipeline CI kiểm thử thành công, tính năng mới được hòa vào nhánh chính một cách an toàn tuyệt đối.

---

## 💻 Command
```bash
git switch main
git pull origin main
git switch -c feat/user-profile
git push -u origin feat/user-profile
git branch -d feat/user-profile
```

---

## 🔍 Giải thích command
- `git switch main && git pull origin main`: Luôn xuất phát từ mốc mới nhất và ổn định nhất của nhánh main trước khi bắt tay làm việc mới.
- `git switch -c feat/user-profile`: Tạo và chuyển ngay sang nhánh tính năng biệt lập để bảo vệ nhánh chính.
- `git push -u origin feat/user-profile`: Xuất bản nhánh lên GitHub và thiết lập tracking để chuẩn bị tạo Pull Request.
- `git branch -d feat/user-profile`: Dọn dẹp vệ sinh kho cục bộ sau khi tính năng đã được gộp thành công trên GitHub.

---

## ⚠️ Sai lầm phổ biến
1. **Tiện tay commit và đẩy code thẳng lên nhánh `main`**: Vi phạm kỷ luật dự án và dễ làm gãy hệ thống đang chạy của khách hàng.
2. **Tách nhánh mới từ một nhánh tính năng dở dang khác**: Làm lây lan các lỗi chưa qua kiểm duyệt sang tính năng mới.
3. **Giữ nhánh tính năng sống quá lâu mà không đồng bộ**: Dẫn đến thảm họa Merge Hell với xung đột khổng lồ không thể kiểm soát.

---

## 🧪 Lab
1. Đảm bảo bạn đang đứng ở nhánh chính và đồng bộ: `git switch main` rồi `git pull origin main`.
2. Tạo nhánh tính năng mới theo quy ước: `git switch -c feat/order-tracking`.
3. Tạo một commit giả lập: `git commit --allow-empty -m "feat: add order tracking service"`.
4. Đẩy nhánh lên GitHub: `git push -u origin feat/order-tracking`.
5. Mở PR trên GitHub, mô tả tính năng, mời đồng nghiệp vào review và hoàn tất gộp mã nguồn.

---

## 💡 Hint
> Hãy chia nhỏ bài toán thành các PR gọn gàng (dưới 300 dòng code). PR càng nhỏ thì đồng đội review càng nhanh, lỗi càng ít và tốc độ đưa sản phẩm ra thị trường càng vượt trội!

---

## ✅ Validation
- Thuộc nằm lòng chuỗi 7 bước của quy trình Feature Branch Workflow.
- Giải thích được nguyên nhân sâu xa của Merge Hell và biện pháp phòng ngừa triệt để.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để đánh giá sự thấu hiểu về chu trình Feature Branch Workflow tiêu chuẩn.

---

## 🔥 Challenge
Hãy so sánh Feature Branch Workflow với Trunk-Based Development. Trong những điều kiện nào thì các công ty công nghệ lớn như Google hay Meta lại khuyến khích chuyển từ Feature Branch Workflow sang Trunk-Based Development?

---

## 📚 Tổng kết
- Mọi thay đổi đều phải được thực hiện trên nhánh tính năng riêng biệt.
- Nhánh chính `main` luôn được bảo vệ nghiêm ngặt bằng quy tắc Branch Protection.
- Luôn cập nhật thường xuyên từ `main` để triệt tiêu hoàn toàn nguy cơ Merge Hell.
