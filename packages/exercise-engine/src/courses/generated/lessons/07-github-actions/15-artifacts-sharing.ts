import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "15-artifacts-sharing",
  "moduleId": "07-github-actions",
  "metadata": {
    "id": "15-artifacts-sharing",
    "title": "Lưu trữ và chia sẻ sản phẩm build với Artifacts",
    "level": "advanced",
    "duration": 30,
    "xp": 95,
    "prerequisites": [
      "14-matrix-strategy"
    ],
    "objectives": [
      "Hiểu rõ khái niệm Artifact như cầu nối lưu trữ và truyền tải dữ liệu giữa các Job độc lập.",
      "Sử dụng thành thạo action actions/upload-artifact@v4 để lưu trữ gói tệp tin sau khi build.",
      "Sử dụng thành thạo action actions/download-artifact@v4 để kéo sản phẩm về máy ảo của Job triển khai."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "artifacts",
      "upload artifact",
      "download artifact",
      "build output",
      "data sharing"
    ],
    "commands": [
      "ls -la dist/",
      "tar -czf app.tar.gz dist/"
    ]
  },
  "content": "# Lưu trữ và chia sẻ sản phẩm build với Artifacts\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ khái niệm Artifact như cầu nối lưu trữ và truyền tải dữ liệu giữa các Job độc lập.\n- Sử dụng thành thạo action `actions/upload-artifact@v4` để lưu trữ gói tệp tin sau khi build.\n- Sử dụng thành thạo action `actions/download-artifact@v4` để kéo sản phẩm về máy ảo của Job triển khai.\n- Nắm được cách thiết lập thời gian lưu trữ `retention-days` để tối ưu chi phí lưu trữ trên GitHub.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Artifacts Storage\n- **Nói dễ hiểu**: Kho lưu trữ đám mây tạm thời do GitHub cung cấp cho mỗi lần chạy workflow, giúp các Job độc lập chia sẻ file với nhau.\n- **Ví dụ**: Thư mục `dist/` sau khi đóng gói được tải lên kho lưu trữ để Job triển khai tải về máy ảo mới.\n- **Đừng nhầm**: Không phải là Git repository hay cache; Artifacts được thiết kế để giữ sản phẩm xuất xưởng như file zip, apk, binary hoặc test report.\n\n### upload-artifact Action\n- **Nói dễ hiểu**: Action chính thức từ GitHub dùng để đóng gói tệp tin hoặc thư mục trên máy ảo hiện tại và đẩy lên kho lưu trữ Artifacts.\n- **Ví dụ**: Bước chạy `uses: actions/upload-artifact@v4` với tham số `name: web-build` và `path: dist/`.\n- **Đừng nhầm**: Không tự động gửi file sang server khác, chỉ tải file lên hạ tầng tạm thời của GitHub Actions.\n\n### retention-days Property\n- **Nói dễ hiểu**: Thuộc tính quy định số ngày lưu giữ tệp Artifact trước khi GitHub tự động xóa vĩnh viễn.\n- **Ví dụ**: Đặt `retention-days: 7` để xóa bản build thử nghiệm sau một tuần, tránh đầy dung lượng lưu trữ của tổ chức.\n- **Đừng nhầm**: Không áp dụng cho kho lưu trữ Git commit hay release tags; chỉ quản lý vòng đời file tạm của workflow runs.\n\n---\n\n## 📖 Định nghĩa\nArtifacts (Tạo phẩm) là các tệp tin hoặc tập hợp tệp tin được sinh ra trong quá trình thực thi một workflow (ví dụ: các tệp biên dịch mã nguồn JavaScript trong thư mục `dist/`, tệp gói nhị phân APK, hoặc báo cáo kiểm thử độ bao phủ coverage report) được tải lên và lưu trữ tạm thời trên hệ thống lưu trữ đám mây của GitHub, cho phép các Job khác tải về hoặc người dùng tải xuống thủ công.\n\n---\n\n## 💡 Tại sao cần\nVì mỗi Job chạy trên một máy ảo độc lập và máy ảo đó sẽ bị hủy hoàn toàn ngay khi Job kết thúc, mọi tệp tin bạn vừa tốn công biên dịch (`npm run build`) sẽ biến mất vĩnh viễn nếu không được lưu lại. Artifacts chính là giải pháp chính thống duy nhất để truyền kết quả từ Job này (ví dụ: Job đóng gói Build) sang một Job khác (ví dụ: Job Triển khai Deploy hoặc Job Quét bảo mật).\n\n---\n\n## 🧠 Mental Model\nHãy tưởng tượng hai bưu cục bưu điện độc lập ở hai thành phố hoàn toàn khác nhau (tượng trưng cho hai Job chạy trên hai máy ảo cách ly). Bưu cục A tiến hành đóng gói một kiện hàng quý giá, niêm phong cẩn thận và gửi vào kho hàng lưu ký đám mây trung tâm của tổng công ty vận chuyển (sự kiện upload-artifact). Sau đó, Bưu cục B nhận được mã vận đơn, đến kho hàng trung tâm lấy đúng kiện hàng nguyên vẹn đó về để giao tận tay người nhận (sự kiện download-artifact) mà không bị mất mát.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nQuy trình truyền dữ liệu giữa các Job qua Artifacts Storage:\n┌──────────────────────┐                ┌────────────────────────┐\n│ Job 1: Build (Ubuntu)│                │ GitHub Cloud Artifacts │\n│   npm run build      │                │ ┌────────────────────┐ │\n│   upload-artifact@v4 ├───────────────►│ │ production-dist    │ │\n└──────────────────────┘                │ └─────────┬──────────┘ │\n                                        └───────────┼────────────┘\n┌──────────────────────┐                            │\n│ Job 2: Deploy (Ubuntu)                            │\n│   download-artifact  │◄───────────────────────────┘\n│   deploy to server   │ (Nhận đúng thư mục dist/ đã build)\n└──────────────────────┘\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nMột nhóm phát triển ứng dụng web React xây dựng đường ống CI/CD gồm 2 Jobs. Job thứ nhất có tên `build-app`: kéo mã nguồn về, cài đặt thư viện và chạy `npm run build` tạo ra thư mục `build/`. Ở bước cuối, Job này gọi `actions/upload-artifact@v4` với tên gọi `webapp-bundle` và đường dẫn `build/`. Job thứ hai có tên `deploy-prod` khai báo `needs: build-app`. Ngay khi bắt đầu, Job này gọi `actions/download-artifact@v4` để kéo gói `webapp-bundle` về thư mục làm việc, sau đó tải toàn bộ mã nguồn lên máy chủ AWS S3. Nhờ Artifacts, Job thứ hai hoàn toàn không cần phải tốn công cài đặt lại Node.js hay biên dịch lại mã nguồn từ đầu.\n\n---\n\n## 💻 Command & Cú pháp\n```yaml\n# Ví dụ workflow upload và download artifact giữa 2 jobs\nname: Build and Share Artifact\non: [push]\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Compile application\n        run: |\n          mkdir dist\n          echo \"Production Bundle v1.0\" > dist/bundle.txt\n      - name: Upload artifact\n        uses: actions/upload-artifact@v4\n        with:\n          name: app-dist\n          path: dist/\n          retention-days: 5\n\n  deploy:\n    needs: build\n    runs-on: ubuntu-latest\n    steps:\n      - name: Download artifact\n        uses: actions/download-artifact@v4\n        with:\n          name: app-dist\n          path: downloaded-dist\n      - name: Verify contents\n        run: cat downloaded-dist/bundle.txt\n```\n\n---\n\n## 🔍 Giải thích command\n- `uses: actions/upload-artifact@v4`: Gọi action chính thức phiên bản v4 để nén và tải tệp lên GitHub.\n- `with.name: app-dist`: Định danh cho tệp nén trên giao diện web và để các Job sau tham chiếu.\n- `with.path: dist/`: Đường dẫn thư mục cục bộ cần tải lên.\n- `with.retention-days: 5`: Giới hạn thời gian lưu trữ trong 5 ngày để tiết kiệm dung lượng tài khoản.\n- `uses: actions/download-artifact@v4`: Tải đúng gói có tên `app-dist` về thư mục con `downloaded-dist`.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Cố gắng tải lên thư mục khổng lồ chứa `node_modules/`**: Làm lãng phí băng thông và dung lượng lưu trữ một cách vô ích. Hãy dùng cache cho dependencies thay vì artifacts.\n2. **Sai lệch tên artifact giữa upload và download**: Nếu Job 1 đặt tên `app-dist` nhưng Job 2 tìm `my-dist`, runner sẽ báo lỗi không tìm thấy artifact tương ứng.\n3. **Phối hợp sai phiên bản action**: Dùng `upload-artifact@v3` nhưng lại kéo bằng `download-artifact@v4` dẫn tới lỗi giao thức định dạng không tương thích.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. **Bước 1**: Tạo file `.github/workflows/artifact-demo.yml` với Job 1 thực hiện tạo thư mục `output` chứa tệp `result.txt`.\n2. **Bước 2**: Thêm bước sử dụng `actions/upload-artifact@v4` để lưu trữ thư mục `output` với tên artifact `test-results`.\n3. **Bước 3**: Khai báo Job 2 có `needs: job1`, dùng `actions/download-artifact@v4` để tải `test-results` về và in nội dung bằng lệnh `cat`.\n4. **Bước 4**: Đẩy commit lên GitHub và vào tab **Actions**, mở workflow run để kiểm tra file artifact xuất hiện ở phần Artifacts phía dưới màn hình tóm tắt.\n\n---\n\n## 💡 Hint & mẹo\n> Thời gian lưu trữ mặc định của Artifacts trên GitHub là 90 ngày, nhưng bạn nên cấu hình ngắn lại bằng `retention-days: 7` để tối ưu chi phí dung lượng. Ngoài ra, phiên bản v4 cho phép upload nhanh hơn nhiều so với v3 nhờ cơ chế nén song song.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Job 2 đọc thành công nội dung của tệp tin được sinh ra từ Job 1 thông qua Artifact mà không cần chạy lại bước build.\n- Trang tóm tắt workflow run hiển thị mục **Artifacts** với tên gói `test-results` và dung lượng tệp tin.\n\n---\n\n## ❓ Quiz nhanh\nHãy kiểm tra kiến thức về cơ chế chia sẻ tệp tin Artifacts qua các câu hỏi trong phần trắc nghiệm bên dưới.\n\n---\n\n## 🚀 Thử thách nâng cao\nLàm thế nào để sử dụng Artifacts nhằm lưu trữ các ảnh chụp màn hình bị lỗi từ các bài kiểm thử Cypress hoặc Playwright chỉ khi job bị thất bại? (Gợi ý: kết hợp thuộc tính `if: failure()` với `upload-artifact`).\n\n---\n\n## 📝 Tổng kết\n- Artifacts là cơ chế chính thống để lưu trữ và truyền tải tệp tin giữa các Job độc lập.\n- Sử dụng `actions/upload-artifact@v4` để đẩy tệp lên máy chủ lưu trữ của GitHub.\n- Sử dụng `actions/download-artifact@v4` để tải tệp về không gian làm việc của Job phụ thuộc.\n- Thiết lập `retention-days` để chủ động quản lý vòng đời và dung lượng lưu trữ của kho tạo phẩm.\n",
  "quiz": {
    "id": "quiz-07-github-actions-15-artifacts-sharing",
    "title": "Trắc nghiệm: Lưu trữ và chia sẻ sản phẩm build với Artifacts",
    "questions": [
      {
        "id": "q1",
        "question": "Tại sao cần phải sử dụng Artifacts để truyền tệp tin giữa hai Job khác nhau trong cùng một workflow?",
        "type": "single",
        "options": [
          {
            "text": "Vì mỗi Job chạy trên một máy ảo riêng biệt và ổ đĩa của chúng hoàn toàn cách ly với nhau",
            "correct": true
          },
          {
            "text": "Vì GitHub bắt buộc phải thu phí dịch vụ lưu trữ",
            "correct": false
          },
          {
            "text": "Vì các Job không được phép dùng chung ngôn ngữ lập trình",
            "correct": false
          },
          {
            "text": "Vì các tệp tin trong Git tự động bị xóa sau 1 phút",
            "correct": false
          }
        ],
        "explanation": "Do tính chất cô lập của máy ảo Runner, các tệp tin cục bộ ở Job 1 sẽ không thể nhìn thấy ở Job 2 nếu không qua cơ chế trung gian Artifacts."
      },
      {
        "id": "q2",
        "question": "Action nào sau đây được cộng đồng sử dụng phổ biến nhất để tải tệp tin lên hệ thống lưu trữ Artifact?",
        "type": "single",
        "options": [
          {
            "text": "actions/upload-artifact",
            "correct": true
          },
          {
            "text": "actions/save-file",
            "correct": false
          },
          {
            "text": "actions/push-disk",
            "correct": false
          },
          {
            "text": "actions/cloud-storage",
            "correct": false
          }
        ],
        "explanation": "`actions/upload-artifact` là action chính thức của GitHub để đóng gói và đưa tệp tin lên hệ thống lưu trữ Artifacts."
      },
      {
        "id": "q3",
        "question": "Tham số `retention-days` trong cấu hình upload-artifact có ý nghĩa gì?",
        "type": "single",
        "options": [
          {
            "text": "Số ngày tệp artifact sẽ được lưu trữ trên GitHub trước khi tự động bị xóa bỏ",
            "correct": true
          },
          {
            "text": "Số ngày cần để tải tệp lên máy chủ",
            "correct": false
          },
          {
            "text": "Thời gian bảo hành của phần cứng máy chủ",
            "correct": false
          },
          {
            "text": "Số ngày tối đa một lập trình viên được nghỉ phép",
            "correct": false
          }
        ],
        "explanation": "`retention-days` quy định vòng đời lưu trữ của tệp tin, giúp dọn dẹp dung lượng tự động sau một khoảng thời gian quy định."
      },
      {
        "id": "q4",
        "question": "Thư mục nào sau đây KHÔNG NÊN đưa vào artifact tải lên?",
        "type": "single",
        "options": [
          {
            "text": "node_modules/ (chứa hàng chục nghìn tệp phụ thuộc dung lượng lớn)",
            "correct": true
          },
          {
            "text": "dist/ (sản phẩm biên dịch cuối cùng)",
            "correct": false
          },
          {
            "text": "coverage/ (báo cáo kiểm thử chất lượng)",
            "correct": false
          },
          {
            "text": "release.zip (gói phần mềm đã đóng gói)",
            "correct": false
          }
        ],
        "explanation": "`node_modules` chứa các thư viện có thể tải lại dễ dàng bằng package manager, việc nén và tải lên hàng nghìn tệp nhỏ gây chậm trễ nghiêm trọng."
      },
      {
        "id": "q5",
        "question": "Để tải về một artifact đã được lưu trữ từ Job trước đó trong cùng workflow, bạn sử dụng action chính thức nào?",
        "type": "single",
        "options": [
          {
            "text": "actions/download-artifact",
            "correct": true
          },
          {
            "text": "actions/pull-disk",
            "correct": false
          },
          {
            "text": "actions/extract-zip",
            "correct": false
          },
          {
            "text": "actions/fetch-files",
            "correct": false
          }
        ],
        "explanation": "Action `actions/download-artifact` tải về các tệp tin đã được lưu trữ bởi `upload-artifact` trước đó và giải nén trực tiếp vào thư mục làm việc của Job hiện tại."
      }
    ]
  }
};
export default lesson;
