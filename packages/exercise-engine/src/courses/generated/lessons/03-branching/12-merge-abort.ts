import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "12-merge-abort",
  "moduleId": "03-branching",
  "metadata": {
    "id": "12-merge-abort",
    "title": "Hủy bỏ quá trình merge với git merge --abort",
    "level": "intermediate",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "11-resolve-conflict"
    ],
    "objectives": [
      "Nhận biết merge đang dở và biết khi nào cần hủy.",
      "Dùng `git merge --abort` rồi kiểm tra lại nhánh và working tree.",
      "Nêu được giới hạn khôi phục khi đã có thay đổi chưa commit trước merge."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git merge --abort",
      "huy bo merge",
      "rollback merge",
      "safety brake",
      "abort conflict"
    ],
    "commands": [
      "git status",
      "git merge --abort"
    ]
  },
  "content": "# Hủy merge đang dở bằng `git merge --abort`\n\n---\n\n## 🎯 Mục tiêu\n- Nhận biết khi repository đang dừng ở giữa một merge.\n- Dùng `git merge --abort` để hủy merge đang có conflict.\n- Kiểm tra lại nhánh và tệp sau khi hủy.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### `git merge --abort` — hủy merge\n- **Nói dễ hiểu:** Dừng lần merge đang diễn ra và thử đưa working tree về trạng thái trước lúc merge.\n- **Ví dụ:** Bạn merge nhầm nhánh và Git báo conflict; sau khi xem `git status`, chạy `git merge --abort`.\n- **Đừng nhầm:** Lệnh chỉ dùng khi merge còn đang dở; nó không xóa commit đã tạo trước đó.\n\n### Merge in progress — merge đang diễn ra\n- **Nói dễ hiểu:** Git đã bắt đầu nối nhánh nhưng chưa hoàn tất commit hợp nhất.\n- **Ví dụ:** `git status` báo tệp trong `Unmerged paths`.\n- **Đừng nhầm:** Sửa tệp conflict chưa kết thúc merge; cần giải quyết và commit, hoặc hủy bằng abort.\n\n### Pre-merge changes — thay đổi có trước merge\n- **Nói dễ hiểu:** Những sửa đổi chưa commit đã có trong working tree trước khi bắt đầu merge.\n- **Ví dụ:** Bạn sửa `notes.txt` nhưng chưa commit rồi mới chạy lệnh merge.\n- **Đừng nhầm:** Git có thể không khôi phục đầy đủ các thay đổi này khi abort; hãy commit hoặc stash công việc trước khi merge.\n\n---\n\n## 📖 Định nghĩa\n`git merge --abort` hủy quá trình merge còn dở và cố gắng khôi phục working tree về trạng thái trước khi merge. Git không bảo đảm khôi phục trọn vẹn nếu đã có thay đổi chưa commit trước merge, vì vậy hãy bắt đầu merge từ working tree sạch.\n\n---\n\n## 🤔 Tại sao cần?\nKhi chọn nhầm nhánh hoặc chưa hiểu cách kết hợp nội dung, abort giúp bạn dừng lại để kiểm tra trước khi hoàn tất. Sau đó bạn có thể làm lại với nhánh đúng hoặc nhờ đồng đội xác nhận logic.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy coi merge như một thao tác đang được chuẩn bị. `git merge --abort` yêu cầu Git hủy thao tác dở đó và quay lại mốc làm việc trước merge, miễn là bạn không mang theo sửa đổi chưa lưu mà Git phải cố bảo toàn.\n\n---\n\n## 🖼 Sơ đồ\n```text\nWorking tree sạch\n       │ git merge\n       ▼\nMerge đang dở, có conflict\n       │ git merge --abort\n       ▼\nTrạng thái trước khi merge (Git cố gắng khôi phục)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn định gộp `feature-search` nhưng lại gõ nhầm một nhánh thử nghiệm. Git báo conflict. Bạn xác nhận đúng là chọn nhầm, hủy merge, kiểm tra lại `main`, rồi mới quyết định bước tiếp theo. Các commit của nhánh nguồn vẫn còn; abort chỉ hủy lần hợp nhất đang dở.\n\n---\n\n## 💻 Command\n```bash\ngit status\ngit merge --abort\ngit status\n```\n\n---\n\n## 🔍 Giải thích command\n- `git status`: Trước khi abort, xác nhận đang có tệp chưa giải quyết.\n- `git merge --abort`: Hủy tiến trình merge hiện tại.\n- `git status`: Sau khi abort, xác nhận không còn merge dở và working tree trở về trạng thái trước đó.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Cho rằng abort luôn phục hồi mọi sửa đổi chưa commit:** Git cảnh báo rằng thay đổi có trước merge có thể khó khôi phục chính xác.\n2. **Dùng abort khi không có merge dở:** Git báo không có merge để hủy.\n3. **Nghĩ abort xóa nhánh hoặc commit của nhánh nguồn:** Lệnh dừng lần merge; lịch sử hai nhánh vẫn còn.\n\n---\n\n## 🧪 Lab\nYêu cầu: bắt đầu từ `main`, repository có commit và working tree sạch. Dùng một tên nhánh mới nếu `feature-abort` đã tồn tại.\n1. Tạo `abort-demo.txt` trên `main` với dòng `Trạng thái: ban đầu`; add và commit.\n2. Chạy `git switch -c feature-abort`. Đổi dòng đó thành `Trạng thái: tính năng`; add và commit.\n3. Chạy `git switch main`. Đổi cùng dòng thành `Trạng thái: bản chính`; add và commit.\n4. Chạy `git merge feature-abort`. Khi Git báo conflict, xem `git status` và nội dung tệp.\n5. Chạy `git merge --abort`, rồi chạy lại `git status` và mở `abort-demo.txt`.\n6. Xác nhận tệp trở lại nội dung `Trạng thái: bản chính`, `main` không có merge dở. Chạy `git branch` để thấy `feature-abort` vẫn còn.\n\n---\n\n## 💡 Hint\nNếu kết quả khác dự kiến, đừng chạy thêm lệnh xóa hoặc reset. Xem `git status` và nhờ người hướng dẫn kiểm tra trạng thái trước.\n\n---\n\n## ✅ Validation\n- `git status` sau abort không còn mục `Unmerged paths` hoặc thông báo merge đang diễn ra.\n- `abort-demo.txt` trở về phiên bản đã commit trên `main` trước merge.\n- Nhánh `feature-abort` và commit của nó vẫn còn trong repository.\n\n---\n\n## ❓ Quiz\nTrả lời câu hỏi để kiểm tra khi nào nên hủy merge và những gì lệnh này khôi phục.\n\n---\n\n## 🔥 Challenge\nTrước khi merge, thử để working tree có một thay đổi chưa commit và giải thích vì sao đây là cách chuẩn bị không an toàn. Sau đó hoàn tác thay đổi trong lab hoặc làm lại trên repository thực hành riêng.\n\n---\n\n## 📚 Tổng kết\n- `git merge --abort` hủy một merge chưa hoàn tất và thử phục hồi trạng thái trước merge.\n- Commit hoặc stash công việc trước khi merge để giảm nguy cơ mất sửa đổi.\n- Abort không xóa nhánh hoặc commit nguồn.\n",
  "quiz": {
    "id": "quiz-03-12-merge-abort",
    "title": "Trắc nghiệm: Hủy merge đang dở",
    "questions": [
      {
        "id": "q1",
        "question": "Khi nào phù hợp để chạy `git merge --abort`?",
        "type": "single",
        "options": [
          {
            "text": "Khi một lần merge đang dở và bạn muốn hủy để kiểm tra lại",
            "correct": true
          },
          {
            "text": "Khi muốn xóa toàn bộ repository",
            "correct": false
          },
          {
            "text": "Khi muốn tải code lên GitHub",
            "correct": false
          },
          {
            "text": "Khi muốn tạo commit thông thường",
            "correct": false
          }
        ],
        "explanation": "Abort dừng lần merge chưa hoàn tất; trước hết dùng git status để xác nhận trạng thái."
      },
      {
        "id": "q2",
        "question": "Git hứa hẹn điều gì khi dùng `git merge --abort`?",
        "type": "single",
        "options": [
          {
            "text": "Cố gắng khôi phục trạng thái trước merge; thay đổi chưa commit có thể khiến việc khôi phục không trọn vẹn",
            "correct": true
          },
          {
            "text": "Luôn phục hồi chính xác mọi byte, kể cả sửa đổi chưa commit",
            "correct": false
          },
          {
            "text": "Xóa cả nhánh hiện tại và nhánh nguồn",
            "correct": false
          },
          {
            "text": "Đẩy các tệp conflict lên remote",
            "correct": false
          }
        ],
        "explanation": "Tài liệu Git cảnh báo rằng thay đổi chưa commit trước merge có thể không được khôi phục đầy đủ."
      },
      {
        "id": "q3",
        "question": "Kết quả mong đợi sau khi abort thành công là gì?",
        "type": "single",
        "options": [
          {
            "text": "Không còn tiến trình merge dở; working tree trở về trạng thái trước merge nếu có thể",
            "correct": true
          },
          {
            "text": "Mọi commit trên nhánh nguồn bị xóa",
            "correct": false
          },
          {
            "text": "Git tự chọn một phía và tạo merge commit",
            "correct": false
          },
          {
            "text": "Repository bị chuyển sang detached HEAD",
            "correct": false
          }
        ],
        "explanation": "Abort hủy lần merge hiện tại chứ không xóa lịch sử hoặc nhánh được đưa vào."
      },
      {
        "id": "q4",
        "question": "Điều nên làm trước khi bắt đầu merge để giảm rủi ro khi phải abort là gì?",
        "type": "single",
        "options": [
          {
            "text": "Commit hoặc stash thay đổi đang làm và kiểm tra working tree sạch",
            "correct": true
          },
          {
            "text": "Xóa thư mục `.git`",
            "correct": false
          },
          {
            "text": "Đổi tên mọi tệp trong repository",
            "correct": false
          },
          {
            "text": "Tạo thêm một merge commit rỗng",
            "correct": false
          }
        ],
        "explanation": "Bắt đầu merge từ trạng thái sạch giúp bạn biết phần nào thuộc về merge và giảm nguy cơ mất sửa đổi."
      },
      {
        "id": "q5",
        "question": "Nếu chạy `git merge --abort` khi không có merge nào đang dở, điều gì xảy ra?",
        "type": "single",
        "options": [
          {
            "text": "Git báo rằng không có merge để hủy",
            "correct": true
          },
          {
            "text": "Git tự tạo một nhánh mới",
            "correct": false
          },
          {
            "text": "Toàn bộ commit bị xóa",
            "correct": false
          },
          {
            "text": "Git chạy git reset --hard thay bạn",
            "correct": false
          }
        ],
        "explanation": "Abort cần một tiến trình merge chưa kết thúc; lệnh không phải cách hoàn tác chung."
      },
      {
        "id": "q6",
        "question": "Sau khi abort, điều gì vẫn còn nếu lệnh thành công?",
        "type": "single",
        "options": [
          {
            "text": "Nhánh nguồn và các commit đã có của nhánh đó",
            "correct": true
          },
          {
            "text": "Merge đang dở cùng các conflict markers",
            "correct": false
          },
          {
            "text": "Một merge commit mới",
            "correct": false
          },
          {
            "text": "Toàn bộ thay đổi chưa commit chắc chắn được xóa an toàn",
            "correct": false
          }
        ],
        "explanation": "Abort dừng lần merge nhưng không xóa nhánh nguồn hay các commit đã tạo trước đó."
      }
    ]
  }
};
export default lesson;
