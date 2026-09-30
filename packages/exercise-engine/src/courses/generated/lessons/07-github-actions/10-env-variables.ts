import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "10-env-variables",
  "moduleId": "07-github-actions",
  "metadata": {
    "id": "10-env-variables",
    "title": "Biến môi trường (Environment Variables) cấp workflow, job và step",
    "level": "advanced",
    "duration": 30,
    "xp": 90,
    "prerequisites": [
      "09-run-vs-uses"
    ],
    "objectives": [
      "Làm chủ từ khóa env và cơ chế kế thừa phạm vi (scope): cấp Workflow, cấp Job và cấp Step.",
      "Sử dụng các biến môi trường mặc định có sẵn của GitHub: GITHUB_SHA, GITHUB_REF, GITHUB_REPOSITORY.",
      "Biết cách đọc biến môi trường trong câu lệnh shell ($ENV_VAR) và truyền biến giữa các bước."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "env variables",
      "environment variables",
      "scope",
      "default env vars",
      "dotenv"
    ],
    "commands": [
      "echo $GITHUB_SHA",
      "echo $NODE_ENV",
      "printenv"
    ]
  },
  "content": "# Biến môi trường (Environment Variables) cấp workflow, job và step\n\n---\n\n## 🎯 Mục tiêu bài học\n- Làm chủ từ khóa env và cơ chế kế thừa phạm vi (scope): cấp Workflow, cấp Job và cấp Step.\n- Sử dụng các biến môi trường mặc định có sẵn của GitHub: GITHUB_SHA, GITHUB_REF, GITHUB_REPOSITORY.\n- Biết cách đọc biến môi trường trong câu lệnh shell ($ENV_VAR) và truyền biến giữa các bước.\n\n---\n\n## 📖 Định nghĩa\n> Biến môi trường (Environment Variables) trong GitHub Actions cho phép bạn lưu trữ và truyền các thông tin cấu hình tĩnh hoặc động vào các tiến trình thực thi của Runner. Bạn có thể định nghĩa biến môi trường bằng từ khóa env ở ba cấp độ phạm vi khác nhau: toàn bộ Workflow (áp dụng rộng rãi cho mọi Job), một Job cụ thể (áp dụng kế thừa cho mọi Step trong Job đó), hoặc chỉ riêng một Step cá lẻ với sự phân tầng và kế thừa quyền hạn rõ ràng, có tính cục bộ cao.\n\n---\n\n## 🤔 Tại sao cần?\nSử dụng biến môi trường giúp tách biệt hoàn toàn giữa mã nguồn logic và các giá trị cấu hình thay đổi theo môi trường (như NODE_ENV, PORT, API_ENDPOINT). Điều này tuân thủ nguyên tắc 12-Factor App, giúp kịch bản CI/CD linh hoạt, dễ dàng chuyển đổi giữa các môi trường phát triển, kiểm thử và sản xuất mà không cần sửa đổi mã nguồn. Nhờ đó, việc bảo mật các tham số hệ thống và tái cấu hình hạ tầng trở nên vô cùng đơn giản, an toàn, chuẩn hóa và ngăn ngừa triệt để các lỗi cấu hình cứng.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy tưởng tượng các tầng không khí trong một tòa nhà chung cư: Biến môi trường cấp Workflow giống như hệ thống điều hòa tổng của toàn tòa nhà (tất cả các căn hộ đều hưởng chung mức nhiệt độ này). Biến cấp Job giống như chiếc điều hòa riêng trong phòng khách của căn hộ (chỉ những người trong căn hộ đó mới thấy). Và biến cấp Step giống như chiếc quạt máy mini cầm tay chỉ thổi mát riêng cho một cá nhân trong tích tắc.\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nPhạm vi kế thừa của biến môi trường (Scope Inheritance):\n┌─────────────────────────────────────────────────────────────┐\n│ env: [APP_NAME: \"ShopApp\"]       <── Áp dụng TOÀN WORKFLOW  │\n│                                                             │\n│ jobs:                                                       │\n│   build:                                                    │\n│     env: [STAGE: \"staging\"]      <── Áp dụng TOÀN BỘ JOB    │\n│     steps:                                                  │\n│       - name: Run Task                                      │\n│         env: [PORT: \"8080\"]      <── Áp dụng RIÊNG STEP NÀY │\n│         run: echo \"$APP_NAME on $STAGE at port $PORT\"       │\n└─────────────────────────────────────────────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột kỹ sư cấu hình đường ống phát hành cho ứng dụng web đa ngôn ngữ. Ở cấp cao nhất của workflow, kỹ sư khai báo env: { APP_ENV: 'test', REGION: 'ap-southeast-1' }. Khi Job chạy, mọi câu lệnh shell trong các Step đều có thể truy cập hai biến này. Ở một Step chạy bài kiểm thử tích hợp đặc thù, kỹ sư bổ sung thêm biến cục bộ env: { DEBUG: 'true', RETRIES: '3' }. Nhờ phân tầng phạm vi thông minh, các bài kiểm thử nhận đúng cấu hình debug chi tiết mà không làm ảnh hưởng đến các tác vụ đóng gói khác.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\necho $GITHUB_SHA\necho $NODE_ENV\nprintenv\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nLệnh printenv in ra toàn bộ bảng biến môi trường hiện hành trên máy ảo Runner, giúp lập trình viên kiểm tra danh sách các biến mặc định do GitHub cung cấp cũng như các biến tùy biến do mình thiết lập trong phiên làm việc.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Ghi đè nhầm tên biến ở cấp Step khiến các giá trị quan trọng ở cấp Job bị mất hiệu lực.**: \n2. **Sử dụng biến môi trường để lưu trữ mật khẩu, khóa bí mật hoặc token dưới dạng văn bản rõ.**: \n3. **Nhầm lẫn cú pháp truy cập biến môi trường trong shell (`$MY_VAR`) với cú pháp ngữ cảnh GitHub Actions (`${{ env.MY_VAR }}`).**: \n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Khai báo một biến môi trường `COURSE_NAME: \"Git Academy\"` ở cấp cao nhất của Workflow.\n2. Khai báo biến `NODE_ENV: \"production\"` ở cấp Job.\n3. Tạo một Step in ra giá trị của hai biến trên cùng với biến mặc định `$GITHUB_REF`.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Biến khai báo ở cấp con (Step) sẽ ghi đè lên biến cùng tên được khai báo ở cấp cha (Job hoặc Workflow).\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nLog in ra đầy đủ và chính xác giá trị của các biến môi trường từ cả ba cấp độ.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nHãy kiểm tra mức độ am hiểu của bạn về phạm vi và cách dùng biến môi trường qua các câu hỏi sau.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nLàm thế nào để xuất một biến môi trường mới từ bên trong câu lệnh của một Step để các Step phía sau có thể đọc được bằng tệp $GITHUB_ENV?\n\n---\n\n## 📚 Tổng kết kiến thức\n- Từ khóa `env` cho phép khai báo biến môi trường ở 3 cấp độ: Workflow, Job và Step.\n- Cấp con tự động kế thừa các biến từ cấp cha và có quyền ghi đè giá trị nếu cần.\n- GitHub cung cấp sẵn nhiều biến môi trường mặc định hữu ích như `GITHUB_SHA`, `GITHUB_REF`, `GITHUB_REPOSITORY`.\n",
  "quiz": {
    "id": "quiz-07-github-actions-10-env-variables",
    "title": "Trắc nghiệm: Biến môi trường (Environment Variables) cấp workflow, job và step",
    "questions": [
      {
        "id": "q1",
        "question": "Biến môi trường được khai báo ngay dưới khóa `jobs:<job_id>:env` sẽ có phạm vi hiệu lực ở đâu?",
        "type": "single",
        "options": [
          {
            "text": "Chỉ có hiệu lực đối với tất cả các Step bên trong Job đó",
            "correct": true
          },
          {
            "text": "Có hiệu lực với toàn bộ các Job trong workflow",
            "correct": false
          },
          {
            "text": "Có hiệu lực với mọi kho lưu trữ trên toàn thế giới",
            "correct": false
          },
          {
            "text": "Chỉ có hiệu lực trong đúng 1 giây đầu tiên",
            "correct": false
          }
        ],
        "explanation": "Biến môi trường khai báo ở cấp Job sẽ được kế thừa bởi tất cả các Step thuộc Job đó, nhưng không lan sang các Job khác."
      },
      {
        "id": "q2",
        "question": "Nếu cùng một biến tên là `PORT` được khai báo ở cả cấp Workflow (giá trị 3000) và cấp Step (giá trị 8080), thì bên trong Step đó PORT có giá trị bao nhiêu?",
        "type": "single",
        "options": [
          {
            "text": "8080 (cấp con ghi đè cấp cha)",
            "correct": true
          },
          {
            "text": "3000 (cấp cha luôn thắng)",
            "correct": false
          },
          {
            "text": "11080 (cộng dồn cả hai)",
            "correct": false
          },
          {
            "text": "Báo lỗi xung đột biến",
            "correct": false
          }
        ],
        "explanation": "Quy tắc phạm vi biến tuân thủ nguyên lý ghi đè cục bộ: khai báo ở phạm vi hẹp hơn (Step) sẽ ghi đè phạm vi rộng hơn (Workflow)."
      },
      {
        "id": "q3",
        "question": "Biến môi trường mặc định nào sau đây chứa mã băm commit SHA đầy đủ đã kích hoạt workflow?",
        "type": "single",
        "options": [
          {
            "text": "GITHUB_SHA",
            "correct": true
          },
          {
            "text": "COMMIT_ID",
            "correct": false
          },
          {
            "text": "GIT_HASH",
            "correct": false
          },
          {
            "text": "ACTION_SHA",
            "correct": false
          }
        ],
        "explanation": "`GITHUB_SHA` là biến môi trường tiêu chuẩn do GitHub tự động tiêm vào mọi Runner, chứa mã commit 40 ký tự."
      },
      {
        "id": "q4",
        "question": "Để lưu một biến môi trường động cho các Step sau sử dụng, lệnh shell nào sau đây là chuẩn mực?",
        "type": "single",
        "options": [
          {
            "text": "echo \"MY_VAR=value\" >> $GITHUB_ENV",
            "correct": true
          },
          {
            "text": "export MY_VAR=value",
            "correct": false
          },
          {
            "text": "set MY_VAR=value",
            "correct": false
          },
          {
            "text": "save MY_VAR=value",
            "correct": false
          }
        ],
        "explanation": "Lệnh `export` chỉ có tác dụng trong phiên shell hiện tại. Để truyền sang các step sau, bạn phải ghi vào tệp `$GITHUB_ENV`."
      }
    ]
  }
};
export default lesson;
