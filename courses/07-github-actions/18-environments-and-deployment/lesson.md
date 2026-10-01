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
- **Ví dụ**: Môi trường mang tên `production` yêu cầu hai kỹ sư trưởng xác nhận trước khi cho phép tiến hành cài đặt.
- **Đừng nhầm**: Không phải biến môi trường dạng chuỗi (`NODE_ENV=production`); đây là thực thể quản lý quyền và secret trên GitHub.

### Required Reviewers
- **Nói dễ hiểu**: Quy tắc bảo vệ yêu cầu ít nhất một người trong danh sách được chỉ định phê duyệt trước khi Job thực thi.
- **Ví dụ**: Lead DevOps nhận thông báo và bấm nút "Approve and deploy" trên web thì Job deploy mới bắt đầu chạy.
- **Đừng nhầm**: Không phải là Pull Request code review; đây là bước phê duyệt thực thi pipeline ngay trong lúc workflow đang chạy.

### Deployment Branches
- **Nói dễ hiểu**: Quy tắc giới hạn chỉ cho phép những nhánh hoặc thẻ tag cụ thể được kích hoạt triển khai lên môi trường.
- **Ví dụ**: Chỉ các commit nằm trên nhánh `main` mới được phép deploy lên môi trường `production`.
- **Đừng nhầm**: Không thay thế branch protection; đây là bộ lọc bổ sung dành riêng cho ngữ cảnh triển khai môi trường.

---

## 📖 Định nghĩa
Deployment Environments (Môi trường triển khai) là tính năng của GitHub cho phép bạn mô hình hóa các mục tiêu triển khai thực tế như Production, Staging hay Development. Mỗi môi trường có thể được thiết lập các quy tắc bảo vệ riêng biệt (Environment Protection Rules) bao gồm: bắt buộc có sự phê duyệt thủ công từ những người chỉ định (Required Reviewers), thời gian chờ (Wait Timer), giới hạn nhánh được phép triển khai, và sở hữu kho lưu trữ Secrets/Variables riêng biệt.

---

## 💡 Tại sao cần
Tự động hóa hoàn toàn là tuyệt vời, nhưng triển khai lên máy chủ sản xuất phục vụ người dùng thực tế tiềm ẩn rủi ro tài chính to lớn. Bạn không bao giờ muốn một commit vô tình được đẩy vào lúc nửa đêm tự động ghi đè lên cơ sở dữ liệu khách hàng. Cổng phê duyệt môi trường tạo ra điểm dừng kiểm soát an toàn tối thượng: pipeline tạm dừng, gửi email thông báo cho trưởng nhóm kỹ thuật, và chỉ khi họ bấm nút "Approve and deploy" thì Job mới tiếp tục chạy.

---

## 🧠 Mental Model
Hãy hình dung chiếc chìa khóa đôi để phóng tên lửa vũ trụ trong các trung tâm chỉ huy quân sự cấp cao. Kỹ sư tự động hóa đã chuẩn bị xong toàn bộ bệ phóng, kiểm tra máy tính và nạp đầy đủ nhiên liệu cần thiết (tương đương với các bài kiểm thử unit test đã vượt qua). Nhưng để tên lửa thực sự rời bệ phóng lao lên không gian (triển khai lên production thực tế), bắt buộc phải có hai vị chỉ huy trưởng (Required Reviewers) cùng tra chiếc chìa khóa định danh, xem xét kỹ lưỡng và vặn nút phê duyệt đồng ý trên bảng điều khiển trung tâm.

---

## 📊 Sơ đồ minh họa
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
        │ Gửi thông báo tới: Lead Engineer     │
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

## 🏢 Ví dụ thực tế
Một công ty fintech quản lý môi trường triển khai có tên `production`. Trong phần thiết lập môi trường, họ chỉ định 2 kỹ sư trưởng làm Required Reviewers và chỉ cho phép triển khai từ nhánh `main`. Khi một bản vá lỗi được gộp vào nhánh chính, Job biên dịch chạy hoàn tất trong 3 phút, sau đó Job triển khai chuyển sang trạng thái màu vàng: "Waiting for review". Trưởng nhóm nhận được thông báo trên điện thoại, xem xét danh sách các thay đổi và bấm nút "Approve and deploy". Ngay lập tức, máy ảo Runner được cấp phát và mã nguồn được đẩy lên hệ thống máy chủ ngân hàng an toàn.

