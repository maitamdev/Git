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
      "Nắm bắt các phương thức cài đặt Git trên các hệ điều hành phổ biến: Windows, macOS, Linux.",
      "Hiểu vai trò của Git Bash trên môi trường Windows.",
      "Làm quen với các tùy chọn cấu hình dòng kết thúc tệp tin (crlf vs lf) khi cài đặt."
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
      "git --version",
      "git config --system --list"
    ]
  },
  "content": "# Cài đặt & Môi trường Git\n\n---\n\n## 🎯 Mục tiêu\n- Nắm bắt các phương thức cài đặt Git trên các hệ điều hành phổ biến: Windows, macOS, Linux.\n- Hiểu vai trò của Git Bash trên môi trường Windows.\n- Làm quen với các tùy chọn cấu hình dòng kết thúc tệp tin (crlf vs lf) khi cài đặt.\n\n---\n\n## 📖 Định nghĩa\n> Cài đặt Git là quy trình thiết lập bộ công cụ dòng lệnh Git (Git CLI) lên hệ điều hành máy tính cá nhân. Trên hệ điều hành Windows, gói cài đặt Git for Windows cung cấp công cụ Git Bash - một môi trường giả lập shell Unix cho phép lập trình viên thực thi các lệnh bash quen thuộc. Quá trình cài đặt bao gồm việc thiết lập biến môi trường PATH để câu lệnh `git` có thể được gọi từ bất kỳ cửa sổ dòng lệnh nào trên hệ thống.\n\n---\n\n## 🤔 Tại sao cần?\nMột môi trường Git được cài đặt chuẩn xác là nền móng bảo đảm các công cụ soạn thảo như Visual Studio Code, JetBrains IDE hay terminal có thể nhận diện và thao tác trơn tru với kho lưu trữ. Nếu cài đặt sai tùy chọn kết thúc dòng (Line Ending) giữa Windows (CRLF) và Linux/macOS (LF), dự án của bạn sẽ liên tục gặp cảnh báo giả mạo rằng toàn bộ file bị sửa đổi dù bạn chưa hề gõ một chữ nào.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung việc cài đặt Git giống như việc lắp đặt một bộ đồ nghề cơ khí đa năng vào cốp xe của bạn. Bộ đồ nghề này bao gồm đủ các loại cờ-lê, mỏ-lết và tuốc-nơ-vít tiêu chuẩn quốc tế. Dù chiếc xe của bạn mang thương hiệu gì (Windows, macOS hay Linux), chỉ cần có bộ đồ nghề này bên mình, bạn đều có thể xử lý và bảo trì chiếc xe theo cùng một tiêu chuẩn kỹ thuật thống nhất.\n\n---\n\n## 🖼 Sơ đồ\n```text\nHệ điều hành:\n┌───────────────────────────────────────────────┐\n│ Windows / macOS / Linux                       │\n│   ┌─────────────────────────────────────────┐ │\n│   │ Biến môi trường PATH                    │ │\n│   │   └─► /usr/bin/git  hoặc  git.exe        │ │\n│   └─────────────────────────────────────────┘ │\n│                     ▲                         │\n│                     │ (gọi lệnh)              │\n│       [Terminal / VS Code / Git Bash]         │\n└───────────────────────────────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột lập trình viên sử dụng máy tính Windows tham gia vào dự án phát triển backend chạy trên máy chủ Ubuntu Linux. Khi cài đặt Git, lập trình viên chọn tùy chọn `core.autocrlf = true`. Khi tải code từ Linux về Windows, Git tự động chuyển đổi ký tự xuống dòng sang CRLF để hiển thị đúng trong Notepad, và khi commit đẩy lên server, Git tự động chuyển đổi ngược lại thành LF. Nhờ đó, các kỹ sư dùng máy tính khác nhau không bao giờ bị xung đột định dạng dòng vô cớ, giúp quy trình tích hợp liên tục CI/CD diễn ra hoàn toàn êm đẹp mà không bị gián đoạn kiểm thử.\n\n---\n\n## 💻 Command\n```bash\ngit --version\ngit config --system --list\n```\n\n---\n\n## 🔍 Giải thích command\n- `git --version`: Xác nhận công cụ Git đã được cài đặt thành công và đường dẫn thực thi đã được tích hợp chuẩn xác vào biến môi trường PATH của hệ điều hành.\n- `git config --system --list`: Hiển thị toàn bộ các thiết lập cấu hình ở cấp độ toàn hệ thống máy tính, áp dụng chung cho mọi tài khoản người dùng đăng nhập.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Không tích hợp Git vào biến môi trường PATH**:  Khiến cho terminal thông báo lỗi `command not found\n2. **Chọn sai cấu hình xuống dòng**:  Dẫn đến việc Git báo toàn bộ dòng code bị thay đổi định dạng ký tự trắng ẩn.\n3. **Sợ hãi giao diện dòng lệnh (CLI)**:  Cố gắng tìm phần mềm đồ họa ngay từ đầu thay vì rèn luyện bản chất câu lệnh.\n\n---\n\n## 🧪 Lab\n1. Mở terminal và gõ lệnh `git --version` để kiểm tra môi trường.\n2. Xác nhận thông điệp trả về có dạng `git version 2.x.x`.\n3. Thử nghiệm gọi lệnh `git` không có đối số để xem gợi ý sử dụng cơ bản.\n\n---\n\n## 💡 Hint\n> Giao diện dòng lệnh (CLI) là cách nhanh nhất và chính xác nhất để điều khiển Git.\n\n---\n\n## ✅ Validation\n- Lệnh `git --version` thực thi thành công trả về mã thoát 0.\n\n---\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm dưới đây để kiểm tra hiểu biết về cài đặt môi trường Git.\n\n---\n\n## 🔥 Challenge\nGiải thích sự khác nhau giữa ký tự xuống dòng CRLF trên Windows và LF trên Unix/Linux.\n\n---\n\n## 📚 Tổng kết\n- Cài đặt Git CLI là bước đầu tiên để sử dụng Git trên bất kỳ hệ điều hành nào.\n- Git for Windows cung cấp môi trường Git Bash mô phỏng chuẩn dòng lệnh Unix.\n- Cần chú ý thiết lập chuẩn xuống dòng để tránh xung đột định dạng khi làm việc nhóm đa nền tảng.\n",
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
        "explanation": "`git --version` kiểm tra sự tồn tại của file thực thi git trong PATH và in ra số hiệu phiên bản."
      },
      {
        "id": "q2",
        "question": "Git Bash trên hệ điều hành Windows cung cấp môi trường gì cho người dùng?",
        "type": "single",
        "options": [
          {
            "text": "Môi trường giả lập shell Unix cho phép chạy các lệnh bash tiêu chuẩn",
            "correct": true
          },
          {
            "text": "Trình chỉnh sửa ảnh đồ họa chuyên nghiệp cho tệp tin README",
            "correct": false
          },
          {
            "text": "Trình biên dịch mã nguồn Java sang mã máy",
            "correct": false
          },
          {
            "text": "Phần mềm phát video trực tuyến từ YouTube",
            "correct": false
          }
        ],
        "explanation": "Git Bash mang toàn bộ các tiện ích dòng lệnh quen thuộc của Unix (ls, rm, cat, echo) lên Windows."
      },
      {
        "id": "q3",
        "question": "Lỗi \"git: command not found\" thường xuất phát từ nguyên nhân nào?",
        "type": "single",
        "options": [
          {
            "text": "Git chưa được cài đặt hoặc đường dẫn chưa được thêm vào biến môi trường PATH",
            "correct": true
          },
          {
            "text": "Máy tính của bạn chưa cắm dây mạng Internet",
            "correct": false
          },
          {
            "text": "Màn hình máy tính bị thiếu độ phân giải cao",
            "correct": false
          },
          {
            "text": "Bạn chưa tạo tài khoản người dùng trên GitHub",
            "correct": false
          }
        ],
        "explanation": "Lỗi `command not found` xuất hiện khi shell không tìm thấy tệp thực thi git trong các thư mục của biến PATH."
      },
      {
        "id": "q4",
        "question": "Ký tự kết thúc dòng (Line Ending) mặc định trên Windows và Linux lần lượt là gì?",
        "type": "single",
        "options": [
          {
            "text": "Windows dùng CRLF, Linux dùng LF",
            "correct": true
          },
          {
            "text": "Windows dùng LF, Linux dùng CRLF",
            "correct": false
          },
          {
            "text": "Cả hai hệ điều hành đều dùng chung một chuẩn không phân biệt",
            "correct": false
          },
          {
            "text": "Windows dùng XML, Linux dùng JSON",
            "correct": false
          }
        ],
        "explanation": "Windows sử dụng cặp ký tự Carriage Return + Line Feed (CRLF: \\r\\n), trong khi Unix/Linux/macOS dùng Line Feed (LF: \\n)."
      }
    ]
  }
};
export default lesson;
