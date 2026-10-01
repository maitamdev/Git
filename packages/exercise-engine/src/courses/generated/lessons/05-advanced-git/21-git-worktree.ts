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
      "Mở thư mục làm việc riêng để xử lý nhánh khác mà không đổi nhánh trong thư mục hiện tại.",
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
      "git worktree add -b <nhánh-mới> <đường-dẫn-thư-mục>",
      "git worktree list",
      "git worktree remove <đường-dẫn-thư-mục>"
    ]
  },
  "content": "# git worktree\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ sự đột phá của tính năng `git worktree`: làm việc đồng thời trên nhiều nhánh ở nhiều thư mục khác nhau.\n- Mở một thư mục làm việc khác để xử lý nhánh khác mà không phải chuyển nhánh trong thư mục hiện tại.\n- Sử dụng `git worktree add` để mở một không gian làm việc song song chỉ trong vài giây.\n- Quản lý danh sách và dọn dẹp an toàn các worktree bằng `git worktree list` và `git worktree remove`.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Git Worktree\n- **Nói dễ hiểu**: Tính năng mở đồng thời nhiều thư mục làm việc trên đĩa cứng gắn với các nhánh khác nhau mà dùng chung một kho `.git`.\n- **Ví dụ**: Dùng `git worktree add ../hotfix-folder hotfix-branch` để mở nhanh một nhánh hotfix ở thư mục riêng mà không cần stash code dở.\n- **Đừng nhầm**: Không phải là tạo clone mới tốn dung lượng; các worktree chia sẻ chung toàn bộ commit history và object trong `.git`.\n\n### Worktree List (git worktree list)\n- **Nói dễ hiểu**: Lệnh xem danh sách toàn bộ các thư mục worktree đang hoạt động kèm tên nhánh tương ứng trên máy tính.\n- **Ví dụ**: Chạy `git worktree list` để kiểm tra đường dẫn các thư mục phụ trợ trước khi dọn dẹp.\n- **Đừng nhầm**: Mặc định Git từ chối checkout cùng một nhánh trong hai worktree cùng lúc; đừng bỏ qua bảo vệ này nếu chưa hiểu hệ quả.\n\n### Worktree Remove (git worktree remove)\n- **Nói dễ hiểu**: Lệnh chuẩn mực để xóa một thư mục worktree và dọn sạch siêu dữ liệu quản lý liên kết trong Git.\n- **Ví dụ**: Gõ `git worktree remove ../hotfix-folder` sau khi đã hoàn thành và merge nhánh hotfix.\n- **Đừng nhầm**: Tránh dùng lệnh xóa file thủ công của hệ điều hành vì sẽ để lại siêu dữ liệu rác đòi hỏi phải chạy `git worktree prune`.\n\n---\n\n## 📖 Định nghĩa\n`git worktree` cho phép một kho Git có nhiều thư mục làm việc gắn với cùng dữ liệu commit. Mỗi worktree có `HEAD` và index riêng; mặc định Git không cho cùng một branch được mở đồng thời ở hai worktree. Simulator chỉ ghi nhận danh sách worktree, không tạo thư mục hay cho sửa từng cây file độc lập.\n\n---\n\n## 💡 Tại sao cần\nKhi đang chạy dev server với nhiều file sửa dở mà cần xử lý gấp một nhánh khác, quy trình cũ bắt bạn phải tắt server, stash và chuyển nhánh. Với `git worktree`, bạn mở thêm một thư mục bên cạnh để làm song song mà không gián đoạn công việc hiện tại.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung bạn là kiến trúc sư trong căn phòng lớn có nhiều chiếc bàn vẽ cạnh nhau. Bàn số 1 bạn đang vẽ mặt tiền tòa nhà (nhánh feature), bàn số 2 bạn mở bản vẽ ống nước (nhánh hotfix). Bạn có thể bước qua lại giữa hai bàn bất cứ lúc nào mà không cần thu dọn bản vẽ.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nKiến trúc chia sẻ một kho chứa .git của Worktree:\n                   ┌──► Thư mục chính: /project (nhánh: main)\nKho chứa gốc:     │\n/project/.git ─────┼──► Thư mục phụ 1: /project-hotfix (nhánh: hotfix-login)\n(Chung dữ liệu!)   │\n                   └──► Thư mục phụ 2: /project-feature (nhánh: feat-ai)\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nKỹ sư Cường đang chạy thử tính năng thanh toán ở thư mục `my-app` thì được nhờ review gấp nhánh `review-pr-45`. Trong Git thật, nếu repo đã có commit và nhánh tồn tại, Cường chạy `git worktree add ../pr-test review-pr-45`. Git tạo thư mục làm việc riêng để review; trước khi remove, Cường kiểm tra đã lưu hoặc bỏ các thay đổi cần giữ.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit worktree add <đường-dẫn-thư-mục> <nhánh-đã-có>\ngit worktree add -b <nhánh-mới> <đường-dẫn-thư-mục>\ngit worktree list\ngit worktree remove <đường-dẫn-thư-mục>\n```\n\nTrong Git thật, dùng `git worktree prune` để dọn metadata của thư mục worktree đã bị xóa ngoài Git. Lệnh này chưa được mô phỏng trong khóa học.\n\n---\n\n## 🔍 Giải thích command\n- `git worktree add <path> <branch>`: Mở worktree cho nhánh đã có.\n- `git worktree add -b <new-branch> <path>`: Tạo nhánh mới từ `HEAD` rồi mở worktree ở đường dẫn chỉ định.\n- `git worktree list`: Liệt kê danh sách tất cả các thư mục worktree đang hoạt động kèm tên nhánh tương ứng.\n- `git worktree remove <path>`: Dọn dẹp và xóa bỏ an toàn một thư mục worktree sau khi sử dụng xong.\n- Simulator hiện lưu metadata add/list/remove; để thực sự mở hai thư mục và sửa chúng song song, hãy dùng Git thật trong repo riêng.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Mở hai worktree trên cùng một nhánh**: Mặc định Git từ chối việc này để tránh hai thư mục cùng di chuyển một con trỏ nhánh.\n2. **Xóa thư mục bằng lệnh hệ điều hành**: Tự ý xóa thư mục bằng lệnh xóa file ngoài shell sẽ để lại tệp rác trong `.git/worktrees`, cần chạy `git worktree prune` để dọn.\n3. **Xóa worktree khi còn thay đổi**: Git thật từ chối remove worktree chưa sạch nếu không có `--force`; kiểm tra hoặc lưu công việc trước khi dọn.\n\n---\n\n## 🧪 Lab thực hành\nTrước hết chạy lab trong simulator; lab này kiểm tra danh sách metadata, không mở thư mục thật.\n1. Chạy `git worktree list` để xem worktree hiện tại.\n2. Chạy `git worktree add -b demo-worktree ../temp-worktree`.\n3. Chạy `git worktree list`, xác nhận có nhánh `demo-worktree` và đường dẫn `../temp-worktree`.\n4. Chạy `git worktree remove ../temp-worktree`, rồi `git worktree list` để xác nhận mục phụ đã biến mất.\n5. Muốn thử thao tác song song thực tế, dùng Git thật trong repo riêng đã có ít nhất một commit. Chạy `git worktree add -b demo-worktree ../temp-worktree`, mở đường dẫn mới ở terminal thứ hai, rồi kiểm tra `git status` riêng ở mỗi thư mục. Dọn worktree phụ khi đã lưu những thay đổi cần giữ.\n\n---\n\n## 💡 Hint & mẹo\n> Mặc định mỗi nhánh chỉ được checkout ở một worktree tại một thời điểm; worktree detached là một trường hợp khác.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Simulator liệt kê và xóa đúng metadata worktree thử nghiệm.\n- Trong Git thật, mỗi worktree có thư mục file riêng nhưng chia sẻ object database của repository; nó không phải clone độc lập.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài kiểm tra trắc nghiệm dưới đây về tính năng đa thư mục git worktree.\n\n---\n\n## 🚀 Thử thách nâng cao\nSo sánh chi tiết về dung lượng ổ đĩa và tốc độ tạo lập giữa việc dùng `git worktree add` và `git clone` lại dự án sang thư mục mới.\n\n---\n\n## 📝 Tổng kết\n- `git worktree` cho phép đa nhiệm mở nhiều nhánh cùng lúc ở các thư mục khác nhau.\n- Chia sẻ chung kho `.git`, tiết kiệm thời gian clone và dung lượng đĩa cứng.\n- Dọn dẹp an toàn bằng `git worktree remove <path>`.\n",
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
            "text": "Mặc định Git từ chối vì nhánh đó đã được checkout ở worktree khác",
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
