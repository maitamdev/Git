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
  "content": "# Sự kiện kích hoạt (Events & Triggers: push, pull_request, workflow_dispatch)\n\n## 🎯 Mục tiêu\n- Làm chủ thuộc tính `on` trong workflow để cấu hình các sự kiện kích hoạt tự động.\n- Sử dụng bộ lọc nhánh (`branches`) và bộ lọc đường dẫn tệp tin (`paths`) để tối ưu thời điểm kích hoạt.\n- Thành thạo sự kiện kích hoạt thủ công `workflow_dispatch` và lập lịch tự động `schedule` cron.\n\n## 🧩 Từ khóa hôm nay\n### Event Trigger\n- **Nói dễ hiểu**: Sự kiện cụ thể xảy ra trong kho lưu trữ kích hoạt hệ thống chạy quy trình tự động hóa.\n- **Ví dụ**: Khi có ai đó push commit vào nhánh `main` hoặc mở một Pull Request mới.\n- **Đừng nhầm**: Không bắt buộc chỉ có một sự kiện duy nhất; bạn có thể khai báo một danh sách nhiều sự kiện khác nhau trong `on`.\n\n### workflow_dispatch\n- **Nói dễ hiểu**: Sự kiện cho phép lập trình viên bấm nút chạy workflow thủ công trực tiếp từ giao diện GitHub hoặc CLI.\n- **Ví dụ**: Bấm nút Run workflow trên trang web GitHub để chạy kịch bản deploy mà không cần tạo commit giả.\n- **Đừng nhầm**: Mặc định workflow không có nút bấm này; bạn bắt buộc phải khai báo `workflow_dispatch:` trong tệp YAML.\n\n### Path Filter\n- **Nói dễ hiểu**: Bộ lọc đường dẫn giúp chỉ kích hoạt workflow khi có commit thay đổi các tệp tin trong thư mục chỉ định.\n- **Ví dụ**: Dùng `paths-ignore: ['docs/**']` để bỏ qua việc chạy test khi lập trình viên chỉ cập nhật tài liệu.\n- **Đừng nhầm**: Bộ lọc này áp dụng cho sự kiện `push` và `pull_request`, không áp dụng cho kích hoạt thủ công.\n\n## 📖 Định nghĩa\nSự kiện (Event) là một hoạt động cụ thể diễn ra trong repository kích hoạt GitHub Actions thực thi workflow. Thuộc tính `on` trong tệp YAML định nghĩa các sự kiện này. Các sự kiện thông dụng nhất gồm: `push` (đẩy mã nguồn), `pull_request` (mở, cập nhật PR), `workflow_dispatch` (kích hoạt thủ công) và `schedule` (chạy định kỳ theo giờ cron).\n\n## 💡 Tại sao cần\nNếu không cấu hình sự kiện và bộ lọc chính xác, workflow sẽ chạy tràn lan gây lãng phí tài nguyên và làm nghẽn hàng đợi CI. Ví dụ: bạn không muốn một pipeline deploy máy chủ sản xuất lại bị kích hoạt khi ai đó chỉ sửa đổi tệp `README.md` hoặc chỉ đẩy commit lên một nhánh cá nhân thử nghiệm.\n\n## 🧠 Mental Model\nHãy hình dung chiếc chuông cửa thông minh. Bạn có thể cài đặt chuông reo khi khách bấm nút trực tiếp (`workflow_dispatch`), hoặc khi cảm biến phát hiện có khách đứng trước cửa (`push` vào nhánh `main`). Bạn cũng có thể thiết lập bộ lọc thông minh: nếu chỉ là một chú mèo đi ngang qua (`docs/`), chiếc chuông tự động bỏ qua không reo để tránh làm phiền.\n\n## 📊 Sơ đồ minh họa\n```mermaid\nflowchart TD\n    Trigger[Sự kiện phát sinh] --> BranchCheck{Có khớp nhánh main?}\n    BranchCheck -- Không --> Ignore[Bỏ qua không chạy]\n    BranchCheck -- Có --> PathCheck{Có khớp thư mục src/?}\n    PathCheck -- Không (chỉ sửa docs) --> Ignore\n    PathCheck -- Có --> Start[Kích hoạt Workflow CI chạy ngay]\n```\n\n## 🏢 Ví dụ thực tế\nTrong dự án cổng thông tin ngân hàng, kỹ sư cấu hình tệp `ci.yml` lắng nghe sự kiện `push` nhưng chỉ trên nhánh `main` và `staging`. Đồng thời, kỹ sư bổ sung thuộc tính `paths-ignore` để bỏ qua mọi commit chỉ thay đổi tệp markdown trong thư mục `docs/`. Khi một cộng tác viên sửa lỗi chính tả tài liệu, CI không chạy giúp tiết kiệm hàng ngàn phút máy ảo cho công ty. Khi gộp code vào `main`, toàn bộ bài test bảo mật lập tức được kích hoạt.\n\n## 💻 Command & Cú pháp\n```bash\n# Kích hoạt thủ công workflow từ terminal bằng GitHub CLI\ngh workflow run ci.yml\n\n# Đẩy commit lên nhánh main để kích hoạt trigger tự động\ngit push origin main\n\n# Xem trạng thái phản hồi của workflow vừa được kích hoạt\ngh run list\n```\n\n## 🔍 Giải thích command\n- `gh workflow run ci.yml`: Kích hoạt workflow có khai báo `workflow_dispatch` mà không cần đẩy commit mới lên remote.\n- `git push origin main`: Đẩy mã nguồn lên nhánh chính để kích hoạt các workflow có bộ lọc `branches: [main]`.\n- `gh run list`: Kiểm tra trạng thái hàng đợi và tiến độ thực thi của các lần chạy gần nhất.\n\n## ⚠️ Sai lầm phổ biến\n- Quên lọc nhánh khiến các commit trên nhánh nháp của lập trình viên kích hoạt luôn kịch bản deploy sản xuất.\n- Sử dụng sai múi giờ quốc tế UTC trong biểu thức `schedule` cron dẫn đến việc kịch bản chạy sai lệch so với giờ Việt Nam.\n- Quên khai báo `workflow_dispatch` khiến việc kiểm thử thủ công workflow gặp nhiều khó khăn.\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. Khởi tạo một tệp workflow với thuộc tính `on` hỗ trợ cả `push` và `workflow_dispatch`:\n   ```yaml\n   name: Trigger Demo\n   on:\n     push:\n       branches: [main]\n       paths-ignore:\n         - '**.md'\n     workflow_dispatch:\n   jobs:\n     demo:\n       runs-on: ubuntu-latest\n       steps:\n         - run: echo \"Workflow triggered successfully!\"\n   ```\n2. Đẩy file lên GitHub và thử chỉnh sửa tệp `README.md`, quan sát xem workflow có bỏ qua hay không.\n3. Chỉnh sửa một file mã nguồn và đẩy lên, kiểm tra xem workflow có tự động chạy hay không.\n4. Thử truy cập tab Actions trên web và bấm nút **Run workflow** để trải nghiệm sự kiện `workflow_dispatch`.\n\n## 💡 Hint & mẹo\n- Múi giờ của lịch `schedule` cron trong GitHub Actions luôn tính theo giờ UTC, hãy nhớ trừ 7 tiếng so với giờ Việt Nam (UTC+7).\n- Bạn có thể thêm trường `inputs` cho `workflow_dispatch` để người dùng nhập thông số tùy chỉnh khi bấm nút chạy.\n\n## ✅ Validation & Kết quả mong đợi\n- Workflow không bị kích hoạt khi chỉ có thay đổi trong các tệp markdown.\n- Nút Run workflow màu xanh xuất hiện trong giao diện web khi tệp YAML có khai báo `workflow_dispatch`.\n\n## ❓ Quiz nhanh\nHãy hoàn thành bài trắc nghiệm bên dưới để kiểm tra mức độ nắm vững các sự kiện và bộ lọc kích hoạt trong GitHub Actions.\n\n## 🚀 Thử thách nâng cao\nThiết kế biểu thức cron trong thuộc tính `schedule` để workflow tự động sao lưu dữ liệu vào lúc 3 giờ sáng mỗi ngày từ thứ Hai đến thứ Sáu theo giờ Việt Nam.\n\n## 📝 Tổng kết\n- Thuộc tính `on` định nghĩa các sự kiện kích hoạt workflow như `push`, `pull_request`, `workflow_dispatch`.\n- Sử dụng `branches`, `paths` và `paths-ignore` để tối ưu chi phí và tránh chạy workflow vô ích.\n- `workflow_dispatch` mang lại sự linh hoạt tối đa khi cần kích hoạt hoặc kiểm thử quy trình thủ công.\n",
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
