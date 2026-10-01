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
  "content": "# git worktree\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ sự đột phá của tính năng `git worktree`: làm việc đồng thời trên nhiều nhánh ở nhiều thư mục khác nhau.\n- Khắc phục triệt để hạn chế của quy trình truyền thống: không cần phải stash hay commit dở để chuyển nhánh.\n- Sử dụng `git worktree add` để mở một không gian làm việc song song chỉ trong vài giây.\n- Quản lý danh sách và dọn dẹp an toàn các worktree bằng `git worktree list` và `git worktree remove`.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Git Worktree\n- **Nói dễ hiểu**: Tính năng mở đồng thời nhiều thư mục làm việc trên đĩa cứng gắn với các nhánh khác nhau mà dùng chung một kho `.git`.\n- **Ví dụ**: Dùng `git worktree add ../hotfix-folder hotfix-branch` để mở nhanh một nhánh hotfix ở thư mục riêng mà không cần stash code dở.\n- **Đừng nhầm**: Không phải là tạo clone mới tốn dung lượng; các worktree chia sẻ chung toàn bộ commit history và object trong `.git`.\n\n### Worktree List (git worktree list)\n- **Nói dễ hiểu**: Lệnh xem danh sách toàn bộ các thư mục worktree đang hoạt động kèm tên nhánh tương ứng trên máy tính.\n- **Ví dụ**: Chạy `git worktree list` để kiểm tra đường dẫn các thư mục phụ trợ trước khi dọn dẹp.\n- **Đừng nhầm**: Không được mở hai worktree cùng trỏ vào một nhánh duy nhất tại cùng một thời điểm.\n\n### Worktree Remove (git worktree remove)\n- **Nói dễ hiểu**: Lệnh chuẩn mực để xóa một thư mục worktree và dọn sạch siêu dữ liệu quản lý liên kết trong Git.\n- **Ví dụ**: Gõ `git worktree remove ../hotfix-folder` sau khi đã hoàn thành và merge nhánh hotfix.\n- **Đừng nhầm**: Tránh dùng lệnh xóa file thủ công của hệ điều hành vì sẽ để lại siêu dữ liệu rác đòi hỏi phải chạy `git worktree prune`.\n\n---\n\n## 📖 Định nghĩa\n`git worktree` là tính năng cho phép một kho lưu trữ Git duy nhất mở đồng thời nhiều thư mục làm việc độc lập trên ổ đĩa, mỗi thư mục gắn với một nhánh riêng mà không cần clone lại toàn bộ dự án.\n\n---\n\n## 💡 Tại sao cần\nKhi đang chạy dev server với nhiều file sửa dở mà cần xử lý gấp một nhánh khác, quy trình cũ bắt bạn phải tắt server, stash và chuyển nhánh. Với `git worktree`, bạn mở thêm một thư mục bên cạnh để làm song song mà không gián đoạn công việc hiện tại.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung bạn là kiến trúc sư trong căn phòng lớn có nhiều chiếc bàn vẽ cạnh nhau. Bàn số 1 bạn đang vẽ mặt tiền tòa nhà (nhánh feature), bàn số 2 bạn mở bản vẽ ống nước (nhánh hotfix). Bạn có thể bước qua lại giữa hai bàn bất cứ lúc nào mà không cần thu dọn bản vẽ.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nKiến trúc chia sẻ một kho chứa .git của Worktree:\n                   ┌──► Thư mục chính: /project (nhánh: main)\nKho chứa gốc:     │\n/project/.git ─────┼──► Thư mục phụ 1: /project-hotfix (nhánh: hotfix-login)\n(Chung dữ liệu!)   │\n                   └──► Thư mục phụ 2: /project-feature (nhánh: feat-ai)\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nKỹ sư Cường đang chạy thử tính năng thanh toán ở thư mục `my-app` thì được nhờ review gấp nhánh `review-pr-45`. Cường gõ `git worktree add ../pr-test review-pr-45`. Một thư mục mới xuất hiện ngay cạnh. Cường mở cửa sổ editor thứ hai để test, review xong thì xóa thư mục phụ mà không ảnh hưởng tới tiến trình đang chạy.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit worktree add <đường-dẫn-thư-mục> <tên-nhánh>\ngit worktree add -b <nhánh-mới> <đường-dẫn>\ngit worktree list\ngit worktree remove <đường-dẫn-thư-mục>\ngit worktree prune\n```\n\n---\n\n## 🔍 Giải thích command\n- `git worktree add <path> <branch>`: Mở một thư mục làm việc mới tại đường dẫn chỉ định liên kết với một nhánh có sẵn.\n- `git worktree add -b <new-branch> <path>`: Tạo luôn một nhánh mới và mở worktree tại thư mục chỉ định.\n- `git worktree list`: Liệt kê danh sách tất cả các thư mục worktree đang hoạt động kèm tên nhánh tương ứng.\n- `git worktree remove <path>`: Dọn dẹp và xóa bỏ an toàn một thư mục worktree sau khi sử dụng xong.\n- `git worktree prune`: Dọn dẹp thông tin rác của các worktree đã bị xóa thủ công trên đĩa.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Mở hai worktree trên cùng một nhánh**: Git sẽ ngăn chặn ngay lập tức để tránh làm hỏng lịch sử commit của nhánh đó.\n2. **Xóa thư mục bằng lệnh hệ điều hành**: Tự ý xóa thư mục bằng lệnh xóa file ngoài shell sẽ để lại tệp rác trong `.git/worktrees`, cần chạy `git worktree prune` để dọn.\n3. **Nhầm lẫn với clone mới**: Worktree dùng chung cơ sở dữ liệu `.git`, tiết kiệm dung lượng ổ cứng gấp nhiều lần so với việc clone lại cả dự án.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.\n1. Liệt kê danh sách worktree hiện tại bằng `git worktree list`.\n2. Tạo một worktree mới cho nhánh `demo-worktree` bằng lệnh `git worktree add ../temp-worktree -b demo-worktree`.\n3. Chạy `git worktree list` và quan sát hai đường dẫn thư mục cùng tồn tại trên máy.\n4. Dọn dẹp không gian thử nghiệm bằng lệnh `git worktree remove ../temp-worktree`.\n\n---\n\n## 💡 Hint & mẹo\n> Mỗi nhánh chỉ được phép gắn với duy nhất một thư mục worktree tại một thời điểm để bảo đảm an toàn dữ liệu.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Tạo, quản lý và dọn dẹp thành công các không gian làm việc song song bằng `git worktree`.\n- Hiểu rõ lợi thế về hiệu năng và dung lượng đĩa của worktree so với việc clone nhiều lần.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài kiểm tra trắc nghiệm dưới đây về tính năng đa thư mục git worktree.\n\n---\n\n## 🚀 Thử thách nâng cao\nSo sánh chi tiết về dung lượng ổ đĩa và tốc độ tạo lập giữa việc dùng `git worktree add` và `git clone` lại dự án sang thư mục mới.\n\n---\n\n## 📝 Tổng kết\n- `git worktree` cho phép đa nhiệm mở nhiều nhánh cùng lúc ở các thư mục khác nhau.\n- Chia sẻ chung kho `.git`, tiết kiệm thời gian clone và dung lượng đĩa cứng.\n- Dọn dẹp an toàn bằng `git worktree remove <path>`.\n",
  "quiz": {
    "id": "quiz-05-21-git-worktree",
    "title": "Trắc nghiệm: git worktree",
    "questions": [
      {
        "id": "q1",
        "question": "Lợi ích đột phá lớn nhất của `git worktree` so với việc chuyển nhánh (`git switch`) thông thường là gì?",
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
      },
      {
        "id": "q5",
        "question": "Câu lệnh nào sau đây dùng để tạo một worktree mới tại thư mục `../hotfix-dir` và gắn vào nhánh mới `hotfix-login`?",
        "type": "single",
        "options": [
          {
            "text": "git worktree add -b hotfix-login ../hotfix-dir",
            "correct": true
          },
          {
            "text": "git create worktree ../hotfix-dir hotfix-login",
            "correct": false
          },
          {
            "text": "git branch --worktree ../hotfix-dir hotfix-login",
            "correct": false
          },
          {
            "text": "git checkout -b hotfix-login --worktree ../hotfix-dir",
            "correct": false
          }
        ],
        "explanation": "Cú pháp `git worktree add -b <tên-nhánh-mới> <đường-dẫn>` vừa tạo nhánh mới vừa checkout ra thư mục worktree riêng biệt."
      }
    ]
  }
};
export default lesson;
