# Lưu trữ và chia sẻ sản phẩm build với Artifacts

---

## 🎯 Mục tiêu
- Hiểu rõ khái niệm Artifact như cầu nối lưu trữ và truyền tải dữ liệu giữa các Job độc lập.
- Sử dụng thành thạo action `actions/upload-artifact@v4` để lưu trữ gói tệp tin sau khi build.
- Sử dụng thành thạo action `actions/download-artifact@v4` để kéo sản phẩm về máy ảo của Job triển khai.
- Nắm được cách thiết lập thời gian lưu trữ `retention-days` để tối ưu chi phí lưu trữ trên GitHub.

---

## 🧩 Từ khóa hôm nay

### Artifacts Storage
- **Nói dễ hiểu**: Kho lưu trữ đám mây tạm thời do GitHub cung cấp cho mỗi lần chạy workflow, giúp các Job độc lập chia sẻ file với nhau.
- **Ví dụ**: Thư mục `dist/` sau khi đóng gói được tải lên kho lưu trữ để Job triển khai tải về máy ảo mới.
- **Đừng nhầm**: Không phải là Git repository hay cache; Artifacts được thiết kế để giữ sản phẩm xuất xưởng như file zip, apk, binary hoặc test report.

### upload-artifact Action
- **Nói dễ hiểu**: Action chính thức từ GitHub dùng để đóng gói tệp tin hoặc thư mục trên máy ảo hiện tại và đẩy lên kho lưu trữ Artifacts.
- **Ví dụ**: Bước chạy `uses: actions/upload-artifact@v4` với tham số `name: web-build` và `path: dist/`.
- **Đừng nhầm**: Không tự động gửi file sang server khác, chỉ tải file lên hạ tầng tạm thời của GitHub Actions.

### retention-days Property
- **Nói dễ hiểu**: Thuộc tính quy định số ngày lưu giữ tệp Artifact trước khi GitHub tự động xóa vĩnh viễn.
- **Ví dụ**: Đặt `retention-days: 7` để xóa bản build thử nghiệm sau một tuần, tránh đầy dung lượng lưu trữ của tổ chức.
- **Đừng nhầm**: Không áp dụng cho kho lưu trữ Git commit hay release tags; chỉ quản lý vòng đời file tạm của workflow runs.

---

## 📖 Định nghĩa
Artifacts (Tạo phẩm) là các tệp tin hoặc tập hợp tệp tin được sinh ra trong quá trình thực thi một workflow (ví dụ: các tệp biên dịch mã nguồn JavaScript trong thư mục `dist/`, tệp gói nhị phân APK, hoặc báo cáo kiểm thử độ bao phủ coverage report) được tải lên và lưu trữ tạm thời trên hệ thống lưu trữ đám mây của GitHub, cho phép các Job khác tải về hoặc người dùng tải xuống thủ công.

---

## 💡 Tại sao cần
Vì mỗi Job chạy trên một máy ảo độc lập và máy ảo đó sẽ bị hủy hoàn toàn ngay khi Job kết thúc, mọi tệp tin bạn vừa tốn công biên dịch (`npm run build`) sẽ biến mất vĩnh viễn nếu không được lưu lại. Artifacts chính là giải pháp chính thống duy nhất để truyền kết quả từ Job này (ví dụ: Job đóng gói Build) sang một Job khác (ví dụ: Job Triển khai Deploy hoặc Job Quét bảo mật).

---

## 🧠 Mental Model
Hãy tưởng tượng hai bưu cục bưu điện độc lập ở hai thành phố hoàn toàn khác nhau (tượng trưng cho hai Job chạy trên hai máy ảo cách ly). Bưu cục A tiến hành đóng gói một kiện hàng quý giá, niêm phong cẩn thận và gửi vào kho hàng lưu ký đám mây trung tâm của tổng công ty vận chuyển (sự kiện upload-artifact). Sau đó, Bưu cục B nhận được mã vận đơn, đến kho hàng trung tâm lấy đúng kiện hàng nguyên vẹn đó về để giao tận tay người nhận (sự kiện download-artifact) mà không bị mất mát.

---

## 📊 Sơ đồ minh họa
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

## 🏢 Ví dụ thực tế
Một nhóm phát triển ứng dụng web React xây dựng đường ống CI/CD gồm 2 Jobs. Job thứ nhất có tên `build-app`: kéo mã nguồn về, cài đặt thư viện và chạy `npm run build` tạo ra thư mục `build/`. Ở bước cuối, Job này gọi `actions/upload-artifact@v4` với tên gọi `webapp-bundle` và đường dẫn `build/`. Job thứ hai có tên `deploy-prod` khai báo `needs: build-app`. Ngay khi bắt đầu, Job này gọi `actions/download-artifact@v4` để kéo gói `webapp-bundle` về thư mục làm việc, sau đó tải toàn bộ mã nguồn lên máy chủ AWS S3. Nhờ Artifacts, Job thứ hai hoàn toàn không cần phải tốn công cài đặt lại Node.js hay biên dịch lại mã nguồn từ đầu.

