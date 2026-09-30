import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "11-semantic-versioning",
  "moduleId": "06-team-workflows",
  "metadata": {
    "id": "11-semantic-versioning",
    "title": "Semantic Versioning",
    "level": "advanced",
    "duration": 25,
    "xp": 85,
    "prerequisites": [
      "10-conventional-commits"
    ],
    "objectives": [
      "Nắm vững đặc tả Semantic Versioning 2.0.0 (SemVer) với định dạng chuẩn 3 con số: MAJOR.MINOR.PATCH.",
      "Áp dụng chính xác quy tắc tăng số: khi nào tăng PATCH (sửa lỗi), khi nào tăng MINOR (tính năng), khi nào tăng MAJOR (phá vỡ tương thích).",
      "Hiểu rõ ý nghĩa của các hậu tố tiền phát hành (Pre-release) như `-alpha`, `-beta`, `-rc.1` và thông tin bản dựng (Build metadata).",
      "Tích hợp tư duy SemVer vào quy trình quản lý thẻ Git Tag và phát hành thư viện phần mềm chuyên nghiệp."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "semantic versioning",
      "semver",
      "major minor patch",
      "phien ban phan mem",
      "dinh danh phien ban",
      "tuong thich nguoc"
    ],
    "commands": [
      "git tag -a v1.0.0 -m \"Release v1.0.0 initial stable release\"",
      "git tag -a v1.0.1 -m \"Release v1.0.1: fix button safari bug\"",
      "git tag -a v1.1.0 -m \"Release v1.1.0: add datepicker component\"",
      "git tag -a v2.0.0 -m \"Release v2.0.0: breaking change drop legacy browsers\""
    ]
  },
  "content": "# Semantic Versioning\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững đặc tả Semantic Versioning 2.0.0 (SemVer) với định dạng chuẩn 3 con số: MAJOR.MINOR.PATCH.\n- Áp dụng chính xác quy tắc tăng số: khi nào tăng PATCH (sửa lỗi), khi nào tăng MINOR (tính năng), khi nào tăng MAJOR (phá vỡ tương thích).\n- Hiểu rõ ý nghĩa của các hậu tố tiền phát hành (Pre-release) như `-alpha`, `-beta`, `-rc.1` và thông tin bản dựng (Build metadata).\n- Tích hợp tư duy SemVer vào quy trình quản lý thẻ Git Tag và phát hành thư viện phần mềm chuyên nghiệp.\n\n---\n\n## 📖 Định nghĩa\n> Semantic Versioning (định danh phiên bản theo ngữ nghĩa, viết tắt là SemVer) là một đặc tả kỹ thuật phổ quát định nghĩa quy tắc đánh số phiên bản phần mềm một cách minh bạch và nhất quán. Phiên bản SemVer được biểu diễn dưới dạng ba cụm số nguyên dương phân cách bởi dấu chấm: `MAJOR.MINOR.PATCH` (ví dụ `2.4.1`). Mỗi con số mang một thông điệp kỹ thuật rõ ràng gửi tới cộng đồng người sử dụng về mức độ thay đổi và tính tương thích của mã nguồn bên trong bản phát hành đó.\n\n---\n\n## 🤔 Tại sao cần?\nNếu không có SemVer, người phát triển ứng dụng rơi vào \"Địa ngục phụ thuộc\" (Dependency Hell): khi nâng cấp một thư viện từ phiên bản 2.0 lên 2.1, bạn không thể biết liệu hệ thống của mình có bị gãy đổ hay không. Với SemVer, bạn hoàn toàn yên tâm: nếu chỉ tăng PATCH hoặc MINOR, bạn chắc chắn rằng mã nguồn của bạn vẫn chạy tương thích 100%; chỉ khi con số MAJOR thay đổi, bạn mới cần đọc kỹ tài liệu nâng cấp để điều chỉnh lại các đoạn mã bị phá vỡ tương thích.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung bạn đang nâng cấp ổ cắm điện trong nhà. Bản sửa lỗi nhỏ (`PATCH`, từ 1.0.0 lên 1.0.1) giống như việc người thợ vặn chặt lại ốc vít của ổ cắm: hoàn toàn giữ nguyên hình dạng và phích cắm của bạn vẫn cắm vừa vặn. Bản tính năng mới (`MINOR`, từ 1.0.0 lên 1.1.0) giống như việc người thợ gắn thêm một cổng sạc USB bên cạnh: bạn có thêm cổng sạc mới tiện lợi trong khi phích cắm cũ vẫn sử dụng bình thường. Còn bản phá vỡ tương thích (`MAJOR`, từ 1.0.0 lên 2.0.0) giống như việc đổi toàn bộ ổ cắm tròn sang ổ cắm ba chấu dẹt vuông: tất cả phích cắm cũ của bạn đều không thể cắm vừa nữa và bắt buộc phải mua đầu chuyển đổi mới.\n\n---\n\n## 🖼 Sơ đồ\n```text\nQuy tắc tăng số trong Semantic Versioning (MAJOR.MINOR.PATCH):\n  v 2 . 4 . 1\n    │   │   │\n    │   │   └───► PATCH: Sửa lỗi (Bug fixes) - Tương thích ngược 100%\n    │   │\n    │   └───────► MINOR: Thêm tính năng mới (New features) - Tương thích ngược 100%\n    │\n    └───────────► MAJOR: Thay đổi phá vỡ tương thích (Breaking Changes) - Không tương thích ngược!\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nNhóm phát triển một thư viện giao diện người dùng mã nguồn mở áp dụng chặt chẽ SemVer. Ban đầu, thư viện phát hành phiên bản `1.0.0`. Khi một kỹ sư sửa lỗi hiển thị nút bấm bị lệch trên trình duyệt Safari, nhóm tăng số và phát hành thẻ tag `v1.0.1` (tăng PATCH). Một tháng sau, nhóm bổ sung thêm một linh kiện Lịch chọn ngày mới mà không làm ảnh hưởng đến các linh kiện cũ, nhóm phát hành `v1.1.0` (tăng MINOR và reset PATCH về 0). Sau một năm, nhóm quyết định loại bỏ hỗ trợ các trình duyệt Internet Explorer cũ và đổi hoàn toàn định dạng thuộc tính props, nhóm phát hành `v2.0.0` (tăng MAJOR và reset MINOR, PATCH về 0) kèm theo tài liệu cảnh báo người dùng cần chuyển đổi mã nguồn.\n\n---\n\n## 💻 Command\n```bash\ngit tag -a v1.0.0 -m \"Release v1.0.0 initial stable release\"\ngit tag -a v1.0.1 -m \"Release v1.0.1: fix button safari bug\"\ngit tag -a v1.1.0 -m \"Release v1.1.0: add datepicker component\"\ngit tag -a v2.0.0 -m \"Release v2.0.0: breaking change drop legacy browsers\"\n```\n\n---\n\n## 🔍 Giải thích command\n- `git tag -a v1.0.1`: Đánh dấu bản vá lỗi nhỏ tăng PATCH an toàn tuyệt đối cho người dùng.\n- `git tag -a v1.1.0`: Đánh dấu bản phát hành tính năng mới tăng MINOR tương thích ngược.\n- `git tag -a v2.0.0`: Đánh dấu phiên bản lớn tăng MAJOR có chứa thay đổi phá vỡ tương thích.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Tăng số MAJOR cho những thay đổi nhỏ chỉ vì thấy phiên bản nghe oai hơn hoặc muốn làm tiếp thị.**: Tăng số MAJOR cho những thay đổi nhỏ chỉ vì thấy phiên bản nghe oai hơn hoặc muốn làm tiếp thị.\n2. **Đưa thay đổi gây phá vỡ tương thích ngược vào một bản phát hành chỉ tăng PATCH hoặc MINOR.**: Đưa thay đổi gây phá vỡ tương thích ngược vào một bản phát hành chỉ tăng PATCH hoặc MINOR.\n3. **Quên reset các con số phía sau về 0 khi tăng con số phía trước (ví dụ từ 1.2.5 lên 2.0.0 chứ không phải 2.2.5).**: Quên reset các con số phía sau về 0 khi tăng con số phía trước (ví dụ từ 1.2.5 lên 2.0.0 chứ không phải 2.2.5).\n\n---\n\n## 🧪 Lab\n1. Xác định loại phiên bản cần phát hành khi: sửa 2 lỗi bảo mật và thêm 1 API mới tương thích ngược.\n2. Gắn thẻ Annotated Tag tương ứng theo chuẩn SemVer trong kho lưu trữ Git của bạn.\n\n---\n\n## 💡 Hint\n> Nếu phân vân giữa MINOR và MAJOR, câu hỏi quyết định là: code của người dùng hiện tại có bị lỗi khi nâng cấp lên không?\n\n---\n\n## ✅ Validation\n- Hiểu rõ tại sao phiên bản 0.y.z được xem là giai đoạn thử nghiệm ban đầu nơi API có thể thay đổi bất cứ lúc nào.\n\n---\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm dưới đây về chuẩn định danh phiên bản Semantic Versioning.\n\n---\n\n## 🔥 Challenge\nPhân tích cách các ký tự mũ `^` (caret) và ngã `~` (tilde) trong package.json hoạt động dựa trên các nguyên tắc của SemVer.\n\n---\n\n## 📚 Tổng kết\n- SemVer chuẩn hóa định dạng phiên bản theo cấu trúc MAJOR.MINOR.PATCH.\n- PATCH tăng khi sửa lỗi, MINOR tăng khi thêm tính năng, MAJOR tăng khi phá vỡ tương thích.\n- Cung cấp sự an tâm và khả năng tương thích dự đoán trước được cho toàn bộ hệ sinh thái phần mềm.\n",
  "quiz": {
    "id": "quiz-06-11-semantic-versioning",
    "title": "Trắc nghiệm: Semantic Versioning",
    "questions": [
      {
        "id": "q1",
        "question": "Khi bạn chỉ thực hiện sửa lỗi mã nguồn mà không thêm tính năng mới và không làm hỏng tương thích ngược thì con số nào tăng lên?",
        "type": "single",
        "options": [
          {
            "text": "PATCH (ví dụ từ 1.0.0 lên 1.0.1)",
            "correct": true
          },
          {
            "text": "MINOR (ví dụ từ 1.0.0 lên 1.1.0)",
            "correct": false
          },
          {
            "text": "MAJOR (ví dụ từ 1.0.0 lên 2.0.0)",
            "correct": false
          },
          {
            "text": "Không được tăng số nào cả",
            "correct": false
          }
        ],
        "explanation": "Chỉ số PATCH dành riêng cho các bản vá lỗi (bug fixes) bảo đảm an toàn và tương thích tuyệt đối cho người dùng."
      },
      {
        "id": "q2",
        "question": "Khi một thư viện xóa bỏ hoàn toàn một hàm công khai mà khách hàng đang sử dụng, thư viện đó BẮT BUỘC phải tăng con số nào?",
        "type": "single",
        "options": [
          {
            "text": "MAJOR vì đây là thay đổi phá vỡ tính tương thích ngược (Breaking Change)",
            "correct": true
          },
          {
            "text": "Chỉ cần tăng PATCH để người dùng không chú ý",
            "correct": false
          },
          {
            "text": "Tăng MINOR vì đã xóa bớt code cho nhẹ",
            "correct": false
          },
          {
            "text": "Giữ nguyên phiên bản cũ",
            "correct": false
          }
        ],
        "explanation": "Bất kỳ thay đổi nào khiến mã nguồn của người dùng hiện tại bị lỗi khi nâng cấp đều bắt buộc phải tăng MAJOR theo chuẩn SemVer."
      },
      {
        "id": "q3",
        "question": "Sau khi tăng chỉ số MINOR từ phiên bản `1.4.3`, số phiên bản mới chính xác sẽ là gì?",
        "type": "single",
        "options": [
          {
            "text": "1.5.0 (chỉ số PATCH được reset về 0)",
            "correct": true
          },
          {
            "text": "1.5.3 (giữ nguyên chỉ số PATCH cũ)",
            "correct": false
          },
          {
            "text": "2.0.0",
            "correct": false
          },
          {
            "text": "1.4.4",
            "correct": false
          }
        ],
        "explanation": "Theo đặc tả SemVer, khi một con số ở bậc cao hơn tăng lên, tất cả các con số ở bậc thấp hơn phía sau nó bắt buộc phải được reset về số 0."
      },
      {
        "id": "q4",
        "question": "Các phiên bản có số MAJOR bằng 0 (ví dụ `0.3.2`) mang ý nghĩa quy ước gì trong SemVer?",
        "type": "single",
        "options": [
          {
            "text": "Giai đoạn phát triển thử nghiệm ban đầu (Initial Development), API chưa ổn định và có thể thay đổi bất cứ lúc nào",
            "correct": true
          },
          {
            "text": "Phiên bản hoàn hảo không bao giờ có lỗi",
            "correct": false
          },
          {
            "text": "Phiên bản đã bị tác giả khai tử và không được dùng nữa",
            "correct": false
          },
          {
            "text": "Phần mềm chỉ chạy được trên hệ điều hành 32-bit",
            "correct": false
          }
        ],
        "explanation": "Giai đoạn `0.x.x` dành cho các sản phẩm sơ khai đang hoàn thiện kiến trúc, không ràng buộc bởi quy tắc tương thích nghiêm ngặt của phiên bản ổn định 1.0.0."
      }
    ]
  }
};
export default lesson;
