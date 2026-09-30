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
  "content": "# Môi trường triển khai (Environments) & Cổng phê duyệt Protection Rules\n\n---\n\n## 🎯 Mục tiêu bài học\n- Nắm vững khái niệm Deployment Environments trong GitHub (Production, Staging, Development).\n- Cấu hình cổng phê duyệt của con người (Required Reviewers) trước khi Job triển khai được phép chạy.\n- Sử dụng các biến và bí mật riêng biệt theo từng môi trường cụ thể.\n\n---\n\n## 📖 Định nghĩa\n> Deployment Environments (Môi trường triển khai) là tính năng của GitHub cho phép bạn mô hình hóa các mục tiêu triển khai thực tế như Production, Staging hay Development. Mỗi môi trường có thể được thiết lập các quy tắc bảo vệ riêng biệt (Environment Protection Rules) bao gồm: bắt buộc có sự phê duyệt thủ công từ những người chỉ định (Required Reviewers), thời gian chờ (Wait Timer), giới hạn nhánh được phép triển khai, và sở hữu kho lưu trữ Secrets/Variables riêng biệt.\n\n---\n\n## 🤔 Tại sao cần?\nTự động hóa hoàn toàn là tuyệt vời, nhưng triển khai lên máy chủ sản xuất phục vụ người dùng thực tế tiềm ẩn rủi ro tài chính to lớn. Bạn không bao giờ muốn một commit vô tình được đẩy vào lúc nửa đêm tự động ghi đè lên cơ sở dữ liệu khách hàng. Cổng phê duyệt môi trường tạo ra điểm dừng kiểm soát an toàn tối thượng: pipeline tạm dừng, gửi email thông báo cho trưởng nhóm kỹ thuật, và chỉ khi họ bấm nút \"Approve and deploy\" thì Job mới tiếp tục chạy.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy hình dung chiếc chìa khóa đôi để phóng tên lửa vũ trụ trong các trung tâm chỉ huy quân sự cấp cao. Kỹ sư tự động hóa đã chuẩn bị xong toàn bộ bệ phóng, kiểm tra máy tính và nạp đầy đủ nhiên liệu cần thiết (tương đương với các bài kiểm thử unit test đã vượt qua). Nhưng để tên lửa thực sự rời bệ phóng lao lên không gian (triển khai lên production thực tế), bắt buộc phải có hai vị chỉ huy trưởng (Required Reviewers) cùng tra chiếc chìa khóa định danh, xem xét kỹ lưỡng và vặn nút phê duyệt đồng ý trên bảng điều khiển trung tâm.\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nQuy trình dừng chờ phê duyệt môi trường (Environment Gate):\n[Job: Build & Test] ──► [Thành công ✓]\n                           │\n                           ▼\n[Job: Deploy Production] (environment: production)\n                           │\n                           ▼\n        ┌──────────────────────────────────────┐\n        │ TRẠNG THÁI: WAITING APPROVAL ⏸️       │\n        │ Gửi thông báo tới: Lead Engineer      │\n        └──────────────────┬───────────────────┘\n                           │\n               ┌───────────┴───────────┐\n               ▼                       ▼\n        [Bấm APPROVE ✓]         [Bấm REJECT ✗]\n               │                       │\n               ▼                       ▼\n     [Thực thi Deploy]         [Hủy bỏ phiên chạy]\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột công ty fintech quản lý môi trường triển khai có tên `production`. Trong phần thiết lập môi trường, họ chỉ định 2 kỹ sư trưởng làm Required Reviewers và chỉ cho phép triển khai từ nhánh `main`. Khi một bản vá lỗi được gộp vào nhánh chính, Job biên dịch chạy hoàn tất trong 3 phút, sau đó Job triển khai chuyển sang trạng thái màu vàng: \"Waiting for review\". Trưởng nhóm nhận được thông báo trên điện thoại, xem xét danh sách các thay đổi và bấm nút \"Approve and deploy\". Ngay lập tức, máy ảo Runner được cấp phát và mã nguồn được đẩy lên hệ thống máy chủ ngân hàng an toàn.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\ngh deployment list\necho \"Deploying to production server\"\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nLệnh gh deployment list hiển thị lịch sử các lần triển khai lên các môi trường, giúp theo dõi phiên bản nào đang hoạt động trên máy chủ nào.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Không cấu hình Environment Protection Rules khiến bất kỳ ai có quyền commit lên nhánh cũng có thể kích hoạt triển khai lên production.**: \n2. **Sử dụng chung một mã khóa API cho cả môi trường kiểm thử (staging) và sản xuất (production).**: \n3. **Bỏ qua việc giới hạn nhánh khiến các nhánh thử nghiệm cá nhân cũng có thể kích hoạt môi trường production.**: \n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Khai báo thuộc tính `environment: production` bên trong định nghĩa của Job `deploy`.\n2. Cấu hình biến môi trường riêng biệt theo môi trường để kiểm tra tính năng cách ly.\n3. Quan sát trạng thái Job tạm dừng và yêu cầu xác nhận phê duyệt trước khi hoàn thành.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Tính năng Environment Protection Rules yêu cầu kho lưu trữ Public hoặc tài khoản GitHub Enterprise/Team.\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nJob triển khai dừng lại ở trạng thái chờ phê duyệt và chỉ hoàn thành khi có sự chấp thuận.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nHãy kiểm tra mức độ hiểu biết của bạn về Môi trường và Cổng phê duyệt trong CD qua các câu hỏi sau.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nLàm thế nào để kết hợp tính năng Wait Timer (thời gian chờ trì hoãn) với Required Reviewers để ngăn ngừa việc triển khai nóng vội?\n\n---\n\n## 📚 Tổng kết kiến thức\n- `environment` mô hình hóa các môi trường triển khai thực tế như `production`, `staging`.\n- Cung cấp cổng bảo vệ kiểm duyệt với cơ chế phê duyệt thủ công (Required Reviewers).\n- Cho phép định nghĩa các Secrets và Variables độc quyền chỉ có hiệu lực trong môi trường đó.\n",
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
        "explanation": "Từ khóa `environment:` chỉ định môi trường triển khai và kích hoạt các quy tắc bảo vệ tương ứng của môi trường đó."
      },
      {
        "id": "q2",
        "question": "Khi một Job liên kết với môi trường có quy tắc \"Required reviewers\", Job sẽ chuyển sang trạng thái nào?",
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
        "explanation": "Environment Secrets giúp cách ly tuyệt đối thông tin nhạy cảm: ví dụ token production không bao giờ bị lộ cho các Job chạy trên môi trường staging."
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
      }
    ]
  }
};
export default lesson;
