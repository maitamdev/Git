import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "05-git-add",
  "moduleId": "02-git-basics",
  "metadata": {
    "id": "05-git-add",
    "title": "Đưa tệp vào staging với git add",
    "level": "beginner",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "04-git-status"
    ],
    "objectives": [
      "Chọn một tệp bằng git add <file> và xác nhận lựa chọn bằng git status.",
      "Giải thích git add . chọn thay đổi dưới thư mục hiện tại.",
      "Biết git add -p dùng để chọn từng nhóm thay đổi."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "track-file"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git add",
      "staging",
      "stage changes",
      "chon loc thay doi",
      "patch mode"
    ],
    "commands": [
      "git add <file>",
      "git add .",
      "git add -A",
      "git add -p"
    ]
  },
  "content": "# Đưa tệp vào staging với git add\n\n---\n\n## 🎯 Mục tiêu\n- Chọn một tệp bằng `git add <file>` và xác nhận lựa chọn bằng `git status`.\n- Giải thích được `git add .` chọn thay đổi dưới thư mục hiện tại.\n- Biết `git add -p` dùng để chọn từng nhóm thay đổi.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### `git add` — chọn thay đổi cho commit\n- **Nói dễ hiểu:** Đưa trạng thái hiện tại của tệp vào vùng chuẩn bị.\n- **Ví dụ:** `git add README.md` chọn riêng tệp README.\n- **Đừng nhầm:** `git add` chưa tạo commit.\n\n### Path — đường dẫn tệp\n- **Nói dễ hiểu:** Tên cho Git biết bạn muốn chọn tệp hoặc thư mục nào.\n- **Ví dụ:** `README.md` là đường dẫn tới một tệp trong dự án.\n- **Đừng nhầm:** Chọn một tệp khác với chọn toàn bộ dự án.\n\n### `git add .` — chọn thay đổi ở thư mục hiện tại\n- **Nói dễ hiểu:** Thêm các thay đổi phù hợp bên dưới thư mục đang đứng.\n- **Ví dụ:** Chạy lệnh ở thư mục dự án để chọn nhiều tệp.\n- **Đừng nhầm:** Xem `git status` để chắc bạn không chọn nhầm tệp.\n\n### Patch mode — chọn từng phần thay đổi\n- **Nói dễ hiểu:** `git add -p` cho phép chọn từng nhóm dòng thay vì cả tệp.\n- **Ví dụ:** Chỉ đưa phần sửa lỗi vào commit, để phần làm dở lại.\n- **Đừng nhầm:** Đây là chế độ tương tác; đọc từng câu hỏi trước khi chọn.\n\n---\n\n## 📖 Định nghĩa\n`git add` chụp trạng thái hiện tại của thay đổi vào Staging Area để chuẩn bị cho commit kế tiếp. Tệp vẫn nằm nguyên trong thư mục dự án. Ví dụ: `git add file.txt` chọn một tệp; `git add .` chọn thay đổi bên dưới thư mục hiện tại.\n\n---\n\n## 🤔 Tại sao cần?\n`git add` cho phép chọn phần thay đổi muốn đưa vào commit. Kiểm tra `git status` trước và sau lệnh để tránh chọn nhầm.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy nghĩ `git add` như chụp một bản của thay đổi vào khay chuẩn bị. Bản gốc vẫn ở trong thư mục; lần sửa tiếp theo chưa tự động cập nhật bản đã staged.\n\n---\n\n## 🖼 Sơ đồ\n```text\n`git add` chụp trạng thái tệp vào Staging Area, không di chuyển tệp:\n[Working Directory: file.txt] -- git add file.txt --> [Staging Area: bản đã chọn]\n          tệp vẫn còn ở đây                     bản gốc vẫn còn ở đây\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nSửa `app.js`, chạy `git add app.js`, rồi sửa thêm lần nữa. Chạy `git status`: phiên bản đầu đang staged, phần sửa sau vẫn chưa staged.\n\n---\n\n## 💻 Command\n```bash\ngit add <file>\ngit add .\ngit add -A\ngit add -p\n```\n\n---\n\n## 🔍 Giải thích command\n- `git add <file>`: Chọn một tệp cụ thể; kiểm tra tên tệp trước khi chạy.\n- `git add .`: Chọn các thay đổi bên dưới thư mục hiện tại.\n- `git add -A`: Chọn các thay đổi trong toàn bộ kho lưu trữ.\n- `git add -p`: Chế độ tương tác từng khối thay đổi (patch) cho phép bạn duyệt từng dòng code.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Chạy `git add .` mà không kiểm tra trạng thái**:  Có thể chọn cả tệp hoặc phần sửa bạn chưa định đưa vào commit.\n2. **Nghĩ `git add` đã tạo commit**:  Thay đổi mới chỉ nằm trong Staging Area; cần chạy `git commit` để tạo mốc lịch sử.\n3. **Không đọc kỹ thông báo khi git add gặp file quá lớn**:  Cố gắng add các file video hoặc zip nặng khiến Git chạy chậm chạp.\n\n---\n\n## 🧪 Lab\n1. Tạo tệp `app.js` với nội dung `console.log(\"Git Add Lab\");`.\n2. Chạy `git status` để thấy tệp trong danh sách Untracked.\n3. Chạy lệnh `git add app.js` để đưa tệp vào Staging Area.\n4. Chạy lại `git status` để xác nhận tệp nằm trong mục Changes to be committed.\n\n---\n\n## 💡 Hint\n> Gõ `git add <tên-tệp>` để thêm chính xác tệp tin bạn mong muốn.\n\n---\n\n## ✅ Validation\n- Kiểm tra `git status` hiển thị tệp `app.js` trong mục Changes to be committed.\n\n---\n\n## ❓ Quiz\nHãy trả lời các câu hỏi dưới đây để củng cố kỹ năng sử dụng lệnh git add.\n\n---\n\n## 🔥 Challenge\nTìm hiểu cờ `git add -p` (patch) và giải thích lợi ích của việc stage từng khối dòng code (hunk).\n\n---\n\n## 📚 Tổng kết\n- `git add` chụp thay đổi vào Staging Area; tệp gốc vẫn ở nguyên chỗ.\n- Tệp mới được chọn bằng `git add` sẽ được theo dõi và staged.\n- Xem `git status` để biết chính xác nội dung nào đã chọn.\n",
  "quiz": {
    "id": "quiz-02-05-git-add",
    "title": "Trắc nghiệm: Sử dụng lệnh git add",
    "questions": [
      {
        "id": "q1",
        "question": "Lệnh nào dưới đây đưa một tệp tin cụ thể mang tên `main.js` vào Staging Area?",
        "type": "single",
        "options": [
          {
            "text": "git add main.js",
            "correct": true
          },
          {
            "text": "git stage-create main.js",
            "correct": false
          },
          {
            "text": "git push main.js",
            "correct": false
          },
          {
            "text": "git commit main.js",
            "correct": false
          }
        ],
        "explanation": "`git add <tên-tệp>` là cú pháp chuẩn xác để đưa tệp vào Staging Area."
      },
      {
        "id": "q2",
        "question": "Lệnh `git add .` thực hiện hành động gì?",
        "type": "single",
        "options": [
          {
            "text": "Thêm tất cả các tệp tin bị thay đổi hoặc tạo mới trong thư mục hiện tại vào Staging Area",
            "correct": true
          },
          {
            "text": "Xóa sạch tất cả các tệp tin trong thư mục hiện tại",
            "correct": false
          },
          {
            "text": "Tải toàn bộ mã nguồn trên GitHub về thư mục hiện tại",
            "correct": false
          },
          {
            "text": "Đóng cửa sổ dòng lệnh terminal ngay lập tức",
            "correct": false
          }
        ],
        "explanation": "Dấu chấm `.` đại diện cho thư mục hiện tại, `git add .` thêm toàn bộ thay đổi từ thư mục đó trở xuống."
      },
      {
        "id": "q3",
        "question": "Cờ tùy chọn nào của git add cho phép bạn xem và chọn lọc từng khối dòng code (hunk) để stage?",
        "type": "single",
        "options": [
          {
            "text": "-p (viết tắt của --patch)",
            "correct": true
          },
          {
            "text": "-f (force)",
            "correct": false
          },
          {
            "text": "-d (delete)",
            "correct": false
          },
          {
            "text": "-m (message)",
            "correct": false
          }
        ],
        "explanation": "`git add -p` mở chế độ tương tác patch mode cho phép duyệt và stage từng khối dòng code riêng lẻ."
      },
      {
        "id": "q4",
        "question": "Tại sao các kỹ sư phần mềm khuyến cáo không nên lạm dụng lệnh git add .?",
        "type": "single",
        "options": [
          {
            "text": "Dễ vô tình đưa các tệp tin bí mật như mật khẩu, file log và tài nguyên rác vào commit",
            "correct": true
          },
          {
            "text": "Vì lệnh này làm hỏng ổ cứng máy tính ngay lập tức",
            "correct": false
          },
          {
            "text": "Vì lệnh này chỉ chạy được duy nhất một lần trong đời dự án",
            "correct": false
          },
          {
            "text": "Vì lệnh này bị cấm bởi tổ chức tiêu chuẩn quốc tế ISO",
            "correct": false
          }
        ],
        "explanation": "`git add .` gom bừa toàn bộ mọi thứ, rất dễ làm rò rỉ tệp chứa khóa bí mật hoặc làm loãng lịch sử."
      },
      {
        "id": "q5",
        "question": "Bạn chạy `git add app.js` rồi sửa tiếp `app.js`. Việc gì cần làm để đưa phần sửa mới vào commit?",
        "type": "single",
        "options": [
          {
            "text": "Chạy `git add app.js` thêm lần nữa",
            "correct": true
          },
          {
            "text": "Chạy `git status` vì lệnh này tự stage mọi phần sửa",
            "correct": false
          },
          {
            "text": "Chạy `git push` để Git tự stage phần sửa",
            "correct": false
          },
          {
            "text": "Không cần làm gì; Git cập nhật phần đã staged tự động",
            "correct": false
          }
        ],
        "explanation": "`git add` chọn trạng thái tại thời điểm chạy. Phần sửa sau đó vẫn chưa staged cho tới khi bạn add lại."
      }
    ]
  }
};
export default lesson;
