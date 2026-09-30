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
  "content": "# Lưu trữ và chia sẻ sản phẩm build với Artifacts\n\n---\n\n## 🎯 Mục tiêu bài học\n- Hiểu rõ khái niệm Artifact như cầu nối lưu trữ và truyền tải dữ liệu giữa các Job độc lập.\n- Sử dụng thành thạo action actions/upload-artifact@v4 để lưu trữ gói tệp tin sau khi build.\n- Sử dụng thành thạo action actions/download-artifact@v4 để kéo sản phẩm về máy ảo của Job triển khai.\n\n---\n\n## 📖 Định nghĩa\n> Artifacts (Tạo phẩm) là các tệp tin hoặc tập hợp tệp tin được sinh ra trong quá trình thực thi một workflow (ví dụ: các tệp biên dịch mã nguồn JavaScript trong thư mục dist/, tệp gói nhị phân APK, hoặc báo cáo kiểm thử độ bao phủ coverage report) được tải lên và lưu trữ tạm thời trên hệ thống lưu trữ đám mây của GitHub, cho phép các Job khác tải về hoặc người dùng tải xuống thủ công.\n\n---\n\n## 🤔 Tại sao cần?\nVì mỗi Job chạy trên một máy ảo độc lập và máy ảo đó sẽ bị hủy hoàn toàn ngay khi Job kết thúc, mọi tệp tin bạn vừa tốn công biên dịch (npm run build) sẽ biến mất vĩnh viễn nếu không được lưu lại. Artifacts chính là giải pháp chính thống duy nhất để truyền kết quả từ Job này (ví dụ: Job đóng gói Build) sang một Job khác (ví dụ: Job Triển khai Deploy hoặc Job Quét bảo mật).\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy tưởng tượng hai bưu cục bưu điện độc lập ở hai thành phố hoàn toàn khác nhau (tượng trưng cho hai Job chạy trên hai máy ảo cách ly). Bưu cục A tiến hành đóng gói một kiện hàng quý giá, niêm phong cẩn thận và gửi vào kho hàng lưu ký đám mây trung tâm của tổng công ty vận chuyển (sự kiện upload-artifact). Sau đó, Bưu cục B nhận được mã vận đơn, đến kho hàng trung tâm lấy đúng kiện hàng nguyên vẹn đó về để giao tận tay người nhận (sự kiện download-artifact) mà không bị mất mát.\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nQuy trình truyền dữ liệu giữa các Job qua Artifacts Storage:\n┌──────────────────────┐                ┌────────────────────────┐\n│ Job 1: Build (Ubuntu)│                │ GitHub Cloud Artifacts │\n│   npm run build      │                │ ┌────────────────────┐ │\n│   upload-artifact@v4 ├───────────────►│ │ production-dist    │ │\n└──────────────────────┘                │ └─────────┬──────────┘ │\n                                        └───────────┼────────────┘\n┌──────────────────────┐                            │\n│ Job 2: Deploy (Ubuntu)                            │\n│   download-artifact  │◄───────────────────────────┘\n│   deploy to server   │ (Nhận đúng thư mục dist/ đã build)\n└──────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột nhóm phát triển ứng dụng web React xây dựng đường ống CI/CD gồm 2 Jobs. Job thứ nhất có tên `build-app`: kéo mã nguồn về, cài đặt thư viện và chạy `npm run build` tạo ra thư mục `build/`. Ở bước cuối, Job này gọi `actions/upload-artifact@v4` với tên gọi `webapp-bundle` và đường dẫn `build/`. Job thứ hai có tên `deploy-prod` khai báo `needs: build-app`. Ngay khi bắt đầu, Job này gọi `actions/download-artifact@v4` để kéo gói `webapp-bundle` về thư mục làm việc, sau đó tải toàn bộ mã nguồn lên máy chủ AWS S3. Nhờ Artifacts, Job thứ hai hoàn toàn không cần phải tốn công cài đặt lại Node.js hay biên dịch lại mã nguồn từ đầu.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\nls -la dist/\ntar -czf app.tar.gz dist/\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nCác câu lệnh trên minh họa việc kiểm tra thư mục sản phẩm dist/ trước khi đóng gói và tải lên kho lưu trữ Artifacts của GitHub.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Cố gắng tải lên thư mục khổng lồ chứa `node_modules/`**:  Làm lãng phí băng thông và dung lượng lưu trữ một cách vô ích.\n2. **Đặt tên tệp artifact giữa lệnh upload và download không khớp nhau khiến Job sau báo lỗi không tìm thấy tệp.**: \n3. **Sử dụng phiên bản upload-artifact v3 kết hợp với download-artifact v4 gây ra lỗi không tương thích phiên bản giao thức lưu trữ.**: \n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Trong Job 1, tạo một tệp tin `build/bundle.txt` chứa dòng chữ \"Production Build 1.0\".\n2. Sử dụng `actions/upload-artifact@v4` để tải thư mục `build` lên với tên `my-artifact`.\n3. Trong Job 2 (có `needs: job1`), sử dụng `actions/download-artifact@v4` để kéo tệp về và in nội dung ra log.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Thời gian lưu trữ mặc định của Artifacts trên GitHub là 90 ngày, nhưng bạn có thể cấu hình ngắn lại bằng `retention-days: 7` để tiết kiệm dung lượng.\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nJob 2 đọc thành công nội dung của tệp tin được sinh ra từ Job 1 thông qua Artifact.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nHãy kiểm tra kiến thức về cơ chế chia sẻ tệp tin Artifacts qua các câu hỏi sau.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nLàm thế nào để sử dụng Artifacts nhằm lưu trữ các ảnh chụp màn hình bị lỗi (error screenshots) từ các bài kiểm thử Cypress/Playwright để kỹ sư tải về điều tra?\n\n---\n\n## 📚 Tổng kết kiến thức\n- Artifacts là cơ chế chính thống để lưu trữ và truyền tải tệp tin giữa các Job độc lập.\n- Sử dụng `actions/upload-artifact@v4` để đẩy tệp lên máy chủ lưu trữ của GitHub.\n- Sử dụng `actions/download-artifact@v4` để tải tệp về không gian làm việc của Job phụ thuộc.\n",
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
      }
    ]
  }
};
export default lesson;
