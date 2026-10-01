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
  "content": "# Capstone Project: Xây dựng hoàn chỉnh CI/CD Pipeline cho Web Application\n\n---\n\n## 🎯 Mục tiêu\n- Tổng hợp toàn bộ kiến thức Level 7 để thiết kế một đường ống CI/CD chuẩn doanh nghiệp hoàn chỉnh từ A đến Z.\n- Xây dựng quy trình tự động hóa đa tầng: Linting, Unit Testing, Matrix Build, Đóng gói Artifacts và Triển khai có phê duyệt.\n- Tích hợp bảo vệ nhánh Branch Protection Rules, quản lý Secrets an toàn và xử lý phục hồi lỗi linh hoạt.\n- Làm chủ kỹ năng tự động hóa chuyển giao phần mềm trong các môi trường doanh nghiệp thực tế.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### End-to-End CI/CD Pipeline\n- **Nói dễ hiểu**: Chu trình tự động hóa hoàn chỉnh nối liền từ khoảnh khắc lập trình viên tạo Pull Request cho tới khi code được deploy an toàn trên môi trường sản xuất.\n- **Ví dụ**: Pipeline gồm các chặng: Lint mã nguồn -> Chạy test ma trận -> Đóng gói artifact -> Triển khai staging -> Duyệt thủ công -> Đưa lên production.\n- **Đừng nhầm**: Không chỉ là một file script bash đơn giản; đây là hệ thống phối hợp giữa nhiều Jobs, Runners và chính sách bảo mật đám mây.\n\n### Pipeline Quality Gate\n- **Nói dễ hiểu**: Cổng kiểm soát chất lượng tự động ngăn chặn mã nguồn đi tiếp nếu không vượt qua các tiêu chuẩn bắt buộc (độ bao phủ test, scan bảo mật, lint).\n- **Ví dụ**: Nếu Job `lint-and-security` báo lỗi, toàn bộ các Job đóng gói và triển khai phía sau sẽ bị hủy bỏ ngay lập tức.\n- **Đừng nhầm**: Không phải là thủ tục hành chính; đây là cơ chế chặn tự động bằng máy móc thông qua thuộc tính `needs:` và `status checks`.\n\n### Post-deployment Verification\n- **Nói dễ hiểu**: Bước kiểm tra sức khỏe tự động (Smoke Test) được thực thi ngay sau khi triển khai lên máy chủ nhằm xác nhận ứng dụng hoạt động bình thường.\n- **Ví dụ**: Bước curl endpoint `/health` để kiểm tra mã phản hồi HTTP 200 trước khi thông báo triển khai thành công.\n- **Đừng nhầm**: Không phải là bài kiểm thử unit test nội bộ; đây là bài test tương tác trực tiếp với dịch vụ đang chạy trên server thật.\n\n---\n\n## 📖 Định nghĩa\nBài học Capstone là thử thách thực chiến tổng hợp đỉnh cao của Level 7. Trong bài thực hành này, bạn sẽ vào vai một Kỹ sư DevOps trưởng (Lead DevOps Engineer) chịu trách nhiệm thiết kế, cấu hình và vận hành toàn bộ hạ tầng tự động hóa CI/CD cho một ứng dụng web thương mại điện tử hiện đại. Đường ống phải đáp ứng đầy đủ các tiêu chuẩn khắt khe nhất của ngành: kiểm tra an ninh, kiểm thử đa nền tảng, quản lý tạo phẩm và cổng triển khai sản xuất có kiểm duyệt.\n\n---\n\n## 💡 Tại sao cần\nBiết từng mảnh ghép lý thuyết riêng lẻ (events, jobs, steps, matrix, secrets) là chưa đủ để vận hành một hệ thống thực tế. Giá trị thực sự của một kỹ sư phần mềm chuyên nghiệp thể hiện ở khả năng kết nối tất cả các thành phần đó lại với nhau thành một cỗ máy hoạt động trơn tru, tin cậy, bảo vệ sự ổn định của hệ thống kinh doanh 24/7 trước hàng trăm thay đổi mã nguồn mỗi tuần.\n\n---\n\n## 🧠 Mental Model\nHãy tưởng tượng bạn là tổng công trình sư thiết kế một nhà máy lọc dầu tự động hóa hoàn toàn. Dầu thô (mã nguồn mới) được đưa vào ống dẫn; hệ thống tự động lọc tạp chất và kiểm tra độ tinh khiết (CI lint và test); sau đó được phân tách thành các sản phẩm xăng dầu chuyên biệt theo ma trận tiêu chuẩn (matrix build); các sản phẩm đạt chuẩn được bơm vào kho bảo quản an toàn (artifacts); và cuối cùng, chỉ khi có chữ ký điện tử của giám đốc an toàn (environment approval), van dẫn mới được mở để cung cấp nhiên liệu ra thị trường (production deployment).\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nKiến trúc Pipeline Capstone chuẩn Doanh nghiệp:\n[Event: PR to main]\n       │\n       ├─────────────────────────┐\n       ▼                         ▼\n[Job 1: Code Lint & Format]  [Job 2: Security & Secret Scan]\n       │                         │\n       └────────────┬────────────┘\n                    ▼\n[Job 3: Matrix Unit Test (Node 18, 20 on Ubuntu)]\n                    │\n                    ▼ (needs: [lint, security, test])\n[Job 4: Build Web Application & Upload Artifact]\n                    │\n                    ▼ (needs: build)\n[Job 5: Deploy to Staging Environment]\n                    │\n                    ▼ (needs: staging, on: push main)\n[Job 6: Deploy to Production (WAITING APPROVAL Gate)]\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nMột công ty khởi nghiệp chuẩn bị ra mắt nền tảng thanh toán trực tuyến. Lập trình viên hoàn thành bài tập Capstone bằng việc tạo hai tệp workflow: `ci.yml` kiểm soát chất lượng mã nguồn trên mọi Pull Request và `deploy.yml` tự động hóa việc đưa sản phẩm lên các máy chủ đám mây. Khi một thành viên trong nhóm mở PR thêm chức năng giỏ hàng, đường ống lập tức khởi động các Jobs kiểm tra song song: lint mã nguồn, quét mã độc, chạy ma trận bài kiểm thử trên các phiên bản Node. Khi PR được duyệt và gộp vào nhánh chính, đường ống triển khai tự động kích hoạt, tạo gói nén artifact, đẩy lên môi trường Staging và gửi yêu cầu phê duyệt cho giám đốc kỹ thuật trước khi đưa lên Production. Toàn bộ quy trình diễn ra tự động 100%, không một sai sót.\n\n---\n\n## 💻 Command & Cú pháp\n```yaml\n# Cấu hình kiến trúc CI/CD Pipeline tổng thể\nname: Enterprise Capstone Pipeline\non:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]\n\njobs:\n  lint-and-audit:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n      - run: npm ci\n      - run: npm run lint\n\n  matrix-test:\n    needs: lint-and-audit\n    runs-on: ubuntu-latest\n    strategy:\n      matrix:\n        node: [18, 20]\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: ${{ matrix.node }}\n      - run: npm ci\n      - run: npm test\n\n  build-and-package:\n    needs: matrix-test\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci && npm run build\n      - uses: actions/upload-artifact@v4\n        with:\n          name: webapp-dist\n          path: dist/\n\n  deploy-prod:\n    needs: build-and-package\n    if: github.ref == 'refs/heads/main' && github.event_name == 'push'\n    runs-on: ubuntu-latest\n    environment:\n      name: production\n      url: https://ecommerce.example.com\n    steps:\n      - uses: actions/download-artifact@v4\n        with:\n          name: webapp-dist\n          path: dist\n      - name: Deploy to Cloud\n        env:\n          PROD_KEY: ${{ secrets.PROD_API_KEY }}\n        run: echo \"Deploying bundle to cloud cluster with key $PROD_KEY\"\n```\n\n---\n\n## 🔍 Giải thích command\n- `needs: [lint-and-audit]`: Đảm bảo job sau chỉ khởi chạy khi job trước thành công.\n- `strategy.matrix`: Chạy bài kiểm thử song song trên nhiều phiên bản Node.js.\n- `upload-artifact@v4` và `download-artifact@v4`: Lưu trữ và chuyển giao sản phẩm build giữa các Job độc lập.\n- `if: github.ref == 'refs/heads/main' && github.event_name == 'push'`: Đảm bảo chỉ deploy lên production khi commit đã vào nhánh `main`.\n- `environment: production`: Kích hoạt cổng kiểm duyệt thủ công và cách ly Secrets cấp độ môi trường.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Thiếu ràng buộc `needs` giữa các chặng**: Dẫn tới việc Job deploy chạy song song cùng lúc với Job test, có thể deploy nhầm mã nguồn đang bị lỗi.\n2. **Không phân tách quyền triển khai theo sự kiện**: Cho phép các sự kiện `pull_request` vô tình kích hoạt việc deploy lên hệ thống thật.\n3. **Quên kiểm tra sức khỏe sau triển khai**: Chỉ xem log deploy mà không kiểm tra xem website có thực sự phản hồi hay gặp lỗi sập server (500 Internal Server Error).\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. **Bước 1**: Xây dựng hoàn chỉnh tệp `.github/workflows/ci-cd-capstone.yml` theo cấu trúc 4 tầng: Lint -> Matrix Test -> Build & Artifact -> Deploy.\n2. **Bước 2**: Cấu hình ma trận kiểm thử cho 2 phiên bản Node.js (18 và 20).\n3. **Bước 3**: Thiết lập môi trường `production` với tính năng Required reviewers trên GitHub repository.\n4. **Bước 4**: Mở Pull Request để kiểm tra chất lượng CI, sau đó tiến hành merge vào `main` để kích hoạt chặng Deploy và trải nghiệm cổng phê duyệt thực tế.\n\n---\n\n## 💡 Hint & mẹo\n> Bạn nên vẽ sơ đồ khối quan hệ phụ thuộc giữa các Job lên giấy hoặc bảng trắng trước khi bắt tay viết các dòng YAML để không bị nhầm lẫn thứ tự `needs`.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Toàn bộ đồ thị pipeline hiển thị trực quan đẹp mắt trong giao diện GitHub Actions với các nhánh phụ thuộc rõ ràng.\n- Giai đoạn CI chạy tự động trên Pull Request và khóa nút Merge nếu có bài test thất bại.\n- Sau khi merge vào `main`, pipeline chạy tiếp đến bước Deploy Production và tạm dừng an toàn để chờ người kiểm duyệt bấm nút Approve.\n\n---\n\n## ❓ Quiz nhanh\nHãy hoàn thành bài kiểm tra tổng hợp kiến thức toàn diện của Level 7 CI/CD Capstone trong phần trắc nghiệm bên dưới.\n\n---\n\n## 🚀 Thử thách nâng cao\nThiết kế giải pháp tự động hoàn tác (Rollback Pipeline) khi bước kiểm tra sức khỏe ứng dụng (Smoke Test) phát hiện endpoint dịch vụ trả về mã lỗi 500 sau khi triển khai?\n\n---\n\n## 📝 Tổng kết\n- Hoàn thành xuất sắc toàn bộ các khối kiến thức cốt lõi của GitHub Actions và đường ống CI/CD hiện đại.\n- Làm chủ từ cú pháp YAML, quản lý sự kiện, ma trận kiểm thử cho đến bảo mật bí mật và phê duyệt môi trường.\n- Sẵn sàng tự tin áp dụng tự động hóa chuyên nghiệp vào bất kỳ dự án phần mềm thực tế nào trong doanh nghiệp.\n- Xây dựng tư duy kỹ sư DevOps: viết mã luôn đi kèm với tự động hóa kiểm định và chuyển giao an toàn.\n",
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
      },
      {
        "id": "q5",
        "question": "Bước cuối cùng sau khi hoàn tất triển khai (Post-deployment) trong một pipeline CD chuyên nghiệp nên là gì?",
        "type": "single",
        "options": [
          {
            "text": "Thực hiện Smoke Test kiểm tra sức khỏe ứng dụng và gửi thông báo trạng thái tới kênh liên lạc của đội ngũ",
            "correct": true
          },
          {
            "text": "Tắt toàn bộ hệ thống giám sát server",
            "correct": false
          },
          {
            "text": "Xóa toàn bộ commit trên nhánh main",
            "correct": false
          },
          {
            "text": "Xóa sạch cơ sở dữ liệu để giải phóng bộ nhớ",
            "correct": false
          }
        ],
        "explanation": "Sau khi triển khai thành công, việc chạy Smoke Test tự động và thông báo kết quả qua Slack hoặc Discord giúp đội ngũ phát hiện tức thì nếu hệ thống gặp sự cố sau phát hành."
      }
    ]
  }
};
export default lesson;
