import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "11-resolve-conflict",
  "moduleId": "03-branching",
  "metadata": {
    "id": "11-resolve-conflict",
    "title": "Kỹ thuật Resolve Conflict từng bước",
    "level": "intermediate",
    "duration": 35,
    "xp": 120,
    "prerequisites": [
      "10-merge-conflict"
    ],
    "objectives": [
      "Nắm vững quy trình chuẩn 4 bước giải quyết xung đột Merge Conflict trong môi trường chuyên nghiệp.",
      "Sử dụng thành thạo các tùy chọn giải quyết: Accept Current Change, Accept Incoming Change, hoặc Accept Both.",
      "Hiểu rõ tầm quan trọng sống còn của thao tác `git add <file>` sau khi sửa xong conflict.",
      "Biết cách trao đổi với đồng nghiệp trước khi đưa ra quyết định giữ lại dòng code nào."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "resolve-conflict"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "resolve conflict",
      "giai quyet xung dot",
      "accept current",
      "accept incoming",
      "git add resolve"
    ],
    "commands": [
      "git status",
      "git add <tên-tệp-đã-sửa>",
      "git commit",
      "git commit -m \"merge: resolved conflict in <tên-tệp>\""
    ]
  },
  "content": "# Kỹ thuật Resolve Conflict từng bước\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững quy trình chuẩn 4 bước để giải quyết xung đột (Resolve Conflict) chuyên nghiệp.\n- Phân biệt bản chất giữa thay đổi hiện tại (Current Change) và thay đổi được gộp vào (Incoming Change).\n- Hiểu rõ vai trò bắt buộc của lệnh `git add` trong việc đánh dấu tệp đã được xử lý xung đột thành công.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Resolve Conflict — giải quyết xung đột\n- **Nói dễ hiểu:** Hành động can thiệp thủ công để chọn lọc đoạn code chuẩn xác nhất, tẩy sạch các vạch đánh dấu và đưa tệp về trạng thái sạch sẽ.\n- **Ví dụ:** Mở tệp `auth.js`, giữ lại cả logic đăng nhập Google lẫn logic đăng nhập Facebook rồi xóa các dòng `<<<<<<<` và `=======`.\n- **Đừng nhầm:** Git không thể tự đoán thay bạn; việc gỡ xung đột luôn đòi hỏi tư duy logic và sự thấu hiểu nghiệp vụ của lập trình viên.\n\n### Current vs Incoming Change — thay đổi hiện tại và gộp vào\n- **Nói dễ hiểu:** Current là đoạn code thuộc nhánh bạn đang đứng (HEAD); Incoming là đoạn code đến từ nhánh đang được merge vào.\n- **Ví dụ:** Khi đang đứng ở `main` để merge `feature`, code trên `main` là Current còn code trên `feature` là Incoming.\n- **Đừng nhầm:** \"Incoming\" không mặc định là code mới hơn hay xịn hơn; đó chỉ là thuật ngữ quy ước kỹ thuật chỉ hướng di chuyển của dữ liệu.\n\n### Mark as Resolved — đánh dấu đã xử lý xong\n- **Nói dễ hiểu:** Thao tác chạy lệnh `git add <tên-tệp>` để báo cho Git biết tệp tin này đã được giải quyết xung đột hoàn toàn êm đẹp.\n- **Ví dụ:** Sau khi sửa xong tệp `app.js`, bạn gõ `git add app.js` để chuyển tệp từ danh sách Unmerged paths sang Staging Area.\n- **Đừng nhầm:** Chỉ bấm lưu file bằng tổ hợp phím lưu trong trình soạn thảo là chưa đủ; Git chỉ công nhận tệp đã hết conflict khi bạn chạy lệnh `git add`.\n\n---\n\n## 📖 Định nghĩa\nResolve Conflict (giải quyết xung đột) là quy trình kỹ thuật 4 bước chuẩn chỉ: Chẩn đoán vị trí mâu thuẫn qua `git status`, mở file chọn lọc đoạn code đúng và xóa sạch toàn bộ các vạch đánh dấu (`<<<<<<<`, `=======`, `>>>>>>>`), chạy `git add` để đánh dấu tệp đã xử lý xong và cuối cùng niêm phong `git commit` để hoàn tất việc gộp nhánh.\n\n---\n\n## 🤔 Tại sao cần?\nBiết cách gỡ xung đột bình tĩnh và chuẩn xác là dấu hiệu trưởng thành rõ ràng nhất của một kỹ sư phần mềm. Khi làm việc nhóm, xung đột xảy ra hàng ngày ở mọi dự án. Nắm vững kỹ thuật này giúp bạn bảo vệ toàn vẹn logic nghiệp vụ của cả hai bên, không vô tình xóa mất code của đồng đội và đảm bảo ứng dụng không bao giờ bị sập do để sót các ký tự lạ trong mã nguồn.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung bạn là một vị quan tòa phân xử tranh chấp quyền tác giả. Hai tác giả cùng nộp hai đoạn văn khác nhau cho phần kết truyện. Bạn đọc cả hai bản thảo, thảo luận với tác giả để chắt lọc những ý tứ tinh hoa nhất ghép thành một cái kết trọn vẹn. Sau khi tẩy sạch các vết gạch xóa tranh luận trên bản thảo, bạn đóng dấu phê duyệt cho in sách (`git add` và `git commit`).\n\n---\n\n## 🖼 Sơ đồ\n```text\nQUY TRÌNH 4 BƯỚC CHUẨN XỬ LÝ XUNG ĐỘT (RESOLVE CONFLICT):\n\n[Bước 1: Chẩn đoán]     ──► git status (Nhận diện tệp trong mục Unmerged paths)\n                                 │\n                                 ▼\n[Bước 2: Sửa thủ công]  ──► Mở tệp, dung hòa logic code, XÓA HẾT vạch <<<< ==== >>>>\n                                 │\n                                 ▼\n[Bước 3: Đánh dấu xong] ──► git add <tệp> (Thông báo cho Git: Tệp này đã xử lý xong!)\n                                 │\n                                 ▼\n[Bước 4: Hoàn tất mốc]  ──► git commit (Tạo Merge Commit chính thức kết thúc xung đột)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrong tệp `payment.js`, nhánh `main` (Current) áp dụng thuế VAT 8%, còn nhánh `feature-discount` (Incoming) áp dụng mã giảm giá 10%. Bạn không chọn riêng bên nào, mà kết hợp cả hai: tính giảm giá trước rồi mới tính thuế sau. Sau đó bạn xóa sạch các vạch `<<<<<<<` và `>>>>>>>`, lưu file, gõ `git add payment.js` và commit thành công.\n\n---\n\n## 💻 Command\n```bash\ngit status\ngit add <tên-tệp-đã-sửa>\ngit commit -m \"merge: resolve payment conflict\"\n```\n\n---\n\n## 🔍 Giải thích command\n- `git status`: Kiểm tra tiến độ gỡ conflict; tệp nào đã `git add` sẽ chuyển sang màu xanh lá cây sẵn sàng commit.\n- `git add <tên-tệp>`: Lệnh cốt tử để báo cáo với Git rằng bạn đã xử lý xong xung đột ở tệp này.\n- `git commit`: Không cần truyền cờ `-m` nếu muốn Git tự động sử dụng thông điệp merge mặc định, hoặc thêm `-m` để ghi chú rõ ràng cách xử lý.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Sửa code xong nhưng quên gõ `git add`**: Git vẫn xem tệp đó là đang xung đột dở và lệnh `git commit` sẽ từ chối thực thi.\n2. **Xóa thẳng tay code của đồng đội mà không trao đổi**: Gây mất mát tính năng và sứt mẻ tình cảm đồng nghiệp trong nhóm.\n3. **Để sót vạch ngăn cách `=======`**: Khiến code bị lỗi cú pháp không thể biên dịch hay chạy được.\n\n---\n\n## 🧪 Lab\n1. Mở tệp `conflict.txt` đang có dấu mốc xung đột từ bài học trước.\n2. Sửa nội dung tệp thành một câu thống nhất hoàn chỉnh: `Màu nền: xanh pha đỏ`, đồng thời xóa sạch toàn bộ các dòng `<<<<<<< HEAD`, `=======`, `>>>>>>>`.\n3. Lưu tệp lại và chạy `git status` để thấy tệp vẫn ở mục modified.\n4. Chạy lệnh: `git add conflict.txt` để đánh dấu đã giải quyết xong.\n5. Chạy `git commit -m \"merge: resolve background color conflict\"` để hoàn tất việc hợp nhất.\n\n---\n\n## 💡 Hint\n> Ghi nhớ 4 bước thần chú: Mở file ──> Sửa code & Xóa vạch ──> `git add` ──> `git commit`!\n\n---\n\n## ✅ Validation\n- Tệp `conflict.txt` không còn chứa bất kỳ ký tự nào của marker xung đột.\n- Lệnh `git status` báo `nothing to commit, working tree clean`.\n- Merge commit xuất hiện đàng hoàng trong lịch sử `git log --oneline`.\n\n---\n\n## ❓ Quiz\nTrả lời bài trắc nghiệm dưới đây để kiểm tra mức độ thuần thục 4 bước quy trình giải quyết xung đột trong Git.\n\n---\n\n## 🔥 Challenge\nHãy tìm hiểu và sử dụng công cụ Merge Editor trực quan tích hợp sẵn trong VS Code (hoặc IDE yêu thích của bạn). So sánh trải nghiệm giữa việc sửa marker bằng tay với việc bấm nút giải quyết trực quan trên giao diện 3 khung!\n\n---\n\n## 📚 Tổng kết\n- Quy trình 4 bước chuẩn mực: `git status` ──> Sửa code & Xóa marker ──> `git add` ──> `git commit`.\n- Lệnh `git add` là lời khẳng định chính thức với Git rằng xung đột đã được hóa giải.\n- Luôn giữ thái độ cẩn trọng, tôn trọng mã nguồn của đồng đội và kiểm tra kỹ trước khi tạo commit.\n",
  "quiz": {
    "id": "quiz-03-11-resolve-conflict",
    "title": "Trắc nghiệm: Kỹ thuật Resolve Conflict từng bước",
    "questions": [
      {
        "id": "q1",
        "question": "Sau khi bạn đã mở tệp bị xung đột, chỉnh sửa xong nội dung và xóa sạch các vạch conflict markers, bước tiếp theo BẮT BUỘC phải làm là gì?",
        "type": "single",
        "options": [
          {
            "text": "Chạy lệnh `git add <tên-tệp>` để đánh dấu cho Git biết tệp đó đã được giải quyết xong (Resolved)",
            "correct": true
          },
          {
            "text": "Chạy lệnh `git push` ngay lập tức lên GitHub",
            "correct": false
          },
          {
            "text": "Xóa tệp tin đó khỏi ổ cứng máy tính",
            "correct": false
          },
          {
            "text": "Khởi động lại máy tính cá nhân",
            "correct": false
          }
        ],
        "explanation": "`git add <file>` là thao tác kỹ thuật bắt buộc để đưa tệp từ trạng thái Unmerged sang Staged (Resolved)."
      },
      {
        "id": "q2",
        "question": "Trong trình soạn thảo VS Code, nút tùy chọn \"Accept Current Change\" có tác dụng gì?",
        "type": "single",
        "options": [
          {
            "text": "Chỉ giữ lại đoạn code của nhánh hiện tại bạn đang đứng (HEAD) và xóa bỏ đoạn code của nhánh kia",
            "correct": true
          },
          {
            "text": "Chỉ giữ lại đoạn code của nhánh đang được gộp vào",
            "correct": false
          },
          {
            "text": "Giữ lại cả hai đoạn code của cả hai nhánh",
            "correct": false
          },
          {
            "text": "Xóa sạch toàn bộ tệp tin khỏi dự án",
            "correct": false
          }
        ],
        "explanation": "Current Change là code của nhánh hiện tại (HEAD/Ours); chọn nút này sẽ giữ code hiện tại và bỏ code incoming."
      },
      {
        "id": "q3",
        "question": "Điều gì sẽ xảy ra nếu bạn cố gắng chạy lệnh `git commit` khi vẫn còn tệp tin nằm trong mục \"Unmerged paths\"?",
        "type": "single",
        "options": [
          {
            "text": "Git sẽ từ chối commit và thông báo bạn cần giải quyết xung đột và git add trước",
            "correct": true
          },
          {
            "text": "Git sẽ tự động xóa tất cả các tệp bị xung đột",
            "correct": false
          },
          {
            "text": "Git sẽ tự động chọn ngẫu nhiên một nhánh để giữ lại",
            "correct": false
          },
          {
            "text": "Git sẽ khóa vĩnh viễn kho lưu trữ của bạn",
            "correct": false
          }
        ],
        "explanation": "Git bảo vệ an toàn dữ liệu tuyệt đối: chừng nào còn tệp unmerged, Git kiên quyết từ chối cho phép commit."
      },
      {
        "id": "q4",
        "question": "Nếu logic của cả hai nhánh đều đúng và cần thiết cho hệ thống, giải pháp xử lý conflict chuẩn xác nhất là gì?",
        "type": "single",
        "options": [
          {
            "text": "Chọn \"Accept Both\" hoặc tự tay kết hợp cả hai logic vào cùng một khối code hoàn chỉnh",
            "correct": true
          },
          {
            "text": "Xóa bỏ cả hai đoạn code để không ai được dùng",
            "correct": false
          },
          {
            "text": "Tạo hai tệp tin mới với hai tên khác nhau",
            "correct": false
          },
          {
            "text": "Bỏ qua không thèm sửa và đẩy lỗi lên cho khách hàng",
            "correct": false
          }
        ],
        "explanation": "Nhiều tình huống đòi hỏi kết hợp cả hai chức năng (Accept Both) và chỉnh sửa lại để logic ăn khớp."
      },
      {
        "id": "q5",
        "question": "Thói quen xấu nào nguy hiểm nhất khi giải quyết conflict trong một đội ngũ đông người?",
        "type": "single",
        "options": [
          {
            "text": "Tự ý xóa sạch code của đồng nghiệp mà không hề trao đổi hay hiểu rõ mục đích của đoạn code đó",
            "correct": true
          },
          {
            "text": "Hỏi ý kiến đồng nghiệp trước khi đưa ra quyết định",
            "correct": false
          },
          {
            "text": "Chạy kiểm thử tự động sau khi giải quyết xong xung đột",
            "correct": false
          },
          {
            "text": "Đọc kỹ thông báo git status trước khi gõ lệnh",
            "correct": false
          }
        ],
        "explanation": "Giao tiếp là chìa khóa: không bao giờ tự ý xóa code của người khác nếu chưa hiểu rõ chức năng."
      },
      {
        "id": "q6",
        "question": "Sau khi hoàn tất lệnh `git commit` kết thúc quá trình merge conflict, trạng thái của kho lưu trữ sẽ như thế nào?",
        "type": "single",
        "options": [
          {
            "text": "Trở về trạng thái sạch sẽ `nothing to commit, working tree clean` và đồ thị xuất hiện Merge Commit mới",
            "correct": true
          },
          {
            "text": "Vẫn bị kẹt trong trạng thái conflict mãi mãi",
            "correct": false
          },
          {
            "text": "Tất cả các nhánh cũ bị xóa sạch",
            "correct": false
          },
          {
            "text": "Mã nguồn bị chuyển sang chế độ chỉ đọc",
            "correct": false
          }
        ],
        "explanation": "Commit thành công sẽ đóng tiến trình merge, đưa Working Tree về trạng thái clean và hoàn tất đồ thị DAG."
      }
    ]
  }
};
export default lesson;
