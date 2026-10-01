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
      "Phân biệt mục đích của Porcelain và Plumbing; biết dùng output dành cho máy như git status --porcelain trong script.",
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
      "git write-tree",
      "git status --porcelain"
    ]
  },
  "content": "# Phân biệt Porcelain Commands vs Plumbing Commands\n\n---\n\n## 🎯 Mục tiêu\n- Phân biệt rõ ràng giữa hai tầng câu lệnh trong Git: Porcelain (gốm sứ cao cấp) và Plumbing (ống nước ngầm).\n- Hiểu cách các lệnh Porcelain thân thiện (`git add`, `git commit`) phối hợp nhiều lệnh Plumbing bên dưới.\n- Làm quen với các lệnh Plumbing cơ bản: `git hash-object`, `git cat-file`, `git update-index`, `git write-tree`, `git commit-tree`.\n- Biết vì sao lệnh Plumbing thường hữu ích trong script, đồng thời kiểm tra output có định dạng dành cho máy khi dùng lệnh Porcelain.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Porcelain Commands\n- **Nói dễ hiểu**: Nhóm lệnh giao diện bậc cao, thân thiện và dễ nhớ dành cho người dùng thao tác hàng ngày.\n- **Ví dụ**: Các lệnh quen thuộc như `git add`, `git commit`, `git checkout`, `git branch`, `git status`.\n- **Đừng nhầm**: Không trực tiếp thao tác nguyên tử với ổ đĩa; đây là lớp vỏ bọc tổng hợp nhiều bước xử lý tầng thấp lại với nhau.\n\n### Plumbing Commands\n- **Nói dễ hiểu**: Nhóm lệnh bậc thấp hoạt động trực tiếp với cơ sở dữ liệu đối tượng và con trỏ bên trong thư mục `.git`.\n- **Ví dụ**: Các lệnh kỹ thuật như `git hash-object`, `git cat-file`, `git write-tree`, `git commit-tree`.\n- **Đừng nhầm**: Không dùng cho công việc commit code hàng ngày của lập trình viên; chủ yếu phục vụ viết script, plugin hoặc xử lý cứu hộ chuyên sâu.\n\n### Lệnh cấp thấp (plumbing)\n- **Nói dễ hiểu**: Các lệnh chuyên biệt cho thao tác hoặc truy vấn một phần của mô hình nội bộ Git.\n- **Ví dụ**: `git cat-file` đọc object; `git write-tree` tạo tree từ index; `git update-ref` cập nhật ref.\n- **Đừng nhầm**: “Plumbing” mô tả vai trò cấp thấp, không có nghĩa mọi lệnh đều chỉ ghi trực tiếp xuống đĩa hoặc đều là một giao dịch nguyên tử.\n\n---\n\n## 📖 Định nghĩa\nTrong thuật ngữ Git, Porcelain là nhóm lệnh hướng tới trải nghiệm người dùng như `git commit`, `git switch`, `git pull`; Plumbing là nhóm lệnh cấp thấp, thường phù hợp để script truy vấn hoặc thao tác object, index và refs. Ranh giới không có nghĩa mọi porcelain chỉ là “lớp vỏ” gọi đúng một chuỗi lệnh plumbing có thể thay thế y hệt.\n\n---\n\n## 💡 Tại sao cần\nLệnh cấp thấp hữu ích khi bạn cần đọc object, tạo tree hoặc thao tác refs trong script. Tuy vậy, với script dùng lệnh quen thuộc như `git status`, hãy yêu cầu định dạng ổn định dành cho máy bằng `--porcelain`; đừng phân tích output mặc định được thiết kế để người dùng đọc.\n\n---\n\n## 🧠 Mental Model\nHãy tưởng tượng hệ thống cấp thoát nước trong một căn biệt thự sang trọng. Các thiết bị vệ sinh bằng sứ trắng muốt cao cấp như bồn rửa tay, vòi hoa sen tự động và bồn tắm massage chính là Porcelain: người sử dụng chỉ cần nhấn nút nhẹ nhàng để xả nước. Nhưng bên dưới sàn nhà là mạng lưới chằng chịt các đường ống dẫn nước bằng đồng, van áp suất và bơm thủy lực (Plumbing): chỉ có những người thợ sửa ống nước lành nghề mới can thiệp vào đây khi cần khắc phục rò rỉ.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nHai tầng câu lệnh trong Git:\n┌────────────────────────────────────────────────────────┐\n│ PORCELAIN (Giao diện bậc cao - Thân thiện người dùng)  │\n│ git add | git commit | git branch | git merge | git log │\n└───────────────────────────┬────────────────────────────┘\n                            │ Phối hợp bên dưới\n                            ▼\n┌────────────────────────────────────────────────────────┐\n│ PLUMBING (Lệnh cấp thấp - truy vấn/thao tác mô hình Git)│\n│ git hash-object | git cat-file | git update-index      │\n│ git write-tree  | git commit-tree | git rev-parse      │\n└───────────────────────────┬────────────────────────────┘\n                            │ Ghi trực tiếp\n                            ▼\n             [.git/objects/ và .git/refs/]\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nMột cách học mô hình commit là quan sát các việc cần xảy ra: index được chuyển thành tree, commit mới trỏ tới tree và commit cha, rồi branch ref được cập nhật. Các lệnh plumbing như `git write-tree`, `git commit-tree` và `git update-ref` cho thấy những thành phần này, nhưng không nên khẳng định `git commit` luôn chạy đúng chuỗi tiến trình đó ở mọi phiên bản Git.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\n# Lệnh Porcelain thông thường\ngit commit -m \"feat: login\"\n\n# Xem tree mà index hiện tại tạo ra; lệnh này ghi một object nhưng không tạo commit\ngit write-tree\n\n# Đọc loại object vừa tạo bằng mã được in ở lệnh trên\ngit cat-file -t <tree-object-id>\n```\nKhông chạy `git update-ref` trên nhánh đang làm việc chỉ để thử nghiệm: lệnh đó có thể di chuyển ref. Bài này chỉ quan sát tree; bài capstone sẽ thực hành tạo commit trong repository tạm.\n\n---\n\n## 🔍 Giải thích command\n- `git commit -m \"feat: login\"`: Lệnh Porcelain tạo commit từ nội dung đã stage, thường gồm tree, metadata commit và cập nhật branch ref.\n- `git write-tree`: Lệnh Plumbing chuyển toàn bộ trạng thái trong `.git/index` thành một đối tượng Tree trong `.git/objects/` và trả về mã băm.\n- `git commit-tree`: Lệnh Plumbing tạo đối tượng Commit với metadata tác giả, ngày giờ, thông điệp và trỏ tới tree cùng commit cha.\n- `git update-ref`: Lệnh Plumbing cập nhật tham chiếu ref an toàn, tránh xung đột file đồng thời.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Dùng mọi output Porcelain làm dữ liệu cho script**: Output mặc định thường dành cho người đọc; dùng tùy chọn định dạng máy như `git status --porcelain` hoặc lệnh phù hợp.\n2. **Nghĩ rằng Plumbing commands là tiện ích cài ngoài**: Toàn bộ các lệnh này đều là thành phần cốt lõi có sẵn trong mọi bản cài đặt Git chính thức.\n3. **Quên truyền cờ `-p` khi chạy `git commit-tree`**: Nếu quên truyền commit cha, commit mới sẽ trở thành một root commit mồ côi không có lịch sử trước đó.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. **Bước 1**: Mở terminal và chạy lệnh `git help -a` để xem danh sách toàn bộ câu lệnh của Git.\n2. **Bước 2**: Cuộn xuống phần \"Low-level Commands / Plumbing\" để nhận diện các nhóm lệnh: Manipulators, Interrogators, Synching.\n3. **Bước 3**: Thử tạo một tệp tin `test.txt` với nội dung bất kỳ, chạy lệnh `git hash-object test.txt` và ghi lại mã băm hiển thị trên màn hình.\n4. **Bước 4**: Chạy `git cat-file -p <mã-băm>` để kiểm chứng Git có thể đọc trực tiếp nội dung đối tượng qua lệnh Plumbing hay không.\n\n---\n\n## 💡 Hint & mẹo\n> Plumbing cung cấp các lệnh cấp thấp có ích cho script và chẩn đoán. Công cụ giao diện có thể dùng Git CLI, thư viện Git hoặc giao thức khác; không nên giả định mọi thao tác Porcelain có thể thay thế y hệt bằng một chuỗi lệnh plumbing.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Lệnh `git hash-object` in ra object ID; repo SHA-1 thường có 40 ký tự hexa, repo SHA-256 có 64.\n- Lệnh `git cat-file -p` in ra chính xác nội dung văn bản nguyên thủy của tệp tin.\n\n---\n\n## ❓ Quiz nhanh\nCùng làm bài kiểm tra về sự khác biệt giữa hai tầng câu lệnh Porcelain và Plumbing trong phần trắc nghiệm bên dưới.\n\n---\n\n## 🚀 Thử thách nâng cao\nHãy nêu một tác vụ phù hợp với Porcelain và một tác vụ phù hợp với Plumbing. Với script cần đọc trạng thái thay đổi, giải thích vì sao `git status --porcelain` an toàn hơn việc phân tích output mặc định.\n\n---\n\n## 📝 Tổng kết\n- Porcelain là tầng lệnh bậc cao phục vụ trải nghiệm người dùng (`git add`, `git commit`, `git checkout`).\n- Plumbing là tầng lệnh bậc thấp thao tác nguyên tử với dữ liệu (`git hash-object`, `git write-tree`, `git cat-file`).\n- Porcelain và Plumbing là các lớp giao diện khác nhau; không phải mọi porcelain đều chỉ là chuỗi plumbing có thể thay thế chính xác.\n- Hiểu Plumbing giúp làm chủ các kỹ thuật automation, viết hook và sửa lỗi hệ thống cấp sâu.\n",
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
        "explanation": "Lệnh plumbing thường có giao diện phù hợp cho script; một số porcelain cũng có chế độ máy ổn định, như `git status --porcelain`, nên cần chọn đúng chế độ thay vì phân tích văn bản mặc định."
      }
    ]
  }
};
export default lesson;
