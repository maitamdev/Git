import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "07-git-config",
  "moduleId": "01-foundations",
  "metadata": {
    "id": "07-git-config",
    "title": "Cấu hình danh tính Git Config",
    "level": "beginner",
    "duration": 25,
    "xp": 70,
    "prerequisites": [
      "06-git-installation"
    ],
    "objectives": [
      "Đặt tên và email để Git ghi vào các commit mới.",
      "Dùng phạm vi global cho cấu hình mặc định của tài khoản máy tính.",
      "Xem lại cấu hình đang có bằng `git config --list`."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git config",
      "user.name",
      "user.email",
      "danh tinh",
      "author"
    ],
    "commands": [
      "git config --global user.name \"Student Name\"",
      "git config --global user.email \"student@example.com\"",
      "git config --list"
    ]
  },
  "content": "# Cấu hình danh tính Git Config\n\n---\n\n## 🎯 Mục tiêu\n- Đặt `user.name` và `user.email` để Git ghi thông tin vào commit mới.\n- Phân biệt cấu hình cho tài khoản của mình với cấu hình riêng của một repository.\n- Xem lại cấu hình Git đang áp dụng trên máy.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### `git config` — lệnh xem và đặt cấu hình\n- **Nói dễ hiểu:** Lệnh quản lý các lựa chọn mà Git dùng khi hoạt động.\n- **Ví dụ:** `git config --global user.name \"An Nguyen\"` đặt tên dùng chung cho các repository của bạn.\n- **Đừng nhầm:** Cấu hình Git không phải mật khẩu đăng nhập GitHub.\n\n### `user.name` — tên ghi trong commit\n- **Nói dễ hiểu:** Tên Git gắn vào commit do bạn tạo.\n- **Ví dụ:** Commit có thể hiện tên “An Nguyen”.\n- **Đừng nhầm:** Đây là thông tin do người dùng cấu hình, không phải bằng chứng xác thực danh tính.\n\n### `user.email` — email ghi trong commit\n- **Nói dễ hiểu:** Địa chỉ email Git gắn vào commit do bạn tạo.\n- **Ví dụ:** Commit chứa tên và email cấu hình tại thời điểm tạo.\n- **Đừng nhầm:** Email này không tự đăng nhập hoặc cấp quyền trên GitHub.\n\n### `--global` — cấu hình cho tài khoản máy tính\n- **Nói dễ hiểu:** Áp dụng giá trị cho các repository bạn dùng dưới tài khoản máy tính này.\n- **Ví dụ:** Đặt tên một lần để dùng trong nhiều dự án cá nhân.\n- **Đừng nhầm:** Global không có nghĩa là chia sẻ cấu hình lên Internet.\n\n### `--local` và `--system` — phạm vi hẹp hơn hoặc rộng hơn\n- **Nói dễ hiểu:** `--local` chỉ áp dụng cho repository hiện tại; `--system` áp dụng cho mọi người dùng trên máy.\n- **Ví dụ:** Dùng `--local` nếu một dự án cần tên tác giả riêng.\n- **Đừng nhầm:** Giá trị ở repository thường ghi đè giá trị global; system là mức toàn máy.\n\n---\n\n## 📖 Định nghĩa\n`git config` xem hoặc thay đổi các giá trị Git sử dụng. Hai giá trị thường cần đặt trước khi tạo commit là `user.name` và `user.email`; Git ghi chúng vào thông tin tác giả của commit. Cấu hình có các phạm vi: system cho máy, global cho tài khoản máy tính và local cho repository hiện tại. Giá trị local thường ưu tiên hơn global.\n\n---\n\n## 🤔 Tại sao cần?\nKhi tạo commit, Git ghi thông tin tác giả vào mốc đó. Cấu hình giúp bạn đặt trước tên và email sẽ dùng. Đây là nhãn trong lịch sử dự án, không phải tài khoản hay mật khẩu đăng nhập.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy nghĩ mỗi commit như một dòng trong nhật ký dự án. `user.name` và `user.email` là thông tin tác giả được ghi kèm dòng đó.\n\n---\n\n## 🖼 Sơ đồ\n```text\nMáy tính           → --system (mọi người dùng trên máy)\nTài khoản máy bạn  → --global (mặc định cho bạn)\nRepository này     → --local (chỉ dự án hiện tại)\n\nNếu cùng một mục được đặt nhiều lần, giá trị local thường được ưu tiên.\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn dùng email cá nhân làm mặc định cho bài tập. Một dự án riêng có thể đặt email khác bằng `--local`; giá trị đó chỉ áp dụng trong repository ấy.\n\n---\n\n## 💻 Command\n```bash\ngit config --global user.name \"Nguyen Van A\"\ngit config --global user.email \"vana@example.com\"\ngit config --list\n```\n\n---\n\n## 🔍 Giải thích command\n- `git config --global user.name \"Student Name\"`: Đặt tên mặc định cho commit trong các repository của tài khoản máy tính này.\n- `git config --global user.email \"student@example.com\"`: Đặt email mặc định sẽ được ghi vào commit.\n- `git config --list`: Xem các giá trị cấu hình Git đang có.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nhầm email tác giả với mật khẩu**: `user.email` không cấp quyền đăng nhập GitHub.\n2. **Dùng cấu hình local khi chưa ở trong repository**: Dùng `--global` để đặt mặc định cho mình.\n3. **Không xem lại giá trị đã đặt**: Chạy `git config --list` để kiểm tra.\n\n---\n\n## 🧪 Lab\n1. Chạy lệnh đầu với tên của bạn thay cho `Nguyen Van A`.\n2. Chạy lệnh thứ hai với email bạn muốn ghi vào commit.\n3. Chạy `git config --list` và kiểm tra hai giá trị.\n\n---\n\n## 💡 Hint\n> Dùng `--global` để đặt giá trị mặc định cho các repository của tài khoản máy tính này.\n\n---\n\n## ✅ Validation\n- `git config --list` hiển thị đúng `user.name` và `user.email` bạn vừa đặt.\n\n---\n\n## ❓ Quiz\nHãy thực hiện bài trắc nghiệm sau về cách sử dụng lệnh git config.\n\n---\n\n## 🔥 Challenge\nNêu thứ tự ưu tiên ghi đè giữa 3 cấp độ: --system, --global và --local.\n\n---\n\n## 📚 Tổng kết\n- `user.name` và `user.email` là thông tin tác giả được ghi trong commit mới.\n- `--global` đặt giá trị mặc định cho tài khoản máy tính của bạn.\n- `git config --list` giúp kiểm tra các giá trị đang có.\n",
  "quiz": {
    "id": "quiz-07-git-config",
    "title": "Trắc nghiệm: Cấu hình danh tính với git config",
    "questions": [
      {
        "id": "q1",
        "question": "Cặp thông tin nào Git thường ghi vào commit để nhận biết tác giả?",
        "type": "single",
        "options": [
          {
            "text": "user.name và user.email",
            "correct": true
          },
          {
            "text": "user.password và user.token",
            "correct": false
          },
          {
            "text": "system.port và network.ip",
            "correct": false
          },
          {
            "text": "github.username và github.apikey",
            "correct": false
          }
        ],
        "explanation": "Git lưu `user.name` và `user.email` trong thông tin tác giả của commit."
      },
      {
        "id": "q2",
        "question": "Cấp độ cấu hình nào có độ ưu tiên cao nhất trong Git?",
        "type": "single",
        "options": [
          {
            "text": "--local (Cấu hình riêng trong repository hiện tại)",
            "correct": true
          },
          {
            "text": "--global (Cấu hình cho toàn bộ tài khoản người dùng)",
            "correct": false
          },
          {
            "text": "--system (Cấu hình cho toàn bộ máy tính)",
            "correct": false
          },
          {
            "text": "Tất cả các cấp độ đều có độ ưu tiên ngang nhau",
            "correct": false
          }
        ],
        "explanation": "Giá trị local áp dụng riêng trong repository và ghi đè giá trị global."
      },
      {
        "id": "q3",
        "question": "Lệnh nào liệt kê các thiết lập cấu hình Git hiện có?",
        "type": "single",
        "options": [
          {
            "text": "git config --list",
            "correct": true
          },
          {
            "text": "git show-config-all",
            "correct": false
          },
          {
            "text": "git config --print-screen",
            "correct": false
          },
          {
            "text": "git status --config",
            "correct": false
          }
        ],
        "explanation": "`git config --list` liệt kê các cặp tên và giá trị cấu hình Git hiện có."
      },
      {
        "id": "q4",
        "question": "`user.email` trong Git config có phải mật khẩu đăng nhập GitHub không?",
        "type": "single",
        "options": [
          {
            "text": "Không, đây là email gắn vào thông tin tác giả của commit",
            "correct": true
          },
          {
            "text": "Có, đây là mật khẩu GitHub đã mã hóa",
            "correct": false
          },
          {
            "text": "Có, đây là mã xác nhận push code",
            "correct": false
          },
          {
            "text": "Không, đây là địa chỉ của remote",
            "correct": false
          }
        ],
        "explanation": "Email chỉ là thông tin tác giả trong commit; nó không cấp quyền đăng nhập."
      }
    ]
  }
};
export default lesson;
