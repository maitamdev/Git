# Contexts & Expressions: ${{ github.ref }}, matrix và toán tử

## 🎯 Mục tiêu
- Hiểu rõ khái niệm Contexts trong GitHub Actions: `github`, `env`, `vars`, `secrets`, `matrix`, `steps`, `runner`.
- Sử dụng cú pháp biểu thức `${{ <expression> }}` để tính toán và truy xuất dữ liệu động trong YAML.
- Làm chủ các toán tử so sánh (`==`, `!=`), logic (`&&`, `||`, `!`) và hàm chuỗi: `contains`, `startsWith`, `endsWith`.

## 🧩 Từ khóa hôm nay
### Contexts
- **Nói dễ hiểu**: Các kho dữ liệu có cấu trúc chứa thông tin chi tiết về phiên chạy, commit, môi trường và kho lưu trữ.
- **Ví dụ**: Ngữ cảnh `github.actor` chứa tên người kích hoạt workflow; `runner.os` chứa tên hệ điều hành.
- **Đừng nhầm**: Không phải biến shell thông thường; dữ liệu ngữ cảnh được GitHub Actions phân giải trước khi lệnh shell chạy.

### Expressions Syntax
- **Nói dễ hiểu**: Cú pháp `${{ <biểu thức> }}` cho phép bạn chèn giá trị động hoặc tính toán logic trong tệp cấu hình YAML.
- **Ví dụ**: Biểu thức `${{ github.ref == 'refs/heads/main' }}` trả về giá trị boolean `true` hoặc `false`.
- **Đừng nhầm**: Trong mệnh đề `if:`, việc bao bọc cặp dấu `${{ }}` là tùy chọn, bạn có thể viết trực tiếp biểu thức.

### Built-in Functions
- **Nói dễ hiểu**: Các hàm tiện ích có sẵn do GitHub cung cấp để xử lý chuỗi và kiểm tra trạng thái trong biểu thức.
- **Ví dụ**: Hàm `startsWith(github.ref, 'refs/tags/v')` để kiểm tra xem có phải đang phát hành thẻ tag hay không.
- **Đừng nhầm**: Không thể gọi các hàm JavaScript tùy ý của riêng bạn; bạn chỉ được dùng các hàm chuẩn mà GitHub Actions hỗ trợ.

## 📖 Định nghĩa
Contexts (Ngữ cảnh) là tập hợp các đối tượng dữ liệu chứa thông tin chi tiết về lần chạy workflow hiện tại, môi trường runner, các biến bí mật và sự kiện kích hoạt. Bạn có thể truy xuất các thông tin này ở bất kỳ đâu trong tệp YAML bằng cách đặt chúng bên trong biểu thức (Expressions) có cú pháp dấu ngoặc kép `${{ <expression> }}`.

## 💡 Tại sao cần
Tệp YAML thông thường chỉ là văn bản tĩnh. Cú pháp Expressions và Contexts biến tệp cấu hình thành kịch bản động thông minh: bạn có thể kiểm tra xem commit hiện tại có phải nhánh phát hành chính thức không, gắn nhãn tên lập trình viên đã tạo PR, hoặc kiểm tra kết quả bài kiểm thử trước đó để quyết định có chạy tiếp hay không.

## 🧠 Mental Model
Hãy hình dung tệp YAML như bức thư hợp đồng mẫu in sẵn có các ô trống cần điền thông tin. Biểu thức `${{ expression }}` chính là những chiếc thẻ giữ chỗ thông minh: khi đưa hợp đồng vào máy in, hệ thống tự động tra cứu cơ sở dữ liệu ngữ cảnh (Context) để điền tên khách hàng, ngày ký và số tiền thanh toán vào đúng vị trí hoàn toàn tự động.

## 📊 Sơ đồ minh họa
```mermaid
flowchart LR
    Contexts[Contexts: github, runner, env, secrets] --> Engine[Bộ xử lý biểu thức ${{ expr }}]
    Engine --> String[Nội suy chuỗi: Tên repo, tác giả]
    Engine --> Condition[Đánh giá điều kiện: if: github.ref == 'refs/heads/main']
```

