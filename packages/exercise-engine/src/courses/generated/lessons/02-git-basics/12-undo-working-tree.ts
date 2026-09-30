import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "12-undo-working-tree",
  "moduleId": "02-git-basics",
  "metadata": {
    "id": "12-undo-working-tree",
    "title": "Hoàn tác thay đổi Working Tree",
    "level": "beginner",
    "duration": 30,
    "xp": 90,
    "prerequisites": [
      "11-file-lifecycle"
    ],
    "objectives": [
      "Sử dụng lệnh hiện đại `git restore <file>` để hủy bỏ các sửa đổi dở dang trong Working Tree.",
      "Sử dụng `git restore --staged <file>` để unstage tệp tin an toàn.",
      "Hiểu rõ sự nguy hiểm và tính không thể khôi phục khi hủy bỏ thay đổi chưa commit."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "undo-working-tree-lab"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git restore",
      "hoan tac",
      "undo",
      "working tree",
      "discard changes"
    ],
    "commands": [
      "git restore <file>",
      "git restore .",
      "git restore --staged <file>"
    ]
  },
  "content": "# Hoàn tác thay đổi Working Tree\n\n---\n\n## 🎯 Mục tiêu\n- Sử dụng lệnh hiện đại `git restore <file>` để hủy bỏ các sửa đổi dở dang trong Working Tree.\n- Sử dụng `git restore --staged <file>` để unstage tệp tin an toàn.\n- Hiểu rõ sự nguy hiểm và tính không thể khôi phục khi hủy bỏ thay đổi chưa commit.\n\n---\n\n## 📖 Định nghĩa\n> Hoàn tác thay đổi trong Working Tree là thao tác khôi phục nội dung của một hoặc nhiều tệp tin đang bị sửa đổi (Modified) trở về trạng thái nguyên bản sạch sẽ của chúng trong snapshot commit gần nhất hoặc trong Staging Area. Kể từ phiên bản Git 2.23, câu lệnh chuyên trách tiêu chuẩn được sử dụng cho mục đích này là `git restore`. Lệnh này giúp tách biệt rõ ràng tác vụ khôi phục tệp ra khỏi câu lệnh đa năng nhưng dễ gây nhầm lẫn trước đây là `git checkout`.\n\n---\n\n## 🤔 Tại sao cần?\nTrong quá trình lập trình, không hiếm những lúc bạn thử nghiệm một ý tưởng thuật toán mới hoặc tái cấu trúc một hàm phức tạp nhưng thất bại thảm hại, khiến code bị lỗi tùm lum và không thể chạy được. Thay vì phải bấm Ctrl+Z hàng trăm lần trong vô vọng và lo sợ bỏ sót lỗi, bạn chỉ cần thực thi một câu lệnh `git restore` duy nhất để đưa toàn bộ tệp tin trở về trạng thái hoạt động hoàn hảo 100% như lúc ban đầu chỉ trong một phần nghìn giây.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung thao tác `git restore` giống như việc bạn bấm nút \"Phục hồi cài đặt gốc\" (Factory Reset) trên chiếc điện thoại thông minh của mình, hoặc bấm nút hoàn tác trên bảng vẽ kỹ thuật số. Mọi nét vẽ nháp nguệch ngoạc và thử nghiệm vụng về mà bạn vừa vẽ lên tấm toan trong buổi chiều hôm nay sẽ lập tức bị xóa sạch, trả lại bức tranh nguyên mẫu hoàn hảo đã được lưu trong bộ nhớ máy ảnh từ sáng sớm.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCơ chế hoạt động của git restore:\n[Repository / HEAD] ────────── Phục hồi đè nội dung ─────────► [Working Directory]\n  (Bản mẫu an toàn)                                             (Xóa bỏ code nháp)\n         ▲                                                              ▲\n         │                                                              │\n         └───────────── git restore --staged ───► [Staging Area] ───────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột kỹ sư thử nghiệm viết lại toàn bộ module thanh toán phức tạp trong tệp payment.js nhằm hỗ trợ thêm ví điện tử mới. Tuy nhiên sau ba giờ thử nghiệm căng thẳng, giải pháp mới liên tục phát sinh ngoại lệ không mong muốn và làm vỡ toàn bộ luồng thanh toán hiện tại của khách hàng. Nhận thấy không thể tiếp tục cứu vãn đoạn code thử nghiệm dang dở này, kỹ sư mở cửa sổ terminal và thực thi ngay câu lệnh `git restore payment.js`. Ngay lập tức, tệp payment.js trên ổ đĩa được phục hồi hoàn toàn về trạng thái hoạt động trơn tru của commit gần nhất, giúp kỹ sư giải tỏa áp lực và an tâm bắt đầu lại với một hướng tiếp cận khác an toàn hơn.\n\n---\n\n## 💻 Command\n```bash\ngit restore <file>\ngit restore .\ngit restore --staged <file>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git restore <file>`: Hủy bỏ toàn bộ các thay đổi chưa staged trong tệp tin, khôi phục nội dung về trạng thái Staging Area hoặc HEAD.\n- `git restore .`: Hủy bỏ toàn bộ thay đổi chưa staged trên tất cả các tệp trong thư mục làm việc hiện tại.\n- `git restore --staged <file>`: Rút tệp tin ra khỏi Staging Area (unstage) nhưng giữ nguyên nội dung bạn đã sửa trong Working Directory.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Không nhận thức được tính nguy hiểm không thể đảo ngược của git restore**:  Các thay đổi chưa từng được commit một khi đã bị git restore sẽ biến mất vĩnh viễn và không thể cứu lại.\n2. **Nhầm lẫn giữa `git restore <file>` và `git restore --staged <file>`**:  Một đằng hủy bỏ nội dung trên ổ đĩa, một đằng chỉ rút khỏi khu vực chuẩn bị.\n3. **Sử dụng các lệnh cũ dễ gây nhầm lẫn**:  Cố dùng `git checkout -- <file>` thay vì cú pháp hiện đại rõ nghĩa `git restore`.\n\n---\n\n## 🧪 Lab\n1. Mở tệp `app.js` và thêm vào một dòng code lỗi cố ý.\n2. Kiểm tra `git status` để thấy tệp ở trạng thái Modified màu đỏ.\n3. Chạy lệnh `git restore app.js` để hủy bỏ thay đổi.\n4. Kiểm tra lại nội dung tệp để xác nhận dòng lỗi đã biến mất hoàn toàn.\n\n---\n\n## 💡 Hint\n> Hãy cẩn trọng: `git restore <file>` sẽ ghi đè vĩnh viễn nội dung chưa commit!\n\n---\n\n## ✅ Validation\n- Tệp tin được hoàn tác thành công về trạng thái sạch sẽ của HEAD.\n\n---\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm dưới đây về các thao tác hoàn tác với git restore.\n\n---\n\n## 🔥 Challenge\nNêu sự khác biệt căn bản giữa `git restore` và `git reset` trong Git hiện đại.\n\n---\n\n## 📚 Tổng kết\n- `git restore <file>` hủy bỏ các thay đổi dở dang trong Working Tree, đưa tệp về trạng thái sạch.\n- `git restore --staged <file>` rút tệp ra khỏi Staging Area mà không làm mất nội dung sửa đổi.\n- Thao tác hủy bỏ thay đổi chưa commit là vĩnh viễn, không thể phục hồi qua Git.\n",
  "quiz": {
    "id": "quiz-02-12-undo-working-tree",
    "title": "Trắc nghiệm: Hoàn tác thay đổi Working Tree",
    "questions": [
      {
        "id": "q1",
        "question": "Lệnh Git hiện đại nào được khuyến nghị sử dụng để hủy bỏ các sửa đổi chưa staged trong Working Tree?",
        "type": "single",
        "options": [
          {
            "text": "git restore <tên-tệp>",
            "correct": true
          },
          {
            "text": "git delete <tên-tệp>",
            "correct": false
          },
          {
            "text": "git cancel-all",
            "correct": false
          },
          {
            "text": "git remove --unstage",
            "correct": false
          }
        ],
        "explanation": "`git restore <tên-tệp>` là lệnh chuyên trách từ Git 2.23 để hoàn tác thay đổi trong thư mục làm việc."
      },
      {
        "id": "q2",
        "question": "Điều gì sẽ xảy ra với các dòng code bạn vừa viết thêm trong tệp nếu bạn chạy lệnh `git restore <file>` khi chưa từng commit chúng?",
        "type": "single",
        "options": [
          {
            "text": "Các dòng code đó sẽ bị xóa vĩnh viễn và không thể khôi phục lại bằng Git",
            "correct": true
          },
          {
            "text": "Git sẽ tự động lưu các dòng đó vào hòm thư điện tử cá nhân",
            "correct": false
          },
          {
            "text": "Git sẽ chuyển các dòng code đó lên máy chủ GitHub",
            "correct": false
          },
          {
            "text": "Các dòng đó sẽ được cất vào thùng rác máy tính để phục hồi sau",
            "correct": false
          }
        ],
        "explanation": "Git chỉ có thể phục hồi những gì đã từng được lưu vào cơ sở dữ liệu commit; thay đổi chưa commit sẽ mất vĩnh viễn."
      },
      {
        "id": "q3",
        "question": "Lệnh `git restore --staged index.html` thực hiện hành động gì?",
        "type": "single",
        "options": [
          {
            "text": "Rút tệp index.html ra khỏi Staging Area nhưng vẫn giữ nguyên toàn bộ code đã sửa trong Working Directory",
            "correct": true
          },
          {
            "text": "Xóa sạch tệp index.html khỏi ổ cứng máy tính",
            "correct": false
          },
          {
            "text": "Tạo một commit mới có tên là staged",
            "correct": false
          },
          {
            "text": "Đẩy tệp index.html lên nhánh chính của máy chủ từ xa",
            "correct": false
          }
        ],
        "explanation": "Cờ `--staged` chỉ hủy bỏ việc stage trong Index, không làm mất bất kỳ dòng code nào bạn đã gõ trong Working Tree."
      },
      {
        "id": "q4",
        "question": "Lệnh nào sau đây hủy bỏ tất cả các thay đổi chưa staged trên toàn bộ các tệp tin trong thư mục hiện tại?",
        "type": "single",
        "options": [
          {
            "text": "git restore .",
            "correct": true
          },
          {
            "text": "git restore --everything-delete",
            "correct": false
          },
          {
            "text": "git undo -all",
            "correct": false
          },
          {
            "text": "git clear-tree",
            "correct": false
          }
        ],
        "explanation": "`git restore .` áp dụng hoàn tác cho toàn bộ thư mục hiện tại trở xuống."
      }
    ]
  }
};
export default lesson;
