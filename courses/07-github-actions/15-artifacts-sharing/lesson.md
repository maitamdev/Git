# Lưu trữ và chia sẻ sản phẩm build với Artifacts

---

## 🎯 Mục tiêu bài học
- Hiểu rõ khái niệm Artifact như cầu nối lưu trữ và truyền tải dữ liệu giữa các Job độc lập.
- Sử dụng thành thạo action actions/upload-artifact@v4 để lưu trữ gói tệp tin sau khi build.
- Sử dụng thành thạo action actions/download-artifact@v4 để kéo sản phẩm về máy ảo của Job triển khai.

---

## 📖 Định nghĩa
> Artifacts (Tạo phẩm) là các tệp tin hoặc tập hợp tệp tin được sinh ra trong quá trình thực thi một workflow (ví dụ: các tệp biên dịch mã nguồn JavaScript trong thư mục dist/, tệp gói nhị phân APK, hoặc báo cáo kiểm thử độ bao phủ coverage report) được tải lên và lưu trữ tạm thời trên hệ thống lưu trữ đám mây của GitHub, cho phép các Job khác tải về hoặc người dùng tải xuống thủ công.

---

## 🤔 Tại sao cần?
Vì mỗi Job chạy trên một máy ảo độc lập và máy ảo đó sẽ bị hủy hoàn toàn ngay khi Job kết thúc, mọi tệp tin bạn vừa tốn công biên dịch (npm run build) sẽ biến mất vĩnh viễn nếu không được lưu lại. Artifacts chính là giải pháp chính thống duy nhất để truyền kết quả từ Job này (ví dụ: Job đóng gói Build) sang một Job khác (ví dụ: Job Triển khai Deploy hoặc Job Quét bảo mật).

---

## 🧠 Mental Model & Mô hình tư duy
Hãy tưởng tượng hai bưu cục bưu điện độc lập ở hai thành phố hoàn toàn khác nhau (tượng trưng cho hai Job chạy trên hai máy ảo cách ly). Bưu cục A tiến hành đóng gói một kiện hàng quý giá, niêm phong cẩn thận và gửi vào kho hàng lưu ký đám mây trung tâm của tổng công ty vận chuyển (sự kiện upload-artifact). Sau đó, Bưu cục B nhận được mã vận đơn, đến kho hàng trung tâm lấy đúng kiện hàng nguyên vẹn đó về để giao tận tay người nhận (sự kiện download-artifact) mà không bị mất mát.

---

## 🖼️ Sơ đồ minh họa
```text
Quy trình truyền dữ liệu giữa các Job qua Artifacts Storage:
┌──────────────────────┐                ┌────────────────────────┐
│ Job 1: Build (Ubuntu)│                │ GitHub Cloud Artifacts │
│   npm run build      │                │ ┌────────────────────┐ │
│   upload-artifact@v4 ├───────────────►│ │ production-dist    │ │
└──────────────────────┘                │ └─────────┬──────────┘ │
                                        └───────────┼────────────┘
┌──────────────────────┐                            │
│ Job 2: Deploy (Ubuntu)                            │
│   download-artifact  │◄───────────────────────────┘
│   deploy to server   │ (Nhận đúng thư mục dist/ đã build)
└──────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Một nhóm phát triển ứng dụng web React xây dựng đường ống CI/CD gồm 2 Jobs. Job thứ nhất có tên `build-app`: kéo mã nguồn về, cài đặt thư viện và chạy `npm run build` tạo ra thư mục `build/`. Ở bước cuối, Job này gọi `actions/upload-artifact@v4` với tên gọi `webapp-bundle` và đường dẫn `build/`. Job thứ hai có tên `deploy-prod` khai báo `needs: build-app`. Ngay khi bắt đầu, Job này gọi `actions/download-artifact@v4` để kéo gói `webapp-bundle` về thư mục làm việc, sau đó tải toàn bộ mã nguồn lên máy chủ AWS S3. Nhờ Artifacts, Job thứ hai hoàn toàn không cần phải tốn công cài đặt lại Node.js hay biên dịch lại mã nguồn từ đầu.

---

## 💻 Command & Lệnh thao tác
```bash
ls -la dist/
tar -czf app.tar.gz dist/
```

---

## 🔍 Giải thích chi tiết lệnh
Các câu lệnh trên minh họa việc kiểm tra thư mục sản phẩm dist/ trước khi đóng gói và tải lên kho lưu trữ Artifacts của GitHub.

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Cố gắng tải lên thư mục khổng lồ chứa `node_modules/`**:  Làm lãng phí băng thông và dung lượng lưu trữ một cách vô ích.
2. **Đặt tên tệp artifact giữa lệnh upload và download không khớp nhau khiến Job sau báo lỗi không tìm thấy tệp.**: 
3. **Sử dụng phiên bản upload-artifact v3 kết hợp với download-artifact v4 gây ra lỗi không tương thích phiên bản giao thức lưu trữ.**: 

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Trong Job 1, tạo một tệp tin `build/bundle.txt` chứa dòng chữ "Production Build 1.0".
2. Sử dụng `actions/upload-artifact@v4` để tải thư mục `build` lên với tên `my-artifact`.
3. Trong Job 2 (có `needs: job1`), sử dụng `actions/download-artifact@v4` để kéo tệp về và in nội dung ra log.

---

## 💡 Gợi ý thực hiện (Hint)
> Thời gian lưu trữ mặc định của Artifacts trên GitHub là 90 ngày, nhưng bạn có thể cấu hình ngắn lại bằng `retention-days: 7` để tiết kiệm dung lượng.

---

## ✅ Kiểm tra kết quả (Validation)
Job 2 đọc thành công nội dung của tệp tin được sinh ra từ Job 1 thông qua Artifact.

---

## ❓ Câu hỏi ôn tập (Quiz)
Hãy kiểm tra kiến thức về cơ chế chia sẻ tệp tin Artifacts qua các câu hỏi sau.

---

## 🔥 Thử thách nâng cao (Challenge)
Làm thế nào để sử dụng Artifacts nhằm lưu trữ các ảnh chụp màn hình bị lỗi (error screenshots) từ các bài kiểm thử Cypress/Playwright để kỹ sư tải về điều tra?

---

## 📚 Tổng kết kiến thức
- Artifacts là cơ chế chính thống để lưu trữ và truyền tải tệp tin giữa các Job độc lập.
- Sử dụng `actions/upload-artifact@v4` để đẩy tệp lên máy chủ lưu trữ của GitHub.
- Sử dụng `actions/download-artifact@v4` để tải tệp về không gian làm việc của Job phụ thuộc.
