import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "10-gitignore",
  "moduleId": "02-git-basics",
  "metadata": {
    "id": "10-gitignore",
    "title": "Bỏ qua tệp chưa cần đưa vào Git bằng .gitignore",
    "level": "beginner",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "05-git-add"
    ],
    "objectives": [
      "Tạo quy tắc đơn giản để Git bỏ qua tệp chưa được theo dõi.",
      "Dùng git check-ignore -v để tìm quy tắc khớp.",
      "Nhận biết .gitignore không ảnh hưởng tệp đã tracked hay xóa bí mật khỏi lịch sử cũ."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "gitignore",
      "ignore files",
      "bo qua tep tin",
      "pattern",
      "node_modules"
    ],
    "commands": [
      "git status",
      "git check-ignore -v <file>"
    ]
  },
  "content": "# Bỏ qua tệp chưa cần đưa vào Git bằng `.gitignore`\r\n\r\n---\r\n\r\n## 🎯 Mục tiêu\r\n- Tạo quy tắc đơn giản để Git bỏ qua tệp chưa được theo dõi.\r\n- Dùng `git check-ignore -v` để tìm quy tắc khớp với một tệp.\r\n- Nhận biết `.gitignore` không ảnh hưởng tệp đã tracked hay xóa bí mật khỏi lịch sử cũ.\r\n\r\n---\r\n\r\n## 🧩 Từ khóa hôm nay\r\n\r\n### `.gitignore` — danh sách mẫu cần bỏ qua\r\n- **Nói dễ hiểu:** Tệp cấu hình để Git bỏ qua một số đường dẫn chưa được theo dõi.\r\n- **Ví dụ:** Ghi `*.log` để bỏ qua các tệp log mới.\r\n- **Đừng nhầm:** `.gitignore` không xóa tệp trên máy.\r\n\r\n### Pattern — mẫu tên cần khớp\r\n- **Nói dễ hiểu:** Quy tắc tên giúp Git nhận ra tệp nào cần bỏ qua.\r\n- **Ví dụ:** `*.log` khớp tệp kết thúc bằng `.log`; `node_modules/` khớp thư mục cùng tên.\r\n- **Đừng nhầm:** Mẫu chỉ khớp đúng nội dung và vị trí đã viết.\r\n\r\n### Tracked — tệp Git đã theo dõi\n- **Nói dễ hiểu:** Tệp đã được đưa vào lịch sử hoặc vùng chuẩn bị.\n- **Ví dụ:** Thêm `local.env` vào `.gitignore` không làm Git ngừng báo các sửa đổi của tệp đó.\n- **Đừng nhầm:** Bỏ qua tệp chưa tracked không xóa bí mật từng lưu trong commit cũ.\n\n### `git check-ignore` — tìm quy tắc khớp\n- **Nói dễ hiểu:** Lệnh cho biết quy tắc nào trong `.gitignore` khiến Git bỏ qua một đường dẫn.\n- **Ví dụ:** `git check-ignore -v dist/cache.log` chỉ ra tệp quy tắc, số dòng và pattern đã khớp.\n- **Đừng nhầm:** Lệnh này giúp kiểm tra nguyên nhân; nó không sửa hoặc xóa tệp.\n\r\n---\r\n\r\n## 📖 Định nghĩa\r\n`.gitignore` là tệp văn bản chứa các mẫu để Git bỏ qua những đường dẫn chưa được theo dõi khi xem hoặc thêm thay đổi thông thường. Ví dụ, `*.log` bỏ qua tệp log; `node_modules/` bỏ qua thư mục phụ thuộc được cài tự động. Git vẫn giữ tệp trên máy. Quy tắc trong `.gitignore` cũng cần được commit thì đồng đội mới nhận được.\r\n\r\n---\r\n\r\n## 🤔 Tại sao cần?\r\nDự án thường sinh ra tệp log, file build hoặc thư viện tải về mà không cần đưa vào lịch sử. Bỏ qua chúng giúp danh sách thay đổi gọn hơn. Với tệp chứa mật khẩu, `.gitignore` chỉ giúp tránh thêm nhầm tệp mới; nếu bí mật đã commit, hãy báo người phụ trách và thay bí mật đó.\r\n\r\n---\r\n\r\n## 🧠 Mental Model (Mô hình tư duy)\r\nCoi `.gitignore` là tấm ghi chú cho Git: “Nếu gặp tệp mới khớp mẫu này, đừng đưa nó vào danh sách thay đổi.” Nó không khóa tệp, không xóa tệp và không che các tệp Git đã theo dõi từ trước.\r\n\r\n---\r\n\r\n## 🖼 Sơ đồ\r\n```text\r\nTệp mới khớp mẫu .gitignore ──► bị ẩn khỏi danh sách Untracked\r\nTệp mới không khớp mẫu       ──► hiện trong git status\r\nTệp đã tracked               ──► vẫn được Git theo dõi\r\n```\r\n\r\n---\r\n\r\n## 🌎 Ví dụ thực tế\r\nSau khi chạy ứng dụng, thư mục dự án có thể xuất hiện các tệp `debug.log` hoặc `error.log`. Thêm mẫu `*.log` vào `.gitignore` để các log mới không làm danh sách thay đổi bị rối. Trước khi commit, vẫn đọc `git status` để chắc rằng những tệp cần lưu không bị bỏ qua nhầm.\r\n\r\n---\r\n\r\n## 💻 Command\r\nTạo hoặc mở `.gitignore` bằng trình sửa tệp của bài học và ghi vào đó:\r\n```text\r\n*.log\r\nnode_modules/\r\n```\r\nSau đó kiểm tra quy tắc với một tệp cụ thể:\r\n```bash\r\ngit status\r\ngit check-ignore -v debug.log\r\n```\r\n\r\n---\r\n\r\n## 🔍 Giải thích command\r\n- `git status`: Xem thay đổi Git đang theo dõi và tệp mới chưa bị bỏ qua.\r\n- `git check-ignore -v debug.log`: Cho biết `debug.log` có bị bỏ qua không; tùy chọn `-v` hiển thị tệp quy tắc, số dòng và mẫu khớp.\r\n- Trong simulator của bài học, `git check-ignore -v` hỗ trợ các mẫu cơ bản `*.đuôi` và `thư_mục/` trong `.gitignore` ở thư mục gốc.\r\n\r\n---\r\n\r\n## ⚠️ Sai lầm phổ biến\r\n1. **Tưởng `.gitignore` xóa tệp**: Tệp vẫn còn trên máy; Git chỉ không liệt kê tệp mới khớp quy tắc.\r\n2. **Tưởng thêm tệp đã tracked vào danh sách là đủ**: Git vẫn theo dõi thay đổi của tệp đó; cần xử lý việc theo dõi riêng.\r\n3. **Tưởng mật khẩu đã commit được bảo vệ**: `.gitignore` không xóa commit cũ; hãy thay bí mật đã lộ và nhờ người có kinh nghiệm xử lý lịch sử.\r\n\r\n---\r\n\r\n## 🧪 Lab\r\n1. Tạo tệp `debug.log` có nội dung bất kỳ.\r\n2. Chạy `git status`; xác nhận `debug.log` đang Untracked.\r\n3. Tạo tệp `.gitignore` bằng trình sửa tệp, ghi một dòng `*.log`, rồi lưu.\r\n4. Chạy lại `git status`; xác nhận `debug.log` không còn hiện trong danh sách Untracked.\r\n5. Chạy `git check-ignore -v debug.log` và đọc mẫu đã khớp.\r\n\r\n---\r\n\r\n## 💡 Hint\r\n> Gõ mẫu vào chính tệp `.gitignore`, mỗi quy tắc trên một dòng; đừng chạy mẫu như một lệnh terminal.\r\n\r\n---\r\n\r\n## ✅ Validation\r\n- `debug.log` vẫn còn trong danh sách tệp của dự án nhưng không hiện như tệp Untracked.\r\n- `git check-ignore -v debug.log` chỉ ra mẫu `*.log` trong `.gitignore`.\r\n\r\n---\r\n\r\n## ❓ Quiz\r\nTrả lời các câu hỏi để kiểm tra bạn có thể chọn mẫu phù hợp và hiểu giới hạn của `.gitignore`.\r\n\r\n---\r\n\r\n## 🔥 Challenge\r\nTạo thêm `notes.txt` và `server.log`. Chỉ bỏ qua tệp log; dùng `git status` giải thích vì sao `notes.txt` vẫn hiện còn `server.log` thì không.\r\n\r\n---\r\n\r\n## 📚 Tổng kết\r\n- `.gitignore` bỏ qua các đường dẫn chưa được theo dõi khớp với mẫu.\r\n- `git check-ignore -v <tệp>` giúp tìm quy tắc đang khớp.\r\n- Tệp đã tracked và bí mật trong commit cũ cần xử lý riêng.\r\n",
  "quiz": {
    "id": "quiz-02-10-gitignore",
    "title": "Trắc nghiệm: Bỏ qua tệp với .gitignore",
    "questions": [
      {
        "id": "q1",
        "question": "Một dự án tạo nhiều tệp có đuôi `.log`. Bạn muốn bỏ qua các tệp log mới. Nên thêm dòng nào vào `.gitignore`?",
        "type": "single",
        "options": [
          {
            "text": "*.log",
            "correct": true
          },
          {
            "text": "debug.log",
            "correct": false
          },
          {
            "text": "git ignore .log",
            "correct": false
          },
          {
            "text": "/log-all",
            "correct": false
          }
        ],
        "explanation": "`*.log` dùng ký tự đại diện để khớp các tên kết thúc bằng `.log`."
      },
      {
        "id": "q2",
        "question": "Sau khi tạo `debug.log` và thêm `*.log` vào `.gitignore`, điều gì sẽ xảy ra?",
        "type": "single",
        "options": [
          {
            "text": "Tệp vẫn nằm trên máy nhưng không hiện như tệp Untracked trong `git status`",
            "correct": true
          },
          {
            "text": "Tệp bị xóa khỏi máy tính",
            "correct": false
          },
          {
            "text": "Tệp tự được commit",
            "correct": false
          },
          {
            "text": "Tệp được gửi lên GitHub",
            "correct": false
          }
        ],
        "explanation": "Quy tắc ignore ẩn tệp chưa tracked khỏi danh sách thay đổi; nó không xóa tệp hay tạo commit."
      },
      {
        "id": "q3",
        "question": "Lệnh nào cho biết vì sao `debug.log` bị bỏ qua?",
        "type": "single",
        "options": [
          {
            "text": "`git check-ignore -v debug.log`",
            "correct": true
          },
          {
            "text": "`git log debug.log`",
            "correct": false
          },
          {
            "text": "`git diff debug.log`",
            "correct": false
          },
          {
            "text": "`git commit debug.log`",
            "correct": false
          }
        ],
        "explanation": "Tùy chọn `-v` cho biết quy tắc và dòng trong `.gitignore` đã khớp với tệp."
      },
      {
        "id": "q4",
        "question": "Một tệp đã được commit trước khi bạn thêm tên của nó vào `.gitignore`. Git sẽ làm gì?",
        "type": "single",
        "options": [
          {
            "text": "Tiếp tục theo dõi tệp đó; `.gitignore` không xóa nội dung trong commit cũ",
            "correct": true
          },
          {
            "text": "Xóa tệp khỏi tất cả commit trước đó",
            "correct": false
          },
          {
            "text": "Tự mã hóa nội dung tệp",
            "correct": false
          },
          {
            "text": "Chặn mọi người mở repository",
            "correct": false
          }
        ],
        "explanation": "`.gitignore` chủ yếu áp dụng cho đường dẫn chưa tracked; tệp đã tracked cần được xử lý riêng."
      },
      {
        "id": "q5",
        "question": "Vì sao không nên coi `.gitignore` là cách bảo vệ mật khẩu đã commit?",
        "type": "single",
        "options": [
          {
            "text": "Quy tắc không xóa bí mật khỏi lịch sử cũ; cần thay bí mật đã lộ",
            "correct": true
          },
          {
            "text": "`.gitignore` chỉ hoạt động khi không có mật khẩu",
            "correct": false
          },
          {
            "text": "Mật khẩu sẽ tự hiện lại sau một ngày",
            "correct": false
          },
          {
            "text": "Mọi tệp ignore đều được gửi tự động lên máy chủ",
            "correct": false
          }
        ],
        "explanation": "Thêm quy tắc không thay đổi commit trước; bí mật đã lộ cần được thay và xử lý lịch sử riêng."
      }
    ]
  }
};
export default lesson;
