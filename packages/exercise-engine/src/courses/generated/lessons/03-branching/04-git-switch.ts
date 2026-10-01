import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "04-git-switch",
  "moduleId": "03-branching",
  "metadata": {
    "id": "04-git-switch",
    "title": "Chuyển nhánh bằng git switch",
    "level": "intermediate",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "03-git-branch"
    ],
    "objectives": [
      "Chuyển sang nhánh có sẵn bằng git switch <tên-nhánh>.",
      "Tạo và chuyển sang nhánh mới bằng git switch -c <tên-nhánh>.",
      "Biết Git dừng nếu chuyển nhánh có thể ghi đè thay đổi chưa commit."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "switch-branch"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git switch",
      "chuyen nhanh",
      "tao nhanh moi",
      "working tree update"
    ],
    "commands": [
      "git status",
      "git switch <tên-nhánh>",
      "git switch -c <tên-nhánh-mới>"
    ]
  },
  "content": "# Chuyển nhánh bằng `git switch`\r\n\r\n---\r\n\r\n## 🎯 Mục tiêu\r\n- Chuyển sang một nhánh có sẵn bằng `git switch <tên-nhánh>`.\r\n- Tạo và chuyển sang nhánh mới bằng `git switch -c <tên-nhánh>`.\r\n- Biết Git dừng nếu chuyển nhánh có thể ghi đè thay đổi chưa commit.\r\n\r\n---\r\n\r\n## 🧩 Từ khóa hôm nay\r\n\r\n### `git switch` — chuyển nhánh\r\n- **Nói dễ hiểu:** Chuyển vị trí làm việc sang một nhánh có sẵn.\r\n- **Ví dụ:** `git switch main` quay về nhánh `main`.\r\n- **Đừng nhầm:** Lệnh không tạo commit cho thay đổi của bạn.\r\n\r\n### `-c` — tạo rồi chuyển\r\n- **Nói dễ hiểu:** Tạo tên nhánh mới tại commit hiện tại rồi chuyển sang đó.\r\n- **Ví dụ:** `git switch -c feature-user`.\r\n- **Đừng nhầm:** Dùng `git branch feature-user` chỉ tạo tên, không chuyển.\r\n\r\n### Thư mục làm việc\r\n- **Nói dễ hiểu:** Các tệp bạn đang xem và sửa trong dự án.\r\n- **Ví dụ:** Khi đổi nhánh, tệp tracked có thể cập nhật theo commit của nhánh mới.\r\n- **Đừng nhầm:** Tệp untracked không liên quan thường vẫn ở lại; Git dừng nếu tệp sắp bị ghi đè.\r\n\r\n---\r\n\r\n## 📖 Định nghĩa\r\n`git switch <tên-nhánh>` gắn HEAD vào nhánh có sẵn và cập nhật những tệp cần thiết để khớp với nhánh đó. Dùng `git switch -c <tên-mới>` để tạo nhánh tại commit hiện tại rồi chuyển sang đó. Nếu việc chuyển đi có thể ghi đè sửa đổi chưa commit, Git dừng để bảo vệ nội dung.\r\n\r\n---\r\n\r\n## 🤔 Tại sao cần?\r\nSau khi tạo nhánh, bạn cần chuyển sang đó để làm phần việc riêng. Chuyển về nhánh khác giúp kiểm tra trạng thái của nhánh đó. Git bảo vệ thay đổi cục bộ khi việc chuyển có thể ghi đè chúng; trước khi chuyển, hãy kiểm tra `git status` và quyết định commit hoặc giữ thay đổi lại.\r\n\r\n---\r\n\r\n## 🧠 Mental Model (Mô hình tư duy)\r\nHãy coi mỗi nhánh là một góc nhìn vào lịch sử dự án. `git switch` đổi góc nhìn hiện tại và cập nhật các tệp tracked cần thiết. Các sửa đổi không xung đột có thể được giữ lại; thay đổi có nguy cơ mất sẽ khiến Git từ chối chuyển.\r\n\r\n---\r\n\r\n## 🖼 Sơ đồ\r\n```text\r\nTrước: HEAD ──► main ──► Commit C3\r\n                    feature-user ──► Commit C3\r\n\r\nLệnh: git switch feature-user\r\n\r\nSau:  HEAD ──► feature-user\r\n      main vẫn trỏ tới Commit C3\r\n```\r\n\r\n---\r\n\r\n## 🌎 Ví dụ thực tế\r\nTrang tạo nhánh `feature-cart` để làm giao diện giỏ hàng. Trang dùng `git switch main` để xem nhánh tích hợp rồi `git switch feature-cart` để tiếp tục việc riêng. Nếu còn sửa đổi có thể bị nhánh đích ghi đè, Git sẽ báo dừng; Trang kiểm tra `git status` trước khi quyết định lưu hoặc giữ phần sửa.\r\n\r\n---\r\n\r\n## 💻 Command\r\n```bash\r\ngit status\r\ngit switch <tên-nhánh>\r\ngit switch -c <tên-nhánh-mới>\r\n```\r\n\r\n---\r\n\r\n## 🔍 Giải thích command\r\n- `git status`: Kiểm tra nhánh hiện tại và thay đổi chưa commit.\r\n- `git switch <tên-nhánh>`: Chuyển sang nhánh đã tồn tại.\r\n- `git switch -c <tên-nhánh-mới>`: Tạo nhánh mới và chuyển sang đó ngay.\r\n\r\n---\r\n\r\n## ⚠️ Sai lầm phổ biến\r\n1. **Quên `-c` khi tạo nhánh mới:** `git switch tên-mới` chỉ chuyển sang nhánh đã có.\r\n2. **Cứ thấy Git từ chối chuyển là thử ép:** Kiểm tra thay đổi trước; đừng dùng tùy chọn bỏ thay đổi khi chưa hiểu hậu quả.\r\n3. **Tưởng mọi sửa đổi luôn biến mất khi đổi nhánh:** Git có thể giữ sửa đổi không xung đột; nếu có nguy cơ ghi đè, Git dừng.\r\n\r\n---\r\n\r\n## 🧪 Lab\r\n1. Chạy `git switch -c feature-user` để tạo và chuyển sang nhánh mới.\r\n2. Chạy `git status`; xác nhận dòng đầu báo `On branch feature-user`.\r\n3. Chạy `git switch main`, rồi kiểm tra bằng `git status`.\r\n4. Chạy `git switch feature-user` để quay lại nhánh tính năng.\r\n\r\n---\r\n\r\n## 💡 Hint\r\n> Dùng `git branch` để xem tên nhánh; dùng `git switch` để chuyển sang một tên trong danh sách.\r\n\r\n---\r\n\r\n## ✅ Validation\r\n- `feature-user` xuất hiện trong `git branch`.\r\n- `git status` lần lượt báo `feature-user`, `main`, rồi `feature-user`.\r\n\r\n---\r\n\r\n## ❓ Quiz\r\nTrả lời các câu hỏi để kiểm tra thao tác tạo và chuyển nhánh.\r\n\r\n---\r\n\r\n## 🔥 Challenge\r\nTrên `feature-user`, tạo tệp `feature-note.txt`, stage rồi commit. Chuyển về `main` và quan sát tệp không có trong snapshot của `main`; quay lại `feature-user` để thấy tệp ở đó.\r\n\r\n---\r\n\r\n## 📚 Tổng kết\r\n- `git switch <tên>` chuyển sang nhánh đã có.\r\n- `git switch -c <tên>` vừa tạo nhánh vừa chuyển sang đó.\r\n- Kiểm tra thay đổi chưa commit trước khi chuyển để tránh bị ghi đè.\r\n",
  "quiz": {
    "id": "quiz-03-04-git-switch",
    "title": "Trắc nghiệm: Chuyển nhánh bằng git switch",
    "questions": [
      {
        "id": "q1",
        "question": "Lệnh nào vừa tạo nhánh `feature-login` vừa chuyển sang đó?",
        "type": "single",
        "options": [
          {
            "text": "git switch -c feature-login",
            "correct": true
          },
          {
            "text": "git switch feature-login",
            "correct": false
          },
          {
            "text": "git branch feature-login",
            "correct": false
          },
          {
            "text": "git status feature-login",
            "correct": false
          }
        ],
        "explanation": "`git switch -c` tạo nhánh mới tại commit hiện tại rồi chuyển HEAD sang nhánh đó."
      },
      {
        "id": "q2",
        "question": "Nhánh `feature-login` đã tồn tại. Bạn đang ở `main` và muốn chuyển sang nhánh đó. Nên chạy lệnh nào?",
        "type": "single",
        "options": [
          {
            "text": "git switch feature-login",
            "correct": true
          },
          {
            "text": "git branch feature-login",
            "correct": false
          },
          {
            "text": "git commit feature-login",
            "correct": false
          },
          {
            "text": "git add feature-login",
            "correct": false
          }
        ],
        "explanation": "`git switch <tên>` chuyển sang một nhánh có sẵn; không cần tạo lại nhánh."
      },
      {
        "id": "q3",
        "question": "Bạn chạy `git switch -c feature-user`. Kết quả nào xác nhận bạn đã chuyển đúng?",
        "type": "single",
        "options": [
          {
            "text": "`git status` báo đang ở nhánh `feature-user`",
            "correct": true
          },
          {
            "text": "`git log` không còn commit nào",
            "correct": false
          },
          {
            "text": "Tệp dự án được gửi tự động lên GitHub",
            "correct": false
          },
          {
            "text": "Nhánh `main` bị xóa",
            "correct": false
          }
        ],
        "explanation": "`git status` cho biết nhánh hiện tại; sau lệnh tạo-và-chuyển, nhánh đó là `feature-user`."
      },
      {
        "id": "q4",
        "question": "Bạn có sửa đổi chưa commit và việc chuyển nhánh sẽ ghi đè đúng tệp đó. Git thường làm gì?",
        "type": "single",
        "options": [
          {
            "text": "Dừng và báo lỗi để tránh làm mất sửa đổi",
            "correct": true
          },
          {
            "text": "Tự commit sửa đổi vào nhánh đích",
            "correct": false
          },
          {
            "text": "Xóa sửa đổi mà không báo",
            "correct": false
          },
          {
            "text": "Đẩy sửa đổi lên remote",
            "correct": false
          }
        ],
        "explanation": "Git từ chối thao tác có thể ghi đè thay đổi cục bộ; hãy kiểm tra và lưu chúng trước."
      },
      {
        "id": "q5",
        "question": "Có hai lệnh nào để vừa tạo nhánh vừa chuyển sang đó?",
        "type": "single",
        "options": [
          {
            "text": "`git switch -c <tên>` và `git branch <tên>` rồi `git switch <tên>`",
            "correct": true
          },
          {
            "text": "`git switch <tên>` và `git status`",
            "correct": false
          },
          {
            "text": "`git branch -d <tên>` và `git log`",
            "correct": false
          },
          {
            "text": "`git add <tên>` và `git commit`",
            "correct": false
          }
        ],
        "explanation": "`git switch -c` gộp thao tác tạo và chuyển; cách khác là tạo bằng `git branch` rồi chuyển riêng."
      }
    ]
  }
};
export default lesson;
