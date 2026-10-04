import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "10-gitignore",
  "moduleId": "02-git-basics",
  "metadata": {
    "id": "10-gitignore",
    "title": "Bỏ qua tệp chưa cần đưa vào Git bằng .gitignore",
    "level": "beginner",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "05-git-add"
    ],
    "objectives": [
      "Tạo quy tắc đơn giản để Git bỏ qua tệp chưa được theo dõi.",
      "Dùng git check-ignore -v để tìm quy tắc khớp.",
      "Nhận biết .gitignore không ảnh hưởng tệp đã tracked hay xóa bí mật khỏi lịch sử cũ."
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
      "git status",
      "git check-ignore -v <file>"
    ]
  },
  "content": "# Bỏ qua tệp chưa cần đưa vào Git bằng `.gitignore`\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ vai trò sống còn của tệp `.gitignore` trong việc bảo vệ và tinh giản kho mã nguồn.\n- Nắm vững cú pháp mẫu (Pattern) để bỏ qua tệp rác build, nhật ký log và thư mục dependencies.\n- Sử dụng thành thạo `git check-ignore -v` để gỡ lỗi và truy vết các quy tắc loại trừ.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### `.gitignore` — danh sách mẫu cần bỏ qua\n- **Nói dễ hiểu:** Tệp văn bản khai báo danh sách đen các tệp và thư mục mà Git tuyệt đối không được đưa vào diện theo dõi.\n- **Ví dụ:** Khai báo `*.log` hoặc `node_modules/` ngay trong file `.gitignore` ở thư mục gốc repo.\n- **Đừng nhầm:** `.gitignore` chỉ hướng dẫn Git lờ file đi, hoàn toàn không xóa hay can thiệp vào file vật lý trên đĩa cứng.\n\n### Pattern — mẫu tên cần khớp\n- **Nói dễ hiểu:** Cú pháp quy tắc ký tự đại diện (globbing) giúp Git nhận diện hàng loạt tệp tin cần loại trừ.\n- **Ví dụ:** `*.env` khớp tất cả file đuôi env; `dist/` khớp toàn bộ thư mục đầu ra của quá trình build.\n- **Đừng nhầm:** Mẫu quy tắc chỉ có hiệu lực với những đường dẫn khớp chính xác cú pháp khai báo; gõ sai một dấu gạch chéo có thể làm mất tác dụng.\n\n### Tracked — tệp Git đã theo dõi\n- **Nói dễ hiểu:** Những tệp tin đã từng được commit vào lịch sử hoặc đang nằm sẵn trong Staging Area từ trước.\n- **Ví dụ:** Nếu bạn lỡ commit file `config.env` từ tuần trước, việc thêm nó vào `.gitignore` hôm nay sẽ KHÔNG làm Git ngừng theo dõi nó.\n- **Đừng nhầm:** `.gitignore` chỉ áp dụng cho tệp Untracked; muốn lờ tệp đã Tracked, bạn phải dùng lệnh xóa khỏi index bằng `git rm --cached`.\n\n### `git check-ignore` — tìm quy tắc khớp\n- **Nói dễ hiểu:** Lệnh kiểm toán quyền lực giúp bạn tra cứu chính xác dòng quy tắc nào trong `.gitignore` đang chặn tệp của bạn.\n- **Ví dụ:** `git check-ignore -v dist/bundle.js` sẽ in ra số dòng và pattern cụ thể đang tác động lên file.\n- **Đừng nhầm:** Lệnh chỉ làm nhiệm vụ thanh tra và giải trình nguyên nhân, không làm thay đổi nội dung file `.gitignore`.\n\n---\n\n## 📖 Định nghĩa\n`.gitignore` là tệp cấu hình đặc biệt đặt ở thư mục dự án, quy định danh sách các mẫu đường dẫn mà Git phải cố tình phớt lờ. Khi một tệp khớp với quy tắc trong `.gitignore`, Git sẽ không hiển thị nó ở mục Untracked và ngăn không cho bạn vô tình đưa vào Staging Area qua các lệnh thêm hàng loạt.\n\n---\n\n## 🤔 Tại sao cần?\nDự án thực tế luôn sinh ra hàng nghìn tệp phụ trợ: thư viện phụ thuộc (`node_modules`), sản phẩm biên dịch (`dist`, `build`), tệp nhật ký ghi đè liên tục (`*.log`) và tệp biến môi trường chứa thông tin bảo mật (`.env`). Nếu không có `.gitignore`, kho mã nguồn sẽ phình to khủng khiếp, xung đột triền miên và đối mặt với thảm họa an ninh mạng khi lộ mật khẩu cơ sở dữ liệu lên Internet.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy xem `.gitignore` như một nhân viên bảo vệ đứng gác tại cửa vào kho lưu trữ với một danh sách đen (blacklist). Bất kỳ tệp nào mang họ tên hoặc đặc điểm nằm trong danh sách (như tệp có đuôi `.log` hay thư mục `node_modules/`) đều bị chặn ngoài cửa, không được phép bước vào khu vực theo dõi của Git.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCƠ CHẾ LỌC CỦA .GITIGNORE:\n  Tệp mới tạo trong dự án\n        │\n        ├── Khớp quy tắc trong .gitignore?\n        │      ├── CÓ: ──► Bị bỏ qua, ẩn khỏi git status (Untracked)\n        │      └── KHÔNG: ──► Hiện trong git status (Untracked) ──► Có thể git add\n        │\n  Tệp đã được Git theo dõi từ trước (Tracked):\n        └── Bất chấp .gitignore! Vẫn tiếp tục bị Git theo dõi mọi thay đổi!\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrong dự án NodeJS, thư mục `node_modules` có thể nặng tới 500MB với hàng chục nghìn tệp nhỏ. Chỉ cần ghi một dòng `node_modules/` vào `.gitignore`, `git status` sẽ lập tức sạch sẽ tinh tươm. Đồng đội tải dự án về chỉ cần chạy lệnh cài đặt package thay vì phải tốn hàng giờ đồng hồ để tải cả kho thư viện rác qua Git.\n\n---\n\n## 💻 Command\nTạo tệp `.gitignore` và ghi các quy tắc mẫu:\n```text\n*.log\nnode_modules/\n.env\ndist/\n```\nSau đó kiểm tra và xác thực quy tắc bằng terminal:\n```bash\ngit status\ngit check-ignore -v debug.log\n```\n\n---\n\n## 🔍 Giải thích command\n- `*.log`: Mẫu ký tự đại diện khớp với mọi tệp có phần mở rộng kết thúc bằng `.log` ở bất kỳ thư mục nào.\n- `node_modules/`: Dấu gạch chéo ở cuối chỉ thị bỏ qua toàn bộ nội dung của thư mục mang tên này.\n- `git check-ignore -v <đường-dẫn>`: Trả về tên file `.gitignore`, số dòng và nội dung pattern đã khớp, giúp bạn hiểu tại sao file bị bỏ qua.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Lầm tưởng `.gitignore` tự động bỏ qua file đã commit**: Thêm file vào `.gitignore` sau khi đã commit sẽ hoàn toàn vô tác dụng; bạn phải gỡ nó khỏi index bằng `git rm --cached`.\n2. **Commit tệp `.env` chứa mật khẩu lên GitHub rồi mới thêm vào `.gitignore`**: Toàn bộ lịch sử commit cũ vẫn chứa mật khẩu công khai; bạn phải đổi mật khẩu ngay lập tức!\n3. **Quên commit chính tệp `.gitignore`**: Tệp cấu hình này cần được commit để các thành viên khác trong nhóm cùng nhận được quy tắc loại trừ.\n\n---\n\n## 🧪 Lab\n1. Tạo tệp `debug.log` với nội dung bất kỳ trong dự án.\n2. Chạy `git status` và thấy `debug.log` xuất hiện trong mục Untracked files màu đỏ.\n3. Tạo tệp `.gitignore` và ghi một dòng quy tắc duy nhất: `*.log`, sau đó lưu lại.\n4. Chạy lại `git status`; quan sát thấy `debug.log` đã biến mất hoàn toàn khỏi danh sách Untracked files.\n5. Chạy lệnh `git check-ignore -v debug.log` để kiểm tra dòng quy tắc khớp.\n\n---\n\n## 💡 Hint\n> Hãy thêm `.gitignore` ngay từ commit đầu tiên của dự án trước khi cài đặt bất kỳ thư viện hay chạy build nào!\n\n---\n\n## ✅ Validation\n- Tệp `debug.log` vẫn tồn tại an toàn trên ổ đĩa nhưng không xuất hiện trong `git status`.\n- Lệnh `git check-ignore -v debug.log` trả về kết quả khớp với dòng `*.log`.\n\n---\n\n## ❓ Quiz\nTrả lời bài trắc nghiệm dưới đây để nắm vững quy tắc viết pattern và cơ chế hoạt động của `.gitignore`.\n\n---\n\n## 🔥 Challenge\nGiả sử bạn đã lỡ commit file `database.env` lên Git từ tuần trước. Hôm nay bạn thêm dòng `database.env` vào file `.gitignore`. Chạy `git status` sau khi sửa nội dung file đó, bạn thấy Git vẫn báo file bị `modified`. Hãy giải thích tại sao và nêu phương án xử lý triệt để?\n\n---\n\n## 📚 Tổng kết\n- `.gitignore` ngăn chặn việc đưa các tệp rác, file build và bí mật bảo mật vào Git.\n- Quy tắc trong `.gitignore` chỉ áp dụng cho các tệp Untracked, không có tác dụng với tệp đã Tracked.\n- Sử dụng `git check-ignore -v` là cách chuẩn chỉ để gỡ lỗi và kiểm tra tính hiệu lực của các mẫu pattern.\n",
  "quiz": {
    "id": "quiz-02-10-gitignore",
    "title": "Trắc nghiệm: Bỏ qua tệp với .gitignore",
    "questions": [
      {
        "id": "q1",
        "question": "Một dự án tạo nhiều tệp có đuôi `.log`. Bạn muốn bỏ qua các tệp log mới. Nên thêm dòng nào vào `.gitignore`?",
        "type": "single",
        "options": [
          {
            "text": "*.log",
            "correct": true
          },
          {
            "text": "debug.log",
            "correct": false
          },
          {
            "text": "git ignore .log",
            "correct": false
          },
          {
            "text": "/log-all",
            "correct": false
          }
        ],
        "explanation": "`*.log` dùng ký tự đại diện để khớp các tên kết thúc bằng `.log`."
      },
      {
        "id": "q2",
        "question": "Sau khi tạo `debug.log` và thêm `*.log` vào `.gitignore`, điều gì sẽ xảy ra?",
        "type": "single",
        "options": [
          {
            "text": "Tệp vẫn nằm trên máy nhưng không hiện như tệp Untracked trong `git status`",
            "correct": true
          },
          {
            "text": "Tệp bị xóa khỏi máy tính",
            "correct": false
          },
          {
            "text": "Tệp tự được commit",
            "correct": false
          },
          {
            "text": "Tệp được gửi lên GitHub",
            "correct": false
          }
        ],
        "explanation": "Quy tắc ignore ẩn tệp chưa tracked khỏi danh sách thay đổi; nó không xóa tệp hay tạo commit."
      },
      {
        "id": "q3",
        "question": "Lệnh nào cho biết vì sao `debug.log` bị bỏ qua?",
        "type": "single",
        "options": [
          {
            "text": "`git check-ignore -v debug.log`",
            "correct": true
          },
          {
            "text": "`git log debug.log`",
            "correct": false
          },
          {
            "text": "`git diff debug.log`",
            "correct": false
          },
          {
            "text": "`git commit debug.log`",
            "correct": false
          }
        ],
        "explanation": "Tùy chọn `-v` cho biết quy tắc và dòng trong `.gitignore` đã khớp với tệp."
      },
      {
        "id": "q4",
        "question": "Một tệp đã được commit trước khi bạn thêm tên của nó vào `.gitignore`. Git sẽ làm gì?",
        "type": "single",
        "options": [
          {
            "text": "Tiếp tục theo dõi tệp đó; `.gitignore` không xóa nội dung trong commit cũ",
            "correct": true
          },
          {
            "text": "Xóa tệp khỏi tất cả commit trước đó",
            "correct": false
          },
          {
            "text": "Tự mã hóa nội dung tệp",
            "correct": false
          },
          {
            "text": "Chặn mọi người mở repository",
            "correct": false
          }
        ],
        "explanation": "`.gitignore` chủ yếu áp dụng cho đường dẫn chưa tracked; tệp đã tracked cần được xử lý riêng."
      },
      {
        "id": "q5",
        "question": "Vì sao không nên coi `.gitignore` là cách bảo vệ mật khẩu đã commit?",
        "type": "single",
        "options": [
          {
            "text": "Quy tắc không xóa bí mật khỏi lịch sử cũ; cần thay bí mật đã lộ",
            "correct": true
          },
          {
            "text": "`.gitignore` chỉ hoạt động khi không có mật khẩu",
            "correct": false
          },
          {
            "text": "Mật khẩu sẽ tự hiện lại sau một ngày",
            "correct": false
          },
          {
            "text": "Mọi tệp ignore đều được gửi tự động lên máy chủ",
            "correct": false
          }
        ],
        "explanation": "Thêm quy tắc không thay đổi commit trước; bí mật đã lộ cần được thay và xử lý lịch sử riêng."
      }
    ]
  }
};
export default lesson;
