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
      "Hiểu rõ vì sao các bản phát hành sản phẩm chính thức (Production Releases) luôn bắt buộc dùng Annotated Tag."
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
      "git tag -s <tên-thẻ> -m \"<thông-điệp>\"",
      "git show <tên-thẻ>"
    ]
  },
  "content": "# Annotated Tag\n\n---\n\n## 🎯 Mục tiêu\n- Phân biệt rõ ràng giữa Lightweight Tag (thẻ nhẹ) và Annotated Tag (thẻ chú giải đầy đủ).\n- Tạo thẻ Annotated Tag chứa đầy đủ tên tác giả, email, ngày giờ và thông điệp phát hành bằng cờ `-a`.\n- Kiểm tra thông tin chi tiết của một thẻ chú giải bằng câu lệnh `git show`.\n- Hiểu rõ vì sao các bản phát hành sản phẩm chính thức (Production Releases) luôn bắt buộc dùng Annotated Tag.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Annotated Tag (git tag -a)\n- **Nói dễ hiểu**: Đối tượng thẻ đầy đủ trong Git, lưu trữ riêng tên tác giả, email, ngày tạo, thông điệp phát hành và chữ ký số.\n- **Ví dụ**: Dùng `git tag -a v2.0.0 -m \"Release version 2.0.0\"` để gắn thẻ phiên bản phát hành chính thức cho sản phẩm.\n- **Đừng nhầm**: Khác với thẻ nhẹ chỉ là con trỏ mã hash, thẻ chú giải tạo ra một Git object độc lập với mã băm SHA-1 riêng.\n\n### Tagger Metadata\n- **Nói dễ hiểu**: Phần siêu dữ liệu chứng thực ghi rõ ai là người tạo thẻ, địa chỉ email và thời điểm chính xác tính đến từng giây.\n- **Ví dụ**: Chạy `git show v2.0.0` để xem dòng `Tagger: John Doe <john@company.com>` và ngày giờ ký duyệt.\n- **Đừng nhầm**: Tagger (người gắn thẻ phiên bản) có thể khác với Author (tác giả viết commit ban đầu).\n\n### GPG Signed Tag (git tag -s)\n- **Nói dễ hiểu**: Thẻ chú giải được mã hóa và ký bằng chữ ký số GPG cá nhân để chống giả mạo danh tính tác giả.\n- **Ví dụ**: Gõ `git tag -s v2.1.0 -m \"Verified release\"` để bảo đảm phiên bản tải về thực sự được ký bởi trưởng nhóm.\n- **Đừng nhầm**: Cần cài đặt và thiết lập khóa bí mật GPG trên máy trước khi sử dụng cờ `-s`.\n\n---\n\n## 📖 Định nghĩa\nAnnotated Tag (Thẻ chú giải) là một đối tượng độc lập trong cơ sở dữ liệu của Git, được lưu trữ cùng siêu dữ liệu đầy đủ gồm tên người tạo, email, ngày giờ, thông điệp phát hành và chữ ký số chống giả mạo.\n\n---\n\n## 💡 Tại sao cần\nKhi phát hành phần mềm thương mại, tính minh bạch và truy xuất nguồn gốc là yêu cầu sống còn. Annotated Tag cung cấp bằng chứng xác thực rõ ràng về người phê duyệt, thời điểm phát hành và danh sách tính năng cho hệ thống CI/CD và khách hàng.\n\n---\n\n## 🧠 Mental Model\nNếu Lightweight Tag giống mẩu giấy ghi chú Post-it dán tạm lên tài liệu, thì Annotated Tag như tấm bằng khen có dấu mộc công chứng. Trên đó ghi rõ người phê duyệt, con dấu số pháp lý, thời điểm cấp bằng và nội dung tuyên cáo không thể chối cãi.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nCấu trúc đối tượng của Annotated Tag trong Git:\n┌────────────────────────────────────────────────────────┐\n│ Tag Object (Mã băm SHA-1 độc lập)                      │\n│ Tagger: Nguyen Van A <a@company.com>                   │\n│ Date:   Wed Sep 30 14:00:00 2026                       │\n│ Message: Release version 2.0.0 with AI chatbot engine  │\n│ GPG Signature: (Chữ ký số chống giả mạo nếu có)        │\n│ Object trỏ tới: Commit C10 (hash 8f9e0a)              │\n└────────────────────────────────────────────────────────┘\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nTrước khi đưa cổng thanh toán lên production, kỹ sư trưởng An tạo thẻ chú giải bằng lệnh `git tag -a v2.0.0 -m \"Release v2.0.0: Full payment integration\"`. Khi nhóm bảo mật kiểm tra bằng `git show v2.0.0`, toàn bộ thông tin người duyệt, thời gian và mô tả hiển thị chi tiết, tạo niềm tin tuyệt đối cho dự án.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit tag -a <tên-thẻ> -m \"<thông-điệp-phát-hành>\"\ngit tag -s <tên-thẻ> -m \"<thông-điệp>\"\ngit show <tên-thẻ>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git tag -a <tên> -m \"<msg>\"`: Tạo thẻ chú giải với thông điệp phát hành trực tiếp trên dòng lệnh.\n- `git tag -s <tên> -m \"<msg>\"`: Tạo thẻ chú giải có ký số bảo mật bằng khóa GPG bí mật của lập trình viên.\n- `git show <tên-thẻ>`: Hiển thị toàn bộ siêu dữ liệu của thẻ cùng với diff của commit mà thẻ đang trỏ tới.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Dùng thẻ nhẹ cho bản phát hành chính thức**: Làm thiếu mất thông tin kiểm toán quan trọng về người phát hành và ghi chú phát hành.\n2. **Quên cờ `-m` khi dùng `-a`**: Khiến Git mở trình soạn thảo văn bản mặc định (Vim/Nano) làm gián đoạn dòng lệnh nếu bạn chưa quen thoát editor.\n3. **Hiểu nhầm về kích thước**: Annotated tag chỉ là một object nhỏ vài trăm bytes trong thư mục `.git`, hoàn toàn không ảnh hưởng tới hiệu năng dự án.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.\n1. Tạo một Annotated tag với thông điệp đầy đủ bằng `git tag -a v1.0.0 -m \"Bản phát hành chính thức v1.0.0\"`.\n2. Chạy lệnh `git show v1.0.0` và quan sát thông tin Tagger, Date và Message.\n3. So sánh kết quả hiển thị của `git show` giữa thẻ nhẹ và thẻ chú giải.\n4. Đẩy thẻ lên GitHub bằng `git push origin v1.0.0`.\n\n---\n\n## 💡 Hint & mẹo\n> Luôn luôn sử dụng cờ `-a` (Annotated) cho các mốc phát hành chính thức trong môi trường doanh nghiệp và CI/CD.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Tạo thành công Annotated tag có đầy đủ metadata và kiểm tra chi tiết bằng `git show`.\n- Phân biệt rõ ràng sự khác biệt giữa cấu trúc đối tượng của Lightweight tag và Annotated tag.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài kiểm tra trắc nghiệm dưới đây về thẻ chú giải Annotated Tag.\n\n---\n\n## 🚀 Thử thách nâng cao\nNêu sự khác biệt sâu bên trong thư mục `.git/refs/tags/` và `.git/objects/` giữa một Lightweight tag và một Annotated tag.\n\n---\n\n## 📝 Tổng kết\n- Annotated Tag là một đối tượng Git thực thụ chứa đầy đủ metadata và thông điệp.\n- Giúp truy vết kiểm toán rõ ràng ai là người tạo thẻ và vào thời điểm nào.\n- Dùng `git show <tag>` để xem toàn bộ thông tin chi tiết của thẻ chú giải.\n",
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
        "question": "Thông tin nào sau đây ĐƯỢC LƯU TRỮ bên trong một Annotated Tag mà Lightweight Tag KHÔNG CÓ?",
        "type": "single",
        "options": [
          {
            "text": "Tên người tạo thẻ, email, thời gian tạo thẻ, thông điệp phát hành và chữ ký số GPG",
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
        "question": "Tại sao trong các dự án thương mại, lập trình viên được yêu cầu PHẢI sử dụng Annotated Tag cho các bản phát hành Production?",
        "type": "single",
        "options": [
          {
            "text": "Để đảm bảo tính xác thực, lưu vết kiểm toán rõ ràng về người phê duyệt và thời điểm phát hành",
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
        "explanation": "Tính toàn vẹn và trách nhiệm giải trình của bản phát hành được đảm bảo nhờ siêu dữ liệu của Annotated tag."
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
