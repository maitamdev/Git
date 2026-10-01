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
  "content": "# CODEOWNERS\n\n## 🎯 Mục tiêu\n- Hiểu rõ khái niệm và lợi ích của tệp tin đặc biệt CODEOWNERS trong việc xác định quyền sở hữu từng module mã nguồn.\n- Nắm vững cú pháp khai báo đường dẫn tệp tin và chỉ định người phụ trách cá nhân (@username) hoặc nhóm (@org/team-name).\n- Kích hoạt tính năng bắt buộc chủ sở hữu mã nguồn phê duyệt (Require review from Code Owners) trong Branch Protection.\n- Tổ chức cấu trúc tệp CODEOWNERS theo thứ tự ưu tiên từ trên xuống dưới một cách chuẩn xác.\n\n## 🧩 Từ khóa hôm nay\n### CODEOWNERS\n- **Nói dễ hiểu**: Tệp tin cấu hình định nghĩa ai là người chịu trách nhiệm chính cho từng phần thư mục mã nguồn.\n- **Ví dụ**: Đặt tệp `.github/CODEOWNERS` quy định thư mục `/src/payment/` do nhóm `@org/finance-team` quản lý.\n- **Đừng nhầm**: Không phải file giới hạn quyền đọc mã nguồn; ai có quyền truy cập repo vẫn xem được code bình thường.\n\n### Review Assignment\n- **Nói dễ hiểu**: Tính năng GitHub tự động gửi lời mời review cho đúng chuyên gia phụ trách khi có Pull Request đụng vào file của họ.\n- **Ví dụ**: Khi sửa file `schema.prisma`, GitHub tự động gán kỹ sư dữ liệu `@db-admin` vào danh sách reviewers.\n- **Đừng nhầm**: Không cần tự gán tay reviewer mỗi khi mở Pull Request; hệ thống hoàn toàn tự động đối soát.\n\n### Path Pattern Matching\n- **Nói dễ hiểu**: Quy tắc so khớp đường dẫn tương tự `.gitignore` để gán quyền sở hữu theo thư mục hoặc định dạng tệp.\n- **Ví dụ**: Dòng `*.md @tech-writers` gán mọi tệp tài liệu markdown cho đội ngũ viết tài liệu.\n- **Đừng nhầm**: Dòng bên dưới sẽ ghi đè dòng bên trên nếu có tệp tin khớp với cả hai quy tắc.\n\n## 📖 Định nghĩa\nCODEOWNERS là tệp tin cấu hình được đặt tại `.github/CODEOWNERS`, thư mục gốc hoặc `docs/`. Tệp này ánh xạ các mẫu đường dẫn tệp tin tới những cá nhân hoặc nhóm kỹ thuật chịu trách nhiệm, giúp GitHub tự động chỉ định reviewer thích hợp và bắt buộc họ phê duyệt trước khi mã nguồn được hợp nhất.\n\n## 💡 Tại sao cần\nTrong kho lưu trữ quy mô lớn với nhiều nhóm cùng làm việc, không cá nhân nào có thể nắm vững toàn bộ codebase. Thiếu CODEOWNERS khiến lập trình viên lúng túng khi chọn người kiểm duyệt, hoặc chọn người không đúng chuyên môn khiến lỗi nghiêm trọng lọt vào các module thanh toán hay bảo mật cốt lõi.\n\n## 🧠 Mental Model\nHãy hình dung bệnh viện đa khoa lớn với các khoa chuyên biệt. Khi bệnh nhân cần khám tim, hồ sơ tự động chuyển về khoa Tim mạch; khi có ca gãy xương, hồ sơ chuyển đến khoa Chấn thương. Tệp CODEOWNERS là bảng phân khoa tự động: file thanh toán gửi đến kỹ sư tài chính, file hạ tầng gửi đến nhóm DevOps.\n\n## 📊 Sơ đồ minh họa\n```mermaid\nflowchart TD\n    PR[Pull Request sửa file /src/billing/stripe.ts] --> Check{GitHub đối soát CODEOWNERS}\n    Check --> Match[Khớp dòng: /src/billing/ @fintech-team]\n    Match --> Assign[Tự động gán @fintech-team làm Reviewer]\n    Assign --> Gate{Có Approve từ @fintech-team?}\n    Gate -- Chưa --> Block[Khóa nút Merge trên GitHub]\n    Gate -- Đã duyệt --> Allow[Cho phép Merge vào main]\n```\n\n## 🏢 Ví dụ thực tế\nMột ứng dụng đặt vé du lịch có hàng trăm nghìn dòng mã. Họ cấu hình CODEOWNERS để thư mục `/src/payment/` thuộc về nhóm `@finance-devs` và `/deploy/` thuộc về `@devops-engineers`. Khi một kỹ sư tạo Pull Request tích hợp cổng ví điện tử, GitHub lập tức gắn nhãn yêu cầu phê duyệt gửi tới `@finance-devs`. Nút Merge chỉ mở khóa sau khi đại diện nhóm tài chính bấm Approve.\n\n## 💻 Command & Cú pháp\n```bash\n# Xem nội dung cấu hình phân quyền hiện tại\ncat .github/CODEOWNERS\n\n# Đưa tệp cấu hình mới vào danh sách theo dõi\ngit add .github/CODEOWNERS\n\n# Ghi lại commit thiết lập quyền sở hữu mã nguồn\ngit commit -m \"chore: setup CODEOWNERS for security and billing modules\"\n```\n\n## 🔍 Giải thích command\n- `cat .github/CODEOWNERS`: Đọc và kiểm tra các dòng quy tắc phân quyền chủ sở hữu mã nguồn trong kho.\n- `git add .github/CODEOWNERS`: Đưa tệp phân quyền vào khu vực chờ commit để chuẩn bị lưu trữ lên Git.\n- `git commit -m`: Tạo commit ghi nhận việc thiết lập quyền sở hữu với thông điệp rõ ràng theo chuẩn.\n\n## ⚠️ Sai lầm phổ biến\n- Đặt tệp CODEOWNERS sai vị trí khiến GitHub không nhận diện (chỉ chấp nhận trong `.github/`, thư mục gốc hoặc `docs/`).\n- Nhầm lẫn thứ tự ưu tiên: quy tắc khớp cuối cùng nằm ở phía dưới tệp sẽ ghi đè lên quy tắc rộng ở phía trên.\n- Khai báo tài khoản hoặc nhóm GitHub chưa được cấp quyền truy cập repository khiến quy tắc bị vô hiệu hóa.\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác tạo tệp CODEOWNERS và đối chiếu theo hướng dẫn bên dưới.\n\n1. Tạo thư mục `.github` và tạo tệp `.github/CODEOWNERS`.\n2. Khai báo quy tắc toàn cục ở dòng đầu: `* @your-username`.\n3. Khai báo quy tắc cụ thể cho tài liệu: `/docs/ @your-username`.\n4. Đẩy commit lên GitHub và tạo một Pull Request mẫu chỉnh sửa tệp trong thư mục `docs/`.\n5. Quan sát danh sách Reviewers bên phải của PR xem GitHub có tự động gán tên tài khoản của bạn hay không.\n\n## 💡 Hint & mẹo\n- Bạn có thể khai báo một tài khoản cá nhân `@username` hoặc một nhóm trong tổ chức `@org/team-name`.\n- Dòng bên dưới luôn có độ ưu tiên cao hơn dòng bên trên, nên hãy đặt quy tắc chung toàn repo ở trên cùng và quy tắc thư mục hẹp ở dưới.\n\n## ✅ Validation & Kết quả mong đợi\n- Tệp `.github/CODEOWNERS` được Git theo dõi và lưu trữ trên nhánh chính.\n- Khi mở Pull Request thay đổi bất kỳ tệp nào, hệ thống tự động gán đúng reviewer tương ứng trong danh sách Reviewers.\n\n## ❓ Quiz nhanh\nHãy hoàn thành bài trắc nghiệm bên dưới để kiểm tra mức độ nắm vững cú pháp và cơ chế phân quyền tự động của CODEOWNERS.\n\n## 🚀 Thử thách nâng cao\nThiết kế cấu trúc tệp CODEOWNERS cho hệ thống Monorepo gồm ba dịch vụ độc lập: frontend (React), backend (Go) và infrastructure (Terraform), bảo đảm mỗi đội chỉ duyệt code của dịch vụ mình.\n\n## 📝 Tổng kết\n- CODEOWNERS giúp tự động hóa việc gán reviewer có chuyên môn chính xác nhất cho từng tệp tin.\n- Cú pháp đơn giản tương tự `.gitignore` với nguyên tắc dòng bên dưới ghi đè dòng bên trên.\n- Kết hợp với Branch Protection tạo nên chốt chặn an toàn vững chắc cho các hệ thống phần mềm lớn.\n",
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
      },
      {
        "id": "q5",
        "question": "Cú pháp khai báo chủ sở hữu cho một nhóm làm việc (team) trong tệp CODEOWNERS trên GitHub là gì?",
        "type": "single",
        "options": [
          {
            "text": "@org-name/team-name (bắt đầu bằng ký tự @ kèm tên tổ chức và tên nhóm)",
            "correct": true
          },
          {
            "text": "#team-name (dấu thăng kèm tên nhóm)",
            "correct": false
          },
          {
            "text": "group://team-name (dạng URI giao thức)",
            "correct": false
          },
          {
            "text": "team:team-name (dạng nhãn khóa giá trị)",
            "correct": false
          }
        ],
        "explanation": "Để chỉ định một nhóm làm việc trong tổ chức GitHub làm chủ sở hữu, bạn dùng cú pháp @org-name/team-name giúp tự động gán review cho cả nhóm."
      }
    ]
  }
};
export default lesson;
