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
  "content": "# Môi trường thực thi Runners: GitHub-hosted vs Self-hosted\n\n## 🎯 Mục tiêu\n- Phân biệt rõ ràng giữa hai mô hình: GitHub-hosted Runners và Self-hosted Runners.\n- Nắm được các ưu điểm và hạn chế về tài nguyên, chi phí, tốc độ và tính bảo mật của từng loại.\n- Hiểu rõ các rủi ro bảo mật nghiêm trọng khi sử dụng Self-hosted Runners trên các kho lưu trữ công khai.\n\n## 🧩 Từ khóa hôm nay\n### GitHub-hosted Runner\n- **Nói dễ hiểu**: Máy ảo do chính GitHub quản lý, tự động cấp phát sạch sẽ và tự hủy ngay sau khi Job kết thúc.\n- **Ví dụ**: Dùng `runs-on: ubuntu-latest` để nhận một máy ảo Linux được cài sẵn Docker, Node.js và Git.\n- **Đừng nhầm**: Không lưu giữ trạng thái giữa các lần chạy; mỗi lần chạy mới bạn lại có một máy ảo hoàn toàn trắng tinh.\n\n### Self-hosted Runner\n- **Nói dễ hiểu**: Máy chủ riêng do bạn hoặc công ty tự cắm điện, cài đặt ứng dụng Runner và kết nối với GitHub.\n- **Ví dụ**: Máy chủ có gắn 2 card GPU đặt tại văn phòng để huấn luyện mô hình trí tuệ nhân tạo.\n- **Đừng nhầm**: Bạn phải tự bảo trì, cập nhật hệ điều hành và dọn dẹp ổ đĩa; GitHub không quản lý phần cứng này cho bạn.\n\n### Ephemeral Environment\n- **Nói dễ hiểu**: Môi trường tạm thời, sinh ra tức thời theo yêu cầu và biến mất hoàn toàn sau khi làm xong nhiệm vụ.\n- **Ví dụ**: Máy ảo GitHub-hosted tự xóa mọi tệp tin và tiến trình sau khi bước cuối cùng của Job hoàn tất.\n- **Đừng nhầm**: Không thể tìm lại file trên ổ đĩa sau khi Job kết thúc trừ khi bạn đã upload file đó lên Artifacts.\n\n## 📖 Định nghĩa\nRunner là ứng dụng dịch vụ chạy trên máy chủ chịu trách nhiệm thực thi các bước trong Job. GitHub cung cấp hai loại chính: GitHub-hosted Runners (máy ảo tạm thời do GitHub tự động cấp phát, cài sẵn công cụ và hủy sau mỗi phiên) và Self-hosted Runners (máy chủ vật lý, máy ảo hoặc container do bạn tự quản lý và kết nối) đem lại khả năng kiểm soát hạ tầng và mạng nội bộ tối đa.\n\n## 💡 Tại sao cần\nLựa chọn đúng loại Runner là quyết định chiến lược về chi phí và hiệu năng. GitHub-hosted tiện lợi tuyệt đối, không tốn công quản trị hạ tầng. Trong khi đó, Self-hosted Runners cho phép khai thác phần cứng đặc thù như card đồ họa GPU hoặc truy cập trực tiếp vào cơ sở dữ liệu nội bộ công ty mà không cần mở cổng ra Internet.\n\n## 🧠 Mental Model\nHãy so sánh việc đi xe taxi công nghệ (`GitHub-hosted`) với việc sở hữu xe tải riêng (`Self-hosted`). Với taxi, bạn chỉ cần mở ứng dụng bấm gọi xe; xe luôn sạch sẽ, đi xong bạn bước xuống xe và không cần bận tâm thay dầu hay rửa xe. Còn xe tải riêng đòi hỏi bạn tự đổ xăng, bảo dưỡng, nhưng bạn có thể độ thùng xe siêu trường siêu trọng để chở hàng quá khổ mà không hãng taxi nào đáp ứng được.\n\n## 📊 Sơ đồ minh họa\n```mermaid\nflowchart TD\n    Workflow[Workflow Job] --> Choice{Chọn loại Runner}\n    Choice -- runs-on: ubuntu-latest --> GH[GitHub-hosted: Máy ảo sạch, tự động hủy, an toàn tuyệt đối]\n    Choice -- runs-on: self-hosted --> SH[Self-hosted: Máy chủ riêng, hỗ trợ GPU, truy cập mạng nội bộ]\n```\n\n## 🏢 Ví dụ thực tế\nMột công ty công nghệ phát triển mô hình trí tuệ nhân tạo nhận thấy các GitHub-hosted Runners thông thường chỉ có 2 đến 4 CPU ảo, khiến quá trình kiểm thử mô hình học sâu mất hơn hai tiếng. Nhóm quyết định lắp đặt một máy chủ Self-hosted có 64 nhân CPU và 2 card GPU NVIDIA tại văn phòng, sau đó cài đặt ứng dụng Runner. Kể từ đó, thời gian kiểm thử mô hình giảm xuống chỉ còn 6 phút trên kho lưu trữ nội bộ.\n\n## 💻 Command & Cú pháp\n```bash\n# Kiểm tra thông tin kiến trúc hạt nhân của máy ảo Runner\nuname -a\n\n# Xem thông tin phiên bản hệ điều hành Linux đang cấp phát\ncat /etc/os-release\n\n# Kiểm tra dung lượng bộ nhớ RAM khả dụng trong môi trường\nfree -m\n```\n\n## 🔍 Giải thích command\n- `uname -a`: Trả về tên kiến trúc phần cứng, phiên bản kernel Linux đang chạy trên máy ảo của GitHub.\n- `cat /etc/os-release`: Hiển thị chi tiết bản phân phối Linux (ví dụ Ubuntu 22.04 LTS hoặc 24.04 LTS).\n- `free -m`: Kiểm tra thông số bộ nhớ RAM khả dụng và dung lượng swap của Runner tính bằng megabytes.\n\n## ⚠️ Sai lầm phổ biến\n- Gắn Self-hosted Runner vào một kho lưu trữ công khai (Public Repo), tạo cơ hội cho kẻ xấu mở Pull Request chạy mã độc chiếm quyền máy chủ.\n- Không dọn dẹp các tệp tin tạm thời trên Self-hosted Runner khiến ổ cứng bị đầy sau một thời gian vận hành.\n- Kỳ vọng GitHub-hosted Runner lưu lại tệp tin đã tải về giữa hai lần kích hoạt workflow khác nhau.\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. Tạo một workflow kiểm tra thông số máy chủ GitHub-hosted:\n   ```yaml\n   name: Runner Specs Demo\n   on: [workflow_dispatch]\n   jobs:\n     specs:\n       runs-on: ubuntu-latest\n       steps:\n         - name: Kiểm tra thông tin hệ điều hành\n           run: uname -a && cat /etc/os-release\n         - name: Kiểm tra bộ nhớ và ổ đĩa\n           run: free -m && df -h\n   ```\n2. Đẩy file lên GitHub và kích hoạt thủ công qua nút Run workflow.\n3. Mở log của các bước để xem dung lượng RAM, dung lượng ổ đĩa và cấu hình CPU được cấp phát.\n\n## 💡 Hint & mẹo\n- Trên GitHub-hosted Linux, bạn có toàn quyền thực thi lệnh với quyền quản trị viên `sudo` mà không cần nhập mật khẩu.\n- Đối với kho lưu trữ mã nguồn mở (Public Repo), hãy luôn gắn bó với GitHub-hosted Runners để bảo đảm an toàn.\n\n## ✅ Validation & Kết quả mong đợi\n- Log hiển thị chi tiết thông số môi trường Linux Ubuntu được cấp phát sạch sẽ.\n- Nắm rõ sự khác biệt giữa mô hình tạm thời (ephemeral) của GitHub và mô hình lưu trạng thái (stateful) của Self-hosted.\n\n## ❓ Quiz nhanh\nHãy hoàn thành bài trắc nghiệm bên dưới để kiểm tra mức độ phân biệt giữa GitHub-hosted và Self-hosted Runners.\n\n## 🚀 Thử thách nâng cao\nTìm hiểu cơ chế Ephemeral Self-hosted Runners kết hợp với Docker hoặc Kubernetes để tự động tạo mới và xóa bỏ pod Runner sau mỗi Job giống hệt như GitHub-hosted.\n\n## 📝 Tổng kết\n- GitHub-hosted Runners là máy ảo do GitHub quản lý, bảo đảm môi trường sạch sẽ và cách ly an toàn.\n- Self-hosted Runners do bạn tự vận hành, phù hợp cho phần cứng chuyên biệt (GPU) và truy cập mạng nội bộ.\n- Tuyệt đối không dùng Self-hosted Runners trên Public Repositories để phòng tránh rủi ro thực thi mã độc.\n",
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
            "text": "Mỗi Job được chạy trên một máy ảo sạch và máy ảo bị hủy ngay sau khi Job kết thúc",
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
        "explanation": "GitHub-hosted Runners được sinh ra tức thời theo yêu cầu và bị hủy ngay lập tức để đảm bảo tính an toàn và sạch sẽ."
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
        "explanation": "Self-hosted Runners phù hợp khi cần tài nguyên phần cứng lớn, thời lượng chạy dài hoặc cần kết nối cơ sở dữ liệu nội bộ."
      },
      {
        "id": "q3",
        "question": "Tại sao việc dùng Self-hosted Runner cho kho lưu trữ Public lại cực kỳ nguy hiểm?",
        "type": "single",
        "options": [
          {
            "text": "Bất kỳ ai trên Internet mở PR cũng có thể chạy lệnh tùy ý trên máy chủ của bạn để đánh cắp dữ liệu hoặc đào tiền ảo",
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
        "explanation": "Mọi mã nguồn trong PR từ cộng đồng đều có thể thực thi với quyền hạn của máy chủ nội bộ, tiềm ẩn nguy cơ bảo mật nghiêm trọng."
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
