import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "03-origin-concept",
  "moduleId": "04-github-collaboration",
  "metadata": {
    "id": "03-origin-concept",
    "title": "origin trong Git là gì?",
    "level": "intermediate",
    "duration": 20,
    "xp": 70,
    "prerequisites": [
      "02-git-remote"
    ],
    "objectives": [
      "Giải thích bản chất tên gọi `origin` trong Git như một quy ước đặt tên mặc định.",
      "Hiểu vì sao khi clone một dự án, Git tự động đặt tên remote chính là `origin`.",
      "Biết rằng `origin` hoàn toàn có thể đổi thành bất kỳ tên nào khác tùy thích.",
      "Phân biệt rõ ràng giữa tên gọi `origin` và các từ khóa kỹ thuật bắt buộc của hệ thống."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "origin",
      "default remote",
      "ten mac dinh",
      "quy uoc git",
      "remote name"
    ],
    "commands": [
      "git remote -v",
      "git remote rename origin my-server",
      "git remote rename my-server origin"
    ]
  },
  "content": "# origin trong Git là gì?\n\n---\n\n## 🎯 Mục tiêu\n- Giải thích bản chất tên gọi `origin` trong Git như một quy ước đặt tên mặc định.\n- Hiểu vì sao khi clone một dự án, Git tự động đặt tên remote chính là `origin`.\n- Biết rằng `origin` hoàn toàn có thể đổi thành bất kỳ tên nào khác tùy thích.\n- Phân biệt rõ ràng giữa tên gọi `origin` và các từ khóa kỹ thuật bắt buộc của hệ thống.\n\n---\n\n## 📖 Định nghĩa\n> `origin` trong Git hoàn toàn không phải là một từ khóa kỹ thuật kỳ diệu hay một câu lệnh bắt buộc, mà đơn thuần là một cái tên quy ước mặc định (default convention alias) mà Git tự động gán cho kho lưu trữ từ xa mà bạn đã nhân bản (clone) dự án về. Nếu bạn tự khởi tạo kho bằng `git init`, bạn hoàn toàn có thể đặt tên remote là `github`, `server`, `cong-ty` hoặc bất kỳ cái tên nào bạn thích, nhưng cộng đồng toàn cầu đều thống nhất dùng `origin` để việc hợp tác trở nên dễ hiểu.\n\n---\n\n## 🤔 Tại sao cần?\nRất nhiều người mới học Git lầm tưởng `origin` là một câu lệnh huyền bí của Git và không hiểu vì sao mình luôn phải gõ `git push origin main`. Nhận thức được `origin` chỉ là một cái tên quy ước giúp bạn gạt bỏ sự mơ hồ, hiểu rõ cấu trúc của lệnh Git và tự tin làm việc với các hệ thống phức tạp có nhiều remote cùng lúc như quy trình đóng góp mã nguồn mở Open Source. Bạn cũng sẽ dễ dàng cấu hình các đường ống CI/CD tự động mà không gặp phải các lỗi khó hiểu.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung bạn cài đặt một số gọi nhanh (Speed Dial số 1) trên điện thoại và đặt tên danh bạ cho số đó là \"Nhà\" (Home). Bạn hoàn toàn có thể đổi tên danh bạ đó thành \"Gia đình\" hay \"Tổ ấm\" tùy ý, điện thoại vẫn bấm đúng số đó. Nhưng hầu hết mọi người trên thế giới đều quen cài nút số 1 là \"Nhà\". Tương tự như vậy, `origin` chính là nút gọi nhanh số 1 kết nối thẳng tới kho máy chủ chính của dự án.\n\n---\n\n## 🖼 Sơ đồ\n```text\nBản chất quy ước của tên gọi origin:\nLệnh gõ: git push origin main\n                  │\n                  ▼\n         (Bí danh quy ước)\n         [origin] ──► https://github.com/acme/project.git\n         (Có thể đổi thành 'my-cloud' mà hệ thống vẫn chạy chuẩn)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột lập trình viên tò mò muốn kiểm tra xem origin có phải từ khóa bất biến hay không. Lập trình viên chạy lệnh: `git remote rename origin central-hub`. Kể từ thời điểm đó, mỗi khi muốn đẩy code lên nhánh main của máy chủ, lập trình viên gõ: `git push central-hub main`. Mọi chức năng vẫn hoạt động hoàn hảo 100%. Tuy nhiên, để các đồng nghiệp mới vào nhóm không bị bỡ ngỡ khi đọc tài liệu hướng dẫn và để đảm bảo tính đồng bộ lâu dài, lập trình viên quyết định đổi tên lại thành `origin` cho đúng chuẩn mực quốc tế chung mà toàn thể giới công nghệ đang áp dụng.\n\n---\n\n## 💻 Command\n```bash\ngit remote -v\ngit remote rename origin my-server\ngit remote rename my-server origin\n```\n\n---\n\n## 🔍 Giải thích command\n- `git remote -v`: Quan sát tên bí danh hiện tại đang liên kết với URL nào của dự án.\n- `git remote rename origin <tên-mới>`: Đổi tên quy ước mặc định origin sang một tên bất kỳ tùy thích theo nhu cầu dự án.\n- `git remote rename <tên-mới> origin`: Đưa tên bí danh trở lại chuẩn mực chung của cộng đồng lập trình viên toàn cầu.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ origin là một lệnh đặc biệt**:  Lầm tưởng origin có chức năng riêng chứ không biết nó chỉ là tên gọi đại diện cho URL.\n2. **Đặt tên remote tùy tiện trong dự án nhóm**:  Gây khó khăn cho các script tự động hóa CI/CD vốn mặc định tìm tên origin.\n3. **Hoang mang khi tài liệu hướng dẫn dùng tên khác**:  Ví dụ upstream trong các dự án fork mã nguồn mở.\n\n---\n\n## 🧪 Lab\n1. Chạy lệnh `git remote` và xác nhận kết quả in ra là `origin`.\n2. Thử đổi tên `origin` thành `github-main` bằng `git remote rename origin github-main`.\n3. Chạy `git remote -v` để thấy bí danh mới hoạt động bình thường.\n4. Đổi lại thành `origin` bằng lệnh `git remote rename github-main origin`.\n\n---\n\n## 💡 Hint\n> Mặc dù có thể đổi tên, bạn luôn nên giữ tên `origin` để tuân thủ quy ước chuẩn quốc tế.\n\n---\n\n## ✅ Validation\n- Hiểu rõ nguồn gốc và bản chất quy ước của tên gọi `origin`.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về khái niệm origin trong Git.\n\n---\n\n## 🔥 Challenge\nTại sao các công cụ CI/CD tự động như GitHub Actions luôn mặc định cấu hình tên remote là origin?\n\n---\n\n## 📚 Tổng kết\n- `origin` là tên quy ước mặc định do Git tự động đặt khi clone dự án.\n- Nó không phải từ khóa ma thuật, mà chỉ là bí danh trỏ tới URL của server.\n- Nên luôn giữ tên `origin` để tương thích tốt nhất với đồng nghiệp và hệ thống tự động.\n",
  "quiz": {
    "id": "quiz-04-03-origin-concept",
    "title": "Trắc nghiệm: Bản chất origin trong Git",
    "questions": [
      {
        "id": "q1",
        "question": "Từ ngữ `origin` trong câu lệnh `git push origin main` có bản chất thực sự là gì?",
        "type": "single",
        "options": [
          {
            "text": "Là tên định danh (bí danh alias) quy ước đại diện cho địa chỉ URL của kho lưu trữ từ xa",
            "correct": true
          },
          {
            "text": "Là một câu lệnh bắt buộc của nhân hệ điều hành Linux",
            "correct": false
          },
          {
            "text": "Là tên tài khoản người sáng lập ra hệ thống Git",
            "correct": false
          },
          {
            "text": "Là giao thức truyền file bí mật qua Internet",
            "correct": false
          }
        ],
        "explanation": "`origin` chỉ là bí danh đặt tên cho URL của server từ xa, hoàn toàn có thể đổi sang tên khác nếu muốn."
      },
      {
        "id": "q2",
        "question": "Khi bạn chạy lệnh `git clone <url>`, tên remote mặc định mà Git tự động tạo cho kho vừa tải về là gì?",
        "type": "single",
        "options": [
          {
            "text": "origin",
            "correct": true
          },
          {
            "text": "master",
            "correct": false
          },
          {
            "text": "github",
            "correct": false
          },
          {
            "text": "remote-server",
            "correct": false
          }
        ],
        "explanation": "Git clone tự động đặt tên cho remote kết nối tới nguồn gốc là `origin`."
      },
      {
        "id": "q3",
        "question": "Bạn có thể đổi tên `origin` thành một tên khác như `my-github` được hay không?",
        "type": "single",
        "options": [
          {
            "text": "Hoàn toàn được, bằng câu lệnh `git remote rename origin my-github`",
            "correct": true
          },
          {
            "text": "Không bao giờ được, Git sẽ báo lỗi hỏng kho chứa ngay",
            "correct": false
          },
          {
            "text": "Chỉ được đổi khi trả phí bản quyền cho GitHub",
            "correct": false
          },
          {
            "text": "Chỉ được đổi trên máy tính chạy macOS",
            "correct": false
          }
        ],
        "explanation": "Bạn có toàn quyền đổi tên remote bằng lệnh `git remote rename`."
      },
      {
        "id": "q4",
        "question": "Tại sao các kỹ sư phần mềm trên thế giới hầu như đều giữ nguyên tên `origin` thay vì đổi tên khác?",
        "type": "single",
        "options": [
          {
            "text": "Để tuân thủ chuẩn mực quy ước toàn cầu, giúp tài liệu, đồng nghiệp và công cụ CI/CD hoạt động thống nhất",
            "correct": true
          },
          {
            "text": "Vì nếu đổi tên thì dung lượng dự án sẽ tăng gấp mười lần",
            "correct": false
          },
          {
            "text": "Vì luật pháp quốc tế bắt buộc phải dùng chữ origin",
            "correct": false
          },
          {
            "text": "Vì bàn phím máy tính không gõ được chữ khác",
            "correct": false
          }
        ],
        "explanation": "Quy ước chung giúp tiết kiệm thời gian giải thích và tránh lỗi cấu hình trong các quy trình tự động."
      }
    ]
  }
};
export default lesson;
