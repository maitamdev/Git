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
  "content": "# Vì sao team cần workflow?\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ sự khác biệt bản chất giữa lập trình cá nhân và phát triển phần mềm theo đội ngũ chuyên nghiệp.\n- Nhận diện các rủi ro thảm họa khi đội ngũ không có quy trình phân nhánh và tích hợp mã nguồn rõ ràng.\n- Nắm bắt các lợi ích cốt lõi của một Git Workflow chuẩn: giảm xung đột, bảo đảm chất lượng, tự động hóa phát hành.\n- Sẵn sàng tiếp cận các mô hình workflow chuẩn mực trong ngành công nghiệp phần mềm hiện đại.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Git Workflow\n- **Nói dễ hiểu**: Bộ quy tắc và quy ước thống nhất trong nhóm về cách tạo nhánh, đặt tên commit, review code và phát hành sản phẩm.\n- **Ví dụ**: Quy định mọi tính năng mới phải làm trên nhánh riêng dạng `feat/<tên-tính-năng>` và mở Pull Request để review.\n- **Đừng nhầm**: Workflow không phải là một lệnh Git cụ thể; đó là thỏa thuận làm việc giữa các thành viên trong dự án.\n\n### Branching Strategy (Chiến lược phân nhánh)\n- **Nói dễ hiểu**: Cách thức tổ chức và phân chia vòng đời của các nhánh (main, feature, release, hotfix) trong kho lưu trữ.\n- **Ví dụ**: Chọn GitHub Flow với nhánh main và các nhánh feature ngắn hạn cho dự án phát hành liên tục.\n- **Đừng nhầm**: Không có một chiến lược nào phù hợp cho mọi dự án; cần chọn chiến lược tùy thuộc vào quy mô và chu kỳ phát hành.\n\n### Production-ready Branch\n- **Nói dễ hiểu**: Nhánh chính (thường là main) luôn được bảo vệ ở trạng thái hoạt động hoàn hảo, sẵn sàng triển khai cho người dùng bất kỳ lúc nào.\n- **Ví dụ**: Chỉ hợp nhất code vào nhánh main sau khi đã vượt qua toàn bộ bài kiểm tra tự động và có phê duyệt từ ít nhất một đồng nghiệp.\n- **Đừng nhầm**: Tuyệt đối không commit hoặc push code thử nghiệm chưa hoàn thiện trực tiếp lên nhánh production-ready.\n\n---\n\n## 📖 Định nghĩa\nTeam Workflow là tập hợp các quy tắc và thỏa thuận có cấu trúc rõ ràng về cách các thành viên trong đội ngũ tương tác với kho lưu trữ Git: cách phân nhánh, viết commit, kiểm duyệt mã nguồn và phát hành sản phẩm an toàn.\n\n---\n\n## 💡 Tại sao cần\nKhi làm việc cá nhân, bạn có thể commit tùy ý. Nhưng khi nhiều kỹ sư cùng làm việc trên một codebase, thiếu quy trình sẽ dẫn đến ghi đè code, phát sinh xung đột liên tục và đưa nhầm lỗi lên môi trường thực tế của khách hàng.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung hệ thống giao thông thành phố. Khi chỉ có một xe chạy đêm, bạn rẽ tùy ý. Nhưng giờ cao điểm với hàng ngàn xe, bắt buộc phải có đèn tín hiệu, làn đường và luật nhường đường. Git Workflow chính là luật giao thông giúp dòng chảy mã nguồn lưu thông an toàn mà không va chạm.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nSự khác biệt giữa phát triển tự do và có Git Workflow chuẩn mực:\nTỰ DO (CHAOS):\nDev A ──push direct──► [main branch] ◄──push direct── Dev B (Ghi đè, xung đột, vỡ app)\n                                ▲\nDev C ──────push code lỗi──────┘\n\nCÓ WORKFLOW (ORDER):\nDev A ──► [feat/login] ──► PR Review ──┐\nDev B ──► [feat/cart]  ──► PR Review ──┼──► [Automated CI Test] ──► [main (Protected)]\nDev C ──► [fix/typo]   ──► PR Review ──┘\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nTại một công ty công nghệ, ba kỹ sư cùng push trực tiếp vào nhánh main khiến ứng dụng tê liệt trước giờ khuyến mãi. Sau sự cố nhớ đời, nhóm thiết lập quy trình chuẩn: cấm push trực tiếp vào main, mọi tính năng đều tách nhánh riêng và bắt buộc qua bước review cẩn thận.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit status\ngit branch -a\ngit log --oneline --graph\n```\n\n---\n\n## 🔍 Giải thích command\n- `git status`: Kiểm tra tình trạng nhánh làm việc và các tệp tin trước khi bắt đầu quy trình.\n- `git branch -a`: Liệt kê toàn bộ các nhánh cục bộ và nhánh trên máy chủ từ xa để nắm bắt bức tranh tổng quan.\n- `git log --oneline --graph`: Hiển thị sơ đồ trực quan các nhánh và commit giúp theo dõi tiến độ tích hợp.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Push trực tiếp vào main**: Để các thành viên commit tự do vào nhánh chính sẽ gây xung đột mã nguồn và rò rỉ lỗi lên production.\n2. **Quy trình quá cứng nhắc**: Thiết lập quy trình quá rườm rà không phù hợp với quy mô thực tế sẽ làm chậm tiến độ bàn giao sản phẩm.\n3. **Thiếu tài liệu hướng dẫn**: Không phổ biến và ghi chép rõ ràng khiến các thành viên mới làm sai lệch quy chuẩn chung của nhóm.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.\n1. Thảo luận và liệt kê 3 rủi ro lớn nhất nếu một nhóm 10 lập trình viên cùng push thẳng vào main.\n2. Sử dụng lệnh `git branch -a` và `git log --graph` để quan sát cấu trúc nhánh trong một kho lưu trữ thực tế.\n3. Kiểm tra các nhánh đang hoạt động và đối chiếu xem nhánh chính có được bảo vệ hay không.\n\n---\n\n## 💡 Hint & mẹo\n> Một workflow tốt là workflow cân bằng hoàn hảo giữa tính an toàn bảo vệ mã nguồn và tốc độ phát triển linh hoạt của toàn đội ngũ.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Hiểu rõ tại sao các tổ chức công nghệ chuyên nghiệp luôn cấm commit trực tiếp lên main.\n- Nắm vững vai trò cốt lõi của chiến lược phân nhánh và văn hóa kiểm duyệt mã nguồn qua Pull Request.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài trắc nghiệm dưới đây để kiểm tra hiểu biết của bạn về tầm quan trọng của Git Workflow.\n\n---\n\n## 🚀 Thử thách nâng cao\nPhân tích các tổn thất về chi phí tài chính và uy tín khi một đoạn mã lỗi bị đưa nhầm lên production do thiếu quy trình review.\n\n---\n\n## 📝 Tổng kết\n- Team Workflow là nền tảng sống còn bảo đảm sự phối hợp nhịp nhàng giữa nhiều kỹ sư trên một codebase.\n- Quy trình chuẩn giúp loại bỏ rủi ro ghi đè code, phát hiện lỗi sớm qua kiểm duyệt và bảo vệ nhánh chính.\n- Mở đường cho các mô hình phân nhánh chuẩn mực tiếp theo: Feature Branch, GitHub Flow, Git Flow.\n",
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
      },
      {
        "id": "q5",
        "question": "Khái niệm \"Production-ready\" của nhánh chính (main) trong một workflow chuẩn có ý nghĩa là gì?",
        "type": "single",
        "options": [
          {
            "text": "Nhánh chính luôn ở trạng thái ổn định tuyệt đối, đã qua kiểm thử và có thể triển khai lên môi trường thực tế bất kỳ lúc nào",
            "correct": true
          },
          {
            "text": "Nhánh chính chứa toàn bộ mã nguồn nháp của tất cả các lập trình viên",
            "correct": false
          },
          {
            "text": "Nhánh chính chỉ được phép đọc bởi ban giám đốc công ty",
            "correct": false
          },
          {
            "text": "Nhánh chính sẽ tự động xóa sau mỗi lần phát hành phiên bản",
            "correct": false
          }
        ],
        "explanation": "Nguyên tắc bất biến của các Git workflow hiện đại là giữ nhánh chính luôn ổn định và sẵn sàng triển khai cho khách hàng."
      }
    ]
  }
};
export default lesson;
