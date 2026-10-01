import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "06-branch-isolation",
  "moduleId": "03-branching",
  "metadata": {
    "id": "06-branch-isolation",
    "title": "Thay đổi đã commit được giữ riêng theo nhánh",
    "level": "intermediate",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "04-git-switch"
    ],
    "objectives": [
      "Giải thích vì sao commit trên nhánh tính năng chưa xuất hiện trên main.",
      "Tạo commit trên nhánh thử nghiệm rồi so sánh với main.",
      "Nhận biết sửa đổi chưa commit có thể còn đi theo khi chuyển nhánh."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "branch isolation",
      "cach ly nhanh",
      "lich su phan ky"
    ],
    "commands": [
      "git switch -c <nhánh-thử-nghiệm>",
      "git add <file>",
      "git commit -m \"test: add isolated file\"",
      "git switch main",
      "git status"
    ]
  },
  "content": "# Thay đổi đã commit được giữ riêng theo nhánh\r\n\r\n---\r\n\r\n## 🎯 Mục tiêu\r\n- Giải thích vì sao commit trên nhánh tính năng chưa xuất hiện trên `main`.\r\n- Tạo commit trên nhánh thử nghiệm rồi so sánh với `main`.\r\n- Nhận biết sửa đổi chưa commit có thể còn đi theo khi chuyển nhánh.\r\n\r\n---\r\n\r\n## 🧩 Từ khóa hôm nay\r\n\r\n### Cách ly thay đổi đã commit\r\n- **Nói dễ hiểu:** Commit mới được gắn vào nhánh đang chọn; nhánh khác không tự chuyển theo.\r\n- **Ví dụ:** `feature-chat` có commit thêm `chat.js`, còn `main` vẫn ở mốc cũ.\r\n- **Đừng nhầm:** Tệp sửa dở chưa commit có thể được giữ khi chuyển nhánh.\r\n\r\n### Lịch sử phân kỳ\r\n- **Nói dễ hiểu:** Hai nhánh cùng có commit riêng sau một mốc chung.\r\n- **Ví dụ:** `main` sửa trang chủ, `feature-chat` thêm chức năng chat.\r\n- **Đừng nhầm:** Phân kỳ là trạng thái bình thường trước khi chọn cách hợp nhất.\r\n\r\n### Hợp nhất (merge)\r\n- **Nói dễ hiểu:** Thao tác đưa lịch sử từ nhánh này vào nhánh khác.\r\n- **Ví dụ:** Hợp nhất `feature-chat` vào `main` sau khi kiểm tra.\r\n- **Đừng nhầm:** Commit không tự xuất hiện trên mọi nhánh.\r\n\r\n---\r\n\r\n## 📖 Định nghĩa\r\nKhi tạo commit, Git cập nhật nhánh hiện tại để trỏ tới commit mới. Nhánh khác vẫn trỏ tới vị trí riêng của nó cho tới khi bạn chủ động hợp nhất hoặc áp dụng commit bằng một thao tác khác. Như vậy, commit trên nhánh tính năng chưa nằm trong lịch sử của `main`. Các thay đổi chưa commit là chuyện khác: chúng có thể được giữ lại khi chuyển nhánh nếu không gây xung đột.\r\n\r\n---\r\n\r\n## 🤔 Tại sao cần?\r\nTách commit theo nhánh cho nhóm thời gian làm và kiểm tra một tính năng trước khi đưa vào nhánh chung. Nếu thử nghiệm không dùng được, `main` vẫn ở mốc cũ. Commit thử vẫn có thể tồn tại trong lịch sử repository; đừng hiểu việc chuyển về `main` là xóa commit đó.\r\n\r\n---\r\n\r\n## 🧠 Mental Model (Mô hình tư duy)\r\nHãy hình dung mỗi nhánh là một dấu trang trên cùng quyển sổ lịch sử. Bạn ghi một trang mới khi đang ở `feature-chat`, nên dấu trang `main` không tự nhảy tới trang đó. Hợp nhất là thao tác chọn cách nối lịch sử lại.\r\n\r\n---\r\n\r\n## 🖼 Sơ đồ\r\n```text\r\n                 ┌── C4 (feature-chat)\r\nC1 ── C2 ── C3 ──┤\r\n                 └── C5 (main)\r\n\r\nCommit C4 chỉ có trên feature-chat cho tới khi được hợp nhất.\r\n```\r\n\r\n---\r\n\r\n## 🌎 Ví dụ thực tế\r\nAn tạo `test-darkmode`, thêm tệp CSS rồi commit. Khi An chuyển về `main`, tệp chỉ có trong commit của nhánh thử nghiệm nên không xuất hiện trong snapshot `main`. Commit đó vẫn còn trong lịch sử nhánh `test-darkmode`; nó không bị xóa chỉ vì An đổi nhánh. Nếu An muốn đưa giao diện tối vào dự án chung, nhóm sẽ review rồi hợp nhất.\r\n\r\n---\r\n\r\n## 💻 Command\r\n```bash\r\ngit switch -c test-isolation\r\n# Tạo tệp secret-test.txt trong trình sửa tệp, rồi lưu nội dung\r\ngit add secret-test.txt\r\ngit commit -m \"test: add isolated file\"\r\ngit switch main\r\ngit status\r\n```\r\n\r\n---\r\n\r\n## 🔍 Giải thích command\r\n- `git switch -c test-isolation`: Tạo nhánh và chuyển sang đó.\r\n- Tạo tệp mới, rồi dùng `git add` và `git commit` để lưu tệp trên nhánh thử nghiệm.\r\n- `git switch main`: Quay về nhánh chính; tệp chỉ có trong commit thử sẽ không nằm trong snapshot này.\r\n- `git status`: Kiểm tra trạng thái hiện tại; thay đổi chưa commit cần được xem riêng.\r\n\r\n---\r\n\r\n## ⚠️ Sai lầm phổ biến\r\n1. **Nghĩ commit nhánh con tự sang `main`:** Cần một thao tác tích hợp có chủ đích.\r\n2. **Nghĩ tệp biến mất khỏi `main` là bị xóa khỏi repository:** Tệp vẫn nằm trong commit của nhánh thử nghiệm.\r\n3. **Nghĩ mọi thay đổi đều được cách ly tuyệt đối:** Sửa đổi chưa commit có thể đi theo khi đổi nhánh nếu an toàn.\r\n\r\n---\r\n\r\n## 🧪 Lab\r\n1. Chạy `git switch -c test-isolation`.\r\n2. Tạo `secret-test.txt` bằng trình sửa tệp và ghi `Chỉ có trên nhánh thử nghiệm`.\r\n3. Chạy `git add secret-test.txt`, rồi `git commit -m \"test: add isolated file\"`.\r\n4. Chạy `git switch main`; kiểm tra danh sách tệp và xác nhận `secret-test.txt` không có trong snapshot của `main`.\r\n5. Chạy `git switch test-isolation`; xác nhận tệp vẫn còn trên nhánh thử nghiệm.\r\n\r\n---\r\n\r\n## 💡 Hint\r\n> Chuyển nhánh chỉ thay đổi commit mà thư mục đang phản ánh; nó không tự gộp lịch sử.\r\n\r\n---\r\n\r\n## ✅ Validation\r\n- `secret-test.txt` có trên `test-isolation`.\r\n- Tệp không có trên `main` trước khi hợp nhất.\r\n- `git status` sạch sau mỗi lần commit.\r\n\r\n---\r\n\r\n## ❓ Quiz\r\nTrả lời câu hỏi để kiểm tra sự khác nhau giữa commit nhánh riêng và thay đổi đã hợp nhất.\r\n\r\n---\r\n\r\n## 🔥 Challenge\r\nTạo commit khác trên `main`, rồi chuyển qua lại hai nhánh. Ghi lại tệp nào thuộc snapshot mỗi nhánh và nêu thao tác cần có để đưa tệp giữa hai nhánh.\r\n\r\n---\r\n\r\n## 📚 Tổng kết\r\n- Commit mới được gắn vào nhánh đang chọn.\r\n- Chuyển về `main` không xóa commit ở nhánh khác.\r\n- Sửa đổi chưa commit có thể đi theo khi chuyển nhánh; kiểm tra `git status`.\r\n",
  "quiz": {
    "id": "quiz-03-06-branch-isolation",
    "title": "Trắc nghiệm: Thay đổi trên các nhánh",
    "questions": [
      {
        "id": "q1",
        "question": "Bạn commit `chat.js` trên `feature-chat`, rồi chuyển về `main`. Vì sao tệp chưa xuất hiện trên `main`?",
        "type": "single",
        "options": [
          {
            "text": "Commit đó chưa thuộc lịch sử mà nhánh `main` trỏ tới",
            "correct": true
          },
          {
            "text": "Git tự đổi tên tệp thành `.git/chat.js`",
            "correct": false
          },
          {
            "text": "`git switch` xóa mọi commit mới",
            "correct": false
          },
          {
            "text": "`main` chỉ lưu tệp HTML",
            "correct": false
          }
        ],
        "explanation": "Mỗi nhánh trỏ tới lịch sử riêng; commit tính năng cần được hợp nhất trước khi nằm trong lịch sử main."
      },
      {
        "id": "q2",
        "question": "Khi chuyển về `main`, commit đã tạo trên `feature-chat` sẽ ra sao?",
        "type": "single",
        "options": [
          {
            "text": "Vẫn thuộc lịch sử của nhánh tính năng",
            "correct": true
          },
          {
            "text": "Bị xóa khỏi toàn bộ repository",
            "correct": false
          },
          {
            "text": "Tự chuyển thành commit trên `main`",
            "correct": false
          },
          {
            "text": "Được gửi tự động lên GitHub",
            "correct": false
          }
        ],
        "explanation": "Chuyển nhánh thay đổi vị trí làm việc; thao tác đó không xóa commit trên nhánh cũ."
      },
      {
        "id": "q3",
        "question": "Bạn sửa một tệp nhưng chưa commit rồi chuyển nhánh. Điều gì có thể xảy ra?",
        "type": "single",
        "options": [
          {
            "text": "Git có thể giữ sửa đổi đó nếu chuyển nhánh không ghi đè nội dung",
            "correct": true
          },
          {
            "text": "Mọi sửa đổi chưa commit luôn bị xóa",
            "correct": false
          },
          {
            "text": "Sửa đổi tự động được commit lên cả hai nhánh",
            "correct": false
          },
          {
            "text": "Repository tự chuyển sang detached HEAD",
            "correct": false
          }
        ],
        "explanation": "Thay đổi chưa commit không được cách ly như commit; Git có thể mang nó theo nếu an toàn."
      },
      {
        "id": "q4",
        "question": "Bạn muốn biết có thay đổi chưa commit nào trước khi chuyển nhánh. Nên chạy lệnh nào?",
        "type": "single",
        "options": [
          {
            "text": "git status",
            "correct": true
          },
          {
            "text": "git branch -D",
            "correct": false
          },
          {
            "text": "git remote -v",
            "correct": false
          },
          {
            "text": "git log --oneline",
            "correct": false
          }
        ],
        "explanation": "`git status` cho biết nhánh hiện tại và các tệp đang staged, chưa staged hoặc untracked."
      },
      {
        "id": "q5",
        "question": "Tính năng trên nhánh riêng đã được kiểm tra và muốn đưa vào `main`. Cần làm gì?",
        "type": "single",
        "options": [
          {
            "text": "Đứng trên nhánh nhận thay đổi rồi thực hiện merge",
            "correct": true
          },
          {
            "text": "Chỉ đổi tên nhánh feature thành `main`",
            "correct": false
          },
          {
            "text": "Chạy `git status` nhiều lần",
            "correct": false
          },
          {
            "text": "Xóa commit cuối của `main`",
            "correct": false
          }
        ],
        "explanation": "Để lịch sử tính năng đi vào main, nhóm cần chủ động chọn thao tác tích hợp phù hợp."
      },
      {
        "id": "q6",
        "question": "Lịch sử hai nhánh được gọi là phân kỳ khi nào?",
        "type": "single",
        "options": [
          {
            "text": "Cả hai nhánh có commit riêng sau một commit chung",
            "correct": true
          },
          {
            "text": "Một nhánh không có commit nào",
            "correct": false
          },
          {
            "text": "Tệp `.gitignore` có hai dòng",
            "correct": false
          },
          {
            "text": "Người dùng tạo hai bản sao thư mục",
            "correct": false
          }
        ],
        "explanation": "Hai nhánh phân kỳ khi cùng đi từ một mốc chung rồi mỗi nhánh có commit riêng."
      }
    ]
  }
};
export default lesson;
