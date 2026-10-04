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
      "Biết vì sao revert thường dễ phối hợp hơn reset khi commit đã được chia sẻ.",
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
  "content": "# Undo trong Git: restore/reset/revert khác nhau\n\n---\n\n## 🎯 Mục tiêu\n- Phân biệt rõ ràng mục đích, phạm vi tác động và ngữ cảnh sử dụng của 3 cơ chế hoàn tác: restore, reset và revert.\n- Hiểu rõ sự khác biệt giữa hoàn tác tệp tin trong Working Tree/Staging và hoàn tác commit trong lịch sử.\n- Nhận thức tính an toàn của git revert khi làm việc trên các nhánh cộng tác dùng chung so với git reset.\n- Lựa chọn chính xác câu lệnh hoàn tác phù hợp nhất cho từng tình huống phát sinh lỗi thực tế.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git restore\n- **Nói dễ hiểu**: Lệnh đưa file trong thư mục làm việc về bản đang được stage; với `--staged`, đưa bản stage về trạng thái của `HEAD`.\n- **Ví dụ**: `git restore index.html` hủy phần sửa chưa stage; `git restore --staged index.html` bỏ stage nhưng giữ phần sửa trong file.\n- **Đừng nhầm**: Khôi phục có thể xóa phần sửa bạn chưa lưu vào commit. Hãy xem `git diff` trước khi chạy.\n\n### git reset\n- **Nói dễ hiểu**: Ở dạng `git reset <commit>`, lệnh chuyển nhánh hiện tại về commit khác; `--soft`, `--mixed`, `--hard` quyết định Git xử lý Staging và file ra sao.\n- **Ví dụ**: `git reset --soft HEAD~1` để mở lại commit vừa tạo nhằm bổ sung thêm file.\n- **Đừng nhầm**: `git reset <file>` chỉ bỏ stage file, không di chuyển nhánh. Reset commit đã chia sẻ cần phối hợp với nhóm.\n\n### git revert\n- **Nói dễ hiểu**: Lệnh tạo commit mới để áp dụng phần thay đổi ngược với commit cũ.\n- **Ví dụ**: `git revert 4a8b2c` để vô hiệu hóa một bản vá bị lỗi mà không làm mất lịch sử cũ.\n- **Đừng nhầm**: Git có thể dừng vì xung đột; nếu sau đó file đã đổi, kết quả không nhất thiết là bản sao y nguyên trước commit cũ.\n\n---\n\n## 📖 Định nghĩa\nTrong Git, việc hoàn tác có thể nhắm vào file hoặc commit. `git restore` khôi phục nội dung file; `git reset <commit>` di chuyển nhánh hiện tại và tùy chế độ sẽ cập nhật Staging hoặc Working Tree; `git revert` tạo commit mới áp dụng thay đổi ngược. Với commit đã chia sẻ, `revert` thường dễ phối hợp hơn vì giữ nguyên commit cũ trong lịch sử.\n\n---\n\n## 🤔 Tại sao cần?\nBa lệnh giải quyết ba việc khác nhau: `restore` đưa nội dung file về trạng thái đã lưu, `reset` di chuyển ref và có thể bỏ thay đổi, còn `revert` tạo commit mới để đảo một thay đổi. Với commit đã chia sẻ, nhóm thường chọn `revert` để tránh viết lại lịch sử mà đồng nghiệp đã lấy về.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung bạn đang soạn thảo một bức thư tay. `git restore` như dùng cục tẩy xóa một từ vừa viết sai trên giấy nháp. `git reset` như vò bức thư vừa viết ném vào sọt rác để lùi lại lúc chưa đặt bút. Còn `git revert` như bạn đã trót gửi thư qua bưu điện, bạn viết thêm bức thư đính chính thứ hai gửi tiếp để hủy bỏ hiệu lực thư trước.\n\n---\n\n## 🖼 Sơ đồ\n```text\nBản đồ 3 cơ chế Undo trong Git:\nWorking Tree / Staging:  git restore <file> (Hủy sửa đổi tệp tin)\nLocal Branch History:    git reset (Dịch chuyển HEAD & nhánh lùi về quá khứ)\nPublic / Shared Branch:  git revert (Tạo commit mới phủ định commit cũ)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKỹ sư Nam trong một buổi chiều gặp 3 tình huống hoàn tác: Đầu tiên, Nam sửa hỏng file cấu hình chưa add, chạy `git restore config.json` để lấy lại bản cũ. Tiếp đó, Nam tạo 2 commit thử nghiệm riêng không ưng ý, chạy `git reset --hard HEAD~2` để xóa sạch. Cuối cùng, một commit đã push lên main gây lỗi, Nam lập tức chạy `git revert HEAD` để sinh commit đảo ngược an toàn cho cả nhóm.\n\n---\n\n## 💻 Command\n```bash\ngit restore <tên-tệp>\ngit restore --staged <tên-tệp>\ngit reset --mixed HEAD~1\ngit revert <commit-hash>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git restore <tệp>`: Mặc định khôi phục file trong Working Tree từ Staging Area; phần sửa chưa stage có thể bị mất.\n- `git restore --staged <tệp>`: Khôi phục bản stage từ `HEAD`, thường dùng để bỏ stage mà vẫn giữ nội dung file.\n- `git reset`: Dịch chuyển con trỏ nhánh về commit chỉ định và điều chỉnh lại Staging hoặc Working Tree.\n- `git revert <hash>`: Tạo commit mới áp dụng thay đổi ngược với commit được chỉ định. Có thể cần xử lý conflict.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Dùng git reset trên nhánh dùng chung đã push lên GitHub**: Viết lại lịch sử làm sai lệch và gây lỗi đồng bộ nghiêm trọng cho đồng nghiệp.\n2. **Nhầm lẫn giữa git restore và git reset**: Dùng reset khi chỉ muốn hủy thay đổi chưa lưu của một file đơn lẻ.\n3. **Lo sợ dùng git revert vì nghĩ nó xóa mất code cũ**: Revert chỉ tạo thêm commit mới tiến về phía trước chứ không xóa lịch sử quá khứ.\n\n---\n\n## 🧪 Lab\nHãy cùng tôi bắt tay vào thực hành từng bước dưới đây để thấy rõ sự khác biệt giữa 3 câu lệnh hoàn tác:\n1. Làm trong kho thử nghiệm riêng. Tạo `test.txt` với nội dung `v1`, rồi chạy `git add test.txt` và `git commit -m \"base\"`.\n2. Đổi nội dung thành `v2`, chạy `git restore test.txt`, rồi mở file để xác nhận nội dung trở lại `v1`.\n3. Đổi nội dung thành `v2` lần nữa, chạy `git add test.txt`, rồi `git restore --staged test.txt`. Chạy `git status`: file còn sửa nhưng đã bỏ stage.\n4. Stage và commit thay đổi `v2` bằng `git add test.txt` và `git commit -m \"change test file\"`.\n5. Chạy `git revert HEAD`, xác nhận file trở lại `v1`, rồi dùng `git log --oneline -3` để thấy commit gốc và commit revert cùng còn trong lịch sử.\n\n---\n\n## 💡 Hint\n> Trước khi hoàn tác, xác định thay đổi đang ở file, Staging hay trong commit. Với commit đã chia sẻ, hãy kiểm tra quy trình của nhóm; `revert` thường giữ lịch sử dễ phối hợp hơn.\n\n---\n\n## ✅ Validation\n- Mô tả được `restore` tác động lên file, `reset` có thể di chuyển nhánh ở dạng commit, và `revert` tạo commit mới.\n- Nhận ra file sửa chưa commit có thể bị mất khi dùng `restore` hoặc `reset --hard`.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về các cơ chế hoàn tác trong Git.\n\n---\n\n## 🔥 Challenge\nTìm hiểu vì sao trước phiên bản Git 2.23 lệnh `git checkout` phải đảm nhiệm cả việc chuyển nhánh và khôi phục file, dẫn đến việc tách ra thành `git switch` và `git restore`.\n\n---\n\n## 📚 Tổng kết\n- `git restore` chuyên dùng để khôi phục trạng thái tệp tin trong Working Directory hoặc Staging Area.\n- `git reset` dịch chuyển con trỏ nhánh lùi về quá khứ, phù hợp cho việc viết lại lịch sử cục bộ.\n- `git revert` tạo commit mới áp dụng thay đổi ngược; hãy kiểm tra kết quả, nhất là khi các commit sau đó sửa cùng file.\n",
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
        "explanation": "`git revert` tạo commit mới để đảo thay đổi, nên thường phù hợp với nhánh dùng chung. Vẫn cần xem diff và xử lý conflict nếu có."
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
      },
      {
        "id": "q5",
        "question": "Điểm khác biệt căn bản nhất về mặt lịch sử giữa `git reset` và `git revert` là gì?",
        "type": "single",
        "options": [
          {
            "text": "git reset di chuyển con trỏ nhánh lùi lại quá khứ (viết lại lịch sử), còn git revert tạo commit mới đảo ngược thay đổi (bảo tồn lịch sử)",
            "correct": true
          },
          {
            "text": "git reset chỉ dùng cho file văn bản, còn git revert chỉ dùng cho file ảnh",
            "correct": false
          },
          {
            "text": "git revert bắt buộc phải kết nối Internet tới máy chủ GitHub",
            "correct": false
          },
          {
            "text": "git reset tự động xóa tài khoản người dùng trên máy tính",
            "correct": false
          }
        ],
        "explanation": "Reset di chuyển con trỏ nhánh lùi về quá khứ và có thể làm mất commit, trong khi revert tạo thêm commit mới tiến về phía trước để đảo ngược tác động."
      }
    ]
  }
};
export default lesson;
