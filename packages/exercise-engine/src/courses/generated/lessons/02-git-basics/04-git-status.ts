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
      "Đọc và phân tích thành thạo toàn bộ các phần thông tin hiển thị bởi lệnh `git status`.",
      "Phân biệt rõ ràng giữa Changes to be committed, Changes not staged for commit, và Untracked files.",
      "Sử dụng định dạng ngắn gọn `git status -s` để quan sát trạng thái nhanh chóng."
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
      "short format",
      "porcelain"
    ],
    "commands": [
      "git status",
      "git status -s",
      "git status --short"
    ]
  },
  "content": "# Kiểm tra trạng thái với git status\n\n---\n\n## 🎯 Mục tiêu\n- Đọc và phân tích thành thạo toàn bộ các phần thông tin hiển thị bởi lệnh `git status`.\n- Phân biệt rõ ràng giữa Changes to be committed, Changes not staged for commit, và Untracked files.\n- Sử dụng định dạng ngắn gọn `git status -s` để quan sát trạng thái nhanh chóng.\n\n---\n\n## 📖 Định nghĩa\n> `git status` là câu lệnh được sử dụng với tần suất cao nhất trong Git, có nhiệm vụ hiển thị bức tranh toàn cảnh về sự khác biệt giữa ba khu vực: Working Tree, Staging Area và con trỏ HEAD của Repository. Lệnh này phân loại rõ ràng các tệp tin theo từng nhóm trạng thái màu sắc trực quan: tệp đã được đưa vào Staging Area sẵn sàng commit, tệp đã theo dõi nhưng bị chỉnh sửa mà chưa stage, và các tệp mới hoàn toàn chưa từng được Git quản lý.\n\n---\n\n## 🤔 Tại sao cần?\nViệc chạy `git status` trước và sau mỗi thao tác Git là thói quen sống còn của mọi kỹ sư phần mềm chuyên nghiệp. Nó giúp bạn tránh được những tai nạn ngớ ngẩn như commit nhầm file rác, quên chưa stage các thay đổi quan trọng, hoặc vô tình đang đứng sai nhánh mà không hay biết. Có thể nói, `git status` giống như bảng đồng hồ tốc độ và cảm biến an toàn trên chiếc xe ô tô mà bạn lái mỗi ngày.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung `git status` giống như một người bác sĩ chụp X-quang toàn thân cho dự án phần mềm của bạn. Mỗi khi bạn bước vào phòng khám (mở terminal), người bác sĩ sẽ quét một lượt từ đầu đến chân và đưa ra một bản chẩn đoán rõ ràng: bộ phận nào đang khỏe mạnh ổn định (Unmodified), bộ phận nào đang có biểu hiện viêm nhiễm cần xử lý (Modified), và có dị vật nào mới xuất hiện trong cơ thể hay không (Untracked).\n\n---\n\n## 🖼 Sơ đồ\n```text\nBản chẩn đoán trạng thái git status:\n┌─────────────────────────────────────────────────────────────┐\n│ On branch main                                              │\n│                                                             │\n│ Changes to be committed:          <── (Màu xanh lá - Staged)│\n│   (use \"git restore --staged <file>\" to unstage)            │\n│         new file:   index.html                              │\n│                                                             │\n│ Changes not staged for commit:    <── (Màu đỏ - Modified)   │\n│   (use \"git add <file>\" to update what will be committed)   │\n│         modified:   styles.css                              │\n│                                                             │\n│ Untracked files:                  <── (Màu đỏ - Untracked)  │\n│         notes.txt                                           │\n└─────────────────────────────────────────────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột kỹ sư mở máy tính vào sáng thứ Hai sau kỳ nghỉ cuối tuần. Không nhớ rõ thứ Sáu tuần trước mình đã làm dở những gì, kỹ sư mở terminal tại dự án và gõ ngay lệnh git status. Màn hình thông báo nhánh hiện tại là feature-login, có hai tệp auth.js và login.html đã nằm trong Staging Area, cùng một tệp test.log đang ở mục Untracked. Nhờ thông tin rõ ràng đó, kỹ sư lập tức nắm bắt lại ngữ cảnh làm việc và tiếp tục công việc một cách tự tin, đồng thời chủ động loại bỏ tệp log rác trước khi tiến hành đóng gói commit hoàn thiện.\n\n---\n\n## 💻 Command\n```bash\ngit status\ngit status -s\ngit status --short\n```\n\n---\n\n## 🔍 Giải thích command\n- `git status`: Hiển thị báo cáo trạng thái chi tiết kèm theo các chỉ dẫn và câu lệnh gợi ý hoàn tác hữu ích.\n- `git status -s` (hoặc `--short`): Hiển thị trạng thái dưới định dạng hai ký tự ngắn gọn gọn gàng và dễ nhìn hơn.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Gõ lệnh mù quáng mà không kiểm tra git status trước**:  Dẫn đến việc add hoặc commit nhầm các file không mong muốn.\n2. **Bỏ qua thông báo tệp Untracked**:  Tưởng rằng code đã được lưu an toàn nhưng thực tế file mới tạo chưa hề được đưa vào Git.\n3. **Hiểu sai định dạng git status -s**:  Nhầm lẫn giữa cột ký tự bên trái (Staging Area) và cột bên phải (Working Tree).\n\n---\n\n## 🧪 Lab\n1. Chạy lệnh `git status` trong kho lưu trữ để làm quen với giao diện kết quả mặc định.\n2. Tạo một tệp mới và chạy `git status` để quan sát nhóm Untracked files.\n3. Thử nghiệm cờ rút gọn bằng câu lệnh `git status -s`.\n\n---\n\n## 💡 Hint\n> Hãy tạo phản xạ gõ `git status` trước bất kỳ lệnh add, commit hay chuyển nhánh nào.\n\n---\n\n## ✅ Validation\n- Thực thi thành công `git status` và nhận diện đúng các khu vực trạng thái.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để kiểm tra khả năng đọc hiểu lệnh git status.\n\n---\n\n## 🔥 Challenge\nGiải thích ý nghĩa của hai ký tự `M ` (M ở cột 1) và ` M` (M ở cột 2) trong `git status -s`.\n\n---\n\n## 📚 Tổng kết\n- `git status` là công cụ chẩn đoán quan trọng nhất để xem tình trạng 3 khu vực của Git.\n- Phân tách rõ ràng: Changes to be committed (xanh), Not staged (đỏ), và Untracked (đỏ).\n- Nên sử dụng thường xuyên để kiểm soát tuyệt đối các tệp tin trước khi đóng gói commit.\n",
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
        "explanation": "Kiểm tra trạng thái liên tục giúp bạn kiểm soát tuyệt đối mã nguồn trước khi ghi lại vào lịch sử."
      }
    ]
  }
};
export default lesson;
