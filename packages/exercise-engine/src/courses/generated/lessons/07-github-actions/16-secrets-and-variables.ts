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
  "content": "# Bảo mật thông tin nhạy cảm với Secrets và Secret Masking\n\n---\n\n## 🎯 Mục tiêu bài học\n- Phân biệt rõ ràng giữa Configuration Variables (thông tin cấu hình mở) và Encrypted Secrets (thông tin bí mật nhạy cảm).\n- Biết cách cấu hình và gọi Secrets trong tệp YAML qua ngữ cảnh ${{ secrets.SECRET_NAME }}.\n- Hiểu sâu cơ chế che giấu bí mật (Secret Masking): tự động thay thế bằng *** trong log thực thi.\n\n---\n\n## 📖 Định nghĩa\n> GitHub Secrets là các biến nhạy cảm được mã hóa (chẳng hạn như mật khẩu cơ sở dữ liệu, mã khóa API token, khóa riêng tư SSH) được tạo trong phần cài đặt của kho lưu trữ hoặc tổ chức. GitHub sử dụng mã hóa bất đối xứng libsodium để bảo vệ các bí mật này trước khi lưu vào cơ sở dữ liệu. Trong quá trình chạy workflow, hệ thống sẽ giải mã dữ liệu vào bộ nhớ của Runner và tự động áp dụng cơ chế Secret Masking (thay thế toàn bộ chuỗi ký tự bí mật thành ba dấu sao *** trong mọi dòng nhật ký hiển thị).\n\n---\n\n## 🤔 Tại sao cần?\nLộ khóa bí mật (Credential Leak) là một trong những thảm họa an ninh mạng phổ biến và tồi tệ nhất. Nếu một lập trình viên vô tình viết cứng mã khóa AWS Token vào tệp YAML và đẩy lên kho lưu trữ công khai, các bot quét tự động trên Internet sẽ chiếm quyền tài khoản chỉ trong vòng vài giây, gây thiệt hại hàng trăm triệu đồng. GitHub Secrets đảm bảo mã nguồn của bạn hoàn toàn sạch sẽ và an toàn tuyệt đối.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy tưởng tượng chiếc két sắt bảo mật kiên cố của ngân hàng. Bạn đặt những thỏi vàng và mật mã két sắt vào bên trong (GitHub Secrets). Khi nhân viên giao dịch (Runner) cần thực hiện một lệnh thanh toán, họ được hệ thống cấp quyền sử dụng chìa khóa trong phòng kín không có cửa sổ. Mọi camera giám sát công cộng (hệ thống Logs) đều tự động làm mờ khuôn mặt và bàn tay bấm mật mã thành dải màu đen (***) để không ai đứng ngoài có thể nhìn trộm được.\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nCơ chế che giấu bí mật (Secret Masking):\nRepository Settings (Mã hóa Libsodium)\n└── Secrets: [PROD_API_KEY = \"super_secret_token_12345\"]\n      │\n      ▼ Được tiêm vào Runner an toàn\nWorkflow YAML:\n  env:\n    API_TOKEN: ${{ secrets.PROD_API_KEY }}\n  run: echo \"Connecting with token $API_TOKEN\"\n\nLog hiển thị cho người dùng:\nConnecting with token ***   <── Tự động thay thế chuỗi nhạy cảm bằng ***\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột kỹ sư tích hợp chức năng gửi tin nhắn thông báo Telegram tự động mỗi khi có bản phát hành mới. Thay vì viết mã bot token trực tiếp vào mã nguồn, kỹ sư truy cập mục Settings -> Secrets and variables -> Actions trên GitHub và tạo một Secret mới có tên TELEGRAM_BOT_TOKEN. Trong tệp workflow, kỹ sư truyền biến qua môi trường: env: { BOT_TOKEN: ${{ secrets.TELEGRAM_BOT_TOKEN }} }. Dù trong câu lệnh curl có in biến ra màn hình, hệ thống kiểm duyệt log của GitHub Actions lập tức can thiệp và hiển thị dòng chữ: BOT_TOKEN=***. Mã khóa bí mật được giữ kín tuyệt đối.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\necho \"Deploying with token: ***\"\ngh secret set API_KEY\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nLệnh gh secret set cho phép lập trình viên lưu trữ an toàn một biến bí mật mới lên GitHub trực tiếp từ dòng lệnh mà giá trị không bao giờ bị lưu trong lịch sử shell.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Cố tình giải mã hoặc in chuỗi bí mật dưới dạng băm Base64 để vượt mặt bộ lọc Masking của GitHub.**: \n2. **Sử dụng Secrets trong các Pull Request xuất phát từ các nhánh phân nhánh (forks) của cộng đồng bên ngoài mà không kiểm duyệt.**: \n3. **Đặt tên Secret trùng với các từ khóa quá ngắn hoặc thông dụng (ví dụ**:  \"true\" hoặc \"123\") khiến log hiển thị dấu sao *** ở khắp mọi nơi.\n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Vào phần thiết lập mô phỏng và tạo một biến bí mật giả định `MOCK_API_KEY = \"my_super_secret_xyz\"`.\n2. Đọc biến bí mật này vào Step thông qua cú pháp `${{ secrets.MOCK_API_KEY }}`.\n3. In biến này ra log bằng lệnh echo và quan sát chuỗi ký tự hiển thị bị che thành `***`.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Không bao giờ được đặt giá trị của Secret là các chuỗi quá phổ biến như \"admin\" hay \"test\" vì nó sẽ làm hỏng khả năng đọc log của hệ thống.\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nToàn bộ giá trị nhạy cảm hiển thị trên log đều được chuyển thành dấu *** một cách an toàn.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nKiểm tra nhận thức về an toàn thông tin và quản lý Secrets qua các câu hỏi sau.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nTại sao GitHub Actions mặc định không chia sẻ Secrets cho các sự kiện pull_request bắt nguồn từ các kho lưu trữ Fork của người lạ?\n\n---\n\n## 📚 Tổng kết kiến thức\n- GitHub Secrets được mã hóa an toàn bằng thuật toán Libsodium trước khi lưu trữ.\n- Truy cập biến bí mật thông qua ngữ cảnh `${{ secrets.TEN_BIEN }}`.\n- Cơ chế Secret Masking tự động che giấu giá trị nhạy cảm thành `***` trong toàn bộ nhật ký thực thi.\n",
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
            "text": "Dòng chữ \"PASSWORD DETECTED\"",
            "correct": false
          },
          {
            "text": "Màn hình bị đen toàn bộ",
            "correct": false
          }
        ],
        "explanation": "GitHub Actions tích hợp sẵn bộ lọc Secret Masking tự động nhận diện và thay thế mọi chuỗi ký tự khớp với secret thành `***`."
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
            "text": "read_secret(\"MY_API_KEY\")",
            "correct": false
          }
        ],
        "explanation": "Bạn sử dụng ngữ cảnh `secrets` kết hợp với cú pháp biểu thức `${{ secrets.<NAME> }}` để gán giá trị vào biến môi trường."
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
      }
    ]
  }
};
export default lesson;
