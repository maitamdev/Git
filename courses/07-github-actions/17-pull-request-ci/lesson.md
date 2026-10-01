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
- **Đừng nhầm**: Không ngăn cản lập trình viên mở PR hay tạo nhánh mới; chỉ ngăn hành động merge hoặc push trực tiếp vào nhánh được bảo vệ.

### Merge Commit Ref
- **Nói dễ hiểu**: Nhánh tham chiếu ảo tạm thời dạng `refs/pull/:id/merge` mà GitHub tự động sinh ra khi mở PR để kiểm tra tính tương thích giữa nhánh tính năng và nhánh đích.
- **Ví dụ**: Runner kéo mã nguồn từ `refs/pull/42/merge` để chạy test trên mã nguồn sau khi hợp nhất giả lập.
- **Đừng nhầm**: Không phải là commit thật đã vào nhánh chính; commit này sẽ bị hủy nếu PR bị đóng hoặc có xung đột mã nguồn.

---

## 📖 Định nghĩa
Pull Request CI là mô hình kiểm chuẩn tự động bắt buộc trong quy trình phát triển phần mềm chuyên nghiệp. Khi một lập trình viên tạo hoặc đẩy thêm mã nguồn vào một Pull Request, GitHub Actions tự động tạo ra một nhánh ảo hợp nhất thử nghiệm (merge commit tạm thời) và thực thi toàn bộ chuỗi kiểm tra (Linter, Unit Test, Type Check). Kết quả thành công hay thất bại được gắn trực tiếp vào báo cáo trạng thái (Status Check) của PR.

---

## 💡 Tại sao cần
Nếu không có CI gác cổng trên Pull Request, nhánh chính (main) sẽ liên tục bị vỡ hoặc suy giảm hiệu năng do những lỗi bất cẩn, xung đột thư viện của lập trình viên. Đợi đến khi code đã được merge vào main mới phát hiện lỗi thì đã quá muộn và tốn rất nhiều công sức để tìm kiếm commit lỗi và phục hồi hệ thống. PR CI đóng vai trò như một bộ lọc sạch tự động: mọi đoạn mã kém chất lượng đều bị chặn đứng ngay trước cửa ngõ của nhánh chính, bảo vệ sự ổn định tối cao của sản phẩm.

---

## 🧠 Mental Model
Hãy hình dung trạm kiểm dịch hải quan tại sân bay quốc tế. Hành khách (các commit trong PR) muốn nhập cảnh vào quốc gia (nhánh main) bắt buộc phải đi qua máy quét an ninh và cổng soi chiếu sinh học (CI Pipeline). Nếu hành lý chứa chất cấm hoặc có triệu chứng nhiễm virus nguy hiểm (bài test bị lỗi hoặc linter phát hiện sai chuẩn), cánh cửa hải quan sẽ khóa chặt và hành khách bị chặn lại để xử lý trước khi có thể đặt chân vào nội địa.

---

## 📊 Sơ đồ minh họa
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
[NÚT MERGE ĐƯỢC MỞ KHÓA]      [NÚT MERGE BỊ KHÓA CHẶT]
```

---

## 🏢 Ví dụ thực tế
Trong một dự án tài chính, nhánh `main` được bảo vệ bởi quy tắc Branch Protection Rules với yêu cầu bắt buộc: bài kiểm tra `ci/test` phải đạt trạng thái thành công. Khi lập trình viên Nam mở một PR thêm tính năng chuyển tiền nhanh, Nam vô tình sửa đổi một hàm mà quên cập nhật bài kiểm thử tương ứng. Đường ống Actions chạy trong 2 phút và báo lỗi đỏ ở bài test đơn vị. Trên giao diện PR của Nam, nút "Merge pull request" bị vô hiệu hóa với thông báo màu đỏ: "Required statuses must pass before merging". Nam kiểm tra log, sửa lại đoạn mã, commit và push lên nhánh của mình. CI tự động chạy lại, báo tích xanh và nút Merge lập tức sáng lên cho phép trưởng nhóm phê duyệt.

---

## 💻 Command & Cú pháp
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
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
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
- `name: quality-gate`: Tên hiển thị của check trên giao diện GitHub; tên này được dùng trong Branch Protection Rules.
- `actions/checkout@v4`: Mặc định trên sự kiện PR, action này sẽ checkout commit merge ảo `refs/pull/<pr_number>/merge`.

---

## ⚠️ Sai lầm phổ biến
1. **Kích hoạt cả hai sự kiện `push` và `pull_request` trên cùng một nhánh**: Khiến workflow bị chạy lặp lại 2 lần cho mỗi commit, gây lãng phí runner credits và làm chậm thời gian phản hồi.
2. **Cấu hình tên Job kiểm tra trong Branch Protection Rule không khớp**: Tên status check phải trùng khớp tuyệt đối với trường `name:` của Job trong file YAML.
3. **Chỉ kiểm thử trên commit của tác giả thay vì commit sau khi merge**: Có thể xảy ra trường hợp code tác giả chạy tốt trên nhánh feature nhưng xung đột logic với commit mới nhất trên nhánh main.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.

1. **Bước 1**: Tạo file `.github/workflows/pr-ci.yml` với cấu hình lắng nghe sự kiện `pull_request` nhắm vào nhánh `main`.
2. **Bước 2**: Định nghĩa job `lint-and-test` thực hiện chạy linter và unit test của dự án.
3. **Bước 3**: Tạo nhánh mới `feature/login`, sửa mã nguồn, push lên remote và mở một Pull Request trên GitHub.
4. **Bước 4**: Quan sát danh sách Checks ở cuối trang PR chuyển từ màu vàng (pending) sang màu xanh (success) hoặc màu đỏ (failure).

---

## 💡 Hint & mẹo
> Bạn có thể sử dụng GitHub CLI với lệnh `gh pr checks` để xem ngay trạng thái CI của PR hiện tại từ terminal mà không cần chuyển qua cửa sổ trình duyệt.

---

## ✅ Validation & Kết quả mong đợi
- Trang Pull Request hiển thị mục **Checks** với đầy đủ các bài kiểm tra được liệt kê rõ ràng.
- Nút "Merge pull request" bị khóa kèm cảnh báo nếu bất kỳ bước nào trong CI pipeline thất bại.
- Sau khi bài test pass toàn bộ, nút Merge chuyển sang trạng thái sẵn sàng để review và hợp nhất.

---

## ❓ Quiz nhanh
Hãy kiểm tra kiến thức về thiết lập đường ống CI cho Pull Request qua các câu hỏi trong phần trắc nghiệm bên dưới.

---

## 🚀 Thử thách nâng cao
Làm thế nào để sử dụng đường ống CI gửi tin nhắn tóm tắt kết quả kiểm thử trực tiếp vào phần bình luận của Pull Request bằng action `actions/github-script`?

---

## 📝 Tổng kết
- PR CI tự động kiểm tra chất lượng mã nguồn mỗi khi có yêu cầu hợp nhất mới hoặc có commit đẩy thêm.
- Kết hợp với Branch Protection Rules tạo thành cổng kiểm soát chất lượng tuyệt đối (Quality Gate).
- Ngăn chặn triệt để nguy cơ mã nguồn vỡ build hoặc lỗi logic lọt vào nhánh chính của dự án.
