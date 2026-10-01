import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "08-repository",
  "moduleId": "01-foundations",
  "metadata": {
    "id": "08-repository",
    "title": "Repository là gì? Cấu trúc .git",
    "level": "beginner",
    "duration": 20,
    "xp": 60,
    "prerequisites": [
      "07-git-config"
    ],
    "objectives": [
      "Phân biệt các tệp dự án với dữ liệu nội bộ trong `.git`.",
      "Giải thích `Working Tree` và `HEAD` bằng lời của mình.",
      "Biết xóa `.git` có thể làm mất lịch sử Git trên máy."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "repository",
      "kho luu tru",
      "thu muc .git",
      "working tree",
      "head"
    ],
    "commands": [
      "ls -la",
      "git status"
    ]
  },
  "content": "# Repository là gì? Cấu trúc .git\n\n---\n\n## 🎯 Mục tiêu\n- Phân biệt các tệp dự án đang làm với dữ liệu Git quản lý bên trong `.git`.\n- Nhận ra `HEAD` giúp Git biết bạn đang ở nhánh hoặc commit nào.\n- Biết không nên tự sửa các tệp nội bộ của `.git`.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Repository (repo) — kho Git của dự án\n- **Nói dễ hiểu:** Thư mục dự án được Git quản lý, gồm tệp bạn làm và dữ liệu lịch sử của Git.\n- **Ví dụ:** Sau khi khởi tạo Git trong thư mục bài tập, thư mục đó trở thành repository.\n- **Đừng nhầm:** Repository không đồng nghĩa với máy chủ; nó có thể nằm trên máy của bạn.\n\n### Working Tree — cây làm việc\n- **Nói dễ hiểu:** Các tệp dự án bạn đang xem và sửa trực tiếp.\n- **Ví dụ:** `README.md` đang mở trong trình soạn thảo thuộc Working Tree.\n- **Đừng nhầm:** Sửa tệp ở đây chưa tự tạo commit.\n\n### `.git` — thư mục dữ liệu nội bộ\n- **Nói dễ hiểu:** Thư mục Git tạo ra để lưu cấu hình và thông tin cần cho lịch sử của repository.\n- **Ví dụ:** Khi chạy `git init`, Git thường tạo `.git` trong thư mục hiện tại.\n- **Đừng nhầm:** `.git` không phải chỗ để bạn viết nội dung README hay mã nguồn.\n\n### `HEAD` — dấu chỉ vị trí hiện tại\n- **Nói dễ hiểu:** Dấu để Git biết vị trí hiện tại, thường là nhánh đang được chọn.\n- **Ví dụ:** Nếu bạn đang ở nhánh `main`, `HEAD` thường trỏ tới nhánh đó.\n- **Đừng nhầm:** `HEAD` không phải tên của một tệp dự án; trường hợp nó trỏ thẳng vào commit sẽ học sâu hơn sau này.\n\n---\n\n## 📖 Định nghĩa\nRepository là thư mục dự án Git đang quản lý. Bạn làm việc với các tệp trong Working Tree; Git giữ cấu hình và dữ liệu lịch sử trong `.git`. `HEAD` giúp Git xác định vị trí hiện tại. Người mới nên dùng lệnh Git để xem và thay đổi dữ liệu, không tự sửa tệp nội bộ.\n\n---\n\n## 🤔 Tại sao cần?\nBiết tệp dự án nằm đâu và dữ liệu Git nằm đâu giúp bạn không xóa nhầm lịch sử. Bạn làm việc với các tệp thường; Git tự quản lý dữ liệu bên trong `.git`.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nThư mục dự án có hai phần dễ nhớ: tệp bạn mở và sửa là Working Tree; thư mục ẩn `.git` là nơi Git cất dữ liệu quản lý.\n\n---\n\n## 🖼 Sơ đồ\n```text\nThư mục dự án:\nmy-project/\n├── .git/       ← Git quản lý dữ liệu nội bộ\n│   └── HEAD    ← Git dùng để nhận biết vị trí hiện tại\n├── README.md   ← Working Tree: tệp bạn có thể sửa\n└── app.js      ← Working Tree: tệp bạn có thể sửa\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn thấy `.git` khi bật hiển thị tệp ẩn. Nếu xóa thư mục này, các tệp như `README.md` vẫn còn, nhưng Git không còn lịch sử cục bộ. Nếu có bản sao từ xa hoặc bản sao lưu, bạn có thể khôi phục từ đó.\n\n---\n\n## 💻 Command\n```bash\nls -la\ngit status\n```\n\n---\n\n## 🔍 Giải thích command\n- `ls -la`: Liệt kê tệp ẩn trên macOS/Linux và trong terminal mô phỏng. Trong PowerShell dùng `Get-ChildItem -Force`; trong Command Prompt dùng `dir /a`.\n- `git status`: Cho biết Git có nhận ra repository tại thư mục này và các tệp nào đang đổi.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Xóa `.git` vì tưởng là tệp thừa**: Việc này có thể làm mất lịch sử chỉ có trên máy.\n2. **Sửa nội dung trong `.git` bằng tay**: Hãy dùng lệnh Git để quản lý repository.\n3. **Nhầm tệp dự án với dữ liệu nội bộ**: Mã nguồn thường nằm cạnh `.git`, không nằm trong đó.\n\n---\n\n## 🧪 Lab\n1. Trong terminal mô phỏng, chạy `ls -la`. Trên PowerShell máy thật, dùng `Get-ChildItem -Force`; trên Command Prompt, dùng `dir /a`.\n2. Tìm `.git` nhưng không thay đổi hoặc xóa nội dung bên trong.\n3. Chạy `git status` trong repository và xác định một tệp đang thuộc Working Tree.\n\n---\n\n## 💡 Hint\n> Các tệp bạn sửa nằm trong dự án; hãy để Git quản lý `.git` bằng các lệnh. Terminal mô phỏng chỉ hiển thị cấu trúc minh họa.\n\n---\n\n## ✅ Validation\n- Phân biệt được tệp dự án với dữ liệu Git trong `.git`.\n\n---\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm sau về bản chất của Repository và thư mục .git.\n\n---\n\n## 🔥 Challenge\nGiải thích bằng lời của bạn: nếu xóa `.git`, điều gì còn lại và điều gì có thể mất?\n\n---\n\n## 📚 Tổng kết\n- Repository gồm tệp dự án và dữ liệu Git mà `.git` quản lý.\n- Working Tree là phần tệp bạn mở và sửa.\n- Xóa `.git` có thể làm mất lịch sử Git chỉ có trên máy đó.\n",
  "quiz": {
    "id": "quiz-08-repository",
    "title": "Trắc nghiệm: Repository, Working Tree và .git",
    "questions": [
      {
        "id": "q1",
        "question": "Trong một repository Git thông thường, `.git` dùng để làm gì?",
        "type": "single",
        "options": [
          {
            "text": "Giữ dữ liệu nội bộ Git dùng để quản lý repository và lịch sử",
            "correct": true
          },
          {
            "text": "Chứa toàn bộ mã nguồn để thay thế các tệp trong dự án",
            "correct": false
          },
          {
            "text": "Lưu thông tin tài khoản GitHub của mọi thành viên",
            "correct": false
          },
          {
            "text": "Là thư mục cài đặt Git trên máy tính",
            "correct": false
          }
        ],
        "explanation": "`.git` chứa dữ liệu nội bộ Git cần để quản lý repository. Các tệp dự án mà bạn sửa thường nằm bên ngoài thư mục đó."
      },
      {
        "id": "q2",
        "question": "Bạn xóa `.git` trong một repository chỉ có trên laptop. Điều gì thường xảy ra?",
        "type": "single",
        "options": [
          {
            "text": "Các tệp dự án còn lại nhưng lịch sử Git cục bộ có thể mất",
            "correct": true
          },
          {
            "text": "Các tệp dự án tự chuyển sang một repository trực tuyến",
            "correct": false
          },
          {
            "text": "Git tạo lại toàn bộ lịch sử từ các tên tệp hiện có",
            "correct": false
          },
          {
            "text": "Mọi tệp dự án đều bị xóa cùng `.git`",
            "correct": false
          }
        ],
        "explanation": "`.git` giữ dữ liệu quản lý và lịch sử cục bộ. Xóa nó thường để lại các tệp khác nhưng không tự khôi phục lịch sử đã mất."
      },
      {
        "id": "q3",
        "question": "Working Tree là phần nào của repository?",
        "type": "single",
        "options": [
          {
            "text": "Các tệp dự án mà bạn đang xem và sửa trực tiếp",
            "correct": true
          },
          {
            "text": "Toàn bộ commit đã lưu trong lịch sử Git",
            "correct": false
          },
          {
            "text": "Bản cài đặt Git được dùng để chạy lệnh",
            "correct": false
          },
          {
            "text": "Một bản sao trực tuyến của repository",
            "correct": false
          }
        ],
        "explanation": "Working Tree là các tệp dự án hiện có để bạn mở và sửa. Chỉnh sửa chúng chưa tự tạo commit mới."
      },
      {
        "id": "q4",
        "question": "Trong repository thông thường, `.git/HEAD` giúp Git biết điều gì?",
        "type": "single",
        "options": [
          {
            "text": "Vị trí hiện tại, thường là nhánh đang được chọn",
            "correct": true
          },
          {
            "text": "Tệp nào trong Working Tree đang mở trên màn hình",
            "correct": false
          },
          {
            "text": "Tài khoản nào được phép đăng nhập GitHub",
            "correct": false
          },
          {
            "text": "Câu lệnh nào sẽ được chạy tiếp theo trong terminal",
            "correct": false
          }
        ],
        "explanation": "`HEAD` cho biết vị trí Git đang làm việc, thường thông qua nhánh hiện tại. Cách nó có thể trỏ thẳng tới commit sẽ học ở bài nâng cao."
      },
      {
        "id": "q5",
        "question": "Trong Windows PowerShell, lệnh nào hiển thị cả thư mục ẩn `.git`?",
        "type": "single",
        "options": [
          {
            "text": "`Get-ChildItem -Force`",
            "correct": true
          },
          {
            "text": "`git status`",
            "correct": false
          },
          {
            "text": "`dir /a`",
            "correct": false
          },
          {
            "text": "`git config --list`",
            "correct": false
          }
        ],
        "explanation": "`Get-ChildItem -Force` hiển thị cả mục ẩn trong PowerShell. `dir /a` là cú pháp của Command Prompt, không phải tham số PowerShell."
      }
    ]
  }
};
export default lesson;
