# GitHub Actions là gì? Nền tảng tự động hóa của GitHub

---

## 🎯 Mục tiêu bài học
- Hiểu rõ GitHub Actions là gì và vị thế của nó trong hệ sinh thái GitHub.
- Nắm bắt các tính năng chính: tích hợp sâu với Git events, kho ứng dụng Actions Marketplace phong phú.
- Phân biệt mô hình SaaS tích hợp sẵn so với việc tự dựng và vận hành máy chủ Jenkins truyền thống.

---

## 📖 Định nghĩa
> GitHub Actions là một nền tảng tự động hóa quy trình làm việc (Workflow Automation) và dịch vụ CI/CD được tích hợp trực tiếp, nguyên bản vào GitHub. Nền tảng này cho phép các kỹ sư phần mềm tạo ra các kịch bản tự động hóa mạnh mẽ phản hồi lại bất kỳ sự kiện nào xảy ra trong kho lưu trữ, từ việc đẩy mã nguồn, mở Pull Request, phát hành phiên bản mới, cho đến khi có một bình luận hoặc Issue được tạo ra một cách liền mạch.

---

## 🤔 Tại sao cần?
Trước khi GitHub Actions ra đời, các nhóm phát triển phải thiết lập và duy trì các máy chủ CI riêng biệt như Jenkins, Travis CI hoặc CircleCI. Việc này đòi hỏi kỹ năng vận hành hạ tầng phức tạp, quản lý chứng chỉ xác thực, phân quyền token và cấu hình webhook liên lạc liên tục. GitHub Actions xóa bỏ hoàn toàn rào cản này bằng cách đưa toàn bộ kịch bản tự động hóa vào ngay bên trong thư mục dự án dưới dạng mã nguồn mở, không cần cài đặt thêm phần mềm máy chủ ngoài.

---

## 🧠 Mental Model & Mô hình tư duy
Hãy tưởng tượng GitHub như một tòa cao ốc văn phòng thông minh. GitHub Actions chính là hệ thống cảm biến và các trợ lý tự động hóa được cài sẵn khắp mọi ngóc ngách của tòa nhà. Mỗi khi có người quẹt thẻ vào cửa (sự kiện Git push), trợ lý thông minh lập tức kích hoạt chuỗi hành động: bật đèn chiếu sáng, kiểm tra nhiệt độ phòng và in danh sách công việc trong ngày mà không cần bạn phải gọi điện điều phối nhân công từ bên ngoài.

---

## 🖼️ Sơ đồ minh họa
```text
GitHub Repository Events ──► [GitHub Actions Engine] ──► [Virtual Runners]
       │                                │                         │
       ├─ Push / Pull Request           ├─ Phân tích YAML          ├─ Ubuntu VM
       ├─ Issue opened / Comment        ├─ Quản lý quyền Token     ├─ Windows VM
       └─ Release published             └─ Ghi log thời gian thực   └─ macOS VM
```

---

## 🌎 Ví dụ thực tế
Nhóm phát triển thư viện mã nguồn mở React UI nổi tiếng nhận được hàng chục Pull Request đóng góp mỗi ngày từ cộng đồng toàn cầu. Nhờ GitHub Actions, mỗi khi một lập trình viên lạ mặt gửi PR, hệ thống tự động khởi chạy máy ảo Ubuntu sạch, tải bản mã nguồn đề xuất, kiểm tra xem tác giả đã ký thỏa thuận bản quyền CLA hay chưa, chạy linter kiểm tra chuẩn mã hóa và render bản xem trước giao diện trên máy chủ thử nghiệm. Toàn bộ thông tin này hiển thị ngay trên giao diện trao đổi của PR mà bảo trì viên không cần rời khỏi GitHub.

---

## 💻 Command & Lệnh thao tác
```bash
gh workflow list
gh run list
gh auth status
```

---

## 🔍 Giải thích chi tiết lệnh
Các câu lệnh thông qua GitHub CLI (gh) cho phép kiểm tra trạng thái xác thực tài khoản với gh auth status, liệt kê danh sách toàn bộ các workflow tự động đã đăng ký với gh workflow list, và xem lịch sử các lần thực thi đường ống CI gần nhất với gh run list một cách trực quan.

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Nghĩ rằng GitHub Actions chỉ dùng để chạy CI/CD**:  Nó còn có thể tự động đóng Issue cũ, gắn nhãn PR, gửi thông báo Slack và tự động đồng bộ tài liệu.
2. **Sử dụng các Action của bên thứ ba từ Marketplace mà không kiểm tra độ tin cậy và nguồn gốc mã nguồn.**: 
3. **Để lộ token bảo mật trong kịch bản thay vì sử dụng cơ chế GitHub Secrets được mã hóa.**: 

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Kiểm tra xem kho lưu trữ hiện tại đã có cấu hình workflow nào chưa bằng lệnh gh workflow list.
2. Quan sát thư mục gốc của dự án để chuẩn bị tạo cấu hình tự động hóa đầu tiên.
3. Khám phá giao diện thẻ Actions trên trang web GitHub để làm quen với bảng điều khiển trực quan.

---

## 💡 Gợi ý thực hiện (Hint)
> GitHub Actions được cấu hình hoàn toàn bằng các tệp khai báo tĩnh định dạng YAML đặt trong thư mục đặc biệt.

---

## ✅ Kiểm tra kết quả (Validation)
Lệnh gh workflow list phản hồi thành công và kết nối thông suốt với tài khoản cá nhân.

---

## ❓ Câu hỏi ôn tập (Quiz)
Cùng củng cố kiến thức về nền tảng GitHub Actions qua các câu hỏi trắc nghiệm dưới đây.

---

## 🔥 Thử thách nâng cao (Challenge)
Tại sao việc lưu trữ kịch bản CI/CD dưới dạng tệp mã nguồn bên trong Git (Configuration as Code) lại vượt trội hơn cấu hình giao diện web thủ công?

---

## 📚 Tổng kết kiến thức
- GitHub Actions là nền tảng CI/CD và tự động hóa native tích hợp sẵn bên trong GitHub.
- Hỗ trợ phản hồi mọi sự kiện diễn ra trên kho lưu trữ chứ không chỉ riêng việc push mã nguồn.
- Cung cấp hệ sinh thái Actions Marketplace với hàng nghìn khối xây dựng sẵn từ cộng đồng.
