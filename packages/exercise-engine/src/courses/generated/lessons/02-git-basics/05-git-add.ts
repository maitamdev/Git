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
      "Sử dụng thành thạo câu lệnh `git add` với các cú pháp: tệp chỉ định, thư mục, và `git add .`.",
      "Hiểu rõ sự khác biệt và rủi ro tiềm ẩn giữa `git add <file>` có chọn lọc và `git add .`.",
      "Làm quen với kỹ thuật stage từng khối dòng code bằng cờ `-p` (patch mode)."
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
  "content": "# Đưa tệp vào staging với git add\n\n---\n\n## 🎯 Mục tiêu\n- Sử dụng thành thạo câu lệnh `git add` với các cú pháp: tệp chỉ định, thư mục, và `git add .`.\n- Hiểu rõ sự khác biệt và rủi ro tiềm ẩn giữa `git add <file>` có chọn lọc và `git add .`.\n- Làm quen với kỹ thuật stage từng khối dòng code bằng cờ `-p` (patch mode).\n\n---\n\n## 📖 Định nghĩa\n> `git add` là câu lệnh thiết yếu dùng để chuyển các thay đổi trên tệp tin từ Working Directory vào Staging Area (vùng chuẩn bị). Lệnh này thông báo cho Git biết rằng bạn muốn đưa trạng thái hiện tại của tệp tin được chỉ định vào ảnh chụp snapshot sắp tới. Bạn có thể thêm từng tệp đơn lẻ (`git add file.txt`), thêm toàn bộ một thư mục (`git add src/`), hoặc thêm tất cả các thay đổi có trong thư mục hiện tại (`git add .`). Đối với tệp tin mới tạo, `git add` bắt đầu đưa tệp vào diện theo dõi (Tracked).\n\n---\n\n## 🤔 Tại sao cần?\nLàm chủ lệnh `git add` chính là kỹ năng làm chủ nghệ thuật đóng gói commit sạch sẽ trong quy trình phát triển phần mềm chuyên nghiệp. Rất nhiều lập trình viên mới có thói quen lười biếng luôn gõ `git add .` trong mọi tình huống, dẫn đến việc vô tình đưa cả tệp cấu hình chứa mật khẩu database, file binary nặng hàng trăm megabyte hoặc code thử nghiệm dở dang lên kho chứa chung. Sử dụng `git add` có chọn lọc là thước đo tính kỷ luật của một kỹ sư phần mềm.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung việc chạy lệnh `git add` giống như hành động bạn cầm một món hàng từ trên kệ siêu thị (Working Directory) và đặt nó vào giỏ hàng của bạn (Staging Area). Khi bạn đi dạo quanh siêu thị, bạn có thể xem xét và chạm vào hàng chục món đồ khác nhau. Nhưng chỉ những món đồ nào bạn quyết định đặt vào giỏ hàng thì lát nữa khi ra quầy thu ngân thanh toán (git commit), nhân viên mới tính tiền và in hóa đơn ghi nhận quyền sở hữu cho bạn.\n\n---\n\n## 🖼 Sơ đồ\n```text\nThao tác đưa tệp vào giỏ hàng:\n[Working Directory]                                      [Staging Area]\n  ├── index.html ──(git add index.html)────────────────► index.html (đã staged)\n  ├── styles.css ──(git add styles.css)────────────────► styles.css (đã staged)\n  └── temp.log   ──(không add)─────────────────────────► (vẫn ở Working Tree)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKỹ sư đang phát triển tính năng xác thực hai yếu tố cho hệ thống ngân hàng trực tuyến. Kỹ sư sửa đổi mã nguồn trong src/auth.js, viết tệp kiểm thử tests/auth.test.js, và ghi chép một số ghi chú nháp vào notes.txt. Khi chuẩn bị commit, kỹ sư chạy lệnh git add src/auth.js tests/auth.test.js. Tệp notes.txt không được thêm và vẫn nằm an toàn trên máy cá nhân mà không bị commit nhầm vào lịch sử chung của cả nhóm dự án, bảo đảm tính bảo mật tối đa cho toàn bộ mã nguồn của ngân hàng. Sau đó, kỹ sư cẩn thận kiểm tra lại trạng thái bằng git status để đảm bảo chỉ đúng hai tệp trên đã chuyển sang màu xanh trong vùng Staging Area, hoàn toàn an tâm trước khi thực hiện bước đóng gói snapshot tiếp theo.\n\n---\n\n## 💻 Command\n```bash\ngit add <file>\ngit add .\ngit add -A\ngit add -p\n```\n\n---\n\n## 🔍 Giải thích command\n- `git add <file>`: Đưa một tệp tin cụ thể vào Staging Area có chọn lọc an toàn tuyệt đối.\n- `git add .`: Đưa toàn bộ các thay đổi trong thư mục hiện tại trở xuống vào Staging Area.\n- `git add -A`: Đưa tất cả thay đổi trên toàn bộ kho lưu trữ vào Staging Area bất kể thư mục hiện tại.\n- `git add -p`: Chế độ tương tác từng khối thay đổi (patch) cho phép bạn duyệt từng dòng code.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Luôn luôn gõ git add . mà không kiểm tra git status trước**:  Dẫn đến việc commit nhầm các file bí mật như `.env`, khóa API hoặc file rác hệ thống.\n2. **Nghĩ git add là đã lưu vào lịch sử vĩnh viễn**:  `git add` mới chỉ đưa vào phòng chuẩn bị, nếu máy tính bị sập nguồn hoặc xóa thư mục trước khi `git commit`, dữ liệu vẫn có thể bị thất lạc.\n3. **Không đọc kỹ thông báo khi git add gặp file quá lớn**:  Cố gắng add các file video hoặc zip nặng khiến Git chạy chậm chạp.\n\n---\n\n## 🧪 Lab\n1. Tạo tệp `app.js` với nội dung `console.log(\"Git Add Lab\");`.\n2. Chạy `git status` để thấy tệp đang ở danh sách Untracked màu đỏ.\n3. Chạy lệnh `git add app.js` để đưa tệp vào Staging Area.\n4. Chạy lại `git status` để xác nhận tệp đã chuyển sang màu xanh lá cây.\n\n---\n\n## 💡 Hint\n> Gõ `git add <tên-tệp>` để thêm chính xác tệp tin bạn mong muốn.\n\n---\n\n## ✅ Validation\n- Kiểm tra `git status` hiển thị tệp `app.js` trong mục Changes to be committed.\n\n---\n\n## ❓ Quiz\nHãy trả lời các câu hỏi dưới đây để củng cố kỹ năng sử dụng lệnh git add.\n\n---\n\n## 🔥 Challenge\nTìm hiểu cờ `git add -p` (patch) và giải thích lợi ích của việc stage từng khối dòng code (hunk).\n\n---\n\n## 📚 Tổng kết\n- `git add` đưa các thay đổi từ Working Directory vào Staging Area sẵn sàng để commit.\n- Bắt đầu theo dõi các tệp tin mới (chuyển trạng thái từ Untracked thành Tracked/Staged).\n- Nên ưu tiên add có chọn lọc từng tệp thay vì lạm dụng `git add .` để tránh commit nhầm tệp rác.\n",
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
      }
    ]
  }
};
export default lesson;
