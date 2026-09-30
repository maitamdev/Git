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
      "Sử dụng thành thạo câu lệnh `git init` để biến một thư mục thông thường thành một Git repository.",
      "Hiểu các hành vi ngầm của Git khi khởi tạo: tạo thư mục `.git`, thiết lập nhánh mặc định.",
      "Biết cách khởi tạo kho chứa với tên nhánh mặc định tùy chỉnh như `main`."
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
  "content": "# Khởi tạo kho chứa với git init\n\n---\n\n## 🎯 Mục tiêu\n- Sử dụng thành thạo câu lệnh `git init` để biến một thư mục thông thường thành một Git repository.\n- Hiểu các hành vi ngầm của Git khi khởi tạo: tạo thư mục `.git`, thiết lập nhánh mặc định.\n- Biết cách khởi tạo kho chứa với tên nhánh mặc định tùy chỉnh như `main`.\n\n---\n\n## 📖 Định nghĩa\n> `git init` là câu lệnh nền tảng đầu tiên được sử dụng để khởi tạo một Git repository mới hoàn toàn trống, hoặc chuyển đổi một thư mục mã nguồn hiện có thành một kho lưu trữ được Git quản lý. Khi thực thi lệnh này, Git sẽ tự động tạo ra thư mục ẩn `.git` tại vị trí thư mục hiện tại cùng đầy đủ cấu trúc tệp tin nội bộ và đặt con trỏ `HEAD` trỏ vào nhánh mặc định (thường là `main` hoặc `master`). Lệnh này an toàn tuyệt đối và không làm thay đổi hay xóa bỏ bất kỳ tệp tin có sẵn nào của bạn.\n\n---\n\n## 🤔 Tại sao cần?\nMọi dự án phần mềm sử dụng Git đều phải bắt đầu từ hành động khởi tạo với `git init` (hoặc nhân bản từ xa về bằng `git clone`). Nắm vững lệnh này giúp bạn tự tin biến bất kỳ thư mục bài tập, dự án cá nhân hay sản phẩm khởi nghiệp nào thành một không gian làm việc an toàn, nơi mọi dòng code bạn viết ra từ giây phút đó trở đi đều có thể được bảo vệ và theo dõi lịch sử chặt chẽ.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung việc chạy lệnh `git init` giống như lễ bấm chuông khai trương chính thức mở một cửa hiệu kinh doanh. Ngôi nhà và các kệ hàng trước đó vốn chỉ là một căn phòng trống không có quy củ. Nhưng ngay khi tiếng chuông khai trương vang lên (chạy `git init`), một nhân viên kế toán tận tụy bước vào phòng, mở cuốn sổ nhật ký thu chi trang trọng và tuyên bố: \"Kể từ thời khắc này, mọi tài sản và giao dịch ra vào cửa tiệm đều được ghi chép sổ sách minh bạch!\".\n\n---\n\n## 🖼 Sơ đồ\n```text\nTrước khi chạy git init:                Sau khi chạy git init:\nmy-project/                              my-project/\n├── app.js                               ├── .git/  <── (Vừa được tạo ra!)\n└── style.css                            ├── app.js\n(Thư mục tệp tin thường)                 └── style.css\n                                         (Kho lưu trữ Git chính thức)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn vừa tạo một thư mục mới trên máy tính có tên `ecommerce-website` để làm đồ án tốt nghiệp cuối khóa. Bạn mở terminal tại thư mục đó và gõ `git init`. Terminal lập tức thông báo: `Initialized empty Git repository in /workspace/ecommerce-website/.git/`. Kể từ thời điểm này, bạn có thể tự do tạo các tệp HTML, CSS, JavaScript và sử dụng toàn bộ sức mạnh của Git để ghi nhớ từng bước tiến độ thực hiện đồ án của mình. Bất cứ khi nào bạn thử nghiệm một tính năng thanh toán mới hay thay đổi giao diện trang chủ mà gặp lỗi, bạn đều có thể an tâm quay ngược thời gian về mốc an toàn trước đó mà không sợ mất mát dữ liệu.\n\n---\n\n## 💻 Command\n```bash\ngit init\ngit init -b main\ngit status\n```\n\n---\n\n## 🔍 Giải thích command\n- `git init`: Khởi tạo một kho lưu trữ Git rỗng mới hoàn toàn trong thư mục hiện tại của bạn.\n- `git init -b main`: Khởi tạo kho Git và chỉ định rõ tên nhánh ban đầu là `main` theo đúng tiêu chuẩn hiện đại.\n- `git status`: Xác nhận rằng kho chứa đã được khởi tạo thành công và đang ở trạng thái sẵn sàng đón nhận commit.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Chạy git init ở thư mục gốc người dùng**:  Khởi tạo Git nhầm ở `C\n2. **Chạy git init nhiều lần trong các thư mục con**:  Gây ra xung đột repository lồng nhau không mong muốn.\n3. **Lo lắng git init sẽ xóa code**:  Lệnh này hoàn toàn an toàn, chỉ tạo thêm thư mục `.git` chứ không tác động đến code hiện có.\n\n---\n\n## 🧪 Lab\n1. Kiểm tra trạng thái ban đầu bằng lệnh `git status` (nếu chưa init sẽ báo lỗi fatal).\n2. Chạy lệnh `git init` để khởi tạo kho lưu trữ Git mới.\n3. Chạy lại lệnh `git status` để xác nhận thông báo: `On branch main / No commits yet`.\n\n---\n\n## 💡 Hint\n> Chỉ cần gõ `git init` một lần duy nhất cho mỗi dự án mới.\n\n---\n\n## ✅ Validation\n- Hệ thống tạo thành công thư mục `.git` và `git status` trả về mã 0.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để kiểm tra hiểu biết về lệnh git init.\n\n---\n\n## 🔥 Challenge\nTự tạo một thư mục mới trong máy tính, khởi tạo Git và kiểm tra cấu trúc thư mục .git vừa sinh ra.\n\n---\n\n## 📚 Tổng kết\n- `git init` tạo ra một kho chứa Git mới bằng cách sinh ra thư mục ẩn `.git`.\n- Là câu lệnh bắt buộc đầu tiên để bắt đầu quản lý phiên bản cho một dự án mới.\n- An toàn tuyệt đối, không làm mất mát hay sửa đổi nội dung các tệp tin sẵn có trong thư mục.\n",
  "quiz": {
    "id": "quiz-09-git-init",
    "title": "Trắc nghiệm: Khởi tạo kho chứa với git init",
    "questions": [
      {
        "id": "q1",
        "question": "Lệnh nào dùng để khởi tạo một Git repository mới trong thư mục hiện tại?",
        "type": "single",
        "options": [
          {
            "text": "git init",
            "correct": true
          },
          {
            "text": "git start",
            "correct": false
          },
          {
            "text": "git create-repo",
            "correct": false
          },
          {
            "text": "git new",
            "correct": false
          }
        ],
        "explanation": "`git init` là câu lệnh chuẩn của Git để khởi tạo kho lưu trữ mới."
      },
      {
        "id": "q2",
        "question": "Sau khi chạy lệnh `git init` thành công, thư mục ẩn nào sẽ xuất hiện trong dự án?",
        "type": "single",
        "options": [
          {
            "text": ".git",
            "correct": true
          },
          {
            "text": ".github",
            "correct": false
          },
          {
            "text": ".svn",
            "correct": false
          },
          {
            "text": ".repository",
            "correct": false
          }
        ],
        "explanation": "Lệnh `git init` tạo ra thư mục ẩn `.git` chứa toàn bộ cơ sở dữ liệu của kho lưu trữ."
      },
      {
        "id": "q3",
        "question": "Điều gì sẽ xảy ra nếu bạn chạy `git init` trong một thư mục đã có sẵn các tệp mã nguồn HTML và CSS?",
        "type": "single",
        "options": [
          {
            "text": "Git an toàn tạo thư mục `.git` và giữ nguyên toàn bộ các tệp HTML/CSS hiện có",
            "correct": true
          },
          {
            "text": "Toàn bộ các tệp HTML/CSS sẽ bị xóa sạch để làm mới",
            "correct": false
          },
          {
            "text": "Git sẽ mã hóa các tệp tin và bắt buộc nhập mật khẩu để mở",
            "correct": false
          },
          {
            "text": "Lệnh sẽ báo lỗi và từ chối chạy trên thư mục không rỗng",
            "correct": false
          }
        ],
        "explanation": "`git init` hoàn toàn an toàn, chỉ khởi tạo hạ tầng quản lý phiên bản mà không xâm phạm tệp tin sẵn có."
      },
      {
        "id": "q4",
        "question": "Cờ tùy chọn nào cho phép bạn chỉ định tên nhánh khởi tạo ban đầu (ví dụ `main`) khi chạy `git init`?",
        "type": "single",
        "options": [
          {
            "text": "-b <tên-nhánh> hoặc --initial-branch=<tên-nhánh>",
            "correct": true
          },
          {
            "text": "--name=<tên-nhánh>",
            "correct": false
          },
          {
            "text": "--set-branch-first",
            "correct": false
          },
          {
            "text": "-m <tên-nhánh>",
            "correct": false
          }
        ],
        "explanation": "Cú pháp `git init -b main` hoặc `git init --initial-branch=main` thiết lập tên nhánh mặc định ngay khi khởi tạo."
      }
    ]
  }
};
export default lesson;
