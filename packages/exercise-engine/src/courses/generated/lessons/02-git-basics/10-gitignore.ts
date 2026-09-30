import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "10-gitignore",
  "moduleId": "02-git-basics",
  "metadata": {
    "id": "10-gitignore",
    "title": "Bỏ qua tệp tin với .gitignore",
    "level": "beginner",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "05-git-add"
    ],
    "objectives": [
      "Hiểu rõ mục đích và tầm quan trọng của tệp tin cấu hình `.gitignore`.",
      "Nắm bắt các quy tắc mẫu (glob patterns) phổ biến: đuôi tệp, thư mục, ngoại lệ phủ định.",
      "Biết cách xử lý tình huống tệp tin đã vô tình bị theo dõi trước khi thêm vào .gitignore."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "gitignore",
      "ignore files",
      "bo qua tep tin",
      "pattern",
      "node_modules"
    ],
    "commands": [
      "echo \"node_modules/\" >> .gitignore",
      "echo \".env\" >> .gitignore",
      "git check-ignore -v <file>"
    ]
  },
  "content": "# Bỏ qua tệp tin với .gitignore\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ mục đích và tầm quan trọng của tệp tin cấu hình `.gitignore`.\n- Nắm bắt các quy tắc mẫu (glob patterns) phổ biến: đuôi tệp, thư mục, ngoại lệ phủ định.\n- Biết cách xử lý tình huống tệp tin đã vô tình bị theo dõi trước khi thêm vào .gitignore.\n\n---\n\n## 📖 Định nghĩa\n> `.gitignore` là một tệp văn bản thuần túy đặt tại thư mục gốc (hoặc các thư mục con) của kho lưu trữ, chứa danh sách các mẫu quy tắc khớp đường dẫn (glob patterns) chỉ định cho Git biết những tệp tin hoặc thư mục nào cần phải bỏ qua hoàn toàn, không hiển thị trong mục Untracked files và không bao giờ được đưa vào commit. Các tệp này thường bao gồm các tệp biên dịch trung gian, thư viện phụ thuộc (`node_modules`), tệp môi trường chứa mật khẩu bí mật (`.env`), và tệp tạm thời của hệ điều hành.\n\n---\n\n## 🤔 Tại sao cần?\nKhông sử dụng `.gitignore` hoặc cấu hình sơ sài là nguyên nhân hàng đầu gây ra các thảm họa bảo mật và phình to kho chứa trong thực tế. Đã có vô số trường hợp lập trình viên vô tình commit tệp `.env` chứa mật khẩu cơ sở dữ liệu và khóa bí mật AWS lên GitHub công khai, dẫn đến việc bị tin tặc chiếm quyền điều khiển tài nguyên đám mây và gây thiệt hại hàng chục ngàn đô-la chỉ sau vài phút. Ngoài ra, việc commit hàng trăm nghìn tệp trong `node_modules` sẽ làm đơ nghẽn mạng và lãng phí dung lượng vô ích.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung tệp `.gitignore` giống như một danh sách đen (Blacklist) được trao cho người bảo vệ an ninh đứng gác tại cổng ra vào tòa nhà kho lưu trữ. Người bảo vệ có nhiệm vụ chặn đứng tất cả những ai hoặc những món hàng nào nằm trong danh sách đen này: không cho phép rác thải công nghiệp (build artifacts), người lạ không có thẻ (tệp nháp tạm thời) hay đồ vật nguy hiểm cháy nổ (khóa bí mật mật khẩu) được bước chân vào kho hàng.\n\n---\n\n## 🖼 Sơ đồ\n```text\nHoạt động của màng lọc .gitignore:\nWorking Directory:                   Màng lọc .gitignore:             Staging Area:\n├── app.js            ─────────────► [Cho qua]          ────────────► [app.js]\n├── package.json      ─────────────► [Cho qua]          ────────────► [package.json]\n├── .env              ─────────────► [CHẶN: .env]       ────────────► (Bị bỏ qua)\n└── node_modules/     ─────────────► [CHẶN: node_modules/] ─────────► (Bị bỏ qua)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột nhóm lập trình viên phát triển ứng dụng web Node.js và React chuyên nghiệp cho khách hàng doanh nghiệp. Trong cấu trúc dự án, thư mục node_modules chứa hơn bốn mươi lăm nghìn tệp tin thư viện với dung lượng lên đến nửa gigabyte, và tệp .env chứa toàn bộ chuỗi kết nối cơ sở dữ liệu MongoDB kèm mật khẩu bí mật của môi trường phát triển. Trưởng nhóm tạo ngay một tệp .gitignore tại thư mục gốc dự án và khai báo các dòng quy tắc loại trừ bao gồm node_modules/, *.log, và .env. Kể từ giây phút đó, Git hoàn toàn bỏ qua các mục này trong mọi báo cáo trạng thái, bảo vệ kho mã nguồn luôn nhẹ nhàng và an toàn.\n\n---\n\n## 💻 Command\n```bash\necho \"node_modules/\" >> .gitignore\necho \".env\" >> .gitignore\ngit check-ignore -v <file>\n```\n\n---\n\n## 🔍 Giải thích command\n- `echo \"pattern\" >> .gitignore`: Ghi thêm một quy tắc mẫu đường dẫn loại trừ vào cuối tệp tin cấu hình .gitignore một cách nhanh chóng ngay trên terminal.\n- `git check-ignore -v <file>`: Lệnh chẩn đoán chuyên sâu giúp bạn kiểm tra chi tiết xem một tệp tin cụ thể đang bị quy tắc nào, ở dòng số mấy trong .gitignore chặn lại, vô cùng hữu ích khi gỡ lỗi.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Thêm tệp vào .gitignore sau khi đã commit**:  .gitignore chỉ có tác dụng với tệp Untracked; nếu tệp đã được commit trước đó, bạn phải dùng `git rm --cached` để gỡ bỏ theo dõi.\n2. **Viết sai đường dẫn hoặc thiếu dấu gạch chéo**:  Gõ `build` thay vì `build/` có thể vô tình chặn cả tệp mã nguồn mang tên build.js.\n3. **Quên không commit chính tệp .gitignore**:  Khiến đồng nghiệp trong nhóm không nhận được danh sách bỏ qua và tiếp tục commit nhầm file rác.\n\n---\n\n## 🧪 Lab\n1. Tạo một tệp tạm thời mang tên `secret.env` và quan sát nó xuất hiện trong `git status` màu đỏ.\n2. Tạo tệp `.gitignore` và thêm dòng `*.env` vào bên trong.\n3. Chạy lại lệnh `git status` và xác nhận tệp `secret.env` đã hoàn toàn biến mất khỏi danh sách theo dõi.\n\n---\n\n## 💡 Hint\n> Tệp .gitignore cũng cần phải được `git add` và `git commit` để chia sẻ cho cả nhóm.\n\n---\n\n## ✅ Validation\n- Kiểm tra `git status` không còn liệt kê các tệp đã được khai báo trong .gitignore.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về cách sử dụng tệp .gitignore.\n\n---\n\n## 🔥 Challenge\nNêu cú pháp dùng dấu chấm than `!` trong .gitignore để tạo quy tắc ngoại lệ bỏ qua.\n\n---\n\n## 📚 Tổng kết\n- `.gitignore` ngăn chặn Git theo dõi các tệp tin rác, tệp biên dịch và thông tin bí mật.\n- Chỉ áp dụng tự động cho các tệp Untracked; tệp đã tracked cần chạy `git rm --cached`.\n- Bắt buộc phải commit `.gitignore` vào kho chứa để đồng bộ quy tắc cho toàn bộ thành viên nhóm.\n",
  "quiz": {
    "id": "quiz-02-10-gitignore",
    "title": "Trắc nghiệm: Bỏ qua tệp tin với .gitignore",
    "questions": [
      {
        "id": "q1",
        "question": "Mục đích cốt lõi của tệp .gitignore trong một dự án Git là gì?",
        "type": "single",
        "options": [
          {
            "text": "Chỉ định danh sách các tệp tin và thư mục mà Git cần bỏ qua không theo dõi và không commit",
            "correct": true
          },
          {
            "text": "Tự động xóa vĩnh viễn các tệp mã nguồn bị lỗi cú pháp",
            "correct": false
          },
          {
            "text": "Lưu trữ mật khẩu bảo mật của tài khoản GitHub",
            "correct": false
          },
          {
            "text": "Chặn quyền truy cập mạng Internet của các thành viên trong nhóm",
            "correct": false
          }
        ],
        "explanation": "`.gitignore` khai báo các mẫu tệp rác hoặc tệp nhạy cảm mà Git không bao giờ được đưa vào commit."
      },
      {
        "id": "q2",
        "question": "Quy tắc nào trong .gitignore sẽ bỏ qua toàn bộ các tệp tin có phần mở rộng là `.log`?",
        "type": "single",
        "options": [
          {
            "text": "*.log",
            "correct": true
          },
          {
            "text": "delete.log",
            "correct": false
          },
          {
            "text": "/log-all",
            "correct": false
          },
          {
            "text": "ignore(.log)",
            "correct": false
          }
        ],
        "explanation": "Dấu sao `*` là ký tự đại diện (wildcard) khớp với mọi chuỗi ký tự, `*.log` bỏ qua mọi tệp đuôi .log."
      },
      {
        "id": "q3",
        "question": "Nếu một tệp tin bí mật đã lỡ bị commit vào lịch sử Git từ trước, việc chỉ thêm tên tệp đó vào .gitignore có giúp loại bỏ nó khỏi lịch sử không?",
        "type": "single",
        "options": [
          {
            "text": "Không, .gitignore chỉ có tác dụng với tệp Untracked; bạn phải dùng git rm --cached để gỡ bỏ",
            "correct": true
          },
          {
            "text": "Có, Git sẽ tự động xóa sạch tệp đó khỏi toàn bộ các commit trong quá khứ",
            "correct": false
          },
          {
            "text": "Có, tệp đó sẽ tự động được mã hóa bằng mật khẩu quản trị",
            "correct": false
          },
          {
            "text": "Git sẽ lập tức báo lỗi và từ chối khởi động",
            "correct": false
          }
        ],
        "explanation": "Tệp đã được track thì .gitignore không có tác dụng; bạn phải chạy `git rm --cached <file>` để ngừng theo dõi tệp."
      },
      {
        "id": "q4",
        "question": "Quy tắc thư mục nào dưới đây bỏ qua trọn vẹn thư mục `node_modules` ở bất kỳ cấp độ nào?",
        "type": "single",
        "options": [
          {
            "text": "node_modules/",
            "correct": true
          },
          {
            "text": "<node_modules>",
            "correct": false
          },
          {
            "text": "file:node_modules",
            "correct": false
          },
          {
            "text": "skip node_modules",
            "correct": false
          }
        ],
        "explanation": "Dấu gạch chéo ở cuối `node_modules/` chỉ định bỏ qua toàn bộ thư mục và mọi nội dung con bên trong nó."
      }
    ]
  }
};
export default lesson;
