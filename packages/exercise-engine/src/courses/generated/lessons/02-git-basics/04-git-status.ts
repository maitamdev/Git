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
      "git status -s"
    ]
  },
  "content": "# Kiểm tra trạng thái với git status\r\n\r\n---\r\n\r\n## 🎯 Mục tiêu\r\n- Chạy `git status` để biết tệp nào mới, đã sửa hoặc đã staged.\r\n- Phân biệt ba nhóm: staged, chưa staged và untracked.\r\n- Đọc hai cột trạng thái cơ bản trong `git status -s`.\r\n\r\n---\r\n\r\n## 🧩 Từ khóa hôm nay\r\n\r\n### `git status` — xem tình trạng tệp\r\n- **Nói dễ hiểu:** Lệnh cho biết tệp nào mới, đã sửa hoặc đã chọn để commit.\r\n- **Ví dụ:** Chạy `git status` sau khi tạo `note.txt`.\r\n- **Đừng nhầm:** Lệnh chỉ báo trạng thái, không tự sửa tệp.\r\n\r\n### Untracked — chưa được theo dõi\r\n- **Nói dễ hiểu:** Tệp mới mà Git chưa được yêu cầu đưa vào lịch sử.\r\n- **Ví dụ:** `note.txt` mới thường hiện ở mục “Untracked files”.\r\n- **Đừng nhầm:** Untracked không có nghĩa Git đã xóa tệp.\r\n\r\n### Staged — đã chuẩn bị cho commit\r\n- **Nói dễ hiểu:** Thay đổi đã được chọn vào mốc commit kế tiếp.\r\n- **Ví dụ:** `git status` liệt kê tệp dưới “Changes to be committed”.\r\n- **Đừng nhầm:** Staged không có nghĩa commit đã được tạo.\r\n\r\n### Unstaged — chưa chuẩn bị cho commit\r\n- **Nói dễ hiểu:** Tệp đã sửa nhưng thay đổi mới chưa được chọn vào commit.\r\n- **Ví dụ:** Sửa tệp sau khi đã chạy `git add`.\r\n- **Đừng nhầm:** Tệp vẫn nằm trên máy; thay đổi này chỉ chưa staged.\r\n\r\n---\r\n\r\n## 📖 Định nghĩa\r\n`git status` là lệnh báo cáo tình trạng hiện tại của kho Git. Hãy đọc tên nhóm thay đổi; màu chữ có thể khác nhau theo terminal.\r\n\r\n---\r\n\r\n## 🤔 Tại sao cần?\r\nChạy `git status` trước khi commit giúp bạn biết chính xác thay đổi nào sẽ được lưu, thay đổi nào còn ở ngoài. Đây là cách đơn giản để phát hiện tệp chưa được chọn hoặc đang sửa dở.\r\n\r\n---\r\n\r\n## 🧠 Mental Model (Mô hình tư duy)\r\nHãy xem `git status` như bảng kiểm: phần nào đã chọn cho commit, phần nào còn sửa, và tệp nào Git chưa theo dõi.\r\n\r\n---\r\n\r\n## 🖼 Sơ đồ\r\n```text\r\nVí dụ: repository mới, chưa có commit đầu tiên:\r\n┌─────────────────────────────────────────────────────────────┐\r\n│ On branch main                                              │\r\n│ No commits yet                                              │\r\n│ Changes to be committed:          <── Đã staged             │\r\n│         new file:   index.html                              │\r\n│                                                             │\r\n│ Untracked files:                  <── Chưa được theo dõi    │\r\n│         notes.txt                                           │\r\n└─────────────────────────────────────────────────────────────┘\r\n```\r\n\r\n---\r\n\r\n`Changes not staged for commit` xuất hiện khi bạn sửa một tệp Git đã theo dõi, thường là sau khi đã có commit. Repository mới chưa có commit nên ví dụ này chưa có tệp `modified`.\r\n\r\n## 🌎 Ví dụ thực tế\r\nBạn tạo `index.html` và `notes.txt`, rồi chỉ stage `index.html`. `git status` cho thấy tệp đầu đã staged còn tệp kia vẫn untracked.\r\n\r\n---\r\n\r\n## 💻 Command\r\n```bash\r\ngit status\r\ngit status -s\r\n```\r\n\r\n---\r\n\r\n## 🔍 Giải thích command\r\n- `git status`: Hiển thị báo cáo trạng thái chi tiết. Một số gợi ý thao tác phụ thuộc vào trạng thái hiện tại của repository.\r\n- `git status -s` (hoặc `--short`): Hiển thị trạng thái gọn; cột trái nói về Staging Area, cột phải nói về Working Tree.\r\n\r\n---\r\n\r\n## ⚠️ Sai lầm phổ biến\r\n1. **Không kiểm tra trạng thái trước khi commit**:  Có thể bỏ sót hoặc đưa nhầm tệp vào commit.\r\n2. **Bỏ qua tệp Untracked**:  Tệp mới chưa được Git theo dõi và chưa nằm trong commit.\r\n3. **Hiểu sai định dạng git status -s**:  Nhầm lẫn giữa cột ký tự bên trái (Staging Area) và cột bên phải (Working Tree).\r\n\r\n---\r\n\r\n## 🧪 Lab\r\n1. Chạy `git status` để xem trạng thái ban đầu.\r\n2. Tạo `index.html` và `notes.txt`.\r\n3. Chạy `git add index.html`, rồi kiểm tra bằng `git status`.\r\n4. Chạy `git status -s`; nhận ra `A  index.html` (tệp mới đã staged) và `?? notes.txt` (chưa được theo dõi).\r\n\r\n---\r\n\r\n## 💡 Hint\r\n> Hãy tạo phản xạ gõ `git status` trước bất kỳ lệnh add, commit hay chuyển nhánh nào.\r\n\r\n---\r\n\r\n## ✅ Validation\r\n- Thực thi thành công `git status` và nhận diện đúng các khu vực trạng thái.\r\n\r\n---\r\n\r\n## ❓ Quiz\r\nLàm bài trắc nghiệm dưới đây để kiểm tra khả năng đọc hiểu lệnh git status.\r\n\r\n---\r\n\r\n## 🔥 Challenge\r\nTạo hai tệp mới. Chỉ chạy `git add` cho một tệp, rồi dùng `git status -s` để giải thích sự khác nhau giữa `A ` và `??`.\r\n\r\n---\r\n\r\n## 📚 Tổng kết\r\n- `git status` báo cáo những thay đổi staged, chưa staged và untracked.\r\n- Màu sắc chỉ để trang trí; đọc tên nhóm hoặc ký hiệu trạng thái.\r\n- Dùng lệnh này trước commit để biết mình sắp lưu những gì.\r\n",
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
