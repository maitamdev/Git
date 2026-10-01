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
      "git commit -m \"feat: your commit message\"",
      "git commit -am \"fix: quick fix\""
    ]
  },
  "content": "# Lưu snapshot với git commit\n\n---\n\n## 🎯 Mục tiêu\n- Tạo một commit từ những thay đổi đã staged.\n- Viết lời nhắn ngắn mô tả thay đổi bằng `git commit -m`.\n- Phân biệt commit trên máy với việc gửi commit lên GitHub.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Commit — mốc lưu trong lịch sử\n- **Nói dễ hiểu:** Bản ghi lưu trạng thái đã chọn trong Staging Area.\n- **Ví dụ:** Tạo commit sau khi chọn các tệp sẽ đưa vào mốc.\n- **Đừng nhầm:** Commit thông thường chỉ lấy phần đã staged.\n\n### Commit message — lời nhắn của mốc\n- **Nói dễ hiểu:** Câu ngắn mô tả lý do hoặc nội dung chính của commit.\n- **Ví dụ:** `git commit -m \"docs: add setup guide\"`.\n- **Đừng nhầm:** Message giúp người đọc; nó không mô tả hết mọi dòng code.\n\n### `-a` — rút gọn cho tệp đã theo dõi\n- **Nói dễ hiểu:** Với `git commit -a`, Git tự chọn các tệp tracked đã sửa hoặc xóa.\n- **Ví dụ:** Dùng cho thay đổi của tệp cũ đã được theo dõi.\n- **Đừng nhầm:** Cờ này không tự đưa tệp mới untracked vào commit.\n\n---\n\n## 📖 Định nghĩa\n`git commit` ghi các thay đổi đã chọn trong Staging Area thành một mốc trong lịch sử Git. Bạn có thể thêm lời nhắn bằng `-m`. Commit được lưu trong repository trên máy; nó chưa tự gửi lên GitHub.\n\n---\n\n## 🤔 Tại sao cần?\nCommit giúp bạn chia công việc thành các mốc có thể xem lại. Một mốc nhỏ, tập trung thường dễ hiểu và dễ kiểm tra hơn một commit gom nhiều việc không liên quan.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy nghĩ commit như một mốc trong nhật ký dự án. `git add` chọn nội dung trước; `git commit` ghi lựa chọn đó thành mốc.\n\n---\n\n## 🖼 Sơ đồ\n```text\nTệp đang sửa ──git add──► Staging Area ──git commit──► Commit mới trên máy\n                                                    └──git push──► GitHub (bài sau)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn sửa `main.js`, xem `git status`, rồi chạy `git add main.js` để chọn tệp. Sau `git commit -m \"feat: add main page\"`, kiểm tra mốc mới bằng `git log --oneline`. Commit này vẫn đang ở máy bạn cho tới khi push.\n\n---\n\n## 💻 Command\n```bash\ngit commit -m \"feat: your commit message\"\ngit commit -am \"fix: quick fix\"\n```\n\n---\n\n## 🔍 Giải thích command\n- `git commit -m \"<thông-điệp>\"`: Tạo một commit mới từ các tệp tin đã nằm trong Staging Area kèm thông điệp mô tả tóm tắt ngắn gọn.\n- `git commit -am \"<thông-điệp>\"`: Phím tắt tự động stage tất cả các tệp Modified và tạo commit mà không cần chạy git add trước (không áp dụng cho tệp Untracked).\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Thông điệp commit vô nghĩa**:  Viết những câu như \"fix\", \"update\", \"asdfgh\" khiến đồng nghiệp và chính bạn sau này không thể hiểu commit đó làm gì.\n2. **Commit quá lớn**: Gom nhiều việc không liên quan làm mốc khó hiểu và khó xem lại.\n3. **Nghĩ commit đã lên mạng**: Commit được lưu trên máy; muốn chia sẻ cần push sau này.\n\n---\n\n## 🧪 Lab\n1. Tạo hoặc chỉnh sửa tệp `main.js` với nội dung mới.\n2. Đưa tệp vào Staging Area bằng lệnh `git add main.js`.\n3. Tạo commit đầu tiên bằng câu lệnh `git commit -m \"feat: initialize main app\"`.\n4. Kiểm tra lại bằng `git log --oneline` để thấy commit mới sinh ra.\n\n---\n\n## 💡 Hint\n> Một commit tốt nên tập trung vào một nhiệm vụ duy nhất và có thông điệp rõ ràng.\n\n---\n\n## ✅ Validation\n- Kiểm tra `git log` có xuất hiện commit với đúng thông điệp đã nhập.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để kiểm tra hiểu biết sâu sắc về câu lệnh git commit.\n\n---\n\n## 🔥 Challenge\nTạo một commit cho một thay đổi nhỏ rồi giải thích vì sao nó chưa xuất hiện trên GitHub.\n\n---\n\n## 📚 Tổng kết\n- `git commit` lưu thay đổi đã staged thành một mốc trong lịch sử.\n- `-m` thêm lời nhắn cho commit.\n- Commit trên máy chưa tự được push lên GitHub.\n",
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
