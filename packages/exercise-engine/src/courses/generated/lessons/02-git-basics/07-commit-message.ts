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
  "content": "# Chuẩn quy ước Commit Message\n\n---\n\n## 🎯 Mục tiêu\n- Nhận biết dạng `type(scope): description`; scope có thể bỏ.\n- Chọn `feat`, `fix` hoặc `docs` cho ví dụ đơn giản.\n- Viết message đủ rõ để người khác hiểu commit nói về gì.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Commit message — lời nhắn cho commit\n- **Nói dễ hiểu:** Câu tóm tắt thay đổi để người đọc hiểu commit này làm gì.\n- **Ví dụ:** `fix: correct total price`.\n- **Đừng nhầm:** Message không thay thế việc xem diff khi cần chi tiết.\n\n### Conventional Commits — quy ước viết message\n- **Nói dễ hiểu:** Một cách thống nhất để bắt đầu message bằng loại thay đổi.\n- **Ví dụ:** `feat: add search` và `fix: correct typo`.\n- **Đừng nhầm:** Git không bắt buộc dự án phải dùng quy ước này.\n\n### Type — loại thay đổi\n- **Nói dễ hiểu:** Từ đứng đầu message, thường cho biết loại công việc.\n- **Ví dụ:** `feat` thường dùng khi thêm tính năng; `fix` khi sửa lỗi.\n- **Đừng nhầm:** Từ loại không tự xác nhận code đã đúng.\n\n### Scope — phần bị ảnh hưởng\n- **Nói dễ hiểu:** Nhãn tùy chọn trong ngoặc cho biết commit liên quan tới phần nào.\n- **Ví dụ:** `feat(auth): add login` nói thay đổi thuộc phần đăng nhập.\n- **Đừng nhầm:** Tên scope do dự án chọn; Git không áp đặt danh sách.\n\n### Breaking Change — thay đổi làm hỏng tương thích\n- **Nói dễ hiểu:** Thay đổi khiến cách dùng cũ không còn hoạt động như trước.\n- **Ví dụ:** `feat(api)!: remove old endpoint` báo một thay đổi không tương thích.\n- **Đừng nhầm:** Dấu `!` ghi nhận thay đổi; nó không tự nâng phiên bản nếu thiếu công cụ cấu hình.\n\n---\n\n## 📖 Định nghĩa\nConventional Commits là quy ước viết message theo dạng `type(scope): description`, trong đó scope là tùy chọn. Ví dụ: `feat(auth): add login`. Git vẫn chấp nhận message khác; đây là thỏa thuận giúp người đọc và các công cụ đã cấu hình hiểu loại thay đổi.\n\n---\n\n## 🤔 Tại sao cần?\nKhi message ghi rõ loại và phần bị ảnh hưởng, đồng đội đọc lịch sử dễ hơn. Dự án cũng có thể cấu hình công cụ để tạo changelog hoặc tính phiên bản từ các message này; quy ước tự nó không chạy các công cụ đó.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nViết loại thay đổi trước, phần bị ảnh hưởng nếu cần, rồi mô tả ngắn: `fix(auth): handle empty password`.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCấu trúc chuẩn Conventional Commits:\n┌───────────────┬───────────┬───────────────────────────────────────────┐\n│ Type (Loại)   │ Scope     │ Description (Mô tả súc tích)              │\n├───────────────┼───────────┼───────────────────────────────────────────┤\n│ feat          │ (auth)    │ add login form                             │\n│ fix           │ (payment) │ correct total                              │\n│ docs          │ (readme)  │ explain installation                      │\n└───────────────┴───────────┴───────────────────────────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nThêm trang tìm kiếm? Viết `feat(search): add search page`. Sửa lỗi tổng tiền? Viết `fix(cart): correct total`. Người đọc lịch sử hiểu được loại thay đổi và phần liên quan.\n\n---\n\n## 💻 Command\n```bash\ngit commit -m \"feat(scope): short description\"\ngit commit -m \"fix: resolve memory leak in worker\"\n```\n\n---\n\n## 🔍 Giải thích command\n- `git commit -m \"feat: <mô-tả>\"`: Tạo commit có message bắt đầu bằng `feat`.\n- `git commit -m \"fix: <mô-tả>\"`: Tạo commit có message bắt đầu bằng `fix`.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Message quá chung chung**: “update” không cho người đọc biết nội dung thay đổi.\n2. **Ghi scope dù không giúp ích**: Chỉ thêm scope khi nó làm rõ phần bị ảnh hưởng.\n3. **Nhầm `feat` với `fix`**: `feat` thường chỉ tính năng mới; `fix` chỉ sửa lỗi.\n\n---\n\n## 🧪 Lab\n1. Tạo một tệp `auth.js` và đưa vào Staging Area.\n2. Thực hiện commit với tiền tố chuẩn: `git commit -m \"feat(auth): create basic login structure\"`.\n3. Quan sát commit hiển thị trong `git log --oneline`.\n\n---\n\n## 💡 Hint\n> Bài này dùng ba ví dụ: `feat` thêm tính năng, `fix` sửa lỗi, `docs` sửa tài liệu.\n\n---\n\n## ✅ Validation\n- Kiểm tra commit message tuân thủ định dạng Conventional Commits.\n\n---\n\n## ❓ Quiz\nHãy trả lời các câu hỏi sau về quy ước viết commit message chuyên nghiệp.\n\n---\n\n## 🔥 Challenge\nNêu ý nghĩa của dấu chấm than `feat!:` trong quy ước Conventional Commits.\n\n---\n\n## 📚 Tổng kết\n- Dạng thường dùng là `type(scope): description`; scope có thể bỏ.\n- `feat` thường là tính năng mới; `fix` thường là sửa lỗi.\n- Chỉ công cụ được cấu hình mới tự sinh changelog hoặc tính phiên bản.\n",
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
        "question": "Theo chuẩn Conventional Commits, ký hiệu nào biểu thị một Breaking Change (thay đổi làm hỏng tương thích ngược)?",
        "type": "single",
        "options": [
          {
            "text": "Dấu chấm than ngay sau type hoặc scope (ví dụ feat!: hoặc feat(api)!:)",
            "correct": true
          },
          {
            "text": "Dấu hỏi chấm ở cuối thông điệp commit",
            "correct": false
          },
          {
            "text": "Viết hoa toàn bộ thông điệp commit bằng chữ in hoa",
            "correct": false
          },
          {
            "text": "Thêm từ khóa DANGER vào đầu dòng tiêu đề",
            "correct": false
          }
        ],
        "explanation": "Dấu `!` trước dấu hai chấm báo có Breaking Change; công cụ có thể xử lý theo cấu hình."
      }
    ]
  }
};
export default lesson;
