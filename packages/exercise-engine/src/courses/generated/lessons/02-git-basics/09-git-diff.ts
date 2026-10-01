import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "09-git-diff",
  "moduleId": "02-git-basics",
  "metadata": {
    "id": "09-git-diff",
    "title": "So sánh khác biệt với git diff",
    "level": "beginner",
    "duration": 30,
    "xp": 90,
    "prerequisites": [
      "08-git-log"
    ],
    "objectives": [
      "Đọc dấu - và + để nhận ra dòng cũ bị bỏ và dòng mới được thêm.",
      "Phân biệt git diff với git diff --staged.",
      "Xem lại thay đổi trước khi đưa vào commit."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "inspect-diff"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git diff",
      "so sanh",
      "khac biet",
      "patch",
      "staged diff"
    ],
    "commands": [
      "git diff",
      "git diff --staged"
    ]
  },
  "content": "# So sánh khác biệt với git diff\n\n---\n\n## 🎯 Mục tiêu\n- Đọc dấu `-` và `+` để nhận ra dòng cũ bị bỏ và dòng mới được thêm.\n- Phân biệt `git diff` với `git diff --staged`.\n- Xem lại thay đổi trước khi đưa vào commit.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Diff — phần thay đổi giữa hai phiên bản\n- **Nói dễ hiểu:** Bản so sánh cho biết dòng nào được thêm, bỏ hoặc sửa.\n- **Ví dụ:** Diff cho thấy tiêu đề `Home` được đổi thành `Trang chủ`.\n- **Đừng nhầm:** Diff trình bày thay đổi; nó không tạo commit.\n\n### `git diff` — so sánh bản đang sửa\n- **Nói dễ hiểu:** Mặc định, lệnh cho thấy thay đổi chưa staged.\n- **Ví dụ:** Chạy `git diff` sau khi sửa một tệp tracked.\n- **Đừng nhầm:** Lệnh thường không hiện thay đổi mới đã staged.\n\n### `--staged` — xem phần đã chuẩn bị\n- **Nói dễ hiểu:** Chọn xem khác biệt giữa vùng chuẩn bị và commit hiện tại.\n- **Ví dụ:** Chạy `git diff --staged` trước khi commit.\n- **Đừng nhầm:** Tùy chọn này không đưa thay đổi vào Staging Area.\n\n### Hunk — một nhóm dòng thay đổi\n- **Nói dễ hiểu:** Một đoạn trong diff gom các dòng gần nhau có thay đổi.\n- **Ví dụ:** Một diff có thể có nhiều hunk nếu sửa hai vị trí xa nhau.\n- **Đừng nhầm:** Hunk không phải một tệp hay một commit riêng.\n\n---\n\n## 📖 Định nghĩa\n`git diff` hiển thị những dòng khác nhau giữa hai trạng thái của tệp. Dòng bắt đầu bằng `-` thuộc phiên bản cũ; dòng bắt đầu bằng `+` thuộc phiên bản mới. Màu sắc có thể khác nhau tùy terminal.\n\n---\n\n## 🤔 Tại sao cần?\nĐọc diff trước khi commit giúp phát hiện sửa nhầm, dòng thử nghiệm còn sót hoặc phần thay đổi chưa định gửi.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy xem diff như bản đối chiếu hai phiên bản: dấu `-` chỉ dòng ở bản cũ, dấu `+` chỉ dòng ở bản mới.\n\n---\n\n## 🖼 Sơ đồ\n```diff\n-Hello\n+Hello, world!\n```\nTrong kết quả thật, dòng `@@ -1,1 +1,1 @@` đánh dấu vị trí của một nhóm thay đổi (hunk); nó không phải nội dung tệp.\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn đổi `Hello` thành `Hello, world!` trong `app.js`. Chạy `git diff`: dòng cũ có dấu `-`, dòng mới có dấu `+`. Đọc cả hai để xác nhận mình sửa đúng.\n\n---\n\n## 💻 Command\n```bash\ngit diff\ngit diff --staged\n```\n\n---\n\n## 🔍 Giải thích command\n- `git diff`: So sánh sự khác biệt giữa Working Directory và Staging Area (những thay đổi chưa được add).\n- `git diff --staged` (hoặc `--cached`): So sánh sự khác biệt giữa Staging Area và commit gần nhất tại HEAD (những thay đổi chuẩn bị commit).\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Chạy git diff sau khi đã git add và tưởng code bị mất**:  Khi đã add vào Staging Area, bạn phải dùng `git diff --staged` mới xem được khác biệt.\n2. **Nhầm dòng `@@ -1,1 +1,1 @@` với nội dung tệp**:  Đây là dấu vị trí của một nhóm thay đổi (hunk).\n3. **Không đọc diff trước khi commit**:  Thói quen xấu dẫn đến việc commit cả mật khẩu hoặc các câu lệnh console.log thử nghiệm.\n\n---\n\n## 🧪 Lab\n1. Chỉnh sửa một dòng code trong tệp `app.js` và lưu lại.\n2. Chạy lệnh `git diff`; dòng cũ có dấu `-`, dòng mới có dấu `+`.\n3. Chạy `git add app.js`, sau đó chạy lại `git diff` (phần vừa staged không còn hiện ở đây).\n4. Chạy `git diff --staged` để thấy lại các dòng thay đổi đang nằm trong vùng chuẩn bị.\n\n---\n\n## 💡 Hint\n> Nhớ quy tắc: `git diff` xem tệp chưa add; `git diff --staged` xem tệp đã add.\n\n---\n\n## ✅ Validation\n- Đọc hiểu chính xác các dòng cộng trừ trong kết quả hiển thị của git diff.\n\n---\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm sau về cách sử dụng câu lệnh so sánh git diff.\n\n---\n\n## 🔥 Challenge\nSau khi chạy `git add app.js`, giải thích vì sao `git diff` và `git diff --staged` cho kết quả khác nhau.\n\n---\n\n## 📚 Tổng kết\n- `git diff` so sánh Working Directory với Staging Area (code chưa staged).\n- `git diff --staged` so sánh Staging Area với HEAD (code chuẩn bị commit).\n- Dấu `-` chỉ dòng ở bản cũ; dấu `+` chỉ dòng ở bản mới. Màu sắc chỉ là cách hiển thị.\n",
  "quiz": {
    "id": "quiz-02-09-git-diff",
    "title": "Trắc nghiệm: So sánh khác biệt với git diff",
    "questions": [
      {
        "id": "q1",
        "question": "Lệnh `git diff` không có tham số so sánh sự khác nhau giữa hai khu vực nào?",
        "type": "single",
        "options": [
          {
            "text": "Working Directory và Staging Area (những sửa đổi chưa được git add)",
            "correct": true
          },
          {
            "text": "Staging Area và commit gần nhất tại HEAD",
            "correct": false
          },
          {
            "text": "Nhánh main cục bộ và nhánh main trên GitHub",
            "correct": false
          },
          {
            "text": "Hai máy tính khác nhau trong cùng mạng LAN",
            "correct": false
          }
        ],
        "explanation": "`git diff` mặc định hiển thị những thay đổi đang nằm dở dang ở Working Directory mà chưa được đưa vào Staging Area."
      },
      {
        "id": "q2",
        "question": "Sau khi bạn đã chạy `git add .`, lệnh nào sẽ giúp bạn xem lại chi tiết nội dung những thay đổi đã được staged?",
        "type": "single",
        "options": [
          {
            "text": "git diff --staged (hoặc git diff --cached)",
            "correct": true
          },
          {
            "text": "git diff",
            "correct": false
          },
          {
            "text": "git log --diff-only",
            "correct": false
          },
          {
            "text": "git status --show-lines",
            "correct": false
          }
        ],
        "explanation": "`git diff --staged` (đồng nghĩa với `--cached`) so sánh nội dung trong Staging Area với snapshot HEAD gần nhất."
      },
      {
        "id": "q3",
        "question": "Trong kết quả `git diff`, một dòng nội dung bắt đầu bằng dấu `+` có ý nghĩa gì?",
        "type": "single",
        "options": [
          {
            "text": "Dòng đó thuộc phần mới được thêm vào so với bản cũ",
            "correct": true
          },
          {
            "text": "Dòng code đó đã bị xóa bỏ khỏi dự án",
            "correct": false
          },
          {
            "text": "Dòng code đó bị lỗi cú pháp lập trình",
            "correct": false
          },
          {
            "text": "Dòng code đó được tải về từ kho lưu trữ của đối thủ",
            "correct": false
          }
        ],
        "explanation": "Dấu `+` biểu thị một dòng thuộc phiên bản mới; màu sắc tùy terminal."
      },
      {
        "id": "q4",
        "question": "Tại sao lập trình viên nên chạy git diff trước khi commit code?",
        "type": "single",
        "options": [
          {
            "text": "Để tự kiểm tra lại từng dòng code thay đổi, loại bỏ dòng nháp thừa và tránh commit nhầm",
            "correct": true
          },
          {
            "text": "Để Git tự động chỉnh sửa lỗi ngữ pháp tiếng Anh trong mã nguồn",
            "correct": false
          },
          {
            "text": "Để giải phóng dung lượng bộ nhớ RAM máy tính",
            "correct": false
          },
          {
            "text": "Để kích hoạt bản quyền dùng thử miễn phí của phần mềm",
            "correct": false
          }
        ],
        "explanation": "Đọc diff giúp bạn kiểm tra chính xác phần mình sắp đưa vào commit."
      },
      {
        "id": "q5",
        "question": "Trong một đoạn thay đổi của `git diff`, dòng nội dung bắt đầu bằng dấu `-` thuộc phần nào?",
        "type": "single",
        "options": [
          {
            "text": "Phiên bản cũ; dòng đó đã bị bỏ hoặc thay thế",
            "correct": true
          },
          {
            "text": "Phiên bản mới được thêm vào",
            "correct": false
          },
          {
            "text": "Thông tin tài khoản GitHub",
            "correct": false
          },
          {
            "text": "Dòng lệnh phải gõ vào terminal",
            "correct": false
          }
        ],
        "explanation": "Dấu `-` chỉ nội dung có trong bản cũ nhưng không còn nguyên trạng trong bản mới."
      }
    ]
  }
};
export default lesson;
