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
      "Hiểu rõ sự tiện lợi vượt trội của chỉ thị `fixup` so với `squash` khi không cần giữ lại thông điệp thừa.",
      "Sử dụng câu lệnh `git commit --fixup <commit-hash>` để tự động tạo commit sửa lỗi gắn nhãn.",
      "Kích hoạt tính năng kỳ diệu `git rebase -i --autosquash` để Git tự động sắp xếp và gộp commit tự động.",
      "Cấu hình Git tự động bật autosquash vĩnh viễn trong tệp `.gitconfig`."
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
      "git commit --fixup <commit-hash>",
      "git rebase -i --autosquash <base-hash>",
      "git config --global rebase.autoSquash true"
    ]
  },
  "content": "# Fixup & Autosquash\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ sự tiện lợi vượt trội của chỉ thị `fixup` so với `squash` khi không cần giữ lại thông điệp thừa.\n- Sử dụng câu lệnh `git commit --fixup <commit-hash>` để tự động tạo commit sửa lỗi gắn nhãn.\n- Kích hoạt tính năng kỳ diệu `git rebase -i --autosquash` để Git tự động sắp xếp và gộp commit tự động.\n- Cấu hình Git tự động bật autosquash vĩnh viễn trong tệp cấu hình toàn cục.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Fixup Commit (git commit --fixup)\n- **Nói dễ hiểu**: Commit chuyên dụng để vá lỗi cho một commit cũ trong quá khứ, tự động gắn nhãn tiền tố `fixup!`.\n- **Ví dụ**: Dùng `git commit --fixup a1b2c3d` để đánh dấu bản sửa lỗi này sẽ được nạp vào commit `a1b2c3d`.\n- **Đừng nhầm**: Tạo commit fixup mới chỉ là bước đánh dấu, bạn vẫn cần chạy rebase để Git thực sự gộp nó vào commit đích.\n\n### Autosquash (--autosquash)\n- **Nói dễ hiểu**: Tính năng tự động quét các commit có nhãn fixup hoặc squash và xếp chúng về đúng vị trí trong Todo List.\n- **Ví dụ**: Chạy `git rebase -i --autosquash HEAD~5` để Git tự đổi chỉ thị thành fixup và đặt dưới commit gốc tương ứng.\n- **Đừng nhầm**: Nếu không thêm cờ `--autosquash` (hoặc cấu hình mặc định), commit fixup sẽ chỉ đứng nguyên vị trí như commit thường.\n\n### Auto-Squash Config (rebase.autoSquash)\n- **Nói dễ hiểu**: Thiết lập trong Git config giúp tính năng autosquash luôn tự động chạy mỗi khi bạn dùng `git rebase -i`.\n- **Ví dụ**: Gõ `git config --global rebase.autoSquash true` một lần duy nhất để không phải gõ cờ thủ công nữa.\n- **Đừng nhầm**: Cấu hình này chỉ áp dụng cho interactive rebase (`-i`), không ảnh hưởng đến các lệnh merge thông thường.\n\n---\n\n## 📖 Định nghĩa\n`fixup` và `autosquash` là cặp tính năng tự động hóa trong Git giúp sửa lỗi commit cũ: `fixup` đánh dấu commit vá lỗi cần gộp, còn `autosquash` tự động định vị và gộp thẳng vào commit gốc mà không cần chỉnh sửa thủ công.\n\n---\n\n## 💡 Tại sao cần\nKhi phát hiện lỗi trong một commit cũ sâu trong lịch sử, thay vì phải rebase rồi tự tay kéo dòng commit và đổi lệnh bằng tay, cặp đôi này làm toàn bộ quy trình chỉ trong một câu lệnh với độ chính xác tuyệt đối.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung người thư ký dán một mảnh giấy ghi chú màu vàng \"Kèm hồ sơ số 3\" lên tờ biên lai mới. Khi bấm nút sắp xếp tự động, cánh tay robot tự động tìm ngăn số 3, nhét tờ biên lai vào và kẹp kín lại ngăn nắp mà không cần xới tung cả tủ hồ sơ.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nQuy trình tự động hóa với Autosquash:\n1. Sửa code lỗi của commit C2 (hash 7a8b9c)\n2. Gõ lệnh: git commit --fixup 7a8b9c\n   Git sinh commit mới: \"fixup! feat: user authentication\"\n\n3. Gõ lệnh: git rebase -i --autosquash HEAD~5\n   Git tự động xếp lại Todo List không cần kéo thả thủ công:\n   pick 7a8b9c feat: user authentication\n   fixup 1e2f3a fixup! feat: user authentication  <-- Tự động chèn và đổi lệnh!\n   pick 4b5c6d feat: payment gateway\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nKỹ sư Linh sửa một lỗi chính tả trong commit có mã `d3e4f5a`. Linh gõ `git commit --fixup d3e4f5a`, rồi chạy `git rebase -i --autosquash d3e4f5a~1`. Git tự động kéo commit vá lỗi vào ngay sau commit tính thuế và đổi thành `fixup`. Linh chỉ cần lưu lại là lịch sử sạch sẽ hoàn toàn.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit commit --fixup <commit-hash>\ngit rebase -i --autosquash <base-hash>\ngit config --global rebase.autoSquash true\n```\n\n---\n\n## 🔍 Giải thích command\n- `git commit --fixup <hash>`: Tạo commit với tiền tố đặc biệt `fixup! <thông-điệp-cũ>` trỏ thẳng tới commit cần sửa.\n- `git rebase -i --autosquash <base>`: Kích hoạt rebase tự động nhận diện các commit fixup và sắp xếp vị trí tương ứng.\n- `git config --global rebase.autoSquash true`: Cấu hình Git luôn tự động bật tính năng autosquash mỗi khi chạy interactive rebase.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Quên cờ `--autosquash` khi chạy rebase**: Khiến commit fixup nằm nguyên ở đuôi danh sách như commit thông thường nếu chưa bật config toàn cục.\n2. **Truyền nhầm commit hash**: Chỉ định sai hash khiến bản vá bị gộp nhầm vào một tính năng không liên quan.\n3. **Rebase trên commit đã push**: Tránh viết lại lịch sử commit đã được chia sẻ công khai lên nhánh chính của cả đội.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.\n1. Tạo commit A, commit B, commit C liên tiếp trên kho chứa thử nghiệm.\n2. Sửa đổi nội dung tệp tin liên quan đến commit A.\n3. Chạy `git commit --fixup <hash-của-commit-A>`.\n4. Chạy `git rebase -i --autosquash HEAD~4`. Quan sát Git tự động sắp xếp vị trí và chuyển lệnh thành fixup.\n5. Lưu file và dùng `git log --oneline` để xác nhận commit A đã được vá tự động.\n\n---\n\n## 💡 Hint & mẹo\n> Chạy `git config --global rebase.autoSquash true` một lần để không bao giờ phải gõ cờ `--autosquash` dài dòng trong mỗi lần rebase nữa.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Vận hành thành thạo bộ đôi `git commit --fixup` và `git rebase --autosquash` để sửa nhanh commit cũ.\n- Tự động hóa quy trình dọn dẹp lịch sử một cách chính xác mà không cần thao tác biên tập thủ công.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài kiểm tra trắc nghiệm dưới đây về tính năng Fixup và Autosquash.\n\n---\n\n## 🚀 Thử thách nâng cao\nNêu sự khác biệt giữa `git commit --fixup` và `git commit --squash` trong cơ chế autosquash.\n\n---\n\n## 📝 Tổng kết\n- `fixup` gộp thay đổi vào commit trước và tự động loại bỏ thông điệp dư thừa.\n- `git commit --fixup` gắn nhãn đích đến để `--autosquash` tự động xử lý.\n- Bật `rebase.autoSquash true` giúp tăng tốc tối đa quy trình dọn dẹp lịch sử Git cá nhân.\n",
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
        "question": "Lệnh cấu hình nào giúp bạn luôn luôn kích hoạt tính năng autosquash mà không cần phải gõ cờ `--autosquash` mỗi lần rebase?",
        "type": "single",
        "options": [
          {
            "text": "git config --global rebase.autoSquash true",
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
        "explanation": "Cấu hình `rebase.autoSquash true` trong config toàn cục biến hành vi autosquash thành mặc định."
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
        "explanation": "Fixup + Autosquash là cặp đôi sửa lỗi hồi tố nhanh nhất và an toàn nhất trong Git."
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
