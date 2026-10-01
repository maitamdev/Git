import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "01-working-directory",
  "moduleId": "02-git-basics",
  "metadata": {
    "id": "01-working-directory",
    "title": "Working Directory (Thư mục làm việc)",
    "level": "beginner",
    "duration": 20,
    "xp": 60,
    "prerequisites": [
      "09-git-init"
    ],
    "objectives": [
      "Chỉ ra thư mục làm việc và biết nơi mình sửa tệp.",
      "Phân biệt tệp Git đã theo dõi với tệp mới chưa được theo dõi.",
      "Dùng git status để xem những tệp đó."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "working directory",
      "working tree",
      "thu muc lam viec",
      "untracked",
      "khu vuc git"
    ],
    "commands": [
      "git status"
    ]
  },
  "content": "# Working Directory (Thư mục làm việc)\n\n---\n\n## 🎯 Mục tiêu\n- Chỉ ra nơi bạn mở và sửa tệp của dự án.\n- Phân biệt một tệp Git đã biết với tệp mới chưa được theo dõi.\n- Dùng `git status` để xem trạng thái của các tệp.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Working Directory — thư mục làm việc\n- **Nói dễ hiểu:** Các tệp dự án trên máy mà bạn mở và sửa.\n- **Ví dụ:** Tệp `index.html` đang mở trong trình soạn thảo thuộc thư mục làm việc.\n- **Đừng nhầm:** Sửa tệp ở đây chưa tự tạo một commit trong lịch sử.\n\n### Tracked — đã được Git theo dõi\n- **Nói dễ hiểu:** Tệp Git đã được yêu cầu quản lý và sẽ báo khi nội dung thay đổi.\n- **Ví dụ:** README đã được lưu trong một commit trước đó là tracked.\n- **Đừng nhầm:** Tracked không có nghĩa mọi lần sửa mới đã được lưu thành commit.\n\n### Modified — đã sửa\n- **Nói dễ hiểu:** Tệp tracked có nội dung khác với mốc đã lưu gần nhất.\n- **Ví dụ:** Bạn sửa README đã có trong commit; `git status` báo tệp là modified.\n- **Đừng nhầm:** Modified cho biết nội dung đang đổi, không có nghĩa đã tạo commit mới.\n\n### Untracked — chưa được Git theo dõi\n- **Nói dễ hiểu:** Tệp đang có trong thư mục dự án nhưng Git chưa được yêu cầu quản lý.\n- **Ví dụ:** Bạn tạo `note.txt` mới rồi chạy `git status`; Git báo tệp chưa được theo dõi.\n- **Đừng nhầm:** Untracked không có nghĩa tệp bị xóa; tệp vẫn nằm trong thư mục dự án.\n\n---\n\n## 🤔 Tại sao cần?\nKhi làm dự án, bạn thường tạo tệp mới hoặc sửa tệp có sẵn. Trước khi học cách chọn và lưu thay đổi, hãy dùng `git status` để biết Git đang nhận diện các tệp đó ra sao. Nhờ vậy, bạn không nhầm một tệp chưa được theo dõi với tệp đã mất.\n\n---\n\n## 📖 Định nghĩa\nWorking Directory, còn gọi là Working Tree, là các tệp dự án bạn đang mở và sửa. `git status` báo tình trạng các tệp trong thư mục đó. Tệp mới chưa được Git biết thường hiện là Untracked; nội dung của nó vẫn còn trên máy.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy xem Working Directory như chiếc bàn bạn đang làm bài. Một tệp mới vẫn nằm trên bàn dù Git chưa theo dõi nó. `git status` giống như danh sách kiểm tra cho biết tệp nào đang mới hoặc đã sửa.\n\n---\n\n## 🖼 Sơ đồ\n```text\nThư mục dự án — Working Directory\n├── README.md   Git đã biết tệp này; nếu vừa sửa thì Modified\n└── note.txt    Tệp mới, Git chưa theo dõi (Untracked)\n\ngit status chỉ báo tình trạng; lệnh không thêm tệp hay tạo commit.\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn tạo `note.txt` để ghi ý tưởng cho dự án. Tệp đã có trong thư mục dù chưa nằm trong lịch sử Git. Chạy `git status` để thấy Git báo tệp mới là Untracked.\n\n---\n\n## 💻 Command\n```bash\ngit status\n```\n\n---\n\n## 🔍 Giải thích command\n`git status` cho biết tệp nào mới hoặc đã sửa trong repository hiện tại. Lệnh chỉ đọc trạng thái; nó không thay đổi tệp và không tạo commit.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ lưu trong trình soạn thảo là đã tạo commit:** Lưu tệp cập nhật Working Directory, không tự ghi mốc vào lịch sử.\n2. **Nghĩ Untracked có nghĩa tệp bị mất:** Tệp vẫn nằm trong thư mục; Git chỉ chưa được yêu cầu theo dõi.\n3. **Nghĩ `git status` tự sửa trạng thái:** Lệnh chỉ báo tình trạng hiện tại, không thêm hoặc lưu tệp.\n\n---\n\n## 🧪 Lab\n1. Trong bảng tệp của terminal mô phỏng, tạo tệp mới tên `note.txt` và nhập một dòng ghi chú.\n2. Chạy `git status`.\n3. Tìm `note.txt` dưới mục Untracked files và xác nhận tệp vẫn còn trong bảng tệp.\n\n---\n\n## 💡 Hint\nNếu vừa tạo tệp mới, hãy tìm mục **Untracked files** trong kết quả `git status`.\n\n---\n\n## ✅ Validation\n- Tạo được `note.txt` trong dự án.\n- `git status` báo tệp mới là Untracked.\n- Giải thích được tệp vẫn còn trong Working Directory dù Git chưa theo dõi.\n\n---\n\n## ❓ Quiz\nTrả lời các câu hỏi sau. Khi sai, đọc lời giải thích rồi thử lại.\n\n---\n\n## 🔥 Challenge\nTạo thêm `todo.txt`. Trước khi chạy `git status`, dự đoán tệp sẽ xuất hiện ở mục nào rồi kiểm tra dự đoán.\n\n---\n\n## 📚 Tổng kết\n- Working Directory là các tệp dự án bạn mở và sửa.\n- Tệp mới chưa được theo dõi thường hiện là Untracked.\n- `git status` báo tình trạng, không tự lưu commit.\n",
  "quiz": {
    "id": "quiz-02-01-working-directory",
    "title": "Trắc nghiệm: Working Directory và trạng thái tệp",
    "questions": [
      {
        "id": "q1",
        "question": "Working Directory (còn gọi là Working Tree) là phần nào?",
        "type": "single",
        "options": [
          {
            "text": "Các tệp dự án bạn đang mở và sửa",
            "correct": true
          },
          {
            "text": "Danh sách mọi commit đã lưu trong lịch sử",
            "correct": false
          },
          {
            "text": "Bản sao repository đang nằm trên máy chủ",
            "correct": false
          },
          {
            "text": "Thiết lập chung dùng để cài đặt Git",
            "correct": false
          }
        ],
        "explanation": "Working Directory là các tệp hiện có để bạn làm việc. Commit đã lưu và cấu hình Git là những phần khác nhau."
      },
      {
        "id": "q2",
        "question": "Bạn tạo `note.txt` mới trong dự án rồi chạy `git status`. Tệp thường hiện ở trạng thái nào?",
        "type": "single",
        "options": [
          {
            "text": "Untracked, vì Git chưa được yêu cầu theo dõi tệp mới",
            "correct": true
          },
          {
            "text": "Committed, vì lưu tệp tự tạo commit",
            "correct": false
          },
          {
            "text": "Modified, vì mọi tệp mới đều đã được theo dõi",
            "correct": false
          },
          {
            "text": "Deleted, vì Git chưa nhận diện tệp",
            "correct": false
          }
        ],
        "explanation": "Tệp mới thường là Untracked cho tới khi bạn yêu cầu Git theo dõi. Tệp vẫn nằm trong dự án và chưa bị xóa."
      },
      {
        "id": "q3",
        "question": "Bạn sửa README đã có trong một commit rồi lưu tệp. Git thường báo trạng thái nào?",
        "type": "single",
        "options": [
          {
            "text": "Modified, vì nội dung khác với mốc đã lưu",
            "correct": true
          },
          {
            "text": "Untracked, vì mọi lần sửa đều tạo một tệp mới",
            "correct": false
          },
          {
            "text": "Committed, vì nút Save tự lưu lịch sử Git",
            "correct": false
          },
          {
            "text": "Deleted, vì nội dung cũ đã thay đổi",
            "correct": false
          }
        ],
        "explanation": "README đã được Git theo dõi nên thay đổi hiện ra là Modified. Lưu trong trình soạn thảo chưa tự tạo một commit."
      },
      {
        "id": "q4",
        "question": "Lệnh `git status` dùng để làm gì trong bài này?",
        "type": "single",
        "options": [
          {
            "text": "Xem trạng thái các tệp trong repository hiện tại",
            "correct": true
          },
          {
            "text": "Tự thêm tệp Untracked vào lịch sử",
            "correct": false
          },
          {
            "text": "Lưu mọi tệp đang sửa thành commit",
            "correct": false
          },
          {
            "text": "Xóa các tệp Git chưa nhận diện",
            "correct": false
          }
        ],
        "explanation": "`git status` chỉ báo trạng thái hiện tại của tệp. Lệnh không thêm, commit hoặc xóa tệp."
      },
      {
        "id": "q5",
        "question": "Một tệp hiện là Untracked. Điều nào đúng?",
        "type": "single",
        "options": [
          {
            "text": "Tệp vẫn có trong thư mục nhưng Git chưa theo dõi nó",
            "correct": true
          },
          {
            "text": "Tệp đã bị xóa khỏi máy",
            "correct": false
          },
          {
            "text": "Tệp chắc chắn đã được lưu thành commit",
            "correct": false
          },
          {
            "text": "Git đã gửi tệp lên máy chủ từ xa",
            "correct": false
          }
        ],
        "explanation": "Untracked mô tả trạng thái Git chưa theo dõi, không phải tình trạng tệp bị mất. Bạn vẫn có thể mở và sửa tệp trong dự án."
      }
    ]
  }
};
export default lesson;
