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
  "content": "# Team Conflict Scenario\n\n---\n\n## 🎯 Mục tiêu\n- Phân tích nguyên nhân gốc rễ gây ra xung đột hợp nhất (Merge Conflict) trong môi trường làm việc nhóm thực tế.\n- Làm chủ quy trình xử lý xung đột an toàn tại máy cục bộ (Local Resolution) trước khi cập nhật lại Pull Request.\n- Sử dụng kỹ thuật `git fetch` và `git rebase origin/main` để đưa nhánh tính năng lên đầu lịch sử mới nhất.\n- Giao tiếp hiệu quả và phối hợp nhịp nhàng với đồng nghiệp khi gặp xung đột logic kinh doanh phức tạp.\n\n---\n\n## 📖 Định nghĩa\n> Team Conflict Scenario (Kịch bản giải quyết xung đột nhóm) là tình huống thực chiến kinh điển xảy ra khi hai hoặc nhiều lập trình viên cùng chỉnh sửa trên các vùng mã nguồn trùng lặp hoặc phụ thuộc lẫn nhau trên các nhánh riêng biệt, và một người đã hợp nhất thành công vào nhánh chính trước. Khi người thứ hai cố gắng mở hoặc hợp nhất Pull Request, hệ thống Git sẽ từ chối tự động gộp và thông báo xung đột, đòi hỏi người lập trình viên phải chủ động kéo mã nguồn mới nhất về máy cá nhân để đối soát và giải quyết mâu thuẫn.\n\n---\n\n## 🤔 Tại sao cần?\nXung đột mã nguồn không phải là lỗi của hệ thống, mà là hệ quả tất yếu và hoàn toàn bình thường trong quá trình cộng tác phát triển phần mềm hiện đại. Một kỹ sư chuyên nghiệp không bao giờ hoảng sợ hay đổ lỗi cho đồng nghiệp khi gặp conflict; thay vào đó, họ nắm vững quy trình xử lý xung đột bài bản: giữ bình tĩnh, trao đổi trực tiếp với tác giả đoạn code liên quan để hiểu rõ ngữ cảnh, và giải quyết xung đột một cách minh bạch, an toàn trên máy cục bộ.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung hai kiến trúc sư cùng thiết kế nội thất cho một căn phòng khách. Kiến trúc sư A muốn đặt một chiếc đàn piano ở góc phòng và bản thiết kế của anh ta đã được chủ nhà duyệt trước (`merged into main`). Kiến trúc sư B không biết điều đó và vừa gửi bản vẽ đề xuất đặt một giá sách lớn đúng vào góc phòng đó (`Pull Request conflict`). Kiến trúc sư B không thể tự ý ném chiếc đàn piano đi. Anh ta phải mang bản vẽ mới nhất về bàn làm việc, gọi điện trao đổi với kiến trúc sư A để thống nhất dời giá sách sang góc khác hoặc kết hợp hài hòa cả hai món đồ.\n\n---\n\n## 🖼 Sơ đồ\n```text\nKịch bản xung đột nhóm và cách giải quyết cục bộ:\nmain:      C1 ──────── C2 (Tính năng của Dev A được merge trước!)\n            │           ▲\n            │           │ (Git từ chối merge do xung đột!)\nfeat/devB:  └── C3 ─────┘\n\nCác bước giải cứu chuẩn mực của Dev B:\n1. git fetch origin\n2. git rebase origin/main (hoặc git merge origin/main)\n3. Mở VS Code giải quyết Conflict ──► git add <files>\n4. git rebase --continue\n5. git push --force-with-lease origin feat/devB ──► PR hết xung đột!\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKỹ sư Tuấn đang làm nhánh `feat/cart-discount` thì nhận thấy nút Merge trên Pull Request của mình bị chuyển sang màu xám với dòng chữ \"This branch has conflicts that must be resolved\". Tuấn kiểm tra lịch sử và thấy kỹ sư Lan vừa merge một nhánh sửa đổi cách tính thuế trong tệp `pricing.ts`. Tuấn không bấm sửa trực tiếp trên giao diện web GitHub vì rất dễ sót lỗi. Thay vào đó, trên terminal máy mình, Tuấn chạy `git fetch origin` rồi `git rebase origin/main`. Terminal tạm dừng và báo conflict tại hàm `calculateTotal`. Tuấn mở VS Code, sang bàn làm việc của Lan để trao đổi nhanh trong 2 phút về thứ tự áp dụng giảm giá trước hay tính thuế trước. Sau khi thống nhất logic, Tuấn lưu code, chạy `git add pricing.ts` và `git rebase --continue`. Cuối cùng Tuấn gõ `git push --force-with-lease` và Pull Request của Tuấn xanh trở lại.\n\n---\n\n## 💻 Command\n```bash\ngit fetch origin\ngit rebase origin/main\ngit status\ngit add <tệp-đã-sửa>\ngit rebase --continue\ngit push --force-with-lease origin <tên-nhánh>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git fetch origin`: Tải toàn bộ các commit mới nhất từ máy chủ về máy mà không làm xáo trộn working tree.\n- `git rebase origin/main`: Đặt lại nền tảng nhánh của bạn lên trên commit mới nhất của nhánh chính.\n- `git push --force-with-lease`: Cập nhật nhánh remote an toàn tuyệt đối, chỉ cho phép force push nếu không có ai khác đẩy code mới lên nhánh đó.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Tự ý xóa code của đồng nghiệp khi giải quyết xung đột mà không hề trao đổi hay hiểu rõ mục đích của đoạn code đó.**: Tự ý xóa code của đồng nghiệp khi giải quyết xung đột mà không hề trao đổi hay hiểu rõ mục đích của đoạn code đó.\n2. **Giải quyết các xung đột lớn phức tạp trực tiếp trên trình soạn thảo web của GitHub**:  Dễ gây lỗi cú pháp và không thể chạy kiểm thử.\n3. **Sử dụng `git push --force` thông thường thay vì `--force-with-lease`**:  Tiềm ẩn nguy cơ vô tình ghi đè commit của đồng nghiệp cùng làm chung nhánh.\n\n---\n\n## 🧪 Lab\n1. Tạo kịch bản xung đột giữa hai nhánh cùng sửa một dòng trong tệp `index.html`.\n2. Thực hiện lệnh `git fetch` và `git rebase origin/main` để giải quyết mâu thuẫn trên VS Code.\n\n---\n\n## 💡 Hint\n> Giao tiếp giữa con người với con người luôn là công cụ giải quyết xung đột mã nguồn hiệu quả nhất.\n\n---\n\n## ✅ Validation\n- Pull Request trên GitHub tự động chuyển sang trạng thái sẵn sàng hợp nhất mà không còn bất kỳ xung đột nào.\n\n---\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm dưới đây về kỹ năng giải quyết xung đột nhóm trong Git.\n\n---\n\n## 🔥 Challenge\nSo sánh ưu nhược điểm giữa việc dùng `git merge main` và `git rebase origin/main` khi giải quyết xung đột cho một nhánh tính năng.\n\n---\n\n## 📚 Tổng kết\n- Xung đột mã nguồn trong làm việc nhóm là điều hoàn toàn tự nhiên và bình thường.\n- Luôn ưu tiên kéo mã nguồn mới về máy cá nhân và giải quyết xung đột cục bộ kèm chạy kiểm thử.\n- Sử dụng `git push --force-with-lease` để cập nhật lại nhánh tính năng sau khi rebase giải quyết xung đột an toàn.\n",
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
