# Capstone Project: Xây dựng hoàn chỉnh CI/CD Pipeline cho Web Application

---

## 🎯 Mục tiêu
- Tổng hợp toàn bộ kiến thức Level 7 để thiết kế một đường ống CI/CD chuẩn doanh nghiệp hoàn chỉnh từ A đến Z.
- Xây dựng quy trình tự động hóa đa tầng: Linting, Unit Testing, Matrix Build, Đóng gói Artifacts và Triển khai có phê duyệt.
- Tích hợp bảo vệ nhánh Branch Protection Rules, quản lý Secrets an toàn và xử lý phục hồi lỗi linh hoạt.
- Làm chủ kỹ năng tự động hóa chuyển giao phần mềm trong các môi trường doanh nghiệp thực tế.

---

## 🧩 Từ khóa hôm nay

### End-to-End CI/CD Pipeline
- **Nói dễ hiểu**: Chu trình tự động hóa hoàn chỉnh nối liền từ khoảnh khắc lập trình viên tạo Pull Request cho tới khi code được deploy an toàn trên môi trường sản xuất.
- **Ví dụ**: Pipeline gồm các chặng: Lint mã nguồn -> Chạy test ma trận -> Đóng gói artifact -> Triển khai staging -> Duyệt thủ công -> Đưa lên production.
- **Đừng nhầm**: Không chỉ là một file script bash đơn giản; đây là hệ thống phối hợp giữa nhiều Jobs, Runners và chính sách bảo mật đám mây.

### Pipeline Quality Gate
- **Nói dễ hiểu**: Cổng kiểm soát chất lượng tự động ngăn chặn mã nguồn đi tiếp nếu không vượt qua các tiêu chuẩn bắt buộc (độ bao phủ test, scan bảo mật, lint).
- **Ví dụ**: Nếu Job `lint-and-security` báo lỗi, toàn bộ các Job đóng gói và triển khai phía sau sẽ bị hủy bỏ ngay lập tức.
- **Đừng nhầm**: Không phải là thủ tục hành chính; đây là cơ chế chặn tự động bằng máy móc thông qua thuộc tính `needs:` và `status checks`.

### Post-deployment Verification
- **Nói dễ hiểu**: Bước kiểm tra sức khỏe tự động (Smoke Test) được thực thi ngay sau khi triển khai lên máy chủ nhằm xác nhận ứng dụng hoạt động bình thường.
- **Ví dụ**: Bước curl endpoint `/health` để kiểm tra mã phản hồi HTTP 200 trước khi thông báo triển khai thành công.
- **Đừng nhầm**: Không phải là bài kiểm thử unit test nội bộ; đây là bài test tương tác trực tiếp với dịch vụ đang chạy trên server thật.

---

## 📖 Định nghĩa
Bài học Capstone là thử thách thực chiến tổng hợp đỉnh cao của Level 7. Trong bài thực hành này, bạn sẽ vào vai một Kỹ sư DevOps trưởng (Lead DevOps Engineer) chịu trách nhiệm thiết kế, cấu hình và vận hành toàn bộ hạ tầng tự động hóa CI/CD cho một ứng dụng web thương mại điện tử hiện đại. Đường ống phải đáp ứng đầy đủ các tiêu chuẩn khắt khe nhất của ngành: kiểm tra an ninh, kiểm thử đa nền tảng, quản lý tạo phẩm và cổng triển khai sản xuất có kiểm duyệt.

---

## 💡 Tại sao cần
Biết từng mảnh ghép lý thuyết riêng lẻ (events, jobs, steps, matrix, secrets) là chưa đủ để vận hành một hệ thống thực tế. Giá trị thực sự của một kỹ sư phần mềm chuyên nghiệp thể hiện ở khả năng kết nối tất cả các thành phần đó lại với nhau thành một cỗ máy hoạt động trơn tru, tin cậy, bảo vệ sự ổn định của hệ thống kinh doanh 24/7 trước hàng trăm thay đổi mã nguồn mỗi tuần.

---

## 🧠 Mental Model
Hãy tưởng tượng bạn là tổng công trình sư thiết kế một nhà máy lọc dầu tự động hóa hoàn toàn. Dầu thô (mã nguồn mới) được đưa vào ống dẫn; hệ thống tự động lọc tạp chất và kiểm tra độ tinh khiết (CI lint và test); sau đó được phân tách thành các sản phẩm xăng dầu chuyên biệt theo ma trận tiêu chuẩn (matrix build); các sản phẩm đạt chuẩn được bơm vào kho bảo quản an toàn (artifacts); và cuối cùng, chỉ khi có chữ ký điện tử của giám đốc an toàn (environment approval), van dẫn mới được mở để cung cấp nhiên liệu ra thị trường (production deployment).

---

## 📊 Sơ đồ minh họa
```text
Kiến trúc Pipeline Capstone chuẩn Doanh nghiệp:
[Event: PR to main]
       │
       ├─────────────────────────┐
       ▼                         ▼
[Job 1: Code Lint & Format]  [Job 2: Security & Secret Scan]
       │                         │
       └────────────┬────────────┘
                    ▼
[Job 3: Matrix Unit Test (Node 18, 20 on Ubuntu)]
                    │
                    ▼ (needs: [lint, security, test])
[Job 4: Build Web Application & Upload Artifact]
                    │
                    ▼ (needs: build)
[Job 5: Deploy to Staging Environment]
                    │
                    ▼ (needs: staging, on: push main)
[Job 6: Deploy to Production (WAITING APPROVAL Gate)]
```

---

