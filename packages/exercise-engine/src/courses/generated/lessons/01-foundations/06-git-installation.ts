import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "06-git-installation",
  "moduleId": "01-foundations",
  "metadata": {
    "id": "06-git-installation",
    "title": "Cài đặt Git và chọn terminal",
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
  "content": "# Cài đặt Git và chọn terminal\n\n---\n\n## 🎯 Mục tiêu\n- Tìm hướng dẫn cài Git phù hợp với hệ điều hành của mình.\n- Mở terminal trên máy thật và kiểm tra Git bằng `git --version`.\n- Phân biệt terminal mô phỏng trong khóa học với Git cài trên máy cá nhân.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Terminal — cửa sổ nhập lệnh\n- **Nói dễ hiểu:** Ứng dụng cho phép bạn gõ lệnh để yêu cầu máy tính làm việc.\n- **Ví dụ:** PowerShell trên Windows hoặc Terminal trên macOS/Linux.\n- **Đừng nhầm:** Terminal nhận lệnh; Git là chương trình được gọi từ terminal.\n\n### CLI (Command-Line Interface) — giao diện dòng lệnh\n- **Nói dễ hiểu:** Cách điều khiển chương trình bằng cách nhập câu lệnh thay vì chỉ bấm nút.\n- **Ví dụ:** Gõ `git --version` trong terminal để yêu cầu Git in phiên bản.\n- **Đừng nhầm:** CLI là cách tương tác; nó không phải một terminal riêng hay một tài khoản.\n\n### Git Bash — terminal đi kèm Git for Windows\n- **Nói dễ hiểu:** Ứng dụng trên Windows cung cấp giao diện dòng lệnh quen thuộc cho Git.\n- **Ví dụ:** Mở Git Bash rồi gõ một lệnh Git.\n- **Đừng nhầm:** Bạn không bắt buộc dùng Git Bash; PowerShell cũng chạy Git khi cài đặt đã cấu hình đúng.\n\n### PATH — nơi hệ điều hành tìm chương trình\n- **Nói dễ hiểu:** Thiết lập giúp terminal tìm được chương trình khi bạn gõ tên lệnh.\n- **Ví dụ:** Nếu terminal không nhận `git`, Git có thể chưa cài hoặc chưa được tìm thấy qua PATH.\n- **Đừng nhầm:** PATH không phải thư mục dự án và không chứa lịch sử Git.\n\n---\n\n## 🤔 Tại sao cần?\nTrước khi dùng Git trên máy của mình, bạn cần cài chương trình và mở được nó từ terminal. Nếu `git --version` in ra phiên bản, terminal đã gọi được Git. Nếu lệnh báo không nhận diện, bạn biết cần kiểm tra cài đặt hoặc PATH trước khi học các lệnh khác.\n\n---\n\n## 📖 Định nghĩa\nCài Git nghĩa là đưa chương trình Git vào máy để terminal có thể chạy lệnh `git`. Hướng dẫn chính thức nằm tại [git-scm.com/install](https://git-scm.com/install); chọn Windows, macOS hoặc Linux rồi làm theo bước dành cho hệ điều hành của bạn. Sau khi cài, mở một terminal mới và chạy `git --version` để kiểm tra.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nGit là chương trình; terminal là nơi bạn yêu cầu chương trình chạy. PATH giống danh sách địa chỉ giúp hệ điều hành tìm chương trình Git khi bạn gõ lệnh.\n\n---\n\n## 🖼 Sơ đồ\n```text\nBạn nhập lệnh trong terminal\n          │\n          ▼\nHệ điều hành tìm chương trình Git qua PATH\n          │\n          ▼\nGit chạy và in kết quả về terminal\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrên Windows, cài Git for Windows rồi mở PowerShell mới. Trên macOS hoặc Linux, làm theo lựa chọn cài đặt của hệ điều hành trên trang chính thức. Chạy `git --version`: nếu có dòng phiên bản, Git đã chạy được trong terminal bạn vừa dùng.\n\n---\n\n## 💻 Command\n```bash\ngit --version\n```\n\n---\n\n## 🔍 Giải thích command\n`git --version` in phiên bản của Git đang chạy. Trong terminal máy thật, kết quả kiểm tra Git đã cài trên máy đó; trong terminal mô phỏng của Git Academy, kết quả chỉ nói về môi trường mô phỏng và không cài Git vào máy cá nhân.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Cài Git nhưng tiếp tục dùng terminal cũ:** Mở terminal mới rồi chạy lại lệnh kiểm tra.\n2. **Tưởng bắt buộc phải dùng Git Bash:** PowerShell cũng dùng được nếu Git for Windows đã được thêm vào PATH.\n3. **Nghĩ terminal mô phỏng đã cài Git lên máy thật:** Mô phỏng chỉ giúp luyện lệnh; cài đặt thật cần làm trên hệ điều hành của bạn.\n\n---\n\n## 🧪 Lab\n1. Xác định máy bạn đang dùng Windows, macOS hay Linux.\n2. Mở [hướng dẫn cài Git chính thức](https://git-scm.com/install), chọn hệ điều hành và làm theo các bước cài đặt.\n3. Mở terminal mới trên máy thật, chạy `git --version` và ghi lại kết quả.\n4. Nếu báo không nhận diện lệnh, kiểm tra Git đã cài xong chưa, rồi mở terminal mới trước khi đổi PATH.\n\n---\n\n## 💡 Hint\nNếu lệnh không chạy sau khi cài, hãy mở terminal mới trước. Trong terminal mô phỏng, kết quả chỉ xác nhận môi trường học đang mô phỏng Git.\n\n---\n\n## ✅ Validation\n- Trên máy thật, terminal bạn chọn in ra phiên bản Git mà không báo lỗi.\n- Nói đúng rằng Git Bash là một lựa chọn trên Windows, không phải lựa chọn duy nhất.\n\n---\n\n## ❓ Quiz\nTrả lời các câu hỏi sau. Khi sai, đọc lời giải thích rồi thử lại.\n\n---\n\n## 🔥 Challenge\nNếu dùng Windows, mở PowerShell và Git Bash rồi chạy `git --version` ở cả hai. Nêu terminal nào bạn muốn dùng cho các bài sau.\n\n---\n\n## 📚 Tổng kết\n- Cài Git trên máy thật rồi mở terminal mới.\n- `git --version` kiểm tra chương trình Git mà terminal đang gọi.\n- Git Bash là một lựa chọn; PowerShell cũng chạy được Git khi PATH đã đúng.\n",
  "quiz": {
    "id": "quiz-06-git-installation",
    "title": "Trắc nghiệm: Cài đặt Git và môi trường terminal",
    "questions": [
      {
        "id": "q1",
        "question": "Lệnh nào in ra phiên bản Git mà terminal đang gọi?",
        "type": "single",
        "options": [
          {
            "text": "`git --version`",
            "correct": true
          },
          {
            "text": "`git status`",
            "correct": false
          },
          {
            "text": "`git add`",
            "correct": false
          },
          {
            "text": "`git config --list`",
            "correct": false
          }
        ],
        "explanation": "`git --version` in số phiên bản của chương trình Git đang chạy. Lệnh này không xem trạng thái tệp hay cấu hình repository."
      },
      {
        "id": "q2",
        "question": "Trên Windows, điều nào đúng về Git Bash và PowerShell?",
        "type": "single",
        "options": [
          {
            "text": "Cả hai có thể chạy Git nếu Git đã được cài và terminal tìm thấy chương trình",
            "correct": true
          },
          {
            "text": "Git chỉ chạy được trong Git Bash",
            "correct": false
          },
          {
            "text": "PowerShell chỉ chạy GitHub, không thể gọi Git",
            "correct": false
          },
          {
            "text": "Cài Git for Windows sẽ vô hiệu hóa PowerShell",
            "correct": false
          }
        ],
        "explanation": "Git Bash đi kèm Git for Windows, nhưng PowerShell cũng chạy Git khi cài đặt đã cấu hình PATH phù hợp."
      },
      {
        "id": "q3",
        "question": "Terminal mới báo không nhận diện `git`. Bước kiểm tra nào hợp lý trước?",
        "type": "single",
        "options": [
          {
            "text": "Xác nhận đã cài Git, rồi mở terminal mới và kiểm tra PATH",
            "correct": true
          },
          {
            "text": "Xóa thư mục dự án để Git xuất hiện",
            "correct": false
          },
          {
            "text": "Tạo tài khoản GitHub mới trước khi cài Git",
            "correct": false
          },
          {
            "text": "Đổi tên tệp README để hệ điều hành tìm thấy lệnh",
            "correct": false
          }
        ],
        "explanation": "Terminal không tìm thấy chương trình có thể do Git chưa cài hoặc PATH chưa cập nhật; mở terminal mới sau khi cài là bước an toàn đầu tiên."
      },
      {
        "id": "q4",
        "question": "Bạn chạy `git --version` trong terminal mô phỏng của Git Academy. Kết quả nói lên điều gì?",
        "type": "single",
        "options": [
          {
            "text": "Phiên bản mô phỏng, không xác nhận Git đã cài trên máy cá nhân",
            "correct": true
          },
          {
            "text": "Git đã được cài vào Windows hoặc macOS của bạn",
            "correct": false
          },
          {
            "text": "Máy cá nhân đã kết nối với GitHub",
            "correct": false
          },
          {
            "text": "Repository hiện tại đã có commit đầu tiên",
            "correct": false
          }
        ],
        "explanation": "Terminal trong khóa học chạy trong trình duyệt và mô phỏng Git. Muốn kiểm tra máy thật, chạy lệnh trong terminal của máy đó."
      },
      {
        "id": "q5",
        "question": "Bạn nên tìm hướng dẫn cài Git cho máy của mình ở đâu?",
        "type": "single",
        "options": [
          {
            "text": "Trang cài đặt chính thức `git-scm.com/install`",
            "correct": true
          },
          {
            "text": "Một bản cài đặt bất kỳ được gửi trong tin nhắn lạ",
            "correct": false
          },
          {
            "text": "Trang GitHub của một dự án không liên quan",
            "correct": false
          },
          {
            "text": "Bên trong thư mục `.git` của bài tập",
            "correct": false
          }
        ],
        "explanation": "Trang chính thức cung cấp hướng dẫn theo Windows, macOS và Linux. Chọn đúng hệ điều hành để tránh tải nhầm gói cài đặt."
      }
    ]
  }
};
export default lesson;