---

## 💻 Command & Cú pháp
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
      - uses: actions/checkout@v4
      - name: Deploy application
        env:
          PROD_API_KEY: ${{ secrets.PROD_API_KEY }}
        run: |
          echo "Triển khai an toàn lên cụm máy chủ production"
          echo "Khóa xác thực: $PROD_API_KEY"
```

---

## 🔍 Giải thích command
- `environment.name: production`: Khai báo liên kết Job với môi trường `production`, kích hoạt các chính sách kiểm duyệt thủ công đã cấu hình trong Settings.
- `environment.url: https://app.example.com`: Cung cấp liên kết ứng dụng trực tiếp trên giao diện Deployments sau khi Job chạy thành công.
- `secrets.PROD_API_KEY`: Đọc biến bí mật thuộc phạm vi riêng của môi trường `production`, ngăn chặn các Job ở nhánh khác đọc lén.

---

## ⚠️ Sai lầm phổ biến
1. **Không cấu hình Environment Protection Rules**: Bất kỳ ai có quyền commit lên nhánh cũng có thể kích hoạt triển khai lên production mà không qua bước kiểm duyệt.
2. **Dùng chung một bộ API key cho mọi môi trường**: Gây nguy cơ code thử nghiệm ở staging xóa nhầm dữ liệu thật trên production.
3. **Không giới hạn Deployment Branches**: Khiến cho việc đẩy commit lên các nhánh thử nghiệm cá nhân cũng vô tình kích hoạt job deploy lên môi trường production.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.

1. **Bước 1**: Trên GitHub, vào mục **Settings** -> **Environments**, bấm **New environment** và tạo môi trường tên `production`.
2. **Bước 2**: Trong môi trường `production`, bật tính năng **Required reviewers** và thêm tài khoản của bạn vào danh sách kiểm duyệt.
3. **Bước 3**: Thêm một Environment Secret mang tên `DATABASE_URL` dành riêng cho môi trường này.
4. **Bước 4**: Tạo file workflow khai báo `environment: production`, chạy workflow và chứng kiến quy trình tạm dừng chờ bạn bấm **Review deployments** -> **Approve and deploy**.

---

## 💡 Hint & mẹo
> Tính năng Environment Protection Rules yêu cầu kho lưu trữ Public hoặc tài khoản GitHub Enterprise / Team đối với kho lưu trữ Private.

---

## ✅ Validation & Kết quả mong đợi
- Workflow hiển thị trạng thái màu vàng "Waiting for review" khi đến Job deploy.
- Sau khi bấm nút Approve, Job mới bắt đầu cấp phát runner và thực hiện các bước deploy.
- Trang chủ repo hiển thị thẻ Deployments với trạng thái Active và nút "View deployment" dẫn về URL đã cấu hình.

---

## ❓ Quiz nhanh
Hãy kiểm tra mức độ hiểu biết của bạn về Môi trường và Cổng phê duyệt trong CD qua các câu hỏi trong phần trắc nghiệm bên dưới.

---

## 🚀 Thử thách nâng cao
Làm thế nào để kết hợp tính năng Wait Timer (thời gian chờ hoãn) với Required Reviewers để cho phép người vận hành có thời gian chuẩn bị hạ tầng trước khi pipeline chính thức kích hoạt?

---

## 📝 Tổng kết
- `environment` mô hình hóa các môi trường triển khai thực tế như `production`, `staging`.
- Cung cấp cổng bảo vệ kiểm duyệt với cơ chế phê duyệt thủ công (Required Reviewers).
- Cho phép định nghĩa các Secrets và Variables độc quyền chỉ có hiệu lực trong môi trường đó.
- Gắn liên kết URL triển khai giúp đội ngũ dễ dàng kiểm tra ứng dụng trực tiếp từ giao diện GitHub.
