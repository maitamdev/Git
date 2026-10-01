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
  "content": "# Bảo mật thông tin nhạy cảm với Secrets và Secret Masking\n\n---\n\n## 🎯 Mục tiêu\n- Phân biệt rõ ràng giữa Configuration Variables (thông tin cấu hình mở) và Encrypted Secrets (thông tin bí mật nhạy cảm).\n- Biết cách cấu hình và gọi Secrets trong tệp YAML qua ngữ cảnh `${{ secrets.SECRET_NAME }}`.\n- Hiểu sâu cơ chế che giấu bí mật (Secret Masking): tự động thay thế bằng ba dấu sao trong log thực thi.\n- Nắm vững các cấp độ phạm vi của secret: Repository, Environment, và Organization.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Encrypted Secrets\n- **Nói dễ hiểu**: Biến nhạy cảm (như API key, mật khẩu, private key) được GitHub mã hóa bằng thuật toán bất đối xứng libsodium trước khi lưu trữ.\n- **Ví dụ**: Biến bí mật `PRODUCTION_DB_PASSWORD` được lưu trong Settings của kho lưu trữ.\n- **Đừng nhầm**: Không phải biến môi trường dạng văn bản thô (Plaintext Variable); chỉ người có quyền admin mới thiết lập được và không ai đọc lại được giá trị gốc từ giao diện web.\n\n### Secret Masking\n- **Nói dễ hiểu**: Cơ chế tự động quét đầu ra terminal của Runner và thay thế toàn bộ ký tự trùng với giá trị bí mật thành ba dấu sao.\n- **Ví dụ**: Khi lệnh `echo \"Token is $MY_KEY\"` chạy, màn hình log chỉ hiển thị `Token is ***`.\n- **Đừng nhầm**: Không thay thế cho việc lập trình cẩn thận; nếu bạn chủ động mã hóa base64 hoặc cắt chuỗi bí mật, bộ lọc masking có thể không nhận diện được.\n\n### Repository Variables\n- **Nói dễ hiểu**: Biến cấu hình không mã hóa dùng để lưu các thông số không nhạy cảm nhưng cần linh hoạt giữa các workflow.\n- **Ví dụ**: Lưu cổng kết nối `PORT: \"8080\"` hoặc URL môi trường staging `STAGING_URL`.\n- **Đừng nhầm**: Không dùng để lưu trữ mật mã, mã token truy cập hoặc chứng chỉ bảo mật.\n\n---\n\n## 📖 Định nghĩa\nGitHub Secrets là các biến nhạy cảm được mã hóa (chẳng hạn như mật khẩu cơ sở dữ liệu, mã khóa API token, khóa riêng tư SSH) được tạo trong phần cài đặt của kho lưu trữ hoặc tổ chức. GitHub sử dụng mã hóa bất đối xứng libsodium để bảo vệ các bí mật này trước khi lưu vào cơ sở dữ liệu. Trong quá trình chạy workflow, hệ thống sẽ giải mã dữ liệu vào bộ nhớ của Runner và tự động áp dụng cơ chế Secret Masking (thay thế toàn bộ chuỗi ký tự bí mật thành ba dấu sao trong mọi dòng nhật ký hiển thị).\n\n---\n\n## 💡 Tại sao cần\nLộ khóa bí mật (Credential Leak) là một trong những thảm họa an ninh mạng phổ biến và tồi tệ nhất. Nếu một lập trình viên vô tình viết cứng mã khóa AWS Token vào tệp YAML và đẩy lên kho lưu trữ công khai, các bot quét tự động trên Internet sẽ chiếm quyền tài khoản chỉ trong vòng vài giây, gây thiệt hại nghiêm trọng. GitHub Secrets đảm bảo mã nguồn của bạn hoàn toàn sạch sẽ và an toàn tuyệt đối.\n\n---\n\n## 🧠 Mental Model\nHãy tưởng tượng chiếc két sắt bảo mật kiên cố của ngân hàng. Bạn đặt những thỏi vàng và mật mã két sắt vào bên trong (GitHub Secrets). Khi nhân viên giao dịch (Runner) cần thực hiện một lệnh thanh toán, họ được hệ thống cấp quyền sử dụng chìa khóa trong phòng kín không có cửa sổ. Mọi camera giám sát công cộng (hệ thống Logs) đều tự động làm mờ khuôn mặt và bàn tay bấm mật mã thành dải màu đen để không ai đứng ngoài có thể nhìn trộm được.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nCơ chế bảo vệ và hiển thị của GitHub Secrets:\nRepository Settings (Mã hóa an toàn với Libsodium)\n└── Secrets: [PROD_API_KEY = \"my_super_secret_token_12345\"]\n      │\n      ▼ Runner nhận giá trị giải mã trong bộ nhớ\nWorkflow YAML:\n  env:\n    API_TOKEN: ${{ secrets.PROD_API_KEY }}\n  run: echo \"Connecting with token $API_TOKEN\"\n\nLog hiển thị trên giao diện GitHub:\nConnecting with token ***   <── Bộ lọc Masking tự động che dấu\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nMột kỹ sư tích hợp chức năng gửi tin nhắn thông báo Telegram tự động mỗi khi có bản phát hành mới. Thay vì viết mã bot token trực tiếp vào mã nguồn, kỹ sư truy cập mục **Settings -> Secrets and variables -> Actions** trên GitHub và tạo một Secret mới có tên `TELEGRAM_BOT_TOKEN`. Trong tệp workflow, kỹ sư truyền biến qua môi trường: `env: { BOT_TOKEN: ${{ secrets.TELEGRAM_BOT_TOKEN }} }`. Dù trong câu lệnh curl có in biến ra màn hình, hệ thống kiểm duyệt log của GitHub Actions lập tức can thiệp và hiển thị dòng chữ: `BOT_TOKEN=***`. Mã khóa bí mật được giữ kín tuyệt đối.\n\n---\n\n## 💻 Command & Cú pháp\n```yaml\n# Ví dụ workflow sử dụng Secret và Variable an toàn\nname: Secure Deployment Pipeline\non:\n  push:\n    branches: [main]\n\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Deploy application to cloud\n        env:\n          SERVER_HOST: ${{ vars.DEPLOY_HOST }}\n          DEPLOY_TOKEN: ${{ secrets.PROD_DEPLOY_KEY }}\n        run: |\n          echo \"Connecting to target host: $SERVER_HOST\"\n          echo \"Authenticating with credentials: $DEPLOY_TOKEN\"\n```\n\n---\n\n## 🔍 Giải thích command\n- `SERVER_HOST: ${{ vars.DEPLOY_HOST }}`: Lấy giá trị biến cấu hình không nhạy cảm từ ngữ cảnh `vars`. Giá trị này hiển thị rõ ràng trong log.\n- `DEPLOY_TOKEN: ${{ secrets.PROD_DEPLOY_KEY }}`: Đọc giá trị bảo mật từ ngữ cảnh `secrets` và truyền vào biến môi trường của Step.\n- Khi lệnh `echo \"Authenticating with credentials: $DEPLOY_TOKEN\"` chạy, GitHub runner tự động nhận diện giá trị khớp với secret và in ra `***`.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Viết cứng secret vào file mã nguồn**: Dù repo là private, lịch sử git vẫn lưu giữ commit đó mãi mãi nếu không dùng công cụ dọn dẹp lịch sử git.\n2. **Cố tình mã hóa base64 để in ra log**: Một số kỹ sư mã hóa secret thành base64 nhằm debug, điều này làm vô hiệu hóa bộ lọc masking tự động và làm lộ thông tin nhạy cảm.\n3. **Đặt tên secret quá ngắn hoặc trùng với từ thông dụng**: Nếu đặt secret có giá trị là từ \"true\" hoặc \"test\", toàn bộ log hệ thống chứa từ này sẽ bị che thành ba dấu sao.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. **Bước 1**: Truy cập repository trên GitHub, chọn **Settings** -> **Secrets and variables** -> **Actions**.\n2. **Bước 2**: Tại tab **Variables**, bấm **New repository variable** và thêm biến `APP_ENV` với giá trị `production`.\n3. **Bước 3**: Tại tab **Secrets**, bấm **New repository secret** và thêm secret `MOCK_API_KEY` với một giá trị ngẫu nhiên bí mật.\n4. **Bước 4**: Tạo file workflow gọi cả hai biến trên, chạy workflow và kiểm tra tab log để xác nhận `MOCK_API_KEY` được che chắn thành ba dấu sao.\n\n---\n\n## 💡 Hint & mẹo\n> Để quản lý secrets hiệu quả từ terminal mà không cần mở trình duyệt, bạn có thể cài đặt GitHub CLI (`gh`) và chạy lệnh `gh secret set MY_SECRET` cực kỳ nhanh chóng và an toàn.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Giá trị của biến `APP_ENV` hiển thị rõ ràng văn bản `production` trong log.\n- Giá trị của secret `MOCK_API_KEY` được tự động chuyển đổi thành ký hiệu che giấu `***` trên toàn bộ dòng log.\n\n---\n\n## ❓ Quiz nhanh\nKiểm tra nhận thức về an toàn thông tin và quản lý Secrets qua các câu hỏi trong phần trắc nghiệm bên dưới.\n\n---\n\n## 🚀 Thử thách nâng cao\nTại sao GitHub Actions mặc định không chia sẻ Secrets cho các sự kiện `pull_request` bắt nguồn từ các kho lưu trữ Fork của người bên ngoài? Cơ chế `pull_request_target` giải quyết bài toán này như thế nào kèm theo rủi ro bảo mật nào?\n\n---\n\n## 📝 Tổng kết\n- GitHub Secrets được mã hóa an toàn bằng thuật toán Libsodium trước khi lưu trữ.\n- Biến cấu hình mở dùng ngữ cảnh `vars`, còn thông tin nhạy cảm dùng ngữ cảnh `secrets`.\n- Cơ chế Secret Masking tự động che giấu giá trị nhạy cảm thành ba dấu sao trong toàn bộ nhật ký thực thi.\n- Không bao giờ in hoặc debug secret bằng cách biến đổi chuỗi vì sẽ bypass bộ lọc masking an toàn.\n",
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
            "text": "Chuỗi ba dấu sao (***)",
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
        "explanation": "GitHub Actions tích hợp sẵn bộ lọc Secret Masking tự động nhận diện và thay thế mọi chuỗi ký tự khớp với secret thành ba dấu sao."
      },
      {
        "id": "q2",
        "question": "Sự khác biệt chính giữa GitHub Variables và GitHub Secrets là gì?",
        "type": "single",
        "options": [
          {
            "text": "Variables là thông tin cấu hình không mã hóa (hiển thị rõ), còn Secrets được mã hóa an toàn và bị che trong log",
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
