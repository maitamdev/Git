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
  "content": "# Bản chất của Merge commit\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ cấu trúc nội tại của một đối tượng Merge Commit trong cơ sở dữ liệu Git.\n- Giải thích ý nghĩa của thuộc tính đa phụ huynh (multiple parents) trong đồ thị DAG.\n- So sánh ưu và nhược điểm giữa chiến lược giữ Merge Commit và chiến lược làm phẳng lịch sử (Rebase/Squash).\n- Sử dụng lệnh `git show` và `git log` để phân tích các commit cha của một merge commit.\n\n---\n\n## 📖 Định nghĩa\n> Merge Commit là một đối tượng commit đặc biệt trong đồ thị có hướng không chu trình (DAG) của Git, sở hữu từ hai con trỏ commit cha trở lên (Parent 1 trỏ về đỉnh nhánh đích, Parent 2 trỏ về đỉnh nhánh nguồn được gộp). Trong khi các commit thông thường chỉ ghi nhận một commit cha duy nhất đứng trước nó, Merge Commit đóng vai trò như một cây cầu nối hợp nhất hai nhánh lịch sử độc lập lại với nhau, ghi nhận thời điểm và bối cảnh hai luồng công việc gặp nhau.\n\n---\n\n## 🤔 Tại sao cần?\nHiểu rõ bản chất của Merge Commit giúp bạn không còn bỡ ngỡ khi đọc các đồ thị nhánh phức tạp của các tập đoàn công nghệ lớn. Bạn sẽ hiểu được tại sao lệnh `git revert` trên một merge commit lại đòi hỏi phải truyền thêm cờ `-m` để chỉ định commit cha, cũng như biết cách đưa ra quyết định kiến trúc: khi nào nên giữ lại merge commit để bảo lưu dấu vết làm việc nhóm, và khi nào nên rebase làm phẳng lịch sử để nhật ký dự án tinh gọn.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung đồ thị lịch sử như hai dòng sông nhỏ bắt nguồn từ một ngọn núi cao (commit tổ tiên chung). Hai dòng sông chảy uốn lượn qua hai thung lũng khác nhau (hai nhánh độc lập). Đến một vùng đồng bằng trù phú, hai dòng sông hòa vào nhau tại một ngã ba sông lớn (Merge Commit). Kể từ ngã ba sông này, dòng chảy tiếp tục hòa thành một dòng sông lớn duy nhất mang theo phù sa của cả hai nhánh sông trước đó.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCấu trúc đối tượng Merge Commit trong Git:\n┌──────────────────────────────────────────────┐\n│ Commit: e4b2a19 (Merge Commit)               │\n│ Tree: 819c4d2fe901                           │\n│ Parent 1: c3f12a8 (nhánh main)               │\n│ Parent 2: 9a7b4f1 (nhánh feature-payment)    │\n│ Author: Nam Nguyen <nam@example.com>         │\n│ Message: Merge branch 'feature-payment'      │\n└──────────────────────────────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrong một dự án xây dựng ứng dụng ngân hàng số, trưởng nhóm kỹ thuật rà soát lại lịch sử phát hành thông qua câu lệnh trực quan `git log --graph --oneline`. Tại commit mang mã hash e4b2a19, trưởng nhóm nhìn thấy dòng ghi chú chuẩn mực \"Merge branch feature-auth into main\". Nhờ tồn tại merge commit này với hai commit cha rõ ràng, cả nhóm có thể dễ dàng kiểm toán lại xem tính năng xác thực hai yếu tố đã được gộp vào mã nguồn chính xác vào ngày nào, do ai phê duyệt và toàn bộ các commit thành phần nhỏ bên trong nhánh đó là gì. Điều này mang lại sự minh bạch tuyệt đối cho quy trình phát triển sản phẩm của toàn thể công ty.\n\n---\n\n## 💻 Command\n```bash\ngit show <merge-commit-hash>\ngit log --merges --oneline\ngit log --no-merges --oneline\n```\n\n---\n\n## 🔍 Giải thích command\n- `git show <merge-commit-hash>`: Xem thông tin chi tiết của một merge commit bao gồm cả hai mã hash của commit cha.\n- `git log --merges --oneline`: Bộ lọc thông minh chỉ hiển thị các commit hợp nhất trong lịch sử dự án.\n- `git log --no-merges --oneline`: Bộ lọc loại bỏ toàn bộ các commit hợp nhất, chỉ hiển thị các commit công việc thông thường.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Cố gắng revert merge commit mà không chỉ định cờ -m**:  Git sẽ từ chối vì không biết bạn muốn coi commit cha số 1 hay số 2 là mạch chính.\n2. **Lạm dụng merge commit cho các sửa đổi quá nhỏ nhặt**:  Khiến lịch sử dự án bị ô nhiễm bởi hàng trăm commit merge rác.\n3. **Nghĩ rằng merge commit sao chép toàn bộ tệp trùng lặp**:  Merge commit chỉ lưu trữ tree snapshot và trỏ tới hai commit cha trong DAG.\n\n---\n\n## 🧪 Lab\n1. Chạy lệnh `git log --merges --oneline` để tìm các commit hợp nhất trong dự án.\n2. Sử dụng lệnh `git show` trên một merge commit để quan sát dòng `Merge: hash1 hash2`.\n3. So sánh kết quả hiển thị giữa `git log --merges` và `git log --no-merges`.\n\n---\n\n## 💡 Hint\n> Dòng `Merge: a1b2c3d e4f5g6h` trong git show cho biết mã băm của hai commit cha.\n\n---\n\n## ✅ Validation\n- Nhận diện chính xác hai commit cha của một merge commit qua git show.\n\n---\n\n## ❓ Quiz\nHãy hoàn thành bài trắc nghiệm dưới đây về bản chất của Merge commit.\n\n---\n\n## 🔥 Challenge\nGiải thích cú pháp `git revert -m 1 <merge-commit-hash>` và ý nghĩa của số 1 ở đây.\n\n---\n\n## 📚 Tổng kết\n- Merge Commit là nút đặc biệt trong đồ thị Git sở hữu từ hai commit cha trở lên.\n- Ghi nhận bằng chứng lịch sử rõ ràng về thời điểm và bối cảnh tích hợp tính năng.\n- Có thể lọc danh sách commit hợp nhất bằng cờ `--merges` hoặc `--no-merges`.\n",
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
