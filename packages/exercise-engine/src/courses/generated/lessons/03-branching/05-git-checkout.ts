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
  "content": "# Lệnh git checkout và lịch sử\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu thấu bối cảnh lịch sử và tính đa năng của lệnh truyền thống `git checkout`.\n- Đọc hiểu thành thạo các tài liệu, bài viết kỹ thuật và mã nguồn dự án lâu năm.\n- Đối chiếu chuẩn xác sự tương đương giữa cú pháp cũ của checkout với bộ đôi hiện đại `git switch` và `git restore`.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git checkout — lệnh truyền thống đa năng\n- **Nói dễ hiểu:** Câu lệnh di sản lừng danh của Git từng gánh vác cả việc chuyển đổi nhánh lẫn khôi phục trạng thái tệp tin.\n- **Ví dụ:** Bạn bắt gặp câu lệnh `git checkout main` trong các bài blog kỹ thuật hoặc giáo trình xuất bản trước năm 2020.\n- **Đừng nhầm:** Lệnh vẫn chạy tốt trong mọi phiên bản Git hiện đại, nhưng cộng đồng khuyến khích dùng các lệnh chuyên biệt để an toàn hơn.\n\n### git checkout -b — tiền thân của git switch -c\n- **Nói dễ hiểu:** Cú pháp quen thuộc trong thế giới Git dùng để tạo một nhánh mới và chuyển ngay sang nhánh đó.\n- **Ví dụ:** Lệnh `git checkout -b feature-cart` đem lại kết quả hoàn toàn trùng khớp với `git switch -c feature-cart`.\n- **Đừng nhầm:** Cả hai lệnh tạo ra kết quả giống hệt nhau; `switch -c` ra đời nhằm mục đích làm cú pháp tường minh và dễ nhớ hơn cho kỹ sư.\n\n### git checkout -- file — tiền thân của git restore\n- **Nói dễ hiểu:** Cú pháp truyền thống dùng để hủy bỏ các sửa đổi chưa commit trên một tệp tin ngoài thư mục làm việc.\n- **Ví dụ:** Gõ `git checkout -- index.html` để xóa sạch các đoạn code gõ nháp trong file HTML.\n- **Đừng nhầm:** Dấu hai gạch `--` là bắt buộc để ngăn Git hiểu nhầm tên tệp tin với tên một nhánh có thể trùng tên.\n\n---\n\n## 📖 Định nghĩa\n`git checkout` là câu lệnh đa năng kinh điển của Git suốt hơn một thập kỷ trước khi Git 2.23 ra đời. Lệnh này mang trên vai hai sứ mệnh hoàn toàn khác biệt: vừa điều hướng các nhánh và commit (thao tác trên kho lưu trữ), vừa khôi phục hoặc xóa bỏ các sửa đổi của tệp tin trong thư mục làm việc.\n\n---\n\n## 🤔 Tại sao cần?\nDù Git hiện đại đã tách biệt các tính năng này thành `git switch` và `git restore` để an toàn hơn, hàng triệu tài liệu kỹ thuật, video hướng dẫn cũ, các câu trả lời trên Stack Overflow và các tập lệnh tự động hóa (CI/CD scripts) trong các doanh nghiệp lớn vẫn đang sử dụng `git checkout`. Hiểu sâu lệnh này giúp bạn tự tin đọc hiểu mọi tài liệu và bảo trì bất kỳ dự án lâu năm nào.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung `git checkout` như chiếc dao đa năng Thụy Sĩ tích hợp cả dao cắt bánh mì lẫn tua-vít. Dùng dao đa năng rất tiện nhưng lại tiềm ẩn rủi ro bật nhầm lưỡi dao khi đang cần vặn ốc. Việc Git hiện đại phân tách thành `git switch` (chuyên chuyển nhánh) và `git restore` (chuyên phục hồi tệp) giúp kỹ sư thao tác chuẩn xác, triệt tiêu nguy cơ gõ nhầm lệnh làm mất dữ liệu.\n\n---\n\n## 🖼 Sơ đồ\n```text\nSỰ PHÂN TÁCH NHIỆM VỤ CỦA GIT CHECKOUT TRONG GIT HIỆN ĐẠI:\n\n                   ┌───► Thao tác trên Branch/Commit ───► git switch\n[git checkout] ────┤\n                   └───► Thao tác trên File/Index ──────► git restore\n\nBẢNG ĐỐI CHIẾU CÚ PHÁP:\n┌──────────────────────────────┬──────────────────────────────┬───────────────────────────────┐\n│ Cú pháp truyền thống         │ Cú pháp hiện đại (Khuyên dùng)│ Mục đích kỹ thuật             │\n├──────────────────────────────┼──────────────────────────────┼───────────────────────────────┤\n│ git checkout main            │ git switch main              │ Chuyển sang nhánh có sẵn      │\n│ git checkout -b feature-app  │ git switch -c feature-app    │ Tạo mới và chuyển nhánh ngay  │\n│ git checkout -- file.js      │ git restore file.js          │ Hủy sửa đổi chưa commit       │\n└──────────────────────────────┴──────────────────────────────┴───────────────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKhi bạn gia nhập một tập đoàn công nghệ lớn và đọc tài liệu hướng dẫn nội bộ viết từ năm 2018, tài liệu ghi: `git checkout -b feature/login`. Bạn lập tức hiểu ngay lệnh này có ý nghĩa tương đương 100% với `git switch -c feature/login`. Bạn có thể gõ cú pháp nào cũng được, Git đều thực thi hoàn hảo.\n\n---\n\n## 💻 Command\n```bash\ngit checkout <tên-nhánh>\ngit checkout -b <tên-nhánh-mới>\ngit checkout -- <tên-tệp>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git checkout <tên-nhánh>`: Di chuyển HEAD sang nhánh được chỉ định (tương đương `git switch <tên-nhánh>`).\n- `git checkout -b <tên-nhánh>`: Vừa tạo nhánh mới vừa chuyển sang nhánh đó (tương đương `git switch -c <tên-nhánh>`).\n- `git checkout -- <tên-tệp>`: Lấy lại bản snapshot của tệp từ index ghi đè vào thư mục làm việc, hủy sửa đổi chưa lưu.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Quên dấu `--` khi muốn khôi phục tệp**: Nếu vô tình trong dự án có một nhánh trùng tên với tên tệp, Git sẽ thực hiện chuyển nhánh thay vì khôi phục nội dung tệp.\n2. **Bối rối lo sợ khi thấy tài liệu cũ dùng checkout**: Đừng lo lắng, Git giữ tính tương thích ngược tuyệt đối; checkout vẫn hoạt động vĩnh viễn.\n3. **Lạm dụng checkout cho người mới học**: Khiến người học nhầm lẫn tai hại giữa việc điều hướng nhánh và việc xóa dữ liệu tệp tin.\n\n---\n\n## 🧪 Lab\n1. Chạy lệnh truyền thống: `git checkout -b legacy-demo` để tạo và chuyển nhánh.\n2. Chạy `git status` để xác minh bạn đang đứng trên nhánh `legacy-demo`.\n3. Chạy lệnh: `git checkout main` để quay trở về nhánh chính.\n4. Dọn dẹp nhánh thử nghiệm bằng lệnh: `git branch -d legacy-demo`.\n\n---\n\n## 💡 Hint\n> Khi viết code trong dự án mới hôm nay, hãy luôn ưu tiên dùng `git switch` cho nhánh và `git restore` cho tệp tin!\n\n---\n\n## ✅ Validation\n- Nhánh `legacy-demo` được tạo và chuyển đổi thành công bằng lệnh checkout truyền thống.\n- Quay về nhánh `main` và xóa sạch nhánh thử nghiệm sau khi hoàn tất.\n\n---\n\n## ❓ Quiz\nTrả lời bài trắc nghiệm dưới đây để kiểm tra hiểu biết lịch sử và khả năng quy đổi giữa git checkout và các lệnh hiện đại.\n\n---\n\n## 🔥 Challenge\nHãy phân tích lý do sâu xa tại sao đội ngũ phát triển Git Core lại quyết định tách `git checkout` thành hai lệnh riêng biệt `git switch` và `git restore` vào năm 2019? Quyết định này giúp loại trừ những rủi ro thao tác nào?\n\n---\n\n## 📚 Tổng kết\n- `git checkout` là lệnh kinh điển đảm nhiệm song song cả thao tác nhánh và thao tác tệp tin.\n- `git checkout -b` tương đương hoàn toàn với cú pháp hiện đại `git switch -c`.\n- Thành thạo cả hai phong cách giúp bạn làm chủ mọi tài liệu kỹ thuật và tự tin làm việc trong mọi dự án lớn.\n",
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
