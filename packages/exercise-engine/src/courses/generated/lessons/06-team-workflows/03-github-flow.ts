import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "03-github-flow",
  "moduleId": "06-team-workflows",
  "metadata": {
    "id": "03-github-flow",
    "title": "GitHub Flow",
    "level": "advanced",
    "duration": 25,
    "xp": 85,
    "prerequisites": [
      "02-feature-branch-workflow"
    ],
    "objectives": [
      "Nắm vững triết lý đơn giản, tinh gọn và hướng tới chuyển giao liên tục (Continuous Delivery) của GitHub Flow.",
      "Hiểu rõ 6 bước tuần tự của GitHub Flow từ rẽ nhánh đến triển khai tự động lên môi trường Production.",
      "Xác định được các dự án phù hợp lý tưởng với GitHub Flow: ứng dụng web, microservices và SaaS.",
      "Phân biệt điểm khác biệt giữa GitHub Flow và các mô hình đa nhánh phức tạp như Git Flow."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "github flow",
      "continuous delivery",
      "simple git workflow",
      "deploy to production",
      "pull request workflow",
      "lightweight process"
    ],
    "commands": [
      "git switch -c ui/apple-pay",
      "git commit -m \"feat(checkout): add Apple Pay button\"",
      "git push -u origin ui/apple-pay",
      "gh pr create --title \"feat: add Apple Pay\" --body \"Tested on Safari\""
    ]
  },
  "content": "# GitHub Flow\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững triết lý đơn giản, tinh gọn và hướng tới chuyển giao liên tục (Continuous Delivery) của GitHub Flow.\n- Hiểu rõ 6 bước tuần tự của GitHub Flow từ rẽ nhánh đến triển khai tự động lên môi trường Production.\n- Xác định được các dự án phù hợp lý tưởng với GitHub Flow: ứng dụng web, microservices và SaaS.\n- Phân biệt điểm khác biệt giữa GitHub Flow và các mô hình đa nhánh phức tạp như Git Flow.\n\n---\n\n## 📖 Định nghĩa\n> GitHub Flow là một quy trình làm việc phân nhánh cực kỳ tinh gọn và linh hoạt, được thiết kế bởi chính đội ngũ kỹ thuật của GitHub vào năm 2011 để phục vụ cho các ứng dụng web triển khai thường xuyên. Trọng tâm của GitHub Flow dựa trên một nguyên tắc cốt lõi: bất kỳ thứ gì nằm trên nhánh `main` đều có thể triển khai trực tiếp lên môi trường Production (Deployable). Không có các nhánh trung gian như develop hay release; toàn bộ quy trình chỉ xoay quanh nhánh `main` và các nhánh nhánh mô tả ngắn hạn được hợp nhất qua Pull Request.\n\n---\n\n## 🤔 Tại sao cần?\nTrong thời đại điện toán đám mây và phần mềm dạng dịch vụ (SaaS), các công ty công nghệ có thể phát hành phiên bản mới hàng chục lần mỗi ngày. Những mô hình quản lý nhánh cổ điển với nhiều nhánh trung gian cồng kềnh trở nên quá chậm chạp và quan liêu. GitHub Flow loại bỏ hoàn toàn các rào cản phức tạp, giúp các nhóm kỹ sư đẩy nhanh tốc độ đưa tính năng ra thị trường, kiểm thử thực tế tức thì và nhận phản hồi nhanh chóng từ người dùng cuối.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung một tòa soạn báo điện tử trực tuyến cập nhật tin tức 24/7. Trang chủ của tờ báo điện tử chính là nhánh `main`. Mỗi khi có một phóng viên viết bài điều tra mới, phóng viên tạo một bản thảo riêng (`feature branch`). Khi bài viết hoàn thành, biên tập viên sẽ đọc duyệt và bình luận sửa lỗi (`Pull Request`). Ngay khi bài viết được bấm duyệt, bài báo lập tức xuất hiện trên trang chủ cho hàng triệu độc giả đọc ngay tức khắc mà không cần chờ đến đợt in ấn định kỳ hàng tháng.\n\n---\n\n## 🖼 Sơ đồ\n```text\nVòng tuần hoàn 6 bước chuẩn mực của GitHub Flow:\n1. Tạo nhánh từ main (Create branch)\n       │\n       ▼\n2. Thêm các commit rõ nghĩa (Add commits)\n       │\n       ▼\n3. Mở Pull Request thảo luận (Open PR)\n       │\n       ▼\n4. Thảo luận & Review code (Discuss & Review)\n       │\n       ▼\n5. Triển khai thử nghiệm (Deploy & Test)\n       │\n       ▼\n6. Hợp nhất vào main (Merge to main & Deploy Prod)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTại một công ty công nghệ phát triển nền tảng thương mại điện tử SaaS, toàn bộ nhóm 20 kỹ sư vận hành theo chuẩn GitHub Flow. Khi kỹ sư Nam cần nâng cấp giao diện nút thanh toán, Nam tạo nhánh `ui/apple-pay` từ `main`. Sau khi hoàn thiện mã nguồn, Nam mở Pull Request. Hệ thống CI/CD tự động dựng một môi trường xem trước (Preview Environment). Trưởng nhóm và chuyên viên sản phẩm cùng vào trải nghiệm thử trực tiếp trên môi trường này và bấm phê duyệt (Approve). Nam bấm nút Merge trên GitHub, hệ thống tự động gộp code vào `main` và kích hoạt triển khai tính năng mới lên máy chủ thực tế chỉ sau đúng 3 phút.\n\n---\n\n## 💻 Command\n```bash\ngit switch -c ui/apple-pay\ngit commit -m \"feat(checkout): add Apple Pay button\"\ngit push -u origin ui/apple-pay\ngh pr create --title \"feat: add Apple Pay\" --body \"Tested on Safari\"\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch -c <name>`: Tạo nhánh tính năng mới tinh gọn bắt đầu từ nhánh main.\n- `git commit -m <msg>`: Ghi lại từng bước tiến hóa của tính năng với thông điệp rõ nghĩa.\n- `git push -u origin <name>`: Xuất bản nhánh lên GitHub để bắt đầu quy trình thảo luận nhóm.\n- `gh pr create`: Lệnh GitHub CLI tiện lợi để mở Pull Request trực tiếp từ dòng lệnh mà không cần mở trình duyệt.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Để nhánh main ở trạng thái không thể chạy hoặc đang dở dang**:  Vi phạm nguyên tắc thiêng liêng \"main is always deployable\".\n2. **Duy trì các nhánh tính năng quá dài ngày (vài tuần đến vài tháng)**:  Gây khó khăn lớn cho việc merge và review.\n3. **Bỏ qua bước thảo luận và thử nghiệm trên môi trường staging trước khi bấm merge vào main.**: Bỏ qua bước thảo luận và thử nghiệm trên môi trường staging trước khi bấm merge vào main.\n\n---\n\n## 🧪 Lab\n1. Tạo một nhánh mới từ main mô tả một tính năng cụ thể.\n2. Mở Pull Request trên giao diện GitHub và thêm nhãn (label) mô tả trạng thái.\n3. Quan sát quy trình kiểm tra tự động trước khi bấm nút Merge vào nhánh chính.\n\n---\n\n## 💡 Hint\n> Chìa khóa thành công của GitHub Flow là các nhánh tính năng phải cực kỳ ngắn hạn và hệ thống CI/CD phải tự động hóa cao.\n\n---\n\n## ✅ Validation\n- Nhánh main có thể triển khai lên môi trường thực tế bất cứ lúc nào trong ngày mà không gặp sự cố.\n\n---\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm dưới đây về quy trình tinh gọn GitHub Flow.\n\n---\n\n## 🔥 Challenge\nGiải thích tại sao một hệ thống kiểm thử tự động (CI/CD) mạnh mẽ là điều kiện tiên quyết bắt buộc để áp dụng thành công GitHub Flow.\n\n---\n\n## 📚 Tổng kết\n- GitHub Flow là mô hình tinh gọn tập trung xung quanh nhánh main luôn luôn sẵn sàng deploy.\n- Mọi thay đổi đều được đóng gói trong nhánh ngắn hạn và trao đổi qua Pull Request.\n- Cực kỳ tối ưu cho các sản phẩm web, microservices và các nhóm triển khai liên tục nhiều lần mỗi ngày.\n",
  "quiz": {
    "id": "quiz-06-03-github-flow",
    "title": "Trắc nghiệm: GitHub Flow",
    "questions": [
      {
        "id": "q1",
        "question": "Nguyên tắc bất di bất dịch cốt lõi của mô hình GitHub Flow là gì?",
        "type": "single",
        "options": [
          {
            "text": "Mã nguồn trên nhánh main luôn luôn ở trạng thái sẵn sàng triển khai lên Production",
            "correct": true
          },
          {
            "text": "Bắt buộc phải có ít nhất 5 nhánh phụ trước khi merge vào main",
            "correct": false
          },
          {
            "text": "Chỉ được phép deploy sản phẩm vào lúc 12 giờ đêm",
            "correct": false
          },
          {
            "text": "Không được phép sử dụng lệnh git push lên máy chủ",
            "correct": false
          }
        ],
        "explanation": "Nguyên lý trung tâm của GitHub Flow là tính sẵn sàng triển khai liên tục của nhánh main ở bất kỳ thời điểm nào trong ngày."
      },
      {
        "id": "q2",
        "question": "Mô hình GitHub Flow phù hợp lý tưởng nhất với loại hình dự án phần mềm nào?",
        "type": "single",
        "options": [
          {
            "text": "Ứng dụng web, kiến trúc microservices và phần mềm dạng dịch vụ SaaS có chu kỳ phát hành nhanh",
            "correct": true
          },
          {
            "text": "Hệ điều hành nhúng trên vệ tinh không gian chỉ cập nhật 5 năm một lần",
            "correct": false
          },
          {
            "text": "Các phần mềm đóng gói trên đĩa CD-ROM bán ngoài cửa hàng",
            "correct": false
          },
          {
            "text": "Các bài tập cá nhân không có nhu cầu chia sẻ mã nguồn",
            "correct": false
          }
        ],
        "explanation": "GitHub Flow sinh ra để phục vụ việc phát hành phần mềm liên tục và tức thì trên nền tảng đám mây và web hiện đại."
      },
      {
        "id": "q3",
        "question": "Trong GitHub Flow, bước nào sau đây diễn ra TRƯỚC KHI nhánh tính năng được hợp nhất vào nhánh main?",
        "type": "single",
        "options": [
          {
            "text": "Mở Pull Request, thảo luận, kiểm duyệt code và thử nghiệm tính năng trên môi trường kiểm thử",
            "correct": true
          },
          {
            "text": "Xóa toàn bộ kho lưu trữ trên máy chủ GitHub",
            "correct": false
          },
          {
            "text": "Bắt buộc đổi mật khẩu tài khoản của toàn bộ lập trình viên",
            "correct": false
          },
          {
            "text": "Chạy lệnh git reset --hard trên nhánh main",
            "correct": false
          }
        ],
        "explanation": "Thảo luận, review và xác nhận hoạt động ổn định trên môi trường thử nghiệm là điều kiện bắt buộc trước khi merge code vào main trong GitHub Flow."
      },
      {
        "id": "q4",
        "question": "So với Git Flow cổ điển, GitHub Flow đã lược bỏ những loại nhánh nào để trở nên tinh gọn?",
        "type": "single",
        "options": [
          {
            "text": "Lược bỏ nhánh develop dài hạn và các nhánh trung gian cồng kềnh như release branches",
            "correct": true
          },
          {
            "text": "Lược bỏ hoàn toàn nhánh main",
            "correct": false
          },
          {
            "text": "Cấm tạo nhánh tính năng feature branch",
            "correct": false
          },
          {
            "text": "Loại bỏ hoàn toàn hệ thống kiểm tra Pull Request",
            "correct": false
          }
        ],
        "explanation": "GitHub Flow đơn giản hóa cấu trúc bằng cách chỉ giữ lại một nhánh dài hạn duy nhất là main, bỏ qua nhánh develop và release."
      }
    ]
  }
};
export default lesson;
