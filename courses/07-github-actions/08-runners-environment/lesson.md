# Môi trường thực thi Runners: GitHub-hosted vs Self-hosted

---

## 🎯 Mục tiêu bài học
- Phân biệt rõ ràng giữa hai mô hình: GitHub-hosted Runners và Self-hosted Runners.
- Nắm được các ưu điểm và hạn chế về tài nguyên, chi phí, tốc độ và tính bảo mật của từng loại.
- Hiểu rõ các rủi ro bảo mật nghiêm trọng khi sử dụng Self-hosted Runners trên các kho lưu trữ công khai.

---

## 📖 Định nghĩa
> Runner là ứng dụng dịch vụ chạy trên một máy chủ thực thi các Job trong workflow của bạn. GitHub cung cấp hai loại Runner chính: GitHub-hosted Runners (máy ảo sạch được GitHub tự động cấp phát, quản lý, cài đặt sẵn phần mềm và hủy ngay sau mỗi phiên chạy) và Self-hosted Runners (máy chủ vật lý, máy ảo hoặc container do chính bạn hoặc tổ chức của bạn tự cài đặt, vận hành và quản lý ứng dụng Runner) với sự kiểm soát hạ tầng và môi trường mạng một cách toàn diện.

---

## 🤔 Tại sao cần?
Lựa chọn đúng loại Runner là bài toán chiến lược về chi phí và hiệu năng. GitHub-hosted tiện lợi tuyệt đối, không tốn công bảo trì nhưng bị giới hạn về cấu hình phần cứng và có chi phí theo phút. Self-hosted Runners cho phép tận dụng phần cứng chuyên biệt cực mạnh (ví dụ: máy chủ có card đồ họa GPU để huấn luyện AI, dung lượng RAM hàng trăm GB) và truy cập trực tiếp vào mạng nội bộ của doanh nghiệp mà không cần mở cổng Internet.

---

## 🧠 Mental Model & Mô hình tư duy
Hãy so sánh việc thuê xe taxi công nghệ (GitHub-hosted) với việc sở hữu một chiếc xe tải riêng (Self-hosted). Với taxi, bạn chỉ cần mở ứng dụng bấm gọi xe khi cần di chuyển; xe luôn sạch sẽ, bảo dưỡng sẵn, đi xong bạn xuống xe và không cần bận tâm về việc rửa xe hay thay dầu. Còn xe tải riêng đòi hỏi bạn phải tự bỏ tiền mua xe, tự đổ xăng và sửa chữa, nhưng bạn có thể độ thùng xe siêu trường siêu trọng để chở hàng hóa quá khổ mà không một hãng taxi nào đáp ứng được.

---

## 🖼️ Sơ đồ minh họa
```text
So sánh mô hình Runner:
┌───────────────────────────────────┬───────────────────────────────────┐
│ GitHub-hosted Runner              │ Self-hosted Runner                │
├───────────────────────────────────┼───────────────────────────────────┤
│ • Quản lý bởi: GitHub             │ • Quản lý bởi: Chính bạn / Công ty │
│ • Máy ảo sạch: Tạo mới & Xóa ngay │ • Máy tồn tại liên tục (Stateful) │
│ • Hạn ngạch: Tính theo phút dùng   │ • Chi phí: Trả tiền máy chủ riêng │
│ • Bảo mật: Cách ly hoàn hảo       │ • Cảnh báo: Rủi ro mã độc trên PR │
│ • runs-on: ubuntu-latest          │ • runs-on: [self-hosted, linux]   │
└───────────────────────────────────┴───────────────────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Một công ty khởi nghiệp phát triển mô hình trí tuệ nhân tạo nhận thấy các GitHub-hosted Runners thông thường chỉ có 2 đến 4 CPU ảo, khiến quá trình kiểm thử mô hình học sâu mất hơn hai tiếng đồng hồ. Nhóm quyết định lắp đặt một máy chủ Self-hosted có 64 nhân CPU và 2 card GPU NVIDIA đặt tại văn phòng, sau đó cài đặt ứng dụng GitHub Actions Runner. Kể từ đó, thời gian kiểm thử mô hình giảm xuống chỉ còn 6 phút. Tuy nhiên, họ chỉ cho phép chạy Self-hosted Runner trên kho lưu trữ nội bộ (Private Repo) để ngăn chặn kẻ xấu lợi dụng máy chủ đào tiền ảo.

---

## 💻 Command & Lệnh thao tác
```bash
uname -a
cat /etc/os-release
free -m
```

---

## 🔍 Giải thích chi tiết lệnh
Các lệnh trên cho phép kiểm tra thông số kiến trúc hạt nhân Linux với uname -a, phiên bản hệ điều hành với cat /etc/os-release và dung lượng bộ nhớ RAM khả dụng với free -m ngay bên trong môi trường Runner nhằm kiểm tra tài nguyên hệ thống thực tế.

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Gắn Self-hosted Runner vào một kho lưu trữ công khai (Public Repo)**:  Kẻ xấu có thể mở Pull Request chứa mã độc để chiếm quyền điều khiển máy chủ của bạn.
2. **Không dọn dẹp các tệp tin tạm thời trên Self-hosted Runner khiến ổ cứng bị đầy sau một thời gian hoạt động.**: 
3. **Kỳ vọng GitHub-hosted Runner lưu lại tệp tin đã tải về giữa hai lần kích hoạt workflow khác nhau.**: 

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Thêm một bước in ra thông tin cấu hình máy chủ của Runner bằng lệnh `uname -a`.
2. Kiểm tra dung lượng bộ nhớ RAM và ổ đĩa có sẵn trên Runner của GitHub.
3. Tìm hiểu mục cấu hình Runners trong phần Settings của kho lưu trữ trên GitHub.

---

## 💡 Gợi ý thực hiện (Hint)
> Mặc định trên GitHub-hosted Linux, bạn có quyền thực thi lệnh với quyền quản trị viên `sudo` mà không cần nhập mật khẩu.

---

## ✅ Kiểm tra kết quả (Validation)
Log hiển thị chính xác thông số môi trường Linux Ubuntu được cấp phát tự động.

---

## ❓ Câu hỏi ôn tập (Quiz)
Hãy kiểm tra kiến thức về sự khác biệt giữa hai mô hình Runner qua các câu hỏi sau.

---

## 🔥 Thử thách nâng cao (Challenge)
Tại sao GitHub đưa ra cảnh báo cực kỳ nghiêm trọng về việc không bao giờ được sử dụng Self-hosted Runner cho các kho lưu trữ mã nguồn mở công khai?

---

## 📚 Tổng kết kiến thức
- GitHub-hosted Runners là máy ảo do GitHub quản lý, đảm bảo môi trường sạch sẽ và cách ly tuyệt đối.
- Self-hosted Runners do bạn tự vận hành, phù hợp cho phần cứng chuyên biệt (GPU) và truy cập mạng nội bộ.
- Tuyệt đối không dùng Self-hosted Runners trên Public Repositories để phòng tránh rủi ro thực thi mã độc.
