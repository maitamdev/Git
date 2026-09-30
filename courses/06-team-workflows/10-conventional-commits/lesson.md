# Conventional Commits

---

## 🎯 Mục tiêu
- Hiểu rõ đặc tả chuẩn Conventional Commits phiên bản 1.0.0 và giá trị to lớn của nó đối với tự động hóa phần mềm.
- Làm chủ cấu trúc chuẩn: `<type>[optional scope]: <description>` cùng các phần tùy chọn tử tế Body và Footer.
- Sử dụng chính xác các tiền tố định danh phổ biến: feat, fix, docs, style, refactor, perf, test, build, ci, chore.
- Biểu diễn các thay đổi phá vỡ tính tương thích ngược (BREAKING CHANGE) bằng dấu chấm than `!` hoặc footer chuyên dụng.

---

## 📖 Định nghĩa
> Conventional Commits là một quy ước định dạng thông điệp commit có cấu trúc chuẩn mực cao và dễ đọc cho cả con người lẫn máy tính. Đặc tả này thiết lập một bộ quy tắc nhẹ nhàng nhưng nhất quán, yêu cầu mọi commit phải bắt đầu bằng một định danh thể loại rõ ràng (như `feat`, `fix`, `chore`, `refactor`), đi kèm với phạm vi tác động tùy chọn, mô tả súc tích và phần nội dung mở rộng. Nhờ có cấu trúc máy tính có thể phân tích cú pháp (parseable) này, hệ thống CI/CD có thể tự động tính toán số phiên bản Semantic Versioning và tự động sinh nhật ký thay đổi (Changelog) hoàn hảo.

---

## 🤔 Tại sao cần?
Lịch sử commit với những câu từ mơ hồ, vô nghĩa như "fix bug", "update", "done task", hay "asdasd" là một cơn ác mộng khi cần truy tìm nguyên nhân phát sinh lỗi hoặc tổng hợp tài liệu phát hành cho khách hàng. Conventional Commits biến lịch sử dự án thành một câu chuyện tường minh, có tính tổ chức cao: nhìn vào danh sách commit, bất kỳ ai cũng biết ngay có bao nhiêu tính năng mới được thêm vào, bao nhiêu lỗi đã sửa và có thay đổi nào gây hỏng tương thích với phiên bản cũ hay không.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung bạn đang phân loại hồ sơ bệnh án hoặc kiện hàng bưu chính. Thay vì dán một mảnh giấy viết tay nghuệch ngoạc "kiện hàng", bưu điện yêu cầu dán nhãn chuẩn hóa có mã vạch: loại dịch vụ Hỏa tốc (`feat`), Sửa chữa bảo hành (`fix`), Bảo trì bảo dưỡng (`chore`), cùng điểm đến cụ thể `(checkout)`. Nhờ nhãn chuẩn này, hệ thống băng chuyền tự động có thể quét mã vạch và phân loại hàng ngàn kiện hàng vào đúng toa tàu mà không cần con người phải bóc từng kiện ra đọc nội dung.

---

## 🖼 Sơ đồ
```text
Cấu trúc giải phẫu của một Conventional Commit chuẩn mực:
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]

Ví dụ thực tế:
feat(auth)!: add OAuth2 login with Google and GitHub

BREAKING CHANGE: The legacy basic auth endpoint /api/v1/login is removed.
Refs: #452
```

---

## 🌎 Ví dụ thực tế
Một kỹ sư phần mềm thực hiện một loạt các thay đổi trong ngày làm việc. Thay vì viết thông điệp lộn xộn, kỹ sư tuân thủ nghiêm ngặt chuẩn Conventional Commits. Khi thêm cổng thanh toán PayPal, kỹ sư commit: `feat(payment): add PayPal smart button integration`. Khi sửa lỗi làm tròn số tiền tệ ở giỏ hàng, kỹ sư commit: `fix(cart): correct currency rounding for Japanese Yen`. Khi tái cấu trúc lại thư mục tiện ích mà không thay đổi tính năng, kỹ sư viết: `refactor(utils): split date helpers into separate modular files`. Đến cuối tuần khi chuẩn bị phát hành, công cụ tự động quét qua 50 commit này và tạo ra một tệp CHANGELOG.md đẹp mắt cùng số phiên bản mới mà kỹ sư không cần tốn một giây gõ tay nào.

---

## 💻 Command
```bash
git commit -m "feat(api): add endpoint for user registration"
git commit -m "fix(auth): prevent session timeout during checkout"
git commit -m "feat(core)!: drop support for Node 16"
```

---

## 🔍 Giải thích command
- `feat(scope)`: Khai báo tính năng mới cung cấp giá trị trực tiếp cho người sử dụng phần mềm.
- `fix(scope)`: Khai báo việc vá một lỗi phát sinh trong mã nguồn hiện tại.
- `!` sau scope: Đánh dấu có thay đổi phá vỡ tương thích ngược (Breaking Change) cần tăng Major version.

---

## ⚠️ Sai lầm phổ biến
1. **Viết chữ in hoa cho type hoặc viết sai chính tả, ví dụ gõ `Feat**: `, `FEATURE
2. **Đặt dấu chấm ở cuối dòng tiêu đề description đầu tiên**:  Quy chuẩn khuyến nghị không dùng dấu chấm cuối tiêu đề.
3. **Sử dụng `feat` cho các công việc nội bộ như nâng cấp thư viện phụ thuộc (phải dùng `chore` hoặc `build`).**: Sử dụng `feat` cho các công việc nội bộ như nâng cấp thư viện phụ thuộc (phải dùng `chore` hoặc `build`).

---

## 🧪 Lab
1. Viết 3 commit mẫu tuân thủ đúng chuẩn Conventional Commits cho các hành động: thêm trang, sửa lỗi nút bấm và viết tài liệu hướng dẫn.
2. Sử dụng dấu chấm than `!` để đánh dấu một thay đổi làm thay đổi định dạng dữ liệu API trả về.

---

## 💡 Hint
> Dòng tiêu đề đầu tiên luôn viết ở thể mệnh lệnh hiện tại ngắn gọn dưới 72 ký tự.

---

## ✅ Validation
- Các công cụ tự động hóa như standard-version hoặc semantic-release có thể đọc và phân tích cú pháp toàn bộ commit.

---

## ❓ Quiz
Hãy làm bài trắc nghiệm dưới đây về chuẩn thông điệp Conventional Commits.

---

## 🔥 Challenge
Thiết lập công cụ commitlint bằng husky trong dự án để tự động từ chối bất kỳ commit nào không tuân thủ Conventional Commits.

---

## 📚 Tổng kết
- Conventional Commits chuẩn hóa thông điệp commit theo cấu trúc mà máy tính có thể phân tích cú pháp được.
- Phân loại rõ ràng mục đích thay đổi qua các tiền tố: feat, fix, chore, refactor, docs, test.
- Là nền tảng tự động hóa việc tính toán số phiên bản Semantic Versioning và sinh Changelog tự động.
