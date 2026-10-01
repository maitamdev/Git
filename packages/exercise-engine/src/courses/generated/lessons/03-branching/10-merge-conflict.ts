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
  "content": "# Xung đột Merge Conflict là gì?\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ nguyên nhân phát sinh xung đột hợp nhất (Merge Conflict) khi làm việc nhóm.\n- Đọc hiểu cấu trúc các vạch đánh dấu xung đột (Conflict Markers): `<<<<<<<`, `=======`, `>>>>>>>`.\n- Sử dụng `git status` để xác định danh sách các tệp bị xung đột và giữ bình tĩnh khi xử lý.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Merge Conflict — xung đột hợp nhất\n- **Nói dễ hiểu:** Tình huống hai nhánh cùng sửa đổi tại cùng một dòng code trong cùng một tệp tin.\n- **Ví dụ:** Bạn sửa tiêu đề trang web ở dòng 10 thành \"Trang chủ\", bạn khác lại sửa dòng 10 thành \"Home\".\n- **Đừng nhầm:** Xung đột không phải lỗi hỏng phần mềm; đây là cơ chế bảo vệ để Git không tự ý xóa code của ai.\n\n### Conflict Markers — vạch đánh dấu xung đột\n- **Nói dễ hiểu:** Các dòng ký hiệu `<<<<<<<`, `=======`, `>>>>>>>` do Git chèn vào để bao quanh đoạn code tranh chấp.\n- **Ví dụ:** Đoạn nằm trên `=======` là code nhánh bạn đang đứng; đoạn nằm dưới là code của nhánh đang gộp vào.\n- **Đừng nhầm:** Bạn bắt buộc phải xóa sạch các dòng ký hiệu này trước khi commit, nếu không chương trình sẽ bị lỗi cú pháp.\n\n### Unmerged paths — danh sách tệp chờ xử lý\n- **Nói dễ hiểu:** Mục thông báo trong `git status` liệt kê những tệp đang bị xung đột cần bạn mở ra chọn lại nội dung.\n- **Ví dụ:** Dòng chữ đỏ `both modified: app.js` cho biết tệp `app.js` đang có xung đột cần được giải quyết.\n- **Đừng nhầm:** Git sẽ dừng tiến trình merge và chờ bạn sửa xong toàn bộ các tệp trong danh sách này.\n\n---\n\n## 📖 Định nghĩa\nMerge Conflict (xung đột hợp nhất) xảy ra khi hai nhánh cùng sửa đổi cùng một dòng code trong cùng một tệp kể từ commit tổ tiên chung. Vì không thể tự đoán bạn muốn giữ phiên bản nào, Git sẽ tạm dừng tiến trình gộp, giữ nguyên cả hai đoạn code kèm vạch đánh dấu để bạn tự đưa ra quyết định.\n\n---\n\n## 🤔 Tại sao cần?\nKhi làm việc nhóm, việc hai người vô tình sửa cùng một dòng là điều bình thường. Thay vì để người gộp sau đè mất code của người gộp trước, Git phát hiện và báo xung đột. Đây là chốt chặn an toàn bảo vệ công sức lập trình của mọi thành viên trong nhóm.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung hai kiến trúc sư cùng vẽ vào một góc phòng khách trên bản thiết kế nhà. Một người muốn đặt lò sưởi, người kia muốn đặt bể cá. Thợ xây (Git) không thể tự ý chọn lò sưởi hay bể cá, nên sẽ đánh dấu khoanh vùng vị trí đó lại và gọi cả hai người đến để cùng thống nhất xem nên giữ cái nào.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCấu trúc vạch đánh dấu xung đột trong tệp:\n<<<<<<< HEAD (Nhánh bạn đang đứng - ví dụ: main)\nconst apiUrl = \"https://api.production.vn/v1\";\n=======\nconst apiUrl = \"https://api.staging.vn/v2\";\n>>>>>>> feature-api (Nhánh bạn đang muốn gộp vào)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrong tệp `config.js`, bạn An sửa cổng chạy ứng dụng thành `port = 8080` trên nhánh `main`, còn bạn Bình sửa thành `port = 9000` trên nhánh `feature-api`. Khi An chạy lệnh gộp nhánh `feature-api` vào `main`, Git thấy cùng dòng đó có hai giá trị khác nhau. Git dừng lại, báo conflict và chèn các vạch đánh dấu vào `config.js` để An và Bình trao đổi chọn cổng thích hợp.\n\n---\n\n## 💻 Command\n```bash\ngit status\ngit diff\ngit merge --abort\n```\n\n---\n\n## 🔍 Giải thích command\n- `git status`: Hiển thị danh sách các tệp đang bị xung đột ở mục `Unmerged paths`.\n- `git diff`: So sánh và in ra các khối xung đột trực tiếp trên cửa sổ dòng lệnh.\n- `git merge --abort`: Hủy bỏ quá trình gộp nhánh và đưa dự án quay trở lại trạng thái sạch sẽ trước khi chạy lệnh merge.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Hoảng loạn xóa thư mục khi gặp xung đột:** Xung đột là chuyện thường ngày trong lập trình nhóm, chỉ cần mở tệp ra xem xét và chỉnh sửa.\n2. **Commit khi chưa xóa các vạch `<<<<<<<` và `=======`:** Sẽ làm hỏng cú pháp chương trình và gây lỗi khi chạy code.\n3. **Tự ý xóa code của bạn cùng nhóm mà không trao đổi:** Cần thảo luận để biết giải pháp nào là tối ưu cho cả hai bên.\n\n---\n\n## 🧪 Lab\nBài tập này được thực hành trên môi trường Git mô phỏng của hệ thống:\n1. Nhận thông báo xung đột sau khi thực hiện lệnh gộp nhánh.\n2. Chạy `git status` và quan sát mục `Unmerged paths: both modified: app.js`.\n3. Mở tệp `app.js` trong trình soạn thảo để nhận diện các vạch `<<<<<<<`, `=======`, `>>>>>>>`.\n4. Quan sát hai đoạn code khác nhau ở hai nhánh trước khi quyết định cách sửa.\n\n---\n\n## 💡 Hint\nPhần giữa `<<<<<<< HEAD` và `=======` là code hiện tại của bạn; phần giữa `=======` và `>>>>>>>` là code của nhánh được gộp.\n\n---\n\n## ✅ Validation\n- Nhận diện đúng tệp tin xung đột qua lệnh `git status`.\n- Chỉ ra được đoạn code của nhánh hiện tại và nhánh nguồn trong tệp có vạch đánh dấu.\n\n---\n\n## ❓ Quiz\nTrả lời các câu hỏi sau để nắm vững nguyên nhân và cấu trúc của Merge Conflict trong Git.\n\n---\n\n## 🔥 Challenge\nChạy thử lệnh `git merge --abort` để tự mình chứng kiến Git dọn dẹp sạch sẽ trạng thái xung đột và đưa bạn trở về ban đầu như thế nào.\n\n---\n\n## 📚 Tổng kết\n- Merge Conflict xuất hiện khi hai nhánh sửa cùng vị trí dòng code kể từ mốc rẽ nhánh.\n- Git chèn các vạch `<<<<<<<`, `=======`, `>>>>>>>` để con người tự chọn lựa nội dung.\n- Conflict là tính năng an toàn bảo vệ dữ liệu, không phải sự cố hỏng hóc của Git.\n",
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
