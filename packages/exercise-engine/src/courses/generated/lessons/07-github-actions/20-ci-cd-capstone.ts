import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "20-ci-cd-capstone",
  "moduleId": "07-github-actions",
  "metadata": {
    "id": "20-ci-cd-capstone",
    "title": "Capstone Project: Xây dựng hoàn chỉnh CI/CD Pipeline cho Web Application",
    "level": "advanced",
    "duration": 50,
    "xp": 250,
    "prerequisites": [
      "19-reusable-workflows"
    ],
    "objectives": [
      "Tổng hợp toàn bộ kiến thức Level 7 để thiết kế một đường ống CI/CD chuẩn doanh nghiệp hoàn chỉnh từ A đến Z.",
      "Xây dựng quy trình tự động hóa đa tầng: Linting, Unit Testing, Matrix Build, Đóng gói Artifacts và Triển khai có phê duyệt.",
      "Tích hợp bảo vệ nhánh Branch Protection Rules, quản lý Secrets an toàn và xử lý phục hồi lỗi linh hoạt."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "ci cd capstone",
      "enterprise pipeline",
      "end to end devops",
      "production deployment",
      "mastery challenge"
    ],
    "commands": [
      "gh pr create",
      "gh pr checks",
      "gh run watch",
      "git push origin main"
    ]
  },
  "content": "# Capstone Project: Xây dựng hoàn chỉnh CI/CD Pipeline cho Web Application\n\n---\n\n## 🎯 Mục tiêu bài học\n- Tổng hợp toàn bộ kiến thức Level 7 để thiết kế một đường ống CI/CD chuẩn doanh nghiệp hoàn chỉnh từ A đến Z.\n- Xây dựng quy trình tự động hóa đa tầng: Linting, Unit Testing, Matrix Build, Đóng gói Artifacts và Triển khai có phê duyệt.\n- Tích hợp bảo vệ nhánh Branch Protection Rules, quản lý Secrets an toàn và xử lý phục hồi lỗi linh hoạt.\n\n---\n\n## 📖 Định nghĩa\n> Bài học Capstone là thử thách thực chiến tổng hợp đỉnh cao của Level 7. Trong bài thực hành này, bạn sẽ vào vai một Kỹ sư DevOps trưởng (Lead DevOps Engineer) chịu trách nhiệm thiết kế, cấu hình và vận hành toàn bộ hạ tầng tự động hóa CI/CD cho một ứng dụng web thương mại điện tử hiện đại. Đường ống phải đáp ứng đầy đủ các tiêu chuẩn khắt khe nhất của ngành: kiểm tra an ninh, kiểm thử đa nền tảng, quản lý tạo phẩm và cổng triển khai sản xuất có kiểm duyệt.\n\n---\n\n## 🤔 Tại sao cần?\nBiết từng mảnh ghép lý thuyết riêng lẻ (events, jobs, steps, matrix, secrets) là chưa đủ để vận hành một hệ thống thực tế. Giá trị thực sự của một kỹ sư phần mềm chuyên nghiệp thể hiện ở khả năng kết nối tất cả các thành phần đó lại với nhau thành một cỗ máy hoạt động trơn tru, tin cậy, bảo vệ sự ổn định của hệ thống kinh doanh 24/7 trước hàng trăm thay đổi mã nguồn mỗi tuần.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy tưởng tượng bạn là tổng công trình sư thiết kế một nhà máy lọc dầu tự động hóa hoàn toàn. Dầu thô (mã nguồn mới) được đưa vào ống dẫn; hệ thống tự động lọc tạp chất và kiểm tra độ tinh khiết (CI lint & test); sau đó được phân tách thành các sản phẩm xăng dầu chuyên biệt theo ma trận tiêu chuẩn (matrix build); các sản phẩm đạt chuẩn được bơm vào kho bảo quản an toàn (artifacts); và cuối cùng, chỉ khi có chữ ký điện tử của giám đốc an toàn (environment approval), van dẫn mới được mở để cung cấp nhiên liệu ra thị trường (production deployment).\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nKiến trúc Pipeline Capstone chuẩn Doanh nghiệp:\n[Event: PR to main]\n       │\n       ├─────────────────────────┐\n       ▼                         ▼\n[Job 1: Code Lint & Format]  [Job 2: Security & Secret Scan]\n       │                         │\n       └────────────┬────────────┘\n                    ▼\n[Job 3: Matrix Unit Test (Node 18, 20 on Ubuntu & Windows)]\n                    │\n                    ▼ (needs: [lint, security, test])\n[Job 4: Build Web Application & Upload Artifact]\n                    │\n                    ▼ (needs: build)\n[Job 5: Deploy to Staging Environment]\n                    │\n                    ▼ (needs: staging, on: push main)\n[Job 6: Deploy to Production (WAITING APPROVAL Gate)]\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột công ty khởi nghiệp chuẩn bị ra mắt nền tảng thanh toán trực tuyến. Lập trình viên hoàn thành bài tập Capstone bằng việc tạo hai tệp workflow: `ci.yml` kiểm soát chất lượng mã nguồn trên mọi Pull Request và `deploy.yml` tự động hóa việc đưa sản phẩm lên các máy chủ đám mây. Khi một thành viên trong nhóm mở PR thêm chức năng giỏ hàng, đường ống lập tức khởi động 4 Jobs kiểm tra song song: lint mã nguồn, quét mã độc, chạy ma trận 4 bài kiểm thử trên cả Linux và Windows. Khi PR được duyệt và gộp vào nhánh chính, đường ống triển khai tự động kích hoạt, tạo gói nén artifact, đẩy lên môi trường Staging và gửi yêu cầu phê duyệt cho giám đốc kỹ thuật trước khi đưa lên Production. Toàn bộ quy trình diễn ra tự động 100%, không một sai sót.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\ngh pr create\ngh pr checks\ngh run watch\ngit push origin main\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nCác câu lệnh trên đại diện cho chu trình làm việc trọn vẹn của một kỹ sư: mở Pull Request đề xuất tính năng mới, theo dõi trạng thái các bài kiểm tra tự động và giám sát tiến độ thực thi của toàn bộ pipeline.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Để lọt các câu lệnh chạy thật trên máy chủ host thay vì mô phỏng trong môi trường an toàn.**: \n2. **Cấu hình sai thứ tự phụ thuộc `needs` khiến Job triển khai chạy trước khi bài kiểm thử kết thúc.**: \n3. **Làm lộ thông tin khóa bí mật trong log của Job đóng gói sản phẩm.**: \n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Xây dựng hoàn chỉnh tệp `.github/workflows/ci-cd-pipeline.yml` kết hợp đầy đủ các tính năng đã học.\n2. Thiết lập ma trận kiểm thử cho ít nhất 2 phiên bản môi trường.\n3. Cấu hình cổng phê duyệt an toàn cho Job triển khai sản xuất cuối cùng.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Hãy vẽ sơ đồ các Job và thứ tự phụ thuộc ra giấy trước khi bắt đầu viết những dòng YAML đầu tiên.\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nToàn bộ đồ thị đường ống hoàn thành với tất cả các cổng kiểm soát hoạt động chuẩn mực tuyệt đối.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nHãy hoàn thành bài kiểm tra tổng hợp kiến thức toàn diện của Level 7 CI/CD Capstone.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nThiết kế giải pháp tự động hoàn tác (Rollback Pipeline) khi hệ thống giám sát sau triển khai phát hiện lỗi nghiêm trọng trên máy chủ sản xuất?\n\n---\n\n## 📚 Tổng kết kiến thức\n- Hoàn thành xuất sắc toàn bộ các khối kiến thức cốt lõi của GitHub Actions và đường ống CI/CD hiện đại.\n- Làm chủ từ cú pháp YAML, quản lý sự kiện, ma trận kiểm thử cho đến bảo mật bí mật và phê duyệt môi trường.\n- Sẵn sàng tự tin áp dụng tự động hóa chuyên nghiệp vào bất kỳ dự án phần mềm thực tế nào trong doanh nghiệp.\n",
  "quiz": {
    "id": "quiz-07-github-actions-20-ci-cd-capstone",
    "title": "Trắc nghiệm: Capstone Project: Xây dựng hoàn chỉnh CI/CD Pipeline cho Web Application",
    "questions": [
      {
        "id": "q1",
        "question": "Trong một đường ống CI/CD hoàn chỉnh, thứ tự thực thi chuẩn mực nhất của các giai đoạn là gì?",
        "type": "single",
        "options": [
          {
            "text": "Lint & Test -> Build & Package -> Deploy Staging -> Phê duyệt -> Deploy Production",
            "correct": true
          },
          {
            "text": "Deploy Production -> Build -> Test -> Lint",
            "correct": false
          },
          {
            "text": "Deploy Staging -> Lint -> Deploy Production -> Test",
            "correct": false
          },
          {
            "text": "Chỉ cần Deploy Production, không cần kiểm thử",
            "correct": false
          }
        ],
        "explanation": "Quy trình chuẩn luôn đi từ kiểm tra chất lượng mã nguồn sớm nhất, sau đó mới đóng gói, thử nghiệm trên staging và cuối cùng mới lên production."
      },
      {
        "id": "q2",
        "question": "Thành phần nào đóng vai trò như chốt chặn an ninh ngăn không cho mã nguồn lỗi lọt vào nhánh chính?",
        "type": "single",
        "options": [
          {
            "text": "Branch Protection Rules kết hợp với Required Status Checks của CI",
            "correct": true
          },
          {
            "text": "Tệp tin .gitignore",
            "correct": false
          },
          {
            "text": "Lời nhắc nhở bằng miệng giữa các đồng nghiệp",
            "correct": false
          },
          {
            "text": "Phần mềm diệt virus trên máy tính cá nhân",
            "correct": false
          }
        ],
        "explanation": "Quy tắc bảo vệ nhánh kết hợp với CI Status Check là giải pháp cơ học tự động hóa không thể bị qua mặt bằng sự bất cẩn của con người."
      },
      {
        "id": "q3",
        "question": "Khi triển khai lên môi trường Production, thực hành nào sau đây là quan trọng nhất để đảm bảo an toàn?",
        "type": "single",
        "options": [
          {
            "text": "Áp dụng Environment Protection Rules với Required Reviewers và sử dụng Secrets riêng biệt",
            "correct": true
          },
          {
            "text": "Triển khai vào lúc nửa đêm để không ai biết",
            "correct": false
          },
          {
            "text": "Tắt toàn bộ hệ thống tường lửa trước khi deploy",
            "correct": false
          },
          {
            "text": "Xóa toàn bộ các bản sao lưu cũ để giải phóng dung lượng",
            "correct": false
          }
        ],
        "explanation": "Sự phê duyệt của con người kết hợp với sự phân tách bí mật theo môi trường là chốt chặn bảo vệ tối hậu cho hệ thống sản xuất."
      },
      {
        "id": "q4",
        "question": "Lợi ích lớn nhất mà một kỹ sư phần mềm đạt được sau khi làm chủ GitHub Actions là gì?",
        "type": "single",
        "options": [
          {
            "text": "Tự động hóa toàn diện quy trình phát triển, giảm thiểu lỗi thủ công và nâng cao tốc độ chuyển giao phần mềm chất lượng cao",
            "correct": true
          },
          {
            "text": "Không bao giờ phải viết mã nguồn cho ứng dụng nữa",
            "correct": false
          },
          {
            "text": "Máy tính không bao giờ bị hỏng phần cứng",
            "correct": false
          },
          {
            "text": "Tự động nhận được chứng chỉ tốt nghiệp mà không cần học",
            "correct": false
          }
        ],
        "explanation": "Làm chủ CI/CD giúp bạn nâng tầm từ một người chỉ biết viết code thành một kỹ sư phần mềm toàn diện có tư duy tự động hóa hiện đại."
      }
    ]
  }
};
export default lesson;
