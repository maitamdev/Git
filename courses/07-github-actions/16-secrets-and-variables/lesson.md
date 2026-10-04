# Bảo mật thông tin nhạy cảm với Secrets và Secret Masking

---

## 🎯 Mục tiêu
- Phân biệt rõ ràng giữa Configuration Variables (thông tin cấu hình mở) và Encrypted Secrets (thông tin bí mật nhạy cảm).
- Biết cách cấu hình và gọi Secrets trong tệp YAML qua ngữ cảnh `${{ secrets.SECRET_NAME }}`.
- Hiểu Secret Masking là lớp bảo vệ bổ sung, không phải bảo đảm rằng secret không thể lọt vào log.
- Nắm vững các cấp độ phạm vi của secret: Repository, Environment, và Organization.

---

## 🧩 Từ khóa hôm nay

### Encrypted Secrets
- **Nói dễ hiểu**: Biến nhạy cảm (như API key, mật khẩu, private key) được GitHub mã hóa bằng thuật toán bất đối xứng libsodium trước khi lưu trữ.
- **Ví dụ**: Biến bí mật `PRODUCTION_DB_PASSWORD` được lưu trong Settings của kho lưu trữ.
- **Đừng nhầm**: Không phải biến môi trường dạng văn bản thô (Plaintext Variable); chỉ người có quyền admin mới thiết lập được và không ai đọc lại được giá trị gốc từ giao diện web.

### Secret Masking
- **Nói dễ hiểu**: GitHub cố gắng che giá trị secret đã nhận diện trong log, thường bằng `***`.
- **Ví dụ**: Nếu secret nguyên dạng được in ra, log có thể hiện `Token is ***`; cách an toàn là không in secret.
- **Đừng nhầm**: Không thay thế cho việc lập trình cẩn thận; nếu bạn chủ động mã hóa base64 hoặc cắt chuỗi bí mật, bộ lọc masking có thể không nhận diện được.

### Repository Variables
- **Nói dễ hiểu**: Biến cấu hình không mã hóa dùng để lưu các thông số không nhạy cảm nhưng cần linh hoạt giữa các workflow.
- **Ví dụ**: Lưu cổng kết nối `PORT: "8080"` hoặc URL môi trường staging `STAGING_URL`.
- **Đừng nhầm**: Không dùng để lưu trữ mật mã, mã token truy cập hoặc chứng chỉ bảo mật.

---

## 📖 Định nghĩa
GitHub Secrets là giá trị nhạy cảm được quản lý ở cấp repository, environment hoặc organization. GitHub mã hóa secret khi lưu; workflow chỉ nhận secret khi sự kiện, quyền và phạm vi cho phép. Secret Masking cố gắng che các giá trị nhận diện được trong log, nhưng giá trị đã biến đổi hoặc ngữ cảnh đặc biệt có thể không được che. Vì vậy, không đưa secret vào log, mã nguồn, tham số lệnh hoặc đầu ra không tin cậy.

---

## 🤔 Tại sao cần?
Lộ khóa bí mật có thể cho phép truy cập trái phép. Lưu giá trị trong Secrets thay vì commit vào YAML giúp tách dữ liệu nhạy cảm khỏi source, nhưng không tự bảo vệ khỏi workflow độc hại, quyền quá rộng hoặc log. Cấp tối thiểu quyền cần thiết và xoay vòng secret nếu bị lộ.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy tưởng tượng chiếc két sắt bảo mật kiên cố của ngân hàng. Bạn đặt những thỏi vàng và mật mã két sắt vào bên trong (GitHub Secrets). Khi nhân viên giao dịch (Runner) cần thực hiện một lệnh thanh toán, họ được hệ thống cấp quyền sử dụng chìa khóa trong phòng kín không có cửa sổ. Mọi camera giám sát công cộng (hệ thống Logs) đều tự động làm mờ khuôn mặt và bàn tay bấm mật mã thành dải màu đen để không ai đứng ngoài có thể nhìn trộm được.

---

## 🖼 Sơ đồ
```text
Cơ chế bảo vệ và hiển thị của GitHub Secrets:
Repository Settings (Mã hóa an toàn với Libsodium)
└── Secrets: [PROD_API_KEY = "my_super_secret_token_12345"]
      │
      ▼ Runner nhận giá trị giải mã trong bộ nhớ
Workflow YAML:
  env:
    API_TOKEN: ${{ secrets.PROD_API_KEY }}
  run: ./deploy.sh  # script dùng token nhưng không in giá trị ra log

Log hiển thị trên giao diện GitHub:
Deploy step completed   <── không in token
```

---

