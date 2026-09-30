import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "01-why-team-workflow",
  "moduleId": "06-team-workflows",
  "metadata": {
    "id": "01-why-team-workflow",
    "title": "Vì sao team cần workflow?",
    "level": "advanced",
    "duration": 20,
    "xp": 70,
    "prerequisites": [
      "22-advanced-git-challenge"
    ],
    "objectives": [
      "Hiểu rõ sự khác biệt bản chất giữa lập trình cá nhân và phát triển phần mềm theo đội ngũ chuyên nghiệp.",
      "Nhận diện các rủi ro thảm họa khi đội ngũ không có quy trình phân nhánh và tích hợp mã nguồn rõ ràng.",
      "Nắm bắt các lợi ích cốt lõi của một Git Workflow chuẩn: giảm xung đột, bảo đảm chất lượng, tự động hóa phát hành.",
      "Sẵn sàng tiếp cận các mô hình workflow chuẩn mực trong ngành công nghiệp phần mềm hiện đại."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "team workflow",
      "quy trinh nhom",
      "quy uoc git",
      "git branch strategy",
      "hop tac phat trien",
      "chat luong ma nguon"
    ],
    "commands": [
      "git status",
      "git branch -a",
      "git log --oneline --graph"
    ]
  },
  "content": "# Vì sao team cần workflow?\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ sự khác biệt bản chất giữa lập trình cá nhân và phát triển phần mềm theo đội ngũ chuyên nghiệp.\n- Nhận diện các rủi ro thảm họa khi đội ngũ không có quy trình phân nhánh và tích hợp mã nguồn rõ ràng.\n- Nắm bắt các lợi ích cốt lõi của một Git Workflow chuẩn: giảm xung đột, bảo đảm chất lượng, tự động hóa phát hành.\n- Sẵn sàng tiếp cận các mô hình workflow chuẩn mực trong ngành công nghiệp phần mềm hiện đại.\n\n---\n\n## 📖 Định nghĩa\n> Team Workflow (Quy trình làm việc nhóm trong Git) là một tập hợp các quy tắc, thỏa thuận và quy ước có cấu trúc rõ ràng về cách các thành viên trong một dự án tương tác với kho lưu trữ mã nguồn chung. Nó định nghĩa cụ thể chiến lược phân nhánh (Branching Strategy), quy chuẩn đặt tên commit, quy trình kiểm duyệt mã nguồn (Code Review), tiêu chí hợp nhất (Merge Criteria) và cách thức phát hành sản phẩm. Thiếu đi workflow, Git chỉ là một công cụ lưu trữ dữ liệu hỗn loạn; có workflow chuẩn mực, Git trở thành xương sống vận hành nhịp nhàng của cả tổ chức công nghệ.\n\n---\n\n## 🤔 Tại sao cần?\nKhi bạn làm việc một mình, bạn có toàn quyền commit thẳng vào nhánh main, sửa lỗi bất cứ lúc nào và tự quyết định khi nào sản phẩm sẵn sàng. Nhưng khi quy mô dự án tăng lên từ 5, 10 đến hàng trăm kỹ sư cùng đồng thời phát triển trên một codebase, sự tự do không kiểm soát sẽ nhanh chóng biến thành cơn ác mộng: mã nguồn bị ghi đè lẫn nhau, các tính năng chưa hoàn thiện bị đưa nhầm lên production, xung đột code xuất hiện liên tục và không ai chịu trách nhiệm khi hệ thống gặp sự cố.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung hệ thống giao thông trong một thành phố hiện đại. Nếu trên đường chỉ có duy nhất một chiếc xe của bạn chạy giữa đêm khuya, bạn có thể rẽ trái, rẽ phải hoặc dừng lại tùy ý mà không gây tai nạn. Nhưng khi có hàng ngàn chiếc xe cùng lưu thông vào giờ cao điểm, xã hội bắt buộc phải có đèn tín hiệu giao thông, làn đường riêng, biển báo giới hạn tốc độ và quy tắc nhường đường. Git Workflow chính là luật giao thông giúp dòng chảy mã nguồn của hàng chục kỹ sư lưu thông trơn tru mà không xảy ra va chạm hay tắc nghẽn thảm khốc.\n\n---\n\n## 🖼 Sơ đồ\n```text\nSự khác biệt giữa phát triển tự do và có Git Workflow chuẩn mực:\nTỰ DO (CHAOS):\nDev A ──push direct──► [main branch] ◄──push direct── Dev B (Ghi đè, xung đột, vỡ app)\n                               ▲\nDev C ──────push code lỗi──────┘\n\nCÓ WORKFLOW (ORDER):\nDev A ──► [feat/login] ──► PR Review ──┐\nDev B ──► [feat/cart]  ──► PR Review ──┼──► [Automated CI Test] ──► [main branch (Protected)]\nDev C ──► [fix/typo]   ──► PR Review ──┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTại một công ty khởi nghiệp công nghệ, ban đầu ba kỹ sư cùng commit trực tiếp vào nhánh `main` mà không theo bất kỳ quy chuẩn nào. Vào một buổi chiều trước đợt khuyến mãi lớn, kỹ sư Hoàng đẩy một đoạn code đang dở dang lên nhánh chính khiến tính năng đăng nhập bị tê liệt toàn bộ. Đồng thời, kỹ sư Mai vô tình force push làm mất sạch phần mã nguồn thanh toán vừa viết xong của kỹ sư Tuấn. Cả nhóm mất trọn một đêm trắng trong hoảng loạn để tìm lại code và giải quyết xung đột. Sau sự cố nhớ đời đó, nhóm đã ngồi lại cùng nhau thiết lập một quy trình làm việc chuẩn mực: cấm push trực tiếp vào main, mọi tính năng đều phải tạo nhánh riêng và bắt buộc phải qua bước kiểm duyệt mã nguồn cẩn thận.\n\n---\n\n## 💻 Command\n```bash\ngit status\ngit branch -a\ngit log --oneline --graph\n```\n\n---\n\n## 🔍 Giải thích command\n- `git status`: Kiểm tra tình trạng nhánh làm việc và các tệp tin trước khi bắt đầu quy trình.\n- `git branch -a`: Liệt kê toàn bộ các nhánh cục bộ và nhánh trên máy chủ từ xa để nắm bắt bức tranh tổng quan.\n- `git log --oneline --graph`: Hiển thị sơ đồ trực quan các nhánh và commit giúp theo dõi tiến độ tích hợp.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Cho phép thành viên commit và push trực tiếp vào nhánh sản phẩm chính main hoặc production.**: Cho phép thành viên commit và push trực tiếp vào nhánh sản phẩm chính main hoặc production.\n2. **Thiết lập quy trình quá rườm rà, cứng nhắc không phù hợp với quy mô thực tế và tốc độ của dự án.**: Thiết lập quy trình quá rườm rà, cứng nhắc không phù hợp với quy mô thực tế và tốc độ của dự án.\n3. **Không tổ chức hướng dẫn, phổ biến và giám sát việc tuân thủ quy ước nhóm một cách đồng bộ.**: Không tổ chức hướng dẫn, phổ biến và giám sát việc tuân thủ quy ước nhóm một cách đồng bộ.\n\n---\n\n## 🧪 Lab\n1. Thảo luận và liệt kê 3 rủi ro lớn nhất nếu một nhóm 10 lập trình viên cùng push thẳng vào main.\n2. Sử dụng lệnh `git branch -a` và `git log --graph` để quan sát cấu trúc nhánh trong một kho lưu trữ mẫu.\n\n---\n\n## 💡 Hint\n> Một workflow tốt là workflow cân bằng giữa tính an toàn bảo vệ mã nguồn và tốc độ phát triển của nhóm.\n\n---\n\n## ✅ Validation\n- Hiểu rõ tại sao các tổ chức công nghệ chuyên nghiệp luôn cấm commit trực tiếp lên main.\n\n---\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm dưới đây để kiểm tra hiểu biết của bạn về tầm quan trọng của Git Workflow.\n\n---\n\n## 🔥 Challenge\nPhân tích các tổn thất về chi phí tài chính và uy tín khi một đoạn mã lỗi bị đưa nhầm lên production do thiếu quy trình review.\n\n---\n\n## 📚 Tổng kết\n- Team Workflow là nền tảng sống còn bảo đảm sự phối hợp nhịp nhàng giữa nhiều kỹ sư trên một codebase.\n- Quy trình chuẩn giúp loại bỏ rủi ro ghi đè code, phát hiện lỗi sớm qua kiểm duyệt và bảo vệ nhánh chính.\n- Mọi dự án chuyên nghiệp đều phân tách rõ ràng giữa nhánh phát triển tính năng và nhánh phát hành ổn định.\n",
  "quiz": {
    "id": "quiz-06-01-why-team-workflow",
    "title": "Trắc nghiệm: Vì sao team cần workflow?",
    "questions": [
      {
        "id": "q1",
        "question": "Lợi ích cốt lõi quan trọng nhất của việc áp dụng Git Workflow trong một đội ngũ phần mềm là gì?",
        "type": "single",
        "options": [
          {
            "text": "Giảm thiểu xung đột, ngăn ngừa ghi đè mã nguồn và bảo đảm chất lượng phần mềm trước khi phát hành",
            "correct": true
          },
          {
            "text": "Làm tăng dung lượng lưu trữ của máy chủ đám mây",
            "correct": false
          },
          {
            "text": "Giúp lập trình viên không cần viết mã nguồn kiểm thử nữa",
            "correct": false
          },
          {
            "text": "Tự động sửa toàn bộ các lỗi thuật toán logic trong chương trình",
            "correct": false
          }
        ],
        "explanation": "Quy trình làm việc nhóm giúp chuẩn hóa việc tích hợp mã nguồn, ngăn ngừa rủi ro hỏng hóc hệ thống và giữ nhánh chính luôn ổn định."
      },
      {
        "id": "q2",
        "question": "Hành động nào sau đây bị xem là thiếu chuyên nghiệp và tiềm ẩn nguy cơ cao nhất trong làm việc nhóm?",
        "type": "single",
        "options": [
          {
            "text": "Mọi thành viên đều commit và push trực tiếp các đoạn code chưa kiểm thử vào nhánh main",
            "correct": true
          },
          {
            "text": "Tạo nhánh riêng cho từng tính năng mới cần phát triển",
            "correct": false
          },
          {
            "text": "Yêu cầu đồng nghiệp kiểm duyệt mã nguồn thông qua Pull Request",
            "correct": false
          },
          {
            "text": "Chạy kiểm thử tự động trước khi hợp nhất mã nguồn vào nhánh chính",
            "correct": false
          }
        ],
        "explanation": "Commit thẳng lên nhánh main dễ khiến code lỗi chưa qua kiểm thử phá hỏng phiên bản chạy thực tế của khách hàng."
      },
      {
        "id": "q3",
        "question": "Yếu tố nào sau đây KHÔNG phải là một thành phần bắt buộc của một Git Workflow tiêu chuẩn?",
        "type": "single",
        "options": [
          {
            "text": "Quy định mọi kỹ sư phải sử dụng cùng một loại bàn phím máy tính giống hệt nhau",
            "correct": true
          },
          {
            "text": "Chiến lược đặt tên và phân tách các nhánh chức năng",
            "correct": false
          },
          {
            "text": "Quy chuẩn viết nội dung thông điệp commit rõ ràng",
            "correct": false
          },
          {
            "text": "Quy trình kiểm duyệt và điều kiện phê duyệt Pull Request",
            "correct": false
          }
        ],
        "explanation": "Git Workflow tập trung vào quy ước quản lý mã nguồn và nhánh, không can thiệp vào trang thiết bị phần cứng của lập trình viên."
      },
      {
        "id": "q4",
        "question": "Khi một lập trình viên mới gia nhập đội ngũ dự án, tài liệu đầu tiên họ cần đọc và tuân thủ là gì?",
        "type": "single",
        "options": [
          {
            "text": "Tài liệu hướng dẫn quy ước làm việc nhóm và chiến lược phân nhánh Git Workflow của dự án",
            "correct": true
          },
          {
            "text": "Toàn bộ hợp đồng lao động của tất cả các nhân viên trong công ty",
            "correct": false
          },
          {
            "text": "Bảng sao kê chi tiết tài chính quý trước của doanh nghiệp",
            "correct": false
          },
          {
            "text": "Lịch sử tin nhắn cá nhân của người quản lý dự án",
            "correct": false
          }
        ],
        "explanation": "Nắm vững Git Workflow giúp thành viên mới nhanh chóng hòa nhập, đóng góp mã nguồn an toàn mà không phá vỡ cấu trúc kho lưu trữ."
      }
    ]
  }
};
export default lesson;
