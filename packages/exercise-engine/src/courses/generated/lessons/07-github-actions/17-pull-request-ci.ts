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
  "content": "# Thiết lập CI Pipeline tự động kiểm thử trên Pull Request\n\n---\n\n## 🎯 Mục tiêu\n- Thiết lập hoàn chỉnh một pipeline CI tự động kích hoạt mỗi khi có Pull Request được mở hoặc cập nhật.\n- Liên kết chặt chẽ kết quả của GitHub Actions với tính năng Branch Protection Rules (Required Status Checks).\n- Trải nghiệm quy trình kiểm soát chất lượng: Khóa nút Merge khi bài test đỏ và Mở khóa khi bài test xanh.\n- Hiểu rõ cơ chế merge ảo của Git trên nhánh `refs/pull/:id/merge`.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Status Checks\n- **Nói dễ hiểu**: Báo cáo trạng thái (thành công, thất bại, đang chờ) do workflow gửi về giao diện Pull Request để biểu thị kết quả kiểm thử.\n- **Ví dụ**: Biểu tượng tích xanh kèm tên kiểm tra `ci/test` trên trang thảo luận của Pull Request.\n- **Đừng nhầm**: Không phải là bình luận bằng chữ (PR comment); đây là trạng thái hệ thống được liên kết trực tiếp với commit SHA.\n\n### Branch Protection Rules\n- **Nói dễ hiểu**: Tập hợp quy tắc bảo vệ do quản trị viên thiết lập trên nhánh chính để ngăn chặn việc xóa nhánh hoặc hợp nhất code lỗi.\n- **Ví dụ**: Bật tùy chọn \"Require status checks to pass before merging\" để khóa nút Merge nếu CI chưa xanh.\n- **Đừng nhầm**: Không ngăn cản lập trình viên mở PR hay tạo nhánh mới; chỉ ngăn hành động merge hoặc push trực tiếp vào nhánh được bảo vệ.\n\n### Merge Commit Ref\n- **Nói dễ hiểu**: Nhánh tham chiếu ảo tạm thời dạng `refs/pull/:id/merge` mà GitHub tự động sinh ra khi mở PR để kiểm tra tính tương thích giữa nhánh tính năng và nhánh đích.\n- **Ví dụ**: Runner kéo mã nguồn từ `refs/pull/42/merge` để chạy test trên mã nguồn sau khi hợp nhất giả lập.\n- **Đừng nhầm**: Không phải là commit thật đã vào nhánh chính; commit này sẽ bị hủy nếu PR bị đóng hoặc có xung đột mã nguồn.\n\n---\n\n## 📖 Định nghĩa\nPull Request CI là mô hình kiểm chuẩn tự động bắt buộc trong quy trình phát triển phần mềm chuyên nghiệp. Khi một lập trình viên tạo hoặc đẩy thêm mã nguồn vào một Pull Request, GitHub Actions tự động tạo ra một nhánh ảo hợp nhất thử nghiệm (merge commit tạm thời) và thực thi toàn bộ chuỗi kiểm tra (Linter, Unit Test, Type Check). Kết quả thành công hay thất bại được gắn trực tiếp vào báo cáo trạng thái (Status Check) của PR.\n\n---\n\n## 💡 Tại sao cần\nNếu không có CI gác cổng trên Pull Request, nhánh chính (main) sẽ liên tục bị vỡ hoặc suy giảm hiệu năng do những lỗi bất cẩn, xung đột thư viện của lập trình viên. Đợi đến khi code đã được merge vào main mới phát hiện lỗi thì đã quá muộn và tốn rất nhiều công sức để tìm kiếm commit lỗi và phục hồi hệ thống. PR CI đóng vai trò như một bộ lọc sạch tự động: mọi đoạn mã kém chất lượng đều bị chặn đứng ngay trước cửa ngõ của nhánh chính, bảo vệ sự ổn định tối cao của sản phẩm.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung trạm kiểm dịch hải quan tại sân bay quốc tế. Hành khách (các commit trong PR) muốn nhập cảnh vào quốc gia (nhánh main) bắt buộc phải đi qua máy quét an ninh và cổng soi chiếu sinh học (CI Pipeline). Nếu hành lý chứa chất cấm hoặc có triệu chứng nhiễm virus nguy hiểm (bài test bị lỗi hoặc linter phát hiện sai chuẩn), cánh cửa hải quan sẽ khóa chặt và hành khách bị chặn lại để xử lý trước khi có thể đặt chân vào nội địa.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nTích hợp bảo vệ nhánh với PR CI Status Checks:\nDeveloper tạo PR ──► [Kích hoạt CI Workflow]\n                          │\n                          ▼\n                     [Chạy Tests]\n                          │\n           ┌──────────────┴──────────────┐\n           ▼                             ▼\n      [Tests PASS ✓]               [Tests FAIL ✗]\n           │                             │\n           ▼                             ▼\nStatus Check: Xanh (Success)   Status Check: Đỏ (Failure)\n           │                             │\n           ▼                             ▼\n[NÚT MERGE ĐƯỢC MỞ KHÓA]      [NÚT MERGE BỊ KHÓA CHẶT]\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nTrong một dự án tài chính, nhánh `main` được bảo vệ bởi quy tắc Branch Protection Rules với yêu cầu bắt buộc: bài kiểm tra `ci/test` phải đạt trạng thái thành công. Khi lập trình viên Nam mở một PR thêm tính năng chuyển tiền nhanh, Nam vô tình sửa đổi một hàm mà quên cập nhật bài kiểm thử tương ứng. Đường ống Actions chạy trong 2 phút và báo lỗi đỏ ở bài test đơn vị. Trên giao diện PR của Nam, nút \"Merge pull request\" bị vô hiệu hóa với thông báo màu đỏ: \"Required statuses must pass before merging\". Nam kiểm tra log, sửa lại đoạn mã, commit và push lên nhánh của mình. CI tự động chạy lại, báo tích xanh và nút Merge lập tức sáng lên cho phép trưởng nhóm phê duyệt.\n\n---\n\n## 💻 Command & Cú pháp\n```yaml\n# Workflow kiểm tra chất lượng Pull Request\nname: Pull Request CI\non:\n  pull_request:\n    branches: [main]\n    types: [opened, synchronize, reopened]\n\njobs:\n  verify:\n    name: quality-gate\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Setup Node.js\n        uses: actions/setup-node@v4\n        with:\n          node-version: 20\n      - name: Install dependencies\n        run: npm ci\n      - name: Run code linter\n        run: npm run lint\n      - name: Execute automated tests\n        run: npm test\n```\n\n---\n\n## 🔍 Giải thích command\n- `on.pull_request.branches: [main]`: Workflow chỉ lắng nghe các PR có nhánh đích (base branch) là `main`.\n- `types: [opened, synchronize, reopened]`: Kích hoạt khi PR mới được mở, khi tác giả đẩy thêm commit mới (`synchronize`), hoặc khi mở lại PR đã đóng.\n- `name: quality-gate`: Tên hiển thị của check trên giao diện GitHub; tên này được dùng trong Branch Protection Rules.\n- `actions/checkout@v4`: Mặc định trên sự kiện PR, action này sẽ checkout commit merge ảo `refs/pull/<pr_number>/merge`.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Kích hoạt cả hai sự kiện `push` và `pull_request` trên cùng một nhánh**: Khiến workflow bị chạy lặp lại 2 lần cho mỗi commit, gây lãng phí runner credits và làm chậm thời gian phản hồi.\n2. **Cấu hình tên Job kiểm tra trong Branch Protection Rule không khớp**: Tên status check phải trùng khớp tuyệt đối với trường `name:` của Job trong file YAML.\n3. **Chỉ kiểm thử trên commit của tác giả thay vì commit sau khi merge**: Có thể xảy ra trường hợp code tác giả chạy tốt trên nhánh feature nhưng xung đột logic với commit mới nhất trên nhánh main.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. **Bước 1**: Tạo file `.github/workflows/pr-ci.yml` với cấu hình lắng nghe sự kiện `pull_request` nhắm vào nhánh `main`.\n2. **Bước 2**: Định nghĩa job `lint-and-test` thực hiện chạy linter và unit test của dự án.\n3. **Bước 3**: Tạo nhánh mới `feature/login`, sửa mã nguồn, push lên remote và mở một Pull Request trên GitHub.\n4. **Bước 4**: Quan sát danh sách Checks ở cuối trang PR chuyển từ màu vàng (pending) sang màu xanh (success) hoặc màu đỏ (failure).\n\n---\n\n## 💡 Hint & mẹo\n> Bạn có thể sử dụng GitHub CLI với lệnh `gh pr checks` để xem ngay trạng thái CI của PR hiện tại từ terminal mà không cần chuyển qua cửa sổ trình duyệt.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Trang Pull Request hiển thị mục **Checks** với đầy đủ các bài kiểm tra được liệt kê rõ ràng.\n- Nút \"Merge pull request\" bị khóa kèm cảnh báo nếu bất kỳ bước nào trong CI pipeline thất bại.\n- Sau khi bài test pass toàn bộ, nút Merge chuyển sang trạng thái sẵn sàng để review và hợp nhất.\n\n---\n\n## ❓ Quiz nhanh\nHãy kiểm tra kiến thức về thiết lập đường ống CI cho Pull Request qua các câu hỏi trong phần trắc nghiệm bên dưới.\n\n---\n\n## 🚀 Thử thách nâng cao\nLàm thế nào để sử dụng đường ống CI gửi tin nhắn tóm tắt kết quả kiểm thử trực tiếp vào phần bình luận của Pull Request bằng action `actions/github-script`?\n\n---\n\n## 📝 Tổng kết\n- PR CI tự động kiểm tra chất lượng mã nguồn mỗi khi có yêu cầu hợp nhất mới hoặc có commit đẩy thêm.\n- Kết hợp với Branch Protection Rules tạo thành cổng kiểm soát chất lượng tuyệt đối (Quality Gate).\n- Ngăn chặn triệt để nguy cơ mã nguồn vỡ build hoặc lỗi logic lọt vào nhánh chính của dự án.\n",
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
            "text": "Nút Merge bị khóa chặt và không ai có thể hợp nhất mã nguồn bị lỗi vào nhánh chính",
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
        "explanation": "Quy tắc bảo vệ nhánh sẽ cưỡng chế việc chặn nút Merge cho đến khi tất cả các bài kiểm thử bắt buộc đều đạt kết quả xanh."
      },
      {
        "id": "q3",
        "question": "Tại sao không nên cấu hình workflow chạy đồng thời trên `on: [push, pull_request]` cho cùng một nhánh nội bộ?",
        "type": "single",
        "options": [
          {
            "text": "Vì khi lập trình viên đẩy commit lên nhánh của PR, workflow sẽ bị kích hoạt trùng lặp 2 lần cùng lúc",
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
        "explanation": "Việc kích hoạt cả hai sự kiện trên cùng một nhánh khiến GitHub Actions chạy hai phiên làm việc giống hệt nhau, làm tăng gấp đôi chi phí thời gian."
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
        "question": "Tham chiếu Git nào được GitHub Actions tự động kiểm thử khi sự kiện pull_request được kích hoạt?",
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
        "explanation": "GitHub Actions tự động tạo một merge commit thử nghiệm tại `refs/pull/:number/merge` để kiểm tra xung đột và tính toàn vẹn của mã sau khi hợp nhất."
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
        "explanation": "Trạng thái `pending` cho biết workflow hoặc job kiểm thử đang trong quá trình thực thi trên runner và chưa có kết luận cuối cùng."
      }
    ]
  }
};
export default lesson;
