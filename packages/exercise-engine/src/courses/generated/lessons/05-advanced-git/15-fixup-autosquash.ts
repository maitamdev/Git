import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "15-fixup-autosquash",
  "moduleId": "05-advanced-git",
  "metadata": {
    "id": "15-fixup-autosquash",
    "title": "Fixup & Autosquash",
    "level": "advanced",
    "duration": 30,
    "xp": 95,
    "prerequisites": [
      "14-squash-commit"
    ],
    "objectives": [
      "Phân biệt thông điệp của commit `fixup` với `squash`.",
      "Hiểu `git commit --fixup <commit-hash>` tạo commit vá được liên kết với commit mục tiêu.",
      "Nhận biết cách `git rebase -i --autosquash` sắp xếp todo list và vẫn cần người dùng review.",
      "Có thể bật autosquash cho riêng repository bằng cấu hình `rebase.autoSquash`."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "fixup",
      "autosquash",
      "git commit --fixup",
      "git rebase --autosquash",
      "tu dong gop commit",
      "fast editing"
    ],
    "commands": [
      "git status",
      "git log --oneline"
    ]
  },
  "content": "# Fixup & Autosquash\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ sự tiện lợi vượt trội của chỉ thị `fixup` so với `squash` khi không cần giữ lại thông điệp thừa.\n- Sử dụng câu lệnh `git commit --fixup <commit-hash>` để tự động tạo commit sửa lỗi gắn nhãn.\n- Kích hoạt tính năng kỳ diệu `git rebase -i --autosquash` để Git tự động sắp xếp và gộp commit tự động.\n- Có thể bật autosquash cho kho hiện tại bằng cấu hình cục bộ nếu muốn dùng mặc định.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Fixup Commit (git commit --fixup)\n- **Nói dễ hiểu**: Commit chuyên dụng để vá lỗi cho một commit cũ trong quá khứ, tự động gắn nhãn tiền tố `fixup!`.\n- **Ví dụ**: Dùng `git commit --fixup a1b2c3d` để đánh dấu bản sửa lỗi này sẽ được nạp vào commit `a1b2c3d`.\n- **Đừng nhầm**: Tạo commit fixup mới chỉ là bước đánh dấu, bạn vẫn cần chạy rebase để Git thực sự gộp nó vào commit đích.\n\n### Autosquash (--autosquash)\n- **Nói dễ hiểu**: Tính năng tự động quét các commit có nhãn fixup hoặc squash và xếp chúng về đúng vị trí trong Todo List.\n- **Ví dụ**: Chạy `git rebase -i --autosquash HEAD~5` để Git tự đổi chỉ thị thành fixup và đặt dưới commit gốc tương ứng.\n- **Đừng nhầm**: Nếu không thêm cờ `--autosquash` (hoặc cấu hình mặc định), commit fixup sẽ chỉ đứng nguyên vị trí như commit thường.\n\n### Auto-Squash Config (rebase.autoSquash)\n- **Nói dễ hiểu**: Thiết lập trong Git config giúp tính năng autosquash luôn tự động chạy mỗi khi bạn dùng `git rebase -i`.\n- **Ví dụ**: Gõ `git config --global rebase.autoSquash true` một lần duy nhất để không phải gõ cờ thủ công nữa.\n- **Đừng nhầm**: Cấu hình này chỉ áp dụng cho interactive rebase (`-i`), không ảnh hưởng đến các lệnh merge thông thường.\n\n---\n\n## 📖 Định nghĩa\n`git commit --fixup <commit>` tạo commit vá có thông điệp bắt đầu bằng `fixup!` và tiêu đề của commit mục tiêu, ví dụ `fixup! feat: add validation`. `git rebase -i --autosquash <base>` sắp xếp commit đó cạnh commit đích và đổi hành động trong todo list thành `fixup`; bạn vẫn xem lại và lưu todo list trước khi Git viết lại lịch sử.\n\n---\n\n## 💡 Tại sao cần\nKhi phát hiện lỗi trong commit cũ, `git commit --fixup <hash>` tạo commit có thông điệp liên kết tới commit mục tiêu. Khi chạy `git rebase -i --autosquash <base>`, Git sắp xếp lại todo list; bạn vẫn cần xem lại danh sách trước khi lưu và hoàn tất rebase.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung người thư ký dán một mảnh giấy ghi chú màu vàng \"Kèm hồ sơ số 3\" lên tờ biên lai mới. Khi bấm nút sắp xếp tự động, cánh tay robot tự động tìm ngăn số 3, nhét tờ biên lai vào và kẹp kín lại ngăn nắp mà không cần xới tung cả tủ hồ sơ.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nQuy trình tự động hóa với Autosquash:\n1. Sửa code lỗi của commit C2 (hash 7a8b9c)\n2. Gõ lệnh: git commit --fixup 7a8b9c\n   Git sinh commit mới: \"fixup! feat: user authentication\"\n\n3. Gõ lệnh: git rebase -i --autosquash HEAD~5\n   Git tự động xếp lại Todo List không cần kéo thả thủ công:\n   pick 7a8b9c feat: user authentication\n   fixup 1e2f3a fixup! feat: user authentication  <-- Tự động chèn và đổi lệnh!\n   pick 4b5c6d feat: payment gateway\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nKỹ sư Linh tìm thấy lỗi trong commit `d3e4f5a`. Linh tạo commit vá bằng `git commit --fixup d3e4f5a`, rồi chạy `git rebase -i --autosquash d3e4f5a~1`. Git đặt commit vá cạnh commit đích và đánh dấu `fixup`; Linh kiểm tra todo list rồi mới lưu để chạy rebase.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit commit --fixup <commit-hash>\ngit rebase -i --autosquash <base-hash>\ngit config rebase.autoSquash true\n```\n\n---\n\n## 🔍 Giải thích command\n- `git commit --fixup <hash>`: Tạo commit với tiền tố đặc biệt `fixup! <thông-điệp-cũ>` trỏ thẳng tới commit cần sửa.\n- `git rebase -i --autosquash <base>`: Sắp xếp commit fixup cạnh commit đích và đổi hành động trong todo list.\n- `git config rebase.autoSquash true`: Bật mặc định cho kho hiện tại; bỏ `--global` để không đổi cấu hình mọi dự án trên máy.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Quên `--autosquash` khi chưa bật config**: Commit fixup có thể không được đưa cạnh commit đích trong todo list.\n2. **Truyền nhầm commit hash**: Chỉ định sai hash khiến bản vá bị gộp nhầm vào một tính năng không liên quan.\n3. **Rebase trên commit đã push**: Tránh viết lại lịch sử commit đã được chia sẻ công khai lên nhánh chính của cả đội.\n\n---\n\n## 🧪 Lab thực hành\nBài thực hành này cần Git thật vì simulator chưa hỗ trợ interactive rebase/autosquash. Dùng repo thử nghiệm riêng và không dùng nhánh đã chia sẻ.\n1. Tạo commit A, commit B, commit C liên tiếp trên kho chứa thử nghiệm.\n2. Sửa đổi nội dung tệp tin liên quan đến commit A.\n3. Chạy `git commit --fixup <hash-của-commit-A>`.\n4. Chạy `git rebase -i --autosquash HEAD~4`. Kiểm tra todo list xem commit vá đã được xếp cạnh commit đích với hành động `fixup` chưa.\n5. Lưu file và dùng `git log --oneline` để xác nhận commit A đã được vá tự động.\n\n---\n\n## 💡 Hint & mẹo\n> Muốn đặt mặc định, chạy `git config rebase.autoSquash true` trong kho thử nghiệm. Kiểm tra todo list trước khi lưu vì autosquash vẫn cần rebase chạy.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Tạo commit vá bằng `git commit --fixup` và nhận biết vị trí/action do `--autosquash` gợi ý.\n- Kiểm tra todo list trước khi lưu; xử lý conflict nếu Git dừng trong lúc phát lại commit.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài kiểm tra trắc nghiệm dưới đây về tính năng Fixup và Autosquash.\n\n---\n\n## 🚀 Thử thách nâng cao\nNêu sự khác biệt giữa `git commit --fixup` và `git commit --squash` trong cơ chế autosquash.\n\n---\n\n## 📝 Tổng kết\n- `fixup` gộp thay đổi vào commit trước và tự động loại bỏ thông điệp dư thừa.\n- `git commit --fixup` gắn nhãn đích đến để `--autosquash` tự động xử lý.\n- Bật `rebase.autoSquash true` giúp tăng tốc tối đa quy trình dọn dẹp lịch sử Git cá nhân.\n",
  "quiz": {
    "id": "quiz-05-15-fixup-autosquash",
    "title": "Trắc nghiệm: Fixup & Autosquash",
    "questions": [
      {
        "id": "q1",
        "question": "Thông điệp mặc định của một commit được tạo ra bằng lệnh `git commit --fixup <commit-hash>` có định dạng như thế nào?",
        "type": "single",
        "options": [
          {
            "text": "fixup! <tiêu đề của commit mục tiêu>",
            "correct": true
          },
          {
            "text": "squash! <tiêu đề của commit mục tiêu>",
            "correct": false
          },
          {
            "text": "auto: sửa đổi commit cũ",
            "correct": false
          },
          {
            "text": "Một chuỗi ngẫu nhiên không có quy luật",
            "correct": false
          }
        ],
        "explanation": "Tiền tố `fixup! ` giúp cờ `--autosquash` nhận biết chính xác commit này cần được gộp vào đâu."
      },
      {
        "id": "q2",
        "question": "Khi bạn chạy `git rebase -i --autosquash`, Git sẽ tự động làm thao tác nào trong Todo List?",
        "type": "single",
        "options": [
          {
            "text": "Tự động di chuyển commit fixup lên ngay dưới commit mục tiêu và đổi chỉ thị thành fixup",
            "correct": true
          },
          {
            "text": "Tự động xóa sạch toàn bộ các commit trong danh sách",
            "correct": false
          },
          {
            "text": "Tự động gửi email thông báo cho đồng nghiệp",
            "correct": false
          },
          {
            "text": "Tự động đẩy code lên máy chủ GitHub",
            "correct": false
          }
        ],
        "explanation": "Autosquash tự động quét các tiền tố `fixup!` và `squash!` để tái cấu trúc Todo list thông minh."
      },
      {
        "id": "q3",
        "question": "Lệnh nào đặt autosquash làm mặc định cho repository hiện tại?",
        "type": "single",
        "options": [
          {
            "text": "git config rebase.autoSquash true",
            "correct": true
          },
          {
            "text": "git config --global git.alwaysFixup true",
            "correct": false
          },
          {
            "text": "git set autosquash on",
            "correct": false
          },
          {
            "text": "git enable auto-rebase",
            "correct": false
          }
        ],
        "explanation": "`git config rebase.autoSquash true` ghi cấu hình vào repository hiện tại; bỏ `--global` để không đổi thiết lập cho mọi dự án trên máy."
      },
      {
        "id": "q4",
        "question": "Trường hợp sử dụng lý tưởng nhất của `git commit --fixup` trong thực tế là gì?",
        "type": "single",
        "options": [
          {
            "text": "Khi phát hiện một lỗi nhỏ trong một commit cũ sâu trong lịch sử mà muốn sửa ngay mà không làm xáo trộn công việc",
            "correct": true
          },
          {
            "text": "Khi muốn xóa toàn bộ lịch sử của dự án",
            "correct": false
          },
          {
            "text": "Khi muốn tạo một nhánh hoàn toàn mới",
            "correct": false
          },
          {
            "text": "Khi chuẩn bị tắt máy tính đi về nhà",
            "correct": false
          }
        ],
        "explanation": "Fixup tạo commit vá để ghép vào commit đích khi bạn kiểm tra và chạy interactive rebase."
      },
      {
        "id": "q5",
        "question": "Điểm khác biệt quan trọng giữa commit `--fixup` và commit `--squash` khi tự động gộp bằng autosquash là gì?",
        "type": "single",
        "options": [
          {
            "text": "Fixup tự động vứt bỏ commit message vá lỗi, còn squash giữ lại message để bạn biên tập lại",
            "correct": true
          },
          {
            "text": "Fixup chỉ sửa đổi một dòng code, còn squash sửa toàn bộ file",
            "correct": false
          },
          {
            "text": "Fixup chạy được trên remote, còn squash chỉ chạy được ở local",
            "correct": false
          },
          {
            "text": "Không có bất kỳ sự khác biệt nào giữa hai cờ này",
            "correct": false
          }
        ],
        "explanation": "Fixup được thiết kế cho các bản vá nhanh không cần ghi chú thêm, còn squash cho phép kết hợp các mô tả lại."
      }
    ]
  }
};
export default lesson;
