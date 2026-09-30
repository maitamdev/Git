import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "09-tag-object",
  "moduleId": "08-git-internals",
  "metadata": {
    "id": "09-tag-object",
    "title": "Đối tượng Tag: Đánh dấu phiên bản có chú thích (Annotated Tag)",
    "level": "advanced",
    "duration": 30,
    "xp": 90,
    "prerequisites": [
      "08-commit-object"
    ],
    "objectives": [
      "Phân biệt rõ ràng giữa Lightweight Tag (thẻ rút gọn) và Annotated Tag (thẻ có chú thích lưu thành đối tượng riêng).",
      "Khám phá cấu trúc của đối tượng Tag trong cơ sở dữ liệu: object trỏ tới, type, tag name, tagger và message.",
      "Sử dụng các lệnh plumbing để kiểm tra tính toàn vẹn và chữ ký số GPG gắn trên đối tượng Tag."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "tag object",
      "annotated tag",
      "lightweight tag",
      "release milestone",
      "gpg signature"
    ],
    "commands": [
      "git tag -a v1.0.0 -m \"Release version 1.0.0\"",
      "git cat-file -p refs/tags/v1.0.0",
      "git cat-file -t v1.0.0"
    ]
  },
  "content": "# Đối tượng Tag: Đánh dấu phiên bản có chú thích (Annotated Tag)\n\n---\n\n## 🎯 Mục tiêu bài học\n- Phân biệt rõ ràng giữa Lightweight Tag (thẻ rút gọn) và Annotated Tag (thẻ có chú thích lưu thành đối tượng riêng).\n- Khám phá cấu trúc của đối tượng Tag trong cơ sở dữ liệu: object trỏ tới, type, tag name, tagger và message.\n- Sử dụng các lệnh plumbing để kiểm tra tính toàn vẹn và chữ ký số GPG gắn trên đối tượng Tag.\n\n---\n\n## 📖 Định nghĩa\n> Trong Git, có hai loại Tag: Lightweight Tag (chỉ là một con trỏ tham chiếu đơn giản ghi thẳng mã băm của commit vào một tệp văn bản trong `.git/refs/tags/`) và Annotated Tag (được lưu trữ như một Đối tượng Tag chính thức trong Object Database). Đối tượng Tag chứa một con trỏ trỏ tới đối tượng mục tiêu (thường là commit, nhưng có thể là tree hoặc blob), tên thẻ phiên bản, thông tin người gắn thẻ (Tagger), dấu thời gian và thông điệp chú thích phát hành.\n\n---\n\n## 🤔 Tại sao cần?\nKhi đánh dấu một cột mốc phát hành phiên bản phần mềm quan trọng (như v1.0.0 hay v2.4.0), bạn cần lưu giữ vĩnh viễn ai là người phê duyệt phát hành phiên bản đó, vào thời gian nào, cùng với ghi chú phát hành (Release Notes) chi tiết và chữ ký số mã hóa chống giả mạo. Annotated Tag cung cấp đầy đủ các thuộc tính này như một đối tượng bất biến độc lập trong cơ sở dữ liệu, đảm bảo bằng chứng xác thực không thể bị chối bỏ.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy so sánh việc dán một mẩu giấy nhớ tạm thời màu vàng lên bìa cuốn sách (Lightweight Tag: chỉ ghi tên người đọc rồi dán tạm thời lên bìa) với việc đóng một con dấu sáp niêm phong hoàng gia chính thức có khắc chữ ký, gia huy và ngày tháng của đức vua lên văn kiện quốc gia (Annotated Tag: một thực thể trang trọng vĩnh viễn không thể làm giả, được lưu trữ thành một đối tượng độc lập có giá trị pháp lý trong lịch sử).\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nSo sánh Lightweight Tag vs Annotated Tag:\n1. Lightweight Tag: (Không tạo đối tượng trong objects/)\n   .git/refs/tags/v1.0-light ──► [Commit Object: 7a8b9c4d]\n\n2. Annotated Tag: (Tạo hẳn một Tag Object độc lập)\n   .git/refs/tags/v1.0.0 ──► [Tag Object: e1f2a3b4]\n                              │\n                              ├── object: 7a8b9c4d (Trỏ tới Commit)\n                              ├── type: commit\n                              ├── tag: v1.0.0\n                              ├── tagger: Tran Van B <b@dev.com>\n                              └── message: Release version 1.0.0\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nNhóm phát hành chuẩn bị tung ra phiên bản thương mại `v2.0.0`. Kỹ sư trưởng chạy lệnh: `git tag -a v2.0.0 -m \"Official Production Release 2.0.0\"`. Khi kiểm tra trong thư mục `.git/refs/tags/v2.0.0`, tệp tin này không trỏ thẳng vào commit, mà trỏ tới một mã băm đối tượng mới `9d8c7b6a`. Kỹ sư chạy `git cat-file -p 9d8c7b6a` và thấy một bảng dữ liệu trang trọng: dòng 1 trỏ tới commit phát hành; dòng 2 ghi type commit; dòng 3 ghi tag v2.0.0; dòng 4 ghi thông tin tagger kèm thời gian; và cuối cùng là thông điệp phát hành chính thức. Đây là bằng chứng không thể chối cãi về cột mốc lịch sử của sản phẩm.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\ngit tag -a v1.0.0 -m \"Release version 1.0.0\"\ngit cat-file -p refs/tags/v1.0.0\ngit cat-file -t v1.0.0\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nLệnh git tag -a tạo một đối tượng Annotated Tag hoàn chỉnh kèm theo thông điệp ghi chú phát hành. Lệnh git cat-file -t in ra định danh loại đối tượng là tag, và git cat-file -p giải mã chi tiết toàn bộ nội dung của đối tượng Tag bao gồm commit mục tiêu, tagger và ngày giờ tạo lập.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Sử dụng nhầm Lightweight Tag (`git tag v1.0.0`) khi muốn tạo bản phát hành chính thức (phải dùng cờ `-a` để tạo Annotated Tag).**: \n2. **Nghĩ rằng Tag chỉ có thể trỏ tới Commit**:  Trong tầng sâu Git, một Tag Object có thể trỏ tới bất kỳ đối tượng nào, kể cả Blob hoặc Tree.\n3. **Xóa thẻ tag cục bộ nhưng quên đẩy lệnh xóa lên remote server khiến tag bị đồng bộ ngược trở lại.**: \n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Tạo một Lightweight Tag bằng lệnh `git tag v0.1-beta`.\n2. Tạo một Annotated Tag bằng lệnh `git tag -a v1.0.0 -m \"Release 1.0\"`.\n3. Sử dụng `git cat-file -t` trên cả hai thẻ để quan sát: một bên là `commit`, một bên là `tag`.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Luôn luôn sử dụng cờ `-a` kèm theo thông điệp `-m` khi gắn thẻ phiên bản phát hành phần mềm.\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nPhân biệt chính xác giữa một tham chiếu trỏ thẳng commit và một tham chiếu trỏ qua đối tượng Tag.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nCùng làm bài kiểm tra về bản chất của đối tượng Tag trong Git.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nLàm thế nào để gắn chữ ký số mật mã học GPG vào một Annotated Tag bằng lệnh git tag -s để chứng minh tính xác thực nguồn gốc?\n\n---\n\n## 📚 Tổng kết kiến thức\n- Lightweight Tag chỉ là một con trỏ văn bản đơn giản trỏ trực tiếp tới một commit.\n- Annotated Tag tạo ra một đối tượng Tag độc lập trong Object Database với đầy đủ metadata và thông điệp.\n- Annotated Tag là tiêu chuẩn bắt buộc cho các cột mốc phát hành phiên bản phần mềm chuyên nghiệp.\n",
  "quiz": {
    "id": "quiz-08-git-internals-09-tag-object",
    "title": "Trắc nghiệm: Đối tượng Tag: Đánh dấu phiên bản có chú thích (Annotated Tag)",
    "questions": [
      {
        "id": "q1",
        "question": "Lệnh nào sau đây dùng để tạo một Annotated Tag (thẻ có chú thích lưu thành đối tượng riêng)?",
        "type": "single",
        "options": [
          {
            "text": "git tag -a v1.0.0 -m \"Release version 1.0.0\"",
            "correct": true
          },
          {
            "text": "git tag v1.0.0",
            "correct": false
          },
          {
            "text": "git create-tag v1.0.0",
            "correct": false
          },
          {
            "text": "git tag --fast v1.0.0",
            "correct": false
          }
        ],
        "explanation": "Cờ `-a` (annotated) kết hợp với `-m` (message) báo cho Git tạo ra một đối tượng Tag chính thức trong Object Store."
      },
      {
        "id": "q2",
        "question": "Khi bạn chạy lệnh `git cat-file -t` đối với một Lightweight Tag, Git sẽ trả về loại đối tượng nào?",
        "type": "single",
        "options": [
          {
            "text": "commit",
            "correct": true
          },
          {
            "text": "tag",
            "correct": false
          },
          {
            "text": "blob",
            "correct": false
          },
          {
            "text": "lightweight",
            "correct": false
          }
        ],
        "explanation": "Vì Lightweight Tag không có đối tượng Tag riêng mà trỏ thẳng tới commit, nên loại đối tượng trả về là `commit`."
      },
      {
        "id": "q3",
        "question": "Một đối tượng Tag hoàn chỉnh (Annotated Tag) chứa những thông tin cốt lõi nào?",
        "type": "single",
        "options": [
          {
            "text": "Đối tượng được trỏ tới (object), loại đối tượng (type), tên thẻ (tag), người gắn thẻ (tagger), và thông điệp",
            "correct": true
          },
          {
            "text": "Toàn bộ mã nguồn của dự án được nén lại",
            "correct": false
          },
          {
            "text": "Mật khẩu tài khoản GitHub của người quản trị",
            "correct": false
          },
          {
            "text": "Danh sách các bug còn tồn đọng",
            "correct": false
          }
        ],
        "explanation": "Đối tượng Tag lưu trữ thông tin kiểm toán hoàn chỉnh về việc ai gắn thẻ, gắn vào đối tượng nào và vào thời điểm nào."
      },
      {
        "id": "q4",
        "question": "Các con trỏ Tag được lưu trữ vật lý ở đường dẫn nào trong thư mục .git/?",
        "type": "single",
        "options": [
          {
            "text": ".git/refs/tags/",
            "correct": true
          },
          {
            "text": ".git/objects/tags/",
            "correct": false
          },
          {
            "text": ".git/tags_list/",
            "correct": false
          },
          {
            "text": ".git/branches/tags/",
            "correct": false
          }
        ],
        "explanation": "Mọi con trỏ thẻ phiên bản đều nằm trong thư mục tham chiếu `.git/refs/tags/`."
      }
    ]
  }
};
export default lesson;
