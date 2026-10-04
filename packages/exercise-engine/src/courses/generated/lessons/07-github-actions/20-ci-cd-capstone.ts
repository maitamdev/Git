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
  "content": "# Capstone Project: Xây dựng hoàn chỉnh CI/CD Pipeline cho Web Application\n\n---\n\n## 🎯 Mục tiêu\n- Kết nối trigger, jobs, matrix, artifacts và environment thành một pipeline dễ đọc.\n- Phân biệt phần CI trong YAML với các thiết lập repo như required checks và phê duyệt môi trường.\n- Thực hành theo ví dụ có điều kiện tiên quyết rõ ràng; biết điểm nào phải thay bằng lệnh triển khai của dự án.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### End-to-End CI/CD Pipeline\n- **Nói dễ hiểu**: Pipeline nối các bước kiểm tra và phát hành theo trigger, điều kiện, quyền và cấu hình của repo.\n- **Ví dụ**: PR chạy lint/test; push vào `main` có thể tiếp tục build và deploy staging rồi chờ rule môi trường production.\n- **Đừng nhầm**: Một file YAML không tự cung cấp lệnh deploy, credentials, branch protection hay hạ tầng đích.\n\n### Pipeline Quality Gate\n- **Nói dễ hiểu**: Điều kiện đã cấu hình quyết định job sau có chạy hay không; required status check có thể chặn merge.\n- **Ví dụ**: `build` khai báo `needs: [lint, audit, test]`, nên mặc định bị bỏ qua nếu một job tiên quyết lỗi hoặc bị bỏ qua.\n- **Đừng nhầm**: `needs` điều khiển luồng job; việc chặn merge cần chọn check trong branch protection/ruleset.\n\n### Post-deployment Verification\n- **Nói dễ hiểu**: Bước kiểm tra sức khỏe tự động (Smoke Test) được thực thi ngay sau khi triển khai lên máy chủ nhằm xác nhận ứng dụng hoạt động bình thường.\n- **Ví dụ**: Sau deploy, `curl --fail \"$APP_URL/health\"` báo lỗi nếu endpoint không trả phản hồi thành công.\n- **Đừng nhầm**: Không phải là bài kiểm thử unit test nội bộ; đây là bài test tương tác trực tiếp với dịch vụ đang chạy trên server thật.\n\n---\n\n## 📖 Định nghĩa\nBài này ghép các phần Level 7 thành một ví dụ workflow cho ứng dụng Node.js có `package-lock.json`, các script `lint`, `test`, `build` và script deploy do dự án cung cấp. Ví dụ minh họa quan hệ giữa các job; cần thay domain, command, policy, secrets và môi trường theo dự án thật. Không có một pipeline duy nhất đúng cho mọi nhóm.\n\n---\n\n## 🤔 Tại sao cần?\nBiết từng khái niệm riêng lẻ chưa đủ để đọc một pipeline. Capstone giúp thấy trigger quyết định lúc chạy, `needs` quyết định thứ tự, artifact chuyển file, còn environment và branch rules được cấu hình ở repo. Pipeline giảm thao tác lặp nhưng không đảm bảo ứng dụng không lỗi.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung một bưu cục: PR đưa kiện hàng qua các khâu kiểm tra song song; khi đạt, một bản build được niêm phong thành artifact. Push lên `main` có thể chuyển artifact sang staging. Production chỉ nhận kiện hàng khi rule môi trường được cấu hình và người có quyền duyệt.\n\n---\n\n## 🖼 Sơ đồ\n```text\nPR hoặc push main\n       ├── lint ───────────┐\n       ├── dependency audit├── build + upload artifact\n       └── test matrix ────┘          │\n                              push main only\n                                      ▼\n                               deploy staging\n                                      ▼\n                         production environment rule\n                                      ▼\n                       deploy + smoke test /health\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrong môi trường phát triển dự án thực tế: PR chạy lint, dependency audit và test matrix; nếu repo đặt check làm required, merge phải chờ điều kiện đó. Push vào `main` tiếp tục build và lưu artifact, rồi gọi lệnh deploy của dự án cho staging. Job production tham chiếu environment; nếu reviewer rule đã cấu hình và gói repo hỗ trợ, Job chờ duyệt trước khi chạy. Kết quả vẫn cần smoke test, monitoring và rollback plan.\n\n---\n\n## 💻 Command\n```yaml\n# Ví dụ khung; cần có package-lock.json, npm scripts và scripts/deploy-*.sh của dự án\nname: Capstone CI and Deployment\non:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]\n\npermissions:\n  contents: read\n\njobs:\n  lint:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v7\n      - uses: actions/setup-node@v7\n        with:\n          node-version: 24\n      - run: npm ci\n      - run: npm run lint\n\n  dependency-audit:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v7\n      - uses: actions/setup-node@v7\n        with:\n          node-version: 24\n      - run: npm ci\n      - run: npm audit --audit-level=high\n\n  test:\n    runs-on: ubuntu-latest\n    strategy:\n      fail-fast: false\n      matrix:\n        node: [22, 24]\n    steps:\n      - uses: actions/checkout@v7\n      - uses: actions/setup-node@v7\n        with:\n          node-version: ${{ matrix.node }}\n      - run: npm ci\n      - run: npm test\n\n  build:\n    needs: [lint, dependency-audit, test]\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v7\n      - uses: actions/setup-node@v7\n        with:\n          node-version: 24\n      - run: npm ci\n      - run: npm run build\n      - uses: actions/upload-artifact@v7\n        with:\n          name: webapp-dist\n          path: dist/\n          retention-days: 7\n\n  deploy-staging:\n    needs: build\n    if: github.event_name == 'push' && github.ref == 'refs/heads/main'\n    runs-on: ubuntu-latest\n    environment: staging\n    steps:\n      - uses: actions/download-artifact@v8\n        with:\n          name: webapp-dist\n          path: dist\n      - name: Deploy to staging\n        run: ./scripts/deploy-staging.sh dist/\n\n  deploy-production:\n    needs: deploy-staging\n    if: github.event_name == 'push' && github.ref == 'refs/heads/main'\n    runs-on: ubuntu-latest\n    environment:\n      name: production\n    steps:\n      - uses: actions/download-artifact@v8\n        with:\n          name: webapp-dist\n          path: dist\n      - name: Deploy to production\n        env:\n          PROD_API_TOKEN: ${{ secrets.PROD_API_TOKEN }}\n        run: ./scripts/deploy-production.sh dist/\n      - name: Smoke test\n        env:\n          APP_URL: ${{ vars.PRODUCTION_URL }}\n        run: curl --fail --silent --show-error \"$APP_URL/health\"\n```\n\nTrong ví dụ, `./scripts/deploy-staging.sh` và `./scripts/deploy-production.sh` là lệnh giả định phải có trong dự án. Nếu chưa có, thay bằng lệnh deploy của nền tảng đang dùng. Không đặt secret ở job kiểm thử; với nhà cung cấp cloud hỗ trợ, ưu tiên OIDC thay token dài hạn.\n\n---\n\n## 🔍 Giải thích command\n- `needs: [lint, dependency-audit, test]`: Chỉ cho phép build tiếp tục khi cả ba job tiên quyết thành công.\n- `strategy.matrix`: Tạo các Job test riêng cho Node 22 và 24; chúng có thể chạy song song tùy runner/concurrency.\n- `upload-artifact@v7` và `download-artifact@v8`: Chuyển thư mục build qua các Job; Action này không tự deploy.\n- `if`: Giới hạn deploy vào push trên `main`; PR chạy CI nhưng bỏ qua staging/production.\n- `environment: production`: Liên kết Job với môi trường; reviewer/branch rules và secret phải được cấu hình riêng trong repo.\n- `permissions: contents: read`: Giới hạn mặc định quyền token của workflow; chỉ thêm quyền khi một job thật sự cần.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Thiếu `needs` giữa build và deploy**: Job deploy có thể chạy trước khi Artifact được tạo.\n2. **Không phân tách quyền theo sự kiện**: Workflow trên PR không nên được cấp credentials production; điều kiện trong YAML cần đi cùng quyền tối thiểu và protection rules.\n3. **Tưởng `environment: production` tự tạo phê duyệt**: Phải cấu hình Required reviewers hoặc rule khác trong Settings; khả năng dùng tùy gói/repo.\n4. **Chỉ xem log deploy**: Thêm smoke test và theo dõi dịch vụ; test thành công không thay thế monitoring hoặc rollback plan.\n\n---\n\n## 🧪 Lab\nHãy mở terminal và cùng tôi thực hành từng bước dưới đây để làm chủ kỹ năng:\n\n1. **Bước 1**: Trước khi chạy ví dụ, xác nhận dự án có `package-lock.json` và scripts `lint`, `test`, `build`; nếu chưa có, dùng YAML để vẽ/đánh dấu luồng job mà chưa chạy thật.\n2. **Bước 2**: Đọc ma trận Node `22`/`24`; dự án thật nên chọn các phiên bản Node còn được hỗ trợ và phù hợp với người dùng.\n3. **Bước 3**: Xác định vì sao PR chỉ chạy CI còn push lên `main` mới đi tiếp staging/production.\n4. **Bước 4 (tùy chọn)**: Với repository có quyền truy cập và gói hỗ trợ, cấu hình environments, reviewer, variables/secrets rồi chạy workflow. Thay lệnh deploy giả định bằng lệnh của nền tảng đang dùng.\n\n---\n\n## 💡 Hint\n> Bạn nên vẽ sơ đồ khối quan hệ phụ thuộc giữa các Job lên giấy hoặc bảng trắng trước khi bắt tay viết các dòng YAML để không bị nhầm lẫn thứ tự `needs`.\n\n---\n\n## ✅ Validation\n- Vẽ đúng DAG: lint, dependency audit, test matrix chạy độc lập; build đợi cả ba; staging chỉ chạy trên push `main`.\n- Biết required check phải được bật riêng trong branch protection/ruleset mới chặn merge.\n- Biết Job production chỉ chờ phê duyệt nếu environment rule đã cấu hình và repo/gói hỗ trợ.\n- Phân biệt placeholder deploy script với một lệnh deploy đã triển khai thật.\n\n---\n\n## ❓ Quiz\nHãy hoàn thành bài kiểm tra tổng hợp kiến thức toàn diện của Level 7 CI/CD Capstone trong phần trắc nghiệm bên dưới.\n\n---\n\n## 🔥 Challenge\nThiết kế giải pháp tự động hoàn tác (Rollback Pipeline) khi bước kiểm tra sức khỏe ứng dụng (Smoke Test) phát hiện endpoint dịch vụ trả về mã lỗi 500 sau khi triển khai?\n\n---\n\n## 📚 Tổng kết\n- Pipeline là đồ thị job; `needs` điều khiển phụ thuộc, matrix tạo nhiều tổ hợp, artifact chuyển file.\n- Trigger/`if` giới hạn lúc deploy; repo settings mới cấu hình required checks và environment approvals.\n- Secrets cần quyền tối thiểu; không in ra log; lệnh deploy phải khớp hạ tầng thật.\n- CI/CD giúp phát hiện lỗi sớm hơn nhưng vẫn cần review, giám sát và phương án khôi phục.\n",
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
            "text": "Lint/audit/test -> Build & Artifact -> Deploy Staging -> rule môi trường (nếu cấu hình) -> Deploy Production -> Smoke Test",
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
        "explanation": "Job build cần đợi các kiểm tra cần thiết; deploy cần đợi artifact và môi trường phù hợp, còn approval chỉ có khi đã cấu hình."
      },
      {
        "id": "q2",
        "question": "Thành phần nào đóng vai trò như chốt chặn an ninh ngăn không cho mã nguồn lỗi lọt vào nhánh chính?",
        "type": "single",
        "options": [
          {
            "text": "Required Status Checks được bật trong branch protection/ruleset và gắn với kết quả CI",
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
        "explanation": "CI gửi kết quả check; quản trị viên phải cấu hình check đó thành required, đồng thời quản lý quyền bypass phù hợp."
      },
      {
        "id": "q3",
        "question": "Khi triển khai lên môi trường Production, thực hành nào sau đây là quan trọng nhất để đảm bảo an toàn?",
        "type": "single",
        "options": [
          {
            "text": "Cấu hình Environment Protection Rules nếu repo/gói hỗ trợ, giới hạn secret và chỉ cấp cho Job deploy cần dùng",
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
        "explanation": "Environment rules có thể yêu cầu reviewer; secrets chỉ nên cấp cho đúng job, nhưng cần thêm quyền tối thiểu và kế hoạch giám sát/khôi phục."
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
