# Bảo mật thông tin nhạy cảm với Secrets và Secret Masking

---

## 🎯 Mục tiêu bài học
- Phân biệt rõ ràng giữa Configuration Variables (thông tin cấu hình mở) và Encrypted Secrets (thông tin bí mật nhạy cảm).
- Biết cách cấu hình và gọi Secrets trong tệp YAML qua ngữ cảnh ${{ secrets.SECRET_NAME }}.
- Hiểu sâu cơ chế che giấu bí mật (Secret Masking): tự động thay thế bằng *** trong log thực thi.

---

## 📖 Định nghĩa
> GitHub Secrets là các biến nhạy cảm được mã hóa (chẳng hạn như mật khẩu cơ sở dữ liệu, mã khóa API token, khóa riêng tư SSH) được tạo trong phần cài đặt của kho lưu trữ hoặc tổ chức. GitHub sử dụng mã hóa bất đối xứng libsodium để bảo vệ các bí mật này trước khi lưu vào cơ sở dữ liệu. Trong quá trình chạy workflow, hệ thống sẽ giải mã dữ liệu vào bộ nhớ của Runner và tự động áp dụng cơ chế Secret Masking (thay thế toàn bộ chuỗi ký tự bí mật thành ba dấu sao *** trong mọi dòng nhật ký hiển thị).

---

## 🤔 Tại sao cần?
Lộ khóa bí mật (Credential Leak) là một trong những thảm họa an ninh mạng phổ biến và tồi tệ nhất. Nếu một lập trình viên vô tình viết cứng mã khóa AWS Token vào tệp YAML và đẩy lên kho lưu trữ công khai, các bot quét tự động trên Internet sẽ chiếm quyền tài khoản chỉ trong vòng vài giây, gây thiệt hại hàng trăm triệu đồng. GitHub Secrets đảm bảo mã nguồn của bạn hoàn toàn sạch sẽ và an toàn tuyệt đối.

---

## 🧠 Mental Model & Mô hình tư duy
Hãy tưởng tượng chiếc két sắt bảo mật kiên cố của ngân hàng. Bạn đặt những thỏi vàng và mật mã két sắt vào bên trong (GitHub Secrets). Khi nhân viên giao dịch (Runner) cần thực hiện một lệnh thanh toán, họ được hệ thống cấp quyền sử dụng chìa khóa trong phòng kín không có cửa sổ. Mọi camera giám sát công cộng (hệ thống Logs) đều tự động làm mờ khuôn mặt và bàn tay bấm mật mã thành dải màu đen (***) để không ai đứng ngoài có thể nhìn trộm được.

---

## 🖼️ Sơ đồ minh họa
```text
Cơ chế che giấu bí mật (Secret Masking):
Repository Settings (Mã hóa Libsodium)
└── Secrets: [PROD_API_KEY = "super_secret_token_12345"]
      │
      ▼ Được tiêm vào Runner an toàn
Workflow YAML:
  env:
    API_TOKEN: ${{ secrets.PROD_API_KEY }}
  run: echo "Connecting with token $API_TOKEN"

Log hiển thị cho người dùng:
Connecting with token ***   <── Tự động thay thế chuỗi nhạy cảm bằng ***
```

---

## 🌎 Ví dụ thực tế
Một kỹ sư tích hợp chức năng gửi tin nhắn thông báo Telegram tự động mỗi khi có bản phát hành mới. Thay vì viết mã bot token trực tiếp vào mã nguồn, kỹ sư truy cập mục Settings -> Secrets and variables -> Actions trên GitHub và tạo một Secret mới có tên TELEGRAM_BOT_TOKEN. Trong tệp workflow, kỹ sư truyền biến qua môi trường: env: { BOT_TOKEN: ${{ secrets.TELEGRAM_BOT_TOKEN }} }. Dù trong câu lệnh curl có in biến ra màn hình, hệ thống kiểm duyệt log của GitHub Actions lập tức can thiệp và hiển thị dòng chữ: BOT_TOKEN=***. Mã khóa bí mật được giữ kín tuyệt đối.

---

## 💻 Command & Lệnh thao tác
```bash
echo "Deploying with token: ***"
gh secret set API_KEY
```

---

## 🔍 Giải thích chi tiết lệnh
Lệnh gh secret set cho phép lập trình viên lưu trữ an toàn một biến bí mật mới lên GitHub trực tiếp từ dòng lệnh mà giá trị không bao giờ bị lưu trong lịch sử shell.

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Cố tình giải mã hoặc in chuỗi bí mật dưới dạng băm Base64 để vượt mặt bộ lọc Masking của GitHub.**: 
2. **Sử dụng Secrets trong các Pull Request xuất phát từ các nhánh phân nhánh (forks) của cộng đồng bên ngoài mà không kiểm duyệt.**: 
3. **Đặt tên Secret trùng với các từ khóa quá ngắn hoặc thông dụng (ví dụ**:  "true" hoặc "123") khiến log hiển thị dấu sao *** ở khắp mọi nơi.

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Vào phần thiết lập mô phỏng và tạo một biến bí mật giả định `MOCK_API_KEY = "my_super_secret_xyz"`.
2. Đọc biến bí mật này vào Step thông qua cú pháp `${{ secrets.MOCK_API_KEY }}`.
3. In biến này ra log bằng lệnh echo và quan sát chuỗi ký tự hiển thị bị che thành `***`.

---

## 💡 Gợi ý thực hiện (Hint)
> Không bao giờ được đặt giá trị của Secret là các chuỗi quá phổ biến như "admin" hay "test" vì nó sẽ làm hỏng khả năng đọc log của hệ thống.

---

## ✅ Kiểm tra kết quả (Validation)
Toàn bộ giá trị nhạy cảm hiển thị trên log đều được chuyển thành dấu *** một cách an toàn.

---

## ❓ Câu hỏi ôn tập (Quiz)
Kiểm tra nhận thức về an toàn thông tin và quản lý Secrets qua các câu hỏi sau.

---

## 🔥 Thử thách nâng cao (Challenge)
Tại sao GitHub Actions mặc định không chia sẻ Secrets cho các sự kiện pull_request bắt nguồn từ các kho lưu trữ Fork của người lạ?

---

## 📚 Tổng kết kiến thức
- GitHub Secrets được mã hóa an toàn bằng thuật toán Libsodium trước khi lưu trữ.
- Truy cập biến bí mật thông qua ngữ cảnh `${{ secrets.TEN_BIEN }}`.
- Cơ chế Secret Masking tự động che giấu giá trị nhạy cảm thành `***` trong toàn bộ nhật ký thực thi.
