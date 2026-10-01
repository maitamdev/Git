import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "02-head-pointer",
  "moduleId": "03-branching",
  "metadata": {
    "id": "02-head-pointer",
    "title": "HEAD và trạng thái detached HEAD",
    "level": "intermediate",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "01-branch-concept"
    ],
    "objectives": [
      "Nhận biết HEAD thường theo nhánh đang chọn.",
      "Nhận ra detached HEAD khi chuyển thẳng tới một commit.",
      "Quay về nhánh an toàn hoặc tạo nhánh để giữ commit thử nghiệm."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "head",
      "detached head",
      "con tro head",
      "git switch --detach"
    ],
    "commands": [
      "git log --oneline",
      "git switch --detach <mã-commit>",
      "git status",
      "git switch <tên-nhánh>",
      "git switch -c <tên-nhánh-mới>"
    ]
  },
  "content": "# HEAD và trạng thái detached HEAD\r\n\r\n---\r\n\r\n## 🎯 Mục tiêu\r\n- Nhận biết HEAD thường theo nhánh đang chọn.\r\n- Nhận ra trạng thái detached HEAD khi chuyển thẳng tới một commit.\r\n- Quay về nhánh an toàn hoặc tạo nhánh để giữ commit thử nghiệm.\r\n\r\n---\r\n\r\n## 🧩 Từ khóa hôm nay\r\n\r\n### HEAD — vị trí làm việc hiện tại\r\n- **Nói dễ hiểu:** Con trỏ cho biết Git đang ở nhánh hoặc commit nào.\r\n- **Ví dụ:** Khi ở `main`, HEAD thường theo nhánh `main`.\r\n- **Đừng nhầm:** HEAD không phải tên tệp hay lời nhắn commit.\r\n\r\n### Detached HEAD — HEAD không theo tên nhánh\r\n- **Nói dễ hiểu:** HEAD trỏ thẳng tới commit thay vì theo một nhánh.\r\n- **Ví dụ:** Dùng `git switch --detach <mã-commit>` để xem snapshot cũ.\r\n- **Đừng nhầm:** Đây là trạng thái hợp lệ để kiểm tra; nó không báo repository bị hỏng.\r\n\r\n### `git switch -c` — tạo nhánh tại vị trí hiện tại\r\n- **Nói dễ hiểu:** Tạo nhánh mới và chuyển sang đó từ commit bạn đang xem.\r\n- **Ví dụ:** `git switch -c keep-experiment` khi đang detached.\r\n- **Đừng nhầm:** Nếu muốn giữ commit thử nghiệm, tạo nhánh trước khi chuyển đi.\r\n\r\n---\r\n\r\n## 📖 Định nghĩa\r\nTrong trạng thái thông thường, HEAD trỏ tới một nhánh; nhánh đó trỏ tới commit hiện tại. Khi bạn chuyển thẳng tới một commit bằng `git switch --detach`, HEAD trỏ trực tiếp vào commit và không theo tên nhánh. Nếu tạo commit mới ở trạng thái này, hãy tạo nhánh cho nó trước khi rời đi để có một tên dễ tìm lại.\r\n\r\n---\r\n\r\n## 🤔 Tại sao cần?\r\nĐôi khi bạn cần kiểm tra một phiên bản cũ để tìm thời điểm lỗi bắt đầu. Detached HEAD cho phép xem commit cũ mà không di chuyển nhánh `main`. Nếu muốn giữ một thử nghiệm, hãy tạo nhánh tại commit đó. Đừng dựa vào việc một commit không có tên nhánh sẽ luôn dễ tìm lại.\r\n\r\n---\r\n\r\n## 🧠 Mental Model (Mô hình tư duy)\r\nHãy hình dung HEAD như dấu “bạn đang xem mốc nào” trên dòng lịch sử. Khi HEAD theo `main`, commit mới sẽ nối vào nhánh đó. Khi detached, bạn đang đứng ở một mốc cụ thể nhưng không có tên nhánh di chuyển theo mình.\r\n\r\n---\r\n\r\n## 🖼 Sơ đồ\r\n```text\r\nBình thường:\r\nHEAD ──► main ──► Commit C3\r\n\r\nDetached:\r\nHEAD ──────────► Commit C1\r\nmain ──────────► Commit C3 (không bị di chuyển)\r\n```\r\n\r\n---\r\n\r\n## 🌎 Ví dụ thực tế\r\nMột lỗi xuất hiện sau lần cập nhật mới. Bạn chọn một commit cũ để kiểm tra xem ứng dụng lúc đó hoạt động ra sao. Khi chuyển thẳng tới commit đó, HEAD ở trạng thái detached còn `main` vẫn trỏ tới mốc mới nhất. Nếu sửa thử và muốn giữ commit, tạo nhánh như `keep-experiment` trước khi quay về `main`.\r\n\r\n---\r\n\r\n## 💻 Command\r\n```bash\r\ngit log --oneline\r\ngit switch --detach <mã-commit>\r\ngit status\r\ngit switch main\r\ngit switch -c <tên-nhánh-mới>\r\n```\r\n\r\n---\r\n\r\n## 🔍 Giải thích command\r\n- `git log --oneline`: Xem các commit; chọn một commit cũ hơn commit đầu danh sách.\r\n- `git switch --detach <mã-commit>`: Mở commit đó mà không chuyển con trỏ nhánh.\r\n- `git status`: Kiểm tra Git báo HEAD detached tại commit nào.\r\n- `git switch main`: Quay lại nhánh `main` nếu bạn không cần giữ commit thử.\r\n- `git switch -c <tên-nhánh-mới>`: Tạo nhánh tại vị trí hiện tại để giữ commit thử nghiệm.\r\n\r\n---\r\n\r\n## ⚠️ Sai lầm phổ biến\r\n1. **Hoảng loạn khi thấy detached HEAD:** Đây là trạng thái hợp lệ khi xem commit trực tiếp.\r\n2. **Tạo commit rồi rời đi mà không tạo nhánh:** Commit không được nhánh nào giữ lại; hãy tạo nhánh trước khi chuyển đi.\r\n3. **Chọn commit mới nhất rồi mong thấy khác biệt:** Muốn xem phiên bản cũ, chọn một commit nằm dưới commit mới nhất trong `git log`.\r\n\r\n---\r\n\r\n## 🧪 Lab\r\n1. Chạy `git log --oneline`. Cần có ít nhất hai commit để so sánh. Nếu chỉ có một, tạo tệp `detached-practice.txt`, thêm một dòng nội dung, rồi chạy `git add detached-practice.txt` và `git commit -m \"test: add detached practice\"`.\r\n2. Chạy `git log --oneline` lần nữa; dùng mã ở dòng thứ hai (commit cũ hơn).\r\n3. Chạy `git switch --detach <mã-commit-cũ>` rồi dùng `git status` để xác nhận HEAD detached.\r\n4. Chạy `git switch main` để quay lại nhánh.\r\n\r\n---\r\n\r\n## 💡 Hint\r\n> Muốn giữ commit thử nghiệm khi detached? Chạy `git switch -c keep-experiment` trước khi rời commit đó.\r\n\r\n---\r\n\r\n## ✅ Validation\r\n- `git status` báo HEAD detached tại mã commit cũ ở bước 3.\r\n- Sau `git switch main`, `git status` báo đang ở nhánh `main`.\r\n\r\n---\r\n\r\n## ❓ Quiz\r\nTrả lời các câu hỏi để kiểm tra cách nhận biết và xử lý detached HEAD.\r\n\r\n---\r\n\r\n## 🔥 Challenge\r\nKhi đang detached, hãy vẽ hai cách tiếp tục: quay về `main` mà bỏ thử nghiệm, hoặc tạo `keep-experiment` để giữ commit mới. Nêu lệnh mở đầu cho cách thứ hai.\r\n\r\n---\r\n\r\n## 📚 Tổng kết\r\n- Bình thường HEAD theo một nhánh; detached HEAD trỏ thẳng vào commit.\r\n- Xem commit cũ không tự di chuyển nhánh `main`.\r\n- Tạo nhánh tại commit detached nếu muốn giữ lại thử nghiệm.\r\n",
  "quiz": {
    "id": "quiz-03-02-head-pointer",
    "title": "Trắc nghiệm: HEAD và detached HEAD",
    "questions": [
      {
        "id": "q1",
        "question": "Khi đang ở trạng thái bình thường trên `main`, HEAD thường trỏ tới đâu?",
        "type": "single",
        "options": [
          {
            "text": "Nhánh `main`, nhánh này trỏ tới commit hiện tại",
            "correct": true
          },
          {
            "text": "Tệp `.gitignore`",
            "correct": false
          },
          {
            "text": "Máy chủ GitHub",
            "correct": false
          },
          {
            "text": "Một commit chưa từng được tạo",
            "correct": false
          }
        ],
        "explanation": "Trong trạng thái thông thường, HEAD theo nhánh hiện tại; nhánh đó chỉ tới commit mới nhất của nó."
      },
      {
        "id": "q2",
        "question": "Khi nào HEAD ở trạng thái detached?",
        "type": "single",
        "options": [
          {
            "text": "Khi HEAD trỏ trực tiếp tới commit thay vì theo tên nhánh",
            "correct": true
          },
          {
            "text": "Khi repository mất kết nối Internet",
            "correct": false
          },
          {
            "text": "Khi bạn sửa một tệp chưa staged",
            "correct": false
          },
          {
            "text": "Khi cấu hình email Git chưa đúng",
            "correct": false
          }
        ],
        "explanation": "Detached HEAD mô tả vị trí con trỏ; nó không phụ thuộc kết nối mạng hay nội dung tệp."
      },
      {
        "id": "q3",
        "question": "Bạn muốn xem một commit cũ mà không di chuyển `main`. Nên dùng lệnh nào?",
        "type": "single",
        "options": [
          {
            "text": "git switch --detach <mã-commit>",
            "correct": true
          },
          {
            "text": "git branch -D main",
            "correct": false
          },
          {
            "text": "git reset --hard main",
            "correct": false
          },
          {
            "text": "git commit --amend",
            "correct": false
          }
        ],
        "explanation": "`git switch --detach` đưa HEAD tới commit để kiểm tra mà không đổi con trỏ nhánh `main`."
      },
      {
        "id": "q4",
        "question": "Nếu tạo commit thử nghiệm khi detached và muốn dễ tìm lại, bạn nên làm gì?",
        "type": "single",
        "options": [
          {
            "text": "Tạo một nhánh tại commit đó trước khi chuyển đi",
            "correct": true
          },
          {
            "text": "Đổi tên tệp thành mã commit",
            "correct": false
          },
          {
            "text": "Chạy `git status` nhiều lần",
            "correct": false
          },
          {
            "text": "Xóa nhánh `main`",
            "correct": false
          }
        ],
        "explanation": "Nhánh đặt một tên ổn định trỏ tới commit thử nghiệm để bạn có thể quay lại sau."
      },
      {
        "id": "q5",
        "question": "Bạn muốn rời detached HEAD và quay về nhánh `main`. Lệnh nào phù hợp?",
        "type": "single",
        "options": [
          {
            "text": "git switch main",
            "correct": true
          },
          {
            "text": "git add main",
            "correct": false
          },
          {
            "text": "git branch main",
            "correct": false
          },
          {
            "text": "git diff main",
            "correct": false
          }
        ],
        "explanation": "`git switch main` gắn HEAD lại với nhánh `main` và cập nhật thư mục làm việc theo nhánh đó."
      }
    ]
  }
};
export default lesson;
