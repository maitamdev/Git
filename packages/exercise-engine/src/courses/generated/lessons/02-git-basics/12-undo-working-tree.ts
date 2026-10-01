import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "12-undo-working-tree",
  "moduleId": "02-git-basics",
  "metadata": {
    "id": "12-undo-working-tree",
    "title": "Hoàn tác thay đổi Working Tree",
    "level": "beginner",
    "duration": 30,
    "xp": 90,
    "prerequisites": [
      "11-file-lifecycle"
    ],
    "objectives": [
      "Sử dụng lệnh hiện đại `git restore <file>` để hủy bỏ các sửa đổi dở dang trong Working Tree.",
      "Sử dụng `git restore --staged <file>` để unstage tệp tin an toàn.",
      "Biết thay đổi chưa staged có thể mất nếu hủy bỏ và chưa lưu bản khác."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "undo-working-tree-lab"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git restore",
      "hoan tac",
      "undo",
      "working tree",
      "discard changes"
    ],
    "commands": [
      "git restore <file>",
      "git restore .",
      "git restore --staged <file>"
    ]
  },
  "content": "# Hoàn tác thay đổi Working Tree\n\n---\n\n## 🎯 Mục tiêu\n- Sử dụng lệnh hiện đại `git restore <file>` để hủy bỏ các sửa đổi dở dang trong Working Tree.\n- Sử dụng `git restore --staged <file>` để unstage tệp tin an toàn.\n- Hiểu rõ sự nguy hiểm và tính không thể khôi phục khi hủy bỏ thay đổi chưa commit.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### `git restore <file>` — bỏ sửa đổi trong tệp\n- **Nói dễ hiểu:** Khôi phục nội dung Working Tree về bản staged gần nhất.\n- **Ví dụ:** Chạy `git restore README.md` để bỏ sửa đổi chưa staged.\n- **Đừng nhầm:** Lệnh có thể làm mất sửa đổi chưa được lưu ở nơi khác.\n\n### `git restore --staged` — bỏ chọn cho commit\n- **Nói dễ hiểu:** Đưa phiên bản trong Staging Area về theo commit hiện tại.\n- **Ví dụ:** `git restore --staged README.md` bỏ README khỏi vùng chuẩn bị.\n- **Đừng nhầm:** Bản sửa trong Working Tree vẫn còn sau lệnh này.\n\n### Discard — bỏ thay đổi\n- **Nói dễ hiểu:** Xóa một phần sửa đổi thay vì giữ nó trong tệp hiện tại.\n- **Ví dụ:** `git restore <file>` discard phần sửa chưa staged của tệp đó.\n- **Đừng nhầm:** Đừng dùng nếu bạn còn cần phần sửa ấy.\n\n---\n\n## 📖 Định nghĩa\n`git restore <file>` khôi phục tệp đang sửa về nội dung trong Staging Area. Nếu chưa stage thay đổi nào, đó thường là nội dung ở commit hiện tại. `git restore --staged <file>` bỏ phiên bản staged khỏi vùng chuẩn bị nhưng giữ nguyên tệp đang sửa.\n\n---\n\n## 🤔 Tại sao cần?\nBạn có thể bỏ phần sửa chưa staged của một tệp mà không đụng tới các tệp khác. Vì Git không giữ bản sửa chưa staged, hãy chắc chắn bạn không còn cần phần đó trước khi chạy lệnh.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung `git restore <file>` như thay nội dung một tệp bằng bản đã chọn trước đó. Nếu chưa staged, bản đã chọn thường giống commit hiện tại; nếu đã stage, lệnh giữ lại bản staged.\n\n---\n\n## 🖼 Sơ đồ\n```text\ngit restore <file>:        Staging Area ──► Working Tree\ngit restore --staged:     HEAD ──────────► Staging Area\n                           (Working Tree được giữ nguyên)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn sửa `payment.js` nhưng chưa chạy `git add`. Sau khi xem `git diff` và quyết định bỏ phần sửa đó, chạy `git restore payment.js`. Git chép lại nội dung đang staged vào tệp; nếu chưa stage lần nào, nội dung đó đến từ commit hiện tại.\n\n---\n\n## 💻 Command\n```bash\ngit restore <file>\ngit restore .\ngit restore --staged <file>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git restore <file>`: Khôi phục tệp tracked trong Working Tree về nội dung ở Staging Area.\n- `git restore .`: Khôi phục các tệp tracked chưa staged trong thư mục hiện tại và thư mục con; không xóa tệp untracked.\n- `git restore --staged <file>`: Đưa tệp trong Staging Area về theo HEAD, đồng thời giữ nguyên nội dung Working Tree.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Chạy restore khi còn cần phần sửa chưa staged**: Git sẽ thay nội dung hiện tại bằng bản staged; lưu phần cần giữ ở nơi khác trước.\n2. **Nhầm lẫn giữa `git restore <file>` và `git restore --staged <file>`**:  Một đằng hủy bỏ nội dung trên ổ đĩa, một đằng chỉ rút khỏi khu vực chuẩn bị.\n3. **Dùng `git restore .` mà chưa kiểm tra các tệp**: Lệnh có thể bỏ thay đổi của nhiều tệp tracked trong thư mục hiện tại.\n\n---\n\n## 🧪 Lab\n1. Mở tệp `app.js` và thêm vào một dòng code lỗi cố ý.\n2. Kiểm tra `git status` để thấy tệp ở trạng thái Modified.\n3. Chạy lệnh `git restore app.js` để hủy bỏ thay đổi.\n4. Kiểm tra lại nội dung tệp và chạy `git status` để xác nhận thay đổi đã được bỏ.\n\n---\n\n## 💡 Hint\n> Trước khi chạy restore, dùng `git diff` để xem phần sửa sẽ bị bỏ.\n\n---\n\n## ✅ Validation\n- Tệp trở về nội dung đang staged; nếu chưa staged thì là nội dung ở HEAD.\n\n---\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm dưới đây về các thao tác hoàn tác với git restore.\n\n---\n\n## 🔥 Challenge\nSửa tệp, stage một phần, rồi sửa thêm. Dùng `git diff` và `git diff --staged` để nói phần nào restore thường bỏ.\n\n---\n\n## 📚 Tổng kết\n- `git restore <file>` thay nội dung Working Tree bằng phiên bản trong Staging Area.\n- `git restore --staged <file>` đưa Staging Area về theo HEAD và giữ nguyên Working Tree.\n- `git restore .` áp dụng với tệp tracked trong thư mục hiện tại; không xóa tệp untracked.\n- Xem `git diff` trước khi bỏ thay đổi chưa staged.\n",
  "quiz": {
    "id": "quiz-02-12-undo-working-tree",
    "title": "Trắc nghiệm: Hoàn tác thay đổi Working Tree",
    "questions": [
      {
        "id": "q1",
        "question": "Lệnh Git hiện đại nào được khuyến nghị sử dụng để hủy bỏ các sửa đổi chưa staged trong Working Tree?",
        "type": "single",
        "options": [
          {
            "text": "git restore <tên-tệp>",
            "correct": true
          },
          {
            "text": "git delete <tên-tệp>",
            "correct": false
          },
          {
            "text": "git cancel-all",
            "correct": false
          },
          {
            "text": "git remove --unstage",
            "correct": false
          }
        ],
        "explanation": "`git restore <tên-tệp>` là lệnh chuyên trách từ Git 2.23 để hoàn tác thay đổi trong thư mục làm việc."
      },
      {
        "id": "q2",
        "question": "Tệp đã được theo dõi; bạn sửa nhưng chưa stage. Điều gì xảy ra khi chạy `git restore <file>`?",
        "type": "single",
        "options": [
          {
            "text": "Git thay nội dung tệp bằng bản staged; nếu chưa stage, Git không giữ phần sửa mới",
            "correct": true
          },
          {
            "text": "Git sẽ tự động lưu các dòng đó vào hòm thư điện tử cá nhân",
            "correct": false
          },
          {
            "text": "Git sẽ chuyển các dòng code đó lên máy chủ GitHub",
            "correct": false
          },
          {
            "text": "Các dòng đó sẽ được cất vào thùng rác máy tính để phục hồi sau",
            "correct": false
          }
        ],
        "explanation": "`git restore <file>` lấy phiên bản trong Index và bỏ phần sửa chưa staged của tệp đó."
      },
      {
        "id": "q3",
        "question": "Lệnh `git restore --staged index.html` thực hiện hành động gì?",
        "type": "single",
        "options": [
          {
            "text": "Rút tệp index.html ra khỏi Staging Area nhưng vẫn giữ nguyên toàn bộ code đã sửa trong Working Directory",
            "correct": true
          },
          {
            "text": "Xóa sạch tệp index.html khỏi ổ cứng máy tính",
            "correct": false
          },
          {
            "text": "Tạo một commit mới có tên là staged",
            "correct": false
          },
          {
            "text": "Đẩy tệp index.html lên nhánh chính của máy chủ từ xa",
            "correct": false
          }
        ],
        "explanation": "Cờ `--staged` chỉ hủy bỏ việc stage trong Index, không làm mất bất kỳ dòng code nào bạn đã gõ trong Working Tree."
      },
      {
        "id": "q4",
        "question": "Lệnh nào khôi phục các tệp tracked chưa staged trong thư mục hiện tại?",
        "type": "single",
        "options": [
          {
            "text": "git restore .",
            "correct": true
          },
          {
            "text": "git restore --everything-delete",
            "correct": false
          },
          {
            "text": "git undo -all",
            "correct": false
          },
          {
            "text": "git clear-tree",
            "correct": false
          }
        ],
        "explanation": "`git restore .` khôi phục tệp tracked chưa staged trong thư mục hiện tại và thư mục con."
      },
      {
        "id": "q5",
        "question": "Bạn stage một tệp, rồi chạy `git restore --staged file.txt`. Phần nội dung đã sửa sẽ ra sao?",
        "type": "single",
        "options": [
          {
            "text": "Tệp bị bỏ khỏi Staging Area nhưng phần sửa vẫn còn trong Working Directory",
            "correct": true
          },
          {
            "text": "Tệp bị xóa hoàn toàn khỏi máy",
            "correct": false
          },
          {
            "text": "Một commit mới được tạo",
            "correct": false
          },
          {
            "text": "Tệp tự được đẩy lên remote",
            "correct": false
          }
        ],
        "explanation": "`--staged` gỡ lựa chọn khỏi Index; nó không hủy phần sửa trong Working Directory."
      }
    ]
  }
};
export default lesson;
