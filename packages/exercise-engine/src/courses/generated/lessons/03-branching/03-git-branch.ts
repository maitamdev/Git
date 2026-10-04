import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "03-git-branch",
  "moduleId": "03-branching",
  "metadata": {
    "id": "03-git-branch",
    "title": "Xem và tạo nhánh bằng git branch",
    "level": "intermediate",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "01-branch-concept"
    ],
    "objectives": [
      "Dùng git branch để xem nhánh cục bộ.",
      "Dùng git branch <tên> để tạo nhánh mới.",
      "Đọc dấu * để nhận biết nhánh đang chọn."
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
      "git branch",
      "danh sach nhanh",
      "tao nhanh"
    ],
    "commands": [
      "git branch",
      "git branch <tên-nhánh>"
    ]
  },
  "content": "# Xem và tạo nhánh bằng `git branch`\n\n---\n\n## 🎯 Mục tiêu\n- Sử dụng thành thạo `git branch` để kiểm tra danh mục toàn bộ các nhánh cục bộ.\n- Khởi tạo nhánh tính năng mới một cách chuẩn mực bằng `git branch <tên-nhánh>`.\n- Đọc vị chính xác ý nghĩa của dấu hoa thị `*` biểu thị nhánh đang được kích hoạt.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Danh sách nhánh\n- **Nói dễ hiểu:** Bản thống kê tất cả các luồng làm việc độc lập đang tồn tại trong kho mã nguồn trên máy của bạn.\n- **Ví dụ:** Chạy `git branch` hiển thị danh sách gồm `main`, `develop` và `feature-cart`.\n- **Đừng nhầm:** Lệnh mặc định này chỉ liệt kê các nhánh nội bộ trên máy cá nhân, không tự động tải hay hiển thị các nhánh mới của đồng đội trên GitHub.\n\n### Dấu `*` — nhánh hiện tại\n- **Nói dễ hiểu:** Dấu chỉ điểm trực quan (thường có màu xanh lá) gắn trước tên nhánh mà con trỏ HEAD đang bám vào.\n- **Ví dụ:** Nhìn thấy `* main` nghĩa là mọi commit mới bạn tạo ra sẽ thuộc về nhánh `main`.\n- **Đừng nhầm:** Tạo nhánh mới sẽ không làm dịch chuyển dấu `*`; bạn vẫn đứng nguyên tại chỗ cho tới khi dùng lệnh chuyển nhánh.\n\n### `git branch <tên>` — tạo nhánh\n- **Nói dễ hiểu:** Thao tác cắm thêm một chiếc cờ định danh mới trỏ vào mốc snapshot hiện tại của bạn.\n- **Ví dụ:** `git branch feature-payment` tạo nhánh riêng biệt cho tính năng thanh toán.\n- **Đừng nhầm:** Lệnh chỉ làm nhiệm vụ khai sinh nhánh mới, hoàn toàn chưa chuyển thư mục làm việc hay HEAD sang nhánh đó.\n\n---\n\n## 📖 Định nghĩa\n`git branch` là trung tâm điều phối và quản lý toàn bộ các nhánh trong kho mã nguồn cục bộ của bạn. Khi chạy không kèm tham số, lệnh sẽ xuất ra bản danh sách đầy đủ các luồng phát triển hiện hữu. Khi truyền thêm một tên nhánh phía sau, Git sẽ tạo ra một con trỏ nhánh mới trỏ thẳng vào commit hiện tại của bạn mà không hề làm suy chuyển vị trí làm việc.\n\n---\n\n## 🤔 Tại sao cần?\nTrước khi bắt tay vào code bất kỳ dòng nào, câu hỏi đầu tiên của một kỹ sư chuyên nghiệp luôn là: 'Tôi đang đứng ở đâu và nhánh này có an toàn để làm việc không?'. Lệnh `git branch` giúp bạn định vị chính xác nhánh hiện tại thông qua dấu hoa thị `*`, rà soát các nhánh rác cần dọn dẹp và chủ động khởi tạo các nhánh tính năng mới theo quy chuẩn phát triển phần mềm.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy xem `git branch` như danh bạ các kênh đàm thoại nội bộ trong một tòa nhà. Khi bạn mở danh bạ (chạy lệnh), đèn tín hiệu xanh (dấu `*`) sẽ sáng lên ở kênh bạn đang kết nối đàm thoại. Khi bạn thêm một tên kênh mới vào danh bạ, kênh mới sẵn sàng hoạt động nhưng bạn vẫn đang tiếp tục nghe nói ở kênh cũ cho đến khi bạn bấm nút chuyển kênh.\n\n---\n\n## 🖼 Sơ đồ\n```text\nQUY TRÌNH TẠO NHÁNH BẰNG GIT BRANCH:\n\nBước 1: Ban đầu đang ở nhánh main\n  * main ────────► [Commit C2]\n\nBước 2: Chạy lệnh `git branch feature-cart`\n  * main ────────┐\n    feature-cart ┴──► [Commit C2]\n  (Cả 2 nhánh cùng trỏ vào C2, nhưng dấu * vẫn ở main!)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nSáng nay bạn được phân công làm giao diện giỏ hàng mới. Bạn gõ `git branch` để kiểm tra thấy mình đang ở `* main`. Bạn gõ `git branch feature/shopping-cart` để đăng ký luồng việc mới. Kiểm tra lại bằng `git branch`, nhánh mới đã nằm sẵn sàng trong danh bạ nhưng bạn vẫn an tọa tại `* main`, hoàn toàn chủ động trước khi quyết định chuyển sang.\n\n---\n\n## 💻 Command\n```bash\ngit branch\ngit branch feature-cart\ngit branch -v\ngit branch -a\n```\n\n---\n\n## 🔍 Giải thích command\n- `git branch`: Hiển thị danh sách các nhánh nội bộ; nhánh hiện tại có tiền tố `*` và màu nổi bật.\n- `git branch <tên-nhánh>`: Tạo nhánh mới tại commit hiện tại mà HEAD đang trỏ vào.\n- `git branch -v`: Liệt kê chi tiết kèm theo mã commit hash rút gọn và commit message gần nhất của từng nhánh.\n- `git branch -a`: Hiển thị toàn bộ cả nhánh cục bộ (local) lẫn các nhánh theo dõi từ xa (remote-tracking).\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Lầm tưởng đã nhảy sang nhánh mới sau khi tạo**: Gõ `git branch feature-x` xong tưởng đã ở nhánh đó và hăng say gõ code, đến khi commit mới tá hỏa phát hiện đã commit nhầm vào `main`!\n2. **Đặt tên nhánh vô tội vạ**: Đặt tên nhánh kiểu `test`, `abc`, `fix` gây hỗn loạn dự án; hãy tuân thủ tiền tố như `feature/`, `bugfix/`, `hotfix/`.\n3. **Nghĩ rằng `git branch` hiển thị ngay nhánh mới trên GitHub**: Bạn cần chạy `git fetch` trước thì Git mới cập nhật các nhánh từ xa về máy.\n\n---\n\n## 🧪 Lab\n1. Chạy `git branch` để kiểm tra danh sách hiện tại và xác định xem nhánh nào đang có dấu `*`.\n2. Tạo nhánh thử nghiệm mới bằng lệnh `git branch experiment`.\n3. Chạy lại `git branch` để quan sát sự thay đổi của danh sách.\n4. Xác minh rằng nhánh `experiment` đã xuất hiện nhưng dấu `*` vẫn nằm nguyên ở nhánh ban đầu.\n\n---\n\n## 💡 Hint\n> Luôn nhìn kỹ dấu `*` trước tên nhánh trong kết quả của `git branch` để chắc chắn bạn không commit nhầm nhánh!\n\n---\n\n## ✅ Validation\n- Nhánh `experiment` có mặt trong danh sách trả về của `git branch`.\n- Dấu hoa thị `*` vẫn đứng trước nhánh làm việc ban đầu.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để kiểm tra kiến thức về các tùy chọn xem và tạo nhánh với lệnh git branch.\n\n---\n\n## 🔥 Challenge\nChạy lệnh `git branch -v` và giải thích chi tiết: 3 cột thông tin hiển thị trên mỗi dòng biểu thị điều gì và nó giúp ích thế nào khi bạn cần rà soát nhanh tiến độ của từng nhánh?\n\n---\n\n## 📚 Tổng kết\n- `git branch` cung cấp bức tranh toàn cảnh về các luồng phát triển trong repository.\n- Dấu `*` là chỉ dấu định vị sống còn cho biết bạn đang thực sự đứng ở nhánh nào.\n- `git branch <tên>` chỉ tạo nhánh, bạn cần lệnh chuyên dụng để bước sang nhánh đó.\n",
  "quiz": {
    "id": "quiz-03-03-git-branch",
    "title": "Trắc nghiệm: Xem và tạo nhánh",
    "questions": [
      {
        "id": "q1",
        "question": "Lệnh nào liệt kê các nhánh cục bộ?",
        "type": "single",
        "options": [
          {
            "text": "git branch",
            "correct": true
          },
          {
            "text": "git log --oneline",
            "correct": false
          },
          {
            "text": "git remote -v",
            "correct": false
          },
          {
            "text": "git status --short",
            "correct": false
          }
        ],
        "explanation": "Chạy `git branch` không kèm tên để liệt kê các nhánh cục bộ trong repository."
      },
      {
        "id": "q2",
        "question": "Bạn muốn tạo nhánh `feature-login` tại commit hiện tại và vẫn ở nhánh đang làm. Nên chạy lệnh nào?",
        "type": "single",
        "options": [
          {
            "text": "git branch feature-login",
            "correct": true
          },
          {
            "text": "git switch -c feature-login",
            "correct": false
          },
          {
            "text": "git commit -m \"feature-login\"",
            "correct": false
          },
          {
            "text": "git branch -d feature-login",
            "correct": false
          }
        ],
        "explanation": "`git branch feature-login` tạo tên nhánh nhưng không chuyển HEAD sang nhánh đó."
      },
      {
        "id": "q3",
        "question": "Bạn vừa chạy `git branch experiment`. Điều gì xảy ra với thư mục làm việc?",
        "type": "single",
        "options": [
          {
            "text": "Vẫn theo nhánh hiện tại; lệnh chỉ tạo thêm tên nhánh",
            "correct": true
          },
          {
            "text": "Git lập tức thay toàn bộ tệp bằng nội dung của một commit mới",
            "correct": false
          },
          {
            "text": "Git gửi nhánh mới lên remote",
            "correct": false
          },
          {
            "text": "Git xóa nhánh đang chọn",
            "correct": false
          }
        ],
        "explanation": "Tạo nhánh không cập nhật thư mục làm việc; việc chuyển sang nhánh khác là lệnh riêng."
      },
      {
        "id": "q4",
        "question": "Trong danh sách `git branch`, dấu `*` đứng trước tên nào?",
        "type": "single",
        "options": [
          {
            "text": "Nhánh đang được chọn",
            "correct": true
          },
          {
            "text": "Nhánh đã bị xóa",
            "correct": false
          },
          {
            "text": "Nhánh remote mới nhất",
            "correct": false
          },
          {
            "text": "Nhánh có nhiều commit nhất",
            "correct": false
          }
        ],
        "explanation": "Dấu sao đánh dấu nhánh hiện tại; nó không biểu thị độ dài hay trạng thái remote."
      },
      {
        "id": "q5",
        "question": "Sau khi tạo `experiment`, dấu `*` vẫn đứng trước `main`. Điều đó cho biết gì?",
        "type": "single",
        "options": [
          {
            "text": "Bạn vẫn đang làm việc trên `main`",
            "correct": true
          },
          {
            "text": "Nhánh `experiment` chưa được tạo",
            "correct": false
          },
          {
            "text": "Hai nhánh đã được merge",
            "correct": false
          },
          {
            "text": "Repository không có commit",
            "correct": false
          }
        ],
        "explanation": "Lệnh `git branch experiment` chỉ tạo nhánh; dấu sao vẫn chỉ nhánh mà bạn đang đứng."
      },
      {
        "id": "q6",
        "question": "Lệnh `git branch` không kèm tùy chọn chủ yếu hiển thị nhóm nào?",
        "type": "single",
        "options": [
          {
            "text": "Các nhánh cục bộ trong repository hiện tại",
            "correct": true
          },
          {
            "text": "Mọi nhánh trên tất cả máy tính của nhóm",
            "correct": false
          },
          {
            "text": "Mọi commit đã push lên GitHub",
            "correct": false
          },
          {
            "text": "Danh sách tệp đang untracked",
            "correct": false
          }
        ],
        "explanation": "Lệnh cơ bản liệt kê nhánh cục bộ; nhánh từ xa có lệnh xem riêng học ở phần sau."
      }
    ]
  }
};
export default lesson;
