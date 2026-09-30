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
      "Hiểu rõ nguyên nhân căn bản phát sinh xung đột Merge Conflict trong quá trình làm việc nhóm.",
      "Nhận diện và phân tích cấu trúc của các vạch đánh dấu xung đột (Conflict Markers): `<<<<<<<`, `=======`, `>>>>>>>`.",
      "Phân biệt rõ ràng giữa xung đột nội dung dòng code (Content conflict) và xung đột tệp tin (File rename/delete conflict).",
      "Giữ bình tĩnh và thực hiện quy trình chẩn đoán trạng thái conflict một cách bài bản."
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
      "git status",
      "git diff",
      "git merge --abort"
    ]
  },
  "content": "# Xung đột Merge Conflict là gì?\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ nguyên nhân căn bản phát sinh xung đột Merge Conflict trong quá trình làm việc nhóm.\n- Nhận diện và phân tích cấu trúc của các vạch đánh dấu xung đột (Conflict Markers): `<<<<<<<`, `=======`, `>>>>>>>`.\n- Phân biệt rõ ràng giữa xung đột nội dung dòng code (Content conflict) và xung đột tệp tin (File rename/delete conflict).\n- Giữ bình tĩnh và thực hiện quy trình chẩn đoán trạng thái conflict một cách bài bản.\n\n---\n\n## 📖 Định nghĩa\n> Merge Conflict (Xung đột hợp nhất) là tình huống xảy ra khi thuật toán Three-way merge của Git phát hiện hai nhánh cùng sửa đổi các dòng code giống nhau trong cùng một tệp tin (hoặc một bên sửa nội dung trong khi bên kia xóa tệp tin) kể từ commit tổ tiên chung. Do Git là một hệ thống quản lý phiên bản trung lập không thể tự ý suy đoán ý đồ kinh doanh của lập trình viên, Git sẽ tạm dừng tiến trình merge, bảo vệ mã nguồn nguyên vẹn và chèn các vạch đánh dấu xung đột (Conflict Markers) trực tiếp vào tệp tin để con người tự quyết định.\n\n---\n\n## 🤔 Tại sao cần?\nXung đột mã nguồn là một phần tất yếu và không thể tránh khỏi trong bất kỳ dự án phần mềm chuyên nghiệp nào có nhiều người cùng tham gia đóng góp. Người mới học thường rất sợ hãi và coi conflict là một tai họa hỏng hóc nghiêm trọng. Tuy nhiên, các kỹ sư phần mềm kỳ cựu hiểu rằng conflict thực chất là một cơ chế an toàn tuyệt vời của Git để ngăn chặn việc một người vô tình ghi đè và làm biến mất công sức lập trình của người khác mà không có sự đồng thuận.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung hai kiến trúc sư cùng chỉnh sửa bản vẽ thiết kế mặt bằng của một căn biệt thự. Kiến trúc sư A quyết định đặt một lò sưởi ấm cúng bằng đá cẩm thạch tại góc phòng khách, trong khi Kiến trúc sư B lại quyết định đặt một bể cá cảnh biển nhiệt đới đúng ngay tại tọa độ góc phòng khách đó. Khi thợ xây (Git) cầm hai bản thiết kế lại gần nhau, thợ xây không thể tự ý quyết định nên xây lò sưởi hay đặt bể cá, nên sẽ gọi cả hai kiến trúc sư ra công trường ngồi lại với nhau để thống nhất giải pháp cuối cùng.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCấu trúc các vạch đánh dấu xung đột Conflict Markers:\n<<<<<<< HEAD (Nhánh hiện tại bạn đang đứng - ví dụ: main)\nconst apiUrl = \"https://api.production.vn/v1\";\n=======\nconst apiUrl = \"https://api.staging.vn/v2\";\n>>>>>>> feature-api (Nhánh bạn đang gộp vào - ví dụ: feature-api)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrong tệp cấu hình config.js của dự án backend, lập trình viên An sửa cổng máy chủ thành `port = 8080` trên nhánh main, trong khi lập trình viên Bình sửa thành `port = 9000` trên nhánh feature-server phục vụ môi trường kiểm thử. Khi An chạy câu lệnh `git merge feature-server` vào main, Git lập tức phát hiện cả hai người cùng sửa đổi đúng dòng số 12 của tệp config.js. Git dừng tiến trình merge và thông báo rõ ràng: \"CONFLICT (content): Merge conflict in config.js. Automatic merge failed; fix conflicts and then commit the result.\" An bình tĩnh mở tệp ra và thấy Git đã chèn các vạch đánh dấu xung đột để chờ hai lập trình viên thảo luận giải pháp giữ cổng phù hợp.\n\n---\n\n## 💻 Command\n```bash\ngit status\ngit diff\ngit merge --abort\n```\n\n---\n\n## 🔍 Giải thích command\n- `git status`: Hiển thị rõ danh sách các tệp tin đang bị xung đột ở mục \"Unmerged paths\" bằng màu đỏ rực rỡ.\n- `git diff`: So sánh và in ra chi tiết các khối xung đột giữa hai bên ngay trên màn hình dòng lệnh.\n- `git merge --abort`: Chiếc phanh khẩn cấp giúp bạn hủy bỏ toàn bộ quá trình merge và quay về trạng thái sạch sẽ trước khi gõ lệnh merge.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Hoảng sợ xóa toàn bộ thư mục dự án khi gặp conflict**:  Conflict là chuyện hết sức bình thường, chỉ cần mở tệp ra chọn code giữ lại.\n2. **Commit tệp tin khi chưa xóa các vạch đánh dấu `<<<<<<<`, `=======`**:  Sẽ làm vỡ mã nguồn và khiến dự án bị lỗi biên dịch cú pháp nghiêm trọng.\n3. **Tự ý xóa code của đồng nghiệp mà không trao đổi**:  Có thể làm hỏng tính năng mà đồng nghiệp đã tốn cả tuần để xây dựng.\n\n---\n\n## 🧪 Lab\n1. Tạo xung đột cố ý bằng cách sửa cùng một dòng trong `app.js` trên hai nhánh `main` và `conflict-branch`.\n2. Thực hiện `git merge conflict-branch` từ nhánh `main` để kích hoạt xung đột.\n3. Chạy `git status` và quan sát mục `Unmerged paths: both modified: app.js`.\n4. Mở tệp `app.js` để tận mắt nhìn thấy các vạch đánh dấu `<<<<<<<`, `=======`, `>>>>>>>`.\n\n---\n\n## 💡 Hint\n> Phần giữa `<<<<<<< HEAD` và `=======` là code của bạn; phần giữa `=======` và `>>>>>>>` là code của nhánh kia.\n\n---\n\n## ✅ Validation\n- Nhận diện đúng khối conflict markers trong tệp tin bị xung đột.\n\n---\n\n## ❓ Quiz\nHãy hoàn thành bài trắc nghiệm dưới đây về nguyên nhân và cấu trúc của Merge Conflict.\n\n---\n\n## 🔥 Challenge\nGiải thích sự khác nhau giữa Content Conflict và Binary Conflict (ví dụ xung đột trên tệp ảnh PNG).\n\n---\n\n## 📚 Tổng kết\n- Merge Conflict xảy ra khi hai nhánh cùng sửa đổi cùng một dòng code kể từ điểm rẽ nhánh.\n- Git chèn các vạch đánh dấu `<<<<<<<`, `=======`, `>>>>>>>` để con người tự quyết định.\n- Conflict là cơ chế an toàn bảo vệ dữ liệu, không phải là lỗi hỏng hóc của hệ thống Git.\n",
  "quiz": {
    "id": "quiz-03-10-merge-conflict",
    "title": "Trắc nghiệm: Bản chất Merge Conflict",
    "questions": [
      {
        "id": "q1",
        "question": "Nguyên nhân cốt lõi dẫn đến việc phát sinh Merge Conflict trong Git là gì?",
        "type": "single",
        "options": [
          {
            "text": "Hai nhánh cùng chỉnh sửa các dòng code giống nhau trong cùng một tệp kể từ commit tổ tiên chung",
            "correct": true
          },
          {
            "text": "Do máy tính của lập trình viên bị nhiễm virus phần mềm độc hại",
            "correct": false
          },
          {
            "text": "Do kho lưu trữ Git đã vượt quá giới hạn 100 commit",
            "correct": false
          },
          {
            "text": "Do lập trình viên gõ sai tên tác giả trong lệnh git config",
            "correct": false
          }
        ],
        "explanation": "Xung đột xảy ra khi Git phát hiện hai thay đổi mâu thuẫn trên cùng một vị trí dòng code mà không thể tự giải quyết."
      },
      {
        "id": "q2",
        "question": "Trong cấu trúc Conflict Markers, phần nội dung nằm giữa `<<<<<<< HEAD` và `=======` đại diện cho điều gì?",
        "type": "single",
        "options": [
          {
            "text": "Nội dung code hiện tại của nhánh bạn đang đứng trực tiếp (OURS)",
            "correct": true
          },
          {
            "text": "Nội dung code của nhánh mà bạn đang muốn gộp vào (THEIRS)",
            "correct": false
          },
          {
            "text": "Nội dung code của bản phát hành đầu tiên cách đây mười năm",
            "correct": false
          },
          {
            "text": "Mã nguồn do trí tuệ nhân tạo tự động viết thêm",
            "correct": false
          }
        ],
        "explanation": "Phần trên `=======` là HEAD (nhánh hiện tại bạn đang đứng); phần dưới là nhánh đang được merge vào."
      },
      {
        "id": "q3",
        "question": "Ký hiệu `>>>>>>> <tên-nhánh>` trong tệp xung đột đánh dấu điều gì?",
        "type": "single",
        "options": [
          {
            "text": "Điểm kết thúc của khối code đến từ nhánh đang được gộp vào",
            "correct": true
          },
          {
            "text": "Điểm bắt đầu của một hàm lập trình mới",
            "correct": false
          },
          {
            "text": "Vị trí tệp tin bị virus máy tính tấn công",
            "correct": false
          },
          {
            "text": "Lệnh thoát khỏi cửa sổ terminal",
            "correct": false
          }
        ],
        "explanation": "`>>>>>>>` là vạch kết thúc của khối thay đổi đến từ nhánh nguồn (theirs)."
      },
      {
        "id": "q4",
        "question": "Khi xảy ra conflict, lệnh nào hiển thị danh sách các tệp tin đang bị xung đột cần xử lý?",
        "type": "single",
        "options": [
          {
            "text": "git status",
            "correct": true
          },
          {
            "text": "git crash-report",
            "correct": false
          },
          {
            "text": "git clean-all",
            "correct": false
          },
          {
            "text": "git emergency",
            "correct": false
          }
        ],
        "explanation": "`git status` liệt kê rõ ràng các tệp conflict dưới mục `Unmerged paths: both modified: <file>`."
      },
      {
        "id": "q5",
        "question": "Tại sao lập trình viên không được phép để sót lại các ký tự `<<<<<<<` hoặc `=======` trong mã nguồn khi commit?",
        "type": "single",
        "options": [
          {
            "text": "Vì đây là các ký tự đánh dấu của Git, để sót lại sẽ khiến trình biên dịch báo lỗi cú pháp và làm hỏng ứng dụng",
            "correct": true
          },
          {
            "text": "Vì Git sẽ tự động xóa tài khoản GitHub của bạn nếu phát hiện",
            "correct": false
          },
          {
            "text": "Vì các ký tự này làm máy tính bị quá tải bộ nhớ RAM",
            "correct": false
          },
          {
            "text": "Vì tổ chức tiêu chuẩn W3C nghiêm cấm sử dụng các ký tự này",
            "correct": false
          }
        ],
        "explanation": "Conflict markers là văn bản thô; để lại trong code sẽ làm gãy cú pháp chương trình."
      },
      {
        "id": "q6",
        "question": "Nếu cảm thấy chưa sẵn sàng giải quyết conflict và muốn quay về trạng thái sạch sẽ ban đầu, bạn dùng lệnh gì?",
        "type": "single",
        "options": [
          {
            "text": "git merge --abort",
            "correct": true
          },
          {
            "text": "git cancel now",
            "correct": false
          },
          {
            "text": "git delete conflict",
            "correct": false
          },
          {
            "text": "git undo everything",
            "correct": false
          }
        ],
        "explanation": "`git merge --abort` khôi phục trạng thái Working Tree và HEAD về chính xác trước khi ra lệnh merge."
      }
    ]
  }
};
export default lesson;
