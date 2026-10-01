import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "19-annotated-tag",
  "moduleId": "05-advanced-git",
  "metadata": {
    "id": "19-annotated-tag",
    "title": "Annotated Tag",
    "level": "advanced",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "18-git-tag"
    ],
    "objectives": [
      "Phân biệt rõ ràng giữa Lightweight Tag (thẻ nhẹ) và Annotated Tag (thẻ chú giải đầy đủ).",
      "Tạo thẻ Annotated Tag chứa đầy đủ tên tác giả, email, ngày giờ và thông điệp phát hành bằng cờ `-a`.",
      "Kiểm tra thông tin chi tiết của một thẻ chú giải bằng câu lệnh `git show`.",
      "Biết nhiều dự án chọn annotated tag cho release; quy định cụ thể tùy repository."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "annotated tag",
      "the chu giai",
      "git tag -a",
      "gpg sign tag",
      "semantic release tag",
      "full tag object"
    ],
    "commands": [
      "git tag -a <tên-thẻ> -m \"<thông-điệp-phát-hành>\"",
      "git show <tên-thẻ>"
    ]
  },
  "content": "# Annotated Tag\n\n---\n\n## 🎯 Mục tiêu\n- Phân biệt rõ ràng giữa Lightweight Tag (thẻ nhẹ) và Annotated Tag (thẻ chú giải đầy đủ).\n- Tạo thẻ Annotated Tag chứa đầy đủ tên tác giả, email, ngày giờ và thông điệp phát hành bằng cờ `-a`.\n- Kiểm tra thông tin chi tiết của một thẻ chú giải bằng câu lệnh `git show`.\n- Biết annotated tag lưu tagger và thông điệp; nhiều dự án dùng loại này cho release, nhưng quy định tùy nhóm.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Annotated Tag (git tag -a)\n- **Nói dễ hiểu**: Đối tượng thẻ riêng trong Git, lưu người tạo thẻ, email, ngày tạo và thông điệp. Chữ ký số chỉ có nếu dùng tùy chọn ký.\n- **Ví dụ**: Dùng `git tag -a v2.0.0 -m \"Release version 2.0.0\"` để gắn thẻ phiên bản phát hành chính thức cho sản phẩm.\n- **Đừng nhầm**: Khác với thẻ nhẹ chỉ là con trỏ mã hash, thẻ chú giải tạo ra một Git object độc lập với mã băm SHA-1 riêng.\n\n### Tagger Metadata\n- **Nói dễ hiểu**: Thông tin ghi ai tạo thẻ, địa chỉ email và thời điểm tạo. Đây là thông tin nhận dạng, không tự nó chứng minh người đó đã được xác thực.\n- **Ví dụ**: Chạy `git show v2.0.0` để xem dòng `Tagger: John Doe <john@company.com>` cùng ngày tạo.\n- **Đừng nhầm**: Tagger (người gắn thẻ phiên bản) có thể khác với Author (tác giả viết commit ban đầu).\n\n### GPG Signed Tag (git tag -s)\n- **Nói dễ hiểu**: Thẻ chú giải có chữ ký số tạo bằng khóa đã cấu hình. Người nhận có thể kiểm tra chữ ký và khóa công khai tương ứng.\n- **Ví dụ**: Trong repo Git thật đã cấu hình khóa ký, chạy `git tag -s v2.1.0 -m \"Signed release\"`, rồi xác minh chữ ký theo quy trình của nhóm.\n- **Đừng nhầm**: Cần cài đặt và thiết lập khóa bí mật GPG trên máy trước khi sử dụng cờ `-s`.\n\n---\n\n## 📖 Định nghĩa\nAnnotated Tag (thẻ có chú giải) là object riêng chứa tagger, ngày giờ và thông điệp; chữ ký số chỉ có khi tạo tag có ký như `git tag -s` và đã cấu hình khóa phù hợp.\n\n---\n\n## 💡 Tại sao cần\nKhi phát hành, nhóm có thể dùng annotated tag để lưu người tạo thẻ, thời điểm và ghi chú phiên bản. Tag hỗ trợ truy xuất nguồn gốc; muốn xác minh danh tính bằng mật mã thì cần tag có chữ ký và kiểm tra chữ ký theo chính sách của nhóm.\n\n---\n\n## 🧠 Mental Model\nLightweight tag giống một dấu trang trỏ tới commit. Annotated tag giống một thẻ ghi chú riêng: nó trỏ tới đối tượng Git và kèm người tạo, ngày cùng thông điệp. Chỉ tag được ký mới có chữ ký số để xác minh.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nCấu trúc đối tượng của Annotated Tag trong Git:\n┌────────────────────────────────────────────────────────┐\n│ Tag Object (Mã băm SHA-1 độc lập)                      │\n│ Tagger: Nguyen Van A <a@company.com>                   │\n│ Date:   (thời điểm tạo tag)                            │\n│ Message: Release version 2.0.0 with AI chatbot engine  │\n│ GPG Signature: (chỉ có nếu tag được ký)                │\n│ Object trỏ tới: Commit C10 (hash 8f9e0a)              │\n└────────────────────────────────────────────────────────┘\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nTrước khi phát hành cổng thanh toán, kỹ sư trưởng An tạo tag chú giải bằng `git tag -a v2.0.0 -m \"Release v2.0.0: Full payment integration\"`. Khi nhóm kiểm tra bằng `git show v2.0.0`, người tạo tag, ngày và thông điệp hiển thị cùng thông tin commit được gắn. Metadata mô tả người tạo nhưng không tự xác minh danh tính.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit tag -a <tên-thẻ> -m \"<thông-điệp-phát-hành>\"\ngit show <tên-thẻ>\n```\n\n`git tag -s` tạo tag có chữ ký trong Git thật nếu máy đã cấu hình backend và khóa ký; simulator của khóa học hiện không hỗ trợ ký tag.\n\n---\n\n## 🔍 Giải thích command\n- `git tag -a <tên> -m \"<msg>\"`: Tạo thẻ chú giải với thông điệp phát hành trực tiếp trên dòng lệnh.\n- `git tag -s <tên> -m \"<msg>\"`: Tạo thẻ chú giải có ký số bảo mật bằng khóa GPG bí mật của lập trình viên.\n- `git show <tên-thẻ>`: Hiển thị toàn bộ siêu dữ liệu của thẻ cùng với diff của commit mà thẻ đang trỏ tới.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Cho rằng mọi dự án đều bắt buộc dùng annotated tag**: Nhiều dự án ưu tiên loại này cho release, nhưng hãy theo quy ước của repo.\n2. **Cho rằng `-a` tự ký số tag**: `-a` tạo annotated tag không ký; `-s` yêu cầu khóa ký đã cấu hình.\n3. **Hiểu nhầm về kích thước**: Annotated tag chỉ là một object nhỏ vài trăm bytes trong thư mục `.git`, hoàn toàn không ảnh hưởng tới hiệu năng dự án.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.\n1. Trong kho thử nghiệm đã có ít nhất một commit, tạo tag `demo-v0.1` bằng `git tag -a demo-v0.1 -m \"Ban thu nghiem\"`.\n2. Chạy `git show demo-v0.1`; xác định dòng tagger, ngày và thông điệp.\n3. Tạo tag nhẹ `demo-light` bằng `git tag demo-light`, rồi so sánh `git show demo-light` với annotated tag.\n4. Xóa từng tag thử nghiệm bằng `git tag -d demo-v0.1`, rồi `git tag -d demo-light`. Việc push lên GitHub cần remote và quyền ghi; simulator chưa hỗ trợ.\n\n---\n\n## 💡 Hint & mẹo\n> Kiểm tra quy ước phát hành của repo. Nhiều dự án dùng annotated tag cho release; nếu cần xác minh danh tính bằng mật mã, hãy tìm hiểu quy trình tag ký số của nhóm.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Tạo thành công Annotated tag có đầy đủ metadata và kiểm tra chi tiết bằng `git show`.\n- Phân biệt tag nhẹ trỏ thẳng tới đối tượng với annotated tag có object chứa metadata.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài kiểm tra trắc nghiệm dưới đây về thẻ chú giải Annotated Tag.\n\n---\n\n## 🚀 Thử thách nâng cao\nNêu sự khác biệt sâu bên trong thư mục `.git/refs/tags/` và `.git/objects/` giữa một Lightweight tag và một Annotated tag.\n\n---\n\n## 📝 Tổng kết\n- Annotated Tag là một đối tượng Git thực thụ chứa đầy đủ metadata và thông điệp.\n- Giúp truy vết kiểm toán rõ ràng ai là người tạo thẻ và vào thời điểm nào.\n- Dùng `git show <tag>` để xem toàn bộ thông tin chi tiết của thẻ chú giải.\n",
  "quiz": {
    "id": "quiz-05-19-annotated-tag",
    "title": "Trắc nghiệm: Annotated Tag",
    "questions": [
      {
        "id": "q1",
        "question": "Cờ tùy chọn nào trong lệnh `git tag` được sử dụng để tạo một thẻ chú giải Annotated Tag?",
        "type": "single",
        "options": [
          {
            "text": "-a (viết tắt của --annotate)",
            "correct": true
          },
          {
            "text": "-l (viết tắt của --lightweight)",
            "correct": false
          },
          {
            "text": "-m (chỉ có duy nhất -m là đủ)",
            "correct": false
          },
          {
            "text": "-f (viết tắt của --full)",
            "correct": false
          }
        ],
        "explanation": "Cờ `-a` chỉ thị cho Git tạo một đối tượng tag đầy đủ (Annotated tag) trong cơ sở dữ liệu."
      },
      {
        "id": "q2",
        "question": "Thông tin nào sau đây được lưu trong Annotated Tag nhưng Lightweight Tag không có?",
        "type": "single",
        "options": [
          {
            "text": "Người tạo thẻ, email, thời gian tạo và thông điệp; chữ ký số chỉ có nếu tag được ký",
            "correct": true
          },
          {
            "text": "Mã commit hash mà thẻ trỏ tới",
            "correct": false
          },
          {
            "text": "Tên của thẻ tag",
            "correct": false
          },
          {
            "text": "Không có thông tin nào khác biệt",
            "correct": false
          }
        ],
        "explanation": "Lightweight tag chỉ là một con trỏ lưu mã hash; Annotated tag là đối tượng lưu đầy đủ metadata tác giả và thông điệp."
      },
      {
        "id": "q3",
        "question": "Lệnh nào sau đây dùng để xem chi tiết toàn bộ siêu dữ liệu (metadata) và thông điệp của một Annotated Tag?",
        "type": "single",
        "options": [
          {
            "text": "git show <tên-thẻ>",
            "correct": true
          },
          {
            "text": "git tag --info <tên-thẻ>",
            "correct": false
          },
          {
            "text": "git view <tên-thẻ>",
            "correct": false
          },
          {
            "text": "git inspect-tag <tên-thẻ>",
            "correct": false
          }
        ],
        "explanation": "`git show <tag-name>` in ra thông tin chi tiết về Tagger, Date, Message và diff của commit được gắn thẻ."
      },
      {
        "id": "q4",
        "question": "Vì sao nhiều dự án dùng Annotated Tag cho bản phát hành?",
        "type": "single",
        "options": [
          {
            "text": "Để lưu người tạo thẻ, thời điểm và thông điệp phát hành; quy ước cụ thể tùy dự án",
            "correct": true
          },
          {
            "text": "Vì Lightweight tag sẽ tự động bị xóa sau 24 giờ",
            "correct": false
          },
          {
            "text": "Vì nếu không dùng cờ -a thì mã nguồn sẽ bị lỗi biên dịch",
            "correct": false
          },
          {
            "text": "Vì GitHub không cho phép hiển thị Lightweight tag",
            "correct": false
          }
        ],
        "explanation": "Metadata giúp đọc lại ai tạo tag, lúc nào và ghi chú gì; nó không tự xác minh danh tính như chữ ký số."
      },
      {
        "id": "q5",
        "question": "Cú pháp chuẩn nào sau đây dùng để tạo một Annotated Tag `v2.0.0` với thông điệp phát hành \"Release version 2.0.0\"?",
        "type": "single",
        "options": [
          {
            "text": "git tag -a v2.0.0 -m \"Release version 2.0.0\"",
            "correct": true
          },
          {
            "text": "git tag -m \"Release version 2.0.0\" v2.0.0",
            "correct": false
          },
          {
            "text": "git annotated-tag v2.0.0 \"Release version 2.0.0\"",
            "correct": false
          },
          {
            "text": "git tag --create v2.0.0 --note \"Release version 2.0.0\"",
            "correct": false
          }
        ],
        "explanation": "Cú pháp chuẩn để tạo Annotated Tag với thông điệp kèm theo là `git tag -a <tên-thẻ> -m \"<thông-điệp>\"`. Cờ `-a` báo hiệu tạo thẻ chú giải."
      }
    ]
  }
};
export default lesson;
