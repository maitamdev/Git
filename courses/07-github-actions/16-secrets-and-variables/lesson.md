# Bảo mật thông tin nhạy cảm với Secrets và Secret Masking

---

## 🎯 Mục tiêu
- Phân biệt rõ ràng giữa Configuration Variables (thông tin cấu hình mở) và Encrypted Secrets (thông tin bí mật nhạy cảm).
- Biết cách cấu hình và gọi Secrets trong tệp YAML qua ngữ cảnh `${{ secrets.SECRET_NAME }}`.
- Hiểu sâu cơ chế che giấu bí mật (Secret Masking): tự động thay thế bằng ba dấu sao trong log thực thi.
- Nắm vững các cấp độ phạm vi của secret: Repository, Environment, và Organization.

---

## 🧩 Từ khóa hôm nay

### Encrypted Secrets
- **Nói dễ hiểu**: Biến nhạy cảm (như API key, mật khẩu, private key) được GitHub mã hóa bằng thuật toán bất đối xứng libsodium trước khi lưu trữ.
- **Ví dụ**: Biến bí mật `PRODUCTION_DB_PASSWORD` được lưu trong Settings của kho lưu trữ.
- **Đừng nhầm**: Không phải biến môi trường dạng văn bản thô (Plaintext Variable); chỉ người có quyền admin mới thiết lập được và không ai đọc lại được giá trị gốc từ giao diện web.

### Secret Masking
- **Nói dễ hiểu**: Cơ chế tự động quét đầu ra terminal của Runner và thay thế toàn bộ ký tự trùng với giá trị bí mật thành ba dấu sao.
- **Ví dụ**: Khi lệnh `echo "Token is $MY_KEY"` chạy, màn hình log chỉ hiển thị `Token is ***`.
- **Đừng nhầm**: Không thay thế cho việc lập trình cẩn thận; nếu bạn chủ động mã hóa base64 hoặc cắt chuỗi bí mật, bộ lọc masking có thể không nhận diện được.

### Repository Variables
- **Nói dễ hiểu**: Biến cấu hình không mã hóa dùng để lưu các thông số không nhạy cảm nhưng cần linh hoạt giữa các workflow.
- **Ví dụ**: Lưu cổng kết nối `PORT: "8080"` hoặc URL môi trường staging `STAGING_URL`.
- **Đừng nhầm**: Không dùng để lưu trữ mật mã, mã token truy cập hoặc chứng chỉ bảo mật.

---

## 📖 Định nghĩa
GitHub Secrets là các biến nhạy cảm được mã hóa (chẳng hạn như mật khẩu cơ sở dữ liệu, mã khóa API token, khóa riêng tư SSH) được tạo trong phần cài đặt của kho lưu trữ hoặc tổ chức. GitHub sử dụng mã hóa bất đối xứng libsodium để bảo vệ các bí mật này trước khi lưu vào cơ sở dữ liệu. Trong quá trình chạy workflow, hệ thống sẽ giải mã dữ liệu vào bộ nhớ của Runner và tự động áp dụng cơ chế Secret Masking (thay thế toàn bộ chuỗi ký tự bí mật thành ba dấu sao trong mọi dòng nhật ký hiển thị).

---

## 💡 Tại sao cần
Lộ khóa bí mật (Credential Leak) là một trong những thảm họa an ninh mạng phổ biến và tồi tệ nhất. Nếu một lập trình viên vô tình viết cứng mã khóa AWS Token vào tệp YAML và đẩy lên kho lưu trữ công khai, các bot quét tự động trên Internet sẽ chiếm quyền tài khoản chỉ trong vòng vài giây, gây thiệt hại nghiêm trọng. GitHub Secrets đảm bảo mã nguồn của bạn hoàn toàn sạch sẽ và an toàn tuyệt đối.

---

## 🧠 Mental Model
Hãy tưởng tượng chiếc két sắt bảo mật kiên cố của ngân hàng. Bạn đặt những thỏi vàng và mật mã két sắt vào bên trong (GitHub Secrets). Khi nhân viên giao dịch (Runner) cần thực hiện một lệnh thanh toán, họ được hệ thống cấp quyền sử dụng chìa khóa trong phòng kín không có cửa sổ. Mọi camera giám sát công cộng (hệ thống Logs) đều tự động làm mờ khuôn mặt và bàn tay bấm mật mã thành dải màu đen để không ai đứng ngoài có thể nhìn trộm được.

---

## 📊 Sơ đồ minh họa
```text
Cơ chế bảo vệ và hiển thị của GitHub Secrets:
Repository Settings (Mã hóa an toàn với Libsodium)
└── Secrets: [PROD_API_KEY = "my_super_secret_token_12345"]
      │
      ▼ Runner nhận giá trị giải mã trong bộ nhớ
Workflow YAML:
  env:
    API_TOKEN: ${{ secrets.PROD_API_KEY }}
  run: echo "Connecting with token $API_TOKEN"

Log hiển thị trên giao diện GitHub:
Connecting with token ***   <── Bộ lọc Masking tự động che dấu
```

---

