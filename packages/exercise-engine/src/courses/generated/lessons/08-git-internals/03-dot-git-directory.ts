import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "03-dot-git-directory",
  "moduleId": "08-git-internals",
  "metadata": {
    "id": "03-dot-git-directory",
    "title": "Khám phá cấu trúc bên trong thư mục .git",
    "level": "advanced",
    "duration": 30,
    "xp": 90,
    "prerequisites": [
      "02-porcelain-vs-plumbing"
    ],
    "objectives": [
      "Nhận biết Git directory và cách Git tìm đường dẫn metadata thực tế.",
      "Hiểu rõ chức năng của từng thành phần: HEAD, config, description, index, objects/, refs/, hooks/, info/.",
      "Biết dùng lệnh Git để xem HEAD, remote và index mà không phụ thuộc vào vị trí file .git."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "dot git directory",
      "HEAD",
      "config",
      "index",
      "objects",
      "refs",
      "hooks"
    ],
    "commands": [
      "git rev-parse --git-dir",
      "git rev-parse --git-path HEAD",
      "git ls-files --stage"
    ]
  },
  "content": "# Khám phá cấu trúc bên trong thư mục .git\n\n---\n\n## 🎯 Mục tiêu\n- Giải mã toàn bộ các tệp tin và thư mục cốt lõi bên trong thư mục quản trị `.git/`.\n- Hiểu rõ chức năng của từng thành phần: `HEAD`, `config`, `description`, `index`, `objects/`, `refs/`, `hooks/`, `info/`.\n- Nhận thức rằng Git directory có thể là thư mục riêng hoặc được trỏ tới bởi file `.git`, tùy kiểu repo/worktree.\n- Biết dùng lệnh Git để xem metadata; tránh sửa trực tiếp file nội bộ khi chưa hiểu ảnh hưởng.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### HEAD Reference File\n- **Nói dễ hiểu**: Tệp văn bản thuần ASCII nằm tại `.git/HEAD` ghi lại con trỏ hiện tại đang kiểm xuất (checkout) nhánh nào hoặc commit nào.\n- **Ví dụ**: Khi HEAD đang gắn với nhánh `main`, `git symbolic-ref HEAD` in `refs/heads/main`.\n- **Đừng nhầm**: Không phải file nhị phân; bạn hoàn toàn có thể dùng lệnh `cat` hoặc text editor để xem nội dung bên trong.\n\n### Local Repository Config (.git/config)\n- **Nói dễ hiểu**: Tệp cấu hình dạng INI lưu trữ toàn bộ thiết lập cụ thể cho riêng repository hiện tại (như URL remote, tracking branch).\n- **Ví dụ**: Khối `[remote \"origin\"] url = https://github.com/owner/repo.git` khai báo URL remote; phương thức xác thực được cấu hình riêng.\n- **Đừng nhầm**: Không ghi đè vĩnh viễn cấu hình toàn cục `~/.gitconfig`; cấu hình cục bộ chỉ có hiệu lực trong phạm vi repo này và có độ ưu tiên cao hơn.\n\n### Binary Staging Index (.git/index)\n- **Nói dễ hiểu**: Index là cấu trúc dữ liệu nhị phân lưu trạng thái đã stage cùng metadata cần thiết; vị trí của nó được Git xác định cho worktree hiện tại.\n- **Ví dụ**: Khi gõ `git add file.txt`, Git cập nhật entry cho `file.txt` trong index với object ID của nội dung đã stage.\n- **Đừng nhầm**: Không phải tệp văn bản đọc được bằng `cat`; cần dùng lệnh plumbing `git ls-files --stage` để kiểm tra.\n\n---\n\n## 📖 Định nghĩa\nGit directory chứa metadata của repository như HEAD, refs, index và object database. Trong linked worktree hoặc submodule, mục `.git` ở gốc worktree có thể là file chỉ đường tới Git directory; bare repository không có worktree. Nếu xóa nhầm Git directory thật, bạn có thể mất metadata/lịch sử cục bộ, nên không sửa/xóa thủ công khi chưa có bản sao an toàn.\n\n---\n\n## 🤔 Tại sao cần?\nHiểu các thành phần nội bộ giúp bạn đọc trạng thái repo và chẩn đoán vấn đề. Dùng lệnh như `git remote -v`, `git symbolic-ref HEAD` và `git ls-files --stage` thay vì sửa tay config, HEAD hoặc index. Cách bố trí thay đổi theo bare repo, submodule và linked worktree nên hãy hỏi Git đường dẫn thực tế.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung thư mục dự án của bạn như một văn phòng làm việc. Toàn bộ các bàn ghế, máy tính và tài liệu trên bàn là Working Directory (nơi bạn làm việc hàng ngày). Còn thư mục `.git/` chính là căn phòng lưu trữ hồ sơ tài liệu mật nằm ở góc phòng: có tủ đựng hồ sơ lịch sử (`objects/`), bảng danh bạ nhân viên (`config`), chiếc bảng ghim vị trí công việc hiện tại (`HEAD`), và ngăn kéo chứa các bản thảo chờ đóng dấu (`index`).\n\n---\n\n## 🖼 Sơ đồ\n```text\nCấu trúc giải phẫu thư mục .git/:\n.git/\n├── HEAD              <── Tệp văn bản trỏ tới branch hiện hành (ref: refs/heads/main)\n├── config            <── Tệp cấu hình cục bộ của kho lưu trữ (remotes, user)\n├── description       <── Tệp mô tả dự án dùng cho GitWeb\n├── index             <── Tệp nhị phân Staging Area (lưu cache của cây thư mục)\n├── objects/          <── Cơ sở dữ liệu đối tượng (Object Store: xx/yyyyzz)\n│   ├── info/\n│   └── pack/         <── Chứa các tệp nén packfiles và chỉ mục index\n├── refs/             <── Danh mục các con trỏ tham chiếu\n│   ├── heads/        <── Nhánh cục bộ (main, feature)\n│   ├── tags/         <── Thẻ phiên bản (v1.0.0)\n│   └── remotes/      <── Nhánh theo dõi từ xa (origin/main)\n└── hooks/            <── Kịch bản tự động kích hoạt trước/sau sự kiện\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột clone có thư mục mã nguồn nhỏ nhưng Git directory lớn. `git count-objects -v` cho thấy dữ liệu đã nằm trong packfile; một file lớn từng được commit vẫn chiếm chỗ nếu commit còn trong lịch sử, dù file đã bị xóa ở commit mới hơn. Giảm dung lượng thường cần viết lại lịch sử bằng công cụ chuyên dụng, phối hợp với nhóm và dọn object sau đó; không có mức giảm cố định và việc viết lại làm đổi commit ID.\n\n---\n\n## 💻 Command\n```bash\n# Xem Git directory thực tế\ngit rev-parse --git-dir\n\n# Hỏi Git đường dẫn các thành phần quản trị\ngit rev-parse --git-path config\ngit rev-parse --git-path HEAD\ngit rev-parse --git-path index\ngit rev-parse --git-path objects\n\n# Dùng lệnh chuyên biệt để đọc thông tin, không sửa file nội bộ trực tiếp\ngit remote -v\ngit symbolic-ref -q HEAD\ngit ls-files --stage\n```\n\n---\n\n## 🔍 Giải thích command\n- `git rev-parse --git-dir`: In Git directory; có thể khác thư mục `.git` nhìn thấy ở gốc worktree.\n- `git rev-parse --git-path <path>`: Hỏi Git vị trí hiệu lực của từng tệp/thư mục metadata.\n- `git remote -v`: Đọc danh sách remote và URL bằng lệnh Porcelain.\n- `git symbolic-ref -q HEAD`: In ref mà HEAD trỏ tới khi đang ở branch; detached HEAD không có symbolic branch.\n- `git ls-files --stage`: Xem entry của index, gồm mode, object ID và stage.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Xóa nhầm Git directory khi muốn dọn dẹp**: Có thể làm mất metadata, lịch sử và nhánh chưa đẩy; trước khi thao tác phải xác định đúng đường dẫn và có bản sao lưu.\n2. **Commit nhầm thư mục `.git/` của repo con vào repo cha**: Gây ra tình trạng repo lồng nhau bị lỗi (corrupted submodule indicator).\n3. **Chỉnh sửa tệp nhị phân `.git/index` bằng text editor**: Định dạng nhị phân sẽ bị hỏng khiến lệnh `git status` báo lỗi index corrupted.\n\n---\n\n## 🧪 Lab\nHãy mở terminal và cùng tôi thực hành từng bước dưới đây để làm chủ kỹ năng:\n\n1. Chạy `git rev-parse --git-dir` và ghi lại Git directory.\n2. Chạy `git symbolic-ref -q HEAD`; nếu lệnh không in kết quả, chạy `git rev-parse HEAD` để nhận diện detached HEAD.\n3. Chạy `git remote -v` và `git ls-files --stage` để xem remote và trạng thái index bằng các lệnh hỗ trợ.\n4. Tạo nhánh thử `git branch feature-test`, xác minh bằng `git show-ref --verify refs/heads/feature-test`, rồi xóa nhánh thử bằng `git branch -d feature-test` nếu đã tạo thành công.\n\n---\n\n## 💡 Hint\n> `.git/HEAD` thường là symbolic ref dạng văn bản khi đang trên branch, nhưng linked worktree có Git directory riêng. Dùng `git symbolic-ref` và `git rev-parse` để tránh phụ thuộc vào vị trí file.\n\n---\n\n## ✅ Validation\n- `git symbolic-ref -q HEAD` trả tên ref khi HEAD đang gắn với branch; `git rev-parse HEAD` trả object ID của commit hiện tại.\n- `git show-ref --verify refs/heads/feature-test` xác minh nhánh thử tồn tại; không cần dựa vào file ref riêng vì refs có thể được pack.\n\n---\n\n## ❓ Quiz\nHãy kiểm tra mức độ nắm bắt của bạn về giải phẫu thư mục .git qua bài trắc nghiệm trong phần bên dưới.\n\n---\n\n## 🔥 Challenge\nVì sao không nên sao chép thủ công riêng `.git/` để làm bản sao lưu? Nêu một lựa chọn an toàn hơn và giải thích khác biệt giữa Git directory với worktree.\n\n---\n\n## 📚 Tổng kết\n- Thư mục `.git/` chứa toàn bộ lịch sử, đối tượng và siêu dữ liệu của kho lưu trữ.\n- Các tệp quan trọng gồm: `HEAD` (con trỏ hiện tại), `config` (cấu hình), `index` (staging area).\n- Các thư mục quan trọng gồm: `objects/` (database), `refs/` (nhánh và tag), `hooks/` (kịch bản tự động).\n- Hiểu cấu trúc `.git/` giúp bạn tự tin sao lưu, di chuyển và sửa lỗi kho lưu trữ khi gặp sự cố.\n",
  "quiz": {
    "id": "quiz-08-git-internals-03-dot-git-directory",
    "title": "Trắc nghiệm: Khám phá cấu trúc bên trong thư mục .git",
    "questions": [
      {
        "id": "q1",
        "question": "Tệp .git/HEAD thường chứa nội dung có định dạng như thế nào khi bạn đang ở trên nhánh main?",
        "type": "single",
        "options": [
          {
            "text": "Thường là một symbolic ref tới refs/heads/main; xác minh bằng git symbolic-ref HEAD",
            "correct": true
          },
          {
            "text": "Dãy số nhị phân không đọc được",
            "correct": false
          },
          {
            "text": "Tên tài khoản GitHub của bạn",
            "correct": false
          },
          {
            "text": "Mã băm commit của lần đầu tiên tạo repo",
            "correct": false
          }
        ],
        "explanation": "Khi ở trên branch, HEAD thường là symbolic ref trỏ tới refs/heads/<branch>; detached HEAD trỏ trực tiếp tới object ID."
      },
      {
        "id": "q2",
        "question": "Thư mục nào bên trong .git/ chịu trách nhiệm lưu trữ tất cả các đối tượng Blob, Tree, Commit và Tag?",
        "type": "single",
        "options": [
          {
            "text": ".git/objects/",
            "correct": true
          },
          {
            "text": ".git/refs/",
            "correct": false
          },
          {
            "text": ".git/hooks/",
            "correct": false
          },
          {
            "text": ".git/logs/",
            "correct": false
          }
        ],
        "explanation": "Thư mục objects/ là nơi cư ngụ của Object Database, lưu trữ mọi đối tượng nén bằng thuật toán zlib."
      },
      {
        "id": "q3",
        "question": "Tệp .git/index đại diện cho thành phần kiến trúc nào mà người dùng hay thao tác?",
        "type": "single",
        "options": [
          {
            "text": "Staging Area (vùng chuẩn bị commit)",
            "correct": true
          },
          {
            "text": "Thư mục thùng rác Recycle Bin",
            "correct": false
          },
          {
            "text": "Danh sách các mật khẩu đã lưu",
            "correct": false
          },
          {
            "text": "Chỉ mục tìm kiếm của Google",
            "correct": false
          }
        ],
        "explanation": "Index là cấu trúc nhị phân lưu các entry đã stage, gồm đường dẫn, mode và object ID; hash algorithm phụ thuộc định dạng repo."
      },
      {
        "id": "q4",
        "question": "Điều gì sẽ xảy ra nếu một lập trình viên xóa bỏ hoàn toàn thư mục .git/ khỏi dự án của họ?",
        "type": "single",
        "options": [
          {
            "text": "Mã nguồn hiện tại vẫn còn trên đĩa, nhưng toàn bộ lịch sử commit, nhánh và cấu hình Git đều bị xóa sạch",
            "correct": true
          },
          {
            "text": "Toàn bộ máy tính sẽ bị cài lại hệ điều hành",
            "correct": false
          },
          {
            "text": "Các tệp tin mã nguồn tự động biến mất ngay lập tức",
            "correct": false
          },
          {
            "text": "Không có gì thay đổi vì Git lưu dữ liệu ở đám mây",
            "correct": false
          }
        ],
        "explanation": "Working Directory vẫn còn nguyên, nhưng dự án đã mất đi toàn bộ khả năng theo dõi lịch sử vì linh hồn .git/ đã mất."
      },
      {
        "id": "q5",
        "question": "Tệp tin cấu hình .git/config lưu trữ những thông tin nào sau đây?",
        "type": "single",
        "options": [
          {
            "text": "Cấu hình riêng của repository như remote URLs, tracking branches, và email/name cục bộ",
            "correct": true
          },
          {
            "text": "Mật khẩu tài khoản ngân hàng của lập trình viên",
            "correct": false
          },
          {
            "text": "Mã nguồn ứng dụng đã biên dịch thành mã máy",
            "correct": false
          },
          {
            "text": "Toàn bộ nội dung của tệp .gitignore",
            "correct": false
          }
        ],
        "explanation": "Git config cục bộ lưu thiết lập của repository như remote hoặc user; linked worktree và cấu hình nhiều cấp có thể có thêm tệp/giá trị khác."
      }
    ]
  }
};
export default lesson;
