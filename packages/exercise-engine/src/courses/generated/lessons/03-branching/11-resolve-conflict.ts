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
  "content": "# Kỹ thuật Resolve Conflict từng bước\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững quy trình chuẩn 4 bước giải quyết xung đột Merge Conflict trong môi trường chuyên nghiệp.\n- Sử dụng thành thạo các tùy chọn giải quyết: Accept Current Change, Accept Incoming Change, hoặc Accept Both.\n- Hiểu rõ tầm quan trọng sống còn của thao tác `git add <file>` sau khi sửa xong conflict.\n- Biết cách trao đổi với đồng nghiệp trước khi đưa ra quyết định giữ lại dòng code nào.\n\n---\n\n## 📖 Định nghĩa\n> Resolve Conflict (Giải quyết xung đột) là quy trình thủ công mang tính quyết định của con người nhằm loại bỏ các điểm mâu thuẫn trong mã nguồn khi merge. Quy trình này bao gồm: mở tệp tin bị xung đột, đọc hiểu cả hai khối thay đổi, lựa chọn giữ lại code của nhánh hiện tại (Current / Ours), giữ lại code của nhánh được gộp (Incoming / Theirs), hoặc kết hợp cả hai, xóa sạch các vạch đánh dấu `<<<<<<<`, `=======`, `>>>>>>>`, lưu tệp lại, chạy lệnh `git add` để thông báo cho Git biết tệp đã được giải quyết, và cuối cùng hoàn tất bằng `git commit`.\n\n---\n\n## 🤔 Tại sao cần?\nKỹ năng giải quyết xung đột một cách chuẩn mực và tự tin là ranh giới phân biệt giữa một lập trình viên nghiệp dư và một kỹ sư phần mềm thực thụ. Giải quyết conflict ẩu tả hoặc xóa nhầm code của đồng nghiệp là nguyên nhân hàng đầu làm phát sinh các lỗi ngầm nghiêm trọng trên môi trường production. Làm chủ kỹ thuật 4 bước này giúp bạn biến một tình huống căng thẳng thành một cơ hội phối hợp nhóm ăn ý và nâng cao chất lượng mã nguồn.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung việc giải quyết conflict giống như việc hai luật sư cùng ngồi lại để thống nhất một điều khoản hợp đồng kinh tế bị mâu thuẫn. Luật sư bên mua đưa ra đề xuất thanh toán trong 30 ngày (Current), luật sư bên bán đề xuất thanh toán ngay trong 7 ngày (Incoming). Hai người ngồi lại đàm phán và thống nhất phương án hòa giải: thanh toán 50% trong 7 ngày và 50% còn lại trong 30 ngày (Accept Both & Edit). Sau khi xóa bỏ các ghi chú tranh cãi trên bản thảo, cả hai bên cùng ký tên đóng dấu (git add và git commit).\n\n---\n\n## 🖼 Sơ đồ\n```text\nQuy trình 4 bước chuẩn Resolve Conflict:\n[Bước 1: Chẩn đoán]  ──► git status (Xác định danh sách tệp Unmerged)\n                               │\n                               ▼\n[Bước 2: Sửa thủ công] ──► Mở file, chọn code giữ lại, xóa sạch <<<< ==== >>>>\n                               │\n                               ▼\n[Bước 3: Đánh dấu xong] ──► git add <file> (Báo cho Git tệp đã Resolved)\n                               │\n                               ▼\n[Bước 4: Hoàn tất]    ──► git commit (Đóng gói tạo Merge Commit hoàn chỉnh)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrong tệp thanh toán payment.js của sàn thương mại điện tử, nhánh main có hàm tính thuế VAT 8% cho đơn hàng, trong khi nhánh feature-discount lại có hàm áp dụng mã giảm giá 20% cho thành viên mới. Khi lập trình viên thực hiện merge hai nhánh, Git báo conflict tại khối hàm tính tiền thanh toán. Lập trình viên mở trình soạn thảo, xem xét cả hai đoạn mã và nhận thấy cả hai logic đều vô cùng cần thiết: khách hàng vừa được hưởng giảm giá 20% vừa phải nộp thuế VAT 8% theo luật định. Lập trình viên kết hợp cả hai khối logic vào một hàm tính toán hoàn chỉnh, xóa sạch các dòng đánh dấu xung đột, lưu tệp lại rồi chạy: `git add payment.js` và `git commit -m \"merge: integrate discount and tax calculation\"`. Toàn bộ hệ thống thanh toán sau đó vượt qua các bài kiểm thử tự động một cách hoàn hảo.\n\n---\n\n## 💻 Command\n```bash\ngit status\ngit add <tên-tệp-đã-sửa>\ngit commit\ngit commit -m \"merge: resolved conflict in <tên-tệp>\"\n```\n\n---\n\n## 🔍 Giải thích command\n- `git status`: Kiểm tra tình trạng giải quyết; các tệp đã sửa và `git add` sẽ chuyển sang màu xanh lá trong Staging Area.\n- `git add <file>`: Cực kỳ quan trọng! Lệnh này đánh dấu cho Git biết tệp tin đã được giải quyết xung đột thành công (Mark as resolved).\n- `git commit`: Hoàn tất quá trình tạo Merge Commit sau khi tất cả các tệp unmerged đã được git add.\n- `git commit -m \"<thông-điệp>\"`: Tạo merge commit với thông điệp tùy chỉnh mô tả rõ cách thức bạn đã giải quyết mâu thuẫn.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Quên chạy git add sau khi đã sửa xong tệp**:  Git sẽ không biết bạn đã sửa xong và lệnh git commit sẽ báo lỗi từ chối.\n2. **Tự ý giải quyết code logic của người khác mà không hỏi**:  Dẫn đến việc xóa nhầm các đoạn xử lý ngoại lệ quan trọng của đồng nghiệp.\n3. **Sử dụng git add . mù quáng**:  Có thể stage nhầm các tệp nháp sinh ra trong quá trình gỡ lỗi xung đột.\n\n---\n\n## 🧪 Lab\n1. Mở tệp `app.js` đang bị xung đột từ bài học trước trong trình soạn thảo.\n2. Xóa các vạch `<<<<<<< HEAD`, `=======`, `>>>>>>> feature` và giữ lại dòng code chuẩn xác nhất.\n3. Lưu tệp tin và chạy lệnh `git add app.js` để đánh dấu đã giải quyết.\n4. Chạy lệnh `git commit` để hoàn tất việc tạo Merge Commit.\n\n---\n\n## 💡 Hint\n> Nhớ quy tắc vàng: Sửa file -> Xóa vạch markers -> Lưu -> `git add` -> `git commit`.\n\n---\n\n## ✅ Validation\n- Kiểm tra `git status` báo `working tree clean` và đồ thị commit đã được hợp nhất.\n\n---\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm dưới đây về các bước giải quyết xung đột chuyên nghiệp.\n\n---\n\n## 🔥 Challenge\nMô tả vai trò của công cụ đồ họa 3-way merge tool như VS Code Merge Editor trong việc trực quan hóa conflict.\n\n---\n\n## 📚 Tổng kết\n- Quy trình chuẩn: Mở file -> Chọn code đúng -> Xóa markers -> Lưu file -> git add -> git commit.\n- `git add <file>` là bước bắt buộc để báo cho Git biết xung đột đã được giải quyết xong.\n- Luôn trao đổi với đồng nghiệp nếu không chắc chắn về logic nghiệp vụ của đoạn code bị mâu thuẫn.\n",
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
