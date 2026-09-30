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
  "content": "# Hủy bỏ quá trình merge với git merge --abort\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ cơ chế hoạt động của lệnh cứu hộ khẩn cấp `git merge --abort`.\n- Nhận biết các tình huống thực tế nên chủ động hủy bỏ quá trình merge.\n- Khôi phục Working Tree và con trỏ HEAD về chính xác trạng thái sạch sẽ trước khi merge.\n- Tự tin xử lý tình huống merge nhầm nhánh mà không làm hỏng dữ liệu.\n\n---\n\n## 📖 Định nghĩa\n> `git merge --abort` là câu lệnh cứu hộ chuyên dụng được thiết kế như một chiếc phanh khẩn cấp trong Git, cho phép bạn ngay lập tức hủy bỏ toàn bộ quá trình hợp nhất đang diễn ra dở dang (khi gặp conflict hoặc khi nhận ra mình đã merge nhầm nhánh). Lệnh này sẽ tự động dọn dẹp sạch sẽ tất cả các vạch đánh dấu xung đột, loại bỏ các tệp tin tạm thời và khôi phục toàn bộ trạng thái của Working Tree, Staging Area và con trỏ HEAD trở về chính xác mốc an toàn trước khi bạn gõ lệnh `git merge`.\n\n---\n\n## 🤔 Tại sao cần?\nTrong thực tế, không ít lần bạn gõ nhầm lệnh merge một nhánh không liên quan, hoặc khi mở các tệp xung đột ra thì phát hiện có hàng trăm khối conflict phức tạp vượt quá khả năng xử lý tức thời của bạn. Thay vì hoảng loạn chỉnh sửa lung tung làm hỏng thêm mã nguồn, bạn chỉ cần gõ một câu lệnh `git merge --abort` duy nhất để đưa mọi thứ quay trở lại vạch xuất phát an toàn 100% trong một phần nghìn giây.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung lệnh `git merge --abort` giống như nút bấm \"Hủy giao dịch\" (Cancel Transaction) trên cây rút tiền tự động ATM, hoặc phím Escape (Esc) khẩn cấp trên bàn phím. Khi bạn đưa thẻ vào máy và lỡ bấm nhầm ngôn ngữ hoặc bấm nhầm số tiền rút quá lớn, bạn không cần phải rút phích cắm điện của cây ATM, mà chỉ việc bấm nút Hủy giao dịch để chiếc máy nhả thẻ ra nguyên vẹn và kết thúc phiên làm việc an toàn.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCơ chế quay lui của git merge --abort:\nTrạng thái A (Sạch sẽ) ──(git merge)──► Trạng thái Conflict (Dở dang)\n        ▲                                          │\n        └─────────── git merge --abort ────────────┘\n         (Phục hồi nguyên vẹn trạng thái A ban đầu)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKỹ sư Tuấn đang đứng ở nhánh main định merge nhánh bugfix-login, nhưng do sơ suất gõ nhầm tên nhánh nên đã gõ nhầm thành lệnh: `git merge feature-huge-refactor`. Màn hình console lập tức tràn ngập thông báo conflict ở hơn 40 tệp tin khác nhau với hàng ngàn dòng code mâu thuẫn phức tạp. Nhận thấy mình đã merge nhầm một nhánh thử nghiệm dở dang của đồng nghiệp vào nhánh ổn định, Tuấn không hề hoảng sợ mà bình tĩnh mở terminal gõ ngay: `git merge --abort`. Ngay lập tức trong một tích tắc, toàn bộ 40 tệp tin bị conflict biến mất hoàn toàn, nhánh main quay trở lại trạng thái sạch sẽ tinh tươm ban đầu, sẵn sàng để Tuấn gõ lại câu lệnh merge chính xác.\n\n---\n\n## 💻 Command\n```bash\ngit merge --abort\ngit status\ngit merge --quit\n```\n\n---\n\n## 🔍 Giải thích command\n- `git merge --abort`: Hủy bỏ hoàn toàn tiến trình merge đang dở dang và phục hồi trạng thái trước khi merge.\n- `git status`: Kiểm tra lại để xác nhận trạng thái kho lưu trữ đã trở về `working tree clean` sạch sẽ.\n- `git merge --quit`: Hủy bỏ tiến trình merge nhưng giữ lại các thay đổi hiện tại trong Working Directory (ít dùng hơn abort).\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Chạy git merge --abort khi không có tiến trình merge nào đang diễn ra**:  Git sẽ báo lỗi `fatal\n2. **Sử dụng git reset --hard thay vì git merge --abort**:  Dù cùng khôi phục trạng thái nhưng `git merge --abort` chuyên trách và an toàn hơn nhiều.\n3. **Cố chấp giải quyết hàng chục conflict khi merge nhầm nhánh**:  Thay vì tốn hàng giờ sửa nhầm, hãy abort ngay lập tức để quay lại ban đầu.\n\n---\n\n## 🧪 Lab\n1. Tạo một xung đột merge có chủ đích giữa hai nhánh.\n2. Quan sát thông báo conflict và kiểm tra trạng thái bằng `git status`.\n3. Chạy câu lệnh cứu hộ `git merge --abort`.\n4. Chạy lại `git status` và xác nhận mọi thứ đã trở về trạng thái sạch sẽ hoàn toàn.\n\n---\n\n## 💡 Hint\n> Bất cứ khi nào bạn cảm thấy quá tải trước xung đột, hãy nhớ tới `git merge --abort`.\n\n---\n\n## ✅ Validation\n- Khôi phục thành công dự án về trạng thái sạch sẽ trước khi merge.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về lệnh hủy bỏ merge git merge --abort.\n\n---\n\n## 🔥 Challenge\nNêu sự khác biệt giữa `git merge --abort` và `git merge --quit` trong Git.\n\n---\n\n## 📚 Tổng kết\n- `git merge --abort` là phanh khẩn cấp để hủy bỏ quá trình merge đang gặp xung đột.\n- Khôi phục hoàn toàn Working Tree và HEAD về mốc an toàn trước khi gõ lệnh merge.\n- Giúp bạn tự tin thử nghiệm merge mà không sợ làm hỏng kho lưu trữ.\n",
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
