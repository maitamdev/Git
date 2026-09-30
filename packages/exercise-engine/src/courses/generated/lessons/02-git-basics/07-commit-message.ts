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
      "Nắm vững cấu trúc chuẩn của quy ước Conventional Commits quốc tế.",
      "Sử dụng thành thạo các tiền tố tiêu chuẩn: feat, fix, docs, style, refactor, test, chore.",
      "Hiểu tầm quan trọng của việc viết thông điệp commit rõ ràng phục vụ việc sinh tự động Changelog."
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
  "content": "# Chuẩn quy ước Commit Message\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững cấu trúc chuẩn của quy ước Conventional Commits quốc tế.\n- Sử dụng thành thạo các tiền tố tiêu chuẩn: feat, fix, docs, style, refactor, test, chore.\n- Hiểu tầm quan trọng của việc viết thông điệp commit rõ ràng phục vụ việc sinh tự động Changelog.\n\n---\n\n## 📖 Định nghĩa\n> Quy ước Commit Message (tiêu biểu nhất là chuẩn Conventional Commits) là một tập hợp các nguyên tắc định dạng thông điệp commit có cấu trúc rõ ràng và chặt chẽ, giúp con người và các công cụ tự động hóa dễ dàng đọc hiểu bản chất thay đổi trong lịch sử phát triển dự án. Cấu trúc chuẩn bao gồm: tiền tố loại thay đổi (`type`), phạm vi module tùy chọn (`scope`), dấu hai chấm và mô tả ngắn gọn súc tích (`description`). Ví dụ tiêu biểu: `feat(auth): add google oauth2 login`. Quy ước này loại bỏ sự tùy tiện và nâng cao tính chuyên nghiệp của toàn đội ngũ.\n\n---\n\n## 🤔 Tại sao cần?\nMột dự án phần mềm chuyên nghiệp có thể kéo dài nhiều năm với sự tham gia của hàng trăm kỹ sư. Nếu mọi người đều viết commit vô tội vạ như \"fix bug\", \"done\", \"test\", lịch sử dự án sẽ trở thành một mớ bòng bong không thể kiểm toán. Áp dụng chuẩn Conventional Commits giúp toàn bộ đội ngũ nắm bắt được tiến độ tính năng mới (feat) hay sửa lỗi (fix), đồng thời cho phép các công cụ CI/CD tự động tính toán số phiên bản Semantic Versioning và xuất file nhật ký thay đổi CHANGELOG.md tức thì.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung commit message giống như tiêu đề của một bài báo tin tức trên trang nhất nhật báo buổi sáng. Người biên tập báo không bao giờ giật tít mơ hồ là \"Hôm nay có việc xảy ra\". Thay vào đó, tít báo luôn có chuyên mục và hành động rõ ràng: \"[Kinh tế] Giá vàng lập đỉnh mới sáng nay\" hoặc \"[Giao thông] Khởi công tuyến đường vành đai 4\". Nhờ đó, độc giả chỉ cần lướt qua mục lục là nắm trọn vẹn tình hình trong ngày.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCấu trúc chuẩn Conventional Commits:\n┌───────────────┬───────────┬───────────────────────────────────────────┐\n│ Type (Loại)   │ Scope     │ Description (Mô tả súc tích)              │\n├───────────────┼───────────┼───────────────────────────────────────────┤\n│ feat          │ (auth)    │ add jwt token refresh mechanism           │\n│ fix           │ (payment) │ handle stripe webhook timeout exception   │\n│ docs          │ (readme)  │ update installation commands for windows  │\n│ refactor      │ (api)     │ simplify user profile data serializer     │\n└───────────────┴───────────┴───────────────────────────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKhi phát triển tính năng lọc sản phẩm theo mức giá trên trang thương mại điện tử, kỹ sư viết commit: `feat(product): add price range filter component`. Khi sửa một lỗi hiển thị tiền tệ bị lệch số 0 trên hóa đơn, kỹ sư viết: `fix(billing): format currency display for vietnam dong`. Khi đọc lại lịch sử qua git log, bất kỳ ai trong nhóm cũng biết chính xác chức năng nào được thêm mới và lỗi nào vừa được khắc phục. Hệ thống CI/CD cũng nhờ đó mà tự động nhận diện bản phát hành tiếp theo là bản cập nhật tính năng hay chỉ là bản vá lỗi nhỏ.\n\n---\n\n## 💻 Command\n```bash\ngit commit -m \"feat(scope): short description\"\ngit commit -m \"fix: resolve memory leak in worker\"\n```\n\n---\n\n## 🔍 Giải thích command\n- `git commit -m \"feat: <mô-tả>\"`: Tạo commit thêm mới một tính năng người dùng trong hệ thống phần mềm, kích hoạt nâng số phiên bản MINOR trong Semantic Versioning.\n- `git commit -m \"fix: <mô-tả>\"`: Tạo commit sửa chữa một lỗi phần mềm đã được phát hiện trong mã nguồn, kích hoạt nâng số phiên bản PATCH.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Viết thông điệp quá dài dòng ở dòng tiêu đề đầu tiên**:  Dòng đầu tiên chỉ nên gói gọn dưới 50 đến 72 ký tự.\n2. **Sử dụng thì quá khứ thay vì thể mệnh lệnh hiện tại**:  Nên viết \"add feature\" thay vì \"added feature\".\n3. **Lẫn lộn giữa feat và fix**:  Dùng nhãn fix cho một tính năng hoàn toàn mới hoặc ngược lại.\n\n---\n\n## 🧪 Lab\n1. Tạo một tệp `auth.js` và đưa vào Staging Area.\n2. Thực hiện commit với tiền tố chuẩn: `git commit -m \"feat(auth): create basic login structure\"`.\n3. Quan sát commit hiển thị trong `git log --oneline`.\n\n---\n\n## 💡 Hint\n> Sử dụng các tiền tố: feat, fix, docs, refactor, test, chore.\n\n---\n\n## ✅ Validation\n- Kiểm tra commit message tuân thủ định dạng Conventional Commits.\n\n---\n\n## ❓ Quiz\nHãy trả lời các câu hỏi sau về quy ước viết commit message chuyên nghiệp.\n\n---\n\n## 🔥 Challenge\nNêu ý nghĩa của dấu chấm than `feat!:` trong quy ước Conventional Commits.\n\n---\n\n## 📚 Tổng kết\n- Conventional Commits cung cấp định dạng chuẩn: type(scope): description.\n- Các loại type phổ biến nhất gồm: feat (tính năng mới), fix (sửa lỗi), docs (tài liệu), chore (bảo trì).\n- Giúp tự động hóa việc tính toán phiên bản SemVer và sinh CHANGELOG.\n",
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
        "question": "Độ dài khuyến nghị tối đa cho dòng tiêu đề đầu tiên của một commit message là bao nhiêu?",
        "type": "single",
        "options": [
          {
            "text": "Khoảng 50 đến 72 ký tự",
            "correct": true
          },
          {
            "text": "Tối thiểu 500 từ",
            "correct": false
          },
          {
            "text": "Không giới hạn, càng dài càng tốt",
            "correct": false
          },
          {
            "text": "Chính xác 10 ký tự",
            "correct": false
          }
        ],
        "explanation": "Tiêu đề commit nên ngắn gọn súc tích dưới 50-72 ký tự để hiển thị trọn vẹn trên terminal và giao diện GitHub."
      },
      {
        "id": "q4",
        "question": "Lợi ích chính của việc cả nhóm cùng tuân thủ Conventional Commits là gì?",
        "type": "single",
        "options": [
          {
            "text": "Lịch sử rõ ràng, dễ tìm kiếm, tự động sinh nhật ký thay đổi và nâng version phần mềm",
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
        "explanation": "Quy ước commit chuẩn hóa là nền tảng của tự động hóa DevOps, tạo CHANGELOG tự động và nâng version chuẩn."
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
        "explanation": "Dấu chấm than `!` ngay trước dấu hai chấm biểu thị Breaking Change, kích hoạt nâng MAJOR version trong SemVer."
      }
    ]
  }
};
export default lesson;
