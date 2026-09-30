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
      "git rebase -i HEAD~<n>",
      "s <commit-hash> <message>",
      "squash <commit-hash> <message>",
      "git log --oneline -n 5"
    ]
  },
  "content": "# Squash Commit\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững khái niệm và kỹ thuật gộp commit (Squash Commit) trong Git.\n- Sử dụng chỉ thị `squash` (hoặc `s`) trong Interactive Rebase để gộp nhiều commit vụn vặt thành một khối.\n- Biên tập lại thông điệp commit kết hợp (Combined Commit Message) sao cho súc tích và mạch lạc.\n- Phân biệt sự khác biệt giữa chỉ thị `squash` (giữ lại message để chỉnh sửa) và `fixup` (bỏ qua message).\n\n---\n\n## 📖 Định nghĩa\n> Squash Commit (Gộp commit) là kỹ thuật nén và hợp nhất hai hoặc nhiều commit liên tiếp thành một commit duy nhất trong lịch sử Git. Khi sử dụng chỉ thị `squash` (hoặc viết tắt là `s`) trong Interactive Rebase, Git sẽ lấy toàn bộ các thay đổi mã nguồn của commit được đánh dấu squash gộp vào commit nằm ngay phía trước nó, sau đó mở cửa sổ soạn thảo tổng hợp chứa toàn bộ thông điệp của các commit thành phần để lập trình viên tự do viết lại một thông điệp cô đọng nhất.\n\n---\n\n## 🤔 Tại sao cần?\nTrong lúc lập trình, tư duy của bạn thường diễn ra theo từng bước nhỏ: thử nghiệm giải pháp, sửa lỗi cú pháp, bổ sung trường dữ liệu, tinh chỉnh giao diện. Điều này sinh ra một chuỗi 5-10 commit vụn vặt không có giá trị độc lập. Nếu đưa toàn bộ đống vụn này vào nhánh chính, lịch sử dự án sẽ bị rác và rất khó tra cứu sau này. Kỹ thuật Squash Commit giúp bạn nén toàn bộ chuỗi vụn vặt đó thành một commit duy nhất hoàn chỉnh mang thông điệp chuẩn mực trước khi hợp nhất vào dòng chảy chính.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung bạn đang nhào bột nặn bánh mì. Bạn cho một nắm bột nhỏ vào âu, thêm một chút nước, rắc một chút men nở, rồi thêm một nhúm muối (từng commit vụn vặt). Khi chuẩn bị đem vào lò nướng, bạn không nướng riêng từng hạt muối hay giọt nước rời rạc. Bạn dùng tay nhào nặn tất cả các thành phần đó lại với nhau thành một khối bột bánh mì dẻo dai, tròn trịa duy nhất (`squash commit`). Chiếc bánh mì nướng ra lò là một sản phẩm hoàn chỉnh và thơm ngon.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCơ chế gộp commit bằng squash:\nTrước khi squash (3 commit vụn):\nC1 ──► C2 (\"wip cart\") ──► C3 (\"fix cart css\") ──► C4 (\"cart ready\")\n\nTrong Todo List:\npick C2 wip cart\nsquash C3 fix cart css\nsquash C4 cart ready\n\nSau khi hoàn tất:\nC1 ──► C_new (\"feat: complete shopping cart module\") (Một commit duy nhất!)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKỹ sư Nam tạo 3 commit trên nhánh cá nhân: commit 1 có nội dung tạo form đăng ký, commit 2 thêm kiểm tra email hợp lệ, commit 3 sửa màu sắc nút submit. Chuẩn bị gửi Pull Request, Nam chạy lệnh: `git rebase -i HEAD~3`. Trong tệp todo list, Nam giữ dòng đầu tiên là `pick`, đổi hai dòng sau thành `squash` (hoặc `s`). Khi lưu lại, Git hiển thị màn hình tổng hợp chứa cả 3 thông điệp cũ. Nam xóa sạch các dòng rác và viết lại tiêu đề duy nhất: \"feat: add user registration form with validation and styling\". Commit mới ra đời tinh gọn tuyệt đối.\n\n---\n\n## 💻 Command\n```bash\ngit rebase -i HEAD~<n>\ns <commit-hash> <message>\nsquash <commit-hash> <message>\ngit log --oneline -n 5\n```\n\n---\n\n## 🔍 Giải thích command\n- `squash <hash>`: Gộp commit này vào commit liền trước nó và giữ lại thông điệp trong trình soạn thảo tổng hợp.\n- `s <hash>`: Ký tự viết tắt tiện lợi của lệnh `squash` trong danh sách Todo List.\n- `git rebase -i`: Lệnh khởi động môi trường tương tác để thiết lập các chỉ thị squash.\n- `git log --oneline`: Kiểm tra lại kết quả gộp commit trên cây lịch sử.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Đặt chỉ thị `squash` ngay ở dòng đầu tiên của Todo List**:  Sẽ gây lỗi vì dòng đầu tiên không có commit nào nằm phía trước để gộp vào.\n2. **Quên xóa các dòng thông điệp commit rác trong cửa sổ tổng hợp**:  Khiến thông điệp cuối cùng chứa đầy những câu vụn vặt như \"fix typo\", \"temp\".\n3. **Squash nhầm các commit thuộc hai tính năng hoàn toàn khác nhau vào làm một commit khổng lồ.**: Squash nhầm các commit thuộc hai tính năng hoàn toàn khác nhau vào làm một commit khổng lồ.\n\n---\n\n## 🧪 Lab\n1. Tạo liên tiếp 3 commit nhỏ bổ sung từng dòng chữ vào tệp `notes.txt`.\n2. Chạy lệnh `git rebase -i HEAD~3`.\n3. Giữ dòng 1 là `pick`, đổi dòng 2 và 3 thành `s` hoặc `squash`.\n4. Lưu và đóng file. Trong màn hình tiếp theo, chỉnh sửa lại thông điệp commit thành một câu hoàn chỉnh.\n5. Dùng `git log --oneline` để xác nhận 3 commit cũ đã gộp thành 1 commit duy nhất.\n\n---\n\n## 💡 Hint\n> Nhớ nguyên tắc: Dòng đầu tiên trong Todo List luôn luôn phải là `pick` (hoặc reword/edit), không thể là `squash`.\n\n---\n\n## ✅ Validation\n- Gộp thành công nhiều commit thành một commit duy nhất và biên tập lại thông điệp chuẩn xác.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về kỹ thuật Squash Commit.\n\n---\n\n## 🔥 Challenge\nNêu sự khác biệt giữa việc tự tay squash bằng `git rebase -i` ở local và việc bấm nút \"Squash and merge\" trên giao diện GitHub.\n\n---\n\n## 📚 Tổng kết\n- Squash Commit kết hợp nhiều commit nhỏ thành một khối commit duy nhất hoàn chỉnh.\n- Chỉ thị `squash` (hoặc `s`) gộp mã nguồn vào commit phía trước và cho phép biên tập thông điệp tổng hợp.\n- Giúp lịch sử dự án cô đọng, dễ kiểm soát và không bị rác bởi các commit dở dang.\n",
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
        "explanation": "`squash` yêu cầu phải có một commit làm đích ở phía trước nó; dòng đầu tiên bắt buộc phải là một commit độc lập."
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
