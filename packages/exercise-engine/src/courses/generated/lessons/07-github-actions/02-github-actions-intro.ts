import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "02-github-actions-intro",
  "moduleId": "07-github-actions",
  "metadata": {
    "id": "02-github-actions-intro",
    "title": "GitHub Actions là gì? Nền tảng tự động hóa của GitHub",
    "level": "advanced",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "01-ci-cd-concept"
    ],
    "objectives": [
      "Hiểu rõ GitHub Actions là gì và vị thế của nó trong hệ sinh thái GitHub.",
      "Nắm bắt các tính năng chính: tích hợp sâu với Git events, kho ứng dụng Actions Marketplace phong phú.",
      "Phân biệt mô hình SaaS tích hợp sẵn so với việc tự dựng và vận hành máy chủ Jenkins truyền thống."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "github actions",
      "automation",
      "marketplace",
      "workflow engine",
      "saas ci"
    ],
    "commands": [
      "gh workflow list",
      "gh run list",
      "gh auth status"
    ]
  },
  "content": "# GitHub Actions là gì? Nền tảng tự động hóa của GitHub\n\n---\n\n## 🎯 Mục tiêu bài học\n- Hiểu rõ GitHub Actions là gì và vị thế của nó trong hệ sinh thái GitHub.\n- Nắm bắt các tính năng chính: tích hợp sâu với Git events, kho ứng dụng Actions Marketplace phong phú.\n- Phân biệt mô hình SaaS tích hợp sẵn so với việc tự dựng và vận hành máy chủ Jenkins truyền thống.\n\n---\n\n## 📖 Định nghĩa\n> GitHub Actions là một nền tảng tự động hóa quy trình làm việc (Workflow Automation) và dịch vụ CI/CD được tích hợp trực tiếp, nguyên bản vào GitHub. Nền tảng này cho phép các kỹ sư phần mềm tạo ra các kịch bản tự động hóa mạnh mẽ phản hồi lại bất kỳ sự kiện nào xảy ra trong kho lưu trữ, từ việc đẩy mã nguồn, mở Pull Request, phát hành phiên bản mới, cho đến khi có một bình luận hoặc Issue được tạo ra một cách liền mạch.\n\n---\n\n## 🤔 Tại sao cần?\nTrước khi GitHub Actions ra đời, các nhóm phát triển phải thiết lập và duy trì các máy chủ CI riêng biệt như Jenkins, Travis CI hoặc CircleCI. Việc này đòi hỏi kỹ năng vận hành hạ tầng phức tạp, quản lý chứng chỉ xác thực, phân quyền token và cấu hình webhook liên lạc liên tục. GitHub Actions xóa bỏ hoàn toàn rào cản này bằng cách đưa toàn bộ kịch bản tự động hóa vào ngay bên trong thư mục dự án dưới dạng mã nguồn mở, không cần cài đặt thêm phần mềm máy chủ ngoài.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy tưởng tượng GitHub như một tòa cao ốc văn phòng thông minh. GitHub Actions chính là hệ thống cảm biến và các trợ lý tự động hóa được cài sẵn khắp mọi ngóc ngách của tòa nhà. Mỗi khi có người quẹt thẻ vào cửa (sự kiện Git push), trợ lý thông minh lập tức kích hoạt chuỗi hành động: bật đèn chiếu sáng, kiểm tra nhiệt độ phòng và in danh sách công việc trong ngày mà không cần bạn phải gọi điện điều phối nhân công từ bên ngoài.\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nGitHub Repository Events ──► [GitHub Actions Engine] ──► [Virtual Runners]\n       │                                │                         │\n       ├─ Push / Pull Request           ├─ Phân tích YAML          ├─ Ubuntu VM\n       ├─ Issue opened / Comment        ├─ Quản lý quyền Token     ├─ Windows VM\n       └─ Release published             └─ Ghi log thời gian thực   └─ macOS VM\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nNhóm phát triển thư viện mã nguồn mở React UI nổi tiếng nhận được hàng chục Pull Request đóng góp mỗi ngày từ cộng đồng toàn cầu. Nhờ GitHub Actions, mỗi khi một lập trình viên lạ mặt gửi PR, hệ thống tự động khởi chạy máy ảo Ubuntu sạch, tải bản mã nguồn đề xuất, kiểm tra xem tác giả đã ký thỏa thuận bản quyền CLA hay chưa, chạy linter kiểm tra chuẩn mã hóa và render bản xem trước giao diện trên máy chủ thử nghiệm. Toàn bộ thông tin này hiển thị ngay trên giao diện trao đổi của PR mà bảo trì viên không cần rời khỏi GitHub.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\ngh workflow list\ngh run list\ngh auth status\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nCác câu lệnh thông qua GitHub CLI (gh) cho phép kiểm tra trạng thái xác thực tài khoản với gh auth status, liệt kê danh sách toàn bộ các workflow tự động đã đăng ký với gh workflow list, và xem lịch sử các lần thực thi đường ống CI gần nhất với gh run list một cách trực quan.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Nghĩ rằng GitHub Actions chỉ dùng để chạy CI/CD**:  Nó còn có thể tự động đóng Issue cũ, gắn nhãn PR, gửi thông báo Slack và tự động đồng bộ tài liệu.\n2. **Sử dụng các Action của bên thứ ba từ Marketplace mà không kiểm tra độ tin cậy và nguồn gốc mã nguồn.**: \n3. **Để lộ token bảo mật trong kịch bản thay vì sử dụng cơ chế GitHub Secrets được mã hóa.**: \n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Kiểm tra xem kho lưu trữ hiện tại đã có cấu hình workflow nào chưa bằng lệnh gh workflow list.\n2. Quan sát thư mục gốc của dự án để chuẩn bị tạo cấu hình tự động hóa đầu tiên.\n3. Khám phá giao diện thẻ Actions trên trang web GitHub để làm quen với bảng điều khiển trực quan.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> GitHub Actions được cấu hình hoàn toàn bằng các tệp khai báo tĩnh định dạng YAML đặt trong thư mục đặc biệt.\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nLệnh gh workflow list phản hồi thành công và kết nối thông suốt với tài khoản cá nhân.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nCùng củng cố kiến thức về nền tảng GitHub Actions qua các câu hỏi trắc nghiệm dưới đây.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nTại sao việc lưu trữ kịch bản CI/CD dưới dạng tệp mã nguồn bên trong Git (Configuration as Code) lại vượt trội hơn cấu hình giao diện web thủ công?\n\n---\n\n## 📚 Tổng kết kiến thức\n- GitHub Actions là nền tảng CI/CD và tự động hóa native tích hợp sẵn bên trong GitHub.\n- Hỗ trợ phản hồi mọi sự kiện diễn ra trên kho lưu trữ chứ không chỉ riêng việc push mã nguồn.\n- Cung cấp hệ sinh thái Actions Marketplace với hàng nghìn khối xây dựng sẵn từ cộng đồng.\n",
  "quiz": {
    "id": "quiz-07-github-actions-02-github-actions-intro",
    "title": "Trắc nghiệm: GitHub Actions là gì? Nền tảng tự động hóa của GitHub",
    "questions": [
      {
        "id": "q1",
        "question": "GitHub Actions được lưu trữ và quản lý dưới dạng nào trong dự án?",
        "type": "single",
        "options": [
          {
            "text": "Các tệp cấu hình YAML nằm trực tiếp trong kho lưu trữ mã nguồn",
            "correct": true
          },
          {
            "text": "Các bảng dữ liệu SQL lưu trữ trên máy chủ nội bộ công ty",
            "correct": false
          },
          {
            "text": "Các biểu mẫu cấu hình bằng tay trên một trang web thứ ba",
            "correct": false
          },
          {
            "text": "Các tệp hình ảnh nhị phân được mã hóa đặc biệt",
            "correct": false
          }
        ],
        "explanation": "GitHub Actions tuân thủ nguyên lý Configuration as Code, lưu trữ các kịch bản tự động dưới dạng tệp văn bản YAML cùng với mã nguồn."
      },
      {
        "id": "q2",
        "question": "GitHub Actions có thể được kích hoạt bởi những sự kiện nào?",
        "type": "single",
        "options": [
          {
            "text": "Rất đa dạng: từ push, pull_request, tạo issue, gắn nhãn cho đến lịch định kỳ cron",
            "correct": true
          },
          {
            "text": "Chỉ duy nhất khi người quản trị bấm nút bằng tay",
            "correct": false
          },
          {
            "text": "Chỉ khi máy tính của người dùng bị khởi động lại",
            "correct": false
          },
          {
            "text": "Chỉ vào đúng lúc 0 giờ đêm mỗi ngày",
            "correct": false
          }
        ],
        "explanation": "GitHub Actions hỗ trợ hơn ba mươi loại sự kiện Webhook khác nhau trong vòng đời của một kho lưu trữ GitHub."
      },
      {
        "id": "q3",
        "question": "Kho ứng dụng GitHub Marketplace mang lại lợi ích gì cho việc xây dựng workflow?",
        "type": "single",
        "options": [
          {
            "text": "Cho phép tái sử dụng hàng nghìn action được đóng gói sẵn từ các nhà phát triển uy tín",
            "correct": true
          },
          {
            "text": "Nơi mua bán các đoạn mã nguồn bí mật của công ty",
            "correct": false
          },
          {
            "text": "Trang thương mại điện tử bán các thiết bị phần cứng máy chủ",
            "correct": false
          },
          {
            "text": "Nơi đăng ký mua tên miền website cá nhân",
            "correct": false
          }
        ],
        "explanation": "Marketplace giúp bạn không phải tự viết lại mọi logic từ đầu, ví dụ như setup-node, checkout, upload-artifact đều đã có sẵn."
      },
      {
        "id": "q4",
        "question": "So với máy chủ CI tự quản lý như Jenkins, ưu điểm nổi bật của GitHub Actions là gì?",
        "type": "single",
        "options": [
          {
            "text": "Không tốn công bảo trì hạ tầng, tích hợp sẵn với tài khoản GitHub và bảo mật mặc định",
            "correct": true
          },
          {
            "text": "Hoàn toàn không cần viết bất kỳ dòng mã nào",
            "correct": false
          },
          {
            "text": "Có thể chạy khi máy chủ không có nguồn điện",
            "correct": false
          },
          {
            "text": "Không giới hạn dung lượng lưu trữ tệp video dung lượng terabyte",
            "correct": false
          }
        ],
        "explanation": "GitHub Actions là dịch vụ SaaS do chính GitHub vận hành và cấp phát máy ảo tự động, giúp kỹ sư tập trung hoàn toàn vào logic nghiệp vụ."
      }
    ]
  }
};
export default lesson;
