import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "16-team-project-challenge",
  "moduleId": "04-github-collaboration",
  "metadata": {
    "id": "16-team-project-challenge",
    "title": "Thử thách dự án nhóm Team Project Challenge",
    "level": "intermediate",
    "duration": 45,
    "xp": 200,
    "prerequisites": [
      "15-collaboration-workflow"
    ],
    "objectives": [
      "Áp dụng tổng hợp toàn bộ kỹ năng Level 4 vào một kịch bản dự án cộng tác nhóm hoàn chỉnh.",
      "Đóng vai trò một kỹ sư thực chiến giải quyết Issue, phát triển nhánh tính năng, push và mở PR.",
      "Tham gia đóng vai trò Reviewer để đánh giá mã nguồn, đưa ra phản biện và phê duyệt PR của đồng nghiệp.",
      "Xử lý tình huống xung đột khi merge PR và hoàn tất quy trình phát hành tính năng lên sản phẩm."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "team-project-simulation"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "team challenge",
      "du an nhom",
      "tong hop level 4",
      "collaboration master",
      "full workflow"
    ],
    "commands": [
      "git switch main",
      "git pull origin main",
      "git switch -c feat/coupon-system",
      "git push -u origin feat/coupon-system",
      "git branch -d feat/coupon-system"
    ]
  },
  "content": "# Thử thách dự án nhóm Team Project Challenge\n\n---\n\n## 🎯 Mục tiêu\n- Áp dụng tổng hợp toàn bộ kỹ năng Level 4 vào một kịch bản dự án cộng tác nhóm hoàn chỉnh.\n- Đóng vai trò một kỹ sư thực chiến giải quyết Issue, phát triển nhánh tính năng, push và mở PR.\n- Tham gia đóng vai trò Reviewer để đánh giá mã nguồn, đưa ra phản biện và phê duyệt PR của đồng nghiệp.\n- Xử lý tình huống xung đột khi merge PR và hoàn tất quy trình phát hành tính năng lên sản phẩm.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### team simulation\n- **Nói dễ hiểu**: Kịch bản mô phỏng toàn diện môi trường làm việc nhóm thực tế với đầy đủ các vai trò kỹ sư và reviewer.\n- **Ví dụ**: Nhận Issue được giao, tách nhánh tính năng, đẩy code và mở PR chờ đồng nghiệp duyệt.\n- **Đừng nhầm**: Không chỉ là gõ lệnh một mình; đây là bài tập rèn luyện kỹ năng phối hợp và tuân thủ quy trình nhóm.\n\n### reviewer checklist\n- **Nói dễ hiểu**: Danh sách các tiêu chí kiểm tra mà người đánh giá dùng để soi xét chất lượng PR trước khi duyệt.\n- **Ví dụ**: Kiểm tra xem code có chạy qua bài test không, có bị lộ mật khẩu không và có viết tài liệu đầy đủ không.\n- **Đừng nhầm**: Không nhằm mục đích gây khó dễ; checklist bảo vệ cả nhóm khỏi các lỗi nghiêm trọng lọt vào production.\n\n### release integration\n- **Nói dễ hiểu**: Thao tác hòa nhập tính năng đã được kiểm duyệt và gộp vào nhánh chính để sẵn sàng phát hành.\n- **Ví dụ**: Squash-merge nhánh `feat/coupon` vào nhánh `main` và kích hoạt luồng đóng gói phiên bản mới.\n- **Đừng nhầm**: Không dừng lại ở việc gộp code; bạn còn cần xóa nhánh cũ và kéo cập nhật mới về máy cá nhân.\n\n---\n\n## 📖 Định nghĩa\nThử thách dự án nhóm Team Project Challenge là bài sát hạch toàn diện của Level 4: GitHub Collaboration, đặt bạn vào môi trường mô phỏng dự án nhóm thực tế với đầy đủ các vai trò: Quản trị viên, Lập trình viên và Người đánh giá để giải quyết một bài toán nghiệp vụ trọn vẹn từ khâu nhận việc đến xuất bản.\n\n---\n\n## 💡 Tại sao cần\nLập trình trong môi trường hiện đại là môn thể thao đồng đội. Dù bạn có kỹ năng viết code tốt nhưng nếu thiếu khả năng phối hợp trên GitHub, bạn không thể làm việc trong các công ty chuyên nghiệp. Hoàn thành thử thách này khẳng định bạn đã sẵn sàng tham gia vào các đội ngũ kỹ thuật thực tế.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung thử thách này như một trận thi đấu bóng đá nội bộ trước thềm giải vô địch. Bạn không còn tập sút một mình vào lưới trống. Bạn phải phối hợp chuyền bóng ăn ý với đồng đội (pull code), nhận bóng thuận lợi (tách nhánh), vượt qua hậu vệ (giải quyết xung đột) và ghi bàn thắng quyết định (Merge PR).\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nKịch bản mô phỏng thử thách Team Project:\n[Issue: Thêm tính năng Coupon giảm giá]\n                  │\n                  ▼\n[Kỹ sư tạo nhánh feat/coupon ──► Push ──► Tạo PR]\n                  │\n                  ▼\n[Reviewer đánh giá: Yêu cầu sửa lỗi tính tiền]\n                  │\n                  ▼\n[Kỹ sư cập nhật commit mới ──► Reviewer Approve ──► Squash & Merge!]\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nHọc viên tiếp nhận Issue #201 yêu cầu xây dựng tính năng mã giảm giá cho ứng dụng mua sắm. Học viên kéo code mới nhất từ main, tạo nhánh `feat/coupon-system`, hoàn thành tính năng và commit theo chuẩn. Khi mở PR, bạn nhận góp ý từ Reviewer yêu cầu xử lý trường hợp mã hết hạn. Học viên bổ sung commit, vượt qua kiểm thử tự động, được Approve và merge thành công vào main.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit switch main\ngit pull origin main\ngit switch -c feat/coupon-system\ngit push -u origin feat/coupon-system\ngit branch -d feat/coupon-system\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch main && git pull origin main`: Khởi đầu từ nền tảng code mới nhất của dự án nhóm.\n- `git switch -c <nhánh>`: Tách nhánh cô lập phát triển tính năng thử thách.\n- `git push -u origin <nhánh>`: Đẩy nhánh lên máy chủ GitHub mô phỏng.\n- `git branch -d <nhánh>`: Dọn dẹp vệ sinh kho chứa sau khi kết thúc thử thách xuất sắc.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Tự ý merge PR khi chưa được phê duyệt**: Bỏ qua quy trình kiểm soát chất lượng và làm tăng nguy cơ lỗi cho toàn đội.\n2. **Không đọc kỹ yêu cầu trong Issue**: Dẫn đến việc lập trình sai nghiệp vụ và phải viết lại tính năng từ đầu.\n3. **Quên kéo cập nhật main về máy sau khi merge**: Khiến các nhánh tính năng tiếp theo bị xuất phát từ mốc lịch sử cũ lỗi thời.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn vận hành chu trình phối hợp nhóm hoàn chỉnh từ tiếp nhận Issue đến đóng PR.\n1. Khởi động kịch bản mô phỏng dự án nhóm trong môi trường làm việc.\n2. Đọc kỹ yêu cầu trong Issue được giao và tạo nhánh tính năng tương ứng.\n3. Viết code giải quyết bài toán và tạo commit chuẩn quy ước Conventional Commits.\n4. Mở Pull Request, đọc nhận xét của Reviewer và thực hiện chỉnh sửa bổ sung.\n5. Hoàn tất merge PR và xác nhận Issue được đóng tự động.\n\n---\n\n## 💡 Hint & mẹo\n> Luôn giữ thái độ cầu thị, đọc kỹ phản hồi của Reviewer để hoàn thiện mã nguồn theo đúng tiêu chuẩn dự án.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Toàn bộ chu trình từ Issue đến PR Merged được hoàn thành trơn tru.\n- Nhánh tính năng được dọn dẹp sạch sẽ và nhánh main cục bộ đồng bộ hoàn toàn với remote.\n\n---\n\n## ❓ Quiz nhanh\nLàm bài trắc nghiệm tổng kết để hoàn tất toàn bộ Level 4: GitHub Collaboration.\n\n---\n\n## 🚀 Thử thách nâng cao\nMô phỏng lại toàn bộ quy trình này với một người bạn học cùng bằng cách tạo repository thật trên GitHub và phân vai review chéo cho nhau.\n\n---\n\n## 📝 Tổng kết\n- Làm chủ toàn diện kỹ năng cộng tác: Clone, Fetch, Pull, Push, Fork, PR và Code Review.\n- Feature Branch Workflow là kim chỉ nam cho mọi hoạt động phát triển phần mềm nhóm.\n- Giao tiếp văn minh, viết mô tả rõ ràng và tôn trọng quy trình là chìa khóa của sự thành công.\n",
  "quiz": {
    "id": "quiz-04-16-team-project-challenge",
    "title": "Trắc nghiệm tổng kết: Master GitHub Collaboration",
    "questions": [
      {
        "id": "q1",
        "question": "Quy trình chuẩn mực nhất để một kỹ sư phần mềm hoàn thành một nhiệm vụ trong dự án nhóm là gì?",
        "type": "single",
        "options": [
          {
            "text": "Đọc Issue -> Pull main mới nhất -> Tạo feature branch -> Code & Commit -> Push -> Mở PR -> Nhận review & sửa đổi -> Merge & Dọn nhánh",
            "correct": true
          },
          {
            "text": "Commit trực tiếp vào nhánh main của công ty rồi gửi tin nhắn bảo đồng nghiệp tự kiểm tra",
            "correct": false
          },
          {
            "text": "Tải mã nguồn về máy rồi gửi file nén ZIP qua email cho sếp",
            "correct": false
          },
          {
            "text": "Xóa toàn bộ dự án cũ và tự viết lại một ứng dụng hoàn toàn mới",
            "correct": false
          }
        ],
        "explanation": "Chu trình 7 bước khép kín từ Issue đến Merge là chuẩn mực quốc tế của phát triển phần mềm chuyên nghiệp."
      },
      {
        "id": "q2",
        "question": "Khi đồng nghiệp để lại nhận xét \"Request changes\" trên PR của bạn, thái độ và hành động chuẩn mực nhất là gì?",
        "type": "single",
        "options": [
          {
            "text": "Đọc kỹ lý do kỹ thuật, trao đổi văn minh để làm rõ nếu chưa hiểu, thực hiện chỉnh sửa bổ sung và push commit mới lên PR",
            "correct": true
          },
          {
            "text": "Nổi giận và tìm cách công kích cá nhân đồng nghiệp trên mạng xã hội",
            "correct": false
          },
          {
            "text": "Đóng PR và xóa toàn bộ tài khoản GitHub của mình",
            "correct": false
          },
          {
            "text": "Bỏ qua nhận xét và cố tình cưỡng chế merge code vào main",
            "correct": false
          }
        ],
        "explanation": "Code Review là cơ hội hoàn thiện mã nguồn; đón nhận phản biện với tinh thần cầu thị và chuyên nghiệp."
      },
      {
        "id": "q3",
        "question": "Sự khác biệt căn bản giữa hai nhánh `main` và `origin/main` trên máy tính cá nhân của bạn là gì?",
        "type": "single",
        "options": [
          {
            "text": "`main` là con trỏ nhánh cục bộ bạn có thể commit sửa đổi, còn `origin/main` là con trỏ chỉ đọc phản ánh trạng thái trên server",
            "correct": true
          },
          {
            "text": "Hai con trỏ này hoàn toàn giống nhau 100% không có gì khác biệt",
            "correct": false
          },
          {
            "text": "`origin/main` là nhánh của tổng thống Mỹ, `main` là của người dùng",
            "correct": false
          },
          {
            "text": "`main` chỉ lưu tệp ảnh, `origin/main` chỉ lưu mã nguồn",
            "correct": false
          }
        ],
        "explanation": "`origin/main` là Remote-tracking branch do Git tự cập nhật khi fetch; bạn không thể commit trực tiếp lên nó."
      },
      {
        "id": "q4",
        "question": "Tại sao việc viết Commit Message và mô tả Pull Request rõ ràng lại cực kỳ quan trọng đối với dự án dài hạn?",
        "type": "single",
        "options": [
          {
            "text": "Giúp lưu trữ tài liệu kỹ thuật, giải thích lý do đưa ra quyết định kiến trúc và hỗ trợ việc bảo trì sau này",
            "correct": true
          },
          {
            "text": "Để đáp ứng yêu cầu tính số lượng từ ngữ của quản trị viên",
            "correct": false
          },
          {
            "text": "Để làm đẹp mắt giao diện web của GitHub",
            "correct": false
          },
          {
            "text": "Vì nếu không viết thì máy tính sẽ tự động tắt nguồn",
            "correct": false
          }
        ],
        "explanation": "Tài liệu commit và PR là di sản quý giá giúp các thế hệ kỹ sư sau hiểu được bối cảnh tại sao code lại được viết như vậy."
      },
      {
        "id": "q5",
        "question": "Để kiểm tra xem nhánh cục bộ của bạn đang đi trước hay tụt sau nhánh remote bao nhiêu commit, lệnh nào hiển thị trực quan nhất?",
        "type": "single",
        "options": [
          {
            "text": "git status hoặc git branch -vv",
            "correct": true
          },
          {
            "text": "git show --cloud",
            "correct": false
          },
          {
            "text": "git remote ping",
            "correct": false
          },
          {
            "text": "git network-check",
            "correct": false
          }
        ],
        "explanation": "`git status` và `git branch -vv` in rõ trạng thái `ahead N` và `behind M` của tracking branch."
      },
      {
        "id": "q6",
        "question": "Sau khi hoàn thành xuất sắc toàn bộ 16 bài học của Level 4, bạn đã đạt được năng lực nào sau đây?",
        "type": "single",
        "options": [
          {
            "text": "Tự tin cộng tác nhóm, làm chủ toàn bộ chu trình GitHub, xử lý xung đột mạng và tham gia vào các dự án chuyên nghiệp",
            "correct": true
          },
          {
            "text": "Trở thành chuyên gia phần cứng sửa chữa vi mạch máy tính",
            "correct": false
          },
          {
            "text": "Biết cách hack mật khẩu tài khoản ngân hàng của người khác",
            "correct": false
          },
          {
            "text": "Có thể lập trình mà không cần dùng đến bàn phím máy tính",
            "correct": false
          }
        ],
        "explanation": "Level 4 trang bị toàn bộ kỹ năng cộng tác nhóm và văn hóa Git chuyên nghiệp trên GitHub."
      }
    ]
  }
};
export default lesson;
