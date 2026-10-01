import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "15-collaboration-workflow",
  "moduleId": "04-github-collaboration",
  "metadata": {
    "id": "15-collaboration-workflow",
    "title": "Quy trình cộng tác nhóm tiêu chuẩn (Feature Branch Workflow)",
    "level": "intermediate",
    "duration": 35,
    "xp": 110,
    "prerequisites": [
      "13-merge-pull-request"
    ],
    "objectives": [
      "Thực hiện các bước phổ biến của Feature Branch Workflow.",
      "Xác định nhánh đích và quy định review theo tài liệu repository.",
      "Tạo nhánh, commit thay đổi, push và mô tả PR thử nghiệm."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "collaboration workflow",
      "feature branch workflow",
      "quy trinh nhom",
      "teamwork git",
      "github flow"
    ],
    "commands": [
      "git switch -c feat/<tên-tính-năng>",
      "git push -u origin feat/<tên-tính-năng>"
    ]
  },
  "content": "# Quy trình cộng tác nhóm tiêu chuẩn (Feature Branch Workflow)\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu một quy trình cộng tác phổ biến: Feature Branch Workflow.\n- Thực hiện các bước từ nhận nhiệm vụ, tạo nhánh, commit, mở PR đến review và tích hợp.\n- Biết nhóm có thể quy định nhánh đích, review và cách tích hợp khác nhau.\n- Tự tin tham gia vào các dự án phần mềm chuyên nghiệp quy mô vừa và lớn.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### feature branch workflow\n- **Nói dễ hiểu**: Cách làm trong đó mỗi nhiệm vụ được phát triển trên nhánh riêng rồi đưa ra review trước khi tích hợp.\n- **Ví dụ**: Tạo nhánh `feat/biometric-login` rồi mở PR vào nhánh đích do nhóm chọn.\n- **Đừng nhầm**: Đây là một quy trình phổ biến, không phải yêu cầu bắt buộc của Git hay phù hợp với mọi nhóm.\n\n### protected default branch — nhánh mặc định được bảo vệ\n- **Nói dễ hiểu**: Nhánh đích có thể được cấu hình để yêu cầu review, kiểm tra hoặc giới hạn push.\n- **Ví dụ**: Nhóm cấu hình `main` phải có một lượt review trước khi merge PR.\n- **Đừng nhầm**: Git không tự bảo vệ `main`; repository phải được cấu hình. Một số nhóm dùng trunk-based development và tích hợp thay đổi nhỏ thường xuyên.\n\n### merge hell\n- **Nói dễ hiểu**: Cơn ác mộng xung đột khi giữ một nhánh tính năng quá lâu hàng tháng trời mà không đồng bộ với nhánh chính.\n- **Ví dụ**: Nhánh của bạn bị tụt lại 200 commit so với main, khi gộp sẽ phát sinh hàng chục file xung đột phức tạp.\n- **Đừng nhầm**: Có thể tránh hoàn toàn bằng cách chia nhỏ tính năng, mở PR sớm và định kỳ rebase/pull từ main về nhánh.\n\n---\n\n## 📖 Định nghĩa\nFeature Branch Workflow là một cách cộng tác: mỗi nhiệm vụ có nhánh riêng, sau đó mở PR để review và tích hợp. Đây là quy trình phổ biến, không phải quy định bắt buộc của Git; nhóm có thể dùng trunk-based development hoặc cách khác. Nhánh mặc định chỉ được bảo vệ nếu repository cấu hình như vậy.\n\n---\n\n## 💡 Tại sao cần\nNhánh riêng giúp tách biệt thay đổi và tạo điểm review trước khi tích hợp. Một số nhóm dùng quy trình khác, chẳng hạn trunk-based development; hãy đọc hướng dẫn của repository trước khi chọn cách làm.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung một dàn nhạc giao hưởng đang biểu diễn trên sân khấu (nhánh main). Không nhạc công nào được tự ý đem một đoạn nhạc vừa nghĩ ra chơi thử ngay trước mặt khán giả. Từng nghệ sĩ phải vào phòng tập cách âm riêng (Feature Branch), luyện tập nhuần nhuyễn rồi trình diễn cho nhạc trưởng duyệt (Review PR) trước khi hòa vào bản nhạc chính.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nChuỗi 7 bước chuẩn mực của Feature Branch Workflow:\n[1. Nhận Issue] ──► [2. git pull main] ──► [3. git switch -c feat/xyz]\n                                                         │\n                                                         ▼\n[6. Review & Merge PR] ◄── [5. Push & Mở PR] ◄── [4. Code & Commit]\n         │\n         ▼\n[7. Xóa nhánh & Cập nhật local main]\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nĐội ngũ phát triển ứng dụng ngân hàng vận hành theo Feature Branch Workflow. Mỗi sáng, lập trình viên nhận một Issue, cập nhật `git pull origin main`, tạo nhánh `feat/biometric-login`, viết code và kiểm thử tự động. Khi hoàn thành, bạn đẩy nhánh lên GitHub, mở PR kèm checklist an ninh. Hai senior kiểm tra và phê duyệt trước khi squash-merge vào main an toàn.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit switch main\ngit pull origin main\ngit switch -c feat/<tên-tính-năng>\ngit push -u origin feat/<tên-tính-năng>\ngit branch -d feat/<tên-tính-năng>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch main && git pull origin main`: Luôn xuất phát từ mốc mới nhất và ổn định nhất của nhánh main.\n- `git switch -c feat/<tên>`: Tách nhánh làm việc hoàn toàn cách ly cho tính năng mới.\n- `git push -u origin feat/<tên>`: Đưa nhánh lên GitHub để kích hoạt môi trường làm việc nhóm và PR.\n- `git branch -d feat/<tên>`: Dọn dẹp vệ sinh kho chứa sau khi tính năng đã được tích hợp thành công.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Tiện tay commit thẳng lên nhánh main**: Vi phạm nguyên tắc bảo vệ nhánh chính và dễ làm gián đoạn bản phát hành chung.\n2. **Tách nhánh từ một nhánh tính năng dở dang khác**: Làm dây chuyền các lỗi chưa kiểm chứng sang nhánh mới thay vì xuất phát từ main chuẩn.\n3. **Giữ nhánh tính năng quá lâu nhiều tuần không merge**: Gây ra tình trạng Merge Hell với hàng loạt xung đột mã nguồn nan giải.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thực hành chu trình 7 bước từ tạo nhánh đến merge PR.\n1. Đọc hướng dẫn repository để xác định nhánh đích và cách cập nhật; đừng mặc định tên nhánh là `main`.\n2. Trong kho thử nghiệm có remote, chuyển sang nhánh đích và cập nhật theo hướng dẫn dự án.\n3. Tạo nhánh `feat/user-profile`, sửa một file nhỏ, rồi add và commit.\n4. Push nhánh lên remote bạn có quyền ghi. Mở PR thử nghiệm, kiểm tra base/compare, xem diff và viết mô tả.\n5. Nếu có reviewer, xử lý góp ý; chỉ merge PR thử nghiệm khi có quyền. Trong simulator, push chỉ cập nhật remote giả lập; có thể hoàn thành bằng cách viết mô tả PR và tự review diff.\n\n---\n\n## 💡 Hint & mẹo\n> Đọc quy định của repository để biết nhánh mặc định có được bảo vệ và cần review trước khi tích hợp hay không.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Tạo được nhánh nhiệm vụ, commit có nội dung rõ và kiểm tra được diff.\n- Mô tả được quy trình PR theo cấu hình của repository mình đang dùng.\n\n---\n\n## ❓ Quiz nhanh\nHãy hoàn thành các câu hỏi trắc nghiệm dưới đây để kiểm tra hiểu biết về Feature Branch Workflow.\n\n---\n\n## 🚀 Thử thách nâng cao\nTìm hiểu sự khác biệt giữa Feature Branch Workflow tinh gọn và mô hình Git Flow truyền thống có các nhánh dài hạn như `develop` và `release`.\n\n---\n\n## 📝 Tổng kết\n- Feature Branch Workflow là một trong nhiều quy trình cộng tác.\n- Nhánh đích, review và quyền push do nhóm/repository quy định.\n- Luồng phổ biến: nhận việc -> thay đổi -> commit -> chia sẻ -> review -> tích hợp.\n",
  "quiz": {
    "id": "quiz-04-15-collaboration-workflow",
    "title": "Trắc nghiệm: Feature Branch Workflow",
    "questions": [
      {
        "id": "q1",
        "question": "Trong Feature Branch Workflow, nhóm thường làm gì trước khi tích hợp thay đổi?",
        "type": "single",
        "options": [
          {
            "text": "Làm thay đổi trên nhánh riêng rồi mở Pull Request theo quy định của repository",
            "correct": true
          },
          {
            "text": "Mọi lập trình viên đều phải dùng chung một máy tính",
            "correct": false
          },
          {
            "text": "Không được phép tạo quá 2 nhánh trong suốt vòng đời dự án",
            "correct": false
          },
          {
            "text": "Chỉ được phép merge code vào ban đêm",
            "correct": false
          }
        ],
        "explanation": "Nhánh riêng giúp tách thay đổi để xem xét; nhóm và cài đặt repository quy định cách tích hợp."
      },
      {
        "id": "q2",
        "question": "Trước khi tạo nhánh cho tính năng mới, bạn nên làm gì?",
        "type": "single",
        "options": [
          {
            "text": "Đọc hướng dẫn repository, xác định nhánh đích và cập nhật từ đó theo quy trình của nhóm",
            "correct": true
          },
          {
            "text": "Khởi tạo lại toàn bộ kho chứa bằng git init",
            "correct": false
          },
          {
            "text": "Xóa toàn bộ các tệp tin trong thư mục dự án",
            "correct": false
          },
          {
            "text": "Tắt kết nối mạng Internet",
            "correct": false
          }
        ],
        "explanation": "Nhánh nền và cách cập nhật phụ thuộc cấu hình dự án; kiểm tra hướng dẫn để bắt đầu đúng chỗ."
      },
      {
        "id": "q3",
        "question": "Tiền tố quy ước nào thường được sử dụng khi đặt tên nhánh cho các tác vụ sửa lỗi khẩn cấp?",
        "type": "single",
        "options": [
          {
            "text": "fix/ hoặc bugfix/ (ví dụ: fix/login-error)",
            "correct": true
          },
          {
            "text": "temp/ hoặc nhap/",
            "correct": false
          },
          {
            "text": "delete/ hoặc remove/",
            "correct": false
          },
          {
            "text": "admin/ hoặc root/",
            "correct": false
          }
        ],
        "explanation": "Quy ước đặt tên chuẩn: `feat/` cho tính năng mới, `fix/` cho sửa lỗi, `docs/` cho tài liệu, `refactor/` cho tái cấu trúc."
      },
      {
        "id": "q4",
        "question": "Hiện tượng \"Merge Hell\" (Địa ngục hợp nhất) thường xảy ra do nguyên nhân nào trong quy trình làm việc nhóm?",
        "type": "single",
        "options": [
          {
            "text": "Do một nhánh tính năng bị cô lập và kéo dài quá nhiều tuần/tháng mà không thường xuyên đồng bộ code mới từ main về",
            "correct": true
          },
          {
            "text": "Do dung lượng ổ cứng máy tính bị đầy",
            "correct": false
          },
          {
            "text": "Do sử dụng trình soạn thảo VS Code thay vì Notepad",
            "correct": false
          },
          {
            "text": "Do đặt tên nhánh bằng tiếng Anh",
            "correct": false
          }
        ],
        "explanation": "Nhánh sống quá lâu (Long-lived branches) sẽ bị phân kỳ quá xa so với main, tích tụ hàng trăm xung đột nan giải."
      },
      {
        "id": "q5",
        "question": "Sau khi Pull Request được merge thành công vào nhánh main trên GitHub, bước dọn dẹp vệ sinh kho chứa là gì?",
        "type": "single",
        "options": [
          {
            "text": "Xóa nhánh tính năng khi không còn cần dùng, theo quyền và quy trình của repository",
            "correct": true
          },
          {
            "text": "Xóa nhánh main để làm lại từ đầu",
            "correct": false
          },
          {
            "text": "Đổi tên tài khoản GitHub của bạn",
            "correct": false
          },
          {
            "text": "Khóa toàn bộ dự án lại không cho ai truy cập",
            "correct": false
          }
        ],
        "explanation": "Nhánh đã tích hợp có thể được dọn khi không còn cần dùng; việc xóa không bắt buộc trong mọi quy trình."
      },
      {
        "id": "q6",
        "question": "Lợi ích lớn nhất mà Feature Branch Workflow mang lại cho các doanh nghiệp phần mềm là gì?",
        "type": "single",
        "options": [
          {
            "text": "Tách biệt thay đổi và tạo chỗ để review trước khi nhóm quyết định tích hợp",
            "correct": true
          },
          {
            "text": "Giúp lập trình viên không bao giờ cần phải viết kiểm thử tự động",
            "correct": false
          },
          {
            "text": "Tự động tăng gấp đôi tốc độ xử lý của chip CPU",
            "correct": false
          },
          {
            "text": "Miễn phí toàn bộ chi phí thuê máy chủ",
            "correct": false
          }
        ],
        "explanation": "Nhánh riêng và review tạo bước kiểm tra trước tích hợp nhưng không tự bảo đảm phần mềm không có lỗi."
      }
    ]
  }
};
export default lesson;
