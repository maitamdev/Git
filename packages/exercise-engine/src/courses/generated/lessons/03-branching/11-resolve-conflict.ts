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
  "content": "# Kỹ thuật Resolve Conflict từng bước\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững quy trình chuẩn 4 bước để giải quyết xung đột (Resolve Conflict) trong dự án.\n- Phân biệt giữa thay đổi hiện tại (Current) và thay đổi được gộp vào (Incoming).\n- Hiểu được vai trò bắt buộc của lệnh `git add` để đánh dấu tệp đã giải quyết xong.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Resolve Conflict — giải quyết xung đột\n- **Nói dễ hiểu:** Thao tác chỉnh sửa lại đoạn code mâu thuẫn, xóa bỏ các vạch đánh dấu và lưu lại nội dung đúng nhất.\n- **Ví dụ:** Mở tệp `payment.js`, giữ lại cả hàm giảm giá và hàm tính thuế, rồi xóa sạch các dòng `<<<<<<<` và `=======`.\n- **Đừng nhầm:** Git không thể tự suy đoán thay bạn; việc giải quyết xung đột luôn cần sự xem xét và quyết định của con người.\n\n### Current vs Incoming Change — thay đổi hiện tại và gộp vào\n- **Nói dễ hiểu:** Current là code của nhánh bạn đang đứng (HEAD); Incoming là code của nhánh đang được gộp vào.\n- **Ví dụ:** Trên nhánh `main` (Current) dùng cổng 8080, còn nhánh `feature` (Incoming) dùng cổng 9000.\n- **Đừng nhầm:** \"Incoming\" không có nghĩa là code mới hơn hay xịn hơn; đó chỉ là tên gọi quy ước chỉ hướng gộp nhánh.\n\n### Mark as Resolved — đánh dấu đã xử lý xong\n- **Nói dễ hiểu:** Dùng lệnh `git add <tên-tệp>` để thông báo cho Git biết tệp đó đã được gỡ xung đột hoàn toàn.\n- **Ví dụ:** Sau khi sửa xong tệp `app.js`, chạy `git add app.js` để đưa tệp từ trạng thái Unmerged vào Staging Area.\n- **Đừng nhầm:** Chỉ bấm lưu tệp trong trình soạn thảo là chưa đủ; bạn bắt buộc phải chạy `git add` thì Git mới ghi nhận.\n\n---\n\n## 📖 Định nghĩa\nResolve Conflict (giải quyết xung đột) là quá trình bạn mở tệp tin bị mâu thuẫn, lựa chọn giữ lại đoạn code đúng, xóa sạch các vạch đánh dấu xung đột (`<<<<<<<`, `=======`, `>>>>>>>`), lưu tệp lại, chạy lệnh `git add` để đánh dấu đã xử lý xong, và cuối cùng chạy `git commit` để hoàn tất việc gộp nhánh.\n\n---\n\n## 🤔 Tại sao cần?\nXung đột xảy ra thường xuyên khi nhiều người cùng làm chung một tệp. Nắm vững kỹ thuật 4 bước giúp bạn không bị bối rối, tránh việc xóa nhầm công sức của đồng đội và đảm bảo chương trình không bị lỗi cú pháp do để sót vạch đánh dấu.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung việc gỡ xung đột giống như hai luật sư cùng đàm phán một điều khoản hợp đồng. Bên A đề xuất thanh toán trong 30 ngày (Current), bên B đề xuất thanh toán trong 7 ngày (Incoming). Hai bên ngồi lại thống nhất trả 50% trong 7 ngày và 50% trong 30 ngày. Sau khi gạch bỏ các ghi chú tranh luận trên giấy nháp, hai người cùng ký tên đóng dấu (`git add` và `git commit`).\n\n---\n\n## 🖼 Sơ đồ\n```text\nQuy trình 4 bước chuẩn giải quyết xung đột:\n[1. Chẩn đoán]     ───> git status (Xem tệp nào đang bị Unmerged)\n                             │\n                             ▼\n[2. Sửa thủ công]  ───> Mở tệp, chọn code cần giữ, xóa sạch <<<< ==== >>>>\n                             │\n                             ▼\n[3. Đánh dấu xong] ───> git add <tên-tệp> (Đưa tệp vào Staging Area)\n                             │\n                             ▼\n[4. Hoàn tất]      ───> git commit (Đóng gói tạo Merge Commit hoàn chỉnh)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrong tệp `payment.js`, nhánh `main` có hàm tính thuế 8%, còn nhánh `feature-sale` có hàm giảm giá 20%. Khi merge, Git báo xung đột tại hàm tính tiền. Bạn mở tệp, thấy cả hai tính năng đều cần thiết: khách vừa được giảm giá vừa phải chịu thuế. Bạn viết lại hàm kết hợp cả hai logic, xóa các vạch đánh dấu, lưu tệp, rồi chạy `git add payment.js` và `git commit`. Hệ thống hoạt động chính xác cho cả hai trường hợp.\n\n---\n\n## 💻 Command\n```bash\ngit status\ngit add <tên-tệp-đã-sửa>\ngit commit\n```\n\n---\n\n## 🔍 Giải thích command\n- `git status`: Kiểm tra danh sách tệp xung đột; sau khi `git add`, tệp sẽ chuyển sang màu xanh lá báo hiệu đã xử lý xong.\n- `git add <tên-tệp>`: Bắt buộc phải chạy lệnh này để xác nhận với Git rằng tệp đã được gỡ xung đột thành công.\n- `git commit`: Hoàn tất tạo Merge Commit sau khi tất cả các tệp xung đột đã được đánh dấu bằng `git add`.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Quên chạy `git add` sau khi sửa tệp:** Git vẫn coi tệp đó đang bị xung đột và lệnh `git commit` sẽ từ chối thực thi.\n2. **Tự ý xóa code của bạn cùng nhóm mà không hỏi:** Dễ làm mất logic quan trọng mà bạn mình đã dày công xây dựng.\n3. **Để sót lại các ký tự `=======` trong code:** Làm chương trình bị lỗi cú pháp nghiêm trọng ngay khi chạy.\n\n---\n\n## 🧪 Lab\nBài tập này được thực hành trên môi trường Git mô phỏng của hệ thống:\n1. Mở tệp `app.js` đang có vạch xung đột từ bài học trước.\n2. Chọn đoạn code phù hợp, xóa sạch các dòng `<<<<<<< HEAD`, `=======`, `>>>>>>>`.\n3. Lưu tệp và chạy lệnh `git add app.js` để đánh dấu đã xử lý xong.\n4. Chạy lệnh `git commit` để đóng gói và hoàn tất quá trình hợp nhất nhánh.\n\n---\n\n## 💡 Hint\nNhớ khẩu quyết 4 bước: Mở tệp ──> Sửa code & Xóa vạch đánh dấu ──> `git add` ──> `git commit`.\n\n---\n\n## ✅ Validation\n- Lệnh `git status` báo `nothing to commit, working tree clean`.\n- Tệp `app.js` không còn chứa bất kỳ ký tự `<<<<<<<` hoặc `>>>>>>>` nào.\n\n---\n\n## ❓ Quiz\nTrả lời các câu hỏi sau để kiểm tra mức độ nắm vững quy trình giải quyết xung đột trong Git.\n\n---\n\n## 🔥 Challenge\nHãy thử dùng tính năng Merge Editor của VS Code hoặc các trình soạn thảo hiện đại để trải nghiệm giao diện trực quan 3 khung khi giải quyết xung đột.\n\n---\n\n## 📚 Tổng kết\n- Quy trình 4 bước: Chẩn đoán bằng `git status` ──> Sửa tệp ──> `git add` ──> `git commit`.\n- Lệnh `git add <tên-tệp>` là bước bắt buộc để báo cho Git biết bạn đã xử lý xong xung đột.\n- Luôn trao đổi với đồng đội nếu bạn không chắc chắn nên giữ hay bỏ đoạn code nào.\n",
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
