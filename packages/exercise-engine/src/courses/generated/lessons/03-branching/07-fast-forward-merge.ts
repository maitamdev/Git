import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "07-fast-forward-merge",
  "moduleId": "03-branching",
  "metadata": {
    "id": "07-fast-forward-merge",
    "title": "Hợp nhất nhanh Fast-forward merge",
    "level": "intermediate",
    "duration": 30,
    "xp": 90,
    "prerequisites": [
      "06-branch-isolation"
    ],
    "objectives": [
      "Hiểu rõ điều kiện cần và đủ để Git kích hoạt cơ chế hợp nhất Fast-forward merge.",
      "Thực hiện câu lệnh `git merge <tên-nhánh>` trên nhánh đích một cách chuẩn xác.",
      "Giải thích vì sao Fast-forward không sinh ra commit hợp nhất mới (merge commit).",
      "Sử dụng cờ `--no-ff` để chủ động tạo merge commit khi muốn lưu vết lịch sử nhánh tính năng."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "fast-forward"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "fast-forward",
      "ff merge",
      "hop nhat nhanh",
      "git merge",
      "linear history"
    ],
    "commands": [
      "git switch main",
      "git merge <tên-nhánh>",
      "git merge --no-ff <tên-nhánh>",
      "git merge --ff-only <tên-nhánh>"
    ]
  },
  "content": "# Hợp nhất nhanh Fast-forward merge\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ điều kiện cần và đủ để Git kích hoạt cơ chế hợp nhất Fast-forward merge.\n- Thực hiện câu lệnh `git merge <tên-nhánh>` trên nhánh đích một cách chuẩn xác.\n- Giải thích vì sao Fast-forward không sinh ra commit hợp nhất mới (merge commit).\n- Sử dụng cờ `--no-ff` để chủ động tạo merge commit khi muốn lưu vết lịch sử nhánh tính năng.\n\n---\n\n## 📖 Định nghĩa\n> Fast-forward merge là hình thức hợp nhất đơn giản và mượt mà nhất trong Git, xảy ra khi nhánh đích (thường là `main`) không có bất kỳ commit mới nào kể từ thời điểm nhánh tính năng được tách ra. Trong tình huống này, lịch sử phát triển là hoàn toàn tuyến tính (linear): Git không cần phải thực hiện thuật toán so sánh ba chiều phức tạp và không tạo ra commit hợp nhất mới, mà chỉ đơn thuần dịch chuyển con trỏ nhánh đích tiến thẳng về phía trước để trỏ cùng vị trí với commit đỉnh của nhánh tính năng.\n\n---\n\n## 🤔 Tại sao cần?\nFast-forward merge tạo ra một lịch sử commit thẳng thớm, gọn gàng và cực kỳ dễ theo dõi vì không xuất hiện các nút giao rẽ nhánh chằng chịt trong cây lịch sử. Đối với các tác vụ sửa lỗi nhỏ hoặc các nhánh tính năng ngắn hạn mà nhánh main chưa hề bị ai chỉnh sửa, Fast-forward giúp tích hợp mã nguồn tức thì mà không làm phát sinh thêm các commit merge thừa thãi trong nhật ký dự án. Điều này giúp các lập trình viên dễ dàng đọc lại lịch sử mã nguồn, đơn giản hóa việc truy vết lỗi bằng git bisect và giữ cho đồ thị tổng quan luôn sáng rõ.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung hai người bạn Nam và Bình cùng nhau đi bộ trên một con đường mòn thẳng tắp. Khi đi đến cột mốc số 3, Bình xin phép Nam tạm dừng chân nghỉ ngơi, còn Nam tiếp tục đi thẳng về phía trước thêm 2 cột mốc nữa đến cột mốc số 5. Lát sau, khi Bình nghỉ ngơi xong, Bình chỉ việc đứng dậy bước nhanh về phía trước (Fast-forward) để đứng ngang hàng với Nam tại cột mốc số 5 mà không cần phải đi vòng vèo qua bất kỳ con đường tắt nào.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCơ chế Fast-forward merge:\nTrước khi merge:\nmain:               C1 ──► C2 ──► C3 (HEAD -> main)\n                                   feature:                            └──► C4 ──► C5 (feature)\n\nSau khi chạy lệnh: git merge feature\nmain & feature:     C1 ──► C2 ──► C3 ──► C4 ──► C5 (HEAD -> main, feature)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nLập trình viên Đức tạo nhánh fix-typo từ nhánh main tại commit C3 để sửa một lỗi chính tả trên thanh menu điều hướng của trang chủ. Đức tạo hai commit C4 và C5 trên nhánh này để hoàn thiện nội dung. Trong suốt thời gian đó, không có bất kỳ ai commit thêm gì vào nhánh main. Khi hoàn thành kiểm thử, Đức chuyển về nhánh main bằng lệnh `git switch main` rồi gõ lệnh `git merge fix-typo`. Màn hình hiển thị dòng chữ thông báo: \"Fast-forward\". Con trỏ nhánh main lập tức nhảy vọt lên commit C5, hoàn tất việc gộp code trong nháy mắt mà không cần sinh thêm commit trung gian nào.\n\n---\n\n## 💻 Command\n```bash\ngit switch main\ngit merge <tên-nhánh>\ngit merge --no-ff <tên-nhánh>\ngit merge --ff-only <tên-nhánh>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch main`: Bắt buộc phải chuyển về nhánh đích trước khi thực hiện hợp nhất nhánh khác vào.\n- `git merge <tên-nhánh>`: Hợp nhất nhánh chỉ định vào nhánh hiện tại (tự động dùng Fast-forward nếu thỏa mãn điều kiện).\n- `git merge --no-ff <nhánh>`: Ép buộc Git tạo một Merge Commit mới ngay cả khi đủ điều kiện Fast-forward để lưu vết mốc tích hợp tính năng.\n- `git merge --ff-only <nhánh>`: Chỉ cho phép hợp nhất nếu là Fast-forward, từ chối merge nếu phải giải quyết 3-way.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Đứng ở nhánh tính năng rồi gõ git merge main**:  Thao tác ngược làm kéo code của main vào feature thay vì đưa feature vào main.\n2. **Bối rối khi thấy không có commit merge mới**:  Đây là bản chất tự nhiên của Fast-forward vì con trỏ chỉ việc di chuyển tiến lên.\n3. **Lẫn lộn giữa Fast-forward và 3-way merge**:  Không nắm được điều kiện khi nào Git được phép tua nhanh con trỏ.\n\n---\n\n## 🧪 Lab\n1. Tạo nhánh `ff-demo` và commit một tệp mới `feature.js`.\n2. Chuyển về nhánh `main` bằng `git switch main`.\n3. Chạy lệnh `git merge ff-demo` và quan sát thông báo `Fast-forward`.\n4. Chạy `git log --oneline` để thấy lịch sử thẳng tắp không có commit rẽ nhánh.\n\n---\n\n## 💡 Hint\n> Nhớ nguyên tắc: Luôn đứng ở nhánh nhận code (main) trước khi gõ lệnh `git merge`.\n\n---\n\n## ✅ Validation\n- Kiểm tra `git log` thấy con trỏ main và con trỏ nhánh con cùng trỏ vào một commit.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về cơ chế Fast-forward merge.\n\n---\n\n## 🔥 Challenge\nNêu lợi ích và nhược điểm của việc sử dụng cờ `--no-ff` trong quy trình làm việc Git Flow của doanh nghiệp.\n\n---\n\n## 📚 Tổng kết\n- Fast-forward xảy ra khi nhánh đích không có commit mới kể từ mốc rẽ nhánh.\n- Git chỉ dịch chuyển con trỏ nhánh đích tiến lên mà không tạo thêm commit mới.\n- Sử dụng `--no-ff` khi bạn muốn ghi dấu rõ ràng một nhánh tính năng đã được hợp nhất.\n",
  "quiz": {
    "id": "quiz-03-07-fast-forward-merge",
    "title": "Trắc nghiệm: Hợp nhất nhanh Fast-forward merge",
    "questions": [
      {
        "id": "q1",
        "question": "Điều kiện tiên quyết để Git có thể thực hiện Fast-forward merge là gì?",
        "type": "single",
        "options": [
          {
            "text": "Nhánh đích (ví dụ main) không có bất kỳ commit mới nào kể từ khi nhánh tính năng được tách ra",
            "correct": true
          },
          {
            "text": "Dự án phải có dung lượng dưới 10 megabyte",
            "correct": false
          },
          {
            "text": "Cả hai lập trình viên phải sử dụng cùng một phiên bản hệ điều hành",
            "correct": false
          },
          {
            "text": "Lệnh phải được thực thi vào lúc 12 giờ đêm",
            "correct": false
          }
        ],
        "explanation": "Nếu nhánh đích không có commit mới, con đường lịch sử là hoàn toàn tuyến tính và Git có thể tua nhanh con trỏ."
      },
      {
        "id": "q2",
        "question": "Trong quá trình thực hiện Fast-forward merge thành công, Git có sinh ra một commit mới hay không?",
        "type": "single",
        "options": [
          {
            "text": "Không, Git chỉ đơn thuần dịch chuyển con trỏ của nhánh đích tiến lên chỉ vào commit đỉnh của nhánh tính năng",
            "correct": true
          },
          {
            "text": "Có, Git luôn luôn bắt buộc tạo ra một commit có hai cha",
            "correct": false
          },
          {
            "text": "Có, nhưng commit đó sẽ tự động bị ẩn đi sau 1 giờ",
            "correct": false
          },
          {
            "text": "Git sẽ xóa toàn bộ các commit cũ và thay bằng một commit duy nhất",
            "correct": false
          }
        ],
        "explanation": "Fast-forward không tạo commit mới, chỉ di chuyển con trỏ tiến lên phía trước."
      },
      {
        "id": "q3",
        "question": "Trước khi chạy lệnh `git merge feature-login` để gộp tính năng vào nhánh chính, bạn bắt buộc phải làm gì?",
        "type": "single",
        "options": [
          {
            "text": "Chuyển về nhánh đích đón nhận code bằng lệnh `git switch main`",
            "correct": true
          },
          {
            "text": "Xóa nhánh feature-login trước",
            "correct": false
          },
          {
            "text": "Tắt kết nối mạng Internet",
            "correct": false
          },
          {
            "text": "Đóng trình duyệt web",
            "correct": false
          }
        ],
        "explanation": "Bạn luôn phải đứng ở nhánh đích (nơi muốn nhận code) trước khi ra lệnh merge nhánh nguồn vào."
      },
      {
        "id": "q4",
        "question": "Cờ tùy chọn nào ép buộc Git tạo một Merge Commit mới ngay cả khi đủ điều kiện thực hiện Fast-forward?",
        "type": "single",
        "options": [
          {
            "text": "--no-ff",
            "correct": true
          },
          {
            "text": "--force-merge",
            "correct": false
          },
          {
            "text": "--create-commit",
            "correct": false
          },
          {
            "text": "--always-new",
            "correct": false
          }
        ],
        "explanation": "`--no-ff` (no fast-forward) bắt buộc tạo một merge commit riêng biệt để lưu lại bằng chứng của nhánh tính năng."
      },
      {
        "id": "q5",
        "question": "Cờ `--ff-only` trong lệnh git merge mang lại sự an toàn nào cho quy trình CI/CD?",
        "type": "single",
        "options": [
          {
            "text": "Từ chối hợp nhất và báo lỗi nếu nhánh đích bị phân kỳ, bảo đảm lịch sử dự án luôn là một đường thẳng",
            "correct": true
          },
          {
            "text": "Tự động chấp nhận tất cả các lỗi xung đột code mà không hỏi người dùng",
            "correct": false
          },
          {
            "text": "Xóa bỏ tất cả các bài kiểm tra tự động",
            "correct": false
          },
          {
            "text": "Tự động tăng số sao trên GitHub của dự án",
            "correct": false
          }
        ],
        "explanation": "`--ff-only` ngăn chặn việc vô tình sinh ra merge commit khi lịch sử đã bị phân kỳ."
      },
      {
        "id": "q6",
        "question": "Khi quan sát `git log --graph --oneline` sau một Fast-forward merge, đồ thị nhánh sẽ có dạng gì?",
        "type": "single",
        "options": [
          {
            "text": "Một đường thẳng tắp duy nhất không có bất kỳ nút giao rẽ nhánh nào",
            "correct": true
          },
          {
            "text": "Một vòng tròn khép kín vô tận",
            "correct": false
          },
          {
            "text": "Một hình sao năm cánh phức tạp",
            "correct": false
          },
          {
            "text": "Đồ thị bị biến mất hoàn toàn không xem được",
            "correct": false
          }
        ],
        "explanation": "Do không có merge commit, các commit nối tiếp nhau trên một đường thẳng duy nhất."
      }
    ]
  }
};
export default lesson;
