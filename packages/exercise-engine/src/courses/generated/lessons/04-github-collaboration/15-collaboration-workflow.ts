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
  "content": "# Quy trình cộng tác nhóm tiêu chuẩn (Feature Branch Workflow)\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững toàn bộ bức tranh quy trình cộng tác nhóm chuẩn mực quốc tế: Feature Branch Workflow.\n- Tuân thủ nghiêm ngặt quy tắc vàng: Tuyệt đối không bao giờ commit hay push trực tiếp vào nhánh `main`.\n- Vận hành trơn tru chuỗi 7 bước từ nhận nhiệm vụ, tạo nhánh, lập trình, tạo PR, review cho đến khi xuất bản tính năng.\n- Tự tin tham gia vào các dự án phần mềm chuyên nghiệp quy mô vừa và lớn.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### feature branch workflow\n- **Nói dễ hiểu**: Quy trình làm việc nhóm quy định mọi tính năng hoặc bản sửa lỗi đều phải làm trên nhánh riêng, không đụng vào nhánh chính.\n- **Ví dụ**: Tạo nhánh `feat/biometric-login` để code rồi mở PR xin gộp vào `main`.\n- **Đừng nhầm**: Không phải quy trình chỉ dùng cho dự án lớn; dự án 2 người cũng nên áp dụng để tránh ghi đè code của nhau.\n\n### production-ready main\n- **Nói dễ hiểu**: Nguyên tắc giữ nhánh `main` luôn ở trạng thái sạch sẽ, hoàn thiện và sẵn sàng phát hành cho khách hàng bất cứ lúc nào.\n- **Ví dụ**: Không bao giờ commit code thử nghiệm hay code đang bị lỗi dở dang vào nhánh main.\n- **Đừng nhầm**: Không có nghĩa là main không bao giờ thay đổi; main chỉ nhận code hoàn chỉnh qua Pull Request đã duyệt.\n\n### merge hell\n- **Nói dễ hiểu**: Cơn ác mộng xung đột khi giữ một nhánh tính năng quá lâu hàng tháng trời mà không đồng bộ với nhánh chính.\n- **Ví dụ**: Nhánh của bạn bị tụt lại 200 commit so với main, khi gộp sẽ phát sinh hàng chục file xung đột phức tạp.\n- **Đừng nhầm**: Có thể tránh hoàn toàn bằng cách chia nhỏ tính năng, mở PR sớm và định kỳ rebase/pull từ main về nhánh.\n\n---\n\n## 📖 Định nghĩa\nFeature Branch Workflow là quy trình cộng tác phát triển chuẩn mực trong ngành phần mềm. Quy tắc cốt lõi: Nhánh chính (`main`) được bảo vệ nghiêm ngặt và luôn ở trạng thái sẵn sàng phát hành; mọi tính năng mới hay bản vá lỗi đều phải thực hiện trên một nhánh tính năng riêng biệt và chỉ được gộp qua Pull Request đã qua kiểm duyệt.\n\n---\n\n## 💡 Tại sao cần\nKhi làm việc trong nhóm nhiều kỹ sư, việc thiếu quy trình chuẩn hóa sẽ dẫn đến thảm họa: code bị ghi đè lẫn nhau, hệ thống liên tục sập và xung đột triền miên. Feature Branch Workflow mang lại sự an toàn, phân định trách nhiệm rõ ràng và giúp nhóm bàn giao tính năng liên tục với chất lượng cao.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung một dàn nhạc giao hưởng đang biểu diễn trên sân khấu (nhánh main). Không nhạc công nào được tự ý đem một đoạn nhạc vừa nghĩ ra chơi thử ngay trước mặt khán giả. Từng nghệ sĩ phải vào phòng tập cách âm riêng (Feature Branch), luyện tập nhuần nhuyễn rồi trình diễn cho nhạc trưởng duyệt (Review PR) trước khi hòa vào bản nhạc chính.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nChuỗi 7 bước chuẩn mực của Feature Branch Workflow:\n[1. Nhận Issue] ──► [2. git pull main] ──► [3. git switch -c feat/xyz]\n                                                         │\n                                                         ▼\n[6. Review & Merge PR] ◄── [5. Push & Mở PR] ◄── [4. Code & Commit]\n         │\n         ▼\n[7. Xóa nhánh & Cập nhật local main]\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nĐội ngũ phát triển ứng dụng ngân hàng vận hành theo Feature Branch Workflow. Mỗi sáng, lập trình viên nhận một Issue, cập nhật `git pull origin main`, tạo nhánh `feat/biometric-login`, viết code và kiểm thử tự động. Khi hoàn thành, bạn đẩy nhánh lên GitHub, mở PR kèm checklist an ninh. Hai senior kiểm tra và phê duyệt trước khi squash-merge vào main an toàn.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit switch main\ngit pull origin main\ngit switch -c feat/<tên-tính-năng>\ngit push -u origin feat/<tên-tính-năng>\ngit branch -d feat/<tên-tính-năng>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch main && git pull origin main`: Luôn xuất phát từ mốc mới nhất và ổn định nhất của nhánh main.\n- `git switch -c feat/<tên>`: Tách nhánh làm việc hoàn toàn cách ly cho tính năng mới.\n- `git push -u origin feat/<tên>`: Đưa nhánh lên GitHub để kích hoạt môi trường làm việc nhóm và PR.\n- `git branch -d feat/<tên>`: Dọn dẹp vệ sinh kho chứa sau khi tính năng đã được tích hợp thành công.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Tiện tay commit thẳng lên nhánh main**: Vi phạm nguyên tắc bảo vệ nhánh chính và dễ làm gián đoạn bản phát hành chung.\n2. **Tách nhánh từ một nhánh tính năng dở dang khác**: Làm dây chuyền các lỗi chưa kiểm chứng sang nhánh mới thay vì xuất phát từ main chuẩn.\n3. **Giữ nhánh tính năng quá lâu nhiều tuần không merge**: Gây ra tình trạng Merge Hell với hàng loạt xung đột mã nguồn nan giải.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thực hành chu trình 7 bước từ tạo nhánh đến merge PR.\n1. Chuyển về nhánh `main` và kéo code mới nhất bằng `git pull origin main`.\n2. Tạo nhánh tính năng chuẩn quy ước `feat/user-profile` bằng `git switch -c feat/user-profile`.\n3. Thực hiện một số commit có thông điệp chuẩn mực trên nhánh này.\n4. Đẩy lên GitHub, tạo PR, giả lập quá trình review và merge thành công.\n\n---\n\n## 💡 Hint & mẹo\n> Nhớ câu khẩu quyết: Nhánh main luôn luôn sạch sẽ, ổn định và có thể release bất cứ lúc nào.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Vận hành thành thạo toàn bộ chu kỳ 7 bước của Feature Branch Workflow.\n- Nhánh main trên cả máy và GitHub không có bất kỳ commit nháp trực tiếp nào.\n\n---\n\n## ❓ Quiz nhanh\nHãy hoàn thành các câu hỏi trắc nghiệm dưới đây để kiểm tra hiểu biết về Feature Branch Workflow.\n\n---\n\n## 🚀 Thử thách nâng cao\nTìm hiểu sự khác biệt giữa Feature Branch Workflow tinh gọn và mô hình Git Flow truyền thống có các nhánh dài hạn như `develop` và `release`.\n\n---\n\n## 📝 Tổng kết\n- Feature Branch Workflow là tiêu chuẩn vàng của cộng tác nhóm hiện đại.\n- Nhánh main luôn bất biến và ổn định; mọi tính năng đều nằm trên nhánh riêng.\n- Quy trình 7 bước: Nhận việc -> Tách nhánh -> Code -> Push -> PR -> Review -> Merge.\n",
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
