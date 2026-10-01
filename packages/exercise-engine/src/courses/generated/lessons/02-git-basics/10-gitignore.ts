import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "10-gitignore",
  "moduleId": "02-git-basics",
  "metadata": {
    "id": "10-gitignore",
    "title": "Bỏ qua tệp tin với .gitignore",
    "level": "beginner",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "05-git-add"
    ],
    "objectives": [
      "Hiểu rõ mục đích và tầm quan trọng của tệp tin cấu hình `.gitignore`.",
      "Nắm bắt các quy tắc mẫu (glob patterns) phổ biến: đuôi tệp, thư mục, ngoại lệ phủ định.",
      "Biết cách xử lý tình huống tệp tin đã vô tình bị theo dõi trước khi thêm vào .gitignore."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "gitignore",
      "ignore files",
      "bo qua tep tin",
      "pattern",
      "node_modules"
    ],
    "commands": [
      "echo \"node_modules/\" >> .gitignore",
      "echo \".env\" >> .gitignore",
      "git check-ignore -v <file>",
      "git rm --cached <file>"
    ]
  },
  "content": "# Bỏ qua tệp tin với .gitignore\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ mục đích và tầm quan trọng của tệp tin cấu hình `.gitignore`.\n- Nắm bắt các quy tắc mẫu (glob patterns) phổ biến: đuôi tệp, thư mục, ngoại lệ phủ định.\n- Biết cách xử lý tình huống tệp tin đã vô tình bị theo dõi trước khi thêm vào .gitignore.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### `.gitignore` — danh sách mẫu bỏ qua\n- **Nói dễ hiểu:** Tệp ghi tên hoặc mẫu tệp chưa được theo dõi mà Git nên bỏ qua.\n- **Ví dụ:** Thêm `node_modules/` để bỏ qua thư mục thư viện sinh tự động.\n- **Đừng nhầm:** Mẫu này không làm Git ngừng theo dõi tệp đã tracked.\n\n### Pattern — mẫu tên cần khớp\n- **Nói dễ hiểu:** Quy tắc tên dùng để nhận diện một nhóm tệp.\n- **Ví dụ:** `*.log` khớp các tệp có đuôi `.log`.\n- **Đừng nhầm:** Mẫu được xét theo vị trí của tệp `.gitignore`.\n\n### Tracked file — tệp đã được theo dõi\n- **Nói dễ hiểu:** Tệp Git đã bắt đầu quản lý từ trước.\n- **Ví dụ:** Tệp đã commit vẫn hiện khi thêm tên của nó vào `.gitignore`.\n- **Đừng nhầm:** Muốn bỏ theo dõi cần thao tác riêng; chỉ thêm mẫu là chưa đủ.\n\n### `!` — ngoại lệ trong mẫu bỏ qua\n- **Nói dễ hiểu:** Dấu này có thể đưa một tệp trở lại sau mẫu bỏ qua.\n- **Ví dụ:** Bỏ qua `*.log` nhưng giữ lại `important.log` bằng `!important.log`.\n- **Đừng nhầm:** Quy tắc ở thư mục cha có thể ảnh hưởng kết quả.\n\n---\n\n## 📖 Định nghĩa\n`.gitignore` là tệp văn bản chứa các mẫu để Git bỏ qua đường dẫn chưa được theo dõi khi liệt kê hoặc thêm thay đổi thông thường. Nó không xóa tệp và không ảnh hưởng tệp đã tracked. Thường dùng để bỏ qua tệp sinh tự động, thư mục phụ thuộc hoặc cấu hình cục bộ.\n\n---\n\n## 🤔 Tại sao cần?\n`.gitignore` giúp giảm tệp tạm không cần thiết trong lịch sử dự án. Tệp chứa mật khẩu cần được bảo vệ riêng; `.gitignore` chỉ giúp tránh thêm nhầm tệp chưa tracked và không xóa bí mật đã commit trước đó.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy nghĩ `.gitignore` như danh sách nhắc Git bỏ qua một số tệp mới trong thư mục. Danh sách này không xóa tệp trên máy và không thay đổi những tệp Git đã theo dõi.\n\n---\n\n## 🖼 Sơ đồ\n```text\nHoạt động của màng lọc .gitignore:\nWorking Directory:                   Màng lọc .gitignore:             Staging Area:\n├── app.js            ─────────────► [Cho qua]          ────────────► [app.js]\n├── package.json      ─────────────► [Cho qua]          ────────────► [package.json]\n├── .env (untracked)  ─────────────► [bỏ qua theo mẫu]  ────────────► (không stage tự động)\n├── node_modules/     ─────────────► [bỏ qua theo mẫu]  ────────────► (không stage tự động)\n└── .env (tracked)    ─────────────► [mẫu không áp dụng] ──────────► (vẫn được theo dõi)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrong bài tập web, `node_modules/` chứa thư viện được cài tự động và `.env` có thể chứa cấu hình riêng. Thêm chúng vào `.gitignore` giúp Git bỏ qua chúng khi chưa được theo dõi. Kiểm tra `git status` trước khi commit; nếu bí mật đã từng commit, hãy báo người phụ trách và thay bí mật đó.\n\n---\n\n## 💻 Command\n```bash\necho \"node_modules/\" >> .gitignore\necho \".env\" >> .gitignore\ngit check-ignore -v <file>\ngit rm --cached <file>\n```\n\n---\n\n## 🔍 Giải thích command\n- `echo \"pattern\" >> .gitignore`: Ghi thêm một quy tắc mẫu đường dẫn loại trừ vào cuối tệp tin cấu hình .gitignore một cách nhanh chóng ngay trên terminal.\n- `git check-ignore -v <file>`: Lệnh chẩn đoán chuyên sâu giúp bạn kiểm tra chi tiết xem một tệp tin cụ thể đang bị quy tắc nào, ở dòng số mấy trong .gitignore chặn lại, vô cùng hữu ích khi gỡ lỗi.\n- `git rm --cached <file>`: Bỏ tệp đã tracked khỏi Index để các commit sau ngừng theo dõi; bản tệp trên máy vẫn còn.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Thêm tệp vào .gitignore sau khi đã commit**:  .gitignore chỉ có tác dụng với tệp Untracked; nếu tệp đã được commit trước đó, bạn phải dùng `git rm --cached` để gỡ bỏ theo dõi.\n2. **Viết sai đường dẫn hoặc thiếu dấu gạch chéo**:  Gõ `build` thay vì `build/` có thể vô tình chặn cả tệp mã nguồn mang tên build.js.\n3. **Tưởng xóa khỏi lịch sử khi thêm ignore**: `git rm --cached <file>` ngừng theo dõi cho các commit sau nhưng không xóa commit cũ. Nếu đã lộ mật khẩu, hãy đổi mật khẩu đó.\n\n---\n\n## 🧪 Lab\n1. Tạo tệp mới `secret.env` và dùng `git status` để thấy tệp trong nhóm Untracked.\n2. Tạo tệp `.gitignore` và thêm dòng `*.env` vào bên trong.\n3. Chạy `git status` để xác nhận tệp không còn hiện trong nhóm Untracked; chạy `git check-ignore -v secret.env` để xem quy tắc khớp.\n\n---\n\n## 💡 Hint\n> Chỉ tệp `.gitignore` đã được commit mới chia sẻ quy tắc với nhóm.\n\n---\n\n## ✅ Validation\n- Tệp mới khớp mẫu không còn hiện trong mục Untracked; tệp tracked vẫn có thể hiện.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về cách sử dụng tệp .gitignore.\n\n---\n\n## 🔥 Challenge\nNêu cú pháp dùng dấu chấm than `!` trong .gitignore để tạo quy tắc ngoại lệ bỏ qua.\n\n---\n\n## 📚 Tổng kết\n- `.gitignore` giúp Git bỏ qua các đường dẫn chưa được theo dõi.\n- Nó không ảnh hưởng tệp tracked và không xóa bí mật đã commit.\n- Commit `.gitignore` để chia sẻ quy tắc với nhóm.\n",
  "quiz": {
    "id": "quiz-02-10-gitignore",
    "title": "Trắc nghiệm: Bỏ qua tệp tin với .gitignore",
    "questions": [
      {
        "id": "q1",
        "question": "Mục đích cốt lõi của tệp .gitignore trong một dự án Git là gì?",
        "type": "single",
        "options": [
          {
            "text": "Chỉ định mẫu để Git bỏ qua các đường dẫn chưa được theo dõi",
            "correct": true
          },
          {
            "text": "Tự động xóa vĩnh viễn các tệp mã nguồn bị lỗi cú pháp",
            "correct": false
          },
          {
            "text": "Lưu trữ mật khẩu bảo mật của tài khoản GitHub",
            "correct": false
          },
          {
            "text": "Chặn quyền truy cập mạng Internet của các thành viên trong nhóm",
            "correct": false
          }
        ],
        "explanation": "`.gitignore` giúp bỏ qua tệp chưa tracked; nó không ngăn mọi cách thêm tệp vào commit."
      },
      {
        "id": "q2",
        "question": "Quy tắc nào trong .gitignore sẽ bỏ qua toàn bộ các tệp tin có phần mở rộng là `.log`?",
        "type": "single",
        "options": [
          {
            "text": "*.log",
            "correct": true
          },
          {
            "text": "delete.log",
            "correct": false
          },
          {
            "text": "/log-all",
            "correct": false
          },
          {
            "text": "ignore(.log)",
            "correct": false
          }
        ],
        "explanation": "Dấu sao `*` là ký tự đại diện (wildcard) khớp với mọi chuỗi ký tự, `*.log` bỏ qua mọi tệp đuôi .log."
      },
      {
        "id": "q3",
        "question": "Nếu một tệp tin bí mật đã lỡ bị commit vào lịch sử Git từ trước, việc chỉ thêm tên tệp đó vào .gitignore có giúp loại bỏ nó khỏi lịch sử không?",
        "type": "single",
        "options": [
          {
            "text": "Không; `git rm --cached` có thể ngừng theo dõi cho commit sau, còn commit cũ vẫn còn",
            "correct": true
          },
          {
            "text": "Có, Git sẽ tự động xóa sạch tệp đó khỏi toàn bộ các commit trong quá khứ",
            "correct": false
          },
          {
            "text": "Có, tệp đó sẽ tự động được mã hóa bằng mật khẩu quản trị",
            "correct": false
          },
          {
            "text": "Git sẽ lập tức báo lỗi và từ chối khởi động",
            "correct": false
          }
        ],
        "explanation": "Tệp tracked không bị ignore; `git rm --cached` ngừng theo dõi về sau nhưng không xóa lịch sử cũ."
      },
      {
        "id": "q4",
        "question": "Quy tắc thư mục nào dưới đây bỏ qua trọn vẹn thư mục `node_modules` ở bất kỳ cấp độ nào?",
        "type": "single",
        "options": [
          {
            "text": "node_modules/",
            "correct": true
          },
          {
            "text": "<node_modules>",
            "correct": false
          },
          {
            "text": "file:node_modules",
            "correct": false
          },
          {
            "text": "skip node_modules",
            "correct": false
          }
        ],
        "explanation": "Dấu gạch chéo ở cuối `node_modules/` chỉ định bỏ qua toàn bộ thư mục và mọi nội dung con bên trong nó."
      },
      {
        "id": "q5",
        "question": "Một tệp đã được Git theo dõi từ trước có tự bị bỏ qua chỉ vì bạn thêm nó vào `.gitignore` không?",
        "type": "single",
        "options": [
          {
            "text": "Không; `.gitignore` không ngừng theo dõi một tệp đã tracked",
            "correct": true
          },
          {
            "text": "Có; Git xóa tệp khỏi mọi commit cũ ngay lập tức",
            "correct": false
          },
          {
            "text": "Có; nội dung tệp tự được mã hóa",
            "correct": false
          },
          {
            "text": "Không; `.gitignore` chỉ dùng khi có kết nối Internet",
            "correct": false
          }
        ],
        "explanation": "`.gitignore` áp dụng với đường dẫn chưa được theo dõi; cần hành động riêng để ngừng track tệp đã tracked."
      }
    ]
  }
};
export default lesson;
