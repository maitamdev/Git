import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "09-git-diff",
  "moduleId": "02-git-basics",
  "metadata": {
    "id": "09-git-diff",
    "title": "So sánh khác biệt với git diff",
    "level": "beginner",
    "duration": 30,
    "xp": 90,
    "prerequisites": [
      "08-git-log"
    ],
    "objectives": [
      "Đọc dấu - và + để nhận ra dòng cũ bị bỏ và dòng mới được thêm.",
      "Phân biệt git diff với git diff --staged.",
      "Xem lại thay đổi trước khi đưa vào commit."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "inspect-diff"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git diff",
      "so sanh",
      "khac biet",
      "patch",
      "staged diff"
    ],
    "commands": [
      "git diff",
      "git diff --staged"
    ]
  },
  "content": "# So sánh khác biệt với git diff\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững cách đọc hiểu ký hiệu `-` (xóa/cũ) và `+` (thêm/mới) trong kết quả so sánh diff.\n- Phân biệt triệt để phạm vi kiểm tra giữa `git diff` (so sánh Working Tree) và `git diff --staged` (so sánh Staging Area).\n- Đọc hiểu cấu trúc một Hunk và tiêu đề định vị `@@` trong bản đối chiếu mã nguồn.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Diff — phần thay đổi giữa hai phiên bản\n- **Nói dễ hiểu:** Bản báo cáo trực quan so sánh chi tiết từng dòng code sai khác giữa hai mốc thời gian hoặc hai khu vực của Git.\n- **Ví dụ:** Bản diff chỉ ra dòng `timeout = 5000` cũ bị xóa và thay thế bằng dòng `timeout = 10000` mới.\n- **Đừng nhầm:** Diff chỉ đóng vai trò phân tích và hiển thị sự khác biệt; bản thân việc xem diff không tạo ra bất kỳ commit hay nhánh nào.\n\n### `git diff` — so sánh bản đang sửa\n- **Nói dễ hiểu:** Lệnh mặc định giúp bạn soi sự khác biệt giữa thư mục làm việc (Working Tree) và vùng đệm (Staging Area).\n- **Ví dụ:** Vừa sửa xong 5 dòng trong `user.service.ts`, gõ ngay `git diff` để kiểm tra lại trước khi gõ `git add`.\n- **Đừng nhầm:** Khi bạn đã đưa file vào Staging Area bằng `git add`, lệnh `git diff` mặc định sẽ không còn hiển thị những thay đổi đó nữa.\n\n### `--staged` — xem phần đã chuẩn bị\n- **Nói dễ hiểu:** Cờ tùy chọn (tương đương `--cached`) cho phép soi sự khác biệt giữa Staging Area và commit gần nhất ở `HEAD`.\n- **Ví dụ:** Sau khi chạy `git add`, bạn gõ `git diff --staged` để rà soát lần cuối toàn bộ nội dung sắp sửa được niêm phong vào commit.\n- **Đừng nhầm:** Cờ `--staged` chỉ dùng để đọc và kiểm tra nội dung trong vùng đệm, không có tác dụng đưa thêm file vào Staging Area.\n\n### Hunk — một nhóm dòng thay đổi\n- **Nói dễ hiểu:** Một khối thay đổi cục bộ gồm vài dòng code lân cận nhau được gom lại, bắt đầu bằng header vị trí có dạng `@@ -a,b +c,d @@`.\n- **Ví dụ:** Nếu bạn sửa dòng 10 và sửa tiếp dòng 200 trong cùng một file dài, kết quả diff sẽ được chia thành hai hunk tách biệt.\n- **Đừng nhầm:** Dòng header chứa ký hiệu `@@` là siêu dữ liệu định vị dòng của Git, tuyệt đối không phải là nội dung code trong file của bạn.\n\n---\n\n## 📖 Định nghĩa\n`git diff` là kính hiển vi của kỹ sư phần mềm, hiển thị chi tiết từng ký tự và từng dòng code sai biệt giữa hai trạng thái trong Git. Kết quả diff phân định rõ ràng bằng quy ước màu và ký tự: dấu trừ `-` (thường màu đỏ) đánh dấu dòng bị xóa hoặc thay thế, dấu cộng `+` (thường màu xanh) đánh dấu dòng mới được bổ sung.\n\n---\n\n## 🤔 Tại sao cần?\nGõ `git commit` mà không đọc diff trước đó chẳng khác nào ký vào một hợp đồng kinh tế mà không thèm đọc các điều khoản nhỏ. `git diff` giúp bạn soi rõ từng biến đổi: kịp thời xóa bỏ những câu lệnh `console.log` nháp, các đoạn code thử nghiệm thừa thãi, phát hiện lỗi chính tả ngớ ngẩn và ngăn chặn nguy cơ rò rỉ mật khẩu hay token bảo mật trước khi chúng trở thành một phần của lịch sử dự án vĩnh viễn.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy xem `git diff` như chức năng 'Track Changes' (theo dõi sửa đổi) trong Microsoft Word hay tính năng so sánh tài liệu pháp lý. Bên trái là bản gốc trong quá khứ, bên phải là bản hiện tại bạn vừa gõ. Bất kỳ ký tự nào bị gạch đỏ gỡ bỏ hay được tô xanh thêm vào đều hiện hình minh bạch dưới ánh đèn soi của diff.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCƠ CHẾ SOI KHÁC BIỆT CỦA HAI LỆNH DIFF:\n\nWorking Tree ──────── git diff ────────► Staging Area ─── git diff --staged ───► HEAD Commit\n (Đang gõ code)                         (Đã git add)                              (Lịch sử lưu)\n\nĐỌC HIỂU ĐỊNH DẠNG DIFF CHUẨN:\ndiff --git a/app.js b/app.js\n--- a/app.js                       <── a/ là phiên bản cũ\n+++ b/app.js                       <── b/ là phiên bản mới\n@@ -1,3 +1,3 @@                    <── Header Hunk: bắt đầu từ dòng 1\n const title = \"Project\";\n-const port = 3000;                <── Dấu trừ (-): dòng cũ bị loại bỏ\n+const port = 8080;                <── Dấu cộng (+): dòng mới được thêm vào\n const host = \"localhost\";\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn vừa sửa hàm tính thuế trong `tax.js`. Trước khi commit, bạn chạy `git diff` và giật mình phát hiện ngoài việc sửa tỷ lệ thuế VAT từ 10% thành 8%, bạn còn vô tình gõ nhầm một ký tự lạ ở dòng 45 và quên xóa câu lệnh `debugger;`. Nhờ đọc diff, bạn lập tức dọn sạch mã nguồn trước khi đẩy lên cho cả nhóm.\n\n---\n\n## 💻 Command\n```bash\ngit diff\ngit diff --staged\ngit diff HEAD\ngit diff app.js\n```\n\n---\n\n## 🔍 Giải thích command\n- `git diff`: So sánh những thay đổi chưa được add (Working Tree vs Staging Area).\n- `git diff --staged` (hoặc `--cached`): So sánh những thay đổi đã được add và chuẩn bị commit (Staging Area vs HEAD).\n- `git diff HEAD`: So sánh toàn bộ thay đổi cả đã add lẫn chưa add so với commit gần nhất.\n- `git diff <tên-tệp>`: Giới hạn phạm vi so sánh chỉ trên một tệp duy nhất để dễ tập trung theo dõi.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Hoang mang khi `git diff` trống trơn sau khi `git add`**: Nghĩ rằng code bị mất tích; thực chất khi code đã vào Staging Area, bạn bắt buộc phải dùng `git diff --staged`.\n2. **Nhầm lẫn tiêu đề hunk `@@ -a,b +c,d @@` là code**: Tưởng nhầm dòng siêu dữ liệu định vị dòng của Git là code bị lỗi sinh ra.\n3. **Bỏ qua bước đọc diff trước khi commit**: Thói quen cẩu thả dẫn đến việc commit cả mật khẩu bí mật, token cá nhân hoặc code nháp vào repository.\n\n---\n\n## 🧪 Lab\n1. Mở tệp `app.js`, chỉnh sửa một dòng bất kỳ và lưu lại file.\n2. Chạy lệnh `git diff`; quan sát kỹ dòng cũ bị xóa mang dấu `-` đỏ và dòng mới thêm mang dấu `+` xanh.\n3. Chạy `git add app.js`, rồi chạy lại `git diff` (lúc này kết quả trống trơn vì thay đổi đã vào Staging Area).\n4. Chạy `git diff --staged` để thấy lại toàn bộ khối thay đổi sẵn sàng được commit.\n\n---\n\n## 💡 Hint\n> Nhớ câu khẩu quyết kỹ sư: \"Chưa add thì gõ `git diff`, đã add thì gõ `git diff --staged`!\"\n\n---\n\n## ✅ Validation\n- Nhận diện chính xác dòng bị xóa (`-`) và dòng thêm mới (`+`).\n- Phân biệt thành thạo kết quả trả về của `git diff` và `git diff --staged`.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để rèn luyện kỹ năng phân tích và đọc hiểu các định dạng diff trong Git.\n\n---\n\n## 🔥 Challenge\nChỉnh sửa hai dòng tại hai vị trí cách nhau hơn 50 dòng trong cùng một tệp code. Chạy `git diff` và giải thích tại sao Git lại tách kết quả thành hai Hunk riêng biệt thay vì in toàn bộ tệp từ đầu đến cuối?\n\n---\n\n## 📚 Tổng kết\n- `git diff` giúp rà soát chi tiết từng dòng code trước khi tạo snapshot vĩnh viễn.\n- Dấu `-` đại diện cho phiên bản cũ bị loại bỏ; dấu `+` đại diện cho phiên bản mới được đưa vào.\n- Luôn kiểm tra `git diff --staged` như bước tổng duyệt cuối cùng trước khi bấm lệnh commit.\n",
  "quiz": {
    "id": "quiz-02-09-git-diff",
    "title": "Trắc nghiệm: So sánh khác biệt với git diff",
    "questions": [
      {
        "id": "q1",
        "question": "Lệnh `git diff` không có tham số so sánh sự khác nhau giữa hai khu vực nào?",
        "type": "single",
        "options": [
          {
            "text": "Working Directory và Staging Area (những sửa đổi chưa được git add)",
            "correct": true
          },
          {
            "text": "Staging Area và commit gần nhất tại HEAD",
            "correct": false
          },
          {
            "text": "Nhánh main cục bộ và nhánh main trên GitHub",
            "correct": false
          },
          {
            "text": "Hai máy tính khác nhau trong cùng mạng LAN",
            "correct": false
          }
        ],
        "explanation": "`git diff` mặc định hiển thị những thay đổi đang nằm dở dang ở Working Directory mà chưa được đưa vào Staging Area."
      },
      {
        "id": "q2",
        "question": "Sau khi bạn đã chạy `git add .`, lệnh nào sẽ giúp bạn xem lại chi tiết nội dung những thay đổi đã được staged?",
        "type": "single",
        "options": [
          {
            "text": "git diff --staged (hoặc git diff --cached)",
            "correct": true
          },
          {
            "text": "git diff",
            "correct": false
          },
          {
            "text": "git log --diff-only",
            "correct": false
          },
          {
            "text": "git status --show-lines",
            "correct": false
          }
        ],
        "explanation": "`git diff --staged` (đồng nghĩa với `--cached`) so sánh nội dung trong Staging Area với snapshot HEAD gần nhất."
      },
      {
        "id": "q3",
        "question": "Trong kết quả `git diff`, một dòng nội dung bắt đầu bằng dấu `+` có ý nghĩa gì?",
        "type": "single",
        "options": [
          {
            "text": "Dòng đó thuộc phần mới được thêm vào so với bản cũ",
            "correct": true
          },
          {
            "text": "Dòng code đó đã bị xóa bỏ khỏi dự án",
            "correct": false
          },
          {
            "text": "Dòng code đó bị lỗi cú pháp lập trình",
            "correct": false
          },
          {
            "text": "Dòng code đó được tải về từ kho lưu trữ của đối thủ",
            "correct": false
          }
        ],
        "explanation": "Dấu `+` biểu thị một dòng thuộc phiên bản mới; màu sắc tùy terminal."
      },
      {
        "id": "q4",
        "question": "Tại sao lập trình viên nên chạy git diff trước khi commit code?",
        "type": "single",
        "options": [
          {
            "text": "Để tự kiểm tra lại từng dòng code thay đổi, loại bỏ dòng nháp thừa và tránh commit nhầm",
            "correct": true
          },
          {
            "text": "Để Git tự động chỉnh sửa lỗi ngữ pháp tiếng Anh trong mã nguồn",
            "correct": false
          },
          {
            "text": "Để giải phóng dung lượng bộ nhớ RAM máy tính",
            "correct": false
          },
          {
            "text": "Để kích hoạt bản quyền dùng thử miễn phí của phần mềm",
            "correct": false
          }
        ],
        "explanation": "Đọc diff giúp bạn kiểm tra chính xác phần mình sắp đưa vào commit."
      },
      {
        "id": "q5",
        "question": "Trong một đoạn thay đổi của `git diff`, dòng nội dung bắt đầu bằng dấu `-` thuộc phần nào?",
        "type": "single",
        "options": [
          {
            "text": "Phiên bản cũ; dòng đó đã bị bỏ hoặc thay thế",
            "correct": true
          },
          {
            "text": "Phiên bản mới được thêm vào",
            "correct": false
          },
          {
            "text": "Thông tin tài khoản GitHub",
            "correct": false
          },
          {
            "text": "Dòng lệnh phải gõ vào terminal",
            "correct": false
          }
        ],
        "explanation": "Dấu `-` chỉ nội dung có trong bản cũ nhưng không còn nguyên trạng trong bản mới."
      }
    ]
  }
};
export default lesson;
