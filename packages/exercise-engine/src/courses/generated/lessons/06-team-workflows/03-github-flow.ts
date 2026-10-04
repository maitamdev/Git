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
  "content": "# GitHub Flow\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu luồng thường dùng: tạo nhánh, commit, mở PR, review, triển khai/kiểm tra khi phù hợp, rồi merge.\n- Phân biệt quy ước GitHub Flow với các thao tác tự động mà nhóm có thể tự cấu hình.\n- Nhận biết các bối cảnh nhóm có thể chọn luồng PR ngắn hạn.\n- Phân biệt điểm khác biệt giữa GitHub Flow và các mô hình đa nhánh phức tạp như Git Flow.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### GitHub Flow\n- **Nói dễ hiểu**: Cách làm xoay quanh nhánh chính và nhánh ngắn hạn; thay đổi thường được thảo luận qua PR trước khi merge.\n- **Ví dụ**: Tạo `feat/apple-pay`, mở PR, chạy các kiểm tra đã cấu hình, rồi merge khi nhóm chấp thuận.\n- **Đừng nhầm**: Khác với Git Flow, GitHub Flow không sử dụng nhánh develop hay release trung gian.\n\n### Always Deployable Main\n- **Nói dễ hiểu**: Mục tiêu vận hành là giữ nhánh chính ở trạng thái có thể phát hành theo quy trình của nhóm.\n- **Ví dụ**: Nhóm có thể yêu cầu CI và review trước khi merge vào `main`.\n- **Đừng nhầm**: GitHub Flow không tự bật branch protection, CI, PR bắt buộc hay deploy; các bước đó cần cấu hình riêng.\n\n### Continuous Delivery (Chuyển giao liên tục)\n- **Nói dễ hiểu**: Thực hành giữ phần mềm ở trạng thái có thể phát hành; nó không đồng nghĩa với việc tự động đưa mọi thay đổi lên production.\n- **Ví dụ**: Sau khi merge vào `main`, pipeline có thể build và test; nhóm có thể phê duyệt hoặc lên lịch triển khai riêng.\n- **Đừng nhầm**: Continuous Deployment tự động triển khai thay đổi đủ điều kiện; Continuous Delivery chuẩn bị thay đổi để có thể phát hành.\n\n---\n\n## 📖 Định nghĩa\nGitHub Flow là workflow nhẹ dùng nhánh ngắn hạn và PR để thảo luận, review rồi tích hợp thay đổi. Nhóm thường cố giữ nhánh chính có thể phát hành, nhưng CI, bảo vệ nhánh và deployment cần được cấu hình phù hợp với dự án.\n\n---\n\n## 🤔 Tại sao cần?\nLuồng PR ngắn giúp nhóm thảo luận thay đổi tại một nơi và giảm nhu cầu duy trì nhiều nhánh dài hạn. Tốc độ phát hành vẫn phụ thuộc kiểm thử, phê duyệt, vận hành và chính sách của sản phẩm.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung tòa soạn: phóng viên viết bản thảo, biên tập viên trao đổi trên PR, rồi nhóm chọn thời điểm đăng. Việc duyệt PR không tự đăng bài; tương tự, merge không tự deploy nếu repository chưa cấu hình quy trình phát hành.\n\n---\n\n## 🖼 Sơ đồ\n```text\nMột vòng làm việc thường gặp (review, test và deploy tùy cấu hình):\n1. Tạo nhánh từ main (Create branch)\n       │\n       ▼\n2. Thêm các commit rõ nghĩa (Add commits)\n       │\n       ▼\n3. Mở Pull Request thảo luận (Open PR)\n       │\n       ▼\n4. Thảo luận & Review code (Discuss & Review)\n       │\n       ▼\n5. Chạy kiểm tra/preview nếu dự án có\n       │\n       ▼\n6. Merge khi đủ điều kiện; phát hành theo chính sách của nhóm\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nVí dụ: kỹ sư Nam tạo nhánh `ui/apple-pay` từ `main`, mở PR để nhóm review và chạy CI. Nếu dự án có môi trường preview hoặc deploy sau merge, Nam kiểm tra kết quả theo quy trình đó trước khi phát hành.\n\n---\n\n## 💻 Command\n```bash\ngit switch main\ngit status\ngit switch -c ui/apple-pay\n# Sau khi sửa file: git add <tệp>\ngit commit -m \"feat(checkout): add Apple Pay button\"\ngit push -u origin ui/apple-pay\ngh pr create --title \"feat: add Apple Pay\" --body \"Tested on Safari\"\n```\n\n`git push` cần remote/quyền ghi; `gh pr create` cần cài GitHub CLI, đăng nhập và quyền tạo PR. Simulator không kết nối GitHub hay mở PR thật.\n\n---\n\n## 🔍 Giải thích command\n- `git switch -c <name>`: Tạo nhánh từ nhánh đang checkout; trước đó hãy chuyển sang nhánh đích.\n- `git commit -m <msg>`: Ghi lại từng bước tiến hóa của tính năng với thông điệp rõ nghĩa.\n- `git push -u origin <name>`: Xuất bản nhánh lên GitHub để bắt đầu quy trình thảo luận nhóm.\n- `gh pr create`: Tạo PR trên GitHub khi CLI đã cài và xác thực; có thể mở PR trên web thay thế.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Cho rằng `main` tự luôn có thể phát hành**: GitHub Flow đặt đó làm mục tiêu; nhóm cần test và cách phục hồi phù hợp.\n2. **Để nhánh làm việc lệch lâu khỏi nhánh đích**: Chênh lệch lớn có thể làm việc tích hợp khó hơn.\n3. **Giả định luôn có staging/deploy tự động**: Xem lại các bước và điều kiện thực tế của repository.\n\n---\n\n## 🧪 Lab\nHãy cùng tôi mở terminal và thực hiện các bước thực hành trực quan sau:\n1. Trong repo thử nghiệm, chuyển sang nhánh chính và tạo một nhánh mô tả thay đổi.\n2. Tạo commit, xem lại bằng `git status` và `git log --oneline`.\n3. Nếu có repo GitHub với quyền push, đẩy nhánh và mở PR; nếu không, mô tả các bước PR/review bằng giấy.\n4. Trên PR thử nghiệm, xem các CI checks đã cấu hình. Không giả định repo nào cũng tự deploy.\n\n---\n\n## 💡 Hint\n> Giữ thay đổi đủ nhỏ để review và tích hợp được; chọn CI, môi trường preview và deploy theo khả năng vận hành của nhóm.\n\n---\n\n## ✅ Validation\n- Mô tả được nhánh, commit và PR trong luồng GitHub Flow.\n- Phân biệt được bước Git hỗ trợ với CI, review và deployment do nhóm cấu hình.\n\n---\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm dưới đây về quy trình tinh gọn GitHub Flow.\n\n---\n\n## 🔥 Challenge\nThiết lập một GitHub Actions workflow đơn giản để tự động triển khai bản thử nghiệm mỗi khi có Pull Request được mở.\n\n---\n\n## 📚 Tổng kết\n- Mô hình cơ bản xoay quanh `main` và nhánh làm việc ngắn hạn; dự án có thể thêm nhánh nếu cần.\n- Nhóm dùng nhánh ngắn hạn và PR để review rồi tích hợp thay đổi.\n- Bảo vệ nhánh, CI và triển khai tự động là cấu hình riêng, không tự xuất hiện khi chọn workflow này.\n",
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
            "text": "Mô hình hướng tới giữ `main` ở trạng thái có thể phát hành; CI, chính sách PR và deploy cần được nhóm cấu hình",
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
        "explanation": "GitHub Flow xem `main` là nhánh tích hợp chính và hướng tới trạng thái có thể phát hành, nhưng quy trình không tự bật kiểm thử hay triển khai."
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
        "explanation": "Chu kỳ phát hành nhanh phù hợp với nhánh chính và PR đơn giản, nhưng mức độ phù hợp còn tùy release, kiểm thử và vận hành của nhóm."
      },
      {
        "id": "q3",
        "question": "Trong GitHub Flow, bước nào sau đây diễn ra TRƯỚC KHI nhánh tính năng được hợp nhất vào nhánh main?",
        "type": "single",
        "options": [
          {
            "text": "Mở Pull Request; nhóm có thể review và chạy kiểm tra theo chính sách repo trước khi merge",
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
        "explanation": "PR là một phần trung tâm của cách làm GitHub Flow; review, CI và môi trường thử nghiệm là các bước nhóm cần cấu hình theo nhu cầu."
      },
      {
        "id": "q4",
        "question": "So với Git Flow cổ điển, GitHub Flow đã lược bỏ những loại nhánh nào để trở nên tinh gọn?",
        "type": "single",
        "options": [
          {
            "text": "Thường đơn giản hóa bằng một nhánh chính và các nhánh công việc ngắn hạn; nhóm vẫn có thể thêm nhánh khác khi cần",
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
        "explanation": "Mô hình cơ bản xoay quanh `main` và nhánh công việc; việc có nhánh develop/release hay không là lựa chọn theo quy trình thực tế."
      },
      {
        "id": "q5",
        "question": "Khi nào việc triển khai (deploy) sản phẩm thường diễn ra trong quy trình chuẩn của GitHub Flow?",
        "type": "single",
        "options": [
          {
            "text": "Tùy cấu hình: nhóm có thể triển khai sau merge, phát hành thủ công hoặc chờ một bước kiểm soát khác",
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
        "explanation": "GitHub Flow không tự triển khai khi merge; Continuous Delivery/Deployment cần pipeline và chính sách release riêng."
      }
    ]
  }
};
export default lesson;
