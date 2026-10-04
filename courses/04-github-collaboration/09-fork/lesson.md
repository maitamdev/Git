# Cơ chế Fork trên GitHub

---

## 🎯 Mục tiêu
- Thấu suốt bản chất cơ chế Fork trên máy chủ GitHub như một bản sao máy chủ độc lập (server-side clone).
- Phân biệt rạch ròi giữa thao tác Fork (trên giao diện web máy chủ) và thao tác Clone (tải về máy tính cá nhân).
- Nắm vững quy trình đóng góp mã nguồn mở kinh điển thông qua mô hình kết hợp Fork và Pull Request.
- Nhận biết quyền hạn và các thiết lập bảo mật khi làm việc trên kho fork cá nhân.

---

## 🧩 Từ khóa hôm nay

### fork — tạo bản sao trên máy chủ
- **Nói dễ hiểu:** Thao tác sao chép toàn bộ một kho lưu trữ của người khác sang tài khoản GitHub của chính bạn chỉ bằng một cú nhấp chuột.
- **Ví dụ:** Bạn bấm nút "Fork" trên kho `facebook/react` để sở hữu một bản sao cá nhân mang tên `tai-khoan-cua-ban/react`.
- **Đừng nhầm:** Thao tác này không cấp quyền ghi vào kho gốc; bạn chỉ có toàn quyền quản lý trên bản sao nằm dưới tài khoản của mình.

### server-side clone — nhân bản phía máy chủ
- **Nói dễ hiểu:** Quá trình sao chép kho diễn ra hoàn toàn giữa các máy chủ đám mây của GitHub mà không tải bất kỳ tệp nào về máy tính bạn.
- **Ví dụ:** GitHub hoàn tất việc fork một dự án khổng lồ chỉ trong 3 giây nhờ cơ chế nhân bản nội bộ trên hạ tầng máy chủ của họ.
- **Đừng nhầm:** Khác với `git clone` vốn truyền toàn bộ mã nguồn qua mạng Internet về ổ cứng máy tính cá nhân của bạn.

### open source contribution — đóng góp mã nguồn mở
- **Nói dễ hiểu:** Quy trình tham gia cống hiến nâng cấp các dự án cộng đồng bằng cách fork mã nguồn, sửa lỗi và gửi đề xuất tích hợp.
- **Ví dụ:** Bạn phát hiện lỗi trong thư viện UI phổ biến, fork về sửa lại rồi gửi Pull Request mời đội ngũ tác giả thẩm định gộp mã.
- **Đừng nhầm:** Bạn không cần phải có mối quan hệ quen biết hay quyền cộng tác viên chính thức để bắt đầu tham gia đóng góp.

---

## 📖 Định nghĩa
Fork là cơ chế nhân bản một kho lưu trữ Git từ tài khoản của người khác sang tài khoản cá nhân của bạn ngay trên máy chủ của nền tảng như GitHub, trao cho bạn quyền quản lý và chỉnh sửa toàn diện trên bản sao của mình mà không làm ảnh hưởng đến mã nguồn của dự án gốc.

---

## 🤔 Tại sao cần?
Trong thế giới mã nguồn mở rộng lớn, ban quản trị dự án không thể cấp quyền ghi trực tiếp cho hàng triệu lập trình viên vì rủi ro an ninh và chất lượng. Cơ chế Fork mở ra cánh cổng dân chủ cho bất kỳ ai: bạn tự do tải bản sao về nghiên cứu, khắc phục sự cố, thử nghiệm tính năng mới rồi gửi lại đóng góp cho cộng đồng thông qua Pull Request.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung công thức phở gia truyền niêm yết trong tủ kính của một nhà hàng danh tiếng. Bạn không thể tự ý cầm bút viết đè vào công thức đó. Nhà hàng cho phép bạn chụp lại toàn bộ công thức đem về gian bếp nhà mình (Fork). Tại bếp riêng, bạn tự do nêm nếm thử nghiệm và nếu tìm ra hương vị tuyệt hảo, bạn có thể gửi thư mời bếp trưởng nếm thử.

---

