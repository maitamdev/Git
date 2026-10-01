import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "07-commit-message",
  "moduleId": "02-git-basics",
  "metadata": {
    "id": "07-commit-message",
    "title": "Chuẩn quy ước Commit Message",
    "level": "beginner",
    "duration": 20,
    "xp": 60,
    "prerequisites": [
      "06-git-commit"
    ],
    "objectives": [
      "Nhận biết dạng type(scope): description; scope có thể bỏ.",
      "Chọn feat, fix hoặc docs cho ví dụ đơn giản.",
      "Viết message đủ rõ để người khác hiểu commit nói về gì."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "commit message",
      "conventional commits",
      "feat",
      "fix",
      "quy uoc"
    ],
    "commands": [
      "git commit -m \"feat(scope): short description\"",
      "git commit -m \"fix: resolve memory leak in worker\""
    ]
  },
  "content": "# Chuẩn quy ước Commit Message\r\n\r\n---\r\n\r\n## 🎯 Mục tiêu\r\n- Nhận biết dạng `type(scope): description`; scope có thể bỏ.\r\n- Chọn `feat`, `fix` hoặc `docs` cho ví dụ đơn giản.\r\n- Viết message đủ rõ để người khác hiểu commit nói về gì.\r\n\r\n---\r\n\r\n## 🧩 Từ khóa hôm nay\r\n\r\n### Commit message — lời nhắn cho commit\r\n- **Nói dễ hiểu:** Câu tóm tắt thay đổi để người đọc hiểu commit này làm gì.\r\n- **Ví dụ:** `fix: correct total price`.\r\n- **Đừng nhầm:** Message không thay thế việc xem diff khi cần chi tiết.\r\n\r\n### Conventional Commits — quy ước viết message\r\n- **Nói dễ hiểu:** Một cách thống nhất để bắt đầu message bằng loại thay đổi.\r\n- **Ví dụ:** `feat: add search` và `fix: correct typo`.\r\n- **Đừng nhầm:** Git không bắt buộc dự án phải dùng quy ước này.\r\n\r\n### Type — loại thay đổi\r\n- **Nói dễ hiểu:** Từ đứng đầu message, thường cho biết loại công việc.\r\n- **Ví dụ:** `feat` thường dùng khi thêm tính năng; `fix` khi sửa lỗi.\r\n- **Đừng nhầm:** Từ loại không tự xác nhận code đã đúng.\r\n\r\n### Scope — phần bị ảnh hưởng\n- **Nói dễ hiểu:** Nhãn tùy chọn trong ngoặc cho biết commit liên quan tới phần nào.\n- **Ví dụ:** `feat(auth): add login` nói thay đổi thuộc phần đăng nhập.\n- **Đừng nhầm:** Tên scope do dự án chọn; Git không áp đặt danh sách.\n\n### Description — phần tóm tắt thay đổi\n- **Nói dễ hiểu:** Cụm từ ngắn đứng sau dấu hai chấm, nói rõ thay đổi đã làm.\n- **Ví dụ:** Trong `fix: correct total price`, phần mô tả là `correct total price`.\n- **Đừng nhầm:** Description nên nói hành động cụ thể; tên type như `fix` chỉ phân loại thay đổi.\n\r\n---\r\n\r\n## 📖 Định nghĩa\r\nConventional Commits là quy ước viết message theo dạng `type(scope): description`, trong đó scope là tùy chọn. Ví dụ: `feat(auth): add login`. Git vẫn chấp nhận message khác; đây là thỏa thuận giúp người đọc và các công cụ đã cấu hình hiểu loại thay đổi.\r\n\r\n---\r\n\r\n## 🤔 Tại sao cần?\r\nKhi message ghi rõ loại và phần bị ảnh hưởng, đồng đội đọc lịch sử dễ hơn. Dự án cũng có thể cấu hình công cụ để tạo changelog hoặc tính phiên bản từ các message này; quy ước tự nó không chạy các công cụ đó.\r\n\r\n---\r\n\r\n## 🧠 Mental Model (Mô hình tư duy)\r\nViết loại thay đổi trước, phần bị ảnh hưởng nếu cần, rồi mô tả ngắn: `fix(auth): handle empty password`.\r\n\r\n---\r\n\r\n## 🖼 Sơ đồ\r\n```text\r\nCấu trúc chuẩn Conventional Commits:\r\n┌───────────────┬───────────┬───────────────────────────────────────────┐\r\n│ Type (Loại)   │ Scope     │ Description (Mô tả súc tích)              │\r\n├───────────────┼───────────┼───────────────────────────────────────────┤\r\n│ feat          │ (auth)    │ add login form                             │\r\n│ fix           │ (payment) │ correct total                              │\r\n│ docs          │ (readme)  │ explain installation                      │\r\n└───────────────┴───────────┴───────────────────────────────────────────┘\r\n```\r\n\r\n---\r\n\r\n## 🌎 Ví dụ thực tế\r\nThêm trang tìm kiếm? Viết `feat(search): add search page`. Sửa lỗi tổng tiền? Viết `fix(cart): correct total`. Người đọc lịch sử hiểu được loại thay đổi và phần liên quan.\r\n\r\n---\r\n\r\n## 💻 Command\r\n```bash\r\ngit commit -m \"feat(scope): short description\"\r\ngit commit -m \"fix: resolve memory leak in worker\"\r\n```\r\n\r\n---\r\n\r\n## 🔍 Giải thích command\r\n- `git commit -m \"feat: <mô-tả>\"`: Tạo commit có message bắt đầu bằng `feat`.\r\n- `git commit -m \"fix: <mô-tả>\"`: Tạo commit có message bắt đầu bằng `fix`.\r\n\r\n---\r\n\r\n## ⚠️ Sai lầm phổ biến\r\n1. **Message quá chung chung**: “update” không cho người đọc biết nội dung thay đổi.\r\n2. **Ghi scope dù không giúp ích**: Chỉ thêm scope khi nó làm rõ phần bị ảnh hưởng.\r\n3. **Nhầm `feat` với `fix`**: `feat` thường chỉ tính năng mới; `fix` chỉ sửa lỗi.\r\n\r\n---\r\n\r\n## 🧪 Lab\r\n1. Tạo một tệp `auth.js` và đưa vào Staging Area.\r\n2. Thực hiện commit với tiền tố chuẩn: `git commit -m \"feat(auth): create basic login structure\"`.\r\n3. Quan sát commit hiển thị trong `git log --oneline`.\r\n\r\n---\r\n\r\n## 💡 Hint\r\n> Bài này dùng ba ví dụ: `feat` thêm tính năng, `fix` sửa lỗi, `docs` sửa tài liệu.\r\n\r\n---\r\n\r\n## ✅ Validation\r\n- Kiểm tra commit message tuân thủ định dạng Conventional Commits.\r\n\r\n---\r\n\r\n## ❓ Quiz\r\nHãy trả lời các câu hỏi sau về quy ước viết commit message chuyên nghiệp.\r\n\r\n---\r\n\r\n## 🔥 Challenge\r\nChọn `feat`, `fix` hoặc `docs` cho từng trường hợp: thêm nút tìm kiếm, sửa lỗi tính tổng, cập nhật hướng dẫn cài đặt. Viết một commit message rõ cho từng trường hợp.\r\n\r\n---\r\n\r\n## 📚 Tổng kết\r\n- Dạng thường dùng là `type(scope): description`; scope có thể bỏ.\r\n- `feat` thường là tính năng mới; `fix` thường là sửa lỗi.\r\n- Chỉ công cụ được cấu hình mới tự sinh changelog hoặc tính phiên bản.\r\n",
  "quiz": {
    "id": "quiz-02-07-commit-message",
    "title": "Trắc nghiệm: Chuẩn quy ước Commit Message",
    "questions": [
      {
        "id": "q1",
        "question": "Trong quy ước Conventional Commits, tiền tố `feat:` được dùng khi nào?",
        "type": "single",
        "options": [
          {
            "text": "Khi bổ sung một tính năng mới cho người dùng hoặc hệ thống",
            "correct": true
          },
          {
            "text": "Khi sửa một lỗi phần mềm phát sinh",
            "correct": false
          },
          {
            "text": "Khi cập nhật tài liệu hướng dẫn sử dụng README",
            "correct": false
          },
          {
            "text": "Khi nâng cấp phiên bản thư viện trong package.json",
            "correct": false
          }
        ],
        "explanation": "`feat:` (viết tắt của feature) biểu thị việc thêm tính năng mới. `fix:` dùng cho sửa lỗi; `docs:` cho tài liệu; `chore:` cho việc bảo trì."
      },
      {
        "id": "q2",
        "question": "Tiền tố nào phù hợp nhất khi bạn chỉ sửa đổi tài liệu hướng dẫn trong tệp README.md?",
        "type": "single",
        "options": [
          {
            "text": "docs",
            "correct": true
          },
          {
            "text": "fix",
            "correct": false
          },
          {
            "text": "feat",
            "correct": false
          },
          {
            "text": "perf",
            "correct": false
          }
        ],
        "explanation": "`docs:` là loại commit chuyên biệt cho các thay đổi trên tài liệu văn bản mà không tác động tới mã logic."
      },
      {
        "id": "q3",
        "question": "Cấu trúc thường dùng của Conventional Commits là gì?",
        "type": "single",
        "options": [
          {
            "text": "type(scope): description, trong đó scope có thể bỏ",
            "correct": true
          },
          {
            "text": "description/type/scope, bắt buộc đủ ba phần",
            "correct": false
          },
          {
            "text": "type - password - description",
            "correct": false
          },
          {
            "text": "scope(description): type",
            "correct": false
          }
        ],
        "explanation": "Cấu trúc thường dùng là type, scope tùy chọn và mô tả sau dấu hai chấm."
      },
      {
        "id": "q4",
        "question": "Lợi ích chính của việc cả nhóm cùng tuân thủ Conventional Commits là gì?",
        "type": "single",
        "options": [
          {
            "text": "Lịch sử rõ hơn; công cụ được cấu hình có thể đọc message để tự động hóa",
            "correct": true
          },
          {
            "text": "Giúp mã nguồn chạy nhanh hơn gấp đôi mà không cần tối ưu thuật toán",
            "correct": false
          },
          {
            "text": "Giúp dung lượng ổ cứng máy tính tăng thêm dung lượng trống",
            "correct": false
          },
          {
            "text": "Tránh phải trả tiền bản quyền hàng năm cho Microsoft",
            "correct": false
          }
        ],
        "explanation": "Quy ước làm message dễ đọc và có thể dùng với công cụ tự động hóa đã cấu hình."
      },
      {
        "id": "q5",
        "question": "Phạm vi tùy chọn (scope) trong Conventional Commits như `feat(auth):` có mục đích gì?",
        "type": "single",
        "options": [
          {
            "text": "Chỉ định phân hệ, module hoặc thành phần cụ thể trong dự án chịu tác động của commit",
            "correct": true
          },
          {
            "text": "Chỉ định địa chỉ IP máy chủ của lập trình viên",
            "correct": false
          },
          {
            "text": "Giới hạn số dòng code được phép thay đổi trong commit",
            "correct": false
          },
          {
            "text": "Đặt mật khẩu khóa commit không cho người khác xem",
            "correct": false
          }
        ],
        "explanation": "Scope giúp phân loại chính xác module chịu ảnh hưởng, ví dụ: auth, billing, ui, database."
      },
      {
        "id": "q6",
        "question": "Git có bắt buộc mọi dự án phải dùng đúng cú pháp Conventional Commits không?",
        "type": "single",
        "options": [
          {
            "text": "Không; đây là quy ước, trừ khi dự án cài công cụ để kiểm tra",
            "correct": true
          },
          {
            "text": "Có; Git từ chối mọi message không có dấu hai chấm",
            "correct": false
          },
          {
            "text": "Có; Git tự sửa message sai thành `feat`",
            "correct": false
          },
          {
            "text": "Không; vì commit message không được lưu cùng commit",
            "correct": false
          }
        ],
        "explanation": "Git chấp nhận nhiều dạng message; dự án có thể thêm công cụ riêng để yêu cầu định dạng."
      }
    ]
  }
};
export default lesson;
