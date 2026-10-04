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
      "Nhận ra bốn trạng thái cơ bản: Untracked, Unmodified, Modified và Staged.",
      "Dự đoán trạng thái sau git add và git commit.",
      "Hiểu vì sao sửa tệp sau khi add có thể tạo trạng thái MM."
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
      "git commit -m \"test: add status example\""
    ]
  },
  "content": "# Vòng đời tệp tin trong Git\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững mô hình cỗ máy trạng thái 4 pha của tệp tin: Untracked, Unmodified, Modified và Staged.\n- Dự đoán chuẩn xác sự biến chuyển trạng thái tệp tin sau mỗi lệnh `git add` và `git commit`.\n- Giải mã hiện tượng trạng thái kép `MM` khi chỉnh sửa tệp sau khi đã đưa vào vùng đệm.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Untracked — chưa được theo dõi\n- **Nói dễ hiểu:** Tệp mới sinh ra trên đĩa cứng mà Git chưa từng được lệnh theo dõi hay lưu vào bất kỳ commit nào.\n- **Ví dụ:** Vừa tạo tệp `script.sh`, `git status` báo tệp này là Untracked với dấu hỏi đỏ `??`.\n- **Đừng nhầm:** Tệp untracked hoàn toàn độc lập với Git; nếu bạn xóa nó bằng lệnh hệ điều hành, Git sẽ không thể giúp bạn khôi phục lại.\n\n### Unmodified — chưa có thay đổi mới\n- **Nói dễ hiểu:** Tệp đã được Git theo dõi và nội dung hiện tại trên ổ đĩa hoàn toàn trùng khớp 100% với commit gần nhất ở `HEAD`.\n- **Ví dụ:** Ngay sau khi bạn chạy `git commit`, toàn bộ các tệp vừa commit đều trở về trạng thái Unmodified bình yên.\n- **Đừng nhầm:** Unmodified không có nghĩa là file không bao giờ bị sửa; nó chỉ biểu thị rằng không có sai biệt nào so với commit gần nhất.\n\n### Modified — đã sửa nhưng chưa staged\n- **Nói dễ hiểu:** Tệp đã thuộc diện theo dõi nhưng nội dung trên thư mục làm việc vừa bị thay đổi và bạn chưa chạy `git add`.\n- **Ví dụ:** Mở file `index.html` đã commit tuần trước ra gõ thêm một thẻ `<div>`, `git status` đánh dấu tệp là Modified.\n- **Đừng nhầm:** Trạng thái này chỉ tồn tại ở Working Tree; các thay đổi mới này sẽ không bao giờ được đưa vào commit nếu bạn không add.\n\n### Staged — đã chuẩn bị cho commit\n- **Nói dễ hiểu:** Bản chụp snapshot cụ thể của tệp đã được đưa vào Staging Area, sẵn sàng niêm phong vào commit tiếp theo.\n- **Ví dụ:** Chạy `git add README.md` đưa toàn bộ phần sửa đổi vừa rồi vào khay chờ commit.\n- **Đừng nhầm:** Nếu bạn sửa file thêm một lần nữa sau khi đã add, Git sẽ tách thành hai bản: bản đã Staged và phần mới Modified.\n\n---\n\n## 📖 Định nghĩa\nVòng đời tệp tin trong Git là một cỗ máy trạng thái tuần hoàn (State Machine) quản lý sự biến chuyển của tệp. Một tệp trải qua bốn pha chuyển động chính: Untracked (tệp mới chưa giám sát), Unmodified (tệp đã theo dõi và đồng nhất với commit gần nhất), Modified (tệp đã có sửa đổi cục bộ) và Staged (phiên bản snapshot đã được nạp vào khay chuẩn bị commit).\n\n---\n\n## 🤔 Tại sao cần?\nNắm vững vòng đời tệp tin là điều kiện tiên quyết để bạn làm chủ toàn bộ hành vi của Git mà không bao giờ bị bất ngờ. Khi hiểu rõ cỗ máy trạng thái, bạn sẽ giải mã được ngay tại sao cùng một file lại có thể xuất hiện ký hiệu lưỡng tính kỳ lạ `MM` trong `git status -s`, biết chính xác lúc nào cần gõ `git add` và kiểm soát 100% phiên bản mã nguồn sẽ đi vào lịch sử.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy xem vòng đời tệp tin như các chặng bay của một hành khách: Đầu tiên bạn là khách vãng lai chưa làm thủ tục (Untracked). Sau khi mua vé và làm thủ tục check-in (Staged), bạn bước lên máy bay hạ cánh an toàn tại điểm đến (Unmodified). Khi bạn tháo dây an toàn đứng dậy đi lại (Modified), bạn cần làm thủ tục kiểm soát an ninh lần nữa trước khi lên chuyến bay kế tiếp.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCỖ MÁY TRẠNG THÁI VÒNG ĐỜI TỆP TIN TRONG GIT:\n\n               ┌─────────────── git add <tệp> ───────────────┐\n               │                                             │\n               ▼                                             │\n      ┌─────────────────┐                     ┌─────────────────┐\n      │     STAGED      │─── git commit ─────►│   UNMODIFIED    │\n      └─────────────────┘                     └─────────────────┘\n               ▲                                       │\n               │ git add                               │ Chỉnh sửa tệp\n               │                                       ▼\n      ┌─────────────────┐                     ┌─────────────────┐\n      │   MODIFIED      │◄─── (Sửa tiếp) ─────│   (Đang sửa)    │\n      └─────────────────┘                     └─────────────────┘\n               ▲\n               │ git add\n      ┌─────────────────┐\n      │    UNTRACKED    │ (Tệp mới tạo ngoài ổ đĩa)\n      └─────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn tạo tệp `profile.js` (Untracked). Chạy `git add profile.js` đưa tệp vào hàng chờ (Staged). Bạn bấm `git commit` lưu lại, tệp trở nên phẳng lặng (Unmodified). Một tiếng sau, bạn mở file sửa thêm trường avatar: Git lập tức đánh dấu tệp là Modified. Nếu bạn add phần avatar rồi sửa tiếp trường bio, Git ghi nhận trạng thái kép `MM` độc đáo.\n\n---\n\n## 💻 Command\n```bash\ngit status -s\ngit add <tên-tệp>\ngit commit -m \"feat: complete file state transition\"\n```\n\n---\n\n## 🔍 Giải thích command\n- `git status -s`: Chiếc la bàn hiển thị trạng thái rút gọn hai cột: ký tự cột 1 đại diện cho Index/Staged, ký tự cột 2 đại diện cho Working Tree/Modified.\n- `git add <tên-tệp>`: Lệnh thúc đẩy sự chuyển dịch trạng thái từ Untracked hoặc Modified tiến thẳng vào Staged.\n- `git commit -m \"<thông-điệp>\"`: Niêm phong toàn bộ tệp Staged vào snapshot mới và đưa trạng thái các tệp đó về Unmodified sạch sẽ.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Lầm tưởng tệp chỉ có thể ở một trạng thái duy nhất**: Hiện tượng `MM` xảy ra khi tệp đã được stage một phần nhưng sau đó lại tiếp tục bị sửa ở Working Tree, sinh ra hai phiên bản song song.\n2. **Nghĩ rằng tệp Untracked sẽ được Git sao lưu**: Nếu tệp chưa từng được add và commit, bất kỳ sự cố mất điện hay xóa nhầm nào cũng làm mất tệp vĩnh viễn không thể cứu bằng Git.\n3. **Nhầm lẫn giữa tệp bị xóa (Deleted) và Untracked**: Xóa một tệp đã Tracked sẽ đưa tệp vào trạng thái `D` (Deleted), hoàn toàn khác với một tệp mới tinh `??` (Untracked).\n\n---\n\n## 🧪 Lab\n1. Tạo tệp mới `status-test.txt` và chạy `git status -s` để thấy ký hiệu `?? status-test.txt` (Untracked).\n2. Chạy `git add status-test.txt` và quan sát ký tự chuyển thành `A  status-test.txt` (Staged).\n3. Chạy `git commit -m \"test: add status example\"`; kiểm tra `git status -s` thấy danh sách hoàn toàn trống sạch (Unmodified).\n4. Mở tệp `status-test.txt` sửa một dòng chữ; chạy `git status -s` để thấy ký tự ` M status-test.txt` (Modified).\n\n---\n\n## 💡 Hint\n> Trong `git status -s`: Cột bên trái đại diện cho vùng Staging Area, cột bên phải đại diện cho thư mục làm việc Working Tree!\n\n---\n\n## ✅ Validation\n- Giải thích chính xác chuỗi biến chuyển trạng thái từ Untracked -> Staged -> Unmodified -> Modified.\n- Đọc hiểu thành thạo ký hiệu rút gọn của các trạng thái trong terminal.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để kiểm tra mức độ thấu suốt về cỗ máy trạng thái vòng đời tệp tin trong Git.\n\n---\n\n## 🔥 Challenge\nHãy chủ động tạo ra một tệp có trạng thái `MM` trong `git status -s` trên máy của bạn. Trình bày chi tiết từng bước thao tác và giải thích nội dung nào sẽ đi vào commit nếu bạn gõ `git commit` ngay tại thời điểm đó?\n\n---\n\n## 📚 Tổng kết\n- Vòng đời tệp tin trong Git là cỗ máy trạng thái gồm 4 pha: Untracked, Unmodified, Modified và Staged.\n- Sau khi commit thành công, các tệp vừa commit tự động chuyển về trạng thái tĩnh Unmodified.\n- Sửa tiếp tệp sau khi add sẽ tạo ra trạng thái kép `MM`, đòi hỏi bạn phải add lại nếu muốn đưa nội dung mới nhất vào commit.\n",
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
            "text": "Nội dung tệp trong Working Tree đang khớp với phiên bản đã lưu gần nhất",
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
        "explanation": "Unmodified nghĩa là Git chưa thấy sửa đổi mới trong Working Tree so với trạng thái đã lưu."
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
      },
      {
        "id": "q5",
        "question": "Đâu là thứ tự thường gặp của một tệp mới khi bạn muốn lưu nó vào lịch sử Git?",
        "type": "single",
        "options": [
          {
            "text": "Untracked → Staged → sau commit, tệp thành tracked và Unmodified",
            "correct": true
          },
          {
            "text": "Committed → Untracked → Modified → Staged",
            "correct": false
          },
          {
            "text": "Modified → Unmodified → Untracked → Committed",
            "correct": false
          },
          {
            "text": "Staged → Deleted → Remote → Unmodified",
            "correct": false
          }
        ],
        "explanation": "Tệp mới bắt đầu là Untracked; `git add` stage tệp và `git commit` ghi mốc. Nếu không sửa thêm, trạng thái sau commit là Unmodified."
      }
    ]
  }
};
export default lesson;
