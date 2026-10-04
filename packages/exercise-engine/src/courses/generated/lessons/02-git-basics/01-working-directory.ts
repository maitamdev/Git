import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "01-working-directory",
  "moduleId": "02-git-basics",
  "metadata": {
    "id": "01-working-directory",
    "title": "Working Directory (Thư mục làm việc)",
    "level": "beginner",
    "duration": 20,
    "xp": 60,
    "prerequisites": [
      "09-git-init"
    ],
    "objectives": [
      "Chỉ ra thư mục làm việc và biết nơi mình sửa tệp.",
      "Phân biệt tệp Git đã theo dõi với tệp mới chưa được theo dõi.",
      "Dùng git status để xem những tệp đó."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "working directory",
      "working tree",
      "thu muc lam viec",
      "untracked",
      "khu vuc git"
    ],
    "commands": [
      "git status"
    ]
  },
  "content": "# Working Directory (Thư mục làm việc): Bàn làm việc của lập trình viên\n\n---\n\n## 🎯 Mục tiêu\n- Khám phá vùng đất đầu tiên trong Tam Giác Vàng của Git: Thư mục làm việc (Working Directory).\n- Phân loại rạch ròi hai trạng thái căn bản của tệp tin: Tracked (đã vào tầm ngắm) và Untracked (chưa ai quản lý).\n- Hình thành phản xạ dùng `git status` để theo dõi những biến động trực tiếp trên bàn làm việc của bạn.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Working Directory — thư mục làm việc\n- **Nói dễ hiểu:** Toàn bộ không gian thư mục dự án trên ổ cứng, nơi bạn mở trình soạn thảo, viết code, sửa file và lưu tệp hàng ngày.\n- **Ví dụ:** Tệp `index.html` đang mở trong trình soạn thảo để bạn gõ thêm một tiêu đề chính là thuộc thư mục làm việc.\n- **Đừng nhầm:** Lưu file ở đây mới chỉ ghi đè lên ổ đĩa của bạn; Git chưa hề đóng gói mốc lịch sử nào cả.\n\n### Tracked — đã được Git theo dõi\n- **Nói dễ hiểu:** Những tệp tin đã từng xuất hiện trong mốc commit trước đó, được Git chủ động ghi nhận và canh chừng mọi thay đổi.\n- **Ví dụ:** Tệp `README.md` đã có trong dự án từ hôm qua; hôm nay chỉ cần bạn sửa một dấu chấm thì Git cũng phát hiện ra ngay.\n- **Đừng nhầm:** Được Git theo dõi không có nghĩa là code bạn vừa gõ đã an toàn trong lịch sử; bạn vẫn phải đóng gói và commit.\n\n### Modified — đã sửa\n- **Nói dễ hiểu:** Trạng thái của một tệp Tracked khi nội dung hiện tại trên máy bạn đã khác so với mốc commit gần nhất.\n- **Ví dụ:** Bạn sửa màu nền trong file `style.css`; `git status` lập tức đánh dấu file này là Modified.\n- **Đừng nhầm:** Modified chỉ là lời cảnh báo có sự biến động dữ liệu; nó hoàn toàn chưa được lưu thành mốc phiên bản mới.\n\n### Untracked — chưa được Git theo dõi\n- **Nói dễ hiểu:** Tệp tin hoàn toàn mới vừa được bạn tạo ra trong thư mục nhưng chưa từng được khai báo cho Git quản lý.\n- **Ví dụ:** Bạn vừa tạo file `note.txt` để ghi chú; Git xem nó như một người lạ và xếp vào danh sách Untracked.\n- **Đừng nhầm:** Untracked không làm mất file của bạn; file vẫn nằm trên ổ cứng, chỉ là cỗ máy Git đang làm ngơ nó đi.\n\n---\n\n## 🤔 Tại sao cần?\nThầy thường dặn các bạn: Trước khi biết cách đóng gói sản phẩm, bạn phải biết bàn làm việc của mình đang bày biện những gì. Trong một ngày làm việc, bạn tạo ra hàng chục file nháp, sửa chữa hàng trăm dòng code. Nếu không hiểu khái niệm Working Directory và trạng thái Tracked hay Untracked, bạn sẽ dễ rơi vào cảnh hoảng loạn tưởng mất file, hoặc tai hại hơn là đưa nhầm file rác vào kho lưu trữ chung của công ty.\n\n---\n\n## 📖 Định nghĩa\nWorking Directory (còn gọi là Working Tree) là thư mục vật lý chứa mã nguồn dự án trên máy tính nơi bạn trực tiếp thao tác. Git giám sát không gian này và chia tệp thành hai nhóm: Tracked (tệp đã được theo dõi) và Untracked (tệp mới chưa được khai báo với Git).\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy coi Working Directory như chiếc bàn vẽ của kiến trúc sư. Trên bàn có những bản vẽ chính thức đã đăng ký với văn phòng (Tracked), có những nét vẽ bạn vừa tẩy xóa thêm bớt (Modified), và có cả tờ giấy nháp bạn vừa lôi ra ghi chép (Untracked). Bàn vẽ là nơi bạn tự do sáng tạo!\n\n---\n\n## 🖼 Sơ đồ\n```text\nThư mục dự án — Working Directory (Bàn làm việc của bạn)\n├── README.md   (Đã theo dõi — Đang sửa đổi dở dang: Modified)\n├── app.js      (Đã theo dõi — Giữ nguyên như cũ: Unmodified)\n└── note.txt    (Tệp mới tạo — Git chưa biết mặt: Untracked)\n\nLưu ý: \"git status\" chỉ quan sát bàn làm việc, hoàn toàn không sửa đổi file của bạn.\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn tạo `note.txt` để ghi ý tưởng cho dự án. Tệp đã có trong thư mục dù chưa nằm trong lịch sử Git. Chạy `git status` để thấy Git báo tệp mới là Untracked. Lập trình viên luôn kiểm tra kỹ bàn làm việc trước khi quyết định đưa linh kiện nào vào quy trình đóng gói chính thức.\n\n---\n\n## 💻 Command\n```bash\ngit status\n```\n\n---\n\n## 🔍 Giải thích command\n`git status` là câu lệnh soi chiếu tình trạng của toàn bộ Working Directory. Lệnh này phân loại tệp tin theo màu sắc và đầu mục: tệp nào đang bị sửa đổi (Modified) và tệp nào mới tinh chưa được theo dõi (Untracked), giúp bạn nắm quyền kiểm soát tuyệt đối trước khi ra quyết định tiếp theo.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ rằng tạo file mới trên máy là Git tự động lưu:** File mới tạo luôn ở trạng thái Untracked; nếu bạn không ra lệnh theo dõi thì Git sẽ không bao giờ bảo vệ nó.\n2. **Nhầm lẫn giữa lưu file thông thường với tạo commit trong Git:** Lưu file chỉ ghi đè lên ổ cứng vật lý tại Working Directory, hoàn toàn chưa tạo ra điểm phục hồi nào trong lịch sử.\n3. **Hoang mang khi thấy file bị đánh dấu trong `git status`:** Thông báo đó chỉ là Git báo cáo trạng thái bình thường của các file đang sửa dở hoặc mới tạo, không phải là lỗi chương trình.\n\n---\n\n## 🧪 Lab\n1. Trong bảng tệp của terminal mô phỏng, tạo tệp mới tên `note.txt` và nhập một dòng ghi chú.\n2. Chạy `git status`.\n3. Tìm `note.txt` dưới mục Untracked files và xác nhận tệp vẫn còn trong bảng tệp.\n\n---\n\n## 💡 Hint\nNếu vừa tạo tệp mới, hãy tìm mục **Untracked files** trong kết quả `git status`. Bàn làm việc luôn chứa mọi tệp tin vật lý của bạn.\n\n---\n\n## ✅ Validation\n- Tạo được `note.txt` trong dự án.\n- `git status` báo tệp mới là Untracked.\n- Giải thích được tệp vẫn còn trong Working Directory dù Git chưa theo dõi.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để đánh giá mức độ thấu hiểu về không gian Working Directory. Đọc kỹ phân tích từ giảng viên sau mỗi câu hỏi.\n\n---\n\n## 🔥 Challenge\nTạo thêm `todo.txt`. Trước khi chạy `git status`, dự đoán tệp sẽ xuất hiện ở mục nào rồi kiểm tra dự đoán.\n\n---\n\n## 📚 Tổng kết\n- Working Directory là không gian làm việc vật lý nơi bạn trực tiếp viết và chỉnh sửa mã nguồn.\n- Tệp tin trong dự án luôn thuộc một trong hai nhóm: Tracked (Git đã biết) hoặc Untracked (tệp mới Git chưa quản lý).\n- Luôn sử dụng `git status` như thói quen quét dọn và kiểm tra bàn làm việc trước khi thực hiện các bước đóng gói tiếp theo.\n\n",
  "quiz": {
    "id": "quiz-02-01-working-directory",
    "title": "Trắc nghiệm: Working Directory và trạng thái tệp",
    "questions": [
      {
        "id": "q1",
        "question": "Working Directory (còn gọi là Working Tree) là phần nào?",
        "type": "single",
        "options": [
          {
            "text": "Các tệp dự án bạn đang mở và sửa",
            "correct": true
          },
          {
            "text": "Danh sách mọi commit đã lưu trong lịch sử",
            "correct": false
          },
          {
            "text": "Bản sao repository đang nằm trên máy chủ",
            "correct": false
          },
          {
            "text": "Thiết lập chung dùng để cài đặt Git",
            "correct": false
          }
        ],
        "explanation": "Working Directory là các tệp hiện có để bạn làm việc. Commit đã lưu và cấu hình Git là những phần khác nhau."
      },
      {
        "id": "q2",
        "question": "Bạn tạo `note.txt` mới trong dự án rồi chạy `git status`. Tệp thường hiện ở trạng thái nào?",
        "type": "single",
        "options": [
          {
            "text": "Untracked, vì Git chưa được yêu cầu theo dõi tệp mới",
            "correct": true
          },
          {
            "text": "Committed, vì lưu tệp tự tạo commit",
            "correct": false
          },
          {
            "text": "Modified, vì mọi tệp mới đều đã được theo dõi",
            "correct": false
          },
          {
            "text": "Deleted, vì Git chưa nhận diện tệp",
            "correct": false
          }
        ],
        "explanation": "Tệp mới thường là Untracked cho tới khi bạn yêu cầu Git theo dõi. Tệp vẫn nằm trong dự án và chưa bị xóa."
      },
      {
        "id": "q3",
        "question": "Bạn sửa README đã có trong một commit rồi lưu tệp. Git thường báo trạng thái nào?",
        "type": "single",
        "options": [
          {
            "text": "Modified, vì nội dung khác với mốc đã lưu",
            "correct": true
          },
          {
            "text": "Untracked, vì mọi lần sửa đều tạo một tệp mới",
            "correct": false
          },
          {
            "text": "Committed, vì nút Save tự lưu lịch sử Git",
            "correct": false
          },
          {
            "text": "Deleted, vì nội dung cũ đã thay đổi",
            "correct": false
          }
        ],
        "explanation": "README đã được Git theo dõi nên thay đổi hiện ra là Modified. Lưu trong trình soạn thảo chưa tự tạo một commit."
      },
      {
        "id": "q4",
        "question": "Lệnh `git status` dùng để làm gì trong bài này?",
        "type": "single",
        "options": [
          {
            "text": "Xem trạng thái các tệp trong repository hiện tại",
            "correct": true
          },
          {
            "text": "Tự thêm tệp Untracked vào lịch sử",
            "correct": false
          },
          {
            "text": "Lưu mọi tệp đang sửa thành commit",
            "correct": false
          },
          {
            "text": "Xóa các tệp Git chưa nhận diện",
            "correct": false
          }
        ],
        "explanation": "`git status` chỉ báo trạng thái hiện tại của tệp. Lệnh không thêm, commit hoặc xóa tệp."
      },
      {
        "id": "q5",
        "question": "Một tệp hiện là Untracked. Điều nào đúng?",
        "type": "single",
        "options": [
          {
            "text": "Tệp vẫn có trong thư mục nhưng Git chưa theo dõi nó",
            "correct": true
          },
          {
            "text": "Tệp đã bị xóa khỏi máy",
            "correct": false
          },
          {
            "text": "Tệp chắc chắn đã được lưu thành commit",
            "correct": false
          },
          {
            "text": "Git đã gửi tệp lên máy chủ từ xa",
            "correct": false
          }
        ],
        "explanation": "Untracked mô tả trạng thái Git chưa theo dõi, không phải tình trạng tệp bị mất. Bạn vẫn có thể mở và sửa tệp trong dự án."
      }
    ]
  }
};
export default lesson;
