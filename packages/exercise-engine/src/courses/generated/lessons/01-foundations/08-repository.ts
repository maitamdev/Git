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
      "Phân biệt các tệp dự án với dữ liệu nội bộ trong `.git`.",
      "Giải thích `Working Tree` và `HEAD` bằng lời của mình.",
      "Biết xóa `.git` có thể làm mất lịch sử Git trên máy."
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
      "working tree",
      "head"
    ],
    "commands": [
      "ls -la",
      "git status"
    ]
  },
  "content": "# Repository là gì? Giải phẫu cấu trúc .git và Working Tree\n\n---\n\n## 🎯 Mục tiêu\n- Giải mã cấu trúc giải phẫu của một Git Repository: Phân tách rạch ròi giữa Working Tree và thư mục bí mật `.git`.\n- Hiểu rõ vai trò sinh tử của thư mục `.git` như trái tim chứa toàn bộ lịch sử dự án.\n- Sử dụng lệnh `ls -la` và `git status` để quan sát cấu trúc ẩn và định vị con trỏ `HEAD`.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Repository (Repo) — Kho lưu trữ Git\n- **Nói dễ hiểu:** Thư mục dự án được trao quyền năng của Git, bao gồm mã nguồn bạn thấy và toàn bộ cơ sở dữ liệu lịch sử ngầm.\n- **Ví dụ:** Thư mục `web-ban-hang` trên máy tính sau khi được Git quản lý sẽ trở thành một repo chính hiệu.\n- **Đừng nhầm:** Repository không chỉ là các tệp code bạn đang viết; linh hồn của nó nằm ở cơ sở dữ liệu lịch sử bên trong.\n\n### Working Tree — Cây làm việc thực tế\n- **Nói dễ hiểu:** Toàn bộ các file và thư mục mà bạn nhìn thấy trên màn hình và trực tiếp chỉnh sửa bằng trình soạn thảo mã nguồn.\n- **Ví dụ:** File `index.html` hay `style.css` bạn đang mở trong trình soạn thảo chính là một phần của Working Tree.\n- **Đừng nhầm:** Mọi thay đổi bạn gõ trong Working Tree chưa được bảo vệ cho đến khi bạn đưa chúng vào commit.\n\n### `.git` — Trái tim và não bộ ngầm\n- **Nói dễ hiểu:** Thư mục ẩn đặc biệt chứa toàn bộ lịch sử commit, các nhánh, các con trỏ và thông tin cấu hình của Git.\n- **Ví dụ:** Khi bạn mở tùy chọn hiển thị tệp ẩn, bạn sẽ thấy thư mục `.git` nằm ngay ở gốc dự án.\n- **Đừng nhầm:** Tuyệt đối không viết code hay tự ý sửa file bên trong thư mục này; hãy để Git tự quản lý nó.\n\n### `HEAD` — Chiếc la bàn chỉ vị trí hiện tại\n- **Nói dễ hiểu:** Con trỏ đặc biệt cho Git biết bạn đang đứng ở nhánh nào hoặc đang soi chiếu vào mốc commit nào.\n- **Ví dụ:** `HEAD` đang trỏ vào nhánh `main` nghĩa là mọi commit mới bạn tạo ra sẽ nối tiếp vào nhánh `main`.\n- **Đừng nhầm:** `HEAD` không phải là file mã nguồn; nó là một chiếc kim chỉ nam định vị tọa độ làm việc của Git.\n\n---\n\n## 🤔 Tại sao cần?\nCó rất nhiều bạn sinh viên thấy thư mục lạ `.git` chiếm dung lượng liền bấm phím xóa cho gọn máy. Hậu quả là toàn bộ công sức commit thâu đêm suốt ba tháng bốc hơi chỉ trong một giây! Hiểu rõ giải phẫu của một repository giúp bạn biết đâu là sân khấu làm việc của mình (Working Tree) và đâu là cấm địa bất khả xâm phạm (`.git`). Bạn sẽ biết cách bảo vệ dữ liệu dự án và không bao giờ tự tay phá hoại thành quả lao động của chính mình.\n\n---\n\n## 📖 Định nghĩa\nRepository là một không gian dự án hoàn chỉnh do Git quản lý, cấu thành từ hai phần: Working Tree (tập hợp các tệp mã nguồn bạn chỉnh sửa) và thư mục ẩn `.git` (cơ sở dữ liệu lưu trữ toàn bộ lịch sử commit, con trỏ nhánh và cấu hình dự án).\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy tưởng tượng dự án của bạn như một sân khấu kịch lớn: Working Tree là sàn diễn phía trước, nơi các diễn viên (tệp code của bạn) xuất hiện trước mắt khán giả; còn thư mục ẩn `.git` là hậu trường phía sau với toàn bộ kịch bản, đạo cụ lưu trữ và hệ thống điều khiển âm thanh ánh sáng. Đừng bao giờ dại dột làm sập hậu trường!\n\n---\n\n## 🖼 Sơ đồ\n```text\nThư mục dự án: my-project/\n├── .git/               ◄── HẬU TRƯỜNG BÍ MẬT (Chứa toàn bộ lịch sử)\n│    ├── objects/       (Nơi cất giữ các Snapshot)\n│    ├── refs/          (Danh sách các nhánh)\n│    └── HEAD           (Kim chỉ nam vị trí hiện tại)\n├── index.html          ◄── SÀN DIỄN WORKING TREE (Code của bạn)\n└── app.js              ◄── SÀN DIỄN WORKING TREE (Code của bạn)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột lập trình viên sơ ý xóa mất thư mục `.git` trong một dự án cá nhân. Khi mở lại trình soạn thảo mã nguồn, các tệp mã nguồn vẫn còn đó nhưng Git thông báo thư mục không còn là repository. Toàn bộ các mốc commit lịch sử, các nhánh tính năng đang làm dở đều tan biến hoàn toàn. May mắn là anh ta có bản sao trên GitHub nên đã kéo về khôi phục lại được.\n\n---\n\n## 💻 Command\n```bash\nls -la\ngit status\n```\n\n---\n\n## 🔍 Giải thích command\n- `ls -la`: Liệt kê toàn bộ các tệp tin và thư mục, bao gồm cả những thư mục ẩn có dấu chấm ở đầu như `.git`. Trên PowerShell của Windows, bạn có thể dùng lệnh tương đương là `Get-ChildItem -Force`.\n- `git status`: Kiểm tra xem thư mục hiện tại có được nhận diện là một Git repository hay không và báo cáo tình trạng các tệp tin trong Working Tree.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Tự ý xóa thư mục `.git` vì tưởng là file rác:** Hành động này phá hủy toàn bộ cỗ máy thời gian, biến repo thành một thư mục tệp tin thông thường và xóa sạch toàn bộ lịch sử.\n2. **Dùng trình soạn thảo mở và sửa bậy các file bên trong `.git`:** Cơ sở dữ liệu của Git được mã hóa và liên kết chặt chẽ; sửa tay sẽ làm hỏng toàn bộ cấu trúc dữ liệu của kho chứa.\n3. **Tưởng rằng mã nguồn của mình nằm bên trong `.git`:** Mã nguồn bạn viết luôn nằm ở Working Tree bên ngoài; `.git` chỉ lưu giữ thông tin quản lý và các đối tượng lịch sử nén.\n\n---\n\n## 🧪 Lab\n1. Chạy lệnh `ls -la` trên terminal để tận mắt tìm thấy sự hiện diện của thư mục ẩn `.git`.\n2. Chạy tiếp lệnh `git status` để xem phản hồi của Git về trạng thái của Working Tree.\n3. Trả lời câu hỏi: Nếu bạn sao chép toàn bộ thư mục dự án sang một máy tính khác, lịch sử Git có đi theo không? Vì sao?\n\n---\n\n## 💡 Hint\nBí quyết để di chuyển một kho Git trọn vẹn là sao chép cả thư mục cha; chừng nào thư mục `.git` còn nguyên vẹn bên trong thì toàn bộ lịch sử của dự án vẫn được bảo toàn.\n\n---\n\n## ✅ Validation\n- Phân biệt chuẩn xác giữa sàn diễn Working Tree và hậu trường lưu trữ `.git`.\n- Nêu được hậu quả nghiêm trọng của việc xóa bỏ thư mục `.git`.\n- Sử dụng thành thạo `ls -la` hoặc `Get-ChildItem -Force` để kiểm tra thư mục ẩn.\n\n---\n\n## ❓ Quiz\nLàm bài kiểm tra trắc nghiệm dưới đây để chứng minh bạn đã làm chủ kiến thức giải phẫu repository. Đọc kỹ lời giải thích chi tiết của giảng viên.\n\n---\n\n## 🔥 Challenge\nHãy giải thích cho một người bạn hiểu tại sao khi gửi code qua email hay nộp bài tập, người ta thường khuyên nên nén cả thư mục dự án (bao gồm `.git`) nếu muốn giảng viên chấm được cả tiến trình commit.\n\n---\n\n## 📚 Tổng kết\n- Thư mục `.git` là linh hồn của kho chứa; không có `.git` thì dự án chỉ là một thư mục bình thường.\n- Working Tree là nơi bạn trực tiếp viết và chỉnh sửa mã nguồn hàng ngày.\n- Tuyệt đối không can thiệp thủ công vào `.git`; mọi tương tác hãy để các câu lệnh Git đảm nhiệm.\n\n",
  "quiz": {
    "id": "quiz-08-repository",
    "title": "Trắc nghiệm: Repository, Working Tree và .git",
    "questions": [
      {
        "id": "q1",
        "question": "Trong một repository Git thông thường, `.git` dùng để làm gì?",
        "type": "single",
        "options": [
          {
            "text": "Giữ dữ liệu nội bộ Git dùng để quản lý repository và lịch sử",
            "correct": true
          },
          {
            "text": "Chứa toàn bộ mã nguồn để thay thế các tệp trong dự án",
            "correct": false
          },
          {
            "text": "Lưu thông tin tài khoản GitHub của mọi thành viên",
            "correct": false
          },
          {
            "text": "Là thư mục cài đặt Git trên máy tính",
            "correct": false
          }
        ],
        "explanation": "`.git` chứa dữ liệu nội bộ Git cần để quản lý repository. Các tệp dự án mà bạn sửa thường nằm bên ngoài thư mục đó."
      },
      {
        "id": "q2",
        "question": "Bạn xóa `.git` trong một repository chỉ có trên laptop. Điều gì thường xảy ra?",
        "type": "single",
        "options": [
          {
            "text": "Các tệp dự án còn lại nhưng lịch sử Git cục bộ có thể mất",
            "correct": true
          },
          {
            "text": "Các tệp dự án tự chuyển sang một repository trực tuyến",
            "correct": false
          },
          {
            "text": "Git tạo lại toàn bộ lịch sử từ các tên tệp hiện có",
            "correct": false
          },
          {
            "text": "Mọi tệp dự án đều bị xóa cùng `.git`",
            "correct": false
          }
        ],
        "explanation": "`.git` giữ dữ liệu quản lý và lịch sử cục bộ. Xóa nó thường để lại các tệp khác nhưng không tự khôi phục lịch sử đã mất."
      },
      {
        "id": "q3",
        "question": "Working Tree là phần nào của repository?",
        "type": "single",
        "options": [
          {
            "text": "Các tệp dự án mà bạn đang xem và sửa trực tiếp",
            "correct": true
          },
          {
            "text": "Toàn bộ commit đã lưu trong lịch sử Git",
            "correct": false
          },
          {
            "text": "Bản cài đặt Git được dùng để chạy lệnh",
            "correct": false
          },
          {
            "text": "Một bản sao trực tuyến của repository",
            "correct": false
          }
        ],
        "explanation": "Working Tree là các tệp dự án hiện có để bạn mở và sửa. Chỉnh sửa chúng chưa tự tạo commit mới."
      },
      {
        "id": "q4",
        "question": "Trong repository thông thường, `.git/HEAD` giúp Git biết điều gì?",
        "type": "single",
        "options": [
          {
            "text": "Vị trí hiện tại, thường là nhánh đang được chọn",
            "correct": true
          },
          {
            "text": "Tệp nào trong Working Tree đang mở trên màn hình",
            "correct": false
          },
          {
            "text": "Tài khoản nào được phép đăng nhập GitHub",
            "correct": false
          },
          {
            "text": "Câu lệnh nào sẽ được chạy tiếp theo trong terminal",
            "correct": false
          }
        ],
        "explanation": "`HEAD` cho biết vị trí Git đang làm việc, thường thông qua nhánh hiện tại. Cách nó có thể trỏ thẳng tới commit sẽ học ở bài nâng cao."
      },
      {
        "id": "q5",
        "question": "Trong Windows PowerShell, lệnh nào hiển thị cả thư mục ẩn `.git`?",
        "type": "single",
        "options": [
          {
            "text": "`Get-ChildItem -Force`",
            "correct": true
          },
          {
            "text": "`git status`",
            "correct": false
          },
          {
            "text": "`dir /a`",
            "correct": false
          },
          {
            "text": "`git config --list`",
            "correct": false
          }
        ],
        "explanation": "`Get-ChildItem -Force` hiển thị cả mục ẩn trong PowerShell. `dir /a` là cú pháp của Command Prompt, không phải tham số PowerShell."
      }
    ]
  }
};
export default lesson;
