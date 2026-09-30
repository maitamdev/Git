# Tái sử dụng luồng công việc với Reusable Workflows (workflow_call)

---

## 🎯 Mục tiêu bài học
- Hiểu rõ sự kiện workflow_call để biến một workflow bình thường thành một mô-đun tái sử dụng.
- Áp dụng nguyên lý DRY (Don't Repeat Yourself) để chuẩn hóa quy trình CI/CD trên quy mô toàn doanh nghiệp.
- Biết cách định nghĩa và truyền inputs, secrets giữa Caller Workflow và Called Workflow.

---

## 📖 Định nghĩa
> Reusable Workflows (Luồng công việc tái sử dụng) là tính năng mạnh mẽ cho phép bạn đóng gói một workflow hoàn chỉnh để nhiều workflow khác (hoặc thậm chí nhiều kho lưu trữ khác trong tổ chức) có thể gọi lại mà không cần phải sao chép mã nguồn. Một workflow trở thành có thể tái sử dụng khi sự kiện kích hoạt của nó được khai báo là on: workflow_call. Workflow thực hiện cuộc gọi được gọi là Caller Workflow, và workflow được gọi là Called Workflow.

---

## 🤔 Tại sao cần?
Trong các công ty có hàng chục vi dịch vụ (Microservices), nếu mỗi kho lưu trữ đều tự viết một tệp YAML kiểm thử và đóng gói Docker riêng biệt, thì khi cần nâng cấp phiên bản bảo mật hoặc thay đổi địa chỉ máy chủ, kỹ sư sẽ phải sửa đổi thủ công hàng chục tệp YAML giống hệt nhau. Reusable Workflows giúp tập trung hóa toàn bộ logic vào một nơi duy nhất: sửa một nơi, toàn bộ công ty được cập nhật tự động.

---

## 🧠 Mental Model & Mô hình tư duy
Hãy so sánh việc lập trình không có cấu trúc hàm con (phải sao chép cùng một đoạn mã dài lặp đi lặp lại khắp nơi trong dự án) với việc định nghĩa một Hàm dùng chung (Function/Method) mẫu mực. Reusable Workflow chính là một Hàm tiêu chuẩn ở cấp độ hạ tầng DevOps: nó có tên định danh hàm (đường dẫn tệp YAML), các tham số đầu vào (inputs), các dữ liệu trả về (outputs), và có thể được triệu gọi từ bất kỳ đâu chỉ bằng một dòng lệnh uses đơn giản.

---

## 🖼️ Sơ đồ minh họa
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
    inputs: [node-version]
jobs:
  compile-and-test: [run-build]
```

---

## 🌎 Ví dụ thực tế
Một ngân hàng số duy trì hơn 50 dự án vi dịch vụ viết bằng ngôn ngữ Java Spring Boot. Đội ngũ kỹ sư nền tảng (Platform Team) tạo một kho lưu trữ trung tâm chứa tệp reusable workflow `.github/workflows/maven-enterprise-build.yml` đã được cấu hình sẵn các bước quét bảo mật SonarQube, kiểm tra bản quyền mã nguồn và đóng gói JAR chuẩn chỉ. Tất cả 50 nhóm phát triển ứng dụng chỉ cần viết một tệp caller workflow ngắn gọn gồm 6 dòng gọi đến tệp mẫu dùng chung. Khi ngân hàng ban hành chính sách bảo mật mới, Platform Team chỉ cần chỉnh sửa một dòng trong tệp reusable duy nhất, toàn bộ 50 dự án lập tức áp dụng tiêu chuẩn mới mà không cần chạm vào mã nguồn của từng nhóm.

---

## 💻 Command & Lệnh thao tác
```bash
cat .github/workflows/reusable-build.yml
cat .github/workflows/caller.yml
```

---

## 🔍 Giải thích chi tiết lệnh
Các câu lệnh trên dùng để xem và đối chiếu cấu trúc giữa tệp định nghĩa tái sử dụng (chứa workflow_call) và tệp gọi thực thi (chứa khóa uses trỏ tới tệp đó).

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Cố gắng gọi một Reusable Workflow lồng nhau quá 4 cấp độ (GitHub giới hạn tối đa 4 tầng workflow lồng nhau).**: 
2. **Quên khai báo từ khóa `secrets**:  inherit` khiến Called Workflow không thể truy cập các biến bí mật cần thiết của kho lưu trữ.
3. **Sử dụng sai cú pháp đường dẫn tệp tin tương đối hoặc quên ghim phiên bản nhánh/tag `@main`.**: 

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Tạo một tệp `.github/workflows/reusable-test.yml` có sự kiện kích hoạt `on: workflow_call`.
2. Khai báo một tham số đầu vào `inputs: os-type:` có kiểu dữ liệu chuỗi.
3. Tạo tệp `caller.yml` gọi tới tệp trên bằng cú pháp `uses: ./.github/workflows/reusable-test.yml`.

---

## 💡 Gợi ý thực hiện (Hint)
> Sử dụng `secrets: inherit` trong Job gọi để tự động truyền toàn bộ Secrets của Caller sang Called Workflow một cách tiện lợi.

---

## ✅ Kiểm tra kết quả (Validation)
Called Workflow được nạp và thực thi trơn tru như một Job bình thường trong giao diện của Caller.

---

## ❓ Câu hỏi ôn tập (Quiz)
Kiểm tra kiến thức về thiết kế và sử dụng Reusable Workflows qua bài trắc nghiệm sau.

---

## 🔥 Thử thách nâng cao (Challenge)
Phân tích sự khác biệt cơ bản về phạm vi và năng lực giữa một Custom Composite Action (tái sử dụng các Step) và một Reusable Workflow (tái sử dụng toàn bộ các Job)?

---

## 📚 Tổng kết kiến thức
- `workflow_call` biến một workflow thành mô-đun có thể tái sử dụng từ các workflow khác.
- Tuân thủ triệt để nguyên lý DRY, giúp chuẩn hóa và bảo trì quy trình CI/CD tập trung cho nhiều dự án.
- Hỗ trợ định nghĩa rõ ràng các tham số đầu vào `inputs`, đầu ra `outputs` và chia sẻ `secrets`.
