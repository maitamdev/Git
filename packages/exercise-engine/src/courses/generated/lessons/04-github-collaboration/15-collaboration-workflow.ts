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
  "content": "# Quy trình cộng tác nhóm tiêu chuẩn (Feature Branch Workflow)\n\n---\n\n## 🎯 Mục tiêu\n- Thấu suốt chu trình vận hành chuẩn mực của Feature Branch Workflow trong các doanh nghiệp công nghệ hàng đầu.\n- Nắm vững 7 bước từ nhận Issue, tách nhánh, lập trình, commit, mở PR đến review và merge vào nhánh chính.\n- Hiểu rõ vai trò của luật bảo vệ nhánh (Protected Branch Rules) trong việc ngăn chặn đẩy code trực tiếp lên `main`.\n- Rèn luyện kỹ năng tự bảo vệ bản thân và đội ngũ khỏi cạm bẫy ác mộng xung đột mã nguồn (Merge Hell).\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### feature branch workflow — luồng nhánh tính năng\n- **Nói dễ hiểu:** Quy trình làm việc bắt buộc mọi tính năng hay bản sửa lỗi đều phải được viết trên một nhánh riêng rẽ.\n- **Ví dụ:** Tạo nhánh `feat/biometric-login` để làm tính năng vân tay, không bao giờ sửa thẳng trên nhánh `main`.\n- **Đừng nhầm:** Đây là quy trình tiêu chuẩn của ngành; nhánh `main` luôn được giữ ổn định và sẵn sàng triển khai lên Production bất cứ lúc nào.\n\n### protected branch — nhánh được bảo vệ\n- **Nói dễ hiểu:** Nhánh chính (thường là `main`) được thiết lập luật bảo vệ trên GitHub để cấm tuyệt đối hành vi push trực tiếp.\n- **Ví dụ:** Lập trình viên cố tình gõ `git push origin main` sẽ bị GitHub từ chối và yêu cầu phải tạo Pull Request.\n- **Đừng nhầm:** Luật bảo vệ nhánh không có sẵn mặc định trong Git trên máy tính; bạn phải kích hoạt trong phần cài đặt của GitHub.\n\n### merge hell — ác mộng xung đột\n- **Nói dễ hiểu:** Tình cảnh tồi tệ khi một nhánh tính năng bị giữ quá lâu (vài tuần đến vài tháng) mà không đồng bộ với nhánh chính.\n- **Ví dụ:** Nhánh của bạn bị tụt lại 300 commit so với `main`, khi gộp lại sẽ phát sinh hàng trăm xung đột mã nguồn nan giải.\n- **Đừng nhầm:** Bạn có thể phòng tránh hoàn toàn bằng cách chia nhỏ tính năng, mở PR sớm và định kỳ kéo code mới nhất từ `main` về nhánh mình.\n\n---\n\n## 📖 Định nghĩa\nFeature Branch Workflow là quy trình cộng tác tiêu chuẩn hàng đầu trong ngành công nghiệp phần mềm, nơi mọi tính năng mới, bản sửa lỗi hay thử nghiệm kỹ thuật đều bắt buộc phải được phát triển độc lập trên một nhánh tính năng riêng biệt (feature branch) và chỉ được hợp nhất vào nhánh chính thông qua một Pull Request đã được kiểm duyệt nghiêm ngặt.\n\n---\n\n## 🤔 Tại sao cần?\nKhi hàng chục kỹ sư cùng làm việc trên một sản phẩm, việc tách biệt các luồng thay đổi là điều kiện tiên quyết để tồn tại. Feature Branch Workflow cô lập hoàn toàn môi trường làm việc của từng thành viên: bạn thoải mái thử nghiệm mà không sợ làm hỏng nhánh chính, đồng thời tạo ra một điểm chặn tự nhiên cho kiểm thử tự động và phản biện mã nguồn trước khi tích hợp.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung một dàn nhạc giao hưởng lớn đang biểu diễn trực tiếp trên sân khấu nhà hát (nhánh main). Không một nhạc công nào được phép đem một giai điệu vừa ngẫu hứng nghĩ ra để chơi thử trước mặt khán giả. Từng nghệ sĩ phải vào phòng tập cách âm riêng (Feature Branch), luyện tập nhuần nhuyễn rồi biểu diễn cho nhạc trưởng duyệt (Review PR) trước khi hòa vào bản hòa tấu chính.\n\n---\n\n## 🖼 Sơ đồ\n```text\nBẢY BƯỚC KHÉP KÍN CỦA FEATURE BRANCH WORKFLOW:\n\n[1. Nhận Issue] ──► [2. git pull main] ──► [3. git switch -c feat/xyz]\n                                                         │\n                                                         ▼\n[6. Review & Merge PR] ◄── [5. Push & Mở PR] ◄── [4. Code & Commit]\n         │\n         ▼\n[7. Xóa nhánh & Cập nhật local main]\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTại một công ty công nghệ tài chính, mỗi sáng kỹ sư nhận một đầu việc trên Jira hoặc GitHub Issues, cập nhật nhánh chính bằng `git pull origin main`, tạo nhánh mới `feat/biometric-auth`, viết mã và kiểm thử cẩn thận. Khi hoàn thành, kỹ sư đẩy nhánh lên mở PR. Sau khi hai chuyên gia bảo mật phê duyệt và pipeline CI kiểm thử thành công, tính năng mới được hòa vào nhánh chính một cách an toàn tuyệt đối.\n\n---\n\n## 💻 Command\n```bash\ngit switch main\ngit pull origin main\ngit switch -c feat/user-profile\ngit push -u origin feat/user-profile\ngit branch -d feat/user-profile\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch main && git pull origin main`: Luôn xuất phát từ mốc mới nhất và ổn định nhất của nhánh main trước khi bắt tay làm việc mới.\n- `git switch -c feat/user-profile`: Tạo và chuyển ngay sang nhánh tính năng biệt lập để bảo vệ nhánh chính.\n- `git push -u origin feat/user-profile`: Xuất bản nhánh lên GitHub và thiết lập tracking để chuẩn bị tạo Pull Request.\n- `git branch -d feat/user-profile`: Dọn dẹp vệ sinh kho cục bộ sau khi tính năng đã được gộp thành công trên GitHub.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Tiện tay commit và đẩy code thẳng lên nhánh `main`**: Vi phạm kỷ luật dự án và dễ làm gãy hệ thống đang chạy của khách hàng.\n2. **Tách nhánh mới từ một nhánh tính năng dở dang khác**: Làm lây lan các lỗi chưa qua kiểm duyệt sang tính năng mới.\n3. **Giữ nhánh tính năng sống quá lâu mà không đồng bộ**: Dẫn đến thảm họa Merge Hell với xung đột khổng lồ không thể kiểm soát.\n\n---\n\n## 🧪 Lab\n1. Đảm bảo bạn đang đứng ở nhánh chính và đồng bộ: `git switch main` rồi `git pull origin main`.\n2. Tạo nhánh tính năng mới theo quy ước: `git switch -c feat/order-tracking`.\n3. Tạo một commit giả lập: `git commit --allow-empty -m \"feat: add order tracking service\"`.\n4. Đẩy nhánh lên GitHub: `git push -u origin feat/order-tracking`.\n5. Mở PR trên GitHub, mô tả tính năng, mời đồng nghiệp vào review và hoàn tất gộp mã nguồn.\n\n---\n\n## 💡 Hint\n> Hãy chia nhỏ bài toán thành các PR gọn gàng (dưới 300 dòng code). PR càng nhỏ thì đồng đội review càng nhanh, lỗi càng ít và tốc độ đưa sản phẩm ra thị trường càng vượt trội!\n\n---\n\n## ✅ Validation\n- Thuộc nằm lòng chuỗi 7 bước của quy trình Feature Branch Workflow.\n- Giải thích được nguyên nhân sâu xa của Merge Hell và biện pháp phòng ngừa triệt để.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để đánh giá sự thấu hiểu về chu trình Feature Branch Workflow tiêu chuẩn.\n\n---\n\n## 🔥 Challenge\nHãy so sánh Feature Branch Workflow với Trunk-Based Development. Trong những điều kiện nào thì các công ty công nghệ lớn như Google hay Meta lại khuyến khích chuyển từ Feature Branch Workflow sang Trunk-Based Development?\n\n---\n\n## 📚 Tổng kết\n- Mọi thay đổi đều phải được thực hiện trên nhánh tính năng riêng biệt.\n- Nhánh chính `main` luôn được bảo vệ nghiêm ngặt bằng quy tắc Branch Protection.\n- Luôn cập nhật thường xuyên từ `main` để triệt tiêu hoàn toàn nguy cơ Merge Hell.\n",
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
