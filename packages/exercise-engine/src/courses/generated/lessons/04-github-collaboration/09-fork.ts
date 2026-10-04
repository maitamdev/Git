import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "09-fork",
  "moduleId": "04-github-collaboration",
  "metadata": {
    "id": "09-fork",
    "title": "Cơ chế Fork trên GitHub",
    "level": "intermediate",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "04-git-clone"
    ],
    "objectives": [
      "Hiểu fork tạo repository thuộc tài khoản khác dựa trên repository gốc; quyền kho gốc không đổi.",
      "Phân biệt rõ ràng giữa thao tác Fork (trên GitHub) và thao tác Clone (về máy cá nhân).",
      "Nắm bắt quy trình đóng góp mã nguồn mở kinh điển thông qua mô hình Fork & Pull Request.",
      "Quản lý và đồng bộ kho fork cá nhân với kho gốc của dự án."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "fork",
      "github fork",
      "sao chep kho",
      "dong gop ma nguon mo",
      "upstream",
      "open source"
    ],
    "commands": [
      "git clone <url-kho-fork-cua-ban>",
      "git remote -v",
      "git remote add upstream <url-kho-goc>"
    ]
  },
  "content": "# Cơ chế Fork trên GitHub\n\n---\n\n## 🎯 Mục tiêu\n- Thấu suốt bản chất cơ chế Fork trên máy chủ GitHub như một bản sao máy chủ độc lập (server-side clone).\n- Phân biệt rạch ròi giữa thao tác Fork (trên giao diện web máy chủ) và thao tác Clone (tải về máy tính cá nhân).\n- Nắm vững quy trình đóng góp mã nguồn mở kinh điển thông qua mô hình kết hợp Fork và Pull Request.\n- Nhận biết quyền hạn và các thiết lập bảo mật khi làm việc trên kho fork cá nhân.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### fork — tạo bản sao trên máy chủ\n- **Nói dễ hiểu:** Thao tác sao chép toàn bộ một kho lưu trữ của người khác sang tài khoản GitHub của chính bạn chỉ bằng một cú nhấp chuột.\n- **Ví dụ:** Bạn bấm nút \"Fork\" trên kho `facebook/react` để sở hữu một bản sao cá nhân mang tên `tai-khoan-cua-ban/react`.\n- **Đừng nhầm:** Thao tác này không cấp quyền ghi vào kho gốc; bạn chỉ có toàn quyền quản lý trên bản sao nằm dưới tài khoản của mình.\n\n### server-side clone — nhân bản phía máy chủ\n- **Nói dễ hiểu:** Quá trình sao chép kho diễn ra hoàn toàn giữa các máy chủ đám mây của GitHub mà không tải bất kỳ tệp nào về máy tính bạn.\n- **Ví dụ:** GitHub hoàn tất việc fork một dự án khổng lồ chỉ trong 3 giây nhờ cơ chế nhân bản nội bộ trên hạ tầng máy chủ của họ.\n- **Đừng nhầm:** Khác với `git clone` vốn truyền toàn bộ mã nguồn qua mạng Internet về ổ cứng máy tính cá nhân của bạn.\n\n### open source contribution — đóng góp mã nguồn mở\n- **Nói dễ hiểu:** Quy trình tham gia cống hiến nâng cấp các dự án cộng đồng bằng cách fork mã nguồn, sửa lỗi và gửi đề xuất tích hợp.\n- **Ví dụ:** Bạn phát hiện lỗi trong thư viện UI phổ biến, fork về sửa lại rồi gửi Pull Request mời đội ngũ tác giả thẩm định gộp mã.\n- **Đừng nhầm:** Bạn không cần phải có mối quan hệ quen biết hay quyền cộng tác viên chính thức để bắt đầu tham gia đóng góp.\n\n---\n\n## 📖 Định nghĩa\nFork là cơ chế nhân bản một kho lưu trữ Git từ tài khoản của người khác sang tài khoản cá nhân của bạn ngay trên máy chủ của nền tảng như GitHub, trao cho bạn quyền quản lý và chỉnh sửa toàn diện trên bản sao của mình mà không làm ảnh hưởng đến mã nguồn của dự án gốc.\n\n---\n\n## 🤔 Tại sao cần?\nTrong thế giới mã nguồn mở rộng lớn, ban quản trị dự án không thể cấp quyền ghi trực tiếp cho hàng triệu lập trình viên vì rủi ro an ninh và chất lượng. Cơ chế Fork mở ra cánh cổng dân chủ cho bất kỳ ai: bạn tự do tải bản sao về nghiên cứu, khắc phục sự cố, thử nghiệm tính năng mới rồi gửi lại đóng góp cho cộng đồng thông qua Pull Request.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung công thức phở gia truyền niêm yết trong tủ kính của một nhà hàng danh tiếng. Bạn không thể tự ý cầm bút viết đè vào công thức đó. Nhà hàng cho phép bạn chụp lại toàn bộ công thức đem về gian bếp nhà mình (Fork). Tại bếp riêng, bạn tự do nêm nếm thử nghiệm và nếu tìm ra hương vị tuyệt hảo, bạn có thể gửi thư mời bếp trưởng nếm thử.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCHU TRÌNH ĐÓNG GÓP QUA CƠ CHẾ FORK TRÊN GITHUB:\n\n[Kho gốc của tác giả: upstream] (facebook/react)\n             │\n             ▼ (Thao tác Fork trên giao diện web GitHub)\n[Kho fork cá nhân: origin] (tai-khoan-ban/react)\n             │\n             ▼ (git clone về ổ cứng máy tính)\n[Máy tính cá nhân: Local] ──► (Lập trình, commit & push lên fork cá nhân)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nLập trình viên Bình phát hiện một lỗi logic trong thư viện phân tích cú pháp JSON phổ biến trên GitHub. Do không phải nhân sự nòng cốt của dự án, Bình nhấp nút \"Fork\" để tạo bản sao `github.com/binh-dev/json-parser`. Sau đó Bình clone bản sao cá nhân này về máy tính, sửa lỗi và đẩy lên fork của mình trước khi mở đề xuất tích hợp gửi về cho nhóm tác giả ban đầu.\n\n---\n\n## 💻 Command\n```bash\ngit clone https://github.com/tai-khoan-ban/du-an-fork.git\ngit remote -v\ngit remote add upstream https://github.com/tac-gia/du-an-goc.git\n```\n\n---\n\n## 🔍 Giải thích command\n- `git clone <url-kho-fork>`: Tải mã nguồn từ kho fork thuộc tài khoản cá nhân của bạn về máy tính để lập trình.\n- `git remote -v`: Kiểm tra danh sách remote, bảo đảm `origin` đang trỏ đúng về kho fork cá nhân trên GitHub.\n- `git remote add upstream <url-kho-goc>`: Thiết lập thêm liên kết tới kho gốc của tác giả để nhận các cập nhật mới về sau.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Lầm tưởng Fork là một câu lệnh trong Git CLI**: Fork là tính năng độc quyền do các nền tảng máy chủ như GitHub hay GitLab cung cấp trên giao diện web.\n2. **Clone trực tiếp kho gốc của người khác rồi cố tình gõ `git push`**: Máy chủ sẽ chặn đứng thao tác và báo lỗi từ chối quyền truy cập (Permission denied).\n3. **Bỏ quên kho fork cá nhân không đồng bộ trong thời gian dài**: Khiến mã nguồn của bạn bị phân kỳ quá xa so với dự án chính, gây xung đột nặng nề khi tạo PR.\n\n---\n\n## 🧪 Lab\n1. Đăng nhập vào tài khoản GitHub cá nhân và tìm một dự án mã nguồn mở công khai (ví dụ kho tài liệu cộng đồng).\n2. Nhấp vào nút \"Fork\" ở góc trên bên phải màn hình để tạo bản sao dưới tài khoản của bạn.\n3. Sao chép đường dẫn URL của kho fork và mở terminal máy tính chạy lệnh: `git clone <url-kho-fork-cua-ban>`.\n4. Di chuyển vào thư mục dự án và kiểm tra bằng lệnh: `git remote -v`.\n\n---\n\n## 💡 Hint\n> Hãy luôn ghi nhớ quy trình 5 bước chuẩn mực quốc tế khi đóng góp mã nguồn mở: 1. Fork trên web -> 2. Clone về máy -> 3. Tạo nhánh và commit -> 4. Push lên fork cá nhân -> 5. Tạo Pull Request gửi về kho gốc!\n\n---\n\n## ✅ Validation\n- Nhận thức chuẩn xác rằng Fork diễn ra ở phía máy chủ đám mây GitHub.\n- Nắm vững lý do tại sao các dự án mã nguồn mở toàn cầu bắt buộc phải vận hành thông qua cơ chế Fork.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để đánh giá độ thành thạo của bạn về quy trình và bản chất của thao tác Fork trên GitHub.\n\n---\n\n## 🔥 Challenge\nHãy tìm hiểu mối quan hệ liên kết ngầm (Fork Network) trên GitHub. Khi một kho gốc bị tác giả xóa bỏ hoặc chuyển đổi từ công khai (Public) sang riêng tư (Private), số phận của các kho fork cá nhân của các lập trình viên khác sẽ bị ảnh hưởng như thế nào?\n\n---\n\n## 📚 Tổng kết\n- Fork tạo một bản sao độc lập của kho gốc ngay trên máy chủ đám mây của bạn.\n- Trao quyền chỉnh sửa hoàn toàn trên kho cá nhân mà không gây ảnh hưởng đến dự án gốc.\n- Là nền tảng mở đầu không thể thiếu của mọi hoạt động đóng góp mã nguồn mở.\n",
  "quiz": {
    "id": "quiz-04-09-fork",
    "title": "Trắc nghiệm: Cơ chế Fork trên GitHub",
    "questions": [
      {
        "id": "q1",
        "question": "Thao tác \"Fork\" trong hệ sinh thái GitHub thực chất là gì?",
        "type": "single",
        "options": [
          {
            "text": "Tạo repository thuộc tài khoản của bạn dựa trên repository gốc ở phía máy chủ",
            "correct": true
          },
          {
            "text": "Một câu lệnh gõ trong terminal shell của máy tính cá nhân",
            "correct": false
          },
          {
            "text": "Xóa bỏ vĩnh viễn dự án của tác giả ban đầu",
            "correct": false
          },
          {
            "text": "Tải toàn bộ mã nguồn về ổ đĩa cứng dưới dạng file Word",
            "correct": false
          }
        ],
        "explanation": "Fork tạo repository của bạn trên GitHub; quyền và cài đặt của kho gốc vẫn do chủ sở hữu quản lý."
      },
      {
        "id": "q2",
        "question": "Tại sao các dự án mã nguồn mở lại yêu cầu cộng đồng lập trình viên phải Fork dự án trước khi đóng góp?",
        "type": "single",
        "options": [
          {
            "text": "Để bảo vệ an ninh dự án, chỉ những người bảo trì chính mới có quyền ghi trực tiếp vào kho nguồn gốc",
            "correct": true
          },
          {
            "text": "Vì GitHub giới hạn mỗi dự án chỉ được có tối đa 3 lập trình viên",
            "correct": false
          },
          {
            "text": "Vì nếu không fork thì mã nguồn sẽ tự động bị mã hóa biến mất",
            "correct": false
          },
          {
            "text": "Vì fork giúp máy tính của tác giả chạy nhanh hơn",
            "correct": false
          }
        ],
        "explanation": "Fork cho phép bất kỳ ai cũng đóng góp được mà không cần cấp quyền push trực tiếp vào kho mã nguồn nhạy cảm."
      },
      {
        "id": "q3",
        "question": "Sau khi đã Fork một dự án trên giao diện web của GitHub, bước tiếp theo bạn cần làm để bắt đầu viết code là gì?",
        "type": "single",
        "options": [
          {
            "text": "Clone kho fork từ tài khoản cá nhân của bạn về máy tính bằng lệnh `git clone`",
            "correct": true
          },
          {
            "text": "Chạy lệnh git push ngay lập tức khi chưa có code",
            "correct": false
          },
          {
            "text": "Xóa tài khoản GitHub vừa tạo",
            "correct": false
          },
          {
            "text": "Tắt màn hình máy tính và chờ đợi tác giả gửi mã nguồn qua email",
            "correct": false
          }
        ],
        "explanation": "Bạn clone kho fork của mình về máy tính, khi đó remote origin sẽ trỏ vào kho bạn có quyền push."
      },
      {
        "id": "q4",
        "question": "Mối quan hệ giữa kho gốc (upstream) và kho bạn vừa Fork về tài khoản cá nhân là như thế nào?",
        "type": "single",
        "options": [
          {
            "text": "Fork có repository và quyền riêng; thay đổi ở fork không cập nhật nhánh gốc trừ khi được tích hợp, nhưng hai kho có thể thuộc cùng fork network",
            "correct": true
          },
          {
            "text": "Bất kỳ dòng code nào bạn gõ trên máy cá nhân sẽ tự động xuất hiện trên kho gốc ngay lập tức",
            "correct": false
          },
          {
            "text": "Kho gốc sẽ tự động bị biến mất sau 30 ngày",
            "correct": false
          },
          {
            "text": "Hai kho bị khóa quyền truy cập của tất cả mọi người",
            "correct": false
          }
        ],
        "explanation": "Fork tách quyền ghi nhưng không hẳn tách toàn bộ dữ liệu Git; thay đổi chỉ vào nhánh gốc khi được tích hợp."
      },
      {
        "id": "q5",
        "question": "Sau khi fork một repository, quyền nào bạn có đối với repository gốc?",
        "type": "single",
        "options": [
          {
            "text": "Fork không tự cấp quyền ghi vào repository gốc; bạn có thể đề nghị tích hợp thay đổi bằng Pull Request",
            "correct": true
          },
          {
            "text": "Fork tự cấp quyền quản trị đầy đủ trên repository gốc",
            "correct": false
          },
          {
            "text": "Chỉ được phép đọc repository gốc sau khi fork",
            "correct": false
          },
          {
            "text": "Có thể push thẳng mọi commit vào nhánh mặc định của repository gốc",
            "correct": false
          }
        ],
        "explanation": "Fork cho bạn nơi làm việc riêng; quyền ghi vào kho gốc vẫn cần được chủ sở hữu cấp."
      }
    ]
  }
};
export default lesson;
