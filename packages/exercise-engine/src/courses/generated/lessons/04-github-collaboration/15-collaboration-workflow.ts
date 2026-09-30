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
      "Nắm vững toàn bộ bức tranh quy trình cộng tác nhóm chuẩn mực quốc tế: Feature Branch Workflow.",
      "Tuân thủ nghiêm ngặt quy tắc vàng: Tuyệt đối không bao giờ commit hay push trực tiếp vào nhánh `main`.",
      "Vận hành trơn tru chuỗi 7 bước từ nhận nhiệm vụ, tạo nhánh, lập trình, tạo PR, review cho đến khi xuất bản tính năng.",
      "Tự tin tham gia vào các dự án phần mềm chuyên nghiệp quy mô vừa và lớn."
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
      "git switch main",
      "git pull origin main",
      "git switch -c feat/<tên-tính-năng>",
      "git push -u origin feat/<tên-tính-năng>",
      "git branch -d feat/<tên-tính-năng>"
    ]
  },
  "content": "# Quy trình cộng tác nhóm tiêu chuẩn (Feature Branch Workflow)\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững toàn bộ bức tranh quy trình cộng tác nhóm chuẩn mực quốc tế: Feature Branch Workflow.\n- Tuân thủ nghiêm ngặt quy tắc vàng: Tuyệt đối không bao giờ commit hay push trực tiếp vào nhánh `main`.\n- Vận hành trơn tru chuỗi 7 bước từ nhận nhiệm vụ, tạo nhánh, lập trình, tạo PR, review cho đến khi xuất bản tính năng.\n- Tự tin tham gia vào các dự án phần mềm chuyên nghiệp quy mô vừa và lớn.\n\n---\n\n## 📖 Định nghĩa\n> Feature Branch Workflow là quy trình cộng tác phát triển phần mềm chuẩn mực và phổ biến bậc nhất trong ngành công nghệ thông tin toàn cầu. Quy tắc cốt lõi của quy trình này là: Nhánh chính (`main` hoặc `master`) được coi là thánh đường ổn định (Production-ready) và luôn trong trạng thái có thể triển khai; mọi tính năng mới, bản sửa lỗi hay thử nghiệm đều BẮT BUỘC phải được phát triển trên một nhánh riêng biệt (Feature Branch), trải qua quá trình Pull Request và Code Review kỹ lưỡng trước khi được phép hòa nhập vào nhánh chính.\n\n---\n\n## 🤔 Tại sao cần?\nKhi làm việc một mình, bạn có thể commit tùy hứng. Nhưng khi bước vào môi trường doanh nghiệp với hàng chục kỹ sư cùng làm việc trên một sản phẩm, việc thiếu một quy trình chuẩn hóa sẽ dẫn đến thảm họa: code bị ghi đè, hệ thống liên tục sập, và xung đột triền miên không hồi kết. Feature Branch Workflow mang lại sự an toàn tuyệt đối, phân định trách nhiệm minh bạch và giúp nhóm phát hành tính năng liên tục với chất lượng cao nhất.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung một dàn nhạc giao hưởng lớn đang biểu diễn trước hàng ngàn khán giả (nhánh main trên sân khấu). Không một nhạc công nào được phép tự ý mang một giai điệu mới toanh vừa nghĩ ra trong đầu lên sân khấu chơi thử ngay trước mặt khán giả. Từng nghệ sĩ phải vào phòng tập riêng cách âm (Feature Branch), luyện tập thành thục giai điệu đó, trình diễn cho nhạc trưởng duyệt (Code Review & PR). Khi nhạc trưởng gật đầu hài lòng, giai điệu mới được hòa vào bản giao hưởng chính.\n\n---\n\n## 🖼 Sơ đồ\n```text\nChuỗi 7 bước chuẩn mực của Feature Branch Workflow:\n[1. Nhận Issue] ──► [2. git pull main] ──► [3. git switch -c feat/xyz]\n                                                         │\n                                                         ▼\n[6. Review & Merge PR] ◄── [5. Push & Mở PR] ◄── [4. Code & Commit]\n         │\n         ▼\n[7. Xóa nhánh & Cập nhật local main]\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nĐội ngũ kỹ thuật gồm 10 thành viên của một ứng dụng ngân hàng vận hành nghiêm ngặt theo đúng Feature Branch Workflow tiêu chuẩn. Mỗi buổi sáng, từng lập trình viên chọn một Issue từ bảng Kanban, cập nhật mã nguồn mới nhất bằng `git pull origin main`, tạo nhánh riêng biệt mang tên `feat/biometric-login`, viết code và thực hiện kiểm thử tự động cục bộ. Khi hoàn thành, lập trình viên đẩy nhánh lên GitHub, mở PR kèm bản danh sách checklist kiểm tra an ninh bảo mật. Hai kỹ sư senior vào xem xét, phản biện và phê duyệt. PR được squash-merge vào nhánh main và hệ thống tự động triển khai mã nguồn mới lên môi trường kiểm thử mà không phát sinh bất kỳ sự cố gián đoạn nào.\n\n---\n\n## 💻 Command\n```bash\ngit switch main\ngit pull origin main\ngit switch -c feat/<tên-tính-năng>\ngit push -u origin feat/<tên-tính-năng>\ngit branch -d feat/<tên-tính-năng>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch main && git pull origin main`: Luôn xuất phát từ mốc mới nhất và ổn định nhất của nhánh main.\n- `git switch -c feat/<tên>`: Tách nhánh làm việc hoàn toàn cách ly cho tính năng mới.\n- `git push -u origin feat/<tên>`: Đưa nhánh lên GitHub để kích hoạt môi trường làm việc nhóm và PR.\n- `git branch -d feat/<tên>`: Dọn dẹp vệ sinh kho chứa sau khi tính năng đã được tích hợp thành công.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Tiện tay commit thẳng lên nhánh main**:  Vi phạm quy tắc an toàn cơ bản nhất của phát triển phần mềm.\n2. **Tạo nhánh từ một nhánh tính năng dở dang khác thay vì tách từ main**:  Làm dây chuyền các lỗi chưa kiểm chứng sang tính năng mới.\n3. **Giữ nhánh tính năng quá lâu suốt nhiều tháng không merge**:  Dẫn đến \"Merge Hell\" với hàng trăm xung đột không thể giải quyết.\n\n---\n\n## 🧪 Lab\n1. Chuyển về nhánh `main` và kéo code mới nhất bằng `git pull origin main`.\n2. Tạo nhánh tính năng chuẩn quy ước `feat/user-profile` bằng `git switch -c feat/user-profile`.\n3. Thực hiện một số commit có thông điệp chuẩn mực trên nhánh này.\n4. Đẩy lên GitHub, tạo PR, giả lập quá trình review và merge thành công.\n\n---\n\n## 💡 Hint\n> Nhớ câu thần chú: Nhánh main luôn luôn sạch sẽ, ổn định và có thể release bất cứ lúc nào.\n\n---\n\n## ✅ Validation\n- Vận hành thành thạo toàn bộ chu kỳ 7 bước của Feature Branch Workflow.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về quy trình Feature Branch Workflow.\n\n---\n\n## 🔥 Challenge\nNêu sự khác biệt giữa Feature Branch Workflow và quy trình Git Flow phức tạp có thêm nhánh develop và release.\n\n---\n\n## 📚 Tổng kết\n- Feature Branch Workflow là tiêu chuẩn vàng của cộng tác nhóm hiện đại.\n- Nhánh main luôn bất biến và ổn định; mọi tính năng đều nằm trên nhánh riêng.\n- Quy trình 7 bước: Nhận việc -> Tách nhánh -> Code -> Push -> PR -> Review -> Merge.\n",
  "quiz": {
    "id": "quiz-04-15-collaboration-workflow",
    "title": "Trắc nghiệm: Feature Branch Workflow",
    "questions": [
      {
        "id": "q1",
        "question": "Quy tắc vàng số 1 bất di bất dịch trong quy trình Feature Branch Workflow là gì?",
        "type": "single",
        "options": [
          {
            "text": "Tuyệt đối không bao giờ được phép commit hoặc push trực tiếp mã nguồn lên nhánh main",
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
        "explanation": "Nhánh main là linh hồn của sản phẩm, chỉ được phép cập nhật thông qua Pull Request đã qua kiểm duyệt."
      },
      {
        "id": "q2",
        "question": "Trước khi gõ lệnh `git switch -c feat/new-feature` để bắt đầu làm tính năng mới, thao tác BẮT BUỘC bạn phải làm là gì?",
        "type": "single",
        "options": [
          {
            "text": "Chuyển về nhánh main và chạy lệnh `git pull origin main` để bảo đảm nhánh mới được tách từ mốc code mới nhất",
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
        "explanation": "Luôn cập nhật main mới nhất trước khi tách nhánh để tránh code trên nền tảng lỗi thời dẫn đến xung đột."
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
            "text": "Xóa nhánh tính năng trên GitHub và chạy `git branch -d` xóa nhánh đó trên máy tính cá nhân",
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
        "explanation": "Dọn dẹp các nhánh đã hoàn thành giúp cây lịch sử luôn tinh gọn và tránh nhầm lẫn trong tương lai."
      },
      {
        "id": "q6",
        "question": "Lợi ích lớn nhất mà Feature Branch Workflow mang lại cho các doanh nghiệp phần mềm là gì?",
        "type": "single",
        "options": [
          {
            "text": "Bảo vệ nhánh main luôn trong trạng thái sẵn sàng xuất bản (Production-ready) và kiểm soát chất lượng chặt chẽ",
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
        "explanation": "Nhánh main luôn ổn định 100% giúp doanh nghiệp có thể triển khai sản phẩm bất cứ lúc nào khách hàng yêu cầu."
      }
    ]
  }
};
export default lesson;
