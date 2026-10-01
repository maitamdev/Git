import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "14-squash-commit",
  "moduleId": "05-advanced-git",
  "metadata": {
    "id": "14-squash-commit",
    "title": "Squash Commit",
    "level": "advanced",
    "duration": 30,
    "xp": 95,
    "prerequisites": [
      "13-interactive-rebase"
    ],
    "objectives": [
      "Nắm vững khái niệm và kỹ thuật gộp commit (Squash Commit) trong Git.",
      "Sử dụng chỉ thị `squash` (hoặc `s`) trong Interactive Rebase để gộp nhiều commit vụn vặt thành một khối.",
      "Biên tập lại thông điệp commit kết hợp (Combined Commit Message) sao cho súc tích và mạch lạc.",
      "Phân biệt sự khác biệt giữa chỉ thị `squash` (giữ lại message để chỉnh sửa) và `fixup` (bỏ qua message)."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "squash commit",
      "git squash",
      "gop commit",
      "interactive rebase squash",
      "ket hop commit",
      "clean history"
    ],
    "commands": [
      "git log --oneline -n 5",
      "git status"
    ]
  },
  "content": "# Squash Commit\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững khái niệm và kỹ thuật gộp commit (Squash Commit) trong Git.\n- Sử dụng chỉ thị `squash` (hoặc `s`) trong Interactive Rebase để gộp nhiều commit vụn vặt thành một khối.\n- Biên tập lại thông điệp commit kết hợp (Combined Commit Message) sao cho súc tích và mạch lạc.\n- Phân biệt sự khác biệt giữa chỉ thị `squash` (giữ lại message để chỉnh sửa) và `fixup` (bỏ qua message).\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Squash Commit (squash / s)\n- **Nói dễ hiểu**: Gộp một commit vào commit liền kề trước nó và mở màn hình biên tập để gộp các thông điệp commit lại với nhau.\n- **Ví dụ**: Đổi `pick` thành `squash` ở dòng thứ hai trong Todo List để gộp commit 2 vào commit 1.\n- **Đừng nhầm**: Khác với `fixup`, lệnh `squash` giữ lại toàn bộ nội dung commit message cũ để bạn tinh chỉnh và tổng hợp lại.\n\n### Combined Commit Message\n- **Nói dễ hiểu**: Bản nháp thông điệp gộp chung do Git tự động tổng hợp từ tất cả các commit tham gia tiến trình squash.\n- **Ví dụ**: Xóa các dòng ghi chú vụn vặt như \"fix typo\" trong message gộp và viết lại thành \"feat: implement user registration\".\n- **Đừng nhầm**: Bạn cần chủ động xóa bớt các dòng nháp không cần thiết, nếu không Git sẽ lưu toàn bộ các dòng rác vào commit mới.\n\n### Squash and Merge\n- **Nói dễ hiểu**: Tính năng gộp toàn bộ các commit trên Pull Request thành một commit duy nhất khi merge vào nhánh chính trên GitHub.\n- **Ví dụ**: Bấm nút \"Squash and merge\" trên GitHub PR để nhánh main chỉ nhận một commit đại diện cho cả tính năng.\n- **Đừng nhầm**: Tự squash ở local bằng `git rebase -i` cho phép bạn kiểm soát chi tiết từng nhóm commit nhỏ trước khi đẩy lên remote.\n\n---\n\n## 📖 Định nghĩa\nSquash Commit (Gộp commit) là kỹ thuật nén và hợp nhất hai hoặc nhiều commit liên tiếp thành một commit duy nhất trong lịch sử Git, mở màn hình tổng hợp để lập trình viên tự do viết lại một thông điệp cô đọng nhất.\n\n---\n\n## 💡 Tại sao cần\nKhi lập trình, chúng ta thường sinh ra nhiều commit vụn vặt như sửa lỗi chính tả hay căn chỉnh giao diện. Kỹ thuật Squash Commit giúp bạn nén chuỗi commit vụn đó thành một khối thay đổi hoàn chỉnh, giữ cho lịch sử nhánh chính luôn sáng sủa và dễ tra cứu.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung bạn nhào bột nặn bánh mì. Bạn thêm một chút bột, rắc chút men nở, rồi thêm nhúm muối. Khi nướng bánh, bạn không để từng nhúm nguyên liệu riêng rẽ mà nhào nặn tất cả thành một khối bột dẻo dai duy nhất. Chiếc bánh ra lò là một sản phẩm hoàn chỉnh và thơm ngon.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nCơ chế gộp commit bằng squash:\nTrước khi squash (3 commit vụn):\nC1 ──► C2 (\"wip cart\") ──► C3 (\"fix cart css\") ──► C4 (\"cart ready\")\n\nTrong Todo List (git rebase -i HEAD~3):\npick C2 wip cart\nsquash C3 fix cart css\nsquash C4 cart ready\n\nSau khi hoàn tất:\nC1 ──► C_new (\"feat: complete shopping cart module\") (Một commit duy nhất!)\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nKỹ sư Nam tạo 3 commit: tạo form đăng ký, kiểm tra email hợp lệ, và sửa màu nút submit. Trước khi mở PR, Nam dùng `git rebase -i HEAD~3`, đổi 2 commit sau thành `squash`. Nam biên tập lại thành một thông điệp chuẩn mực duy nhất: \"feat: add user registration form with validation and styling\".\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit rebase -i HEAD~<n>\ns <commit-hash> <message>\nsquash <commit-hash> <message>\ngit log --oneline -n 5\n```\n\n---\n\n## 🔍 Giải thích command\n- `squash <hash>`: Gộp commit này vào commit liền trước nó và giữ lại thông điệp trong trình soạn thảo tổng hợp.\n- `s <hash>`: Ký tự viết tắt tiện lợi của lệnh `squash` trong danh sách Todo List.\n- `git rebase -i`: Lệnh khởi động môi trường tương tác để thiết lập các chỉ thị squash.\n- `git log --oneline`: Kiểm tra lại kết quả gộp commit trên cây lịch sử.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Đặt `squash` hoặc `fixup` ở dòng đầu tiên**: Hai lệnh này cần commit đứng trước để gộp vào. Dòng đầu có thể dùng `pick`, `reword`, `edit` hoặc `drop` tùy mục tiêu.\n2. **Quên xóa các dòng thông điệp commit rác trong cửa sổ tổng hợp**: Khiến thông điệp cuối cùng chứa đầy những câu vụn vặt như \"fix typo\", \"temp\".\n3. **Squash nhầm các tính năng độc lập**: Gộp các commit không liên quan vào làm một khối khổng lồ sẽ gây khó khăn cho việc review và rollback khi phát sinh sự cố.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.\n1. Tạo liên tiếp 3 commit nhỏ bổ sung từng dòng chữ vào tệp `notes.txt`.\n2. Chạy lệnh `git rebase -i HEAD~3` trên terminal.\n3. Giữ dòng 1 là `pick`, đổi dòng 2 và 3 thành `s` hoặc `squash`.\n4. Lưu và đóng file. Trong màn hình tiếp theo, chỉnh sửa lại thông điệp commit thành một câu hoàn chỉnh.\n5. Dùng `git log --oneline` để xác nhận 3 commit cũ đã gộp thành 1 commit duy nhất.\n\n---\n\n## 💡 Hint & mẹo\n> `squash` và `fixup` cần commit trước đó làm đích gộp. Luyện trên nhánh chưa chia sẻ và kiểm tra kết quả bằng `git log`.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Gộp thành công nhiều commit thành một commit duy nhất và biên tập lại thông điệp chuẩn xác.\n- Nắm vững cách phân biệt giữa `squash` (giữ lại message để sửa) và `fixup` (bỏ message gộp).\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài kiểm tra trắc nghiệm dưới đây về kỹ thuật Squash Commit.\n\n---\n\n## 🚀 Thử thách nâng cao\nNêu sự khác biệt giữa việc tự tay squash bằng `git rebase -i` ở local và việc bấm nút \"Squash and merge\" trên giao diện GitHub.\n\n---\n\n## 📝 Tổng kết\n- `squash` (hoặc `s`) cho phép gộp commit hiện tại vào commit ngay phía trước.\n- Trình soạn thảo tổng hợp giúp bạn viết lại thông điệp commit chung một cách chuyên nghiệp.\n- Không bao giờ đặt `squash` ở dòng đầu tiên của file Todo List.\n",
  "quiz": {
    "id": "quiz-05-14-squash-commit",
    "title": "Trắc nghiệm: Kỹ thuật Squash Commit",
    "questions": [
      {
        "id": "q1",
        "question": "Điều gì sẽ xảy ra nếu bạn đặt chỉ thị `squash` ngay tại dòng đầu tiên trong tệp Todo List của Interactive Rebase?",
        "type": "single",
        "options": [
          {
            "text": "Git sẽ báo lỗi ngay lập tức vì dòng đầu tiên không có commit nào nằm phía trước để gộp vào",
            "correct": true
          },
          {
            "text": "Git tự động gộp vào commit đầu tiên của toàn bộ lịch sử dự án",
            "correct": false
          },
          {
            "text": "Git tự động bỏ qua commit đó",
            "correct": false
          },
          {
            "text": "Máy tính sẽ tự động tắt ứng dụng Git",
            "correct": false
          }
        ],
        "explanation": "`squash` cần một commit đứng trước để gộp vào. Dòng đầu có thể là `pick`, `reword`, `edit` hoặc `drop`, tùy mục tiêu."
      },
      {
        "id": "q2",
        "question": "Sau khi lưu tệp Todo List có chứa chỉ thị `squash`, bước tiếp theo Git sẽ yêu cầu bạn làm gì?",
        "type": "single",
        "options": [
          {
            "text": "Mở cửa sổ soạn thảo chứa thông điệp của tất cả các commit thành phần để bạn biên tập lại thông điệp chung",
            "correct": true
          },
          {
            "text": "Yêu cầu bạn nhập mật khẩu tài khoản GitHub",
            "correct": false
          },
          {
            "text": "Yêu cầu bạn khởi động lại máy tính",
            "correct": false
          },
          {
            "text": "Tự động đóng lại và không hỏi gì thêm",
            "correct": false
          }
        ],
        "explanation": "Chỉ thị `squash` mở editor tổng hợp để bạn gọt giũa thông điệp commit kết hợp."
      },
      {
        "id": "q3",
        "question": "Ký tự viết tắt tương đương với từ khóa `squash` trong tệp Todo List là gì?",
        "type": "single",
        "options": [
          {
            "text": "s",
            "correct": true
          },
          {
            "text": "q",
            "correct": false
          },
          {
            "text": "c",
            "correct": false
          },
          {
            "text": "m",
            "correct": false
          }
        ],
        "explanation": "Bạn có thể gõ ngắn gọn chữ `s` thay vì phải gõ đầy đủ từ `squash`."
      },
      {
        "id": "q4",
        "question": "Lợi ích chính của việc gộp (squash) các commit thử nghiệm trước khi mở Pull Request là gì?",
        "type": "single",
        "options": [
          {
            "text": "Loại bỏ các commit rác vô nghĩa, giúp người review dễ đọc hiểu và lịch sử dự án luôn trong sạch",
            "correct": true
          },
          {
            "text": "Làm tăng dung lượng mã nguồn của dự án",
            "correct": false
          },
          {
            "text": "Giúp mã nguồn chạy nhanh hơn trên trình duyệt web",
            "correct": false
          },
          {
            "text": "Tự động kiểm tra lỗi chính tả trong mã nguồn",
            "correct": false
          }
        ],
        "explanation": "Squash tạo ra các khối commit nguyên tử (Atomic Commits) có ý nghĩa trọn vẹn, nâng cao chất lượng code review."
      },
      {
        "id": "q5",
        "question": "Nếu bạn có 4 commit vụn và muốn gộp cả 4 commit đó lại thành một commit duy nhất, Todo List cần cấu hình như thế nào?",
        "type": "single",
        "options": [
          {
            "text": "Dòng 1 để `pick`, 3 dòng tiếp theo để `squash` (hoặc `s`)",
            "correct": true
          },
          {
            "text": "Cả 4 dòng đều để `squash`",
            "correct": false
          },
          {
            "text": "Cả 4 dòng đều để `pick`",
            "correct": false
          },
          {
            "text": "Dòng 1 để `drop`, 3 dòng sau để `pick`",
            "correct": false
          }
        ],
        "explanation": "Dòng 1 là commit nền tảng nhận kết quả (`pick`), 3 dòng sau nén dồn vào dòng 1 (`squash`)."
      },
      {
        "id": "q6",
        "question": "Điểm khác biệt cốt lõi giữa `squash` và `fixup` trong Interactive Rebase là gì?",
        "type": "single",
        "options": [
          {
            "text": "squash giữ lại thông điệp cũ để bạn biên tập, còn fixup tự động vứt bỏ thông điệp cũ mà không cần mở editor",
            "correct": true
          },
          {
            "text": "squash xóa tệp, fixup giữ tệp",
            "correct": false
          },
          {
            "text": "fixup chỉ dùng cho nhánh main, squash dùng cho mọi nhánh",
            "correct": false
          },
          {
            "text": "Hai chỉ thị này hoàn toàn giống hệt nhau không có gì khác",
            "correct": false
          }
        ],
        "explanation": "`fixup` tương tự như `squash` về mặt mã nguồn, nhưng tự động loại bỏ thông điệp thừa để quy trình diễn ra nhanh chóng."
      }
    ]
  }
};
export default lesson;
