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
      "Hiểu rõ bản chất cơ chế Fork trên máy chủ GitHub như một bản sao phía server.",
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
  "content": "# Cơ chế Fork trên GitHub\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ bản chất cơ chế Fork trên máy chủ GitHub như một bản sao phía server.\n- Phân biệt rõ ràng giữa thao tác Fork (trên GitHub) và thao tác Clone (về máy cá nhân).\n- Nắm bắt quy trình đóng góp mã nguồn mở kinh điển thông qua mô hình Fork & Pull Request.\n- Quản lý và đồng bộ kho fork cá nhân với kho gốc của dự án.\n\n---\n\n## 📖 Định nghĩa\n> Fork trong hệ sinh thái GitHub là một thao tác đặc biệt ở tầng máy chủ (server-side clone), cho phép bạn tạo ra một bản sao độc lập hoàn chỉnh của một kho lưu trữ thuộc về người khác hoặc tổ chức khác vào chính tài khoản GitHub cá nhân của bạn. Bản sao này trao cho bạn 100% quyền quản trị (Read/Write) để bạn tự do thử nghiệm, phát triển tính năng hoặc sửa lỗi mà không làm ảnh hưởng tới dự án gốc, đồng thời giữ mối liên kết mạng để có thể gửi yêu cầu gộp code ngược lại dự án gốc.\n\n---\n\n## 🤔 Tại sao cần?\nTrong thế giới phần mềm mã nguồn mở (Open Source) hoặc trong các tập đoàn lớn, bạn thường không được cấp quyền ghi (Push permission) trực tiếp vào kho mã nguồn chính vì lý do bảo mật và kiểm soát chất lượng. Cơ chế Fork chính là cánh cổng dân chủ mở ra cơ hội đóng góp cho hàng triệu lập trình viên toàn cầu: bất kỳ ai cũng có thể fork dự án về tài khoản mình, cải tiến mã nguồn và gửi tặng lại thành quả cho tác giả ban đầu thông qua Pull Request.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung một công thức nấu món phở gia truyền nổi tiếng được niêm yết trong tủ kính của một nhà hàng lớn (dự án gốc). Bạn không có quyền mở tủ kính để lấy bút viết thêm gia vị vào tờ công thức gốc đó. Tuy nhiên, nhà hàng cho phép bạn lấy máy chụp ảnh chụp lại toàn bộ công thức đem về gian bếp nhà riêng của bạn (Fork). Tại bếp nhà mình, bạn tự do thêm hoa hồi, bớt muối và nấu thử. Nếu món phở nấu theo công thức mới quá ngon, bạn gửi một lá thư mời đầu bếp trưởng nhà hàng nếm thử và áp dụng (Pull Request).\n\n---\n\n## 🖼 Sơ đồ\n```text\nQuy trình Fork trên GitHub:\n[Kho gốc: upstream] (facebook/react)\n        │\n        ▼ (Thao tác Fork trên GitHub web)\n[Kho cá nhân: origin] (your-account/react)\n        │\n        ▼ (git clone về máy cá nhân)\n[Máy tính của bạn: Local] (lập trình, commit & push lên your-account/react)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nLập trình viên Bình phát hiện một lỗi chính tả nghiêm trọng trong tài liệu hướng dẫn của một thư viện mã nguồn mở nổi tiếng có hơn 50.000 lượt yêu thích trên GitHub. Vì không có quyền commit trực tiếp vào kho chứa của tác giả, Bình bấm nút \"Fork\" ở góc trên bên phải giao diện trang web GitHub. Ngay lập tức, máy chủ GitHub tạo ra một bản sao hoàn chỉnh tại địa chỉ `github.com/binh-dev/famous-lib`. Bình sao chép đường dẫn clone kho này về máy tính cá nhân, sửa lỗi chính tả cẩn thận, tạo commit và đẩy lên tài khoản cá nhân của mình, hoàn toàn sẵn sàng cho việc mở Pull Request gửi về cho ban quản trị thư viện xem xét phê duyệt.\n\n---\n\n## 💻 Command\n```bash\ngit clone <url-kho-fork-cua-ban>\ngit remote -v\ngit remote add upstream <url-kho-goc>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git clone <url-kho-fork>`: Tải bản sao từ tài khoản cá nhân của bạn về máy tính để lập trình.\n- `git remote -v`: Kiểm tra liên kết remote origin trỏ về kho fork cá nhân.\n- `git remote add upstream <url-kho-goc>`: Thiết lập thêm liên kết tới kho gốc của tác giả để đồng bộ các cập nhật mới sau này.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ rằng Fork là một câu lệnh terminal của Git**:  Fork là tính năng độc quyền của nền tảng lưu trữ như GitHub/GitLab, không phải lệnh CLI.\n2. **Clone trực tiếp kho gốc của tác giả rồi thắc mắc vì sao bị lỗi Permission Denied khi push**:  Bạn phải fork về tài khoản mình rồi mới clone và push.\n3. **Để kho fork bị lỗi thời sau nhiều tháng**:  Quên đồng bộ với kho gốc khiến việc tạo Pull Request sau này bị xung đột nặng nề.\n\n---\n\n## 🧪 Lab\n1. Mở trang web GitHub của dự án mẫu và nhấn nút `Fork`.\n2. Sao chép URL của kho fork trên tài khoản cá nhân của bạn.\n3. Mở terminal và thực thi `git clone` kho fork về máy tính.\n4. Chạy `git remote -v` để xác nhận origin trỏ đúng vào tài khoản của bạn.\n\n---\n\n## 💡 Hint\n> Nhớ nguyên tắc: Fork trên web GitHub -> Clone về máy tính -> Code -> Push lên fork -> Tạo PR.\n\n---\n\n## ✅ Validation\n- Tạo thành công bản sao kho lưu trữ trên tài khoản GitHub cá nhân và clone về máy.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về cơ chế Fork trên GitHub.\n\n---\n\n## 🔥 Challenge\nNêu sự khác biệt giữa tính năng Fork và việc tải tệp ZIP về rồi tự tạo repository mới trên GitHub.\n\n---\n\n## 📚 Tổng kết\n- Fork tạo bản sao kho từ xa trên GitHub về tài khoản cá nhân của bạn.\n- Cung cấp toàn quyền chỉnh sửa và thử nghiệm mà không ảnh hưởng tới kho gốc.\n- Là nền tảng cốt lõi của quy trình đóng góp mã nguồn mở trên toàn cầu.\n",
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
            "text": "Tạo một bản sao độc lập của kho lưu trữ người khác vào tài khoản GitHub của chính bạn ở phía máy chủ",
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
        "explanation": "Fork là thao tác server-side clone do GitHub cung cấp, tạo bản sao kho trên máy chủ thuộc quyền sở hữu của bạn."
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
            "text": "Hai kho hoàn toàn độc lập, mọi sửa đổi trên kho fork không làm ảnh hưởng gì tới kho gốc trừ khi tác giả chấp nhận Pull Request",
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
        "explanation": "Kho fork là không gian an toàn biệt lập 100%; tác giả kho gốc chỉ nhận code khi duyệt Pull Request."
      }
    ]
  }
};
export default lesson;
