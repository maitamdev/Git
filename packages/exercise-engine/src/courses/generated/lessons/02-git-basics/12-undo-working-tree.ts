import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "12-undo-working-tree",
  "moduleId": "02-git-basics",
  "metadata": {
    "id": "12-undo-working-tree",
    "title": "Hoàn tác thay đổi Working Tree",
    "level": "beginner",
    "duration": 30,
    "xp": 90,
    "prerequisites": [
      "11-file-lifecycle"
    ],
    "objectives": [
      "Sử dụng lệnh hiện đại `git restore <file>` để hủy bỏ các sửa đổi dở dang trong Working Tree.",
      "Sử dụng `git restore --staged <file>` để unstage tệp tin an toàn.",
      "Biết thay đổi chưa staged có thể mất nếu hủy bỏ và chưa lưu bản khác."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "undo-working-tree-lab"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git restore",
      "hoan tac",
      "undo",
      "working tree",
      "discard changes"
    ],
    "commands": [
      "git restore <file>",
      "git restore .",
      "git restore --staged <file>"
    ]
  },
  "content": "# Hoàn tác thay đổi Working Tree\n\n---\n\n## 🎯 Mục tiêu\n- Sử dụng thành thạo lệnh hiện đại `git restore <file>` để loại bỏ nhanh các thử nghiệm hỏng trong Working Tree.\n- Nắm vững cú pháp `git restore --staged <file>` để rút tệp khỏi Staging Area mà không làm mất code.\n- Nhận thức sâu sắc tính nguy hiểm và không thể đảo ngược khi vứt bỏ (discard) các thay đổi chưa được commit.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### `git restore <file>` — bỏ sửa đổi trong tệp\n- **Nói dễ hiểu:** Phục hồi tệp trong thư mục làm việc về nội dung sạch sẽ của Staging Area hoặc commit gần nhất.\n- **Ví dụ:** Chạy `git restore index.html` để xóa sạch toàn bộ các đoạn code gõ thử nghiệm trong tệp HTML.\n- **Đừng nhầm:** Thao tác này vĩnh viễn xóa bỏ các thay đổi chưa được commit trên ổ đĩa, Git sẽ không thể cứu lại được.\n\n### `git restore --staged` — bỏ chọn cho commit\n- **Nói dễ hiểu:** Rút tệp ra khỏi Staging Area để không đưa vào commit kế tiếp, nhưng giữ nguyên vẹn nội dung code trên ổ đĩa.\n- **Ví dụ:** Lỡ gõ `git add secret.env`, bạn chạy `git restore --staged secret.env` để unstage an toàn.\n- **Đừng nhầm:** Lệnh chỉ hủy trạng thái Staged ở vùng đệm; code bạn vừa viết trong file vẫn còn nguyên trong thư mục làm việc.\n\n### Discard — bỏ thay đổi\n- **Nói dễ hiểu:** Hành động vứt bỏ triệt để các sửa đổi chưa được lưu lại trong commit lịch sử nào.\n- **Ví dụ:** Sử dụng `git restore .` để discard toàn bộ các chỉnh sửa vặt trong tất cả các tệp của thư mục.\n- **Đừng nhầm:** Tuyệt đối không discard bừa bãi khi chưa dùng `git diff` kiểm tra xem có dòng code quan trọng nào bị bỏ quên hay không.\n\n---\n\n## 📖 Định nghĩa\n`git restore` là bộ công cụ hoàn tác hiện đại (được tách ra từ `git checkout` cồng kềnh ngày trước) chuyên trách việc phục hồi dữ liệu trong thư mục làm việc và vùng đệm. Khi gõ `git restore <file>`, Git ghi đè tệp ở Working Tree bằng bản sao trong Staging Area hoặc HEAD, xóa sạch mọi sửa đổi chưa commit của tệp đó.\n\n---\n\n## 🤔 Tại sao cần?\nTrong lập trình, việc thử nghiệm ý tưởng mới và thất bại là chuyện thường ngày. Có những lúc bạn viết cả trăm dòng code thử nghiệm nhưng thuật toán bế tắc và bạn muốn xóa sạch mọi thứ để làm lại từ đầu. Thay vì phải Ctrl+Z mỏi tay hoặc xóa file gõ lại, `git restore` giúp bạn quay ngược thời gian trong một chớp mắt, dọn sạch code rác và đưa file về trạng thái nguyên bản an toàn.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy xem `git restore <file>` như chiếc tẩy thần kỳ xóa sạch nét bút chì vẽ nháp trên bản thiết kế để lộ ra lớp mực in gốc. Còn `git restore --staged <file>` giống như bạn thò tay vào thùng hàng lấy món đồ ra đặt lại trên bàn: món đồ vẫn còn nguyên trước mắt bạn, chỉ là nó không còn nằm trong danh sách gửi bưu điện nữa.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCƠ CHẾ PHỤC HỒI DỮ LIỆU CỦA GIT RESTORE:\n\n1. git restore <file>:\n   Staging Area (hoặc HEAD) ────────── Ghi đè ──────────► Working Tree\n                                                         (Code sửa dở bị xóa vĩnh viễn)\n\n2. git restore --staged <file>:\n   HEAD ────────────────────────────── Đặt lại ─────────► Staging Area\n                                                         (Working Tree giữ nguyên 100%)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn thử nghiệm cấu hình hiệu năng cao trong `database.config.js` nhưng ứng dụng bị treo cứng. Thay vì lo sợ, bạn mở terminal gõ `git restore database.config.js`. Toàn bộ cấu hình lỗi biến mất ngay lập tức và file trở về phiên bản ổn định nhất của commit trước đó. Hệ thống khởi động lại mượt mà như chưa từng có sự cố.\n\n---\n\n## 💻 Command\n```bash\ngit restore <file>\ngit restore .\ngit restore --staged <file>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git restore <file>`: Khôi phục nội dung của tệp tracked về phiên bản lưu gần nhất trong Staging Area hoặc HEAD. Mọi sửa đổi chưa commit sẽ bốc hơi.\n- `git restore .`: Hoàn tác hàng loạt toàn bộ tệp tracked đang bị sửa đổi trong thư mục hiện tại.\n- `git restore --staged <file>`: Lệnh unstage chuẩn mực đưa tệp từ Staging Area trở lại trạng thái Unstaged, bảo toàn nguyên vẹn code đang gõ trên ổ đĩa.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Lạm dụng `git restore .` khi chưa đọc diff**: Vô tình xóa sổ hàng giờ công sức lập trình vì lười không chỉ định chính xác tên file cần hoàn tác.\n2. **Nhầm lẫn tai hại giữa có và không có `--staged`**: Muốn unstage file (`--staged`) nhưng gõ thiếu cờ thành `git restore <file>`, dẫn đến việc xóa sạch toàn bộ code vừa viết.\n3. **Ảo tưởng rằng Git có thể cứu lại code chưa commit**: Bất kỳ dòng code nào bị discard bằng `git restore` mà chưa từng được commit sẽ biến mất vĩnh viễn khỏi ổ cứng.\n\n---\n\n## 🧪 Lab\n1. Mở tệp `app.js` và gõ thêm một dòng code cố ý gây lỗi cú pháp.\n2. Chạy `git status` để xác nhận `app.js` đang nằm trong nhóm \"Changes not staged for commit\".\n3. Chạy `git restore app.js` để loại bỏ dòng code lỗi đó.\n4. Mở lại tệp và chạy `git status` để kiểm chứng mã nguồn đã được phục hồi nguyên vẹn và sạch sẽ.\n\n---\n\n## 💡 Hint\n> Luôn chạy `git diff <file>` trước khi gõ `git restore <file>` để tận mắt thấy những dòng code nào sắp bị xóa sổ vĩnh viễn!\n\n---\n\n## ✅ Validation\n- Tệp tin được phục hồi chính xác về trạng thái của commit gần nhất hoặc bản snapshot trong Staging Area.\n- Lệnh `git restore --staged` đưa tệp về trạng thái Unstaged mà không làm mất nội dung code.\n\n---\n\n## ❓ Quiz\nTrả lời bài trắc nghiệm dưới đây để nắm vững sự khác biệt giữa các chế độ hoàn tác của lệnh git restore.\n\n---\n\n## 🔥 Challenge\nHãy so sánh chi tiết: Điều gì sẽ xảy ra với dữ liệu trong 2 kịch bản sau: Kịch bản A chạy `git restore file.txt`, và Kịch bản B chạy `git restore --staged file.txt`? Khi nào bạn dùng Kịch bản A và khi nào bắt buộc phải dùng Kịch bản B?\n\n---\n\n## 📚 Tổng kết\n- `git restore <file>` hủy bỏ các sửa đổi dở dang ở Working Tree, đưa file về trạng thái lưu gần nhất.\n- `git restore --staged <file>` rút tệp khỏi Staging Area một cách an toàn mà không làm mất code của bạn.\n- Hãy cẩn trọng tối đa: các thay đổi chưa được commit khi bị discard sẽ biến mất vĩnh viễn không thể khôi phục.\n",
  "quiz": {
    "id": "quiz-02-12-undo-working-tree",
    "title": "Trắc nghiệm: Hoàn tác thay đổi Working Tree",
    "questions": [
      {
        "id": "q1",
        "question": "Lệnh Git hiện đại nào được khuyến nghị sử dụng để hủy bỏ các sửa đổi chưa staged trong Working Tree?",
        "type": "single",
        "options": [
          {
            "text": "git restore <tên-tệp>",
            "correct": true
          },
          {
            "text": "git delete <tên-tệp>",
            "correct": false
          },
          {
            "text": "git cancel-all",
            "correct": false
          },
          {
            "text": "git remove --unstage",
            "correct": false
          }
        ],
        "explanation": "`git restore <tên-tệp>` là lệnh chuyên trách từ Git 2.23 để hoàn tác thay đổi trong thư mục làm việc."
      },
      {
        "id": "q2",
        "question": "Tệp đã được theo dõi; bạn sửa nhưng chưa stage. Điều gì xảy ra khi chạy `git restore <file>`?",
        "type": "single",
        "options": [
          {
            "text": "Git thay nội dung tệp bằng bản staged; nếu chưa stage, Git không giữ phần sửa mới",
            "correct": true
          },
          {
            "text": "Git sẽ tự động lưu các dòng đó vào hòm thư điện tử cá nhân",
            "correct": false
          },
          {
            "text": "Git sẽ chuyển các dòng code đó lên máy chủ GitHub",
            "correct": false
          },
          {
            "text": "Các dòng đó sẽ được cất vào thùng rác máy tính để phục hồi sau",
            "correct": false
          }
        ],
        "explanation": "`git restore <file>` lấy phiên bản trong Index và bỏ phần sửa chưa staged của tệp đó."
      },
      {
        "id": "q3",
        "question": "Lệnh `git restore --staged index.html` thực hiện hành động gì?",
        "type": "single",
        "options": [
          {
            "text": "Rút tệp index.html ra khỏi Staging Area nhưng vẫn giữ nguyên toàn bộ code đã sửa trong Working Directory",
            "correct": true
          },
          {
            "text": "Xóa sạch tệp index.html khỏi ổ cứng máy tính",
            "correct": false
          },
          {
            "text": "Tạo một commit mới có tên là staged",
            "correct": false
          },
          {
            "text": "Đẩy tệp index.html lên nhánh chính của máy chủ từ xa",
            "correct": false
          }
        ],
        "explanation": "Cờ `--staged` chỉ hủy bỏ việc stage trong Index, không làm mất bất kỳ dòng code nào bạn đã gõ trong Working Tree."
      },
      {
        "id": "q4",
        "question": "Lệnh nào khôi phục các tệp tracked chưa staged trong thư mục hiện tại?",
        "type": "single",
        "options": [
          {
            "text": "git restore .",
            "correct": true
          },
          {
            "text": "git restore --everything-delete",
            "correct": false
          },
          {
            "text": "git undo -all",
            "correct": false
          },
          {
            "text": "git clear-tree",
            "correct": false
          }
        ],
        "explanation": "`git restore .` khôi phục tệp tracked chưa staged trong thư mục hiện tại và thư mục con."
      },
      {
        "id": "q5",
        "question": "Bạn stage một tệp, rồi chạy `git restore --staged file.txt`. Phần nội dung đã sửa sẽ ra sao?",
        "type": "single",
        "options": [
          {
            "text": "Tệp bị bỏ khỏi Staging Area nhưng phần sửa vẫn còn trong Working Directory",
            "correct": true
          },
          {
            "text": "Tệp bị xóa hoàn toàn khỏi máy",
            "correct": false
          },
          {
            "text": "Một commit mới được tạo",
            "correct": false
          },
          {
            "text": "Tệp tự được đẩy lên remote",
            "correct": false
          }
        ],
        "explanation": "`--staged` gỡ lựa chọn khỏi Index; nó không hủy phần sửa trong Working Directory."
      }
    ]
  }
};
export default lesson;
