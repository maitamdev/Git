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
  "content": "# Vì sao team cần workflow?\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ sự khác biệt bản chất giữa lập trình cá nhân và phát triển phần mềm theo đội ngũ chuyên nghiệp.\n- Nhận diện các rủi ro thảm họa khi đội ngũ không có quy trình phân nhánh và tích hợp mã nguồn rõ ràng.\n- Nêu cách workflow có thể hỗ trợ phối hợp và những rủi ro nó không loại bỏ được.\n- Sẵn sàng tiếp cận các mô hình workflow chuẩn mực trong ngành công nghiệp phần mềm hiện đại.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Git Workflow\n- **Nói dễ hiểu**: Bộ quy tắc và quy ước thống nhất trong nhóm về cách tạo nhánh, đặt tên commit, review code và phát hành sản phẩm.\n- **Ví dụ**: Quy định mọi tính năng mới phải làm trên nhánh riêng dạng `feat/<tên-tính-năng>` và mở Pull Request để review.\n- **Đừng nhầm**: Workflow không phải là một lệnh Git cụ thể; đó là thỏa thuận làm việc giữa các thành viên trong dự án.\n\n### Branching Strategy (Chiến lược phân nhánh)\n- **Nói dễ hiểu**: Cách thức tổ chức và phân chia vòng đời của các nhánh (main, feature, release, hotfix) trong kho lưu trữ.\n- **Ví dụ**: Chọn GitHub Flow với nhánh main và các nhánh feature ngắn hạn cho dự án phát hành liên tục.\n- **Đừng nhầm**: Không có một chiến lược nào phù hợp cho mọi dự án; cần chọn chiến lược tùy thuộc vào quy mô và chu kỳ phát hành.\n\n### Production-ready Branch\n- **Nói dễ hiểu**: Nhánh chính mà nhóm cố giữ ở trạng thái có thể phát hành; kiểm thử và review giúp giảm rủi ro nhưng không bảo đảm không có lỗi.\n- **Ví dụ**: Nhóm có thể yêu cầu CI xanh và một phê duyệt trước khi PR được gộp vào `main`.\n- **Đừng nhầm**: Đây là chính sách của nhóm, không phải điều Git tự áp dụng. Quy tắc bảo vệ cũng có thể có ngoại lệ.\n\n---\n\n## 📖 Định nghĩa\nTeam Workflow là tập hợp các quy tắc và thỏa thuận có cấu trúc rõ ràng về cách các thành viên trong đội ngũ tương tác với kho lưu trữ Git: cách phân nhánh, viết commit, kiểm duyệt mã nguồn và phát hành sản phẩm an toàn.\n\n---\n\n## 💡 Tại sao cần\nKhi nhiều người cùng sửa một codebase, quy ước rõ ràng giúp biết thay đổi đang ở đâu, ai cần review và cách đưa chúng vào nhánh phát hành. Thiếu phối hợp làm tăng nguy cơ conflict, ghi đè thay đổi hoặc phát hành lỗi; workflow phù hợp giúp kiểm soát các rủi ro đó.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung một nhóm cùng sửa tài liệu: họ thống nhất nơi ghi đề xuất, cách kiểm tra và cách chấp nhận thay đổi. Git workflow là thỏa thuận tương tự cho code. Nó giúp mọi người phối hợp nhưng không thể ngăn mọi lỗi hoặc xung đột.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nVí dụ về một workflow nhóm có thể chọn:\nDev A ──► [feat/login] ──► PR ──► [review/checks nếu đã cấu hình] ──► [main]\nDev B ──► [feat/cart]  ──► PR ──► [review/checks nếu đã cấu hình] ──► [main]\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nTình huống giả định: một nhóm nhận ra push thẳng vào `main` không giúp họ biết ai đã review thay đổi. Họ thống nhất dùng nhánh ngắn hạn và PR cho những thay đổi rủi ro cao; nhóm khác có thể chọn quy trình đơn giản hơn.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit status\ngit branch -a\ngit log --oneline --graph\n```\n\n---\n\n## 🔍 Giải thích command\n- `git status`: Kiểm tra tình trạng nhánh làm việc và các tệp tin trước khi bắt đầu quy trình.\n- `git branch -a`: Liệt kê toàn bộ các nhánh cục bộ và nhánh trên máy chủ từ xa để nắm bắt bức tranh tổng quan.\n- `git log --oneline --graph`: Hiển thị sơ đồ trực quan các nhánh và commit giúp theo dõi tiến độ tích hợp.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Không thống nhất cách cập nhật main**: Push trực tiếp không tự gây lỗi, nhưng có thể bỏ qua review hoặc kiểm tra nếu nhóm cần các bước đó.\n2. **Quy trình quá cứng nhắc**: Thiết lập quy trình quá rườm rà không phù hợp với quy mô thực tế sẽ làm chậm tiến độ bàn giao sản phẩm.\n3. **Thiếu tài liệu hướng dẫn**: Không phổ biến và ghi chép rõ ràng khiến các thành viên mới làm sai lệch quy chuẩn chung của nhóm.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.\n1. Nêu 3 rủi ro có thể tăng khi nhiều người cập nhật cùng nhánh mà thiếu quy ước chung; phân biệt khả năng xảy ra với điều chắc chắn.\n2. Dùng `git branch -a` và `git log --oneline --graph --all` để xem các nhánh/lịch sử trong repo.\n3. Nếu có repo GitHub và quyền xem Settings, kiểm tra rule của nhánh chính; nếu không, ghi rõ đây là thông tin cần quản trị viên xác nhận.\n\n---\n\n## 💡 Hint & mẹo\n> Chọn số bước review, kiểm thử và phát hành theo mức rủi ro, quy mô nhóm và cách sản phẩm được triển khai.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Giải thích được workflow giúp nhóm phối hợp, review và phát hành như thế nào.\n- Nêu được một lợi ích và một chi phí của quy trình PR trong bối cảnh cụ thể.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài trắc nghiệm dưới đây để kiểm tra hiểu biết của bạn về tầm quan trọng của Git Workflow.\n\n---\n\n## 🚀 Thử thách nâng cao\nPhân tích các tổn thất về chi phí tài chính và uy tín khi một đoạn mã lỗi bị đưa nhầm lên production do thiếu quy trình review.\n\n---\n\n## 📝 Tổng kết\n- Team workflow là thỏa thuận về cách nhóm đề xuất, kiểm tra và tích hợp thay đổi.\n- Nhánh, review và CI có thể giảm một số rủi ro; chúng không bảo đảm code không lỗi.\n- Mở đường cho các mô hình phân nhánh chuẩn mực tiếp theo: Feature Branch, GitHub Flow, Git Flow.\n",
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
        "explanation": "Workflow làm rõ cách nhóm tích hợp thay đổi và có thể giảm rủi ro; review, test và cách phát hành cụ thể tùy cấu hình của dự án."
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
        "explanation": "Nếu nhóm yêu cầu review/test trước khi cập nhật `main`, push code chưa kiểm thử sẽ bỏ qua các bước đó; nhóm cần nêu rõ chính sách của mình."
      },
      {
        "id": "q3",
        "question": "Nội dung nào không thuộc thỏa thuận về cách nhóm quản lý thay đổi mã nguồn?",
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
            "text": "Mục tiêu của nhóm là giữ `main` ở trạng thái có thể phát hành; review và CI giúp giảm rủi ro nhưng không bảo đảm tuyệt đối",
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
        "explanation": "\"Production-ready\" mô tả mục tiêu theo chính sách nhóm; nó không bảo đảm tuyệt đối rằng không có lỗi."
      }
    ]
  }
};
export default lesson;
