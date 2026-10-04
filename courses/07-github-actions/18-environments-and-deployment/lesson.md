# Môi trường triển khai (Environments) & Cổng phê duyệt Protection Rules

---

## 🎯 Mục tiêu
- Nắm vững khái niệm Deployment Environments trong GitHub (Production, Staging, Development).
- Cấu hình cổng phê duyệt của con người (Required Reviewers) trước khi Job triển khai được phép chạy.
- Sử dụng các biến và bí mật riêng biệt theo từng môi trường cụ thể.
- Nắm rõ cách cấu hình URL xem trực tiếp triển khai trên giao diện kho lưu trữ.

---

## 🧩 Từ khóa hôm nay

### Deployment Environments
- **Nói dễ hiểu**: Đối tượng quản trị trên GitHub đại diện cho hạ tầng máy chủ thực tế (Production, Staging, QA) kèm theo các chính sách bảo vệ riêng.
- **Ví dụ**: Môi trường `production` yêu cầu một người trong danh sách reviewer phê duyệt Job; người duyệt và quyền bypass tùy cài đặt.
- **Đừng nhầm**: Không phải biến môi trường dạng chuỗi (`NODE_ENV=production`); đây là thực thể quản lý quyền và secret trên GitHub.

### Required Reviewers
- **Nói dễ hiểu**: Quy tắc bảo vệ yêu cầu ít nhất một người được chỉ định phê duyệt trước khi Job được gửi tới runner.
- **Ví dụ**: Lead DevOps nhận thông báo và bấm nút "Approve and deploy" trên web thì Job deploy mới bắt đầu chạy.
- **Đừng nhầm**: Không phải là Pull Request code review; đây là bước phê duyệt thực thi pipeline ngay trong lúc workflow đang chạy.

### Deployment Branches
- **Nói dễ hiểu**: Quy tắc giới hạn chỉ cho phép những nhánh hoặc thẻ tag cụ thể được kích hoạt triển khai lên môi trường.
- **Ví dụ**: Chỉ các commit nằm trên nhánh `main` mới được phép deploy lên môi trường `production`.
- **Đừng nhầm**: Không thay thế branch protection; đây là bộ lọc bổ sung dành riêng cho ngữ cảnh triển khai môi trường.

---

## 📖 Định nghĩa
Deployment Environments mô tả mục tiêu triển khai như `production`, `staging` hoặc `development`. Mỗi môi trường có thể đặt quy tắc duyệt, thời gian chờ hoặc giới hạn nhánh/tag; tính năng cụ thể còn tùy loại repo và gói GitHub. Secrets/variables của môi trường chỉ cấp cho Job tham chiếu môi trường; secret chỉ được cấp sau khi các rule đạt.

---

## 🤔 Tại sao cần?
Deploy lên production có thể ảnh hưởng dữ liệu và người dùng. Environment rules tạo điểm kiểm tra trước khi Job chạy; việc phê duyệt không thay thế quyền tối thiểu, review mã, backup, giám sát hay rollback. Job dùng self-hosted runner vẫn chạy trong hạ tầng do tổ chức quản lý, không được môi trường biến thành sandbox.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung một lô hàng đã qua kiểm tra chất lượng nhưng cần nhân viên được phân quyền xác nhận trước khi xuất kho. Environment rule là bước xác nhận; ai duyệt và có cho phép bỏ qua hay không phụ thuộc vào thiết lập của tổ chức.

---

## 🖼 Sơ đồ
```text
Quy trình dừng chờ phê duyệt môi trường (Environment Gate):
[Job: Build & Test] ──► [Thành công]
                           │
                           ▼
[Job: Deploy Production] (environment: production)
                           │
                           ▼
        ┌──────────────────────────────────────┐
        │ TRẠNG THÁI: WAITING APPROVAL         │
        │ Job chờ người được chỉ định duyệt    │
        └──────────────────┬───────────────────┘
                           │
               ┌───────────┴───────────┐
               ▼                       ▼
        [Bấm APPROVE]           [Bấm REJECT]
               │                       │
               ▼                       ▼
     [Thực thi Deploy]         [Hủy bỏ phiên chạy]
```

---

## 🌎 Ví dụ thực tế
Trong môi trường phát triển dự án thực tế: repo đã cấu hình môi trường `production`, branch/tag policy và reviewer. Job tham chiếu môi trường chờ tới khi các protection rule đạt; khi được duyệt, runner mới được cấp cho Job và secrets của môi trường mới khả dụng. Người duyệt vẫn cần kiểm tra thay đổi và mục tiêu deploy.

