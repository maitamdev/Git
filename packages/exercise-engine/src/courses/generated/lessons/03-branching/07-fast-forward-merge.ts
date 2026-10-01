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
  "content": "# Hợp nhất nhanh Fast-forward merge\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ điều kiện để Git thực hiện hợp nhất tua nhanh (Fast-forward merge).\n- Thực hiện lệnh `git merge <tên-nhánh>` trên nhánh đích một cách chuẩn xác.\n- Giải thích vì sao Fast-forward không tạo ra commit hợp nhất mới và khi nào nên dùng cờ `--no-ff`.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Fast-forward Merge — hợp nhất tua nhanh\n- **Nói dễ hiểu:** Cách gộp nhánh khi nhánh chính chưa có commit mới nào kể từ khi rẽ nhánh tính năng.\n- **Ví dụ:** Bạn tách nhánh làm nút bấm trong khi `main` đứng yên; khi gộp, con trỏ `main` chỉ việc trượt tới commit của bạn.\n- **Đừng nhầm:** Không có commit hợp nhất mới nào được sinh ra; Git chỉ dịch chuyển con trỏ nhánh tiến lên phía trước.\n\n### Linear History — lịch sử tuyến tính\n- **Nói dễ hiểu:** Chuỗi các commit nối tiếp nhau thẳng hàng trên một đường duy nhất, không có ngã rẽ.\n- **Ví dụ:** Chuỗi commit C1 ──> C2 ──> C3 ──> C4 giúp bạn đọc lại lịch sử dự án rất rõ ràng và mạch lạc.\n- **Đừng nhầm:** Lịch sử tuyến tính không cấm tạo nhánh; khi gộp theo kiểu Fast-forward, các commit tự xếp thành một đường thẳng.\n\n### --no-ff — ép tạo commit hợp nhất\n- **Nói dễ hiểu:** Tùy chọn buộc Git tạo một commit gộp riêng để lưu lại bằng chứng một nhánh tính năng đã hoàn thành.\n- **Ví dụ:** Chạy `git merge --no-ff feature-cart` để giữ lại hình ảnh nhánh con trên cây lịch sử của nhóm.\n- **Đừng nhầm:** Dùng cờ này sẽ luôn sinh ra thêm một commit mới ngay cả khi đủ điều kiện tua nhanh con trỏ.\n\n---\n\n## 📖 Định nghĩa\nFast-forward merge là hình thức hợp nhất đơn giản nhất của Git, diễn ra khi nhánh đích (`main`) không có commit mới nào kể từ lúc tách nhánh tính năng. Git không cần giải quyết xung đột mà chỉ dịch chuyển con trỏ `main` tiến thẳng đến commit mới nhất của nhánh tính năng.\n\n---\n\n## 🤔 Tại sao cần?\nKhi bạn làm những tính năng nhỏ hoặc sửa lỗi nhanh mà nhánh chính chưa bị ai thay đổi, Fast-forward giúp tích hợp mã nguồn tức thì. Lịch sử commit giữ được sự liền mạch, thẳng thớm và không bị ngập tràn bởi các commit gộp vụn vặt.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung hai bạn Nam và Bình cùng đi bộ trên một con đường mòn. Đến cột mốc số 3, Bình đứng chờ còn Nam đi tiếp đến cột mốc số 5. Khi Nam gọi điện báo đã tới nơi, Bình chỉ việc bước nhanh về phía trước (Fast-forward) để đứng cùng Nam tại cột mốc số 5 mà không cần mở lối đi mới nào.\n\n---\n\n## 🖼 Sơ đồ\n```text\nTrước khi merge:\nmain:               C1 ───> C2 ───> C3 (HEAD -> main)\n                                     │\nfeature:                             └───> C4 ───> C5 (feature)\n\nSau lệnh: git merge feature\nmain & feature:     C1 ───> C2 ───> C3 ───> C4 ───> C5 (HEAD -> main, feature)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn Đức tạo nhánh `fix-typo` từ `main` để sửa một chữ sai trên thanh menu. Đức commit hai lần. Trong lúc đó cả nhóm không ai sửa thêm gì vào `main`. Khi xong việc, Đức gõ `git switch main` rồi chạy `git merge fix-typo`. Git thông báo \"Fast-forward\", con trỏ `main` lập tức nhảy lên commit mới nhất của Đức mà không sinh thêm commit rác nào.\n\n---\n\n## 💻 Command\n```bash\ngit switch main\ngit merge <tên-nhánh>\ngit merge --no-ff <tên-nhánh>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch main`: Bắt buộc chuyển về nhánh nhận code trước khi thực hiện thao tác hợp nhất.\n- `git merge <tên-nhánh>`: Gộp nhánh chỉ định vào nhánh hiện tại (tự động chọn Fast-forward nếu thỏa mãn điều kiện).\n- `git merge --no-ff <tên-nhánh>`: Ép buộc tạo commit hợp nhất mới để lưu vết mốc tích hợp nhánh tính năng.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Đứng ở nhánh tính năng rồi gõ `git merge main`:** Thao tác này kéo code từ `main` vào nhánh con chứ không đưa code vào `main`.\n2. **Bối rối vì không thấy commit mới:** Đây là bản chất của Fast-forward vì Git chỉ dời con trỏ chứ không cần sinh commit mới.\n3. **Quên chuyển về nhánh chính trước khi merge:** Luôn kiểm tra `git status` xem mình đang đứng ở nhánh đích hay chưa.\n\n---\n\n## 🧪 Lab\nBài tập này được thực hành trên môi trường Git mô phỏng của hệ thống:\n1. Tạo nhánh `ff-demo` bằng lệnh `git switch -c ff-demo`.\n2. Tạo tệp `feature.js` và commit với thông điệp `feat: add feature file`.\n3. Chuyển về nhánh chính bằng lệnh `git switch main`.\n4. Chạy lệnh `git merge ff-demo` và quan sát dòng chữ `Fast-forward` trên terminal.\n\n---\n\n## 💡 Hint\nLuôn ghi nhớ quy tắc: đứng tại nhánh muốn nhận code (như `main`) rồi mới gọi tên nhánh cần gộp vào.\n\n---\n\n## ✅ Validation\n- Terminal hiển thị thông báo `Fast-forward`.\n- Lệnh `git log --oneline` cho thấy commit của nhánh `ff-demo` đã nằm ngay trên đỉnh nhánh `main`.\n\n---\n\n## ❓ Quiz\nTrả lời các câu hỏi sau để kiểm tra hiểu biết về cơ chế hợp nhất tua nhanh trong Git.\n\n---\n\n## 🔥 Challenge\nChạy thử lệnh `git merge --no-ff` trên một nhánh thử nghiệm khác và so sánh biểu đồ commit với lần merge Fast-forward vừa rồi.\n\n---\n\n## 📚 Tổng kết\n- Fast-forward chỉ xảy ra khi nhánh đích không có commit mới nào kể từ mốc tách nhánh.\n- Git chỉ dời nhãn nhánh tiến lên phía trước mà không tạo thêm commit mới.\n- Dùng cờ `--no-ff` khi bạn muốn lưu lại vết tích hợp rõ ràng trên đồ thị lịch sử.\n",
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
