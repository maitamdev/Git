import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "09-git-init",
  "moduleId": "01-foundations",
  "metadata": {
    "id": "09-git-init",
    "title": "Khởi tạo kho chứa với git init",
    "level": "beginner",
    "duration": 25,
    "xp": 75,
    "prerequisites": [
      "08-repository"
    ],
    "objectives": [
      "Chạy `git init` để bắt đầu quản lý thư mục hiện tại bằng Git.",
      "Dùng `git status` để kiểm tra repository vừa tạo.",
      "Đặt tên nhánh ban đầu khi cần bằng `git init -b main`."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "first-repository"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git init",
      "khoi tao",
      "new repo",
      "initialize",
      "first repository"
    ],
    "commands": [
      "git init",
      "git init -b main",
      "git status"
    ]
  },
  "content": "# Khởi tạo kho chứa với git init\n\n---\n\n## 🎯 Mục tiêu\n- Dùng `git init` để bắt đầu quản lý một thư mục bằng Git.\n- Kiểm tra Git đã tạo repository nhưng chưa lưu commit đầu tiên.\n- Nhận ra tên nhánh ban đầu có thể phụ thuộc cấu hình.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### `git init` — bắt đầu repository\n- **Nói dễ hiểu:** Lệnh tạo dữ liệu nội bộ để Git bắt đầu quản lý thư mục hiện tại.\n- **Ví dụ:** Chạy `git init` trong thư mục bài tập trước khi lưu các mốc thay đổi.\n- **Đừng nhầm:** Lệnh này chưa thêm tệp và chưa tạo commit.\n\n### Initial branch — nhánh ban đầu\n- **Nói dễ hiểu:** Tên nhánh Git chuẩn bị làm điểm bắt đầu cho lịch sử mới.\n- **Ví dụ:** Tên thường gặp là `main`, nhưng có thể đặt tên khác theo cấu hình.\n- **Đừng nhầm:** Tên mặc định không giống nhau ở mọi máy hoặc mọi cấu hình.\n\n### Untracked — chưa được Git theo dõi\n- **Nói dễ hiểu:** Tệp đang nằm trong thư mục dự án nhưng chưa được chọn vào lịch sử Git.\n- **Ví dụ:** README mới tạo có thể hiện là untracked khi chạy `git status`.\n- **Đừng nhầm:** Untracked không có nghĩa tệp bị xóa; tệp vẫn nằm trong thư mục.\n\n### First commit — mốc đầu tiên\n- **Nói dễ hiểu:** Commit đầu tiên bạn chủ động tạo sau khi khởi tạo repository.\n- **Ví dụ:** Sau khi chọn README bằng `git add`, bạn có thể tạo mốc “Tạo README”.\n- **Đừng nhầm:** `git init` chỉ chuẩn bị repository; nó không tự tạo mốc này.\n\n---\n\n## 📖 Định nghĩa\n`git init` bắt đầu quản lý thư mục hiện tại bằng Git và tạo dữ liệu nội bộ trong `.git`. Các tệp có sẵn vẫn ở đó, nhưng chưa tự được lưu vào lịch sử. Git chuẩn bị một nhánh ban đầu; tên của nhánh phụ thuộc cấu hình. Bạn cần chọn tệp và tạo commit riêng để lưu mốc đầu tiên.\n\n---\n\n## 🤔 Tại sao cần?\nThư mục mới chưa có lịch sử Git. `git init` chuẩn bị thư mục để Git có thể theo dõi thay đổi; sau đó bạn sẽ chọn tệp và tạo commit ở bài tiếp theo.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\n`git init` giống như mở một cuốn sổ lịch sử mới cho thư mục. Lệnh tạo phần dữ liệu Git; nó chưa tự ghi các tệp vào commit.\n\n---\n\n## 🖼 Sơ đồ\n```text\nTrước khi chạy git init:                Sau khi chạy git init:\nmy-project/                              my-project/\n├── app.js                               ├── .git/  <── (Vừa được tạo ra!)\n└── style.css                            ├── app.js\n(Thư mục thường)                         (Git sẵn sàng theo dõi)\n                                         Chưa có commit nào\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn có thư mục `bai-tap`. Mở terminal tại đó và chạy `git init`, rồi chạy `git status`. Git đã khởi tạo repository, nhưng chưa có commit; tệp mới có thể được báo là untracked.\n\n---\n\n## 💻 Command\n```bash\ngit init\ngit init -b main\ngit status\n```\n\n---\n\n## 🔍 Giải thích command\n- `git init`: Khởi tạo repository trong thư mục hiện tại; lệnh không tự thêm tệp vào commit.\n- `git init -b main`: Đặt tên nhánh ban đầu là `main`; cấu hình Git cũng có thể quyết định tên mặc định.\n- `git status`: Kiểm tra Git đã nhận repository và xem trạng thái tệp.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Chạy lệnh ở sai thư mục**: Kiểm tra terminal đang mở tại thư mục dự án trước khi khởi tạo.\n2. **Tưởng init đã lưu tệp vào lịch sử**: Bạn còn phải thêm tệp và tạo commit ở bài sau.\n3. **Tạo repository lồng nhau không chủ ý**: Tránh chạy `git init` sâu bên trong repository khác.\n\n---\n\n## 🧪 Lab\n1. Mở terminal tại thư mục bài tập trống hoặc thư mục thực hành.\n2. Chạy `git init`.\n3. Chạy `git status`; xác nhận Git nhận repository và chưa có commit.\n\n---\n\n## 💡 Hint\n> Trước khi chạy init, kiểm tra terminal đang ở đúng thư mục dự án.\n\n---\n\n## ✅ Validation\n- `git status` chạy được trong thư mục vừa khởi tạo và báo chưa có commit.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để kiểm tra hiểu biết về lệnh git init.\n\n---\n\n## 🔥 Challenge\nKhởi tạo repository trong một thư mục thực hành và giải thích vì sao `git status` chưa thể hiện commit nào.\n\n---\n\n## 📚 Tổng kết\n- `git init` tạo dữ liệu Git để bắt đầu quản lý thư mục.\n- Tệp có sẵn không tự được thêm vào lịch sử.\n- Dùng `git status` để kiểm tra repository sau khi khởi tạo.\n",
  "quiz": {
    "id": "quiz-09-git-init",
    "title": "Trắc nghiệm: Khởi tạo kho chứa với git init",
    "questions": [
      {
        "id": "q1",
        "question": "Lệnh nào dùng để khởi tạo một Git repository mới trong thư mục hiện tại?",
        "type": "single",
        "options": [
          {
            "text": "git init",
            "correct": true
          },
          {
            "text": "git start",
            "correct": false
          },
          {
            "text": "git create-repo",
            "correct": false
          },
          {
            "text": "git new",
            "correct": false
          }
        ],
        "explanation": "`git init` bắt đầu quản lý thư mục hiện tại bằng một repository Git."
      },
      {
        "id": "q2",
        "question": "Sau khi chạy lệnh `git init` thành công, thư mục ẩn nào sẽ xuất hiện trong dự án?",
        "type": "single",
        "options": [
          {
            "text": ".git",
            "correct": true
          },
          {
            "text": ".github",
            "correct": false
          },
          {
            "text": ".svn",
            "correct": false
          },
          {
            "text": ".repository",
            "correct": false
          }
        ],
        "explanation": "Git tạo `.git` để bắt đầu giữ dữ liệu nội bộ cho repository mới."
      },
      {
        "id": "q3",
        "question": "Điều gì sẽ xảy ra nếu bạn chạy `git init` trong một thư mục đã có sẵn các tệp mã nguồn HTML và CSS?",
        "type": "single",
        "options": [
          {
            "text": "Các tệp hiện có vẫn còn; Git tạo dữ liệu repository trong `.git`",
            "correct": true
          },
          {
            "text": "Toàn bộ các tệp HTML/CSS sẽ bị xóa sạch để làm mới",
            "correct": false
          },
          {
            "text": "Git sẽ mã hóa các tệp tin và bắt buộc nhập mật khẩu để mở",
            "correct": false
          },
          {
            "text": "Lệnh sẽ báo lỗi và từ chối chạy trên thư mục không rỗng",
            "correct": false
          }
        ],
        "explanation": "Trong thư mục có tệp, `git init` tạo dữ liệu Git mà không xóa các tệp."
      },
      {
        "id": "q4",
        "question": "Cờ tùy chọn nào cho phép bạn chỉ định tên nhánh khởi tạo ban đầu (ví dụ `main`) khi chạy `git init`?",
        "type": "single",
        "options": [
          {
            "text": "-b <tên-nhánh> hoặc --initial-branch=<tên-nhánh>",
            "correct": true
          },
          {
            "text": "--name=<tên-nhánh>",
            "correct": false
          },
          {
            "text": "--set-branch-first",
            "correct": false
          },
          {
            "text": "-m <tên-nhánh>",
            "correct": false
          }
        ],
        "explanation": "`-b main` đặt tên nhánh ban đầu là main khi tạo repository."
      }
    ]
  }
};
export default lesson;
