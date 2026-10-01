import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "14-team-conflict-scenario",
  "moduleId": "06-team-workflows",
  "metadata": {
    "id": "14-team-conflict-scenario",
    "title": "Team Conflict Scenario",
    "level": "advanced",
    "duration": 35,
    "xp": 110,
    "prerequisites": [
      "08-branch-protection-rules"
    ],
    "objectives": [
      "Phân tích nguyên nhân gốc rễ gây ra xung đột hợp nhất (Merge Conflict) trong môi trường làm việc nhóm thực tế.",
      "Làm chủ quy trình xử lý xung đột an toàn tại máy cục bộ (Local Resolution) trước khi cập nhật lại Pull Request.",
      "Sử dụng kỹ thuật `git fetch` và `git rebase origin/main` để đưa nhánh tính năng lên đầu lịch sử mới nhất.",
      "Giao tiếp hiệu quả và phối hợp nhịp nhàng với đồng nghiệp khi gặp xung đột logic kinh doanh phức tạp."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "team conflict scenario",
      "kich ban xung dot nhom",
      "giai quyet xung dot pull request",
      "rebase onto main",
      "conflict resolution strategy",
      "team collaboration"
    ],
    "commands": [
      "git fetch origin",
      "git rebase origin/main",
      "git status",
      "git add <tệp-đã-sửa>",
      "git rebase --continue",
      "git push --force-with-lease origin <tên-nhánh>"
    ]
  },
  "content": "# Team Conflict Scenario\n\n## 🎯 Mục tiêu\n- Phân tích nguyên nhân gốc rễ gây ra xung đột hợp nhất (Merge Conflict) trong môi trường làm việc nhóm thực tế.\n- Làm chủ quy trình xử lý xung đột an toàn tại máy cục bộ (Local Resolution) trước khi cập nhật lại Pull Request.\n- Sử dụng kỹ thuật `git fetch` và `git rebase origin/main` để đưa nhánh tính năng lên đầu lịch sử mới nhất.\n- Giao tiếp hiệu quả và phối hợp nhịp nhàng với đồng nghiệp khi gặp xung đột logic kinh doanh phức tạp.\n\n## 🧩 Từ khóa hôm nay\n### Merge Conflict\n- **Nói dễ hiểu**: Tình huống Git không thể tự kết hợp hai thay đổi; thường do cùng sửa một vùng, nhưng còn có dạng xung đột khác.\n- **Ví dụ**: Đồng nghiệp vừa merge nhánh đổi màu nút sang xanh, còn bạn gửi PR đổi màu nút sang đỏ trên cùng một dòng CSS.\n- **Đừng nhầm**: Git chỉ báo xung đột văn bản/cấu trúc mà nó phát hiện được; hai thay đổi có thể ghép sạch nhưng vẫn sai logic nghiệp vụ.\n\n### Local Resolution\n- **Nói dễ hiểu**: Quy trình đưa thay đổi của nhánh đích vào môi trường làm việc, xử lý conflict rồi kiểm tra kết quả trước khi cập nhật PR.\n- **Ví dụ**: Dùng VS Code trên máy để chọn Accept Incoming Change, chạy test xong mới push lên GitHub.\n- **Đừng nhầm**: GitHub có thể giải quyết một số conflict đơn giản trên web; xử lý local hữu ích khi cần hiểu ngữ cảnh hoặc chạy test.\n\n### Force With Lease\n- **Nói dễ hiểu**: Cờ cập nhật nhánh remote sau khi lịch sử local bị viết lại, từ chối nếu remote đã đổi so với thông tin mà Git đang dùng.\n- **Ví dụ**: Chạy `git push --force-with-lease` sau khi rebase xong để cập nhật lại Pull Request của chính mình.\n- **Đừng nhầm**: Đây không phải bảo đảm tuyệt đối và không nên dùng để viết lại nhánh dùng chung nếu chưa phối hợp với người khác.\n\n## 📖 Định nghĩa\nConflict có thể xuất hiện khi merge hoặc rebase hai lịch sử có thay đổi Git không thể tự kết hợp. Git đánh dấu các xung đột mà nó phát hiện, nhưng không phát hiện hết xung đột về ý nghĩa chương trình. Bài này dùng một ví dụ sửa cùng dòng để luyện quy trình fetch, rebase, giải quyết và kiểm tra.\n\n## 💡 Tại sao cần\nConflict có thể xảy ra khi tích hợp nhánh. Đọc cả hai thay đổi, tìm hiểu mục đích và trao đổi với người liên quan khi cần; sau khi sửa, chạy các kiểm tra phù hợp. Rebase hữu ích với nhánh cá nhân chưa chia sẻ rộng, còn merge là lựa chọn khi không muốn viết lại lịch sử đã chia sẻ.\n\n## 🧠 Mental Model\nHãy hình dung hai kiến trúc sư cùng thiết kế một phòng khách. Người A đề xuất đặt đàn piano ở góc phòng và đã được duyệt bản vẽ trước (`merged into main`). Người B vừa nộp bản vẽ đặt giá sách lớn đúng vào góc đó (`PR conflict`). Người B không thể tự ý ném cây đàn đi, mà phải mang bản vẽ mới về bàn, trao đổi với người A để thống nhất dời giá sách hoặc kết hợp cả hai.\n\n## 📊 Sơ đồ minh họa\n```mermaid\nflowchart TD\n    PR[Pull Request cần cập nhật từ nhánh đích] --> Fetch[Chạy git fetch origin trên máy]\n    Fetch --> Rebase[Chạy git rebase origin/main]\n    Rebase --> Stop[Git tạm dừng tại commit có xung đột]\n    Stop --> Discuss[Trao đổi với đồng nghiệp & sửa file]\n    Discuss --> Add[git add cac-file-da-sua]\n    Add --> Cont[git rebase --continue]\n    Cont --> Test[Chạy test và xem lại diff]\n    Test --> Push[Push nhánh đã cập nhật; có thể cần force-with-lease sau rebase]\n    Push --> Green[Kiểm tra lại PR và các điều kiện merge]\n```\n\n## 🏢 Ví dụ thực tế\nKỹ sư Tuấn đang làm nhánh `feat/cart-discount` thì thấy Pull Request báo xung đột. Tuấn kiểm tra thấy đồng nghiệp vừa merge nhánh sửa đổi cách tính thuế trong tệp `pricing.ts`. Thay vì sửa vội trên web GitHub, Tuấn chạy `git fetch origin` và `git rebase origin/main` trên máy. Terminal dừng lại ở hàm tính tiền. Tuấn trao đổi nhanh 2 phút với đồng nghiệp để thống nhất thứ tự trừ giảm giá trước hay tính thuế trước. Sau đó Tuấn lưu code, chạy test thành công và push lên an toàn.\n\n## 💻 Command & Cú pháp\n```bash\n# Tải các commit mới nhất từ máy chủ về máy\ngit fetch origin\n\n# Đưa các commit của nhánh hiện tại lên trên đầu nhánh chính mới nhất\ngit rebase origin/main\n\n# Đánh dấu các tệp tin đã được giải quyết xung đột xong\ngit add src/pricing.ts\n\n# Tiếp tục hành trình rebase sau khi giải quyết xong xung đột\ngit rebase --continue\n\n# Đẩy lịch sử đã được rebase lên nhánh từ xa một cách an toàn\ngit push --force-with-lease origin feat/cart-discount\n```\n\n## 🔍 Giải thích command\n- `git fetch origin`: Tải thông tin mới từ remote; không tự thay đổi nhánh hiện tại hay file đang sửa.\n- `git rebase origin/main`: Đặt lại gốc nhánh của bạn lên commit mới nhất của `main`, tái hiện các commit trên nền mới.\n- `git add <tệp>`: Báo cho Git biết bạn đã hoàn tất việc chỉnh sửa thủ công các đoạn mâu thuẫn trong tệp.\n- `git push --force-with-lease`: Dùng khi rebase đã viết lại commit trên nhánh remote của chính bạn; kiểm tra trạng thái remote trước và phối hợp nếu có người cùng dùng nhánh.\n\n## ⚠️ Sai lầm phổ biến\n- Tự ý xóa code của đồng nghiệp khi giải quyết xung đột mà không trao đổi để hiểu rõ mục đích của đoạn code đó.\n- Sửa các xung đột logic nghiệp vụ phức tạp trực tiếp trên trình soạn thảo web của GitHub mà không chạy test.\n- Sử dụng `git push --force` mù quáng thay vì dùng `--force-with-lease`, có nguy cơ làm mất code của đồng nghiệp.\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác mô phỏng kịch bản xung đột trên máy và đối chiếu theo hướng dẫn bên dưới.\n\n1. Trong repo thử nghiệm, tạo `main` và hai nhánh từ cùng một commit; sửa cùng một dòng trong `calculator.ts` trên mỗi nhánh rồi commit.\n2. Merge nhánh thứ nhất vào `main`.\n3. Chuyển sang nhánh thứ hai, chạy `git rebase main`; Git sẽ dừng nếu không tự kết hợp được hai sửa đổi.\n4. Mở file, đọc cả hai phiên bản, chọn kết quả đúng và xóa các dấu conflict. Chạy test hoặc kiểm tra kết quả.\n5. Chạy `git add calculator.ts`, rồi `git rebase --continue`; nếu muốn hủy, chạy `git rebase --abort`.\n\n## 💡 Hint & mẹo\n- Trao đổi với người hiểu ngữ cảnh nghiệp vụ khi không rõ mục đích của một thay đổi.\n- Bạn có thể gõ `git rebase --abort` bất cứ lúc nào nếu muốn dừng lại và quay về trạng thái ban đầu an toàn.\n\n## ✅ Validation & Kết quả mong đợi\n- Rebase hoàn tất, `git status` không còn báo conflict và bài kiểm tra phù hợp chạy đạt.\n- Nếu bài tập dùng GitHub, kiểm tra lại PR; nếu chỉ dùng local thì xem lịch sử bằng `git log --oneline --graph --all`.\n\n## ❓ Quiz nhanh\nHãy hoàn thành bài trắc nghiệm bên dưới để kiểm tra kỹ năng phân tích và xử lý xung đột nhóm trong Git.\n\n## 🚀 Thử thách nâng cao\nSo sánh sự khác biệt về lịch sử commit giữa việc giải quyết xung đột bằng `git merge main` so với `git rebase origin/main` trong môi trường nhóm đông thành viên.\n\n## 📝 Tổng kết\n- Git sẽ báo những xung đột mà nó không thể tự kết hợp; xung đột logic có thể không hiện thành marker.\n- Chọn merge hoặc rebase theo việc nhánh đã được chia sẻ hay chưa, rồi kiểm tra kết quả.\n- Trao đổi khi cần làm rõ yêu cầu và chạy test phù hợp trước khi tích hợp.\n",
  "quiz": {
    "id": "quiz-06-14-team-conflict-scenario",
    "title": "Trắc nghiệm: Kịch bản xung đột nhóm",
    "questions": [
      {
        "id": "q1",
        "question": "Nguyên nhân trực tiếp dẫn đến việc một Pull Request bị báo lỗi \"Merge conflict\" trên GitHub là gì?",
        "type": "single",
        "options": [
          {
            "text": "Nhánh chính đã được cập nhật thêm các commit mới sửa đổi cùng vùng mã nguồn với nhánh của bạn",
            "correct": true
          },
          {
            "text": "Tài khoản GitHub của bạn đã hết hạn sử dụng",
            "correct": false
          },
          {
            "text": "Máy tính của bạn bị mất kết nối mạng Internet",
            "correct": false
          },
          {
            "text": "Tên nhánh của bạn có chứa quá nhiều ký tự chữ cái",
            "correct": false
          }
        ],
        "explanation": "Git báo conflict khi không thể tự kết hợp thay đổi; xung đột logic có thể tồn tại dù không có conflict marker."
      },
      {
        "id": "q2",
        "question": "Hành động đầu tiên và chuẩn mực nhất bạn nên làm khi gặp xung đột logic nghiệp vụ phức tạp với code của đồng nghiệp là gì?",
        "type": "single",
        "options": [
          {
            "text": "Chủ động trao đổi trực tiếp với đồng nghiệp đã viết đoạn code đó để cùng thống nhất giải pháp kết hợp chuẩn xác",
            "correct": true
          },
          {
            "text": "Tự ý xóa sạch toàn bộ đoạn mã của đồng nghiệp để code của mình chạy được",
            "correct": false
          },
          {
            "text": "Đóng máy tính đi về và hy vọng sáng mai xung đột sẽ tự biến mất",
            "correct": false
          },
          {
            "text": "Tạo tài khoản GitHub mới và nộp đơn xin nghỉ việc",
            "correct": false
          }
        ],
        "explanation": "Giao tiếp trực tiếp giúp làm sáng tỏ ngữ cảnh kinh doanh và bảo đảm việc ghép nối logic không làm hỏng tính năng của cả hai bên."
      },
      {
        "id": "q3",
        "question": "Tại sao việc giải quyết các xung đột lớn trực tiếp trên giao diện web của GitHub lại bị xem là tiềm ẩn nhiều rủi ro?",
        "type": "single",
        "options": [
          {
            "text": "Với thay đổi phức tạp, xử lý local giúp đọc đầy đủ ngữ cảnh và chạy kiểm tra phù hợp trước khi push",
            "correct": true
          },
          {
            "text": "Vì GitHub sẽ tính thêm phí dịch vụ mỗi lần bấm sửa trên web",
            "correct": false
          },
          {
            "text": "Vì giao diện web của GitHub không hỗ trợ màn hình màu",
            "correct": false
          },
          {
            "text": "Vì việc đó vi phạm luật pháp quốc tế",
            "correct": false
          }
        ],
        "explanation": "Web có thể xử lý conflict đơn giản; local hữu ích khi cần editor, test hoặc build của dự án."
      },
      {
        "id": "q4",
        "question": "Cờ `--force-with-lease` trong lệnh git push an toàn vượt trội hơn cờ `--force` truyền thống ở điểm nào?",
        "type": "single",
        "options": [
          {
            "text": "Nó kiểm tra remote ref so với giá trị mong đợi và thường từ chối nếu remote đã thay đổi",
            "correct": true
          },
          {
            "text": "Nó tự động mã hóa dữ liệu gửi qua mạng bằng thuật toán quân sự",
            "correct": false
          },
          {
            "text": "Nó giúp lệnh push chạy nhanh hơn gấp 10 lần",
            "correct": false
          },
          {
            "text": "Nó không yêu cầu bạn phải nhập mật khẩu tài khoản",
            "correct": false
          }
        ],
        "explanation": "Lease giảm nguy cơ ghi đè thay đổi chưa biết, nhưng không thay thế phối hợp khi rebase một nhánh dùng chung."
      },
      {
        "id": "q5",
        "question": "Sau khi giải quyết xong các điểm mốc xung đột trong tệp tin, câu lệnh nào được dùng để xác nhận đã xử lý xong tệp đó trong quá trình rebase?",
        "type": "single",
        "options": [
          {
            "text": "git add <tên-tệp>",
            "correct": true
          },
          {
            "text": "git commit -m \"done\"",
            "correct": false
          },
          {
            "text": "git push origin main",
            "correct": false
          },
          {
            "text": "git checkout --force",
            "correct": false
          }
        ],
        "explanation": "Lệnh `git add` đưa tệp đã xử lý xung đột vào Staging Area để chuẩn bị cho bước `git rebase --continue`."
      },
      {
        "id": "q6",
        "question": "Lệnh nào sau đây cho phép bạn hủy bỏ toàn bộ quá trình rebase giải quyết xung đột và quay về trạng thái an toàn ban đầu?",
        "type": "single",
        "options": [
          {
            "text": "git rebase --abort",
            "correct": true
          },
          {
            "text": "git rebase --skip",
            "correct": false
          },
          {
            "text": "git rebase --undo",
            "correct": false
          },
          {
            "text": "git reset --delete",
            "correct": false
          }
        ],
        "explanation": "Khi rebase đang dừng vì conflict, `--abort` hủy thao tác và cố đưa nhánh về trạng thái trước khi rebase."
      }
    ]
  }
};
export default lesson;
