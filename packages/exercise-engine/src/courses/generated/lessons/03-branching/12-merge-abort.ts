import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "12-merge-abort",
  "moduleId": "03-branching",
  "metadata": {
    "id": "12-merge-abort",
    "title": "Hủy bỏ quá trình merge với git merge --abort",
    "level": "intermediate",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "11-resolve-conflict"
    ],
    "objectives": [
      "Hiểu rõ cơ chế hoạt động của lệnh cứu hộ khẩn cấp `git merge --abort`.",
      "Nhận biết các tình huống thực tế nên chủ động hủy bỏ quá trình merge.",
      "Khôi phục Working Tree và con trỏ HEAD về chính xác trạng thái sạch sẽ trước khi merge.",
      "Tự tin xử lý tình huống merge nhầm nhánh mà không làm hỏng dữ liệu."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git merge --abort",
      "huy bo merge",
      "rollback merge",
      "safety brake",
      "abort conflict"
    ],
    "commands": [
      "git merge --abort",
      "git status",
      "git merge --quit"
    ]
  },
  "content": "# Hủy bỏ quá trình merge với git merge --abort\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ cơ chế hoạt động của lệnh cứu hộ `git merge --abort`.\n- Nhận biết các tình huống nên chủ động hủy bỏ quá trình gộp nhánh.\n- Khôi phục thư mục làm việc và con trỏ HEAD về chính xác trạng thái an toàn trước khi merge.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git merge --abort — phanh khẩn cấp khi merge\n- **Nói dễ hiểu:** Câu lệnh hủy ngay quá trình gộp nhánh đang dở dang và đưa dự án về trạng thái an toàn ban đầu.\n- **Ví dụ:** Bạn lỡ gộp nhầm nhánh hoặc thấy có quá nhiều xung đột phức tạp, gõ `git merge --abort` để quay lại.\n- **Đừng nhầm:** Lệnh này chỉ chạy được khi đang có xung đột merge dở; bình thường gõ sẽ báo không có merge nào để hủy.\n\n### MERGE_HEAD — tệp đánh dấu đang gộp nhánh\n- **Nói dễ hiểu:** Tệp nội bộ do Git tự sinh ra trong `.git/` để ghi nhớ commit của nhánh đang được gộp vào.\n- **Ví dụ:** Khi đang gặp conflict, sự tồn tại của tệp này giúp Git biết tiến trình hợp nhất chưa kết thúc.\n- **Đừng nhầm:** Bạn không cần đụng vào tệp này; Git tự tạo khi bắt đầu merge và tự xóa khi bạn hoàn tất hoặc abort.\n\n### Working Tree Clean — trạng thái sạch sẽ\n- **Nói dễ hiểu:** Trạng thái thư mục làm việc không còn tệp nào sửa dở, không còn vạch xung đột và sẵn sàng làm việc tiếp.\n- **Ví dụ:** Sau khi chạy `git merge --abort`, `git status` báo `nothing to commit, working tree clean`.\n- **Đừng nhầm:** Sạch sẽ ở đây có nghĩa là không có thay đổi chưa lưu, không hề làm mất các commit cũ của bạn.\n\n---\n\n## 📖 Định nghĩa\n`git merge --abort` là lệnh cứu hộ trong Git cho phép bạn lập tức hủy bỏ quá trình hợp nhất đang diễn ra dở dang khi gặp xung đột. Lệnh này sẽ tự động xóa sạch các vạch đánh dấu xung đột và khôi phục toàn bộ thư mục làm việc trở về đúng trạng thái trước khi bạn chạy lệnh merge.\n\n---\n\n## 🤔 Tại sao cần?\nĐôi khi bạn gõ nhầm tên nhánh, hoặc khi mở tệp xung đột ra thì thấy quá nhiều dòng code lạ mà mình không nắm rõ. Thay vì sửa bừa làm hỏng code của cả nhóm, bạn chỉ cần gõ `git merge --abort` để quay lại vạch xuất phát an toàn, trao đổi với đồng đội rồi mới tiến hành merge lại sau.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung `git merge --abort` giống như nút bấm \"Hủy giao dịch\" trên cây ATM. Khi bạn đưa thẻ vào và lỡ bấm nhầm ngôn ngữ hoặc số tiền quá lớn, bạn không cần phải rút phích cắm điện của cây ATM; bạn chỉ việc bấm nút Hủy giao dịch để chiếc máy nhả thẻ ra nguyên vẹn và kết thúc phiên làm việc an toàn.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCơ chế quay lui của git merge --abort:\nTrạng thái A (Sạch sẽ) ──(git merge)──> Trạng thái Conflict (Dở dang)\n        ▲                                          │\n        └─────────── git merge --abort ────────────┘\n         (Phục hồi nguyên vẹn trạng thái A ban đầu)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn Tuấn định gộp nhánh `fix-button` vào `main`, nhưng gõ nhầm thành `git merge feature-huge-database`. Màn hình lập tức báo xung đột ở hơn 30 tệp tin. Biết mình đã gộp nhầm nhánh thử nghiệm dở dang của đồng nghiệp, Tuấn không hề hoảng sợ mà gõ ngay: `git merge --abort`. Ngay lập tức, toàn bộ các tệp xung đột biến mất, nhánh `main` trở lại sạch sẽ như cũ, sẵn sàng để Tuấn gõ lại lệnh merge nhánh đúng.\n\n---\n\n## 💻 Command\n```bash\ngit merge --abort\ngit status\n```\n\n---\n\n## 🔍 Giải thích command\n- `git merge --abort`: Hủy bỏ hoàn toàn tiến trình merge đang dở dang và đưa dự án về trạng thái trước khi merge.\n- `git status`: Kiểm tra lại trạng thái để xác nhận kho lưu trữ đã trở về trạng thái sạch sẽ hoàn toàn.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Chạy abort khi không có merge nào đang dở:** Git sẽ báo lỗi `fatal: There is no merge to abort`.\n2. **Dùng `git reset --hard` thay vì `git merge --abort`:** Dù có thể cùng dọn sạch nhưng `git merge --abort` an toàn và chuyên trách hơn.\n3. **Cố chấp ngồi sửa hàng chục xung đột khi gộp nhầm nhánh:** Hãy abort ngay để tiết kiệm thời gian và tránh đưa nhầm code vào nhánh chính.\n\n---\n\n## 🧪 Lab\nBài tập này được thực hành trên môi trường Git mô phỏng của hệ thống:\n1. Nhận thấy kho lưu trữ đang ở trạng thái xung đột sau lệnh merge.\n2. Kiểm tra trạng thái bằng `git status` để thấy thông báo merge dở dang.\n3. Chạy câu lệnh cứu hộ `git merge --abort`.\n4. Chạy lại `git status` và xác nhận dòng chữ `nothing to commit, working tree clean`.\n\n---\n\n## 💡 Hint\nBất cứ khi nào bạn cảm thấy quá tải hoặc nghi ngờ mình gộp nhầm nhánh, hãy dùng `git merge --abort` để quay lại an toàn.\n\n---\n\n## ✅ Validation\n- Trạng thái kho lưu trữ trở về sạch sẽ (`working tree clean`).\n- Các vạch đánh dấu xung đột trong tệp hoàn toàn biến mất.\n\n---\n\n## ❓ Quiz\nTrả lời các câu hỏi sau để nắm vững cách dùng lệnh cứu hộ `git merge --abort`.\n\n---\n\n## 🔥 Challenge\nGiải thích vì sao lệnh `git merge --abort` lại có thể đưa thư mục làm việc về đúng trạng thái ban đầu mà không làm mất commit cũ nào.\n\n---\n\n## 📚 Tổng kết\n- `git merge --abort` là chiếc phanh khẩn cấp giúp hủy bỏ quá trình gộp nhánh khi gặp xung đột.\n- Khôi phục thư mục làm việc và con trỏ HEAD về mốc an toàn trước khi gõ lệnh merge.\n- Giúp bạn tự tin thao tác và thử nghiệm merge mà không sợ làm hỏng dự án.\n",
  "quiz": {
    "id": "quiz-03-12-merge-abort",
    "title": "Trắc nghiệm: Hủy bỏ quá trình merge",
    "questions": [
      {
        "id": "q1",
        "question": "Lệnh `git merge --abort` được sử dụng trong trường hợp nào là phù hợp nhất?",
        "type": "single",
        "options": [
          {
            "text": "Khi quá trình merge đang gặp xung đột (conflict) hoặc khi bạn lỡ merge nhầm nhánh và muốn quay lại ban đầu",
            "correct": true
          },
          {
            "text": "Khi bạn muốn xóa vĩnh viễn toàn bộ kho chứa Git",
            "correct": false
          },
          {
            "text": "Khi bạn muốn đẩy code lên máy chủ GitHub",
            "correct": false
          },
          {
            "text": "Khi bạn muốn tạo một commit mới",
            "correct": false
          }
        ],
        "explanation": "`--abort` là chiếc phanh an toàn giúp hủy bỏ tiến trình merge dở dang và quay về trạng thái sạch ban đầu."
      },
      {
        "id": "q2",
        "question": "Sau khi chạy lệnh `git merge --abort`, các tệp tin trong Working Directory sẽ như thế nào?",
        "type": "single",
        "options": [
          {
            "text": "Được phục hồi nguyên vẹn 100% về trạng thái trước khi bạn thực hiện câu lệnh git merge",
            "correct": true
          },
          {
            "text": "Bị xóa sạch toàn bộ khỏi ổ cứng",
            "correct": false
          },
          {
            "text": "Vẫn giữ nguyên các vạch đánh dấu xung đột conflict markers",
            "correct": false
          },
          {
            "text": "Tự động được tải lên trang web của công ty",
            "correct": false
          }
        ],
        "explanation": "Git dọn dẹp sạch sẽ các conflict markers và trả lại trạng thái trước khi ra lệnh merge."
      },
      {
        "id": "q3",
        "question": "Điều gì sẽ xảy ra nếu bạn chạy `git merge --abort` khi kho lưu trữ đang ở trạng thái bình thường (không có merge dở dang)?",
        "type": "single",
        "options": [
          {
            "text": "Git sẽ in thông báo lỗi: `fatal: There is no merge to abort`",
            "correct": true
          },
          {
            "text": "Git sẽ tự động tạo một merge commit ngẫu nhiên",
            "correct": false
          },
          {
            "text": "Máy tính sẽ tự động tắt nguồn",
            "correct": false
          },
          {
            "text": "Toàn bộ lịch sử commit bị xóa sạch",
            "correct": false
          }
        ],
        "explanation": "Lệnh abort chỉ có hiệu lực khi đang tồn tại một tiến trình merge dở dang (có tệp .git/MERGE_HEAD)."
      },
      {
        "id": "q4",
        "question": "Tại sao `git merge --abort` lại được khuyến nghị sử dụng hơn là `git reset --hard` khi muốn thoát merge conflict?",
        "type": "single",
        "options": [
          {
            "text": "Vì nó là lệnh chuyên trách rõ nghĩa, an toàn và bảo vệ các thay đổi chưa commit từ trước tốt hơn",
            "correct": true
          },
          {
            "text": "Vì git reset --hard chỉ chạy được trên máy tính chạy hệ điều hành macOS",
            "correct": false
          },
          {
            "text": "Vì git reset --hard bắt buộc phải có kết nối mạng Internet",
            "correct": false
          },
          {
            "text": "Vì git merge --abort tự động giải quyết xung đột bằng trí tuệ nhân tạo",
            "correct": false
          }
        ],
        "explanation": "`--abort` được thiết kế chuyên biệt cho ngữ cảnh merge, tránh các rủi ro xóa nhầm dữ liệu của reset hard."
      },
      {
        "id": "q5",
        "question": "Dấu hiệu nào trong thư mục `.git` cho biết hệ thống đang ở giữa một tiến trình merge dở dang?",
        "type": "single",
        "options": [
          {
            "text": "Sự tồn tại của tệp `.git/MERGE_HEAD` chứa mã băm của commit đang được gộp",
            "correct": true
          },
          {
            "text": "Tệp tin `.git/PASSWORDS` bị rò rỉ",
            "correct": false
          },
          {
            "text": "Thư mục `.git` bị biến mất hoàn toàn",
            "correct": false
          },
          {
            "text": "Đèn bàn phím máy tính nhấp nháy liên tục",
            "correct": false
          }
        ],
        "explanation": "Git tạo tệp tin `.git/MERGE_HEAD` để ghi nhận commit đang merge; khi abort hoặc commit xong, tệp này bị xóa đi."
      },
      {
        "id": "q6",
        "question": "Lệnh `git merge --quit` khác với `git merge --abort` ở điểm cơ bản nào?",
        "type": "single",
        "options": [
          {
            "text": "`--quit` hủy bỏ trạng thái merge nhưng vẫn giữ nguyên các thay đổi hiện tại trong thư mục làm việc",
            "correct": true
          },
          {
            "text": "`--quit` tự động tắt màn hình máy tính",
            "correct": false
          },
          {
            "text": "`--quit` xóa sạch tất cả các commit cũ",
            "correct": false
          },
          {
            "text": "Hai cờ này hoàn toàn giống nhau không có khác biệt nào",
            "correct": false
          }
        ],
        "explanation": "`--abort` hoàn tác cả Working Tree và Staging Area về ban đầu, trong khi `--quit` chỉ dọn trạng thái merge mà để lại file dở dang."
      }
    ]
  }
};
export default lesson;
