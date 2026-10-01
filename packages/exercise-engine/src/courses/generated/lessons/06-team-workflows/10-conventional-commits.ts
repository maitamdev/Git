import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "10-conventional-commits",
  "moduleId": "06-team-workflows",
  "metadata": {
    "id": "10-conventional-commits",
    "title": "Conventional Commits",
    "level": "advanced",
    "duration": 25,
    "xp": 85,
    "prerequisites": [
      "06-workflow-comparison"
    ],
    "objectives": [
      "Hiểu rõ đặc tả chuẩn Conventional Commits phiên bản 1.0.0 và giá trị to lớn của nó đối với tự động hóa phần mềm.",
      "Làm chủ cấu trúc chuẩn: `<type>[optional scope]: <description>` cùng các phần tùy chọn tử tế Body và Footer.",
      "Sử dụng chính xác các tiền tố định danh phổ biến: feat, fix, docs, style, refactor, perf, test, build, ci, chore.",
      "Biểu diễn các thay đổi phá vỡ tính tương thích ngược (BREAKING CHANGE) bằng dấu chấm than `!` hoặc footer chuyên dụng."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "conventional commits",
      "quy uoc commit",
      "feat fix chore",
      "semantic commit messages",
      "changelog automation",
      "breaking changes"
    ],
    "commands": [
      "git commit -m \"feat(api): add endpoint for user registration\"",
      "git commit -m \"fix(auth): prevent session timeout during checkout\"",
      "git commit -m \"feat(core)!: drop support for Node 16\""
    ]
  },
  "content": "# Conventional Commits\n\n## 🎯 Mục tiêu\n- Hiểu rõ đặc tả chuẩn Conventional Commits phiên bản 1.0.0 và giá trị to lớn của nó đối với tự động hóa phần mềm.\n- Làm chủ cấu trúc chuẩn: `<type>[optional scope]: <description>` cùng các phần tùy chọn Body và Footer.\n- Nhận diện `feat`, `fix` và các type thường dùng; hiểu type ngoài hai loại này không tự mang ý nghĩa SemVer.\n- Biểu diễn các thay đổi phá vỡ tính tương thích ngược (BREAKING CHANGE) bằng dấu chấm than `!` hoặc footer chuyên dụng.\n\n## 🧩 Từ khóa hôm nay\n### Conventional Commits\n- **Nói dễ hiểu**: Quy ước viết thông điệp commit theo cấu trúc chuẩn để cả người và máy đều đọc hiểu dễ dàng.\n- **Ví dụ**: Viết `feat(auth): add google login button` thay vì chỉ ghi chung chung `update code`.\n- **Đừng nhầm**: Không phải câu lệnh Git riêng biệt, mà là chuẩn mực thỏa thuận chung của cộng đồng lập trình.\n\n### Commit Type\n- **Nói dễ hiểu**: Từ khóa phân loại mục đích chính của commit như tính năng mới (`feat`) hay sửa lỗi (`fix`).\n- **Ví dụ**: Dùng `docs: update readme` khi chỉ bổ sung hướng dẫn cài đặt mà không đụng vào mã nguồn.\n- **Đừng nhầm**: `feat` và `fix` mang giá trị cho người dùng cuối; công việc nội bộ như dọn dẹp thư viện dùng `chore`.\n\n### Breaking Change\n- **Nói dễ hiểu**: Thay đổi làm thay đổi cách thức hoạt động cũ, buộc người dùng hoặc hệ thống khác phải cập nhật theo.\n- **Ví dụ**: Đổi tên trường API từ `user_id` sang `account_id` khiến ứng dụng cũ không gọi được nữa.\n- **Đừng nhầm**: Không chỉ là lỗi làm crash app, mà là sự thay đổi giao diện hoặc hợp đồng dữ liệu phá vỡ tính tương thích ngược.\n\n## 📖 Định nghĩa\nConventional Commits là đặc tả cho thông điệp commit: `<type>[scope tùy chọn][!]: <mô tả>`, có thể kèm body và footer. Đặc tả định nghĩa ý nghĩa SemVer cho `fix` (PATCH), `feat` (MINOR) và thay đổi phá vỡ tương thích (MAJOR); các type khác do nhóm tự quy ước. Việc tính phiên bản hay tạo changelog chỉ xảy ra khi dự án cấu hình công cụ tương ứng.\n\n## 💡 Tại sao cần\nThông điệp có cấu trúc giúp người đọc lọc và hiểu lịch sử thay đổi dễ hơn. Nếu dự án cấu hình parser và quy trình phát hành tương thích, các commit cũng có thể làm đầu vào cho changelog hoặc gợi ý mức tăng phiên bản; định dạng commit một mình không tự chạy release.\n\n## 🧠 Mental Model\nHãy hình dung hệ thống phân loại bưu kiện tự động. Mỗi kiện hàng được dán nhãn chuẩn hóa: Thư hỏa tốc (`feat`), Bảo hành (`fix`), Bảo trì định kỳ (`chore`), kèm địa chỉ cụ thể `(checkout)`. Máy quét mã vạch đọc nhãn và tự động phân luồng bưu kiện chính xác vào từng toa tàu mà không cần bóc gói hàng.\n\n## 📊 Sơ đồ minh họa\n```mermaid\nflowchart TD\n    Commit[\"Cú pháp: type(scope)!: description\"] --> Type[\"Type: feat, fix hoặc loại do nhóm chọn\"]\n    Commit --> Scope[\"Phạm vi: (auth), (api), (cart)\"]\n    Commit --> Bang[\"Dấu !: Báo hiệu Breaking Change\"]\n    Commit --> Desc[\"Mô tả: súc tích, chữ thường, không chấm cuối\"]\n```\n\n## 🏢 Ví dụ thực tế\nMột kỹ sư ghi `feat(payment): add PayPal button` cho tính năng mới và `fix(cart): correct currency rounding` cho một lỗi. Nếu repository cấu hình công cụ phát hành để hiểu Conventional Commits, công cụ có thể dùng các thông điệp này khi tạo changelog hoặc tính mức phiên bản.\n\n## 💻 Command & Cú pháp\n```bash\n# Thêm tính năng mới cho module xác thực\ngit commit -m \"feat(auth): add endpoint for user registration\"\n\n# Sửa lỗi tính toán trong giỏ hàng\ngit commit -m \"fix(cart): prevent session timeout during checkout\"\n\n# Thay đổi phá vỡ tương thích ngược với dấu chấm than\ngit commit -m \"feat(core)!: drop support for Node 16\"\n```\n\n## 🔍 Giải thích command\n- `feat(auth)`: Đặc tả gán ý nghĩa MINOR cho tính năng mới; công cụ chỉ tăng phiên bản nếu được cấu hình để làm việc đó.\n- `fix(cart)`: Đặc tả gán ý nghĩa PATCH cho sửa lỗi; cách phát hành cụ thể tùy cấu hình dự án.\n- `!` sau type/scope: Báo hiệu breaking change; có thể dùng footer `BREAKING CHANGE: <mô tả thay đổi>` thay thế hoặc bổ sung.\n\n## ⚠️ Sai lầm phổ biến\n- Dùng type không phản ánh nội dung thay đổi, khiến người đọc hoặc tool đã cấu hình phân loại sai.\n- Quên mô tả breaking change bằng `!` hoặc footer `BREAKING CHANGE:`.\n- Cho rằng `chore`, `docs` hay `refactor` tự động làm tăng một mức SemVer; đặc tả không quy định mức tăng cho các type đó.\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác tạo các commit tuân thủ quy chuẩn trên máy và đối chiếu theo hướng dẫn bên dưới.\n\n1. Khởi tạo kho thử nghiệm và tạo tệp `home.html`.\n2. Commit với chuẩn tính năng mới: `git commit -m \"feat(home): add hero banner section\"`.\n3. Sửa một lỗi hiển thị và commit: `git commit -m \"fix(home): correct button alignment on mobile\"`.\n4. Viết tài liệu và commit: `git commit -m \"docs: add getting started guide in readme\"`.\n5. Dùng `git log --oneline` để kiểm tra danh sách commit xem có ngay ngắn và dễ đọc hay không.\n\n## 💡 Hint & mẹo\n- Đặc tả không bắt buộc độ dài 72 ký tự, thể mệnh lệnh hay dấu câu; hãy theo giới hạn và cách viết mà repository/team đã chọn.\n- Nếu có nội dung giải thích dài hơn, hãy để một dòng trống sau dòng tiêu đề rồi mới viết phần Body chi tiết.\n\n## ✅ Validation & Kết quả mong đợi\n- Lịch sử Git hiển thị rõ ràng từng loại công việc qua tiền tố `feat`, `fix`, `docs`.\n- Giải thích được cấu trúc type/scope/description và nhận diện breaking change.\n- Biết kiểm tra cấu hình dự án trước khi kỳ vọng commit tự tạo changelog hay đổi phiên bản.\n\n## ❓ Quiz nhanh\nHãy hoàn thành bài trắc nghiệm bên dưới để kiểm tra mức độ hiểu biết của bạn về đặc tả Conventional Commits.\n\n## 🚀 Thử thách nâng cao\nTìm hiểu cách cài đặt công cụ commitlint kết hợp với Husky để tự động từ chối bất kỳ commit nào không tuân thủ chuẩn Conventional Commits ngay từ máy lập trình viên.\n\n## 📝 Tổng kết\n- Conventional Commits chuẩn hóa thông điệp commit; scope tùy chọn.\n- `feat`, `fix` và breaking change có ý nghĩa SemVer xác định; các type khác là quy ước của dự án.\n- Changelog và phát hành tự động cần công cụ cùng cấu hình phù hợp.\n",
  "quiz": {
    "id": "quiz-06-10-conventional-commits",
    "title": "Trắc nghiệm: Conventional Commits",
    "questions": [
      {
        "id": "q1",
        "question": "Tiền tố type nào sau đây trong Conventional Commits đại diện cho một tính năng mới được thêm vào hệ thống?",
        "type": "single",
        "options": [
          {
            "text": "feat",
            "correct": true
          },
          {
            "text": "fix",
            "correct": false
          },
          {
            "text": "chore",
            "correct": false
          },
          {
            "text": "docs",
            "correct": false
          }
        ],
        "explanation": "`feat` (viết tắt của feature) là định danh chuẩn dùng khi bổ sung một tính năng mới mang lại giá trị cho người dùng."
      },
      {
        "id": "q2",
        "question": "Khi bạn chỉ sửa đổi tài liệu hướng dẫn sử dụng trong tệp README.md thì nên sử dụng tiền tố nào?",
        "type": "single",
        "options": [
          {
            "text": "docs",
            "correct": true
          },
          {
            "text": "feat",
            "correct": false
          },
          {
            "text": "style",
            "correct": false
          },
          {
            "text": "perf",
            "correct": false
          }
        ],
        "explanation": "`docs` là type thường dùng do nhóm quy ước cho thay đổi tài liệu; đặc tả không ấn định riêng type này hoặc mức tăng SemVer cho nó."
      },
      {
        "id": "q3",
        "question": "Cách thức chuẩn mực nào sau đây được dùng để báo hiệu một thay đổi phá vỡ tính tương thích ngược (Breaking Change)?",
        "type": "single",
        "options": [
          {
            "text": "Thêm dấu chấm than `!` ngay sau type/scope hoặc có đoạn `BREAKING CHANGE:` ở phần footer",
            "correct": true
          },
          {
            "text": "Gõ toàn bộ commit message bằng chữ in hoa kèm 10 dấu chấm than ở cuối",
            "correct": false
          },
          {
            "text": "Xóa toàn bộ các tệp tin cũ trong kho lưu trữ",
            "correct": false
          },
          {
            "text": "Gửi tin nhắn cảnh báo qua Zalo cho tất cả khách hàng",
            "correct": false
          }
        ],
        "explanation": "Dấu `!` (ví dụ `feat(api)!:`) hoặc phần footer `BREAKING CHANGE:` là cú pháp chuẩn được đặc tả quy định cho máy tính nhận diện."
      },
      {
        "id": "q4",
        "question": "Tiền tố `refactor` được sử dụng chính xác trong tình huống nào sau đây?",
        "type": "single",
        "options": [
          {
            "text": "Cải tiến và tổ chức lại cấu trúc mã nguồn bên trong mà không làm thay đổi tính năng hay sửa lỗi người dùng",
            "correct": true
          },
          {
            "text": "Sửa một lỗi crash hệ thống vừa phát sinh",
            "correct": false
          },
          {
            "text": "Viết thêm các bài kiểm thử unit test mới",
            "correct": false
          },
          {
            "text": "Cập nhật phiên bản thư viện trong package.json",
            "correct": false
          }
        ],
        "explanation": "`refactor` thường được nhóm dùng cho thay đổi cấu trúc không đổi hành vi, nhưng đây là quy ước của nhóm chứ không phải type có ý nghĩa SemVer được đặc tả ấn định."
      },
      {
        "id": "q5",
        "question": "Cấu trúc cơ bản nào được Conventional Commits quy định cho dòng tiêu đề commit?",
        "type": "single",
        "options": [
          {
            "text": "`<type>[optional scope]: <description>`; scope là tùy chọn",
            "correct": true
          },
          {
            "text": "Viết một đoạn văn dài ít nhất 200 chữ có nhiều dấu chấm cảm",
            "correct": false
          },
          {
            "text": "Chỉ cần ghi đúng một con số mã băm hash",
            "correct": false
          },
          {
            "text": "Viết bằng bất kỳ biểu tượng cảm xúc emoji nào tùy thích",
            "correct": false
          }
        ],
        "explanation": "Đặc tả yêu cầu type và mô tả, cho phép scope tùy chọn; độ dài, thể mệnh lệnh và dấu câu có thể do repository quy định riêng."
      },
      {
        "id": "q6",
        "question": "Khi dự án đã cấu hình công cụ tương thích Conventional Commits, công cụ có thể dùng commit message để làm gì?",
        "type": "single",
        "options": [
          {
            "text": "Phân loại thay đổi để gợi ý mức SemVer và tạo changelog theo cấu hình dự án",
            "correct": true
          },
          {
            "text": "Tự động viết toàn bộ mã nguồn của dự án mà không cần lập trình viên",
            "correct": false
          },
          {
            "text": "Tự động thanh toán tiền lương vào tài khoản của tác giả",
            "correct": false
          },
          {
            "text": "Tự động phát hiện lỗi chính tả tiếng Việt trong bình luận",
            "correct": false
          }
        ],
        "explanation": "Theo đặc tả, `feat` tương ứng MINOR, `fix` tương ứng PATCH và breaking change tương ứng MAJOR; công cụ phải được cấu hình và có thể có chính sách riêng."
      }
    ]
  }
};
export default lesson;
