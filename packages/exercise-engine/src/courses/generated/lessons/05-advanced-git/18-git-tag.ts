import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "18-git-tag",
  "moduleId": "05-advanced-git",
  "metadata": {
    "id": "18-git-tag",
    "title": "git tag",
    "level": "advanced",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "08-commit-amend"
    ],
    "objectives": [
      "Hiểu rõ khái niệm và vai trò của Tag trong Git như các mốc đánh dấu phiên bản bất biến.",
      "Phân biệt rõ ràng giữa con trỏ nhánh (Branch - di chuyển liên tục) và con trỏ thẻ (Tag - đứng yên vĩnh viễn).",
      "Tạo và quản lý các thẻ Lightweight Tag (Thẻ nhẹ) nhanh chóng.",
      "Đẩy thẻ lên máy chủ từ xa và xóa thẻ khi không còn sử dụng."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git tag",
      "lightweight tag",
      "gan the phien ban",
      "danh dau moc",
      "release marker",
      "tag git"
    ],
    "commands": [
      "git tag",
      "git tag <tên-thẻ>",
      "git tag <tên-thẻ> <commit-hash>",
      "git push origin <tên-thẻ>",
      "git push origin --tags",
      "git tag -d <tên-thẻ>"
    ]
  },
  "content": "# git tag\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ khái niệm và vai trò của Tag trong Git như các mốc đánh dấu phiên bản bất biến.\n- Phân biệt rõ ràng giữa con trỏ nhánh (Branch - di chuyển liên tục) và con trỏ thẻ (Tag - đứng yên vĩnh viễn).\n- Tạo và quản lý các thẻ Lightweight Tag (Thẻ nhẹ) nhanh chóng.\n- Đẩy thẻ lên máy chủ từ xa và xóa thẻ khi không còn sử dụng.\n\n---\n\n## 📖 Định nghĩa\n> `git tag` là câu lệnh quản lý thẻ phiên bản trong Git, được sử dụng để đánh dấu và ghim cố định một mốc thời gian quan trọng cụ thể trong lịch sử của kho lưu trữ (thường là các phiên bản phát hành sản phẩm như `v1.0.0`, `v2.1.0-beta`). Trong khi con trỏ nhánh liên tục tiến về phía trước mỗi khi có commit mới, con trỏ Tag là một mốc tham chiếu tĩnh bất biến vĩnh cửu gắn chặt vào một commit duy nhất.\n\n---\n\n## 🤔 Tại sao cần?\nTrong quản lý dự án phần mềm chuyên nghiệp, khách hàng và bộ phận vận hành chỉ quan tâm đến các phiên bản phát hành cụ thể chứ không thể nhớ các chuỗi mã băm commit hash phức tạp. `git tag` cung cấp các mốc định danh rõ ràng, dễ nhớ, giúp đội ngũ có thể dễ dàng kiểm tra lại chính xác trạng thái mã nguồn của phiên bản đã bán cho khách hàng cách đây 6 tháng để tái hiện lỗi hoặc phát hành bản vá bảo mật khẩn cấp.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung cuốn album ảnh kỷ niệm của gia đình. Các trang ảnh cứ nối tiếp nhau tăng dần theo thời gian (chuỗi commit trên nhánh). `git tag` giống như một chiếc kẹp sách bằng đồng đẹp mắt bạn kẹp vào đúng trang ảnh \"Ngày cưới của bố mẹ\" hoặc \"Lễ tốt nghiệp đại học\". Dù cuốn album có thêm hàng trăm bức ảnh mới trong tương lai, mỗi khi cần tìm lại khoảnh khắc trọng đại đó, bạn chỉ cần mở đúng chiếc kẹp sách là thấy ngay.\n\n---\n\n## 🖼 Sơ đồ\n```text\nSự khác biệt giữa Branch và Tag:\nNhánh main: Di chuyển liên tục khi có commit mới!\nC1 ──► C2 ──► C3 ──► C4 (HEAD -> main)\n        ▲\n        └── [Tag: v1.0.0] (Đứng yên mãi mãi tại C2!)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nSau 3 tháng miệt mài lập trình, đội ngũ kỹ thuật quyết định đóng gói phát hành phiên bản đầu tiên của ứng dụng di động. Trưởng nhóm kiểm tra toàn bộ các bài test trên nhánh main đều chuyển màu xanh lá. Trưởng nhóm mở terminal và gõ câu lệnh: `git tag v1.0.0`. Một thẻ đánh dấu phiên bản được gắn ngay tại commit hiện tại. Trưởng nhóm đẩy thẻ lên máy chủ GitHub bằng lệnh `git push origin v1.0.0`. Trên giao diện GitHub, một mục Release mới xuất hiện với mã nguồn của phiên bản v1.0.0 sẵn sàng cho người dùng tải về.\n\n---\n\n## 💻 Command\n```bash\ngit tag\ngit tag <tên-thẻ>\ngit tag <tên-thẻ> <commit-hash>\ngit push origin <tên-thẻ>\ngit push origin --tags\ngit tag -d <tên-thẻ>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git tag`: Liệt kê danh sách toàn bộ các tag đang có trong kho lưu trữ theo thứ tự bảng chữ cái.\n- `git tag <tên>`: Tạo một thẻ nhẹ (Lightweight tag) tại commit HEAD hiện tại.\n- `git tag <tên> <hash>`: Đánh dấu thẻ cho một commit cụ thể trong quá khứ.\n- `git push origin <tên>`: Đẩy thẻ chỉ định lên máy chủ từ xa GitHub (mặc định git push không đẩy tag).\n- `git push origin --tags`: Đẩy đồng loạt toàn bộ các tag cục bộ lên máy chủ.\n- `git tag -d <tên>`: Xóa một thẻ trên máy tính cá nhân.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ rằng git push thông thường sẽ tự động đẩy tag**:  Git cố tình không đẩy tag khi gõ `git push`, bạn phải đẩy tường minh bằng tên tag hoặc cờ `--tags`.\n2. **Nhầm lẫn giữa tag và branch**:  Cố gắng chuyển sang tag và commit tiếp (sẽ rơi vào trạng thái Detached HEAD).\n3. **Đặt tên tag lộn xộn không tuân theo quy chuẩn Semantic Versioning (ví dụ đặt tag**:  `ban-moi`, `chuan-roi`).\n\n---\n\n## 🧪 Lab\n1. Liệt kê các tag hiện có bằng `git tag`.\n2. Tạo một thẻ phiên bản `v0.1.0` tại commit hiện tại bằng `git tag v0.1.0`.\n3. Kiểm tra lại danh sách tag để thấy `v0.1.0` xuất hiện.\n4. Thử xóa thẻ bằng lệnh `git tag -d v0.1.0` và kiểm tra lại.\n\n---\n\n## 💡 Hint\n> Nhớ rằng lệnh `git push` thông thường sẽ KHÔNG tự động đẩy tag lên server, bạn phải dùng `git push origin <tên-tag>`.\n\n---\n\n## ✅ Validation\n- Tạo, kiểm tra và quản lý thành công các thẻ phiên bản bằng git tag.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh đánh dấu mốc git tag.\n\n---\n\n## 🔥 Challenge\nTại sao việc gõ `git checkout v1.0.0` lại đưa con trỏ của bạn vào trạng thái \"Detached HEAD\"?\n\n---\n\n## 📚 Tổng kết\n- `git tag` đánh dấu các cột mốc phiên bản quan trọng trong lịch sử dự án.\n- Tag là con trỏ tĩnh bất biến gắn chặt vào commit, không di chuyển như branch.\n- Cần dùng `git push origin <tag-name>` hoặc `git push origin --tags` để xuất bản thẻ lên remote.\n",
  "quiz": {
    "id": "quiz-05-18-git-tag",
    "title": "Trắc nghiệm: git tag cơ bản",
    "questions": [
      {
        "id": "q1",
        "question": "Điểm khác biệt căn bản nhất giữa một con trỏ nhánh (Branch) và một con trỏ thẻ (Tag) là gì?",
        "type": "single",
        "options": [
          {
            "text": "Nhánh tự động di chuyển tiến lên khi có commit mới, còn Tag đứng yên vĩnh viễn tại commit được gắn",
            "correct": true
          },
          {
            "text": "Tag chỉ dùng được trên máy chủ GitHub, còn nhánh chỉ dùng trên máy cá nhân",
            "correct": false
          },
          {
            "text": "Tag tự động xóa sau 30 ngày, còn nhánh tồn tại mãi mãi",
            "correct": false
          },
          {
            "text": "Hai khái niệm này hoàn toàn giống hệt nhau không khác gì",
            "correct": false
          }
        ],
        "explanation": "Branch là con trỏ động di chuyển theo commit mới; Tag là con trỏ tĩnh cố định đóng vai trò mốc tham chiếu."
      },
      {
        "id": "q2",
        "question": "Khi bạn chạy câu lệnh `git push origin main`, các thẻ Tag mới tạo ở máy cục bộ có được tự động đẩy lên GitHub không?",
        "type": "single",
        "options": [
          {
            "text": "Không, theo mặc định Git không tự động đẩy tag lên server khi push nhánh",
            "correct": true
          },
          {
            "text": "Có, toàn bộ tag luôn được đẩy lên cùng lúc",
            "correct": false
          },
          {
            "text": "Chỉ đẩy lên nếu tag có chứa chữ \"release\"",
            "correct": false
          },
          {
            "text": "Chỉ đẩy lên vào ngày cuối tuần",
            "correct": false
          }
        ],
        "explanation": "Git bảo vệ tag; bạn phải chỉ định rõ `git push origin <tag>` hoặc `git push origin --tags` để đẩy lên server."
      },
      {
        "id": "q3",
        "question": "Lệnh nào sau đây dùng để đẩy đồng loạt TẤT CẢ các thẻ tag cục bộ lên máy chủ từ xa?",
        "type": "single",
        "options": [
          {
            "text": "git push origin --tags",
            "correct": true
          },
          {
            "text": "git push --all-tags-force",
            "correct": false
          },
          {
            "text": "git tag --push-all",
            "correct": false
          },
          {
            "text": "git upload tags",
            "correct": false
          }
        ],
        "explanation": "`git push origin --tags` đẩy toàn bộ các thẻ tag chưa có trên server lên kho lưu trữ từ xa."
      },
      {
        "id": "q4",
        "question": "Lệnh nào dùng để xóa một thẻ tag có tên `v1.0.0` ngay trên máy tính cá nhân của bạn?",
        "type": "single",
        "options": [
          {
            "text": "git tag -d v1.0.0",
            "correct": true
          },
          {
            "text": "git tag --remove v1.0.0",
            "correct": false
          },
          {
            "text": "git drop tag v1.0.0",
            "correct": false
          },
          {
            "text": "git delete v1.0.0",
            "correct": false
          }
        ],
        "explanation": "`git tag -d <tên-thẻ>` (hoặc `--delete`) xóa con trỏ thẻ chỉ định trên máy cục bộ."
      }
    ]
  }
};
export default lesson;