---

## 💻 Command
```yaml
# Cấu hình Job gắn với Environment và URL triển khai
name: Production Release Pipeline
on:
  push:
    tags:
      - 'v*.*.*'

jobs:
  deploy-production:
    name: Deploy to Production
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://app.example.com
    steps:
      - uses: actions/checkout@v7
      - name: Deploy application
        env:
          PROD_API_KEY: ${{ secrets.PROD_API_KEY }}
        run: |
          echo "Triển khai an toàn lên cụm máy chủ production"
          ./deploy.sh  # script dùng khóa; không in secret ra log
```

---

## 🔍 Giải thích command
- `environment.name: production`: Khai báo liên kết Job với môi trường `production`, kích hoạt các chính sách kiểm duyệt thủ công đã cấu hình trong Settings.
- `environment.url: https://app.example.com`: Cung cấp liên kết ứng dụng trực tiếp trên giao diện Deployments sau khi Job chạy thành công.
- `secrets.PROD_API_KEY`: Đọc secret môi trường sau khi Job tham chiếu `production` vượt qua protection rules; bản thân secret không thay thế việc kiểm tra code/deploy script.

---

## ⚠️ Sai lầm phổ biến
1. **Không cấu hình Environment Protection Rules**: Bất kỳ ai có quyền commit lên nhánh cũng có thể kích hoạt triển khai lên production mà không qua bước kiểm duyệt.
2. **Dùng chung một bộ API key cho mọi môi trường**: Gây nguy cơ code thử nghiệm ở staging xóa nhầm dữ liệu thật trên production.
3. **Không giới hạn Deployment Branches**: Khiến cho việc đẩy commit lên các nhánh thử nghiệm cá nhân cũng vô tình kích hoạt job deploy lên môi trường production.

---

## 🧪 Lab
Hãy mở terminal và cùng tôi thực hành từng bước dưới đây để làm chủ kỹ năng:

1. **Bước 1**: Trên GitHub, vào mục **Settings** -> **Environments**, bấm **New environment** và tạo môi trường tên `production`.
2. **Bước 2**: Trong môi trường `production`, bật tính năng **Required reviewers** và thêm tài khoản của bạn vào danh sách kiểm duyệt.
3. **Bước 3**: Thêm một Environment Secret mang tên `DATABASE_URL` dành riêng cho môi trường này.
4. **Bước 4**: Tạo file workflow khai báo `environment: production`, chạy workflow và chứng kiến quy trình tạm dừng chờ bạn bấm **Review deployments** -> **Approve and deploy**.

---

## 💡 Hint
> Quyền dùng Required Reviewers và Environment Secrets tùy gói/repo: tài liệu hiện tại giới hạn một số rule với repo private trên Free/Pro/Team; kiểm tra cài đặt GitHub của repo trước khi làm lab.

---

## ✅ Validation
- Workflow hiển thị trạng thái màu vàng "Waiting for review" khi đến Job deploy.
- Các protection rules phải đạt trước khi Job được gửi tới runner; Environment Secrets chỉ khả dụng sau đó.
- Trang chủ repo hiển thị thẻ Deployments với trạng thái Active và nút "View deployment" dẫn về URL đã cấu hình.

---

## ❓ Quiz
Hãy kiểm tra mức độ hiểu biết của bạn về Môi trường và Cổng phê duyệt trong CD qua các câu hỏi trong phần trắc nghiệm bên dưới.

---

## 🔥 Challenge
Làm thế nào để kết hợp tính năng Wait Timer (thời gian chờ hoãn) với Required Reviewers để cho phép người vận hành có thời gian chuẩn bị hạ tầng trước khi pipeline chính thức kích hoạt?

---

## 📚 Tổng kết
- `environment` mô hình hóa mục tiêu triển khai và liên kết Job với các rule đã cấu hình.
- Required reviewers là một rule tùy chọn; quyền duyệt và quyền bypass phụ thuộc cài đặt.
- Environment Secrets chỉ được cấp cho Job tham chiếu môi trường sau khi protection rules đạt.
- Gắn liên kết URL triển khai giúp đội ngũ dễ dàng kiểm tra ứng dụng trực tiếp từ giao diện GitHub.
