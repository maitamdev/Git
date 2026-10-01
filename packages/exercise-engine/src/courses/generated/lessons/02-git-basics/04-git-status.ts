import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "04-git-status",
  "moduleId": "02-git-basics",
  "metadata": {
    "id": "04-git-status",
    "title": "Kiểm tra trạng thái với git status",
    "level": "beginner",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "03-head-snapshot"
    ],
    "objectives": [
      "Chạy git status để biết tệp mới, đã sửa hoặc đã staged.",
      "Phân biệt nhóm staged, chưa staged và untracked.",
      "Đọc hai cột trạng thái cơ bản trong git status -s."
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
      "git status",
      "trang thai",
      "kiem tra",
      "short format"
    ],
    "commands": [
      "git status",
      "git status -s",
      "git status --short"
    ]
  },
  "content": "# Kiểm tra trạng thái với git status\n\n---\n\n## 🎯 Mục tiêu\n- Chạy `git status` để biết tệp nào mới, đã sửa hoặc đã staged.\n- Phân biệt ba nhóm: staged, chưa staged và untracked.\n- Đọc hai cột trạng thái cơ bản trong `git status -s`.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### `git status` — xem tình trạng tệp\n- **Nói dễ hiểu:** Lệnh cho biết tệp nào mới, đã sửa hoặc đã chọn để commit.\n- **Ví dụ:** Chạy `git status` sau khi tạo `note.txt`.\n- **Đừng nhầm:** Lệnh chỉ báo trạng thái, không tự sửa tệp.\n\n### Untracked — chưa được theo dõi\n- **Nói dễ hiểu:** Tệp mới mà Git chưa được yêu cầu đưa vào lịch sử.\n- **Ví dụ:** `note.txt` mới thường hiện ở mục “Untracked files”.\n- **Đừng nhầm:** Untracked không có nghĩa Git đã xóa tệp.\n\n### Staged — đã chuẩn bị cho commit\n- **Nói dễ hiểu:** Thay đổi đã được chọn vào mốc commit kế tiếp.\n- **Ví dụ:** `git status` liệt kê tệp dưới “Changes to be committed”.\n- **Đừng nhầm:** Staged không có nghĩa commit đã được tạo.\n\n### Unstaged — chưa chuẩn bị cho commit\n- **Nói dễ hiểu:** Tệp đã sửa nhưng thay đổi mới chưa được chọn vào commit.\n- **Ví dụ:** Sửa tệp sau khi đã chạy `git add`.\n- **Đừng nhầm:** Tệp vẫn nằm trên máy; thay đổi này chỉ chưa staged.\n\n---\n\n## 📖 Định nghĩa\n`git status` là lệnh báo cáo tình trạng hiện tại của kho Git. Hãy đọc tên nhóm thay đổi; màu chữ có thể khác nhau theo terminal.\n\n---\n\n## 🤔 Tại sao cần?\nChạy `git status` trước khi commit giúp bạn biết chính xác thay đổi nào sẽ được lưu, thay đổi nào còn ở ngoài. Đây là cách đơn giản để phát hiện tệp chưa được chọn hoặc đang sửa dở.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy xem `git status` như bảng kiểm: phần nào đã chọn cho commit, phần nào còn sửa, và tệp nào Git chưa theo dõi.\n\n---\n\n## 🖼 Sơ đồ\n```text\nVí dụ báo cáo từ git status:\n┌─────────────────────────────────────────────────────────────┐\n│ On branch main                                              │\n│                                                             │\n│ Changes to be committed:          <── Đã staged             │\n│   (use \"git restore --staged <file>\" to unstage)            │\n│         new file:   index.html                              │\n│                                                             │\n│ Changes not staged for commit:    <── Chưa staged           │\n│   (use \"git add <file>\" to update what will be committed)   │\n│         modified:   styles.css                              │\n│                                                             │\n│ Untracked files:                  <── Chưa được theo dõi    │\n│         notes.txt                                           │\n└─────────────────────────────────────────────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn tạo `notes.txt` rồi sửa `styles.css`. Chạy `git status` để xem `notes.txt` trong nhóm Untracked và `styles.css` trong nhóm chưa staged.\n\n---\n\n## 💻 Command\n```bash\ngit status\ngit status -s\ngit status --short\n```\n\n---\n\n## 🔍 Giải thích command\n- `git status`: Hiển thị báo cáo trạng thái chi tiết kèm theo các chỉ dẫn và câu lệnh gợi ý hoàn tác hữu ích.\n- `git status -s` (hoặc `--short`): Hiển thị trạng thái gọn; cột trái nói về Staging Area, cột phải nói về Working Tree.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Không kiểm tra trạng thái trước khi commit**:  Có thể bỏ sót hoặc đưa nhầm tệp vào commit.\n2. **Bỏ qua tệp Untracked**:  Tệp mới chưa được Git theo dõi và chưa nằm trong commit.\n3. **Hiểu sai định dạng git status -s**:  Nhầm lẫn giữa cột ký tự bên trái (Staging Area) và cột bên phải (Working Tree).\n\n---\n\n## 🧪 Lab\n1. Chạy lệnh `git status` trong kho lưu trữ để làm quen với giao diện kết quả mặc định.\n2. Tạo một tệp mới và chạy `git status` để quan sát nhóm Untracked files.\n3. Thử nghiệm cờ rút gọn bằng câu lệnh `git status -s`.\n\n---\n\n## 💡 Hint\n> Hãy tạo phản xạ gõ `git status` trước bất kỳ lệnh add, commit hay chuyển nhánh nào.\n\n---\n\n## ✅ Validation\n- Thực thi thành công `git status` và nhận diện đúng các khu vực trạng thái.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để kiểm tra khả năng đọc hiểu lệnh git status.\n\n---\n\n## 🔥 Challenge\nTạo một tệp mới, chạy `git status -s`, rồi giải thích vì sao tệp hiện ký hiệu `??`.\n\n---\n\n## 📚 Tổng kết\n- `git status` báo cáo những thay đổi staged, chưa staged và untracked.\n- Màu sắc chỉ để trang trí; đọc tên nhóm hoặc ký hiệu trạng thái.\n- Dùng lệnh này trước commit để biết mình sắp lưu những gì.\n",
  "quiz": {
    "id": "quiz-02-04-git-status",
    "title": "Trắc nghiệm: Kiểm tra trạng thái với git status",
    "questions": [
      {
        "id": "q1",
        "question": "Mục \"Changes to be committed\" trong kết quả lệnh git status cho biết điều gì?",
        "type": "single",
        "options": [
          {
            "text": "Danh sách các thay đổi đã nằm trong Staging Area và sẽ được đưa vào commit kế tiếp",
            "correct": true
          },
          {
            "text": "Các commit đã được đẩy thành công lên máy chủ GitHub",
            "correct": false
          },
          {
            "text": "Các tệp tin bị lỗi chính tả cần sửa lại ngay",
            "correct": false
          },
          {
            "text": "Các tệp tin bị xóa vĩnh viễn khỏi ổ đĩa máy tính",
            "correct": false
          }
        ],
        "explanation": "`Changes to be committed` đại diện cho các thay đổi đã được staged bằng lệnh git add và sẵn sàng commit."
      },
      {
        "id": "q2",
        "question": "Trong định dạng ngắn gọn `git status -s`, ký hiệu `??` biểu thị trạng thái nào?",
        "type": "single",
        "options": [
          {
            "text": "Tệp tin Untracked (chưa từng được Git theo dõi trong lịch sử)",
            "correct": true
          },
          {
            "text": "Tệp tin bị xung đột merge nghiêm trọng không thể sửa",
            "correct": false
          },
          {
            "text": "Git đang bị mất kết nối mạng Internet",
            "correct": false
          },
          {
            "text": "Tệp tin có virus bị hệ điều hành cách ly",
            "correct": false
          }
        ],
        "explanation": "Ký hiệu `??` là quy ước quốc tế trong định dạng short của git status để chỉ các tệp Untracked."
      },
      {
        "id": "q3",
        "question": "Mục \"Changes not staged for commit\" có ý nghĩa gì?",
        "type": "single",
        "options": [
          {
            "text": "Các tệp tin đã được Git theo dõi từ trước, hiện đang có sửa đổi mới trong Working Tree nhưng chưa chạy git add",
            "correct": true
          },
          {
            "text": "Các tệp tin bị hỏng dữ liệu không thể mở được bằng VS Code",
            "correct": false
          },
          {
            "text": "Các tệp tin đã được đưa vào Staging Area thành công",
            "correct": false
          },
          {
            "text": "Các commit cũ đã được xóa bỏ khỏi kho chứa",
            "correct": false
          }
        ],
        "explanation": "Đây là những thay đổi trên tệp Tracked đang nằm ở Working Directory mà bạn chưa đưa vào Staging Area."
      },
      {
        "id": "q4",
        "question": "Lợi ích lớn nhất của việc chạy git status thường xuyên là gì?",
        "type": "single",
        "options": [
          {
            "text": "Giúp lập trình viên nắm rõ ngữ cảnh, tránh commit nhầm file rác và phát hiện tệp chưa được lưu vết",
            "correct": true
          },
          {
            "text": "Tự động tăng tốc độ xử lý của card màn hình máy tính",
            "correct": false
          },
          {
            "text": "Tự động viết mã nguồn hoàn chỉnh cho tính năng",
            "correct": false
          },
          {
            "text": "Thay thế hoàn toàn sự cần thiết của việc viết kiểm thử",
            "correct": false
          }
        ],
        "explanation": "Kiểm tra trạng thái cho biết những gì đang chờ commit để bạn rà lại trước khi lưu."
      },
      {
        "id": "q5",
        "question": "Trong `git status -s`, hai cột trạng thái lần lượt nói về khu vực nào?",
        "type": "single",
        "options": [
          {
            "text": "Cột trái là Staging Area; cột phải là Working Tree",
            "correct": true
          },
          {
            "text": "Cột trái là GitHub; cột phải là máy tính cá nhân",
            "correct": false
          },
          {
            "text": "Cột trái là tên nhánh; cột phải là tên người commit",
            "correct": false
          },
          {
            "text": "Cả hai cột đều là màu hiển thị, không mang ý nghĩa",
            "correct": false
          }
        ],
        "explanation": "Ký tự bên trái biểu thị trạng thái trong Index; ký tự bên phải biểu thị thay đổi trong Working Tree."
      }
    ]
  }
};
export default lesson;
