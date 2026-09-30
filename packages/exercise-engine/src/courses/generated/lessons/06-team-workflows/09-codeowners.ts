import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "09-codeowners",
  "moduleId": "06-team-workflows",
  "metadata": {
    "id": "09-codeowners",
    "title": "CODEOWNERS",
    "level": "advanced",
    "duration": 25,
    "xp": 85,
    "prerequisites": [
      "08-branch-protection-rules"
    ],
    "objectives": [
      "Hiểu rõ khái niệm và lợi ích của tệp tin đặc biệt CODEOWNERS trong việc xác định quyền sở hữu từng module mã nguồn.",
      "Nắm vững cú pháp khai báo đường dẫn tệp tin và chỉ định người phụ trách cá nhân (@username) hoặc nhóm (@org/team-name).",
      "Kích hoạt tính năng bắt buộc chủ sở hữu mã nguồn phê duyệt (Require review from Code Owners) trong Branch Protection.",
      "Tổ chức cấu trúc tệp CODEOWNERS theo thứ tự ưu tiên từ trên xuống dưới một cách chuẩn xác."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "codeowners",
      "chu so huu ma nguon",
      "tu dong gan review",
      "phan quyen thu muc",
      "github codeowners",
      "team ownership"
    ],
    "commands": [
      "cat .github/CODEOWNERS",
      "git add .github/CODEOWNERS",
      "git commit -m \"chore: setup CODEOWNERS file for security and billing\""
    ]
  },
  "content": "# CODEOWNERS\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ khái niệm và lợi ích của tệp tin đặc biệt CODEOWNERS trong việc xác định quyền sở hữu từng module mã nguồn.\n- Nắm vững cú pháp khai báo đường dẫn tệp tin và chỉ định người phụ trách cá nhân (@username) hoặc nhóm (@org/team-name).\n- Kích hoạt tính năng bắt buộc chủ sở hữu mã nguồn phê duyệt (Require review from Code Owners) trong Branch Protection.\n- Tổ chức cấu trúc tệp CODEOWNERS theo thứ tự ưu tiên từ trên xuống dưới một cách chuẩn xác.\n\n---\n\n## 📖 Định nghĩa\n> CODEOWNERS là một tệp tin cấu hình đặc biệt được lưu trữ trong thư mục `.github/`, thư mục gốc của kho lưu trữ hoặc thư mục `docs/`. Tệp tin này sử dụng một cú pháp đơn giản tương tự như `.gitignore` để định nghĩa cá nhân hoặc đội ngũ kỹ thuật nào chịu trách nhiệm sở hữu và bảo trì các tệp tin hoặc thư mục cụ thể trong kho mã nguồn. Khi một lập trình viên mở một Pull Request có chỉnh sửa vào các tệp tin đó, nền tảng GitHub sẽ tự động yêu cầu đánh giá (Auto-assign Reviewers) từ các chủ sở hữu tương ứng, bảo đảm mọi thay đổi quan trọng đều được người có chuyên môn sâu nhất thẩm định.\n\n---\n\n## 🤔 Tại sao cần?\nTrong các kho lưu trữ lớn với hàng trăm nghìn dòng code và hàng chục đội ngũ cùng phát triển (Monorepo hoặc Microservices repository), không một ai có thể hiểu sâu toàn bộ codebase. Nếu không có CODEOWNERS, người mở Pull Request thường không biết phải gán ai review, hoặc chỉ tiện tay nhờ một người bạn thân duyệt qua loa. Điều này dẫn đến nguy cơ các đoạn mã nhạy cảm như logic bảo mật, thuật toán tính tiền hoặc cấu hình hạ tầng bị thay đổi mà các chuyên gia phụ trách module đó không hề hay biết.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung một bệnh viện đa khoa quy mô lớn. Không một bác sĩ nào có thể phẫu thuật cho tất cả các loại bệnh. Khi một bệnh nhân nhập viện cần mổ tim, bệnh viện tự động chuyển bệnh án đến khoa Phẫu thuật Tim mạch; khi có ca gãy xương, bệnh án được chuyển ngay tới khoa Chấn thương Chỉnh hình. Tệp tin CODEOWNERS đóng vai trò như bảng phân loại chuyên khoa của bệnh viện: tệp nào thuộc module thanh toán thì tự động chuyển đến đội ngũ Kỹ sư Thanh toán, tệp nào thuộc cấu hình bảo mật thì tự động chuyển đến đội ngũ An ninh Mạng.\n\n---\n\n## 🖼 Sơ đồ\n```text\nQuy trình tự động hóa phân quyền với tệp CODEOWNERS:\nCấu trúc file .github/CODEOWNERS:\n*                   @tech-leads\n/src/auth/          @security-team\n/src/billing/       @fintech-team\n/docs/              @tech-writers\n\nKịch bản Pull Request:\nDev sửa file: /src/billing/stripe.ts\n               │\n               ▼ (GitHub tự động đối soát)\n      Tự động gán Reviewer: @fintech-team!\n      Khóa nút Merge cho đến khi đại diện @fintech-team Approve!\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrong kho lưu trữ của một ứng dụng du lịch trực tuyến, tệp `.github/CODEOWNERS` được cấu hình chi tiết: toàn bộ dự án do `@lead-architect` bao quát, nhưng các tệp trong thư mục `/src/payment/` thuộc quyền sở hữu riêng của nhóm `@finance-devs`, còn thư mục `/deploy/` thuộc về nhóm `@devops-engineers`. Khi lập trình viên Thảo mở một Pull Request để tích hợp ví MoMo vào thư mục thanh toán, hệ thống GitHub lập tức tự động gắn thẻ yêu cầu đánh giá gửi tới hai chuyên gia thuộc nhóm `@finance-devs`. Mặc dù đồng nghiệp ngồi cạnh Thảo đã xem và bấm Approve, nhưng nút Merge vẫn hiển thị thông báo cần chữ ký phê duyệt từ đại diện chính thức của nhóm CODEOWNERS sở hữu module thanh toán trước khi có thể tích hợp an toàn.\n\n---\n\n## 💻 Command\n```bash\ncat .github/CODEOWNERS\ngit add .github/CODEOWNERS\ngit commit -m \"chore: setup CODEOWNERS file for security and billing\"\n```\n\n---\n\n## 🔍 Giải thích command\n- `cat .github/CODEOWNERS`: Đọc và kiểm tra nội dung phân quyền chủ sở hữu mã nguồn.\n- `git add .github/CODEOWNERS`: Thêm tệp cấu hình phân quyền vào danh sách chuẩn bị lưu trữ.\n- `git commit -m`: Ghi lại thay đổi thiết lập quyền sở hữu mã nguồn với thông điệp rõ ràng theo chuẩn.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Đặt tệp CODEOWNERS sai vị trí**:  Phải đặt trong `.github/`, thư mục gốc hoặc thư mục `docs/`.\n2. **Nhầm lẫn thứ tự ưu tiên**:  Git áp dụng quy tắc từ trên xuống dưới, dòng bên dưới sẽ ghi đè dòng bên trên.\n3. **Gán tên tài khoản người dùng chưa được cấp quyền truy cập vào kho lưu trữ (Missing repository access).**: Gán tên tài khoản người dùng chưa được cấp quyền truy cập vào kho lưu trữ (Missing repository access).\n\n---\n\n## 🧪 Lab\n1. Tạo tệp `.github/CODEOWNERS` trong kho lưu trữ của bạn với quy tắc mặc định `* @your-username`.\n2. Thêm một quy tắc cụ thể cho thư mục `docs/` và quan sát hành vi tự động gán reviewer khi mở PR.\n\n---\n\n## 💡 Hint\n> Dòng khai báo bên dưới luôn có độ ưu tiên cao hơn dòng khai báo bên trên trong tệp CODEOWNERS.\n\n---\n\n## ✅ Validation\n- Khi mở một PR thay đổi tệp tin, GitHub tự động gắn đúng reviewer được định nghĩa trong CODEOWNERS.\n\n---\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm dưới đây về cơ chế phân quyền mã nguồn với tệp CODEOWNERS.\n\n---\n\n## 🔥 Challenge\nThiết kế cấu trúc tệp CODEOWNERS cho một hệ thống Monorepo gồm 3 dịch vụ: frontend (React), backend (Go) và infrastructure (Terraform).\n\n---\n\n## 📚 Tổng kết\n- CODEOWNERS tự động hóa việc gán người có trách nhiệm cao nhất vào đánh giá mã nguồn.\n- Ngăn chặn nguy cơ các thay đổi nhạy cảm bị duyệt qua loa bởi những người không có chuyên môn sâu.\n- Tích hợp hoàn hảo với Branch Protection Rules để tạo nên hàng rào bảo mật kỹ thuật vững chắc.\n",
  "quiz": {
    "id": "quiz-06-09-codeowners",
    "title": "Trắc nghiệm: CODEOWNERS",
    "questions": [
      {
        "id": "q1",
        "question": "Tệp tin CODEOWNERS phải được lưu trữ ở những vị trí hợp lệ nào sau đây để GitHub có thể nhận diện?",
        "type": "single",
        "options": [
          {
            "text": "Thư mục .github/, thư mục gốc của repository, hoặc thư mục docs/",
            "correct": true
          },
          {
            "text": "Thư mục .git/ bí mật của máy tính cá nhân",
            "correct": false
          },
          {
            "text": "Bất kỳ thư mục nào trên ổ cứng C của máy tính",
            "correct": false
          },
          {
            "text": "Thư mục node_modules/",
            "correct": false
          }
        ],
        "explanation": "GitHub chỉ tìm kiếm tệp CODEOWNERS tại 3 vị trí quy định: `.github/CODEOWNERS`, `/CODEOWNERS`, hoặc `docs/CODEOWNERS`."
      },
      {
        "id": "q2",
        "question": "Điều gì xảy ra một cách tự động khi bạn mở một Pull Request chỉnh sửa tệp tin đã được khai báo trong CODEOWNERS?",
        "type": "single",
        "options": [
          {
            "text": "GitHub tự động gửi yêu cầu đánh giá mã nguồn (Review request) tới các chủ sở hữu đã khai báo",
            "correct": true
          },
          {
            "text": "GitHub tự động từ chối và đóng ngay Pull Request đó",
            "correct": false
          },
          {
            "text": "GitHub tự động xóa các dòng code vừa được sửa đổi",
            "correct": false
          },
          {
            "text": "Toàn bộ máy chủ của công ty sẽ bị ngắt kết nối Internet",
            "correct": false
          }
        ],
        "explanation": "Hệ thống tự động kích hoạt yêu cầu xem xét mã nguồn gửi trực tiếp tới các cá nhân hoặc nhóm kỹ sư phụ trách module đó."
      },
      {
        "id": "q3",
        "question": "Trong tệp CODEOWNERS, nếu có nhiều quy tắc trùng lặp với cùng một tệp tin thì quy tắc nào sẽ được ưu tiên áp dụng?",
        "type": "single",
        "options": [
          {
            "text": "Quy tắc xuất hiện sau cùng (ở dòng thấp hơn phía dưới của tệp tin)",
            "correct": true
          },
          {
            "text": "Quy tắc xuất hiện đầu tiên ở dòng số 1",
            "correct": false
          },
          {
            "text": "Quy tắc có tên người dùng dài nhất",
            "correct": false
          },
          {
            "text": "GitHub sẽ tung đồng xu ngẫu nhiên để chọn",
            "correct": false
          }
        ],
        "explanation": "Tương tự như cú pháp của `.gitignore`, quy tắc khớp cuối cùng nằm ở phía dưới của tệp tin sẽ ghi đè các quy tắc chung bên trên."
      },
      {
        "id": "q4",
        "question": "Khi kết hợp CODEOWNERS với tùy chọn \"Require review from Code Owners\" trong Branch Protection, điều kiện để merge là gì?",
        "type": "single",
        "options": [
          {
            "text": "Bắt buộc phải có ít nhất một phê duyệt chính thức từ đúng chủ sở hữu được khai báo trong CODEOWNERS",
            "correct": true
          },
          {
            "text": "Chỉ cần một đồng nghiệp bất kỳ bấm duyệt là có thể merge được ngay",
            "correct": false
          },
          {
            "text": "Chỉ cần bài kiểm thử tự động pass là không cần con người phê duyệt",
            "correct": false
          },
          {
            "text": "Chủ sở hữu phải trực tiếp gõ lệnh merge từ terminal của máy họ",
            "correct": false
          }
        ],
        "explanation": "Ràng buộc này bảo đảm việc duyệt code không thể bị bỏ qua bởi những người ngoài chuyên môn của module liên quan."
      }
    ]
  }
};
export default lesson;