---

## 💻 Command & Cú pháp
```yaml
# Ví dụ workflow upload và download artifact giữa 2 jobs
name: Build and Share Artifact
on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Compile application
        run: |
          mkdir dist
          echo "Production Bundle v1.0" > dist/bundle.txt
      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: app-dist
          path: dist/
          retention-days: 5

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Download artifact
        uses: actions/download-artifact@v4
        with:
          name: app-dist
          path: downloaded-dist
      - name: Verify contents
        run: cat downloaded-dist/bundle.txt
```

---

## 🔍 Giải thích command
- `uses: actions/upload-artifact@v4`: Gọi action chính thức phiên bản v4 để nén và tải tệp lên GitHub.
- `with.name: app-dist`: Định danh cho tệp nén trên giao diện web và để các Job sau tham chiếu.
- `with.path: dist/`: Đường dẫn thư mục cục bộ cần tải lên.
- `with.retention-days: 5`: Giới hạn thời gian lưu trữ trong 5 ngày để tiết kiệm dung lượng tài khoản.
- `uses: actions/download-artifact@v4`: Tải đúng gói có tên `app-dist` về thư mục con `downloaded-dist`.

---

## ⚠️ Sai lầm phổ biến
1. **Cố gắng tải lên thư mục khổng lồ chứa `node_modules/`**: Làm lãng phí băng thông và dung lượng lưu trữ một cách vô ích. Hãy dùng cache cho dependencies thay vì artifacts.
2. **Sai lệch tên artifact giữa upload và download**: Nếu Job 1 đặt tên `app-dist` nhưng Job 2 tìm `my-dist`, runner sẽ báo lỗi không tìm thấy artifact tương ứng.
3. **Phối hợp sai phiên bản action**: Dùng `upload-artifact@v3` nhưng lại kéo bằng `download-artifact@v4` dẫn tới lỗi giao thức định dạng không tương thích.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.

1. **Bước 1**: Tạo file `.github/workflows/artifact-demo.yml` với Job 1 thực hiện tạo thư mục `output` chứa tệp `result.txt`.
2. **Bước 2**: Thêm bước sử dụng `actions/upload-artifact@v4` để lưu trữ thư mục `output` với tên artifact `test-results`.
3. **Bước 3**: Khai báo Job 2 có `needs: job1`, dùng `actions/download-artifact@v4` để tải `test-results` về và in nội dung bằng lệnh `cat`.
4. **Bước 4**: Đẩy commit lên GitHub và vào tab **Actions**, mở workflow run để kiểm tra file artifact xuất hiện ở phần Artifacts phía dưới màn hình tóm tắt.

---

## 💡 Hint & mẹo
> Thời gian lưu trữ mặc định của Artifacts trên GitHub là 90 ngày, nhưng bạn nên cấu hình ngắn lại bằng `retention-days: 7` để tối ưu chi phí dung lượng. Ngoài ra, phiên bản v4 cho phép upload nhanh hơn nhiều so với v3 nhờ cơ chế nén song song.

---

## ✅ Validation & Kết quả mong đợi
- Job 2 đọc thành công nội dung của tệp tin được sinh ra từ Job 1 thông qua Artifact mà không cần chạy lại bước build.
- Trang tóm tắt workflow run hiển thị mục **Artifacts** với tên gói `test-results` và dung lượng tệp tin.

---

## ❓ Quiz nhanh
Hãy kiểm tra kiến thức về cơ chế chia sẻ tệp tin Artifacts qua các câu hỏi trong phần trắc nghiệm bên dưới.

---

## 🚀 Thử thách nâng cao
Làm thế nào để sử dụng Artifacts nhằm lưu trữ các ảnh chụp màn hình bị lỗi từ các bài kiểm thử Cypress hoặc Playwright chỉ khi job bị thất bại? (Gợi ý: kết hợp thuộc tính `if: failure()` với `upload-artifact`).

---

## 📝 Tổng kết
- Artifacts là cơ chế chính thống để lưu trữ và truyền tải tệp tin giữa các Job độc lập.
- Sử dụng `actions/upload-artifact@v4` để đẩy tệp lên máy chủ lưu trữ của GitHub.
- Sử dụng `actions/download-artifact@v4` để tải tệp về không gian làm việc của Job phụ thuộc.
- Thiết lập `retention-days` để chủ động quản lý vòng đời và dung lượng lưu trữ của kho tạo phẩm.
