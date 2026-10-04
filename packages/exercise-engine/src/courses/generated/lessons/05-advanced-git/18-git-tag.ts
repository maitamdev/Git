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
      "Hiểu tag là ref dùng để đặt tên cho một commit hoặc đối tượng Git.",
      "Phân biệt branch tự tiến khi commit mới được tạo trên đó với tag không tự di chuyển.",
      "Tạo và quản lý các thẻ Lightweight Tag (Thẻ nhẹ) nhanh chóng.",
      "Biết đẩy tag từ Git thật và xóa tag cục bộ khi không còn cần."
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
      "git tag -d <tên-thẻ>"
    ]
  },
  "content": "# git tag\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu tag là tên tham chiếu tới một đối tượng Git, thường dùng để đánh dấu phiên bản.\n- Phân biệt branch thường di chuyển khi có commit mới trên đó, còn tag không tự di chuyển.\n- Tạo và quản lý các thẻ Lightweight Tag (Thẻ nhẹ) nhanh chóng.\n- Biết cách đẩy/xóa tag từ xa trong Git thật và phân biệt với thao tác tag cục bộ.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Git Tag\n- **Nói dễ hiểu**: Tên tham chiếu tới một đối tượng Git, thường dùng để đánh dấu commit phiên bản.\n- **Ví dụ**: Dùng `git tag v1.0.0` để đánh dấu commit phát hành phiên bản 1.0.0 cho khách hàng.\n- **Đừng nhầm**: Tag không tự tiến lên khi có commit mới, nhưng vẫn có thể bị xóa hoặc di chuyển thủ công.\n\n### Lightweight Tag\n- **Nói dễ hiểu**: Loại thẻ đơn giản nhất trong Git, chỉ là một con trỏ trỏ trực tiếp đến mã hash của commit mà không chứa metadata riêng.\n- **Ví dụ**: Gõ `git tag v0.1.0-alpha` để tạo nhanh một thẻ nhẹ đánh dấu bản thử nghiệm nội bộ.\n- **Đừng nhầm**: Thẻ nhẹ không lưu tên tác giả, email, ngày tạo hay chữ ký số; nếu cần thông tin phát hành chính thức nên dùng Annotated Tag.\n\n### Push Tags (git push --tags)\n- **Nói dễ hiểu**: Lệnh đồng bộ các thẻ tag từ máy cá nhân lên kho lưu trữ từ xa trên máy chủ như GitHub hay GitLab.\n- **Ví dụ**: Chạy `git push origin v1.0.0` để đẩy riêng một thẻ, hoặc `git push origin --tags` để đẩy toàn bộ tag lên remote.\n- **Đừng nhầm**: Lệnh `git push` thông thường chỉ đẩy nhánh mà không tự động đẩy tag; bạn phải chỉ định rõ tên tag hoặc cờ `--tags`.\n\n---\n\n## 📖 Định nghĩa\n`git tag` tạo hoặc liệt kê tên tag trỏ tới commit hay đối tượng Git khác. Tag không tự tiến theo nhánh, nhưng vẫn có thể bị xóa hoặc force-update; vì vậy đừng xem nó là bất biến về mặt kỹ thuật.\n\n---\n\n## 🤔 Tại sao cần?\nKhách hàng và người dùng không thể nhớ các chuỗi commit hash phức tạp. `git tag` tạo ra những tên phiên bản rõ ràng, giúp đội ngũ dễ dàng kiểm tra lại chính xác trạng thái code của bản phát hành để tái hiện lỗi hoặc triển khai cập nhật.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung cuốn album ảnh gia đình. Các trang ảnh cứ dài thêm theo thời gian. `git tag` như chiếc kẹp sách bằng đồng bạn kẹp vào đúng trang ảnh \"Lễ tốt nghiệp\". Dù sau này có thêm hàng trăm bức ảnh mới, bạn chỉ cần mở đúng kẹp sách là tìm thấy ngay.\n\n---\n\n## 🖼 Sơ đồ\n```text\nSự khác biệt giữa Branch và Tag:\nNhánh main: Di chuyển liên tục mỗi khi có commit mới!\nC1 ──► C2 ──► C3 ──► C4 (HEAD -> main)\n        ▲\n        └── [Tag: v1.0.0] (không tự di chuyển; có thể được cập nhật thủ công)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nSau khi hoàn thành đợt kiểm thử cuối cùng, trưởng nhóm gõ `git tag v1.0.0` để gắn nhãn commit hiện tại. Trong Git thật, nhóm có thể đẩy tag bằng `git push origin v1.0.0`. Tạo GitHub Release là bước riêng, có thể làm thủ công hoặc qua automation của dự án.\n\n---\n\n## 💻 Command\n```bash\ngit tag\ngit tag <tên-thẻ>\ngit tag <tên-thẻ> <commit-hash>\ngit tag -d <tên-thẻ>\n```\n\nTrong Git thật, có thể đẩy tag cụ thể bằng `git push origin <tên-thẻ>` hoặc các tag bằng `git push origin --tags`. Simulator của khóa học chưa mô phỏng push tag.\n\n---\n\n## 🔍 Giải thích command\n- `git tag`: Liệt kê danh sách toàn bộ các tag đang có trong kho lưu trữ theo thứ tự bảng chữ cái.\n- `git tag <tên>`: Tạo một thẻ nhẹ (Lightweight tag) tại commit HEAD hiện tại.\n- `git tag <tên> <hash>`: Đánh dấu thẻ cho một commit cụ thể trong quá khứ.\n- `git push origin <tên>`: Đẩy thẻ chỉ định lên máy chủ từ xa GitHub (mặc định git push không đẩy tag).\n- `git push origin --tags`: Đẩy đồng loạt toàn bộ các tag cục bộ lên máy chủ.\n- `git tag -d <tên>`: Xóa một thẻ trên máy tính cá nhân.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Cho rằng `git push` luôn gửi mọi tag**: Hành vi phụ thuộc cấu hình và tùy chọn; khi cần, hãy đẩy rõ tên tag hoặc dùng `--tags` theo chính sách repo.\n2. **Nhầm lẫn giữa tag và branch**: Cố gắng chuyển sang tag và commit tiếp sẽ rơi vào trạng thái Detached HEAD.\n3. **Đặt tên tag tùy tiện**: Đặt tên tag lộn xộn không tuân theo chuẩn Semantic Versioning (như `ban-moi`, `chuan-roi`) gây khó khăn cho CI/CD.\n\n---\n\n## 🧪 Lab\nHãy cùng tôi mở terminal và thực hiện các bước thực hành trực quan sau:\n1. Liệt kê các tag hiện có trong kho chứa bài tập bằng `git tag`.\n2. Tạo thẻ thử nghiệm `demo-v0.1` tại commit hiện tại bằng `git tag demo-v0.1`.\n3. Kiểm tra lại danh sách tag để thấy `demo-v0.1` xuất hiện.\n4. Xóa thẻ thử nghiệm bằng `git tag -d demo-v0.1` và kiểm tra lại danh sách.\n\n---\n\n## 💡 Hint\n> Push tag tường minh bằng `git push origin <tên-tag>`; tạo GitHub Release là thao tác riêng.\n\n---\n\n## ✅ Validation\n- Tạo, kiểm tra và quản lý thành công các thẻ phiên bản bằng `git tag`.\n- Hiểu branch tiến theo commit mới; tag vẫn trỏ tới mục tiêu ban đầu cho đến khi ai đó thay đổi tag.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh đánh dấu mốc git tag.\n\n---\n\n## 🔥 Challenge\nTại sao việc gõ `git checkout v1.0.0` lại đưa con trỏ của bạn vào trạng thái \"Detached HEAD\"?\n\n---\n\n## 📚 Tổng kết\n- `git tag` tạo mốc tham chiếu không tự di chuyển theo commit mới trên branch.\n- Thẻ nhẹ (Lightweight tag) là con trỏ trực tiếp đến commit.\n- Phải dùng lệnh push tường minh hoặc `--tags` để đưa thẻ lên GitHub.\n",
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
            "text": "Nhánh thường tiến lên khi có commit mới trên nhánh đó; tag không tự tiến lên nhưng có thể được di chuyển thủ công",
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
        "explanation": "Branch được cập nhật khi commit mới được tạo trên nhánh. Tag là ref không tự cập nhật theo cách đó, nhưng người dùng vẫn có thể xóa hoặc tạo lại tag."
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
      },
      {
        "id": "q5",
        "question": "Câu lệnh nào sau đây dùng để tạo một thẻ tag nhẹ (lightweight tag) có tên `v1.0.0` trỏ vào commit hiện tại?",
        "type": "single",
        "options": [
          {
            "text": "git tag v1.0.0",
            "correct": true
          },
          {
            "text": "git create tag v1.0.0",
            "correct": false
          },
          {
            "text": "git make-tag v1.0.0",
            "correct": false
          },
          {
            "text": "git tag --new v1.0.0",
            "correct": false
          }
        ],
        "explanation": "`git tag <tên>` không kèm cờ `-a` sẽ tạo ra một Lightweight Tag trỏ trực tiếp đến commit HEAD hiện tại."
      }
    ]
  }
};
export default lesson;