## 🏢 Ví dụ thực tế
Một kỹ sư tích hợp chức năng gửi tin nhắn thông báo Telegram tự động mỗi khi có bản phát hành mới. Thay vì viết mã bot token trực tiếp vào mã nguồn, kỹ sư truy cập mục **Settings -> Secrets and variables -> Actions** trên GitHub và tạo một Secret mới có tên `TELEGRAM_BOT_TOKEN`. Trong tệp workflow, kỹ sư truyền biến qua môi trường: `env: { BOT_TOKEN: ${{ secrets.TELEGRAM_BOT_TOKEN }} }`. Dù trong câu lệnh curl có in biến ra màn hình, hệ thống kiểm duyệt log của GitHub Actions lập tức can thiệp và hiển thị dòng chữ: `BOT_TOKEN=***`. Mã khóa bí mật được giữ kín tuyệt đối.

---

## 💻 Command & Cú pháp
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
      - uses: actions/checkout@v4
      - name: Deploy application to cloud
        env:
          SERVER_HOST: ${{ vars.DEPLOY_HOST }}
          DEPLOY_TOKEN: ${{ secrets.PROD_DEPLOY_KEY }}
        run: |
          echo "Connecting to target host: $SERVER_HOST"
          echo "Authenticating with credentials: $DEPLOY_TOKEN"
```

---

## 🔍 Giải thích command
- `SERVER_HOST: ${{ vars.DEPLOY_HOST }}`: Lấy giá trị biến cấu hình không nhạy cảm từ ngữ cảnh `vars`. Giá trị này hiển thị rõ ràng trong log.
- `DEPLOY_TOKEN: ${{ secrets.PROD_DEPLOY_KEY }}`: Đọc giá trị bảo mật từ ngữ cảnh `secrets` và truyền vào biến môi trường của Step.
- Khi lệnh `echo "Authenticating with credentials: $DEPLOY_TOKEN"` chạy, GitHub runner tự động nhận diện giá trị khớp với secret và in ra `***`.

---

## ⚠️ Sai lầm phổ biến
1. **Viết cứng secret vào file mã nguồn**: Dù repo là private, lịch sử git vẫn lưu giữ commit đó mãi mãi nếu không dùng công cụ dọn dẹp lịch sử git.
2. **Cố tình mã hóa base64 để in ra log**: Một số kỹ sư mã hóa secret thành base64 nhằm debug, điều này làm vô hiệu hóa bộ lọc masking tự động và làm lộ thông tin nhạy cảm.
3. **Đặt tên secret quá ngắn hoặc trùng với từ thông dụng**: Nếu đặt secret có giá trị là từ "true" hoặc "test", toàn bộ log hệ thống chứa từ này sẽ bị che thành ba dấu sao.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.

1. **Bước 1**: Truy cập repository trên GitHub, chọn **Settings** -> **Secrets and variables** -> **Actions**.
2. **Bước 2**: Tại tab **Variables**, bấm **New repository variable** và thêm biến `APP_ENV` với giá trị `production`.
3. **Bước 3**: Tại tab **Secrets**, bấm **New repository secret** và thêm secret `MOCK_API_KEY` với một giá trị ngẫu nhiên bí mật.
4. **Bước 4**: Tạo file workflow gọi cả hai biến trên, chạy workflow và kiểm tra tab log để xác nhận `MOCK_API_KEY` được che chắn thành ba dấu sao.

---

## 💡 Hint & mẹo
> Để quản lý secrets hiệu quả từ terminal mà không cần mở trình duyệt, bạn có thể cài đặt GitHub CLI (`gh`) và chạy lệnh `gh secret set MY_SECRET` cực kỳ nhanh chóng và an toàn.

---

## ✅ Validation & Kết quả mong đợi
- Giá trị của biến `APP_ENV` hiển thị rõ ràng văn bản `production` trong log.
- Giá trị của secret `MOCK_API_KEY` được tự động chuyển đổi thành ký hiệu che giấu `***` trên toàn bộ dòng log.

---

## ❓ Quiz nhanh
Kiểm tra nhận thức về an toàn thông tin và quản lý Secrets qua các câu hỏi trong phần trắc nghiệm bên dưới.

---

## 🚀 Thử thách nâng cao
Tại sao GitHub Actions mặc định không chia sẻ Secrets cho các sự kiện `pull_request` bắt nguồn từ các kho lưu trữ Fork của người bên ngoài? Cơ chế `pull_request_target` giải quyết bài toán này như thế nào kèm theo rủi ro bảo mật nào?

---

## 📝 Tổng kết
- GitHub Secrets được mã hóa an toàn bằng thuật toán Libsodium trước khi lưu trữ.
- Biến cấu hình mở dùng ngữ cảnh `vars`, còn thông tin nhạy cảm dùng ngữ cảnh `secrets`.
- Cơ chế Secret Masking tự động che giấu giá trị nhạy cảm thành ba dấu sao trong toàn bộ nhật ký thực thi.
- Không bao giờ in hoặc debug secret bằng cách biến đổi chuỗi vì sẽ bypass bộ lọc masking an toàn.
