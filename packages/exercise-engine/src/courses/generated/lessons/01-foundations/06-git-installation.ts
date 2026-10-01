import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "06-git-installation",
  "moduleId": "01-foundations",
  "metadata": {
    "id": "06-git-installation",
    "title": "Cài đặt & Môi trường Git",
    "level": "beginner",
    "duration": 20,
    "xp": 50,
    "prerequisites": [
      "05-git-vs-github"
    ],
    "objectives": [
      "Cài Git cho hệ điều hành của mình theo hướng dẫn của lớp.",
      "Mở terminal và kiểm tra cài đặt bằng `git --version`.",
      "Trên Windows, chọn dùng PowerShell hoặc Git Bash."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "cai dat git",
      "git bash",
      "terminal",
      "cli",
      "moi truong"
    ],
    "commands": [
      "git --version"
    ]
  },
  "content": "# Cài đặt & Môi trường Git\n\n---\n\n## 🎯 Mục tiêu\n- Biết cần cài Git một lần trước khi dùng lệnh Git trên máy.\n- Mở được terminal và kiểm tra Git bằng `git --version`.\n- Biết Git Bash là một lựa chọn trên Windows, không phải GitHub.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Terminal — cửa sổ nhập lệnh\n- **Nói dễ hiểu:** Ứng dụng cho phép bạn gõ lệnh để yêu cầu máy tính làm việc.\n- **Ví dụ:** PowerShell trên Windows hoặc Terminal trên macOS.\n- **Đừng nhầm:** Terminal là nơi gõ lệnh; Git là một công cụ có thể chạy bên trong đó.\n\n### Git CLI — bộ lệnh Git\n- **Nói dễ hiểu:** Cách dùng Git bằng cách gõ lệnh thay vì chỉ bấm nút trong giao diện.\n- **Ví dụ:** `git --version` hỏi Git đang cài phiên bản nào.\n- **Đừng nhầm:** CLI là cách điều khiển công cụ; GitHub là dịch vụ trực tuyến riêng.\n\n### Git Bash — terminal đi kèm Git for Windows\n- **Nói dễ hiểu:** Một lựa chọn trên Windows cung cấp terminal và các lệnh Git quen thuộc.\n- **Ví dụ:** Bạn mở Git Bash rồi chạy `git status`.\n- **Đừng nhầm:** Bạn không bắt buộc phải dùng Git Bash; PowerShell cũng có thể chạy Git nếu Git đã cài đúng.\n\n### PATH — danh sách nơi hệ điều hành tìm chương trình\n- **Nói dễ hiểu:** Thiết lập giúp Windows tìm được lệnh `git` khi bạn gõ lệnh.\n- **Ví dụ:** Nếu terminal báo không nhận ra `git`, Git có thể chưa cài xong hoặc chưa được thêm vào PATH.\n- **Đừng nhầm:** PATH không phải thư mục dự án và không chứa lịch sử Git.\n\n---\n\n## 📖 Định nghĩa\nCài đặt Git là đưa công cụ Git vào máy để terminal có thể chạy lệnh `git`. Trên Windows, Git for Windows thường cung cấp Git Bash; bạn cũng có thể dùng PowerShell nếu lệnh Git đã có trong PATH. Sau khi cài, hãy chạy `git --version` để kiểm tra.\n\n---\n\n## 🤔 Tại sao cần?\nTrước khi học lệnh Git, hãy kiểm tra máy đã chạy được Git chưa. Nếu `git --version` báo lỗi, bạn sẽ biết cần cài Git hoặc sửa cách terminal tìm chương trình.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nGit là một chương trình. Terminal là cửa sổ để bạn gõ lệnh gọi chương trình đó. `git --version` là câu hỏi kiểm tra xem lời gọi có thành công không.\n\n---\n\n## 🖼 Sơ đồ\n```text\nHệ điều hành:\n┌───────────────────────────────────────────────┐\n│ Windows / macOS / Linux                       │\n│   ┌─────────────────────────────────────────┐ │\n│   │ Biến môi trường PATH                    │ │\n│   │   └─► /usr/bin/git  hoặc  git.exe        │ │\n│   └─────────────────────────────────────────┘ │\n│                     ▲                         │\n│                     │ (gọi lệnh)              │\n│       [Terminal / VS Code / Git Bash]         │\n└───────────────────────────────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn vừa cài Git for Windows. Mở PowerShell và chạy `git --version`. Nếu màn hình in ra số phiên bản, bạn có thể tiếp tục học bằng PowerShell; nếu lệnh không được nhận diện, hãy kiểm tra cài đặt hoặc mở terminal mới.\n\n---\n\n## 💻 Command\n```bash\ngit --version\n```\n\n---\n\n## 🔍 Giải thích command\n- `git --version`: Hiển thị phiên bản để xác nhận terminal chạy được Git.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Cài Git xong nhưng chưa mở terminal mới**: Mở terminal mới rồi thử lại lệnh.\n2. **Tưởng bắt buộc phải dùng Git Bash**: PowerShell cũng chạy được Git for Windows.\n3. **Nhầm terminal với Git**: Terminal nhận lệnh; Git là chương trình được gọi.\n\n---\n\n## 🧪 Lab\n1. Mở PowerShell, Git Bash hoặc Terminal trên máy.\n2. Chạy `git --version`.\n3. Ghi lại kết quả. Nếu có lỗi, chép nguyên dòng lỗi để nhờ giảng viên hỗ trợ.\n\n---\n\n## 💡 Hint\n> Nếu vừa cài Git mà terminal báo lỗi, hãy mở cửa sổ terminal mới rồi thử lại.\n\n---\n\n## ✅ Validation\n- Terminal hiển thị phiên bản Git mà không báo lỗi.\n\n---\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm dưới đây để kiểm tra hiểu biết về cài đặt môi trường Git.\n\n---\n\n## 🔥 Challenge\nMở cả PowerShell và Git Bash rồi kiểm tra Git trong mỗi terminal. Ghi lại kết quả.\n\n---\n\n## 📚 Tổng kết\n- Cài Git trước khi dùng lệnh Git trong terminal.\n- Dùng `git --version` để kiểm tra Git có chạy không.\n- PowerShell và Git Bash đều có thể dùng với Git for Windows.\n",
  "quiz": {
    "id": "quiz-06-git-installation",
    "title": "Trắc nghiệm: Cài đặt và môi trường Git",
    "questions": [
      {
        "id": "q1",
        "question": "Lệnh nào dùng để kiểm tra xem Git đã được cài đặt thành công trên máy tính hay chưa?",
        "type": "single",
        "options": [
          {
            "text": "git --version",
            "correct": true
          },
          {
            "text": "git --verify-install",
            "correct": false
          },
          {
            "text": "git ping",
            "correct": false
          },
          {
            "text": "git test-connection",
            "correct": false
          }
        ],
        "explanation": "Lệnh này in ra phiên bản Git đang được cài trên máy tính của bạn."
      },
      {
        "id": "q2",
        "question": "Bạn đang dùng Windows. Có bắt buộc mở Git Bash mới chạy được Git không?",
        "type": "single",
        "options": [
          {
            "text": "Không, PowerShell cũng chạy được Git khi cài đặt đúng",
            "correct": true
          },
          {
            "text": "Có, Git chỉ chạy trong Git Bash",
            "correct": false
          },
          {
            "text": "Có, Git Bash là tài khoản trực tuyến bắt buộc",
            "correct": false
          },
          {
            "text": "Không, vì Windows không thể chạy lệnh Git",
            "correct": false
          }
        ],
        "explanation": "Git for Windows có thể chạy trong PowerShell; Git Bash chỉ là một lựa chọn."
      },
      {
        "id": "q3",
        "question": "Terminal báo không nhận diện được lệnh `git`. Bạn nên kiểm tra gì trước?",
        "type": "single",
        "options": [
          {
            "text": "Git đã được cài chưa và terminal có tìm thấy Git không",
            "correct": true
          },
          {
            "text": "Tài khoản GitHub đã có ảnh đại diện chưa",
            "correct": false
          },
          {
            "text": "README có đủ tiêu đề chưa",
            "correct": false
          },
          {
            "text": "Đã tạo nhánh `main` chưa",
            "correct": false
          }
        ],
        "explanation": "Có thể Git chưa được cài hoặc hệ điều hành chưa tìm thấy chương trình Git."
      },
      {
        "id": "q4",
        "question": "Lệnh đơn giản nào giúp bạn kiểm tra Git đã chạy được trong terminal chưa?",
        "type": "single",
        "options": [
          {
            "text": "`git --version`",
            "correct": true
          },
          {
            "text": "`git install --check`",
            "correct": false
          },
          {
            "text": "`git account`",
            "correct": false
          },
          {
            "text": "`git internet`",
            "correct": false
          }
        ],
        "explanation": "`git --version` xác nhận terminal nhận lệnh Git và hiển thị phiên bản."
      }
    ]
  }
};
export default lesson;
