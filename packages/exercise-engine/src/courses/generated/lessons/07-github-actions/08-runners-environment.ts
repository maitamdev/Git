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
  "content": "# Môi trường thực thi Runners: GitHub-hosted vs Self-hosted\n\n---\n\n## 🎯 Mục tiêu bài học\n- Phân biệt rõ ràng giữa hai mô hình: GitHub-hosted Runners và Self-hosted Runners.\n- Nắm được các ưu điểm và hạn chế về tài nguyên, chi phí, tốc độ và tính bảo mật của từng loại.\n- Hiểu rõ các rủi ro bảo mật nghiêm trọng khi sử dụng Self-hosted Runners trên các kho lưu trữ công khai.\n\n---\n\n## 📖 Định nghĩa\n> Runner là ứng dụng dịch vụ chạy trên một máy chủ thực thi các Job trong workflow của bạn. GitHub cung cấp hai loại Runner chính: GitHub-hosted Runners (máy ảo sạch được GitHub tự động cấp phát, quản lý, cài đặt sẵn phần mềm và hủy ngay sau mỗi phiên chạy) và Self-hosted Runners (máy chủ vật lý, máy ảo hoặc container do chính bạn hoặc tổ chức của bạn tự cài đặt, vận hành và quản lý ứng dụng Runner) với sự kiểm soát hạ tầng và môi trường mạng một cách toàn diện.\n\n---\n\n## 🤔 Tại sao cần?\nLựa chọn đúng loại Runner là bài toán chiến lược về chi phí và hiệu năng. GitHub-hosted tiện lợi tuyệt đối, không tốn công bảo trì nhưng bị giới hạn về cấu hình phần cứng và có chi phí theo phút. Self-hosted Runners cho phép tận dụng phần cứng chuyên biệt cực mạnh (ví dụ: máy chủ có card đồ họa GPU để huấn luyện AI, dung lượng RAM hàng trăm GB) và truy cập trực tiếp vào mạng nội bộ của doanh nghiệp mà không cần mở cổng Internet.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy so sánh việc thuê xe taxi công nghệ (GitHub-hosted) với việc sở hữu một chiếc xe tải riêng (Self-hosted). Với taxi, bạn chỉ cần mở ứng dụng bấm gọi xe khi cần di chuyển; xe luôn sạch sẽ, bảo dưỡng sẵn, đi xong bạn xuống xe và không cần bận tâm về việc rửa xe hay thay dầu. Còn xe tải riêng đòi hỏi bạn phải tự bỏ tiền mua xe, tự đổ xăng và sửa chữa, nhưng bạn có thể độ thùng xe siêu trường siêu trọng để chở hàng hóa quá khổ mà không một hãng taxi nào đáp ứng được.\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nSo sánh mô hình Runner:\n┌───────────────────────────────────┬───────────────────────────────────┐\n│ GitHub-hosted Runner              │ Self-hosted Runner                │\n├───────────────────────────────────┼───────────────────────────────────┤\n│ • Quản lý bởi: GitHub             │ • Quản lý bởi: Chính bạn / Công ty │\n│ • Máy ảo sạch: Tạo mới & Xóa ngay │ • Máy tồn tại liên tục (Stateful) │\n│ • Hạn ngạch: Tính theo phút dùng   │ • Chi phí: Trả tiền máy chủ riêng │\n│ • Bảo mật: Cách ly hoàn hảo       │ • Cảnh báo: Rủi ro mã độc trên PR │\n│ • runs-on: ubuntu-latest          │ • runs-on: [self-hosted, linux]   │\n└───────────────────────────────────┴───────────────────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột công ty khởi nghiệp phát triển mô hình trí tuệ nhân tạo nhận thấy các GitHub-hosted Runners thông thường chỉ có 2 đến 4 CPU ảo, khiến quá trình kiểm thử mô hình học sâu mất hơn hai tiếng đồng hồ. Nhóm quyết định lắp đặt một máy chủ Self-hosted có 64 nhân CPU và 2 card GPU NVIDIA đặt tại văn phòng, sau đó cài đặt ứng dụng GitHub Actions Runner. Kể từ đó, thời gian kiểm thử mô hình giảm xuống chỉ còn 6 phút. Tuy nhiên, họ chỉ cho phép chạy Self-hosted Runner trên kho lưu trữ nội bộ (Private Repo) để ngăn chặn kẻ xấu lợi dụng máy chủ đào tiền ảo.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\nuname -a\ncat /etc/os-release\nfree -m\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nCác lệnh trên cho phép kiểm tra thông số kiến trúc hạt nhân Linux với uname -a, phiên bản hệ điều hành với cat /etc/os-release và dung lượng bộ nhớ RAM khả dụng với free -m ngay bên trong môi trường Runner nhằm kiểm tra tài nguyên hệ thống thực tế.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Gắn Self-hosted Runner vào một kho lưu trữ công khai (Public Repo)**:  Kẻ xấu có thể mở Pull Request chứa mã độc để chiếm quyền điều khiển máy chủ của bạn.\n2. **Không dọn dẹp các tệp tin tạm thời trên Self-hosted Runner khiến ổ cứng bị đầy sau một thời gian hoạt động.**: \n3. **Kỳ vọng GitHub-hosted Runner lưu lại tệp tin đã tải về giữa hai lần kích hoạt workflow khác nhau.**: \n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Thêm một bước in ra thông tin cấu hình máy chủ của Runner bằng lệnh `uname -a`.\n2. Kiểm tra dung lượng bộ nhớ RAM và ổ đĩa có sẵn trên Runner của GitHub.\n3. Tìm hiểu mục cấu hình Runners trong phần Settings của kho lưu trữ trên GitHub.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Mặc định trên GitHub-hosted Linux, bạn có quyền thực thi lệnh với quyền quản trị viên `sudo` mà không cần nhập mật khẩu.\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nLog hiển thị chính xác thông số môi trường Linux Ubuntu được cấp phát tự động.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nHãy kiểm tra kiến thức về sự khác biệt giữa hai mô hình Runner qua các câu hỏi sau.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nTại sao GitHub đưa ra cảnh báo cực kỳ nghiêm trọng về việc không bao giờ được sử dụng Self-hosted Runner cho các kho lưu trữ mã nguồn mở công khai?\n\n---\n\n## 📚 Tổng kết kiến thức\n- GitHub-hosted Runners là máy ảo do GitHub quản lý, đảm bảo môi trường sạch sẽ và cách ly tuyệt đối.\n- Self-hosted Runners do bạn tự vận hành, phù hợp cho phần cứng chuyên biệt (GPU) và truy cập mạng nội bộ.\n- Tuyệt đối không dùng Self-hosted Runners trên Public Repositories để phòng tránh rủi ro thực thi mã độc.\n",
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
      }
    ]
  }
};
export default lesson;
