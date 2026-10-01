import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "03-git-la-gi",
  "moduleId": "01-foundations",
  "metadata": {
    "id": "03-git-la-gi",
    "title": "Git là gì? Kiến trúc phân tán",
    "level": "beginner",
    "duration": 25,
    "xp": 60,
    "prerequisites": [
      "02-vcs-types"
    ],
    "objectives": [
      "Giải thích Git là một VCS phân tán.",
      "Phân biệt Git với GitHub.",
      "Nêu việc nào Git làm trên máy và việc nào cần mạng."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git la gi",
      "linus torvalds",
      "dvcs",
      "lich su git",
      "dac diem"
    ],
    "commands": [
      "git status",
      "git --version"
    ]
  },
  "content": "# Git là gì?\n\n---\n\n## 🎯 Mục tiêu\n- Giải thích Git là một hệ thống quản lý phiên bản phân tán.\n- Phân biệt Git (công cụ) với GitHub (dịch vụ lưu trữ và cộng tác).\n- Nói được việc nào Git làm trên máy và việc nào cần kết nối Internet.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Git — công cụ quản lý phiên bản\n- **Nói dễ hiểu:** Phần mềm ghi lại các mốc thay đổi của dự án để bạn xem, so sánh và làm việc trên nhiều nhánh.\n- **Ví dụ:** Dùng Git để lưu các bước làm bài nhóm rồi xem lại ai đã thay đổi gì trong từng mốc.\n- **Đừng nhầm:** Git là công cụ chạy trên máy của bạn; không đồng nghĩa với GitHub.\n\n### Repository (repo) — kho Git của dự án\n- **Nói dễ hiểu:** Nơi Git quản lý tệp và lưu lịch sử của một dự án. Thư mục `.git` là phần dữ liệu Git dùng để làm việc đó.\n- **Ví dụ:** Sau khi khởi tạo hoặc clone, thư mục dự án có thể trở thành một repository.\n- **Đừng nhầm:** Repository không nhất thiết nằm trên Internet; nó có thể ở trên máy tính của bạn.\n\n### GitHub — dịch vụ cộng tác trực tuyến\n- **Nói dễ hiểu:** Một dịch vụ lưu kho Git trên Internet và cung cấp công cụ để nhóm chia sẻ, xem xét và quản lý công việc.\n- **Ví dụ:** Nhóm push các commit lên GitHub để cùng xem và mở Pull Request.\n- **Đừng nhầm:** GitHub không phải Git; Git có thể dùng trên máy mà không cần GitHub.\n\n### Commit — một mốc đã lưu\n- **Nói dễ hiểu:** Bản ghi có lời nhắn, đại diện cho trạng thái dự án mà bạn đã chọn lưu trong Git.\n- **Ví dụ:** Commit “Tạo trang giới thiệu” giúp nhóm nhận ra mốc nào thêm trang đó.\n- **Đừng nhầm:** Commit chỉ tồn tại trong kho nơi bạn tạo nó cho đến khi bạn chia sẻ lên remote.\n\n---\n\n## 🤔 Tại sao cần?\nGit giúp bạn làm việc với lịch sử dự án ngay trên máy: lưu commit, xem lịch sử và tạo nhánh. GitHub thường được dùng để chia sẻ kho và cộng tác với người khác. Vì vậy, khi không có Internet, bạn vẫn có thể làm nhiều việc trong Git cục bộ nhưng chưa thể trao đổi commit với GitHub.\n\n---\n\n## 📖 Định nghĩa\nGit là một hệ thống quản lý phiên bản phân tán (DVCS). Nó giúp lưu và đọc lại lịch sử dự án trong kho cục bộ. Git được tạo ra năm 2005 để hỗ trợ phát triển Linux. GitHub là một dịch vụ trực tuyến có thể lưu kho Git và hỗ trợ cộng tác.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy tách thành hai phần: **Git** là bộ dụng cụ quản lý lịch sử; **GitHub** là một nơi trực tuyến để chia sẻ kho và phối hợp với nhóm. Bạn có thể dùng bộ dụng cụ trên máy trước, rồi kết nối với nơi chia sẻ khi cần.\n\n---\n\n## 🖼 Sơ đồ\n```text\nTrên máy bạn                         Trên Internet\n[Git + kho cục bộ]  ── push ──►  [Kho trên GitHub]\n[Git + kho cục bộ]  ◄─ pull ───  [Kho trên GitHub]\n\nLưu commit cục bộ: thường không cần Internet.\nGửi/nhận commit từ GitHub: cần kết nối và quyền truy cập phù hợp.\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn làm bài nhóm trên laptop. Git lưu các mốc bạn tạo trong kho cục bộ. Khi có mạng, bạn gửi các mốc đó lên GitHub; bạn cùng nhóm lấy chúng về để xem hoặc tiếp tục làm. Nếu chưa gửi lên nơi khác, lịch sử vẫn chỉ nằm trên laptop này.\n\n---\n\n## 💻 Command\n```bash\ngit --version\ngit status\n```\n\n---\n\n## 🔍 Giải thích command\n- `git --version`: xác nhận công cụ Git đã cài và xem số phiên bản.\n- `git status`: đọc trạng thái của kho Git hiện tại trên máy. Lệnh cần được chạy bên trong một repository.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Gọi GitHub là Git:** Git là công cụ; GitHub là một dịch vụ trực tuyến có dùng Git.\n2. **Cho rằng commit tự động xuất hiện trên GitHub:** Cần gửi commit lên remote bằng lệnh phù hợp.\n3. **Tin rằng commit là bản sao lưu không thể mất:** Hãy đẩy dữ liệu quan trọng lên nơi khác và dùng quy trình sao lưu của nhóm.\n\n---\n\n## 🧪 Lab\nXếp bốn thẻ sau vào hai cột **Git trên máy** và **GitHub qua mạng**: tạo commit, xem lịch sử đã clone, push commit, mở Pull Request. Giải thích một lựa chọn của bạn.\n\n---\n\n## 💡 Hint\nNếu thao tác chỉ cần kho đã có trên máy, thường có thể làm offline. Nếu thao tác gửi/nhận dữ liệu hoặc mở trang cộng tác, cần kết nối.\n\n---\n\n## ✅ Validation\n- Nói được Git là công cụ, GitHub là dịch vụ trực tuyến.\n- Phân loại đúng commit cục bộ và thao tác trao đổi qua mạng.\n\n---\n\n## ❓ Quiz\nTrả lời các câu hỏi sau; đọc giải thích nếu cần phân biệt Git với GitHub.\n\n---\n\n## 🔥 Challenge\nGiải thích cho bạn học: “Tôi đã commit rồi nhưng bạn tôi chưa thấy trên GitHub” có thể là vì sao?\n\n---\n\n## 📚 Tổng kết\n- Git quản lý lịch sử phiên bản trong repository trên máy và hỗ trợ làm việc phân tán.\n- GitHub là một dịch vụ để lưu kho từ xa và cộng tác; nó không phải tên khác của Git.\n- Commit cục bộ chưa tự xuất hiện trên GitHub; bạn cần gửi nó lên remote.\r\n",
  "quiz": {
    "id": "quiz-03-git-la-gi",
    "title": "Trắc nghiệm: Nguồn gốc và bản chất của Git",
    "questions": [
      {
        "id": "q1",
        "question": "Ai là người đã sáng tạo ra hệ thống quản lý phiên bản Git vào năm 2005?",
        "type": "single",
        "options": [
          {
            "text": "Linus Torvalds (tác giả nhân Linux)",
            "correct": true
          },
          {
            "text": "Bill Gates (người sáng lập Microsoft)",
            "correct": false
          },
          {
            "text": "Mark Zuckerberg (người sáng lập Facebook)",
            "correct": false
          },
          {
            "text": "Guido van Rossum (tác giả ngôn ngữ Python)",
            "correct": false
          }
        ],
        "explanation": "Linus Torvalds đã viết nên Git vào năm 2005 để phục vụ việc quản lý mã nguồn dự án nhân hệ điều hành Linux."
      },
      {
        "id": "q2",
        "question": "Bạn đã tạo commit trong kho Git trên laptop nhưng chưa gửi lên GitHub. Nơi nào đang có commit đó?",
        "type": "single",
        "options": [
          {
            "text": "Kho Git trên laptop; GitHub chưa nhận commit đó",
            "correct": true
          },
          {
            "text": "Chỉ có GitHub; commit không được lưu trên laptop",
            "correct": false
          },
          {
            "text": "Cả laptop lẫn GitHub, vì commit được đồng bộ tự động",
            "correct": false
          },
          {
            "text": "Không nơi nào; Git không lưu commit khi không có mạng",
            "correct": false
          }
        ],
        "explanation": "Commit được tạo trong repository cục bộ trước. Muốn người khác thấy nó trên GitHub, bạn cần push lên remote."
      },
      {
        "id": "q3",
        "question": "Đặc điểm nào dưới đây KHÔNG PHẢI là mục tiêu thiết kế ban đầu của Git?",
        "type": "single",
        "options": [
          {
            "text": "Phụ thuộc chặt chẽ vào một máy chủ trung tâm duy nhất để hoạt động",
            "correct": true
          },
          {
            "text": "Tốc độ xử lý cực nhanh ngay cả với dự án khổng lồ",
            "correct": false
          },
          {
            "text": "Hỗ trợ mô hình phân nhánh song song phi tuyến tính",
            "correct": false
          },
          {
            "text": "Khả năng vận hành offline trơn tru không cần kết nối mạng liên tục",
            "correct": false
          }
        ],
        "explanation": "Git có thể quản lý lịch sử trong repository cục bộ mà không cần liên hệ với một máy chủ trung tâm. Nhóm vẫn có thể dùng GitHub để chia sẻ."
      },
      {
        "id": "q4",
        "question": "Lệnh nào hiển thị tài liệu hướng dẫn tra cứu chi tiết của lệnh `git commit`?",
        "type": "single",
        "options": [
          {
            "text": "git commit --help",
            "correct": true
          },
          {
            "text": "git commit --manual-search",
            "correct": false
          },
          {
            "text": "git find commit documentation",
            "correct": false
          },
          {
            "text": "git help-me commit",
            "correct": false
          }
        ],
        "explanation": "Cú pháp `git <command> --help` mở trang hướng dẫn tra cứu chi tiết (man page) của lệnh đó."
      }
    ]
  }
};
export default lesson;
