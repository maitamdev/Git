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
  "content": "# Đẩy commit lên server với git push\n\n---\n\n## 🎯 Mục tiêu\n- Sử dụng câu lệnh `git push` để đẩy các commit cục bộ lên máy chủ từ xa GitHub.\n- Hiểu rõ ý nghĩa của cờ `-u` (`--set-upstream`) trong lần push đầu tiên của một nhánh mới.\n- Chẩn đoán và xử lý tình huống bị máy chủ từ chối đẩy code (`[rejected - non-fast-forward]`).\n- Nhận thức rõ mức độ nguy hiểm và quy tắc cấm kỵ đối với cờ cưỡng chế `--force` trên các nhánh dùng chung.\n\n---\n\n## 📖 Định nghĩa\n> `git push` là câu lệnh xuất bản mã nguồn trong Git, có nhiệm vụ truyền tải các commit snapshot từ kho lưu trữ cục bộ trên máy tính của bạn lên kho lưu trữ từ xa trên máy chủ GitHub và cập nhật con trỏ nhánh trên máy chủ tiến về phía trước tương ứng. Đây là phương thức duy nhất để biến những thành quả lập trình cá nhân của bạn thành dữ liệu chung cho toàn bộ đội ngũ kỹ thuật cùng tiếp cận.\n\n---\n\n## 🤔 Tại sao cần?\nViết mã nguồn xuất sắc đến đâu nhưng nếu chỉ giữ trên máy tính cá nhân thì đồng nghiệp và hệ thống tự động hóa kiểm thử vẫn không thể kiểm tra hay đưa vào sản phẩm. `git push` là bước cuối cùng hoàn tất chu trình phát triển tính năng. Nắm vững lệnh push giúp bạn tự tin chia sẻ mã nguồn, biết cách xử lý khi bị server từ chối vì có người khác push trước, và tránh gây ra các tai họa làm mất code của cả nhóm.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung việc bạn viết code và commit trên máy tính cá nhân giống như một nhà văn ngồi sáng tác một chương tiểu thuyết mới trong phòng làm việc riêng. `git push` giống như hành động nhà văn đem bản thảo chương mới đó gửi lên tòa soạn báo để in ấn và phát hành ra toàn quốc. Nếu tòa soạn báo nhận thấy trước đó đã có một chương truyện khác vừa được xuất bản mà nhà văn chưa đọc (rejected), nhà văn phải cập nhật phiên bản mới nhất về đọc trước rồi mới được gửi tiếp.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCơ chế hoạt động của git push:\nMáy tính cá nhân (Local):       Máy chủ GitHub (Remote origin):\nNhánh main: C1 ──► C2 ──► C3    Nhánh main: C1 ──► C2\n            │                               │\n            └──────── git push origin main ─┘\n            (Đẩy C3 lên, cập nhật con trỏ remote main lên C3)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKỹ sư Tuấn vừa hoàn thành chức năng tìm kiếm sản phẩm nâng cao trên nhánh feature-search với 3 commit mới được kiểm thử kỹ lưỡng. Tuấn mở cửa sổ console và gõ lệnh: `git push -u origin feature-search`. Git kết nối bảo mật tới GitHub, tạo ra một nhánh mới có tên feature-search trên máy chủ từ xa, đẩy toàn bộ các commit lên đám mây và thiết lập mối quan hệ theo dõi upstream giữa hai nhánh. Màn hình console hiển thị đường dẫn trực tiếp mời Tuấn bấm vào để tạo Pull Request trên giao diện web của GitHub để các đồng nghiệp cùng tham gia review mã nguồn. Toàn bộ tiến trình diễn ra nhanh chóng chỉ trong vài giây.\n\n---\n\n## 💻 Command\n```bash\ngit push\ngit push origin <tên-nhánh>\ngit push -u origin <tên-nhánh>\ngit push origin --all\ngit push origin --delete <tên-nhánh>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git push`: Đẩy commit lên remote và nhánh mặc định đã được thiết lập tracking.\n- `git push origin <tên-nhánh>`: Đẩy nhánh chỉ định lên remote mang tên origin.\n- `git push -u origin <nhánh>`: Đẩy lên và ghi nhớ mối quan hệ upstream tracking (lần sau chỉ cần gõ `git push`).\n- `git push origin --all`: Đẩy toàn bộ các nhánh cục bộ hiện có lên máy chủ cùng một lúc.\n- `git push origin --delete <nhánh>`: Xóa bỏ một con trỏ nhánh trên máy chủ từ xa GitHub.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Bị từ chối [rejected - non-fast-forward] nhưng vội vàng push force**:  Sẽ ghi đè và làm biến mất vĩnh viễn các commit mà đồng nghiệp đã đẩy lên trước đó.\n2. **Quên cờ -u trong lần push đầu tiên của nhánh mới**:  Khiến lần sau gõ git push ngắn gọn bị Git nhắc nhở chưa có upstream tracking.\n3. **Push nhầm nhánh thử nghiệm chứa mật khẩu hoặc mã bí mật lên GitHub công khai.**: Push nhầm nhánh thử nghiệm chứa mật khẩu hoặc mã bí mật lên GitHub công khai.\n\n---\n\n## 🧪 Lab\n1. Tạo một nhánh mới `demo-push` và tạo một commit mới trên nhánh này.\n2. Chạy lệnh `git push -u origin demo-push` để đưa nhánh lên remote.\n3. Quan sát thông điệp phản hồi từ máy chủ GitHub xác nhận nhánh đã được tạo.\n4. Xóa nhánh trên remote để dọn dẹp bằng `git push origin --delete demo-push`.\n\n---\n\n## 💡 Hint\n> Nếu bị lỗi rejected non-fast-forward, hãy chạy `git pull` trước để tích hợp code mới rồi mới push lại.\n\n---\n\n## ✅ Validation\n- Đẩy thành công commit lên remote GitHub và thiết lập đúng upstream tracking.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh xuất bản git push.\n\n---\n\n## 🔥 Challenge\nTại sao trong các doanh nghiệp lớn, việc gõ cờ `--force` lên nhánh `main` luôn bị chặn bởi quyền hạn của hệ thống?\n\n---\n\n## 📚 Tổng kết\n- `git push` đưa các commit từ kho cục bộ lên máy chủ từ xa GitHub.\n- Dùng cờ `-u` ở lần push đầu tiên để thiết lập liên kết theo dõi upstream.\n- Tuyệt đối không dùng cờ `--force` bừa bãi trên các nhánh dùng chung.\n",
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
