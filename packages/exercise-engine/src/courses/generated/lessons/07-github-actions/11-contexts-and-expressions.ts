import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "11-contexts-and-expressions",
  "moduleId": "07-github-actions",
  "metadata": {
    "id": "11-contexts-and-expressions",
    "title": "Contexts & Expressions: ${{ github.ref }}, matrix và toán tử",
    "level": "advanced",
    "duration": 30,
    "xp": 95,
    "prerequisites": [
      "10-env-variables"
    ],
    "objectives": [
      "Hiểu rõ khái niệm Contexts trong GitHub Actions: github, env, vars, secrets, matrix, steps, runner.",
      "Sử dụng cú pháp biểu thức ${{ <expression> }} để tính toán và truy xuất dữ liệu động trong YAML.",
      "Làm chủ các toán tử so sánh (==, !=), logic (&&, ||, !) và hàm chuỗi: contains, startsWith, endsWith."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "contexts",
      "expressions",
      "github context",
      "operators",
      "template syntax"
    ],
    "commands": [
      "echo \"${{ github.repository }}\"",
      "echo \"${{ github.actor }}\"",
      "echo \"${{ github.event_name }}\""
    ]
  },
  "content": "# Contexts & Expressions: ${{ github.ref }}, matrix và toán tử\n\n---\n\n## 🎯 Mục tiêu bài học\n- Hiểu rõ khái niệm Contexts trong GitHub Actions: github, env, vars, secrets, matrix, steps, runner.\n- Sử dụng cú pháp biểu thức ${{ <expression> }} để tính toán và truy xuất dữ liệu động trong YAML.\n- Làm chủ các toán tử so sánh (==, !=), logic (&&, ||, !) và hàm chuỗi: contains, startsWith, endsWith.\n\n---\n\n## 📖 Định nghĩa\n> Contexts (Ngữ cảnh) là tập hợp các đối tượng dữ liệu có cấu trúc chứa thông tin chi tiết về lần chạy workflow hiện tại, môi trường runner, các biến bí mật, và sự kiện kích hoạt. Bạn có thể truy cập các thông tin này ở bất kỳ đâu trong tệp YAML bằng cách đặt chúng bên trong biểu thức (Expressions) có cú pháp dấu ngoặc kép ${{ <expression> }}. Công cụ biểu thức của GitHub Actions hỗ trợ đầy đủ các phép toán số học, so sánh bằng, toán tử logic và các hàm kiểm tra chuỗi tích hợp.\n\n---\n\n## 🤔 Tại sao cần?\nTệp định dạng YAML thông thường chỉ là tập dữ liệu văn bản tĩnh không có trí thông minh hay khả năng tự thích ứng. Cú pháp Expressions và Contexts biến tệp cấu hình tĩnh thành một kịch bản động mạnh mẽ và linh hoạt: bạn có thể kiểm tra xem commit hiện tại có phải là nhánh phát hành chính thức không (${{ github.ref == 'refs/heads/main' }}), gắn thẻ tên lập trình viên đã tạo PR (${{ github.actor }}), hoặc chỉ định tên artifact theo mã băm commit độc nhất trong dự án.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy hình dung tệp YAML như một bức thư mẫu hợp đồng được in sẵn với các chỗ trống cần điền thông tin (template). Biểu thức ${{ expression }} chính là những chiếc thẻ giữ chỗ thông minh: khi hệ thống đưa hợp đồng vào máy in, máy in tự động tra cứu cơ sở dữ liệu ngữ cảnh (Context) để điền tên khách hàng, ngày ký và số tiền thanh toán vào đúng vị trí một cách hoàn toàn tự động.\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nContext Data Sources:\n┌────────────────────────────────────────────────────────┐\n│ github:  [actor: \"octocat\", ref: \"refs/heads/main\"]   │\n│ runner:  [os: \"Linux\", arch: \"X64\"]                    │\n│ env:     [CUSTOM_KEY: \"custom_value\"]                 │\n│ secrets: [DEPLOY_TOKEN: \"***\"]                         │\n└───────────────────────────┬────────────────────────────┘\n                            │\n                            ▼ Cú pháp nội suy\n        run: echo \"Actor is ${{ github.actor }}\"\n        if: ${{ github.ref == 'refs/heads/main' && success() }}\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột nhóm phát triển quản lý kho lưu trữ đa ngôn ngữ thiết lập bước gửi thông báo tự động. Họ sử dụng biểu thức nội suy: run: echo \"Kỹ sư ${{ github.actor }} vừa kích hoạt sự kiện ${{ github.event_name }} trên nhánh ${{ github.ref_name }}\". Khi một lập trình viên tên Tuấn đẩy mã nguồn lên nhánh phát triển, hệ thống tự động thay thế biểu thức và in ra: \"Kỹ sư tuan-dev vừa kích hoạt sự kiện push trên nhánh dev\". Đồng thời, một bước thông báo chúc mừng chỉ chạy nếu điều kiện if: ${{ startsWith(github.ref, 'refs/tags/v') }} được thỏa mãn khi phát hành phiên bản mới.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\necho \"${{ github.repository }}\"\necho \"${{ github.actor }}\"\necho \"${{ github.event_name }}\"\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nCác câu lệnh mẫu minh họa cách đọc dữ liệu từ ngữ cảnh github trực tiếp bên trong khối run của step: tên kho lưu trữ hiện tại, tên tài khoản thực hiện thao tác và tên loại sự kiện kích hoạt.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Sử dụng cú pháp biểu thức bên trong mệnh đề `if**: ` không cần thiết (GitHub Actions tự động hiểu nội dung của `if:` là biểu thức mà không bắt buộc phải có `${{ }}`).\n2. **So sánh phân biệt hoa thường sai lệch trong các chuỗi định danh nhánh Git.**: \n3. **Sử dụng hàm không được hỗ trợ hoặc cố gắng viết mã JavaScript phức tạp bên trong biểu thức YAML.**: \n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Tạo một Step in ra thông tin người thực hiện `${{ github.actor }}` và nhánh hiện tại.\n2. Sử dụng hàm `contains()` để kiểm tra xem thông điệp commit có chứa từ khóa \"skip-ci\" hay không.\n3. Thực hành kết hợp toán tử logic `&&` để tạo một điều kiện kép kiểm tra môi trường.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Trong thuộc tính `if:`, bạn có thể viết trực tiếp `if: github.ref == 'refs/heads/main'` mà không cần bao bọc bởi dấu `${{ }}`.\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nLog in ra chính xác các giá trị ngữ cảnh động tương ứng với tài khoản và nhánh thực tế.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nKiểm tra mức độ thành thạo về cú pháp ngữ cảnh và biểu thức qua các câu hỏi sau.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nLàm thế nào để sử dụng hàm format() hoặc phép nối chuỗi trong biểu thức GitHub Actions để tạo ra một tên tệp báo cáo duy nhất kết hợp giữa tên nhánh và ngày tháng?\n\n---\n\n## 📚 Tổng kết kiến thức\n- Contexts cung cấp thông tin toàn diện về phiên chạy (`github`, `runner`, `env`, `secrets`).\n- Cú pháp `${{ <expression> }}` dùng để tính toán và nội suy giá trị động vào tệp cấu hình YAML.\n- Hỗ trợ các hàm chuỗi hữu ích như `contains()`, `startsWith()`, `endsWith()` và hàm trạng thái `success()`.\n",
  "quiz": {
    "id": "quiz-07-github-actions-11-contexts-and-expressions",
    "title": "Trắc nghiệm: Contexts & Expressions: ${{ github.ref }}, matrix và toán tử",
    "questions": [
      {
        "id": "q1",
        "question": "Ngữ cảnh nào sau đây chứa thông tin về tác giả đã thực hiện hành động kích hoạt workflow?",
        "type": "single",
        "options": [
          {
            "text": "github.actor",
            "correct": true
          },
          {
            "text": "runner.user",
            "correct": false
          },
          {
            "text": "env.AUTHOR",
            "correct": false
          },
          {
            "text": "steps.author.name",
            "correct": false
          }
        ],
        "explanation": "`github.actor` luôn chứa tên đăng nhập (username) của người dùng đã thực hiện push commit hoặc mở Pull Request."
      },
      {
        "id": "q2",
        "question": "Biểu thức nào sau đây kiểm tra xem tên nhánh có bắt đầu bằng tiền tố \"release/\" hay không?",
        "type": "single",
        "options": [
          {
            "text": "startsWith(github.ref_name, 'release/')",
            "correct": true
          },
          {
            "text": "github.ref_name.has('release/')",
            "correct": false
          },
          {
            "text": "like(github.ref_name, 'release/*')",
            "correct": false
          },
          {
            "text": "matches(github.ref_name, '^release')",
            "correct": false
          }
        ],
        "explanation": "Hàm `startsWith(string, searchString)` là hàm chuỗi tích hợp sẵn trong bộ xử lý biểu thức của GitHub Actions."
      },
      {
        "id": "q3",
        "question": "Khi sử dụng biểu thức bên trong mệnh đề điều kiện `if:`, điều nào sau đây là đúng?",
        "type": "single",
        "options": [
          {
            "text": "Bạn có thể lược bỏ cặp dấu ${{ }} mà biểu thức vẫn được phân tích hợp lệ",
            "correct": true
          },
          {
            "text": "Bắt buộc phải có dấu ngoặc nhọn nếu không sẽ bị báo lỗi cú pháp",
            "correct": false
          },
          {
            "text": "Chỉ được phép so sánh các số nguyên, không so sánh được chuỗi",
            "correct": false
          },
          {
            "text": "Phải viết bằng cú pháp ngôn ngữ C++",
            "correct": false
          }
        ],
        "explanation": "GitHub Actions tự động coi toàn bộ giá trị trong thuộc tính `if:` là một biểu thức logic, do đó việc bọc `${{ }}` là tùy chọn."
      },
      {
        "id": "q4",
        "question": "Hàm `contains('hello world', 'world')` sẽ trả về kết quả nào?",
        "type": "single",
        "options": [
          {
            "text": "true",
            "correct": true
          },
          {
            "text": "false",
            "correct": false
          },
          {
            "text": "undefined",
            "correct": false
          },
          {
            "text": "Lỗi biên dịch",
            "correct": false
          }
        ],
        "explanation": "Hàm `contains()` kiểm tra xem chuỗi con có nằm trong chuỗi mẹ hay không và trả về giá trị boolean `true` hoặc `false`."
      },
      {
        "id": "q5",
        "question": "Biểu thức nào sau đây kiểm tra xem commit hiện tại có thuộc nhánh main VÀ bước trước đó đã thành công hay không?",
        "type": "single",
        "options": [
          {
            "text": "github.ref == 'refs/heads/main' && success()",
            "correct": true
          },
          {
            "text": "github.ref == 'refs/heads/main' || failure()",
            "correct": false
          },
          {
            "text": "github.branch == 'main' & pass()",
            "correct": false
          },
          {
            "text": "ref === 'main' and ok()",
            "correct": false
          }
        ],
        "explanation": "Toán tử logic `&&` kết hợp cùng hàm điều kiện `success()` đảm bảo bước này chỉ chạy khi ở nhánh main và không có lỗi nào trước đó."
      },
      {
        "id": "q6",
        "question": "Đối tượng ngữ cảnh nào sau đây cho phép truy cập danh sách bí mật mã hóa đã cấu hình trong kho lưu trữ?",
        "type": "single",
        "options": [
          {
            "text": "secrets",
            "correct": true
          },
          {
            "text": "credentials",
            "correct": false
          },
          {
            "text": "env.SECRETS",
            "correct": false
          },
          {
            "text": "runner.passwords",
            "correct": false
          }
        ],
        "explanation": "Ngữ cảnh `secrets` chứa các khóa bí mật được mã hóa an toàn như `secrets.DEPLOY_TOKEN` hoặc `secrets.GITHUB_TOKEN`."
      }
    ]
  }
};
export default lesson;
