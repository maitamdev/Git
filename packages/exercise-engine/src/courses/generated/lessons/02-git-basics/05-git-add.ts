import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "05-git-add",
  "moduleId": "02-git-basics",
  "metadata": {
    "id": "05-git-add",
    "title": "Đưa một tệp vào vùng chuẩn bị bằng git add",
    "level": "beginner",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "04-git-status"
    ],
    "objectives": [
      "Chọn một tệp bằng `git add <file>`.",
      "Xác nhận tệp đã staged bằng `git status`."
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
      "chon mot tep"
    ],
    "commands": [
      "git add <file>",
      "git status"
    ]
  },
  "content": "# Đưa một tệp vào vùng chuẩn bị bằng `git add`\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững cú pháp và bản chất hoạt động của lệnh `git add <tên-tệp>` để đưa thay đổi vào Staging Area.\n- Hiểu sâu cơ chế tuyển chọn có chủ đích (Selective Staging) thay vì lạm dụng add bừa bãi.\n- Nắm rõ hiện tượng một tệp vừa có trạng thái Staged vừa có trạng thái Unstaged khi chỉnh sửa sau khi add.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### `git add` — chọn nội dung cho commit\n- **Nói dễ hiểu:** Hành động nhấc trạng thái hiện tại của tệp tin đặt vào vùng đệm Staging Area để chuẩn bị tạo snapshot.\n- **Ví dụ:** Chạy `git add README.md` để đưa riêng nội dung tài liệu hướng dẫn vào danh sách chờ commit.\n- **Đừng nhầm:** Lệnh `git add` chỉ mới nạp thay đổi vào khay chuẩn bị, hoàn toàn chưa tạo ra mốc commit lịch sử.\n\n### Path — đường dẫn tệp\n- **Nói dễ hiểu:** Địa chỉ chính xác của tệp hoặc thư mục trong cấu trúc dự án mà bạn muốn Git xử lý.\n- **Ví dụ:** `src/components/Header.jsx` là đường dẫn trỏ thẳng tới một component cụ thể trong cây mã nguồn.\n- **Đừng nhầm:** Chỉ định đường dẫn tệp cụ thể giúp bạn kiểm soát chi tiết từng sửa đổi, khác hẳn với việc add bừa bãi toàn bộ thư mục gốc.\n\n### Untracked — tệp Git chưa theo dõi\n- **Nói dễ hiểu:** Trạng thái của một tệp tin mới tạo mà Git chưa từng ghi nhận bất kỳ dấu vết nào trong lịch sử kho mã nguồn.\n- **Ví dụ:** Bạn gõ lệnh tạo tệp mới, tệp này lập tức xuất hiện trong mục Untracked files của `git status`.\n- **Đừng nhầm:** Khi bạn chạy `git add` trên tệp untracked, Git lập tức bắt đầu theo dõi nó và đưa nội dung vào Staging Area.\n\n### Staged — nội dung đã được chọn\n- **Nói dễ hiểu:** Phiên bản snapshot cụ thể của tệp đã được đưa vào Staging Area, sẵn sàng niêm phong vào commit kế tiếp.\n- **Ví dụ:** Chạy `git add app.js`, rồi mở `app.js` sửa tiếp; lúc này bản đã staged và bản đang sửa ngoài thư mục là hai trạng thái tách biệt.\n- **Đừng nhầm:** Chỉnh sửa file sau khi add sẽ không tự động cập nhật bản staged; bạn bắt buộc phải gõ `git add` thêm lần nữa nếu muốn lấy nội dung mới nhất.\n\n---\n\n## 📖 Định nghĩa\n`git add <đường-dẫn>` là thao tác chuyển nội dung snapshot hiện tại của tệp từ Working Directory vào Staging Area (chỉ mục Index). Lệnh này báo cho Git biết chính xác những sửa đổi nào được bạn phê duyệt để chuẩn bị đóng gói vào commit tiếp theo, đồng thời biến các tệp mới tinh (Untracked) thành tệp được Git chính thức theo dõi.\n\n---\n\n## 🤔 Tại sao cần?\nTrong một buổi làm việc, bạn có thể chỉnh sửa 10 file khác nhau: vừa sửa lỗi đăng nhập, vừa thêm giao diện, vừa ghi chú tài liệu. `git add` trao cho bạn quyền tuyển chọn có chủ đích (Selective Staging): chỉ đưa những file phục vụ đúng một mục đích cụ thể vào vùng đệm để tạo commit gọn gàng, tách bạch, thay vì ném bừa bãi toàn bộ mọi thứ vào một mớ hỗn độn khó kiểm soát.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy tưởng tượng bạn đang dọn nhà và có một thùng carton chuẩn bị gửi đi. Bàn làm việc (Working Tree) có đủ loại đồ đạc, nhưng bạn chỉ nhặt đúng quyển sách và chiếc kính đặt vào thùng (Staging Area) thông qua lệnh `git add`. Đồ đạc trên bàn vẫn còn nguyên vẹn; lệnh chỉ lấy một bản sao trạng thái của món đồ đặt vào thùng trước khi dán băng keo niêm phong.\n\n---\n\n## 🖼 Sơ đồ\n```text\nThư mục làm việc (Working Tree)               Vùng đệm (Staging Area / Index)\n┌───────────────────────────────┐              ┌───────────────────────────────┐\n│ app.js (phiên bản đang gõ)    │ --git add->  │ app.js (bản sao snapshot)     │\n│ style.css (chưa muốn commit)  │              │ Sẵn sàng cho commit kế tiếp   │\n└───────────────────────────────┘              └───────────────────────────────┘\n      (File gốc vẫn ở đây)                           (Chỉ mục nhị phân .git/index)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn sửa cả hai file `login.js` và `style.css`. Bạn muốn tạo commit riêng cho logic xử lý lỗi đăng nhập trước, rồi mới commit giao diện sau. Bạn chạy `git add login.js`, kiểm tra bằng `git status` thấy chỉ riêng `login.js` đã staged sẵn sàng đóng gói, trong khi `style.css` vẫn nằm ở trạng thái unstaged chờ đợt đóng gói kế tiếp.\n\n---\n\n## 💻 Command\n```bash\ngit status\ngit add app.js\ngit add src/utils/math.js\ngit status\n```\n\n---\n\n## 🔍 Giải thích command\n- `git status`: Luôn chạy trước để quan sát chính xác những tệp nào đang có sửa đổi hoặc untracked.\n- `git add <tên-tệp>`: Đọc nội dung hiện tại của tệp, tạo đối tượng blob trong `.git/objects` và cập nhật bản ghi vào file `.git/index`.\n- `git status` (chạy lần 2): Kiểm tra lại xem tệp mục tiêu đã chính thức chuyển sang màu xanh lá trong mục \"Changes to be committed\" hay chưa.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Lầm tưởng `git add` là đã lưu commit**: Add chỉ mới đưa file vào vùng đệm trung gian; nếu máy sập nguồn hoặc bạn checkout nhánh khác, commit vẫn chưa hề được tạo ra.\n2. **Sửa code tiếp nhưng quên add lại**: Sau khi `git add file.js`, bạn sửa thêm 3 dòng code nữa và gõ commit ngay; commit tạo ra sẽ chỉ chứa phiên bản lúc gõ lệnh add chứ không hề có 3 dòng code mới thêm.\n3. **Nhập sai đường dẫn tương đối**: Gõ `git add app.js` khi đang đứng ở thư mục con sẽ bị lỗi \"pathspec did not match any files\".\n\n---\n\n## 🧪 Lab\n1. Tạo tệp `app.js` với nội dung `console.log(\"Git Add Lab\");`.\n2. Chạy `git status` và nhận ra `app.js` đang nằm ở khu vực Untracked files với màu đỏ hoặc dấu `??`.\n3. Chạy lệnh `git add app.js` để nạp tệp vào Staging Area.\n4. Chạy lại `git status`; quan sát thấy `app.js` đã chuyển sang màu xanh lá cây trong mục \"Changes to be committed\".\n\n---\n\n## 💡 Hint\n> Khi chạy `git add`, Git chụp lại đúng trạng thái của tệp tại khoảnh khắc bấm Enter. Nếu bạn sửa tiếp tệp đó, hãy nhớ gõ `git add` thêm lần nữa trước khi commit!\n\n---\n\n## ✅ Validation\n- Kiểm tra `git status` thấy `app.js` nằm trong danh sách \"Changes to be committed\".\n- Tệp `app.js` vẫn tồn tại nguyên vẹn trên thư mục làm việc của bạn.\n\n---\n\n## ❓ Quiz\nTrả lời bài trắc nghiệm dưới đây để nắm vững cơ chế hoạt động và các tình huống thực tế của lệnh `git add`.\n\n---\n\n## 🔥 Challenge\nTạo hai tệp `note-a.txt` và `note-b.txt`. Chỉ chạy `git add note-a.txt`. Sử dụng `git status -s` để quan sát sự khác biệt giữa hai ký hiệu `A ` và `??`, sau đó phân tích tại sao việc tuyển chọn từng tệp lại là thói quen tốt của Senior Developer.\n\n---\n\n## 📚 Tổng kết\n- `git add <tên-tệp>` chụp lại trạng thái hiện tại của tệp và nạp vào vùng đệm Staging Area.\n- Thao tác add không di chuyển hay xóa file thật trong thư mục làm việc.\n- Luôn kiểm tra lại bằng `git status` để xác nhận những gì đã được chọn trước khi niêm phong commit.\n",
  "quiz": {
    "id": "quiz-02-05-git-add",
    "title": "Trắc nghiệm: Sử dụng lệnh git add",
    "questions": [
      {
        "id": "q1",
        "question": "Bạn vừa tạo `note-a.txt` và `note-b.txt`, nhưng chỉ muốn chọn `note-a.txt`. Nên chạy lệnh nào?",
        "type": "single",
        "options": [
          {
            "text": "git add note-a.txt",
            "correct": true
          },
          {
            "text": "git add note-b.txt",
            "correct": false
          },
          {
            "text": "git commit -m \"add notes\"",
            "correct": false
          },
          {
            "text": "git status note-a.txt",
            "correct": false
          }
        ],
        "explanation": "`git add note-a.txt` chọn đúng tệp được nêu trong đường dẫn; `git status` xác nhận lựa chọn."
      },
      {
        "id": "q2",
        "question": "Sau khi chạy `git add app.js`, tệp `app.js` có bị chuyển khỏi thư mục dự án không?",
        "type": "single",
        "options": [
          {
            "text": "Không; Git chọn nội dung để chuẩn bị commit, còn tệp vẫn ở nguyên vị trí",
            "correct": true
          },
          {
            "text": "Có; Git chuyển tệp vào thư mục ẩn `.git`",
            "correct": false
          },
          {
            "text": "Có; Git gửi tệp lên GitHub rồi xóa bản trên máy",
            "correct": false
          },
          {
            "text": "Có; Git đổi tên tệp thành `app.js.staged`",
            "correct": false
          }
        ],
        "explanation": "`git add` ghi nhận nội dung đã chọn vào vùng chuẩn bị; nó không di chuyển hay xóa tệp gốc."
      },
      {
        "id": "q3",
        "question": "Bạn đã stage `app.js`, sau đó sửa tệp lần nữa. Muốn đưa phần sửa mới vào lần commit kế tiếp, cần làm gì?",
        "type": "single",
        "options": [
          {
            "text": "Chạy lại `git add app.js`",
            "correct": true
          },
          {
            "text": "Chạy `git status`; lệnh này tự stage mọi phần sửa",
            "correct": false
          },
          {
            "text": "Chạy `git push`; lệnh này tự stage phần sửa",
            "correct": false
          },
          {
            "text": "Không cần làm gì vì bản staged tự cập nhật",
            "correct": false
          }
        ],
        "explanation": "`git add` chọn trạng thái tại thời điểm chạy; thay đổi xảy ra sau đó chưa được staged."
      },
      {
        "id": "q4",
        "question": "Sau khi chạy `git add note.txt`, `git status` cho biết tệp nằm trong “Changes to be committed”. Điều đó có nghĩa gì?",
        "type": "single",
        "options": [
          {
            "text": "Tệp đã staged và sẽ được đưa vào commit nếu bạn tạo commit lúc này",
            "correct": true
          },
          {
            "text": "Commit đã được tạo tự động",
            "correct": false
          },
          {
            "text": "Tệp đã được gửi lên GitHub",
            "correct": false
          },
          {
            "text": "Git đã xóa bản tệp trong thư mục dự án",
            "correct": false
          }
        ],
        "explanation": "“Changes to be committed” là thay đổi trong Staging Area; bạn vẫn cần tự chạy lệnh `git commit`."
      },
      {
        "id": "q5",
        "question": "Bạn chạy `git add app.js` nhưng muốn chắc chắn lựa chọn đã đúng. Nên làm gì tiếp?",
        "type": "single",
        "options": [
          {
            "text": "Chạy `git status` và kiểm tra `app.js` trong phần staged",
            "correct": true
          },
          {
            "text": "Chạy `git push` để xem Git có nhận tệp không",
            "correct": false
          },
          {
            "text": "Đóng terminal rồi mở lại",
            "correct": false
          },
          {
            "text": "Chạy `git init` lần nữa",
            "correct": false
          }
        ],
        "explanation": "`git status` báo những gì đã staged, chưa staged và chưa được theo dõi để bạn kiểm tra trước commit."
      }
    ]
  }
};
export default lesson;
