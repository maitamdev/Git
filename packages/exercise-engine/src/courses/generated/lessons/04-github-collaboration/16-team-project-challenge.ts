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
  "content": "# Thử thách dự án nhóm Team Project Challenge\n\n---\n\n## 🎯 Mục tiêu\n- Vận dụng tổng hợp toàn bộ tri thức của Level 4 vào một kịch bản dự án cộng tác nhóm hoàn chỉnh chuẩn thực tế.\n- Hóa thân thành kỹ sư phần mềm thực chiến: nhận việc từ Issue, phát triển nhánh tính năng, push và mở Pull Request.\n- Đảm nhận vai trò Reviewer: soi chiếu từng dòng mã nguồn, đưa ra phản biện mang tính xây dựng và phê duyệt PR.\n- Làm chủ kỹ năng tự rà soát (Self-review) và nghiệm thu tính năng dựa trên bộ tiêu chí chuẩn xác.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### team simulation — mô phỏng nhóm thực chiến\n- **Nói dễ hiểu:** Kịch bản mô phỏng môi trường làm việc nhóm thực tế, nơi bạn đóng vai cả người lập trình lẫn người phản biện mã nguồn.\n- **Ví dụ:** Bạn tiếp nhận yêu cầu từ một Issue, phân tích nghiệp vụ, lập trình trên nhánh riêng rồi mở PR mời đồng đội thẩm định.\n- **Đừng nhầm:** Dù là môi trường thực hành, mọi quy chuẩn về thông điệp commit, tiêu chuẩn code và văn hóa PR đều phải nghiêm ngặt như dự án thật.\n\n### acceptance criteria — tiêu chí nghiệm thu\n- **Nói dễ hiểu:** Danh sách các yêu cầu cụ thể và có thể đo lường được dùng để kết luận một tính năng đã hoàn thành đạt chuẩn hay chưa.\n- **Ví dụ:** \"Hệ thống phải tự động từ chối mã giảm giá đã hết hạn và thông báo lỗi rõ ràng bằng tiếng Việt cho người dùng\".\n- **Đừng nhầm:** Việc \"đã gõ xong code và push\" chưa chứng minh tính năng hoàn tất; tính năng chỉ xong khi thỏa mãn 100% tiêu chí nghiệm thu.\n\n### self-review — tự rà soát mã nguồn\n- **Nói dễ hiểu:** Thói quen tự đọc lại từng dòng thay đổi trên giao diện diff trước khi gửi lời mời đồng nghiệp vào review.\n- **Ví dụ:** Mở tab Files changed trên PR của chính mình để kiểm tra xem có vô tình để quên mã khóa bí mật (API key) hay tệp rác không.\n- **Đừng nhầm:** Tự rà soát là bước sàng lọc sơ bộ của tác giả; nó không thể thay thế cho vòng kiểm duyệt độc lập từ đồng nghiệp khác.\n\n---\n\n## 📖 Định nghĩa\nThử thách dự án nhóm Team Project Challenge là bài sát hạch thực chiến toàn diện khép lại Level 4: GitHub Collaboration, đặt bạn vào vai trò một kỹ sư phần mềm thực thụ trong môi trường doanh nghiệp để hoàn thành trọn vẹn chu trình cộng tác: từ tiếp nhận Issue, phát triển nhánh tính năng, tự phản biện mã nguồn đến mở PR và giải quyết xung đột hợp nhất.\n\n---\n\n## 🤔 Tại sao cần?\nLập trình phần mềm hiện đại là một bộ môn thể thao đồng đội đỉnh cao. Dù bạn có thể gõ ra những thuật toán xuất sắc trên máy tính cá nhân, bạn vẫn không thể làm việc tại các tập đoàn công nghệ nếu thiếu kỹ năng phối hợp mượt mà trên GitHub. Bài thử thách này biến toàn bộ lý thuyết thành phản xạ nghề nghiệp tự nhiên, chuẩn bị hành trang vững chắc cho bạn bước vào các dự án thực tế.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung thử thách này như một trận thi đấu bóng đá tập dượt nội bộ trước thềm giải vô địch. Bạn không còn tập sút bóng một mình vào khung thành trống. Bạn phải phối hợp chuyền bóng ăn ý với đồng đội (pull code), nhận bóng ở tư thế thuận lợi (tách nhánh riêng), lừa bóng qua hậu vệ (xử lý xung đột) và tung cú sút quyết định ghi bàn ấn định thắng lợi (Merge PR).\n\n---\n\n## 🖼 Sơ đồ\n```text\nCHU TRÌNH THỰC CHIẾN THỬ THÁCH TEAM PROJECT:\n\n[Issue: Tính năng giảm giá coupon] ──► [Kéo code main mới nhất]\n                                               │\n                                               ▼\n[Tự rà soát diff & Mở PR] ◄── [Commit tính năng] ◄── [Tách nhánh feat/coupon]\n          │\n          ▼\n[Vòng phản biện Code Review] ──► [Bổ sung bản vá] ──► [Squash & Merge vào main]\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKỹ sư nhận Issue `#201: Thêm tính năng áp dụng mã giảm giá cho giỏ hàng`. Kỹ sư kéo mã mới nhất từ `main`, tạo nhánh `feat/coupon-system`, lập trình các hàm tính chiết khấu và tự rà soát diff. Khi mở PR, đồng nghiệp review phát hiện thiếu trường hợp xử lý mã giảm giá hết hạn. Kỹ sư tiếp thu, bổ sung commit sửa lỗi, nhận được Approve và tiến hành squash-merge vào nhánh chính an toàn.\n\n---\n\n## 💻 Command\n```bash\ngit switch main\ngit pull origin main\ngit switch -c feat/coupon-system\ngit push -u origin feat/coupon-system\ngit branch -d feat/coupon-system\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch main && git pull origin main`: Bắt đầu từ nền tảng mã nguồn mới nhất và ổn định nhất của dự án chung.\n- `git switch -c feat/coupon-system`: Tách nhánh biệt lập phát triển trọn vẹn nghiệp vụ mã giảm giá của bài thử thách.\n- `git push -u origin feat/coupon-system`: Xuất bản nhánh lên GitHub và thiết lập tracking để chuẩn bị khởi tạo PR.\n- `git branch -d feat/coupon-system`: Xóa nhánh tính năng sau khi đã hoàn tất tích hợp thành công vào nhánh chính.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Tự ý bấm merge PR khi chưa có bất kỳ lượt Approve nào**: Vi phạm nghiêm trọng kỷ luật làm việc nhóm và văn hóa kỹ thuật.\n2. **Không đọc kỹ bộ tiêu chí nghiệm thu (Acceptance Criteria)**: Dẫn đến việc viết tính năng sai lệch nghiệp vụ và phải đập đi xây lại.\n3. **Quên kéo cập nhật `main` về máy sau khi kết thúc PR**: Khiến các nhánh tính năng tiếp theo bị xuất phát từ mốc lịch sử cũ đã lạc hậu.\n\n---\n\n## 🧪 Lab\n1. Mở một Issue mô phỏng với yêu cầu: \"Cập nhật tài liệu hướng dẫn áp dụng mã giảm giá vào tệp README.md\".\n2. Tách nhánh mới từ main: `git switch -c feat/coupon-docs`.\n3. Mở tệp `README.md`, bổ sung mục \"Hướng dẫn sử dụng mã giảm giá\" kèm ví dụ cụ thể.\n4. Chạy `git diff` để tự rà soát (self-review) kiểm tra từng dòng thay đổi.\n5. Commit với thông điệp chuẩn: `git commit -am \"docs: add coupon usage guide (#201)\"`.\n6. Mở PR trên GitHub với từ khóa `Closes #201`, đóng vai Reviewer để kiểm tra và tiến hành merge.\n\n---\n\n## 💡 Hint\n> Bí quyết vàng để trở thành một kỹ sư được mọi đồng nghiệp yêu mến: Hãy luôn tự review kỹ lưỡng mã nguồn của mình trước khi gửi đi. Loại bỏ hết các dòng trống thừa, tệp rác và mã thử nghiệm trước khi mở PR sẽ giúp đồng nghiệp tiết kiệm rất nhiều công sức!\n\n---\n\n## ✅ Validation\n- Hoàn thành trọn vẹn chu trình Feature Branch Workflow từ khâu tiếp nhận Issue đến khâu hợp nhất mã nguồn.\n- Thể hiện sự tự tin và phản xạ nghề nghiệp xuất sắc khi thao tác trên môi trường GitHub.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm tổng kết toàn diện để chính thức tốt nghiệp Level 4: GitHub Collaboration!\n\n---\n\n## 🔥 Challenge\nHãy thử rủ một người bạn học cùng tạo một kho lưu trữ chung trên GitHub, cấu hình Branch Protection Rule yêu cầu tối thiểu 1 Reviewer Approve và cùng thực hiện quy trình mở PR, review chéo cho nhau để trải nghiệm cảm giác làm việc thực thụ tại các công ty công nghệ lớn!\n\n---\n\n## 📚 Tổng kết\n- Bạn đã làm chủ toàn bộ các công cụ cộng tác nhóm hiện đại: Remote, Clone, Fetch, Pull, Push, Tracking.\n- Bạn thấu hiểu bản chất cơ chế Fork, mô hình Upstream và quy trình Pull Request.\n- Bạn đã sẵn sàng tự tin hòa nhập vào bất kỳ đội ngũ kỹ thuật phần mềm chuyên nghiệp nào!\n",
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
