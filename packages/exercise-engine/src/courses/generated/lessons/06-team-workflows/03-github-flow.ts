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
  "content": "# GitHub Flow\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững triết lý đơn giản, tinh gọn và hướng tới chuyển giao liên tục (Continuous Delivery) của GitHub Flow.\n- Hiểu rõ 6 bước tuần tự của GitHub Flow từ rẽ nhánh đến triển khai tự động lên môi trường Production.\n- Xác định được các dự án phù hợp lý tưởng với GitHub Flow: ứng dụng web, microservices và SaaS.\n- Phân biệt điểm khác biệt giữa GitHub Flow và các mô hình đa nhánh phức tạp như Git Flow.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### GitHub Flow\n- **Nói dễ hiểu**: Quy trình phân nhánh tinh gọn xoay quanh nhánh main luôn sẵn sàng deploy và các nhánh feature ngắn hạn mở PR.\n- **Ví dụ**: Tạo nhánh `feat/apple-pay` từ main, mở PR test xong merge vào main và deploy tự động ngay trong ngày.\n- **Đừng nhầm**: Khác với Git Flow, GitHub Flow không sử dụng nhánh develop hay release trung gian.\n\n### Always Deployable Main\n- **Nói dễ hiểu**: Nguyên tắc nhánh main luôn ở trạng thái hoàn hảo, không có lỗi và có thể triển khai lên production bất cứ thời điểm nào.\n- **Ví dụ**: Mọi code trước khi vào main đều phải vượt qua CI/CD và review; không bao giờ commit code dở dang lên main.\n- **Đừng nhầm**: Không có nghĩa là code nào viết xong cũng push thẳng vào main; phải qua Pull Request kiểm duyệt trước.\n\n### Continuous Delivery (Chuyển giao liên tục)\n- **Nói dễ hiểu**: Phương thức phát triển phần mềm trong đó mã nguồn mới được tự động đóng gói, kiểm thử và sẵn sàng phát hành liên tục.\n- **Ví dụ**: Khi PR được merge vào main, pipeline tự động chạy kiểm thử và cập nhật lên máy chủ chỉ trong vài phút.\n- **Đừng nhầm**: Khác với mô hình phát hành theo kỳ quý hàng tháng; Continuous Delivery phát hành nhiều lần mỗi ngày.\n\n---\n\n## 📖 Định nghĩa\nGitHub Flow là quy trình phân nhánh tinh gọn và linh hoạt được thiết kế cho các dự án web và đám mây hiện đại. Trọng tâm của quy trình là nhánh main luôn ở trạng thái sẵn sàng triển khai lên Production, kết hợp với các nhánh tính năng ngắn hạn được tích hợp liên tục qua Pull Request.\n\n---\n\n## 💡 Tại sao cần\nTrong kỷ nguyên đám mây và SaaS, các công ty công nghệ cần phát hành bản cập nhật nhiều lần mỗi ngày. Các mô hình đa nhánh cổ điển quá chậm chạp; GitHub Flow loại bỏ rào cản trung gian giúp nhóm đưa tính năng ra thị trường với tốc độ cao nhất.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung tòa soạn báo điện tử cập nhật tin 24/7. Trang chủ chính là nhánh main. Phóng viên viết bản thảo trên nhánh phụ. Biên tập viên đọc duyệt trên Pull Request. Vừa bấm duyệt là bài báo lập tức xuất hiện trên trang chủ cho độc giả đọc ngay mà không cần đợi in ấn định kỳ.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nVòng tuần hoàn 6 bước chuẩn mực của GitHub Flow:\n1. Tạo nhánh từ main (Create branch)\n       │\n       ▼\n2. Thêm các commit rõ nghĩa (Add commits)\n       │\n       ▼\n3. Mở Pull Request thảo luận (Open PR)\n       │\n       ▼\n4. Thảo luận & Review code (Discuss & Review)\n       │\n       ▼\n5. Triển khai thử nghiệm (Deploy & Test)\n       │\n       ▼\n6. Hợp nhất vào main (Merge to main & Deploy Prod)\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nTại một công ty SaaS, kỹ sư Nam nâng cấp giao diện thanh toán bằng nhánh `ui/apple-pay` từ `main`. Khi mở PR, hệ thống tự động dựng môi trường xem trước. Sau khi review thử nghiệm thành công, Nam bấm Merge và hệ thống tự động triển khai phiên bản mới lên máy chủ thực tế chỉ sau 3 phút.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit switch -c ui/apple-pay\ngit commit -m \"feat(checkout): add Apple Pay button\"\ngit push -u origin ui/apple-pay\ngh pr create --title \"feat: add Apple Pay\" --body \"Tested on Safari\"\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch -c <name>`: Tạo nhánh tính năng mới tinh gọn bắt đầu từ nhánh main.\n- `git commit -m <msg>`: Ghi lại từng bước tiến hóa của tính năng với thông điệp rõ nghĩa.\n- `git push -u origin <name>`: Xuất bản nhánh lên GitHub để bắt đầu quy trình thảo luận nhóm.\n- `gh pr create`: Lệnh GitHub CLI tiện lợi để mở Pull Request trực tiếp từ dòng lệnh mà không cần mở trình duyệt.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Để nhánh main ở trạng thái lỗi**: Vi phạm nguyên tắc thiêng liêng \"main is always deployable\", gây gián đoạn hệ thống.\n2. **Duy trì nhánh tính năng quá dài ngày**: Nhánh tồn tại vài tuần đến vài tháng sẽ tích lũy sai biệt lớn và gây xung đột nghiêm trọng.\n3. **Bỏ qua bước thử nghiệm trước khi merge**: Không xác nhận hoạt động trên môi trường staging trước khi bấm merge vào main.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.\n1. Tạo một nhánh mới từ main mô tả một tính năng cụ thể.\n2. Thực hiện commit thay đổi và đẩy nhánh lên remote.\n3. Mở Pull Request trên giao diện GitHub và thêm nhãn mô tả trạng thái.\n4. Quan sát quy trình kiểm tra tự động trước khi xác nhận hợp nhất vào nhánh chính.\n\n---\n\n## 💡 Hint & mẹo\n> Chìa khóa thành công của GitHub Flow là các nhánh tính năng phải cực kỳ ngắn hạn và hệ thống CI/CD phải được tự động hóa tối đa.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Nhánh main có thể triển khai lên môi trường thực tế bất cứ lúc nào trong ngày mà không gặp sự cố.\n- Nắm vững 6 bước chuẩn mực trong chu trình vận hành của GitHub Flow.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài trắc nghiệm dưới đây về quy trình tinh gọn GitHub Flow.\n\n---\n\n## 🚀 Thử thách nâng cao\nThiết lập một GitHub Actions workflow đơn giản để tự động triển khai bản thử nghiệm mỗi khi có Pull Request được mở.\n\n---\n\n## 📝 Tổng kết\n- GitHub Flow chỉ duy trì một nhánh dài hạn duy nhất là `main`.\n- Nhánh main luôn luôn sẵn sàng triển khai (Always Deployable).\n- Mọi thay đổi đều được tích hợp qua Pull Request ngắn hạn và triển khai tự động.\n",
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
      },
      {
        "id": "q5",
        "question": "Khi nào việc triển khai (deploy) sản phẩm thường diễn ra trong quy trình chuẩn của GitHub Flow?",
        "type": "single",
        "options": [
          {
            "text": "Triển khai ngay lập tức sau khi nhánh tính năng được merge vào main nhờ tích hợp Continuous Deployment",
            "correct": true
          },
          {
            "text": "Chờ đợi đến cuối quý sau 3 tháng tích lũy mã nguồn",
            "correct": false
          },
          {
            "text": "Chỉ triển khai khi toàn thể ban giám đốc họp phê duyệt",
            "correct": false
          },
          {
            "text": "Không bao giờ triển khai mã nguồn từ nhánh main",
            "correct": false
          }
        ],
        "explanation": "Trong GitHub Flow, mỗi lần merge vào main là một lần mã nguồn mới sẵn sàng được tự động triển khai tức thì lên môi trường thực tế."
      }
    ]
  }
};
export default lesson;
