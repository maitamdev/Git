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
      "Dùng `--oneline` và `--graph` để thay đổi cách hiển thị.",
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
      "graph",
      "tra cuu commit"
    ],
    "commands": [
      "git log",
      "git log --oneline",
      "git log --graph --oneline",
      "git log -n 5"
    ]
  },
  "content": "# Tra cứu lịch sử với git log\n\n---\n\n## 🎯 Mục tiêu\n- Dùng `git log` để xem các commit trong lịch sử của nhánh hiện tại.\n- Rút gọn hoặc vẽ lịch sử bằng `--oneline` và `--graph`.\n- Giới hạn số commit hiển thị bằng `-n`.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### `git log` — xem lịch sử commit\n- **Nói dễ hiểu:** Liệt kê các commit đã lưu trong nhánh hiện tại.\n- **Ví dụ:** Chạy `git log` sau khi đã tạo vài commit.\n- **Đừng nhầm:** Lệnh không hiển thị sửa đổi chưa commit như một mốc mới.\n\n### Commit hash — mã nhận diện commit\n- **Nói dễ hiểu:** Chuỗi ký tự Git dùng để phân biệt một commit.\n- **Ví dụ:** Mã ngắn xuất hiện cạnh message trong `git log --oneline`.\n- **Đừng nhầm:** Đây không phải số thứ tự do người dùng đặt.\n\n### `--oneline` — dạng lịch sử gọn\n- **Nói dễ hiểu:** Tùy chọn hiện mỗi commit trên một dòng ngắn.\n- **Ví dụ:** `git log --oneline`.\n- **Đừng nhầm:** Dạng gọn ẩn bớt chi tiết; có thể chạy `git log` để xem đầy đủ.\n\n### `--graph` — vẽ nhánh lịch sử\n- **Nói dễ hiểu:** Thêm ký hiệu giúp nhìn các đường nhánh và commit nối nhau.\n- **Ví dụ:** `git log --oneline --graph`.\n- **Đừng nhầm:** Ký hiệu chỉ trình bày lịch sử, không thay đổi repository.\n\n### `-n` — giới hạn số commit\n- **Nói dễ hiểu:** Chỉ hiện một số lượng commit gần đây do bạn chọn.\n- **Ví dụ:** `git log -n 3` hiện tối đa ba commit.\n- **Đừng nhầm:** Tùy chọn này chỉ rút gọn kết quả, không xóa lịch sử.\n\n---\n\n## 📖 Định nghĩa\n`git log` liệt kê các commit có thể đi tới từ nhánh hiện tại, bắt đầu từ commit mới nhất. Mỗi mục cho biết commit và lời nhắn; dạng đầy đủ có thêm thông tin khác. Mã commit là mã nhận diện, không phải số thứ tự.\n\n---\n\n## 🤔 Tại sao cần?\nKhi quên mình đã lưu những mốc nào, `git log` giúp bạn xem lại lịch sử. Dạng gọn giúp lướt nhanh; `-n` giới hạn kết quả để terminal dễ đọc.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\n`git log` giống như danh sách các mốc đã lưu: mốc mới nhất hiện trước, mỗi mốc có mã nhận diện và message.\n\n---\n\n## 🖼 Sơ đồ\n```text\nTùy biến hiển thị git log --graph --oneline:\n* f7d02a1 (HEAD -> main) feat(payment): add momo e-wallet support\n* 9e1c3d4 feat(cart): calculate discount coupon code\n* 4a2f8b9 fix(auth): prevent sql injection in login query\n* 1b8e4f2 feat: initialize project repository\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn muốn biết mình vừa lưu những mốc nào. Chạy `git log --oneline -n 3` để xem tối đa ba commit gần nhất, mỗi commit trên một dòng.\n\n---\n\n## 💻 Command\n```bash\ngit log\ngit log --oneline\ngit log --graph --oneline\ngit log -n 5\n```\n\n---\n\n## 🔍 Giải thích command\n- `git log`: Hiển thị lịch sử commit mà nhánh hiện tại có thể đi tới.\n- `git log --oneline`: Hiện mỗi commit trên một dòng ngắn; độ dài mã nhận diện có thể thay đổi.\n- `git log --graph --oneline`: Thêm ký hiệu để xem đường đi giữa các commit.\n- `git log -n 5`: Hiển thị tối đa 5 commit có thể đi tới từ nhánh hiện tại.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Không biết thoát kết quả phân trang**: Nếu Git mở trang xem log, nhấn `q` để quay lại terminal.\n2. **Chỉ dùng git log mặc định dài dòng**:  Không biết sử dụng `--oneline` khiến màn hình bị tràn ngập thông tin khó theo dõi.\n3. **Nghĩ `-n 5` sẽ luôn hiện đúng năm mốc**: Nếu lịch sử ngắn hơn, Git hiện ít hơn.\n\n---\n\n## 🧪 Lab\n1. Chạy `git log` trong dự án để xem lịch sử.\n2. Nếu Git mở kết quả dạng phân trang, nhấn `q` để thoát.\n3. Chạy `git log --oneline` để xem mỗi commit trên một dòng.\n4. Thử `git log -n 2` để xem tối đa hai commit gần nhất.\n\n---\n\n## 💡 Hint\n> Nếu kết quả được mở dạng phân trang, nhấn `q` để quay lại terminal.\n\n---\n\n## ✅ Validation\n- Đọc được ít nhất một lời nhắn commit từ `git log --oneline`.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây về các kỹ năng tra cứu lịch sử với git log.\n\n---\n\n## 🔥 Challenge\nDùng `git log --oneline -n 3`, rồi giải thích mã nhận diện và message ở một dòng.\n\n---\n\n## 📚 Tổng kết\n- `git log` hiển thị các commit có thể đi tới từ nhánh hiện tại, mới nhất trước.\n- Cờ `--oneline` giúp rút gọn mỗi commit thành một dòng trực quan dễ theo dõi.\n- Nhấn phím `q` trên bàn phím để thoát khỏi chế độ xem phân trang của git log.\n",
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
        "question": "Để xem đồ thị phân nhánh trực quan bằng các ký tự ASCII trong terminal, bạn dùng cờ nào?",
        "type": "single",
        "options": [
          {
            "text": "--graph",
            "correct": true
          },
          {
            "text": "--tree-view",
            "correct": false
          },
          {
            "text": "--draw-diagram",
            "correct": false
          },
          {
            "text": "--ascii-art",
            "correct": false
          }
        ],
        "explanation": "`--graph` vẽ các đường nhánh và mốc hợp nhất commit bằng đồ thị ký tự trực quan ngay trong terminal."
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
