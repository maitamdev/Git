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
  "content": "# Chuyển nhánh bằng `git switch`\n\n---\n\n## 🎯 Mục tiêu\n- Thành thạo lệnh hiện đại `git switch <tên-nhánh>` để chuyển đổi mượt mà giữa các nhánh.\n- Sử dụng cú pháp thần tốc `git switch -c <tên-nhánh>` để vừa tạo vừa chuyển nhánh trong một nốt nhạc.\n- Hiểu sâu cơ chế bảo vệ an toàn dữ liệu của Git khi có thay đổi chưa commit lúc chuyển nhánh.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### `git switch` — chuyển nhánh\n- **Nói dễ hiểu:** Thao tác di dời con trỏ HEAD và chuyển toàn bộ môi trường làm việc sang một nhánh mục tiêu đã có sẵn.\n- **Ví dụ:** Gõ `git switch main` để trở về nhánh chính của dự án.\n- **Đừng nhầm:** Lệnh chuyển nhánh chỉ đổi không gian làm việc; nó hoàn toàn không tự động commit code đang sửa dở của bạn.\n\n### `-c` — tạo rồi chuyển\n- **Nói dễ hiểu:** Cờ tùy chọn thần tốc (viết tắt của `--create`) giúp bạn vừa khai sinh nhánh mới vừa lập tức nhảy sang đó trong một lệnh duy nhất.\n- **Ví dụ:** `git switch -c feature/user-profile` tạo nhánh profile và đưa bạn sang đó ngay lập tức.\n- **Đừng nhầm:** Đây là cú pháp hiện đại thay thế cho câu lệnh cổ điển `git checkout -b <tên-nhánh>` ngày trước.\n\n### Thư mục làm việc\n- **Nói dễ hiểu:** Toàn bộ các file và thư mục thực tế đang hiện hữu trên ổ đĩa máy tính mà bạn mở bằng trình soạn thảo mã nguồn.\n- **Ví dụ:** Khi bạn switch nhánh, Git tự động thay thế, xóa hoặc thêm các file trong thư mục này để khớp với snapshot của nhánh mới.\n- **Đừng nhầm:** Nếu bạn có file chưa commit bị xung đột với nhánh đích, Git sẽ chặn việc chuyển nhánh để bảo vệ dữ liệu của bạn.\n\n---\n\n## 📖 Định nghĩa\n`git switch` là lệnh hiện đại được Git giới thiệu (từ phiên bản 2.23) chuyên biệt hóa hoàn toàn cho tác vụ chuyển đổi giữa các nhánh. Lệnh này gắn con trỏ HEAD vào nhánh mục tiêu và tự động cập nhật toàn bộ thư mục làm việc (Working Tree) khớp với snapshot mới nhất của nhánh đó, thay thế cho lệnh `git checkout` vốn ôm đồm quá nhiều chức năng gây nhầm lẫn.\n\n---\n\n## 🤔 Tại sao cần?\nTrong một ngày làm việc, bạn phải liên tục di chuyển giữa các luồng công việc: đang làm dở tính năng thì có cuộc gọi khẩn cấp yêu cầu quay về nhánh `main` để kiểm tra lỗi nóng. `git switch` giúp bạn dịch chuyển tức thời và an toàn giữa các nhánh. Đặc biệt, Git sở hữu cơ chế bảo vệ thông minh: nếu việc chuyển nhánh có nguy cơ ghi đè làm mất code chưa commit của bạn, Git sẽ lập tức từ chối chuyển để bảo toàn dữ liệu.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy tưởng tượng mỗi nhánh là một bộ phim trên các kênh truyền hình khác nhau. Lệnh `git switch` chính là chiếc remote điều khiển TV giúp bạn bấm chuyển kênh. Khi bạn bấm chuyển từ kênh VTV1 (`main`) sang HBO (`feature`), màn hình TV (thư mục làm việc của bạn) lập tức chuyển cảnh chiếu trọn vẹn nội dung của kênh mới.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCƠ CHẾ ĐIỀU HƯỚNG CỦA GIT SWITCH:\n\nTrước khi chuyển:\n  HEAD ──────► [main] ─────────► [Commit C3]\n               [feature-user] ──► [Commit C3]\n\nChạy lệnh: `git switch feature-user`\n\nSau khi chuyển:\n               [main] ─────────► [Commit C3]\n  HEAD ──────► [feature-user] ──► [Commit C3]\n  (Thư mục làm việc được cập nhật đồng bộ với nhánh feature-user!)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn đang phát triển tính năng lọc sản phẩm trên nhánh `feature/filters`. Nhận được yêu cầu xem lại nhánh `main`, bạn gõ `git switch main`: thư mục mã nguồn lập tức biến đổi về trạng thái ổn định của nhánh chính. Sau khi xem xong, bạn gõ `git switch feature/filters` để trở lại đúng bàn làm việc với tính năng lọc dở dang mà không mất một dòng code nào.\n\n---\n\n## 💻 Command\n```bash\ngit status\ngit switch <tên-nhánh>\ngit switch -c <tên-nhánh-mới>\ngit switch -\n```\n\n---\n\n## 🔍 Giải thích command\n- `git status`: Thao tác kiểm tra an toàn trước khi chuyển nhánh để biết thư mục làm việc có sạch sẽ hay không.\n- `git switch <tên-nhánh>`: Di chuyển HEAD sang một nhánh mục tiêu đã tồn tại sẵn.\n- `git switch -c <tên-nhánh>`: Lối tắt siêu tốc tương đương với việc gõ kết hợp `git branch <tên>` rồi `git switch <tên>`.\n- `git switch -`: Cú pháp tiện ích nhảy nhanh qua lại giữa hai nhánh gần nhất vừa làm việc.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Quên cờ `-c` khi muốn tạo nhánh mới**: Gõ `git switch new-feature` khi nhánh chưa tồn tại sẽ bị lỗi \"invalid reference: new-feature\".\n2. **Ép buộc chuyển nhánh khi có conflict dở dang**: Cố tình ép chuyển nhánh mà không stash hoặc commit khiến các thay đổi cục bộ bị mất sạch.\n3. **Nhầm lẫn với lệnh git restore**: Dùng nhầm lệnh switch để hoàn tác file; hãy nhớ `switch` chỉ dành riêng cho việc chuyển nhánh!\n\n---\n\n## 🧪 Lab\n1. Chạy `git switch -c feature-user` để tạo và bước chân sang nhánh tính năng mới ngay lập tức.\n2. Chạy `git status` và xác nhận dòng đầu tiên hiển thị tự hào: `On branch feature-user`.\n3. Chạy `git switch main` để lùi lại nhánh chính, kiểm tra lại bằng `git status`.\n4. Chạy `git switch feature-user` để trở lại nhánh tính năng làm việc tiếp.\n\n---\n\n## 💡 Hint\n> Hãy dùng `git switch -c <tên-nhánh>` như thói quen mặc định mỗi khi bắt đầu một đầu việc mới!\n\n---\n\n## ✅ Validation\n- Nhánh `feature-user` xuất hiện trong danh sách khi gõ `git branch`.\n- Terminal xác nhận chính xác sự chuyển dịch giữa `feature-user` và `main`.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để nắm vững quy trình chuyển đổi nhánh an toàn và hiệu quả với git switch.\n\n---\n\n## 🔥 Challenge\nHãy thử tạo một file mới trên nhánh `feature-user`, commit nó lại. Sau đó gõ `git switch main` và mở thư mục ra xem file đó có còn xuất hiện không. Tiếp tục gõ `git switch feature-user` và giải thích cơ chế kỳ diệu mà Git đã thực hiện trên ổ cứng của bạn!\n\n---\n\n## 📚 Tổng kết\n- `git switch` là lệnh chuẩn mực, an toàn và trực quan để di chuyển giữa các nhánh.\n- Cờ `-c` giúp bạn kết hợp việc tạo nhánh và kích hoạt nhánh trong một thao tác duy nhất.\n- Luôn giữ thư mục làm việc sạch sẽ (clean working tree) trước khi chuyển đổi qua lại giữa các luồng việc.\n",
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
