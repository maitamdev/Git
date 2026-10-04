# Thiết lập CI Pipeline tự động kiểm thử trên Pull Request

---

## 🎯 Mục tiêu
- Thiết lập hoàn chỉnh một pipeline CI tự động kích hoạt mỗi khi có Pull Request được mở hoặc cập nhật.
- Liên kết chặt chẽ kết quả của GitHub Actions với tính năng Branch Protection Rules (Required Status Checks).
- Trải nghiệm quy trình kiểm soát chất lượng: Khóa nút Merge khi bài test đỏ và Mở khóa khi bài test xanh.
- Hiểu rõ cơ chế merge ảo của Git trên nhánh `refs/pull/:id/merge`.

---

## 🧩 Từ khóa hôm nay

### Status Checks
- **Nói dễ hiểu**: Báo cáo trạng thái (thành công, thất bại, đang chờ) do workflow gửi về giao diện Pull Request để biểu thị kết quả kiểm thử.
- **Ví dụ**: Biểu tượng tích xanh kèm tên kiểm tra `ci/test` trên trang thảo luận của Pull Request.
- **Đừng nhầm**: Không phải là bình luận bằng chữ (PR comment); đây là trạng thái hệ thống được liên kết trực tiếp với commit SHA.

### Branch Protection Rules
- **Nói dễ hiểu**: Tập hợp quy tắc bảo vệ do quản trị viên thiết lập trên nhánh chính để ngăn chặn việc xóa nhánh hoặc hợp nhất code lỗi.
- **Ví dụ**: Bật tùy chọn "Require status checks to pass before merging" để khóa nút Merge nếu CI chưa xanh.
- **Đừng nhầm**: Chỉ các quy tắc đã bật mới được thực thi; required status checks chặn merge khi chưa đạt, còn quyền bypass/admin và quyền push tùy cấu hình.

### Merge Commit Ref
- **Nói dễ hiểu**: Tham chiếu merge thử nghiệm dạng `refs/pull/:id/merge` mà GitHub dùng cho `pull_request` khi có thể tạo kết quả merge để kiểm tra thay đổi với nhánh đích.
- **Ví dụ**: Runner kéo mã nguồn từ `refs/pull/42/merge` để chạy test trên mã nguồn sau khi hợp nhất giả lập.
- **Đừng nhầm**: Đây không phải commit đã được merge vào nhánh đích; cách checkout phụ thuộc event và trạng thái merge của PR.

---

## 📖 Định nghĩa
Pull Request CI là cách kiểm tra thay đổi trước khi merge. Khi workflow lắng nghe `pull_request`, GitHub Actions có thể chạy kiểm tra trên merge ref thử nghiệm, tùy khả năng tạo merge. Kết quả được báo về PR; việc chặn merge cần cấu hình required status checks trong branch protection hoặc ruleset.

---

## 🤔 Tại sao cần?
Nếu chỉ kiểm tra sau khi merge, lỗi có thể ảnh hưởng tới nhánh chính trước khi phát hiện. PR CI đưa kết quả kiểm tra tới reviewer sớm hơn; muốn kết quả chặn merge thì quản trị viên phải cấu hình required checks, và vẫn cần quyền bypass được kiểm soát.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung trạm kiểm dịch hải quan tại sân bay quốc tế. Hành khách (các commit trong PR) muốn nhập cảnh vào quốc gia (nhánh main) bắt buộc phải đi qua máy quét an ninh và cổng soi chiếu sinh học (CI Pipeline). Nếu hành lý chứa chất cấm hoặc có triệu chứng nhiễm virus nguy hiểm (bài test bị lỗi hoặc linter phát hiện sai chuẩn), cánh cửa hải quan sẽ khóa chặt và hành khách bị chặn lại để xử lý trước khi có thể đặt chân vào nội địa.

---

## 🖼 Sơ đồ
```text
Tích hợp bảo vệ nhánh với PR CI Status Checks:
Developer tạo PR ──► [Kích hoạt CI Workflow]
                          │
                          ▼
                     [Chạy Tests]
                          │
           ┌──────────────┴──────────────┐
           ▼                             ▼
      [Tests PASS ✓]               [Tests FAIL ✗]
           │                             │
           ▼                             ▼
Status Check: Xanh (Success)   Status Check: Đỏ (Failure)
           │                             │
           ▼                             ▼
[Merge có thể tiếp tục theo ruleset] [Merge bị chặn nếu check được đặt required]
```

---

