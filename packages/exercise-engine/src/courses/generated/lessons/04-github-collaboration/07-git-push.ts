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
      "Nhận biết lỗi non-fast-forward và kiểm tra/tích hợp thay đổi remote trước khi thử push lại.",
      "Tránh force-push lên nhánh dùng chung khi chưa hiểu tác động và chưa có sự đồng thuận."
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
      "git push -u origin <tên-nhánh>"
    ]
  },
  "content": "# Đẩy commit lên server với git push\n\n---\n\n## 🎯 Mục tiêu\n- Sử dụng thành thạo câu lệnh `git push` để đẩy các commit cục bộ lên máy chủ từ xa GitHub an toàn.\n- Nắm vững vai trò và ý nghĩa của cờ `-u` (`--set-upstream`) khi thiết lập nhánh mới lần đầu tiên.\n- Nhận diện và xử lý chuẩn xác tình huống bị máy chủ từ chối đẩy code (`[rejected - non-fast-forward]`).\n- Thấu hiểu rủi ro nghiêm trọng của cờ cưỡng chế `--force` và quy tắc vàng bảo vệ các nhánh dùng chung.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git push\n- **Nói dễ hiểu:** Lệnh tải toàn bộ các commit mới từ máy tính của bạn lên máy chủ lưu trữ GitHub của dự án.\n- **Ví dụ:** Lệnh `git push origin main` đưa các commit bạn vừa tạo lên nhánh chính trên máy chủ từ xa.\n- **Đừng nhầm:** Lệnh chỉ đẩy các commit đã lưu trong kho cục bộ lên mây; những thay đổi chưa commit trong file sẽ không được gửi đi.\n\n### -u / --set-upstream — thiết lập theo dõi\n- **Nói dễ hiểu:** Tùy chọn giúp Git ghi nhớ nhánh trên máy chủ làm đích đến mặc định cho nhánh cục bộ hiện tại.\n- **Ví dụ:** Bạn gõ `git push -u origin feature-cart` ở lần đầu; từ những lần sau bạn chỉ cần gõ vắn tắt `git push`.\n- **Đừng nhầm:** Bạn chỉ cần truyền cờ `-u` duy nhất một lần khi xuất bản nhánh mới; không cần gõ lặp lại ở các lần push kế tiếp.\n\n### rejected non-fast-forward — từ chối đẩy code\n- **Nói dễ hiểu:** Lỗi máy chủ từ chối nhận code vì trên GitHub đang có commit mới của đồng đội mà máy bạn chưa kéo về.\n- **Ví dụ:** Đồng đội vừa push commit lên nhánh `main`, bạn chưa kịp pull mà bấm push thì Git sẽ lập tức chặn lại để bảo vệ dữ liệu.\n- **Đừng nhầm:** Tuyệt đối không dùng cờ `--force` để ép ghi đè xóa mất code của đồng đội; giải pháp chuẩn là `git pull` về gộp rồi mới push lại.\n\n---\n\n## 📖 Định nghĩa\n`git push` là lệnh xuất bản mã nguồn trong Git, có nhiệm vụ truyền tải các commit mới từ kho lưu trữ cục bộ trên máy tính cá nhân lên kho lưu trữ từ xa trên máy chủ GitHub và cập nhật con trỏ nhánh tương ứng, giúp toàn bộ đội ngũ có thể tiếp cận và sử dụng thành quả làm việc của bạn.\n\n---\n\n## 🤔 Tại sao cần?\nDù bạn có viết ra những dòng mã nguồn xuất sắc đến đâu trên máy tính cá nhân, dự án vẫn không thể hoàn thành nếu các commit đó bị cô lập ở ổ cứng của bạn. Lệnh `git push` là cầu nối công khai thành quả, kích hoạt các pipeline kiểm thử tự động CI/CD và mở đường cho quy trình phản biện mã nguồn (Code Review) chuyên nghiệp trước khi đưa tính năng lên môi trường Production.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung việc viết commit trên máy tính như một tác giả đang viết bản thảo từng chương sách trong phòng kín. Câu lệnh `git push` chính là hành động đem các chương bản thảo hoàn thiện đó nộp lên nhà xuất bản để in ấn và phát hành ra công chúng. Nếu nhà xuất bản thông báo đã có tác giả khác vừa nộp bản chỉnh sửa trước, bạn bắt buộc phải nhận về đối chiếu trước khi gửi tiếp.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCƠ CHẾ XUẤT BẢN COMMIT CỦA LỆNH GIT PUSH:\n\nMáy tính cá nhân (Local):       Máy chủ GitHub (Remote origin):\nNhánh main: C1 ──► C2 ──► C3    Nhánh main: C1 ──► C2\n            │                               │\n            └──────── git push origin main ─┘\n            (Đẩy C3 lên, cập nhật con trỏ remote main lên C3)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nSau khi hoàn thiện chức năng bộ lọc tìm kiếm sản phẩm với 3 commit trau chuốt, bạn gõ lệnh `git push -u origin feature-search`. Git lập tức truyền các commit lên GitHub, tạo nhánh mới trên máy chủ và thiết lập liên kết theo dõi. Terminal phản hồi một đường dẫn tiện lợi giúp bạn bấm vào để mở Pull Request mời đồng đội thẩm định mã nguồn ngay lập tức.\n\n---\n\n## 💻 Command\n```bash\ngit push\ngit push origin main\ngit push -u origin feature-login\ngit push origin --delete old-feature\n```\n\n---\n\n## 🔍 Giải thích command\n- `git push`: Đẩy các commit lên remote và nhánh mặc định đã được cấu hình tracking từ trước.\n- `git push origin main`: Đẩy nhánh cục bộ `main` lên máy chủ remote mang tên `origin`.\n- `git push -u origin feature-login`: Xuất bản nhánh mới lên server kèm thiết lập upstream tracking để các lần sau chỉ cần gõ `git push`.\n- `git push origin --delete old-feature`: Gửi lệnh yêu cầu máy chủ GitHub xóa bỏ hoàn toàn nhánh `old-feature` từ xa sau khi đã hoàn thành tích hợp.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Lạm dụng cờ ép buộc `--force` khi bị từ chối**: Xóa vĩnh viễn commit của các thành viên khác trên máy chủ trung tâm, gây tê liệt cả đội dự án.\n2. **Quên cờ `-u` ở lần đẩy nhánh mới đầu tiên**: Khiến Git liên tục yêu cầu bạn phải gõ đầy đủ tên remote và tên branch ở mọi lần đẩy tiếp theo.\n3. **Vô tình push nhầm file chứa mã khóa bí mật hoặc mật khẩu**: Gây rò rỉ an ninh nghiêm trọng khi đưa tệp cấu hình chứa API key lên GitHub công khai.\n\n---\n\n## 🧪 Lab\n1. Chạy lệnh: `git status` để kiểm tra số lượng commit mới đang nằm chờ đẩy lên máy chủ.\n2. Tạo một nhánh tính năng mới: `git switch -c feature-demo-push`.\n3. Tạo một commit nhỏ để thử nghiệm: `git commit --allow-empty -m \"feat: test push command\"`.\n4. Xuất bản nhánh tính năng lên remote kèm theo cờ theo dõi: `git push -u origin feature-demo-push`.\n5. Kiểm tra thông tin liên kết vừa thiết lập bằng lệnh: `git branch -vv`.\n\n---\n\n## 💡 Hint\n> Hãy ghi nhớ lời răn vàng của các kỹ sư Git lão luyện: \"Khi bị máy chủ từ chối vì non-fast-forward, hãy xem đó là món quà cứu nguy chứ không phải chướng ngại. Đừng bao giờ gõ force push mà hãy pull về gộp trước!\"\n\n---\n\n## ✅ Validation\n- Nhận thức chuẩn xác vai trò của cờ `-u` trong lần đầu xuất bản nhánh lên máy chủ.\n- Hiểu rõ nguyên nhân và hướng xử lý chuẩn tắc khi bị từ chối với lỗi non-fast-forward.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để rà soát kiến thức về các câu lệnh và tùy chọn của `git push`.\n\n---\n\n## 🔥 Challenge\nTrong thực tế, khi nào lập trình viên được phép sử dụng cờ `--force-with-lease` thay vì `--force` thông thường? Tại sao các chuyên gia DevOps lại coi `--force-with-lease` là giải pháp thay thế an toàn hơn rất nhiều?\n\n---\n\n## 📚 Tổng kết\n- `git push` truyền tải các commit từ kho cục bộ lên máy chủ đám mây GitHub.\n- Sử dụng `-u` (`--set-upstream`) để gắn kết nhánh cục bộ với nhánh trên server.\n- Tuyệt đối tôn trọng quy tắc an toàn dữ liệu, không bao giờ dùng `--force` bừa bãi lên nhánh chung.\n",
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
            "text": "Chạy `git fetch`, kiểm tra thay đổi remote, tích hợp theo quy trình của nhóm rồi thử push lại",
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
        "explanation": "Fetch và kiểm tra trước giúp bạn hiểu thay đổi remote rồi mới chọn cách tích hợp phù hợp."
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
        "question": "Bạn nên kiểm tra điều gì trước khi đẩy commit lên repository công khai?",
        "type": "single",
        "options": [
          {
            "text": "Kiểm tra diff để chắc chắn không có token, mật khẩu hoặc thông tin nhạy cảm",
            "correct": true
          },
          {
            "text": "Xóa thư mục `.git` để Git không tải nhầm file",
            "correct": false
          },
          {
            "text": "Đổi tên commit thành một chuỗi ngẫu nhiên",
            "correct": false
          },
          {
            "text": "Tắt Internet để lệnh push chạy nhanh hơn",
            "correct": false
          }
        ],
        "explanation": "Diff giúp phát hiện dữ liệu bí mật trước khi commit được chia sẻ với người khác."
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
