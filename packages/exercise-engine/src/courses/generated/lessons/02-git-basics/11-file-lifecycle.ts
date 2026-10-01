import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "11-file-lifecycle",
  "moduleId": "02-git-basics",
  "metadata": {
    "id": "11-file-lifecycle",
    "title": "Vòng đời tệp tin trong Git",
    "level": "beginner",
    "duration": 25,
    "xp": 70,
    "prerequisites": [
      "10-gitignore"
    ],
    "objectives": [
      "Nhận ra bốn trạng thái cơ bản: Untracked, Unmodified, Modified và Staged.",
      "Dự đoán trạng thái sau git add và git commit.",
      "Hiểu vì sao sửa tệp sau khi add có thể tạo trạng thái MM."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "file lifecycle",
      "vong doi tep tin",
      "tracked",
      "untracked",
      "modified",
      "staged"
    ],
    "commands": [
      "git status -s",
      "git add <file>",
      "git commit -m \"test: add status example\""
    ]
  },
  "content": "# Vòng đời tệp tin trong Git\n\n---\n\n## 🎯 Mục tiêu\n- Nhận ra bốn trạng thái cơ bản: Untracked, Unmodified, Modified và Staged.\n- Dự đoán trạng thái sau `git add` và `git commit`.\n- Hiểu vì sao sửa tệp sau khi add có thể tạo trạng thái `MM`.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Untracked — chưa được theo dõi\n- **Nói dễ hiểu:** Tệp mới mà Git chưa được yêu cầu quản lý.\n- **Ví dụ:** Tạo `draft.txt` rồi xem `git status`.\n- **Đừng nhầm:** Untracked không có nghĩa tệp bị xóa.\n\n### Unmodified — chưa có thay đổi mới\n- **Nói dễ hiểu:** Tệp tracked đang giống phiên bản đã lưu gần nhất.\n- **Ví dụ:** Sau commit, một tệp không sửa thường ở trạng thái này.\n- **Đừng nhầm:** Điều đó không có nghĩa tệp chưa từng bị sửa trong quá khứ.\n\n### Modified — đã sửa nhưng chưa staged\n- **Nói dễ hiểu:** Tệp tracked khác bản đã lưu, nhưng sửa đổi mới chưa được chọn.\n- **Ví dụ:** Sửa một dòng trong README sau commit.\n- **Đừng nhầm:** Lưu trong trình soạn thảo chưa tạo commit.\n\n### Staged — đã chuẩn bị cho commit\n- **Nói dễ hiểu:** Phiên bản tệp hiện tại đã được chọn cho commit kế tiếp.\n- **Ví dụ:** Chạy `git add README.md`.\n- **Đừng nhầm:** Sửa tệp thêm lần nữa sẽ tạo phần unstaged mới.\n\n---\n\n## 📖 Định nghĩa\nTệp mới chưa được Git theo dõi là Untracked. Tệp đã tracked có thể đang khớp mốc lưu (Unmodified), đã sửa trong thư mục làm việc (Modified) hoặc đã chọn cho commit (Staged). Nếu sửa thêm sau khi `git add`, tệp có thể vừa có phần Staged vừa có phần Modified.\n\n---\n\n## 🤔 Tại sao cần?\nHiểu các trạng thái giúp bạn biết `git add` đã chọn phiên bản nào và vì sao một tệp có thể hiện cả thay đổi staged lẫn unstaged trong `git status`.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nTheo dõi hai bản: tệp đang sửa và phiên bản đã chọn bằng `git add`. Nếu sửa tệp sau khi add, Git giữ phần đã staged và báo thêm phần sửa mới chưa staged.\n\n---\n\n## 🖼 Sơ đồ\n```text\nUntracked ──git add──► Staged ──git commit──► Unmodified\n                           ▲                       │\n                           │ git add               │ sửa tệp\n                           │                       ▼\n                           └────────────────── Modified\n\nSửa tệp thêm sau git add: vẫn còn phần Staged + có thêm phần Modified.\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTạo `user.js`: tệp là Untracked. Chạy `git add user.js`: tệp là Staged. Commit xong, nếu không sửa thêm, tệp trở thành Unmodified. Sửa tiếp thì trạng thái là Modified.\n\n---\n\n## 💻 Command\n```bash\ngit status -s\ngit add <file>\ngit commit -m \"test: add status example\"\n```\n\n---\n\n## 🔍 Giải thích command\n- `git status -s`: Hiển thị mã trạng thái hai cột phản ánh chính xác vị trí của tệp trong cỗ máy trạng thái.\n- `git add <file>`: Kích hoạt sự chuyển dịch trạng thái từ Untracked hoặc Modified sang Staged.\n- `git commit -m \"<message>\"`: Ghi phần staged vào commit mới; nếu không sửa thêm, tệp trở thành Unmodified.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Tưởng tệp chỉ có một trạng thái**: Sửa thêm sau khi add sẽ để lại phần Staged và tạo phần Modified mới.\n2. **Tưởng tệp Untracked sẽ được commit tự động**:  Git không bao giờ tự ý commit tệp chưa được add vào hệ thống theo dõi.\n3. **Nhầm lẫn giữa tệp bị xóa (Deleted) và tệp Untracked**:  Tệp đã từng commit khi bị xóa sẽ ở trạng thái Tracked/Deleted chứ không phải Untracked.\n\n---\n\n## 🧪 Lab\n1. Tạo tệp mới `status-test.txt` và kiểm tra trạng thái Untracked bằng `git status -s`.\n2. Chạy `git add status-test.txt` và quan sát ký tự `A ` ở cột staged.\n3. Commit tệp bằng `git commit -m \"test: add status example\"`; chạy `git status -s` để thấy không còn thay đổi chờ lưu.\n4. Mở tệp sửa một dòng để quan sát ký tự ` M` (Modified) xuất hiện ở cột thứ hai.\n\n---\n\n## 💡 Hint\n> Theo dõi sự thay đổi vị trí ký tự cột trái (Index) và cột phải (Working Tree).\n\n---\n\n## ✅ Validation\n- Giải thích được sự biến đổi trạng thái qua các bước tạo, add, commit và sửa tệp.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để kiểm tra mức độ nắm bắt cỗ máy trạng thái Git.\n\n---\n\n## 🔥 Challenge\nMô tả tình huống làm xuất hiện ký tự `MM` trong kết quả của lệnh git status -s.\n\n---\n\n## 📚 Tổng kết\n- Tệp tin trong Git gồm hai nhóm lớn: Tracked (được theo dõi) và Untracked (chưa theo dõi).\n- Tệp Tracked thường đi từ Unmodified sang Modified, rồi Staged và về Unmodified sau commit.\n- Nếu sửa lại sau khi stage, sẽ có cả thay đổi Staged và Modified.\n",
  "quiz": {
    "id": "quiz-02-11-file-lifecycle",
    "title": "Trắc nghiệm: Vòng đời trạng thái của File",
    "questions": [
      {
        "id": "q1",
        "question": "Một tệp tin đã từng được commit vào lịch sử, nếu bạn mở ra sửa thêm một dòng code, tệp đó sẽ ở trạng thái nào?",
        "type": "single",
        "options": [
          {
            "text": "Modified (Đã bị sửa đổi)",
            "correct": true
          },
          {
            "text": "Untracked (Chưa được theo dõi)",
            "correct": false
          },
          {
            "text": "Staged (Đã nằm trong vùng chuẩn bị)",
            "correct": false
          },
          {
            "text": "Deleted (Đã bị xóa)",
            "correct": false
          }
        ],
        "explanation": "Tệp tin đã có trong commit trước đó khi bị thay đổi nội dung trong Working Tree sẽ chuyển sang trạng thái Modified."
      },
      {
        "id": "q2",
        "question": "Trạng thái Unmodified của một tệp tin có ý nghĩa kỹ thuật gì?",
        "type": "single",
        "options": [
          {
            "text": "Nội dung tệp trong Working Tree đang khớp với phiên bản đã lưu gần nhất",
            "correct": true
          },
          {
            "text": "Tệp tin đó đã bị khóa và không ai được phép sửa đổi nữa",
            "correct": false
          },
          {
            "text": "Tệp tin đó bị Git từ chối không theo dõi",
            "correct": false
          },
          {
            "text": "Tệp tin bị lỗi cú pháp chưa biên dịch được",
            "correct": false
          }
        ],
        "explanation": "Unmodified nghĩa là Git chưa thấy sửa đổi mới trong Working Tree so với trạng thái đã lưu."
      },
      {
        "id": "q3",
        "question": "Lệnh nào đưa một tệp tin từ trạng thái Modified sang trạng thái Staged?",
        "type": "single",
        "options": [
          {
            "text": "git add <tên-tệp>",
            "correct": true
          },
          {
            "text": "git commit",
            "correct": false
          },
          {
            "text": "git switch",
            "correct": false
          },
          {
            "text": "git branch",
            "correct": false
          }
        ],
        "explanation": "`git add` lấy nội dung tệp Modified và đưa snapshot vào Staging Area, chuyển tệp thành Staged."
      },
      {
        "id": "q4",
        "question": "Trong lệnh `git status -s`, ký hiệu `MM` ở đầu một dòng hiển thị điều gì?",
        "type": "single",
        "options": [
          {
            "text": "Tệp đã được đưa vào Staging Area nhưng sau đó lại bị sửa tiếp trong Working Directory",
            "correct": true
          },
          {
            "text": "Tệp tin có dung lượng lớn gấp đôi bình thường",
            "correct": false
          },
          {
            "text": "Tệp tin được viết bằng ngôn ngữ Markdown",
            "correct": false
          },
          {
            "text": "Tệp tin bị mất cả hai mã băm mật mã học",
            "correct": false
          }
        ],
        "explanation": "Ký tự M thứ nhất là Staged, ký tự M thứ hai là Modified trong Working Tree; nghĩa là tệp đã add nhưng sau đó lại bị sửa tiếp."
      },
      {
        "id": "q5",
        "question": "Đâu là thứ tự thường gặp của một tệp mới khi bạn muốn lưu nó vào lịch sử Git?",
        "type": "single",
        "options": [
          {
            "text": "Untracked → Staged → sau commit, tệp thành tracked và Unmodified",
            "correct": true
          },
          {
            "text": "Committed → Untracked → Modified → Staged",
            "correct": false
          },
          {
            "text": "Modified → Unmodified → Untracked → Committed",
            "correct": false
          },
          {
            "text": "Staged → Deleted → Remote → Unmodified",
            "correct": false
          }
        ],
        "explanation": "Tệp mới bắt đầu là Untracked; `git add` stage tệp và `git commit` ghi mốc. Nếu không sửa thêm, trạng thái sau commit là Unmodified."
      }
    ]
  }
};
export default lesson;
