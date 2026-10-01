import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "08-git-log",
  "moduleId": "02-git-basics",
  "metadata": {
    "id": "08-git-log",
    "title": "Tra cứu lịch sử với git log",
    "level": "beginner",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "06-git-commit"
    ],
    "objectives": [
      "Dùng `git log` để xem các commit trong lịch sử nhánh hiện tại.",
      "Dùng `--oneline` để rút gọn và `-n` để giới hạn số commit.",
      "Giới hạn số kết quả bằng `-n`."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "inspect-history"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git log",
      "lich su",
      "oneline",
      "tra cuu commit"
    ],
    "commands": [
      "git log",
      "git log --oneline",
      "git log -n 5"
    ]
  },
  "content": "# Tra cứu lịch sử với git log\r\n\r\n---\r\n\r\n## 🎯 Mục tiêu\r\n- Dùng `git log` để xem các commit trong lịch sử của nhánh hiện tại.\r\n- Rút gọn lịch sử bằng `--oneline`.\r\n- Giới hạn số commit hiển thị bằng `-n`.\r\n\r\n---\r\n\r\n## 🧩 Từ khóa hôm nay\r\n\r\n### `git log` — xem lịch sử commit\r\n- **Nói dễ hiểu:** Liệt kê các commit đã lưu trong nhánh hiện tại.\r\n- **Ví dụ:** Chạy `git log` sau khi đã tạo vài commit.\r\n- **Đừng nhầm:** Lệnh không hiển thị sửa đổi chưa commit như một mốc mới.\r\n\r\n### Commit hash — mã nhận diện commit\r\n- **Nói dễ hiểu:** Chuỗi ký tự Git dùng để phân biệt một commit.\r\n- **Ví dụ:** Mã ngắn xuất hiện cạnh message trong `git log --oneline`.\r\n- **Đừng nhầm:** Đây không phải số thứ tự do người dùng đặt.\r\n\r\n### `--oneline` — dạng lịch sử gọn\r\n- **Nói dễ hiểu:** Tùy chọn hiện mỗi commit trên một dòng ngắn.\r\n- **Ví dụ:** `git log --oneline`.\r\n- **Đừng nhầm:** Dạng gọn ẩn bớt chi tiết; có thể chạy `git log` để xem đầy đủ.\r\n\r\n### `-n` — giới hạn số commit\n- **Nói dễ hiểu:** Chỉ hiện một số lượng commit gần đây do bạn chọn.\n- **Ví dụ:** `git log -n 3` hiện tối đa ba commit.\n- **Đừng nhầm:** Tùy chọn này chỉ rút gọn kết quả, không xóa lịch sử.\n\n### HEAD — mốc Git đang đứng tại\n- **Nói dễ hiểu:** Tên đặc biệt trỏ tới vị trí hiện tại; `git log` mặc định xem lịch sử từ đây.\n- **Ví dụ:** `git log HEAD` hiển thị lịch sử bắt đầu từ commit mà HEAD trỏ tới.\n- **Đừng nhầm:** HEAD không phải tên cố định của một commit; khi chuyển nhánh hoặc tạo commit, vị trí nó trỏ tới có thể đổi.\n\r\n---\r\n\r\n## 📖 Định nghĩa\r\n`git log` liệt kê các commit có thể đi tới từ nhánh hiện tại, bắt đầu từ commit mới nhất. Mỗi mục cho biết commit và lời nhắn; dạng đầy đủ có thêm thông tin khác. Mã commit là mã nhận diện, không phải số thứ tự.\r\n\r\n---\r\n\r\n## 🤔 Tại sao cần?\r\nKhi quên mình đã lưu những mốc nào, `git log` giúp bạn xem lại lịch sử. Dạng gọn giúp lướt nhanh; `-n` giới hạn kết quả để terminal dễ đọc.\r\n\r\n---\r\n\r\n## 🧠 Mental Model (Mô hình tư duy)\r\n`git log` giống như danh sách các mốc đã lưu: mốc mới nhất hiện trước, mỗi mốc có mã nhận diện và message.\r\n\r\n---\r\n\r\n## 🖼 Sơ đồ\r\n```text\r\n1a2b3c4 (HEAD -> main) docs: add setup guide\r\n5d6e7f8 feat: create home page\r\n9a0b1c2 feat: start project\r\n```\r\n\r\n---\r\n\r\n## 🌎 Ví dụ thực tế\r\nBạn muốn biết mình vừa lưu những mốc nào. Chạy `git log --oneline -n 3` để xem tối đa ba commit gần nhất, mỗi commit trên một dòng.\r\n\r\n---\r\n\r\n## 💻 Command\r\n```bash\r\ngit log\r\ngit log --oneline\r\ngit log -n 5\r\n```\r\n\r\n---\r\n\r\n## 🔍 Giải thích command\r\n- `git log`: Hiển thị lịch sử commit mà nhánh hiện tại có thể đi tới.\r\n- `git log --oneline`: Hiện mỗi commit trên một dòng ngắn; độ dài mã nhận diện có thể thay đổi.\r\n- `git log -n 5`: Hiển thị tối đa 5 commit có thể đi tới từ nhánh hiện tại.\r\n\r\n---\r\n\r\n## ⚠️ Sai lầm phổ biến\r\n1. **Không biết thoát kết quả phân trang**: Nếu Git mở trang xem log, nhấn `q` để quay lại terminal.\r\n2. **Chỉ dùng git log mặc định dài dòng**:  Không biết sử dụng `--oneline` khiến màn hình bị tràn ngập thông tin khó theo dõi.\r\n3. **Nghĩ `-n 5` sẽ luôn hiện đúng năm mốc**: Nếu lịch sử ngắn hơn, Git hiện ít hơn.\r\n\r\n---\r\n\r\n## 🧪 Lab\r\n1. Chạy `git log` trong dự án để xem lịch sử.\r\n2. Nếu Git mở kết quả dạng phân trang, nhấn `q` để thoát.\r\n3. Chạy `git log --oneline` để xem mỗi commit trên một dòng.\r\n4. Thử `git log -n 2` để xem tối đa hai commit gần nhất.\r\n\r\n---\r\n\r\n## 💡 Hint\r\n> Nếu kết quả được mở dạng phân trang, nhấn `q` để quay lại terminal.\r\n\r\n---\r\n\r\n## ✅ Validation\r\n- Đọc được ít nhất một lời nhắn commit từ `git log --oneline`.\r\n\r\n---\r\n\r\n## ❓ Quiz\r\nLàm bài trắc nghiệm dưới đây về các kỹ năng tra cứu lịch sử với git log.\r\n\r\n---\r\n\r\n## 🔥 Challenge\r\nDùng `git log --oneline -n 3`, rồi giải thích mã nhận diện và message ở một dòng.\r\n\r\n---\r\n\r\n## 📚 Tổng kết\r\n- `git log` hiển thị các commit có thể đi tới từ nhánh hiện tại, mới nhất trước.\r\n- Cờ `--oneline` giúp rút gọn mỗi commit thành một dòng dễ theo dõi.\r\n- Nhấn phím `q` trên bàn phím để thoát khỏi chế độ xem phân trang của git log.\r\n",
  "quiz": {
    "id": "quiz-02-08-git-log",
    "title": "Trắc nghiệm: Tra cứu lịch sử với git log",
    "questions": [
      {
        "id": "q1",
        "question": "Nếu Git mở kết quả log theo từng trang, phím nào đưa bạn về terminal?",
        "type": "single",
        "options": [
          {
            "text": "Phím q (quit)",
            "correct": true
          },
          {
            "text": "Phím Esc",
            "correct": false
          },
          {
            "text": "Phím Ctrl + C",
            "correct": false
          },
          {
            "text": "Phím Enter",
            "correct": false
          }
        ],
        "explanation": "Trong trình xem phân trang thường dùng với Git, nhấn `q` để thoát."
      },
      {
        "id": "q2",
        "question": "Cờ tùy chọn `--oneline` trong lệnh git log mang lại tác dụng gì?",
        "type": "single",
        "options": [
          {
            "text": "Rút gọn mỗi commit thành một dòng duy nhất gồm mã hash ngắn và thông điệp commit",
            "correct": true
          },
          {
            "text": "Chỉ hiển thị dòng code đầu tiên của tệp tin index.html",
            "correct": false
          },
          {
            "text": "Xóa toàn bộ các commit chỉ giữ lại một commit duy nhất",
            "correct": false
          },
          {
            "text": "Kết nối mạng Internet để kiểm tra trạng thái online",
            "correct": false
          }
        ],
        "explanation": "`--oneline` là tùy chọn cực kỳ phổ biến giúp hiển thị lịch sử cô đọng, dễ đọc lướt nhanh."
      },
      {
        "id": "q3",
        "question": "Lệnh nào giới hạn kết quả còn tối đa 3 commit gần nhất?",
        "type": "single",
        "options": [
          {
            "text": "git log -n 3 hoặc git log -3",
            "correct": true
          },
          {
            "text": "git log --limit-top-3",
            "correct": false
          },
          {
            "text": "git log --first 3",
            "correct": false
          },
          {
            "text": "git show -3 commits",
            "correct": false
          }
        ],
        "explanation": "Cú pháp `-n <số>` hoặc `-<số>` giới hạn số lượng commit được hiển thị trong kết quả log."
      },
      {
        "id": "q4",
        "question": "Theo thứ tự mặc định của `git log`, commit nào thường hiện ở đầu danh sách?",
        "type": "single",
        "options": [
          {
            "text": "Commit mới nhất mà nhánh hiện tại có thể đi tới",
            "correct": true
          },
          {
            "text": "Commit cũ nhất trong toàn bộ kho Git",
            "correct": false
          },
          {
            "text": "Commit đang chờ được tạo từ Staging Area",
            "correct": false
          },
          {
            "text": "Commit mới nhất trên GitHub, dù nhánh hiện tại không có commit đó",
            "correct": false
          }
        ],
        "explanation": "`git log` bắt đầu từ vị trí hiện tại và hiển thị commit mới trước các commit cha của nó."
      },
      {
        "id": "q5",
        "question": "Nếu muốn xem lịch sử commit ở dạng gọn, mỗi commit một dòng, bạn dùng lệnh nào?",
        "type": "single",
        "options": [
          {
            "text": "`git log --oneline`",
            "correct": true
          },
          {
            "text": "`git status --short`",
            "correct": false
          },
          {
            "text": "`git diff --staged`",
            "correct": false
          },
          {
            "text": "`git add --oneline`",
            "correct": false
          }
        ],
        "explanation": "`git log --oneline` hiển thị mỗi commit trên một dòng với mã hash ngắn và thông điệp."
      }
    ]
  }
};
export default lesson;
