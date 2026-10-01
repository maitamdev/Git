import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "09-merge-commit",
  "moduleId": "03-branching",
  "metadata": {
    "id": "09-merge-commit",
    "title": "Bản chất của Merge commit",
    "level": "intermediate",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "08-three-way-merge"
    ],
    "objectives": [
      "Hiểu rõ cấu trúc nội tại của một đối tượng Merge Commit trong cơ sở dữ liệu Git.",
      "Giải thích ý nghĩa của thuộc tính đa phụ huynh (multiple parents) trong đồ thị DAG.",
      "So sánh ưu và nhược điểm giữa chiến lược giữ Merge Commit và chiến lược làm phẳng lịch sử (Rebase/Squash).",
      "Sử dụng lệnh `git show` và `git log` để phân tích các commit cha của một merge commit."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "merge commit",
      "hai commit cha",
      "parents",
      "dag node",
      "linear vs non-linear"
    ],
    "commands": [
      "git show <merge-commit-hash>",
      "git log --merges --oneline",
      "git log --no-merges --oneline"
    ]
  },
  "content": "# Bản chất của Merge commit\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ cấu trúc của một Merge Commit có từ hai commit cha trở lên trong Git.\n- Giải thích ý nghĩa của việc lưu giữ mốc gộp nhánh để theo dõi lịch sử làm việc nhóm.\n- Sử dụng các cờ `--merges` và `--no-merges` để lọc nhật ký commit theo nhu cầu.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Merge Commit — commit hợp nhất\n- **Nói dễ hiểu:** Mốc lưu đặc biệt ghi lại thời điểm hai nhánh độc lập được kết nối và gộp lại với nhau.\n- **Ví dụ:** Commit có thông điệp `Merge branch 'feature-pay' into main` với hai commit cha nối vào.\n- **Đừng nhầm:** Commit thông thường chỉ có đúng 1 cha đứng trước; Merge Commit có từ 2 commit cha trở lên.\n\n### Parent Commit — commit cha\n- **Nói dễ hiểu:** Commit đứng ngay phía trước mà commit hiện tại kế thừa trực tiếp toàn bộ dữ liệu.\n- **Ví dụ:** Trong một merge commit, Parent 1 là đỉnh của nhánh đích (`main`), Parent 2 là đỉnh của nhánh tính năng.\n- **Đừng nhầm:** Git không xóa commit cha sau khi gộp; toàn bộ lịch sử của cả hai nhánh vẫn nằm nguyên vẹn.\n\n### --no-merges — lọc bỏ commit gộp\n- **Nói dễ hiểu:** Tùy chọn của `git log` chỉ hiển thị các commit viết code thực tế, bỏ qua các mốc gộp nhánh.\n- **Ví dụ:** Chạy `git log --no-merges --oneline` để duyệt các thay đổi nội dung mà không bị rối mắt.\n- **Đừng nhầm:** Cờ này chỉ ẩn bớt khi xem danh sách; nó không xóa hay thay đổi bất kỳ dữ liệu nào trong kho chứa.\n\n---\n\n## 📖 Định nghĩa\nMerge Commit là một đối tượng commit đặc biệt trong đồ thị Git sở hữu từ hai commit cha trở lên. Trong khi commit thông thường chỉ nối vào một commit duy nhất phía trước, Merge Commit đóng vai trò như chiếc cầu nối hai luồng lịch sử độc lập, đánh dấu thời điểm hai tính năng hòa vào làm một.\n\n---\n\n## 🤔 Tại sao cần?\nKhi dự án có nhiều người cùng phát triển, các nhánh tính năng sẽ rẽ ra và gộp vào liên tục. Nhờ có Merge Commit, bạn có thể kiểm tra lại xem một tính năng lớn đã được đưa vào sản phẩm vào ngày nào, do ai phê duyệt và bao gồm những công việc nhỏ nào bên trong.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung đồ thị lịch sử như hai dòng sông bắt nguồn từ cùng một ngọn núi (tổ tiên chung). Hai dòng sông chảy qua hai thung lũng khác nhau (hai nhánh riêng biệt). Đến vùng đồng bằng, hai dòng sông gặp nhau tại một ngã ba sông (Merge Commit) rồi hòa thành một dòng chảy lớn duy nhất.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCấu trúc đối tượng Merge Commit:\n┌──────────────────────────────────────────────┐\n│ Commit: e4b2a19 (Merge Commit)               │\n│ Parent 1: c3f12a8 (nhánh main)               │\n│ Parent 2: 9a7b4f1 (nhánh feature-payment)    │\n│ Author: Nam Nguyen <nam@example.com>         │\n│ Message: Merge branch 'feature-payment'      │\n└──────────────────────────────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrong dự án web thương mại, nhóm kỹ thuật muốn kiểm tra lại xem chức năng thanh toán qua thẻ ngân hàng được đưa vào mã nguồn khi nào. Trưởng nhóm gõ `git log --merges --oneline` và thấy ngay commit `e4b2a19: Merge branch feature-payment into main`. Nhờ có commit này, nhóm dễ dàng truy ngược lại toàn bộ quá trình phát triển tính năng mà không bị nhầm với các đợt sửa lỗi khác.\n\n---\n\n## 💻 Command\n```bash\ngit show <merge-commit-hash>\ngit log --merges --oneline\ngit log --no-merges --oneline\n```\n\n---\n\n## 🔍 Giải thích command\n- `git show <merge-commit-hash>`: Xem chi tiết một commit hợp nhất, hiển thị rõ dòng mã của hai commit cha.\n- `git log --merges --oneline`: Chỉ lọc và hiển thị danh sách các commit hợp nhất trong lịch sử.\n- `git log --no-merges --oneline`: Lọc bỏ toàn bộ commit gộp, chỉ xem các commit công việc thông thường.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ merge commit nhân đôi tệp tin:** Merge commit chỉ ghi nhận ảnh chụp trạng thái và liên kết tới 2 commit cha, không tốn thêm dung lượng sao chép.\n2. **Lạm dụng merge commit cho thay đổi quá nhỏ:** Những sửa đổi một vài chữ nên dùng Fast-forward để tránh làm rối lịch sử.\n3. **Quên rằng merge commit có hai cha khi hoàn tác:** Khi chạy `git revert` trên một merge commit, Git sẽ yêu cầu chỉ định rõ cờ `-m` để biết luồng nào là luồng chính.\n\n---\n\n## 🧪 Lab\nBài học này là bài tự kiểm tra và quan sát lịch sử trên máy của bạn:\n1. Chạy lệnh `git log --merges --oneline` để tìm các commit gộp đã có trong kho lưu trữ.\n2. Dùng lệnh `git show <mã-commit-gộp>` để quan sát dòng `Merge: <sha1> <sha2>`.\n3. Chạy `git log --no-merges --oneline` và so sánh danh sách commit hiển thị so với khi không dùng cờ.\n\n---\n\n## 💡 Hint\nDòng `Merge: hash1 hash2` trong kết quả của lệnh `git show` chính là hai commit cha của commit hợp nhất đó.\n\n---\n\n## ✅ Validation\n- Nhận biết được dòng thông tin `Merge:` hiển thị hai commit cha khi chạy `git show`.\n- Phân biệt được sự khác nhau giữa kết quả của `git log --merges` và `git log --no-merges`.\n\n---\n\n## ❓ Quiz\nTrả lời các câu hỏi sau để nắm vững bản chất và cấu trúc của Merge Commit trong Git.\n\n---\n\n## 🔥 Challenge\nChạy lệnh `git log --graph --oneline` và quan sát các nét gạch chéo thể hiện nhánh con đi vào nút giao Merge Commit.\n\n---\n\n## 📚 Tổng kết\n- Merge Commit là nút giao đặc biệt trong đồ thị Git có từ hai commit cha trở lên.\n- Giúp bảo lưu mốc lịch sử rõ ràng về thời điểm tích hợp các nhánh tính năng.\n- Sử dụng `--merges` hoặc `--no-merges` để tùy biến góc nhìn khi đọc nhật ký commit.\n",
  "quiz": {
    "id": "quiz-03-09-merge-commit",
    "title": "Trắc nghiệm: Bản chất của Merge commit",
    "questions": [
      {
        "id": "q1",
        "question": "Thuộc tính kỹ thuật cơ bản nào phân biệt một Merge Commit với một commit thông thường trong Git?",
        "type": "single",
        "options": [
          {
            "text": "Nó có từ hai con trỏ commit cha trở lên thay vì chỉ có duy nhất một commit cha",
            "correct": true
          },
          {
            "text": "Nó không có mã băm định danh SHA",
            "correct": false
          },
          {
            "text": "Nó không lưu trữ cây thư mục mã nguồn",
            "correct": false
          },
          {
            "text": "Nó chỉ có thể được tạo bởi tài khoản quản trị viên",
            "correct": false
          }
        ],
        "explanation": "Mỗi commit thông thường chỉ có 1 parent; Merge Commit là nút giao có từ 2 parents trở lên."
      },
      {
        "id": "q2",
        "question": "Lệnh nào sau đây chỉ lọc và hiển thị các commit hợp nhất (Merge Commits) trong lịch sử dự án?",
        "type": "single",
        "options": [
          {
            "text": "git log --merges",
            "correct": true
          },
          {
            "text": "git log --only-combine",
            "correct": false
          },
          {
            "text": "git show --merge-list",
            "correct": false
          },
          {
            "text": "git filter --merge-nodes",
            "correct": false
          }
        ],
        "explanation": "`--merges` là bộ lọc tích hợp sẵn của git log giúp chỉ liệt kê các commit có nhiều hơn 1 cha."
      },
      {
        "id": "q3",
        "question": "Lợi ích lớn nhất của việc lưu giữ các Merge Commit trong lịch sử của một dự án lớn là gì?",
        "type": "single",
        "options": [
          {
            "text": "Bảo lưu nguyên vẹn ngữ cảnh phát triển, ranh giới tính năng và thời điểm tích hợp của nhánh",
            "correct": true
          },
          {
            "text": "Giúp ứng dụng di động chạy mượt mà hơn và ít tốn pin hơn",
            "correct": false
          },
          {
            "text": "Tự động sao lưu mã nguồn sang một ổ đĩa USB phụ",
            "correct": false
          },
          {
            "text": "Tránh việc máy tính bị quá nhiệt khi làm việc ban đêm",
            "correct": false
          }
        ],
        "explanation": "Merge Commit lưu vết ranh giới và thời điểm một luồng tính năng hoàn chỉnh được kết nạp vào sản phẩm."
      },
      {
        "id": "q4",
        "question": "Khi bạn chạy lệnh `git show` trên một merge commit, dòng thông tin nào cho bạn biết mã hash của các commit cha?",
        "type": "single",
        "options": [
          {
            "text": "Dòng chữ `Merge: <hash1> <hash2>` nằm ngay dưới dòng commit hash",
            "correct": true
          },
          {
            "text": "Dòng chữ `Parents are secret`",
            "correct": false
          },
          {
            "text": "Dòng chữ `Author: Unknown`",
            "correct": false
          },
          {
            "text": "Dòng chữ `Error: Multiple parents`",
            "correct": false
          }
        ],
        "explanation": "Git in dòng `Merge: <sha1> <sha2>` biểu thị trực tiếp hai commit cha của commit này."
      },
      {
        "id": "q5",
        "question": "Lệnh nào sau đây loại bỏ toàn bộ các commit hợp nhất, chỉ hiển thị commit công việc thông thường?",
        "type": "single",
        "options": [
          {
            "text": "git log --no-merges",
            "correct": true
          },
          {
            "text": "git log --without-parents",
            "correct": false
          },
          {
            "text": "git log --simple-only",
            "correct": false
          },
          {
            "text": "git log --hide-branches",
            "correct": false
          }
        ],
        "explanation": "`--no-merges` lọc bỏ các commit hợp nhất, giúp người đọc theo dõi các commit nội dung thuần túy."
      },
      {
        "id": "q6",
        "question": "Khi bạn hoàn tác (revert) một merge commit bằng git revert, vì sao Git yêu cầu phải truyền cờ -m (mainline)?",
        "type": "single",
        "options": [
          {
            "text": "Vì merge commit có nhiều hơn một cha nên Git cần biết nhánh nào được coi là luồng chính để hoàn tác",
            "correct": true
          },
          {
            "text": "Vì merge commit bị khóa mật khẩu bảo mật",
            "correct": false
          },
          {
            "text": "Vì Git không cho phép hoàn tác bất kỳ commit nào nếu không có cờ -m",
            "correct": false
          },
          {
            "text": "Vì cờ -m dùng để ghi âm giọng nói của lập trình viên",
            "correct": false
          }
        ],
        "explanation": "Cờ `-m 1` hoặc `-m 2` chỉ định commit cha nào được giữ làm nhánh chính khi hoàn tác thay đổi của nhánh kia."
      }
    ]
  }
};
export default lesson;
