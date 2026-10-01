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
  "content": "# Team Conflict Scenario\n\n## 🎯 Mục tiêu\n- Phân tích nguyên nhân gốc rễ gây ra xung đột hợp nhất (Merge Conflict) trong môi trường làm việc nhóm thực tế.\n- Làm chủ quy trình xử lý xung đột an toàn tại máy cục bộ (Local Resolution) trước khi cập nhật lại Pull Request.\n- Sử dụng kỹ thuật `git fetch` và `git rebase origin/main` để đưa nhánh tính năng lên đầu lịch sử mới nhất.\n- Giao tiếp hiệu quả và phối hợp nhịp nhàng với đồng nghiệp khi gặp xung đột logic kinh doanh phức tạp.\n\n## 🧩 Từ khóa hôm nay\n### Merge Conflict\n- **Nói dễ hiểu**: Tình huống Git dừng lại vì hai người cùng sửa đổi một vùng mã nguồn và không biết nên giữ đoạn nào.\n- **Ví dụ**: Đồng nghiệp vừa merge nhánh đổi màu nút sang xanh, còn bạn gửi PR đổi màu nút sang đỏ trên cùng một dòng CSS.\n- **Đừng nhầm**: Không phải lỗi hệ thống bị hỏng, mà là cơ chế bảo vệ an toàn để lập trình viên tự quyết định logic đúng.\n\n### Local Resolution\n- **Nói dễ hiểu**: Quy trình kéo code mới về máy tính cá nhân để chạy thử, giải quyết xung đột và kiểm thử kỹ càng trước khi đẩy lên.\n- **Ví dụ**: Dùng VS Code trên máy để chọn Accept Incoming Change, chạy test xong mới push lên GitHub.\n- **Đừng nhầm**: Tránh sửa conflict trực tiếp trên web GitHub với các file phức tạp vì không thể biên dịch hay chạy test.\n\n### Force With Lease\n- **Nói dễ hiểu**: Cờ đẩy code có kiểm tra an toàn, chỉ cho phép ghi đè lịch sử nếu chưa có ai khác đẩy thêm commit mới lên nhánh.\n- **Ví dụ**: Chạy `git push --force-with-lease` sau khi rebase xong để cập nhật lại Pull Request của chính mình.\n- **Đừng nhầm**: Khác với `git push --force` mù quáng sẽ ghi đè bất chấp mọi công sức của đồng nghiệp làm chung nhánh.\n\n## 📖 Định nghĩa\nTeam Conflict Scenario là tình huống thực chiến xảy ra khi nhiều lập trình viên cùng thay đổi các phần mã nguồn liên quan trên các nhánh độc lập, và một nhánh đã được hợp nhất vào nhánh chính trước. Khi nhánh còn lại được merge, Git sẽ thông báo xung đột, đòi hỏi lập trình viên phải tải mã mới về máy cục bộ để đối soát và xử lý an toàn.\n\n## 💡 Tại sao cần\nXung đột mã nguồn là hiện tượng bình thường trong quá trình cộng tác phần mềm. Một kỹ sư chuyên nghiệp không bao giờ hoảng sợ hay đổ lỗi cho đồng nghiệp khi gặp conflict. Thay vào đó, họ bình tĩnh áp dụng quy trình xử lý bài bản: trao đổi trực tiếp với người viết đoạn code liên quan, làm rõ ngữ cảnh và giải quyết dứt điểm trên môi trường máy cá nhân.\n\n## 🧠 Mental Model\nHãy hình dung hai kiến trúc sư cùng thiết kế một phòng khách. Người A đề xuất đặt đàn piano ở góc phòng và đã được duyệt bản vẽ trước (`merged into main`). Người B vừa nộp bản vẽ đặt giá sách lớn đúng vào góc đó (`PR conflict`). Người B không thể tự ý ném cây đàn đi, mà phải mang bản vẽ mới về bàn, trao đổi với người A để thống nhất dời giá sách hoặc kết hợp cả hai.\n\n## 📊 Sơ đồ minh họa\n```mermaid\nflowchart TD\n    PR[Pull Request bị Conflict trên GitHub] --> Fetch[Chạy git fetch origin trên máy]\n    Fetch --> Rebase[Chạy git rebase origin/main]\n    Rebase --> Stop[Git tạm dừng tại commit có xung đột]\n    Stop --> Discuss[Trao đổi với đồng nghiệp & sửa file]\n    Discuss --> Add[git add cac-file-da-sua]\n    Add --> Cont[git rebase --continue]\n    Cont --> Push[git push --force-with-lease origin branch]\n    Push --> Green[Pull Request xanh lại và sẵn sàng merge]\n```\n\n## 🏢 Ví dụ thực tế\nKỹ sư Tuấn đang làm nhánh `feat/cart-discount` thì thấy Pull Request báo xung đột. Tuấn kiểm tra thấy đồng nghiệp vừa merge nhánh sửa đổi cách tính thuế trong tệp `pricing.ts`. Thay vì sửa vội trên web GitHub, Tuấn chạy `git fetch origin` và `git rebase origin/main` trên máy. Terminal dừng lại ở hàm tính tiền. Tuấn trao đổi nhanh 2 phút với đồng nghiệp để thống nhất thứ tự trừ giảm giá trước hay tính thuế trước. Sau đó Tuấn lưu code, chạy test thành công và push lên an toàn.\n\n## 💻 Command & Cú pháp\n```bash\n# Tải các commit mới nhất từ máy chủ về máy\ngit fetch origin\n\n# Đưa các commit của nhánh hiện tại lên trên đầu nhánh chính mới nhất\ngit rebase origin/main\n\n# Đánh dấu các tệp tin đã được giải quyết xung đột xong\ngit add src/pricing.ts\n\n# Tiếp tục hành trình rebase sau khi giải quyết xong xung đột\ngit rebase --continue\n\n# Đẩy lịch sử đã được rebase lên nhánh từ xa một cách an toàn\ngit push --force-with-lease origin feat/cart-discount\n```\n\n## 🔍 Giải thích command\n- `git fetch origin`: Cập nhật dữ liệu từ xa mà không làm thay đổi thư mục làm việc hiện tại của bạn.\n- `git rebase origin/main`: Đặt lại gốc nhánh của bạn lên commit mới nhất của `main`, tái hiện các commit trên nền mới.\n- `git add <tệp>`: Báo cho Git biết bạn đã hoàn tất việc chỉnh sửa thủ công các đoạn mâu thuẫn trong tệp.\n- `git push --force-with-lease`: Cập nhật nhánh remote có kiểm tra điều kiện an toàn, chống ghi đè công sức của người khác.\n\n## ⚠️ Sai lầm phổ biến\n- Tự ý xóa code của đồng nghiệp khi giải quyết xung đột mà không trao đổi để hiểu rõ mục đích của đoạn code đó.\n- Sửa các xung đột logic nghiệp vụ phức tạp trực tiếp trên trình soạn thảo web của GitHub mà không chạy test.\n- Sử dụng `git push --force` mù quáng thay vì dùng `--force-with-lease`, có nguy cơ làm mất code của đồng nghiệp.\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác mô phỏng kịch bản xung đột trên máy và đối chiếu theo hướng dẫn bên dưới.\n\n1. Tạo hai nhánh cùng sửa một dòng trong tệp `calculator.ts`.\n2. Hợp nhất nhánh thứ nhất vào `main`.\n3. Chuyển sang nhánh thứ hai, chạy `git rebase main` và quan sát các dấu mốc conflict `<<<<<<<` và `>>>>>>>`.\n4. Mở trình soạn thảo, chọn giữ lại logic phù hợp và xóa bỏ các ký hiệu đánh dấu.\n5. Chạy `git add calculator.ts`, sau đó gõ `git rebase --continue` để hoàn tất quy trình xử lý.\n\n## 💡 Hint & mẹo\n- Trao đổi trực tiếp giữa người với người luôn là phương pháp giải quyết xung đột nhanh và chính xác nhất.\n- Bạn có thể gõ `git rebase --abort` bất cứ lúc nào nếu muốn dừng lại và quay về trạng thái ban đầu an toàn.\n\n## ✅ Validation & Kết quả mong đợi\n- Lệnh `git status` báo `nothing to commit, working tree clean`.\n- Nhánh của bạn sở hữu lịch sử commit thẳng thớm và Pull Request trên GitHub chuyển sang trạng thái sẵn sàng hợp nhất.\n\n## ❓ Quiz nhanh\nHãy hoàn thành bài trắc nghiệm bên dưới để kiểm tra kỹ năng phân tích và xử lý xung đột nhóm trong Git.\n\n## 🚀 Thử thách nâng cao\nSo sánh sự khác biệt về lịch sử commit giữa việc giải quyết xung đột bằng `git merge main` so với `git rebase origin/main` trong môi trường nhóm đông thành viên.\n\n## 📝 Tổng kết\n- Xung đột là một phần tất yếu của quá trình cộng tác nhóm trong mọi dự án phần mềm.\n- Luôn giải quyết xung đột tại máy cá nhân để bảo đảm kiểm thử và biên dịch thành công trước khi đẩy lên.\n- Phối hợp và giao tiếp cởi mở với đồng nghiệp là chìa khóa để xử lý mọi xung đột logic an toàn.\n",
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
        "explanation": "Xung đột phát sinh khi Git không thể tự động quyết định xem nên giữ lại đoạn mã nào giữa nhánh của bạn và nhánh chính vừa được cập nhật."
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
            "text": "Vì bạn không thể chạy các bài kiểm thử tự động (Unit Test / Build) trên máy tính để xác thực mã nguồn có hoạt động đúng hay không",
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
        "explanation": "Giải quyết xung đột trên máy cá nhân cho phép bạn biên dịch, chạy thử ứng dụng và kiểm tra kỹ lưỡng trước khi đưa lên máy chủ."
      },
      {
        "id": "q4",
        "question": "Cờ `--force-with-lease` trong lệnh git push an toàn vượt trội hơn cờ `--force` truyền thống ở điểm nào?",
        "type": "single",
        "options": [
          {
            "text": "Nó sẽ từ chối ghi đè nếu phát hiện có người khác vừa đẩy thêm commit mới lên nhánh từ xa trong lúc bạn đang rebase",
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
        "explanation": "Cờ `--force-with-lease` kiểm tra xem nhánh remote có đúng ở trạng thái bạn đã biết hay không, ngăn chặn việc vô tình xóa mất commit của đồng nghiệp."
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
        "explanation": "Cờ `--abort` là chiếc phao cứu sinh đưa nhánh quay trở về chính xác trạng thái trước khi bạn bắt đầu câu lệnh rebase."
      }
    ]
  }
};
export default lesson;