## 🏢 Ví dụ thực tế
Một nhóm phát triển quản lý kho lưu trữ đa ngôn ngữ thiết lập bước gửi thông báo tự động. Họ dùng biểu thức nội suy: `run: echo "Kỹ sư ${{ github.actor }} vừa kích hoạt sự kiện ${{ github.event_name }} trên nhánh ${{ github.ref_name }}"`. Khi lập trình viên Tuấn đẩy code, hệ thống tự động thay thế biểu thức và in ra log rõ ràng. Đồng thời, bước deploy chỉ chạy nếu điều kiện `if: ${{ startsWith(github.ref, 'refs/tags/v') }}` được thỏa mãn.

## 💻 Command & Cú pháp
```bash
# In ra tên kho lưu trữ hiện tại thông qua ngữ cảnh github
echo "${{ github.repository }}"

# In ra tên tài khoản người thực hiện thao tác
echo "${{ github.actor }}"

# In ra tên loại sự kiện kích hoạt workflow
echo "${{ github.event_name }}"
```

## 🔍 Giải thích command
- `echo "${{ github.repository }}"`: Đọc và in ra chuỗi định danh `owner/repo` của dự án từ ngữ cảnh hệ thống.
- `echo "${{ github.actor }}"`: Trả về tên đăng nhập GitHub của kỹ sư vừa tạo commit hoặc gửi Pull Request.
- `echo "${{ github.event_name }}"`: Xác định loại sự kiện kích hoạt (`push`, `pull_request` hoặc `workflow_dispatch`).

## ⚠️ Sai lầm phổ biến
- Bao bọc `${{ }}` bên trong mệnh đề `if:` một cách rườm rà (GitHub Actions tự động hiểu nội dung `if:` là biểu thức).
- So sánh phân biệt hoa thường sai lệch trong các chuỗi định danh nhánh Git.
- Cố gắng viết các đoạn mã hàm JavaScript phức tạp không được hệ thống hỗ trợ bên trong biểu thức YAML.

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.

1. Tạo tệp workflow thử nghiệm ngữ cảnh và biểu thức:
   ```yaml
   name: Contexts Demo
   on: [workflow_dispatch]
   jobs:
     inspect:
       runs-on: ubuntu-latest
       steps:
         - name: Hiển thị thông tin ngữ cảnh
           run: |
             echo "Repository: ${{ github.repository }}"
             echo "Actor: ${{ github.actor }}"
             echo "Ref: ${{ github.ref }}"
             echo "Runner OS: ${{ runner.os }}"
         - name: Kiểm tra nhánh chính
           if: github.ref == 'refs/heads/main'
           run: echo "Đang chạy trên nhánh chính main!"
   ```
2. Đẩy file lên GitHub và bấm Run workflow.
3. Quan sát các giá trị ngữ cảnh được in ra chi tiết trong log console.

## 💡 Hint & mẹo
- Trong thuộc tính `if:`, bạn có thể viết ngắn gọn `if: github.ref == 'refs/heads/main'` mà không cần bọc `${{ }}`.
- Kết hợp hàm `success()` hoặc `failure()` trong điều kiện để bắt trọn trạng thái của các bước trước đó.

## ✅ Validation & Kết quả mong đợi
- Log console in ra chính xác thông tin repository, tên tài khoản và hệ điều hành Runner tương ứng.
- Bước có điều kiện `if:` chỉ chạy khi điều kiện so sánh trả về giá trị `true`.

## ❓ Quiz nhanh
Hãy hoàn thành bài trắc nghiệm bên dưới để kiểm tra mức độ nắm vững cú pháp ngữ cảnh và biểu thức trong GitHub Actions.

## 🚀 Thử thách nâng cao
Tìm hiểu cách kết hợp hàm `format()` và ngữ cảnh `github.run_number` để tạo ra một mã định danh phiên bản độc nhất cho mỗi lần thực thi workflow.

## 📝 Tổng kết
- Contexts cung cấp thông tin toàn diện về phiên chạy (`github`, `runner`, `env`, `secrets`).
- Cú pháp `${{ <expression> }}` dùng để tính toán và nội suy giá trị động vào tệp cấu hình YAML.
- Hỗ trợ các hàm chuỗi hữu ích như `contains()`, `startsWith()`, `endsWith()` và hàm trạng thái `success()`.
