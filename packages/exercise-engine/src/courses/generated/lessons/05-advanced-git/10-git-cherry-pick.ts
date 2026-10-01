import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "10-git-cherry-pick",
  "moduleId": "05-advanced-git",
  "metadata": {
    "id": "10-git-cherry-pick",
    "title": "git cherry-pick",
    "level": "advanced",
    "duration": 30,
    "xp": 95,
    "prerequisites": [
      "07-reflog-recovery"
    ],
    "objectives": [
      "Hiểu rõ bản chất hoạt động của `git cherry-pick`: sao chép một commit cụ thể từ nhánh này sang nhánh khác.",
      "Sử dụng cherry-pick để đưa các bản vá lỗi cấp bách (hotfix) từ nhánh thử nghiệm sang nhánh production.",
      "Phân biệt rõ ràng giữa việc merge toàn bộ nhánh và việc chọn lọc từng commit đơn lẻ.",
      "Biết quy trình Git thật để xử lý conflict khi cherry-pick; simulator hiện chưa hỗ trợ trạng thái tiếp tục/hủy."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "cherry pick",
      "git cherry-pick",
      "nhat commit",
      "boc commit",
      "hotfix porting",
      "selective commit"
    ],
    "commands": [
      "git cherry-pick <commit-hash>",
      "git status",
      "git log --oneline"
    ]
  },
  "content": "# git cherry-pick\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ bản chất hoạt động của `git cherry-pick`: sao chép một commit cụ thể từ nhánh này sang nhánh khác.\n- Sử dụng cherry-pick để đưa các bản vá lỗi cấp bách (hotfix) từ nhánh thử nghiệm sang nhánh production.\n- Phân biệt rõ ràng giữa việc merge toàn bộ nhánh và việc chọn lọc từng commit đơn lẻ.\n- Xử lý mâu thuẫn xung đột (conflict) phát sinh trong quá trình cherry-pick commit.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git cherry-pick\n- **Nói dễ hiểu**: Lệnh nhặt riêng một commit từ nhánh khác để dán thành một commit mới trên nhánh hiện tại.\n- **Ví dụ**: Đang ở nhánh `main`, chạy `git cherry-pick a1b2c3d` để lấy bản vá lỗi từ nhánh thử nghiệm sang.\n- **Đừng nhầm**: Không gộp toàn bộ nhánh; lệnh chỉ lấy đúng những thay đổi trong commit được chỉ định.\n\n### selective integration\n- **Nói dễ hiểu**: Chiến lược tích hợp có chọn lọc từng tính năng hoặc bản sửa lỗi mà không kéo theo code thừa dở dang.\n- **Ví dụ**: Nhánh tính năng có 10 commit nhưng chỉ có 1 commit hotfix cần đưa vào bản phát hành gấp.\n- **Đừng nhầm**: Không nên lạm dụng để thay thế merge; lạm dụng cherry-pick sẽ sinh ra nhiều commit trùng lặp.\n\n### --abort vs --continue\n- **Nói dễ hiểu**: Cặp cờ điều khiển khi gặp xung đột: `--abort` hủy bỏ quay về đầu, `--continue` tiếp tục sau khi sửa xong conflict.\n- **Ví dụ**: Sửa xung đột xong, gõ `git add .` rồi chạy `git cherry-pick --continue`.\n- **Đừng nhầm**: Không gõ `git commit` thủ công sau khi sửa conflict; phải dùng `--continue` để Git hoàn tất quy trình.\n\n---\n\n## 📖 Định nghĩa\n`git cherry-pick <commit-hash>` là câu lệnh trích xuất và sao chép chọn lọc trong Git, cho phép bạn chọn duy nhất một commit cụ thể từ nhánh bất kỳ trong lịch sử và sao chép những thay đổi của commit đó thành một commit mới trên đỉnh nhánh hiện tại mà không cần merge toàn bộ nhánh dở dang.\n\n---\n\n## 💡 Tại sao cần\nNếu một nhánh tính năng có nhiều thay đổi nhưng bạn chỉ muốn đưa một commit sửa lỗi sang nhánh khác, `git cherry-pick <hash>` tạo một commit mới từ thay đổi đó. Trước khi dùng, hãy xác nhận commit không phụ thuộc vào các commit khác; cherry-pick không tự mang theo phần phụ thuộc.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung một chiếc bánh ngọt lớn trang trí nhiều quả cherry và các lớp kem đang làm dở. Bạn không muốn ăn cả chiếc bánh chưa nướng chín. Bạn chỉ dùng chiếc nĩa cẩn thận gắp đúng một quả cherry chín mọng trên mặt bánh đặt sang đĩa ăn tráng miệng của mình (`cherry-pick`). Đĩa của bạn có món ngon, còn chiếc bánh lớn vẫn ở nguyên chỗ cũ.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nCơ chế gắp commit của git cherry-pick:\nNhánh feature:   C1 ──► C2 ──► C3 (Bản vá quan trọng!) ──► C4\nNhánh main:      M1 ──► M2\n\nĐứng tại main và chạy: git cherry-pick C3\nNhánh main:      M1 ──► M2 ──► C3' (Commit mới chứa nội dung của C3)\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nKỹ sư Long đang làm nhánh `experimental-auth` và tạo commit `b4c5d6e` sửa lỗi rò rỉ bộ nhớ nghiêm trọng. Nhánh chính `main` đang cần đóng gói phát hành gấp. Long chuyển về main bằng `git switch main` rồi chạy `git cherry-pick b4c5d6e`. Git tự động áp dụng diff vào main và tạo commit mới, giải quyết triệt để lỗi mà không kéo theo code thử nghiệm dở dang.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit cherry-pick <commit-hash>\ngit cherry-pick <hash-1> <hash-2>\ngit cherry-pick <hash-start>..<hash-end>\ngit cherry-pick -n <commit-hash>\ngit cherry-pick --continue\ngit cherry-pick --abort\n```\n\n---\n\n## 🔍 Giải thích command\n- `git cherry-pick <hash>`: Sao chép commit chỉ định và tạo commit mới trên nhánh hiện tại.\n- `git cherry-pick <A>..<B>`: Trong Git thật, chọn các commit sau `A` đến hết `B`; simulator hiện chỉ hỗ trợ chọn một commit mỗi lần.\n- `git cherry-pick -n <hash>`: Gắp thay đổi vào Staging/Working Tree mà chưa tự động commit (`--no-commit`).\n- `git cherry-pick --continue` / `--abort`: Dùng trong Git thật để tiếp tục hoặc hủy thao tác đang dừng vì conflict; simulator hiện chưa mô phỏng trạng thái này.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Lạm dụng cherry-pick thay cho merge**: Tạo ra nhiều commit trùng lặp nội dung với mã hash khác nhau gây rắc rối khi gộp nhánh sau này.\n2. **Quên rằng cherry-pick tạo ra mã hash mới**: Dù nội dung tương tự nhưng commit mới trên nhánh đích có mã SHA khác với commit gốc.\n3. **Cho rằng mọi conflict có thể tiếp tục như nhau**: Trong Git thật, xem `git status`, giải quyết file, stage rồi dùng `git cherry-pick --continue`; kiểm tra thay đổi trước khi hoàn tất.\n\n---\n\n## 🧪 Lab thực hành\nTrong simulator, làm lab với một commit không xung đột. Nếu học bằng Git thật, làm trong kho thử nghiệm riêng.\n1. Tạo commit nền trên `main`, sau đó chạy `git switch -c feature-patch`.\n2. Tạo `hotfix.txt`, stage và commit bằng thông điệp `fix: correct validation`; ghi lại mã commit.\n3. Chạy `git switch main`, rồi `git cherry-pick <hash-vừa-ghi>`.\n4. Chạy `git log --oneline -3` và `git status`. Nội dung file đã được áp dụng trên `main`, nhưng hash commit mới khác hash ở `feature-patch`.\n\n---\n\n## 💡 Hint\n> Nếu gặp xung đột khi cherry-pick, giải quyết xong thì dùng `git cherry-pick --continue` chứ không dùng git commit.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Commit mới xuất hiện trên nhánh hiện tại với nội dung thay đổi tương đương commit gốc.\n- Commit mới có cha là commit trước đó của nhánh hiện tại; nội dung thay đổi được chọn đã được áp dụng.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh chọn lọc git cherry-pick.\n\n---\n\n## 🚀 Thử thách nâng cao\nSử dụng cú pháp dải commit `git cherry-pick A..B` để gắp một chuỗi 3 commit liên tiếp từ nhánh tính năng sang nhánh release.\n\n---\n\n## 📝 Tổng kết\n- `git cherry-pick` sao chép một commit cụ thể từ nhánh khác và áp dụng lên nhánh hiện tại.\n- Tạo ra commit mới có nội dung tương tự nhưng mã băm SHA-1 khác biệt.\n- Cực kỳ hữu ích để đưa các bản vá khẩn cấp (hotfix) sang nhánh release hoặc main.\n",
  "quiz": {
    "id": "quiz-05-10-git-cherry-pick",
    "title": "Trắc nghiệm: git cherry-pick",
    "questions": [
      {
        "id": "q1",
        "question": "Chức năng cốt lõi của câu lệnh `git cherry-pick <commit-hash>` là gì?",
        "type": "single",
        "options": [
          {
            "text": "Sao chép duy nhất thay đổi của commit chỉ định từ một nhánh khác để tạo commit mới trên nhánh hiện tại",
            "correct": true
          },
          {
            "text": "Gộp toàn bộ tất cả các commit của nhánh đó vào nhánh hiện tại",
            "correct": false
          },
          {
            "text": "Xóa vĩnh viễn commit đó khỏi lịch sử kho chứa",
            "correct": false
          },
          {
            "text": "Đổi tên tác giả của commit đó thành tên của bạn",
            "correct": false
          }
        ],
        "explanation": "`git cherry-pick` cho phép nhặt chọn lọc một commit đơn lẻ mà không cần merge toàn bộ nhánh."
      },
      {
        "id": "q2",
        "question": "Sau khi cherry-pick thành công, commit mới trên nhánh hiện tại có mối quan hệ thế nào với commit gốc?",
        "type": "single",
        "options": [
          {
            "text": "Có nội dung và thông điệp giống nhau nhưng mang mã băm SHA-1 mới hoàn toàn",
            "correct": true
          },
          {
            "text": "Có mã băm SHA-1 giống hệt 100% không đổi",
            "correct": false
          },
          {
            "text": "Commit gốc sẽ tự động bị xóa sổ biến mất",
            "correct": false
          },
          {
            "text": "Hai commit tự động kết nối thành một commit duy nhất",
            "correct": false
          }
        ],
        "explanation": "Vì commit mới có commit cha (parent) khác và thời gian tạo khác nên mã SHA-1 được tính toán lại mới hoàn toàn."
      },
      {
        "id": "q3",
        "question": "Nếu trong quá trình cherry-pick phát sinh xung đột (conflict) dòng mã, lệnh nào dùng để tiếp tục sau khi đã sửa xong và add?",
        "type": "single",
        "options": [
          {
            "text": "git cherry-pick --continue",
            "correct": true
          },
          {
            "text": "git cherry-pick --proceed",
            "correct": false
          },
          {
            "text": "git merge --continue",
            "correct": false
          },
          {
            "text": "git commit --amend",
            "correct": false
          }
        ],
        "explanation": "`git cherry-pick --continue` hoàn tất quá trình áp dụng commit sau khi bạn đã đánh dấu resolved bằng `git add`."
      },
      {
        "id": "q4",
        "question": "Tùy chọn `-n` (hoặc `--no-commit`) trong câu lệnh `git cherry-pick -n <hash>` có tác dụng gì?",
        "type": "single",
        "options": [
          {
            "text": "Áp dụng các thay đổi của commit vào thư mục làm việc và Staging Area nhưng không tự động tạo commit mới",
            "correct": true
          },
          {
            "text": "Không kiểm tra quyền truy cập mạng Internet",
            "correct": false
          },
          {
            "text": "Không cho phép người khác nhìn thấy mã nguồn",
            "correct": false
          },
          {
            "text": "Bỏ qua toàn bộ các kiểm thử tự động",
            "correct": false
          }
        ],
        "explanation": "`--no-commit` cho phép bạn nhặt nhiều thay đổi về Staging Area để kiểm tra hoặc gộp chung trước khi commit."
      },
      {
        "id": "q5",
        "question": "Nếu gặp xung đột phức tạp trong lúc cherry-pick và muốn hủy bỏ thao tác để quay lại trạng thái ban đầu, bạn dùng lệnh nào?",
        "type": "single",
        "options": [
          {
            "text": "git cherry-pick --abort",
            "correct": true
          },
          {
            "text": "git cherry-pick --cancel",
            "correct": false
          },
          {
            "text": "git cherry-pick --stop",
            "correct": false
          },
          {
            "text": "git reset --abort-pick",
            "correct": false
          }
        ],
        "explanation": "`git cherry-pick --abort` hủy bỏ tiến trình đang dở dang và khôi phục HEAD lẫn Working Directory về nguyên trạng trước khi chạy lệnh."
      }
    ]
  }
};
export default lesson;
