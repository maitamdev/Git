# .github/workflows và cú pháp YAML chuẩn

## 🎯 Mục tiêu
- Nắm vững vị trí bắt buộc của tệp workflow: thư mục `.github/workflows/` với phần mở rộng `.yml` hoặc `.yaml`.
- Làm chủ các quy tắc định dạng YAML: thụt lề bằng 2 dấu cách, danh sách gạch đầu dòng, cặp key-value.
- Nhận biết và khắc phục các lỗi cú pháp thụt lề YAML phổ biến làm workflow bị từ chối biên dịch.

## 🧩 Từ khóa hôm nay
### YAML Indentation
- **Nói dễ hiểu**: Quy tắc bắt buộc dùng dấu cách Space để thụt đầu dòng thể hiện quan hệ cha con giữa các khối dữ liệu.
- **Ví dụ**: Dùng đúng 2 dấu cách cho mỗi cấp độ phân cấp; `steps` thụt vào 4 khoảng trắng dưới `jobs`.
- **Đừng nhầm**: Nghiêm cấm dùng phím Tab; dùng Tab sẽ khiến trình phân tích YAML báo lỗi ngay lập tức.

### .github/workflows
- **Nói dễ hiểu**: Thư mục quy ước duy nhất nơi GitHub tự động quét tìm và kích hoạt các tệp kịch bản Actions.
- **Ví dụ**: Đặt tệp `.github/workflows/ci.yml` ở thư mục gốc của repository.
- **Đừng nhầm**: Chú ý chữ `workflows` có chữ `s` ở cuối; nếu đặt ở `.github/workflow/` thì hệ thống sẽ bỏ qua hoàn toàn.

### Key-Value Mapping
- **Nói dễ hiểu**: Cặp khóa - giá trị phân tách bởi dấu hai chấm và khoảng trắng biểu diễn dữ liệu trong YAML.
- **Ví dụ**: Cặp `runs-on: ubuntu-latest` gán giá trị hệ điều hành cho thuộc tính của Job.
- **Đừng nhầm**: Bắt buộc phải có một khoảng trắng sau dấu hai chấm (`name: Build` chứ không được viết liền `name:Build`).

## 📖 Định nghĩa
Trong GitHub Actions, toàn bộ kịch bản tự động hóa bắt buộc phải được lưu trữ dưới dạng các tệp văn bản YAML nằm chính xác tại thư mục `.github/workflows/` trong nhánh của kho lưu trữ. Cú pháp YAML dựa trên thụt lề khoảng trắng nghiêm ngặt để biểu diễn phân cấp giữa workflow, job, step và các tham số cấu hình.

## 💡 Tại sao cần
Hơn 80% sự cố ban đầu của kỹ sư mới làm quen với GitHub Actions bắt nguồn từ việc vi phạm cú pháp YAML: dùng phím Tab thay vì dấu cách Space, thụt dòng sai cấp độ giữa steps và jobs, hoặc viết sai đường dẫn thư mục. Nắm vững cú pháp YAML chuẩn giúp bạn viết kịch bản sạch sẽ, dễ bảo trì và loại bỏ lỗi ngớ ngẩn.

## 🧠 Mental Model
Hãy hình dung tệp YAML như sơ đồ tổ chức phòng ban của công ty. Mỗi cấp bậc quản lý được biểu diễn bằng khoảng thụt lề 2 bước chân (2 spaces). Nếu một nhân viên thực thi (`step`) đứng ngang hàng với trưởng phòng (`job`), toàn bộ trật tự quản lý sẽ bị xáo trộn và hệ thống quét tự động sẽ từ chối phê duyệt ngay.

## 📊 Sơ đồ minh họa
```mermaid
flowchart TD
    Root[Thư mục gốc Repository] --> DotGithub[Thư mục: .github/]
    DotGithub --> Workflows[Thư mục: workflows/ - có chữ s]
    Workflows --> File1[ci.yml - Kịch bản kiểm thử]
    Workflows --> File2[deploy.yml - Kịch bản phát hành]
```

