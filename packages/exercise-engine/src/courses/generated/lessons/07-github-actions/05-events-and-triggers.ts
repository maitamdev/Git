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
  "content": "# Sự kiện kích hoạt (Events & Triggers: push, pull_request, workflow_dispatch)\n\n---\n\n## 🎯 Mục tiêu bài học\n- Làm chủ thuộc tính on trong workflow để cấu hình các sự kiện kích hoạt tự động.\n- Sử dụng bộ lọc nhánh (branches) và bộ lọc đường dẫn tệp tin (paths) để tối ưu thời điểm kích hoạt.\n- Thành thạo sự kiện kích hoạt thủ công workflow_dispatch và lập lịch tự động schedule cron.\n\n---\n\n## 📖 Định nghĩa\n> Sự kiện (Event) là một hoạt động cụ thể xảy ra trong kho lưu trữ của bạn kích hoạt GitHub Actions chạy một luồng công việc. Thuộc tính on trong tệp YAML định nghĩa danh sách các sự kiện này. Các sự kiện phổ biến nhất bao gồm: push (đẩy mã nguồn), pull_request (tạo, cập nhật hoặc đóng PR), workflow_dispatch (kích hoạt thủ công từ giao diện hoặc API), và schedule (kích hoạt định kỳ theo thời gian biểu cron) phục vụ các tác vụ bảo trì tự động.\n\n---\n\n## 🤔 Tại sao cần?\nNếu không cấu hình sự kiện chính xác, workflow sẽ chạy một cách vô tội vạ, gây lãng phí tài nguyên và làm nghẽn hàng đợi CI. Ví dụ: bạn không muốn một workflow triển khai lên máy chủ sản xuất lại bị kích hoạt khi ai đó chỉ đẩy commit lên một nhánh tính năng cá nhân, hoặc không muốn chạy lại bài test nặng nề khi người ta chỉ chỉnh sửa một tệp tài liệu README.md không ảnh hưởng gì tới mã nguồn thực thi.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy hình dung một chiếc chuông cửa điện tử thông minh trong ngôi nhà hiện đại. Bạn có thể cài đặt chuông reo khi có khách nhấn nút trực tiếp (sự kiện workflow_dispatch), hoặc khi cảm biến chuyển động phát hiện có người đứng trước cửa (sự kiện push vào nhánh main). Bạn cũng có thể dễ dàng cài đặt bộ lọc thông minh: nếu đó chỉ là một chú mèo hàng xóm đi ngang qua (sửa đổi tệp trong thư mục docs/), chiếc chuông sẽ tự động bỏ qua và không reo để tránh làm phiền gia chủ.\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nEvent: push ────────────────► [Lọc Branch: main?] ──► Có ──► Kích hoạt Workflow\n                                    │\n                                    └── Không (feature) ──► Bỏ qua (Ignored)\n\nEvent: pull_request ──────────► [Lọc Path: src/**?] ──► Có ──► Chạy Test\n                                    │\n                                    └── Không (docs/**) ──► Tiết kiệm tài nguyên\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrong dự án xây dựng cổng thông tin ngân hàng, kỹ sư cấu hình tệp workflow ci.yml với sự kiện push nhưng chỉ lắng nghe trên nhánh main và nhánh staging. Đồng thời, kỹ sư bổ sung thuộc tính paths-ignore để bỏ qua mọi commit chỉ thay đổi các tệp markdown trong thư mục docs. Khi một cộng tác viên đẩy bản sửa lỗi chính tả trong tài liệu, hệ thống không chạy CI, tiết kiệm hàng trăm phút tính toán máy ảo cho công ty. Khi trưởng nhóm gộp mã nguồn vào nhánh main, hệ thống lập tức kích hoạt toàn bộ bài test bảo mật nghiêm ngặt.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\ngh workflow run ci.yml\ngit push origin main\ngit push origin feature/login\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nCâu lệnh gh workflow run cho phép kích hoạt một workflow có hỗ trợ sự kiện workflow_dispatch trực tiếp từ terminal, trong khi git push đẩy commit lên các nhánh tương ứng để kiểm tra bộ lọc branches xem đường ống có phản hồi chính xác hay không.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Quên lọc nhánh khiến các commit trên nhánh tạm thời của lập trình viên kích hoạt luôn kịch bản deploy.**: \n2. **Sử dụng sai cú pháp biểu thức cron giờ UTC trong sự kiện schedule dẫn đến việc kịch bản chạy sai thời điểm mong muốn.**: \n3. **Không khai báo workflow_dispatch khiến việc kiểm thử thủ công workflow gặp nhiều khó khăn.**: \n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Khai báo sự kiện on với hai trigger: push trên nhánh main và pull_request.\n2. Thêm cấu hình workflow_dispatch để có thể bấm chạy thử nghiệm từ giao diện.\n3. Thêm bộ lọc paths-ignore đối với các tệp tin tài liệu đuôi `.md`.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Múi giờ của lịch schedule cron trong GitHub Actions luôn tính theo giờ quốc tế UTC, hãy nhớ quy đổi giờ Việt Nam (UTC+7).\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nWorkflow chỉ chạy khi đẩy code vào nhánh chỉ định hoặc kích hoạt thủ công, không chạy khi sửa file markdown.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nCùng làm bài trắc nghiệm về các sự kiện và bộ lọc kích hoạt trong GitHub Actions.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nLàm thế nào để cấu hình một workflow chỉ chạy vào lúc 2 giờ sáng hàng ngày từ thứ Hai đến thứ Sáu bằng cú pháp cron?\n\n---\n\n## 📚 Tổng kết kiến thức\n- Thuộc tính `on` định nghĩa các sự kiện kích hoạt workflow như `push`, `pull_request`, `workflow_dispatch`.\n- Có thể dùng `branches`, `branches-ignore`, `paths`, `paths-ignore` để lọc phạm vi kích hoạt.\n- `workflow_dispatch` cho phép kích hoạt workflow thủ công và truyền tham số đầu vào khi cần.\n",
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
      }
    ]
  }
};
export default lesson;
