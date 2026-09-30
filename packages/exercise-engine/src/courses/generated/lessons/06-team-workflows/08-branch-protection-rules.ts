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
  "content": "# Branch Protection Rules\n\n---\n\n## 🎯 Mục tiêu\n- Làm chủ toàn diện các tùy chọn chi tiết trong bộ quy tắc Branch Protection Rules trên GitHub.\n- Thiết lập yêu cầu bắt buộc kiểm duyệt mã nguồn: số lượng người phê duyệt tối thiểu (Require approvals) và tự động vô hiệu hóa duyệt khi có commit mới.\n- Cấu hình cổng kiểm tra trạng thái bắt buộc (Require status checks to pass) tích hợp chặt chẽ với CI/CD.\n- Áp dụng quy tắc lịch sử tuyến tính (Require linear history) và chữ ký bảo mật (Require signed commits).\n\n---\n\n## 📖 Định nghĩa\n> Branch Protection Rules (Các quy tắc bảo vệ nhánh chuyên sâu) là bộ công cụ thiết lập chính sách chi tiết trên các nền tảng Git hiện đại, cho phép người quản trị định nghĩa chính xác những điều kiện tiên quyết bắt buộc phải được thỏa mãn trước khi một Pull Request được phép hợp nhất vào nhánh được bảo vệ. Các điều kiện này bao gồm: số lượng kỹ sư bắt buộc phải bấm Approve, các bài kiểm thử tự động (CI Status Checks) phải báo xanh, toàn bộ các luồng thảo luận phản hồi phải được giải quyết xong, và các commit phải có chữ ký số GPG hợp lệ.\n\n---\n\n## 🤔 Tại sao cần?\nChỉ nói \"hãy review code nhé\" dựa trên sự tự giác là chưa đủ trong các môi trường doanh nghiệp quy mô lớn. Con người có thể quên, vội vã hoặc chủ quan bấm merge khi đoạn mã còn lỗi nghiêm trọng. Branch Protection Rules đóng vai trò như một người gác cổng cơ học tự động hóa 100%: nếu thiếu dù chỉ một chữ ký duyệt hoặc có một ca kiểm thử thất bại, nút Merge sẽ bị khóa chặt với màu xám, bảo đảm không một đoạn code kém chất lượng nào có thể lọt vào nhánh chính.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung quy trình cất cánh của một máy bay chở khách thương mại. Trước khi máy bay được phép rời mặt đất, cơ trưởng phải hoàn thành một Danh sách kiểm tra an toàn (Safety Checklist) bắt buộc. Kỹ sư động cơ phải ký xác nhận động cơ hoàn hảo (`Status Checks pass`), cơ phó phải đối soát lộ trình bay (`Require 1 approval`), tiếp viên trưởng xác nhận cửa đã đóng kín (`Conversations resolved`). Nếu thiếu bất kỳ một dấu tích kiểm tra nào trên bảng điện tử, trạm kiểm soát không lưu sẽ khóa quyền cất cánh.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCổng kiểm soát đa tầng của Branch Protection Rules:\nPull Request ──► [Layer 1: Phải có >= 1 Approval từ đồng nghiệp] ──► ❌ (Thiếu chữ ký -> Khóa)\n                 │\n                 ▼ (Đạt)\n                 [Layer 2: CI Test & Linting phải PASS 100%]     ──► ❌ (Test đỏ -> Khóa)\n                 │\n                 ▼ (Đạt)\n                 [Layer 3: Mọi bình luận phải được Resolve]      ──► ❌ (Chưa xong thảo luận -> Khóa)\n                 │\n                 ▼ (Đạt)\n                 [Nút Merge bật xanh - Cho phép tích hợp!]\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nNhóm phát triển cổng thanh toán trực tuyến cấu hình một quy tắc bảo vệ nhánh nghiêm ngặt cho `main`: yêu cầu tối thiểu 2 lượt phê duyệt từ các kỹ sư cao cấp, bắt buộc luồng CI `build-and-test` phải hoàn thành thành công trong vòng 5 phút, và yêu cầu xóa nhánh sau khi gộp. Khi lập trình viên Bình mở Pull Request thêm phương thức thanh toán ví điện tử, dù đã có một đồng nghiệp bấm Approve nhưng nút Merge trên GitHub vẫn hiển thị trạng thái \"Merging is blocked\". Bình kiên nhẫn chờ bài test CI tự động chạy xong và nhận thêm một lượt Approve từ kỹ sư trưởng bảo mật. Khi tất cả các biểu tượng chuyển sang dấu tích xanh lá cây, hệ thống mới mở khóa cho phép Bình nhấn nút hợp nhất an toàn.\n\n---\n\n## 💻 Command\n```bash\ngh pr checks\ngh pr status\ngit log --oneline --show-signature\n```\n\n---\n\n## 🔍 Giải thích command\n- `gh pr checks`: Kiểm tra danh sách các bài test tự động bắt buộc và trạng thái Pass/Fail của chúng.\n- `gh pr status`: Xem tổng quan trạng thái phê duyệt của Pull Request hiện tại trực tiếp từ dòng lệnh.\n- `git log --show-signature`: Kiểm tra tính hợp lệ của chữ ký số GPG gắn trên từng commit.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Đặt số lượng reviewer bắt buộc quá cao (ví dụ >= 4) trong nhóm nhỏ**:  Gây tắc nghẽn công việc nghiêm trọng.\n2. **Không tích chọn \"Dismiss stale pull request approvals when new commits are pushed\"**:  Khiến code mới sửa sau review bị lọt mà không được xem lại.\n3. **Thiết lập status checks với những bài test không ổn định (flaky tests)**:  Khiến PR bị chặn oan uổng do lỗi môi trường mạng.\n\n---\n\n## 🧪 Lab\n1. Cấu hình quy tắc yêu cầu ít nhất 1 lượt review approval cho nhánh `main` trong repository thử nghiệm.\n2. Thử mở một PR và quan sát trạng thái khóa của nút Merge cho đến khi có tài khoản khác bấm Approve.\n\n---\n\n## 💡 Hint\n> Luôn bật tùy chọn tự động hủy phê duyệt cũ khi có commit mới được đẩy thêm vào Pull Request.\n\n---\n\n## ✅ Validation\n- Nút Merge trên GitHub chỉ có thể bấm được khi tất cả các bài kiểm tra đều đạt và đủ lượt phê duyệt.\n\n---\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm dưới đây về các quy tắc Branch Protection Rules chuyên sâu.\n\n---\n\n## 🔥 Challenge\nGiải thích tác động của quy tắc \"Require linear history\" đối với lịch sử commit của nhánh chính.\n\n---\n\n## 📚 Tổng kết\n- Branch Protection Rules cung cấp các cổng kiểm soát kỹ thuật tự động hóa trước khi hợp nhất.\n- Kết hợp chặt chẽ giữa sự thẩm định của con người (Code Review) và sự chính xác của máy móc (CI Checks).\n- Là tiêu chuẩn bảo mật và kiểm soát chất lượng bắt buộc trong mọi dự án công nghệ chuyên nghiệp.\n",
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
