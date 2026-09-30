import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "06-workflow-comparison",
  "moduleId": "06-team-workflows",
  "metadata": {
    "id": "06-workflow-comparison",
    "title": "So sánh GitHub Flow / Git Flow / Trunk-Based",
    "level": "advanced",
    "duration": 30,
    "xp": 100,
    "prerequisites": [
      "03-github-flow",
      "04-git-flow",
      "05-trunk-based-development"
    ],
    "objectives": [
      "Lập bảng ma trận so sánh chi tiết ưu nhược điểm, độ phức tạp và trường hợp sử dụng của 3 mô hình workflow hàng đầu.",
      "Hiểu rõ sự đánh đổi (Trade-offs) giữa tính linh hoạt tốc độ cao và mức độ kiểm soát an toàn nghiêm ngặt.",
      "Phân tích được các tiêu chí cốt lõi để lựa chọn workflow phù hợp: loại sản phẩm, quy mô đội ngũ, chu kỳ phát hành, độ chín CI/CD.",
      "Tự tin tư vấn và thiết lập quy trình phân nhánh tối ưu cho một dự án thực tế."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "so sanh workflow",
      "git flow vs github flow",
      "trunk based vs git flow",
      "chon workflow phu hop",
      "ma tran quy trinh",
      "branching tradeoffs"
    ],
    "commands": [
      "git log --oneline --graph --all",
      "git branch --list"
    ]
  },
  "content": "# So sánh GitHub Flow / Git Flow / Trunk-Based\n\n---\n\n## 🎯 Mục tiêu\n- Lập bảng ma trận so sánh chi tiết ưu nhược điểm, độ phức tạp và trường hợp sử dụng của 3 mô hình workflow hàng đầu.\n- Hiểu rõ sự đánh đổi (Trade-offs) giữa tính linh hoạt tốc độ cao và mức độ kiểm soát an toàn nghiêm ngặt.\n- Phân tích được các tiêu chí cốt lõi để lựa chọn workflow phù hợp: loại sản phẩm, quy mô đội ngũ, chu kỳ phát hành, độ chín CI/CD.\n- Tự tin tư vấn và thiết lập quy trình phân nhánh tối ưu cho một dự án thực tế.\n\n---\n\n## 📖 Định nghĩa\n> Việc lựa chọn chiến lược phân nhánh mã nguồn không có câu trả lời \"đúng tuyệt đối cho mọi dự án\", mà là một bài toán cân nhắc sự đánh đổi (Trade-off Analysis) kỹ lưỡng. Ba mô hình phổ biến nhất hiện nay đại diện cho ba triết lý khác nhau: **Git Flow** ưu tiên sự kiểm soát tối đa và an toàn tuyệt đối cho các chu kỳ phát hành dài hạn; **GitHub Flow** ưu tiên sự đơn giản và tinh gọn cho các ứng dụng web triển khai liên tục; và **Trunk-Based Development** tối ưu hóa tốc độ tích hợp cao nhất cho các tổ chức sở hữu hạ tầng CI/CD tự động hóa vượt trội.\n\n---\n\n## 🤔 Tại sao cần?\nÁp dụng sai workflow là nguyên nhân hàng đầu gây lãng phí năng suất kỹ thuật: bắt một startup web 3 người dùng mô hình Git Flow cồng kềnh với 5 loại nhánh sẽ khiến tiến độ bị đình trệ vì thủ tục hành chính; ngược lại, ép một nhóm phát triển firmware thiết bị y tế dùng Trunk-Based khi chưa có kiểm thử tự động sẽ tiềm ẩn nguy cơ thảm họa an toàn nghiêm trọng. Hiểu sâu bản chất giúp bạn chọn đúng công cụ cho đúng bài toán.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy so sánh ba mô hình với các phương tiện giao thông. **Git Flow** giống như một đoàn tàu hỏa chở hàng siêu trường: chạy theo lịch trình biểu giờ cố định nghiêm ngặt, có nhiều toa kiểm soát an toàn, cực kỳ khó trật bánh nhưng không thể đổi hướng tức thì. **GitHub Flow** giống như một chiếc xe ô tô cá nhân: linh hoạt, gọn gàng, có thể xuất phát bất cứ lúc nào bạn muốn, chỉ cần tuân thủ làn đường chính. Còn **Trunk-Based Development** giống như một đoàn xe đua F1 tốc độ cao: cực nhanh, yêu cầu kỹ năng lái điêu luyện và đội ngũ kỹ thuật pit-stop (hệ thống CI) hỗ trợ tức thì từng giây.\n\n---\n\n## 🖼 Sơ đồ\n```text\nBảng ma trận so sánh 3 mô hình Workflow hàng đầu:\n┌─────────────────┬──────────────┬──────────────┬────────────────────────┐\n│ Tiêu chí        │ Git Flow     │ GitHub Flow  │ Trunk-Based Dev        │\n├─────────────────┼──────────────┼──────────────┼────────────────────────┤\n│ Độ phức tạp     │ Cao (5 nhánh)│ Thấp (1 chính)│ Rất thấp (1 Trunk)     │\n│ Chu kỳ Release  │ Tuần / Tháng │ Vài lần/ngày │ Liên tục từng giờ      │\n│ Tuổi thọ nhánh  │ Dài hạn      │ Vài ngày     │ Rất ngắn (< 1-2 ngày)  │\n│ Hạ tầng CI/CD   │ Cơ bản       │ Khá          │ Rất cao (Bắt buộc)     │\n│ Dự án phù hợp   │ Mobile/Enter │ Web/SaaS     │ Microservices/BigTech  │\n└─────────────────┴──────────────┴──────────────┴────────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột công ty phần mềm đa quốc gia quản lý hai dòng sản phẩm khác nhau. Với sản phẩm ứng dụng ngân hàng di động trên iOS/Android chịu sự kiểm duyệt khắt khe của kho ứng dụng và quy định tài chính, công ty áp dụng mô hình **Git Flow** để có giai đoạn release freeze kiểm thử an ninh toàn diện. Trong khi đó, với dịch vụ backend microservices chạy trên nền tảng đám mây AWS với hơn 1.000 ca kiểm thử tự động, đội ngũ kỹ sư áp dụng triệt để **Trunk-Based Development**, cho phép 50 lập trình viên đẩy hàng chục bản cập nhật lên production mỗi ngày mà không gặp bất kỳ sự cố nào.\n\n---\n\n## 💻 Command\n```bash\ngit log --oneline --graph --all\ngit branch --list\n```\n\n---\n\n## 🔍 Giải thích command\n- `git log --graph --all`: Trực quan hóa toàn bộ biểu đồ lịch sử các nhánh để xác định chính xác nhóm bạn đang vận hành theo mô hình phân nhánh nào.\n- `git branch --list`: Liệt kê toàn bộ các nhánh đang tồn tại trong dự án để đánh giá độ phức tạp, số lượng và tuổi thọ thực tế của các nhánh.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Áp dụng Git Flow máy móc cho các dự án web quy mô nhỏ cần phát triển nhanh chóng.**: Áp dụng Git Flow máy móc cho các dự án web quy mô nhỏ cần phát triển nhanh chóng.\n2. **Áp dụng Trunk-Based Development khi nhóm chưa hề có hạ tầng kiểm thử tự động (Unit Test / CI).**: Áp dụng Trunk-Based Development khi nhóm chưa hề có hạ tầng kiểm thử tự động (Unit Test / CI).\n3. **Thay đổi workflow liên tục khiến các thành viên trong nhóm bị hoang mang và mất phương hướng.**: Thay đổi workflow liên tục khiến các thành viên trong nhóm bị hoang mang và mất phương hướng.\n\n---\n\n## 🧪 Lab\n1. Phân tích dự án hiện tại của bạn dựa trên 4 tiêu chí: loại sản phẩm, tốc độ release, độ chín của CI và quy mô nhóm.\n2. Lựa chọn mô hình workflow tối ưu nhất và viết bản giải trình ngắn gọn lý do lựa chọn.\n\n---\n\n## 💡 Hint\n> Không có quy trình nào là hoàn hảo tuyệt đối; quy trình tốt nhất là quy trình giải quyết đúng nút thắt của đội ngũ.\n\n---\n\n## ✅ Validation\n- Giải thích được các rủi ro cụ thể nếu chọn sai workflow cho một kịch bản dự án phần mềm.\n\n---\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm dưới đây để đối chiếu và so sánh các mô hình workflow.\n\n---\n\n## 🔥 Challenge\nĐề xuất phương án chuyển dịch từng bước từ mô hình Git Flow sang Trunk-Based Development cho một dự án đang phát triển.\n\n---\n\n## 📚 Tổng kết\n- Git Flow phù hợp với các sản phẩm có lịch phát hành cố định và yêu cầu kiểm soát nhiều tầng.\n- GitHub Flow tối ưu cho các sản phẩm web triển khai liên tục và quy mô nhóm vừa phải.\n- Trunk-Based Development mang lại tốc độ cao nhất nhưng đòi hỏi hệ thống kiểm thử tự động cực kỳ hoàn hảo.\n",
  "quiz": {
    "id": "quiz-06-06-workflow-comparison",
    "title": "Trắc nghiệm: So sánh các mô hình Workflow",
    "questions": [
      {
        "id": "q1",
        "question": "Một công ty khởi nghiệp gồm 4 lập trình viên đang xây dựng một ứng dụng web SaaS cần deploy nhiều lần mỗi ngày thì nên chọn mô hình nào?",
        "type": "single",
        "options": [
          {
            "text": "GitHub Flow vì tính tinh gọn, đơn giản và hỗ trợ triển khai liên tục hoàn hảo",
            "correct": true
          },
          {
            "text": "Git Flow vì nó có đủ 5 loại nhánh phức tạp",
            "correct": false
          },
          {
            "text": "Không dùng Git mà gửi code qua email cá nhân",
            "correct": false
          },
          {
            "text": "Mô hình thác nước cổ điển Waterfall không phân nhánh",
            "correct": false
          }
        ],
        "explanation": "GitHub Flow là lựa chọn lý tưởng nhất cho các nhóm web nhỏ cần sự linh hoạt, tránh các tầng thủ tục rườm rà không cần thiết."
      },
      {
        "id": "q2",
        "question": "Mô hình nào sau đây đòi hỏi hệ thống kiểm thử tự động (Automated Testing / CI) ở mức độ hoàn thiện cao nhất để hoạt động an toàn?",
        "type": "single",
        "options": [
          {
            "text": "Trunk-Based Development",
            "correct": true
          },
          {
            "text": "Git Flow",
            "correct": false
          },
          {
            "text": "GitHub Flow",
            "correct": false
          },
          {
            "text": "Lập trình một mình không chia sẻ",
            "correct": false
          }
        ],
        "explanation": "Trunk-Based Development hợp nhất code liên tục vào Trunk, do đó nếu không có CI cực mạnh để phát hiện lỗi ngay lập tức thì nhánh chính sẽ liên tục bị gãy."
      },
      {
        "id": "q3",
        "question": "Dự án nào sau đây phù hợp nhất với mô hình Git Flow truyền thống?",
        "type": "single",
        "options": [
          {
            "text": "Ứng dụng ngân hàng di động trên iOS/Android phát hành định kỳ mỗi tháng một lần và cần kiểm định an ninh nghiêm ngặt",
            "correct": true
          },
          {
            "text": "Một trang blog cá nhân cập nhật bài viết mỗi giờ",
            "correct": false
          },
          {
            "text": "Một landing page quảng cáo sự kiện tồn tại trong 3 ngày",
            "correct": false
          },
          {
            "text": "Một kịch bản tự động hóa sao lưu dữ liệu đơn giản",
            "correct": false
          }
        ],
        "explanation": "Git Flow rất mạnh ở khâu đóng băng phiên bản (Release Freeze) để QA kiểm thử hồi quy và hỗ trợ bảo trì nhiều phiên bản cũ."
      },
      {
        "id": "q4",
        "question": "Điểm chung quan trọng nhất giữa cả 3 mô hình GitHub Flow, Git Flow và Trunk-Based Development là gì?",
        "type": "single",
        "options": [
          {
            "text": "Đều hướng tới việc giữ cho nhánh chính (main/trunk) luôn ổn định và sử dụng quy trình kiểm duyệt trước khi hợp nhất",
            "correct": true
          },
          {
            "text": "Đều bắt buộc phải có nhánh develop",
            "correct": false
          },
          {
            "text": "Đều bắt buộc các nhánh phải tồn tại ít nhất 30 ngày",
            "correct": false
          },
          {
            "text": "Đều cấm sử dụng câu lệnh git merge",
            "correct": false
          }
        ],
        "explanation": "Dù cách thức phân nhánh khác nhau, mục tiêu tối thượng của mọi workflow chuyên nghiệp đều là bảo vệ chất lượng mã nguồn trên nhánh chính."
      }
    ]
  }
};
export default lesson;
