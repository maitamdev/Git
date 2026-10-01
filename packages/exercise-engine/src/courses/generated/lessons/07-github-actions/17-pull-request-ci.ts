import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "17-pull-request-ci",
  "moduleId": "07-github-actions",
  "metadata": {
    "id": "17-pull-request-ci",
    "title": "Thiết lập CI Pipeline tự động kiểm thử trên Pull Request",
    "level": "advanced",
    "duration": 35,
    "xp": 100,
    "prerequisites": [
      "16-secrets-and-variables"
    ],
    "objectives": [
      "Thiết lập hoàn chỉnh một pipeline CI tự động kích hoạt mỗi khi có Pull Request được mở hoặc cập nhật.",
      "Liên kết chặt chẽ kết quả của GitHub Actions với tính năng Branch Protection Rules (Required Status Checks).",
      "Trải nghiệm quy trình kiểm soát chất lượng: Khóa nút Merge khi bài test đỏ và Mở khóa khi bài test xanh."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "pull request ci",
      "pr automation",
      "status checks",
      "branch protection",
      "code quality gate"
    ],
    "commands": [
      "gh pr create --title \"feat: new login\"",
      "gh pr checks",
      "gh pr merge --auto"
    ]
  },
  "content": "# Thiết lập CI Pipeline tự động kiểm thử trên Pull Request\n\n---\n\n## 🎯 Mục tiêu\n- Thiết lập hoàn chỉnh một pipeline CI tự động kích hoạt mỗi khi có Pull Request được mở hoặc cập nhật.\n- Liên kết chặt chẽ kết quả của GitHub Actions với tính năng Branch Protection Rules (Required Status Checks).\n- Trải nghiệm quy trình kiểm soát chất lượng: Khóa nút Merge khi bài test đỏ và Mở khóa khi bài test xanh.\n- Hiểu rõ cơ chế merge ảo của Git trên nhánh `refs/pull/:id/merge`.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Status Checks\n- **Nói dễ hiểu**: Báo cáo trạng thái (thành công, thất bại, đang chờ) do workflow gửi về giao diện Pull Request để biểu thị kết quả kiểm thử.\n- **Ví dụ**: Biểu tượng tích xanh kèm tên kiểm tra `ci/test` trên trang thảo luận của Pull Request.\n- **Đừng nhầm**: Không phải là bình luận bằng chữ (PR comment); đây là trạng thái hệ thống được liên kết trực tiếp với commit SHA.\n\n### Branch Protection Rules\n- **Nói dễ hiểu**: Tập hợp quy tắc bảo vệ do quản trị viên thiết lập trên nhánh chính để ngăn chặn việc xóa nhánh hoặc hợp nhất code lỗi.\n- **Ví dụ**: Bật tùy chọn \"Require status checks to pass before merging\" để khóa nút Merge nếu CI chưa xanh.\n- **Đừng nhầm**: Chỉ các quy tắc đã bật mới được thực thi; required status checks chặn merge khi chưa đạt, còn quyền bypass/admin và quyền push tùy cấu hình.\n\n### Merge Commit Ref\n- **Nói dễ hiểu**: Tham chiếu merge thử nghiệm dạng `refs/pull/:id/merge` mà GitHub dùng cho `pull_request` khi có thể tạo kết quả merge để kiểm tra thay đổi với nhánh đích.\n- **Ví dụ**: Runner kéo mã nguồn từ `refs/pull/42/merge` để chạy test trên mã nguồn sau khi hợp nhất giả lập.\n- **Đừng nhầm**: Đây không phải commit đã được merge vào nhánh đích; cách checkout phụ thuộc event và trạng thái merge của PR.\n\n---\n\n## 📖 Định nghĩa\nPull Request CI là cách kiểm tra thay đổi trước khi merge. Khi workflow lắng nghe `pull_request`, GitHub Actions có thể chạy kiểm tra trên merge ref thử nghiệm, tùy khả năng tạo merge. Kết quả được báo về PR; việc chặn merge cần cấu hình required status checks trong branch protection hoặc ruleset.\n\n---\n\n## 💡 Tại sao cần\nNếu chỉ kiểm tra sau khi merge, lỗi có thể ảnh hưởng tới nhánh chính trước khi phát hiện. PR CI đưa kết quả kiểm tra tới reviewer sớm hơn; muốn kết quả chặn merge thì quản trị viên phải cấu hình required checks, và vẫn cần quyền bypass được kiểm soát.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung trạm kiểm dịch hải quan tại sân bay quốc tế. Hành khách (các commit trong PR) muốn nhập cảnh vào quốc gia (nhánh main) bắt buộc phải đi qua máy quét an ninh và cổng soi chiếu sinh học (CI Pipeline). Nếu hành lý chứa chất cấm hoặc có triệu chứng nhiễm virus nguy hiểm (bài test bị lỗi hoặc linter phát hiện sai chuẩn), cánh cửa hải quan sẽ khóa chặt và hành khách bị chặn lại để xử lý trước khi có thể đặt chân vào nội địa.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nTích hợp bảo vệ nhánh với PR CI Status Checks:\nDeveloper tạo PR ──► [Kích hoạt CI Workflow]\n                          │\n                          ▼\n                     [Chạy Tests]\n                          │\n           ┌──────────────┴──────────────┐\n           ▼                             ▼\n      [Tests PASS ✓]               [Tests FAIL ✗]\n           │                             │\n           ▼                             ▼\nStatus Check: Xanh (Success)   Status Check: Đỏ (Failure)\n           │                             │\n           ▼                             ▼\n[Merge có thể tiếp tục theo ruleset] [Merge bị chặn nếu check được đặt required]\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nVí dụ giả định: repo đã đặt `ci/test` là required check. Khi test thất bại, merge bị chặn theo rule; sau khi sửa và CI xanh, các yêu cầu review còn lại vẫn phải được đáp ứng. Quyền bypass nếu có cũng phụ thuộc cấu hình.\n\n---\n\n## 💻 Command & Cú pháp\n```yaml\n# Workflow kiểm tra chất lượng Pull Request\nname: Pull Request CI\non:\n  pull_request:\n    branches: [main]\n    types: [opened, synchronize, reopened]\n\njobs:\n  verify:\n    name: quality-gate\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v7\n      - name: Setup Node.js\n        uses: actions/setup-node@v7\n        with:\n          node-version: 24\n      - name: Install dependencies\n        run: npm ci\n      - name: Run code linter\n        run: npm run lint\n      - name: Execute automated tests\n        run: npm test\n```\n\n---\n\n## 🔍 Giải thích command\n- `on.pull_request.branches: [main]`: Workflow chỉ lắng nghe các PR có nhánh đích (base branch) là `main`.\n- `types: [opened, synchronize, reopened]`: Kích hoạt khi PR mới được mở, khi tác giả đẩy thêm commit mới (`synchronize`), hoặc khi mở lại PR đã đóng.\n- `name: quality-gate`: Tên hiển thị cho Job; tên check cụ thể cần xác nhận trong giao diện PR rồi mới chọn làm required check.\n- `actions/checkout@v7`: Với `pull_request`, mặc định checkout merge ref thử nghiệm nếu ref đó có sẵn; có thể cấu hình checkout head SHA khác.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Kích hoạt cả `push` và `pull_request`**: Một lần push lên nhánh PR có thể tạo hai workflow run nếu cả hai bộ lọc khớp; cân nhắc thiết kế trigger để tránh chạy trùng không cần thiết.\n2. **Chọn nhầm required check**: Chạy workflow ít nhất một lần rồi chọn status check thực tế; check bị bỏ qua hoặc đổi tên có thể khiến merge bị pending.\n3. **Chỉ kiểm thử trên commit của tác giả thay vì commit sau khi merge**: Có thể xảy ra trường hợp code tác giả chạy tốt trên nhánh feature nhưng xung đột logic với commit mới nhất trên nhánh main.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. **Bước 1**: Đọc tệp mẫu `.github/workflows/pr-ci.yml` và xác định event, nhánh đích, Job và lệnh kiểm tra. Chạy thật trên GitHub là phần tùy chọn, cần repo có Actions/quyền truy cập.\n2. **Bước 2**: Định nghĩa job `lint-and-test` thực hiện chạy linter và unit test của dự án.\n3. **Bước 3**: Với repo GitHub bạn có quyền dùng, mở PR thử nghiệm; nếu không, đọc cấu hình và chỉ ra thời điểm `pull_request` sẽ kích hoạt.\n4. **Bước 4**: Quan sát Checks và phân biệt pending, success, failure; nếu không có repo, kiểm tra luồng dự kiến từ YAML.\n\n---\n\n## 💡 Hint & mẹo\n> Bạn có thể sử dụng GitHub CLI với lệnh `gh pr checks` để xem ngay trạng thái CI của PR hiện tại từ terminal mà không cần chuyển qua cửa sổ trình duyệt.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Xác định được workflow sẽ báo kết quả ở mục Checks trên PR.\n- Chỉ khi check được cấu hình required thì failure/pending mới chặn merge; các review/rule khác vẫn có hiệu lực.\n\n---\n\n## ❓ Quiz nhanh\nHãy kiểm tra kiến thức về thiết lập đường ống CI cho Pull Request qua các câu hỏi trong phần trắc nghiệm bên dưới.\n\n---\n\n## 🚀 Thử thách nâng cao\nLàm thế nào để sử dụng đường ống CI gửi tin nhắn tóm tắt kết quả kiểm thử trực tiếp vào phần bình luận của Pull Request bằng action `actions/github-script`?\n\n---\n\n## 📝 Tổng kết\n- PR CI tự động kiểm tra chất lượng mã nguồn mỗi khi có yêu cầu hợp nhất mới hoặc có commit đẩy thêm.\n- Kết hợp với required status checks để chặn merge theo chính sách repo.\n- CI giảm rủi ro nhưng không bảo đảm phát hiện mọi lỗi hoặc ngăn mọi cách bypass.\n",
  "quiz": {
    "id": "quiz-07-github-actions-17-pull-request-ci",
    "title": "Trắc nghiệm: Thiết lập CI Pipeline tự động kiểm thử trên Pull Request",
    "questions": [
      {
        "id": "q1",
        "question": "Sự kiện nào trong GitHub Actions được kích hoạt khi một nhà phát triển tạo hoặc đẩy thêm mã vào một Pull Request?",
        "type": "single",
        "options": [
          {
            "text": "pull_request",
            "correct": true
          },
          {
            "text": "merge_request",
            "correct": false
          },
          {
            "text": "code_review",
            "correct": false
          },
          {
            "text": "pr_create",
            "correct": false
          }
        ],
        "explanation": "Sự kiện `pull_request` lắng nghe mọi biến động liên quan đến vòng đời của Pull Request trong kho lưu trữ."
      },
      {
        "id": "q2",
        "question": "Khi tính năng \"Require status checks to pass before merging\" được bật, điều gì sẽ xảy ra nếu bài test CI bị thất bại?",
        "type": "single",
        "options": [
          {
            "text": "Merge bị chặn nếu check được cấu hình required và không có quyền bypass phù hợp",
            "correct": true
          },
          {
            "text": "Nhánh chính tự động bị xóa",
            "correct": false
          },
          {
            "text": "Mã nguồn tự động được hợp nhất nhưng có cảnh báo màu vàng",
            "correct": false
          },
          {
            "text": "Lập trình viên bị trừ tiền lương tự động",
            "correct": false
          }
        ],
        "explanation": "Required status checks chặn merge khi chưa đạt; quyền bypass vẫn phụ thuộc cấu hình branch protection hoặc ruleset."
      },
      {
        "id": "q3",
        "question": "Tại sao không nên cấu hình workflow chạy đồng thời trên `on: [push, pull_request]` cho cùng một nhánh nội bộ?",
        "type": "single",
        "options": [
          {
            "text": "Một lần push có thể khớp cả hai trigger và tạo hai workflow run, tùy bộ lọc nhánh/sự kiện",
            "correct": true
          },
          {
            "text": "Vì làm máy chủ của GitHub bị nổ tung",
            "correct": false
          },
          {
            "text": "Vì GitHub cấm khai báo nhiều sự kiện",
            "correct": false
          },
          {
            "text": "Vì kết quả của hai lần chạy sẽ triệt tiêu lẫn nhau",
            "correct": false
          }
        ],
        "explanation": "Push lên nhánh đang có PR có thể khớp cả `push` lẫn `pull_request`; hãy kiểm tra bộ lọc trước khi bỏ một trigger."
      },
      {
        "id": "q4",
        "question": "Lệnh GitHub CLI nào cho phép lập trình viên theo dõi tiến độ các bài kiểm tra Status Checks của PR hiện tại?",
        "type": "single",
        "options": [
          {
            "text": "gh pr checks",
            "correct": true
          },
          {
            "text": "gh test status",
            "correct": false
          },
          {
            "text": "gh ci view",
            "correct": false
          },
          {
            "text": "gh run inspect",
            "correct": false
          }
        ],
        "explanation": "`gh pr checks` liệt kê chi tiết từng bài kiểm tra trạng thái đang chờ, thành công hoặc thất bại gắn liền với PR hiện tại."
      },
      {
        "id": "q5",
        "question": "Với PR có thể merge, tham chiếu nào thường được checkout mặc định cho sự kiện pull_request?",
        "type": "single",
        "options": [
          {
            "text": "refs/pull/:number/merge",
            "correct": true
          },
          {
            "text": "refs/heads/:feature_branch",
            "correct": false
          },
          {
            "text": "refs/tags/:release_tag",
            "correct": false
          },
          {
            "text": "refs/remotes/upstream/head",
            "correct": false
          }
        ],
        "explanation": "Merge ref biểu diễn kết quả thử merge để kiểm tra; nó không phải commit đã được đưa vào nhánh đích."
      },
      {
        "id": "q6",
        "question": "Trong quy trình CI Pull Request, trạng thái nào sau đây của Status Check biểu thị rằng bài kiểm tra đang được chạy?",
        "type": "single",
        "options": [
          {
            "text": "pending",
            "correct": true
          },
          {
            "text": "success",
            "correct": false
          },
          {
            "text": "failure",
            "correct": false
          },
          {
            "text": "cancelled",
            "correct": false
          }
        ],
        "explanation": "`pending` nghĩa là check chưa có kết quả cuối cùng; workflow có thể đang chạy hoặc bị bỏ qua do filter."
      }
    ]
  }
};
export default lesson;
