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
  "content": "# Working Directory (Thư mục làm việc)\n\n---\n\n## 🎯 Mục tiêu\n- Chỉ ra thư mục làm việc và biết nơi mình sửa tệp.\n- Phân biệt tệp Git đã theo dõi với tệp mới chưa được theo dõi.\n- Dùng `git status` để xem những tệp đó.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Working Directory — thư mục làm việc\n- **Nói dễ hiểu:** Các tệp dự án trên máy mà bạn mở và sửa.\n- **Ví dụ:** Tệp `index.html` đang mở trong trình soạn thảo nằm ở đây.\n- **Đừng nhầm:** Sửa ở đây chưa tự đưa thay đổi vào commit.\n\n### Tracked — đã được Git theo dõi\n- **Nói dễ hiểu:** Tệp Git đã biết và có thể so sánh với trạng thái đã lưu.\n- **Ví dụ:** README sau khi được thêm vào lịch sử sẽ là tracked.\n- **Đừng nhầm:** Tracked không có nghĩa sửa đổi mới đã được commit.\n\n### Untracked — chưa được Git theo dõi\n- **Nói dễ hiểu:** Tệp mới nằm trong thư mục nhưng Git chưa được yêu cầu theo dõi.\n- **Ví dụ:** Tạo `note.txt` mới rồi chạy `git status`.\n- **Đừng nhầm:** Tệp vẫn nằm trên máy; chỉ là chưa được chọn vào Git.\n\n---\n\n## 📖 Định nghĩa\nWorking Directory (còn gọi là Working Tree trong nhiều hướng dẫn) là các tệp dự án bạn mở và sửa trên máy. Tạo tệp mới chưa tự đưa tệp vào Git; `git status` sẽ báo tệp là untracked cho tới khi bạn chọn theo dõi.\n\n---\n\n## 🤔 Tại sao cần?\nLưu tệp trong trình soạn thảo chỉ cập nhật tệp trên máy. Git chưa đưa thay đổi đó vào lịch sử; việc này cần các bước `git add` và `git commit`.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nWorking Directory là bản dự án bạn đang nhìn và sửa trên máy; commit là mốc đã lưu riêng trong lịch sử.\n\n---\n\n## 🖼 Sơ đồ\n```text\nKiến trúc 3 khu vực của Git:\n┌──────────────────────┐     git add      ┌──────────────────────┐    git commit    ┌──────────────────────┐\n│  Working Directory   │ ───────────────► │     Staging Area     │ ───────────────► │      Repository      │\n│ (Thư mục làm việc)   │                  │   (Vùng chuẩn bị)    │                  │  (các commit đã lưu) │\n│  - Chỉnh sửa tệp     │                  │  - Chọn thay đổi     │                  │  - Lưu các commit     │\n└──────────────────────┘                  └──────────────────────┘                  └──────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTạo `payment.js`, rồi chạy `git status`. Git báo tệp là Untracked: tệp có trên máy nhưng chưa được chọn để theo dõi.\n\n---\n\n## 💻 Command\n```bash\ngit status\n```\n\n---\n\n## 🔍 Giải thích command\n- `git status`: Báo tệp nào đã sửa, đã staged hoặc chưa được theo dõi.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ lưu tệp là Git đã tạo mốc**:  Lưu trong trình soạn thảo chưa tạo commit.\n2. **Nhầm Working Directory với Staging Area**:  Tệp đang sửa chưa chắc đã được chọn cho commit.\n3. **Nhầm lẫn Working Directory với Staging Area**:  Không phân biệt được tệp đang sửa với tệp đã sẵn sàng để commit.\n\n---\n\n## 🧪 Lab\n1. Mở terminal tại thư mục dự án và tạo một tệp tin mới bằng lệnh `echo \"console.log(1);\" > script.js`.\n2. Chạy `git status` để thấy `script.js` trong mục Untracked files.\n3. Nhận biết rằng tệp tin này đang nằm trong Working Directory nhưng chưa hề được đưa vào Staging Area.\n\n---\n\n## 💡 Hint\n> Mọi tệp tin bạn nhìn thấy và sửa đổi trong VS Code đều nằm trong Working Directory.\n\n---\n\n## ✅ Validation\n- Tạo tệp thành công và `git status` nhận diện tệp là untracked trong working tree.\n\n---\n\n## ❓ Quiz\nHãy hoàn thành bài kiểm tra trắc nghiệm dưới đây về Working Directory trong Git.\n\n---\n\n## 🔥 Challenge\nMô tả điều gì sẽ xảy ra với các tệp trong Working Directory nếu bạn chuyển sang một nhánh hoàn toàn khác.\n\n---\n\n## 📚 Tổng kết\n- Working Directory là dự án bạn đang mở và sửa trên máy.\n- Tệp mới chưa được chọn sẽ hiện là Untracked.\n- Lưu tệp chưa tạo commit; dùng `git status` để kiểm tra trạng thái.\n",
  "quiz": {
    "id": "quiz-02-01-working-directory",
    "title": "Trắc nghiệm: Working Directory trong Git",
    "questions": [
      {
        "id": "q1",
        "question": "Working Directory (hay Working Tree) trong Git là gì?",
        "type": "single",
        "options": [
          {
            "text": "Thư mục vật lý trên ổ cứng chứa các tệp mã nguồn mà bạn trực tiếp mở và chỉnh sửa",
            "correct": true
          },
          {
            "text": "Máy chủ đám mây của GitHub lưu trữ bản sao lưu dự án",
            "correct": false
          },
          {
            "text": "Bộ nhớ RAM tạm thời của vi xử lý máy tính",
            "correct": false
          },
          {
            "text": "Khu vực lưu trữ các commit đã được đóng gói hoàn thiện",
            "correct": false
          }
        ],
        "explanation": "Working Directory là nơi làm việc thực tế ngoài đời của lập trình viên trên hệ thống tệp tin. Đáp án B sai vì đó là Remote Server; C sai vì Git lưu trên ổ cứng; D sai vì đó là Repository."
      },
      {
        "id": "q2",
        "question": "Một tệp mới vừa được tạo trong Working Directory ban đầu sẽ có trạng thái nào đối với Git?",
        "type": "single",
        "options": [
          {
            "text": "Untracked (Chưa được theo dõi)",
            "correct": true
          },
          {
            "text": "Staged (Đã nằm trong vùng chuẩn bị)",
            "correct": false
          },
          {
            "text": "Tracked (Git đã bắt đầu theo dõi tệp)",
            "correct": false
          },
          {
            "text": "Ignored (Bị bỏ qua tự động)",
            "correct": false
          }
        ],
        "explanation": "Tệp mới thường là Untracked cho tới khi bạn chọn theo dõi bằng `git add`. Đáp án B sai vì cần chạy git add; C sai vì cần commit; D sai vì chỉ ignored nếu có trong .gitignore."
      },
      {
        "id": "q3",
        "question": "Khi bạn chỉnh sửa một dòng code trong tệp đã được theo dõi và bấm phím lưu, thay đổi đó nằm ở đâu?",
        "type": "single",
        "options": [
          {
            "text": "Nằm trong Working Directory ở trạng thái Modified",
            "correct": true
          },
          {
            "text": "Tự động tạo ra một commit mới trong Repository",
            "correct": false
          },
          {
            "text": "Tự động đẩy thẳng lên máy chủ từ xa GitHub",
            "correct": false
          },
          {
            "text": "Biến mất ngay lập tức khi tắt terminal",
            "correct": false
          }
        ],
        "explanation": "Lưu tệp chỉ cập nhật nội dung trên Working Directory và chuyển trạng thái tệp thành Modified. Các đáp án khác sai vì Git không tự động commit hay push ngầm."
      },
      {
        "id": "q4",
        "question": "Sau khi chạy `git add`, chuyện gì xảy ra với tệp đang ở Working Directory?",
        "type": "single",
        "options": [
          {
            "text": "Tệp vẫn ở đó; trạng thái hiện tại được chọn vào Staging Area",
            "correct": true
          },
          {
            "text": "Remote Repository trên GitHub",
            "correct": false
          },
          {
            "text": "Thùng rác hệ điều hành Recycle Bin",
            "correct": false
          },
          {
            "text": "Thư mục cấu hình toàn cục Global Config",
            "correct": false
          }
        ],
        "explanation": "`git add` không di chuyển tệp khỏi thư mục; nó chọn phiên bản để chuẩn bị commit."
      },
      {
        "id": "q5",
        "question": "Bạn sửa một tệp đã được Git theo dõi rồi lưu lại. Thay đổi mới đang ở trạng thái nào?",
        "type": "single",
        "options": [
          {
            "text": "Modified trong Working Directory, chưa tự staged",
            "correct": true
          },
          {
            "text": "Một commit mới đã tự được tạo",
            "correct": false
          },
          {
            "text": "Tệp đã bị xóa khỏi dự án",
            "correct": false
          },
          {
            "text": "Thay đổi đã được gửi lên GitHub",
            "correct": false
          }
        ],
        "explanation": "Lưu tệp chỉ cập nhật Working Directory. Bạn cần dùng `git add` để stage và `git commit` để tạo mốc lịch sử."
      }
    ]
  }
};
export default lesson;
