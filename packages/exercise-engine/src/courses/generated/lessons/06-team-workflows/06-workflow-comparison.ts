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
  "content": "# So sánh GitHub Flow / Git Flow / Trunk-Based\n\n---\n\n## 🎯 Mục tiêu\n- Lập bảng ma trận so sánh chi tiết ưu nhược điểm, độ phức tạp và trường hợp sử dụng của 3 mô hình workflow hàng đầu.\n- Hiểu rõ sự đánh đổi (Trade-offs) giữa tính linh hoạt tốc độ cao và mức độ kiểm soát an toàn nghiêm ngặt.\n- Phân tích các tiêu chí lựa chọn workflow: rủi ro, nhịp phát hành, CI/CD và công sức phối hợp; không chọn chỉ dựa vào loại sản phẩm.\n- Tự tin tư vấn và thiết lập quy trình phân nhánh tối ưu cho một dự án thực tế.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Workflow Trade-offs (Đánh đổi quy trình)\n- **Nói dễ hiểu**: Việc cân nhắc giữa tốc độ phát hành nhanh chóng và mức độ an toàn kiểm soát chặt chẽ khi chọn quy trình.\n- **Ví dụ**: Một nhóm có thể chọn GitHub Flow để dùng PR ngắn; họ vẫn có thể bật cùng mức review và CI mà dùng với mô hình khác.\n- **Đừng nhầm**: Không có mô hình nào là hoàn hảo tuyệt đối cho mọi dự án; mô hình tốt nhất là mô hình giải quyết đúng nút thắt của nhóm.\n\n### CI/CD Maturity (Độ chín của CI/CD)\n- **Nói dễ hiểu**: Mức độ tự động hóa và độ tin cậy của hệ thống kiểm thử tự động, build và triển khai mã nguồn trong dự án.\n- **Ví dụ**: CI chạy kiểm thử quan trọng nhanh và báo kết quả rõ giúp nhóm phát hiện vấn đề sớm khi tích hợp thường xuyên.\n- **Đừng nhầm**: Không có một số lượng test hay thời gian chạy cụ thể chứng minh dự án đã sẵn sàng; độ tin cậy và cách xử lý lỗi cũng quan trọng.\n\n### Release Cadence (Chu kỳ phát hành)\n- **Nói dễ hiểu**: Nhịp độ và tần suất đưa phiên bản phần mềm mới đến tay người dùng (nhiều lần mỗi ngày, hàng tuần, hay định kỳ mỗi tháng).\n- **Ví dụ**: Một app mobile có thể phát hành theo lịch cửa hàng ứng dụng, còn backend có thể triển khai thường xuyên hơn; nhóm vẫn chọn cách phân nhánh theo nhu cầu của mình.\n- **Đừng nhầm**: Loại sản phẩm không tự quyết định workflow. Hãy xét cách kiểm thử, phê duyệt, triển khai và khả năng rollback.\n\n---\n\n## 📖 Định nghĩa\nBa workflow khác nhau chủ yếu ở cách tổ chức nhánh và nhịp tích hợp. Git Flow có nhánh dài hạn `develop` cùng nhánh release/hotfix; GitHub Flow thường dùng nhánh ngắn hạn và PR; Trunk-Based Development tích hợp thay đổi nhỏ thường xuyên vào nhánh chính. Không workflow nào tự quyết định mức an toàn, tốc độ release hay loại sản phẩm.\n\n---\n\n## 🤔 Tại sao cần?\nChọn workflow quá nặng có thể thêm bước nhóm không cần; chọn workflow nhẹ nhưng thiếu review, kiểm thử hoặc kế hoạch phục hồi có thể bỏ sót rủi ro. So sánh chi phí thực tế thay vì gán một mô hình cho một loại công ty.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung ba cách tổ chức lịch làm việc: Git Flow tách giai đoạn phát triển và ổn định phiên bản; GitHub Flow đưa thay đổi qua PR; Trunk-Based Development ghép thay đổi nhỏ thường xuyên. Review, CI và release controls có thể được thêm vào từng mô hình.\n\n---\n\n## 🖼 Sơ đồ\n```text\nBảng ma trận so sánh 3 mô hình Workflow hàng đầu:\n┌─────────────────┬──────────────────────┬──────────────────────┬──────────────────────┐\n│ Tiêu chí        │ Git Flow             │ GitHub Flow          │ Trunk-Based Dev      │\n├─────────────────┼──────────────────────┼──────────────────────┼──────────────────────┤\n│ Nhánh dài hạn   │ main + develop       │ thường là main       │ thường là main/trunk │\n│ Nhánh tạm       │ feature/release/hotfix│ feature ngắn hạn    │ trực tiếp hoặc ngắn  │\n│ Tích hợp        │ theo giai đoạn       │ qua PR                │ thường xuyên         │\n│ Release         │ nhóm lên lịch riêng  │ nhóm lên lịch riêng  │ nhóm lên lịch riêng  │\n│ CI / review     │ cấu hình theo nhóm   │ cấu hình theo nhóm   │ nhanh là hữu ích     │\n│ Phù hợp khi     │ cần nhánh release    │ cần PR làm trung tâm │ cần tích hợp nhỏ     │\n└─────────────────┴──────────────────────┴──────────────────────┴──────────────────────┘\n\nĐây là xu hướng phổ biến, không phải yêu cầu bắt buộc; một dự án có thể kết hợp hoặc điều chỉnh các ý tưởng.\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nVí dụ: cùng một công ty có thể giữ nhánh release cho app cần kiểm tra trước lịch phát hành và dùng PR nhỏ, tích hợp thường xuyên cho một dịch vụ backend. Đây là quyết định theo nhu cầu vận hành, không do loại sản phẩm bắt buộc.\n\n---\n\n## 💻 Command\n```bash\ngit log --oneline --graph --all\ngit branch --list\n```\n\n---\n\n## 🔍 Giải thích command\n- `git log --graph --all`: Xem các commit và nhánh còn thể hiện trong lịch sử; chỉ riêng đồ thị không chứng minh được workflow của nhóm.\n- `git branch --list`: Liệt kê nhánh local hiện có. Để hiểu quy trình, hỏi thêm về PR, bảo vệ nhánh, CI và release.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Áp dụng máy móc**: Bắt nhóm nhỏ dùng nhiều nhánh dài hạn có thể tăng công sức mà không giải quyết vấn đề thực tế.\n2. **Tích hợp thường xuyên mà thiếu phản hồi**: Không có test/CI đáng tin cậy có thể làm nhóm phát hiện lỗi muộn; chọn cách kiểm tra phù hợp trước khi tăng nhịp tích hợp.\n3. **Thay đổi quy trình liên tục**: Đổi workflow quá thường xuyên làm đảo lộn thói quen và gây bối rối cho toàn bộ kỹ sư trong nhóm.\n\n---\n\n## 🧪 Lab\nHãy cùng tôi mở terminal và thực hiện các bước thực hành trực quan sau:\n1. Dùng `git log --oneline --graph --all` trong repo thử nghiệm để quan sát các nhánh còn thấy được.\n2. So sánh ba workflow theo nhánh dài hạn, cách review, nhịp tích hợp, kiểm thử và lịch phát hành.\n3. Chọn một workflow cho tình huống giả định, nêu một lợi ích, một chi phí và điều kiện khiến bạn đổi lựa chọn.\n\n---\n\n## 💡 Hint\n> Hãy chọn theo cách nhóm tích hợp, kiểm thử và phát hành; đừng suy ra workflow chỉ từ tên sản phẩm.\n\n---\n\n## ✅ Validation\n- Phân tích rạch ròi ưu nhược điểm của cả 3 mô hình Git Flow, GitHub Flow và Trunk-Based Development.\n- Giải thích lựa chọn dựa trên ràng buộc thực tế và nêu được ít nhất một đánh đổi.\n\n---\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm dưới đây để đối chiếu và so sánh các mô hình workflow.\n\n---\n\n## 🔥 Challenge\nĐề xuất phương án chuyển dịch từng bước từ mô hình Git Flow sang Trunk-Based Development cho một dự án đang phát triển.\n\n---\n\n## 📚 Tổng kết\n- Workflow mô tả cách tổ chức nhánh và tích hợp; không tự ấn định tốc độ release.\n- CI, review, bảo vệ nhánh và lịch triển khai có thể cấu hình riêng cho từng workflow.\n- Chọn mô hình dựa trên yêu cầu phát hành, khả năng kiểm thử và chi phí phối hợp của nhóm.\n",
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
            "text": "GitHub Flow là một ứng viên gọn nhẹ để thử nghiệm; nhóm vẫn cần chọn review, kiểm thử và cách phát hành",
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
        "explanation": "GitHub Flow có thể phù hợp với nhịp phát hành này, nhưng nhóm nên điều chỉnh theo rủi ro, quy trình kiểm thử và yêu cầu vận hành."
      },
      {
        "id": "q2",
        "question": "Trong mô hình nào việc tích hợp thường xuyên khiến phản hồi CI nhanh và đáng tin cậy đặc biệt hữu ích?",
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
        "explanation": "Trunk-Based Development dựa vào tích hợp thường xuyên; CI nhanh giúp tìm lỗi gần thời điểm thay đổi, dù cách kiểm tra có thể khác nhau giữa các nhóm."
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
        "explanation": "Nhánh release của Git Flow có thể hỗ trợ kiểm thử một phiên bản trong khi công việc khác tiếp tục; nó không phải lựa chọn duy nhất cho lịch phát hành này."
      },
      {
        "id": "q4",
        "question": "Điểm chung quan trọng nhất giữa cả 3 mô hình GitHub Flow, Git Flow và Trunk-Based Development là gì?",
        "type": "single",
        "options": [
          {
            "text": "Đều tìm cách tích hợp thay đổi có kiểm soát vào nhánh chính; cách review, CI và nhánh sử dụng tùy mô hình/nhóm",
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
        "explanation": "Các workflow tìm cách kiểm soát tích hợp, nhưng không phải mô hình nào cũng bắt buộc cùng một loại review hoặc cách bảo vệ main."
      },
      {
        "id": "q5",
        "question": "Dấu hiệu nào gợi ý nhóm nên xem xét một mô hình đơn giản hơn Git Flow?",
        "type": "single",
        "options": [
          {
            "text": "Khi nhóm thấy các bước/nhánh trung gian không còn giúp kiểm soát rủi ro tương xứng với công sức đồng bộ",
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
        "explanation": "Nhóm nên đánh giá chi phí và rủi ro thực tế; Continuous Delivery không bắt buộc dùng duy nhất một mô hình phân nhánh."
      }
    ]
  }
};
export default lesson;
