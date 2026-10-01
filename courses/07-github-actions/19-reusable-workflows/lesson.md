# Tái sử dụng luồng công việc với Reusable Workflows (workflow_call)

---

## 🎯 Mục tiêu
- Hiểu rõ sự kiện `workflow_call` để biến một workflow bình thường thành một mô-đun tái sử dụng.
- Áp dụng nguyên lý DRY (Don't Repeat Yourself) để chuẩn hóa quy trình CI/CD trên quy mô toàn doanh nghiệp.
- Biết cách định nghĩa và truyền `inputs`, `outputs` và `secrets` giữa Caller Workflow và Called Workflow.
- Nắm vững quy tắc giới hạn lồng nhau tối đa 4 cấp độ của GitHub Actions.

---

## 🧩 Từ khóa hôm nay

### workflow_call Trigger
- **Nói dễ hiểu**: Sự kiện kích hoạt đặc biệt của GitHub Actions biến một tệp workflow thành một hàm dùng chung có thể được triệu gọi từ workflow khác.
- **Ví dụ**: Khai báo `on: workflow_call:` ở đầu tệp template để các dự án khác có thể tái sử dụng.
- **Đừng nhầm**: Không kích hoạt từ sự kiện Git commit trực tiếp; chỉ chạy khi có workflow khác gọi tới.

### Caller vs Called Workflow
- **Nói dễ hiểu**: Caller Workflow là tệp gọi hàm (nơi phát lệnh), còn Called Workflow là tệp chứa định nghĩa logic được gọi.
- **Ví dụ**: Workflow `ci.yml` của dự án web gọi tệp dùng chung `maven-build.yml` của tổ chức.
- **Đừng nhầm**: Cả hai đều là file YAML nhưng Called Workflow bắt buộc phải có `workflow_call`, còn Caller Workflow dùng thuộc tính `uses:`.

### secrets: inherit Property
- **Nói dễ hiểu**: Cú pháp chuyển tiếp toàn bộ các biến bí mật từ workflow gọi sang workflow được gọi mà không cần ánh xạ từng biến một.
- **Ví dụ**: Khai báo `secrets: inherit` dưới lệnh gọi `uses` để template tự động nhận diện `API_TOKEN`.
- **Đừng nhầm**: Không làm lộ secret ra ngoài; chỉ chia sẻ trong phạm vi thực thi nội bộ của lần chạy hiện tại.

---

## 📖 Định nghĩa
Reusable Workflows (Luồng công việc tái sử dụng) là tính năng mạnh mẽ cho phép bạn đóng gói một workflow hoàn chỉnh để nhiều workflow khác (hoặc thậm chí nhiều kho lưu trữ khác trong tổ chức) có thể gọi lại mà không cần phải sao chép mã nguồn. Một workflow trở thành có thể tái sử dụng khi sự kiện kích hoạt của nó được khai báo là `on: workflow_call`. Workflow thực hiện cuộc gọi được gọi là Caller Workflow, và workflow được gọi là Called Workflow.

---

## 💡 Tại sao cần
Trong các công ty có hàng chục vi dịch vụ (Microservices), nếu mỗi kho lưu trữ đều tự viết một tệp YAML kiểm thử và đóng gói Docker riêng biệt, thì khi cần nâng cấp phiên bản bảo mật hoặc thay đổi địa chỉ máy chủ, kỹ sư sẽ phải sửa đổi thủ công hàng chục tệp YAML giống hệt nhau. Reusable Workflows giúp tập trung hóa toàn bộ logic vào một nơi duy nhất: sửa một nơi, toàn bộ công ty được cập nhật tự động.

---

## 🧠 Mental Model
Hãy so sánh việc lập trình không có cấu trúc hàm con (phải sao chép cùng một đoạn mã dài lặp đi lặp lại khắp nơi trong dự án) với việc định nghĩa một Hàm dùng chung (Function/Method) mẫu mực. Reusable Workflow chính là một Hàm tiêu chuẩn ở cấp độ hạ tầng DevOps: nó có tên định danh hàm (đường dẫn tệp YAML), các tham số đầu vào (inputs), các dữ liệu trả về (outputs), và có thể được triệu gọi từ bất kỳ đâu chỉ bằng một dòng lệnh uses đơn giản.

---

## 📊 Sơ đồ minh họa
```text
Mô hình gọi Reusable Workflow:
[Caller Workflow: main-app/.github/workflows/ci.yml]
jobs:
  call-build:
    uses: company-templates/.github/workflows/standard-build.yml@main
    with:
      node-version: 20
    secrets: inherit
                     │
                     ▼ Kích hoạt
[Called Reusable Workflow: standard-build.yml]
on:
  workflow_call:
    inputs:
      node-version:
        type: string
        required: true
jobs:
  compile-and-test:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Building with Node version ${{ inputs.node-version }}"
```

---

## 🏢 Ví dụ thực tế
Một ngân hàng số duy trì hơn 50 dự án vi dịch vụ viết bằng ngôn ngữ Java Spring Boot. Đội ngũ kỹ sư nền tảng (Platform Team) tạo một kho lưu trữ trung tâm chứa tệp reusable workflow `.github/workflows/maven-enterprise-build.yml` đã được cấu hình sẵn các bước quét bảo mật SonarQube, kiểm tra bản quyền mã nguồn và đóng gói JAR chuẩn chỉ. Tất cả 50 nhóm phát triển ứng dụng chỉ cần viết một tệp caller workflow ngắn gọn gồm 6 dòng gọi đến tệp mẫu dùng chung. Khi ngân hàng ban hành chính sách bảo mật mới, Platform Team chỉ cần chỉnh sửa một dòng trong tệp reusable duy nhất, toàn bộ 50 dự án lập tức áp dụng tiêu chuẩn mới mà không cần chạm vào mã nguồn của từng nhóm.

---

## 💻 Command & Cú pháp
```yaml
# 1. Định nghĩa tệp Called Workflow: .github/workflows/reusable-test.yml
name: Reusable Test Suite
on:
  workflow_call:
    inputs:
      node-version:
        required: true
        type: string

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js ${{ inputs.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ inputs.node-version }}
      - run: npm test

# 2. Định nghĩa tệp Caller Workflow: .github/workflows/main.yml
name: Main Pipeline
on: [push]

jobs:
  run-tests:
    uses: ./.github/workflows/reusable-test.yml
    with:
      node-version: '20'
    secrets: inherit
```

---

## 🔍 Giải thích command
- `on: workflow_call`: Khai báo sự kiện cho phép các workflow khác gọi đến tệp này.
- `inputs.node-version`: Tham số đầu vào kiểu chuỗi bắt buộc phải truyền khi gọi workflow.
- `uses: ./.github/workflows/reusable-test.yml`: Chỉ định đường dẫn tới tệp reusable workflow trong cùng kho lưu trữ.
- `with.node-version: '20'`: Truyền giá trị thực tế cho tham số đã định nghĩa.
- `secrets: inherit`: Cho phép workflow con tự động kế thừa toàn bộ secrets từ caller.

---

## ⚠️ Sai lầm phổ biến
1. **Gọi lồng nhau quá 4 cấp độ**: GitHub giới hạn tối đa 4 tầng workflow lồng nhau (A gọi B, B gọi C, C gọi D, D gọi E sẽ báo lỗi).
2. **Quên khai báo `secrets: inherit`**: Khiến workflow con không đọc được các biến bí mật như API token hay mật khẩu triển khai.
3. **Khai báo sai cú pháp đường dẫn**: Thiếu tiền tố `./` cho các tệp nội bộ hoặc thiếu thẻ tag `@main` khi gọi từ kho lưu trữ bên ngoài.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.

1. **Bước 1**: Tạo file `.github/workflows/reusable-lint.yml` khai báo `on: workflow_call` với một input mang tên `linter-name`.
2. **Bước 2**: Trong file này, định nghĩa job in ra màn hình thông báo: `echo "Running linter ${{ inputs.linter-name }}"`.
3. **Bước 3**: Tạo file `.github/workflows/caller-test.yml` có sự kiện `push` và gọi reusable workflow vừa tạo với `with: linter-name: 'eslint'`.
4. **Bước 4**: Commit cả 2 file, đẩy lên GitHub và xem kết quả thực thi trong tab Actions để xác nhận workflow con được triệu gọi thành công.

---

## 💡 Hint & mẹo
> Khi gọi Reusable Workflow từ một repository khác trong cùng tổ chức, hãy ghim theo thẻ phiên bản phát hành hoặc commit SHA (ví dụ: `owner/repo/.github/workflows/build.yml@v1.2.0`) để đảm bảo tính ổn định và bảo mật cao nhất.

---

## ✅ Validation & Kết quả mong đợi
- Tab Actions hiển thị một Job chính của Caller, bên trong mở rộng ra các Jobs được định nghĩa trong Reusable Workflow.
- Đầu vào `linter-name` được truyền chính xác và hiển thị đúng giá trị `eslint` trong console log.

---

## ❓ Quiz nhanh
Kiểm tra kiến thức về thiết kế và sử dụng Reusable Workflows qua bài trắc nghiệm trong phần bên dưới.

---

## 🚀 Thử thách nâng cao
Phân tích sự khác biệt cơ bản về phạm vi và năng lực giữa một Custom Composite Action (tái sử dụng các Step trong 1 Job) và một Reusable Workflow (tái sử dụng toàn bộ các Job và Matrix)?

---

## 📝 Tổng kết
- `workflow_call` biến một workflow thành mô-đun có thể tái sử dụng từ các workflow khác.
- Tuân thủ triệt để nguyên lý DRY, giúp chuẩn hóa và bảo trì quy trình CI/CD tập trung cho nhiều dự án.
- Hỗ trợ định nghĩa rõ ràng các tham số đầu vào `inputs`, đầu ra `outputs` và chia sẻ `secrets`.
- Cấu hình `secrets: inherit` giúp việc chia sẻ bí mật giữa các tầng workflow diễn ra thuận tiện và bảo mật.
