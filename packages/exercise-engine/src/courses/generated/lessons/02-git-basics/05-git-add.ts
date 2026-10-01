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
  "content": "# Đưa một tệp vào vùng chuẩn bị bằng `git add`\r\n\r\n---\r\n\r\n## 🎯 Mục tiêu\r\n- Dùng `git add <tên-tệp>` để chọn một tệp.\r\n- Xác nhận lựa chọn bằng `git status`.\r\n- Giải thích được rằng add chưa tạo commit.\r\n\r\n---\r\n\r\n## 🧩 Từ khóa hôm nay\r\n\r\n### `git add` — chọn nội dung cho commit\r\n- **Nói dễ hiểu:** Đưa trạng thái hiện tại của tệp vào vùng chuẩn bị.\r\n- **Ví dụ:** `git add README.md` chọn riêng tệp README.\r\n- **Đừng nhầm:** `git add` chưa tạo commit.\r\n\r\n### Path — đường dẫn tệp\r\n- **Nói dễ hiểu:** Tên cho Git biết bạn muốn chọn tệp hoặc thư mục nào.\r\n- **Ví dụ:** `README.md` là đường dẫn tới một tệp trong dự án.\r\n- **Đừng nhầm:** Chọn một tệp khác với chọn toàn bộ dự án.\r\n\r\n### Untracked — tệp Git chưa theo dõi\n- **Nói dễ hiểu:** Tệp mới mà Git chưa được yêu cầu đưa vào lịch sử.\n- **Ví dụ:** `note.txt` mới thường hiện là Untracked trong `git status`.\n- **Đừng nhầm:** Sau khi chạy `git add note.txt`, tệp được theo dõi và staged; chưa có commit nào được tạo.\n\n### Staged — nội dung đã được chọn\n- **Nói dễ hiểu:** Phiên bản nội dung được đưa vào vùng chuẩn bị cho commit kế tiếp.\n- **Ví dụ:** Chạy `git add app.js`, rồi sửa `app.js` thêm lần nữa; phiên bản đã staged và phần sửa mới là hai trạng thái khác nhau.\n- **Đừng nhầm:** Sửa tệp sau khi add không tự cập nhật bản staged; cần chạy `git add app.js` lại.\n\r\n---\r\n\r\n## 📖 Định nghĩa\r\n`git add <tên-tệp>` ghi nhận trạng thái hiện tại của tệp vào Staging Area để chuẩn bị cho commit kế tiếp. Tệp vẫn nằm nguyên trong thư mục dự án. Hôm nay ta chọn một tệp cụ thể để kiểm soát rõ nội dung sắp đưa vào commit.\r\n\r\n---\r\n\r\n## 🤔 Tại sao cần?\r\nSau khi sửa hoặc tạo tệp, bạn chọn thay đổi muốn lưu trước. Xem `git status` trước và sau lệnh để biết Git đang thấy gì và xác nhận tệp đã vào vùng chuẩn bị.\r\n\r\n---\r\n\r\n## 🧠 Mental Model (Mô hình tư duy)\r\nHãy nghĩ `git add` như chụp trạng thái hiện tại của một tệp vào khay chuẩn bị. Bản gốc vẫn nằm ở thư mục dự án; nếu bạn sửa tiếp, phần sửa mới cần được chọn lại.\r\n\r\n---\r\n\r\n## 🖼 Sơ đồ\r\n```text\r\nWorking Directory                    Staging Area\r\napp.js (bản đang sửa) --git add-->   app.js (trạng thái được chọn)\r\n       vẫn nằm tại đây\r\n```\r\n\r\n---\r\n\r\n## 🌎 Ví dụ thực tế\r\nTạo `app.js`, chạy `git add app.js`, rồi xem `git status`. Git vẫn để nguyên `app.js` trong thư mục dự án, đồng thời báo tệp đã staged.\r\n\r\n---\r\n\r\n## 💻 Command\r\n```bash\r\ngit status\r\ngit add app.js\r\ngit status\r\n```\r\n\r\n---\r\n\r\n## 🔍 Giải thích command\r\n- `git status`: Xem tệp đang untracked, đã staged hay còn thay đổi chưa staged.\r\n- `git add app.js`: Chọn trạng thái hiện tại của `app.js` cho commit kế tiếp.\r\n- Chạy `git status` lần nữa để xác nhận kết quả.\r\n\r\n---\r\n\r\n## ⚠️ Sai lầm phổ biến\r\n1. **Nghĩ `git add` đã tạo commit**: Thay đổi mới chỉ nằm trong vùng chuẩn bị; cần `git commit` để tạo mốc.\r\n2. **Sửa tệp sau khi đã add nhưng quên add lại**: Phần sửa mới chưa được chọn.\r\n3. **Gõ nhầm đường dẫn**: Kiểm tra tên tệp trong `git status` nếu Git báo không tìm thấy.\r\n\r\n---\r\n\r\n## 🧪 Lab\r\n1. Tạo tệp `app.js` với nội dung `console.log(\"Git Add Lab\");`.\r\n2. Chạy `git status` và nhận ra `app.js` đang Untracked.\r\n3. Chạy `git add app.js`.\r\n4. Chạy lại `git status`; xác nhận `app.js` nằm trong “Changes to be committed”.\r\n\r\n---\r\n\r\n## 💡 Hint\r\n> Gõ `git add <tên-tệp>` để chọn đúng một tệp; xem lại bằng `git status`.\r\n\r\n---\r\n\r\n## ✅ Validation\r\n- `git status` hiển thị `app.js` trong “Changes to be committed”.\r\n- Tệp `app.js` vẫn còn trong danh sách tệp của dự án.\r\n\r\n---\r\n\r\n## ❓ Quiz\r\nHãy trả lời các câu hỏi dưới đây để củng cố kỹ năng dùng `git add` cho một tệp.\r\n\r\n---\r\n\r\n## 🔥 Challenge\r\nTạo `note-a.txt` và `note-b.txt`. Chỉ chạy `git add note-a.txt`; dùng `git status` để giải thích tệp nào đã staged và tệp nào vẫn untracked.\r\n\r\n---\r\n\r\n## 📚 Tổng kết\r\n- `git add <tên-tệp>` chọn trạng thái hiện tại của một tệp.\r\n- Tệp vẫn nằm trong thư mục dự án.\r\n- `git status` xác nhận thay đổi đã staged; commit là bước khác.\r\n",
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
