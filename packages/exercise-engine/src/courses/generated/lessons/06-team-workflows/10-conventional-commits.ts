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
  "content": "# Conventional Commits\n\n## 🎯 Mục tiêu\n- Hiểu rõ đặc tả chuẩn Conventional Commits phiên bản 1.0.0 và giá trị to lớn của nó đối với tự động hóa phần mềm.\n- Làm chủ cấu trúc chuẩn: `<type>[optional scope]: <description>` cùng các phần tùy chọn Body và Footer.\n- Sử dụng chính xác các tiền tố định danh phổ biến: feat, fix, docs, style, refactor, perf, test, build, ci, chore.\n- Biểu diễn các thay đổi phá vỡ tính tương thích ngược (BREAKING CHANGE) bằng dấu chấm than `!` hoặc footer chuyên dụng.\n\n## 🧩 Từ khóa hôm nay\n### Conventional Commits\n- **Nói dễ hiểu**: Quy ước viết thông điệp commit theo cấu trúc chuẩn để cả người và máy đều đọc hiểu dễ dàng.\n- **Ví dụ**: Viết `feat(auth): add google login button` thay vì chỉ ghi chung chung `update code`.\n- **Đừng nhầm**: Không phải câu lệnh Git riêng biệt, mà là chuẩn mực thỏa thuận chung của cộng đồng lập trình.\n\n### Commit Type\n- **Nói dễ hiểu**: Từ khóa phân loại mục đích chính của commit như tính năng mới (`feat`) hay sửa lỗi (`fix`).\n- **Ví dụ**: Dùng `docs: update readme` khi chỉ bổ sung hướng dẫn cài đặt mà không đụng vào mã nguồn.\n- **Đừng nhầm**: `feat` và `fix` mang giá trị cho người dùng cuối; công việc nội bộ như dọn dẹp thư viện dùng `chore`.\n\n### Breaking Change\n- **Nói dễ hiểu**: Thay đổi làm thay đổi cách thức hoạt động cũ, buộc người dùng hoặc hệ thống khác phải cập nhật theo.\n- **Ví dụ**: Đổi tên trường API từ `user_id` sang `account_id` khiến ứng dụng cũ không gọi được nữa.\n- **Đừng nhầm**: Không chỉ là lỗi làm crash app, mà là sự thay đổi giao diện hoặc hợp đồng dữ liệu phá vỡ tính tương thích ngược.\n\n## 📖 Định nghĩa\nConventional Commits là đặc tả định dạng thông điệp commit có cấu trúc nhẹ nhàng nhưng chặt chẽ. Cú pháp cơ bản gồm tiền tố loại commit, phạm vi tác động tùy chọn và mô tả súc tích, cho phép công cụ CI/CD tự động phân tích cú pháp để tính toán số phiên bản Semantic Versioning và tạo nhật ký thay đổi.\n\n## 💡 Tại sao cần\nLịch sử commit với những thông điệp mơ hồ như \"update\", \"fix bug\" gây khó khăn lớn khi điều tra lỗi hoặc phát hành sản phẩm. Conventional Commits biến lịch sử dự án thành tài liệu có trật tự cao, giúp mọi thành viên nắm bắt ngay bức tranh phát triển và hỗ trợ tự động hóa hoàn toàn quy trình release.\n\n## 🧠 Mental Model\nHãy hình dung hệ thống phân loại bưu kiện tự động. Mỗi kiện hàng được dán nhãn chuẩn hóa: Thư hỏa tốc (`feat`), Bảo hành (`fix`), Bảo trì định kỳ (`chore`), kèm địa chỉ cụ thể `(checkout)`. Máy quét mã vạch đọc nhãn và tự động phân luồng bưu kiện chính xác vào từng toa tàu mà không cần bóc gói hàng.\n\n## 📊 Sơ đồ minh họa\n```mermaid\nflowchart TD\n    Commit[\"Cú pháp: type(scope)!: description\"] --> Type[\"Loại: feat, fix, chore, docs\"]\n    Commit --> Scope[\"Phạm vi: (auth), (api), (cart)\"]\n    Commit --> Bang[\"Dấu !: Báo hiệu Breaking Change\"]\n    Commit --> Desc[\"Mô tả: súc tích, chữ thường, không chấm cuối\"]\n```\n\n## 🏢 Ví dụ thực tế\nMột kỹ sư phần mềm tuân thủ nghiêm ngặt chuẩn Conventional Commits. Khi tích hợp cổng thanh toán PayPal, kỹ sư commit: `feat(payment): add PayPal smart button integration`. Khi sửa lỗi làm tròn tiền tệ, kỹ sư ghi: `fix(cart): correct currency rounding for Japanese Yen`. Đến ngày phát hành, công cụ tự động quét lịch sử và tự tạo file changelog chi tiết cùng số phiên bản mới trong vài giây.\n\n## 💻 Command & Cú pháp\n```bash\n# Thêm tính năng mới cho module xác thực\ngit commit -m \"feat(auth): add endpoint for user registration\"\n\n# Sửa lỗi tính toán trong giỏ hàng\ngit commit -m \"fix(cart): prevent session timeout during checkout\"\n\n# Thay đổi phá vỡ tương thích ngược với dấu chấm than\ngit commit -m \"feat(core)!: drop support for Node 16\"\n```\n\n## 🔍 Giải thích command\n- `feat(auth)`: Định danh thêm tính năng mới cho module đăng nhập, giúp công cụ tự động tăng Minor version.\n- `fix(cart)`: Định danh việc sửa lỗi trong giỏ hàng, giúp công cụ tự động tăng Patch version khi phát hành.\n- `!` sau scope: Đánh dấu có thay đổi phá vỡ tương thích ngược để công cụ tự động tăng Major version.\n\n## ⚠️ Sai lầm phổ biến\n- Viết chữ in hoa cho type hoặc viết sai chính tả như `Feat: ` hoặc `FEATURE: `.\n- Đặt dấu chấm câu ở cuối dòng tiêu đề mô tả đầu tiên.\n- Lạm dụng `feat` cho các công việc bảo trì nội bộ thay vì dùng đúng `chore` hoặc `build`.\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác tạo các commit tuân thủ quy chuẩn trên máy và đối chiếu theo hướng dẫn bên dưới.\n\n1. Khởi tạo kho thử nghiệm và tạo tệp `home.html`.\n2. Commit với chuẩn tính năng mới: `git commit -m \"feat(home): add hero banner section\"`.\n3. Sửa một lỗi hiển thị và commit: `git commit -m \"fix(home): correct button alignment on mobile\"`.\n4. Viết tài liệu và commit: `git commit -m \"docs: add getting started guide in readme\"`.\n5. Dùng `git log --oneline` để kiểm tra danh sách commit xem có ngay ngắn và dễ đọc hay không.\n\n## 💡 Hint & mẹo\n- Giữ dòng tiêu đề đầu tiên ngắn gọn dưới 72 ký tự và luôn viết ở thể mệnh lệnh hiện tại.\n- Nếu có nội dung giải thích dài hơn, hãy để một dòng trống sau dòng tiêu đề rồi mới viết phần Body chi tiết.\n\n## ✅ Validation & Kết quả mong đợi\n- Lịch sử Git hiển thị rõ ràng từng loại công việc qua tiền tố `feat`, `fix`, `docs`.\n- Các công cụ tự động hóa như standard-version hay semantic-release có thể đọc và phân tích cú pháp toàn bộ commit.\n\n## ❓ Quiz nhanh\nHãy hoàn thành bài trắc nghiệm bên dưới để kiểm tra mức độ hiểu biết của bạn về đặc tả Conventional Commits.\n\n## 🚀 Thử thách nâng cao\nTìm hiểu cách cài đặt công cụ commitlint kết hợp với Husky để tự động từ chối bất kỳ commit nào không tuân thủ chuẩn Conventional Commits ngay từ máy lập trình viên.\n\n## 📝 Tổng kết\n- Conventional Commits mang lại cấu trúc nhất quán và ý nghĩa rõ ràng cho lịch sử dự án.\n- Các tiền tố `feat`, `fix`, `chore` phản ánh chính xác bản chất thay đổi của từng commit.\n- Chuẩn hóa thông điệp là nền tảng để tự động hóa phát hành phần mềm và tạo changelog chuyên nghiệp.\n",
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
        "explanation": "`docs` là tiền tố dành riêng cho các thay đổi liên quan đến tài liệu, hướng dẫn hoặc tài liệu API."
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
        "explanation": "`refactor` chỉ tái cấu trúc mã nguồn để tăng tính dễ đọc và bảo trì mà giữ nguyên vẹn hành vi bên ngoài của phần mềm."
      },
      {
        "id": "q5",
        "question": "Theo quy chuẩn thực hành tốt nhất của Conventional Commits, dòng tiêu đề đầu tiên nên được viết như thế nào?",
        "type": "single",
        "options": [
          {
            "text": "Viết ngắn gọn súc tích ở thể mệnh lệnh, chữ thường và không kết thúc bằng dấu chấm",
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
        "explanation": "Tiêu đề súc tích không có dấu chấm ở cuối giúp hiển thị sạch sẽ trên giao diện GitHub và các công cụ dòng lệnh."
      },
      {
        "id": "q6",
        "question": "Lợi ích tự động hóa lớn nhất mà Conventional Commits mang lại cho quy trình CI/CD hiện đại là gì?",
        "type": "single",
        "options": [
          {
            "text": "Tự động tính toán số phiên bản phát hành mới (SemVer) và tự động tạo tệp CHANGELOG.md chuyên nghiệp",
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
        "explanation": "Công cụ tự động có thể quét các commit `feat` để tăng MINOR, commit `fix` để tăng PATCH, và `BREAKING CHANGE` để tăng MAJOR."
      }
    ]
  }
};
export default lesson;
