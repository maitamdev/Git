import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "18-environments-and-deployment",
  "moduleId": "07-github-actions",
  "metadata": {
    "id": "18-environments-and-deployment",
    "title": "Môi trường triển khai (Environments) & Cổng phê duyệt Protection Rules",
    "level": "advanced",
    "duration": 35,
    "xp": 110,
    "prerequisites": [
      "17-pull-request-ci"
    ],
    "objectives": [
      "Nắm vững khái niệm Deployment Environments trong GitHub (Production, Staging, Development).",
      "Cấu hình cổng phê duyệt của con người (Required Reviewers) trước khi Job triển khai được phép chạy.",
      "Sử dụng các biến và bí mật riêng biệt theo từng môi trường cụ thể."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "environments",
      "deployment",
      "protection rules",
      "required reviewers",
      "cd pipeline"
    ],
    "commands": [
      "gh deployment list",
      "echo \"Deploying to production server\""
    ]
  },
  "content": "# Môi trường triển khai (Environments) & Cổng phê duyệt Protection Rules\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững khái niệm Deployment Environments trong GitHub (Production, Staging, Development).\n- Cấu hình cổng phê duyệt của con người (Required Reviewers) trước khi Job triển khai được phép chạy.\n- Sử dụng các biến và bí mật riêng biệt theo từng môi trường cụ thể.\n- Nắm rõ cách cấu hình URL xem trực tiếp triển khai trên giao diện kho lưu trữ.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Deployment Environments\n- **Nói dễ hiểu**: Đối tượng quản trị trên GitHub đại diện cho hạ tầng máy chủ thực tế (Production, Staging, QA) kèm theo các chính sách bảo vệ riêng.\n- **Ví dụ**: Môi trường `production` yêu cầu một người trong danh sách reviewer phê duyệt Job; người duyệt và quyền bypass tùy cài đặt.\n- **Đừng nhầm**: Không phải biến môi trường dạng chuỗi (`NODE_ENV=production`); đây là thực thể quản lý quyền và secret trên GitHub.\n\n### Required Reviewers\n- **Nói dễ hiểu**: Quy tắc bảo vệ yêu cầu ít nhất một người được chỉ định phê duyệt trước khi Job được gửi tới runner.\n- **Ví dụ**: Lead DevOps nhận thông báo và bấm nút \"Approve and deploy\" trên web thì Job deploy mới bắt đầu chạy.\n- **Đừng nhầm**: Không phải là Pull Request code review; đây là bước phê duyệt thực thi pipeline ngay trong lúc workflow đang chạy.\n\n### Deployment Branches\n- **Nói dễ hiểu**: Quy tắc giới hạn chỉ cho phép những nhánh hoặc thẻ tag cụ thể được kích hoạt triển khai lên môi trường.\n- **Ví dụ**: Chỉ các commit nằm trên nhánh `main` mới được phép deploy lên môi trường `production`.\n- **Đừng nhầm**: Không thay thế branch protection; đây là bộ lọc bổ sung dành riêng cho ngữ cảnh triển khai môi trường.\n\n---\n\n## 📖 Định nghĩa\nDeployment Environments mô tả mục tiêu triển khai như `production`, `staging` hoặc `development`. Mỗi môi trường có thể đặt quy tắc duyệt, thời gian chờ hoặc giới hạn nhánh/tag; tính năng cụ thể còn tùy loại repo và gói GitHub. Secrets/variables của môi trường chỉ cấp cho Job tham chiếu môi trường; secret chỉ được cấp sau khi các rule đạt.\n\n---\n\n## 🤔 Tại sao cần?\nDeploy lên production có thể ảnh hưởng dữ liệu và người dùng. Environment rules tạo điểm kiểm tra trước khi Job chạy; việc phê duyệt không thay thế quyền tối thiểu, review mã, backup, giám sát hay rollback. Job dùng self-hosted runner vẫn chạy trong hạ tầng do tổ chức quản lý, không được môi trường biến thành sandbox.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung một lô hàng đã qua kiểm tra chất lượng nhưng cần nhân viên được phân quyền xác nhận trước khi xuất kho. Environment rule là bước xác nhận; ai duyệt và có cho phép bỏ qua hay không phụ thuộc vào thiết lập của tổ chức.\n\n---\n\n## 🖼 Sơ đồ\n```text\nQuy trình dừng chờ phê duyệt môi trường (Environment Gate):\n[Job: Build & Test] ──► [Thành công]\n                           │\n                           ▼\n[Job: Deploy Production] (environment: production)\n                           │\n                           ▼\n        ┌──────────────────────────────────────┐\n        │ TRẠNG THÁI: WAITING APPROVAL         │\n        │ Job chờ người được chỉ định duyệt    │\n        └──────────────────┬───────────────────┘\n                           │\n               ┌───────────┴───────────┐\n               ▼                       ▼\n        [Bấm APPROVE]           [Bấm REJECT]\n               │                       │\n               ▼                       ▼\n     [Thực thi Deploy]         [Hủy bỏ phiên chạy]\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrong môi trường phát triển dự án thực tế: repo đã cấu hình môi trường `production`, branch/tag policy và reviewer. Job tham chiếu môi trường chờ tới khi các protection rule đạt; khi được duyệt, runner mới được cấp cho Job và secrets của môi trường mới khả dụng. Người duyệt vẫn cần kiểm tra thay đổi và mục tiêu deploy.\n\n---\n\n## 💻 Command\n```yaml\n# Cấu hình Job gắn với Environment và URL triển khai\nname: Production Release Pipeline\non:\n  push:\n    tags:\n      - 'v*.*.*'\n\njobs:\n  deploy-production:\n    name: Deploy to Production\n    runs-on: ubuntu-latest\n    environment:\n      name: production\n      url: https://app.example.com\n    steps:\n      - uses: actions/checkout@v7\n      - name: Deploy application\n        env:\n          PROD_API_KEY: ${{ secrets.PROD_API_KEY }}\n        run: |\n          echo \"Triển khai an toàn lên cụm máy chủ production\"\n          ./deploy.sh  # script dùng khóa; không in secret ra log\n```\n\n---\n\n## 🔍 Giải thích command\n- `environment.name: production`: Khai báo liên kết Job với môi trường `production`, kích hoạt các chính sách kiểm duyệt thủ công đã cấu hình trong Settings.\n- `environment.url: https://app.example.com`: Cung cấp liên kết ứng dụng trực tiếp trên giao diện Deployments sau khi Job chạy thành công.\n- `secrets.PROD_API_KEY`: Đọc secret môi trường sau khi Job tham chiếu `production` vượt qua protection rules; bản thân secret không thay thế việc kiểm tra code/deploy script.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Không cấu hình Environment Protection Rules**: Bất kỳ ai có quyền commit lên nhánh cũng có thể kích hoạt triển khai lên production mà không qua bước kiểm duyệt.\n2. **Dùng chung một bộ API key cho mọi môi trường**: Gây nguy cơ code thử nghiệm ở staging xóa nhầm dữ liệu thật trên production.\n3. **Không giới hạn Deployment Branches**: Khiến cho việc đẩy commit lên các nhánh thử nghiệm cá nhân cũng vô tình kích hoạt job deploy lên môi trường production.\n\n---\n\n## 🧪 Lab\nHãy mở terminal và cùng tôi thực hành từng bước dưới đây để làm chủ kỹ năng:\n\n1. **Bước 1**: Trên GitHub, vào mục **Settings** -> **Environments**, bấm **New environment** và tạo môi trường tên `production`.\n2. **Bước 2**: Trong môi trường `production`, bật tính năng **Required reviewers** và thêm tài khoản của bạn vào danh sách kiểm duyệt.\n3. **Bước 3**: Thêm một Environment Secret mang tên `DATABASE_URL` dành riêng cho môi trường này.\n4. **Bước 4**: Tạo file workflow khai báo `environment: production`, chạy workflow và chứng kiến quy trình tạm dừng chờ bạn bấm **Review deployments** -> **Approve and deploy**.\n\n---\n\n## 💡 Hint\n> Quyền dùng Required Reviewers và Environment Secrets tùy gói/repo: tài liệu hiện tại giới hạn một số rule với repo private trên Free/Pro/Team; kiểm tra cài đặt GitHub của repo trước khi làm lab.\n\n---\n\n## ✅ Validation\n- Workflow hiển thị trạng thái màu vàng \"Waiting for review\" khi đến Job deploy.\n- Các protection rules phải đạt trước khi Job được gửi tới runner; Environment Secrets chỉ khả dụng sau đó.\n- Trang chủ repo hiển thị thẻ Deployments với trạng thái Active và nút \"View deployment\" dẫn về URL đã cấu hình.\n\n---\n\n## ❓ Quiz\nHãy kiểm tra mức độ hiểu biết của bạn về Môi trường và Cổng phê duyệt trong CD qua các câu hỏi trong phần trắc nghiệm bên dưới.\n\n---\n\n## 🔥 Challenge\nLàm thế nào để kết hợp tính năng Wait Timer (thời gian chờ hoãn) với Required Reviewers để cho phép người vận hành có thời gian chuẩn bị hạ tầng trước khi pipeline chính thức kích hoạt?\n\n---\n\n## 📚 Tổng kết\n- `environment` mô hình hóa mục tiêu triển khai và liên kết Job với các rule đã cấu hình.\n- Required reviewers là một rule tùy chọn; quyền duyệt và quyền bypass phụ thuộc cài đặt.\n- Environment Secrets chỉ được cấp cho Job tham chiếu môi trường sau khi protection rules đạt.\n- Gắn liên kết URL triển khai giúp đội ngũ dễ dàng kiểm tra ứng dụng trực tiếp từ giao diện GitHub.\n",
  "quiz": {
    "id": "quiz-07-github-actions-18-environments-and-deployment",
    "title": "Trắc nghiệm: Môi trường triển khai (Environments) & Cổng phê duyệt Protection Rules",
    "questions": [
      {
        "id": "q1",
        "question": "Thuộc tính nào trong Job của GitHub Actions được sử dụng để liên kết với một môi trường triển khai?",
        "type": "single",
        "options": [
          {
            "text": "environment",
            "correct": true
          },
          {
            "text": "deploy_to",
            "correct": false
          },
          {
            "text": "target_stage",
            "correct": false
          },
          {
            "text": "server_env",
            "correct": false
          }
        ],
        "explanation": "Từ khóa environment chỉ định môi trường triển khai và kích hoạt các quy tắc bảo vệ tương ứng của môi trường đó."
      },
      {
        "id": "q2",
        "question": "Khi một Job liên kết với môi trường có quy tắc Required reviewers, Job sẽ chuyển sang trạng thái nào?",
        "type": "single",
        "options": [
          {
            "text": "Waiting for review (tạm dừng chờ người được chỉ định phê duyệt)",
            "correct": true
          },
          {
            "text": "Thất bại ngay lập tức",
            "correct": false
          },
          {
            "text": "Tự động chạy qua mà không cần đợi",
            "correct": false
          },
          {
            "text": "Tự động hủy toàn bộ kho lưu trữ",
            "correct": false
          }
        ],
        "explanation": "Job sẽ kiên nhẫn chờ đợi tín hiệu Approve từ một trong những người kiểm duyệt được chỉ định trước khi bắt đầu chạy các Step."
      },
      {
        "id": "q3",
        "question": "Lợi ích của việc lưu trữ Secret ở cấp độ Environment thay vì cấp độ Repository là gì?",
        "type": "single",
        "options": [
          {
            "text": "Chỉ Job tham chiếu môi trường mới có thể nhận secret, sau khi các protection rules đạt",
            "correct": true
          },
          {
            "text": "Làm cho Secret có thể xem được bởi tất cả mọi người trên mạng",
            "correct": false
          },
          {
            "text": "Secret sẽ tự động đổi mật khẩu mỗi ngày",
            "correct": false
          },
          {
            "text": "Không có lợi ích gì khác biệt",
            "correct": false
          }
        ],
        "explanation": "Environment Secrets chỉ cấp cho Job tham chiếu môi trường đó sau khi rules đạt; deploy code vẫn phải tránh in hoặc làm lộ token."
      },
      {
        "id": "q4",
        "question": "Ai có quyền bấm nút phê duyệt (Approve) cho một Job đang chờ kiểm duyệt môi trường?",
        "type": "single",
        "options": [
          {
            "text": "Các cá nhân hoặc nhóm người dùng được chỉ định cụ thể trong danh sách Required Reviewers của môi trường đó",
            "correct": true
          },
          {
            "text": "Bất kỳ người dùng nào ghé thăm trang web GitHub",
            "correct": false
          },
          {
            "text": "Chỉ duy nhất người đã viết dòng code đó",
            "correct": false
          },
          {
            "text": "Robot tự động của GitHub",
            "correct": false
          }
        ],
        "explanation": "Người quản trị có toàn quyền chỉ định danh sách các kỹ sư đáng tin cậy chịu trách nhiệm ký duyệt cho từng môi trường."
      },
      {
        "id": "q5",
        "question": "Thuộc tính nào trong cấu hình environment cho phép hiển thị liên kết trực tiếp tới ứng dụng sau khi deploy thành công trên giao diện GitHub?",
        "type": "single",
        "options": [
          {
            "text": "url",
            "correct": true
          },
          {
            "text": "link",
            "correct": false
          },
          {
            "text": "website",
            "correct": false
          },
          {
            "text": "target_address",
            "correct": false
          }
        ],
        "explanation": "Khi cấu hình environment với thuộc tính url, GitHub sẽ hiển thị nút View Deployment dẫn trực tiếp tới địa chỉ trang web sản phẩm."
      }
    ]
  }
};
export default lesson;
