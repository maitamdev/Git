# Chiến lược ma trận kiểm thử đa môi trường (Matrix Strategy)

---

## 🎯 Mục tiêu bài học
- Hiểu rõ khái niệm và sức mạnh của Matrix Strategy trong việc mở rộng kiểm thử đa cấu hình tự động.
- Biết cách khai báo ma trận đa chiều: kết hợp nhiều phiên bản ngôn ngữ và nhiều hệ điều hành.
- Sử dụng các thuộc tính nâng cao: include (bổ sung trường hợp đặc biệt), exclude (loại trừ tổ hợp không mong muốn) và max-parallel.

---

## 📖 Định nghĩa
> Chiến lược ma trận (Matrix Strategy) là cơ chế cao cấp trong GitHub Actions cho phép bạn sử dụng các biến cấu hình để tự động tạo ra một tập hợp nhiều Job con chạy song song từ một định nghĩa Job duy nhất. Bằng cách khai báo khối từ khóa `strategy: matrix:`, GitHub Actions sẽ tự động tính toán tích Đề-các (Cartesian product) của tất cả các mảng giá trị đầu vào để sinh ra toàn bộ các tổ hợp môi trường cần kiểm thử một cách nhanh chóng và tối ưu.

---

## 🤔 Tại sao cần?
Khi phát triển một thư viện hoặc phần mềm đa nền tảng, việc chỉ kiểm thử trên một phiên bản Node.js hay một hệ điều hành duy nhất là cực kỳ mạo hiểm. Có những tính năng hoạt động hoàn hảo trên Node 20 trên Linux nhưng lại bị lỗi trên Node 18 hoặc trên Windows do khác biệt về đường dẫn tệp tin. Nếu không có Matrix, bạn sẽ phải sao chép tệp YAML ra hàng chục Job giống hệt nhau, gây ác mộng khi cần bảo trì.

---

## 🧠 Mental Model & Mô hình tư duy
Hãy hình dung một xưởng sản xuất quần áo may thử nghiệm một mẫu áo sơ mi mới. Thay vì may thủ công từng cái một, người quản lý lập một bảng ma trận gồm 3 Kích cỡ (S, M, L) và 3 Màu sắc (Đỏ, Xanh, Trắng). Bằng một lệnh duy nhất, hệ thống tự động sinh ra 9 tổ hợp sản phẩm khác nhau (3 x 3 = 9) và giao cho 9 thợ may thực hiện cùng một lúc để kiểm tra độ vừa vặn của từng màu trên từng kích cỡ.

---

## 🖼️ Sơ đồ minh họa
```text
Tích Đề-các của Matrix Strategy:
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest]     (2 giá trị)
    node: [18, 20]                          (2 giá trị)

Sinh ra 4 Jobs chạy SONG SONG:
┌────────────────────────────────────────┐
│ • test (os: ubuntu-latest, node: 18)   │
│ • test (os: ubuntu-latest, node: 20)   │
│ • test (os: windows-latest, node: 18)  │
│ • test (os: windows-latest, node: 20)  │
└────────────────────────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Nhóm phát triển một thư viện công cụ dòng lệnh mã nguồn mở thiết lập ma trận kiểm thử: hệ điều hành gồm [ubuntu-latest, windows-latest, macos-latest] và phiên bản Node gồm [18, 20, 22]. Khi một lập trình viên gửi Pull Request, GitHub Actions tự động phân rã thành 9 Jobs chạy đồng thời trên 9 máy ảo độc lập. Kết quả cho thấy 8 Jobs đều báo xanh, nhưng Job chạy trên Windows với Node 18 bị đỏ do hàm xử lý dấu gạch chéo đường dẫn `\` của Windows. Lập trình viên lập tức phát hiện và sửa lỗi ngay trước khi người dùng thực tế tải thư viện về.

---

## 💻 Command & Lệnh thao tác
```bash
npm test
node -v
```

---

## 🔍 Giải thích chi tiết lệnh
Các câu lệnh bên trong Step của Job ma trận sử dụng biến ngữ cảnh `${{ matrix.node }}` và `${{ matrix.os }}` để cài đặt chính xác phiên bản môi trường cho từng máy ảo cụ thể.

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Tạo ma trận quá lớn (ví dụ**:  5 OS x 5 Browser x 5 Node = 125 Jobs) làm cạn kiệt toàn bộ hạn ngạch tính toán miễn phí của tài khoản.
2. **Không sử dụng thuộc tính `fail-fast**:  false` khi muốn xem toàn bộ kết quả của mọi tổ hợp kể cả khi một tổ hợp bị lỗi sớm.
3. **Sử dụng sai cú pháp của `include` hoặc `exclude` dẫn đến việc các tổ hợp không được loại trừ như mong đợi.**: 

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Khai báo khối `strategy: matrix:` cho Job `test` với biến `node: [18, 20]`.
2. Sử dụng `${{ matrix.node }}` trong step `actions/setup-node@v4` để cài đặt phiên bản tương ứng.
3. Quan sát trên giao diện xem hệ thống có tự động sinh ra 2 Job con chạy song song hay không.

---

## 💡 Gợi ý thực hiện (Hint)
> Đặt `fail-fast: false` bên trong `strategy:` nếu bạn muốn các phiên bản khác vẫn tiếp tục chạy khi có một phiên bản bị lỗi.

---

## ✅ Kiểm tra kết quả (Validation)
Hệ thống tự động mở rộng và hiển thị đầy đủ danh sách các Job con tương ứng với ma trận cấu hình.

---

## ❓ Câu hỏi ôn tập (Quiz)
Hãy kiểm tra khả năng tư duy và thiết lập ma trận kiểm thử qua các câu hỏi sau.

---

## 🔥 Thử thách nâng cao (Challenge)
Làm thế nào để sử dụng thuộc tính exclude trong ma trận gồm 3 hệ điều hành và 3 phiên bản Node để loại trừ duy nhất trường hợp Windows kết hợp với Node 16?

---

## 📚 Tổng kết kiến thức
- `strategy: matrix:` tự động tạo ra nhiều Job con bằng tích Đề-các của các danh sách giá trị.
- Giúp kiểm thử tương thích đa môi trường (hệ điều hành, phiên bản runtime, cơ sở dữ liệu) chỉ với một định nghĩa duy nhất.
- Hỗ trợ `include` để thêm biến phụ và `exclude` để loại bỏ các tổ hợp không hợp lệ.
