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
  "content": "# Contexts & Expressions: ${{ github.ref }}, matrix và toán tử\n\n## 🎯 Mục tiêu\n- Hiểu rõ khái niệm Contexts trong GitHub Actions: `github`, `env`, `vars`, `secrets`, `matrix`, `steps`, `runner`.\n- Sử dụng cú pháp biểu thức `${{ <expression> }}` để tính toán và truy xuất dữ liệu động trong YAML.\n- Làm chủ các toán tử so sánh (`==`, `!=`), logic (`&&`, `||`, `!`) và hàm chuỗi: `contains`, `startsWith`, `endsWith`.\n\n## 🧩 Từ khóa hôm nay\n### Contexts\n- **Nói dễ hiểu**: Các kho dữ liệu có cấu trúc chứa thông tin chi tiết về phiên chạy, commit, môi trường và kho lưu trữ.\n- **Ví dụ**: Ngữ cảnh `github.actor` chứa tên người kích hoạt workflow; `runner.os` chứa tên hệ điều hành.\n- **Đừng nhầm**: Không phải biến shell thông thường; dữ liệu ngữ cảnh được GitHub Actions phân giải trước khi lệnh shell chạy.\n\n### Expressions Syntax\n- **Nói dễ hiểu**: Cú pháp `${{ <biểu thức> }}` cho phép bạn chèn giá trị động hoặc tính toán logic trong tệp cấu hình YAML.\n- **Ví dụ**: Biểu thức `${{ github.ref == 'refs/heads/main' }}` trả về giá trị boolean `true` hoặc `false`.\n- **Đừng nhầm**: Trong mệnh đề `if:`, việc bao bọc cặp dấu `${{ }}` là tùy chọn, bạn có thể viết trực tiếp biểu thức.\n\n### Built-in Functions\n- **Nói dễ hiểu**: Các hàm tiện ích có sẵn do GitHub cung cấp để xử lý chuỗi và kiểm tra trạng thái trong biểu thức.\n- **Ví dụ**: Hàm `startsWith(github.ref, 'refs/tags/v')` để kiểm tra xem có phải đang phát hành thẻ tag hay không.\n- **Đừng nhầm**: Không thể gọi các hàm JavaScript tùy ý của riêng bạn; bạn chỉ được dùng các hàm chuẩn mà GitHub Actions hỗ trợ.\n\n## 📖 Định nghĩa\nContexts (Ngữ cảnh) là tập hợp các đối tượng dữ liệu chứa thông tin chi tiết về lần chạy workflow hiện tại, môi trường runner, các biến bí mật và sự kiện kích hoạt. Bạn có thể truy xuất các thông tin này ở bất kỳ đâu trong tệp YAML bằng cách đặt chúng bên trong biểu thức (Expressions) có cú pháp dấu ngoặc kép `${{ <expression> }}`.\n\n## 💡 Tại sao cần\nTệp YAML thông thường chỉ là văn bản tĩnh. Cú pháp Expressions và Contexts biến tệp cấu hình thành kịch bản động thông minh: bạn có thể kiểm tra xem commit hiện tại có phải nhánh phát hành chính thức không, gắn nhãn tên lập trình viên đã tạo PR, hoặc kiểm tra kết quả bài kiểm thử trước đó để quyết định có chạy tiếp hay không.\n\n## 🧠 Mental Model\nHãy hình dung tệp YAML như bức thư hợp đồng mẫu in sẵn có các ô trống cần điền thông tin. Biểu thức `${{ expression }}` chính là những chiếc thẻ giữ chỗ thông minh: khi đưa hợp đồng vào máy in, hệ thống tự động tra cứu cơ sở dữ liệu ngữ cảnh (Context) để điền tên khách hàng, ngày ký và số tiền thanh toán vào đúng vị trí hoàn toàn tự động.\n\n## 📊 Sơ đồ minh họa\n```mermaid\nflowchart LR\n    Contexts[Contexts: github, runner, env, secrets] --> Engine[Bộ xử lý biểu thức ${{ expr }}]\n    Engine --> String[Nội suy chuỗi: Tên repo, tác giả]\n    Engine --> Condition[Đánh giá điều kiện: if: github.ref == 'refs/heads/main']\n```\n\n## 🏢 Ví dụ thực tế\nMột nhóm phát triển quản lý kho lưu trữ đa ngôn ngữ thiết lập bước gửi thông báo tự động. Họ dùng biểu thức nội suy: `run: echo \"Kỹ sư ${{ github.actor }} vừa kích hoạt sự kiện ${{ github.event_name }} trên nhánh ${{ github.ref_name }}\"`. Khi lập trình viên Tuấn đẩy code, hệ thống tự động thay thế biểu thức và in ra log rõ ràng. Đồng thời, bước deploy chỉ chạy nếu điều kiện `if: ${{ startsWith(github.ref, 'refs/tags/v') }}` được thỏa mãn.\n\n## 💻 Command & Cú pháp\n```bash\n# In ra tên kho lưu trữ hiện tại thông qua ngữ cảnh github\necho \"${{ github.repository }}\"\n\n# In ra tên tài khoản người thực hiện thao tác\necho \"${{ github.actor }}\"\n\n# In ra tên loại sự kiện kích hoạt workflow\necho \"${{ github.event_name }}\"\n```\n\n## 🔍 Giải thích command\n- `echo \"${{ github.repository }}\"`: Đọc và in ra chuỗi định danh `owner/repo` của dự án từ ngữ cảnh hệ thống.\n- `echo \"${{ github.actor }}\"`: Trả về tên đăng nhập GitHub của kỹ sư vừa tạo commit hoặc gửi Pull Request.\n- `echo \"${{ github.event_name }}\"`: Xác định loại sự kiện kích hoạt (`push`, `pull_request` hoặc `workflow_dispatch`).\n\n## ⚠️ Sai lầm phổ biến\n- Bao bọc `${{ }}` bên trong mệnh đề `if:` một cách rườm rà (GitHub Actions tự động hiểu nội dung `if:` là biểu thức).\n- So sánh phân biệt hoa thường sai lệch trong các chuỗi định danh nhánh Git.\n- Cố gắng viết các đoạn mã hàm JavaScript phức tạp không được hệ thống hỗ trợ bên trong biểu thức YAML.\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. Tạo tệp workflow thử nghiệm ngữ cảnh và biểu thức:\n   ```yaml\n   name: Contexts Demo\n   on: [workflow_dispatch]\n   jobs:\n     inspect:\n       runs-on: ubuntu-latest\n       steps:\n         - name: Hiển thị thông tin ngữ cảnh\n           run: |\n             echo \"Repository: ${{ github.repository }}\"\n             echo \"Actor: ${{ github.actor }}\"\n             echo \"Ref: ${{ github.ref }}\"\n             echo \"Runner OS: ${{ runner.os }}\"\n         - name: Kiểm tra nhánh chính\n           if: github.ref == 'refs/heads/main'\n           run: echo \"Đang chạy trên nhánh chính main!\"\n   ```\n2. Đẩy file lên GitHub và bấm Run workflow.\n3. Quan sát các giá trị ngữ cảnh được in ra chi tiết trong log console.\n\n## 💡 Hint & mẹo\n- Trong thuộc tính `if:`, bạn có thể viết ngắn gọn `if: github.ref == 'refs/heads/main'` mà không cần bọc `${{ }}`.\n- Kết hợp hàm `success()` hoặc `failure()` trong điều kiện để bắt trọn trạng thái của các bước trước đó.\n\n## ✅ Validation & Kết quả mong đợi\n- Log console in ra chính xác thông tin repository, tên tài khoản và hệ điều hành Runner tương ứng.\n- Bước có điều kiện `if:` chỉ chạy khi điều kiện so sánh trả về giá trị `true`.\n\n## ❓ Quiz nhanh\nHãy hoàn thành bài trắc nghiệm bên dưới để kiểm tra mức độ nắm vững cú pháp ngữ cảnh và biểu thức trong GitHub Actions.\n\n## 🚀 Thử thách nâng cao\nTìm hiểu cách kết hợp hàm `format()` và ngữ cảnh `github.run_number` để tạo ra một mã định danh phiên bản độc nhất cho mỗi lần thực thi workflow.\n\n## 📝 Tổng kết\n- Contexts cung cấp thông tin toàn diện về phiên chạy (`github`, `runner`, `env`, `secrets`).\n- Cú pháp `${{ <expression> }}` dùng để tính toán và nội suy giá trị động vào tệp cấu hình YAML.\n- Hỗ trợ các hàm chuỗi hữu ích như `contains()`, `startsWith()`, `endsWith()` và hàm trạng thái `success()`.\n",
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
