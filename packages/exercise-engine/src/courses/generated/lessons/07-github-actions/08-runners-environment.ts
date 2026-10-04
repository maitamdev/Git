import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "08-runners-environment",
  "moduleId": "07-github-actions",
  "metadata": {
    "id": "08-runners-environment",
    "title": "Môi trường thực thi Runners: GitHub-hosted vs Self-hosted",
    "level": "advanced",
    "duration": 30,
    "xp": 95,
    "prerequisites": [
      "07-steps-execution"
    ],
    "objectives": [
      "Phân biệt rõ ràng giữa hai mô hình: GitHub-hosted Runners và Self-hosted Runners.",
      "Nắm được các ưu điểm và hạn chế về tài nguyên, chi phí, tốc độ và tính bảo mật của từng loại.",
      "Hiểu rõ các rủi ro bảo mật nghiêm trọng khi sử dụng Self-hosted Runners trên các kho lưu trữ công khai."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "runners",
      "github hosted",
      "self hosted",
      "virtual machines",
      "security isolation"
    ],
    "commands": [
      "uname -a",
      "cat /etc/os-release",
      "free -m"
    ]
  },
  "content": "# Môi trường thực thi Runners: GitHub-hosted vs Self-hosted\n\n## 🎯 Mục tiêu\n- Phân biệt rõ ràng giữa hai mô hình: GitHub-hosted Runners và Self-hosted Runners.\n- Nắm được các ưu điểm và hạn chế về tài nguyên, chi phí, tốc độ và tính bảo mật của từng loại.\n- Hiểu rõ các rủi ro bảo mật nghiêm trọng khi sử dụng Self-hosted Runners trên các kho lưu trữ công khai.\n\n## 🧩 Từ khóa hôm nay\n### GitHub-hosted Runner\n- **Nói dễ hiểu**: Runner do GitHub quản lý; runner hosted tiêu chuẩn dùng môi trường sạch cho Job và được thu hồi sau đó.\n- **Ví dụ**: Dùng `runs-on: ubuntu-latest` để nhận một máy ảo Linux được cài sẵn Docker, Node.js và Git.\n- **Đừng nhầm**: Không nên dựa vào trạng thái cục bộ giữa các Job/run; runner lớn hơn hoặc cấu hình đặc biệt có thể khác runner tiêu chuẩn.\n\n### Self-hosted Runner\n- **Nói dễ hiểu**: Máy chủ riêng do bạn hoặc công ty tự cắm điện, cài đặt ứng dụng Runner và kết nối với GitHub.\n- **Ví dụ**: Máy chủ có gắn 2 card GPU đặt tại văn phòng để huấn luyện mô hình trí tuệ nhân tạo.\n- **Đừng nhầm**: Bạn phải tự bảo trì, cập nhật hệ điều hành và dọn dẹp ổ đĩa; GitHub không quản lý phần cứng này cho bạn.\n\n### Ephemeral Runner\n- **Nói dễ hiểu**: Runner chỉ nhận một Job rồi bị gỡ khỏi dịch vụ; với self-hosted, người vận hành vẫn phải tự xóa hoặc làm sạch máy.\n- **Ví dụ**: Hệ thống autoscaling đăng ký self-hosted runner ở chế độ ephemeral, chuyển log ra kho riêng và hủy máy sau Job.\n- **Đừng nhầm**: Đây là cấu hình self-hosted có quy trình quản lý; không phải mọi self-hosted runner đều ephemeral.\n\n## 📖 Định nghĩa\nRunner là ứng dụng thực thi Job. GitHub-hosted runners do GitHub vận hành; self-hosted runners chạy trên máy hoặc môi trường do tổ chức quản lý. Runner hosted tiêu chuẩn thường được cấp môi trường sạch cho mỗi Job; self-hosted có thể giữ trạng thái và cần quy trình cập nhật, làm sạch, giới hạn quyền truy cập.\n\n## 🤔 Tại sao cần?\nLựa chọn runner ảnh hưởng đến quyền truy cập, bảo trì, tài nguyên và chi phí. GitHub-hosted giảm việc tự quản trị máy; self-hosted có thể cần GPU hoặc mạng nội bộ nhưng tăng trách nhiệm vận hành và rủi ro bảo mật.\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy so sánh việc đi xe taxi công nghệ (`GitHub-hosted`) với việc sở hữu xe tải riêng (`Self-hosted`). Với taxi, bạn chỉ cần mở ứng dụng bấm gọi xe; xe luôn sạch sẽ, đi xong bạn bước xuống xe và không cần bận tâm thay dầu hay rửa xe. Còn xe tải riêng đòi hỏi bạn tự đổ xăng, bảo dưỡng, nhưng bạn có thể độ thùng xe siêu trường siêu trọng để chở hàng quá khổ mà không hãng taxi nào đáp ứng được.\n\n## 🖼 Sơ đồ\n```mermaid\nflowchart TD\n    Workflow[Workflow Job] --> Choice{Chọn loại Runner}\n    Choice -- runs-on: ubuntu-latest --> GH[GitHub-hosted: môi trường hosted tiêu chuẩn, được quản lý]\n    Choice -- runs-on: self-hosted --> SH[Self-hosted: Máy chủ riêng, hỗ trợ GPU, truy cập mạng nội bộ]\n```\n\n## 🌎 Ví dụ thực tế\nTrong môi trường phát triển dự án thực tế: một nhóm cần chạy workload GPU hoặc truy cập mạng nội bộ có thể cân nhắc self-hosted runner. Trước khi chọn, nhóm đo tài nguyên, thời gian chạy và tổng chi phí; con số benchmark phải được đo trên hạ tầng thực tế.\n\n## 💻 Command\n```bash\n# Kiểm tra thông tin kiến trúc hạt nhân của máy ảo Runner\nuname -a\n\n# Xem thông tin phiên bản hệ điều hành Linux đang cấp phát\ncat /etc/os-release\n\n# Kiểm tra dung lượng bộ nhớ RAM khả dụng trong môi trường\nfree -m\n```\n\n## 🔍 Giải thích command\n- `uname -a`: Trả về tên kiến trúc phần cứng, phiên bản kernel Linux đang chạy trên máy ảo của GitHub.\n- `cat /etc/os-release`: Hiển thị chi tiết bản phân phối Linux (ví dụ Ubuntu 22.04 LTS hoặc 24.04 LTS).\n- `free -m`: Kiểm tra thông số bộ nhớ RAM khả dụng và dung lượng swap của Runner tính bằng megabytes.\n\n## ⚠️ Sai lầm phổ biến\n- Cho mã không đáng tin cậy chạy trên self-hosted runner có dữ liệu/quyền nhạy cảm; GitHub khuyến nghị hầu như không dùng loại runner này cho repo công khai.\n- Không dọn dẹp các tệp tin tạm thời trên Self-hosted Runner khiến ổ cứng bị đầy sau một thời gian vận hành.\n- Kỳ vọng GitHub-hosted Runner lưu lại tệp tin đã tải về giữa hai lần kích hoạt workflow khác nhau.\n\n## 🧪 Lab\nHãy mở terminal và cùng tôi thực hành từng bước dưới đây để làm chủ kỹ năng:\n\n1. Tạo một workflow kiểm tra thông số máy chủ GitHub-hosted:\n   ```yaml\n   name: Runner Specs Demo\n   on: [workflow_dispatch]\n   jobs:\n     specs:\n       runs-on: ubuntu-latest\n       steps:\n         - name: Kiểm tra thông tin hệ điều hành\n           run: uname -a && cat /etc/os-release\n         - name: Kiểm tra bộ nhớ và ổ đĩa\n           run: free -m && df -h\n   ```\n2. Đẩy file lên GitHub và kích hoạt thủ công qua nút Run workflow.\n3. Mở log của các bước để xem dung lượng RAM, dung lượng ổ đĩa và cấu hình CPU được cấp phát.\n\n## 💡 Hint\n- Trên GitHub-hosted Linux, bạn có toàn quyền thực thi lệnh với quyền quản trị viên `sudo` mà không cần nhập mật khẩu.\n- Với repo công khai, ưu tiên GitHub-hosted runner; nếu có ngoại lệ self-hosted, cần đánh giá cách ly mã không tin cậy và bảo vệ hạ tầng.\n\n## ✅ Validation\n- Log hiển thị thông tin hệ điều hành của runner; con số phần cứng có thể thay đổi theo image/loại runner.\n- Phân biệt runner hosted tiêu chuẩn với self-hosted; self-hosted có thể được cấu hình ephemeral nhưng cần tự vận hành việc làm sạch.\n\n## ❓ Quiz\nHãy hoàn thành bài trắc nghiệm bên dưới để kiểm tra mức độ phân biệt giữa GitHub-hosted và Self-hosted Runners.\n\n## 🔥 Challenge\nTìm hiểu cơ chế Ephemeral Self-hosted Runners kết hợp với Docker hoặc Kubernetes để tự động tạo mới và xóa bỏ pod Runner sau mỗi Job giống hệt như GitHub-hosted.\n\n## 📚 Tổng kết\n- GitHub-hosted runners do GitHub quản lý; runner tiêu chuẩn thường cấp môi trường sạch cho từng Job.\n- Self-hosted Runners do bạn tự vận hành, phù hợp cho phần cứng chuyên biệt (GPU) và truy cập mạng nội bộ.\n- Tránh self-hosted runners trên repo công khai vì PR không tin cậy có thể thực thi mã; xem hướng dẫn bảo mật trước khi có ngoại lệ.\n",
  "quiz": {
    "id": "quiz-07-github-actions-08-runners-environment",
    "title": "Trắc nghiệm: Môi trường thực thi Runners: GitHub-hosted vs Self-hosted",
    "questions": [
      {
        "id": "q1",
        "question": "Đặc điểm nào sau đây là của GitHub-hosted Runner?",
        "type": "single",
        "options": [
          {
            "text": "Runner hosted tiêu chuẩn thường được cấp môi trường sạch; chi tiết tùy loại runner",
            "correct": true
          },
          {
            "text": "Bạn phải tự mua phần cứng máy chủ và cắm dây mạng",
            "correct": false
          },
          {
            "text": "Toàn bộ dữ liệu của lần chạy trước được giữ nguyên trên ổ đĩa",
            "correct": false
          },
          {
            "text": "Không hỗ trợ hệ điều hành Linux",
            "correct": false
          }
        ],
        "explanation": "GitHub-hosted runners tiêu chuẩn thường dùng môi trường sạch cho từng Job; loại runner khác có thể có cấu hình riêng."
      },
      {
        "id": "q2",
        "question": "Trường hợp nào sau đây là lý do chính đáng nhất để đầu tư Self-hosted Runner?",
        "type": "single",
        "options": [
          {
            "text": "Cần phần cứng đặc biệt như card đồ họa GPU hoặc cần truy cập trực tiếp mạng nội bộ công ty",
            "correct": true
          },
          {
            "text": "Chỉ để in ra dòng chữ \"Hello World\"",
            "correct": false
          },
          {
            "text": "Để không bao giờ phải viết tệp YAML nữa",
            "correct": false
          },
          {
            "text": "Để tránh việc phải kết nối Internet",
            "correct": false
          }
        ],
        "explanation": "Self-hosted runners có thể đáp ứng GPU hoặc mạng riêng, nhưng tổ chức phải vận hành, làm sạch và bảo vệ máy đó."
      },
      {
        "id": "q3",
        "question": "Tại sao việc dùng Self-hosted Runner cho kho lưu trữ Public lại cực kỳ nguy hiểm?",
        "type": "single",
        "options": [
          {
            "text": "PR chứa mã không tin cậy có thể chạy trên runner và chiếm quyền truy cập dữ liệu hoặc mạng mà máy đó được cấp",
            "correct": true
          },
          {
            "text": "Làm máy chủ bị tiêu tốn quá nhiều giấy in",
            "correct": false
          },
          {
            "text": "Khiến màn hình máy chủ bị đổi màu nền",
            "correct": false
          },
          {
            "text": "GitHub sẽ tự động xóa tài khoản cá nhân của bạn ngay lập tức",
            "correct": false
          }
        ],
        "explanation": "Workflow từ PR không tin cậy có thể thực thi mã trên runner; GitHub khuyến nghị gần như không dùng self-hosted runner cho repo công khai."
      },
      {
        "id": "q4",
        "question": "Để chỉ định Job chạy trên một Self-hosted Runner do bạn tự cấu hình, cú pháp runs-on sẽ là gì?",
        "type": "single",
        "options": [
          {
            "text": "runs-on: self-hosted",
            "correct": true
          },
          {
            "text": "runs-on: my-home-pc",
            "correct": false
          },
          {
            "text": "runs-on: private-server",
            "correct": false
          },
          {
            "text": "runs-on: local-machine",
            "correct": false
          }
        ],
        "explanation": "Nhãn `self-hosted` là nhãn mặc định bắt buộc được gán cho mọi Runner tự quản lý."
      },
      {
        "id": "q5",
        "question": "Các phần mềm và công cụ nào đã được cài đặt sẵn trên máy ảo GitHub-hosted Runner (Ubuntu)?",
        "type": "single",
        "options": [
          {
            "text": "Rất nhiều công cụ phổ biến như Docker, Git, Node.js, Python, Java và các trình biên dịch tiêu chuẩn",
            "correct": true
          },
          {
            "text": "Hoàn toàn là một hệ điều hành trắng trơn không có bất kỳ công cụ nào, kể cả Git",
            "correct": false
          },
          {
            "text": "Chỉ có phần mềm giải trí và trò chơi điện tử",
            "correct": false
          },
          {
            "text": "Chỉ cài duy nhất trình duyệt web nhưng không có bất kỳ môi trường dòng lệnh nào",
            "correct": false
          }
        ],
        "explanation": "GitHub-hosted Runners được trang bị sẵn hàng chục công cụ và ngôn ngữ lập trình phổ biến, giúp các bước trong Job có thể thực thi ngay mà không cần cài đặt lại từ đầu."
      }
    ]
  }
};
export default lesson;
