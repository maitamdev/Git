import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "01-branch-concept",
  "moduleId": "03-branching",
  "metadata": {
    "id": "01-branch-concept",
    "title": "Khái niệm nhánh (branch) trong Git",
    "level": "intermediate",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "06-git-commit"
    ],
    "objectives": [
      "Giải thích branch là một tên trỏ tới commit, không phải bản sao dự án.",
      "Nhận biết main là tên nhánh phổ biến, không bảo đảm code production.",
      "Dùng git branch để xem nhánh hiện có và nhánh đang chọn."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "create-branch"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "branch",
      "nhanh git",
      "con tro commit",
      "phan nhanh"
    ],
    "commands": [
      "git branch",
      "git branch <tên-nhánh>"
    ]
  },
  "content": "# Khái niệm nhánh (branch) trong Git\r\n\r\n---\r\n\r\n## 🎯 Mục tiêu\r\n- Giải thích branch là một tên trỏ tới commit, không phải bản sao dự án.\r\n- Nhận biết `main` chỉ là một tên nhánh phổ biến, không bảo đảm code đang chạy production.\r\n- Dùng `git branch` để xem nhánh hiện có và nhánh đang chọn.\r\n\r\n---\r\n\r\n## 🧩 Từ khóa hôm nay\r\n\r\n### Branch — nhánh\r\n- **Nói dễ hiểu:** Một tên trỏ tới commit mới nhất của một dòng công việc.\r\n- **Ví dụ:** Tạo `feature-cart` để làm tính năng giỏ hàng.\r\n- **Đừng nhầm:** Nhánh không phải bản sao toàn bộ thư mục.\r\n\r\n### Commit — mốc trong lịch sử\r\n- **Nói dễ hiểu:** Một trạng thái dự án được lưu để xem lại.\r\n- **Ví dụ:** Commit lưu phiên bản giỏ hàng vừa hoàn thành.\r\n- **Đừng nhầm:** Nhánh trỏ tới commit; commit không phải nhánh.\r\n\r\n### `main` — tên nhánh thường dùng\r\n- **Nói dễ hiểu:** Nhiều dự án dùng `main` làm nhánh mặc định hoặc nhánh tích hợp.\r\n- **Ví dụ:** Người mới clone dự án có thể bắt đầu ở `main`.\r\n- **Đừng nhầm:** Tên `main` không tự bảo đảm nội dung đã sẵn sàng phát hành.\r\n\r\n---\r\n\r\n## 📖 Định nghĩa\r\nBranch (nhánh) là một tên nhẹ trỏ tới một commit trong lịch sử. Khi bạn tạo commit mới trên nhánh đang chọn, Git thường cập nhật tên nhánh đó để trỏ tới commit mới. Các thao tác viết lại lịch sử cũng có thể đổi vị trí con trỏ. Tạo nhánh mới không sao chép toàn bộ tệp dự án.\r\n\r\n---\r\n\r\n## 🤔 Tại sao cần?\r\nNhánh cho phép bạn làm tính năng hoặc thử ý tưởng mà không trộn ngay vào công việc chung. Đồng đội có thể tiếp tục làm trên nhánh khác. Khi phần việc đã sẵn sàng, nhóm sẽ xem xét cách nhập thay đổi vào nhánh tích hợp.\r\n\r\n---\r\n\r\n## 🧠 Mental Model (Mô hình tư duy)\r\nHãy coi commit là các mốc trên bản đồ, còn branch là một tấm nhãn đặt lên một mốc. Tạo branch mới nghĩa là đặt thêm một nhãn tại commit hiện tại. Nhãn mới và nhãn cũ có thể trỏ cùng một mốc lúc đầu; sau này, commit trên một nhánh có thể làm nhãn đó trỏ sang mốc mới.\r\n\r\n---\r\n\r\n## 🖼 Sơ đồ\r\n```text\r\nLịch sử commit:  C1 ◄── C2 ◄── C3\r\n                       ▲      ▲\r\n                       │      └── main\r\n                       └───────── feature-cart\r\n\r\nKhi vừa tạo feature-cart, hai nhánh có thể cùng trỏ vào C2.\r\n``` \r\n\r\n---\r\n\r\n## 🌎 Ví dụ thực tế\r\nNhóm làm website trường dùng `main` làm nhánh tích hợp. An tạo `feature-chat` để viết màn hình chat, còn Bình tiếp tục sửa trang thông tin trên nhánh khác. Nhánh giúp nhóm tách các mốc công việc; tên `main` là quy ước của nhóm chứ Git không kiểm tra xem nội dung đó có đang chạy trên website hay không.\r\n\r\n---\r\n\r\n## 💻 Command\r\n```bash\r\ngit branch\r\ngit branch feature-cart\r\ngit branch\r\n```\r\n\r\n---\r\n\r\n## 🔍 Giải thích command\r\n- `git branch`: Liệt kê nhánh cục bộ; dấu `*` đứng trước nhánh đang chọn.\r\n- `git branch feature-cart`: Tạo một nhánh mới tại commit hiện tại nhưng vẫn ở nhánh cũ.\r\n- Chạy lại `git branch` để xác nhận nhánh mới xuất hiện và dấu `*` chưa chuyển.\r\n\r\n---\r\n\r\n## ⚠️ Sai lầm phổ biến\r\n1. **Tưởng tạo nhánh là nhân đôi thư mục:** Git tạo thêm một tên trỏ tới commit.\r\n2. **Tưởng `main` luôn là bản production:** Nhóm tự quy định vai trò của từng nhánh.\r\n3. **Tưởng `git branch tên` tự chuyển sang nhánh mới:** Lệnh này chỉ tạo tên nhánh; chuyển nhánh học ở bài sau.\r\n\r\n---\r\n\r\n## 🧪 Lab\r\n1. Chạy `git branch` và ghi lại nhánh có dấu `*`.\r\n2. Tạo nhánh `feature-cart` bằng `git branch feature-cart`.\r\n3. Chạy `git branch` lần nữa.\r\n4. Xác nhận `feature-cart` xuất hiện nhưng dấu `*` vẫn ở nhánh ban đầu.\r\n\r\n---\r\n\r\n## 💡 Hint\r\n> Nếu bạn chỉ muốn tạo nhánh mà chưa đổi chỗ làm việc, dùng `git branch <tên-nhánh>`.\r\n\r\n---\r\n\r\n## ✅ Validation\r\n- Danh sách có nhánh `feature-cart`.\r\n- Dấu `*` vẫn đứng trước nhánh đang làm việc ban đầu.\r\n\r\n---\r\n\r\n## ❓ Quiz\r\nTrả lời các câu hỏi để kiểm tra bạn đã hiểu nhánh là gì và lệnh tạo nhánh làm gì.\r\n\r\n---\r\n\r\n## 🔥 Challenge\r\nTạo thêm nhánh `experiment`. Dùng `git branch` để xác nhận bạn đang ở nhánh nào, rồi giải thích vì sao tạo nhánh không tự chuyển bạn sang đó.\r\n\r\n---\r\n\r\n## 📚 Tổng kết\r\n- Branch là một tên trỏ tới commit, không phải bản sao thư mục.\r\n- `git branch <tên>` tạo nhánh tại commit hiện tại nhưng không chuyển nhánh.\r\n- `main` là tên phổ biến; vai trò của nó do nhóm quyết định.\r\n",
  "quiz": {
    "id": "quiz-03-01-branch-concept",
    "title": "Trắc nghiệm: Khái niệm nhánh trong Git",
    "questions": [
      {
        "id": "q1",
        "question": "Trong Git, một branch là gì?",
        "type": "single",
        "options": [
          {
            "text": "Một tên trỏ tới một commit trong lịch sử",
            "correct": true
          },
          {
            "text": "Một bản sao đầy đủ của dự án trong thư mục khác",
            "correct": false
          },
          {
            "text": "Một commit chứa riêng mã nguồn trên GitHub",
            "correct": false
          },
          {
            "text": "Một tệp lưu danh sách người dùng của dự án",
            "correct": false
          }
        ],
        "explanation": "Branch là tên tham chiếu tới commit; nó không sao chép toàn bộ thư mục dự án."
      },
      {
        "id": "q2",
        "question": "Bạn muốn tạo nhánh tên `feature-cart` nhưng vẫn ở nhánh hiện tại. Nên chạy lệnh nào?",
        "type": "single",
        "options": [
          {
            "text": "git branch feature-cart",
            "correct": true
          },
          {
            "text": "git switch feature-cart",
            "correct": false
          },
          {
            "text": "git commit -m \"feature-cart\"",
            "correct": false
          },
          {
            "text": "git branch -d feature-cart",
            "correct": false
          }
        ],
        "explanation": "`git branch <tên>` tạo một nhánh mới tại commit hiện tại nhưng không tự chuyển sang nhánh đó."
      },
      {
        "id": "q3",
        "question": "Sau khi tạo nhánh mới bằng `git branch feature-cart`, bạn vẫn đang ở đâu?",
        "type": "single",
        "options": [
          {
            "text": "Vẫn ở nhánh đang có dấu `*` trước khi chạy lệnh",
            "correct": true
          },
          {
            "text": "Tự động ở nhánh `feature-cart`",
            "correct": false
          },
          {
            "text": "Ở trạng thái detached HEAD",
            "correct": false
          },
          {
            "text": "Trên nhánh remote `origin/feature-cart`",
            "correct": false
          }
        ],
        "explanation": "`git branch` chỉ tạo tên nhánh; muốn đổi chỗ làm việc cần dùng lệnh chuyển nhánh riêng."
      },
      {
        "id": "q4",
        "question": "Kết quả `git branch` dùng dấu nào để đánh dấu nhánh hiện tại?",
        "type": "single",
        "options": [
          {
            "text": "Dấu sao `*`",
            "correct": true
          },
          {
            "text": "Dấu cộng `+`",
            "correct": false
          },
          {
            "text": "Dấu thăng `#`",
            "correct": false
          },
          {
            "text": "Dấu chấm `.`",
            "correct": false
          }
        ],
        "explanation": "Dấu sao ở đầu dòng đánh dấu tên nhánh mà HEAD đang theo trong trạng thái bình thường."
      },
      {
        "id": "q5",
        "question": "Tên `main` cho biết chắc chắn điều gì về repository?",
        "type": "single",
        "options": [
          {
            "text": "Đây là một tên nhánh phổ biến; vai trò cụ thể do nhóm quy định",
            "correct": true
          },
          {
            "text": "Nội dung trên nhánh luôn đang chạy production",
            "correct": false
          },
          {
            "text": "Git không cho phép tạo thêm nhánh khác",
            "correct": false
          },
          {
            "text": "Đây là tên cố định mà mọi repository bắt buộc phải dùng",
            "correct": false
          }
        ],
        "explanation": "`main` thường được chọn làm nhánh mặc định, nhưng Git không gán vai trò production cố định cho tên này."
      },
      {
        "id": "q6",
        "question": "Bạn tạo commit mới khi đang ở một nhánh. Thông thường, điều gì xảy ra với nhánh đó?",
        "type": "single",
        "options": [
          {
            "text": "Tên nhánh cập nhật để trỏ tới commit mới",
            "correct": true
          },
          {
            "text": "Tên nhánh bị xóa sau khi commit",
            "correct": false
          },
          {
            "text": "Mọi nhánh khác cũng tự chuyển tới commit mới",
            "correct": false
          },
          {
            "text": "Commit mới không được thêm vào lịch sử nào",
            "correct": false
          }
        ],
        "explanation": "Khi commit trên một nhánh, Git thường cập nhật con trỏ của nhánh đó tới commit mới."
      }
    ]
  }
};
export default lesson;
