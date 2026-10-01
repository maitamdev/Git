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
  "content": "# Undo trong Git: restore/reset/revert khác nhau\n\n---\n\n## 🎯 Mục tiêu\n- Phân biệt rõ ràng mục đích, phạm vi tác động và ngữ cảnh sử dụng của 3 cơ chế hoàn tác: restore, reset và revert.\n- Hiểu rõ sự khác biệt giữa hoàn tác tệp tin trong Working Tree/Staging và hoàn tác commit trong lịch sử.\n- Nhận thức tính an toàn của git revert khi làm việc trên các nhánh cộng tác dùng chung so với git reset.\n- Lựa chọn chính xác câu lệnh hoàn tác phù hợp nhất cho từng tình huống phát sinh lỗi thực tế.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git restore\n- **Nói dễ hiểu**: Lệnh khôi phục hoặc xóa bỏ các sửa đổi ở cấp độ file trong Working Tree hoặc Staging Area.\n- **Ví dụ**: `git restore index.html` để hủy các dòng vừa gõ nhầm và lấy lại bản lưu trước đó.\n- **Đừng nhầm**: Không xóa commit trong lịch sử; lệnh này chỉ tác động lên file hiện tại trên máy bạn.\n\n### git reset\n- **Nói dễ hiểu**: Lệnh di chuyển con trỏ nhánh lùi về commit cũ trong quá khứ để viết lại lịch sử cục bộ.\n- **Ví dụ**: `git reset --soft HEAD~1` để mở lại commit vừa tạo nhằm bổ sung thêm file.\n- **Đừng nhầm**: Viết lại lịch sử; tuyệt đối không dùng trên các nhánh đã push lên GitHub dùng chung với đồng nghiệp.\n\n### git revert\n- **Nói dễ hiểu**: Lệnh tạo một commit mới tinh có nội dung đảo ngược hoàn toàn tác động của một commit cũ gây lỗi.\n- **Ví dụ**: `git revert 4a8b2c` để vô hiệu hóa một bản vá bị lỗi mà không làm mất lịch sử cũ.\n- **Đừng nhầm**: Không xóa bỏ commit cũ; cả commit lỗi và commit đảo ngược đều tồn tại rõ ràng trong nhật ký.\n\n---\n\n## 📖 Định nghĩa\nTrong Git, nhu cầu hoàn tác (Undo) có thể xảy ra ở nhiều tầng kiến trúc khác nhau, từ việc hủy bỏ chỉnh sửa file chưa lưu cho đến thu hồi commit đã đẩy lên mạng. Git cung cấp bộ 3 công cụ: `git restore` xử lý tệp ở Working Tree và Staging, `git reset` dịch con trỏ nhánh viết lại lịch sử cục bộ, và `git revert` tạo commit đảo ngược an toàn trên nhánh dùng chung.\n\n---\n\n## 💡 Tại sao cần\nSai lầm phổ biến của lập trình viên là dùng sai lệnh hoàn tác, dẫn đến việc vô tình làm mất công sức lập trình cả ngày. Nắm vững ranh giới giữa restore, reset và revert giúp bạn biết khi nào chỉ cần hủy chỉnh sửa file, khi nào nên xóa commit thử nghiệm trên máy riêng và khi nào bắt buộc phải dùng revert để bảo vệ đồng nghiệp.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung bạn đang soạn thảo một bức thư tay. `git restore` như dùng cục tẩy xóa một từ vừa viết sai trên giấy nháp. `git reset` như vò bức thư vừa viết ném vào sọt rác để lùi lại lúc chưa đặt bút. Còn `git revert` như bạn đã trót gửi thư qua bưu điện, bạn viết thêm bức thư đính chính thứ hai gửi tiếp để hủy bỏ hiệu lực thư trước.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nBản đồ 3 cơ chế Undo trong Git:\nWorking Tree / Staging:  git restore <file> (Hủy sửa đổi tệp tin)\nLocal Branch History:    git reset (Dịch chuyển HEAD & nhánh lùi về quá khứ)\nPublic / Shared Branch:  git revert (Tạo commit mới phủ định commit cũ)\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nKỹ sư Nam trong một buổi chiều gặp 3 tình huống hoàn tác: Đầu tiên, Nam sửa hỏng file cấu hình chưa add, chạy `git restore config.json` để lấy lại bản cũ. Tiếp đó, Nam tạo 2 commit thử nghiệm riêng không ưng ý, chạy `git reset --hard HEAD~2` để xóa sạch. Cuối cùng, một commit đã push lên main gây lỗi, Nam lập tức chạy `git revert HEAD` để sinh commit đảo ngược an toàn cho cả nhóm.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit restore <tên-tệp>\ngit restore --staged <tên-tệp>\ngit reset --mixed HEAD~1\ngit revert <commit-hash>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git restore <tệp>`: Khôi phục nội dung tệp tin trong Working Directory về trạng thái của commit gần nhất.\n- `git restore --staged <tệp>`: Đưa tệp tin ra khỏi Staging Area mà vẫn giữ nguyên nội dung chỉnh sửa.\n- `git reset`: Dịch chuyển con trỏ nhánh về commit chỉ định và điều chỉnh lại Staging hoặc Working Tree.\n- `git revert <hash>`: Tạo ra một commit hoàn toàn mới mang nội dung đảo ngược lại commit được chỉ định.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Dùng git reset trên nhánh dùng chung đã push lên GitHub**: Viết lại lịch sử làm sai lệch và gây lỗi đồng bộ nghiêm trọng cho đồng nghiệp.\n2. **Nhầm lẫn giữa git restore và git reset**: Dùng reset khi chỉ muốn hủy thay đổi chưa lưu của một file đơn lẻ.\n3. **Lo sợ dùng git revert vì nghĩ nó xóa mất code cũ**: Revert chỉ tạo thêm commit mới tiến về phía trước chứ không xóa lịch sử quá khứ.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thực hành phân biệt 3 thao tác restore, reset và revert trên terminal.\n1. Tạo một chỉnh sửa nhỏ trong tệp `test.txt` và hủy bỏ bằng lệnh `git restore test.txt`.\n2. Thêm tệp vào staging bằng `git add` rồi rút ra bằng `git restore --staged test.txt`.\n3. Tạo một commit thử nghiệm và thực hiện `git revert HEAD` để quan sát commit đảo ngược.\n4. Kiểm tra lại lịch sử bằng `git log --oneline` để xác nhận commit mới được tạo ra an toàn.\n\n---\n\n## 💡 Hint & mẹo\n> Ghi nhớ nguyên tắc vàng: Nhánh cá nhân chưa push có thể dùng reset, nhưng nhánh cộng tác dùng chung luôn luôn dùng revert.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Phân biệt chính xác phạm vi tác động của restore (file), reset (nhánh cục bộ) và revert (commit công khai).\n- Không làm mất lịch sử commit ngoài ý muốn trên nhánh chính.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài kiểm tra trắc nghiệm dưới đây về các cơ chế hoàn tác trong Git.\n\n---\n\n## 🚀 Thử thách nâng cao\nTìm hiểu vì sao trước phiên bản Git 2.23 lệnh `git checkout` phải đảm nhiệm cả việc chuyển nhánh và khôi phục file, dẫn đến việc tách ra thành `git switch` và `git restore`.\n\n---\n\n## 📝 Tổng kết\n- `git restore` chuyên dùng để khôi phục trạng thái tệp tin trong Working Directory hoặc Staging Area.\n- `git reset` dịch chuyển con trỏ nhánh lùi về quá khứ, phù hợp cho việc viết lại lịch sử cục bộ.\n- `git revert` tạo commit mới đảo ngược commit cũ, là phương pháp an toàn duy nhất trên nhánh dùng chung.\n",
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
