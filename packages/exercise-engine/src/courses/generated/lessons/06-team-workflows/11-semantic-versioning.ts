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
  "content": "# Semantic Versioning\n\n## 🎯 Mục tiêu\n- Nắm vững đặc tả Semantic Versioning 2.0.0 (SemVer) với định dạng chuẩn 3 con số: MAJOR.MINOR.PATCH.\n- Áp dụng quy tắc tăng số cho phần mềm đã công bố public API và đang ở phiên bản `1.0.0` trở lên.\n- Hiểu rõ ý nghĩa của các hậu tố tiền phát hành (Pre-release) như `-alpha`, `-beta`, `-rc.1` và thông tin bản dựng.\n- Tích hợp tư duy SemVer vào quy trình quản lý thẻ Git Tag và phát hành thư viện phần mềm chuyên nghiệp.\n\n## 🧩 Từ khóa hôm nay\n### Semantic Versioning\n- **Nói dễ hiểu**: Quy chuẩn đánh số phiên bản gồm ba phần MAJOR.MINOR.PATCH giúp người dùng hiểu ngay mức độ thay đổi của mã nguồn.\n- **Ví dụ**: Bản cập nhật từ `1.2.0` lên `1.2.1` là sửa lỗi nhỏ, còn lên `2.0.0` là có thay đổi lớn phá vỡ tính tương thích cũ.\n- **Đừng nhầm**: SemVer chỉ có ý nghĩa khi dự án xác định public API và tuân theo đặc tả; `0.y.z` dành cho giai đoạn phát triển ban đầu.\n\n### Breaking Change\n- **Nói dễ hiểu**: Thay đổi không còn tương thích với public API đã công bố, nên một số chương trình đang dùng API đó có thể phải sửa.\n- **Ví dụ**: Xóa bỏ một tham số bắt buộc trong hàm API khiến các phần mềm bên ngoài gọi vào bị vỡ.\n- **Đừng nhầm**: Quy tắc MAJOR áp dụng cho thay đổi không tương thích với public API đã công bố khi `MAJOR` lớn hơn 0; dự án `0.y.z` chưa cam kết API ổn định.\n\n### Pre-release\n- **Nói dễ hiểu**: Hậu tố đánh dấu bản phát hành thử nghiệm để kiểm thử trước khi tung ra bản chính thức cho công chúng.\n- **Ví dụ**: Phiên bản `2.0.0-rc.1` là bản ứng viên phát hành lần một trước khi ra mắt bản `2.0.0` ổn định.\n- **Đừng nhầm**: Bản pre-release có thứ tự ưu tiên thấp hơn bản chính thức cùng số phiên bản.\n\n### Build Metadata (Thông tin bản dựng)\n- **Nói dễ hiểu**: Phần tùy chọn sau dấu `+` dùng để ghi thông tin build như số pipeline hoặc mã build.\n- **Ví dụ**: `1.2.3+build.17` có metadata `build.17`.\n- **Đừng nhầm**: Metadata không làm thay đổi thứ tự ưu tiên SemVer; không dùng nó thay cho PATCH/MINOR/MAJOR.\n\n## 📖 Định nghĩa\nSemantic Versioning 2.0.0 (SemVer) là đặc tả phiên bản `MAJOR.MINOR.PATCH` cho phần mềm có public API được khai báo. Với bản ổn định `1.0.0` trở lên: PATCH là sửa lỗi tương thích ngược, MINOR là thêm chức năng tương thích ngược, MAJOR là đổi public API không tương thích ngược. Trước `1.0.0`, API được xem là chưa ổn định và có thể thay đổi. Nhãn phiên bản chỉ giúp người dùng dự đoán mức thay đổi nếu nhà phát hành tuân thủ đặc tả.\n\n## 🤔 Tại sao cần?\nSemVer giúp người dùng hiểu mức độ tương thích mà nhà phát hành cam kết giữa các phiên bản. Nó không bảo đảm bản cập nhật không có lỗi; người dùng vẫn cần kiểm thử, xem ghi chú phát hành và chọn dải phiên bản phù hợp.\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung ổ cắm là public API mà nhà phát hành cam kết. PATCH sửa lỗi mà không đổi cách cắm; MINOR thêm cổng mới nhưng giữ cổng cũ; MAJOR đổi chuẩn cổng đã công bố nên chương trình dùng chuẩn cũ có thể cần cập nhật.\n\n## 🖼 Sơ đồ\n```mermaid\nflowchart LR\n    V[\"MAJOR . MINOR . PATCH\"]\n    V --> Maj[\"MAJOR: Phá vỡ tương thích cũ (Breaking Change)\"]\n    V --> Min[\"MINOR: Thêm tính năng mới (Tương thích ngược)\"]\n    V --> Pat[\"PATCH: Sửa lỗi tương thích ngược\"]\n```\n\n## 🌎 Ví dụ thực tế\nMột nhóm phát hành thư viện có public API ở bản `1.0.0`. Sửa lỗi tương thích ngược có thể thành `1.0.1`; thêm API mới tương thích ngược có thể thành `1.1.0`. Nếu nhóm bỏ một API đã công bố hoặc phá vỡ cam kết tương thích, nhóm phát hành MAJOR, ví dụ `2.0.0`. Các tag Git thường thêm tiền tố `v` như `v1.0.1`, nhưng tiền tố đó không thuộc chuỗi SemVer.\n\n## 💻 Command\n```bash\n# Tạo thẻ tag bản vá lỗi nhỏ tăng PATCH\n# Chạy mỗi lệnh tại commit phát hành tương ứng, không gắn tất cả tag vào cùng một commit\ngit tag -a v1.0.1 -m \"Release v1.0.1: fix button safari bug\"\n\n# Tạo thẻ tag bổ sung tính năng mới tăng MINOR\ngit tag -a v1.1.0 -m \"Release v1.1.0: add datepicker component\"\n\n# Tạo thẻ tag phiên bản lớn có breaking change tăng MAJOR\ngit tag -a v2.0.0 -m \"Release v2.0.0: drop legacy browser support\"\n```\n\nTiền tố `v` là quy ước tên Git tag thường gặp; SemVer ở ví dụ trên là `2.0.0`. Metadata build dùng dấu `+`, ví dụ `2.0.0+build.17`.\n\n## 🔍 Giải thích command\n- `git tag -a v1.0.1`: Gắn nhãn cho commit phát hành PATCH; lệnh tag không tự kiểm tra nội dung có tương thích hay không.\n- `git tag -a v1.1.0`: Gắn nhãn cho commit phát hành MINOR; nhóm chọn số này theo thay đổi public API và chính sách phát hành.\n- `git tag -a v2.0.0`: Gắn nhãn cho commit phát hành MAJOR có thay đổi public API không tương thích.\n\n## ⚠️ Sai lầm phổ biến\n- Tăng số MAJOR cho những thay đổi nhỏ chỉ để làm thương hiệu hoặc tiếp thị mà không có breaking change thực tế.\n- Đưa thay đổi phá vỡ tương thích ngược vào một bản phát hành chỉ tăng PATCH hoặc MINOR.\n- Quên reset các chỉ số phía sau về 0 khi tăng con số phía trước (ví dụ tăng từ 1.2.5 lên 2.0.0 thay vì 2.2.5).\n\n## 🧪 Lab\nLàm trong repo thử nghiệm đã có commit và danh tính Git được cấu hình. Mỗi tag phải gắn sau khi commit thay đổi tương ứng.\n\n1. Trong repo thử nghiệm đã có ít nhất một commit, gắn tag `v1.0.0` cho commit hiện tại: `git tag -a v1.0.0 -m \"Release v1.0.0\"`.\n2. Sửa một lỗi tương thích ngược trong file thử nghiệm, chạy `git add <tệp>` rồi `git commit -m \"fix: correct example\"`; sau đó gắn tag `v1.0.1`.\n3. Thêm một API/khả năng mới tương thích ngược, stage và commit riêng; sau đó gắn tag `v1.1.0`.\n4. So sánh `2.0.0-rc.1` với `2.0.0`, rồi giải thích vì sao `2.0.0+build.17` có cùng thứ tự ưu tiên với `2.0.0`.\n5. Xem từng tag và commit đích bằng `git show --no-patch <tag>`; `git tag -n` liệt kê tên tag/thông điệp nhưng không tự xác minh SemVer.\n\n## 💡 Hint\n- Trước khi chọn mức tăng, hãy xác định public API, compatibility policy và liệu dự án đã phát hành `1.0.0` hay chưa.\n- Nhớ đẩy thẻ lên máy chủ từ xa bằng lệnh `git push origin --tags`.\n\n## ✅ Validation\n- Các tag trỏ tới commit phát hành dự định; Git tag không xác thực SemVer hay nội dung commit.\n- Giải thích được vì sao dải phiên bản package manager không bảo đảm một bản mới không có lỗi.\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm bên dưới để kiểm tra mức độ thấu hiểu của bạn về các nguyên tắc tăng số trong Semantic Versioning.\n\n## 🔥 Challenge\nTìm hiểu ý nghĩa của các ký tự đại diện `^` (caret) và `~` (tilde) trong tệp `package.json` khi cài đặt thư viện Node.js và giải thích cách chúng bảo vệ dự án khỏi các lỗi tương thích.\n\n## 📚 Tổng kết\n- SemVer chuẩn hóa định dạng phiên bản theo cấu trúc ba con số MAJOR.MINOR.PATCH.\n- PATCH tăng khi sửa lỗi, MINOR tăng khi thêm tính năng mới, MAJOR tăng khi có thay đổi phá vỡ tương thích.\n- SemVer là cam kết tương thích của nhà phát hành đối với public API đã khai báo, không phải bảo đảm phần mềm không lỗi.\n- `0.y.z` là giai đoạn phát triển ban đầu; các quy tắc ổn định dành cho phiên bản `1.0.0` trở lên.\n- Pre-release có thứ tự thấp hơn bản phát hành thường tương ứng; build metadata bị bỏ qua khi so sánh thứ tự.\n",
  "quiz": {
    "id": "quiz-06-11-semantic-versioning",
    "title": "Trắc nghiệm: Semantic Versioning",
    "questions": [
      {
        "id": "q1",
        "question": "Với thư viện đang ở phiên bản ổn định `1.0.0` trở lên, sửa một lỗi tương thích ngược thì tăng thành phần nào?",
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
        "explanation": "SemVer quy định PATCH cho bản phát hành sửa lỗi tương thích ngược; điều này không bảo đảm bản phát hành không còn lỗi."
      },
      {
        "id": "q2",
        "question": "Với thư viện từ phiên bản `1.0.0` trở lên, nếu xóa một hàm thuộc public API đã công bố thì theo SemVer cần tăng thành phần nào?",
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
        "explanation": "Từ `1.0.0`, thay đổi public API không tương thích ngược cần tăng MAJOR; trước `1.0.0`, SemVer chưa cam kết API ổn định."
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
        "explanation": "Khi tăng MINOR, PATCH trở về 0; vì vậy mức MINOR kế tiếp sau `1.4.3` là `1.5.0`."
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
        "explanation": "SemVer gọi `0.y.z` là giai đoạn phát triển ban đầu và API chưa được xem là ổn định; nhà phát hành vẫn nên ghi rõ thay đổi."
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
      },
      {
        "id": "q6",
        "question": "Theo SemVer, thông tin sau dấu `+` như `1.2.3+build.17` có tác dụng gì khi so sánh độ ưu tiên phiên bản?",
        "type": "single",
        "options": [
          {
            "text": "Ghi metadata bản dựng; phần này không ảnh hưởng thứ tự ưu tiên SemVer",
            "correct": true
          },
          {
            "text": "Tăng PATCH lên `1.2.4`",
            "correct": false
          },
          {
            "text": "Làm bản phát hành có độ ưu tiên thấp hơn như pre-release",
            "correct": false
          },
          {
            "text": "Thay thế thành phần MAJOR",
            "correct": false
          }
        ],
        "explanation": "Build metadata có thể ghi số build hoặc mã pipeline; SemVer bỏ qua phần này khi so sánh độ ưu tiên."
      }
    ]
  }
};
export default lesson;
