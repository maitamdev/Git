import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "11-file-lifecycle",
  "moduleId": "02-git-basics",
  "metadata": {
    "id": "11-file-lifecycle",
    "title": "Vòng đời tệp tin trong Git",
    "level": "beginner",
    "duration": 25,
    "xp": 70,
    "prerequisites": [
      "10-gitignore"
    ],
    "objectives": [
      "Nắm vững toàn diện 4 trạng thái vòng đời của một tệp tin trong Git: Untracked, Unmodified, Modified, Staged.",
      "Vẽ và phân tích được cỗ máy trạng thái (State Machine) chuyển dịch giữa các khu vực.",
      "Dự đoán chính xác trạng thái của tệp tin sau mỗi câu lệnh Git thực thi."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "file lifecycle",
      "vong doi tep tin",
      "tracked",
      "untracked",
      "modified",
      "staged"
    ],
    "commands": [
      "git status -s",
      "git add <file>",
      "git commit"
    ]
  },
  "content": "# Vòng đời tệp tin trong Git\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững toàn diện 4 trạng thái vòng đời của một tệp tin trong Git: Untracked, Unmodified, Modified, Staged.\n- Vẽ và phân tích được cỗ máy trạng thái (State Machine) chuyển dịch giữa các khu vực.\n- Dự đoán chính xác trạng thái của tệp tin sau mỗi câu lệnh Git thực thi.\n\n---\n\n## 📖 Định nghĩa\n> Vòng đời của tệp tin trong Git là mô hình trạng thái mô tả hành trình biến đổi của một tệp mã nguồn xuyên suốt quá trình phát triển dự án. Tất cả các tệp trong thư mục làm việc của bạn đều thuộc một trong hai nhóm chính: Tracked (được theo dõi trong lịch sử) hoặc Untracked (chưa từng được theo dõi). Một tệp Tracked sẽ luân chuyển liên tục qua ba trạng thái con: Unmodified (nguyên vẹn trùng khớp với commit), Modified (đã bị chỉnh sửa nội dung nhưng chưa stage), và Staged (đã được đánh dấu chuẩn bị đưa vào commit kế tiếp).\n\n---\n\n## 🤔 Tại sao cần?\nHiểu rõ cỗ máy trạng thái vòng đời tệp tin giúp bạn giải mã được mọi thông điệp đầu ra của Git một cách dễ dàng. Bạn sẽ không bao giờ còn thắc mắc tại sao một tệp lại vừa xuất hiện ở mục màu xanh vừa xuất hiện ở mục màu đỏ trong `git status`, hoặc tại sao lệnh chuyển nhánh lại từ chối thực thi vì tệp đang ở trạng thái Modified dở dang. Làm chủ vòng đời trạng thái là bước nhảy vọt từ một người học việc thành một lập trình viên làm chủ công cụ.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung vòng đời của tệp tin giống như vòng đời của một vị khách bước vào một sân bay quốc tế. Ban đầu, hành khách đứng ở sảnh chờ ngoài đường (Untracked). Khi bước vào cửa an ninh xuất trình vé (git add), hành khách được ghi danh vào hệ thống máy tính và bước vào phòng chờ lên máy bay (Staged). Khi máy bay cất cánh (git commit), hành khách đã chính thức nằm trong chuyến bay lịch sử (Unmodified). Nếu trong chuyến bay hành khách đổi ghế ngồi, trạng thái sẽ thành Modified.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCỗ máy trạng thái vòng đời tệp tin trong Git:\n          ┌──────────────────────────────────────────────────────────┐\n          │                                                          │\n          ▼                                                          │\n┌──────────────────┐   git add    ┌──────────────────┐  git commit   │\n│    Untracked     │ ───────────► │      Staged      │ ──────────────┘\n│ (Chưa theo dõi)  │              │ (Vùng chuẩn bị)  │ (Trở thành Unmodified)\n└──────────────────┘              └──────────────────┘\n                                           ▲\n                                           │ git add\n                                  ┌──────────────────┐\n                                  │     Modified     │ ◄── Chỉnh sửa file\n                                  │ (Đã bị sửa đổi)  │\n                                  └──────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKỹ sư tạo một tệp mã nguồn mới mang tên user.js trong thư mục dự án, lúc này tệp đang ở trạng thái Untracked hoàn toàn xa lạ với Git. Ngay sau khi kỹ sư chạy lệnh git add user.js, tệp lập tức chuyển dịch trạng thái sang Staged sẵn sàng trong vùng chuẩn bị. Kế tiếp, kỹ sư chạy lệnh git commit với thông điệp chuẩn mực, tệp được ghi vào lịch sử và trở về trạng thái Unmodified ổn định tuyệt đối. Đến buổi chiều, khi kỹ sư mở lại tệp user.js để bổ sung logic mã hóa mật khẩu người dùng, tệp chuyển sang trạng thái Modified, sẵn sàng cho một vòng tuần hoàn đóng gói commit tiếp theo.\n\n---\n\n## 💻 Command\n```bash\ngit status -s\ngit add <file>\ngit commit\n```\n\n---\n\n## 🔍 Giải thích command\n- `git status -s`: Hiển thị mã trạng thái hai cột phản ánh chính xác vị trí của tệp trong cỗ máy trạng thái.\n- `git add <file>`: Kích hoạt sự chuyển dịch trạng thái từ Untracked hoặc Modified sang Staged.\n- `git commit`: Đưa tất cả các tệp Staged trở về trạng thái Unmodified trong snapshot mới.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Không hiểu tại sao một tệp có thể vừa Staged vừa Modified**:  Khi bạn add tệp rồi lại sửa tiếp mà chưa add lần hai, tệp sẽ tồn tại đồng thời ở cả hai trạng thái.\n2. **Tưởng tệp Untracked sẽ được commit tự động**:  Git không bao giờ tự ý commit tệp chưa được add vào hệ thống theo dõi.\n3. **Nhầm lẫn giữa tệp bị xóa (Deleted) và tệp Untracked**:  Tệp đã từng commit khi bị xóa sẽ ở trạng thái Tracked/Deleted chứ không phải Untracked.\n\n---\n\n## 🧪 Lab\n1. Tạo tệp mới `status-test.txt` và kiểm tra trạng thái Untracked bằng `git status -s`.\n2. Chạy `git add status-test.txt` và quan sát ký tự `A ` (Added/Staged) màu xanh.\n3. Commit tệp và chạy `git status -s` để thấy kết quả rỗng (tất cả đều Unmodified).\n4. Mở tệp sửa một dòng để quan sát ký tự ` M` (Modified) xuất hiện ở cột thứ hai.\n\n---\n\n## 💡 Hint\n> Theo dõi sự thay đổi vị trí ký tự cột trái (Index) và cột phải (Working Tree).\n\n---\n\n## ✅ Validation\n- Giải thích được sự biến đổi trạng thái qua các bước tạo, add, commit và sửa tệp.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để kiểm tra mức độ nắm bắt cỗ máy trạng thái Git.\n\n---\n\n## 🔥 Challenge\nMô tả tình huống làm xuất hiện ký tự `MM` trong kết quả của lệnh git status -s.\n\n---\n\n## 📚 Tổng kết\n- Tệp tin trong Git gồm hai nhóm lớn: Tracked (được theo dõi) và Untracked (chưa theo dõi).\n- Tệp Tracked luân chuyển qua 3 trạng thái con: Unmodified -> Modified -> Staged.\n- Hiểu rõ vòng đời giúp bạn làm chủ hoàn toàn các câu lệnh Git và phản hồi từ git status.\n",
  "quiz": {
    "id": "quiz-02-11-file-lifecycle",
    "title": "Trắc nghiệm: Vòng đời trạng thái của File",
    "questions": [
      {
        "id": "q1",
        "question": "Một tệp tin đã từng được commit vào lịch sử, nếu bạn mở ra sửa thêm một dòng code, tệp đó sẽ ở trạng thái nào?",
        "type": "single",
        "options": [
          {
            "text": "Modified (Đã bị sửa đổi)",
            "correct": true
          },
          {
            "text": "Untracked (Chưa được theo dõi)",
            "correct": false
          },
          {
            "text": "Staged (Đã nằm trong vùng chuẩn bị)",
            "correct": false
          },
          {
            "text": "Deleted (Đã bị xóa)",
            "correct": false
          }
        ],
        "explanation": "Tệp tin đã có trong commit trước đó khi bị thay đổi nội dung trong Working Tree sẽ chuyển sang trạng thái Modified."
      },
      {
        "id": "q2",
        "question": "Trạng thái Unmodified của một tệp tin có ý nghĩa kỹ thuật gì?",
        "type": "single",
        "options": [
          {
            "text": "Nội dung tệp trong Working Tree đang trùng khớp hoàn toàn 100% với snapshot gần nhất trong commit",
            "correct": true
          },
          {
            "text": "Tệp tin đó đã bị khóa và không ai được phép sửa đổi nữa",
            "correct": false
          },
          {
            "text": "Tệp tin đó bị Git từ chối không theo dõi",
            "correct": false
          },
          {
            "text": "Tệp tin bị lỗi cú pháp chưa biên dịch được",
            "correct": false
          }
        ],
        "explanation": "Unmodified nghĩa là nội dung trong Working Tree hoàn toàn giống với commit gần nhất, không có thay đổi nào dở dang."
      },
      {
        "id": "q3",
        "question": "Lệnh nào đưa một tệp tin từ trạng thái Modified sang trạng thái Staged?",
        "type": "single",
        "options": [
          {
            "text": "git add <tên-tệp>",
            "correct": true
          },
          {
            "text": "git commit",
            "correct": false
          },
          {
            "text": "git switch",
            "correct": false
          },
          {
            "text": "git branch",
            "correct": false
          }
        ],
        "explanation": "`git add` lấy nội dung tệp Modified và đưa snapshot vào Staging Area, chuyển tệp thành Staged."
      },
      {
        "id": "q4",
        "question": "Trong lệnh `git status -s`, ký hiệu `MM` ở đầu một dòng hiển thị điều gì?",
        "type": "single",
        "options": [
          {
            "text": "Tệp đã được đưa vào Staging Area nhưng sau đó lại bị sửa tiếp trong Working Directory",
            "correct": true
          },
          {
            "text": "Tệp tin có dung lượng lớn gấp đôi bình thường",
            "correct": false
          },
          {
            "text": "Tệp tin được viết bằng ngôn ngữ Markdown",
            "correct": false
          },
          {
            "text": "Tệp tin bị mất cả hai mã băm mật mã học",
            "correct": false
          }
        ],
        "explanation": "Ký tự M thứ nhất là Staged, ký tự M thứ hai là Modified trong Working Tree; nghĩa là tệp đã add nhưng sau đó lại bị sửa tiếp."
      }
    ]
  }
};
export default lesson;
