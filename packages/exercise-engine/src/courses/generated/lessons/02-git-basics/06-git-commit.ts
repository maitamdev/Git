import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "06-git-commit",
  "moduleId": "02-git-basics",
  "metadata": {
    "id": "06-git-commit",
    "title": "Lưu snapshot với git commit",
    "level": "beginner",
    "duration": 30,
    "xp": 100,
    "prerequisites": [
      "05-git-add"
    ],
    "objectives": [
      "Tạo commit từ thay đổi đã staged.",
      "Viết lời nhắn ngắn bằng `git commit -m`.",
      "Phân biệt commit trên máy với push lên dịch vụ trực tuyến."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "first-commit"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git commit",
      "snapshot",
      "commit message"
    ],
    "commands": [
      "git status",
      "git add <file>",
      "git commit -m \"feat: your commit message\"",
      "git log --oneline"
    ]
  },
  "content": "# Lưu một mốc bằng `git commit`\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ bản chất của commit là một ảnh chụp snapshot toàn vẹn của dự án tại một thời điểm.\n- Nắm vững cú pháp tạo commit với thông điệp ngắn gọn qua cờ `-m`.\n- Phân biệt rành mạch giữa commit cục bộ (Local Repository) và việc đồng bộ lên dịch vụ từ xa (Remote Push).\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Commit — mốc lưu trong lịch sử\n- **Nói dễ hiểu:** Bản ghi snapshot bất biến lưu lại toàn bộ trạng thái mã nguồn đã được tuyển chọn trong Staging Area.\n- **Ví dụ:** Sau khi hoàn thành một chức năng hoặc sửa một lỗi, bạn tạo commit để đánh dấu cột mốc hoàn thành.\n- **Đừng nhầm:** Commit chỉ chụp những gì đang nằm trong Staging Area, hoàn toàn bỏ qua các thay đổi chưa được add.\n\n### Staged — đã chọn cho commit\n- **Nói dễ hiểu:** Tập hợp các tệp và dòng code đã được nạp sẵn vào khay chờ thông qua lệnh `git add`.\n- **Ví dụ:** `git status` báo `main.js` nằm trong danh sách \"Changes to be committed\" với màu xanh lá cây.\n- **Đừng nhầm:** Staged chỉ mới là hàng chờ trước quầy; chỉ khi gọi `git commit` thì giao dịch snapshot mới thực sự hoàn tất.\n\n### Commit message — lời nhắn của mốc\n- **Nói dễ hiểu:** Đoạn văn bản súc tích giải thích rõ ràng \"Tại sao bạn lại thực hiện thay đổi này?\" cho người đọc lịch sử.\n- **Ví dụ:** `git commit -m \"fix(auth): resolve session timeout issue on mobile\"` giải thích rõ lỗi gì được sửa ở đâu.\n- **Đừng nhầm:** Commit message không cần liệt kê từng dòng code chi tiết, mà cần nêu bật ý nghĩa và mục đích của mốc thay đổi.\n\n---\n\n## 📖 Định nghĩa\n`git commit` là hành động niêm phong toàn bộ nội dung đang có trong Staging Area thành một mốc lịch sử vĩnh viễn (snapshot). Mỗi commit đại diện cho một trạng thái hoàn chỉnh của dự án tại một thời điểm, được gắn mã định danh băm SHA-1/SHA-256 duy nhất cùng metadata tác giả, ngày giờ và thông điệp giải thích lý do thay đổi.\n\n---\n\n## 🤔 Tại sao cần?\nNếu không có commit, mã nguồn chỉ là một dòng chảy vô định không điểm tựa. Commit biến quá trình lập trình thành chuỗi các bước đi vững chắc: bạn có thể quay lại bất kỳ thời điểm nào trong quá khứ nếu phát sinh lỗi, so sánh sự thay đổi giữa các phiên bản, và cho phép nhiều kỹ sư cùng làm việc mà không sợ giẫm chân lên nhau. Mỗi commit là một hợp đồng bảo hiểm cho sản phẩm của bạn.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung Staging Area là thùng hàng bạn vừa nhặt đồ vào, thì `git commit` chính là hành động dán băng dính niêm phong, in mã vạch theo dõi và dán nhãn ghi chú nội dung thùng hàng gửi vào kho lưu trữ vĩnh viễn. Thao tác này hoàn toàn diễn ra trên máy cá nhân của bạn, biệt lập với máy chủ từ xa cho đến khi bạn quyết định đẩy (push) lên mạng.\n\n---\n\n## 🖼 Sơ đồ\n```text\nThư mục làm việc (Working Tree)\n       │\n       ▼  git add <tệp>\nVùng chuẩn bị (Staging Area / Index)\n       │\n       ▼  git commit -m \"feat: thông điệp\"\nKho lưu trữ cục bộ (.git repository) ──► Tạo Commit Snapshot [Hash: a1b2c3d]\n       │\n       ▼  git push (học ở Level 4)\nMáy chủ từ xa (GitHub / GitLab)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nSau khi hoàn thiện chức năng tính tổng giỏ hàng trong `cart.js` và thêm kiểm thử trong `cart.test.js`, bạn đã add cả hai file vào vùng đệm. Bạn chạy lệnh `git commit -m \"feat(cart): calculate total price with tax\"` để lưu lại mốc son này. Giờ đây bạn hoàn toàn an tâm thử nghiệm các tính năng tiếp theo mà không sợ mất đi phần code đã chạy chuẩn.\n\n---\n\n## 💻 Command\n```bash\ngit status\ngit add main.js\ngit commit -m \"feat: initialize main app\"\ngit log --oneline\n```\n\n---\n\n## 🔍 Giải thích command\n- `git status`: Bước tiên quyết để đảm bảo những gì sắp commit nằm chính xác trong mục \"Changes to be committed\".\n- `git commit -m \"<thông-điệp>\"`: Niêm phong snapshot từ Staging Area, gán lời nhắn mô tả trực tiếp mà không cần mở trình soạn thảo văn bản mặc định (Vim/Nano).\n- `git log --oneline`: Xem nhanh lịch sử các mốc commit trên một dòng gọn gàng, kiểm chứng commit mới vừa được sinh ra.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Viết commit message vô nghĩa**: Đặt những lời nhắn cẩu thả như \"fix\", \"update\", \"asdf\", \"done\" khiến đồng nghiệp và chính bạn sau này không thể hiểu mốc đó làm gì khi cần gỡ lỗi.\n2. **Commit khi chưa add gì vào Staging Area**: Chạy `git commit` và gặp thông báo \"nothing added to commit but untracked files present\" do quên chạy `git add`.\n3. **Lầm tưởng commit là đã đẩy lên GitHub**: Commit chỉ lưu tại máy cá nhân; nếu hỏng máy tính hoặc xóa thư mục trước khi push, toàn bộ commit cục bộ sẽ mất.\n\n---\n\n## 🧪 Lab\n1. Tạo hoặc chỉnh sửa tệp `main.js` với một đoạn mã logic đơn giản.\n2. Chạy `git status` để quan sát thay đổi của tệp.\n3. Chạy `git add main.js` để đưa tệp vào Staging Area.\n4. Chạy lại `git status` và xác nhận `main.js` đã xuất hiện trong \"Changes to be committed\" màu xanh lá cây.\n5. Chạy lệnh: `git commit -m \"feat: initialize main app\"`.\n6. Chạy `git log --oneline` để chiêm ngưỡng mốc snapshot đầu tiên trong lịch sử kho mã nguồn.\n\n---\n\n## 💡 Hint\n> Một commit lý tưởng nên là \"Atomic Commit\" (nguyên tử): giải quyết trọn vẹn một vấn đề duy nhất, kèm kiểm thử và thông điệp rõ ràng!\n\n---\n\n## ✅ Validation\n- Kiểm tra `git status` sau khi commit thấy thông báo \"nothing to commit, working tree clean\".\n- Lệnh `git log --oneline` hiển thị commit mới với mã hash và đúng thông điệp đã nhập.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để nắm vững quy trình tạo commit và nguyên tắc phân biệt giữa lưu cục bộ và đẩy lên máy chủ.\n\n---\n\n## 🔥 Challenge\nHãy giải thích tại sao trong mô hình phân tán của Git, bạn có thể ngồi trên máy bay không có kết nối Internet suốt 10 tiếng đồng hồ mà vẫn có thể tạo hàng chục commit liên tiếp mà không gặp bất kỳ trở ngại nào?\n\n---\n\n## 📚 Tổng kết\n- `git commit` tạo ảnh chụp snapshot bất biến từ những nội dung đã được tuyển chọn trong Staging Area.\n- Thông điệp commit (`-m`) là công cụ giao tiếp quan trọng giữa các kỹ sư phần mềm trong dự án.\n- Commit cục bộ lưu hoàn toàn trong `.git` của máy bạn, độc lập với việc kết nối hay push lên GitHub.\n",
  "quiz": {
    "id": "quiz-02-06-git-commit",
    "title": "Trắc nghiệm chuyên sâu: Bản chất lệnh git commit",
    "questions": [
      {
        "id": "q1",
        "question": "Khi bạn chạy `git commit`, Git tạo ra điều gì?",
        "type": "single",
        "options": [
          {
            "text": "Một commit ghi lại snapshot của dự án dựa trên nội dung trong Staging Area",
            "correct": true
          },
          {
            "text": "Một bản ghi chứa các dòng code bị xóa khỏi ổ cứng",
            "correct": false
          },
          {
            "text": "Một lệnh gửi email tự động tới ban giám đốc công ty",
            "correct": false
          },
          {
            "text": "Một tệp sao lưu nén định dạng zip đặt ngoài màn hình Desktop",
            "correct": false
          }
        ],
        "explanation": "Git tạo commit từ trạng thái trong Staging Area. Thay đổi chưa staged không được thêm vào commit này."
      },
      {
        "id": "q2",
        "question": "Lệnh nào dưới đây tạo commit mới với thông điệp ngắn gọn mà không cần mở trình soạn thảo văn bản?",
        "type": "single",
        "options": [
          {
            "text": "git commit -m \"thông điệp\"",
            "correct": true
          },
          {
            "text": "git commit --text \"thông điệp\"",
            "correct": false
          },
          {
            "text": "git commit -s \"thông điệp\"",
            "correct": false
          },
          {
            "text": "git save \"thông điệp\"",
            "correct": false
          }
        ],
        "explanation": "Cờ `-m` viết tắt của `--message` cho phép truyền thông điệp commit trực tiếp trên dòng lệnh."
      },
      {
        "id": "q3",
        "question": "Lệnh `git commit -am \"fix bug\"` có hạn chế quan trọng nào mà lập trình viên cần lưu ý?",
        "type": "single",
        "options": [
          {
            "text": "Không tự động stage được các tệp tin mới tạo ở trạng thái Untracked",
            "correct": true
          },
          {
            "text": "Lệnh này chỉ chạy được trên hệ điều hành macOS",
            "correct": false
          },
          {
            "text": "Lệnh này xóa sạch toàn bộ lịch sử commit trước đó",
            "correct": false
          },
          {
            "text": "Lệnh này bắt buộc phải có kết nối Internet mới chạy được",
            "correct": false
          }
        ],
        "explanation": "Cờ `-a` chỉ tự động stage các tệp Modified đã được theo dõi, hoàn toàn bỏ qua các tệp Untracked."
      },
      {
        "id": "q4",
        "question": "Sau khi chạy lệnh git commit trên máy cá nhân, mã nguồn của bạn đã nằm ở đâu?",
        "type": "single",
        "options": [
          {
            "text": "Được ghi vào kho Git cục bộ; chưa tự gửi lên GitHub",
            "correct": true
          },
          {
            "text": "Đã tự động xuất hiện trên trang web GitHub của cả nhóm",
            "correct": false
          },
          {
            "text": "Đã được gửi tới kho lưu trữ trung tâm của Google",
            "correct": false
          },
          {
            "text": "Đã bị mã hóa và gửi vào hòm thư điện tử",
            "correct": false
          }
        ],
        "explanation": "Git commit chỉ ghi nhận dữ liệu vào cơ sở dữ liệu cục bộ; cần dùng lệnh `git push` để đẩy lên máy chủ GitHub."
      },
      {
        "id": "q5",
        "question": "Bạn sửa một tệp mới và muốn đưa nó vào commit. Cần làm gì trước?",
        "type": "single",
        "options": [
          {
            "text": "Chạy `git add <file>` để chọn tệp, rồi mới commit",
            "correct": true
          },
          {
            "text": "Chạy `git push` để tệp tự được commit",
            "correct": false
          },
          {
            "text": "Đổi tên tệp thành `commit.txt`",
            "correct": false
          },
          {
            "text": "Chỉ cần lưu tệp trong trình soạn thảo",
            "correct": false
          }
        ],
        "explanation": "Tệp mới chưa được chọn tự động; `git add` đưa phiên bản của nó vào vùng chuẩn bị."
      },
      {
        "id": "q6",
        "question": "Lệnh nào giúp bạn kiểm tra xem commit mới đã được tạo chưa?",
        "type": "single",
        "options": [
          {
            "text": "`git log --oneline`",
            "correct": true
          },
          {
            "text": "`git status --delete`",
            "correct": false
          },
          {
            "text": "`git push --check`",
            "correct": false
          },
          {
            "text": "`git commit --list`",
            "correct": false
          }
        ],
        "explanation": "`git log --oneline` liệt kê các commit đã lưu với lời nhắn ngắn gọn."
      }
    ]
  }
};
export default lesson;
