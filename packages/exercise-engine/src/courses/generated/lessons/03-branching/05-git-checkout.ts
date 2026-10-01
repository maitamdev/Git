import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "05-git-checkout",
  "moduleId": "03-branching",
  "metadata": {
    "id": "05-git-checkout",
    "title": "Lệnh git checkout và lịch sử",
    "level": "intermediate",
    "duration": 20,
    "xp": 70,
    "prerequisites": [
      "04-git-switch"
    ],
    "objectives": [
      "Hiểu bối cảnh lịch sử và tính đa năng của lệnh truyền thống `git checkout`.",
      "Phân biệt rõ ràng các trường hợp sử dụng của `git checkout`: chuyển nhánh, xem commit cũ, và hoàn tác tệp.",
      "Nắm bắt lý do chuyển dịch sang bộ đôi lệnh hiện đại `git switch` và `git restore`."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git checkout",
      "lich su git",
      "switch vs checkout",
      "da nang",
      "legacy command"
    ],
    "commands": [
      "git checkout <tên-nhánh>",
      "git checkout -b <tên-nhánh-mới>",
      "git checkout -- <tên-tệp>"
    ]
  },
  "content": "# Lệnh git checkout và lịch sử\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu bối cảnh lịch sử và tính đa năng của lệnh truyền thống `git checkout`.\n- Phân biệt các trường hợp dùng `git checkout` để đọc hiểu các tài liệu và dự án cũ.\n- Đối chiếu các cú pháp cũ của checkout với bộ đôi lệnh hiện đại `git switch` và `git restore`.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git checkout — lệnh truyền thống đa năng\n- **Nói dễ hiểu:** Câu lệnh cũ trong Git từng đảm nhận cả việc đổi nhánh lẫn khôi phục nội dung tệp.\n- **Ví dụ:** Gặp `git checkout main` trong các bài viết blog hoặc hướng dẫn viết từ nhiều năm trước.\n- **Đừng nhầm:** Lệnh vẫn hoạt động bình thường, nhưng ngày nay Git khuyến khích dùng các lệnh chuyên biệt.\n\n### git checkout -b — tiền thân của git switch -c\n- **Nói dễ hiểu:** Cú pháp quen thuộc trong tài liệu cũ dùng để vừa tạo nhánh mới vừa chuyển sang nhánh đó.\n- **Ví dụ:** Lệnh `git checkout -b feature-cart` tương đương hoàn toàn với `git switch -c feature-cart`.\n- **Đừng nhầm:** Hai lệnh này cho ra kết quả giống nhau; lệnh `switch -c` ra đời sau để cú pháp rõ nghĩa hơn.\n\n### git checkout -- file — tiền thân của git restore\n- **Nói dễ hiểu:** Cú pháp cũ dùng để hủy bỏ các thay đổi dở dang trên một tệp trong thư mục làm việc.\n- **Ví dụ:** Lệnh `git checkout -- index.html` tương đương với `git restore index.html`.\n- **Đừng nhầm:** Dấu `--` là cần thiết để Git không nhầm đường dẫn tệp với tên một nhánh có thể trùng.\n\n---\n\n## 📖 Định nghĩa\n`git checkout` là câu lệnh truyền thống nổi tiếng của Git. Trước phiên bản 2.23, lệnh này vừa dùng cho thao tác nhánh (chuyển nhánh, tạo nhánh mới) vừa dùng cho thao tác tệp (hủy sửa đổi trên tệp). Ngày nay, hai nhiệm vụ này đã được chia cho `git switch` và `git restore`.\n\n---\n\n## 🤔 Tại sao cần?\nKhi tìm kiếm lời giải trên mạng hoặc đọc mã nguồn của các dự án lâu năm, bạn sẽ thấy `git checkout` xuất hiện ở khắp mọi nơi. Hiểu rõ lệnh này giúp bạn tự tin đọc hiểu tài liệu cũ, vận hành các tập lệnh tự động hóa và biết cách quy đổi sang các lệnh hiện đại.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung `git checkout` giống như chiếc dao đa năng Thụy Sĩ tích hợp cả kéo, dao và tua-vít. Chiếc dao này làm được nhiều việc nhưng dễ bật nhầm lưỡi dao khi chỉ muốn dùng kéo. Bộ đôi mới `git switch` và `git restore` giống như việc tách ra thành một chiếc kéo và một chiếc tua-vít riêng biệt để thao tác chính xác và an toàn.\n\n---\n\n## 🖼 Sơ đồ\n```text\nSự phân tách nhiệm vụ của git checkout:\n                  ┌───> Thao tác trên Nhánh ────> git switch\n[git checkout] ──┤\n                  └───> Thao tác trên Tệp ──────> git restore\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn tham gia vào một dự án mở và đọc tệp hướng dẫn có dòng: `git checkout -b dev-setup`. Bạn nhận ra ngay đây là lệnh tạo và chuyển sang nhánh `dev-setup`. Bạn có thể gõ nguyên lệnh đó hoặc dùng lệnh mới `git switch -c dev-setup` với kết quả hoàn toàn giống nhau.\n\n---\n\n## 💻 Command\n```bash\ngit checkout <tên-nhánh>\ngit checkout -b <tên-nhánh-mới>\ngit checkout -- <tên-tệp>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git checkout <tên-nhánh>`: Chuyển sang nhánh chỉ định (tương đương `git switch <tên-nhánh>`).\n- `git checkout -b <tên-nhánh-mới>`: Vừa tạo vừa chuyển sang nhánh mới (tương đương `git switch -c <tên-nhánh-mới>`).\n- `git checkout -- <tên-tệp>`: Hủy bỏ sửa đổi chưa lưu trên tệp (tương đương `git restore <tên-tệp>`).\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Quên dấu `--` khi khôi phục tệp:** Nếu tên tệp trùng với tên một nhánh trong dự án, Git sẽ chuyển nhánh thay vì khôi phục tệp.\n2. **Bối rối khi thấy tài liệu dùng checkout:** Không cần lo lắng vì đây chỉ là cú pháp quen thuộc trước đây của `git switch`.\n3. **Dùng checkout cho người mới học:** Dễ gây nhầm lẫn giữa việc đổi nhánh và việc xóa sửa đổi của tệp.\n\n---\n\n## 🧪 Lab\nBài học này là bài tự kiểm tra cú pháp trên máy của bạn:\n1. Chạy lệnh `git checkout -b legacy-demo` để tạo và chuyển nhánh theo phong cách truyền thống.\n2. Chạy `git status` để xác nhận bạn đang ở trên nhánh `legacy-demo`.\n3. Chạy `git checkout main` để quay trở về nhánh chính.\n4. Xóa nhánh vừa thử nghiệm bằng lệnh `git branch -d legacy-demo`.\n\n---\n\n## 💡 Hint\nTrong các dự án mới của bản thân, hãy ưu tiên dùng `git switch` cho nhánh và `git restore` cho tệp.\n\n---\n\n## ✅ Validation\n- Nhánh `legacy-demo` được tạo và sau đó xóa sạch sẽ.\n- Bạn giải thích được sự tương đương giữa `checkout -b` và `switch -c`.\n\n---\n\n## ❓ Quiz\nTrả lời các câu hỏi sau để nắm vững sự chuyển dịch từ `git checkout` sang các lệnh hiện đại.\n\n---\n\n## 🔥 Challenge\nGiải thích cho một bạn cùng nhóm vì sao tách lệnh thành `git switch` và `git restore` lại giúp giảm rủi ro mất code hơn so với việc dùng chung một lệnh `git checkout`.\n\n---\n\n## 📚 Tổng kết\n- `git checkout` là lệnh truyền thống làm được cả thao tác nhánh và thao tác tệp.\n- Cú pháp `git checkout -b` tương đương hoàn toàn với `git switch -c`.\n- Dùng `git switch` và `git restore` là chuẩn mực hiện đại giúp câu lệnh rõ nghĩa và an toàn.\n",
  "quiz": {
    "id": "quiz-03-05-git-checkout",
    "title": "Trắc nghiệm: Lệnh truyền thống git checkout",
    "questions": [
      {
        "id": "q1",
        "question": "Lệnh truyền thống `git checkout -b feature` tương đương với lệnh hiện đại nào sau đây?",
        "type": "single",
        "options": [
          {
            "text": "git switch -c feature",
            "correct": true
          },
          {
            "text": "git restore --branch feature",
            "correct": false
          },
          {
            "text": "git branch --create-jump feature",
            "correct": false
          },
          {
            "text": "git commit -b feature",
            "correct": false
          }
        ],
        "explanation": "Lệnh truyền thống `git checkout -b <name>` thực hiện việc vừa tạo nhánh mới vừa chuyển sang nhánh đó, tương đương `git switch -c <name>`."
      },
      {
        "id": "q2",
        "question": "Lệnh `git checkout -- index.html` thực hiện thao tác gì trên dự án?",
        "type": "single",
        "options": [
          {
            "text": "Hủy bỏ các sửa đổi chưa staged trong tệp index.html (tương đương git restore index.html)",
            "correct": true
          },
          {
            "text": "Tạo một nhánh mới có tên là index.html",
            "correct": false
          },
          {
            "text": "Đẩy tệp index.html lên máy chủ GitHub",
            "correct": false
          },
          {
            "text": "Biên dịch tệp index.html thành ứng dụng di động",
            "correct": false
          }
        ],
        "explanation": "`git checkout -- <file>` là cú pháp cũ dùng để hủy bỏ sửa đổi trên tệp trong Working Tree."
      },
      {
        "id": "q3",
        "question": "Dấu hai gạch ngang `--` trong lệnh `git checkout -- <file>` đóng vai trò gì?",
        "type": "single",
        "options": [
          {
            "text": "Phân tách rõ ràng giữa tên nhánh và tên tệp tin để tránh trường hợp trùng tên",
            "correct": true
          },
          {
            "text": "Là cú pháp bắt buộc của ngôn ngữ lập trình C++",
            "correct": false
          },
          {
            "text": "Tự động kích hoạt tính năng nén tệp tin tốc độ cao",
            "correct": false
          },
          {
            "text": "Tự động kiểm tra lỗi chính tả trong mã nguồn",
            "correct": false
          }
        ],
        "explanation": "Dấu `--` báo cho Git biết mọi đối số phía sau là đường dẫn tệp tin, không phải tên nhánh."
      },
      {
        "id": "q4",
        "question": "Lời khuyên tốt nhất dành cho các lập trình viên khi làm dự án Git hiện nay là gì?",
        "type": "single",
        "options": [
          {
            "text": "Sử dụng git switch cho nhánh và git restore cho tệp tin để câu lệnh an toàn và rõ nghĩa",
            "correct": true
          },
          {
            "text": "Chỉ được dùng git checkout và cấm dùng git switch",
            "correct": false
          },
          {
            "text": "Không được tạo bất kỳ nhánh nào trong suốt vòng đời dự án",
            "correct": false
          },
          {
            "text": "Chỉ commit code vào ngày cuối cùng của tháng",
            "correct": false
          }
        ],
        "explanation": "Các lệnh chuyên biệt `git switch` và `git restore` giúp quy trình rõ ràng và giảm thiểu nhầm lẫn."
      },
      {
        "id": "q5",
        "question": "Khi bạn gặp câu lệnh `git checkout main` trong một tài liệu cũ, lệnh này tương đương trực tiếp với lệnh nào hiện nay?",
        "type": "single",
        "options": [
          {
            "text": "git switch main",
            "correct": true
          },
          {
            "text": "git restore main",
            "correct": false
          },
          {
            "text": "git branch -d main",
            "correct": false
          },
          {
            "text": "git merge main",
            "correct": false
          }
        ],
        "explanation": "`git checkout <nhánh>` dùng để chuyển sang nhánh chỉ định, ngày nay được khuyến nghị thay thế bằng `git switch <nhánh>`."
      }
    ]
  }
};
export default lesson;
