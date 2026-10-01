import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "13-delete-rename-branch",
  "moduleId": "03-branching",
  "metadata": {
    "id": "13-delete-rename-branch",
    "title": "Xóa và đổi tên nhánh an toàn",
    "level": "intermediate",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "03-git-branch"
    ],
    "objectives": [
      "Đổi tên nhánh bằng `git branch -m`.",
      "Giải thích điều kiện để xóa an toàn bằng `git branch -d`.",
      "Nhận biết vì sao không nên bỏ qua kiểm tra an toàn của `-d`."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "delete branch",
      "rename branch",
      "git branch -d",
      "git branch -m",
      "don dep nhanh"
    ],
    "commands": [
      "git branch -m <tên-cũ> <tên-mới>",
      "git branch -d <tên-nhánh>",
      "git branch"
    ]
  },
  "content": "# Đổi tên và xóa nhánh an toàn\n\n---\n\n## 🎯 Mục tiêu\n- Đổi tên một nhánh bằng `git branch -m`.\n- Giải thích vì sao `git branch -d` có thể từ chối xóa.\n- Chỉ xóa nhánh sau khi xác nhận công việc đã được merge.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### `git branch -m` — đổi tên nhánh\n- **Nói dễ hiểu:** Đổi tên con trỏ nhánh; commit và nội dung lịch sử vẫn giữ nguyên.\n- **Ví dụ:** `git branch -m temp-feature feature-profile` đổi tên nhánh `temp-feature`.\n- **Đừng nhầm:** Lệnh không đổi tên nhánh trên GitHub; phần đó cần quy trình remote ở Level 4.\n\n### `git branch -d` — xóa nhánh có kiểm tra\n- **Nói dễ hiểu:** Xóa nhánh nếu công việc trên đó đã được nhập vào nhánh hiện tại hoặc nhánh theo dõi.\n- **Ví dụ:** Sau khi merge `feature-profile` vào `main`, xóa nhánh phụ bằng `git branch -d feature-profile`.\n- **Đừng nhầm:** Nếu nhánh còn commit chưa merge, Git từ chối để tránh làm mất đường dẫn tới công việc đó.\n\n### `git branch -D` — xóa cưỡng chế\n- **Nói dễ hiểu:** Cờ viết hoa bỏ qua kiểm tra an toàn của `-d`.\n- **Ví dụ:** Git nhắc tới `-D` trong thông báo khi `-d` từ chối.\n- **Đừng nhầm:** Bài này không dùng `-D`; chỉ cân nhắc khi bạn đã xác nhận muốn bỏ công việc chưa merge và biết cách khôi phục.\n\n---\n\n## 📖 Định nghĩa\nTên nhánh là nhãn giúp trỏ tới commit. Đổi tên thay đổi nhãn; xóa nhánh gỡ nhãn đó. `git branch -d` chỉ cho xóa khi Git xác nhận nhánh đã được gộp, nhờ vậy giảm nguy cơ bỏ quên commit chưa tích hợp.\n\n---\n\n## 🤔 Tại sao cần?\nNhánh thường được đặt tên tạm khi bắt đầu làm việc. Khi công việc hoàn tất, tên rõ ràng giúp nhóm dễ hiểu hơn; sau khi merge, xóa nhánh cũ giữ danh sách gọn. Kiểm tra an toàn trước khi xóa bảo vệ công việc chưa được nhập.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nNhánh giống tấm thẻ đánh dấu vị trí trong quyển sổ lịch sử. Đổi tên là viết lại tên trên thẻ. Xóa thẻ không xóa những trang đã được đánh dấu; nhưng nếu thẻ là đường duy nhất tới vài trang chưa chép vào nơi khác, đừng vứt nó đi.\n\n---\n\n## 🖼 Sơ đồ\n```text\nTrước merge:    main ── C1\n                         \\\n                 feature ─ C2   (chưa merge, -d từ chối)\n\nSau merge:      main ── C1 ── M/C2\n                              \\\n                 feature ─────┘   (đã nhập, -d có thể xóa nhãn)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn đặt nhánh tạm là `temp-feature`, sau đó đổi thành `feature-profile` cho dễ hiểu. Khi tính năng đã được merge vào `main`, bạn xóa nhánh phụ. Nếu thử xóa trước khi merge, `-d` dừng và báo rằng nhánh chưa được gộp.\n\n---\n\n## 💻 Command\n```bash\ngit branch -m <tên-cũ> <tên-mới>\ngit branch -d <tên-nhánh>\ngit branch\n```\n\n---\n\n## 🔍 Giải thích command\n- `git branch -m <cũ> <mới>`: Đổi tên nhánh bất kỳ; nếu chỉ truyền một tên sau `-m`, Git đổi tên nhánh hiện tại.\n- `git branch -d <nhánh>`: Xóa nhánh đã merge; Git từ chối nếu phát hiện commit chưa được gộp.\n- `git branch`: Kiểm tra tên nhánh còn lại và nhánh hiện tại.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Xóa nhánh khi chưa biết đã merge chưa:** Để Git kiểm tra bằng `-d`; không bỏ qua cảnh báo.\n2. **Nghĩ xóa nhánh đã merge sẽ xóa commit khỏi `main`:** Commit đã có trong lịch sử `main`; chỉ nhãn nhánh phụ bị gỡ.\n3. **Nghĩ đổi tên local sẽ tự đổi tên trên GitHub:** Nhánh remote cần được cập nhật riêng.\n\n---\n\n## 🧪 Lab\nYêu cầu: đang ở `main`, có ít nhất một commit và working tree sạch. Nếu tên `temp-feature` đã có, chọn tên khác.\n1. Chạy `git branch temp-feature` để tạo nhánh tại commit hiện tại.\n2. Đổi tên bằng `git branch -m temp-feature feature-profile`, rồi chạy `git branch` để xác nhận.\n3. Chạy `git switch feature-profile`. Tạo tệp `feature-profile.txt`, ghi một dòng, rồi add và commit.\n4. Chạy `git switch main`. Thử `git branch -d feature-profile`; đọc thông báo từ chối vì commit chưa merge.\n5. Chạy `git merge feature-profile` để nhập thay đổi vào `main`.\n6. Chạy `git branch -d feature-profile`, rồi `git branch` để xác nhận nhánh phụ đã được xóa.\n\n---\n\n## 💡 Hint\nNếu `-d` báo nhánh chưa được merge, dừng lại và kiểm tra `git log --oneline`; đừng đổi sang `-D` để ép xóa.\n\n---\n\n## ✅ Validation\n- Tên nhánh được đổi từ `temp-feature` thành `feature-profile`.\n- Lần xóa trước merge bị từ chối và nhánh vẫn còn.\n- Sau merge, lệnh `git branch -d feature-profile` thành công; tệp vẫn có trên `main`.\n\n---\n\n## ❓ Quiz\nTrả lời các câu hỏi để phân biệt đổi tên, xóa an toàn và xóa cưỡng chế.\n\n---\n\n## 🔥 Challenge\nGiải thích vì sao Git ngăn `git branch -d` xóa `feature-profile` trước merge, và điều gì thay đổi sau khi merge.\n\n---\n\n## 📚 Tổng kết\n- `git branch -m` đổi tên nhánh mà không sửa lịch sử commit.\n- `git branch -d` kiểm tra trạng thái merge trước khi xóa.\n- Không ép xóa nhánh nếu chưa xác nhận công việc có thể bỏ.\n",
  "quiz": {
    "id": "quiz-03-13-delete-rename-branch",
    "title": "Trắc nghiệm: Đổi tên và xóa nhánh an toàn",
    "questions": [
      {
        "id": "q1",
        "question": "Bạn đang đứng trên `main` và muốn đổi tên nhánh `temp` thành `feature-cart`. Dùng lệnh nào?",
        "type": "single",
        "options": [
          {
            "text": "git branch -m temp feature-cart",
            "correct": true
          },
          {
            "text": "git branch --delete temp feature-cart",
            "correct": false
          },
          {
            "text": "git switch --rename temp feature-cart",
            "correct": false
          },
          {
            "text": "git merge -m temp feature-cart",
            "correct": false
          }
        ],
        "explanation": "Cú pháp này đổi tên nhánh được chỉ định mà không cần chuyển sang nhánh đó."
      },
      {
        "id": "q2",
        "question": "Khi bạn xóa nhánh đã merge bằng `git branch -d`, điều gì bị gỡ?",
        "type": "single",
        "options": [
          {
            "text": "Tên nhánh và con trỏ phụ; commit đã được nhập vẫn nằm trong nhánh nhận",
            "correct": true
          },
          {
            "text": "Tất cả các tệp có trong commit",
            "correct": false
          },
          {
            "text": "Nhánh `main` cùng repository",
            "correct": false
          },
          {
            "text": "Tài khoản GitHub của tác giả",
            "correct": false
          }
        ],
        "explanation": "Xóa nhánh đã merge gỡ nhãn phụ; nội dung commit vẫn được giữ bởi nhánh nhận."
      },
      {
        "id": "q3",
        "question": "Vì sao `git branch -d feature` có thể từ chối xóa nhánh?",
        "type": "single",
        "options": [
          {
            "text": "Git phát hiện có commit trên nhánh đó chưa được merge vào nơi phù hợp",
            "correct": true
          },
          {
            "text": "Tên nhánh có dấu gạch nối",
            "correct": false
          },
          {
            "text": "Repository có ít hơn mười tệp",
            "correct": false
          },
          {
            "text": "Máy tính không kết nối Internet",
            "correct": false
          }
        ],
        "explanation": "`-d` kiểm tra trạng thái merge để tránh xóa nhầm đường dẫn tới công việc chưa được nhập."
      },
      {
        "id": "q4",
        "question": "Sau khi `git branch -d feature` báo nhánh chưa được merge, bước nào an toàn nhất?",
        "type": "single",
        "options": [
          {
            "text": "Kiểm tra commit và merge hoặc giữ lại nhánh cho tới khi hiểu rõ công việc",
            "correct": true
          },
          {
            "text": "Dùng `-D` ngay để bỏ qua thông báo",
            "correct": false
          },
          {
            "text": "Xóa thư mục `.git`",
            "correct": false
          },
          {
            "text": "Chạy `git init` lần nữa",
            "correct": false
          }
        ],
        "explanation": "Hãy giữ con trỏ nhánh cho tới khi xác định commit chưa merge có cần giữ hay không."
      },
      {
        "id": "q5",
        "question": "Điều gì xảy ra với commit khi đổi tên nhánh bằng `git branch -m`?",
        "type": "single",
        "options": [
          {
            "text": "Commit không thay đổi; chỉ tên con trỏ nhánh đổi",
            "correct": true
          },
          {
            "text": "Toàn bộ commit được viết lại thành commit mới",
            "correct": false
          },
          {
            "text": "Commit được đẩy lên GitHub tự động",
            "correct": false
          },
          {
            "text": "Các commit trên nhánh bị xóa",
            "correct": false
          }
        ],
        "explanation": "Rename thay tên tham chiếu giúp tìm commit; bản thân lịch sử commit không bị sửa."
      },
      {
        "id": "q6",
        "question": "Lệnh nào cho biết nhánh nào còn tồn tại sau thao tác đổi tên hoặc xóa?",
        "type": "single",
        "options": [
          {
            "text": "git branch",
            "correct": true
          },
          {
            "text": "git status --remote",
            "correct": false
          },
          {
            "text": "git show --branches-only",
            "correct": false
          },
          {
            "text": "git list-commits",
            "correct": false
          }
        ],
        "explanation": "`git branch` liệt kê các nhánh local và đánh dấu nhánh hiện tại bằng dấu sao."
      }
    ]
  }
};
export default lesson;
