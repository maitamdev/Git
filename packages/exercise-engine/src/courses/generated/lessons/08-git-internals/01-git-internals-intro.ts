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
      "Nắm bắt bức tranh tổng quan: Git thực chất là một hệ thống tệp tin định danh theo nội dung đơn giản kèm theo giao diện VCS phía trên.",
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
      "ls -la .git",
      "find .git/objects -type f"
    ]
  },
  "content": "# Git Internals là gì? Bí mật dưới nắp ca-pô của Git\n\n---\n\n## 🎯 Mục tiêu bài học\n- Hiểu rõ lý do tại sao một kỹ sư Git cấp cao cần nắm vững cơ chế bên dưới nắp ca-pô (Under the hood) của Git.\n- Nắm bắt bức tranh tổng quan: Git thực chất là một hệ thống tệp tin định danh theo nội dung đơn giản kèm theo giao diện VCS phía trên.\n- Làm quen với 4 trụ cột cốt lõi: Object Database, References (Refs), Con trỏ HEAD, và Index (Staging Area).\n\n---\n\n## 📖 Định nghĩa\n> Git Internals (Kiến trúc nội tại của Git) là toàn bộ các cấu trúc dữ liệu nhị phân, thuật toán băm mật mã học và cơ chế lưu trữ đĩa mà Git sử dụng để theo dõi phiên bản mã nguồn của bạn. Khác với quan niệm thông thường coi Git là một công cụ phức tạp huyền bí, nhà sáng lập Linus Torvalds thiết kế Git về bản chất chỉ là một hệ thống tệp tin định danh theo nội dung (Content-Addressable File System) cực kỳ tinh gọn, bên trên được bao bọc bởi một bộ giao diện quản lý phiên bản thân thiện với người dùng.\n\n---\n\n## 🤔 Tại sao cần?\nKhi bạn chỉ biết các lệnh thông thường ở bề mặt, mỗi khi gặp sự cố phức tạp như xung đột rebase, nhánh bị rẽ nhánh ngoài ý muốn, hay mất commit, bạn sẽ cảm thấy hoang mang và sợ hãi làm mất dữ liệu. Khi bạn đã hiểu rõ Git Internals, toàn bộ Git trở nên trong suốt như pha lê: bạn hiểu commit chỉ là một tệp văn bản nhỏ trỏ tới một cây thư mục, nhánh chỉ là một con trỏ văn bản 41 byte, và mọi dữ liệu từng commit đều không bao giờ mất đi trong cơ sở dữ liệu đối tượng.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy hình dung việc lái một chiếc xe đua Công thức 1. Một tài xế bình thường chỉ biết đạp ga, phanh và xoay vô lăng. Nhưng một tay đua vô địch thế giới và đội ngũ kỹ thuật am hiểu từng vòng tua máy, hệ thống phun xăng điện tử và vi sai cầu sau dưới nắp ca-pô. Khi xe gặp sự cố trơn trượt trên đường mưa, người hiểu động cơ sẽ biết chính xác nguyên nhân và cách xử lý an toàn thay vì hoảng loạn đạp phanh.\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nKiến trúc 4 trụ cột của Git Internals:\n┌──────────────────────────────────────────────────────────┐\n│                     GIT ARCHITECTURE                     │\n├─────────────────────────────┬────────────────────────────┤\n│ 1. OBJECT DATABASE          │ 2. REFERENCES (REFS)       │\n│    .git/objects/            │    .git/refs/heads/        │\n│    (Blob, Tree, Commit, Tag)│    (Con trỏ trỏ tới SHA-1) │\n├─────────────────────────────┼────────────────────────────┤\n│ 3. HEAD POINTER             │ 4. STAGING AREA (INDEX)    │\n│    .git/HEAD                │    .git/index              │\n│    (Trỏ tới branch hiện tại)│    (Cầu nối nhị phân)      │\n└─────────────────────────────┴────────────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột kỹ sư phần mềm cao cấp tại một tập đoàn công nghệ lớn hỗ trợ một đồng nghiệp vừa vô tình gõ lệnh git reset --hard làm mất toàn bộ mã nguồn của ba ngày làm việc. Đồng nghiệp hoảng sợ tột độ vì tưởng rằng dữ liệu đã bị xóa vĩnh viễn khỏi ổ cứng. Kỹ sư cao cấp mỉm cười, mở terminal, truy cập trực tiếp vào cơ sở dữ liệu đối tượng của Git thông qua các công cụ tầng thấp, tìm thấy đối tượng commit mồ côi (dangling commit) vẫn đang nằm nguyên vẹn trong thư mục `.git/objects/` và khôi phục lại toàn bộ nhánh chỉ sau ba mươi giây. Sự khác biệt giữa người dùng Git thông thường và chuyên gia Git Internals nằm ở chính sự thấu hiểu này.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\ngit rev-parse --git-dir\nls -la .git\nfind .git/objects -type f\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nLệnh git rev-parse --git-dir trả về đường dẫn tuyệt đối của thư mục quản trị .git, ls -la liệt kê các thành phần cốt lõi bên trong, và find quét toàn bộ các đối tượng nhị phân đang được lưu trữ trong cơ sở dữ liệu đối tượng.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Nghĩ rằng Git lưu trữ sự khác biệt giữa các dòng code (diff/deltas) cho từng phiên bản**:  Thực chất Git lưu toàn bộ ảnh chụp (snapshot) của tệp tin dưới dạng đối tượng Blob.\n2. **Sợ hãi chỉnh sửa hoặc xem nội dung thư mục .git vì nghĩ rằng nó sẽ làm hỏng dự án.**: \n3. **Tự ý dùng trình soạn thảo văn bản thông thường để mở và sửa đổi các tệp nhị phân nén zlib bên trong .git/objects.**: \n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Mở terminal và di chuyển vào một thư mục repository đã khởi tạo Git.\n2. Sử dụng lệnh `ls -la .git` để quan sát toàn bộ các tệp tin và thư mục quản trị.\n3. Kiểm tra kích thước của thư mục `.git/objects` trước và sau khi thêm một tệp tin mới.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Mọi dữ liệu lịch sử và cấu hình của Git đều nằm gói gọn bên trong duy nhất thư mục ẩn `.git`.\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nNhận diện chính xác 4 thành phần trụ cột của Git bên trong hệ thống tệp tin cục bộ.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nHãy kiểm tra nhận thức tổng quan của bạn về kiến trúc nội tại Git qua các câu hỏi sau.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nTại sao Linus Torvalds lại khẳng định: \"Git không phải là một hệ thống quản lý phiên bản ma thuật, nó chỉ là một cơ sở dữ liệu định danh theo nội dung cực kỳ đơn giản\"?\n\n---\n\n## 📚 Tổng kết kiến thức\n- Git Internals nghiên cứu cấu trúc dữ liệu, thuật toán băm và cơ chế lưu trữ thực tế bên dưới của Git.\n- Hiểu rõ Git Internals giúp làm chủ hoàn toàn các thao tác cứu hộ, tối ưu hóa và gỡ lỗi phức tạp.\n- Bốn trụ cột chính bao gồm: Object Database, References, HEAD pointer và Index binary file.\n",
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
            "text": "Một hệ thống tệp tin định danh theo nội dung (Content-Addressable File System)",
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
        "explanation": "Git được thiết kế xoay quanh cơ sở dữ liệu khóa-giá trị, trong đó khóa chính là mã băm SHA-1 của nội dung dữ liệu."
      },
      {
        "id": "q2",
        "question": "Toàn bộ siêu dữ liệu, lịch sử commit và cấu hình của một kho lưu trữ Git được lưu trữ ở đâu?",
        "type": "single",
        "options": [
          {
            "text": "Nằm trọn vẹn trong thư mục ẩn `.git/` tại thư mục gốc của dự án",
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
        "explanation": "Tính phân tán của Git thể hiện ở chỗ toàn bộ lịch sử và đối tượng đều được đóng gói đầy đủ trong thư mục `.git`."
      },
      {
        "id": "q3",
        "question": "Mô hình lưu trữ dữ liệu của Git khác gì so với các hệ thống VCS đời cũ như SVN hay CVS?",
        "type": "single",
        "options": [
          {
            "text": "Git lưu trữ ảnh chụp toàn diện (Snapshot) của toàn bộ dự án, trong khi SVN lưu trữ danh sách các dòng thay đổi (Delta/Diff)",
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
        "explanation": "Mỗi commit trong Git là một snapshot toàn diện của cây thư mục tại thời điểm đó, chứ không phải một chuỗi các bản vá vi phân tích lũy."
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
      }
    ]
  }
};
export default lesson;
