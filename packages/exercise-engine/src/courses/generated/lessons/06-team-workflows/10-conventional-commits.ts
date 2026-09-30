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
  "content": "# Conventional Commits\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ đặc tả chuẩn Conventional Commits phiên bản 1.0.0 và giá trị to lớn của nó đối với tự động hóa phần mềm.\n- Làm chủ cấu trúc chuẩn: `<type>[optional scope]: <description>` cùng các phần tùy chọn tử tế Body và Footer.\n- Sử dụng chính xác các tiền tố định danh phổ biến: feat, fix, docs, style, refactor, perf, test, build, ci, chore.\n- Biểu diễn các thay đổi phá vỡ tính tương thích ngược (BREAKING CHANGE) bằng dấu chấm than `!` hoặc footer chuyên dụng.\n\n---\n\n## 📖 Định nghĩa\n> Conventional Commits là một quy ước định dạng thông điệp commit có cấu trúc chuẩn mực cao và dễ đọc cho cả con người lẫn máy tính. Đặc tả này thiết lập một bộ quy tắc nhẹ nhàng nhưng nhất quán, yêu cầu mọi commit phải bắt đầu bằng một định danh thể loại rõ ràng (như `feat`, `fix`, `chore`, `refactor`), đi kèm với phạm vi tác động tùy chọn, mô tả súc tích và phần nội dung mở rộng. Nhờ có cấu trúc máy tính có thể phân tích cú pháp (parseable) này, hệ thống CI/CD có thể tự động tính toán số phiên bản Semantic Versioning và tự động sinh nhật ký thay đổi (Changelog) hoàn hảo.\n\n---\n\n## 🤔 Tại sao cần?\nLịch sử commit với những câu từ mơ hồ, vô nghĩa như \"fix bug\", \"update\", \"done task\", hay \"asdasd\" là một cơn ác mộng khi cần truy tìm nguyên nhân phát sinh lỗi hoặc tổng hợp tài liệu phát hành cho khách hàng. Conventional Commits biến lịch sử dự án thành một câu chuyện tường minh, có tính tổ chức cao: nhìn vào danh sách commit, bất kỳ ai cũng biết ngay có bao nhiêu tính năng mới được thêm vào, bao nhiêu lỗi đã sửa và có thay đổi nào gây hỏng tương thích với phiên bản cũ hay không.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung bạn đang phân loại hồ sơ bệnh án hoặc kiện hàng bưu chính. Thay vì dán một mảnh giấy viết tay nghuệch ngoạc \"kiện hàng\", bưu điện yêu cầu dán nhãn chuẩn hóa có mã vạch: loại dịch vụ Hỏa tốc (`feat`), Sửa chữa bảo hành (`fix`), Bảo trì bảo dưỡng (`chore`), cùng điểm đến cụ thể `(checkout)`. Nhờ nhãn chuẩn này, hệ thống băng chuyền tự động có thể quét mã vạch và phân loại hàng ngàn kiện hàng vào đúng toa tàu mà không cần con người phải bóc từng kiện ra đọc nội dung.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCấu trúc giải phẫu của một Conventional Commit chuẩn mực:\n<type>[optional scope]: <description>\n\n[optional body]\n\n[optional footer(s)]\n\nVí dụ thực tế:\nfeat(auth)!: add OAuth2 login with Google and GitHub\n\nBREAKING CHANGE: The legacy basic auth endpoint /api/v1/login is removed.\nRefs: #452\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột kỹ sư phần mềm thực hiện một loạt các thay đổi trong ngày làm việc. Thay vì viết thông điệp lộn xộn, kỹ sư tuân thủ nghiêm ngặt chuẩn Conventional Commits. Khi thêm cổng thanh toán PayPal, kỹ sư commit: `feat(payment): add PayPal smart button integration`. Khi sửa lỗi làm tròn số tiền tệ ở giỏ hàng, kỹ sư commit: `fix(cart): correct currency rounding for Japanese Yen`. Khi tái cấu trúc lại thư mục tiện ích mà không thay đổi tính năng, kỹ sư viết: `refactor(utils): split date helpers into separate modular files`. Đến cuối tuần khi chuẩn bị phát hành, công cụ tự động quét qua 50 commit này và tạo ra một tệp CHANGELOG.md đẹp mắt cùng số phiên bản mới mà kỹ sư không cần tốn một giây gõ tay nào.\n\n---\n\n## 💻 Command\n```bash\ngit commit -m \"feat(api): add endpoint for user registration\"\ngit commit -m \"fix(auth): prevent session timeout during checkout\"\ngit commit -m \"feat(core)!: drop support for Node 16\"\n```\n\n---\n\n## 🔍 Giải thích command\n- `feat(scope)`: Khai báo tính năng mới cung cấp giá trị trực tiếp cho người sử dụng phần mềm.\n- `fix(scope)`: Khai báo việc vá một lỗi phát sinh trong mã nguồn hiện tại.\n- `!` sau scope: Đánh dấu có thay đổi phá vỡ tương thích ngược (Breaking Change) cần tăng Major version.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Viết chữ in hoa cho type hoặc viết sai chính tả, ví dụ gõ `Feat**: `, `FEATURE\n2. **Đặt dấu chấm ở cuối dòng tiêu đề description đầu tiên**:  Quy chuẩn khuyến nghị không dùng dấu chấm cuối tiêu đề.\n3. **Sử dụng `feat` cho các công việc nội bộ như nâng cấp thư viện phụ thuộc (phải dùng `chore` hoặc `build`).**: Sử dụng `feat` cho các công việc nội bộ như nâng cấp thư viện phụ thuộc (phải dùng `chore` hoặc `build`).\n\n---\n\n## 🧪 Lab\n1. Viết 3 commit mẫu tuân thủ đúng chuẩn Conventional Commits cho các hành động: thêm trang, sửa lỗi nút bấm và viết tài liệu hướng dẫn.\n2. Sử dụng dấu chấm than `!` để đánh dấu một thay đổi làm thay đổi định dạng dữ liệu API trả về.\n\n---\n\n## 💡 Hint\n> Dòng tiêu đề đầu tiên luôn viết ở thể mệnh lệnh hiện tại ngắn gọn dưới 72 ký tự.\n\n---\n\n## ✅ Validation\n- Các công cụ tự động hóa như standard-version hoặc semantic-release có thể đọc và phân tích cú pháp toàn bộ commit.\n\n---\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm dưới đây về chuẩn thông điệp Conventional Commits.\n\n---\n\n## 🔥 Challenge\nThiết lập công cụ commitlint bằng husky trong dự án để tự động từ chối bất kỳ commit nào không tuân thủ Conventional Commits.\n\n---\n\n## 📚 Tổng kết\n- Conventional Commits chuẩn hóa thông điệp commit theo cấu trúc mà máy tính có thể phân tích cú pháp được.\n- Phân loại rõ ràng mục đích thay đổi qua các tiền tố: feat, fix, chore, refactor, docs, test.\n- Là nền tảng tự động hóa việc tính toán số phiên bản Semantic Versioning và sinh Changelog tự động.\n",
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
