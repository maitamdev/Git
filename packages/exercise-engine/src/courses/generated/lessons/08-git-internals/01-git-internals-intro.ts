import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "01-git-internals-intro",
  "moduleId": "08-git-internals",
  "metadata": {
    "id": "01-git-internals-intro",
    "title": "Git Internals là gì? Bí mật dưới nắp ca-pô của Git",
    "level": "advanced",
    "duration": 25,
    "xp": 85,
    "prerequisites": [
      "20-ci-cd-capstone"
    ],
    "objectives": [
      "Hiểu rõ lý do tại sao một kỹ sư Git cấp cao cần nắm vững cơ chế bên dưới nắp ca-pô (Under the hood) của Git.",
      "Hiểu mô hình object định danh theo nội dung cùng refs và index dùng để quản lý lịch sử, nhánh và trạng thái chuẩn bị commit.",
      "Làm quen với 4 trụ cột cốt lõi: Object Database, References (Refs), Con trỏ HEAD, và Index (Staging Area)."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git internals",
      "under the hood",
      "directed acyclic graph",
      "content addressable",
      "architecture"
    ],
    "commands": [
      "git rev-parse --git-dir",
      "git rev-parse --git-path objects",
      "git count-objects -v"
    ]
  },
  "content": "# Git Internals là gì? Bí mật dưới nắp ca-pô của Git\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ lý do tại sao một kỹ sư Git cấp cao cần nắm vững cơ chế bên dưới nắp ca-pô (Under the hood) của Git.\n- Nắm bắt bức tranh tổng quan: Git thực chất là một hệ thống tệp tin định danh theo nội dung đơn giản kèm theo giao diện VCS phía trên.\n- Làm quen với 4 trụ cột cốt lõi: Object Database, References (Refs), Con trỏ HEAD, và Index (Staging Area).\n- Xây dựng phản xạ tự tin khi gỡ lỗi, cứu dữ liệu và phân tích các trạng thái phức tạp trong Git.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Content-Addressable Storage\n- **Nói dễ hiểu**: Git định danh object bằng mã băm được tính từ loại, kích thước và nội dung; với blob, tên đường dẫn không nằm trong dữ liệu được băm.\n- **Ví dụ**: Trong repository SHA-1, nội dung blob gồm đúng byte `hello world\\n` tạo object ID `95d09f2b10159347eece71399a7e2e907ea3df4f`.\n- **Đừng nhầm**: Tên tệp không nằm trong blob. Cùng loại và byte nội dung trong cùng định dạng hash thường cho cùng object; cách lưu có thể loose hoặc packed.\n\n### Git Object Database\n- **Nói dễ hiểu**: Object database lưu các object như blob, tree, commit và tag; tùy cấu hình repo, object có thể nằm dạng loose hoặc trong packfile.\n- **Ví dụ**: Một commit thường tham chiếu tree và các commit cha; tree tham chiếu blob hoặc tree con.\n- **Đừng nhầm**: Không phải cơ sở dữ liệu quan hệ SQL; đây là một kho lưu trữ Key-Value cực kỳ đơn giản và nhanh chóng.\n\n### Git References (Refs)\n- **Nói dễ hiểu**: Ref là tên có thể tra ra object ID; branch thường trỏ tới commit, còn tag có thể trỏ tới object khác.\n- **Ví dụ**: `refs/heads/main` là tên ref của nhánh `main`; Git có thể lưu ref dạng file riêng hoặc gộp trong `packed-refs`.\n- **Đừng nhầm**: Không phải ref nào cũng là file riêng trong `.git/refs/`, và độ dài object ID phụ thuộc định dạng hash của repo.\n\n---\n\n## 📖 Định nghĩa\nGit Internals là các cấu trúc dữ liệu và quy tắc lưu trữ đứng sau các lệnh Git. Có thể hiểu Git như một kho object định danh theo nội dung, cùng các refs và index để quản lý lịch sử, nhánh và trạng thái chuẩn bị commit. Git thường dùng SHA-1; các bản Git hiện đại cũng hỗ trợ tạo repo SHA-256, nhưng hai định dạng repo chưa thể trao đổi trực tiếp với nhau trong mọi trường hợp.\n\n---\n\n## 💡 Tại sao cần\nKhi hiểu quan hệ giữa commit, tree, blob, refs và index, bạn sẽ biết nên kiểm tra phần nào khi nhánh di chuyển sai hoặc commit không còn trên nhánh. Object không còn được tham chiếu có thể vẫn còn một thời gian và có thể tìm qua reflog hoặc `git fsck`, nhưng Git có thể dọn chúng sau này; vì vậy đây không phải bản sao lưu và không nên hứa rằng dữ liệu luôn còn.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung việc lái một chiếc xe đua Công thức 1. Một tài xế bình thường chỉ biết đạp ga, phanh và xoay vô lăng. Nhưng một tay đua vô địch thế giới và đội ngũ kỹ thuật am hiểu từng vòng tua máy, hệ thống phun xăng điện tử và vi sai cầu sau dưới nắp ca-pô. Khi xe gặp sự cố trơn trượt trên đường mưa, người hiểu động cơ sẽ biết chính xác nguyên nhân và cách xử lý an toàn thay vì hoảng loạn đạp phanh.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nKiến trúc 4 trụ cột của Git Internals:\n┌──────────────────────────────────────────────────────────┐\n│                     GIT ARCHITECTURE                     │\n├─────────────────────────────┬────────────────────────────┤\n│ 1. OBJECT DATABASE          │ 2. REFERENCES (REFS)       │\n│    .git/objects/            │    .git/refs/heads/        │\n│    (Blob, Tree, Commit, Tag)│    (Tên ref → object ID)   │\n├─────────────────────────────┼────────────────────────────┤\n│ 3. HEAD POINTER             │ 4. STAGING AREA (INDEX)    │\n│    .git/HEAD                │    .git/index              │\n│    (Trỏ tới branch hiện tại)│    (Cầu nối nhị phân)      │\n└─────────────────────────────┴────────────────────────────┘\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nVí dụ: sau khi một nhánh bị reset, kỹ sư kiểm tra `git reflog` để tìm commit cũ còn được ghi nhận, rồi xác minh commit bằng `git show <sha>`. Nếu không thấy trong reflog, có thể tìm object chưa được thu gom bằng `git fsck --unreachable`; kết quả không được đảm bảo nếu object đã bị dọn. Trước mọi thao tác phục hồi, nên tạo ref hoặc bản sao an toàn để giữ commit tìm được.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\n# Kiểm tra đường dẫn Git thực sự dùng làm thư mục quản trị (có thể khác vị trí worktree)\ngit rev-parse --git-dir\n\n# Hỏi Git đường dẫn tới object database\ngit rev-parse --git-path objects\n\n# Thống kê loose objects và packfiles\ngit count-objects -v\n```\n\n---\n\n## 🔍 Giải thích command\n- `git rev-parse --git-dir`: In vị trí Git directory. Trong linked worktree hoặc submodule, `.git` ở thư mục dự án có thể là một file trỏ đến nơi lưu metadata.\n- `git rev-parse --git-path objects`: In đường dẫn object database mà Git đang dùng, kể cả khi vị trí được cấu hình riêng.\n- `git count-objects -v`: Thống kê object dạng loose và thông tin packfile; không phải phép đếm mọi file nằm dưới `.git/objects`.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ rằng các commit chỉ lưu phần diff**: Về mặt logic, mỗi commit trỏ tới snapshot của cây thư mục; Git có thể nén và lưu các object theo delta trong packfile để tiết kiệm chỗ.\n2. **Sợ hãi khi nhìn vào thư mục `.git`**: Nghĩ rằng thư mục này là ma thuật đen không thể chạm vào, trong khi nó chỉ là tập hợp các tệp tin và thư mục thông thường.\n3. **Mở tệp đối tượng bằng trình soạn thảo văn bản thông thường**: Các tệp trong `.git/objects` được nén bằng thuật toán zlib, cần dùng lệnh chuyên dụng của Git như `git cat-file` để giải nén và đọc.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. Chạy `git rev-parse --git-dir` và `git rev-parse --git-path objects` để xem Git đang lưu metadata và objects ở đâu.\n2. Chạy `git symbolic-ref -q HEAD` để xem tên nhánh nếu HEAD đang gắn với nhánh. Lệnh không in tên nhánh khi HEAD detached; khi đó dùng `git rev-parse HEAD` để xem commit hiện tại.\n3. Tạo một file nhỏ, `git add` rồi `git commit`; so sánh `git count-objects -v` trước và sau. Kết quả có thể khác nếu object đã tồn tại hoặc Git vừa pack dữ liệu.\n\n---\n\n## 💡 Hint & mẹo\n> Đừng giả định `.git` luôn là thư mục hoặc chứa mọi thứ độc lập: linked worktree, bare repo, submodule và cấu hình object ngoài có cách bố trí khác. Hãy dùng lệnh Git để tra đường dẫn và dùng bản sao lưu repo đã kiểm tra được thay vì chép tay metadata.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- `git symbolic-ref -q HEAD` in tên ref nếu HEAD đang ở trên một nhánh; `git rev-parse HEAD` in object ID của commit hiện tại.\n- `git count-objects -v` cho biết số loose objects và thông tin pack, nhưng số đếm không nhất thiết tăng sau mỗi commit.\n\n---\n\n## ❓ Quiz nhanh\nHãy kiểm tra nhận thức tổng quan của bạn về kiến trúc nội tại Git qua các câu hỏi trong phần trắc nghiệm bên dưới.\n\n---\n\n## 🚀 Thử thách nâng cao\nHãy giải thích cách blob, tree, commit và ref phối hợp để biểu diễn một phiên bản dự án. Trong câu trả lời, phân biệt snapshot logic với cách Git nén object trên đĩa.\n\n---\n\n## 📝 Tổng kết\n- Git Internals nghiên cứu cấu trúc dữ liệu, thuật toán băm và cơ chế lưu trữ thực tế bên dưới của Git.\n- Hiểu Git Internals giúp bạn chọn lệnh kiểm tra và phục hồi phù hợp; object không còn được tham chiếu có thể bị garbage collection dọn.\n- Bốn trụ cột chính bao gồm: Object Database, References, HEAD pointer và Index binary file.\n- Commit trỏ tới snapshot logic; Git có thể dùng packfile và delta compression để lưu trữ tiết kiệm.\n",
  "quiz": {
    "id": "quiz-08-git-internals-01-git-internals-intro",
    "title": "Trắc nghiệm: Git Internals là gì? Bí mật dưới nắp ca-pô của Git",
    "questions": [
      {
        "id": "q1",
        "question": "Về mặt bản chất kiến trúc cốt lõi, Git thực sự là gì?",
        "type": "single",
        "options": [
          {
            "text": "Một hệ thống quản lý phiên bản dựa trên object được định danh theo nội dung và các tham chiếu",
            "correct": true
          },
          {
            "text": "Một cơ sở dữ liệu quan hệ SQL truyền thống",
            "correct": false
          },
          {
            "text": "Một chương trình nén tệp tin đơn thuần như WinRAR",
            "correct": false
          },
          {
            "text": "Một dịch vụ lưu trữ đám mây của Microsoft",
            "correct": false
          }
        ],
        "explanation": "Git lưu blob, tree, commit và tag dưới dạng object được định danh bằng hash; refs đặt tên cho các object như đầu nhánh hoặc tag."
      },
      {
        "id": "q2",
        "question": "Toàn bộ siêu dữ liệu, lịch sử commit và cấu hình của một kho lưu trữ Git được lưu trữ ở đâu?",
        "type": "single",
        "options": [
          {
            "text": "Trong Git directory của repository; đường dẫn này có thể khác thư mục worktree",
            "correct": true
          },
          {
            "text": "Lưu trữ trên máy chủ của GitHub tại Mỹ",
            "correct": false
          },
          {
            "text": "Lưu trong Registry của hệ điều hành Windows",
            "correct": false
          },
          {
            "text": "Lưu rải rác trong từng tệp tin mã nguồn",
            "correct": false
          }
        ],
        "explanation": "Repository metadata thường nằm trong Git directory, nhưng linked worktree và submodule có thể dùng file .git trỏ tới metadata ở nơi khác."
      },
      {
        "id": "q3",
        "question": "Mô hình lưu trữ dữ liệu của Git khác gì so với các hệ thống VCS đời cũ như SVN hay CVS?",
        "type": "single",
        "options": [
          {
            "text": "Mỗi commit trỏ tới một snapshot logic của cây thư mục; Git vẫn có thể lưu object trong packfile bằng delta compression",
            "correct": true
          },
          {
            "text": "Git chỉ lưu trữ mã nguồn tệp tin dạng văn bản thuần",
            "correct": false
          },
          {
            "text": "Git không hỗ trợ lưu trữ tệp hình ảnh",
            "correct": false
          },
          {
            "text": "Hai hệ thống có cơ chế lưu trữ hoàn toàn giống hệt nhau",
            "correct": false
          }
        ],
        "explanation": "Commit trỏ tới tree mô tả phiên bản dự án; packfile có thể dùng delta để lưu object hiệu quả mà không đổi mô hình snapshot logic."
      },
      {
        "id": "q4",
        "question": "Bốn thành phần trụ cột nền tảng của Git Internals bao gồm những thành phần nào?",
        "type": "single",
        "options": [
          {
            "text": "Object Database, References (Refs), HEAD pointer, và Index (Staging Area)",
            "correct": true
          },
          {
            "text": "CPU, RAM, Ổ cứng và Card mạng",
            "correct": false
          },
          {
            "text": "HTML, CSS, JavaScript và TypeScript",
            "correct": false
          },
          {
            "text": "Commit, Push, Pull và Merge",
            "correct": false
          }
        ],
        "explanation": "Bốn thực thể này phối hợp với nhau để tạo nên toàn bộ các tính năng phân nhánh, ghi vết và hợp nhất của Git."
      },
      {
        "id": "q5",
        "question": "Tại sao việc hiểu rõ Git Internals lại giúp lập trình viên xử lý sự cố tốt hơn?",
        "type": "single",
        "options": [
          {
            "text": "Vì bạn hiểu object, refs, HEAD và index liên kết với nhau, nên biết cách kiểm tra trạng thái trước khi phục hồi",
            "correct": true
          },
          {
            "text": "Vì Git sẽ tự động sửa lỗi cú pháp trong code cho bạn",
            "correct": false
          },
          {
            "text": "Vì bạn không cần phải gõ lệnh git add nữa",
            "correct": false
          },
          {
            "text": "Vì bạn có thể xóa thư mục .git mà không làm mất lịch sử",
            "correct": false
          }
        ],
        "explanation": "Hiểu các mối liên hệ này giúp bạn dùng reflog hoặc fsck để tìm manh mối, nhưng object không còn tham chiếu có thể đã bị Git thu gom."
      }
    ]
  }
};
export default lesson;
