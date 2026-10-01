import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "09-merge-commit",
  "moduleId": "03-branching",
  "metadata": {
    "id": "09-merge-commit",
    "title": "Merge commit là gì?",
    "level": "intermediate",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "08-three-way-merge"
    ],
    "objectives": [
      "Phân biệt commit thường với merge commit qua số lượng commit cha.",
      "Giải thích điều mà merge commit ghi lại và điều nó không chứng minh.",
      "Dùng `git show` và `git log` để tìm merge commit, đọc hai commit cha."
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
  "content": "# Merge commit là gì?\n\n---\n\n## 🎯 Mục tiêu\n- Phân biệt commit thường với merge commit qua số lượng commit cha.\n- Giải thích điều mà merge commit lưu lại và điều mà nó không chứng minh.\n- Dùng `git show` và `git log` để xem merge commit trong lịch sử.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Merge commit — commit hợp nhất\n- **Nói dễ hiểu:** Commit ghi lại kết quả kết hợp hai nhánh có lịch sử riêng.\n- **Ví dụ:** Bạn phát triển giỏ hàng trên `feature-cart`, đồng đội cập nhật trang chủ trên `main`, sau đó hai nhánh được merge.\n- **Đừng nhầm:** Merge commit chỉ được tạo khi Git cần nối hai lịch sử; merge kiểu fast-forward không tạo commit này.\n\n### Parent commit — commit cha\n- **Nói dễ hiểu:** Commit đứng trước commit hiện tại trong lịch sử.\n- **Ví dụ:** Merge commit thường có hai cha: đầu nhánh nhận và đầu nhánh được gộp.\n- **Đừng nhầm:** Commit đầu tiên của kho không có cha; commit thường về sau thường có một cha.\n\n### `git log --merges` — lọc merge commit\n- **Nói dễ hiểu:** Chỉ xem các commit có nhiều hơn một commit cha.\n- **Ví dụ:** Dùng `git log --merges --oneline` để tìm các lần hợp nhất.\n- **Đừng nhầm:** `--no-merges` chỉ lọc khỏi màn hình; nó không xóa commit.\n\n---\n\n## 📖 Định nghĩa\nMerge commit là một commit có từ hai commit cha trở lên. Nó lưu trạng thái tệp sau khi hợp nhất và nối lịch sử của nhánh hiện tại với nhánh được gộp. Commit này ghi nhận việc tích hợp; tự nó không chứng minh thay đổi đã được duyệt hay kiểm thử.\n\n---\n\n## 🤔 Tại sao cần?\nKhi đọc lịch sử nhóm, merge commit giúp nhận ra lúc hai luồng công việc được nối với nhau. Nếu dự án dùng fast-forward, rebase hoặc squash, lịch sử có thể không có merge commit; đó là các cách tổ chức lịch sử khác nhau, không phải lỗi.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung hai lối đi tách từ một ngã rẽ. Một merge commit là điểm nối ghi nhận cả hai lối đã gặp lại. Điểm nối cho biết lịch sử được kết hợp, nhưng không nói nhóm đã kiểm thử tốt đến đâu.\n\n---\n\n## 🖼 Sơ đồ\n```text\n                 F1 ── F2  feature-cart\n                /        \\\nBase ── M1 ─────            ── Merge M2  main\n       main\n\nM2 có hai commit cha: M1 và F2.\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nNhóm thêm trang giỏ hàng trên nhánh tính năng trong lúc nhánh `main` nhận một cập nhật khác. Khi hai nhánh đã có commit riêng, merge có thể tạo một commit mới. Người đọc lịch sử có thể thấy thời điểm tích hợp và lần theo cả hai nhánh.\n\n---\n\n## 💻 Command\n```bash\ngit log --merges --oneline\ngit show HEAD\ngit log --no-merges --oneline\n```\n\n---\n\n## 🔍 Giải thích command\n- `git log --merges --oneline`: Liệt kê merge commit, mỗi commit trên một dòng.\n- `git show HEAD`: Xem commit hiện tại; với merge commit, tìm dòng `Merge:` để thấy hai mã commit cha.\n- `git log --no-merges --oneline`: Liệt kê các commit không phải merge commit.\n- Nếu chưa có merge commit, lệnh đầu không in kết quả; hãy làm bài lab trước rồi chạy lại.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ merge commit chứng minh code đã được duyệt:** Việc duyệt thường nằm ở quy trình review hoặc nền tảng cộng tác, không nằm trong số cha của commit.\n2. **Nghĩ mọi lần merge đều tạo merge commit:** Fast-forward chỉ di chuyển con trỏ nhánh.\n3. **Cho rằng `--no-merges` chỉ hiện commit viết code:** Nó hiện các commit không phải merge; chúng có thể chứa nhiều loại thay đổi.\n\n---\n\n## 🧪 Lab\nDùng repository từ bài trước. Nếu chưa có merge commit, tạo một lần hợp nhất không xung đột:\n1. Trên `main`, tạo tệp `history-main.txt`, ghi một dòng, rồi chạy `git add history-main.txt` và `git commit -m \"docs: add main note\"`.\n2. Chạy `git switch -c feature-history`, tạo `history-feature.txt`, ghi một dòng, rồi add và commit tệp đó.\n3. Chạy `git switch main`, sau đó `git merge feature-history`.\n4. Chạy lần lượt ba lệnh trong phần Command. Ở kết quả `git show HEAD`, tìm dòng `Merge:` và đếm hai mã cha.\n\n---\n\n## 💡 Hint\nNếu `git show HEAD` không có dòng `Merge:`, có thể HEAD là commit thường. Kiểm tra lại bằng `git log --merges --oneline` và chuyển về `main` trước khi merge.\n\n---\n\n## ✅ Validation\n- `git log --merges --oneline` liệt kê merge commit vừa tạo.\n- `git show HEAD` có dòng `Merge:` với hai mã cha.\n- `git log --no-merges --oneline` không liệt kê merge commit đó.\n\n---\n\n## ❓ Quiz\nTrả lời câu hỏi để kiểm tra cách nhận diện merge commit và đọc hai commit cha.\n\n---\n\n## 🔥 Challenge\nGiải thích vì sao hai lệnh `git log --merges` và `git log --no-merges` cho kết quả khác nhau. Nêu một thông tin mà merge commit không thể tự chứng minh.\n\n---\n\n## 📚 Tổng kết\n- Merge commit có ít nhất hai commit cha; commit gốc có không cha, commit thường về sau thường có một cha.\n- Nó ghi nhận lúc hai luồng lịch sử được nối, nhưng không thay cho review hoặc kiểm thử.\n- Dùng `git log --merges` để tìm merge commit và `git show` để xem hai cha.\n",
  "quiz": {
    "id": "quiz-03-09-merge-commit",
    "title": "Trắc nghiệm: Merge commit",
    "questions": [
      {
        "id": "q1",
        "question": "Điểm nào phân biệt merge commit với commit thông thường trong lịch sử phân kỳ?",
        "type": "single",
        "options": [
          {
            "text": "Merge commit có từ hai commit cha trở lên",
            "correct": true
          },
          {
            "text": "Merge commit không có mã định danh",
            "correct": false
          },
          {
            "text": "Merge commit không lưu trạng thái tệp",
            "correct": false
          },
          {
            "text": "Merge commit chỉ được tạo bởi quản trị viên",
            "correct": false
          }
        ],
        "explanation": "Commit thông thường sau commit gốc thường có một cha, còn merge commit nối nhiều luồng lịch sử."
      },
      {
        "id": "q2",
        "question": "Lệnh nào lọc lịch sử để chỉ xem các merge commit?",
        "type": "single",
        "options": [
          {
            "text": "git log --merges --oneline",
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
        "explanation": "Tùy chọn --merges chỉ giữ các commit có nhiều hơn một commit cha trong kết quả git log."
      },
      {
        "id": "q3",
        "question": "Merge commit cho biết điều gì về lịch sử dự án?",
        "type": "single",
        "options": [
          {
            "text": "Thời điểm hai luồng lịch sử được nối và trạng thái kết quả",
            "correct": true
          },
          {
            "text": "Chắc chắn mọi bài kiểm thử đều đạt",
            "correct": false
          },
          {
            "text": "Chắc chắn một người quản lý đã phê duyệt thay đổi",
            "correct": false
          },
          {
            "text": "Ai đã tạo repository đầu tiên",
            "correct": false
          }
        ],
        "explanation": "Commit ghi lịch sử tích hợp và trạng thái tệp, nhưng review và kiểm thử phải được xác nhận ở nơi khác."
      },
      {
        "id": "q4",
        "question": "Khi `git show HEAD` đang trỏ tới merge commit, dòng `Merge:` cho biết gì?",
        "type": "single",
        "options": [
          {
            "text": "Mã định danh của hai commit cha",
            "correct": true
          },
          {
            "text": "Danh sách tệp bị xóa",
            "correct": false
          },
          {
            "text": "Tên người đã duyệt pull request",
            "correct": false
          },
          {
            "text": "Tên remote của repository",
            "correct": false
          }
        ],
        "explanation": "Dòng Merge liệt kê các commit cha, giúp nhận ra hai lịch sử đã được nối."
      },
      {
        "id": "q5",
        "question": "`git log --no-merges --oneline` làm gì?",
        "type": "single",
        "options": [
          {
            "text": "Ẩn merge commit khỏi danh sách kết quả, không xóa chúng",
            "correct": true
          },
          {
            "text": "Xóa các merge commit khỏi repository",
            "correct": false
          },
          {
            "text": "Chỉ hiện commit đã được kiểm thử",
            "correct": false
          },
          {
            "text": "Tạo nhánh mới cho từng commit",
            "correct": false
          }
        ],
        "explanation": "Đây là bộ lọc cách hiển thị lịch sử; nội dung và commit trong repository không bị thay đổi."
      },
      {
        "id": "q6",
        "question": "Vì sao fast-forward merge thường không tạo merge commit?",
        "type": "single",
        "options": [
          {
            "text": "Vì đầu nhánh hiện tại có thể được di chuyển thẳng tới commit mới hơn",
            "correct": true
          },
          {
            "text": "Vì Git xóa các commit trên nhánh nguồn",
            "correct": false
          },
          {
            "text": "Vì fast-forward chỉ hoạt động khi không có repository",
            "correct": false
          },
          {
            "text": "Vì Git tự đổi fast-forward thành squash",
            "correct": false
          }
        ],
        "explanation": "Nếu lịch sử nhánh hiện tại đã nằm phía trước nhánh nguồn, Git chỉ cần di chuyển con trỏ nhánh."
      }
    ]
  }
};
export default lesson;
