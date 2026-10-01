import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "02-staging-area",
  "moduleId": "02-git-basics",
  "metadata": {
    "id": "02-staging-area",
    "title": "Staging Area (Vùng chuẩn bị)",
    "level": "beginner",
    "duration": 25,
    "xp": 70,
    "prerequisites": [
      "01-working-directory"
    ],
    "objectives": [
      "Giải thích Staging Area là nơi chọn thay đổi cho commit kế tiếp.",
      "Dùng git add để chọn một tệp.",
      "Dùng git status để xác nhận lựa chọn."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "track-file"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "staging area",
      "index",
      "vung chuan bi",
      "git add"
    ],
    "commands": [
      "git status",
      "git add <file>",
      "git restore --staged <file>"
    ]
  },
  "content": "# Staging Area (Vùng chuẩn bị)\n\n---\n\n## 🎯 Mục tiêu\n- Giải thích Staging Area là nơi chọn thay đổi cho commit kế tiếp.\n- Dùng `git add` để chọn một tệp.\n- Dùng `git status` để xác nhận lựa chọn.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Staging Area — vùng chuẩn bị\n- **Nói dễ hiểu:** Chỗ bạn chọn phiên bản thay đổi sẽ đi vào commit kế tiếp.\n- **Ví dụ:** Thêm `README.md` vào vùng này trước khi lưu mốc.\n- **Đừng nhầm:** Thay đổi đang ở đây chưa phải commit.\n\n### Index — tên Git dùng cho vùng chuẩn bị\n- **Nói dễ hiểu:** Git gọi dữ liệu chuẩn bị cho commit là index.\n- **Ví dụ:** `git status` liệt kê tệp ở “Changes to be committed”.\n- **Đừng nhầm:** Trong bài cơ bản, index và Staging Area chỉ cùng một khái niệm.\n\n### Staged — đã được chọn cho commit\n- **Nói dễ hiểu:** Phiên bản hiện tại của tệp đã được đưa vào vùng chuẩn bị.\n- **Ví dụ:** Chạy `git add README.md`, rồi xem lại bằng `git status`.\n- **Đừng nhầm:** Nếu sửa tệp lần nữa, sửa đổi mới chưa tự được staged.\n\n---\n\n## 📖 Định nghĩa\nStaging Area là vùng bạn chọn các thay đổi sẽ đi vào commit kế tiếp. Git lưu thông tin vùng này trong tệp nội bộ `.git/index`, vì vậy tài liệu kỹ thuật cũng gọi nó là index. Dùng `git status` để xem thay đổi nào đã được chọn.\n\n---\n\n## 🤔 Tại sao cần?\nNếu sửa nhiều tệp, Staging Area cho phép chọn tệp đã sẵn sàng và để phần việc còn dở cho lần sau.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy nghĩ Staging Area như danh sách thay đổi bạn đã chọn cho commit tiếp theo.\n\n---\n\n## 🖼 Sơ đồ\n```text\nQuy trình đóng gói có chọn lọc:\n[Working Directory]                [Staging Area]                 [Commit History]\n├── auth.js (đã sửa) ──git add──►  auth.js (staged)  ──git commit──► Commit #1: feat: auth\n├── api.js  (đã sửa) ───────────►  (chưa add)\n└── temp.txt (nháp)  ───────────►  (chưa add)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn sửa `auth.js` và `style.css`, nhưng chỉ hoàn tất `auth.js`. Chạy `git add auth.js`; tệp kia chưa được chọn cho commit.\n\n---\n\n## 💻 Command\n```bash\ngit status\ngit add <file>\ngit restore --staged <file>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git status`: Kiểm tra tệp đã staged và thay đổi chưa staged.\n- `git add <file>`: Đưa nội dung hiện tại của tệp tin từ Working Directory vào Staging Area.\n- `git restore --staged <file>`: Rút tệp tin ra khỏi Staging Area trở lại Working Directory mà không làm mất nội dung code.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ `git add` đã tạo commit**:  Lệnh này chỉ chọn thay đổi; cần `git commit` để lưu mốc.\n2. **Sửa tệp sau khi đã add mà không kiểm tra lại**:  Phần sửa mới chưa được staged cho tới khi bạn add lại.\n3. **Không xem lại những gì đã chọn**:  Chạy `git status` trước khi commit.\n\n---\n\n## 🧪 Lab\n1. Tạo tệp `app.js` và thêm vào nội dung `console.log(\"Staging lab\");`.\n2. Chạy lệnh `git add app.js` để đưa tệp vào Staging Area.\n3. Chạy `git status` và quan sát tệp `app.js` nằm dưới tiêu đề Changes to be committed.\n\n---\n\n## 💡 Hint\n> Chỉ những thay đổi nằm trong Staging Area mới được ghi vào commit tiếp theo.\n\n---\n\n## ✅ Validation\n- Kiểm tra `git status` hiển thị tệp tin trong Changes to be committed.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để đánh giá sự am hiểu về Staging Area.\n\n---\n\n## 🔥 Challenge\nGiải thích điều gì xảy ra nếu bạn sửa tiếp tệp app.js sau khi đã chạy lệnh git add app.js.\n\n---\n\n## 📚 Tổng kết\n- Staging Area là nơi chọn thay đổi cho commit kế tiếp.\n- `git add <file>` chọn tệp; sửa tiếp thì cần add lại.\n- `git status` cho biết những gì đang chờ commit.\n",
  "quiz": {
    "id": "quiz-02-02-staging-area",
    "title": "Trắc nghiệm: Staging Area trong Git",
    "questions": [
      {
        "id": "q1",
        "question": "Staging Area trong Git đóng vai trò kỹ thuật gì?",
        "type": "single",
        "options": [
          {
            "text": "Là nơi chọn thay đổi sẽ được đưa vào commit kế tiếp",
            "correct": true
          },
          {
            "text": "Là nơi sao lưu dự phòng toàn bộ ổ cứng máy tính",
            "correct": false
          },
          {
            "text": "Là máy chủ lưu trữ từ xa trên mạng Internet",
            "correct": false
          },
          {
            "text": "Là thùng rác chứa các tệp đã xóa vĩnh viễn",
            "correct": false
          }
        ],
        "explanation": "Staging Area là khu vực chuẩn bị giúp lập trình viên tạo các commit sạch và có tổ chức. Các đáp án B, C, D đều hiểu sai kiến trúc Git."
      },
      {
        "id": "q2",
        "question": "Tệp tin vật lý nào trong thư mục .git đại diện cho Staging Area?",
        "type": "single",
        "options": [
          {
            "text": ".git/index",
            "correct": true
          },
          {
            "text": ".git/HEAD",
            "correct": false
          },
          {
            "text": ".git/config",
            "correct": false
          },
          {
            "text": ".git/COMMIT_EDITMSG",
            "correct": false
          }
        ],
        "explanation": "Tệp `.git/index` là tệp nhị phân lưu trữ trạng thái của Staging Area. `.git/HEAD` là con trỏ nhánh; `.git/config` là tệp cấu hình."
      },
      {
        "id": "q3",
        "question": "Nếu bạn đã chạy `git add file.txt`, sau đó mở file.txt sửa thêm 3 dòng nhưng chưa add lại, khi commit Git sẽ lưu nội dung nào?",
        "type": "single",
        "options": [
          {
            "text": "Nội dung của file.txt tại thời điểm bạn chạy lệnh git add trước đó",
            "correct": true
          },
          {
            "text": "Nội dung mới nhất bao gồm cả 3 dòng vừa sửa thêm",
            "correct": false
          },
          {
            "text": "Git sẽ báo lỗi cú pháp và hủy bỏ toàn bộ commit",
            "correct": false
          },
          {
            "text": "Tệp file.txt sẽ tự động bị xóa khỏi dự án",
            "correct": false
          }
        ],
        "explanation": "Git lưu snapshot của tệp tại chính thời điểm chạy `git add`. Mọi sửa đổi sau đó cần được `git add` lại để cập nhật vào Index."
      },
      {
        "id": "q4",
        "question": "Lệnh nào dùng để loại bỏ một tệp tin ra khỏi Staging Area mà vẫn giữ nguyên nội dung trong Working Directory?",
        "type": "single",
        "options": [
          {
            "text": "git restore --staged <file>",
            "correct": true
          },
          {
            "text": "git rm -f <file>",
            "correct": false
          },
          {
            "text": "git delete --all",
            "correct": false
          },
          {
            "text": "git push --force",
            "correct": false
          }
        ],
        "explanation": "`git restore --staged <file>` unstage tệp mà không làm mất nội dung code. `git rm -f` xóa hẳn file khỏi ổ đĩa."
      },
      {
        "id": "q5",
        "question": "Thay đổi đã được stage có xuất hiện trong lịch sử commit ngay lập tức không?",
        "type": "single",
        "options": [
          {
            "text": "Không; cần chạy `git commit` để tạo một mốc lịch sử",
            "correct": true
          },
          {
            "text": "Có; `git add` tự tạo commit",
            "correct": false
          },
          {
            "text": "Có; `git status` tự lưu commit",
            "correct": false
          },
          {
            "text": "Không; phải chạy `git push` trước khi commit",
            "correct": false
          }
        ],
        "explanation": "`git add` chỉ chọn nội dung vào Staging Area. `git commit` mới tạo mốc lịch sử cục bộ."
      }
    ]
  }
};
export default lesson;
