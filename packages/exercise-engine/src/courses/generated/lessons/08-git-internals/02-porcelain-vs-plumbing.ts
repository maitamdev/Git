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
  "content": "# Phân biệt Porcelain Commands vs Plumbing Commands\n\n---\n\n## 🎯 Mục tiêu bài học\n- Phân biệt rõ ràng giữa hai tầng câu lệnh trong Git: Porcelain (gốm sứ cao cấp) và Plumbing (ống nước ngầm).\n- Hiểu cách các lệnh Porcelain thân thiện (git add, git commit) phối hợp nhiều lệnh Plumbing bên dưới.\n- Làm quen với các lệnh Plumbing cơ bản: git hash-object, git cat-file, git update-index, git write-tree, git commit-tree.\n\n---\n\n## 📖 Định nghĩa\n> Trong thuật ngữ của Git, Porcelain (nghĩa đen là đồ sứ tráng men cao cấp) là nhóm các lệnh giao diện bậc cao, thân thiện và công thái học dành cho người dùng hàng ngày như git commit, git checkout, git pull. Ngược lại, Plumbing (nghĩa đen là hệ thống đường ống nước ngầm) là nhóm các lệnh bậc thấp được thiết kế để thực hiện các thao tác nguyên tử trực tiếp với cơ sở dữ liệu đối tượng của Git (như git hash-object, git cat-file, git write-tree).\n\n---\n\n## 🤔 Tại sao cần?\nCác lệnh Porcelain được thiết kế để thuận tiện cho con người, nhưng chúng ẩn giấu toàn bộ các bước xử lý nội bộ tinh vi. Khi bạn cần xây dựng các công cụ tự động hóa tùy biến, viết script tích hợp sâu, hoặc thực hiện các ca cứu hộ mã nguồn phức tạp mà lệnh bề mặt từ chối thực hiện, các lệnh Plumbing cung cấp cho bạn quyền kiểm soát phẫu thuật chính xác tới từng byte dữ liệu.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy tưởng tượng hệ thống cấp thoát nước trong một căn biệt thự sang trọng. Các thiết bị vệ sinh bằng sứ trắng muốt cao cấp như bồn rửa tay, vòi hoa sen tự động và bồn tắm massage chính là Porcelain: người sử dụng chỉ cần nhấn nút nhẹ nhàng để xả nước. Nhưng bên dưới sàn nhà là mạng lưới chằng chịt các đường ống dẫn nước bằng đồng, van áp suất và bơm thủy lực (Plumbing): chỉ có những người thợ sửa ống nước lành nghề mới can thiệp vào đây khi cần khắc phục rò rỉ.\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nHai tầng câu lệnh trong Git:\n┌────────────────────────────────────────────────────────┐\n│ PORCELAIN (Giao diện bậc cao - Thân thiện người dùng)  │\n│ git add | git commit | git branch | git merge | git log │\n└───────────────────────────┬────────────────────────────┘\n                            │ Phối hợp bên dưới\n                            ▼\n┌────────────────────────────────────────────────────────┐\n│ PLUMBING (Giao diện bậc thấp - Thao tác trực tiếp đĩa) │\n│ git hash-object | git cat-file | git update-index      │\n│ git write-tree  | git commit-tree | git rev-parse      │\n└───────────────────────────┬────────────────────────────┘\n                            │ Ghi trực tiếp\n                            ▼\n             [.git/objects/ và .git/refs/]\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKhi một lập trình viên gõ lệnh Porcelain quen thuộc: `git commit -m \"feat: login\"`, Git không thực hiện một hành động đơn nhất. Dưới nắp ca-pô, Git âm thầm kích hoạt một chuỗi các lệnh Plumbing: trước hết gọi `git write-tree` để quét toàn bộ Staging Area và đóng gói thành một đối tượng Tree; sau đó gọi `git commit-tree <tree-hash> -p <parent-hash> -m \"feat: login\"` để tạo ra đối tượng Commit; và cuối cùng gọi `git update-ref refs/heads/main <commit-hash>` để di chuyển con trỏ nhánh chính tới commit mới. Hiểu được chuỗi phối hợp này giúp kỹ sư có thể tự tay tạo ra commit mà không cần dùng đến git add hay git commit.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\ngit commit -m \"msg\"\ngit write-tree\ngit commit-tree\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nLệnh git commit là đại diện tiêu biểu của tầng Porcelain, trong khi git write-tree và git commit-tree là các lệnh Plumbing nguyên tử thao tác trực tiếp với dữ liệu nhị phân của Git.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Cố gắng sử dụng các lệnh Plumbing cho công việc lập trình thường nhật**:  Các lệnh này rất khó gõ và không có cơ chế bảo vệ an toàn như Porcelain.\n2. **Nghĩ rằng các lệnh Plumbing là công cụ bên ngoài không thuộc về Git**:  Chúng được cài đặt sẵn bên trong mã nguồn chính thức của Git từ ngày đầu tiên.\n3. **Quên truyền mã băm của commit cha (-p) khi gọi lệnh plumbing git commit-tree khiến lịch sử bị đứt gãy.**: \n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Chạy lệnh `git --help -a` và cuộn trang xuống phần \"Low-level Commands (Plumbing)\".\n2. Quan sát danh sách phong phú các lệnh thao tác đối tượng, chỉ mục và tham chiếu.\n3. Đối chiếu các lệnh Porcelain thường dùng hàng ngày với các lệnh Plumbing tương ứng bên dưới.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Bất kỳ thao tác nào bạn thực hiện bằng lệnh Porcelain đều có thể được tái hiện chính xác bằng cách xâu chuỗi các lệnh Plumbing.\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nPhân loại chính xác một lệnh Git bất kỳ thuộc nhóm Porcelain hay Plumbing.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nCùng làm bài kiểm tra về sự khác biệt giữa hai tầng câu lệnh Porcelain và Plumbing.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nTại sao Linus Torvalds lại thiết kế tầng Plumbing trước khi xây dựng tầng Porcelain trong những ngày đầu phát triển Git năm 2005?\n\n---\n\n## 📚 Tổng kết kiến thức\n- Porcelain là tầng lệnh bậc cao phục vụ trải nghiệm người dùng (`git add`, `git commit`, `git checkout`).\n- Plumbing là tầng lệnh bậc thấp thao tác nguyên tử với dữ liệu (`git hash-object`, `git write-tree`, `git cat-file`).\n- Mọi lệnh Porcelain thực chất là kịch bản phối hợp nhiều lệnh Plumbing bên dưới.\n",
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
        "explanation": "`git cat-file` là lệnh plumbing chuyên dụng để kiểm tra loại, kích thước và nội dung thô của một đối tượng Git."
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
        "explanation": "`git write-tree` đọc tệp `.git/index` và ghi ra cấu trúc cây thư mục nhị phân vào `.git/objects`."
      },
      {
        "id": "q4",
        "question": "Khi thực hiện lệnh Porcelain `git commit -m \"init\"`, Git âm thầm gọi những lệnh Plumbing nào bên dưới?",
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
      }
    ]
  }
};
export default lesson;
