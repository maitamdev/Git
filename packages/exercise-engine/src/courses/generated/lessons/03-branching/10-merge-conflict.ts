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
  "content": "# Merge conflict là gì?\n\n---\n\n## 🎯 Mục tiêu\n- Giải thích vì sao Git dừng khi không thể kết hợp hai thay đổi an toàn.\n- Đọc các dấu mốc trong tệp conflict và xác định nội dung của mỗi nhánh.\n- Dùng `git status` để tìm tệp cần xử lý.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Merge conflict — xung đột khi hợp nhất\n- **Nói dễ hiểu:** Hai nhánh thay đổi cùng một vùng theo cách Git không thể tự kết hợp.\n- **Ví dụ:** Một nhánh đổi dòng `màu = xanh`, nhánh kia đổi chính dòng đó thành `màu = đỏ`.\n- **Đừng nhầm:** Cùng sửa một tệp chưa chắc gây conflict; thay đổi ở các phần độc lập thường được Git kết hợp tự động.\n\n### Conflict markers — dấu đánh dấu vùng xung đột\n- **Nói dễ hiểu:** Các dòng Git chèn vào để đặt hai phiên bản cạnh nhau cho người dùng xem.\n- **Ví dụ:** `<<<<<<< HEAD` bắt đầu phần hiện tại; `=======` ngăn hai phần; `>>>>>>> feature-conflict` kết thúc phần nhánh nguồn.\n- **Đừng nhầm:** Dấu này không phải cú pháp của chương trình. Cần sửa nội dung và xóa dấu trước khi đánh dấu conflict đã giải quyết.\n\n### Unmerged path — tệp chưa giải quyết\n- **Nói dễ hiểu:** Tệp mà hai phiên bản chưa được kết hợp xong.\n- **Ví dụ:** `git status` báo `both modified: conflict.txt`.\n- **Đừng nhầm:** Chỉ lưu tệp trong editor chưa báo cho Git biết conflict đã được giải quyết.\n\n---\n\n## 📖 Định nghĩa\nMerge conflict xảy ra khi Git không thể tự ghép một hay nhiều thay đổi từ hai nhánh. Một trường hợp phổ biến là cả hai nhánh cùng sửa một vùng của cùng tệp. Git tạm dừng merge, cho biết tệp cần xem xét và thường đặt hai phiên bản vào tệp với conflict markers.\n\n---\n\n## 🤔 Tại sao cần?\nGit không thể biết ý định của người viết. Khi nội dung mâu thuẫn, nó dừng để bạn chọn hoặc kết hợp đúng theo yêu cầu của chương trình, thay vì âm thầm bỏ một thay đổi.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHai người sửa cùng một câu trong tài liệu theo hai cách khác nhau. Git đặt cả hai phiên bản cạnh nhau và hỏi bạn nên viết câu nào trong bản cuối.\n\n---\n\n## 🖼 Sơ đồ\n```text\n|<<<<<<< HEAD\nPhiên bản của nhánh hiện tại\n=======\nPhiên bản của nhánh được merge vào\n|>>>>>>> feature-conflict\n```\n\nHai dấu `|` ở đầu chỉ là vạch phân cách trong sơ đồ; nội dung marker thật bắt đầu từ `<<<<<<<` và `>>>>>>>`.\n\n---\n\n## 🌎 Ví dụ thực tế\nMột nhánh cập nhật địa chỉ API, nhánh khác cũng đổi địa chỉ đó. Khi hợp nhất, nhóm cần xác nhận địa chỉ nào đúng hoặc kết hợp thay đổi theo cấu hình thực tế; không nên chọn một bên chỉ vì tên nhánh nghe mới hơn.\n\n---\n\n## 💻 Command\n```bash\ngit status\ngit merge feature-conflict\n```\n\n---\n\n## 🔍 Giải thích command\n- `git status`: Báo tên tệp chưa giải quyết dưới mục `Unmerged paths`.\n- `git merge feature-conflict`: Thử đưa nhánh `feature-conflict` vào nhánh hiện tại. Bài lab bên dưới cố ý tạo thay đổi mâu thuẫn để lệnh này dừng ở conflict.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Cho rằng mọi conflict là lỗi Git:** Git đang bảo vệ nội dung vì chưa biết lựa chọn nào đúng.\n2. **Chọn “Current” hoặc “Incoming” mà không đọc code:** Cả hai lựa chọn đều có thể bỏ nghiệp vụ cần thiết.\n3. **Commit khi chưa gỡ dấu conflict:** Marker còn lại có thể làm hỏng cú pháp hoặc lộ văn bản conflict vào sản phẩm.\n\n---\n\n## 🧪 Lab\nYêu cầu: repository đã có ít nhất một commit, nhánh `main` tồn tại và working tree sạch. Dùng editor của lab để sửa đúng một dòng trong `conflict.txt`:\n1. Đứng trên `main`. Tạo `conflict.txt` với nội dung `Màu nền: trắng`, rồi chạy `git add conflict.txt` và `git commit -m \"docs: add conflict example\"`.\n2. Chạy `git switch -c feature-conflict`. Đổi dòng trong tệp thành `Màu nền: xanh`, rồi add và commit với thông điệp `feat: use blue background`.\n3. Chạy `git switch main`. Đổi cùng dòng thành `Màu nền: đỏ`, rồi add và commit với thông điệp `feat: use red background`.\n4. Chạy `git merge feature-conflict`. Merge sẽ dừng vì hai nhánh đổi cùng một dòng.\n5. Chạy `git status`, mở `conflict.txt` và chỉ ra phần hiện tại, dấu phân cách và phần từ nhánh nguồn. Bài sau sẽ hướng dẫn giải quyết.\n\n---\n\n## 💡 Hint\nPhần sau `<<<<<<< HEAD` thuộc nhánh đang đứng; phần sau `=======` thuộc nhánh nguồn được merge vào.\n\n---\n\n## ✅ Validation\n- `git status` nêu `conflict.txt` trong `Unmerged paths`.\n- Tệp có đủ ba dấu `<<<<<<<`, `=======`, `>>>>>>>` và có nội dung từ cả hai nhánh.\n- Chưa chạy `git add` hay `git commit`; giữ nguyên conflict để làm bài tiếp theo.\n\n---\n\n## ❓ Quiz\nTrả lời câu hỏi để kiểm tra cách nhận biết một conflict và đọc nội dung hai phía.\n\n---\n\n## 🔥 Challenge\nGiải thích vì sao sửa hai tệp khác nhau thường không conflict, còn hai thay đổi cùng vùng có thể khiến Git phải dừng.\n\n---\n\n## 📚 Tổng kết\n- Conflict có nghĩa Git cần bạn quyết định cách kết hợp; không phải repository bị hỏng.\n- Đọc cả hai phía và hiểu logic trước khi chọn hoặc viết nội dung kết quả.\n- Dùng `git status` tìm tệp chưa giải quyết; chưa vội add hoặc commit.\n",
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
