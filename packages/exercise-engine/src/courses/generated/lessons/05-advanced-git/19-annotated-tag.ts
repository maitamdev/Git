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
  "content": "# Annotated Tag\n\n---\n\n## 🎯 Mục tiêu\n- Phân biệt rõ ràng giữa Lightweight Tag (thẻ nhẹ) và Annotated Tag (thẻ chú giải đầy đủ).\n- Tạo thẻ Annotated Tag chứa đầy đủ tên tác giả, email, ngày giờ và thông điệp phát hành bằng cờ `-a`.\n- Kiểm tra thông tin chi tiết của một thẻ chú giải bằng câu lệnh `git show`.\n- Hiểu rõ vì sao các bản phát hành sản phẩm chính thức (Production Releases) luôn bắt buộc dùng Annotated Tag.\n\n---\n\n## 📖 Định nghĩa\n> Annotated Tag (Thẻ chú giải) là một đối tượng hoàn chỉnh độc lập trong cơ sở dữ liệu của Git (bên cạnh blob, tree và commit). Không giống như Lightweight Tag chỉ đơn thuần là một con trỏ bí danh lưu mã commit hash, Annotated Tag được lưu trữ với đầy đủ siêu dữ liệu (metadata): tên người gắn thẻ, email, thời gian tạo thẻ, thông điệp phát hành (Release Note) chi tiết và có thể được ký số bảo mật bằng khóa GPG (GNU Privacy Guard).\n\n---\n\n## 🤔 Tại sao cần?\nKhi phát hành một phiên bản phần mềm ra thị trường thương mại, tính minh bạch và khả năng xác thực nguồn gốc là yêu cầu pháp lý và an ninh tối quan trọng. Annotated Tag cung cấp chữ ký chứng nhận không thể chối cãi: ai là người đã phê duyệt phát hành phiên bản này, vào thời khắc nào và bản phát hành đó bao gồm những tính năng gì. Mọi công cụ CI/CD hiện đại như GitHub Releases đều sử dụng Annotated Tag để tự động tạo trang phát hành chuyên nghiệp.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nNếu Lightweight Tag giống như một chiếc mẩu giấy ghi chú Post-it nhỏ bạn dán tạm lên bìa tài liệu với dòng chữ \"v1.0\", thì Annotated Tag giống như một tấm Bằng chứng nhận có công chứng của Nhà nước. Trên tấm bằng đó có in tên người có thẩm quyền ký duyệt, con dấu đỏ pháp lý, ngày tháng cấp bằng và một bản tuyên cáo long trọng ghi rõ nội dung của chứng chỉ. Không ai có thể nghi ngờ tính hợp pháp của tấm bằng đó.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCấu trúc đối tượng của Annotated Tag trong Git:\n┌────────────────────────────────────────────────────────┐\n│ Tag Object (Mã băm SHA-1 riêng biệt)                   │\n│ Tagger: Nguyen Van A <a@company.com>                   │\n│ Date:   Wed Sep 30 14:00:00 2026                       │\n│ Message: Release version 2.0.0 with AI chatbot engine  │\n│ GPG Signature: (Chữ ký số chống giả mạo nếu có)        │\n│ Object trỏ tới: Commit C10 (hash 8f9e0a)              │\n└────────────────────────────────────────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrước thời điểm đưa cổng thanh toán quốc tế lên hoạt động chính thức trên môi trường production, kỹ sư trưởng An tạo một thẻ chú giải long trọng bằng lệnh: `git tag -a v2.0.0 -m \"Release v2.0.0: Full integration with Stripe and PayPal with PCI-DSS compliance\"`. Khi một kỹ sư bảo mật khác trong nhóm muốn kiểm tra thẩm định thông tin của bản phát hành quan trọng này, kỹ sư đó gõ câu lệnh: `git show v2.0.0`. Toàn bộ thông tin định danh tác giả An, địa chỉ email, ngày giờ ký duyệt chính xác đến từng giây và bản thông cáo phát hành tính năng hiển thị rõ ràng, tạo niềm tin và sự bảo đảm tuyệt đối cho toàn bộ ban giám đốc dự án.\n\n---\n\n## 💻 Command\n```bash\ngit tag -a <tên-thẻ> -m \"<thông-điệp-phát-hành>\"\ngit tag -s <tên-thẻ> -m \"<thông-điệp>\"\ngit show <tên-thẻ>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git tag -a <tên> -m \"<msg>\"`: Tạo thẻ chú giải với thông điệp phát hành trực tiếp trên dòng lệnh.\n- `git tag -s <tên> -m \"<msg>\"`: Tạo thẻ chú giải có ký số bảo mật bằng khóa GPG bí mật của lập trình viên.\n- `git show <tên-thẻ>`: Hiển thị toàn bộ siêu dữ liệu của thẻ cùng với diff của commit mà thẻ đang trỏ tới.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Dùng thẻ nhẹ Lightweight tag cho các bản phát hành chính thức**:  Khiến thiếu thông tin tác giả và mô tả release.\n2. **Quên cờ `-m` khi gõ `git tag -a`**:  Khiến Git tự động bật trình soạn thảo văn bản mặc định (Vim/Nano).\n3. **Nghĩ rằng Annotated tag làm chậm dự án**:  Tag chỉ là một đối tượng nhỏ vài trăm bytes trong thư mục `.git`.\n\n---\n\n## 🧪 Lab\n1. Tạo một Annotated tag với thông điệp đầy đủ bằng `git tag -a v1.0.0 -m \"Bản phát hành chính thức v1.0.0\"`.\n2. Chạy lệnh `git show v1.0.0` và quan sát thông tin Tagger, Date và Message.\n3. So sánh kết quả hiển thị của `git show` giữa thẻ nhẹ và thẻ chú giải.\n4. Đẩy thẻ lên GitHub bằng `git push origin v1.0.0`.\n\n---\n\n## 💡 Hint\n> Luôn luôn sử dụng cờ `-a` (Annotated) cho các mốc phát hành chính thức trong môi trường doanh nghiệp.\n\n---\n\n## ✅ Validation\n- Tạo thành công Annotated tag có đầy đủ metadata và kiểm tra chi tiết bằng git show.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về thẻ chú giải Annotated Tag.\n\n---\n\n## 🔥 Challenge\nNêu sự khác biệt sâu bên trong thư mục `.git/refs/tags/` và `.git/objects/` giữa một Lightweight tag và một Annotated tag.\n\n---\n\n## 📚 Tổng kết\n- Annotated Tag là một đối tượng Git thực thụ chứa đầy đủ metadata và thông điệp.\n- Cung cấp thông tin tác giả, thời gian tạo và hỗ trợ chữ ký số mã hóa GPG.\n- Là chuẩn mực bắt buộc cho mọi bản phát hành phần mềm chính thức trong doanh nghiệp.\n",
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
      }
    ]
  }
};
export default lesson;
