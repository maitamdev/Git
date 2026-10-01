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
  "content": "# So sánh GitHub Flow / Git Flow / Trunk-Based\n\n---\n\n## 🎯 Mục tiêu\n- Lập bảng ma trận so sánh chi tiết ưu nhược điểm, độ phức tạp và trường hợp sử dụng của 3 mô hình workflow hàng đầu.\n- Hiểu rõ sự đánh đổi (Trade-offs) giữa tính linh hoạt tốc độ cao và mức độ kiểm soát an toàn nghiêm ngặt.\n- Phân tích được các tiêu chí cốt lõi để lựa chọn workflow phù hợp: loại sản phẩm, quy mô đội ngũ, chu kỳ phát hành, độ chín CI/CD.\n- Tự tin tư vấn và thiết lập quy trình phân nhánh tối ưu cho một dự án thực tế.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Workflow Trade-offs (Đánh đổi quy trình)\n- **Nói dễ hiểu**: Việc cân nhắc giữa tốc độ phát hành nhanh chóng và mức độ an toàn kiểm soát chặt chẽ khi chọn quy trình.\n- **Ví dụ**: Startup chọn GitHub Flow để release nhanh mỗi ngày, chấp nhận bớt các tầng kiểm duyệt trung gian như Git Flow.\n- **Đừng nhầm**: Không có mô hình nào là hoàn hảo tuyệt đối cho mọi dự án; mô hình tốt nhất là mô hình giải quyết đúng nút thắt của nhóm.\n\n### CI/CD Maturity (Độ chín của CI/CD)\n- **Nói dễ hiểu**: Mức độ tự động hóa và độ tin cậy của hệ thống kiểm thử tự động, build và triển khai mã nguồn trong dự án.\n- **Ví dụ**: Dự án có 1.000 test case tự động chạy dưới 5 phút đạt độ chín CI/CD cao, đủ điều kiện áp dụng Trunk-Based Development.\n- **Đừng nhầm**: Nếu chưa có bài test tự động nào mà áp dụng Trunk-Based sẽ khiến nhánh chính liên tục bị hỏng.\n\n### Release Cadence (Chu kỳ phát hành)\n- **Nói dễ hiểu**: Nhịp độ và tần suất đưa phiên bản phần mềm mới đến tay người dùng (nhiều lần mỗi ngày, hàng tuần, hay định kỳ mỗi tháng).\n- **Ví dụ**: Web app SaaS có chu kỳ phát hành liên tục theo ngày, trong khi app mobile thường phát hành theo kỳ sprint 2-4 tuần.\n- **Đừng nhầm**: Chu kỳ phát hành do đặc thù phân phối sản phẩm quyết định, từ đó định hình chiến lược phân nhánh Git phù hợp.\n\n---\n\n## 📖 Định nghĩa\nLựa chọn chiến lược phân nhánh là bài toán cân nhắc sự đánh đổi (Trade-off): Git Flow ưu tiên kiểm soát an toàn cho các chu kỳ phát hành định kỳ; GitHub Flow ưu tiên tinh gọn cho ứng dụng web; còn Trunk-Based Development tối đa hóa tốc độ tích hợp cho đội ngũ có hạ tầng CI/CD tự động hóa cao.\n\n---\n\n## 💡 Tại sao cần\nÁp dụng sai workflow gây lãng phí năng suất nghiêm trọng: ép startup 3 người dùng Git Flow cồng kềnh sẽ làm chậm tiến độ vì thủ tục rườm rà; ngược lại, ép phần mềm thiết bị y tế dùng Trunk-Based khi chưa có test tự động sẽ tiềm ẩn rủi ro lỗi nguy hiểm.\n\n---\n\n## 🧠 Mental Model\nHãy so sánh 3 mô hình với phương tiện giao thông. Git Flow như đoàn tàu hỏa chở hàng: chạy theo lịch trình cố định, nhiều toa kiểm định, cực kỳ an toàn nhưng khó đổi hướng. GitHub Flow như chiếc ô tô cá nhân: linh hoạt, gọn gàng, xuất phát bất cứ lúc nào. Còn Trunk-Based Development như xe đua F1: cực nhanh, đòi hỏi tay lái điêu luyện và đội kỹ thuật CI hỗ trợ tức thì.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nBảng ma trận so sánh 3 mô hình Workflow hàng đầu:\n┌─────────────────┬──────────────┬──────────────┬────────────────────────┐\n│ Tiêu chí        │ Git Flow     │ GitHub Flow  │ Trunk-Based Dev        │\n├─────────────────┼──────────────┼──────────────┼────────────────────────┤\n│ Độ phức tạp     │ Cao (5 nhánh)│ Thấp (1 chính)│ Rất thấp (1 Trunk)     │\n│ Chu kỳ Release  │ Tuần / Tháng │ Vài lần/ngày │ Liên tục từng giờ      │\n│ Tuổi thọ nhánh  │ Dài hạn      │ Vài ngày     │ Rất ngắn (< 1-2 ngày)  │\n│ Hạ tầng CI/CD   │ Cơ bản       │ Khá          │ Rất cao (Bắt buộc)     │\n│ Dự án phù hợp   │ Mobile/Enter │ Web/SaaS     │ Microservices/BigTech  │\n└─────────────────┴──────────────┴──────────────┴────────────────────────┘\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nCông ty công nghệ áp dụng đồng thời hai mô hình: ứng dụng mobile chịu kiểm duyệt khắt khe từ App Store dùng Git Flow để đóng băng phiên bản cho QA kiểm thử an ninh. Trong khi đó, dịch vụ backend microservices có hơn 1.000 test tự động áp dụng Trunk-Based để 50 kỹ sư deploy liên tục mỗi ngày.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit log --oneline --graph --all\ngit branch --list\n```\n\n---\n\n## 🔍 Giải thích command\n- `git log --graph --all`: Trực quan hóa toàn bộ biểu đồ lịch sử các nhánh để xác định chính xác nhóm bạn đang vận hành theo mô hình phân nhánh nào.\n- `git branch --list`: Liệt kê toàn bộ các nhánh đang tồn tại trong dự án để đánh giá độ phức tạp, số lượng và tuổi thọ thực tế của các nhánh.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Áp dụng máy móc**: Bắt startup nhỏ dùng Git Flow 5 nhánh cồng kềnh gây lãng phí thời gian và làm chậm tốc độ ra mắt sản phẩm.\n2. **Áp dụng Trunk-Based khi thiếu CI**: Hợp nhất liên tục vào main khi chưa có hệ thống test tự động sẽ khiến nhánh chính thường xuyên bị gãy.\n3. **Thay đổi quy trình liên tục**: Đổi workflow quá thường xuyên làm đảo lộn thói quen và gây bối rối cho toàn bộ kỹ sư trong nhóm.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.\n1. Dùng lệnh `git log --oneline --graph --all` để khảo sát cây lịch sử phân nhánh của một dự án mã nguồn mở.\n2. Phân tích dự án dựa trên 4 tiêu chí: loại sản phẩm, tốc độ release, độ chín của CI và quy mô nhóm.\n3. Lựa chọn mô hình workflow tối ưu nhất và viết bản giải trình ngắn gọn lý do lựa chọn.\n\n---\n\n## 💡 Hint & mẹo\n> Không có quy trình nào là hoàn hảo tuyệt đối; quy trình tốt nhất là quy trình giải quyết đúng nút thắt và phù hợp với năng lực hạ tầng của đội ngũ.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Phân tích rạch ròi ưu nhược điểm của cả 3 mô hình Git Flow, GitHub Flow và Trunk-Based Development.\n- Đưa ra quyết định lựa chọn workflow chính xác dựa trên các ràng buộc kỹ thuật thực tế.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài trắc nghiệm dưới đây để đối chiếu và so sánh các mô hình workflow.\n\n---\n\n## 🚀 Thử thách nâng cao\nĐề xuất phương án chuyển dịch từng bước từ mô hình Git Flow sang Trunk-Based Development cho một dự án đang phát triển.\n\n---\n\n## 📝 Tổng kết\n- Git Flow phù hợp với các sản phẩm có lịch phát hành cố định và yêu cầu kiểm soát nhiều tầng.\n- GitHub Flow tối ưu cho các sản phẩm web triển khai liên tục và quy mô nhóm vừa phải.\n- Trunk-Based Development mang lại tốc độ cao nhất nhưng đòi hỏi hệ thống kiểm thử tự động cực kỳ hoàn hảo.\n",
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
      },
      {
        "id": "q5",
        "question": "Khi nào một đội ngũ phát triển nên chuyển từ Git Flow sang GitHub Flow hoặc Trunk-Based Development?",
        "type": "single",
        "options": [
          {
            "text": "Khi đội ngũ chuyển dịch sang mô hình phân phối liên tục (Continuous Delivery) và thấy các nhánh trung gian gây chậm trễ phát hành",
            "correct": true
          },
          {
            "text": "Khi đội ngũ không muốn viết commit message nữa",
            "correct": false
          },
          {
            "text": "Khi toàn bộ máy tính của công ty bị mất kết nối Internet",
            "correct": false
          },
          {
            "text": "Khi số lượng lập trình viên giảm xuống bằng 0",
            "correct": false
          }
        ],
        "explanation": "Việc chuyển dịch sang Continuous Delivery đòi hỏi quy trình phân nhánh tinh gọn để mã nguồn đến tay khách hàng nhanh nhất mà không bị cản trở bởi các tầng trung gian."
      }
    ]
  }
};
export default lesson;
