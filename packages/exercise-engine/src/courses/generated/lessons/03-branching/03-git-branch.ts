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
  "content": "# Xem và tạo nhánh bằng `git branch`\r\n\r\n---\r\n\r\n## 🎯 Mục tiêu\r\n- Dùng `git branch` để xem nhánh cục bộ.\r\n- Dùng `git branch <tên>` để tạo nhánh mới.\r\n- Đọc dấu `*` để nhận biết nhánh đang chọn.\r\n\r\n---\r\n\r\n## 🧩 Từ khóa hôm nay\r\n\r\n### Danh sách nhánh\r\n- **Nói dễ hiểu:** Các tên nhánh đang có trong repository trên máy bạn.\r\n- **Ví dụ:** `git branch` có thể hiện `main` và `feature-cart`.\r\n- **Đừng nhầm:** Đây là nhánh cục bộ, không tự liệt kê mọi nhánh remote.\r\n\r\n### Dấu `*` — nhánh hiện tại\r\n- **Nói dễ hiểu:** Dấu sao đứng trước tên nhánh đang được chọn.\r\n- **Ví dụ:** `* main` nghĩa là hiện bạn đang ở `main`.\r\n- **Đừng nhầm:** Tạo nhánh mới không tự chuyển dấu sao sang nhánh đó.\r\n\r\n### `git branch <tên>` — tạo nhánh\r\n- **Nói dễ hiểu:** Thêm một tên nhánh trỏ tới commit hiện tại.\r\n- **Ví dụ:** `git branch feature-cart` tạo nhánh cho phần giỏ hàng.\r\n- **Đừng nhầm:** Lệnh này không chuyển thư mục làm việc sang nhánh mới.\r\n\r\n---\r\n\r\n## 📖 Định nghĩa\r\nChạy `git branch` không kèm tên để xem các nhánh cục bộ. Thêm tên phía sau để tạo nhánh tại commit hiện tại. Lệnh tạo nhánh không thay đổi nhánh bạn đang làm việc; dấu `*` cho biết vị trí hiện tại. Bài này chỉ học xem và tạo; đổi tên hoặc xóa nhánh sẽ học ở bài riêng.\r\n\r\n---\r\n\r\n## 🤔 Tại sao cần?\r\nTrước khi bắt đầu việc mới, bạn cần biết nhánh nào đã tồn tại và nhánh nào đang chọn. Tạo nhánh riêng giúp tách công việc mới. Xác nhận dấu `*` sau khi tạo để tránh tiếp tục sửa trên nhánh khác với dự định.\r\n\r\n---\r\n\r\n## 🧠 Mental Model (Mô hình tư duy)\r\nHãy nghĩ `git branch` như xem danh sách nhãn đặt trên các commit. Lệnh tạo nhánh chỉ thêm một nhãn mới tại commit đang chọn; nó chưa chuyển chỗ làm việc của bạn.\r\n\r\n---\r\n\r\n## 🖼 Sơ đồ\r\n```text\r\nTrước:  * main ──► Commit C2\r\n\r\nLệnh:   git branch feature-cart\r\n\r\nSau:      main ─────────┐\r\n         * feature-cart ─┴──► Commit C2\r\n\r\nCả hai tên có thể trỏ cùng một commit; dấu * vẫn ở main.\r\n```\r\n\r\n---\r\n\r\n## 🌎 Ví dụ thực tế\r\nBạn đang ở `main` và được giao làm giao diện giỏ hàng. Chạy `git branch feature-cart` để tạo nhánh cho phần việc. Sau lệnh này, chạy `git branch`: thấy cả hai tên nhưng dấu `*` vẫn ở `main`. Chuyển sang `feature-cart` là thao tác riêng ở bài tiếp theo.\r\n\r\n---\r\n\r\n## 💻 Command\r\n```bash\r\ngit branch\r\ngit branch feature-cart\r\ngit branch\r\n```\r\n\r\n---\r\n\r\n## 🔍 Giải thích command\r\n- Lệnh đầu liệt kê nhánh hiện có.\r\n- Lệnh thứ hai tạo nhánh `feature-cart` tại commit hiện tại.\r\n- Lệnh cuối xác nhận tên nhánh mới và vị trí dấu `*`.\r\n\r\n---\r\n\r\n## ⚠️ Sai lầm phổ biến\r\n1. **Tưởng `git branch tên` tự chuyển nhánh:** Kiểm tra dấu `*`; nó vẫn ở nhánh cũ.\r\n2. **Tưởng mỗi branch là một bản sao tệp:** Lệnh chỉ tạo một tên tham chiếu tới commit.\r\n3. **Tưởng `git branch` hiện tất cả nhánh trên GitHub:** Bài này chỉ xem danh sách nhánh cục bộ.\r\n\r\n---\r\n\r\n## 🧪 Lab\r\n1. Chạy `git branch`; ghi lại nhánh có dấu `*`.\r\n2. Chạy `git branch experiment`.\r\n3. Chạy lại `git branch`.\r\n4. Xác nhận `experiment` xuất hiện và dấu `*` vẫn ở nhánh ban đầu.\r\n\r\n---\r\n\r\n## 💡 Hint\r\n> Chỉ tạo nhánh ở bài này; chưa cần chuyển, đổi tên hay xóa nhánh.\r\n\r\n---\r\n\r\n## ✅ Validation\r\n- Danh sách có nhánh `experiment`.\r\n- Dấu `*` đứng trước nhánh đang làm việc ban đầu.\r\n\r\n---\r\n\r\n## ❓ Quiz\r\nTrả lời các câu hỏi để kiểm tra cách xem và tạo nhánh cục bộ.\r\n\r\n---\r\n\r\n## 🔥 Challenge\r\nTạo nhánh `feature-profile`. Chạy `git branch` và giải thích vì sao dấu `*` chưa chuyển tới nhánh mới.\r\n\r\n---\r\n\r\n## 📚 Tổng kết\r\n- `git branch` liệt kê nhánh cục bộ.\r\n- `git branch <tên>` tạo nhánh tại commit hiện tại.\r\n- Dấu `*` đánh dấu nhánh đang chọn; tạo nhánh không đồng nghĩa chuyển nhánh.\r\n",
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
