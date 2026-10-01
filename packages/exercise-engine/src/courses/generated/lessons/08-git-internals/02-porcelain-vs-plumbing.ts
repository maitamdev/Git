import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "02-porcelain-vs-plumbing",
  "moduleId": "08-git-internals",
  "metadata": {
    "id": "02-porcelain-vs-plumbing",
    "title": "Phân biệt Porcelain Commands vs Plumbing Commands",
    "level": "advanced",
    "duration": 25,
    "xp": 85,
    "prerequisites": [
      "01-git-internals-intro"
    ],
    "objectives": [
      "Phân biệt rõ ràng giữa hai tầng câu lệnh trong Git: Porcelain (gốm sứ cao cấp) và Plumbing (ống nước ngầm).",
      "Hiểu cách các lệnh Porcelain thân thiện (git add, git commit) phối hợp nhiều lệnh Plumbing bên dưới.",
      "Làm quen với các lệnh Plumbing cơ bản: git hash-object, git cat-file, git update-index, git write-tree, git commit-tree."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "porcelain",
      "plumbing",
      "low level commands",
      "high level commands",
      "git architecture"
    ],
    "commands": [
      "git commit -m \"msg\"",
      "git write-tree",
      "git commit-tree"
    ]
  },
  "content": "# Phân biệt Porcelain Commands vs Plumbing Commands\n\n---\n\n## 🎯 Mục tiêu\n- Phân biệt rõ ràng giữa hai tầng câu lệnh trong Git: Porcelain (gốm sứ cao cấp) và Plumbing (ống nước ngầm).\n- Hiểu cách các lệnh Porcelain thân thiện (`git add`, `git commit`) phối hợp nhiều lệnh Plumbing bên dưới.\n- Làm quen với các lệnh Plumbing cơ bản: `git hash-object`, `git cat-file`, `git update-index`, `git write-tree`, `git commit-tree`.\n- Hiểu tại sao các công cụ tự động hóa và script luôn chọn Plumbing commands để đảm bảo tính ổn định.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Porcelain Commands\n- **Nói dễ hiểu**: Nhóm lệnh giao diện bậc cao, thân thiện và dễ nhớ dành cho người dùng thao tác hàng ngày.\n- **Ví dụ**: Các lệnh quen thuộc như `git add`, `git commit`, `git checkout`, `git branch`, `git status`.\n- **Đừng nhầm**: Không trực tiếp thao tác nguyên tử với ổ đĩa; đây là lớp vỏ bọc tổng hợp nhiều bước xử lý tầng thấp lại với nhau.\n\n### Plumbing Commands\n- **Nói dễ hiểu**: Nhóm lệnh bậc thấp hoạt động trực tiếp với cơ sở dữ liệu đối tượng và con trỏ bên trong thư mục `.git`.\n- **Ví dụ**: Các lệnh kỹ thuật như `git hash-object`, `git cat-file`, `git write-tree`, `git commit-tree`.\n- **Đừng nhầm**: Không dùng cho công việc commit code hàng ngày của lập trình viên; chủ yếu phục vụ viết script, plugin hoặc xử lý cứu hộ chuyên sâu.\n\n### Atomic Git Operations\n- **Nói dễ hiểu**: Các thao tác nguyên tử đơn lẻ mà mỗi lệnh Plumbing thực thi (ví dụ: chỉ ghi một blob, chỉ tạo một tree, hoặc chỉ trỏ lại một ref).\n- **Ví dụ**: Lệnh `git write-tree` chỉ làm đúng một việc duy nhất là biến staging area thành một đối tượng tree.\n- **Đừng nhầm**: Khác với lệnh Porcelain như `git commit` vừa kiểm tra index, vừa tạo tree, vừa tạo commit object, vừa cập nhật nhánh.\n\n---\n\n## 📖 Định nghĩa\nTrong thuật ngữ của Git, Porcelain (nghĩa đen là đồ sứ tráng men cao cấp) là nhóm các lệnh giao diện bậc cao, thân thiện và công thái học dành cho người dùng hàng ngày như `git commit`, `git checkout`, `git pull`. Ngược lại, Plumbing (nghĩa đen là hệ thống đường ống nước ngầm) là nhóm các lệnh bậc thấp được thiết kế để thực hiện các thao tác nguyên tử trực tiếp với cơ sở dữ liệu đối tượng của Git (như `git hash-object`, `git cat-file`, `git write-tree`).\n\n---\n\n## 💡 Tại sao cần\nCác lệnh Porcelain được thiết kế để thuận tiện cho con người, nhưng chúng ẩn giấu toàn bộ các bước xử lý nội bộ tinh vi. Khi bạn cần xây dựng các công cụ tự động hóa tùy biến, viết script tích hợp sâu, hoặc thực hiện các ca cứu hộ mã nguồn phức tạp mà lệnh bề mặt từ chối thực hiện, các lệnh Plumbing cung cấp cho bạn quyền kiểm soát phẫu thuật chính xác tới từng byte dữ liệu.\n\n---\n\n## 🧠 Mental Model\nHãy tưởng tượng hệ thống cấp thoát nước trong một căn biệt thự sang trọng. Các thiết bị vệ sinh bằng sứ trắng muốt cao cấp như bồn rửa tay, vòi hoa sen tự động và bồn tắm massage chính là Porcelain: người sử dụng chỉ cần nhấn nút nhẹ nhàng để xả nước. Nhưng bên dưới sàn nhà là mạng lưới chằng chịt các đường ống dẫn nước bằng đồng, van áp suất và bơm thủy lực (Plumbing): chỉ có những người thợ sửa ống nước lành nghề mới can thiệp vào đây khi cần khắc phục rò rỉ.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nHai tầng câu lệnh trong Git:\n┌────────────────────────────────────────────────────────┐\n│ PORCELAIN (Giao diện bậc cao - Thân thiện người dùng)  │\n│ git add | git commit | git branch | git merge | git log │\n└───────────────────────────┬────────────────────────────┘\n                            │ Phối hợp bên dưới\n                            ▼\n┌────────────────────────────────────────────────────────┐\n│ PLUMBING (Giao diện bậc thấp - Thao tác trực tiếp đĩa) │\n│ git hash-object | git cat-file | git update-index      │\n│ git write-tree  | git commit-tree | git rev-parse      │\n└───────────────────────────┬────────────────────────────┘\n                            │ Ghi trực tiếp\n                            ▼\n             [.git/objects/ và .git/refs/]\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nKhi một lập trình viên gõ lệnh Porcelain quen thuộc: `git commit -m \"feat: login\"`, Git không thực hiện một hành động đơn nhất. Dưới nắp ca-pô, Git âm thầm kích hoạt một chuỗi các lệnh Plumbing: trước hết gọi `git write-tree` để quét toàn bộ Staging Area và đóng gói thành một đối tượng Tree; sau đó gọi `git commit-tree <tree-hash> -p <parent-hash> -m \"feat: login\"` để tạo ra đối tượng Commit; và cuối cùng gọi `git update-ref refs/heads/main <commit-hash>` để di chuyển con trỏ nhánh chính tới commit mới. Hiểu được chuỗi phối hợp này giúp kỹ sư có thể tự tay tạo ra commit mà không cần dùng đến `git add` hay `git commit`.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\n# Lệnh Porcelain thông thường\ngit commit -m \"feat: login\"\n\n# Chuỗi các lệnh Plumbing tương đương bên dưới:\n# 1. Ghi cấu trúc Staging thành Tree object\nTREE_SHA=$(git write-tree)\n\n# 2. Tạo đối tượng Commit với thông điệp và commit cha\nCOMMIT_SHA=$(echo \"feat: login\" | git commit-tree $TREE_SHA -p HEAD)\n\n# 3. Cập nhật con trỏ nhánh hiện tại trỏ tới Commit mới\ngit update-ref HEAD $COMMIT_SHA\n```\n\n---\n\n## 🔍 Giải thích command\n- `git commit -m \"feat: login\"`: Lệnh Porcelain tiện dụng gộp cả 3 bước phân tích, đóng gói và di chuyển nhánh.\n- `git write-tree`: Lệnh Plumbing chuyển toàn bộ trạng thái trong `.git/index` thành một đối tượng Tree trong `.git/objects/` và trả về mã băm.\n- `git commit-tree`: Lệnh Plumbing tạo đối tượng Commit với metadata tác giả, ngày giờ, thông điệp và trỏ tới tree cùng commit cha.\n- `git update-ref`: Lệnh Plumbing cập nhật tham chiếu ref an toàn, tránh xung đột file đồng thời.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Cố gắng dùng Plumbing commands cho công việc thường ngày**: Lệnh Plumbing không có các kiểm tra cảnh báo an toàn và đòi hỏi gõ mã băm SHA-1 thủ công rất dễ nhầm lẫn.\n2. **Nghĩ rằng Plumbing commands là tiện ích cài ngoài**: Toàn bộ các lệnh này đều là thành phần cốt lõi có sẵn trong mọi bản cài đặt Git chính thức.\n3. **Quên truyền cờ `-p` khi chạy `git commit-tree`**: Nếu quên truyền commit cha, commit mới sẽ trở thành một root commit mồ côi không có lịch sử trước đó.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. **Bước 1**: Mở terminal và chạy lệnh `git help -a` để xem danh sách toàn bộ câu lệnh của Git.\n2. **Bước 2**: Cuộn xuống phần \"Low-level Commands / Plumbing\" để nhận diện các nhóm lệnh: Manipulators, Interrogators, Synching.\n3. **Bước 3**: Thử tạo một tệp tin `test.txt` với nội dung bất kỳ, chạy lệnh `git hash-object test.txt` và ghi lại mã băm hiển thị trên màn hình.\n4. **Bước 4**: Chạy `git cat-file -p <mã-băm>` để kiểm chứng Git có thể đọc trực tiếp nội dung đối tượng qua lệnh Plumbing hay không.\n\n---\n\n## 💡 Hint & mẹo\n> Bất kỳ thao tác nào bạn thực hiện bằng lệnh Porcelain đều có thể được tái hiện chính xác bằng cách xâu chuỗi các lệnh Plumbing. Đây là bí quyết các công cụ như VS Code hay GitKraken xây dựng tính năng Git tích hợp.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Lệnh `git hash-object` in ra chuỗi SHA-1 gồm 40 ký tự hexa.\n- Lệnh `git cat-file -p` in ra chính xác nội dung văn bản nguyên thủy của tệp tin.\n\n---\n\n## ❓ Quiz nhanh\nCùng làm bài kiểm tra về sự khác biệt giữa hai tầng câu lệnh Porcelain và Plumbing trong phần trắc nghiệm bên dưới.\n\n---\n\n## 🚀 Thử thách nâng cao\nTại sao Linus Torvalds lại thiết kế tầng Plumbing trước khi xây dựng tầng Porcelain trong những ngày đầu phát triển Git năm 2005? Điều này phản ánh triết lý Unix nào?\n\n---\n\n## 📝 Tổng kết\n- Porcelain là tầng lệnh bậc cao phục vụ trải nghiệm người dùng (`git add`, `git commit`, `git checkout`).\n- Plumbing là tầng lệnh bậc thấp thao tác nguyên tử với dữ liệu (`git hash-object`, `git write-tree`, `git cat-file`).\n- Mọi lệnh Porcelain thực chất là kịch bản phối hợp nhiều lệnh Plumbing bên dưới.\n- Hiểu Plumbing giúp làm chủ các kỹ thuật automation, viết hook và sửa lỗi hệ thống cấp sâu.\n",
  "quiz": {
    "id": "quiz-08-git-internals-02-porcelain-vs-plumbing",
    "title": "Trắc nghiệm: Phân biệt Porcelain Commands vs Plumbing Commands",
    "questions": [
      {
        "id": "q1",
        "question": "Lệnh nào sau đây thuộc nhóm Plumbing commands (lệnh bậc thấp) trong Git?",
        "type": "single",
        "options": [
          {
            "text": "git cat-file",
            "correct": true
          },
          {
            "text": "git commit",
            "correct": false
          },
          {
            "text": "git branch",
            "correct": false
          },
          {
            "text": "git clone",
            "correct": false
          }
        ],
        "explanation": "Lệnh git cat-file là lệnh plumbing chuyên dụng để kiểm tra loại, kích thước và nội dung thô của một đối tượng Git."
      },
      {
        "id": "q2",
        "question": "Thuật ngữ Porcelain (đồ sứ tráng men) trong Git được dùng để ẩn dụ cho điều gì?",
        "type": "single",
        "options": [
          {
            "text": "Giao diện dòng lệnh bậc cao bóng bẩy, tiện lợi và thân thiện với người dùng",
            "correct": true
          },
          {
            "text": "Phần cứng máy tính dễ vỡ nếu va đập",
            "correct": false
          },
          {
            "text": "Các tệp tin mã nguồn có màu trắng",
            "correct": false
          },
          {
            "text": "Một giao thức mạng truyền tải dữ liệu",
            "correct": false
          }
        ],
        "explanation": "Linus Torvalds ví von các lệnh giao diện người dùng như thiết bị vệ sinh bằng sứ sạch sẽ, che giấu đường ống nước bẩn bên dưới."
      },
      {
        "id": "q3",
        "question": "Lệnh Plumbing nào chịu trách nhiệm chuyển đổi nội dung của Staging Area thành một đối tượng Tree trên đĩa?",
        "type": "single",
        "options": [
          {
            "text": "git write-tree",
            "correct": true
          },
          {
            "text": "git make-tree",
            "correct": false
          },
          {
            "text": "git save-index",
            "correct": false
          },
          {
            "text": "git export-tree",
            "correct": false
          }
        ],
        "explanation": "Lệnh git write-tree đọc tệp .git/index và ghi ra cấu trúc cây thư mục nhị phân vào .git/objects."
      },
      {
        "id": "q4",
        "question": "Khi thực hiện lệnh Porcelain git commit -m 'init', Git âm thầm gọi những lệnh Plumbing nào bên dưới?",
        "type": "single",
        "options": [
          {
            "text": "git write-tree, git commit-tree, và git update-ref",
            "correct": true
          },
          {
            "text": "git push, git pull, và git fetch",
            "correct": false
          },
          {
            "text": "git clean, git reset, và git rm",
            "correct": false
          },
          {
            "text": "git format, git lint, và git compile",
            "correct": false
          }
        ],
        "explanation": "Quy trình tạo commit đòi hỏi đóng gói tree, tạo đối tượng commit chứa thông điệp và cập nhật con trỏ tham chiếu nhánh."
      },
      {
        "id": "q5",
        "question": "Tại sao các script tự động hóa thường ưu tiên sử dụng Plumbing commands thay vì Porcelain commands?",
        "type": "single",
        "options": [
          {
            "text": "Vì output của Plumbing commands có định dạng ổn định lâu dài (machine-readable) và không bị đổi theo phiên bản Git hay ngôn ngữ",
            "correct": true
          },
          {
            "text": "Vì Plumbing commands chạy nhanh hơn 100 lần",
            "correct": false
          },
          {
            "text": "Vì Porcelain commands chỉ chạy được trên macOS",
            "correct": false
          },
          {
            "text": "Vì Plumbing commands không yêu cầu quyền administrator",
            "correct": false
          }
        ],
        "explanation": "Porcelain commands được thiết kế cho con người đọc và có thể đổi định dạng hiển thị, trong khi Plumbing commands cam kết tính tương thích ngược và định dạng phân tích cú pháp ổn định cho script."
      }
    ]
  }
};
export default lesson;
