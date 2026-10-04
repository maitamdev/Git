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
      "Nhận biết merge đang dở và biết khi nào cần hủy.",
      "Dùng `git merge --abort` rồi kiểm tra lại nhánh và working tree.",
      "Nêu được giới hạn khôi phục khi đã có thay đổi chưa commit trước merge."
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
      "git status",
      "git merge --abort"
    ]
  },
  "content": "# Hủy merge đang dở bằng `git merge --abort`\n\n---\n\n## 🎯 Mục tiêu\n- Nhận biết chính xác trạng thái kho mã nguồn khi một tiến trình hợp nhất đang bị nghẽn (Merge in progress).\n- Sử dụng thành thạo phanh khẩn cấp `git merge --abort` để rút lui an toàn khỏi các xung đột ngoài ý muốn.\n- Thấu hiểu tầm quan trọng của việc giữ sạch thư mục làm việc trước khi thực hiện bất kỳ lệnh merge nào.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### `git merge --abort` — hủy merge\n- **Nói dễ hiểu:** Nút phanh khẩn cấp giúp hủy bỏ hoàn toàn lần gộp nhánh đang dở dang và đưa thư mục làm việc về vị trí trước khi merge.\n- **Ví dụ:** Vừa chạy `git merge` thấy conflict quá nhiều, gõ ngay `git merge --abort` để quay xe an toàn.\n- **Đừng nhầm:** Lệnh chỉ có hiệu lực khi tiến trình merge đang diễn ra dở dang; nếu bạn đã commit xong mốc merge thì lệnh này vô tác dụng.\n\n### Merge in progress — merge đang diễn ra\n- **Nói dễ hiểu:** Trạng thái lơ lửng của kho mã nguồn khi Git đã bắt đầu ghép nhánh nhưng dừng lại chờ người xử lý conflict.\n- **Ví dụ:** Khi `git status` hiển thị dòng thông báo `You have unmerged paths. (fix conflicts and run \"git commit\")`.\n- **Đừng nhầm:** Bạn không thể chuyển nhánh hay thực hiện các thao tác git thông thường khác chừng nào chưa giải quyết xong hoặc abort trạng thái này.\n\n### Pre-merge changes — thay đổi có trước merge\n- **Nói dễ hiểu:** Những dòng code bạn sửa dở dang ở thư mục làm việc mà chưa kịp add hoặc commit trước khi bấm lệnh merge.\n- **Ví dụ:** Bạn đang sửa dở file `notes.txt` chưa commit mà đã vội vàng chạy lệnh `git merge`.\n- **Đừng nhầm:** Git có thể không khôi phục được các thay đổi dở dang này khi abort; vì vậy luôn commit hoặc stash sạch sẽ trước khi merge.\n\n---\n\n## 📖 Định nghĩa\n`git merge --abort` là phanh khẩn cấp trong Git, cho phép bạn lập tức chấm dứt một tiến trình hợp nhất đang bị nghẽn do xung đột và hoàn nguyên toàn bộ thư mục làm việc trở về trạng thái sạch sẽ ngay trước khoảnh khắc bạn gõ lệnh merge. Lệnh này cứu bạn thoát khỏi những tình huống gộp nhầm nhánh hoặc khi xung đột quá phức tạp cần tạm dừng để trao đổi.\n\n---\n\n## 🤔 Tại sao cần?\nTrong thực tế, không phải lúc nào bạn cũng sẵn sàng gỡ conflict ngay lập tức: bạn phát hiện mình vừa merge nhầm nhánh thử nghiệm của một thực tập sinh thay vì nhánh phát hành, hoặc conflict xuất hiện trên cả trăm tệp tin phức tạp vượt ngoài tầm kiểm soát cá nhân. Thay vì loay hoay sửa bừa làm hỏng mã nguồn, `git merge --abort` đưa bạn về vị trí xuất phát an toàn trong một giây.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung bạn đang chuẩn bị ghép hai mảnh ghép hình lại với nhau nhưng phát hiện các rãnh khớp bị cấn nghiêm trọng (conflict). Thay vì dùng búa đập gãy các mấu để ép chúng dính vào nhau, bạn chỉ cần buông tay đặt hai mảnh ghép trở lại vị trí ban đầu trên bàn. Đó chính xác là nút bấm 'Ctrl+Z tối cao' mang tên `git merge --abort`.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCƠ CHẾ RÚT LUI AN TOÀN CỦA GIT MERGE --ABORT:\n\nTrạng thái ban đầu: Nhánh main sạch sẽ, ổn định\n        │\n        ▼  Chạy lệnh: `git merge feature-nhầm`\nBị kẹt giữa chừng: Merge in progress (Xung đột markers chèn vào file)\n        │\n        ▼  Chạy lệnh: `git merge --abort`\nHoàn nguyên 100%:  Trở về chính xác trạng thái sạch sẽ của main trước merge!\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nĐang đứng ở `main`, bạn định merge `feature/payment-v2` nhưng gõ nhầm thành `experiment/blockchain-test`. Git lập tức báo lỗi conflict ở 15 tệp tin. Bạn giật mình nhận ra đã chọn nhầm nhánh. Không cần hoảng loạn, bạn chỉ việc gõ `git merge --abort`: mọi vết tích xung đột biến mất và `main` trở lại nguyên vẹn như cũ.\n\n---\n\n## 💻 Command\n```bash\ngit status\ngit merge --abort\ngit status\n```\n\n---\n\n## 🔍 Giải thích command\n- `git status` (trước khi abort): Giúp bạn xác nhận chắc chắn rằng repo đang ở trạng thái merge dở dang.\n- `git merge --abort`: Hủy bỏ giao dịch hợp nhất, dọn sạch toàn bộ các tệp unmerged và xóa các marker xung đột.\n- `git status` (sau khi abort): Kiểm chứng lại kết quả; terminal phải thông báo thư mục làm việc đã sạch sẽ hoàn toàn.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Chạy abort khi không có merge nào đang diễn ra**: Git sẽ báo lỗi \"fatal: There is no merge to abort\".\n2. **Lầm tưởng abort sẽ xóa bỏ nhánh tính năng**: Lệnh chỉ dừng thao tác gộp; nhánh tính năng và các commit của nó vẫn an toàn 100%.\n3. **Chủ quan để code chưa commit trước khi merge**: Git có thể không cứu lại được các dòng code nháp bạn gõ trước khi chạy merge.\n\n---\n\n## 🧪 Lab\n1. Tạo tệp `abort-demo.txt` trên `main` với nội dung `Trạng thái: ban đầu`, rồi add và commit.\n2. Tạo nhánh mới `git switch -c feature-abort`, sửa dòng đó thành `Trạng thái: tính năng`, rồi add và commit.\n3. Quay về `git switch main`, sửa cùng dòng thành `Trạng thái: bản chính`, rồi add và commit.\n4. Chạy `git merge feature-abort` để cố ý kích hoạt xung đột.\n5. Kiểm tra `git status` thấy đang có merge dở dang, sau đó gõ: `git merge --abort`.\n6. Chạy lại `git status` và mở file `abort-demo.txt` để kiểm chứng nội dung đã trở về nguyên trạng `Trạng thái: bản chính`.\n\n---\n\n## 💡 Hint\n> Khi gặp xung đột mà bạn chưa nắm rõ logic của đồng đội, hãy gõ `git merge --abort` để quay về điểm an toàn trước khi trao đổi trực tiếp!\n\n---\n\n## ✅ Validation\n- Lệnh `git merge --abort` khôi phục thư mục làm việc về trạng thái sạch sẽ ban đầu.\n- Tệp `abort-demo.txt` không còn bất kỳ dấu vết nào của conflict markers.\n- Nhánh `feature-abort` vẫn tồn tại nguyên vẹn trong danh sách `git branch`.\n\n---\n\n## ❓ Quiz\nTrả lời bài trắc nghiệm dưới đây để kiểm tra hiểu biết của bạn về thời điểm sử dụng và phạm vi phục hồi của lệnh git merge --abort.\n\n---\n\n## 🔥 Challenge\nGiả sử bạn đã lỡ tay gỡ xung đột, chạy `git add` và đã gõ `git commit` hoàn tất mốc merge commit rồi. Lúc này lệnh `git merge --abort` còn có tác dụng không? Nếu không, bạn phải dùng vũ khí nào để quay ngược lại thời điểm trước merge?\n\n---\n\n## 📚 Tổng kết\n- `git merge --abort` là công cụ cứu cánh giúp hủy bỏ tiến trình gộp nhánh đang bị tắc nghẽn.\n- Đưa mã nguồn trở lại chính xác trạng thái trước khi thực hiện merge.\n- Luôn giữ thói quen commit sạch sẽ trước khi merge để đảm bảo không bị thất lạc dữ liệu.\n",
  "quiz": {
    "id": "quiz-03-12-merge-abort",
    "title": "Trắc nghiệm: Hủy merge đang dở",
    "questions": [
      {
        "id": "q1",
        "question": "Khi nào phù hợp để chạy `git merge --abort`?",
        "type": "single",
        "options": [
          {
            "text": "Khi một lần merge đang dở và bạn muốn hủy để kiểm tra lại",
            "correct": true
          },
          {
            "text": "Khi muốn xóa toàn bộ repository",
            "correct": false
          },
          {
            "text": "Khi muốn tải code lên GitHub",
            "correct": false
          },
          {
            "text": "Khi muốn tạo commit thông thường",
            "correct": false
          }
        ],
        "explanation": "Abort dừng lần merge chưa hoàn tất; trước hết dùng git status để xác nhận trạng thái."
      },
      {
        "id": "q2",
        "question": "Git hứa hẹn điều gì khi dùng `git merge --abort`?",
        "type": "single",
        "options": [
          {
            "text": "Cố gắng khôi phục trạng thái trước merge; thay đổi chưa commit có thể khiến việc khôi phục không trọn vẹn",
            "correct": true
          },
          {
            "text": "Luôn phục hồi chính xác mọi byte, kể cả sửa đổi chưa commit",
            "correct": false
          },
          {
            "text": "Xóa cả nhánh hiện tại và nhánh nguồn",
            "correct": false
          },
          {
            "text": "Đẩy các tệp conflict lên remote",
            "correct": false
          }
        ],
        "explanation": "Tài liệu Git cảnh báo rằng thay đổi chưa commit trước merge có thể không được khôi phục đầy đủ."
      },
      {
        "id": "q3",
        "question": "Kết quả mong đợi sau khi abort thành công là gì?",
        "type": "single",
        "options": [
          {
            "text": "Không còn tiến trình merge dở; working tree trở về trạng thái trước merge nếu có thể",
            "correct": true
          },
          {
            "text": "Mọi commit trên nhánh nguồn bị xóa",
            "correct": false
          },
          {
            "text": "Git tự chọn một phía và tạo merge commit",
            "correct": false
          },
          {
            "text": "Repository bị chuyển sang detached HEAD",
            "correct": false
          }
        ],
        "explanation": "Abort hủy lần merge hiện tại chứ không xóa lịch sử hoặc nhánh được đưa vào."
      },
      {
        "id": "q4",
        "question": "Điều nên làm trước khi bắt đầu merge để giảm rủi ro khi phải abort là gì?",
        "type": "single",
        "options": [
          {
            "text": "Commit hoặc stash thay đổi đang làm và kiểm tra working tree sạch",
            "correct": true
          },
          {
            "text": "Xóa thư mục `.git`",
            "correct": false
          },
          {
            "text": "Đổi tên mọi tệp trong repository",
            "correct": false
          },
          {
            "text": "Tạo thêm một merge commit rỗng",
            "correct": false
          }
        ],
        "explanation": "Bắt đầu merge từ trạng thái sạch giúp bạn biết phần nào thuộc về merge và giảm nguy cơ mất sửa đổi."
      },
      {
        "id": "q5",
        "question": "Nếu chạy `git merge --abort` khi không có merge nào đang dở, điều gì xảy ra?",
        "type": "single",
        "options": [
          {
            "text": "Git báo rằng không có merge để hủy",
            "correct": true
          },
          {
            "text": "Git tự tạo một nhánh mới",
            "correct": false
          },
          {
            "text": "Toàn bộ commit bị xóa",
            "correct": false
          },
          {
            "text": "Git chạy git reset --hard thay bạn",
            "correct": false
          }
        ],
        "explanation": "Abort cần một tiến trình merge chưa kết thúc; lệnh không phải cách hoàn tác chung."
      },
      {
        "id": "q6",
        "question": "Sau khi abort, điều gì vẫn còn nếu lệnh thành công?",
        "type": "single",
        "options": [
          {
            "text": "Nhánh nguồn và các commit đã có của nhánh đó",
            "correct": true
          },
          {
            "text": "Merge đang dở cùng các conflict markers",
            "correct": false
          },
          {
            "text": "Một merge commit mới",
            "correct": false
          },
          {
            "text": "Toàn bộ thay đổi chưa commit chắc chắn được xóa an toàn",
            "correct": false
          }
        ],
        "explanation": "Abort dừng lần merge nhưng không xóa nhánh nguồn hay các commit đã tạo trước đó."
      }
    ]
  }
};
export default lesson;
