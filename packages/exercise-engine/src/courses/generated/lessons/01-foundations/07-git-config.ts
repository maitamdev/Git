import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "07-git-config",
  "moduleId": "01-foundations",
  "metadata": {
    "id": "07-git-config",
    "title": "Cấu hình danh tính Git bằng git config",
    "level": "beginner",
    "duration": 25,
    "xp": 70,
    "prerequisites": [
      "06-git-installation"
    ],
    "objectives": [
      "Đặt tên và email để Git ghi vào các commit mới.",
      "Dùng phạm vi global cho cấu hình mặc định của tài khoản máy tính.",
      "Xem lại cấu hình đang có bằng `git config --list`."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git config",
      "user.name",
      "user.email",
      "danh tinh",
      "author"
    ],
    "commands": [
      "git config --global user.name \"Student Name\"",
      "git config --global user.email \"student@example.com\"",
      "git config --list"
    ]
  },
  "content": "# Cấu hình danh tính Git bằng git config: Định danh tác giả chuyên nghiệp\n\n---\n\n## 🎯 Mục tiêu\n- Thiết lập danh tính tác giả chuẩn mực (`user.name` và `user.email`) trước khi thực hiện commit đầu tiên.\n- Thấu hiểu và làm chủ ba tầng phạm vi cấu hình của Git: `--system`, `--global` và `--local`.\n- Nắm vững nguyên tắc ưu tiên ghi đè để linh hoạt chuyển đổi giữa dự án cá nhân và công việc công ty.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### `git config` — Lệnh quản trị cấu hình\n- **Nói dễ hiểu:** Công cụ thiết lập và tùy biến mọi hành vi hoạt động của Git trên máy tính của bạn.\n- **Ví dụ:** Bạn gõ `git config --global user.name \"Nguyen Van A\"` để khai báo tên mình cho toàn bộ dự án.\n- **Đừng nhầm:** Cấu hình Git chỉ lưu cài đặt phần mềm; nó không phải là thao tác đăng nhập tài khoản đám mây.\n\n### `user.name` — Chữ ký tên tác giả\n- **Nói dễ hiểu:** Họ và tên mà Git sẽ tự động đóng dấu lên mọi mốc commit do bạn tạo ra.\n- **Ví dụ:** Tên hiển thị trên lịch sử commit là \"Hoàng Minh Tuấn\".\n- **Đừng nhầm:** Đây là nhãn định danh tác giả do bạn tự đặt; nó không thay thế cho tên đăng nhập tài khoản GitHub.\n\n### `user.email` — Địa chỉ thư điện tử tác giả\n- **Nói dễ hiểu:** Email liên hệ được gắn vĩnh viễn vào thông tin của từng commit trong lịch sử dự án.\n- **Ví dụ:** Địa chỉ email gắn kèm commit để GitHub liên kết chính xác với hồ sơ cá nhân của bạn.\n- **Đừng nhầm:** Email tác giả chỉ là dòng chữ ký thông tin; nó không chứa mật khẩu và không tự cấp quyền truy cập kho code.\n\n### `--global` — Phạm vi người dùng máy tính\n- **Nói dễ hiểu:** Cấp độ cấu hình áp dụng tự động cho toàn bộ các repository thuộc tài khoản người dùng hiện tại trên máy tính.\n- **Ví dụ:** Đặt một lần cho laptop cá nhân để từ nay mọi bài tập tạo ra đều tự nhận tên của bạn.\n- **Đừng nhầm:** Global chỉ có giá trị trên chiếc máy tính bạn đang ngồi, không hề đồng bộ cài đặt này lên đám mây.\n\n### `--local` — Phạm vi riêng biệt từng dự án\n- **Nói dễ hiểu:** Cấp độ cấu hình đặc quyền chỉ có hiệu lực bên trong duy nhất một repository cụ thể.\n- **Ví dụ:** Dự án của công ty yêu cầu bạn phải dùng email doanh nghiệp thay vì email cá nhân.\n- **Đừng nhầm:** Cấu hình local có mức độ ưu tiên cao nhất và sẽ ghi đè lên cấu hình global.\n\n---\n\n## 🤔 Tại sao cần?\nTrong môi trường doanh nghiệp, lịch sử commit là bằng chứng rõ ràng nhất về trách nhiệm của từng kỹ sư. Nếu bạn không cấu hình danh tính, Git sẽ từ chối commit hoặc tự ý lấy tên tài khoản máy tính như `Admin` rất thiếu chuyên nghiệp. Đặc biệt khi bạn vừa làm việc công ty vừa tham gia dự án nguồn mở, việc làm chủ các phạm vi cấu hình giúp bạn không bao giờ bị lẫn lộn giữa email doanh nghiệp và email cá nhân.\n\n---\n\n## 📖 Định nghĩa\n`git config` là lệnh quản trị các thiết lập vận hành của Git. Hai tham số quan trọng nhất là `user.name` và `user.email`, cấu thành chữ ký định danh gắn vào từng commit. Cấu hình được chia thành ba cấp độ: system cho toàn hệ thống, global cho tài khoản người dùng và local cho từng repository cụ thể.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy coi mỗi commit như một lá thư tay bạn gửi cho tương lai. `user.name` là tên người gửi và `user.email` là địa chỉ liên lạc ghi trên phong bì. Cấu hình `--global` giống như con dấu khắc sẵn tên bạn để đóng lên mọi phong bì; còn `--local` là chiếc tem đặc biệt riêng cho một đối tác quan trọng.\n\n---\n\n## 🖼 Sơ đồ\n```text\nThứ tự ưu tiên ghi đè (Càng hẹp càng ưu tiên):\n[--local: Thư mục dự án hiện tại] (Ưu tiên số 1 - Đè lên tất cả)\n               ▲\n[--global: Tài khoản máy của bạn] (Ưu tiên số 2 - Mặc định hàng ngày)\n               ▲\n[--system: Toàn bộ hệ điều hành] (Ưu tiên số 3 - Thiết lập chung)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKỹ sư Nam làm việc tại ngân hàng và dùng laptop cá nhân. Với các bài tập cá nhân, Nam cấu hình `--global` với email riêng. Nhưng khi làm việc trong dự án ngân hàng, Nam vào thư mục đó và gõ lệnh với cờ `--local` để dùng email doanh nghiệp. Mọi commit ở dự án ngân hàng đều mang danh tính công ty chuẩn mực mà không ảnh hưởng tới dự án khác.\n\n---\n\n## 💻 Command\n```bash\ngit config --global user.name \"Nguyen Van A\"\ngit config --global user.email \"vana@example.com\"\ngit config --list\n```\n\n---\n\n## 🔍 Giải thích command\n- `git config --global user.name`: Thiết lập họ tên hiển thị của bạn trên mọi commit tạo ra trên chiếc máy tính này.\n- `git config --global user.email`: Thiết lập địa chỉ email gắn vào siêu dữ liệu tác giả của commit.\n- `git config --list`: In ra toàn bộ bảng danh sách các tham số cấu hình hiện hành để bạn kiểm tra và rà soát tính chính xác.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Lầm tưởng `user.email` là mật khẩu đăng nhập GitHub:** Đây chỉ là chữ ký định danh tác giả; việc xác thực đẩy code lên GitHub sử dụng cơ chế bảo mật hoàn toàn riêng biệt.\n2. **Gõ nhầm lệnh cấu hình `--local` khi đang đứng ngoài kho chứa:** Cờ `--local` bắt buộc bạn phải đang đứng bên trong một thư mục đã khởi tạo Git, nếu không Git sẽ báo lỗi.\n3. **Đặt tên hoặc email giả mạo, thiếu nghiêm túc:** Đi làm thực tế, commit mang tên biệt danh ngớ ngẩn sẽ bị từ chối ngay trong khâu duyệt mã nguồn của dự án.\n\n---\n\n## 🧪 Lab\n1. Mở cửa sổ dòng lệnh và cấu hình tên hiển thị đầy đủ của bạn bằng lệnh `git config --global user.name`.\n2. Cấu hình email chính thức của bạn bằng lệnh `git config --global user.email`.\n3. Chạy `git config --list` và xác nhận rằng hai thông số trên đã xuất hiện chuẩn xác trong danh sách cấu hình.\n\n---\n\n## 💡 Hint\nHãy dùng địa chỉ email trùng với email bạn đăng ký tài khoản GitHub để sau này khi đẩy code lên mạng, GitHub sẽ tự động nhận diện và tính điểm hoạt động vào biểu đồ đóng góp của bạn.\n\n---\n\n## ✅ Validation\n- Lệnh `git config --list` phản hồi chính xác tên và email mà bạn vừa cấu hình.\n- Trình bày được thứ tự ưu tiên ghi đè giữa `--local`, `--global` và `--system`.\n- Phân biệt rõ sự khác nhau giữa chữ ký commit và thông tin xác thực mật khẩu.\n\n---\n\n## ❓ Quiz\nThực hiện bài kiểm tra trắc nghiệm dưới đây để nắm vững quy tắc cấu hình danh tính trong Git. Đọc kỹ phân tích từ giảng viên.\n\n---\n\n## 🔥 Challenge\nHãy nêu kịch bản thực tế khi nào bạn bắt buộc phải dùng cờ `--local` thay vì `--global` và kiểm tra xem file cấu hình local được Git cất giấu ở đâu trong thư mục dự án.\n\n---\n\n## 📚 Tổng kết\n- Cấu hình danh tính `user.name` và `user.email` là bước chuẩn bị bắt buộc trước khi tạo ra bất kỳ commit nào.\n- Thứ tự ưu tiên cấu hình luôn tuân theo nguyên tắc: `--local` (dự án) đè lên `--global` (người dùng), `--global` đè lên `--system` (hệ thống).\n- Sử dụng `git config --list` là biện pháp hữu hiệu nhất để kiểm tra môi trường trước khi bắt tay vào dự án mới.\n\n",
  "quiz": {
    "id": "quiz-07-git-config",
    "title": "Trắc nghiệm: Cấu hình danh tính Git",
    "questions": [
      {
        "id": "q1",
        "question": "Thông tin nào Git thường dùng làm tên và email tác giả cho commit mới?",
        "type": "single",
        "options": [
          {
            "text": "`user.name` và `user.email`",
            "correct": true
          },
          {
            "text": "`commit.title` và `commit.branch`",
            "correct": false
          },
          {
            "text": "`remote.name` và `remote.url`",
            "correct": false
          },
          {
            "text": "Tên tài khoản và mật khẩu đăng nhập GitHub",
            "correct": false
          }
        ],
        "explanation": "Git dùng `user.name` và `user.email` làm thông tin tác giả trong commit. Chúng không phải mật khẩu đăng nhập GitHub."
      },
      {
        "id": "q2",
        "question": "Trong ba phạm vi system, global và local đang học, phạm vi nào được ưu tiên cao nhất?",
        "type": "single",
        "options": [
          {
            "text": "`--local`, vì chỉ áp dụng trong repository hiện tại",
            "correct": true
          },
          {
            "text": "`--system`, vì áp dụng cho tất cả người dùng trên máy",
            "correct": false
          },
          {
            "text": "`--global`, vì áp dụng cho nhiều repository của một tài khoản",
            "correct": false
          },
          {
            "text": "Cả ba phạm vi luôn có giá trị ngang nhau",
            "correct": false
          }
        ],
        "explanation": "Trong ba phạm vi này, cấu hình local của repository ưu tiên global; global lại ưu tiên system."
      },
      {
        "id": "q3",
        "question": "Lệnh nào liệt kê các giá trị cấu hình Git hiện có?",
        "type": "single",
        "options": [
          {
            "text": "`git config --list`",
            "correct": true
          },
          {
            "text": "`git config user.name`",
            "correct": false
          },
          {
            "text": "`git status --short`",
            "correct": false
          },
          {
            "text": "`git log --oneline`",
            "correct": false
          }
        ],
        "explanation": "`git config --list` liệt kê các thiết lập Git mà chương trình đang đọc. Lệnh truy vấn riêng chỉ hiển thị một giá trị."
      },
      {
        "id": "q4",
        "question": "`user.email` có phải mật khẩu dùng để đăng nhập GitHub không?",
        "type": "single",
        "options": [
          {
            "text": "Không; đó là email được ghi trong thông tin commit mới",
            "correct": true
          },
          {
            "text": "Có; Git mã hóa email thành mật khẩu trước khi push",
            "correct": false
          },
          {
            "text": "Có; đó là mã xác nhận để cấp quyền push",
            "correct": false
          },
          {
            "text": "Không; đó là địa chỉ remote của repository",
            "correct": false
          }
        ],
        "explanation": "Email cấu hình giúp nhận diện tác giả trong commit. Nó không đăng nhập vào GitHub và không tự cấp quyền truy cập repository."
      },
      {
        "id": "q5",
        "question": "Bạn muốn dùng email tác giả riêng chỉ trong một repository. Nên chọn phạm vi nào?",
        "type": "single",
        "options": [
          {
            "text": "`--local`, khi đang ở repository đó",
            "correct": true
          },
          {
            "text": "`--global`, để đổi mặc định cho mọi repository của tài khoản",
            "correct": false
          },
          {
            "text": "`--system`, để đổi mặc định cho tất cả người dùng trên máy",
            "correct": false
          },
          {
            "text": "Không cần phạm vi; Git sẽ tự chọn email theo tên thư mục",
            "correct": false
          }
        ],
        "explanation": "Cấu hình local chỉ áp dụng cho repository hiện tại. Cần chạy lệnh bên trong repository muốn đặt email riêng."
      }
    ]
  }
};
export default lesson;
