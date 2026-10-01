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
  "content": "# Môi trường triển khai (Environments) & Cổng phê duyệt Protection Rules\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững khái niệm Deployment Environments trong GitHub (Production, Staging, Development).\n- Cấu hình cổng phê duyệt của con người (Required Reviewers) trước khi Job triển khai được phép chạy.\n- Sử dụng các biến và bí mật riêng biệt theo từng môi trường cụ thể.\n- Nắm rõ cách cấu hình URL xem trực tiếp triển khai trên giao diện kho lưu trữ.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Deployment Environments\n- **Nói dễ hiểu**: Đối tượng quản trị trên GitHub đại diện cho hạ tầng máy chủ thực tế (Production, Staging, QA) kèm theo các chính sách bảo vệ riêng.\n- **Ví dụ**: Môi trường mang tên `production` yêu cầu hai kỹ sư trưởng xác nhận trước khi cho phép tiến hành cài đặt.\n- **Đừng nhầm**: Không phải biến môi trường dạng chuỗi (`NODE_ENV=production`); đây là thực thể quản lý quyền và secret trên GitHub.\n\n### Required Reviewers\n- **Nói dễ hiểu**: Quy tắc bảo vệ yêu cầu ít nhất một người trong danh sách được chỉ định phê duyệt trước khi Job thực thi.\n- **Ví dụ**: Lead DevOps nhận thông báo và bấm nút \"Approve and deploy\" trên web thì Job deploy mới bắt đầu chạy.\n- **Đừng nhầm**: Không phải là Pull Request code review; đây là bước phê duyệt thực thi pipeline ngay trong lúc workflow đang chạy.\n\n### Deployment Branches\n- **Nói dễ hiểu**: Quy tắc giới hạn chỉ cho phép những nhánh hoặc thẻ tag cụ thể được kích hoạt triển khai lên môi trường.\n- **Ví dụ**: Chỉ các commit nằm trên nhánh `main` mới được phép deploy lên môi trường `production`.\n- **Đừng nhầm**: Không thay thế branch protection; đây là bộ lọc bổ sung dành riêng cho ngữ cảnh triển khai môi trường.\n\n---\n\n## 📖 Định nghĩa\nDeployment Environments (Môi trường triển khai) là tính năng của GitHub cho phép bạn mô hình hóa các mục tiêu triển khai thực tế như Production, Staging hay Development. Mỗi môi trường có thể được thiết lập các quy tắc bảo vệ riêng biệt (Environment Protection Rules) bao gồm: bắt buộc có sự phê duyệt thủ công từ những người chỉ định (Required Reviewers), thời gian chờ (Wait Timer), giới hạn nhánh được phép triển khai, và sở hữu kho lưu trữ Secrets/Variables riêng biệt.\n\n---\n\n## 💡 Tại sao cần\nTự động hóa hoàn toàn là tuyệt vời, nhưng triển khai lên máy chủ sản xuất phục vụ người dùng thực tế tiềm ẩn rủi ro tài chính to lớn. Bạn không bao giờ muốn một commit vô tình được đẩy vào lúc nửa đêm tự động ghi đè lên cơ sở dữ liệu khách hàng. Cổng phê duyệt môi trường tạo ra điểm dừng kiểm soát an toàn tối thượng: pipeline tạm dừng, gửi email thông báo cho trưởng nhóm kỹ thuật, và chỉ khi họ bấm nút \"Approve and deploy\" thì Job mới tiếp tục chạy.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung chiếc chìa khóa đôi để phóng tên lửa vũ trụ trong các trung tâm chỉ huy quân sự cấp cao. Kỹ sư tự động hóa đã chuẩn bị xong toàn bộ bệ phóng, kiểm tra máy tính và nạp đầy đủ nhiên liệu cần thiết (tương đương với các bài kiểm thử unit test đã vượt qua). Nhưng để tên lửa thực sự rời bệ phóng lao lên không gian (triển khai lên production thực tế), bắt buộc phải có hai vị chỉ huy trưởng (Required Reviewers) cùng tra chiếc chìa khóa định danh, xem xét kỹ lưỡng và vặn nút phê duyệt đồng ý trên bảng điều khiển trung tâm.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nQuy trình dừng chờ phê duyệt môi trường (Environment Gate):\n[Job: Build & Test] ──► [Thành công]\n                           │\n                           ▼\n[Job: Deploy Production] (environment: production)\n                           │\n                           ▼\n        ┌──────────────────────────────────────┐\n        │ TRẠNG THÁI: WAITING APPROVAL         │\n        │ Gửi thông báo tới: Lead Engineer     │\n        └──────────────────┬───────────────────┘\n                           │\n               ┌───────────┴───────────┐\n               ▼                       ▼\n        [Bấm APPROVE]           [Bấm REJECT]\n               │                       │\n               ▼                       ▼\n     [Thực thi Deploy]         [Hủy bỏ phiên chạy]\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nMột công ty fintech quản lý môi trường triển khai có tên `production`. Trong phần thiết lập môi trường, họ chỉ định 2 kỹ sư trưởng làm Required Reviewers và chỉ cho phép triển khai từ nhánh `main`. Khi một bản vá lỗi được gộp vào nhánh chính, Job biên dịch chạy hoàn tất trong 3 phút, sau đó Job triển khai chuyển sang trạng thái màu vàng: \"Waiting for review\". Trưởng nhóm nhận được thông báo trên điện thoại, xem xét danh sách các thay đổi và bấm nút \"Approve and deploy\". Ngay lập tức, máy ảo Runner được cấp phát và mã nguồn được đẩy lên hệ thống máy chủ ngân hàng an toàn.\n\n---\n\n## 💻 Command & Cú pháp\n```yaml\n# Cấu hình Job gắn với Environment và URL triển khai\nname: Production Release Pipeline\non:\n  push:\n    tags:\n      - 'v*.*.*'\n\njobs:\n  deploy-production:\n    name: Deploy to Production\n    runs-on: ubuntu-latest\n    environment:\n      name: production\n      url: https://app.example.com\n    steps:\n      - uses: actions/checkout@v4\n      - name: Deploy application\n        env:\n          PROD_API_KEY: ${{ secrets.PROD_API_KEY }}\n        run: |\n          echo \"Triển khai an toàn lên cụm máy chủ production\"\n          echo \"Khóa xác thực: $PROD_API_KEY\"\n```\n\n---\n\n## 🔍 Giải thích command\n- `environment.name: production`: Khai báo liên kết Job với môi trường `production`, kích hoạt các chính sách kiểm duyệt thủ công đã cấu hình trong Settings.\n- `environment.url: https://app.example.com`: Cung cấp liên kết ứng dụng trực tiếp trên giao diện Deployments sau khi Job chạy thành công.\n- `secrets.PROD_API_KEY`: Đọc biến bí mật thuộc phạm vi riêng của môi trường `production`, ngăn chặn các Job ở nhánh khác đọc lén.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Không cấu hình Environment Protection Rules**: Bất kỳ ai có quyền commit lên nhánh cũng có thể kích hoạt triển khai lên production mà không qua bước kiểm duyệt.\n2. **Dùng chung một bộ API key cho mọi môi trường**: Gây nguy cơ code thử nghiệm ở staging xóa nhầm dữ liệu thật trên production.\n3. **Không giới hạn Deployment Branches**: Khiến cho việc đẩy commit lên các nhánh thử nghiệm cá nhân cũng vô tình kích hoạt job deploy lên môi trường production.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. **Bước 1**: Trên GitHub, vào mục **Settings** -> **Environments**, bấm **New environment** và tạo môi trường tên `production`.\n2. **Bước 2**: Trong môi trường `production`, bật tính năng **Required reviewers** và thêm tài khoản của bạn vào danh sách kiểm duyệt.\n3. **Bước 3**: Thêm một Environment Secret mang tên `DATABASE_URL` dành riêng cho môi trường này.\n4. **Bước 4**: Tạo file workflow khai báo `environment: production`, chạy workflow và chứng kiến quy trình tạm dừng chờ bạn bấm **Review deployments** -> **Approve and deploy**.\n\n---\n\n## 💡 Hint & mẹo\n> Tính năng Environment Protection Rules yêu cầu kho lưu trữ Public hoặc tài khoản GitHub Enterprise / Team đối với kho lưu trữ Private.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Workflow hiển thị trạng thái màu vàng \"Waiting for review\" khi đến Job deploy.\n- Sau khi bấm nút Approve, Job mới bắt đầu cấp phát runner và thực hiện các bước deploy.\n- Trang chủ repo hiển thị thẻ Deployments với trạng thái Active và nút \"View deployment\" dẫn về URL đã cấu hình.\n\n---\n\n## ❓ Quiz nhanh\nHãy kiểm tra mức độ hiểu biết của bạn về Môi trường và Cổng phê duyệt trong CD qua các câu hỏi trong phần trắc nghiệm bên dưới.\n\n---\n\n## 🚀 Thử thách nâng cao\nLàm thế nào để kết hợp tính năng Wait Timer (thời gian chờ hoãn) với Required Reviewers để cho phép người vận hành có thời gian chuẩn bị hạ tầng trước khi pipeline chính thức kích hoạt?\n\n---\n\n## 📝 Tổng kết\n- `environment` mô hình hóa các môi trường triển khai thực tế như `production`, `staging`.\n- Cung cấp cổng bảo vệ kiểm duyệt với cơ chế phê duyệt thủ công (Required Reviewers).\n- Cho phép định nghĩa các Secrets và Variables độc quyền chỉ có hiệu lực trong môi trường đó.\n- Gắn liên kết URL triển khai giúp đội ngũ dễ dàng kiểm tra ứng dụng trực tiếp từ giao diện GitHub.\n",
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
            "text": "Chỉ các Job được cấp quyền chạy trên môi trường đó mới có thể giải mã và đọc được Secret này",
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
        "explanation": "Environment Secrets giúp cách ly tuyệt đối thông tin nhạy cảm: token production không bao giờ bị lộ cho các Job chạy trên staging."
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
