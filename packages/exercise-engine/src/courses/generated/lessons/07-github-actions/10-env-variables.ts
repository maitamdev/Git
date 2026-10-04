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
  "content": "# Biến môi trường (Environment Variables) cấp workflow, job và step\n\n## 🎯 Mục tiêu\n- Làm chủ từ khóa `env` và cơ chế kế thừa phạm vi (scope): cấp Workflow, cấp Job và cấp Step.\n- Sử dụng các biến môi trường mặc định có sẵn của GitHub: `GITHUB_SHA`, `GITHUB_REF`, `GITHUB_REPOSITORY`.\n- Biết cách đọc biến môi trường trong câu lệnh shell (`$ENV_VAR`) và truyền biến động giữa các bước qua `$GITHUB_ENV`.\n\n## 🧩 Từ khóa hôm nay\n### Environment Scope\n- **Nói dễ hiểu**: Phạm vi hiệu lực của biến môi trường, có thể áp dụng cho toàn bộ Workflow, riêng một Job, hay chỉ riêng một Step.\n- **Ví dụ**: Đặt `env: { APP_NAME: \"Shop\" }` ở đầu file để mọi Job và Step đều đọc được.\n- **Đừng nhầm**: Khai báo ở cấp con (Step) sẽ ghi đè lên giá trị cùng tên của cấp cha (Job hoặc Workflow).\n\n### Default Variables\n- **Nói dễ hiểu**: Các biến môi trường có sẵn do GitHub tự động tiêm vào máy ảo Runner mà không cần bạn khai báo.\n- **Ví dụ**: Biến `$GITHUB_SHA` chứa mã SHA của commit liên quan đến sự kiện kích hoạt workflow; giá trị cụ thể tùy loại sự kiện.\n- **Đừng nhầm**: Đây là các biến chỉ đọc (read-only); bạn không thể thay đổi giá trị của chúng trong khi chạy.\n\n### $GITHUB_ENV File\n- **Nói dễ hiểu**: Tệp tin đặc biệt dùng để lưu biến môi trường động do một bước tính toán ra để các bước sau dùng lại.\n- **Ví dụ**: Chạy `echo \"VERSION=1.2.0\" >> $GITHUB_ENV` để các bước tiếp theo đọc được `$VERSION`.\n- **Đừng nhầm**: Lệnh `export VERSION=1.2.0` thông thường sẽ biến mất ngay khi bước đó kết thúc.\n\n## 📖 Định nghĩa\nBiến môi trường (Environment Variables) trong GitHub Actions cho phép bạn lưu trữ và truyền các thông tin cấu hình vào các tiến trình thực thi của Runner. Bạn có thể định nghĩa biến bằng từ khóa `env` ở ba cấp độ: toàn bộ Workflow (áp dụng cho mọi Job), một Job cụ thể (kế thừa cho các Step của Job đó), hoặc chỉ riêng một Step cá lẻ với tính phân tầng và cục bộ cao.\n\n## 🤔 Tại sao cần?\nSử dụng biến môi trường giúp tách bạch giữa mã nguồn logic và các giá trị cấu hình theo môi trường (như `NODE_ENV`, `PORT`, `API_URL`). Điều này tuân thủ nguyên tắc 12-Factor App, giúp kịch bản CI/CD linh hoạt, dễ dàng chuyển đổi giữa các môi trường phát triển, kiểm thử và sản xuất mà không cần sửa code.\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy tưởng tượng hệ thống điều hòa trong một tòa chung cư: Biến cấp Workflow như hệ thống điều hòa tổng của toàn tòa nhà (mọi căn hộ đều nhận chung mức nhiệt độ). Biến cấp Job như chiếc điều hòa riêng trong phòng khách căn hộ (chỉ người trong căn hộ đó hưởng). Và biến cấp Step như chiếc quạt cầm tay mini chỉ thổi mát riêng cho một người trong tích tắc.\n\n## 🖼 Sơ đồ\n```mermaid\nflowchart TD\n    WF[Workflow Level env: APP_NAME=GitStudy] --> Job1[Job 1 Level env: STAGE=staging]\n    WF --> Job2[Job 2: Sử dụng APP_NAME mặc định]\n    Job1 --> Step1[Step 1: Kế thừa APP_NAME & STAGE]\n    Job1 --> Step2[Step 2 Level env: PORT=8080 - Ghi đè cục bộ]\n```\n\n## 🌎 Ví dụ thực tế\nMột kỹ sư cấu hình đường ống phát hành cho ứng dụng web đa môi trường. Ở cấp cao nhất của workflow, kỹ sư khai báo `env: { APP_ENV: 'test', REGION: 'ap-southeast-1' }`. Mọi câu lệnh shell trong các Step đều truy cập được hai biến này. Ở một Step chạy kiểm thử đặc thù, kỹ sư thêm biến cục bộ `env: { DEBUG: 'true', RETRIES: '3' }`. Nhờ phân tầng phạm vi thông minh, bài kiểm thử nhận đúng cấu hình debug chi tiết mà không làm ảnh hưởng đến các tác vụ đóng gói khác.\n\n## 💻 Command\n```bash\n# In ra mã băm commit SHA mặc định\necho $GITHUB_SHA\n\n# In ra biến môi trường cấu hình tùy biến\necho $NODE_ENV\n\n# Lưu biến môi trường động cho các bước tiếp theo sử dụng\necho \"RELEASE_TAG=v1.2.0\" >> $GITHUB_ENV\n```\n\n## 🔍 Giải thích command\n- `echo $GITHUB_SHA`: Đọc biến môi trường mặc định chứa SHA của commit liên quan đến sự kiện kích hoạt workflow. SHA ví dụ trong tài liệu có 40 ký tự, nhưng không nên dựa vào độ dài cố định trong bài học.\n- `echo $NODE_ENV`: Đọc giá trị biến môi trường tùy chỉnh được khai báo trong khối `env`.\n- `echo \"KEY=val\" >> $GITHUB_ENV`: Ghi thêm cặp khóa giá trị vào tệp biến môi trường của GitHub Actions để truyền sang các step sau.\n\n## ⚠️ Sai lầm phổ biến\n- Nhầm lẫn việc ghi đè tên biến ở cấp Step khiến các giá trị quan trọng ở cấp Job bị mất hiệu lực.\n- Lưu trữ mật khẩu, API key hoặc token bí mật trong khối `env` thay vì dùng GitHub Secrets.\n- Nhầm lẫn cú pháp truy cập biến môi trường trong shell (`$MY_VAR`) với cú pháp ngữ cảnh của GitHub Actions (`${{ env.MY_VAR }}`).\n\n## 🧪 Lab\nHãy mở terminal và cùng tôi thực hành từng bước dưới đây để làm chủ kỹ năng:\n\n1. Tạo tệp workflow minh họa kế thừa biến môi trường:\n   ```yaml\n   name: Env Scope Demo\n   on: [workflow_dispatch]\n   env:\n     GLOBAL_APP: \"Git Academy\"\n   jobs:\n     test:\n       runs-on: ubuntu-latest\n       env:\n         JOB_LEVEL: \"Testing Stage\"\n       steps:\n         - name: Đọc biến kế thừa\n           run: |\n             echo \"Global: $GLOBAL_APP\"\n             echo \"Job: $JOB_LEVEL\"\n             echo \"Repo: $GITHUB_REPOSITORY\"\n         - name: Thiết lập biến động\n           run: echo \"DYNAMIC_STATUS=Completed\" >> $GITHUB_ENV\n         - name: Đọc biến động từ bước trước\n           run: echo \"Status: $DYNAMIC_STATUS\"\n   ```\n2. Đẩy file lên GitHub và kích hoạt thủ công qua nút Run workflow.\n3. Quan sát log xem các biến được in ra đầy đủ và biến động được truyền thành công giữa hai bước.\n\n## 💡 Hint\n- Biến khai báo ở cấp con (Step) luôn ghi đè lên biến cùng tên được khai báo ở cấp cha (Job hoặc Workflow).\n- Khi chạy trên Windows Runner (PowerShell), cú pháp đọc biến môi trường là `$env:MY_VAR` thay vì `$MY_VAR`.\n\n## ✅ Validation\n- Console log hiển thị chính xác giá trị của các biến môi trường ở cả ba cấp độ Workflow, Job và Step.\n- Biến được ghi vào `$GITHUB_ENV` ở bước trước được đọc chính xác ở các bước tiếp theo.\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm bên dưới để kiểm tra mức độ nắm vững phạm vi và quy tắc phân tầng biến môi trường trong GitHub Actions.\n\n## 🔥 Challenge\nTìm hiểu sự khác biệt giữa biến môi trường (`env`) và ngữ cảnh (`contexts`), giải thích khi nào bắt buộc phải dùng cú pháp `${{ env.MY_VAR }}` thay vì `$MY_VAR`.\n\n## 📚 Tổng kết\n- Từ khóa `env` cho phép khai báo biến môi trường ở 3 cấp độ: Workflow, Job và Step.\n- Cấp con tự động kế thừa các biến từ cấp cha và có quyền ghi đè giá trị nếu cần.\n- Sử dụng tệp `$GITHUB_ENV` để truyền các giá trị được tính toán động giữa các bước trong cùng một Job.\n",
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
        "explanation": "`GITHUB_SHA` là biến mặc định chứa SHA của commit liên quan đến sự kiện kích hoạt workflow; ý nghĩa cụ thể phụ thuộc loại sự kiện, nên không nên giả định độ dài cố định."
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
      },
      {
        "id": "q5",
        "question": "Các biến môi trường mặc định như `GITHUB_REPOSITORY`, `GITHUB_REF` và `GITHUB_WORKSPACE` được cấp phát như thế nào?",
        "type": "single",
        "options": [
          {
            "text": "Do GitHub Actions tự động tiêm sẵn vào môi trường của mọi Runner ngay khi Job bắt đầu",
            "correct": true
          },
          {
            "text": "Bắt buộc lập trình viên phải tự định nghĩa thủ công trong tệp YAML",
            "correct": false
          },
          {
            "text": "Chỉ xuất hiện sau khi toàn bộ các bài kiểm thử đã chạy xong",
            "correct": false
          },
          {
            "text": "Chỉ dành riêng cho các tài khoản GitHub trả phí doanh nghiệp",
            "correct": false
          }
        ],
        "explanation": "GitHub tự động tiêm sẵn hàng loạt biến môi trường mặc định chứa thông tin chi tiết về commit, nhánh, sự kiện và không gian làm việc."
      }
    ]
  }
};
export default lesson;
