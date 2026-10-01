import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "07-git-push",
  "moduleId": "04-github-collaboration",
  "metadata": {
    "id": "07-git-push",
    "title": "Đẩy commit lên server với git push",
    "level": "intermediate",
    "duration": 30,
    "xp": 95,
    "prerequisites": [
      "04-git-clone"
    ],
    "objectives": [
      "Sử dụng câu lệnh `git push` để đẩy các commit cục bộ lên máy chủ từ xa GitHub.",
      "Hiểu rõ ý nghĩa của cờ `-u` (`--set-upstream`) trong lần push đầu tiên của một nhánh mới.",
      "Chẩn đoán và xử lý tình huống bị máy chủ từ chối đẩy code (`[rejected - non-fast-forward]`).",
      "Nhận thức rõ mức độ nguy hiểm và quy tắc cấm kỵ đối với cờ cưỡng chế `--force` trên các nhánh dùng chung."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "push-remote"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git push",
      "day code",
      "push origin",
      "upstream tracking",
      "-u flag",
      "rejected"
    ],
    "commands": [
      "git push",
      "git push origin <tên-nhánh>",
      "git push -u origin <tên-nhánh>",
      "git push origin --all",
      "git push origin --delete <tên-nhánh>"
    ]
  },
  "content": "# Đẩy commit lên server với git push\n\n---\n\n## 🎯 Mục tiêu\n- Sử dụng câu lệnh `git push` để đẩy các commit cục bộ lên máy chủ từ xa GitHub.\n- Hiểu rõ ý nghĩa của cờ `-u` (`--set-upstream`) trong lần push đầu tiên của một nhánh mới.\n- Chẩn đoán và xử lý tình huống bị máy chủ từ chối đẩy code (`[rejected - non-fast-forward]`).\n- Nhận thức rõ mức độ nguy hiểm và quy tắc cấm kỵ đối với cờ cưỡng chế `--force` trên các nhánh dùng chung.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git push\n- **Nói dễ hiểu**: Lệnh tải toàn bộ commit mới từ máy tính của bạn lên máy chủ lưu trữ chung của dự án.\n- **Ví dụ**: `git push origin main` để đưa các commit cá nhân lên máy chủ GitHub.\n- **Đừng nhầm**: Không tải code của người khác về máy; lệnh chỉ gửi dữ liệu theo chiều từ máy bạn lên đám mây.\n\n### -u (set upstream)\n- **Nói dễ hiểu**: Tùy chọn ghi nhớ nhánh tương ứng trên máy chủ, giúp những lần sau chỉ cần gõ `git push`.\n- **Ví dụ**: `git push -u origin feature-auth` trong lần đẩy nhánh đầu tiên.\n- **Đừng nhầm**: Chỉ cần gõ một lần duy nhất khi tạo nhánh mới trên server; các lần sau không cần lặp lại cờ `-u`.\n\n### rejected non-fast-forward\n- **Nói dễ hiểu**: Lỗi máy chủ từ chối nhận code vì trên server có commit mới mà máy bạn chưa tải về.\n- **Ví dụ**: Đồng nghiệp vừa push trước bạn vài phút, bạn push sẽ nhận thông báo bị từ chối non-fast-forward.\n- **Đừng nhầm**: Đừng vội gõ `--force` để ép ghi đè; giải pháp đúng là chạy `git pull` để gộp code trước rồi push lại.\n\n---\n\n## 📖 Định nghĩa\n`git push` là lệnh xuất bản mã nguồn trong Git, truyền tải các commit snapshot từ máy tính cá nhân lên kho lưu trữ từ xa trên GitHub và cập nhật con trỏ nhánh trên máy chủ. Đây là bước quan trọng để chia sẻ kết quả lập trình cá nhân với toàn thể đội ngũ.\n\n---\n\n## 💡 Tại sao cần\nDù bạn viết code hay đến đâu trên máy cá nhân, nếu chưa đẩy lên máy chủ thì đồng nghiệp và hệ thống kiểm thử CI/CD vẫn không thể tiếp cận. Nắm vững `git push` giúp bạn công bố tính năng an toàn, xử lý nhanh khi bị từ chối do xung đột và tránh ghi đè dữ liệu của nhóm.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung viết commit trên máy tính như nhà văn viết một chương truyện mới tại phòng riêng. `git push` là hành động gửi chương truyện đó tới tòa soạn báo để xuất bản. Nếu tòa soạn báo cho biết đã có chương truyện khác vừa xuất bản trước đó, bạn cần nhận bản mới về đọc rồi mới gửi tiếp.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nCơ chế hoạt động của git push:\nMáy tính cá nhân (Local):       Máy chủ GitHub (Remote origin):\nNhánh main: C1 ──► C2 ──► C3    Nhánh main: C1 ──► C2\n            │                               │\n            └──────── git push origin main ─┘\n            (Đẩy C3 lên, cập nhật con trỏ remote main lên C3)\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nKỹ sư Tuấn hoàn thành chức năng tìm kiếm trên nhánh feature-search với 3 commit mới. Tuấn gõ lệnh `git push -u origin feature-search`. Git kết nối bảo mật tới GitHub, tạo nhánh mới trên server và đồng bộ commit. Terminal cung cấp sẵn đường dẫn trực tiếp để Tuấn tạo Pull Request trên giao diện web cho đồng nghiệp cùng review.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit push\ngit push origin <tên-nhánh>\ngit push -u origin <tên-nhánh>\ngit push origin --all\ngit push origin --delete <tên-nhánh>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git push`: Đẩy commit lên remote và nhánh mặc định đã được thiết lập tracking.\n- `git push origin <tên-nhánh>`: Đẩy nhánh chỉ định lên remote mang tên origin.\n- `git push -u origin <nhánh>`: Đẩy lên và ghi nhớ mối quan hệ upstream tracking để rút gọn lệnh sau này.\n- `git push origin --all`: Đẩy toàn bộ các nhánh cục bộ hiện có lên máy chủ cùng lúc.\n- `git push origin --delete <nhánh>`: Xóa bỏ một con trỏ nhánh trên máy chủ từ xa GitHub.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Lạm dụng cờ --force khi bị từ chối non-fast-forward**: Sẽ xóa mất các commit mà đồng nghiệp vừa đẩy lên máy chủ.\n2. **Quên cờ -u trong lần push đầu tiên của nhánh mới**: Khiến Git yêu cầu chỉ định rõ remote và branch ở những lần push tiếp theo.\n3. **Vô tình đẩy file chứa mật khẩu hoặc mã khóa bí mật**: Dễ làm lộ thông tin nhạy cảm lên GitHub công khai; cần kiểm tra kỹ trước khi push.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác đẩy nhánh lên remote và kiểm tra liên kết upstream.\n1. Tạo một nhánh mới `demo-push` và tạo một commit mới trên nhánh này.\n2. Chạy lệnh `git push -u origin demo-push` để đưa nhánh lên remote.\n3. Quan sát thông điệp phản hồi từ máy chủ GitHub xác nhận nhánh đã được tạo.\n4. Xóa nhánh trên remote để dọn dẹp bằng `git push origin --delete demo-push`.\n\n---\n\n## 💡 Hint & mẹo\n> Khi bị lỗi rejected non-fast-forward, hãy bình tĩnh chạy `git pull` trước để tích hợp code mới nhất từ đồng nghiệp, sau đó mới push lại.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Commit xuất hiện đầy đủ trên nhánh tương ứng tại máy chủ GitHub.\n- Lệnh `git status` báo nhánh cục bộ đã đồng bộ hoàn toàn với `origin/<nhánh>`.\n\n---\n\n## ❓ Quiz nhanh\nHãy hoàn thành các câu hỏi trắc nghiệm dưới đây để kiểm tra hiểu biết về câu lệnh git push.\n\n---\n\n## 🚀 Thử thách nâng cao\nTìm hiểu cơ chế bảo vệ nhánh (Branch Protection Rules) trên GitHub để hiểu vì sao các nhánh chính như `main` thường bị cấm push trực tiếp hoặc cấm push force.\n\n---\n\n## 📝 Tổng kết\n- `git push` đưa các commit từ kho cục bộ lên máy chủ từ xa GitHub.\n- Dùng cờ `-u` ở lần push đầu tiên để thiết lập liên kết theo dõi upstream.\n- Tuyệt đối không dùng cờ `--force` bừa bãi trên các nhánh dùng chung của nhóm.\n",
  "quiz": {
    "id": "quiz-04-07-git-push",
    "title": "Trắc nghiệm: Đẩy commit với git push",
    "questions": [
      {
        "id": "q1",
        "question": "Mục đích cốt lõi của cờ `-u` (hoặc `--set-upstream`) trong câu lệnh `git push -u origin feature` là gì?",
        "type": "single",
        "options": [
          {
            "text": "Thiết lập mối quan hệ theo dõi mặc định (tracking) giữa nhánh cục bộ và nhánh từ xa, giúp các lần sau chỉ cần gõ `git push` ngắn gọn",
            "correct": true
          },
          {
            "text": "Nâng cấp tài khoản GitHub của bạn lên gói trả phí doanh nghiệp",
            "correct": false
          },
          {
            "text": "Tự động mở khóa các tính năng ẩn của trình duyệt web",
            "correct": false
          },
          {
            "text": "Ép buộc xóa toàn bộ lịch sử cũ trên máy chủ",
            "correct": false
          }
        ],
        "explanation": "`-u` cấu hình upstream tracking branch, liên kết nhánh cục bộ với nhánh từ xa tương ứng."
      },
      {
        "id": "q2",
        "question": "Khi bạn chạy lệnh `git push` và nhận được thông báo lỗi `[rejected - non-fast-forward]`, nguyên nhân chính xác là gì?",
        "type": "single",
        "options": [
          {
            "text": "Trên máy chủ từ xa đã có những commit mới do người khác đẩy lên mà máy cục bộ của bạn chưa có",
            "correct": true
          },
          {
            "text": "Do máy tính của bạn bị mất bản quyền hệ điều hành",
            "correct": false
          },
          {
            "text": "Do tên nhánh của bạn quá dài vượt quá 8 ký tự",
            "correct": false
          },
          {
            "text": "Do bạn chưa thanh toán tiền điện thoại di động",
            "correct": false
          }
        ],
        "explanation": "Lỗi rejected xảy ra khi nhánh remote đã tiến xa hơn nhánh local; Git từ chối để tránh ghi đè làm mất commit của người khác."
      },
      {
        "id": "q3",
        "question": "Giải pháp an toàn và chuẩn mực nhất khi gặp thông báo lỗi `[rejected - non-fast-forward]` là gì?",
        "type": "single",
        "options": [
          {
            "text": "Chạy lệnh `git pull` để lấy commit mới về máy, giải quyết xung đột nếu có, rồi mới thực hiện `git push` lại",
            "correct": true
          },
          {
            "text": "Gõ lệnh `git push --force` ngay lập tức để đè bẹp code trên server",
            "correct": false
          },
          {
            "text": "Xóa toàn bộ dự án và bỏ cuộc",
            "correct": false
          },
          {
            "text": "Tạo tài khoản GitHub mới",
            "correct": false
          }
        ],
        "explanation": "Quy trình chuẩn mực: Pull về -> Merge/Rebase -> Test -> Push lại an toàn."
      },
      {
        "id": "q4",
        "question": "Tại sao cờ tùy chọn `--force` (hoặc `-f`) trong lệnh git push lại được coi là cực kỳ nguy hiểm trong làm việc nhóm?",
        "type": "single",
        "options": [
          {
            "text": "Vì nó cưỡng chế ghi đè lịch sử trên máy chủ, có thể làm biến mất vĩnh viễn các commit mà đồng nghiệp đã đẩy lên trước đó",
            "correct": true
          },
          {
            "text": "Vì nó làm tiêu hao toàn bộ bộ nhớ RAM của máy chủ",
            "correct": false
          },
          {
            "text": "Vì nó làm thay đổi giao diện đồ họa của hệ điều hành",
            "correct": false
          },
          {
            "text": "Vì nó làm tăng gấp đôi kích thước tệp tin mã nguồn",
            "correct": false
          }
        ],
        "explanation": "Push force ép server xóa bỏ lịch sử hiện tại để thay thế bằng lịch sử máy bạn, cực kỳ nguy hiểm trên nhánh chung."
      },
      {
        "id": "q5",
        "question": "Lệnh nào sau đây dùng để xóa một nhánh có tên `old-feature` trực tiếp trên máy chủ từ xa GitHub?",
        "type": "single",
        "options": [
          {
            "text": "git push origin --delete old-feature",
            "correct": true
          },
          {
            "text": "git remove remote old-feature",
            "correct": false
          },
          {
            "text": "git drop origin old-feature",
            "correct": false
          },
          {
            "text": "git erase cloud old-feature",
            "correct": false
          }
        ],
        "explanation": "`git push origin --delete <nhánh>` gửi chỉ thị xóa con trỏ nhánh trên máy chủ từ xa."
      },
      {
        "id": "q6",
        "question": "Nếu bạn đã cấu hình upstream tracking cho nhánh hiện tại bằng cờ `-u`, lệnh rút gọn nào dùng để đẩy commit lên server?",
        "type": "single",
        "options": [
          {
            "text": "git push",
            "correct": true
          },
          {
            "text": "git send",
            "correct": false
          },
          {
            "text": "git upload",
            "correct": false
          },
          {
            "text": "git sync-up",
            "correct": false
          }
        ],
        "explanation": "Khi đã có upstream, bạn chỉ cần gõ `git push` mà không cần truyền tên remote hay tên branch."
      }
    ]
  }
};
export default lesson;
