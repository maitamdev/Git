import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "19-reusable-workflows",
  "moduleId": "07-github-actions",
  "metadata": {
    "id": "19-reusable-workflows",
    "title": "Tái sử dụng luồng công việc với Reusable Workflows (workflow_call)",
    "level": "advanced",
    "duration": 35,
    "xp": 110,
    "prerequisites": [
      "18-environments-and-deployment"
    ],
    "objectives": [
      "Hiểu rõ sự kiện workflow_call để biến một workflow bình thường thành một mô-đun tái sử dụng.",
      "Áp dụng nguyên lý DRY (Don't Repeat Yourself) để chuẩn hóa quy trình CI/CD trên quy mô toàn doanh nghiệp.",
      "Biết cách định nghĩa và truyền inputs, secrets giữa Caller Workflow và Called Workflow."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "reusable workflows",
      "workflow call",
      "modular ci",
      "dry principle",
      "enterprise standard"
    ],
    "commands": [
      "cat .github/workflows/reusable-build.yml",
      "cat .github/workflows/caller.yml"
    ]
  },
  "content": "# Tái sử dụng luồng công việc với Reusable Workflows (workflow_call)\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ sự kiện `workflow_call` để biến một workflow bình thường thành một mô-đun tái sử dụng.\n- Áp dụng nguyên lý DRY (Don't Repeat Yourself) để chuẩn hóa quy trình CI/CD trên quy mô toàn doanh nghiệp.\n- Biết cách định nghĩa và truyền `inputs`, `outputs` và `secrets` giữa Caller Workflow và Called Workflow.\n- Nắm vững quy tắc giới hạn lồng nhau tối đa 4 cấp độ của GitHub Actions.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### workflow_call Trigger\n- **Nói dễ hiểu**: Sự kiện kích hoạt đặc biệt của GitHub Actions biến một tệp workflow thành một hàm dùng chung có thể được triệu gọi từ workflow khác.\n- **Ví dụ**: Khai báo `on: workflow_call:` ở đầu tệp template để các dự án khác có thể tái sử dụng.\n- **Đừng nhầm**: Không kích hoạt từ sự kiện Git commit trực tiếp; chỉ chạy khi có workflow khác gọi tới.\n\n### Caller vs Called Workflow\n- **Nói dễ hiểu**: Caller Workflow là tệp gọi hàm (nơi phát lệnh), còn Called Workflow là tệp chứa định nghĩa logic được gọi.\n- **Ví dụ**: Workflow `ci.yml` của dự án web gọi tệp dùng chung `maven-build.yml` của tổ chức.\n- **Đừng nhầm**: Cả hai đều là file YAML nhưng Called Workflow bắt buộc phải có `workflow_call`, còn Caller Workflow dùng thuộc tính `uses:`.\n\n### secrets: inherit Property\n- **Nói dễ hiểu**: Cú pháp chuyển tiếp toàn bộ các biến bí mật từ workflow gọi sang workflow được gọi mà không cần ánh xạ từng biến một.\n- **Ví dụ**: Khai báo `secrets: inherit` dưới lệnh gọi `uses` để template tự động nhận diện `API_TOKEN`.\n- **Đừng nhầm**: Không làm lộ secret ra ngoài; chỉ chia sẻ trong phạm vi thực thi nội bộ của lần chạy hiện tại.\n\n---\n\n## 📖 Định nghĩa\nReusable Workflows (Luồng công việc tái sử dụng) là tính năng mạnh mẽ cho phép bạn đóng gói một workflow hoàn chỉnh để nhiều workflow khác (hoặc thậm chí nhiều kho lưu trữ khác trong tổ chức) có thể gọi lại mà không cần phải sao chép mã nguồn. Một workflow trở thành có thể tái sử dụng khi sự kiện kích hoạt của nó được khai báo là `on: workflow_call`. Workflow thực hiện cuộc gọi được gọi là Caller Workflow, và workflow được gọi là Called Workflow.\n\n---\n\n## 💡 Tại sao cần\nTrong các công ty có hàng chục vi dịch vụ (Microservices), nếu mỗi kho lưu trữ đều tự viết một tệp YAML kiểm thử và đóng gói Docker riêng biệt, thì khi cần nâng cấp phiên bản bảo mật hoặc thay đổi địa chỉ máy chủ, kỹ sư sẽ phải sửa đổi thủ công hàng chục tệp YAML giống hệt nhau. Reusable Workflows giúp tập trung hóa toàn bộ logic vào một nơi duy nhất: sửa một nơi, toàn bộ công ty được cập nhật tự động.\n\n---\n\n## 🧠 Mental Model\nHãy so sánh việc lập trình không có cấu trúc hàm con (phải sao chép cùng một đoạn mã dài lặp đi lặp lại khắp nơi trong dự án) với việc định nghĩa một Hàm dùng chung (Function/Method) mẫu mực. Reusable Workflow chính là một Hàm tiêu chuẩn ở cấp độ hạ tầng DevOps: nó có tên định danh hàm (đường dẫn tệp YAML), các tham số đầu vào (inputs), các dữ liệu trả về (outputs), và có thể được triệu gọi từ bất kỳ đâu chỉ bằng một dòng lệnh uses đơn giản.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nMô hình gọi Reusable Workflow:\n[Caller Workflow: main-app/.github/workflows/ci.yml]\njobs:\n  call-build:\n    uses: company-templates/.github/workflows/standard-build.yml@main\n    with:\n      node-version: 20\n    secrets: inherit\n                     │\n                     ▼ Kích hoạt\n[Called Reusable Workflow: standard-build.yml]\non:\n  workflow_call:\n    inputs:\n      node-version:\n        type: string\n        required: true\njobs:\n  compile-and-test:\n    runs-on: ubuntu-latest\n    steps:\n      - run: echo \"Building with Node version ${{ inputs.node-version }}\"\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nMột ngân hàng số duy trì hơn 50 dự án vi dịch vụ viết bằng ngôn ngữ Java Spring Boot. Đội ngũ kỹ sư nền tảng (Platform Team) tạo một kho lưu trữ trung tâm chứa tệp reusable workflow `.github/workflows/maven-enterprise-build.yml` đã được cấu hình sẵn các bước quét bảo mật SonarQube, kiểm tra bản quyền mã nguồn và đóng gói JAR chuẩn chỉ. Tất cả 50 nhóm phát triển ứng dụng chỉ cần viết một tệp caller workflow ngắn gọn gồm 6 dòng gọi đến tệp mẫu dùng chung. Khi ngân hàng ban hành chính sách bảo mật mới, Platform Team chỉ cần chỉnh sửa một dòng trong tệp reusable duy nhất, toàn bộ 50 dự án lập tức áp dụng tiêu chuẩn mới mà không cần chạm vào mã nguồn của từng nhóm.\n\n---\n\n## 💻 Command & Cú pháp\n```yaml\n# 1. Định nghĩa tệp Called Workflow: .github/workflows/reusable-test.yml\nname: Reusable Test Suite\non:\n  workflow_call:\n    inputs:\n      node-version:\n        required: true\n        type: string\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Use Node.js ${{ inputs.node-version }}\n        uses: actions/setup-node@v4\n        with:\n          node-version: ${{ inputs.node-version }}\n      - run: npm test\n\n# 2. Định nghĩa tệp Caller Workflow: .github/workflows/main.yml\nname: Main Pipeline\non: [push]\n\njobs:\n  run-tests:\n    uses: ./.github/workflows/reusable-test.yml\n    with:\n      node-version: '20'\n    secrets: inherit\n```\n\n---\n\n## 🔍 Giải thích command\n- `on: workflow_call`: Khai báo sự kiện cho phép các workflow khác gọi đến tệp này.\n- `inputs.node-version`: Tham số đầu vào kiểu chuỗi bắt buộc phải truyền khi gọi workflow.\n- `uses: ./.github/workflows/reusable-test.yml`: Chỉ định đường dẫn tới tệp reusable workflow trong cùng kho lưu trữ.\n- `with.node-version: '20'`: Truyền giá trị thực tế cho tham số đã định nghĩa.\n- `secrets: inherit`: Cho phép workflow con tự động kế thừa toàn bộ secrets từ caller.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Gọi lồng nhau quá 4 cấp độ**: GitHub giới hạn tối đa 4 tầng workflow lồng nhau (A gọi B, B gọi C, C gọi D, D gọi E sẽ báo lỗi).\n2. **Quên khai báo `secrets: inherit`**: Khiến workflow con không đọc được các biến bí mật như API token hay mật khẩu triển khai.\n3. **Khai báo sai cú pháp đường dẫn**: Thiếu tiền tố `./` cho các tệp nội bộ hoặc thiếu thẻ tag `@main` khi gọi từ kho lưu trữ bên ngoài.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. **Bước 1**: Tạo file `.github/workflows/reusable-lint.yml` khai báo `on: workflow_call` với một input mang tên `linter-name`.\n2. **Bước 2**: Trong file này, định nghĩa job in ra màn hình thông báo: `echo \"Running linter ${{ inputs.linter-name }}\"`.\n3. **Bước 3**: Tạo file `.github/workflows/caller-test.yml` có sự kiện `push` và gọi reusable workflow vừa tạo với `with: linter-name: 'eslint'`.\n4. **Bước 4**: Commit cả 2 file, đẩy lên GitHub và xem kết quả thực thi trong tab Actions để xác nhận workflow con được triệu gọi thành công.\n\n---\n\n## 💡 Hint & mẹo\n> Khi gọi Reusable Workflow từ một repository khác trong cùng tổ chức, hãy ghim theo thẻ phiên bản phát hành hoặc commit SHA (ví dụ: `owner/repo/.github/workflows/build.yml@v1.2.0`) để đảm bảo tính ổn định và bảo mật cao nhất.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Tab Actions hiển thị một Job chính của Caller, bên trong mở rộng ra các Jobs được định nghĩa trong Reusable Workflow.\n- Đầu vào `linter-name` được truyền chính xác và hiển thị đúng giá trị `eslint` trong console log.\n\n---\n\n## ❓ Quiz nhanh\nKiểm tra kiến thức về thiết kế và sử dụng Reusable Workflows qua bài trắc nghiệm trong phần bên dưới.\n\n---\n\n## 🚀 Thử thách nâng cao\nPhân tích sự khác biệt cơ bản về phạm vi và năng lực giữa một Custom Composite Action (tái sử dụng các Step trong 1 Job) và một Reusable Workflow (tái sử dụng toàn bộ các Job và Matrix)?\n\n---\n\n## 📝 Tổng kết\n- `workflow_call` biến một workflow thành mô-đun có thể tái sử dụng từ các workflow khác.\n- Tuân thủ triệt để nguyên lý DRY, giúp chuẩn hóa và bảo trì quy trình CI/CD tập trung cho nhiều dự án.\n- Hỗ trợ định nghĩa rõ ràng các tham số đầu vào `inputs`, đầu ra `outputs` và chia sẻ `secrets`.\n- Cấu hình `secrets: inherit` giúp việc chia sẻ bí mật giữa các tầng workflow diễn ra thuận tiện và bảo mật.\n",
  "quiz": {
    "id": "quiz-07-github-actions-19-reusable-workflows",
    "title": "Trắc nghiệm: Tái sử dụng luồng công việc với Reusable Workflows (workflow_call)",
    "questions": [
      {
        "id": "q1",
        "question": "Sự kiện kích hoạt nào bắt buộc phải có để một workflow có thể được gọi lại từ một workflow khác?",
        "type": "single",
        "options": [
          {
            "text": "workflow_call",
            "correct": true
          },
          {
            "text": "workflow_dispatch",
            "correct": false
          },
          {
            "text": "repository_dispatch",
            "correct": false
          },
          {
            "text": "external_call",
            "correct": false
          }
        ],
        "explanation": "Sự kiện workflow_call là sự kiện đặc thù được GitHub thiết kế riêng để biến workflow thành Reusable Workflow."
      },
      {
        "id": "q2",
        "question": "Để gọi một Reusable Workflow nằm trong cùng kho lưu trữ, cú pháp uses nào sau đây là chính xác?",
        "type": "single",
        "options": [
          {
            "text": "uses: ./.github/workflows/my-reusable.yml",
            "correct": true
          },
          {
            "text": "uses: local/my-reusable",
            "correct": false
          },
          {
            "text": "import: my-reusable.yml",
            "correct": false
          },
          {
            "text": "include: ./.github/workflows/my-reusable.yml",
            "correct": false
          }
        ],
        "explanation": "Với các workflow tái sử dụng trong cùng một kho lưu trữ, bạn sử dụng đường dẫn tương đối bắt đầu bằng ./.github/workflows/."
      },
      {
        "id": "q3",
        "question": "Tùy chọn nào giúp tự động chuyển toàn bộ các biến bí mật (Secrets) từ Caller Workflow sang Reusable Workflow?",
        "type": "single",
        "options": [
          {
            "text": "secrets: inherit",
            "correct": true
          },
          {
            "text": "secrets: all",
            "correct": false
          },
          {
            "text": "pass_secrets: true",
            "correct": false
          },
          {
            "text": "share_all_secrets: true",
            "correct": false
          }
        ],
        "explanation": "Từ khóa secrets: inherit giúp kế thừa toàn bộ Secrets có sẵn mà không cần phải ánh xạ thủ công từng biến một."
      },
      {
        "id": "q4",
        "question": "Số cấp độ lồng nhau tối đa (nesting depth) mà GitHub Actions cho phép đối với Reusable Workflows là bao nhiêu?",
        "type": "single",
        "options": [
          {
            "text": "Tối đa 4 cấp độ (workflow A gọi B, B gọi C, C gọi D)",
            "correct": true
          },
          {
            "text": "Không giới hạn số cấp độ",
            "correct": false
          },
          {
            "text": "Chỉ duy nhất 1 cấp độ",
            "correct": false
          },
          {
            "text": "Tối đa 100 cấp độ",
            "correct": false
          }
        ],
        "explanation": "GitHub Actions giới hạn tối đa 4 tầng lồng nhau để ngăn chặn nguy cơ vòng lặp vô hạn và làm phức tạp hóa pipeline."
      },
      {
        "id": "q5",
        "question": "Sự khác biệt căn bản giữa Reusable Workflow (workflow_call) và Composite Action là gì?",
        "type": "single",
        "options": [
          {
            "text": "Reusable Workflow có thể chứa nhiều Jobs độc lập và ma trận chạy song song, còn Composite Action chỉ gom nhóm các Steps trong cùng một Job",
            "correct": true
          },
          {
            "text": "Reusable Workflow chỉ dùng được cho hệ điều hành Linux",
            "correct": false
          },
          {
            "text": "Composite Action chỉ hỗ trợ ngôn ngữ Python",
            "correct": false
          },
          {
            "text": "Không có sự khác nhau nào về mặt kiến trúc",
            "correct": false
          }
        ],
        "explanation": "Reusable Workflow cho phép tái sử dụng toàn bộ kiến trúc gồm nhiều Jobs, môi trường chạy và runner khác nhau, trong khi Composite Action chỉ là tập hợp các steps thực thi tuần tự trong một Job đơn lẻ."
      }
    ]
  }
};
export default lesson;