## 🖼 Sơ đồ
```text
CHU TRÌNH ĐÓNG GÓP QUA CƠ CHẾ FORK TRÊN GITHUB:

[Kho gốc của tác giả: upstream] (facebook/react)
             │
             ▼ (Thao tác Fork trên giao diện web GitHub)
[Kho fork cá nhân: origin] (tai-khoan-ban/react)
             │
             ▼ (git clone về ổ cứng máy tính)
[Máy tính cá nhân: Local] ──► (Lập trình, commit & push lên fork cá nhân)
```

---

## 🌎 Ví dụ thực tế
Lập trình viên Bình phát hiện một lỗi logic trong thư viện phân tích cú pháp JSON phổ biến trên GitHub. Do không phải nhân sự nòng cốt của dự án, Bình nhấp nút "Fork" để tạo bản sao `github.com/binh-dev/json-parser`. Sau đó Bình clone bản sao cá nhân này về máy tính, sửa lỗi và đẩy lên fork của mình trước khi mở đề xuất tích hợp gửi về cho nhóm tác giả ban đầu.

---

## 💻 Command
```bash
git clone https://github.com/tai-khoan-ban/du-an-fork.git
git remote -v
git remote add upstream https://github.com/tac-gia/du-an-goc.git
```

---

## 🔍 Giải thích command
- `git clone <url-kho-fork>`: Tải mã nguồn từ kho fork thuộc tài khoản cá nhân của bạn về máy tính để lập trình.
- `git remote -v`: Kiểm tra danh sách remote, bảo đảm `origin` đang trỏ đúng về kho fork cá nhân trên GitHub.
- `git remote add upstream <url-kho-goc>`: Thiết lập thêm liên kết tới kho gốc của tác giả để nhận các cập nhật mới về sau.

---

## ⚠️ Sai lầm phổ biến
1. **Lầm tưởng Fork là một câu lệnh trong Git CLI**: Fork là tính năng độc quyền do các nền tảng máy chủ như GitHub hay GitLab cung cấp trên giao diện web.
2. **Clone trực tiếp kho gốc của người khác rồi cố tình gõ `git push`**: Máy chủ sẽ chặn đứng thao tác và báo lỗi từ chối quyền truy cập (Permission denied).
3. **Bỏ quên kho fork cá nhân không đồng bộ trong thời gian dài**: Khiến mã nguồn của bạn bị phân kỳ quá xa so với dự án chính, gây xung đột nặng nề khi tạo PR.

---

## 🧪 Lab
1. Đăng nhập vào tài khoản GitHub cá nhân và tìm một dự án mã nguồn mở công khai (ví dụ kho tài liệu cộng đồng).
2. Nhấp vào nút "Fork" ở góc trên bên phải màn hình để tạo bản sao dưới tài khoản của bạn.
3. Sao chép đường dẫn URL của kho fork và mở terminal máy tính chạy lệnh: `git clone <url-kho-fork-cua-ban>`.
4. Di chuyển vào thư mục dự án và kiểm tra bằng lệnh: `git remote -v`.

---

## 💡 Hint
> Hãy luôn ghi nhớ quy trình 5 bước chuẩn mực quốc tế khi đóng góp mã nguồn mở: 1. Fork trên web -> 2. Clone về máy -> 3. Tạo nhánh và commit -> 4. Push lên fork cá nhân -> 5. Tạo Pull Request gửi về kho gốc!

---

## ✅ Validation
- Nhận thức chuẩn xác rằng Fork diễn ra ở phía máy chủ đám mây GitHub.
- Nắm vững lý do tại sao các dự án mã nguồn mở toàn cầu bắt buộc phải vận hành thông qua cơ chế Fork.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để đánh giá độ thành thạo của bạn về quy trình và bản chất của thao tác Fork trên GitHub.

---

## 🔥 Challenge
Hãy tìm hiểu mối quan hệ liên kết ngầm (Fork Network) trên GitHub. Khi một kho gốc bị tác giả xóa bỏ hoặc chuyển đổi từ công khai (Public) sang riêng tư (Private), số phận của các kho fork cá nhân của các lập trình viên khác sẽ bị ảnh hưởng như thế nào?

---

## 📚 Tổng kết
- Fork tạo một bản sao độc lập của kho gốc ngay trên máy chủ đám mây của bạn.
- Trao quyền chỉnh sửa hoàn toàn trên kho cá nhân mà không gây ảnh hưởng đến dự án gốc.
- Là nền tảng mở đầu không thể thiếu của mọi hoạt động đóng góp mã nguồn mở.