## 🏢 Ví dụ thực tế
Một công ty khởi nghiệp chuẩn bị ra mắt nền tảng thanh toán trực tuyến. Lập trình viên hoàn thành bài tập Capstone bằng việc tạo hai tệp workflow: `ci.yml` kiểm soát chất lượng mã nguồn trên mọi Pull Request và `deploy.yml` tự động hóa việc đưa sản phẩm lên các máy chủ đám mây. Khi một thành viên trong nhóm mở PR thêm chức năng giỏ hàng, đường ống lập tức khởi động các Jobs kiểm tra song song: lint mã nguồn, quét mã độc, chạy ma trận bài kiểm thử trên các phiên bản Node. Khi PR được duyệt và gộp vào nhánh chính, đường ống triển khai tự động kích hoạt, tạo gói nén artifact, đẩy lên môi trường Staging và gửi yêu cầu phê duyệt cho giám đốc kỹ thuật trước khi đưa lên Production. Toàn bộ quy trình diễn ra tự động 100%, không một sai sót.

---

## 💻 Command & Cú pháp
```yaml
# Cấu hình kiến trúc CI/CD Pipeline tổng thể
name: Enterprise Capstone Pipeline
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint-and-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint

  matrix-test:
    needs: lint-and-audit
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node: [18, 20]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}
      - run: npm ci
      - run: npm test

  build-and-package:
    needs: matrix-test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: webapp-dist
          path: dist/

  deploy-prod:
    needs: build-and-package
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://ecommerce.example.com
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: webapp-dist
          path: dist
      - name: Deploy to Cloud
        env:
          PROD_KEY: ${{ secrets.PROD_API_KEY }}
        run: echo "Deploying bundle to cloud cluster with key $PROD_KEY"
```

---

## 🔍 Giải thích command
- `needs: [lint-and-audit]`: Đảm bảo job sau chỉ khởi chạy khi job trước thành công.
- `strategy.matrix`: Chạy bài kiểm thử song song trên nhiều phiên bản Node.js.
- `upload-artifact@v4` và `download-artifact@v4`: Lưu trữ và chuyển giao sản phẩm build giữa các Job độc lập.
- `if: github.ref == 'refs/heads/main' && github.event_name == 'push'`: Đảm bảo chỉ deploy lên production khi commit đã vào nhánh `main`.
- `environment: production`: Kích hoạt cổng kiểm duyệt thủ công và cách ly Secrets cấp độ môi trường.

---

## ⚠️ Sai lầm phổ biến
1. **Thiếu ràng buộc `needs` giữa các chặng**: Dẫn tới việc Job deploy chạy song song cùng lúc với Job test, có thể deploy nhầm mã nguồn đang bị lỗi.
2. **Không phân tách quyền triển khai theo sự kiện**: Cho phép các sự kiện `pull_request` vô tình kích hoạt việc deploy lên hệ thống thật.
3. **Quên kiểm tra sức khỏe sau triển khai**: Chỉ xem log deploy mà không kiểm tra xem website có thực sự phản hồi hay gặp lỗi sập server (500 Internal Server Error).

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.

1. **Bước 1**: Xây dựng hoàn chỉnh tệp `.github/workflows/ci-cd-capstone.yml` theo cấu trúc 4 tầng: Lint -> Matrix Test -> Build & Artifact -> Deploy.
2. **Bước 2**: Cấu hình ma trận kiểm thử cho 2 phiên bản Node.js (18 và 20).
3. **Bước 3**: Thiết lập môi trường `production` với tính năng Required reviewers trên GitHub repository.
4. **Bước 4**: Mở Pull Request để kiểm tra chất lượng CI, sau đó tiến hành merge vào `main` để kích hoạt chặng Deploy và trải nghiệm cổng phê duyệt thực tế.

---

## 💡 Hint & mẹo
> Bạn nên vẽ sơ đồ khối quan hệ phụ thuộc giữa các Job lên giấy hoặc bảng trắng trước khi bắt tay viết các dòng YAML để không bị nhầm lẫn thứ tự `needs`.

---

## ✅ Validation & Kết quả mong đợi
- Toàn bộ đồ thị pipeline hiển thị trực quan đẹp mắt trong giao diện GitHub Actions với các nhánh phụ thuộc rõ ràng.
- Giai đoạn CI chạy tự động trên Pull Request và khóa nút Merge nếu có bài test thất bại.
- Sau khi merge vào `main`, pipeline chạy tiếp đến bước Deploy Production và tạm dừng an toàn để chờ người kiểm duyệt bấm nút Approve.

---

## ❓ Quiz nhanh
Hãy hoàn thành bài kiểm tra tổng hợp kiến thức toàn diện của Level 7 CI/CD Capstone trong phần trắc nghiệm bên dưới.

---

## 🚀 Thử thách nâng cao
Thiết kế giải pháp tự động hoàn tác (Rollback Pipeline) khi bước kiểm tra sức khỏe ứng dụng (Smoke Test) phát hiện endpoint dịch vụ trả về mã lỗi 500 sau khi triển khai?

---

## 📝 Tổng kết
- Hoàn thành xuất sắc toàn bộ các khối kiến thức cốt lõi của GitHub Actions và đường ống CI/CD hiện đại.
- Làm chủ từ cú pháp YAML, quản lý sự kiện, ma trận kiểm thử cho đến bảo mật bí mật và phê duyệt môi trường.
- Sẵn sàng tự tin áp dụng tự động hóa chuyên nghiệp vào bất kỳ dự án phần mềm thực tế nào trong doanh nghiệp.
- Xây dựng tư duy kỹ sư DevOps: viết mã luôn đi kèm với tự động hóa kiểm định và chuyển giao an toàn.
