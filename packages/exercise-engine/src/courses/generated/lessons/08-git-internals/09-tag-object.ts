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
      "Kiểm tra annotated tag; hiểu cách ký và xác minh chữ ký khi repository đã cấu hình khóa tin cậy."
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
      "git cat-file -p v1.0.0",
      "git cat-file -t v1.0.0"
    ]
  },
  "content": "# Đối tượng Tag: Đánh dấu phiên bản có chú thích (Annotated Tag)\n\n---\n\n## 🎯 Mục tiêu\n- Phân biệt rõ ràng giữa Lightweight Tag (thẻ rút gọn) và Annotated Tag (thẻ có chú thích lưu thành đối tượng riêng).\n- Khám phá cấu trúc của đối tượng Tag trong cơ sở dữ liệu: object trỏ tới, type, tag name, tagger và message.\n- Kiểm tra object của annotated tag và hiểu rằng chữ ký chỉ có khi tag được ký.\n- Hiểu `refs/tags/` là namespace logic; Git có thể lưu refs ở dạng file rời hoặc trong kho refs khác.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Annotated Tag Object\n- **Nói dễ hiểu**: Object riêng chứa object đích, tagger (nếu có), thông điệp và có thể có chữ ký nếu tag được ký.\n- **Ví dụ**: Tạo bằng lệnh `git tag -a v1.0.0 -m \"Release v1.0.0\"` sinh ra mã băm đối tượng riêng trong database.\n- **Đừng nhầm**: `git tag -a` không tự ký tag. Thông tin tagger không tự chứng minh người đó được tổ chức ủy quyền.\n\n### Lightweight Tag Reference\n- **Nói dễ hiểu**: Lightweight tag là ref trỏ thẳng tới object đích, không tạo tag object riêng.\n- **Ví dụ**: Tạo bằng lệnh `git tag v1.0.0-draft` chỉ đóng vai trò như một nhãn bookmark tạm thời.\n- **Đừng nhầm**: `git cat-file -t` trả loại của object đích; với tag được tạo mặc định trên commit, kết quả là `commit`.\n\n### Tagger Metadata\n- **Nói dễ hiểu**: Trường dữ liệu ghi lại danh tính người tạo thẻ và dấu thời gian thực hiện gắn thẻ phiên bản.\n- **Ví dụ**: Dòng `tagger Le Hoang Nam <nam@company.com> 1769817600 +0700` bên trong đối tượng Tag.\n- **Đừng nhầm**: Có thể khác với author của commit; một commit cũ nhiều tháng trước có thể được một release manager gắn tag phát hành vào ngày hôm nay.\n\n---\n\n## 📖 Định nghĩa\nLightweight tag là ref trỏ trực tiếp tới object; annotated tag tạo thêm tag object chứa object đích, tagger, thời gian và thông điệp. Có thể ký annotated tag bằng `-s` nếu đã cấu hình khóa ký; chữ ký cần được xác minh và khóa tin cậy riêng. Namespace `refs/tags/` là cách gọi logic; refs không nhất thiết nằm thành file riêng trong `.git/refs/tags/`.\n\n---\n\n## 💡 Tại sao cần\nAnnotated tag phù hợp khi cần lưu thông điệp và thông tin tagger cho một mốc phát hành; có thể ký tag để người nhận kiểm tra chữ ký. Tag object không tự đảm bảo tag ref sẽ không bị đổi/xóa, và chữ ký chỉ có ý nghĩa khi người xác minh tin cậy đúng khóa ký.\n\n---\n\n## 🧠 Mental Model\nHãy so sánh lightweight tag với một nhãn đánh dấu đơn giản, còn annotated tag như một thẻ phát hành có mô tả người tạo và thông điệp. Nếu ký annotated tag, chữ ký cho phép kiểm tra object đã ký và khóa ký; tag vẫn có thể bị xóa hoặc di chuyển nếu người dùng có quyền thay đổi refs.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nSo sánh Lightweight Tag vs Annotated Tag:\n1. Lightweight Tag: (Không tạo đối tượng trong objects/)\n   refs/tags/v1.0-light ──► [Commit Object]\n\n2. Annotated Tag: (Tạo hẳn một Tag Object độc lập)\n   refs/tags/v1.0.0 ──► [Tag Object]\n                              │\n                              ├── object: 7a8b9c4d (Trỏ tới Commit)\n                              ├── type: commit\n                              ├── tag: v1.0.0\n                              ├── tagger: Tran Van B <b@dev.com>\n                              └── message: Release version 1.0.0\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nNhóm phát hành tạo tag bằng `git tag -a v2.0.0 -m \"Release v2.0.0\"`. `git cat-file -t v2.0.0` cho biết ref trỏ tới object loại `tag`; `git cat-file -p v2.0.0` hiển thị object đích, tagger và message. Nếu cần xác minh chữ ký, tag phải được ký trước đó và kiểm tra bằng `git tag -v v2.0.0`.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\n# Tạo Annotated Tag có message (chưa ký)\ngit tag -a v1.0.0 -m \"Release version 1.0.0\"\n\n# Tạo Lightweight Tag tạm thời\ngit tag v1.0.0-temp\n\n# Kiểm tra loại đối tượng của cả hai thẻ\ngit cat-file -t v1.0.0       # Trả về: tag\ngit cat-file -t v1.0.0-temp  # Trả về: commit\n\n# Xem nội dung chi tiết của đối tượng Annotated Tag\ngit cat-file -p v1.0.0\n```\n\n---\n\n## 🔍 Giải thích command\n- `git tag -a <name> -m <msg>`: Tạo tag object và ref trong namespace `refs/tags/`; vị trí lưu vật lý phụ thuộc backend refs.\n- `git cat-file -t v1.0.0`: Trả về chữ `tag` vì đây là đối tượng độc lập.\n- `git cat-file -t v1.0.0-temp`: Trả về chữ `commit` vì lightweight tag trỏ thẳng vào commit mà không qua đối tượng trung gian.\n- `git cat-file -p v1.0.0`: Hiển thị trường `object`, `type`, `tag`, `tagger` và thông điệp phát hành.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Dùng Lightweight Tag cho bản phát hành chính thức**: Làm mất thông tin người phát hành và thông điệp ghi chú release.\n2. **Nghĩ rằng Tag chỉ có thể trỏ vào Commit**: Về mặt cấu trúc Git internals, một đối tượng Tag có thể trỏ tới bất kỳ đối tượng nào (kể cả Blob hay Tree).\n3. **Cho rằng xóa tag local sẽ xóa tag trên remote**: Mỗi repository có refs riêng; thao tác remote cần lệnh riêng và quyền phù hợp.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. Trong repository thực hành, tạo lightweight tag `internals-demo-light` trỏ tới HEAD.\n2. Tạo annotated tag `internals-demo-annotated` bằng `git tag -a internals-demo-annotated -m \"Demo tag object\" HEAD`.\n3. So sánh `git cat-file -t internals-demo-light` và `git cat-file -t internals-demo-annotated`, rồi đọc nội dung annotated object bằng `git cat-file -p internals-demo-annotated`.\n4. Dọn hai tag thử bằng `git tag -d internals-demo-light internals-demo-annotated`. Không push tag thử lên remote.\n\n---\n\n## 💡 Hint & mẹo\n> Annotated tag thường phù hợp cho mốc phát hành cần message/tagger. Dùng `-s` nếu cần ký và đã cấu hình khóa cùng backend ký; sau đó xác minh bằng `git tag -v`.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Lệnh `git cat-file -t v1.0.0` hiển thị chính xác chữ `tag`.\n- `git cat-file -p internals-demo-annotated` hiển thị object đích, tagger và message; lệnh `git tag -v` chỉ có ý nghĩa với tag đã ký.\n\n---\n\n## ❓ Quiz nhanh\nCùng làm bài kiểm tra về bản chất của đối tượng Tag trong Git trong phần trắc nghiệm bên dưới.\n\n---\n\n## 🚀 Thử thách nâng cao\nTạo và kiểm tra một signed annotated tag bằng `git tag -s` và `git tag -v`. Nêu điều kiện cần để người nhận tin cậy chữ ký.\n\n---\n\n## 📝 Tổng kết\n- Lightweight Tag chỉ là một con trỏ văn bản đơn giản trỏ trực tiếp tới một commit.\n- Annotated Tag tạo ra một đối tượng Tag độc lập trong Object Database với đầy đủ metadata và thông điệp.\n- Annotated tag thường hữu ích cho release; ký tag là lựa chọn riêng cần khóa tin cậy.\n- `refs/tags/` là namespace logic; refs có thể được lưu riêng, packed hoặc bằng backend khác.\n",
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
            "text": "git tag -a v1.0.0 -m 'Release version 1.0.0'",
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
        "explanation": "Cờ -a (annotated) kết hợp với -m (message) báo cho Git tạo ra một đối tượng Tag chính thức trong Object Store."
      },
      {
        "id": "q2",
        "question": "Khi bạn chạy lệnh git cat-file -t đối với một Lightweight Tag, Git sẽ trả về loại đối tượng nào?",
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
        "explanation": "Vì Lightweight Tag không có đối tượng Tag riêng mà trỏ thẳng tới commit, nên loại đối tượng trả về là commit."
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
        "explanation": "Annotated tag lưu target, tên tag, tagger và message; chữ ký chỉ có khi tạo tag đã ký và không tự chứng minh vai trò tổ chức."
      },
      {
        "id": "q4",
        "question": "Namespace logic nào được dùng cho các ref của tag?",
        "type": "single",
        "options": [
          {
            "text": "refs/tags/",
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
        "explanation": "Tag refs thuộc namespace `refs/tags/`; Git có thể lưu refs riêng, packed hoặc bằng backend khác nên không nên giả định luôn có file riêng."
      },
      {
        "id": "q5",
        "question": "Ngoài đối tượng Commit, đối tượng Tag trong Git có thể trỏ trực tiếp tới loại đối tượng nào khác?",
        "type": "single",
        "options": [
          {
            "text": "Bất kỳ loại đối tượng nào trong Git (Tree, Blob, hoặc thậm chí một Tag khác)",
            "correct": true
          },
          {
            "text": "Chỉ duy nhất con trỏ HEAD",
            "correct": false
          },
          {
            "text": "Chỉ các tệp tin có đuôi .zip",
            "correct": false
          },
          {
            "text": "Không thể trỏ tới đối tượng nào khác ngoài Commit",
            "correct": false
          }
        ],
        "explanation": "Trường object của tag object có thể trỏ tới blob, tree, commit hoặc tag; object ID được tính theo hash format của repo."
      }
    ]
  }
};
export default lesson;
