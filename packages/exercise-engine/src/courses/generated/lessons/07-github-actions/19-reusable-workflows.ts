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
  "content": "# Tái sử dụng luồng công việc với Reusable Workflows (workflow_call)\n\n---\n\n## 🎯 Mục tiêu bài học\n- Hiểu rõ sự kiện workflow_call để biến một workflow bình thường thành một mô-đun tái sử dụng.\n- Áp dụng nguyên lý DRY (Don't Repeat Yourself) để chuẩn hóa quy trình CI/CD trên quy mô toàn doanh nghiệp.\n- Biết cách định nghĩa và truyền inputs, secrets giữa Caller Workflow và Called Workflow.\n\n---\n\n## 📖 Định nghĩa\n> Reusable Workflows (Luồng công việc tái sử dụng) là tính năng mạnh mẽ cho phép bạn đóng gói một workflow hoàn chỉnh để nhiều workflow khác (hoặc thậm chí nhiều kho lưu trữ khác trong tổ chức) có thể gọi lại mà không cần phải sao chép mã nguồn. Một workflow trở thành có thể tái sử dụng khi sự kiện kích hoạt của nó được khai báo là on: workflow_call. Workflow thực hiện cuộc gọi được gọi là Caller Workflow, và workflow được gọi là Called Workflow.\n\n---\n\n## 🤔 Tại sao cần?\nTrong các công ty có hàng chục vi dịch vụ (Microservices), nếu mỗi kho lưu trữ đều tự viết một tệp YAML kiểm thử và đóng gói Docker riêng biệt, thì khi cần nâng cấp phiên bản bảo mật hoặc thay đổi địa chỉ máy chủ, kỹ sư sẽ phải sửa đổi thủ công hàng chục tệp YAML giống hệt nhau. Reusable Workflows giúp tập trung hóa toàn bộ logic vào một nơi duy nhất: sửa một nơi, toàn bộ công ty được cập nhật tự động.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy so sánh việc lập trình không có cấu trúc hàm con (phải sao chép cùng một đoạn mã dài lặp đi lặp lại khắp nơi trong dự án) với việc định nghĩa một Hàm dùng chung (Function/Method) mẫu mực. Reusable Workflow chính là một Hàm tiêu chuẩn ở cấp độ hạ tầng DevOps: nó có tên định danh hàm (đường dẫn tệp YAML), các tham số đầu vào (inputs), các dữ liệu trả về (outputs), và có thể được triệu gọi từ bất kỳ đâu chỉ bằng một dòng lệnh uses đơn giản.\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nMô hình gọi Reusable Workflow:\n[Caller Workflow: main-app/.github/workflows/ci.yml]\njobs:\n  call-build:\n    uses: company-templates/.github/workflows/standard-build.yml@main\n    with:\n      node-version: 20\n    secrets: inherit\n                     │\n                     ▼ Kích hoạt\n[Called Reusable Workflow: standard-build.yml]\non:\n  workflow_call:\n    inputs: [node-version]\njobs:\n  compile-and-test: [run-build]\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột ngân hàng số duy trì hơn 50 dự án vi dịch vụ viết bằng ngôn ngữ Java Spring Boot. Đội ngũ kỹ sư nền tảng (Platform Team) tạo một kho lưu trữ trung tâm chứa tệp reusable workflow `.github/workflows/maven-enterprise-build.yml` đã được cấu hình sẵn các bước quét bảo mật SonarQube, kiểm tra bản quyền mã nguồn và đóng gói JAR chuẩn chỉ. Tất cả 50 nhóm phát triển ứng dụng chỉ cần viết một tệp caller workflow ngắn gọn gồm 6 dòng gọi đến tệp mẫu dùng chung. Khi ngân hàng ban hành chính sách bảo mật mới, Platform Team chỉ cần chỉnh sửa một dòng trong tệp reusable duy nhất, toàn bộ 50 dự án lập tức áp dụng tiêu chuẩn mới mà không cần chạm vào mã nguồn của từng nhóm.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\ncat .github/workflows/reusable-build.yml\ncat .github/workflows/caller.yml\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nCác câu lệnh trên dùng để xem và đối chiếu cấu trúc giữa tệp định nghĩa tái sử dụng (chứa workflow_call) và tệp gọi thực thi (chứa khóa uses trỏ tới tệp đó).\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Cố gắng gọi một Reusable Workflow lồng nhau quá 4 cấp độ (GitHub giới hạn tối đa 4 tầng workflow lồng nhau).**: \n2. **Quên khai báo từ khóa `secrets**:  inherit` khiến Called Workflow không thể truy cập các biến bí mật cần thiết của kho lưu trữ.\n3. **Sử dụng sai cú pháp đường dẫn tệp tin tương đối hoặc quên ghim phiên bản nhánh/tag `@main`.**: \n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Tạo một tệp `.github/workflows/reusable-test.yml` có sự kiện kích hoạt `on: workflow_call`.\n2. Khai báo một tham số đầu vào `inputs: os-type:` có kiểu dữ liệu chuỗi.\n3. Tạo tệp `caller.yml` gọi tới tệp trên bằng cú pháp `uses: ./.github/workflows/reusable-test.yml`.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Sử dụng `secrets: inherit` trong Job gọi để tự động truyền toàn bộ Secrets của Caller sang Called Workflow một cách tiện lợi.\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nCalled Workflow được nạp và thực thi trơn tru như một Job bình thường trong giao diện của Caller.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nKiểm tra kiến thức về thiết kế và sử dụng Reusable Workflows qua bài trắc nghiệm sau.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nPhân tích sự khác biệt cơ bản về phạm vi và năng lực giữa một Custom Composite Action (tái sử dụng các Step) và một Reusable Workflow (tái sử dụng toàn bộ các Job)?\n\n---\n\n## 📚 Tổng kết kiến thức\n- `workflow_call` biến một workflow thành mô-đun có thể tái sử dụng từ các workflow khác.\n- Tuân thủ triệt để nguyên lý DRY, giúp chuẩn hóa và bảo trì quy trình CI/CD tập trung cho nhiều dự án.\n- Hỗ trợ định nghĩa rõ ràng các tham số đầu vào `inputs`, đầu ra `outputs` và chia sẻ `secrets`.\n",
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
        "explanation": "`workflow_call` là sự kiện đặc thù được GitHub thiết kế riêng để biến workflow thành Reusable Workflow."
      },
      {
        "id": "q2",
        "question": "Để gọi một Reusable Workflow nằm trong cùng kho lưu trữ, cú pháp `uses:` nào sau đây là chính xác?",
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
        "explanation": "Với các workflow tái sử dụng trong cùng một kho lưu trữ, bạn sử dụng đường dẫn tương đối bắt đầu bằng `./.github/workflows/`."
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
        "explanation": "Từ khóa `secrets: inherit` giúp kế thừa toàn bộ Secrets có sẵn mà không cần phải ánh xạ thủ công từng biến một."
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
      }
    ]
  }
};
export default lesson;
