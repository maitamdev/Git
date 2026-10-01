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
      "Thực hiện một thay đổi README trên nhánh riêng trong kho thử nghiệm.",
      "Kiểm tra diff, tạo commit và tự rà soát theo tiêu chí hoàn thành.",
      "Mô tả quy trình tạo PR và review; thực hiện trên GitHub nếu có quyền."
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
      "git switch -c feat/coupon-readme",
      "git status",
      "git diff",
      "git add README.md",
      "git commit -m \"docs: explain coupon feature\""
    ]
  },
  "content": "# Thử thách dự án nhóm Team Project Challenge\n\n---\n\n## 🎯 Mục tiêu\n- Áp dụng tổng hợp toàn bộ kỹ năng Level 4 vào một kịch bản dự án cộng tác nhóm hoàn chỉnh.\n- Đóng vai trò một kỹ sư thực chiến giải quyết Issue, phát triển nhánh tính năng, push và mở PR.\n- Tham gia đóng vai trò Reviewer để đánh giá mã nguồn, đưa ra phản biện và phê duyệt PR của đồng nghiệp.\n- Xử lý tình huống xung đột khi merge PR và hoàn tất quy trình phát hành tính năng lên sản phẩm.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### team simulation\n- **Nói dễ hiểu**: Bài tập nhập vai để tự làm các bước của người viết và tự kiểm tra như reviewer.\n- **Ví dụ**: Đọc yêu cầu, tạo nhánh, sửa file, commit và dùng checklist xem lại diff.\n- **Đừng nhầm**: Một mình không thể thực sự nhận review/approval từ người khác; có thể mời bạn học làm reviewer ở phần mở rộng.\n\n### acceptance criteria — tiêu chí hoàn thành\n- **Nói dễ hiểu**: Danh sách kết quả cụ thể dùng để quyết định nhiệm vụ đã làm xong chưa.\n- **Ví dụ**: README có hướng dẫn, thay đổi được commit, diff không chứa thông tin bí mật.\n- **Đừng nhầm**: “Đã push” không tự chứng minh tính năng đúng; cần đối chiếu yêu cầu và kiểm tra thay đổi.\n\n### self-review — tự rà thay đổi\n- **Nói dễ hiểu**: Tự đọc diff trước khi chia sẻ để phát hiện lỗi hoặc thay đổi ngoài ý muốn.\n- **Ví dụ**: Kiểm tra README đã có ví dụ và không chứa token/mật khẩu.\n- **Đừng nhầm**: Tự review không thay thế review độc lập nếu dự án yêu cầu người khác duyệt.\n\n---\n\n## 📖 Định nghĩa\nThử thách dự án nhóm Team Project Challenge là bài sát hạch toàn diện của Level 4: GitHub Collaboration, đặt bạn vào môi trường mô phỏng dự án nhóm thực tế với đầy đủ các vai trò: Quản trị viên, Lập trình viên và Người đánh giá để giải quyết một bài toán nghiệp vụ trọn vẹn từ khâu nhận việc đến xuất bản.\n\n---\n\n## 💡 Tại sao cần\nLập trình trong môi trường hiện đại là môn thể thao đồng đội. Dù bạn có kỹ năng viết code tốt nhưng nếu thiếu khả năng phối hợp trên GitHub, bạn không thể làm việc trong các công ty chuyên nghiệp. Hoàn thành thử thách này khẳng định bạn đã sẵn sàng tham gia vào các đội ngũ kỹ thuật thực tế.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung thử thách này như một trận thi đấu bóng đá nội bộ trước thềm giải vô địch. Bạn không còn tập sút một mình vào lưới trống. Bạn phải phối hợp chuyền bóng ăn ý với đồng đội (pull code), nhận bóng thuận lợi (tách nhánh), vượt qua hậu vệ (giải quyết xung đột) và ghi bàn thắng quyết định (Merge PR).\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nKịch bản mô phỏng thử thách Team Project:\n[Issue: Thêm tính năng Coupon giảm giá]\n                  │\n                  ▼\n[Kỹ sư tạo nhánh feat/coupon ──► Push ──► Tạo PR]\n                  │\n                  ▼\n[Reviewer đánh giá: Yêu cầu sửa lỗi tính tiền]\n                  │\n                  ▼\n[Kỹ sư cập nhật commit mới ──► Reviewer Approve ──► Squash & Merge!]\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nHọc viên tiếp nhận Issue #201 yêu cầu xây dựng tính năng mã giảm giá cho ứng dụng mua sắm. Học viên kéo code mới nhất từ main, tạo nhánh `feat/coupon-system`, hoàn thành tính năng và commit theo chuẩn. Khi mở PR, bạn nhận góp ý từ Reviewer yêu cầu xử lý trường hợp mã hết hạn. Học viên bổ sung commit, vượt qua kiểm thử tự động, được Approve và merge thành công vào main.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit switch main\ngit pull origin main\ngit switch -c feat/coupon-system\ngit push -u origin feat/coupon-system\ngit branch -d feat/coupon-system\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch main && git pull origin main`: Khởi đầu từ nền tảng code mới nhất của dự án nhóm.\n- `git switch -c <nhánh>`: Tách nhánh cô lập phát triển tính năng thử thách.\n- `git push -u origin <nhánh>`: Đẩy nhánh lên máy chủ GitHub mô phỏng.\n- `git branch -d <nhánh>`: Dọn dẹp vệ sinh kho chứa sau khi kết thúc thử thách xuất sắc.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Tự ý merge PR khi chưa được phê duyệt**: Bỏ qua quy trình kiểm soát chất lượng và làm tăng nguy cơ lỗi cho toàn đội.\n2. **Không đọc kỹ yêu cầu trong Issue**: Dẫn đến việc lập trình sai nghiệp vụ và phải viết lại tính năng từ đầu.\n3. **Quên kéo cập nhật main về máy sau khi merge**: Khiến các nhánh tính năng tiếp theo bị xuất phát từ mốc lịch sử cũ lỗi thời.\n\n---\n\n## 🧪 Lab thực hành\n**Nhiệm vụ:** cập nhật README cho tính năng mã giảm giá trong kho thử nghiệm. Làm trong Git Academy simulator hoặc bản sao local riêng; không push lên dự án thật nếu chưa được phép.\n1. Viết ba tiêu chí hoàn thành: README có mục “Mã giảm giá”, có một ví dụ sử dụng, và không chứa thông tin bí mật.\n2. Tạo nhánh `feat/coupon-readme` bằng `git switch -c feat/coupon-readme`.\n3. Sửa README bằng editor, thêm mục và ví dụ; lưu file.\n4. Chạy `git status` và `git diff` để xem đúng nội dung vừa sửa.\n5. Chạy `git add README.md`, rồi `git commit -m \"docs: explain coupon feature\"`.\n6. Tự review bằng checklist: đủ ba tiêu chí chưa, diff có thay đổi ngoài ý muốn hoặc secret không? Nếu cần, sửa và tạo commit bổ sung.\n7. Trong simulator, push chỉ cập nhật remote giả lập. Với GitHub thật, push lên kho thử nghiệm bạn có quyền, tạo PR và mời bạn học review; chỉ merge khi có quyền.\n\n---\n\n## 💡 Hint & mẹo\n> Luôn giữ thái độ cầu thị, đọc kỹ phản hồi của Reviewer để hoàn thiện mã nguồn theo đúng tiêu chuẩn dự án.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Có nhánh riêng, thay đổi README, diff đã kiểm tra và commit rõ nội dung.\n- Nếu mở PR thử nghiệm, mô tả nêu mục tiêu và cách kiểm tra; review/merge chỉ thực hiện nếu có quyền.\n\n---\n\n## ❓ Quiz nhanh\nLàm bài trắc nghiệm tổng kết để hoàn tất toàn bộ Level 4: GitHub Collaboration.\n\n---\n\n## 🚀 Thử thách nâng cao\nLàm theo cặp trên một repository thử nghiệm: một người tạo PR, người kia kiểm tra diff bằng checklist và để lại một góp ý cụ thể; tác giả cập nhật commit rồi cả hai xác nhận tiêu chí đã đạt. Cần tài khoản GitHub và quyền truy cập vào repository.\n\n---\n\n## 📝 Tổng kết\n- Có thể đọc một nhiệm vụ, làm thay đổi trên nhánh riêng, kiểm tra diff và tạo commit.\n- PR, fork, review và merge diễn ra trên nền tảng cộng tác; quyền và cách làm tùy dự án.\n- Giao tiếp rõ ràng và làm theo quy trình của nhóm giúp người khác kiểm tra thay đổi.\n",
  "quiz": {
    "id": "quiz-04-16-team-project-challenge",
    "title": "Trắc nghiệm tổng kết: Master GitHub Collaboration",
    "questions": [
      {
        "id": "q1",
        "question": "Luồng nào là một ví dụ phổ biến để xử lý nhiệm vụ trong dự án dùng Feature Branch Workflow?",
        "type": "single",
        "options": [
          {
            "text": "Đọc yêu cầu -> theo hướng dẫn cập nhật nhánh nền -> tạo nhánh -> sửa và commit -> mở PR -> review -> tích hợp theo quy định",
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
        "explanation": "Đây là một luồng thường dùng; repository có thể quy định nhánh nền, review và cách tích hợp khác."
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
            "text": "`main` là nhánh local; `origin/main` là remote-tracking ref local phản ánh trạng thái ở lần fetch gần nhất",
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
        "explanation": "`origin/main` là ref local được cập nhật khi fetch; bạn không commit trực tiếp vào remote-tracking ref."
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
        "explanation": "Các lệnh này hiển thị độ lệch khi nhánh có upstream và thông tin remote-tracking đã được fetch."
      },
      {
        "id": "q6",
        "question": "Sau thử thách README, bạn có thể chứng minh được năng lực nào bằng kết quả thực hành?",
        "type": "single",
        "options": [
          {
            "text": "Tạo nhánh, sửa README, kiểm tra diff, tạo commit và giải thích các bước cần có khi mở PR",
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
        "explanation": "Bằng chứng của thử thách là thay đổi, diff, commit và mô tả được bước cộng tác trên PR."
      }
    ]
  }
};
export default lesson;
