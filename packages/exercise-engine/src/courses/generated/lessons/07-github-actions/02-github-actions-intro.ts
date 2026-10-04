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
  "content": "# GitHub Actions là gì? Nền tảng tự động hóa của GitHub\n\n## 🎯 Mục tiêu\n- Hiểu rõ GitHub Actions là gì và vị thế của nó trong hệ sinh thái GitHub.\n- Nắm bắt các tính năng chính: tích hợp sâu với Git events, kho ứng dụng Actions Marketplace phong phú.\n- Phân biệt mô hình SaaS tích hợp sẵn so với việc tự dựng và vận hành máy chủ Jenkins truyền thống.\n\n## 🧩 Từ khóa hôm nay\n### GitHub Actions\n- **Nói dễ hiểu**: Nền tảng tự động hóa tích hợp sẵn trong GitHub giúp chạy kiểm thử, đóng gói và triển khai ứng dụng.\n- **Ví dụ**: Mỗi khi push code lên GitHub, một máy ảo đám mây tự động bật lên chạy test và báo kết quả.\n- **Đừng nhầm**: Không phải công cụ chỉ dành riêng cho việc test code, mà có thể tự động hóa mọi tác vụ quản lý dự án.\n\n### Workflow\n- **Nói dễ hiểu**: Một kịch bản tự động hóa hoàn chỉnh được định nghĩa trong tệp YAML nằm trong thư mục `.github/workflows/`.\n- **Ví dụ**: Tệp `ci.yml` quy định khi có Pull Request thì tự động cài thư viện và chạy `npm test`.\n- **Đừng nhầm**: Không phải câu lệnh đơn lẻ, mà là một quy trình gồm nhiều công việc (jobs) và bước (steps) kết hợp.\n\n### Actions Marketplace\n- **Nói dễ hiểu**: Danh mục để tìm Action do GitHub, tổ chức hoặc cộng đồng phát hành và dùng lại trong workflow.\n- **Ví dụ**: Dùng `actions/checkout@v7` để checkout mã nguồn vào runner.\n- **Đừng nhầm**: Có Action miễn phí, có Action tính phí hoặc điều khoản riêng; runner, lưu trữ và mức sử dụng Actions cũng tùy repo/gói dịch vụ.\n\n## 📖 Định nghĩa\nGitHub Actions là nền tảng tự động hóa quy trình làm việc và CI/CD tích hợp với GitHub. Bạn định nghĩa workflow dưới dạng YAML để phản hồi các sự kiện repo như push, Pull Request hoặc issue; khả năng chạy và chi phí phụ thuộc cấu hình, loại runner, gói dịch vụ và chính sách repo.\n\n## 🤔 Tại sao cần?\nGitHub Actions giảm phần việc tự vận hành máy chủ CI khi dùng runner do GitHub quản lý và giữ cấu hình cùng mã nguồn. Nó không loại bỏ mọi công việc hạ tầng: nhóm vẫn cần quản lý quyền, workflow, bí mật, chi phí và có thể chọn runner tự quản lý. Jenkins cũng có thể được dùng qua dịch vụ quản lý hoặc hạ tầng riêng.\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy tưởng tượng GitHub như một tòa nhà văn phòng thông minh. GitHub Actions chính là hệ thống cảm biến tự động: khi có người quẹt thẻ vào sảnh (sự kiện `push`), hệ thống tự động bật đèn, kích hoạt điều hòa nhiệt độ và in lịch họp trong ngày (`workflow`) mà không cần bạn phải thuê nhân sự vận hành riêng.\n\n## 🖼 Sơ đồ\n```mermaid\nflowchart LR\n    Event[Sự kiện: Push / PR / Issue] --> Engine[GitHub Actions Engine]\n    Engine --> Runners[Runner: GitHub-hosted hoặc self-hosted]\n    Runners --> Jobs[Chạy Tests, Linter, Build & Deploy]\n```\n\n## 🌎 Ví dụ thực tế\nNhóm phát triển thư viện giao diện mã nguồn mở nhận hàng chục Pull Request mỗi ngày. Nhờ GitHub Actions, mỗi khi có người gửi PR, hệ thống tự động khởi tạo máy ảo Ubuntu sạch, kéo mã nguồn về kiểm tra chuẩn cú pháp, chạy bài test và dựng bản xem trước giao diện. Nhờ đó người quản trị duyệt code rất nhanh mà không tốn công kiểm tra thủ công.\n\n## 💻 Command\n```bash\n# Xem danh sách các workflow đã đăng ký trong kho\ngh workflow list\n\n# Xem lịch sử các lần chạy workflow gần nhất\ngh run list\n\n# Kiểm tra trạng thái đăng nhập công cụ dòng lệnh GitHub CLI\ngh auth status\n```\n\n## 🔍 Giải thích command\n- Các lệnh `gh` cần cài GitHub CLI; xem workflow/run trên repo riêng thường cần đăng nhập và quyền truy cập phù hợp.\n- `gh workflow list`: Liệt kê workflow mà GitHub CLI nhìn thấy trong repository hiện tại.\n- `gh run list`: Liệt kê các lần chạy gần đây; mở log chi tiết bằng `gh run view`.\n- `gh auth status`: Kiểm tra trạng thái xác thực hiện tại của GitHub CLI.\n\n## ⚠️ Sai lầm phổ biến\n- Nghĩ rằng GitHub Actions chỉ dùng để chạy CI/CD; thực tế nó có thể tự động đóng issue cũ, gắn nhãn PR và gửi thông báo.\n- Dùng các Action của bên thứ ba từ Marketplace mà không kiểm tra độ tin cậy và nguồn gốc tác giả.\n- Lưu trữ trực tiếp mật khẩu hoặc API token trong tệp kịch bản YAML thay vì dùng GitHub Secrets.\n\n## 🧪 Lab\nHãy mở terminal và cùng tôi thực hành từng bước dưới đây để làm chủ kỹ năng:\n\n1. Nếu máy đã có `gh`, chạy `gh --version`; nếu chưa có, có thể đọc tệp `.github/workflows/*.yml` thay cho việc cài thêm công cụ.\n2. Chỉ khi dùng repo GitHub mà bạn có quyền truy cập, chạy `gh auth status` rồi `gh workflow list`.\n3. Nếu repo chưa có workflow hoặc bạn chưa đăng nhập, mở tệp YAML mẫu và nhận diện `on`, `jobs`, `steps`; có thể xem tab Actions khi có quyền truy cập.\n\n## 💡 Hint\n- GitHub Actions được cấu hình hoàn toàn bằng các tệp YAML đặt trong thư mục `.github/workflows/`.\n- Hãy ưu tiên sử dụng các action chính thức do tổ chức `@actions` của GitHub phát hành trên Marketplace.\n\n## ✅ Validation\n- Nhận diện được nơi khai báo workflow và vai trò của `on`, `jobs`, `steps`.\n- Khi có GitHub CLI và quyền repo, biết dùng `gh workflow list`/`gh run list`; nếu không, có thể hoàn thành phần học bằng cách đọc YAML mẫu.\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm bên dưới để kiểm tra mức độ hiểu biết của bạn về nền tảng tự động hóa GitHub Actions.\n\n## 🔥 Challenge\nTra cứu chính sách sử dụng Actions hiện hành của một repo mẫu: loại runner nào được dùng, giới hạn nào áp dụng và nơi xem mức tiêu thụ. Hạn mức và chi phí có thể thay đổi theo gói dịch vụ.\n\n## 📚 Tổng kết\n- GitHub Actions là nền tảng CI/CD và tự động hóa native được tích hợp sẵn bên trong GitHub.\n- Phản hồi đa dạng các sự kiện diễn ra trên kho lưu trữ chứ không chỉ riêng hành động push mã nguồn.\n- Hệ sinh thái Actions Marketplace cung cấp hàng ngàn khối xây dựng sẵn giúp tiết kiệm thời gian phát triển.\n",
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
      },
      {
        "id": "q5",
        "question": "Thuật ngữ \"Configuration as Code\" trong GitHub Actions ám chỉ nguyên lý nào?",
        "type": "single",
        "options": [
          {
            "text": "Toàn bộ quy trình tự động hóa được định nghĩa bằng tệp văn bản YAML và được quản lý phiên bản cùng với mã nguồn",
            "correct": true
          },
          {
            "text": "Bắt buộc phải viết kịch bản bằng mã máy nhị phân 0 và 1",
            "correct": false
          },
          {
            "text": "Chỉ được phép cấu hình qua giao diện kéo thả trực quan trên web mà không có tệp tin",
            "correct": false
          },
          {
            "text": "Cấu hình quy trình phải được in ra giấy để người quản lý đóng dấu xác nhận",
            "correct": false
          }
        ],
        "explanation": "Quản lý cấu hình dưới dạng mã nguồn (Configuration as Code) cho phép theo dõi lịch sử, review qua Pull Request và phục hồi trạng thái một cách tin cậy."
      }
    ]
  }
};
export default lesson;
