import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "16-secrets-and-variables",
  "moduleId": "07-github-actions",
  "metadata": {
    "id": "16-secrets-and-variables",
    "title": "Bảo mật thông tin nhạy cảm với Secrets và Secret Masking",
    "level": "advanced",
    "duration": 30,
    "xp": 95,
    "prerequisites": [
      "15-artifacts-sharing"
    ],
    "objectives": [
      "Phân biệt rõ ràng giữa Configuration Variables (thông tin cấu hình mở) và Encrypted Secrets (thông tin bí mật nhạy cảm).",
      "Biết cách cấu hình và gọi Secrets trong tệp YAML qua ngữ cảnh ${{ secrets.SECRET_NAME }}.",
      "Hiểu sâu cơ chế che giấu bí mật (Secret Masking): tự động thay thế bằng *** trong log thực thi."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "secrets",
      "security",
      "masking",
      "encrypted secrets",
      "credential safety"
    ],
    "commands": [
      "echo \"Deploying with token: ***\"",
      "gh secret set API_KEY"
    ]
  },
  "content": "# Bảo mật thông tin nhạy cảm với Secrets và Secret Masking\n\n---\n\n## 🎯 Mục tiêu\n- Phân biệt rõ ràng giữa Configuration Variables (thông tin cấu hình mở) và Encrypted Secrets (thông tin bí mật nhạy cảm).\n- Biết cách cấu hình và gọi Secrets trong tệp YAML qua ngữ cảnh `${{ secrets.SECRET_NAME }}`.\n- Hiểu Secret Masking là lớp bảo vệ bổ sung, không phải bảo đảm rằng secret không thể lọt vào log.\n- Nắm vững các cấp độ phạm vi của secret: Repository, Environment, và Organization.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Encrypted Secrets\n- **Nói dễ hiểu**: Biến nhạy cảm (như API key, mật khẩu, private key) được GitHub mã hóa bằng thuật toán bất đối xứng libsodium trước khi lưu trữ.\n- **Ví dụ**: Biến bí mật `PRODUCTION_DB_PASSWORD` được lưu trong Settings của kho lưu trữ.\n- **Đừng nhầm**: Không phải biến môi trường dạng văn bản thô (Plaintext Variable); chỉ người có quyền admin mới thiết lập được và không ai đọc lại được giá trị gốc từ giao diện web.\n\n### Secret Masking\n- **Nói dễ hiểu**: GitHub cố gắng che giá trị secret đã nhận diện trong log, thường bằng `***`.\n- **Ví dụ**: Nếu secret nguyên dạng được in ra, log có thể hiện `Token is ***`; cách an toàn là không in secret.\n- **Đừng nhầm**: Không thay thế cho việc lập trình cẩn thận; nếu bạn chủ động mã hóa base64 hoặc cắt chuỗi bí mật, bộ lọc masking có thể không nhận diện được.\n\n### Repository Variables\n- **Nói dễ hiểu**: Biến cấu hình không mã hóa dùng để lưu các thông số không nhạy cảm nhưng cần linh hoạt giữa các workflow.\n- **Ví dụ**: Lưu cổng kết nối `PORT: \"8080\"` hoặc URL môi trường staging `STAGING_URL`.\n- **Đừng nhầm**: Không dùng để lưu trữ mật mã, mã token truy cập hoặc chứng chỉ bảo mật.\n\n---\n\n## 📖 Định nghĩa\nGitHub Secrets là giá trị nhạy cảm được quản lý ở cấp repository, environment hoặc organization. GitHub mã hóa secret khi lưu; workflow chỉ nhận secret khi sự kiện, quyền và phạm vi cho phép. Secret Masking cố gắng che các giá trị nhận diện được trong log, nhưng giá trị đã biến đổi hoặc ngữ cảnh đặc biệt có thể không được che. Vì vậy, không đưa secret vào log, mã nguồn, tham số lệnh hoặc đầu ra không tin cậy.\n\n---\n\n## 🤔 Tại sao cần?\nLộ khóa bí mật có thể cho phép truy cập trái phép. Lưu giá trị trong Secrets thay vì commit vào YAML giúp tách dữ liệu nhạy cảm khỏi source, nhưng không tự bảo vệ khỏi workflow độc hại, quyền quá rộng hoặc log. Cấp tối thiểu quyền cần thiết và xoay vòng secret nếu bị lộ.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy tưởng tượng chiếc két sắt bảo mật kiên cố của ngân hàng. Bạn đặt những thỏi vàng và mật mã két sắt vào bên trong (GitHub Secrets). Khi nhân viên giao dịch (Runner) cần thực hiện một lệnh thanh toán, họ được hệ thống cấp quyền sử dụng chìa khóa trong phòng kín không có cửa sổ. Mọi camera giám sát công cộng (hệ thống Logs) đều tự động làm mờ khuôn mặt và bàn tay bấm mật mã thành dải màu đen để không ai đứng ngoài có thể nhìn trộm được.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCơ chế bảo vệ và hiển thị của GitHub Secrets:\nRepository Settings (Mã hóa an toàn với Libsodium)\n└── Secrets: [PROD_API_KEY = \"my_super_secret_token_12345\"]\n      │\n      ▼ Runner nhận giá trị giải mã trong bộ nhớ\nWorkflow YAML:\n  env:\n    API_TOKEN: ${{ secrets.PROD_API_KEY }}\n  run: ./deploy.sh  # script dùng token nhưng không in giá trị ra log\n\nLog hiển thị trên giao diện GitHub:\nDeploy step completed   <── không in token\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nVí dụ: một kỹ sư lưu bot token trong Actions Secrets rồi truyền nó vào biến môi trường của đúng Step gửi thông báo. Lệnh gửi dùng token để xác thực nhưng không in token, URL có chứa token hay phản hồi nhạy cảm vào log. Nếu nghi ngờ lộ, kỹ sư thu hồi và tạo lại token.\n\n---\n\n## 💻 Command\n```yaml\n# Ví dụ workflow sử dụng Secret và Variable an toàn\nname: Secure Deployment Pipeline\non:\n  push:\n    branches: [main]\n\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v7\n      - name: Deploy application to cloud\n        env:\n          SERVER_HOST: ${{ vars.DEPLOY_HOST }}\n          DEPLOY_TOKEN: ${{ secrets.PROD_DEPLOY_KEY }}\n        run: |\n          echo \"Connecting to target host: $SERVER_HOST\"\n          ./deploy.sh  # script đọc DEPLOY_TOKEN; không echo hoặc ghi token ra tệp log\n```\n\n---\n\n## 🔍 Giải thích command\n- `SERVER_HOST: ${{ vars.DEPLOY_HOST }}`: Lấy giá trị biến cấu hình không nhạy cảm từ ngữ cảnh `vars`. Giá trị này hiển thị rõ ràng trong log.\n- `DEPLOY_TOKEN: ${{ secrets.PROD_DEPLOY_KEY }}`: Đọc giá trị bảo mật từ ngữ cảnh `secrets` và truyền vào biến môi trường của Step.\n- Truyền secret qua `env` để script đọc; không in giá trị ra log để trông chờ việc masking.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Viết cứng secret vào file mã nguồn**: Dù repo là private, lịch sử git vẫn lưu giữ commit đó mãi mãi nếu không dùng công cụ dọn dẹp lịch sử git.\n2. **Biến đổi secret để in ra log**: Base64, cắt chuỗi hoặc ghép chuỗi có thể vượt qua nhận diện masking và làm lộ thông tin nhạy cảm.\n3. **Đặt tên secret quá ngắn hoặc trùng với từ thông dụng**: Nếu đặt secret có giá trị là từ \"true\" hoặc \"test\", toàn bộ log hệ thống chứa từ này sẽ bị che thành ba dấu sao.\n\n---\n\n## 🧪 Lab\nHãy mở terminal và cùng tôi thực hành từng bước dưới đây để làm chủ kỹ năng:\n\n1. **Bước 1**: Truy cập repository trên GitHub, chọn **Settings** -> **Secrets and variables** -> **Actions**.\n2. **Bước 2**: Tại tab **Variables**, bấm **New repository variable** và thêm biến `APP_ENV` với giá trị `production`.\n3. **Bước 3**: Tại tab **Secrets**, bấm **New repository secret** và thêm secret `MOCK_API_KEY` với một giá trị ngẫu nhiên bí mật.\n4. **Bước 4**: Tạo Step kiểm tra secret có tồn tại mà không in giá trị, ví dụ `if [ -n \"$MOCK_API_KEY\" ]; then echo \"Secret is available\"; fi`. Không thử `echo` secret ra log.\n\n---\n\n## 💡 Hint\n> Để quản lý secrets hiệu quả từ terminal mà không cần mở trình duyệt, bạn có thể cài đặt GitHub CLI (`gh`) và chạy lệnh `gh secret set MY_SECRET` cực kỳ nhanh chóng và an toàn.\n\n---\n\n## ✅ Validation\n- Giá trị của biến `APP_ENV` hiển thị rõ ràng văn bản `production` trong log.\n- Log xác nhận secret được cấp cho Step mà không hiển thị giá trị; không dựa vào masking để bảo vệ secret.\n\n---\n\n## ❓ Quiz\nKiểm tra nhận thức về an toàn thông tin và quản lý Secrets qua các câu hỏi trong phần trắc nghiệm bên dưới.\n\n---\n\n## 🔥 Challenge\nTại sao GitHub Actions mặc định không chia sẻ Secrets cho các sự kiện `pull_request` bắt nguồn từ các kho lưu trữ Fork của người bên ngoài? Cơ chế `pull_request_target` giải quyết bài toán này như thế nào kèm theo rủi ro bảo mật nào?\n\n---\n\n## 📚 Tổng kết\n- GitHub Secrets được mã hóa an toàn bằng thuật toán Libsodium trước khi lưu trữ.\n- Biến cấu hình mở dùng ngữ cảnh `vars`, còn thông tin nhạy cảm dùng ngữ cảnh `secrets`.\n- Secret Masking là biện pháp bổ sung; không bảo đảm che mọi cách biểu diễn secret.\n- Không in secret hoặc biến đổi secret để đưa vào log; thu hồi và tạo lại secret nếu có khả năng bị lộ.\n",
  "quiz": {
    "id": "quiz-07-github-actions-16-secrets-and-variables",
    "title": "Trắc nghiệm: Bảo mật thông tin nhạy cảm với Secrets và Secret Masking",
    "questions": [
      {
        "id": "q1",
        "question": "Khi một câu lệnh vô tình in giá trị của một GitHub Secret ra màn hình, hệ thống log sẽ hiển thị nội dung gì?",
        "type": "single",
        "options": [
          {
            "text": "Thường được che thành ***, nhưng masking không được đảm bảo nên không được in secret",
            "correct": true
          },
          {
            "text": "Nguyên văn giá trị bí mật",
            "correct": false
          },
          {
            "text": "Dòng chữ PASSWORD DETECTED",
            "correct": false
          },
          {
            "text": "Màn hình bị đen toàn bộ",
            "correct": false
          }
        ],
        "explanation": "GitHub cố gắng mask các giá trị secret nhận diện được, nhưng giá trị đã biến đổi có thể lọt qua; tuyệt đối không dựa vào masking."
      },
      {
        "id": "q2",
        "question": "Sự khác biệt chính giữa GitHub Variables và GitHub Secrets là gì?",
        "type": "single",
        "options": [
          {
            "text": "Variables dùng cho cấu hình không nhạy cảm; Secrets dùng cho dữ liệu nhạy cảm và chỉ được cấp theo quyền/phạm vi",
            "correct": true
          },
          {
            "text": "Variables chỉ dùng được trên hệ điều hành Windows",
            "correct": false
          },
          {
            "text": "Secrets chỉ tồn tại trong đúng 24 giờ",
            "correct": false
          },
          {
            "text": "Không có bất kỳ sự khác biệt nào",
            "correct": false
          }
        ],
        "explanation": "Variables dùng cho các cấu hình mở như PORT, DOMAIN; Secrets dùng cho dữ liệu nhạy cảm như khóa API, mật khẩu."
      },
      {
        "id": "q3",
        "question": "Cú pháp nào sau đây là chuẩn mực để truyền một bí mật vào biến môi trường của Step?",
        "type": "single",
        "options": [
          {
            "text": "env: { API_KEY: ${{ secrets.MY_API_KEY }} }",
            "correct": true
          },
          {
            "text": "env: { API_KEY: $MY_API_KEY }",
            "correct": false
          },
          {
            "text": "import secret MY_API_KEY",
            "correct": false
          },
          {
            "text": "read_secret(MY_API_KEY)",
            "correct": false
          }
        ],
        "explanation": "Bạn sử dụng ngữ cảnh secrets kết hợp với cú pháp biểu thức ${{ secrets.MY_API_KEY }} để gán giá trị vào biến môi trường."
      },
      {
        "id": "q4",
        "question": "Tại sao các workflow chạy trên Pull Request từ một kho Fork bên ngoài mặc định không được truy cập Secrets?",
        "type": "single",
        "options": [
          {
            "text": "Để ngăn chặn kẻ tấn công gửi PR chứa mã độc nhằm in hoặc đánh cắp bí mật của dự án gốc",
            "correct": true
          },
          {
            "text": "Do máy chủ GitHub bị quá tải",
            "correct": false
          },
          {
            "text": "Vì người dùng Fork không có tài khoản ngân hàng",
            "correct": false
          },
          {
            "text": "Vì GitHub không hỗ trợ tính năng Fork",
            "correct": false
          }
        ],
        "explanation": "Đây là chốt chặn an ninh tối quan trọng nhằm bảo vệ các dự án mã nguồn mở khỏi các cuộc tấn công khai thác bí mật."
      },
      {
        "id": "q5",
        "question": "Secrets trong GitHub Actions có thể được định nghĩa ở các cấp độ phạm vi (scope) nào?",
        "type": "single",
        "options": [
          {
            "text": "Cấp Repository, cấp Environment, và cấp Organization",
            "correct": true
          },
          {
            "text": "Chỉ duy nhất ở cấp commit cá nhân",
            "correct": false
          },
          {
            "text": "Chỉ trong tệp tin local .env của máy lập trình viên",
            "correct": false
          },
          {
            "text": "Cấp hệ điều hành máy ảo của Microsoft Azure",
            "correct": false
          }
        ],
        "explanation": "GitHub Actions hỗ trợ cấu hình Secrets ở 3 phạm vi chính: Repository (cho riêng repo), Environment (gắn với môi trường deploy có review), và Organization (chia sẻ an toàn cho nhiều repo trong tổ chức)."
      }
    ]
  }
};
export default lesson;
