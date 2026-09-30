# .github/workflows và cú pháp YAML chuẩn

---

## 🎯 Mục tiêu bài học
- Nắm vững vị trí bắt buộc của tệp workflow: thư mục .github/workflows/ với phần mở rộng .yml hoặc .yaml.
- Làm chủ các quy tắc định dạng YAML: thụt lề bằng 2 dấu cách, danh sách gạch đầu dòng, cặp key-value.
- Nhận biết và khắc phục các lỗi cú pháp thụt lề YAML phổ biến làm workflow bị từ chối biên dịch.

---

## 📖 Định nghĩa
> Trong GitHub Actions, toàn bộ định nghĩa luồng công việc phải được lưu trữ dưới dạng các tệp văn bản định dạng YAML nằm chính xác tại thư mục .github/workflows/ trong nhánh gốc của kho lưu trữ. Cú pháp YAML (YAML Ain't Markup Language) là định dạng dữ liệu có cấu trúc dựa trên thụt lề khoảng trắng (indentation) nghiêm ngặt để biểu diễn quan hệ cha con giữa các khối dữ liệu, danh sách và ánh xạ từ khóa một cách mạch lạc và chuẩn mực.

---

## 🤔 Tại sao cần?
Hơn 80% sự cố ban đầu của các kỹ sư mới làm quen với CI/CD bắt nguồn từ việc vi phạm quy tắc thụt dòng trong tệp YAML, chẳng hạn như dùng phím Tab thay vì dấu cách Space, thụt dòng sai cấp độ giữa steps và jobs, hoặc đặt sai vị trí thư mục khiến GitHub hoàn toàn không nhận diện được workflow. Việc thành thạo cấu trúc YAML chuẩn giúp bạn viết kịch bản sạch sẽ, dễ đọc và loại bỏ hoàn toàn các lỗi cú pháp ngớ ngẩn gây gián đoạn đường ống.

---

## 🧠 Mental Model & Mô hình tư duy
Hãy hình dung tệp YAML như một bản vẽ sơ đồ tổ chức phòng ban trong một tập đoàn. Mỗi cấp bậc quản lý được biểu diễn bằng một khoảng thụt lề thụt vào trong 2 bước chân (2 spaces). Nếu một nhân viên thực thi (step) đứng ngang hàng với giám đốc bộ phận (job), toàn bộ cấu trúc quyền lực sẽ bị xáo trộn và máy quét kiểm duyệt tự động sẽ từ chối phê duyệt văn bản ngay lập tức.

---

## 🖼️ Sơ đồ minh họa
```text
Thư mục kho lưu trữ (Repo Root)
└── .github/
    └── workflows/
        ├── ci.yml          <── Tệp cấu hình chuẩn (.yml hoặc .yaml)
        └── release.yml

Quy tắc 2 Spaces Indentation:
name: CI Pipeline           # Cấp 0 (Không thụt lề)
on: push                    # Cấp 0
jobs:                       # Cấp 0
  test:                     # Cấp 1 (Thụt vào 2 spaces: Tên Job)
    runs-on: ubuntu-latest  # Cấp 2 (Thụt vào 4 spaces: Thuộc tính Job)
    steps:                  # Cấp 2
      - name: Checkout      # Cấp 3 (Thụt vào 6 spaces: Danh sách Step)
```

---

## 🌎 Ví dụ thực tế
Một kỹ sư phần mềm tạo tệp cấu hình .github/workflows/ci.yml cho dự án Node.js. Ban đầu, kỹ sư này vô tình dùng phím Tab trên bàn phím để thụt dòng mục steps. Khi đẩy lên GitHub, tab Actions hiển thị thông báo lỗi màu đỏ đậm: "Invalid workflow file: mapping values are not allowed in this context". Kỹ sư mở trình soạn thảo, kích hoạt chế độ hiển thị ký tự ẩn (Show Invisibles), thay thế toàn bộ ký tự Tab bằng 2 dấu cách Space và đẩy lại commit. GitHub lập tức nhận diện thành công và huy hiệu build chuyển sang màu vàng đang chạy.

---

## 💻 Command & Lệnh thao tác
```bash
mkdir -p .github/workflows
touch .github/workflows/ci.yml
yamllint .github/workflows/ci.yml
```

---

## 🔍 Giải thích chi tiết lệnh
Lệnh mkdir -p tạo cây thư mục chuẩn .github/workflows, touch tạo tệp cấu hình mới, và yamllint kiểm tra tính hợp lệ về thụt lề và cú pháp của tệp YAML trước khi đưa vào hệ thống kiểm soát phiên bản để ngăn chặn lỗi sớm.

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Sử dụng phím Tab thay vì dấu cách Space**:  YAML tiêu chuẩn nghiêm cấm tuyệt đối ký tự Tab để thụt dòng.
2. **Đặt tệp sai đường dẫn như `.github/workflow/` (thiếu chữ s) khiến GitHub hoàn toàn bỏ qua tệp.**: 
3. **Viết sai phần mở rộng tệp thành `.json` hoặc `.txt` thay vì `.yml` hoặc `.yaml`.**: 

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Tạo cấu trúc thư mục `.github/workflows/` trong kho lưu trữ thử nghiệm.
2. Khởi tạo tệp tin `ci.yml` và nhập cấu hình mẫu tối thiểu gồm name, on, jobs.
3. Kiểm tra định dạng và đảm bảo toàn bộ tệp chỉ sử dụng 2 dấu cách cho mỗi cấp độ thụt lề.

---

## 💡 Gợi ý thực hiện (Hint)
> Hãy cấu hình trình soạn thảo VS Code với thuộc tính `"editor.tabSize": 2` và `"editor.insertSpaces": true`.

---

## ✅ Kiểm tra kết quả (Validation)
Tệp YAML được phân tích cú pháp hợp lệ mà không có bất kỳ lỗi linter nào.

---

## ❓ Câu hỏi ôn tập (Quiz)
Kiểm tra kiến thức về quy tắc định dạng YAML và cấu trúc tệp workflow qua các câu hỏi sau.

---

## 🔥 Thử thách nâng cao (Challenge)
Giải thích tại sao định dạng YAML lại được chọn cho GitHub Actions thay vì JSON hay XML, và ưu thế của nó về khả năng đọc hiểu của con người là gì?

---

## 📚 Tổng kết kiến thức
- Tệp Workflow bắt buộc phải nằm trong thư mục `.github/workflows/` với đuôi `.yml` hoặc `.yaml`.
- YAML sử dụng thụt dòng bằng 2 dấu cách Space để phân cấp dữ liệu, cấm dùng phím Tab.
- Cấu trúc tối thiểu của một workflow luôn cần có các khóa: `name`, `on`, và `jobs`.
