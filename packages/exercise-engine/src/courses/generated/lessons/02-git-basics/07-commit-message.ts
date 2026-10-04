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
  "content": "# Chuẩn quy ước Commit Message\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững cấu trúc tiêu chuẩn toàn cầu `type(scope): description` của Conventional Commits.\n- Thành thạo phân biệt và lựa chọn chính xác các tiền tố cốt lõi: `feat`, `fix`, `docs`, `refactor`, `chore`.\n- Rèn luyện kỹ năng viết thông điệp commit chuẩn mực, truyền tải trọn vẹn ngữ cảnh kỹ thuật cho đồng đội.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Commit message — lời nhắn cho commit\n- **Nói dễ hiểu:** Bản tóm lược cô đọng giải thích lý do tại sao thay đổi này ra đời và nó giải quyết bài toán gì.\n- **Ví dụ:** `feat(auth): support login with Google OAuth2` giải thích trọn vẹn giá trị mang lại cho hệ thống.\n- **Đừng nhầm:** Message phục vụ cho con người đọc và tra cứu; không nên dùng nó để chép lại toàn bộ từng dòng code.\n\n### Conventional Commits — quy ước viết message\n- **Nói dễ hiểu:** Bộ quy chuẩn thống nhất toàn cầu giúp cấu trúc hóa thông điệp commit theo định dạng máy và người đều hiểu.\n- **Ví dụ:** Tuân thủ cú pháp các tiền tố như `feat:`, `fix:`, `docs:` trong toàn bộ repository của công ty.\n- **Đừng nhầm:** Git không ép buộc bạn dùng chuẩn này; đây là kỷ luật kỹ thuật do các kỹ sư chuyên nghiệp tự giác áp dụng.\n\n### Type — loại thay đổi\n- **Nói dễ hiểu:** Tiền tố đứng đầu message định nghĩa chính xác bản chất hành động: tính năng mới (`feat`), vá lỗi (`fix`), tài liệu (`docs`).\n- **Ví dụ:** Dùng `feat` khi thêm màn hình mới; dùng `fix` khi sửa xong lỗi crash ứng dụng.\n- **Đừng nhầm:** Ghi đúng type không bảo đảm code của bạn hết lỗi; type chỉ phản ánh mục đích của lần commit.\n\n### Scope — phần bị ảnh hưởng\n- **Nói dễ hiểu:** Từ khóa tùy chọn đặt trong dấu ngoặc đơn nhằm khoanh vùng mô-đun hoặc khu vực mã nguồn chịu tác động.\n- **Ví dụ:** Trong `feat(payment): integrate VNPay gateway`, từ `payment` chính là scope chỉ rõ khu vực thanh toán.\n- **Đừng nhầm:** Scope không nhất thiết phải là tên file hay thư mục; hãy chọn danh xưng mô-đun ngắn gọn và nhất quán.\n\n### Description — phần tóm tắt thay đổi\n- **Nói dễ hiểu:** Câu mô tả súc tích đứng sau dấu hai chấm, thể hiện mệnh lệnh hành động giải thích việc commit này thực hiện.\n- **Ví dụ:** Trong `fix(cart): prevent negative quantity on item decrement`, phần mô tả là `prevent negative quantity on item decrement`.\n- **Đừng nhầm:** Luôn dùng câu chủ động, không viết hoa chữ đầu, không kết thúc bằng dấu chấm và tránh câu sáo rỗng.\n\n---\n\n## 📖 Định nghĩa\nConventional Commits là chuẩn quy ước quốc tế về định dạng thông điệp commit theo cấu trúc `type(scope): description`. Quy ước này biến nhật ký commit của dự án từ những dòng chữ lộn xộn trở thành dữ liệu có cấu trúc rõ ràng, giúp con người dễ đọc hiểu và tạo tiền đề để các công cụ CI/CD tự động phân tích phiên bản (Semantic Versioning) và tự sinh changelog.\n\n---\n\n## 🤔 Tại sao cần?\nHãy tưởng tượng bạn phải rà soát lịch sử 500 commit toàn những câu như 'fix bug', 'update', 'done'. Bạn sẽ hoàn toàn mất phương hướng! Khi cả đội ngũ thống nhất chuẩn Conventional Commits, bất kỳ ai lướt qua `git log` cũng nhận diện ngay commit nào thêm tính năng mới (`feat`), commit nào vá lỗi (`fix`), phạm vi ảnh hưởng ở đâu (`scope`) và mục đích là gì. Đây là thước đo phân biệt đội ngũ chuyên nghiệp với tay mơ.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy xem mỗi commit message như một dòng tóm tắt trong sổ tay bệnh án của bác sĩ: đầu tiên ghi loại chẩn đoán (`type`), tiếp theo là bộ phận cơ thể cần điều trị trong ngoặc (`scope`), và sau dấu hai chấm là chỉ định phác đồ cụ thể (`description`). Nhìn vào tiêu đề, y tá hay bác sĩ ca sau đều nắm bắt chính xác tình hình chỉ trong một giây.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCẤU TRÚC CHUẨN CONVENTIONAL COMMITS:\n  type(scope): description\n  │    │       │\n  │    │       └── Mô tả hành động ngắn gọn (thể mệnh lệnh, viết thường)\n  │    └────────── Phạm vi mô-đun bị tác động (tùy chọn)\n  └─────────────── Phân loại: feat | fix | docs | style | refactor | test | chore\n\nBẢNG TRA CỨU TIỀN TỐ PHỔ BIẾN:\n┌───────────┬───────────────────────────────────────────┬───────────────────────────────┐\n│ Tiền tố   │ Ý nghĩa kỹ thuật                          │ Ví dụ thực tế                 │\n├───────────┼───────────────────────────────────────────┼───────────────────────────────┤\n│ feat      │ Thêm tính năng mới cho người dùng         │ feat(search): add fuzzy query │\n│ fix       │ Vá lỗi trong hệ thống                     │ fix(auth): resolve token leak │\n│ docs      │ Cập nhật tài liệu hướng dẫn               │ docs(api): update swagger spec│\n│ refactor  │ Tối ưu mã nguồn nhưng không đổi tính năng │ refactor: extract helper func │\n│ chore     │ Công việc phụ trợ build, tools, thư viện  │ chore: bump vite to v5.2.0    │\n└───────────┴───────────────────────────────────────────┴───────────────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrong một dự án thương mại điện tử lớn, bạn vừa sửa lỗi tính sai phí vận chuyển cho khu vực ngoại ô. Bạn không viết cụt ngủn 'fix fee' mà đặt chuẩn mực: `fix(shipping): correct suburban delivery fee calculation`. Khi Tech Lead duyệt Pull Request hoặc rà soát lỗi hồi quy, họ biết chính xác mô-đun bị tác động và an tâm phê duyệt mã nguồn.\n\n---\n\n## 💻 Command\n```bash\ngit commit -m \"feat(auth): create basic login structure\"\ngit commit -m \"fix(payment): resolve currency rounding issue\"\ngit commit -m \"docs(readme): add installation guide for docker\"\n```\n\n---\n\n## 🔍 Giải thích command\n- `feat(auth): <mô-tả>`: Báo hiệu rõ ràng một tính năng mới thuộc mô-đun xác thực (`auth`) được bổ sung.\n- `fix(payment): <mô-tả>`: Xác định một bản vá lỗi trong hệ thống xử lý giao dịch thanh toán.\n- `docs(readme): <mô-tả>`: Thể hiện thay đổi chỉ thuần túy liên quan tới tài liệu tài liệu hóa dự án, không tác động vào logic code.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Dùng các từ vô nghĩa, cẩu thả**: Viết message kiểu \"update code\", \"asdf\", \"done task\" khiến đồng nghiệp ức chế và phá hủy hoàn toàn khả năng truy vết lịch sử.\n2. **Lạm dụng tiền tố `feat` cho lỗi**: Sửa bug nhưng gắn mác `feat` khiến hệ thống tự động sinh phiên bản nâng sai số Minor thay vì số Patch theo Semantic Versioning.\n3. **Mô tả lan man nhiều việc cùng lúc**: Một commit vừa sửa auth vừa đổi CSS vừa cập nhật database; hãy tách nhỏ thành các commit nguyên tử riêng biệt.\n\n---\n\n## 🧪 Lab\n1. Tạo một tệp `auth.js` và đưa vào Staging Area bằng lệnh `git add auth.js`.\n2. Thực hiện commit tuân thủ nghiêm ngặt định dạng: `git commit -m \"feat(auth): create basic login structure\"`.\n3. Chạy `git log --oneline` để chiêm ngưỡng thông điệp commit chuyên nghiệp xuất hiện trong lịch sử.\n\n---\n\n## 💡 Hint\n> Hãy tự hỏi: \"Nếu áp dụng commit này, nó sẽ làm gì cho dự án?\". Câu trả lời chính là phần description của bạn!\n\n---\n\n## ✅ Validation\n- Thông điệp commit tuân thủ chính xác mẫu `type(scope): description`.\n- Lệnh `git log --oneline` hiển thị thông điệp rõ ràng, đúng chính tả kỹ thuật.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để kiểm tra mức độ am hiểu và phản xạ chuẩn mực với quy ước Conventional Commits.\n\n---\n\n## 🔥 Challenge\nBạn hãy phân loại 3 tình huống sau sang đúng cú pháp Conventional Commits: (1) Thêm nút tải file PDF báo cáo, (2) Sửa lỗi tràn số khi tính tổng giỏ hàng, (3) Cập nhật hướng dẫn cài đặt trong README. Hãy viết message hoàn chỉnh cho từng tình huống!\n\n---\n\n## 📚 Tổng kết\n- Conventional Commits chuẩn hóa giao tiếp kỹ thuật thông qua công thức `type(scope): description`.\n- `feat` đại diện cho tính năng mới, `fix` đại diện cho bản vá lỗi, `docs` cho tài liệu.\n- Viết commit message chuyên nghiệp là kỹ năng nền tảng nâng tầm giá trị của kỹ sư phần mềm.\n",
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
