# Capstone Project: Xây dựng hoàn chỉnh CI/CD Pipeline cho Web Application

---

## 🎯 Mục tiêu bài học
- Tổng hợp toàn bộ kiến thức Level 7 để thiết kế một đường ống CI/CD chuẩn doanh nghiệp hoàn chỉnh từ A đến Z.
- Xây dựng quy trình tự động hóa đa tầng: Linting, Unit Testing, Matrix Build, Đóng gói Artifacts và Triển khai có phê duyệt.
- Tích hợp bảo vệ nhánh Branch Protection Rules, quản lý Secrets an toàn và xử lý phục hồi lỗi linh hoạt.

---

## 📖 Định nghĩa
> Bài học Capstone là thử thách thực chiến tổng hợp đỉnh cao của Level 7. Trong bài thực hành này, bạn sẽ vào vai một Kỹ sư DevOps trưởng (Lead DevOps Engineer) chịu trách nhiệm thiết kế, cấu hình và vận hành toàn bộ hạ tầng tự động hóa CI/CD cho một ứng dụng web thương mại điện tử hiện đại. Đường ống phải đáp ứng đầy đủ các tiêu chuẩn khắt khe nhất của ngành: kiểm tra an ninh, kiểm thử đa nền tảng, quản lý tạo phẩm và cổng triển khai sản xuất có kiểm duyệt.

---

## 🤔 Tại sao cần?
Biết từng mảnh ghép lý thuyết riêng lẻ (events, jobs, steps, matrix, secrets) là chưa đủ để vận hành một hệ thống thực tế. Giá trị thực sự của một kỹ sư phần mềm chuyên nghiệp thể hiện ở khả năng kết nối tất cả các thành phần đó lại với nhau thành một cỗ máy hoạt động trơn tru, tin cậy, bảo vệ sự ổn định của hệ thống kinh doanh 24/7 trước hàng trăm thay đổi mã nguồn mỗi tuần.

---

## 🧠 Mental Model & Mô hình tư duy
Hãy tưởng tượng bạn là tổng công trình sư thiết kế một nhà máy lọc dầu tự động hóa hoàn toàn. Dầu thô (mã nguồn mới) được đưa vào ống dẫn; hệ thống tự động lọc tạp chất và kiểm tra độ tinh khiết (CI lint & test); sau đó được phân tách thành các sản phẩm xăng dầu chuyên biệt theo ma trận tiêu chuẩn (matrix build); các sản phẩm đạt chuẩn được bơm vào kho bảo quản an toàn (artifacts); và cuối cùng, chỉ khi có chữ ký điện tử của giám đốc an toàn (environment approval), van dẫn mới được mở để cung cấp nhiên liệu ra thị trường (production deployment).

---

## 🖼️ Sơ đồ minh họa
```text
Kiến trúc Pipeline Capstone chuẩn Doanh nghiệp:
[Event: PR to main]
       │
       ├─────────────────────────┐
       ▼                         ▼
[Job 1: Code Lint & Format]  [Job 2: Security & Secret Scan]
       │                         │
       └────────────┬────────────┘
                    ▼
[Job 3: Matrix Unit Test (Node 18, 20 on Ubuntu & Windows)]
                    │
                    ▼ (needs: [lint, security, test])
[Job 4: Build Web Application & Upload Artifact]
                    │
                    ▼ (needs: build)
[Job 5: Deploy to Staging Environment]
                    │
                    ▼ (needs: staging, on: push main)
[Job 6: Deploy to Production (WAITING APPROVAL Gate)]
```

---

## 🌎 Ví dụ thực tế
Một công ty khởi nghiệp chuẩn bị ra mắt nền tảng thanh toán trực tuyến. Lập trình viên hoàn thành bài tập Capstone bằng việc tạo hai tệp workflow: `ci.yml` kiểm soát chất lượng mã nguồn trên mọi Pull Request và `deploy.yml` tự động hóa việc đưa sản phẩm lên các máy chủ đám mây. Khi một thành viên trong nhóm mở PR thêm chức năng giỏ hàng, đường ống lập tức khởi động 4 Jobs kiểm tra song song: lint mã nguồn, quét mã độc, chạy ma trận 4 bài kiểm thử trên cả Linux và Windows. Khi PR được duyệt và gộp vào nhánh chính, đường ống triển khai tự động kích hoạt, tạo gói nén artifact, đẩy lên môi trường Staging và gửi yêu cầu phê duyệt cho giám đốc kỹ thuật trước khi đưa lên Production. Toàn bộ quy trình diễn ra tự động 100%, không một sai sót.

---

## 💻 Command & Lệnh thao tác
```bash
gh pr create
gh pr checks
gh run watch
git push origin main
```

---

## 🔍 Giải thích chi tiết lệnh
Các câu lệnh trên đại diện cho chu trình làm việc trọn vẹn của một kỹ sư: mở Pull Request đề xuất tính năng mới, theo dõi trạng thái các bài kiểm tra tự động và giám sát tiến độ thực thi của toàn bộ pipeline.

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Để lọt các câu lệnh chạy thật trên máy chủ host thay vì mô phỏng trong môi trường an toàn.**: 
2. **Cấu hình sai thứ tự phụ thuộc `needs` khiến Job triển khai chạy trước khi bài kiểm thử kết thúc.**: 
3. **Làm lộ thông tin khóa bí mật trong log của Job đóng gói sản phẩm.**: 

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Xây dựng hoàn chỉnh tệp `.github/workflows/ci-cd-pipeline.yml` kết hợp đầy đủ các tính năng đã học.
2. Thiết lập ma trận kiểm thử cho ít nhất 2 phiên bản môi trường.
3. Cấu hình cổng phê duyệt an toàn cho Job triển khai sản xuất cuối cùng.

---

## 💡 Gợi ý thực hiện (Hint)
> Hãy vẽ sơ đồ các Job và thứ tự phụ thuộc ra giấy trước khi bắt đầu viết những dòng YAML đầu tiên.

---

## ✅ Kiểm tra kết quả (Validation)
Toàn bộ đồ thị đường ống hoàn thành với tất cả các cổng kiểm soát hoạt động chuẩn mực tuyệt đối.

---

## ❓ Câu hỏi ôn tập (Quiz)
Hãy hoàn thành bài kiểm tra tổng hợp kiến thức toàn diện của Level 7 CI/CD Capstone.

---

## 🔥 Thử thách nâng cao (Challenge)
Thiết kế giải pháp tự động hoàn tác (Rollback Pipeline) khi hệ thống giám sát sau triển khai phát hiện lỗi nghiêm trọng trên máy chủ sản xuất?

---

## 📚 Tổng kết kiến thức
- Hoàn thành xuất sắc toàn bộ các khối kiến thức cốt lõi của GitHub Actions và đường ống CI/CD hiện đại.
- Làm chủ từ cú pháp YAML, quản lý sự kiện, ma trận kiểm thử cho đến bảo mật bí mật và phê duyệt môi trường.
- Sẵn sàng tự tin áp dụng tự động hóa chuyên nghiệp vào bất kỳ dự án phần mềm thực tế nào trong doanh nghiệp.
