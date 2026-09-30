import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "08-repository",
  "moduleId": "01-foundations",
  "metadata": {
    "id": "08-repository",
    "title": "Repository là gì? Cấu trúc .git",
    "level": "beginner",
    "duration": 20,
    "xp": 60,
    "prerequisites": [
      "07-git-config"
    ],
    "objectives": [
      "Hiểu rõ bản chất kỹ thuật của Repository (Kho lưu trữ) trong Git.",
      "Khám phá cấu trúc bên trong của thư mục ẩn `.git` (objects, refs, HEAD, config, index).",
      "Nắm được nguyên tắc không chỉnh sửa thủ công các tệp tin bên trong thư mục `.git`."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "repository",
      "kho luu tru",
      "thu muc .git",
      "objects",
      "refs",
      "head"
    ],
    "commands": [
      "ls -la",
      "git status"
    ]
  },
  "content": "# Repository là gì? Cấu trúc .git\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ bản chất kỹ thuật của Repository (Kho lưu trữ) trong Git.\n- Khám phá cấu trúc bên trong của thư mục ẩn `.git` (objects, refs, HEAD, config, index).\n- Nắm được nguyên tắc không chỉnh sửa thủ công các tệp tin bên trong thư mục `.git`.\n\n---\n\n## 📖 Định nghĩa\n> Repository (thường gọi tắt là Repo hoặc Kho lưu trữ) là một cấu trúc dữ liệu lưu trữ toàn bộ các tệp tin, thư mục cùng toàn bộ lịch sử thay đổi của dự án phần mềm. Trái tim của mọi Git repository chính là thư mục ẩn mang tên `.git` nằm ở gốc của dự án. Thư mục này chứa cơ sở dữ liệu đối tượng (`objects/`), các con trỏ nhánh và tag (`refs/`), con trỏ vị trí hiện tại (`HEAD`), tệp cấu hình riêng (`config`), và tệp chỉ mục vùng chuẩn bị (`index`). Toàn bộ điều kỳ diệu của Git đều diễn ra bên trong thư mục ẩn này.\n\n---\n\n## 🤔 Tại sao cần?\nHiểu được vai trò của thư mục `.git` giúp bạn không còn cảm thấy Git là một \"hộp đen\" huyền bí. Bạn sẽ hiểu rằng việc xóa thư mục `.git` sẽ biến dự án của bạn trở lại thành một thư mục file thông thường không còn lịch sử, và ngược lại chỉ cần sao chép thư mục `.git` sang máy khác là bạn đã mang trọn vẹn 100% lịch sử dự án đi theo. Kiến thức này cũng giúp bạn tránh sai lầm chết người là can thiệp sửa file thủ công làm hỏng cấu trúc dữ liệu của Git.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung thư mục dự án của bạn giống như một văn phòng làm việc. Toàn bộ các bàn ghế, máy tính và tài liệu giấy tờ bạn nhìn thấy trước mắt chính là Working Tree. Còn thư mục ẩn `.git` giống như một căn phòng kho bảo mật được khóa kín ở góc văn phòng. Trong căn phòng kho đó có một chiếc máy photocopy công nghiệp siêu tốc, một kho lưu trữ hồ sơ bằng sắt chống cháy và một cuốn sổ cái ghi chép chi tiết từng ngày từng giờ ai đã mang tài liệu nào ra vào văn phòng.\n\n---\n\n## 🖼 Sơ đồ\n```text\nThư mục dự án:\nmy-project/\n├── .git/                      <── Trái tim của Repository!\n│   ├── HEAD                   (Con trỏ vị trí nhánh đang đứng)\n│   ├── config                 (Cấu hình riêng của repo này)\n│   ├── index                  (Vùng chuẩn bị Staging Area)\n│   ├── objects/               (Cơ sở dữ liệu Blob, Tree, Commit)\n│   └── refs/                  (Con trỏ nhánh: refs/heads/main)\n├── index.html                 (Working Tree - Tệp bạn đang sửa)\n└── app.js                     (Working Tree - Tệp bạn đang sửa)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột sinh viên vô tình chọn hiển thị tệp ẩn trên Windows và thấy thư mục `.git` nặng vài chục megabyte trong dự án môn học. Sinh viên này nghĩ rằng đây là rác hệ thống nên bấm nút Shift+Delete xóa vĩnh viễn thư mục `.git`. Ngay lập tức, khi mở lại VS Code, toàn bộ lịch sử 50 commit suốt hai tháng làm việc biến mất hoàn toàn, VS Code không còn nhận diện đây là một Git repository nữa. May mắn thay, nếu bạn đã từng đẩy code lên GitHub trước đó, bạn chỉ cần clone lại là khôi phục được toàn bộ thư mục `.git`.\n\n---\n\n## 💻 Command\n```bash\nls -la\ngit status\n```\n\n---\n\n## 🔍 Giải thích command\n- `ls -la`: Liệt kê tất cả các tệp tin và thư mục bao gồm cả các thư mục ẩn bắt đầu bằng dấu chấm như `.git`.\n- `git status`: Kiểm tra sự tồn tại và tính toàn vẹn của kho chứa Git trong thư mục hiện tại.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Chỉnh sửa hoặc xóa thủ công tệp bên trong `.git`**:  Hành động này có thể phá hủy cơ sở dữ liệu đối tượng và làm hỏng toàn bộ repository.\n2. **Khởi tạo repository lồng nhau vô ý**:  Chạy `git init` bên trong một thư mục con của một repository khác mà không dùng submodule.\n3. **Commit nhầm thư mục `.git` của dự án khác**:  Gây ra lỗi submodule rỗng không thể tải trên GitHub.\n\n---\n\n## 🧪 Lab\n1. Chạy lệnh `ls -la` hoặc `dir /a` để kiểm tra sự tồn tại của thư mục ẩn `.git`.\n2. Quan sát các thành phần con cốt lõi của `.git`: HEAD, config, objects, refs.\n3. Nhận biết rằng khi `.git` tồn tại, các câu lệnh Git mới có thể hoạt động.\n\n---\n\n## 💡 Hint\n> Tuyệt đối không chỉnh sửa thủ công các tệp trong `.git` trừ khi bạn là chuyên gia.\n\n---\n\n## ✅ Validation\n- Hiểu cấu trúc và vai trò của thư mục `.git` trong một kho lưu trữ Git.\n\n---\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm sau về bản chất của Repository và thư mục .git.\n\n---\n\n## 🔥 Challenge\nNêu vai trò của 3 thành phần con bên trong thư mục .git: HEAD, objects/ và refs/.\n\n---\n\n## 📚 Tổng kết\n- Repository là cơ sở dữ liệu lưu toàn bộ mã nguồn và lịch sử phiên bản của dự án.\n- Mọi dữ liệu lịch sử của Git được gói gọn hoàn toàn trong thư mục ẩn `.git`.\n- Xóa thư mục `.git` đồng nghĩa với việc xóa bỏ vĩnh viễn toàn bộ lịch sử commit cục bộ.\n",
  "quiz": {
    "id": "quiz-08-repository",
    "title": "Trắc nghiệm: Repository và cấu trúc .git",
    "questions": [
      {
        "id": "q1",
        "question": "Thành phần nào là trái tim lưu trữ toàn bộ lịch sử và đối tượng của một Git Repository?",
        "type": "single",
        "options": [
          {
            "text": "Thư mục ẩn mang tên `.git` nằm ở gốc dự án",
            "correct": true
          },
          {
            "text": "Tệp tin `node_modules` chứa các thư viện JavaScript",
            "correct": false
          },
          {
            "text": "Thư mục `C:\\Windows\\System32`",
            "correct": false
          },
          {
            "text": "Tệp tin `package.json` nằm ở ngoài cùng",
            "correct": false
          }
        ],
        "explanation": "Thư mục ẩn `.git` chứa toàn bộ cơ sở dữ liệu đối tượng, cấu hình, refs và lịch sử của Git."
      },
      {
        "id": "q2",
        "question": "Điều gì sẽ xảy ra nếu bạn xóa bỏ hoàn toàn thư mục `.git` trong một dự án?",
        "type": "single",
        "options": [
          {
            "text": "Dự án trở thành thư mục tệp tin bình thường, toàn bộ lịch sử commit cục bộ bị mất vĩnh viễn",
            "correct": true
          },
          {
            "text": "Toàn bộ code trong dự án sẽ tự động bị biên dịch sang ngôn ngữ C++",
            "correct": false
          },
          {
            "text": "Git sẽ tự động tải lại thư mục đó từ Google Drive về máy",
            "correct": false
          },
          {
            "text": "Máy tính sẽ bị khóa màn hình và yêu cầu khởi động lại",
            "correct": false
          }
        ],
        "explanation": "Xóa `.git` làm mất hoàn toàn lịch sử phiên bản cục bộ, chỉ giữ lại các tệp hiện tại trong Working Tree."
      },
      {
        "id": "q3",
        "question": "Thư mục con `objects/` bên trong `.git` dùng để làm gì?",
        "type": "single",
        "options": [
          {
            "text": "Lưu trữ cơ sở dữ liệu toàn bộ các đối tượng Blob (tệp tin), Tree (thư mục) và Commit",
            "correct": true
          },
          {
            "text": "Lưu ảnh đại diện của các thành viên trong nhóm dự án",
            "correct": false
          },
          {
            "text": "Lưu trữ tài liệu thiết kế Figma của lập trình viên giao diện",
            "correct": false
          },
          {
            "text": "Chứa các tệp tạm thời tự động xóa sau 5 phút",
            "correct": false
          }
        ],
        "explanation": "`.git/objects/` là kho lưu trữ cơ sở dữ liệu bất biến (Object Database) theo mã hash SHA của Git."
      },
      {
        "id": "q4",
        "question": "Tệp `HEAD` bên trong thư mục `.git` đóng vai trò gì?",
        "type": "single",
        "options": [
          {
            "text": "Chỉ định con trỏ trỏ tới nhánh hoặc commit mà bạn đang làm việc trực tiếp tại thời điểm hiện tại",
            "correct": true
          },
          {
            "text": "Lưu tiêu đề trang web HTML của dự án",
            "correct": false
          },
          {
            "text": "Chứa ảnh đại diện của người sáng lập dự án",
            "correct": false
          },
          {
            "text": "Lưu mật khẩu mã hóa của kho chứa",
            "correct": false
          }
        ],
        "explanation": "Tệp `HEAD` là một con trỏ tham chiếu (symref) trỏ đến nhánh hiện tại (ví dụ `ref: refs/heads/main`)."
      }
    ]
  }
};
export default lesson;