## 🌎 Ví dụ thực tế
Ví dụ: một kỹ sư lưu bot token trong Actions Secrets rồi truyền nó vào biến môi trường của đúng Step gửi thông báo. Lệnh gửi dùng token để xác thực nhưng không in token, URL có chứa token hay phản hồi nhạy cảm vào log. Nếu nghi ngờ lộ, kỹ sư thu hồi và tạo lại token.

---

## 💻 Command
```yaml
# Ví dụ workflow sử dụng Secret và Variable an toàn
name: Secure Deployment Pipeline
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - name: Deploy application to cloud
        env:
          SERVER_HOST: ${{ vars.DEPLOY_HOST }}
          DEPLOY_TOKEN: ${{ secrets.PROD_DEPLOY_KEY }}
        run: |
          echo "Connecting to target host: $SERVER_HOST"
          ./deploy.sh  # script đọc DEPLOY_TOKEN; không echo hoặc ghi token ra tệp log
```

---

## 🔍 Giải thích command
- `SERVER_HOST: ${{ vars.DEPLOY_HOST }}`: Lấy giá trị biến cấu hình không nhạy cảm từ ngữ cảnh `vars`. Giá trị này hiển thị rõ ràng trong log.
- `DEPLOY_TOKEN: ${{ secrets.PROD_DEPLOY_KEY }}`: Đọc giá trị bảo mật từ ngữ cảnh `secrets` và truyền vào biến môi trường của Step.
- Truyền secret qua `env` để script đọc; không in giá trị ra log để trông chờ việc masking.

---

## ⚠️ Sai lầm phổ biến
1. **Viết cứng secret vào file mã nguồn**: Dù repo là private, lịch sử git vẫn lưu giữ commit đó mãi mãi nếu không dùng công cụ dọn dẹp lịch sử git.
2. **Biến đổi secret để in ra log**: Base64, cắt chuỗi hoặc ghép chuỗi có thể vượt qua nhận diện masking và làm lộ thông tin nhạy cảm.
3. **Đặt tên secret quá ngắn hoặc trùng với từ thông dụng**: Nếu đặt secret có giá trị là từ "true" hoặc "test", toàn bộ log hệ thống chứa từ này sẽ bị che thành ba dấu sao.

---

## 🧪 Lab
Hãy mở terminal và cùng tôi thực hành từng bước dưới đây để làm chủ kỹ năng:

1. **Bước 1**: Truy cập repository trên GitHub, chọn **Settings** -> **Secrets and variables** -> **Actions**.
2. **Bước 2**: Tại tab **Variables**, bấm **New repository variable** và thêm biến `APP_ENV` với giá trị `production`.
3. **Bước 3**: Tại tab **Secrets**, bấm **New repository secret** và thêm secret `MOCK_API_KEY` với một giá trị ngẫu nhiên bí mật.
4. **Bước 4**: Tạo Step kiểm tra secret có tồn tại mà không in giá trị, ví dụ `if [ -n "$MOCK_API_KEY" ]; then echo "Secret is available"; fi`. Không thử `echo` secret ra log.

---

## 💡 Hint
> Để quản lý secrets hiệu quả từ terminal mà không cần mở trình duyệt, bạn có thể cài đặt GitHub CLI (`gh`) và chạy lệnh `gh secret set MY_SECRET` cực kỳ nhanh chóng và an toàn.

---

## ✅ Validation
- Giá trị của biến `APP_ENV` hiển thị rõ ràng văn bản `production` trong log.
- Log xác nhận secret được cấp cho Step mà không hiển thị giá trị; không dựa vào masking để bảo vệ secret.

---

## ❓ Quiz
Kiểm tra nhận thức về an toàn thông tin và quản lý Secrets qua các câu hỏi trong phần trắc nghiệm bên dưới.

---

## 🔥 Challenge
Tại sao GitHub Actions mặc định không chia sẻ Secrets cho các sự kiện `pull_request` bắt nguồn từ các kho lưu trữ Fork của người bên ngoài? Cơ chế `pull_request_target` giải quyết bài toán này như thế nào kèm theo rủi ro bảo mật nào?

---

## 📚 Tổng kết
- GitHub Secrets được mã hóa an toàn bằng thuật toán Libsodium trước khi lưu trữ.
- Biến cấu hình mở dùng ngữ cảnh `vars`, còn thông tin nhạy cảm dùng ngữ cảnh `secrets`.
- Secret Masking là biện pháp bổ sung; không bảo đảm che mọi cách biểu diễn secret.
- Không in secret hoặc biến đổi secret để đưa vào log; thu hồi và tạo lại secret nếu có khả năng bị lộ.
