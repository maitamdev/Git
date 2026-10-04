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
  "content": "# CODEOWNERS\n\n## 🎯 Mục tiêu\n- Hiểu rõ khái niệm và lợi ích của tệp tin đặc biệt CODEOWNERS trong việc xác định quyền sở hữu từng module mã nguồn.\n- Nắm vững cú pháp khai báo đường dẫn tệp tin và chỉ định người phụ trách cá nhân (@username) hoặc nhóm (@org/team-name).\n- Kích hoạt tính năng bắt buộc chủ sở hữu mã nguồn phê duyệt (Require review from Code Owners) trong Branch Protection.\n- Tổ chức cấu trúc tệp CODEOWNERS theo thứ tự ưu tiên từ trên xuống dưới một cách chuẩn xác.\n\n## 🧩 Từ khóa hôm nay\n### CODEOWNERS\n- **Nói dễ hiểu**: Tệp tin cấu hình định nghĩa ai là người chịu trách nhiệm chính cho từng phần thư mục mã nguồn.\n- **Ví dụ**: Đặt tệp `.github/CODEOWNERS` quy định thư mục `/src/payment/` do nhóm `@org/finance-team` quản lý.\n- **Đừng nhầm**: Không phải file giới hạn quyền đọc mã nguồn; ai có quyền truy cập repo vẫn xem được code bình thường.\n\n### Review Assignment\n- **Nói dễ hiểu**: Tính năng GitHub tự động gửi lời mời review cho đúng chuyên gia phụ trách khi có Pull Request đụng vào file của họ.\n- **Ví dụ**: Khi sửa file `schema.prisma`, GitHub tự động gán kỹ sư dữ liệu `@db-admin` vào danh sách reviewers.\n- **Đừng nhầm**: GitHub có thể gửi yêu cầu review khi điều kiện phù hợp, nhưng điều đó không có nghĩa owner đã duyệt hoặc việc merge bị chặn.\n\n### Path Pattern Matching\n- **Nói dễ hiểu**: Quy tắc so khớp đường dẫn tương tự `.gitignore` để gán quyền sở hữu theo thư mục hoặc định dạng tệp.\n- **Ví dụ**: Dòng `*.md @tech-writers` gán mọi tệp tài liệu markdown cho đội ngũ viết tài liệu.\n- **Đừng nhầm**: Với một đường dẫn khớp nhiều mẫu, mẫu khớp cuối cùng quyết định owner; cú pháp gần `.gitignore` nhưng không giống hoàn toàn.\n\n## 📖 Định nghĩa\nCODEOWNERS là tệp cấu hình có thể đặt tại `.github/CODEOWNERS`, `/CODEOWNERS` hoặc `docs/CODEOWNERS`. GitHub dùng mẫu đường dẫn trong tệp để yêu cầu review từ owner khi PR sửa các file tương ứng. Để review của code owner thành điều kiện bắt buộc, nhánh đích còn phải bật **Require review from Code Owners**. Tệp cần có trên nhánh đích của PR, và owner phải có quyền ghi vào repository để GitHub nhận diện họ.\n\n## 🤔 Tại sao cần?\nTrong repository có nhiều khu vực chuyên môn, CODEOWNERS giúp PR đến đúng nhóm phụ trách. Tệp chỉ đề xuất/yêu cầu reviewer theo cấu hình; tự nó không giới hạn quyền truy cập file và cũng không bắt buộc phê duyệt nếu branch rule chưa yêu cầu.\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung bệnh viện đa khoa lớn với các khoa chuyên biệt. Khi bệnh nhân cần khám tim, hồ sơ tự động chuyển về khoa Tim mạch; khi có ca gãy xương, hồ sơ chuyển đến khoa Chấn thương. Tệp CODEOWNERS là bảng phân khoa tự động: file thanh toán gửi đến kỹ sư tài chính, file hạ tầng gửi đến nhóm DevOps.\n\n## 🖼 Sơ đồ\n```mermaid\nflowchart TD\n    PR[Pull Request sửa file /src/billing/stripe.ts] --> Check{GitHub đối soát CODEOWNERS}\n    Check --> Match[Khớp dòng: /src/billing/ @fintech-team]\n    Match --> Assign[Tự động gán @fintech-team làm Reviewer]\n    Assign --> Gate{Bật Require review from Code Owners?}\n    Gate -- Không --> Optional[Review được yêu cầu nhưng chưa phải điều kiện bắt buộc]\n    Gate -- Có --> Approval{Owner đã approve?}\n    Approval -- Chưa --> Block[Chưa đủ điều kiện này để merge]\n    Approval -- Rồi --> Allow[Đạt điều kiện code owner; còn phải kiểm tra rule khác]\n```\n\n## 🌎 Ví dụ thực tế\nTrong môi trường phát triển dự án thực tế: một nhóm cấu hình `/src/payment/ @org/finance-devs` và `/deploy/ @org/devops-engineers`. Tệp này cần nằm trên nhánh đích và các nhóm cần quyền ghi. GitHub yêu cầu review từ owner khi PR ở trạng thái sẵn sàng review; merge chỉ bị chặn vì thiếu approval của owner nếu branch protection bật **Require review from Code Owners** và không có ngoại lệ bypass.\n\n## 💻 Command\n```bash\n# Xem nội dung cấu hình phân quyền hiện tại\ncat .github/CODEOWNERS\n\n# Đưa tệp cấu hình mới vào danh sách theo dõi\ngit add .github/CODEOWNERS\n\n# Ghi lại commit thiết lập quyền sở hữu mã nguồn\ngit commit -m \"chore: setup CODEOWNERS for security and billing modules\"\n```\n\n## 🔍 Giải thích command\n- `cat .github/CODEOWNERS`: Đọc và kiểm tra các dòng quy tắc phân quyền chủ sở hữu mã nguồn trong kho.\n- `git add .github/CODEOWNERS`: Đưa tệp phân quyền vào khu vực chờ commit để chuẩn bị lưu trữ lên Git.\n- `git commit -m`: Tạo commit ghi nhận việc thiết lập quyền sở hữu với thông điệp rõ ràng theo chuẩn.\n\n## ⚠️ Sai lầm phổ biến\n- Đặt tệp CODEOWNERS sai vị trí khiến GitHub không nhận diện (chỉ chấp nhận trong `.github/`, thư mục gốc hoặc `docs/`).\n- Nhầm lẫn thứ tự ưu tiên: quy tắc khớp cuối cùng nằm ở phía dưới tệp sẽ ghi đè lên quy tắc rộng ở phía trên.\n- Khai báo tài khoản hoặc nhóm GitHub chưa được cấp quyền truy cập repository khiến quy tắc bị vô hiệu hóa.\n\n## 🧪 Lab\nCùng tôi thiết lập tệp CODEOWNERS để phân quyền người duyệt mã nguồn tự động cho từng module:\n\n1. Tạo thư mục `.github` và tạo tệp `.github/CODEOWNERS`.\n2. Ghi `* @owner-account`, rồi khai báo một nhóm/cộng tác viên khác có quyền ghi cho tài liệu: `/docs/ @org/docs-team`.\n3. Commit và đẩy tệp lên nhánh mặc định; từ tài khoản khác tạo PR sửa một file trong `docs/`.\n4. Chuyển PR từ Draft sang Ready for review nếu cần và quan sát review request. Nếu chưa có cộng tác viên thứ hai, hãy kiểm tra mẫu và dự đoán owner thay vì tự gán tác giả làm reviewer.\n\n## 💡 Hint\n- Bạn có thể khai báo một tài khoản cá nhân `@username` hoặc một nhóm trong tổ chức `@org/team-name`.\n- Đặt quy tắc rộng trước, quy tắc cụ thể sau; với một file khớp nhiều mẫu, owner của mẫu khớp cuối cùng được dùng.\n\n## ✅ Validation\n- Tệp CODEOWNERS hợp lệ có trên nhánh đích của PR và owner có quyền ghi.\n- Xác định được review request nào GitHub gửi và liệu nó có bắt buộc để merge hay không.\n\n## ❓ Quiz\nHãy hoàn thành bài trắc nghiệm bên dưới để kiểm tra mức độ nắm vững cú pháp và cơ chế phân quyền tự động của CODEOWNERS.\n\n## 🔥 Challenge\nThiết kế cấu trúc tệp CODEOWNERS cho hệ thống Monorepo gồm ba dịch vụ độc lập: frontend (React), backend (Go) và infrastructure (Terraform), bảo đảm mỗi đội chỉ duyệt code của dịch vụ mình.\n\n## 📚 Tổng kết\n- CODEOWNERS ánh xạ mẫu đường dẫn tới owner và có thể tạo review request.\n- Quy tắc khớp cuối cùng cho một đường dẫn quyết định owner; pattern gần `.gitignore` nhưng có khác biệt.\n- Chỉ khi nhánh yêu cầu review từ Code Owners thì approval mới là điều kiện bắt buộc.\n",
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
        "question": "Khi một PR ở trạng thái sẵn sàng review sửa file được khai báo trong CODEOWNERS hợp lệ trên nhánh đích, điều gì có thể xảy ra?",
        "type": "single",
        "options": [
          {
            "text": "GitHub gửi review request tới owner khớp, nếu owner có quyền ghi vào repository",
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
        "explanation": "CODEOWNERS tạo review request cho owner khớp; PR Draft chưa gửi yêu cầu cho tới khi sẵn sàng review, và request chưa đồng nghĩa với approval bắt buộc."
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
        "explanation": "Với các pattern khớp cùng file, pattern khớp cuối cùng xác định owner; cú pháp CODEOWNERS gần giống nhưng không hoàn toàn giống `.gitignore`."
      },
      {
        "id": "q4",
        "question": "Khi kết hợp CODEOWNERS với tùy chọn \"Require review from Code Owners\" trong Branch Protection, điều kiện để merge là gì?",
        "type": "single",
        "options": [
          {
            "text": "Cần approval từ code owner theo quy tắc đã bật, trừ khi có ngoại lệ bypass áp dụng",
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
        "explanation": "CODEOWNERS tự nó chỉ yêu cầu review; branch protection phải bật yêu cầu review từ owner để biến approval thành điều kiện merge."
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