## 🌎 Ví dụ thực tế
Trong môi trường phát triển dự án thực tế: repo đã đặt `ci/test` là required check. Khi test thất bại, merge bị chặn theo rule; sau khi sửa và CI xanh, các yêu cầu review còn lại vẫn phải được đáp ứng. Quyền bypass nếu có cũng phụ thuộc cấu hình.

---

## 💻 Command
```yaml
# Workflow kiểm tra chất lượng Pull Request
name: Pull Request CI
on:
  pull_request:
    branches: [main]
    types: [opened, synchronize, reopened]

jobs:
  verify:
    name: quality-gate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - name: Setup Node.js
        uses: actions/setup-node@v7
        with:
          node-version: 24
      - name: Install dependencies
        run: npm ci
      - name: Run code linter
        run: npm run lint
      - name: Execute automated tests
        run: npm test
```

---

## 🔍 Giải thích command
- `on.pull_request.branches: [main]`: Workflow chỉ lắng nghe các PR có nhánh đích (base branch) là `main`.
- `types: [opened, synchronize, reopened]`: Kích hoạt khi PR mới được mở, khi tác giả đẩy thêm commit mới (`synchronize`), hoặc khi mở lại PR đã đóng.
- `name: quality-gate`: Tên hiển thị cho Job; tên check cụ thể cần xác nhận trong giao diện PR rồi mới chọn làm required check.
- `actions/checkout@v7`: Với `pull_request`, mặc định checkout merge ref thử nghiệm nếu ref đó có sẵn; có thể cấu hình checkout head SHA khác.

---

## ⚠️ Sai lầm phổ biến
1. **Kích hoạt cả `push` và `pull_request`**: Một lần push lên nhánh PR có thể tạo hai workflow run nếu cả hai bộ lọc khớp; cân nhắc thiết kế trigger để tránh chạy trùng không cần thiết.
2. **Chọn nhầm required check**: Chạy workflow ít nhất một lần rồi chọn status check thực tế; check bị bỏ qua hoặc đổi tên có thể khiến merge bị pending.
3. **Chỉ kiểm thử trên commit của tác giả thay vì commit sau khi merge**: Có thể xảy ra trường hợp code tác giả chạy tốt trên nhánh feature nhưng xung đột logic với commit mới nhất trên nhánh main.

---

## 🧪 Lab
Hãy mở terminal và cùng tôi thực hành từng bước dưới đây để làm chủ kỹ năng:

1. **Bước 1**: Đọc tệp mẫu `.github/workflows/pr-ci.yml` và xác định event, nhánh đích, Job và lệnh kiểm tra. Chạy thật trên GitHub là phần tùy chọn, cần repo có Actions/quyền truy cập.
2. **Bước 2**: Định nghĩa job `lint-and-test` thực hiện chạy linter và unit test của dự án.
3. **Bước 3**: Với repo GitHub bạn có quyền dùng, mở PR thử nghiệm; nếu không, đọc cấu hình và chỉ ra thời điểm `pull_request` sẽ kích hoạt.
4. **Bước 4**: Quan sát Checks và phân biệt pending, success, failure; nếu không có repo, kiểm tra luồng dự kiến từ YAML.

---

## 💡 Hint
> Bạn có thể sử dụng GitHub CLI với lệnh `gh pr checks` để xem ngay trạng thái CI của PR hiện tại từ terminal mà không cần chuyển qua cửa sổ trình duyệt.

---

## ✅ Validation
- Xác định được workflow sẽ báo kết quả ở mục Checks trên PR.
- Chỉ khi check được cấu hình required thì failure/pending mới chặn merge; các review/rule khác vẫn có hiệu lực.

---

## ❓ Quiz
Hãy kiểm tra kiến thức về thiết lập đường ống CI cho Pull Request qua các câu hỏi trong phần trắc nghiệm bên dưới.

---

## 🔥 Challenge
Làm thế nào để sử dụng đường ống CI gửi tin nhắn tóm tắt kết quả kiểm thử trực tiếp vào phần bình luận của Pull Request bằng action `actions/github-script`?

---

## 📚 Tổng kết
- PR CI tự động kiểm tra chất lượng mã nguồn mỗi khi có yêu cầu hợp nhất mới hoặc có commit đẩy thêm.
- Kết hợp với required status checks để chặn merge theo chính sách repo.
- CI giảm rủi ro nhưng không bảo đảm phát hiện mọi lỗi hoặc ngăn mọi cách bypass.
