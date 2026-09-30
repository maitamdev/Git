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
      "Đọc hiểu cú pháp hiển thị khác biệt theo từng dòng code của `git diff`.",
      "Phân biệt rõ ràng giữa so sánh Working Tree (`git diff`) và so sánh Staging Area (`git diff --staged`).",
      "So sánh sự khác biệt giữa hai commit hoặc hai nhánh bất kỳ."
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
      "git diff --staged",
      "git diff HEAD",
      "git diff <commit1> <commit2>"
    ]
  },
  "content": "# So sánh khác biệt với git diff\n\n---\n\n## 🎯 Mục tiêu\n- Đọc hiểu cú pháp hiển thị khác biệt theo từng dòng code của `git diff`.\n- Phân biệt rõ ràng giữa so sánh Working Tree (`git diff`) và so sánh Staging Area (`git diff --staged`).\n- So sánh sự khác biệt giữa hai commit hoặc hai nhánh bất kỳ.\n\n---\n\n## 📖 Định nghĩa\n> `git diff` là câu lệnh chuyên dụng để tính toán và hiển thị trực quan sự khác biệt chi tiết theo từng dòng code giữa các vùng làm việc của Git. Định dạng hiển thị của diff tuân theo chuẩn Unified Diff: các dòng bị xóa bắt đầu bằng dấu trừ màu đỏ (`-`), các dòng được thêm mới bắt đầu bằng dấu cộng màu xanh lá (`+`), và các dòng giữ nguyên không đổi xung quanh đóng vai trò ngữ cảnh định vị vị trí sửa đổi trong tệp.\n\n---\n\n## 🤔 Tại sao cần?\nTrước khi đưa code vào Staging Area hoặc tạo commit, việc rà soát kỹ lưỡng từng dòng code bạn vừa thay đổi là thói quen sống còn để loại bỏ các lỗi sơ đẳng như in log rác, biến thử nghiệm chưa xóa, hoặc vô tình sửa nhầm dòng code của tính năng khác. `git diff` chính là chiếc gương soi giúp bạn tự kiểm duyệt (Self-review) chất lượng sản phẩm của chính mình trước khi công khai nó cho đồng nghiệp xem.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy tưởng tượng git diff giống như tính năng So sánh văn bản (Track Changes) trong Microsoft Word hoặc tính năng so màu ảnh cũ và ảnh mới của một bức danh họa sau khi hoàn tất công đoạn trùng tu tỉ mỉ. Hai bức tranh được xếp chồng lên nhau dưới ánh sáng laser đặc biệt: những nét vẽ cũ đã bị cạo đi hoặc thay thế sẽ phát sáng màu đỏ rực rỡ, còn những nét vẽ mới vừa được người phục chế thêm vào sẽ phát sáng màu xanh lá cây tươi sáng. Nhờ đó, người thẩm định có thể nhìn thấy từng nét cọ sai lệch mà không bỏ sót bất kỳ chi tiết nhỏ nào.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCấu trúc hiển thị Unified Diff:\ndiff --git a/app.js b/app.js\n--- a/app.js  (Phiên bản cũ trước khi sửa)\n+++ b/app.js  (Phiên bản mới đang sửa)\n@@ -1,3 +1,4 @@\n function calculateTotal(price) {\n-    return price * 0.1;       <── Dòng cũ bị xóa bỏ (màu đỏ)\n+    const tax = 0.08;         <── Dòng mới được thêm vào (màu xanh lá)\n+    return price * (1 + tax); <── Dòng mới được thêm vào (màu xanh lá)\n }\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKỹ sư đang sửa lỗi tính sai thuế giá trị gia tăng trong tệp thanh toán invoice.js của cổng thanh toán trực tuyến. Sau khi gõ code xong trong trình soạn thảo VS Code, kỹ sư mở cửa sổ dòng lệnh terminal và gõ ngay lệnh `git diff` để tự kiểm tra lại. Màn hình hiển thị rõ ràng dòng tính thuế cũ mười phần trăm bị gạch đỏ có dấu trừ ở đầu, và dòng tính thuế mới tám phần trăm có dấu cộng màu xanh lá. Sau khi đối chiếu cẩn thận và chắc chắn không có bất kỳ dòng log thử nghiệm nào bị bỏ quên, kỹ sư mới an tâm thực hiện lệnh `git add invoice.js` để đóng gói commit an toàn.\n\n---\n\n## 💻 Command\n```bash\ngit diff\ngit diff --staged\ngit diff HEAD\ngit diff <commit1> <commit2>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git diff`: So sánh sự khác biệt giữa Working Directory và Staging Area (những thay đổi chưa được add).\n- `git diff --staged` (hoặc `--cached`): So sánh sự khác biệt giữa Staging Area và commit gần nhất tại HEAD (những thay đổi chuẩn bị commit).\n- `git diff HEAD`: So sánh toàn bộ thay đổi trong thư mục làm việc so với commit gần nhất tại HEAD.\n- `git diff <commit1> <commit2>`: So sánh sự khác biệt tổng thể giữa hai mốc commit bất kỳ trong lịch sử.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Chạy git diff sau khi đã git add và tưởng code bị mất**:  Khi đã add vào Staging Area, bạn phải dùng `git diff --staged` mới xem được khác biệt.\n2. **Sợ hãi các ký hiệu @@ trong kết quả diff**:  Không hiểu rằng `@@ -a,b +c,d @@` chỉ là tọa độ số dòng code trong tệp tin.\n3. **Không đọc diff trước khi commit**:  Thói quen xấu dẫn đến việc commit cả mật khẩu hoặc các câu lệnh console.log thử nghiệm.\n\n---\n\n## 🧪 Lab\n1. Chỉnh sửa một dòng code trong tệp `app.js` và lưu lại.\n2. Chạy lệnh `git diff` để quan sát dòng code cũ màu đỏ và dòng code mới màu xanh.\n3. Chạy `git add app.js`, sau đó chạy lại `git diff` (kết quả sẽ rỗng).\n4. Chạy `git diff --staged` để thấy lại các dòng thay đổi đang nằm trong vùng chuẩn bị.\n\n---\n\n## 💡 Hint\n> Nhớ quy tắc: `git diff` xem tệp chưa add; `git diff --staged` xem tệp đã add.\n\n---\n\n## ✅ Validation\n- Đọc hiểu chính xác các dòng cộng trừ trong kết quả hiển thị của git diff.\n\n---\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm sau về cách sử dụng câu lệnh so sánh git diff.\n\n---\n\n## 🔥 Challenge\nGiải thích ý nghĩa của dòng tọa độ hunk header `@@ -15,7 +15,9 @@` trong kết quả diff.\n\n---\n\n## 📚 Tổng kết\n- `git diff` so sánh Working Directory với Staging Area (code chưa staged).\n- `git diff --staged` so sánh Staging Area với HEAD (code chuẩn bị commit).\n- Dấu trừ màu đỏ thể hiện dòng bị xóa; dấu cộng màu xanh thể hiện dòng được thêm mới.\n",
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
        "question": "Trong kết quả hiển thị của git diff, một dòng bắt đầu bằng dấu cộng `+` màu xanh lá có ý nghĩa gì?",
        "type": "single",
        "options": [
          {
            "text": "Dòng code đó vừa mới được bổ sung thêm vào tệp tin",
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
        "explanation": "Quy ước Unified Diff sử dụng dấu cộng `+` để biểu diễn dòng văn bản mới được thêm vào."
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
        "explanation": "Tự duyệt diff là bước tự kiểm tra (Self-review) quan trọng hàng đầu của một kỹ sư phần mềm cẩn trọng."
      }
    ]
  }
};
export default lesson;
