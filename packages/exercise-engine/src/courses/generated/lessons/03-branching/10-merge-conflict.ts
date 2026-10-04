import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "10-merge-conflict",
  "moduleId": "03-branching",
  "metadata": {
    "id": "10-merge-conflict",
    "title": "Xung đột Merge Conflict là gì?",
    "level": "intermediate",
    "duration": 30,
    "xp": 90,
    "prerequisites": [
      "08-three-way-merge"
    ],
    "objectives": [
      "Giải thích vì sao Git phải dừng khi không thể tự kết hợp thay đổi.",
      "Nhận diện conflict markers và xác định nội dung của mỗi nhánh.",
      "Dùng `git status` để tìm các tệp đang chờ giải quyết."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "merge-conflict"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "merge conflict",
      "xung dot",
      "conflict markers",
      "ours theirs",
      "mau thuan code"
    ],
    "commands": [
      "git merge feature-conflict",
      "git status"
    ]
  },
  "content": "# Merge conflict là gì?\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu thấu bản chất của Merge Conflict là cơ chế bảo vệ dữ liệu văn minh của Git, không phải lỗi hỏng kho mã nguồn.\n- Đọc vị và giải mã chuẩn xác cấu trúc của các dấu mốc xung đột (Conflict Markers).\n- Sử dụng thành thạo `git status` để định vị toàn bộ các tệp tin chưa được giải quyết (Unmerged Paths).\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Merge conflict — xung đột khi hợp nhất\n- **Nói dễ hiểu:** Sự bất đồng xảy ra khi hai nhánh cùng can thiệp vào cùng một vị trí trong tệp tin mà Git không thể tự phán đoán.\n- **Ví dụ:** Nhánh `main` đổi dòng 10 thành `const color = 'red'`, còn nhánh `feature` đổi thành `const color = 'blue'`.\n- **Đừng nhầm:** Cùng sửa một tệp không đồng nghĩa với xung đột; nếu hai người sửa ở các hàm hoặc các dòng khác nhau, Git sẽ tự động gộp êm đẹp.\n\n### Conflict markers — dấu đánh dấu vùng xung đột\n- **Nói dễ hiểu:** Các dòng ký tự đặc biệt do Git tự động chèn vào tệp tin để bao bọc và đối chiếu hai phiên bản code bất đồng.\n- **Ví dụ:** Cụm ký hiệu kinh điển gồm `<<<<<<< HEAD` (nhánh hiện tại), `=======` (vách ngăn) và `>>>>>>> branch-name` (nhánh nguồn).\n- **Đừng nhầm:** Đây là các ký hiệu chú thích tạm thời của Git, tuyệt đối không phải là mã nguồn hợp lệ của chương trình.\n\n### Unmerged path — tệp chưa giải quyết\n- **Nói dễ hiểu:** Danh sách các tệp tin đang bị kẹt ở trạng thái xung đột dở dang chưa được lập trình viên xử lý xong.\n- **Ví dụ:** Trong `git status`, tệp xuất hiện dưới mục cảnh báo đỏ rực: `both modified: config.json`.\n- **Đừng nhầm:** Chỉ chỉnh sửa và lưu file bằng phím tắt trong trình soạn thảo là chưa đủ; bạn phải chạy `git add` thì Git mới công nhận tệp đã hết xung đột.\n\n---\n\n## 📖 Định nghĩa\nMerge Conflict (xung đột khi hợp nhất) là tình huống Git chủ động dừng tiến trình gộp nhánh khi phát hiện hai nhánh cùng chỉnh sửa một dòng code hoặc cùng một khối nội dung theo những cách trái ngược nhau. Khi không thể suy đoán được ý định chủ quan của con người, Git từ chối tự động ghép mã nguồn nhằm bảo vệ an toàn dữ liệu và yêu cầu lập trình viên trực tiếp can thiệp.\n\n---\n\n## 🤔 Tại sao cần?\nNhiều bạn mới học coi xung đột là tai họa hoặc lỗi phần mềm, nhưng đối với kỹ sư thực chiến, xung đột là cơ chế bảo vệ tối thượng của Git. Nếu Git tự ý chọn bừa một bên hoặc xóa bên kia, hệ thống của bạn sẽ sụp đổ âm thầm mà không ai hay biết. Git dừng lại, cắm các biển báo xung đột rõ ràng để bạn và đồng đội cùng ngồi lại thống nhất giải pháp tối ưu nhất cho sản phẩm.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung bạn và đồng đội cùng chỉnh sửa một bức tranh phong cảnh. Đến góc dưới bên phải, bạn vẽ một ngọn hải đăng, còn đồng đội vẽ một cối xay gió. Git nhìn thấy hai nét vẽ đè lên nhau tại cùng một tọa độ canvas. Thay vì tự ý xóa hải đăng hay cối xay gió, Git đặt cọ vẽ xuống, khoanh vùng màu đỏ và hỏi hai họa sĩ: 'Bây giờ chỗ này vẽ gì?'.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCẤU TRÚC GIẢI PHẪU DẤU MỐC XUNG ĐỘT (CONFLICT MARKERS):\n\n<<<<<<< HEAD\nconst apiUrl = \"https://api.v1.prod.com\";  <── Bản của bạn (nhánh hiện tại)\n=======\nconst apiUrl = \"https://api.v2.beta.com\";  <── Bản của đồng đội (nhánh nguồn)\n>>>>>>> feature-conflict\n\n- Vùng từ `<<<<<<< HEAD` đến `=======`: Code của nhánh bạn đang đứng.\n- Vùng từ `=======` đến `>>>>>>>`: Code của nhánh đang được gộp vào.\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrong tệp cấu hình `env.js`, nhánh `main` vừa nâng cấp cổng máy chủ lên `PORT = 8080`, trong khi nhánh `feature-api` của bạn lại đổi thành `PORT = 9000`. Khi gộp nhánh, Git không thể biết cổng nào là đúng. Git dừng lại, đánh dấu tệp ở trạng thái conflict và chèn các ký hiệu `<<<<<<<`, `=======`, `>>>>>>>` để bạn quyết định cổng chính thức.\n\n---\n\n## 💻 Command\n```bash\ngit status\ngit merge feature-conflict\ngit diff\n```\n\n---\n\n## 🔍 Giải thích command\n- `git merge <tên-nhánh>`: Khởi động quá trình hợp nhất; nếu có xung đột, terminal sẽ in thông báo đỏ: `Automatic merge failed; fix conflicts and then commit the result`.\n- `git status`: Hiển thị rõ ràng danh sách các tệp bị xung đột dưới tiêu đề `Unmerged paths: both modified`.\n- `git diff`: Soi nhanh các vùng xung đột ngay trên màn hình terminal mà chưa cần mở file code.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Hoảng loạn xóa kho mã nguồn khi thấy conflict**: Tưởng Git bị hỏng; thực chất đây là bước làm việc hoàn toàn bình thường hàng ngày của mọi Senior Developer.\n2. **Bấm chọn bừa \"Accept Current\" hoặc \"Accept Incoming\"**: Không thèm đọc code mà chọn đại một bên, dẫn tới việc xóa mất tính năng quan trọng của đồng đội.\n3. **Để quên ký hiệu `<<<<<<<` hoặc `=======` rồi commit**: Khiến mã nguồn bị lỗi cú pháp nghiêm trọng (syntax error) ngay khi đưa lên môi trường chạy thử.\n\n---\n\n## 🧪 Lab\n1. Đang ở `main`, tạo file `conflict.txt` với dòng chữ: `Màu nền: trắng`, rồi add và commit.\n2. Chạy `git switch -c feature-conflict`, sửa dòng đó thành: `Màu nền: xanh`, rồi add và commit.\n3. Chạy `git switch main`, sửa cùng dòng đó thành: `Màu nền: đỏ`, rồi add và commit.\n4. Chạy lệnh: `git merge feature-conflict`. Git lập tức dừng lại và thông báo xung đột.\n5. Chạy `git status` và mở file `conflict.txt` ra để quan sát trọn vẹn 3 vạch đánh dấu `<<<<<<<`, `=======`, `>>>>>>>`. (Giữ nguyên tệp để làm tiếp bài sau).\n\n---\n\n## 💡 Hint\n> Đoạn code nằm giữa `<<<<<<< HEAD` và `=======` là của bạn; đoạn code nằm giữa `=======` và `>>>>>>>` là của nhánh được gộp vào!\n\n---\n\n## ✅ Validation\n- Terminal báo cáo trạng thái `Automatic merge failed; fix conflicts and then commit the result`.\n- Lệnh `git status` liệt kê `conflict.txt` trong danh sách `Unmerged paths`.\n- Tệp tin chứa đầy đủ các dấu mốc xung đột sẵn sàng cho bước gỡ lỗi.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để rèn luyện kỹ năng nhận diện và phân tích giải phẫu vùng xung đột trong Git.\n\n---\n\n## 🔥 Challenge\nHãy giải thích tại sao hai người cùng sửa vào hai hàm khác nhau trong cùng một tệp dài 500 dòng code thì Git lại có thể tự động gộp mượt mà mà không hề sinh ra xung đột? Git dựa vào cơ chế chia nhỏ nào để làm được điều đó?\n\n---\n\n## 📚 Tổng kết\n- Merge Conflict là tính năng bảo vệ an toàn dữ liệu, không phải là lỗi hỏng Git.\n- Cấu trúc conflict gồm 3 vạch: `<<<<<<< HEAD`, vách ngăn `=======` và `>>>>>>> branch`.\n- Luôn giữ bình tĩnh, mở tệp kiểm tra kỹ lưỡng trước khi đưa ra quyết định hợp nhất.\n",
  "quiz": {
    "id": "quiz-03-10-merge-conflict",
    "title": "Trắc nghiệm: Merge conflict",
    "questions": [
      {
        "id": "q1",
        "question": "Tình huống nào có thể khiến Git dừng vì merge conflict?",
        "type": "single",
        "options": [
          {
            "text": "Hai nhánh thay đổi cùng một vùng theo cách Git không thể kết hợp an toàn",
            "correct": true
          },
          {
            "text": "Repository có hơn một trăm commit",
            "correct": false
          },
          {
            "text": "Hai người dùng cùng hệ điều hành",
            "correct": false
          },
          {
            "text": "Một nhánh có tên chứa dấu gạch nối",
            "correct": false
          }
        ],
        "explanation": "Conflict thường xuất hiện khi những thay đổi chồng lấn và Git không thể suy ra ý định đúng."
      },
      {
        "id": "q2",
        "question": "Trong conflict markers, nội dung giữa `<<<<<<< HEAD` và `=======` thuộc phía nào?",
        "type": "single",
        "options": [
          {
            "text": "Nhánh hiện tại, nơi bạn chạy lệnh merge",
            "correct": true
          },
          {
            "text": "Nhánh nguồn được đưa vào",
            "correct": false
          },
          {
            "text": "Commit đầu tiên của repository",
            "correct": false
          },
          {
            "text": "Một phiên bản do Git tự sinh ngẫu nhiên",
            "correct": false
          }
        ],
        "explanation": "HEAD chỉ phiên bản hiện tại; nội dung phía dưới dấu phân cách là phiên bản từ nhánh nguồn."
      },
      {
        "id": "q3",
        "question": "Dấu `>>>>>>> feature-conflict` thường kết thúc phần nội dung nào?",
        "type": "single",
        "options": [
          {
            "text": "Phần được đưa vào từ nhánh nguồn `feature-conflict`",
            "correct": true
          },
          {
            "text": "Phần của nhánh hiện tại",
            "correct": false
          },
          {
            "text": "Toàn bộ lịch sử commit",
            "correct": false
          },
          {
            "text": "Tệp cấu hình remote",
            "correct": false
          }
        ],
        "explanation": "Dấu cuối cùng kèm tên nhánh cho biết phần nội dung nguồn đang được merge vào."
      },
      {
        "id": "q4",
        "question": "Lệnh nào cho biết những tệp còn unmerged trong lúc xử lý conflict?",
        "type": "single",
        "options": [
          {
            "text": "git status",
            "correct": true
          },
          {
            "text": "git branch",
            "correct": false
          },
          {
            "text": "git init",
            "correct": false
          },
          {
            "text": "git config",
            "correct": false
          }
        ],
        "explanation": "git status trình bày trạng thái repository và liệt kê các đường dẫn chưa được giải quyết."
      },
      {
        "id": "q5",
        "question": "Vì sao phải xóa conflict markers và viết lại nội dung cuối trước khi báo đã giải quyết?",
        "type": "single",
        "options": [
          {
            "text": "Marker chỉ là dấu tạm để so sánh; nội dung cuối phải phản ánh lựa chọn đúng cho chương trình",
            "correct": true
          },
          {
            "text": "Git không cho phép bất kỳ dấu nhỏ hơn nào trong mọi loại tệp",
            "correct": false
          },
          {
            "text": "Marker làm tăng dung lượng repository hàng gigabyte",
            "correct": false
          },
          {
            "text": "Git sẽ xóa tài khoản nếu thấy marker",
            "correct": false
          }
        ],
        "explanation": "Cần thay phần so sánh tạm bằng nội dung có ý nghĩa rồi mới đánh dấu tệp đã giải quyết."
      },
      {
        "id": "q6",
        "question": "Nếu `git status` báo tệp trong `Unmerged paths`, bước phù hợp tiếp theo là gì?",
        "type": "single",
        "options": [
          {
            "text": "Mở tệp, hiểu cả hai phía và quyết định nội dung cần có trong kết quả",
            "correct": true
          },
          {
            "text": "Xóa repository ngay lập tức",
            "correct": false
          },
          {
            "text": "Tạo thêm một commit mà không sửa tệp",
            "correct": false
          },
          {
            "text": "Đổi tên nhánh để bỏ qua conflict",
            "correct": false
          }
        ],
        "explanation": "Người giải quyết cần đọc nội dung và yêu cầu trước khi sửa; bài tiếp theo hướng dẫn các bước Git."
      }
    ]
  }
};
export default lesson;
