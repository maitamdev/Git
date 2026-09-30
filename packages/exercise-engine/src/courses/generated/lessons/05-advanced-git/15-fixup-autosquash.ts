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
  "content": "# Fixup & Autosquash\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ sự tiện lợi vượt trội của chỉ thị `fixup` so với `squash` khi không cần giữ lại thông điệp thừa.\n- Sử dụng câu lệnh `git commit --fixup <commit-hash>` để tự động tạo commit sửa lỗi gắn nhãn.\n- Kích hoạt tính năng kỳ diệu `git rebase -i --autosquash` để Git tự động sắp xếp và gộp commit tự động.\n- Cấu hình Git tự động bật autosquash vĩnh viễn trong tệp `.gitconfig`.\n\n---\n\n## 📖 Định nghĩa\n> `fixup` và `autosquash` là cặp đôi tính năng tự động hóa đỉnh cao trong Git giúp tối ưu hóa quy trình chỉnh sửa lịch sử. Chỉ thị `fixup` (hoặc `f`) gộp các thay đổi của commit hiện tại vào commit phía trước nhưng tự động vứt bỏ thông điệp của nó mà không làm gián đoạn bạn với cửa sổ soạn thảo. Khi kết hợp với cờ `git commit --fixup <target-hash>` và `git rebase -i --autosquash`, Git sẽ tự động tìm đúng commit cần sửa, di chuyển commit vá lỗi đến đúng vị trí và gộp hoàn toàn tự động chỉ với một cú nhấn Enter.\n\n---\n\n## 🤔 Tại sao cần?\nHãy tưởng tượng bạn đang có một chuỗi 10 commit và bạn phát hiện ra một lỗi nhỏ trong commit số 3 (cách đây 7 commit). Thay vì phải chạy `rebase -i`, đếm số lượng commit, cẩn thận kéo dòng vá lỗi lên đúng vị trí của commit số 3 và đổi từ pick thành fixup bằng tay một cách vất vả, cặp đôi `--fixup` và `--autosquash` làm toàn bộ các thao tác thủ công đó cho bạn chỉ trong 2 giây với độ chính xác 100%.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung một nhân viên văn thư đang quản lý một tủ hồ sơ chứa 10 tập tài liệu đánh số từ 1 đến 10. Khi phát hiện một tờ biên lai bổ sung thuộc về hồ sơ số 3, nhân viên không cần lục tung cả tủ hồ sơ. Nhân viên chỉ cần dán một tờ giấy ghi chú màu vàng lên tờ biên lai: \"Gửi kèm hồ sơ số 3\" (`git commit --fixup <hồ-sơ-3>`). Khi nhấn nút dọn dẹp tủ tự động (`--autosquash`), cánh tay robot tự động tìm đến ngăn số 3, nhét tờ biên lai vào bên trong hồ sơ số 3 và dán kín lại ngăn nắp.\n\n---\n\n## 🖼 Sơ đồ\n```text\nQuy trình tự động hóa với Autosquash:\n1. Sửa code lỗi của commit C2 (hash 7a8b9c)\n2. Gõ lệnh: git commit --fixup 7a8b9c\n   Git sinh ra commit mới có tiêu đề: \"fixup! feat: user authentication\"\n\n3. Gõ lệnh: git rebase -i --autosquash HEAD~5\n   Git tự động sắp xếp lại Todo List không cần bạn động tay:\n   pick 7a8b9c feat: user authentication\n   fixup 1e2f3a fixup! feat: user authentication  <-- TỰ ĐỘNG ĐƯỢC CHÈN VÀO ĐÂY!\n   pick 4b5c6d feat: payment gateway\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKỹ sư Linh đang kiểm thử nhánh tính năng và phát hiện một lỗi chính tả nghiêm trọng trong hàm tính thuế đã được commit ở mã hash `d3e4f5a`. Linh nhanh chóng sửa lại hàm cho đúng quy chuẩn kỹ thuật, gõ `git add tax.js`, rồi thực thi câu lệnh: `git commit --fixup d3e4f5a`. Git tự động tạo commit phụ trợ đặc biệt với nhãn ghi rõ mục tiêu cần sửa. Tiếp theo, Linh gõ: `git rebase -i --autosquash d3e4f5a~1`. Trình soạn thảo mở ra và Linh hoàn toàn ngạc nhiên thích thú khi thấy Git đã tự động di chuyển commit sửa lỗi lên ngay sau commit tính thuế và đổi sẵn chỉ thị thành `fixup`. Linh chỉ việc bấm lưu tệp và toàn bộ lịch sử được dọn dẹp hoàn hảo trong chớp mắt.\n\n---\n\n## 💻 Command\n```bash\ngit commit --fixup <commit-hash>\ngit rebase -i --autosquash <base-hash>\ngit config --global rebase.autoSquash true\n```\n\n---\n\n## 🔍 Giải thích command\n- `git commit --fixup <hash>`: Tạo commit với tiền tố đặc biệt `fixup! <thông-điệp-cũ>` trỏ thẳng tới commit cần sửa.\n- `git rebase -i --autosquash <base>`: Kích hoạt rebase tự động nhận diện các commit fixup và sắp xếp vị trí tương ứng.\n- `git config --global rebase.autoSquash true`: Cấu hình Git luôn tự động bật tính năng autosquash mỗi khi chạy interactive rebase.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Quên cờ `--autosquash` khi chạy rebase**:  Khiến commit fixup nằm nguyên ở đuôi danh sách như commit thông thường.\n2. **Truyền nhầm mã hash của commit khác vào lệnh `git commit --fixup`.**: Truyền nhầm mã hash của commit khác vào lệnh `git commit --fixup`.\n3. **Chạy autosquash trên commit đã được push lên server chung.**: Chạy autosquash trên commit đã được push lên server chung.\n\n---\n\n## 🧪 Lab\n1. Tạo commit A, commit B, commit C liên tiếp.\n2. Sửa đổi tệp tin liên quan đến commit A.\n3. Chạy `git commit --fixup <hash-của-commit-A>`.\n4. Chạy `git rebase -i --autosquash HEAD~4`. Quan sát Git tự động sắp xếp vị trí.\n5. Lưu file và dùng `git log --oneline` để xác nhận commit A đã được vá tự động.\n\n---\n\n## 💡 Hint\n> Chạy `git config --global rebase.autoSquash true` một lần để không bao giờ phải gõ cờ `--autosquash` dài dòng nữa.\n\n---\n\n## ✅ Validation\n- Vận hành thành thạo bộ đôi git commit --fixup và git rebase --autosquash để sửa nhanh commit cũ.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về tính năng Fixup và Autosquash.\n\n---\n\n## 🔥 Challenge\nNêu sự khác biệt giữa `git commit --fixup` và `git commit --squash` trong cơ chế autosquash.\n\n---\n\n## 📚 Tổng kết\n- `fixup` gộp mã nguồn vào commit trước và tự động loại bỏ thông điệp thừa.\n- `git commit --fixup <hash>` đánh dấu mục tiêu cần sửa chữa một cách tự động.\n- `git rebase -i --autosquash` tự động tổ chức lại Todo List mà không cần can thiệp thủ công.\n",
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
        "explanation": "Fixup + Autosquash là cặp đôi sửa lỗi hồi tố (retroactive fix) nhanh nhất trong lịch sử Git."
      }
    ]
  }
};
export default lesson;
