import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "21-git-worktree",
  "moduleId": "05-advanced-git",
  "metadata": {
    "id": "21-git-worktree",
    "title": "git worktree",
    "level": "advanced",
    "duration": 30,
    "xp": 90,
    "prerequisites": [
      "18-git-tag"
    ],
    "objectives": [
      "Hiểu rõ sự đột phá của tính năng `git worktree`: làm việc đồng thời trên nhiều nhánh ở nhiều thư mục khác nhau.",
      "Khắc phục triệt để hạn chế của quy trình truyền thống: không cần phải stash hay commit dở để chuyển nhánh.",
      "Sử dụng `git worktree add` để mở một không gian làm việc song song chỉ trong vài giây.",
      "Quản lý danh sách và dọn dẹp an toàn các worktree bằng `git worktree list` và `git worktree remove`."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git worktree",
      "multiple working trees",
      "da thu muc lam viec",
      "chuyen nhanh khong stash",
      "parallel branches"
    ],
    "commands": [
      "git worktree add <đường-dẫn-thư-mục> <tên-nhánh>",
      "git worktree add -b <nhánh-mới> <đường-dẫn>",
      "git worktree list",
      "git worktree remove <đường-dẫn-thư-mục>",
      "git worktree prune"
    ]
  },
  "content": "# git worktree\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ sự đột phá của tính năng `git worktree`: làm việc đồng thời trên nhiều nhánh ở nhiều thư mục khác nhau.\n- Khắc phục triệt để hạn chế của quy trình truyền thống: không cần phải stash hay commit dở để chuyển nhánh.\n- Sử dụng `git worktree add` để mở một không gian làm việc song song chỉ trong vài giây.\n- Quản lý danh sách và dọn dẹp an toàn các worktree bằng `git worktree list` và `git worktree remove`.\n\n---\n\n## 📖 Định nghĩa\n> `git worktree` là tính năng quản lý đa thư mục làm việc mạnh mẽ trong Git, cho phép một kho lưu trữ duy nhất (cùng chia sẻ chung một thư mục `.git`) có thể liên kết và mở đồng thời nhiều thư mục làm việc (Working Trees) độc lập tại các đường dẫn khác nhau trên ổ đĩa. Mỗi thư mục worktree được gắn với một nhánh riêng biệt, cho phép bạn mở nhiều cửa sổ lập trình song song mà không cần clone lại dự án.\n\n---\n\n## 🤔 Tại sao cần?\nQuy trình làm việc truyền thống rất bất tiện: bạn đang chạy dev server trên nhánh A với hàng trăm file đang sửa dở, có việc gấp cần sang nhánh B bạn phải tắt server, gõ `git stash`, chuyển nhánh, cài lại dependencies. Với `git worktree`, bạn chỉ cần mở thêm một thư mục bên cạnh: nhánh B chạy độc lập ở thư mục B, nhánh A vẫn chạy ở thư mục A với dev server đang chạy mượt mà. Không cần stash, không sợ mất code, tăng năng suất làm việc lên gấp bội.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung bạn là một kiến trúc sư đang thiết kế một tòa nhà. Thay vì chỉ có một chiếc bàn vẽ duy nhất mà mỗi lần đổi bản vẽ bạn phải cuộn bản vẽ cũ cất đi rồi trải bản vẽ mới ra bàn, bạn sở hữu một căn phòng rộng thênh thang với nhiều chiếc bàn vẽ đặt cạnh nhau (`git worktree`). Bàn số 1 bạn đang vẽ mặt tiền tòa nhà (nhánh feature), bàn số 2 bạn đang mở bản vẽ hệ thống cấp thoát nước (nhánh hotfix). Bạn có thể bước qua bước lại giữa hai chiếc bàn bất cứ lúc nào.\n\n---\n\n## 🖼 Sơ đồ\n```text\nKiến trúc chia sẻ một kho chứa .git của Worktree:\n                   ┌──► Thư mục chính: /project (nhánh: main)\nKho chứa gốc:     │\n/project/.git ─────┼──► Thư mục phụ 1: /project-hotfix (nhánh: hotfix-login)\n(Chung dữ liệu!)   │\n                   └──► Thư mục phụ 2: /project-feature (nhánh: feat-ai)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nLập trình viên Cường đang lập trình tính năng thanh toán trên nhánh `feat/checkout` ở thư mục `my-app`. Ứng dụng đang biên dịch dở dang thì đồng nghiệp nhờ Cường review gấp nhánh `review-pr-45`. Thay vì stash làm gián đoạn tiến trình biên dịch, Cường gõ câu lệnh: `git worktree add ../my-app-pr review-pr-45`. Ngay lập tức, thư mục `my-app-pr` xuất hiện bên cạnh với đầy đủ mã nguồn của nhánh đó. Cường mở cửa sổ VS Code thứ hai tại thư mục mới, chạy thử và review xong cho bạn, rồi xóa thư mục đó bằng `git worktree remove ../my-app-pr`. Không gian làm việc chính của Cường hoàn toàn không bị ảnh hưởng.\n\n---\n\n## 💻 Command\n```bash\ngit worktree add <đường-dẫn-thư-mục> <tên-nhánh>\ngit worktree add -b <nhánh-mới> <đường-dẫn>\ngit worktree list\ngit worktree remove <đường-dẫn-thư-mục>\ngit worktree prune\n```\n\n---\n\n## 🔍 Giải thích command\n- `git worktree add <path> <branch>`: Mở một thư mục làm việc mới tại đường dẫn chỉ định liên kết với một nhánh có sẵn.\n- `git worktree add -b <new-branch> <path>`: Tạo luôn một nhánh mới và mở worktree tại thư mục chỉ định.\n- `git worktree list`: Liệt kê danh sách tất cả các thư mục worktree đang hoạt động kèm tên nhánh tương ứng.\n- `git worktree remove <path>`: Dọn dẹp và xóa bỏ an toàn một thư mục worktree sau khi sử dụng xong.\n- `git worktree prune`: Dọn dẹp thông tin rác của các worktree đã bị xóa thủ công trên đĩa.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Cố gắng mở hai worktree trên cùng một nhánh**:  Git sẽ chặn lại ngay lập tức để ngăn ngừa xung đột dữ liệu.\n2. **Tự ý dùng lệnh xóa thư mục của hệ điều hành (rmdir / rm -rf) thay vì dùng `git worktree remove`**:  Dẫn đến dữ liệu quản trị trong `.git/worktrees` bị thừa thãi (cần chạy `git worktree prune` để dọn).\n3. **Nhầm lẫn giữa worktree và clone mới**:  Worktree dùng chung cơ sở dữ liệu `.git`, tiết kiệm dung lượng ổ cứng gấp nhiều lần.\n\n---\n\n## 🧪 Lab\n1. Liệt kê danh sách worktree hiện tại bằng `git worktree list`.\n2. Tạo một worktree mới cho nhánh `demo-worktree` bằng lệnh `git worktree add ../temp-worktree -b demo-worktree`.\n3. Chạy `git worktree list` và quan sát hai đường dẫn thư mục cùng tồn tại.\n4. Dọn dẹp bằng lệnh `git worktree remove ../temp-worktree`.\n\n---\n\n## 💡 Hint\n> Mỗi nhánh chỉ được phép gắn với duy nhất một thư mục worktree tại một thời điểm.\n\n---\n\n## ✅ Validation\n- Tạo, quản lý và dọn dẹp thành công các không gian làm việc song song bằng git worktree.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về tính năng đa thư mục git worktree.\n\n---\n\n## 🔥 Challenge\nSo sánh chi tiết về dung lượng ổ đĩa và tốc độ tạo lập giữa việc dùng `git worktree add` và `git clone` lại dự án sang thư mục mới.\n\n---\n\n## 📚 Tổng kết\n- `git worktree` cho phép mở nhiều thư mục làm việc đồng thời trên nhiều nhánh khác nhau.\n- Dùng chung một cơ sở dữ liệu `.git`, cực kỳ nhẹ và không tốn dung lượng ổ đĩa.\n- Giải quyết dứt điểm nhu cầu chuyển nhánh khẩn cấp mà không cần stash hay ngắt dev server.\n",
  "quiz": {
    "id": "quiz-05-21-git-worktree",
    "title": "Trắc nghiệm: git worktree",
    "questions": [
      {
        "id": "q1",
        "question": "Lợi ích đột phá lớn nhất của `git worktree` so with việc chuyển nhánh (`git switch`) thông thường là gì?",
        "type": "single",
        "options": [
          {
            "text": "Cho phép bạn mở và chỉnh sửa song song hai hay nhiều nhánh ở các thư mục riêng biệt mà không cần phải stash hay tắt server",
            "correct": true
          },
          {
            "text": "Tự động tăng gấp đôi tốc độ mạng Internet khi push code",
            "correct": false
          },
          {
            "text": "Không cần cài đặt Git trên máy tính vẫn dùng được",
            "correct": false
          },
          {
            "text": "Tự động chuyển đổi mã nguồn sang ngôn ngữ máy tính khác",
            "correct": false
          }
        ],
        "explanation": "Worktree cho phép đa nhiệm thực sự: mỗi nhánh có một thư mục riêng biệt trên đĩa cứng cùng chia sẻ chung một kho `.git`."
      },
      {
        "id": "q2",
        "question": "Điều gì sẽ xảy ra nếu bạn cố gắng dùng `git worktree add` để mở một nhánh đang được mở ở một worktree khác?",
        "type": "single",
        "options": [
          {
            "text": "Git sẽ từ chối và báo lỗi vì một nhánh không được phép checkout đồng thời ở hai nơi để tránh xung đột",
            "correct": true
          },
          {
            "text": "Git tự động xóa thư mục làm việc cũ",
            "correct": false
          },
          {
            "text": "Git tự động gộp hai thư mục làm một",
            "correct": false
          },
          {
            "text": "Máy tính sẽ bị khóa tài khoản",
            "correct": false
          }
        ],
        "explanation": "Git ngăn chặn hai worktree cùng trỏ vào một nhánh để bảo vệ tính toàn vẹn của con trỏ nhánh và reflog."
      },
      {
        "id": "q3",
        "question": "Lệnh nào sau đây dùng để xem danh sách tất cả các thư mục worktree đang hoạt động trong dự án?",
        "type": "single",
        "options": [
          {
            "text": "git worktree list",
            "correct": true
          },
          {
            "text": "git worktree status",
            "correct": false
          },
          {
            "text": "git worktree show-all",
            "correct": false
          },
          {
            "text": "git list --worktrees",
            "correct": false
          }
        ],
        "explanation": "`git worktree list` liệt kê đường dẫn tuyệt đối của từng worktree kèm commit hash và nhánh đang gắn."
      },
      {
        "id": "q4",
        "question": "Lệnh chuẩn mực để dọn dẹp và xóa bỏ một thư mục worktree sau khi hoàn thành nhiệm vụ là gì?",
        "type": "single",
        "options": [
          {
            "text": "git worktree remove <đường-dẫn-thư-mục>",
            "correct": true
          },
          {
            "text": "git worktree drop <tên-nhánh>",
            "correct": false
          },
          {
            "text": "git worktree clean --all",
            "correct": false
          },
          {
            "text": "git destroy worktree <đường-dẫn>",
            "correct": false
          }
        ],
        "explanation": "`git worktree remove <path>` xóa tệp trên đĩa và dọn dẹp siêu dữ liệu quản trị trong thư mục `.git/worktrees`."
      }
    ]
  }
};
export default lesson;
