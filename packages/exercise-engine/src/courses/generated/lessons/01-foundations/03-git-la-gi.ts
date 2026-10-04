import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "03-git-la-gi",
  "moduleId": "01-foundations",
  "metadata": {
    "id": "03-git-la-gi",
    "title": "Git là gì? VCS phân tán trên máy bạn",
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
      "dvcs",
      "repository",
      "commit",
      "offline"
    ],
    "commands": [
      "git status"
    ]
  },
  "content": "# Git là gì? VCS phân tán trên máy bạn\n\n---\n\n## 🎯 Mục tiêu\n- Khám phá nguồn gốc và sức mạnh cốt lõi của Git — hệ thống quản lý phiên bản phân tán thống trị ngành công nghệ.\n- Hiểu rõ cơ chế lưu trữ của kho chứa (Repository) nằm gọn gàng ngay trên ổ cứng máy bạn.\n- Sử dụng thành thạo `git status` như chiếc la bàn định vị trạng thái dự án trước mọi thao tác.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Git — Hệ thống quản lý phiên bản phân tán\n- **Nói dễ hiểu:** Công cụ dòng lệnh cực nhanh do Linus Torvalds tạo ra, giúp ghi lại và bảo vệ từng mốc lịch sử mã nguồn dự án ngay trên máy bạn.\n- **Ví dụ:** Bạn dùng Git để theo dõi quá trình phát triển một website thương mại điện tử suốt nhiều tháng trời.\n- **Đừng nhầm:** Git là phần mềm chạy độc lập trên máy tính cá nhân; Git không phải là trang web GitHub hay GitLab.\n\n### DVCS — Quản lý phiên bản phân tán\n- **Nói dễ hiểu:** Kiến trúc trao toàn quyền cho lập trình viên, biến mỗi chiếc máy tính thành một trung tâm dữ liệu độc lập sở hữu trọn vẹn lịch sử.\n- **Ví dụ:** Bạn ngồi trên xe đò mất sóng hoàn toàn nhưng vẫn xem lại được lịch sử commit của cả nhóm từ hai năm trước.\n- **Đừng nhầm:** Máy bạn có đầy đủ lịch sử không đồng nghĩa với việc đồng đội tự thấy code của bạn; việc chia sẻ vẫn cần sự chủ động.\n\n### Repository (Repo) — Kho lưu trữ dự án\n- **Nói dễ hiểu:** Thư mục đặc biệt chứa toàn bộ mã nguồn dự án kèm cơ sở dữ liệu lịch sử ngầm do Git quản lý.\n- **Ví dụ:** Khi bạn khởi tạo một dự án mới, Git tạo ra kho lưu trữ ngay tại thư mục đó để bắt đầu theo dõi.\n- **Đừng nhầm:** Kho chứa Git không bắt buộc phải tải lên đám mây; một thư mục trên máy bạn đã là một repo hoàn chỉnh.\n\n---\n\n## 🤔 Tại sao cần?\nNăm 2005, cha đẻ hệ điều hành Linux — Linus Torvalds — đã tạo ra Git chỉ trong vài tuần với triết lý: tốc độ bàn thờ, thiết kế phân tán và bảo toàn dữ liệu tuyệt đối. Trong môi trường doanh nghiệp, khả năng làm việc độc lập của Git là chìa khóa năng suất. Khi sở hữu một repo Git đầy đủ trên máy, bạn không bao giờ lo mạng chập chờn hay máy chủ bị nghẽn; mọi thao tác từ truy vết lịch sử đến ghi nhận mốc mới đều diễn ra tức thì với tốc độ ổ cứng.\n\n---\n\n## 📖 Định nghĩa\nGit là hệ thống quản lý phiên bản phân tán (DVCS) mã nguồn mở. Git biến mỗi thư mục dự án thành một kho lưu trữ (repository) độc lập, chứa toàn bộ lịch sử commit và metadata ngay trên máy tính cục bộ mà không đòi hỏi kết nối máy chủ thường trực.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy xem Git như người quản kho mẫn cán và trung thành nhất của bạn. Kho hàng (Repository) nằm ngay dưới chân bạn. Bạn yêu cầu người quản kho chụp ảnh kiện hàng nào thì người đó ghi vào sổ cái. Lệnh `git status` giống như việc bạn vỗ vai hỏi: \"Này quản kho, hiện tại kho đang có gì mới hay có kiện hàng nào bị thay đổi không?\"\n\n---\n\n## 🖼 Sơ đồ\n```text\nMáy tính của bạn (Môi trường độc lập)\n┌─────────────────────────────────────────────────────┐\n│ Thư mục dự án (Working Directory)                   │\n│  ├── index.html, style.css                          │\n│  └── Kho dữ liệu Git cục bộ (.git)                  │\n│       ├── Toàn bộ biên niên sử các Commit           │\n│       └── Cơ chế kiểm soát toàn vẹn dữ liệu         │\n└─────────────────────────────────────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn đang code một ứng dụng di động tại quán cà phê thì đột ngột mất điện và rớt mạng. Thay vì phải dọn đồ đi về như thời dùng hệ thống tập trung cũ, bạn vẫn thong thả viết code, kiểm tra `git status` để xem các file vừa sửa và tạo các mốc lưu trữ an toàn. Toàn bộ tiến trình làm việc của bạn không bị gián đoạn dù chỉ một giây.\n\n---\n\n## 💻 Command\n```bash\ngit status\n```\n\n---\n\n## 🔍 Giải thích command\n`git status` là chiếc la bàn định vị tối quan trọng trong Git. Lệnh này kiểm tra và liệt kê chi tiết trạng thái của các file: file nào vừa được tạo mới, file nào bị chỉnh sửa và file nào đã sẵn sàng để đóng gói thành commit. Lệnh này chỉ đọc dữ liệu cục bộ, hoàn toàn an toàn và không làm thay đổi bất kỳ file nào của bạn.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Lầm tưởng Git bắt buộc phải kết nối Internet mới hoạt động:** Git sinh ra để phục vụ mô hình phân tán; hầu hết sức mạnh của nó nằm trọn vẹn ngay trên chiếc máy tính của bạn.\n2. **Gõ lệnh trong trạng thái mù đường (không chạy `git status`):** Lập trình viên mới thường vội vã commit mà quên kiểm tra `git status`, dẫn đến việc lưu nhầm các file rác hoặc bỏ sót file quan trọng.\n3. **Tưởng rằng `git status` sẽ tự động lưu thay đổi:** Lệnh này chỉ mang tính chất thông báo và quan sát tình trạng; nó hoàn toàn không tạo ra commit nào cho bạn.\n\n---\n\n## 🧪 Lab\n1. Mở cửa sổ dòng lệnh và gõ `git status` để quan sát phản hồi từ hệ thống.\n2. Đọc kỹ từng dòng kết quả và cho biết Git đang nhận diện những tệp tin nào trong kho.\n3. Giải thích tại sao một kỹ sư phần mềm chuyên nghiệp luôn hình thành phản xạ gõ `git status` trước và sau mỗi hành động trong dự án.\n\n---\n\n## 💡 Hint\nHãy ghi nhớ câu thần chú của giảng viên: \"`git status` là chiếc la bàn.\" Trước khi chuẩn bị đi đâu hay làm gì với mã nguồn, việc đầu tiên là rút la bàn ra để biết mình đang đứng ở đâu.\n\n---\n\n## ✅ Validation\n- Định nghĩa chuẩn xác Git là một hệ thống DVCS và kho chứa có thể tồn tại hoàn toàn offline trên máy cá nhân.\n- Giải thích được vai trò và cơ chế an toàn (chỉ đọc) của lệnh `git status`.\n- Hình thành thói quen kiểm tra trạng thái repo thường xuyên trong quy trình lập trình.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm bên dưới để củng cố nền tảng về Git và câu lệnh `git status`. Chú ý đọc kỹ phần phân tích của giảng viên.\n\n---\n\n## 🔥 Challenge\nHãy tưởng tượng bạn phải thuyết trình trong một phút trước nhà tuyển dụng: Nêu bật sự khác biệt mang tính cách mạng giữa Git và các công cụ quản lý phiên bản thế hệ cũ.\n\n---\n\n## 📚 Tổng kết\n- Git là hệ thống quản lý phiên bản phân tán (DVCS) cực nhanh, cho phép bạn sở hữu toàn bộ kho lưu trữ và lịch sử ngay trên máy cá nhân.\n- `git status` là lệnh an toàn dùng để soi chiếu trạng thái tệp tin và định hướng bước đi tiếp theo trong dự án.\n- Hãy biến việc gõ `git status` thành phản xạ tự nhiên của một kỹ sư phần mềm chuyên nghiệp trước khi thực hiện bất kỳ thao tác nào.\n\n",
  "quiz": {
    "id": "quiz-03-git-la-gi",
    "title": "Trắc nghiệm: Git và repository cục bộ",
    "questions": [
      {
        "id": "q1",
        "question": "Git là công cụ dùng chủ yếu để làm gì?",
        "type": "single",
        "options": [
          {
            "text": "Quản lý lịch sử phiên bản của tệp và dự án",
            "correct": true
          },
          {
            "text": "Lưu trữ mọi tệp trực tuyến mà không cần tạo tài khoản",
            "correct": false
          },
          {
            "text": "Biên dịch mọi ngôn ngữ lập trình thành mã máy",
            "correct": false
          },
          {
            "text": "Tự kiểm tra và sửa lỗi chương trình",
            "correct": false
          }
        ],
        "explanation": "Git ghi lại những mốc dự án bạn chọn để xem và so sánh về sau. Nó không phải dịch vụ lưu trữ trực tuyến hay trình biên dịch."
      },
      {
        "id": "q2",
        "question": "Điều gì mô tả đúng một bản clone Git đầy đủ thông thường?",
        "type": "single",
        "options": [
          {
            "text": "Nó có thể chứa các tệp dự án và lịch sử để làm việc cục bộ",
            "correct": true
          },
          {
            "text": "Nó chỉ hoạt động nếu GitHub luôn mở trên trình duyệt",
            "correct": false
          },
          {
            "text": "Nó tự gửi mỗi lần sửa tệp lên máy của cả nhóm",
            "correct": false
          },
          {
            "text": "Nó không lưu lịch sử cho tới khi có Internet",
            "correct": false
          }
        ],
        "explanation": "Bản clone đầy đủ thường có lịch sử ở trên máy nên Git làm được nhiều thao tác cục bộ mà không cần kết nối liên tục."
      },
      {
        "id": "q3",
        "question": "Bạn chạy `git status` trong repository. Lệnh này làm gì?",
        "type": "single",
        "options": [
          {
            "text": "Đọc trạng thái các tệp trong repository hiện tại",
            "correct": true
          },
          {
            "text": "Lưu một commit mới vào lịch sử",
            "correct": false
          },
          {
            "text": "Gửi mọi thay đổi trong dự án lên máy chủ",
            "correct": false
          },
          {
            "text": "Cài Git lên máy tính của bạn",
            "correct": false
          }
        ],
        "explanation": "`git status` báo tình trạng của repository hiện tại. Lệnh không tạo commit, cài đặt Git hoặc tự gửi dữ liệu qua mạng."
      },
      {
        "id": "q4",
        "question": "Bạn đã clone đủ dự án về máy nhưng đang mất Internet. Điều nào đúng?",
        "type": "single",
        "options": [
          {
            "text": "Bạn vẫn có thể xem tệp và lịch sử đã có trên máy",
            "correct": true
          },
          {
            "text": "Git tự xóa lịch sử cục bộ khi không thấy mạng",
            "correct": false
          },
          {
            "text": "Không thể mở bất kỳ tệp nào trong dự án",
            "correct": false
          },
          {
            "text": "Mọi commit mới sẽ tự xuất hiện trên máy thành viên khác",
            "correct": false
          }
        ],
        "explanation": "Tệp và lịch sử trong bản clone đang nằm trên máy bạn. Mất Internet chỉ ngăn việc trao đổi dữ liệu với máy khác trong lúc đó."
      },
      {
        "id": "q5",
        "question": "Bạn sửa một tệp trong dự án. Điều gì cần làm để trạng thái đó thành mốc trong lịch sử Git?",
        "type": "single",
        "options": [
          {
            "text": "Chủ động tạo một commit sau khi chọn nội dung muốn lưu",
            "correct": true
          },
          {
            "text": "Chờ Git tự lưu tệp sau một khoảng thời gian",
            "correct": false
          },
          {
            "text": "Đổi tên tệp để lịch sử tự cập nhật",
            "correct": false
          },
          {
            "text": "Mở trang web để Git tự tạo mốc từ nội dung đang sửa",
            "correct": false
          }
        ],
        "explanation": "Git chỉ ghi một mốc mới khi bạn chủ động thực hiện commit. Chỉnh sửa hoặc lưu tệp thông thường chưa tạo commit."
      }
    ]
  }
};
export default lesson;
