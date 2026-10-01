# Capstone Project: Xây dựng hoàn chỉnh CI/CD Pipeline cho Web Application

---

## 🎯 Mục tiêu
- Kết nối trigger, jobs, matrix, artifacts và environment thành một pipeline dễ đọc.
- Phân biệt phần CI trong YAML với các thiết lập repo như required checks và phê duyệt môi trường.
- Thực hành theo ví dụ có điều kiện tiên quyết rõ ràng; biết điểm nào phải thay bằng lệnh triển khai của dự án.

---

## 🧩 Từ khóa hôm nay

### End-to-End CI/CD Pipeline
- **Nói dễ hiểu**: Pipeline nối các bước kiểm tra và phát hành theo trigger, điều kiện, quyền và cấu hình của repo.
- **Ví dụ**: PR chạy lint/test; push vào `main` có thể tiếp tục build và deploy staging rồi chờ rule môi trường production.
- **Đừng nhầm**: Một file YAML không tự cung cấp lệnh deploy, credentials, branch protection hay hạ tầng đích.

### Pipeline Quality Gate
- **Nói dễ hiểu**: Điều kiện đã cấu hình quyết định job sau có chạy hay không; required status check có thể chặn merge.
- **Ví dụ**: `build` khai báo `needs: [lint, audit, test]`, nên mặc định bị bỏ qua nếu một job tiên quyết lỗi hoặc bị bỏ qua.
- **Đừng nhầm**: `needs` điều khiển luồng job; việc chặn merge cần chọn check trong branch protection/ruleset.

### Post-deployment Verification
- **Nói dễ hiểu**: Bước kiểm tra sức khỏe tự động (Smoke Test) được thực thi ngay sau khi triển khai lên máy chủ nhằm xác nhận ứng dụng hoạt động bình thường.
- **Ví dụ**: Sau deploy, `curl --fail "$APP_URL/health"` báo lỗi nếu endpoint không trả phản hồi thành công.
- **Đừng nhầm**: Không phải là bài kiểm thử unit test nội bộ; đây là bài test tương tác trực tiếp với dịch vụ đang chạy trên server thật.

---

## 📖 Định nghĩa
Bài này ghép các phần Level 7 thành một ví dụ workflow cho ứng dụng Node.js có `package-lock.json`, các script `lint`, `test`, `build` và script deploy do dự án cung cấp. Ví dụ minh họa quan hệ giữa các job; cần thay domain, command, policy, secrets và môi trường theo dự án thật. Không có một pipeline duy nhất đúng cho mọi nhóm.

---

## 💡 Tại sao cần
Biết từng khái niệm riêng lẻ chưa đủ để đọc một pipeline. Capstone giúp thấy trigger quyết định lúc chạy, `needs` quyết định thứ tự, artifact chuyển file, còn environment và branch rules được cấu hình ở repo. Pipeline giảm thao tác lặp nhưng không đảm bảo ứng dụng không lỗi.

---

## 🧠 Mental Model
Hãy hình dung một bưu cục: PR đưa kiện hàng qua các khâu kiểm tra song song; khi đạt, một bản build được niêm phong thành artifact. Push lên `main` có thể chuyển artifact sang staging. Production chỉ nhận kiện hàng khi rule môi trường được cấu hình và người có quyền duyệt.

---

## 📊 Sơ đồ minh họa
```text
PR hoặc push main
       ├── lint ───────────┐
       ├── dependency audit├── build + upload artifact
       └── test matrix ────┘          │
                              push main only
                                      ▼
                               deploy staging
                                      ▼
                         production environment rule
                                      ▼
                       deploy + smoke test /health
```

---

## 🏢 Ví dụ thực tế
Ví dụ giả định: PR chạy lint, dependency audit và test matrix; nếu repo đặt check làm required, merge phải chờ điều kiện đó. Push vào `main` tiếp tục build và lưu artifact, rồi gọi lệnh deploy của dự án cho staging. Job production tham chiếu environment; nếu reviewer rule đã cấu hình và gói repo hỗ trợ, Job chờ duyệt trước khi chạy. Kết quả vẫn cần smoke test, monitoring và rollback plan.

---

## 💻 Command & Cú pháp
```yaml
# Ví dụ khung; cần có package-lock.json, npm scripts và scripts/deploy-*.sh của dự án
name: Capstone CI and Deployment
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions:
  contents: read

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 24
      - run: npm ci
      - run: npm run lint

  dependency-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 24
      - run: npm ci
      - run: npm audit --audit-level=high

  test:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        node: [22, 24]
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: ${{ matrix.node }}
      - run: npm ci
      - run: npm test

  build:
    needs: [lint, dependency-audit, test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 24
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v7
        with:
          name: webapp-dist
          path: dist/
          retention-days: 7

  deploy-staging:
    needs: build
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - uses: actions/download-artifact@v8
        with:
          name: webapp-dist
          path: dist
      - name: Deploy to staging
        run: ./scripts/deploy-staging.sh dist/

  deploy-production:
    needs: deploy-staging
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment:
      name: production
    steps:
      - uses: actions/download-artifact@v8
        with:
          name: webapp-dist
          path: dist
      - name: Deploy to production
        env:
          PROD_API_TOKEN: ${{ secrets.PROD_API_TOKEN }}
        run: ./scripts/deploy-production.sh dist/
      - name: Smoke test
        env:
          APP_URL: ${{ vars.PRODUCTION_URL }}
        run: curl --fail --silent --show-error "$APP_URL/health"
```

