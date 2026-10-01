import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "04-git-architecture",
  "moduleId": "01-foundations",
  "metadata": {
    "id": "04-git-architecture",
    "title": "Git hoạt động như thế nào?",
    "level": "beginner",
    "duration": 25,
    "xp": 70,
    "prerequisites": [
      "03-git-la-gi"
    ],
    "objectives": [
      "Giải thích được một commit ghi lại trạng thái dự án tại một thời điểm.",
      "Dùng từ Snapshot để hình dung trạng thái đã lưu và Diff để xem phần thay đổi.",
      "Dùng `git log --oneline` để xem các commit đã tạo."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "kien truc git",
      "snapshot",
      "delta",
      "dag",
      "blob",
      "tree",
      "commit"
    ],
    "commands": [
      "git status",
      "git log --oneline"
    ]
  },
  "content": "# Git hoạt động như thế nào?\n\n---\n\n## 🎯 Mục tiêu\n- Giải thích được Git lưu các mốc dự án theo cách nào ở mức khái niệm.\n- Phân biệt “một mốc đã lưu” với “danh sách khác biệt giữa hai mốc”.\n- Nhận ra tên như Blob, Tree và Commit sẽ được học sâu hơn sau này.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Snapshot — ảnh chụp trạng thái\n- **Nói dễ hiểu:** Cách hình dung một mốc lưu như trạng thái của dự án tại thời điểm bạn tạo commit.\n- **Ví dụ:** Sau khi trang giới thiệu chạy đúng, bạn lưu một mốc để có thể xem lại phiên bản đó.\n- **Đừng nhầm:** Đây là cách hiểu khái niệm; Git không tạo một bản sao nguyên vẹn riêng cho mọi tệp không đổi.\n\n### Diff — phần khác nhau\n- **Nói dễ hiểu:** Bản so sánh cho biết những dòng hoặc tệp đã đổi giữa hai trạng thái.\n- **Ví dụ:** Diff có thể chỉ ra nút “Gửi” được đổi thành “Đăng ký”.\n- **Đừng nhầm:** Diff là thứ Git trình bày để bạn xem thay đổi; nó không phải cách duy nhất để hiểu Git lưu lịch sử.\n\n### Commit — mốc đã lưu\n- **Nói dễ hiểu:** Bản ghi trong lịch sử Git đại diện cho trạng thái dự án mà bạn chọn lưu.\n- **Ví dụ:** “Thêm trang giới thiệu” là lời nhắn của một commit.\n- **Đừng nhầm:** Sửa tệp chưa tự tạo commit; bạn cần thực hiện thao tác lưu mốc.\n\n---\n\n## 📖 Định nghĩa\nỞ mức dễ hình dung, mỗi commit cho biết dự án ở trạng thái nào tại một mốc. Khi cần, Git cũng cho xem phần khác nhau giữa hai mốc. Các chi tiết về cách những mốc này nối với nhau và Git lưu dữ liệu bên trong sẽ được học ở Level 8.\n\n---\n\n## 🤔 Tại sao cần?\nKhi sửa một tệp, bạn thường muốn biết chính xác điều gì đã đổi. Git giúp lưu các mốc dự án và so sánh chúng. Hôm nay chỉ cần nắm hai ý: Snapshot là trạng thái đã lưu; Diff cho thấy phần khác nhau.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy tưởng tượng bạn chụp lại bàn học ở hai thời điểm: trước và sau khi sắp xếp. Mỗi ảnh là một Snapshot. Đặt hai ảnh cạnh nhau để tìm điểm khác nhau chính là Diff.\n\n---\n\n## 🖼 Sơ đồ\n```text\nTệp trước khi sửa:   \"Xin chào\"\nTệp sau khi sửa:    \"Xin chào Git\"\nDiff:               thêm chữ \"Git\"\nSnapshot:           trạng thái dự án được ghi thành một mốc\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn sửa một dòng trong `README.md`. Khi tạo commit, Git ghi lại trạng thái dự án ở mốc đó. Nếu muốn biết dòng nào vừa sửa, bạn xem Diff giữa bản đang làm và mốc đã lưu. Git tối ưu cách giữ dữ liệu bên trong; người mới chưa cần học chi tiết đó.\n\n---\n\n## 💻 Command\n```bash\ngit status\ngit log --oneline\n```\n\n---\n\n## 🔍 Giải thích command\n- `git status`: Cho biết tệp nào mới hoặc đã sửa trong thư mục dự án.\n- `git log --oneline`: Liệt kê các mốc commit đã lưu, mỗi mốc gói gọn trên một dòng.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nhầm Snapshot với Diff**: Snapshot là trạng thái đã lưu; Diff là phần dùng để so sánh.\n2. **Tưởng sửa tệp là đã tạo commit**: Bạn cần chủ động tạo commit ở bước học sau.\n3. **Cố học cấu trúc bên trong ngay bây giờ**: Blob, Tree và cách Git nối lịch sử sẽ được học ở Level 8.\n\n---\n\n## 🧪 Lab\n1. Chạy `git status` và ghi lại tên tệp đang được báo là đã sửa.\n2. Chạy `git log --oneline` để xem các mốc đã lưu.\n3. Nói thành một câu sự khác nhau giữa Snapshot và Diff.\n\n---\n\n## 💡 Hint\n> Snapshot là trạng thái đã lưu; Diff là phần khác nhau giữa hai trạng thái.\n\n---\n\n## ✅ Validation\n- Giải thích được Snapshot và Diff bằng ví dụ về một tệp đã sửa.\n\n---\n\n## ❓ Quiz\nHoàn thành các câu hỏi dưới đây để kiểm tra kiến thức về kiến trúc Snapshot của Git.\n\n---\n\n## 🔥 Challenge\nSửa một câu trong README, sau đó mô tả đâu là nội dung mới và mốc nào vẫn chưa được lưu.\n\n---\n\n## 📚 Tổng kết\n- Commit ghi lại trạng thái dự án ở một mốc.\n- Diff giúp xem phần khác nhau giữa hai trạng thái.\n- Cấu trúc bên trong của Git sẽ học ở Level 8.\n",
  "quiz": {
    "id": "quiz-04-git-architecture",
    "title": "Trắc nghiệm: Kiến trúc lưu trữ của Git",
    "questions": [
      {
        "id": "q1",
        "question": "Git lưu trữ dữ liệu của các mốc lịch sử theo mô hình nào dưới đây?",
        "type": "single",
        "options": [
          {
            "text": "Các ảnh chụp tức thời hoàn chỉnh (Snapshots)",
            "correct": true
          },
          {
            "text": "Danh sách các dòng code thay đổi khác biệt (Deltas)",
            "correct": false
          },
          {
            "text": "Các tệp tin nén zip chứa toàn bộ hệ điều hành",
            "correct": false
          },
          {
            "text": "Bảng dữ liệu quan hệ SQL theo từng cột dòng",
            "correct": false
          }
        ],
        "explanation": "Git coi dữ liệu như một chuỗi các snapshot của hệ thống tệp tin tại từng thời điểm commit."
      },
      {
        "id": "q2",
        "question": "Diff giúp bạn làm việc gì?",
        "type": "single",
        "options": [
          {
            "text": "Xem phần khác nhau giữa hai trạng thái dự án",
            "correct": true
          },
          {
            "text": "Tự động tạo một commit mới",
            "correct": false
          },
          {
            "text": "Đổi tên nhánh hiện tại",
            "correct": false
          },
          {
            "text": "Cài Git vào máy tính",
            "correct": false
          }
        ],
        "explanation": "Diff giúp đọc phần thay đổi giữa hai trạng thái; bản thân nó không lưu commit."
      },
      {
        "id": "q3",
        "question": "Bạn sửa README nhưng chưa chạy lệnh tạo commit. Việc gì đã xảy ra?",
        "type": "single",
        "options": [
          {
            "text": "Nội dung tệp đã đổi, nhưng chưa có mốc mới trong lịch sử",
            "correct": true
          },
          {
            "text": "Git tự tạo commit ngay khi lưu tệp",
            "correct": false
          },
          {
            "text": "Git đã gửi README lên GitHub",
            "correct": false
          },
          {
            "text": "README bị xóa khỏi máy",
            "correct": false
          }
        ],
        "explanation": "Sửa tệp chỉ đổi nội dung trong dự án; bạn phải tạo commit riêng để lưu mốc."
      },
      {
        "id": "q4",
        "question": "Lệnh `git log --oneline` giúp bạn xem điều gì?",
        "type": "single",
        "options": [
          {
            "text": "Danh sách commit dưới dạng ngắn gọn",
            "correct": true
          },
          {
            "text": "Nội dung mọi tệp đang sửa",
            "correct": false
          },
          {
            "text": "Các ứng dụng đã cài trên máy",
            "correct": false
          },
          {
            "text": "Tên người dùng GitHub của bạn",
            "correct": false
          }
        ],
        "explanation": "Lệnh này hiển thị các mốc commit đã có; nó không tự tạo mốc mới."
      }
    ]
  }
};
export default lesson;
