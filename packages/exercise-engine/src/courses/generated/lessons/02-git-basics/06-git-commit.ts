import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "06-git-commit",
  "moduleId": "02-git-basics",
  "metadata": {
    "id": "06-git-commit",
    "title": "Lưu snapshot với git commit",
    "level": "beginner",
    "duration": 30,
    "xp": 100,
    "prerequisites": [
      "05-git-add"
    ],
    "objectives": [
      "Tạo commit từ thay đổi đã staged.",
      "Viết lời nhắn ngắn bằng `git commit -m`.",
      "Phân biệt commit trên máy với push lên dịch vụ trực tuyến."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "first-commit"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git commit",
      "snapshot",
      "commit message"
    ],
    "commands": [
      "git status",
      "git add <file>",
      "git commit -m \"feat: your commit message\"",
      "git log --oneline"
    ]
  },
  "content": "# Lưu một mốc bằng `git commit`\r\n\r\n---\r\n\r\n## 🎯 Mục tiêu\r\n- Tạo commit từ thay đổi đã staged.\r\n- Viết lời nhắn ngắn bằng `git commit -m`.\r\n- Phân biệt commit trên máy với việc gửi commit lên dịch vụ trực tuyến.\r\n\r\n---\r\n\r\n## 🧩 Từ khóa hôm nay\r\n\r\n### Commit — mốc lưu trong lịch sử\r\n- **Nói dễ hiểu:** Bản ghi lưu trạng thái đã chọn trong Staging Area.\r\n- **Ví dụ:** Sau khi chọn tệp, tạo commit để lưu một mốc.\r\n- **Đừng nhầm:** Commit thông thường lấy nội dung đã staged.\r\n\r\n### Staged — đã chọn cho commit\r\n- **Nói dễ hiểu:** Nội dung đã được đưa vào Staging Area.\r\n- **Ví dụ:** `git status` liệt kê `main.js` trong “Changes to be committed”.\r\n- **Đừng nhầm:** Staged chưa phải commit.\r\n\r\n### Commit message — lời nhắn của mốc\r\n- **Nói dễ hiểu:** Câu ngắn mô tả thay đổi chính của commit.\r\n- **Ví dụ:** `git commit -m \"docs: add setup guide\"`.\r\n- **Đừng nhầm:** Message giúp người đọc; nó không mô tả hết mọi dòng code.\r\n\r\n---\r\n\r\n## 📖 Định nghĩa\r\n`git commit` ghi các thay đổi đã chọn trong Staging Area thành một mốc trong lịch sử Git. Cờ `-m` cho phép thêm lời nhắn. Commit được lưu trong repository trên máy; lệnh này chưa tự gửi commit lên GitHub.\r\n\r\n---\r\n\r\n## 🤔 Tại sao cần?\r\nCommit chia công việc thành các mốc có thể xem lại. Một mốc nhỏ, tập trung thường dễ hiểu và dễ kiểm tra hơn một commit gom nhiều việc không liên quan.\r\n\r\n---\r\n\r\n## 🧠 Mental Model (Mô hình tư duy)\r\n`git add` chọn nội dung trước; `git commit` ghi lựa chọn đó thành một mốc trong lịch sử.\r\n\r\n---\r\n\r\n## 🖼 Sơ đồ\r\n```text\r\nTệp đang sửa ──git add──► Staging Area ──git commit──► Commit lưu trên máy\r\n                                                         │\r\n                                                  git push (bài sau)\r\n                                                         ▼\r\n                                                       GitHub\r\n```\r\n\r\n---\r\n\r\n## 🌎 Ví dụ thực tế\r\nBạn sửa `main.js`, chạy `git add main.js`, rồi tạo mốc bằng `git commit -m \"feat: add main page\"`. Commit đã lưu trên máy; muốn chia sẻ lên dịch vụ từ xa thì cần bước push học sau.\r\n\r\n---\r\n\r\n## 💻 Command\r\n```bash\r\ngit status\r\ngit add main.js\r\ngit commit -m \"feat: initialize main app\"\r\ngit log --oneline\r\n```\r\n\r\n---\r\n\r\n## 🔍 Giải thích command\r\n- `git status`: Kiểm tra thay đổi trước khi commit.\r\n- `git add main.js`: Đưa trạng thái hiện tại của tệp vào Staging Area.\r\n- `git commit -m \"<thông-điệp>\"`: Tạo commit từ thay đổi đã staged, kèm lời nhắn.\r\n- `git log --oneline`: Xem các commit đã tạo dưới dạng gọn.\r\n\r\n---\r\n\r\n## ⚠️ Sai lầm phổ biến\r\n1. **Thông điệp quá chung chung**: “update” không nói rõ thay đổi gì.\r\n2. **Quên stage tệp**: Commit chỉ lấy nội dung đã staged; kiểm tra bằng `git status` trước khi commit.\r\n3. **Nghĩ commit đã lên mạng**: Commit nằm trong repository trên máy cho tới khi push.\r\n\r\n---\r\n\r\n## 🧪 Lab\r\n1. Tạo hoặc chỉnh sửa tệp `main.js` để có thay đổi cần lưu.\r\n2. Chạy `git status` để xem thay đổi.\r\n3. Chạy `git add main.js`.\r\n4. Chạy lại `git status`; xác nhận `main.js` nằm trong “Changes to be committed”.\r\n5. Chạy `git commit -m \"feat: initialize main app\"`.\r\n6. Chạy `git log --oneline` để thấy commit vừa tạo. Trong repository mới, đây là commit đầu tiên; nếu đã có lịch sử, đây là commit mới tiếp theo.\r\n\r\n---\r\n\r\n## 💡 Hint\r\n> Nếu Git báo “nothing to commit”, hãy kiểm tra xem tệp có thay đổi và đã staged chưa.\r\n\r\n---\r\n\r\n## ✅ Validation\r\n- `git status` xác nhận thay đổi đã staged trước khi commit.\r\n- `git log --oneline` hiển thị commit với đúng lời nhắn.\r\n\r\n---\r\n\r\n## ❓ Quiz\r\nLàm bài trắc nghiệm dưới đây để kiểm tra cách tạo commit từ thay đổi đã staged.\r\n\r\n---\r\n\r\n## 🔥 Challenge\r\nTạo commit cho một thay đổi nhỏ rồi giải thích vì sao commit vẫn xem được ở máy dù chưa push lên máy chủ.\r\n\r\n---\r\n\r\n## 📚 Tổng kết\r\n- `git commit` lưu thay đổi đã staged thành một mốc trong lịch sử.\r\n- `-m` thêm lời nhắn cho commit.\r\n- Commit trên máy chưa tự được push lên GitHub.\r\n",
  "quiz": {
    "id": "quiz-02-06-git-commit",
    "title": "Trắc nghiệm chuyên sâu: Bản chất lệnh git commit",
    "questions": [
      {
        "id": "q1",
        "question": "Khi bạn chạy `git commit`, Git tạo ra điều gì?",
        "type": "single",
        "options": [
          {
            "text": "Một commit ghi lại snapshot của dự án dựa trên nội dung trong Staging Area",
            "correct": true
          },
          {
            "text": "Một bản ghi chứa các dòng code bị xóa khỏi ổ cứng",
            "correct": false
          },
          {
            "text": "Một lệnh gửi email tự động tới ban giám đốc công ty",
            "correct": false
          },
          {
            "text": "Một tệp sao lưu nén định dạng zip đặt ngoài màn hình Desktop",
            "correct": false
          }
        ],
        "explanation": "Git tạo commit từ trạng thái trong Staging Area. Thay đổi chưa staged không được thêm vào commit này."
      },
      {
        "id": "q2",
        "question": "Lệnh nào dưới đây tạo commit mới với thông điệp ngắn gọn mà không cần mở trình soạn thảo văn bản?",
        "type": "single",
        "options": [
          {
            "text": "git commit -m \"thông điệp\"",
            "correct": true
          },
          {
            "text": "git commit --text \"thông điệp\"",
            "correct": false
          },
          {
            "text": "git commit -s \"thông điệp\"",
            "correct": false
          },
          {
            "text": "git save \"thông điệp\"",
            "correct": false
          }
        ],
        "explanation": "Cờ `-m` viết tắt của `--message` cho phép truyền thông điệp commit trực tiếp trên dòng lệnh."
      },
      {
        "id": "q3",
        "question": "Lệnh `git commit -am \"fix bug\"` có hạn chế quan trọng nào mà lập trình viên cần lưu ý?",
        "type": "single",
        "options": [
          {
            "text": "Không tự động stage được các tệp tin mới tạo ở trạng thái Untracked",
            "correct": true
          },
          {
            "text": "Lệnh này chỉ chạy được trên hệ điều hành macOS",
            "correct": false
          },
          {
            "text": "Lệnh này xóa sạch toàn bộ lịch sử commit trước đó",
            "correct": false
          },
          {
            "text": "Lệnh này bắt buộc phải có kết nối Internet mới chạy được",
            "correct": false
          }
        ],
        "explanation": "Cờ `-a` chỉ tự động stage các tệp Modified đã được theo dõi, hoàn toàn bỏ qua các tệp Untracked."
      },
      {
        "id": "q4",
        "question": "Sau khi chạy lệnh git commit trên máy cá nhân, mã nguồn của bạn đã nằm ở đâu?",
        "type": "single",
        "options": [
          {
            "text": "Được ghi vào kho Git cục bộ; chưa tự gửi lên GitHub",
            "correct": true
          },
          {
            "text": "Đã tự động xuất hiện trên trang web GitHub của cả nhóm",
            "correct": false
          },
          {
            "text": "Đã được gửi tới kho lưu trữ trung tâm của Google",
            "correct": false
          },
          {
            "text": "Đã bị mã hóa và gửi vào hòm thư điện tử",
            "correct": false
          }
        ],
        "explanation": "Git commit chỉ ghi nhận dữ liệu vào cơ sở dữ liệu cục bộ; cần dùng lệnh `git push` để đẩy lên máy chủ GitHub."
      },
      {
        "id": "q5",
        "question": "Bạn sửa một tệp mới và muốn đưa nó vào commit. Cần làm gì trước?",
        "type": "single",
        "options": [
          {
            "text": "Chạy `git add <file>` để chọn tệp, rồi mới commit",
            "correct": true
          },
          {
            "text": "Chạy `git push` để tệp tự được commit",
            "correct": false
          },
          {
            "text": "Đổi tên tệp thành `commit.txt`",
            "correct": false
          },
          {
            "text": "Chỉ cần lưu tệp trong trình soạn thảo",
            "correct": false
          }
        ],
        "explanation": "Tệp mới chưa được chọn tự động; `git add` đưa phiên bản của nó vào vùng chuẩn bị."
      },
      {
        "id": "q6",
        "question": "Lệnh nào giúp bạn kiểm tra xem commit mới đã được tạo chưa?",
        "type": "single",
        "options": [
          {
            "text": "`git log --oneline`",
            "correct": true
          },
          {
            "text": "`git status --delete`",
            "correct": false
          },
          {
            "text": "`git push --check`",
            "correct": false
          },
          {
            "text": "`git commit --list`",
            "correct": false
          }
        ],
        "explanation": "`git log --oneline` liệt kê các commit đã lưu với lời nhắn ngắn gọn."
      }
    ]
  }
};
export default lesson;
