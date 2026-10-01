import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "03-git-la-gi",
  "moduleId": "01-foundations",
  "metadata": {
    "id": "03-git-la-gi",
    "title": "Git là gì? VCS phân tán trên máy bạn",
    "level": "beginner",
    "duration": 25,
    "xp": 60,
    "prerequisites": [
      "02-vcs-types"
    ],
    "objectives": [
      "Giải thích Git là một VCS phân tán.",
      "Phân biệt Git với GitHub.",
      "Nêu việc nào Git làm trên máy và việc nào cần mạng."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git la gi",
      "dvcs",
      "repository",
      "commit",
      "offline"
    ],
    "commands": [
      "git status"
    ]
  },
  "content": "# Git là gì? VCS phân tán trên máy bạn\n\n---\n\n## 🎯 Mục tiêu\n- Nói được Git là phần mềm quản lý phiên bản theo mô hình phân tán.\n- Giải thích repository Git trên máy giữ những gì ở mức cơ bản.\n- Dùng `git status` để xem trạng thái repository hiện tại.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Git — công cụ quản lý phiên bản\n- **Nói dễ hiểu:** Phần mềm ghi lại các mốc dự án bạn chọn để xem và so sánh về sau.\n- **Ví dụ:** Bạn dùng Git trên laptop để quản lý lịch sử một bài tập.\n- **Đừng nhầm:** Git là công cụ chạy trên máy; nó không tự tạo hoặc gửi commit nếu bạn chưa yêu cầu.\n\n### DVCS — hệ thống quản lý phiên bản phân tán\n- **Nói dễ hiểu:** Mô hình mà mỗi bản sao đầy đủ của kho thường mang theo lịch sử để làm việc độc lập.\n- **Ví dụ:** Git cho phép bạn đọc lịch sử đã có và tạo commit trên máy khi offline.\n- **Đừng nhầm:** Có lịch sử cục bộ không có nghĩa là các máy tự đồng bộ với nhau.\n\n### Repository (repo) — kho Git của dự án\n- **Nói dễ hiểu:** Dữ liệu Git gắn với dự án, gồm lịch sử phiên bản và thông tin để Git quản lý các tệp.\n- **Ví dụ:** Sau khi tạo hoặc clone một dự án, Git có một repository trên máy để làm việc.\n- **Đừng nhầm:** Repository Git có thể nằm trên máy bạn; không bắt buộc phải ở trên Internet.\n\n---\n\n## 🤔 Tại sao cần?\nGit giữ lịch sử ngay trong repository trên máy. Vì vậy, sau khi có một bản sao đầy đủ của dự án, bạn có thể xem lịch sử đã tải về và lưu commit cục bộ mà không cần kết nối liên tục. Điều này hữu ích khi mạng chập chờn hoặc bạn muốn làm việc một mình trước khi chia sẻ.\n\n---\n\n## 📖 Định nghĩa\nGit là một hệ thống quản lý phiên bản phân tán (DVCS). Nó dùng repository để quản lý tệp và lịch sử của dự án. Một repository Git đầy đủ thông thường có thể lưu và xem các commit trên máy mà không cần máy chủ trực tuyến.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy tưởng tượng Git là người quản lý cuốn sổ lịch sử trên máy bạn. Repository là dữ liệu dự án đi cùng cuốn sổ đó. Bạn chọn lúc nào lưu một trạng thái; các máy khác chỉ nhận được commit sau khi bạn chủ động chia sẻ bằng cách sẽ học ở bài sau.\n\n---\n\n## 🖼 Sơ đồ\n```text\nLaptop của bạn\n┌─────────────────────────────────────┐\n│ Git                                 │\n│  └── Repository của dự án           │\n│       ├── các tệp dự án             │\n│       └── lịch sử các commit đã lưu │\n└─────────────────────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn clone đầy đủ bài tập về laptop trước khi lên xe buýt. Không có mạng, bạn vẫn mở tệp và xem lịch sử đã có trong repository. Nếu cần lưu một mốc mới, Git ghi commit trong repository cục bộ; việc gửi mốc đó cho người khác là một bước riêng.\n\n---\n\n## 💻 Command\n```bash\ngit status\n```\n\n---\n\n## 🔍 Giải thích command\n`git status` đọc repository hiện tại và cho biết tệp nào mới hoặc đã sửa. Lệnh này không tạo commit và không gửi dữ liệu qua mạng.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ Git chỉ chạy khi có mạng:** Nhiều thao tác trên repository đầy đủ đang ở máy vẫn thực hiện được offline.\n2. **Nghĩ Git tự lưu mọi lần sửa tệp:** Bạn phải chủ động tạo commit để lưu một mốc vào lịch sử.\n3. **Nghĩ mỗi repository Git đều nằm trên máy chủ:** Kho Git có thể chỉ nằm trên máy cá nhân.\n\n---\n\n## 🧪 Lab\n1. Chạy `git status` trong terminal mô phỏng.\n2. Ghi lại một thông tin lệnh cho biết về tệp trong repository.\n3. Trả lời: lệnh vừa chạy có lưu commit hoặc gửi dữ liệu qua mạng không? Vì sao?\n\n---\n\n## 💡 Hint\n`git status` chỉ báo tình trạng hiện tại; nó không ghi mốc mới và không trao đổi với máy chủ.\n\n---\n\n## ✅ Validation\n- Nêu được Git là DVCS và repository có thể nằm trên máy cá nhân.\n- Giải thích được `git status` chỉ đọc trạng thái, không tạo commit.\n\n---\n\n## ❓ Quiz\nTrả lời các câu hỏi sau. Khi sai, đọc lời giải thích rồi thử lại.\n\n---\n\n## 🔥 Challenge\nGiải thích bằng một ví dụ vì sao Git vẫn hữu ích khi laptop tạm thời không có Internet.\n\n---\n\n## 📚 Tổng kết\n- Git là công cụ quản lý phiên bản theo mô hình phân tán.\n- Repository Git đầy đủ thông thường có thể lưu lịch sử trên máy.\n- `git status` xem trạng thái hiện tại, không tạo commit.\n",
  "quiz": {
    "id": "quiz-03-git-la-gi",
    "title": "Trắc nghiệm: Git và repository cục bộ",
    "questions": [
      {
        "id": "q1",
        "question": "Git là công cụ dùng chủ yếu để làm gì?",
        "type": "single",
        "options": [
          {
            "text": "Quản lý lịch sử phiên bản của tệp và dự án",
            "correct": true
          },
          {
            "text": "Lưu trữ mọi tệp trực tuyến mà không cần tạo tài khoản",
            "correct": false
          },
          {
            "text": "Biên dịch mọi ngôn ngữ lập trình thành mã máy",
            "correct": false
          },
          {
            "text": "Tự kiểm tra và sửa lỗi chương trình",
            "correct": false
          }
        ],
        "explanation": "Git ghi lại những mốc dự án bạn chọn để xem và so sánh về sau. Nó không phải dịch vụ lưu trữ trực tuyến hay trình biên dịch."
      },
      {
        "id": "q2",
        "question": "Điều gì mô tả đúng một bản clone Git đầy đủ thông thường?",
        "type": "single",
        "options": [
          {
            "text": "Nó có thể chứa các tệp dự án và lịch sử để làm việc cục bộ",
            "correct": true
          },
          {
            "text": "Nó chỉ hoạt động nếu GitHub luôn mở trên trình duyệt",
            "correct": false
          },
          {
            "text": "Nó tự gửi mỗi lần sửa tệp lên máy của cả nhóm",
            "correct": false
          },
          {
            "text": "Nó không lưu lịch sử cho tới khi có Internet",
            "correct": false
          }
        ],
        "explanation": "Bản clone đầy đủ thường có lịch sử ở trên máy nên Git làm được nhiều thao tác cục bộ mà không cần kết nối liên tục."
      },
      {
        "id": "q3",
        "question": "Bạn chạy `git status` trong repository. Lệnh này làm gì?",
        "type": "single",
        "options": [
          {
            "text": "Đọc trạng thái các tệp trong repository hiện tại",
            "correct": true
          },
          {
            "text": "Lưu một commit mới vào lịch sử",
            "correct": false
          },
          {
            "text": "Gửi mọi thay đổi trong dự án lên máy chủ",
            "correct": false
          },
          {
            "text": "Cài Git lên máy tính của bạn",
            "correct": false
          }
        ],
        "explanation": "`git status` báo tình trạng của repository hiện tại. Lệnh không tạo commit, cài đặt Git hoặc tự gửi dữ liệu qua mạng."
      },
      {
        "id": "q4",
        "question": "Bạn đã clone đủ dự án về máy nhưng đang mất Internet. Điều nào đúng?",
        "type": "single",
        "options": [
          {
            "text": "Bạn vẫn có thể xem tệp và lịch sử đã có trên máy",
            "correct": true
          },
          {
            "text": "Git tự xóa lịch sử cục bộ khi không thấy mạng",
            "correct": false
          },
          {
            "text": "Không thể mở bất kỳ tệp nào trong dự án",
            "correct": false
          },
          {
            "text": "Mọi commit mới sẽ tự xuất hiện trên máy thành viên khác",
            "correct": false
          }
        ],
        "explanation": "Tệp và lịch sử trong bản clone đang nằm trên máy bạn. Mất Internet chỉ ngăn việc trao đổi dữ liệu với máy khác trong lúc đó."
      },
      {
        "id": "q5",
        "question": "Bạn sửa một tệp trong dự án. Điều gì cần làm để trạng thái đó thành mốc trong lịch sử Git?",
        "type": "single",
        "options": [
          {
            "text": "Chủ động tạo một commit sau khi chọn nội dung muốn lưu",
            "correct": true
          },
          {
            "text": "Chờ Git tự lưu tệp sau một khoảng thời gian",
            "correct": false
          },
          {
            "text": "Đổi tên tệp để lịch sử tự cập nhật",
            "correct": false
          },
          {
            "text": "Mở trang web để Git tự tạo mốc từ nội dung đang sửa",
            "correct": false
          }
        ],
        "explanation": "Git chỉ ghi một mốc mới khi bạn chủ động thực hiện commit. Chỉnh sửa hoặc lưu tệp thông thường chưa tạo commit."
      }
    ]
  }
};
export default lesson;
