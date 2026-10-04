import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "05-events-and-triggers",
  "moduleId": "07-github-actions",
  "metadata": {
    "id": "05-events-and-triggers",
    "title": "Sự kiện kích hoạt (Events & Triggers: push, pull_request, workflow_dispatch)",
    "level": "advanced",
    "duration": 30,
    "xp": 90,
    "prerequisites": [
      "04-workflow-yaml-syntax"
    ],
    "objectives": [
      "Làm chủ thuộc tính on trong workflow để cấu hình các sự kiện kích hoạt tự động.",
      "Sử dụng bộ lọc nhánh (branches) và bộ lọc đường dẫn tệp tin (paths) để tối ưu thời điểm kích hoạt.",
      "Thành thạo sự kiện kích hoạt thủ công workflow_dispatch và lập lịch tự động schedule cron."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "events",
      "triggers",
      "push",
      "pull request",
      "workflow dispatch",
      "cron schedule"
    ],
    "commands": [
      "gh workflow run ci.yml",
      "git push origin main",
      "git push origin feature/login"
    ]
  },
  "content": "# Sự kiện kích hoạt (Events & Triggers: push, pull_request, workflow_dispatch)\n\n## 🎯 Mục tiêu\n- Làm chủ thuộc tính `on` trong workflow để cấu hình các sự kiện kích hoạt tự động.\n- Sử dụng bộ lọc nhánh (`branches`) và bộ lọc đường dẫn tệp tin (`paths`) để tối ưu thời điểm kích hoạt.\n- Thành thạo sự kiện kích hoạt thủ công `workflow_dispatch` và lập lịch tự động `schedule` cron.\n\n## 🧩 Từ khóa hôm nay\n### Event Trigger\n- **Nói dễ hiểu**: Sự kiện cụ thể xảy ra trong kho lưu trữ kích hoạt hệ thống chạy quy trình tự động hóa.\n- **Ví dụ**: Khi có ai đó push commit vào nhánh `main` hoặc mở một Pull Request mới.\n- **Đừng nhầm**: Không bắt buộc chỉ có một sự kiện duy nhất; bạn có thể khai báo một danh sách nhiều sự kiện khác nhau trong `on`.\n\n### workflow_dispatch\n- **Nói dễ hiểu**: Sự kiện cho phép người có quyền chạy workflow thủ công từ giao diện GitHub, CLI hoặc API.\n- **Ví dụ**: Bấm nút Run workflow trên trang web GitHub để chạy kịch bản deploy mà không cần tạo commit giả.\n- **Đừng nhầm**: Phải khai báo `workflow_dispatch`; workflow cần có trên nhánh mặc định để sự kiện này được kích hoạt, còn cách chạy có thể cho phép chọn nhánh.\n\n### Path Filter\n- **Nói dễ hiểu**: Bộ lọc đường dẫn giúp chạy hoặc bỏ qua workflow dựa trên các tệp bị thay đổi trong sự kiện `push` hoặc `pull_request`.\n- **Ví dụ**: Dùng `paths-ignore: ['docs/**']` để bỏ qua việc chạy test khi lập trình viên chỉ cập nhật tài liệu.\n- **Đừng nhầm**: Bộ lọc này áp dụng cho sự kiện `push` và `pull_request`, không áp dụng cho kích hoạt thủ công.\n\n## 📖 Định nghĩa\nSự kiện (Event) là hoạt động trong repository có thể kích hoạt workflow. Khóa `on` liệt kê các sự kiện như `push`, `pull_request`, `workflow_dispatch` và `schedule`. Bộ lọc nhánh/đường dẫn áp dụng tùy theo loại sự kiện; `schedule` dùng UTC và chạy theo lịch đã cấu hình trên nhánh mặc định.\n\n## 🤔 Tại sao cần?\nNếu không cấu hình sự kiện và bộ lọc phù hợp, workflow có thể chạy nhiều hơn cần thiết. Bộ lọc giúp kiểm soát nhánh hoặc tệp thay đổi; khi dùng required checks, hãy cẩn thận vì workflow bị bỏ qua do filter có thể để check ở trạng thái pending.\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung chiếc chuông cửa thông minh. Bạn có thể cài đặt chuông reo khi khách bấm nút trực tiếp (`workflow_dispatch`), hoặc khi cảm biến phát hiện có khách đứng trước cửa (`push` vào nhánh `main`). Bạn cũng có thể thiết lập bộ lọc thông minh: nếu chỉ là một chú mèo đi ngang qua (`docs/`), chiếc chuông tự động bỏ qua không reo để tránh làm phiền.\n\n## 🖼 Sơ đồ\n```mermaid\nflowchart TD\n    Trigger[Sự kiện phát sinh] --> BranchCheck{Có khớp nhánh main?}\n    BranchCheck -- Không --> Ignore[Bỏ qua không chạy]\n    BranchCheck -- Có --> PathCheck{Có khớp thư mục src/?}\n    PathCheck -- Không (chỉ sửa docs) --> Ignore\n    PathCheck -- Có --> Start[Kích hoạt Workflow CI chạy ngay]\n```\n\n## 🌎 Ví dụ thực tế\nTrong môi trường phát triển dự án thực tế: workflow chạy khi `push` vào `main` hoặc `staging` và bỏ qua nếu mọi tệp thay đổi đều nằm trong `docs/`. Nếu cùng một commit sửa cả `docs/` lẫn mã nguồn, workflow vẫn chạy. Workflow bảo mật chỉ chạy nếu sự kiện và bộ lọc của nó khớp.\n\n## 💻 Command\n```bash\n# Kích hoạt thủ công workflow từ terminal bằng GitHub CLI\ngh workflow run ci.yml\n\n# Đẩy commit lên nhánh main để kích hoạt trigger tự động\ngit push origin main\n\n# Xem trạng thái phản hồi của workflow vừa được kích hoạt\ngh run list\n```\n\n## 🔍 Giải thích command\n- `gh workflow run ci.yml`: Kích hoạt workflow có `workflow_dispatch`; cần GitHub CLI xác thực và có quyền với repo.\n- `git push origin main`: Đẩy commit lên nhánh `main`; workflow chỉ chạy khi sự kiện và mọi bộ lọc khớp.\n- `gh run list`: Liệt kê các lần chạy gần đây; cần quyền đọc repo khi truy cập repo riêng.\n\n## ⚠️ Sai lầm phổ biến\n- Quên lọc nhánh khiến các commit trên nhánh nháp của lập trình viên kích hoạt luôn kịch bản deploy sản xuất.\n- Lịch `schedule` dùng UTC; giờ chạy có thể bị trễ khi GitHub tải cao và không nên dùng làm đồng hồ chạy chính xác.\n- Quên khai báo `workflow_dispatch` khiến việc kiểm thử thủ công workflow gặp nhiều khó khăn.\n\n## 🧪 Lab\nHãy mở terminal và cùng tôi thực hành từng bước dưới đây để làm chủ kỹ năng:\n\n1. Khởi tạo một tệp workflow với thuộc tính `on` hỗ trợ cả `push` và `workflow_dispatch`:\n   ```yaml\n   name: Trigger Demo\n   on:\n     push:\n       branches: [main]\n       paths-ignore:\n         - '**.md'\n     workflow_dispatch:\n   jobs:\n     demo:\n       runs-on: ubuntu-latest\n       steps:\n         - run: echo \"Workflow triggered successfully!\"\n   ```\n2. Đọc điều kiện filter: chỉ thay đổi tệp Markdown thì bị bỏ qua; nếu commit còn sửa tệp khác thì workflow chạy.\n3. Khi có repo GitHub và quyền truy cập, đẩy tệp lên nhánh phù hợp để quan sát run; nếu không, kiểm tra điều kiện bằng ví dụ YAML.\n4. Với workflow đã có trên nhánh mặc định và `workflow_dispatch`, người có quyền có thể dùng **Run workflow**; CLI cũng cần xác thực.\n\n## 💡 Hint\n- `schedule` dùng UTC; chuyển giờ Việt Nam sang UTC bằng cách trừ 7 tiếng, đồng thời nhớ rằng thời điểm thực tế có thể trễ.\n- Bạn có thể thêm trường `inputs` cho `workflow_dispatch` để người dùng nhập thông số tùy chỉnh khi bấm nút chạy.\n\n## ✅ Validation\n- Workflow không bị kích hoạt khi chỉ có thay đổi trong các tệp markdown.\n- Khi workflow có trên nhánh mặc định, khai báo `workflow_dispatch` và người học có quyền truy cập, có thể chạy thủ công từ GitHub.\n\n## ❓ Quiz\nHãy hoàn thành bài trắc nghiệm bên dưới để kiểm tra mức độ nắm vững các sự kiện và bộ lọc kích hoạt trong GitHub Actions.\n\n## 🔥 Challenge\nThiết kế biểu thức cron trong thuộc tính `schedule` để workflow tự động sao lưu dữ liệu vào lúc 3 giờ sáng mỗi ngày từ thứ Hai đến thứ Sáu theo giờ Việt Nam.\n\n## 📚 Tổng kết\n- Thuộc tính `on` định nghĩa các sự kiện kích hoạt workflow như `push`, `pull_request`, `workflow_dispatch`.\n- Dùng `branches`, `paths` hoặc `paths-ignore` để kiểm soát phạm vi chạy; kiểm tra ảnh hưởng tới required checks.\n- `workflow_dispatch` mang lại sự linh hoạt tối đa khi cần kích hoạt hoặc kiểm thử quy trình thủ công.\n",
  "quiz": {
    "id": "quiz-07-github-actions-05-events-and-triggers",
    "title": "Trắc nghiệm: Sự kiện kích hoạt (Events & Triggers: push, pull_request, workflow_dispatch)",
    "questions": [
      {
        "id": "q1",
        "question": "Khóa nào trong tệp YAML được sử dụng để định nghĩa sự kiện kích hoạt workflow?",
        "type": "single",
        "options": [
          {
            "text": "on",
            "correct": true
          },
          {
            "text": "trigger",
            "correct": false
          },
          {
            "text": "when",
            "correct": false
          },
          {
            "text": "event",
            "correct": false
          }
        ],
        "explanation": "Trong cú pháp của GitHub Actions, từ khóa `on` là bắt buộc để định nghĩa các sự kiện kích hoạt."
      },
      {
        "id": "q2",
        "question": "Sự kiện nào sau đây cho phép lập trình viên bấm nút chạy workflow thủ công trên giao diện web GitHub?",
        "type": "single",
        "options": [
          {
            "text": "workflow_dispatch",
            "correct": true
          },
          {
            "text": "manual_run",
            "correct": false
          },
          {
            "text": "button_click",
            "correct": false
          },
          {
            "text": "user_trigger",
            "correct": false
          }
        ],
        "explanation": "`workflow_dispatch` là sự kiện đặc biệt kích hoạt thủ công qua giao diện GitHub web hoặc GitHub CLI/API."
      },
      {
        "id": "q3",
        "question": "Để workflow không bị kích hoạt khi người dùng chỉ chỉnh sửa tệp README.md, ta sử dụng thuộc tính nào?",
        "type": "single",
        "options": [
          {
            "text": "paths-ignore: ['README.md']",
            "correct": true
          },
          {
            "text": "file-exclude: ['README.md']",
            "correct": false
          },
          {
            "text": "skip-file: ['README.md']",
            "correct": false
          },
          {
            "text": "no-check: ['README.md']",
            "correct": false
          }
        ],
        "explanation": "`paths-ignore` liệt kê danh sách các mẫu đường dẫn tệp tin mà khi thay đổi chỉ nằm trong đó, workflow sẽ bỏ qua không chạy."
      },
      {
        "id": "q4",
        "question": "Lịch chạy định kỳ `schedule` trong GitHub Actions sử dụng cú pháp biểu thức nào?",
        "type": "single",
        "options": [
          {
            "text": "Biểu thức Cron chuẩn 5 trường (POSIX cron syntax)",
            "correct": true
          },
          {
            "text": "Câu lệnh SQL SELECT",
            "correct": false
          },
          {
            "text": "Ngôn ngữ tự nhiên tiếng Anh",
            "correct": false
          },
          {
            "text": "Biểu thức chính quy Regex",
            "correct": false
          }
        ],
        "explanation": "GitHub Actions sử dụng cú pháp POSIX cron tiêu chuẩn gồm 5 trường: phút, giờ, ngày trong tháng, tháng, ngày trong tuần."
      },
      {
        "id": "q5",
        "question": "Thuộc tính `types` bên dưới sự kiện `pull_request` (ví dụ `types: [opened, synchronize]`) có vai trò gì?",
        "type": "single",
        "options": [
          {
            "text": "Lọc các hành vi cụ thể của PR như khi mở mới (opened) hoặc khi đẩy thêm commit mới (synchronize) để kích hoạt",
            "correct": true
          },
          {
            "text": "Giới hạn kiểu tệp tin mà lập trình viên được phép chỉnh sửa",
            "correct": false
          },
          {
            "text": "Lựa chọn loại hệ điều hành Linux hoặc Windows cho máy ảo Runner",
            "correct": false
          },
          {
            "text": "Đổi ngôn ngữ hiển thị trên giao diện của GitHub",
            "correct": false
          }
        ],
        "explanation": "Thuộc tính `types` cho phép lọc chi tiết các trạng thái biến động của sự kiện, bảo đảm workflow chỉ kích hoạt khi thực sự cần thiết."
      }
    ]
  }
};
export default lesson;
