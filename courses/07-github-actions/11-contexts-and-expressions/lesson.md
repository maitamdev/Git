# Contexts & Expressions: ${{ github.ref }}, matrix và toán tử

---

## 🎯 Mục tiêu bài học
- Hiểu rõ khái niệm Contexts trong GitHub Actions: github, env, vars, secrets, matrix, steps, runner.
- Sử dụng cú pháp biểu thức ${{ <expression> }} để tính toán và truy xuất dữ liệu động trong YAML.
- Làm chủ các toán tử so sánh (==, !=), logic (&&, ||, !) và hàm chuỗi: contains, startsWith, endsWith.

---

## 📖 Định nghĩa
> Contexts (Ngữ cảnh) là tập hợp các đối tượng dữ liệu có cấu trúc chứa thông tin chi tiết về lần chạy workflow hiện tại, môi trường runner, các biến bí mật, và sự kiện kích hoạt. Bạn có thể truy cập các thông tin này ở bất kỳ đâu trong tệp YAML bằng cách đặt chúng bên trong biểu thức (Expressions) có cú pháp dấu ngoặc kép ${{ <expression> }}. Công cụ biểu thức của GitHub Actions hỗ trợ đầy đủ các phép toán số học, so sánh bằng, toán tử logic và các hàm kiểm tra chuỗi tích hợp.

---

## 🤔 Tại sao cần?
Tệp định dạng YAML thông thường chỉ là tập dữ liệu văn bản tĩnh không có trí thông minh hay khả năng tự thích ứng. Cú pháp Expressions và Contexts biến tệp cấu hình tĩnh thành một kịch bản động mạnh mẽ và linh hoạt: bạn có thể kiểm tra xem commit hiện tại có phải là nhánh phát hành chính thức không (${{ github.ref == 'refs/heads/main' }}), gắn thẻ tên lập trình viên đã tạo PR (${{ github.actor }}), hoặc chỉ định tên artifact theo mã băm commit độc nhất trong dự án.

---

## 🧠 Mental Model & Mô hình tư duy
Hãy hình dung tệp YAML như một bức thư mẫu hợp đồng được in sẵn với các chỗ trống cần điền thông tin (template). Biểu thức ${{ expression }} chính là những chiếc thẻ giữ chỗ thông minh: khi hệ thống đưa hợp đồng vào máy in, máy in tự động tra cứu cơ sở dữ liệu ngữ cảnh (Context) để điền tên khách hàng, ngày ký và số tiền thanh toán vào đúng vị trí một cách hoàn toàn tự động.

---

## 🖼️ Sơ đồ minh họa
```text
Context Data Sources:
┌────────────────────────────────────────────────────────┐
│ github:  [actor: "octocat", ref: "refs/heads/main"]   │
│ runner:  [os: "Linux", arch: "X64"]                    │
│ env:     [CUSTOM_KEY: "custom_value"]                 │
│ secrets: [DEPLOY_TOKEN: "***"]                         │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼ Cú pháp nội suy
        run: echo "Actor is ${{ github.actor }}"
        if: ${{ github.ref == 'refs/heads/main' && success() }}
```

---

## 🌎 Ví dụ thực tế
Một nhóm phát triển quản lý kho lưu trữ đa ngôn ngữ thiết lập bước gửi thông báo tự động. Họ sử dụng biểu thức nội suy: run: echo "Kỹ sư ${{ github.actor }} vừa kích hoạt sự kiện ${{ github.event_name }} trên nhánh ${{ github.ref_name }}". Khi một lập trình viên tên Tuấn đẩy mã nguồn lên nhánh phát triển, hệ thống tự động thay thế biểu thức và in ra: "Kỹ sư tuan-dev vừa kích hoạt sự kiện push trên nhánh dev". Đồng thời, một bước thông báo chúc mừng chỉ chạy nếu điều kiện if: ${{ startsWith(github.ref, 'refs/tags/v') }} được thỏa mãn khi phát hành phiên bản mới.

---

## 💻 Command & Lệnh thao tác
```bash
echo "${{ github.repository }}"
echo "${{ github.actor }}"
echo "${{ github.event_name }}"
```

---

## 🔍 Giải thích chi tiết lệnh
Các câu lệnh mẫu minh họa cách đọc dữ liệu từ ngữ cảnh github trực tiếp bên trong khối run của step: tên kho lưu trữ hiện tại, tên tài khoản thực hiện thao tác và tên loại sự kiện kích hoạt.

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Sử dụng cú pháp biểu thức bên trong mệnh đề `if**: ` không cần thiết (GitHub Actions tự động hiểu nội dung của `if:` là biểu thức mà không bắt buộc phải có `${{ }}`).
2. **So sánh phân biệt hoa thường sai lệch trong các chuỗi định danh nhánh Git.**: 
3. **Sử dụng hàm không được hỗ trợ hoặc cố gắng viết mã JavaScript phức tạp bên trong biểu thức YAML.**: 

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Tạo một Step in ra thông tin người thực hiện `${{ github.actor }}` và nhánh hiện tại.
2. Sử dụng hàm `contains()` để kiểm tra xem thông điệp commit có chứa từ khóa "skip-ci" hay không.
3. Thực hành kết hợp toán tử logic `&&` để tạo một điều kiện kép kiểm tra môi trường.

---

## 💡 Gợi ý thực hiện (Hint)
> Trong thuộc tính `if:`, bạn có thể viết trực tiếp `if: github.ref == 'refs/heads/main'` mà không cần bao bọc bởi dấu `${{ }}`.

---

## ✅ Kiểm tra kết quả (Validation)
Log in ra chính xác các giá trị ngữ cảnh động tương ứng với tài khoản và nhánh thực tế.

---

## ❓ Câu hỏi ôn tập (Quiz)
Kiểm tra mức độ thành thạo về cú pháp ngữ cảnh và biểu thức qua các câu hỏi sau.

---

## 🔥 Thử thách nâng cao (Challenge)
Làm thế nào để sử dụng hàm format() hoặc phép nối chuỗi trong biểu thức GitHub Actions để tạo ra một tên tệp báo cáo duy nhất kết hợp giữa tên nhánh và ngày tháng?

---

## 📚 Tổng kết kiến thức
- Contexts cung cấp thông tin toàn diện về phiên chạy (`github`, `runner`, `env`, `secrets`).
- Cú pháp `${{ <expression> }}` dùng để tính toán và nội suy giá trị động vào tệp cấu hình YAML.
- Hỗ trợ các hàm chuỗi hữu ích như `contains()`, `startsWith()`, `endsWith()` và hàm trạng thái `success()`.
