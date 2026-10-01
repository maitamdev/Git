import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "08-branch-protection-rules",
  "moduleId": "06-team-workflows",
  "metadata": {
    "id": "08-branch-protection-rules",
    "title": "Branch Protection Rules",
    "level": "advanced",
    "duration": 30,
    "xp": 95,
    "prerequisites": [
      "07-protected-branch"
    ],
    "objectives": [
      "Làm chủ toàn diện các tùy chọn chi tiết trong bộ quy tắc Branch Protection Rules trên GitHub.",
      "Thiết lập yêu cầu bắt buộc kiểm duyệt mã nguồn: số lượng người phê duyệt tối thiểu (Require approvals) và tự động vô hiệu hóa duyệt khi có commit mới.",
      "Cấu hình cổng kiểm tra trạng thái bắt buộc (Require status checks to pass) tích hợp chặt chẽ với CI/CD.",
      "Áp dụng quy tắc lịch sử tuyến tính (Require linear history) và chữ ký bảo mật (Require signed commits)."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "branch protection rules",
      "quy tac bao ve nhanh",
      "require pull request reviews",
      "status checks",
      "require linear history",
      "ci gate"
    ],
    "commands": [
      "gh pr checks",
      "gh pr status",
      "git log --oneline --show-signature"
    ]
  },
  "content": "# Branch Protection Rules\n\n## 🎯 Mục tiêu\n- Làm chủ toàn diện các tùy chọn chi tiết trong bộ quy tắc Branch Protection Rules trên GitHub.\n- Thiết lập yêu cầu bắt buộc kiểm duyệt mã nguồn: số lượng người phê duyệt tối thiểu (Require approvals) và tự động vô hiệu hóa duyệt khi có commit mới.\n- Cấu hình cổng kiểm tra trạng thái bắt buộc (Require status checks to pass) tích hợp chặt chẽ với CI/CD.\n- Áp dụng quy tắc lịch sử tuyến tính (Require linear history) và chữ ký bảo mật (Require signed commits).\n\n## 🧩 Từ khóa hôm nay\n### Branch Protection Rules\n- **Nói dễ hiểu**: Bộ quy tắc tự động ngăn chặn việc đẩy code trực tiếp hoặc merge bừa bãi vào nhánh quan trọng.\n- **Ví dụ**: Khóa nhánh `main`, chỉ cho phép merge khi đã có ít nhất một đồng nghiệp bấm Approve và test CI chạy qua.\n- **Đừng nhầm**: Không phải quyền truy cập tài khoản, mà là điều kiện bắt buộc áp dụng riêng cho từng nhánh Git.\n\n### Status Checks\n- **Nói dễ hiểu**: Các bài kiểm tra tự động chạy trên GitHub Actions trước khi cấp phép hợp nhất mã nguồn.\n- **Ví dụ**: Bài kiểm tra `npm test` và `lint` phải báo màu xanh thì nút Merge mới sáng lên.\n- **Đừng nhầm**: Không thay thế việc con người review code; con người kiểm tra nghiệp vụ còn máy kiểm tra cú pháp và logic.\n\n### Linear History\n- **Nói dễ hiểu**: Quy tắc giữ cho lịch sử commit trên nhánh chính luôn là một đường thẳng tắp, không có nhánh rẽ chằng chịt.\n- **Ví dụ**: Yêu cầu nhóm sử dụng Squash and Merge hoặc Rebase thay vì tạo các merge commit thông thường.\n- **Đừng nhầm**: Không làm mất nội dung code, chỉ gộp hoặc sắp xếp lại thứ tự commit cho gọn gàng.\n\n## 📖 Định nghĩa\nBranch Protection Rules là bộ chính sách kỹ thuật trên GitHub nhằm bảo vệ các nhánh trọng yếu. Hệ thống buộc mọi thay đổi phải đi qua Pull Request, đáp ứng đủ số lượt duyệt của đồng nghiệp, vượt qua kiểm thử tự động và giải quyết hết các bình luận trước khi được merge.\n\n## 💡 Tại sao cần\nTin tưởng ý thức tự giác là chưa đủ khi làm việc nhóm quy mô lớn. Lập trình viên có thể vô tình quên test hoặc vội vã đưa code lỗi lên máy chủ sản xuất. Quy tắc bảo vệ nhánh đóng vai trò như chốt chặn kỹ thuật tự động, bảo đảm chất lượng đồng đều cho mọi dòng mã.\n\n## 🧠 Mental Model\nHãy tưởng tượng quy trình an ninh sân bay đa tầng trước khi hành khách lên máy bay. Bạn phải xuất trình vé hợp lệ do nhân viên xác nhận (`Require approvals`), hành lý qua máy quét tự động không có vật cấm (`Status checks pass`), và giải quyết xong mọi thắc mắc ở cổng soi chiếu (`Conversations resolved`).\n\n## 📊 Sơ đồ minh họa\n```mermaid\nflowchart TD\n    PR[Pull Request mới] --> C1{Đủ lượt Approve?}\n    C1 -- Chưa --> Block1[Khóa nút Merge]\n    C1 -- Đã duyệt --> C2{CI Status Checks Pass?}\n    C2 -- Thất bại đỏ --> Block2[Khóa nút Merge]\n    C2 -- Thành công xanh --> C3{Giải quyết hết hội thoại?}\n    C3 -- Còn phản hồi --> Block3[Khóa nút Merge]\n    C3 -- Hoàn tất --> Open[Nút Merge sáng xanh - Cho phép hợp nhất]\n```\n\n## 🏢 Ví dụ thực tế\nMột công ty tài chính cấu hình nhánh `main` yêu cầu tối thiểu hai lượt Approve từ kỹ sư cao cấp và bài test kiểm tra bảo mật phải đạt. Khi một lập trình viên gửi PR bổ sung cổng nạp thẻ, dù đồng nghiệp đã duyệt một lượt nhưng nút Merge vẫn xám. Sau khi có thêm lượt duyệt thứ hai và bài test tự động báo xanh, mã nguồn mới được đưa vào sản xuất an toàn.\n\n## 💻 Command & Cú pháp\n```bash\n# Kiểm tra danh sách status checks của Pull Request hiện tại\ngh pr checks\n\n# Xem tổng quan trạng thái phê duyệt của Pull Request\ngh pr status\n\n# Kiểm tra tính hợp lệ của chữ ký số GPG trên các commit\ngit log --oneline --show-signature\n```\n\n## 🔍 Giải thích command\n- `gh pr checks`: Hiển thị danh sách các bài test tự động và trạng thái thành công hay thất bại của từng bài kiểm tra.\n- `gh pr status`: Xem nhanh tiến độ phê duyệt, trạng thái bình luận và kết quả kiểm thử của các nhánh đang làm việc.\n- `git log --show-signature`: Xác thực tính toàn vẹn và danh tính tác giả qua chữ ký điện tử GPG đính kèm từng commit.\n\n## ⚠️ Sai lầm phổ biến\n- Đặt số lượng reviewer bắt buộc quá cao trong nhóm ít người gây tắc nghẽn tiến độ dự án.\n- Quên tích chọn tự động hủy phê duyệt cũ khi có commit mới khiến code sửa đổi không được kiểm tra lại.\n- Thiết lập status checks với những bài test không ổn định khiến Pull Request bị chặn vô lý.\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình trực tiếp trên giao diện GitHub Repository Settings và đối chiếu theo hướng dẫn bên dưới.\n\n1. Truy cập Repository trên GitHub, vào mục **Settings** rồi chọn **Branches**.\n2. Nhấn **Add branch protection rule**, nhập pattern là `main`.\n3. Tích chọn **Require a pull request before merging** và đặt **Require approvals** là 1.\n4. Tích chọn **Dismiss stale pull request approvals when new commits are pushed**.\n5. Nhấn **Create** để lưu quy tắc, sau đó thử tạo một Pull Request để quan sát các điều kiện khóa tự động.\n\n## 💡 Hint & mẹo\n- Luôn bật tính năng hủy phê duyệt cũ khi có commit mới để tránh sơ hở lọt mã nguồn chưa qua kiểm duyệt.\n- Bạn có thể bật thêm tùy chọn Do not allow bypassing the above settings để ngay cả Admin repo cũng phải tuân thủ đúng quy trình.\n\n## ✅ Validation & Kết quả mong đợi\n- Nút Merge trên giao diện GitHub hiển thị trạng thái Merging is blocked màu xám khi chưa đủ điều kiện.\n- Nút Merge chỉ chuyển sang màu xanh khi toàn bộ các bài kiểm tra tự động đạt yêu cầu và có đủ số lượt phê duyệt từ đồng nghiệp.\n\n## ❓ Quiz nhanh\nHãy làm bài trắc nghiệm bên dưới để kiểm tra mức độ thấu hiểu của bạn về các quy tắc Branch Protection Rules chuyên sâu.\n\n## 🚀 Thử thách nâng cao\nHãy tìm hiểu thêm về tính năng Rulesets mới trên GitHub và so sánh ưu điểm của Rulesets so với Branch Protection Rules truyền thống khi quản lý nhiều nhánh cùng lúc.\n\n## 📝 Tổng kết\n- Branch Protection Rules là chốt chặn kỹ thuật tự động giúp bảo vệ nhánh chính khỏi mã nguồn lỗi.\n- Kết hợp duyệt mã bắt buộc và status checks từ CI/CD tạo nên hàng rào bảo mật nhiều lớp đáng tin cậy.\n- Duy trì lịch sử tuyến tính và chữ ký commit giúp cây mã nguồn rõ ràng, minh bạch và dễ dàng truy vết sự cố.\n",
  "quiz": {
    "id": "quiz-06-08-branch-protection-rules",
    "title": "Trắc nghiệm: Branch Protection Rules",
    "questions": [
      {
        "id": "q1",
        "question": "Tùy chọn \"Require a pull request before merging\" kết hợp \"Require approvals\" mang lại lợi ích gì?",
        "type": "single",
        "options": [
          {
            "text": "Bắt buộc mã nguồn phải được ít nhất một số lượng đồng nghiệp chỉ định xem xét và phê duyệt trước khi được phép merge",
            "correct": true
          },
          {
            "text": "Tự động gửi tin nhắn SMS thông báo cho toàn bộ công ty",
            "correct": false
          },
          {
            "text": "Cho phép bất kỳ ai trên mạng cũng có quyền merge code",
            "correct": false
          },
          {
            "text": "Tự động xóa tài khoản của người gửi Pull Request",
            "correct": false
          }
        ],
        "explanation": "Quy tắc này bảo đảm không ai có thể tự biên tự diễn đưa code lên nhánh chính mà không có sự kiểm tra chéo từ đồng nghiệp."
      },
      {
        "id": "q2",
        "question": "Tính năng \"Dismiss stale pull request approvals when new commits are pushed\" hoạt động như thế nào?",
        "type": "single",
        "options": [
          {
            "text": "Nếu tác giả đẩy thêm commit mới sau khi đã được duyệt, các lượt phê duyệt trước đó sẽ tự động bị hủy và phải duyệt lại",
            "correct": true
          },
          {
            "text": "Tự động xóa luôn các commit mới vừa đẩy lên",
            "correct": false
          },
          {
            "text": "Chặn không cho phép tác giả sửa lỗi nữa",
            "correct": false
          },
          {
            "text": "Tự động chấp nhận ngay lập tức mà không cần kiểm tra",
            "correct": false
          }
        ],
        "explanation": "Tùy chọn này ngăn chặn việc tác giả vô tình hoặc cố ý thêm mã nguồn lỗi hoặc mã độc vào PR sau khi đồng nghiệp đã bấm duyệt."
      },
      {
        "id": "q3",
        "question": "Quy tắc \"Require status checks to pass before merging\" có vai trò gì trong đường ống CI/CD?",
        "type": "single",
        "options": [
          {
            "text": "Chỉ cho phép merge khi tất cả các bài kiểm tra tự động như Unit Test, Linting và Build đều vượt qua thành công",
            "correct": true
          },
          {
            "text": "Kiểm tra xem số dư tài khoản ngân hàng của lập trình viên có đủ không",
            "correct": false
          },
          {
            "text": "Kiểm tra tốc độ gõ bàn phím của người viết mã nguồn",
            "correct": false
          },
          {
            "text": "Tự động bỏ qua toàn bộ các ca kiểm thử bị lỗi đỏ",
            "correct": false
          }
        ],
        "explanation": "Status checks biến hệ thống kiểm thử tự động thành cổng gác kiên cố, ngăn chặn mã nguồn vỡ build phá hỏng nhánh chính."
      },
      {
        "id": "q4",
        "question": "Quy tắc \"Require conversation resolution before merging\" bảo đảm điều gì trong quá trình review?",
        "type": "single",
        "options": [
          {
            "text": "Tất cả các bình luận góp ý và thảo luận của đồng nghiệp trên từng dòng code đều phải được phản hồi hoặc đánh dấu giải quyết xong",
            "correct": true
          },
          {
            "text": "Bắt buộc lập trình viên phải gọi video call cho người review",
            "correct": false
          },
          {
            "text": "Tự động xóa tất cả các bình luận có từ ngữ phê bình tiêu cực",
            "correct": false
          },
          {
            "text": "Chỉ cho phép bình luận bằng hình ảnh động GIF",
            "correct": false
          }
        ],
        "explanation": "Bảo đảm mọi thắc mắc, phản biện và yêu cầu chỉnh sửa từ reviewer đều đã được tác giả xử lý thấu đáo trước khi hợp nhất."
      },
      {
        "id": "q5",
        "question": "Khi quy tắc \"Require linear history\" được bật, điều gì sẽ bị cấm trên nhánh được bảo vệ?",
        "type": "single",
        "options": [
          {
            "text": "Cấm các merge commit rẽ nhánh thông thường, chỉ chấp nhận hợp nhất qua Fast-Forward, Squash hoặc Rebase",
            "correct": true
          },
          {
            "text": "Cấm tạo commit vào các ngày thứ bảy và chủ nhật",
            "correct": false
          },
          {
            "text": "Cấm viết commit message có độ dài vượt quá 10 ký tự",
            "correct": false
          },
          {
            "text": "Cấm sử dụng hình đại diện trên GitHub",
            "correct": false
          }
        ],
        "explanation": "Lịch sử tuyến tính (Linear history) giữ cho cây commit luôn thẳng tắp một hàng dọc, giúp việc tra cứu lịch sử và bisect cực kỳ dễ dàng."
      },
      {
        "id": "q6",
        "question": "Quy tắc \"Require signed commits\" yêu cầu lập trình viên phải làm gì khi thực hiện commit mã nguồn?",
        "type": "single",
        "options": [
          {
            "text": "Phải ký số điện tử mã hóa bằng khóa bảo mật GPG hoặc SSH để xác thực danh tính chống giả mạo tác giả",
            "correct": true
          },
          {
            "text": "Phải in thông điệp commit ra giấy rồi ký tay bằng bút mực",
            "correct": false
          },
          {
            "text": "Phải nộp ảnh chụp căn cước công dân vào thư mục gốc của dự án",
            "correct": false
          },
          {
            "text": "Phải nhờ người quản lý dự án ký tên trực tiếp lên màn hình máy tính",
            "correct": false
          }
        ],
        "explanation": "Chữ ký số GPG chứng thực người commit chính là chủ nhân thực sự của khóa bảo mật, ngăn chặn hành vi giả mạo email người khác trong Git."
      }
    ]
  }
};
export default lesson;