Trong ví dụ, `./scripts/deploy-staging.sh` và `./scripts/deploy-production.sh` là lệnh giả định phải có trong dự án. Nếu chưa có, thay bằng lệnh deploy của nền tảng đang dùng. Không đặt secret ở job kiểm thử; với nhà cung cấp cloud hỗ trợ, ưu tiên OIDC thay token dài hạn.

---

## 🔍 Giải thích command
- `needs: [lint, dependency-audit, test]`: Chỉ cho phép build tiếp tục khi cả ba job tiên quyết thành công.
- `strategy.matrix`: Tạo các Job test riêng cho Node 22 và 24; chúng có thể chạy song song tùy runner/concurrency.
- `upload-artifact@v7` và `download-artifact@v8`: Chuyển thư mục build qua các Job; Action này không tự deploy.
- `if`: Giới hạn deploy vào push trên `main`; PR chạy CI nhưng bỏ qua staging/production.
- `environment: production`: Liên kết Job với môi trường; reviewer/branch rules và secret phải được cấu hình riêng trong repo.
- `permissions: contents: read`: Giới hạn mặc định quyền token của workflow; chỉ thêm quyền khi một job thật sự cần.

---

## ⚠️ Sai lầm phổ biến
1. **Thiếu `needs` giữa build và deploy**: Job deploy có thể chạy trước khi Artifact được tạo.
2. **Không phân tách quyền theo sự kiện**: Workflow trên PR không nên được cấp credentials production; điều kiện trong YAML cần đi cùng quyền tối thiểu và protection rules.
3. **Tưởng `environment: production` tự tạo phê duyệt**: Phải cấu hình Required reviewers hoặc rule khác trong Settings; khả năng dùng tùy gói/repo.
4. **Chỉ xem log deploy**: Thêm smoke test và theo dõi dịch vụ; test thành công không thay thế monitoring hoặc rollback plan.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.

1. **Bước 1**: Trước khi chạy ví dụ, xác nhận dự án có `package-lock.json` và scripts `lint`, `test`, `build`; nếu chưa có, dùng YAML để vẽ/đánh dấu luồng job mà chưa chạy thật.
2. **Bước 2**: Đọc ma trận Node `22`/`24`; dự án thật nên chọn các phiên bản Node còn được hỗ trợ và phù hợp với người dùng.
3. **Bước 3**: Xác định vì sao PR chỉ chạy CI còn push lên `main` mới đi tiếp staging/production.
4. **Bước 4 (tùy chọn)**: Với repository có quyền truy cập và gói hỗ trợ, cấu hình environments, reviewer, variables/secrets rồi chạy workflow. Thay lệnh deploy giả định bằng lệnh của nền tảng đang dùng.

---

## 💡 Hint & mẹo
> Bạn nên vẽ sơ đồ khối quan hệ phụ thuộc giữa các Job lên giấy hoặc bảng trắng trước khi bắt tay viết các dòng YAML để không bị nhầm lẫn thứ tự `needs`.

---

## ✅ Validation & Kết quả mong đợi
- Vẽ đúng DAG: lint, dependency audit, test matrix chạy độc lập; build đợi cả ba; staging chỉ chạy trên push `main`.
- Biết required check phải được bật riêng trong branch protection/ruleset mới chặn merge.
- Biết Job production chỉ chờ phê duyệt nếu environment rule đã cấu hình và repo/gói hỗ trợ.
- Phân biệt placeholder deploy script với một lệnh deploy đã triển khai thật.

---

## ❓ Quiz nhanh
Hãy hoàn thành bài kiểm tra tổng hợp kiến thức toàn diện của Level 7 CI/CD Capstone trong phần trắc nghiệm bên dưới.

---

## 🚀 Thử thách nâng cao
Thiết kế giải pháp tự động hoàn tác (Rollback Pipeline) khi bước kiểm tra sức khỏe ứng dụng (Smoke Test) phát hiện endpoint dịch vụ trả về mã lỗi 500 sau khi triển khai?

---

## 📝 Tổng kết
- Pipeline là đồ thị job; `needs` điều khiển phụ thuộc, matrix tạo nhiều tổ hợp, artifact chuyển file.
- Trigger/`if` giới hạn lúc deploy; repo settings mới cấu hình required checks và environment approvals.
- Secrets cần quyền tối thiểu; không in ra log; lệnh deploy phải khớp hạ tầng thật.
- CI/CD giúp phát hiện lỗi sớm hơn nhưng vẫn cần review, giám sát và phương án khôi phục.
