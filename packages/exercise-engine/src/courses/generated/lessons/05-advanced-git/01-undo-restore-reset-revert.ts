import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "01-undo-restore-reset-revert",
  "moduleId": "05-advanced-git",
  "metadata": {
    "id": "01-undo-restore-reset-revert",
    "title": "Undo trong Git: restore/reset/revert khác nhau",
    "level": "advanced",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "16-team-project-challenge"
    ],
    "objectives": [
      "Phân biệt rõ ràng mục đích, phạm vi tác động và ngữ cảnh sử dụng của 3 cơ chế hoàn tác: restore, reset và revert.",
      "Hiểu rõ sự khác biệt giữa hoàn tác tệp tin trong Working Tree/Staging và hoàn tác commit trong lịch sử.",
      "Nhận thức tính an toàn của git revert khi làm việc trên các nhánh cộng tác dùng chung so với git reset.",
      "Lựa chọn chính xác câu lệnh hoàn tác phù hợp nhất cho từng tình huống phát sinh lỗi thực tế."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "undo git",
      "git restore",
      "git reset",
      "git revert",
      "hoan tac",
      "so sanh undo"
    ],
    "commands": [
      "git restore <tên-tệp>",
      "git restore --staged <tên-tệp>",
      "git reset --mixed HEAD~1",
      "git revert <commit-hash>"
    ]
  },
  "content": "# Undo trong Git: restore/reset/revert khác nhau\n\n---\n\n## 🎯 Mục tiêu\n- Phân biệt rõ ràng mục đích, phạm vi tác động và ngữ cảnh sử dụng của 3 cơ chế hoàn tác: restore, reset và revert.\n- Hiểu rõ sự khác biệt giữa hoàn tác tệp tin trong Working Tree/Staging và hoàn tác commit trong lịch sử.\n- Nhận thức tính an toàn của git revert khi làm việc trên các nhánh cộng tác dùng chung so với git reset.\n- Lựa chọn chính xác câu lệnh hoàn tác phù hợp nhất cho từng tình huống phát sinh lỗi thực tế.\n\n---\n\n## 📖 Định nghĩa\n> Trong hệ thống quản lý phiên bản Git, nhu cầu hoàn tác (Undo) có thể xảy ra ở nhiều tầng kiến trúc khác nhau, từ việc hủy bỏ những chỉnh sửa chưa lưu trong thư mục làm việc cho đến việc thu hồi toàn bộ một commit đã xuất bản lên máy chủ. Để đáp ứng các kịch bản đó một cách chính xác, Git cung cấp bộ 3 công cụ hoàn tác chuyên biệt: `git restore` chuyên trách xử lý tệp tin ở Working Tree và Staging Area, `git reset` dịch chuyển con trỏ nhánh để viết lại lịch sử cục bộ, và `git revert` tạo commit đảo ngược an toàn cho các nhánh dùng chung.\n\n---\n\n## 🤔 Tại sao cần?\nSai lầm phổ biến nhất của các lập trình viên mới học Git là dùng sai công cụ hoàn tác, dẫn đến việc vô tình xóa sạch công sức lập trình cả ngày mà không thể lấy lại. Nắm vững ranh giới giữa restore, reset và revert giúp bạn làm chủ hoàn toàn các cỗ máy thời gian của Git: bạn biết chính xác khi nào chỉ cần hủy chỉnh sửa cục bộ, khi nào nên xóa bỏ commit thử nghiệm trên máy riêng, và khi nào bắt buộc phải dùng revert để bảo vệ an toàn cho đồng nghiệp đang cùng làm việc trên nhánh chung.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung việc soạn thảo một bức thư tay quan trọng gửi khách hàng. `git restore` giống như việc bạn dùng cục tẩy để xóa một từ vừa viết sai trên giấy nháp trước khi cho vào phong bì. `git reset` giống như việc bạn xé bỏ bức thư vừa viết xong ném vào sọt rác và lùi lại thời điểm trước khi đặt bút viết. Còn `git revert` giống như việc bạn đã trót gửi bức thư đi qua bưu điện, bạn không thể đến nhà khách hàng để lấy lại thư, nên bạn viết tiếp một bức thư đính chính thứ hai gửi đến để hủy bỏ hiệu lực của bức thư thứ nhất.\n\n---\n\n## 🖼 Sơ đồ\n```text\nBản đồ 3 cơ chế Undo trong Git:\nWorking Tree / Staging:  git restore <file> (Hủy sửa đổi tệp tin)\nLocal Branch History:    git reset (Dịch chuyển HEAD & nhánh lùi về quá khứ)\nPublic / Shared Branch:  git revert (Tạo commit mới phủ định commit cũ)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKỹ sư Nam trong một buổi chiều làm việc đã gặp phải 3 tình huống cần hoàn tác khác nhau. Đầu tiên, Nam vô tình sửa hỏng tệp cấu hình database.js nhưng chưa lưu vào staging, Nam chạy `git restore database.js` để trả lại trạng thái nguyên bản. Tiếp đó, Nam tạo thử 2 commit thử nghiệm tính năng trên nhánh cá nhân và không ưng ý, Nam chạy `git reset --hard HEAD~2` để xóa bỏ hoàn toàn 2 commit đó. Cuối cùng, Nam phát hiện một commit đã push lên nhánh main gây lỗi thanh toán, Nam lập tức chạy `git revert HEAD` để sinh ra một commit mới đảo ngược logic hỏng mà không làm xáo trộn lịch sử của cả đội ngũ.\n\n---\n\n## 💻 Command\n```bash\ngit restore <tên-tệp>\ngit restore --staged <tên-tệp>\ngit reset --mixed HEAD~1\ngit revert <commit-hash>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git restore <tệp>`: Khôi phục nội dung tệp tin trong Working Directory về trạng thái của commit gần nhất.\n- `git restore --staged <tệp>`: Đưa tệp tin ra khỏi Staging Area mà vẫn giữ nguyên nội dung chỉnh sửa.\n- `git reset`: Dịch chuyển con trỏ nhánh về commit chỉ định và điều chỉnh lại Staging hoặc Working Tree.\n- `git revert <hash>`: Tạo ra một commit hoàn toàn mới mang nội dung đảo ngược lại commit được chỉ định.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Sử dụng git reset --hard trên nhánh dùng chung đã push lên GitHub**:  Làm sai lệch lịch sử của tất cả các đồng nghiệp khác.\n2. **Nhầm lẫn giữa git restore và git reset**:  Dùng reset khi chỉ muốn hủy thay đổi của một tệp đơn lẻ.\n3. **Sợ hãi không dám dùng revert vì nghĩ revert sẽ xóa mất commit cũ**:  Revert chỉ tạo thêm commit mới chứ không xóa lịch sử.\n\n---\n\n## 🧪 Lab\n1. Tạo một chỉnh sửa nhỏ trong tệp `test.txt` và hủy bỏ bằng lệnh `git restore test.txt`.\n2. Thêm tệp vào staging bằng `git add` rồi rút ra bằng `git restore --staged test.txt`.\n3. Tạo một commit thử nghiệm và thực hiện `git revert HEAD` để quan sát commit đảo ngược.\n4. Kiểm tra lại lịch sử bằng `git log --oneline` để xác nhận commit mới được tạo ra an toàn.\n\n---\n\n## 💡 Hint\n> Nhớ nguyên tắc vàng: Nhánh cá nhân dùng reset, nhánh cộng tác dùng chung luôn luôn dùng revert.\n\n---\n\n## ✅ Validation\n- Phân biệt chính xác và thực hành thành thạo 3 cơ chế hoàn tác restore, reset và revert.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về các cơ chế hoàn tác trong Git.\n\n---\n\n## 🔥 Challenge\nTại sao lệnh `git checkout` trước phiên bản Git 2.23 bị coi là quá tải (overloaded) và cần tách thành switch và restore?\n\n---\n\n## 📚 Tổng kết\n- `git restore` chuyên dùng để khôi phục trạng thái tệp tin trong Working Directory hoặc Staging Area.\n- `git reset` dịch chuyển con trỏ nhánh lùi về quá khứ, phù hợp cho việc viết lại lịch sử cục bộ.\n- `git revert` tạo commit mới đảo ngược commit cũ, là phương pháp an toàn duy nhất trên nhánh dùng chung.\n",
  "quiz": {
    "id": "quiz-05-01-undo-restore-reset-revert",
    "title": "Trắc nghiệm: Phân biệt restore, reset và revert",
    "questions": [
      {
        "id": "q1",
        "question": "Công cụ nào sau đây an toàn nhất để hoàn tác một commit đã được push lên nhánh `main` dùng chung của nhóm?",
        "type": "single",
        "options": [
          {
            "text": "git revert <commit-hash>",
            "correct": true
          },
          {
            "text": "git reset --hard HEAD~1",
            "correct": false
          },
          {
            "text": "git restore --all",
            "correct": false
          },
          {
            "text": "Xóa thư mục .git trên máy chủ",
            "correct": false
          }
        ],
        "explanation": "`git revert` tạo ra một commit mới đảo ngược thay đổi mà không viết lại lịch sử, an toàn tuyệt đối cho nhánh dùng chung."
      },
      {
        "id": "q2",
        "question": "Lệnh nào sau đây dùng để hủy bỏ các thay đổi chưa commit của một tệp tin trong Working Directory kể từ Git 2.23?",
        "type": "single",
        "options": [
          {
            "text": "git restore <tên-tệp>",
            "correct": true
          },
          {
            "text": "git reset <tên-tệp>",
            "correct": false
          },
          {
            "text": "git revert <tên-tệp>",
            "correct": false
          },
          {
            "text": "git clean -f",
            "correct": false
          }
        ],
        "explanation": "`git restore <tệp>` khôi phục nội dung tệp trong Working Tree về trạng thái đã lưu gần nhất."
      },
      {
        "id": "q3",
        "question": "Hậu quả nghiêm trọng nhất khi bạn chạy `git reset --hard` trên một nhánh đang có nhiều người cùng làm việc là gì?",
        "type": "single",
        "options": [
          {
            "text": "Lịch sử bị viết lại, gây xung đột và từ chối push khi đồng nghiệp cố gắng đồng bộ mã nguồn",
            "correct": true
          },
          {
            "text": "Máy chủ GitHub sẽ tự động xóa tài khoản của bạn",
            "correct": false
          },
          {
            "text": "Tất cả các máy tính của nhóm sẽ bị tắt nguồn đột ngột",
            "correct": false
          },
          {
            "text": "Dự án sẽ tự động chuyển đổi sang ngôn ngữ lập trình khác",
            "correct": false
          }
        ],
        "explanation": "Viết lại lịch sử bằng reset trên nhánh chung phá vỡ mối quan hệ commit của toàn bộ đội ngũ, tạo ra hỗn loạn."
      },
      {
        "id": "q4",
        "question": "Lệnh nào dùng để đưa một tệp tin đã lỡ `git add` ra khỏi Staging Area mà không làm mất nội dung chỉnh sửa?",
        "type": "single",
        "options": [
          {
            "text": "git restore --staged <tên-tệp>",
            "correct": true
          },
          {
            "text": "git restore --discard <tên-tệp>",
            "correct": false
          },
          {
            "text": "git reset --delete <tên-tệp>",
            "correct": false
          },
          {
            "text": "git remove --force <tên-tệp>",
            "correct": false
          }
        ],
        "explanation": "`git restore --staged <tệp>` bỏ đánh dấu chuẩn bị commit, giữ nguyên trạng thái tệp trong Working Tree."
      }
    ]
  }
};
export default lesson;
