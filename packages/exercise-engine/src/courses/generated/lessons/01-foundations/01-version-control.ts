import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "01-version-control",
  "moduleId": "01-foundations",
  "metadata": {
    "id": "01-version-control",
    "title": "Version Control là gì?",
    "level": "beginner",
    "duration": 20,
    "xp": 50,
    "prerequisites": [],
    "objectives": [
      "Hiểu rõ bản chất và lý do ra đời của hệ thống quản lý phiên bản (Version Control System - VCS).",
      "Phân tích được các rủi ro nghiêm trọng khi phát triển phần mềm mà không có công cụ theo dõi lịch sử.",
      "Nắm bắt bức tranh tổng quan về cách các kỹ sư phần mềm chuyên nghiệp lưu vết mã nguồn."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "vcs",
      "version control",
      "quan ly phien ban",
      "lich su",
      "source code"
    ],
    "commands": [
      "git --version",
      "git help"
    ]
  },
  "content": "# Version Control là gì?\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ bản chất và lý do ra đời của hệ thống quản lý phiên bản (Version Control System - VCS).\n- Phân tích được các rủi ro nghiêm trọng khi phát triển phần mềm mà không có công cụ theo dõi lịch sử.\n- Nắm bắt bức tranh tổng quan về cách các kỹ sư phần mềm chuyên nghiệp lưu vết mã nguồn.\n\n---\n\n## 📖 Định nghĩa\n> Hệ thống quản lý phiên bản (Version Control System - viết tắt là VCS) là một tập hợp các công cụ phần mềm chuyên dụng được thiết kế nhằm mục đích ghi nhận, theo dõi và quản lý mọi sự thay đổi trên các tệp tin mã nguồn theo dòng thời gian. Khi sử dụng VCS, lập trình viên có khả năng tra cứu lại toàn bộ lịch sử phát triển của dự án, xem ai đã chỉnh sửa những dòng code nào vào thời điểm nào, đối chiếu các bản sửa đổi với nhau và khôi phục lại trạng thái hoạt động ổn định trước đó bất cứ khi nào phát sinh lỗi bất ngờ.\n\n---\n\n## 🤔 Tại sao cần?\nTrong thực tế phát triển phần mềm, việc lập trình viên chỉnh sửa code dẫn đến lỗi ngoài ý muốn là điều diễn ra hàng ngày. Nếu không sử dụng Version Control, lập trình viên thường phải đối mặt với nguy cơ mất trắng dữ liệu hoặc phải duy trì hàng loạt thư mục đặt tên thủ công như project_final, project_final_v2, project_that_su_final. Cách làm này vừa tốn dung lượng ổ đĩa, vừa gây nhầm lẫn trầm trọng khi làm việc nhóm, không thể biết tệp tin nào chứa code mới nhất và hoàn toàn bất lực khi cần truy cứu trách nhiệm hoặc tái hiện lại lỗi.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung hệ thống Version Control giống như một cỗ máy thời gian kết hợp cùng chiếc camera an ninh ghi hình liên tục trong một xưởng chế tác nghệ thuật. Mỗi khi người nghệ nhân hoàn thành một công đoạn ưng ý, cỗ máy sẽ chụp lại một tấm ảnh lưu niệm với độ phân giải siêu nét và đánh dấu số thứ tự vào sổ nhật ký lưu trữ. Nếu công đoạn điêu khắc tiếp theo gặp sự cố làm nứt vỡ tác phẩm, người nghệ nhân chỉ cần bấm nút quay ngược thời gian để đưa khối gỗ trở về nguyên trạng thời điểm tấm ảnh đẹp nhất được ghi nhận.\n\n---\n\n## 🖼 Sơ đồ\n```text\nThời gian ─────────────────────────────────────────────────────────►\n[Bản thảo sơ khai] ──> [Bổ sung giao diện] ──> [Sửa lỗi đăng nhập]\n     (Ảnh chụp 1)           (Ảnh chụp 2)            (Ảnh chụp 3 - HEAD)\n          │                                              │\n          └─────────── Có thể du hành quay lại ──────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nHãy tưởng tượng một công ty công nghệ tài chính FinTech gồm năm kỹ sư lập trình cùng phát triển một ứng dụng ngân hàng số trực tuyến. Một kỹ sư phụ trách module xác thực vân tay, một người khác xây dựng tính năng chuyển tiền nhanh qua mã QR. Nếu cả hai người cùng mở một tệp xử lý giao dịch chung và sửa đổi mà không có hệ thống quản lý phiên bản điều phối, mã nguồn của người này sẽ ghi đè lên công sức của người kia khi lưu tệp. Nhờ có Version Control, mọi thay đổi của từng kỹ sư đều được ghi nhận riêng biệt thành các mốc rõ ràng, cho phép tích hợp an toàn mà không làm gián đoạn hệ thống thanh toán cốt lõi của ngân hàng.\n\n---\n\n## 💻 Command\n```bash\ngit --version\ngit help\n```\n\n---\n\n## 🔍 Giải thích command\n- `git --version`: Lệnh dùng để kiểm tra phiên bản Git hiện đang được cài đặt trong hệ điều hành máy tính của bạn.\n- `git help`: Lệnh hiển thị tài liệu hướng dẫn tra cứu chi tiết danh mục các câu lệnh cơ bản của Git.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Sao chép thư mục thủ công**:  Nhiều người mới bắt đầu học lập trình có thói quen copy-paste cả thư mục dự án ra Desktop rồi đổi tên theo ngày tháng, dẫn đến việc rối loạn phiên bản và làm đầy bộ nhớ máy tính.\n2. **Sợ hãi khi gặp lỗi**:  Không lưu vết thường xuyên vì sợ code chưa hoàn hảo, khiến cho đến cuối ngày khi phần mềm bị crash thì không còn bất kỳ điểm phục hồi nào để quay lui an toàn.\n3. **Chia sẻ mã nguồn qua tin nhắn**:  Gửi các tệp code rời rạc qua Zalo, Messenger hoặc Email thay vì đẩy lên kho lưu trữ tập trung, khiến các thành viên khác trong nhóm tích hợp sai lệch phiên bản.\n\n---\n\n## 🧪 Lab\n1. Mở terminal và gõ lệnh `git --version` để xác nhận Git đã sẵn sàng hoạt động trên hệ thống.\n2. Chạy lệnh `git help` để làm quen với danh sách các câu lệnh trợ giúp mặc định.\n3. Quan sát các thông điệp phản hồi từ giao diện dòng lệnh.\n\n---\n\n## 💡 Hint\n> Luôn kiểm tra kỹ câu lệnh trước khi bấm Enter để tránh gõ sai chính tả.\n\n---\n\n## ✅ Validation\n- Hệ thống hiển thị đúng thông tin phiên bản Git và thoát mã 0.\n\n---\n\n## ❓ Quiz\nHãy hoàn thành bài trắc nghiệm dưới đây để kiểm tra mức độ nắm bắt khái niệm Version Control.\n\n---\n\n## 🔥 Challenge\nGiải thích cho một người bạn chưa biết lập trình hiểu vì sao lập trình viên không nên lưu file theo kiểu copy-paste thủ công.\n\n---\n\n## 📚 Tổng kết\n- Version Control System (VCS) là nền tảng sống còn giúp ghi nhận toàn bộ lịch sử chỉnh sửa mã nguồn của dự án.\n- VCS loại bỏ hoàn toàn phương pháp quản lý file thủ công nguy hiểm như sao chép thư mục và gửi tệp qua chat.\n- Cung cấp khả năng du hành thời gian, giúp lập trình viên tự tin thử nghiệm các giải pháp kiến trúc mới mà không sợ phá hỏng code cũ.\n",
  "quiz": {
    "id": "quiz-01-version-control",
    "title": "Trắc nghiệm: Version Control là gì?",
    "questions": [
      {
        "id": "q1",
        "question": "Mục đích cốt lõi nhất của một hệ thống quản lý phiên bản (VCS) là gì?",
        "type": "single",
        "options": [
          {
            "text": "Theo dõi, ghi nhận và quản lý mọi sự thay đổi của mã nguồn theo thời gian",
            "correct": true
          },
          {
            "text": "Biên dịch mã nguồn JavaScript sang mã máy để tăng tốc độ chạy ứng dụng",
            "correct": false
          },
          {
            "text": "Tự động sửa lỗi cú pháp trong các tệp tin HTML và CSS",
            "correct": false
          },
          {
            "text": "Chạy quét virus và tường lửa ngăn chặn hacker tấn công máy tính",
            "correct": false
          }
        ],
        "explanation": "VCS được thiết kế chuyên biệt để theo dõi lịch sử thay đổi của tệp tin. Việc biên dịch hay bảo mật mạng thuộc về trình biên dịch và phần mềm an ninh."
      },
      {
        "id": "q2",
        "question": "Điều gì xảy ra khi bạn gặp lỗi nghiêm trọng trong dự án có áp dụng Version Control đúng cách?",
        "type": "single",
        "options": [
          {
            "text": "Bạn phải xóa bỏ toàn bộ dự án và viết lại mã nguồn từ đầu",
            "correct": false
          },
          {
            "text": "Bạn có thể khôi phục lại mã nguồn về điểm checkpoint ổn định gần nhất",
            "correct": true
          },
          {
            "text": "Máy tính sẽ tự động định dạng lại ổ cứng để xóa sạch các lỗi phát sinh",
            "correct": false
          },
          {
            "text": "Bạn phải liên hệ với quản trị viên mạng để mở khóa tệp tin",
            "correct": false
          }
        ],
        "explanation": "Ưu điểm lớn nhất của VCS là khả năng khôi phục (rollback) lại trạng thái snapshot ổn định trước đó trong lịch sử dự án."
      },
      {
        "id": "q3",
        "question": "Vì sao việc đặt tên thư mục kiểu \"project_v1\", \"project_final\" lại bị coi là sai lầm trong kỹ nghệ phần mềm?",
        "type": "single",
        "options": [
          {
            "text": "Vì hệ điều hành không cho phép đặt tên thư mục có dấu gạch dưới",
            "correct": false
          },
          {
            "text": "Vì gây lãng phí dung lượng, dễ nhầm lẫn và không hỗ trợ làm việc nhóm an toàn",
            "correct": true
          },
          {
            "text": "Vì Git sẽ từ chối quản lý các thư mục có từ \"final\"",
            "correct": false
          },
          {
            "text": "Vì tệp tin sẽ tự động bị mã hóa và không thể mở lại được",
            "correct": false
          }
        ],
        "explanation": "Quản lý phiên bản thủ công bằng cách copy thư mục gây tốn dung lượng ổ đĩa, dễ nhầm lẫn tệp tin mới/cũ và không thể so sánh chi tiết từng dòng code thay đổi."
      },
      {
        "id": "q4",
        "question": "Lệnh nào cho phép xem phiên bản phần mềm Git đang chạy trên máy tính?",
        "type": "single",
        "options": [
          {
            "text": "git --version",
            "correct": true
          },
          {
            "text": "git check-system",
            "correct": false
          },
          {
            "text": "git show-update",
            "correct": false
          },
          {
            "text": "git status --all",
            "correct": false
          }
        ],
        "explanation": "`git --version` là câu lệnh chuẩn trong giao diện dòng lệnh để in ra phiên bản cài đặt của công cụ Git."
      }
    ]
  }
};
export default lesson;
