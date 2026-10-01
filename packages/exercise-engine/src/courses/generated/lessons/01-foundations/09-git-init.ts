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
  "content": "# Khởi tạo kho chứa với git init\n\n---\n\n## 🎯 Mục tiêu\n- Dùng `git init` để bắt đầu quản lý một thư mục bằng Git.\n- Kiểm tra Git đã tạo repository nhưng chưa lưu commit đầu tiên.\n- Nhận ra tên nhánh ban đầu có thể phụ thuộc cấu hình.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### `git init` — bắt đầu repository\n- **Nói dễ hiểu:** Lệnh tạo dữ liệu nội bộ để Git bắt đầu quản lý thư mục hiện tại.\n- **Ví dụ:** Chạy `git init` trong thư mục bài tập trước khi lưu các mốc thay đổi.\n- **Đừng nhầm:** Lệnh này chưa thêm tệp và chưa tạo commit.\n\n### Initial branch — nhánh ban đầu\n- **Nói dễ hiểu:** Tên Git chuẩn bị dùng làm điểm bắt đầu cho dòng lịch sử mới.\n- **Ví dụ:** Tên thường gặp là `main`, nhưng có thể đặt tên khác theo cấu hình.\n- **Đừng nhầm:** `git init` không phải lúc nào cũng đặt tên `main`; tên mặc định phụ thuộc cấu hình.\n\n### Untracked — chưa được Git theo dõi\n- **Nói dễ hiểu:** Tệp nằm trong thư mục dự án nhưng Git chưa được yêu cầu theo dõi nó.\n- **Ví dụ:** README mới tạo có thể hiện là untracked khi chạy `git status`.\n- **Đừng nhầm:** Untracked không có nghĩa tệp bị xóa; tệp vẫn nằm trong thư mục và có thể được chọn sau.\n\n### First commit — mốc đầu tiên\n- **Nói dễ hiểu:** Commit đầu tiên bạn chủ động tạo sau khi khởi tạo repository.\n- **Ví dụ:** Sau khi chọn những tệp cần lưu, bạn có thể tạo mốc “Tạo README”.\n- **Đừng nhầm:** `git init` chỉ chuẩn bị repository; chọn tệp và tạo commit sẽ học ở các bài sau.\n\n---\n\n## 📖 Định nghĩa\n`git init` bắt đầu quản lý thư mục hiện tại bằng Git và tạo dữ liệu nội bộ trong `.git`. Các tệp có sẵn vẫn ở đó, nhưng chưa tự được lưu vào lịch sử. Git chuẩn bị một nhánh ban đầu; tên của nhánh phụ thuộc cấu hình. Bạn cần chọn tệp và tạo commit riêng để lưu mốc đầu tiên.\n\n---\n\n## 🤔 Tại sao cần?\nThư mục mới chưa có lịch sử Git. `git init` chuẩn bị thư mục để Git có thể theo dõi thay đổi; sau đó bạn sẽ chọn tệp và tạo commit ở bài tiếp theo.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\n`git init` giống như mở một cuốn sổ lịch sử mới cho thư mục. Lệnh tạo phần dữ liệu Git; nó chưa tự ghi các tệp vào commit.\n\n---\n\n## 🖼 Sơ đồ\n```text\nTrước khi chạy git init:                Sau khi chạy git init:\nmy-project/                              my-project/\n├── app.js                               ├── .git/  <── (Vừa được tạo ra!)\n└── style.css                            ├── app.js\n(Thư mục thường)                         (Git sẵn sàng theo dõi)\n                                         Chưa có commit nào\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn có thư mục `bai-tap`. Mở terminal tại đó và chạy `git init`, rồi chạy `git status`. Git đã khởi tạo repository, nhưng chưa có commit; tệp mới có thể được báo là untracked.\n\n---\n\n## 💻 Command\n```bash\ngit init\ngit init -b main\ngit status\n```\n\n---\n\n## 🔍 Giải thích command\n- `git init`: Khởi tạo repository trong thư mục hiện tại; lệnh không tự thêm tệp vào commit.\n- `git init -b main`: Trên phiên bản Git hỗ trợ tùy chọn này, đặt tên nhánh ban đầu là `main` cho repository mới.\n- `git status`: Kiểm tra Git đã nhận repository và xem trạng thái tệp.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Chạy lệnh ở sai thư mục**: Kiểm tra terminal đang mở tại thư mục dự án trước khi khởi tạo.\n2. **Tưởng init đã lưu tệp vào lịch sử**: Bạn còn phải thêm tệp và tạo commit ở bài sau.\n3. **Tạo repository lồng nhau không chủ ý**: Tránh chạy `git init` sâu bên trong repository khác.\n\n---\n\n## 🧪 Lab\n1. Trong terminal mô phỏng, chạy `git init` tại thư mục dự án đang dùng. Nếu hiện thông báo repository đã được khởi tạo trước đó, đó là kết quả bình thường.\n2. Chạy `git status`; xác nhận Git nhận repository và xem tệp nào còn untracked.\n3. Khi tạo repository mới trên máy thật và muốn chọn `main` ngay từ đầu, dùng `git init -b main` thay cho `git init` nếu phiên bản Git hỗ trợ.\n\n---\n\n## 💡 Hint\n> Trước khi chạy init, kiểm tra terminal đang ở đúng thư mục dự án.\n\n---\n\n## ✅ Validation\n- `git status` chạy được trong thư mục vừa khởi tạo và báo chưa có commit.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để kiểm tra hiểu biết về lệnh git init.\n\n---\n\n## 🔥 Challenge\nKhởi tạo repository trong một thư mục thực hành và giải thích vì sao `git status` chưa thể hiện commit nào.\n\n---\n\n## 📚 Tổng kết\n- `git init` tạo dữ liệu Git để bắt đầu quản lý thư mục; chạy lại trong repository thường không xóa tệp.\n- Tệp có sẵn không tự được thêm vào lịch sử.\n- Dùng `git status` để kiểm tra repository sau khi khởi tạo.\n",
  "quiz": {
    "id": "quiz-09-git-init",
    "title": "Trắc nghiệm: Khởi tạo repository với git init",
    "questions": [
      {
        "id": "q1",
        "question": "Lệnh nào bắt đầu quản lý thư mục hiện tại bằng Git?",
        "type": "single",
        "options": [
          {
            "text": "`git init`",
            "correct": true
          },
          {
            "text": "`git status`",
            "correct": false
          },
          {
            "text": "`git add .`",
            "correct": false
          },
          {
            "text": "`git log`",
            "correct": false
          }
        ],
        "explanation": "`git init` tạo dữ liệu nội bộ để Git bắt đầu quản lý thư mục. Lệnh này chưa thêm tệp hoặc tạo commit."
      },
      {
        "id": "q2",
        "question": "Trong một repository Git thông thường, thư mục nào được tạo khi chạy `git init`?",
        "type": "single",
        "options": [
          {
            "text": "`.git`",
            "correct": true
          },
          {
            "text": "`.github`",
            "correct": false
          },
          {
            "text": "`.repository`",
            "correct": false
          },
          {
            "text": "`node_modules`",
            "correct": false
          }
        ],
        "explanation": "`git init` tạo `.git` để chứa dữ liệu cần cho repository. Tệp dự án có sẵn vẫn nằm trong thư mục của chúng."
      },
      {
        "id": "q3",
        "question": "Bạn chạy `git init` trong thư mục đã có các tệp HTML và CSS. Điều gì xảy ra?",
        "type": "single",
        "options": [
          {
            "text": "Các tệp vẫn còn; Git tạo dữ liệu repository trong `.git`",
            "correct": true
          },
          {
            "text": "Git xóa các tệp để bắt đầu một dự án trống",
            "correct": false
          },
          {
            "text": "Git tự thêm mọi tệp vào commit đầu tiên",
            "correct": false
          },
          {
            "text": "Git chỉ chạy được nếu thư mục ban đầu trống",
            "correct": false
          }
        ],
        "explanation": "`git init` không xóa các tệp đang có và không tự lưu chúng. Lệnh chỉ chuẩn bị dữ liệu Git để bắt đầu quản lý thư mục."
      },
      {
        "id": "q4",
        "question": "Trên phiên bản Git hỗ trợ tùy chọn này, lệnh nào chọn `main` làm nhánh ban đầu?",
        "type": "single",
        "options": [
          {
            "text": "`git init -b main`",
            "correct": true
          },
          {
            "text": "`git init --name main`",
            "correct": false
          },
          {
            "text": "`git status --branch main`",
            "correct": false
          },
          {
            "text": "`git branch --initial main`",
            "correct": false
          }
        ],
        "explanation": "`git init -b main` yêu cầu Git dùng `main` làm tên nhánh ban đầu. Tên mặc định nếu bỏ tùy chọn có thể phụ thuộc cấu hình."
      },
      {
        "id": "q5",
        "question": "Ngay sau khi chạy `git init`, các tệp dự án có tự nằm trong lịch sử chưa?",
        "type": "single",
        "options": [
          {
            "text": "Chưa; bạn còn phải chọn tệp và tạo commit ở các bước sau",
            "correct": true
          },
          {
            "text": "Có; `git init` tự tạo commit đầu tiên",
            "correct": false
          },
          {
            "text": "Có; mọi tệp tự được gửi lên GitHub",
            "correct": false
          },
          {
            "text": "Chưa; `git init` xóa tệp và chỉ giữ tên thư mục",
            "correct": false
          }
        ],
        "explanation": "`git init` chuẩn bị repository nhưng không tạo commit đầu tiên. Bạn sẽ học cách chọn tệp và lưu commit ở Level 2."
      }
    ]
  }
};
export default lesson;