## 🏢 Ví dụ thực tế
Một kỹ sư tạo tệp `.github/workflows/ci.yml` cho dự án Node.js. Ban đầu, kỹ sư vô tình dùng phím Tab trên bàn phím để thụt dòng mục steps. Khi đẩy lên GitHub, thẻ Actions báo lỗi đỏ: "Invalid workflow file: mapping values are not allowed in this context". Kỹ sư mở VS Code, bật hiển thị ký tự ẩn, thay toàn bộ ký tự Tab bằng 2 dấu cách Space và đẩy lại. GitHub lập tức nhận diện thành công và hiển thị tiến trình đang chạy màu vàng.

## 💻 Command & Cú pháp
```bash
# Tạo thư mục chuẩn workflows
mkdir -p .github/workflows

# Tạo tệp cấu hình kịch bản tự động
touch .github/workflows/ci.yml

# Kiểm tra cú pháp YAML bằng công cụ dòng lệnh nếu có
yamllint .github/workflows/ci.yml
```

## 🔍 Giải thích command
- `mkdir -p .github/workflows`: Tạo cấu trúc thư mục quy chuẩn theo đúng đặc tả của GitHub Actions.
- `touch .github/workflows/ci.yml`: Khởi tạo tệp cấu hình mới với phần mở rộng `.yml` hợp lệ.
- `yamllint`: Kiểm tra tính hợp lệ về thụt lề và quy tắc định dạng của tệp trước khi đẩy lên máy chủ.

## ⚠️ Sai lầm phổ biến
- Dùng phím Tab thay vì dấu cách Space để thụt lề (YAML cấm tuyệt đối ký tự Tab).
- Đặt tệp sai đường dẫn như `.github/workflow/` (thiếu chữ s) khiến GitHub hoàn toàn bỏ qua kịch bản.
- Viết sai phần mở rộng tệp thành `.json` hoặc `.txt` thay vì `.yml` hoặc `.yaml`.

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.

1. Mở terminal và tạo thư mục `.github/workflows/` bằng lệnh `mkdir -p .github/workflows`.
2. Tạo tệp `ci.yml` trong thư mục vừa tạo với nội dung mẫu:
   ```yaml
   name: CI Pipeline
   on: [push]
   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - run: echo "Hello GitHub Actions"
   ```
3. Kiểm tra xem mỗi tầng thụt lề có dùng đúng 2 dấu cách Space hay không.
4. Đẩy commit lên GitHub và vào tab Actions để quan sát workflow đầu tiên được thực thi.

## 💡 Hint & mẹo
- Trong trình soạn thảo VS Code, bạn nên cài đặt `"editor.tabSize": 2` và `"editor.insertSpaces": true` để khi gõ phím Tab hệ thống tự động đổi thành 2 dấu cách.
- Cài tiện ích mở rộng GitHub Actions trên VS Code để được gợi ý cú pháp và bắt lỗi YAML ngay khi gõ.

## ✅ Validation & Kết quả mong đợi
- Tệp YAML được phân tích cú pháp hợp lệ mà không có lỗi thụt lề hoặc lỗi mapping.
- Tab Actions trên GitHub nhận diện được workflow và tự động kích hoạt khi có commit mới.

## ❓ Quiz nhanh
Hãy làm bài trắc nghiệm bên dưới để kiểm tra mức độ nắm vững quy tắc định dạng YAML và vị trí tệp workflow.

## 🚀 Thử thách nâng cao
Giải thích tại sao định dạng YAML lại được chọn cho GitHub Actions thay vì JSON hay XML, và ưu thế của nó về tính trực quan đối với con người là gì?

## 📝 Tổng kết
- Tệp workflow bắt buộc phải đặt tại `.github/workflows/` với phần mở rộng `.yml` hoặc `.yaml`.
- Luôn sử dụng 2 dấu cách Space cho mỗi cấp độ thụt lề và không bao giờ dùng phím Tab.
- Cú pháp YAML phân cấp rõ ràng giúp kịch bản tự động hóa dễ đọc và dễ bảo trì.
