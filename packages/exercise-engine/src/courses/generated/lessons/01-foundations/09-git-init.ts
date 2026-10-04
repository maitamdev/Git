import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "09-git-init",
  "moduleId": "01-foundations",
  "metadata": {
    "id": "09-git-init",
    "title": "Khởi tạo kho chứa với git init",
    "level": "beginner",
    "duration": 25,
    "xp": 75,
    "prerequisites": [
      "08-repository"
    ],
    "objectives": [
      "Chạy `git init` để bắt đầu quản lý thư mục hiện tại bằng Git.",
      "Dùng `git status` để kiểm tra repository vừa tạo.",
      "Đặt tên nhánh ban đầu khi cần bằng `git init -b main`."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "first-repository"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git init",
      "khoi tao",
      "new repo",
      "initialize",
      "first repository"
    ],
    "commands": [
      "git init",
      "git init -b main",
      "git status"
    ]
  },
  "content": "# Khởi tạo kho chứa với git init: Khai sinh dự án chuẩn mực\n\n---\n\n## 🎯 Mục tiêu\n- Tự tay kích hoạt cỗ máy quản lý phiên bản Git cho bất kỳ thư mục dự án nào bằng `git init`.\n- Hiểu rõ cơ chế khởi tạo nhánh ban đầu (`main`) và thiết lập cấu hình chuẩn mực của ngành.\n- Nhận diện trạng thái Untracked và tránh dứt điểm lỗi khởi tạo lồng kho chứa (nested repo) kinh hoàng.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### `git init` — Lệnh khởi tạo kho chứa\n- **Nói dễ hiểu:** Phép thuật biến một thư mục bình thường trên ổ cứng thành một Git Repository hoàn chỉnh.\n- **Ví dụ:** Bạn tạo thư mục `du-an-moi`, đứng tại đó và gõ `git init` để Git bắt đầu theo dõi.\n- **Đừng nhầm:** `git init` chỉ dựng khung quản lý và tạo `.git`; nó chưa hề tự động đóng gói hay lưu code của bạn vào commit.\n\n### Initial Branch — Nhánh khởi đầu\n- **Nói dễ hiểu:** Nhánh làm việc gốc đầu tiên mà Git chuẩn bị sẵn để đón nhận mốc commit đầu đời của bạn.\n- **Ví dụ:** Nhánh khởi đầu ngày nay theo chuẩn công nghiệp quốc tế thường được đặt tên là `main`.\n- **Đừng nhầm:** Tên nhánh mặc định có thể là `master` trên các phiên bản Git cũ; bạn có thể chỉ định `main` ngay bằng cờ `-b main`.\n\n### Untracked — Tệp tin chưa được theo dõi\n- **Nói dễ hiểu:** Tệp tin đã nằm trong thư mục dự án nhưng Git chưa được bạn cho phép đưa vào tầm ngắm bảo vệ.\n- **Ví dụ:** Sau khi `git init`, file `server.js` hiện màu đỏ kèm nhãn untracked khi bạn gõ `git status`.\n- **Đừng nhầm:** Untracked không có nghĩa là file bị lỗi hay hỏng; file vẫn nằm đó chờ bạn ra lệnh đóng gói ở bài sau.\n\n### First Commit — Mốc khai sinh dự án\n- **Nói dễ hiểu:** Commit lịch sử đầu tiên được tạo ra, chính thức đặt nền móng cho cuốn biên niên sử của dự án.\n- **Ví dụ:** Commit với thông điệp \"Khởi tạo cấu trúc dự án ban đầu\" sau khi hoàn tất các bước chuẩn bị.\n- **Đừng nhầm:** Lệnh `git init` không tự tạo first commit; chỉ khi bạn gõ lệnh commit thì mốc khai sinh mới xuất hiện.\n\n---\n\n## 🤔 Tại sao cần?\nMọi hành trình vĩ đại của các phần mềm triệu đô đều bắt đầu từ một dấu mốc: câu lệnh `git init`. Trước khi có thể dùng cỗ máy thời gian, bạn phải lắp đặt nó vào dự án. Lệnh này khai sinh ra thư mục `.git`, thiết lập cơ sở dữ liệu ngầm và sẵn sàng ghi chép từng bước đi của bạn. Nắm vững lệnh này cùng thói quen kiểm tra thư mục hiện hành sẽ cứu bạn khỏi cạm bẫy khởi tạo nhầm Git ra màn hình Desktop vô cùng tai hại.\n\n---\n\n## 📖 Định nghĩa\n`git init` là câu lệnh khởi tạo một Git repository mới hoặc tái thiết lập một repository hiện có ngay tại thư mục hiện hành. Lệnh này tạo ra thư mục ẩn `.git` chứa toàn bộ khung xương dữ liệu và cấu hình cần thiết để Git bắt đầu theo dõi dự án.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy tưởng tượng bạn vừa mua một căn phòng trống để làm việc. Gõ `git init` giống như việc bạn mời người thư ký ghi chép (Git) vào phòng, đặt một cuốn sổ cái mới tinh lên bàn và mở sẵn trang đầu tiên. Thư ký đã sẵn sàng, nhưng bạn chưa hề xếp đồ đạc nào vào tủ cả!\n\n---\n\n## 🖼 Sơ đồ\n```text\nTrước khi gõ \"git init\":              Sau khi gõ \"git init\":\nmy-project/                           my-project/\n├── app.js                            ├── .git/  ◄── (Khởi tạo cỗ máy ngầm!)\n└── style.css                         ├── app.js (Trạng thái: Untracked)\n(Thư mục thường không có lịch sử)      └── style.css (Trạng thái: Untracked)\n                                      Sẵn sàng đón nhận Commit đầu tiên!\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột bạn sinh viên nhận đề tài đồ án tốt nghiệp. Bạn tạo thư mục `do-an-tot-nghiep`, mở terminal ngay tại thư mục đó và gõ `git init -b main`. Ngay lập tức, Git thiết lập kho chứa chuẩn mực với nhánh chính là `main`. Từ giây phút đó, mọi dòng code, mọi tài liệu nghiên cứu mà bạn viết ra đều có thể được theo dõi và bảo vệ từng ngày.\n\n---\n\n## 💻 Command\n```bash\ngit init\ngit init -b main\ngit status\n```\n\n---\n\n## 🔍 Giải thích command\n- `git init`: Khởi tạo kho chứa Git rỗng trong thư mục hiện tại của bạn.\n- `git init -b main`: Khởi tạo kho chứa và chỉ định trực tiếp tên nhánh ban đầu là `main` theo tiêu chuẩn hiện đại của GitHub.\n- `git status`: Kiểm tra xác nhận Git đã nhận diện repository thành công và báo cáo danh sách các tệp tin đang ở trạng thái Untracked.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Khởi tạo nhầm ở thư mục mẹ như Desktop hay User:** Đây là thảm họa kinh điển của người mới, khiến Git biến toàn bộ màn hình máy tính hay cả ổ đĩa thành một repository khổng lồ.\n2. **Ảo tưởng rằng `git init` đã tự lưu mã nguồn vào lịch sử:** Lệnh này mới chỉ dựng kho rỗng; bạn phải thực hiện chu trình đóng gói và commit ở bài sau thì code mới được lưu.\n3. **Chạy `git init` lồng bên trong một repository đã có:** Việc lồng kho chứa không đúng cách sẽ gây xung đột theo dõi tệp tin và làm rối loạn lịch sử quản lý.\n\n---\n\n## 🧪 Lab\n1. Mở cửa sổ terminal và đảm bảo bạn đang đứng đúng trong thư mục thực hành dự án.\n2. Thực thi lệnh `git init` (hoặc `git init -b main`) để khởi tạo kho chứa.\n3. Chạy lệnh `git status` để tận mắt kiểm tra thông điệp báo cáo trạng thái chưa có commit nào.\n\n---\n\n## 💡 Hint\nTrước khi gõ lệnh `git init`, hãy luôn tự nhủ thần chú: \"Mình đang đứng ở thư mục nào?\" Hãy quan sát đường dẫn trên dấu nhắc lệnh để đảm bảo bạn không khởi tạo nhầm ra ngoài Desktop.\n\n---\n\n## ✅ Validation\n- Lệnh `git status` thực thi thành công và hiển thị rõ thông báo chưa có commit nào trên nhánh hiện tại.\n- Thư mục ẩn `.git` đã được sinh ra an toàn bên trong thư mục dự án.\n- Trình bày được vì sao các file mã nguồn ban đầu lại mang trạng thái Untracked.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để đánh giá sự thấu hiểu về bản chất của lệnh khởi tạo `git init`. Đọc kỹ phản hồi sư phạm sau mỗi câu hỏi.\n\n---\n\n## 🔥 Challenge\nHãy thử giải thích sự khác biệt giữa hai tình huống: Tạo một dự án mới hoàn toàn từ đầu bằng `git init` so với việc tải một dự án đã có sẵn về máy bằng `git clone`.\n\n---\n\n## 📚 Tổng kết\n- `git init` là bước khởi đầu bắt buộc để trao quyền năng quản lý phiên bản cho một thư mục dự án thông thường.\n- Sau khi khởi tạo, Git chuẩn bị sẵn nhánh làm việc nhưng toàn bộ tệp tin hiện hữu vẫn ở trạng thái Untracked cho đến khi bạn ra lệnh theo dõi.\n- Luôn kiểm tra kỹ đường dẫn thư mục làm việc trước khi chạy `git init` để tránh thảm họa biến cả máy tính thành một repo lộn xộn.\n\n",
  "quiz": {
    "id": "quiz-09-git-init",
    "title": "Trắc nghiệm: Khởi tạo repository với git init",
    "questions": [
      {
        "id": "q1",
        "question": "Lệnh nào bắt đầu quản lý thư mục hiện tại bằng Git?",
        "type": "single",
        "options": [
          {
            "text": "`git init`",
            "correct": true
          },
          {
            "text": "`git status`",
            "correct": false
          },
          {
            "text": "`git add .`",
            "correct": false
          },
          {
            "text": "`git log`",
            "correct": false
          }
        ],
        "explanation": "`git init` tạo dữ liệu nội bộ để Git bắt đầu quản lý thư mục. Lệnh này chưa thêm tệp hoặc tạo commit."
      },
      {
        "id": "q2",
        "question": "Trong một repository Git thông thường, thư mục nào được tạo khi chạy `git init`?",
        "type": "single",
        "options": [
          {
            "text": "`.git`",
            "correct": true
          },
          {
            "text": "`.github`",
            "correct": false
          },
          {
            "text": "`.repository`",
            "correct": false
          },
          {
            "text": "`node_modules`",
            "correct": false
          }
        ],
        "explanation": "`git init` tạo `.git` để chứa dữ liệu cần cho repository. Tệp dự án có sẵn vẫn nằm trong thư mục của chúng."
      },
      {
        "id": "q3",
        "question": "Bạn chạy `git init` trong thư mục đã có các tệp HTML và CSS. Điều gì xảy ra?",
        "type": "single",
        "options": [
          {
            "text": "Các tệp vẫn còn; Git tạo dữ liệu repository trong `.git`",
            "correct": true
          },
          {
            "text": "Git xóa các tệp để bắt đầu một dự án trống",
            "correct": false
          },
          {
            "text": "Git tự thêm mọi tệp vào commit đầu tiên",
            "correct": false
          },
          {
            "text": "Git chỉ chạy được nếu thư mục ban đầu trống",
            "correct": false
          }
        ],
        "explanation": "`git init` không xóa các tệp đang có và không tự lưu chúng. Lệnh chỉ chuẩn bị dữ liệu Git để bắt đầu quản lý thư mục."
      },
      {
        "id": "q4",
        "question": "Trên phiên bản Git hỗ trợ tùy chọn này, lệnh nào chọn `main` làm nhánh ban đầu?",
        "type": "single",
        "options": [
          {
            "text": "`git init -b main`",
            "correct": true
          },
          {
            "text": "`git init --name main`",
            "correct": false
          },
          {
            "text": "`git status --branch main`",
            "correct": false
          },
          {
            "text": "`git branch --initial main`",
            "correct": false
          }
        ],
        "explanation": "`git init -b main` yêu cầu Git dùng `main` làm tên nhánh ban đầu. Tên mặc định nếu bỏ tùy chọn có thể phụ thuộc cấu hình."
      },
      {
        "id": "q5",
        "question": "Ngay sau khi chạy `git init`, các tệp dự án có tự nằm trong lịch sử chưa?",
        "type": "single",
        "options": [
          {
            "text": "Chưa; bạn còn phải chọn tệp và tạo commit ở các bước sau",
            "correct": true
          },
          {
            "text": "Có; `git init` tự tạo commit đầu tiên",
            "correct": false
          },
          {
            "text": "Có; mọi tệp tự được gửi lên GitHub",
            "correct": false
          },
          {
            "text": "Chưa; `git init` xóa tệp và chỉ giữ tên thư mục",
            "correct": false
          }
        ],
        "explanation": "`git init` chuẩn bị repository nhưng không tạo commit đầu tiên. Bạn sẽ học cách chọn tệp và lưu commit ở Level 2."
      }
    ]
  }
};
export default lesson;
