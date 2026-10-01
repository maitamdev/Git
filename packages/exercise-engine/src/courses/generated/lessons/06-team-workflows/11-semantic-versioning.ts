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
  "content": "# Semantic Versioning\n\n## 🎯 Mục tiêu\n- Nắm vững đặc tả Semantic Versioning 2.0.0 (SemVer) với định dạng chuẩn 3 con số: MAJOR.MINOR.PATCH.\n- Áp dụng chính xác quy tắc tăng số: khi nào tăng PATCH (sửa lỗi), khi nào tăng MINOR (tính năng), khi nào tăng MAJOR (phá vỡ tương thích).\n- Hiểu rõ ý nghĩa của các hậu tố tiền phát hành (Pre-release) như `-alpha`, `-beta`, `-rc.1` và thông tin bản dựng.\n- Tích hợp tư duy SemVer vào quy trình quản lý thẻ Git Tag và phát hành thư viện phần mềm chuyên nghiệp.\n\n## 🧩 Từ khóa hôm nay\n### Semantic Versioning\n- **Nói dễ hiểu**: Quy chuẩn đánh số phiên bản gồm ba phần MAJOR.MINOR.PATCH giúp người dùng hiểu ngay mức độ thay đổi của mã nguồn.\n- **Ví dụ**: Bản cập nhật từ `1.2.0` lên `1.2.1` là sửa lỗi nhỏ, còn lên `2.0.0` là có thay đổi lớn phá vỡ tính tương thích cũ.\n- **Đừng nhầm**: Không phải số đếm ngẫu nhiên theo ngày tháng hay sở thích cá nhân, mà tuân thủ quy tắc kỹ thuật nghiêm ngặt.\n\n### Breaking Change\n- **Nói dễ hiểu**: Thay đổi làm thay đổi giao diện hàm hoặc cách gọi cũ khiến ứng dụng của người dùng bị lỗi khi cập nhật.\n- **Ví dụ**: Xóa bỏ một tham số bắt buộc trong hàm API khiến các phần mềm bên ngoài gọi vào bị vỡ.\n- **Đừng nhầm**: Bất kể thay đổi nhỏ hay lớn, chỉ cần làm hỏng code hiện có của người dùng thì bắt buộc phải tăng số MAJOR.\n\n### Pre-release\n- **Nói dễ hiểu**: Hậu tố đánh dấu bản phát hành thử nghiệm để kiểm thử trước khi tung ra bản chính thức cho công chúng.\n- **Ví dụ**: Phiên bản `2.0.0-rc.1` là bản ứng viên phát hành lần một trước khi ra mắt bản `2.0.0` ổn định.\n- **Đừng nhầm**: Bản pre-release có thứ tự ưu tiên thấp hơn bản chính thức cùng số phiên bản.\n\n## 📖 Định nghĩa\nSemantic Versioning (SemVer) là đặc tả kỹ thuật định nghĩa quy tắc đánh số phiên bản phần mềm theo định dạng ba cụm số nguyên: `MAJOR.MINOR.PATCH`. Mỗi con số phản ánh rõ ràng tính chất thay đổi của mã nguồn: sửa lỗi, bổ sung tính năng tương thích ngược, hoặc thay đổi phá vỡ tính tương thích cũ.\n\n## 💡 Tại sao cần\nKhông có SemVer, các lập trình viên rơi vào khủng hoảng quản lý phụ thuộc (Dependency Hell). Người dùng không thể biết việc cập nhật một thư viện có làm sập hệ thống hay không. SemVer đem lại sự an tâm tuyệt đối: chỉ cần tăng PATCH hoặc MINOR là người dùng an tâm cập nhật tự động mà không lo gãy đổ ứng dụng.\n\n## 🧠 Mental Model\nHãy hình dung việc thay thế ổ cắm điện. Sửa lỗi (`PATCH`: 1.0.0 lên 1.0.1) như siết lại ốc vít lỏng: giữ nguyên mọi thứ và phích cắm cũ dùng bình thường. Thêm tính năng (`MINOR`: 1.0.0 lên 1.1.0) như gắn thêm cổng USB bên cạnh ổ cắm: có thêm tiện ích mới mà phích cắm cũ vẫn cắm vừa. Phá vỡ tương thích (`MAJOR`: 1.0.0 lên 2.0.0) như đổi ổ cắm tròn thành ổ cắm ba chấu vuông: toàn bộ phích cắm cũ không dùng được nữa nếu không có đầu chuyển đổi.\n\n## 📊 Sơ đồ minh họa\n```mermaid\nflowchart LR\n    V[\"MAJOR . MINOR . PATCH\"]\n    V --> Maj[\"MAJOR: Phá vỡ tương thích cũ (Breaking Change)\"]\n    V --> Min[\"MINOR: Thêm tính năng mới (Tương thích ngược)\"]\n    V --> Pat[\"PATCH: Vá lỗi bảo mật, logic (Tương thích ngược)\"]\n```\n\n## 🏢 Ví dụ thực tế\nMột nhóm phát triển thư viện giao diện phát hành bản `1.0.0`. Khi sửa lỗi hiển thị nút bấm trên trình duyệt Safari, nhóm phát hành thẻ tag `v1.0.1` (tăng PATCH). Một tháng sau, nhóm bổ sung linh kiện Lịch chọn ngày mà không làm hỏng linh kiện cũ, nhóm phát hành `v1.1.0` (tăng MINOR và reset PATCH về 0). Sau một năm, nhóm bỏ hỗ trợ các trình duyệt cũ và thay đổi toàn bộ API thuộc tính, nhóm phát hành `v2.0.0` (tăng MAJOR).\n\n## 💻 Command & Cú pháp\n```bash\n# Tạo thẻ tag bản vá lỗi nhỏ tăng PATCH\ngit tag -a v1.0.1 -m \"Release v1.0.1: fix button safari bug\"\n\n# Tạo thẻ tag bổ sung tính năng mới tăng MINOR\ngit tag -a v1.1.0 -m \"Release v1.1.0: add datepicker component\"\n\n# Tạo thẻ tag phiên bản lớn có breaking change tăng MAJOR\ngit tag -a v2.0.0 -m \"Release v2.0.0: drop legacy browser support\"\n```\n\n## 🔍 Giải thích command\n- `git tag -a v1.0.1`: Đánh dấu bản phát hành sửa lỗi nhỏ, người dùng có thể cập nhật an toàn mà không cần sửa code.\n- `git tag -a v1.1.0`: Đánh dấu bản phát hành thêm tính năng mới tương thích ngược, reset chỉ số PATCH về 0.\n- `git tag -a v2.0.0`: Đánh dấu bản phát hành lớn có breaking change, cảnh báo người dùng cần đọc tài liệu nâng cấp.\n\n## ⚠️ Sai lầm phổ biến\n- Tăng số MAJOR cho những thay đổi nhỏ chỉ để làm thương hiệu hoặc tiếp thị mà không có breaking change thực tế.\n- Đưa thay đổi phá vỡ tương thích ngược vào một bản phát hành chỉ tăng PATCH hoặc MINOR.\n- Quên reset các chỉ số phía sau về 0 khi tăng con số phía trước (ví dụ tăng từ 1.2.5 lên 2.0.0 thay vì 2.2.5).\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác tạo thẻ Git Tag theo chuẩn SemVer và đối chiếu theo hướng dẫn bên dưới.\n\n1. Khởi tạo kho Git và gắn thẻ phiên bản phát hành đầu tiên: `git tag -a v1.0.0 -m \"Release v1.0.0\"`.\n2. Tạo commit sửa lỗi chính tả và gắn thẻ: `git tag -a v1.0.1 -m \"Release v1.0.1: fix typo\"`.\n3. Tạo commit bổ sung một module mới và gắn thẻ: `git tag -a v1.1.0 -m \"Release v1.1.0: add auth service\"`.\n4. Xem danh sách toàn bộ các thẻ tag bằng lệnh `git tag -n` để kiểm tra thông điệp đi kèm từng phiên bản.\n\n## 💡 Hint & mẹo\n- Khi phân vân giữa MINOR và MAJOR, hãy tự hỏi: Mã nguồn hiện tại của người dùng có nguy cơ bị lỗi khi nâng cấp không? Nếu có, bắt buộc phải tăng MAJOR.\n- Nhớ đẩy thẻ lên máy chủ từ xa bằng lệnh `git push origin --tags`.\n\n## ✅ Validation & Kết quả mong đợi\n- Danh sách tag trong Git tuân thủ đúng thứ tự số học và phản ánh chính xác bản chất thay đổi.\n- Các công cụ quản lý gói như npm, yarn hay pip có thể tự động tải bản cập nhật an toàn theo ký hiệu phiên bản quy ước.\n\n## ❓ Quiz nhanh\nHãy làm bài trắc nghiệm bên dưới để kiểm tra mức độ thấu hiểu của bạn về các nguyên tắc tăng số trong Semantic Versioning.\n\n## 🚀 Thử thách nâng cao\nTìm hiểu ý nghĩa của các ký tự đại diện `^` (caret) và `~` (tilde) trong tệp `package.json` khi cài đặt thư viện Node.js và giải thích cách chúng bảo vệ dự án khỏi các lỗi tương thích.\n\n## 📝 Tổng kết\n- SemVer chuẩn hóa định dạng phiên bản theo cấu trúc ba con số MAJOR.MINOR.PATCH.\n- PATCH tăng khi sửa lỗi, MINOR tăng khi thêm tính năng mới, MAJOR tăng khi có thay đổi phá vỡ tương thích.\n- Tuân thủ SemVer đem lại khả năng tương thích dự đoán trước được và sự an tâm cho toàn bộ người dùng phần mềm.\n",
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
      },
      {
        "id": "q5",
        "question": "Hậu tố pre-release như `-alpha`, `-beta`, hoặc `-rc.1` trong định dạng SemVer mang ý nghĩa quy ước gì?",
        "type": "single",
        "options": [
          {
            "text": "Đánh dấu phiên bản thử nghiệm phát hành trước khi ra mắt bản chính thức, có độ ưu tiên thấp hơn bản chính thức cùng số",
            "correct": true
          },
          {
            "text": "Đánh dấu phiên bản chỉ chạy được duy nhất trên hệ điều hành Linux",
            "correct": false
          },
          {
            "text": "Đánh dấu phiên bản phần mềm đã hết hạn bản quyền thương mại",
            "correct": false
          },
          {
            "text": "Đánh dấu phần mềm chứa mã độc cần bị cách ly khẩn cấp",
            "correct": false
          }
        ],
        "explanation": "Hậu tố pre-release như 1.0.0-rc.1 biểu thị bản phát hành thử nghiệm cho cộng đồng kiểm thử trước khi phát hành phiên bản chính thức 1.0.0."
      }
    ]
  }
};
export default lesson;
